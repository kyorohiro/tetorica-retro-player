//! Synchronized original-source MP4 recording without a preview transport.
use crate::{run_raw, timed_input::TimedInput, RawCaptureFrame};
#[cfg(target_os = "macos")]
use std::path::PathBuf;
use std::{
    path::Path,
    process::{Child, Command, Stdio},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::{Duration, Instant},
};

pub fn command(binary: &Path, dir: &Path, hardware: bool) -> std::io::Result<Command> {
    // Finder-launched system builds do not inherit the shell's Homebrew PATH.
    #[cfg(target_os = "macos")]
    let resolved = if binary == Path::new("ffmpeg") {
        std::env::var_os("PATH")
            .into_iter()
            .flat_map(|p| std::env::split_paths(&p).collect::<Vec<_>>())
            .map(|p| p.join("ffmpeg"))
            .chain([
                PathBuf::from("/opt/homebrew/bin/ffmpeg"),
                PathBuf::from("/usr/local/bin/ffmpeg"),
            ])
            .find(|p| p.is_file())
            .unwrap_or_else(|| binary.to_path_buf())
    } else {
        binary.to_path_buf()
    };
    #[cfg(not(target_os = "macos"))]
    let resolved = binary;
    let mut cmd = Command::new(resolved);
    cmd.current_dir(dir)
        .stdin(Stdio::piped())
        .stdout(Stdio::null())
        .stderr(std::fs::File::create(dir.join(if hardware {
            "hardware.log"
        } else {
            "software.log"
        }))?);
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        cmd.creation_flags(0x08000000);
    }
    cmd.args(["-hide_banner", "-y", "-probesize", "32768", "-analyzeduration", "100000", "-f", "matroska", "-i", "pipe:0", "-map", "0:v:0", "-map", "0:a:0", "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,format=yuv420p", "-fps_mode", "passthrough"]);
    if hardware {
        #[cfg(target_os = "macos")]
        {
            cmd.args([
                "-c:v",
                "h264_videotoolbox",
                "-realtime",
                "1",
                "-allow_sw",
                "0",
                "-b:v",
                "3000k",
            ]);
        }
        #[cfg(target_os = "windows")]
        {
            cmd.args(["-c:v", "h264_qsv", "-preset", "veryfast", "-b:v", "3000k"]);
        }
    } else {
        cmd.args([
            "-c:v",
            "libx264",
            "-preset",
            "ultrafast",
            "-tune",
            "zerolatency",
            "-crf",
            "23",
        ]);
    }
    cmd.args([
        "-g",
        "15",
        "-bf",
        "0",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-ar",
        "48000",
        "-ac",
        "2",
        "-af",
        "aresample=async=1000:first_pts=0",
        "-movflags",
        "+frag_keyframe+empty_moov",
        "-f",
        "mp4",
        "recording.mp4",
    ]);
    Ok(cmd)
}
fn finish(child: &mut Child) -> Result<(), String> {
    drop(child.stdin.take());
    let deadline = Instant::now() + Duration::from_secs(10);
    loop {
        if let Some(status) = child.try_wait().map_err(|e| e.to_string())? {
            return if status.success() {
                Ok(())
            } else {
                Err(format!("ffmpeg exited with {status}"))
            };
        }
        if Instant::now() >= deadline {
            let _ = child.kill();
            let _ = child.wait();
            return Err("ffmpeg did not finish in time".into());
        }
        std::thread::sleep(Duration::from_millis(25));
    }
}
struct Process(Child);
impl Drop for Process {
    fn drop(&mut self) {
        let _ = self.0.kill();
        let _ = self.0.wait();
    }
}

pub enum CaptureUpdate {
    Started(bool),
    Preview(Vec<u8>),
}

fn thumbnail(width: u32, height: u32, bgra: &[u8]) -> Option<Vec<u8>> {
    let image = image::RgbaImage::from_raw(width, height, bgra.to_vec())?;
    let small = image::imageops::thumbnail(&image, 320, 180);
    let rgb: Vec<u8> = small.pixels().flat_map(|p| [p[2], p[1], p[0]]).collect();
    let mut jpeg = Vec::new();
    image::codecs::jpeg::JpegEncoder::new_with_quality(&mut jpeg, 65)
        .encode(
            &rgb,
            small.width(),
            small.height(),
            image::ExtendedColorType::Rgb8,
        )
        .ok()?;
    Some(jpeg)
}

