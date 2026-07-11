import React from "react";
import {
  Bell,
} from "lucide-react";
import {
  RETRO_AUDIO_AMOUNT_KEYS,
  type RetroAudioAmountSetters,
  type RetroAudioSettings,
} from "../audio/preset";
import type { RetroPageTurnDirection, RetroPreviewStatus } from "../hooks/usePixiVideoPlayer";
import type { RetroPresetKey } from "../retro/config";
import type { ConfirmDialogFn, RetroPlayerLocale } from "../types";
import {
  loadPersistedRetroSettings,
  savePersistedRetroUiSettings,
} from "../hooks/persistedRetroSettings";
import { useRetroAlarm } from "../hooks/useRetroAlarm";
import {
  areRetroPreviewLayoutStatesEqual,
  normalizeRetroPreviewLayoutState,
  type RetroPreviewLayoutState,
} from "../previewLayoutState";
import { RetroPreviewToolbar } from "./RetroPreviewToolbar";
import { AudioSpectrum } from "./AudioSpectrum";

// Casio-digital-watch style clock overlay — toggled by long-pressing the
// playback Speed button.
function DigitalClockOverlay() {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = window.setInterval(() => { setNow(new Date()); }, 1000);
    return () => { window.clearInterval(id); };
  }, []);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  return (
    <div className="pointer-events-none absolute top-2 right-2 z-10 rounded-md border border-emerald-400/40 bg-black/75 px-2.5 py-1 font-mono text-lg tabular-nums text-emerald-300 shadow-[0_0_10px_rgba(74,222,128,0.5)]">
      {hh}:{mm}
    </div>
  );
}

const inferPageLabel = (name: string) => {
  const normalized = name.split(/[\\/]/).pop() ?? name;
  return normalized.replace(/\.[^.]+$/, "") || normalized;
};

const resolveOverlayPrimaryLabel = (name: string, fallbackIndex?: number | null) => {
  const label = inferPageLabel(name).trim();
  if (label) {
    return label;
  }
  if (typeof fallbackIndex === "number" && Number.isFinite(fallbackIndex)) {
    return String(fallbackIndex);
  }
  return "";
};

// Subset of the player object that RetroPreviewView needs.
// Add new player capabilities here, not in RetroPlayer.
export type RetroPreviewPlayerSlice = {
  canvasHostRef: React.RefObject<HTMLDivElement | null>;
  nativeVisualElement: HTMLVideoElement | HTMLImageElement | null;
  shouldUseNativeVisualSurface: boolean;
  previewName: string;
  requestedKind: "video" | "audio" | "image";
  requestedIndex: number | null;
  isPoweredOn: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  loadingLabel: string;
  needsUserPlay: boolean;
  hasAudioOnly: boolean;
  previewError: string;
  previewStatus: RetroPreviewStatus;
  isRendererReady: boolean;
  sourceDimensions: { width: number; height: number } | null;
  viewportRect: { width: number; height: number; x: number; y: number } | null;
  audioOptimizationMode: RetroAudioSettings["audioOptimizationMode"];
  latencyHint: AudioContextLatencyCategory;
  hasPlayableMedia: boolean;
  hasAudibleMedia: boolean;
  hasImage: boolean;
  pageTurnDirection: RetroPageTurnDirection;
  pageTurnToken: number;
  canRecord: boolean;
  isRecording: boolean;
  prefersShareExport: boolean;
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
  setLoopingEnabled: (nextLooping: boolean) => void;
  setAudioOptimizationMode: (nextMode: RetroAudioSettings["audioOptimizationMode"]) => void;
  setLatencyHint: (hint: AudioContextLatencyCategory) => void;
  powerOn: () => void;
  powerOff: () => void;
  playVideoWithAudio: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  ensureAudioContext: () => Promise<AudioContext | null | undefined>;
  downloadPendingRecording: () => void;
  sharePendingRecording: () => Promise<boolean>;
  refreshLayout: () => void;
  isAudioFxEnabled: boolean;
  toggleAudioFx: () => void;
  isNoiseEnabled: boolean;
  toggleNoise: () => void;
} & Pick<RetroAudioSettings, (typeof RETRO_AUDIO_AMOUNT_KEYS)[number]> & RetroAudioAmountSetters;

export type RetroPreviewViewProps = {
  locale: RetroPlayerLocale;
  src?: string;
  kind: "video" | "image" | "audio";
  player: RetroPreviewPlayerSlice;
  // These two affect usePixiVideoPlayer args so they live in RetroPlayer,
  // but their toggle buttons live here.
  isHighResolution: boolean;
  renderResolutionPreset: 1 | 2;
  isFitWidthEnabled: boolean;
  // The control panel mode drives the auto-pin trigger.
  controlPanelMode: "playback" | "audio-settings" | "video-settings";
  confirmDialog: ConfirmDialogFn;
  onHighResolutionToggle: () => void;
  onFitWidthChange: (enabled: boolean) => void;
  ffmpegUseQsv: boolean;
  onToggleFfmpegUseQsv: () => void;
  ffmpegMaxConcurrentHlsSessions: number;
  onFfmpegMaxConcurrentHlsSessionsChange: (limit: number) => void;
  onPreviewPointerMove?: (point: { x: number; y: number }) => void;
  onError?: (error: Error) => void;
  fillHeight?: boolean;
  onIsPinnedPreviewChange?: (isPinned: boolean) => void;
  previewLayoutState?: RetroPreviewLayoutState;
  onPreviewLayoutStateChange?: (state: RetroPreviewLayoutState) => void;
  analyserRef?: React.RefObject<AnalyserNode | null>;
  showVideoSpectrum?: boolean;
  showClockOverlay?: boolean;
  selectedPreset: RetroPresetKey | null;
  onApplyPreset: (preset: RetroPresetKey) => void;
};

