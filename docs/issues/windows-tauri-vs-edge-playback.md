# Windows Tauri Vs Edge Playback Difference

## Background

Windows で次の差が観測された。

- Tauri アプリ内で再生すると、画面更新がカクつく
- 同じマシンで、Tauri が立てた local HTTP server を Edge で開くと比較的スムーズに動く
- `npm run build:web` で生成した mDrop web frontend を Edge で開いても、もたつきが少ない

一見すると「どちらも localhost 経由なので同じ」に見えるが、実際には起動している frontend が違う。

---

## Main Finding

`localhost` が同じでも、Windows Tauri 内と Edge browser では同じ UI を動かしていない。

### Tauri app

通常の Tauri アプリ本体は次の入口を使う。

- `src/main.tsx`
- `src/App.tsx`

`src-tauri/tauri.conf.json` でも通常 build は `../dist` を使う。

### mDrop web frontend

`npm run build:web` で生成される web frontend は別入口。

- `web.html`
- `src/mdrop-web/main.tsx`
- `src/mdrop-web/WebApp.tsx`

この build は `src-mdrop-core/web-placeholder/` に出力され、mDrop HTTP server に埋め込まれる。

つまり、

- Tauri 内で見ているもの: `App.tsx`
- Edge で `localhost` を見ているもの: `WebApp.tsx`

であり、同じ app ではない。

---

## Path Comparison

### 1. Tauri app (`App.tsx`)

`App.tsx` は desktop shell と密結合している。

含まれているもの:

- Tauri runtime 判定
- `mdrop` 自動起動 / 停止
- Tauri drag-drop event (`onDragDropEvent`)
- `convertFileSrc()` を使う `asset://` 経路
- file association / deep-link
- always-on-top
- mobile / desktop 分岐
- playlist 制御
- ffmpeg retry 制御
- `RetroPlayer` 本体の常駐 UI

特に再生経路が複数ある。

- `mdrop ON` のときは `mdrop_share_file()` → `http://localhost:PORT/...`
- `mdrop OFF` のときは `convertFileSrc()` → `asset://...`
- file picker / drag-drop / open-with で入口が分かれる

### 2. Edge + mDrop web (`WebApp.tsx`)

`WebApp.tsx` はかなり軽い。

主な役割:

- `getMeta()` / `getDownloadList()` で shared file 一覧を取る
- click で `showPreviewDialog()` を開く
- `apiServer` を使って HTTP download URL を組み立てる

持っていないもの:

- Tauri window API
- `convertFileSrc()` / `asset://`
- native drag-drop event 分岐
- deep-link
- always-on-top
- Tauri shell 固有の window / lifecycle 制御

つまり Edge 側は localhost 再生でも、Tauri 統合レイヤーをほとんど通っていない。

---

## Why `localhost` Alone Does Not Explain The Difference

Windows で `mdrop ON` なら Tauri 内でも `http://localhost:...` を使う場面はある。

ただしそれでも `App.tsx` 側には、

- Tauri runtime 判定
- native drag-drop / file picker 分岐
- `RetroPlayer` 常時 UI
- preview source 切り替え管理
- playlist / retry / toolbar / dialog 制御

が残る。

そのため、差は単純な URL プロトコルだけではなく、

- `Tauri WebView2 + App.tsx`
- `Edge + WebApp.tsx`

の違いとして見る方が自然。

---

## Current Hypothesis

カクつきの本体は、HTTP server そのものではなく Windows Tauri 側の統合経路に寄っている可能性が高い。

疑わしい層:

1. Tauri WebView2 内での repaint / canvas 更新
2. `App.tsx` 側の重い状態管理・分岐
3. `asset://` と `http://localhost` の混在
4. `RetroPlayer` 本体の常駐 UI と Tauri shell の相互作用

逆に、Edge で `build:web` した frontend が軽いなら、

- mDrop HTTP server 自体
- shared file 一覧 API
- browser 単体での Retro preview 経路

は比較的白に近い。

---

## Practical Interpretation

今回の Windows 症状は

- `localhost` だから同じ

ではなく、

- `App.tsx` ベースの Tauri 本体が重い
- `WebApp.tsx` ベースの Edge localhost 表示は軽い

と読むのが適切。

---

## Suggested Next Checks

次の順で切り分けると分かりやすい。

1. Tauri 内でも `App.tsx` ではなく `web-placeholder` 側を表示して差を見る
2. `App.tsx` 内で Windows だけ `asset://` を使わず `mdrop` の localhost 経由に寄せる
3. `App.tsx` 側で Tauri 固有 UI / toolbar / playlist / dialog を減らした軽量経路を試す
4. filter 完全 OFF でもカクつくか確認する

これで、

- WebView2 の描画問題か
- `App.tsx` 側の構造問題か
- shader / filter 負荷か

をさらに分離できる。

---

## Related Files

- `src/main.tsx`
- `src/App.tsx`
- `src/mdrop-web/main.tsx`
- `src/mdrop-web/WebApp.tsx`
- `src/mdrop-web/usePreviewDialog.tsx`
- `vite.web.config.ts`
- `web.html`
- `src-tauri/tauri.conf.json`
