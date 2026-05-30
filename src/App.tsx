import { useEffect, useRef, useState } from "react";
import { Application, Filter, Sprite, Texture } from "pixi.js";
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const filterRef = useRef<Filter | null>(null);

  const [previewName, setPreviewName] = useState<string>("");
  const [previewError, setPreviewError] = useState<string>("");

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
    spriteRef.current?.destroy();
    spriteRef.current = null;

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
      videoRef.current.load();
      videoRef.current = null;
    }

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

  const previewFile = async (file: File) => {
    if (!file.type.startsWith("video/")) {
      setPreviewError("動画ファイルを選んでください。");
      return;
    }

    if (!appRef.current || !filterRef.current) {
      setPreviewError("Pixi の初期化がまだ終わっていません。");
      return;
    }

    setPreviewError("");
    setPreviewName(file.name);
    cleanupPreview();

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = "auto";

    try {
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error("動画の読み込みに失敗しました。"));
        video.load();
      });

      await video.play();

      const texture = Texture.from(video);
      const sprite = new Sprite(texture);
      sprite.filters = [filterRef.current];

      fitSprite(sprite, video);
      appRef.current.stage.removeChildren();
      appRef.current.stage.addChild(sprite);

      spriteRef.current = sprite;
      videoRef.current = video;
    } catch (error) {
      cleanupPreview();
      setPreviewError(
        error instanceof Error ? error.message : "動画プレビューに失敗しました。",
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
