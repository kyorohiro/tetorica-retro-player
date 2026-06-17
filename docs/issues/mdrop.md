# mDrop — 設計メモ

## 概要

同一ネットワーク内の端末から tetorica-retro-player にファイルを転送する機能。
Tauri アプリ内の HTTP サーバーを経由することで、プラットフォーム固有のファイルピッカー制限を回避し、軽快な動作を実現する。

---

## アーキテクチャ

```
[送信側デバイス: ブラウザ]
       |
       | HTTP POST (multipart or stream)
       v
[受信側: Tauri アプリ内 HTTP サーバー]
       |
       | Android: ContentResolver / InputStream
       | iOS:     HTTP stream
       | Desktop: ファイルシステム書き込み
       v
[プレイヤーで即時再生]
```

### Android の利点

ContentResolver / InputStream 経由で読み込むことで、一時ファイルへのフルコピーが不要になり動作が軽快になる。

---

## V1 スコープ案

- 認証なし（同一 LAN 限定）
- アプリ起動時に HTTP サーバーを起動、URLをQRコードまたはテキストで表示
- 送信側はブラウザのみで完結（専用アプリ不要）
- アップロード後、即時再生（ライブラリ保存は後回し）
- 対象プラットフォーム: Android / iOS / Desktop (macOS, Windows, Linux)

---

## 懸念点・TODO

- [ ] ポート番号の決定（固定 or 動的）
- [ ] Android の `network_security_config` 対応（HTTP 許可）
- [ ] iOS の Local Network 権限プロンプト
- [ ] 同一 LAN 限定の担保方法（bind アドレス制限）
- [ ] 大容量ファイル転送時のメモリ管理（ストリーム処理）
- [ ] Tauri plugin 選定: `tauri-plugin-localhost` or 自前実装

---

## ステータス

検討中 / V1 対応は未決定
