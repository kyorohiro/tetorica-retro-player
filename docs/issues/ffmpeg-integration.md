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

#### WebView2 での HLS 再生と Web Audio の動作（確認済み: Media Foundation 経由）

Windows Tauri は WebView2（Edge/Chromium ベース）を使用する。
実装で確認した結果、**WebView2 の HLS 再生は Windows Media Foundation にネイティブ委譲される**
（macOS の AVFoundation と同じ構造）。`createMediaElementSource` を呼んでもオーディオが流れず、
Web Audio エフェクターは効かない。

`useRetroPreviewMedia.ts` の `shouldBypassWebAudioForMedia` / `shouldUseNativeVideoSurfaceForMedia` で
Windows Tauri + `.m3u8` を検出し、Web Audio 接続を諦めてネイティブ音声出力・ネイティブ `<video>` 描画に
フォールバックする対処が入っている。

→ 詳細は [`windows-tauri-hls-webaudio-bypass.md`](windows-tauri-hls-webaudio-bypass.md)、
macOS 側の同種の問題は [`wkwebview-hls-webaudio.md`](wkwebview-hls-webaudio.md) 参照。

---

### サイドカービルド（macOS）

#### ffmpeg バイナリの準備

##### Apple Silicon ネイティブ版の取得・確認（2026-09-12 追記）

ARM64 の静的ビルドは次の配布元から取得できる。自前ビルドは必須ではない。

