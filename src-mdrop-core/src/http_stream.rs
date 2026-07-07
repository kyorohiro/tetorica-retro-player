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

const HLS_DEFAULT_SCALE_FILTER: &str = "scale=trunc(iw/2)*2:trunc(ih/2)*2";
const HLS_LIGHTWEIGHT_SCALE_FILTER: &str =
    "scale=854:480:force_original_aspect_ratio=decrease:force_divisible_by=2";
const HLS_LIGHTWEIGHT_TRANSCODE_SIZE_THRESHOLD_BYTES: u64 = 512 * 1024 * 1024;

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
    // -hls_playlist_type event: without this, ffmpeg doesn't tag the manifest
    // as VOD or EVENT while it's still being written. Native HLS clients are
    // supposed to keep re-polling any manifest lacking #EXT-X-ENDLIST
    // regardless, but marking it "event" makes the still-growing intent
    // explicit and is the standard idiom for "transcode while serving".
    let hls_common_args: Vec<&str> = vec![
        "-f", "hls",
        "-hls_time", "2",
        "-hls_list_size", "0",
        "-hls_playlist_type", "event",
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
    let should_try_copy = should_try_stream_copy(file_path);
    let scale_filter = select_hls_scale_filter(file_path);
    if !should_try_copy {
        println!(
            "[HLS] session={} skipping copy path for extension={}",
            session_id,
            file_path
                .extension()
                .and_then(|ext| ext.to_str())
                .unwrap_or("(unknown)")
        );
    }
    if scale_filter == HLS_LIGHTWEIGHT_SCALE_FILTER {
        println!(
            "[HLS] session={} using lightweight transcode profile (max 854x480) for input={}",
            session_id, input
        );
    }

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

    // Phase 1: copy (6 s timeout) or direct software fallback for formats that
    // always need re-encode on non-Windows platforms (e.g. webm on macOS).
    let started_with_hw = !should_try_copy && should_try_qsv;
    let (mut child, mut ready) = if should_try_copy {
        try_ffmpeg!(
            ["-y", "-i", &input, "-c:v", "copy", "-c:a", "aac", "-b:a", "128k"],
            30,
            "ffmpeg-copy.log"
        )
    } else if should_try_qsv {
        try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "h264_qsv",
                "-g", "60",
                "-keyint_min", "60",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", "128k",
            ],
            50,
            "ffmpeg-qsv.log"
        )
    } else {
        try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "libx264",
                "-vf", scale_filter,
                "-pix_fmt", "yuv420p",
                "-preset", "ultrafast",
                "-tune", "zerolatency",
                "-g", "60",
                "-keyint_min", "60",
                "-sc_threshold", "0",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", "128k",
            ],
            150,
            "ffmpeg-libx264.log"
        )
    };

    // Guard: a copy-path segment can still be unusable for browser HLS even
    // when it technically contains a video stream (e.g. AVI / MPEG sources
    // copied through as MPEG-4 Part 2 / MPEG-2 instead of H.264). Treat any
    // first segment whose video codec is not H.264 as copy-path failure and
    // retry with a real transcode.
    if ready {
        let seg_path = std::fs::read_to_string(&playlist)
            .ok()
            .and_then(|c| first_segment_from_playlist(&c).map(|n| {
                tmp_dir.join(n.rsplit('/').next().unwrap_or(&n).to_owned())
            }));
        if let Some(seg) = seg_path {
            if !segment_has_browser_compatible_video_stream(&ffmpeg_cmd, &seg).await {
                println!(
                    "[HLS] Phase 1 copy: first segment is not browser-compatible video for session={session_id}, falling back to re-encode"
                );
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

    // Phase 2: h264_qsv hardware encode (10 s — Windows only, fails fast if unavailable)
    if !ready && should_try_copy && should_try_qsv {
        println!(
            "[HLS] copy path not ready for session={}, retrying with h264_qsv",
            session_id
        );
        (child, ready) = try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "h264_qsv",
                "-g", "60",
                "-keyint_min", "60",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", "128k",
            ],
            50,
            "ffmpeg-qsv.log"
        );
    }

    // Phase 3: libx264 software fallback (30 s)
    if !ready {
        println!(
            "[HLS] {} not ready for session={}, retrying with libx264",
            if started_with_hw { "initial hardware path" } else { "copy/hardware path" },
            session_id,
        );
        (child, ready) = try_ffmpeg!(
            [
                "-y",
                "-fflags", "+genpts+discardcorrupt",
                "-avoid_negative_ts", "make_zero",
                "-i", &input,
                "-c:v", "libx264",
                "-vf", scale_filter,
                "-pix_fmt", "yuv420p",   // force 8-bit; VP9 10-bit inputs would produce h264 high10 otherwise
                "-preset", "ultrafast",
                "-tune", "zerolatency",
                "-g", "60",
                "-keyint_min", "60",
                "-sc_threshold", "0",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-c:a", "aac", "-b:a", "128k",
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

/// Run `ffmpeg -i <segment>` and verify the first video stream is H.264, which is the
/// copy-path codec this browser-HLS flow can reliably consume.
/// Returns true when an H.264 video stream is found, or when the probe itself fails
/// (safe default).
/// Note: ffmpeg -i always exits with error code 1 when no output is specified;
/// we only care about the stderr content, not the exit code.
async fn segment_has_browser_compatible_video_stream(ffmpeg_cmd: &PathBuf, path: &FsPath) -> bool {
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
    segment_stderr_has_h264_video(&String::from_utf8_lossy(&out.stderr))
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

fn should_try_stream_copy(path: &FsPath) -> bool {
    let Some(ext) = path.extension().and_then(|ext| ext.to_str()) else {
        return true;
    };

    !matches!(
        ext.to_ascii_lowercase().as_str(),
        "avi"
            | "asf"
            | "divx"
            | "f4v"
            | "flv"
            | "m2v"
            | "mpeg"
            | "mpg"
            | "mxf"
            | "ogv"
            | "rm"
            | "rmvb"
            | "vob"
            | "webm"
            | "wmv"
            | "xvid"
    )
}

fn segment_stderr_has_h264_video(stderr: &str) -> bool {
    stderr.lines().any(|line| {
        let lower = line.to_ascii_lowercase();
        lower.contains("video:") && lower.contains("h264")
    })
}

fn select_hls_scale_filter(path: &FsPath) -> &'static str {
    if needs_lightweight_hls_transcode(path) {
        HLS_LIGHTWEIGHT_SCALE_FILTER
    } else {
        HLS_DEFAULT_SCALE_FILTER
    }
}

fn needs_lightweight_hls_transcode(path: &FsPath) -> bool {
    let Some(ext) = path.extension().and_then(|ext| ext.to_str()) else {
        return false;
    };

    if !matches!(ext.to_ascii_lowercase().as_str(), "webm" | "ogv") {
        return false;
    }

    std::fs::metadata(path)
        .map(|meta| meta.len() >= HLS_LIGHTWEIGHT_TRANSCODE_SIZE_THRESHOLD_BYTES)
        .unwrap_or(false)
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
        needs_lightweight_hls_transcode, segment_stderr_has_h264_video, select_hls_scale_filter,
        should_try_stream_copy, HLS_DEFAULT_SCALE_FILTER, HLS_LIGHTWEIGHT_SCALE_FILTER,
        HLS_LIGHTWEIGHT_TRANSCODE_SIZE_THRESHOLD_BYTES,
    };
    use std::{fs::File, path::Path};

    fn temp_path(name: &str) -> std::path::PathBuf {
        let stem = Path::new(name)
            .file_stem()
            .and_then(|value| value.to_str())
            .unwrap_or(name);
        let ext = Path::new(name)
            .extension()
            .and_then(|value| value.to_str())
            .unwrap_or("");
        let filename = if ext.is_empty() {
            format!("retro-player-http-stream-test-{stem}-{}", std::process::id())
        } else {
            format!("retro-player-http-stream-test-{stem}-{}.{}", std::process::id(), ext)
        };
        std::env::temp_dir().join(filename)
    }

    #[test]
    fn large_webm_uses_lightweight_hls_transcode() {
        let path = temp_path("large.webm");
        let file = File::create(&path).expect("create temp webm");
        file.set_len(HLS_LIGHTWEIGHT_TRANSCODE_SIZE_THRESHOLD_BYTES).expect("set temp webm size");

        assert!(needs_lightweight_hls_transcode(&path));
        assert_eq!(
            select_hls_scale_filter(&path),
            HLS_LIGHTWEIGHT_SCALE_FILTER
        );

        let _ = std::fs::remove_file(path);
    }

    #[test]
    fn small_webm_keeps_default_hls_scale_filter() {
        let path = temp_path("small.webm");
        let file = File::create(&path).expect("create temp webm");
        file.set_len(4 * 1024 * 1024).expect("set temp webm size");

        assert!(!needs_lightweight_hls_transcode(&path));
        assert_eq!(
            select_hls_scale_filter(&path),
            HLS_DEFAULT_SCALE_FILTER
        );

        let _ = std::fs::remove_file(path);
    }

    #[test]
    fn mp4_keeps_default_hls_scale_filter() {
        assert!(!needs_lightweight_hls_transcode(Path::new("sample.mp4")));
        assert_eq!(
            select_hls_scale_filter(Path::new("sample.mp4")),
            HLS_DEFAULT_SCALE_FILTER
        );
    }

    #[test]
    fn h264_segment_probe_accepts_h264_video() {
        assert!(segment_stderr_has_h264_video(
            "Stream #0:0: Video: h264 (High), yuv420p(progressive), 1280x720"
        ));
    }

    #[test]
    fn h264_segment_probe_rejects_audio_only_and_other_video_codecs() {
        assert!(!segment_stderr_has_h264_video(
            "Stream #0:0: Audio: aac (LC), 48000 Hz, stereo, fltp"
        ));
        assert!(!segment_stderr_has_h264_video(
            "Stream #0:0: Video: mpeg2video (Main), yuv420p(tv), 720x480"
        ));
        assert!(!segment_stderr_has_h264_video(
            "Stream #0:0: Video: mpeg4 (Simple Profile), yuv420p, 640x480"
        ));
    }

    #[test]
    fn avi_and_mpg_skip_stream_copy() {
        assert!(!should_try_stream_copy(Path::new("sample.avi")));
        assert!(!should_try_stream_copy(Path::new("sample.mpg")));
        assert!(should_try_stream_copy(Path::new("sample.mp4")));
    }
}
