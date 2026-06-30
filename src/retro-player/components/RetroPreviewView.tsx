import React from "react";
import {
  Bell,
  Minimize2,
} from "lucide-react";
import type { RetroAudioSettings } from "../audio/preset";
import type { ConfirmDialogFn, RetroPlayerLocale } from "../types";
import {
  loadPersistedRetroSettings,
  savePersistedRetroUiSettings,
} from "../hooks/persistedRetroSettings";
import { useRetroAlarm } from "../hooks/useRetroAlarm";
import { RetroPreviewToolbar } from "./RetroPreviewToolbar";
import { AudioSpectrum } from "./AudioSpectrum";

// Subset of the player object that RetroPreviewView needs.
// Add new player capabilities here, not in RetroPlayer.
export type RetroPreviewPlayerSlice = {
  canvasHostRef: React.RefObject<HTMLDivElement | null>;
  nativeVideoElement: HTMLVideoElement | null;
  shouldUseNativeVideoSurface: boolean;
  isPoweredOn: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  loadingLabel: string;
  needsUserPlay: boolean;
  hasAudioOnly: boolean;
  previewError: string;
  isRendererReady: boolean;
  sourceDimensions: { width: number; height: number } | null;
  viewportRect: { width: number; height: number; x: number; y: number } | null;
  audioOptimizationMode: RetroAudioSettings["audioOptimizationMode"];
  latencyHint: AudioContextLatencyCategory;
  hasPlayableMedia: boolean;
  hasAudibleMedia: boolean;
  canRecord: boolean;
  isRecording: boolean;
  prefersShareExport: boolean;
  isPlaying: boolean;
  togglePlayback: () => Promise<void>;
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
  onIsPinnedPreviewChange?: (isPinned: boolean) => void;
  analyserRef?: React.RefObject<AnalyserNode | null>;
  showVideoSpectrum?: boolean;
};

