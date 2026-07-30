# Savepoint

Last updated: 2026-07-30

## For You

- 今の主目的は、Windows での Retro shader compile 待ち時間を減らしつつ、挙動差を追いやすくすることです。
- `CRT Beam` は試験的に専用 variant を入れてあります。
- `More settings` の `Render cap` の下に `DevOption: shader ID` を追加しました。
- `DevOption: shader ID`
  - Default は `Off`
  - `On` にすると compile 確認用に shader 識別子を毎回変えます
  - 目的は Chrome / GPU の shader compile 再利用の影響を見えやすくすることです
- いま確認したいこと
  - Windows で `CRT Beam` を初回適用した時の compile 時間
  - `DevOption: shader ID = Off` と `On` で差が出るか
  - `CRT Beam` 専用 variant が体感上軽くなるか

## For Codex

### Current Goal

- Reduce Windows shader compile stalls, especially around Lite/Full transitions and `CRT Beam`.
- Keep UX and debugging behavior predictable across environments.

### What Was Implemented

- Added a shared shader composer for nearest-only pass1 variants.
  - `src/retro-player/retro/filterShaderComposer.ts`
  - `filterPass1LiteNearestShader.ts`
  - `filterPass1Pc98LiteNearestShader.ts`
- Added lighter Windows Lite pass1 variants for nearest/basic and nearest/pc98.
- Added an experimental dedicated Windows Lite `CRT Beam` pass2 variant.
  - `src/retro-player/retro/filterPass2BeamLiteCrtShader.ts`
  - Variant key: `basic_nearest:beam_crt`
  - Selected when `selectedPreset === "crtBeam"`
- Added compile timing debug log in Windows Lite variant compilation.
  - Log format:
    - `filter: Windows lite variant <variant> compiled in <ms>ms`
- Added a new DevOption to help debug browser/GPU shader compile cache reuse.
  - UI label: `DevOption: shader ID`
  - Default: `Off`
  - Persisted in UI settings as `shaderCompileCacheBusterEnabled`
  - When enabled:
    - Windows Lite shader variant cache is bypassed
    - fragment shader source gets a unique trailing comment each compile
    - prewarm is skipped
    - `hasPreparedFilterStateVariant()` returns `false`

### Files Touched Recently

- `src/retro-player/components/RetroPlayer.tsx`
- `src/retro-player/components/RetroPreviewView.tsx`
- `src/retro-player/components/RetroPreviewToolbar.tsx`
- `src/retro-player/hooks/persistedRetroSettings.ts`
- `src/retro-player/hooks/usePixiVideoPlayer.ts`
- `src/retro-player/hooks/useRetroPixiStage.ts`
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
- `src/retro-player/retro/filterPass2BeamLiteCrtShader.ts`
- `src/retro-player/retro/filterShaderComposer.ts`

### Validation Status

- `npm test` passed
- `npm run build:web` passed

### Important Behavior Notes

- This DevOption does not truly clear Chrome/GPU internal shader caches.
- It only makes reuse less likely by changing shader source identifiers and by bypassing the app-side variant cache.
- Good enough for comparative debugging, not a guaranteed full cold compile.

### Likely Next Steps

1. Measure Windows compile time for `CRT Beam` with:
   - `DevOption: shader ID = Off`
   - `DevOption: shader ID = On`
2. Decide whether `CRT Beam NTSC` should get a similar dedicated variant.
3. If the experiment helps, move further toward:
   - preset-aware shader builders
   - feature-based compose instead of per-preset duplication

### Known Open Area

- Manual parameter changes such as sampling/palette changes may still not all route through the same prepare dialog path as presets.
- If that becomes the next priority, inspect:
  - `src/retro-player/components/RetroPlayer.tsx`
  - `src/retro-player/components/RetroControlPanel.tsx`
  - `src/retro-player/components/RetroFilterPanel.tsx`
