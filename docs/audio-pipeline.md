# Audio Pipeline (TetoricaRetroAudioNode)

## Signal Flow

```
[Media Element / Source Node]
         │
         ▼
┌─────────────────────┐
│   wowFlutterDelay   │  Wow & Flutter (テープのヨレ)
│   wowLfo            │  LFO → delayTime 変調
│   flutterLfo        │  高周波 LFO → delayTime 変調
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  radioToneHighpass  │  Radio tone: ハイパス (低域カット)
│  radioToneLowpass   │  Radio tone: ローパス (高域カット)
│  radioTonePresence  │  Radio tone: プレゼンスピーク (peaking EQ)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│    lofiLowpass      │  Lo-fi: ローパス (pre-crush 帯域制限)
│    lofiHighshelf    │  Lo-fi: ハイシェルフ (-dB, 高域減衰)
│    lofiDrive        │  Lo-fi: WaveShaper (テープ的なドライブ)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│     bitcrusher      │  BitCrusher AudioWorklet
│  (bitcrusherWorklet)│  ・bitDepth: 量子化ビット数 (2〜16bit)
│                     │  ・holdFrames: サンプルホールド (サンプルレート低下)
│                     │  ・mix: wet/dry ブレンド
│                     │  ・三角ディザリング (量子化歪み → ヒス音化)
│                     │  ・1次ノイズシェーピング (高域へノイズ押し出し)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  postCrushLowpass   │  Noise Reduction: ローパス
│                     │  noiseReductionAmount で制御
│                     │  0% = 18000Hz (素通り)
│                     │  100% = 3000Hz (強めにカット)
│                     │  ノイズシェーピングで高域に押し出された
│                     │  量子化ノイズをここで除去
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│      bassEq         │  Low shelf EQ  (180Hz)
│      midEq          │  Peaking EQ    (1200Hz, Q=0.5)
│      trebleEq       │  High shelf EQ (2800Hz)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│   tapeSaturator     │  テープサチュレーション (WaveShaper, tanh曲線)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│    stereoWidth      │  Stereo Width AudioWorklet
│ (stereoWidthWorklet)│  -1.0 = モノラル、0 = 標準、+1.0 = 広め
└─────────────────────┘
         │
         ├──────────────────────────────────────┐
         ▼                                      ▼
┌─────────────────┐                  ┌─────────────────┐
│  roomDryGain    │                  │  roomConvolver  │  Small speaker room
│  (dry path)     │                  │  roomWetGain    │  インパルス応答 (0.22s)
└─────────────────┘                  └─────────────────┘
         │                                      │
         └──────────────┬───────────────────────┘
                        ▼
               ┌─────────────────┐
               │   masterGain    │  音量 / ミュート
               └─────────────────┘
                        │
          ┌─────────────┼──────────────┬──────────────┐
          ▼             ▼              ▼              ▼
  ┌────────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
  │ outputBus  │ │echoDelay  │ │hallReverb │ │  chorus   │
  │ (dry)      │ │(echo/delay│ │(hall conv)│ │(2 delay + │
  │            │ │+ feedback)│ │           │ │ 2 LFO)    │
  └────────────┘ └───────────┘ └───────────┘ └───────────┘
          │             │              │              │
          └─────────────┴──────────────┴──────────────┘
                        ▼
               ┌─────────────────┐
               │   outputBus     │
               └─────────────────┘
                        │
                        ▼
               ┌─────────────────┐
               │  busCompressor  │  ダイナミクス圧縮
               └─────────────────┘
                        │
                        ▼
               ┌─────────────────┐
               │  fxOutputGain   │  FX 出力トリム
               └─────────────────┘
                        │
               ┌────────┴────────┐
               ▼                 ▼
        [destination]   [recordingDestination]
```

---

## ノイズ系の並列パス (masterGain からタップ)

```
               ┌─────────────────┐
               │   masterGain    │
               └─────────────────┘
                   │         │
                   ▼         ▼
          ┌──────────┐  ┌──────────┐
          │  noise   │  │ crackle  │  Vinyl dust / ノイズ
          │  source  │  │ source   │
          │(tinted   │  │(vinyl    │
          │ noise)   │  │ dust)    │
          └──────────┘  └──────────┘
```

---

## パラメーター一覧

