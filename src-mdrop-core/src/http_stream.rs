use axum::{
    body::Body,
    extract::{Path, Query, State as AxumState},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
};
use serde::Deserialize;
use std::path::{Path as FsPath, PathBuf};
use tokio::process::Command;
use tokio::time::{sleep, Duration};
use tokio_util::io::ReaderStream;

use crate::http::SharedHttpServerContext;
use crate::http_utils::apply_shared_security_headers;

#[cfg(windows)]
use std::os::windows::process::CommandExt;

const HLS_TRANSCODE_SCALE_FILTER: &str =
    "scale=640:360:force_original_aspect_ratio=decrease:force_divisible_by=2";
const HLS_TRANSCODE_FPS: &str = "15";
const HLS_SEGMENT_DURATION_SECONDS: &str = "4";
const HLS_VIDEO_AUDIO_BITRATE: &str = "96k";

/// Serve HLS playlist for a directly registered file.
pub async fn hls_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(id): Path<String>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let tmp_dir = ensure_hls_session(&state, &id).await?;
    state.touch_hls_session(&id);
    serve_playlist(&tmp_dir).await
}

/// Serve HLS playlist for a file inside a registered folder.
/// URL: /hls-sub/{folder_id}/{*subpath}
pub async fn hls_sub_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((folder_id, subpath)): Path<(String, String)>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let session_id = sub_session_id(&folder_id, &subpath);

    if let Some(dir) = wait_for_existing_or_starting_session(&state, &session_id).await? {
        state.touch_hls_session(&session_id);
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

/// Serve audio-only HLS playlist for a directly registered file.
pub async fn audio_hls_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(id): Path<String>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let session_id = format!("audio-{id}");
    let src_path = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.files
            .get(&id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "file not registered".to_string()))?
    };
    let port = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.status.port.unwrap_or(7878)
    };

    if let Some(dir) = wait_for_existing_or_starting_session(&state, &session_id).await? {
        state.touch_hls_session(&session_id);
        return serve_playlist(&dir).await;
    }

    let tmp_dir = start_audio_hls_for_path(&state, &session_id, &src_path, port).await?;
    state.touch_hls_session(&session_id);
    serve_playlist(&tmp_dir).await
}

/// Serve audio-only HLS playlist for a file inside a registered folder.
pub async fn audio_hls_sub_playlist(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((folder_id, subpath)): Path<(String, String)>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let session_id = format!("audio-{}", sub_session_id(&folder_id, &subpath));

    if let Some(dir) = wait_for_existing_or_starting_session(&state, &session_id).await? {
        state.touch_hls_session(&session_id);
        return serve_playlist(&dir).await;
    }

    let file_path = resolve_folder_subpath(&state, &folder_id, &subpath)?;
    let port = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.status.port.unwrap_or(7878)
    };

    let tmp_dir = start_audio_hls_for_path(&state, &session_id, &file_path, port).await?;
    state.touch_hls_session(&session_id);
    serve_playlist(&tmp_dir).await
}

/// Stream AAC-in-MP4 audio for a directly registered file id.
pub async fn audio_stream(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(id): Path<String>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let src_path = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.files
            .get(&id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "file not registered".to_string()))?
    };

    stream_audio_for_path(&state, &src_path).await
}

/// Stream AAC-in-MP4 audio for a file inside a registered folder.
pub async fn audio_sub_stream(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((folder_id, subpath)): Path<(String, String)>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let file_path = resolve_folder_subpath(&state, &folder_id, &subpath)?;
    stream_audio_for_path(&state, &file_path).await
}

#[derive(Deserialize)]
pub struct AudioSubStreamM4aQuery {
    subpath: String,
}

#[derive(Deserialize)]
pub struct HlsSubPlaylistQuery {
    subpath: String,
}

/// Stream AAC-in-MP4 audio for a file inside a registered folder with an
/// explicit .m4a suffix in the URL so Safari/WebKit recognizes it as an MP4
/// audio resource instead of keying off the original source extension.
pub async fn audio_sub_stream_m4a(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path((folder_id, _filename)): Path<(String, String)>,
    Query(query): Query<AudioSubStreamM4aQuery>,
) -> Result<Response<Body>, (StatusCode, String)> {
    let file_path = resolve_folder_subpath(&state, &folder_id, &query.subpath)?;
    stream_audio_for_path(&state, &file_path).await
}

