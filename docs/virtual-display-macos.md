# macOS Virtual Display as Video Input — Feasibility Research

**Project:** tetorica-retro-player (`net.tetorica.retro-player`)  
**Tauri version:** 2.x  
**Target macOS:** 13+ (Ventura), experimental feature  
**Date:** 2026-06-17  

---

## ⚡ PoC 結果（2026-06-17 実施）

### 結論: CGVirtualDisplay は第三者アプリには使用不可

`docs/poc/create-virtual-display.swift` (v4) を用いて macOS 15.7.2 上で実施した PoC の結果:

| ステップ | 結果 |
|---------|------|
| `NSClassFromString("CGVirtualDisplay*")` — 4クラスのロード | ✅ 全て成功 |
| `CGVirtualDisplayDescriptor` 初期化・プロパティ設定 | ✅ 成功 (`name`, `maxPixelsWide` など確認済み) |
| `CGVirtualDisplayMode(width:1920 height:1080 refreshRate:60)` | ✅ 成功 |
| `CGVirtualDisplay.initWithDescriptor:` | ❌ **nil を返す** |

**失敗の原因（システムログで特定）:**

```
[CG VirtualDisplay:interface] CDVirtualDisplay supported
[CG VirtualDisplay:interface] CDVirtualDisplayCreateWithOptions(0x0, 0x0, 0x0, RetroPlayer Virtual, 508x285 1920x1080 ...)
[com.apple.VirtualDisplay:client] RPC spawnProxy (client)
[com.apple.VirtualDisplay:client] RPC spawnProxy client<-server displayID=0x0 kr=0x5((os/kern) failure)
[com.apple.VirtualDisplay:client] -[VirtualDisplayClient pluginWithOptions:]: spawnProxy message error kr=0x5
```

`initWithDescriptor:` は内部で `VirtualDisplayClient.pluginWithOptions:` → XPC `spawnProxy` を呼び、WindowServer/CoreDisplay デーモンへ Mach IPC を送る。デーモンは `kr=0x5 (KERN_FAILURE)` で拒否する。

**private entitlement を追加するとどうなるか:**

WindowServer の entitlement から `com.apple.private.iokit.displayservice` などを追加して ad-hoc 署名すると、AMFI (Apple Mobile File Integrity) が起動直後に **SIGKILL (exit 137)** を送って強制終了させる。

**まとめ:**
- `CGVirtualDisplay` は Apple 内部の private entitlement なしには動作しない
- ad-hoc 署名で private entitlement を付与しても AMFI が拒否する
- Apple Developer Program のプロファイルでも、この entitlement は第三者に付与されない
- Sidecar、Apple が動かすサービスのみが使用可能

**→ CGVirtualDisplay ベースのアプローチは第三者アプリには実現不可。**

---

## ⚡ PoC 元の計画（参考）

**tetorica-retro-player には既に Screen/Window Capture 機能が実装されています。**

- `usePreviewSourceState.ts` で `navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })` を呼ぶ
- 取得した `MediaStream` を `<video>` 要素に流し、既存 WebGL/PixiJS pipeline でそのまま処理

当初の確認事項:
> CGVirtualDisplay を作成したとき、既存アプリの `getDisplayMedia` システムピッカーに仮想ディスプレイが表示されるか？

PoC 結果: **CGVirtualDisplay 自体が作成できないため確認不可。API は closed。**

---

## Executive Summary

Creating a macOS virtual display and feeding its frames into the existing WebGL/PixiJS retro-filter pipeline is **technically feasible** but involves several significant constraints:

1. `CGVirtualDisplay` is a **private, undocumented CoreGraphics API** — it has no Apple-sanctioned entitlement and can break between macOS versions.
2. ScreenCaptureKit can enumerate and capture virtual displays, but has a **longstanding multi-virtual-display bug** that can cause stream confusion.
3. The Rust ecosystem has mature bindings (`screencapturekit` crate, `objc2-screen-capture-kit`) that make the capture side straightforward from Tauri.
4. Getting captured frames into the JS WebGL pipeline efficiently requires either the Tauri Channel API or a custom URI-scheme protocol — the standard event system is too slow for 60 fps video.
5. **Most likely the virtual display does appear in `getDisplayMedia` picker** — macOS treats it like a physical monitor. If confirmed, zero additional implementation is needed.

---

## 1. CGVirtualDisplay API

### 1.1 What It Is

`CGVirtualDisplay` is a private Objective-C class inside the `CoreGraphics` framework (specifically surfacing through the `CoreDisplay` subsystem). It creates a software-only display that macOS treats exactly like a physical monitor — it gets a `CGDirectDisplayID`, appears in display arrangement, and has a live framebuffer that any capture API can read.

The reverse-engineered header (from `class-dump` of the CoreGraphics binary, build 1336) exposes this interface:

