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
    port: Option<String>,
    id: Option<String>,
    password: Option<String>,
    is_https: Option<bool>,
    local_only: Option<bool>,
    web_enabled: Option<bool>,
}

#[tauri::command]
async fn mdrop_start_server(
    state: State<'_, MDropState>,
    req: StartServerRequest,
) -> Result<ServerStatus, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        let _ = req;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        let preferred_port = req
            .port
            .as_deref()
            .filter(|s| !s.is_empty())
            .map(|s| s.parse::<u16>().map_err(|_| "invalid port".to_string()))
            .transpose()?;
        let hostname = req.hostname.trim().trim_end_matches('/').to_string();
        state.server.start_server(
            hostname,
            preferred_port,
            req.id,
            req.password,
            req.is_https,
            req.local_only,
            req.web_enabled,
        )
    }
}

#[tauri::command]
async fn mdrop_stop_server(state: State<'_, MDropState>) -> Result<ServerStatus, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        state.server.stop_server()
    }
}

#[tauri::command]
async fn mdrop_get_server_status(state: State<'_, MDropState>) -> Result<ServerStatus, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Ok(ServerStatus {
            running: false,
            port: None,
            url: None,
            hostname: None,
            ips: None,
            id: None,
            password: None,
            local_only: None,
            is_https: None,
        })
    }

    #[cfg(not(target_os = "android"))]
    {
        state.server.status()
    }
}

#[derive(Debug, serde::Deserialize)]
struct ShareFileRequest {
    path: String,
}

#[derive(Debug, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct NativePathListRequest {
    paths: Vec<String>,
}

#[derive(Debug, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct NativePathEntry {
    source_path: String,
    path: String,
    is_dir: bool,
}

#[derive(Debug, serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct SharedFileInfo {
    id: String,
    name: String,
    path: String,
    url: String,
    is_dir: bool,
}

fn build_shared_file_info(
    state: &State<'_, MDropState>,
    path: PathBuf,
    display_path: String,
) -> Result<SharedFileInfo, String> {
    let name = PathBuf::from(&display_path)
        .file_name()
        .ok_or("invalid file name")?
        .to_string_lossy()
        .to_string();

    let id = uuid::Uuid::new_v4().simple().to_string();
    let is_dir = path.is_dir();

    let (hostname, port) = {
        let server = state.server.inner.lock().map_err(|e| e.to_string())?;
        (
            server.status.hostname.clone().ok_or("server not started")?,
            server.status.port.ok_or("server not started")?,
        )
    };

    state
        .server
        .inner
        .lock()
        .map_err(|e| e.to_string())?
        .files
        .insert(id.clone(), path);

    Ok(SharedFileInfo {
        id: id.clone(),
        name,
        is_dir,
        path: display_path,
        url: format!("http://{hostname}:{port}/download/{id}"),
    })
}

#[tauri::command]
async fn mdrop_share_file(
    state: State<'_, MDropState>,
    req: ShareFileRequest,
) -> Result<SharedFileInfo, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        let _ = req;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        let path = PathBuf::from(&req.path);
        build_shared_file_info(&state, path, req.path)
    }
}

fn collect_native_path_entries(
    real_path: &PathBuf,
    display_path: String,
    entries: &mut Vec<NativePathEntry>,
) -> Result<(), String> {
    let is_dir = real_path.is_dir();

    if !is_dir {
        entries.push(NativePathEntry {
            source_path: real_path.to_string_lossy().to_string(),
            path: display_path,
            is_dir: false,
        });
        return Ok(());
    }

    let read_dir = fs::read_dir(real_path).map_err(|error| error.to_string())?;
    let mut children: Vec<PathBuf> = read_dir
        .filter_map(|entry| entry.ok().map(|item| item.path()))
        .collect();
    children.sort();

    if children.is_empty() {
        entries.push(NativePathEntry {
            source_path: real_path.to_string_lossy().to_string(),
            path: display_path,
            is_dir: true,
        });
        return Ok(());
    }

    for child in children {
        let name = child
            .file_name()
            .ok_or("invalid file name")?
            .to_string_lossy()
            .to_string();
        let child_display_path = if display_path.is_empty() {
            name
        } else {
            format!("{display_path}/{name}")
        };
        collect_native_path_entries(&child, child_display_path, entries)?;
    }

    Ok(())
}

