//! Shared macOS/Windows capture and packet conversion. OS integration lives in scap.
use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CaptureTarget {
    pub id: String,
    pub title: String,
    pub kind: &'static str,
}

#[cfg(any(target_os = "macos", target_os = "windows"))]
mod desktop {
    use super::*;
    use scap::{
        capturer::{Capturer, Options, Resolution},
        frame::{AudioFormat, AudioFrame, Frame, FrameType, VideoFrame},
        Target,
    };
    use std::{
        sync::mpsc::RecvTimeoutError,
        sync::{
            atomic::{AtomicBool, Ordering},
            Arc,
        },
        time::{Duration, Instant},
    };

    pub fn available() -> bool {
        scap::is_supported()
    }
    fn identity(target: &Target) -> CaptureTarget {
        match target {
            Target::Window(t) => CaptureTarget {
                id: format!("window:{}", t.id),
                title: t.title.clone(),
                kind: "window",
            },
            Target::Display(t) => CaptureTarget {
                id: format!("display:{}", t.id),
                title: t.title.clone(),
                kind: "display",
            },
        }
    }
    fn permitted() -> Result<(), String> {
        if !available() {
            return Err("Native capture is not supported on this OS version.".into());
        }
        if !scap::has_permission() && !scap::request_permission() {
            return Err("NATIVE_CAPTURE_PERMISSION_REQUIRED".into());
        }
        Ok(())
    }
    pub fn targets() -> Result<Vec<CaptureTarget>, String> {
        permitted()?;
        Ok(scap::get_all_targets().iter().map(identity).collect())
    }

