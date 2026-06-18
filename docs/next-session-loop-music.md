# 次セッション依頼文: Tone.js ループミュージック追加

## コピペ用プロンプト

---

`examples/demo-tonejs-vite/` に Tone.js + Vite のブラウザデモがあります。
現在 12曲入っています。Tone.js の色々な音色を試したいので、新しいループ曲を追加してください。

### 現在の構成を確認してから作業してください

```
examples/demo-tonejs-vite/
  src/
    main.ts      # UI管理・曲切り替え
    song1.ts     # "Chill Loop"    C major  80BPM  PolySynth(sine) pad + Synth(triangle) mel + MonoSynth(triangle) bass
    song2.ts     # "Rain Window"   A minor  75BPM  PolySynth(triangle) pad + PluckSynth mel + MonoSynth(sawtooth) bass
    song3.ts     # "Midnight Keys" F major  88BPM  PolySynth(sawtooth)+Chorus pad + FMSynth mel + MonoSynth(square) bass
    song4.ts     # "Duo Dusk"      D major  82BPM  PolySynth(AMSynth) pad + DuoSynth mel + AMSynth bass
    song5.ts     # "8bit Blues"    G blues  78BPM  PolySynth(sine) pad + Synth(pulse)+BitCrusher+PingPong mel + MonoSynth(square) bass
    song6.ts     # "Dark Orbit"    C minor  76BPM  PolySynth(FMSynth)+Reverb pad + Synth(fatsawtooth)+Phaser mel + MonoSynth(fatsawtooth) bass
    song7.ts     # "Jazz Wah"      Bb major 85BPM  PolySynth(DuoSynth) pad + Synth(fmtriangle)+AutoFilter mel + FMSynth bass + MetalSynth hats
    song8.ts     # "Rock Edge"     E minor  90BPM  PolySynth(fatsawtooth)+Chorus pad + Synth(fatsquare)+Distortion mel
    song9.ts     # "Tremolo Sky"   A major  72BPM  PolySynth(sine)+Chebyshev+Reverb pad + Synth(amsine)+Tremolo mel + MonoSynth(amtriangle) bass
    song10.ts    # "Neon Funk"     G minor  95BPM  PolySynth(fatsine) pad + Synth(pwm)+Vibrato mel + MonoSynth(saw)+AutoFilter bass
    song11.ts    # "Shimmer"       B minor  78BPM  PolySynth(fmtriangle)+PingPong pad + Synth(fmcosine)+FreqShifter mel + MonoSynth(fmsquare) bass
    song12.ts    # "Lofi Tape"     D minor  70BPM  PolySynth(square)+Reverb pad + Synth(triangle)+Chorus+Delay mel + FMSynth(sub) bass
```

### やってほしいこと

**song13.ts 〜 song15.ts を新規作成**して、main.ts と index.html に追加してください。
各曲で**まだ使っていない Tone.js の音色やエフェクト**を積極的に使ってください。

### 音色の方針 (まだ使っていないもの優先)

| 楽器 | まだ使っていない音色の例 |
|---|---|
| Melody | `Synth(oscillator: fmcosine)` は使用済み。`Synth(oscillator: fatsine)` は pad のみ。リードとして `fmsawtooth` `amsawtooth` `amcosine` などを試す |
| Pad | `PolySynth(Synth, fmsawtooth)` `PolySynth(Synth, fatsquare)` `PolySynth(Synth, amtriangle)` |
| Bass | `AMSynth` (song4のみ)、`Synth(sine)` シンプルサブベース、`MonoSynth(fmtriangle)` |
| Effects | `Tone.StereoWidener`、`Tone.MidSideCompressor`、`Tone.Limiter`、複数エフェクトのチェーン |
| Exotic | `Tone.Oscillator` + `Tone.AmplitudeEnvelope` で手動合成、`Tone.OmniOscillator` |

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
import * as Song13 from './song13';
// ...
const SONGS = [
  // ... 既存 12曲
  { meta: Song13.META, create: Song13.create },
];
```

`index.html` の `.song-tabs` に追加 (data-song は 12 から):
```html
<button class="song-btn" data-song="12">曲名</button>
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
| song1  Chill Loop    | PolySynth(sine)              | Synth(triangle)                         | MonoSynth(triangle)    | half-time |
| song2  Rain Window   | PolySynth(triangle)          | PluckSynth                              | MonoSynth(sawtooth)    | sparse, pink noise |
| song3  Midnight Keys | PolySynth(sawtooth)+Chorus   | FMSynth                                 | MonoSynth(square)      | standard 2&4 |
| song4  Duo Dusk      | PolySynth(AMSynth)           | DuoSynth                                | AMSynth                | half-time, open hat |
| song5  8bit Blues    | PolySynth(sine)              | Synth(pulse)+BitCrusher+PingPong        | MonoSynth(square)      | blues shuffle |
| song6  Dark Orbit    | PolySynth(FMSynth)+Reverb    | Synth(fatsawtooth)+Phaser               | MonoSynth(fatsawtooth) | epic half-time, tom |
| song7  Jazz Wah      | PolySynth(DuoSynth)          | Synth(fmtriangle)+AutoFilter            | FMSynth                | jazz, MetalSynth hat+clap |
| song8  Rock Edge     | PolySynth(fatsawtooth)+Chorus| Synth(fatsquare)+Distortion             | MonoSynth(fatsawtooth) | rock straight, clap |
| song9  Tremolo Sky   | PolySynth(sine)+Chebyshev+Rev| Synth(amsine)+Tremolo                   | MonoSynth(amtriangle)  | sparse half-time |
| song10 Neon Funk     | PolySynth(fatsine)           | Synth(pwm)+Vibrato                      | MonoSynth(saw)+AutoFilter | funk syncopated, ghost |
| song11 Shimmer       | PolySynth(fmtriangle)+PingPong| Synth(fmcosine)+FrequencyShifter       | MonoSynth(fmsquare)    | gentle, MetalSynth x2 |
| song12 Lofi Tape     | PolySynth(square)+Reverb     | Synth(triangle)+Chorus+FeedbackDelay    | FMSynth(sub)           | boom bap lofi |

### まだ試していない主な音色・エフェクト

- Oscillator types: `fmsawtooth` `amsawtooth` `amcosine` `fatsquare`(pad) `amtriangle`(pad) `fmtriangle`(bass)
- `Tone.StereoWidener` — ステレオ幅拡張
- `Tone.Limiter` — 出力制限 (Compressorの代わり)
- `Tone.Synth(sine)` サブベース
- `Tone.Oscillator` + `Tone.AmplitudeEnvelope` — 低レベル手動合成
- `Tone.PolySynth(Tone.FMSynth)` 設定違い (harmonicity違い)
- カラムべのワウ: `Tone.Wah` (存在すれば)
- ドラム: `MetalSynth` でキック/スネア代替 (bassとして使う)

### コード進行のアイデア (未使用キー)

- F# minor: F#m D A E (ドラマティック)
- Ab major: Abmaj7 Fm7 Dbmaj7 Eb7 (ジャズ感)
- C# minor: C#m A E B (エモ)
- Eb major: Ebmaj7 Cm7 Abmaj7 Bb7
- G major: G Em Am D (明るいポップ)
