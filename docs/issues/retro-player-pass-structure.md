# Retro Player Pass Structure

Last updated: 2026-08-12

## Overview

`TetoricaRetroVideoPipeline.ts` は、いまは「巨大 1 shader」ではなく、
小さめの pass をつないで描く構成になっている。

Windows Chrome / ANGLE では、

- pass 数が少ないこと

よりも

- 1 本の shader が巨大すぎないこと
- compile / link 単位が分かれていること

の方が重要だった。

そのため現在は、beam / phosphor / composite / wide glow を
個別 pass に分ける方向で整理している。

---

## Base Flow

すべての mode は基本的に次の骨格を持つ。

1. `pass1`
2. 必要なら中間 pass
3. `pass2`
4. 必要なら `postCurvature`
5. 必要なら `wideGlow composite`

---

## Where Pre-filter Downscale And Sampling Happen

この 2 つは名前が似ているが、役割は別。

### Pre-filter Downscale

`Pre-filter downscale` は、

- beam / phosphor / heavy filter の前に
- 入力 texture をいったん小さくして
- その小さい texture を後段 shader の source に使う

処理。

いまは主に `beamDownscale` pass で行っている。

ポイント:

- `uSamplingMode` ではない
- texture sampling filter の `LINEAR` 縮小を使う
- 目的は
  - moire を減らす
  - 後段 shader の入力サイズを抑える
  - beam の発光体数を表示密度に合わせる

実装上の位置:

- `TetoricaRetroVideoPipeline.ts`
  - `canUsePreFilterDownscale`
  - `beamDownscaleProgram`
  - `beamSourceTexture`

流れ:

1. `pass1OutputTexture`
2. `beamDownscale`
3. `beamSourceTexture`
4. beam / phosphor の後段で使用

### Sampling

`Sampling` は、

- 各 shader の中で
- 「source cell をどう読むか」

を決める設定。

`nearest` / `average_fast_4` / `average_fast_8` は
`uSamplingMode` uniform として渡している。

意味:

- `nearest`
  - 1 点をそのまま読む
- `average_fast_4`
  - セル内 4 点平均
- `average_fast_8`
  - セル内 8 点平均

つまり `Sampling` は、

- 最後の canvas 拡大方法

ではなく

- shader が source を読む方法

を変えている。

### Important Difference

- `Pre-filter downscale`
  - pass 間で texture 自体を小さく作り直す
  - 物理的な中間 FBO サイズ変更
- `Sampling`
  - 同じ texture を shader の中でどう読むか
  - `nearest` か平均化かの違い

---

### Base Pass 1

入力:

- source texture

出力:

- `fboTexture`

主な役割:

- palette / reduced color
- dither
- sampling (`uSamplingMode`)
- smooth
- horizontal sharpness
- RGB convergence
- toon / edge boost
- mono / neon 系の下処理

### Base Pass 2

入力:

- `fboTexture`
  - または mode ごとの中間 texture

出力:

- screen
  - あるいは `postCurvatureFbo`

主な役割:

- scanline
- vignette
- basic color controls
- reflective LCD base
- light dependent tint
- final `screenFaceGlow`
- output brightness

---

## Actual Current Pass Layout

### 1. Filter Off

実質 `1 pass`

- source -> screen

### 2. Normal Retro

実質 `2 pass`

1. `pass1`
   - source -> `fboTexture`
2. `pass2`
   - `fboTexture` -> screen

使用 shader:

- `filterPass1Lite*.ts`
- `filterPass2LiteShader.ts`

### 3. Composite / NTSC

実質 `4 pass`

1. `pass1`
   - source -> `fboTexture`
2. `compositePrep`
   - `fboTexture` -> `compositeMidTexture`
3. `compositeMid`
   - `compositeMidTexture` -> `compositeApplyTexture`
4. `pass2`
   - `compositeApplyTexture` -> screen

役割:

- composite / NTSC 系を `pass2` から分離
- compile / link を小さくする
- `compositePrep` 側で sampling (`uSamplingMode`) を使用

関連 shader:

- `filterPassCompositePrepShader.ts`
- `filterPassCompositeApplyShader.ts`

### 4. Phosphor Dot

実質 `3 pass`

1. `pass1`
   - source -> `fboTexture`
2. 必要なら `compositePrep -> compositeMid`
   - composite 有効時のみ
3. `phosphorCore`
   - `pass2PrimaryTexture` -> `phosphorCoreTexture`
4. `pass2`
   - `phosphorCoreTexture` -> screen

役割分担:

