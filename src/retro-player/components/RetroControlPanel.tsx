import React from "react";
import type { RetroFilterState } from "../hooks/useRetroFilterState";
import type { PresetFileData } from "../hooks/presetFile";
import type { RetroPresetKey } from "../retro/config";
import type { RetroPlayerLocale } from "../types";

const VideoControls = React.lazy(() =>
  import("./VideoControls").then((m) => ({ default: m.VideoControls })),
);
const RetroFilterPanel = React.lazy(() =>
  import("./RetroFilterPanel").then((m) => ({ default: m.RetroFilterPanel })),
);

// Subset of the player object that RetroControlPanel needs.
// Add new player capabilities here, not in RetroPlayer.
export type RetroControlPlayerSlice = {
  hasPlayableMedia: boolean;
  hasImage: boolean;
  hasVideo: boolean;
  previewError: string;
  sourceDimensions: { width: number; height: number } | null;
  isAudioFxEnabled: boolean;
  isLooping: boolean;
  isMuted: boolean;
  isNoiseEnabled: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  lofiAmount: number;
  radioToneAmount: number;
  bitCrushAmount: number;
  sampleRateReductionAmount: number;
  noiseReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
  wowFlutterAmount: number;
  noiseLevel: number;
  vinylDustAmount: number;
  delayAmount: number;
  reverbAmount: number;
  chorusAmount: number;
  tapeSaturationAmount: number;
  compressorAmount: number;
  fxOutputTrimAmount: number;
  playbackRate: number;
  volume: number;
  setLofiAmount: (v: number) => void;
  setRadioToneAmount: (v: number) => void;
  setBitCrushAmount: (v: number) => void;
  setSampleRateReductionAmount: (v: number) => void;
  setNoiseReductionAmount: (v: number) => void;
  setBassAmount: (v: number) => void;
  setMidAmount: (v: number) => void;
  setTrebleAmount: (v: number) => void;
  setStereoWidthAmount: (v: number) => void;
  setSmallSpeakerRoomAmount: (v: number) => void;
  setWowFlutterAmount: (v: number) => void;
  setNoiseLevel: (v: number) => void;
  setVinylDustAmount: (v: number) => void;
  setDelayAmount: (v: number) => void;
  setReverbAmount: (v: number) => void;
  setChorusAmount: (v: number) => void;
  setTapeSaturationAmount: (v: number) => void;
  setCompressorAmount: (v: number) => void;
  setFxOutputTrimAmount: (v: number) => void;
  changePlaybackRate: (v: number) => void;
  changeVolume: (v: number) => void;
  seekTo: (time: number) => void;
  stepFrame: (dir: -1 | 1) => void;
  toggleAudioFx: () => void;
  toggleLoop: () => void;
  toggleMute: () => void;
  toggleNoise: () => void;
  togglePlayback: () => Promise<void>;
  playVideoWithAudio: () => Promise<void>;
};

export type RetroControlPanelProps = {
  locale: RetroPlayerLocale;
  player: RetroControlPlayerSlice;
  filterState: RetroFilterState;
  controlPanelMode: "playback" | "audio-settings" | "video-settings";
  onControlPanelModeChange: (
    mode: "playback" | "audio-settings" | "video-settings",
  ) => void;
  onApplyPreset: (preset: RetroPresetKey) => void;
  onSetTargetWidth: (w: number) => void;
  onSetTargetHeight: (h: number) => void;
  onSetMatchTargetAspect: (v: boolean) => void;
  onResetSettings: () => void;
  onImportSettings: (data: PresetFileData) => void;
};

const controlsFallback = (
  <div className="flex min-h-24 items-center justify-center text-sm text-[#7a7268]">
    Preparing controls...
  </div>
);

