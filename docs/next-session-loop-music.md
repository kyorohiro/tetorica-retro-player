# 次セッション依頼文: Tone.js ループミュージック追加

## コピペ用プロンプト

---

`examples/demo-tonejs-vite/` に Tone.js + Vite のブラウザデモがあります。
現在 **18曲**入っています。Tone.js の色々な音色を試したいので、新しいループ曲を追加してください。

### 現在の構成を確認してから作業してください

```
examples/demo-tonejs-vite/
  src/
    main.ts      # UI管理・曲切り替え
    song1.ts     # "Chill Loop"       C major  80BPM  PolySynth(sine) pad + Synth(triangle) mel + MonoSynth(triangle) bass
    song2.ts     # "Rain Window"      A minor  75BPM  PolySynth(triangle) pad + PluckSynth mel + MonoSynth(sawtooth) bass
    song3.ts     # "Midnight Keys"    F major  88BPM  PolySynth(sawtooth)+Chorus pad + FMSynth mel + MonoSynth(square) bass
    song4.ts     # "Duo Dusk"         D major  82BPM  PolySynth(AMSynth) pad + DuoSynth mel + AMSynth bass
    song5.ts     # "8bit Blues"       G blues  78BPM  PolySynth(sine) pad + Synth(pulse)+BitCrusher+PingPong mel + MonoSynth(square) bass
    song6.ts     # "Dark Orbit"       C minor  76BPM  PolySynth(FMSynth)+Reverb pad + Synth(fatsawtooth)+Phaser mel + MonoSynth(fatsawtooth) bass
    song7.ts     # "Jazz Wah"         Bb major 85BPM  PolySynth(DuoSynth) pad + Synth(fmtriangle)+AutoFilter mel + FMSynth bass + MetalSynth hats
    song8.ts     # "Rock Edge"        E minor  90BPM  PolySynth(fatsawtooth)+Chorus pad + Synth(fatsquare)+Distortion mel
    song9.ts     # "Tremolo Sky"      A major  72BPM  PolySynth(sine)+Chebyshev+Reverb pad + Synth(amsine)+Tremolo mel + MonoSynth(amtriangle) bass
    song10.ts    # "Neon Funk"        G minor  95BPM  PolySynth(fatsine) pad + Synth(pwm)+Vibrato mel + MonoSynth(saw)+AutoFilter bass
    song11.ts    # "Shimmer"          B minor  78BPM  PolySynth(fmtriangle)+PingPong pad + Synth(fmsawtooth)+FreqShifter mel + MonoSynth(fmsquare) bass
    song12.ts    # "Lofi Tape"        D minor  70BPM  PolySynth(square)+Reverb pad + Synth(triangle)+Chorus+Delay mel + FMSynth(sub) bass
    song13.ts    # "STARLIGHT"        A major 130BPM  PolySynth(fatsine)+Chorus pad + Synth(amsawtooth) mel + MonoSynth(fmtriangle) bass [王道進行]
    song14.ts    # "JAZZ NIGHT"       D minor  92BPM  PolySynth(amsquare)+Reverb pad + Synth(amtriangle)+Vibrato mel + MonoSynth(amsawtooth) bass [Em7b5]
    song15.ts    # "HERO CALL"        G major 148BPM  PolySynth(sawtooth)+Reverb pad + Synth(fmsine)+PingPong mel + MonoSynth(sine) bass [16th runs]
    song16.ts    # "CITY GLOW"        G major 108BPM  PolySynth(amtriangle)+Reverb pad + AMSynth mel + MonoSynth(fmsawtooth) bass [シティポップ]
    song17.ts    # "CANON LIGHT"      D major  66BPM  PolySynth(triangle)+Reverb pad + PluckSynth(harpsichord) mel + MonoSynth(amsquare) bass [クラシック]
    song18.ts    # "IPANEMA NIGHTS"   F major  88BPM  PolySynth(fmsine)+Reverb pad + Synth(fatsine)+Tremolo mel + MonoSynth(fatsine) bass [ボサノバ]
```

### やってほしいこと

**song19.ts 〜 song21.ts を新規作成**して、main.ts と index.html に追加してください。
各曲で**まだ使っていない Tone.js の音色やエフェクト**を積極的に使ってください。

### 音色の方針 (まだ使っていないもの優先)

| 楽器 | まだ使っていない音色の例 |
|---|---|
| Melody | `Synth(fatsquare)` をリードとして (pad は使用済み) |
| Pad | `PolySynth(FMSynth, harmonicity違い)` `PolySynth(Synth, fmsawtooth)` `PolySynth(Synth, amsawtooth)` |
| Bass | `Synth(sawtooth)` シンプルモノ bass、`MonoSynth(fmtriangle)` は song13で使用済みなので別を |
| Effects | `Tone.StereoWidener` ステレオ幅拡張、`Tone.Wah` ワウ、`Tone.AutoWah` |
| Exotic | `Tone.Oscillator` + `Tone.AmplitudeEnvelope` 手動合成、`Tone.OmniOscillator` |

