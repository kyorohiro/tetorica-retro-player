# Release Memo

Update versions before release:

```sh
npm run version:set -- 0.32.2
```

```sh
sh deploy_mac.sh
~/bin/butler login
~/bin/butler push target/aarch64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.32.2_aarch64.dmg kyorohiro/tetorica-retro-player:mac-apple-silicon --userversion 0.32.2
~/bin/butler push target/x86_64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.32.2_x64.dmg kyorohiro/tetorica-retro-player:mac-intel --userversion 0.32.2
~/bin/butler push "tetorica-retro-player_0.32.2_x64-setup.exe" kyorohiro/tetorica-retro-player:windows --userversion 0.32.2
~/bin/butler push "tetorica-retro-player_0.32.2_aarch64.AppImage" kyorohiro/tetorica-retro-player:linux-arm --userversion 0.32.2
~/bin/butler push "tetorica-retro-player_0.32.2_amd64.AppImage" kyorohiro/tetorica-retro-player:linux-intel --userversion 0.32.2
~/bin/butler push \
  "app-release-signed_0.32.2.apk" \
  kyorohiro/tetorica-retro-player:android \
  --userversion 0.32.2
```

Web build archive:

```sh
npm run build
cd dist
zip -r ../web-build_0.32.2_gh.zip .
```

## v0.32.2 Changes

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
  --out app-release-signed_0.32.2.apk \
  src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
```

Android notes:

- Android では `mdrop` を無効化
- Android では `ffmpeg` を無効化
