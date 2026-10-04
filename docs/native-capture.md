# Desktop native capture maintenance

macOS と Windows は同じ `src-native-capture` パッケージを通して `scap` を使用します。
Tauri 側はセッション管理とIPC、frontend は対象選択と MediaStream 生成を担当します。
映像はJPEG、音声はインターリーブfloat32 PCMにそろえ、既存の加工・録画へ渡します。

| 環境 | 映像 | 音声 |
| --- | --- | --- |
| macOS 13+ | ScreenCaptureKitの画面／ウィンドウ | 画面はシステム音声、ウィンドウはアプリ音声。自プロセス音声は除外 |
| Windows | Windows.GraphicsCaptureの画面／ウィンドウ | CPAL/WASAPIの既定出力デバイス全体。自プロセスも含む |
| Browser / Linux / mobile | 従来のgetDisplayMedia | Browser APIの提供範囲 |

両OSの音声の取得範囲は完全には一致しません。Windowsではモニターミュートを維持してください。
選択画面にも取得範囲を表示します。macの初回権限はシステム設定で許可し、アプリを再起動します。

## 固定した依存パッケージ

音声対応の crates.io `scap 0.1.0-beta.1` を `third_party/scap` に保存し、workspaceの
`[patch.crates-io]` で使用しています。MITライセンスを同梱し、アプリのライセンス一覧にも含めます。
公開パッケージのrepositoryは `https://github.com/helmerapp/scap`、元revisionは
`f9a62144bf1011e29ffa6ac1f49e5e0d020ca40a` です。最新stable 0.0.8への単純な変更では音声対応が失われます。

公開版への変更は `third_party/scap/LOCAL.patch` に記録しています。

- 受信タイムアウトとOSの終了通知: 静止画面・無音時も停止要求を処理する。
- nativeフレーム／Windows音声コールバックのキューを8件に制限し、満杯なら破棄する。
  Tauri IPCは別途32件に制限する。遅いwebviewへ無制限に蓄積しない。
- mac音声のplanar指定、48kHz/2ch設定と自プロセス音声の除外。
- macの候補を画面上の通常ウィンドウに絞り、タイトルなしではアプリ名を表示。
- macの外部ウィンドウ寸法をSCWindowから取得（NSAppは自アプリのウィンドウしか返さない）。
- macの対応OS判定を数値比較に変更し、音声対応の13以降に制限。
- Windows依存 `windows-capture 1.5.0` のAPIに合わせた設定順と時刻取得。
- Windows映像のrow padding除去、固定サイズの全画面cropを外しリサイズに対応。
- 終了後のWindows音声コールバックで、受信先終了によるpanicを避ける。

独自のSwift/C++/WASAPI実装は持ちません。ただしベータ版の上記補正は更新時に再確認が必要です。

## 表示遅延の確認

`cargo run -p tetorica-native-capture --example encoding_latency` でキャプチャー前処理とJPEG変換を測れます。
workspace の `profile.dev.package` で共通コード・scap・imageを最適化し、`tauri dev` でもリアルタイム処理を維持します。
受信映像が200ms以上古い場合は破棄して追いつきます（静止した共有元の初回映像は保持）。

## macから行う確認

```sh
cargo test -p tetorica-native-capture --locked
cargo check -p tetorica-retro-player --locked
npm test -- src/retro-player/media/nativeDisplayCapture.test.ts src/retro-player/media/nativeCaptureProtocol.test.ts src/retro-player/media/displayCaptureOptions.test.ts
npm run build

# 初回のみ標準ライブラリを追加。型チェックはWindowsを起動せず実行できる。
rustup target add x86_64-pc-windows-gnu
cargo check -p tetorica-native-capture --target x86_64-pc-windows-gnu --locked
```

Windows向けのチェックは共通パッケージの型チェックです。Windowsアプリ全体のリンク・インストーラー作成は
GitHub Actionsの **Build Desktop** を手動実行します。`windows-test-installers-*` artifactの
`.exe` を動作確認用PCに入れれば、PC上に開発環境を置く必要はありません。

実機では、別アプリで音を再生してキャプチャーし、モニターミュートONで保存します。
保存ファイルの音声、左右チャンネル、停止／再選択、対象ウィンドウ終了、リサイズ、
Audio FX ON/OFF、長時間の同期、Windowsでは別アプリの音が混じる仕様を確認してください。
More メニューの「キャプチャー診断ログを保存」は最大120件のイベントをJSONに保存します。
音声サンプル・ウィンドウ名を含めず、音声の受信状況・ピーク値・OS情報を確認できます。

## scapの更新手順

1. 新版の音声対応とライセンスを確認し、元パッケージを別ディレクトリに展開する。
2. `LOCAL.patch` の各補正が新版に取り込まれたかを確認する。必要な補正だけ適用する。
3. `third_party/scap` のソース・manifest・ライセンスを置き換え、元version/revisionと差分を更新する。
4. `src-native-capture/Cargo.toml` のversionを変更し、Cargo.lockを更新する。
5. 上記ローカル確認、mac実機確認、GitHub Actionsビルド、Windows実機確認を行う。

Windows上の開発は不要ですが、OS固有の実行時動作はWindows実機で確認する必要があります。
