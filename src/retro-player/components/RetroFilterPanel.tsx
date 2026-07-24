import { useEffect, useState } from "react";
import {
  MONO_TINTS,
  RETRO_PRESET_CATEGORIES,
  RETRO_PRESET_CATEGORY_LABELS,
  RETRO_PRESET_CATEGORY_ORDER,
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type PhosphorDotShape,
  type RetroPresetDefinition,
  type RetroPresetKey,
  type TargetSamplingMode,
} from "../retro/config";
import type { RetroPlayerLocale } from "../types";

// Grain strength spans from subtle (0.1) to extreme (~1000) — a linear
// slider can't cover that range at a usable step size, so the slider itself
// moves on a log2 scale (every GRAIN_SLIDER_UNITS_PER_DOUBLING units doubles
// the value) while the stored/shader value stays a plain float. 0 is a
// special case (off) since log2(0) is undefined.
const GRAIN_LOG_BASE = 0.1;
const GRAIN_SLIDER_UNITS_PER_DOUBLING = 10;
const GRAIN_SLIDER_MAX = 133; // ~0.1 * 2^13.3 ≈ 1000

const grainValueToSlider = (value: number) => {
  if (value <= 0) return 0;
  return Math.min(
    GRAIN_SLIDER_MAX,
    Math.max(0, GRAIN_SLIDER_UNITS_PER_DOUBLING * Math.log2(value / GRAIN_LOG_BASE)),
  );
};

const grainSliderToValue = (slider: number) => {
  if (slider <= 0) return 0;
  return GRAIN_LOG_BASE * Math.pow(2, slider / GRAIN_SLIDER_UNITS_PER_DOUBLING);
};

