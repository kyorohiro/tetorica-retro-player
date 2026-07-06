import { useCallback, useEffect, useState } from "react";
import {
  RETRO_PRESETS,
  defaultPresetId,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetDefinition,
  type RetroPresetKey,
} from "../retro/config";
import {
  loadPersistedRetroSettings,
  savePersistedRetroFilterSettings,
} from "./persistedRetroSettings";

const DEFAULT_PRESET: RetroPresetDefinition = RETRO_PRESETS[defaultPresetId];

export type RetroFilterInitialState = Partial<{
  targetWidth: number;
  targetHeight: number;
  matchTargetAspect: boolean;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  curvature: number;
  scanlineStrength: number;
  scanline2Strength: number;
  scanlineBrightnessFade: number;
  vignetteStrength: number;
  glowStrength: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  lumaAmount: number;
  lumaLow: number;
  lumaHigh: number;
  lumaKnee: number;
  saturationAmount: number;
  saturationLow: number;
  saturationHigh: number;
  saturationKnee: number;
  outputBrightness: number;
  phosphorDotLightBalance: number;
  phosphorDotInternalScale: boolean;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  closeUpNoiseStrength: number;
  monoTint: MonoTintMode;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  focusStrength: number;
  focusWidth: number;
  focusHeight: number;
  focusCenterX: number;
  focusCenterY: number;
  focusTrackCursor: boolean;
  isFilterEnabled: boolean;
}>;

type RetroFilterSettings = Required<RetroFilterInitialState>;

const doesPresetMatchState = (
  state: RetroFilterSettings,
  preset: RetroPresetDefinition,
  options?: { ignoreDimensions?: boolean },
) => {
  const ignoreDimensions = options?.ignoreDimensions ?? false;

  return (
    (ignoreDimensions ||
      (
        preset.width === state.targetWidth &&
        preset.height === state.targetHeight
      )) &&
    preset.colors === state.colorLevels &&
    preset.dither === state.ditherStrength &&
    preset.palette === state.paletteMode &&
    preset.curvature === state.curvature &&
    preset.scanline === state.scanlineStrength &&
    preset.scanline2 === state.scanline2Strength &&
    preset.vignette === state.vignetteStrength &&
    preset.glow === state.glowStrength &&
    (preset.smoothStrength ?? 0) === state.smoothStrength &&
    (preset.toonSteps ?? 0) === state.toonSteps &&
    (preset.edgeBoost ?? 0) === state.edgeBoost &&
    (preset.animeEdgeLow ?? 0.08) === state.animeEdgeLow &&
    (preset.animeEdgeHigh ?? 0.55) === state.animeEdgeHigh &&
    preset.phosphor === state.phosphorStrength &&
    preset.spotMask === state.spotMaskStrength &&
    preset.bulbRadius === state.bulbRadius &&
    preset.blackFloor === state.blackFloor &&
    (preset.lumaAmount ?? 1) === state.lumaAmount &&
    (preset.lumaLow ?? 0) === state.lumaLow &&
    (preset.lumaHigh ?? 1) === state.lumaHigh &&
    (preset.lumaKnee ?? 0.2) === state.lumaKnee &&
    (preset.saturationAmount ?? 1) === state.saturationAmount &&
    (preset.saturationLow ?? 0) === state.saturationLow &&
    (preset.saturationHigh ?? 1) === state.saturationHigh &&
    (preset.saturationKnee ?? 0.2) === state.saturationKnee &&
    (preset.outputBrightness ?? 1) === state.outputBrightness &&
    (preset.phosphorDotLightBalance ?? 1) === state.phosphorDotLightBalance &&
    (preset.phosphorDotInternalScale ?? false) === state.phosphorDotInternalScale &&
    (preset.phosphorDotBrightCore ?? false) === state.phosphorDotBrightCore &&
    (preset.phosphorDotCellFill ?? 0) === state.phosphorDotCellFill &&
    (preset.phosphorDotFlatDisc ?? false) === state.phosphorDotFlatDisc &&
    (preset.phosphorDotNeighborBlend ?? false) === state.phosphorDotNeighborBlend &&
    (preset.focusStrength ?? 0) === state.focusStrength &&
    (preset.focusWidth ?? 0.24) === state.focusWidth &&
    (preset.focusHeight ?? 0.16) === state.focusHeight &&
    preset.monoTint === state.monoTint &&
    preset.neonBoost === state.neonBoost &&
    preset.neonSaturation === state.neonSaturation &&
    preset.neonDetail === state.neonDetail
  );
};

