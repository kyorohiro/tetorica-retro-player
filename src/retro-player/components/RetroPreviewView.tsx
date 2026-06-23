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
import type { ConfirmDialogFn, RetroPlayerLocale } from "../types";
import {
  loadPersistedRetroSettings,
  savePersistedRetroUiSettings,
} from "../hooks/persistedRetroSettings";

// Subset of the player object that RetroPreviewView needs.
// Add new player capabilities here, not in RetroPlayer.
export type RetroPreviewPlayerSlice = {
  canvasHostRef: React.RefObject<HTMLDivElement | null>;
  isPoweredOn: boolean;
  isLoading: boolean;
  loadingLabel: string;
  needsUserPlay: boolean;
  hasAudioOnly: boolean;
  previewError: string;
  isRendererReady: boolean;
  sourceDimensions: { width: number; height: number } | null;
  viewportRect: { width: number; height: number; x: number; y: number } | null;
  hasPlayableMedia: boolean;
  hasAudibleMedia: boolean;
  canRecord: boolean;
  isRecording: boolean;
  prefersShareExport: boolean;
  isPlaying: boolean;
  togglePlayback: () => Promise<void>;
  setLoopingEnabled: (nextLooping: boolean) => void;
  powerOn: () => void;
  powerOff: () => void;
  playVideoWithAudio: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  ensureAudioContext: () => Promise<AudioContext | null | undefined>;
  downloadPendingRecording: () => void;
  sharePendingRecording: () => Promise<boolean>;
  refreshLayout: () => void;
};

export type RetroPreviewViewProps = {
  locale: RetroPlayerLocale;
  src?: string;
  kind: "video" | "image" | "audio";
  player: RetroPreviewPlayerSlice;
  // These two affect usePixiVideoPlayer args so they live in RetroPlayer,
  // but their toggle buttons live here.
  isHighResolution: boolean;
  isFitWidthEnabled: boolean;
  // The control panel mode drives the auto-pin trigger.
  controlPanelMode: "playback" | "audio-settings" | "video-settings";
  confirmDialog: ConfirmDialogFn;
  onHighResolutionChange: (enabled: boolean) => void;
  onFitWidthChange: (enabled: boolean) => void;
  onError?: (error: Error) => void;
  fillHeight?: boolean;
};

