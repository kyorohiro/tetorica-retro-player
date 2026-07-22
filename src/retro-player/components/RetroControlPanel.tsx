import React from "react";
import { FolderOpen, Mic2, RotateCcw, Save, SlidersHorizontal } from "lucide-react";
import type { RetroFilterState } from "../hooks/useRetroFilterState";
import type { PresetFileData } from "../hooks/presetFile";
import type { RetroPreviewStatus } from "../hooks/usePixiVideoPlayer";
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
  isLoading: boolean;
  hasPlayableMedia: boolean;
  hasImage: boolean;
  hasVideo: boolean;
  previewError: string;
  previewStatus: RetroPreviewStatus;
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
  bitCrushNoiseAmount: number;
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
  noiseWarmthAmount: number;
  noiseAirAmount: number;
  noisePresenceAmount: number;
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
  setBitCrushNoiseAmount: (v: number) => void;
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
  setNoiseWarmthAmount: (v: number) => void;
  setNoiseAirAmount: (v: number) => void;
  setNoisePresenceAmount: (v: number) => void;
  setDelayAmount: (v: number) => void;
  setReverbAmount: (v: number) => void;
  setChorusAmount: (v: number) => void;
  setTapeSaturationAmount: (v: number) => void;
  setCompressorAmount: (v: number) => void;
  setFxOutputTrimAmount: (v: number) => void;
  inputTrimAmount: number;
  setInputTrimAmount: (v: number) => void;
  changePlaybackRate: (v: number) => void;
  changeVolume: (v: number) => void;
  seekTo: (time: number) => void;
  stepFrame: (dir: -1 | 1) => void;
  isVideoFxEnabled: boolean;
  toggleAudioFx: () => void;
  toggleVideoFx: () => void;
  toggleLoop: () => void;
  toggleMute: () => void;
  toggleNoise: () => void;
  togglePlayback: () => Promise<void>;
  playVideoWithAudio: () => Promise<void>;
  analyserRef?: React.RefObject<AnalyserNode | null>;
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
  onPrevTrack?: () => void;
  onNextTrack?: () => void;
  onForceReplay?: () => void;
  loopMode?: "one" | "autoplay" | "all" | "off";
  onCycleLoopMode?: () => void;
  onLoopLongPress?: () => void;
  showVideoSpectrum?: boolean;
  onToggleVideoSpectrum?: () => void;
  showClockOverlay?: boolean;
  onToggleClockOverlay?: () => void;
  isNativePlaybackMode?: boolean;
  nativePlaybackNeedsReload?: boolean;
  onToggleNativePlaybackMode?: () => void;
  isAudioFxUnavailable?: boolean;
};

