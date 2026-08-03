export type PaletteMode =
  | "free"
  | "pc98"
  | "pc98_tile"
  | "pc98_512"
  | "pc98_512_sat"
  | "pc98_4096"
  | "color32"
  | "color64"
  | "mono"
  | "neon"
  | "anime";
export type MonoTintMode = "gray" | "green" | "amber" | "ice";
export type PhosphorDotShape = "circle" | "heart" | "beam" | "square";
export type LegacyPhosphorDotShape = PhosphorDotShape | "crt_stripe" | "rgb_block";
export type GrainVisibilityMode = "all" | "bright_only";
export type TargetSamplingMode =
  | "nearest"
  | "average_fast_4"
  | "average_fast_8"
  | "average";
export type VBlankSimulationMode = "off" | "mild" | "strong";

export const DEFAULT_BEAM_CROSS_SETTINGS = {
  beamDarkCutoff: 0.04,
  beamHorizontalSpread: 1,
  beamStripeStrength: 1,
  beamWhiteBloom: 1,
  beamWarmBloom: 0,
} as const;

export const normalizePhosphorDotShape = (
  shape: LegacyPhosphorDotShape | null | undefined,
): PhosphorDotShape => {
  if (shape === "heart") {
    return "heart";
  }
  if (shape === "beam") {
    return "beam";
  }
  if (shape === "square") {
    return "square";
  }
  return "circle";
};

export const normalizePhosphorDotInternalScale = (value: number | undefined) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 1;
  }

  const scale = value;
  return Math.max(1, Math.min(4, Math.round(scale * 10) / 10));
};

export const normalizePhosphorDotSizeResponse = (value: number | undefined) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 1;
  }

  return Math.max(0, Math.min(2, Math.round(value * 10) / 10));
};

export const MONO_TINTS: Record<
  MonoTintMode,
  { label: string; rgb: [number, number, number] }
> = {
  gray: { label: "Gray", rgb: [1, 1, 1] },
  green: { label: "Green", rgb: [0.72, 1, 0.58] },
  amber: { label: "Amber", rgb: [1, 0.82, 0.45] },
  ice: { label: "Ice", rgb: [0.7, 0.9, 1] },
};

export type RetroPresetDefinition = {
  label: string;
  autoTargetSize?: boolean;
  samplingMode?: TargetSamplingMode;
  vblankSimulationMode?: VBlankSimulationMode;
  renderModeOverride?: RetroPresetRenderMode;
  width: number;
  height: number;
  colors: number;
  dither: number;
  palette: PaletteMode;
  curvature: number;
  scanline: number;
  scanline2: number;
  vignette: number;
  glow: number;
  lcdCrosstalkStrength?: number;
  horizontalSharpness?: number;
  rgbConvergenceOffset?: number;
  smoothStrength?: number;
  toonSteps?: number;
  edgeBoost?: number;
  animeEdgeLow?: number;
  animeEdgeHigh?: number;
  phosphor: number;
  spotMask: number;
  bulbRadius: number;
  blackFloor: number;
  outputBrightness?: number;
  basicContrast?: number;
  basicSaturation?: number;
  reflectiveLcdBase?: number;
  lightDependentTint?: number;
  grainVisibilityMode?: GrainVisibilityMode;
  phosphorDotLightBalance?: number;
  phosphorDotShape?: PhosphorDotShape;
  phosphorDotInternalScale?: number;
  phosphorDotSizeResponse?: number;
  phosphorDotBrightCore?: boolean;
  phosphorDotCellFill?: number;
  phosphorDotFlatDisc?: boolean;
  phosphorDotNeighborBlend?: boolean;
  phosphorDotGrainStrength?: number;
  preFilterDownscaleEnabled?: boolean;
  coloredGlowEnabled?: boolean;
  postCurvatureEnabled?: boolean;
  compositeEnabled?: boolean;
  compositeAmount?: number;
  compositeChromaBlur?: number;
  compositeChromaDelay?: number;
  compositeNoise?: number;
  beamDarkCutoff?: number;
  beamHorizontalSpread?: number;
  beamStripeStrength?: number;
  beamWhiteBloom?: number;
  beamWarmBloom?: number;
  screenFaceGlow?: number;
  scanlineBrightnessFade?: number;
  monoTint: MonoTintMode;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  focusStrength?: number;
  focusWidth?: number;
  focusHeight?: number;
  featured?: boolean;
};

export type RetroPresetRenderMode = "lite" | "full";

