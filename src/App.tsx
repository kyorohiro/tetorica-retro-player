import React, { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import {
  FileUp,
  FolderOpen,
  Menu,
  MonitorUp,
  Pin,
  RefreshCw,
  Server,
  X,
} from "lucide-react";
import "./App.css";
import {
  loadLocalePreference,
  resolveLocale,
  saveLocalePreference,
  t,
  type LocalePreference,
} from "./i18n";
import { usePreviewSourceState } from "./retro-player/hooks/usePreviewSourceState";
import { useDialog } from "./useDialog";
import { FileTargetFile } from "./mdrop-web/api";
import { useBrowserFileListDialog } from "./mdrop-web/useBrowserFileListDialog";
import {
  getDroppedFiles,
  isAudio,
  isImage,
  isVideo,
  type FileWithRelativePath,
} from "./mdrop-web/utils";
import { dispatchRetroPlayerPrepareExternalNavigation } from "./retro-player/events";
import { mdropGetServerStatus, mdropStartServer, mdropStopServer } from "./mdrop-web/tauri";

const waitForNextPaint = async () => {
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
};

const waitForExternalNavigationPause = async () => {
  dispatchRetroPlayerPrepareExternalNavigation();
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 120);
  });
};

const isTauriRuntime = () =>
  typeof window !== "undefined" &&
  ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);

const RetroPlayer = React.lazy(() => import("./retro-player/components/RetroPlayer"));

