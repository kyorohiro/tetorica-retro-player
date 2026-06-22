# Tauri バックグラウンド再生・UI 可視性の問題

調査日: 2026-06-22

---

## 問題1: 他のウィンドウで完全に隠れると再生が止まる（Mac）

### 現象
別アプリのウィンドウが Tauri ウィンドウを完全に覆うと、動画・音声の再生が停止する。
ウィンドウが再び見えると再生が再開される。

### 原因
`useRetroPixiStage.ts` の ticker は `window.requestAnimationFrame(tick)` ループで動いている。
macOS は別ウィンドウに完全に隠れると `document.hidden = true` になり、WebView の rAF を throttle・停止させる。
ticker が止まるとフレーム更新が止まり、再生が止まったように見える。

### 対応
`tick()` 内で `isTauriRuntime() && document.hidden` のとき `setTimeout(tick, 16)` にフォールバック。

```typescript
// useRetroPixiStage.ts
const isTauriRuntime = () =>
  typeof window !== "undefined" &&
  ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);

// tick() 内
if (isTauriRuntime() && document.hidden) {
  animationFrameRef.current = window.setTimeout(tick, 16) as unknown as number;
} else {
  animationFrameRef.current = window.requestAnimationFrame(tick);
}
```

`stopTicker` は `cancelAnimationFrame` と `clearTimeout` を両方呼ぶ。
rAF の ID と setTimeout の ID は別空間なので、どちらか一方は必ず no-op になるだけで安全。

```typescript
window.cancelAnimationFrame(animationFrameRef.current);
window.clearTimeout(animationFrameRef.current);
```

### tauri.conf.json との関係
`"backgroundThrottling": "disabled"` は WebView レベルの throttle を抑制するが、
macOS では完全には効かないケースがある。JavaScript 側の対処と両方置くのが安全。

```json
"backgroundThrottling": "disabled"
```

### 教訓
- `requestAnimationFrame` は `document.hidden = true` で止まる（OS・WebView の省電力機能）
- Tauri / Electron 等のデスクトップアプリで「隠れても動かし続けたい」処理は `setTimeout` ベースにするか、visibility フラグで切り替える
- `backgroundThrottling: "disabled"` は部分的な対策にすぎない。JS 側での対処が確実

---

## 問題2: AudioSettings を開くと AudioContext エラーがループする

### 現象
「Audio Settings」パネルを開くと "The AudioContext encountered an error from the audio device or the WebAudio renderer" が繰り返しコンソールに出力される。

### 原因
`useRetroAudioEngine.ts` がコンポーネントマウント時に `new AudioContext()` を即時生成していた。
Chrome はページ上の「最初のユーザージェスチャー」で **suspended 状態の AudioContext をすべて自動 resume** する。
「Audio Settings を開くボタンをクリック」が最初のジェスチャーになり、idle 状態の AudioContext が強制 resume → エラーループが発生。

### 対応
AudioContext の生成を遅延初期化（lazy init）に変更。
実際に音声処理が必要になったタイミング（メディアロード・再生開始時）に初めて `new AudioContext()` する。

```typescript
// before: マウント時に即時生成
audioContextOwnedRef = useRef(new AudioContext());

// after: 初回アクセス時に生成
const getOrCreateEngine = (): TetoricaRetroAudioNode => {
  if (!audioEngineRef.current) {
    const context = new AudioContext();
    audioContextOwnedRef.current = context;
    audioEngineRef.current = createRetroAudioEngine({ context, ... });
  }
  return audioEngineRef.current;
};
```

### 教訓
- Chrome の Autoplay Policy: ページ上に suspended な AudioContext があると、最初のユーザージェスチャーで全部 resume しようとする
- UI ボタンのクリックも「ユーザージェスチャー」扱いになる
- AudioContext は「使うとき」まで作らない。eager init は罠

---

## 問題3: Fixed ボタンがデスクトップ幅で隠れる

### 現象
ハンバーガーメニューボタン（`left-3`）は見えるが、隣の reload ボタン（`left-[3.85rem]`）が
デスクトップ幅では全く見えない。ウィンドウを狭くすると見える。

### 原因
2つのボタンをそれぞれ独立した `position: fixed, z-index: 30` として配置していた。
`RetroPreviewView` の button bar が `z-50` を持ち、`overflow-visible` なコンテナからはみ出して
reload ボタンの位置を覆っていた可能性が高い（完全な再現確認は困難）。

### 対応
2つのボタンを1つの `fixed` wrapper に入れ、z-index を `z-100` に統一。

```tsx
<div className="safe-top-offset fixed left-3 z-100 flex items-center gap-1">
  <button ... /* hamburger */ />
  <button ... /* reload */ />
</div>
```

### 教訓
- 独立した複数の `fixed` ボタンはそれぞれが他の `fixed`/`absolute` 要素に隠されうる
- 「グループとして表示したいボタン」は wrapper div でまとめ、z-index を一括管理する
- `overflow-visible` なコンテナ内の高 z-index 要素は意図せず他の fixed 要素を覆うことがある
