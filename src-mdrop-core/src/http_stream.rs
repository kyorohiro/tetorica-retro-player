use axum::{
    body::Body,
    extract::{Path, State as AxumState},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
};
use std::path::{Path as FsPath, PathBuf};
use tokio::process::Command;
use tokio::time::{sleep, Duration};

use crate::http::SharedHttpServerContext;
use crate::http_utils::apply_shared_security_headers;

#[cfg(windows)]
use std::os::windows::process::CommandExt;

/// Serve HLS playlist for a directly registered file.
pub async fn hls_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(id): Path<String>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let tmp_dir = ensure_hls_session(&state, &id).await?;
    serve_playlist(&tmp_dir).await
}

/// Serve HLS playlist for a file inside a registered folder.
/// URL: /hls-sub/{folder_id}/{*subpath}
pub async fn hls_sub_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((folder_id, subpath)): Path<(String, String)>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let session_id = sub_session_id(&folder_id, &subpath);

    // Return existing session if already started
    let existing = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.hls_sessions.get(&session_id).cloned()
    };
    if let Some(dir) = existing {
        return serve_playlist(&dir).await;
    }

    // Resolve absolute file path from folder registration
    let (folder_path, port) = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        let fp = ctx
            .files
            .get(&folder_id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "folder not registered".to_string()))?;
        let port = ctx.status.port.unwrap_or(7878);
        (fp, port)
    };

    let clean = subpath.trim_start_matches('/');
    let file_path = folder_path.join(clean);

    let tmp_dir = start_hls_for_path(&state, &session_id, &file_path, port).await?;
    serve_playlist(&tmp_dir).await
}

/// Serve an individual HLS segment (.ts).
/// Works for both direct-file and sub-file sessions (session_id is the map key).
pub async fn hls_segment(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((session_id, filename)): Path<(String, String)>,
) -> Result<Response<Body>, (StatusCode, String)> {
    if !filename.ends_with(".ts") {
        return Err((StatusCode::BAD_REQUEST, "invalid segment filename".to_string()));
    }

    let tmp_dir = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.hls_sessions
            .get(&session_id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "session not found".to_string()))?
    };

    let file_path = tmp_dir.join(&filename);

    // Wait for the segment to be written (ffmpeg may still be transcoding)
    for _ in 0..50 {
        if is_segment_ready(&file_path) {
            break;
        }
        sleep(Duration::from_millis(200)).await;
    }

    let content = tokio::fs::read(&file_path)
        .await
        .map_err(|e| (StatusCode::NOT_FOUND, format!("segment not found: {e}")))?;

    let mut res = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "video/mp2t")
        .header(header::CACHE_CONTROL, "no-cache")
        .body(Body::from(content))
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    apply_shared_security_headers(&mut res);
    Ok(res)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/// Read and return the playlist file as an HTTP response.
async fn serve_playlist(tmp_dir: &PathBuf) -> Result<Response<Body>, (StatusCode, String)> {
    let playlist = tmp_dir.join("index.m3u8");
    let content = wait_for_playlist_ready(&playlist, 50, Duration::from_millis(200))
        .await
        .map_err(|e| (StatusCode::NOT_FOUND, e))?;

    let mut res = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/vnd.apple.mpegurl")
        .header(header::CACHE_CONTROL, "no-cache")
        .body(Body::from(content))
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    apply_shared_security_headers(&mut res);
    Ok(res)
}

/// Ensure an HLS session exists for a directly registered file id.
async fn ensure_hls_session(
    state: &SharedHttpServerContext,
    id: &str,
) -> Result<PathBuf, (StatusCode, String)> {
    let existing = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.hls_sessions.get(id).cloned()
    };
    if let Some(dir) = existing {
        return Ok(dir);
    }

    let (src_path, port) = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        let path = ctx
            .files
            .get(id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "file not registered".to_string()))?;
        let port = ctx.status.port.unwrap_or(7878);
        (path, port)
    };

    start_hls_for_path(state, id, &src_path, port).await
}