### ⚠️ 重要: 無効な oscillator type に注意

Tone.js で有効なオシレーター型:
- 基本: `sine`, `square`, `sawtooth`, `triangle`
- プレフィックス: `fat` + 基本, `am` + 基本, `fm` + 基本
- 特殊: `pwm`, `pulse`
- **`cosine` は無効** → `fmcosine`, `amcosine` も無効 (TypeError になる)

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

`main.ts` の SONGS 配列に追加、`index.html` の `.song-tabs` に追加 (data-song は 18 から)

### 確認方法

```bash
cd examples/demo-tonejs-vite
npm run dev
# http://localhost:5173 でブラウザ確認
```

---

## 参考: Tone.js 音色メモ

### 使い終わった組み合わせ (全18曲)

| 曲 | Pad | Melody | Bass | ドラム特徴 |
|---|---|---|---|---|
| song1  Chill Loop       | PolySynth(sine)               | Synth(triangle)                      | MonoSynth(triangle)      | half-time |
| song2  Rain Window      | PolySynth(triangle)           | PluckSynth (guitar)                  | MonoSynth(sawtooth)      | sparse, pink noise |
| song3  Midnight Keys    | PolySynth(sawtooth)+Chorus    | FMSynth                              | MonoSynth(square)        | standard 2&4 |
| song4  Duo Dusk         | PolySynth(AMSynth)            | DuoSynth                             | AMSynth                  | half-time, open hat |
| song5  8bit Blues       | PolySynth(sine)               | Synth(pulse)+BitCrusher+PingPong     | MonoSynth(square)        | blues shuffle |
| song6  Dark Orbit       | PolySynth(FMSynth)+Reverb     | Synth(fatsawtooth)+Phaser            | MonoSynth(fatsawtooth)   | epic half-time, tom |
| song7  Jazz Wah         | PolySynth(DuoSynth)           | Synth(fmtriangle)+AutoFilter         | FMSynth                  | jazz, MetalSynth hat |
| song8  Rock Edge        | PolySynth(fatsawtooth)+Chorus | Synth(fatsquare)+Distortion          | MonoSynth(fatsawtooth)   | rock straight |
| song9  Tremolo Sky      | PolySynth(sine)+Chebyshev+Rev | Synth(amsine)+Tremolo                | MonoSynth(amtriangle)    | sparse half-time |
| song10 Neon Funk        | PolySynth(fatsine)            | Synth(pwm)+Vibrato                   | MonoSynth(saw)+AutoFilter | funk syncopated |
| song11 Shimmer          | PolySynth(fmtriangle)+PingPong| Synth(fmsawtooth)+FrequencyShifter   | MonoSynth(fmsquare)      | gentle, MetalSynth x2 |
| song12 Lofi Tape        | PolySynth(square)+Reverb      | Synth(triangle)+Chorus+FeedbackDelay | FMSynth(sub)             | boom bap lofi |
| song13 STARLIGHT        | PolySynth(fatsine)+Chorus     | Synth(amsawtooth)                    | MonoSynth(fmtriangle)    | rock, 王道進行 |
| song14 JAZZ NIGHT       | PolySynth(amsquare)+Reverb    | Synth(amtriangle)+Vibrato            | MonoSynth(amsawtooth)    | jazz, Em7b5 |
| song15 HERO CALL        | PolySynth(sawtooth)+Reverb    | Synth(fmsine)+PingPong               | MonoSynth(sine)          | anime 4-on-floor |
| song16 CITY GLOW        | PolySynth(amtriangle)+Reverb  | AMSynth (class)                      | MonoSynth(fmsawtooth)    | 80s clap+openhat |
| song17 CANON LIGHT      | PolySynth(triangle)+Rev(4s)   | PluckSynth (harpsichord)             | MonoSynth(amsquare)      | timpani only |
| song18 IPANEMA NIGHTS   | PolySynth(fmsine)+Reverb      | Synth(fatsine)+Tremolo               | MonoSynth(fatsine)       | bossa syncopated |

### 実装済み18曲 コード進行一覧

