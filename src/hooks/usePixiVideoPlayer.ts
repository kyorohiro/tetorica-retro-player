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
  const streamOwnedRef = useRef<boolean>(false);
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const previewElementRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const filterRef = useRef<Filter | null>(null);
  const previewRequestIdRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<
    MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null
  >(null);
  const isAudioGraphActiveRef = useRef<boolean>(false);
  const masterGainRef = useRef<GainNode | null>(null);
  const lofiLowpassRef = useRef<BiquadFilterNode | null>(null);
  const lofiHighshelfRef = useRef<BiquadFilterNode | null>(null);
  const lofiDriveRef = useRef<WaveShaperNode | null>(null);
  const lofiWetGainRef = useRef<GainNode | null>(null);
  const capturedMediaStreamRef = useRef<MediaStream | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const noisePannerRef = useRef<StereoPannerNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const noiseLfoRef = useRef<OscillatorNode | null>(null);
  const noiseLfoGainRef = useRef<GainNode | null>(null);

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
  const [previewKind, setPreviewKind] = useState<
    "video" | "audio" | "image" | "capture" | null
  >(null);
  const [sourceDimensions, setSourceDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isAudioFxEnabled, setIsAudioFxEnabled] = useState<boolean>(true);
  const [lofiAmount, setLofiAmount] = useState<number>(0.55);
  const [isNoiseEnabled, setIsNoiseEnabled] = useState<boolean>(true);
  const [noiseLevel, setNoiseLevel] = useState<number>(0.08);

  const applyFilterStateTo = (filter: Filter | null) => {
    if (!filter) return;

    filter.resources.pixelUniforms.uniforms.uTargetSize[0] = Math.max(filterState.targetWidth, 1);
    filter.resources.pixelUniforms.uniforms.uTargetSize[1] = Math.max(filterState.targetHeight, 1);
    filter.resources.pixelUniforms.uniforms.uColorLevels = Math.max(filterState.colorLevels, 2);
    filter.resources.pixelUniforms.uniforms.uDitherStrength = filterState.ditherStrength;
    filter.resources.pixelUniforms.uniforms.uPaletteMode = paletteModeToUniform(filterState.paletteMode);
    filter.resources.pixelUniforms.uniforms.uScanlineStrength = filterState.scanlineStrength;
    filter.resources.pixelUniforms.uniforms.uScanline2Strength = filterState.scanline2Strength;
    filter.resources.pixelUniforms.uniforms.uVignetteStrength = filterState.vignetteStrength;
    filter.resources.pixelUniforms.uniforms.uPhosphorStrength = filterState.phosphorStrength;
    filter.resources.pixelUniforms.uniforms.uMonoTint[0] = MONO_TINTS[filterState.monoTint].rgb[0];
    filter.resources.pixelUniforms.uniforms.uMonoTint[1] = MONO_TINTS[filterState.monoTint].rgb[1];
    filter.resources.pixelUniforms.uniforms.uMonoTint[2] = MONO_TINTS[filterState.monoTint].rgb[2];
  };

  const applyFilterState = () => {
    applyFilterStateTo(filterRef.current);
  };

  const syncSpriteFilter = () => {
    if (!spriteRef.current) return;

    spriteRef.current.filters =
      filterState.isFilterEnabled && filterRef.current ? [filterRef.current] : [];
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

  const waitForAudioReady = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve, reject) => {
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
        reject(new Error("音声の読み込みに失敗しました。"));
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

  const refreshLayout = () => {
    const app = appRef.current;
    const host = canvasHostRef.current;
    if (!app || !host) return;

    const nextWidth = Math.max(1, Math.round(host.clientWidth));
    const nextHeight = Math.max(1, Math.round(host.clientHeight));

    app.renderer.resize(nextWidth, nextHeight);
    fitCurrentSprite();
  };

  const syncVideoState = () => {
    if (!mediaRef.current) {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    setIsPlaying(!mediaRef.current.paused);
    setCurrentTime(mediaRef.current.currentTime);
    setDuration(mediaRef.current.duration || 0);
    setPlaybackRate(mediaRef.current.playbackRate || 1);
    setIsLooping(mediaRef.current.loop);
  };

  const createDriveCurve = (amount: number) => {
    const samples = 256;
    const curve = new Float32Array(samples);
    const drive = 1 + amount * 10;

    for (let index = 0; index < samples; index += 1) {
      const x = (index * 2) / (samples - 1) - 1;
      curve[index] = Math.tanh(x * drive);
    }

    return curve;
  };

  const ensureAudioContext = async () => {
    if (typeof window === "undefined") return null;

    if (!audioContextRef.current) {
      const context = new window.AudioContext();
      const masterGain = context.createGain();
      const lowpass = context.createBiquadFilter();
      const highshelf = context.createBiquadFilter();
      const drive = context.createWaveShaper();
      const wetGain = context.createGain();

      lowpass.type = "lowpass";
      highshelf.type = "highshelf";
      highshelf.frequency.value = 2800;
      drive.oversample = "4x";
      wetGain.gain.value = 0.75;

      lowpass.connect(highshelf);
      highshelf.connect(drive);
      drive.connect(wetGain);
      wetGain.connect(masterGain);
      masterGain.connect(context.destination);

      const noiseSource = context.createBufferSource();
      const noiseBuffer = context.createBuffer(2, context.sampleRate * 2, context.sampleRate);
      for (let channel = 0; channel < noiseBuffer.numberOfChannels; channel += 1) {
        const channelData = noiseBuffer.getChannelData(channel);
        for (let index = 0; index < channelData.length; index += 1) {
          channelData[index] = Math.random() * 2 - 1;
        }
      }
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = context.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 4200;
      noiseFilter.Q.value = 0.8;

      const noisePanner = context.createStereoPanner();
      const noiseGain = context.createGain();
      const noiseLfo = context.createOscillator();
      const noiseLfoGain = context.createGain();

      noiseLfo.type = "sine";
      noiseLfo.frequency.value = 0.065;
      noiseLfoGain.gain.value = 0.45;

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noisePanner);
      noisePanner.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseLfo.connect(noiseLfoGain);
      noiseLfoGain.connect(noisePanner.pan);
      noiseSource.start();
      noiseLfo.start();

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
      lofiLowpassRef.current = lowpass;
      lofiHighshelfRef.current = highshelf;
      lofiDriveRef.current = drive;
      lofiWetGainRef.current = wetGain;
      noiseSourceRef.current = noiseSource;
      noiseFilterRef.current = noiseFilter;
      noisePannerRef.current = noisePanner;
      noiseGainRef.current = noiseGain;
      noiseLfoRef.current = noiseLfo;
      noiseLfoGainRef.current = noiseLfoGain;
    }

    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch {
        // Resume can be blocked until the next user gesture.
      }
    }

    return audioContextRef.current;
  };

  const updateAudioNodes = () => {
    const masterGain = masterGainRef.current;
    const lowpass = lofiLowpassRef.current;
    const highshelf = lofiHighshelfRef.current;
    const drive = lofiDriveRef.current;
    const wetGain = lofiWetGainRef.current;
    const noiseGainNode = noiseGainRef.current;
    const media = mediaRef.current;

    if (masterGain) {
      masterGain.gain.value = isMuted ? 0 : volume;
    }

    if (media && !isAudioGraphActiveRef.current) {
      media.muted = isMuted;
      media.volume = isMuted ? 0 : volume;
    }

    if (lowpass && highshelf && drive) {
      const amount = isAudioFxEnabled ? lofiAmount : 0;
      lowpass.frequency.value = 14000 - amount * 13000;
      lowpass.Q.value = 0.4 + amount * 2.4;
      highshelf.frequency.value = 2200 - amount * 1000;
      highshelf.gain.value = -amount * 24;
      drive.curve = createDriveCurve(amount);
      if (wetGain) {
        wetGain.gain.value = isAudioFxEnabled ? 0.25 + amount * 1.25 : 0;
      }
    }

    if (noiseGainNode) {
      noiseGainNode.gain.value = isNoiseEnabled && !isMuted ? noiseLevel : 0;
    }
  };

  const connectMediaAudio = async (media: HTMLMediaElement) => {
    const context = await ensureAudioContext();
    if (!context) return;

    if (mediaSourceRef.current) {
      mediaSourceRef.current.disconnect();
      mediaSourceRef.current = null;
    }

    capturedMediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    capturedMediaStreamRef.current = null;

    let mediaSource: MediaElementAudioSourceNode | MediaStreamAudioSourceNode;
    const captureStream =
      "captureStream" in media && typeof media.captureStream === "function"
        ? media.captureStream()
        : null;

    if (captureStream && captureStream.getAudioTracks().length > 0) {
      capturedMediaStreamRef.current = captureStream;
      mediaSource = context.createMediaStreamSource(captureStream);
    } else {
      mediaSource = context.createMediaElementSource(media);
    }

    mediaSource.connect(lofiLowpassRef.current!);
    mediaSourceRef.current = mediaSource;
    isAudioGraphActiveRef.current = true;
    media.muted = false;
    media.volume = 0;

    updateAudioNodes();
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
    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;
    isAudioGraphActiveRef.current = false;
    capturedMediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    capturedMediaStreamRef.current = null;
    mediaRef.current = null;
    previewElementRef.current = null;
    if (streamOwnedRef.current) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    }
    streamRef.current = null;
    streamOwnedRef.current = false;

    setNeedsUserPlay(false);
    setIsPlaying(false);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    setVolume(1);
    setIsLooping(true);
    setPreviewKind(null);
    setSourceDimensions(null);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const playVideoWithAudio = async () => {
    if (!mediaRef.current) return;

    try {
      await ensureAudioContext();
      setIsMuted(false);
      await mediaRef.current.play();
      setPreviewError("");
      setNeedsUserPlay(false);
      updateAudioNodes();
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

  const previewFile = async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      setPreviewError("動画、音声、または画像ファイルを選んでください。");
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
      if (isVideo || isAudio) {
        const media = isVideo
          ? document.createElement("video")
          : document.createElement("audio");
        media.src = url;
        media.crossOrigin = "anonymous";
        media.loop = true;
        media.muted = false;
        media.volume = 1;
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
          const texture = Texture.from(media);
          texture.source.update();
          texture.source.scaleMode = "nearest";

          const filter = filterRef.current;
          if (!filter) {
            throw new Error("Pixi filter is not ready.");
          }

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(appRef.current, sprite, media);
          appRef.current.stage.removeChildren();
          appRef.current.stage.addChild(sprite);

          textureRef.current = texture;
          spriteRef.current = sprite;
          previewElementRef.current = media;
          setPreviewKind("video");
          setSourceDimensions({
            width: media.videoWidth,
            height: media.videoHeight,
          });
        } else {
          appRef.current.stage.removeChildren();
          spriteRef.current = null;
          textureRef.current = null;
          previewElementRef.current = null;
          setPreviewKind("audio");
          setSourceDimensions(null);
        }

        mediaRef.current = media;
        await connectMediaAudio(media);
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
      sprite.filters = filterState.isFilterEnabled ? [filter] : [];

      fitSprite(appRef.current, sprite, image);
      appRef.current.stage.removeChildren();
      appRef.current.stage.addChild(sprite);

      textureRef.current = texture;
      spriteRef.current = sprite;
      mediaRef.current = null;
      previewElementRef.current = image;
      setPreviewKind("image");
      setSourceDimensions({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
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
    sprite.filters = filterState.isFilterEnabled ? [filter] : [];

    fitSprite(appRef.current, sprite, video);
    appRef.current?.stage.removeChildren();
    appRef.current?.stage.addChild(sprite);

    textureRef.current = texture;
    spriteRef.current = sprite;
    mediaRef.current = video;
    previewElementRef.current = video;
    setPreviewKind(kind);
    setSourceDimensions({
      width: video.videoWidth,
      height: video.videoHeight,
    });
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
      streamOwnedRef.current = true;
      await attachVideoPreview(video, "capture");
      await connectMediaAudio(video);
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
            uScanline2Strength: { value: RETRO_PRESETS.pc98.scanline2, type: "f32" },
            uVignetteStrength: { value: RETRO_PRESETS.pc98.vignette, type: "f32" },
            uPhosphorStrength: { value: RETRO_PRESETS.pc98.phosphor, type: "f32" },
            uMonoTint: {
              value: new Float32Array(MONO_TINTS.green.rgb),
              type: "vec3<f32>",
            },
            uTime: { value: 0, type: "f32" },
          },
        },
      });

      app.ticker.add((ticker) => {
        filter.resources.pixelUniforms.uniforms.uTime += 0.016 * ticker.deltaTime;
      });
      app.renderer.on("resize", fitCurrentSprite);
      appRef.current = app;
      filterRef.current = filter;
      applyFilterState();
      refreshLayout();
    };

    void setupPixi();

    return () => {
      cancelled = true;
      cleanupPreview();
      noiseSourceRef.current?.stop();
      noiseLfoRef.current?.stop();
      void audioContextRef.current?.close();
      filterRef.current?.destroy();
      appRef.current?.destroy(true);
      filterRef.current = null;
      appRef.current = null;
    };
  }, []);

  useEffect(() => {
    applyFilterState();
    syncSpriteFilter();
  }, [
    filterState.colorLevels,
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
  ]);

  useEffect(() => {
    updateAudioNodes();
  }, [isMuted, volume, isAudioFxEnabled, lofiAmount, isNoiseEnabled, noiseLevel]);

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
    needsUserPlay,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    playbackRate,
    volume,
    isLooping,
    sourceDimensions,
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
        cleanupPreview();
        requestId = previewRequestIdRef.current;

        if (!appRef.current || !filterRef.current) {
          throw new Error("Pixi の初期化がまだ終わっていません。");
        }

        setPreviewError("");
        setPreviewName(name);

        if (kind === "video") {
          const media = document.createElement("video");
          media.srcObject = stream;
          media.crossOrigin = "anonymous";
          media.loop = false;
          media.muted = false;
          media.volume = 1;
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
          media.loop = false;
          media.muted = false;
          media.volume = 1;
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
          setPreviewKind("audio");
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
      } catch (error) {
        if (requestId !== previewRequestIdRef.current) return;

        cleanupPreview();
        setPreviewError(error instanceof Error ? error.message : String(error));
      }
    },
    previewUrl: async (url: string, kind: "video" | "image" | "audio" = "video") => {
      let requestId = 0;

      try {
        cleanupPreview();
        requestId = previewRequestIdRef.current;

        if (!appRef.current || !filterRef.current) {
          throw new Error("Pixi の初期化がまだ終わっていません。");
        }

        setPreviewError("");
        setPreviewName(url);

        if (kind === "video") {
          const media = document.createElement("video");
          media.src = url;
          media.crossOrigin = "anonymous";
          media.loop = true;
          media.muted = false;
          media.volume = 1;
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

          const texture = Texture.from(media as HTMLVideoElement);
          texture.source.update();
          texture.source.scaleMode = "nearest";

          const filter = filterRef.current;
          if (!filter) throw new Error("Pixi filter is not ready.");

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(appRef.current, sprite, media);
          appRef.current.stage.removeChildren();
          appRef.current.stage.addChild(sprite);

          textureRef.current = texture;
          spriteRef.current = sprite;
          mediaRef.current = media;
          previewElementRef.current = media;
          setPreviewKind("video");
          setSourceDimensions({
            width: media.videoWidth,
            height: media.videoHeight,
          });
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
          texture.source.scaleMode = "nearest";

          const filter = filterRef.current;
          if (!filter) throw new Error("Pixi filter is not ready.");

          const sprite = new Sprite(texture);
          sprite.filters = filterState.isFilterEnabled ? [filter] : [];

          fitSprite(appRef.current, sprite, image);
          appRef.current.stage.removeChildren();
          appRef.current.stage.addChild(sprite);

          textureRef.current = texture;
          spriteRef.current = sprite;
          previewElementRef.current = image;
          setPreviewKind("image");
          setSourceDimensions({
            width: image.naturalWidth,
            height: image.naturalHeight,
          });
        } else {
          // audio-only
          const audio = document.createElement("audio");
          audio.src = url;
          audio.crossOrigin = "anonymous";
          audio.loop = true;
          audio.muted = false;
          audio.volume = 1;
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
          setPreviewKind("audio");
          setSourceDimensions(null);

          mediaRef.current = audio;
          await connectMediaAudio(audio);
          syncVideoState();
        }

        if (requestId !== previewRequestIdRef.current) {
          return;
        }

        await playVideoWithAudio();
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
    playVideoWithAudio,
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
