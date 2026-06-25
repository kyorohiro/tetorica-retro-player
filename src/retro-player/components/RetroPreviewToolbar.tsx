import React from "react";
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
  Pin,
  Power,
  Square,
  Sun,
} from "lucide-react";
import type { RetroAudioSettings } from "../audio/preset";
import type { RetroAlarmStatus } from "../hooks/useRetroAlarm";
import type { RetroPlayerLocale } from "../types";

type RetroPreviewToolbarPlayerSlice = {
  canRecord: boolean;
  isRecording: boolean;
  isPoweredOn: boolean;
  audioOptimizationMode: RetroAudioSettings["audioOptimizationMode"];
};

type RetroPreviewToolbarProps = {
  locale: RetroPlayerLocale;
  player: RetroPreviewToolbarPlayerSlice;
  isHighResolution: boolean;
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
  onHighResolutionChange: (enabled: boolean) => void;
  onFitWidthToggle: () => void;
  onPinToggle: () => void;
  onMaximizeToggle: () => void;
  onBrightnessChange: (value: number) => void;
  onFlipHToggle: () => void;
  onFlipVToggle: () => void;
  onAudioOptimizationModeChange: (
    nextMode: RetroAudioSettings["audioOptimizationMode"],
  ) => void;
};

export function RetroPreviewToolbar({
  locale,
  player,
  isHighResolution,
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
  onHighResolutionChange,
  onFitWidthToggle,
  onPinToggle,
  onMaximizeToggle,
  onBrightnessChange,
  onFlipHToggle,
  onFlipVToggle,
  onAudioOptimizationModeChange,
}: RetroPreviewToolbarProps) {
  const tooltipText =
    locale === "ja"
      ? {
          recordIdle: "録画: 現在のレトロ出力を記録します。",
          recordStop: "録画: 停止して書き出します。",
          powerOn: "Power: フィルターをオンにします。",
          powerOff: "Power: フィルターをオフにします。",
          hiRes: "Hi-res: よりシャープになりますが GPU 負荷は上がります。",
          fitWidthOn: "Fit width: 有効です。",
          fitWidthOff: "Fit width: プレビューを横幅いっぱいに広げます。",
          pinUnavailable: "Pin: 最大化中は使えません。",
          pinOn: "Pin: プレビューを画面内に固定します。",
          pinOff: "Pin: スクロール中も見えるようにします。",
          maximizeOn: "Maximize: 通常表示に戻します。",
          maximizeOff: "Maximize: プレビューを全画面表示します。",
          alarmIdle: "Alarm: 指定時刻にメディア再生か通知音を鳴らします。",
          alarmArmed: "Alarm: 時刻を待っています。",
        }
      : {
          recordIdle: "Record: capture the current retro output.",
          recordStop: "Record: stop and export clip.",
          powerOn: "Power: turn filter on.",
          powerOff: "Power: turn filter off.",
          hiRes: "Hi-res: sharper preview, higher GPU cost.",
          fitWidthOn: "Fit width: enabled.",
          fitWidthOff: "Fit width: stretch preview to the frame width.",
          pinUnavailable: "Pin: unavailable while maximize is active.",
          pinOn: "Pin: keep preview fixed on screen.",
          pinOff: "Pin: keep preview visible while you scroll.",
          maximizeOn: "Maximize: return to normal view.",
          maximizeOff: "Maximize: open the preview full screen.",
          alarmIdle: "Alarm: play media or a fallback tone at the selected time.",
          alarmArmed: "Alarm: armed and waiting for the selected time.",
        };

  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const [isNarrow, setIsNarrow] = React.useState(
    () => typeof window !== "undefined" && window.innerWidth < 360,
  );
  const [activeTooltipKey, setActiveTooltipKey] = React.useState<string | null>(null);
  const tooltipTimerRef = React.useRef<number | null>(null);

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
    const handler = () => { setIsNarrow(window.innerWidth < 360); };
    window.addEventListener("resize", handler, { passive: true });
    return () => { window.removeEventListener("resize", handler); };
  }, []);

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
          type="button"
          aria-label="More options"
          onClick={() => { hideTooltip(); setIsMoreOpen((v) => !v); }}
          className={[
            floatingButtonClass,
            isMoreOpen || brightness !== 1.0 || flipH || flipV
              ? glowingFloatingButtonClass
              : idleFloatingButtonClass,
          ].join(" ")}
        >
          <MoreHorizontal size={16} />
        </button>
            {isMoreOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-52 rounded-xl border border-slate-600/80 bg-slate-950/96 p-3 shadow-xl backdrop-blur-sm">
            <div className="mb-3 border-b border-slate-700 pb-3">
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Audio Optimize</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {player.audioOptimizationMode}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["auto", "chrome", "safari"] as const).map((mode) => {
                  const isActive = player.audioOptimizationMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        onAudioOptimizationModeChange(mode);
                      }}
                      className={[
                        "inline-flex min-h-8 items-center justify-center rounded-md border px-1.5 py-1 text-[11px] font-medium capitalize transition",
                        isActive
                          ? "border-cyan-300/70 bg-cyan-400/18 text-cyan-50"
                          : "border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800",
                      ].join(" ")}
                    >
                      {mode}
                    </button>
                  );
                })}
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
          </div>
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
          onClick={() => { hideTooltip(); onPowerToggle(); }}
          onMouseEnter={() => scheduleTooltip("power")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("power")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
            player.isPoweredOn ? glowingFloatingButtonClass : idleFloatingButtonClass,
          ].join(" ")}
        >
          <Power size={16} />
        </button>
        {renderTooltip("power", player.isPoweredOn ? tooltipText.powerOff : tooltipText.powerOn)}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label={isHighResolution ? "Disable high resolution" : "Enable high resolution"}
          onClick={() => { hideTooltip(); onHighResolutionChange(!isHighResolution); }}
          onMouseEnter={() => scheduleTooltip("hi-res")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("hi-res")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
            isHighResolution ? glowingFloatingButtonClass : idleFloatingButtonClass,
          ].join(" ")}
        >
          <Aperture size={16} />
        </button>
        {renderTooltip("hi-res", tooltipText.hiRes)}
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button
            type="button"
            aria-label={isFitWidthEnabled ? "Disable fit width" : "Enable fit width"}
            onClick={() => { hideTooltip(); onFitWidthToggle(); }}
            onMouseEnter={() => scheduleTooltip("fit-width")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("fit-width")}
            onBlur={hideTooltip}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-l-full border-t border-b border-l border-r-0 text-sm transition backdrop-blur-sm",
              isFitWidthEnabled ? glowingFloatingButtonClass : idleFloatingButtonClass,
            ].join(" ")}
          >
            <ArrowLeftRight size={16} />
          </button>
          {renderTooltip("fit-width", isFitWidthEnabled ? tooltipText.fitWidthOn : tooltipText.fitWidthOff)}
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label={isPinnedPreview ? "Unpin preview" : "Pin preview"}
            onClick={() => { hideTooltip(); onPinToggle(); }}
            onMouseEnter={() => scheduleTooltip("pin")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("pin")}
            onBlur={hideTooltip}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",
              isPreviewMaximized
                ? "cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500"
                : isPinnedPreview
                  ? glowingFloatingButtonClass
                  : idleFloatingButtonClass,
            ].join(" ")}
            disabled={isPreviewMaximized}
          >
            <Pin size={16} />
          </button>
          {renderTooltip(
            "pin",
            isPreviewMaximized
              ? tooltipText.pinUnavailable
              : isPinnedPreview
                ? tooltipText.pinOn
                : tooltipText.pinOff,
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