export type RetroPresetVariantPreparation = {
  paletteMode: PaletteMode;
  phosphorDotShape: PhosphorDotShape;
  phosphorStrength: number;
  spotMaskStrength: number;
  compositeEnabled: boolean;
  compositeAmount: number;
};

export const RETRO_PRESETS = {
  none: {
    label: "None",
    autoTargetSize: true,
    samplingMode: "nearest",
    width: 1920,
    height: 1080,
    colors: 256,
    dither: 0,
    palette: "free" as const,
    curvature: 0,
    scanline: 0,
    scanline2: 0,
    vignette: 0,
    glow: 0,
    horizontalSharpness: 1,
    rgbConvergenceOffset: 0,
    phosphor: 0,
    spotMask: 0,
    bulbRadius: 0,
    blackFloor: 0,
    monoTint: "gray" as const,
    neonBoost: 1,
    neonSaturation: 1,
    neonDetail: 1,
  },
  chunky: {
    label: "Chunky",
    featured: true,
    width: 256,
    height: 192,
    colors: 8,
    dither: 0.2,
    palette: "free",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.015,
    vignette: 0.04,
    glow: 0.03,
    phosphor: 0.03,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 0.8,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  arcade: {
    label: "Arcade",
    featured: true,
    width: 320,
    height: 224,
    colors: 12,
    dither: 0.28,
    palette: "free",
    curvature: 0.04,
    scanline: 0.08,
    scanline2: 0.0,
    vignette: 0.08,
    glow: 0.06,
    phosphor: 0.05,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 0.9,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  gbLite: {
    label: "GB Lite",
    featured: true,
    width: 160,
    height: 144,
    colors: 4,
    dither: 0.34,
    palette: "mono",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    vignette: 0.015,
    glow: 0.0,
    lcdCrosstalkStrength: 0.0,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "green",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  gb: {
    label: "GB",
    featured: true,
    renderModeOverride: "full",
    autoTargetSize: false,
    samplingMode: "nearest",
    width: 160,
    height: 160,
    colors: 4,
    dither: 0.56,
    palette: "mono",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    scanlineBrightnessFade: 0.6,
    vignette: 0.05,
    glow: 0.37,
    lcdCrosstalkStrength: 1.0,
    horizontalSharpness: 1.0,
    rgbConvergenceOffset: 0,
    smoothStrength: 0,
    phosphor: 0.0,
    spotMask: 0.109,
    bulbRadius: 0.5,
    blackFloor: 0.075,
    outputBrightness: 1.41,
    basicContrast: 0.89,
    basicSaturation: 1.18,
    reflectiveLcdBase: 0.24,
    lightDependentTint: 0.34,
    grainVisibilityMode: "bright_only",
    phosphorDotShape: "square",
    phosphorDotInternalScale: 2.8,
    phosphorDotSizeResponse: 0,
    phosphorDotCellFill: 0.5,
    phosphorDotLightBalance: 1.28,
    phosphorDotBrightCore: false,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0.05,
    beamDarkCutoff: 0.04,
    beamHorizontalSpread: 1.0,
    beamStripeStrength: 1.0,
    beamWhiteBloom: 1.0,
    beamWarmBloom: 0.0,
    screenFaceGlow: 0.2,
    monoTint: "green",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  gbPlus: {
    label: "GB+",
    featured: true,
    renderModeOverride: "full",
    autoTargetSize: false,
    samplingMode: "nearest",
    width: 160,
    height: 160,
    colors: 4,
    dither: 0.56,
    palette: "mono",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    scanlineBrightnessFade: 0.6,
    vignette: 0.05,
    glow: 0.37,
    lcdCrosstalkStrength: 1.0,
    horizontalSharpness: 1.0,
    rgbConvergenceOffset: 0,
    smoothStrength: 0,
    phosphor: 0.0,
    spotMask: 0.27,
    bulbRadius: 0.5,
    blackFloor: 0.075,
    outputBrightness: 1.41,
    basicContrast: 0.89,
    basicSaturation: 1.18,
    reflectiveLcdBase: 0.24,
    lightDependentTint: 0.34,
    grainVisibilityMode: "bright_only",
    phosphorDotShape: "square",
    phosphorDotInternalScale: 1,
    phosphorDotSizeResponse: 0,
    phosphorDotCellFill: 0.5,
    phosphorDotLightBalance: 1.28,
    phosphorDotBrightCore: true,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0.05,
    coloredGlowEnabled: false,
    postCurvatureEnabled: false,
    compositeEnabled: false,
    compositeAmount: 0,
    compositeChromaBlur: 0,
    compositeChromaDelay: 0,
    compositeNoise: 0,
    beamDarkCutoff: 0.04,
    beamHorizontalSpread: 1.0,
    beamStripeStrength: 1.0,
    beamWhiteBloom: 1.0,
    beamWarmBloom: 0.0,
    screenFaceGlow: 0.2,
    monoTint: "green",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  gba: {
    label: "GBA",
    featured: true,
    autoTargetSize: false,
    samplingMode: "nearest",
    width: 240,
    height: 160,
    colors: 16,
    dither: 0.08,
    palette: "free",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    scanlineBrightnessFade: 0.6,
    vignette: 0.015,
    glow: 0.82,
    coloredGlowEnabled: true,
    lcdCrosstalkStrength: 0.9,
    horizontalSharpness: 1.0,
    rgbConvergenceOffset: 0,
    smoothStrength: 0,
    phosphor: 0.0,
    spotMask: 0.15,
    bulbRadius: 0.56,
    blackFloor: 0.06,
    outputBrightness: 1.1,
    basicContrast: 0.68,
    basicSaturation: 1.18,
    reflectiveLcdBase: 0.62,
    lightDependentTint: 0.82,
    grainVisibilityMode: "all",
    phosphorDotLightBalance: 1.28,
    phosphorDotShape: "circle",
    phosphorDotInternalScale: 1,
    phosphorDotSizeResponse: 0,
    phosphorDotBrightCore: true,
    phosphorDotCellFill: 0.5,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0.05,
    postCurvatureEnabled: false,
    beamStripeStrength: 0.91,
    beamWhiteBloom: 1.01,
    screenFaceGlow: 0.2,
    monoTint: "green",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  gbm: {
    label: "GBM",
    featured: true,
    autoTargetSize: false,
    samplingMode: "nearest",
    width: 240,
    height: 160,
    colors: 16,
    dither: 0.08,
    palette: "free",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    scanlineBrightnessFade: 0.6,
    vignette: 0.015,
    glow: 0.48,
    lcdCrosstalkStrength: 1.0,
    horizontalSharpness: 1.0,
    rgbConvergenceOffset: 0,
    smoothStrength: 0,
    phosphor: 0.0,
    spotMask: 0.33,
    bulbRadius: 0.596,
    blackFloor: 0.075,
    outputBrightness: 1.18,
    basicContrast: 1.0,
    basicSaturation: 1.0,
    phosphorDotLightBalance: 1.28,
    phosphorDotShape: "circle",
    phosphorDotInternalScale: 1,
    phosphorDotSizeResponse: 0.3,
    phosphorDotBrightCore: true,
    phosphorDotCellFill: 0.5,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0.05,
    coloredGlowEnabled: false,
    postCurvatureEnabled: false,
    beamStripeStrength: 0.91,
    beamWhiteBloom: 1.01,
    screenFaceGlow: 0.2,
    monoTint: "green",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  gbaLite: {
    label: "GBA Lite",
    featured: true,
    width: 240,
    height: 160,
    colors: 16,
    dither: 0.06,
    palette: "free",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    vignette: 0.02,
    glow: 0.0,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  pc98_512: {
    label: "PC-98 512-color",
    width: 640,
    height: 400,
    colors: 8,
    dither: 0.12,
    palette: "pc98_512",
    curvature: 0.03,
    scanline: 0.00,
    scanline2: 0.02,
    vignette: 0.05,
    glow: 0.06,
    phosphor: 0.03,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  pc98_4096: {
    label: "PC-98 4096-color",
    width: 640,
    height: 400,
    colors: 16,
    dither: 0.08,
    palette: "pc98_4096",
    curvature: 0.03,
    scanline: 0.0,
    scanline2: 0.02,
    vignette: 0.05,
    glow: 0.05,
    phosphor: 0.03,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  pc98: {
    label: "Color 16",
    width: 640,
    height: 400,
    colors: 16,
    dither: 0.35,
    palette: "pc98",
    curvature: 0.02,
    scanline: 0.05,
    scanline2: 0.0,
    vignette: 0.06,
    glow: 0.05,
    phosphor: 0.04,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  pc98_tile: {
    label: "PC-98 Tile",
    width: 1280,
    height: 800,
    colors: 32,
    dither: 0.0,
    palette: "pc98_tile",
    curvature: 0.05,
    scanline: 0.0,
    scanline2: 0.01,
    vignette: 0.02,
    glow: 0.0,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  color32: {
    label: "Color 32",
    width: 320,
    height: 200,
    colors: 32,
    dither: 0.24,
    palette: "color32",
    curvature: 0.03,
    scanline: 0.06,
    scanline2: 0.0,
    vignette: 0.05,
    glow: 0,
    phosphor: 0.03,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  color64: {
    label: "Color 64",
    width: 320,
    height: 200,
    colors: 64,
    dither: 0.2,
    palette: "color64",
    curvature: 0.03,
    scanline: 0.04,
    scanline2: 0.0,
    vignette: 0.04,
    glow: 0,
    phosphor: 0.03,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  monochrome: {
    label: "Mono",
    width: 640,
    height: 400,
    colors: 16,
    dither: 0.18,
    palette: "mono",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    vignette: 0.015,
    glow: 0.0,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  greenTerminal: {
    label: "Green Terminal",
    width: 640,
    height: 400,
    colors: 16,
    dither: 0.14,
    palette: "mono",
    curvature: 0.07,
    scanline: 0.16,
    scanline2: 0.0,
    vignette: 0.1,
    glow: 0.09,
    phosphor: 0.06,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "green",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  amberCrt: {
    label: "Amber CRT",
    featured: true,
    width: 960,
    height: 600,
    colors: 32,
    dither: 0.16,
    palette: "mono",
    curvature: 0.06,
    scanline: 0.0,
    scanline2: 0.02,
    vignette: 0.11,
    glow: 0.10,
    phosphor: 0.05,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "amber",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  neonLine: {
    label: "Neon Line",
    width: 960,
    height: 540,
    colors: 24,
    dither: 0.0,
    palette: "neon",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    vignette: 0.04,
    glow: 0.18,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "ice",
    neonBoost: 1.15,
    neonSaturation: 1.2,
    neonDetail: 1.05,
  },
  lcdIce: {
    label: "LCD Ice",
    featured: true,
    width: 480,
    height: 300,
    colors: 16,
    dither: 0.06,
    palette: "mono",
    curvature: 0.0,
    scanline: 0.00,
    scanline2: 0.00,
    vignette: 0.015,
    glow: 0.00,
    phosphor: 0.00,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "ice",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  phosphorDotLite: {
    label: "Phosphor Dot Bright",
    featured: true,
    autoTargetSize: true,
    samplingMode: "nearest",
    width: 640,
    height: 360,
    colors: 256,
    dither: 0,
    smoothStrength: 0,
    horizontalSharpness: 1,
    rgbConvergenceOffset: 0,
    basicContrast: 1.2,
    basicSaturation: 1,
    palette: "free",
    curvature: 0.03,
    scanline: 0.0,
    scanline2: 0.0,
    scanlineBrightnessFade: 0.6,
    vignette: 0.0,
    glow: 0.15,
    phosphor: 0.0,
    spotMask: 0.651,
    bulbRadius: 0.116,
    blackFloor: 0,
    outputBrightness: 0.83,
    phosphorDotLightBalance: 0.65,
    phosphorDotShape: "heart",
    phosphorDotInternalScale: 1.4,
    phosphorDotBrightCore: true,
    phosphorDotCellFill: 0.132,
    phosphorDotFlatDisc: false,
    phosphorDotNeighborBlend: false,
    phosphorDotGrainStrength: 0.11892071150027211,
    preFilterDownscaleEnabled: true,
    coloredGlowEnabled: true,
    postCurvatureEnabled: false,
    compositeEnabled: true,
    compositeAmount: 0.85,
    compositeChromaBlur: 0.73,
    compositeChromaDelay: 0.24,
    compositeNoise: 0.49,
    beamDarkCutoff: 0.04,
    beamHorizontalSpread: 1,
    beamStripeStrength: 1,
    beamWhiteBloom: 1,
    beamWarmBloom: 0,
    screenFaceGlow: 0.07,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    focusStrength: 0,
    focusWidth: 0.24,
    focusHeight: 0.16,
  },
  phosphorDot: {
    label: "Phosphor Dot",
    featured: true,
    autoTargetSize: true,
    width: 320,
    height: 180,
    colors: 32,
    dither: 0.55,
    smoothStrength: 0.55,
    horizontalSharpness: 1.8,
    basicContrast: 1.12,
    palette: "free",
    curvature: 0.065,
    scanline: 0.0,
    scanline2: 0.02,
    vignette: 0.3,
    glow: 0.78,
    coloredGlowEnabled: true,
    phosphor: 0.0,
    spotMask: 0.3,
    bulbRadius: 0.5,
    blackFloor: 0.001,
    screenFaceGlow: 0.22,
    beamWarmBloom: 0.22,
    phosphorDotLightBalance: 0.22,
    phosphorDotInternalScale: 2.4,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.12,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0.12,
    preFilterDownscaleEnabled: true,
    compositeEnabled: false,
    compositeAmount: 0,
    compositeChromaBlur: 0,
    compositeChromaDelay: 0,
    compositeNoise: 0,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    outputBrightness: 1.38,
  },
  phosphorDotSmooth: {
    label: "Phosphor Smooth",
    featured: true,
    autoTargetSize: true,
    width: 320,
    height: 180,
    colors: 32,
    dither: 0.55,
    samplingMode: "average_fast_4",
    smoothStrength: 0.88,
    horizontalSharpness: 0.12,
    basicContrast: 1.12,
    palette: "free",
    curvature: 0.065,
    scanline: 0.0,
    scanline2: 0.02,
    vignette: 0.3,
    glow: 0.78,
    coloredGlowEnabled: true,
    phosphor: 0.0,
    spotMask: 0.3,
    bulbRadius: 0.5,
    blackFloor: 0.001,
    screenFaceGlow: 0.22,
    beamWarmBloom: 0.22,
    phosphorDotLightBalance: 0.22,
    phosphorDotInternalScale: 2,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.12,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0.12,
    preFilterDownscaleEnabled: true,
    compositeEnabled: true,
    compositeAmount: 0.85,
    compositeChromaBlur: 0.73,
    compositeChromaDelay: 0.24,
    compositeNoise: 0.49,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    outputBrightness: 1.38,
  },
  crtBeam: {
    label: "CRT Beam",
    autoTargetSize: true,
    width: 320,
    height: 180,
    colors: 32,
    dither: 0.55,
    smoothStrength: 0.0,
    palette: "free",
    curvature: 0.03,
    scanline: 0.0,
    scanline2: 0.01,
    vignette: 0.3,
    glow: 0.08,
    phosphor: 0.0,
    spotMask: 0.3,
    bulbRadius: 0.5,
    blackFloor: 0.001,
    screenFaceGlow: 0.33,
    phosphorDotShape: "beam",
    phosphorDotInternalScale: 2,
    preFilterDownscaleEnabled: true,
    beamDarkCutoff: 0.04,
    beamHorizontalSpread: 1.27,
    beamStripeStrength: 0.95,
    beamWhiteBloom: 1.14,
    beamWarmBloom: 0.28,
    basicContrast: 1.59,
    basicSaturation: 1.83,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    outputBrightness: 1.0,
  },
  crtBeamNtsc: {
    label: "CRT Beam NTSC",
    autoTargetSize: true,
    samplingMode: "nearest",
    width: 1480,
    height: 1080,
    colors: 32,
    dither: 0.35,
    smoothStrength: 0.0,
    palette: "free",
    curvature: 0.03,
    scanline: 0.0,
    scanline2: 0.01,
    scanlineBrightnessFade: 0.67,
    vignette: 0.3,
    glow: 0.42,
    horizontalSharpness: 1,
    rgbConvergenceOffset: 0,
    toonSteps: 0,
    edgeBoost: 0,
    animeEdgeLow: 0.08,
    animeEdgeHigh: 0.55,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.5,
    blackFloor: 0.001,
    outputBrightness: 1.35,
    basicContrast: 1.03,
    basicSaturation: 1.46,
    phosphorDotLightBalance: 1,
    phosphorDotShape: "beam",
    phosphorDotInternalScale: 2,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0,
    phosphorDotFlatDisc: false,
    phosphorDotNeighborBlend: false,
    phosphorDotGrainStrength: 0,
    preFilterDownscaleEnabled: true,
    coloredGlowEnabled: true,
    postCurvatureEnabled: false,
    compositeEnabled: true,
    compositeAmount: 1,
    compositeChromaBlur: 0.61,
    compositeChromaDelay: 0.11,
    compositeNoise: 0.88,
    beamDarkCutoff: 0,
    beamHorizontalSpread: 0.5,
    beamStripeStrength: 0.7,
    beamWhiteBloom: 1.06,
    beamWarmBloom: 0.4,
    screenFaceGlow: 0.17,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    focusStrength: 0,
    focusWidth: 0.24,
    focusHeight: 0.16,
  },
  crtNtsc: {
    label: "CRT NTSC",
    featured: true,
    autoTargetSize: false,
    samplingMode: "nearest",
    width: 640,
    height: 480,
    colors: 32,
    dither: 0.8,
    smoothStrength: 1,
    horizontalSharpness: 2,
    rgbConvergenceOffset: 1.47,
    basicContrast: 1.27,
    basicSaturation: 1,
    palette: "free",
    curvature: 0.02,
    scanline: 0.0,
    scanline2: 0.03,
    scanlineBrightnessFade: 0.92,
    vignette: 0.28,
    glow: 0.02,
    phosphor: 0.48,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    outputBrightness: 1,
    phosphorDotLightBalance: 1,
    phosphorDotShape: "circle",
    phosphorDotInternalScale: 1,
    phosphorDotSizeResponse: 1,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0,
    phosphorDotFlatDisc: false,
    phosphorDotNeighborBlend: false,
    phosphorDotGrainStrength: 0,
    coloredGlowEnabled: false,
    postCurvatureEnabled: false,
    compositeEnabled: true,
    compositeAmount: 0.68,
    compositeChromaBlur: 0.82,
    compositeChromaDelay: 0.76,
    compositeNoise: 0.96,
    beamDarkCutoff: 0.04,
    beamHorizontalSpread: 1,
    beamStripeStrength: 1,
    beamWhiteBloom: 1,
    beamWarmBloom: 0.32,
    screenFaceGlow: 0.12,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    focusStrength: 0,
    focusWidth: 0.24,
    focusHeight: 0.16,
  },
  crtOnly: {
    label: "CRT Only",
    width: 1280,
    height: 800,
    colors: 256,
    dither: 0.12,
    palette: "free",
    curvature: 0.03,
    scanline: 0.00,
    scanline2: 0.02,
    vignette: 0.05,
    glow: 0.06,
    phosphor: 0.03,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  crtEdge: {
    label: "CRT Edge",
    featured: true,
    width: 1280,
    height: 800,
    autoTargetSize: true,
    colors: 32,
    dither: 0.8,
    smoothStrength: 0.8,
    basicContrast: 1.27,
    palette: "free",
    curvature: 0.03,
    scanline: 0.00,
    scanline2: 0.03,
    scanlineBrightnessFade: 0.92,
    screenFaceGlow: 0.24,
    beamWarmBloom: 0.32,
    vignette: 0.48,
    glow: 0.04,
    edgeBoost: 0.0,
    phosphor: 0.48,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  animeCel: {
    label: "Anime Cel",
    width: 640,
    height: 360,
    colors: 16,
    dither: 0.0,
    palette: "anime",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    vignette: 0.0,
    glow: 0.0,
    smoothStrength: 0.15,
    toonSteps: 1,
    edgeBoost: 0.3,
    animeEdgeLow: 0.22,
    animeEdgeHigh: 0.66,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.0,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  tetorica: {
    label: "Tetorica",
    featured: true,
    autoTargetSize: true,
    width: 1280,
    height: 800,
    colors: 256,
    dither: 0.12,
    palette: "free",
    curvature: 0.03,
    scanline: 0.00,
    scanline2: 0.12,
    vignette: 0.48,
    glow: 0.28,
    toonSteps: 5, // 3 or 7 are the only two values that look good; 
    edgeBoost: 0.3,
    animeEdgeLow: 0.08,
    animeEdgeHigh: 0.55,
    phosphor: 0.48,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    scanlineBrightnessFade: 0.92,
  },
  tetoricaDot: {
    label: "Tetorica Dot",
    featured: true,
    autoTargetSize: true,
    samplingMode: "nearest",
    vblankSimulationMode: "off",
    width: 640,
    height: 360,
    colors: 256,
    dither: 0.12,
    palette: "free",
    curvature: 0.03,
    scanline: 0.0,
    scanline2: 0.12,
    scanlineBrightnessFade: 0.92,
    vignette: 0.48,
    glow: 0.28,
    lcdCrosstalkStrength: 0,
    horizontalSharpness: 1,
    rgbConvergenceOffset: 0,
    smoothStrength: 0,
    toonSteps: 5,
    edgeBoost: 0,
    animeEdgeLow: 0.08,
    animeEdgeHigh: 0.55,
    phosphor: 0.48,
    spotMask: 0.547,
    bulbRadius: 0.722,
    blackFloor: 0.446,
    outputBrightness: 1,
    basicContrast: 1,
    basicSaturation: 1,
    reflectiveLcdBase: 0,
    lightDependentTint: 0,
    grainVisibilityMode: "all",
    phosphorDotLightBalance: 1.59,
    phosphorDotShape: "circle",
    phosphorDotInternalScale: 2.5,
    phosphorDotSizeResponse: 1.8,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.1,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    phosphorDotGrainStrength: 0,
    preFilterDownscaleEnabled: true,
    coloredGlowEnabled: false,
    postCurvatureEnabled: false,
    compositeEnabled: false,
    compositeAmount: 0,
    compositeChromaBlur: 0,
    compositeChromaDelay: 0,
    compositeNoise: 0,
    beamDarkCutoff: 0.04,
    beamHorizontalSpread: 1,
    beamStripeStrength: 1,
    beamWhiteBloom: 1,
    beamWarmBloom: 0,
    screenFaceGlow: 0,
    monoTint: "gray",
    neonBoost: 1,
    neonSaturation: 1,
    neonDetail: 1,
    focusStrength: 0,
    focusWidth: 0.24,
    focusHeight: 0.16,
  },
  animeToon: {
    label: "Anime Toon",
    width: 640,
    height: 360,
    colors: 8,
    dither: 0.0,
    palette: "free",
    curvature: 0.0,
    scanline: 0.0,
    scanline2: 0.0,
    vignette: 0.0,
    glow: 0.0,
    smoothStrength: 0.35,
    toonSteps: 8,
    edgeBoost: 0.22,
    animeEdgeLow: 0.08,
    animeEdgeHigh: 0.55,
    phosphor: 0.0,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
  },
  warmBokeh: {
    label: "Warm Bokeh",
    width: 960,
    height: 540,
    colors: 64,
    dither: 0.06,
    palette: "free",
    curvature: 0.05,
    scanline: 0.02,
    scanline2: 0.01,
    vignette: 0.28,
    glow: 0.14,
    phosphor: 0.04,
    spotMask: 0.0,
    bulbRadius: 0.3,
    blackFloor: 0.005,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    focusStrength: 0.28,
    focusWidth: 0.24,
    focusHeight: 0.16,
  },
} as const satisfies Record<
  string,
  RetroPresetDefinition
>;

export type RetroPresetKey = keyof typeof RETRO_PRESETS;

// Single source of truth for "which preset is the app's default".
// Change this one line to try a different default; every consumer (initial
// filter state, saved-settings fallback, etc.) resolves through this key.
export const defaultPresetId: RetroPresetKey = "phosphorDot";
// デフォルト候補: "phosphorDot";//"tetorica";

export const buildRetroPresetVariantPreparation = (
  preset: RetroPresetDefinition,
): RetroPresetVariantPreparation => ({
  paletteMode: preset.palette,
  phosphorDotShape: preset.phosphorDotShape ?? "circle",
  phosphorStrength: preset.phosphor,
  spotMaskStrength: preset.spotMask,
  compositeEnabled: preset.compositeEnabled ?? false,
  compositeAmount: preset.compositeAmount ?? 0,
});

export const resolveRetroPresetRenderMode = (
  preset: RetroPresetDefinition,
): RetroPresetRenderMode => {
  if (preset.renderModeOverride) {
    return preset.renderModeOverride;
  }

  if (preset === RETRO_PRESETS.phosphorDot || preset === RETRO_PRESETS.phosphorDotSmooth) {
    return "lite";
  }

  const samplingMode = preset.samplingMode ?? "nearest";
  if (samplingMode !== "nearest") {
    return "full";
  }

  if (preset.palette === "pc98_tile" || preset.palette === "pc98_512_sat") {
    return "full";
  }

  const variant = buildRetroPresetVariantPreparation(preset);
  const isBeamMode = variant.phosphorDotShape === "beam";
  const hasComposite = variant.compositeEnabled && variant.compositeAmount > 0.001;
  return isBeamMode || hasComposite ? "full" : "lite";
};

export const resolveRetroVariantPreparationRenderMode = (
  variant: RetroPresetVariantPreparation,
): RetroPresetRenderMode => {
  const isBeamMode = variant.phosphorDotShape === "beam";
  const hasComposite = variant.compositeEnabled && variant.compositeAmount > 0.001;
  return isBeamMode || hasComposite ? "full" : "lite";
};

// Grouping used by the preset picker UI. "none" is intentionally excluded —
// it's rendered outside the category boxes as a plain "no filter" option.
export type RetroPresetCategory = "classic" | "lcd" | "crt" | "other";

export const RETRO_PRESET_CATEGORY_LABELS: Record<RetroPresetCategory, string> = {
  classic: "Game / Classic",
  lcd: "Portable / LCD",
  crt: "CRT",
  other: "Other",
};

export const RETRO_PRESET_CATEGORY_ORDER: RetroPresetCategory[] = [
  "classic",
  "lcd",
  "crt",
  "other",
];

export const RETRO_PRESET_CATEGORIES = {
  chunky: "classic",
  arcade: "classic",
  gbLite: "classic",
  gb: "classic",
  gbPlus: "classic",
  gbaLite: "classic",
  gba: "classic",
  gbm: "classic",
  pc98_512: "classic",
  pc98_4096: "classic",
  pc98: "classic",
  pc98_tile: "classic",
  color32: "classic",
  color64: "classic",
  monochrome: "lcd",
  lcdIce: "lcd",
  greenTerminal: "crt",
  amberCrt: "crt",
  phosphorDotLite: "crt",
  phosphorDot: "crt",
  phosphorDotSmooth: "crt",
  crtBeam: "crt",
  crtBeamNtsc: "crt",
  crtNtsc: "crt",
  crtOnly: "crt",
  crtEdge: "crt",
  warmBokeh: "crt",
  neonLine: "other",
  animeCel: "other",
  animeToon: "other",
  tetorica: "other",
  tetoricaDot: "other",
} as const satisfies Record<Exclude<RetroPresetKey, "none">, RetroPresetCategory>;

export type RetroPresetFamilyVariant = {
  key: Exclude<RetroPresetKey, "none">;
  label: string;
};

export type RetroPresetCategoryItem =
  | {
    type: "preset";
    key: Exclude<RetroPresetKey, "none">;
  }
  | {
    type: "family";
    id: string;
    label: string;
    variants: readonly RetroPresetFamilyVariant[];
  };

export const RETRO_PRESET_CATEGORY_ITEMS: Record<
  RetroPresetCategory,
  readonly RetroPresetCategoryItem[]
> = {
  classic: [
    { type: "preset", key: "chunky" },
    { type: "preset", key: "arcade" },
    { type: "preset", key: "pc98" },
    { type: "preset", key: "color32" },
    { type: "preset", key: "color64" },
    {
      type: "family",
      id: "gb",
      label: "GB",
      variants: [
        { key: "gbLite", label: "Lite" },
        { key: "gb", label: "Base" },
        { key: "gbPlus", label: "+" },
      ],
    },
    {
      type: "family",
      id: "gba",
      label: "GBA",
      variants: [
        { key: "gbaLite", label: "Lite" },
        { key: "gba", label: "Base" },
        { key: "gbm", label: "GBM" },
      ],
    },
    {
      type: "family",
      id: "pc98",
      label: "PC-98",
      variants: [
        { key: "pc98_512", label: "512" },
        { key: "pc98_4096", label: "4096" },
        { key: "pc98_tile", label: "Tile" },
      ],
    },
  ],
  lcd: [
    { type: "preset", key: "monochrome" },
    { type: "preset", key: "lcdIce" },
  ],
  crt: [
    {
      type: "family",
      id: "phosphor",
      label: "Phosphor Dot",
      variants: [
        { key: "phosphorDot", label: "Base" },
        { key: "phosphorDotLite", label: "Bright" },
        { key: "phosphorDotSmooth", label: "Smooth" },
      ],
    },
    {
      type: "family",
      id: "beam",
      label: "CRT Beam",
      variants: [
        { key: "crtBeam", label: "Beam" },
        { key: "crtBeamNtsc", label: "NTSC" },
      ],
    },
    {
      type: "family",
      id: "crt",
      label: "CRT",
      variants: [
        { key: "crtEdge", label: "Edge" },
        { key: "crtNtsc", label: "NTSC" },
        { key: "crtOnly", label: "Only" },
      ],
    },
    {
      type: "family",
      id: "mono",
      label: "Mono",
      variants: [
        { key: "greenTerminal", label: "Green" },
        { key: "amberCrt", label: "Amber" },
      ],
    },
  ],
  other: [
    { type: "preset", key: "warmBokeh" },
    { type: "preset", key: "neonLine" },
    { type: "preset", key: "animeCel" },
    { type: "preset", key: "animeToon" },
    { type: "preset", key: "tetorica" },
    { type: "preset", key: "tetoricaDot" },
  ],
};

export const paletteModeToUniform = (mode: PaletteMode) => {
  if (mode === "pc98") return 1;
  if (mode === "pc98_tile") return 2;
  if (mode === "pc98_512") return 3;
  if (mode === "pc98_512_sat") return 4;
  if (mode === "pc98_4096") return 5;
  if (mode === "color32") return 6;
  if (mode === "color64") return 7;
  if (mode === "mono") return 8;
  if (mode === "neon") return 9;
  if (mode === "anime") return 10;

  return 0;
};
