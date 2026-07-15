# Windows ANGLE Shader Compile Issues

## Background

`RetroPlayer` の filter は `WebGL2` の 2-pass shader で動いている。

- `pass1`: palette / dither / toon / edge / glow
- `pass2`: CRT / scanline / phosphor / tone compression

もともとは 1 本の大きい shader だったが、compile 負荷を下げるために `pass1` / `pass2` に分割した。

しかし Windows の Chrome / Edge では、`ANGLE` 経由の shader compile / link まわりでブラウザー全体がフリーズすることがあった。

---

## Observed Problems

### 1. `WEBGL_parallel_shader_compile` poll 中に終わらない

- `COMPLETION_STATUS_KHR` が長時間 `false` のままになるケースがあった
- `poll#7000` のように無限待ちに近い状態になった

### 2. poll を止めても browser freeze する

- timeout 後の `LINK_STATUS` / `getProgramInfoLog` だけでなく
- `submitProgram()` 内の `linkProgram()` に入る時点でも freeze するケースがあった

### 3. full shader を自動 compile しないと Windows では何も起きない

- 最初は安全のため Windows で filter compile を止めた
- その結果、Windows では passthrough 表示だけになった

---

## What We Changed

### 1. Windows Chromium だけ別経路にした

`src/retro-player/video/TetoricaRetroVideoPipeline.ts`

- `isWindowsChromiumAngleRisk()` で Windows + Chromium 系を検出
- その環境だけ full shader 自動 compile を避ける
- `?forceRetroFilterCompile=1` を付けたときだけ従来経路を明示的に試せる

### 2. Windows 用の軽量 shader を追加した

追加ファイル:

- `src/retro-player/retro/filterPass1LiteShader.ts`
- `src/retro-player/retro/filterPass2LiteShader.ts`
- `src/retro-player/retro/filterPass1Pc98LiteShader.ts`
- `src/retro-player/retro/filterPass2PhosphorLiteShader.ts`

目的:

- full shader ではなく、機能を絞った variant だけを compile する
- Windows でも「何も起きない」ではなく最低限の filter を出す
- compile 対象から、同時に使わない重い機能群を外す

### 3. Windows lite variant 切り替えを追加した

`TetoricaRetroVideoPipeline` で filter state を見て、Windows では必要な variant だけ選ぶようにした。

現状の variant:

- `basic:basic`
- `pc98:basic`
- `basic:phosphor`
- `pc98:phosphor`

判定内容:

- `pc98`, `pc98_tile`, `pc98_512`, `pc98_512_sat`, `pc98_4096` は `pc98` pass1 に寄せる
- `phosphor`, `spotMask`, `phosphorDot` 系が必要なときは `phosphor` pass2 に寄せる

---

## Current Behavior

### macOS

- 従来の full shader (`FILTER_FRAGMENT_PASS1` / `FILTER_FRAGMENT_PASS2`) を使う
- 見た目はこれまでとほぼ同じ

### Windows Chromium

- full shader 自動 compile は使わない
- 軽量 variant を使う
- browser freeze はかなり起きにくくなった

---

## Differences Between Full and Lite

### lite で残しているもの

- smoothing
- dither
- toon shading
- 簡易 edge
- 簡易 quantization
- 簡易 scanline
- 簡易 vignette
- 簡易 phosphor / spot mask

### lite でまだ省いている / 簡略化しているもの

- 本格 `color32` / `color64` の個別ロジック
- full `pc98` 系の厳密な色選択 / tile 近似
- full `neon`
- full `phosphor dot`
- luma / saturation tone compression
- close-up noise
- horizontal unevenness
- chromatic aberration の細かい処理

---

## Important Design Direction

今回のポイントは「重い機能を一気に compile しない」こと。

特に以下は同時に全部必要ではない:

- `pc98`
- `pc98_tile`
- `pc98_512`
- `pc98_512_sat`
- `pc98_4096`
- `color32`
- `color64`
- `phosphor`

なので今後も、

- palette 系は pass1 variant で分ける
- phosphor 系は pass2 variant で分ける

という方向で増やすのが安全。

---

## Suggested Next Steps

優先順はこのあたりが現実的:

1. `color32` / `color64` を Windows `basic` から個別 variant に寄せる
2. `pc98 family` の軽量版をもう少し full に近づける
3. `phosphor` / `spotMask` / `phosphorDot` を必要な範囲だけ個別強化する

full shader を Windows で無理に自動 compile へ戻すより、lite variant を段階的に育てる方が安全。

pass1 の詳細な機能差分（Glow / neon / edge boost / PC98 の式レベルの違いなど）は
[`windows-lite-shader-parity.md`](windows-lite-shader-parity.md) に棚卸し済み。
