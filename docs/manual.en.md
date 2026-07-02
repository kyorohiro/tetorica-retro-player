# Tetorica Retro Player — User Manual

A player that pushes images, videos, and screen captures through retro PC / CRT-style filters and lo-fi audio effects while it plays.
This document is a user-facing manual (developer implementation notes live in `docs/issues/`).

---

## 1. Supported Environments

| Distribution | Notes |
|---|---|
| Desktop app (Tauri) | macOS / Windows / Linux. Full feature set, including mDrop and ffmpeg conversion (see below) |
| Android app (Tauri) | mDrop, ffmpeg conversion, and virtual-device features are disabled. Playback, filters, and audio effects are still available |
| Chrome extension | Capture the current tab and apply the filter, or overlay the retro filter directly on videos/images on any webpage |
| Web app (browser) | Play via drag-and-drop, file picker, or screen capture. mDrop is only reachable over the network from a running desktop app |

---

## 2. Loading Media

Press the ☰ (hamburger) button in the top-left corner to open the menu.

- **Open File** — Load video/image/audio/zip/pdf files via a file picker
- **Open Folder** (desktop only) — Load every media file in a folder as a playlist
- **Capture Screen** — Pick a window or the whole screen from the OS share dialog and preview it through the filter live
- **Microphone Input / Camera Input** — Capture microphone audio or camera video
- **Select Microphone Device** — Pick a specific input device
- **Test presets** — One-tap sample content for checking things work: color-bar video/image, a ToneJS lo-fi demo song (expand "More" for the full demo song list)
- **Language** — Switch between Auto / English / Japanese

**Long-press** the hamburger button to hide the entire toolbar (handy when streaming or just watching without the UI in the way). While hidden, a small translucent button remains in the top-left corner to bring it back.

You can also drag and drop media files anywhere on the screen to load them.

### Supported File Formats

| Type | Plays natively | Needs ffmpeg conversion (HLS) |
|---|---|---|
| Video | mp4, m4v, webm, ogv, mov | avi, flv, mkv, wmv, ts, m2ts, mts, divx, xvid, rm, rmvb, 3gp, f4v, asf, vob, mpeg, mpg, m2v, mxf |
| Audio | mp3, wav, ogg/oga, m4a, aac, flac, opus | — |
| Image | png, jpg/jpeg, webp, gif, svg, avif, heic/heif | — |
| Other | PDF / EPUB / ZIP(cbz) shared via mDrop can be previewed in-browser (viewing only, not playback) | — |

Formats that need ffmpeg conversion only play when ffmpeg is enabled in the desktop app (see "mDrop" below for details).

---

## 3. Screen Layout

