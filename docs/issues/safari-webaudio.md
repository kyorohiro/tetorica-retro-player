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

## 教訓

- Safari は Web Audio の仕様に忠実。Chrome で動いてもSafariで荒れることがある
- エフェクトは「足す」より「引く」設計の方がクロスブラウザ安定性が高い
- Q値は 0.5 以上を最低ラインとする
- ブロッキングダイアログ（`window.confirm`）は Web Audio と組み合わせない
