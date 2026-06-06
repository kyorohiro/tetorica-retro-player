# Android

```
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_HOME="$ANDROID_HOME/ndk/$(ls -1 $ANDROID_HOME/ndk)"

rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android


tauri android init
npm run tauri android build -- --apk

keytool -genkeypair \
  -v \
  -keystore my-release-key.jks \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias my-key-alias

~/Library/Android/sdk/build-tools/35.0.0/apksigner sign \
  --ks my-release-key.jks \
  --out app-release-signed.apk \
  src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk

adb install -r app-release-signed.apk


find ~/Library/Android/sdk/build-tools -name apksigner

adb install app-release-signed.apk

npm run tauri android dev
```



https://chrome.google.com/webstore/devconsole/