```objc
// CGVirtualDisplayDescriptor (NSObject)
@property unsigned int vendorID;
@property unsigned int productID;
@property unsigned int serialNum;
@property NSString *name;
@property CGSize sizeInMillimeters;      // physical size → drives PPI
@property unsigned int maxPixelsWide;
@property unsigned int maxPixelsHigh;
@property CGPoint redPrimary;            // sRGB color primaries
@property CGPoint greenPrimary;
@property CGPoint bluePrimary;
@property CGPoint whitePoint;
@property dispatch_queue_t queue;
@property void (^terminationHandler)(void);

// CGVirtualDisplay (NSObject)
- (instancetype)initWithDescriptor:(CGVirtualDisplayDescriptor *)descriptor;
- (BOOL)applySettings:(CGVirtualDisplaySettings *)settings;
@property (readonly) CGDirectDisplayID displayID;
@property (readonly) NSArray *modes;
```

`CGVirtualDisplaySettings` adds display modes (width × height × refresh rate).

Because these classes are not exported in any public SDK header, they must be loaded at runtime via `NSClassFromString()`:

```swift
// Pattern used by BetterDisplay, FreeDisplay, displayoverride-mac, force-hidpi
guard let DescriptorClass = NSClassFromString("CGVirtualDisplayDescriptor") as? NSObject.Type,
      let DisplayClass    = NSClassFromString("CGVirtualDisplay") as? NSObject.Type,
      let SettingsClass   = NSClassFromString("CGVirtualDisplaySettings") as? NSObject.Type
else { fatalError("CGVirtualDisplay not available on this OS") }

let descriptor = DescriptorClass.init()
descriptor.setValue("RetroPlayer Virtual", forKey: "name")
descriptor.setValue(1920 as UInt32, forKey: "maxPixelsWide")
descriptor.setValue(1080 as UInt32, forKey: "maxPixelsHigh")
// physical size derived from desired DPI: 25.4 * px / ppi
descriptor.setValue(CGSize(width: 25.4 * 1920.0 / 96.0,
                           height: 25.4 * 1080.0 / 96.0), forKey: "sizeInMillimeters")
// sRGB primaries
descriptor.setValue(CGPoint(x: 0.680, y: 0.320), forKey: "redPrimary")
descriptor.setValue(CGPoint(x: 0.265, y: 0.690), forKey: "greenPrimary")
descriptor.setValue(CGPoint(x: 0.150, y: 0.060), forKey: "bluePrimary")
descriptor.setValue(CGPoint(x: 0.3127, y: 0.3290), forKey: "whitePoint")
descriptor.setValue(DispatchQueue(label: "vdisplay"), forKey: "queue")

let display = DisplayClass.init(descriptor: descriptor)  // initWithDescriptor:
// Must retain to prevent dealloc — the display disappears when the object is freed
let retained = Unmanaged.passRetained(display)
let displayID = display.value(forKey: "displayID") as! CGDirectDisplayID
```

**Confirmed by:** KhaosT/CGVirtualDisplay (Apache-2.0), domdomegg/displayoverride-mac, huberdf/FreeDisplay (uses "CGVirtualDisplay bridging header based on Chromium's virtual_display_mac_util.mm"), sammcj/force-hidpi.

### 1.2 macOS Version Availability

| Source | Minimum macOS |
|---|---|
| node-mac-virtual-display | 10.14 Mojave |
| FreeDisplay README | 14+ (Sonoma) for their use case |
| force-hidpi README | macOS 26 (for M4/M5 HiDPI workaround specifically) |
| ScreenCaptureKit bug report | Works at least since macOS 12 (Monterey) |

**Inferred:** The `CGVirtualDisplay` class exists in CoreGraphics since at least macOS 10.14. The API surface appears stable through Sonoma/Sequoia based on active third-party usage, but it is private and can break without warning. **Target macOS 13+ is safe for this API.**

### 1.3 Entitlements — The Critical Finding

**There is NO public entitlement for `CGVirtualDisplay`.** Confirmed findings:

- No `com.apple.developer.virtual-display` entitlement exists in Apple's public entitlement catalog.
- `com.apple.private.*` entitlements are reserved for Apple's own system processes only — requesting them will cause App Store rejection and notarization failure.
- Real-world apps that use `CGVirtualDisplay` (BetterDisplay, FreeDisplay, displayoverride-mac, node-mac-virtual-display) are all **distributed outside the Mac App Store** and **disable the App Sandbox**.

**Sandbox requirement:** The `CGVirtualDisplay` API requires loading private framework classes. This works in unsandboxed apps. **It is unconfirmed whether it works inside the Tauri default sandbox.** Given that it uses `dlopen`-style runtime class loading rather than system call privilege escalation, it may work in a sandboxed app — but this is the **highest-risk unknown** in the entire PoC (see Section 7).

**Distribution implication:** If sandbox must be disabled, the app cannot be distributed via the Mac App Store. Direct distribution (DMG/Sparkle) with notarization is still possible.

### 1.4 Calling CGVirtualDisplay from Rust

Because the API is private and accessed via `NSClassFromString` / KVO reflection in Swift/ObjC, there are two practical Rust paths:

**Option A — Rust `objc2` crate with runtime introspection:**  
`objc2` supports `msg_send!` to any class by string name. This is verbose and requires unsafe code, but avoids any Swift compilation step.

