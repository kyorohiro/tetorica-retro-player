# FFmpeg 統合

## 方針

- **通常ビルド**: システムにプリインストールされた `ffmpeg` を直接実行（プラグイン不使用）
- **サイドカービルド**: ffmpeg バイナリを同梱し、`tauri-plugin-ffmpeg` を使用

Cargo feature `ffmpeg-sidecar` でモードを切り替える。

---

## ファイル構成

```
src-tauri/
  Cargo.toml                  # ffmpeg-sidecar feature + optional dep
  tauri.conf.json             # 変更なし（externalBin なし）
  tauri-sidecar.conf.json     # サイドカービルド用マージ設定（externalBin 追加）
  src/
    lib.rs                    # 条件付きプラグイン登録
    ffmpeg.rs                 # ffmpeg_exec / get_ffmpeg_mode コマンド

src/
  ffmpeg/
    index.ts                  # TypeScript 統一 API
```

---

## Rust 側の仕組み

### Cargo feature

```toml
[features]
default = []
ffmpeg-sidecar = ["dep:tauri-plugin-ffmpeg"]

[dependencies]
tauri-plugin-ffmpeg = { version = "0.1", optional = true }
```

### ffmpeg_exec コマンド（`src/ffmpeg.rs`）

- 引数 `args: Vec<String>` を受け取り、ffmpeg を実行して stdout/stderr/exit_code を返す
- `ffmpeg-sidecar` feature が有効なとき: アプリ実行ファイルと同じディレクトリの `ffmpeg` バイナリを使用
- feature なし: PATH 上の `ffmpeg` を使用

```rust
#[tauri::command]
pub async fn ffmpeg_exec(args: Vec<String>) -> Result<FfmpegOutput, String>

#[tauri::command]
pub fn get_ffmpeg_mode() -> &'static str  // "system" | "sidecar"
```

### lib.rs でのプラグイン登録

```rust
let builder = tauri::Builder::default()...;

#[cfg(feature = "ffmpeg-sidecar")]
let builder = builder.plugin(tauri_plugin_ffmpeg::init());

builder.invoke_handler(tauri::generate_handler![
    ffmpeg::ffmpeg_exec,
    ffmpeg::get_ffmpeg_mode,
    ...
])
```

---

## TypeScript API（`src/ffmpeg/index.ts`）

```typescript
// 汎用実行（両モード対応）
ffmpegExec(args: string[]): Promise<FfmpegOutput>

// モード確認
getFfmpegMode(): Promise<"system" | "sidecar">

// トランスコード（サイドカー時は tauri-plugin-ffmpeg 経由、通常時は args 構築）
ffmpegTranscode(options: FfmpegTranscodeOptions): Promise<FfmpegTranscodeResult>

// プログレスイベント購読（サイドカー時のみ発火）
onFfmpegProgress(callback): Promise<UnlistenFn>
```

`FfmpegTranscodeOptions`:

```typescript
{
  inputPath: string;
  outputPath: string;
  mediaType: "video" | "audio";
}
```

---

## ビルドコマンド

### 通常ビルド（システム ffmpeg）

```bash
npm run tauri build
```

### サイドカービルド

1. ffmpeg バイナリをターゲットトリプル付きで `src-tauri/binaries/` に配置

```
src-tauri/binaries/
  ffmpeg-aarch64-apple-darwin
  ffmpeg-x86_64-apple-darwin
  ffmpeg-x86_64-unknown-linux-gnu
  ffmpeg-x86_64-pc-windows-msvc.exe
```

2. ビルド実行

```bash
npm run tauri build \
  --config src-tauri/tauri-sidecar.conf.json \
  -- --features ffmpeg-sidecar
```

---

## tauri-plugin-ffmpeg について

- crates.io: `tauri-plugin-ffmpeg v0.1.0`
- npm パッケージなし（`invoke('plugin:ffmpeg|transcode', ...)` で直接呼び出す）
- `transcode` コマンド: input/output パス + mediaType を受け取りプログレスイベントを emit
- プログレスイベント名: `ffmpeg://progress`
- `ffmpeg_path: Option<String>` パラメータでバイナリパスを上書き可能（サイドカー利用時に活用）

---

## 使用例

```typescript
import { ffmpegExec, ffmpegTranscode, onFfmpegProgress } from './ffmpeg';

// 汎用（リサイズなど）
const out = await ffmpegExec(['-i', 'input.mp4', '-vf', 'scale=1280:720', 'output.mp4']);

// トランスコード（サイドカー時はプログレス付き）
const unlisten = await onFfmpegProgress((p) => {
  console.log(`progress: ${p.progress}%`);
});
const result = await ffmpegTranscode({
  inputPath: '/path/to/input.mp4',
  outputPath: '/path/to/output.mp4',
  mediaType: 'video',
});
unlisten();
```