- `phosphorCore`
  - phosphor dot
  - spot mask
  - bulb radius
  - black floor
  - phosphor cell の見た目
- `pass2`
  - scanline
  - vignette
  - color finish
  - final `screenFaceGlow`

sampling の位置:

- `pass1` で使用
- composite 有効なら `compositePrep` でも使用
- phosphor 自体は `phosphorCore` へ入る前の source に依存する

関連 shader:

- `filterPass2PhosphorLiteCoreShader.ts`
- `filterPass2BeamLiteCrtPostShader.ts`
  - phosphor の post 用にも流用している

### 5. CRT Beam

現在は `beam_simple / beam_full / beam_crt` を分けず、
Windows lite variant 上は `beam` 1 系統に寄せている。

実質 `5 pass`

1. `pass1`
   - source -> `fboTexture`
2. 必要なら `compositePrep -> compositeMid`
   - composite 有効時のみ
3. `beamDownscale`
   - `pass1OutputTexture` -> `beamSourceTexture`
4. `beamKernel`
   - `beamSourceTexture` -> `beamKernelTexture`
5. `beamStripe`
   - `beamKernelTexture` -> `beamStripeTexture`
6. `beamCompose`
   - `pass1OutputTexture + beamStripeTexture` -> `beamComposeTexture`
7. `pass2`
   - `beamComposeTexture` -> screen

備考:

- `beamSourceTexture` は元 source ではなく、
  `pass1` 後の texture から作る
- これにより mono / palette / reduced color の結果が
  beam の発光体へ自然に入る

役割分担:

#### `beamDownscale`

- beam 用 source を target 相当に縮小
- moire を減らす前段
- `Pre-filter downscale` の本体
- `uSamplingMode` ではなく `LINEAR` 縮小

#### `beamKernel`

- beam 本体の発光分布
- flare / leak / halo / aura
- smooth / RGB convergence / sharpness を含む beam 入力処理
- sampling (`uSamplingMode`) を使って beam の source cell を読む

#### `beamStripe`

- RGB stripe mask
- stripe bleed
- white bloom / warm bloom の一部
- modern / legacy stripe モード切り替え

#### `beamCompose`

- `pass1` の source detail を beam 発光へ戻す
- stripe 結果と source detail の合成
- sampling (`uSamplingMode`) を使って source detail を戻す

#### `pass2`

- scanline
- vignette
- color finish
- final `screenFaceGlow`

関連 shader:

- `filterPass2BeamLiteKernelShader.ts`
- `filterPass2BeamLiteStripeShader.ts`
- `filterPass2BeamLiteFinalizeShader.ts`
- `filterPass2BeamLitePostShader.ts`

### 6. Post Curvature

追加 `1 pass`

挿入位置:

- `pass2` のあと
- `wideGlow` の前

流れ:

1. `pass2` -> `postCurvatureTexture`
2. `postCurvatureTexture` -> screen

役割:

- heavy な mode でも最後に curvature をかける
- base shader 側の責務を減らす
- `Curvature after mask` の実体
- beam / phosphor / spot mask / scanline まで描いたあとに、完成画像全体を曲げる

つまり `Curvature after mask` が On のときは、

- mask を作ってから曲げる
- 発光体や scanline も含めた最終絵を曲げる

という順番になる

逆に通常の pre-curvature は、

- source を読む段階で UV を曲げる
- beam / phosphor / mask 自体も「曲がった座標系」で生成する

という違いがある

### Curvature Placement Summary

- pre-curvature
  - beamKernel
  - beamStripe
  - beamCompose
  - 各 pass2 内の sampling 座標
  - などで使う
- `Curvature after mask`
  - `postCurvature` pass で最後に 1 回だけ使う
  - mask 後、screenFaceGlow 後、wideGlow 前

この違いで見え方が変わる。

- pre-curvature:
  - phosphor dot / stripe / mask 自体も曲面に沿う
- after mask:
  - いったん平面で描いた最終画像を後から曲げる

関連 shader:

- `filterPassPostCurvatureShader.ts`
  - 実ファイル名は pipeline import 側を参照

### 7. Wide Glow / Halo

追加 `3〜5 pass`

挿入位置:

- 最後
- `pass2` / `postCurvature` のあと

入力:

- いったん完成した最終 CRT 画像

流れ:

1. `wideGlowDownsample`
   - final scene -> `wideGlowQuarterTexture`
2. `wideGlowBlur` horizontal
   - `wideGlowQuarterTexture` -> `wideGlowBlurTexture`
3. `wideGlowBlur` vertical
   - `wideGlowBlurTexture` -> `wideGlowQuarterTexture`
