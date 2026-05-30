import { useState } from "react";
import {
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "../retro/config";

const DEFAULT_PRESET = RETRO_PRESETS.pc98;

export function useRetroFilterState() {
  const [targetWidth, setTargetWidth] = useState<number>(DEFAULT_PRESET.width);
  const [targetHeight, setTargetHeight] = useState<number>(DEFAULT_PRESET.height);
  const [colorLevels, setColorLevels] = useState<number>(DEFAULT_PRESET.colors);
  const [ditherStrength, setDitherStrength] = useState<number>(DEFAULT_PRESET.dither);
  const [paletteMode, rawSetPaletteMode] = useState<PaletteMode>(DEFAULT_PRESET.palette);
  const [scanlineStrength, setScanlineStrength] = useState<number>(DEFAULT_PRESET.scanline);
  const [scanline2Strength, setScanline2Strength] = useState<number>(DEFAULT_PRESET.scanline2);
  const [vignetteStrength, setVignetteStrength] = useState<number>(DEFAULT_PRESET.vignette);
  const [phosphorStrength, setPhosphorStrength] = useState<number>(DEFAULT_PRESET.phosphor);
  const [monoTint, setMonoTint] = useState<MonoTintMode>(DEFAULT_PRESET.monoTint);
  const [isFilterEnabled, setIsFilterEnabled] = useState<boolean>(true);

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
