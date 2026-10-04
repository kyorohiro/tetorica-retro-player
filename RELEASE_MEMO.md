# Release Memo

Update versions before release:

```sh
npm run version:set -- 0.44.7
```

```sh
sh deploy_mac.sh
~/bin/butler login
~/bin/butler push target/aarch64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.44.7_aarch64.dmg kyorohiro/tetorica-retro-player:mac-apple-silicon --userversion 0.44.7
~/bin/butler push target/x86_64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.44.7_x64.dmg kyorohiro/tetorica-retro-player:mac-intel --userversion 0.44.7
~/bin/butler push "tetorica-retro-player_0.44.7_x64-setup.exe" kyorohiro/tetorica-retro-player:windows --userversion 0.44.7
~/bin/butler push "tetorica-retro-player_0.44.7_aarch64.AppImage" kyorohiro/tetorica-retro-player:linux-arm --userversion 0.44.7
~/bin/butler push "tetorica-retro-player_0.44.7_amd64.AppImage" kyorohiro/tetorica-retro-player:linux-intel --userversion 0.44.7
~/bin/butler push \
  "app-release-signed_0.44.7.apk" \
  kyorohiro/tetorica-retro-player:android \
  --userversion 0.44.7
```

Web build archive:

```sh
npm run build
cd dist
zip -r ../web-build_0.44.7_gh.zip .
```

## 未リリース: macOS / Windows 共通ネイティブキャプチャー

- 両OSで同じRustパッケージ `scap 0.1.0-beta.1` を使用。Swiftブリッジを置き換え、対象選択・JPEG/PCM変換・停止を `src-native-capture` に共通化。
- macOS 13以降: ウィンドウはアプリ音声、画面はシステム音声。自アプリの音声は除外。初回は「画面収録とシステムオーディオ録音」の権限が必要。
- Windows: 映像は選択したウィンドウ／画面。音声は既定の出力デバイス全体（他アプリの音声も含む）。自アプリの音声を除外できないのでモニターミュートで確認する。
- デバッグ時もキャプチャー変換を最適化。JPEG変換のローカル計測は約300〜385msから約23〜58msへ短縮。200ms以上古い受信映像は破棄して表示遅延の蓄積を防ぐ。
- 最大辺1280px・30fps。既存のフィルター／Audio FX／録画に接続。Browser/Linux/mobileは従来のBrowser APIを使用。
- `scap` は音声対応がベータ版のため、停止待ち、音声配列、Windows依存APIなどを補正して `third_party/scap` に固定。更新方法・差分は [メンテナンス手順](docs/native-capture.md) を参照。
- WindowsビルドはGitHub Actionsの「Build Desktop」を手動実行し、`windows-test-installers-*` artifactから `.exe` を取得する。実機では別アプリの音声を録画・保存し、停止・再選択・ウィンドウ終了・リサイズ・Audio FX ON/OFFを確認する。
- 問題が出たら More メニューの「キャプチャー診断ログを保存」でJSONを取得。`native-audio` のピーク値はサンプル受信を示す。音声トラックの存在だけでは録音成功を保証しない。
- ローカル検証: mac版Rustビルド・音声変換テスト、mac上のWindows向けRust型チェック、frontend型チェック・キャプチャーテスト。保存ファイルの音声、長時間同期、Windows実機は別途確認する。

## v0.44.7 Changes

- Playlist: D&D / Open With で複数ファイル → Auto Next / Loop All モード時に連続再生
- SkipBack / SkipForward 長押しで前/次トラックへ移動
- Loop ボタン 4段階: Loop 1 → Auto Next → Loop All → No loop
- Tauri「このアプリで開く」対応 (ファイルアソシエーション: 動画/音声/画像)
- 再生失敗時に「ffmpegで再生」ボタンを表示 (src-not-supported エラー時)
- モバイル長押し時のコンテキストメニュー抑制
- ffmpeg HLS変換時に奇数ピクセル幅/高さの動画 (mpg等) でエラーになる問題を修正

---

Android build and signing:

```sh
npm run tauri android build -- --apk

~/Library/Android/sdk/build-tools/35.0.0/apksigner sign \
  --ks my-release-key.jks \
  --out app-release-signed_0.44.7.apk \
  src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
```

Android notes:

- Android では `mdrop` を無効化
- Android では `ffmpeg` を無効化