pub async fn hls_sub_playlist_m3u8(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(folder_id): Path<String>,
    Query(query): Query<HlsSubPlaylistQuery>,
) -> Result<Response<Body>, (StatusCode, String)> {
    hls_sub_playlist(AxumState(state), Path((folder_id, query.subpath))).await
}

pub async fn audio_hls_sub_playlist_m3u8(
    AxumState(state): AxumState<SharedHttpServerContext>,
    Path(folder_id): Path<String>,
    Query(query): Query<HlsSubPlaylistQuery>,
) -> Result<Response<Body>, (StatusCode, String)> {
    audio_hls_sub_playlist(AxumState(state), Path((folder_id, query.subpath))).await
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
    state.touch_hls_session(&session_id);

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

async fn stream_audio_for_path(
    state: &SharedHttpServerContext,
    file_path: &PathBuf,
) -> Result<Response<Body>, (StatusCode, String)> {
    let input = file_path
        .to_str()
        .ok_or((StatusCode::BAD_REQUEST, "invalid file path".to_string()))?
        .to_string();

    let (ffmpeg_cmd, prewarm_rx) = {
        let ctx = state.inner.lock().unwrap();
        (
            ctx.ffmpeg_path
                .clone()
                .unwrap_or_else(|| PathBuf::from("ffmpeg")),
            ctx.ffmpeg_prewarm_rx.clone(),
        )
    };

    if let Some(mut rx) = prewarm_rx {
        if !*rx.borrow() {
            let _ = tokio::time::timeout(Duration::from_secs(90), rx.changed()).await;
        }
    }

    let mut cmd = new_ffmpeg_command(&ffmpeg_cmd);
    cmd.args([
        "-nostdin",
        "-fflags",
        "+genpts+discardcorrupt",
        "-avoid_negative_ts",
        "make_zero",
        "-i",
        &input,
        "-vn",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "+frag_keyframe+empty_moov+default_base_moof",
        "-frag_duration",
        "1000000",
        "-f",
        "mp4",
        "pipe:1",
    ])
    .stdout(std::process::Stdio::piped())
    .stderr(std::process::Stdio::null());

    let mut child = cmd.spawn().map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("ffmpeg launch failed: {e}"),
        )
    })?;

    let stdout = child.stdout.take().ok_or((
        StatusCode::INTERNAL_SERVER_ERROR,
        "ffmpeg stdout was not piped".to_string(),
    ))?;

    tokio::spawn(async move {
        let _ = child.wait().await;
    });

    let stream = ReaderStream::new(stdout);
    let body = Body::from_stream(stream);
    let mut res = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "audio/mp4")
        .header(header::CACHE_CONTROL, "no-cache")
        .body(body)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    apply_shared_security_headers(&mut res);
    Ok(res)
}

fn resolve_folder_subpath(
    state: &SharedHttpServerContext,
    folder_id: &str,
    subpath: &str,
) -> Result<PathBuf, (StatusCode, String)> {
    let folder_path = {
        let ctx = state
            .inner
            .lock()
            .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
        ctx.files
            .get(folder_id)
            .cloned()
            .ok_or((StatusCode::NOT_FOUND, "folder not registered".to_string()))?
    };

    let clean = subpath.trim_start_matches('/');
    Ok(folder_path.join(clean))
}

