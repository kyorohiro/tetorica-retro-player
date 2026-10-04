use tauri::ipc::{Channel, Response};

#[cfg(target_os = "macos")]
mod mac {
    use super::*;
    use std::ffi::c_void;
    use std::sync::{
        atomic::{AtomicUsize, Ordering},
        Arc, Mutex,
    };

    pub struct Session {
        id: String,
        channel: Channel<Response>,
        pending: AtomicUsize,
    }
    static SESSION: Mutex<Option<Arc<Session>>> = Mutex::new(None);
    extern "C" {
        fn retro_capture_available() -> bool;
        fn retro_capture_start(
            callback: unsafe extern "C" fn(*const u8, usize, *mut c_void),
            release: unsafe extern "C" fn(*mut c_void),
            context: *mut c_void,
        );
        fn retro_capture_stop();
    }
    unsafe extern "C" fn release(context: *mut c_void) {
        drop(Arc::from_raw(context.cast::<Session>()));
    }
    unsafe extern "C" fn packet(bytes: *const u8, len: usize, context: *mut c_void) {
        if bytes.is_null() || len == 0 {
            return;
        }
        let session = &*context.cast::<Session>();
        let data = std::slice::from_raw_parts(bytes, len);
        if data[0] == 1 || data[0] == 2 {
            // Bound IPC memory if the webview stalls. Dropped samples are never queued.
            if session.pending.fetch_add(1, Ordering::Relaxed) >= 32 {
                session.pending.fetch_sub(1, Ordering::Relaxed);
                return;
            }
            if session.channel.send(Response::new(data.to_vec())).is_err() {
                session.pending.fetch_sub(1, Ordering::Relaxed);
            }
        } else {
            let _ = session.channel.send(Response::new(data.to_vec()));
            if data[0] == 3 {
                if let Ok(mut current) = SESSION.lock() {
                    if current.as_ref().map(|s| s.id.as_str()) == Some(session.id.as_str()) {
                        *current = None;
                    }
                }
            }
        }
    }
    pub fn available() -> bool {
        unsafe { retro_capture_available() }
    }
    pub fn start(app: tauri::AppHandle, channel: Channel<Response>) -> Result<String, String> {
        if !available() {
            return Err("Native window capture requires macOS 14 or later.".into());
        }
        let mut current = SESSION.lock().map_err(|e| e.to_string())?;
        if current.is_some() {
            return Err("A native capture is already active.".into());
        }
        let session = Arc::new(Session {
            id: uuid::Uuid::new_v4().to_string(),
            channel,
            pending: AtomicUsize::new(0),
        });
        let id = session.id.clone();
        // Transfer a retained Arc to Swift on the main thread; its deinit releases it.
        let owned = session.clone();
        app.run_on_main_thread(move || unsafe {
            retro_capture_start(packet, release, Arc::into_raw(owned).cast_mut().cast());
        })
        .map_err(|e| e.to_string())?;
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
    pub fn stop(app: &tauri::AppHandle, id: Option<&str>) -> Result<(), String> {
        let current = SESSION.lock().map_err(|e| e.to_string())?;
        if current
            .as_ref()
            .is_some_and(|s| id.is_none() || id == Some(s.id.as_str()))
        {
            app.run_on_main_thread(|| unsafe { retro_capture_stop() })
                .map_err(|e| e.to_string())?;
        }
        Ok(())
    }
}

#[tauri::command]
pub fn native_capture_available() -> bool {
    #[cfg(target_os = "macos")]
    {
        return mac::available();
    }
    #[cfg(not(target_os = "macos"))]
    {
        false
    }
}
#[tauri::command]
pub fn native_capture_start(
    app: tauri::AppHandle,
    packets: Channel<Response>,
) -> Result<String, String> {
    #[cfg(target_os = "macos")]
    {
        return mac::start(app, packets);
    }
    #[cfg(not(target_os = "macos"))]
    {
        let _ = (app, packets);
        Err("Native window capture is only available on macOS.".into())
    }
}
#[tauri::command]
pub fn native_capture_ack(session_id: String, count: usize) {
    #[cfg(target_os = "macos")]
    mac::ack(&session_id, count);
    #[cfg(not(target_os = "macos"))]
    let _ = (session_id, count);
}
#[tauri::command]
pub fn native_capture_stop(app: tauri::AppHandle, session_id: String) -> Result<(), String> {
    stop(&app, Some(&session_id))
}
pub fn stop(app: &tauri::AppHandle, session_id: Option<&str>) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        return mac::stop(app, session_id);
    }
    #[cfg(not(target_os = "macos"))]
    {
        let _ = (app, session_id);
        Ok(())
    }
}
