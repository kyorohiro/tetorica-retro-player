# ブラウザ・バックグラウンド時の音声トラブル

調査日: 2026-06-23

---

## 背景: HTMLMediaElement vs Web Audio API のバックグラウンド挙動の違い

| 手段 | バックグラウンド時の挙動 |
|---|---|
| `HTMLMediaElement`（`<video>`/`<audio>`）| Safari/WebKit は window がフォーカスを失うと native pause する |
| Web Audio API（`OscillatorNode` 等） | AudioContext が running のまま継続再生される |

アラーム音（`OscillatorNode` ベース）は window が背面になっても鳴り続けるが、
動画再生（`HTMLMediaElement`）は止まる。この非対称性が混乱の元になった。

---

## 問題1: `suspend` イベントで音が消える

### 現象
動画再生中に別ウィンドウを前面に出すと映像は動き続けるのに音だけ消える。
再度 window を前面に戻しても音が戻らない。

### 原因
Safari は window がバックグラウンドに入ると `HTMLMediaElement` に `suspend` イベントを発火する。
`suspend` イベントのハンドラに `quietAudioOutputImmediately()` を登録していたため、
`masterGain` / `noiseGain` が 0 にセットされた。

`quietAudioOutputImmediately` は gain をランプで 0 にするだけで、
復元するのは `updateAudioNodes()` や `recoverAudioOutput()` が呼ばれた時だけ。
バックグラウンドから戻った後に適切な recovery が走らなければ音が消えたまま残る。

`suspend` イベントが発火するのは:
- ネットワーク停止（バッファ済みでこれ以上 fetch が不要）
- ブラウザがバックグラウンド処理を節約する時（← 今回の問題）
- seek 直前・ストール時

```
window が背面に移る
  → media に "suspend" 発火
  → quietAudioOutputImmediately() → masterGain = 0
  → 音が消える
  → timeupdate が届かなくなり updateAudioNodes() も呼ばれない
  → 永続的に無音
```

### 対応
`suspend` ハンドラに `document.visibilityState` チェックを追加し、
バックグラウンド状態では `quietAudioOutputImmediately` をスキップする。

```typescript
// useRetroPreviewMedia.ts
media.addEventListener("suspend", () => {
  if (typeof document === "undefined" || document.visibilityState === "visible") {
    quietAudioOutputImmediately();
  }
});
```

---

## 問題2: `visibilitychange:hidden` と `pause` イベントの race condition

### 現象
window を背面に移した後に前面に戻すと、動画が再開されない（再生ボタンが押さずに止まったまま）。

### 原因
`visibilitychange:hidden` ハンドラで「バックグラウンド前の再生状態」を保存し、
`visibilitychange:visible` で `shouldResume = wasPlayingBeforeBackground` を参照して再開する設計だった。

問題は Safari の `pause` イベントが `visibilitychange:hidden` より**先に**発火することがある点。

```
タイミング A（正常系）:
  1. visibilitychange:hidden  → wasPlayingBefore = isPlayingRef = true
  2. media "pause" イベント   → syncVideoState → isPlayingRef = false
  → visible 時 shouldResume = true → 再開 ✓

タイミング B（問題）:
  1. media "pause" イベント   → syncVideoState → isPlayingRef = false  ← 先に来る
  2. visibilitychange:hidden  → wasPlayingBefore = isPlayingRef = false ← すでに false
  → visible 時 shouldResume = false → 再開されない ✗
```

イベントの順序は仕様で保証されていないため、どちらのタイミングも起きうる。

### 対応
`window.blur` は Safari の native `media.pause` より確実に先に発火する。
`blur` ハンドラで `isPlayingRef.current`（まだ正しい値）を保存することで race を回避。

```typescript
// usePixiVideoPlayer.ts
const handleWindowBlur = () => {
  if (!isPlayableKind(previewKindRef.current)) return;
  // pause イベントより前に発火するため isPlayingRef はまだ正しい値
  wasPlayingBeforeBackgroundRef.current = isPlayingRef.current;
};

window.addEventListener("blur", handleWindowBlur); // Safari のみ
```

`visibilitychange:hidden` では blur が設定済みなら上書きしない:

