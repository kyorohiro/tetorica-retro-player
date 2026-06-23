# phosphorDot アスペクト補正の問題点

`RetroPlayer.tsx` の `applyPresetWithAspect` に潜在的な問題がある。後で見直す候補。

## 該当コード

`src/retro-player/components/RetroPlayer.tsx` の `applyPresetWithAspect`

## 問題点

**1. state が3回連続で更新される**

```js
filterState.applyPreset(presetKey);    // width/height をプリセット値に設定
filterState.setTargetWidth(nextWidth);  // すぐ上書き
filterState.setTargetHeight(nextHeight);
```

applyPreset → setWidth → setHeight と立て続けに state が動く。

**2. sourceDimensions が null のときサイレントスキップ**

```js
if (presetKey !== "phosphorDot" || !player.sourceDimensions) return;
```

動画がまだロードされていないタイミングでプリセットを押すと、アスペクト補正が無言でスキップされる。後で動画がロードされても再補正は走らない。

**3. ソース変更後に再補正しない**

phosphorDot 適用後に別の動画を読み込んでも、アスペクトがずれたままになる。

## 補足

phosphorDot 以外のプリセットは特殊処理なし。この special case 自体がやや場当たり的。
