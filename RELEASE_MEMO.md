# Release Memo

Update versions before release:

```sh
npm run version:set -- 0.52.3
```

```sh
sh deploy_mac.sh
~/bin/butler login
~/bin/butler push target/aarch64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.52.3_aarch64.dmg kyorohiro/tetorica-retro-player:mac-apple-silicon --userversion 0.52.3
~/bin/butler push target/x86_64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.52.3_x64.dmg kyorohiro/tetorica-retro-player:mac-intel --userversion 0.52.3
~/bin/butler push "tetorica-retro-player_0.52.3_x64-setup.exe" kyorohiro/tetorica-retro-player:windows --userversion 0.52.3
~/bin/butler push "tetorica-retro-player_0.52.3_aarch64.AppImage" kyorohiro/tetorica-retro-player:linux-arm --userversion 0.52.3
~/bin/butler push "tetorica-retro-player_0.52.3_amd64.AppImage" kyorohiro/tetorica-retro-player:linux-intel --userversion 0.52.3
~/bin/butler push \
  "app-release-signed_0.52.3.apk" \
  kyorohiro/tetorica-retro-player:android \
  --userversion 0.52.3
```

Web build archive:

```sh
npm run build
cd dist
zip -r ../web-build_0.52.3_gh.zip .
```

## 未リリース: ウィンドウ録画

- 通常のキャプチャー・プレビュー・加工録画は従来のBrowser APIを使用。共有音声の録音はOS・ブラウザーの制限を受け、mac版のウィンドウ共有では録音できない。
- デスクトップ版に「ウィンドウを録画」を追加。対象とMP4保存先を選び、停止で保存完了。常時プレビューは行わず、対象確認用の縮小静止画を約3秒ごとに更新。
- 共通Rust/scap＋ffmpegで加工前の映像・音声を保存。IPC/HLSネイティブプレビューは使用しない。
- macはアプリ音声（自音声除外）、Windowsは既定の出力デバイス全体。他アプリの音も入る。
- 設定・保守・検証は [native-capture.md](docs/native-capture.md) を参照。
