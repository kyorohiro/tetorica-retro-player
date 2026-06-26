use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FfmpegOutput {
    pub stdout: String,
    pub stderr: String,
    pub exit_code: i32,
}

/// Run ffmpeg with arbitrary arguments.
/// System mode:  calls the system-installed `ffmpeg`.
/// Sidecar mode: calls the bundled ffmpeg binary (placed next to the app executable).
#[tauri::command]
pub async fn ffmpeg_exec(args: Vec<String>) -> Result<FfmpegOutput, String> {
    let bin = ffmpeg_bin();
    let output = tauri::async_runtime::spawn_blocking(move || {
        std::process::Command::new(&bin).args(&args).output()
    })
    .await
    .map_err(|e| e.to_string())?
    .map_err(|e| format!("ffmpeg launch failed: {e}"))?;

    Ok(FfmpegOutput {
        stdout: String::from_utf8_lossy(&output.stdout).into_owned(),
        stderr: String::from_utf8_lossy(&output.stderr).into_owned(),
        exit_code: output.status.code().unwrap_or(-1),
    })
}

/// Returns "sidecar" or "system" so the frontend can adapt its behaviour.
#[tauri::command]
pub fn get_ffmpeg_mode() -> &'static str {
    if cfg!(feature = "ffmpeg-sidecar") {
        "sidecar"
    } else {
        "system"
    }
}

/// Resolve the ffmpeg binary path.
/// Sidecar builds: binary is placed next to the app executable by Tauri bundler.
/// System builds:  just "ffmpeg" (resolved via PATH).
pub fn ffmpeg_bin() -> PathBuf {
    #[cfg(feature = "ffmpeg-sidecar")]
    {
        if let Ok(exe) = std::env::current_exe() {
            if let Some(dir) = exe.parent() {
                #[cfg(windows)]
                return dir.join("ffmpeg.exe");
                #[cfg(not(windows))]
                return dir.join("ffmpeg");
            }
        }
        // fallback to system if path resolution fails
        PathBuf::from("ffmpeg")
    }
    #[cfg(not(feature = "ffmpeg-sidecar"))]
    PathBuf::from("ffmpeg")
}
