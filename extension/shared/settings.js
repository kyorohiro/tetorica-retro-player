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
  },
  amberCrt: {
    label: "Amber CRT",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.16,
    paletteMode: 6,
    curvature: 0.08,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.11,
    glowStrength: 0.1,
    phosphorStrength: 0.05,
    monoTint: "amber",
  },
  monochrome: {
    label: "Mono",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.18,
    paletteMode: 6,
    curvature: 0.05,
    scanlineStrength: 0.1,
    scanline2Strength: 0.0,
    vignetteStrength: 0.08,
    glowStrength: 0.07,
    phosphorStrength: 0.02,
    monoTint: "gray",
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
  },
  pc98_512: {
    label: "PC-98 512-color",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 8,
    ditherStrength: 0.12,
    paletteMode: 2,
    curvature: 0.03,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    monoTint: "gray",
  },
};

export const DEFAULT_SETTINGS = {
  presetKey: "greenTerminal",
  paletteMode: "mono",
  monoTint: "green",
  targetWidth: 640,
  targetHeight: 400,
  ditherStrength: 0.14,
  curvature: 0.07,
  scanlineStrength: 0.16,
  scanline2Strength: 0.0,
  vignetteStrength: 0.1,
  glowStrength: 0.09,
  phosphorStrength: 0.06,
  colorLevels: 16,
  isAudioFxEnabled: true,
  lofiAmount: 0.8,
  isNoiseEnabled: true,
  noiseLevel: 0.02,
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
        : DEFAULT_SETTINGS.isNoiseEnabled,
    noiseLevel:
      typeof candidate?.noiseLevel === "number"
        ? clamp(candidate.noiseLevel, 0, 0.12)
        : DEFAULT_SETTINGS.noiseLevel,
  };
}

export function applyPresetToSettings(presetKey) {
  const preset = PRESETS[presetKey] ?? PRESETS[DEFAULT_SETTINGS.presetKey];

  return {
    ...DEFAULT_SETTINGS,
    presetKey,
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

function resolveColorLevels(paletteMode, requestedLevels) {
  if (paletteMode === "free") return 64;
  if (paletteMode === "pc98") return 16;
  if (paletteMode === "pc98_4096") return 16;
  if (paletteMode === "pc98_512") return 8;
  if (paletteMode === "color32") return 32;
  if (paletteMode === "color64") return 64;

  return clamp(requestedLevels, 2, 64);
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
