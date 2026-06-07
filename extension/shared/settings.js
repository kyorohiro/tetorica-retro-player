export const SETTINGS_STORAGE_KEY = "retroPluginSettings";
export const CUSTOM_PRESET_KEY = "custom";

export const PALETTE_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pc98", label: "Color 16" },
  { value: "pc98_512", label: "PC-98 512-color" },
  { value: "pc98_4096", label: "PC-98 4096-color" },
  { value: "color32", label: "Color 32" },
  { value: "color64", label: "Color 64" },
  { value: "mono", label: "Monochrome" },
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
    colorLevels: 64,
    ditherStrength: 0.0,
    paletteMode: 0,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.0,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    monoTint: "amber",
    isAudioFxEnabled: false,
    lofiAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  greenTerminal: {
    label: "Green Terminal",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.14,
    paletteMode: 6,
    curvature: 0.07,
    scanlineStrength: 0.16,
    scanline2Strength: 0.0,
    vignetteStrength: 0.1,
    glowStrength: 0.09,
    phosphorStrength: 0.06,
    monoTint: "green",
    isAudioFxEnabled: true,
    lofiAmount: 1.0,
    isNoiseEnabled: true,
    noiseLevel: 0.018,
  },
  amberCrt: {
    label: "Amber CRT",
    targetWidth: 960,
    targetHeight: 600,
    colorLevels: 32,
    ditherStrength: 0.16,
    paletteMode: 6,
    curvature: 0.08,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.11,
    glowStrength: 0.1,
    phosphorStrength: 0.05,
    monoTint: "amber",
    isAudioFxEnabled: true,
    lofiAmount: 0.85,
    isNoiseEnabled: true,
    noiseLevel: 0.015,
  },
  monochrome: {
    label: "Mono",
    targetWidth: 960,
    targetHeight: 600,
    colorLevels: 32,
    ditherStrength: 0.18,
    paletteMode: 6,
    curvature: 0.05,
    scanlineStrength: 0.1,
    scanline2Strength: 0.0,
    vignetteStrength: 0.08,
    glowStrength: 0.07,
    phosphorStrength: 0.02,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.7,
    isNoiseEnabled: true,
    noiseLevel: 0.012,
  },
  lcdIce: {
    label: "LCD Ice",
    targetWidth: 480,
    targetHeight: 300,
    colorLevels: 16,
    ditherStrength: 0.06,
    paletteMode: 6,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.015,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    monoTint: "ice",
    isAudioFxEnabled: false,
    lofiAmount: 0.0,
    isNoiseEnabled: false,
    noiseLevel: 0.0,
  },
  pc98_512: {
    label: "PC-98 512-color",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 8,
    ditherStrength: 0.12,
    paletteMode: 2,
    curvature: 0.08,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.5,
    isNoiseEnabled: true,
    noiseLevel: 0.006,
  },
  pc98_4096: {
    label: "PC-98 4096-color",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.08,
    paletteMode: 3,
    curvature: 0.06,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.6,
    isNoiseEnabled: true,
    noiseLevel: 0.005,
  },
  crtOnly: {
    label: "CRT Only",
    targetWidth: 1280,
    targetHeight: 800,
    colorLevels: 8,
    ditherStrength: 0.12,
    paletteMode: 0,
    curvature: 0.03,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    monoTint: "gray",
    isAudioFxEnabled: true,
    lofiAmount: 0.2,
    isNoiseEnabled: true,
    noiseLevel: 0.008,
  },
};

export const DEFAULT_SETTINGS = {
  presetKey: "amberCrt",
  crtAspect: 1.0,
  paletteMode: "mono",
  monoTint: "amber",
  targetWidth: 960,
  targetHeight: 600,
  ditherStrength: 0.16,
  curvature: 0.08,
  scanlineStrength: 0.0,
  scanline2Strength: 0.02,
  vignetteStrength: 0.11,
  glowStrength: 0.1,
  phosphorStrength: 0.05,
  colorLevels: 32,
  isAudioFxEnabled: true,
  lofiAmount: 0.85,
  isNoiseEnabled: true,
  noiseLevel: 0.015,
};

