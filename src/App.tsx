import React, { useCallback, useRef } from "react";
import {
  Menu,
  Pin,
  RefreshCw,
  Waves,
  Wifi,
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
import {
  isTauriRuntime,
  isWindowsRuntime,
} from "./retro-player/platform/runtime";
import { useLongPress } from "./retro-player/hooks/useLongPress";
import { DIALOG_STACK_ACTIVE_EVENT, useDialog } from "./useDialog";
import { FileTargetFile, type TargetFile } from "./mdrop-web/api";
import { useBrowserFileListDialog } from "./mdrop-web/useBrowserFileListDialog";
import {
  getDroppedFiles,
  type FileWithRelativePath,
} from "./mdrop-web/utils";
import {
  dispatchRetroPlayerEnsureAudioContext,
  dispatchRetroPlayerPrepareExternalNavigation,
} from "./retro-player/events";
import { MobileMenu } from "./MobileMenu";
import { LicenseDialog } from "./LicenseDialog";
import type { DemoSongMeta } from "./retro-player-client/builtin-content/demo-songs";
import { mdropUnshareAll } from "./mdrop-web/tauri";
import { usePreviewDialog } from "./mdrop-web/usePreviewDialog";
import { useMDropServer } from "./mdrop-web/useMDropServer";
import { useMDropDragDrop } from "./mdrop-web/useMDropDragDrop";
import { FilePicker, type FilePickerHandle } from "./mdrop-web/FilePicker";
import { RetroPlayerPlus, type RetroPlayerPlusHandle } from "./retro-player-client/RetroPlayerPlus";

const waitForExternalNavigationPause = async () => {
  dispatchRetroPlayerPrepareExternalNavigation();
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 120);
  });
};

