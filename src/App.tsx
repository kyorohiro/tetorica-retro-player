import { useEffect, useRef, useState } from "react";
import { Application, Filter, Sprite, Texture, VideoSource } from "pixi.js";
import "./App.css";

const FILTER_VERTEX = `#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition(void)
{
  vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

  position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
  position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

  return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(void)
{
  return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
  gl_Position = filterVertexPosition();
  vTextureCoord = filterTextureCoord();
}
`;

const FILTER_FRAGMENT = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uPaletteMode;
uniform float uScanlineStrength;
uniform float uVignetteStrength;
uniform float uPhosphorStrength;
uniform vec3 uMonoTint;

float bayer4x4(vec2 pos)
{
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = x + y * 4;

  float matrix[16];
  matrix[0] = 0.0 / 16.0;
  matrix[1] = 8.0 / 16.0;
  matrix[2] = 2.0 / 16.0;
  matrix[3] = 10.0 / 16.0;
  matrix[4] = 12.0 / 16.0;
  matrix[5] = 4.0 / 16.0;
  matrix[6] = 14.0 / 16.0;
  matrix[7] = 6.0 / 16.0;
  matrix[8] = 3.0 / 16.0;
  matrix[9] = 11.0 / 16.0;
  matrix[10] = 1.0 / 16.0;
  matrix[11] = 9.0 / 16.0;
  matrix[12] = 15.0 / 16.0;
  matrix[13] = 7.0 / 16.0;
  matrix[14] = 13.0 / 16.0;
  matrix[15] = 5.0 / 16.0;

  return matrix[index];
}

vec3 pc98Palette(float index)
{
  if (index < 0.5) return vec3(0.0, 0.0, 0.0);
  if (index < 1.5) return vec3(0.0, 0.0, 0.6667);
  if (index < 2.5) return vec3(0.0, 0.6667, 0.0);
  if (index < 3.5) return vec3(0.0, 0.6667, 0.6667);
  if (index < 4.5) return vec3(0.6667, 0.0, 0.0);
  if (index < 5.5) return vec3(0.6667, 0.0, 0.6667);
  if (index < 6.5) return vec3(0.6667, 0.3333, 0.0);
  if (index < 7.5) return vec3(0.6667, 0.6667, 0.6667);
  if (index < 8.5) return vec3(0.3333, 0.3333, 0.3333);
  if (index < 9.5) return vec3(0.3333, 0.3333, 1.0);
  if (index < 10.5) return vec3(0.3333, 1.0, 0.3333);
  if (index < 11.5) return vec3(0.3333, 1.0, 1.0);
  if (index < 12.5) return vec3(1.0, 0.3333, 0.3333);
  if (index < 13.5) return vec3(1.0, 0.3333, 1.0);
  if (index < 14.5) return vec3(1.0, 1.0, 0.3333);
  return vec3(1.0, 1.0, 1.0);
}

vec3 nearestPc98(vec3 color)
{
  vec3 best = pc98Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 16; i++) {
    vec3 candidate = pc98Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 color32Palette(float index)
{
  float r = mod(index, 4.0);
  float g = mod(floor(index / 4.0), 4.0);
  float b = mod(floor(index / 16.0), 2.0);

  return vec3(r / 3.0, g / 3.0, b);
}

vec3 nearestColor32(vec3 color)
{
  vec3 best = color32Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 32; i++) {
    vec3 candidate = color32Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 monochromePalette(vec3 color, float levels, vec3 tint)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);

  return mix(vec3(0.0), tint, stepped);
}