```rust
// Cargo.toml (macOS-only)
[target.'cfg(target_os = "macos")'.dependencies]
objc2 = "0.5"
objc2-foundation = { version = "0.2", features = ["NSString", "NSObject"] }

// src-tauri/src/virtual_display.rs
#[cfg(target_os = "macos")]
pub unsafe fn create_virtual_display(width: u32, height: u32) -> Option<u32> {
    use objc2::runtime::AnyClass;
    use objc2::msg_send;

    let cls = AnyClass::get(c"CGVirtualDisplayDescriptor")?;
    let desc: *mut objc2::runtime::AnyObject = msg_send![cls, new];
    // set properties via setValue:forKey: (KVO)
    // ... (verbose but works)
    let disp_cls = AnyClass::get(c"CGVirtualDisplay")?;
    let display: *mut objc2::runtime::AnyObject =
        msg_send![disp_cls, alloc];
    let display: *mut objc2::runtime::AnyObject =
        msg_send![display, initWithDescriptor: desc];
    let display_id: u32 = msg_send![display, displayID];
    Some(display_id)
}
```

**Option B — Swift static library compiled via `build.rs`:**  
This is the pattern used by `tauri-plugin-apple-intelligence` (Rust 48.6%, Swift 39.0%). The `build.rs` compiles a Swift file into a static lib, Rust links it, and calls it via `extern "C"` functions. Cleaner, more maintainable, recommended for non-trivial ObjC interactions.

```swift
// src-tauri/swift/virtual_display.swift
import Foundation
import CoreGraphics

@_cdecl("create_virtual_display_c")
public func createVirtualDisplay(width: UInt32, height: UInt32) -> UInt32 {
    guard let DescriptorClass = NSClassFromString("CGVirtualDisplayDescriptor") as? NSObject.Type
    else { return 0 }
    // ... (KVO-based configuration)
    return displayID
}
```

```rust
// src-tauri/src/lib.rs
#[cfg(target_os = "macos")]
extern "C" {
    fn create_virtual_display_c(width: u32, height: u32) -> u32;
}
```

**Recommendation:** Use the Swift shim path. It's the proven pattern in the Tauri ecosystem, avoids deeply unsafe ObjC runtime gymnastics in Rust, and Swift errors are caught at compile time.

### 1.5 Known Open-Source Examples