/// Spawn ffmpeg → HLS for the given file path, wait for first segment, register session.
async fn start_hls_for_path(
    state: &SharedHttpServerContext,
    session_id: &str,
    file_path: &PathBuf,
    port: u16,
) -> Result<PathBuf, (StatusCode, String)> {
    let input = file_path
        .to_str()
        .ok_or((StatusCode::BAD_REQUEST, "invalid file path".to_string()))?
        .to_string();

    let tmp_dir = std::env::temp_dir().join(format!("retro-hls-{}", session_id));
    if tmp_dir.exists() {
        let _ = std::fs::remove_dir_all(&tmp_dir);
    }
    std::fs::create_dir_all(&tmp_dir).map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("failed to create temp dir: {e}"),
        )
    })?;

    let playlist = tmp_dir.join("index.m3u8");
    let segment_pattern = tmp_dir.join("seg%03d.ts");
    // Absolute base URL so WKWebView fetches segments from our server regardless of
    // which playlist route was used (direct /hls/ or sub-file /hls-sub/).
    let base_url = format!("http://localhost:{}/hls/{}/", port, session_id);

    let (ffmpeg_cmd, prewarm_rx) = {
        let ctx = state.inner.lock().unwrap();
        (
            ctx.ffmpeg_path.clone().unwrap_or_else(|| PathBuf::from("ffmpeg")),
            ctx.ffmpeg_prewarm_rx.clone(),
        )
    };

    // Wait for the pre-warm (macOS GateKeeper check) to complete before
    // spawning ffmpeg. Without this, the first HLS request races against the
    // GateKeeper check and the 30-second poll timeout is exceeded.
    if let Some(mut rx) = prewarm_rx {
        if !*rx.borrow() {
            let _ = tokio::time::timeout(Duration::from_secs(90), rx.changed()).await;
        }
    }

    // Phase 1: stream-copy (no re-encode, near-zero CPU — works for H.264/AAC sources).
    // Phase 2: h264_qsv hardware encode (Intel Quick Sync / NVIDIA / AMD if available).
    // Phase 3: libx264 software fallback.
    let hls_common_args: Vec<&str> = vec![
        "-f", "hls",
        "-hls_time", "2",
        "-hls_list_size", "0",
        "-hls_base_url", &base_url,
        "-hls_segment_filename", segment_pattern.to_str().unwrap(),
        playlist.to_str().unwrap(),
    ];

    println!(
        "[HLS] start session={} input={} tmp_dir={}",
        session_id,
        input,
        tmp_dir.display()
    );

    // Helper: spawn ffmpeg with given args, poll until a .ts segment appears.
    // Returns (child, ready). Kills and cleans up playlist on failure before returning.
    macro_rules! try_ffmpeg {
        ($extra_args:expr, $poll_count:expr) => {{
            let mut c = new_ffmpeg_command(&ffmpeg_cmd);
            c.args($extra_args)
                .args(&hls_common_args)
                .stdout(std::process::Stdio::null())
                .stderr(std::process::Stdio::null());
            let mut c = c
                .spawn()
                .map_err(|e| {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        format!("ffmpeg launch failed: {e}"),
                    )
                })?;
            let ok = wait_for_playlist_ready(&playlist, $poll_count, Duration::from_millis(200))
                .await
                .is_ok();
            if !ok {
                let _ = c.start_kill();
                let _ = c.wait().await;
                let _ = std::fs::remove_dir_all(&tmp_dir);
                std::fs::create_dir_all(&tmp_dir).map_err(|e| {
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        format!("failed to recreate temp dir: {e}"),
                    )
                })?;
            }
            (c, ok)
        }};
    }

    // Phase 1: copy (6 s timeout)
    let (mut child, mut ready) = try_ffmpeg!(
        ["-y", "-i", &input, "-c:v", "copy", "-c:a", "aac", "-b:a", "128k"],
        30
    );

    // Guard: VP8/VP9/AV1 inputs can make ffmpeg silently produce audio-only TS
    // (codec not supported in container, video stream dropped without error).
    // If the first segment has no video stream, treat copy as failed and re-encode.
    if ready {
        let seg_path = std::fs::read_to_string(&playlist)
            .ok()
            .and_then(|c| first_segment_from_playlist(&c).map(|n| {
                tmp_dir.join(n.rsplit('/').next().unwrap_or(&n).to_owned())
            }));
        if let Some(seg) = seg_path {
            if !segment_has_video_stream(&ffmpeg_cmd, &seg).await {
                println!("[HLS] Phase 1 copy: no video stream in segment for session={session_id}, falling back to re-encode");
                ready = false;
                let _ = child.start_kill();
                let _ = child.wait().await;
                let _ = std::fs::remove_dir_all(&tmp_dir);
                std::fs::create_dir_all(&tmp_dir).map_err(|e| (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("failed to recreate temp dir: {e}"),
                ))?;
            }
        }
    }

    // Phase 2: h264_qsv hardware encode (10 s — fails fast if GPU unavailable)
    if !ready {
        println!(
            "[HLS] copy path not ready for session={}, retrying with h264_qsv",
            session_id
        );
        (child, ready) = try_ffmpeg!(
            ["-y", "-i", &input, "-c:v", "h264_qsv", "-c:a", "aac", "-b:a", "128k"],
            50
        );
    }

    // Phase 3: libx264 software fallback (30 s)
    if !ready {
        println!(
            "[HLS] h264_qsv not ready for session={}, retrying with libx264",
            session_id
        );
        (child, ready) = try_ffmpeg!(
            [
                "-y", "-i", &input,
                "-c:v", "libx264",
                "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
                "-pix_fmt", "yuv420p",   // force 8-bit; VP9 10-bit inputs would produce h264 high10 otherwise
                "-preset", "ultrafast",
                "-tune", "zerolatency",
                "-c:a", "aac", "-b:a", "128k",
            ],
            150
        );
    }

    if !ready {
        eprintln!("[HLS] ffmpeg did not produce readable HLS output in time for session={session_id}");
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "ffmpeg did not produce HLS output in time".to_string(),
        ));
    }

    {
        let mut ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.hls_sessions.insert(session_id.to_string(), tmp_dir.clone());
        ctx.hls_children.insert(session_id.to_string(), child);
    }

    println!("[HLS] session ready session={} playlist={}", session_id, playlist.display());

    Ok(tmp_dir)
}

