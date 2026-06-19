export const SETTINGS_STORAGE_KEY = "retroPluginSettings";
export const CUSTOM_PRESET_KEY = "custom";

export const PALETTE_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pc98", label: "Color 16" },
  { value: "pc98_tile", label: "PC-98 Tile" },
  { value: "pc98_512", label: "PC-98 512-color" },
  { value: "pc98_512_sat", label: "PC-98 512 Sat" },
  { value: "pc98_4096", label: "PC-98 4096-color" },
  { value: "color32", label: "Color 32" },
  { value: "color64", label: "Color 64" },
  { value: "mono", label: "Mono" },
  { value: "neon", label: "Neon" },
];

export const MONO_TINT_OPTIONS = [
  { value: "gray", label: "Gray", rgb: [1, 1, 1] },
  { value: "green", label: "Green", rgb: [0.72, 1, 0.58] },
  { value: "amber", label: "Amber", rgb: [1, 0.82, 0.45] },
  { value: "ice", label: "Ice", rgb: [0.7, 0.9, 1] },
];

export const PRESETS = {
  none: {
    label: "None",
    targetWidth: 1920,
    targetHeight: 1080,
    matchTargetAspect: false,
    colorLevels: 64,
    ditherStrength: 0.0,
    paletteMode: 0,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.0,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    spotMaskStrength: 0.0,
    phosphorDotMode: false,
    bulbRadius: 0.22,
    blackFloor: 0.01,
    phosphorDotLightBalance: 1.0,
    phosphorDotInternalScale: false,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.0,
    phosphorDotFlatDisc: false,
    phosphorDotNeighborBlend: false,
    monoTint: "amber",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    isAudioFxEnabled: false,
    lofiAmount: 0.0,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  chunky: {
    label: "Chunky",
    targetWidth: 256,
    targetHeight: 192,
    colorLevels: 8,
    ditherStrength: 0.2,
    paletteMode: 0,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.015,
    vignetteStrength: 0.04,
    glowStrength: 0.03,
    phosphorStrength: 0.03,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.25,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  arcade: {
    label: "Arcade",
    targetWidth: 320,
    targetHeight: 224,
    colorLevels: 12,
    ditherStrength: 0.28,
    paletteMode: 0,
    curvature: 0.04,
    scanlineStrength: 0.08,
    scanline2Strength: 0.0,
    vignetteStrength: 0.08,
    glowStrength: 0.06,
    phosphorStrength: 0.05,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.25,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  greenTerminal: {
    label: "Green Terminal",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.14,
    paletteMode: 8,
    curvature: 0.07,
    scanlineStrength: 0.16,
    scanline2Strength: 0.0,
    vignetteStrength: 0.1,
    glowStrength: 0.09,
    phosphorStrength: 0.06,
    spotMaskStrength: 0.0,
    monoTint: "green",
    isAudioFxEnabled: true,
    lofiAmount: 0.5,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.018,
  },
  gb: {
    label: "GB",
    targetWidth: 160,
    targetHeight: 144,
    colorLevels: 4,
    ditherStrength: 0.08,
    paletteMode: 8,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.015,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    spotMaskStrength: 0.0,
    monoTint: "green",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  gba: {
    label: "GBA",
    targetWidth: 240,
    targetHeight: 160,
    colorLevels: 48,
    ditherStrength: 0.06,
    paletteMode: 0,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.02,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  amberCrt: {
    label: "Amber CRT",
    targetWidth: 960,
    targetHeight: 600,
    colorLevels: 32,
    ditherStrength: 0.16,
    paletteMode: 8,
    curvature: 0.08,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.11,
    glowStrength: 0.1,
    phosphorStrength: 0.05,
    spotMaskStrength: 0.0,
    monoTint: "amber",
    isAudioFxEnabled: true,
    lofiAmount: 0.5,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.015,
  },
  monochrome: {
    label: "Mono",
    targetWidth: 960,
    targetHeight: 600,
    colorLevels: 32,
    ditherStrength: 0.18,
    paletteMode: 8,
    curvature: 0.05,
    scanlineStrength: 0.1,
    scanline2Strength: 0.0,
    vignetteStrength: 0.08,
    glowStrength: 0.07,
    phosphorStrength: 0.02,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.4,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.012,
  },
  lcdIce: {
    label: "LCD Ice",
    targetWidth: 480,
    targetHeight: 300,
    colorLevels: 16,
    ditherStrength: 0.06,
    paletteMode: 8,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.015,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    spotMaskStrength: 0.0,
    monoTint: "ice",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  pc98_512: {
    label: "PC-98 512-color",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 8,
    ditherStrength: 0.12,
    paletteMode: 3,
    curvature: 0.08,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.3,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.006,
  },
  pc98_tile: {
    label: "PC-98 Tile",
    targetWidth: 1280,
    targetHeight: 800,
    colorLevels: 16,
    ditherStrength: 0.0,
    paletteMode: 2,
    curvature: 0.03,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.02,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.55,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.007,
  },
  pc98_4096: {
    label: "PC-98 4096-color",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.08,
    paletteMode: 5,
    curvature: 0.06,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.4,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.005,
  },
  pc98: {
    label: "Color 16",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.35,
    paletteMode: 1,
    curvature: 0.02,
    scanlineStrength: 0.05,
    scanline2Strength: 0.0,
    vignetteStrength: 0.06,
    glowStrength: 0.05,
    phosphorStrength: 0.04,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  color32: {
    label: "Color 32",
    targetWidth: 320,
    targetHeight: 200,
    colorLevels: 32,
    ditherStrength: 0.24,
    paletteMode: 6,
    curvature: 0.03,
    scanlineStrength: 0.06,
    scanline2Strength: 0.0,
    vignetteStrength: 0.05,
    glowStrength: 0.04,
    phosphorStrength: 0.03,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  color64: {
    label: "Color 64",
    targetWidth: 320,
    targetHeight: 200,
    colorLevels: 64,
    ditherStrength: 0.2,
    paletteMode: 7,
    curvature: 0.03,
    scanlineStrength: 0.04,
    scanline2Strength: 0.0,
    vignetteStrength: 0.04,
    glowStrength: 0.03,
    phosphorStrength: 0.03,
    spotMaskStrength: 0.0,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  neonLine: {
    label: "Neon Line",
    targetWidth: 960,
    targetHeight: 540,
    colorLevels: 24,
    ditherStrength: 0.0,
    paletteMode: 9,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.04,
    glowStrength: 0.18,
    phosphorStrength: 0.0,
    spotMaskStrength: 0.0,
    phosphorDotMode: false,
    bulbRadius: 0.3,
    blackFloor: 0.008,
    phosphorDotLightBalance: 1.0,
    phosphorDotInternalScale: false,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.0,
    phosphorDotFlatDisc: false,
    phosphorDotNeighborBlend: false,
    monoTint: "ice",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  crtOnly: {
    label: "CRT Only",
    targetWidth: 1280,
    targetHeight: 800,
    colorLevels: 256,
    ditherStrength: 0.12,
    paletteMode: 0,
    curvature: 0.03,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    spotMaskStrength: 0.0,
    phosphorDotMode: false,
    bulbRadius: 0.22,
    blackFloor: 0.01,
    phosphorDotLightBalance: 1.0,
    phosphorDotInternalScale: false,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.0,
    phosphorDotFlatDisc: false,
    phosphorDotNeighborBlend: false,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: true,
    noiseLevel: 0.008,
  },
  phosphorDot: {
    label: "Phosphor Dot",
    targetWidth: 320,
    targetHeight: 180,
    colorLevels: 32,
    ditherStrength: 0.0,
    paletteMode: 0,
    curvature: 0.065,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.3,
    glowStrength: 0.04,
    phosphorStrength: 0.0,
    spotMaskStrength: 1.0,
    phosphorDotMode: true,
    bulbRadius: 0.29,
    blackFloor: 0.006,
    phosphorDotLightBalance: 1.0,
    phosphorDotInternalScale: true,
    phosphorDotBrightCore: false,
    phosphorDotCellFill: 0.12,
    phosphorDotFlatDisc: true,
    phosphorDotNeighborBlend: true,
    monoTint: "gray",
    neonBoost: 1.0,
    neonSaturation: 1.0,
    neonDetail: 1.0,
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    wowFlutterAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
};

export const DEFAULT_SETTINGS = {
  presetKey: "amberCrt",
  audioPresetKey: "custom",
  crtAspect: 1.0,
  paletteMode: "mono",
  monoTint: "amber",
  targetWidth: 960,
  targetHeight: 600,
  matchTargetAspect: false,
  ditherStrength: 0.16,
  curvature: 0.08,
  scanlineStrength: 0.0,
  scanline2Strength: 0.02,
  scanlineBrightnessFade: 0.6,
  vignetteStrength: 0.11,
  glowStrength: 0.1,
  phosphorStrength: 0.05,
  spotMaskStrength: 0.0,
  phosphorDotMode: false,
  bulbRadius: 0.22,
  blackFloor: 0.01,
  phosphorDotLightBalance: 1.0,
  phosphorDotInternalScale: false,
  phosphorDotBrightCore: false,
  phosphorDotCellFill: 0.0,
  phosphorDotFlatDisc: false,
  phosphorDotNeighborBlend: false,
  closeUpNoiseStrength: 0.0,
  neonBoost: 1.0,
  neonSaturation: 1.0,
  neonDetail: 1.0,
  colorLevels: 32,
  overlayTargetCount: 1,
  isAudioFxEnabled: true,
  lofiAmount: 0.65,
  radioToneAmount: 0.0,
  bitCrushAmount: 0.0,
  sampleRateReductionAmount: 0.0,
  bassAmount: 0.0,
  midAmount: 0.0,
  trebleAmount: 0.0,
  stereoWidthAmount: 0.0,
  smallSpeakerRoomAmount: 0.0,
  wowFlutterAmount: 0.0,
  isNoiseEnabled: true,
  noiseLevel: 0.015,
  vinylDustAmount: 0.0,
};

export const COLOR_LEVEL_LIMITS = {
  min: 2,
  max: 256,
};

export const OVERLAY_TARGET_LIMITS = {
  min: 1,
  max: 12,
};

export function normalizeSettings(candidate) {
  const presetKey = typeof candidate?.presetKey === "string" && candidate.presetKey in PRESETS
    ? candidate.presetKey
    : candidate?.presetKey === CUSTOM_PRESET_KEY
      ? CUSTOM_PRESET_KEY
      : DEFAULT_SETTINGS.presetKey;
  const basePresetSettings =
    presetKey !== CUSTOM_PRESET_KEY
      ? applyPresetToSettings(presetKey)
      : DEFAULT_SETTINGS;
  const paletteMode = isPaletteMode(candidate?.paletteMode)
    ? candidate.paletteMode
    : basePresetSettings.paletteMode;
  const monoTint = isMonoTint(candidate?.monoTint)
    ? candidate.monoTint
    : basePresetSettings.monoTint;
  const resolvedColorLevels = resolveColorLevels(
    paletteMode,
    typeof candidate?.colorLevels === "number"
      ? candidate.colorLevels
      : basePresetSettings.colorLevels,
  );

  return {
    presetKey,
    audioPresetKey:
      typeof candidate?.audioPresetKey === "string"
        ? candidate.audioPresetKey
        : DEFAULT_SETTINGS.audioPresetKey,
    crtAspect:
      typeof candidate?.crtAspect === "number"
        ? clamp(candidate.crtAspect, 0.9, 1.1)
        : basePresetSettings.crtAspect,
    paletteMode,
    monoTint,
    targetWidth:
      typeof candidate?.targetWidth === "number"
        ? clamp(candidate.targetWidth, 1, 2560)
        : basePresetSettings.targetWidth,
    targetHeight:
      typeof candidate?.targetHeight === "number"
        ? clamp(candidate.targetHeight, 1, 2560)
        : basePresetSettings.targetHeight,
    matchTargetAspect:
      typeof candidate?.matchTargetAspect === "boolean"
        ? candidate.matchTargetAspect
        : basePresetSettings.matchTargetAspect ?? DEFAULT_SETTINGS.matchTargetAspect,
    ditherStrength:
      typeof candidate?.ditherStrength === "number"
        ? clamp(candidate.ditherStrength, 0, 1)
        : basePresetSettings.ditherStrength,
    curvature:
      typeof candidate?.curvature === "number"
        ? clamp(candidate.curvature, 0, 0.2)
        : basePresetSettings.curvature,
    scanlineStrength:
      typeof candidate?.scanlineStrength === "number"
        ? clamp(candidate.scanlineStrength, 0, 0.3)
        : basePresetSettings.scanlineStrength,
    scanline2Strength:
      typeof candidate?.scanline2Strength === "number"
        ? clamp(candidate.scanline2Strength, 0, 0.1)
        : basePresetSettings.scanline2Strength,
    scanlineBrightnessFade:
      typeof candidate?.scanlineBrightnessFade === "number"
        ? clamp(candidate.scanlineBrightnessFade, 0, 1)
        : basePresetSettings.scanlineBrightnessFade ?? DEFAULT_SETTINGS.scanlineBrightnessFade,
    vignetteStrength:
      typeof candidate?.vignetteStrength === "number"
        ? clamp(candidate.vignetteStrength, 0, 0.6)
        : basePresetSettings.vignetteStrength,
    glowStrength:
      typeof candidate?.glowStrength === "number"
        ? clamp(candidate.glowStrength, 0, 0.5)
        : basePresetSettings.glowStrength,
    phosphorStrength:
      typeof candidate?.phosphorStrength === "number"
        ? clamp(candidate.phosphorStrength, 0, 0.5)
        : basePresetSettings.phosphorStrength,
    spotMaskStrength:
      typeof candidate?.spotMaskStrength === "number"
        ? clamp(candidate.spotMaskStrength, 0, 1.0)
        : basePresetSettings.spotMaskStrength ?? DEFAULT_SETTINGS.spotMaskStrength,
    phosphorDotMode:
      typeof candidate?.phosphorDotMode === "boolean"
        ? candidate.phosphorDotMode
        : basePresetSettings.phosphorDotMode ?? DEFAULT_SETTINGS.phosphorDotMode,
    bulbRadius:
      typeof candidate?.bulbRadius === "number"
        ? clamp(candidate.bulbRadius, 0.001, 0.5)
        : basePresetSettings.bulbRadius ?? DEFAULT_SETTINGS.bulbRadius,
    blackFloor:
      typeof candidate?.blackFloor === "number"
        ? clamp(candidate.blackFloor, 0, 0.5)
        : basePresetSettings.blackFloor ?? DEFAULT_SETTINGS.blackFloor,
    phosphorDotLightBalance:
      typeof candidate?.phosphorDotLightBalance === "number"
        ? clamp(candidate.phosphorDotLightBalance, 0, 2)
        : basePresetSettings.phosphorDotLightBalance ?? DEFAULT_SETTINGS.phosphorDotLightBalance,
    phosphorDotInternalScale:
      typeof candidate?.phosphorDotInternalScale === "boolean"
        ? candidate.phosphorDotInternalScale
        : basePresetSettings.phosphorDotInternalScale ?? DEFAULT_SETTINGS.phosphorDotInternalScale,
    phosphorDotBrightCore:
      typeof candidate?.phosphorDotBrightCore === "boolean"
        ? candidate.phosphorDotBrightCore
        : basePresetSettings.phosphorDotBrightCore ?? DEFAULT_SETTINGS.phosphorDotBrightCore,
    phosphorDotCellFill:
      typeof candidate?.phosphorDotCellFill === "number"
        ? clamp(candidate.phosphorDotCellFill, 0, 0.5)
        : basePresetSettings.phosphorDotCellFill ?? DEFAULT_SETTINGS.phosphorDotCellFill,
    phosphorDotFlatDisc:
      typeof candidate?.phosphorDotFlatDisc === "boolean"
        ? candidate.phosphorDotFlatDisc
        : basePresetSettings.phosphorDotFlatDisc ?? DEFAULT_SETTINGS.phosphorDotFlatDisc,
    phosphorDotNeighborBlend:
      typeof candidate?.phosphorDotNeighborBlend === "boolean"
        ? candidate.phosphorDotNeighborBlend
        : basePresetSettings.phosphorDotNeighborBlend ?? DEFAULT_SETTINGS.phosphorDotNeighborBlend,
    closeUpNoiseStrength:
      typeof candidate?.closeUpNoiseStrength === "number"
        ? clamp(candidate.closeUpNoiseStrength, 0, 2)
        : basePresetSettings.closeUpNoiseStrength ?? DEFAULT_SETTINGS.closeUpNoiseStrength,
    neonBoost:
      typeof candidate?.neonBoost === "number"
        ? clamp(candidate.neonBoost, 0, 2)
        : basePresetSettings.neonBoost ?? DEFAULT_SETTINGS.neonBoost,
    neonSaturation:
      typeof candidate?.neonSaturation === "number"
        ? clamp(candidate.neonSaturation, 0, 2)
        : basePresetSettings.neonSaturation ?? DEFAULT_SETTINGS.neonSaturation,
    neonDetail:
      typeof candidate?.neonDetail === "number"
        ? clamp(candidate.neonDetail, 0, 2)
        : basePresetSettings.neonDetail ?? DEFAULT_SETTINGS.neonDetail,
    colorLevels: resolvedColorLevels,
    overlayTargetCount:
      typeof candidate?.overlayTargetCount === "number"
        ? clamp(
            Math.round(candidate.overlayTargetCount),
            OVERLAY_TARGET_LIMITS.min,
            OVERLAY_TARGET_LIMITS.max,
          )
        : DEFAULT_SETTINGS.overlayTargetCount,
    isAudioFxEnabled:
      typeof candidate?.isAudioFxEnabled === "boolean"
        ? candidate.isAudioFxEnabled
        : DEFAULT_SETTINGS.isAudioFxEnabled,
    lofiAmount:
      typeof candidate?.lofiAmount === "number"
        ? clamp(candidate.lofiAmount, 0, 1)
        : DEFAULT_SETTINGS.lofiAmount,
    radioToneAmount:
      typeof candidate?.radioToneAmount === "number"
        ? clamp(candidate.radioToneAmount, 0, 1)
        : basePresetSettings.radioToneAmount ?? DEFAULT_SETTINGS.radioToneAmount,
    bitCrushAmount:
      typeof candidate?.bitCrushAmount === "number"
        ? clamp(candidate.bitCrushAmount, 0, 1)
        : basePresetSettings.bitCrushAmount ?? DEFAULT_SETTINGS.bitCrushAmount,
    sampleRateReductionAmount:
      typeof candidate?.sampleRateReductionAmount === "number"
        ? clamp(candidate.sampleRateReductionAmount, 0, 1)
        : basePresetSettings.sampleRateReductionAmount ??
          DEFAULT_SETTINGS.sampleRateReductionAmount,
    bassAmount:
      typeof candidate?.bassAmount === "number"
        ? clamp(candidate.bassAmount, -1.5, 1.5)
        : basePresetSettings.bassAmount ?? DEFAULT_SETTINGS.bassAmount,
    midAmount:
      typeof candidate?.midAmount === "number"
        ? clamp(candidate.midAmount, -1.5, 1.5)
        : basePresetSettings.midAmount ?? DEFAULT_SETTINGS.midAmount,
    trebleAmount:
      typeof candidate?.trebleAmount === "number"
        ? clamp(candidate.trebleAmount, -1.5, 1.5)
        : basePresetSettings.trebleAmount ?? DEFAULT_SETTINGS.trebleAmount,
    stereoWidthAmount:
      typeof candidate?.stereoWidthAmount === "number"
        ? clamp(candidate.stereoWidthAmount, -1, 1)
        : basePresetSettings.stereoWidthAmount ?? DEFAULT_SETTINGS.stereoWidthAmount,
    smallSpeakerRoomAmount:
      typeof candidate?.smallSpeakerRoomAmount === "number"
        ? clamp(candidate.smallSpeakerRoomAmount, 0, 1)
        : basePresetSettings.smallSpeakerRoomAmount ?? DEFAULT_SETTINGS.smallSpeakerRoomAmount,
    wowFlutterAmount:
      typeof candidate?.wowFlutterAmount === "number"
        ? clamp(candidate.wowFlutterAmount, 0, 1)
        : basePresetSettings.wowFlutterAmount ?? DEFAULT_SETTINGS.wowFlutterAmount,
    isNoiseEnabled:
      typeof candidate?.isNoiseEnabled === "boolean"
        ? candidate.isNoiseEnabled
        : basePresetSettings.isNoiseEnabled,
    noiseLevel:
      typeof candidate?.noiseLevel === "number"
        ? clamp(candidate.noiseLevel, 0, 0.05)
        : basePresetSettings.noiseLevel,
    vinylDustAmount:
      typeof candidate?.vinylDustAmount === "number"
        ? clamp(candidate.vinylDustAmount, 0, 1)
        : basePresetSettings.vinylDustAmount ?? DEFAULT_SETTINGS.vinylDustAmount,
  };
}

export function applyPresetToSettings(presetKey) {
  const preset = PRESETS[presetKey] ?? PRESETS[DEFAULT_SETTINGS.presetKey];

  return {
    ...DEFAULT_SETTINGS,
    presetKey,
    audioPresetKey: DEFAULT_SETTINGS.audioPresetKey,
    crtAspect:
      typeof preset.crtAspect === "number"
        ? preset.crtAspect
        : DEFAULT_SETTINGS.crtAspect,
    targetWidth: preset.targetWidth,
    targetHeight: preset.targetHeight,
    matchTargetAspect:
      typeof preset.matchTargetAspect === "boolean"
        ? preset.matchTargetAspect
        : DEFAULT_SETTINGS.matchTargetAspect,
    colorLevels: preset.colorLevels,
    ditherStrength: preset.ditherStrength,
    paletteMode: paletteModeFromUniform(preset.paletteMode),
    curvature: preset.curvature,
    scanlineStrength: preset.scanlineStrength,
    scanline2Strength: preset.scanline2Strength,
    scanlineBrightnessFade:
      typeof preset.scanlineBrightnessFade === "number"
        ? preset.scanlineBrightnessFade
        : DEFAULT_SETTINGS.scanlineBrightnessFade,
    vignetteStrength: preset.vignetteStrength,
    glowStrength: preset.glowStrength,
    phosphorStrength: preset.phosphorStrength,
    spotMaskStrength:
      typeof preset.spotMaskStrength === "number"
        ? preset.spotMaskStrength
        : DEFAULT_SETTINGS.spotMaskStrength,
    phosphorDotMode:
      typeof preset.phosphorDotMode === "boolean"
        ? preset.phosphorDotMode
        : DEFAULT_SETTINGS.phosphorDotMode,
    bulbRadius:
      typeof preset.bulbRadius === "number"
        ? preset.bulbRadius
        : DEFAULT_SETTINGS.bulbRadius,
    blackFloor:
      typeof preset.blackFloor === "number"
        ? preset.blackFloor
        : DEFAULT_SETTINGS.blackFloor,
    phosphorDotLightBalance:
      typeof preset.phosphorDotLightBalance === "number"
        ? preset.phosphorDotLightBalance
        : DEFAULT_SETTINGS.phosphorDotLightBalance,
    phosphorDotInternalScale:
      typeof preset.phosphorDotInternalScale === "boolean"
        ? preset.phosphorDotInternalScale
        : DEFAULT_SETTINGS.phosphorDotInternalScale,
    phosphorDotBrightCore:
      typeof preset.phosphorDotBrightCore === "boolean"
        ? preset.phosphorDotBrightCore
        : DEFAULT_SETTINGS.phosphorDotBrightCore,
    phosphorDotCellFill:
      typeof preset.phosphorDotCellFill === "number"
        ? preset.phosphorDotCellFill
        : DEFAULT_SETTINGS.phosphorDotCellFill,
    phosphorDotFlatDisc:
      typeof preset.phosphorDotFlatDisc === "boolean"
        ? preset.phosphorDotFlatDisc
        : DEFAULT_SETTINGS.phosphorDotFlatDisc,
    phosphorDotNeighborBlend:
      typeof preset.phosphorDotNeighborBlend === "boolean"
        ? preset.phosphorDotNeighborBlend
        : DEFAULT_SETTINGS.phosphorDotNeighborBlend,
    monoTint: preset.monoTint,
    neonBoost:
      typeof preset.neonBoost === "number"
        ? preset.neonBoost
        : DEFAULT_SETTINGS.neonBoost,
    neonSaturation:
      typeof preset.neonSaturation === "number"
        ? preset.neonSaturation
        : DEFAULT_SETTINGS.neonSaturation,
    neonDetail:
      typeof preset.neonDetail === "number"
        ? preset.neonDetail
        : DEFAULT_SETTINGS.neonDetail,
    isAudioFxEnabled:
      typeof preset.isAudioFxEnabled === "boolean"
        ? preset.isAudioFxEnabled
        : DEFAULT_SETTINGS.isAudioFxEnabled,
    lofiAmount:
      typeof preset.lofiAmount === "number"
        ? preset.lofiAmount
        : DEFAULT_SETTINGS.lofiAmount,
    radioToneAmount:
      typeof preset.radioToneAmount === "number"
        ? preset.radioToneAmount
        : DEFAULT_SETTINGS.radioToneAmount,
    bitCrushAmount:
      typeof preset.bitCrushAmount === "number"
        ? preset.bitCrushAmount
        : DEFAULT_SETTINGS.bitCrushAmount,
    sampleRateReductionAmount:
      typeof preset.sampleRateReductionAmount === "number"
        ? preset.sampleRateReductionAmount
        : DEFAULT_SETTINGS.sampleRateReductionAmount,
    bassAmount:
      typeof preset.bassAmount === "number"
        ? preset.bassAmount
        : DEFAULT_SETTINGS.bassAmount,
    midAmount:
      typeof preset.midAmount === "number"
        ? preset.midAmount
        : DEFAULT_SETTINGS.midAmount,
    trebleAmount:
      typeof preset.trebleAmount === "number"
        ? preset.trebleAmount
        : DEFAULT_SETTINGS.trebleAmount,
    stereoWidthAmount:
      typeof preset.stereoWidthAmount === "number"
        ? preset.stereoWidthAmount
        : DEFAULT_SETTINGS.stereoWidthAmount,
    smallSpeakerRoomAmount:
      typeof preset.smallSpeakerRoomAmount === "number"
        ? preset.smallSpeakerRoomAmount
        : DEFAULT_SETTINGS.smallSpeakerRoomAmount,
    wowFlutterAmount:
      typeof preset.wowFlutterAmount === "number"
        ? preset.wowFlutterAmount
        : DEFAULT_SETTINGS.wowFlutterAmount,
    isNoiseEnabled:
      typeof preset.isNoiseEnabled === "boolean"
        ? preset.isNoiseEnabled
        : DEFAULT_SETTINGS.isNoiseEnabled,
    noiseLevel:
      typeof preset.noiseLevel === "number"
        ? preset.noiseLevel
        : DEFAULT_SETTINGS.noiseLevel,
    vinylDustAmount:
      typeof preset.vinylDustAmount === "number"
        ? preset.vinylDustAmount
        : DEFAULT_SETTINGS.vinylDustAmount,
  };
}

export function toShaderMonoTint(mode) {
  return MONO_TINT_OPTIONS.find((option) => option.value === mode)?.rgb ?? [1, 1, 1];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isPaletteMode(value) {
  return PALETTE_OPTIONS.some((option) => option.value === value);
}

function isMonoTint(value) {
  return MONO_TINT_OPTIONS.some((option) => option.value === value);
}

export function getDefaultColorLevelsForPalette(paletteMode) {
  if (paletteMode === "free") return 256;
  if (paletteMode === "pc98") return 16;
  if (paletteMode === "pc98_tile") return 16;
  if (paletteMode === "pc98_4096") return 16;
  if (paletteMode === "pc98_512") return 8;
  if (paletteMode === "pc98_512_sat") return 8;
  if (paletteMode === "color32") return 32;
  if (paletteMode === "color64") return 64;
  if (paletteMode === "neon") return 24;

  return DEFAULT_SETTINGS.colorLevels;
}

function resolveColorLevels(paletteMode, requestedLevels) {
  if (paletteMode !== "mono" && paletteMode !== "free") {
    return getDefaultColorLevelsForPalette(paletteMode);
  }

  return clamp(requestedLevels, COLOR_LEVEL_LIMITS.min, COLOR_LEVEL_LIMITS.max);
}

function paletteModeFromUniform(value) {
  if (value === 1) return "pc98";
  if (value === 2) return "pc98_tile";
  if (value === 3) return "pc98_512";
  if (value === 4) return "pc98_512_sat";
  if (value === 5) return "pc98_4096";
  if (value === 6) return "color32";
  if (value === 7) return "color64";
  if (value === 8) return "mono";
  if (value === 9) return "neon";
  return "free";
}
