import React from "react";

/**
 * Layout modes for RetroPlayer.
 *
 * Add new modes here as display contexts grow (e.g. "landscape-phone", "compact").
 * Each mode maps to a specific layout strategy in RetroPlayerLayout.
 */
export type RetroLayoutMode =
  | "playback"   // flex, fills container: preview flex-1, controls shrink-0
  | "fitwidth"   // natural height, page scrolls (manga / wide content)
  | "settings"   // preview pinned at top (~1/3), settings panel fills rest with single scroll
  | "dialog";    // dialog / className context: natural height, no constraints

type RetroPlayerLayoutProps = {
  mode: RetroLayoutMode;
  /** RetroPreviewView */
  preview: React.ReactNode;
  /** RetroControlPanel in playback mode */
  playbackControls: React.ReactNode;
  /** RetroControlPanel in settings mode — shown below the preview */
  settingsOverlay?: React.ReactNode;
  /** When pin is active in settings mode, expand preview slot to 50dvh (half screen) */
  isPinnedInSettings?: boolean;
};

/**
 * Owns all layout decisions for RetroPlayer.
 * RetroPreviewView and RetroControlPanel have no layout knowledge.
 *
 * The two child wrapper divs are always present at fixed positions so React
 * reconciles in place and never re-mounts RetroPreviewView (canvas / player refs).
 *
 * When mode switches between playback and settings, only className/style on the
 * wrappers changes — components inside are updated via props, not re-mounted.
 */
export function RetroPlayerLayout({
  mode,
  preview,
  playbackControls,
  settingsOverlay,
  isPinnedInSettings = false,
}: RetroPlayerLayoutProps) {
  const isFlex = mode === "playback" || mode === "settings";

  return (
    <div className={isFlex ? "flex flex-col flex-1 min-h-0 gap-4" : "space-y-4"}>
      {/*
       * Slot 0 — preview
       *   playback : flex-1 min-h-0  → fills available space
       *   settings : fixed height    → stays visible while adjusting settings
       *   others   : natural height
       */}
      <div
        className={mode === "playback" ? "flex-1 min-h-0" : undefined}
        style={mode === "settings" ? { height: isPinnedInSettings ? "50dvh" : "33dvh", flexShrink: 0 } : undefined}
      >
        {preview}
      </div>

      {/*
       * Slot 1 — controls or settings panel
       *   playback/fitwidth/dialog : shrink-0 / natural → playbackControls
       *   settings                 : flex-1 overflow-y-auto → settingsOverlay (single scroll)
       */}
      <div
        className={
          mode === "playback" ? "shrink-0" :
          mode === "settings" ? "flex-1 min-h-0 overflow-y-auto" :
          undefined
        }
      >
        {mode === "settings" ? settingsOverlay : playbackControls}
      </div>
    </div>
  );
}