export const COLOR_LEVEL_LIMITS = {
  min: 2,
  max: 256,
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
    crtAspect:
      typeof candidate?.crtAspect === "number"
        ? clamp(candidate.crtAspect, 0.9, 1.1)
        : basePresetSettings.crtAspect,
    paletteMode,
    monoTint,
    targetWidth:
      typeof candidate?.targetWidth === "number"
        ? clamp(candidate.targetWidth, 160, 2560)
        : basePresetSettings.targetWidth,
    targetHeight:
      typeof candidate?.targetHeight === "number"
        ? clamp(candidate.targetHeight, 100, 2560)
        : basePresetSettings.targetHeight,
    ditherStrength:
      typeof candidate?.ditherStrength === "number"
        ? clamp(candidate.ditherStrength, 0, 0.5)
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
    vignetteStrength:
      typeof candidate?.vignetteStrength === "number"
        ? clamp(candidate.vignetteStrength, 0, 0.2)
        : basePresetSettings.vignetteStrength,
    glowStrength:
      typeof candidate?.glowStrength === "number"
        ? clamp(candidate.glowStrength, 0, 0.2)
        : basePresetSettings.glowStrength,
    phosphorStrength:
      typeof candidate?.phosphorStrength === "number"
        ? clamp(candidate.phosphorStrength, 0, 0.2)
        : basePresetSettings.phosphorStrength,
    colorLevels: resolvedColorLevels,
    isAudioFxEnabled:
      typeof candidate?.isAudioFxEnabled === "boolean"
        ? candidate.isAudioFxEnabled
        : DEFAULT_SETTINGS.isAudioFxEnabled,
    lofiAmount:
      typeof candidate?.lofiAmount === "number"
        ? clamp(candidate.lofiAmount, 0, 1)
        : DEFAULT_SETTINGS.lofiAmount,
    isNoiseEnabled:
      typeof candidate?.isNoiseEnabled === "boolean"
        ? candidate.isNoiseEnabled
        : basePresetSettings.isNoiseEnabled,
    noiseLevel:
      typeof candidate?.noiseLevel === "number"
        ? clamp(candidate.noiseLevel, 0, 1.5)
        : basePresetSettings.noiseLevel,
  };
}

export function applyPresetToSettings(presetKey) {
  const preset = PRESETS[presetKey] ?? PRESETS[DEFAULT_SETTINGS.presetKey];

  return {
    ...DEFAULT_SETTINGS,
    presetKey,
    crtAspect:
      typeof preset.crtAspect === "number"
        ? preset.crtAspect
        : DEFAULT_SETTINGS.crtAspect,
    targetWidth: preset.targetWidth,
    targetHeight: preset.targetHeight,
    colorLevels: preset.colorLevels,
    ditherStrength: preset.ditherStrength,
    paletteMode: paletteModeFromUniform(preset.paletteMode),
    curvature: preset.curvature,
    scanlineStrength: preset.scanlineStrength,
    scanline2Strength: preset.scanline2Strength,
    vignetteStrength: preset.vignetteStrength,
    glowStrength: preset.glowStrength,
    phosphorStrength: preset.phosphorStrength,
    monoTint: preset.monoTint,
    isAudioFxEnabled:
      typeof preset.isAudioFxEnabled === "boolean"
        ? preset.isAudioFxEnabled
        : DEFAULT_SETTINGS.isAudioFxEnabled,
    lofiAmount:
      typeof preset.lofiAmount === "number"
        ? preset.lofiAmount
        : DEFAULT_SETTINGS.lofiAmount,
    isNoiseEnabled:
      typeof preset.isNoiseEnabled === "boolean"
        ? preset.isNoiseEnabled
        : DEFAULT_SETTINGS.isNoiseEnabled,
    noiseLevel:
      typeof preset.noiseLevel === "number"
        ? preset.noiseLevel
        : DEFAULT_SETTINGS.noiseLevel,
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
  if (paletteMode === "pc98_4096") return 16;
  if (paletteMode === "pc98_512") return 8;
  if (paletteMode === "color32") return 32;
  if (paletteMode === "color64") return 64;

  return DEFAULT_SETTINGS.colorLevels;
}

function resolveColorLevels(paletteMode, requestedLevels) {
  if (paletteMode !== "mono") {
    return getDefaultColorLevelsForPalette(paletteMode);
  }

  return clamp(requestedLevels, COLOR_LEVEL_LIMITS.min, COLOR_LEVEL_LIMITS.max);
}

function paletteModeFromUniform(value) {
  if (value === 1) return "pc98";
  if (value === 2) return "pc98_512";
  if (value === 3) return "pc98_4096";
  if (value === 4) return "color32";
  if (value === 5) return "color64";
  if (value === 6) return "mono";
  return "free";
}
