import React from "react";
import { createPortal } from "react-dom";
import {
  Aperture,
  ArrowLeftRight,
  Bell,
  Circle,
  FlipHorizontal,
  FlipVertical,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Pause,
  Pin,
  Play,
  Power,
  Square,
  Sun,
} from "lucide-react";
import {
  RETRO_AUDIO_AMOUNT_KEYS,
  RETRO_AUDIO_PRESETS,
  type RetroAudioAmountSetters,
  type RetroAudioPresetKey,
  type RetroAudioSettings,
} from "../audio/preset";
import { resolvePlaybackProfileDefaults } from "../platform/runtime";
import { RETRO_PRESETS, type RetroPresetKey } from "../retro/config";
import type { RetroAlarmStatus } from "../hooks/useRetroAlarm";
import { useAnchoredPopover } from "../hooks/useAnchoredPopover";
import { useLongPress } from "../hooks/useLongPress";
import type { RetroPlayerLocale } from "../types";

const AUDIO_PRESET_KEYS = Object.keys(RETRO_AUDIO_PRESETS) as RetroAudioPresetKey[];
const VIDEO_PRESET_KEYS = Object.keys(RETRO_PRESETS) as RetroPresetKey[];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainSeconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(2, "0")}`;
};

function QuickStepperRow({
  label,
  valueLabel,
  onDecrease,
  onIncrease,
  disabledDecrease,
  disabledIncrease,
}: {
  label: string;
  valueLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
  disabledDecrease?: boolean;
  disabledIncrease?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="w-full truncate text-center text-[9px] text-slate-400">{label}</span>
      <div className="flex w-full items-center justify-center gap-0.5">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={onDecrease}
          disabled={disabledDecrease}
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-600 bg-slate-900/70 text-xs leading-none text-slate-200 transition hover:bg-slate-800 disabled:opacity-40"
        >
          −
        </button>
        <span className="min-w-0 flex-1 text-center text-[9px] leading-tight tabular-nums text-slate-200">
          {valueLabel}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={onIncrease}
          disabled={disabledIncrease}
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-600 bg-slate-900/70 text-xs leading-none text-slate-200 transition hover:bg-slate-800 disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

// Below this the compact brightness stepper doesn't fit next to
// power/hi-res/fit-width (plus the inline record button, when shown) and
// stays in the "More" menu instead.
const BRIGHTNESS_INLINE_MIN_WIDTH = 480;
const BRIGHTNESS_MIN = 0.4;
const BRIGHTNESS_MAX = 2.0;

const QUICK_SEEK_SPEED_OPTIONS = [2, 1.5, 1.25, 1, 0.75, 0.5] as const;

type RetroPreviewToolbarPlayerSlice = {
  canRecord: boolean;
  isRecording: boolean;
  isPoweredOn: boolean;
  previewKind: "video" | "audio" | "image" | "capture" | null;
  audioOptimizationMode: RetroAudioSettings["audioOptimizationMode"];
  recordingContainer: RetroAudioSettings["recordingContainer"];
  nativeAudioSuppressionOverride: boolean | null;
  preferNativeHlsOverride: boolean | null;
  latencyHint: AudioContextLatencyCategory;
  isPlaying: boolean;
  togglePlayback: () => Promise<void>;
  currentTime: number;
  duration: number;
  seekTo: (nextTime: number) => void;
  volume: number;
  changeVolume: (nextVolume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  playbackRate: number;
  changePlaybackRate: (nextRate: number) => void;
  isAudioFxEnabled: boolean;
  toggleAudioFx: () => void;
  isNoiseEnabled: boolean;
  toggleNoise: () => void;
} & Pick<RetroAudioSettings, (typeof RETRO_AUDIO_AMOUNT_KEYS)[number]> & RetroAudioAmountSetters;

type RetroPreviewToolbarProps = {
  locale: RetroPlayerLocale;
  player: RetroPreviewToolbarPlayerSlice;
  isHighResolution: boolean;
  renderResolutionPreset: 1 | 2;
  isFitWidthEnabled: boolean;
  isPinnedPreview: boolean;
  isPreviewMaximized: boolean;
  brightness: number;
  flipH: boolean;
  flipV: boolean;
  alarmTime: string;
  alarmTargetAt: number | null;
  alarmStatus: RetroAlarmStatus;
  formatAlarmTarget: (targetAt: number) => string;
  onAlarmTimeChange: (value: string) => void;
  onArmAlarm: () => void;
  onArmAlarmIn: (minutes: number) => void;
  onClearAlarm: () => void;
  onTestAlarm: () => void;
  onRecordClick: () => void;
  onPowerToggle: () => void;
  onPowerLongPress: () => void;
  onHighResolutionToggle: () => void;
  onFitWidthToggle: () => void;
  onPinToggle: () => void;
  onMaximizeToggle: () => void;
  onBrightnessChange: (value: number) => void;
  onFlipHToggle: () => void;
  onFlipVToggle: () => void;
  onAudioOptimizationModeChange: (nextMode: RetroAudioSettings["audioOptimizationMode"]) => void;
  onRecordingContainerChange: (nextMode: RetroAudioSettings["recordingContainer"]) => void;
  onNativeAudioSuppressionOverrideChange: (nextValue: boolean | null) => void;
  onPreferNativeHlsOverrideChange: (nextValue: boolean | null) => void;
  maximizePerformanceMode: "auto" | "on" | "off";
  onMaximizePerformanceModeChange: (nextValue: "auto" | "on" | "off") => void;
  onLatencyHintChange: (hint: AudioContextLatencyCategory) => void;
  ffmpegUseQsv: boolean;
  onToggleFfmpegUseQsv: () => void;
  ffmpegMaxConcurrentHlsSessions: number;
  onFfmpegMaxConcurrentHlsSessionsChange: (limit: number) => void;
  selectedPreset: RetroPresetKey | null;
  onApplyPreset: (preset: RetroPresetKey) => void;
};

export function RetroPreviewToolbar({
  locale,
  player,
  isHighResolution,
  renderResolutionPreset,
  isFitWidthEnabled,
  isPinnedPreview,
  isPreviewMaximized,
  brightness,
  flipH,
  flipV,
  alarmTime,
  alarmTargetAt,
  alarmStatus,
  formatAlarmTarget,
  onAlarmTimeChange,
  onArmAlarm,
  onArmAlarmIn,
  onClearAlarm,
  onTestAlarm,
  onRecordClick,
  onPowerToggle,
  onPowerLongPress,
  onHighResolutionToggle,
  onFitWidthToggle,
  onPinToggle,
  onMaximizeToggle,
  onBrightnessChange,
  onFlipHToggle,
  onFlipVToggle,
  onAudioOptimizationModeChange,
  onRecordingContainerChange,
  onNativeAudioSuppressionOverrideChange,
  onPreferNativeHlsOverrideChange,
  maximizePerformanceMode,
  onMaximizePerformanceModeChange,
  onLatencyHintChange,
  ffmpegUseQsv,
  onToggleFfmpegUseQsv,
  ffmpegMaxConcurrentHlsSessions,
  onFfmpegMaxConcurrentHlsSessionsChange,
  selectedPreset,
  onApplyPreset,
}: RetroPreviewToolbarProps) {
  const playbackProfileDefaults = resolvePlaybackProfileDefaults(player.audioOptimizationMode);
  const isPlaybackProfileAuto =
    player.audioOptimizationMode === "auto" &&
    player.nativeAudioSuppressionOverride === null &&
    player.preferNativeHlsOverride === null;
  const restorePlaybackProfileAuto = () => {
    onAudioOptimizationModeChange("auto");
    onNativeAudioSuppressionOverrideChange(null);
    onPreferNativeHlsOverrideChange(null);
  };
  const isMaximizeRenderCapAutoEnabled =
    player.previewKind === "video" || player.previewKind === "capture";
  const tooltipText =
    locale === "ja"
      ? {
          recordIdle: "録画: 現在のレトロ出力を記録します。",
          recordStop: "録画: 停止して書き出します。",
          powerOn: "Power: フィルターをオンにします。長押しで描画系を再起動します。",
          powerOff: "Power: フィルターをオフにします。長押しで描画系を再起動します。",
          hiRes: `Hi-res: 1x / 2x を切り替えます。現在 ${renderResolutionPreset}x。`,
          fitWidthOn: "Fit width: 有効です。",
          fitWidthOff: "Fit width: プレビューを横幅いっぱいに広げます。",
          pinUnavailable: "Pin: 最大化中は使えません。",
          pinOn: "Pin: プレビューを画面内に固定します。",
          pinOff: "Pin: スクロール中も見えるようにします。",
          maximizeOn: "Maximize: 通常表示に戻します。",
          maximizeOff: "Maximize: プレビューを全画面表示します。",
          alarmIdle: "Alarm: 指定時刻にメディア再生か通知音を鳴らします。",
          alarmArmed: "Alarm: 時刻を待っています。",
          qsv: "Use hardware encode when available",
          qsvDescription: "Windows は QSV、macOS は VideoToolbox を優先します",
          maximizeRenderCap: "Maximize render cap",
          maximizeRenderCapDescription:
            "最大化中だけ内部描画サイズを抑えて、低性能PCでのカクつきを減らします。",
          hlsSlots: "HLS ffmpeg slots",
          hlsSlotsDescription: "同時実行数の上限。変更は再生切替後に安定し、再起動後も保持されます。",
          enabled: "有効",
          disabled: "無効",
        }
      : {
          recordIdle: "Record: capture the current retro output.",
          recordStop: "Record: stop and export clip.",
          powerOn: "Power: turn filter on. Long press resets the renderer.",
          powerOff: "Power: turn filter off. Long press resets the renderer.",
          hiRes: `Hi-res: toggle between 1x and 2x. Current ${renderResolutionPreset}x.`,
          fitWidthOn: "Fit width: enabled.",
          fitWidthOff: "Fit width: stretch preview to the frame width.",
          pinUnavailable: "Pin: unavailable while maximize is active.",
          pinOn: "Pin: keep preview fixed on screen.",
          pinOff: "Pin: keep preview visible while you scroll.",
          maximizeOn: "Maximize: return to normal view.",
          maximizeOff: "Maximize: open the preview full screen.",
          alarmIdle: "Alarm: play media or a fallback tone at the selected time.",
          alarmArmed: "Alarm: armed and waiting for the selected time.",
          qsv: "Use hardware encode when available",
          qsvDescription: "Prefers QSV on Windows and VideoToolbox on macOS",
          maximizeRenderCap: "Maximize render cap",
          maximizeRenderCapDescription:
            "While maximized, limit the internal render size to reduce stutter on lower-end PCs.",
          hlsSlots: "HLS ffmpeg slots",
          hlsSlotsDescription: "Maximum concurrent ffmpeg HLS jobs. Persisted and safe to apply on the next playback cycle.",
          enabled: "On",
          disabled: "Off",
      };
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const [isNarrow, setIsNarrow] = React.useState(
    () => typeof window !== "undefined" && window.innerWidth < 360,
  );
  const [isBrightnessInlineVisible, setIsBrightnessInlineVisible] = React.useState(
    () => typeof window !== "undefined" && window.innerWidth >= BRIGHTNESS_INLINE_MIN_WIDTH,
  );
  const [activeTooltipKey, setActiveTooltipKey] = React.useState<string | null>(null);
  const [moreMenuStyle, setMoreMenuStyle] = React.useState<React.CSSProperties | null>(null);
  const moreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const moreMenuRef = React.useRef<HTMLDivElement | null>(null);
  const tooltipTimerRef = React.useRef<number | null>(null);

  const quickSeekPopover = useAnchoredPopover(260, 90);
  const presetPopover = useAnchoredPopover(260, 90);
  const avPopover = useAnchoredPopover(360, 90);
  const eqPopover = useAnchoredPopover(300, 140);

  const scheduleTooltip = React.useCallback((key: string) => {
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
    }

    tooltipTimerRef.current = window.setTimeout(() => {
      setActiveTooltipKey(key);
      tooltipTimerRef.current = null;
    }, 120);
  }, []);

  const hideTooltip = React.useCallback(() => {
    if (tooltipTimerRef.current !== null) {
      window.clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }

    setActiveTooltipKey(null);
  }, []);

  React.useEffect(() => {
    return () => {
      if (tooltipTimerRef.current !== null) {
        window.clearTimeout(tooltipTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    const handler = () => {
      setIsNarrow(window.innerWidth < 360);
      setIsBrightnessInlineVisible(window.innerWidth >= BRIGHTNESS_INLINE_MIN_WIDTH);
    };
    window.addEventListener("resize", handler, { passive: true });
    return () => { window.removeEventListener("resize", handler); };
  }, []);

  const adjustBrightness = React.useCallback((delta: number) => {
    const next = Math.min(
      BRIGHTNESS_MAX,
      Math.max(BRIGHTNESS_MIN, Math.round((brightness + delta) * 20) / 20),
    );
    onBrightnessChange(next);
  }, [brightness, onBrightnessChange]);

  // Audio presets have no single reactive "current" value (unlike video
  // presets), so the stepper just remembers where it last left off.
  const [audioPresetIndex, setAudioPresetIndex] = React.useState(0);

  const applyAudioPresetAtIndex = React.useCallback((index: number) => {
    const clamped = Math.min(AUDIO_PRESET_KEYS.length - 1, Math.max(0, index));
    setAudioPresetIndex(clamped);
    const presetSettings = RETRO_AUDIO_PRESETS[AUDIO_PRESET_KEYS[clamped]].settings;

    if (presetSettings.isAudioFxEnabled !== player.isAudioFxEnabled) {
      player.toggleAudioFx();
    }
    if (presetSettings.isNoiseEnabled !== player.isNoiseEnabled) {
      player.toggleNoise();
    }
    for (const key of RETRO_AUDIO_AMOUNT_KEYS) {
      const setterName = `set${key[0].toUpperCase()}${key.slice(1)}` as keyof RetroPreviewToolbarPlayerSlice;
      (player[setterName] as (value: number) => void)(presetSettings[key]);
    }
  }, [player]);

  const videoPresetIndex = selectedPreset ? VIDEO_PRESET_KEYS.indexOf(selectedPreset) : -1;

  const updateMoreMenuPosition = React.useCallback(() => {
    if (typeof window === "undefined" || !moreButtonRef.current) return;

    const rect = moreButtonRef.current.getBoundingClientRect();
    const margin = 8;
    const width = Math.min(256, Math.max(220, window.innerWidth - margin * 2));
    const menuHeight = moreMenuRef.current?.offsetHeight ?? 360;
    const spaceAbove = Math.max(0, rect.top - margin);
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - margin);
    const openUp = spaceAbove > spaceBelow && spaceAbove >= 180;
    const maxHeight = Math.min(
      512,
      Math.max(180, openUp ? spaceAbove : spaceBelow),
    );

    const left = Math.min(
      Math.max(margin, rect.left),
      Math.max(margin, window.innerWidth - width - margin),
    );

    const top = openUp
      ? Math.max(margin, rect.top - Math.min(menuHeight, maxHeight) - margin)
      : Math.min(
          rect.bottom + margin,
          Math.max(margin, window.innerHeight - Math.min(menuHeight, maxHeight) - margin),
        );

    setMoreMenuStyle({
      position: "fixed",
      left,
      top,
      width,
      maxHeight,
      zIndex: 1000,
    });
  }, []);

  React.useEffect(() => {
    if (!isMoreOpen) return;

    updateMoreMenuPosition();

    const handleWindowChange = () => {
      updateMoreMenuPosition();
    };
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !moreMenuRef.current?.contains(target) &&
        !moreButtonRef.current?.contains(target)
      ) {
        setIsMoreOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
      }
    };

    window.addEventListener("resize", handleWindowChange, { passive: true });
    window.addEventListener("scroll", handleWindowChange, { passive: true });
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange);
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoreOpen, updateMoreMenuPosition]);

  const { isHolding: isMoreHolding, ...moreLongPressHandlers } = useLongPress(
    React.useCallback(() => {
      setIsMoreOpen(false);
      quickSeekPopover.setIsOpen((v) => !v);
    }, [quickSeekPopover]),
    React.useCallback(() => {
      hideTooltip();
      setIsMoreOpen((v) => !v);
    }, [hideTooltip]),
  );

  const { isHolding: isHiResHolding, ...hiResLongPressHandlers } = useLongPress(
    React.useCallback(() => { presetPopover.setIsOpen((v) => !v); }, [presetPopover]),
    React.useCallback(() => { hideTooltip(); onHighResolutionToggle(); }, [hideTooltip, onHighResolutionToggle]),
  );

  const { isHolding: isPowerHolding, ...powerLongPressHandlers } = useLongPress(
    React.useCallback(() => { hideTooltip(); onPowerLongPress(); }, [hideTooltip, onPowerLongPress]),
    React.useCallback(() => { hideTooltip(); onPowerToggle(); }, [hideTooltip, onPowerToggle]),
  );

  const { isHolding: isFitWidthHolding, ...fitWidthLongPressHandlers } = useLongPress(
    React.useCallback(() => { avPopover.setIsOpen((v) => !v); }, [avPopover]),
    React.useCallback(() => { hideTooltip(); onFitWidthToggle(); }, [hideTooltip, onFitWidthToggle]),
  );

  const { isHolding: isPinHolding, ...pinLongPressHandlers } = useLongPress(
    React.useCallback(() => { eqPopover.setIsOpen((v) => !v); }, [eqPopover]),
    React.useCallback(() => { hideTooltip(); onPinToggle(); }, [hideTooltip, onPinToggle]),
  );

  const floatingButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm";
  const glowingFloatingButtonClass =
    "border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28";
  const idleFloatingButtonClass =
    "border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90";
  const pillButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm";

  const renderTooltip = (key: string, text: string, widthClass = "w-44") => (
    <div
      role="tooltip"
      aria-hidden={activeTooltipKey !== key}
      className={[
        "pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",
        widthClass,
        activeTooltipKey === key ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
      ].join(" ")}
    >
      {text}
    </div>
  );

  return (
    <>
      <div className="relative">
        <button
          ref={(node) => {
            moreButtonRef.current = node;
            quickSeekPopover.anchorRef.current = node;
          }}
          type="button"
          aria-label="More options"
          title="More options (long-press for play/seek)"
          {...moreLongPressHandlers}
          className={[
            floatingButtonClass,
            "relative select-none overflow-hidden",
            isMoreOpen || quickSeekPopover.isOpen || isMoreHolding || brightness !== 1.0 || flipH || flipV
              ? glowingFloatingButtonClass
              : idleFloatingButtonClass,
          ].join(" ")}
        >
          {isMoreHolding && (
            <span
              className="pointer-events-none absolute inset-0 origin-left bg-emerald-400/20"
              style={{ animation: "long-press-charge 0.6s linear forwards" }}
            />
          )}
          <MoreHorizontal size={16} className="relative z-10" />
        </button>
        {quickSeekPopover.isOpen && quickSeekPopover.style && typeof document !== "undefined" && createPortal(
          <div
            ref={quickSeekPopover.popoverRef}
            style={quickSeekPopover.style}
            className="flex flex-col gap-2.5 rounded-xl border border-slate-600/80 bg-slate-950/96 p-2.5 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={player.isPlaying ? "Pause" : "Play"}
                onClick={() => { void player.togglePlayback(); }}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/78 text-slate-100 transition hover:bg-slate-800/90"
              >
                {player.isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="w-10 shrink-0 text-[10px] tabular-nums text-slate-400">
                {formatTime(player.currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={player.duration || 0}
                step={0.1}
                value={Math.min(player.currentTime, player.duration || 0)}
                onChange={(e) => { player.seekTo(Number(e.currentTarget.value)); }}
                className="h-1.5 min-w-0 flex-1 accent-emerald-400"
              />
              <span className="w-10 shrink-0 text-right text-[10px] tabular-nums text-slate-400">
                {formatTime(player.duration)}
              </span>
            </div>
          </div>,
          document.body,
        )}
        {isMoreOpen && moreMenuStyle && typeof document !== "undefined" && createPortal(
          <div
            ref={moreMenuRef}
            style={moreMenuStyle}
            className="overflow-y-auto overscroll-contain rounded-xl border border-slate-600/80 bg-slate-950/96 p-3 shadow-xl backdrop-blur-sm"
          >
            <div className="sticky top-0 z-10 mb-3 border-b border-slate-700/90 bg-slate-950/98 py-2 text-[10px] uppercase tracking-[0.24em] text-slate-500 backdrop-blur-sm">
              menu
            </div>
            <div className="mb-3 border-b border-slate-700 pb-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Playback Profile</span>
                <button
                  type="button"
                  onClick={restorePlaybackProfileAuto}
                  className={[
                    "rounded border px-2 py-1 text-[10px] uppercase tracking-[0.2em] transition",
                    isPlaybackProfileAuto
                      ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50"
                      : "border-slate-700 bg-slate-900/70 text-slate-400 hover:bg-slate-800",
                  ].join(" ")}
                >
                  Auto
                </button>
              </div>
              <div className="mb-2 text-[10px] leading-4 text-slate-500">
                {locale === "ja"
                  ? "環境に合わせて自動調整します。必要なときだけ個別 override を変更してください。"
                  : "Adjust automatically for the current environment. Change overrides only when needed."}
              </div>
              <div className="mb-2 rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-[10px] text-slate-300">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div>
                    <div>Recording container</div>
                    <div className="text-[9px] text-slate-500">
                      {locale === "ja"
                        ? "Safari で再生しやすい形式に切り替えます。"
                        : "Switch the recorded file container for easier playback."}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    {
                      label:
                        player.recordingContainer === "auto"
                          ? `Preset ${playbackProfileDefaults.preferNativeHls ? "MP4" : "WebM"}`
                          : "Auto",
                      value: "auto",
                    },
                    { label: "WebM", value: "webm" },
                    { label: "MP4", value: "mp4" },
                  ].map((option) => {
                    const isActive = player.recordingContainer === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          onRecordingContainerChange(
                            option.value as RetroAudioSettings["recordingContainer"],
                          );
                        }}
                        className={[
                          "rounded border px-1.5 py-1 text-[9px] transition",
                          isActive
                            ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50"
                            : "border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800",
                        ].join(" ")}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 space-y-2 rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-[10px] text-slate-300">
                {[
                  {
                    key: "native-gain",
                    label: "Suppress native gain",
                    value: player.nativeAudioSuppressionOverride,
                    effectiveValue:
                      player.nativeAudioSuppressionOverride ?? playbackProfileDefaults.nativeAudioSuppression,
                    onChange: onNativeAudioSuppressionOverrideChange,
                  },
                  {
                    key: "native-hls",
                    label: "Prefer native HLS",
                    value: player.preferNativeHlsOverride,
                    effectiveValue:
                      player.preferNativeHlsOverride ?? playbackProfileDefaults.preferNativeHls,
                    onChange: onPreferNativeHlsOverrideChange,
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div>{item.label}</div>
                      <div className="text-[9px] text-slate-500">
                        {item.value === null
                          ? `Auto now: ${item.effectiveValue ? "On" : "Off"}`
                          : item.effectiveValue
                            ? "Override: On"
                            : "Override: Off"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        {
                          label: item.effectiveValue ? "Preset On" : "Preset Off",
                          value: null,
                        },
                        { label: "On", value: true },
                        { label: "Off", value: false },
                      ].map((option) => {
                        const isActive = item.value === option.value;
                        return (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() => item.onChange(option.value)}
                            className={[
                              "rounded border px-1.5 py-1 text-[9px] transition",
                              isActive
                                ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50"
                                : "border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800",
                            ].join(" ")}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-[10px] text-slate-300">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div>{tooltipText.maximizeRenderCap}</div>
                    <div className="text-[9px] text-slate-500">
                      {maximizePerformanceMode === "auto"
                        ? `Auto now: ${isMaximizeRenderCapAutoEnabled ? "On" : "Off"}`
                        : `Override: ${maximizePerformanceMode === "on" ? "On" : "Off"}`}
                    </div>
                    <div className="mt-1 text-[9px] leading-[1.45] text-slate-500">
                      {tooltipText.maximizeRenderCapDescription}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      {
                        label: isMaximizeRenderCapAutoEnabled ? "Preset On" : "Preset Off",
                        value: "auto",
                      },
                      { label: "On", value: "on" },
                      { label: "Off", value: "off" },
                    ].map((option) => {
                      const isActive = maximizePerformanceMode === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            onMaximizePerformanceModeChange(option.value as "auto" | "on" | "off");
                          }}
                          className={[
                            "rounded border px-1.5 py-1 text-[9px] transition",
                            isActive
                              ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50"
                              : "border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800",
                          ].join(" ")}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 border-b border-slate-700 pb-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Latency</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {player.latencyHint}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["interactive", "balanced", "playback"] as const).map((hint) => {
                  const isActive = player.latencyHint === hint;
                  return (
                    <button
                      key={hint}
                      type="button"
                      onClick={() => { onLatencyHintChange(hint); }}
                      className={[
                        "inline-flex min-h-8 items-center justify-center rounded-md border px-1.5 py-1 text-[11px] font-medium capitalize transition",
                        isActive
                          ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50"
                          : "border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800",
                      ].join(" ")}
                    >
                      {hint}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1.5 text-[10px] text-slate-600">Takes effect after power off/on</p>
            </div>
            <div className="mb-3 border-b border-slate-700 pb-3">
              <div className="mb-2 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                <div>
                  <div className="text-slate-300">{tooltipText.qsv}</div>
                  <p className="mt-1 text-[10px] leading-[1.45] text-slate-500">
                    {tooltipText.qsvDescription}
                  </p>
                </div>
                <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-[11px] text-slate-200">
                  <input
                    type="checkbox"
                    checked={ffmpegUseQsv}
                    onChange={onToggleFfmpegUseQsv}
                    className="h-4 w-4 rounded border-slate-500 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                  />
                  <span>{ffmpegUseQsv ? tooltipText.enabled : tooltipText.disabled}</span>
                </label>
              </div>
            </div>
            <div className="mb-3 border-b border-slate-700 pb-3">
              <div className="mb-2 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                <div>
                  <div className="text-slate-300">{tooltipText.hlsSlots}</div>
                  <p className="mt-1 text-[10px] leading-[1.45] text-slate-500">
                    {tooltipText.hlsSlotsDescription}
                  </p>
                </div>
                <input
                  type="number"
                  min={1}
                  max={8}
                  step={1}
                  value={ffmpegMaxConcurrentHlsSessions}
                  onChange={(event) => {
                    onFfmpegMaxConcurrentHlsSessionsChange(Number(event.currentTarget.value));
                  }}
                  className="w-16 rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-right text-sm text-slate-100"
                />
              </div>
            </div>
            <div className="mb-3 border-b border-slate-700 pb-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Bell size={11} />
                  Alarm
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {alarmStatus === "armed" ? "Armed" : alarmStatus === "triggered" ? "Done" : "Off"}
                </span>
              </div>
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => { onAlarmTimeChange(e.currentTarget.value); }}
                className="mb-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 outline-none transition focus:border-slate-400"
              />
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setIsMoreOpen(false); onArmAlarm(); }}
                  className={[
                    "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",
                    alarmTargetAt
                      ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50 hover:bg-cyan-400/24"
                      : "border-slate-500 bg-slate-800 text-slate-100 hover:bg-slate-700",
                  ].join(" ")}
                >
                  <Bell size={12} />
                  Set
                </button>
                <button
                  type="button"
                  onClick={onTestAlarm}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-500 bg-slate-800 px-2 py-1.5 text-xs text-slate-100 transition hover:bg-slate-700"
                >
                  Test
                </button>
                <button
                  type="button"
                  onClick={onClearAlarm}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-xs text-slate-200 transition hover:bg-slate-800"
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                {[1, 5, 10].map((min) => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => { setIsMoreOpen(false); onArmAlarmIn(min); }}
                    className="inline-flex min-h-8 flex-1 items-center justify-center rounded-md border border-slate-700 bg-slate-900/70 px-1.5 py-1 text-[11px] text-slate-300 transition hover:bg-slate-800"
                  >
                    +{min}m
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-4 text-slate-400">
                {alarmTargetAt
                  ? locale === "ja"
                    ? `次回: ${formatAlarmTarget(alarmTargetAt)}`
                    : `Next: ${formatAlarmTarget(alarmTargetAt)}`
                  : alarmStatus === "armed"
                    ? tooltipText.alarmArmed
                    : tooltipText.alarmIdle}
              </p>
              <p className="mt-1.5 text-[10px] leading-[1.45] text-slate-500">
                {locale === "ja"
                  ? "※ バックグラウンド動作はブラウザ依存。他のウィンドウが前面にある場合など、正常に動作しないことがあります。"
                  : "※ Background behavior depends on the browser and may not work reliably when another window is in front."}
              </p>
            </div>
            {isNarrow && player.canRecord && (
              <div className="mb-3 border-b border-slate-700 pb-3">
                <button
                  type="button"
                  onClick={onRecordClick}
                  className={[
                    "inline-flex w-full min-h-9 items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition",
                    player.isRecording
                      ? "border-rose-300/80 bg-rose-500/20 text-rose-50"
                      : "border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12",
                  ].join(" ")}
                >
                  {player.isRecording
                    ? <Square size={13} className="fill-current animate-pulse" />
                    : <Circle size={13} className="text-rose-300" />}
                  {player.isRecording ? "Stop REC" : "Record"}
                </button>
              </div>
            )}
            <div className="mb-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sun size={11} />
                  Brightness
                </span>
                <span>{Math.round(brightness * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="2.0"
                step="0.05"
                value={brightness}
                onChange={(e) => { onBrightnessChange(Number(e.currentTarget.value)); }}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onFlipHToggle}
                className={[
                  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",
                  flipH
                    ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                    : "border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800",
                ].join(" ")}
              >
                <FlipHorizontal size={13} />
                Flip H
              </button>
              <button
                type="button"
                onClick={onFlipVToggle}
                className={[
                  "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",
                  flipV
                    ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                    : "border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800",
                ].join(" ")}
              >
                <FlipVertical size={13} />
                Flip V
              </button>
            </div>
          </div>,
          document.body,
        )}
      </div>

      {player.canRecord && !isNarrow && (
        <div className="relative">
          <button
            type="button"
            aria-label={player.isRecording ? "Stop recording" : "Start recording"}
            onClick={onRecordClick}
            onMouseEnter={() => scheduleTooltip("record")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("record")}
            onBlur={hideTooltip}
            className={[
              pillButtonClass,
              player.isRecording
                ? "border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28"
                : "border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12",
            ].join(" ")}
          >
            {player.isRecording ? (
              <Square size={14} className="fill-current animate-pulse" />
            ) : (
              <Circle size={16} className="text-rose-300" />
            )}
          </button>
          {renderTooltip("record", player.isRecording ? tooltipText.recordStop : tooltipText.recordIdle)}
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          aria-label={player.isPoweredOn ? "Power off" : "Power on"}
          title={locale === "ja" ? "Power (長押しで renderer reset)" : "Power (long press to reset renderer)"}
          {...powerLongPressHandlers}
          onMouseEnter={() => scheduleTooltip("power")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("power")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
            player.isPoweredOn ? glowingFloatingButtonClass : idleFloatingButtonClass,
            isPowerHolding ? "scale-95" : "",
          ].join(" ")}
        >
          <Power size={16} />
        </button>
        {renderTooltip("power", player.isPoweredOn ? tooltipText.powerOff : tooltipText.powerOn)}
      </div>

      <div className="relative">
        <button
          ref={presetPopover.anchorRef}
          type="button"
          aria-label={
            renderResolutionPreset > 1
              ? `Disable high resolution (current ${renderResolutionPreset}x)`
              : "Enable high resolution"
          }
          title="Hi-Res (long-press for video/audio preset)"
          {...hiResLongPressHandlers}
          onMouseEnter={() => scheduleTooltip("hi-res")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("hi-res")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
            "relative select-none overflow-hidden",
            isHighResolution || presetPopover.isOpen
              ? glowingFloatingButtonClass
              : idleFloatingButtonClass,
          ].join(" ")}
        >
          {isHiResHolding && (
            <span
              className="pointer-events-none absolute inset-0 origin-left bg-emerald-400/20"
              style={{ animation: "long-press-charge 0.6s linear forwards" }}
            />
          )}
          <Aperture size={16} className="relative z-10" />
        </button>
        {renderTooltip("hi-res", tooltipText.hiRes)}
        {presetPopover.isOpen && presetPopover.style && typeof document !== "undefined" && createPortal(
          <div
            ref={presetPopover.popoverRef}
            style={presetPopover.style}
            className="grid grid-cols-2 gap-x-2 gap-y-2.5 rounded-xl border border-slate-600/80 bg-slate-950/96 p-2.5 shadow-xl backdrop-blur-sm"
          >
            <QuickStepperRow
              label="Video"
              valueLabel={videoPresetIndex >= 0 ? RETRO_PRESETS[VIDEO_PRESET_KEYS[videoPresetIndex]].label : "—"}
              onDecrease={() => {
                const nextIndex = Math.max(0, (videoPresetIndex === -1 ? 0 : videoPresetIndex) - 1);
                onApplyPreset(VIDEO_PRESET_KEYS[nextIndex]);
              }}
              onIncrease={() => {
                const nextIndex = Math.min(VIDEO_PRESET_KEYS.length - 1, (videoPresetIndex === -1 ? 0 : videoPresetIndex) + 1);
                onApplyPreset(VIDEO_PRESET_KEYS[nextIndex]);
              }}
            />
            <QuickStepperRow
              label="Audio"
              valueLabel={RETRO_AUDIO_PRESETS[AUDIO_PRESET_KEYS[audioPresetIndex]].label}
              onDecrease={() => { applyAudioPresetAtIndex(audioPresetIndex - 1); }}
              onIncrease={() => { applyAudioPresetAtIndex(audioPresetIndex + 1); }}
            />
          </div>,
          document.body,
        )}
      </div>

      {isBrightnessInlineVisible && (
        <div className="relative flex items-center">
          <button
            type="button"
            aria-label="Decrease brightness"
            onClick={() => { hideTooltip(); adjustBrightness(-0.05); }}
            onMouseEnter={() => scheduleTooltip("brightness")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("brightness")}
            onBlur={hideTooltip}
            disabled={brightness <= BRIGHTNESS_MIN}
            className={[
              "inline-flex h-9 w-7 items-center justify-center rounded-l-full border-t border-b border-l text-sm leading-none transition backdrop-blur-sm disabled:opacity-40",
              idleFloatingButtonClass,
            ].join(" ")}
          >
            <Sun size={10} className="mr-0.5 opacity-70" />
            −
          </button>
          <span
            className={[
              "inline-flex h-9 min-w-[2.6rem] items-center justify-center border-t border-b text-[10px] tabular-nums transition backdrop-blur-sm",
              brightness !== 1
                ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                : "border-slate-500/70 bg-slate-900/78 text-slate-200",
            ].join(" ")}
          >
            {Math.round(brightness * 100)}%
          </span>
          <button
            type="button"
            aria-label="Increase brightness"
            onClick={() => { hideTooltip(); adjustBrightness(0.05); }}
            onMouseEnter={() => scheduleTooltip("brightness")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("brightness")}
            onBlur={hideTooltip}
            disabled={brightness >= BRIGHTNESS_MAX}
            className={[
              "inline-flex h-9 w-7 items-center justify-center rounded-r-full border-t border-b border-r text-sm leading-none transition backdrop-blur-sm disabled:opacity-40",
              idleFloatingButtonClass,
            ].join(" ")}
          >
            +
          </button>
          {renderTooltip("brightness", `Brightness: ${Math.round(brightness * 100)}%`, "w-32")}
        </div>
      )}

      <div className="flex items-center">
        <div className="relative">
          <button
            ref={avPopover.anchorRef}
            type="button"
            aria-label={isFitWidthEnabled ? "Disable fit width" : "Enable fit width"}
            title="Fit width (long-press for volume/speed/brightness)"
            {...fitWidthLongPressHandlers}
            onMouseEnter={() => scheduleTooltip("fit-width")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("fit-width")}
            onBlur={hideTooltip}
            className={[
              "relative select-none overflow-hidden inline-flex h-9 w-9 items-center justify-center rounded-l-full border-t border-b border-l border-r-0 text-sm transition backdrop-blur-sm",
              isFitWidthEnabled || avPopover.isOpen ? glowingFloatingButtonClass : idleFloatingButtonClass,
            ].join(" ")}
          >
            {isFitWidthHolding && (
              <span
                className="pointer-events-none absolute inset-0 origin-left bg-emerald-400/20"
                style={{ animation: "long-press-charge 0.6s linear forwards" }}
              />
            )}
            <ArrowLeftRight size={16} className="relative z-10" />
          </button>
          {renderTooltip("fit-width", isFitWidthEnabled ? tooltipText.fitWidthOn : tooltipText.fitWidthOff)}
          {avPopover.isOpen && avPopover.style && typeof document !== "undefined" && createPortal(
            <div
              ref={avPopover.popoverRef}
              style={avPopover.style}
              className="grid grid-cols-3 gap-x-2 gap-y-2.5 rounded-xl border border-slate-600/80 bg-slate-950/96 p-2.5 shadow-xl backdrop-blur-sm"
            >
              <QuickStepperRow
                label="Volume"
                valueLabel={`${Math.round((player.isMuted ? 0 : player.volume) * 100)}%`}
                onDecrease={() => { player.changeVolume(Math.max(0, (player.isMuted ? 0 : player.volume) - 0.05)); }}
                onIncrease={() => { player.changeVolume(Math.min(1, (player.isMuted ? 0 : player.volume) + 0.05)); }}
              />
              <QuickStepperRow
                label="Speed"
                valueLabel={`${player.playbackRate}x`}
                onDecrease={() => {
                  const i = QUICK_SEEK_SPEED_OPTIONS.indexOf(player.playbackRate as typeof QUICK_SEEK_SPEED_OPTIONS[number]);
                  const nextIndex = Math.min(QUICK_SEEK_SPEED_OPTIONS.length - 1, (i === -1 ? 3 : i) + 1);
                  player.changePlaybackRate(QUICK_SEEK_SPEED_OPTIONS[nextIndex]);
                }}
                onIncrease={() => {
                  const i = QUICK_SEEK_SPEED_OPTIONS.indexOf(player.playbackRate as typeof QUICK_SEEK_SPEED_OPTIONS[number]);
                  const nextIndex = Math.max(0, (i === -1 ? 3 : i) - 1);
                  player.changePlaybackRate(QUICK_SEEK_SPEED_OPTIONS[nextIndex]);
                }}
              />
              <QuickStepperRow
                label="Brightness"
                valueLabel={`${Math.round(brightness * 100)}%`}
                onDecrease={() => { adjustBrightness(-0.05); }}
                onIncrease={() => { adjustBrightness(0.05); }}
                disabledDecrease={brightness <= BRIGHTNESS_MIN}
                disabledIncrease={brightness >= BRIGHTNESS_MAX}
              />
            </div>,
            document.body,
          )}
        </div>
        <div className="relative">
          <button
            ref={eqPopover.anchorRef}
            type="button"
            aria-label={isPinnedPreview ? "Unpin preview" : "Pin preview"}
            title="Pin (long-press for bass/mid/treble/denoise/comp/noise)"
            {...pinLongPressHandlers}
            onMouseEnter={() => scheduleTooltip("pin")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("pin")}
            onBlur={hideTooltip}
            className={[
              "relative select-none overflow-hidden inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",
              isPinnedPreview || eqPopover.isOpen
                ? glowingFloatingButtonClass
                : idleFloatingButtonClass,
            ].join(" ")}
          >
            {isPinHolding && (
              <span
                className="pointer-events-none absolute inset-0 origin-left bg-emerald-400/20"
                style={{ animation: "long-press-charge 0.6s linear forwards" }}
              />
            )}
            <Pin size={16} className="relative z-10" />
          </button>
          {renderTooltip(
            "pin",
            isPinnedPreview
              ? tooltipText.pinOn
              : tooltipText.pinOff,
          )}
          {eqPopover.isOpen && eqPopover.style && typeof document !== "undefined" && createPortal(
            <div
              ref={eqPopover.popoverRef}
              style={eqPopover.style}
              className="grid grid-cols-3 gap-x-1 gap-y-2.5 rounded-xl border border-slate-600/80 bg-slate-950/96 p-2.5 shadow-xl backdrop-blur-sm"
            >
              <QuickStepperRow
                label="Bass"
                valueLabel={`${player.bassAmount >= 0 ? "+" : ""}${(player.bassAmount * 15).toFixed(1)}dB`}
                onDecrease={() => { player.setBassAmount(Math.max(-1.5, player.bassAmount - 0.1)); }}
                onIncrease={() => { player.setBassAmount(Math.min(1.5, player.bassAmount + 0.1)); }}
              />
              <QuickStepperRow
                label="Mid"
                valueLabel={`${player.midAmount >= 0 ? "+" : ""}${(player.midAmount * 15).toFixed(1)}dB`}
                onDecrease={() => { player.setMidAmount(Math.max(-1.5, player.midAmount - 0.1)); }}
                onIncrease={() => { player.setMidAmount(Math.min(1.5, player.midAmount + 0.1)); }}
              />
              <QuickStepperRow
                label="Treble"
                valueLabel={`${player.trebleAmount >= 0 ? "+" : ""}${(player.trebleAmount * 15).toFixed(1)}dB`}
                onDecrease={() => { player.setTrebleAmount(Math.max(-1.5, player.trebleAmount - 0.1)); }}
                onIncrease={() => { player.setTrebleAmount(Math.min(1.5, player.trebleAmount + 0.1)); }}
              />
              <QuickStepperRow
                label="Denoise"
                valueLabel={`${Math.round(player.noiseReductionAmount * 100)}%`}
                onDecrease={() => { player.setNoiseReductionAmount(Math.max(0, player.noiseReductionAmount - 0.05)); }}
                onIncrease={() => { player.setNoiseReductionAmount(Math.min(1, player.noiseReductionAmount + 0.05)); }}
              />
              <QuickStepperRow
                label="Comp"
                valueLabel={`${Math.round(player.compressorAmount * 100)}%`}
                onDecrease={() => { player.setCompressorAmount(Math.max(0, player.compressorAmount - 0.05)); }}
                onIncrease={() => { player.setCompressorAmount(Math.min(1, player.compressorAmount + 0.05)); }}
              />
              <QuickStepperRow
                label="Noise"
                valueLabel={`${(player.noiseLevel * 100).toFixed(1)}%`}
                onDecrease={() => { player.setNoiseLevel(Math.max(0, player.noiseLevel - 0.0025)); }}
                onIncrease={() => { player.setNoiseLevel(Math.min(0.05, player.noiseLevel + 0.0025)); }}
              />
            </div>,
            document.body,
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label={isPreviewMaximized ? "Exit maximize" : "Maximize preview"}
            onClick={() => { hideTooltip(); onMaximizeToggle(); }}
            onMouseEnter={() => scheduleTooltip("maximize")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("maximize")}
            onBlur={hideTooltip}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-r-full border-t border-b border-r border-l-0 text-sm transition backdrop-blur-sm",
              isPreviewMaximized ? glowingFloatingButtonClass : idleFloatingButtonClass,
            ].join(" ")}
          >
            {isPreviewMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          {renderTooltip("maximize", isPreviewMaximized ? tooltipText.maximizeOn : tooltipText.maximizeOff)}
        </div>
      </div>
    </>
  );
}
