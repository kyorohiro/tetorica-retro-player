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

---

## 発展課題: 波形変換（三角波・矩形波化）

GB/FC のリアルな音の正体は「ビットクラッシュ後の音」ではなく  
**最初から矩形波・三角波で生成されていた**こと。  
既存の音声をこれらの波形に「変換」できれば、より本物に近い質感が得られる。

---

### アプローチ1: FFT → スペクトル整形 → IFFT

```
入力 → [FFT (1024 samples)] → スペクトル整形 → [IFFT + overlap-add] → 出力

スペクトル整形の内容:
  偶数次倍音 (2f, 4f, 6f...) → 0 に
  奇数次倍音 (1f, 3f, 5f...) → 1/n² でスケール  ← 三角波の倍音構成
```

**リアルタイム時の課題:**
- FFT ウィンドウ分の遅延が発生する (1024samples ÷ 44100Hz ≈ 23ms)
- 動画プレイヤーなら映像側も同じ分だけ遅らせれば許容範囲
- AudioWorklet で実装可能だが overlap-add 再構成が必要

**本質的な限界:**  
ピッチ検出なしの整形なので「三角波っぽい音色」にはなるが、  
ポリフォニック音声（和音・複数楽器）では倍音が競合して音程感が崩れやすい。  
ギター単音・モノシンセには効果的。

---

### アプローチ2: Waveform Folding（FFT 不要・遅延ゼロ）

```javascript
// 入力サンプルを三角波パターンにマッピング
fold(x) = 4 * abs(x/2 - floor(x/2 + 0.5)) - 1
```

- 遅延ゼロ・AudioWorklet で数行で実装できる
- 全帯域に適用するので音楽によっては破綻しやすい
- 前段にローパスを入れてから fold すると比較的安定する

---

### アプローチ3: オフライン処理（Compile タイム変換）★将来的に面白い

リアルタイムの制約がなければ、より高品質な変換が可能。

```
[ファイル読み込み]
     │
     ▼
[オフライン音源分離]  ← 例: Demucs 等で vocals / bass / drums / other に分離
     │
     ├─ vocals  → 矩形波化 (Pulse 50%)
     ├─ bass    → 三角波化 (NES triangle channel 的)
     ├─ drums   → ノイズチャンネル的処理
     └─ other   → 矩形波化 (Pulse 25%)
     │
     ▼
[各チャンネルをミックス]
     │
     ▼
[変換済みファイルとして保存 / キャッシュ]
     │
     ▼
[通常の再生パイプラインへ]
```

**メリット:**
- 処理時間の制約なし → 高品質な変換ができる
- 変換結果をキャッシュすれば2回目以降は即再生
- 音源分離によりパートごとに波形を変えられる → よりリアルな GB/FC 感

**実装イメージ:**
- Web Worker でバックグラウンド処理
- OfflineAudioContext で高速レンダリング（再生速度の数倍で処理可能）
- 変換中は通常の lo-fi モードで再生 → 変換完了後に切り替え

**参考技術:**
- `OfflineAudioContext` (Web Audio API) — バックグラウンド高速レンダリング
- Demucs / Spleeter — 音源分離 (Python / WASM 版もある)
- Phase Vocoder — FFT ベースの音色変換

---

### まとめ: 実現難易度

| アプローチ | 遅延 | 音質 | 実装難度 | 備考 |
|---|---|---|---|---|
| Waveform Folding | ゼロ | △ | 低 | 今すぐ追加できる |
| FFT スペクトル整形 | ~23ms | ○ | 中 | AudioWorklet で実装可能 |
| オフライン変換 (モノ音源) | なし (事前処理) | ○ | 中 | OfflineAudioContext |
| オフライン変換 + 音源分離 | なし (事前処理) | ◎ | 高 | 最もリアルな GB/FC 感 |
