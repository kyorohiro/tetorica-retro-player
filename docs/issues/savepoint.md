# Savepoint

Last updated: 2026-08-04

## For You

- 今の主目的は、`Render cap` が `ON` の時に出る phosphor / beam 系のモアレを減らしつつ、`pin / fit width / normal / maximize` で表示差が出ないようにすることです。
- 大きな前進はありました。
  - `pin / fit width / normal / maximize` ごとの表示差はかなり消えた
  - `CAP` 絡みの大きなモアレはかなり減った
- ただし完全には終わっていません。
  - `Fit Width` と `Maximize` ではまだモアレが少し残ることがある
- 時間優先の暫定として、beam の最小セルサイズを `CAP 設定 ON` の時だけ強める案を入れました。
  - `Math.max(isCapEnabled ? 1.6 : 1.2, filterState.beamWhiteBloom * 0.6)`
  - これは根本解決ではなく、急ぎの逃がしです

## For Codex

### Current Goal

- `Render cap` が有効な時の phosphor / beam モアレを抑える
- そのうえで `pin / fit width / normal / maximize` の見た目差をなくす
- 条件分岐を増やしすぎず、計算経路をなるべく一本化する

### What Was Actually Broken

- 問題の本丸は `CAP` そのものではなく、`CAP` 時に使われるサイズ情報が経路ごとに少しずれていたこと
- 特にずれていたもの
  - CSS の実表示サイズ
  - shader に渡す `uDisplaySize`
  - viewport / visible size
  - `getEffectiveRetroTargetSize(...)` が見るサイズ
- このズレがあると、`pin` では綺麗なのに `normal` や `maximize` でモアレや横線が出る

### What Helped

#### 1. CAP 後の表示サイズに収束させるようにした

- `src/retro-player/hooks/useRetroPixiStage.ts`
- `resolveCanvasSizing(...)` を追加
- `cap 判定 -> 実際の表示サイズ -> その表示サイズで再計算` を最大 3 回まわして収束させるようにした
- これで
  - 最初は `CAP対象`
  - でも実際には少し縮小され、その縮小後サイズなら `CAP不要`
  の自己矛盾が減った

#### 2. CSS 表示サイズと shader の表示サイズを揃えた

- `src/retro-player/hooks/useRetroPixiStage.ts`
  - `snapCssToDevicePixel(...)` を追加
  - `left/top/width/height` を `devicePixelRatio` 格子に寄せる
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `displaySizeOverride` を追加
  - `uDisplaySize` が `canvas.clientWidth/clientHeight` 直読みではなく、stage 側で確定したサイズを見るようにした

#### 3. 実測後に 1 回再反映するようにした

- `src/retro-player/hooks/useRetroPixiStage.ts`
- style 適用後、次フレームで `app.canvas.clientWidth/clientHeight` を測り直し
- もし意図したサイズと違っていたら、その実測値を `displaySizeOverride` に再反映して再描画
- これで `devtools 上は同じサイズに見えるのに線が出る` 問題がかなり減った

#### 4. viewport / target 計算も同じ表示サイズを見るようにした

- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
- `getEffectiveViewportFloorSize()` も `displaySizeOverride` ベースにした
- これで `uDisplaySize` だけでなく `getEffectiveRetroTargetSize(...)` に入る visible size も統一された

#### 5. maximize 専用の古い freeze 経路を外した

- `src/retro-player/hooks/useRetroPixiStage.ts`
- `windowedCanvasSize` を使う maximize 専用 freeze を削除
- `pin / fit width / normal / maximize` を同じ cap ロジックに寄せた

### What Did Not Work / Avoid

#### 1. CAP を避けるために cap 値そのものを大きくする

- 例:
  - beam cap を `960x720` から `1280x720` にする
- これは現象が出にくくなるだけで、根本原因の追跡を邪魔する
- ユーザーから「そこを変えないで」と明示あり

#### 2. mode ごとに条件分岐を足してモアレを抑える

- 例:
  - `Fit Width / Maximize` の時だけ別計算
  - `CAP active` の時だけ target 密度をさらに弱める guard
- ユーザーから「条件を増やすと問題が解決しないからやめて」と明示あり
- 今後も原則避ける

#### 3. `isCapActive` を後段だけで使う

- `Math.max(isCapActive ? 1.6 : 1.2, ...)` は、一部経路でしか同じ条件にならずズレる
- 実際に
  - `1.6 / 1.6` だとモアレが出ない
  - `1.6 / 1.2` だとモアレが出る
  という確認があった
- 理由:
  - stage 側の `getEffectiveRetroTargetSize(...)`
  - pipeline 側の `getEffectiveRetroTargetSize(...)`
  で条件が揃わないと破綻する

### Current Temporary Behavior

- いまは時間優先の暫定として、`CAP 設定 ON` を条件に beam の `baseMinCellPixels` を変える形にしている
- 場所:
  - `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `getPhosphorDotViewportLimitedSize(...)`
  - `getEffectiveRetroTargetSize(...)`
  - `setFilterBufferCap(...)`
- 重要:
  - `CAP active` ではなく `CAP setting ON` を使っている
  - stage 側と pipeline 側の両方で同じ条件になるように揃えた

### Files Touched Recently

- `src/retro-player/hooks/useRetroPixiStage.ts`
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`

### Validation Status

- `npm run build -- --mode development` passed

### Most Important Takeaways

- モアレの主因は `CAP` の有無より、`CAP 時に見るサイズが経路ごとにずれていたこと`
- `pin / fit width / normal / maximize` の表示差は、表示サイズ情報の統一でかなり消せた
- 条件分岐を増やすより、同じ値を全経路で使う方が効いた
- `CAP setting ON` を使う暫定はありだが、根本解決ではない

### Likely Next Steps

1. `CAP setting ON` による暫定がどこまで許容できるか確認する
2. 本当に根本から直すなら、`getEffectiveRetroTargetSize(...)` を呼ぶ経路をさらに整理して、`CAP前提の target 計算` を 1 箇所に寄せる
3. beam / phosphor の「見た目密度」と「buffer size 制限」を別概念として整理する
