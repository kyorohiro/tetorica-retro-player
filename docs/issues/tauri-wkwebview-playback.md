# Tauri WKWebView 再生関連の既知問題と対処

## 1. "Press Play" オーバーレイが Root Player で表示されない

### 問題
Tauri WKWebView では `media.play()` が `NotAllowedError` を throw しない（autoplay 制限が緩い）が、
AudioContext は suspended のままになる場合がある。
その結果、映像は再生されるが音声が出ない。

### 対処
`useRetroPreviewMedia.ts` の `playVideoWithAudio()` で `media.play()` 成功後に AudioContext の
state を確認し、`suspended` かつ MediaSource を使用中の場合は即座に pause して
`setNeedsUserPlay(true)` に戻す。

```typescript
// play() 成功後
const audioContextState = audioContextRef.current?.state ?? context?.state ?? "none";
if (audioContextState === "suspended" && mediaSourceRef.current) {
  media.pause();
  setNeedsUserPlay(true);
  return;
}
```

---

## 2. HLS バッファリング中のシークバー停止

### 問題
HLS ストリーミング再生中にセグメント生成が間に合わないと再生が止まるが、
UI 上では再生中のままに見える。

### 対処
`useRetroPreviewMedia.ts` で `waiting` / `playing` イベントを監視して `isBuffering` state を管理。
`RetroPreviewView.tsx` でバッファリング中スピナーを表示。

---

## 3. mDrop OFF のドラッグ＆ドロップ

### 問題
Tauri WKWebView では OS のファイルドラッグ＆ドロップを `onDragDropEvent`（Rust 側イベント）が
横取りするため、DOM の `drop` イベントが発火しない。
以前は `convertFileSrc` で `asset://` URL に変換していたが、`assetProtocol` が無効だったため
`src-not-supported` エラーが発生していた。また単一ファイルしか扱えず zip/rar も非対応だった。

### 対処
`src-tauri/tauri.conf.json`:
```json
"assetProtocol": { "enable": true, "scope": ["**"] }
```

`App.tsx` の `onDragDropEvent` mDrop OFF ブランチ:
- 単一メディア (video/audio/image) → `convertFileSrc` で `asset://` URL を直接使用（Range request 対応）
- 複数ファイルまたは非メディア (zip/rar/pdf/txt 等) → `fetch(assetUrl)` → Blob → `File` オブジェクト → `showBrowserFileListDialog`

mDrop ON のとき DOM `onDrop` ハンドラが二重実行されないよう `isTauriRuntime() && isMDropReady` ガードを追加。

---

## 4. avi/flv/mkv 等の非ネイティブ動画フォーマット

### 問題
`isVideo()` は `mimeFromPath()` ベースで mp4/webm/ogv/mov しか認識しない。
avi/flv/mkv/wmv/ts 等は `isVideo` = false になり、ダイアログ上で download 扱いになっていた。
ffmpeg ON 時は HLS トランスコードで再生可能なのに URL も生成されなかった。

### 対処
`utils.ts` に `isVideoExtended` を追加:
```typescript
export const isVideoExtended = (path: string) =>
  isVideo(path) ||
  /\.(avi|flv|mkv|wmv|ts|m2ts|mts|divx|xvid|rm|rmvb|3gp|f4v|asf|vob|mpeg|mpg|m2v|mxf)$/i.test(path);
```

以下で `useHls: true` 時に `isVideoExtended` を使用するよう変更:
- `App.tsx`: HLS URL 生成・単一ファイルルーティング
- `useMDropFileListDialog.tsx`: ファイルクリック時の再生/ダウンロード分岐
- `useMDropSharedListDialog.tsx`: `showPreviewDialog` に `useHls` を渡す
- `usePreviewDialog.tsx`: `PreviewDialogOptions` に `useHls` 追加、`PreviewPage` へ伝達
- `PreviewPage.tsx`: `useHls: true` 時は `isVideoExtended` で判定し RetroPlayer で再生

---

## 5. mDrop Web フロントエンド (http://localhost:7878/)

### 概要
mDrop Rust サーバーは `rust_embed` で `../dist` フォルダをバイナリに埋め込み、
`/` リクエストに対して `web.html` の `MDROP_DEV_ONLY_API_KEY` を実際のキーに置換して返す。

### retro-player 版フロントエンドのビルド方法
```bash
# tetorica-retro-player/ で実行
npm run build:web
# → src-mdrop-core/web-placeholder/ に出力（rust_embed がここを参照）

npm run tauri dev   # Rust 再コンパイルで web-placeholder を埋め込み
# → http://localhost:7878/ で RetroPlayer Web 版が起動
```

**注意**: `vite.web.config.ts` の `outDir` は `src-mdrop-core/web-placeholder` に設定。
`tetorica-mdrop/dist/` とは別。retro-player のローカル `src-mdrop-core/` は
`#[folder = "web-placeholder"]` で独自のアセットを埋め込む。

`web.html`: `window.__MDROP_CONFIG__.apiKey = "MDROP_DEV_ONLY_API_KEY"` を含む standalone エントリ  
`vite.web.config.ts`: `src/mdrop-web/main.tsx` をエントリとした web 専用ビルド設定  

`WebApp.tsx` はすでに `isRetro: true` で `showPreviewDialog` を呼んでおり、
CRT フィルター・オーディオエフェクト付きのフル RetroPlayer 体験が `http://localhost:7878/` で利用可能。

---

## 関連ファイル

| ファイル | 役割 |
|---|---|
| `src-tauri/tauri.conf.json` | `assetProtocol` の有効化 |
| `src/App.tsx` | Tauri drag-drop / mDrop ON/OFF 振り分け |
| `src/retro-player/hooks/useRetroPreviewMedia.ts` | AudioContext 確認・バッファリング検知 |
| `src/retro-player/components/RetroPreviewView.tsx` | Press Play / Buffering UI |
| `src/mdrop-web/utils.ts` | `isVideoExtended` |
| `src/mdrop-web/useMDropFileListDialog.tsx` | フォルダブラウザ内の HLS 対応 |
| `src/mdrop-web/preview/PreviewPage.tsx` | `useHls` prop による拡張フォーマット対応 |
| `web.html` | mDrop web フロントエンド用 HTML エントリ |
| `vite.web.config.ts` | web ビルド設定 |
