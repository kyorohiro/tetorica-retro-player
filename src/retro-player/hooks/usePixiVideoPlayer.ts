import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { shareFile } from "@choochmeque/tauri-plugin-sharekit-api";
import type { RetroFilterState } from "./useRetroFilterState";
import { useRetroAudioEngine } from "./useRetroAudioEngine";
import { useRetroPixiStage } from "./useRetroPixiStage";
import { useRetroPreviewMedia } from "./useRetroPreviewMedia";
import {
  RETRO_PLAYER_ENSURE_AUDIO_CONTEXT_EVENT,
  RETRO_PLAYER_PAUSE_PLAYBACK_EVENT,
  RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT,
} from "../events";
import { isAndroidRuntime, isAppleWebKitFamily, isTauriRuntime } from "../platform/runtime";
import { getHlsInstance, shouldBypassWebAudio } from "../media/RetroMediaSource";
import {
  resolvePlaybackAudioRoute,
  resolveRecordingAudioSourceOrder,
} from "../media/RetroAudioRouting";
import type { RetroPlayerLocale } from "../types";

let retroPlayerInstanceSeed = 0;


const isRetroPlayerDebugEnabled = () =>
  typeof window !== "undefined" &&
  (
    import.meta.env.DEV ||
    Boolean((window as typeof window & { __RETRO_PLAYER_DEBUG__?: boolean }).__RETRO_PLAYER_DEBUG__)
  );

const hasAudibleMediaTrack = (
  media: HTMLMediaElement | null,
  previewKind: "video" | "audio" | "image" | "capture" | null,
) => {
  if (previewKind === "audio") {
    return true;
  }

  if (previewKind !== "video" || !media) {
    return false;
  }

  const mediaWithAudioHints = media as HTMLMediaElement & {
    audioTracks?: { length: number };
    mozHasAudio?: boolean;
    webkitAudioDecodedByteCount?: number;
  };

  if (typeof mediaWithAudioHints.audioTracks?.length === "number") {
    return mediaWithAudioHints.audioTracks.length > 0;
  }

  if (typeof mediaWithAudioHints.mozHasAudio === "boolean") {
    return mediaWithAudioHints.mozHasAudio;
  }

  if (typeof mediaWithAudioHints.webkitAudioDecodedByteCount === "number") {
    return mediaWithAudioHints.webkitAudioDecodedByteCount > 0;
  }

  return false;
};

export type RetroPlaybackEvent = {
  playing: boolean;
  kind: "video" | "audio" | "image" | "capture" | null;
  source: "builtin-tone" | "media";
};

export type RetroPageTurnDirection = "next" | "prev" | null;

export type RetroPreviewStatus =
  | {
      kind: "loading" | "buffering" | "retryable" | "unsupported";
      message: string;
    }
  | null;

