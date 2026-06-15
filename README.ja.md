# Tetorica Retro Player

日本語版 README です。英語版は [README.md](/Users/kyorohiro/development8/tetorica-retro-player/README.md) を参照してください。

ローカル画像、動画、ライブ画面キャプチャをレトロ風にプレビューするプレイヤーです。

- GitHub Pages:
  [https://kyorohiro.github.io/tetorica-retro-player/](https://kyorohiro.github.io/tetorica-retro-player/)
- Demo:
  [https://kyorohiro.github.io/tetorica-retro-player/demo/](https://kyorohiro.github.io/tetorica-retro-player/demo/)
- Chrome Web Store:
  [https://chromewebstore.google.com/detail/tetorica-retro-player/clnpmlgahomdkphcpcajbemodneoecna](https://chromewebstore.google.com/detail/tetorica-retro-player/clnpmlgahomdkphcpcajbemodneoecna)

## 概要

Pixi.js の shader pipeline を使って、画像・動画・キャプチャ映像に対して減色、モノクロ tint、ディザ、scanline、CRT 風の仕上げを適用します。

## Reusable Core

再利用しやすい core は `src/retro-player/` 配下にまとまっています。

- `src/retro-player/components/RetroPlayer.tsx`
  - 埋め込みやすい完成済みプレイヤー UI
- `src/retro-player/audio/TetoricaRetroAudioNode.ts`
  - React から分離した retro audio effect chain
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - React から分離した WebGL2 video shader pipeline
- `src/retro-player/retro/config.ts`
  - preset と共通 filter 定義
- `src/retro-player/retro/filterShader.ts`
  - shader source の正本
- `src/retro-player/index.ts`
  - 他アプリから取り込むための entrypoint

今回の分離で、media processing の下層は UI からかなり切り離されました。

- `TetoricaRetroAudioNode` は plain class として audio graph を持ち、ホスト側の `AudioContext` や source/destination に接続できます。
- `TetoricaRetroVideoPipeline` は shader compile、texture upload、uniform 更新、frame render を plain class として持ちます。
- `useRetroAudioEngine`、`useRetroPixiStage`、`useRetroPreviewMedia` は、それぞれ browser / React 側の adapter と orchestration に寄っています。

プレイヤー UI ごと使いたい場合:

```ts
import { RetroPlayer } from "./src/retro-player";
```

processing layer だけ再利用したい場合:

```ts
import { createRetroAudioEngine } from "./src/retro-player/audio/TetoricaRetroAudioNode";
import { TetoricaRetroVideoPipeline } from "./src/retro-player/video/TetoricaRetroVideoPipeline";
```

## 開発

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## 補足

- 画面キャプチャの可否はブラウザ対応と permission prompt に依存します。
- 公開 demo は desktop の Chromium 系ブラウザで試すのが安定です。

## 関連

- release 手順メモ: [RELEASE_MEMO.md](/Users/kyorohiro/development8/tetorica-retro-player/RELEASE_MEMO.md)
