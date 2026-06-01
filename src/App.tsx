import { useCallback, useRef } from "react";
import "./App.css";
import RetroPlayer from "./retro-player/components/RetroPlayer";
import { usePreviewSourceState } from "./retro-player/hooks/usePreviewSourceState";
import { useDialog } from "./useDialog";

function App() {
  const defaultPreviewSrc = "./test_colorbars.png";
  const defaultPreviewKind = "image";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewSource = usePreviewSourceState();
  const isUsingDefaultPreview =
    !previewSource.previewSrc && !previewSource.previewStream;
  const { showConfirmDialog } = useDialog();

  const handleDisplayCapture = useCallback(async () => {
    const errorMessage = await previewSource.startDisplayCapture();
    const isItchDisplayCaptureError =
      typeof errorMessage === "string" &&
      (errorMessage.includes("DisplayCapture") ||
        errorMessage.includes("display capture") ||
        window.location.origin === "https://html-classic.itch.zone");

    if (!isItchDisplayCaptureError) {
      return;
    }

    const confirmed = await showConfirmDialog({
      title: "Capture unavailable",
      body: "Screen capture is not available on this site. Would you like to open the PWA version instead?",
      okText: "Open PWA page",
      cancelText: "Cancel",
    });

    console.log(">confirmed: ", confirmed);
    if (confirmed) {
      console.log(">confirmed: move");
      const url = "https://kyorohiro.github.io/tetorica-retro-player/demo/";

      try {
        if (window.top && window.top !== window.self) {
          window.top.location.href = url;
        } else {
          window.location.href = url;
        }
      } catch {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      return;
    }
  }, [previewSource, showConfirmDialog]);

  const onDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      previewSource.previewFile(files[0]);
    }
  };
  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };
  return (
    <main
      className="h-screen overflow-y-auto bg-slate-200 text-slate-800"
      onDrop={onDrop}
      onDragOver={onDragOver}
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
                void handleDisplayCapture();
              }}
              className="w-full rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 p-5 text-center text-sm text-slate-700 transition hover:bg-emerald-500/20"
            >
              Capture screen or window
            </button>
          </div>
          {previewSource.previewStream && (
            <div className="mt-2">
              <button
                type="button"
                onClick={previewSource.stopPreviewStream}
                className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-slate-700 transition hover:bg-rose-500/20"
              >
                Stop capture
              </button>
            </div>
          )}
          {previewSource.captureError && (
            <p className="mt-2 text-sm text-rose-500">{previewSource.captureError}</p>
          )}
        </div>

        <RetroPlayer
          src={previewSource.previewSrc ?? defaultPreviewSrc}
          stream={previewSource.previewStream}
          streamName={previewSource.previewLabel}
          kind={previewSource.previewKind ?? defaultPreviewKind}
          looping={!isUsingDefaultPreview}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*"
          className="hidden"
          onChange={(event) => {
            const files = event.currentTarget.files;
            if (files && files.length > 0) {
              previewSource.previewFile(files[0]);
            }

            event.currentTarget.value = "";
          }}
        />
      </div>
    </main>
  );
}

export default App;
