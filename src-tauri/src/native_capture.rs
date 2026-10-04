use tauri::ipc::{Channel, Response};
use tetorica_target::CaptureTarget;

// Keep commands available on Linux/mobile so frontend fallback remains predictable.
#[cfg(any(target_os = "macos", target_os = "windows"))]
use tetorica_native_capture as tetorica_target;
#[cfg(not(any(target_os = "macos", target_os = "windows")))]
mod tetorica_target {
    #[derive(serde::Serialize)]
    pub struct CaptureTarget {}
}

#[cfg(any(target_os = "macos", target_os = "windows"))]
mod desktop {
    use super::*;
    use std::sync::{
        atomic::{AtomicBool, AtomicUsize, Ordering},
        Arc, Mutex,
    };
    struct Session {
        id: String,
        channel: Channel<Response>,
        pending: AtomicUsize,
        stopping: Arc<AtomicBool>,
    }
    static SESSION: Mutex<Option<Arc<Session>>> = Mutex::new(None);

    pub fn start(target_id: String, channel: Channel<Response>) -> Result<String, String> {
        // Replacing a source stops the previous worker before opening a new one.
        stop(None)?;
        let deadline = std::time::Instant::now() + std::time::Duration::from_secs(3);
        loop {
            if SESSION.lock().map_err(|e| e.to_string())?.is_none() {
                break;
            }
            if std::time::Instant::now() >= deadline {
                return Err("The previous capture is still stopping. Try again.".into());
            }
            std::thread::sleep(std::time::Duration::from_millis(50));
        }
        let mut current = SESSION.lock().map_err(|e| e.to_string())?;
        if current.is_some() {
            return Err("A native capture is already active. Wait for it to stop.".into());
        }
        let session = Arc::new(Session {
            id: uuid::Uuid::new_v4().to_string(),
            channel,
            pending: AtomicUsize::new(0),
            stopping: Arc::new(AtomicBool::new(false)),
        });
        let id = session.id.clone();
        let worker = session.clone();
        std::thread::Builder::new().name("native-capture".into()).spawn(move || {
            let result = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
                tetorica_native_capture::run(&target_id, worker.stopping.clone(), |data| {
                    if worker.stopping.load(Ordering::Relaxed) { return false; }
                    let media = data[0] == 1 || data[0] == 2;
                    if media && worker.pending.fetch_add(1, Ordering::Relaxed) >= 32 {
                        worker.pending.fetch_sub(1, Ordering::Relaxed);
                        return true;
                    }
                    if worker.channel.send(Response::new(data)).is_err() {
                        if media { worker.pending.fetch_sub(1, Ordering::Relaxed); }
                        return false;
                    }
                    true
                })
            }));
            let message = match result {
                Ok(Ok(())) => String::new(),
                Ok(Err(message)) => message,
                Err(_) => "Native capture could not start. Check screen/audio permission and the selected source.".into(),
            };
            // Clear only this session, before notifying frontend that it may start another.
            if let Ok(mut current) = SESSION.lock() {
                if current.as_ref().is_some_and(|s| s.id == worker.id) { *current = None; }
            }
            let mut packet = vec![3];
            packet.extend_from_slice(message.as_bytes());
            let _ = worker.channel.send(Response::new(packet));
        }).map_err(|e| e.to_string())?;
        *current = Some(session);
        Ok(id)
    }
    pub fn ack(id: &str, count: usize) {
        if let Ok(current) = SESSION.lock() {
            if let Some(session) = current.as_ref().filter(|s| s.id == id) {
                let _ = session
                    .pending
                    .fetch_update(Ordering::Relaxed, Ordering::Relaxed, |n| {
                        Some(n.saturating_sub(count))
                    });
            }
        }
    }
    pub fn stop(id: Option<&str>) -> Result<(), String> {
        let current = SESSION.lock().map_err(|e| e.to_string())?;
        if let Some(session) = current
            .as_ref()
            .filter(|s| id.is_none() || id == Some(s.id.as_str()))
        {
            session.stopping.store(true, Ordering::Relaxed);
        }
        Ok(())
    }
}
#[tauri::command]
pub fn native_capture_available() -> bool {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        return tetorica_native_capture::available();
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        false
    }
}
#[tauri::command]
pub async fn native_capture_targets() -> Result<Vec<CaptureTarget>, String> {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        return tauri::async_runtime::spawn_blocking(tetorica_native_capture::targets)
            .await
            .map_err(|e| e.to_string())?;
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        Err("Native capture is unavailable on this platform.".into())
    }
}
#[tauri::command]
pub async fn native_capture_start(
    target_id: String,
    packets: Channel<Response>,
) -> Result<String, String> {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        return tauri::async_runtime::spawn_blocking(move || desktop::start(target_id, packets))
            .await
            .map_err(|e| e.to_string())?;
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        let _ = (target_id, packets);
        Err("Native capture is unavailable on this platform.".into())
    }
}
#[tauri::command]
pub fn native_capture_ack(session_id: String, count: usize) {
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    desktop::ack(&session_id, count);
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    let _ = (session_id, count);
}
#[tauri::command]
pub fn native_capture_stop(app: tauri::AppHandle, session_id: String) -> Result<(), String> {
    stop(&app, Some(&session_id))
}
pub fn stop(app: &tauri::AppHandle, session_id: Option<&str>) -> Result<(), String> {
    let _ = app;
    #[cfg(any(target_os = "macos", target_os = "windows"))]
    {
        return desktop::stop(session_id);
    }
    #[cfg(not(any(target_os = "macos", target_os = "windows")))]
    {
        let _ = session_id;
        Ok(())
    }
}
