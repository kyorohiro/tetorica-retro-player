import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { shareFile } from "@choochmeque/tauri-plugin-sharekit-api";
import type { RetroFilterState } from "./useRetroFilterState";
import { useRetroAudioEngine } from "./useRetroAudioEngine";
import { useRetroPixiStage } from "./useRetroPixiStage";
import { useRetroPreviewMedia } from "./useRetroPreviewMedia";
import {
  RETRO_PLAYER_ENSURE_AUDIO_CONTEXT_EVENT,
  RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT,
} from "../events";

let retroPlayerInstanceSeed = 0;

const isTauriRuntime = () =>
  typeof window !== "undefined" &&
  ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);

const isAndroidRuntime = () =>
  typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);


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
    playbackSource?: "builtin-tone" | "media";
    preferNativeVideoSurface?: boolean;
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
  const pendingDownloadUrlRef = useRef<string | null>(null);
  const pendingRecordingBlobRef = useRef<Blob | null>(null);
  const pendingRecordingFilenameRef = useRef<string | null>(null);
  const stopRecordingResolverRef = useRef<((value: string | null) => void) | null>(null);
  const previewRequestIdRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const previewKindRef = useRef<"video" | "audio" | "image" | "capture" | null>(null);
  const wasPlayingBeforePowerOffRef = useRef(false);
  const onEndedRef = useRef<(() => void) | undefined>(options?.onEnded);
  const onErrorRef = useRef<((error: Error) => void) | undefined>(options?.onError);
  const onRetryRef = useRef<(() => void) | undefined>(options?.onRetry);
  const autoPlayRef = useRef<boolean>(options?.autoPlay ?? true);
  const onPlaybackChangeRef = useRef<((event: RetroPlaybackEvent) => void) | undefined>(options?.onPlaybackChange);

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
  const [isRecording, setIsRecording] = useState(false);
  const isRecordingRef = useRef(false);
  const [pendingRecordingFilename, setPendingRecordingFilename] = useState<string | null>(null);
  const [isVideoFxEnabled, setIsVideoFxEnabled] = useState(true);

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
    const isRetryable =
      needsUserPlay ||
      /src-not-supported|network|failed to start|did not start|cannot confirm|buffer|waiting|stalled|読み込みに失敗|再生の開始|再試行|開始を確認できません/.test(
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

  const effectiveFilterState = useMemo(
    () => ({
      ...filterState,
      isFilterEnabled: filterState.isFilterEnabled && isVideoFxEnabled,
    }),
    [filterState, isVideoFxEnabled],
  );

  const stage = useRetroPixiStage({
    filterState: effectiveFilterState,
    fitMode,
    renderResolutionScale,
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

  const audio = useRetroAudioEngine({
    instanceLabel: instanceLabelRef.current,
    previewKind,
    previewKindRef,
    mediaRef,
    isPlaying,
    isPlayingRef,
  });

  const {
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
    recordingDestinationRef,
    noiseGainRef,
    audioOptimizationModeRef,
    audioOptimizationMode,
    setAudioOptimizationMode,
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
    previewKindRef.current = nextKind;
    setPreviewKind(nextKind);
  };

  const nativeVideoElement =
    mediaRef.current instanceof HTMLVideoElement ? mediaRef.current : null;
  const shouldUseNativeVideoSurface =
    Boolean(options?.preferNativeVideoSurface) &&
    previewKind === "video" &&
    nativeVideoElement !== null &&
    nativeVideoElement.src.includes(".m3u8");

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
    previewKindRef,
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
    noiseGainRef,
    audioOptimizationModeRef,
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
    setSourceDimensions,
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
    if (!mediaRef.current) return;

    if (mediaRef.current.paused || mediaRef.current.ended) {
      if (!isPoweredOn) {
        powerOn();
      }
      const shouldRestartFromSource =
        mediaRef.current.error ||
        mediaRef.current.ended ||
        (
          mediaRef.current instanceof HTMLVideoElement &&
          mediaRef.current.src.includes(".m3u8") &&
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
    mediaRef.current.pause();
    setIsBuffering(false);
    finishLoading();
    syncVideoState();
  };

  const toggleMute = () => {
    if (!mediaRef.current) return;

    setIsMuted((current) => {
      const nextValue = !current;
      isMutedRef.current = nextValue;
      window.requestAnimationFrame(updateAudioNodes);
      return nextValue;
    });
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
    playbackRateRef.current = nextRate;
    setPlaybackRate(nextRate);
  };

  const changeVolume = (nextVolume: number) => {
    if (!mediaRef.current) return;

    volumeRef.current = nextVolume;
    isMutedRef.current = nextVolume === 0;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
    window.requestAnimationFrame(updateAudioNodes);
  };

  const toggleLoop = () => {
    if (!mediaRef.current) return;

    mediaRef.current.loop = !mediaRef.current.loop;
    isLoopingRef.current = mediaRef.current.loop;
    setIsLooping(mediaRef.current.loop);
  };

  const setLoopingEnabled = (nextLooping: boolean) => {
    isLoopingRef.current = nextLooping;
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
    const isAudioOnly = (mimeType || blob.type).startsWith("audio/");
    const filename = `tetorica-retro-player-${timestamp}.${isAudioOnly ? "weba" : "webm"}`;
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
    const candidates = hasVideoTrack
      ? [
          "video/webm;codecs=vp9,opus",
          "video/webm;codecs=vp8,opus",
          "video/webm",
        ]
      : [
          "audio/webm;codecs=opus",
          "audio/webm",
        ];

    return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
  };

  const startRecording = async () => {
    await ensureAudioContext();

    const recordingStream = new MediaStream();
    const shouldRecordVideo = previewKindRef.current !== "audio";
    const livePreviewStream = streamRef.current;
    const ownedRecordingTracks: MediaStreamTrack[] = [];

    if (shouldRecordVideo) {
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

    const recordingDestinationTracks =
      recordingDestinationRef.current?.stream
        .getAudioTracks() ?? [];
    const liveAudioTracks =
      livePreviewStream instanceof MediaStream
        ? livePreviewStream.getAudioTracks()
        : [];

    if (recordingDestinationTracks.length > 0) {
      recordingDestinationTracks.forEach((track) => {
        const clonedTrack = track.clone();
        recordingStream.addTrack(clonedTrack);
        ownedRecordingTracks.push(clonedTrack);
      });
    } else if (liveAudioTracks.length > 0) {
      liveAudioTracks.forEach((track) => recordingStream.addTrack(track));
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

  useLayoutEffect(() => {
    applyFilterState();
    syncSpriteFilter();
    syncTexturePresentation();
    refreshLayout();
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
    filterState.selectedPreset,
    filterState.closeUpNoiseStrength,
    filterState.scanlineBrightnessFade,
    filterState.scanlineStrength,
    filterState.scanline2Strength,
    filterState.targetHeight,
    filterState.targetWidth,
    filterState.vignetteStrength,
    filterState.glowStrength,
    refreshLayout,
  ]);

  useEffect(() => {
    const visualShaderPending =
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
  }, [previewError, needsUserPlay, previewKind, isPlaying, isFilterReady]);

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
      !previewError &&
      !isEnded &&
      (audioContextRef.current?.state === "suspended" || isAtStart)
    ) {
      setNeedsUserPlay(true);
    }
  }, [audioContextRef, isPlaying, previewError, previewKind, isFilterReady]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!mediaRef.current) return;

      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) return;

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
    nativeVideoElement,
    shouldUseNativeVideoSurface,
    previewName,
    previewError,
    isRendererReady,
    isFilterReady,
    audioOptimizationMode,
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
    hasVideo: previewKind === "video" || previewKind === "capture",
    hasAudioOnly: previewKind === "audio",
    hasImage: previewKind === "image",
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
