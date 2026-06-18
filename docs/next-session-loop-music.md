# 次セッション依頼文: Tone.js ループミュージック追加

## コピペ用プロンプト

---

`examples/demo-tonejs-vite/` に Tone.js + Vite のブラウザデモがあります。
現在 3曲入っています。Tone.js の色々な音色を試したいので、新しいループ曲を追加してください。

### 現在の構成を確認してから作業してください

```
examples/demo-tonejs-vite/
  src/
    main.ts     # UI管理・曲切り替え
    song1.ts    # "Chill Loop"   C major 80BPM  sine pad + triangle melody
    song2.ts    # "Rain Window"  A minor 75BPM  triangle pad + PluckSynth melody
    song3.ts    # "Midnight Keys" F major 88BPM  sawtooth+chorus pad + FMSynth melody
```

### やってほしいこと

**song4.ts 〜 song6.ts を新規作成**して、main.ts と index.html に追加してください。
各曲で**まだ使っていない Tone.js の音色**を積極的に使ってください。

### 音色の方針 (まだ使っていないもの優先)

| 楽器 | まだ使っていない音色の例 |
|---|---|
| Melody | `AMSynth` `DuoSynth` `MetalSynth` `Synth(oscillator:pulse)` `Synth(oscillator:fatsawtooth)` |
| Pad | `DuoSynth` `AMSynth` `Synth(fat系)` |
| Bass | `FMSynth` `AMSynth` |
| Percussion | `MetalSynth` (Node.jsはNG、ブラウザならOK)、`Synth(oscillator:sine)` でトム風 |

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
import * as Song4 from './song4';
// ...
const SONGS = [
  { meta: Song1.META, create: Song1.create },
  // ... 既存
  { meta: Song4.META, create: Song4.create },
];
```

`index.html` の `.song-tabs` に追加:
```html
<button class="song-btn" data-song="3">曲名</button>
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
| song1 Chill Loop | PolySynth(sine) | Synth(triangle) | MonoSynth(triangle) | half-time |
| song2 Rain Window | PolySynth(triangle) | PluckSynth | MonoSynth(sawtooth) | sparse, pink noise snare |
| song3 Midnight Keys | PolySynth(sawtooth)+Chorus | FMSynth | MonoSynth(square) | standard 2&4 |

### まだ試していない音色

- `Tone.AMSynth` — AM変調、ベルやオルガン系
- `Tone.DuoSynth` — デチューンした2音、ユニゾン感
- `Tone.MetalSynth` — シンバル・金属系 (ブラウザのみ)
- `Tone.Synth` oscillator: `pulse` — ファミコン風矩形波
- `Tone.Synth` oscillator: `fatsawtooth` — 太いリード
- `Tone.Synth` oscillator: `amsine` `fmtriangle` などFat/AM/FMバリアント
- `Tone.PolySynth(Tone.AMSynth)` — AMコード
- `Tone.PolySynth(Tone.FMSynth)` — FMパッド
- `Tone.Reverb` — リバーブ (await reverb.ready が必要)
- `Tone.PingPongDelay` — ステレオディレイ
- `Tone.Phaser` — フェイザー
- `Tone.BitCrusher` — デジタルクランチ

### コード進行のアイデア

- D major: D A Bm G (pop定番)
- E minor: Em C G D (エモ/ロック)
- Bb major: Bbmaj7 Gm7 Ebmaj7 F7 (ジャズ)
- G blues: G7 C7 G7 D7 (ブルース)
- C minor: Cm Ab Eb Bb (エピック)
