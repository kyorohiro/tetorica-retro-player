# Tube Noise — 真空管ノイズの設計

## 目標

現状のノイズは「温かみが足りない」。他のエフェクトパラメーターと同様に
UI でいじれる形で、真空管アンプのヒス音に近いノイズを作り込みたい。

## 真空管ノイズの特性

- 低〜中域（200〜800Hz）に自然な温かみがある
- 高域はなだらかにロールオフ（4〜5kHz 以上がソフト）
- **偶数倍音（2nd harmonic）** による「グロー」感 → soft even-harmonic clip
- ピンクノイズ〜ブラウンノイズの中間程度の周波数特性

## 現状の問題点

| 場所 | 内容 |
|---|---|
| `noiseHighpassNode.frequency = 1100` | 温かみ帯域（200〜800Hz）を全部カットしている |
| `noiseFilterNode` peaking 2400Hz -2.5dB | 中域をカットしてさらに薄くなる |
| `createTintedNoiseBuffer` air 成分 0.55 | 高域エアー成分が強くシャリシャリした印象 |

## 変更案

### バッファ生成（`createTintedNoiseBuffer` → `createTubeNoiseBuffer`）

```typescript
// brown を強め、air を抑え、soft even-harmonic saturation を乗せる
brownState = (brownState + white * 0.06) / 1.06;
const body = brownState * 2.2;
const air  = (white - airState) * 0.15;  // 0.55 → 0.15 に削減
const preSat = body + air;
// x - α·x² → 偶数倍音のグロー（DC ズレを最小化するため小さめ係数）
const sample = Math.max(-1, Math.min(1, preSat - preSat * Math.abs(preSat) * 0.12));
```

### フィルターチェーン

| ノード | 現在 | 変更案 |
|---|---|---|
| highpass | 1100Hz, Q=0.25 | 200Hz, Q=0.5（温かみを通す） |
| lowpass | 5600Hz, Q=0.18 | 4500Hz, Q=0.2（高域を柔らかく） |
| peaking | 2400Hz -2.5dB, Q=0.7 | 350Hz +1.5dB, Q=0.9（温かみブースト）|
| peaking2（追加） | — | 3200Hz -2.0dB, Q=0.8（硬さ軽減） |

### UI パラメーター化

他のエフェクト同様にスライダーで調整できるようにしたい:

- **Warmth** (lowpass 周波数 + brown ゲイン)
- **Air** (air 成分の混合量)
- **Saturation** (偶数倍音の量)
- **Presence** (peaking 中域の量)

## 実装場所

- バッファ: `src/retro-player/audio/audioChainEngine.ts` — `createTintedNoiseBuffer()`
- フィルターチェーン: 同ファイル L380〜413 の Noise chain セクション
- UI: 他のエフェクトパラメーターと同じ構造で追加
