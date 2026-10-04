//! Streaming Matroska input: BGRA video and interleaved float32 PCM share one clock.
use std::io::{self, Write};

fn size(value: usize) -> Vec<u8> {
    for n in 1..=8 {
        if (value as u64) < (1u64 << (7 * n)) - 1 {
            let v = value as u64 | (1u64 << (7 * n));
            return v.to_be_bytes()[8 - n..].to_vec();
        }
    }
    unreachable!()
}
fn element(id: &[u8], data: &[u8]) -> Vec<u8> {
    let mut out = id.to_vec();
    out.extend(size(data.len()));
    out.extend(data);
    out
}
fn uint(id: &[u8], value: u64) -> Vec<u8> {
    let bytes = value.to_be_bytes();
    let offset = bytes.iter().position(|b| *b != 0).unwrap_or(7);
    element(id, &bytes[offset..])
}
fn group(id: &[u8], children: Vec<Vec<u8>>) -> Vec<u8> {
    element(id, &children.concat())
}

pub struct TimedInput<W: Write> {
    output: W,
    width: u32,
    height: u32,
    channels: u16,
    last_video: Option<u64>,
    last_audio: Option<u64>,
}
impl<W: Write> TimedInput<W> {
    pub fn new(
        mut output: W,
        width: u32,
        height: u32,
        rate: u32,
        channels: u16,
    ) -> io::Result<Self> {
        if width == 0
            || height == 0
            || width > 16384
            || height > 16384
            || rate == 0
            || channels == 0
        {
            return Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                "invalid capture format",
            ));
        }
        output.write_all(&group(
            &[0x1a, 0x45, 0xdf, 0xa3],
            vec![
                uint(&[0x42, 0x86], 1),
                uint(&[0x42, 0xf7], 1),
                uint(&[0x42, 0xf2], 4),
                uint(&[0x42, 0xf3], 8),
                element(&[0x42, 0x82], b"matroska"),
                uint(&[0x42, 0x87], 4),
                uint(&[0x42, 0x85], 2),
            ],
        ))?;
        output.write_all(&[
            0x18, 0x53, 0x80, 0x67, 0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        ])?; // unknown segment size
        output.write_all(&group(
            &[0x15, 0x49, 0xa9, 0x66],
            vec![
                uint(&[0x2a, 0xd7, 0xb1], 1000),
                element(&[0x4d, 0x80], b"tetorica"),
                element(&[0x57, 0x41], b"tetorica"),
            ],
        ))?;
        // BITMAPINFOHEADER, top-down BGRA. Matroska's VFW raw-video mapping.
        let mut bitmap = Vec::new();
        bitmap.extend(40u32.to_le_bytes());
        bitmap.extend(width.to_le_bytes());
        bitmap.extend((-(height as i32)).to_le_bytes());
        bitmap.extend(1u16.to_le_bytes());
        bitmap.extend(32u16.to_le_bytes());
        bitmap.extend(0u32.to_le_bytes());
        bitmap.extend((width * height * 4).to_le_bytes());
        bitmap.extend([0u8; 16]);
        let video = group(
            &[0xae],
            vec![
                uint(&[0xd7], 1),
                uint(&[0x73, 0xc5], 1),
                uint(&[0x83], 1),
                element(&[0x86], b"V_MS/VFW/FOURCC"),
                element(&[0x63, 0xa2], &bitmap),
                uint(&[0x23, 0xe3, 0x83], 33_333_333),
                group(
                    &[0xe0],
                    vec![uint(&[0xb0], width as u64), uint(&[0xba], height as u64)],
                ),
            ],
        );
        let audio = group(
            &[0xae],
            vec![
                uint(&[0xd7], 2),
                uint(&[0x73, 0xc5], 2),
                uint(&[0x83], 2),
                element(&[0x86], b"A_PCM/FLOAT/IEEE"),
                group(
                    &[0xe1],
                    vec![
                        element(&[0xb5], &(rate as f64).to_be_bytes()),
                        uint(&[0x9f], channels as u64),
                        uint(&[0x62, 0x64], 32),
                    ],
                ),
            ],
        );
        output.write_all(&group(&[0x16, 0x54, 0xae, 0x6b], vec![video, audio]))?;
        Ok(Self {
            output,
            width,
            height,
            channels,
            last_video: None,
            last_audio: None,
        })
    }
    fn packet(&mut self, track: u8, pts_us: u64, payload: &[u8]) -> io::Result<()> {
        // One cluster per packet allows arbitrary shared-clock PTS without the i16 block-time limit.
        let time = uint(&[0xe7], pts_us);
        let block_size = size(payload.len() + 4);
        let cluster_size = size(time.len() + 1 + block_size.len() + 4 + payload.len());
        self.output.write_all(&[0x1f, 0x43, 0xb6, 0x75])?;
        self.output.write_all(&cluster_size)?;
        self.output.write_all(&time)?;
        self.output.write_all(&[0xa3])?;
        self.output.write_all(&block_size)?;
        self.output.write_all(&[0x80 | track, 0, 0, 0x80])?;
        self.output.write_all(payload)
    }
    pub fn video(&mut self, pts_us: u64, bgra: &[u8]) -> io::Result<()> {
        if bgra.len() != self.width as usize * self.height as usize * 4 {
            return Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                "video dimensions changed",
            ));
        }
        if self.last_video.is_some_and(|last| pts_us <= last) {
            return Ok(());
        }
        self.packet(1, pts_us, bgra)?;
        self.last_video = Some(pts_us);
        Ok(())
    }
    pub fn audio(&mut self, pts_us: u64, f32_le: &[u8]) -> io::Result<()> {
        if f32_le.is_empty() || f32_le.len() % (self.channels as usize * 4) != 0 {
            return Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                "invalid audio length",
            ));
        }
        if self.last_audio.is_some_and(|last| pts_us <= last) {
            return Ok(());
        }
        self.packet(2, pts_us, f32_le)?;
        self.last_audio = Some(pts_us);
        Ok(())
    }
}