/// Kill all active HLS ffmpeg processes.
pub async fn hls_cleanup_all(
    AxumState(state): AxumState<SharedHttpServerContext>,
) -> impl IntoResponse {
    let (children, session_dirs): (Vec<tokio::process::Child>, Vec<PathBuf>) = {
        let mut ctx = match state.inner.lock() {
            Ok(c) => c,
            Err(_) => return StatusCode::INTERNAL_SERVER_ERROR,
        };
        let children = ctx.hls_children.drain().map(|(_, child)| child).collect();
        let session_dirs = ctx.hls_sessions.drain().map(|(_, dir)| dir).collect();
        (children, session_dirs)
    };

    for mut child in children {
        let _ = child.start_kill();
        tokio::spawn(async move { let _ = child.wait().await; });
    }

    for dir in session_dirs {
        let _ = std::fs::remove_dir_all(&dir);
    }

    println!("[HLS] cleanup completed");

    StatusCode::NO_CONTENT
}

fn is_segment_ready(path: &FsPath) -> bool {
    std::fs::metadata(path)
        .map(|meta| meta.is_file() && meta.len() > 0)
        .unwrap_or(false)
}

/// Run `ffmpeg -i <segment>` and check stderr for "Video:" to detect video streams.
/// Returns true when a video stream is found, or when the probe itself fails (safe default).
/// Note: ffmpeg -i always exits with error code 1 when no output is specified;
/// we only care about the stderr content, not the exit code.
async fn segment_has_video_stream(ffmpeg_cmd: &PathBuf, path: &FsPath) -> bool {
    let Some(path_str) = path.to_str() else {
        return true;
    };
    let mut cmd = new_ffmpeg_command(ffmpeg_cmd);
    cmd.args(["-hide_banner", "-i", path_str])
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::piped());
    let Ok(out) = cmd.output().await else {
        return true;
    };
    // Stream info ("Video: h264 ...") is printed at INFO level (default).
    // An audio-only segment will have no "Video:" line.
    String::from_utf8_lossy(&out.stderr).contains("Video:")
}

/// Create a Command for ffmpeg with platform-specific flags.
/// On Windows, CREATE_NO_WINDOW prevents ffmpeg from flashing a console window.
fn new_ffmpeg_command(ffmpeg_cmd: &PathBuf) -> Command {
    let mut cmd = Command::new(ffmpeg_cmd);
    // tokio::process::Command exposes creation_flags() directly on Windows.
    #[cfg(windows)]
    cmd.creation_flags(0x0800_0000); // CREATE_NO_WINDOW
    cmd
}

fn first_segment_from_playlist(content: &str) -> Option<String> {
    content
        .lines()
        .map(str::trim)
        .find(|line| !line.is_empty() && !line.starts_with('#') && line.ends_with(".ts"))
        .map(ToOwned::to_owned)
}

async fn wait_for_playlist_ready(
    playlist: &FsPath,
    attempts: usize,
    delay: Duration,
) -> Result<String, String> {
    for _ in 0..attempts {
        if let Ok(content) = std::fs::read_to_string(playlist) {
            if let Some(segment_name) = first_segment_from_playlist(&content) {
                let segment_path = playlist
                    .parent()
                    .unwrap_or_else(|| FsPath::new("."))
                    .join(segment_name.rsplit('/').next().unwrap_or(&segment_name));
                if is_segment_ready(&segment_path) {
                    return Ok(content);
                }
            }
        }
        sleep(delay).await;
    }

    Err(format!("playlist not ready: {}", playlist.display()))
}

/// Deterministic session id for a file inside a registered folder.
/// Must be URL-path-safe (alphanumeric + dash only).
fn sub_session_id(folder_id: &str, subpath: &str) -> String {
    let safe: String = subpath
        .trim_start_matches('/')
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() || c == '-' || c == '_' {
                c
            } else {
                '-'
            }
        })
        .take(64)
        .collect();
    format!("s{}-{}", folder_id, safe)
}
