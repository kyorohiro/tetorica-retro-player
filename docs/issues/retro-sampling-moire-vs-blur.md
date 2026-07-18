# Retro Sampling: Moire vs Blur

## 背景

`Native` モードでは見た目が自然なのに、`Retro` モードでは次の 2 つが起きやすかった。

- 画像を拡大すると、アンチエイリアスっぽくぼやける
- 漫画のトーンや細かい規則模様を縮小すると、モアレが出る

しかも `effect off` でも発生したため、shader の効果そのものではなく、
`Retro` 側の表示経路の問題と考えた。

## わかったこと

`Native` と `Retro` では最終表示経路が違う。

- `Native`
  - ブラウザ / OS の素直な表示に任せる
- `Retro`
  - Pixi / WebGL canvas を経由してから表示する

このため、`effect off` でも `Retro` 側だけ

- 拡大時の輪郭保持
- 縮小時のトーンの平均化

が `Native` と違う結果になっていた。

## 試してダメだったこと

### 常時 `LINEAR`

source texture 全体を `LINEAR` にすると、

- トーンのモアレは減ることがある
- ただし元絵そのものが全体的ににじむ

ので採用しなかった。

### 常時 `image-rendering: auto`

canvas 側を常に `auto` にすると、

- 縮小時は少し自然になる
- ただし拡大時の pixel art っぽい輪郭まで失われやすい

ので採用しなかった。

## 今回入れた方針

`表示サイズ / 元画像サイズ` を見て、
拡大と縮小でサンプリング方針を切り替える。

- 拡大が発生しそうなとき
  - `pixelated`
  - `NEAREST`
  - 輪郭を守る
- 縮小が発生しそうなとき
  - `auto`
  - `LINEAR`
  - トーンや細かい模様のモアレを減らす

ポイントは、`renderResolutionScale` や canvas buffer サイズではなく、
**最終的な表示サイズと元画像サイズの比率** を基準にすること。

## 実装メモ

- `src/retro-player/hooks/useRetroPixiStage.ts`
  - 表示倍率を見て `imageRendering` を `pixelated / auto` で切り替える
  - その判定結果を pipeline にも渡す
- `src/retro-player/video/TetoricaRetroVideoPipeline.ts`
  - `presentationSamplingMode` を追加
  - `crisp -> NEAREST`
  - `smooth -> LINEAR`

## 現状の評価

完全解決ではないが、実用上は「ギリ OK」まで改善した。

- 拡大時のぼやけは抑えたい
- 縮小時のモアレも減らしたい

という相反する要求に対して、常にどちらか片方へ固定するよりは
現実的な折衷案になっている。

## 今後もし詰めるなら

- `Native` と `Retro` の最終合成段だけをさらに近づける
- `LINEAR` を source 全体ではなく、最終縮小段だけに限定できるか検討する
- 漫画トーンのような高周波パターン専用の downscale policy を分ける

今回の学びは、
**effect の質よりも、最終表示サンプリングの方が見た目に強く効いていた**
という点だった。