#[tauri::command]
async fn list_native_path_entries(
    req: NativePathListRequest,
) -> Result<Vec<NativePathEntry>, String> {
    let mut entries = Vec::new();

    for path in req.paths {
        let real_path = PathBuf::from(&path);
        let name = real_path
            .file_name()
            .ok_or("invalid file name")?
            .to_string_lossy()
            .to_string();
        collect_native_path_entries(&real_path, name, &mut entries)?;
    }

    Ok(entries)
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
    #[cfg(target_os = "android")]
    {
        let _ = state;
        let _ = req;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        let mut server = state.server.inner.lock().map_err(|e| e.to_string())?;
        server.files.remove(&req.id).ok_or("not found")?;
        Ok(())
    }
}

#[tauri::command]
async fn mdrop_unshare_all(state: State<'_, MDropState>) -> Result<(), String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        let mut server = state.server.inner.lock().map_err(|e| e.to_string())?;
        server.files.clear();
        drop(server);
        state.server.cleanup_hls_sessions();
        Ok(())
    }
}

#[tauri::command]
async fn mdrop_start_bonjour(state: State<'_, MDropState>) -> Result<BonjourStatus, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        let (hostname, port) = {
            let server = state.server.inner.lock().map_err(|e| e.to_string())?;
            (
                server.status.hostname.clone().ok_or("server not started")?,
                server.status.port.ok_or("server not started")?,
            )
        };
        state.bonjour.start(hostname, port)
    }
}

#[tauri::command]
async fn mdrop_stop_bonjour(state: State<'_, MDropState>) -> Result<BonjourStatus, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        state.bonjour.stop()
    }
}

#[tauri::command]
async fn mdrop_get_bonjour_status(state: State<'_, MDropState>) -> Result<BonjourStatus, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Ok(BonjourStatus {
            running: false,
            service_name: None,
            service_type: None,
            port: None,
        })
    }

    #[cfg(not(target_os = "android"))]
    {
        state.bonjour.status()
    }
}

#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
struct MdropConfig {
    api_key: String,
    server_url: Option<String>,
    ffmpeg_max_concurrent_hls_sessions: usize,
}

#[tauri::command]
async fn mdrop_get_config(state: State<'_, MDropState>) -> Result<MdropConfig, String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        let mut ctx = state.server.inner.lock().map_err(|e| e.to_string())?;
        Ok(MdropConfig {
            api_key: ctx.get_apikey(),
            server_url: ctx.status.url.clone(),
            ffmpeg_max_concurrent_hls_sessions: ctx.ffmpeg_max_concurrent_hls_sessions.max(1),
        })
    }
}

#[tauri::command]
async fn mdrop_set_ffmpeg_use_qsv(
    state: State<'_, MDropState>,
    enabled: bool,
) -> Result<(), String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        let _ = enabled;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        state.server.set_ffmpeg_use_qsv(enabled);
        Ok(())
    }
}

#[tauri::command]
async fn mdrop_set_ffmpeg_max_concurrent_hls_sessions(
    state: State<'_, MDropState>,
    limit: usize,
) -> Result<(), String> {
    #[cfg(target_os = "android")]
    {
        let _ = state;
        let _ = limit;
        Err("mDrop is disabled on android".to_string())
    }

    #[cfg(not(target_os = "android"))]
    {
        state.server.set_ffmpeg_max_concurrent_hls_sessions(limit);
        Ok(())
    }
}