/// Ensure an HLS session exists for a directly registered file id.
async fn ensure_hls_session(
    state: &SharedHttpServerContext,
    id: &str,
) -> Result<PathBuf, (StatusCode, String)> {
    if let Some(dir) = wait_for_existing_or_starting_session(state, id).await? {
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
    if !state.begin_hls_session_start(session_id) {
        if let Some(dir) = wait_for_existing_or_starting_session(state, session_id).await? {
            return Ok(dir);
        }
    }

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

    let start_result: Result<PathBuf, (StatusCode, String)> = async {
    let (ffmpeg_cmd, prewarm_rx, use_qsv, max_hls_sessions, is_https) = {
        let ctx = state.inner.lock().unwrap();
        (
            ctx.ffmpeg_path.clone().unwrap_or_else(|| PathBuf::from("ffmpeg")),
            ctx.ffmpeg_prewarm_rx.clone(),
            ctx.ffmpeg_use_qsv,
            ctx.ffmpeg_max_concurrent_hls_sessions.max(1),
            ctx.status.is_https == Some(true),
        )
    };

    // Absolute base URL so WKWebView fetches segments from our server regardless of
    // which playlist route was used (direct /hls/ or sub-file /hls-sub/).
    let scheme = if is_https { "https" } else { "http" };
    let base_url = format!("{scheme}://localhost:{}/hls/{}/", port, session_id);

    state.enforce_hls_session_limit(max_hls_sessions.saturating_sub(1).max(1));

    // Wait for the pre-warm (macOS GateKeeper check) to complete before
    // spawning ffmpeg. Without this, the first HLS request races against the
    // GateKeeper check and the 30-second poll timeout is exceeded.
    if let Some(mut rx) = prewarm_rx {
        if !*rx.borrow() {
            let _ = tokio::time::timeout(Duration::from_secs(90), rx.changed()).await;
        }
    }

    // Phase 1: stream-copy (no re-encode, near-zero CPU — works for H.264/AAC sources).
    // Phase 2: optional hardware encode on supported platforms.
    // Phase 3: libx264 software fallback.
    // Keep the manifest untyped while transcoding. Safari/native HLS happily
    // re-polls a playlist with no #EXT-X-ENDLIST, and Chrome/hls.js proved
    // more reliable when it did NOT see an explicit EVENT playlist here.
    let hls_common_args: Vec<&str> = vec![
        "-f", "hls",
        "-hls_time", HLS_SEGMENT_DURATION_SECONDS,
        "-hls_list_size", "0",
        "-hls_flags", "independent_segments",
        "-muxpreload", "0",
        "-muxdelay", "0",
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
    let scale_filter = HLS_TRANSCODE_SCALE_FILTER;
    println!(
        "[HLS] session={} using ffmpeg transcode profile (max 640x360, {} fps, {}s segments) for input={}",
        session_id, HLS_TRANSCODE_FPS, HLS_SEGMENT_DURATION_SECONDS, input
    );

    // Helper: spawn ffmpeg with given args, poll until a .ts segment appears.
    // Returns (child, ready). Kills and cleans up playlist on failure before returning.
    // stderr is captured to a log file in tmp_dir (not discarded) so a
    // mid-stream ffmpeg crash — invisible in release builds with no attached
    // console — can still be diagnosed after the fact.
    macro_rules! try_ffmpeg {
        ($extra_args:expr, $poll_count:expr, $log_name:expr) => {{
            let log_path = tmp_dir.join($log_name);
            let log_file = std::fs::File::create(&log_path).map_err(|e| {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("failed to create ffmpeg log file: {e}"),
                )
            })?;
            println!("[HLS] session={} ffmpeg log={}", session_id, log_path.display());
            let mut c = new_ffmpeg_command(&ffmpeg_cmd);
            c.args($extra_args)
                .args(&hls_common_args)
                .stdout(std::process::Stdio::null())
                .stderr(std::process::Stdio::from(log_file));
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

    let should_try_qsv = cfg!(target_os = "windows") && use_qsv;
    let should_try_videotoolbox = cfg!(target_os = "macos") && use_qsv;
    let should_try_hardware_encode = should_try_qsv || should_try_videotoolbox;

    // ffmpeg mode prefers a consistent low-resolution transcode profile over
    // stream-copy so older machines do not end up uploading full-resolution
    // frames back into WebGL after HLS playback starts.
    let started_with_hw = should_try_hardware_encode;
    let (mut child, mut ready) = if should_try_qsv {
        try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "h264_qsv",
                "-vf", &format!("fps={},{}", HLS_TRANSCODE_FPS, scale_filter),
                "-g", "60",
                "-keyint_min", "60",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", HLS_VIDEO_AUDIO_BITRATE,
            ],
            50,
            "ffmpeg-qsv.log"
        )
    } else if should_try_videotoolbox {
        try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "h264_videotoolbox",
                "-vf", &format!("fps={},{}", HLS_TRANSCODE_FPS, scale_filter),
                "-g", "60",
                "-keyint_min", "60",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", HLS_VIDEO_AUDIO_BITRATE,
            ],
            50,
            "ffmpeg-videotoolbox.log"
        )
    } else {
        try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "libx264",
                "-vf", &format!("fps={},{}", HLS_TRANSCODE_FPS, scale_filter),
                "-pix_fmt", "yuv420p",
                "-preset", "ultrafast",
                "-tune", "zerolatency",
                "-g", "60",
                "-keyint_min", "60",
                "-sc_threshold", "0",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", HLS_VIDEO_AUDIO_BITRATE,
            ],
            150,
            "ffmpeg-libx264.log"
        )
    };

    // Phase 2: libx264 software fallback.
    if !ready {
        println!(
            "[HLS] {} not ready for session={}, retrying with libx264",
            if started_with_hw { "initial hardware path" } else { "initial transcode path" },
            session_id,
        );
        (child, ready) = try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "libx264",
                "-vf", &format!("fps={},{}", HLS_TRANSCODE_FPS, scale_filter),
                "-pix_fmt", "yuv420p",   // force 8-bit; VP9 10-bit inputs would produce h264 high10 otherwise
                "-preset", "ultrafast",
                "-tune", "zerolatency",
                "-g", "60",
                "-keyint_min", "60",
                "-sc_threshold", "0",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", HLS_VIDEO_AUDIO_BITRATE,
            ],
            150,
            "ffmpeg-libx264.log"
        );
    }

    if !ready {
        eprintln!("[HLS] ffmpeg did not produce readable HLS output in time for session={session_id}");
        return Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            "ffmpeg did not produce HLS output in time".to_string(),
        ));
    }

    state.register_hls_session(session_id.to_string(), tmp_dir.clone(), child);
    state.enforce_hls_session_limit(max_hls_sessions);

    println!("[HLS] session ready session={} playlist={}", session_id, playlist.display());

    Ok(tmp_dir)
    }.await;

    if start_result.is_err() {
        state.finish_hls_session_start(session_id);
    }

    start_result
}

