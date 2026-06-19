# 次セッション依頼文: Tone.js ループミュージック追加

## コピペ用プロンプト

---

`examples/demo-tonejs-vite/` に Tone.js + Vite のブラウザデモがあります。
現在 **32曲**入っています。Tone.js の色々な音色を試したいので、新しいループ曲を追加してください。

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
    song19.ts    # "ONE DROP"         A minor  80BPM  PolySynth(fmsawtooth) skank stabs + MonoSynth(fatsquare) bass + Synth(amsquare) melodica [レゲエ]
    song20.ts    # "RIO BEAT"         D major 120BPM  PolySynth(amsawtooth)+Rev pad + MonoSynth(pulse) bass + Synth(fatsquare)+Chorus horn [サンバ]
    song21.ts    # "COLD SYNTH"       E minor 126BPM  PolySynth(fmsquare)+Rev pad + MonoSynth(amsine) bass + Synth(pwm)+FeedbackDelay arp [ニューウェーブ]
    song22.ts    # "AMEN WAVE"        A minor 170BPM  PolySynth(fatsquare)+Rev pad + FMSynth(harm:0.25) sub + Synth(sine)+PingPong mel [DnB]
    song23.ts    # "STARFIELD"        C major  60BPM  PolySynth(pwm)+Rev(8s)+Delay pad + MonoSynth(pwm) drone + Synth(fmsine)+Rev mel [アンビエント]
    song24.ts    # "HOUSE DRIVE"      A minor 128BPM  PolySynth(amsine)+Rev pad + MonoSynth(fattriangle) bass + Synth(sawtooth)+AutoWah mel [ハウス]
    song25.ts    # "TRAP NIGHT"       F minor  72BPM  PolySynth(fattriangle)+Rev pad + DuoSynth(portamento) 808 bass + FMSynth(harm:2) mel [トラップ]
    song26.ts    # "GROOVE MACHINE"   Ab major 118BPM PolySynth(fatsawtooth)+StereoWidener strings + MonoSynth(fmsine) bass [ディスコ]
    song27.ts    # "FLAMENCO FUEGO"   A Phrygian 155BPM PluckSynth(flamenco) + PolySynth(pulse) rasgueado + cajon [フラメンコ]
    song28.ts    # "SPAIN NIGHTS"     D major 138BPM  PolySynth(pulse)+JCReverb piano + DuoSynth mel + PluckSynth(bass) + clave/bongo [スペイン風]
    song29.ts    # "SEVEN PULSE"      F# minor 132BPM Synth(amtriangle)+PitchShift mel + PolySynth(fmsquare) pad + MonoSynth(sawtooth) bass [7/8変拍子]
    song30.ts    # "POLY GROOVE"      Bb minor 92BPM  PolySynth(fmtriangle) pad + MonoSynth(fmsawtooth) 3-feel bass + Synth(amsine) 3-feel mel [3:4ポリリズム]
    song31.ts    # "SOUL GROOVE"      Eb major 72BPM  PolySynth(triangle)+Tremolo+Freeverb EP + FMSynth bass [R&B/Soul half-time]
    song32.ts    # "PRAISE SONG"      C major 84BPM   PolySynth(MonoSynth)+Freeverb piano + PolySynth(fatsawtooth) choir + MonoSynth(saw) bass [ゴスペル]
