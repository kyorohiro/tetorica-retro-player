import React from "react";
import { usePixiVideoPlayer, type RetroPlaybackEvent } from "../hooks/usePixiVideoPlayer";
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
  RETRO_PRESETS,
  type RetroPresetDefinition,
  type RetroPresetKey,
} from "../retro/config";
import type { ConfirmDialogFn, RetroPlayerLocale } from "../types";
import { RetroPreviewView } from "./RetroPreviewView";
import { RetroControlPanel } from "./RetroControlPanel";
import { RetroPlayerLayout, type RetroLayoutMode } from "./RetroPlayerLayout";
import { useDialog } from "../../useDialog";

const clampRenderResolutionPreset = (value: number): 1 | 2 | 3 => {
  if (value >= 3) return 3;
  if (value >= 2) return 2;
  return 1;
};

const resolveRenderResolutionPreset = (
  ui: PersistedRetroUiSettings | undefined,
): 1 | 2 | 3 => {
  const explicitPreset = ui?.renderResolutionPreset;
  if (typeof explicitPreset === "number" && Number.isFinite(explicitPreset)) {
    return clampRenderResolutionPreset(explicitPreset);
  }
  return ui?.isHighResolution ? 2 : 1;
};

const isTauriRuntime = () =>
  typeof window !== "undefined" &&
  ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);

type RetroPlayerProps = {
  locale?: RetroPlayerLocale;
  src?: string;
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
  loopMode?: "one" | "autoplay" | "all" | "off";
  onCycleLoopMode?: () => void;
};

