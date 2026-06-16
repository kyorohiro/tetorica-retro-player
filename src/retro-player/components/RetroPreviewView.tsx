import React from "react";
import {
  Aperture,
  ArrowLeftRight,
  Circle,
  Maximize2,
  Minimize2,
  Pin,
  Power,
  RotateCcw,
  Square,
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
  canRecord: boolean;
  isRecording: boolean;
  prefersShareExport: boolean;
  powerOn: () => void;
  powerOff: () => void;
  playVideoWithAudio: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
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
  onRefit: () => void;
  onError?: (error: Error) => void;
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
  onRefit,
  onError,
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
          refit: "Refit: プレビュー配置を立て直します。",
          pinUnavailable: "Pin: 最大化中は使えません。",
          pinOn: "Pin: プレビューを画面内に固定します。",
          pinOff: "Pin: スクロール中も見えるようにします。",
          maximizeOn: "Maximize: 通常表示に戻します。",
          maximizeOff: "Maximize: プレビューを全画面表示します。",
        }
      : {
          recordIdle: "Record: capture the current retro output.",
          recordStop: "Record: stop and export clip.",
          powerOn: "Power: turn filter on.",
          powerOff: "Power: turn filter off.",
          hiRes: "Hi-res: sharper preview, higher GPU cost.",
          fitWidthOn: "Fit width: enabled.",
          fitWidthOff: "Fit width: stretch preview to the frame width.",
          refit: "Refit: recover the preview layout.",
          pinUnavailable: "Pin: unavailable while maximize is active.",
          pinOn: "Pin: keep preview fixed on screen.",
          pinOff: "Pin: keep preview visible while you scroll.",
          maximizeOn: "Maximize: return to normal view.",
          maximizeOff: "Maximize: open the preview full screen.",
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
  const [pinnedPreviewMetrics, setPinnedPreviewMetrics] = React.useState<{
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const previewFrameRef = React.useRef<HTMLDivElement | null>(null);
  const previewAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const previewShellRef = React.useRef<HTMLDivElement | null>(null);
  const tooltipTimerRef = React.useRef<number | null>(null);

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

  // --- Effects ---

  // Persist UI settings. isHighResolution is owned by RetroPlayer but
  // persisted here since we know both values.
  React.useEffect(() => {
    savePersistedRetroUiSettings({ isPreviewMaximized, isHighResolution });
  }, [isHighResolution, isPreviewMaximized]);

  // Tooltip timer cleanup on unmount.
  React.useEffect(() => {
    return () => {
      if (tooltipTimerRef.current !== null) {
        window.clearTimeout(tooltipTimerRef.current);
      }
    };
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

  // Auto-pin when the video-settings panel is open and user scrolls up.
  React.useEffect(() => {
    if (controlPanelMode !== "video-settings" || isPreviewMaximized || isPreviewPinned || isFitWidthEnabled) {
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

  // In fit-width mode the container grows to natural content height via CSS
  // aspect-ratio, so we don't force a pixel height from the viewport rect.
  const previewFrameHeight =
    !isPreviewMaximized &&
    !isFitWidthEnabled &&
    player.viewportRect &&
    player.sourceDimensions &&
    player.sourceDimensions.width > player.sourceDimensions.height
      ? Math.max(280, Math.ceil(player.viewportRect.height + 24))
      : null;
  const normalPreviewHeight = previewFrameHeight
    ? `${previewFrameHeight}px`
    : "60vh";

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

  // Extracted so the same buttons can be placed inside the canvas area (normal
  // mode) or below it in document flow (fit-width / manga reading mode).
  const renderButtonBar = (): React.ReactNode => (
    <>
      {player.canRecord && (
        <div className="relative">
          <button
            type="button"
            aria-label={player.isRecording ? "Stop recording" : "Start recording"}
            onClick={() => {
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
            }}
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
      <div className="relative">
        <button
          type="button"
          aria-label={isFitWidthEnabled ? "Disable fit width" : "Enable fit width"}
          onClick={() => {
            hideTooltip();
            onFitWidthChange(!isFitWidthEnabled);
            // onRefit() is intentionally NOT called here.
            // RetroPlayer already calls refreshLayout() via useEffect when
            // isFitWidthEnabled changes.  In capture mode, onRefit() would
            // trigger a full previewStream() reinit with a stale fitMode
            // closure, leaving the canvas locked at the expanded size.
          }}
          onMouseEnter={() => scheduleTooltip("fit-width")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("fit-width")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
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
          aria-label="Refit preview"
          onClick={() => { hideTooltip(); onRefit(); }}
          onMouseEnter={() => scheduleTooltip("refit")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("refit")}
          onBlur={hideTooltip}
          className={[floatingButtonClass, idleFloatingButtonClass].join(" ")}
        >
          <RotateCcw size={16} />
        </button>
        {renderTooltip("refit", tooltipText.refit)}
      </div>
      <div className="relative">
        <button
          type="button"
          aria-label={isPinnedPreview ? "Unpin preview" : "Pin preview"}
          onClick={() => {
            hideTooltip();
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
          onMouseEnter={() => scheduleTooltip("pin")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("pin")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
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
          onClick={() => { hideTooltip(); setIsPreviewMaximized((c) => !c); }}
          onMouseEnter={() => scheduleTooltip("maximize")}
          onMouseLeave={hideTooltip}
          onFocus={() => scheduleTooltip("maximize")}
          onBlur={hideTooltip}
          className={[
            floatingButtonClass,
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
    </>
  );

  return (
    <div ref={previewFrameRef} className="space-y-4">
      <div ref={previewAnchorRef} aria-hidden="true" />
      <div
        ref={previewShellRef}
        className={`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${
          isPreviewMaximized
            ? "fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch"
            : isPinnedPreview
              ? "fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm"
              : "overflow-visible"
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
          <button
            type="button"
            aria-label="Exit maximize"
            title="Exit maximize"
            onClick={() => { setIsPreviewMaximized(false); }}
            className="safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800"
          >
            <Minimize2 size={18} />
          </button>
        )}

        <div
          className={`relative ${
            isPreviewMaximized ? "w-full" : "max-w-full min-w-0 overflow-visible"
          }`}
          style={
            isPreviewMaximized
              ? isFitWidthEnabled && previewAspectRatio
                ? {
                    aspectRatio: previewAspectRatio,
                    minHeight: "min(220px, max(120px, calc(100vh - 12rem)))",
                    maxHeight: "calc(100vh - 12rem)",
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
                      width: "100%",
                      height: "min(60vh, calc(100vh - 12rem))",
                      maxHeight: "calc(100vh - 12rem)",
                      minHeight: "min(220px, max(120px, calc(100vh - 12rem)))",
                    }
                  : {
                      height: normalPreviewHeight,
                      minHeight: "min(220px, max(120px, calc(100vh - 12rem)))",
                    }
          }
        >
          {/* Canvas area + overlays */}
          <div className="relative h-full w-full overflow-visible rounded-xl bg-slate-950">
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
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400" />
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
            <div className="absolute -bottom-8 right-3 z-50 flex items-center gap-2">
              {renderButtonBar()}
            </div>
          )}
        </div>
      </div>

      {/* In fit-width (manga reading) mode, buttons sit below the preview in normal document flow */}
      {isFitWidthEnabled && (
        <div className="flex items-center justify-end gap-2 pt-2 pr-1">
          {renderButtonBar()}
        </div>
      )}

      {/* Spacer that holds layout space while the shell is fixed/pinned */}
      {isPinnedPreview && pinnedPreviewMetrics && (
        <div style={{ height: `${pinnedPreviewMetrics.height}px` }} />
      )}
    </div>
  );
}
