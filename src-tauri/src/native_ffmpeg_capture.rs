use serde::Serialize;
use tauri::ipc::Channel;
#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CaptureEvent {
    stage: String,
    message: Option<String>,
    hardware: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    image: Option<Vec<u8>>,
}
#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CaptureSession {
    session_id: String,
}

#[cfg(any(target_os = "macos", target_os = "windows"))]
mod desktop {
    use super::*;
    use std::{
        path::PathBuf,
        sync::{
            atomic::{AtomicBool, Ordering},
            Arc, Mutex,
        },
        time::{Duration, Instant},
    };
    struct Session {
        id: String,
        stop: Arc<AtomicBool>,
        directory: PathBuf,
        started: Instant,
    }
    static SESSION: Mutex<Option<Arc<Session>>> = Mutex::new(None);
    pub fn start(
        target_id: String,
        destination: PathBuf,
        events: Channel<CaptureEvent>,
    ) -> Result<CaptureSession, String> {
        if !target_id.starts_with("window:") {
            return Err("Choose a window to record".into());
        }
        let mut current = SESSION.lock().map_err(|e| e.to_string())?;
        if current.is_some() {
            return Err("Stop the previous native FFmpeg capture first".into());
        }
        if destination.as_os_str().is_empty()
            || destination
                .extension()
                .and_then(|s| s.to_str())
                .is_none_or(|s| !s.eq_ignore_ascii_case("mp4"))
        {
            return Err("Choose an .mp4 recording destination".into());
        }
        let id = uuid::Uuid::new_v4().to_string();
        let dir = std::env::temp_dir().join(format!("retro-native-ffmpeg-{id}"));
        let session = Arc::new(Session {
            id: id.clone(),
            stop: Arc::new(AtomicBool::new(false)),
            directory: dir.clone(),
            started: Instant::now(),
        });
        let (ready_tx, ready_rx) = std::sync::mpsc::channel();
        let worker = session.clone();
        let ffmpeg = crate::ffmpeg::ffmpeg_bin();
        let spawn = std::thread::Builder::new()
            .name("capture-ffmpeg".into())
            .spawn(move || {
                let mut announced = false;
                let result = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
                    tetorica_native_capture::ffmpeg_capture::record(
                        &target_id,
                        &ffmpeg,
                        &dir,
                        &destination,
                        worker.stop.clone(),
                        |update| {
                            use tetorica_native_capture::ffmpeg_capture::CaptureUpdate;
                            match update {
                                CaptureUpdate::Started(hardware) => {
                                    announced = true;
                                    let _ = ready_tx.send(Ok(()));
                                    let _ = events.send(CaptureEvent {
                                        stage: "started".into(),
                                        message: None,
                                        hardware: Some(hardware),
                                        image: None,
                                    });
                                }
                                CaptureUpdate::Preview(image) => {
                                    let _ = events.send(CaptureEvent {
                                        stage: "preview".into(),
                                        message: None,
                                        hardware: None,
                                        image: Some(image),
                                    });
                                }
                            }
                        },
                    )
                }))
                .unwrap_or_else(|_| Err("Native FFmpeg capture failed".into()));
                if !announced {
                    let _ = ready_tx.send(Err(result
                        .clone()
                        .err()
                        .unwrap_or("Capture cancelled".into())));
                }
                if let Ok(mut current) = SESSION.lock() {
                    if current.as_ref().is_some_and(|s| s.id == worker.id) {
                        *current = None;
                    }
                }
                let succeeded = result.is_ok();
                let _ = events.send(CaptureEvent {
                    stage: if result.is_ok() { "saved" } else { "failed" }.into(),
                    message: Some(match result {
                        Ok(()) => destination.to_string_lossy().into_owned(),
                        Err(e) => format!("{e}. Recovery files: {}", dir.display()),
                    }),
                    hardware: None,
                    image: None,
                });
                // Successful captures are already copied; retain only failed sessions for recovery.
                if succeeded {
                    let _ = std::fs::remove_dir_all(&dir);
                }
            });
        if let Err(e) = spawn {
            return Err(e.to_string());
        }
        *current = Some(session.clone());
        drop(current);
        match ready_rx.recv_timeout(Duration::from_secs(30)) {
            Ok(Ok(())) => Ok(CaptureSession {
                session_id: id.clone(),
            }),
            Ok(Err(e)) => Err(e),
            Err(_) => {
                session.stop.store(true, Ordering::Relaxed);
                Err("FFmpeg capture timed out. Check screen capture permission and retry.".into())
            }
        }
    }
    pub fn progress(id: &str) -> Result<Option<super::RecordingProgress>, String> {
        let current = SESSION.lock().map_err(|e| e.to_string())?;
        Ok(current
            .as_ref()
            .filter(|s| s.id == id)
            .map(|s| super::RecordingProgress {
                elapsed_ms: s.started.elapsed().as_millis() as u64,
                bytes: std::fs::metadata(s.directory.join("recording.mp4"))
                    .map(|m| m.len())
                    .unwrap_or(0),
            }))
    }
    pub fn stop(id: Option<&str>) -> Result<(), String> {
        let current = SESSION.lock().map_err(|e| e.to_string())?;
        if let Some(session) = current
            .as_ref()
            .filter(|s| id.is_none() || id == Some(s.id.as_str()))
        {
            session.stop.store(true, Ordering::Relaxed);
        }
        Ok(())
    }
}
#[tauri::command]
pub async fn native_ffmpeg_capture_start(
    target_id: String,
    destination: String,
    events: Channel<CaptureEvent>,
) -> Result<CaptureSession, String> {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        return tauri::async_runtime::spawn_blocking(move || {
            desktop::start(target_id, destination.into(), events)
        })
        .await
        .map_err(|e| e.to_string())?;
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        let _ = (target_id, destination, events);
        Err("Native FFmpeg capture is unavailable".into())
    }
}
#[tauri::command]
pub fn native_ffmpeg_capture_stop(session_id: String) -> Result<(), String> {
    stop(Some(&session_id))
}
pub fn stop(id: Option<&str>) -> Result<(), String> {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        return desktop::stop(id);
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        let _ = id;
        Ok(())
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RecordingProgress {
    elapsed_ms: u64,
    bytes: u64,
}
#[tauri::command]
pub fn native_ffmpeg_capture_progress(
    session_id: String,
) -> Result<Option<RecordingProgress>, String> {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        desktop::progress(&session_id)
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        let _ = session_id;
        Ok(None)
    }
}
