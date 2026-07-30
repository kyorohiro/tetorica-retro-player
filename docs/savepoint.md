# Savepoint

最終更新: 2026-07-28

## いまの到達点

- `main` に戻したあと、CRT / NES / Composite 周りの調整を継続中。
- 基本方針として、`LCD` 系を普段使いの基準ライン、`CRT` 系を高性能PC向けの演出ラインとして考える。
- `CRT Beam` は「CRTっぽさ優先」で、初回 compile/link が長い前提の preset として扱う方針。
- `phosphorDot` は文字優先、`phosphorDotSmooth` はモアレ対策寄り、という使い分けにした。
- `colored glow` は入っており、明るくしても色が飛びにくくなっている。
- `Composite / NTSC` の最小実装を pass1 に追加済み。
  - 新しい pass は増やしていない。
  - Windows Chrome ANGLE の compile 負荷を増やしにくい実装を優先している。
- 効果は出るようになったが、まだ「変化が強く分かる」ほどではない可能性がある。

## 直近で触った主なファイル

- `src/retro-player/retro/filterPass1LiteShader.ts`
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
- `src/retro-player/hooks/useRetroFilterState.ts`
- `src/retro-player/hooks/persistedRetroSettings.ts`
- `src/retro-player/hooks/presetFile.ts`
- `src/retro-player/retro/config.ts`
- `src/retro-player/components/RetroFilterPanel.tsx`
- `src/retro-player/components/RetroControlPanel.tsx`

## Composite / NTSC の現状

### 追加した UI / state

- `Composite / NTSC` セクションを追加
- 設定項目:
  - `compositeEnabled`
  - `compositeAmount`
  - `compositeChromaBlur`
  - `compositeChromaDelay`
  - `compositeNoise`

### 実装の置き場所

- 実処理は `filterPass1LiteShader.ts` の pass1 内。
- `RGB -> YIQっぽい表現 -> 横方向のクロマぼかし / 遅延 / ノイズ -> RGBへ戻す`
  という軽量近似。
- 新しい shader variant や独立 pass は追加していない。

### いまの見立て

- 変化は起きる。
- ただし、ユーザー視点では「そんなに変化が見えない」可能性がある。
- 次に詰めるなら:
  - chroma blur の効きをさらに分かりやすくする
  - phase jitter / dot crawl 系を足す
  - ただし ANGLE compile 時間の悪化には注意

## CRT / phosphor 周りの整理

- `LCD / Edge / Native`:
  - 普段使い向け
  - 低負荷・可読性優先
- `phosphorDot`:
  - 文字の読みやすさ優先
  - CRTっぽさは残るが、モアレは出やすい
- `phosphorDotSmooth`:
  - 低周波化や平滑化寄り
  - モアレは減るが、文字や輪郭が柔らかくなりやすい
- `CRT Beam`:
  - CRTっぽさ優先
  - compile/link や pass の重さを許容する高性能PC向け
- `colored glow`:
  - on/off 比較できるようにしてある
  - glow を強めても色味が抜けにくいので使いやすい

## NES / Safari / Native の整理

- `jsnes` は将来的にはサポート継続対象。
- Safari ブラウザでは、`captureStream` 経由や video loop 系で重くなりやすかった。
- `Native` 表示は軽くしやすいが、Audio の扱いは構成差分に注意。
- `docs/issues` 側に Safari や NES direct canvas + auxAudioStream の注意点を残している流れだった。

## いま困っていること

- `Composite / NTSC` の見た目変化がまだ弱い。
- CRTらしさを上げると、ノートPCサイズでは文字が潰れやすい。
- 文字を優先すると CRTっぽさが薄くなる。
- `CRT Beam` は質感は面白いが、Windows ANGLE compile/link が重い。

## 次回の再開ポイント

次に再開する人は、まず以下を見る:

1. `src/retro-player/retro/filterPass1LiteShader.ts`
2. `src/retro-player/components/RetroFilterPanel.tsx`
3. `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
4. `src/retro-player/hooks/useRetroFilterState.ts`

## 次にやる候補

### A. Composite / NTSC を見た目でもっと分かりやすくする

- `compositeAmount` を上げたときの色にじみを強める
- 横方向だけでなく、位相ずれっぽい揺れを少量足す
- 可能なら `dot crawl` っぽい見え方を追加する

### B. preset / default の整理

- `LCD` 系をデフォルトの基準として育てる
- `Composite / NTSC` はデフォルト off のまま維持
- `CRT Beam` はデフォルトで使わない前提
- `phosphorDot` / `phosphorDotSmooth` の役割を preset 名か説明文でも分かるようにする

### C. Windows 実機確認

- Chrome + ANGLE で compile/link の体感を確認
- `Composite / NTSC` を有効にしても compile の悪化がほぼ無いか確認

## 動作確認の目安

- `Composite / NTSC`
  - `Composite amount`: 0.8 前後
  - `Chroma blur`: 0.7 前後
  - `Chroma delay`: `0.4` / `-0.4`
  - `Composite noise`: 0.2 前後
- 比較対象:
  - 輪郭の色にじみ
  - 白地の色ずれ
  - 細線の滲み方
  - テキスト可読性

## 注意

- 作業ツリーは dirty の可能性が高い。ユーザーの未コミット変更や release 物が混ざっているので、むやみに戻さない。
- `CRT Beam` や shader 周りは、見た目だけでなく Windows の compile/link 時間も副作用として確認する。
- `Composite / NTSC` はまだ「雰囲気づけの軽量近似」であり、komm64-san のような信号経路モデルそのものではない。
