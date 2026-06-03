import { Sprite, Texture, VideoSource } from "pixi.js";
import type { RetroFilterState } from "./useRetroFilterState";

type PreviewKind = "video" | "audio" | "image" | "capture" | null;
type CurrentRef<T> = { current: T };

type UseRetroPreviewMediaParams = {
  filterState: RetroFilterState;
  appRef: CurrentRef<any>;
  spriteRef: CurrentRef<Sprite | null>;
  textureRef: CurrentRef<Texture | null>;
  previewElementRef: CurrentRef<HTMLImageElement | HTMLMediaElement | null>;
  filterRef: CurrentRef<any>;
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
  createVideoTexture: (video: HTMLVideoElement) => Texture<VideoSource>;
  fitSprite: (app: any, sprite: Sprite, source: HTMLVideoElement | HTMLImageElement) => void;
  refreshLayout: () => void;
  scheduleRefreshLayout: () => void;
  safeRender: () => void;
  resetFilterInstance: () => void;
  initPixi: () => Promise<void>;
  debugVideo: (label: string, payload?: Record<string, unknown>) => void;
  debugAudio: (label: string, payload?: Record<string, unknown>) => void;
};

export function useRetroPreviewMedia({
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
}: UseRetroPreviewMediaParams) {
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

    if (url) {
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

  const syncVideoState = () => {
    if (!mediaRef.current) {
      debugVideo("syncVideoState:no-media", {
        previewKind: previewKindRef.current,
        hasSprite: Boolean(spriteRef.current),
        hasPreviewElement: Boolean(previewElementRef.current),
      });
      isPlayingRef.current = false;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      updateAudioNodes();
      return;
    }

    isPlayingRef.current = !mediaRef.current.paused;
    debugVideo("syncVideoState", {
      previewKind: previewKindRef.current,
      paused: mediaRef.current.paused,
      currentTime: mediaRef.current.currentTime,
      duration: mediaRef.current.duration || 0,
      readyState: mediaRef.current.readyState,
      hasSprite: Boolean(spriteRef.current),
      hasPreviewElement: Boolean(previewElementRef.current),
    });
    setIsPlaying(!mediaRef.current.paused);
    if (!mediaRef.current.paused) {
      finishLoading();
    }
    setCurrentTime(mediaRef.current.currentTime);
    setDuration(mediaRef.current.duration || 0);
    setPlaybackRate(mediaRef.current.playbackRate || 1);
    setIsLooping(mediaRef.current.loop);
    updateAudioNodes();
  };

  const cleanupPreview = () => {
    debugVideo("cleanupPreview:start", {
      previewKind: previewKindRef.current,
      hasSprite: Boolean(spriteRef.current),
      hasTexture: Boolean(textureRef.current),
      hasMedia: Boolean(mediaRef.current),
      hasPreviewElement: Boolean(previewElementRef.current),
    });
    previewRequestIdRef.current += 1;
    finishLoading();
    const app = appRef.current;
    const currentSprite = spriteRef.current;
    const currentTexture = textureRef.current;
    const currentMedia = mediaRef.current;
    const currentStream = streamRef.current;
    const shouldStopCurrentStream = streamOwnedRef.current;

    if (currentSprite) {
      currentSprite.filters = [];
      app?.stage.removeChild(currentSprite);
    }

    spriteRef.current = null;
    textureRef.current = null;
    mediaRef.current = null;
    previewElementRef.current = null;
    streamRef.current = null;
    streamOwnedRef.current = false;

    if (currentTexture?.source instanceof VideoSource) {
      currentTexture.source.autoUpdate = false;
    }
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

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const finalizeDisposal = () => {
      debugVideo("cleanupPreview:finalize", {
        hadSprite: Boolean(currentSprite),
        hadTexture: Boolean(currentTexture),
        hadMedia: Boolean(currentMedia),
      });
      currentSprite?.destroy();
      currentTexture?.destroy(true);

      if (currentMedia) {
        releaseDetachedMedia(currentMedia, undefined, shouldStopCurrentStream);
      } else if (shouldStopCurrentStream) {
        currentStream?.getTracks().forEach((track) => track.stop());
      }
    };

    if (typeof window === "undefined") {
      finalizeDisposal();
      return;
    }

    window.requestAnimationFrame(() => {
      finalizeDisposal();
    });
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

  const playVideoWithAudio = async () => {
    if (!mediaRef.current) return;

    try {
      await ensureAudioContext();
      mediaRef.current.muted = isMutedRef.current;
      mediaRef.current.volume = isMutedRef.current ? 0 : volumeRef.current;
      await mediaRef.current.play();
      setPreviewError("");
      setNeedsUserPlay(false);
      debugAudio("playVideoWithAudio", {
        audioContextState: audioContextRef.current?.state,
        currentTime: mediaRef.current.currentTime,
        isAudioFxEnabled,
        lofiAmount,
        isMuted,
        volume,
      });
      updateAudioNodes();
      syncVideoState();
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

  const ensurePixiReady = async () => {
    await initPixi();

    const app = appRef.current;
    const filter = filterRef.current;

    if (!app || !filter) {
      throw new Error("Pixi の初期化がまだ終わっていません。");
    }

    return { app, filter };
  };

  const attachVideoPreview = async (
    video: HTMLVideoElement,
    kind: "video" | "capture",
  ) => {
    const filter = filterRef.current;
    if (!filter) {
      throw new Error("Pixi filter is not ready.");
    }

    const texture = createVideoTexture(video);
    texture.source.update();
    texture.source.scaleMode = "linear";

    const sprite = new Sprite(texture);
    sprite.filters = filterState.isFilterEnabled ? [filter] : [];

    fitSprite(appRef.current, sprite, video);
    appRef.current?.stage.removeChildren();
    appRef.current?.stage.addChild(sprite);
    window.requestAnimationFrame(safeRender);

    textureRef.current = texture;
    spriteRef.current = sprite;
    mediaRef.current = video;
    previewElementRef.current = video;
    setPreviewKindState(kind);
    setSourceDimensions({
      width: video.videoWidth,
      height: video.videoHeight,
    });
    debugVideo("attachVideoPreview", {
      kind,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      screenWidth: appRef.current?.screen.width ?? null,
      screenHeight: appRef.current?.screen.height ?? null,
    });
    scheduleRefreshLayout();
    syncVideoState();
  };

  const powerOn = () => {
    setIsPoweredOn(true);
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
    debugVideo("previewFile:start", {
      name: file.name,
      type: file.type,
      isVideo,
      isAudio,
      isImage,
      requestId,
    });
    setPreviewError("");
    setPreviewName(file.name);
    beginLoading(
      isVideo ? "Loading video preview..." : isAudio ? "Loading audio preview..." : "Loading image preview...",
    );

    let url: string | null = null;

    try {
      const { app, filter } = await ensurePixiReady();
      url = URL.createObjectURL(file);
      objectUrlRef.current = url;

      if (isVideo || isAudio) {
        const media = isVideo
          ? document.createElement("video")
          : document.createElement("audio");
        media.src = url;
        media.crossOrigin = "anonymous";
        media.loop = isLoopingRef.current;
        media.muted = isMutedRef.current;
        media.volume = isMutedRef.current ? 0 : volumeRef.current;
        media.playbackRate = playbackRateRef.current;
        media.autoplay = false;
        media.preload = "auto";
        media.addEventListener("play", syncVideoState);
        media.addEventListener("pause", syncVideoState);
        media.addEventListener("volumechange", syncVideoState);
        media.addEventListener("timeupdate", syncVideoState);
        media.addEventListener("durationchange", syncVideoState);
        media.addEventListener("seeked", syncVideoState);
        media.addEventListener("ended", syncVideoState);
        media.addEventListener("ratechange", syncVideoState);

        if (media instanceof HTMLVideoElement) {
          media.playsInline = true;
        }

        if (media instanceof HTMLVideoElement) {
          await waitForVideoFrame(media);
        } else {
          await waitForAudioReady(media);
        }

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, url);
          return;
        }

        if (media instanceof HTMLVideoElement) {
          const texture = createVideoTexture(media);
          texture.source.update();
          texture.source.scaleMode = "linear";

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(app, sprite, media);
          app.stage.removeChildren();
          app.stage.addChild(sprite);
          window.requestAnimationFrame(safeRender);

          textureRef.current = texture;
          spriteRef.current = sprite;
          previewElementRef.current = media;
          setPreviewKindState("video");
          setSourceDimensions({
            width: media.videoWidth,
            height: media.videoHeight,
          });
          debugVideo("previewFile:video-attached", {
            name: file.name,
            requestId,
            videoWidth: media.videoWidth,
            videoHeight: media.videoHeight,
            screenWidth: app.screen.width ?? null,
            screenHeight: app.screen.height ?? null,
          });
          refreshLayout();
          scheduleRefreshLayout();
        } else {
          app.stage.removeChildren();
          spriteRef.current = null;
          textureRef.current = null;
          previewElementRef.current = null;
          setPreviewKindState("audio");
          setSourceDimensions(null);
        }

        mediaRef.current = media;
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
        URL.revokeObjectURL(url);
        return;
      }

      const texture = Texture.from(image);
      texture.source.update();
      texture.source.scaleMode = "linear";

      const sprite = new Sprite(texture);
      sprite.filters = filterState.isFilterEnabled ? [filter] : [];

      fitSprite(app, sprite, image);
      app.stage.removeChildren();
      app.stage.addChild(sprite);
      window.requestAnimationFrame(safeRender);

      textureRef.current = texture;
      spriteRef.current = sprite;
      mediaRef.current = null;
      previewElementRef.current = image;
      setPreviewKindState("image");
      setSourceDimensions({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
      debugVideo("previewFile:image-attached", {
        name: file.name,
        requestId,
        imageWidth: image.naturalWidth,
        imageHeight: image.naturalHeight,
        screenWidth: app.screen.width ?? null,
        screenHeight: app.screen.height ?? null,
      });
      refreshLayout();
      scheduleRefreshLayout();
      syncVideoState();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) {
        if (url) {
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
      if (!appRef.current || !filterRef.current) {
        setPreviewError("Pixi の初期化がまだ終わっていません。");
        return;
      }

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
      video.loop = isLoopingRef.current;
      video.muted = isMutedRef.current;
      video.volume = isMutedRef.current ? 0 : volumeRef.current;
      video.playbackRate = playbackRateRef.current;
      video.playsInline = true;
      video.autoplay = false;
      video.addEventListener("play", syncVideoState);
      video.addEventListener("pause", syncVideoState);
      video.addEventListener("volumechange", syncVideoState);
      video.addEventListener("timeupdate", syncVideoState);
      video.addEventListener("durationchange", syncVideoState);
      video.addEventListener("seeked", syncVideoState);
      video.addEventListener("ended", syncVideoState);
      video.addEventListener("ratechange", syncVideoState);

      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        stopDisplayCapture();
      });

      await waitForVideoFrame(video);
      await video.play();

      streamRef.current = stream;
      streamOwnedRef.current = true;
      await attachVideoPreview(video, "capture");
      await connectMediaAudio(video);
      setNeedsUserPlay(false);
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) {
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
      const { app } = await ensurePixiReady();

      if (kind === "video") {
        const media = document.createElement("video");
        media.srcObject = stream;
        media.crossOrigin = "anonymous";
        media.loop = isLoopingRef.current;
        media.muted = isMutedRef.current;
        media.volume = isMutedRef.current ? 0 : volumeRef.current;
        media.playbackRate = playbackRateRef.current;
        media.playsInline = true;
        media.autoplay = false;
        media.preload = "auto";
        media.addEventListener("play", syncVideoState);
        media.addEventListener("pause", syncVideoState);
        media.addEventListener("volumechange", syncVideoState);
        media.addEventListener("timeupdate", syncVideoState);
        media.addEventListener("durationchange", syncVideoState);
        media.addEventListener("seeked", syncVideoState);
        media.addEventListener("ended", syncVideoState);
        media.addEventListener("ratechange", syncVideoState);

        await waitForVideoFrame(media);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, undefined, false);
          return;
        }

        streamRef.current = stream;
        streamOwnedRef.current = false;
        await attachVideoPreview(media, "capture");
        await connectMediaAudio(media);
      } else {
        const media = document.createElement("audio");
        media.srcObject = stream;
        media.crossOrigin = "anonymous";
        media.loop = isLoopingRef.current;
        media.muted = isMutedRef.current;
        media.volume = isMutedRef.current ? 0 : volumeRef.current;
        media.playbackRate = playbackRateRef.current;
        media.preload = "auto";
        media.addEventListener("play", syncVideoState);
        media.addEventListener("pause", syncVideoState);
        media.addEventListener("volumechange", syncVideoState);
        media.addEventListener("timeupdate", syncVideoState);
        media.addEventListener("durationchange", syncVideoState);
        media.addEventListener("seeked", syncVideoState);
        media.addEventListener("ended", syncVideoState);
        media.addEventListener("ratechange", syncVideoState);
        await waitForAudioReady(media);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, undefined, false);
          return;
        }

        app.stage.removeChildren();
        spriteRef.current = null;
        textureRef.current = null;
        previewElementRef.current = null;
        setPreviewKindState("audio");
        setSourceDimensions(null);

        streamRef.current = stream;
        streamOwnedRef.current = false;
        mediaRef.current = media;
        await connectMediaAudio(media);
        syncVideoState();
      }

      if (requestId !== previewRequestIdRef.current) {
        return;
      }

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
      const { app, filter } = await ensurePixiReady();

      if (kind === "video") {
        const media = document.createElement("video");
        media.src = url;
        media.crossOrigin = "anonymous";
        media.loop = isLoopingRef.current;
        media.muted = isMutedRef.current;
        media.volume = isMutedRef.current ? 0 : volumeRef.current;
        media.playbackRate = playbackRateRef.current;
        media.playsInline = true;
        media.autoplay = false;
        media.preload = "auto";
        media.addEventListener("play", syncVideoState);
        media.addEventListener("pause", syncVideoState);
        media.addEventListener("volumechange", syncVideoState);
        media.addEventListener("timeupdate", syncVideoState);
        media.addEventListener("durationchange", syncVideoState);
        media.addEventListener("seeked", syncVideoState);
        media.addEventListener("ended", syncVideoState);
        media.addEventListener("ratechange", syncVideoState);

        await waitForVideoFrame(media);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, url);
          return;
        }

        const texture = createVideoTexture(media as HTMLVideoElement);
        texture.source.update();
        texture.source.scaleMode = "linear";

        const sprite = new Sprite(texture);
        sprite.filters = filterState.isFilterEnabled ? [filter] : [];

        fitSprite(app, sprite, media);
        app.stage.removeChildren();
        app.stage.addChild(sprite);
        window.requestAnimationFrame(safeRender);

        textureRef.current = texture;
        spriteRef.current = sprite;
        mediaRef.current = media;
        previewElementRef.current = media;
        setPreviewKindState("video");
        setSourceDimensions({
          width: media.videoWidth,
          height: media.videoHeight,
        });
        debugVideo("previewUrl:video-attached", {
          url,
          requestId,
          videoWidth: media.videoWidth,
          videoHeight: media.videoHeight,
          screenWidth: app.screen.width ?? null,
          screenHeight: app.screen.height ?? null,
        });
        scheduleRefreshLayout();
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

        const texture = Texture.from(image as HTMLImageElement);
        texture.source.update();
        texture.source.scaleMode = "linear";

        const sprite = new Sprite(texture);
        sprite.filters = filterState.isFilterEnabled ? [filter] : [];

        fitSprite(app, sprite, image);
        app.stage.removeChildren();
        app.stage.addChild(sprite);
        window.requestAnimationFrame(safeRender);

        textureRef.current = texture;
        spriteRef.current = sprite;
        mediaRef.current = null;
        previewElementRef.current = image;
        setPreviewKindState("image");
        setSourceDimensions({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        refreshLayout();
        scheduleRefreshLayout();
        syncVideoState();
      } else {
        const audio = document.createElement("audio");
        audio.src = url;
        audio.crossOrigin = "anonymous";
        audio.loop = isLoopingRef.current;
        audio.muted = isMutedRef.current;
        audio.volume = isMutedRef.current ? 0 : volumeRef.current;
        audio.playbackRate = playbackRateRef.current;
        audio.preload = "auto";
        audio.addEventListener("play", syncVideoState);
        audio.addEventListener("pause", syncVideoState);
        audio.addEventListener("volumechange", syncVideoState);
        audio.addEventListener("timeupdate", syncVideoState);
        audio.addEventListener("durationchange", syncVideoState);
        audio.addEventListener("seeked", syncVideoState);
        audio.addEventListener("ended", syncVideoState);
        audio.addEventListener("ratechange", syncVideoState);
        await waitForAudioReady(audio);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(audio, url);
          return;
        }

        app.stage.removeChildren();
        spriteRef.current = null;
        textureRef.current = null;
        previewElementRef.current = null;
        setPreviewKindState("audio");
        setSourceDimensions(null);

        mediaRef.current = audio;
        await connectMediaAudio(audio);
        syncVideoState();
      }

      if (requestId !== previewRequestIdRef.current) {
        return;
      }

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
    ensurePixiReady,
  };
}
