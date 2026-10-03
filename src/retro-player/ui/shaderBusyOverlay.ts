import type { RetroPlayerLocale } from "../types";

const SHADER_BUSY_OVERLAY_ID = "retro-player-shader-busy-overlay";
const SHADER_BUSY_OVERLAY_STYLE_ID = "retro-player-shader-busy-overlay-style";

let cancelPreparation: (() => void) | undefined;
let elapsedTimer: ReturnType<typeof setInterval> | undefined;
let startedAt = 0;
let overlayLocale: RetroPlayerLocale = "en";
const strings = {
  en: { cancel: "Cancel", cancelling: "Cancelling…", close: "Close", elapsed: "Elapsed", wait: "Please wait while the shader is prepared." },
  ja: { cancel: "中断", cancelling: "中断中…", close: "閉じる", elapsed: "経過", wait: "表示処理を準備しています。" },
};

const updateElapsed = (overlay: HTMLElement) => {
  const elapsed = overlay.querySelector("[data-shader-busy-elapsed]");
  if (elapsed) elapsed.textContent = `${strings[overlayLocale].elapsed}: ${Math.floor((Date.now() - startedAt) / 1000)} s`;
};

const ensureShaderBusyOverlay = () => {
  if (typeof document === "undefined") {
    return null;
  }

  let overlay = document.getElementById(SHADER_BUSY_OVERLAY_ID) as HTMLDivElement | null;
  if (overlay) {
    return overlay;
  }

  overlay = document.createElement("div");
  overlay.id = SHADER_BUSY_OVERLAY_ID;
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "2147483647";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "transparent";
  overlay.style.pointerEvents = "none";
  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";

  const card = document.createElement("div");
  card.style.border = "1px solid rgba(148, 163, 184, 0.95)";
  card.style.background = "rgba(2, 6, 23, 0.94)";
  card.style.color = "#f8fafc";
  card.style.padding = "18px 22px";
  card.style.borderRadius = "16px";
  card.style.boxShadow = "0 14px 36px rgba(0,0,0,0.45)";
  card.style.fontFamily = "system-ui, sans-serif";
  card.style.fontSize = "15px";
  card.style.textAlign = "center";
  card.style.minWidth = "280px";
  card.style.maxWidth = "min(640px, 90vw)";
  card.style.overflowWrap = "anywhere";
  card.style.pointerEvents = "auto";
  card.setAttribute("role", "status");
  card.setAttribute("aria-live", "polite");

  const spinner = document.createElement("div");
  spinner.setAttribute("data-shader-busy-spinner", "true");
  spinner.style.margin = "0 auto 12px";
  spinner.style.width = "30px";
  spinner.style.height = "30px";
  spinner.style.borderRadius = "9999px";
  spinner.style.background = "conic-gradient(from 0deg, transparent 0deg 18deg, #34d399 18deg 360deg)";
  spinner.style.webkitMask = "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))";
  spinner.style.mask = "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))";
  spinner.style.willChange = "transform";
  spinner.style.transform = "translateZ(0)";
  spinner.style.animation = "retro-player-shader-busy-spin 0.9s linear infinite";

  if (typeof spinner.animate === "function") {
    spinner.animate(
      [
        { transform: "translateZ(0) rotate(0deg)" },
        { transform: "translateZ(0) rotate(360deg)" },
      ],
      {
        duration: 900,
        iterations: Number.POSITIVE_INFINITY,
      },
    );
  }

  const title = document.createElement("div");
  title.setAttribute("data-shader-busy-label", "true");
  title.style.fontWeight = "600";
  title.style.fontSize = "15px";
  title.style.letterSpacing = "0.01em";

  const subtitle = document.createElement("div");
  subtitle.setAttribute("data-shader-busy-subtitle", "true");
  subtitle.textContent = strings[overlayLocale].wait;
  subtitle.style.marginTop = "6px";
  subtitle.style.fontSize = "12px";
  subtitle.style.color = "#cbd5e1";

  card.appendChild(spinner);
  card.appendChild(title);
  card.appendChild(subtitle);
  const elapsed = document.createElement("div");
  elapsed.setAttribute("data-shader-busy-elapsed", "true");
  elapsed.style.marginTop = "8px";
  elapsed.style.fontSize = "12px";
  card.appendChild(elapsed);
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.setAttribute("data-shader-busy-cancel", "true");
  cancel.textContent = strings[overlayLocale].cancel;
  cancel.style.cssText = "margin-top:12px;padding:6px 18px;border:1px solid #94a3b8;border-radius:8px;background:#1e293b;color:#f8fafc;cursor:pointer";
  cancel.onclick = () => {
    if (!cancelPreparation) return;
    cancel.disabled = true;
    cancel.textContent = strings[overlayLocale].cancelling;
    const callback = cancelPreparation;
    cancelPreparation = undefined;
    callback();
  };
  card.appendChild(cancel);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  if (!document.getElementById(SHADER_BUSY_OVERLAY_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = SHADER_BUSY_OVERLAY_STYLE_ID;
    style.textContent =
      "@keyframes retro-player-shader-busy-spin { from { transform: translateZ(0) rotate(0deg); } to { transform: translateZ(0) rotate(360deg); } }";
    document.head.appendChild(style);
  }

  return overlay;
};

export const showShaderBusyOverlay = (
  label: string,
  detail?: string,
  onCancel?: () => void,
  locale: RetroPlayerLocale = overlayLocale,
) => {
  overlayLocale = locale;
  const overlay = ensureShaderBusyOverlay();
  if (!overlay) {
    return;
  }

  if (overlay.style.visibility !== "visible") {
    startedAt = Date.now();
    elapsedTimer = setInterval(() => updateElapsed(overlay), 1000);
  }
  updateElapsed(overlay);
  (overlay.querySelector("[data-shader-busy-spinner]") as HTMLElement).hidden = false;
  (overlay.querySelector("[data-shader-busy-elapsed]") as HTMLElement).hidden = false;
  if (onCancel) cancelPreparation = onCancel;
  const cancel = overlay.querySelector("[data-shader-busy-cancel]") as HTMLButtonElement;
  cancel.hidden = !cancelPreparation;
  cancel.disabled = false;
  cancel.textContent = strings[overlayLocale].cancel;
  const title = overlay.querySelector("[data-shader-busy-label='true']");
  if (title instanceof HTMLElement) {
    title.textContent = label;
  }

  const subtitle = overlay.querySelector("[data-shader-busy-subtitle='true']");
  if (subtitle instanceof HTMLElement) {
    subtitle.textContent = detail && detail.trim().length > 0
      ? detail
      : strings[overlayLocale].wait;
  }

  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";
  // Force style/layout flush so the next heavy shader compile does not skip
  // the first visible frame of this overlay.
  overlay.getBoundingClientRect();
};

export const hideShaderBusyOverlay = () => {
  clearInterval(elapsedTimer);
  elapsedTimer = undefined;
  cancelPreparation = undefined;
  if (typeof document === "undefined") {
    return;
  }

  const overlay = document.getElementById(SHADER_BUSY_OVERLAY_ID);
  if (overlay instanceof HTMLElement) {
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
  }
};

export const showShaderPreparationNotice = (
  message: string,
  detail?: string,
  locale: RetroPlayerLocale = overlayLocale,
) => {
  hideShaderBusyOverlay();
  showShaderBusyOverlay(message, detail, hideShaderBusyOverlay, locale);
  clearInterval(elapsedTimer);
  elapsedTimer = undefined;
  const overlay = ensureShaderBusyOverlay();
  if (!overlay) return;
  (overlay.querySelector("[data-shader-busy-spinner]") as HTMLElement).hidden = true;
  (overlay.querySelector("[data-shader-busy-elapsed]") as HTMLElement).hidden = true;
  (overlay.querySelector("[data-shader-busy-cancel]") as HTMLButtonElement).textContent = strings[overlayLocale].close;
};

export const waitForShaderBusyOverlayPaint = async () => {
  if (typeof window === "undefined") {
    return;
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), 32);
  });
};