```

### 現在の状態

**song1〜song32 が実装済み**（32曲完成）。次に新しい曲を追加したい場合は song33.ts から。
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

`main.ts` の SONGS 配列に追加、`index.html` の `.song-tabs` に追加 (data-song は 32 から)

### 確認方法

```bash
cd examples/demo-tonejs-vite
npm run dev
# http://localhost:5173 でブラウザ確認
```

---

## 参考: Tone.js 音色メモ

### 使い終わった組み合わせ (全32曲)

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
| song19 ONE DROP         | PolySynth(fmsawtooth) skank   | Synth(amsquare) melodica             | MonoSynth(fatsquare)     | one-drop beat3 only |
| song20 RIO BEAT         | PolySynth(amsawtooth)+Reverb  | Synth(fatsquare)+Chorus horn         | MonoSynth(pulse)         | samba 16th pandeiro |
| song21 COLD SYNTH       | PolySynth(fmsquare)+Reverb    | Synth(pwm)+FeedbackDelay arp         | MonoSynth(amsine)        | TR-808 |
| song22 AMEN WAVE        | PolySynth(fatsquare)+Reverb   | Synth(sine)+PingPong                 | FMSynth(harm:0.25)       | amen break |
| song23 STARFIELD        | PolySynth(pwm)+Rev(8s)+Delay  | Synth(fmsine)+Reverb                 | MonoSynth(pwm) drone     | bell (MetalSynth) only |
| song24 HOUSE DRIVE      | PolySynth(amsine)+Reverb      | Synth(sawtooth)+AutoWah              | MonoSynth(fattriangle)   | 4-on-floor house |
| song25 TRAP NIGHT       | PolySynth(fattriangle)+Rev    | FMSynth(harm:2) bell                 | DuoSynth(portamento) 808 | 16th hi-hat rolls |
| song26 GROOVE MACHINE   | PolySynth(fatsawtooth)+**StereoWidener** | PolySynth(sawtooth) stabs | MonoSynth(fmsine) | 4-on-floor disco |
| song27 FLAMENCO FUEGO   | PolySynth(**pulse**) rasgueado | PluckSynth (flamenco)              | cajon(body+slap)         | Rumba cajon |
| song28 SPAIN NIGHTS     | PolySynth(**pulse**)+**JCReverb** | DuoSynth (portamento, vibrato) | PluckSynth (upright) | clave+bongo+shaker |
| song29 SEVEN PULSE      | PolySynth(fmsquare)+Reverb    | Synth(amtriangle)+**PitchShift**     | MonoSynth(sawtooth)    | 7/8 Sequence (3+2+2) |
| song30 POLY GROOVE      | PolySynth(fmtriangle)+Reverb  | Synth(amsine) 3-feel                 | MonoSynth(fmsawtooth) 3-feel | 4-feel Afrobeat |
| song31 SOUL GROOVE      | PolySynth(triangle)+Tremolo+**Freeverb** | —                          | FMSynth(harm:1.0) triangle | half-time Soul |
| song32 PRAISE SONG      | PolySynth(fatsawtooth)+**Freeverb** choir | **PolySynth(MonoSynth)**+Freeverb | MonoSynth(sawtooth) | NoiseSynth tambourine |

### 実装済み32曲 コード進行一覧

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
- song19 ONE DROP:        Am7 Fmaj7 G7 Em7 Dm7 E7 (A minor: i→VI→VII→v | i→iv→V, レゲエ one-drop)
- song20 RIO BEAT:        Dmaj7 Bm7 Em7 A7 (D major: I→VIm→IIm→V7, サンバ horn samba)
- song21 COLD SYNTH:      Em G D A (E minor: i→III→VII→VI, ニューウェーブ PWM arpeggio)
- song22 AMEN WAVE:       Am7 Fmaj7 Dm7 E7 (A minor: i→VI→iv→V7, jazz DnB 2bars each)
- song23 STARFIELD:       Cmaj9 Fmaj9 Am9 G6/9 (C major: Imaj9→IVmaj9→VIm9→V6/9, アンビエント)
- song24 HOUSE DRIVE:     Am7 Fmaj7 Cmaj7 G7 (A minor: i→VI→III→VII, ハウス 4-on-floor)
- song25 TRAP NIGHT:      Fm7 Dbmaj7 Abmaj7 Eb7 (F minor: i→VI→III→VII, トラップ 16th hi-hat rolls)
- song26 GROOVE MACHINE:  Abmaj7 Fm7 Dbmaj7 Eb7 (Ab major: I→VIm→IVmaj7→V7, ディスコ StereoWidener)
- song27 FLAMENCO FUEGO:  Am G F E7 (A Phrygian: i→VII→VI→V7, アンダルシアカデンス フラメンコRumba)
- song28 SPAIN NIGHTS:    Dmaj7 C#7 F#m7 Bm7 Em7 A7 Dmaj7 A7 (D major: I→V7/iii→IIIm→VIm→IIm→V7, JCReverb)
- song29 SEVEN PULSE:     F#m7 A E7 D (F# minor: i→III→V7→VII, 7/8拍子 PitchShift自動ハーモニー)
- song30 POLY GROOVE:     Bbm7 (3bars) → Ebm7 (3bars) (Bb minor: loopEnd='6m', 3:4ポリリズム Afrobeat)
- song31 SOUL GROOVE:     Ebmaj9 Cm9 Abmaj9 Bb7 (Eb major: Imaj9→VIm9→IVmaj9→V7, R&B half-time Freeverb)
- song32 PRAISE SONG:     Cmaj7 F9 G13 Am7 Cmaj7 F9 Dm7 G7 (C major: I→IV9→V13→VIm, ゴスペル PolySynth(MonoSynth))

### まだ試していない主な音色・エフェクト

- ~~`Tone.StereoWidener`~~ → song26 で使用済み
- ~~PolySynth(pulse)~~ → song27/28 で使用済み
- ~~`Tone.JCReverb`~~ → song28 で使用済み
- ~~MembraneSynth 高音 (clave/bongo)~~ → song28 で使用済み
- ~~`Tone.PitchShift`~~ → song29 で使用済み
- ~~`Tone.Freeverb`~~ → song31/32 で使用済み
- ~~`PolySynth(Tone.MonoSynth)`~~ → song32 で使用済み
- `Tone.Wah` — 手動ワウ (AutoWah は song24 で使用済み)
- `Tone.Oscillator` + `Tone.AmplitudeEnvelope` — 低レベル手動合成
- `Tone.FeedbackCombFilter` — コム音色

### コード進行のアイデア (使っていないキー)

- C# minor: C#m A E B (エモ)
- Gb major: Gbmaj7 Ebm7 Cbmaj7 Db7 (ジャズ感)

### 音楽ジャンルのアイデア (未実装)

- ~~レゲエ (Reggae)~~ → song19 ONE DROP 実装済み
- ~~サンバ (Samba)~~ → song20 RIO BEAT 実装済み
- ~~ニューウェーブ (New Wave)~~ → song21 COLD SYNTH 実装済み
- ~~ドラムンベース (DnB)~~ → song22 AMEN WAVE 実装済み
- ~~アンビエント~~ → song23 STARFIELD 実装済み
- ~~ハウス / EDM~~ → song24 HOUSE DRIVE 実装済み
- ~~トラップ / Hip Hop~~ → song25 TRAP NIGHT 実装済み
- ~~ディスコ / R&B~~ → song26 GROOVE MACHINE 実装済み
- ~~フラメンコ~~ → song27 FLAMENCO FUEGO 実装済み
- ~~Latin Jazz / Spain~~ → song28 SPAIN NIGHTS 実装済み
- ~~変拍子 (7/8)~~ → song29 SEVEN PULSE 実装済み
- ~~ポリリズム (3:4)~~ → song30 POLY GROOVE 実装済み
- ~~R&B/Soul~~ → song31 SOUL GROOVE 実装済み
- ~~ゴスペル~~ → song32 PRAISE SONG 実装済み
- K-pop: スタッカートシンセ、デジタル感
- Jazz Fusion: 5/4拍子
- Celtic/Folk: ドローン + モーダルハーモニー

### song17 (CANON LIGHT) の注意点

PluckSynth は `triggerAttack(note, time, velocity)` のみ。
`triggerAttackRelease` は内部で使えるが duration は無視される。
設定: `attackNoise: 2.5, dampening: 1800, resonance: 0.68` = ハープシコード風
(song2 は: attackNoise: 1.2, dampening: 3800, resonance: 0.97 = ギター風)