export function RetroControlPanel({
  locale,
  player,
  filterState,
  controlPanelMode,
  onControlPanelModeChange,
  onApplyPreset,
  onSetTargetWidth,
  onSetTargetHeight,
  onSetMatchTargetAspect,
  onResetSettings,
  onImportSettings,
}: RetroControlPanelProps) {
  return (
    <div className="rounded-2xl border border-[#cac0b2] bg-[#eae6df] p-3 text-xs text-[#2c2418]">
      {(player.hasPlayableMedia || player.hasImage) &&
        controlPanelMode !== "video-settings" && (
          <React.Suspense fallback={controlsFallback}>
            <VideoControls
              hasPlayback={player.hasPlayableMedia}
              currentTime={player.currentTime}
              duration={player.duration}
              mode={
                controlPanelMode === "audio-settings" ? "audio-settings" : "playback"
              }
              isAudioFxEnabled={player.isAudioFxEnabled}
              isLooping={player.isLooping}
              isMuted={player.isMuted}
              isNoiseEnabled={player.isNoiseEnabled}
              isPlaying={player.isPlaying}
              hasVideo={player.hasVideo}
              isVideoSettingsOpen={false}
              lofiAmount={player.lofiAmount}
              radioToneAmount={player.radioToneAmount}
              bitCrushAmount={player.bitCrushAmount}
              sampleRateReductionAmount={player.sampleRateReductionAmount}
              noiseReductionAmount={player.noiseReductionAmount}
              bassAmount={player.bassAmount}
              midAmount={player.midAmount}
              trebleAmount={player.trebleAmount}
              stereoWidthAmount={player.stereoWidthAmount}
              smallSpeakerRoomAmount={player.smallSpeakerRoomAmount}
              wowFlutterAmount={player.wowFlutterAmount}
              noiseLevel={player.noiseLevel}
              vinylDustAmount={player.vinylDustAmount}
              delayAmount={player.delayAmount}
              reverbAmount={player.reverbAmount}
              chorusAmount={player.chorusAmount}
              tapeSaturationAmount={player.tapeSaturationAmount}
              compressorAmount={player.compressorAmount}
              fxOutputTrimAmount={player.fxOutputTrimAmount}
              playbackRate={player.playbackRate}
              volume={player.volume}
              onChangeLofiAmount={player.setLofiAmount}
              onChangeRadioToneAmount={player.setRadioToneAmount}
              onChangeBitCrushAmount={player.setBitCrushAmount}
              onChangeSampleRateReductionAmount={player.setSampleRateReductionAmount}
              onChangeNoiseReductionAmount={player.setNoiseReductionAmount}
              onChangeBassAmount={player.setBassAmount}
              onChangeMidAmount={player.setMidAmount}
              onChangeTrebleAmount={player.setTrebleAmount}
              onChangeStereoWidthAmount={player.setStereoWidthAmount}
              onChangeSmallSpeakerRoomAmount={player.setSmallSpeakerRoomAmount}
              onChangeWowFlutterAmount={player.setWowFlutterAmount}
              onChangeNoiseLevel={player.setNoiseLevel}
              onChangeVinylDustAmount={player.setVinylDustAmount}
              onChangeDelayAmount={player.setDelayAmount}
              onChangeReverbAmount={player.setReverbAmount}
              onChangeChorusAmount={player.setChorusAmount}
              onChangeTapeSaturationAmount={player.setTapeSaturationAmount}
              onChangeCompressorAmount={player.setCompressorAmount}
              onChangeFxOutputTrimAmount={player.setFxOutputTrimAmount}
              onChangePlaybackRate={player.changePlaybackRate}
              onChangeVolume={player.changeVolume}
              onRestart={() => {
                player.seekTo(0);
                void player.playVideoWithAudio();
              }}
              onSeek={player.seekTo}
              onStepFrame={player.stepFrame}
              onToggleAudioFx={player.toggleAudioFx}
              onToggleLoop={player.toggleLoop}
              onToggleMute={player.toggleMute}
              onToggleNoise={player.toggleNoise}
              onTogglePlayback={() => { void player.togglePlayback(); }}
              onBackToPlayback={() => { onControlPanelModeChange("playback"); }}
              onResetSettings={onResetSettings}
              onImportSettings={onImportSettings}
              onToggleVideoSettings={() => {
                onControlPanelModeChange("video-settings");
              }}
              onToggleAudioSettings={() => {
                onControlPanelModeChange(
                  controlPanelMode === "audio-settings" ? "playback" : "audio-settings",
                );
              }}
            />
          </React.Suspense>
        )}

      {player.previewError && (
        <p className="mt-3 text-rose-400">{player.previewError}</p>
      )}

      {controlPanelMode === "video-settings" && (
        <div className="mt-4 border-t border-[#cac0b2] pt-4">
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { onControlPanelModeChange("playback"); }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-3 py-2 text-[#12141c] hover:bg-[#e2ddd5]"
            >
              Back to Playback
            </button>
          </div>
          <React.Suspense fallback={controlsFallback}>
            <RetroFilterPanel
              locale={locale}
              colorLevels={filterState.colorLevels}
              curvature={filterState.curvature}
              ditherStrength={filterState.ditherStrength}
              glowStrength={filterState.glowStrength}
              smoothStrength={filterState.smoothStrength}
              toonSteps={filterState.toonSteps}
              edgeBoost={filterState.edgeBoost}
              animeEdgeLow={filterState.animeEdgeLow}
              animeEdgeHigh={filterState.animeEdgeHigh}
              isFilterEnabled={filterState.isFilterEnabled}
              monoTint={filterState.monoTint}
              neonBoost={filterState.neonBoost}
              neonDetail={filterState.neonDetail}
              neonSaturation={filterState.neonSaturation}
              paletteMode={filterState.paletteMode}
              phosphorStrength={filterState.phosphorStrength}
              spotMaskStrength={filterState.spotMaskStrength}
              bulbRadius={filterState.bulbRadius}
              blackFloor={filterState.blackFloor}
              lumaLow={filterState.lumaLow}
              lumaHigh={filterState.lumaHigh}
              lumaKnee={filterState.lumaKnee}
              phosphorDotLightBalance={filterState.phosphorDotLightBalance}
              phosphorDotInternalScale={filterState.phosphorDotInternalScale}
              phosphorDotBrightCore={filterState.phosphorDotBrightCore}
              phosphorDotCellFill={filterState.phosphorDotCellFill}
              phosphorDotFlatDisc={filterState.phosphorDotFlatDisc}
              phosphorDotNeighborBlend={filterState.phosphorDotNeighborBlend}
              closeUpNoiseStrength={filterState.closeUpNoiseStrength}
              scanlineBrightnessFade={filterState.scanlineBrightnessFade}
              scanlineStrength={filterState.scanlineStrength}
              scanline2Strength={filterState.scanline2Strength}
              selectedPreset={filterState.selectedPreset}
              sourceDimensions={player.sourceDimensions}
              targetHeight={filterState.targetHeight}
              targetWidth={filterState.targetWidth}
              matchTargetAspect={filterState.matchTargetAspect}
              vignetteStrength={filterState.vignetteStrength}
              onApplyPreset={onApplyPreset}
              onSetColorLevels={filterState.setColorLevels}
              onSetCurvature={filterState.setCurvature}
              onSetDitherStrength={filterState.setDitherStrength}
              onSetGlowStrength={filterState.setGlowStrength}
              onSetSmoothStrength={filterState.setSmoothStrength}
              onSetToonSteps={filterState.setToonSteps}
              onSetEdgeBoost={filterState.setEdgeBoost}
              onSetAnimeEdgeLow={filterState.setAnimeEdgeLow}
              onSetAnimeEdgeHigh={filterState.setAnimeEdgeHigh}
              onSetIsFilterEnabled={filterState.setIsFilterEnabled}
              onSetMonoTint={filterState.setMonoTint}
              onSetNeonBoost={filterState.setNeonBoost}
              onSetNeonDetail={filterState.setNeonDetail}
              onSetNeonSaturation={filterState.setNeonSaturation}
              onSetPaletteMode={filterState.setPaletteMode}
              onSetPhosphorStrength={filterState.setPhosphorStrength}
              onSetSpotMaskStrength={filterState.setSpotMaskStrength}
              onSetBulbRadius={filterState.setBulbRadius}
              onSetBlackFloor={filterState.setBlackFloor}
              onSetLumaLow={filterState.setLumaLow}
              onSetLumaHigh={filterState.setLumaHigh}
              onSetLumaKnee={filterState.setLumaKnee}
              onSetPhosphorDotLightBalance={filterState.setPhosphorDotLightBalance}
              onSetPhosphorDotInternalScale={filterState.setPhosphorDotInternalScale}
              onSetPhosphorDotBrightCore={filterState.setPhosphorDotBrightCore}
              onSetPhosphorDotCellFill={filterState.setPhosphorDotCellFill}
              onSetPhosphorDotFlatDisc={filterState.setPhosphorDotFlatDisc}
              onSetPhosphorDotNeighborBlend={filterState.setPhosphorDotNeighborBlend}
              onSetCloseUpNoiseStrength={filterState.setCloseUpNoiseStrength}
              onSetScanlineBrightnessFade={filterState.setScanlineBrightnessFade}
              onSetScanlineStrength={filterState.setScanlineStrength}
              onSetScanline2Strength={filterState.setScanline2Strength}
              onSetTargetHeight={onSetTargetHeight}
              onSetTargetWidth={onSetTargetWidth}
              onSetMatchTargetAspect={onSetMatchTargetAspect}
              onSetVignetteStrength={filterState.setVignetteStrength}
            />
          </React.Suspense>
        </div>
      )}
    </div>
  );
}
