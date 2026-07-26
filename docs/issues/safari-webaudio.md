# Safari Web Audio Issues

調査日: 2026-06-17

## 問題1: 録音停止後に音が出なくなる

### 原因
`window.confirm()` はJSスレッドをブロックするネイティブダイアログであり、表示中にSafariがAudioContextをsuspendする。
ダイアログを閉じた後、Safariはそのクリックをウェブページのユーザージェスチャーとして認識しないため `audioContext.resume()` が効かない。
Chromeはこの制限がゆるく、同じコードでも問題が出ない。

### 対応
`window.confirm()` の代わりに React 製の非ブロッキングダイアログ（`useDialog` の `showConfirmDialog`）を使用。
JSスレッドをブロックしないためAudioContextがsuspendされない。

該当箇所:
- `src/retro-player/components/RetroPlayer.tsx` — `defaultConfirmDialog` を `useDialog().showConfirmDialog` に変更
- `src/retro-player/components/RetroPreviewView.tsx` — 録音停止後のダイアログ呼び出し

---

## 問題2: エフェクト複数重ねで音が荒れる

### 原因
SafariのWeb Audio実装はChromeより仕様に忠実な分、複数エフェクトノードを直列に並べると:
- 各ノードの処理タイミングのズレ
- 浮動小数点誤差の蓄積
- `wowFlutter`（ピッチ変動）+ `bitCrush` 等の組み合わせでノイズが増幅

### 対応
Lo-Fi プリセットを `lofiAmount` + `bitCrush` + `sampleRateReduction` + `midAmount` のみに絞り、他のエフェクトをゼロに。
これをデフォルト設定（`DEFAULT_AUDIO_SETTINGS`）にも採用。

---

## 問題3: peaking フィルターの Q 値が低すぎると不安定

### 原因
mid EQの `peaking` フィルターに Q=0.35 を設定したところ、Safariで低音が割れ・中音が異常にブーストされた。
SafariのBiquadFilter実装はQ < 0.5 の peaking フィルターが不安定になりやすい。

### 対応
`midEq.Q.value` を `0.35 → 0.5` に変更。0.5以上であれば主要ブラウザ間で安定して動作する。

---

## 問題4: `captureStream()` + hidden media 経由の NES 再生が極端に重くなる

### 症状
`jsnes` の描画結果を

1. `canvas.captureStream(60)` で `MediaStream` 化
2. `previewVideoStream()` で `Retro Player` に渡す
3. hidden `<video>` / media state 監視 / layout 更新を通す

という構成にすると、Safari で特に重くなりやすかった。

見え方としては:

- `Touch & Play` 後に極端に重くなる
- 音が二重に聞こえる / ノイズっぽく聞こえる
- `Native` でも期待ほど軽くならない

ただし根本は Safari 固有バグだけではなく、
`captureStream() -> hidden media -> player state 管理`
を映像・音声まとめて通す構造自体にも負荷要因があった。
Safari ではその問題が特に顕著に表面化した、という整理が近い。

### 原因

- `jsnes` 自体が 60fps で canvas を更新する
- その canvas をさらに `captureStream()` で video track 化する
- Retro Player 側で hidden media として扱うことで
  `waiting` / `playing` / `timeupdate` / layout refresh などの経路が増える
- Safari / WebKit はこの経路のコストが Chrome より目立ちやすい

### 対応

映像と音声を分離した。

- 映像: `jsnes canvas` をそのまま Retro Player の visual source に渡す
- 音声: audio-only `MediaStream` を別で Web Audio / Retro Audio FX へ渡す

これにより、

- hidden `<video>` に依存しない
- `captureStream()` の映像経路を外せる
- Video Filter は維持できる
- Audio Effect も別経路で戻せる

### 教訓

- Safari でだけ重い時でも、まず「Safari 専用バグ」と決め打ちしない
- `captureStream()` を映像・音声まとめて既存 player pipeline に押し込むと、
  browser 間差分が大きくなりやすい
- emulator 系 source は
  `video source` と `audio source` を最初から分けて扱う方が安定する

関連ファイル:

- `src/retro-player-client/builtin-content/nes-session.ts`
- `src/retro-player-client/RetroPlayerClient.tsx`
- `src/retro-player/hooks/usePixiVideoPlayer.ts`
- `src/retro-player/hooks/useRetroAudioEngine.ts`

---

## 教訓

- Safari は Web Audio の仕様に忠実。Chrome で動いてもSafariで荒れることがある
- エフェクトは「足す」より「引く」設計の方がクロスブラウザ安定性が高い
- Q値は 0.5 以上を最低ラインとする
- ブロッキングダイアログ（`window.confirm`）は Web Audio と組み合わせない
- Safari で顕著化したとしても、原因は `captureStream()` や hidden media を含む構造側にあることがある
