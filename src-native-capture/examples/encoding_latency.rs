//! cargo run -p tetorica-native-capture --example encoding_latency
#[cfg(any(target_os = "macos", target_os = "windows"))]
fn main() {
    let (width, height) = (1280, 720);
    let pixels: Vec<u8> = (0..width * height)
        .flat_map(|i| [(i % 251) as u8, (i % 127) as u8, (i % 61) as u8, 255])
        .collect();
    for _ in 0..3 {
        let began = std::time::Instant::now();
        let rgb = scap::frame::convert_bgra_to_rgb(pixels.clone());
        let image = image::RgbImage::from_raw(width, height, rgb).unwrap();
        let image = image::DynamicImage::ImageRgb8(image).resize(
            1280,
            1280,
            image::imageops::FilterType::Triangle,
        );
        let mut bytes = vec![1];
        image::codecs::jpeg::JpegEncoder::new_with_quality(&mut bytes, 75)
            .encode_image(&image)
            .unwrap();
        println!(
            "1280x720 conversion + JPEG: {:.1}ms, {} bytes",
            began.elapsed().as_secs_f64() * 1000.0,
            bytes.len()
        );
    }
}
#[cfg(not(any(target_os = "macos", target_os = "windows")))]
fn main() {}
