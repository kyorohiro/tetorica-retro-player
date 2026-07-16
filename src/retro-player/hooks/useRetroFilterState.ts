import { useCallback, useEffect, useState } from "react";
import {
  RETRO_PRESETS,
  defaultPresetId,
  type MonoTintMode,
  type PaletteMode,
  type PhosphorDotShape,
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
  phosphorDotShape: PhosphorDotShape;
  phosphorDotInternalScale: 1 | 2 | 3;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  phosphorDotGrainStrength: number;
  closeUpNoiseStrength: number;
  signalInstabilityEnabled: boolean;
  signalInstabilityStrength: number;
  signalInstabilityFrequency: number;
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
    (preset.phosphorDotShape ?? "circle") === state.phosphorDotShape &&
    (preset.phosphorDotInternalScale ?? 1) === state.phosphorDotInternalScale &&
    (preset.phosphorDotBrightCore ?? false) === state.phosphorDotBrightCore &&
    (preset.phosphorDotCellFill ?? 0) === state.phosphorDotCellFill &&
    (preset.phosphorDotFlatDisc ?? false) === state.phosphorDotFlatDisc &&
    (preset.phosphorDotNeighborBlend ?? false) === state.phosphorDotNeighborBlend &&
    (preset.phosphorDotGrainStrength ?? 0) === state.phosphorDotGrainStrength &&
    (preset.signalInstabilityEnabled ?? false) === state.signalInstabilityEnabled &&
    (preset.signalInstabilityStrength ?? 0.35) === state.signalInstabilityStrength &&
    (preset.signalInstabilityFrequency ?? 0.3) === state.signalInstabilityFrequency &&
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
    phosphorDotShape:
      initialState.phosphorDotShape ?? (DEFAULT_PRESET.phosphorDotShape ?? "circle"),
    phosphorDotInternalScale:
      initialState.phosphorDotInternalScale ?? (DEFAULT_PRESET.phosphorDotInternalScale ?? 1),
    phosphorDotBrightCore:
      initialState.phosphorDotBrightCore ?? (DEFAULT_PRESET.phosphorDotBrightCore ?? false),
    phosphorDotCellFill:
      initialState.phosphorDotCellFill ?? (DEFAULT_PRESET.phosphorDotCellFill ?? 0),
    phosphorDotFlatDisc:
      initialState.phosphorDotFlatDisc ?? (DEFAULT_PRESET.phosphorDotFlatDisc ?? false),
    phosphorDotNeighborBlend:
      initialState.phosphorDotNeighborBlend ?? (DEFAULT_PRESET.phosphorDotNeighborBlend ?? false),
    phosphorDotGrainStrength:
      initialState.phosphorDotGrainStrength ?? (DEFAULT_PRESET.phosphorDotGrainStrength ?? 0),
    closeUpNoiseStrength: initialState.closeUpNoiseStrength ?? 0,
    signalInstabilityEnabled: initialState.signalInstabilityEnabled ?? false,
    signalInstabilityStrength: initialState.signalInstabilityStrength ?? 0.35,
    signalInstabilityFrequency: initialState.signalInstabilityFrequency ?? 0.3,
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
  const markPresetAsCustom = useCallback(() => {
    setSelectedPreset((current) => (current === null ? current : null));
  }, []);

  const setTargetWidth = useCallback((targetWidth: number) => {
    if (!Number.isFinite(targetWidth) || targetWidth < 1) return;
    markPresetAsCustom();
    setSettings((current) => (
      current.targetWidth === targetWidth
        ? current
        : { ...current, targetWidth }
    ));
  }, [markPresetAsCustom]);

  const setTargetHeight = useCallback((targetHeight: number) => {
    if (!Number.isFinite(targetHeight) || targetHeight < 1) return;
    markPresetAsCustom();
    setSettings((current) => (
      current.targetHeight === targetHeight
        ? current
        : { ...current, targetHeight }
    ));
  }, [markPresetAsCustom]);

  const setMatchTargetAspect = useCallback((matchTargetAspect: boolean) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.matchTargetAspect === matchTargetAspect
        ? current
        : { ...current, matchTargetAspect }
    ));
  }, [markPresetAsCustom]);

  const setColorLevels = (colorLevels: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.colorLevels === colorLevels ? current : { ...current, colorLevels }));
  };

  const setDitherStrength = (ditherStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.ditherStrength === ditherStrength ? current : { ...current, ditherStrength }));
  };

  const setPaletteMode = (paletteMode: PaletteMode) => {
    markPresetAsCustom();
    setSettings((current) => ({
      ...current,
      paletteMode,
      colorLevels: resolveColorLevelsForPalette(paletteMode, current.colorLevels),
    }));
  };

  const setCurvature = (curvature: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.curvature === curvature ? current : { ...current, curvature }));
  };

  const setScanlineStrength = (scanlineStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.scanlineStrength === scanlineStrength ? current : { ...current, scanlineStrength }));
  };

  const setScanline2Strength = (scanline2Strength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.scanline2Strength === scanline2Strength ? current : { ...current, scanline2Strength }));
  };

  const setScanlineBrightnessFade = (scanlineBrightnessFade: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.scanlineBrightnessFade === scanlineBrightnessFade ? current : { ...current, scanlineBrightnessFade }));
  };

  const setVignetteStrength = (vignetteStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.vignetteStrength === vignetteStrength ? current : { ...current, vignetteStrength }));
  };

  const setGlowStrength = (glowStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.glowStrength === glowStrength ? current : { ...current, glowStrength }));
  };

  const setSmoothStrength = (smoothStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.smoothStrength === smoothStrength ? current : { ...current, smoothStrength }));
  };

  const setToonSteps = (toonSteps: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.toonSteps === toonSteps ? current : { ...current, toonSteps }));
  };

  const setEdgeBoost = (edgeBoost: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.edgeBoost === edgeBoost ? current : { ...current, edgeBoost }));
  };

  const setAnimeEdgeLow = (animeEdgeLow: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.animeEdgeLow === animeEdgeLow ? current : { ...current, animeEdgeLow }));
  };

  const setAnimeEdgeHigh = (animeEdgeHigh: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.animeEdgeHigh === animeEdgeHigh ? current : { ...current, animeEdgeHigh }));
  };

  const setPhosphorStrength = (phosphorStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.phosphorStrength === phosphorStrength ? current : { ...current, phosphorStrength }));
  };

  const setSpotMaskStrength = (spotMaskStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.spotMaskStrength === spotMaskStrength ? current : { ...current, spotMaskStrength }));
  };

  const setBulbRadius = (bulbRadius: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.bulbRadius === bulbRadius ? current : { ...current, bulbRadius }));
  };

  const setBlackFloor = (blackFloor: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.blackFloor === blackFloor ? current : { ...current, blackFloor }));
  };

  const setLumaAmount = (lumaAmount: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.lumaAmount === lumaAmount ? current : { ...current, lumaAmount }));
  };

  const setLumaLow = (lumaLow: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.lumaLow === lumaLow ? current : { ...current, lumaLow }));
  };

  const setLumaHigh = (lumaHigh: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.lumaHigh === lumaHigh ? current : { ...current, lumaHigh }));
  };

  const setLumaKnee = (lumaKnee: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.lumaKnee === lumaKnee ? current : { ...current, lumaKnee }));
  };

  const setSaturationAmount = (saturationAmount: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.saturationAmount === saturationAmount ? current : { ...current, saturationAmount }));
  };

  const setSaturationLow = (saturationLow: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.saturationLow === saturationLow ? current : { ...current, saturationLow }));
  };

  const setSaturationHigh = (saturationHigh: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.saturationHigh === saturationHigh ? current : { ...current, saturationHigh }));
  };

  const setSaturationKnee = (saturationKnee: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.saturationKnee === saturationKnee ? current : { ...current, saturationKnee }));
  };

  const setOutputBrightness = (outputBrightness: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.outputBrightness === outputBrightness ? current : { ...current, outputBrightness }));
  };

  const setPhosphorDotLightBalance = (phosphorDotLightBalance: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotLightBalance === phosphorDotLightBalance ? current : { ...current, phosphorDotLightBalance }
    ));
  };

  const setPhosphorDotShape = (phosphorDotShape: PhosphorDotShape) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotShape === phosphorDotShape ? current : { ...current, phosphorDotShape }
    ));
  };

  const setPhosphorDotInternalScale = (phosphorDotInternalScale: 1 | 2 | 3) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotInternalScale === phosphorDotInternalScale ? current : { ...current, phosphorDotInternalScale }
    ));
  };

  const setPhosphorDotBrightCore = (phosphorDotBrightCore: boolean) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotBrightCore === phosphorDotBrightCore ? current : { ...current, phosphorDotBrightCore }
    ));
  };

  const setPhosphorDotCellFill = (phosphorDotCellFill: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotCellFill === phosphorDotCellFill ? current : { ...current, phosphorDotCellFill }
    ));
  };

  const setPhosphorDotFlatDisc = (phosphorDotFlatDisc: boolean) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotFlatDisc === phosphorDotFlatDisc ? current : { ...current, phosphorDotFlatDisc }
    ));
  };

  const setPhosphorDotNeighborBlend = (phosphorDotNeighborBlend: boolean) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotNeighborBlend === phosphorDotNeighborBlend ? current : { ...current, phosphorDotNeighborBlend }
    ));
  };

  const setPhosphorDotGrainStrength = (value: number) => {
    const phosphorDotGrainStrength = Math.max(0, value);
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotGrainStrength === phosphorDotGrainStrength ? current : { ...current, phosphorDotGrainStrength }
    ));
  };

  const setCloseUpNoiseStrength = (closeUpNoiseStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.closeUpNoiseStrength === closeUpNoiseStrength ? current : { ...current, closeUpNoiseStrength }));
  };

  const setSignalInstabilityEnabled = (signalInstabilityEnabled: boolean) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.signalInstabilityEnabled === signalInstabilityEnabled
        ? current
        : { ...current, signalInstabilityEnabled }
    ));
  };

  const setSignalInstabilityStrength = (signalInstabilityStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.signalInstabilityStrength === signalInstabilityStrength
        ? current
        : { ...current, signalInstabilityStrength }
    ));
  };

  const setSignalInstabilityFrequency = (signalInstabilityFrequency: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.signalInstabilityFrequency === signalInstabilityFrequency
        ? current
        : { ...current, signalInstabilityFrequency }
    ));
  };

  const setMonoTint = (monoTint: MonoTintMode) => {
    markPresetAsCustom();
    setSettings((current) => (current.monoTint === monoTint ? current : { ...current, monoTint }));
  };

  const setNeonBoost = (neonBoost: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.neonBoost === neonBoost ? current : { ...current, neonBoost }));
  };

  const setNeonSaturation = (neonSaturation: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.neonSaturation === neonSaturation ? current : { ...current, neonSaturation }));
  };

  const setNeonDetail = (neonDetail: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.neonDetail === neonDetail ? current : { ...current, neonDetail }));
  };

  const setFocusStrength = (focusStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.focusStrength === focusStrength ? current : { ...current, focusStrength }));
  };

  const setFocusWidth = (focusWidth: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.focusWidth === focusWidth ? current : { ...current, focusWidth }));
  };

  const setFocusHeight = (focusHeight: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.focusHeight === focusHeight ? current : { ...current, focusHeight }));
  };

  const setFocusCenter = (focusCenterX: number, focusCenterY: number) => {
    setSettings((current) => (
      current.focusCenterX === focusCenterX && current.focusCenterY === focusCenterY
        ? current
        : { ...current, focusCenterX, focusCenterY }
    ));
  };

  const setFocusTrackCursor = (focusTrackCursor: boolean) => {
    setSettings((current) => {
      const nextFocusCenterX = focusTrackCursor ? current.focusCenterX : 0.5;
      const nextFocusCenterY = focusTrackCursor ? current.focusCenterY : 0.5;
      if (
        current.focusTrackCursor === focusTrackCursor
        && current.focusCenterX === nextFocusCenterX
        && current.focusCenterY === nextFocusCenterY
      ) {
        return current;
      }
      return {
        ...current,
        focusTrackCursor,
        focusCenterX: nextFocusCenterX,
        focusCenterY: nextFocusCenterY,
      };
    });
  };

  const setIsFilterEnabled = (isFilterEnabled: boolean) => {
    setSettings((current) => (current.isFilterEnabled === isFilterEnabled ? current : { ...current, isFilterEnabled }));
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
      phosphorDotShape: presetSettings.phosphorDotShape ?? "circle",
      phosphorDotInternalScale: presetSettings.phosphorDotInternalScale ?? 1,
      phosphorDotBrightCore: presetSettings.phosphorDotBrightCore ?? false,
      phosphorDotCellFill: presetSettings.phosphorDotCellFill ?? 0,
      phosphorDotFlatDisc: presetSettings.phosphorDotFlatDisc ?? false,
      phosphorDotNeighborBlend: presetSettings.phosphorDotNeighborBlend ?? false,
      phosphorDotGrainStrength: presetSettings.phosphorDotGrainStrength ?? 0,
      closeUpNoiseStrength: presetSettings.closeUpNoiseStrength ?? 0,
      signalInstabilityEnabled: presetSettings.signalInstabilityEnabled ?? false,
      signalInstabilityStrength: presetSettings.signalInstabilityStrength ?? 0.35,
      signalInstabilityFrequency: presetSettings.signalInstabilityFrequency ?? 0.3,
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
    }, 220);
    return () => clearTimeout(id);
  }, [settings]);

  useEffect(() => {
    const id = setTimeout(() => {
      const resolvedPreset = resolvePresetKeyFromState(settings);
      setSelectedPreset((current) => (current === resolvedPreset ? current : resolvedPreset));
    }, 120);
    return () => clearTimeout(id);
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
    setPhosphorDotShape,
    setPhosphorDotInternalScale,
    setPhosphorDotBrightCore,
    setPhosphorDotCellFill,
    setPhosphorDotFlatDisc,
    setPhosphorDotNeighborBlend,
    setPhosphorDotGrainStrength,
    setCloseUpNoiseStrength,
    setSignalInstabilityEnabled,
    setSignalInstabilityStrength,
    setSignalInstabilityFrequency,
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
