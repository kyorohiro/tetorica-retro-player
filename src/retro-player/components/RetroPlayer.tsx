import React from "react";
import { usePixiVideoPlayer, type RetroPlaybackEvent } from "../hooks/usePixiVideoPlayer";
import {
  DEFAULT_GRAPHICS_BACKEND_MODE,
  getGraphicsBackendMode,
  restartApplication,
  setGraphicsBackendMode,
  type GraphicsBackendMode,
} from "../platform/graphicsBackend";
import { isTauriRuntime, isWindowsRuntime } from "../platform/runtime";
import { isHlsUrl } from "../media/RetroMediaSource";
import {
  useRetroFilterState,
  type RetroFilterInitialState,
} from "../hooks/useRetroFilterState";
import {
  clearPersistedRetroSettings,
  getFfmpegMaxConcurrentHlsSessions,
  getFfmpegUseQsv,
  getNativePlaybackMode,
  setFfmpegUseQsv,
  setFfmpegMaxConcurrentHlsSessions,
  loadPersistedRetroSettings,
  setNativePlaybackMode,
  type PersistedRetroUiSettings,
} from "../hooks/persistedRetroSettings";
import {
  mdropSetFfmpegMaxConcurrentHlsSessions,
  mdropSetFfmpegUseQsv,
} from "../../mdrop-web/tauri";
import { saveLocalePreference } from "../../i18n";
import type { PresetFileData } from "../hooks/presetFile";
import {
  buildRetroPresetVariantPreparation,
  RETRO_PRESETS,
  resolveRetroVariantPreparationRenderMode,
  type RetroPresetDefinition,
  type RetroPresetKey,
  type RetroPresetVariantPreparation,
} from "../retro/config";
import type { RetroPreviewLayoutState } from "../previewLayoutState";
import type { RetroGameControls } from "../types/gameControls";
import type { ConfirmDialogFn, RetroPlayerLocale } from "../types";
import { RetroPreviewView } from "./RetroPreviewView";
import { RetroControlPanel } from "./RetroControlPanel";
import { RetroPlayerLayout, type RetroLayoutMode } from "./RetroPlayerLayout";
import { useDialog } from "../../useDialog";

const clampRenderResolutionPreset = (value: number): 1 | 2 => {
  if (value >= 2) return 2;
  return 1;
};

const FULL_MODE_CONFIRMED_SESSION_STORAGE_KEY =
  "tetorica-retro-player.full-mode-confirmed.session";
const FULL_MODE_CONFIRMED_PERSISTENT_STORAGE_KEY =
  "tetorica-retro-player.full-mode-confirmed.persisted";

const readStoredBoolean = (storage: Storage, key: string): boolean => {
  try {
    return storage.getItem(key) === "1";
  } catch {
    return false;
  }
};

const writeStoredBoolean = (storage: Storage, key: string, value: boolean): void => {
  try {
    if (value) {
      storage.setItem(key, "1");
    } else {
      storage.removeItem(key);
    }
  } catch {
    // Ignore storage errors and keep runtime behavior.
  }
};

const readSessionFullModeConfirmed = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return readStoredBoolean(window.sessionStorage, FULL_MODE_CONFIRMED_SESSION_STORAGE_KEY);
};

const readPersistedFullModeConfirmed = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return readStoredBoolean(window.localStorage, FULL_MODE_CONFIRMED_PERSISTENT_STORAGE_KEY);
};

const writeSessionFullModeConfirmed = (value: boolean): void => {
  if (typeof window === "undefined") {
    return;
  }
  writeStoredBoolean(window.sessionStorage, FULL_MODE_CONFIRMED_SESSION_STORAGE_KEY, value);
};

const writePersistedFullModeConfirmed = (value: boolean): void => {
  if (typeof window === "undefined") {
    return;
  }
  writeStoredBoolean(window.localStorage, FULL_MODE_CONFIRMED_PERSISTENT_STORAGE_KEY, value);
};

const clearStoredFullModeConfirmed = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  writeSessionFullModeConfirmed(false);
  writePersistedFullModeConfirmed(false);
};

const resolveRenderResolutionPreset = (
  ui: PersistedRetroUiSettings | undefined,
): 1 | 2 => {
  const explicitPreset = ui?.renderResolutionPreset;
  if (typeof explicitPreset === "number" && Number.isFinite(explicitPreset)) {
    return clampRenderResolutionPreset(explicitPreset);
  }
  return ui?.isHighResolution ? 2 : 1;
};


type RetroPlayerProps = {
  locale?: RetroPlayerLocale;
  src?: string;
  displayName?: string;
  displayIndex?: number | null;
  stream?: MediaStream | null;
  streamName?: string;
  kind?: "video" | "image" | "audio";
  looping?: boolean;
  className?: string;
  onError?: (error: Error) => void;
  onRetry?: () => void;
  autoPlay?: boolean;
  onPlaybackChange?: (event: RetroPlaybackEvent) => void;
  playbackSource?: "builtin-tone" | "media";
  initialFilterState?: RetroFilterInitialState;
  confirmDialog?: ConfirmDialogFn;
  onEnded?: () => void;
  onPrevTrack?: () => void;
  onNextTrack?: () => void;
  onForceReplay?: () => Promise<boolean> | boolean;
  loopMode?: "one" | "autoplay" | "all" | "off";
  onCycleLoopMode?: () => void;
  onLoopLongPress?: () => void;
  previewLayoutState?: RetroPreviewLayoutState;
  onPreviewLayoutStateChange?: (state: RetroPreviewLayoutState) => void;
  startupNativePlaybackMode?: boolean;
  persistNativePlaybackMode?: boolean;
  gameControls?: RetroGameControls | null;
  nativeOverrideElement?: HTMLCanvasElement | null;
  visualOverrideElement?: HTMLCanvasElement | null;
  auxAudioStream?: MediaStream | null;
};