export function RetroPreviewView({
  locale,
  src: _src,
  kind: _kind,
  player,
  isHighResolution,
  isFitWidthEnabled,
  controlPanelMode,
  confirmDialog,
  onHighResolutionChange,
  onFitWidthChange,
  onError,
  fillHeight = false,
  onIsPinnedPreviewChange,
  analyserRef,
  showVideoSpectrum,
}: RetroPreviewViewProps) {
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
    savePersistedRetroUiSettings({ isPreviewMaximized, isHighResolution, brightness, flipH, flipV });
  }, [isHighResolution, isPreviewMaximized, brightness, flipH, flipV]);

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
    setPinnedPreviewMetrics(null);
  }, [isPreviewMaximized]);

  // Fit Width ON: reset pin state (after render so layout has settled).
  React.useEffect(() => {
    if (!isFitWidthEnabled) return;

    setIsPreviewPinned(false);
    setIsAutoPreviewPinned(false);
    setAutoPinnedHiddenOffset(0);
    setPinnedPreviewMetrics(null);
  }, [isFitWidthEnabled]);

  // Reset isStartingPlay once the video begins playing (needsUserPlay clears).
  React.useEffect(() => {
    if (!player.needsUserPlay) setIsStartingPlay(false);
  }, [player.needsUserPlay]);


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
    controlPanelMode,
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

  const [showLoadingOverlay, setShowLoadingOverlay] = React.useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = React.useState(false);
  const hasShownOnceRef = React.useRef(false);

  React.useEffect(() => {
    if (!player.isLoading) {
      setShowLoadingOverlay(false);
      return;
    }
    const timer = window.setTimeout(() => setShowLoadingOverlay(true), 350);
    return () => window.clearTimeout(timer);
  }, [player.isLoading]);

  React.useEffect(() => {
    if (player.isRendererReady && !player.isLoading) {
      setIsCanvasVisible(true);
    } else {
      setIsCanvasVisible(false);
    }
  }, [player.isRendererReady, player.isLoading]);

  React.useEffect(() => {
    const host = nativeVideoHostRef.current;
    const video = player.nativeVideoElement;

    if (!host || !player.shouldUseNativeVideoSurface || !video) {
      return;
    }

    video.controls = false;
    video.playsInline = true;
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.display = "block";
    video.style.objectFit = "contain";
    video.style.backgroundColor = "black";

    if (video.parentElement !== host) {
      host.replaceChildren(video);
    }

    return () => {
      if (video.parentElement === host) {
        host.replaceChildren();
      }
    };
  }, [
    player.nativeVideoElement,
    player.shouldUseNativeVideoSurface,
    player.sourceDimensions?.height,
    player.sourceDimensions?.width,
  ]);

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

  // Notify parent when pin state changes so it can adjust the layout slot height.
  React.useEffect(() => {
    onIsPinnedPreviewChange?.(isPinnedPreview);
  }, [isPinnedPreview, onIsPinnedPreviewChange]);

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
              className="safe-top-right-offset absolute z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800"
            >
              <Minimize2 size={16} />
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
          >
            <div
              ref={player.canvasHostRef}
              className="pointer-events-none relative h-full w-full touch-manipulation"
              style={{
                opacity:
                  player.shouldUseNativeVideoSurface
                    ? 0
                    : isCanvasVisible
                      ? 1
                      : 0,
                transition: `opacity ${hasShownOnceRef.current ? "0.15s" : "0.4s"} ease`,
              }}
            />
            {player.shouldUseNativeVideoSurface && (
              <div
                ref={nativeVideoHostRef}
                className="absolute inset-0 overflow-hidden rounded-xl bg-black"
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
            {showLoadingOverlay && !player.needsUserPlay && !player.previewError && (
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
                        onClick={() => {
                          setIsStartingPlay(true);
                          void player.playVideoWithAudio();
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
          </div>

          {/* Floating buttons: maximized mode — overlaid below canvas */}
          {!isFitWidthEnabled && isPreviewMaximized && (
            <div className="absolute -bottom-8 -right-4 z-50 flex items-center gap-2">
              <RetroPreviewToolbar
                locale={locale}
                player={player}
                isHighResolution={isHighResolution}
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
                onHighResolutionChange={onHighResolutionChange}
                onFitWidthToggle={() => {
                  if (!isFitWidthEnabled) setIsPreviewMaximized(false);
                  onFitWidthChange(!isFitWidthEnabled);
                }}
                onPinToggle={() => {
                  if (isPreviewMaximized) return;
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
                onMaximizeToggle={() => {
                  if (!isPreviewMaximized) onFitWidthChange(false);
                  setIsPreviewMaximized((c) => !c);
                }}
                onBrightnessChange={setBrightness}
                onFlipHToggle={() => { setFlipH((v) => !v); }}
                onFlipVToggle={() => { setFlipV((v) => !v); }}
                onAudioOptimizationModeChange={player.setAudioOptimizationMode}
                onLatencyHintChange={player.setLatencyHint}
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
              onHighResolutionChange={onHighResolutionChange}
              onFitWidthToggle={() => {
                if (!isFitWidthEnabled) setIsPreviewMaximized(false);
                onFitWidthChange(!isFitWidthEnabled);
              }}
              onPinToggle={() => {
                if (isPreviewMaximized) return;
                if (isFitWidthEnabled) onFitWidthChange(false);
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
              onMaximizeToggle={() => {
                if (!isPreviewMaximized) onFitWidthChange(false);
                setIsPreviewMaximized((c) => !c);
              }}
              onBrightnessChange={setBrightness}
              onFlipHToggle={() => { setFlipH((v) => !v); }}
              onFlipVToggle={() => { setFlipV((v) => !v); }}
              onAudioOptimizationModeChange={player.setAudioOptimizationMode}
              onLatencyHintChange={player.setLatencyHint}
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
              onHighResolutionChange={onHighResolutionChange}
              onFitWidthToggle={() => {
                if (!isFitWidthEnabled) setIsPreviewMaximized(false);
                onFitWidthChange(!isFitWidthEnabled);
              }}
              onPinToggle={() => {
                if (isPreviewMaximized) return;
                if (isFitWidthEnabled) onFitWidthChange(false);
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
              onMaximizeToggle={() => {
                if (!isPreviewMaximized) onFitWidthChange(false);
                setIsPreviewMaximized((c) => !c);
              }}
              onBrightnessChange={setBrightness}
              onFlipHToggle={() => { setFlipH((v) => !v); }}
              onFlipVToggle={() => { setFlipV((v) => !v); }}
              onAudioOptimizationModeChange={player.setAudioOptimizationMode}
              onLatencyHintChange={player.setLatencyHint}
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
            onHighResolutionChange={onHighResolutionChange}
            onFitWidthToggle={() => {
              if (!isFitWidthEnabled) setIsPreviewMaximized(false);
              onFitWidthChange(!isFitWidthEnabled);
            }}
            onPinToggle={() => {
              if (isPreviewMaximized) return;
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
            onMaximizeToggle={() => {
              if (!isPreviewMaximized) onFitWidthChange(false);
              setIsPreviewMaximized((c) => !c);
            }}
            onBrightnessChange={setBrightness}
            onFlipHToggle={() => { setFlipH((v) => !v); }}
            onFlipVToggle={() => { setFlipV((v) => !v); }}
            onAudioOptimizationModeChange={player.setAudioOptimizationMode}
            onLatencyHintChange={player.setLatencyHint}
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
            onHighResolutionChange={onHighResolutionChange}
            onFitWidthToggle={() => {
              if (!isFitWidthEnabled) setIsPreviewMaximized(false);
              onFitWidthChange(!isFitWidthEnabled);
            }}
            onPinToggle={() => {
              if (isPreviewMaximized) return;
              if (isFitWidthEnabled) onFitWidthChange(false);
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
            onMaximizeToggle={() => {
              if (!isPreviewMaximized) onFitWidthChange(false);
              setIsPreviewMaximized((c) => !c);
            }}
            onBrightnessChange={setBrightness}
            onFlipHToggle={() => { setFlipH((v) => !v); }}
            onFlipVToggle={() => { setFlipV((v) => !v); }}
            onAudioOptimizationModeChange={player.setAudioOptimizationMode}
            onLatencyHintChange={player.setLatencyHint}
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
