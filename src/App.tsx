import { useEffect, useRef, useState } from "react";
import "./App.css";
import RetroPlayer from "./components/RetroPlayer";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [previewKind, setPreviewKind] = useState<"video" | "image" | "audio">(
    "video",
  );

  useEffect(() => {
    return () => {
      if (previewSrc?.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  const previewFile = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      return;
    }

    setPreviewSrc((current) => {
      if (current?.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
    setPreviewKind(isVideo ? "video" : isAudio ? "audio" : "image");
  };

  return (
    <main
      className="h-screen overflow-y-auto bg-slate-200 text-slate-800"
      onDrop={(event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
          previewFile(files[0]);
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8">
          <p className="text-sm text-slate-400">video preview via pixi.js</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Tetorica Retro Player
          </h1>
        </header>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="w-full rounded-xl border border-dashed border-slate-500 bg-slate-50 p-5 text-center text-sm text-slate-600 transition hover:border-sky-500 hover:bg-white"
          >
            Drop image/video/audio here, or click to add file
          </button>
        </div>

        <RetroPlayer src={previewSrc} kind={previewKind} />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*"
          className="hidden"
          onChange={(event) => {
            const files = event.currentTarget.files;
            if (files && files.length > 0) {
              previewFile(files[0]);
            }

            event.currentTarget.value = "";
          }}
        />
      </div>
    </main>
  );
}

export default App;
