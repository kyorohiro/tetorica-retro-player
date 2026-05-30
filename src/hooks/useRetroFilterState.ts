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
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(DEFAULT_PRESET.palette);
  const [scanlineStrength, setScanlineStrength] = useState<number>(DEFAULT_PRESET.scanline);
  const [vignetteStrength, setVignetteStrength] = useState<number>(DEFAULT_PRESET.vignette);
  const [phosphorStrength, setPhosphorStrength] = useState<number>(DEFAULT_PRESET.phosphor);
  const [monoTint, setMonoTint] = useState<MonoTintMode>(DEFAULT_PRESET.monoTint);

  const applyPreset = (preset: RetroPresetKey) => {
    const settings = RETRO_PRESETS[preset];

    setTargetWidth(settings.width);
    setTargetHeight(settings.height);
    setColorLevels(settings.colors);
    setDitherStrength(settings.dither);
    setPaletteMode(settings.palette);
    setScanlineStrength(settings.scanline);
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
    vignetteStrength,
    phosphorStrength,
    monoTint,
    setTargetWidth,
    setTargetHeight,
    setColorLevels,
    setDitherStrength,
    setPaletteMode,
    setScanlineStrength,
    setVignetteStrength,
    setPhosphorStrength,
    setMonoTint,
    applyPreset,
  };
}

export type RetroFilterState = ReturnType<typeof useRetroFilterState>;