const controlsFallback = (
  <div className="flex gap-2">
    <div className="grid flex-1 grid-cols-3 gap-2">
      <div className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#111014]/30 bg-[#111014] px-2 py-2 text-xs text-white">
        <SlidersHorizontal size={16} />
        Video
      </div>
      <div className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#111014]/30 bg-[#111014] px-2 py-2 text-xs text-white">
        <Mic2 size={16} />
        Audio
      </div>
      <div className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-2 py-2 text-xs text-[#12141c]">
        <RotateCcw size={15} />
        Reset
      </div>
    </div>
    <div className="inline-flex min-h-10 w-8 items-center justify-center rounded-lg border border-[#bcb4a6] bg-[#e6e2db] text-[#7a7268]">
      <Save size={13} />
    </div>
    <div className="inline-flex min-h-10 w-8 items-center justify-center rounded-lg border border-[#bcb4a6] bg-[#e6e2db] text-[#7a7268]">
      <FolderOpen size={13} />
    </div>
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
  onPrevTrack,
  onNextTrack,
  onForceReplay,
  loopMode,
  onCycleLoopMode,
  onLoopLongPress,
  showVideoSpectrum,
  onToggleVideoSpectrum,
  showClockOverlay,
  onToggleClockOverlay,
  isNativePlaybackMode,
  nativePlaybackNeedsReload,
  onToggleNativePlaybackMode,
  isAudioFxUnavailable,
}: RetroControlPanelProps) {
  const canRetryPlayback = player.previewStatus?.kind === "retryable";
  const stableHasPlayableRef = React.useRef(player.hasPlayableMedia || canRetryPlayback);
  if (!player.isLoading) {
    stableHasPlayableRef.current = player.hasPlayableMedia || canRetryPlayback;
  }
  const hasPlaybackControls = stableHasPlayableRef.current || canRetryPlayback || !!onNextTrack;
  const hasVideoControls = player.hasVideo || canRetryPlayback;
  const effectiveIsPlaying =
    player.isPlaying && player.previewStatus?.kind !== "unsupported";
  const statusBanner =
    player.previewStatus?.kind === "retryable"
      ? {
          className: "mb-3 rounded-lg bg-amber-500/10 px-3 py-2 text-amber-700",
          message: "Still preparing this video. Press Play to retry when it stops.",
        }
      : player.previewStatus?.kind === "unsupported"
        ? {
            className: "mb-3 rounded-lg bg-rose-500/10 px-3 py-2 text-rose-600",
            message: player.previewStatus.message,
          }
        : null;

  return (
    <div className="rounded-2xl border border-[#cac0b2] bg-[#eae6df] p-3 text-xs text-[#2c2418]">
      {statusBanner && (
        <p className={statusBanner.className}>{statusBanner.message}</p>
      )}
      {controlPanelMode !== "video-settings" && (
          <React.Suspense fallback={controlsFallback}>
            <VideoControls
              locale={locale}
              hasPlayback={hasPlaybackControls}
              currentTime={player.currentTime}
              duration={player.duration}
              mode={
                controlPanelMode === "audio-settings" ? "audio-settings" : "playback"
              }
              isAudioFxEnabled={player.isAudioFxEnabled}
              isVideoFxEnabled={filterState.isFilterEnabled}
              isLooping={player.isLooping}
              isMuted={player.isMuted}
              isNoiseEnabled={player.isNoiseEnabled}
              isPlaying={effectiveIsPlaying}
              hasImage={player.hasImage}
              hasVideo={hasVideoControls}
              isVideoSettingsOpen={false}
              lofiAmount={player.lofiAmount}
              radioToneAmount={player.radioToneAmount}
              bitCrushAmount={player.bitCrushAmount}
              bitCrushNoiseAmount={player.bitCrushNoiseAmount}
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
              noiseWarmthAmount={player.noiseWarmthAmount}
              noiseAirAmount={player.noiseAirAmount}
              noisePresenceAmount={player.noisePresenceAmount}
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
              onChangeBitCrushNoiseAmount={player.setBitCrushNoiseAmount}
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
              onChangeNoiseWarmthAmount={player.setNoiseWarmthAmount}
              onChangeNoiseAirAmount={player.setNoiseAirAmount}
              onChangeNoisePresenceAmount={player.setNoisePresenceAmount}
              onChangeDelayAmount={player.setDelayAmount}
              onChangeReverbAmount={player.setReverbAmount}
              onChangeChorusAmount={player.setChorusAmount}
              onChangeTapeSaturationAmount={player.setTapeSaturationAmount}
              onChangeCompressorAmount={player.setCompressorAmount}
              onChangeFxOutputTrimAmount={player.setFxOutputTrimAmount}
              inputTrimAmount={player.inputTrimAmount}
              onChangeInputTrimAmount={player.setInputTrimAmount}
              onChangePlaybackRate={player.changePlaybackRate}
              onChangeVolume={player.changeVolume}
              onRestart={() => {
                player.seekTo(0);
                void player.playVideoWithAudio();
              }}
              onSeek={player.seekTo}
              onStepFrame={player.stepFrame}
              onToggleAudioFx={player.toggleAudioFx}
              onToggleVideoFx={() => filterState.setIsFilterEnabled(!filterState.isFilterEnabled)}
              onToggleLoop={onCycleLoopMode ?? player.toggleLoop}
              onToggleMute={player.toggleMute}
              onToggleNoise={player.toggleNoise}
              onTogglePlayback={() => { void player.togglePlayback(); }}
              onTogglePlaybackLongPress={onForceReplay}
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
              onPrevTrack={onPrevTrack}
              onNextTrack={onNextTrack}
              loopMode={loopMode}
              onCycleLoopMode={onCycleLoopMode}
              onLoopLongPress={onLoopLongPress}
              showVideoSpectrum={showVideoSpectrum}
              onToggleVideoSpectrum={onToggleVideoSpectrum}
              showClockOverlay={showClockOverlay}
              onToggleClockOverlay={onToggleClockOverlay}
              analyserRef={player.analyserRef}
              isNativePlaybackMode={isNativePlaybackMode}
              nativePlaybackNeedsReload={nativePlaybackNeedsReload}
              onToggleNativePlaybackMode={onToggleNativePlaybackMode}
              isAudioFxUnavailable={isAudioFxUnavailable}
            />
          </React.Suspense>
        )}

      {controlPanelMode === "video-settings" && (
        <div className="mt-4 border-t border-[#cac0b2] pt-4">
          <div className="mb-3 flex flex-wrap items-center gap-3">
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
              horizontalSharpness={filterState.horizontalSharpness}
              rgbConvergenceOffset={filterState.rgbConvergenceOffset}
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
              outputBrightness={filterState.outputBrightness}
              basicContrast={filterState.basicContrast}
              basicSaturation={filterState.basicSaturation}
              phosphorDotLightBalance={filterState.phosphorDotLightBalance}
              phosphorDotShape={filterState.phosphorDotShape}
              phosphorDotInternalScale={filterState.phosphorDotInternalScale}
              phosphorDotBrightCore={filterState.phosphorDotBrightCore}
              phosphorDotCellFill={filterState.phosphorDotCellFill}
              phosphorDotFlatDisc={filterState.phosphorDotFlatDisc}
              phosphorDotNeighborBlend={filterState.phosphorDotNeighborBlend}
              phosphorDotGrainStrength={filterState.phosphorDotGrainStrength}
              phosphorDotGlowColorStrength={filterState.phosphorDotGlowColorStrength}
              beamDarkCutoff={filterState.beamDarkCutoff}
              beamHorizontalSpread={filterState.beamHorizontalSpread}
              beamStripeStrength={filterState.beamStripeStrength}
              beamWhiteBloom={filterState.beamWhiteBloom}
              beamWarmBloom={filterState.beamWarmBloom}
              signalInstabilityEnabled={filterState.signalInstabilityEnabled}
              signalInstabilityStrength={filterState.signalInstabilityStrength}
              signalInstabilityFrequency={filterState.signalInstabilityFrequency}
              scanlineBrightnessFade={filterState.scanlineBrightnessFade}
              scanlineStrength={filterState.scanlineStrength}
              scanline2Strength={filterState.scanline2Strength}
              selectedPreset={filterState.selectedPreset}
              sourceDimensions={player.sourceDimensions}
              targetHeight={filterState.targetHeight}
              targetWidth={filterState.targetWidth}
              autoTargetSize={filterState.autoTargetSize}
              samplingMode={filterState.samplingMode}
              matchTargetAspect={filterState.matchTargetAspect}
              vignetteStrength={filterState.vignetteStrength}
              focusStrength={filterState.focusStrength}
              focusWidth={filterState.focusWidth}
              focusHeight={filterState.focusHeight}
              onApplyPreset={onApplyPreset}
              onSetColorLevels={filterState.setColorLevels}
              onSetCurvature={filterState.setCurvature}
              onSetDitherStrength={filterState.setDitherStrength}
              onSetGlowStrength={filterState.setGlowStrength}
              onSetHorizontalSharpness={filterState.setHorizontalSharpness}
              onSetRgbConvergenceOffset={filterState.setRgbConvergenceOffset}
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
              onSetOutputBrightness={filterState.setOutputBrightness}
              onSetBasicContrast={filterState.setBasicContrast}
              onSetBasicSaturation={filterState.setBasicSaturation}
              onSetPhosphorDotLightBalance={filterState.setPhosphorDotLightBalance}
              onSetPhosphorDotShape={filterState.setPhosphorDotShape}
              onSetPhosphorDotInternalScale={filterState.setPhosphorDotInternalScale}
              onSetPhosphorDotBrightCore={filterState.setPhosphorDotBrightCore}
              onSetPhosphorDotCellFill={filterState.setPhosphorDotCellFill}
              onSetPhosphorDotFlatDisc={filterState.setPhosphorDotFlatDisc}
              onSetPhosphorDotNeighborBlend={filterState.setPhosphorDotNeighborBlend}
              onSetPhosphorDotGrainStrength={filterState.setPhosphorDotGrainStrength}
              onSetPhosphorDotGlowColorStrength={filterState.setPhosphorDotGlowColorStrength}
              onSetBeamDarkCutoff={filterState.setBeamDarkCutoff}
              onSetBeamHorizontalSpread={filterState.setBeamHorizontalSpread}
              onSetBeamStripeStrength={filterState.setBeamStripeStrength}
              onSetBeamWhiteBloom={filterState.setBeamWhiteBloom}
              onSetBeamWarmBloom={filterState.setBeamWarmBloom}
              onSetSignalInstabilityEnabled={filterState.setSignalInstabilityEnabled}
              onSetSignalInstabilityStrength={filterState.setSignalInstabilityStrength}
              onSetSignalInstabilityFrequency={filterState.setSignalInstabilityFrequency}
              onSetScanlineBrightnessFade={filterState.setScanlineBrightnessFade}
              onSetScanlineStrength={filterState.setScanlineStrength}
              onSetScanline2Strength={filterState.setScanline2Strength}
              onSetTargetHeight={onSetTargetHeight}
              onSetTargetWidth={onSetTargetWidth}
              onSetAutoTargetSize={filterState.setAutoTargetSize}
              onSetSamplingMode={filterState.setSamplingMode}
              onSetMatchTargetAspect={onSetMatchTargetAspect}
              onSetVignetteStrength={filterState.setVignetteStrength}
              onSetFocusStrength={filterState.setFocusStrength}
              onSetFocusWidth={filterState.setFocusWidth}
              onSetFocusHeight={filterState.setFocusHeight}
            />
          </React.Suspense>
        </div>
      )}
    </div>
  );
}
