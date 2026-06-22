import { memo, useRef, useState } from "react";
import {
  FolderOpen,
  Gauge,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  Save,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import {
  exportPresetFile,
  importPresetFile,
  type PresetFileData,
} from "../hooks/presetFile";
import {
  RETRO_AUDIO_PRESETS,
  type RetroAudioPresetDefinition,
  type RetroAudioPresetKey,
} from "../audio/preset";

type VideoControlsProps = {
  mode: "playback" | "audio-settings";
  hasPlayback: boolean;
  currentTime: number;
  duration: number;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isAudioFxEnabled: boolean;
  isNoiseEnabled: boolean;
  hasVideo: boolean;
  isVideoSettingsOpen: boolean;
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
  onChangeLofiAmount: (amount: number) => void;
  onChangeRadioToneAmount: (amount: number) => void;
  onChangeBitCrushAmount: (amount: number) => void;
  onChangeSampleRateReductionAmount: (amount: number) => void;
  onChangeNoiseReductionAmount: (amount: number) => void;
  onChangeBassAmount: (amount: number) => void;
  onChangeMidAmount: (amount: number) => void;
  onChangeTrebleAmount: (amount: number) => void;
  onChangeStereoWidthAmount: (amount: number) => void;
  onChangeSmallSpeakerRoomAmount: (amount: number) => void;
  onChangeWowFlutterAmount: (amount: number) => void;
  onChangeNoiseLevel: (amount: number) => void;
  onChangeVinylDustAmount: (amount: number) => void;
  onChangeDelayAmount: (amount: number) => void;
  onChangeReverbAmount: (amount: number) => void;
  onChangeChorusAmount: (amount: number) => void;
  onChangeTapeSaturationAmount: (amount: number) => void;
  onChangeCompressorAmount: (amount: number) => void;
  onChangeFxOutputTrimAmount: (amount: number) => void;
  onChangePlaybackRate: (rate: number) => void;
  onChangeVolume: (volume: number) => void;
  onRestart: () => void;
  onSeek: (time: number) => void;
  onStepFrame: (direction: -1 | 1) => void;
  onToggleLoop: () => void;
  onToggleAudioFx: () => void;
  onToggleMute: () => void;
  onToggleNoise: () => void;
  onTogglePlayback: () => void;
  onBackToPlayback: () => void;
  onResetSettings: () => void;
  onToggleVideoSettings: () => void;
  onToggleAudioSettings: () => void;
  onImportSettings: (data: PresetFileData) => void;
};

const isNearlyEqual = (a: number, b: number) => Math.abs(a - b) < 0.0001;

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(2, "0")}`;
};

export const VideoControls = memo(function VideoControls({
  mode,
  hasPlayback,
  currentTime,
  duration,
  isLooping,
  isMuted,
  isPlaying,
  isAudioFxEnabled,
  isNoiseEnabled,
  hasVideo,
  isVideoSettingsOpen,
  lofiAmount,
  radioToneAmount,
  bitCrushAmount,
  sampleRateReductionAmount,
  noiseReductionAmount,
  bassAmount,
  midAmount,
  trebleAmount,
  stereoWidthAmount,
  smallSpeakerRoomAmount,
  wowFlutterAmount,
  noiseLevel,
  vinylDustAmount,
  delayAmount,
  reverbAmount,
  chorusAmount,
  tapeSaturationAmount,
  compressorAmount,
  fxOutputTrimAmount,
  playbackRate,
  volume,
  onChangeLofiAmount,
  onChangeRadioToneAmount,
  onChangeBitCrushAmount,
  onChangeSampleRateReductionAmount,
  onChangeNoiseReductionAmount,
  onChangeBassAmount,
  onChangeMidAmount,
  onChangeTrebleAmount,
  onChangeStereoWidthAmount,
  onChangeSmallSpeakerRoomAmount,
  onChangeWowFlutterAmount,
  onChangeNoiseLevel,
  onChangeVinylDustAmount,
  onChangeDelayAmount,
  onChangeReverbAmount,
  onChangeChorusAmount,
  onChangeTapeSaturationAmount,
  onChangeCompressorAmount,
  onChangeFxOutputTrimAmount,
  onChangePlaybackRate,
  onChangeVolume,
  onRestart: _onRestart,
  onSeek,
  onStepFrame,
  onToggleLoop,
  onToggleAudioFx,
  onToggleMute,
  onToggleNoise,
  onTogglePlayback,
  onBackToPlayback,
  onResetSettings,
  onToggleVideoSettings,
  onToggleAudioSettings,
  onImportSettings,
}: VideoControlsProps) {
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep the restart callback in the surface area for future UI revival.
  void _onRestart;

  const handleSettingsFile = async (file: File) => {
    if (!file.name.endsWith(".retro.json")) return;
    const data = await importPresetFile(file);
    if (data) onImportSettings(data);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleSettingsFile(file);
  };

  const selectedAudioPreset = (
    Object.entries(RETRO_AUDIO_PRESETS).find(([, preset]) => {
      const { settings } = preset;

      return (
        settings.isAudioFxEnabled === isAudioFxEnabled &&
        settings.isNoiseEnabled === isNoiseEnabled &&
        isNearlyEqual(settings.lofiAmount, lofiAmount) &&
        isNearlyEqual(settings.radioToneAmount, radioToneAmount) &&
        isNearlyEqual(settings.bitCrushAmount, bitCrushAmount) &&
        isNearlyEqual(
          settings.sampleRateReductionAmount,
          sampleRateReductionAmount,
        ) &&
        isNearlyEqual(settings.noiseReductionAmount, noiseReductionAmount) &&
        isNearlyEqual(settings.bassAmount, bassAmount) &&
        isNearlyEqual(settings.midAmount, midAmount) &&
        isNearlyEqual(settings.trebleAmount, trebleAmount) &&
        isNearlyEqual(settings.stereoWidthAmount, stereoWidthAmount) &&
        isNearlyEqual(
          settings.smallSpeakerRoomAmount,
          smallSpeakerRoomAmount,
        ) &&
        isNearlyEqual(settings.wowFlutterAmount, wowFlutterAmount) &&
        isNearlyEqual(settings.noiseLevel, noiseLevel) &&
        isNearlyEqual(settings.vinylDustAmount, vinylDustAmount) &&
        isNearlyEqual(settings.delayAmount, delayAmount) &&
        isNearlyEqual(settings.reverbAmount, reverbAmount) &&
        isNearlyEqual(settings.chorusAmount, chorusAmount) &&
        isNearlyEqual(settings.tapeSaturationAmount, tapeSaturationAmount) &&
        isNearlyEqual(settings.compressorAmount, compressorAmount)
      );
    })?.[0] as RetroAudioPresetKey | undefined
  ) ?? null;

  const applyAudioPreset = (preset: RetroAudioPresetKey) => {
    const presetSettings = RETRO_AUDIO_PRESETS[preset].settings;

    if (presetSettings.isAudioFxEnabled && !isAudioFxEnabled) {
      onToggleAudioFx();
    }
    if (!presetSettings.isAudioFxEnabled && isAudioFxEnabled) {
      onToggleAudioFx();
    }
    if (presetSettings.isNoiseEnabled !== isNoiseEnabled) {
      onToggleNoise();
    }

    onChangeLofiAmount(presetSettings.lofiAmount);
    onChangeRadioToneAmount(presetSettings.radioToneAmount);
    onChangeBitCrushAmount(presetSettings.bitCrushAmount);
    onChangeSampleRateReductionAmount(presetSettings.sampleRateReductionAmount);
    onChangeNoiseReductionAmount(presetSettings.noiseReductionAmount);
    onChangeBassAmount(presetSettings.bassAmount);
    onChangeMidAmount(presetSettings.midAmount);
    onChangeTrebleAmount(presetSettings.trebleAmount);
    onChangeStereoWidthAmount(presetSettings.stereoWidthAmount);
    onChangeSmallSpeakerRoomAmount(presetSettings.smallSpeakerRoomAmount);
    onChangeWowFlutterAmount(presetSettings.wowFlutterAmount);
    onChangeNoiseLevel(presetSettings.noiseLevel);
    onChangeVinylDustAmount(presetSettings.vinylDustAmount);
    onChangeDelayAmount(presetSettings.delayAmount);
    onChangeReverbAmount(presetSettings.reverbAmount);
    onChangeChorusAmount(presetSettings.chorusAmount);
    onChangeTapeSaturationAmount(presetSettings.tapeSaturationAmount);
    onChangeCompressorAmount(presetSettings.compressorAmount);
    onChangeFxOutputTrimAmount(presetSettings.fxOutputTrimAmount);
  };

  if (mode === "audio-settings") {
    return (
      <div className="mt-3 space-y-3 rounded-xl border border-[#c8cede] bg-[#f0f2f7] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#12141c]">Audio settings</p>
            <p className="text-[11px] text-[#7a88a8]">Shape the sound with effects, noise, and space.</p>
          </div>
          <button
            type="button"
            onClick={onBackToPlayback}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
          >
            Back to Playback
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onToggleAudioFx}
            className={[
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
              isAudioFxEnabled
                ? "border-amber-400 bg-amber-500/20"
                : "border-[#b8c0d4] bg-[#f8f9fc] hover:bg-[#e2e5ee]",
            ].join(" ")}
          >
            <Waves size={16} />
            {isAudioFxEnabled ? "Effects on" : "Effects off"}
          </button>
          <button
            type="button"
            onClick={onToggleNoise}
            className={[
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
              isNoiseEnabled
                ? "border-fuchsia-400 bg-fuchsia-500/20"
                : "border-[#b8c0d4] bg-[#f8f9fc] hover:bg-[#e2e5ee]",
            ].join(" ")}
          >
            <Mic2 size={16} />
            {isNoiseEnabled ? "Noise on" : "Noise off"}
          </button>
        </div>

        <div className="rounded-xl border border-[#c8cede] bg-[#eceef4] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a88a8]">
            Presets
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(RETRO_AUDIO_PRESETS) as [
              RetroAudioPresetKey,
              RetroAudioPresetDefinition,
            ][]).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  applyAudioPreset(key);
                }}
                className={[
                  "inline-flex min-h-10 items-center justify-center rounded-lg border px-3 py-2 text-sm transition",
                  selectedAudioPreset === key
                    ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                    : "border-[#b8c0d4] bg-[#f8f9fc] text-[#2c3550] hover:bg-[#e2e5ee]",
                ].join(" ")}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#c8cede] bg-[#eceef4] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a88a8]">
            Effects
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Lo-Fi amount</span>
                <span>{Math.round(lofiAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={lofiAmount}
                onChange={(ev) => {
                  onChangeLofiAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Radio tone</span>
                <span>{Math.round(radioToneAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={radioToneAmount}
                onChange={(ev) => {
                  onChangeRadioToneAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Bit crush</span>
                <span>{Math.round(bitCrushAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bitCrushAmount}
                onChange={(ev) => {
                  onChangeBitCrushAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Sample rate</span>
                <span>{Math.round(sampleRateReductionAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sampleRateReductionAmount}
                onChange={(ev) => {
                  onChangeSampleRateReductionAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Noise reduction</span>
                <span>{Math.round(noiseReductionAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={noiseReductionAmount}
                onChange={(ev) => {
                  onChangeNoiseReductionAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Wow & Flutter</span>
                <span>{Math.round(wowFlutterAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={wowFlutterAmount}
                onChange={(ev) => {
                  onChangeWowFlutterAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Bass</span>
                <span>{bassAmount >= 0 ? "+" : ""}{(bassAmount * 15).toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.01"
                value={bassAmount}
                onChange={(ev) => {
                  onChangeBassAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Mid</span>
                <span>{midAmount >= 0 ? "+" : ""}{(midAmount * 15).toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.01"
                value={midAmount}
                onChange={(ev) => {
                  onChangeMidAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Treble</span>
                <span>{trebleAmount >= 0 ? "+" : ""}{(trebleAmount * 15).toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.01"
                value={trebleAmount}
                onChange={(ev) => {
                  onChangeTrebleAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#c8cede] bg-[#eceef4] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a88a8]">
            Space
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Delay</span>
                <span>{Math.round(delayAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={delayAmount}
                onChange={(ev) => {
                  onChangeDelayAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Reverb</span>
                <span>{Math.round(reverbAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={reverbAmount}
                onChange={(ev) => {
                  onChangeReverbAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Chorus</span>
                <span>{Math.round(chorusAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={chorusAmount}
                onChange={(ev) => {
                  onChangeChorusAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#c8cede] bg-[#eceef4] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a88a8]">
            Dynamics
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Tape Saturation</span>
                <span>{Math.round(tapeSaturationAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={tapeSaturationAmount}
                onChange={(ev) => {
                  onChangeTapeSaturationAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Compressor</span>
                <span>{Math.round(compressorAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={compressorAmount}
                onChange={(ev) => {
                  onChangeCompressorAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#c8cede] bg-[#eceef4] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a88a8]">
            Output
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(ev) => {
                  onChangeVolume(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Stereo width</span>
                <span>
                  {stereoWidthAmount < 0
                    ? `Mono ${Math.round(Math.abs(stereoWidthAmount) * 100)}%`
                    : stereoWidthAmount > 0
                      ? `Wide ${Math.round(stereoWidthAmount * 100)}%`
                      : "Original"}
                </span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={stereoWidthAmount}
                onChange={(ev) => {
                  onChangeStereoWidthAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Small room</span>
                <span>{Math.round(smallSpeakerRoomAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={smallSpeakerRoomAmount}
                onChange={(ev) => {
                  onChangeSmallSpeakerRoomAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
                <span>Output Gain</span>
                <span>{Math.round(fxOutputTrimAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.01"
                value={fxOutputTrimAmount}
                onChange={(ev) => {
                  onChangeFxOutputTrimAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#c8cede] bg-[#eceef4] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a88a8]">
            Noise
          </p>
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
              <span>Surface hiss</span>
              <span>{(noiseLevel * 100).toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.05"
              value={noiseLevel * 100}
              onChange={(ev) => {
                onChangeNoiseLevel(Number(ev.currentTarget.value) / 100);
              }}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
              <span>Vinyl dust</span>
              <span>{Math.round(vinylDustAmount * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={vinylDustAmount}
              onChange={(ev) => {
                onChangeVinylDustAmount(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "mt-3 space-y-3 rounded-xl transition-colors",
        isDragOver ? "bg-cyan-500/10 outline-dashed outline-1 outline-cyan-500/50" : "",
      ].join(" ")}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleSettingsFile(file);
          e.target.value = "";
        }}
      />
      {hasPlayback && (
        <>
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a88a8]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(duration, 0)}
              step="0.01"
              value={Math.min(currentTime, duration || 0)}
              onChange={(ev) => {
                onSeek(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={onTogglePlayback}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[#12141c] hover:bg-emerald-500/20"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setIsVolumeOpen((v) => !v)}
              aria-label="Volume"
              title="Volume"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              type="button"
              onClick={onToggleLoop}
              aria-label={isLooping ? "Loop on" : "Loop off"}
              title={isLooping ? "Loop on" : "Loop off"}
              className={[
                  "inline-flex min-h-11 items-center justify-center rounded-lg border px-3 py-2 text-[#12141c]",
                  isLooping
                    ? "border-[#000000] bg-[#111014]/20"
                    : "border-[#b8c0d4] bg-[#f8f9fc] hover:bg-[#e2e5ee]",
              ].join(" ")}
            >
              <RotateCcw size={16} />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSpeedOpen((current) => !current);
                }}
                aria-label={`Speed ${playbackRate}x`}
                title={`Speed ${playbackRate}x`}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
              >
                <Gauge size={14} />
              </button>
              {isSpeedOpen && (
                <div className="absolute bottom-full left-0 z-200 mb-1 flex min-w-full flex-col gap-1 rounded-lg border border-[#c8cede] bg-[#eceef4] p-2 shadow-lg">
                  {[2, 1.5, 1.25, 1, 0.75, 0.5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        onChangePlaybackRate(rate);
                        setIsSpeedOpen(false);
                      }}
                      className={[
                        "rounded-md px-3 py-2 text-left text-[#12141c] hover:bg-[#e2e5ee]",
                        playbackRate === rate ? "bg-[#111014]/20 text-[#000000] font-bold" : "",
                      ].join(" ")}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasVideo ? (
              <div className="col-span-4 grid grid-cols-6 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onStepFrame(-1);
                  }}
                  aria-label="Previous frame"
                  title="Previous frame"
                  className="col-span-1 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-2 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
                >
                  <StepBack size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.max(currentTime - 5, 0));
                  }}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
                >
                  <SkipBack size={16} />
                  -5s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
                  }}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
                >
                  <SkipForward size={16} />
                  +5s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onStepFrame(1);
                  }}
                  aria-label="Next frame"
                  title="Next frame"
                  className="col-span-1 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-2 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
                >
                  <StepForward size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.max(currentTime - 5, 0));
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
                >
                  <SkipBack size={16} />
                  -5s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]"
                >
                  <SkipForward size={16} />
                  +5s
                </button>
              </>
            )}
          </div>
          {isVolumeOpen && (
            <div className="flex items-center gap-2 rounded-lg border border-[#c8cede] bg-[#f8f9fc] px-3 py-2">
              <button
                type="button"
                onClick={onToggleMute}
                aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                title={isMuted || volume === 0 ? "Unmute" : "Mute"}
                className="shrink-0 text-[#7a88a8] hover:text-[#12141c]"
              >
                {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(ev) => {
                  const v = Number(ev.currentTarget.value);
                  if (isMuted && v > 0) onToggleMute();
                  onChangeVolume(v);
                }}
                className="w-full cursor-pointer"
              />
              <span className="w-8 shrink-0 text-right text-[11px] text-[#7a88a8]">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          )}
        </>
      )}

      <div className="flex gap-2">
        <div className="grid flex-1 grid-cols-3 gap-2">
          <button
            type="button"
            onClick={onToggleVideoSettings}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#111014]/30 bg-[#111014] px-2 py-2 text-xs text-white hover:bg-[#2a2a32]"
          >
            <SlidersHorizontal size={16} />
            {isVideoSettingsOpen ? "Close Video" : "Video"}
          </button>
          <button
            type="button"
            onClick={onToggleAudioSettings}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-[#111014]/30 bg-[#111014] px-2 py-2 text-xs text-white hover:bg-[#2a2a32]"
          >
            <Mic2 size={16} />
            Audio
          </button>
          {/* Keep restart wired for future UX experiments; hiding the button is intentional. */}
          <button
            type="button"
            onClick={onResetSettings}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-2 py-2 text-xs text-[#12141c] hover:bg-rose-500/20"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
        <button
          type="button"
          onClick={exportPresetFile}
          title="Save settings to file"
          className="inline-flex min-h-10 w-8 items-center justify-center rounded-lg border border-[#b8c0d4] bg-[#e8eaf0] text-[#7a88a8] hover:bg-[#d8dce8] hover:text-[#12141c]"
        >
          <Save size={13} />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Load settings from .retro.json file"
          className="inline-flex min-h-10 w-8 items-center justify-center rounded-lg border border-[#b8c0d4] bg-[#e8eaf0] text-[#7a88a8] hover:bg-[#d8dce8] hover:text-[#12141c]"
        >
          <FolderOpen size={13} />
        </button>
      </div>
      {hasPlayback && (
        <p className="hidden text-[11px] text-[#9aa2b8]">
          Shortcuts: `Space`/`K` play-pause, `Left/Right` seek 5s, `J/L` seek 10s
        </p>
      )}
    </div>
  );
});
