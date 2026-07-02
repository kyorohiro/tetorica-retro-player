# Windows Tauri (WebView2) — HLS 再生は Web Audio をバイパスする

調査日: 2026-06-30 (コード実装日) / 文書化 2026-07-02

## 背景

[`ffmpeg-integration.md`](ffmpeg-integration.md) の「WebView2 での HLS 再生と Web Audio の動作（要確認）」で
未検証としていた項目が実装で確認された。

`docs/issues/wkwebview-hls-webaudio.md` は **macOS Tauri（WKWebView + AVFoundation）** で
HLS 再生が Web Audio をバイパスする問題を扱っているが、
**Windows Tauri（WebView2 + Windows Media Foundation）でも同じ構造の問題が起きる**。

```
HLS (.m3u8) ─► Windows Media Foundation ─► OS Audio Output  (Web Audio を通らない)
```

WebView2 は Chromium ベースだが、HLS のデコードは Chromium の MSE 経由ではなく
Media Foundation にネイティブ委譲される（`ffmpeg-integration.md` の表の「Media Foundation 経由」ケースに該当）。
そのため `createMediaElementSource(media)` を呼んでもオーディオデータが流れてこない。

## 対処: Web Audio を諦めてネイティブ再生にフォールバック

macOS 版（`wkwebview-hls-webaudio.md`）は「現時点では未修正」のままだが、
Windows 版は `useRetroPreviewMedia.ts` で明示的にバイパス処理が実装されている。

```typescript
// src/retro-player/hooks/useRetroPreviewMedia.ts
const isWindowsRuntime = () =>
  typeof navigator !== "undefined" && /Windows/i.test(navigator.userAgent);

const shouldBypassWebAudioForMedia = (media: HTMLMediaElement) =>
  isTauriRuntime() &&
  isWindowsRuntime() &&
  media instanceof HTMLVideoElement &&
  media.src.includes(".m3u8");

const shouldUseNativeVideoSurfaceForMedia = (
  media: HTMLMediaElement,
  preferNativeVideoSurface: boolean,
) =>
  preferNativeVideoSurface &&
  isTauriRuntime() &&
  isWindowsRuntime() &&
  media instanceof HTMLVideoElement &&
  media.src.includes(".m3u8");
```

`shouldBypassWebAudioForMedia` が true のとき:
- `createMediaElementSource` によるノード接続を試みず、`mediaSourceRef.current` を `disconnect()` して破棄する
- `media.muted` / `media.volume` を直接操作してネイティブ音声出力に任せる（Web Audio エフェクトは効かない）

```typescript
if (shouldBypassWebAudioForMedia(media)) {
  mediaSourceRef.current?.disconnect();
  mediaSourceRef.current = null;
} else {
  await connectMediaAudio(media);
}
```

`shouldUseNativeVideoSurfaceForMedia` が true のとき（`preferNativeVideoSurface` 設定と併用）:
- WebGL/Pixi キャンバス経由の描画（`attachVisualPreview`）ではなく `attachNativeVideoPreview` を使う
- CRT フィルター等の映像エフェクトは適用されないが、再生の安定性を優先する

いずれも **`.m3u8`（HLS）かつ Windows Tauri のときのみ**発動する。
MP4 等の直接ファイル URL 再生や、macOS/Linux Tauri、ブラウザ版には影響しない。

## 副作用: HLS 起動時エラーのリトライ

上記バイパスと同じコミットで、HLS 起動直後の一時的なエラーに対するリトライも追加されている。
Windows Media Foundation 経由の HLS はネットワーク・初回セグメント生成待ちで
`src-not-supported` 系のエラーを一時的に返すことがあるため、指数的でない固定間隔でリトライする。

```typescript
const HLS_STARTUP_RETRY_DATASET_KEY = "retroHlsStartupRetry";
const HLS_STARTUP_RETRY_DELAYS_MS = [400, 900, 1600];

const isHlsStartupRetryableError = (
  media: HTMLMediaElement | null | undefined,
  error: unknown,
) => {
  if (!(media instanceof HTMLVideoElement)) return false;
  if (!media.src.includes(".m3u8")) return false;
  if ((media.currentTime ?? 0) > 0.05) return false; // 再生が進んでいたら別の失敗として扱う

  const message = error instanceof Error ? error.message : String(error);
  return /src-not-supported|network|読み込みに失敗|再生開始/i.test(message);
};
```

条件を満たすと `media.pause()` → 指定 ms 待機 → `media.load()` → `playVideoWithAudio()` を再帰的に再試行する
（最大 3 回、`retryAttempt` を `media.dataset` に保存してカウント）。
`isPlaybackAttemptStale()` で「その間に別の再生要求が来た」場合は中断する。

このリトライは `media.src` に `.m3u8` が含まれていれば OS を問わず動く
（Windows 固有ではないが、Windows Media Foundation 経由の HLS で最も顕在化する）。

## まとめ

| プラットフォーム | HLS デコード経路 | Web Audio 経由でエフェクトが効くか | 対処 |
|---|---|---|---|
| macOS Tauri (WKWebView) | AVFoundation | ❌ | 未修正（[wkwebview-hls-webaudio.md](wkwebview-hls-webaudio.md)） |
| Windows Tauri (WebView2) | Windows Media Foundation | ❌ | Web Audio を諦めてネイティブ再生にフォールバック（本ドキュメント） |
| ブラウザ (Chrome/Edge, MSE 経由) | Chromium MSE | ✅ | 対応不要 |
| Linux Tauri | 未検証 | 未検証 | — |

## 関連ファイル

- `src/retro-player/hooks/useRetroPreviewMedia.ts` — `shouldBypassWebAudioForMedia` / `shouldUseNativeVideoSurfaceForMedia` / `isHlsStartupRetryableError`
- [`wkwebview-hls-webaudio.md`](wkwebview-hls-webaudio.md) — macOS 側の同系統の問題（未修正）
- [`wkwebview-hls-loop.md`](wkwebview-hls-loop.md) — HLS の `ended` 検出問題（macOS 中心だが構造は共通）
- [`ffmpeg-integration.md`](ffmpeg-integration.md) — HLS 生成方針、Windows ビルド全般