function App() {
  const defaultPreviewSrc = "./test_colorbars.png";
  const defaultPreviewKind = "image";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const pickerStateRef = useRef<"idle" | "opening" | "processing">("idle");
  const previewSource = usePreviewSourceState();
  const [isMDropReady, setIsMDropReady] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isWindowAlwaysOnTop, setIsWindowAlwaysOnTop] = React.useState(false);
  const [isPreparingSelection, setIsPreparingSelection] = React.useState(false);
  const [isPreparingSelectionDismissed, setIsPreparingSelectionDismissed] = React.useState(false);
  const [localePreference, setLocalePreference] = React.useState<LocalePreference>(
    () => loadLocalePreference(),
  );
  const isIosOrAndroid = React.useMemo(() => {
    if (typeof navigator === "undefined") return false;

    const userAgent = navigator.userAgent || "";
    return /Android|iPhone|iPad|iPod/i.test(userAgent);
  }, []);
  const locale = React.useMemo(() => resolveLocale(localePreference), [localePreference]);
  const isUsingDefaultPreview =
    !previewSource.previewSrc && !previewSource.previewStream;
  const retroPlayerKey = "player:root";
  const { showConfirmDialog } = useDialog();
  const { showBrowserFileListDialog } = useBrowserFileListDialog();

  const finishPreparingSelection = useCallback(() => {
    pickerStateRef.current = "idle";
    setIsPreparingSelection(false);
    setIsPreparingSelectionDismissed(false);
  }, []);

  React.useEffect(() => {
    saveLocalePreference(localePreference);
  }, [localePreference]);

  // Desktop: auto-start mDrop server on mount.
  // isMDropReady drives the file picker choice (Tauri dialog vs <input>).
  React.useEffect(() => {
    mdropGetServerStatus()
      .then((status) => { setIsMDropReady(status.running); })
      .catch(() => { setIsMDropReady(false); });
  }, []);

  React.useEffect(() => {
    const clearIfPickerWasCancelled = () => {
      if (pickerStateRef.current !== "opening") return;

      window.setTimeout(() => {
        if (pickerStateRef.current !== "opening") return;
        finishPreparingSelection();
      }, 0);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      clearIfPickerWasCancelled();
    };

    const fileInput = fileInputRef.current;
    const folderInput = folderInputRef.current;

    window.addEventListener("focus", clearIfPickerWasCancelled);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    fileInput?.addEventListener("cancel", clearIfPickerWasCancelled);
    folderInput?.addEventListener("cancel", clearIfPickerWasCancelled);

    return () => {
      window.removeEventListener("focus", clearIfPickerWasCancelled);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      fileInput?.removeEventListener("cancel", clearIfPickerWasCancelled);
      folderInput?.removeEventListener("cancel", clearIfPickerWasCancelled);
    };
  }, [finishPreparingSelection]);

  const beginPreparingSelection = useCallback(() => {
    pickerStateRef.current = "opening";
    flushSync(() => {
      setIsPreparingSelection(true);
      setIsPreparingSelectionDismissed(false);
      setIsMobileMenuOpen(false);
    });
  }, []);

  const showPreparingSelection = useCallback(() => {
    pickerStateRef.current = "processing";
    flushSync(() => {
      setIsPreparingSelection(true);
      setIsPreparingSelectionDismissed(false);
    });
  }, []);

  const dismissPreparingSelection = useCallback(() => {
    flushSync(() => {
      setIsPreparingSelectionDismissed(true);
    });
  }, []);

  const filesToTargets = useCallback((files: FileList | File[]) => {
    const targets: FileTargetFile[] = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index] as FileWithRelativePath;

      targets.push({
        id: "",
        entry: file,
        isDir: false,
        isFile: true,
        path: file.webkitRelativePath || file.name,
        createdAt: 0,
        modifiedAt: file.lastModified ?? 0,
        size: file.size ?? 0,
        isRoot: true,
      });
    }

    return targets;
  }, []);

  const isDirectRetroFile = useCallback((file: File) => {
    return isImage(file.name) || isVideo(file.name) || isAudio(file.name);
  }, []);

  const openPortableTargets = useCallback(async (files: FileList | File[]) => {
    const targets = filesToTargets(files);
    if (targets.length === 0) return;

    await showBrowserFileListDialog({
      files: targets,
      initialPath: "/",
      title: "",
    });
  }, [filesToTargets, showBrowserFileListDialog]);

  const openFiles = useCallback(async (files: FileList | File[]) => {
    if (files.length === 0) return;

    pickerStateRef.current = "processing";

    try {
      await waitForNextPaint();

      if (files.length === 1 && isDirectRetroFile(files[0])) {
        previewSource.previewFile(files[0]);
        return;
      }

      await openPortableTargets(files);
    } finally {
      finishPreparingSelection();
    }
  }, [finishPreparingSelection, isDirectRetroFile, openPortableTargets, previewSource]);

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
      title: t(locale, "captureUnavailableTitle"),
      body: t(locale, "captureUnavailableBody"),
      okText: t(locale, "openPwaPage"),
      cancelText: t(locale, "cancel"),
    });

    if (confirmed) {
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
  }, [locale, previewSource, showConfirmDialog]);

  const onDrop = async (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const droppedFiles = await getDroppedFiles(event);
    const uniqueMap = new Map<string, FileWithRelativePath>();

    for (const file of droppedFiles) {
      const key = file.webkitRelativePath || file.name;
      uniqueMap.set(key, file);
    }

    const targets = Array.from(uniqueMap.values());
    await openFiles(targets);
  };
  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };


  const handleOpenFilePicker = useCallback(async () => {
    await waitForExternalNavigationPause();

    if (isMDropReady) {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const { convertFileSrc } = await import("@tauri-apps/api/core");
      setIsMobileMenuOpen(false);
      const selected = await open({
        multiple: false,
        filters: [
          { name: "Video", extensions: ["mp4", "m4v", "mov", "mkv", "avi", "wmv", "flv", "webm", "ts", "m2ts", "mts", "ogv"] },
          { name: "Audio", extensions: ["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac", "opus", "wma"] },
          { name: "Image", extensions: ["png", "jpg", "jpeg", "webp", "gif", "svg", "avif", "heic", "heif", "bmp"] },
        ],
      });
      if (!selected || Array.isArray(selected)) return;
      previewSource.previewPath(convertFileSrc(selected), selected);
      return;
    }

    beginPreparingSelection();
    fileInputRef.current?.click();
  }, [beginPreparingSelection, isMDropReady, previewSource]);

  const handleOpenFolderPicker = useCallback(async () => {
    if (isIosOrAndroid) return;
    await waitForExternalNavigationPause();

    if (isMDropReady) {
      const { open } = await import("@tauri-apps/plugin-dialog");
      setIsMobileMenuOpen(false);
      const selected = await open({ directory: true, multiple: false });
      if (!selected || Array.isArray(selected)) return;
      // フォルダーは従来通り FileList ダイアログで展開
      const { getFiles } = await import("./mdrop-web/api");
      const files = await getFiles("", selected as string).catch(() => []);
      if (files.length > 0) {
        await showBrowserFileListDialog({ files, initialPath: "/", title: "" });
      }
      return;
    }

    beginPreparingSelection();
    folderInputRef.current?.click();
  }, [beginPreparingSelection, isIosOrAndroid, isMDropReady, showBrowserFileListDialog]);

  const handleOpenDisplayCapture = useCallback(async () => {
    if (isIosOrAndroid) return;
    setIsMobileMenuOpen(false);
    await waitForExternalNavigationPause();
    void handleDisplayCapture();
  }, [handleDisplayCapture, isIosOrAndroid]);

  const handleReloadApp = useCallback(() => {
    setIsMobileMenuOpen(false);
    window.setTimeout(() => {
      window.location.reload();
    }, 80);
  }, []);

  const handleWindowPinToggle = useCallback(async () => {
    const next = !isWindowAlwaysOnTop;
    setIsWindowAlwaysOnTop(next);
    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    await getCurrentWindow().setAlwaysOnTop(next);
  }, [isWindowAlwaysOnTop]);

  const handleMDropToggle = useCallback(async () => {
    if (isMDropReady) {
      await mdropStopServer().catch(() => {});
      setIsMDropReady(false);
    } else {
      await mdropStartServer({ hostname: "localhost", port: "7878", localOnly: true }).catch(() => {});
      const status = await mdropGetServerStatus().catch(() => null);
      setIsMDropReady(status?.running ?? false);
    }
  }, [isMDropReady]);

  const handleChangeLocale = useCallback((nextPreference: LocalePreference) => {
    setLocalePreference(nextPreference);
  }, []);

  return (
    <>
      {/* Fixed nav buttons: kept outside <main> so overflow-x-hidden on <main> cannot clip them in WebKit */}
      <div className="safe-top-offset fixed left-3 z-[9999] flex items-center gap-1">
        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? t(locale, "closeMenu") : t(locale, "openMenu")}
          onClick={() => {
            setIsMobileMenuOpen((current) => !current);
          }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/88 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <button
          type="button"
          aria-label={t(locale, "reloadApp")}
          title={t(locale, "reloadApp")}
          onClick={handleReloadApp}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/88 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
        >
          <RefreshCw size={18} />
        </button>
        {isTauriRuntime() && (
          <button
            type="button"
            aria-label={isWindowAlwaysOnTop ? "Unpin window" : "Pin window on top"}
            title={locale === "ja"
              ? isWindowAlwaysOnTop ? "最前面固定: 解除" : "最前面固定"
              : isWindowAlwaysOnTop ? "Always on top: off" : "Always on top"}
            onClick={() => { void handleWindowPinToggle(); }}
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition",
              isWindowAlwaysOnTop
                ? "border-sky-400/80 bg-sky-500/20 text-sky-700 hover:bg-sky-500/30"
                : "border-slate-300/80 bg-white/88 text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            <Pin size={18} className={isWindowAlwaysOnTop ? "fill-sky-500" : ""} />
          </button>
        )}
        {//{isTauriRuntime() && }
        (
          <button
            type="button"
            aria-label={isMDropReady ? "mDrop: ON" : "mDrop: OFF"}
            title={locale === "ja"
              ? isMDropReady ? "mDrop サーバー: 起動中 (クリックで停止)" : "mDrop サーバー: 停止中 (クリックで起動)"
              : isMDropReady ? "mDrop server: running (click to stop)" : "mDrop server: stopped (click to start)"}
            onClick={() => { void handleMDropToggle(); }}
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition",
              isMDropReady
                ? "border-emerald-400/80 bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30"
                : "border-slate-300/80 bg-white/88 text-slate-500 hover:bg-white",
            ].join(" ")}
          >
            <Server size={18} className={isMDropReady ? "text-emerald-600" : "text-slate-400"} />
          </button>
        )}
      </div>
      {isMobileMenuOpen && (
        <div className="safe-top-menu fixed left-3 z-[9999] w-[min(85vw,20rem)] rounded-2xl border border-slate-300 bg-white p-2 shadow-lg">
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={handleOpenFilePicker}
                    className="rounded-xl border border-dashed border-slate-400 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-sky-500 hover:bg-white"
                  >
                    <span className="flex items-start gap-3">
                      <FileUp className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      <span>
                        <span className="block font-medium text-slate-900">{t(locale, "openFile")}</span>
                        <span className="block text-slate-500">
                          {t(locale, "openFileDetail")}
                        </span>
                      </span>
                    </span>
                  </button>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-xs text-amber-900">
                    <p className="font-semibold">{t(locale, "localFileRecommendationTitle")}</p>
                    <p className="mt-1 leading-5 text-amber-800">
                      {t(locale, "localFileRecommendationDetail")}
                    </p>
                  </div>
                  {!isIosOrAndroid && (
                    <>
                      <button
                        type="button"
                        onClick={handleOpenFolderPicker}
                        className="rounded-xl border border-dashed border-slate-400 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-sky-500 hover:bg-white"
                      >
                        <span className="flex items-start gap-3">
                          <FolderOpen className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <span>
                            <span className="block font-medium text-slate-900">{t(locale, "openFolder")}</span>
                            <span className="block text-slate-500">
                              {t(locale, "openFolderDetail")}
                            </span>
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenDisplayCapture}
                        className="rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-emerald-500/20"
                      >
                        <span className="flex items-start gap-3">
                          <MonitorUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                          <span>
                            <span className="block font-medium text-slate-900">{t(locale, "captureScreen")}</span>
                            <span className="block text-slate-500">
                              {t(locale, "captureScreenDetail")}
                            </span>
                          </span>
                        </span>
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {t(locale, "language")}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      ["auto", t(locale, "auto")],
                      ["en", t(locale, "english")],
                      ["ja", t(locale, "japanese")],
                    ] as const).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          handleChangeLocale(value);
                        }}
                        className={[
                          "rounded-lg border px-3 py-2 text-sm transition",
                          localePreference === value
                            ? "border-sky-500 bg-sky-500/10 text-sky-700"
                            : "border-slate-300 bg-white text-slate-600 hover:border-slate-400",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
      <main
        className="safe-top-pad h-dvh flex flex-col overflow-x-hidden bg-slate-700 text-slate-800"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="relative flex flex-col flex-1 min-h-0 w-full mx-auto max-w-5xl px-4 pt-4 pb-4">
          <header className="shrink-0 mb-3" />

          {previewSource.previewStream && (
          <div className="mb-4">
            <button
              type="button"
              onClick={previewSource.stopPreviewStream}
              className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-slate-700 transition hover:bg-rose-500/20"
            >
              {t(locale, "stopCapture")}
            </button>
          </div>
        )}
        {previewSource.captureError && (
          <p className="mb-4 text-sm text-rose-500">{previewSource.captureError}</p>
        )}

        {isPreparingSelection && !isPreparingSelectionDismissed && (
          <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-slate-950/56 px-4">
            <div
              className="pointer-events-auto w-[min(92vw,28rem)] rounded-2xl border border-slate-700 bg-slate-900/94 px-4 py-4 text-slate-100 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 shrink-0 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {t(locale, "preparingSelection")}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    {t(locale, "preparingSelectionDetail")}
                  </p>
                </div>
                <button
                  type="button"
                  onPointerDown={dismissPreparingSelection}
                  onTouchStart={dismissPreparingSelection}
                  onMouseDown={dismissPreparingSelection}
                  onClick={dismissPreparingSelection}
                  className="shrink-0 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-slate-700"
                >
                  {t(locale, "hideLoadingOverlay")}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-0">
          <React.Suspense fallback={null}>
            <RetroPlayer
              locale={locale}
              key={retroPlayerKey}
              src={previewSource.previewSrc ?? defaultPreviewSrc}
              stream={previewSource.previewStream}
              streamName={previewSource.previewLabel}
              kind={previewSource.previewKind ?? defaultPreviewKind}
              looping={!isUsingDefaultPreview}
            />
          </React.Suspense>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*,.zip,.cbz,.rar,.cbr,.pdf,.epub,.txt,.md"
          multiple
          className="hidden"
          onChange={async (event) => {
            const input = event.currentTarget;
            const files = input.files;
            if (files && files.length > 0) {
              showPreparingSelection();
              await waitForNextPaint();
              await openFiles(files);
            } else {
              finishPreparingSelection();
            }

            input.value = "";
          }}
        />

        {!isIosOrAndroid && (
          <input
            ref={folderInputRef}
            type="file"
            multiple
            {...({ webkitdirectory: "true" } as any)}
            className="hidden"
            onChange={async (event) => {
              const input = event.currentTarget;
              const files = input.files;
              if (files && files.length > 0) {
                showPreparingSelection();
                await waitForNextPaint();
                try {
                  pickerStateRef.current = "processing";
                  await openPortableTargets(files);
                } finally {
                  finishPreparingSelection();
                }
              } else {
                finishPreparingSelection();
              }

              input.value = "";
            }}
          />
        )}
      </div>
    </main>
  </>
  );
}

export default App;
