//! Exercise the exact MP4 recording encoder with the timed_sync fixture.
#[cfg(any(target_os = "macos", target_os = "windows"))]
use std::{path::Path, process::Stdio};
#[cfg(any(target_os = "macos", target_os = "windows"))]
use tetorica_native_capture::ffmpeg_capture::command;
#[cfg(any(target_os = "macos", target_os = "windows"))]
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<_> = std::env::args().collect();
    let dir = Path::new(&args[2]);
    std::fs::create_dir_all(dir)?;
    let mut cmd = command(
        Path::new(&std::env::var("FFMPEG_BIN").unwrap_or_else(|_| "ffmpeg".into())),
        dir,
        args.get(3).is_some(),
    )?;
    cmd.stdin(Stdio::from(std::fs::File::open(&args[1])?));
    let status = cmd.status()?;
    if !status.success() {
        return Err(format!("encoder failed: {status}").into());
    }
    Ok(())
}

#[cfg(not(any(target_os = "macos", target_os = "windows")))]
fn main() {
    eprintln!("Native FFmpeg capture requires macOS or Windows");
}
