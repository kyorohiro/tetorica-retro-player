//! Writes a deterministic timestamp fixture; ffmpeg/ffprobe validate actual decoding and gaps.
use tetorica_native_capture::timed_input::TimedInput;
fn main() -> std::io::Result<()> {
    let path = std::env::args().nth(1).expect("output.mkv required");
    let mut mux = TimedInput::new(std::fs::File::create(path)?, 64, 48, 48000, 2)?;
    for n in 0..90u64 {
        let pts = n * 33_333;
        // A visible flash and matching beep start together at t=1s.
        let flash = (30..36).contains(&n);
        let mut video = vec![0u8; 64 * 48 * 4];
        for p in video.chunks_exact_mut(4) {
            p.copy_from_slice(&[if flash { 255 } else { 0 }, 0, 0, 255]);
        }
        // Deliberate video loss must leave a timestamp gap, never speed up video.
        if n != 10 && n != 11 {
            mux.video(pts, &video)?;
        }
        let mut audio = Vec::new();
        for i in 0..1600 {
            let sample = if flash {
                ((i as f32 / 48000.0 * 440.0 * std::f32::consts::TAU).sin()) * 0.25
            } else {
                0.0
            };
            audio.extend(sample.to_le_bytes());
            audio.extend(sample.to_le_bytes());
        }
        mux.audio(pts, &audio)?;
    }
    Ok(())
}
