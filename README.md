# Tetorica Retro Player

Retro-style preview player for images, videos, and live screen capture.

The app uses a Pixi.js shader pipeline to push local media through palette reduction, monochrome tints, dithering, scanlines, and CRT-style finishing. The same filter flow works for still images, movie files, and captured windows or screens.

<img src="docs/demo_small.png" alt="Demo" width="320" />

https://kyorohiro.itch.io/tetorica-retro-player

## Demo

- GitHub Pages landing page:
  [https://kyorohiro.github.io/tetorica-retro-player/](https://kyorohiro.github.io/tetorica-retro-player/)

- Demo app:
  [https://kyorohiro.github.io/tetorica-retro-player/demo/](https://kyorohiro.github.io/tetorica-retro-player/demo/)


![Demo](docs/demo.gif)

## Chrome Plugin

- [https://chromewebstore.google.com/detail/tetorica-retro-player/clnpmlgahomdkphcpcajbemodneoecna](https://chromewebstore.google.com/detail/tetorica-retro-player/clnpmlgahomdkphcpcajbemodneoecna)


## Features

- Drag and drop image or video files for instant preview
- Capture a window or screen and run it through the same retro filter
- Switch between retro presets and fine-tune target size, color count, dithering, and CRT effects
- Try monochrome tint modes such as gray, green, amber, and ice
- Use playback controls for video, including seek, loop, volume, playback speed, and keyboard shortcuts
- Maximize the preview in-page without duplicating the rendering pipeline

## Tech Stack

- React
- TypeScript
- Vite
- Pixi.js
- Tauri

## Local Development

```bash
npm install
npm run dev
```

## Chrome Extension PoC

`extension/` contains a minimal Manifest V3 proof of concept for:

- clicking the Chrome action button
- capturing the current tab with `chrome.tabCapture`
- feeding the resulting `MediaStream` into a hidden `<video>`
- uploading that video into a WebGL texture
- converting it to grayscale in a fragment shader
- drawing the result into a `<canvas>`

To try it:

1. Open `chrome://extensions`
2. Enable Developer mode
3. Choose Load unpacked
4. Select this repository's `extension/` directory
5. Open a tab you want to capture
6. Click the extension button
7. In the popup, press `Capture current tab`

The PoC opens `viewer.html` in an extension tab and renders the captured tab through the shared retro shader while audio settings are controlled from the extension popup. It is intentionally small and separate from the main app so the capture path can be verified before porting more of the player UI.

To create a release ZIP for the Chrome Web Store upload flow:

```bash
npm run build:extension
```

The packaged archive is written to `release/`.

## Build

```bash
npm run build
```

The web build is emitted to `dist/`.

## GitHub Pages

This repository is set up so that:

- `docs/index.html` works as the landing page
- `docs/demo/` contains the built demo app

When updating the public demo, rebuild the app and copy the latest build output into `docs/demo/`.

## Notes

- Screen capture availability depends on browser support and permission prompts.
- The GitHub Pages demo is best experienced on a desktop Chromium-based browser.

## License

This project is licensed under the MIT License.

Third-party libraries and bundled dependencies remain under their respective licenses.


## Release Memo

```
sh deploy_mac.sh
% ~/bin/butler login
% ~/bin/butler push src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.21.3_aarch64.dmg kyorohiro/tetorica-retro-player:mac-apple-silicon --userversion 0.21.3

% ~/bin/butler push src-tauri/target/x86_64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.21.3_x64.dmg kyorohiro/tetorica-retro-player:mac-intel --userversion 0.21.3

% ~/bin/butler push "tetorica-retro-player_0.21.3_x64-setup.exe" kyorohiro/tetorica-retro-player:windows --userversion 0.21.3

% ~/bin/butler push "tetorica-retro-player_0.21.3_aarch64.AppImage" kyorohiro/tetorica-retro-player:linux-arm --userversion 0.21.3

% ~/bin/butler push "tetorica-retro-player_0.21.3_amd64.AppImage" kyorohiro/tetorica-retro-player:linux-intel --userversion 0.21.3

~/bin/butler push \
  "app-release-signed_0.21.3.apk" \
  kyorohiro/tetorica-retro-player:android \
  --userversion 0.21.3

```


```
npm run build
cd dist
zip -r ../web-build_0.21.3_gh.zip .
```

```
npm run tauri android build -- --apk


~/Library/Android/sdk/build-tools/35.0.0/apksigner sign \
  --ks my-release-key.jks \
  --out app-release-signed_0.21.3.apk \
  src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
```
