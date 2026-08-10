# Savepoint

Last updated: 2026-08-10

## For You

- 今日は主に 2 系統進みました。
  - shader compile / linking の重さと見え方の整理
  - `PIN / Fit Width / More` など toolbar ボタンの誤操作対策
- `beam` と `phosphor dot` は、重い shader を少しずつ物理分割する方向で進めています。
- `PIN` ボタンが `通常 -> PIN -> 通常` とすぐ戻る問題は、共通の long-press / short-press 処理に手を入れて対策済みです。

## For Codex

### Current Goal

- `CRT Beam NTSC` / `phosphor dot` の compile / linking まわりをさらに軽くする
- compile 中表示をちゃんと見えるように保つ
- toolbar の long-press 系ボタンの誤タップ・二重発火を抑える

## Shader Related

### What Was Done

#### 1. `basic_composite` / `pc98_composite` を中間 pass 化

- `pass1 -> composite mid -> pass2`
- 追加:
  - `src/retro-player/retro/filterPass1LiteBaseShader.ts`
  - `src/retro-player/retro/filterPassCompositeMidShader.ts`
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `compositeMidProgram`
  - `compositeMidFbo`
  - compile cache / render path / dispose 対応済み

#### 2. `beam_crt` を 3 段化

- いまの構成:
  - `pass1 -> beam kernel -> beam compose -> pass2(post)`
- 追加:
  - `src/retro-player/retro/filterPass2BeamLiteCrtKernelShader.ts`
  - `src/retro-player/retro/filterPass2BeamLiteCrtComposeShader.ts`
  - `src/retro-player/retro/filterPass2BeamLiteCrtPostShader.ts`
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `beamKernelProgram`
  - `beamComposeProgram`
  - `beamKernelFbo`
  - `beamComposeFbo`
  - compile cache / render path / dispose 対応済み

#### 3. `phosphor dot` を 2 段化

- いまの構成:
  - `pass1 -> phosphor core -> pass2(post)`
- 追加:
  - `src/retro-player/retro/filterPass2PhosphorLiteCoreShader.ts`
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `phosphorCoreProgram`
  - `phosphorCoreFbo`
  - `phosphorCore` の compile cache / render path / dispose 対応済み
- 現状の `pass2(post)` は `FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_POST` を流用
  - scanline / vignette / basic color / reflective / face glow を担当

#### 4. compile 表示の改善

- `src/retro-player/components/RetroPreviewView.tsx`
  - compile 中は preparing overlay ではなく `shaderCompileLabel` を表示するようにした
- `src/retro-player/hooks/usePixiVideoPlayer.ts`
  - `shaderCompileLabel` を player に返す
  - `isShaderCompiling` 中は busy overlay を遅延なしで即表示
  - `prepareFilterVariantWithLabel(...)` の `waitForShaderBusyOverlayPaint()` を外した
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `updateCompileState(...)` で compile / link ラベルを出す
  - support shader (`beam downscale`, `post curvature`) も同じ経路でラベル更新

#### 5. compile の直列化

- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `reserveCompileTurn()` を追加
  - variant compile だけでなく support shader compile も同じ直列 turn に載せた
- 目的:
  - `Linking shader (beam downscale)...` が前の compile 待ちを背負って見える状態を減らす

### What We Learned

- `beam downscale` shader 自体は小さい
- それでも `Linking shader (beam downscale)...` が重く見えるのは、`LINK_STATUS` readback がドライバ待ちを背負う可能性が高い
- `CRT Beam NTSC` の `Preparing...` が長いのは、shader compile そのものより前に
  - full preset lock
  - overlay 表示
  - renderer init / prepare route
  - support compile scheduling
  が重なって見えていた

### What Still Looks Incomplete

#### 1. `CRT Beam NTSC` の `Preparing...`

- 少しは短くしたが、まだ compile 前に長く感じる可能性あり
- 次に見る場所:
  - `src/retro-player/components/RetroPlayer.tsx`
    - `prepareVariantIfNeeded(...)`
    - `runWithFullPresetLock(...)`
  - `src/retro-player/hooks/useRetroPixiStage.ts`
    - `prepareFilterVariant(...)`
    - `initPixi()`

#### 2. `beam downscale` / `post curvature` が本当に遅いのかの切り分け

- 今は直列化まで入れた段階
- まだ重いなら、support compile の前後に計測ログを入れて
  - compile submit が重いのか
  - `waitAndVerifyPrograms()` が重いのか
  を切り分ける

#### 3. `phosphor dot` の体感改善確認

- コード上は 2 段化済み
- まだ実機で
  - `Compiling shader (... / phosphor core)...`
  - `Linking shader (... / phosphor core)...`
  の待ち方がどう変わったか確認していない

## LongPress Related

### What Was Broken

- `PIN` ボタンを 1 回タップしても
  - `通常 -> PIN -> 通常`
  のようにすぐ戻ることがあった
- ユーザーの推測どおり、tap 後にレイアウトが変わったあと、後続の `click` が別位置で拾われるような ghost click / 二重発火の可能性が高かった
- 同じ `useLongPress` を使う
  - `PIN`
  - `Fit Width`
  - `More`
  - `Hi-res`
  - `Power`
  などでも同系統の問題が起こりうる

### What Was Done

- `src/retro-player/hooks/useLongPress.ts`
  - pointer short press 確定時に
    - `preventDefault()`
    - `stopPropagation()`
  - `lastPointerShortPressAt` を追加
  - `750ms` 以内の後続 `click` は ghost click とみなして無視

### What To Verify Next

