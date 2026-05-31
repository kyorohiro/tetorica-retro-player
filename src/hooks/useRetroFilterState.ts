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

const DEFAULT_PRESET = RETRO_PRESETS.pc98;

export type RetroFilterInitialState = Partial<{
  targetWidth: number;
  targetHeight: number;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  scanlineStrength: number;
  scanline2Strength: number;
  vignetteStrength: number;
  phosphorStrength: number;
  monoTint: MonoTintMode;
  isFilterEnabled: boolean;
}>;

export function useRetroFilterState(initialState: RetroFilterInitialState = {}) {
  const [baseInitialState] = useState<Required<RetroFilterInitialState>>(() => ({
    targetWidth: initialState.targetWidth ?? DEFAULT_PRESET.width,
    targetHeight: initialState.targetHeight ?? DEFAULT_PRESET.height,
    colorLevels: initialState.colorLevels ?? DEFAULT_PRESET.colors,
    ditherStrength: initialState.ditherStrength ?? DEFAULT_PRESET.dither,
    paletteMode: initialState.paletteMode ?? DEFAULT_PRESET.palette,
    scanlineStrength: initialState.scanlineStrength ?? DEFAULT_PRESET.scanline,
    scanline2Strength: initialState.scanline2Strength ?? DEFAULT_PRESET.scanline2,
    vignetteStrength: initialState.vignetteStrength ?? DEFAULT_PRESET.vignette,
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
  const [scanlineStrength, setScanlineStrength] = useState<number>(
    resolvedInitialState.scanlineStrength ?? DEFAULT_PRESET.scanline,
  );
  const [scanline2Strength, setScanline2Strength] = useState<number>(
    resolvedInitialState.scanline2Strength ?? DEFAULT_PRESET.scanline2,
  );
  const [vignetteStrength, setVignetteStrength] = useState<number>(
    resolvedInitialState.vignetteStrength ?? DEFAULT_PRESET.vignette,
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

  const setPaletteMode = (nextPalette: PaletteMode) => {
    rawSetPaletteMode(nextPalette);

    if (nextPalette === "pc98") {
      setColorLevels(16);
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

    setTargetWidth(settings.width);
    setTargetHeight(settings.height);
    setColorLevels(settings.colors);
    setDitherStrength(settings.dither);
    setPaletteMode(settings.palette);
    setScanlineStrength(settings.scanline);
    setScanline2Strength(settings.scanline2);
    setVignetteStrength(settings.vignette);
    setPhosphorStrength(settings.phosphor);
    setMonoTint(settings.monoTint);
  };

  const resetSettings = () => {
    setTargetWidth(baseInitialState.targetWidth);
    setTargetHeight(baseInitialState.targetHeight);
    setColorLevels(baseInitialState.colorLevels);
    setDitherStrength(baseInitialState.ditherStrength);
    rawSetPaletteMode(baseInitialState.paletteMode);
    setScanlineStrength(baseInitialState.scanlineStrength);
    setScanline2Strength(baseInitialState.scanline2Strength);
    setVignetteStrength(baseInitialState.vignetteStrength);
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
      scanlineStrength,
      scanline2Strength,
      vignetteStrength,
      phosphorStrength,
      monoTint,
      isFilterEnabled,
    });
  }, [
    colorLevels,
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
  ]);

  return {
    targetWidth,
    targetHeight,
    colorLevels,
    ditherStrength,
    paletteMode,
    scanlineStrength,
    scanline2Strength,
    vignetteStrength,
    phosphorStrength,
    monoTint,
    isFilterEnabled,
    setTargetWidth,
    setTargetHeight,
    setColorLevels,
    setDitherStrength,
    setPaletteMode,
    setScanlineStrength,
    setScanline2Strength,
    setVignetteStrength,
    setPhosphorStrength,
    setMonoTint,
    setIsFilterEnabled,
    applyPreset,
    resetSettings,
  };
}

export type RetroFilterState = ReturnType<typeof useRetroFilterState>;
