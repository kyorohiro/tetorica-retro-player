import React from "react";
import { usePixiVideoPlayer } from "../hooks/usePixiVideoPlayer";
import {
  useRetroFilterState,
  type RetroFilterInitialState,
} from "../hooks/useRetroFilterState";
import {
  clearPersistedRetroSettings,
  loadPersistedRetroSettings,
} from "../hooks/persistedRetroSettings";
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

type RetroPlayerProps = {
  locale?: RetroPlayerLocale;
  src?: string;
  stream?: MediaStream | null;
  streamName?: string;
  kind?: "video" | "image" | "audio";
  looping?: boolean;
  className?: string;
  onError?: (error: Error) => void;
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
  const [isHighResolution, setIsHighResolution] = React.useState(
    persistedUiSettings?.isHighResolution ?? false,
  );
  const [isFitWidthEnabled, setIsFitWidthEnabled] = React.useState(false);
  const [controlPanelMode, setControlPanelMode] = React.useState<
    "playback" | "audio-settings" | "video-settings"
  >("playback");
  const [isPinnedInPreview, setIsPinnedInPreview] = React.useState(false);

  const lastPreviewRequestRef = React.useRef<string>("");
  const lastLoopingPresetRef = React.useRef<string>("");

  const filterState = useRetroFilterState(initialFilterState);
  const renderResolutionScale = isHighResolution
    ? typeof window !== "undefined"
      ? Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
      : 1
    : 1;
  const player = usePixiVideoPlayer(
    filterState,
    isFitWidthEnabled ? "width" : "contain",
    renderResolutionScale,
    { onEnded, onError },
  );

  // --- Callbacks ---

  const resetAllSettings = React.useCallback(() => {
    clearPersistedRetroSettings();
    filterState.resetSettings();
    player.resetAudioSettings();
    setIsHighResolution(false);
  }, [filterState, player]);

  const handleImportSettings = React.useCallback((data: PresetFileData) => {
    filterState.applyAllFilterSettings(data.filter);
    player.applyAudioSettings(data.audio);
    setIsHighResolution(data.ui.isHighResolution);
    saveLocalePreference(data.locale);
  }, [filterState, player]);

  const syncTargetAspect = React.useCallback(() => {
    if (!player.sourceDimensions) return;

    const nextHeight = Math.max(
      8,
      Math.round(
        (filterState.targetWidth / player.sourceDimensions.width) *
          player.sourceDimensions.height /
          8,
      ) * 8,
    );

    if (nextHeight !== filterState.targetHeight) {
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
            isFitWidthEnabled={isFitWidthEnabled}
            controlPanelMode={controlPanelMode}
            confirmDialog={confirmDialog}
            onHighResolutionChange={setIsHighResolution}
            onFitWidthChange={setIsFitWidthEnabled}
            onError={onError}
            analyserRef={player.analyserRef}
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
              isFitWidthEnabled={isFitWidthEnabled}
              controlPanelMode={controlPanelMode}
              confirmDialog={confirmDialog}
              fillHeight={fillHeight}
              onHighResolutionChange={setIsHighResolution}
              onFitWidthChange={setIsFitWidthEnabled}
              onError={onError}
              onIsPinnedPreviewChange={setIsPinnedInPreview}
              analyserRef={player.analyserRef}
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