4. optional second blur pair
   - update interval や mode に応じて追加実行
5. `wideGlowComposite`
   - original final scene + blurred glow -> screen

mode:

- `optical`
- `smoky`

備考:

- `wideGlowDownscale` は mode ごとに shader が分かれている
- blur は共通 shader
- `wideGlowUpdateInterval` により毎 frame 更新しないことがある
  - 例: 4 なら 4 frame に 1 回更新

関連 shader:

- `filterWideGlowOpticalDownsampleShader.ts`
- `filterWideGlowDownsampleShader.ts`
- `filterWideGlowBlurShader.ts`
- `filterWideGlowCompositeShader.ts`

---

## Pass Count Summary

概算の実 pass 数。
`postCurvature` と `wideGlow` は追加条件次第で増える。

- Filter Off: `1`
- Normal Retro: `2`
- Composite / NTSC: `4`
- Phosphor Dot: `3`
- Beam: `5`
- Post Curvature: `+1`
- Wide Glow: `+3〜5`

例:

- `CRT Beam Next`
  - beam `5`
  - wide glow `+3〜5`
  - 合計 `8〜10`

---

## Compile / Link Strategy

いまの方針は、

- 使わない pass は compile しない
- compile 単位を小さくする
- shared program として再利用する

というもの。

特に重さへ効いたのは次の分割。

- composite を `prep / apply` に分割
- beam を `kernel / stripe / compose / post` に分割
- phosphor を `core / post` に分割
- wide glow を `downsample / blur / composite` に分割

これにより、

- 1 本の巨大 shader compile で browser 全体が止まる
- small parameter change で巨大 variant が作り直される

のを減らしている。

---

## Current Important Notes

### Beam is No Longer "Simple vs Full" in the Old Sense

古いメモにあった

- `beam_simple`
- `beam_full`
- `beam_crt`

の差は、現状の lite pipeline ではそのままではない。

今は beam を共通 pass 群へ寄せて、

- `beamKernel`
- `beamStripe`
- `beamCompose`
- `beamPost`

へ物理分割している。

### Screen Face Glow

現在は `Mid face glow` 追加実験をやめて、

- beam
- phosphor
- normal pass2

どれも最後に 1 回だけ `screenFaceGlow` をかける方針へ戻している。

### Match Aspect

`matchTargetAspect` は runtime state にはあるが、
いまの preset 型には直接入っていない。

そのため preset JSON をそのまま config preset へ移すときは、
この項目だけ別途扱う必要がある。

### Sampling Is Not The Same As Canvas Scaling

`samplingMode` を変えても、

- CSS の表示サイズ
- final canvas の拡大率
- render cap の有無

を直接変えているわけではない。

変わるのは主に、

- `pass1`
- `compositePrep`
- `beamKernel`
- `beamCompose`

での source の読み方。

### Pre-filter Downscale Is A Real Extra Pass

`preFilterDownscaleEnabled` は見た目オプションというより、

- 追加の中間 texture を作るか
- beam/phosphor の入力解像度を事前に落とすか

を決める switch。

### Curvature After Mask Is Also A Real Extra Pass

`Curvature after mask` は単なる uniform の切り替えではなく、

- `postCurvatureFbo`
- `postCurvatureTexture`
- `postCurvatureProgram`

を使う追加 pass。

そのため、

- Off:
  - `pass2` の出力をそのまま screen へ出す
- On:
  - `pass2` の出力を一度 `postCurvatureTexture` に書く
  - その texture を最後に曲げて screen へ出す

という差がある。

---

## Main Files

- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
- `src/retro-player/retro/filterPass1LiteBaseShader.ts`
- `src/retro-player/retro/filterPass1LiteNearestShader.ts`
- `src/retro-player/retro/filterPass1Pc98LiteShader.ts`
- `src/retro-player/retro/filterPassCompositePrepShader.ts`
- `src/retro-player/retro/filterPassCompositeApplyShader.ts`
- `src/retro-player/retro/filterPass2LiteShader.ts`
- `src/retro-player/retro/filterPass2PhosphorLiteCoreShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteKernelShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteStripeShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteFinalizeShader.ts`
- `src/retro-player/retro/filterPass2BeamLitePostShader.ts`
- `src/retro-player/retro/filterWideGlowOpticalDownsampleShader.ts`
- `src/retro-player/retro/filterWideGlowDownsampleShader.ts`
- `src/retro-player/retro/filterWideGlowBlurShader.ts`
- `src/retro-player/retro/filterWideGlowCompositeShader.ts`
