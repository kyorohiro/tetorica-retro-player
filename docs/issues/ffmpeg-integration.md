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

### サイドカービルド（Windows）

#### ffmpeg バイナリの準備

Windows 向けには **BtbN/FFmpeg-Builds** が GPL 静的ビルドを提供している。
`ffmpeg-master-latest-win64-gpl.zip` 内の `ffmpeg.exe` を使用する。

```powershell
# PowerShell で取得する場合
Invoke-WebRequest -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -OutFile ffmpeg-win64.zip
Expand-Archive ffmpeg-win64.zip -DestinationPath ffmpeg-win64
copy ffmpeg-win64\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe src-tauri\binaries\ffmpeg-x86_64-pc-windows-msvc.exe
```

#### Windows SmartScreen への対応

macOS の GateKeeper と同様に、Windows SmartScreen が初回起動時にブロックする可能性がある。
macOS では `ffmpeg -version` を事前実行する pre-warm 機構で対処しているが、
SmartScreen は**実行回数・評判ベース**のチェックのため同じ手法では回避できない。

| 項目 | macOS GateKeeper | Windows SmartScreen |
|------|-----------------|---------------------|
| チェック方式 | コード署名の有無 | 署名 + 評判（ダウンロード数等） |
| pre-warm で回避 | ✅ 初回のみ遅延を吸収 | ❌ 評判がないと毎回ブロックの可能性 |
| 根本解決 | 署名（公証） | アプリ全体のコード署名 |

**現状の方針**: サイドカービルドをリリースする場合はアプリ全体をコード署名する。
未署名の開発ビルドでは SmartScreen の警告が出ることを許容する。

> **TODO**: Windows コード署名の仕組みを整備する（証明書取得・署名手順）。

#### ビルドコマンド（Windows）

Windows マシン上でビルドする場合:

```powershell
# サイドカービルド
npx tauri build --config src-tauri/tauri.ffmpeg.conf.json -- --features ffmpeg-sidecar

# 通常ビルド（システム ffmpeg）
npx tauri build
```

#### WebView2 での HLS 再生と Web Audio の動作（要確認）

Windows Tauri は WebView2（Edge/Chromium ベース）を使用する。
Chromium は HLS をネイティブサポートしていないが、Edge は Windows Media Foundation 経由で
HLS を再生できる可能性がある。WebView2 がこれを継承するかは **未確認**。

| ケース | 状況 | Web Audio エフェクター |
|--------|------|----------------------|
| WebView2 が HLS を再生できない | `.m3u8` が再生不可 | — |
| WebView2 が MSE 経由で HLS 再生 | hls.js 相当の挙動 | ✅ 効く |
| WebView2 が Media Foundation 経由で HLS 再生 | macOS の AVFoundation と同じ構造 | ❌ 効かない可能性 |

Windows で ffmpeg HLS を実際に動かして検証が必要。
→ 詳細は [`wkwebview-hls-webaudio.md`](wkwebview-hls-webaudio.md) 参照。

---

### サイドカービルド（macOS）

#### ffmpeg バイナリの準備

evermeet.cx は **x86_64（Intel）の静的ビルド**のみ提供している。
Homebrew の ffmpeg は `/opt/homebrew/` への動的リンクが多く、配布アプリには使用不可。

**v1.0.x 方針**: x86_64 静的バイナリを両アーキテクチャに配置する。
- Intel Mac → ネイティブ実行
- Apple Silicon Mac → Rosetta 2 で実行（動作確認済み）

```bash
# evermeet.cx から x86_64 静的ビルドをダウンロード
curl -L "https://evermeet.cx/ffmpeg/ffmpeg-7.1.zip" -o /tmp/ffmpeg.zip
unzip /tmp/ffmpeg.zip -d /tmp/

# アーキテクチャを確認（x86_64 であることを確認）
file /tmp/ffmpeg

# 両アーキテクチャ向けに配置（同じバイナリを使用）
cp /tmp/ffmpeg src-tauri/binaries/ffmpeg-x86_64-apple-darwin
cp /tmp/ffmpeg src-tauri/binaries/ffmpeg-aarch64-apple-darwin
chmod +x src-tauri/binaries/ffmpeg-x86_64-apple-darwin
chmod +x src-tauri/binaries/ffmpeg-aarch64-apple-darwin
```

> **TODO（将来）**: Apple Silicon ネイティブ実行のためには ARM64 静的ビルドが必要。
> evermeet.cx は ARM64 未提供のため、ソースからのスタティックビルドが必要。

1. 現在のターゲットトリプルを確認:

```bash
rustc -Vv | grep host | awk '{print $2}'
# 例: aarch64-apple-darwin
```

2. ビルド実行:

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
