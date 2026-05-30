import React, { useState } from "react";
import type { ReactNode } from "react";
import type { RetroFilterState } from "../hooks/useRetroFilterState";
import { RETRO_PRESETS, type PaletteMode, type RetroPresetKey } from "../retro/config";
import { RetroFilterPanel } from "./RetroFilterPanel";

type ShowDialogFn = <T,>(render: (helpers: { resolve: (v: T | null) => void; close: () => void; }) => ReactNode) => Promise<any>;

const RetroPlayerSettingsDialog: React.FC<{
  state: RetroFilterState;
  previewName: string;
  sourceDimensions: { width: number; height: number } | null;
  onSyncTargetAspect: () => void;
  onClose: () => void;
}> = ({ state, previewName, sourceDimensions, onSyncTargetAspect, onClose }) => {
  const [colorLevels, setColorLevels] = useState(state.colorLevels);
  const [ditherStrength, setDitherStrength] = useState(state.ditherStrength);
  const [isFilterEnabled, setIsFilterEnabled] = useState(state.isFilterEnabled);
  const [monoTint, setMonoTint] = useState(state.monoTint);
  const [paletteMode, setPaletteMode] = useState(state.paletteMode);
  const [phosphorStrength, setPhosphorStrength] = useState(state.phosphorStrength);
  const [scanlineStrength, setScanlineStrength] = useState(state.scanlineStrength);
  const [scanline2Strength, setScanline2Strength] = useState(state.scanline2Strength);
  const [targetHeight, setTargetHeight] = useState(state.targetHeight);
  const [targetWidth, setTargetWidth] = useState(state.targetWidth);
  const [vignetteStrength, setVignetteStrength] = useState(state.vignetteStrength);

  const handleApplyPreset = (preset: RetroPresetKey) => {
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
    state.applyPreset(preset);
  };

  const handleSetIsFilterEnabled = (value: boolean) => {
    setIsFilterEnabled(value);
    state.setIsFilterEnabled(value);
  };

  const handleSetColorLevels = (value: number) => {
    setColorLevels(value);
    state.setColorLevels(value);
  };

  const handleSetDitherStrength = (value: number) => {
    setDitherStrength(value);
    state.setDitherStrength(value);
  };

  const handleSetMonoTint = (value: typeof state.monoTint) => {
    setMonoTint(value);
    state.setMonoTint(value);
  };

  const handleSetPaletteMode = (value: PaletteMode) => {
    setPaletteMode(value);
    if (value === "pc98") {
      setColorLevels(16);
    } else if (value === "color32") {
      setColorLevels(32);
    } else if (value === "color64") {
      setColorLevels(64);
    }
    state.setPaletteMode(value);
  };

  const handleSetPhosphorStrength = (value: number) => {
    setPhosphorStrength(value);
    state.setPhosphorStrength(value);
  };

  const handleSetScanlineStrength = (value: number) => {
    setScanlineStrength(value);
    state.setScanlineStrength(value);
  };

  const handleSetScanline2Strength = (value: number) => {
    setScanline2Strength(value);
    state.setScanline2Strength(value);
  };

  const handleSetTargetHeight = (value: number) => {
    setTargetHeight(value);
    state.setTargetHeight(value);
  };

  const handleSetTargetWidth = (value: number) => {
    setTargetWidth(value);
    state.setTargetWidth(value);
  };

  const handleSetVignetteStrength = (value: number) => {
    setVignetteStrength(value);
    state.setVignetteStrength(value);
  };

  return (
    <div className="w-[min(96vw,960px)] max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl bg-slate-900 p-6 shadow-xl border border-slate-700 text-slate-100">
      <h2 className="text-lg font-semibold mb-3">Retro Player Settings</h2>

      <RetroFilterPanel
        colorLevels={colorLevels}
        ditherStrength={ditherStrength}
        isFilterEnabled={isFilterEnabled}
        monoTint={monoTint}
        paletteMode={paletteMode}
        phosphorStrength={phosphorStrength}
        previewName={previewName}
        scanlineStrength={scanlineStrength}
        scanline2Strength={scanline2Strength}
        sourceDimensions={sourceDimensions}
        targetHeight={targetHeight}
        targetWidth={targetWidth}
        vignetteStrength={vignetteStrength}
        onApplyPreset={handleApplyPreset}
        onSetIsFilterEnabled={handleSetIsFilterEnabled}
        onSetColorLevels={handleSetColorLevels}
        onSetDitherStrength={handleSetDitherStrength}
        onSetMonoTint={handleSetMonoTint}
        onSetPaletteMode={handleSetPaletteMode}
        onSetPhosphorStrength={handleSetPhosphorStrength}
        onSetScanlineStrength={handleSetScanlineStrength}
        onSetScanline2Strength={handleSetScanline2Strength}
        onSetTargetHeight={handleSetTargetHeight}
        onSetTargetWidth={handleSetTargetWidth}
        onSetVignetteStrength={handleSetVignetteStrength}
        onSyncTargetAspect={onSyncTargetAspect}
      />

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-lg border border-slate-600 hover:bg-slate-800 text-sm">Close</button>
      </div>
    </div>
  );
};

export async function showRetroPlayerSetting(
  showDialog: ShowDialogFn,
  state: RetroFilterState,
  previewName: string,
  sourceDimensions: { width: number; height: number } | null,
  onSyncTargetAspect: () => void,
) {
  return showDialog<void>(({ resolve, close }) => (
    <RetroPlayerSettingsDialog
      state={state}
      previewName={previewName}
      sourceDimensions={sourceDimensions}
      onSyncTargetAspect={onSyncTargetAspect}
      onClose={() => {
        resolve(undefined);
        close();
      }}
    />
  ));
}

export default RetroPlayerSettingsDialog;
