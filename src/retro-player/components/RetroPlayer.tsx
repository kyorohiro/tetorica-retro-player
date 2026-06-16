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
import {
  RETRO_PRESETS,
  type RetroPresetDefinition,
  type RetroPresetKey,
} from "../retro/config";
import type { ConfirmDialogFn, RetroPlayerLocale } from "../types";
import { RetroPreviewView } from "./RetroPreviewView";
import { RetroControlPanel } from "./RetroControlPanel";

const defaultConfirmDialog: ConfirmDialogFn = async ({
  title,
  body,
  okText,
  cancelText,
}) => {
  if (typeof window === "undefined") return false;

  const message = [
    title,
    body,
    okText || cancelText ? `${okText ?? "OK"} / ${cancelText ?? "Cancel"}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return window.confirm(message);
};

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
  confirmDialog = defaultConfirmDialog,
}: RetroPlayerProps) {
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
  );

  // --- Callbacks ---

  const resetAllSettings = React.useCallback(() => {
    clearPersistedRetroSettings();
    filterState.resetSettings();
    player.resetAudioSettings();
    setIsHighResolution(false);
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

  const refitPreview = React.useCallback(() => {
    if (stream && player.isCaptureActive) {
      window.setTimeout(() => {
        void player.previewStream(
          stream,
          kind === "audio" ? "audio" : "video",
          streamName,
        );
      }, 120);
      return;
    }

    window.requestAnimationFrame(() => {
      player.refreshLayout();
      window.requestAnimationFrame(() => {
        player.refreshLayout();
      });
    });
  }, [kind, player, stream, streamName]);

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

  return (
    <section
      className={
        className ??
        "rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg"
      }
    >
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
          onRefit={refitPreview}
          onError={onError}
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
        />
      </div>
    </section>
  );
}

export default RetroPlayer;
