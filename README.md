# Tetorica Retro Player

Japanese README: [README.ja.md](/Users/kyorohiro/development8/tetorica-retro-player/README.ja.md)  
Release notes and shipping commands: [RELEASE_MEMO.md](/Users/kyorohiro/development8/tetorica-retro-player/RELEASE_MEMO.md)

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

## Reusable Core

The reusable player core lives under `src/retro-player/`.

- `src/retro-player/components/RetroPlayer.tsx`: ready-to-embed retro preview player
- `src/retro-player/audio/TetoricaRetroAudioNode.ts`: reusable retro audio effect chain with a plain TypeScript API
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`: reusable WebGL2 video shader pipeline separated from React
- `src/retro-player/retro/config.ts`: presets and shared filter option definitions
- `src/retro-player/retro/filterShader.ts`: shader source of truth
- `src/retro-player/index.ts`: portable entrypoint for imports from other apps

The main app shell stays outside that folder on purpose. Right now the outer app still owns file picking, dialogs, i18n preference storage, and page-level navigation.

The recent split makes the lower-level media processing easier to reuse outside the current UI:

- `TetoricaRetroAudioNode` holds the retro audio graph as a plain class, so host apps can connect their own `AudioContext`, source nodes, and destinations.
- `TetoricaRetroVideoPipeline` holds shader compile, texture upload, uniform updates, and frame rendering as a plain class, while React hooks stay focused on browser media orchestration and layout.
- The React hooks such as `useRetroAudioEngine`, `useRetroPixiStage`, and `useRetroPreviewMedia` now act as adapters around those reusable cores instead of owning all of the processing logic directly.

If you want to reuse the player in another app, start from:

```ts
import { RetroPlayer } from "./src/retro-player";
```

If the host app already has its own confirm modal, pass it into `confirmDialog` so the player does not need the current app's dialog context.

If you want to reuse only the processing layers instead of the full player UI, look at:

```ts
import { createRetroAudioEngine } from "./src/retro-player/audio/TetoricaRetroAudioNode";
import { TetoricaRetroVideoPipeline } from "./src/retro-player/video/TetoricaRetroVideoPipeline";
```

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

## TODO

- Add a CRT afterimage / persistence effect for moving video and scrolling scenes.
- Expand the audio retro effects with more lo-fi style options around noise, flutter, and wow.

## License

This project is licensed under the MIT License.

Third-party libraries and bundled dependencies remain under their respective licenses.