async fn start_audio_hls_for_path(
    state: &SharedHttpServerContext,
    session_id: &str,
    file_path: &PathBuf,
    port: u16,
) -> Result<PathBuf, (StatusCode, String)> {
    if !state.begin_hls_session_start(session_id) {
        if let Some(dir) = wait_for_existing_or_starting_session(state, session_id).await? {
            return Ok(dir);
        }
    }

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

    let start_result: Result<PathBuf, (StatusCode, String)> = async {
        let (ffmpeg_cmd, prewarm_rx, max_hls_sessions, is_https) = {
            let ctx = state.inner.lock().unwrap();
            (
                ctx.ffmpeg_path.clone().unwrap_or_else(|| PathBuf::from("ffmpeg")),
                ctx.ffmpeg_prewarm_rx.clone(),
                ctx.ffmpeg_max_concurrent_hls_sessions.max(1),
                ctx.status.is_https == Some(true),
            )
        };

        let scheme = if is_https { "https" } else { "http" };
        let base_url = format!("{scheme}://localhost:{}/hls/{}/", port, session_id);

        state.enforce_hls_session_limit(max_hls_sessions.saturating_sub(1).max(1));

        if let Some(mut rx) = prewarm_rx {
            if !*rx.borrow() {
                let _ = tokio::time::timeout(Duration::from_secs(90), rx.changed()).await;
            }
        }

        let hls_common_args: Vec<&str> = vec![
            "-f", "hls",
            "-hls_time", HLS_SEGMENT_DURATION_SECONDS,
            "-hls_list_size", "0",
            "-hls_flags", "independent_segments",
            "-muxpreload", "0",
            "-muxdelay", "0",
            "-hls_base_url", &base_url,
            "-hls_segment_filename", segment_pattern.to_str().unwrap(),
            playlist.to_str().unwrap(),
        ];

        let log_path = tmp_dir.join("ffmpeg-audio-hls.log");
        let log_file = std::fs::File::create(&log_path).map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("failed to create ffmpeg log file: {e}"),
            )
        })?;
        println!("[HLS audio] session={} ffmpeg log={}", session_id, log_path.display());

        let mut cmd = new_ffmpeg_command(&ffmpeg_cmd);
        cmd.args([
            "-y",
            "-fflags", "+genpts+discardcorrupt",
            "-avoid_negative_ts", "make_zero",
            "-i", &input,
            "-vn",
            "-c:a", "aac",
            "-b:a", "128k",
        ])
        .args(&hls_common_args)
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::from(log_file));

        let child = cmd.spawn().map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("ffmpeg launch failed: {e}"),
            )
        })?;

        if wait_for_playlist_ready(&playlist, 80, Duration::from_millis(200)).await.is_err() {
            return Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "ffmpeg did not produce audio HLS output in time".to_string(),
            ));
        }

        state.register_hls_session(session_id.to_string(), tmp_dir.clone(), child);
        state.enforce_hls_session_limit(max_hls_sessions);

        println!(
            "[HLS audio] session ready session={} playlist={}",
            session_id,
            playlist.display()
        );

        Ok(tmp_dir)
    }
    .await;

    if start_result.is_err() {
        state.finish_hls_session_start(session_id);
    }

    start_result
}

