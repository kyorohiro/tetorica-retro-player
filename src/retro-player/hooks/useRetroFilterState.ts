import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_BEAM_CROSS_SETTINGS,
  RETRO_PRESETS,
  defaultPresetId,
  normalizePhosphorDotShape,
  type MonoTintMode,
  type PaletteMode,
  type PhosphorDotShape,
  type RetroPresetDefinition,
  type RetroPresetKey,
  type TargetSamplingMode,
} from "../retro/config";
import {
  loadPersistedRetroSettings,
  savePersistedRetroFilterSettings,
} from "./persistedRetroSettings";

const DEFAULT_PRESET: RetroPresetDefinition = RETRO_PRESETS[defaultPresetId];

export type RetroFilterInitialState = Partial<{
  targetWidth: number;
  targetHeight: number;
  autoTargetSize: boolean;
  samplingMode: TargetSamplingMode;
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
  horizontalSharpness: number;
  rgbConvergenceOffset: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
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
    (preset.autoTargetSize ?? false) === state.autoTargetSize &&
    (preset.samplingMode ?? "nearest") === state.samplingMode &&
    preset.colors === state.colorLevels &&
    preset.dither === state.ditherStrength &&
    preset.palette === state.paletteMode &&
    preset.curvature === state.curvature &&
    preset.scanline === state.scanlineStrength &&
    preset.scanline2 === state.scanline2Strength &&
    preset.vignette === state.vignetteStrength &&
    preset.glow === state.glowStrength &&
    (preset.horizontalSharpness ?? 1) === state.horizontalSharpness &&
    (preset.rgbConvergenceOffset ?? 0) === state.rgbConvergenceOffset &&
    (preset.smoothStrength ?? 0) === state.smoothStrength &&
    (preset.toonSteps ?? 0) === state.toonSteps &&
    (preset.edgeBoost ?? 0) === state.edgeBoost &&
    (preset.animeEdgeLow ?? 0.08) === state.animeEdgeLow &&
    (preset.animeEdgeHigh ?? 0.55) === state.animeEdgeHigh &&
    preset.phosphor === state.phosphorStrength &&
    preset.spotMask === state.spotMaskStrength &&
    preset.bulbRadius === state.bulbRadius &&
    preset.blackFloor === state.blackFloor &&
    (preset.outputBrightness ?? 1) === state.outputBrightness &&
    (preset.basicContrast ?? 1) === state.basicContrast &&
    (preset.basicSaturation ?? 1) === state.basicSaturation &&
    (preset.phosphorDotLightBalance ?? 1) === state.phosphorDotLightBalance &&
    normalizePhosphorDotShape(preset.phosphorDotShape ?? "circle") === state.phosphorDotShape &&
    (preset.phosphorDotInternalScale ?? 1) === state.phosphorDotInternalScale &&
    (preset.phosphorDotBrightCore ?? false) === state.phosphorDotBrightCore &&
    (preset.phosphorDotCellFill ?? 0) === state.phosphorDotCellFill &&
    (preset.phosphorDotFlatDisc ?? false) === state.phosphorDotFlatDisc &&
    (preset.phosphorDotNeighborBlend ?? false) === state.phosphorDotNeighborBlend &&
    (preset.phosphorDotGrainStrength ?? 0) === state.phosphorDotGrainStrength &&
    (preset.phosphorDotGlowColorStrength ?? 0) === state.phosphorDotGlowColorStrength &&
    (preset.beamDarkCutoff ?? DEFAULT_BEAM_CROSS_SETTINGS.beamDarkCutoff) === state.beamDarkCutoff &&
    (preset.beamHorizontalSpread ?? DEFAULT_BEAM_CROSS_SETTINGS.beamHorizontalSpread) === state.beamHorizontalSpread &&
    (preset.beamStripeStrength ?? DEFAULT_BEAM_CROSS_SETTINGS.beamStripeStrength) === state.beamStripeStrength &&
    (preset.beamWhiteBloom ?? DEFAULT_BEAM_CROSS_SETTINGS.beamWhiteBloom) === state.beamWhiteBloom &&
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
    autoTargetSize: initialState.autoTargetSize ?? (DEFAULT_PRESET.autoTargetSize ?? false),
    samplingMode: initialState.samplingMode ?? (DEFAULT_PRESET.samplingMode ?? "nearest"),
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
    horizontalSharpness: initialState.horizontalSharpness ?? (DEFAULT_PRESET.horizontalSharpness ?? 1),
    rgbConvergenceOffset: initialState.rgbConvergenceOffset ?? (DEFAULT_PRESET.rgbConvergenceOffset ?? 0),
    smoothStrength: initialState.smoothStrength ?? (DEFAULT_PRESET.smoothStrength ?? 0),
    toonSteps: initialState.toonSteps ?? (DEFAULT_PRESET.toonSteps ?? 0),
    edgeBoost: initialState.edgeBoost ?? (DEFAULT_PRESET.edgeBoost ?? 0),
    animeEdgeLow: initialState.animeEdgeLow ?? (DEFAULT_PRESET.animeEdgeLow ?? 0.08),
    animeEdgeHigh: initialState.animeEdgeHigh ?? (DEFAULT_PRESET.animeEdgeHigh ?? 0.55),
    phosphorStrength: initialState.phosphorStrength ?? DEFAULT_PRESET.phosphor,
    spotMaskStrength: initialState.spotMaskStrength ?? DEFAULT_PRESET.spotMask,
    bulbRadius: initialState.bulbRadius ?? DEFAULT_PRESET.bulbRadius,
    blackFloor: initialState.blackFloor ?? DEFAULT_PRESET.blackFloor,
    outputBrightness: initialState.outputBrightness ?? (DEFAULT_PRESET.outputBrightness ?? 1),
    basicContrast: initialState.basicContrast ?? (DEFAULT_PRESET.basicContrast ?? 1),
    basicSaturation: initialState.basicSaturation ?? (DEFAULT_PRESET.basicSaturation ?? 1),
    phosphorDotLightBalance:
      initialState.phosphorDotLightBalance ?? (DEFAULT_PRESET.phosphorDotLightBalance ?? 1),
    phosphorDotShape:
      normalizePhosphorDotShape(
        initialState.phosphorDotShape ?? (DEFAULT_PRESET.phosphorDotShape ?? "circle"),
      ),
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
    phosphorDotGlowColorStrength:
      initialState.phosphorDotGlowColorStrength ?? (DEFAULT_PRESET.phosphorDotGlowColorStrength ?? 0),
    beamDarkCutoff:
      initialState.beamDarkCutoff ?? (DEFAULT_PRESET.beamDarkCutoff ?? DEFAULT_BEAM_CROSS_SETTINGS.beamDarkCutoff),
    beamHorizontalSpread:
      initialState.beamHorizontalSpread ?? (DEFAULT_PRESET.beamHorizontalSpread ?? DEFAULT_BEAM_CROSS_SETTINGS.beamHorizontalSpread),
    beamStripeStrength:
      initialState.beamStripeStrength ?? (DEFAULT_PRESET.beamStripeStrength ?? DEFAULT_BEAM_CROSS_SETTINGS.beamStripeStrength),
    beamWhiteBloom:
      initialState.beamWhiteBloom ?? (DEFAULT_PRESET.beamWhiteBloom ?? DEFAULT_BEAM_CROSS_SETTINGS.beamWhiteBloom),
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

  const setAutoTargetSize = useCallback((autoTargetSize: boolean) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.autoTargetSize === autoTargetSize
        ? current
        : { ...current, autoTargetSize }
    ));
  }, [markPresetAsCustom]);

  const setSamplingMode = useCallback((samplingMode: TargetSamplingMode) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.samplingMode === samplingMode
        ? current
        : { ...current, samplingMode }
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

  const setHorizontalSharpness = (horizontalSharpness: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.horizontalSharpness === horizontalSharpness
        ? current
        : { ...current, horizontalSharpness }
    ));
  };

  const setRgbConvergenceOffset = (rgbConvergenceOffset: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.rgbConvergenceOffset === rgbConvergenceOffset
        ? current
        : { ...current, rgbConvergenceOffset }
    ));
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

  const setOutputBrightness = (outputBrightness: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.outputBrightness === outputBrightness ? current : { ...current, outputBrightness }));
  };

  const setBasicContrast = (basicContrast: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.basicContrast === basicContrast ? current : { ...current, basicContrast }));
  };

  const setBasicSaturation = (basicSaturation: number) => {
    markPresetAsCustom();
    setSettings((current) => (current.basicSaturation === basicSaturation ? current : { ...current, basicSaturation }));
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
      current.phosphorDotShape === phosphorDotShape
        ? current
        : { ...current, phosphorDotShape }
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

  const setPhosphorDotGlowColorStrength = (value: number) => {
    const phosphorDotGlowColorStrength = Math.max(0, value);
    markPresetAsCustom();
    setSettings((current) => (
      current.phosphorDotGlowColorStrength === phosphorDotGlowColorStrength
        ? current
        : { ...current, phosphorDotGlowColorStrength }
    ));
  };

  const setBeamDarkCutoff = (beamDarkCutoff: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.beamDarkCutoff === beamDarkCutoff ? current : { ...current, beamDarkCutoff }
    ));
  };

  const setBeamHorizontalSpread = (beamHorizontalSpread: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.beamHorizontalSpread === beamHorizontalSpread ? current : { ...current, beamHorizontalSpread }
    ));
  };

  const setBeamStripeStrength = (beamStripeStrength: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.beamStripeStrength === beamStripeStrength ? current : { ...current, beamStripeStrength }
    ));
  };

  const setBeamWhiteBloom = (beamWhiteBloom: number) => {
    markPresetAsCustom();
    setSettings((current) => (
      current.beamWhiteBloom === beamWhiteBloom ? current : { ...current, beamWhiteBloom }
    ));
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
      autoTargetSize: presetSettings.autoTargetSize ?? false,
      samplingMode: presetSettings.samplingMode ?? "nearest",
      colorLevels: presetSettings.colors,
      ditherStrength: presetSettings.dither,
      paletteMode: presetSettings.palette,
      curvature: presetSettings.curvature,
      scanlineStrength: presetSettings.scanline,
      scanline2Strength: presetSettings.scanline2,
      vignetteStrength: presetSettings.vignette,
      glowStrength: presetSettings.glow,
      horizontalSharpness: presetSettings.horizontalSharpness ?? 1,
      rgbConvergenceOffset: presetSettings.rgbConvergenceOffset ?? 0,
      smoothStrength: presetSettings.smoothStrength ?? 0,
      toonSteps: presetSettings.toonSteps ?? 0,
      edgeBoost: presetSettings.edgeBoost ?? 0,
      animeEdgeLow: presetSettings.animeEdgeLow ?? 0.08,
      animeEdgeHigh: presetSettings.animeEdgeHigh ?? 0.55,
      phosphorStrength: presetSettings.phosphor,
      spotMaskStrength: presetSettings.spotMask,
      bulbRadius: presetSettings.bulbRadius,
      blackFloor: presetSettings.blackFloor,
      outputBrightness: presetSettings.outputBrightness ?? 1,
      basicContrast: presetSettings.basicContrast ?? 1,
      basicSaturation: presetSettings.basicSaturation ?? 1,
      phosphorDotLightBalance: presetSettings.phosphorDotLightBalance ?? 1,
      phosphorDotShape: normalizePhosphorDotShape(presetSettings.phosphorDotShape ?? "circle"),
      phosphorDotInternalScale: presetSettings.phosphorDotInternalScale ?? 1,
      phosphorDotBrightCore: presetSettings.phosphorDotBrightCore ?? false,
      phosphorDotCellFill: presetSettings.phosphorDotCellFill ?? 0,
      phosphorDotFlatDisc: presetSettings.phosphorDotFlatDisc ?? false,
      phosphorDotNeighborBlend: presetSettings.phosphorDotNeighborBlend ?? false,
      phosphorDotGrainStrength: presetSettings.phosphorDotGrainStrength ?? 0,
      phosphorDotGlowColorStrength: presetSettings.phosphorDotGlowColorStrength ?? 0,
      beamDarkCutoff: presetSettings.beamDarkCutoff ?? DEFAULT_BEAM_CROSS_SETTINGS.beamDarkCutoff,
      beamHorizontalSpread: presetSettings.beamHorizontalSpread ?? DEFAULT_BEAM_CROSS_SETTINGS.beamHorizontalSpread,
      beamStripeStrength: presetSettings.beamStripeStrength ?? DEFAULT_BEAM_CROSS_SETTINGS.beamStripeStrength,
      beamWhiteBloom: presetSettings.beamWhiteBloom ?? DEFAULT_BEAM_CROSS_SETTINGS.beamWhiteBloom,
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
    setAutoTargetSize,
    setSamplingMode,
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
    setHorizontalSharpness,
    setRgbConvergenceOffset,
    setSmoothStrength,
    setToonSteps,
    setEdgeBoost,
    setAnimeEdgeLow,
    setAnimeEdgeHigh,
    setPhosphorStrength,
    setSpotMaskStrength,
    setBulbRadius,
    setBlackFloor,
    setOutputBrightness,
    setBasicContrast,
    setBasicSaturation,
    setPhosphorDotLightBalance,
    setPhosphorDotShape,
    setPhosphorDotInternalScale,
    setPhosphorDotBrightCore,
    setPhosphorDotCellFill,
    setPhosphorDotFlatDisc,
    setPhosphorDotNeighborBlend,
    setPhosphorDotGrainStrength,
    setPhosphorDotGlowColorStrength,
    setBeamDarkCutoff,
    setBeamHorizontalSpread,
    setBeamStripeStrength,
    setBeamWhiteBloom,
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