- **Preview area** — Where the filtered output is shown
- **Top-right toolbar** — Power, Hi-Res, Brightness, Fit width, Pin, Maximize, Record, and the ⋯ (More) button (see [Section 5](#5-top-right-toolbar))
- **Top-right mDrop / ffmpeg pill buttons** (desktop app only) — These buttons do different things on click vs. long-press. See [Section 10, "mDrop"](#10-mdrop-transferring-files-from-another-device) for details
- **Bottom control panel** — Playback controls, Video / Audio setting tabs, Reset, and settings save/load

---

## 4. Basic Playback

- **Seek bar** — Click or drag to jump to a position
- **Play / Pause** button
- **Volume** button — Short press opens/closes the volume slider; **long-press** toggles mute
- **Loop** button — Cycles through `Loop One → Auto Next → Loop All → No Loop` on each press
- **Speed** (gauge icon) — Choose from 2x / 1.5x / 1.25x / 1x / 0.75x / 0.5x
- **Skip back/forward** buttons — Short press seeks ±5 seconds; **long-press** moves to the previous/next track (when playing a playlist)

### Playlist Feature

Loading multiple media files at once turns them into a playlist for continuous playback.

**To create a playlist:**

1. First set the Loop button to **"Auto Next" or "Loop All"**
2. While in that mode, select **multiple video/audio/image files only** via the file picker, Open Folder, dragging multiple files, or sharing multiple files over mDrop

If these conditions are met, the files load as a playlist and the skip back/forward buttons in the bottom control panel become active. (If only one file qualifies, or the conditions aren't met, only the first file is loaded.)

**Playback behavior depends on the loop mode:**

| Loop mode | When a track ends | Manual skip (long-press) |
|---|---|---|
| Auto Next | Advances to the next track. Stops after the last track (does not wrap to the start) | Can move to the next/previous track. Stops at the first/last track |
| Loop All | Advances to the next track, and wraps back to the first track after the last one, playing indefinitely | Can move to the next/previous track. Stops at the first/last track |
| Loop One / No Loop | Not a playlist — only the first of the selected files is played | — |

*Note: There is no dedicated UI showing your position in the playlist (like "track 3 of 10"). You can only track progress via the skip buttons and auto-advance behavior.*
*Note: Switching the loop mode afterward doesn't change the playlist's contents — it only changes what happens the next time a track ends.*

### Keyboard Shortcuts

| Key | Action |
|---|---|
| Space or K | Play / Pause |
| ← (Left arrow) | Seek back 5 seconds |
| → (Right arrow) | Seek forward 5 seconds |
| J | Seek back 10 seconds |
| L | Seek forward 10 seconds |

*Disabled while a text input has focus.*

---

## 5. Top-Right Toolbar

| Button | Action |
|---|---|
| **Power** | Toggle the retro filter on/off |
| **Hi-Res** (aperture icon) | Toggle render resolution between 1x and 2x |
| **Brightness** (−/%/+) | Adjust from 40% to 200% in 5% steps. **Only shown here when the window is at least 480px wide** — below that, it's folded into the slider in the "More" menu instead |
| **Fit width** | Stretch the preview to fill the available width, or undo that |
| **Pin** | Keep the preview fixed on screen while scrolling (unavailable while Maximized) |
| **Maximize** | Show the preview full-screen. Press again or hit Esc to exit |
| **Record** (●/■ icon) | Record the filtered output. Press again to stop and export (moves into the "More" menu below 360px width) |

### The "⋯" More Menu

- **Audio Optimize**: auto / chrome / safari — manually pick the browser-specific audio playback strategy (auto is fine in most cases)
- **Latency**: interactive / balanced / playback — WebAudio latency priority. Changes take effect after toggling Power off then on
- **Use QSV** (Windows only) — Enable Intel Quick Sync–accelerated ffmpeg conversion where available
- **HLS ffmpeg slots** (1–8) — Maximum number of concurrent transcode jobs
- **Alarm** — Time picker (HH:MM) plus Set / Test / Clear buttons, with +1min / +5min / +10min shortcuts. Plays media or a notification tone at the chosen time. Background behavior depends on the browser, so it may not fire reliably if another window is in front
- **Flip H / Flip V** — Mirror the video horizontally/vertically
- (On narrow screens) The brightness slider also appears here

---

## 6. Video Settings Panel

Open it via the "Video" tab at the bottom. Long-pressing this tab also toggles the retro filter on/off, same as the Power button.

- **Presets**: Tap a tile to pick a look modeled after a retro machine — pc98_512, fm77av, pc88va, and more
- **Palette mode**: The color-reduction strategy — RGB mode, grayscale, monochrome, etc.
- **Mono tint** (only when the palette is monochrome): Single-color tone such as green, amber, or ice
- **Output size**: Width/height sliders, plus a checkbox to lock the aspect ratio to the source
- **Color levels, dither, smoothing**: Palette granularity, Bayer dithering, and pre-pixelation blur amount
- **CRT/LCD effects**: Curvature, scanlines, scanline bright-fade, vignette, glow, phosphor, close-up noise
- **Tone compression**: Dynamic-range compression for brightness/saturation (Amount/Low/High/Knee)
- **Phosphor dot** (for compatible palettes): Dot shape, brightness, 2x internal resolution, and other fine-grained settings
- **Anime/toon**: Posterize steps, edge strength, and edge-detection thresholds

Everything here is a slider or checkbox that reflects into the preview in real time. Start from a preset, then fine-tune from there.

---

## 7. Audio Settings Panel

Open it via the "Audio" tab at the bottom. Long-pressing this tab toggles all audio effects on/off.

- **Effects on/off**: Master toggle for all audio effects (long-press also toggles the FFT spectrum display)
- **Noise on/off**: Toggle the noise effect
- **Presets**: Classic / Lofi / 8-bit / VHS and more — tap to apply a full configuration at once
- **Effects**: Lo-Fi amount, radio tone, bit crush, sample-rate reduction, noise reduction, wow & flutter, and a 3-band Bass/Mid/Treble EQ
- **Space**: Delay, reverb, chorus
- **Dynamics**: Tape saturation, compressor
- **Input/Output**: Volume, stereo width, small-room character, output/input gain
- **Noise**: Surface hiss (vinyl record hiss), vinyl dust (crackle/pops), warmth, air, presence

---

## 8. Reset / Native Playback Mode

The "Reset" button at the bottom:

- **Short press**: Resets all Video/Audio settings to their defaults
- **Long-press (0.6s)**: Switches to Native Playback mode. The button label changes to "Native"

Native Playback mode plays video through the OS's native player instead of through the retro filter pipeline. It's a fallback for environments where filtered playback is unstable (for example, HLS streaming playback on Windows).

---

## 9. Saving and Loading Settings

Via the icons on the right side of the bottom control panel:

- **Save** (floppy disk icon): Exports all Video/Audio/UI settings to a timestamped `retro-YYYYMMDD-<timestamp>.retro.json` file
- **Load** (folder icon): Imports a `.retro.json` file via the file picker or drag-and-drop, and applies it immediately

Once you've dialed in a look and sound you like, save it, and reload it later when you open a different piece of media.

---

## 10. mDrop (Transferring Files From Another Device)

**Desktop app only** (not available on Android, the Chrome extension, or the web app). Lets another device on the same network (like a phone) send files over via its browser.

An "mDrop" pill button (Wifi icon) appears in the top-right corner. **Click and long-press trigger two different actions.**

| Action | Effect |
|---|---|
| **Click (short press)** | Toggles the transfer server on/off (it auto-starts when the app launches). By default this is just for the app's own internal communication and isn't visible to other devices |
| **Long-press** | Toggles "share mode" on/off. When on, an `IP:port` (e.g. `192.168.1.5:7878`) appears on screen, and **other devices can open that URL directly in their browser** |

- Uploading a file from the mDrop Web UI (opened via share mode) reflects immediately in this app's preview
- PDF / EPUB / ZIP(cbz) files sent this way can be previewed directly in the browser
- If you want another device to be able to reach it, note that you need to **both click to start the server and long-press to turn on share mode** — one alone isn't enough

An "ffmpeg" pill button (waves icon) may also appear next to it. Turning it on lets the app serve video formats the browser can't play directly (mkv, avi, etc.) as an HLS stream (requires ffmpeg to be installed).

---

## 11. Chrome Extension

A lightweight version you load via `chrome://extensions` or install from the Chrome Web Store. Clicking the extension icon opens a popup.

- **Capture current tab**: Captures the visible tab's video and runs it through the filter
- **Show viewer**: Opens the captured output in a dedicated tab
- **Overlay (Experimental)**: Overlays the retro filter directly on videos/images on another webpage
- The popup includes **Video** / **Audio** tabs like the main app, plus detailed **Overlay** settings and a lightweight **Alarm** tab
- Settings are stored in the Chrome extension's own storage (managed separately from the main app's `.retro.json` files)

---

## 12. Troubleshooting

- **No sound / stuck at "Touch & Play"**: Some browsers, like Safari, won't start audio playback without a direct user gesture. Press the button shown on screen to start playback
- **Stuck "loading" / shows "unsupported format"**: The file may need ffmpeg conversion. Check that ffmpeg is enabled in the desktop app
- **Playback is choppy or stalls**: Long-press the Reset button to switch to Native Playback mode — this sometimes helps
- **On Windows, video plays but there's no sound / effects don't apply**: This is a known limitation where HLS playback bypasses Web Audio