void main(void)
{
  vec2 cell = floor(vTextureCoord * uTargetSize);
  vec2 pixelatedUv = (cell + 0.5) / uTargetSize;
  pixelatedUv = clamp(pixelatedUv, vec2(0.0), vec2(1.0));

  vec4 color = texture(uTexture, pixelatedUv);
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color.rgb = clamp(color.rgb + dither, 0.0, 1.0);

  if (uPaletteMode < 0.5) {
    color.rgb = floor(color.rgb * (uColorLevels - 1.0) + 0.5) / max(uColorLevels - 1.0, 1.0);
  } else if (uPaletteMode < 1.5) {
    color.rgb = nearestPc98(color.rgb);
  } else if (uPaletteMode < 2.5) {
    color.rgb = nearestColor32(color.rgb);
  } else {
    color.rgb = monochromePalette(color.rgb, max(uColorLevels, 2.0), uMonoTint);
  }

  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * uScanlineStrength);

  float phosphor = sin(pixelatedUv.x * uTargetSize.x * 6.2831853) * 0.5 + 0.5;
  color.rgb *= 1.0 + ((phosphor - 0.5) * uPhosphorStrength);

  float vignette = distance(vTextureCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;
  color.rgb = clamp(color.rgb, 0.0, 1.0);

  finalColor = color;
}
`;

const RETRO_PRESETS = {
  chunky: { label: "Chunky", width: 256, height: 192, colors: 8, dither: 0.2, palette: "free", scanline: 0.08, vignette: 0.04, phosphor: 0.03 },
  arcade: { label: "Arcade", width: 320, height: 224, colors: 12, dither: 0.28, palette: "free", scanline: 0.14, vignette: 0.08, phosphor: 0.05 },
  pc98: { label: "PC-98", width: 640, height: 400, colors: 16, dither: 0.35, palette: "pc98", scanline: 0.09, vignette: 0.06, phosphor: 0.04 },
  color32: { label: "Color 32", width: 320, height: 200, colors: 32, dither: 0.24, palette: "color32", scanline: 0.08, vignette: 0.05, phosphor: 0.03 },
  monochrome: { label: "Mono", width: 640, height: 400, colors: 4, dither: 0.18, palette: "mono", scanline: 0.1, vignette: 0.08, phosphor: 0.02 },
} as const;

type PaletteMode = "free" | "pc98" | "color32" | "mono";
type MonoTintMode = "gray" | "green" | "amber" | "ice";

const MONO_TINTS: Record<MonoTintMode, { label: string; rgb: [number, number, number] }> = {
  gray: { label: "Gray", rgb: [1, 1, 1] },
  green: { label: "Green", rgb: [0.72, 1, 0.58] },
  amber: { label: "Amber", rgb: [1, 0.82, 0.45] },
  ice: { label: "Ice", rgb: [0.7, 0.9, 1] },
};

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
  const [targetWidth, setTargetWidth] = useState<number>(RETRO_PRESETS.pc98.width);
  const [targetHeight, setTargetHeight] = useState<number>(RETRO_PRESETS.pc98.height);
  const [colorLevels, setColorLevels] = useState<number>(RETRO_PRESETS.pc98.colors);
  const [ditherStrength, setDitherStrength] = useState<number>(RETRO_PRESETS.pc98.dither);
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(RETRO_PRESETS.pc98.palette);
  const [scanlineStrength, setScanlineStrength] = useState<number>(RETRO_PRESETS.pc98.scanline);
  const [vignetteStrength, setVignetteStrength] = useState<number>(RETRO_PRESETS.pc98.vignette);
  const [phosphorStrength, setPhosphorStrength] = useState<number>(RETRO_PRESETS.pc98.phosphor);
  const [monoTint, setMonoTint] = useState<MonoTintMode>("green");

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

  const fitCurrentSprite = () => {
    if (spriteRef.current && videoRef.current) {
      fitSprite(spriteRef.current, videoRef.current);
    }
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
            uTargetSize: { value: new Float32Array([RETRO_PRESETS.pc98.width, RETRO_PRESETS.pc98.height]), type: "vec2<f32>" },
            uColorLevels: { value: RETRO_PRESETS.pc98.colors, type: "f32" },
            uDitherStrength: { value: RETRO_PRESETS.pc98.dither, type: "f32" },
            uPaletteMode: { value: 1, type: "f32" },
            uScanlineStrength: { value: RETRO_PRESETS.pc98.scanline, type: "f32" },
            uVignetteStrength: { value: RETRO_PRESETS.pc98.vignette, type: "f32" },
            uPhosphorStrength: { value: RETRO_PRESETS.pc98.phosphor, type: "f32" },
            uMonoTint: { value: new Float32Array(MONO_TINTS.green.rgb), type: "vec3<f32>" },
          },
        },
      });
      filter.resources.pixelUniforms.uniforms.uTargetSize[0] = targetWidth;
      filter.resources.pixelUniforms.uniforms.uTargetSize[1] = targetHeight;
      filter.resources.pixelUniforms.uniforms.uColorLevels = Math.max(colorLevels, 2);
      filter.resources.pixelUniforms.uniforms.uDitherStrength = ditherStrength;
      filter.resources.pixelUniforms.uniforms.uPaletteMode = paletteModeToUniform(paletteMode);
      filter.resources.pixelUniforms.uniforms.uScanlineStrength = scanlineStrength;
      filter.resources.pixelUniforms.uniforms.uVignetteStrength = vignetteStrength;
      filter.resources.pixelUniforms.uniforms.uPhosphorStrength = phosphorStrength;
      filter.resources.pixelUniforms.uniforms.uMonoTint[0] = MONO_TINTS[monoTint].rgb[0];
      filter.resources.pixelUniforms.uniforms.uMonoTint[1] = MONO_TINTS[monoTint].rgb[1];
      filter.resources.pixelUniforms.uniforms.uMonoTint[2] = MONO_TINTS[monoTint].rgb[2];
      app.renderer.on("resize", fitCurrentSprite);

      appRef.current = app;
      filterRef.current = filter;
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

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

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

  const syncVideoState = () => {
    if (!videoRef.current) {
      setIsPlaying(false);
      setIsMuted(false);
      return;
    }

    setIsPlaying(!videoRef.current.paused);
    setIsMuted(videoRef.current.muted || videoRef.current.volume === 0);
  };

  const playVideoWithAudio = async () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
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

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    if (!videoRef.current.muted && videoRef.current.volume === 0) {
      videoRef.current.volume = 1;
    }
    syncVideoState();
  };

  const paletteModeToUniform = (mode: PaletteMode) => {
    if (mode === "pc98") return 1;
    if (mode === "color32") return 2;
    if (mode === "mono") return 3;

    return 0;
  };

  useEffect(() => {
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
  }, [colorLevels, ditherStrength, monoTint, paletteMode, phosphorStrength, scanlineStrength, targetHeight, targetWidth, vignetteStrength]);

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

      try {
        await playVideoWithAudio();
      } catch {
        // playVideoWithAudio handles its own error state.
      }
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

  const handleDrop = (ev: React.DragEvent) => {
    ev.preventDefault();
    const files = ev.dataTransfer.files;

    if (files.length > 0) {
      void previewFile(files[0]);
    }
  };

  const handleDragOver = (ev: React.DragEvent) => {
    ev.preventDefault();
  };

  async function selectFiles() {
    fileInputRef.current?.click();
  }

  async function selectFolders() {
    folderInputRef.current?.click();
  }

  const applyPreset = (preset: keyof typeof RETRO_PRESETS) => {
    const settings = RETRO_PRESETS[preset];
    setTargetWidth(settings.width);
    setTargetHeight(settings.height);
    setColorLevels(settings.colors);
    setDitherStrength(settings.dither);
    setPaletteMode(settings.palette);
    setScanlineStrength(settings.scanline);
    setVignetteStrength(settings.vignette);
    setPhosphorStrength(settings.phosphor);
  };

  return (
    <main
      className="h-screen overflow-y-auto bg-slate-200 text-slate-800"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
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
                onClick={selectFiles}
                className="w-full rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop video here, or click to add file
              </button>

              <button
                type="button"
                onClick={selectFolders}
                className="hidden rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop folders here, or click to add folders
              </button>

              <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-xs text-slate-300">
                <p className="font-semibold text-slate-100">Current preview</p>
                <p className="mt-2 break-all">
                  {previewName || "動画がまだ選択されていません"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(RETRO_PRESETS).map(([key, preset]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        applyPreset(key as keyof typeof RETRO_PRESETS);
                      }}
                      className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-slate-100 hover:bg-amber-500/20"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <label className="block">
                    <span className="text-slate-100">Palette</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPaletteMode("free");
                        }}
                        className={[
                          "rounded-lg border px-3 py-1.5 text-slate-100",
                          paletteMode === "free"
                            ? "border-sky-400 bg-sky-500/20"
                            : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                        ].join(" ")}
                      >
                        Free
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPaletteMode("pc98");
                        }}
                        className={[
                          "rounded-lg border px-3 py-1.5 text-slate-100",
                          paletteMode === "pc98"
                            ? "border-sky-400 bg-sky-500/20"
                            : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                        ].join(" ")}
                      >
                        PC-98 16-color
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPaletteMode("color32");
                        }}
                        className={[
                          "rounded-lg border px-3 py-1.5 text-slate-100",
                          paletteMode === "color32"
                            ? "border-sky-400 bg-sky-500/20"
                            : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                        ].join(" ")}
                      >
                        Color 32
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPaletteMode("mono");
                        }}
                        className={[
                          "rounded-lg border px-3 py-1.5 text-slate-100",
                          paletteMode === "mono"
                            ? "border-sky-400 bg-sky-500/20"
                            : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                        ].join(" ")}
                      >
                        Monochrome
                      </button>
                    </div>
                  </label>
                  {paletteMode === "mono" && (
                    <label className="block">
                      <span className="text-slate-100">Mono tint</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(MONO_TINTS).map(([key, tint]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              setMonoTint(key as MonoTintMode);
                            }}
                            className={[
                              "rounded-lg border px-3 py-1.5 text-slate-100",
                              monoTint === key
                                ? "border-sky-400 bg-sky-500/20"
                                : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                            ].join(" ")}
                          >
                            {tint.label}
                          </button>
                        ))}
                      </div>
                    </label>
                  )}
                  <label className="block">
                    <span className="text-slate-100">Target width: {targetWidth}px</span>
                    <input
                      type="range"
                      min="160"
                      max="640"
                      step="16"
                      value={targetWidth}
                      onChange={(ev) => {
                        setTargetWidth(Number(ev.currentTarget.value));
                      }}
                      className="mt-2 w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-100">Target height: {targetHeight}px</span>
                    <input
                      type="range"
                      min="100"
                      max="400"
                      step="8"
                      value={targetHeight}
                      onChange={(ev) => {
                        setTargetHeight(Number(ev.currentTarget.value));
                      }}
                      className="mt-2 w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-100">Color levels: {colorLevels}</span>
                    <input
                      type="range"
                      min="2"
                      max="16"
                      step="1"
                      value={colorLevels}
                      onChange={(ev) => {
                        setColorLevels(Number(ev.currentTarget.value));
                      }}
                      disabled={paletteMode === "pc98" || paletteMode === "color32"}
                      className="mt-2 w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-100">
                      Bayer dither: {ditherStrength.toFixed(2)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={ditherStrength}
                      onChange={(ev) => {
                        setDitherStrength(Number(ev.currentTarget.value));
                      }}
                      className="mt-2 w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-100">
                      Scanline: {scanlineStrength.toFixed(2)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="0.4"
                      step="0.01"
                      value={scanlineStrength}
                      onChange={(ev) => {
                        setScanlineStrength(Number(ev.currentTarget.value));
                      }}
                      className="mt-2 w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-100">
                      Vignette: {vignetteStrength.toFixed(2)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="0.3"
                      step="0.01"
                      value={vignetteStrength}
                      onChange={(ev) => {
                        setVignetteStrength(Number(ev.currentTarget.value));
                      }}
                      className="mt-2 w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="text-slate-100">
                      Phosphor: {phosphorStrength.toFixed(2)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="0.2"
                      step="0.01"
                      value={phosphorStrength}
                      onChange={(ev) => {
                        setPhosphorStrength(Number(ev.currentTarget.value));
                      }}
                      className="mt-2 w-full"
                    />
                  </label>
                </div>
                {videoRef.current && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        void playVideoWithAudio();
                      }}
                      className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-slate-100 hover:bg-sky-500/20"
                    >
                      {isPlaying ? "Replay audio" : "Play with audio"}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-100 hover:bg-slate-800"
                    >
                      {isMuted ? "Unmute" : "Mute"}
                    </button>
                  </div>
                )}
                {needsUserPlay && (
                  <p className="mt-2 text-amber-300">
                    自動再生が止められたので、Play with audio を押すと音が出ます。
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
              if (files && files.length > 0) void previewFile(files[0]);

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
