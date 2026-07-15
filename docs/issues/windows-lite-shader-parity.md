# Windows Lite Shader — 本体 shader との差分棚卸し

調査日: 2026-07-15

背景・経緯は [`windows-angle-shader-compile.md`](windows-angle-shader-compile.md) 参照
（Windows Chromium/ANGLE の compile freeze 対策として `pass1` / `pass2` の軽量 variant を追加した経緯）。

このドキュメントは「lite shader を本体（full）shader に近づける」作業のための、
pass1 の詳細な機能差分の棚卸し。`color32` / `color64` 以外に何が未実装・簡略化されているかをまとめる。

## 対象ファイル

- 本体: [`filterPass1Shader.ts`](../../src/retro-player/retro/filterPass1Shader.ts)
- lite (非 PC98 / `basic` variant): [`filterPass1LiteShader.ts`](../../src/retro-player/retro/filterPass1LiteShader.ts)
- lite (PC98 variant): [`filterPass1Pc98LiteShader.ts`](../../src/retro-player/retro/filterPass1Pc98LiteShader.ts)
- variant 切り替えロジック: [`TetoricaRetroVideoPipeline.ts:184-211`](../../src/retro-player/video/TetoricaRetroVideoPipeline.ts)（`getWindowsLiteVariantKey` / `isPc98PaletteMode`）

PC98 系パレット（`pc98` / `pc98_tile` / `pc98_512` / `pc98_512_sat` / `pc98_4096`）は
専用の `pc98` pass1 variant に振られるため、`basic` variant（`filterPass1LiteShader.ts`）は
それ以外の全モード（uniform quantize / color32 / color64 / monochrome / neon / anime）を担当する。

## 差分一覧

### 1. （対応済み・2026-07-15）Glow (`uGlowStrength`)

