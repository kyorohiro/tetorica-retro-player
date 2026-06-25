use axum::{
    body::Body,
    extract::{Path, State as AxumState},
    http::{header, StatusCode},
    response::Response,
};
use std::path::PathBuf;
use tokio::process::Command;
use tokio::time::{sleep, Duration};

use crate::http::SharedHttpServerContext;
use crate::http_utils::apply_shared_security_headers;

/// Serve the HLS playlist (.m3u8).
/// On first request for a given id, launches ffmpeg to transcode → HLS segments in a temp dir.
pub async fn hls_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(id): Path<String>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let tmp_dir = ensure_hls_session(&state, &id).await?;
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

/// Serve an individual HLS segment (.ts).
/// Waits up to 10 s for the segment to be written by ffmpeg before returning 404.
pub async fn hls_segment(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((id, filename)): Path<(String, String)>,
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
            .get(&id)
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

/// Ensures an HLS session exists for the given file id.
/// If ffmpeg hasn't been started yet, starts it and waits for the first segment.
async fn ensure_hls_session(
    state: &SharedHttpServerContext,
    id: &str,
) -> Result<PathBuf, (StatusCode, String)> {
    // Return existing session if already running
    {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        if let Some(dir) = ctx.hls_sessions.get(id) {
            return Ok(dir.clone());
        }
    }

    // Look up source file
    let src_path = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.files
            .get(id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "file not registered".to_string()))?
    };

    let input = src_path
        .to_str()
        .ok_or((StatusCode::BAD_REQUEST, "invalid file path".to_string()))?
        .to_string();

    // Create a temp dir for this session
    let tmp_dir = std::env::temp_dir().join(format!("retro-hls-{}", id));
    std::fs::create_dir_all(&tmp_dir).map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("failed to create temp dir: {e}"),
        )
    })?;

    let playlist = tmp_dir.join("index.m3u8");
    let segment_pattern = tmp_dir.join("seg%03d.ts");

    // Spawn ffmpeg; detach via tokio::spawn so it keeps running after this fn returns
    let mut child = Command::new("ffmpeg")
        .args([
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

    tokio::spawn(async move {
        let _ = child.wait().await;
    });

    // Poll until the playlist contains at least one segment reference (up to 30 s)
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

    // Register the session so subsequent requests skip setup
    {
        let mut ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.hls_sessions.insert(id.to_string(), tmp_dir.clone());
    }

    Ok(tmp_dir)
}
