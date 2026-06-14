import React from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

type PdfPreviewProps = {
  filePath: string;
  src: string;
};

type PdfStatus = "loading" | "loaded" | "error";

const isAndroidRuntime = () =>
  typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

const pdfAssetBase =
  typeof window !== "undefined"
    ? new URL("./pdfjs/", window.location.href).toString()
    : "/pdfjs/";

export default function PdfPreview({ filePath, src }: PdfPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = React.useState<PdfStatus>("loading");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }

    const androidRuntime = isAndroidRuntime();
    const loadingTask = getDocument({
      url: src,
      cMapUrl: `${pdfAssetBase}cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `${pdfAssetBase}standard_fonts/`,
      // Android WebView seems more prone to font/canvas issues with some PDFs.
      disableFontFace: androidRuntime,
      isOffscreenCanvasSupported: !androidRuntime,
      useWasm: !androidRuntime,
    });

    const render = async () => {
      setStatus("loading");
      setError("");

      try {
        const pdf = await loadingTask.promise;
        if (cancelled) {
          await loadingTask.destroy();
          return;
        }

        const host = containerRef.current;
        if (!host) {
          setStatus("error");
          setError("PDF container is not ready.");
          return;
        }

        host.innerHTML = "";

        const devicePixelRatio =
          typeof window !== "undefined"
            ? Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
            : 1;
        const availableWidth = Math.max(host.clientWidth || 0, 280);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          if (cancelled) {
            return;
          }

          const baseViewport = page.getViewport({ scale: 1 });
          const cssScale = Math.max(0.25, availableWidth / Math.max(baseViewport.width, 1));
          const viewport = page.getViewport({ scale: cssScale * devicePixelRatio });

          const pageWrap = document.createElement("div");
          pageWrap.className = "mx-auto mb-4 w-fit rounded-lg bg-white shadow-md";

          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));
          canvas.style.width = `${Math.max(1, Math.floor(viewport.width / devicePixelRatio))}px`;
          canvas.style.height = `${Math.max(1, Math.floor(viewport.height / devicePixelRatio))}px`;
          canvas.style.display = "block";

          const context = canvas.getContext("2d", { alpha: false });
          if (!context) {
            throw new Error("Failed to create a PDF canvas context.");
          }

          pageWrap.appendChild(canvas);
          host.appendChild(pageWrap);

          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;
        }

        if (!cancelled) {
          setStatus("loaded");
        }
      } catch (nextError) {
        if (cancelled) return;
        setStatus("error");
        setError(nextError instanceof Error ? nextError.message : String(nextError));
      }
    };

    void render();

    return () => {
      cancelled = true;
      void loadingTask.destroy().catch(() => {
        // Ignore cleanup errors when the preview closes mid-render.
      });
    };
  }, [src]);

  if (status === "error") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center text-sm text-red-300">
        <p>PDF preview failed.</p>
        <p className="break-all text-xs text-red-400">{error}</p>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800"
        >
          Open {filePath}
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-900">
      {status === "loading" && (
        <div className="flex shrink-0 items-center justify-center border-b border-slate-800 px-4 py-3 text-sm text-slate-300">
          Preparing PDF preview...
        </div>
      )}
      <div
        ref={containerRef}
        className="min-h-0 flex-1 overflow-auto px-3 py-4"
      />
    </div>
  );
}
