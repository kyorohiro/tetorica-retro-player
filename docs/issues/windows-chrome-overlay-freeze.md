# Windows Chrome Overlay Freeze Notes

## Background

Chrome extension の `Overlay current video (Experimental)` で、Windows Chrome だけ挙動が不安定だった。

今回いちばん大きかった問題は次の 2 点。

- filter を掛けようとすると browser が freeze することがある
- freeze を避けると filter が掛からず、overlay の扱いも不安定になる

`Set Capture Tab` 側は Windows でも比較的安定していて、filter も掛かる。

---

## Symptom

Windows Chrome で `Overlay current video (Experimental)` を使うと、次のような症状が出た。

- overlay button 自体が出ない時がある
- raw canvas を重ねても真っ黒になる時がある
- browser が固まる
- ただし、固まるケースでは filter 自体は掛かっていた

このため、

- 「filter は本来可能そう」
- ただし「現在の overlay 実装経路では freeze を踏む」

という整理が妥当。

---

## What We Confirmed

### 1. Overlay target detection itself can work

Windows でも次は確認できた。

- overlay button は出せる
- target rect も出せる
- video tag の特定自体はできている

つまり、問題の中心は target detection ではなく render / capture path 側。

### 2. Raw canvas can be shown without filter

最終的に、Windows では `WebGL filter` を無理に通さず、

- raw canvas overlay
- もしくは target video の `captureStream()` を使った recording

までなら扱える状態に寄せられた。

### 3. Freeze case still suggests filtering is possible

重要なのはここで、freeze した時でも見た目として filter が掛かっていた。

つまり Windows Chrome で overlay filter が絶対不可能というより、

- shader compile
- texImage2D / draw path
- ANGLE / D3D cache
- page overlay との組み合わせ

のどこかで freeze 条件を踏んでいる可能性が高い。

---

## Current Release Direction

今回のリリース時点では、`Overlay current video (Experimental)` を無理に完成扱いにはしない。

暫定方針:

- browser freeze を避けることを優先
- Windows Chrome overlay では raw canvas / direct capture 寄りに退避
- filter を掛けられない場合は、それを分かるように表示する
- 録画は可能なら `video.captureStream()` を使う

この方針なら、少なくとも browser 全体を固めにくくできる。

---

## Why This Is Still An Open Issue

今回の対応で「安定側」には寄せられたが、根本課題は未解決。

未解決の本丸:

- Windows Chrome overlay で filter が掛かった状態まで行けるケースはある
- しかし、その経路だと freeze を誘発する

つまり、

- `filter cannot be applied`

ではなく、

- `filter can be applied, but current implementation path freezes`

として扱うべき課題。

---

## Candidate Technical Causes

現時点で怪しい候補は次のあたり。

- `WEBGL_parallel_shader_compile` を使っていても、Windows ANGLE / D3D shader cache 周辺で main thread block を踏む
- overlay runtime の page-injected WebGL path が、viewer 側より不安定
- `texImage2D(video)` や intermediate FBO を使う 2-pass path が Windows Chrome overlay と相性が悪い
- hidden / overlay canvas と page video compositing の組み合わせで black / freeze を引く

---

## Current Behavior Summary

### Windows Chrome

- `Set Capture Tab`: 比較的安定、filter も掛かる
- `Overlay current video (Experimental)`: freeze 回避を優先した暫定挙動

### Mac Chrome

- `Overlay current video (Experimental)` は Windows より安定

---

## Suggested Future Work

次に掘るなら、方向性はこの 2 系統。

1. Freeze の本丸を追う

- filter が掛かった時の最後の成功地点をログで残す
- pass1 / pass2 / FBO / tex upload のどこで固まるかをさらに絞る
- viewer 側と overlay 側の差分を比較する

2. Experimental として割り切る

- Windows Chrome overlay は raw canvas / recording を中心にする
- filter path は明示的に unsupported 扱いにする
- `Set Capture Tab` を Windows 向けの推奨経路として案内する

---

## 2026-07-04 追記: overlayRuntime.js vs viewer.js 静的比較調査

開発機がmacOSで実機Windows検証ができないため、まずは `extension/overlayRuntime.js`(不安定)と `extension/viewer.js`(安定)のWebGL実装をコードレベルで比較した。以下は実施した比較の結果で、まだ修正は入れていない。

### 一致している部分(freeze原因ではなさそう)
- shader compile: 両方とも `gl.getShaderParameter(COMPILE_STATUS)` は同期チェックだが、program の `LINK_STATUS` は `WEBGL_parallel_shader_compile` / `KHR_parallel_shader_compile` の `COMPLETION_STATUS_KHR` を rAF ポーリングで待つ非同期パターンに統一済み(`overlayRuntime.js:2434-2456`, `viewer.js:943-965`)。拡張が無ければ `setTimeout(3000)` にフォールバック
- Windows向けの既存対策(`isWindowsChromiumAngleRisk()`)は両ファイルにあり、Windows lite shader への切り替えも共通(`overlayRuntime.js:2354-2357`, `viewer.js:885-888`)
- pass1→FBO→pass2 の2-passピンポン構造は同一
- `gl.readPixels`/`gl.finish`/`gl.flush` などの同期stallを起こす呼び出しはフレームループ内に存在しない(両方とも)

### 差分として見つかったもの(freeze原因の候補)
1. **WebGLコンテキスト生成オプションが違う**: overlay側は `{ alpha:false, antialias:false, depth:false, stencil:false, preserveDrawingBuffer:false }` を明示指定(`overlayRuntime.js:1764-1770`)。viewer側はオプションなし(Chromeのデフォルト = alpha:true, antialias:true, depth:true)(`viewer.js:260`)。`desynchronized`/`powerPreference` はどちらも未指定
2. **overlayは同時に最大12面まで独立したWebGL2コンテキストを持てる**(`extension/shared/settings.js:757-760`)。各面が個別に3プログラム/5シェーダーをコンパイル・リンクし、独自の非同期完了ポーリングを走らせる(`overlayRuntime.js:904-918`)。viewer側は常に単一パイプライン。**エージェントの調査で最も大きな構造差**として指摘された点
3. **overlayはcanvasを任意のホストページの`document.body`に直接注入**(`overlayRuntime.js:915-916`、`position:fixed`, `zIndex:2147483500-index*2`)。ホストページ自身のDOM/rAF/コンポジタと同居する点がviewer(専用の拡張ページ)と根本的に異なる
4. **overlayは毎フレーム`performance.now()`によるアップロード時間監視**を行い、50ms超で該当videoをブラックリスト化する独自ロジックを持つ(`overlayRuntime.js:1027-1043`)。viewerにはこのオーバーヘッドが無い
5. overlay専用の追加パス: Windows向けに `captureStream()` 経由のvideoプロキシ(`ensureProxyVideo`, `overlayRuntime.js:1863-1905`)と、フィルターを諦めるraw canvasフォールバック(`shouldUseDirectVideoFallback`→`renderRaw`, `:958-975`)がすでに存在する

### 次にやるなら
- 上記2(同時マルチサーフェス)が本丸の可能性が高いので、Windows環境で `overlayTargetCount` を1に固定した場合にfreezeが再現するかどうかの切り分けが有効そう
- 併せてコンテキスト生成オプション(alpha/antialias/depth)をviewer側に揃えてみる実験も低コストで試せる

## Key Takeaway

今回の到達点は「Windows Chrome overlay で browser freeze を避ける」こと。

ただし本質的な課題は、

`filter が掛からない` ではなく  
`filter は掛かるが、その経路だと freeze する`

こと。

この点は今後の再調査前提として残しておく。