export function RetroPlayer({
  locale = "en",
  src,
  displayName,
  displayIndex,
  stream,
  streamName,
  kind = "video",
  looping,
  className,
  onError,
  onRetry,
  autoPlay,
  onPlaybackChange,
  playbackSource = "media",
  initialFilterState,
  confirmDialog: confirmDialogProp,
  onEnded,
  onPrevTrack,
  onNextTrack,
  onForceReplay,
  loopMode,
  onCycleLoopMode,
  onLoopLongPress,
  previewLayoutState,
  onPreviewLayoutStateChange,
  startupNativePlaybackMode,
  persistNativePlaybackMode = true,
  gameControls,
  nativeOverrideElement,
  visualOverrideElement,
  auxAudioStream,
}: RetroPlayerProps) {
  const { showConfirmDialog } = useDialog();
  const confirmDialog: ConfirmDialogFn = confirmDialogProp ??
    ((opts) => showConfirmDialog({ ...opts, title: opts.title ?? "", body: opts.body ?? "" }).then((v) => v ?? false));

  // HLS (ffmpeg) streaming bypasses the Web Audio graph on Tauri's native
  // webviews (WKWebView/WebView2) — see docs/issues/wkwebview-hls-webaudio.md.
  // Browser builds decode HLS via Chromium MSE and are unaffected.
  const isAudioFxUnavailable = isTauriRuntime() && typeof src === "string" && isHlsUrl(src);

  // isHighResolution and isFitWidthEnabled live here because they are args to
  // usePixiVideoPlayer. Their toggle buttons are in RetroPreviewView.
  const persistedUiSettings = React.useMemo(
    () => loadPersistedRetroSettings()?.ui,
    [],
  );

  const startupNativeMode = React.useRef(
    startupNativePlaybackMode ?? getNativePlaybackMode(),
  ).current;
  const startupUseQsv = React.useRef(getFfmpegUseQsv()).current;
  const startupMaxConcurrentHlsSessions = React.useRef(getFfmpegMaxConcurrentHlsSessions()).current;
  const [nativePlaybackMode, setNativePlaybackModeState] = React.useState(startupNativeMode);
  const [ffmpegUseQsv, setFfmpegUseQsvState] = React.useState(startupUseQsv);
  const [ffmpegMaxConcurrentHlsSessions, setFfmpegMaxConcurrentHlsSessionsState] = React.useState(
    startupMaxConcurrentHlsSessions,
  );

  const handleToggleNativePlaybackMode = React.useCallback(() => {
    const next = !nativePlaybackMode;
    if (persistNativePlaybackMode) {
      setNativePlaybackMode(next);
    }
    setNativePlaybackModeState(next);
  }, [nativePlaybackMode, persistNativePlaybackMode]);

  const syncFfmpegUseQsv = React.useCallback(async (enabled: boolean) => {
    if (!isTauriRuntime()) return;
    try {
      await mdropSetFfmpegUseQsv(enabled);
    } catch (error) {
      console.warn("[retro-player] failed to sync ffmpeg QSV setting", error);
    }
  }, []);

  const syncFfmpegMaxConcurrentHlsSessions = React.useCallback(async (limit: number) => {
    if (!isTauriRuntime()) return;
    try {
      await mdropSetFfmpegMaxConcurrentHlsSessions(limit);
    } catch (error) {
      console.warn("[retro-player] failed to sync ffmpeg HLS session limit", error);
    }
  }, []);

  const handleToggleFfmpegUseQsv = React.useCallback(() => {
    const next = !ffmpegUseQsv;
    setFfmpegUseQsv(next);
    setFfmpegUseQsvState(next);
    void syncFfmpegUseQsv(next);
  }, [ffmpegUseQsv, syncFfmpegUseQsv]);

  const handleFfmpegMaxConcurrentHlsSessionsChange = React.useCallback((limit: number) => {
    const normalized = Math.min(8, Math.max(1, Math.round(limit)));
    setFfmpegMaxConcurrentHlsSessions(normalized);
    setFfmpegMaxConcurrentHlsSessionsState(normalized);
    void syncFfmpegMaxConcurrentHlsSessions(normalized);
  }, [syncFfmpegMaxConcurrentHlsSessions]);

  const [renderResolutionPreset, setRenderResolutionPreset] = React.useState<1 | 2>(
    resolveRenderResolutionPreset(persistedUiSettings),
  );
  const [maximizePerformanceMode, setMaximizePerformanceMode] = React.useState<"auto" | "on" | "off">(
    persistedUiSettings?.maximizePerformanceMode ?? "auto",
  );
  const [maximizePerformanceModeSessionOverride, setMaximizePerformanceModeSessionOverride] =
    React.useState<"off" | null>(null);
  const startupShaderCompileCacheBusterEnabled = React.useRef(
    persistedUiSettings?.shaderCompileCacheBusterEnabled === true,
  ).current;
  const [shaderCompileCacheBusterEnabled, setShaderCompileCacheBusterEnabled] = React.useState(
    startupShaderCompileCacheBusterEnabled,
  );
  const [graphicsBackendMode, setGraphicsBackendModeState] = React.useState<GraphicsBackendMode>(
    persistedUiSettings?.graphicsBackendMode ?? DEFAULT_GRAPHICS_BACKEND_MODE,
  );
  const [graphicsBackendRestartPending, setGraphicsBackendRestartPending] = React.useState(false);
  const isHighResolution = renderResolutionPreset > 1;
  const [isFitWidthEnabled, setIsFitWidthEnabled] = React.useState(
    () => previewLayoutState?.isFitWidthEnabled ?? false,
  );
  const [isPreviewMaximizedForRenderer, setIsPreviewMaximizedForRenderer] = React.useState(
    () => previewLayoutState?.isPreviewMaximized ?? persistedUiSettings?.isPreviewMaximized ?? false,
  );
  const [controlPanelMode, setControlPanelMode] = React.useState<
    "playback" | "audio-settings" | "video-settings"
  >("playback");
  const [isPinnedInPreview, setIsPinnedInPreview] = React.useState(false);
  const [showVideoSpectrum, setShowVideoSpectrum] = React.useState(false);
  const [showClockOverlay, setShowClockOverlay] = React.useState(false);
  const [isPreparingFullPreset, setIsPreparingFullPreset] = React.useState(false);
  const refreshLayoutFrameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    void syncFfmpegUseQsv(startupUseQsv);
  }, [startupUseQsv, syncFfmpegUseQsv]);

  React.useEffect(() => {
    void syncFfmpegMaxConcurrentHlsSessions(startupMaxConcurrentHlsSessions);
  }, [startupMaxConcurrentHlsSessions, syncFfmpegMaxConcurrentHlsSessions]);

  React.useEffect(() => {
    if (!isTauriRuntime() || !isWindowsRuntime()) {
      return;
    }
    let cancelled = false;
    void getGraphicsBackendMode()
      .then((mode) => {
        if (cancelled) {
          return;
        }
        setGraphicsBackendModeState((current) => (current === mode ? current : mode));
        setGraphicsBackendRestartPending(false);
      })
      .catch((error) => {
        console.warn("[retro-player] failed to load graphics backend mode", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (typeof previewLayoutState?.isFitWidthEnabled === "boolean") {
      setIsFitWidthEnabled((current) => (
        current === previewLayoutState.isFitWidthEnabled ? current : previewLayoutState.isFitWidthEnabled
      ));
    }
  }, [previewLayoutState?.isFitWidthEnabled]);

  React.useEffect(() => {
    if (typeof previewLayoutState?.isPreviewPinned === "boolean") {
      setIsPinnedInPreview((current) => (
        current === previewLayoutState.isPreviewPinned ? current : previewLayoutState.isPreviewPinned
      ));
    }
  }, [previewLayoutState?.isPreviewPinned]);

  const lastPreviewRequestRef = React.useRef<string>("");
  const lastLoopingPresetRef = React.useRef<string>("");

  const filterState = useRetroFilterState(initialFilterState);
  const handlePreviewPointerMove = React.useCallback((point: { x: number; y: number }) => {
    if (!filterState.focusTrackCursor || filterState.focusStrength <= 0) {
      return;
    }

    filterState.setFocusCenter(point.x, point.y);
  }, [filterState]);
  const effectiveMaximizePerformanceMode =
    maximizePerformanceModeSessionOverride ?? maximizePerformanceMode;
  const renderResolutionScale = renderResolutionPreset;
  const player = usePixiVideoPlayer(
    filterState,
    isFitWidthEnabled ? "width" : "contain",
    renderResolutionScale,
    {
      onEnded,
      onError,
      onRetry,
      autoPlay,
      onPlaybackChange,
      onPrevTrack,
      onNextTrack,
      playbackSource,
      preferNativeVideoSurface: nativePlaybackMode,
      isPreviewMaximized: isPreviewMaximizedForRenderer,
      maximizePerformanceMode: effectiveMaximizePerformanceMode,
      shaderCompileCacheBusterEnabled: startupShaderCompileCacheBusterEnabled,
      locale,
      requestedKind: kind,
      requestedIndex: displayIndex,
      disableTransportKeyboardShortcuts: gameControls?.kind === "nes",
      visualOverrideElement,
      auxAudioStream,
    },
  );

  // --- Callbacks ---

  const resetAllSettings = React.useCallback(() => {
    clearPersistedRetroSettings();
    filterState.resetSettings();
    player.resetAudioSettings();
    setRenderResolutionPreset(1);
    setShaderCompileCacheBusterEnabled(false);
    setGraphicsBackendModeState(DEFAULT_GRAPHICS_BACKEND_MODE);
    setGraphicsBackendRestartPending(false);
    if (isTauriRuntime() && isWindowsRuntime()) {
      void setGraphicsBackendMode(DEFAULT_GRAPHICS_BACKEND_MODE).catch((error) => {
        console.warn("[retro-player] failed to reset graphics backend mode", error);
      });
    }
  }, [filterState, player]);

  const handleImportSettings = React.useCallback((data: PresetFileData) => {
    filterState.applyAllFilterSettings(data.filter);
    player.applyAudioSettings(data.audio);
    setRenderResolutionPreset(resolveRenderResolutionPreset(data.ui));
    const importedGraphicsBackendMode = data.ui.graphicsBackendMode ?? DEFAULT_GRAPHICS_BACKEND_MODE;
    setGraphicsBackendModeState(importedGraphicsBackendMode);
    setGraphicsBackendRestartPending(false);
    if (isTauriRuntime() && isWindowsRuntime()) {
      void setGraphicsBackendMode(importedGraphicsBackendMode)
        .then(() => {
          setGraphicsBackendRestartPending(true);
        })
        .catch((error) => {
          console.warn("[retro-player] failed to import graphics backend mode", error);
        });
    }
    saveLocalePreference(data.locale);
  }, [filterState, player]);

  const handleToggleHighResolution = React.useCallback(() => {
    setRenderResolutionPreset((current) => (current > 1 ? 1 : 2));
  }, []);

  const handleMaximizePerformanceModeChange = React.useCallback((nextValue: "auto" | "on" | "off") => {
    setMaximizePerformanceMode(nextValue);
    setMaximizePerformanceModeSessionOverride(null);
  }, []);

  const handleTemporarilyDisableRenderCap = React.useCallback(() => {
    setMaximizePerformanceModeSessionOverride("off");
  }, []);

  const handleGraphicsBackendModeChange = React.useCallback((nextMode: GraphicsBackendMode) => {
    setGraphicsBackendModeState(nextMode);
    if (!isTauriRuntime() || !isWindowsRuntime()) {
      return;
    }
    void setGraphicsBackendMode(nextMode)
      .then(() => {
        setGraphicsBackendRestartPending(true);
      })
      .catch((error) => {
        console.warn("[retro-player] failed to save graphics backend mode", error);
      });
  }, []);

  const handleRestartApplication = React.useCallback(() => {
    if (!isTauriRuntime()) {
      return;
    }
    void restartApplication().catch((error) => {
      console.warn("[retro-player] failed to restart application", error);
    });
  }, []);

  // Long-press play/pause: let the caller do a full resource reset (e.g.
  // re-share + re-resolve a source URL) if it can. If it reports it didn't
  // handle it (falsy/no callback), fall back to a plain restart-from-0 —
  // the same thing the (currently unused) onRestart control does.
  const handleForceReplay = React.useCallback(async () => {
    const handled = await onForceReplay?.();
    if (handled) return;
    player.seekTo(0);
    void player.playVideoWithAudio();
  }, [onForceReplay, player]);

  const runWithFullPresetLock = React.useCallback(async (
    task: () => Promise<void>,
  ) => {
    setIsPreparingFullPreset(true);
    try {
      await task();
    } finally {
      setIsPreparingFullPreset(false);
    }
  }, []);

  const scheduleRefreshLayout = React.useCallback(() => {
    if (refreshLayoutFrameRef.current !== null) return;
    refreshLayoutFrameRef.current = window.requestAnimationFrame(() => {
      refreshLayoutFrameRef.current = null;
      player.refreshLayout();
    });
  }, [player]);

  // phosphorDot preset needs aspect-aware dimension adjustment. This stays
  // true while phosphorDot's auto-aspect is in control of targetWidth/Height,
  // so a source that loads (or changes) later still gets corrected — see
  // docs/issues/phosphor-dot-aspect-correction.md. It's cleared as soon as
  // the user edits width/height manually or switches to another preset.
  const phosphorDotAspectActiveRef = React.useRef(false);
  const autoTargetSizeAppliedKeyRef = React.useRef<string | null>(null);
  const fullModeConfirmedRef = React.useRef(
    readPersistedFullModeConfirmed() || readSessionFullModeConfirmed(),
  );
  const persistentFullModeConfirmedRef = React.useRef(
    readPersistedFullModeConfirmed(),
  );

  const clearFullVariantConfirmations = React.useCallback(() => {
    fullModeConfirmedRef.current = false;
    persistentFullModeConfirmedRef.current = false;
    clearStoredFullModeConfirmed();
  }, []);

  React.useEffect(() => {
    const isPhosphorDotSelected =
      filterState.selectedPreset === "phosphorDot" ||
      filterState.selectedPreset === "phosphorDotSmooth";
    phosphorDotAspectActiveRef.current = isPhosphorDotSelected;
    if (isPhosphorDotSelected) {
      autoTargetSizeAppliedKeyRef.current = null;
    }
  }, [filterState.selectedPreset]);

  const clampAutoTargetSize = React.useCallback((width: number, height: number) => {
    const safeWidth = Math.max(1, Math.round(width));
    const safeHeight = Math.max(1, Math.round(height));
    const isPortrait = safeHeight > safeWidth;
    const maxWidth = isPortrait ? 1080 : 1920;
    const maxHeight = isPortrait ? 1920 : 1080;
    const scale = Math.min(1, maxWidth / safeWidth, maxHeight / safeHeight);

    return {
      width: Math.max(1, Math.round(safeWidth * scale)),
      height: Math.max(1, Math.round(safeHeight * scale)),
    };
  }, []);

  const syncTargetAspect = React.useCallback(() => {
    const dims = player.sourceDimensions;
    if (!dims || dims.width <= 0 || dims.height <= 0) return;

    const nextHeight = Math.max(
      1,
      Math.round(
        (filterState.targetWidth / dims.width) * dims.height,
      ),
    );

    if (Number.isFinite(nextHeight) && nextHeight !== filterState.targetHeight) {
      filterState.setTargetHeight(nextHeight);
    }
  }, [
    filterState.targetHeight,
    filterState.targetWidth,
    filterState.setTargetHeight,
    player.sourceDimensions,
  ]);

  const getTargetAspectRatio = React.useCallback(() => {
    if (player.sourceDimensions?.width && player.sourceDimensions?.height) {
      return player.sourceDimensions.width / player.sourceDimensions.height;
    }

    return Math.max(filterState.targetWidth, 1) / Math.max(filterState.targetHeight, 1);
  }, [filterState.targetHeight, filterState.targetWidth, player.sourceDimensions]);

  const handleSetTargetWidth = React.useCallback(
    (targetWidth: number) => {
      // Manual edits take the user out of phosphorDot auto-aspect mode.
      phosphorDotAspectActiveRef.current = false;
      filterState.setTargetWidth(targetWidth);
      if (!filterState.matchTargetAspect) return;

      const aspectRatio = Math.max(getTargetAspectRatio(), 0.0001);
      filterState.setTargetHeight(Math.max(1, Math.round(targetWidth / aspectRatio)));
    },
    [filterState, getTargetAspectRatio],
  );

  const handleSetTargetHeight = React.useCallback(
    (targetHeight: number) => {
      phosphorDotAspectActiveRef.current = false;
      filterState.setTargetHeight(targetHeight);
      if (!filterState.matchTargetAspect) return;

      const aspectRatio = Math.max(getTargetAspectRatio(), 0.0001);
      filterState.setTargetWidth(Math.max(1, Math.round(targetHeight * aspectRatio)));
    },
    [filterState, getTargetAspectRatio],
  );

  const handleSetMatchTargetAspect = React.useCallback(
    (matchTargetAspect: boolean) => {
      filterState.setMatchTargetAspect(matchTargetAspect);
      if (matchTargetAspect && player.sourceDimensions && !phosphorDotAspectActiveRef.current) {
        syncTargetAspect();
      }
    },
    [filterState, player.sourceDimensions, syncTargetAspect],
  );

  const computePhosphorDotDimensions = React.useCallback(
    (sourceWidth: number, sourceHeight: number) => {
      const preset: RetroPresetDefinition = RETRO_PRESETS.phosphorDot;
      const safeWidth = Math.max(sourceWidth, 1);
      const safeHeight = Math.max(sourceHeight, 1);
      const sourceAspect = safeWidth / safeHeight;
      const presetAspect = preset.width / preset.height;

      let nextWidth = preset.width;
      let nextHeight = preset.height;

      if (sourceAspect > presetAspect) {
        nextHeight = Math.max(8, Math.round((preset.width / sourceAspect) / 8) * 8);
      } else {
        nextWidth = Math.max(8, Math.round((preset.height * sourceAspect) / 8) * 8);
      }

      return { width: nextWidth, height: nextHeight };
    },
    [],
  );

  const prepareVariantIfNeeded = React.useCallback(async (request: {
    title: string;
    label: string;
    variantOverrides: RetroPresetVariantPreparation;
  }) => {
    const { title, label, variantOverrides } = request;

    if (isPreparingFullPreset) {
      return false;
    }

    if (player.isFilterVariantPrepared(variantOverrides)) {
      return true;
    }

    const renderMode = resolveRetroVariantPreparationRenderMode(variantOverrides);

    if (renderMode === "full" && !fullModeConfirmedRef.current) {
      let persistForFuture = false;
      const confirmed = await confirmDialog({
        title: locale === "ja" ? `${title} の準備` : `Prepare ${title}`,
        body: locale === "ja"
          ? `${title} は Full mode のため、準備が完了するまで少し時間がかかることがあります。続行しますか？`
          : `${title} uses full mode and may take a moment to prepare. Continue?`,
        okText: locale === "ja" ? "準備する" : "Prepare",
        cancelText: locale === "ja" ? "キャンセル" : "Cancel",
        persistCheckboxLabel: locale === "ja" ? "次回から表示しない" : "Don't show this again",
        onConfirmPersistChange: (checked: boolean) => {
          persistForFuture = checked;
        },
      });
      if (!confirmed) {
        return false;
      }
      fullModeConfirmedRef.current = true;
      writeSessionFullModeConfirmed(true);
      if (persistForFuture) {
        persistentFullModeConfirmedRef.current = true;
        writePersistedFullModeConfirmed(true);
      }
    }

    await runWithFullPresetLock(async () => {
      await player.runWithRenderPaused(async () => {
        await player.prepareFilterVariantWithLabel(
          locale === "ja" ? `${label} を準備中...` : `Preparing ${label}...`,
          variantOverrides,
        );
      });
    });
    return true;
  }, [
    confirmDialog,
    isPreparingFullPreset,
    locale,
    player.isFilterVariantPrepared,
    player.prepareFilterVariantWithLabel,
    runWithFullPresetLock,
  ]);

  const applyPresetWithAspect = React.useCallback(
    async (presetKey: RetroPresetKey) => {
      if (isPreparingFullPreset) {
        return;
      }

      const selectedPreset: RetroPresetDefinition = RETRO_PRESETS[presetKey];
      const presetVariantOverrides = buildRetroPresetVariantPreparation(selectedPreset);
      const prepared = await prepareVariantIfNeeded({
        title: selectedPreset.label,
        label: selectedPreset.label,
        variantOverrides: presetVariantOverrides,
      });
      if (!prepared) {
        return;
      }

      filterState.applyPreset(presetKey);
      phosphorDotAspectActiveRef.current = presetKey === "phosphorDot";
      autoTargetSizeAppliedKeyRef.current = null;

      // "None" is meant to be a neutral pass-through, not a way to also
      // silence audio effects — keep Effect on (Noise is left as-is).
      if (presetKey === "none" && !player.isAudioFxEnabled) {
        player.toggleAudioFx();
      }

      if (presetKey !== "phosphorDot" || !player.sourceDimensions) return;

      const phosphorDotPreset: RetroPresetDefinition = RETRO_PRESETS.phosphorDot;
      const { width: nextWidth, height: nextHeight } = computePhosphorDotDimensions(
        player.sourceDimensions.width,
        player.sourceDimensions.height,
      );

      if (phosphorDotPreset.width === nextWidth && phosphorDotPreset.height === nextHeight) return;
      filterState.setTargetWidth(nextWidth);
      filterState.setTargetHeight(nextHeight);
    },
    [
      buildRetroPresetVariantPreparation,
      filterState.applyPreset,
      filterState.setTargetHeight,
      filterState.setTargetWidth,
      isPreparingFullPreset,
      player.sourceDimensions,
      player.isAudioFxEnabled,
      player.toggleAudioFx,
      computePhosphorDotDimensions,
      prepareVariantIfNeeded,
    ],
  );

  const handleRequestEnableBeamCross = React.useCallback(async () => {
    if (isPreparingFullPreset || filterState.phosphorDotShape === "beam") {
      return;
    }

    const beamVariantOverrides = {
      paletteMode: filterState.paletteMode,
      phosphorDotShape: "beam" as const,
      phosphorStrength: filterState.phosphorStrength,
      spotMaskStrength: filterState.spotMaskStrength,
      compositeEnabled: filterState.compositeEnabled,
      compositeAmount: filterState.compositeAmount,
    };

    const prepared = await prepareVariantIfNeeded({
      title: "CRT Beam",
      label: "CRT Beam",
      variantOverrides: beamVariantOverrides,
    });
    if (!prepared) {
      return;
    }

    filterState.setPhosphorDotShape("beam");
  }, [
    filterState.compositeAmount,
    filterState.compositeEnabled,
    filterState.paletteMode,
    filterState.phosphorStrength,
    filterState.phosphorDotShape,
    filterState.setPhosphorDotShape,
    filterState.spotMaskStrength,
    isPreparingFullPreset,
    prepareVariantIfNeeded,
  ]);

  const handleRequestEnableComposite = React.useCallback(async () => {
    if (isPreparingFullPreset || filterState.compositeEnabled) {
      return;
    }

    const compositeVariantOverrides = {
      paletteMode: filterState.paletteMode,
      phosphorDotShape: filterState.phosphorDotShape,
      phosphorStrength: filterState.phosphorStrength,
      spotMaskStrength: filterState.spotMaskStrength,
      compositeEnabled: true,
      compositeAmount: Math.max(filterState.compositeAmount, 0.01),
    };

    const prepared = await prepareVariantIfNeeded({
      title: "Composite / NTSC",
      label: "Composite / NTSC",
      variantOverrides: compositeVariantOverrides,
    });
    if (!prepared) {
      return;
    }

    filterState.setCompositeEnabled(true);
  }, [
    filterState.compositeAmount,
    filterState.compositeEnabled,
    filterState.paletteMode,
    filterState.phosphorDotShape,
    filterState.phosphorStrength,
    filterState.setCompositeEnabled,
    filterState.spotMaskStrength,
    isPreparingFullPreset,
    prepareVariantIfNeeded,
  ]);

  // Catch the cases the click-time correction above misses: the preset was
  // applied before a source was loaded, or a new source loads afterward.
  React.useEffect(() => {
    if (!phosphorDotAspectActiveRef.current) return;
    if (!player.sourceDimensions) return;

    const { width: nextWidth, height: nextHeight } = computePhosphorDotDimensions(
      player.sourceDimensions.width,
      player.sourceDimensions.height,
    );

    if (nextWidth === filterState.targetWidth && nextHeight === filterState.targetHeight) return;
    filterState.setTargetWidth(nextWidth);
    filterState.setTargetHeight(nextHeight);
  }, [
    player.sourceDimensions,
    computePhosphorDotDimensions,
    filterState.targetWidth,
    filterState.targetHeight,
    filterState.setTargetWidth,
    filterState.setTargetHeight,
  ]);

  React.useEffect(() => {
    if (!filterState.autoTargetSize) {
      autoTargetSizeAppliedKeyRef.current = null;
      return;
    }

    // phosphorDot / phosphorDotSmooth own target width/height themselves.
    // Letting autoTargetSize write here as well causes a visible feedback loop
    // where source-size clamping and phosphor-dot aspect correction keep
    // overwriting each other every render.
    if (phosphorDotAspectActiveRef.current) {
      autoTargetSizeAppliedKeyRef.current = null;
      return;
    }

    const dims = player.sourceDimensions;
    if (!dims?.width || !dims?.height) return;

    const { width: nextWidth, height: nextHeight } = clampAutoTargetSize(dims.width, dims.height);
    const sourceKey = `${src ?? "stream"}:${stream?.id ?? ""}:${kind}:${dims.width}x${dims.height}`;
    const alreadyAppliedToThisSource = autoTargetSizeAppliedKeyRef.current === sourceKey;
    const targetAlreadyMatchesAutoSize =
      nextWidth === filterState.targetWidth && nextHeight === filterState.targetHeight;

    if (alreadyAppliedToThisSource && targetAlreadyMatchesAutoSize) return;
    autoTargetSizeAppliedKeyRef.current = sourceKey;

    if (nextWidth !== filterState.targetWidth) {
      filterState.setTargetWidth(nextWidth);
    }
    if (nextHeight !== filterState.targetHeight) {
      filterState.setTargetHeight(nextHeight);
    }
  }, [
    clampAutoTargetSize,
    filterState.autoTargetSize,
    filterState.targetHeight,
    filterState.targetWidth,
    filterState.setTargetHeight,
    filterState.setTargetWidth,
    kind,
    player.sourceDimensions,
    src,
    stream?.id,
  ]);

  // --- Effects ---

  // Sync target aspect when source dimensions become available.
  // Skipped while phosphorDot's own aspect correction owns width/height —
  // otherwise the two effects fight over targetWidth/targetHeight every
  // time either one changes (visible as constant chattering in the UI).
  React.useEffect(() => {
    if (phosphorDotAspectActiveRef.current) return;
    if (!filterState.matchTargetAspect) return;
    if (!player.sourceDimensions) return;
    syncTargetAspect();
  }, [filterState.matchTargetAspect, player.sourceDimensions, syncTargetAspect]);

  // Load source: src URL or MediaStream.
  // lastPreviewRequestRef prevents duplicate loads on re-render.
  React.useEffect(() => {
    if (stream) {
      const streamKey = `stream:${stream.id}:${kind}:${streamName ?? ""}`;
      if (lastPreviewRequestRef.current === streamKey) return;
      lastPreviewRequestRef.current = streamKey;

      void (async () => {
        try {
          await player.previewStream(
            stream,
            kind === "audio" ? "audio" : "video",
            streamName,
          );
        } catch (error) {
          onError?.(error instanceof Error ? error : new Error(String(error)));
        }
      })();
      return;
    }

    if (!src) {
      lastPreviewRequestRef.current = "";
      return;
    }

    const srcKey = `src:${src}:${kind}`;
    if (lastPreviewRequestRef.current === srcKey) return;
    lastPreviewRequestRef.current = srcKey;

    void (async () => {
        try {
          await player.previewUrl(src, kind, displayName);
        } catch (error) {
          onError?.(error instanceof Error ? error : new Error(String(error)));
        }
      })();
  }, [displayName, src, stream, streamName, kind, onError, player]);

  // Layout refresh when fit-mode changes (pin/maximize handled in RetroPreviewView).
  React.useEffect(() => {
    scheduleRefreshLayout();
  }, [isFitWidthEnabled, scheduleRefreshLayout]);

  // Layout refresh when filter resolution or target size changes.
  React.useEffect(() => {
    scheduleRefreshLayout();
  }, [
    filterState.targetWidth,
    filterState.targetHeight,
    filterState.isFilterEnabled,
    renderResolutionScale,
    scheduleRefreshLayout,
  ]);

  React.useEffect(() => {
    scheduleRefreshLayout();
  }, [effectiveMaximizePerformanceMode, scheduleRefreshLayout]);

  React.useEffect(() => {
    return () => {
      if (refreshLayoutFrameRef.current !== null) {
        window.cancelAnimationFrame(refreshLayoutFrameRef.current);
        refreshLayoutFrameRef.current = null;
      }
    };
  }, []);

  // Propagate looping prop to the player.
  React.useEffect(() => {
    if (typeof looping !== "boolean") return;

    const mediaKey = stream
      ? `stream:${stream.id}:${kind}`
      : src
        ? `src:${src}:${kind}`
        : "";

    if (!mediaKey) {
      lastLoopingPresetRef.current = "";
      return;
    }

    const presetKey = `${mediaKey}:${looping}`;
    if (lastLoopingPresetRef.current === presetKey) return;
    lastLoopingPresetRef.current = presetKey;
    player.setLoopingEnabled(looping);
  }, [kind, looping, player, src, stream]);

  // --- Render ---

  // Dialog path (className provided): simple inline layout, all modes work normally.
  if (className) {
    return (
      <section className={className}>
        <div className="space-y-4">
          <RetroPreviewView
            locale={locale}
            src={src}
            kind={kind}
            player={player}
            interactionLocked={isPreparingFullPreset}
            isHighResolution={isHighResolution}
            renderResolutionPreset={renderResolutionPreset}
            isFitWidthEnabled={isFitWidthEnabled}
            controlPanelMode={controlPanelMode}
            confirmDialog={confirmDialog}
            onHighResolutionToggle={handleToggleHighResolution}
            onFitWidthChange={setIsFitWidthEnabled}
            onError={onError}
            onIsPinnedPreviewChange={setIsPinnedInPreview}
            onIsPreviewMaximizedChange={setIsPreviewMaximizedForRenderer}
            previewLayoutState={previewLayoutState}
            onPreviewLayoutStateChange={onPreviewLayoutStateChange}
            maximizePerformanceMode={maximizePerformanceMode}
            onMaximizePerformanceModeChange={handleMaximizePerformanceModeChange}
            onTemporarilyDisableRenderCap={handleTemporarilyDisableRenderCap}
            shaderCompileCacheBusterEnabled={shaderCompileCacheBusterEnabled}
            onShaderCompileCacheBusterEnabledChange={setShaderCompileCacheBusterEnabled}
            graphicsBackendMode={graphicsBackendMode}
            onGraphicsBackendModeChange={handleGraphicsBackendModeChange}
            graphicsBackendRestartPending={graphicsBackendRestartPending}
            onRestartApplication={handleRestartApplication}
            analyserRef={player.analyserRef}
            showVideoSpectrum={showVideoSpectrum}
            showClockOverlay={showClockOverlay}
            ffmpegUseQsv={ffmpegUseQsv}
            onToggleFfmpegUseQsv={handleToggleFfmpegUseQsv}
            ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
            onFfmpegMaxConcurrentHlsSessionsChange={handleFfmpegMaxConcurrentHlsSessionsChange}
            selectedPreset={filterState.selectedPreset}
            onApplyPreset={applyPresetWithAspect}
            gameControls={gameControls}
            nativeOverrideElement={
              nativePlaybackMode && gameControls?.kind === "nes"
                ? nativeOverrideElement ?? null
                : null
            }
          />
          <RetroControlPanel
            locale={locale}
            player={player}
            filterState={filterState}
            interactionLocked={isPreparingFullPreset}
            controlPanelMode={controlPanelMode}
            gameControls={gameControls}
            onControlPanelModeChange={setControlPanelMode}
            onApplyPreset={applyPresetWithAspect}
            onSetTargetWidth={handleSetTargetWidth}
            onSetTargetHeight={handleSetTargetHeight}
            onSetMatchTargetAspect={handleSetMatchTargetAspect}
            onResetSettings={resetAllSettings}
            onImportSettings={handleImportSettings}
            isNativePlaybackMode={nativePlaybackMode}
            nativePlaybackNeedsReload={nativePlaybackMode !== startupNativeMode}
            onToggleNativePlaybackMode={handleToggleNativePlaybackMode}
            isAudioFxUnavailable={isAudioFxUnavailable}
            onRequestEnableBeamCross={handleRequestEnableBeamCross}
            onRequestEnableComposite={handleRequestEnableComposite}
          />
        </div>
      </section>
    );
  }

  // Main path: RetroPlayerLayout handles layout per mode.
  // fitwidth takes priority — opening settings in fitwidth keeps the scrollable layout.
  const layoutMode: RetroLayoutMode =
    isFitWidthEnabled
      ? "fitwidth"
      : controlPanelMode !== "playback" || isPinnedInPreview
        ? "settings"
        : "playback";

  // settings mode also uses fillHeight: preview fills the fixed 33dvh wrapper
  const fillHeight = layoutMode === "playback" || layoutMode === "settings";

  const controlPanelProps = {
    locale,
    player,
    filterState,
    interactionLocked: isPreparingFullPreset,
    onControlPanelModeChange: setControlPanelMode,
    onApplyPreset: applyPresetWithAspect,
    onSetTargetWidth: handleSetTargetWidth,
    onSetTargetHeight: handleSetTargetHeight,
    onSetMatchTargetAspect: handleSetMatchTargetAspect,
    onResetSettings: resetAllSettings,
    onImportSettings: handleImportSettings,
    gameControls,
    onPrevTrack,
    onNextTrack,
    onForceReplay: handleForceReplay,
    loopMode,
    onCycleLoopMode,
    onLoopLongPress,
    showVideoSpectrum,
    onToggleVideoSpectrum: () => setShowVideoSpectrum(v => !v),
    showClockOverlay,
    onToggleClockOverlay: () => setShowClockOverlay(v => !v),
    isNativePlaybackMode: nativePlaybackMode,
    nativePlaybackNeedsReload: nativePlaybackMode !== startupNativeMode,
    onToggleNativePlaybackMode: handleToggleNativePlaybackMode,
    isAudioFxUnavailable,
    onRequestEnableBeamCross: handleRequestEnableBeamCross,
    onRequestEnableComposite: handleRequestEnableComposite,
    clearFullVariantConfirmations,
  } as const;

  const controlPanel = layoutMode === "settings"
    ? (
      <RetroControlPanel
        {...controlPanelProps}
        controlPanelMode={controlPanelMode}
      />
    )
    : (
      <RetroControlPanel
        {...controlPanelProps}
        controlPanelMode={layoutMode === "fitwidth" ? controlPanelMode : "playback"}
      />
    );

  return (
    <div
      className="flex flex-col h-full rounded-2xl p-0.75 shadow-md"
      style={{
        background: "linear-gradient(135deg, #555 0%, #111 30%, #333 65%, #111 100%)",
      }}
    >
      <section className={`relative flex flex-col flex-1 min-h-0 ${layoutMode === "fitwidth" ? "overflow-y-auto" : "overflow-hidden"} rounded-[13px] bg-[rgba(245,241,234,0.78)] p-3`}>
        <RetroPlayerLayout
          mode={layoutMode}
          preview={
            <RetroPreviewView
              locale={locale}
              src={src}
              kind={kind}
              player={player}
              interactionLocked={isPreparingFullPreset}
              isHighResolution={isHighResolution}
              renderResolutionPreset={renderResolutionPreset}
              isFitWidthEnabled={isFitWidthEnabled}
              controlPanelMode={controlPanelMode}
              confirmDialog={confirmDialog}
              fillHeight={fillHeight}
              onHighResolutionToggle={handleToggleHighResolution}
              onFitWidthChange={setIsFitWidthEnabled}
              onError={onError}
              onIsPinnedPreviewChange={setIsPinnedInPreview}
              onIsPreviewMaximizedChange={setIsPreviewMaximizedForRenderer}
              previewLayoutState={previewLayoutState}
              onPreviewLayoutStateChange={onPreviewLayoutStateChange}
              maximizePerformanceMode={maximizePerformanceMode}
              onMaximizePerformanceModeChange={handleMaximizePerformanceModeChange}
              onTemporarilyDisableRenderCap={handleTemporarilyDisableRenderCap}
              shaderCompileCacheBusterEnabled={shaderCompileCacheBusterEnabled}
              onShaderCompileCacheBusterEnabledChange={setShaderCompileCacheBusterEnabled}
              graphicsBackendMode={graphicsBackendMode}
              onGraphicsBackendModeChange={handleGraphicsBackendModeChange}
              graphicsBackendRestartPending={graphicsBackendRestartPending}
              onRestartApplication={handleRestartApplication}
              analyserRef={player.analyserRef}
              showVideoSpectrum={showVideoSpectrum}
            showClockOverlay={showClockOverlay}
              ffmpegUseQsv={ffmpegUseQsv}
              onToggleFfmpegUseQsv={handleToggleFfmpegUseQsv}
              ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
              onFfmpegMaxConcurrentHlsSessionsChange={handleFfmpegMaxConcurrentHlsSessionsChange}
              onPreviewPointerMove={handlePreviewPointerMove}
              selectedPreset={filterState.selectedPreset}
              onApplyPreset={applyPresetWithAspect}
              gameControls={gameControls}
              nativeOverrideElement={
                nativePlaybackMode && gameControls?.kind === "nes"
                  ? nativeOverrideElement ?? null
                  : null
              }
            />
          }
          playbackControls={controlPanel}
          settingsOverlay={controlPanel}
          isPinnedInSettings={isPinnedInPreview && layoutMode === "settings"}
        />
      </section>
    </div>
  );
}

export default RetroPlayer;
