// Platform/browser capability predicates shared across the retro-player.
// This module is intentionally dependency-free (no imports from the rest of
// retro-player/) so it can sit underneath both the media and video layers
// without creating an import cycle.

export const isTauriRuntime = () =>
  typeof window !== "undefined" &&
  ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);

export const isWindowsRuntime = () => {
  if (typeof navigator === "undefined") return false;
  return /Windows/i.test(navigator.userAgent || "");
};

export const isAndroidRuntime = () => {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent || "");
};

export const isWindowsChromiumAngleRisk = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent ?? "";
  const userAgentDataBrands = (
    navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }
  ).userAgentData?.brands;
  const isChromium =
    /\b(?:Chrome|Chromium|Edg|OPR|Brave)\//i.test(userAgent) ||
    (Array.isArray(userAgentDataBrands) && userAgentDataBrands.some(({ brand }) => /Chrom/i.test(brand)));

  return isWindowsRuntime() && isChromium;
};

export const isRealSafariWebKit = () => {
  if (typeof navigator === "undefined") return false;
  if (isTauriRuntime()) return false;
  if (navigator.vendor !== "Apple Computer, Inc.") return false;
  return !/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);
};

const readSearchParams = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return null;
  }
};

export const shouldForceRetroFilterCompile = () =>
  readSearchParams()?.get("forceRetroFilterCompile") === "1";

export const resolveVideoFilterLiteDefault = () =>
  isWindowsChromiumAngleRisk() && !shouldForceRetroFilterCompile();

export const resolvePlaybackProfileDefaults = (
  audioOptimizationMode: "auto" | "chrome" | "safari",
) => {
  if (audioOptimizationMode === "chrome") {
    return {
      nativeAudioSuppression: false,
      preferNativeHls: false,
      videoFilterLite: false,
    };
  }

  if (audioOptimizationMode === "safari") {
    return {
      nativeAudioSuppression: true,
      preferNativeHls: true,
      videoFilterLite: false,
    };
  }

  const isSafari = isRealSafariWebKit();
  return {
    nativeAudioSuppression: isSafari,
    preferNativeHls: isSafari,
    videoFilterLite: resolveVideoFilterLiteDefault(),
  };
};

// navigator.vendor is used as the primary discriminator because it is not affected by
// Chrome DevTools' UA override (Chrome always reports "Google Inc." regardless of
// the emulated UA, so spoofed iOS Safari UA strings don't trigger this path).
export const needsNativeAudioSuppression = (
  audioOptimizationMode: "auto" | "chrome" | "safari",
  override?: boolean | null,
): boolean => {
  if (typeof override === "boolean") {
    return override;
  }
  return resolvePlaybackProfileDefaults(audioOptimizationMode).nativeAudioSuppression;
};