| パラメーター | 対象ノード | 範囲 | 備考 |
|---|---|---|---|
| `lofiAmount` | lofiLowpass / lofiHighshelf / lofiDrive | 0〜1 | pre-crush 帯域制限 |
| `radioToneAmount` | radioTone 系3ノード | 0〜1 | ラジオっぽい帯域特性 |
| `bitCrushAmount` | bitcrusher (bitDepth) | 0〜1 | 0=16bit, 1=4bit |
| `sampleRateReductionAmount` | bitcrusher (holdFrames) | 0〜1 | 0=フルレート, 1=1/24レート |
| `noiseReductionAmount` | postCrushLowpass | 0〜1 | 0=18kHz, 1=3kHz |
| `bassAmount` | bassEq (gain) | -1〜1 | ±15dB at 180Hz |
| `midAmount` | midEq (gain) | -1〜1 | ±15dB at 1200Hz |
| `trebleAmount` | trebleEq (gain) | -1〜1 | ±15dB at 2800Hz |
| `stereoWidthAmount` | stereoWidth | -1〜1 | -1=mono, 0=std |
| `smallSpeakerRoomAmount` | roomConvolver wet | 0〜1 | 小スピーカー空間 |
| `wowFlutterAmount` | wowFlutterDelay + LFO | 0〜1 | テープのヨレ |
| `tapeSaturationAmount` | tapeSaturator | 0〜1 | テープ的な歪み |
| `delayAmount` | echoDelay | 0〜1 | エコー (0.32s) |
| `reverbAmount` | hallReverb | 0〜1 | ホールリバーブ (2.2s) |
| `chorusAmount` | chorus (2 delay + LFO) | 0〜1 | コーラス |
| `compressorAmount` | busCompressor | 0〜1 | バスコンプ |
| `fxOutputTrimAmount` | fxOutputGain | 0〜1 | 出力トリム |
| `noiseLevel` | noiseGain | 0〜1 | ヒスノイズ量 |
| `vinylDustAmount` | crackleGain + dustBed | 0〜1 | レコードノイズ |

---

## ビットクラッシャーのノイズ対策 (bitcrusherWorklet.js)

```
[入力サンプル]
     │
     ├─ 三角ディザリング: (rand1 + rand2 - 1) × LSB を加算
     │   → 量子化歪み（ハーモニック）をランダムなヒス音に変換
     │
     ├─ 1次ノイズシェーピング: 前回の量子化誤差 × 0.85 を減算
     │   → 量子化ノイズのスペクトルを高域にシフト
     │
     ▼
  [量子化 (bitDepth bit)]
     │
     ▼
  [postCrushLowpass でシフトした高域ノイズをカット]
```

**なぜ bitCrush を上げると白ノイズになるか:**  
複雑な音声を量子化すると誤差がほぼ一様分布になる（= 白ノイズ）。  
4〜5bit では SNR ≈ 25dB になり、ノイズが信号と同レベルになる。  
ノイズシェーピング + postCrushLowpass で知覚的なノイズを軽減できるが、完全な除去は物理的に不可能。

---

## 発展課題: チェーン順序の検討

### 1. 空間系を postCrushLowpass の前に置く

**現在の配線:**
```
bitcrusher → postCrushLowpass → EQ → reverb / delay / chorus
```
→ クリーンな空間系がローファイ信号にかかる。リバーブのテールはきれい。

**別案:**
```
bitcrusher → reverb / delay / chorus → postCrushLowpass → EQ
```
→ リバーブのテール自体にもエイリアスノイズが乗る。  
→ 本物のテープエコー（テープにノイズが乗ったままエコーになる）に近い質感。  
→ `noiseReductionAmount` を上げると空間系のテールまとめてクリーンになる。

---

### 2. EQ を bitCrush の前に置く

**現在の配線:**
```
bitcrusher → postCrushLowpass → EQ（bass / mid / treble）
```
→ crush 後に整える。量子化ノイズも EQ の影響を受ける。

**別案（pre-crush EQ）:**
```
EQ → bitcrusher → postCrushLowpass
```
→ 帯域を絞ってから crush するので、エイリアシングする周波数成分を事前に減らせる。  
→ ベースを上げてから crush すると低域のノイズが増えるが、pre-crush で下げておけば回避できる。

---

### 3. Compressor の位置

**現在:** 最後段（outputBus の後）
```
... → outputBus → busCompressor → fxOutputGain
```
→ 全エフェクト込みのダイナミクスを整える。ノイズが大きくなった分も圧縮される。

**別案（pre-crush Compressor）:**
```
[Source] → Compressor → wowFlutter → ... → bitcrusher → ...
```
→ 入力レベルを揃えてから crush することで、量子化ノイズが一定になる（信号が小さいときだけノイズが目立つ問題を軽減）。

---

### 4. Stereo Width の位置

**現在:** tapeSaturator の後、room（small speaker）の前
```
tapeSaturator → stereoWidth → roomDryGain / roomConvolver
```
→ ステレオ幅を決めてから空間系をかける。

**別案:** 空間系の後に置く
```
roomConvolver → stereoWidth
```
→ リバーブのステレオ広がりも含めて幅を制御できる。

---

### まとめ: 順序の判断基準

| 問い | 前に置く | 後に置く |
|---|---|---|
| ノイズをエフェクトのキャラに含めたい？ | 空間系を crush の前 | 空間系を crush の後 |
| 入力を均一にしてから crush したい？ | compressor を前 | compressor を後 |
| 帯域を絞ってからノイズを出したい？ | EQ を前 | EQ を後 |
| 空間系の広がりも幅制御に含めたい？ | stereoWidth を後 | stereoWidth を前 |

正解はなく、**目的の質感**によって変わる。
