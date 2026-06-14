import React from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

type PdfPreviewProps = {
  filePath: string;
  src: string;
};

type PdfStatus =
  | "loading-cover"
  | "cover-ready"
  | "loading-all"
  | "loaded"
  | "error";

export default function PdfPreview({ filePath, src }: PdfPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const loadingTaskRef = React.useRef<ReturnType<typeof getDocument> | null>(null);
  const pdfRef = React.useRef<any>(null);
  const renderTokenRef = React.useRef(0);
  const [status, setStatus] = React.useState<PdfStatus>("loading-cover");
  const [error, setError] = React.useState("");
  const [pageCount, setPageCount] = React.useState(0);

  const clearContainer = React.useCallback(() => {
    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }
  }, []);

  const renderPage = React.useCallback(
    async (pdf: any, pageNumber: number, renderToken: number) => {
      const host = containerRef.current;
      if (!host) {
        throw new Error("PDF container is not ready.");
      }

      const page = await pdf.getPage(pageNumber);
      if (renderTokenRef.current !== renderToken) {
        return;
      }

      const devicePixelRatio =
        typeof window !== "undefined"
          ? Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
          : 1;
      const availableWidth = Math.max(host.clientWidth || 0, 280);
      const baseViewport = page.getViewport({ scale: 1 });
      const cssScale = Math.max(
        0.25,
        availableWidth / Math.max(baseViewport.width, 1),
      );
      const viewport = page.getViewport({ scale: cssScale * devicePixelRatio });

      const pageWrap = document.createElement("div");
      pageWrap.className = "mx-auto mb-4 w-fit rounded-lg bg-white shadow-md";

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      canvas.style.width = `${Math.max(1, Math.floor(viewport.width / devicePixelRatio))}px`;
      canvas.style.height = `${Math.max(
        1,
        Math.floor(viewport.height / devicePixelRatio),
      )}px`;
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
    },
    [],
  );

  React.useEffect(() => {
    let cancelled = false;
    const renderToken = renderTokenRef.current + 1;
    renderTokenRef.current = renderToken;

    clearContainer();
    setStatus("loading-cover");
    setError("");
    setPageCount(0);
    pdfRef.current = null;

    const loadingTask = getDocument({ url: src });
    loadingTaskRef.current = loadingTask;

    const renderCover = async () => {
      try {
        const pdf = await loadingTask.promise;
        if (cancelled || renderTokenRef.current !== renderToken) {
          await loadingTask.destroy();
          return;
        }

        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        clearContainer();
        await renderPage(pdf, 1, renderToken);

        if (cancelled || renderTokenRef.current !== renderToken) {
          return;
        }

        setStatus(pdf.numPages > 1 ? "cover-ready" : "loaded");
      } catch (nextError) {
        if (cancelled || renderTokenRef.current !== renderToken) return;
        setStatus("error");
        setError(nextError instanceof Error ? nextError.message : String(nextError));
      }
    };

    void renderCover();

    return () => {
      cancelled = true;
      renderTokenRef.current += 1;
      pdfRef.current = null;
      loadingTaskRef.current = null;
      void loadingTask.destroy().catch(() => {
        // Ignore cleanup errors when the preview closes mid-render.
      });
    };
  }, [clearContainer, renderPage, src]);

  const handleLoadAllPages = React.useCallback(async () => {
    if (status !== "cover-ready") return;

    const pdf = pdfRef.current;
    if (!pdf) {
      setStatus("error");
      setError("PDF document is not ready.");
      return;
    }

    const renderToken = renderTokenRef.current;
    setStatus("loading-all");

    try {
      for (let pageNumber = 2; pageNumber <= pdf.numPages; pageNumber += 1) {
        await renderPage(pdf, pageNumber, renderToken);
        if (renderTokenRef.current !== renderToken) {
          return;
        }
      }

      if (renderTokenRef.current !== renderToken) {
        return;
      }

      setStatus("loaded");
    } catch (nextError) {
      if (renderTokenRef.current !== renderToken) return;
      setStatus("error");
      setError(nextError instanceof Error ? nextError.message : String(nextError));
    }
  }, [renderPage, status]);

  const handlePreviewClick = React.useCallback(() => {
    void handleLoadAllPages();
  }, [handleLoadAllPages]);

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

  const canLoadAllPages = status === "cover-ready" && pageCount > 1;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-slate-900">
      {(status === "loading-cover" || status === "loading-all" || canLoadAllPages) && (
        <div className="flex shrink-0 items-center justify-center border-b border-slate-800 px-4 py-3 text-center text-sm text-slate-300">
          {status === "loading-cover" && "Preparing PDF cover..."}
          {status === "loading-all" && "Loading remaining pages..."}
          {canLoadAllPages && `Tap the cover to load the remaining ${pageCount - 1} pages.`}
        </div>
      )}
      <div
        className={[
          "min-h-0 flex-1 overflow-auto px-3 py-4",
          canLoadAllPages ? "cursor-pointer" : "",
        ].join(" ")}
        onClick={canLoadAllPages ? handlePreviewClick : undefined}
      >
        <div
          ref={containerRef}
          className="min-h-full"
        />
        {canLoadAllPages && (
          <div className="sticky bottom-3 mt-[-4.5rem] flex justify-center px-3">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void handleLoadAllPages();
              }}
              className="rounded-full border border-slate-600 bg-slate-900/92 px-4 py-2 text-xs text-slate-100 shadow-lg backdrop-blur-sm"
            >
              Load full PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
