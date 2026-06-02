import { useEffect, useRef, useState } from "react";
import { Application, Filter, Sprite, Texture, VideoSource } from "pixi.js";
import {
  MONO_TINTS,
  RETRO_PRESETS,
  paletteModeToUniform,
} from "../retro/config";
import type { RetroFilterState } from "./useRetroFilterState";
import { FILTER_FRAGMENT, FILTER_VERTEX } from "../retro/filterShader";
import { useRetroAudioEngine } from "./useRetroAudioEngine";

let retroPlayerInstanceSeed = 0;

export function usePixiVideoPlayer(
  filterState: RetroFilterState,
  renderResolutionScale = 1,
) {
  const instanceLabelRef = useRef(`player-${(retroPlayerInstanceSeed += 1)}`);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const appRef = useRef<Application | null>(null);
  const spriteRef = useRef<Sprite | null>(null);
  const textureRef = useRef<Texture | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const streamOwnedRef = useRef<boolean>(false);
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const previewElementRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const filterRef = useRef<Filter | null>(null);
  const previewRequestIdRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const previewKindRef = useRef<"video" | "audio" | "image" | "capture" | null>(null);

  const [previewName, setPreviewName] = useState<string>("");
  const [previewError, setPreviewError] = useState<string>("");
  const [isRendererReady, setIsRendererReady] = useState<boolean>(false);
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
  const [viewportRect, setViewportRect] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const debugVideo = (label: string, payload?: Record<string, unknown>) => {
    console.log(
      `[retro-player video][${instanceLabelRef.current}] ${label}`,
      payload ?? {},
    );
  };

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
    noiseSourceRef,
    noiseGainRef,
    noiseLfoRef,
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
  } = audio;

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

  const applyFilterStateTo = (filter: Filter | null) => {
    if (!filter) return;

    filter.resources.pixelUniforms.uniforms.uTargetSize[0] = Math.max(filterState.targetWidth, 1);
    filter.resources.pixelUniforms.uniforms.uTargetSize[1] = Math.max(filterState.targetHeight, 1);
    filter.resources.pixelUniforms.uniforms.uColorLevels = Math.max(filterState.colorLevels, 2);
    filter.resources.pixelUniforms.uniforms.uDitherStrength = filterState.ditherStrength;
    filter.resources.pixelUniforms.uniforms.uPaletteMode = paletteModeToUniform(filterState.paletteMode);
    filter.resources.pixelUniforms.uniforms.uCurvature = filterState.curvature;
    filter.resources.pixelUniforms.uniforms.uScanlineStrength = filterState.scanlineStrength;
    filter.resources.pixelUniforms.uniforms.uScanline2Strength = filterState.scanline2Strength;
    filter.resources.pixelUniforms.uniforms.uVignetteStrength = filterState.vignetteStrength;
    filter.resources.pixelUniforms.uniforms.uGlowStrength = filterState.glowStrength;
    filter.resources.pixelUniforms.uniforms.uPhosphorStrength = filterState.phosphorStrength;
    filter.resources.pixelUniforms.uniforms.uMonoTint[0] = MONO_TINTS[filterState.monoTint].rgb[0];
    filter.resources.pixelUniforms.uniforms.uMonoTint[1] = MONO_TINTS[filterState.monoTint].rgb[1];
    filter.resources.pixelUniforms.uniforms.uMonoTint[2] = MONO_TINTS[filterState.monoTint].rgb[2];
  };

  const applyFilterState = () => {
    applyFilterStateTo(filterRef.current);
  };

  const createRetroFilter = () => {
    const filter = Filter.from({
      gl: {
        vertex: FILTER_VERTEX,
        fragment: FILTER_FRAGMENT,
      },
      resources: {
        pixelUniforms: {
          uTargetSize: {
            value: new Float32Array([
              RETRO_PRESETS.pc98_512.width,
              RETRO_PRESETS.pc98_512.height,
            ]),
            type: "vec2<f32>",
          },
          uColorLevels: { value: RETRO_PRESETS.pc98_512.colors, type: "f32" },
          uDitherStrength: { value: RETRO_PRESETS.pc98_512.dither, type: "f32" },
          uPaletteMode: { value: 2, type: "f32" },
          uCurvature: { value: RETRO_PRESETS.pc98_512.curvature, type: "f32" },
          uScanlineStrength: { value: RETRO_PRESETS.pc98_512.scanline, type: "f32" },
          uScanline2Strength: { value: RETRO_PRESETS.pc98_512.scanline2, type: "f32" },
          uVignetteStrength: { value: RETRO_PRESETS.pc98_512.vignette, type: "f32" },
          uGlowStrength: { value: RETRO_PRESETS.pc98_512.glow, type: "f32" },
          uPhosphorStrength: { value: RETRO_PRESETS.pc98_512.phosphor, type: "f32" },
          uMonoTint: {
            value: new Float32Array(MONO_TINTS.green.rgb),
            type: "vec3<f32>",
          },
          uTime: { value: 0, type: "f32" },
        },
      },
    });

    applyFilterStateTo(filter);

    return filter;
  };

  const resetFilterInstance = () => {
    const previousFilter = filterRef.current;
    const nextFilter = createRetroFilter();

    filterRef.current = nextFilter;
    syncSpriteFilter();
    previousFilter?.destroy();

    return nextFilter;
  };

  const syncSpriteFilter = () => {
    if (!spriteRef.current) return;

    spriteRef.current.filters =
      filterState.isFilterEnabled && filterRef.current ? [filterRef.current] : [];
  };

  const syncTexturePresentation = () => {
    const texture = textureRef.current;
    if (!texture?.source) return;

    texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";
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

  const fitSprite = (
    app: Application | null,
    sprite: Sprite,
    source: HTMLVideoElement | HTMLImageElement,
  ) => {
    if (!app) return;

    const sourceWidth =
      source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
    const sourceHeight =
      source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;

    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const scale = Math.min(
      screenWidth / sourceWidth,
      screenHeight / sourceHeight,
    );
    const integerScale = Math.max(1, Math.floor(scale));
    const appliedScale =
      filterState.isFilterEnabled && scale >= 1 ? integerScale : scale;

    debugVideo("fitSprite", {
      sourceTag: source.tagName,
      sourceWidth,
      sourceHeight,
      screenWidth,
      screenHeight,
      scale,
      appliedScale,
    });

    const nextWidth = sourceWidth * appliedScale;
    const nextHeight = sourceHeight * appliedScale;
    const nextX = (screenWidth - nextWidth) / 2;
    const nextY = (screenHeight - nextHeight) / 2;

    sprite.width = nextWidth;
    sprite.height = nextHeight;
    sprite.x = nextX;
    sprite.y = nextY;

    setViewportRect((current) => {
      const next = {
        width: nextWidth,
        height: nextHeight,
        x: nextX,
        y: nextY,
      };

      if (
        current &&
        current.width === next.width &&
        current.height === next.height &&
        current.x === next.x &&
        current.y === next.y
      ) {
        return current;
      }

      return next;
    });
  };

  const createVideoTexture = (video: HTMLVideoElement) => {
    const source = new VideoSource({
      resource: video,
      autoPlay: false,
    });
    const texture = new Texture({ source });

    source.resource.autoplay = false;
    source.update();

    return texture;
  };

  const fitCurrentSprite = () => {
    if (spriteRef.current && previewElementRef.current) {
      fitSprite(appRef.current, spriteRef.current, previewElementRef.current);
    }
  };

  const refreshLayout = () => {
    const app = appRef.current;
    const host = canvasHostRef.current;
    if (!app || !host) return;

    const nextWidth = Math.max(1, Math.round(host.clientWidth));
    const nextHeight = Math.max(1, Math.round(host.clientHeight));

    debugVideo("refreshLayout", {
      hostWidth: host.clientWidth,
      hostHeight: host.clientHeight,
      nextWidth,
      nextHeight,
      previewKind: previewKindRef.current,
      hasSprite: Boolean(spriteRef.current),
      hasPreviewElement: Boolean(previewElementRef.current),
      isPoweredOn,
    });

    app.renderer.resize(nextWidth, nextHeight);
    fitCurrentSprite();
    app.render();
  };

  const scheduleRefreshLayout = () => {
    if (typeof window === "undefined") {
      refreshLayout();
      return;
    }

    window.requestAnimationFrame(() => {
      refreshLayout();
      window.requestAnimationFrame(() => {
        refreshLayout();
      });
    });

    window.setTimeout(() => {
      refreshLayout();
    }, 120);
  };

  const safeRender = () => {
    const app = appRef.current;

    if (!app) return;
    if (!canvasHostRef.current?.isConnected) return;
    if (!app.canvas?.isConnected) return;

    try {
      app.render();
    } catch (error) {
      debugVideo("safeRender:skipped", {
        message: error instanceof Error ? error.message : String(error),
      });
    }
  };

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
      // Detach the filter before disposing its source texture to avoid
      // Pixi touching a destroyed bind resource during resize / re-render.
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


  const previewFile = async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      setPreviewError("動画、音声、または画像ファイルを選んでください。");
      return;
    }

    powerOn();

    if (!appRef.current || !filterRef.current) {
      setPreviewError("Pixi の初期化がまだ終わっていません。");
      return;
    }

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

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    try {
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
          texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";

          const filter = filterRef.current;
          if (!filter) {
            throw new Error("Pixi filter is not ready.");
          }

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(appRef.current, sprite, media);
          appRef.current.stage.removeChildren();
          appRef.current.stage.addChild(sprite);
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
            screenWidth: appRef.current?.screen.width ?? null,
            screenHeight: appRef.current?.screen.height ?? null,
          });
          scheduleRefreshLayout();
        } else {
          appRef.current.stage.removeChildren();
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
      texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";

      const filter = filterRef.current;
      if (!filter) {
        throw new Error("Pixi filter is not ready.");
      }

      const sprite = new Sprite(texture);
      sprite.filters = filterState.isFilterEnabled ? [filter] : [];

      fitSprite(appRef.current, sprite, image);
      appRef.current.stage.removeChildren();
      appRef.current.stage.addChild(sprite);
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
        screenWidth: appRef.current?.screen.width ?? null,
        screenHeight: appRef.current?.screen.height ?? null,
      });
      scheduleRefreshLayout();
      syncVideoState();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) {
        URL.revokeObjectURL(url);
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
    texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";

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

  const startDisplayCapture = async () => {
    powerOn();

    if (!navigator.mediaDevices?.getDisplayMedia) {
      setPreviewError("このブラウザでは画面キャプチャーに対応していません。");
      return;
    }

    if (!appRef.current || !filterRef.current) {
      setPreviewError("Pixi の初期化がまだ終わっていません。");
      return;
    }

    cleanupPreview();
    const requestId = previewRequestIdRef.current;
    setPreviewError("");
    setPreviewName("Display Capture");
    beginLoading("Preparing display capture...");

    try {
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

  useEffect(() => {
    let cancelled = false;

    const setupPixi = async () => {
      if (!canvasHostRef.current || appRef.current) return;

      const app = new Application();
      await app.init({
        resizeTo: canvasHostRef.current,
        background: "#020617",
        antialias: true,
        preference: "webgl",
        autoDensity: true,
        resolution: Math.max(1, renderResolutionScale),
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      canvasHostRef.current.appendChild(app.canvas);

      const filter = createRetroFilter();

      app.ticker.add((ticker) => {
        const shouldAnimate =
          isPlayingRef.current || previewKindRef.current === "image";

        if (!shouldAnimate) {
          return;
        }

        const activeFilter = filterRef.current;
        if (!activeFilter) {
          return;
        }

        activeFilter.resources.pixelUniforms.uniforms.uTime += 0.016 * ticker.deltaTime;
      });
      app.renderer.on("resize", fitCurrentSprite);
      appRef.current = app;
      filterRef.current = filter;
      setIsRendererReady(true);
      if (!isPoweredOn) {
        app.ticker.stop();
      }
      applyFilterState();
      refreshLayout();
    };

    void setupPixi();

    return () => {
      cancelled = true;
      appRef.current?.renderer.off("resize", fitCurrentSprite);
      cleanupPreview();
      noiseSourceRef.current?.stop();
      noiseLfoRef.current?.stop();
      void audioContextRef.current?.close();
      appRef.current?.destroy(true);
      filterRef.current?.destroy();
      filterRef.current = null;
      appRef.current = null;
      setIsRendererReady(false);
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
    previewStream: async (
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

        if (!appRef.current || !filterRef.current) {
          throw new Error("Pixi の初期化がまだ終わっていません。");
        }

        setPreviewError("");
        setPreviewName(name);
        beginLoading(kind === "video" ? "Loading stream preview..." : "Loading stream audio...");

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

          appRef.current.stage.removeChildren();
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
    },
    previewUrl: async (url: string, kind: "video" | "image" | "audio" = "video") => {
      let requestId = 0;

      try {
        powerOn();
        cleanupPreview();
        resetFilterInstance();
        requestId = previewRequestIdRef.current;

        if (!appRef.current || !filterRef.current) {
          throw new Error("Pixi の初期化がまだ終わっていません。");
        }

        setPreviewError("");
        setPreviewName(url);
        beginLoading(
          kind === "video"
            ? "Loading video preview..."
            : kind === "image"
              ? "Loading image preview..."
              : "Loading audio preview...",
        );

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
          texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";

          const filter = filterRef.current;
          if (!filter) throw new Error("Pixi filter is not ready.");

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(appRef.current, sprite, media);
          appRef.current.stage.removeChildren();
          appRef.current.stage.addChild(sprite);
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
            screenWidth: appRef.current?.screen.width ?? null,
            screenHeight: appRef.current?.screen.height ?? null,
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
          texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";

          const filter = filterRef.current;
          if (!filter) throw new Error("Pixi filter is not ready.");

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(appRef.current, sprite, image);
          appRef.current.stage.removeChildren();
          appRef.current.stage.addChild(sprite);
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
          scheduleRefreshLayout();
          syncVideoState();
        } else {
          // audio-only
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

          appRef.current.stage.removeChildren();
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
    },
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