export function RetroPreviewView({
  locale,
  src: _src,
  kind: _kind,
  player,
  isHighResolution,
  renderResolutionPreset,
  isFitWidthEnabled,
  controlPanelMode,
  confirmDialog,
  onHighResolutionToggle,
  onFitWidthChange,
  ffmpegUseQsv,
  onToggleFfmpegUseQsv,
  ffmpegMaxConcurrentHlsSessions,
  onFfmpegMaxConcurrentHlsSessionsChange,
  onPreviewPointerMove,
  onError,
  fillHeight = false,
  onIsPinnedPreviewChange,
  previewLayoutState,
  onPreviewLayoutStateChange,
  analyserRef,
  showVideoSpectrum,
  showClockOverlay,
  selectedPreset,
  onApplyPreset,
}: RetroPreviewViewProps) {
  // --- Internal UI state: everything layout/pin/maximize lives here ---

  const persistedUiSettings = React.useMemo(
    () => loadPersistedRetroSettings()?.ui,
    [],
  );
  const [isPreviewMaximized, setIsPreviewMaximized] = React.useState(
    previewLayoutState?.isPreviewMaximized ?? persistedUiSettings?.isPreviewMaximized ?? false,
  );
  const [isPreviewPinned, setIsPreviewPinned] = React.useState(
    previewLayoutState?.isPreviewPinned ?? false,
  );
  const [isAutoPreviewPinned, setIsAutoPreviewPinned] = React.useState(false);
  const [autoPinnedHiddenOffset, setAutoPinnedHiddenOffset] = React.useState(0);
  const [brightness, setBrightness] = React.useState<number>(
    persistedUiSettings?.brightness ?? 1.0,
  );
  const [flipH, setFlipH] = React.useState<boolean>(
    persistedUiSettings?.flipH ?? false,
  );
  const [flipV, setFlipV] = React.useState<boolean>(
    persistedUiSettings?.flipV ?? false,
  );
  const [pinnedPreviewMetrics, setPinnedPreviewMetrics] = React.useState<{
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [isStartingPlay, setIsStartingPlay] = React.useState(false);

  const previewFrameRef = React.useRef<HTMLDivElement | null>(null);
  const previewAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const previewShellRef = React.useRef<HTMLDivElement | null>(null);
  const nativeVideoHostRef = React.useRef<HTMLDivElement | null>(null);
  const activePreviewPointerIdRef = React.useRef<number | null>(null);
  const autoPinFrameRef = React.useRef<number | null>(null);
  const pinnedMetricsFrameRef = React.useRef<number | null>(null);
  const emittedPreviewLayoutStateRef = React.useRef<RetroPreviewLayoutState | undefined>(undefined);
  const refreshLayoutFrameRef = React.useRef<number | null>(null);

  const setPinnedPreviewMetricsIfChanged = React.useCallback((
    nextMetrics: {
      left: number;
      width: number;
      height: number;
    } | null,
  ) => {
    setPinnedPreviewMetrics((current) => {
      if (
        current === nextMetrics
        || (
          current
          && nextMetrics
          && current.left === nextMetrics.left
          && current.width === nextMetrics.width
          && current.height === nextMetrics.height
        )
      ) {
        return current;
      }
      return nextMetrics;
    });
  }, []);

  const scheduleRefreshLayout = React.useCallback(() => {
    if (refreshLayoutFrameRef.current !== null) return;
    refreshLayoutFrameRef.current = window.requestAnimationFrame(() => {
      refreshLayoutFrameRef.current = null;
      player.refreshLayout();
    });
  }, [player]);

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

  const handlePinToggle = React.useCallback(() => {
    onFitWidthChange(false);
    setIsPreviewMaximized(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);

    setIsPreviewPinned((current) => {
      const next = !current;
      if (next) {
        const nextMetrics = measurePinnedPreviewMetrics();
        if (nextMetrics) {
          setPinnedPreviewMetricsIfChanged(nextMetrics);
        }
        return true;
      }

      setIsAutoPreviewPinned(false);
      setAutoPinnedHiddenOffset(0);
      setPinnedPreviewMetricsIfChanged(null);
      return false;
    });
  }, [
    measurePinnedPreviewMetrics,
    onFitWidthChange,
    setPinnedPreviewMetricsIfChanged,
  ]);

  const handleFitWidthToggle = React.useCallback(() => {
    const next = !isFitWidthEnabled;
    setIsPreviewMaximized(false);
    setIsPreviewPinned(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);
    setPinnedPreviewMetricsIfChanged(null);
    onFitWidthChange(next);
  }, [isFitWidthEnabled, onFitWidthChange, setPinnedPreviewMetricsIfChanged]);

  const handleMaximizeToggle = React.useCallback(() => {
    const next = !isPreviewMaximized;
    setIsPreviewPinned(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);
    setPinnedPreviewMetricsIfChanged(null);
    onFitWidthChange(false);
    setIsPreviewMaximized(next);
  }, [isPreviewMaximized, onFitWidthChange, setPinnedPreviewMetricsIfChanged]);

  const {
    alarmTime,
    setAlarmTime,
    alarmTargetAt,
    alarmStatus,
    clockTime,
    showSeconds,
    formatAlarmTarget,
    armAlarmAtTime,
    armAlarmIn,
    clearAlarm,
    testAlarm,
    isAlarmOverlayVisible,
  } = useRetroAlarm({
    locale,
    hasAudibleMedia: player.hasAudibleMedia,
    hasPlayableMedia: player.hasPlayableMedia,
    isPlaying: player.isPlaying,
    isPoweredOn: player.isPoweredOn,
    ensureAudioContext: player.ensureAudioContext,
    playVideoWithAudio: player.playVideoWithAudio,
    powerOn: player.powerOn,
    setLoopingEnabled: player.setLoopingEnabled,
    togglePlayback: player.togglePlayback,
  });

  // --- Effects ---

  // Persist UI settings. isHighResolution is owned by RetroPlayer but
  // persisted here since we know both values.
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      savePersistedRetroUiSettings({
        isPreviewMaximized,
        isHighResolution,
        renderResolutionPreset,
        brightness,
        flipH,
        flipV,
      });
    }, 180);
    return () => {
      window.clearTimeout(id);
    };
  }, [isHighResolution, isPreviewMaximized, renderResolutionPreset, brightness, flipH, flipV]);

  React.useEffect(() => {
    if (!previewLayoutState) return;
    const normalized = normalizeRetroPreviewLayoutState(previewLayoutState);
    setIsPreviewMaximized((current) => (
      current === normalized.isPreviewMaximized ? current : normalized.isPreviewMaximized
    ));
    setIsPreviewPinned((current) => (
      current === normalized.isPreviewPinned ? current : normalized.isPreviewPinned
    ));
    setIsAutoPreviewPinned((current) => (current ? false : current));
    setAutoPinnedHiddenOffset((current) => (current === 0 ? current : 0));
    if (!normalized.isPreviewPinned) {
      setPinnedPreviewMetricsIfChanged(null);
    }
  }, [
    previewLayoutState,
    previewLayoutState?.isPreviewMaximized,
    previewLayoutState?.isPreviewPinned,
    previewLayoutState?.isFitWidthEnabled,
    setPinnedPreviewMetricsIfChanged,
  ]);

  // Tooltip timer cleanup on unmount.
  React.useEffect(() => {
    return undefined;
  }, []);

  // Narrow-screen detection (< 360px): record button moves into More popover.
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
    setPinnedPreviewMetricsIfChanged(null);
  }, [isPreviewMaximized, setPinnedPreviewMetricsIfChanged]);

  // Fit Width ON: reset pin state (after render so layout has settled).
  React.useEffect(() => {
    if (!isFitWidthEnabled) return;

    setIsPreviewPinned(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);
    setPinnedPreviewMetricsIfChanged(null);
  }, [isFitWidthEnabled, setPinnedPreviewMetricsIfChanged]);

  // Reset the transient "starting" UI once playback either begins or falls
  // back to a manual retry state.
  React.useEffect(() => {
    if (!player.needsUserPlay || (!player.isLoading && !player.isPlaying)) {
      setIsStartingPlay(false);
    }
  }, [player.isLoading, player.isPlaying, player.needsUserPlay]);


  // Auto-pin when the settings panel is open and user scrolls up.
  React.useEffect(() => {
    if (controlPanelMode === "playback" || isPreviewMaximized || isPreviewPinned || isFitWidthEnabled) {
      setIsAutoPreviewPinned(false);
      setAutoPinnedHiddenOffset(0);
      return;
    }

    const updateAutoPinNow = () => {
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
            setPinnedPreviewMetricsIfChanged(nextMetrics);
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

    const scheduleUpdateAutoPin = () => {
      if (autoPinFrameRef.current !== null) return;
      autoPinFrameRef.current = window.requestAnimationFrame(() => {
        autoPinFrameRef.current = null;
        updateAutoPinNow();
      });
    };

    updateAutoPinNow();
    window.addEventListener("scroll", scheduleUpdateAutoPin, { passive: true });
    window.addEventListener("resize", scheduleUpdateAutoPin);

    return () => {
      if (autoPinFrameRef.current !== null) {
        window.cancelAnimationFrame(autoPinFrameRef.current);
        autoPinFrameRef.current = null;
      }
      window.removeEventListener("scroll", scheduleUpdateAutoPin);
      window.removeEventListener("resize", scheduleUpdateAutoPin);
    };
  }, [
    controlPanelMode,
    isFitWidthEnabled,
    isPreviewMaximized,
    isPreviewPinned,
    measurePinnedPreviewMetrics,
    setPinnedPreviewMetricsIfChanged,
  ]);

  // Keep pinned shell metrics in sync with layout changes.
  React.useEffect(() => {
    const shouldPinPreview =
      (isPreviewPinned || isAutoPreviewPinned) && !isPreviewMaximized;

    if (!shouldPinPreview) {
      setPinnedPreviewMetricsIfChanged(null);
      return;
    }

    const updatePinnedMetricsNow = () => {
      const nextMetrics = measurePinnedPreviewMetrics();
      if (!nextMetrics) return;
      setPinnedPreviewMetricsIfChanged(nextMetrics);
    };

    const schedulePinnedMetricsUpdate = () => {
      if (pinnedMetricsFrameRef.current !== null) return;
      pinnedMetricsFrameRef.current = window.requestAnimationFrame(() => {
        pinnedMetricsFrameRef.current = null;
        updatePinnedMetricsNow();
      });
    };

    updatePinnedMetricsNow();
    window.addEventListener("resize", schedulePinnedMetricsUpdate);
    window.addEventListener("scroll", schedulePinnedMetricsUpdate, { passive: true });

    return () => {
      if (pinnedMetricsFrameRef.current !== null) {
        window.cancelAnimationFrame(pinnedMetricsFrameRef.current);
        pinnedMetricsFrameRef.current = null;
      }
      window.removeEventListener("resize", schedulePinnedMetricsUpdate);
      window.removeEventListener("scroll", schedulePinnedMetricsUpdate);
    };
  }, [
    controlPanelMode,
    isAutoPreviewPinned,
    isPreviewMaximized,
    isPreviewPinned,
    isFitWidthEnabled,
    measurePinnedPreviewMetrics,
    player.sourceDimensions,
    setPinnedPreviewMetricsIfChanged,
  ]);

  // Refresh canvas layout when pin/maximize state changes.
  React.useEffect(() => {
    scheduleRefreshLayout();
  }, [
    isPreviewPinned,
    isPreviewMaximized,
    player.sourceDimensions?.height,
    player.sourceDimensions?.width,
    scheduleRefreshLayout,
  ]);

  React.useEffect(() => {
    return () => {
      if (refreshLayoutFrameRef.current !== null) {
        window.cancelAnimationFrame(refreshLayoutFrameRef.current);
        refreshLayoutFrameRef.current = null;
      }
    };
  }, []);

  // --- Computed values ---

  const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = React.useState(false);
  const [turnOverlayDirection, setTurnOverlayDirection] = React.useState<RetroPageTurnDirection>(null);
  const hasShownOnceRef = React.useRef(false);
  const turnOverlayTimerRef = React.useRef<number | null>(null);
  const loadingOverlayTimerRef = React.useRef<number | null>(null);
  const loadingOverlayHoldTimerRef = React.useRef<number | null>(null);
  const requestedImagePageTurnTokenRef = React.useRef(player.pageTurnToken);
  const displayedImagePageTurnTokenRef = React.useRef(player.pageTurnToken);
  const delayedImageOverlayPendingRef = React.useRef(false);
  const isImagePreviewRequested = player.requestedKind === "image" || player.hasImage;
  const shouldKeepNativeVisualVisible =
    player.shouldUseNativeVisualSurface || (isImagePreviewRequested && player.isLoading);
  const loadingPageLabel = resolveOverlayPrimaryLabel(
    player.previewName || "",
    player.requestedIndex,
  );
  const shouldShowImagePageOverlay =
    isImagePreviewRequested &&
    !player.needsUserPlay &&
    !player.previewError &&
    showLoadingOverlay;

  React.useEffect(() => {
    if (!isImagePreviewRequested) {
      requestedImagePageTurnTokenRef.current = player.pageTurnToken;
      displayedImagePageTurnTokenRef.current = player.pageTurnToken;
      delayedImageOverlayPendingRef.current = false;
      if (!player.isLoading) {
        setShowLoadingOverlay(false);
        return;
      }
      setShowLoadingOverlay(false);
      const timer = window.setTimeout(() => setShowLoadingOverlay(true), 350);
      return () => window.clearTimeout(timer);
    }

    const previousRequestedToken = requestedImagePageTurnTokenRef.current;
    const hasNewPageTurnRequest = previousRequestedToken !== player.pageTurnToken;
    const hasPendingUndisplayedPage =
      displayedImagePageTurnTokenRef.current < previousRequestedToken;
    const shouldShowOverlayImmediately =
      hasNewPageTurnRequest && (hasPendingUndisplayedPage || delayedImageOverlayPendingRef.current);
    requestedImagePageTurnTokenRef.current = player.pageTurnToken;

    if (loadingOverlayTimerRef.current !== null) {
      window.clearTimeout(loadingOverlayTimerRef.current);
      loadingOverlayTimerRef.current = null;
    }
    if (loadingOverlayHoldTimerRef.current !== null) {
      window.clearTimeout(loadingOverlayHoldTimerRef.current);
      loadingOverlayHoldTimerRef.current = null;
    }

    if (player.isLoading) {
      const showAndHoldOverlay = () => {
        delayedImageOverlayPendingRef.current = false;
        setShowLoadingOverlay(true);
        loadingOverlayHoldTimerRef.current = window.setTimeout(() => {
          setShowLoadingOverlay(false);
          loadingOverlayHoldTimerRef.current = null;
        }, 220);
      };

      if (shouldShowOverlayImmediately) {
        showAndHoldOverlay();
      } else {
        delayedImageOverlayPendingRef.current = true;
        setShowLoadingOverlay(false);
        loadingOverlayTimerRef.current = window.setTimeout(() => {
          loadingOverlayTimerRef.current = null;
          showAndHoldOverlay();
        }, 300);
      }
      return () => {
        if (loadingOverlayTimerRef.current !== null) {
          window.clearTimeout(loadingOverlayTimerRef.current);
          loadingOverlayTimerRef.current = null;
        }
        if (loadingOverlayHoldTimerRef.current !== null) {
          window.clearTimeout(loadingOverlayHoldTimerRef.current);
          loadingOverlayHoldTimerRef.current = null;
        }
      };
    }

    displayedImagePageTurnTokenRef.current = player.pageTurnToken;
    requestedImagePageTurnTokenRef.current = player.pageTurnToken;
    delayedImageOverlayPendingRef.current = false;
    setShowLoadingOverlay(false);
  }, [
    isImagePreviewRequested,
    player.isLoading,
    player.pageTurnToken,
  ]);

  React.useEffect(() => {
    if (player.isRendererReady) {
      setIsCanvasVisible(true);
    } else {
      setIsCanvasVisible(false);
    }
  }, [player.isRendererReady]);

  React.useEffect(() => {
    if (!player.pageTurnDirection) {
      return;
    }
    setTurnOverlayDirection(player.pageTurnDirection);
    if (turnOverlayTimerRef.current !== null) {
      window.clearTimeout(turnOverlayTimerRef.current);
    }
    turnOverlayTimerRef.current = window.setTimeout(() => {
      setTurnOverlayDirection(null);
      turnOverlayTimerRef.current = null;
    }, 220);
  }, [player.pageTurnDirection, player.pageTurnToken]);

  React.useEffect(() => {
    const host = nativeVideoHostRef.current;
    const visual = player.nativeVisualElement;

    if (!host || !player.shouldUseNativeVisualSurface || !visual) {
      return;
    }

    if (visual instanceof HTMLVideoElement) {
      visual.controls = false;
      visual.playsInline = true;
    }
    visual.style.width = "100%";
    visual.style.height = "100%";
    visual.style.display = "block";
    visual.style.objectFit = "contain";
    visual.style.backgroundColor = "black";

    if (visual.parentElement !== host) {
      host.replaceChildren(visual);
    }

  }, [
    player.nativeVisualElement,
    player.shouldUseNativeVisualSurface,
    player.sourceDimensions?.height,
    player.sourceDimensions?.width,
  ]);

  React.useEffect(() => {
    return () => {
      if (turnOverlayTimerRef.current !== null) {
        window.clearTimeout(turnOverlayTimerRef.current);
      }
      if (loadingOverlayTimerRef.current !== null) {
        window.clearTimeout(loadingOverlayTimerRef.current);
      }
      if (loadingOverlayHoldTimerRef.current !== null) {
        window.clearTimeout(loadingOverlayHoldTimerRef.current);
      }
      nativeVideoHostRef.current?.replaceChildren();
    };
  }, []);

  // 一度表示されたら次回以降は短いフェードにする
  React.useEffect(() => {
    if (!isCanvasVisible) return;
    return () => { hasShownOnceRef.current = true; };
  }, [isCanvasVisible]);

  const stableDimensionsRef = React.useRef(player.sourceDimensions);
  if (player.sourceDimensions) stableDimensionsRef.current = player.sourceDimensions;
  const effectiveDimensions = stableDimensionsRef.current;

  const previewAspectRatio = React.useMemo(() => {
    if (!effectiveDimensions) return undefined;
    return `${effectiveDimensions.width} / ${effectiveDimensions.height}`;
  }, [effectiveDimensions]);

  // For pin mode: compute explicit pixel width from JS to avoid Safari
  // aspect-ratio + vh interaction issues.
  const pinnedContentWidth = React.useMemo(() => {
    if (!effectiveDimensions || !pinnedPreviewMetrics) return undefined;
    const { width: srcW, height: srcH } = effectiveDimensions;
    const ar = srcW / Math.max(srcH, 1);
    const maxH = typeof window !== "undefined" ? window.innerHeight * 0.5 : 300;
    const idealW = maxH * ar;
    return `${Math.floor(Math.min(idealW, pinnedPreviewMetrics.width))}px`;
  }, [effectiveDimensions, pinnedPreviewMetrics]);

  const isPinnedPreview =
    (isPreviewPinned || isAutoPreviewPinned) && !isPreviewMaximized;
  const pinnedPreviewTop = isAutoPreviewPinned
    ? `calc(max(0.0rem, env(safe-area-inset-top)) - ${autoPinnedHiddenOffset}px)`
    : undefined;
  const showRetryOverlay =
    player.previewStatus?.kind === "retryable" &&
    player.hasPlayableMedia &&
    !player.needsUserPlay &&
    !player.isLoading;
  const manualRetryMessage = player.previewError || "Playback is still preparing. Press Play to retry this video.";

  // Notify parent when pin state changes so it can adjust the layout slot height.
  React.useEffect(() => {
    onIsPinnedPreviewChange?.(isPinnedPreview);
  }, [isPinnedPreview, onIsPinnedPreviewChange]);

  React.useEffect(() => {
    const nextState = normalizeRetroPreviewLayoutState({
      isFitWidthEnabled,
      isPreviewMaximized,
      isPreviewPinned: isPinnedPreview,
    });
    if (areRetroPreviewLayoutStatesEqual(emittedPreviewLayoutStateRef.current, nextState)) {
      return;
    }
    emittedPreviewLayoutStateRef.current = nextState;
    onPreviewLayoutStateChange?.(nextState);
  }, [
    isFitWidthEnabled,
    isPinnedPreview,
    isPreviewMaximized,
    onPreviewLayoutStateChange,
  ]);

  // --- Render ---

  const handleRecordClick = () => {
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
    void armAlarmAtTime(alarmTime);
  };

  const handleClearAlarm = () => {
    clearAlarm();
  };

  const handleArmAlarmIn = (minutes: number) => {
    void armAlarmIn(minutes);
  };

  const handleTestAlarm = () => {
    testAlarm();
  };

  const updatePreviewPointer = React.useCallback((
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!onPreviewPointerMove) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    onPreviewPointerMove({ x, y });
  }, [onPreviewPointerMove]);

  const handlePreviewPointerDown = React.useCallback((
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    // Don't steal the pointer from interactive controls (e.g. the "Press
    // Play to start" overlay button) layered on top of the preview area —
    // capturing here can prevent the browser from routing the subsequent
    // click to that descendant element (observed in Firefox).
    if ((event.target as HTMLElement | null)?.closest("button, [role='button'], a, input, select, textarea")) {
      return;
    }
    activePreviewPointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updatePreviewPointer(event);
  }, [updatePreviewPointer]);

  const handlePreviewPointerMove = React.useCallback((
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (activePreviewPointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.buttons === 0 && event.pointerType !== "touch") {
      activePreviewPointerIdRef.current = null;
      return;
    }

    updatePreviewPointer(event);
  }, [updatePreviewPointer]);

  const handlePreviewPointerEnd = React.useCallback((
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (activePreviewPointerIdRef.current !== event.pointerId) {
      return;
    }

    activePreviewPointerIdRef.current = null;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

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
                : isPinnedPreview
                  ? {
                      // Pin mode: use JS-computed pixel width to avoid Safari
                      // aspect-ratio + vh interaction expanding beyond window.
                      height: "50vh",
                      width: pinnedContentWidth ?? "100%",
                      maxWidth: "100%",
                      margin: "0 auto",
                    }
                  : previewAspectRatio
                    ? {
                        aspectRatio: previewAspectRatio,
                        maxWidth: fillHeight
                          ? "100%"
                          : controlPanelMode === "playback"
                            ? `min(100%, calc(min(60dvh, calc(100dvh - 260px)) * ${previewAspectRatio}))`
                            : `min(100%, calc(70dvh * ${previewAspectRatio}))`,
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
            className={`relative w-full overflow-visible rounded-xl bg-slate-950 ${previewAspectRatio ? "h-full" : "h-full min-h-[100px]"}`}
            style={{
              filter: brightness !== 1.0 ? `brightness(${brightness})` : undefined,
              transform: (flipH || flipV) ? `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` : undefined,
            }}
            onPointerDown={handlePreviewPointerDown}
            onPointerMove={handlePreviewPointerMove}
            onPointerUp={handlePreviewPointerEnd}
            onPointerCancel={handlePreviewPointerEnd}
            >
            <div
              ref={player.canvasHostRef}
              className="pointer-events-none relative h-full w-full touch-manipulation"
              style={{
                opacity:
                  player.shouldUseNativeVisualSurface
                    ? 0
                    : isCanvasVisible
                      ? 1
                      : 0,
                transition: `opacity ${hasShownOnceRef.current ? "0.15s" : "0.4s"} ease`,
              }}
            />
            {shouldKeepNativeVisualVisible && (
              <div
                ref={nativeVideoHostRef}
                className="absolute inset-0 overflow-hidden rounded-xl bg-black"
                style={{
                  opacity: shouldKeepNativeVisualVisible ? 1 : 0,
                  transition: `opacity ${hasShownOnceRef.current ? "0.15s" : "0.4s"} ease`,
                }}
              />
            )}
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
            {shouldShowImagePageOverlay && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/46">
                <div className="w-[min(84%,30rem)] rounded-2xl border border-slate-700 bg-slate-950 px-6 py-5 text-center text-slate-100">
                  <p className="break-words text-[min(3.4vw,0.95rem)] font-medium leading-snug text-slate-200">
                    {loadingPageLabel}
                  </p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800/90">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400/40 via-sky-100 to-sky-400/40"
                      style={{
                        width: "42%",
                        transform:
                          turnOverlayDirection === "next"
                            ? "translateX(130%)"
                            : turnOverlayDirection === "prev"
                              ? "translateX(-30%)"
                              : "translateX(40%)",
                        transition: "transform 0.22s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {showLoadingOverlay && !player.needsUserPlay && !player.previewError && !isImagePreviewRequested && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/72"
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
                  {isStartingPlay ? (
                    <>
                      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                      <p className="text-sm text-slate-400">Starting playback…</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300/80">
                        {player.previewError ? "Retry Playback" : "Preview Ready"}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-100">
                        {player.previewError ? "Press Play to retry" : "Press Play to start"}
                      </p>
                      <p className="mt-2 text-sm text-slate-400">
                        {player.previewError
                          ? manualRetryMessage
                          : "Safari may require a direct user action before video and audio can begin."}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsStartingPlay(true);
                          void player.togglePlayback();
                        }}
                        className="mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20"
                      >
                        Play
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {showRetryOverlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/52">
                <div className="w-[min(92%,30rem)] rounded-2xl border border-rose-500/25 bg-slate-900/94 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm">
                  {isStartingPlay ? (
                    <>
                      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                      <p className="text-sm text-slate-400">Retrying playback…</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[11px] uppercase tracking-[0.35em] text-rose-300/80">
                        Playback Paused
                      </p>
                      <p className="mt-3 text-sm text-slate-200">
                        {player.previewStatus?.message ?? player.previewError}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        Playback may still recover. Press Play to retry this source.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsStartingPlay(true);
                          void player.togglePlayback();
                        }}
                        className="mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20"
                      >
                        Play
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {player.isBuffering && player.isPlaying && !player.isLoading && !player.needsUserPlay && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-xl border border-slate-700/60 bg-slate-950/70 px-4 py-3 text-center text-xs text-slate-300 backdrop-blur-sm">
                  <div className="mx-auto mb-2 h-5 w-5 animate-spin rounded-full border-2 border-slate-500 border-t-sky-400" />
                  Buffering…
                </div>
              </div>
            )}
            {player.hasAudioOnly && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 px-4">
                {analyserRef && (
                  <AudioSpectrum analyserRef={analyserRef} className="w-4/5 rounded bg-slate-900/60" />
                )}
                <p className="text-center text-sm text-slate-400">
                  Audio preview is playing through the retro audio chain.
                </p>
              </div>
            )}
            {!player.hasAudioOnly && analyserRef && showVideoSpectrum && (
              <div className="pointer-events-none absolute bottom-1 left-1 right-1 z-10">
                <AudioSpectrum analyserRef={analyserRef} className="w-full rounded bg-black/50" />
              </div>
            )}
            {showClockOverlay && <DigitalClockOverlay />}
          </div>

          {/* Floating buttons: maximized mode — overlaid below canvas */}
          {!isFitWidthEnabled && isPreviewMaximized && (
            <div className="absolute -bottom-8 -right-4 z-50 flex items-center gap-2">
              <RetroPreviewToolbar
                locale={locale}
                player={player}
                isHighResolution={isHighResolution}
                renderResolutionPreset={renderResolutionPreset}
                isFitWidthEnabled={isFitWidthEnabled}
                isPinnedPreview={isPinnedPreview}
                isPreviewMaximized={isPreviewMaximized}
                brightness={brightness}
                flipH={flipH}
                flipV={flipV}
                alarmTime={alarmTime}
                alarmTargetAt={alarmTargetAt}
                alarmStatus={alarmStatus}
                formatAlarmTarget={formatAlarmTarget}
                onAlarmTimeChange={setAlarmTime}
                onArmAlarm={handleArmAlarm}
                onArmAlarmIn={handleArmAlarmIn}
                onClearAlarm={handleClearAlarm}
                onTestAlarm={handleTestAlarm}
                onRecordClick={handleRecordClick}
                onPowerToggle={() => {
                  if (player.isPoweredOn) {
                    player.powerOff();
                    return;
                  }
                  player.powerOn();
                }}
                onHighResolutionToggle={onHighResolutionToggle}
                onFitWidthToggle={handleFitWidthToggle}
                onPinToggle={handlePinToggle}
                onMaximizeToggle={handleMaximizeToggle}
                onBrightnessChange={setBrightness}
                onFlipHToggle={() => { setFlipH((v) => !v); }}
                onFlipVToggle={() => { setFlipV((v) => !v); }}
                onAudioOptimizationModeChange={player.setAudioOptimizationMode}
                onLatencyHintChange={player.setLatencyHint}
                ffmpegUseQsv={ffmpegUseQsv}
                onToggleFfmpegUseQsv={onToggleFfmpegUseQsv}
                ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
                onFfmpegMaxConcurrentHlsSessionsChange={onFfmpegMaxConcurrentHlsSessionsChange}
                selectedPreset={selectedPreset}
                onApplyPreset={onApplyPreset}
              />
            </div>
          )}
        </div>

        {/* Pinned mode toolbar — absolute relative to the fixed shell (not the canvas),
            so horizontal position tracks the shell width and stays stable. */}
        {!isFitWidthEnabled && isPinnedPreview && (
          <div className="absolute -bottom-8 right-0 z-50 flex items-center gap-2">
            <RetroPreviewToolbar
              locale={locale}
              player={player}
              isHighResolution={isHighResolution}
              renderResolutionPreset={renderResolutionPreset}
              isFitWidthEnabled={isFitWidthEnabled}
              isPinnedPreview={isPinnedPreview}
              isPreviewMaximized={isPreviewMaximized}
              brightness={brightness}
              flipH={flipH}
              flipV={flipV}
              alarmTime={alarmTime}
              alarmTargetAt={alarmTargetAt}
              alarmStatus={alarmStatus}
              formatAlarmTarget={formatAlarmTarget}
              onAlarmTimeChange={setAlarmTime}
              onArmAlarm={handleArmAlarm}
              onArmAlarmIn={handleArmAlarmIn}
              onClearAlarm={handleClearAlarm}
              onTestAlarm={handleTestAlarm}
              onRecordClick={handleRecordClick}
              onPowerToggle={() => {
                if (player.isPoweredOn) {
                  player.powerOff();
                  return;
                }
                player.powerOn();
              }}
              onHighResolutionToggle={onHighResolutionToggle}
              onFitWidthToggle={handleFitWidthToggle}
              onPinToggle={handlePinToggle}
              onMaximizeToggle={handleMaximizeToggle}
              onBrightnessChange={setBrightness}
              onFlipHToggle={() => { setFlipH((v) => !v); }}
              onFlipVToggle={() => { setFlipV((v) => !v); }}
              onAudioOptimizationModeChange={player.setAudioOptimizationMode}
              onLatencyHintChange={player.setLatencyHint}
              ffmpegUseQsv={ffmpegUseQsv}
              onToggleFfmpegUseQsv={onToggleFfmpegUseQsv}
              ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
              onFfmpegMaxConcurrentHlsSessionsChange={onFfmpegMaxConcurrentHlsSessionsChange}
              selectedPreset={selectedPreset}
              onApplyPreset={onApplyPreset}
            />
          </div>
        )}

        {/* Fit-width maximize: buttons live inside the scrollable shell so
            they are reachable after scrolling through tall content. */}
        {isFitWidthEnabled && isPreviewMaximized && (
          <div className="flex items-center justify-end gap-2 pt-2 pr-0">
            <RetroPreviewToolbar
              locale={locale}
              player={player}
              isHighResolution={isHighResolution}
              renderResolutionPreset={renderResolutionPreset}
              isFitWidthEnabled={isFitWidthEnabled}
              isPinnedPreview={isPinnedPreview}
              isPreviewMaximized={isPreviewMaximized}
              brightness={brightness}
              flipH={flipH}
              flipV={flipV}
              alarmTime={alarmTime}
              alarmTargetAt={alarmTargetAt}
              alarmStatus={alarmStatus}
              formatAlarmTarget={formatAlarmTarget}
              onAlarmTimeChange={setAlarmTime}
              onArmAlarm={handleArmAlarm}
              onArmAlarmIn={handleArmAlarmIn}
              onClearAlarm={handleClearAlarm}
              onTestAlarm={handleTestAlarm}
              onRecordClick={handleRecordClick}
              onPowerToggle={() => {
                if (player.isPoweredOn) {
                  player.powerOff();
                  return;
                }
                player.powerOn();
              }}
              onHighResolutionToggle={onHighResolutionToggle}
              onFitWidthToggle={handleFitWidthToggle}
              onPinToggle={handlePinToggle}
              onMaximizeToggle={handleMaximizeToggle}
              onBrightnessChange={setBrightness}
              onFlipHToggle={() => { setFlipH((v) => !v); }}
              onFlipVToggle={() => { setFlipV((v) => !v); }}
              onAudioOptimizationModeChange={player.setAudioOptimizationMode}
              onLatencyHintChange={player.setLatencyHint}
              ffmpegUseQsv={ffmpegUseQsv}
              onToggleFfmpegUseQsv={onToggleFfmpegUseQsv}
              ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
              onFfmpegMaxConcurrentHlsSessionsChange={onFfmpegMaxConcurrentHlsSessionsChange}
              selectedPreset={selectedPreset}
              onApplyPreset={onApplyPreset}
            />
          </div>
        )}
      </div>

      {/* Normal mode toolbar: document flow, right-aligned, overlapping shell bottom */}
      {!isFitWidthEnabled && !isPreviewMaximized && !isPinnedPreview && (
        <div className="flex items-center justify-end gap-2 -mt-3 pr-1">
          <RetroPreviewToolbar
            locale={locale}
            player={player}
            isHighResolution={isHighResolution}
            renderResolutionPreset={renderResolutionPreset}
            isFitWidthEnabled={isFitWidthEnabled}
            isPinnedPreview={isPinnedPreview}
            isPreviewMaximized={isPreviewMaximized}
            brightness={brightness}
            flipH={flipH}
            flipV={flipV}
            alarmTime={alarmTime}
            alarmTargetAt={alarmTargetAt}
            alarmStatus={alarmStatus}
            formatAlarmTarget={formatAlarmTarget}
            onAlarmTimeChange={setAlarmTime}
            onArmAlarm={handleArmAlarm}
            onArmAlarmIn={handleArmAlarmIn}
            onClearAlarm={handleClearAlarm}
            onTestAlarm={handleTestAlarm}
            onRecordClick={handleRecordClick}
            onPowerToggle={() => {
              if (player.isPoweredOn) {
                player.powerOff();
                return;
              }
              player.powerOn();
            }}
            onHighResolutionToggle={onHighResolutionToggle}
            onFitWidthToggle={handleFitWidthToggle}
            onPinToggle={handlePinToggle}
            onMaximizeToggle={handleMaximizeToggle}
            onBrightnessChange={setBrightness}
            onFlipHToggle={() => { setFlipH((v) => !v); }}
            onFlipVToggle={() => { setFlipV((v) => !v); }}
            onAudioOptimizationModeChange={player.setAudioOptimizationMode}
            onLatencyHintChange={player.setLatencyHint}
            ffmpegUseQsv={ffmpegUseQsv}
            onToggleFfmpegUseQsv={onToggleFfmpegUseQsv}
            ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
            onFfmpegMaxConcurrentHlsSessionsChange={onFfmpegMaxConcurrentHlsSessionsChange}
            selectedPreset={selectedPreset}
            onApplyPreset={onApplyPreset}
          />
        </div>
      )}

      {/* Fit-width normal mode: buttons below the shell in document flow.
          Excluded when maximized — the shell's internal button bar handles it. */}
      {isFitWidthEnabled && !isPreviewMaximized && (
        <div className="flex items-center justify-end gap-2 pt-2 pr-0">
          <RetroPreviewToolbar
          locale={locale}
          player={player}
          isHighResolution={isHighResolution}
          renderResolutionPreset={renderResolutionPreset}
          isFitWidthEnabled={isFitWidthEnabled}
            isPinnedPreview={isPinnedPreview}
            isPreviewMaximized={isPreviewMaximized}
            brightness={brightness}
            flipH={flipH}
            flipV={flipV}
            alarmTime={alarmTime}
            alarmTargetAt={alarmTargetAt}
            alarmStatus={alarmStatus}
            formatAlarmTarget={formatAlarmTarget}
            onAlarmTimeChange={setAlarmTime}
            onArmAlarm={handleArmAlarm}
            onArmAlarmIn={handleArmAlarmIn}
            onClearAlarm={handleClearAlarm}
            onTestAlarm={handleTestAlarm}
            onRecordClick={handleRecordClick}
            onPowerToggle={() => {
              if (player.isPoweredOn) {
                player.powerOff();
                return;
              }
              player.powerOn();
            }}
            onHighResolutionToggle={onHighResolutionToggle}
            onFitWidthToggle={handleFitWidthToggle}
            onPinToggle={handlePinToggle}
            onMaximizeToggle={handleMaximizeToggle}
            onBrightnessChange={setBrightness}
            onFlipHToggle={() => { setFlipH((v) => !v); }}
            onFlipVToggle={() => { setFlipV((v) => !v); }}
            onAudioOptimizationModeChange={player.setAudioOptimizationMode}
            onLatencyHintChange={player.setLatencyHint}
            ffmpegUseQsv={ffmpegUseQsv}
            onToggleFfmpegUseQsv={onToggleFfmpegUseQsv}
            ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
            onFfmpegMaxConcurrentHlsSessionsChange={onFfmpegMaxConcurrentHlsSessionsChange}
            selectedPreset={selectedPreset}
            onApplyPreset={onApplyPreset}
          />
        </div>
      )}

      {/* Spacer that holds layout space while the shell is fixed/pinned */}
      {isPinnedPreview && pinnedPreviewMetrics && (
        <div style={{ height: `min(${pinnedPreviewMetrics.height}px, 50vh)` }} />
      )}

      {/* Alarm overlay:
            - "armed"    → clock / waiting screen, locks all controls
            - "triggered" + no audible media → ringing tone, locks until stopped */}
      {isAlarmOverlayVisible && (
        <div
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-slate-950/96 backdrop-blur-md"
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
                {locale === "ja" ? "ボタンを押して解除" : "Press the button to dismiss"}
              </p>
              <p className="pointer-events-none mt-3 max-w-xs text-center text-[10px] leading-relaxed text-slate-700">
                {locale === "ja"
                  ? "※ バックグラウンド動作はブラウザ依存。他のウィンドウが前面にある場合など、正常に動作しないことがあります。"
                  : "※ Background behavior depends on the browser and may not work reliably when another window is in front."}
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
                onClick={handleClearAlarm}
                className="pointer-events-auto mt-12 rounded-full border border-amber-400/40 bg-amber-500/15 px-8 py-3 text-sm text-amber-200 transition hover:bg-amber-500/25 active:scale-95"
              >
                {locale === "ja" ? "アラームを止める" : "Stop Alarm"}
              </button>
              <p className="pointer-events-none mt-5 text-xs text-slate-600">
                {locale === "ja" ? "ボタンを押して止める" : "Press the button to stop"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