- [OSXExperts](https://www.osxexperts.net/): **Apple Silicon** の ffmpeg を選ぶ。確認時点では「Download ffmpeg 9.0 (Apple Silicon)」。
- [Martin Riedl](https://ffmpeg.martin-riedl.de/): **macOS / Apple Silicon・arm64** の ffmpeg を選ぶ。安定版を試す場合は release を選択する。

取得先は確認済みだが、このプロジェクトでの新しい ARM64 バイナリの実行・同梱検証はこれから行う。以前動作確認した ARM 版がどちらの配布元だったかは未特定。

調査時の `src-tauri/binaries/ffmpeg-aarch64-apple-darwin` は、名前に反して中身が **x86_64** だった。以下の旧手順で Intel 版を両方に配置した構成なので、ファイル名だけでは判断しない。

1. 上記サイトから Apple Silicon / arm64 の ZIP を取得・展開する。
2. 展開した実行ファイルを確認する。以下のパスは実際の展開先に置き換える。

```bash
file /展開先/ffmpeg
# Mach-O 64-bit executable arm64 であること

otool -L /展開先/ffmpeg
# /opt/homebrew/、/usr/local/、配布元のビルド環境などへの依存がないか確認
# /usr/lib/ や /System/Library/ の macOS 標準ライブラリへの依存はあり得る

chmod +x /展開先/ffmpeg
/展開先/ffmpeg -version
/展開先/ffmpeg -hide_banner -encoders
# 本体の HLS 変換で使う libx264、aac などを確認
```

3. リポジトリのルートで既存ファイルを退避し、ARM 版だけを置き換える。

```bash
# 退避先は毎回別ディレクトリになる
ffmpeg_backup_dir=$(mktemp -d /tmp/tetorica-ffmpeg-backup.XXXXXX)
cp src-tauri/binaries/ffmpeg-aarch64-apple-darwin "$ffmpeg_backup_dir/"
echo "$ffmpeg_backup_dir"

cp /展開先/ffmpeg src-tauri/binaries/ffmpeg-aarch64-apple-darwin
chmod +x src-tauri/binaries/ffmpeg-aarch64-apple-darwin
file src-tauri/binaries/ffmpeg-aarch64-apple-darwin
src-tauri/binaries/ffmpeg-aarch64-apple-darwin -version
shasum -a 256 src-tauri/binaries/ffmpeg-aarch64-apple-darwin
```

Intel 向けの `ffmpeg-x86_64-apple-darwin` はそのまま残す。配布元URL、取得バージョン、SHA-256、`-version` のビルド構成を控えておくと再取得しやすい。同梱する際は、取得したビルドに合わせてライセンス表記・対応ソースの案内も確認する。

4. 以下のサイドカービルド手順で ARM64 向けにビルドし、アプリから HLS 変換・再生を試す。`-version` が動くだけではアプリ同梱時の動作確認にはならない。

##### 旧運用: Intel 版を Rosetta で実行

以下は過去の配置手順。**ARM64 版を配置した後に実行すると、Intel 版で上書きするため注意。**

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


ffmpeg_dir=$(mktemp -d /tmp/ffmpeg-arm64.XXXXXX)

curl -fL "https://www.osxexperts.net/ffmpeg9arm.zip" \
  -o "$ffmpeg_dir/ffmpeg.zip"

unzip "$ffmpeg_dir/ffmpeg.zip" -d "$ffmpeg_dir"

file "$ffmpeg_dir/ffmpeg"
shasum -a 256 "$ffmpeg_dir/ffmpeg"


# 両アーキテクチャ向けに配置（同じバイナリを使用）
cp /tmp/ffmpeg src-tauri/binaries/ffmpeg-x86_64-apple-darwin
cp /tmp/ffmpeg src-tauri/binaries/ffmpeg-aarch64-apple-darwin
chmod +x src-tauri/binaries/ffmpeg-x86_64-apple-darwin
chmod +x src-tauri/binaries/ffmpeg-aarch64-apple-darwin
```

##### サイドカービルドの実行

1. 現在のターゲットトリプルを確認:

```bash
rustc -Vv | grep host | awk '{print $2}'
# 例: aarch64-apple-darwin
```

2. ビルド実行:

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

---

## HLS 変換パフォーマンス測定

Windows での ffmpeg HLS 変換が実用的かどうかを手動で確認するためのコマンド集。

### Phase 1: コピーモード（推奨・軽量）

ソースが H.264/AAC の場合、再エンコードなしでコンテナだけ変換する。CPU 負荷はほぼゼロ。

```powershell
# 作業ディレクトリを作成
mkdir C:\tmp\hls-test
cd C:\tmp\hls-test

# コピーモードで変換
ffmpeg -y -i "C:\path\to\input.mkv" `
  -c:v copy -c:a aac -b:a 128k `
  -f hls -hls_time 2 -hls_list_size 0 `
  -hls_segment_filename seg%03d.ts `
  index.m3u8
```

**確認ポイント:**
- 出力の `speed=Xx` — `speed=20x` 以上なら軽量（再エンコードなし）
- 最初の `seg000.ts` が出るまでの秒数（再生開始までの遅延）

### Phase 2: 再エンコードモード（フォールバック）

H.265/AV1 等コピー不可の場合に使う。`ultrafast` でも CPU を多く使う。

```powershell
ffmpeg -y -i "C:\path\to\input.mkv" `
  -c:v libx264 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" `
  -preset ultrafast -tune zerolatency `
  -c:a aac -b:a 128k `
  -f hls -hls_time 2 -hls_list_size 0 `
  -hls_segment_filename seg%03d.ts `
  index.m3u8
```

**確認ポイント:**
- `speed=` が `1x` を下回る場合、リアルタイム変換ができていない（再生が追いつかない）

### ブラウザで再生する

変換した `.m3u8` は直接ブラウザで開けないため、ローカル HTTP サーバーが必要。

```powershell
# Python 3 でサーバーを立てる（C:\tmp\hls-test で実行）
python -m http.server 8080
```

起動後、以下の HTML を `C:\tmp\hls-test\player.html` として保存してブラウザで開く:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HLS Test</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
</head>
<body>
  <video id="v" controls style="width:100%;max-width:960px"></video>
  <script>
    const video = document.getElementById('v');
    const src = 'http://localhost:8080/index.m3u8';
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari / WebView2 ネイティブ HLS
      video.src = src;
    }
  </script>
</body>
</html>
```

ブラウザで `http://localhost:8080/player.html` を開く。

> **WebView2 (Windows Tauri) の注意点**  
> Chromium は HLS をネイティブ再生できないため hls.js 経由になる。  
> hls.js は MSE (Media Source Extensions) を使うため Web Audio エフェクターは動作する。  
> ただし WebView2 の MSE が MPEG-TS セグメントをどこまでサポートするかは要確認。

### パフォーマンス判断基準

| speed= | 評価 |
|--------|------|
| 20x 以上 | コピーモード成功（コーデック変換なし） |
| 5x〜20x | 再エンコードだが PC に余裕あり |
| 1x〜5x  | ギリギリ。バッファ不足で途切れる可能性 |
| 1x 未満 | リアルタイム変換不可。再生が止まる |


-y -i "17.mp4" `
  -c:v libx264 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" `
  -preset ultrafast -tune zerolatency `
  -c:a aac -b:a 128k `
  -f hls -hls_time 2 -hls_list_size 0 `
  -hls_segment_filename seg%03d.ts `
  index.m3u8
