# 次セッション依頼文: Tone.js ループミュージック追加

## コピペ用プロンプト

---

`examples/demo-tonejs-vite/` に Tone.js + Vite のブラウザデモがあります。
現在 6曲入っています。Tone.js の色々な音色を試したいので、新しいループ曲を追加してください。

### 現在の構成を確認してから作業してください

```
examples/demo-tonejs-vite/
  src/
    main.ts     # UI管理・曲切り替え
    song1.ts    # "Chill Loop"    C major  80BPM  PolySynth(sine) pad + Synth(triangle) mel + MonoSynth(triangle) bass
    song2.ts    # "Rain Window"   A minor  75BPM  PolySynth(triangle) pad + PluckSynth mel + MonoSynth(sawtooth) bass
    song3.ts    # "Midnight Keys" F major  88BPM  PolySynth(sawtooth)+Chorus pad + FMSynth mel + MonoSynth(square) bass
    song4.ts    # "Duo Dusk"      D major  82BPM  PolySynth(AMSynth) pad + DuoSynth mel + AMSynth bass
    song5.ts    # "8bit Blues"    G blues  78BPM  PolySynth(sine) pad + Synth(pulse)+BitCrusher+PingPongDelay mel + MonoSynth(square) bass
    song6.ts    # "Dark Orbit"    C minor  76BPM  PolySynth(FMSynth)+Reverb pad + Synth(fatsawtooth)+Phaser mel + MonoSynth(fatsawtooth) bass
```

### やってほしいこと

**song7.ts 〜 song9.ts を新規作成**して、main.ts と index.html に追加してください。
各曲で**まだ使っていない Tone.js の音色**を積極的に使ってください。

### 音色の方針 (まだ使っていないもの優先)

| 楽器 | まだ使っていない音色の例 |
|---|---|
| Melody | `MetalSynth` (シンバル風リード)、`Synth(oscillator:amsine)` `Synth(oscillator:fmtriangle)` `Synth(oscillator:fatsquare)` |
| Pad | `PolySynth(Tone.Synth, oscillator:fatsawtooth)` + Chorus、`PolySynth(Tone.DuoSynth)` |
| Bass | `FMSynth`、`Synth(oscillator:fatsquare)` |
| Percussion | `MetalSynth` (ブラウザならOK、hi-hat/シンバル代替)、クラップ (`NoiseSynth` 短め) |
| Effects | `Tone.Tremolo`、`Tone.AutoFilter`、`Tone.Distortion`、`Tone.Chebyshev`、`Tone.FrequencyShifter` |

### 各曲のフォーマット (song1.ts を参考に)

```typescript
export const META = { name: '曲名', bpm: BPM };

type StepCb  = (s: number, kick: boolean, snare: boolean) => void;
type ChordCb = (name: string, bar: number) => void;

export function create(onStep: StepCb, onChord: ChordCb): () => void {
  // 楽器・パターン・Part/Sequence を作って
  // dispose関数を返す
  return () => { /* 全ノードを dispose */ };
}
```

### 追加後に main.ts と index.html を更新

`main.ts` の SONGS 配列に追加:
```typescript
import * as Song7 from './song7';
// ...
const SONGS = [
  // ... 既存
  { meta: Song7.META, create: Song7.create },
];
```

`index.html` の `.song-tabs` に追加:
```html
<button class="song-btn" data-song="6">曲名</button>
```

### 確認方法

```bash
cd examples/demo-tonejs-vite
npm run dev
# http://localhost:5173 でブラウザ確認
```

---

## 参考: Tone.js 音色メモ

### 使い終わった組み合わせ

| 曲 | Pad | Melody | Bass | ドラム特徴 |
|---|---|---|---|---|
| song1 Chill Loop    | PolySynth(sine)             | Synth(triangle)                         | MonoSynth(triangle)    | half-time |
| song2 Rain Window   | PolySynth(triangle)         | PluckSynth                              | MonoSynth(sawtooth)    | sparse, pink noise snare |
| song3 Midnight Keys | PolySynth(sawtooth)+Chorus  | FMSynth                                 | MonoSynth(square)      | standard 2&4 |
| song4 Duo Dusk      | PolySynth(AMSynth)          | DuoSynth                                | AMSynth                | half-time, open hat |
| song5 8bit Blues    | PolySynth(sine)             | Synth(pulse 12.5%)+BitCrusher+PingPong  | MonoSynth(square)      | blues shuffle |
| song6 Dark Orbit    | PolySynth(FMSynth)+Reverb   | Synth(fatsawtooth)+Phaser               | MonoSynth(fatsawtooth) | epic half-time, low tom |

### まだ試していない音色

- `Tone.MetalSynth` — 金属系 (ブラウザのみ)。リードやパーカッションとして使える
- `Tone.Synth` oscillator: `amsine` `fmtriangle` `fatsquare` `amtriangle` などバリアント
- `Tone.PolySynth(Tone.DuoSynth)` — デチューンポリフォニック
- `Tone.FMSynth` as bass — まだメロディ+パッドのみ、ベースに未使用
- `Tone.Tremolo` — ビブラート/AM系エフェクト
- `Tone.AutoFilter` — LFOでフィルター変調 (ワウ)
- `Tone.Distortion` / `Tone.Chebyshev` — ギターディストーション風
- `Tone.FrequencyShifter` — ピッチシフト系エフェクト

### コード進行のアイデア (未使用)

- E minor: Em C G D (エモ/ロック)
- Bb major: Bbmaj7 Gm7 Ebmaj7 F7 (ジャズ)
- A major: A E F#m D (明るいポップ)
- B minor: Bm G D A (バラード)
- F# minor: F#m D A E (ドラマティック)
