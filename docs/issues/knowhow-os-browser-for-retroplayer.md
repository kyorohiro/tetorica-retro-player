# Browser / OS 依存ノウハウ Index

`docs/issues/` に散らばっている「特定ブラウザ・特定 OS でしか起きない」系の調査メモをテーマ別にまとめたインデックス。
後で技術ブログのネタとして整理し直す際の目次として使う。

各エントリは「症状 → 原因 → 対処」の形式で書かれているものが多いので、
ブログ化する際はそのまま「〇〇のハマりどころ」的な記事の骨子に使える。

---

## 1. WebKit / Safari 系（macOS・iOS 共通の癖）

| ドキュメント | 一言 |
|---|---|
| [safari-webaudio.md](safari-webaudio.md) | `window.confirm()` が AudioContext を suspend する／BiquadFilter の Q値が低いと不安定になる等、Safari Web Audio 実装の癖3連発 |
| [browser-audio-background.md](browser-audio-background.md) | バックグラウンド時に Safari だけ `HTMLMediaElement` を native pause する非対称性。`suspend`/`visibilitychange`/`pause` のイベント順序保証がない問題と `window.blur` を使ったrace回避 |
| [preview-layout.md](preview-layout.md) | Safari と Chrome で CSS `aspect-ratio` + `max-height` + `width:100%` の挙動が違う |
| [tauri-wkwebview-playback.md](tauri-wkwebview-playback.md) | Tauri WKWebView の autoplay 制限の緩さ、HLS バッファリング中のUI不整合、drag&drop の横取りなど known issues 集 |
| [wkwebview-hls-loop.md](wkwebview-hls-loop.md) | WKWebView(AVFoundation) の HLS VOD が `ended` を発火しない根本原因と、`currentTime` 監視によるポーリング検出・GateKeeper 初回起動遅延との合わせ技 |
| [wkwebview-hls-webaudio.md](wkwebview-hls-webaudio.md) | macOS Tauri で HLS 再生時に AVFoundation が Web Audio をバイパスし、エフェクターが一切効かなくなる根本原因（**未修正のまま**） |

**ブログ的に一番書きやすそうな塊**: 「Safari/WebKit のバックグラウンド・オーディオまわりの罠」（`browser-audio-background.md` + `safari-webaudio.md` を統合すると一本書ける）。

---

## 2. Windows 系（WebView2 / Chromium の癖）

| ドキュメント | 一言 |
|---|---|
| [windows-angle-shader-compile.md](windows-angle-shader-compile.md) | Windows の ANGLE (D3D backend) で WebGL2 2-pass shader のコンパイルが macOS と異なる挙動をする |
| [windows-chrome-overlay-freeze.md](windows-chrome-overlay-freeze.md) | Chrome拡張の「Overlay current video」機能が Windows Chrome だけ不安定・フリーズする |
| [windows-tauri-vs-edge-playback.md](windows-tauri-vs-edge-playback.md) | 「同じ localhost なのに Tauri内とEdgeで再生の滑らかさが違う」の原因切り分け（実は動かしている frontend 自体が違った） |
| [windows-tauri-hls-webaudio-bypass.md](windows-tauri-hls-webaudio-bypass.md) | Windows Tauri (WebView2) の HLS 再生が Windows Media Foundation にネイティブ委譲され Web Audio をバイパスする（macOSと同じ構造の問題だが**こちらは対処済み**） |

**ブログ的に一番書きやすそうな塊**: 「同じ Chromium でも WebView2 は Edge/Chrome と違う」系（`windows-tauri-vs-edge-playback.md` + `windows-tauri-hls-webaudio-bypass.md`）。

---

## 3. Android / モバイル Tauri

| ドキュメント | 一言 |
|---|---|
| [android-tauri-startup-and-build.md](android-tauri-startup-and-build.md) | Android版で `mdrop`/`ffmpeg` を無効化する必要性、初回再生の立ち上がり不安定への対処 |

---

## 4. Tauri デスクトップ共通の癖（OS問わず）

| ドキュメント | 一言 |
|---|---|
| [tauri-playback-background.md](tauri-playback-background.md) | 他ウィンドウに完全に隠れると `requestAnimationFrame` が止まり再生が停止する／AudioContext の eager init が Chrome Autoplay Policy とぶつかってエラーループする |
| [tauri-native-virtual-devices.md](tauri-native-virtual-devices.md) | Retro加工した音声・映像を Virtual Mic/Camera として他アプリに見せたい場合の実現可能性調査（WebViewが中核だと非現実的、別 native アプリなら現実的） |
| [ffmpeg-integration.md](ffmpeg-integration.md) | macOS GateKeeper vs Windows SmartScreen の初回実行チェック方式の違い、コード署名の要否、HLS生成方針など、ビルド・配布まわりのOS差分集 |

---

## 5. ブラウザ共通の制約

| ドキュメント | 一言 |
|---|---|
| [drm-handling.md](drm-handling.md) | DRM保護された動画サイト（Amazon Prime, Netflix等）でブラウザがオーバーレイ機能をブロックする件 |

---

## 6. 周辺（プラットフォーム差分が絡む設計メモ、参考程度）

| ドキュメント | 一言 |
|---|---|
| [mdrop.md](mdrop.md) | 同一ネットワーク内転送機能の設計。プラットフォーム固有のファイルピッカー制限を HTTP サーバー経由で回避する発想がベース |

---

## メモ: ブログ化する時の切り口候補

- **「HLS × WebView」三部作**: `wkwebview-hls-loop.md` / `wkwebview-hls-webaudio.md` / `windows-tauri-hls-webaudio-bypass.md` を並べると「HLSをWebViewで再生するとOSごとに全然違う挙動になる」という一本のストーリーになる
- **「バックグラウンド再生」まとめ**: `browser-audio-background.md` + `tauri-playback-background.md` で「タブ/ウィンドウが背面に回った時に何が起きるか」網羅
- **「Safari だけ違う」あるある集**: `safari-webaudio.md` + `preview-layout.md` + `browser-audio-background.md` の `isSafariBrowser()` 判定部分
- **「Windows と Chromium は思ったより別物」**: `windows-tauri-vs-edge-playback.md` + `windows-tauri-hls-webaudio-bypass.md` + `windows-angle-shader-compile.md`
