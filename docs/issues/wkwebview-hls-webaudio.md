# WKWebView HLS — Web Audio エフェクターが効かない

調査日: 2026-06-30

## 症状

- ffmpeg mode（mDrop HLS ストリーミング）で再生すると音は出るが、Audio Effector が一切効かない
- Lo-Fi / BitCrush / EQ / Reverb 等のノブを動かしても変化なし
- 通常モード（直接ファイル URL）では同じ設定で正常にエフェクトがかかる

## 根本原因

**macOS Tauri は WKWebView を使用しており、HLS 再生は AVFoundation がネイティブで処理する。**
AVFoundation がデコードしたオーディオは OS のオーディオ出力へ直接流れ、Web Audio グラフをバイパスする。

```
HLS (.m3u8) ─► AVFoundation ─► OS Audio Output  (Web Audio を通らない)
                     │
                     └─► createMediaElementSource() が作るノードには何も流れない
```

コード側は正しく `connectMediaAudio()` → `createMediaElementSource(media)` を呼び出している
（[useRetroAudioEngine.ts:503-526](../../src/retro-player/hooks/useRetroAudioEngine.ts)）が、
WKWebView 上で HLS を再生中の `<video>` 要素に対して `createMediaElementSource` を呼んでも
**エラーなく成功するが、ノードには音声データが流れてこない**。

一方、直接ファイル URL（`/download/ID`）では WebKit の通常デコーダが処理するため、
`createMediaElementSource` が正常にオーディオをキャプチャし、エフェクトチェーンが機能する。

```
MP4 (URL) ─► WebKit Decoder ─► createMediaElementSource ─► エフェクトチェーン ─► OS Audio
```

## 副作用：「ffmpeg だと音が出て、それ以外だと出ない」現象

通常モードでは Web Audio 経由になるため、AudioContext が suspend 状態だったり
masterGain が 0 の瞬間があると無音になる。
HLS（ffmpeg）モードでは Web Audio を完全にバイパスして OS へ直接出力するため、
Web Audio の状態に関わらず常に音が出る。

これが「ffmpeg 時だけ音が聞こえる」という過去の症状の原因。

## 現状の対処

**現時点では未修正**。HLS 再生時はエフェクターが機能しないことを既知の制限として扱う。

## ffmpeg が必要になるフォーマット（Safari / iOS WKWebView）

Safari は WebM の再生サポートが弱いため、ffmpeg HLS 経由が必要なフォーマットは広い。

| フォーマット | Chrome | Safari / iOS WKWebView |
|------------|--------|----------------------|
| MP4 (H.264) | ✅ | ✅ |
| MP4 (H.265) | ⚠️ | ✅ (HW依存) |
| WebM (VP8/VP9) | ✅ | ⚠️ Safari 16+ のみ、不安定 |
| WebM (AV1) | ✅ | ❌ |
| MKV / AVI / WMV | ❌ | ❌ |

iOS ユーザーには WebM も含めて HLS 経由になるケースが多く、
エフェクターが効かない影響範囲が広い。

## 将来の対処候補

### A. hls.js の導入

[hls.js](https://github.com/video-dev/hls.js) は JavaScript で HLS をデコードし
Media Source Extensions (MSE) 経由で `<video>` に流す。
MSE 経由では通常の WebKit デコーダーと同じパスになるため、
macOS では `createMediaElementSource` がオーディオをキャプチャできる。

**ただし iOS では機能しない。**
iOS WKWebView の MSE 制限により hls.js はネイティブ HLS フォールバックに切り替わるため、
結局 AVFoundation に渡って同じ問題が発生する。

### B. エフェクト有効時は HLS を使わない

`isAudioFxEnabled` が true のとき、ffmpeg mode でも HLS URL の代わりに
直接ファイル URL (`shared.url`) を使ってストリーミングする。

`App.tsx` で数行の変更で実現できるが、HLS で再生できていたフォーマット
（MKV・AVI 等ブラウザ非対応コーデック）はエフェクト ON 時に再生不可になる。

### C. UI に注記を表示する

ffmpeg mode で再生中に「HLS モード中はエフェクトが使用できません」と表示する。
実装量最小だが UX 的には不完全。

## 関連ファイル

- `src/retro-player/hooks/useRetroAudioEngine.ts` — `connectMediaAudio()` 実装
- `src/retro-player/hooks/useRetroPreviewMedia.ts` — `previewUrl()` での `connectMediaAudio` 呼び出し
- `src-mdrop-core/src/http_stream.rs` — HLS 生成（ffmpeg → `.ts` セグメント）
- `docs/issues/wkwebview-hls-loop.md` — 同系列の WKWebView HLS 問題（終端検出）
- `docs/issues/safari-webaudio.md` — Safari Web Audio の他の既知問題
