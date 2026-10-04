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

## 未リリース: macOS ネイティブキャプチャー試作

- macOS 14以降のDesktop版でScreenCaptureKitによるウィンドウ・画面キャプチャーを使用。ウィンドウ音声はアプリ単位、画面音声はシステム音声。自アプリの音声は除外。
- 最大辺1280px・30fpsで既存のフィルター／Audio FX／録画へ接続。Browser版・ほかのOSは従来の取得経路。
- mac版ビルド、型チェック、106件のテストが通過。実機では映像プレビューと音声トラックの存在を確認。別アプリの音声が保存ファイルに入ること、長時間の音ズレ、Intel Mac・旧macOSでの動作は未確認。
- 実機確認: 音の鳴る別アプリを選び、モニターミュートONで録画・保存して音声を確認。Native表示／フィルターON、Audio FX ON/OFF、停止・再選択・OS側の共有停止も確認する。Consoleの `[retro capture audio]` の `native-audio` はサンプル受信・ピーク値を示す（`acquired` の音声トラック数だけでは音声の取得を保証しない）。

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
