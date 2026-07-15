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

### 1. Glow (`uGlowStrength`) が丸ごと未実装

本体は周囲6方向のパレット適用済みサンプルを加重合成してブルーム風グローを作る
（[filterPass1Shader.ts:619-644](../../src/retro-player/retro/filterPass1Shader.ts#L619-L644)）。

lite (`basic`) には `uGlowStrength` uniform 自体が存在しない
（[filterPass1LiteShader.ts:1-19](../../src/retro-player/retro/filterPass1LiteShader.ts#L1-L19)）。
ネオンモードのハーフピクセルオフセットによるハロー生成もセットで欠落。

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

### （既知・対応優先度低）color32 / color64

`basic` variant では専用ロジックが無く、汎用 `quantizeColor(color, uColorLevels)` にフォールバックしている
（[filterPass1LiteShader.ts:161-163](../../src/retro-player/retro/filterPass1LiteShader.ts#L161-L163)）。
本体の `nearestColor32` は R/G 4段階・B 2段階の非対称パレット
（[filterPass1Shader.ts:286-293](../../src/retro-player/retro/filterPass1Shader.ts#L286-L293)）、
`nearestColor64` は R/G/B 均等4段階
（[filterPass1Shader.ts:304-307](../../src/retro-player/retro/filterPass1Shader.ts#L304-L307)）。
color64 は levels=4 の汎用量子化でほぼ近似できるが、color32 の非対称 B チャンネルは汎用量子化では再現できない。

## 対応の優先順（案）

1. Glow — 影響範囲が広い（neon 含む複数モードで使われる）
2. エッジブーストのアルゴリズム統一（`computeEdgeBoost` 相当の追加）
3. color32 専用ロジックの追加（B チャンネル非対称量子化）
4. ネオンラインの多段階トーン合成化（`uNeonDetail` / `uNeonSaturation` の実装）
5. PC98 タイル合成・512Sat の高精度化
6. `highp` 精度指定の追加
7. mode ≥ 10.5 フォールバックの整合

## 関連ドキュメント

- [`windows-angle-shader-compile.md`](windows-angle-shader-compile.md) — lite shader 導入の背景（ANGLE compile freeze 対策）