pub fn record(
    target: &str,
    binary: &Path,
    dir: &Path,
    destination: &Path,
    stop: Arc<AtomicBool>,
    mut update: impl FnMut(CaptureUpdate),
) -> Result<(), String> {
    std::fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    // Hardware is tried first; software fallback starts a fresh capture and timeline.
    for hardware in [true, false] {
        if stop.load(Ordering::Relaxed) {
            return Err("Recording cancelled".into());
        }
        let mut process = Process(
            command(binary, dir, hardware)
                .map_err(|e| e.to_string())?
                .spawn()
                .map_err(|e| format!("ffmpeg launch failed: {e}"))?,
        );
        let mut input: Option<TimedInput<std::process::ChildStdin>> = None;
        let mut video: Option<(u64, u32, u32, Vec<u8>)> = None;
        let mut audio: Option<(u64, u32, u16, Vec<u8>)> = None;
        let mut audio_format = scap::capturer::engine::capture_audio_format()
            .ok_or("No capture audio device available")?;
        let mut dimensions = (0, 0);
        let mut last_video: Option<(u64, Vec<u8>)> = None;
        let began = Instant::now();
        let mut announced = false;
        let mut last_preview = Instant::now().checked_sub(Duration::from_secs(3)).unwrap();
        let result = run_raw(target, stop.clone(), |frame| {
            if let Some(status) = process.0.try_wait().map_err(|e| e.to_string())? {
                return Err(format!("ffmpeg exited with {status}"));
            }
            if !announced && began.elapsed() > Duration::from_secs(20) {
                return Err("No recording stream started within 20 seconds.".into());
            }
            if input.is_none() {
                match frame {
                    RawCaptureFrame::Video {
                        pts_us,
                        width,
                        height,
                        bgra,
                    } => video = Some((pts_us, width, height, bgra)),
                    RawCaptureFrame::Audio {
                        pts_us,
                        rate,
                        channels,
                        pcm,
                    } => audio = Some((pts_us, rate, channels, pcm)),
                }
                if video.is_none() {
                    return Ok(());
                }
                let (vpts, w, h, bgra) = video.take().unwrap();
                let (apts, rate, channels, pcm) = audio.take().unwrap_or_else(|| {
                    let (rate, channels) = audio_format;
                    (
                        vpts,
                        rate,
                        channels,
                        vec![0; (rate as usize / 100) * channels as usize * 4],
                    )
                });
                dimensions = (w, h);
                audio_format = (rate, channels);
                let mut mux =
                    TimedInput::new(process.0.stdin.take().unwrap(), w, h, rate, channels)
                        .map_err(|e| e.to_string())?;
                mux.video(vpts, &bgra).map_err(|e| e.to_string())?;
                mux.audio(apts, &pcm).map_err(|e| e.to_string())?;
                last_video = Some((vpts, bgra));
                input = Some(mux);
            } else {
                let mux = input.as_mut().unwrap();
                match frame {
                    RawCaptureFrame::Video {
                        pts_us,
                        width,
                        height,
                        bgra,
                    } => {
                        let bgra = if (width, height) == dimensions {
                            bgra
                        } else {
                            let image = image::RgbaImage::from_raw(width, height, bgra)
                                .ok_or("Invalid resized frame")?;
                            image::imageops::resize(
                                &image,
                                dimensions.0,
                                dimensions.1,
                                image::imageops::FilterType::Triangle,
                            )
                            .into_raw()
                        };
                        mux.video(pts_us, &bgra).map_err(|e| e.to_string())?;
                        last_video = Some((pts_us, bgra));
                    }
                    RawCaptureFrame::Audio {
                        pts_us,
                        rate,
                        channels,
                        pcm,
                    } => {
                        if (rate, channels) != audio_format {
                            return Err("Audio device format changed. Restart capture.".into());
                        }
                        // Static windows may not emit new images. Repeat the last image on the same clock.
                        if let Some((last, bgra)) = last_video.as_mut() {
                            if pts_us > *last + 33_333 {
                                mux.video(pts_us, bgra).map_err(|e| e.to_string())?;
                                *last = pts_us;
                            }
                        }
                        mux.audio(pts_us, &pcm).map_err(|e| e.to_string())?;
                    }
                }
            }
            if !announced && std::fs::metadata(dir.join("recording.mp4")).is_ok_and(|m| m.len() > 0)
            {
                announced = true;
                update(CaptureUpdate::Started(hardware));
            }
            if announced && last_preview.elapsed() >= Duration::from_secs(3) {
                if let Some((_, bgra)) = last_video.as_ref() {
                    if let Some(jpeg) = thumbnail(dimensions.0, dimensions.1, bgra) {
                        update(CaptureUpdate::Preview(jpeg));
                    }
                }
                last_preview = Instant::now();
            }
            Ok(())
        });
        drop(input);
        let finished = finish(&mut process.0);
        if announced {
            // Retain the temporary file on failure so a recording can be recovered.
            finished?;
            std::fs::copy(dir.join("recording.mp4"), destination)
                .map_err(|e| format!("Could not save recording: {e}"))?;
            return if stop.load(Ordering::Relaxed) {
                Ok(())
            } else {
                result
            };
        }
        let _ = process.0.kill();
        let _ = process.0.wait();
        for name in ["index.m3u8", "recording.mp4"] {
            let _ = std::fs::remove_file(dir.join(name));
        }
        if !hardware {
            return result
                .and(finished)
                .and(Err("Capture stopped before the recording started".into()));
        }
    }
    Err("No capture encoder started".into())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn confirmation_image_is_small_and_preserves_bgra_colors() {
        let pixels: Vec<u8> = (0..640 * 360).flat_map(|_| [255, 0, 0, 255]).collect();
        let jpeg = thumbnail(640, 360, &pixels).unwrap();
        let decoded = image::load_from_memory(&jpeg).unwrap().to_rgb8();
        assert_eq!(decoded.dimensions(), (320, 180));
        let pixel = decoded.get_pixel(100, 100);
        assert!(pixel[2] > 240 && pixel[0] < 15);
        assert!(thumbnail(640, 360, &[0; 4]).is_none());
    }
}
