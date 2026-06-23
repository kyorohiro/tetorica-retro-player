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
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
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

const isAndroidRuntime = () =>
  typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

// navigator.vendor is "Apple Computer, Inc." only in real Safari/WebKit.
// Chrome DevTools UA emulation does NOT change navigator.vendor, so this
// correctly returns false even when the DevTools UA is set to iOS Safari.
const staticNeedsNativeAudioSuppression = () => {
  if (typeof navigator === "undefined") return false;
  if (navigator.vendor !== "Apple Computer, Inc.") return false;
  return !/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);
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
  resetPerfAccumulators,
  debugVideo,
  debugAudio,
}: UseRetroPreviewMediaParams) {
  const waitForMediaSwitchCooldown = async () => {
    if (!isAndroidRuntime()) {
      return;
    }

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 220);
    });
  };

  const quietAudioOutputImmediately = () => {
    const currentTime = audioContextRef.current?.currentTime;

    if (noiseGainRef.current) {
      if (typeof currentTime === "number") {
        const gain = noiseGainRef.current.gain;
        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + 0.03);
      } else {
        noiseGainRef.current.gain.value = 0;
      }
    }

    if (masterGainRef.current) {
      if (typeof currentTime === "number") {
        const gain = masterGainRef.current.gain;
        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + 0.03);
      } else {
        masterGainRef.current.gain.value = 0;
      }
    }
  };

  const muteNoiseImmediately = () => {
    if (noiseGainRef.current) {
      noiseGainRef.current.gain.value = 0;
    }
  };

  const isAutoplayBlockedError = (error: unknown) => {
    if (error instanceof DOMException) {
      if (error.name === "NotAllowedError" || error.name === "AbortError") {
        return true;
      }
    }

    if (error instanceof Error) {
      return /autoplay|user gesture|user activation|interaction|not allowed/i.test(
        error.message,
      );
    }

    return false;
  };

  const recoverToManualPlayPrompt = (error: unknown) => {
    if (!isAutoplayBlockedError(error)) {
      return false;
    }

    finishLoading();
    setPreviewError("");
    setNeedsUserPlay(true);
    syncVideoState();
    safeRender();
    return true;
  };

  const releaseDetachedMedia = (
    media: HTMLMediaElement,
    url?: string,
    stopStream = true,
  ) => {
    quietAudioOutputImmediately();
    media.muted = true;
    media.volume = 0;
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
    media.addEventListener("pause", quietAudioOutputImmediately);
    media.addEventListener("abort", quietAudioOutputImmediately);
    media.addEventListener("emptied", quietAudioOutputImmediately);
    media.addEventListener("loadstart", quietAudioOutputImmediately);
    media.addEventListener("seeking", quietAudioOutputImmediately);
    media.addEventListener("stalled", quietAudioOutputImmediately);
    media.addEventListener("suspend", () => {
      // Safari fires "suspend" when the browser stops buffering, which also
      // happens when the window is covered or the tab is hidden. Silencing audio
      // in that case breaks playback permanently until recovery. Only quiet on
      // suspend when the document is still visible (network stall / buffer full).
      if (typeof document === "undefined" || document.visibilityState === "visible") {
        quietAudioOutputImmediately();
      }
    });
    media.addEventListener("waiting", quietAudioOutputImmediately);
    media.addEventListener("volumechange", syncVideoState);
    media.addEventListener("timeupdate", syncVideoState);
    media.addEventListener("durationchange", syncVideoState);
    media.addEventListener("seeked", syncVideoState);
    media.addEventListener("ended", syncVideoState);
    media.addEventListener("ratechange", syncVideoState);

    // The "resize" event fires on <video> when the video's intrinsic size
    // changes — this happens for capture streams when the captured window is
    // resized. Without this, sourceDimensions stays stale and the canvas keeps
    // rendering at the old aspect ratio, squishing the content vertically.
    if (media instanceof HTMLVideoElement) {
      media.addEventListener("resize", () => {
        const w = media.videoWidth;
        const h = media.videoHeight;
        if (w > 0 && h > 0) {
          setSourceDimensions({ width: w, height: h });
          scheduleRefreshLayout();
        }
      });
    }
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

    // During a loop transition Safari may briefly fire "pause" even though the
    // video is about to restart. Treat ended+loop as still-playing so that
    // blur/visibilitychange captures the correct intended state.
    const isLoopTransition =
      mediaRef.current.paused &&
      mediaRef.current.ended &&
      mediaRef.current.loop;
    const effectivelyPlaying = !mediaRef.current.paused || isLoopTransition;
    isPlayingRef.current = effectivelyPlaying;
    setIsPlaying(effectivelyPlaying);
    if (effectivelyPlaying) {
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
    quietAudioOutputImmediately();
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
      mediaRef.current.muted = true;
      mediaRef.current.volume = 0;
      mediaRef.current.pause();
    }

    quietAudioOutputImmediately();

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
      // Skip audio context setup when the tab is hidden and AudioContext is already
      // suspended. Calling resume() or createMediaElementSource() while hidden can
      // corrupt the audio graph (MediaElementSourceNode is one-per-element and the
      // old context still claims it). The visibilitychange:visible handler will
      // call recoverAudioOutput when the tab returns.
      const isHiddenWithSuspendedContext =
        typeof document !== "undefined" &&
        document.visibilityState === "hidden" &&
        audioContextRef.current?.state === "suspended";
      if (!isHiddenWithSuspendedContext) {
        await ensureAudioContext();
      }
      if (staticNeedsNativeAudioSuppression() && mediaSourceRef.current) {
        mediaRef.current.muted = false;
        mediaRef.current.volume = 0;
      } else {
        mediaRef.current.muted = isMutedRef.current;
        mediaRef.current.volume = isMutedRef.current ? 0 : volumeRef.current;
      }
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
        stereoWidthAmount,
        smallSpeakerRoomAmount,
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
      if (isAutoplayBlockedError(error)) {
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
        await waitForMediaSwitchCooldown();
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

      const isAutoplayBlocked = isAutoplayBlockedError(error);
      if (isAutoplayBlocked) {
        recoverToManualPlayPrompt(error);
        return;
      }

      cleanupPreview();
      setPreviewError(
        error instanceof Error
          ? error.message
          : "動画プレビューに失敗しました。",
      );
      setNeedsUserPlay(false);
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
      await waitForMediaSwitchCooldown();
      await playVideoWithAudio();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      if (recoverToManualPlayPrompt(error)) {
        return;
      }

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

      await waitForMediaSwitchCooldown();
      await playVideoWithAudio();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      if (recoverToManualPlayPrompt(error)) {
        return;
      }

      cleanupPreview();
      setPreviewError(error instanceof Error ? error.message : String(error));
    }
  };

  const previewUrl = async (url: string, kind: "video" | "image" | "audio" = "video") => {
    let requestId = 0;
    const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsedMs = () =>
      Math.round(
        ((typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt) * 10,
      ) / 10;

    try {
      debugVideo("startup:previewUrl:start", {
        url,
        kind,
      });
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
      debugVideo("startup:previewUrl:renderer-ready", {
        kind,
        elapsedMs: elapsedMs(),
      });

      if (kind === "video") {
        const media = document.createElement("video");
        media.src = url;
        applyMediaSettings(media);
        attachMediaEventListeners(media);
        await waitForVideoFrame(media);
        debugVideo("startup:previewUrl:video-ready", {
          elapsedMs: elapsedMs(),
          readyState: media.readyState,
          videoWidth: media.videoWidth,
          videoHeight: media.videoHeight,
        });

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
        debugVideo("startup:previewUrl:image-ready", {
          elapsedMs: elapsedMs(),
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        });

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
        debugVideo("startup:previewUrl:audio-ready", {
          elapsedMs: elapsedMs(),
          readyState: audio.readyState,
          duration: audio.duration,
        });

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
        await waitForMediaSwitchCooldown();
        await playVideoWithAudio();
      }
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
        debugVideo("startup:previewUrl:done", {
          kind,
          elapsedMs: elapsedMs(),
        });
      }
    } catch (error) {
      debugVideo("startup:previewUrl:error", {
        kind,
        elapsedMs: elapsedMs(),
        error: error instanceof Error ? error.message : String(error),
      });
      if (requestId !== previewRequestIdRef.current) return;

      if (recoverToManualPlayPrompt(error)) {
        return;
      }

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
