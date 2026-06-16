use std::fs;
use std::io::{Seek, SeekFrom, Write};
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

use tauri::Manager;
use tetorica_mdrop_core::http::SharedHttpServerContext;

const MEDIA_SERVER_PORT: u16 = 19088;

struct MediaServerState {
    server: Mutex<SharedHttpServerContext>,
}

#[derive(serde::Serialize)]
struct MediaShareResult {
    id: String,
    url: String,
}

/// Start the local media HTTP server (idempotent — safe to call multiple times).
/// Returns the port the server is listening on.
#[tauri::command]
fn mdrop_start_server(state: tauri::State<'_, MediaServerState>) -> Result<u16, String> {
    let server = state.server.lock().map_err(|e| e.to_string())?;
    let status = server.start_server(
        "127.0.0.1".to_string(),
        MEDIA_SERVER_PORT,
        None,
        None,
        Some(false),
        Some(true),
    )?;
    status.port.ok_or_else(|| "server port unavailable".to_string())
}

/// Register a local file for streaming. Returns { id, url }.
/// url = "http://127.0.0.1:{port}/download/{id}"
#[tauri::command]
fn mdrop_share_file(
    state: tauri::State<'_, MediaServerState>,
    path: String,
) -> Result<MediaShareResult, String> {
    let server = state.server.lock().map_err(|e| e.to_string())?;
    let port = server
        .inner
        .lock()
        .map_err(|e| e.to_string())?
        .status
        .port
        .ok_or("media server not running — call mdrop_start_server first")?;

    let id = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_millis()
        .to_string();

    server
        .inner
        .lock()
        .map_err(|e| e.to_string())?
        .files
        .insert(id.clone(), std::path::PathBuf::from(&path));

    Ok(MediaShareResult {
        url: format!("http://127.0.0.1:{port}/download/{id}"),
        id,
    })
}

/// Unregister a previously shared file.
#[tauri::command]
fn mdrop_unshare_file(
    state: tauri::State<'_, MediaServerState>,
    id: String,
) -> Result<(), String> {
    let server = state.server.lock().map_err(|e| e.to_string())?;
    server
        .inner
        .lock()
        .map_err(|e| e.to_string())?
        .files
        .remove(&id);
    Ok(())
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn persist_recording_for_share(
    app: tauri::AppHandle,
    data: Vec<u8>,
    filename: String,
) -> Result<String, String> {
    let cache_dir = app
        .path()
        .app_cache_dir()
        .map_err(|error| error.to_string())?;
    let export_dir = cache_dir.join("share-source");

    fs::create_dir_all(&export_dir).map_err(|error| error.to_string())?;

    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|error| error.to_string())?
        .as_millis();
    let file_path = export_dir.join(format!("{timestamp}-{filename}"));

    fs::write(&file_path, data).map_err(|error| error.to_string())?;

    Ok(format!("file://{}", file_path.to_string_lossy()))
}

fn video_cache_dir(app: &tauri::AppHandle) -> Result<std::path::PathBuf, String> {
    let dir = app
        .path()
        .app_cache_dir()
        .map_err(|e| e.to_string())?
        .join("video-cache");
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    Ok(dir)
}

fn safe_filename(name: &str) -> String {
    name.chars()
        .map(|c| if c.is_alphanumeric() || c == '.' || c == '-' { c } else { '_' })
        .collect()
}

/// Write one chunk of a file being cached to app storage.
/// Call repeatedly with consecutive offsets; JS controls chunk size.
#[tauri::command]
fn write_media_chunk(
    app: tauri::AppHandle,
    session: String,
    offset: u64,
    data: Vec<u8>,
) -> Result<(), String> {
    let path = video_cache_dir(&app)?.join(safe_filename(&session));
    let mut file = fs::OpenOptions::new()
        .create(true)
        .write(true)
        .open(&path)
        .map_err(|e| e.to_string())?;
    file.seek(SeekFrom::Start(offset)).map_err(|e| e.to_string())?;
    file.write_all(&data).map_err(|e| e.to_string())?;
    Ok(())
}

/// Returns the absolute path to a cached video file.
#[tauri::command]
fn get_media_cache_path(app: tauri::AppHandle, session: String) -> Result<String, String> {
    let path = video_cache_dir(&app)?.join(safe_filename(&session));
    Ok(path.to_string_lossy().into_owned())
}

/// Delete all files in video-cache older than max_age_secs.
#[tauri::command]
fn cleanup_media_cache(app: tauri::AppHandle, max_age_secs: u64) -> Result<(), String> {
    let dir = video_cache_dir(&app)?;
    let cutoff = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_secs()
        .saturating_sub(max_age_secs);

    if let Ok(entries) = fs::read_dir(&dir) {
        for entry in entries.flatten() {
            if let Ok(meta) = entry.metadata() {
                if let Ok(modified) = meta.modified() {
                    if let Ok(d) = modified.duration_since(UNIX_EPOCH) {
                        if d.as_secs() < cutoff {
                            let _ = fs::remove_file(entry.path());
                        }
                    }
                }
            }
        }
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_sharekit::init())
        .manage(MediaServerState {
            server: Mutex::new(SharedHttpServerContext::new()),
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            persist_recording_for_share,
            write_media_chunk,
            get_media_cache_path,
            cleanup_media_cache,
            mdrop_start_server,
            mdrop_share_file,
            mdrop_unshare_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
