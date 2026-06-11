import type { CanvasStageApp } from "./useRetroPixiStage";
import type { RetroFilterState } from "./useRetroFilterState";

type PreviewKind = "video" | "audio" | "image" | "capture" | null;
type CurrentRef<T> = { current: T };

type UseRetroPreviewMediaParams = {
  filterState: RetroFilterState;
  appRef: CurrentRef<CanvasStageApp | null>;
  spriteRef: CurrentRef<null>;
  textureRef: CurrentRef<null>;
  previewElementRef: CurrentRef<HTMLImageElement | HTMLMediaElement | null>;
  filterRef: CurrentRef<Record<string, never> | null>;
  mediaRef: CurrentRef<HTMLMediaElement | null>;
  objectUrlRef: CurrentRef<string | null>;
  streamRef: CurrentRef<MediaStream | null>;
  streamOwnedRef: CurrentRef<boolean>;
  previewRequestIdRef: CurrentRef<number>;
  isPlayingRef: CurrentRef<boolean>;
  previewKindRef: CurrentRef<PreviewKind>;
  audioContextRef: CurrentRef<AudioContext | null>;
  mediaSourceRef: CurrentRef<MediaElementAudioSourceNode | null>;
  masterGainRef: CurrentRef<GainNode | null>;
  noiseGainRef: CurrentRef<GainNode | null>;
  isMutedRef: CurrentRef<boolean>;
  volumeRef: CurrentRef<number>;
  playbackRateRef: CurrentRef<number>;
  isLoopingRef: CurrentRef<boolean>;
  isAudioFxEnabled: boolean;
  lofiAmount: number;
  bitCrushAmount: number;
  sampleRateReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  isMuted: boolean;
  volume: number;
  previewKind: PreviewKind;
  setPreviewName: (value: string) => void;
  setPreviewError: (value: string) => void;
  setNeedsUserPlay: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
  setCurrentTime: (value: number) => void;
  setDuration: (value: number) => void;
  setPlaybackRate: (value: number) => void;
  setIsLooping: (value: boolean) => void;
  setSourceDimensions: (value: { width: number; height: number } | null) => void;
  setViewportRect: (value: { width: number; height: number; x: number; y: number } | null) => void;
  setPreviewKindState: (kind: PreviewKind) => void;
  setIsPoweredOn: (value: boolean) => void;
  beginLoading: (label: string) => void;
  finishLoading: () => void;
  ensureAudioContext: () => Promise<AudioContext | null>;
  updateAudioNodes: () => void;
  connectMediaAudio: (media: HTMLMediaElement) => Promise<void>;
  fitSprite: (app: CanvasStageApp | null, sprite: null, source: HTMLVideoElement | HTMLImageElement) =>
    | { width: number; height: number; x: number; y: number }
    | undefined;
  refreshLayout: () => void;
  scheduleRefreshLayout: () => void;
  safeRender: () => void;
  resetFilterInstance: () => void;
  initPixi: () => Promise<void>;
  resetPerfAccumulators?: () => void;
  debugVideo: (label: string, payload?: Record<string, unknown>) => void;
  debugAudio: (label: string, payload?: Record<string, unknown>) => void;
};

