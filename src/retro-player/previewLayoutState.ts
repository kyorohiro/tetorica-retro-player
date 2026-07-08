export type RetroPreviewLayoutState = {
  isFitWidthEnabled: boolean;
  isPreviewMaximized: boolean;
  isPreviewPinned: boolean;
};

export const normalizeRetroPreviewLayoutState = (
  state: RetroPreviewLayoutState,
): RetroPreviewLayoutState => {
  if (state.isPreviewMaximized) {
    return {
      isFitWidthEnabled: false,
      isPreviewMaximized: true,
      isPreviewPinned: false,
    };
  }

  if (state.isPreviewPinned) {
    return {
      isFitWidthEnabled: false,
      isPreviewMaximized: false,
      isPreviewPinned: true,
    };
  }

  if (state.isFitWidthEnabled) {
    return {
      isFitWidthEnabled: true,
      isPreviewMaximized: false,
      isPreviewPinned: false,
    };
  }

  return {
    isFitWidthEnabled: false,
    isPreviewMaximized: false,
    isPreviewPinned: false,
  };
};

export const areRetroPreviewLayoutStatesEqual = (
  a: RetroPreviewLayoutState | undefined,
  b: RetroPreviewLayoutState | undefined,
): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.isFitWidthEnabled === b.isFitWidthEnabled
    && a.isPreviewMaximized === b.isPreviewMaximized
    && a.isPreviewPinned === b.isPreviewPinned;
};

export const DEFAULT_RETRO_PREVIEW_LAYOUT_STATE: RetroPreviewLayoutState = {
  isFitWidthEnabled: false,
  isPreviewMaximized: false,
  isPreviewPinned: false,
};
