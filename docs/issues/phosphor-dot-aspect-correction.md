# phosphorDot アスペクト補正の問題点

`RetroPlayer.tsx` の `applyPresetWithAspect` に潜在的な問題がある。後で見直す候補。

## 対応状況(2026-07-16)

2・3 は `phosphorDotAspectActiveRef` を追加して解消。プリセット適用時に
ref を立て、`player.sourceDimensions` の変化を監視する `useEffect` で
遅れて読み込まれたソース/差し替え後のソースにも追従補正するようにした。
ref は幅・高さを手動編集した時点でクリアされ、ユーザーの手動指定を
上書きしない。1 の3連続更新は React 18 の自動バッチングで実質1回の
再レンダーに収まるため、実害なしと判断し据え置き。

### 追加で踏んだ地雷: matchTargetAspect との競合チャタリング

`matchTargetAspect`(デフォルト true)監視用の既存 `syncTargetAspect`
エフェクトと、上記の新しい phosphorDot 補正エフェクトが同時に
targetWidth/targetHeight を取り合い、互いの計算結果で上書きし合って
無限にチャタリングした(前者は「幅から単純にアスペクト比で高さを
算出」、後者は「preset のバウンディングボックスに収める」で計算式が
異なり、収束しない)。`syncTargetAspect` を呼ぶ箇所(自動同期の
useEffect と `handleSetMatchTargetAspect`)に
`if (phosphorDotAspectActiveRef.current) return;` を追加して、
phosphorDot 補正がアクティブな間は matchTargetAspect 側の同期を
完全に止めることで解消。

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
