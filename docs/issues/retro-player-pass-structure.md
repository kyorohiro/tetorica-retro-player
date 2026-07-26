# Retro Player Pass Structure

## Background

`Tetorica Retro Player` の描画は、`WebGL2` の multi-pass 構成で動いている。

体感の重さや `ANGLE` compile / link の話を整理するには、

- いま何 pass あるのか
- mode ごとにどこが増えるのか

を分けて見た方が分かりやすい。

---

## Current Pass Layout

### 1. Filter Off

実質 `1 pass`

- source texture をそのまま screen へ描画

---

### 2. Normal Retro Filters

実質 `2 pass`

#### Pass 1

`source -> fboTexture`

主な役割:

- palette / quantization
- dither
- smooth
- horizontal sharpness
- RGB convergence
- toon / edge boost
- mono / neon 系の下処理

#### Pass 2

`fboTexture -> screen`

主な役割:

- curvature
- scanline
- vignette
- glow
- tone / color finish

---

### 3. Phosphor Dot

実質 `2 pass`

構成自体は通常 filter と同じ。

#### Pass 1

`source -> fboTexture`

#### Pass 2

`fboTexture -> screen`

この pass の中で:

- phosphor dot
- spot mask
- bulb radius
- black floor
- phosphor internal scale

などを描いている。

追加 FBO は使っていない。

---

### 4. CRT Beam Simple

実質 `3 pass`

#### Pass 1

`source -> fboTexture`

通常の pass1。

#### Beam Source Pre-Resize

`fboTexture -> beamSourceTexture`

役割:

- `pass1` 後の色を Beam 用 source として pass2 target size 相当に縮小
- final shrink 後の moire を減らす
- palette / mono / reduced color の結果を Beam の光源ベースへ渡す

#### Pass 2

`fboTexture + beamSourceTexture -> screen`

役割:

- simple beam の最終描画
- curvature / scanline / vignette
- stripe / bloom の簡易合成

---

### 5. CRT Beam Full

実質 `4 pass`

#### Pass 1

`source -> fboTexture`

通常の pass1。

#### Beam Source Pre-Resize

`fboTexture -> beamSourceTexture`

`pass1` 後の色を Beam 用 source として縮小。

#### Beam Kernel

`beamSourceTexture -> beamKernelTexture`

役割:

- beam 本体の広がり
- halo / flare / leak / aura
- smooth / RGB convergence / sharpness を含む beam 入力処理

#### Pass 2 Composite

`fboTexture + beamSourceTexture + beamKernelTexture -> screen`

役割:

- beam kernel の最終合成
- stripe / bleed / white bloom / warm bloom
- source detail の戻し
- curvature / scanline / vignette / output finish

以前は `beamSourceTexture` を元 source から直接作っていたが、
現在は `pass1` 後の `fboTexture` から作っている。

この変更により:

- mono / palette / reduced color を Beam に自然に反映しやすくなった
- 後付け tint よりも「最初からその色で発光する」構成になった

---

## Summary Table

- Filter Off: `1 pass`
- Normal Retro: `2 pass`
- Phosphor Dot: `2 pass`
- CRT Beam Simple: `3 pass`
- CRT Beam Full: `4 pass`

---

## Why Beam Got Lighter Even With More Passes

`CRT Beam Full` は pass 数だけ見ると増えているが、実際には軽くなることがある。

理由:

- 1 本の巨大 shader を `ANGLE` が compile / link するコストが大きかった
- `kernel` と `composite` に分けると 1 本あたりの shader が小さくなる
- driver / `ANGLE` 側の最適化負荷も分散される

つまり今回は、

- pass 数の増加

よりも

- shader 1 本の巨大さの削減

の方が効いた。

---

## Notes

### Beam Simple / Full の切り替え

現状は次の条件で `beam_simple` になる。

- `smoothStrength <= 0.001`
- `rgbConvergenceOffset <= 0.0001`
- `samplingMode === nearest`

1 つでも外れると `beam_full` へ切り替わる。

このため、

- `Smooth 0.00 -> 0.01`
- `RGB convergence 0.00 -> 0.01`

のような小さな変更でも、見た目上は「微調整」ではなく
別 shader ルートへの切り替えとして効くことがある。

---

## Related Files

- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
- `src/retro-player/retro/filterPass1LiteShader.ts`
- `src/retro-player/retro/filterPass2LiteShader.ts`
- `src/retro-player/retro/filterPass2PhosphorLiteShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteSimpleShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteKernelShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteCompositeShader.ts`