const resolvePresetKeyFromState = (
  state: RetroFilterSettings,
): RetroPresetKey | null => {
  for (const [key, preset] of Object.entries(RETRO_PRESETS) as [
    RetroPresetKey,
    RetroPresetDefinition,
  ][]) {
    if (doesPresetMatchState(state, preset)) {
      return key as RetroPresetKey;
    }
  }

  if (!state.matchTargetAspect) {
    return null;
  }

  for (const [key, preset] of Object.entries(RETRO_PRESETS) as [
    RetroPresetKey,
    RetroPresetDefinition,
  ][]) {
    if (doesPresetMatchState(state, preset, { ignoreDimensions: true })) {
      return key as RetroPresetKey;
    }
  }

  return null;
};

const resolveColorLevelsForPalette = (
  paletteMode: PaletteMode,
  fallback: number,
) => {
  if (paletteMode === "pc98") return 16;
  if (paletteMode === "pc98_tile") return 16;
  if (paletteMode === "pc98_4096") return 16;
  if (paletteMode === "pc98_512") return 8;
  if (paletteMode === "pc98_512_sat") return 8;
  if (paletteMode === "color32") return 32;
  if (paletteMode === "color64") return 64;
  if (paletteMode === "anime") return 16;
  return fallback;
};

export function useRetroFilterState(initialState: RetroFilterInitialState = {}) {
  const [baseInitialState] = useState<RetroFilterSettings>(() => ({
    targetWidth: initialState.targetWidth ?? DEFAULT_PRESET.width,
    targetHeight: initialState.targetHeight ?? DEFAULT_PRESET.height,
    matchTargetAspect: initialState.matchTargetAspect ?? true,
    colorLevels: initialState.colorLevels ?? DEFAULT_PRESET.colors,
    ditherStrength: initialState.ditherStrength ?? DEFAULT_PRESET.dither,
    paletteMode: initialState.paletteMode ?? DEFAULT_PRESET.palette,
    curvature: initialState.curvature ?? DEFAULT_PRESET.curvature,
    scanlineStrength: initialState.scanlineStrength ?? DEFAULT_PRESET.scanline,
    scanline2Strength: initialState.scanline2Strength ?? DEFAULT_PRESET.scanline2,
    scanlineBrightnessFade: initialState.scanlineBrightnessFade ?? 0.6,
    vignetteStrength: initialState.vignetteStrength ?? DEFAULT_PRESET.vignette,
    glowStrength: initialState.glowStrength ?? DEFAULT_PRESET.glow,
    smoothStrength: initialState.smoothStrength ?? (DEFAULT_PRESET.smoothStrength ?? 0),
    toonSteps: initialState.toonSteps ?? (DEFAULT_PRESET.toonSteps ?? 0),
    edgeBoost: initialState.edgeBoost ?? (DEFAULT_PRESET.edgeBoost ?? 0),
    animeEdgeLow: initialState.animeEdgeLow ?? (DEFAULT_PRESET.animeEdgeLow ?? 0.08),
    animeEdgeHigh: initialState.animeEdgeHigh ?? (DEFAULT_PRESET.animeEdgeHigh ?? 0.55),
    phosphorStrength: initialState.phosphorStrength ?? DEFAULT_PRESET.phosphor,
    spotMaskStrength: initialState.spotMaskStrength ?? DEFAULT_PRESET.spotMask,
    bulbRadius: initialState.bulbRadius ?? DEFAULT_PRESET.bulbRadius,
    blackFloor: initialState.blackFloor ?? DEFAULT_PRESET.blackFloor,
    lumaAmount: initialState.lumaAmount ?? (DEFAULT_PRESET.lumaAmount ?? 1),
    lumaLow: initialState.lumaLow ?? (DEFAULT_PRESET.lumaLow ?? 0),
    lumaHigh: initialState.lumaHigh ?? (DEFAULT_PRESET.lumaHigh ?? 1),
    lumaKnee: initialState.lumaKnee ?? (DEFAULT_PRESET.lumaKnee ?? 0.2),
    saturationAmount: initialState.saturationAmount ?? (DEFAULT_PRESET.saturationAmount ?? 1),
    saturationLow: initialState.saturationLow ?? (DEFAULT_PRESET.saturationLow ?? 0),
    saturationHigh: initialState.saturationHigh ?? (DEFAULT_PRESET.saturationHigh ?? 1),
    saturationKnee: initialState.saturationKnee ?? (DEFAULT_PRESET.saturationKnee ?? 0.2),
    outputBrightness: initialState.outputBrightness ?? (DEFAULT_PRESET.outputBrightness ?? 1),
    phosphorDotLightBalance:
      initialState.phosphorDotLightBalance ?? (DEFAULT_PRESET.phosphorDotLightBalance ?? 1),
    phosphorDotInternalScale:
      initialState.phosphorDotInternalScale ?? (DEFAULT_PRESET.phosphorDotInternalScale ?? false),
    phosphorDotBrightCore:
      initialState.phosphorDotBrightCore ?? (DEFAULT_PRESET.phosphorDotBrightCore ?? false),
    phosphorDotCellFill:
      initialState.phosphorDotCellFill ?? (DEFAULT_PRESET.phosphorDotCellFill ?? 0),
    phosphorDotFlatDisc:
      initialState.phosphorDotFlatDisc ?? (DEFAULT_PRESET.phosphorDotFlatDisc ?? false),
    phosphorDotNeighborBlend:
      initialState.phosphorDotNeighborBlend ?? (DEFAULT_PRESET.phosphorDotNeighborBlend ?? false),
    closeUpNoiseStrength: initialState.closeUpNoiseStrength ?? 0,
    monoTint: initialState.monoTint ?? DEFAULT_PRESET.monoTint,
    neonBoost: initialState.neonBoost ?? DEFAULT_PRESET.neonBoost,
    neonSaturation: initialState.neonSaturation ?? DEFAULT_PRESET.neonSaturation,
    neonDetail: initialState.neonDetail ?? DEFAULT_PRESET.neonDetail,
    focusStrength: initialState.focusStrength ?? 0,
    focusWidth: initialState.focusWidth ?? (DEFAULT_PRESET.focusWidth ?? 0.24),
    focusHeight: initialState.focusHeight ?? (DEFAULT_PRESET.focusHeight ?? 0.16),
    focusCenterX: initialState.focusCenterX ?? 0.5,
    focusCenterY: initialState.focusCenterY ?? 0.5,
    focusTrackCursor: initialState.focusTrackCursor ?? false,
    isFilterEnabled: initialState.isFilterEnabled ?? true,
  }));

  const [resolvedInitialState] = useState<RetroFilterSettings>(() => ({
    ...baseInitialState,
    ...loadPersistedRetroSettings()?.filter,
    ...initialState,
  }));

  const [settings, setSettings] = useState<RetroFilterSettings>(resolvedInitialState);
  const [selectedPreset, setSelectedPreset] = useState<RetroPresetKey | null>(
    resolvePresetKeyFromState(resolvedInitialState),
  );

  const setTargetWidth = useCallback((targetWidth: number) => {
    if (!Number.isFinite(targetWidth) || targetWidth < 1) return;
    setSelectedPreset(null);
    setSettings((current) => (
      current.targetWidth === targetWidth
        ? current
        : { ...current, targetWidth }
    ));
  }, []);

  const setTargetHeight = useCallback((targetHeight: number) => {
    if (!Number.isFinite(targetHeight) || targetHeight < 1) return;
    setSelectedPreset(null);
    setSettings((current) => (
      current.targetHeight === targetHeight
        ? current
        : { ...current, targetHeight }
    ));
  }, []);

  const setMatchTargetAspect = useCallback((matchTargetAspect: boolean) => {
    setSelectedPreset(null);
    setSettings((current) => (
      current.matchTargetAspect === matchTargetAspect
        ? current
        : { ...current, matchTargetAspect }
    ));
  }, []);

  const setColorLevels = (colorLevels: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, colorLevels }));
  };

  const setDitherStrength = (ditherStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, ditherStrength }));
  };

  const setPaletteMode = (paletteMode: PaletteMode) => {
    setSelectedPreset(null);
    setSettings((current) => ({
      ...current,
      paletteMode,
      colorLevels: resolveColorLevelsForPalette(paletteMode, current.colorLevels),
    }));
  };

  const setCurvature = (curvature: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, curvature }));
  };

  const setScanlineStrength = (scanlineStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, scanlineStrength }));
  };

  const setScanline2Strength = (scanline2Strength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, scanline2Strength }));
  };

  const setScanlineBrightnessFade = (scanlineBrightnessFade: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, scanlineBrightnessFade }));
  };

  const setVignetteStrength = (vignetteStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, vignetteStrength }));
  };

  const setGlowStrength = (glowStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, glowStrength }));
  };

  const setSmoothStrength = (smoothStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, smoothStrength }));
  };

  const setToonSteps = (toonSteps: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, toonSteps }));
  };

  const setEdgeBoost = (edgeBoost: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, edgeBoost }));
  };

  const setAnimeEdgeLow = (animeEdgeLow: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, animeEdgeLow }));
  };

  const setAnimeEdgeHigh = (animeEdgeHigh: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, animeEdgeHigh }));
  };

  const setPhosphorStrength = (phosphorStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorStrength }));
  };

  const setSpotMaskStrength = (spotMaskStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, spotMaskStrength }));
  };

  const setBulbRadius = (bulbRadius: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, bulbRadius }));
  };

  const setBlackFloor = (blackFloor: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, blackFloor }));
  };

  const setLumaAmount = (lumaAmount: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, lumaAmount }));
  };

  const setLumaLow = (lumaLow: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, lumaLow }));
  };

  const setLumaHigh = (lumaHigh: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, lumaHigh }));
  };

  const setLumaKnee = (lumaKnee: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, lumaKnee }));
  };

  const setSaturationAmount = (saturationAmount: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, saturationAmount }));
  };

  const setSaturationLow = (saturationLow: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, saturationLow }));
  };

  const setSaturationHigh = (saturationHigh: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, saturationHigh }));
  };

  const setSaturationKnee = (saturationKnee: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, saturationKnee }));
  };

  const setOutputBrightness = (outputBrightness: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, outputBrightness }));
  };

  const setPhosphorDotLightBalance = (phosphorDotLightBalance: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorDotLightBalance }));
  };

  const setPhosphorDotInternalScale = (phosphorDotInternalScale: boolean) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorDotInternalScale }));
  };

  const setPhosphorDotBrightCore = (phosphorDotBrightCore: boolean) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorDotBrightCore }));
  };

  const setPhosphorDotCellFill = (phosphorDotCellFill: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorDotCellFill }));
  };

  const setPhosphorDotFlatDisc = (phosphorDotFlatDisc: boolean) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorDotFlatDisc }));
  };

  const setPhosphorDotNeighborBlend = (phosphorDotNeighborBlend: boolean) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, phosphorDotNeighborBlend }));
  };

  const setCloseUpNoiseStrength = (closeUpNoiseStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, closeUpNoiseStrength }));
  };

  const setMonoTint = (monoTint: MonoTintMode) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, monoTint }));
  };

  const setNeonBoost = (neonBoost: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, neonBoost }));
  };

  const setNeonSaturation = (neonSaturation: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, neonSaturation }));
  };

  const setNeonDetail = (neonDetail: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, neonDetail }));
  };

  const setFocusStrength = (focusStrength: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, focusStrength }));
  };

  const setFocusWidth = (focusWidth: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, focusWidth }));
  };

  const setFocusHeight = (focusHeight: number) => {
    setSelectedPreset(null);
    setSettings((current) => ({ ...current, focusHeight }));
  };

  const setFocusCenter = (focusCenterX: number, focusCenterY: number) => {
    setSettings((current) => (
      current.focusCenterX === focusCenterX && current.focusCenterY === focusCenterY
        ? current
        : { ...current, focusCenterX, focusCenterY }
    ));
  };

  const setFocusTrackCursor = (focusTrackCursor: boolean) => {
    setSettings((current) => ({
      ...current,
      focusTrackCursor,
      ...(focusTrackCursor ? {} : { focusCenterX: 0.5, focusCenterY: 0.5 }),
    }));
  };

  const setIsFilterEnabled = (isFilterEnabled: boolean) => {
    setSettings((current) => ({ ...current, isFilterEnabled }));
  };

  const applyPreset = useCallback((preset: RetroPresetKey) => {
    const presetSettings: RetroPresetDefinition = RETRO_PRESETS[preset];

    setSelectedPreset(preset);
    setSettings((current) => ({
      ...current,
      targetWidth: presetSettings.width,
      targetHeight: presetSettings.height,
      colorLevels: presetSettings.colors,
      ditherStrength: presetSettings.dither,
      paletteMode: presetSettings.palette,
      curvature: presetSettings.curvature,
      scanlineStrength: presetSettings.scanline,
      scanline2Strength: presetSettings.scanline2,
      vignetteStrength: presetSettings.vignette,
      glowStrength: presetSettings.glow,
      smoothStrength: presetSettings.smoothStrength ?? 0,
      toonSteps: presetSettings.toonSteps ?? 0,
      edgeBoost: presetSettings.edgeBoost ?? 0,
      animeEdgeLow: presetSettings.animeEdgeLow ?? 0.08,
      animeEdgeHigh: presetSettings.animeEdgeHigh ?? 0.55,
      phosphorStrength: presetSettings.phosphor,
      spotMaskStrength: presetSettings.spotMask,
      bulbRadius: presetSettings.bulbRadius,
      blackFloor: presetSettings.blackFloor,
      lumaAmount: presetSettings.lumaAmount ?? 1,
      lumaLow: presetSettings.lumaLow ?? 0,
      lumaHigh: presetSettings.lumaHigh ?? 1,
      lumaKnee: presetSettings.lumaKnee ?? 0.2,
      saturationAmount: presetSettings.saturationAmount ?? 1,
      saturationLow: presetSettings.saturationLow ?? 0,
      saturationHigh: presetSettings.saturationHigh ?? 1,
      saturationKnee: presetSettings.saturationKnee ?? 0.2,
      outputBrightness: presetSettings.outputBrightness ?? 1,
      phosphorDotLightBalance: presetSettings.phosphorDotLightBalance ?? 1,
      phosphorDotInternalScale: presetSettings.phosphorDotInternalScale ?? false,
      phosphorDotBrightCore: presetSettings.phosphorDotBrightCore ?? false,
      phosphorDotCellFill: presetSettings.phosphorDotCellFill ?? 0,
      phosphorDotFlatDisc: presetSettings.phosphorDotFlatDisc ?? false,
      phosphorDotNeighborBlend: presetSettings.phosphorDotNeighborBlend ?? false,
      closeUpNoiseStrength: presetSettings.closeUpNoiseStrength ?? 0,
      scanlineBrightnessFade: presetSettings.scanlineBrightnessFade ?? 0.6,
      monoTint: presetSettings.monoTint,
      neonBoost: presetSettings.neonBoost,
      neonSaturation: presetSettings.neonSaturation,
      neonDetail: presetSettings.neonDetail,
      focusStrength: presetSettings.focusStrength ?? 0,
      focusWidth: presetSettings.focusWidth ?? 0.24,
      focusHeight: presetSettings.focusHeight ?? 0.16,
      focusCenterX: 0.5,
      focusCenterY: 0.5,
      focusTrackCursor: false,
      isFilterEnabled: true,
    }));
  }, []);

  const applyAllFilterSettings = (s: RetroFilterSettings) => {
    setSelectedPreset(resolvePresetKeyFromState(s));
    setSettings(s);
  };

  const resetSettings = () => {
    setSelectedPreset(resolvePresetKeyFromState(baseInitialState));
    setSettings(baseInitialState);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      savePersistedRetroFilterSettings(settings);
    }, 300);
    return () => clearTimeout(id);
  }, [settings]);

  useEffect(() => {
    const resolvedPreset = resolvePresetKeyFromState(settings);
    setSelectedPreset((current) => (current === resolvedPreset ? current : resolvedPreset));
  }, [settings]);

  return {
    ...settings,
    selectedPreset,
    setTargetWidth,
    setTargetHeight,
    setMatchTargetAspect,
    setColorLevels,
    setDitherStrength,
    setPaletteMode,
    setCurvature,
    setScanlineStrength,
    setScanline2Strength,
    setScanlineBrightnessFade,
    setVignetteStrength,
    setGlowStrength,
    setSmoothStrength,
    setToonSteps,
    setEdgeBoost,
    setAnimeEdgeLow,
    setAnimeEdgeHigh,
    setPhosphorStrength,
    setSpotMaskStrength,
    setBulbRadius,
    setBlackFloor,
    setLumaAmount,
    setLumaLow,
    setLumaHigh,
    setLumaKnee,
    setSaturationAmount,
    setSaturationLow,
    setSaturationHigh,
    setSaturationKnee,
    setOutputBrightness,
    setPhosphorDotLightBalance,
    setPhosphorDotInternalScale,
    setPhosphorDotBrightCore,
    setPhosphorDotCellFill,
    setPhosphorDotFlatDisc,
    setPhosphorDotNeighborBlend,
    setCloseUpNoiseStrength,
    setMonoTint,
    setNeonBoost,
    setNeonSaturation,
    setNeonDetail,
    setFocusStrength,
    setFocusWidth,
    setFocusHeight,
    setFocusCenter,
    setFocusTrackCursor,
    setIsFilterEnabled,
    applyAllFilterSettings,
    applyPreset,
    resetSettings,
  };
}

export type RetroFilterState = ReturnType<typeof useRetroFilterState>;