- `PIN`
- `Fit Width`
- `More`
- `Hi-res`
- `Power`

で

- 短押しが 1 回だけ反応するか
- 長押し popover が壊れていないか
- desktop mouse / touch の両方で問題ないか

## Files Touched Recently

- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
- `src/retro-player/hooks/usePixiVideoPlayer.ts`
- `src/retro-player/hooks/useLongPress.ts`
- `src/retro-player/retro/filterPass2PhosphorLiteCoreShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteCrtComposeShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteCrtPostShader.ts`
- `src/retro-player/retro/filterPass2BeamLiteCrtKernelShader.ts`
- `src/retro-player/retro/filterPassCompositeMidShader.ts`
- `src/retro-player/retro/filterPass1LiteBaseShader.ts`
- `src/retro-player/components/RetroPreviewView.tsx`

## Validation Status

- `npm run build -- --mode development` passed after each main step

## Recommended Next Steps

1. 実機で `CRT Beam NTSC` を押して
   - `Preparing...`
   - `Compiling shader (...)...`
   - `Linking shader (...)...`
   のどこが長いか再確認する
2. `phosphor dot` の compile 待ちが本当に軽くなったか確認する
3. `PIN / Fit Width / More` のチャタリングが止まったか確認する
4. まだ `Preparing...` が長いなら
   - `prepareVariantIfNeeded(...)`
   - `prepareFilterVariant(...)`
   - `initPixi()`
   に時間計測ログを足してボトルネックを切る

## Chrome Extension Savepoint

### Current State

- Chrome Web Store には一旦 release 済み
- 直近は `extension/` 配下、とくに
  - `overlayRuntime.js`
  - `background.js`
  - `popup.js`
  を触っていた

### What Was Fixed

#### 1. reload 後に `Overlay current video (Experimental)` が復帰しない問題

- 原因:
  - `background.js` の再注入条件が `changeInfo.url` に強く依存していた
  - 単純な `reload` では URL が変わらず、overlay が active 保存されていても `startRetroOverlay()` が再実行されなかった
- 修正:
  - `extension/background.js`
  - `tabs.onUpdated` で `changeInfo.status === "complete"` かつ `OVERLAY_ACTIVE_KEY` に入っているタブなら再注入するように変更

#### 2. `Preparing Shader...` が出っぱなし / compile status がチャタる問題

- `extension/background.js`
  - `SET_COMPILE_STATUS` を dedupe
- `extension/viewer.js`
  - compile state の publish を dedupe
  - stale setup generation を無視
- `extension/overlayRuntime.js`
  - compile state の publish を dedupe
  - stale setup generation を無視

#### 3. `texImage2D: no video` で overlay が壊れる問題

- `extension/overlayRuntime.js`
  - `drawableSource` が未準備の `HTMLVideoElement` のときは upload しない
  - `no video` 系は permanent failure 扱いではなく、その frame だけ skip するようにした

### What Still Looks Broken

#### 1. overlay が重い

- ユーザー体感:
  - `M2 Mac` でも overlay がもっさりする
- 強い容疑:
  - `extension/overlayRuntime.js`
  - `isActuallyVisibleElement()` の `getComputedStyle(...)`
  - `isFrontmostMediaAtCenter()` の `document.elementsFromPoint(...)`
  - これらが draw loop で高頻度に走っている
- 途中対応:
  - 可視判定キャッシュ導入を始めた
  - `VISIBILITY_CHECK_FRAME_WINDOW = 24` に上げた
  - `isInViewport(..., rect)` / `isFrontmostMediaAtCenter(..., rect)` のように rect 再利用を入れ始めた
- ただし:
  - 「1 秒に 2-3 回でよい」という判断にまだ完全には寄せ切れていない
  - 次回はもっと強く間引いてよい

#### 2. `Overlay current video (Experimental)` の上下反転

- 現状:
  - overlay モードだけ上下反転して見える
  - これは 2-4 回前くらいの修正から発生
- 試したこと:
  - `UNPACK_FLIP_Y_WEBGL` を `true -> false`
  - overlay 専用の base flip を追加
  - `pass1/pass2` の `uFlipV` の相殺を疑って補正
- まだ直っていない
- 有力メモ:
  - overlay 側でだけ座標系が viewer とズレている
  - `pass1` / `pass2` のどちらで反転しているかを一度ログで切るのがよい

#### 3. overlay の target 復帰 / 追随は不安定な場面がまだある

- 以前からの流れ:
  - hidden / covered な video の上に古い overlay が残る問題に対して
    - `isActuallyVisibleElement`
    - `isFrontmostMediaAtCenter`
    - source identity tracking
    を追加した
- 副作用:
  - 判定コストが上がっている可能性が高い
- 次回:
  - 「重さを優先してまず間引く」
  - それでも残るズレだけ個別に詰める

### Important Files For Next Time

- `extension/overlayRuntime.js`
- `extension/background.js`
- `extension/popup.js`
- `extension/viewer.js`

### Recommended Next Steps For Extension

1. `overlayRuntime.js` の可視判定をさらに間引く
   - 目安はユーザー希望どおり `1秒に2-3回`
   - `elementsFromPoint` / `getComputedStyle` を draw loop 直下から極力外す
2. overlay の上下反転を切り分ける
   - `pass1` 時点で逆なのか
   - `pass2` で逆になるのか
   - upload 時点なのか
3. overlay の target 復帰と重さのトレードオフを整理する
   - まずは軽さ優先
4. release 後の不具合として
   - `reload 後に overlay が戻ること`
   - `Overlay current video` が ON のまま効かない状態がないこと
   を先に再確認する
