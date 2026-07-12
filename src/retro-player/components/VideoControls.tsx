import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useLongPress } from "../hooks/useLongPress";
import {
  ChevronsRight,
  FolderOpen,
  Gauge,
  Mic2,
  Pause,
  Play,
  Repeat,
  Repeat1,
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
import type { RetroPlayerLocale } from "../types";

type VideoControlsProps = {
  locale: RetroPlayerLocale;
  mode: "playback" | "audio-settings";
  hasPlayback: boolean;
  currentTime: number;
  duration: number;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isAudioFxEnabled: boolean;
  isVideoFxEnabled: boolean;
  isNoiseEnabled: boolean;
  hasImage: boolean;
  hasVideo: boolean;
  analyserRef?: React.RefObject<AnalyserNode | null>;
  isVideoSettingsOpen: boolean;
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
  inputTrimAmount: number;
  playbackRate: number;
  volume: number;
  onChangeLofiAmount: (amount: number) => void;
  onChangeRadioToneAmount: (amount: number) => void;
  onChangeBitCrushAmount: (amount: number) => void;
  onChangeBitCrushNoiseAmount: (amount: number) => void;
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
  onChangeNoiseWarmthAmount: (amount: number) => void;
  onChangeNoiseAirAmount: (amount: number) => void;
  onChangeNoisePresenceAmount: (amount: number) => void;
  onChangeDelayAmount: (amount: number) => void;
  onChangeReverbAmount: (amount: number) => void;
  onChangeChorusAmount: (amount: number) => void;
  onChangeTapeSaturationAmount: (amount: number) => void;
  onChangeCompressorAmount: (amount: number) => void;
  onChangeFxOutputTrimAmount: (amount: number) => void;
  onChangeInputTrimAmount: (amount: number) => void;
  onChangePlaybackRate: (rate: number) => void;
  onChangeVolume: (volume: number) => void;
  onRestart: () => void;
  onSeek: (time: number) => void;
  onStepFrame: (direction: -1 | 1) => void;
  onToggleLoop: () => void;
  onToggleAudioFx: () => void;
  onToggleVideoFx: () => void;
  showVideoSpectrum?: boolean;
  onToggleVideoSpectrum?: () => void;
  showClockOverlay?: boolean;
  onToggleClockOverlay?: () => void;
  onToggleMute: () => void;
  onToggleNoise: () => void;
  onTogglePlayback: () => void;
  onTogglePlaybackLongPress?: () => void;
  onBackToPlayback: () => void;
  onResetSettings: () => void;
  onToggleVideoSettings: () => void;
  onToggleAudioSettings: () => void;
  onImportSettings: (data: PresetFileData) => void;
  onPrevTrack?: () => void;
  onNextTrack?: () => void;
  loopMode?: "one" | "autoplay" | "all" | "off";
  onCycleLoopMode?: () => void;
  onLoopLongPress?: () => void;
  isNativePlaybackMode?: boolean;
  nativePlaybackNeedsReload?: boolean;
  onToggleNativePlaybackMode?: () => void;
  isAudioFxUnavailable?: boolean;
};

const isNearlyEqual = (a: number, b: number) => Math.abs(a - b) < 0.0001;
const SPEED_BAR_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

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
  locale,
  mode,
  hasPlayback,
  currentTime,
  duration,
  isLooping: _isLooping,
  isMuted,
  isPlaying,
  isAudioFxEnabled,
  isVideoFxEnabled,
  isNoiseEnabled,
  hasImage,
  hasVideo,
  analyserRef: _analyserRef,
  isVideoSettingsOpen,
  lofiAmount,
  radioToneAmount,
  bitCrushAmount,
  bitCrushNoiseAmount,
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
  noiseWarmthAmount,
  noiseAirAmount,
  noisePresenceAmount,
  delayAmount,
  reverbAmount,
  chorusAmount,
  tapeSaturationAmount,
  compressorAmount,
  fxOutputTrimAmount,
  inputTrimAmount,
  playbackRate,
  volume,
  onChangeLofiAmount,
  onChangeRadioToneAmount,
  onChangeBitCrushAmount,
  onChangeBitCrushNoiseAmount,
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
  onChangeNoiseWarmthAmount,
  onChangeNoiseAirAmount,
  onChangeNoisePresenceAmount,
  onChangeDelayAmount,
  onChangeReverbAmount,
  onChangeChorusAmount,
  onChangeTapeSaturationAmount,
  onChangeCompressorAmount,
  onChangeFxOutputTrimAmount,
  onChangeInputTrimAmount,
  onChangePlaybackRate,
  onChangeVolume,
  onRestart: _onRestart,
  onSeek,
  onStepFrame,
  onToggleLoop,
  onToggleAudioFx,
  onToggleVideoFx,
  showVideoSpectrum,
  onToggleVideoSpectrum,
  showClockOverlay,
  onToggleClockOverlay,
  onToggleMute,
  onToggleNoise,
  onTogglePlayback,
  onTogglePlaybackLongPress,
  onBackToPlayback,
  onResetSettings,
  onToggleVideoSettings,
  onToggleAudioSettings,
  onImportSettings,
  onPrevTrack,
  onNextTrack,
  loopMode,
  onCycleLoopMode,
  onLoopLongPress,
  isNativePlaybackMode = false,
  nativePlaybackNeedsReload = false,
  onToggleNativePlaybackMode,
  isAudioFxUnavailable = false,
}: VideoControlsProps) {
  const [activeTransportBar, setActiveTransportBar] = useState<"seek" | "volume" | "speed">("seek");
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTooltipKey, setActiveTooltipKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevNoiseEnabledRef = useRef(false);
  const tooltipTimerRef = useRef<number | null>(null);
  const isVideoFxUnavailable = isNativePlaybackMode;
  const effectiveAudioFxUnavailable = isAudioFxUnavailable || isNativePlaybackMode;

  const tooltipText =
    locale === "ja"
          ? {
              video: isVideoFxUnavailable
            ? "Video: Native mode では使えません。低性能PCではこの方が快適なことがあります。"
            : isVideoFxEnabled
              ? "Video: エフェクトが有効です。長押しで ON/OFF、通常押しで設定を開きます。"
              : "Video: 映像エフェクトはオフです。通常押しで設定を開きます。",
          audio: isNativePlaybackMode
            ? "Audio: Native mode では使えません。Native ボタン長押しで Retro ON になります。"
            : isAudioFxUnavailable
              ? "Audio: HLS(ffmpeg) ストリーミング中は設定が効きません。"
              : isAudioFxEnabled
              ? "Audio: エフェクトが有効です。長押しで ON/OFF、通常押しで設定を開きます。"
              : "Audio: 音声エフェクトはオフです。通常押しで設定を開きます。",
          reset: isNativePlaybackMode
                ? "Retro OFF: 長押しで Retro モード が解放されます。"
            : "Reset: 通常押しで設定を初期化します。長押しで Native mode に切り替えます。",
          save: showClockOverlay
            ? "Save: 設定を書き出します。長押しで時計表示を切り替えます。"
            : "Save: 設定を書き出します。長押しで時計表示を切り替えます。",
          load: showVideoSpectrum
            ? "Load: 設定を読み込みます。長押しでスペクトラム表示を切り替えます。"
            : "Load: 設定を読み込みます。長押しでスペクトラム表示を切り替えます。",
        }
      : {
          video: isVideoFxUnavailable
            ? "Video: unavailable in native mode. This is often faster on low-end PCs."
            : isVideoFxEnabled
              ? "Video: effects are enabled. Long press toggles them, tap opens settings."
              : "Video: effects are off. Tap opens video settings.",
          audio: isNativePlaybackMode
            ? "Audio: unavailable in native mode. Long press the Native button to turn Retro ON."
            : isAudioFxUnavailable
              ? "Audio: settings have no effect while streaming via HLS (ffmpeg)."
              : isAudioFxEnabled
              ? "Audio: effects are enabled. Long press toggles them, tap opens settings."
              : "Audio: effects are off. Tap opens audio settings.",
          reset: isNativePlaybackMode
            ? "Retro OFF: long press unlocks Retro mode."
            : "Reset: tap resets settings. Long press switches to native mode.",
          save: "Save: export the current settings. Long press toggles the clock overlay.",
          load: "Load: import settings. Long press toggles the spectrum overlay.",
        };

  const scheduleTooltip = useCallback((key: string) => {
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
    }

    tooltipTimerRef.current = window.setTimeout(() => {
      setActiveTooltipKey(key);
      tooltipTimerRef.current = null;
    }, 120);
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    setActiveTooltipKey(null);
  }, []);

  const tooltipHandlers = useCallback((key: string) => ({
    onMouseEnter: () => scheduleTooltip(key),
    onMouseLeave: hideTooltip,
    onFocus: () => scheduleTooltip(key),
    onBlur: hideTooltip,
  }), [hideTooltip, scheduleTooltip]);

  const renderTooltip = (key: string, text: string, widthClass = "w-48") => (
    <div
      role="tooltip"
      aria-hidden={activeTooltipKey !== key}
      className={[
        "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",
        widthClass,
        activeTooltipKey === key ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
      ].join(" ")}
    >
      {text}
    </div>
  );

  const { isHolding: isVideoHolding, ...videoButtonHandlers } = useLongPress(onToggleVideoFx, onToggleVideoSettings);
  const handleAudioFxLongPress = () => {
    if (isAudioFxEnabled) {
      prevNoiseEnabledRef.current = isNoiseEnabled;
      onToggleAudioFx();
      if (isNoiseEnabled) onToggleNoise();
    } else {
      onToggleAudioFx();
      if (prevNoiseEnabledRef.current && !isNoiseEnabled) onToggleNoise();
    }
  };
  const { isHolding: isAudioHolding, ...audioButtonHandlers } = useLongPress(handleAudioFxLongPress, onToggleAudioSettings);
  const noop = useCallback(() => {}, []);
  const { isHolding: isPlayPauseHolding, ...playPauseLongPressHandlers } = useLongPress(
    onTogglePlaybackLongPress ?? noop,
    onTogglePlayback,
  );
  const handlePrevShortPress = useCallback(() => {
    if (hasImage && onPrevTrack) {
      onPrevTrack();
      return;
    }
    onSeek(Math.max(currentTime - 5, 0));
  }, [currentTime, hasImage, onPrevTrack, onSeek]);
  const { isHolding: isPrevHolding, ...prevTrackHandlers } = useLongPress(
    onPrevTrack ?? noop,
    handlePrevShortPress,
  );
  const handleNextShortPress = useCallback(() => {
    if (hasImage && onNextTrack) {
      onNextTrack();
      return;
    }
    onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
  }, [currentTime, duration, hasImage, onNextTrack, onSeek]);
  const { isHolding: isNextHolding, ...nextTrackHandlers } = useLongPress(
    onNextTrack ?? noop,
    handleNextShortPress,
  );
  const { isHolding: isLoopHolding, ...loopButtonHandlers } = useLongPress(
    onLoopLongPress ?? noop,
    onCycleLoopMode ?? onToggleLoop,
  );
  const { isHolding: isVolumeHolding, ...volumeLongPressHandlers } = useLongPress(
    onToggleMute,
    () => setActiveTransportBar((current) => (current === "volume" ? "seek" : "volume")),
  );
  const { isHolding: isResetHolding, ...resetButtonHandlers } = useLongPress(
    useCallback(() => { onToggleNativePlaybackMode?.(); }, [onToggleNativePlaybackMode]),
    useCallback(() => {
      if (isNativePlaybackMode) {
        return;
      }
      onResetSettings();
    }, [isNativePlaybackMode, onResetSettings]),
  );
  const { isHolding: isSaveHolding, ...saveButtonHandlers } = useLongPress(
    useCallback(() => { onToggleClockOverlay?.(); }, [onToggleClockOverlay]),
    exportPresetFile,
  );
  const { isHolding: isLoadHolding, ...loadButtonHandlers } = useLongPress(
    useCallback(() => { onToggleVideoSpectrum?.(); }, [onToggleVideoSpectrum]),
    useCallback(() => { fileInputRef.current?.click(); }, []),
  );

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current !== null) {
        window.clearTimeout(tooltipTimerRef.current);
      }
    };
  }, []);

  // Keep the restart callback in the surface area for future UI revival.
  void _onRestart;

  const loopIcon = loopMode === "one" ? <Repeat1 size={16} />
    : loopMode === "autoplay" ? <ChevronsRight size={16} />
    : loopMode === "all" ? <Repeat size={16} />
    : <Repeat size={16} />;
  const loopIconSm = loopMode === "one" ? <Repeat1 size={13} />
    : loopMode === "autoplay" ? <ChevronsRight size={13} />
    : loopMode === "all" ? <Repeat size={13} />
    : <Repeat size={13} />;
  const loopLabel = loopMode === "one" ? "Loop 1"
    : loopMode === "autoplay" ? "Auto Next"
    : loopMode === "all" ? "Loop All"
    : "No loop";
  const loopShortLabel = loopMode === "one" ? "1"
    : loopMode === "autoplay" ? "Next"
    : loopMode === "all" ? "All"
    : "Off";
  const loopActive = loopMode === "one" || loopMode === "autoplay" || loopMode === "all";
  const currentVolume = isMuted ? 0 : volume;
  const prevTrackLabel = hasImage ? "Prev" : "-5s";
  const nextTrackLabel = hasImage ? "Next" : "+5s";
  const speedBarIndex = (() => {
    const exactIndex = SPEED_BAR_OPTIONS.indexOf(playbackRate as typeof SPEED_BAR_OPTIONS[number]);
    if (exactIndex !== -1) return exactIndex;

    return SPEED_BAR_OPTIONS.reduce((bestIndex, rate, index) => (
      Math.abs(rate - playbackRate) < Math.abs(SPEED_BAR_OPTIONS[bestIndex] - playbackRate)
        ? index
        : bestIndex
    ), 0);
  })();
  const transportBarMeta = activeTransportBar === "volume"
    ? {
        leftLabel: "Volume",
        rightLabel: `${Math.round(currentVolume * 100)}%`,
        min: 0,
        max: 1,
        step: 0.01,
        value: currentVolume,
        onChange: (rawValue: number) => {
          if (isMuted && rawValue > 0) onToggleMute();
          onChangeVolume(rawValue);
        },
      }
    : activeTransportBar === "speed"
      ? {
          leftLabel: "Speed",
          rightLabel: `${playbackRate}x`,
          min: 0,
          max: SPEED_BAR_OPTIONS.length - 1,
          step: 1,
          value: speedBarIndex,
          onChange: (rawValue: number) => {
            const nextRate = SPEED_BAR_OPTIONS[Math.round(rawValue)] ?? 1;
            onChangePlaybackRate(nextRate);
          },
        }
      : {
          leftLabel: formatTime(currentTime),
          rightLabel: formatTime(duration),
          min: 0,
          max: Math.max(duration, 0),
          step: 0.01,
          value: Math.min(currentTime, duration || 0),
          onChange: (rawValue: number) => {
            onSeek(rawValue);
          },
        };

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
        isNearlyEqual(settings.bitCrushNoiseAmount, bitCrushNoiseAmount) &&
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
        isNearlyEqual(settings.noiseWarmthAmount, noiseWarmthAmount) &&
        isNearlyEqual(settings.noiseAirAmount, noiseAirAmount) &&
        isNearlyEqual(settings.noisePresenceAmount, noisePresenceAmount) &&
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
    onChangeBitCrushNoiseAmount(presetSettings.bitCrushNoiseAmount);
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
    onChangeNoiseWarmthAmount(presetSettings.noiseWarmthAmount);
    onChangeNoiseAirAmount(presetSettings.noiseAirAmount);
    onChangeNoisePresenceAmount(presetSettings.noisePresenceAmount);
    onChangeDelayAmount(presetSettings.delayAmount);
    onChangeReverbAmount(presetSettings.reverbAmount);
    onChangeChorusAmount(presetSettings.chorusAmount);
    onChangeTapeSaturationAmount(presetSettings.tapeSaturationAmount);
    onChangeCompressorAmount(presetSettings.compressorAmount);
    onChangeFxOutputTrimAmount(presetSettings.fxOutputTrimAmount);
    onChangeInputTrimAmount(presetSettings.inputTrimAmount);
  };

  if (mode === "audio-settings") {
    return (
      <div className="mt-3 space-y-3 rounded-xl border border-[#cac0b2] bg-[#ede8e2] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#12141c]">Audio settings</p>
            <p className="text-[11px] text-[#7a7268]">Shape the sound with effects, noise, and space.</p>
          </div>
          <button
            type="button"
            onClick={onBackToPlayback}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-3 py-2 text-[#12141c] hover:bg-[#e2ddd5]"
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
                : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
            ].join(" ")}
          >
            <Waves size={16} />
            <span>{isAudioFxEnabled ? "Effects on" : "Effects off"}</span>
          </button>
          <button
            type="button"
            onClick={onToggleNoise}
            className={[
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
              isNoiseEnabled
                ? "border-fuchsia-400 bg-fuchsia-500/20"
                : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
            ].join(" ")}
          >
            <Mic2 size={16} />
            {isNoiseEnabled ? "Noise on" : "Noise off"}
          </button>
        </div>

        <div className="rounded-xl border border-[#cac0b2] bg-[#eae6df] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a7268]">
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
                    : "border-[#bcb4a6] bg-[#f5f1ea] text-[#2c2418] hover:bg-[#e2ddd5]",
                ].join(" ")}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#cac0b2] bg-[#eae6df] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a7268]">
            Effects
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
                <span>Crush noise</span>
                <span>{Math.round(bitCrushNoiseAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bitCrushNoiseAmount}
                onChange={(ev) => {
                  onChangeBitCrushNoiseAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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

        <div className="rounded-xl border border-[#cac0b2] bg-[#eae6df] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a7268]">
            Space
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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

        <div className="rounded-xl border border-[#cac0b2] bg-[#eae6df] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a7268]">
            Dynamics
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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

        <div className="rounded-xl border border-[#cac0b2] bg-[#eae6df] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a7268]">
            Output / Input
          </p>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
                <span>Input Trim</span>
                <span>{Math.round(inputTrimAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={inputTrimAmount}
                onChange={(ev) => {
                  onChangeInputTrimAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#cac0b2] bg-[#eae6df] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a7268]">
            Noise
          </p>
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
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
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
              <span>Warmth</span>
              <span>{Math.round(noiseWarmthAmount * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={noiseWarmthAmount}
              onChange={(ev) => {
                onChangeNoiseWarmthAmount(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
              <span>Air</span>
              <span>{Math.round(noiseAirAmount * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={noiseAirAmount}
              onChange={(ev) => {
                onChangeNoiseAirAmount(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
              <span>Presence</span>
              <span>{Math.round(noisePresenceAmount * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={noisePresenceAmount}
              onChange={(ev) => {
                onChangeNoisePresenceAmount(Number(ev.currentTarget.value));
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
      <style>{`
        @keyframes long-press-native-hint {
          0%, 100% { opacity: 0.20; }
          50% { opacity: 0.80; }
        }
      `}</style>
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
            <div className="mb-1 flex items-center justify-between text-[11px] text-[#7a7268]">
              <span>{transportBarMeta.leftLabel}</span>
              <span>{transportBarMeta.rightLabel}</span>
            </div>
            <input
              type="range"
              min={transportBarMeta.min}
              max={transportBarMeta.max}
              step={transportBarMeta.step}
              value={transportBarMeta.value}
              onChange={(ev) => {
                transportBarMeta.onChange(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              {...playPauseLongPressHandlers}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
              className={[
                "relative select-none overflow-hidden inline-flex min-h-11 items-center justify-center rounded-lg border px-3 py-2 text-[#12141c]",
                isPlayPauseHolding
                  ? "border-[#7fd4a8] bg-[#c9ecd7]"
                  : "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20",
              ].join(" ")}
            >
              {isPlayPauseHolding && (
                <span
                  className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                  style={{ animation: "long-press-charge 0.6s linear forwards" }}
                />
              )}
              {isPlaying ? <Pause size={16} className="relative z-10" /> : <Play size={16} className="relative z-10" />}
            </button>
            <button
              type="button"
              {...volumeLongPressHandlers}
              aria-label="Volume"
              title="Volume"
              className={[
                "relative select-none overflow-hidden inline-flex min-h-11 items-center justify-center rounded-lg border px-3 py-2 text-[#12141c]",
                isVolumeHolding || activeTransportBar === "volume"
                  ? "border-[#bcb4a6] bg-[#e2ddd5]"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
              ].join(" ")}
            >
              {isVolumeHolding && (
                <span
                  className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                  style={{ animation: "long-press-charge 0.6s linear forwards" }}
                />
              )}
              {isMuted || volume === 0 ? <VolumeX size={16} className="relative z-10" /> : <Volume2 size={16} className="relative z-10" />}
            </button>
            <button
              type="button"
              {...loopButtonHandlers}
              aria-label={loopLabel}
              title={loopLabel}
              className={[
                "relative select-none overflow-hidden inline-flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg border px-3 py-2 text-[#12141c]",
                isLoopHolding || loopActive
                  ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
              ].join(" ")}
            >
              {isLoopHolding && (
                <span
                  className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                  style={{ animation: "long-press-charge 0.6s linear forwards" }}
                />
              )}
              {loopIcon}
              <span className="relative z-10 text-[9px] font-semibold uppercase leading-none tracking-[0.08em]">
                {loopShortLabel}
              </span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setActiveTransportBar((current) => (current === "speed" ? "seek" : "speed"));
                }}
                aria-label={`Speed ${playbackRate}x`}
                title={`Speed ${playbackRate}x`}
                className={[
                  "inline-flex min-h-11 w-full items-center justify-center rounded-lg border px-3 py-2 text-[#12141c]",
                  activeTransportBar === "speed"
                    ? "border-[#bcb4a6] bg-[#e2ddd5]"
                    : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                ].join(" ")}
              >
                <Gauge size={14} />
              </button>
            </div>

            {true ? (
              <div className="col-span-4 grid grid-cols-6 gap-2">
                <button
                  type="button"
                  onClick={() => { if (hasVideo) onStepFrame(-1); }}
                  disabled={!hasVideo}
                  aria-label="Previous frame"
                  title="Previous frame"
                  className={["col-span-1 inline-flex min-h-11 items-center justify-center rounded-lg border px-2 py-2",
                    hasVideo ? "border-[#bcb4a6] bg-[#f5f1ea] text-[#12141c] hover:bg-[#e2ddd5]" : "border-[#bcb4a6]/40 bg-[#f5f1ea]/40 text-[#12141c]/30 cursor-default"].join(" ")}
                >
                  <StepBack size={16} />
                </button>
                <button
                  type="button"
                  {...prevTrackHandlers}
                  className={["col-span-2 relative select-none overflow-hidden inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
                    isPrevHolding ? "border-[#bcb4a6] bg-[#e2ddd5]" : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]"].join(" ")}
                >
                  {isPrevHolding && onPrevTrack && (
                    <span className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                      style={{ animation: "long-press-charge 0.6s linear forwards" }} />
                  )}
                  <SkipBack size={16} className="relative z-10" />
                  <span className="relative z-10">{prevTrackLabel}</span>
                </button>
                <button
                  type="button"
                  {...nextTrackHandlers}
                  className={["col-span-2 relative select-none overflow-hidden inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
                    isNextHolding ? "border-[#bcb4a6] bg-[#e2ddd5]" : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]"].join(" ")}
                >
                  {isNextHolding && onNextTrack && (
                    <span className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                      style={{ animation: "long-press-charge 0.6s linear forwards" }} />
                  )}
                  <SkipForward size={16} className="relative z-10" />
                  <span className="relative z-10">{nextTrackLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { if (hasVideo) onStepFrame(1); }}
                  disabled={!hasVideo}
                  aria-label="Next frame"
                  title="Next frame"
                  className={["col-span-1 inline-flex min-h-11 items-center justify-center rounded-lg border px-2 py-2",
                    hasVideo ? "border-[#bcb4a6] bg-[#f5f1ea] text-[#12141c] hover:bg-[#e2ddd5]" : "border-[#bcb4a6]/40 bg-[#f5f1ea]/40 text-[#12141c]/30 cursor-default"].join(" ")}
                >
                  <StepForward size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  {...prevTrackHandlers}
                  className={["relative select-none overflow-hidden inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
                    isPrevHolding ? "border-[#bcb4a6] bg-[#e2ddd5]" : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]"].join(" ")}
                >
                  {isPrevHolding && onPrevTrack && (
                    <span className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                      style={{ animation: "long-press-charge 0.6s linear forwards" }} />
                  )}
                  <SkipBack size={16} className="relative z-10" />
                  <span className="relative z-10">{prevTrackLabel}</span>
                </button>
                <button
                  type="button"
                  {...nextTrackHandlers}
                  className={["relative select-none overflow-hidden inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-[#12141c]",
                    isNextHolding ? "border-[#bcb4a6] bg-[#e2ddd5]" : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]"].join(" ")}
                >
                  {isNextHolding && onNextTrack && (
                    <span className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                      style={{ animation: "long-press-charge 0.6s linear forwards" }} />
                  )}
                  <SkipForward size={16} className="relative z-10" />
                  <span className="relative z-10">{nextTrackLabel}</span>
                </button>
              </>
            )}
          </div>
        </>
      )}

      {nativePlaybackNeedsReload && (
        <p className="mb-1 flex items-center justify-center gap-2 rounded-lg bg-amber-500/15 px-2 py-1.5 text-[11px] text-amber-800">
          {locale === "ja" ? "リロードしてください" : "Please reload"}
          <button
            type="button"
            onClick={() => { window.location.reload(); }}
            className="rounded border border-amber-600/40 bg-amber-500/20 px-1.5 py-0.5 text-[10px] hover:bg-amber-500/40"
          >
            Reload
          </button>
        </p>
      )}
      <div className="flex gap-2">
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="relative min-w-0" {...tooltipHandlers("video")}>
            <button
              type="button"
              disabled={isVideoFxUnavailable}
              {...(isVideoFxUnavailable ? {} : videoButtonHandlers)}
              className={`relative flex w-full select-none overflow-hidden min-h-10 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors duration-150 ${
                isVideoFxUnavailable
                  ? "cursor-not-allowed border-[#111014]/20 bg-[#111014]/30 text-white/40"
                  : isVideoHolding
                  ? "border-amber-400/70 bg-[#2a2316] text-amber-200"
                  : isVideoFxEnabled
                    ? "border-amber-500/60 bg-amber-500/15 text-black shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "border-[#111014]/30 bg-[#111014] text-white hover:bg-[#2a2a32]"
              }`}
            >
              {isVideoHolding && (
                <span
                  className="pointer-events-none absolute inset-0 origin-left bg-amber-400/20"
                  style={{ animation: "long-press-charge 0.6s linear forwards" }}
                />
              )}
              <SlidersHorizontal size={16} className="relative z-10" />
              <span className="relative z-10">{isVideoSettingsOpen ? "Close Video" : "Video"}</span>
              {isVideoFxUnavailable && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-current opacity-70"
                  style={{ transform: "rotate(-14deg)" }}
                />
              )}
            </button>
            {renderTooltip("video", tooltipText.video)}
          </div>
          <div className="relative min-w-0" {...tooltipHandlers("audio")}>
            <button
              type="button"
              disabled={effectiveAudioFxUnavailable}
              {...(effectiveAudioFxUnavailable ? {} : audioButtonHandlers)}
              title={
                effectiveAudioFxUnavailable
                  ? locale === "ja"
                    ? isNativePlaybackMode
                      ? "Native mode では Audio 設定は使えません"
                      : "HLS(ffmpeg)ストリーミング中はAudio設定が効きません"
                    : isNativePlaybackMode
                      ? "Audio settings are unavailable in native mode"
                      : "Audio settings have no effect while streaming via HLS (ffmpeg)"
                : undefined
              }
              className={`relative flex w-full select-none overflow-hidden min-h-10 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors duration-150 ${
                effectiveAudioFxUnavailable
                  ? "cursor-not-allowed border-[#111014]/20 bg-[#111014]/30 text-white/40"
                  : isAudioHolding
                    ? "border-sky-400/70 bg-[#111a24] text-sky-200"
                    : isAudioFxEnabled
                      ? "border-sky-500/60 bg-sky-500/15 text-black shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                      : "border-[#111014]/30 bg-[#111014] text-white hover:bg-[#2a2a32]"
              }`}
            >
              {isAudioHolding && !effectiveAudioFxUnavailable && (
                <span
                  className="pointer-events-none absolute inset-0 origin-left bg-sky-400/20"
                  style={{ animation: "long-press-charge 0.6s linear forwards" }}
                />
              )}
              <Mic2 size={16} className="relative z-10" />
              <span className="relative z-10">Audio</span>
              {effectiveAudioFxUnavailable && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-current opacity-70"
                  style={{ transform: "rotate(-14deg)" }}
                />
              )}
            </button>
            {renderTooltip("audio", tooltipText.audio)}
          </div>
          {/* Short press: reset settings. Long press: toggle native playback mode. */}
          <div className="relative min-w-0">
            <button
              type="button"
              {...resetButtonHandlers}
              {...tooltipHandlers("reset")}
              className={`relative flex w-full select-none overflow-hidden min-h-10 items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors duration-150 ${
                isResetHolding
                  ? "border-amber-400/70 bg-[#2a2316] text-amber-200"
                  : isNativePlaybackMode
                    ? "border-amber-500/60 bg-amber-500/15 text-black shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "border-rose-500/40 bg-rose-500/10 text-[#12141c] hover:bg-rose-500/20"
              }`}
            >
              {isNativePlaybackMode && !isResetHolding && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-lg bg-amber-400/20"
                  style={{ animation: "long-press-native-hint 1.8s ease-in-out infinite" }}
                />
              )}
              {isResetHolding && (
                <span
                  className="pointer-events-none absolute inset-0 origin-left bg-amber-400/20"
                  style={{ animation: "long-press-charge 0.6s linear forwards" }}
                />
              )}
              <RotateCcw size={15} className="relative z-10" />
              <span className="relative z-10">{isNativePlaybackMode ? "Native" : "Reset"}</span>
            </button>
            {renderTooltip("reset", tooltipText.reset)}
          </div>
        </div>
        {!hasPlayback && (
          <button
            type="button"
            {...loopButtonHandlers}
            aria-label={loopLabel}
            title={loopLabel}
            className={[
              "relative select-none overflow-hidden inline-flex min-h-10 min-w-11 flex-col items-center justify-center gap-0.5 rounded-lg border px-1 text-[#12141c]",
              isLoopHolding || loopActive
                ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20"
                : "border-[#bcb4a6] bg-[#e6e2db] text-[#7a7268] hover:bg-[#d4ccc0] hover:text-[#12141c]",
            ].join(" ")}
          >
            {isLoopHolding && (
              <span
                className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                style={{ animation: "long-press-charge 0.6s linear forwards" }}
              />
            )}
            <span className="relative z-10">{loopIconSm}</span>
            <span className="relative z-10 text-[8px] font-semibold uppercase leading-none tracking-[0.06em]">
              {loopShortLabel}
            </span>
          </button>
        )}
        <div className="relative">
          <button
            type="button"
            {...saveButtonHandlers}
            {...tooltipHandlers("save")}
            title="Save settings to file (long-press for clock overlay)"
            className={[
              "relative select-none overflow-hidden inline-flex min-h-10 w-8 items-center justify-center rounded-lg border text-[#7a7268] hover:bg-[#d4ccc0] hover:text-[#12141c]",
              showClockOverlay
                ? "border-emerald-500/50 bg-emerald-500/15"
                : "border-[#bcb4a6] bg-[#e6e2db]",
            ].join(" ")}
          >
            {isSaveHolding && (
              <span
                className="pointer-events-none absolute inset-0 origin-left bg-emerald-400/20"
                style={{ animation: "long-press-charge 0.6s linear forwards" }}
              />
            )}
            <Save size={13} className="relative z-10" />
          </button>
          {renderTooltip("save", tooltipText.save, "w-44")}
        </div>
        <div className="relative">
          <button
            type="button"
            {...loadButtonHandlers}
            {...tooltipHandlers("load")}
            title="Load settings from .retro.json file (long-press for FFT overlay)"
            className={[
              "relative select-none overflow-hidden inline-flex min-h-10 w-8 items-center justify-center rounded-lg border text-[#7a7268] hover:bg-[#d4ccc0] hover:text-[#12141c]",
              showVideoSpectrum
                ? "border-emerald-500/50 bg-emerald-500/15"
                : "border-[#bcb4a6] bg-[#e6e2db]",
            ].join(" ")}
          >
            {isLoadHolding && (
              <span
                className="pointer-events-none absolute inset-0 origin-left bg-emerald-400/20"
                style={{ animation: "long-press-charge 0.6s linear forwards" }}
              />
            )}
            <FolderOpen size={13} className="relative z-10" />
          </button>
          {renderTooltip("load", tooltipText.load, "w-44")}
        </div>
      </div>
      {hasPlayback && (
        <p className="hidden text-[11px] text-[#9a948c]">
          Shortcuts: `Space`/`K` play-pause, `Left/Right` seek 5s, `J/L` seek 10s
        </p>
      )}
    </div>
  );
});
