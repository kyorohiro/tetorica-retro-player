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



```
const video = [...document.querySelectorAll('video')]
  .filter(v => !v.paused && v.readyState >= 2)
  .sort((a, b) => {
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    return br.width * br.height - ar.width * ar.height;
  })[0];

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.zIndex = '2147483647';
canvas.style.pointerEvents = 'none';

document.body.appendChild(canvas);

function loop() {
  const r = video.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.style.left = `${r.left}px`;
  canvas.style.top = `${r.top}px`;
  canvas.style.width = `${r.width}px`;
  canvas.style.height = `${r.height}px`;

  const w = Math.max(1, Math.floor(r.width * dpr));
  const h = Math.max(1, Math.floor(r.height * dpr));

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  ctx.drawImage(video, 0, 0, w, h);

  requestAnimationFrame(loop);
}

loop();
```

```
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
```

```
const btn = document.createElement('button');
btn.textContent = 'Control';
btn.style.position = 'fixed';
btn.style.right = '16px';
btn.style.top = '16px';
btn.style.zIndex = '2147483647';
btn.style.opacity = '0.5';
document.body.appendChild(btn);

let effectOn = true;

btn.onclick = () => {
  effectOn = !effectOn;

  canvas.style.display = effectOn ? 'block' : 'none';
  video.style.opacity = effectOn ? '0' : '1';
  btn.textContent = effectOn ? 'Control' : 'Effect';
};
```




```
cd examples && npm install -D playwright && npx playwright install chromium && npm run video:webgl2:test
```