// ---------------------------------------------------------------------------
// App entry point
// ---------------------------------------------------------------------------

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mdrop_server = SharedHttpServerContext::new();

    let mdrop_server_for_start = mdrop_server.clone();
    let mdrop_server_for_exit = mdrop_server.clone();

    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_sharekit::init())
        .manage(MDropState {
            server: mdrop_server.clone(),
            bonjour: SharedBonjourContext::new(),
        })
        .setup(move |app| {
            // Forward "Open With" file paths to the frontend (macOS/Linux only).
            // Windows: tauri-plugin-deep-link causes a freeze on startup; skip for now.
            #[cfg(target_os = "macos")]
            {
                use tauri::Emitter;
                use tauri_plugin_deep_link::DeepLinkExt;
                let handle = app.handle().clone();
                app.deep_link().on_open_url(move |event| {
                    let urls: Vec<String> = event.urls().iter().map(|u| u.to_string()).collect();
                    let _ = handle.emit("retro://open-files", urls);
                });
                // Files passed on cold launch (app not yet running)
                if let Ok(urls) = app.deep_link().get_current() {
                    if let Some(urls) = urls {
                        let paths: Vec<String> = urls.iter().map(|u| u.to_string()).collect();
                        if !paths.is_empty() {
                            let handle2 = app.handle().clone();
                            tauri::async_runtime::spawn_blocking(move || {
                                std::thread::sleep(std::time::Duration::from_millis(500));
                                let _ = handle2.emit("retro://open-files", paths);
                            });
                        }
                    }
                }
            }

            // Auto-start mDrop server on desktop platforms.
            // Wrapped in tauri::async_runtime::spawn so tokio::spawn inside
            // start_server runs within the Tauri-managed tokio runtime.
            #[cfg(not(any(target_os = "android", target_os = "ios")))]
            tauri::async_runtime::spawn(async move {
                match mdrop_server_for_start.start_server(
                    "localhost".to_string(),
                    Some(7878),
                    None,
                    None,
                    Some(false),
                    Some(true),
                    Some(false), // web_enabled: false by default
                ) {
                    Ok(status) => println!("[mDrop] server started: {:?}", status.url),
                    Err(e) => eprintln!("[mDrop] server failed to start: {e}"),
                }
            });

            #[cfg(feature = "ffmpeg-sidecar")]
            {
                let ffmpeg_path = crate::ffmpeg::ffmpeg_bin();
                mdrop_server.set_ffmpeg_path(ffmpeg_path.clone());

                // Pre-warm: run `ffmpeg -version` silently so macOS completes its
                // first-run GateKeeper check before the user plays a file.
                // FfmpegPrewarmHandle::complete() signals HLS requests to proceed.
                let prewarm = mdrop_server.setup_ffmpeg_prewarm();
                tauri::async_runtime::spawn_blocking(move || {
                    let mut cmd = std::process::Command::new(ffmpeg_path);
                    cmd.arg("-version")
                        .stdout(std::process::Stdio::null())
                        .stderr(std::process::Stdio::null());
                    #[cfg(windows)]
                    {
                        use std::os::windows::process::CommandExt;
                        cmd.creation_flags(0x0800_0000); // CREATE_NO_WINDOW
                    }
                    let _ = cmd.output();
                    prewarm.complete();
                });
            }

            let handle = app.handle().clone();
            mdrop_server.set_message_callback(move |msg| {
                use tauri::Emitter;
                let _ = handle.emit("mdrop://message", msg);
            });
            Ok(())
        });

    // deep-link: macOS only (Windows freezes on init; Linux untested)
    #[cfg(target_os = "macos")]
    let builder = builder.plugin(tauri_plugin_deep_link::init());

    #[cfg(feature = "ffmpeg-sidecar")]
    let builder = builder.plugin(tauri_plugin_ffmpeg::init());

    let app = builder
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
            list_native_path_entries,
            mdrop_unshare_file,
            mdrop_unshare_all,
            mdrop_start_bonjour,
            mdrop_stop_bonjour,
            mdrop_get_bonjour_status,
            mdrop_get_config,
            mdrop_set_ffmpeg_use_qsv,
            mdrop_set_ffmpeg_max_concurrent_hls_sessions,
        ])
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    app.run(move |_app, event| {
        if matches!(event, tauri::RunEvent::Exit) {
            let _ = mdrop_server_for_exit.stop_server();
            mdrop_server_for_exit.cleanup_hls_sessions();
        }
    });
}
