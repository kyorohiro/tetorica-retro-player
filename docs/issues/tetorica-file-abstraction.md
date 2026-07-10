# Tetorica File Abstraction

## Background

File / Folder 周りの機能要件はだいぶ満たせたが、入力ソースごとの差分を `App.tsx` と `mdrop-web` 周辺がかなり背負っている。

今回特に見えた入力系はこのあたり:

- Browser `File` / `FileList`
- Tauri native `path`
- mDrop API (`url + path + isDir`)
- Zip / Rar archive entry

また、folder の粒度も違う:

- Browser folder drop は `xxx/001.png` のような展開済み `File[]` として来やすい
- Tauri / mDrop は `xxx` のような folder entry として来やすい
- Archive は `zip/rar` 1件の中に仮想 folder/file を持つ

## What We Learned

- Tauri は `mdrop on` 前提の方が性能・構造ともにかなり素直
- `mdrop off + Tauri path` は native path 展開や blob 化が必要になり、複雑さと待ち時間が増えやすい
- mixed input では eager に全件 blob 化すると重い
- lazy `resolveEntry()` にすると実用速度まで改善した

## Main Issue

今は source ごとの transport 差分と UI 向け model が少し混ざっている。

たとえば:

- selection decision
- preview/dialog 用 model
- playlist 用 model
- blob / file 解決
- folder 子要素列挙

が、場所によって別々の表現になっている。

## Abstraction Direction

完全な万能 `File` 型より、capability ベースの entry 抽象化の方がよさそう。

例:

- `TetoricaEntry`
  - `name`
  - `path`
  - `isDir`

- `TetoricaFile extends TetoricaEntry`
  - `openBlob(): Promise<Blob>`
  - `openFile?(): Promise<File>`
  - `getPreviewUrl?(): Promise<string>`

- `TetoricaFolder extends TetoricaEntry`
  - `listChildren(): Promise<TetoricaEntry[]>`

実装候補:

- `BrowserFile` / `BrowserFolder`
- `MDropFile` / `MDropFolder`
- `ArchiveFile` / `ArchiveFolder`

## Why This Looks Better

- UI 側が source 種別をあまり知らなくてよくなる
- folder/file の粒度差を吸収しやすい
- eager blob 化を避けやすい
- `selection decision` を UI model から切り離しやすい

## Current Recommendation

今はここを深追いしない。

- Tauri は `mdrop on` を正規ルート寄りで運用
- Browser / mDrop / Archive の3系統で考える
- 既存の `resolveEntry()` 方式で性能を確保

必要になったら次の段階で:

1. `IncomingItem` / `TetoricaEntry` の薄い共通 interface を作る
2. selection decision は意味だけ返すようにする
3. Browser dialog / Preview / Playlist 用 model を adapter で分ける
