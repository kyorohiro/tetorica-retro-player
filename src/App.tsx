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
uniform float uTime;

void main(void)
{
  vec2 uv = vTextureCoord;
  vec4 color = texture(uTexture, uv);

  float line = sin((uv.y + uTime * 0.05) * 720.0) * 0.08;
  float vignette = smoothstep(0.95, 0.2, distance(uv, vec2(0.5)));
  color.rgb += line;
  color.rgb *= vignette;

  finalColor = color;
}
`;

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
          timeUniforms: {
            uTime: { value: 0, type: "f32" },
          },
        },
      });

      app.ticker.add((ticker) => {
        filter.resources.timeUniforms.uniforms.uTime += 0.016 * ticker.deltaTime;
      });
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

    sprite.width = video.videoWidth * scale;
    sprite.height = video.videoHeight * scale;
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
