const SHADER_BUSY_OVERLAY_ID = "retro-player-shader-busy-overlay";
const SHADER_BUSY_OVERLAY_STYLE_ID = "retro-player-shader-busy-overlay-style";

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
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(2, 6, 23, 0.72)";
  overlay.style.pointerEvents = "none";

  const card = document.createElement("div");
  card.style.border = "1px solid rgba(100, 116, 139, 0.9)";
  card.style.background = "rgba(15, 23, 42, 0.94)";
  card.style.color = "#e2e8f0";
  card.style.padding = "16px 20px";
  card.style.borderRadius = "16px";
  card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
  card.style.fontFamily = "system-ui, sans-serif";
  card.style.fontSize = "14px";
  card.style.textAlign = "center";
  card.style.minWidth = "280px";

  const spinner = document.createElement("div");
  spinner.setAttribute("data-shader-busy-spinner", "true");
  spinner.style.margin = "0 auto 12px";
  spinner.style.width = "30px";
  spinner.style.height = "30px";
  spinner.style.borderRadius = "9999px";
  spinner.style.border = "2px solid #cac0b2";
  spinner.style.borderTopColor = "#111014";
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

  const subtitle = document.createElement("div");
  subtitle.textContent = "Please wait while the shader is prepared.";
  subtitle.style.marginTop = "6px";
  subtitle.style.fontSize = "12px";
  subtitle.style.color = "#94a3b8";

  card.appendChild(spinner);
  card.appendChild(title);
  card.appendChild(subtitle);
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

export const showShaderBusyOverlay = (label: string) => {
  const overlay = ensureShaderBusyOverlay();
  if (!overlay) {
    return;
  }

  const title = overlay.querySelector("[data-shader-busy-label='true']");
  if (title instanceof HTMLElement) {
    title.textContent = label;
  }

  overlay.style.display = "flex";
};

export const hideShaderBusyOverlay = () => {
  if (typeof document === "undefined") {
    return;
  }

  const overlay = document.getElementById(SHADER_BUSY_OVERLAY_ID);
  if (overlay instanceof HTMLElement) {
    overlay.style.display = "none";
  }
};
