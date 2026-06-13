import React, { useCallback, useRef } from "react";
import {
  FileUp,
  FolderOpen,
  Menu,
  MonitorUp,
  RefreshCw,
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
import RetroPlayer from "./retro-player/components/RetroPlayer";
import { usePreviewSourceState } from "./retro-player/hooks/usePreviewSourceState";
import { useDialog } from "./useDialog";
import { FileTargetFile } from "./mdrop-web/api";
import { useBrowserFileListDialog } from "./mdrop-web/useBrowserFileListDialog";
import { RETRO_PREVIEW_DIALOG_EVENT } from "./mdrop-web/usePreviewDialog";
import {
  getDroppedFiles,
  isAudio,
  isImage,
  isVideo,
  type FileWithRelativePath,
} from "./mdrop-web/utils";

function App() {
  const defaultPreviewSrc = "./test_colorbars.png";
  const defaultPreviewKind = "image";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const previewSource = usePreviewSourceState();
  const [isRetroPreviewDialogActive, setIsRetroPreviewDialogActive] = React.useState(false);
  const [retroPlayerEpoch, setRetroPlayerEpoch] = React.useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
  const retroPlayerKey = previewSource.previewStream
    ? `stream:${previewSource.previewStream.id}:${previewSource.previewLabel ?? ""}:${retroPlayerEpoch}`
    : previewSource.previewSrc
      ? `src:${previewSource.previewSrc}:${previewSource.previewKind ?? "unknown"}:${retroPlayerEpoch}`
      : `default:${defaultPreviewSrc}:${defaultPreviewKind}:${retroPlayerEpoch}`;
  const { showConfirmDialog } = useDialog();
  const { showBrowserFileListDialog } = useBrowserFileListDialog();

  React.useEffect(() => {
    saveLocalePreference(localePreference);
  }, [localePreference]);

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

    if (files.length === 1 && isDirectRetroFile(files[0])) {
      previewSource.previewFile(files[0]);
      setIsMobileMenuOpen(false);
      return;
    }

    setIsMobileMenuOpen(false);
    await openPortableTargets(files);
  }, [isDirectRetroFile, openPortableTargets, previewSource]);

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

  React.useEffect(() => {
    const handleRetroPreviewDialog = (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      const isActive = Boolean(detail?.active);
      setIsRetroPreviewDialogActive(isActive);
      if (!isActive) {
        setRetroPlayerEpoch((current) => current + 1);
      }
    };

    window.addEventListener(
      RETRO_PREVIEW_DIALOG_EVENT,
      handleRetroPreviewDialog as EventListener,
    );

    return () => {
      window.removeEventListener(
        RETRO_PREVIEW_DIALOG_EVENT,
        handleRetroPreviewDialog as EventListener,
      );
    };
  }, []);

  const handleOpenFilePicker = useCallback(() => {
    fileInputRef.current?.click();
    setIsMobileMenuOpen(false);
  }, []);

  const handleOpenFolderPicker = useCallback(() => {
    if (isIosOrAndroid) return;
    folderInputRef.current?.click();
    setIsMobileMenuOpen(false);
  }, [isIosOrAndroid]);

  const handleOpenDisplayCapture = useCallback(() => {
    if (isIosOrAndroid) return;
    setIsMobileMenuOpen(false);
    void handleDisplayCapture();
  }, [handleDisplayCapture, isIosOrAndroid]);

  const handleReloadApp = useCallback(() => {
    setIsMobileMenuOpen(false);
    window.setTimeout(() => {
      window.location.reload();
    }, 80);
  }, []);

  const handleChangeLocale = useCallback((nextPreference: LocalePreference) => {
    setLocalePreference(nextPreference);
  }, []);

  return (
    <main
      className="safe-top-pad min-h-screen overflow-x-hidden overflow-y-auto bg-slate-200 text-slate-800"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="relative mx-auto max-w-5xl px-4 py-4">
        <header className="mb-3">
          <div className="relative">
            <button
              type="button"
              aria-label={t(locale, "reloadApp")}
              title={t(locale, "reloadApp")}
              onClick={handleReloadApp}
              className="safe-top-offset fixed left-[3.85rem] z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/88 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <RefreshCw size={18} />
            </button>
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? t(locale, "closeMenu") : t(locale, "openMenu")}
              onClick={() => {
                setIsMobileMenuOpen((current) => !current);
              }}
              className="safe-top-offset fixed left-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/88 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            {isMobileMenuOpen && (
              <div className="safe-top-menu fixed left-3 z-30 w-[min(85vw,20rem)] rounded-2xl border border-slate-300 bg-white p-2 shadow-lg">
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
          </div>
        </header>

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

        {isRetroPreviewDialogActive ? (
          <section className="rounded-2xl border border-slate-300 bg-slate-100/80 p-5 text-center text-sm text-slate-500">
            {t(locale, "retroPreviewActive")}
          </section>
        ) : (
          <RetroPlayer
            locale={locale}
            key={retroPlayerKey}
            src={previewSource.previewSrc ?? defaultPreviewSrc}
            stream={previewSource.previewStream}
            streamName={previewSource.previewLabel}
            kind={previewSource.previewKind ?? defaultPreviewKind}
            looping={!isUsingDefaultPreview}
          />
        )}

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
              await openFiles(files);
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
                await openPortableTargets(files);
              }

              input.value = "";
            }}
          />
        )}
      </div>
    </main>
  );
}

export default App;
