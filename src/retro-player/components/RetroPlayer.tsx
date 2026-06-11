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
import { RetroFilterPanel } from "./RetroFilterPanel";
import { VideoControls } from "./VideoControls";
import { usePixiVideoPlayer } from "../hooks/usePixiVideoPlayer";
import {
  useRetroFilterState,
  type RetroFilterInitialState,
} from "../hooks/useRetroFilterState";
import {
  clearPersistedRetroSettings,
  loadPersistedRetroSettings,
  savePersistedRetroUiSettings,
} from "../hooks/persistedRetroSettings";
import { useDialog } from "../../useDialog";
import {
  RETRO_PRESETS,
  type RetroPresetDefinition,
  type RetroPresetKey,
} from "../retro/config";

type RetroPlayerProps = {
  src?: string;
  stream?: MediaStream | null;
  streamName?: string;
  kind?: "video" | "image" | "audio";
  looping?: boolean;
  className?: string;
  onError?: (error: Error) => void;
  initialFilterState?: RetroFilterInitialState;
};

export function RetroPlayer({
  src,
  stream,
  streamName,
  kind = "video",
  looping,
  className,
  onError,
  initialFilterState,
}: RetroPlayerProps) {
  const persistedUiSettings = React.useMemo(
    () => loadPersistedRetroSettings()?.ui,
    [],
  );
  const [isPreviewMaximized, setIsPreviewMaximized] = React.useState(
    persistedUiSettings?.isPreviewMaximized ?? false,
  );
  const [isHighResolution, setIsHighResolution] = React.useState(
    persistedUiSettings?.isHighResolution ?? false,
  );
  const [isFitWidthEnabled, setIsFitWidthEnabled] = React.useState(false);
  const [isPreviewPinned, setIsPreviewPinned] = React.useState(false);
  const [activeTooltipKey, setActiveTooltipKey] = React.useState<string | null>(null);
  const previewShellRef = React.useRef<HTMLDivElement | null>(null);
  const tooltipTimerRef = React.useRef<number | null>(null);
  const [pinnedPreviewMetrics, setPinnedPreviewMetrics] = React.useState<{
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const lastPreviewRequestRef = React.useRef<string>("");
  const lastLoopingPresetRef = React.useRef<string>("");
  const [controlPanelMode, setControlPanelMode] = React.useState<
    "playback" | "audio-settings" | "video-settings"
  >("playback");
  const { showConfirmDialog } = useDialog();
  const filterState = useRetroFilterState(initialFilterState);
  const renderResolutionScale = isHighResolution
    ? typeof window !== "undefined"
      ? Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      : 1
    : 1;
  const player = usePixiVideoPlayer(
    filterState,
    isFitWidthEnabled ? "width" : "contain",
    renderResolutionScale,
  );

  const resetAllSettings = React.useCallback(() => {
    clearPersistedRetroSettings();
    filterState.resetSettings();
    player.resetAudioSettings();
    setIsPreviewMaximized(false);
    setIsHighResolution(false);
  }, [filterState, player]);

  const syncTargetAspect = React.useCallback(() => {
    if (!player.sourceDimensions) return;

    const nextHeight = Math.max(
      8,
      Math.round(
        (filterState.targetWidth / player.sourceDimensions.width) *
          player.sourceDimensions.height /
          8,
      ) * 8,
    );

    filterState.setTargetHeight(nextHeight);
  }, [filterState.targetWidth, filterState.setTargetHeight, player.sourceDimensions]);

  const applyPresetWithAspect = React.useCallback(
    (presetKey: RetroPresetKey) => {
      filterState.applyPreset(presetKey);
      if (presetKey !== "phosphorDot" || !player.sourceDimensions) {
        return;
      }

      const preset: RetroPresetDefinition = RETRO_PRESETS.phosphorDot;
      const sourceWidth = Math.max(player.sourceDimensions.width, 1);
      const sourceHeight = Math.max(player.sourceDimensions.height, 1);
      const sourceAspect = sourceWidth / sourceHeight;
      const presetAspect = preset.width / preset.height;

      let nextWidth = preset.width;
      let nextHeight = preset.height;

      if (sourceAspect > presetAspect) {
        nextHeight = Math.max(8, Math.round((preset.width / sourceAspect) / 8) * 8);
      } else {
        nextWidth = Math.max(8, Math.round((preset.height * sourceAspect) / 8) * 8);
      }

      if (preset.width === nextWidth && preset.height === nextHeight) {
        return;
      }

      filterState.setTargetWidth(nextWidth);
      filterState.setTargetHeight(nextHeight);
    },
    [
      filterState.applyPreset,
      filterState.setTargetHeight,
      filterState.setTargetWidth,
      player.sourceDimensions,
    ],
  );

  const refitPreview = React.useCallback(() => {
    if (stream && player.isCaptureActive) {
      window.setTimeout(() => {
        void player.previewStream(
          stream,
          kind === "audio" ? "audio" : "video",
          streamName,
        );
      }, 120);
      return;
    }

    window.requestAnimationFrame(() => {
      player.refreshLayout();
      window.requestAnimationFrame(() => {
        player.refreshLayout();
      });
    });
  }, [kind, player, stream, streamName]);

  const floatingButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm";
  const glowingFloatingButtonClass =
    "border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28";
  const idleFloatingButtonClass =
    "border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90";
  const pillButtonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm";

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

  const renderTooltip = React.useCallback(
    (key: string, text: string, widthClass = "w-44") => (
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
    ),
    [activeTooltipKey],
  );

  React.useEffect(() => {
    if (stream) {
      const streamKey = `stream:${stream.id}:${kind}:${streamName ?? ""}:${renderResolutionScale}`;
      if (lastPreviewRequestRef.current === streamKey) {
        return;
      }
      lastPreviewRequestRef.current = streamKey;

      void (async () => {
        try {
          await player.previewStream(
            stream,
            kind === "audio" ? "audio" : "video",
            streamName,
          );
        } catch (error) {
          if (error instanceof Error) {
            onError?.(error);
            return;
          }

          onError?.(new Error(String(error)));
        }
      })();

      return;
    }

    if (!src) {
      lastPreviewRequestRef.current = "";
      return;
    }

    const srcKey = `src:${src}:${kind}:${renderResolutionScale}`;
    if (lastPreviewRequestRef.current === srcKey) {
      return;
    }
    lastPreviewRequestRef.current = srcKey;

    void (async () => {
      try {
        await player.previewUrl(src, kind);
      } catch (error) {
        if (error instanceof Error) {
          onError?.(error);
          return;
        }

        onError?.(new Error(String(error)));
      }
    })();
  }, [src, stream, streamName, kind, onError, player, renderResolutionScale]);

  React.useEffect(() => {
    savePersistedRetroUiSettings({
      isPreviewMaximized,
      isHighResolution,
    });
  }, [isHighResolution, isPreviewMaximized]);

  React.useEffect(() => {
    return () => {
      if (tooltipTimerRef.current !== null) {
        window.clearTimeout(tooltipTimerRef.current);
      }
    };
  }, []);

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

  React.useEffect(() => {
    if (!isPreviewMaximized) return;

    setIsPreviewPinned(false);
  }, [isPreviewMaximized]);

  React.useEffect(() => {
    if (!isPreviewPinned || isPreviewMaximized) {
      setPinnedPreviewMetrics(null);
      return;
    }

    const updatePinnedMetrics = () => {
      const element = previewShellRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setPinnedPreviewMetrics({
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePinnedMetrics();

    window.addEventListener("resize", updatePinnedMetrics);
    window.addEventListener("scroll", updatePinnedMetrics, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePinnedMetrics);
      window.removeEventListener("scroll", updatePinnedMetrics);
    };
  }, [isPreviewMaximized, isPreviewPinned, isFitWidthEnabled, player.sourceDimensions]);

  React.useEffect(() => {
    player.refreshLayout();
  }, [
    isFitWidthEnabled,
    isPreviewPinned,
    isPreviewMaximized,
    player.refreshLayout,
    player.sourceDimensions?.height,
    player.sourceDimensions?.width,
  ]);

  React.useEffect(() => {
    player.refreshLayout();
  }, [
    filterState.targetWidth,
    filterState.targetHeight,
    filterState.isFilterEnabled,
    renderResolutionScale,
    player.refreshLayout,
  ]);

  React.useEffect(() => {
    if (typeof looping !== "boolean") return;

    const mediaKey = stream
      ? `stream:${stream.id}:${kind}`
      : src
        ? `src:${src}:${kind}`
        : "";

    if (!mediaKey) {
      lastLoopingPresetRef.current = "";
      return;
    }

    const presetKey = `${mediaKey}:${looping}`;
    if (lastLoopingPresetRef.current === presetKey) {
      return;
    }

    lastLoopingPresetRef.current = presetKey;
    player.setLoopingEnabled(looping);
  }, [kind, looping, player, src, stream]);

  const previewFrameHeight =
    !isPreviewMaximized &&
    player.viewportRect &&
    player.sourceDimensions &&
    (isFitWidthEnabled ||
      player.sourceDimensions.width > player.sourceDimensions.height)
      ? Math.max(280, Math.ceil(player.viewportRect.height + 24))
      : null;

  const fitWidthAspectRatio = React.useMemo(() => {
    if (!isFitWidthEnabled || !player.sourceDimensions) {
      return undefined;
    }

    return `${player.sourceDimensions.width} / ${player.sourceDimensions.height}`;
  }, [isFitWidthEnabled, player.sourceDimensions]);

  const isPinnedPreview = isPreviewPinned && !isPreviewMaximized;
  const pinnedPreviewHeight = "min(50vh, 26rem)";

  return (
    <section
      className={
        className ??
        "rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg"
      }
    >
      <div className="space-y-4">
        <div
          ref={previewShellRef}
          className={`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${
            isPreviewMaximized
              ? `fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 ${
                  isFitWidthEnabled ? "overflow-y-auto" : "flex items-stretch justify-stretch"
                }`
              : isPinnedPreview
                ? "safe-sticky-top fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm"
              : ""
          }`}
          style={
            isPinnedPreview && pinnedPreviewMetrics
              ? {
                  left: `${pinnedPreviewMetrics.left}px`,
                  width: `${pinnedPreviewMetrics.width}px`,
                }
              : undefined
          }
        >
          {isPreviewMaximized && (
            <button
              type="button"
              aria-label="Exit maximize"
              title="Exit maximize"
              onClick={() => {
                setIsPreviewMaximized(false);
              }}
              className="safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800"
            >
              <Minimize2 size={18} />
            </button>
          )}

          <div
            className={`relative ${
              isPreviewMaximized
                ? isFitWidthEnabled
                  ? "w-full"
                  : "h-full min-h-0 w-full"
                : "w-full min-w-0"
            }`}
            style={
              isPreviewMaximized
                ? isFitWidthEnabled && fitWidthAspectRatio
                  ? {
                      aspectRatio: fitWidthAspectRatio,
                      minHeight: "220px",
                    }
                  : undefined
                : {
                    aspectRatio: isPinnedPreview ? undefined : fitWidthAspectRatio,
                    height: fitWidthAspectRatio
                      ? isPinnedPreview
                        ? pinnedPreviewHeight
                        : undefined
                      : isPinnedPreview
                        ? pinnedPreviewHeight
                      : previewFrameHeight
                        ? `${previewFrameHeight}px`
                        : "60vh",
                    minHeight: "220px",
                  }
            }
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-950">
              <div
                ref={player.canvasHostRef}
                className="pointer-events-none h-full w-full touch-manipulation"
              />
              {!player.isPoweredOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/72">
                  <div className="rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
                      Power Off
                    </p>
                    <p className="mt-2">Press power to wake the screen.</p>
                  </div>
                </div>
              )}
              {player.isLoading && !player.needsUserPlay && !player.previewError && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/72">
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
                      onClick={() => {
                        void player.playVideoWithAudio();
                      }}
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
            <div className="absolute -bottom-8 right-3 z-20 flex items-center gap-2">
              {player.canRecord && (
                <>
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
                              if (!filename) {
                                return;
                              }

                              const prefersShareExport = player.prefersShareExport;
                              const confirmed = await showConfirmDialog({
                                title: "Recording ready",
                                body: prefersShareExport
                                  ? "Share the recorded clip now?"
                                  : "Save the recorded clip now?",
                                okText: prefersShareExport ? "Share" : "Save",
                                cancelText: "Cancel",
                              });

                              if (!confirmed) {
                                return;
                              }

                              if (prefersShareExport) {
                                const shared = await player.sharePendingRecording();
                                if (!shared) {
                                  player.downloadPendingRecording();
                                }
                                return;
                              }

                              player.downloadPendingRecording();
                              return;
                            } catch (error) {
                              if (error instanceof Error) {
                                onError?.(error);
                                return;
                              }

                              onError?.(new Error(String(error)));
                              return;
                            }
                          }

                          try {
                            await player.startRecording();
                          } catch (error) {
                            if (error instanceof Error) {
                              onError?.(error);
                              return;
                            }

                            onError?.(new Error(String(error)));
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
                    {renderTooltip("record", player.isRecording ? "Record: stop and export clip." : "Record: capture the current retro output.")}
                  </div>
                </>
              )}
              <div className="relative">
                <button
                  type="button"
                  aria-label={player.isPoweredOn ? "Power off" : "Power on"}
                  onClick={() => {
                    hideTooltip();
                    if (player.isPoweredOn) {
                      player.powerOff();
                      return;
                    }

                    player.powerOn();
                  }}
                  onMouseEnter={() =>
                    scheduleTooltip(
                      "power",
                    )
                  }
                  onMouseLeave={hideTooltip}
                  onFocus={() => scheduleTooltip("power")}
                  onBlur={hideTooltip}
                  className={[
                    floatingButtonClass,
                    player.isPoweredOn
                      ? glowingFloatingButtonClass
                      : idleFloatingButtonClass,
                  ].join(" ")}
                >
                  <Power size={16} />
                </button>
                {renderTooltip("power", player.isPoweredOn ? "Power: turn filter off." : "Power: turn filter on.")}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label={
                    isHighResolution
                      ? "Disable high resolution"
                      : "Enable high resolution"
                  }
                  onClick={() => {
                    hideTooltip();
                    setIsHighResolution((current) => !current);
                  }}
                  onMouseEnter={() => scheduleTooltip("hi-res")}
                  onMouseLeave={hideTooltip}
                  onFocus={() => scheduleTooltip("hi-res")}
                  onBlur={hideTooltip}
                  className={[
                    floatingButtonClass,
                    isHighResolution
                      ? glowingFloatingButtonClass
                      : idleFloatingButtonClass,
                  ].join(" ")}
                >
                  <Aperture size={16} />
                </button>
                {renderTooltip("hi-res", "Hi-res: sharper preview, higher GPU cost.")}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label={isFitWidthEnabled ? "Disable fit width" : "Enable fit width"}
                  onClick={() => {
                    hideTooltip();
                    setIsFitWidthEnabled((current) => !current);
                    refitPreview();
                  }}
                  onMouseEnter={() => scheduleTooltip("fit-width")}
                  onMouseLeave={hideTooltip}
                  onFocus={() => scheduleTooltip("fit-width")}
                  onBlur={hideTooltip}
                  className={[
                    floatingButtonClass,
                    isFitWidthEnabled
                      ? glowingFloatingButtonClass
                      : idleFloatingButtonClass,
                  ].join(" ")}
                >
                  <ArrowLeftRight size={16} />
                </button>
                {renderTooltip("fit-width", isFitWidthEnabled ? "Fit width: enabled." : "Fit width: stretch preview to the frame width.")}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Refit preview"
                  onClick={() => {
                    hideTooltip();
                    refitPreview();
                  }}
                  onMouseEnter={() => scheduleTooltip("refit")}
                  onMouseLeave={hideTooltip}
                  onFocus={() => scheduleTooltip("refit")}
                  onBlur={hideTooltip}
                  className={[floatingButtonClass, idleFloatingButtonClass].join(" ")}
                >
                  <RotateCcw size={16} />
                </button>
                {renderTooltip("refit", "Refit: recover the preview layout.")}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label={isPreviewPinned ? "Unpin preview" : "Pin preview"}
                  onClick={() => {
                    hideTooltip();
                        setIsPreviewPinned((current) => {
                          const next = !current;
                          if (next) {
                            const el = previewShellRef.current;
                            if (el) {
                              const rect = el.getBoundingClientRect();
                              setPinnedPreviewMetrics({ left: rect.left, width: rect.width, height: rect.height });
                            }
                          } else {
                            setPinnedPreviewMetrics(null);
                          }
                          return next;
                        });
                  }}
                  onMouseEnter={() => scheduleTooltip("pin")}
                  onMouseLeave={hideTooltip}
                  onFocus={() => scheduleTooltip("pin")}
                  onBlur={hideTooltip}
                  className={[
                    floatingButtonClass,
                    isPreviewPinned
                      ? glowingFloatingButtonClass
                      : idleFloatingButtonClass,
                  ].join(" ")}
                >
                  <Pin size={16} />
                </button>
                {renderTooltip("pin", isPreviewPinned ? "Pin: keep preview fixed on screen." : "Pin: keep preview visible while you scroll.")}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label={isPreviewMaximized ? "Exit maximize" : "Maximize preview"}
                  onClick={() => {
                    hideTooltip();
                    setIsPreviewMaximized((current) => !current);
                  }}
                  onMouseEnter={() => scheduleTooltip("maximize")}
                  onMouseLeave={hideTooltip}
                  onFocus={() => scheduleTooltip("maximize")}
                  onBlur={hideTooltip}
                  className={[
                    floatingButtonClass,
                    isPreviewMaximized
                      ? glowingFloatingButtonClass
                      : idleFloatingButtonClass,
                  ].join(" ")}
                >
                  {isPreviewMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                {renderTooltip("maximize", isPreviewMaximized ? "Maximize: return to normal view." : "Maximize: open the preview full screen.")}
              </div>
            </div>
          </div>
        </div>

        {isPinnedPreview && pinnedPreviewMetrics && (
          <div style={{ height: `${pinnedPreviewMetrics.height}px` }} />
        )}

        <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300">
          {(player.hasPlayableMedia || player.hasImage) &&
            controlPanelMode !== "video-settings" && (
            <VideoControls
              hasPlayback={player.hasPlayableMedia}
              currentTime={player.currentTime}
              duration={player.duration}
              mode={controlPanelMode === "audio-settings" ? "audio-settings" : "playback"}
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
              bassAmount={player.bassAmount}
              midAmount={player.midAmount}
              trebleAmount={player.trebleAmount}
              stereoWidthAmount={player.stereoWidthAmount}
              wowFlutterAmount={player.wowFlutterAmount}
              noiseLevel={player.noiseLevel}
              playbackRate={player.playbackRate}
              volume={player.volume}
              onChangeLofiAmount={player.setLofiAmount}
              onChangeRadioToneAmount={player.setRadioToneAmount}
              onChangeBitCrushAmount={player.setBitCrushAmount}
              onChangeSampleRateReductionAmount={player.setSampleRateReductionAmount}
              onChangeBassAmount={player.setBassAmount}
              onChangeMidAmount={player.setMidAmount}
              onChangeTrebleAmount={player.setTrebleAmount}
              onChangeStereoWidthAmount={player.setStereoWidthAmount}
              onChangeWowFlutterAmount={player.setWowFlutterAmount}
              onChangeNoiseLevel={player.setNoiseLevel}
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
              onTogglePlayback={() => {
                void player.togglePlayback();
              }}
              onBackToPlayback={() => {
                setControlPanelMode("playback");
              }}
              onResetSettings={resetAllSettings}
              onToggleVideoSettings={() => {
                setControlPanelMode((current) =>
                  current === "video-settings" ? "playback" : "video-settings",
                );
              }}
              onToggleAudioSettings={() => {
                setControlPanelMode((current) =>
                  current === "audio-settings" ? "playback" : "audio-settings",
                );
              }}
            />
          )}

          {player.previewError && (
            <p className="mt-3 text-rose-400">{player.previewError}</p>
          )}

          {controlPanelMode === "video-settings" && (
            <div className="mt-4 border-t border-slate-700 pt-4">
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setControlPanelMode("playback");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
                >
                  Back to Playback
                </button>
              </div>
              <RetroFilterPanel
                colorLevels={filterState.colorLevels}
                curvature={filterState.curvature}
                ditherStrength={filterState.ditherStrength}
                glowStrength={filterState.glowStrength}
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
                vignetteStrength={filterState.vignetteStrength}
                onApplyPreset={applyPresetWithAspect}
                onSetColorLevels={filterState.setColorLevels}
                onSetCurvature={filterState.setCurvature}
                onSetDitherStrength={filterState.setDitherStrength}
                onSetGlowStrength={filterState.setGlowStrength}
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
                onSetPhosphorDotInternalScale={filterState.setPhosphorDotInternalScale}
                onSetPhosphorDotBrightCore={filterState.setPhosphorDotBrightCore}
                onSetPhosphorDotCellFill={filterState.setPhosphorDotCellFill}
                onSetPhosphorDotFlatDisc={filterState.setPhosphorDotFlatDisc}
                onSetPhosphorDotNeighborBlend={filterState.setPhosphorDotNeighborBlend}
                onSetCloseUpNoiseStrength={filterState.setCloseUpNoiseStrength}
                onSetScanlineBrightnessFade={filterState.setScanlineBrightnessFade}
                onSetScanlineStrength={filterState.setScanlineStrength}
                onSetScanline2Strength={filterState.setScanline2Strength}
                onSetTargetHeight={filterState.setTargetHeight}
                onSetTargetWidth={filterState.setTargetWidth}
                onSetVignetteStrength={filterState.setVignetteStrength}
                onSyncTargetAspect={syncTargetAspect}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RetroPlayer;