export function usePixiVideoPlayer(
  filterState: RetroFilterState,
  fitMode: "contain" | "width",
  renderResolutionScale = 1,
  options?: {
    onEnded?: () => void;
    onError?: (error: Error) => void;
    onRetry?: () => void;
    autoPlay?: boolean;
    onPlaybackChange?: (event: RetroPlaybackEvent) => void;
    onPrevTrack?: () => void;
    onNextTrack?: () => void;
    playbackSource?: "builtin-tone" | "media";
    preferNativeVideoSurface?: boolean;
    isPreviewMaximized?: boolean;
    maximizePerformanceMode?: "auto" | "on" | "off";
    locale?: RetroPlayerLocale;
    requestedKind?: "video" | "audio" | "image";
    requestedIndex?: number | null;
  },
) {
  const instanceLabelRef = useRef(`player-${(retroPlayerInstanceSeed += 1)}`);
  const objectUrlRef = useRef<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const streamOwnedRef = useRef<boolean>(false);
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const recordingOwnedTracksRef = useRef<MediaStreamTrack[]>([]);
  const recordingTapNodeRef = useRef<AudioNode | null>(null);
  const recordingTapOutputNodeRef = useRef<AudioNode | null>(null);
  const recordingTapSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const recordingTapDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const recordingTapMediaRef = useRef<HTMLMediaElement | null>(null);
  const pendingDownloadUrlRef = useRef<string | null>(null);
  const pendingRecordingBlobRef = useRef<Blob | null>(null);
  const pendingRecordingFilenameRef = useRef<string | null>(null);
  const stopRecordingResolverRef = useRef<((value: string | null) => void) | null>(null);
  const previewRequestIdRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const playbackIntentRef = useRef<"play" | "pause" | null>(null);
  const previewKindRef = useRef<"video" | "audio" | "image" | "capture" | null>(null);
  const wasPlayingBeforePowerOffRef = useRef(false);
  const onEndedRef = useRef<(() => void) | undefined>(options?.onEnded);
  const onErrorRef = useRef<((error: Error) => void) | undefined>(options?.onError);
  const onRetryRef = useRef<(() => void) | undefined>(options?.onRetry);
  const autoPlayRef = useRef<boolean>(options?.autoPlay ?? true);
  const onPlaybackChangeRef = useRef<((event: RetroPlaybackEvent) => void) | undefined>(options?.onPlaybackChange);
  const onPrevTrackRef = useRef<(() => void) | undefined>(options?.onPrevTrack);
  const onNextTrackRef = useRef<(() => void) | undefined>(options?.onNextTrack);
  const requestedKindRef = useRef<"video" | "audio" | "image">(options?.requestedKind ?? "video");
  const requestedIndexRef = useRef<number | null>(options?.requestedIndex ?? null);

  const [previewName, setPreviewName] = useState<string>("");
  const [previewError, _setPreviewErrorState] = useState<string>("");
  const setPreviewError = useCallback((msg: string) => {
    _setPreviewErrorState(msg);
    if (msg) onErrorRef.current?.(new Error(msg));
  }, []);
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
  const [loadingLabel, setLoadingLabel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [needsUserPlay, setNeedsUserPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [previewKind, setPreviewKind] = useState<
    "video" | "audio" | "image" | "capture" | null
  >(null);
  const [sourceDimensions, setSourceDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const sourceDimensionsRef = useRef<{
    width: number;
    height: number;
  } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const isRecordingRef = useRef(false);
  const [pendingRecordingFilename, setPendingRecordingFilename] = useState<string | null>(null);
  const [isVideoFxEnabled, setIsVideoFxEnabled] = useState(true);
  const [pageTurnDirection, setPageTurnDirection] = useState<RetroPageTurnDirection>(null);
  const [pageTurnToken, setPageTurnToken] = useState(0);
  const pageTurnResetTimerRef = useRef<number | null>(null);

  const debugVideo = (label: string, payload?: Record<string, unknown>) => {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    const suffix = payload ? ` ${JSON.stringify(payload)}` : "";
    console.log(`[retro-player video][${instanceLabelRef.current}] ${label}${suffix}`);
  };

  const hasAudibleMedia = hasAudibleMediaTrack(mediaRef.current, previewKind);
  const hasPlayableMedia =
    previewKind === "video" || previewKind === "audio" || previewKind === "capture";
  const previewStatus = useMemo<RetroPreviewStatus>(() => {
    if (isLoading) {
      return {
        kind: "loading",
        message: loadingLabel || "Loading preview...",
      };
    }

    if (isBuffering && hasPlayableMedia && isPlaying) {
      return {
        kind: "buffering",
        message: "Still buffering this video...",
      };
    }

    if (!previewError) {
      return null;
    }

    const normalized = previewError.toLowerCase();
    // previewError is a localized user-facing string (see ../i18n.ts), so it
    // may be in English or Japanese depending on the app's locale — keep
    // both sets of keywords in sync with the messages defined there.
    const isRetryable =
      needsUserPlay ||
      /src-not-supported|network|failed to start|did not start|cannot confirm|buffer|waiting|stalled|読み込みに失敗|タイムアウト|準備中|開始できません/.test(
        normalized,
      );

    return {
      kind: isRetryable ? "retryable" : "unsupported",
      message: previewError,
    };
  }, [hasPlayableMedia, isBuffering, isLoading, isPlaying, loadingLabel, needsUserPlay, previewError]);

  const logAudioRecovery = (
    label: string,
    payload?: Record<string, unknown>,
    level: "info" | "warn" = "info",
  ) => {
    const media = mediaRef.current;
    const details = {
      audioContextState: audioContextRef.current?.state ?? null,
      currentSrc: media?.currentSrc || media?.src || null,
      currentTime: media?.currentTime ?? null,
      ended: media?.ended ?? null,
      hasMedia: Boolean(media),
      hasMediaSource: Boolean(mediaSourceRef.current),
      isPoweredOn,
      mediaMuted: media?.muted ?? null,
      mediaPaused: media?.paused ?? null,
      mediaReadyState: media?.readyState ?? null,
      mediaVolume: media?.volume ?? null,
      previewKind: previewKindRef.current,
      visibilityState:
        typeof document === "undefined" ? null : document.visibilityState,
      ...payload,
    };

    if (level === "warn") {
      console.warn(`[retro-player audio recovery][${instanceLabelRef.current}] ${label}`, details);
      return;
    }

    console.info(`[retro-player audio recovery][${instanceLabelRef.current}] ${label}`, details);
  };

  // The native <video> tag swap only makes sense for an actual video
  // element (there's no "native image surface" to swap to).
  // Native mode is meant as a full passthrough regardless of what's being
  // previewed (video, image, or audio-with-cover). Gate on the raw setting
  // here rather than shouldUseNativeVideoSurface, which is narrower (it also
  // requires an actual native <video> element) and previously let the WebGL
  // filter still apply to image previews while native mode was on.
  const isNativeModePreferred = Boolean(options?.preferNativeVideoSurface);

  const effectiveFilterState = useMemo(
    () => ({
      ...filterState,
      isFilterEnabled:
        filterState.isFilterEnabled && isVideoFxEnabled && !isNativeModePreferred,
    }),
    [filterState, isVideoFxEnabled, isNativeModePreferred],
  );

  const audio = useRetroAudioEngine({
    instanceLabel: instanceLabelRef.current,
    previewKind,
    previewKindRef,
    mediaRef,
    isPlaying,
    isPlayingRef,
    nativePlaybackMode: isNativeModePreferred,
    playbackSource: options?.playbackSource ?? "media",
  });

  const stage = useRetroPixiStage({
    filterState: effectiveFilterState,
    fitMode,
    renderResolutionScale,
    isPreviewMaximized: options?.isPreviewMaximized ?? false,
    maximizePerformanceMode: options?.maximizePerformanceMode ?? "auto",
    isPoweredOn,
    isPlayingRef,
    isRecordingRef,
    previewKindRef,
    debugVideo,
  });

  const {
    canvasHostRef,
    appRef,
    spriteRef,
    textureRef,
    previewElementRef,
    filterRef,
    isRendererReady,
    isFilterReady,
    viewportRect,
    setViewportRect,
    applyFilterState,
    destroyPixi,
    fitSprite,
    initPixi,
    ensureFilterReady,
    resetRenderer,
    refreshLayout,
    resetFilterInstance,
    safeRender,
    scheduleRefreshLayout,
    syncSpriteFilter,
    syncTexturePresentation,
  } = stage;
  const initPixiRef = useRef(initPixi);
  const destroyPixiRef = useRef(destroyPixi);
  const debugVideoRef = useRef(debugVideo);
  const initialRenderResolutionScaleRef = useRef(renderResolutionScale);
  const cleanupPreviewRef = useRef<() => void>(() => {});
  const disposeAudioEngineRef = useRef<() => Promise<void> | void>(() => {});

  const nativeVideoElement =
    mediaRef.current instanceof HTMLVideoElement ? mediaRef.current : null;
  const nativeImageElement =
    previewElementRef.current instanceof HTMLImageElement ? previewElementRef.current : null;
  const nativeVisualElement =
    previewKind === "video"
      ? nativeVideoElement
      : previewKind === "image"
        ? nativeImageElement
        : null;
  const shouldUseNativeVisualSurface =
    Boolean(options?.preferNativeVideoSurface) &&
    nativeVisualElement !== null;

  const {
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
    recordingDestinationRef,
    noiseGainRef,
    audioOptimizationModeRef,
    audioOptimizationMode,
    recordingContainer,
    setRecordingContainer,
    setAudioOptimizationMode,
    nativeAudioSuppressionOverrideRef,
    nativeAudioSuppressionOverride,
    setNativeAudioSuppressionOverride,
    preferNativeHlsOverride,
    setPreferNativeHlsOverride,
    latencyHint,
    setLatencyHint,
    isMutedRef,
    volumeRef,
    playbackRateRef,
    isLoopingRef,
    isMuted,
    setIsMuted,
    playbackRate,
    setPlaybackRate,
    volume,
    setVolume,
    isLooping,
    setIsLooping,
    isAudioFxEnabled,
    setIsAudioFxEnabled,
    lofiAmount,
    setLofiAmount,
    radioToneAmount,
    setRadioToneAmount,
    bitCrushAmount,
    setBitCrushAmount,
    bitCrushNoiseAmount,
    setBitCrushNoiseAmount,
    sampleRateReductionAmount,
    setSampleRateReductionAmount,
    noiseReductionAmount,
    setNoiseReductionAmount,
    bassAmount,
    setBassAmount,
    midAmount,
    setMidAmount,
    trebleAmount,
    setTrebleAmount,
    stereoWidthAmount,
    setStereoWidthAmount,
    smallSpeakerRoomAmount,
    setSmallSpeakerRoomAmount,
    wowFlutterAmount,
    setWowFlutterAmount,
    isNoiseEnabled,
    setIsNoiseEnabled,
    noiseLevel,
    setNoiseLevel,
    vinylDustAmount,
    setVinylDustAmount,
    noiseWarmthAmount,
    setNoiseWarmthAmount,
    noiseAirAmount,
    setNoiseAirAmount,
    noisePresenceAmount,
    setNoisePresenceAmount,
    delayAmount,
    setDelayAmount,
    reverbAmount,
    setReverbAmount,
    chorusAmount,
    setChorusAmount,
    tapeSaturationAmount,
    setTapeSaturationAmount,
    compressorAmount,
    setCompressorAmount,
    fxOutputTrimAmount,
    setFxOutputTrimAmount,
    inputTrimAmount,
    setInputTrimAmount,
    debugAudio,
    ensureAudioContext,
    ensureAudioContextWithRecovery,
    updateAudioNodes,
    setEngineIsPlaying,
    connectMediaStream,
    connectMediaAudio,
    reconnectCurrentMediaAudio,
    rebuildAudioGraphForCurrentMedia,
    applyAudioSettings,
    resetAudioSettings,
    disposeAudioEngine,
  } = audio;

  useEffect(() => {
    initPixiRef.current = initPixi;
    destroyPixiRef.current = destroyPixi;
    debugVideoRef.current = debugVideo;
  }, [debugVideo, initPixi, destroyPixi]);

  const setPreviewKindState = (
    nextKind: "video" | "audio" | "image" | "capture" | null,
  ) => {
    if (previewKindRef.current === nextKind) {
      return;
    }
    previewKindRef.current = nextKind;
    setPreviewKind(nextKind);
  };

  const setSourceDimensionsState = (
    nextDimensions: {
      width: number;
      height: number;
    } | null,
  ) => {
    const current = sourceDimensionsRef.current;
    const isUnchanged =
      current === nextDimensions ||
      (
        current !== null &&
        nextDimensions !== null &&
        current.width === nextDimensions.width &&
        current.height === nextDimensions.height
      );
    if (isUnchanged) {
      return;
    }
    sourceDimensionsRef.current = nextDimensions;
    setSourceDimensions(nextDimensions);
  };

  const beginLoading = (label: string) => {
    setLoadingLabel(label);
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
    setLoadingLabel("");
  };

  const recoverAudioOutput = async (reason: string) => {
    const context = await ensureAudioContextWithRecovery(reason);
    if (!context) {
      logAudioRecovery(`${reason}:no-audio-context`, undefined, "warn");
      return null;
    }

    // await 後に読むことで stale な参照を避ける
    const media = mediaRef.current;

    try {
      if (media) {
        if (mediaSourceRef.current) {
          reconnectCurrentMediaAudio();
          logAudioRecovery(`${reason}:reconnected-media-source`, {
            audioContextState: context.state,
          });
        } else {
          await connectMediaAudio(media);
          logAudioRecovery(`${reason}:connected-media-source`, {
            audioContextState: context.state,
          });
        }
      }

      updateAudioNodes();
      return context;
    } catch (error) {
      logAudioRecovery(
        `${reason}:reconnect-failed-rebuilding`,
        {
          error: error instanceof Error ? error.message : String(error),
        },
        "warn",
      );

      const rebuiltContext = await rebuildAudioGraphForCurrentMedia(`${reason}:rebuild`);
      if (!rebuiltContext) {
        logAudioRecovery(`${reason}:rebuild-returned-null`, undefined, "warn");
        return null;
      }

      logAudioRecovery(`${reason}:rebuild-complete`, {
        audioContextState: rebuiltContext.state,
      });
      return rebuiltContext;
    }
  };

  const powerOn = () => {
    setIsPoweredOn(true);
    appRef.current?.ticker.start();

    // setTimeout を使わずユーザーアクティベーションを確実に引き継ぐ
    void (async () => {
      const shouldResumePlayback =
        wasPlayingBeforePowerOffRef.current && Boolean(mediaRef.current);
      logAudioRecovery("powerOn:start", {
        shouldResumePlayback,
      });

      try {
        const context = await recoverAudioOutput("powerOn");
        if (!context) {
          return;
        }

        if (shouldResumePlayback && mediaRef.current) {
          try {
            await mediaRef.current.play();
            setNeedsUserPlay(false);
          } catch (error) {
            if (error instanceof DOMException && error.name === "NotAllowedError") {
              setNeedsUserPlay(true);
            }
            logAudioRecovery(
              "powerOn:play-failed",
              {
                error: error instanceof Error ? error.message : String(error),
              },
              "warn",
            );
          }
        }
      } catch (error) {
        logAudioRecovery(
          "powerOn:recover-failed",
          {
            error: error instanceof Error ? error.message : String(error),
          },
          "warn",
        );
      } finally {
        syncVideoState();
        wasPlayingBeforePowerOffRef.current = false;
        logAudioRecovery("powerOn:done", {
          shouldResumePlayback,
        });
      }
    })();
  };

  const powerOff = () => {
    wasPlayingBeforePowerOffRef.current = Boolean(mediaRef.current && !mediaRef.current.paused);
    logAudioRecovery("powerOff", {
      wasPlayingBeforePowerOff: wasPlayingBeforePowerOffRef.current,
    });

    if (mediaRef.current) {
      mediaRef.current.pause();
    }

    if (noiseGainRef.current) {
      noiseGainRef.current.gain.value = 0;
    }

    if (masterGainRef.current) {
      masterGainRef.current.gain.value = 0;
    }

    finishLoading();
    setNeedsUserPlay(false);
    setIsPoweredOn(false);
    appRef.current?.ticker.stop();
    syncVideoState();
  };
  const media = useRetroPreviewMedia({
    locale: options?.locale ?? "en",
    preferNativeVideoSurface: options?.preferNativeVideoSurface ?? false,
    filterState,
    appRef,
    spriteRef,
    textureRef,
    previewElementRef,
    filterRef,
    mediaRef,
    objectUrlRef,
    streamRef,
    streamOwnedRef,
    previewRequestIdRef,
    isPlayingRef,
    playbackIntentRef,
    previewKindRef,
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
    noiseGainRef,
    audioOptimizationModeRef,
    nativeAudioSuppressionOverrideRef,
    isMutedRef,
    volumeRef,
    playbackRateRef,
    isLoopingRef,
    isAudioFxEnabled,
    lofiAmount,
    bitCrushAmount,
    sampleRateReductionAmount,
    bassAmount,
    midAmount,
    trebleAmount,
    stereoWidthAmount,
    smallSpeakerRoomAmount,
    isMuted,
    volume,
    previewKind,
    setPreviewName,
    setPreviewError,
    setNeedsUserPlay,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setPlaybackRate,
    setIsLooping,
    setSourceDimensions: setSourceDimensionsState,
    setViewportRect,
    setPreviewKindState,
    setIsPoweredOn,
    beginLoading,
    finishLoading,
    ensureAudioContext,
    updateAudioNodes,
    setEngineIsPlaying,
    setIsBuffering,
    connectMediaStream,
    connectMediaAudio,
    rebuildAudioGraphForCurrentMedia,
    fitSprite,
    refreshLayout,
    scheduleRefreshLayout,
    safeRender,
    resetFilterInstance,
    initPixi,
    ensureFilterReady,
    debugVideo,
    debugAudio,
    onEndedRef,
    autoPlayRef,
  });

  const {
    cancelPendingPlaybackStart,
    cleanupPreview,
    cleanupForPageLeave,
    playVideoWithAudio,
    restartCurrentMedia,
    previewFile,
    previewStream,
    previewUrl,
    startDisplayCapture,
    stopDisplayCapture,
    syncVideoState,
  } = media;

  useEffect(() => {
    onEndedRef.current = options?.onEnded;
  }, [options?.onEnded]);

  useEffect(() => {
    onErrorRef.current = options?.onError;
  }, [options?.onError]);

  useEffect(() => {
    onRetryRef.current = options?.onRetry;
  }, [options?.onRetry]);

  useEffect(() => {
    autoPlayRef.current = options?.autoPlay ?? true;
  }, [options?.autoPlay]);

  useEffect(() => {
    onPlaybackChangeRef.current = options?.onPlaybackChange;
  }, [options?.onPlaybackChange]);

  useEffect(() => {
    onPrevTrackRef.current = options?.onPrevTrack;
  }, [options?.onPrevTrack]);

  useEffect(() => {
    onNextTrackRef.current = options?.onNextTrack;
  }, [options?.onNextTrack]);

  useEffect(() => {
    requestedKindRef.current = options?.requestedKind ?? "video";
  }, [options?.requestedKind]);

  useEffect(() => {
    requestedIndexRef.current = options?.requestedIndex ?? null;
  }, [options?.requestedIndex]);

  useEffect(() => {
    return () => {
      if (pageTurnResetTimerRef.current !== null) {
        window.clearTimeout(pageTurnResetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    onPlaybackChangeRef.current?.({
      playing: isPlaying,
      kind: previewKindRef.current,
      source: options?.playbackSource ?? "media",
    });
  }, [isPlaying, options?.playbackSource]);

  useEffect(() => {
    cleanupPreviewRef.current = cleanupPreview;
  }, [cleanupPreview]);

  useEffect(() => {
    disposeAudioEngineRef.current = disposeAudioEngine;
  }, [disposeAudioEngine]);

  const togglePlayback = async () => {
    if (!mediaRef.current) {
      debugVideo("togglePlayback:no-media", {
        needsUserPlay,
        isLoading,
        previewKind,
      });
      return;
    }

    if (mediaRef.current.paused || mediaRef.current.ended) {
      if (!isPoweredOn) {
        powerOn();
      }
      playbackIntentRef.current = "play";
      const shouldRestartFromSource =
        mediaRef.current.error ||
        mediaRef.current.ended ||
        (
          mediaRef.current instanceof HTMLVideoElement &&
          Boolean(getHlsInstance(mediaRef.current)) &&
          (previewError || needsUserPlay) &&
          (mediaRef.current.currentTime ?? 0) <= 0.05
        );
      if (shouldRestartFromSource) {
        try {
          const restarted = await restartCurrentMedia();
          if (restarted) {
            await playVideoWithAudio();
            syncVideoState();
            return;
          }
        } catch (error) {
          console.warn("[retro-player] restartCurrentMedia failed", error);
        }
        // Fallback: ask App.tsx to restart the current preset.
        onRetryRef.current?.();
        return;
      }
      await playVideoWithAudio();
      syncVideoState();
      return;
    }

    cancelPendingPlaybackStart();
    playbackIntentRef.current = "pause";
    mediaRef.current.pause();
    setIsBuffering(false);
    finishLoading();
    syncVideoState();
  };

  const toggleMute = () => {
    if (!mediaRef.current) return;

    setIsMuted((current) => !current);
  };

  const seekTo = (nextTime: number) => {
    if (!mediaRef.current) return;

    mediaRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const stepFrame = (direction: -1 | 1) => {
    if (!mediaRef.current) return;

    const frameTime = 1 / 30;
    const nextTime = Math.max(
      0,
      Math.min(
        mediaRef.current.currentTime + frameTime * direction,
        mediaRef.current.duration || mediaRef.current.currentTime + frameTime,
      ),
    );

    mediaRef.current.pause();
    mediaRef.current.currentTime = nextTime;
    syncVideoState();
  };

  const changePlaybackRate = (nextRate: number) => {
    if (!mediaRef.current) return;

    mediaRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const changeVolume = (nextVolume: number) => {
    if (!mediaRef.current) return;

    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const toggleLoop = () => {
    if (!mediaRef.current) return;

    mediaRef.current.loop = !mediaRef.current.loop;
    setIsLooping(mediaRef.current.loop);
  };

  const setLoopingEnabled = (nextLooping: boolean) => {
    setIsLooping(nextLooping);

    if (mediaRef.current) {
      mediaRef.current.loop = nextLooping;
    }
  };

  const revokePendingRecording = () => {
    if (!pendingDownloadUrlRef.current || typeof window === "undefined") {
      pendingRecordingBlobRef.current = null;
      pendingRecordingFilenameRef.current = null;
      return;
    }

    window.URL.revokeObjectURL(pendingDownloadUrlRef.current);
    pendingDownloadUrlRef.current = null;
    pendingRecordingBlobRef.current = null;
    pendingRecordingFilenameRef.current = null;
  };

  const triggerDownload = (url: string, filename: string) => {
    if (typeof document === "undefined") {
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      link.remove();
    }, 0);
  };

  // Output format: webm (vp9/vp8 + opus for video, opus for audio-only).
  // VLC may play some webm recordings at wrong speed due to timestamp
  // interpretation bugs — use QuickTime, browser, or mpv for correct playback.
  const saveRecording = (chunks: Blob[], mimeType: string) => {
    if (typeof window === "undefined" || chunks.length === 0) {
      return null;
    }

    revokePendingRecording();

    const blob = new Blob(chunks, { type: mimeType || "video/webm" });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const resolvedMimeType = mimeType || blob.type || "video/webm";
    const isAudioOnly = resolvedMimeType.startsWith("audio/");
    const extension = isAudioOnly
      ? resolvedMimeType.includes("mp4")
        ? "m4a"
        : "weba"
      : resolvedMimeType.includes("mp4")
        ? "mp4"
        : "webm";
    const filename = `tetorica-retro-player-${timestamp}.${extension}`;
    const url = window.URL.createObjectURL(blob);

    pendingDownloadUrlRef.current = url;
    pendingRecordingBlobRef.current = blob;
    pendingRecordingFilenameRef.current = filename;
    setPendingRecordingFilename(filename);
    return filename;
  };

  const downloadPendingRecording = () => {
    const url = pendingDownloadUrlRef.current;
    const filename = pendingRecordingFilenameRef.current;

    if (!url || !filename || typeof window === "undefined") {
      return;
    }

    triggerDownload(url, filename);
    window.setTimeout(() => {
      revokePendingRecording();
    }, 1000);
    setPendingRecordingFilename(null);
  };

  const sharePendingRecording = async () => {
    const blob = pendingRecordingBlobRef.current;
    const filename = pendingRecordingFilenameRef.current;

    if (!blob || !filename || typeof window === "undefined") {
      return false;
    }

    if (isTauriRuntime()) {
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const fileUri = await invoke<string>("persist_recording_for_share", {
        data: Array.from(bytes),
        filename,
      });

      await shareFile(fileUri, {
        mimeType: blob.type || "video/webm",
        title: filename,
      });
      return true;
    }

    if (
      typeof navigator === "undefined" ||
      typeof navigator.share !== "function" ||
      typeof File === "undefined"
    ) {
      return false;
    }

    const file = new File([blob], filename, {
      type: blob.type || "video/webm",
    });

    const shareData = {
      files: [file],
      title: filename,
    };

    if (typeof navigator.canShare === "function" && !navigator.canShare(shareData)) {
      return false;
    }

    await navigator.share(shareData);
    return true;
  };

  const getRecordingMimeType = (hasVideoTrack: boolean) => {
    const effectiveRecordingContainer =
      recordingContainer === "auto"
        ? isAppleWebKitFamily()
          ? "mp4"
          : "webm"
        : recordingContainer;
    const videoWebm = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];
    const videoMp4 = [
      "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
      "video/mp4",
    ];
    const audioWebm = [
      "audio/webm;codecs=opus",
      "audio/webm",
    ];
    const audioMp4 = [
      "audio/mp4;codecs=mp4a.40.2",
      "audio/mp4",
    ];
    const candidates = hasVideoTrack
      ? effectiveRecordingContainer === "webm"
        ? videoWebm
        : effectiveRecordingContainer === "mp4"
          ? videoMp4
          : videoWebm
      : effectiveRecordingContainer === "webm"
        ? audioWebm
        : effectiveRecordingContainer === "mp4"
          ? audioMp4
          : audioWebm;

    return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
  };

  const releaseRecordingTap = () => {
    try {
      if (recordingTapNodeRef.current && recordingTapDestinationRef.current) {
        recordingTapNodeRef.current.disconnect(recordingTapDestinationRef.current);
      }
    } catch {}
    try {
      if (recordingTapSourceRef.current && recordingTapOutputNodeRef.current) {
        recordingTapSourceRef.current.disconnect(recordingTapOutputNodeRef.current);
      }
    } catch {}
    try {
      recordingTapDestinationRef.current?.disconnect();
    } catch {}
    recordingTapNodeRef.current = null;
    recordingTapOutputNodeRef.current = null;
    recordingTapSourceRef.current = null;
    recordingTapDestinationRef.current = null;
    recordingTapMediaRef.current = null;
  };

  const getSafariRecordingTapAudioTracks = (): MediaStreamTrack[] => {
    if (!isAppleWebKitFamily()) {
      return [];
    }

    const media = mediaRef.current;
    const audioContext = audioContextRef.current;
    if (!(media instanceof HTMLMediaElement) || !audioContext) {
      return [];
    }

    if (recordingTapMediaRef.current !== media) {
      releaseRecordingTap();
    }

    if (!recordingTapDestinationRef.current) {
      try {
        const shouldBypassCurrentMedia =
          shouldBypassWebAudio(media, isNativeModePreferred);
        const destination = audioContext.createMediaStreamDestination();
        let tapNode: AudioNode | null = null;
        let ownedSource: MediaElementAudioSourceNode | null = null;

        if (!shouldBypassCurrentMedia && masterGainRef.current) {
          tapNode = masterGainRef.current;
        } else if (mediaSourceRef.current) {
          tapNode = mediaSourceRef.current;
        } else {
          ownedSource = audioContext.createMediaElementSource(media);
          tapNode = ownedSource;
          ownedSource.connect(audioContext.destination);
          recordingTapOutputNodeRef.current = audioContext.destination;
        }

        tapNode.connect(destination);
        recordingTapNodeRef.current = tapNode;
        recordingTapSourceRef.current = ownedSource;
        recordingTapDestinationRef.current = destination;
        recordingTapMediaRef.current = media;
      } catch (error) {
        debugVideo("recording:safari-tap-audio-unavailable", {
          message: error instanceof Error ? error.message : String(error),
          currentSrc: media.currentSrc || media.src || null,
          audioContextState: audioContext.state,
        });
        releaseRecordingTap();
        return [];
      }
    }

    return recordingTapDestinationRef.current?.stream.getAudioTracks() ?? [];
  };

  const resolveCurrentPlaybackAudioRoute = () => {
    const media = mediaRef.current;
    if (!(media instanceof HTMLMediaElement)) {
      return null;
    }

    return resolvePlaybackAudioRoute({
      preferNativeVideoSurface: isNativeModePreferred,
      isHlsManaged: media instanceof HTMLVideoElement && Boolean(getHlsInstance(media)),
      isMediaStreamSource: media.srcObject instanceof MediaStream,
      audioOptimizationMode,
      nativeAudioSuppressionOverride,
    });
  };

  const startRecording = async () => {
    await ensureAudioContext();

    const recordingStream = new MediaStream();
    const shouldRecordVideo = previewKindRef.current !== "audio";
    const livePreviewStream = streamRef.current;
    const ownedRecordingTracks: MediaStreamTrack[] = [];

    if (shouldRecordVideo) {
      const nativeVideoTracks =
        shouldUseNativeVisualSurface && mediaRef.current instanceof HTMLVideoElement
          ? (
            (
              mediaRef.current as HTMLVideoElement & {
                captureStream?: () => MediaStream;
                mozCaptureStream?: () => MediaStream;
              }
            ).captureStream?.() ??
            (
              mediaRef.current as HTMLVideoElement & {
                captureStream?: () => MediaStream;
                mozCaptureStream?: () => MediaStream;
              }
            ).mozCaptureStream?.()
          )?.getVideoTracks() ?? []
          : [];

      if (nativeVideoTracks.length > 0) {
        nativeVideoTracks.forEach((track) => {
          const clonedTrack = track.clone();
          recordingStream.addTrack(clonedTrack);
          ownedRecordingTracks.push(clonedTrack);
        });
      } else {
        const canvas = appRef.current?.canvas;

        if (!(canvas instanceof HTMLCanvasElement)) {
          throw new Error("Preview canvas is not ready yet.");
        }

        const canvasStream = canvas.captureStream(30);
        canvasStream.getVideoTracks().forEach((track) => {
          recordingStream.addTrack(track);
          ownedRecordingTracks.push(track);
        });
      }
    }

    const recordingDestinationTracks =
      recordingDestinationRef.current?.stream
        .getAudioTracks() ?? [];
    const mediaCaptureTracks =
      mediaRef.current instanceof HTMLMediaElement
        ? (
          (
            mediaRef.current as HTMLMediaElement & {
              captureStream?: () => MediaStream;
              mozCaptureStream?: () => MediaStream;
            }
          ).captureStream?.() ??
          (
            mediaRef.current as HTMLMediaElement & {
              captureStream?: () => MediaStream;
              mozCaptureStream?: () => MediaStream;
            }
          ).mozCaptureStream?.()
        )?.getAudioTracks() ?? []
        : [];
    const liveAudioTracks =
      livePreviewStream instanceof MediaStream
        ? livePreviewStream.getAudioTracks()
        : [];
    const playbackAudioRoute = resolveCurrentPlaybackAudioRoute();
    const recordingAudioSourceOrder = resolveRecordingAudioSourceOrder(
      playbackAudioRoute ?? { bypassWebAudio: false },
    );

    for (const source of recordingAudioSourceOrder) {
      if (source === "safari-tap") {
        const safariTapAudioTracks = getSafariRecordingTapAudioTracks();
        if (safariTapAudioTracks.length === 0) {
          continue;
        }
        safariTapAudioTracks.forEach((track) => {
          recordingStream.addTrack(track);
          ownedRecordingTracks.push(track);
        });
        break;
      }

      if (source === "media-capture" && mediaCaptureTracks.length > 0) {
        mediaCaptureTracks.forEach((track) => {
          const clonedTrack = track.clone();
          recordingStream.addTrack(clonedTrack);
          ownedRecordingTracks.push(clonedTrack);
        });
        break;
      }

      if (source === "recording-destination" && recordingDestinationTracks.length > 0) {
        recordingDestinationTracks.forEach((track) => {
          const clonedTrack = track.clone();
          recordingStream.addTrack(clonedTrack);
          ownedRecordingTracks.push(clonedTrack);
        });
        break;
      }

      if (source === "live-stream" && liveAudioTracks.length > 0) {
        liveAudioTracks.forEach((track) => recordingStream.addTrack(track));
        break;
      }
    }

    if (recordingStream.getTracks().length === 0) {
      throw new Error("Nothing is available to record yet.");
    }

    const hasVideoTrack = recordingStream.getVideoTracks().length > 0;
    const mimeType = getRecordingMimeType(hasVideoTrack);
    const recorder = mimeType
      ? new MediaRecorder(recordingStream, { mimeType })
      : new MediaRecorder(recordingStream);

    recordedChunksRef.current = [];
    revokePendingRecording();
    setPendingRecordingFilename(null);
    recordingStreamRef.current = recordingStream;
    recordingOwnedTracksRef.current = ownedRecordingTracks;
    mediaRecorderRef.current = recorder;
    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    });
    recorder.addEventListener("stop", () => {
      const resolvedFilename = saveRecording(recordedChunksRef.current, recorder.mimeType);
      recordedChunksRef.current = [];
      recordingOwnedTracksRef.current.forEach((track) => track.stop());
      recordingOwnedTracksRef.current = [];
      recordingStreamRef.current = null;
      mediaRecorderRef.current = null;
      releaseRecordingTap();
      isRecordingRef.current = false;
      setIsRecording(false);
      void ensureAudioContext();
      stopRecordingResolverRef.current?.(resolvedFilename);
      stopRecordingResolverRef.current = null;
    }, { once: true });
    recorder.start(100);
    isRecordingRef.current = true;
    setIsRecording(true);
  };

  const stopRecording = (shouldSave = true) => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) {
      return Promise.resolve<string | null>(pendingRecordingFilenameRef.current);
    }

    return new Promise<string | null>((resolve) => {
      stopRecordingResolverRef.current = resolve;

      if (!shouldSave) {
        recordedChunksRef.current = [];
      }

      if (recorder.state !== "inactive") {
        recorder.stop();
        return;
      }

      recordingOwnedTracksRef.current.forEach((track) => track.stop());
      recordingOwnedTracksRef.current = [];
      recordingStreamRef.current = null;
      mediaRecorderRef.current = null;
      releaseRecordingTap();
      isRecordingRef.current = false;
      setIsRecording(false);
      stopRecordingResolverRef.current?.(pendingRecordingFilenameRef.current);
      stopRecordingResolverRef.current = null;
    });
  };


  useEffect(() => {
    let cancelled = false;

    const setupPixi = async () => {
      debugVideoRef.current("startup:setupPixi-effect:start", {
        renderResolutionScale: initialRenderResolutionScaleRef.current,
      });
      await initPixiRef.current();

      if (cancelled) {
        destroyPixiRef.current();
      }
    };

    void setupPixi();

    return () => {
      revokePendingRecording();
      stopRecording(false);
      cancelled = true;
      destroyPixiRef.current();
    };
  }, []);

  useEffect(() => {
    return () => {
      cleanupPreviewRef.current();
      void disposeAudioEngineRef.current();
    };
  }, []);

  useEffect(() => {
    const handlePageHide = () => {
      cleanupForPageLeave();
    };

    //const handleVisibilityChange = () => {
    //  if (document.hidden) {
    //    cleanupForPageLeave();
    //  }
    //};

    //window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);
    //document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      //window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      //document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleEnsureAudioContext = () => {
      void ensureAudioContext().then((context) => {
        logAudioRecovery("ensureAudioContext:event", {
          audioContextState: context?.state ?? audioContextRef.current?.state ?? null,
        });
      });
    };

    window.addEventListener(
      RETRO_PLAYER_ENSURE_AUDIO_CONTEXT_EVENT,
      handleEnsureAudioContext as EventListener,
    );

    return () => {
      window.removeEventListener(
        RETRO_PLAYER_ENSURE_AUDIO_CONTEXT_EVENT,
        handleEnsureAudioContext as EventListener,
      );
    };
  }, [ensureAudioContext]);

  useEffect(() => {
    const handlePrepareExternalNavigation = () => {
      if (!mediaRef.current) {
        return;
      }

      mediaRef.current.muted = true;
      mediaRef.current.volume = 0;
      mediaRef.current.pause();
      syncVideoState();
    };

    window.addEventListener(
      RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT,
      handlePrepareExternalNavigation as EventListener,
    );

    return () => {
      window.removeEventListener(
        RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT,
        handlePrepareExternalNavigation as EventListener,
      );
    };
  }, [syncVideoState]);

  useEffect(() => {
    const handlePausePlayback = () => {
      if (!mediaRef.current) {
        return;
      }

      cancelPendingPlaybackStart();
      playbackIntentRef.current = "pause";
      mediaRef.current.pause();
      setIsBuffering(false);
      finishLoading();
      syncVideoState();
    };

    window.addEventListener(
      RETRO_PLAYER_PAUSE_PLAYBACK_EVENT,
      handlePausePlayback as EventListener,
    );

    return () => {
      window.removeEventListener(
        RETRO_PLAYER_PAUSE_PLAYBACK_EVENT,
        handlePausePlayback as EventListener,
      );
    };
  }, [cancelPendingPlaybackStart, syncVideoState]);

  useLayoutEffect(() => {
    applyFilterState();
    syncSpriteFilter();
    syncTexturePresentation();
  }, [
    filterState.colorLevels,
    filterState.curvature,
    filterState.ditherStrength,
    filterState.isFilterEnabled,
    filterState.monoTint,
    filterState.neonBoost,
    filterState.neonDetail,
    filterState.neonSaturation,
    filterState.paletteMode,
    filterState.phosphorStrength,
    filterState.spotMaskStrength,
    filterState.bulbRadius,
    filterState.blackFloor,
    filterState.beamDarkCutoff,
    filterState.beamHorizontalSpread,
    filterState.beamStripeStrength,
    filterState.beamWhiteBloom,
    filterState.beamWarmBloom,
    filterState.selectedPreset,
    filterState.signalInstabilityEnabled,
    filterState.signalInstabilityStrength,
    filterState.signalInstabilityFrequency,
    filterState.scanlineBrightnessFade,
    filterState.scanlineStrength,
    filterState.scanline2Strength,
    filterState.targetHeight,
    filterState.targetWidth,
    filterState.vignetteStrength,
    filterState.glowStrength,
  ]);

  useEffect(() => {
    const visualShaderPending =
      !shouldUseNativeVisualSurface &&
      effectiveFilterState.isFilterEnabled &&
      (previewKind === "video" || previewKind === "capture" || previewKind === "image") &&
      !isFilterReady;

    if (visualShaderPending) {
      return;
    }

    if (previewError || needsUserPlay) {
      finishLoading();
      return;
    }

    if (previewKind === "image" || previewKind === "audio") {
      finishLoading();
      return;
    }

    if (isPlaying) {
      finishLoading();
    }
  }, [
    effectiveFilterState.isFilterEnabled,
    isFilterReady,
    isPlaying,
    needsUserPlay,
    previewError,
    previewKind,
    shouldUseNativeVisualSurface,
  ]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;

    const currentMedia = mediaRef.current;
    const isVideoElement = currentMedia instanceof HTMLVideoElement;
    const hasRenderableVideoFrame =
      isVideoElement &&
      currentMedia.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
      currentMedia.videoWidth > 0 &&
      currentMedia.videoHeight > 0;
    const isVideoReady =
      (previewKind === "video" || previewKind === "capture") &&
      hasRenderableVideoFrame;
    const isAtStart =
      !currentMedia || Math.abs(currentMedia.currentTime) < 0.05;
    const isEnded = currentMedia?.ended ?? false;

    if (isVideoReady && isFilterReady) {
      finishLoading();
    }

    if (
      isVideoReady &&
      isFilterReady &&
      !isPlaying &&
      playbackIntentRef.current !== "pause" &&
      !previewError &&
      !isEnded &&
      (audioContextRef.current?.state === "suspended" || isAtStart)
    ) {
      setNeedsUserPlay(true);
    }
  }, [audioContextRef, isPlaying, previewError, previewKind, isFilterReady]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) return;

      const isImageNavigationActive =
        previewKindRef.current === "image" ||
        requestedKindRef.current === "image";
      const triggerPageTurnMotion = (direction: Exclude<RetroPageTurnDirection, null>) => {
        setPageTurnDirection(direction);
        setPageTurnToken((current) => current + 1);
        if (pageTurnResetTimerRef.current !== null) {
          window.clearTimeout(pageTurnResetTimerRef.current);
        }
        pageTurnResetTimerRef.current = window.setTimeout(() => {
          setPageTurnDirection(null);
          pageTurnResetTimerRef.current = null;
        }, 220);
      };

      if (event.code === "ArrowLeft" && isImageNavigationActive && onPrevTrackRef.current) {
        event.preventDefault();
        triggerPageTurnMotion("prev");
        onPrevTrackRef.current();
        return;
      }

      if (event.code === "ArrowRight" && isImageNavigationActive && onNextTrackRef.current) {
        event.preventDefault();
        triggerPageTurnMotion("next");
        onNextTrackRef.current();
        return;
      }

      if (!mediaRef.current) return;

      if (event.code === "Space" || event.code === "KeyK") {
        event.preventDefault();
        void togglePlayback();
        return;
      }

      if (event.code === "KeyJ") {
        event.preventDefault();
        seekTo(Math.max(mediaRef.current.currentTime - 10, 0));
        return;
      }

      if (event.code === "KeyL") {
        event.preventDefault();
        seekTo(
          Math.min(
            mediaRef.current.currentTime + 10,
            mediaRef.current.duration || mediaRef.current.currentTime + 10,
          ),
        );
        return;
      }

      if (event.code === "ArrowLeft") {
        event.preventDefault();
        seekTo(Math.max(mediaRef.current.currentTime - 5, 0));
        return;
      }

      if (event.code === "ArrowRight") {
        event.preventDefault();
        seekTo(
          Math.min(
            mediaRef.current.currentTime + 5,
            mediaRef.current.duration || mediaRef.current.currentTime + 5,
          ),
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    canvasHostRef,
    nativeVisualElement,
    shouldUseNativeVisualSurface,
    previewName,
    previewError,
    isRendererReady,
    isFilterReady,
    audioOptimizationMode,
    recordingContainer,
    nativeAudioSuppressionOverride,
    preferNativeHlsOverride,
    loadingLabel,
    isLoading,
    isBuffering,
    needsUserPlay,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    playbackRate,
    volume,
    isLooping,
    sourceDimensions,
    viewportRect,
    isAudioFxEnabled,
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
    isNoiseEnabled,
    noiseLevel,
    vinylDustAmount,
    noiseWarmthAmount,
    noiseAirAmount,
    noisePresenceAmount,
    delayAmount,
    reverbAmount,
    chorusAmount,
    tapeSaturationAmount,
    setTapeSaturationAmount,
    compressorAmount,
    setCompressorAmount,
    fxOutputTrimAmount,
    setFxOutputTrimAmount,
    inputTrimAmount,
    setInputTrimAmount,
    hasPlayableMedia,
    hasAudibleMedia,
    previewKind,
    hasVideo: previewKind === "video" || previewKind === "capture",
    hasAudioOnly: previewKind === "audio",
    hasImage: previewKind === "image" || options?.requestedKind === "image",
    requestedKind: options?.requestedKind ?? "video",
    requestedIndex: options?.requestedIndex ?? null,
    pageTurnDirection,
    pageTurnToken,
    previewStatus,
    isRecording,
    pendingRecordingFilename,
    prefersShareExport: isTauriRuntime() && isAndroidRuntime(),
    isCaptureActive: previewKind === "capture",
    canRecord:
      previewKind === "video" ||
      previewKind === "capture" ||
      previewKind === "image" ||
      previewKind === "audio",
    previewFile,
    previewStream,
    previewUrl,
    startDisplayCapture,
    stopDisplayCapture,
    togglePlayback,
    toggleMute,
    seekTo,
    stepFrame,
    changePlaybackRate,
    changeVolume,
    toggleLoop,
    setLoopingEnabled,
    applyAudioSettings,
    resetAudioSettings,
    setAudioOptimizationMode,
    setRecordingContainer,
    setNativeAudioSuppressionOverride,
    setPreferNativeHlsOverride,
    latencyHint,
    setLatencyHint,
    playVideoWithAudio,
    isPoweredOn,
    powerOn,
    powerOff,
    downloadPendingRecording,
    sharePendingRecording,
    startRecording,
    stopRecording,
    ensureAudioContext,
    resetRenderer,
    refreshLayout,
    toggleAudioFx: () => {
      setIsAudioFxEnabled((current) => !current);
    },
    isVideoFxEnabled,
    toggleVideoFx: () => {
      setIsVideoFxEnabled((current) => !current);
    },
    setLofiAmount,
    setRadioToneAmount,
    setBitCrushAmount,
    setBitCrushNoiseAmount,
    setSampleRateReductionAmount,
    setNoiseReductionAmount,
    setBassAmount,
    setMidAmount,
    setTrebleAmount,
    setStereoWidthAmount,
    setSmallSpeakerRoomAmount,
    setWowFlutterAmount,
    toggleNoise: () => {
      setIsNoiseEnabled((current) => !current);
    },
    setNoiseLevel,
    setVinylDustAmount,
    setNoiseWarmthAmount,
    setNoiseAirAmount,
    setNoisePresenceAmount,
    setDelayAmount,
    setReverbAmount,
    setChorusAmount,
    analyserRef: audio.analyserRef,
  };
}
