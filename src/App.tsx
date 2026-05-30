import { useEffect, useRef, useState } from "react";
import "./App.css";
import RetroPlayer from "./components/RetroPlayer";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [previewLabel, setPreviewLabel] = useState<string>();
  const [captureError, setCaptureError] = useState<string>("");
  const [previewKind, setPreviewKind] = useState<"video" | "image" | "audio">(
    "video",
  );

  useEffect(() => {
    return () => {
      if (previewSrc?.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }

      previewStream?.getTracks().forEach((track) => track.stop());
    };
  }, [previewSrc, previewStream]);

  const clearPreviewStream = () => {
    setPreviewStream((current) => {
      current?.getTracks().forEach((track) => track.stop());
      return null;
    });
  };

  const previewFile = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      return;
    }

    clearPreviewStream();
    setPreviewLabel(undefined);
    setCaptureError("");
    setPreviewSrc((current) => {
      if (current?.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
    setPreviewKind(isVideo ? "video" : isAudio ? "audio" : "image");
  };

  const startDisplayCapture = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setCaptureError("このブラウザでは画面キャプチャーに対応していません。");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      setPreviewSrc((current) => {
        if (current?.startsWith("blob:")) {
          URL.revokeObjectURL(current);
        }

        return undefined;
      });
      setPreviewKind("video");
      setPreviewLabel("Display Capture");
      setCaptureError("");
      setPreviewStream((current) => {
        current?.getTracks().forEach((track) => track.stop());
        return stream;
      });

      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        setPreviewStream((current) => {
          if (current !== stream) return current;
          return null;
        });
      });
    } catch (error) {
      setCaptureError(
        error instanceof Error
          ? error.message
          : "画面キャプチャーを開始できませんでした。",
      );
    }
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="w-full rounded-xl border border-dashed border-slate-500 bg-slate-50 p-5 text-center text-sm text-slate-600 transition hover:border-sky-500 hover:bg-white"
            >
              Drop image/video/audio here, or click to add file
            </button>
            <button
              type="button"
              onClick={() => {
                void startDisplayCapture();
              }}
              className="w-full rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 p-5 text-center text-sm text-slate-700 transition hover:bg-emerald-500/20"
            >
              Capture screen or window
            </button>
          </div>
          {previewStream && (
            <div className="mt-2">
              <button
                type="button"
                onClick={clearPreviewStream}
                className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-slate-700 transition hover:bg-rose-500/20"
              >
                Stop capture
              </button>
            </div>
          )}
          {captureError && (
            <p className="mt-2 text-sm text-rose-500">{captureError}</p>
          )}
        </div>

        <RetroPlayer
          src={previewSrc}
          stream={previewStream}
          streamName={previewLabel}
          kind={previewKind}
        />

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