/// Kill all active HLS ffmpeg processes.
pub async fn hls_cleanup_all(
    AxumState(state): AxumState<SharedHttpServerContext>,
) -> impl IntoResponse {
    state.cleanup_hls_sessions();
    StatusCode::NO_CONTENT
}

fn is_segment_ready(path: &FsPath) -> bool {
    std::fs::metadata(path)
        .map(|meta| meta.is_file() && meta.len() > 0)
        .unwrap_or(false)
}

/// Create a Command for ffmpeg with platform-specific flags.
/// On Windows, CREATE_NO_WINDOW prevents ffmpeg from flashing a console window.
fn new_ffmpeg_command(ffmpeg_cmd: &PathBuf) -> Command {
    #[cfg(windows)]
    {
        let mut cmd = Command::new(ffmpeg_cmd);
        // tokio::process::Command exposes creation_flags() directly on Windows.
        cmd.creation_flags(0x0800_0000); // CREATE_NO_WINDOW
        cmd
    }

    #[cfg(not(windows))]
    {
        Command::new(ffmpeg_cmd)
    }
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

async fn wait_for_existing_or_starting_session(
    state: &SharedHttpServerContext,
    session_id: &str,
) -> Result<Option<PathBuf>, (StatusCode, String)> {
    for _ in 0..75 {
        let existing = {
            let ctx = state
                .inner
                .lock()
                .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
            ctx.hls_sessions.get(session_id).cloned()
        };
        if existing.is_some() {
            return Ok(existing);
        }
        if !state.is_hls_session_starting(session_id) {
            return Ok(None);
        }
        sleep(Duration::from_millis(100)).await;
    }

    Err((
        StatusCode::INTERNAL_SERVER_ERROR,
        format!("timed out waiting for HLS session startup: {session_id}"),
    ))
}

#[cfg(test)]
mod tests {
    use super::{
        HLS_SEGMENT_DURATION_SECONDS, HLS_TRANSCODE_FPS, HLS_TRANSCODE_SCALE_FILTER,
        HLS_VIDEO_AUDIO_BITRATE,
    };

    #[test]
    fn transcode_scale_filter_is_fixed_to_640x360() {
        assert_eq!(
            HLS_TRANSCODE_SCALE_FILTER,
            "scale=640:360:force_original_aspect_ratio=decrease:force_divisible_by=2"
        );
    }

    #[test]
    fn transcode_profile_keeps_expected_fps_and_segment_duration() {
        assert_eq!(HLS_TRANSCODE_FPS, "15");
        assert_eq!(HLS_SEGMENT_DURATION_SECONDS, "4");
        assert_eq!(HLS_VIDEO_AUDIO_BITRATE, "96k");
    }
}
