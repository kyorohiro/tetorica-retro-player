use axum::{
    body::Body,
    extract::{Path, State as AxumState},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
};
use std::path::PathBuf;
use tokio::process::Command;
use tokio::time::{sleep, Duration};

use crate::http::SharedHttpServerContext;
use crate::http_utils::apply_shared_security_headers;

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
        if file_path.exists() {
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
    let content = tokio::fs::read_to_string(&playlist)
        .await
        .map_err(|e| (StatusCode::NOT_FOUND, format!("playlist not ready: {e}")))?;

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

    let ffmpeg_cmd = {
        let ctx = state.inner.lock().unwrap();
        ctx.ffmpeg_path.clone().unwrap_or_else(|| PathBuf::from("ffmpeg"))
    };

    let mut child = Command::new(&ffmpeg_cmd)
        .args([
            "-y",
            "-i",
            &input,
            "-c:v",
            "libx264",
            "-preset",
            "ultrafast",
            "-tune",
            "zerolatency",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-f",
            "hls",
            "-hls_time",
            "2",
            "-hls_list_size",
            "0",
            "-hls_base_url",
            &base_url,
            "-hls_segment_filename",
            segment_pattern.to_str().unwrap(),
            playlist.to_str().unwrap(),
        ])
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::null())
        .spawn()
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("ffmpeg launch failed: {e}"),
            )
        })?;

    // Poll until the playlist references at least one segment (up to 30 s)
    let mut ready = false;
    for _ in 0..150 {
        if playlist.exists() {
            if let Ok(text) = std::fs::read_to_string(&playlist) {
                if text.contains(".ts") {
                    ready = true;
                    break;
                }
            }
        }
        sleep(Duration::from_millis(200)).await;
    }

    if !ready {
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

    Ok(tmp_dir)
}

/// Kill all active HLS ffmpeg processes.
pub async fn hls_cleanup_all(
    AxumState(state): AxumState<SharedHttpServerContext>,
) -> impl IntoResponse {
    let children: Vec<tokio::process::Child> = {
        let mut ctx = match state.inner.lock() {
            Ok(c) => c,
            Err(_) => return StatusCode::INTERNAL_SERVER_ERROR,
        };
        ctx.hls_children.drain().map(|(_, child)| child).collect()
    };

    for mut child in children {
        let _ = child.start_kill();
        tokio::spawn(async move { let _ = child.wait().await; });
    }

    StatusCode::NO_CONTENT
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
