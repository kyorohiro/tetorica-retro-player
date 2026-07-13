# WebGL Windows パフォーマンス改善ノウハウ

## 背景

RetroPlayer で画像（マンガ）をページ送りするとき、Windows 環境で遷移に 330〜669ms かかっていた。
macOS / Linux では問題なかった。

---

## 問題 1: Windows ANGLE の GPU ドローコール オーバーヘッド

### 現象

WebGL の描画（`gl.drawArrays` 相当）を 1 フレームで 2 回呼ぶと、Windows + ANGLE (DirectX バックエンド) では
各呼び出しに **15〜20ms** のオーバーヘッドが乗る。
単純な passthrough シェーダーでも同様。合計 30〜40ms のロスになる。

macOS (Metal) や Linux (OpenGL) では無視できる程度のオーバーヘッドしかない。

### 原因箇所

`attachVisualPreview` が `safeRender()` + `refreshLayout()` を連続で呼んでおり、
両方がドローコールを発行していた。

```
safeRender()      → renderFrame() → gl.drawArrays  (1回目)
refreshLayout()   → renderFrame() → gl.drawArrays  (2回目)
```

### 対策

新しいソースをセットするとき、canvas サイズ変更が不要なケース（image → image で同一サイズ）では
`refreshLayout()` をスキップして `safeRender()` 1 回だけにする。

```typescript
// attachVisualPreview に skipLayoutRefresh フラグを追加
const attachVisualPreview = async (
  source: HTMLVideoElement | HTMLImageElement,
  kind: "video" | "image" | "capture",
  skipLayoutRefresh = false,
) => {
  // ...
  if (skipLayoutRefresh) {
    safeRender();       // 1回だけ
  } else {
    refreshLayout();    // canvas 再計算 + 描画
  }
  scheduleRefreshLayout(); // RAF/setTimeout の安全網はそのまま残す
};
```

`canReuseImagePreview`（image→image 遷移で canvas が使い回せる条件）が true のときに
`skipLayoutRefresh = true` を渡す。

---

## 問題 2: `gl.texImage2D` の重複アップロード

### 現象

同じ `HTMLImageElement` を連続して描画する場面で、毎回 `gl.texImage2D` で
CPU → GPU へテクスチャをアップロードしていた。
3809×1600 の画像だと **約 24MB** を毎フレーム転送することになる。

### 対策

パイプラインに `lastUploadedImageSource` フィールドを持ち、
同一インスタンスなら texImage2D をスキップする。

```typescript
private lastUploadedImageSource: HTMLImageElement | null = null;

// render() 内：
const isImageSource = isHtmlImageElement(uploadSource);
const skipUpload = isImageSource && uploadSource === this.lastUploadedImageSource;
if (!skipUpload) {
  gl.texImage2D(...);
  this.lastUploadedImageSource = isImageSource
    ? (uploadSource as HTMLImageElement)
    : null;
}
```

`destroy()` 時に `null` リセットを忘れないこと。

---

## 問題 3: 画像プリフェッチのキャッシュミス（blob URL の不安定性）

### 現象

ファイル D&D で画像を読み込み、ページ送りするたびに `cached: false`（キャッシュヒットなし）となり、
毎回フルロードが走っていた。

### 原因

`loadFiles` でページを表示するたびに `URL.createObjectURL(file)` を呼んでいた。
呼ぶたびに異なる blob URL が生成されるため、プリフェッチキャッシュのキー（URL）が毎回変わり
キャッシュミスになっていた。

```
// NG: ナビゲーションのたびに新しいURLが生成される
const url = URL.createObjectURL(file);  // "blob:xxx-aaa"  1回目
const url = URL.createObjectURL(file);  // "blob:xxx-bbb"  2回目（別URL）
```

### 対策

ファイルリストをロードした時点で **全ファイル分の blob URL を一括生成** し、
プレイリストに安定した URL として持たせる。

```typescript
// loadFiles の先頭で全URL を作成して保持
const blobUrls = sortedFiles.map((file) => URL.createObjectURL(file));
filePlaylistBlobUrlsRef.current = blobUrls;
playlistRef.current = sortedFiles.map((file, index) => ({
  kind: "path" as const,
  url: blobUrls[index],   // 常に同じURL
  path: file.name,
}));
```

---

## 問題 4: blob URL の早期 revoke

### 現象

`usePreviewSourceState` の `revokePreviewSrc` が、preview を切り替えるたびに
古い blob URL を即座に revoke していた。
問題 3 の対策で安定 URL を作っても、最初に表示した直後に revoke されてしまい、
戻ったときに無効 URL になる。

### 対策

retain/release パターンで「プレイリスト管理下の URL は auto-revoke しない」を表現する。

```typescript
// usePreviewSourceState.ts
const retainedBlobPreviewSrcs = new Set<string>();

export const retainPreviewBlobSrc = (src: string) => {
  if (src.startsWith("blob:")) retainedBlobPreviewSrcs.add(src);
};
export const releasePreviewBlobSrc = (src: string) => {
  retainedBlobPreviewSrcs.delete(src);
};

// revokePreviewSrc に guard を追加
const revokePreviewSrc = (src?: string) => {
  if (src?.startsWith("blob:") && !retainedBlobPreviewSrcs.has(src)) {
    URL.revokeObjectURL(src);
  }
};
```

ファイルリストをロードした直後に `retainPreviewBlobSrc` で全URL を retain し、
アンマウントまたは次のファイルリストロード時に `releasePreviewBlobSrc` + `URL.revokeObjectURL` で解放する。

---

## 問題 5: ImageElement の 3 パスキャッシュ

### プリフェッチの仕組み

隣接画像を先読みして `HTMLImageElement` のデコードを済ませておくことで、
ナビゲーション時の遅延をなくす。

```
primeImageElementCache(url)
  → new Image(); image.src = url;
  → pendingImageElements.set(url, promise)  // in-flight を登録
  → decode 完了後に cachedImages.set(url, image)
```

### createImageMediaSource の 3 パス

1. **cached**: `cachedImages` にある → デコード済み、即座に使える
2. **pending**: `pendingImageElements` に in-flight がある → `await` してピギーバック
3. **cold**: どちらもない → `new Image()` から開始

pending パスにより、prefetch と本線ロードが競合したとき重複デコードしない。

### キャッシュサイズ

`IMAGE_ELEMENT_CACHE_LIMIT = 12` — 前後 5〜6 枚程度を保持できるサイズに設定。
大きすぎると `HTMLImageElement` がメモリを圧迫するので要注意。

---

## 改善結果

| 状態 | 遷移時間 |
|------|---------|
| 改善前 | 330〜669ms（毎回 cached: false） |
| 改善後 (cached: true) | 55〜85ms |
| 改善後 (pending: true) | 2〜35ms |
| 改善後 (cold miss) | 105〜120ms |

---

## まとめ・チェックリスト

WebGL + Windows ANGLE で画像表示を高速化するときの確認事項：

- [ ] 1 フレームで `renderFrame()` / `drawArrays` を 2 回以上呼んでいないか
- [ ] 同一テクスチャを毎フレーム `texImage2D` でアップロードしていないか（`lastUploadedImageSource` パターン）
- [ ] blob URL はナビゲーションのたびに生成していないか（安定 URL として事前生成する）
- [ ] blob URL が画像表示直後に revoke されていないか（retain/release で保護する）
- [ ] プリフェッチの in-flight が重複リクエストになっていないか（pending パスで dedup する）
- [ ] `UNPACK_FLIP_Y_WEBGL` は `ImageBitmap` には効かない（UV flip で対処する）
