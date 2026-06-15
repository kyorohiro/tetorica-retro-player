# Audio Examples

`examples/audio/` is a small playground for the separated retro audio engine.

## Goals

- Learn how to use `node-web-audio-api` and Web Audio directly
- Refine the separated audio engine and discover useful helpers
- Explore game-oriented audio extensions and effect patterns

## Current Sample

- [node-audio-sample.ts](/Users/kyorohiro/development8/tetorica-retro-player/examples/audio/node-audio-sample.ts)
  - Runs the separated `createRetroAudioEngine(...)` without React
  - Uses a simple `OscillatorNode -> GainNode -> retro audio chain`
  - Applies settings based on the current `Lo-Fi` preset

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
