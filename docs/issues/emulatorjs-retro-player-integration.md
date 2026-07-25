# EmulatorJS to Retro Player Integration Notes

## Goal

`EmulatorJS` を `Tetorica Retro Player` の既存 filter / effect パイプラインへ
入力 source として流したい。

理想形:

1. `NES ROM` を開く
2. `EmulatorJS` で再生する
3. その描画結果を `Retro Player` の video source として扱う
4. `CRT Beam` などの filter / effect をそのまま試せる

---

## Tried Approach

今回試したのは:

1. `EmulatorJS` を同一 origin の `iframe` で起動
2. `iframe` 内の描画 surface を探す
3. `canvas.captureStream()` で `MediaStream` 化
4. それを `Retro Player` の `previewVideoStream()` へ渡す

実装上は次を試した:

- host page から `postMessage` で canvas ready 通知
- parent 側から `iframe.contentWindow` / `contentDocument` を直接走査
- nested `iframe` の再帰探索
- `shadowRoot` 内の探索
- `Module.canvas` の参照
- `Document.createElement("canvas")` フックで生成 canvas を追跡
- cross-realm `instanceof HTMLCanvasElement` 問題の回避

---

## What Happened

`EmulatorJS` 自体は起動していた。

確認できたこと:

- `loader.js`
- `emulator.min.js`
- language loading
- host page 側の debug script
- `canvas created`
- `canvas ready`

までは動いていた。

しかし parent 側では、
`Retro Player` に渡せる安定した描画 surface を最後まで取得できず、
最終的に `jsnes` fallback へ落ちた。

---

## Why This Is Hard

後付け `captureStream()` 路線が難しい理由:

1. `EmulatorJS` の描画 surface が単純な「host document 直下の canvas」
   とは限らない
2. 内部構造が build / core / runtime に依存して変わる可能性がある
3. `iframe` / nested `iframe` / internal wrapper / custom element をまたぐ
   と、外側から安定して参照しづらい
4. 同一 origin でも cross-realm object 判定が落とし穴になる
5. 「起動している」ことと「こちらが所有できる描画 source を得られる」
   ことは別問題

つまり、

- Emulator が動く
- 後から Retro Player の source として再利用できる

は、別の難しさを持っている。

---

## Current Conclusion

`EmulatorJS` を `iframe` で動かして、
外から `canvas.captureStream()` を後付けする方法は、
少なくとも現時点では安定解として弱い。

`Retro Player` の filter / effect テスト対象として本気で使うなら、
次のような「描画先をこちらが所有する」方向の方が有望。

### Candidate Directions

1. `libretro core` を直接扱う
2. emulator 側の frame buffer / canvas をこちらが生成する構成にする
3. 最初から `Raw frame` / `Canvas` / `WebGL texture` をこちらが管理する

---

## Practical Takeaway

次にこの話を再開する時は、次のように説明すると良い:

`EmulatorJS` 自体は NES / MMC5 タイトルを動かせたが、
Retro Player の既存 video pipeline に後付け `captureStream()` で
安定接続するのは難しかった。
描画 surface を外から掴むのではなく、
core か renderer をこちらが直接持つ方式を検討したい。

---

## Related Files

- `public/emulatorjs/nes.html`
- `src/retro-player-client/builtin-content/emulatorjs-session.ts`
- `src/retro-player-client/builtin-content/nes-session.ts`
- `src/retro-player-client/RetroPlayerClient.tsx`