    /// The caller owns the worker thread; all native state is created and dropped there.
    /// Packet types: 0 ready, 1 JPEG, 2 rate/channels/interleaved f32, 3 ended/error.
    pub fn run(
        target_id: &str,
        stop: Arc<AtomicBool>,
        mut send: impl FnMut(Vec<u8>) -> bool,
    ) -> Result<(), String> {
        permitted()?;
        if stop.load(Ordering::Relaxed) {
            return Ok(());
        }
        let target = scap::get_all_targets()
            .into_iter()
            .find(|t| identity(t).id == target_id)
            .ok_or("The selected window or display is no longer available.")?;
        let mut capturer = Capturer::build(Options {
            fps: 30,
            show_cursor: true,
            show_highlight: true,
            target: Some(target),
            output_type: FrameType::BGRAFrame,
            output_resolution: Resolution::_720p,
            captures_audio: true,
            exclude_current_process_audio: true,
            ..Options::default()
        })
        .map_err(|e| e.to_string())?;
        capturer.start_capture();
        // Ensure stop is attempted even if the upstream converter panics.
        let result = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
            let began = Instant::now();
            let mut started = false;
            let mut last_video = Instant::now() - Duration::from_secs(1);
            while !stop.load(Ordering::Relaxed) {
                let frame = match capturer.get_next_frame_timeout(Duration::from_millis(100)) {
                    Ok(frame) => frame,
                    Err(RecvTimeoutError::Timeout) => {
                        if !started && began.elapsed() > Duration::from_secs(15) {
                            return Err("No video frames arrived from the selected source.".into());
                        }
                        continue;
                    }
                    Err(RecvTimeoutError::Disconnected) => break,
                };
                let packet = match frame {
                    Frame::Audio(frame) => {
                        if !started {
                            continue;
                        }
                        Some(audio_packet(&frame)?)
                    }
                    Frame::Video(VideoFrame::BGRA(frame))
                        if frame.width > 0 && frame.height > 0 =>
                    {
                        // Skip backlog instead of displaying old frames in sequence.
                        // Keep the first image even for a static source with no later updates.
                        if started
                            && frame.display_time.elapsed().unwrap_or_default()
                                > Duration::from_millis(200)
                        {
                            continue;
                        }
                        if last_video.elapsed() < Duration::from_secs_f64(1.0 / 30.0) {
                            continue;
                        }
                        last_video = Instant::now();
                        let width = frame.width as u32;
                        let height = frame.height as u32;
                        let expected = (width as usize)
                            .checked_mul(height as usize)
                            .and_then(|n| n.checked_mul(4))
                            .ok_or("Capture dimensions overflow")?;
                        if frame.data.len() != expected {
                            return Err("Unexpected video row layout".into());
                        }
                        let rgb = scap::frame::convert_bgra_to_rgb(frame.data);
                        let image = image::RgbImage::from_raw(width, height, rgb)
                            .ok_or("Invalid capture image")?;
                        let image = image::DynamicImage::ImageRgb8(image).resize(
                            1280,
                            1280,
                            image::imageops::FilterType::Triangle,
                        );
                        let mut packet = vec![1];
                        image::codecs::jpeg::JpegEncoder::new_with_quality(&mut packet, 75)
                            .encode_image(&image)
                            .map_err(|e| e.to_string())?;
                        if !started {
                            if !send(vec![0]) {
                                break;
                            }
                            started = true;
                        }
                        Some(packet)
                    }
                    _ => None,
                };
                if let Some(packet) = packet {
                    if !send(packet) {
                        break;
                    }
                }
            }
            Ok(())
        }));
        capturer.stop_capture();
        result.unwrap_or_else(|_| Err("Native capture failed while processing frames.".into()))
    }

    fn audio_packet(frame: &AudioFrame) -> Result<Vec<u8>, String> {
        encode_audio(
            frame.raw_data(),
            frame.format(),
            frame.channels(),
            frame.sample_count(),
            frame.rate(),
            frame.is_planar(),
        )
    }
    fn encode_audio(
        data: &[u8],
        format: AudioFormat,
        channels: u16,
        frames: usize,
        rate: u32,
        planar: bool,
    ) -> Result<Vec<u8>, String> {
        if channels == 0 || channels > 32 || rate == 0 {
            return Err("Invalid capture audio format".into());
        }
        let size = format.sample_size();
        let count = frames
            .checked_mul(channels as usize)
            .ok_or("Capture audio length overflow")?;
        if count.checked_mul(size) != Some(data.len()) {
            return Err("Invalid capture audio length".into());
        }
        let mut packet = Vec::with_capacity(9 + count * 4);
        packet.push(2);
        packet.extend_from_slice(&rate.to_le_bytes());
        packet.extend_from_slice(&(channels as u32).to_le_bytes());
        for n in 0..count {
            let index = if planar {
                (n % channels as usize) * frames + n / channels as usize
            } else {
                n
            };
            let b = &data[index * size..(index + 1) * size];
            let value = match format {
                AudioFormat::F32 => f32::from_ne_bytes(b.try_into().unwrap()),
                AudioFormat::F64 => f64::from_ne_bytes(b.try_into().unwrap()) as f32,
                AudioFormat::I8 => (b[0] as i8) as f32 / 128.0,
                AudioFormat::I16 => i16::from_ne_bytes(b.try_into().unwrap()) as f32 / 32768.0,
                AudioFormat::I32 => i32::from_ne_bytes(b.try_into().unwrap()) as f32 / 2147483648.0,
                AudioFormat::I64 => {
                    (i64::from_ne_bytes(b.try_into().unwrap()) as f64 / 9223372036854775808.0)
                        as f32
                }
                AudioFormat::U8 => (b[0] as f32 - 128.0) / 128.0,
                AudioFormat::U16 => {
                    (u16::from_ne_bytes(b.try_into().unwrap()) as f32 - 32768.0) / 32768.0
                }
                AudioFormat::U32 => {
                    ((u32::from_ne_bytes(b.try_into().unwrap()) as f64 - 2147483648.0)
                        / 2147483648.0) as f32
                }
                AudioFormat::U64 => {
                    ((u64::from_ne_bytes(b.try_into().unwrap()) as f64 - 9223372036854775808.0)
                        / 9223372036854775808.0) as f32
                }
                _ => return Err("Unsupported capture audio sample format".into()),
            };
            packet.extend_from_slice(
                &if value.is_finite() {
                    value.clamp(-1.0, 1.0)
                } else {
                    0.0
                }
                .to_le_bytes(),
            );
        }
        Ok(packet)
    }
    #[cfg(test)]
    mod tests {
        use super::*;
        #[test]
        fn planar_stereo_becomes_interleaved() {
            let data: Vec<u8> = [0.25f32, 0.5, -0.25, -0.5]
                .iter()
                .flat_map(|v| v.to_ne_bytes())
                .collect();
            let packet = encode_audio(&data, AudioFormat::F32, 2, 2, 48000, true).unwrap();
            let samples: Vec<f32> = packet[9..]
                .chunks_exact(4)
                .map(|b| f32::from_le_bytes(b.try_into().unwrap()))
                .collect();
            assert_eq!(samples, [0.25, -0.25, 0.5, -0.5]);
            assert_eq!(&packet[..9], &[2, 128, 187, 0, 0, 2, 0, 0, 0]);
        }
        #[test]
        fn windows_pcm16_is_normalized_and_bad_lengths_rejected() {
            let data: Vec<u8> = [i16::MIN, 0, i16::MAX]
                .iter()
                .flat_map(|v| v.to_ne_bytes())
                .collect();
            let packet = encode_audio(&data, AudioFormat::I16, 1, 3, 44100, false).unwrap();
            assert_eq!(f32::from_le_bytes(packet[9..13].try_into().unwrap()), -1.0);
            assert!(encode_audio(&data, AudioFormat::I16, 2, 3, 44100, false).is_err());
        }
    }
}
#[cfg(any(target_os = "macos", target_os = "windows"))]
pub use desktop::{available, run, targets};
