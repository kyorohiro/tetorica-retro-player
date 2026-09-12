# 表示サイズ基準の Auto target size

CRT Beam / Phosphor で表示上のドット間隔を調整するため、Auto target size に基準と間隔を追加。

- Auto target basis: Source size（従来の入力サイズ基準）/ Display size（表示サイズ基準）。
- Auto target spacing: 1〜5、0.1刻み。表示サイズ基準でのみ使用。
- 映像の表示領域の CSS px を Spacing で割って Target width / height を求める。
- 元映像の縦横比を維持する。整数丸めによる誤差はある。
- 例: 表示幅660 CSS px、Spacing 3 → Target width 220。
- Retina の devicePixelRatio、描画解像度倍率、余白や操作パネルは計算に含めない。
- リサイズ・入力変更に追従。表示サイズ基準では従来の1080p上限を適用しない。
- Display size 使用中は Phosphor 独自の寸法補正より優先し、Match aspect の操作は無効化する。
- Phosphor / Beam の描画パイプラインにある最小セルサイズ制限は残す。Spacing が小さい場合、実描画の解像度は Target 値より低くなることがある。
- CRT Beam / CRT Beam NTSC / CRT Beam Next は Display size / Spacing 4.2 を使用。その他の組み込みプリセットは従来のまま。新しい項目がない保存設定は Source size / Spacing 1。

組み込みプリセット定義例:

```ts
autoTargetSize: true,
autoTargetSizeBasis: "display",
autoTargetSpacing: 3,
```

`.retro.json` の `filter` にも同じ3項目を保存する。幅・高さは表示サイズから再計算される。
設定パネルでは Auto target size をON → Display size を選択 → Spacingを調整。

検証: CSSサイズからの計算、小数間隔、縦長、リサイズ、無効入力、旧プリセット互換を自動テスト。
実機での CRT Beam / Phosphor の見た目やリサイズ中の動作は別途確認する。

検証結果: 全54テスト成功、TypeScriptチェック成功、Viteビルド成功（チャンクサイズ等の警告あり）。

## Render cap 適用時の補正

Spacing の計算には、レイアウト上の割り当て領域ではなく、Render cap / GPU上限適用後の Canvas の CSS 表示サイズを使用する。
描画バッファのピクセル数を直接使わず、描画倍率による表示縮小も反映する。
例: 幅1920の領域がRender capで幅960 CSS pxに縮まった場合、Spacing 3.8 のTarget幅は253。
上限ON/OFF、描画倍率変更、Target更新後にサイズが安定することを回帰テストで確認する。

## 2026-09-13: 横・縦のSpacing

UIを Auto target spacing X（横）/ Y（縦）に分離。各1〜5、0.1刻み。
元映像が縦長ならY、横長・正方形ならXを選択する。選択したSpacingで表示サイズの縦横を同率に縮小し、アスペクト比を維持する（整数丸めを除く）。表示領域の丸めで基準が切り替わらないよう、向きは元映像の寸法で判定する。

横4・縦2の場合:

- 表示400×400 → X使用 → Target100×100。
- 表示400×100 → X使用 → Target100×25。
- 表示100×400 → Y使用 → Target50×200。

プリセット/保存形式は横を既存の `autoTargetSpacing`、縦を `autoTargetSpacingY` に格納する。
旧設定で縦がない場合は横の値を縦にも引き継ぐ。CRT Beam系の初期値は横4.2・縦1.0とし、UIから個別調整できる。
Render cap後の表示サイズを基準にする処理と描画側の最小セル制限は維持。
