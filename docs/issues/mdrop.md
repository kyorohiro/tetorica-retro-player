# mDrop — 設計メモ

## 概要

同一ネットワーク内の端末から tetorica-retro-player にファイルを転送する機能。
Tauri アプリ内の HTTP サーバーを経由することで、プラットフォーム固有のファイルピッカー制限を回避し、軽快な動作を実現する。

---

## ステータス

実装済み・動作確認済み（macOS / Windows / Linux デスクトップ、PWA 経由で iOS / Android も動作）。

---

## アーキテクチャ

```
[送信側デバイス: ブラウザ / PWA]
       |
       | HTTP (multipart / stream)
       v
[受信側: Tauri アプリ内 HTTP サーバー  port: 7878〜]
       |
       +---> /upload        ファイル受信
       +---> /download/:id  ファイル配信
       +---> /hls/:id       HLS ストリーミング (ffmpeg 要)
       +---> /              mDrop Web UI (組み込み)
       v
[プレイヤーで即時再生]
```

---

## HTTP サーバーの実装（`src-mdrop-core`）

- Axum ベースの非同期 HTTP サーバー
- `SharedHttpServerContext`（`Arc<Mutex<HttpServerContext>>`）で状態を共有
- Tauri の tokio ランタイムで動作

### ポート自動選択

7878 を優先し、使用中なら 7879〜7887 を順に試みる。`std::net::TcpListener` を先にバインドしてから tokio に渡すことで TOCTOU 競合を排除している:

```rust
fn bind_to_free_port(preferred: u16) -> Result<(std::net::TcpListener, u16), String> {
    for port in preferred..=preferred.saturating_add(9) {
        match std::net::TcpListener::bind(format!("0.0.0.0:{port}")) {
            Ok(l) => return Ok((l, port)),
            Err(_) => continue,
        }
    }
    // どれも空いていなければ OS に任せる
    let l = std::net::TcpListener::bind("0.0.0.0:0").map_err(|e| e.to_string())?;
    let port = l.local_addr().map_err(|e| e.to_string())?.port();
    Ok((l, port))
}
```

### セキュリティ

- API キーによる認証（`X-Api-Key` ヘッダー）
- `local_only: true` 時は `127.0.0.1` のみバインド
- CSP ヘッダーを全レスポンスに付与
- AudioWorklet 用 JS は data: URL でなくファイルとして配信（CSP 準拠）

---

## mDrop Web UI（`src-mdrop-core/web-placeholder/`）

React + Vite で構築し、`npm run build:web` で `src-mdrop-core/web-placeholder/` に出力。`rust_embed` でバイナリに埋め込む。

### ffmpeg 有無の通知

HTML レスポンス配信時に Rust 側でプレースホルダーを置換:

```html
window.__MDROP_CONFIG__ = {
  apiKey: "MDROP_DEV_ONLY_API_KEY",        // → 実際のキーに置換
  apiServer: "",
  hasFfmpeg: "MDROP_HAS_FFMPEG_PLACEHOLDER" // → "true" / "false" に置換
};
```

フロントエンドは `hasFfmpeg` を見て HLS ストリーミングボタンの表示を切り替える。

---

## HLS ストリーミング（`http_stream.rs`）

ffmpeg が利用可能な場合、動画ファイルを HLS に変換してブラウザで再生できる:

```
GET /hls/:id        → index.m3u8 プレイリスト
GET /hls/:id/:seg   → seg*.ts セグメント
```

- `ultrafast` プリセット + `zerolatency` チューニングで速度優先
- セグメント長 2 秒
- 最初のセグメントが書き出されるまで最大 30 秒ポーリング

---

## Tauri UI との連携

### UI の配置

- 右上に「mDrop」ピル型ボタン（Wifi アイコン）と「ffmpeg」ピル型ボタン（Waves アイコン）を表示
- ボタン下に `IP:ポート` を小さく表示（例: `192.168.1.5:7878`）
- ON/OFF でボタン位置が変わらないよう、IP 表示はボタンの下側に固定

### 状態遷移

```
アプリ起動
  → 自動で mDrop サーバー起動（port 7878）
  → ステータスポーリングで IP:port を取得し表示

ボタン押下 (ON → OFF)
  → HLS セッションクリーンアップ
  → サーバー停止

ボタン押下 (OFF → ON)
  → サーバー再起動（ポート自動選択）
```

---

## プラットフォーム対応状況

| プラットフォーム | ステータス | 備考 |
|---|---|---|
| macOS | 動作確認済み | |
| Windows | 動作確認済み | |
| Linux | ほぼ動作 | |
| iOS (PWA) | 動作確認済み | ブラウザ経由 |
| Android (PWA) | 動作確認済み | ブラウザ経由 |

ffmpeg の負荷はデバイス性能依存。モバイルでは ffmpeg なしで直接ファイル配信が基本。
