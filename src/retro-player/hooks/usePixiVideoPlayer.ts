import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { shareFile } from "@choochmeque/tauri-plugin-sharekit-api";
import type { RetroFilterState } from "./useRetroFilterState";
import { useRetroAudioEngine } from "./useRetroAudioEngine";
import { useRetroPixiStage } from "./useRetroPixiStage";
import { useRetroPreviewMedia } from "./useRetroPreviewMedia";
import { RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT } from "../events";

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

export function usePixiVideoPlayer(
  filterState: RetroFilterState,
  fitMode: "contain" | "width",
  renderResolutionScale = 1,
) {
  const instanceLabelRef = useRef(`player-${(retroPlayerInstanceSeed += 1)}`);
  const objectUrlRef = useRef<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const streamOwnedRef = useRef<boolean>(false);
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const pendingDownloadUrlRef = useRef<string | null>(null);
  const pendingRecordingBlobRef = useRef<Blob | null>(null);
  const pendingRecordingFilenameRef = useRef<string | null>(null);
  const stopRecordingResolverRef = useRef<((value: string | null) => void) | null>(null);
  const previewRequestIdRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const previewKindRef = useRef<"video" | "audio" | "image" | "capture" | null>(null);
  const wasPlayingBeforeBackgroundRef = useRef(false);

  const [previewName, setPreviewName] = useState<string>("");
  const [previewError, setPreviewError] = useState<string>("");
  const [isPoweredOn, setIsPoweredOn] = useState<boolean>(true);
  const [loadingLabel, setLoadingLabel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const [pendingRecordingFilename, setPendingRecordingFilename] = useState<string | null>(null);

  const debugVideo = (label: string, payload?: Record<string, unknown>) => {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    const suffix = payload ? ` ${JSON.stringify(payload)}` : "";
    console.log(`[retro-player video][${instanceLabelRef.current}] ${label}${suffix}`);
  };

  const stage = useRetroPixiStage({
    filterState,
    fitMode,
    renderResolutionScale,
    isPoweredOn,
    isPlayingRef,
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
    viewportRect,
    setViewportRect,
    applyFilterState,
    destroyPixi,
    fitSprite,
    initPixi,
    refreshLayout,
    resetFilterInstance,
    safeRender,
    scheduleRefreshLayout,
    syncSpriteFilter,
    syncTexturePresentation,
  } = stage;
  const initPixiRef = useRef(initPixi);
  const destroyPixiRef = useRef(destroyPixi);
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
    sampleRateReductionAmount,
    setSampleRateReductionAmount,
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
    debugAudio,
    ensureAudioContext,
    updateAudioNodes,
    connectMediaAudio,
    reconnectCurrentMediaAudio,
    resetAudioSettings,
    disposeAudioEngine,
  } = audio;

  useEffect(() => {
    initPixiRef.current = initPixi;
    destroyPixiRef.current = destroyPixi;
  }, [initPixi, destroyPixi]);

  const setPreviewKindState = (
    nextKind: "video" | "audio" | "image" | "capture" | null,
  ) => {
    previewKindRef.current = nextKind;
    setPreviewKind(nextKind);
  };

  const beginLoading = (label: string) => {
    setLoadingLabel(label);
    setIsLoading(true);
  };

  const finishLoading = () => {
    setIsLoading(false);
    setLoadingLabel("");
  };

  const powerOn = () => {
    setIsPoweredOn(true);
    appRef.current?.ticker.start();
  };

  const powerOff = () => {
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
    connectMediaAudio,
    fitSprite,
    refreshLayout,
    scheduleRefreshLayout,
    safeRender,
    resetFilterInstance,
    initPixi,
    debugVideo,
    debugAudio,
  });

  const {
    cleanupPreview,
    cleanupForPageLeave,
    playVideoWithAudio,
    previewFile,
    previewStream,
    previewUrl,
    startDisplayCapture,
    stopDisplayCapture,
    syncVideoState,
  } = media;

  useEffect(() => {
    cleanupPreviewRef.current = cleanupPreview;
  }, [cleanupPreview]);

  useEffect(() => {
    disposeAudioEngineRef.current = disposeAudioEngine;
  }, [disposeAudioEngine]);

  const togglePlayback = async () => {
    if (!mediaRef.current) return;

    if (mediaRef.current.paused) {
      if (!isPoweredOn) {
        powerOn();
      }
      await playVideoWithAudio();
      syncVideoState();
      return;
    }

    mediaRef.current.pause();
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

  const saveRecording = (chunks: Blob[], mimeType: string) => {
    if (typeof window === "undefined" || chunks.length === 0) {
      return null;
    }

    revokePendingRecording();

    const blob = new Blob(chunks, { type: mimeType || "video/webm" });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `tetorica-retro-player-${timestamp}.webm`;
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

  const getRecordingMimeType = () => {
    const candidates = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];

    return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
  };

  const startRecording = async () => {
    const canvas = appRef.current?.canvas;

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Preview canvas is not ready yet.");
    }

    await ensureAudioContext();

    const recordingStream = new MediaStream();
    const canvasStream = canvas.captureStream(30);
    canvasStream.getVideoTracks().forEach((track) => recordingStream.addTrack(track));
    recordingDestinationRef.current?.stream
      .getAudioTracks()
      .forEach((track) => recordingStream.addTrack(track.clone()));

    const mimeType = getRecordingMimeType();
    const recorder = mimeType
      ? new MediaRecorder(recordingStream, { mimeType })
      : new MediaRecorder(recordingStream);

    recordedChunksRef.current = [];
    revokePendingRecording();
    setPendingRecordingFilename(null);
    recordingStreamRef.current = recordingStream;
    mediaRecorderRef.current = recorder;
    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    });
    recorder.addEventListener("stop", () => {
      const resolvedFilename = saveRecording(recordedChunksRef.current, recorder.mimeType);
      recordedChunksRef.current = [];
      recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
      recordingStreamRef.current = null;
      mediaRecorderRef.current = null;
      setIsRecording(false);
      stopRecordingResolverRef.current?.(resolvedFilename);
      stopRecordingResolverRef.current = null;
    }, { once: true });
    recorder.start();
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

      recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
      recordingStreamRef.current = null;
      mediaRecorderRef.current = null;
      setIsRecording(false);
      stopRecordingResolverRef.current?.(pendingRecordingFilenameRef.current);
      stopRecordingResolverRef.current = null;
    });
  };


  useEffect(() => {
    let cancelled = false;

    const setupPixi = async () => {
      debugVideo("startup:setupPixi-effect:start", {
        renderResolutionScale,
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
  }, [renderResolutionScale]);

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
    if (!isAndroidRuntime()) {
      return;
    }

    const isPlayableKind = (kind: typeof previewKindRef.current) =>
      kind === "video" || kind === "audio" || kind === "capture";

    const handleVisibilityChange = () => {
      const media = mediaRef.current;
      if (!media || !isPlayableKind(previewKindRef.current)) {
        return;
      }

      if (document.visibilityState === "hidden") {
        wasPlayingBeforeBackgroundRef.current = !media.paused;

        media.pause();
        isPlayingRef.current = false;
        setIsPlaying(false);

        if (noiseGainRef.current) {
          noiseGainRef.current.gain.value = 0;
        }

        if (masterGainRef.current) {
          masterGainRef.current.gain.value = 0;
        }

        if (audioContextRef.current?.state === "running") {
          void audioContextRef.current.suspend().catch(() => {
            // Ignore background suspension failures.
          });
        }

        return;
      }

      window.setTimeout(() => {
        void (async () => {
          try {
            await ensureAudioContext();
            reconnectCurrentMediaAudio();
            updateAudioNodes();

            if (wasPlayingBeforeBackgroundRef.current && mediaRef.current) {
              try {
                await mediaRef.current.play();
                setNeedsUserPlay(false);
              } catch (error) {
                if (error instanceof DOMException && error.name === "NotAllowedError") {
                  setNeedsUserPlay(true);
                }
              }
            }
          } finally {
            syncVideoState();
            wasPlayingBeforeBackgroundRef.current = false;
          }
        })();
      }, 80);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    audioContextRef,
    ensureAudioContext,
    masterGainRef,
    noiseGainRef,
    reconnectCurrentMediaAudio,
    syncVideoState,
    updateAudioNodes,
  ]);

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
  }, [previewError, needsUserPlay, previewKind, isPlaying]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;

    const isVideoReady =
      (previewKind === "video" || previewKind === "capture") &&
      mediaRef.current?.tagName === "VIDEO";
    const isAtStart =
      !mediaRef.current || Math.abs(mediaRef.current.currentTime) < 0.05;
    const isEnded = mediaRef.current?.ended ?? false;

    if (isVideoReady) {
      finishLoading();
    }

    if (
      isVideoReady &&
      !isPlaying &&
      !previewError &&
      !isEnded &&
      (audioContextRef.current?.state === "suspended" || isAtStart)
    ) {
      setNeedsUserPlay(true);
    }
  }, [audioContextRef, isPlaying, previewError, previewKind]);

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
    previewName,
    previewError,
    isRendererReady,
    loadingLabel,
    isLoading,
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
    sampleRateReductionAmount,
    bassAmount,
    midAmount,
    trebleAmount,
    stereoWidthAmount,
    smallSpeakerRoomAmount,
    wowFlutterAmount,
    isNoiseEnabled,
    noiseLevel,
    vinylDustAmount,
    hasPlayableMedia:
      previewKind === "video" || previewKind === "audio" || previewKind === "capture",
    hasVideo: previewKind === "video" || previewKind === "capture",
    hasAudioOnly: previewKind === "audio",
    hasImage: previewKind === "image",
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
    resetAudioSettings,
    playVideoWithAudio,
    isPoweredOn,
    powerOn,
    powerOff,
    downloadPendingRecording,
    sharePendingRecording,
    startRecording,
    stopRecording,
    refreshLayout,
    toggleAudioFx: () => {
      setIsAudioFxEnabled((current) => !current);
    },
    setLofiAmount,
    setRadioToneAmount,
    setBitCrushAmount,
    setSampleRateReductionAmount,
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
  };
}