| Repository | Language | Notes |
|---|---|---|
| [KhaosT/CGVirtualDisplay](https://github.com/KhaosT/CGVirtualDisplay) | ObjC + Swift | Canonical minimal example |
| [domdomegg/displayoverride-mac](https://github.com/domdomegg/displayoverride-mac) | Swift 100% | Clean single-file implementation |
| [huberdf/FreeDisplay](https://github.com/huberdf/FreeDisplay) | Swift | Based on Chromium's virtual_display_mac_util.mm |
| [sammcj/force-hidpi](https://github.com/sammcj/force-hidpi) | Swift | M4/M5 HiDPI via virtual display + mirror |
| [enfp-dev-studio/node-mac-virtual-display](https://github.com/enfp-dev-studio/node-mac-virtual-display) | ObjC++ + Node.js | Node native addon, works from macOS 10.14 |

---

## 2. Capture Pipeline Options

### 2.1 ScreenCaptureKit (Recommended)

**macOS 12.3+ (Monterey) — Public API — TCC-gated only.**

ScreenCaptureKit is Apple's modern, recommended capture framework. It **does** enumerate `CGVirtualDisplay` instances as regular `SCDisplay` objects via `SCShareableContent`:

```swift
SCShareableContent.getExcludingDesktopWindows(false, onScreenWindowsOnly: false) { content, error in
    // content.displays includes virtual displays with their CGDirectDisplayID
    let virtualDisplay = content.displays.first { $0.displayID == myVirtualDisplayID }
    let filter = SCContentFilter(display: virtualDisplay!, excludingWindows: [])
    // proceed to SCStream
}
```

**Known bug (unresolved since launch, Bug FB17797423):** When multiple virtual displays are connected and any one is disconnected/reconnected, new `SCStream` instances will capture content from the **wrong** virtual display regardless of the `SCContentFilter` configuration. This persists until all virtual displays are disconnected and reconnected. For a single virtual display (the tetorica use case), **this bug does not apply**. Using one virtual display at a time is safe.

**Content filter:** `SCContentFilter(display:excludingWindows:)` — pass the `SCDisplay` obtained by matching `displayID` from `SCShareableContent`.

**Frame format:** `kCVPixelFormatType_32BGRA` by default. BGRA is ~5% faster than RGBA because it skips a byte-swap.

**Typical latency:** 30–100 ms at 1080p, 50–150 ms at 4K (from screencapturekit-rs benchmarks, confirmed independently). First-frame latency is higher; steady-state is at the lower end.

**Permission required:** User TCC grant via System Settings → Privacy & Security → Screen & System Audio Recording. No code-signing entitlement needed.

### 2.2 CGDisplayStream (Simpler but Deprecated)

`CGDisplayStream` takes a `CGDirectDisplayID` directly — which the virtual display provides. It is simpler to set up:

```swift
let stream = CGDisplayStream(
    display: virtualDisplayID,
    outputWidth: 1920, outputHeight: 1080,
    pixelFormat: Int32(kCVPixelFormatType_32BGRA),
    properties: nil,
    queue: DispatchQueue.global(),
    handler: { status, displayTime, frameSurface, updateRef in
        // frameSurface is an IOSurface — zero-copy GPU access possible
    }
)
stream?.start()
```

**Status:** Deprecated as of macOS 14.4 (Apple began issuing deprecation warnings in 14.4 beta, then 15.0). Using `CGDisplayStream` in macOS 15+ triggers **additional TCC consent prompts** — the user sees permission dialogs more frequently than with ScreenCaptureKit.

**Verdict:** Use `CGDisplayStream` only for the first PoC validation due to its simplicity. Migrate to ScreenCaptureKit for production.

### 2.3 AVFoundation AVCaptureScreenInput

`AVCaptureScreenInput` captures displays by `CGDirectDisplayID` but:
- Also deprecated on the same schedule as CGDisplayStream.
- Returns `CMSampleBuffer` with `CVImageBuffer`, not raw IOSurface.
- Higher latency than ScreenCaptureKit.
- **Not recommended** for this use case.

### 2.4 Frame Format Summary

| API | Default pixel format | IOSurface? | Notes |
|---|---|---|---|
| ScreenCaptureKit | BGRA8 (`kCVPixelFormatType_32BGRA`) | Yes (zero-copy) | Configurable to YCbCr 420 |
| CGDisplayStream | BGRA8 | Yes | Deprecated |
| AVCaptureScreenInput | BGRA8 | Via CVPixelBuffer | Deprecated |

---

## 3. Tauri Integration Path

### 3.1 Linking macOS Frameworks from Tauri Rust

Add macOS-only dependencies in `src-tauri/Cargo.toml`:

```toml
[target.'cfg(target_os = "macos")'.dependencies]
objc2 = "0.5"
objc2-foundation = { version = "0.3", features = ["NSString"] }
objc2-screen-capture-kit = { version = "0.3", features = ["SCStream", "SCShareableContent", "SCContentFilter", "SCStreamConfiguration"] }
# OR use the higher-level wrapper:
screencapturekit = "1.5"
```

For the Swift shim approach, `build.rs` handles Swift compilation:

```rust
// src-tauri/build.rs
fn main() {
    #[cfg(target_os = "macos")]
    {
        println!("cargo:rustc-link-lib=framework=CoreGraphics");
        println!("cargo:rustc-link-lib=framework=ScreenCaptureKit");
        // Compile Swift shim
        let status = std::process::Command::new("swiftc")
            .args(["-parse-as-library", "-module-name", "VirtualDisplayShim",
                   "-emit-object", "swift/virtual_display.swift",
                   "-o", "swift/virtual_display.o"])
            .status().unwrap();
        assert!(status.success());
        println!("cargo:rustc-link-search=native=swift/");
        println!("cargo:rustc-link-lib=static=VirtualDisplayShim");
    }
    tauri_build::build();
}
```

**The `screencapturekit` crate** (doom-fish/screencapturekit-rs, now at svtlabs/screencapturekit-rs) provides the most ergonomic path and already includes a working Tauri example at `examples/22_tauri_app`:

```bash
cd examples/22_tauri_app && npm install && npm run tauri dev
```

This is the **most validated integration path** available.

### 3.2 Streaming Frames to the JS Frontend

The Tauri 2 documentation explicitly states: **"The event system is not designed for low latency or high throughput situations."**

For 1080p 60fps BGRA: each frame = 1920 × 1080 × 4 bytes = **~7.9 MB**. At 60fps that is **~475 MB/s**. Base64-encoding adds 33% overhead → ~630 MB/s, plus JSON serialization cost. This approach fails at 60fps.

**Practical options ranked by performance:**

#### Option A — Tauri Channel API (Recommended for 30fps)

Tauri 2 Channels are designed for ordered, high-throughput delivery. Use `tauri::ipc::Channel` with binary bytes:

```rust
#[tauri::command]
async fn start_capture(channel: tauri::ipc::Channel<Vec<u8>>) {
    // deliver raw BGRA bytes per frame
    channel.send(frame_bytes).unwrap();
}
```

```js
// frontend
const channel = new Channel();
channel.onmessage = (frameBytes) => {
    const imageData = new ImageData(
        new Uint8ClampedArray(frameBytes), 1920, 1080
    );
    ctx.putImageData(imageData, 0, 0); // or feed to WebGL texture
};
await invoke('start_capture', { channel });
```

Benchmark: `tauri-conduit` (binary IPC mode) achieved **202 µs for 64KB** (11.2× faster than standard Tauri invoke at 2.272 ms). A full 1080p BGRA frame at 7.9MB extrapolates to roughly **25–30 ms** per frame transfer — sufficient for ~30fps but tight for 60fps.

#### Option B — Custom URI Scheme Protocol (Best throughput)

Register a custom protocol that serves frames as binary responses, polled by the frontend:

```rust
// In Tauri app setup
.register_uri_scheme_protocol("retroframe", |_app, request| {
    // serve latest frame bytes as image/raw or image/png
    let frame = LATEST_FRAME.lock().unwrap().clone();
    tauri::http::Response::builder()
        .header("Content-Type", "application/octet-stream")
        .body(frame)
        .unwrap()
})
```

```js
// Frontend: poll at desired fps
setInterval(async () => {
    const resp = await fetch('retroframe://localhost/frame');
    const buf = await resp.arrayBuffer();
    // upload to WebGL texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1920, 1080, 0,
                  gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(buf));
}, 1000/30);
```

The `register_asynchronous_uri_scheme_protocol` variant avoids blocking the main thread.

#### Option C — Zero-Copy IOSurface → Metal → WebGL (Advanced, lowest latency)

ScreenCaptureKit delivers frames as IOSurface-backed `CVPixelBuffer`. IOSurface is shared GPU memory — no CPU copy needed. The captured IOSurface can be wrapped as a Metal texture and rendered directly. However, bridging Metal textures into WebKit's WebGL context requires additional plumbing (WKWebView's `MTKView` overlay or offscreen render). **Not recommended for initial PoC** — complexity is high.

#### Option D — Does the virtual display appear in getDisplayMedia()? (Simplest if it works)

**Yes — with caveats.** A `CGVirtualDisplay` gets a `CGDirectDisplayID` and is treated by macOS as a real monitor. macOS's screen-picker UI (the system picker shown by `getDisplayMedia`) lists all `CGDirectDisplayID` sources. Therefore, a virtual display **should appear** as a selectable source in `navigator.mediaDevices.getDisplayMedia()`.

If this works, the entire capture pipeline requires **zero Rust changes** — the user (or code using `preferCurrentTab`/`displaySurface: 'monitor'`) selects the virtual display, and the existing `HTMLVideoElement` + WebGL pipeline handles it identically to any other display.

**This is the highest-leverage path to validate first.** Create the virtual display in a small Swift tool, then test `getDisplayMedia` in the Tauri WebView to confirm it sees the virtual display as a source.

**Limitation:** `getDisplayMedia` shows the system picker UI — there is no way to auto-select a virtual display programmatically without the user interacting, unless the app has the `com.apple.developer.persistent-content-capture` entitlement (for VNC-type apps, requires Apple approval) or uses `preferCurrentTab`. For an experimental feature requiring one user interaction, this is acceptable.

---

## 4. Permissions and Entitlements Audit

### 4.1 Required Info.plist Keys

Add to `src-tauri/Info.plist`:

```xml
<key>NSScreenCaptureUsageDescription</key>
<string>tetorica-retro-player captures your screen to apply retro video filters.</string>
```

`NSMicrophoneUsageDescription` is already present — keep it.

### 4.2 Required Entitlements

No code-signing entitlement is needed for `SCShareableContent` / ScreenCaptureKit. Permission is granted entirely through the TCC system at runtime.

For the Tauri `src-tauri/entitlements.plist` (or equivalent Tauri config), **no addition is needed for screen recording itself**.

If sandbox (`com.apple.security.app-sandbox`) remains enabled:
- Test whether `CGVirtualDisplay` (private API, accessed via `NSClassFromString`) works inside the sandbox. It may work because it is loaded from a system framework rather than requiring a privileged syscall.
- If it fails, the sandbox must be disabled. This means adding `com.apple.security.app-sandbox = false` (or simply not including it) in entitlements.
- **Disabling sandbox does not prevent notarization** — it only prevents Mac App Store distribution.

Current `tauri.conf.json` does not specify macOS entitlements explicitly — Tauri's default includes app-sandbox for the macOS bundle. Check `src-tauri/capabilities/` for any existing entitlement config.

### 4.3 Sequoia (macOS 15) Screen Recording Changes

As of macOS 15 (Sequoia), Apple introduced **monthly re-authorization prompts** for screen recording. The user sees a reminder dialog every 30 days. An orange menu-bar indicator appears whenever recording is active.

Apps using legacy `CGDisplayStream` APIs (deprecated) receive **more frequent** consent prompts than apps using ScreenCaptureKit. This is another reason to use ScreenCaptureKit in production.

The `com.apple.developer.persistent-content-capture` managed entitlement suppresses the monthly re-auth prompt but requires Apple approval and is intended for VNC/remote-desktop applications.

### 4.4 Notarization Impact

- Adding `NSScreenCaptureUsageDescription` to Info.plist: **no impact on notarization** — it is a standard privacy string.
- Using ScreenCaptureKit (public API, TCC-gated): **notarization succeeds without modification**.
- Using `CGVirtualDisplay` (private API): **notarization may succeed** — Apple's notarization scanner checks for known dangerous private entitlements, not for use of private framework classes. Many apps using `CGVirtualDisplay` are notarized (BetterDisplay, etc.).
- Disabling sandbox: **notarization succeeds** — sandbox is only required for App Store, not for notarization.
- Hardened Runtime: Must remain enabled for notarization. No changes needed to hardened runtime settings for ScreenCaptureKit.

### 4.5 Tauri Hardened Runtime Config

Tauri 2 enables Hardened Runtime by default for macOS bundles. No `com.apple.security.cs.*` exceptions are needed for screen recording or virtual display creation. The existing config is compatible.

---

## 5. Latency and Performance Estimate

### 5.1 ScreenCaptureKit Frame Delivery Latency

| Resolution | Target FPS | First-frame latency | Steady-state latency |
|---|---|---|---|
| 1080p | 60 | 30–100 ms | ~16 ms (1 frame) |
| 4K | 30 | 50–150 ms | ~33 ms (1 frame) |

Source: screencapturekit-rs documented benchmarks. CPU cost: ~1.9% of one core at 1080p 60fps + 48kHz stereo on Apple Silicon.

### 5.2 Frame Copy Cost (Native → Rust → JS)

**1080p BGRA at 60fps:**
- Frame size: 1920 × 1080 × 4 = 7,962,624 bytes ≈ 7.6 MB
- At 60fps: 7.6 × 60 = **456 MB/s raw**
- Apple Silicon memory bandwidth: 200–400 GB/s — this is trivially affordable.
- Bottleneck is not memory bandwidth but **serialization overhead** in the Tauri IPC bridge.

**IPC benchmark (tauri-conduit):**
- Standard Tauri invoke at 64KB: 2.272 ms
- Binary IPC (tauri-conduit L2): 202 µs for 64KB

Extrapolating to 7.6 MB: ~24 ms with binary IPC. This caps at ~40fps for pure IPC. For 60fps, the zero-copy path is needed.

**Practical recommendation for PoC:** Target 30fps (33 ms budget per frame). 30fps is sufficient to validate the retro-filter pipeline and leaves comfortable headroom.

### 5.3 Zero-Copy Path via IOSurface

ScreenCaptureKit delivers frames as `IOSurface`-backed `CVPixelBuffer`. The IOSurface ID (`IOSurfaceGetID`) is a small integer that can be sent across process boundaries. In a Tauri context:

1. Rust receives the `CVPixelBuffer` with its `IOSurface`.
2. Rust sends only the `IOSurfaceID` (4 bytes) to JS via Tauri event.
3. JS uses a hypothetical `IOSurface`-to-WebGL bridge — **but this does not exist in WebKit/WKWebView's public API**.

True zero-copy into WebGL requires WKWebView's Metal integration, which is not exposed to the JS layer. The practical zero-copy path is IOSurface → Metal texture → render to offscreen `CAMetalLayer` → composite over the WKWebView — which bypasses the WebGL pipeline entirely.

**Conclusion:** For the PoC, accept the copy cost. Zero-copy is a post-PoC optimization requiring Metal rendering outside the WebView.

---

## 6. Tauri vs Electron Comparison

| Factor | Tauri 2 | Electron |
|---|---|---|
| **Bundle size** | 2–10 MB installer | 80–150 MB installer |
| **Idle memory** | 30–50 MB | 150–300 MB |
| **Native API access** | Requires Rust + objc2/Swift shim; more setup | Node.js `nativeAddon` or `desktopCapturer`; easier scaffolding |
| **Screen capture** | `screencapturekit` Rust crate, working Tauri example available | `desktopCapturer.getSources()` built-in, but fullscreen virtual workspaces not listed |
| **WebView engine** | WKWebView (WebKit) — macOS system version | Bundled Chromium — consistent cross-platform |
| **Frame delivery to JS** | Channel API / custom protocol required | `getUserMedia` / `desktopCapturer` / Node.js IPC |
| **Virtual display visibility** | CGVirtualDisplay appears in `getDisplayMedia` picker (likely) | CGVirtualDisplay should appear in `desktopCapturer.getSources()` (unconfirmed) |
| **Maintenance burden** | Rust FFI for native features; smaller community for macOS-specific work | Larger ecosystem; more existing screen-capture examples |

**Verdict (brief):**
- Do not switch to Electron. The existing Tauri investment is sound, binary size and memory advantages are real, and the `screencapturekit` Rust crate with its Tauri example proves the capture path is viable.
- Electron's `desktopCapturer` would make initial prototyping slightly easier, but Tauri's Channel API + ScreenCaptureKit achieves the same result with better runtime performance.
- The WebKit (WKWebView) engine on macOS is well-suited for WebGL/PixiJS — no Chromium-specific features are required.
- Electron does make the native-Swift-bridge step unnecessary (Node native addons are more documented), but this is a one-time complexity cost, not an ongoing burden.
- Stay on Tauri.

---

## 7. Minimum PoC Plan

### 7.1 Goal

Prove: (a) a virtual display can be created, (b) ScreenCaptureKit can capture it, (c) frames reach the WebGL/PixiJS pipeline.

### 7.2 Highest-Risk Unknown — Validate This First

**Can `getDisplayMedia` in the Tauri/WKWebView JS context see the CGVirtualDisplay as a source, without any Rust code changes?**

If yes: the entire PoC collapses to "create virtual display in a small Swift CLI → user picks it in existing getDisplayMedia flow → done."

**Test procedure (1–2 hours):**
1. Compile and run the [domdomegg/displayoverride-mac](https://github.com/domdomegg/displayoverride-mac) Swift script to create a virtual display.
2. In the existing app (or a browser), call `navigator.mediaDevices.getDisplayMedia({video: true})` and observe whether the virtual display appears in the system picker.
3. If yes: proceed to Steps A–B below. If no: proceed to Steps C–D.

### 7.3 PoC Build Plan (Weekend)

#### Step 0 — Sandbox audit (30 min)
Check whether `NSClassFromString("CGVirtualDisplayDescriptor")` returns non-nil inside the sandboxed Tauri app. Add a temporary Tauri command:

```rust
#[tauri::command]
#[cfg(target_os = "macos")]
fn check_virtual_display_available() -> bool {
    unsafe {
        // Use objc2 or Swift FFI to call NSClassFromString
        // Return true if class is available
    }
}
```

If it returns false: disable sandbox in `src-tauri/entitlements.plist` and rebuild.

#### Step A — Virtual display creation (Swift shim, 2–4 hours)

Create `src-tauri/swift/virtual_display.swift`:
```swift
import Foundation
import CoreGraphics

@_cdecl("vd_create")
public func vdCreate(width: UInt32, height: UInt32, fps: UInt32) -> UInt32 {
    guard let DC = NSClassFromString("CGVirtualDisplayDescriptor") as? NSObject.Type,
          let DD = NSClassFromString("CGVirtualDisplay") as? NSObject.Type,
          let DS = NSClassFromString("CGVirtualDisplaySettings") as? NSObject.Type
    else { return 0 }

    let desc = DC.init()
    desc.setValue("RetroPlayer", forKey: "name")
    desc.setValue(width, forKey: "maxPixelsWide")
    desc.setValue(height, forKey: "maxPixelsHigh")
    desc.setValue(CGSize(width: 25.4 * Double(width) / 96.0,
                         height: 25.4 * Double(height) / 96.0),
                  forKey: "sizeInMillimeters")
    desc.setValue(CGPoint(x: 0.68, y: 0.32), forKey: "redPrimary")
    desc.setValue(CGPoint(x: 0.265, y: 0.69), forKey: "greenPrimary")
    desc.setValue(CGPoint(x: 0.15, y: 0.06), forKey: "bluePrimary")
    desc.setValue(CGPoint(x: 0.3127, y: 0.329), forKey: "whitePoint")
    desc.setValue(DispatchQueue(label: "vd.queue"), forKey: "queue")

    let disp = DD.perform(NSSelectorFromString("alloc")).takeUnretainedValue()
    let disp2 = (disp as AnyObject).perform(
        NSSelectorFromString("initWithDescriptor:"), with: desc
    ).takeUnretainedValue()

    let settings = DS.init()
    let modeClass = NSClassFromString("CGVirtualDisplayMode") as? NSObject.Type
    // add mode (width x height @ fps)
    _ = disp2.perform(NSSelectorFromString("applySettings:"), with: settings)

    // Retain to prevent dealloc — store in global
    _ = Unmanaged.passRetained(disp2)
    let displayID = (disp2 as AnyObject).value(forKey: "displayID") as? UInt32 ?? 0
    return displayID
}

@_cdecl("vd_destroy")
public func vdDestroy() {
    // release retained display object
}
```

Add Tauri command:
```rust
#[tauri::command]
#[cfg(target_os = "macos")]
pub fn create_virtual_display(width: u32, height: u32) -> u32 {
    unsafe { vd_create(width, height, 60) }
}
```

#### Step B — Capture + frame delivery (4–6 hours)

Add `screencapturekit = "1.5"` to Cargo.toml and implement:

```rust
#[tauri::command]
#[cfg(target_os = "macos")]
pub async fn start_virtual_display_capture(
    display_id: u32,
    channel: tauri::ipc::Channel<Vec<u8>>,
) -> Result<(), String> {
    use screencapturekit::prelude::*;

    let content = SCShareableContent::get().await
        .map_err(|e| e.to_string())?;

    let display = content.displays.iter()
        .find(|d| d.display_id == display_id)
        .ok_or("Virtual display not found")?;

    let filter = SCContentFilter::new(
        InitParams::Display(display.clone())
    );

    let config = SCStreamConfiguration {
        width: 1920,
        height: 1080,
        pixel_format: PixelFormat::BGRA8888,
        ..Default::default()
    };

    let stream = SCStream::new(filter, config, |result| {
        if let Ok(frame) = result {
            // frame.pixel_buffer contains BGRA bytes
            let bytes = frame.pixel_buffer.as_slice().to_vec();
            let _ = channel.send(bytes);
        }
    });

    stream.start().map_err(|e| e.to_string())?;
    // Store stream handle to keep it alive
    Ok(())
}
```

#### Step C — JS frontend integration (2–3 hours)

In the existing React/PixiJS code, add a mode that receives raw BGRA frames via Channel and uploads to a WebGL texture:

```typescript
// src/hooks/useVirtualDisplayCapture.ts
import { invoke } from '@tauri-apps/api/core';
import { Channel } from '@tauri-apps/api/core';

export function useVirtualDisplayCapture(gl: WebGLRenderingContext, tex: WebGLTexture) {
  const start = async () => {
    // Step A: create the virtual display
    const displayId = await invoke<number>('create_virtual_display', 
      { width: 1920, height: 1080 });
    
    // Step B: start capture stream
    const channel = new Channel<ArrayBuffer>();
    channel.onmessage = (frameBytes: ArrayBuffer) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA,
        1920, 1080, 0,
        gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array(frameBytes)
      );
      // existing PixiJS retro filter pipeline picks up the updated texture
    };
    
    await invoke('start_virtual_display_capture', { displayId, channel });
  };
  return { start };
}
```

Note: BGRA from ScreenCaptureKit maps to `gl.RGBA` in WebGL with a byte-swap shader, or use `EXT_texture_format_BGRA8888` if available in WKWebView.

### 7.4 PoC Risk Register

| Risk | Likelihood | Severity | Mitigation |
|---|---|---|---|
| `CGVirtualDisplay` blocked by sandbox | Medium | High | **Validate first in Step 0.** Disable sandbox if needed. |
| `CGVirtualDisplay` API changed in future macOS | Medium | Medium | Pin minimum macOS version; monitor BetterDisplay/FreeDisplay for breakage signals. |
| ScreenCaptureKit multi-virtual-display bug triggers | Low (single display) | Medium | Use only one virtual display at a time. |
| Frame throughput insufficient at 60fps via Channel | Medium | Medium | Target 30fps for PoC; zero-copy Metal path for production. |
| `getDisplayMedia` doesn't show virtual display in WKWebView | Low | High | **Validate in first test (30 min).** Fall back to Rust capture path. |
| TCC prompt blocks automated testing | Low | Low | Grant permission manually once; TCC persists by TeamIdentifier. |

---

## Appendix: Quick-Start Cargo.toml diff

```toml
# src-tauri/Cargo.toml additions

[target.'cfg(target_os = "macos")'.dependencies]
screencapturekit = "1.5"
objc2 = "0.5"
objc2-foundation = { version = "0.3", features = ["NSString", "NSObject", "NSArray"] }
```

## Appendix: Info.plist additions

```xml
<!-- src-tauri/Info.plist — add alongside existing NSMicrophoneUsageDescription -->
<key>NSScreenCaptureUsageDescription</key>
<string>tetorica-retro-player needs screen recording permission to apply retro filters to virtual display content.</string>
```

---

## Sources

- [Hacker News: CGVirtualDisplay private API discussion](https://news.ycombinator.com/item?id=45201767)
- [KhaosT/CGVirtualDisplay — canonical ObjC/Swift example](https://github.com/KhaosT/CGVirtualDisplay)
- [domdomegg/displayoverride-mac — clean Swift implementation](https://github.com/domdomegg/displayoverride-mac)
- [huberdf/FreeDisplay — CGVirtualDisplay + Chromium bridging header](https://github.com/huberdf/FreeDisplay)
- [sammcj/force-hidpi — M4/M5 virtual display workaround](https://github.com/sammcj/force-hidpi)
- [enfp-dev-studio/node-mac-virtual-display](https://github.com/enfp-dev-studio/node-mac-virtual-display)
- [Apple Developer Forums: ScreenCaptureKit confuses virtual displays (Bug FB17797423)](https://developer.apple.com/forums/thread/786829)
- [svtlabs/screencapturekit-rs — Rust ScreenCaptureKit bindings with Tauri example](https://github.com/svtlabs/screencapturekit-rs)
- [screencapturekit crate documentation](https://doom-fish.github.io/screencapturekit-rs/screencapturekit/)
- [objc2-screen-capture-kit on lib.rs](https://lib.rs/crates/objc2-screen-capture-kit)
- [objc2-core-graphics on lib.rs](https://lib.rs/crates/objc2-core-graphics)
- [macOS CoreGraphics headers dump (CGVirtualDisplay.h)](https://github.com/w0lfschild/macOS_headers/blob/master/macOS/Frameworks/CoreGraphics/1336/CGVirtualDisplay.h)
- [tauri-plugin-apple-intelligence — Swift+Rust+Tauri plugin pattern](https://github.com/jaytuduri/tauri-plugin-apple-intelligence)
- [Tauri 2: Calling the Frontend from Rust](https://v2.tauri.app/develop/calling-frontend/)
- [Tauri IPC improvements discussion](https://github.com/tauri-apps/tauri/discussions/5690)
- [tauri-conduit benchmarks](https://github.com/userFRM/tauri-conduit/blob/master/BENCHMARKS.md)
- [Michael Tsai: Sequoia Screen Recording and Persistent Content Capture Entitlement](https://mjtsai.com/blog/2024/08/08/sequoia-screen-recording-prompts-and-the-persistent-content-capture-entitlement/)
- [Apple Developer Forums: screen recording entitlements for macOS](https://developer.apple.com/forums/thread/778616)
- [Electron desktopCapturer API docs](https://www.electronjs.org/docs/latest/api/desktop-capturer)
- [OpenReplay: Comparing Electron and Tauri](https://blog.openreplay.com/comparing-electron-tauri-desktop-applications/)
- [Apple WWDC22: Meet ScreenCaptureKit](https://developer.apple.com/videos/play/wwdc2022/10156/)
- [Apple WWDC24: Capture HDR content with ScreenCaptureKit](https://developer.apple.com/videos/play/wwdc2024/10088/)
