# Preview Dialog Retro Reuse

## Background

`PreviewDialog` で `isRetro: true` のとき、`image / video / audio` は `RetroPlayer` 経由で preview している。

`Prev / Next` では autoplay はしていないが、次ファイルごとに preview の再準備が走る。

特に重いのは以下:

- media source の再生成
- `cleanupPreview()`
- `resetFilterInstance()`
- WebGL 側の source attach し直し
- Windows では shader compile / link の待ちや ANGLE 周辺の負荷

## What We Confirmed

### `PreviewPage` 自体は毎回消していない

以前は `key={`${file.id}:${file.path}`}` により `PreviewPage` が file ごとに remount されていたが、これは外した。

そのため今は:

- `PreviewDialog` は開いたまま
- `PreviewPage` も基本は残る
- `file` prop だけが切り替わる

### `RetroPlayer` reuse は条件付きで効いている

`useRetroPixiStage` / `useRetroPreviewMedia` の寿命は `RetroPlayer` の寿命に従う。

つまり:

- `RetroPlayer` branch に居続ける間は `appRef.current` が残り、WebGL context / pipeline / compiled shader は再利用される
- `RetroPlayer` が unmount されると `destroyPixi()` が走り、pipeline / canvas / shader program は破棄される

### `Next` では毎回 preview の再準備はまだ走る

`RetroPlayer` 自体が残っていても、`previewUrl()` の中で source 切り替えのたびにフル cleanup 寄りの処理をしている。

そのため「component reuse」はあっても「preview source 差し替えの軽量化」はまだ限定的。

## Small Change Already Tried

`useRetroPreviewMedia.ts` で `image -> image` のときだけ、既存の image preview 中なら:

- `cleanupPreview()` を避ける
- `resetFilterInstance()` を避ける
- 既存の WebGL / pipeline を生かしたまま次画像を読み込む

これで `PreviewDialog` の画像送りは少し軽くなるはず。

## Main Idea

大きく複雑化させずに進めるなら、まずは **GPU 側の器だけ reuse** するのが安全。

残したいもの:

- WebGL context
- compiled shader programs
- `TetoricaRetroVideoPipeline`
- canvas
- render loop の土台

都度切り替えてよいもの:

- `HTMLImageElement` / `HTMLVideoElement` / `HTMLAudioElement`
- texture upload 元
- media event listeners
- audio graph 接続
- loading / error / current source state

## Risk

「内部では保持、見た目だけ切り替え」は性能には効くが、状態バグを生みやすい。

特に危ないもの:

- 古い media event が後から飛ぶ
- 非表示中も ticker が回る
- audio graph だけ残って mute / noise 状態がずれる
- old texture / dimensions が残る
- requestId と実 UI の表示対象が食い違う

そのため、`audio/pdf/archive` に移るときも **全部保持** するより、

- media は切る
- audio は止める
- WebGL / pipeline だけ残す

くらいに留めた方が安全。

## If We Revisit This

優先順はこのあたりが現実的:

1. `image -> image` の軽量経路を実機で確認する
2. `useRetroPreviewMedia.ts` に「前回 preview 種別」を保持して、reuse 判定を明示する
3. `video -> video` へ広げるか検討する
4. `pdf/archive/text` に移っても GPU 側 slot だけ残す設計を検討する

ただし 4 は状態バグを増やしやすいので、やるなら

- 軽い cleanup
- 重い cleanup

を分ける方が安全。

## Current Recommendation

ここでは深追いしない。

- `PreviewDialog` では `RetroPlayer` を毎回 unmount しない
- `image -> image` のような狭いケースだけ reuse を増やす
- 大規模な slot 常駐化は、Windows 実機で効果が十分あると分かってから再検討する
