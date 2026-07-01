import React, { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
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
import { useLongPress } from "./retro-player/hooks/useLongPress";
import { DIALOG_STACK_ACTIVE_EVENT, useDialog } from "./useDialog";
import { FileTargetFile, type TargetFile } from "./mdrop-web/api";
import { useBrowserFileListDialog } from "./mdrop-web/useBrowserFileListDialog";
import {
  getDroppedFiles,
  isAudio,
  isImage,
  isVideo,
  isVideoExtended,
  mimeFromPath,
  type FileWithRelativePath,
} from "./mdrop-web/utils";
import {
  dispatchRetroPlayerPausePlayback,
  dispatchRetroPlayerEnsureAudioContext,
  dispatchRetroPlayerPrepareExternalNavigation,
} from "./retro-player/events";
import { MobileMenu } from "./MobileMenu";
import type { DemoSongMeta } from "./builtin-content/demo-songs";
import { type PresetConfig, loadStartupPreset, saveStartupPreset } from "./builtin-content/preset-config";
import { mdropGetConfig, mdropGetServerStatus, mdropShareFile, mdropStartServer, mdropStopServer, mdropUnshareAll } from "./mdrop-web/tauri";
import { useMDropSharedListDialog } from "./mdrop-web/useMDropSharedListDialog";
import { RETRO_PREVIEW_DIALOG_EVENT, usePreviewDialog } from "./mdrop-web/usePreviewDialog";
import type { RetroPlaybackEvent } from "./retro-player/hooks/usePixiVideoPlayer";

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

const isWindowsRuntime = () => {
  if (typeof navigator === "undefined") return false;
  return /Windows/i.test(navigator.userAgent || "");
};

const isAndroidRuntime = () => {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent || "");
};

const RetroPlayer = React.lazy(() => import("./retro-player/components/RetroPlayer"));

const preloadToneBuiltins = () => {
  void import("tone");
  void import("./builtin-content/lofi-engine");
  void import("./builtin-content/demo-song-session");
  void import("./builtin-content/demo-songs");
};