function App() {
  const retroPlayerPlusRef = useRef<RetroPlayerPlusHandle>(null);
  const filePickerRef = useRef<FilePickerHandle>(null);
  const [isFfmpegEnabled, setIsFfmpegEnabled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isToolbarHidden, setIsToolbarHidden] = React.useState(false);
  type LoopMode = "one" | "autoplay" | "all" | "off";
  const [loopMode, setLoopMode] = React.useState<LoopMode>("one");
  const loopModeRef = React.useRef<LoopMode>(loopMode);
  React.useEffect(() => { loopModeRef.current = loopMode; }, [loopMode]);
  const cycleLoopMode = React.useCallback(() => {
    setLoopMode((m) => m === "one" ? "autoplay" : m === "autoplay" ? "all" : m === "all" ? "off" : "one");
  }, []);
  const [isDialogActive, setIsDialogActive] = React.useState(false);
  const [isWindowAlwaysOnTop, setIsWindowAlwaysOnTop] = React.useState(false);
  const [localePreference, setLocalePreference] = React.useState<LocalePreference>(
    () => loadLocalePreference(),
  );
  const isIosOrAndroid = React.useMemo(() => {
    if (typeof navigator === "undefined") return false;

    const userAgent = navigator.userAgent || "";
    return /Android|iPhone|iPad|iPod/i.test(userAgent);
  }, []);
  const locale = React.useMemo(() => resolveLocale(localePreference), [localePreference]);
  const previewSource = usePreviewSourceState(locale);
  const shouldPreferDialogRetroPreview = React.useMemo(
    () => isTauriRuntime() && isWindowsRuntime(),
    [],
  );
  const { showConfirmDialog, showSelectDialog, showDialog } = useDialog();
  const { showBrowserFileListDialog } = useBrowserFileListDialog();
  const { showPreviewDialog } = usePreviewDialog();
  const {
    isMDropReady,
    mDropPort,
    mDropIp,
    isShareMode,
    isNativeMdropAvailable,
    isMDropReadyRef,
    isMDropHolding,
    mDropLongPressHandlers,
  } = useMDropServer();

  React.useEffect(() => {
    const handleDialogActive = (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      setIsDialogActive(Boolean(detail?.active));
    };

    window.addEventListener(
      DIALOG_STACK_ACTIVE_EVENT,
      handleDialogActive as EventListener,
    );

    return () => {
      window.removeEventListener(
        DIALOG_STACK_ACTIVE_EVENT,
        handleDialogActive as EventListener,
      );
    };
  }, []);

  React.useEffect(() => {
    saveLocalePreference(localePreference);
  }, [localePreference]);

  const isFfmpegEnabledRef = React.useRef(isFfmpegEnabled);
  React.useEffect(() => {
    isFfmpegEnabledRef.current = isFfmpegEnabled;
  }, [isFfmpegEnabled]);

  useMDropDragDrop({
    isMDropReadyRef,
    isFfmpegEnabledRef,
    loopModeRef,
    retroPlayerPlusRef,
    showBrowserFileListDialog,
  });

  const showDialogPreviewForBrowserFiles = useCallback(async (files: FileList | File[]) => {
    const previewFiles = Array.from(files).map((file) => ({
      id: "",
      entry: file,
      isDir: false,
      isFile: true,
      path: file.name,
      createdAt: 0,
      modifiedAt: file.lastModified ?? 0,
      size: file.size ?? 0,
      isRoot: true,
    } satisfies FileTargetFile));

    await showPreviewDialog({
      files: previewFiles,
      initialIndex: 0,
      isRetro: true,
      apiServer: ".",
      getObjectUrl: async (file: TargetFile) =>
        URL.createObjectURL((file as FileTargetFile).entry!),
      download: async (file: TargetFile) => {
        const entry = (file as FileTargetFile).entry!;
        const url = URL.createObjectURL(entry);
        try {
          const a = document.createElement("a");
          a.href = url;
          a.download = file.path.replace(/.*\//, "");
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } finally {
          URL.revokeObjectURL(url);
        }
      },
    });
  }, [showPreviewDialog]);

  const showDialogPreviewForPath = useCallback(async (url: string, path: string) => {
    const previewFile: TargetFile = {
      id: path || url,
      path,
      isFile: true,
      isDir: false,
      size: 0,
      createdAt: undefined,
      modifiedAt: undefined,
    };

    await showPreviewDialog({
      files: [previewFile],
      initialIndex: 0,
      isRetro: true,
      getObjectUrl: async () => url,
      download: async () => {
        const a = document.createElement("a");
        a.href = url;
        a.download = path.replace(/.*\//, "") || "download";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
    });
  }, [showPreviewDialog]);

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

  const handleOpenMicrophone = useCallback(async () => {
    setIsMobileMenuOpen(false);
    retroPlayerPlusRef.current?.stopBuiltinPlayback();
    dispatchRetroPlayerEnsureAudioContext();
    await previewSource.startMicrophoneInput();
  }, [previewSource]);

  const handleOpenCamera = useCallback(async () => {
    setIsMobileMenuOpen(false);
    retroPlayerPlusRef.current?.stopBuiltinPlayback();
    dispatchRetroPlayerEnsureAudioContext();
    await previewSource.startCameraInput();
  }, [previewSource]);

  const handleSelectMicrophoneDevice = useCallback(async () => {
    setIsMobileMenuOpen(false);
    const audioInputs = await previewSource.refreshAudioInputDevices();

    if (audioInputs.length === 0) {
      await showConfirmDialog({
        title: t(locale, "selectMicrophoneTitle"),
        body: t(locale, "microphoneUnavailable"),
        okText: t(locale, "cancel"),
      });
      return;
    }

    const selectedDeviceId = await showSelectDialog({
      title: t(locale, "selectMicrophoneTitle"),
      message: t(locale, "selectMicrophoneMessage"),
      options: audioInputs.map((device, index) => ({
        value: device.deviceId,
        label: device.label || `${t(locale, "inputMicrophone")} ${index + 1}`,
        description:
          device.deviceId === previewSource.preferredAudioInputDeviceId
            ? locale === "ja" ? "現在選択中" : "Currently selected"
            : undefined,
      })),
      cancelText: t(locale, "cancel"),
    });

    if (!selectedDeviceId) {
      return;
    }

    previewSource.setPreferredAudioInputDeviceId(selectedDeviceId);

    const currentLabel = previewSource.previewLabel;
    if (currentLabel === "Microphone") {
      retroPlayerPlusRef.current?.stopBuiltinPlayback();
      dispatchRetroPlayerEnsureAudioContext();
      await previewSource.startMicrophoneInput(selectedDeviceId);
      return;
    }

    if (currentLabel === "Camera") {
      retroPlayerPlusRef.current?.stopBuiltinPlayback();
      dispatchRetroPlayerEnsureAudioContext();
      await previewSource.startCameraInput(selectedDeviceId);
    }
  }, [locale, previewSource, showConfirmDialog, showSelectDialog]);

  const onDrop = async (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("[onDrop] React DragEvent fired (browser-context drop)");
    // mDrop ON in Tauri: onDragDropEvent handles it via HTTP; skip DOM path to avoid double handling
    if (isTauriRuntime() && isMDropReadyRef.current) return;
    const droppedFiles = await getDroppedFiles(event);
    const uniqueMap = new Map<string, FileWithRelativePath>();
    for (const file of droppedFiles) {
      const key = file.webkitRelativePath || file.name;
      uniqueMap.set(key, file);
    }
    const targets = Array.from(uniqueMap.values());
    await filePickerRef.current?.openDroppedFiles(targets);
  };
  const onDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };


  const handleOpenFilePicker = useCallback(async () => {
    await waitForExternalNavigationPause();

    if (isNativeMdropAvailable && isMDropReady) {
      const { open } = await import("@tauri-apps/plugin-dialog");
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
      const { invoke } = await import("@tauri-apps/api/core");
      await mdropUnshareAll().catch(() => {});
      const shared = await invoke<{ id: string; name: string; path: string; url: string }>(
        "mdrop_share_file",
        { req: { path: selected } }
      );
      const playUrl = isFfmpegEnabled
        ? `${new URL(shared.url).origin}/hls/${shared.id}/index.m3u8`
        : shared.url;
      retroPlayerPlusRef.current?.loadPaths([{ url: playUrl, path: selected }]);
      // Save restorable URLs (HTTP) as startup preset so the player retries on next launch.
      if (playUrl.startsWith('http')) {
        retroPlayerPlusRef.current?.rememberUrlPreset(playUrl, selected);
      }
      return;
    }

    filePickerRef.current?.openFileInput();
  }, [isFfmpegEnabled, isMDropReady, isNativeMdropAvailable]);

  const handleOpenFolderPicker = useCallback(async () => {
    if (isIosOrAndroid) return;
    await waitForExternalNavigationPause();

    if (isNativeMdropAvailable && isMDropReady) {
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

    filePickerRef.current?.openFolderInput();
  }, [isIosOrAndroid, isMDropReady, isNativeMdropAvailable, showBrowserFileListDialog]);

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

  const { isHolding: isMenuHolding, ...menuLongPressHandlers } = useLongPress(
    useCallback(() => {
      setIsMobileMenuOpen(false);
      setIsToolbarHidden(true);
    }, []),
    useCallback(() => {
      setIsMobileMenuOpen((current) => !current);
    }, []),
  );

  const handleWindowPinToggle = useCallback(async () => {
    const next = !isWindowAlwaysOnTop;
    setIsWindowAlwaysOnTop(next);
    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    await getCurrentWindow().setAlwaysOnTop(next);
  }, [isWindowAlwaysOnTop]);

  const handleChangeLocale = useCallback((nextPreference: LocalePreference) => {
    setLocalePreference(nextPreference);
  }, []);

  const handleOpenLicenses = useCallback(() => {
    setIsMobileMenuOpen(false);
    void showDialog<void>(({ close }) => (
      <LicenseDialog locale={locale} onClose={close} />
    ));
  }, [showDialog, locale]);

  return (
    <>
      {/* Fixed nav buttons: kept outside <main> so overflow-x-hidden on <main> cannot clip them in WebKit */}
      {isToolbarHidden ? (
        <div className="safe-top-offset fixed left-3 z-9999">
          <button
            type="button"
            aria-label="Show toolbar"
            onClick={() => setIsToolbarHidden(false)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/50 bg-white/40 text-slate-500 shadow-sm backdrop-blur-sm transition hover:bg-white/80 hover:text-slate-700"
          >
            <Menu size={13} />
          </button>
        </div>
      ) : (
        <div className="safe-top-offset fixed left-3 z-9999 flex items-center gap-1">
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? t(locale, "closeMenu") : t(locale, "openMenu")}
            {...menuLongPressHandlers}
            className={[
              "relative select-none overflow-hidden inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition",
              isMenuHolding
                ? "border-slate-400/80 bg-slate-200/80 text-slate-700"
                : "border-slate-300/80 bg-white/88 text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            {isMenuHolding && (
              <span
                className="pointer-events-none absolute inset-0 origin-left bg-slate-400/20"
                style={{ animation: "long-press-charge 0.6s linear forwards" }}
              />
            )}
            {isMobileMenuOpen ? <X size={18} className="relative z-10" /> : <Menu size={18} className="relative z-10" />}
          </button>
          <button
            type="button"
            aria-label={t(locale, "reloadApp")}
            title={t(locale, "reloadApp")}
            onClick={handleReloadApp}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/88 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white"
          >
            <RefreshCw size={16} />
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
                "inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition",
                isWindowAlwaysOnTop
                  ? "border-sky-400/80 bg-sky-500/20 text-sky-700 hover:bg-sky-500/30"
                  : "border-slate-300/80 bg-white/88 text-slate-700 hover:bg-white",
              ].join(" ")}
            >
              <Pin size={16} className={isWindowAlwaysOnTop ? "fill-sky-500" : ""} />
            </button>
          )}
        </div>
      )}
      {/* mDrop / ffmpeg pills — top-right */}
      {isNativeMdropAvailable && (
        <div className={["safe-top-offset-right fixed right-10 z-9999 flex flex-col items-end gap-0.5", isToolbarHidden ? "hidden" : ""].join(" ")}>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={isMDropReady ? (isShareMode ? "mDrop: Share" : "mDrop: ON") : "mDrop: OFF"}
              title={locale === "ja"
                ? isMDropReady
                  ? isShareMode
                    ? "mDrop シェアモード: ON (長押しで OFF)"
                    : "mDrop サーバー: 起動中 (クリックで停止 / 長押しでシェアモード ON)"
                  : "mDrop サーバー: 停止中 (クリックで起動)"
                : isMDropReady
                  ? isShareMode
                    ? "mDrop share mode: ON (long press to disable)"
                    : "mDrop server: running (click to stop / long press for share mode)"
                  : "mDrop server: stopped (click to start)"}
              {...mDropLongPressHandlers}
              className={[
                "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium shadow-md backdrop-blur-sm transition",
                isMDropHolding
                  ? "border-amber-400/80 bg-amber-500/30 text-amber-700"
                  : isMDropReady && isShareMode
                  ? "border-amber-400/80 bg-amber-500/20 text-amber-700 hover:bg-amber-500/30"
                  : isMDropReady
                  ? "border-emerald-400/80 bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30"
                  : "border-slate-300/80 bg-white/88 text-slate-500 hover:bg-white",
              ].join(" ")}
            >
              <Wifi size={13} />
              <span>mDrop{isShareMode ? " ↑" : ""}</span>
            </button>
            {isMDropReady && (
              <button
                type="button"
                aria-label={isFfmpegEnabled ? "ffmpeg: ON" : "ffmpeg: OFF"}
                title={locale === "ja"
                  ? isFfmpegEnabled ? "ffmpeg ストリーミング: ON (クリックで OFF)" : "ffmpeg ストリーミング: OFF (クリックで ON)"
                  : isFfmpegEnabled ? "ffmpeg streaming: ON (click to disable)" : "ffmpeg streaming: OFF (click to enable)"}
                onClick={() => setIsFfmpegEnabled((v) => !v)}
                className={[
                  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium shadow-md backdrop-blur-sm transition",
                  isFfmpegEnabled
                    ? "border-violet-400/80 bg-violet-500/20 text-violet-700 hover:bg-violet-500/30"
                    : "border-slate-300/80 bg-white/88 text-slate-500 hover:bg-white",
                ].join(" ")}
              >
                <Waves size={13} />
                <span>ffmpeg</span>
              </button>
            )}
          </div>
          {isMDropReady && mDropPort && (
            <span className="-mt-1.5 px-1 font-mono text-[10px] text-slate-500">
              {mDropIp ? `${mDropIp}:${mDropPort}` : `:${mDropPort}`}
            </span>
          )}
        </div>
      )}
      {isMobileMenuOpen && (
        <MobileMenu
          locale={locale}
          localePreference={localePreference}
          isIosOrAndroid={isIosOrAndroid}
          onOpenFile={handleOpenFilePicker}
          onOpenFolder={handleOpenFolderPicker}
          onCapture={handleOpenDisplayCapture}
          onOpenMicrophone={() => { void handleOpenMicrophone(); }}
          onOpenCamera={() => { void handleOpenCamera(); }}
          onSelectMicrophoneDevice={() => { void handleSelectMicrophoneDevice(); }}
          onPresetVideo={() => { setIsMobileMenuOpen(false); retroPlayerPlusRef.current?.playPresetVideo(); }}
          onPresetImage={() => { setIsMobileMenuOpen(false); retroPlayerPlusRef.current?.playPresetImage(); }}
          onPresetLofi={() => { setIsMobileMenuOpen(false); void retroPlayerPlusRef.current?.playPresetLofi(); }}
          onPresetDemoSong={(meta: DemoSongMeta) => { setIsMobileMenuOpen(false); void retroPlayerPlusRef.current?.playPresetDemoSong(meta); }}
          onChangeLocale={handleChangeLocale}
          onOpenLicenses={handleOpenLicenses}
        />
      )}
      <main
        className="safe-top-pad h-dvh flex flex-col overflow-x-hidden bg-slate-700 text-slate-800"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="relative flex flex-col flex-1 min-h-0 w-full mx-auto max-w-5xl px-4 pt-4 pb-4">
          <header className="shrink-0 mb-3" />

          {previewSource.previewStream && previewSource.previewStreamSource !== "audio-preview" && (
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

        <FilePicker
          ref={filePickerRef}
          locale={locale}
          isIosOrAndroid={isIosOrAndroid}
          loopModeRef={loopModeRef}
          retroPlayerPlusRef={retroPlayerPlusRef}
          showBrowserFileListDialog={showBrowserFileListDialog}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <RetroPlayerPlus
          ref={retroPlayerPlusRef}
          locale={locale}
          previewSource={previewSource}
          isDialogActive={isDialogActive}
          isMDropReadyRef={isMDropReadyRef}
          setIsFfmpegEnabled={setIsFfmpegEnabled}
          shouldPreferDialogRetroPreview={shouldPreferDialogRetroPreview}
          showDialogPreviewForPath={showDialogPreviewForPath}
          showDialogPreviewForBrowserFiles={showDialogPreviewForBrowserFiles}
          loopMode={loopMode}
          onCycleLoopMode={cycleLoopMode}
        />

      </div>
    </main>
  </>
  );
}

export default App;
