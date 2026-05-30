# Tetorica Retro Player

Retro-style preview player for images, videos, and live screen capture.

The app uses a Pixi.js shader pipeline to push local media through palette reduction, monochrome tints, dithering, scanlines, and CRT-style finishing. The same filter flow works for still images, movie files, and captured windows or screens.

## Demo

- GitHub Pages landing page: `https://kyorohiro.github.io/tetorica-retro-player/`
- Demo app: `https://kyorohiro.github.io/tetorica-retro-player/demo/`

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
