fn main() {
    println!("cargo:rerun-if-changed=native/WindowCapture.swift");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() == Ok("macos") {
        let out = std::path::PathBuf::from(std::env::var_os("OUT_DIR").unwrap());
        let arch = match std::env::var("CARGO_CFG_TARGET_ARCH").unwrap().as_str() {
            "aarch64" => "arm64",
            "x86_64" => "x86_64",
            arch => panic!("Unsupported macOS capture architecture: {arch}"),
        };
        let swift_target = format!("{arch}-apple-macosx11.0");
        let status = std::process::Command::new("xcrun")
            .args([
                "swiftc",
                "-parse-as-library",
                "-swift-version",
                "5",
                "-O",
                "-emit-library",
                "-static",
                "-target",
                &swift_target,
                "-module-cache-path",
            ])
            .arg(out.join("swift-cache"))
            .arg("native/WindowCapture.swift")
            .arg("-o")
            .arg(out.join("libretro_capture.a"))
            .status()
            .expect("Xcode's Swift compiler is required for macOS capture");
        assert!(
            status.success(),
            "ScreenCaptureKit bridge compilation failed"
        );
        println!("cargo:rustc-link-search=native={}", out.display());
        // Apple's linker reads Swift autolink records from the static archive.
        let info = std::process::Command::new("xcrun")
            .args(["swiftc", "-print-target-info", "-target", &swift_target])
            .output()
            .expect("Could not locate the Swift runtime");
        assert!(info.status.success());
        let info: serde_json::Value = serde_json::from_slice(&info.stdout).unwrap();
        for path in info["paths"]["runtimeLibraryPaths"].as_array().unwrap() {
            println!("cargo:rustc-link-search=native={}", path.as_str().unwrap());
        }
        let resource = info["paths"]["runtimeResourcePath"].as_str().unwrap();
        println!(
            "cargo:rustc-link-search=native={}/macosx",
            resource.replace("/swift", "/swift_static")
        );
        println!("cargo:rustc-link-lib=static=retro_capture");
        println!("cargo:rustc-link-arg=-Wl,-rpath,/usr/lib/swift");
    }
    tauri_build::build()
}
