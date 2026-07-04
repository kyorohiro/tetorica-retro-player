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

// navigator.vendor is used as the primary discriminator because it is not affected by
// Chrome DevTools' UA override (Chrome always reports "Google Inc." regardless of
// the emulated UA, so spoofed iOS Safari UA strings don't trigger this path).
export const needsNativeAudioSuppression = (
  audioOptimizationMode: "auto" | "chrome" | "safari",
): boolean => {
  if (audioOptimizationMode === "chrome") {
    return false;
  }

  if (audioOptimizationMode === "safari") {
    return true;
  }

  if (typeof navigator === "undefined") return false;
  if (isTauriRuntime()) {
    return false;
  }
  // navigator.vendor === "Apple Computer, Inc." only in real Safari/WebKit.
  // Chrome DevTools UA emulation does NOT change navigator.vendor.
  if (navigator.vendor !== "Apple Computer, Inc.") return false;
  // Exclude iOS Chrome (CriOS), Firefox for iOS (FxiOS), Opera for iOS (OPiOS)
  // which also run on WebKit and share the same vendor string.
  return !/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);
};