function InfoTip({
  label,
  text,
  helpSuffix,
}: {
  label: string;
  text: string;
  helpSuffix: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <span className="relative inline-flex items-center group">
        <button
          type="button"
          aria-label={`${label}${helpSuffix}`}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#a8a29a]/80 bg-[#eae6df] text-[10px] font-bold leading-none text-[#1a1610] transition hover:border-[#000000] hover:text-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#000000]"
        >
          ?
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-52 -translate-x-1/2 rounded-lg border border-[#bcb4a6]/80 bg-[#f5f1ea] px-3 py-2 text-[11px] leading-4 text-[#12141c] opacity-0 shadow-lg transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {text}
        </span>
      </span>
    </span>
  );
}

type RetroFilterPanelProps = {
  locale: RetroPlayerLocale;
  colorLevels: number;
  curvature: number;
  ditherStrength: number;
  glowStrength: number;
  horizontalSharpness: number;
  rgbConvergenceOffset: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
  isFilterEnabled: boolean;
  monoTint: MonoTintMode;
  paletteMode: PaletteMode;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  outputBrightness: number;
  basicContrast: number;
  basicSaturation: number;
  phosphorDotLightBalance: number;
  phosphorDotShape: PhosphorDotShape;
  phosphorDotInternalScale: 1 | 2 | 3;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  phosphorDotGrainStrength: number;
  phosphorDotGlowColorStrength: number;
  beamDarkCutoff: number;
  beamHorizontalSpread: number;
  beamStripeStrength: number;
  beamWhiteBloom: number;
  beamWarmBloom: number;
  screenFaceGlow: number;
  scanlineBrightnessFade: number;
  scanlineStrength: number;
  scanline2Strength: number;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  selectedPreset: RetroPresetKey | null;
  sourceDimensions: { width: number; height: number } | null;
  targetHeight: number;
  targetWidth: number;
  autoTargetSize: boolean;
  samplingMode: TargetSamplingMode;
  matchTargetAspect: boolean;
  vignetteStrength: number;
  focusStrength: number;
  focusWidth: number;
  focusHeight: number;
  onApplyPreset: (preset: RetroPresetKey) => void;
  onSetIsFilterEnabled: (value: boolean) => void;
  onSetColorLevels: (value: number) => void;
  onSetCurvature: (value: number) => void;
  onSetDitherStrength: (value: number) => void;
  onSetGlowStrength: (value: number) => void;
  onSetHorizontalSharpness: (value: number) => void;
  onSetRgbConvergenceOffset: (value: number) => void;
  onSetSmoothStrength: (value: number) => void;
  onSetToonSteps: (value: number) => void;
  onSetEdgeBoost: (value: number) => void;
  onSetAnimeEdgeLow: (value: number) => void;
  onSetAnimeEdgeHigh: (value: number) => void;
  onSetMonoTint: (value: MonoTintMode) => void;
  onSetPaletteMode: (value: PaletteMode) => void;
  onSetPhosphorStrength: (value: number) => void;
  onSetSpotMaskStrength: (value: number) => void;
  onSetBulbRadius: (value: number) => void;
  onSetBlackFloor: (value: number) => void;
  onSetOutputBrightness: (value: number) => void;
  onSetBasicContrast: (value: number) => void;
  onSetBasicSaturation: (value: number) => void;
  onSetPhosphorDotLightBalance: (value: number) => void;
  onSetPhosphorDotShape: (value: PhosphorDotShape) => void;
  onSetPhosphorDotInternalScale: (value: 1 | 2 | 3) => void;
  onSetPhosphorDotBrightCore: (value: boolean) => void;
  onSetPhosphorDotCellFill: (value: number) => void;
  onSetPhosphorDotFlatDisc: (value: boolean) => void;
  onSetPhosphorDotNeighborBlend: (value: boolean) => void;
  onSetPhosphorDotGrainStrength: (value: number) => void;
  onSetPhosphorDotGlowColorStrength: (value: number) => void;
  onSetBeamDarkCutoff: (value: number) => void;
  onSetBeamHorizontalSpread: (value: number) => void;
  onSetBeamStripeStrength: (value: number) => void;
  onSetBeamWhiteBloom: (value: number) => void;
  onSetBeamWarmBloom: (value: number) => void;
  onSetScreenFaceGlow: (value: number) => void;
  onSetScanlineBrightnessFade: (value: number) => void;
  onSetScanlineStrength: (value: number) => void;
  onSetScanline2Strength: (value: number) => void;
  onRequestEnableBeamCross?: () => void | Promise<void>;
  onSetNeonBoost: (value: number) => void;
  onSetNeonSaturation: (value: number) => void;
  onSetNeonDetail: (value: number) => void;
  onSetTargetHeight: (value: number) => void;
  onSetTargetWidth: (value: number) => void;
  onSetAutoTargetSize: (value: boolean) => void;
  onSetSamplingMode: (value: TargetSamplingMode) => void;
  onSetMatchTargetAspect: (value: boolean) => void;
  onSetVignetteStrength: (value: number) => void;
  onSetFocusStrength: (value: number) => void;
  onSetFocusWidth: (value: number) => void;
  onSetFocusHeight: (value: number) => void;
};

export function RetroFilterPanel({
  locale,
  colorLevels,
  curvature,
  ditherStrength,
  glowStrength,
  horizontalSharpness,
  rgbConvergenceOffset,
  smoothStrength,
  toonSteps,
  edgeBoost,
  animeEdgeLow,
  animeEdgeHigh,
  isFilterEnabled,
  monoTint,
  paletteMode,
  phosphorStrength,
  spotMaskStrength,
  bulbRadius,
  blackFloor,
  outputBrightness,
  basicContrast,
  basicSaturation,
  phosphorDotLightBalance,
  phosphorDotShape,
  phosphorDotInternalScale,
  phosphorDotBrightCore,
  phosphorDotCellFill,
  phosphorDotFlatDisc,
  phosphorDotNeighborBlend,
  phosphorDotGrainStrength,
  phosphorDotGlowColorStrength,
  beamDarkCutoff,
  beamHorizontalSpread,
  beamStripeStrength,
  beamWhiteBloom,
  beamWarmBloom,
  screenFaceGlow,
  scanlineBrightnessFade,
  scanlineStrength,
  scanline2Strength,
  neonBoost,
  neonSaturation,
  neonDetail,
  selectedPreset,
  sourceDimensions,
  targetHeight,
  targetWidth,
  autoTargetSize,
  samplingMode,
  matchTargetAspect,
  vignetteStrength,
  onApplyPreset,
  onSetIsFilterEnabled,
  onSetColorLevels,
  onSetCurvature,
  onSetDitherStrength,
  onSetGlowStrength,
  onSetHorizontalSharpness,
  onSetRgbConvergenceOffset,
  onSetSmoothStrength,
  onSetToonSteps,
  onSetEdgeBoost,
  onSetAnimeEdgeLow,
  onSetAnimeEdgeHigh,
  onSetMonoTint,
  onSetPaletteMode,
  onSetPhosphorStrength,
  onSetSpotMaskStrength,
  onSetBulbRadius,
  onSetBlackFloor,
  onSetOutputBrightness,
  onSetBasicContrast,
  onSetBasicSaturation,
  onSetPhosphorDotLightBalance,
  onSetPhosphorDotShape,
  onSetPhosphorDotInternalScale,
  onSetPhosphorDotBrightCore,
  onSetPhosphorDotCellFill,
  onSetPhosphorDotFlatDisc,
  onSetPhosphorDotNeighborBlend,
  onSetPhosphorDotGrainStrength,
  onSetPhosphorDotGlowColorStrength,
  onSetBeamDarkCutoff,
  onSetBeamHorizontalSpread,
  onSetBeamStripeStrength,
  onSetBeamWhiteBloom,
  onSetBeamWarmBloom,
  onSetScreenFaceGlow,
  onSetScanlineBrightnessFade,
  onSetScanlineStrength,
  onSetScanline2Strength,
  onRequestEnableBeamCross,
  onSetNeonBoost,
  onSetNeonSaturation,
  onSetNeonDetail,
  onSetTargetHeight,
  onSetTargetWidth,
  onSetAutoTargetSize,
  onSetSamplingMode,
  onSetMatchTargetAspect,
  onSetVignetteStrength,
}: RetroFilterPanelProps) {
  const [localTargetWidth, setLocalTargetWidth] = useState(targetWidth);
  const [localTargetHeight, setLocalTargetHeight] = useState(targetHeight);
  const [realtimeTargetSize, setRealtimeTargetSize] = useState(false);
  useEffect(() => setLocalTargetWidth(targetWidth), [targetWidth]);
  useEffect(() => setLocalTargetHeight(targetHeight), [targetHeight]);

  const helpText =
    locale === "ja"
      ? {
          helpSuffix: "のヘルプ",
          curvature:
            "古い CRT の湾曲ガラスのように、画面を内側へたわませます。値を上げるほど端の反りが強くなります。",
          bayerDither:
            "4x4 のドットパターンを加えて減色の見え方をなじませます。値を上げるほど格子感とザラつきが強くなります。",
          scanline:
            "古い表示のような横方向の暗い帯を加えます。値を上げるほど線の隙間が目立ちます。",
          scanline2:
            "さらに細かい第2のライン感を加えます。より密な CRT の縞感が欲しいときに使います。",
          scanlineBrightFade:
            "明るい部分では scanline を薄くします。値を上げると暗部は縞を保ちつつ、明部は自然に発光して見えます。",
          vignette:
            "画面の外周を暗くします。値を上げるほど中央に視線が集まり、レトロな額縁感も強くなります。",
          glow:
            "明るい部分のまわりに柔らかな光のにじみを足します。値を上げるほどハイライトが広がって熱っぽく見えます。",
          horizontalSharpness:
            "横方向の輪郭の硬さです。1.00 が中立で、下げると少しにじみ、上げると横線や文字のエッジが立ちます。",
          rgbConvergenceOffset:
            "R と B を左右にわずかにずらして、ブラウン管の色収差や調整ずれのような発光縁を作ります。少量でも効きやすいです。",
          smooth:
            "近い色同士を少しだけならして、細かな質感を減らします。アニメ調では面がまとまりやすくなりますが、上げすぎると眠い絵になります。",
          toonSteps:
            "明るさの段階数を減らして、セル画みたいな影の切れ目を作ります。0 で無効、少ないほどアニメ寄りになります。",
          edgeBoost:
            "輪郭の変化を拾って、境界を少し暗く締めます。明るい場所では効きを少し弱めています。上げるほど形が読みやすくなりますが、ノイズや圧縮のザラつきも見えやすくなります。",
          phosphor:
            "CRT 表面の発光構造のような RGB の細かな揺らぎを加えます。値を上げるほど画面テクスチャが見えやすくなります。",
          spotMask:
            "Phosphor Dot のセル形状を有効にします。値を上げるほどドット構造と CRT 風マスクがはっきり見えます。",
          cellFill:
            "各 phosphor セル内部に均一なベース光を加えます。上げるとセル全体が明るくなり、下げると黒が残りやすくなります。",
          bulbRadius:
            "各 phosphor セル内で光るバルブの大きさを決めます。下げるほど明るい芯が小さくなり、周囲の黒が増えます。",
          blackFloor:
            "phosphor バルブ周囲の黒背景へどれだけ光が漏れるかを決めます。下げるほど未点灯部分が純黒に近づきます。",
          lumaAmount:
            "Luma compressor 全体の効き量です。0 で無効、1 で通常、上げると明暗補正が強く出ます。",
          lumaLow:
            "これより暗い輝度を持ち上げ始めます。黒つぶれを減らして、暗部を見やすくします。",
          lumaHigh:
            "これより明るい輝度を圧縮し始めます。白飛びや強すぎる発光を丸めます。",
          lumaKnee:
            "Luma Low / High の閾値外で圧縮できる余裕幅です。上げると閾値を超えた先まで緩やかに追従し、下げるとタイトに切れます。",
          saturationAmount:
            "Saturation compressor 全体の効き量です。0 で無効、1 で通常、上げると彩度補正が強く出ます。",
          saturationLow:
            "これより低い彩度を持ち上げ始めます。くすんだ色を少し起こして、色味を見やすくします。",
          saturationHigh:
            "これより高い彩度を圧縮し始めます。派手すぎる色や色飽和を丸めます。",
          saturationKnee:
            "Saturation Low / High の閾値外で圧縮できる余裕幅です。上げると閾値を超えた先まで緩やかに追従し、下げるとタイトに切れます。",
          lightLevel:
            "色付き phosphor バルブ全体の明るさを一様に調整します。下げると全体が暗くなり、上げると均一に明るくなります。",
          beamDarkCutoff:
            "暗い pixel を beam 光源として扱い始めるしきい値です。上げると暗部の RGB やモアレが減り、下げると細部まで光りやすくなります。",
          beamHorizontalSpread:
            "横方向へ光が伸びる広がりです。上げるほど beam が左右へつながりやすくなり、下げると点の独立感が強くなります。",
          beamStripeStrength:
            "RGB バー自体の見えやすさです。上げると格子や triad が前に出て、下げると発光面の印象が強くなります。",
          beamWhiteBloom:
            "明るい部分の白い発光芯の強さです。上げるとハイライトが熱っぽく光り、下げると色バーの輪郭が残りやすくなります。",
          beamWarmBloom:
            "Beam Cross の bloom を少し暖色寄りにします。上げるほど白い光にアンバーの熱感が混ざり、実写でもゲームでも少し温かい発光に見えます。",
          screenFaceGlow:
            "画面中央に、うっすら面発光する明るさを足します。0 なら無効で、上げるほど黒背景でもブラウン管の表面がぼんやり光っている感じを出します。",
          outputBrightness:
            "スキャンラインやヴィネットなど全ての効果を適用し終えた最終映像に、一律の明るさゲインを掛けます。CSS の brightness と同じ最終段の調整なので、ドットの形やモアレには影響しません。",
          basicContrast:
            "映像全体の明暗差を素直に広げたり弱めたりします。1.00 が標準で、下げると柔らかく、上げるとメリハリが強くなります。",
          basicSaturation:
            "映像全体の色の強さを一括で調整します。1.00 が標準で、下げると落ち着いた色、上げると鮮やかな色になります。",
          closeUpNoise:
            "細かなアニメーション粒子を足して、近接撮影した CRT っぽさを出します。値を上げると効果を確認しやすくなります。",
          focus:
            "画面の周辺部をぼかして中央に焦点を合わせます。値を上げるほど周辺のぼけが強くなり、被写界深度のような効果が得られます。",
          focusWidth:
            "中央でくっきり見せる横方向の広さです。下げるほど縦長の焦点になり、上げるほど左右に広くシャープな領域が残ります。",
          focusHeight:
            "中央でくっきり見せる縦方向の広さです。下げるほど上下が早くぼけ、上げるほど広い帯が合焦したまま残ります。",
        }
      : {
          helpSuffix: " help",
          curvature:
            "Bends the picture inward to mimic the curved glass of an old CRT. Higher values make the screen edges bow more.",
          bayerDither:
            "Adds a 4x4 dot pattern to smooth reduced colors. Higher values make the image feel more grid-like and gritty.",
          scanline:
            "Adds broad horizontal dark bands like an old display. Higher values make the line gaps more obvious.",
          scanline2:
            "Adds a finer second layer of line texture. Useful when you want a denser CRT stripe feel.",
          scanlineBrightFade:
            "Makes scanlines fade out in bright areas. Higher values keep dark parts striped while bright parts look more naturally emissive.",
          vignette:
            "Darkens the outer edges of the screen. Higher values pull more attention toward the center and can be exaggerated for a stronger retro frame.",
          glow:
            "Adds a soft light bloom around bright areas. Higher values make highlights spread and feel hotter, even beyond the usual subtle CRT look.",
          horizontalSharpness:
            "Controls edge firmness across the horizontal axis. 1.00 is neutral; lower values soften sideways detail, higher values make text and vertical edges snap harder.",
          rgbConvergenceOffset:
            "Offsets the red and blue channels slightly left and right to mimic CRT convergence error. Even small values can add a convincing colored glow fringe.",
          smooth:
            "Gently blends nearby colors to knock back fine texture. This helps toon-style presets form cleaner color regions, but too much will make the image feel sleepy.",
          toonSteps:
            "Reduces the number of brightness bands to create cel-style shading breaks. Use 0 to disable it; fewer steps look more toon-like.",
          edgeBoost:
            "Detects local contrast changes and darkens contour boundaries slightly. The effect eases off in very bright areas. Higher values make shapes easier to read, but can also bring out noise and compression grit.",
          phosphor:
            "Adds subtle RGB triad variation like the glow structure of a CRT surface. Higher values make the screen texture more visible and easier to inspect.",
          spotMask:
            "Enables the phosphor-dot cell shaping itself. Higher values make the dot structure and CRT-style masking more visible.",
          cellFill:
            "Adds a more uniform base fill inside each phosphor cell. Raise it to make the whole cell brighter; lower it to keep more black visible.",
          bulbRadius:
            "Sets how large the glowing bulb can grow inside each phosphor cell. Lower values make the lit core smaller and expose more black around it.",
          blackFloor:
            "Sets how much light leaks into the black background around each phosphor bulb. Lower values keep the unlit area closer to pure black.",
          lumaAmount:
            "Overall strength of the luma compressor. 0 disables it, 1 is normal, and higher values push the tone shaping harder.",
          lumaLow:
            "Starts lifting luminance below this point. Use it to reduce crushed shadows and recover dark detail.",
          lumaHigh:
            "Starts compressing luminance above this point. Use it to tame clipped highlights and overly hot glow.",
          lumaKnee:
            "Sets the headroom beyond the Low and High thresholds before the compressor clips. Higher values allow more range; lower values are tighter.",
          saturationAmount:
            "Overall strength of the saturation compressor. 0 disables it, 1 is normal, and higher values push the color shaping harder.",
          saturationLow:
            "Starts lifting saturation below this point. Useful for waking up dull, muted color without pushing everything harder.",
          saturationHigh:
            "Starts compressing saturation above this point. Useful for taming overly vivid color and saturation clipping.",
          saturationKnee:
            "Sets the headroom beyond the Low and High thresholds before the compressor clips. Higher values allow more range; lower values are tighter.",
          lightLevel:
            "Scales the brightness of the colored phosphor bulbs uniformly, like changing the drive voltage. Lower values dim the whole dot; higher values brighten it evenly.",
          beamDarkCutoff:
            "Sets how bright a source pixel must be before Beam Cross treats it as a light source. Higher values reduce dark-area RGB and moire; lower values let dim detail glow more easily.",
          beamHorizontalSpread:
            "Controls how far the beam stretches horizontally. Higher values connect neighboring light more easily; lower values keep each lit point more separate.",
          beamStripeStrength:
            "Controls how visible the RGB bar structure is. Higher values bring the stripe grid forward; lower values favor the luminous surface instead.",
          beamWhiteBloom:
            "Controls the strength of the white hot core in bright highlights. Higher values feel hotter and more emissive; lower values preserve more of the colored bar structure.",
          beamWarmBloom:
            "Warms up the Beam Cross bloom. Higher values mix a gentle amber heat into bright glow so highlights feel less sterile and more like a warm CRT flare.",
          screenFaceGlow:
            "Adds a subtle face glow centered on the screen. At 0 it is fully off; higher values make even dark scenes feel like the CRT glass itself is faintly glowing.",
          outputBrightness:
            "Applies a single uniform brightness gain to the final image, after scanlines, vignette, and every other effect. It's the same kind of last-stage adjustment as CSS brightness, so it doesn't change dot shapes or introduce moire.",
          basicContrast:
            "Adjusts overall contrast in a straightforward way. 1.00 is neutral; lower values soften the image, while higher values add punch.",
          basicSaturation:
            "Adjusts overall color intensity across the whole image. 1.00 is neutral; lower values mute the image, higher values make it more vivid.",
          closeUpNoise:
            "Adds fine animated grain so the screen feels less clean and more like a close-up filmed CRT. Higher values are useful for clearly previewing the effect.",
          focus:
            "Blurs the periphery of the image, keeping the center sharp. Higher values increase the defocus at the edges for a depth-of-field style effect.",
          focusWidth:
            "Sets how wide the sharp center stays horizontally. Lower values make the focus area narrower; higher values keep more of the left and right sides crisp.",
          focusHeight:
            "Sets how tall the sharp center stays vertically. Lower values make the top and bottom blur sooner; higher values preserve a taller in-focus band.",
        };
  const isPhosphorDotModeActive =
    phosphorDotShape !== "beam" &&
    spotMaskStrength > 0.001 &&
    (
      phosphorDotInternalScale > 1 ||
      phosphorDotBrightCore ||
      phosphorDotCellFill > 0.001 ||
      phosphorDotFlatDisc ||
      phosphorDotNeighborBlend
    );
  const isBeamCrossModeActive = phosphorDotShape === "beam";
  const presetButtonClass = (isSelected: boolean, isFeatured?: boolean) => [
    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
    isSelected
      ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
      : "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20",
      isFeatured
        ? isSelected
          ? " font-bold bg-[repeating-linear-gradient(20deg,#0596694d,#0596694d_1px,transparent_1px,transparent_30px)] "
          : " font-bold bg-[repeating-linear-gradient(20deg,#f59e0b4d,#f59e0b4d_1px,transparent_1px,transparent_30px)] "
        : "",
  ].join(" ");

  const presetsByCategory = RETRO_PRESET_CATEGORY_ORDER.map((category) => ({
    category,
    presets: Object.entries(RETRO_PRESETS).filter(
      ([key]) => key !== "none" && RETRO_PRESET_CATEGORIES[key as keyof typeof RETRO_PRESET_CATEGORIES] === category,
    ),
  }));

  return (
    <>
      {/* "None" and the power toggle sit outside the preset category boxes. */}
      <div className="rounded-lg border border-[#bcb4a6]/70 bg-[#f5f1ea]/50 p-2">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              onSetIsFilterEnabled(!isFilterEnabled);
            }}
            className={[
              "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
              isFilterEnabled
                ? "border-emerald-400 bg-emerald-500/20"
                : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
            ].join(" ")}
          >
            {isFilterEnabled ? "Filter on" : "Filter off"}
          </button>
          <button
            type="button"
            onClick={() => {
              onApplyPreset("none");
            }}
            className={presetButtonClass(selectedPreset === "none")}
          >
            {RETRO_PRESETS.none.label}
          </button>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {presetsByCategory.map(({ category, presets }) => (
          <div
            key={category}
            className="rounded-lg border border-[#bcb4a6]/70 bg-[#f5f1ea]/50 p-2"
          >
            <p className="mb-1.5 px-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#7a7268]">
              {RETRO_PRESET_CATEGORY_LABELS[category]}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {presets.map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onApplyPreset(key as RetroPresetKey);
                  }}
                  className={presetButtonClass(
                    selectedPreset === key,
                    (preset as RetroPresetDefinition).featured,
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-[#12141c]">Palette</span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(
              ["free", "pc98", "pc98_tile", "pc98_512", "pc98_512_sat", "pc98_4096", "color32", "color64", "mono", "neon", "anime"] as const
            ).map(
              (mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  onSetPaletteMode(mode);
                }}
                className={[
                  "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                  paletteMode === mode
                    ? "border-[#000000] bg-[#111014]/20"
                    : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                ].join(" ")}
              >
                {mode === "free"
                  ? "Free"
                  : mode === "pc98"
                    ? "Color 16"
                    : mode === "pc98_tile"
                      ? "PC-98 Tile"
                    : mode === "pc98_512"
                      ? "PC-98 512-color"
                    : mode === "pc98_512_sat"
                      ? "PC-98 512 Sat"
                    : mode === "pc98_4096"
                      ? "PC-98 4096-color"
                    : mode === "color32"
                      ? "Color 32"
                    : mode === "color64"
                        ? "Color 64"
                      : mode === "neon"
                        ? "Neon"
                      : mode === "anime"
                        ? "Anime"
                      : "Monochrome"}
              </button>
            ),
            )}
          </div>
        </label>

        {(paletteMode === "mono" || paletteMode === "neon") && (
          <label className="block">
            <span className="text-[#12141c]">
              {paletteMode === "neon" ? "Neon tint" : "Mono tint"}
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {Object.entries(MONO_TINTS).map(([key, tint]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onSetMonoTint(key as MonoTintMode);
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    monoTint === key
                      ? "border-[#000000] bg-[#111014]/20"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  {tint.label}
                </button>
              ))}
            </div>
          </label>
        )}

        <div className="flex flex-col gap-3 rounded-lg border border-[#cac0b2] bg-[#ede8e2] px-3 py-3">
          <div className="text-[11px] leading-5 text-[#7a7268]">
            {sourceDimensions
              ? `Source aspect: ${sourceDimensions.width} x ${sourceDimensions.height}`
              : "Source aspect: unavailable for audio-only preview"}
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-[#2c2418]">
            <input
              type="checkbox"
              checked={realtimeTargetSize}
              onChange={(ev) => setRealtimeTargetSize(ev.currentTarget.checked)}
              className="accent-[#111014]"
            />
            Live update
          </label>
          <label className="block">
            <span className="text-[#12141c]">Target width: {localTargetWidth}px</span>
            <input
              type="range"
              min="1"
              max="2560"
              step="1"
              value={localTargetWidth}
              disabled={autoTargetSize}
              onChange={(ev) => {
                const v = Number(ev.currentTarget.value);
                setLocalTargetWidth(v);
                if (realtimeTargetSize) onSetTargetWidth(v);
              }}
              onPointerUp={(ev) => onSetTargetWidth(Number(ev.currentTarget.value))}
              onKeyUp={(ev) => onSetTargetWidth(Number(ev.currentTarget.value))}
              className="mt-2 w-full"
            />
          </label>
          <label className="block">
            <span className="text-[#12141c]">Target height: {localTargetHeight}px</span>
            <input
              type="range"
              min="1"
              max="2560"
              step="1"
              value={localTargetHeight}
              disabled={autoTargetSize}
              onChange={(ev) => {
                const v = Number(ev.currentTarget.value);
                setLocalTargetHeight(v);
                if (realtimeTargetSize) onSetTargetHeight(v);
              }}
              onPointerUp={(ev) => onSetTargetHeight(Number(ev.currentTarget.value))}
              onKeyUp={(ev) => onSetTargetHeight(Number(ev.currentTarget.value))}
              className="mt-2 w-full"
            />
          </label>
          <label className="flex min-h-11 items-center justify-between rounded-lg border border-[#000000]/35 bg-[#111014]/10 px-3 py-2 text-[#12141c]">
            <span>Auto target size</span>
            <input
              type="checkbox"
              checked={autoTargetSize}
              onChange={(ev) => {
                onSetAutoTargetSize(ev.currentTarget.checked);
              }}
              className="h-5 w-5"
            />
          </label>
          <label className="flex min-h-11 items-center justify-between rounded-lg border border-[#000000]/35 bg-[#111014]/10 px-3 py-2 text-[#12141c]">
            <span>Match aspect</span>
            <input
              type="checkbox"
              checked={matchTargetAspect}
              onChange={(ev) => {
                onSetMatchTargetAspect(ev.currentTarget.checked);
              }}
              className="h-5 w-5"
            />
          </label>
          <label className="block">
            <span className="text-[#12141c]">Sampling</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["nearest", "average_fast_4", "average_fast_8"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    onSetSamplingMode(mode);
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    samplingMode === mode
                      ? "border-[#000000] bg-[#111014]/20"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  {mode === "nearest"
                    ? "Nearest"
                    : mode === "average_fast_4"
                      ? "Average Fast 4tap"
                      : "Average Fast 8tap"}
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="rounded-lg border border-[#000000]/30 bg-[#111014]/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            Color Control
          </div>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[#12141c]">Color levels: {colorLevels}</span>
              <input
                type="range"
                min="2"
                max="256"
                step="1"
                value={colorLevels}
                onChange={(ev) => {
                  onSetColorLevels(Number(ev.currentTarget.value));
                }}
                disabled={
                  paletteMode === "pc98" ||
                  paletteMode === "pc98_tile" ||
                  paletteMode === "pc98_512" ||
                  paletteMode === "pc98_512_sat" ||
                  paletteMode === "pc98_4096" ||
                  paletteMode === "color32" ||
                  paletteMode === "color64"
                }
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Bayer dither: ${ditherStrength.toFixed(2)}`}
                  text={helpText.bayerDither}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={ditherStrength}
                onChange={(ev) => {
                  onSetDitherStrength(Number(ev.currentTarget.value));
                }}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Warm bloom: ${beamWarmBloom.toFixed(2)}`}
                  text={helpText.beamWarmBloom}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.01"
                value={beamWarmBloom}
                onChange={(ev) => {
                  onSetBeamWarmBloom(Number(ev.currentTarget.value));
                }}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Smooth: ${smoothStrength.toFixed(2)}`}
                  text={helpText.smooth}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={smoothStrength}
                onChange={(ev) => onSetSmoothStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Brightness: ${outputBrightness.toFixed(2)}`}
                  text={helpText.outputBrightness}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0.4"
                max="2.5"
                step="0.01"
                value={outputBrightness}
                onChange={(ev) => onSetOutputBrightness(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Contrast: ${basicContrast.toFixed(2)}`}
                  text={helpText.basicContrast}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="4"
                step="0.01"
                value={basicContrast}
                onChange={(ev) => onSetBasicContrast(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Saturation: ${basicSaturation.toFixed(2)}`}
                  text={helpText.basicSaturation}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="4"
                step="0.01"
                value={basicSaturation}
                onChange={(ev) => onSetBasicSaturation(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Horizontal sharpness: ${horizontalSharpness.toFixed(2)}`}
                  text={helpText.horizontalSharpness}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={horizontalSharpness}
                onChange={(ev) => onSetHorizontalSharpness(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`RGB convergence: ${rgbConvergenceOffset.toFixed(2)}`}
                  text={helpText.rgbConvergenceOffset}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.01"
                value={rgbConvergenceOffset}
                onChange={(ev) => onSetRgbConvergenceOffset(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
          </div>
        </div>

        {paletteMode === "neon" && (
          <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-3">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
              Neon
            </div>
            <div className="flex flex-col gap-3">
              <label className="block">
                <span className="text-[#12141c]">
                  Neon Boost: {neonBoost.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.01"
                  value={neonBoost}
                  onChange={(ev) => onSetNeonBoost(Number(ev.currentTarget.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="block">
                <span className="text-[#12141c]">
                  Neon Saturation: {neonSaturation.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="2.0"
                  step="0.01"
                  value={neonSaturation}
                  onChange={(ev) => onSetNeonSaturation(Number(ev.currentTarget.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="block">
                <span className="text-[#12141c]">
                  Neon Detail: {neonDetail.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.01"
                  value={neonDetail}
                  onChange={(ev) => onSetNeonDetail(Number(ev.currentTarget.value))}
                  className="mt-2 w-full"
                />
              </label>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            CRT / LCD
          </div>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Glow: ${glowStrength.toFixed(2)}`}
                  text={helpText.glow}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={glowStrength}
                onChange={(ev) => onSetGlowStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Screen face glow: ${screenFaceGlow.toFixed(2)}`}
                  text={helpText.screenFaceGlow}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={screenFaceGlow}
                onChange={(ev) => onSetScreenFaceGlow(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Curvature: ${curvature.toFixed(2)}`}
                  text={helpText.curvature}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={curvature}
                onChange={(ev) => onSetCurvature(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Scanline: ${scanlineStrength.toFixed(2)}`}
                  text={helpText.scanline}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.4"
                step="0.01"
                value={scanlineStrength}
                onChange={(ev) => onSetScanlineStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Scanline2: ${scanline2Strength.toFixed(2)}`}
                  text={helpText.scanline2}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={scanline2Strength}
                onChange={(ev) => onSetScanline2Strength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Scanline bright fade: ${scanlineBrightnessFade.toFixed(2)}`}
                  text={helpText.scanlineBrightFade}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={scanlineBrightnessFade}
                onChange={(ev) => onSetScanlineBrightnessFade(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Vignette: ${vignetteStrength.toFixed(2)}`}
                  text={helpText.vignette}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.01"
                value={vignetteStrength}
                onChange={(ev) => onSetVignetteStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Phosphor: ${phosphorStrength.toFixed(2)}`}
                  text={helpText.phosphor}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={phosphorStrength}
                onChange={(ev) => onSetPhosphorStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
              {isPhosphorDotModeActive ? (
                <span className="mt-2 block text-[11px] text-[#7a7268]">
                  Phosphor Dot mode ではこの項目は通常 CRT の triad 用です。
                </span>
              ) : null}
            </label>
            <label className="block min-h-10 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-2 py-1.5">
              <span className="text-[11px] leading-tight text-[#12141c]">
                CRT GlowColor bar: {phosphorDotGlowColorStrength <= 0 ? "off" : phosphorDotGlowColorStrength.toFixed(2)}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={phosphorDotGlowColorStrength}
                onChange={(ev) => {
                  onSetPhosphorDotGlowColorStrength(Number(ev.currentTarget.value));
                }}
                className="mt-1 w-full"
              />
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-[#000000]/30 bg-[#111014]/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            Anime Toon / Edge
          </div>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Toon steps: ${toonSteps.toFixed(0)}`}
                  text={helpText.toonSteps}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={toonSteps}
                onChange={(ev) => onSetToonSteps(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Edge boost: ${edgeBoost.toFixed(2)}`}
                  text={helpText.edgeBoost}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.01"
                value={edgeBoost}
                onChange={(ev) => onSetEdgeBoost(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            {toonSteps >= 1 && (
              <>
                <label className="block">
                  <span className="text-[#12141c]">
                    Edge threshold low: {animeEdgeLow.toFixed(2)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={animeEdgeLow}
                    onChange={(ev) => onSetAnimeEdgeLow(Number(ev.currentTarget.value))}
                    className="mt-2 w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-[#12141c]">
                    Edge threshold high: {animeEdgeHigh.toFixed(2)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={animeEdgeHigh}
                    onChange={(ev) => onSetAnimeEdgeHigh(Number(ev.currentTarget.value))}
                    className="mt-2 w-full"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            Dot phosphor / Spot Mask
          </div>

          <div className="mt-3 rounded-lg border border-[#bcb4a6]/70 bg-[#f5f1ea]/60 px-3 py-2 text-[11px] leading-5 text-[#5f5649]">
            Dot phosphor は Circle / Heart の発光セルを使う phosphor 系モードです。
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSetPhosphorDotShape("circle");
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    phosphorDotShape === "circle"
                      ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  Dot shape: Circle
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSetPhosphorDotShape("heart");
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    phosphorDotShape === "heart"
                      ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  Dot shape: Heart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSetPhosphorDotBrightCore(!phosphorDotBrightCore);
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    phosphorDotBrightCore
                      ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  Bright core
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSetPhosphorDotFlatDisc(!phosphorDotFlatDisc);
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    phosphorDotFlatDisc
                      ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  Flat disc
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSetPhosphorDotNeighborBlend(!phosphorDotNeighborBlend);
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    phosphorDotNeighborBlend
                      ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  Neighbor blend
                </button>
            <label className="block min-h-10 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-2 py-1.5">
              <span
                className={[
                  "text-[11px] leading-tight",
                  phosphorDotInternalScale >= 3
                    ? "font-semibold text-red-600"
                    : "text-[#12141c]",
                ].join(" ")}
              >
                Internal res: {phosphorDotInternalScale}x
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[9px] text-[#7a7268]">1</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  list="phosphor-dot-internal-res-ticks"
                  value={phosphorDotInternalScale}
                  onChange={(ev) => {
                    onSetPhosphorDotInternalScale(Number(ev.currentTarget.value) as 1 | 2 | 3);
                  }}
                  className={[
                    "w-full",
                    phosphorDotInternalScale >= 3 ? "accent-red-600" : "accent-emerald-600",
                  ].join(" ")}
                />
                <span className="text-[9px] text-[#7a7268]">3</span>
              </div>
              <datalist id="phosphor-dot-internal-res-ticks">
                <option value="1" label="1" />
                <option value="2" label="2" />
                <option value="3" label="3" />
              </datalist>
            </label>
          </div>

          <label className="mt-3 block min-h-10 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-2 py-1.5">
            <span className="text-[11px] leading-tight text-[#12141c]">
              Grain: {phosphorDotGrainStrength <= 0 ? "off" : phosphorDotGrainStrength.toFixed(2)}
            </span>
            <input
              type="range"
              min="0"
              max={GRAIN_SLIDER_MAX}
              step="0.5"
              value={grainValueToSlider(phosphorDotGrainStrength)}
              onChange={(ev) => {
                onSetPhosphorDotGrainStrength(grainSliderToValue(Number(ev.currentTarget.value)));
              }}
              className="mt-1 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Spot mask: ${spotMaskStrength.toFixed(3)}`}
                text={helpText.spotMask}
                helpSuffix={helpText.helpSuffix}
              />
            </span>
            <input
              type="range"
              min="0"
              max="1.0"
              step="0.001"
              value={spotMaskStrength}
              onChange={(ev) => {
                onSetSpotMaskStrength(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Cell fill: ${phosphorDotCellFill.toFixed(3)}`}
                text={helpText.cellFill}
                helpSuffix={helpText.helpSuffix}
              />
            </span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.001"
              value={phosphorDotCellFill}
              onChange={(ev) => {
                onSetPhosphorDotCellFill(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Bulb radius: ${bulbRadius.toFixed(3)}`}
                text={helpText.bulbRadius}
                helpSuffix={helpText.helpSuffix}
              />
            </span>
            <input
              type="range"
              min="0.001"
              max="0.5"
              step="0.001"
              value={bulbRadius}
              onChange={(ev) => {
                onSetBulbRadius(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Black floor: ${blackFloor.toFixed(3)}`}
                text={helpText.blackFloor}
                helpSuffix={helpText.helpSuffix}
              />
            </span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.001"
              value={blackFloor}
              onChange={(ev) => {
                onSetBlackFloor(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Light level: ${phosphorDotLightBalance.toFixed(2)}`}
                text={helpText.lightLevel}
                helpSuffix={helpText.helpSuffix}
              />
            </span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={phosphorDotLightBalance}
              onChange={(ev) => {
                onSetPhosphorDotLightBalance(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>
        </div>

        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            Beam Cross
          </div>

          <div className="rounded-lg border border-[#bcb4a6]/70 bg-[#f5f1ea]/60 px-3 py-2 text-[11px] leading-5 text-[#5f5649]">
            打たれた pixel を光源として扱い、横 beam と縦 flare を合成する別モードです。
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                if (onRequestEnableBeamCross) {
                  void onRequestEnableBeamCross();
                  return;
                }
                onSetPhosphorDotShape("beam");
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                isBeamCrossModeActive
                  ? "border-sky-600/60 bg-sky-500/15 text-sky-950 font-semibold"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
              ].join(" ")}
            >
              Beam Cross: On
            </button>
            <button
              type="button"
              onClick={() => {
                if (phosphorDotShape === "beam") {
                  onSetPhosphorDotShape("circle");
                }
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                !isBeamCrossModeActive
                  ? "border-sky-600/60 bg-sky-500/15 text-sky-950 font-semibold"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
              ].join(" ")}
            >
              Beam Cross: Off
            </button>
          </div>

          {isBeamCrossModeActive && (
            <div className="mt-3 rounded-lg border border-[#bcb4a6]/70 bg-[#f5f1ea]/60 px-3 py-3">
              <label className="block min-h-10 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-2 py-1.5">
                <span
                  className={[
                    "text-[11px] leading-tight",
                    phosphorDotInternalScale >= 3
                      ? "font-semibold text-red-600"
                      : "text-[#12141c]",
                  ].join(" ")}
                >
                  Beam internal res: {phosphorDotInternalScale}x
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-[#7a7268]">
                  Beam Cross also uses this internal resolution. Higher values can make the beam pattern denser and cleaner.
                </span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-[9px] text-[#7a7268]">1</span>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    list="phosphor-dot-internal-res-ticks"
                    value={phosphorDotInternalScale}
                    onChange={(ev) => {
                      onSetPhosphorDotInternalScale(Number(ev.currentTarget.value) as 1 | 2 | 3);
                    }}
                    className={[
                      "w-full",
                      phosphorDotInternalScale >= 3 ? "accent-red-600" : "accent-sky-600",
                    ].join(" ")}
                  />
                  <span className="text-[9px] text-[#7a7268]">3</span>
                </div>
              </label>

              <label className="block">
                <span className="text-[#12141c]">
                  <InfoTip
                    label={`Beam cutoff: ${beamDarkCutoff.toFixed(3)}`}
                    text={helpText.beamDarkCutoff}
                    helpSuffix={helpText.helpSuffix}
                  />
                </span>
                <input
                  type="range"
                  min="0"
                  max="0.15"
                  step="0.001"
                  value={beamDarkCutoff}
                  onChange={(ev) => {
                    onSetBeamDarkCutoff(Number(ev.currentTarget.value));
                  }}
                  className="mt-2 w-full"
                />
              </label>

              <label className="mt-3 block">
                <span className="text-[#12141c]">
                  <InfoTip
                    label={`Horizontal spread: ${beamHorizontalSpread.toFixed(2)}`}
                    text={helpText.beamHorizontalSpread}
                    helpSuffix={helpText.helpSuffix}
                  />
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.01"
                  value={beamHorizontalSpread}
                  onChange={(ev) => {
                    onSetBeamHorizontalSpread(Number(ev.currentTarget.value));
                  }}
                  className="mt-2 w-full"
                />
              </label>

              <label className="mt-3 block">
                <span className="text-[#12141c]">
                  <InfoTip
                    label={`Stripe strength: ${beamStripeStrength.toFixed(2)}`}
                    text={helpText.beamStripeStrength}
                    helpSuffix={helpText.helpSuffix}
                  />
                </span>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={beamStripeStrength}
                  onChange={(ev) => {
                    onSetBeamStripeStrength(Number(ev.currentTarget.value));
                  }}
                  className="mt-2 w-full"
                />
              </label>

              <label className="mt-3 block">
                <span className="text-[#12141c]">
                  <InfoTip
                    label={`White bloom: ${beamWhiteBloom.toFixed(2)}`}
                    text={helpText.beamWhiteBloom}
                    helpSuffix={helpText.helpSuffix}
                  />
                </span>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={beamWhiteBloom}
                  onChange={(ev) => {
                    onSetBeamWhiteBloom(Number(ev.currentTarget.value));
                  }}
                  className="mt-2 w-full"
                />
              </label>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
