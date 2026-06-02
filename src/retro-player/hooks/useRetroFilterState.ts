import { useEffect, useState } from "react";
import {
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "../retro/config";
import {
  loadPersistedRetroSettings,
  savePersistedRetroFilterSettings,
} from "./persistedRetroSettings";

const DEFAULT_PRESET = RETRO_PRESETS.pc98_512;

export type RetroFilterInitialState = Partial<{
  targetWidth: number;
  targetHeight: number;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  curvature: number;
  scanlineStrength: number;
  scanline2Strength: number;
  vignetteStrength: number;
  glowStrength: number;
  phosphorStrength: number;
  monoTint: MonoTintMode;
  isFilterEnabled: boolean;
}>;

const resolvePresetKeyFromState = (
  state: Required<RetroFilterInitialState>,
): RetroPresetKey | null => {
  for (const [key, preset] of Object.entries(RETRO_PRESETS)) {
    if (
      preset.width === state.targetWidth &&
      preset.height === state.targetHeight &&
      preset.colors === state.colorLevels &&
      preset.dither === state.ditherStrength &&
      preset.palette === state.paletteMode &&
      preset.curvature === state.curvature &&
      preset.scanline === state.scanlineStrength &&
      preset.scanline2 === state.scanline2Strength &&
      preset.vignette === state.vignetteStrength &&
      preset.glow === state.glowStrength &&
      preset.phosphor === state.phosphorStrength &&
      preset.monoTint === state.monoTint
    ) {
      return key as RetroPresetKey;
    }
  }

  return null;
};

export function useRetroFilterState(initialState: RetroFilterInitialState = {}) {
  const [baseInitialState] = useState<Required<RetroFilterInitialState>>(() => ({
    targetWidth: initialState.targetWidth ?? DEFAULT_PRESET.width,
    targetHeight: initialState.targetHeight ?? DEFAULT_PRESET.height,
    colorLevels: initialState.colorLevels ?? DEFAULT_PRESET.colors,
    ditherStrength: initialState.ditherStrength ?? DEFAULT_PRESET.dither,
    paletteMode: initialState.paletteMode ?? DEFAULT_PRESET.palette,
    curvature: initialState.curvature ?? DEFAULT_PRESET.curvature,
    scanlineStrength: initialState.scanlineStrength ?? DEFAULT_PRESET.scanline,
    scanline2Strength: initialState.scanline2Strength ?? DEFAULT_PRESET.scanline2,
    vignetteStrength: initialState.vignetteStrength ?? DEFAULT_PRESET.vignette,
    glowStrength: initialState.glowStrength ?? DEFAULT_PRESET.glow,
    phosphorStrength: initialState.phosphorStrength ?? DEFAULT_PRESET.phosphor,
    monoTint: initialState.monoTint ?? DEFAULT_PRESET.monoTint,
    isFilterEnabled: initialState.isFilterEnabled ?? true,
  }));

  const [resolvedInitialState] = useState<RetroFilterInitialState>(() => ({
    ...baseInitialState,
    ...loadPersistedRetroSettings()?.filter,
    ...initialState,
  }));

  const [targetWidth, setTargetWidth] = useState<number>(
    resolvedInitialState.targetWidth ?? DEFAULT_PRESET.width,
  );
  const [targetHeight, setTargetHeight] = useState<number>(
    resolvedInitialState.targetHeight ?? DEFAULT_PRESET.height,
  );
  const [colorLevels, setColorLevels] = useState<number>(
    resolvedInitialState.colorLevels ?? DEFAULT_PRESET.colors,
  );
  const [ditherStrength, setDitherStrength] = useState<number>(
    resolvedInitialState.ditherStrength ?? DEFAULT_PRESET.dither,
  );
  const [paletteMode, rawSetPaletteMode] = useState<PaletteMode>(
    resolvedInitialState.paletteMode ?? DEFAULT_PRESET.palette,
  );
  const [curvature, setCurvature] = useState<number>(
    resolvedInitialState.curvature ?? DEFAULT_PRESET.curvature,
  );
  const [scanlineStrength, setScanlineStrength] = useState<number>(
    resolvedInitialState.scanlineStrength ?? DEFAULT_PRESET.scanline,
  );
  const [scanline2Strength, setScanline2Strength] = useState<number>(
    resolvedInitialState.scanline2Strength ?? DEFAULT_PRESET.scanline2,
  );
  const [vignetteStrength, setVignetteStrength] = useState<number>(
    resolvedInitialState.vignetteStrength ?? DEFAULT_PRESET.vignette,
  );
  const [glowStrength, setGlowStrength] = useState<number>(
    resolvedInitialState.glowStrength ?? DEFAULT_PRESET.glow,
  );
  const [phosphorStrength, setPhosphorStrength] = useState<number>(
    resolvedInitialState.phosphorStrength ?? DEFAULT_PRESET.phosphor,
  );
  const [monoTint, setMonoTint] = useState<MonoTintMode>(
    resolvedInitialState.monoTint ?? DEFAULT_PRESET.monoTint,
  );
  const [isFilterEnabled, setIsFilterEnabled] = useState<boolean>(
    resolvedInitialState.isFilterEnabled ?? true,
  );
  const [selectedPreset, setSelectedPreset] = useState<RetroPresetKey | null>(
    resolvePresetKeyFromState({
      targetWidth: resolvedInitialState.targetWidth ?? DEFAULT_PRESET.width,
      targetHeight: resolvedInitialState.targetHeight ?? DEFAULT_PRESET.height,
      colorLevels: resolvedInitialState.colorLevels ?? DEFAULT_PRESET.colors,
      ditherStrength: resolvedInitialState.ditherStrength ?? DEFAULT_PRESET.dither,
      paletteMode: resolvedInitialState.paletteMode ?? DEFAULT_PRESET.palette,
      curvature: resolvedInitialState.curvature ?? DEFAULT_PRESET.curvature,
      scanlineStrength: resolvedInitialState.scanlineStrength ?? DEFAULT_PRESET.scanline,
      scanline2Strength: resolvedInitialState.scanline2Strength ?? DEFAULT_PRESET.scanline2,
      vignetteStrength: resolvedInitialState.vignetteStrength ?? DEFAULT_PRESET.vignette,
      glowStrength: resolvedInitialState.glowStrength ?? DEFAULT_PRESET.glow,
      phosphorStrength: resolvedInitialState.phosphorStrength ?? DEFAULT_PRESET.phosphor,
      monoTint: resolvedInitialState.monoTint ?? DEFAULT_PRESET.monoTint,
      isFilterEnabled: resolvedInitialState.isFilterEnabled ?? true,
    }),
  );

  const setPaletteMode = (nextPalette: PaletteMode) => {
    rawSetPaletteMode(nextPalette);

    if (nextPalette === "pc98") {
      setColorLevels(16);
      return;
    }

    if (nextPalette === "pc98_4096") {
      setColorLevels(16);
      return;
    }

    if (nextPalette === "pc98_512") {
      setColorLevels(8);
      return;
    }

    if (nextPalette === "color32") {
      setColorLevels(32);
      return;
    }

    if (nextPalette === "color64") {
      setColorLevels(64);
    }
  };

  const applyPreset = (preset: RetroPresetKey) => {
    const settings = RETRO_PRESETS[preset];

    setSelectedPreset(preset);
    setTargetWidth(settings.width);
    setTargetHeight(settings.height);
    setColorLevels(settings.colors);
    setDitherStrength(settings.dither);
    setPaletteMode(settings.palette);
    setCurvature(settings.curvature);
    setScanlineStrength(settings.scanline);
    setScanline2Strength(settings.scanline2);
    setVignetteStrength(settings.vignette);
    setGlowStrength(settings.glow);
    setPhosphorStrength(settings.phosphor);
    setMonoTint(settings.monoTint);
  };

  const resetSettings = () => {
    setSelectedPreset(resolvePresetKeyFromState(baseInitialState));
    setTargetWidth(baseInitialState.targetWidth);
    setTargetHeight(baseInitialState.targetHeight);
    setColorLevels(baseInitialState.colorLevels);
    setDitherStrength(baseInitialState.ditherStrength);
    rawSetPaletteMode(baseInitialState.paletteMode);
    setCurvature(baseInitialState.curvature);
    setScanlineStrength(baseInitialState.scanlineStrength);
    setScanline2Strength(baseInitialState.scanline2Strength);
    setVignetteStrength(baseInitialState.vignetteStrength);
    setGlowStrength(baseInitialState.glowStrength);
    setPhosphorStrength(baseInitialState.phosphorStrength);
    setMonoTint(baseInitialState.monoTint);
    setIsFilterEnabled(baseInitialState.isFilterEnabled);
  };

  useEffect(() => {
    savePersistedRetroFilterSettings({
      targetWidth,
      targetHeight,
      colorLevels,
      ditherStrength,
      paletteMode,
      curvature,
      scanlineStrength,
      scanline2Strength,
      vignetteStrength,
      glowStrength,
      phosphorStrength,
      monoTint,
      isFilterEnabled,
    });
  }, [
    colorLevels,
    curvature,
    ditherStrength,
    isFilterEnabled,
    monoTint,
    paletteMode,
    phosphorStrength,
    scanlineStrength,
    scanline2Strength,
    targetHeight,
    targetWidth,
    vignetteStrength,
    glowStrength,
  ]);

  return {
    targetWidth,
    targetHeight,
    colorLevels,
    ditherStrength,
    paletteMode,
    curvature,
    scanlineStrength,
    scanline2Strength,
    vignetteStrength,
    glowStrength,
    phosphorStrength,
    monoTint,
    isFilterEnabled,
    selectedPreset,
    setTargetWidth,
    setTargetHeight,
    setColorLevels,
    setDitherStrength,
    setPaletteMode,
    setCurvature,
    setScanlineStrength,
    setScanline2Strength,
    setVignetteStrength,
    setGlowStrength,
    setPhosphorStrength,
    setMonoTint,
    setIsFilterEnabled,
    applyPreset,
    resetSettings,
  };
}

export type RetroFilterState = ReturnType<typeof useRetroFilterState>;
