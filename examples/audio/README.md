# Audio Examples

`examples/audio/` is a small playground for the separated retro audio engine.

## Goals

- Learn how to use `node-web-audio-api` and Web Audio directly
- Refine the separated audio engine and discover useful helpers
- Explore game-oriented audio extensions and effect patterns

## Current Sample

- [node-audio-sample.ts](/Users/kyorohiro/development8/tetorica-retro-player/examples/audio/node-audio-sample.ts)
  - Runs the separated `createTetoricaRetroAudioNode(...)` without React
  - Uses a simple `OscillatorNode -> GainNode -> TetoricaRetroAudioNode -> destination`
  - Applies a `lofiTape` preset and then tweaks a few params with `setParams(..., true)`

## Run

From [examples/package.json](/Users/kyorohiro/development8/tetorica-retro-player/examples/package.json):

```bash
cd examples
npm install
npm run audio:node
```

Silent verification mode:

```bash
npm run audio:node:silent
```

## Notes

- `audio:node` is for actual speaker output testing.
- `audio:node:silent` is for engine boot / flow verification without audio output.
- In the current Node sample, AudioWorklet-based behavior may differ from the browser path.
- The examples currently import source files directly by relative path on purpose, because the interface is still evolving.
- `createTetoricaRetroAudioNode(...)` does not auto-connect to `context.destination`; the caller connects the output explicitly.
- `createTetoricaRetroAudioNode(...)` accepts plain params and presets; React-style `{ current: ... }` refs stay internal.

## Directions

- Basic Web Audio samples
  - oscillator
  - filter
  - buffer source
- Retro engine samples
  - preset switching
  - helper APIs
  - source-node variations
- Game-oriented samples
  - BGM state changes
  - SFX bus processing
  - situation-based effect transitions

## Video Direction

- [../video/playwright-webgl2-sample.ts](/Users/kyorohiro/development8/tetorica-retro-player/examples/video/playwright-webgl2-sample.ts)
  - Preferred browser-faithful sample for the current WebGL2 pipeline
  - Starts the repo's Vite dev server, opens a dedicated sample page in headless Chromium, and saves a screenshot
  - Uses the same `TetoricaRetroVideoPipeline` source that the app uses
  - Requires Playwright:

```bash
cd examples
npm install -D playwright
npx playwright install chromium
npm run video:webgl2:test
```

Generated files:

- `examples/video/artifacts/playwright-webgl2-sample.png`
- `examples/video/artifacts/playwright-webgl2-sample.json`

Future direction:

- `ffmpeg` can come later when you want:
  - decode real video frames into RGBA
  - encode rendered output back into mp4 or gif
  - compare before/after filter results in a batch flow
