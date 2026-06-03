import { useEffect, useRef, useState } from "react";
import type { RetroFilterState } from "./useRetroFilterState";
import { useRetroAudioEngine } from "./useRetroAudioEngine";
import { useRetroPixiStage } from "./useRetroPixiStage";
import { useRetroPreviewMedia } from "./useRetroPreviewMedia";

let retroPlayerInstanceSeed = 0;

const isRetroPlayerDebugEnabled = () =>
  typeof window !== "undefined" &&
  Boolean((window as typeof window & { __RETRO_PLAYER_DEBUG__?: boolean }).__RETRO_PLAYER_DEBUG__);

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
  const previewRequestIdRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const previewKindRef = useRef<"video" | "audio" | "image" | "capture" | null>(null);

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

  const debugVideo = (label: string, payload?: Record<string, unknown>) => {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    console.log(
      `[retro-player video][${instanceLabelRef.current}] ${label}`,
      payload ?? {},
    );
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
    createVideoTexture,
    destroyPixi,
    fitCurrentSprite,
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

  const audio = useRetroAudioEngine({
    instanceLabel: instanceLabelRef.current,
    previewKind,
    mediaRef,
    isPlaying,
  });

  const {
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
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
    isNoiseEnabled,
    setIsNoiseEnabled,
    noiseLevel,
    setNoiseLevel,
    debugAudio,
    ensureAudioContext,
    updateAudioNodes,
    connectMediaAudio,
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
    createVideoTexture,
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

  const togglePlayback = async () => {
    if (!isPoweredOn) return;
    if (!mediaRef.current) return;

    if (mediaRef.current.paused) {
      await playVideoWithAudio();
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


  useEffect(() => {
    let cancelled = false;

    const setupPixi = async () => {
      await initPixiRef.current();

      if (cancelled) {
        destroyPixiRef.current();
      }
    };

    void setupPixi();

    return () => {
      cancelled = true;
      cleanupPreview();
      void disposeAudioEngine();
      destroyPixiRef.current();
    };
  }, [renderResolutionScale]);

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
    applyFilterState();
    syncSpriteFilter();
    syncTexturePresentation();
    fitCurrentSprite();
  }, [
    filterState.colorLevels,
    filterState.curvature,
    filterState.ditherStrength,
    filterState.isFilterEnabled,
    filterState.monoTint,
    filterState.paletteMode,
    filterState.phosphorStrength,
    filterState.scanlineStrength,
    filterState.scanline2Strength,
    filterState.targetHeight,
    filterState.targetWidth,
    filterState.vignetteStrength,
    filterState.glowStrength,
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

    if (isVideoReady) {
      finishLoading();
    }

    if (isVideoReady && !isPlaying && audioContextRef.current?.state === "suspended") {
      setNeedsUserPlay(true);
    }
  }, [audioContextRef, isPlaying, previewKind]);

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
    isNoiseEnabled,
    noiseLevel,
    hasPlayableMedia:
      previewKind === "video" || previewKind === "audio" || previewKind === "capture",
    hasVideo: previewKind === "video" || previewKind === "capture",
    hasAudioOnly: previewKind === "audio",
    hasImage: previewKind === "image",
    isCaptureActive: previewKind === "capture",
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
    refreshLayout,
    toggleAudioFx: () => {
      setIsAudioFxEnabled((current) => !current);
    },
    setLofiAmount,
    toggleNoise: () => {
      setIsNoiseEnabled((current) => !current);
    },
    setNoiseLevel,
  };
}
