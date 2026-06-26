# FFmpeg 統合

## 方針

- **通常ビルド**: システムにプリインストールされた `ffmpeg` を直接実行（プラグイン不使用）
- **サイドカービルド**: ffmpeg バイナリを同梱し、アプリ実行ファイルと同じディレクトリから呼び出す

Cargo feature `ffmpeg-sidecar` でモードを切り替える。

安定版・通常リリースは通常ビルド。キリ番・安定版の特別リリースでサイドカービルドを用意する想定。

---

## ファイル構成

```
src-tauri/
  Cargo.toml                    # ffmpeg-sidecar feature + optional dep
  tauri.conf.json               # 変更なし（externalBin なし）
  tauri.ffmpeg.conf.json        # サイドカービルド用マージ設定（externalBin 追加）
  binaries/
    .gitignore                  # バイナリ自体はコミットしない
    ffmpeg-aarch64-apple-darwin # (手動配置) macOS arm64 用静的ビルド
    ffmpeg-x86_64-apple-darwin  # (手動配置) macOS x86_64 用静的ビルド
    ffmpeg-x86_64-pc-windows-msvc.exe  # (手動配置) Windows 用
  src/
    lib.rs                      # 条件付きプラグイン登録 + set_ffmpeg_path 呼び出し
    ffmpeg.rs                   # ffmpeg_exec / get_ffmpeg_mode コマンド

src-mdrop-core/src/
  http.rs                       # SharedHttpServerContext.set_ffmpeg_path()
  http_stream.rs                # HLS 変換時に ctx.ffmpeg_path を使用
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

### ffmpeg_bin() の解決（`src/ffmpeg.rs`）

```rust
pub fn ffmpeg_bin() -> PathBuf {
    #[cfg(feature = "ffmpeg-sidecar")]
    {
        // アプリ実行ファイルと同じディレクトリの "ffmpeg" を返す
        if let Ok(exe) = std::env::current_exe() {
            if let Some(dir) = exe.parent() {
                return dir.join("ffmpeg"); // Windows は .exe でも動作確認済み
            }
        }
        PathBuf::from("ffmpeg") // フォールバック
    }
    #[cfg(not(feature = "ffmpeg-sidecar"))]
    PathBuf::from("ffmpeg") // PATH から解決
}
```

### lib.rs での初期化

```rust
// setup ブロック内
#[cfg(feature = "ffmpeg-sidecar")]
mdrop_server.set_ffmpeg_path(crate::ffmpeg::ffmpeg_bin());

#[cfg(feature = "ffmpeg-sidecar")]
let builder = builder.plugin(tauri_plugin_ffmpeg::init());
```

`set_ffmpeg_path` はパスが実際に存在する場合のみ `has_ffmpeg = true` にセットする。
開発時（`tauri dev`）にバイナリが `binaries/` になければ自動でシステム ffmpeg にフォールバックする。

### mDrop HTTP サーバーとの統合

HLS ストリーミング（`http_stream.rs`）で ffmpeg を呼び出す際、`ctx.ffmpeg_path` を優先使用する:

```rust
let ffmpeg_cmd = {
    let ctx = state.inner.lock().unwrap();
    ctx.ffmpeg_path.clone().unwrap_or_else(|| PathBuf::from("ffmpeg"))
};
let mut child = Command::new(&ffmpeg_cmd).args([...]);
```

Web フロントエンドへの ffmpeg 有無通知は HTML レスポンス内の `MDROP_HAS_FFMPEG_PLACEHOLDER` プレースホルダーで行う:

```javascript
window.__MDROP_CONFIG__ = {
  apiKey: "...",
  apiServer: "",
  hasFfmpeg: "MDROP_HAS_FFMPEG_PLACEHOLDER" // Rust が "true"/"false" に置換
};
```

---

## TypeScript API（`src/mdrop-web/api.ts`）

```typescript
const getMeta = async (): Promise<{ apiServer: string; hasFfmpeg: boolean }> => {
    const cfg = window.__MDROP_CONFIG__;
    const hasFfmpeg = (cfg as any)?.hasFfmpeg === true;
    ...
};
```

フロントエンドは `hasFfmpeg` を見て HLS ボタンの表示/非表示を切り替える。

---

## ビルドコマンド

### 通常ビルド（システム ffmpeg）

```bash
npm run build:tauri
# 内部: npx tauri build
```

### サイドカービルド（macOS arm64 の例）

1. 現在のターゲットトリプルを確認:

```bash
rustc -Vv | grep host | awk '{print $2}'
# 例: aarch64-apple-darwin
```

2. 静的 ffmpeg バイナリを配置:

```bash
# evermeet.cx から静的ビルドをダウンロード
curl -L "https://evermeet.cx/ffmpeg/ffmpeg-7.1.zip" -o /tmp/ffmpeg.zip
unzip /tmp/ffmpeg.zip -d /tmp/
cp /tmp/ffmpeg src-tauri/binaries/ffmpeg-aarch64-apple-darwin
chmod +x src-tauri/binaries/ffmpeg-aarch64-apple-darwin
```

3. ビルド実行:

```bash
# 現在のマシンのアーキテクチャでビルド
npm run build:tauri-sidecar
# 内部: npx tauri build --config src-tauri/tauri.ffmpeg.conf.json -- --features ffmpeg-sidecar

# アーキテクチャを明示指定する場合（クロスビルド）
npm run tauri build --config src-tauri/tauri.ffmpeg.conf.json --target aarch64-apple-darwin -- --features ffmpeg-sidecar
npm run tauri build --config src-tauri/tauri.ffmpeg.conf.json --target x86_64-apple-darwin  -- --features ffmpeg-sidecar

# 通常ビルド（サイドカーなし）でのアーキテクチャ指定
npm run tauri build -- --target aarch64-apple-darwin
npm run tauri build -- --target x86_64-apple-darwin
```

> **注意**: クロスビルド時は対応するターゲットトリプルのバイナリが `binaries/` に必要。
> 例: `--target x86_64-apple-darwin` でビルドするなら `ffmpeg-x86_64-apple-darwin` が必要。

サポート予定バイナリ名:

```
src-tauri/binaries/
  ffmpeg-aarch64-apple-darwin         macOS Apple Silicon
  ffmpeg-x86_64-apple-darwin          macOS Intel
  ffmpeg-x86_64-pc-windows-msvc.exe   Windows (v1.0.x 以降)
```

---

## tauri.ffmpeg.conf.json

`tauri.conf.json` に対するマージオーバーレイ。`externalBin` だけを追加する:

```json
{
  "$schema": "https://schema.tauri.app/config/2",
  "bundle": {
    "externalBin": ["binaries/ffmpeg"]
  }
}
```

Tauri がビルド時にターゲットトリプルを付加したバイナリ（例: `ffmpeg-aarch64-apple-darwin`）を検索し、バンドルする。

---

## リリース方針

| リリース種別 | ビルド種別 | ffmpeg |
|---|---|---|
| 通常リリース | 通常ビルド | システム ffmpeg 必須 |
| 安定版・キリ番 | サイドカービルド | 同梱（インストール不要） |
