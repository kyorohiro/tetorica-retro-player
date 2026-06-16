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

## Reusable Core

The reusable player core lives under `src/retro-player/`.

- `src/retro-player/components/RetroPlayer.tsx`: ready-to-embed retro preview player
- `src/retro-player/audio/TetoricaRetroAudioNode.ts`: reusable retro audio effect chain with a plain TypeScript API
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`: reusable WebGL2 video shader pipeline 
- `src/retro-player/retro/filterShader.ts`: shader source of truth


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



## License

This project is licensed under the MIT License.

Third-party libraries and bundled dependencies remain under their respective licenses.
