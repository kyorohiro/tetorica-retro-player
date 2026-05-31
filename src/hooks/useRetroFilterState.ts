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
  const [resolvedInitialState] = useState<RetroFilterInitialState>(() => ({
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
  };
}

export type RetroFilterState = ReturnType<typeof useRetroFilterState>;