function App() {
  // Initialize from localStorage so the first render never shows colorbars
  // when the startup preset is a ToneJS or URL type.
  const [startupPreset] = React.useState<PresetConfig>(() => loadStartupPreset());
  const defaultPreviewSrc: string | undefined =
    startupPreset.type === 'colorbars-image' ? './test_colorbars.png' :
    startupPreset.type === 'colorbars-video' ? './test_colorbars.mp4' :
    startupPreset.type === 'url' ? startupPreset.url :
    undefined; // lofi / demo-song → audio UI, no src needed
  const defaultPreviewKind: "video" | "audio" | "image" =
    startupPreset.type === 'colorbars-image' ? 'image' :
    startupPreset.type === 'colorbars-video' ? 'video' :
    startupPreset.type === 'url' ? 'video' :
    'audio'; // lofi / demo-song
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const pickerStateRef = useRef<"idle" | "opening" | "processing">("idle");
  const previewSource = usePreviewSourceState();
  const [isMDropReady, setIsMDropReady] = React.useState(false);
  const [mDropPort, setMDropPort] = React.useState<number | null>(null);
  const [mDropIp, setMDropIp] = React.useState<string | null>(null);
  const [isFfmpegEnabled, setIsFfmpegEnabled] = React.useState(false);
  const [isShareMode, setIsShareMode] = React.useState(false);
  const isShareModeRef = React.useRef(isShareMode);
  React.useEffect(() => { isShareModeRef.current = isShareMode; }, [isShareMode]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isToolbarHidden, setIsToolbarHidden] = React.useState(false);
  type PlaylistItem = { kind: "file"; file: File } | { kind: "path"; url: string; path: string };
  const playlistRef = React.useRef<PlaylistItem[]>([]);
  const [playlistLength, setPlaylistLength] = React.useState(0);
  const [_playlistIndex, setPlaylistIndex] = React.useState(0);
  type LoopMode = "one" | "autoplay" | "all" | "off";
  const [loopMode, setLoopMode] = React.useState<LoopMode>("one");
  const loopModeRef = React.useRef<LoopMode>(loopMode);
  React.useEffect(() => { loopModeRef.current = loopMode; }, [loopMode]);
  const cycleLoopMode = React.useCallback(() => {
    setLoopMode((m) => m === "one" ? "autoplay" : m === "autoplay" ? "all" : m === "all" ? "off" : "one");
  }, []);
  const toneCleanupRef = React.useRef<(() => void) | null>(null);
  const currentPresetConfigRef = React.useRef<PresetConfig>(startupPreset);
  // 'pending' = loading (dark overlay covers colorbars flash)
  // 'blocked' = AudioContext suspended (Safari) → shows Touch & Play button
  // 'done'    = playing or user chose something else
  type AutoStartState = 'pending' | 'blocked' | 'done';
  const [autoStartState, setAutoStartState] = React.useState<AutoStartState>('blocked');
  const [isDialogActive, setIsDialogActive] = React.useState(false);
  const [isPreviewDialogActive, setIsPreviewDialogActive] = React.useState(false);
  const isPreviewDialogActiveRef = React.useRef(false);
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
  const isAndroidTauri = React.useMemo(
    () => isTauriRuntime() && isAndroidRuntime(),
    [],
  );
  const isNativeMdropAvailable = React.useMemo(
    () => isTauriRuntime() && !isAndroidTauri,
    [isAndroidTauri],
  );
  const shouldPreferDialogRetroPreview = React.useMemo(
    () => isTauriRuntime() && isWindowsRuntime(),
    [],
  );
  const isUsingDefaultPreview =
    !previewSource.previewSrc && !previewSource.previewStream;
  const retroPlayerKey = "player:root";
  const { showConfirmDialog, showSelectDialog } = useDialog();
  const { showBrowserFileListDialog } = useBrowserFileListDialog();
  const { showMDropSharedListDialog } = useMDropSharedListDialog();
  const { showPreviewDialog } = usePreviewDialog();

  React.useEffect(() => {
    const idleCallback = window.setTimeout(() => {
      preloadToneBuiltins();
    }, 800);
    return () => {
      window.clearTimeout(idleCallback);
    };
  }, []);

  React.useEffect(() => {
    isPreviewDialogActiveRef.current = isPreviewDialogActive;
  }, [isPreviewDialogActive]);

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
    const handlePreviewDialogActive = (event: Event) => {
      const detail = (event as CustomEvent<{ active?: boolean }>).detail;
      setIsPreviewDialogActive(Boolean(detail?.active));
    };

    window.addEventListener(
      RETRO_PREVIEW_DIALOG_EVENT,
      handlePreviewDialogActive as EventListener,
    );

    return () => {
      window.removeEventListener(
        RETRO_PREVIEW_DIALOG_EVENT,
        handlePreviewDialogActive as EventListener,
      );
    };
  }, []);

  const finishPreparingSelection = useCallback(() => {
    pickerStateRef.current = "idle";
    setIsPreparingSelection(false);
    setIsPreparingSelectionDismissed(false);
  }, []);

  React.useEffect(() => {
    saveLocalePreference(localePreference);
  }, [localePreference]);

  // Restore startup preset on mount.
  // ToneJS presets: do nothing — stay 'blocked' so Touch & Play shows.
  //   handleRetry builds the session when the user taps.
  // URL/ColorBar presets: load immediately and mark 'done'.
  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      if (cancelled) return;
      try {
        const preset = currentPresetConfigRef.current;
        if (preset.type === 'lofi' || preset.type === 'demo-song') {
          // Stay 'blocked' — Touch & Play required before audio starts.
        } else if (preset.type === 'colorbars-video') {
          previewSourceRef.current.previewPath('./test_colorbars.mp4', 'test_colorbars.mp4');
          setAutoStartState('done');
        } else if (preset.type === 'colorbars-image') {
          previewSourceRef.current.previewPath('./test_colorbars.png', 'test_colorbars.png');
          setAutoStartState('done');
        } else if (preset.type === 'url') {
          previewSourceRef.current.previewPath(preset.url, preset.label);
          setAutoStartState('done');
        }
      } catch { setAutoStartState('done'); }
    })();

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Desktop: auto-start mDrop server on mount.
  // isMDropReady drives the file picker choice (Tauri dialog vs <input>).
  React.useEffect(() => {
    if (!isNativeMdropAvailable) {
      setIsMDropReady(false);
      return;
    }
    mdropGetServerStatus()
      .then((status) => { setIsMDropReady(status.running); })
      .catch(() => { setIsMDropReady(false); });
  }, [isNativeMdropAvailable]);

  // Sync mDrop API key + actual port into window.__MDROP_CONFIG__.
  React.useEffect(() => {
    if (!isNativeMdropAvailable || !isMDropReady) return;
    Promise.all([mdropGetConfig(), mdropGetServerStatus()]).then(([config, status]) => {
      if (!window.__MDROP_CONFIG__) window.__MDROP_CONFIG__ = {};
      window.__MDROP_CONFIG__.apiKey = config.apiKey;
      window.__MDROP_CONFIG__.apiServer = `http://localhost:${status.port ?? 7878}`;
      setMDropPort(status.port);
      setMDropIp(status.ips?.[0] ?? null);
    }).catch(() => {});
  }, [isMDropReady, isNativeMdropAvailable]);

  // Refs to avoid stale closures in async Tauri event callbacks
  const isMDropReadyRef = React.useRef(isMDropReady);
  React.useEffect(() => {
    isMDropReadyRef.current = isMDropReady;
  }, [isMDropReady]);

  const isFfmpegEnabledRef = React.useRef(isFfmpegEnabled);
  React.useEffect(() => {
    isFfmpegEnabledRef.current = isFfmpegEnabled;
  }, [isFfmpegEnabled]);

  const previewSourceRef = React.useRef(previewSource);
  React.useEffect(() => {
    previewSourceRef.current = previewSource;
  }, [previewSource]);

  const showMDropSharedListDialogRef = React.useRef(showMDropSharedListDialog);
  React.useEffect(() => {
    showMDropSharedListDialogRef.current = showMDropSharedListDialog;
  }, [showMDropSharedListDialog]);

  const showBrowserFileListDialogRef = React.useRef(showBrowserFileListDialog);
  React.useEffect(() => {
    showBrowserFileListDialogRef.current = showBrowserFileListDialog;
  }, [showBrowserFileListDialog]);

  // Tauri native OS drag-drop → mDrop HTTP URL
  React.useEffect(() => {
    if (!isTauriRuntime()) return;

    let unlisten: (() => void) | undefined;

    const setup = async () => {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      unlisten = await getCurrentWindow().onDragDropEvent(async (event) => {
        console.log("[mDrop] onDragDropEvent", event.payload.type, event.payload);
        if (event.payload.type !== "drop") return;

        const paths = event.payload.paths;
        console.log("[mDrop] paths:", paths, "isMDropReady:", isMDropReadyRef.current);
        if (paths.length === 0) return;

        try {
          if (isMDropReadyRef.current) {
            // mDrop ON: clear stale list first, then share new files
            await mdropUnshareAll().catch(() => {});
            const raw = await Promise.all(paths.map((p) => mdropShareFile(p)));
            const sharedFiles = isFfmpegEnabledRef.current
              ? raw.map((f) => ({
                  ...f,
                  url: (f.isDir || (!isVideoExtended(f.path) && !isAudio(f.path)))
                    ? f.url
                    : `${new URL(f.url).origin}/hls/${f.id}/index.m3u8`,
                }))
              : raw;
            const mediaShared = sharedFiles.filter((f) => !f.isDir && (isVideoExtended(f.path) || isAudio(f.path) || isImage(f.path)));
            const isPlaylistMode = (loopModeRef.current === "autoplay" || loopModeRef.current === "all") && mediaShared.length > 1 && mediaShared.length === sharedFiles.length;
            if (sharedFiles.length === 1 && mediaShared.length === 1) {
              const f = sharedFiles[0];
              playlistRef.current = [{ kind: "path", url: f.url, path: f.path }];
              setPlaylistLength(1);
              setPlaylistIndex(0);
              currentPlayingPathRef.current = f.path;
              setShowFfmpegRetry(false);
              previewSourceRef.current.previewPath(f.url, f.path);
            } else if (isPlaylistMode) {
              playlistRef.current = mediaShared.map((f) => ({ kind: "path" as const, url: f.url, path: f.path }));
              setPlaylistLength(mediaShared.length);
              setPlaylistIndex(0);
              currentPlayingPathRef.current = mediaShared[0].path;
              setShowFfmpegRetry(false);
              previewSourceRef.current.previewPath(mediaShared[0].url, mediaShared[0].path);
            } else {
              await showMDropSharedListDialogRef.current({
                files: sharedFiles,
                useHls: isFfmpegEnabledRef.current,
                onPlay: (url, path) => {
                  currentPlayingPathRef.current = path;
                  setShowFfmpegRetry(false);
                  previewSourceRef.current.previewPath(url, path);
                },
              });
            }
          } else {
            // mDrop OFF: Tauri intercepts OS drag-drop; DOM events do not fire.
            // Use asset:// protocol (assetProtocol.enable: true in tauri.conf.json).
            const { convertFileSrc } = await import("@tauri-apps/api/core");

            const isAllMedia = paths.every((p) => isVideo(p) || isAudio(p) || isImage(p));
            const isPlaylistMode = (loopModeRef.current === "autoplay" || loopModeRef.current === "all") && paths.length > 1 && isAllMedia;
            if (paths.length === 1 && isAllMedia) {
              playlistRef.current = [{ kind: "path", url: convertFileSrc(paths[0]), path: paths[0] }];
              setPlaylistLength(1);
              setPlaylistIndex(0);
              currentPlayingPathRef.current = paths[0];
              setShowFfmpegRetry(false);
              previewSourceRef.current.previewPath(convertFileSrc(paths[0]), paths[0]);
            } else if (isPlaylistMode) {
              const items = paths.map((p) => ({ kind: "path" as const, url: convertFileSrc(p), path: p }));
              playlistRef.current = items;
              setPlaylistLength(items.length);
              setPlaylistIndex(0);
              currentPlayingPathRef.current = items[0].path;
              setShowFfmpegRetry(false);
              previewSourceRef.current.previewPath(items[0].url, items[0].path);
            } else {
              // Non-media or multiple files: fetch as blobs to get real File objects for the dialog
              const fileEntries: FileTargetFile[] = [];
              for (const p of paths) {
                const name = p.split("/").pop() ?? p;
                try {
                  const res = await fetch(convertFileSrc(p));
                  const blob = await res.blob();
                  const mime = mimeFromPath(p) || blob.type;
                  fileEntries.push({
                    id: "", entry: new File([blob], name, { type: mime }),
                    isDir: false, isFile: true, path: name,
                    createdAt: 0, modifiedAt: 0, size: blob.size, isRoot: true,
                  });
                } catch (e) {
                  console.error("[mDrop OFF] fetch failed:", p, e);
                }
              }
              if (fileEntries.length > 0) {
                await showBrowserFileListDialogRef.current({ files: fileEntries, initialPath: "/", title: "" });
              }
            }
          }
        } catch (e) {
          console.error("[mDrop] drag-drop share failed:", e);
        }
      });
    };

    setup();
    return () => { unlisten?.(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Tauri "Open With" / file association handler (tauri-plugin-deep-link)
  React.useEffect(() => {
    if (!isTauriRuntime()) return;

    let unlisten: (() => void) | undefined;

    const setup = async () => {
      const { listen } = await import("@tauri-apps/api/event");
      unlisten = await listen<string[]>("retro://open-files", async (event) => {
        const fileUrls = event.payload;
        if (!fileUrls || fileUrls.length === 0) return;

        // file:///path/to/file → /path/to/file
        const paths = fileUrls.map((u) => {
          try { return decodeURIComponent(new URL(u).pathname); } catch { return u; }
        });

        const isAllMedia = paths.every((p) => isVideoExtended(p) || isAudio(p) || isImage(p));
        if (!isAllMedia || paths.length === 0) return;

        const isPlaylistMode =
          (loopModeRef.current === "autoplay" || loopModeRef.current === "all") &&
          paths.length > 1;

        const { convertFileSrc } = await import("@tauri-apps/api/core");
        const items = paths.map((p) => ({ kind: "path" as const, url: convertFileSrc(p), path: p }));
        if (isPlaylistMode) {
          playlistRef.current = items;
          setPlaylistLength(items.length);
          setPlaylistIndex(0);
        } else {
          playlistRef.current = [items[0]];
          setPlaylistLength(1);
          setPlaylistIndex(0);
        }
        currentPlayingPathRef.current = items[0].path;
        setShowFfmpegRetry(false);
        if (shouldPreferDialogRetroPreview && !isPlaylistMode) {
          await showDialogPreviewForPath(items[0].url, items[0].path);
          return;
        }
        previewSourceRef.current.previewPath(items[0].url, items[0].path);
      });
    };

    setup();
    return () => { unlisten?.(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const openFiles = useCallback(async (files: FileList | File[]) => {
    if (files.length === 0) return;

    pickerStateRef.current = "processing";

    try {
      await waitForNextPaint();

      if (files.length === 1 && isDirectRetroFile(files[0])) {
        if (shouldPreferDialogRetroPreview) {
          await showDialogPreviewForBrowserFiles(files);
          return;
        }
        previewSource.previewFile(files[0]);
        playlistRef.current = [{ kind: "file", file: files[0] }];
        setPlaylistLength(1);
        setPlaylistIndex(0);
        return;
      }

      const mediaFiles = Array.from(files).filter((f) => isDirectRetroFile(f));
      if ((loopModeRef.current === "autoplay" || loopModeRef.current === "all") && mediaFiles.length > 1 && mediaFiles.length === files.length) {
        playlistRef.current = mediaFiles.map((f) => ({ kind: "file" as const, file: f }));
        setPlaylistLength(mediaFiles.length);
        setPlaylistIndex(0);
        previewSource.previewFile(mediaFiles[0]);
        finishPreparingSelection();
        return;
      }

      await openPortableTargets(files);
    } finally {
      finishPreparingSelection();
    }
  }, [finishPreparingSelection, isDirectRetroFile, openPortableTargets, previewSource, shouldPreferDialogRetroPreview, showDialogPreviewForBrowserFiles]);

  const currentPlayingPathRef = React.useRef<string | null>(null);
  const [showFfmpegRetry, setShowFfmpegRetry] = React.useState(false);
  const [showPlaybackRetryHint, setShowPlaybackRetryHint] = React.useState(false);
  const shouldShowFfmpegRetry = false;

  const handleFfmpegRetry = useCallback(async () => {
    const path = currentPlayingPathRef.current;
    if (!path || !isMDropReadyRef.current) return;
    setShowFfmpegRetry(false);
    setShowPlaybackRetryHint(false);
    try {
      const shared = await mdropShareFile(path);
      const hlsUrl = `${new URL(shared.url).origin}/hls/${shared.id}/index.m3u8`;
      setIsFfmpegEnabled(true);
      if (shouldPreferDialogRetroPreview) {
        await showDialogPreviewForPath(hlsUrl, path);
        return;
      }
      previewSourceRef.current.previewPath(hlsUrl, path);
      currentPresetConfigRef.current = { type: 'url', url: hlsUrl, label: path };
      saveStartupPreset(currentPresetConfigRef.current);
    } catch (e) {
      console.error("[ffmpeg retry] failed:", e);
    }
  }, [shouldPreferDialogRetroPreview, showDialogPreviewForPath]);

  const handlePlayerError = useCallback((_error: Error) => {
    setShowPlaybackRetryHint(true);
    if (isMDropReadyRef.current && currentPlayingPathRef.current) {
      setShowFfmpegRetry(true);
    }
  }, []);

  const previewItem = useCallback((item: PlaylistItem) => {
    setShowFfmpegRetry(false);
    setShowPlaybackRetryHint(false);
    if (item.kind === "file") {
      currentPlayingPathRef.current = null;
      if (shouldPreferDialogRetroPreview) {
        void showDialogPreviewForBrowserFiles([item.file]);
        return;
      }
      previewSource.previewFile(item.file);
    } else {
      currentPlayingPathRef.current = item.path;
      if (shouldPreferDialogRetroPreview) {
        void showDialogPreviewForPath(item.url, item.path);
        return;
      }
      previewSource.previewPath(item.url, item.path);
    }
  }, [shouldPreferDialogRetroPreview, showDialogPreviewForBrowserFiles, showDialogPreviewForPath]);

  const nextTrack = useCallback(() => {
    const list = playlistRef.current;
    setPlaylistIndex((idx) => {
      const next = idx + 1;
      if (next >= list.length) return idx;
      previewItem(list[next]);
      return next;
    });
  }, [previewItem]);

  const nextTrackAll = useCallback(() => {
    const list = playlistRef.current;
    if (list.length === 0) return;
    setPlaylistIndex((idx) => {
      const next = (idx + 1) % list.length;
      previewItem(list[next]);
      return next;
    });
  }, [previewItem]);

  const prevTrack = useCallback(() => {
    const list = playlistRef.current;
    setPlaylistIndex((idx) => {
      const prev = idx - 1;
      if (prev < 0) return idx;
      previewItem(list[prev]);
      return prev;
    });
  }, [previewItem]);

  const handleEnded = useCallback(() => {
    if (loopMode === "autoplay") nextTrack();
    else if (loopMode === "all") nextTrackAll();
  }, [loopMode, nextTrack, nextTrackAll]);

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
    toneCleanupRef.current?.();
    toneCleanupRef.current = null;
    setAutoStartState('done');
    dispatchRetroPlayerEnsureAudioContext();
    await previewSource.startMicrophoneInput();
  }, [previewSource]);

  const handleOpenCamera = useCallback(async () => {
    setIsMobileMenuOpen(false);
    toneCleanupRef.current?.();
    toneCleanupRef.current = null;
    setAutoStartState('done');
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
      toneCleanupRef.current?.();
      toneCleanupRef.current = null;
      setAutoStartState('done');
      dispatchRetroPlayerEnsureAudioContext();
      await previewSource.startMicrophoneInput(selectedDeviceId);
      return;
    }

    if (currentLabel === "Camera") {
      toneCleanupRef.current?.();
      toneCleanupRef.current = null;
      setAutoStartState('done');
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
    await openFiles(targets);
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
      currentPlayingPathRef.current = selected;
      setShowFfmpegRetry(false);
      if (shouldPreferDialogRetroPreview) {
        await showDialogPreviewForPath(playUrl, selected);
        return;
      }
      previewSource.previewPath(playUrl, selected);
      // Save restorable URLs (HTTP) as startup preset so the player retries on next launch.
      if (playUrl.startsWith('http')) {
        currentPresetConfigRef.current = { type: 'url', url: playUrl, label: selected };
        saveStartupPreset(currentPresetConfigRef.current);
      }
      return;
    }

    beginPreparingSelection();
    fileInputRef.current?.click();
  }, [beginPreparingSelection, isFfmpegEnabled, isMDropReady, isNativeMdropAvailable, previewSource, shouldPreferDialogRetroPreview, showDialogPreviewForPath]);

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

    beginPreparingSelection();
    folderInputRef.current?.click();
  }, [beginPreparingSelection, isIosOrAndroid, isMDropReady, isNativeMdropAvailable, showBrowserFileListDialog]);

  const handleOpenDisplayCapture = useCallback(async () => {
    if (isIosOrAndroid) return;
    setIsMobileMenuOpen(false);
    await waitForExternalNavigationPause();
    void handleDisplayCapture();
  }, [handleDisplayCapture, isIosOrAndroid]);

  const stopTone = useCallback(() => {
    toneCleanupRef.current?.();
    toneCleanupRef.current = null;
  }, []);

  const syncToneTransportPlayback = useCallback((playing: boolean) => {
    void import('tone').then(({ getTransport }) => {
      const transport = getTransport();
      if (playing) {
        transport.start();
      } else {
        transport.pause();
      }
    });
  }, []);

  const currentPlaybackSource = React.useMemo<RetroPlaybackEvent["source"]>(
    () => (previewSource.previewStreamSource === "audio-preview" ? "builtin-tone" : "media"),
    [previewSource.previewStreamSource],
  );

  React.useEffect(() => {
    if (!isPreviewDialogActive) return;
    if (currentPlaybackSource !== "builtin-tone") return;
    dispatchRetroPlayerPausePlayback();
    syncToneTransportPlayback(false);
  }, [currentPlaybackSource, isPreviewDialogActive, syncToneTransportPlayback]);

  // When a file/URL/stream is loaded while Touch & Play is showing, dismiss the overlay and stop ToneJS.
  React.useEffect(() => {
    if (!previewSource.previewSrc && !previewSource.previewStream) return;
    if (autoStartState !== 'blocked') return;
    toneCleanupRef.current?.();
    toneCleanupRef.current = null;
    setAutoStartState('done');
  }, [previewSource.previewSrc, previewSource.previewStream, autoStartState]);


  const savePreset = React.useCallback((config: PresetConfig) => {
    currentPresetConfigRef.current = config;
    saveStartupPreset(config);
    setAutoStartState('done');
  }, []);

  const handlePresetVideo = useCallback(() => {
    savePreset({ type: 'colorbars-video' });
    stopTone();
    previewSource.previewPath('./test_colorbars.mp4', 'test_colorbars.mp4');
    setIsMobileMenuOpen(false);
  }, [previewSource, savePreset, stopTone]);

  const handlePresetImage = useCallback(() => {
    savePreset({ type: 'colorbars-image' });
    stopTone();
    previewSource.previewPath('./test_colorbars.png', 'test_colorbars.png');
    setIsMobileMenuOpen(false);
  }, [previewSource, savePreset, stopTone]);

  const handlePresetLofi = useCallback(async () => {
    savePreset({ type: 'lofi' });
    stopTone();
    setIsMobileMenuOpen(false);
    const [{ startLofiSession }, Tone] = await Promise.all([
      import('./builtin-content/lofi-engine'),
      import('tone'),
    ]);
    await Tone.start().catch(() => {});
    const session = await startLofiSession();
    toneCleanupRef.current = session.dispose;
    previewSource.previewAudioStream(session.stream, 'Lo-fi Chill');
  }, [previewSource, savePreset, stopTone]);

  const handlePresetDemoSong = useCallback(async (meta: DemoSongMeta) => {
    savePreset({ type: 'demo-song', songId: meta.id });
    stopTone();
    setIsMobileMenuOpen(false);
    const { startDemoSongSession } = await import('./builtin-content/demo-song-session');
    const session = await startDemoSongSession(meta);
    toneCleanupRef.current = session.dispose;
    previewSource.previewAudioStream(session.stream, meta.name);
  }, [previewSource, savePreset, stopTone]);

  // Restart the currently saved preset. Called from RetroPlayer's onRetry
  // (play button pressed while media is in error/ended state).
  const handleRetry = useCallback(async () => {
    setAutoStartState('done');
    const preset = currentPresetConfigRef.current;
    stopTone();
    if (preset.type === 'lofi') {
      const [{ startLofiSession }, Tone] = await Promise.all([
        import('./builtin-content/lofi-engine'),
        import('tone'),
      ]);
      await Tone.start().catch(() => {});
      const session = await startLofiSession();
      toneCleanupRef.current = session.dispose;
      previewSource.previewAudioStream(session.stream, 'Lo-fi Chill');
    } else if (preset.type === 'demo-song') {
      const [{ DEMO_SONGS }, { startDemoSongSession }] = await Promise.all([
        import('./builtin-content/demo-songs'),
        import('./builtin-content/demo-song-session'),
      ]);
      const meta = DEMO_SONGS.find(s => s.id === preset.songId);
      if (meta) {
        const session = await startDemoSongSession(meta);
        toneCleanupRef.current = session.dispose;
        previewSource.previewAudioStream(session.stream, meta.name);
      }
    } else if (preset.type === 'colorbars-video') {
      previewSource.previewPath('./test_colorbars.mp4', 'test_colorbars.mp4');
    } else if (preset.type === 'colorbars-image') {
      previewSource.previewPath('./test_colorbars.png', 'test_colorbars.png');
    } else if (preset.type === 'url') {
      previewSource.previewPath(preset.url, preset.label);
    }
  }, [previewSource, stopTone]);

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

  const handleMDropToggle = useCallback(async () => {
    if (!isNativeMdropAvailable) return;
    if (isMDropReady) {
      await mdropStopServer().catch(() => {});
      setIsMDropReady(false);
      setIsShareMode(false);
    } else {
      const status = await mdropStartServer({ hostname: "localhost", localOnly: true }).catch(() => null);
      setIsMDropReady(status?.running ?? false);
      if (status?.running && status.port) {
        if (!window.__MDROP_CONFIG__) window.__MDROP_CONFIG__ = {};
        window.__MDROP_CONFIG__.apiServer = `http://localhost:${status.port}`;
        setMDropPort(status.port);
        setMDropIp(null);
      }
    }
  }, [isMDropReady, isNativeMdropAvailable]);

  const handleMDropWebToggle = useCallback(async () => {
    if (!isNativeMdropAvailable) return;
    const nextWeb = !isShareMode;
    await mdropStopServer().catch(() => {});
    const status = await mdropStartServer({
      hostname: "localhost",
      localOnly: true,
      webEnabled: nextWeb,
    }).catch(() => null);
    setIsMDropReady(status?.running ?? false);
    setIsShareMode(nextWeb);
    if (status?.running && status.port) {
      if (!window.__MDROP_CONFIG__) window.__MDROP_CONFIG__ = {};
      window.__MDROP_CONFIG__.apiServer = `http://localhost:${status.port}`;
      setMDropPort(status.port);
      setMDropIp(nextWeb ? (status.ips?.[0] ?? null) : null);
    }
  }, [isNativeMdropAvailable, isShareMode]);

  const { isHolding: isMDropHolding, ...mDropLongPressHandlers } = useLongPress(
    useCallback(() => { void handleMDropWebToggle(); }, [handleMDropWebToggle]),
    useCallback(() => { void handleMDropToggle(); }, [handleMDropToggle]),
  );

  const handleChangeLocale = useCallback((nextPreference: LocalePreference) => {
    setLocalePreference(nextPreference);
  }, []);

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
          onPresetVideo={handlePresetVideo}
          onPresetImage={handlePresetImage}
          onPresetLofi={() => { void handlePresetLofi(); }}
          onPresetDemoSong={(meta: DemoSongMeta) => { void handlePresetDemoSong(meta); }}
          onChangeLocale={handleChangeLocale}
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

        <div className="relative flex-1 min-h-0">
          <React.Suspense fallback={null}>
            {
            <RetroPlayer
              locale={locale}
              key={retroPlayerKey}
              src={previewSource.previewSrc ?? defaultPreviewSrc}
              stream={previewSource.previewStream}
              streamName={previewSource.previewLabel}
              kind={previewSource.previewKind ?? defaultPreviewKind}
              playbackSource={currentPlaybackSource}
              looping={!isUsingDefaultPreview && loopMode === "one"}
              autoPlay={autoStartState === 'done'}
              onEnded={handleEnded}
              onError={handlePlayerError}
              onRetry={() => { void handleRetry(); }}
              onPlaybackChange={(event) => {
                if (event.playing) {
                  setShowPlaybackRetryHint(false);
                }
                if (event.source === "builtin-tone") {
                  if (isPreviewDialogActiveRef.current) {
                    syncToneTransportPlayback(false);
                    return;
                  }
                  syncToneTransportPlayback(event.playing);
                  return;
                }
                if (event.playing) {
                  stopTone();
                }
              }}
              onPrevTrack={playlistLength > 1 ? prevTrack : undefined}
              onNextTrack={playlistLength > 1 ? nextTrack : undefined}
              loopMode={loopMode}
              onCycleLoopMode={cycleLoopMode}
            />
            }
          </React.Suspense>
          {shouldShowFfmpegRetry && showFfmpegRetry && (
            <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center px-4">
              <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-amber-400/60 bg-slate-900/80 px-4 py-2 text-sm shadow-lg backdrop-blur-sm">
                <span className="text-amber-300">{locale === "ja" ? "再生できません" : "Playback failed"}</span>
                <button
                  type="button"
                  onClick={() => { void handleFfmpegRetry(); }}
                  className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-amber-400"
                >
                  ffmpeg で再生
                </button>
                <button
                  type="button"
                  onClick={() => setShowFfmpegRetry(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          {showPlaybackRetryHint && (
            <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center px-4">
              <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-amber-400/60 bg-slate-900/80 px-4 py-2 text-sm text-amber-200 shadow-lg backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setShowPlaybackRetryHint(false)}
                  className="text-left"
                >
                  {t(locale, "playbackRetryHint")}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPlaybackRetryHint(false)}
                  aria-label={t(locale, "hideLoadingOverlay")}
                  className="shrink-0 text-slate-400 transition hover:text-slate-200"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
          {autoStartState === 'blocked' && !isDialogActive && (
            <div className="pointer-events-none fixed inset-0 z-60 flex items-center justify-center">
              <button
                type="button"
                className="pointer-events-auto rounded-full border border-amber-400/40 bg-amber-500/15 px-8 py-3 text-sm text-amber-200 shadow-lg backdrop-blur-sm transition hover:bg-amber-500/25 active:scale-95"
                onClick={() => { void handleRetry(); }}
              >
                ▶ Touch &amp; Play
              </button>
            </div>
          )}
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