export function RetroPlayer({
  locale = "en",
  src,
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
  loopMode,
  onCycleLoopMode,
}: RetroPlayerProps) {
  const { showConfirmDialog } = useDialog();
  const confirmDialog: ConfirmDialogFn = confirmDialogProp ??
    ((opts) => showConfirmDialog({ ...opts, title: opts.title ?? "", body: opts.body ?? "" }).then((v) => v ?? false));

  // isHighResolution and isFitWidthEnabled live here because they are args to
  // usePixiVideoPlayer. Their toggle buttons are in RetroPreviewView.
  const persistedUiSettings = React.useMemo(
    () => loadPersistedRetroSettings()?.ui,
    [],
  );

  const startupNativeMode = React.useRef(getNativePlaybackMode()).current;
  const startupUseQsv = React.useRef(getFfmpegUseQsv()).current;
  const startupMaxConcurrentHlsSessions = React.useRef(getFfmpegMaxConcurrentHlsSessions()).current;
  const [nativePlaybackMode, setNativePlaybackModeState] = React.useState(startupNativeMode);
  const [ffmpegUseQsv, setFfmpegUseQsvState] = React.useState(startupUseQsv);
  const [ffmpegMaxConcurrentHlsSessions, setFfmpegMaxConcurrentHlsSessionsState] = React.useState(
    startupMaxConcurrentHlsSessions,
  );

  const handleToggleNativePlaybackMode = React.useCallback(() => {
    const next = !nativePlaybackMode;
    setNativePlaybackMode(next);
    setNativePlaybackModeState(next);
  }, [nativePlaybackMode]);

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

  const [renderResolutionPreset, setRenderResolutionPreset] = React.useState<1 | 2 | 3>(
    resolveRenderResolutionPreset(persistedUiSettings),
  );
  const isHighResolution = renderResolutionPreset > 1;
  const [isFitWidthEnabled, setIsFitWidthEnabled] = React.useState(false);
  const [controlPanelMode, setControlPanelMode] = React.useState<
    "playback" | "audio-settings" | "video-settings"
  >("playback");
  const [isPinnedInPreview, setIsPinnedInPreview] = React.useState(false);
  const [showVideoSpectrum, setShowVideoSpectrum] = React.useState(false);

  React.useEffect(() => {
    void syncFfmpegUseQsv(startupUseQsv);
  }, [startupUseQsv, syncFfmpegUseQsv]);

  React.useEffect(() => {
    void syncFfmpegMaxConcurrentHlsSessions(startupMaxConcurrentHlsSessions);
  }, [startupMaxConcurrentHlsSessions, syncFfmpegMaxConcurrentHlsSessions]);

  const lastPreviewRequestRef = React.useRef<string>("");
  const lastLoopingPresetRef = React.useRef<string>("");

  const filterState = useRetroFilterState(
    startupNativeMode ? { ...initialFilterState, isFilterEnabled: false } : initialFilterState,
  );
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
      playbackSource,
      preferNativeVideoSurface: nativePlaybackMode,
    },
  );

  // --- Callbacks ---

  const resetAllSettings = React.useCallback(() => {
    clearPersistedRetroSettings();
    filterState.resetSettings();
    player.resetAudioSettings();
    setRenderResolutionPreset(1);
  }, [filterState, player]);

  const handleImportSettings = React.useCallback((data: PresetFileData) => {
    filterState.applyAllFilterSettings(data.filter);
    player.applyAudioSettings(data.audio);
    setRenderResolutionPreset(resolveRenderResolutionPreset(data.ui));
    saveLocalePreference(data.locale);
  }, [filterState, player]);

  const handleToggleHighResolution = React.useCallback(() => {
    setRenderResolutionPreset((current) => (current > 1 ? 1 : 2));
  }, []);

  const handleCycleHighResolutionMode = React.useCallback(() => {
    setRenderResolutionPreset((current) => {
      if (current === 1) return 3;
      if (current === 2) return 3;
      return 1;
    });
  }, []);

  const syncTargetAspect = React.useCallback(() => {
    const dims = player.sourceDimensions;
    if (!dims || dims.width <= 0 || dims.height <= 0) return;

    const nextHeight = Math.max(
      8,
      Math.round(
        (filterState.targetWidth / dims.width) * dims.height / 8,
      ) * 8,
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
      filterState.setTargetWidth(targetWidth);
      if (!filterState.matchTargetAspect) return;

      const aspectRatio = Math.max(getTargetAspectRatio(), 0.0001);
      filterState.setTargetHeight(Math.max(1, Math.round(targetWidth / aspectRatio)));
    },
    [filterState, getTargetAspectRatio],
  );

  const handleSetTargetHeight = React.useCallback(
    (targetHeight: number) => {
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
      if (matchTargetAspect && player.sourceDimensions) {
        syncTargetAspect();
      }
    },
    [filterState, player.sourceDimensions, syncTargetAspect],
  );

  // phosphorDot preset needs aspect-aware dimension adjustment.
  const applyPresetWithAspect = React.useCallback(
    (presetKey: RetroPresetKey) => {
      filterState.applyPreset(presetKey);
      if (presetKey !== "phosphorDot" || !player.sourceDimensions) return;

      const preset: RetroPresetDefinition = RETRO_PRESETS.phosphorDot;
      const sourceWidth = Math.max(player.sourceDimensions.width, 1);
      const sourceHeight = Math.max(player.sourceDimensions.height, 1);
      const sourceAspect = sourceWidth / sourceHeight;
      const presetAspect = preset.width / preset.height;

      let nextWidth = preset.width;
      let nextHeight = preset.height;

      if (sourceAspect > presetAspect) {
        nextHeight = Math.max(8, Math.round((preset.width / sourceAspect) / 8) * 8);
      } else {
        nextWidth = Math.max(8, Math.round((preset.height * sourceAspect) / 8) * 8);
      }

      if (preset.width === nextWidth && preset.height === nextHeight) return;
      filterState.setTargetWidth(nextWidth);
      filterState.setTargetHeight(nextHeight);
    },
    [
      filterState.applyPreset,
      filterState.setTargetHeight,
      filterState.setTargetWidth,
      player.sourceDimensions,
    ],
  );

  // --- Effects ---

  // Sync target aspect when source dimensions become available.
  React.useEffect(() => {
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
        await player.previewUrl(src, kind);
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    })();
  }, [src, stream, streamName, kind, onError, player]);

  // Layout refresh when fit-mode changes (pin/maximize handled in RetroPreviewView).
  React.useEffect(() => {
    player.refreshLayout();
  }, [isFitWidthEnabled, player.refreshLayout]);

  // Layout refresh when filter resolution or target size changes.
  React.useEffect(() => {
    player.refreshLayout();
  }, [
    filterState.targetWidth,
    filterState.targetHeight,
    filterState.isFilterEnabled,
    renderResolutionScale,
    player.refreshLayout,
  ]);

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
            isHighResolution={isHighResolution}
            renderResolutionPreset={renderResolutionPreset}
            isFitWidthEnabled={isFitWidthEnabled}
            controlPanelMode={controlPanelMode}
            confirmDialog={confirmDialog}
            onHighResolutionToggle={handleToggleHighResolution}
            onCycleHighResolutionMode={handleCycleHighResolutionMode}
            onFitWidthChange={setIsFitWidthEnabled}
            onError={onError}
            analyserRef={player.analyserRef}
            showVideoSpectrum={showVideoSpectrum}
            ffmpegUseQsv={ffmpegUseQsv}
            onToggleFfmpegUseQsv={handleToggleFfmpegUseQsv}
            ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
            onFfmpegMaxConcurrentHlsSessionsChange={handleFfmpegMaxConcurrentHlsSessionsChange}
          />
          <RetroControlPanel
            locale={locale}
            player={player}
            filterState={filterState}
            controlPanelMode={controlPanelMode}
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
      : controlPanelMode !== "playback"
        ? "settings"
        : "playback";

  // settings mode also uses fillHeight: preview fills the fixed 33dvh wrapper
  const fillHeight = layoutMode === "playback" || layoutMode === "settings";

  const controlPanelProps = {
    locale,
    player,
    filterState,
    onControlPanelModeChange: setControlPanelMode,
    onApplyPreset: applyPresetWithAspect,
    onSetTargetWidth: handleSetTargetWidth,
    onSetTargetHeight: handleSetTargetHeight,
    onSetMatchTargetAspect: handleSetMatchTargetAspect,
    onResetSettings: resetAllSettings,
    onImportSettings: handleImportSettings,
    onPrevTrack,
    onNextTrack,
    loopMode,
    onCycleLoopMode,
    showVideoSpectrum,
    onToggleVideoSpectrum: () => setShowVideoSpectrum(v => !v),
    isNativePlaybackMode: nativePlaybackMode,
    nativePlaybackNeedsReload: nativePlaybackMode !== startupNativeMode,
    onToggleNativePlaybackMode: handleToggleNativePlaybackMode,
  } as const;

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
              isHighResolution={isHighResolution}
              renderResolutionPreset={renderResolutionPreset}
              isFitWidthEnabled={isFitWidthEnabled}
              controlPanelMode={controlPanelMode}
              confirmDialog={confirmDialog}
              fillHeight={fillHeight}
              onHighResolutionToggle={handleToggleHighResolution}
              onCycleHighResolutionMode={handleCycleHighResolutionMode}
              onFitWidthChange={setIsFitWidthEnabled}
              onError={onError}
              onIsPinnedPreviewChange={setIsPinnedInPreview}
              analyserRef={player.analyserRef}
              showVideoSpectrum={showVideoSpectrum}
              ffmpegUseQsv={ffmpegUseQsv}
              onToggleFfmpegUseQsv={handleToggleFfmpegUseQsv}
              ffmpegMaxConcurrentHlsSessions={ffmpegMaxConcurrentHlsSessions}
              onFfmpegMaxConcurrentHlsSessionsChange={handleFfmpegMaxConcurrentHlsSessionsChange}
            />
          }
          playbackControls={
            <RetroControlPanel {...controlPanelProps} controlPanelMode={layoutMode === "fitwidth" ? controlPanelMode : "playback"} />
          }
          settingsOverlay={
            <RetroControlPanel {...controlPanelProps} controlPanelMode={controlPanelMode} />
          }
          isPinnedInSettings={isPinnedInPreview && layoutMode === "settings"}
        />
      </section>
    </div>
  );
}

export default RetroPlayer;
