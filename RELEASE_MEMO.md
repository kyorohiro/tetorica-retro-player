# Release Memo

Update versions before release:

```sh
npm run version:set -- 0.25.6
```

```sh
sh deploy_mac.sh
~/bin/butler login
~/bin/butler push src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.25.6_aarch64.dmg kyorohiro/tetorica-retro-player:mac-apple-silicon --userversion 0.25.6
~/bin/butler push src-tauri/target/x86_64-apple-darwin/release/bundle/dmg/tetorica-retro-player_0.25.6_x64.dmg kyorohiro/tetorica-retro-player:mac-intel --userversion 0.25.6
~/bin/butler push "tetorica-retro-player_0.25.6_x64-setup.exe" kyorohiro/tetorica-retro-player:windows --userversion 0.25.6
~/bin/butler push "tetorica-retro-player_0.25.6_aarch64.AppImage" kyorohiro/tetorica-retro-player:linux-arm --userversion 0.25.6
~/bin/butler push "tetorica-retro-player_0.25.6_amd64.AppImage" kyorohiro/tetorica-retro-player:linux-intel --userversion 0.25.6
~/bin/butler push \
  "app-release-signed_0.25.6.apk" \
  kyorohiro/tetorica-retro-player:android \
  --userversion 0.25.6
```

Web build archive:

```sh
npm run build
cd dist
zip -r ../web-build_0.25.6_gh.zip .
```

Android build and signing:

```sh
npm run tauri android build -- --apk

~/Library/Android/sdk/build-tools/35.0.0/apksigner sign \
  --ks my-release-key.jks \
  --out app-release-signed_0.25.6.apk \
  src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
```
