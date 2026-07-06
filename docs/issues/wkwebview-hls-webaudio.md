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

**macOS では現時点では未修正**。HLS 再生時はエフェクターが機能しないことを既知の制限として扱う。

**Windows Tauri (WebView2) では同じ構造の問題が Windows Media Foundation 経由で起きるが、
こちらは対処済み**。Web Audio 接続を諦めてネイティブ再生にフォールバックする実装が入っている。
詳細は [`windows-tauri-hls-webaudio-bypass.md`](windows-tauri-hls-webaudio-bypass.md) 参照。
macOS 側でも同様の bypass 方針を採用する余地がある。

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

### A. hls.js の導入 — 試したが macOS でも解決しなかった (追記 2026-07-06)

[hls.js](https://github.com/video-dev/hls.js) は JavaScript で HLS をデコードし
Media Source Extensions (MSE) 経由で `<video>` に流す。
MSE 経由では通常の WebKit デコーダーと同じパスになるため、
macOS では `createMediaElementSource` がオーディオをキャプチャできる **はず**、
という予測でこのセクションは書かれていたが、実際に導入して macOS Tauri
(WKWebView) 上で検証したところ **同じ症状が再現した**。

`RetroMediaSource.ts` の `attachHlsSource()` で `.m3u8` を hls.js/MSE 経由に
切り替え（`createVideoMediaSource` 内、`isHlsUrl(url)` で判定）、その上で
`connectMediaAudio()` 側を3通り試したが、いずれもネイティブ音声の抑制に失敗した:

1. `media.volume = 0`（`media.muted = false` のまま）— 生音がそのまま鳴り続けた
2. `media.muted = true` に変更 — それでも生音が鳴り続けた（`.muted`/`.volume` どちらも無視される）
3. `video.captureStream()` で `MediaStream` を取り出し `createMediaStreamSource` 経由にする
   （`srcObject` が `MediaStream` のケース、Tone.js 等で実績のある経路）— そもそも
   `captureStream()` が音声トラックを含まない `MediaStream` を返した
   (`capturedAudioTrackCount: 0`)

`connectMediaAudio:connected` 自体はエラーなく成功する
（`audioContextState: "running"`）ため、JS レベルでは「正常に接続できている」ように
見えるが、実際にはネイティブ出力側の音声パスが `.muted`/`.volume` と無関係に
生き続けている。MSE 経由でも AVFoundation 側が音声デコードだけ独自パスに
乗せている可能性が高く、**MSE への切り替えだけでは macOS の Web Audio バイパス
問題は解決しない**ことが実験で確認された。

（hls.js への切り替え自体は別の問題 —
[`wkwebview-hls-loop.md`](wkwebview-hls-loop.md) の終端検出・ループ問題 — の
根本修正としては有効だったため、コードには残している。エフェクトが効かない問題と
ループ問題は別々の症状で、前者は未解決・後者は hls.js 導入で解決、という状態。）

**ただし iOS では hls.js 自体が機能しない。**
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

- `src/retro-player/hooks/useRetroAudioEngine.ts` — `connectMediaAudio()` 実装（`isHlsManaged` / `captureStream` 分岐を追加済み、いずれも未解決）
- `src/retro-player/hooks/useRetroPreviewMedia.ts` — `previewUrl()` での `connectMediaAudio` 呼び出し
- `src/retro-player/media/RetroMediaSource.ts` — hls.js 導入箇所（`attachHlsSource` / `getHlsInstance` / `isHlsUrl`）
- `src-mdrop-core/src/http_stream.rs` — HLS 生成（ffmpeg → `.ts` セグメント、`-hls_playlist_type event` 追加済み）
- `docs/issues/wkwebview-hls-loop.md` — 同系列の WKWebView HLS 問題（終端検出、hls.js 導入で解決済み）
- `docs/issues/safari-webaudio.md` — Safari Web Audio の他の既知問題
