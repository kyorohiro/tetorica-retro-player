import { useEffect, useRef, useState } from "react";
import { Application, Filter, Sprite, Texture, VideoSource } from "pixi.js";
import "./App.css";
import { RetroFilterPanel } from "./components/RetroFilterPanel";
import { VideoControls } from "./components/VideoControls";
import {
  MONO_TINTS,
  RETRO_PRESETS,
  paletteModeToUniform,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "./retro/config";
import { FILTER_FRAGMENT, FILTER_VERTEX } from "./retro/filterShader";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const appRef = useRef<Application | null>(null);
  const spriteRef = useRef<Sprite | null>(null);
  const textureRef = useRef<Texture | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
  const [targetWidth, setTargetWidth] = useState<number>(RETRO_PRESETS.pc98.width);
  const [targetHeight, setTargetHeight] = useState<number>(RETRO_PRESETS.pc98.height);
  const [colorLevels, setColorLevels] = useState<number>(RETRO_PRESETS.pc98.colors);
  const [ditherStrength, setDitherStrength] = useState<number>(RETRO_PRESETS.pc98.dither);
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(RETRO_PRESETS.pc98.palette);
  const [scanlineStrength, setScanlineStrength] = useState<number>(RETRO_PRESETS.pc98.scanline);
  const [vignetteStrength, setVignetteStrength] = useState<number>(RETRO_PRESETS.pc98.vignette);
  const [phosphorStrength, setPhosphorStrength] = useState<number>(RETRO_PRESETS.pc98.phosphor);
  const [monoTint, setMonoTint] = useState<MonoTintMode>(RETRO_PRESETS.pc98.monoTint);

  const applyFilterState = () => {
    if (!filterRef.current) return;

    filterRef.current.resources.pixelUniforms.uniforms.uTargetSize[0] = Math.max(targetWidth, 1);
    filterRef.current.resources.pixelUniforms.uniforms.uTargetSize[1] = Math.max(targetHeight, 1);
    filterRef.current.resources.pixelUniforms.uniforms.uColorLevels = Math.max(colorLevels, 2);
    filterRef.current.resources.pixelUniforms.uniforms.uDitherStrength = ditherStrength;
    filterRef.current.resources.pixelUniforms.uniforms.uPaletteMode = paletteModeToUniform(paletteMode);
    filterRef.current.resources.pixelUniforms.uniforms.uScanlineStrength = scanlineStrength;
    filterRef.current.resources.pixelUniforms.uniforms.uVignetteStrength = vignetteStrength;
    filterRef.current.resources.pixelUniforms.uniforms.uPhosphorStrength = phosphorStrength;
    filterRef.current.resources.pixelUniforms.uniforms.uMonoTint[0] = MONO_TINTS[monoTint].rgb[0];
    filterRef.current.resources.pixelUniforms.uniforms.uMonoTint[1] = MONO_TINTS[monoTint].rgb[1];
    filterRef.current.resources.pixelUniforms.uniforms.uMonoTint[2] = MONO_TINTS[monoTint].rgb[2];
  };

  const releaseDetachedVideo = (video: HTMLVideoElement, url?: string) => {
    video.pause();
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

  const fitSprite = (sprite: Sprite, video: HTMLVideoElement) => {
    const app = appRef.current;
    if (!app) return;

    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const scale = Math.min(
      screenWidth / video.videoWidth,
      screenHeight / video.videoHeight,
    );
    const integerScale = Math.max(1, Math.floor(scale));
    const appliedScale = scale >= 1 ? integerScale : scale;

    sprite.width = video.videoWidth * appliedScale;
    sprite.height = video.videoHeight * appliedScale;
    sprite.x = (screenWidth - sprite.width) / 2;
    sprite.y = (screenHeight - sprite.height) / 2;
  };

  const fitCurrentSprite = () => {
    if (spriteRef.current && videoRef.current) {
      fitSprite(spriteRef.current, videoRef.current);
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

    setNeedsUserPlay(false);
    setIsPlaying(false);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    setVolume(1);
    setIsLooping(true);

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
    if (!file.type.startsWith("video/")) {
      setPreviewError("動画ファイルを選んでください。");
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

    try {
      await waitForVideoFrame(video);

      if (requestId !== previewRequestIdRef.current) {
        releaseDetachedVideo(video, url);
        return;
      }

      const texture = Texture.from(video);
      texture.source.update();
      texture.source.scaleMode = "nearest";

      const sprite = new Sprite(texture);
      sprite.filters = [filterRef.current];

      fitSprite(sprite, video);
      appRef.current.stage.removeChildren();
      appRef.current.stage.addChild(sprite);

      textureRef.current = texture;
      spriteRef.current = sprite;
      videoRef.current = video;
      syncVideoState();

      await playVideoWithAudio();
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) {
        releaseDetachedVideo(video, url);
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

  const applyPreset = (preset: RetroPresetKey) => {
    const settings = RETRO_PRESETS[preset];
    setTargetWidth(settings.width);
    setTargetHeight(settings.height);
    setColorLevels(settings.colors);
    setDitherStrength(settings.dither);
    setPaletteMode(settings.palette);
    setScanlineStrength(settings.scanline);
    setVignetteStrength(settings.vignette);
    setPhosphorStrength(settings.phosphor);
    setMonoTint(settings.monoTint);
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
            uScanlineStrength: {
              value: RETRO_PRESETS.pc98.scanline,
              type: "f32",
            },
            uVignetteStrength: {
              value: RETRO_PRESETS.pc98.vignette,
              type: "f32",
            },
            uPhosphorStrength: {
              value: RETRO_PRESETS.pc98.phosphor,
              type: "f32",
            },
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
    colorLevels,
    ditherStrength,
    monoTint,
    paletteMode,
    phosphorStrength,
    scanlineStrength,
    targetHeight,
    targetWidth,
    vignetteStrength,
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

  return (
    <main
      className="h-screen overflow-y-auto bg-slate-200 text-slate-800"
      onDrop={(ev) => {
        ev.preventDefault();
        const files = ev.dataTransfer.files;

        if (files.length > 0) {
          void previewFile(files[0]);
        }
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8">
          <p className="text-sm text-slate-400">video preview via pixi.js</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Tetorica Retro Player
          </h1>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop video here, or click to add file
              </button>

              <button
                type="button"
                onClick={() => {
                  folderInputRef.current?.click();
                }}
                className="hidden rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop folders here, or click to add folders
              </button>

              <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-xs text-slate-300">
                <p className="font-semibold text-slate-100">Current preview</p>

                <RetroFilterPanel
                  colorLevels={colorLevels}
                  ditherStrength={ditherStrength}
                  monoTint={monoTint}
                  paletteMode={paletteMode}
                  phosphorStrength={phosphorStrength}
                  previewName={previewName}
                  scanlineStrength={scanlineStrength}
                  targetHeight={targetHeight}
                  targetWidth={targetWidth}
                  vignetteStrength={vignetteStrength}
                  onApplyPreset={applyPreset}
                  onSetColorLevels={setColorLevels}
                  onSetDitherStrength={setDitherStrength}
                  onSetMonoTint={setMonoTint}
                  onSetPaletteMode={setPaletteMode}
                  onSetPhosphorStrength={setPhosphorStrength}
                  onSetScanlineStrength={setScanlineStrength}
                  onSetTargetHeight={setTargetHeight}
                  onSetTargetWidth={setTargetWidth}
                  onSetVignetteStrength={setVignetteStrength}
                />

                {videoRef.current && (
                  <VideoControls
                    currentTime={currentTime}
                    duration={duration}
                    isLooping={isLooping}
                    isMuted={isMuted}
                    isPlaying={isPlaying}
                    playbackRate={playbackRate}
                    volume={volume}
                    onChangePlaybackRate={changePlaybackRate}
                    onChangeVolume={changeVolume}
                    onRestart={() => {
                      seekTo(0);
                      void playVideoWithAudio();
                    }}
                    onSeek={seekTo}
                    onStepFrame={stepFrame}
                    onToggleLoop={toggleLoop}
                    onToggleMute={toggleMute}
                    onTogglePlayback={() => {
                      void togglePlayback();
                    }}
                  />
                )}

                {needsUserPlay && (
                  <p className="mt-2 text-amber-300">
                    自動再生が止められたので、Play ボタンを押すと音が出ます。
                  </p>
                )}

                {previewError && (
                  <p className="mt-2 text-rose-400">{previewError}</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
              <div
                ref={canvasHostRef}
                className="h-[60vh] min-h-[360px] overflow-hidden rounded-xl bg-slate-950"
              />
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={(ev) => {
              const files = ev.currentTarget.files;
              if (files && files.length > 0) {
                void previewFile(files[0]);
              }

              ev.currentTarget.value = "";
            }}
          />

          <input
            ref={folderInputRef}
            type="file"
            multiple
            {...({ webkitdirectory: "true" } as any)}
            className="hidden"
            onChange={(ev) => {
              ev.currentTarget.value = "";
            }}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
