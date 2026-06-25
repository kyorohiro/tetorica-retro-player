use std::fs;
use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};

use tauri::{Manager, State};

use tetorica_mdrop_core::bonjour::{BonjourStatus, SharedBonjourContext};
use tetorica_mdrop_core::http::{ServerStatus, SharedHttpServerContext};

mod ffmpeg;

// ---------------------------------------------------------------------------
// Existing commands
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// mDrop state
// ---------------------------------------------------------------------------

struct MDropState {
    server: SharedHttpServerContext,
    bonjour: SharedBonjourContext,
}

// ---------------------------------------------------------------------------
// mDrop commands
// ---------------------------------------------------------------------------

#[derive(Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct StartServerRequest {
    hostname: String,
    port: String,
    id: Option<String>,
    password: Option<String>,
    is_https: Option<bool>,
    local_only: Option<bool>,
}

#[tauri::command]
async fn mdrop_start_server(
    state: State<'_, MDropState>,
    req: StartServerRequest,
) -> Result<ServerStatus, String> {
    let port: u16 = req.port.parse().map_err(|_| "invalid port".to_string())?;
    let hostname = req.hostname.trim().trim_end_matches('/').to_string();
    state.server.start_server(
        hostname,
        port,
        req.id,
        req.password,
        req.is_https,
        req.local_only,
    )
}

#[tauri::command]
async fn mdrop_stop_server(state: State<'_, MDropState>) -> Result<ServerStatus, String> {
    state.server.stop_server()
}

#[tauri::command]
async fn mdrop_get_server_status(state: State<'_, MDropState>) -> Result<ServerStatus, String> {
    state.server.status()
}

#[derive(Debug, serde::Deserialize)]
struct ShareFileRequest {
    path: String,
}

#[derive(Debug, serde::Serialize)]
struct SharedFileInfo {
    id: String,
    name: String,
    path: String,
    url: String,
}

#[tauri::command]
async fn mdrop_share_file(
    state: State<'_, MDropState>,
    req: ShareFileRequest,
) -> Result<SharedFileInfo, String> {
    let path = PathBuf::from(&req.path);
    let name = path
        .file_name()
        .ok_or("invalid file name")?
        .to_string_lossy()
        .to_string();

    let id = format!("{}", chrono::Utc::now().timestamp_millis());

    let (hostname, port) = {
        let server = state.server.inner.lock().map_err(|e| e.to_string())?;
        (
            server.status.hostname.clone().ok_or("server not started")?,
            server.status.port.ok_or("server not started")?,
        )
    };

    state.server.inner.lock().map_err(|e| e.to_string())?
        .files.insert(id.clone(), path);

    Ok(SharedFileInfo {
        id: id.clone(),
        name,
        path: req.path,
        url: format!("http://{hostname}:{port}/download/{id}"),
    })
}

#[derive(Debug, serde::Deserialize)]
struct UnshareFileRequest {
    id: String,
}

#[tauri::command]
async fn mdrop_unshare_file(
    state: State<'_, MDropState>,
    req: UnshareFileRequest,
) -> Result<(), String> {
    let mut server = state.server.inner.lock().map_err(|e| e.to_string())?;
    server.files.remove(&req.id).ok_or("not found")?;
    Ok(())
}

#[tauri::command]
async fn mdrop_unshare_all(state: State<'_, MDropState>) -> Result<(), String> {
    let mut server = state.server.inner.lock().map_err(|e| e.to_string())?;
    server.files.clear();
    Ok(())
}

#[tauri::command]
async fn mdrop_start_bonjour(state: State<'_, MDropState>) -> Result<BonjourStatus, String> {
    let (hostname, port) = {
        let server = state.server.inner.lock().map_err(|e| e.to_string())?;
        (
            server.status.hostname.clone().ok_or("server not started")?,
            server.status.port.ok_or("server not started")?,
        )
    };
    state.bonjour.start(hostname, port)
}

#[tauri::command]
async fn mdrop_stop_bonjour(state: State<'_, MDropState>) -> Result<BonjourStatus, String> {
    state.bonjour.stop()
}

#[tauri::command]
async fn mdrop_get_bonjour_status(state: State<'_, MDropState>) -> Result<BonjourStatus, String> {
    state.bonjour.status()
}

#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct MdropConfig {
    api_key: String,
    server_url: Option<String>,
}

#[tauri::command]
async fn mdrop_get_config(state: State<'_, MDropState>) -> Result<MdropConfig, String> {
    let mut ctx = state.server.inner.lock().map_err(|e| e.to_string())?;
    Ok(MdropConfig {
        api_key: ctx.get_apikey(),
        server_url: ctx.status.url.clone(),
    })
}

// ---------------------------------------------------------------------------
// App entry point
// ---------------------------------------------------------------------------

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mdrop_server = SharedHttpServerContext::new();

    let mdrop_server_for_start = mdrop_server.clone();

    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_sharekit::init())
        .manage(MDropState {
            server: mdrop_server.clone(),
            bonjour: SharedBonjourContext::new(),
        })
        .setup(move |app| {
            // Auto-start mDrop server on desktop platforms.
            // Wrapped in tauri::async_runtime::spawn so tokio::spawn inside
            // start_server runs within the Tauri-managed tokio runtime.
            #[cfg(not(any(target_os = "android", target_os = "ios")))]
            tauri::async_runtime::spawn(async move {
                match mdrop_server_for_start.start_server(
                    "localhost".to_string(),
                    7878,
                    None,
                    None,
                    Some(false),
                    Some(true),
                ) {
                    Ok(status) => println!("[mDrop] server started: {:?}", status.url),
                    Err(e) => eprintln!("[mDrop] server failed to start: {e}"),
                }
            });

            let handle = app.handle().clone();
            mdrop_server.set_message_callback(move |msg| {
                use tauri::Emitter;
                let _ = handle.emit("mdrop://message", msg);
            });
            Ok(())
        });

    #[cfg(feature = "ffmpeg-sidecar")]
    let builder = builder.plugin(tauri_plugin_ffmpeg::init());

    builder
        .invoke_handler(tauri::generate_handler![
            greet,
            persist_recording_for_share,
            // ffmpeg
            ffmpeg::ffmpeg_exec,
            ffmpeg::get_ffmpeg_mode,
            // mdrop
            mdrop_start_server,
            mdrop_stop_server,
            mdrop_get_server_status,
            mdrop_share_file,
            mdrop_unshare_file,
            mdrop_unshare_all,
            mdrop_start_bonjour,
            mdrop_stop_bonjour,
            mdrop_get_bonjour_status,
            mdrop_get_config,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
