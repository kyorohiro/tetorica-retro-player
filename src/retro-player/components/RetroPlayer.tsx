import React from "react";
import { Aperture, Maximize2, Minimize2, Power } from "lucide-react";
import { RetroFilterPanel } from "./RetroFilterPanel";
import { VideoControls } from "./VideoControls";
import { usePixiVideoPlayer } from "../hooks/usePixiVideoPlayer";
import {
  useRetroFilterState,
  type RetroFilterInitialState,
} from "../hooks/useRetroFilterState";
import { clearPersistedRetroSettings } from "../hooks/persistedRetroSettings";

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
  const [isPreviewMaximized, setIsPreviewMaximized] = React.useState(false);
  const [isHighResolution, setIsHighResolution] = React.useState(false);
  const lastPreviewRequestRef = React.useRef<string>("");
  const lastLoopingPresetRef = React.useRef<string>("");
  const [controlPanelMode, setControlPanelMode] = React.useState<
    "playback" | "audio-settings" | "video-settings"
  >("playback");
  const filterState = useRetroFilterState(initialFilterState);
  const renderResolutionScale = isHighResolution
    ? typeof window !== "undefined"
      ? Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      : 1
    : 1;
  const player = usePixiVideoPlayer(filterState, renderResolutionScale);

  const resetAllSettings = React.useCallback(() => {
    clearPersistedRetroSettings();
    filterState.resetSettings();
    player.resetAudioSettings();
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
    const frameA = window.requestAnimationFrame(() => {
      player.refreshLayout();
      window.requestAnimationFrame(() => {
        player.refreshLayout();
      });
    });

    const timeoutId = window.setTimeout(() => {
      player.refreshLayout();
    }, 120);

    return () => {
      window.cancelAnimationFrame(frameA);
      window.clearTimeout(timeoutId);
    };
  }, [isPreviewMaximized]);

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
    player.sourceDimensions.width > player.sourceDimensions.height
      ? Math.max(280, Math.ceil(player.viewportRect.height + 24))
      : null;

  return (
    <section
      className={
        className ??
        "rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg"
      }
    >
      <div className="space-y-4">
        <div
          className={`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${
            isPreviewMaximized
              ? "fixed inset-0 z-50 flex items-stretch justify-stretch border-0 bg-slate-950/95 p-3"
              : ""
          }`}
        >
          {isPreviewMaximized && (
            <button
              type="button"
              onClick={() => {
                setIsPreviewMaximized(false);
              }}
              className="absolute right-3 top-3 z-10 rounded-xl border border-slate-500/50 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
            >
              Exit maximize
            </button>
          )}

          <div
            className={`relative ${
              isPreviewMaximized
                ? "h-full min-h-0 w-full"
                : "w-full min-w-0"
            }`}
            style={
              isPreviewMaximized
                ? undefined
                : {
                    height: previewFrameHeight
                      ? `${previewFrameHeight}px`
                      : "60vh",
                    minHeight: "220px",
                  }
            }
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-950">
              <div
                ref={player.canvasHostRef}
                className="pointer-events-none h-full w-full touch-pan-y"
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
            <div className="absolute -bottom-5 right-3 z-20 flex items-center gap-2">
              <button
                type="button"
                aria-label={player.isPoweredOn ? "Power off" : "Power on"}
                title={player.isPoweredOn ? "Power off" : "Power on"}
                onClick={() => {
                  if (player.isPoweredOn) {
                    player.powerOff();
                    return;
                  }

                  player.powerOn();
                }}
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",
                  player.isPoweredOn
                    ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_18px_rgba(74,222,128,0.7)] hover:bg-emerald-400/28"
                    : "border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",
                ].join(" ")}
              >
                <Power size={18} />
              </button>
              <button
                type="button"
                aria-label={isHighResolution ? "Disable high resolution" : "Enable high resolution"}
                title={isHighResolution ? "Disable high resolution" : "Enable high resolution"}
                onClick={() => {
                  setIsHighResolution((current) => !current);
                }}
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",
                  isHighResolution
                    ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_18px_rgba(74,222,128,0.7)] hover:bg-emerald-400/28"
                    : "border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",
                ].join(" ")}
              >
                <Aperture size={18} />
              </button>
              <button
                type="button"
                aria-label={isPreviewMaximized ? "Exit maximize" : "Maximize preview"}
                title={isPreviewMaximized ? "Exit maximize" : "Maximize preview"}
                onClick={() => {
                  setIsPreviewMaximized((current) => !current);
                }}
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",
                  isPreviewMaximized
                    ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_18px_rgba(74,222,128,0.7)] hover:bg-emerald-400/28"
                    : "border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",
                ].join(" ")}
              >
                {isPreviewMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
        </div>

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
              noiseLevel={player.noiseLevel}
              playbackRate={player.playbackRate}
              volume={player.volume}
              onChangeLofiAmount={player.setLofiAmount}
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
                paletteMode={filterState.paletteMode}
                phosphorStrength={filterState.phosphorStrength}
                scanlineStrength={filterState.scanlineStrength}
                scanline2Strength={filterState.scanline2Strength}
                selectedPreset={filterState.selectedPreset}
                sourceDimensions={player.sourceDimensions}
                targetHeight={filterState.targetHeight}
                targetWidth={filterState.targetWidth}
                vignetteStrength={filterState.vignetteStrength}
                onApplyPreset={filterState.applyPreset}
                onSetColorLevels={filterState.setColorLevels}
                onSetCurvature={filterState.setCurvature}
                onSetDitherStrength={filterState.setDitherStrength}
                onSetGlowStrength={filterState.setGlowStrength}
                onSetIsFilterEnabled={filterState.setIsFilterEnabled}
                onSetMonoTint={filterState.setMonoTint}
                onSetPaletteMode={filterState.setPaletteMode}
                onSetPhosphorStrength={filterState.setPhosphorStrength}
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
