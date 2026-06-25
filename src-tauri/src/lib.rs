use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};

use tauri::Manager;

mod ffmpeg;

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_sharekit::init());

    // sidecar ビルド時のみ tauri-plugin-ffmpeg を有効化
    #[cfg(feature = "ffmpeg-sidecar")]
    let builder = builder.plugin(tauri_plugin_ffmpeg::init());

    builder
        .invoke_handler(tauri::generate_handler![
            greet,
            persist_recording_for_share,
            ffmpeg::ffmpeg_exec,
            ffmpeg::get_ffmpeg_mode,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