```typescript
} else {
  // Safari: blur がすでに正しい値を保存済み。
  // blur が発火しなかったケースへのフォールバックとしてのみ更新。
  if (!wasPlayingBeforeBackgroundRef.current) {
    wasPlayingBeforeBackgroundRef.current = isPlayingRef.current;
  }
}
```

---

## 問題3: `visibilitychange` が発火しない window 重なりケース

### 現象
「タブ切り替え」ではなく「別アプリの window が手前に来ただけ」のとき、
`visibilityState` が `"hidden"` にならず recovery handler が動かない。

### 状況整理

| 操作 | `visibilitychange` | `blur`/`focus` |
|---|---|---|
| タブ切り替え | 発火 | 発火 |
| 別アプリに Cmd+Tab | 発火（Tauri / macOS では発火） | 発火 |
| 別ウィンドウが前面に来た | 発火しないことがある | 発火 |

### 対応
`window.focus` でも recovery を走らせる。
`visibilityState` がすでに `"visible"` のケースに限定することで
`visibilitychange:visible` との二重実行を防ぐ。

```typescript
const handleWindowFocus = () => {
  // visibilitychange:visible が走るケースは任せる
  if (document.visibilityState === "hidden") return;

  const media = mediaRef.current;
  const shouldResume = wasPlayingBeforeBackgroundRef.current && media?.paused;
  if (!shouldResume) {
    wasPlayingBeforeBackgroundRef.current = false;
    return;
  }

  setTimeout(() => { void doResume("window:focus"); }, 80);
};

window.addEventListener("focus", handleWindowFocus);
```

---

## 問題4: `MediaElementAudioSourceNode` の一要素一ノード制約

### 現象
アラームが鳴った後に通常再生に戻ると音が全く出なくなる。ページリロードでも治らない。
タブを削除して新規タブを開くと治る。

### 原因
`AudioContext.createMediaElementSource(media)` は **1つの media 要素につき1回しか呼べない**。
2回目を呼ぶと `InvalidStateError` が投げられ、かつ元の `MediaElementAudioSourceNode` も破壊される。

再生中に AudioContext が suspend → resume するシナリオで、
`playVideoWithAudio()` が `ensureAudioContext()` を呼び再接続を試みると
「hidden かつ suspended」の状態で2回目の `createMediaElementSource` が実行されてしまう。

### 対応
`document.visibilityState === "hidden"` かつ `AudioContext.state === "suspended"` の時は
`ensureAudioContext()` をスキップする。

```typescript
// useRetroPreviewMedia.ts
const isHiddenWithSuspendedContext =
  typeof document !== "undefined" &&
  document.visibilityState === "hidden" &&
  audioContextRef.current?.state === "suspended";

if (!isHiddenWithSuspendedContext) {
  await ensureAudioContext();
}
```

---

## 教訓まとめ

1. **`suspend` イベントで audio を quieten するなら visibility を確認せよ**  
   バックグラウンドの `suspend` に反応すると audio が永続的に無音になる。

2. **`visibilitychange:hidden` と `pause` の順序は保証されない**  
   playing 状態の保存は `window.blur`（`pause` より先に発火）で行うと race-free になる。

3. **`visibilitychange` は「window 重なり」では発火しないことがある**  
   `focus`/`blur` を組み合わせてカバーする。ただし `blur` は要素間フォーカス移動では**発火しない**（window 単位）。

4. **`MediaElementAudioSourceNode` は一度しか作れない**  
   `createMediaElementSource` を2回呼ぶと元のノードも壊れる。
   hidden + suspended な状態での audio graph 再構築は skip する。

5. **HTMLMediaElement と Web Audio API はバックグラウンド耐性が違う**  
   アラーム等「確実に鳴らしたい音」には `OscillatorNode` ベースを使う。
   `HTMLMediaElement` は Safari に止められる可能性がある。

6. **`isSafariBrowser()` の判定**  
   `navigator.vendor === "Apple Computer, Inc."` が最も確実（Chrome DevTools の UA 偽装に引っかからない）。
   `/safari/i` + `!/chrome|chromium/i` は次善策。Tauri on macOS は WebKit なので Safari 扱いになる。
