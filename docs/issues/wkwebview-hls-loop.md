# WKWebView HLS Loop — 終端検出と再生復帰

## 解決済み (追記 2026-07-06): hls.js 導入で本ドキュメントの workaround は不要に

以下に書かれている「① ライブ扱い問題」「B. 終端スタック検出」「C. リロードによる
VOD 正常化」は、`.m3u8` 再生をネイティブ `<video src>` から
[hls.js](https://github.com/video-dev/hls.js) (MSE 経由) に切り替えたことで
根本的に解消した。hls.js 自身がマニフェストのポーリング・セグメント管理・
終端 (`#EXT-X-ENDLIST`) 検出を行うため、`useRetroPreviewMedia.ts` にあった
`isHlsStream` 判定・`hlsWatchInterval`・`handleHlsEnded`・`confirmHlsEndedOrReload`
等の自前 workaround（下記 B 節のコード）は全て削除済み。

あわせて `src-mdrop-core/src/http_stream.rs` の HLS 共通引数に
`-hls_playlist_type event` を追加し、ffmpeg が入力ファイルを最後まで読み切って
プロセスが正常終了した際に `#EXT-X-ENDLIST` が確実に付くようにした
(GateKeeper pre-warm を扱う下記「A」節の対処は今も有効・変更なし)。

`getHlsInstance()` (`src/retro-player/media/RetroMediaSource.ts`) で
「この `<video>` 要素は hls.js 管理下か」を判定できるようにしたので、
`isHlsStartupRetryableError` 等の `.m3u8` 文字列判定もそちらに置き換えている。

**なお、hls.js 導入は本ページの終端検出問題は解決したが、
[`wkwebview-hls-webaudio.md`](wkwebview-hls-webaudio.md) の
Web Audio エフェクトが効かない問題は別件で未解決のまま。**

---

## 症状 (旧: ネイティブ `<video src>` 再生時代の記録)

- HLS (`index.m3u8`) 動画が終端手前（残り数秒）で止まる
- `ended` イベントが発火しない
- seek も `play()` も silently fail する
- reload または新ファイル読み込みまで復帰しない

## 根本原因

WKWebView (AVFoundation バックエンド) の HLS 処理が 2 段階でおかしい。

**① ライブ扱い問題**  
最初のプレイリスト取得時に `#EXT-X-ENDLIST` がないと「ライブ配信」として扱う。
ライブ扱いになると再生が途中で止まっても ended を発火しない。

**② GateKeeper 競合 (初回起動)**  
macOS の GateKeeper が ffmpeg バイナリの初回実行チェックに数十秒かかる場合がある。
pre-warm が間に合わないと HLS セグメントの生成が遅れ、ブラウザがセグメント取得待ちで止まる。

## 対処

### A. GateKeeper pre-warm の同期 (`src-tauri/src/lib.rs`, `src-mdrop-core/src/http_stream.rs`)

アプリ起動時に `ffmpeg -version` をバックグラウンドで先行実行して GateKeeper 認可を済ませる。
`tokio::sync::watch::channel` で完了を通知し、HLS 開始前に最大 90 秒待機。

```rust
// lib.rs: pre-warm 起動
let prewarm = mdrop_server.setup_ffmpeg_prewarm();
tauri::async_runtime::spawn_blocking(move || {
    let _ = std::process::Command::new(ffmpeg_path).arg("-version")...output();
    prewarm.complete();
});

// http_stream.rs: HLS 開始前に待機
if let Some(mut rx) = prewarm_rx {
    if !*rx.borrow() {
        let _ = tokio::time::timeout(Duration::from_secs(90), rx.changed()).await;
    }
}
```

### B. 終端スタック検出 (`src/retro-player/hooks/useRetroPreviewMedia.ts`)

`ended` イベントに頼らず、`playing` 開始後に 500ms interval で `currentTime` を監視する。
2 秒間（4 tick）動かなくなり、残り `duration < 10s` なら終端と判断して `media.load()` でリロード。

```typescript
// playing イベントで interval 開始
hlsWatchInterval = setInterval(() => {
  if (ct === lastCt && remaining < 10.0) {
    stuckTicks++;
    if (stuckTicks >= 4) handleHlsEnded(); // media.load() → canplay → play()
  } else {
    stuckTicks = 0; lastCt = ct;
  }
}, 500);
```

### C. リロードによる VOD 正常化

`media.load()` 時点では ffmpeg がエンコード済みなのでプレイリストに `#EXT-X-ENDLIST` が入っている。
WKWebView が VOD として認識し直す → 以降は native `loop` 属性が正常に動く。

```
初回: ライブ扱い → stuck 検出 → media.load()
2回目以降: ENDLIST 付き VOD → native loop
```

---

## 将来のメンテナンスポイント

| 項目 | 懸念 |
|---|---|
| `remaining < 10.0` の閾値 | 動画の末尾セグメントが長い場合や encoding が遅い環境では足りない可能性 |
| `stuckTicks >= 4` (2 秒) | 一時的なバッファリング stall と終端 stall を誤判定するリスク |
| WKWebView バージョン差 | macOS / iOS アップデートで `ended` の挙動が変わる可能性。修正が不要になる可能性もある |
| GateKeeper pre-warm の 90 秒タイムアウト | 非常に重い環境では不足するが、そのままフォールバックして動作はする |
| Loop OFF 時の挙動 | `handleHlsEnded` で `media.loop` が false の場合は `hlsEndedFlag = true` をセットするだけ。その後のシーク復帰は seeking ハンドラが担当 |

## 関連ファイル

- `src/retro-player/hooks/useRetroPreviewMedia.ts` — `attachMediaEventListeners` 内の HLS ブロック
- `src-mdrop-core/src/http_stream.rs` — `start_hls_for_path` の pre-warm 待機
- `src-mdrop-core/src/http.rs` — `FfmpegPrewarmHandle` / `setup_ffmpeg_prewarm`
- `src-tauri/src/lib.rs` — pre-warm 起動
