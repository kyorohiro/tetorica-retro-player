import { useEffect, useRef, useState } from "react";
import { Application, Filter, Sprite, Texture, VideoSource } from "pixi.js";
import {
  MONO_TINTS,
  RETRO_PRESETS,
  paletteModeToUniform,
} from "../retro/config";
import type { RetroFilterState } from "./useRetroFilterState";
import { FILTER_FRAGMENT, FILTER_VERTEX } from "../retro/filterShader";

export function usePixiVideoPlayer(filterState: RetroFilterState) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const appRef = useRef<Application | null>(null);
  const spriteRef = useRef<Sprite | null>(null);
  const textureRef = useRef<Texture | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewElementRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const filterRef = useRef<Filter | null>(null);
  const previewRequestIdRef = useRef<number>(0);

  const [previewName, setPreviewName] = useState<string>("");
  const [previewError, setPreviewError] = useState<string>("");
  const [needsUserPlay, setNeedsUserPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [previewKind, setPreviewKind] = useState<"video" | "image" | "capture" | null>(null);

  const applyFilterStateTo = (filter: Filter | null) => {
    if (!filter) return;

    filter.resources.pixelUniforms.uniforms.uTargetSize[0] = Math.max(filterState.targetWidth, 1);
    filter.resources.pixelUniforms.uniforms.uTargetSize[1] = Math.max(filterState.targetHeight, 1);
    filter.resources.pixelUniforms.uniforms.uColorLevels = Math.max(filterState.colorLevels, 2);
    filter.resources.pixelUniforms.uniforms.uDitherStrength = filterState.ditherStrength;
    filter.resources.pixelUniforms.uniforms.uPaletteMode = paletteModeToUniform(filterState.paletteMode);
    filter.resources.pixelUniforms.uniforms.uScanlineStrength = filterState.scanlineStrength;
    filter.resources.pixelUniforms.uniforms.uVignetteStrength = filterState.vignetteStrength;
    filter.resources.pixelUniforms.uniforms.uPhosphorStrength = filterState.phosphorStrength;
    filter.resources.pixelUniforms.uniforms.uMonoTint[0] = MONO_TINTS[filterState.monoTint].rgb[0];
    filter.resources.pixelUniforms.uniforms.uMonoTint[1] = MONO_TINTS[filterState.monoTint].rgb[1];
    filter.resources.pixelUniforms.uniforms.uMonoTint[2] = MONO_TINTS[filterState.monoTint].rgb[2];
  };

  const applyFilterState = () => {
    applyFilterStateTo(filterRef.current);
  };

  const releaseDetachedVideo = (video: HTMLVideoElement, url?: string) => {
    video.pause();
    if (video.srcObject instanceof MediaStream) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
    video.src = "";
    video.load();

    if (url) {
      URL.revokeObjectURL(url);
    }
  };

  const waitForVideoFrame = (video: HTMLVideoElement) =>
    new Promise<void>((resolve, reject) => {
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
        reject(new Error("動画の読み込みに失敗しました。"));
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
    const appliedScale = scale >= 1 ? integerScale : scale;

    sprite.width = sourceWidth * appliedScale;
    sprite.height = sourceHeight * appliedScale;
    sprite.x = (screenWidth - sprite.width) / 2;
    sprite.y = (screenHeight - sprite.height) / 2;
  };

  const fitCurrentSprite = () => {
    if (spriteRef.current && previewElementRef.current) {
      fitSprite(appRef.current, spriteRef.current, previewElementRef.current);
    }
  };

  const syncVideoState = () => {
    if (!videoRef.current) {
      setIsPlaying(false);
      setIsMuted(false);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    setIsPlaying(!videoRef.current.paused);
    setIsMuted(videoRef.current.muted || videoRef.current.volume === 0);
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
    setPlaybackRate(videoRef.current.playbackRate || 1);
    setVolume(videoRef.current.volume);
    setIsLooping(videoRef.current.loop);
  };

  const cleanupPreview = () => {
    previewRequestIdRef.current += 1;
    appRef.current?.stage.removeChildren();
    spriteRef.current?.destroy();
    spriteRef.current = null;

    const currentTexture = textureRef.current;

    if (currentTexture?.source instanceof VideoSource) {
      currentTexture.source.autoUpdate = false;
    }

    currentTexture?.destroy(true);
    textureRef.current = null;
    videoRef.current = null;
    previewElementRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    setNeedsUserPlay(false);
    setIsPlaying(false);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    setVolume(1);
    setIsLooping(true);
    setPreviewKind(null);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const playVideoWithAudio = async () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.muted = false;
      videoRef.current.volume = Math.max(videoRef.current.volume, 1);
      await videoRef.current.play();
      setPreviewError("");
      setNeedsUserPlay(false);
      syncVideoState();
    } catch (error) {
      setNeedsUserPlay(
        error instanceof DOMException && error.name === "NotAllowedError",
      );
      setPreviewError(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "音付き再生は自動開始できませんでした。下の Play ボタンを押してください。"
          : error instanceof Error
            ? error.message
            : "音声付き再生を開始できませんでした。",
      );
    }
  };

  const togglePlayback = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await playVideoWithAudio();
      return;
    }

    videoRef.current.pause();
    syncVideoState();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    if (!videoRef.current.muted && videoRef.current.volume === 0) {
      videoRef.current.volume = 1;
    }
    syncVideoState();
  };

  const seekTo = (nextTime: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const stepFrame = (direction: -1 | 1) => {
    if (!videoRef.current) return;

    const frameTime = 1 / 30;
    const nextTime = Math.max(
      0,
      Math.min(
        videoRef.current.currentTime + frameTime * direction,
        videoRef.current.duration || videoRef.current.currentTime + frameTime,
      ),
    );

    videoRef.current.pause();
    videoRef.current.currentTime = nextTime;
    syncVideoState();
  };

  const changePlaybackRate = (nextRate: number) => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const changeVolume = (nextVolume: number) => {
    if (!videoRef.current) return;

    videoRef.current.volume = nextVolume;
    videoRef.current.muted = nextVolume === 0;
    setVolume(nextVolume);
    syncVideoState();
  };

  const toggleLoop = () => {
    if (!videoRef.current) return;

    videoRef.current.loop = !videoRef.current.loop;
    setIsLooping(videoRef.current.loop);
  };

  const previewFile = async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setPreviewError("動画または画像ファイルを選んでください。");
      return;
    }

    if (!appRef.current || !filterRef.current) {
      setPreviewError("Pixi の初期化がまだ終わっていません。");
      return;
    }

    cleanupPreview();
    const requestId = previewRequestIdRef.current;
    setPreviewError("");
    setPreviewName(file.name);

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    try {
      if (isVideo) {
        const video = document.createElement("video");
        video.src = url;
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = false;
        video.volume = 1;
        video.playsInline = true;
        video.autoplay = false;
        video.preload = "auto";
        video.addEventListener("play", syncVideoState);
        video.addEventListener("pause", syncVideoState);
        video.addEventListener("volumechange", syncVideoState);
        video.addEventListener("timeupdate", syncVideoState);
        video.addEventListener("durationchange", syncVideoState);
        video.addEventListener("seeked", syncVideoState);
        video.addEventListener("ended", syncVideoState);
        video.addEventListener("ratechange", syncVideoState);

        await waitForVideoFrame(video);

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedVideo(video, url);
          return;
        }

      const texture = Texture.from(video);
      texture.source.update();
      texture.source.scaleMode = "nearest";

      const filter = filterRef.current;
      if (!filter) {
        throw new Error("Pixi filter is not ready.");
      }

      const sprite = new Sprite(texture);
      sprite.filters = [filter];

        fitSprite(appRef.current, sprite, video);
        appRef.current.stage.removeChildren();
        appRef.current.stage.addChild(sprite);

        textureRef.current = texture;
        spriteRef.current = sprite;
        videoRef.current = video;
        previewElementRef.current = video;
        setPreviewKind("video");
        syncVideoState();

        await playVideoWithAudio();
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
      texture.source.scaleMode = "nearest";

      const filter = filterRef.current;
      if (!filter) {
        throw new Error("Pixi filter is not ready.");
      }

      const sprite = new Sprite(texture);
      sprite.filters = [filter];

      fitSprite(appRef.current, sprite, image);
      appRef.current.stage.removeChildren();
      appRef.current.stage.addChild(sprite);

      textureRef.current = texture;
      spriteRef.current = sprite;
      videoRef.current = null;
      previewElementRef.current = image;
      setPreviewKind("image");
      syncVideoState();
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

    const texture = Texture.from(video);
    texture.source.update();
    texture.source.scaleMode = "nearest";

    const sprite = new Sprite(texture);
    sprite.filters = [filter];

    fitSprite(appRef.current, sprite, video);
    appRef.current?.stage.removeChildren();
    appRef.current?.stage.addChild(sprite);

    textureRef.current = texture;
    spriteRef.current = sprite;
    videoRef.current = video;
    previewElementRef.current = video;
    setPreviewKind(kind);
    syncVideoState();
  };

  const startDisplayCapture = async () => {
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
      video.loop = false;
      video.muted = true;
      video.volume = 1;
      video.playsInline = true;
      video.autoplay = true;
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
      await attachVideoPreview(video, "capture");
      setNeedsUserPlay(false);
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
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      canvasHostRef.current.appendChild(app.canvas);

      const filter = Filter.from({
        gl: {
          vertex: FILTER_VERTEX,
          fragment: FILTER_FRAGMENT,
        },
        resources: {
          pixelUniforms: {
            uTargetSize: {
              value: new Float32Array([
                RETRO_PRESETS.pc98.width,
                RETRO_PRESETS.pc98.height,
              ]),
              type: "vec2<f32>",
            },
            uColorLevels: { value: RETRO_PRESETS.pc98.colors, type: "f32" },
            uDitherStrength: { value: RETRO_PRESETS.pc98.dither, type: "f32" },
            uPaletteMode: { value: 1, type: "f32" },
            uScanlineStrength: { value: RETRO_PRESETS.pc98.scanline, type: "f32" },
            uVignetteStrength: { value: RETRO_PRESETS.pc98.vignette, type: "f32" },
            uPhosphorStrength: { value: RETRO_PRESETS.pc98.phosphor, type: "f32" },
            uMonoTint: {
              value: new Float32Array(MONO_TINTS.green.rgb),
              type: "vec3<f32>",
            },
          },
        },
      });

      app.renderer.on("resize", fitCurrentSprite);
      appRef.current = app;
      filterRef.current = filter;
      applyFilterState();
    };

    void setupPixi();

    return () => {
      cancelled = true;
      cleanupPreview();
      filterRef.current?.destroy();
      appRef.current?.destroy(true);
      filterRef.current = null;
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    applyFilterState();
  }, [
    filterState.colorLevels,
    filterState.ditherStrength,
    filterState.monoTint,
    filterState.paletteMode,
    filterState.phosphorStrength,
    filterState.scanlineStrength,
    filterState.targetHeight,
    filterState.targetWidth,
    filterState.vignetteStrength,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!videoRef.current) return;

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
        seekTo(Math.max(videoRef.current.currentTime - 10, 0));
        return;
      }

      if (event.code === "KeyL") {
        event.preventDefault();
        seekTo(
          Math.min(
            videoRef.current.currentTime + 10,
            videoRef.current.duration || videoRef.current.currentTime + 10,
          ),
        );
        return;
      }

      if (event.code === "ArrowLeft") {
        event.preventDefault();
        seekTo(Math.max(videoRef.current.currentTime - 5, 0));
        return;
      }

      if (event.code === "ArrowRight") {
        event.preventDefault();
        seekTo(
          Math.min(
            videoRef.current.currentTime + 5,
            videoRef.current.duration || videoRef.current.currentTime + 5,
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
    needsUserPlay,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    playbackRate,
    volume,
    isLooping,
    hasVideo: previewKind === "video" || previewKind === "capture",
    hasImage: previewKind === "image",
    isCaptureActive: previewKind === "capture",
    previewFile,
    startDisplayCapture,
    stopDisplayCapture,
    togglePlayback,
    toggleMute,
    seekTo,
    stepFrame,
    changePlaybackRate,
    changeVolume,
    toggleLoop,
    playVideoWithAudio,
  };
}