本体は周囲6方向のパレット適用済みサンプルを加重合成してブルーム風グローを作る
（[filterPass1Shader.ts:619-644](../../src/retro-player/retro/filterPass1Shader.ts#L619-L644)）。

`basic` / `pc98` 両 lite variant に同じ6タップ加重合成（0.34/0.34/0.18/0.18/0.10/0.10、
`smoothstep(0.45, 1.0, brightness)` の明部マスク）を移植した。
パレット分岐は center pixel と glow の neighbor サンプルで共有できるよう
`applyPaletteMode()` / `applyPc98PaletteMode()` に切り出し済み
（[filterPass1LiteShader.ts:139-157, 192-208](../../src/retro-player/retro/filterPass1LiteShader.ts#L139-L157)、
[filterPass1Pc98LiteShader.ts:129-144, 165-180](../../src/retro-player/retro/filterPass1Pc98LiteShader.ts#L129-L144)）。

**スコープ外（未対応のまま）**: ネオンモード（mode9）のハーフピクセルオフセットによるハロー生成は
本体特有の実装で、lite のネオンは元々別実装（項目2参照）のため今回は対象外。ネオン強化と合わせて別途対応する。

**検証**: 実機 Windows 上の Chromium (ANGLE) で両 variant を headless に compile/link/描画し、
チェッカーパターン入力で `uGlowStrength=0`/`1.5` を比較。全パレットモードで compile エラー・
`gl.getError()` エラー無し、`uGlowStrength=1.5` 時に明部が加算合成で明るくなることを確認済み。

### 2. ネオンライン (`paletteMode` 9) がほぼ別実装

本体 `applyNeonLinePalette` は core / accent / halo / background の多段階トーン合成 +
`uNeonDetail` によるエッジ検出スケール調整を行う
（[filterPass1Shader.ts:400-461](../../src/retro-player/retro/filterPass1Shader.ts#L400-L461)）。

lite は `edge × tint` のみの簡易版
（[filterPass1LiteShader.ts:153-156](../../src/retro-player/retro/filterPass1LiteShader.ts#L153-L156)）。

- `uNeonDetail` は lite 側に uniform 宣言すら無い
- `uNeonSaturation` は宣言はあるが `main()` 内で未参照（デッド uniform）

### 3. エッジブーストのアルゴリズムが違う

本体はトゥーン有効時は生ソースの `computeAnimeEdge`、トゥーン無効時はパレット適用後
luminance を見る `computeEdgeBoost`（= 量子化後の境界を検出）を切り替える
（[filterPass1Shader.ts:648-665](../../src/retro-player/retro/filterPass1Shader.ts#L648-L665)）。

lite は常に生ソースの `computeSourceEdge` のみ
（[filterPass1LiteShader.ts:165-173](../../src/retro-player/retro/filterPass1LiteShader.ts#L165-L173)）。
パレット適用後エッジを見るパスが無いため、量子化・ディザ後の境界に対する edge boost の効き方が本体と異なる。

### 4. PC98 系は移植済みだが式が簡略化

`filterPass1Pc98LiteShader.ts` で本体相当のモード分岐（nearestPc98 / tile / 512 / 512Sat / 4096）は
用意されているが：

- タイル合成: 本体は「3候補 + quarter-mix」ブレンド
  （[filterPass1Shader.ts:152-206](../../src/retro-player/retro/filterPass1Shader.ts#L152-L206)）、
  lite は2値チェッカーのみ
  （[filterPass1Pc98LiteShader.ts:121-126](../../src/retro-player/retro/filterPass1Pc98LiteShader.ts#L121-L126)）
- 512Sat の彩度シェーピング: 本体は暖色/パステルバイアス付きの複合計算
  （[filterPass1Shader.ts:363-397](../../src/retro-player/retro/filterPass1Shader.ts#L363-L397)）、
  lite は彩度ブースト一発のみ
  （[filterPass1Pc98LiteShader.ts:108-114](../../src/retro-player/retro/filterPass1Pc98LiteShader.ts#L108-L114)）

### 5. `highp` 精度指定が抜けている

本体は `monochromePalette` / `applyPalette` の `floor()` 演算に `highp` を明示
（モバイル GPU の精度落ち対策、[filterPass1Shader.ts:350-352](../../src/retro-player/retro/filterPass1Shader.ts#L350-L352)）。
lite は全部 `mediump` のまま。今のところ Windows/ANGLE 環境での実害は未確認だが、バンディングのリスクとして残る。

### 6. `paletteMode` ≥ 10.5（未定義モード）のフォールバックが違う

本体は未定義パレットモードを `monochromePalette` にフォールバックする
（[filterPass1Shader.ts:532-536](../../src/retro-player/retro/filterPass1Shader.ts#L532-L536)）。
lite は `quantizeColor` を `levels = clamp(6, 24)` でかける独自分岐になっており
（[filterPass1LiteShader.ts:159-160](../../src/retro-player/retro/filterPass1LiteShader.ts#L159-L160)）、
本体とは別の挙動。実際に使われているモードかは要確認。

### （対応済み・2026-07-15）color32 / color64

`basic` variant に本体と同じ `nearestColor32` / `nearestColor64` を移植し、`paletteMode` 6/7 を専用分岐にした
（[filterPass1LiteShader.ts:85-97, 175-178](../../src/retro-player/retro/filterPass1LiteShader.ts#L85-L97)）。

移植前は汎用 `quantizeColor(color, uColorLevels)` にフォールバックしていた。
`color64`（R/G/B 均等4段階）は `uColorLevels=4` の汎用量子化とほぼ同じ結果になるため実害は小さかったが、
`color32`（R/G 4段階・B 2段階の非対称パレット）は汎用量子化では B チャンネルの二値化を再現できず、
本体と見た目が異なっていた。

**検証方法**: `pc98` variant（ループ・配列を含む）が既に Windows lite として単独 compile できている実績から、
それよりずっと軽い color32/64（`round()`/`mod()` のみ、ループ無し）の追加は compile freeze リスクが低いと判断。
実機 Windows 上の Chromium (ANGLE) で headless に shader を直接 compile/link/描画し、
compile エラー無し・`gl.getError()` 全モードで `0`・入力色 `(140,190,100)` に対し
`color32` → `(170,170,0)`（B二値化）、`color64` → `(170,170,85)`（B含め4段階）と、
本体と同じ計算式通りの出力になることを確認済み。

## 対応の優先順（案）

1. ~~Glow — 影響範囲が広い（neon 含む複数モードで使われる）~~ — 対応済み（2026-07-15、neon のハロー部分は対象外）
2. エッジブーストのアルゴリズム統一（`computeEdgeBoost` 相当の追加）
3. ~~color32 専用ロジックの追加（B チャンネル非対称量子化）~~ — 対応済み（2026-07-15）
4. ネオンラインの多段階トーン合成化（`uNeonDetail` / `uNeonSaturation` の実装、glow ハローも含む）
5. PC98 タイル合成・512Sat の高精度化
6. `highp` 精度指定の追加
7. mode ≥ 10.5 フォールバックの整合

## 関連ドキュメント

- [`windows-angle-shader-compile.md`](windows-angle-shader-compile.md) — lite shader 導入の背景（ANGLE compile freeze 対策）
