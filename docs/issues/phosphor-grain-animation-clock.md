# Phosphor Grain Animation Clock

## Problem

`Phosphor dot` の `Grain` ノイズが、見た目上ほぼ静止して見える状態になっていた。

- MP4 でも再現したので、NES や `captureStream()` 経路の問題ではなかった
- `filterPass2PhosphorLiteShader.ts` 側では `uTime` を使っていたが、実際の表示は変化しなかった
- 一時的に `sin(uTime * 24.0)` のような極端な診断式へ変えても、目立つ変化が出なかった

## Cause

原因は `grain` の数式そのものではなく、Pass2 シェーダーへ渡す時間の持ち方だった。

`TetoricaRetroVideoPipeline.setFilterPrograms()` がフィルタプログラム差し替え時に毎回 `resetAnimationClock()` を呼んでおり、状況によっては `uTime` が十分に進まず、`grain` が止まって見える状態になっていた。

特に `phosphor` 系はノイズの変化量が小さいので、時間が頻繁に 0 付近へ戻ると「動いていない」ように見えやすい。

## Fix

`src/retro-player/video/TetoricaRetroVideoPipeline.ts`

- `performance.now() - startedAt` の都度計算ではなく、内部で `animationTimeSec` を積算する形へ変更
- `setFilterPrograms()` ではアニメーション時計をリセットしないように変更
- `resetAnimationClock()` は明示的に必要な場面だけで使う

`src/retro-player/retro/filterPass2PhosphorLiteShader.ts`

- 診断用の周期的な `sin()` ベース点滅はやめて、`floor(uTime * 60.0)` ベースのフレーム単位ランダムノイズへ戻した
- `hash13(vec3(cell + grainJitter, grainFrame))` で、セル固定の縞ではなくフレームごとに更新される grain にした

## Result

- `Phosphor dot` の grain が再び時間変化するようになった
- 周期的な「振動」ではなく、以前の意図に近いランダムな砂状ノイズに戻せた

## Note

今後 `uTime` を使う見た目が止まって見えたら、まずシェーダー式より先に次を疑う。

- `uTime` が本当に毎フレーム更新されているか
- プログラム差し替えやレイアウト再同期で時計を頻繁にリセットしていないか
- 見た目上は静止ソースでも、Pass2 が毎フレーム描画されているか