export function RetroPreviewView({
  locale,
  src,
  kind,
  player,
  isHighResolution,
  isFitWidthEnabled,
  controlPanelMode,
  confirmDialog,
  onHighResolutionChange,
  onFitWidthChange,
  onError,
  fillHeight = false,
}: RetroPreviewViewProps) {
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
          pinUnavailableFitWidth: "Pin: Fit Width 中は使えません。",
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
          pinUnavailableFitWidth: "Pin: unavailable in fit-width mode.",
          pinOn: "Pin: keep preview fixed on screen.",
          pinOff: "Pin: keep preview visible while you scroll.",
          maximizeOn: "Maximize: return to normal view.",
          maximizeOff: "Maximize: open the preview full screen.",
          alarmIdle: "Alarm: play media or a fallback tone at the selected time.",
          alarmArmed: "Alarm: armed and waiting for the selected time.",
        };

  // --- Internal UI state: everything layout/pin/maximize lives here ---

  const persistedUiSettings = React.useMemo(
    () => loadPersistedRetroSettings()?.ui,
    [],
  );
  const [isPreviewMaximized, setIsPreviewMaximized] = React.useState(
    persistedUiSettings?.isPreviewMaximized ?? false,
  );
  const [isPreviewPinned, setIsPreviewPinned] = React.useState(false);
  const [isAutoPreviewPinned, setIsAutoPreviewPinned] = React.useState(false);
  const [autoPinnedHiddenOffset, setAutoPinnedHiddenOffset] = React.useState(0);
  const [activeTooltipKey, setActiveTooltipKey] = React.useState<string | null>(null);
  const [brightness, setBrightness] = React.useState<number>(
    persistedUiSettings?.brightness ?? 1.0,
  );
  const [flipH, setFlipH] = React.useState<boolean>(
    persistedUiSettings?.flipH ?? false,
  );
  const [flipV, setFlipV] = React.useState<boolean>(
    persistedUiSettings?.flipV ?? false,
  );
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const [alarmTime, setAlarmTime] = React.useState("07:00");
  const [alarmTargetAt, setAlarmTargetAt] = React.useState<number | null>(null);
  const [alarmStatus, setAlarmStatus] = React.useState<"idle" | "armed" | "triggered">("idle");
  const [clockTime, setClockTime] = React.useState(() => new Date());
  const [showSeconds, setShowSeconds] = React.useState(false);
  const [isNarrow, setIsNarrow] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth < 360,
  );
  const [pinnedPreviewMetrics, setPinnedPreviewMetrics] = React.useState<{
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const previewFrameRef = React.useRef<HTMLDivElement | null>(null);
  const previewAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const previewShellRef = React.useRef<HTMLDivElement | null>(null);
  const tooltipTimerRef = React.useRef<number | null>(null);
  const alarmTimeoutRef = React.useRef<number | null>(null);
  const alarmAudioContextRef = React.useRef<AudioContext | null>(null);
  const alarmRingingRef = React.useRef(false);

  // --- Stable callbacks (defined before effects that use them) ---

  const measurePinnedPreviewMetrics = React.useCallback(() => {
    const frame = previewFrameRef.current;
    const shell = previewShellRef.current;
    if (!frame || !shell) return null;

    const frameRect = frame.getBoundingClientRect();
    const shellRect = shell.getBoundingClientRect();

    return {
      left: frameRect.left,
      width: frameRect.width,
      height: shellRect.height,
    };
  }, []);

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

  const formatAlarmTarget = React.useCallback((targetAt: number) => {
    const date = new Date(targetAt);
    return date.toLocaleString(locale === "ja" ? "ja-JP" : "en-US", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [locale]);

  const ensureAlarmAudioContext = React.useCallback(async () => {
    let context = alarmAudioContextRef.current;
    if (!context || context.state === "closed") {
      context = new AudioContext();
      alarmAudioContextRef.current = context;
    }

    if (context.state === "suspended") {
      try {
        await context.resume();
      } catch (error) {
        console.warn("[retro-player alarm] resume alarm context failed", {
          message: error instanceof Error ? error.message : String(error),
          state: context.state,
        });
      }
    }

    return context;
  }, []);

  const playAlarmTone = React.useCallback(async () => {
    let audioContext = await ensureAlarmAudioContext();
    if (audioContext.state !== "running") {
      audioContext = (await player.ensureAudioContext()) ?? audioContext;
    }
    if (!audioContext || audioContext.state !== "running") {
      console.warn("[retro-player alarm] no running audio context for fallback tone", {
        alarmContextState: alarmAudioContextRef.current?.state ?? null,
        playerContextState: audioContext?.state ?? null,
      });
      return false;
    }

    const startAt = audioContext.currentTime + 0.02;
    const outputGain = audioContext.createGain();
    outputGain.gain.setValueAtTime(0.9, startAt);
    outputGain.connect(audioContext.destination);

    const playBeep = (offset: number, frequency: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const toneStart = startAt + offset;
      const toneEnd = toneStart + duration;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, toneStart);
      gain.gain.setValueAtTime(0.0001, toneStart);
      gain.gain.exponentialRampToValueAtTime(0.16, toneStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, toneEnd);

      oscillator.connect(gain);
      gain.connect(outputGain);
      oscillator.start(toneStart);
      oscillator.stop(toneEnd + 0.02);
    };

    playBeep(0.0, 740, 0.22);
    playBeep(0.28, 988, 0.24);
    playBeep(0.60, 1318, 0.5);

    window.setTimeout(() => {
      try {
        outputGain.disconnect();
      } catch {
        // Ignore disconnect failures during cleanup.
      }
    }, 1600);

    return true;
  }, [ensureAlarmAudioContext, player]);

  const triggerAlarm = React.useCallback(async () => {
    setAlarmTargetAt(null);
    setAlarmStatus("triggered");

    console.info("[retro-player alarm] trigger", {
      hasAudibleMedia: player.hasAudibleMedia,
      hasPlayableMedia: player.hasPlayableMedia,
      isPoweredOn: player.isPoweredOn,
    });

    if (player.hasPlayableMedia) {
      try {
        if (!player.isPoweredOn) {
          player.powerOn();
        }
        await player.playVideoWithAudio();
        console.info("[retro-player alarm] media playback started");
        return;
      } catch (error) {
        console.warn("[retro-player alarm] media playback failed; using fallback tone", {
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Fallback: no playable media, or playback failed — play a tone.
    const didPlayTone = await playAlarmTone();
    console.info("[retro-player alarm] fallback tone", { didPlayTone });
  }, [playAlarmTone, player]);

  // --- Effects ---

  // Persist UI settings. isHighResolution is owned by RetroPlayer but
  // persisted here since we know both values.
  React.useEffect(() => {
    savePersistedRetroUiSettings({ isPreviewMaximized, isHighResolution, brightness, flipH, flipV });
  }, [isHighResolution, isPreviewMaximized, brightness, flipH, flipV]);

  // Tooltip timer cleanup on unmount.
  React.useEffect(() => {
    return () => {
      if (tooltipTimerRef.current !== null) {
        window.clearTimeout(tooltipTimerRef.current);
      }
      if (alarmTimeoutRef.current !== null) {
        window.clearTimeout(alarmTimeoutRef.current);
      }
      if (alarmAudioContextRef.current && alarmAudioContextRef.current.state !== "closed") {
        void alarmAudioContextRef.current.close().catch(() => {
          // Ignore close failures during unmount cleanup.
        });
      }
    };
  }, []);

  React.useEffect(() => {
    if (alarmTimeoutRef.current !== null) {
      window.clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }

    if (!alarmTargetAt) {
      if (alarmStatus === "armed") {
        setAlarmStatus("idle");
      }
      return;
    }

    const delay = alarmTargetAt - Date.now();
    if (delay <= 0) {
      void triggerAlarm();
      return;
    }

    setAlarmStatus("armed");
    alarmTimeoutRef.current = window.setTimeout(() => {
      alarmTimeoutRef.current = null;
      void triggerAlarm();
    }, delay);

    return () => {
      if (alarmTimeoutRef.current !== null) {
        window.clearTimeout(alarmTimeoutRef.current);
        alarmTimeoutRef.current = null;
      }
    };
  }, [alarmStatus, alarmTargetAt, triggerAlarm]);

  // Clock tick: update every second while alarm is armed or ringing.
  React.useEffect(() => {
    if (alarmStatus !== "armed" && alarmStatus !== "triggered") return;
    const id = window.setInterval(() => setClockTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [alarmStatus]);

  // Tone loop: ring repeatedly when triggered with no playable media (image etc.).
  React.useEffect(() => {
    const shouldRing = alarmStatus === "triggered" && !player.hasPlayableMedia;
    if (!shouldRing) {
      alarmRingingRef.current = false;
      return;
    }
    alarmRingingRef.current = true;
    const ring = async () => {
      if (!alarmRingingRef.current) return;
      await playAlarmTone();
      if (alarmRingingRef.current) {
        window.setTimeout(ring, 400);
      }
    };
    void ring();
    return () => { alarmRingingRef.current = false; };
  }, [alarmStatus, player.hasPlayableMedia, playAlarmTone]);

  // Narrow-screen detection (< 360px): record button moves into More popover.
  React.useEffect(() => {
    const handler = () => { setIsNarrow(window.innerWidth < 360); };
    window.addEventListener('resize', handler, { passive: true });
    return () => { window.removeEventListener('resize', handler); };
  }, []);

  // Maximize: lock body scroll + ESC key to close.
  React.useEffect(() => {
    if (!isPreviewMaximized) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setIsPreviewMaximized(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewMaximized]);

  // Maximize: reset pin state.
  React.useEffect(() => {
    if (!isPreviewMaximized) return;

    setIsPreviewPinned(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);
    setPinnedPreviewMetrics(null);
  }, [isPreviewMaximized]);

  // Fit Width: reset pin state (pin and fit-width conflict — fit-width expands
  // the preview to natural content height, pinning would fight that).
  React.useEffect(() => {
    if (!isFitWidthEnabled) return;

    setIsPreviewPinned(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);
    setPinnedPreviewMetrics(null);
  }, [isFitWidthEnabled]);

  // Auto-pin when the settings panel is open and user scrolls up.
  React.useEffect(() => {
    if (controlPanelMode === "playback" || isPreviewMaximized || isPreviewPinned || isFitWidthEnabled) {
      setIsAutoPreviewPinned(false);
      setAutoPinnedHiddenOffset(0);
      return;
    }

    const updateAutoPin = () => {
      const anchor = previewAnchorRef.current;
      const shell = previewShellRef.current;
      if (!anchor || !shell) return;

      const anchorTop = anchor.getBoundingClientRect().top;
      const shellHeight = shell.getBoundingClientRect().height;
      const maxHiddenHeight = Math.round(
        Math.min(shellHeight, window.innerHeight) * 0.4,
      );
      const pinTriggerTop = -Math.max(120, maxHiddenHeight);

      setIsAutoPreviewPinned((current) => {
        if (!current && anchorTop <= pinTriggerTop) {
          setAutoPinnedHiddenOffset(Math.max(120, maxHiddenHeight));
          const nextMetrics = measurePinnedPreviewMetrics();
          if (nextMetrics) {
            setPinnedPreviewMetrics(nextMetrics);
          }
          return true;
        }

        if (current) {
          setAutoPinnedHiddenOffset(Math.max(120, maxHiddenHeight));
        }

        if (current && anchorTop >= -24) {
          setAutoPinnedHiddenOffset(0);
          return false;
        }

        return current;
      });
    };

    updateAutoPin();
    window.addEventListener("scroll", updateAutoPin, { passive: true });
    window.addEventListener("resize", updateAutoPin);

    return () => {
      window.removeEventListener("scroll", updateAutoPin);
      window.removeEventListener("resize", updateAutoPin);
    };
  }, [controlPanelMode, isFitWidthEnabled, isPreviewMaximized, isPreviewPinned, measurePinnedPreviewMetrics]);

  // Keep pinned shell metrics in sync with layout changes.
  React.useEffect(() => {
    const shouldPinPreview =
      (isPreviewPinned || isAutoPreviewPinned) && !isPreviewMaximized;

    if (!shouldPinPreview) {
      setPinnedPreviewMetrics(null);
      return;
    }

    const updatePinnedMetrics = () => {
      const nextMetrics = measurePinnedPreviewMetrics();
      if (!nextMetrics) return;
      setPinnedPreviewMetrics(nextMetrics);
    };

    updatePinnedMetrics();
    window.addEventListener("resize", updatePinnedMetrics);
    window.addEventListener("scroll", updatePinnedMetrics, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePinnedMetrics);
      window.removeEventListener("scroll", updatePinnedMetrics);
    };
  }, [
    isAutoPreviewPinned,
    isPreviewMaximized,
    isPreviewPinned,
    isFitWidthEnabled,
    measurePinnedPreviewMetrics,
    player.sourceDimensions,
  ]);

  // Refresh canvas layout when pin/maximize state changes.
  React.useEffect(() => {
    player.refreshLayout();
  }, [
    isPreviewPinned,
    isPreviewMaximized,
    player.refreshLayout,
    player.sourceDimensions?.height,
    player.sourceDimensions?.width,
  ]);

  // --- Computed values ---

  const showImagePlaceholder =
    kind === "image" &&
    Boolean(src) &&
    !player.previewError &&
    (!player.isRendererReady || player.isLoading);

  const previewAspectRatio = React.useMemo(() => {
    if (!player.sourceDimensions) return undefined;
    return `${player.sourceDimensions.width} / ${player.sourceDimensions.height}`;
  }, [player.sourceDimensions]);

  const isPinnedPreview =
    (isPreviewPinned || isAutoPreviewPinned) && !isPreviewMaximized;
  const pinnedPreviewTop = isAutoPreviewPinned
    ? `calc(max(0.0rem, env(safe-area-inset-top)) - ${autoPinnedHiddenOffset}px)`
    : undefined;

  // --- CSS helpers (stable strings, not derived from state) ---

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
        activeTooltipKey === key
          ? "translate-y-0 opacity-100"
          : "translate-y-1 opacity-0",
      ].join(" ")}
    >
      {text}
    </div>
  );

  // --- Render ---

  // Shared record handler — used in both the button bar and the More popover.
  const handleRecordClick = () => {
    hideTooltip();
    void (async () => {
      if (player.isRecording) {
        try {
          const filename = await player.stopRecording();
          if (!filename) return;
          const confirmed = await confirmDialog({
            title: "Recording ready",
            body: player.prefersShareExport
              ? "Share the recorded clip now?"
              : "Save the recorded clip now?",
            okText: player.prefersShareExport ? "Share" : "Save",
            cancelText: "Cancel",
          });
          void player.ensureAudioContext();
          if (!confirmed) return;
          if (player.prefersShareExport) {
            const shared = await player.sharePendingRecording();
            if (!shared) player.downloadPendingRecording();
            return;
          }
          player.downloadPendingRecording();
        } catch (error) {
          onError?.(error instanceof Error ? error : new Error(String(error)));
        }
        return;
      }
      try {
        await player.startRecording();
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    })();
  };

  const handleArmAlarm = () => {
    const [hoursRaw, minutesRaw] = alarmTime.split(":");
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
      return;
    }

    const now = new Date();
    const nextTarget = new Date(now);
    nextTarget.setHours(hours, minutes, 0, 0);
    if (nextTarget.getTime() <= now.getTime()) {
      nextTarget.setDate(nextTarget.getDate() + 1);
    }

    setIsMoreOpen(false);
    setAlarmTargetAt(nextTarget.getTime());
    setAlarmStatus("armed");
    setClockTime(new Date());
    void (async () => {
      if (player.isPlaying) {
        await player.togglePlayback();
      }
      player.setLoopingEnabled(true);
      const alarmContext = await ensureAlarmAudioContext();
      void player.ensureAudioContext();
      console.info("[retro-player alarm] armed", {
        alarmContextState: alarmContext.state,
        alarmTime,
        targetAt: nextTarget.toISOString(),
        hasAudibleMedia: player.hasAudibleMedia,
        hasPlayableMedia: player.hasPlayableMedia,
      });
    })();
  };

  const handleClearAlarm = () => {
    setAlarmTargetAt(null);
    setAlarmStatus("idle");
    setShowSeconds(false);
    console.info("[retro-player alarm] cleared");
  };

  const handleArmAlarmIn = (minutes: number) => {
    const targetAt = Date.now() + minutes * 60 * 1000;
    setIsMoreOpen(false);
    setAlarmTargetAt(targetAt);
    setAlarmStatus("armed");
    setShowSeconds(true);
    setClockTime(new Date());
    void (async () => {
      if (player.isPlaying) {
        await player.togglePlayback();
      }
      player.setLoopingEnabled(true);
      const alarmContext = await ensureAlarmAudioContext();
      void player.ensureAudioContext();
      console.info("[retro-player alarm] armed (relative)", {
        alarmContextState: alarmContext.state,
        minutes,
        targetAt: new Date(targetAt).toISOString(),
      });
    })();
  };

  const handleTestAlarm = () => {
    console.info("[retro-player alarm] manual test");
    void triggerAlarm();
  };

  // Extracted so the same buttons can be placed inside the canvas area (normal
  // mode) or below it in document flow (fit-width / manga reading mode).
  const renderButtonBar = (): React.ReactNode => (
    <>
      {/* More: brightness + flip — leftmost so popover opens right */}
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
                onChange={(e) => { setAlarmTime(e.currentTarget.value); }}
                className="mb-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 outline-none transition focus:border-slate-400"
              />
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleArmAlarm}
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
                  onClick={handleTestAlarm}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-500 bg-slate-800 px-2 py-1.5 text-xs text-slate-100 transition hover:bg-slate-700"
                >
                  Test
                </button>
                <button
                  type="button"
                  onClick={handleClearAlarm}
                  className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-xs text-slate-200 transition hover:bg-slate-800"
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-1">
                {([3, 5, 10, 25, 50] as const).map((min) => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => handleArmAlarmIn(min)}
                    className="inline-flex min-h-8 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-1 py-1 text-[11px] text-slate-300 transition hover:bg-slate-700"
                  >
                    {min}m
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
            </div>
            {isNarrow && player.canRecord && (
              <div className="mb-3 border-b border-slate-700 pb-3">
                <button
                  type="button"
                  onClick={handleRecordClick}
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
                onChange={(e) => { setBrightness(Number(e.currentTarget.value)); }}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setFlipH((v) => !v); }}
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
                onClick={() => { setFlipV((v) => !v); }}
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
            onClick={handleRecordClick}
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
          {renderTooltip(
            "record",
            player.isRecording ? tooltipText.recordStop : tooltipText.recordIdle,
          )}
        </div>
      )}
      <div className="relative">
        <button
          type="button"
          aria-label={player.isPoweredOn ? "Power off" : "Power on"}
          onClick={() => {
            hideTooltip();
            if (player.isPoweredOn) { player.powerOff(); return; }
            player.powerOn();
          }}
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
        {renderTooltip(
          "power",
          player.isPoweredOn ? tooltipText.powerOff : tooltipText.powerOn,
        )}
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
      {/* FitWidth + PIN + Maximize: pill group (mutually exclusive, no gap) */}
      <div className="flex items-center">
        <div className="relative">
          <button
            type="button"
            aria-label={isFitWidthEnabled ? "Disable fit width" : "Enable fit width"}
            onClick={() => {
              hideTooltip();
              onFitWidthChange(!isFitWidthEnabled);
            }}
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
          {renderTooltip(
            "fit-width",
            isFitWidthEnabled ? tooltipText.fitWidthOn : tooltipText.fitWidthOff,
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label={isPinnedPreview ? "Unpin preview" : "Pin preview"}
            onClick={() => {
              hideTooltip();
              if (isPreviewMaximized || isFitWidthEnabled) return;
              setIsPreviewPinned((current) => {
                const next = !current;
                if (next) {
                  const nextMetrics = measurePinnedPreviewMetrics();
                  if (nextMetrics) setPinnedPreviewMetrics(nextMetrics);
                  return true;
                }
                setIsAutoPreviewPinned(false);
                setAutoPinnedHiddenOffset(0);
                setPinnedPreviewMetrics(null);
                return false;
              });
            }}
            onMouseEnter={() => scheduleTooltip("pin")}
            onMouseLeave={hideTooltip}
            onFocus={() => scheduleTooltip("pin")}
            onBlur={hideTooltip}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",
              isPreviewMaximized || isFitWidthEnabled
                ? "cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500"
                : isPinnedPreview
                ? glowingFloatingButtonClass
                : idleFloatingButtonClass,
            ].join(" ")}
            disabled={isPreviewMaximized || isFitWidthEnabled}
          >
            <Pin size={16} />
          </button>
          {renderTooltip(
            "pin",
            isPreviewMaximized
              ? tooltipText.pinUnavailable
              : isFitWidthEnabled
              ? tooltipText.pinUnavailableFitWidth
              : isPinnedPreview
              ? tooltipText.pinOn
              : tooltipText.pinOff,
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label={isPreviewMaximized ? "Exit maximize" : "Maximize preview"}
            onClick={() => { hideTooltip(); setIsPreviewMaximized((c) => !c); }}
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
          {renderTooltip(
            "maximize",
            isPreviewMaximized ? tooltipText.maximizeOn : tooltipText.maximizeOff,
          )}
        </div>
      </div>

    </>
  );

  return (
    <div ref={previewFrameRef} className={isPinnedPreview || isPreviewMaximized || !fillHeight ? "space-y-4" : "h-full flex flex-col"}>
      <div ref={previewAnchorRef} aria-hidden="true" />
      <div
        ref={previewShellRef}
        className={`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${
          isPreviewMaximized
            ? isFitWidthEnabled
              // Fit-width maximize: scrollable fullscreen overlay so tall
              // content (e.g. portrait manga/capture) can be read in full.
              ? "fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto"
              : "fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch"
            : isPinnedPreview
              ? "fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm"
              : fillHeight ? "flex-1 min-h-0 overflow-visible" : "overflow-visible"
        }`}
        style={
          isPinnedPreview && pinnedPreviewMetrics
            ? {
                left: `${pinnedPreviewMetrics.left}px`,
                top: pinnedPreviewTop ?? "calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",
                width: `${pinnedPreviewMetrics.width}px`,
              }
            : !isPreviewMaximized
              ? { overflow: "visible" }
              : undefined
        }
      >
        {isPreviewMaximized && (
          isFitWidthEnabled ? (
            // Fit-width maximize: shell is a scroll container, so the exit
            // button must be sticky so it stays reachable at all scroll depths.
            <div className="sticky top-0 z-10 flex justify-end pb-2">
              <button
                type="button"
                aria-label="Exit maximize"
                title="Exit maximize"
                onClick={() => { setIsPreviewMaximized(false); }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800"
              >
                <Minimize2 size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Exit maximize"
              title="Exit maximize"
              onClick={() => { setIsPreviewMaximized(false); }}
              className="safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800"
            >
              <Minimize2 size={18} />
            </button>
          )
        )}

        <div
          className={`relative ${
            isPreviewMaximized ? "w-full" : "max-w-full min-w-0 overflow-visible"
          } ${fillHeight && !isPreviewMaximized && !isPinnedPreview && !isFitWidthEnabled ? "h-full" : ""}`}
          style={
            isPreviewMaximized
              ? isFitWidthEnabled && previewAspectRatio
                ? {
                    aspectRatio: previewAspectRatio,
                    width: "100%",
                  }
                : undefined
              : isFitWidthEnabled && previewAspectRatio
                ? {
                    // Manga reading mode: let content height expand naturally — no cap
                    aspectRatio: previewAspectRatio,
                    width: "100%",
                  }
                : previewAspectRatio
                  ? {
                      aspectRatio: previewAspectRatio,
                      maxWidth: "100%",
                      maxHeight: fillHeight
                        ? "100%"
                        : controlPanelMode === "playback"
                          ? "min(60dvh, calc(100dvh - 260px))"
                          : "70dvh",
                      margin: "0 auto",
                    }
                  : undefined
          }
        >
          {/* Canvas area + overlays */}
          <div
            className="relative h-full w-full overflow-visible rounded-xl bg-slate-950"
            style={{
              filter: brightness !== 1.0 ? `brightness(${brightness})` : undefined,
              transform: (flipH || flipV) ? `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` : undefined,
            }}
          >
            {showImagePlaceholder && (
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"
              />
            )}
            <div
              ref={player.canvasHostRef}
              className="pointer-events-none relative h-full w-full touch-manipulation"
            />
            {!player.isPoweredOn && (
              <div className="absolute z-100 inset-0 flex items-center justify-center bg-black/72">
                <div className="rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                    Power Off
                  </p>
                  <p className="mt-2">Press power to wake the screen.</p>
                </div>
              </div>
            )}
            {player.isLoading && !player.needsUserPlay && !player.previewError && (
              <div
                className={[
                  "pointer-events-none absolute inset-0 flex items-center justify-center",
                  showImagePlaceholder ? "bg-slate-950/26" : "bg-slate-950/72",
                ].join(" ")}
              >
                <div className="rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg">
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#cac0b2] border-t-[#111014]" />
                  <p className="font-medium">
                    {player.loadingLabel || "Loading preview..."}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Please wait while the preview is prepared.
                  </p>
                </div>
              </div>
            )}
            {player.needsUserPlay && !player.isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/46">
                <div className="w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/80">
                    Preview Ready
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-100">
                    Press Play to start
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Safari may require a direct user action before video and audio can begin.
                  </p>
                  <button
                    type="button"
                    onClick={() => { void player.playVideoWithAudio(); }}
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20"
                  >
                    Play
                  </button>
                </div>
              </div>
            )}
            {player.hasAudioOnly && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400">
                Audio preview is playing through the retro audio chain.
              </div>
            )}
          </div>

          {/* Floating buttons: overlaid below canvas in normal mode */}
          {!isFitWidthEnabled && (
            <div className="absolute -bottom-8 -right-4 z-50 flex items-center gap-2">
              {renderButtonBar()}
            </div>
          )}
        </div>

        {/* Fit-width maximize: buttons live inside the scrollable shell so
            they are reachable after scrolling through tall content. */}
        {isFitWidthEnabled && isPreviewMaximized && (
          <div className="flex items-center justify-end gap-2 pt-2 pr-0">
            {renderButtonBar()}
          </div>
        )}
      </div>

      {/* Fit-width normal mode: buttons below the shell in document flow.
          Excluded when maximized — the shell's internal button bar handles it. */}
      {isFitWidthEnabled && !isPreviewMaximized && (
        <div className="flex items-center justify-end gap-2 pt-2 pr-0">
          {renderButtonBar()}
        </div>
      )}

      {/* Spacer that holds layout space while the shell is fixed/pinned */}
      {isPinnedPreview && pinnedPreviewMetrics && (
        <div style={{ height: `${pinnedPreviewMetrics.height}px` }} />
      )}

      {/* Alarm overlay:
            - "armed"    → clock / waiting screen, locks all controls
            - "triggered" + no playable media → ringing tone, locks until stopped */}
      {(alarmStatus === "armed" || (alarmStatus === "triggered" && !player.hasPlayableMedia)) && (
        <div
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-slate-950/96 backdrop-blur-md"
          onClick={handleClearAlarm}
        >
          {alarmStatus === "armed" ? (
            /* ── Waiting state ── */
            <>
              <div className="pointer-events-none select-none text-center">
                <div className={showSeconds ? "text-[min(14vw,5.5rem)] font-thin leading-none tracking-[-0.02em] text-slate-50 tabular-nums" : "text-[min(22vw,9rem)] font-thin leading-none tracking-[-0.02em] text-slate-50 tabular-nums"}>
                  {clockTime.toLocaleTimeString(locale === "ja" ? "ja-JP" : "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    ...(showSeconds ? { second: "2-digit" } : {}),
                  })}
                </div>
                <div className="mt-3 text-sm text-slate-400">
                  {clockTime.toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
                  <Bell size={13} />
                  <span className="text-sm">
                    {alarmTargetAt ? formatAlarmTarget(alarmTargetAt) : "—"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClearAlarm(); }}
                className="pointer-events-auto mt-12 rounded-full border border-slate-500/60 bg-slate-800/80 px-8 py-3 text-sm text-slate-300 transition hover:bg-slate-700 active:scale-95"
              >
                Alarm Off
              </button>
              <p className="pointer-events-none mt-5 text-xs text-slate-600">
                {locale === "ja" ? "タップして解除" : "Tap anywhere to dismiss"}
              </p>
            </>
          ) : (
            /* ── Ringing state (image / no media) ── */
            <>
              <div className="pointer-events-none select-none text-center">
                <div className={`animate-pulse ${showSeconds ? "text-[min(14vw,5.5rem)]" : "text-[min(22vw,9rem)]"} font-thin leading-none tracking-[-0.02em] text-slate-50 tabular-nums`}>
                  {clockTime.toLocaleTimeString(locale === "ja" ? "ja-JP" : "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    ...(showSeconds ? { second: "2-digit" } : {}),
                  })}
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-amber-300/80">
                  <Bell size={18} />
                  <span className="text-lg font-medium tracking-widest uppercase">
                    {locale === "ja" ? "アラーム" : "Alarm"}
                  </span>
                  <Bell size={18} />
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClearAlarm(); }}
                className="pointer-events-auto mt-12 rounded-full border border-amber-400/40 bg-amber-500/15 px-8 py-3 text-sm text-amber-200 transition hover:bg-amber-500/25 active:scale-95"
              >
                {locale === "ja" ? "アラームを止める" : "Stop Alarm"}
              </button>
              <p className="pointer-events-none mt-5 text-xs text-slate-600">
                {locale === "ja" ? "タップして止める" : "Tap anywhere to stop"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