- song1  Chill Loop:      Cmaj7 Em7 Am7 Fmaj7 (C major: I→IIIm→VIm→IV, 王道ポップ)
- song2  Rain Window:     Am7 Dm7 G7 Cmaj7 Fmaj7 E7 Am7 (A minor: i→iv→VII→III→VI→V→i, 自然短調)
- song3  Midnight Keys:   Fmaj7 Gm7 Am7 Bbmaj7 Cm7 Dm7 C7 (F major: I→II→III→IV 上昇進行, ラテン感)
- song4  Duo Dusk:        Dmaj7 Bm7 Gmaj7 A7 Em7 (D major: I→VIm→IV→V→IIm, カントリー/ポップ)
- song5  8bit Blues:      G7 C7 G7 D7 (Gブルース: I7→IV7→I7→V7, 12小節ブルース)
- song6  Dark Orbit:      Cm Ab Eb Bb Fm G (C minor: i→VI→III→VII→iv→V, ハードロック)
- song7  Jazz Wah:        Bbmaj7 Gm7 Ebmaj7 F7 (Bb major: I→VIm→IV→V, スムースジャズ)
- song8  Rock Edge:       Em C G D (E minor: i→VI→III→VII, ロック定番)
- song9  Tremolo Sky:     A E F#m D (A major: I→V→VIm→IV, ポップバラード)
- song10 Neon Funk:       Gm7 Cm7 Ebmaj7 Bb7 (G minor: i→iv→III→VII, ファンク)
- song11 Shimmer:         Bm7 G D A7 Em7 F#7 Bm7 (B minor: i→VI→III→VII→IVm→V7, 8小節ターンアラウンド)
- song12 Lofi Tape:       Dm7 Am7 Bbmaj7 F7 (D minor: i→Vm→VI→III, ローファイ定番)
- song13 STARLIGHT:       Dmaj7 E7 C#m7 F#m7 (A major: IV→V→IIIm→VIm, 王道進行 J-pop)
- song14 JAZZ NIGHT:      Dm7 Bbmaj7 Gm7 A7 Em7b5 A7 Dm7 (D minor: i→VI→iv→V7→iiø7→V7, 東京事変風ハーモニックマイナー)
- song15 HERO CALL:       Em7 Cmaj7 Gmaj7 D7 Am7 (G major: VIm→IV→I→V→IIm, アニメOP定番)
- song16 CITY GLOW:       Gmaj7 Em7 Am7 D7 (G major: I→VIm→IIm→V7, シティポップ定番)
- song17 CANON LIGHT:     D A Bm F#m G D G A (D major: I→V→VIm→IIIm→IV→I→IV→V, パッヘルベル風)
- song18 IPANEMA NIGHTS:  Fmaj7 Gm7 C7 Dm7 Em7b5 A7 Dm7 (F major/D minor: I→IIm→V7→VIm→iiø7→V7/vi, ボサノバ Jobim風)

### まだ試していない主な音色・エフェクト

- Oscillator types: `fatsquare`(mel), `amsawtooth`(pad), `fmsawtooth`(pad), `fatsin`e(さらに別設定)
- `Tone.StereoWidener` — ステレオ幅拡張
- `Tone.Wah` / `Tone.AutoWah` — ワウ (pwmとVibrato違い)
- `Tone.Oscillator` + `Tone.AmplitudeEnvelope` — 低レベル手動合成
- `Tone.PolySynth(Tone.FMSynth)` — harmonicity 違いで全く異なる音
- `Tone.FeedbackCombFilter` — コム音色
- ドラム: MembraneSynth を高ピッチでコンガ/ボンゴとして使う

### コード進行のアイデア (使っていないキー)

- F# minor: F#m D A E (ドラマティック)
- Ab major: Abmaj7 Fm7 Dbmaj7 Eb7 (ジャズ感)
- C# minor: C#m A E B (エモ)
- Eb major: Ebmaj7 Cm7 Abmaj7 Bb7
- レゲエ: Am Dm G Am (オフビートでコード)
- サンバ: 速めBPM(120+), Dm Gm A7 Dm

### 音楽ジャンルのアイデア (未実装)

- レゲエ (Reggae): オフビートでコード、シンプルワンドロップドラム
- サンバ (Samba): 速いBPM、シンコペーション
- ニューウェーブ (New Wave): シンセリフ、エコー、コールドウェーブ感
- ドラムンベース (DnB): 170BPM、ジャズコード over broken beat
- アンビエント: ドラムなし、長い Reverb + Delay、ゆっくり変化

### song17 (CANON LIGHT) の注意点

PluckSynth は `triggerAttack(note, time, velocity)` のみ。
`triggerAttackRelease` は内部で使えるが duration は無視される。
設定: `attackNoise: 2.5, dampening: 1800, resonance: 0.68` = ハープシコード風
(song2 は: attackNoise: 1.2, dampening: 3800, resonance: 0.97 = ギター風)