export function useRetroPreviewMedia({
  appRef,
  spriteRef,
  textureRef,
  previewElementRef,
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
  resetPerfAccumulators,
  debugVideo,
  debugAudio,
}: UseRetroPreviewMediaParams) {
  const muteNoiseImmediately = () => {
    if (noiseGainRef.current) {
      noiseGainRef.current.gain.value = 0;
    }
  };

  const releaseDetachedMedia = (
    media: HTMLMediaElement,
    url?: string,
    stopStream = true,
  ) => {
    media.pause();
    if (media.srcObject instanceof MediaStream) {
      if (stopStream) {
        media.srcObject.getTracks().forEach((track) => track.stop());
      }
      media.srcObject = null;
    }
    media.src = "";
    media.load();

    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  const waitForVideoFrame = (video: HTMLVideoElement) =>
    new Promise<void>((resolve, reject) => {
      const describeMediaError = (mediaError: MediaError | null) => {
        if (!mediaError) return "unknown";
        if (mediaError.code === MediaError.MEDIA_ERR_ABORTED) return "aborted";
        if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return "network";
        if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return "decode";
        if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          return "src-not-supported";
        }

        return `code-${mediaError.code}`;
      };

      const cleanup = () => {
        video.removeEventListener("loadeddata", handleReady);
        video.removeEventListener("canplay", handleReady);
        video.removeEventListener("error", handleError);
      };

      const handleReady = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        cleanup();
        reject(
          new Error(
            `動画の読み込みに失敗しました。 src=${video.currentSrc || video.src || "(empty)"} reason=${describeMediaError(video.error)}`,
          ),
        );
      };

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        resolve();
        return;
      }

      video.addEventListener("loadeddata", handleReady, { once: true });
      video.addEventListener("canplay", handleReady, { once: true });
      video.addEventListener("error", handleError, { once: true });
      video.load();
    });

  const waitForAudioReady = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve, reject) => {
      const describeMediaError = (mediaError: MediaError | null) => {
        if (!mediaError) return "unknown";
        if (mediaError.code === MediaError.MEDIA_ERR_ABORTED) return "aborted";
        if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return "network";
        if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return "decode";
        if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          return "src-not-supported";
        }

        return `code-${mediaError.code}`;
      };

      const cleanup = () => {
        audio.removeEventListener("loadedmetadata", handleReady);
        audio.removeEventListener("canplay", handleReady);
        audio.removeEventListener("error", handleError);
      };

      const handleReady = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        cleanup();
        reject(
          new Error(
            `音声の読み込みに失敗しました。 src=${audio.currentSrc || audio.src || "(empty)"} reason=${describeMediaError(audio.error)}`,
          ),
        );
      };

      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resolve();
        return;
      }

      audio.addEventListener("loadedmetadata", handleReady, { once: true });
      audio.addEventListener("canplay", handleReady, { once: true });
      audio.addEventListener("error", handleError, { once: true });
      audio.load();
    });

  const waitForImageFrame = (image: HTMLImageElement) =>
    new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        image.removeEventListener("load", handleReady);
        image.removeEventListener("error", handleError);
      };

      const handleReady = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        cleanup();
        reject(new Error("画像の読み込みに失敗しました。"));
      };

      if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
        resolve();
        return;
      }

      image.addEventListener("load", handleReady, { once: true });
      image.addEventListener("error", handleError, { once: true });
    });

  const attachMediaEventListeners = (media: HTMLMediaElement) => {
    media.addEventListener("play", syncVideoState);
    media.addEventListener("pause", syncVideoState);
    media.addEventListener("volumechange", syncVideoState);
    media.addEventListener("timeupdate", syncVideoState);
    media.addEventListener("durationchange", syncVideoState);
    media.addEventListener("seeked", syncVideoState);
    media.addEventListener("ended", syncVideoState);
    media.addEventListener("ratechange", syncVideoState);
  };

  const applyMediaSettings = (media: HTMLMediaElement) => {
    media.loop = isLoopingRef.current;
    media.muted = isMutedRef.current;
    media.volume = isMutedRef.current ? 0 : volumeRef.current;
    media.playbackRate = playbackRateRef.current;
    media.autoplay = false;
    media.preload = "auto";
    media.crossOrigin = "anonymous";
    if (media instanceof HTMLVideoElement) {
      media.playsInline = true;
    }
  };

  const syncVideoState = () => {
    if (!mediaRef.current) {
      debugVideo("syncVideoState:no-media", {
        previewKind: previewKindRef.current,
        hasPreviewElement: Boolean(previewElementRef.current),
      });
      isPlayingRef.current = false;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      updateAudioNodes();
      safeRender();
      return;
    }

    isPlayingRef.current = !mediaRef.current.paused;
    setIsPlaying(!mediaRef.current.paused);
    if (!mediaRef.current.paused) {
      finishLoading();
    }
    setCurrentTime(mediaRef.current.currentTime);
    setDuration(mediaRef.current.duration || 0);
    setPlaybackRate(mediaRef.current.playbackRate || 1);
    setIsLooping(mediaRef.current.loop);
    updateAudioNodes();
    safeRender();
  };

  const cleanupPreview = () => {
    debugVideo("cleanupPreview:start", {
      previewKind: previewKindRef.current,
      hasMedia: Boolean(mediaRef.current),
      hasPreviewElement: Boolean(previewElementRef.current),
    });
    previewRequestIdRef.current += 1;
    finishLoading();

    const currentMedia = mediaRef.current;
    const currentStream = streamRef.current;
    const shouldStopCurrentStream = streamOwnedRef.current;

    spriteRef.current = null;
    textureRef.current = null;
    mediaRef.current = null;
    previewElementRef.current = null;
    streamRef.current = null;
    streamOwnedRef.current = false;
    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;

    setNeedsUserPlay(false);
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPreviewKindState(null);
    setSourceDimensions(null);
    setViewportRect(null);

    if (objectUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = null;

    if (currentMedia) {
      releaseDetachedMedia(currentMedia, undefined, shouldStopCurrentStream);
    } else if (shouldStopCurrentStream) {
      currentStream?.getTracks().forEach((track) => track.stop());
    }

    safeRender();
  };

  const cleanupForPageLeave = () => {
    if (mediaRef.current) {
      mediaRef.current.pause();
    }

    if (noiseGainRef.current) {
      noiseGainRef.current.gain.value = 0;
    }

    if (masterGainRef.current) {
      masterGainRef.current.gain.value = 0;
    }

    cleanupPreview();

    if (audioContextRef.current?.state === "running") {
      void audioContextRef.current.suspend();
    }
  };

  const powerOn = () => {
    setIsPoweredOn(true);
    appRef.current?.ticker.start();
    try {
      resetPerfAccumulators?.();
    } catch (e) {
      // ignore
    }
  };

  const playVideoWithAudio = async () => {
    if (!mediaRef.current) return;

    try {
      await ensureAudioContext();
      mediaRef.current.muted = isMutedRef.current;
      mediaRef.current.volume = isMutedRef.current ? 0 : volumeRef.current;
      await mediaRef.current.play();
      isPlayingRef.current = true;
      setIsPlaying(true);
      setPreviewError("");
      setNeedsUserPlay(false);
      debugAudio("playVideoWithAudio", {
        audioContextState: audioContextRef.current?.state,
        currentTime: mediaRef.current.currentTime,
        isAudioFxEnabled,
        lofiAmount,
        bitCrushAmount,
        sampleRateReductionAmount,
        bassAmount,
        midAmount,
        trebleAmount,
        isMuted,
        volume,
      });
      updateAudioNodes();
      syncVideoState();
      safeRender();
      scheduleRefreshLayout();
      window.requestAnimationFrame(updateAudioNodes);
    } catch (error) {
      finishLoading();
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setNeedsUserPlay(true);
        setPreviewError("");
        return;
      }

      setNeedsUserPlay(false);
      setPreviewError(
        error instanceof Error
          ? error.message
          : "音声付き再生を開始できませんでした。",
      );
    }
  };

  const ensureRendererReady = async () => {
    await initPixi();

    if (!appRef.current) {
      throw new Error("Canvas renderer is not ready yet.");
    }

    return appRef.current;
  };

  const attachVisualPreview = async (
    source: HTMLVideoElement | HTMLImageElement,
    kind: "video" | "image" | "capture",
  ) => {
    const app = await ensureRendererReady();
    previewElementRef.current = source;
    fitSprite(app, null, source);
    setPreviewKindState(kind);
    setSourceDimensions(
      source instanceof HTMLVideoElement
        ? { width: source.videoWidth, height: source.videoHeight }
        : { width: source.naturalWidth, height: source.naturalHeight },
    );
    safeRender();
    refreshLayout();
    scheduleRefreshLayout();

    appRef.current?.ticker.start();
  };

  const previewFile = async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      setPreviewError("動画、音声、または画像ファイルを選んでください。");
      return;
    }

    powerOn();
    cleanupPreview();
    resetFilterInstance();
    const requestId = previewRequestIdRef.current;
    setPreviewError("");
    setPreviewName(file.name);
    beginLoading(
      isVideo ? "Loading video preview..." : isAudio ? "Loading audio preview..." : "Loading image preview...",
    );

    let url: string | null = null;

    try {
      await ensureRendererReady();
      url = URL.createObjectURL(file);
      objectUrlRef.current = url;

      if (isVideo || isAudio) {
        const media = isVideo ? document.createElement("video") : document.createElement("audio");
        media.src = url;
        applyMediaSettings(media);
        attachMediaEventListeners(media);

        if (media instanceof HTMLVideoElement) {
          await waitForVideoFrame(media);
        } else {
          await waitForAudioReady(media);
        }

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, url);
          return;
        }

        mediaRef.current = media;

        if (media instanceof HTMLVideoElement) {
          await attachVisualPreview(media, "video");
        } else {
          previewElementRef.current = null;
          setPreviewKindState("audio");
          setSourceDimensions(null);
          setViewportRect(null);
          safeRender();
        }

        await connectMediaAudio(media);
        syncVideoState();
        await playVideoWithAudio();
        if (requestId === previewRequestIdRef.current) {
          finishLoading();
        }
        return;
      }

      const image = new Image();
      image.src = url;
      image.crossOrigin = "anonymous";
      await waitForImageFrame(image);

      if (requestId !== previewRequestIdRef.current) {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
        return;
      }

      mediaRef.current = null;
      muteNoiseImmediately();
      updateAudioNodes();
      await attachVisualPreview(image, "image");
      syncVideoState();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) {
        if (url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
        return;
      }

      cleanupPreview();
      setPreviewError(
        error instanceof Error ? error.message : "動画プレビューに失敗しました。",
      );
      setNeedsUserPlay(
        error instanceof DOMException && error.name === "NotAllowedError",
      );
    }
  };

  const startDisplayCapture = async () => {
    powerOn();

    if (!navigator.mediaDevices?.getDisplayMedia) {
      setPreviewError("このブラウザでは画面キャプチャーに対応していません。");
      return;
    }

    cleanupPreview();
    const requestId = previewRequestIdRef.current;
    setPreviewError("");
    setPreviewName("Display Capture");
    beginLoading("Preparing display capture...");

    try {
      await ensureRendererReady();
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (requestId !== previewRequestIdRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const video = document.createElement("video");
      video.srcObject = stream;
      applyMediaSettings(video);
      attachMediaEventListeners(video);

      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        stopDisplayCapture();
      });

      await waitForVideoFrame(video);

      streamRef.current = stream;
      streamOwnedRef.current = true;
      mediaRef.current = video;
      await attachVisualPreview(video, "capture");
      await connectMediaAudio(video);
      setNeedsUserPlay(false);
      await playVideoWithAudio();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      cleanupPreview();
      setPreviewError(
        error instanceof Error
          ? error.message
          : "画面キャプチャーを開始できませんでした。",
      );
    }
  };

  const stopDisplayCapture = () => {
    if (previewKind !== "capture") return;
    cleanupPreview();
    setPreviewName("");
    setPreviewError("");
  };

  const previewStream = async (
    stream: MediaStream,
    kind: "video" | "audio" = "video",
    name = "Media Stream",
  ) => {
    let requestId = 0;

    try {
      powerOn();
      cleanupPreview();
      resetFilterInstance();
      requestId = previewRequestIdRef.current;

      setPreviewError("");
      setPreviewName(name);
      beginLoading(kind === "video" ? "Loading stream preview..." : "Loading stream audio...");
      await ensureRendererReady();

      if (kind === "video") {
        const media = document.createElement("video");
        media.srcObject = stream;
        applyMediaSettings(media);
        attachMediaEventListeners(media);
        await waitForVideoFrame(media);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, undefined, false);
          return;
        }

        streamRef.current = stream;
        streamOwnedRef.current = false;
        mediaRef.current = media;
        await attachVisualPreview(media, "capture");
        await connectMediaAudio(media);
      } else {
        const media = document.createElement("audio");
        media.srcObject = stream;
        applyMediaSettings(media);
        attachMediaEventListeners(media);
        await waitForAudioReady(media);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, undefined, false);
          return;
        }

        streamRef.current = stream;
        streamOwnedRef.current = false;
        mediaRef.current = media;
        previewElementRef.current = null;
        setPreviewKindState("audio");
        setSourceDimensions(null);
        setViewportRect(null);
        safeRender();
        await connectMediaAudio(media);
        syncVideoState();
      }

      if (requestId !== previewRequestIdRef.current) return;

      await playVideoWithAudio();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      cleanupPreview();
      setPreviewError(error instanceof Error ? error.message : String(error));
    }
  };

  const previewUrl = async (url: string, kind: "video" | "image" | "audio" = "video") => {
    let requestId = 0;

    try {
      powerOn();
      cleanupPreview();
      resetFilterInstance();
      requestId = previewRequestIdRef.current;

      setPreviewError("");
      setPreviewName(url);
      beginLoading(
        kind === "video"
          ? "Loading video preview..."
          : kind === "image"
            ? "Loading image preview..."
            : "Loading audio preview...",
      );
      await ensureRendererReady();

      if (kind === "video") {
        const media = document.createElement("video");
        media.src = url;
        applyMediaSettings(media);
        attachMediaEventListeners(media);
        await waitForVideoFrame(media);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, url);
          return;
        }

        mediaRef.current = media;
        await attachVisualPreview(media, "video");
        await connectMediaAudio(media);
        syncVideoState();
      } else if (kind === "image") {
        const image = new Image();
        image.src = url;
        image.crossOrigin = "anonymous";
        await waitForImageFrame(image);

        if (requestId !== previewRequestIdRef.current) {
          return;
        }

        mediaRef.current = null;
        muteNoiseImmediately();
        updateAudioNodes();
        await attachVisualPreview(image, "image");
        syncVideoState();
      } else {
        const audio = document.createElement("audio");
        audio.src = url;
        applyMediaSettings(audio);
        attachMediaEventListeners(audio);
        await waitForAudioReady(audio);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(audio, url);
          return;
        }

        previewElementRef.current = null;
        setPreviewKindState("audio");
        setSourceDimensions(null);
        setViewportRect(null);
        mediaRef.current = audio;
        safeRender();
        await connectMediaAudio(audio);
        syncVideoState();
      }

      if (requestId !== previewRequestIdRef.current) return;

      if (kind === "video" || kind === "audio") {
        await playVideoWithAudio();
      }
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      cleanupPreview();
      setPreviewError(error instanceof Error ? error.message : String(error));
    }
  };

  return {
    cleanupPreview,
    cleanupForPageLeave,
    playVideoWithAudio,
    previewFile,
    previewStream,
    previewUrl,
    startDisplayCapture,
    stopDisplayCapture,
    syncVideoState,
    releaseDetachedMedia,
    ensurePixiReady: ensureRendererReady,
  };
}
