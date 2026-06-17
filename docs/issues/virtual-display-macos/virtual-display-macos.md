# macOS Virtual Display — PoC 調査結果

## 結論: 断念

`CGVirtualDisplay` は Apple の非公開 API であり、サードパーティアプリが使用するための entitlement が存在しない。
PoC (macOS 15.7.2) で `initWithDescriptor:` が `nil` を返すことを確認。アドホック署名で private entitlement を付与しようとすると AMFI が SIGKILL する。

**→ V1 スコープから除外。代替アーキテクチャが必要。**

---

## やりたかったこと

tetorica-retro-player の映像フィルター（レトロエフェクト等）を、他のアプリの画面に対しても仮想モニター経由で透過的に適用する。

---

## CGVirtualDisplay とは

- CoreGraphics のプライベート API
- ソフトウェアのみで動作する仮想ディスプレイを作成し、macOS が物理モニターと同様に `CGDirectDisplayID` として認識する
- `NSClassFromString` でランタイムロードする方式で利用するプロジェクトが存在（BetterDisplay, FreeDisplay, displayoverride-mac 等）
- ただしこれらはすべて **Mac App Store 外配布・サンドボックス無効**

---

## PoC で確認した問題

| 問題 | 詳細 |
|------|------|
| `initWithDescriptor:` が nil を返す | XPC 拒否 (`KERN_FAILURE`) |
| Private entitlement を付与 | AMFI が SIGKILL |
| サンドボックス無効化 | App Store 配布不可になる |

---

## 代替パス: ScreenCaptureKit (公開 API)

macOS 12.3+ で利用可能。仮想ディスプレイを通常の `SCDisplay` としてキャプチャできる。

- `SCShareableContent` でディスプレイ列挙（仮想ディスプレイも含む）
- フレームは BGRA フォーマットの `CVPixelBuffer`（IOSurface バック）
- 必要な権限は標準 TCC のみ（特殊 entitlement 不要）
- Rust クレート: `screencapturekit` v1.5+（Tauri 向けサンプルあり）

ただしこれは「キャプチャして表示」であり「仮想モニターとして透過的に挟み込む」ではないため、当初の目的とは異なる。

---

## Tauri 統合案（参考）

もし ScreenCaptureKit ベースで再挑戦する場合：

1. `screencapturekit-rs` クレートを使用
2. Tauri Channel API でフレームをフロントエンドに配信
3. PixiJS の既存 WebGL パイプラインに BGRA フレームをテクスチャアップロード
4. ターゲット: 30fps PoC（1080p BGRA = 約 7.9 MB/フレーム）

---

## 参考リンク

- [displayoverride-mac](https://github.com/domdomegg/displayoverride-mac)
- [screencapturekit-rs](https://crates.io/crates/screencapturekit)
