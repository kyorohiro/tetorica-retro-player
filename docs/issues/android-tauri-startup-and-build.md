# Android Tauri Startup And Build Notes

## Background

Android 版では desktop 向けの `mdrop` / `ffmpeg` の扱いと、初回再生の立ち上がりがそのままだと不安定だった。

今回の目的は次の 2 点。

- Android build では `mdrop` / `ffmpeg` を無効化する
- Android の最初の File 選択直後だけ起きる、再生の乱れを落ち着かせる

---

## 1. Android では `mdrop` / `ffmpeg` を無効化

### Problem

desktop 前提の経路が Android にも残っていた。

- `mdrop_*` command は invoke 可能なままだった
- `ffmpeg_exec` / `get_ffmpeg_mode` も Android で呼べてしまう状態だった
- UI でも `mDrop` / `ffmpeg` を出していた

Android ではこれらを積極的に使わない方が安全。

### What We Changed

#### Rust side

`src-tauri/src/lib.rs`

- Android では `mdrop_*` commands を実処理しない
- `mdrop_get_server_status` は `running: false` の安全な状態を返す
- そのほかの `mdrop_*` は `disabled on android` として扱う

`src-tauri/src/ffmpeg.rs`

- Android では `ffmpeg_exec()` を拒否
- `get_ffmpeg_mode()` は `"disabled"` を返す

#### Frontend side

`src/App.tsx`

- Android Tauri を検出して `isNativeMdropAvailable` を `false` にする
- Android では `mdrop` 自動確認をしない
- Android では `mdrop` API 同期をしない
- Android では file/folder picker を `mdrop` 経由にしない
- Android では右上の `mDrop` / `ffmpeg` pills を出さない

`src/ffmpeg/index.ts`

- `FfmpegMode` に `"disabled"` を追加
- disabled 時は transcode を失敗扱いで返す

### Current Behavior

- Android: `mdrop` / `ffmpeg` は使わない
- desktop: これまで通りの経路を維持

---

## 2. Android 初回再生だけ倍速っぽく進む + ノイズ

### Symptom

Android で最初の File 選択後だけ、次のような症状が出た。

- 再生開始直後に 30 秒付近まで倍速で進んだように見える
- ノイズが乗る
- そこを過ぎると普通に再生される
- 先に SeekBar で位置合わせしてから再生すると起きにくい
- 次の再生からは起きない

### Likely Cause

初回だけ、再生開始と同時に重い初期化が重なっていた可能性が高い。

関係する経路:

- `src/retro-player/hooks/useRetroPreviewMedia.ts`
- `src/retro-player/hooks/useRetroAudioEngine.ts`
- `src/retro-player/audio/TetoricaRetroAudioNode.ts`

特に初回再生では次が同時に立ち上がる。

- Pixi / renderer 初期化
- WebGL / shader 準備
- `AudioContext` 作成
- audio graph 初期化
- `MediaElementAudioSourceNode` 接続
- autoplay 開始

この重なりで Android WebView の初回 A/V 同期が乱れていたと考えられる。

### Why This Hypothesis Fit The Symptom

- 最初の 1 回だけ起きる
- 2 回目以降は起きない
- Seek 後に落ち着く

つまり「初回初期化が終わった後は安定する」挙動に近い。

### Current Status

ユーザー確認では「改善した」とのこと。

今回の方向性としては、

- Android では desktop 用の重い補助経路を避ける
- 初回再生時の初期化競合を減らす

の組み合わせが有効だったと見てよい。

---

## Related Files

- `src/App.tsx`
- `src/ffmpeg/index.ts`
- `src-tauri/src/lib.rs`
- `src-tauri/src/ffmpeg.rs`
- `src/retro-player/hooks/useRetroPreviewMedia.ts`
- `src/retro-player/hooks/useRetroAudioEngine.ts`
- `src/retro-player/audio/TetoricaRetroAudioNode.ts`
- `RELEASE_MEMO.md`

---

## Suggested Future Direction

Android では desktop と同じ機能を無理に揃えるより、

1. build 時点で不要機能を切る
2. 初回再生時の初期化を前倒しまたは分散する
3. 問題が落ち着いている間は過剰に再設計しない

という方が安全。
