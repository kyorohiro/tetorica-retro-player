import { FILTER_FRAGMENT } from "./shared/filterShader.js";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
  toShaderMonoTint,
} from "./shared/settings.js";

const OVERLAY_KEY = "__tetoricaRetroOverlay";

const vertexShaderSource = `#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;
uniform float uFlipH;
uniform float uFlipV;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  if (uFlipH > 0.5) uv.x = 1.0 - uv.x;
  if (uFlipV > 0.5) uv.y = 1.0 - uv.y;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export function isRetroOverlayActive() {
  return !!globalThis[OVERLAY_KEY];
}

export async function startRetroOverlay(settingsInput) {
  if (globalThis[OVERLAY_KEY]) return { active: true };
  const overlay = createOverlay(normalizeSettings(settingsInput ?? DEFAULT_SETTINGS));
  globalThis[OVERLAY_KEY] = overlay;
  overlay.start();
  return { active: true };
}

export async function stopRetroOverlay() {
  const existing = globalThis[OVERLAY_KEY];
  if (!existing) return { active: false };
  existing.destroy();
  delete globalThis[OVERLAY_KEY];
  return { active: false };
}

export async function toggleRetroOverlay(settingsInput) {
  if (globalThis[OVERLAY_KEY]) return stopRetroOverlay();
  return startRetroOverlay(settingsInput);
}

function createOverlay(settings) {
  let currentSettings = settings;
  const recordButton = document.createElement("button");
  const opacityButton = document.createElement("button");
  opacityButton.type = "button";
  opacityButton.setAttribute("aria-label", "Overlay opacity");
  opacityButton.title = "Overlay opacity";
  opacityButton.style.position = "fixed";
  opacityButton.style.left = "-9999px";
  opacityButton.style.top = "-9999px";
  opacityButton.style.zIndex = "2147483647";
  opacityButton.style.width = "28px";
  opacityButton.style.height = "28px";
  opacityButton.style.padding = "0";
  opacityButton.style.border = "1px solid rgba(196, 230, 125, 0.35)";
  opacityButton.style.borderRadius = "50%";
  opacityButton.style.background = "rgba(9, 10, 8, 0.82)";
  opacityButton.style.cursor = "pointer";
  opacityButton.style.backdropFilter = "blur(8px)";
  opacityButton.style.boxShadow = "0 0 14px rgba(110, 147, 58, 0.22)";
  opacityButton.style.display = "flex";
  opacityButton.style.alignItems = "center";
  opacityButton.style.justifyContent = "center";

  recordButton.type = "button";
  recordButton.setAttribute("aria-label", "Start recording");
  recordButton.title = "Start recording";
  recordButton.style.position = "fixed";
  recordButton.style.left = "-9999px";
  recordButton.style.top = "-9999px";
  recordButton.style.zIndex = "2147483647";
  recordButton.style.width = "28px";
  recordButton.style.height = "28px";
  recordButton.style.padding = "0";
  recordButton.style.border = "1px solid rgba(248, 113, 113, 0.35)";
  recordButton.style.borderRadius = "50%";
  recordButton.style.background = "rgba(24, 9, 10, 0.82)";
  recordButton.style.cursor = "pointer";
  recordButton.style.backdropFilter = "blur(8px)";
  recordButton.style.boxShadow = "0 0 18px rgba(248, 113, 113, 0.22)";
  recordButton.style.display = "flex";
  recordButton.style.alignItems = "center";
  recordButton.style.justifyContent = "center";

  const speedGroup = document.createElement("div");
  speedGroup.style.position = "fixed";
  speedGroup.style.left = "-9999px";
  speedGroup.style.top = "-9999px";
  speedGroup.style.zIndex = "2147483647";
  speedGroup.style.display = "flex";
  speedGroup.style.alignItems = "center";
  speedGroup.style.height = "28px";
  speedGroup.style.border = "1px solid rgba(147, 197, 253, 0.35)";
  speedGroup.style.borderRadius = "999px";
  speedGroup.style.background = "rgba(8, 12, 24, 0.82)";
  speedGroup.style.backdropFilter = "blur(8px)";
  speedGroup.style.boxShadow = "0 0 14px rgba(147, 197, 253, 0.18)";
  speedGroup.style.overflow = "hidden";

  const speedDownButton = document.createElement("button");
  speedDownButton.type = "button";
  speedDownButton.textContent = "−";
  speedDownButton.setAttribute("aria-label", "Decrease speed");
  speedDownButton.style.cssText =
    "background:transparent;border:none;color:#bfdbfe;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  const speedLabel = document.createElement("span");
  speedLabel.textContent = "1×";
  speedLabel.style.cssText =
    'color:#bfdbfe;font:11px "IBM Plex Sans","Segoe UI",sans-serif;min-width:32px;text-align:center;user-select:none;pointer-events:none;';

  const speedUpButton = document.createElement("button");
  speedUpButton.type = "button";
  speedUpButton.textContent = "+";
  speedUpButton.setAttribute("aria-label", "Increase speed");
  speedUpButton.style.cssText =
    "background:transparent;border:none;color:#bfdbfe;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  speedGroup.append(speedDownButton, speedLabel, speedUpButton);

  const brightnessGroup = document.createElement("div");
  brightnessGroup.style.position = "fixed";
  brightnessGroup.style.left = "-9999px";
  brightnessGroup.style.top = "-9999px";
  brightnessGroup.style.zIndex = "2147483647";
  brightnessGroup.style.display = "flex";
  brightnessGroup.style.alignItems = "center";
  brightnessGroup.style.height = "28px";
  brightnessGroup.style.border = "1px solid rgba(251, 191, 36, 0.35)";
  brightnessGroup.style.borderRadius = "999px";
  brightnessGroup.style.background = "rgba(18, 12, 4, 0.82)";
  brightnessGroup.style.backdropFilter = "blur(8px)";
  brightnessGroup.style.boxShadow = "0 0 14px rgba(251, 191, 36, 0.18)";
  brightnessGroup.style.overflow = "hidden";

  const brightnessDownButton = document.createElement("button");
  brightnessDownButton.type = "button";
  brightnessDownButton.textContent = "−";
  brightnessDownButton.setAttribute("aria-label", "Decrease brightness");
  brightnessDownButton.style.cssText =
    "background:transparent;border:none;color:#fde68a;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  const brightnessLabel = document.createElement("span");
  brightnessLabel.textContent = "1.0";
  brightnessLabel.style.cssText =
    'color:#fde68a;font:11px "IBM Plex Sans","Segoe UI",sans-serif;min-width:28px;text-align:center;user-select:none;pointer-events:none;';

  const brightnessUpButton = document.createElement("button");
  brightnessUpButton.type = "button";
  brightnessUpButton.textContent = "+";
  brightnessUpButton.setAttribute("aria-label", "Increase brightness");
  brightnessUpButton.style.cssText =
    "background:transparent;border:none;color:#fde68a;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  brightnessGroup.append(brightnessDownButton, brightnessLabel, brightnessUpButton);

  const frameGroup = document.createElement("div");
  frameGroup.style.position = "fixed";
  frameGroup.style.left = "-9999px";
  frameGroup.style.top = "-9999px";
  frameGroup.style.zIndex = "2147483647";
  frameGroup.style.display = "flex";
  frameGroup.style.alignItems = "center";
  frameGroup.style.height = "28px";
  frameGroup.style.border = "1px solid rgba(148, 163, 184, 0.35)";
  frameGroup.style.borderRadius = "999px";
  frameGroup.style.background = "rgba(10, 12, 18, 0.82)";
  frameGroup.style.backdropFilter = "blur(8px)";
  frameGroup.style.boxShadow = "0 0 14px rgba(148, 163, 184, 0.12)";
  frameGroup.style.overflow = "hidden";

  const framePrevButton = document.createElement("button");
  framePrevButton.type = "button";
  framePrevButton.textContent = "‹";
  framePrevButton.setAttribute("aria-label", "Previous frame");
  framePrevButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:16px sans-serif;padding:0 9px;height:100%;line-height:1;";

  const frameNextButton = document.createElement("button");
  frameNextButton.type = "button";
  frameNextButton.textContent = "›";
  frameNextButton.setAttribute("aria-label", "Next frame");
  frameNextButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:16px sans-serif;padding:0 9px;height:100%;line-height:1;border-left:1px solid rgba(148,163,184,0.2);";

  frameGroup.append(framePrevButton, frameNextButton);

  const loopGroup = document.createElement("div");
  loopGroup.style.position = "fixed";
  loopGroup.style.left = "-9999px";
  loopGroup.style.top = "-9999px";
  loopGroup.style.zIndex = "2147483647";
  loopGroup.style.display = "flex";
  loopGroup.style.alignItems = "center";
  loopGroup.style.height = "28px";
  loopGroup.style.border = "1px solid rgba(167, 243, 208, 0.35)";
  loopGroup.style.borderRadius = "999px";
  loopGroup.style.background = "rgba(4, 14, 10, 0.82)";
  loopGroup.style.overflow = "hidden";

  const loopDownButton = document.createElement("button");
  loopDownButton.type = "button";
  loopDownButton.textContent = "−";
  loopDownButton.setAttribute("aria-label", "Decrease loop duration");
  loopDownButton.style.cssText =
    "background:transparent;border:none;color:#a7f3d0;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  const loopLabel = document.createElement("button");
  loopLabel.type = "button";
  loopLabel.setAttribute("aria-label", "Toggle loop");
  loopLabel.style.cssText =
    'background:transparent;border:none;color:#a7f3d0;cursor:pointer;font:11px "IBM Plex Sans","Segoe UI",sans-serif;min-width:32px;text-align:center;padding:0;height:100%;line-height:1;white-space:nowrap;';
  loopLabel.textContent = "↺10";

  const loopUpButton = document.createElement("button");
  loopUpButton.type = "button";
  loopUpButton.textContent = "+";
  loopUpButton.setAttribute("aria-label", "Increase loop duration");
  loopUpButton.style.cssText =
    "background:transparent;border:none;color:#a7f3d0;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  loopGroup.append(loopDownButton, loopLabel, loopUpButton);

  const expandedPanel = document.createElement("div");
  expandedPanel.style.position = "fixed";
  expandedPanel.style.left = "-9999px";
  expandedPanel.style.top = "-9999px";
  expandedPanel.style.zIndex = "2147483646";
  expandedPanel.style.display = "flex";
  expandedPanel.style.flexDirection = "column";
  expandedPanel.style.gap = "6px";
  expandedPanel.style.padding = "8px";
  expandedPanel.style.border = "1px solid rgba(148, 163, 184, 0.2)";
  expandedPanel.style.borderRadius = "12px";
  expandedPanel.style.background = "rgba(8, 10, 16, 0.92)";
  expandedPanel.style.backdropFilter = "blur(12px)";
  expandedPanel.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";

  const flipGroup = document.createElement("div");
  flipGroup.style.position = "fixed";
  flipGroup.style.left = "-9999px";
  flipGroup.style.top = "-9999px";
  flipGroup.style.zIndex = "2147483647";
  flipGroup.style.display = "flex";
  flipGroup.style.alignItems = "center";
  flipGroup.style.height = "28px";
  flipGroup.style.border = "1px solid rgba(148, 163, 184, 0.35)";
  flipGroup.style.borderRadius = "999px";
  flipGroup.style.background = "rgba(10, 12, 18, 0.82)";
  flipGroup.style.overflow = "hidden";

  const flipHButton = document.createElement("button");
  flipHButton.type = "button";
  flipHButton.textContent = "↔";
  flipHButton.setAttribute("aria-label", "Flip horizontal");
  flipHButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:14px sans-serif;padding:0 9px;height:100%;line-height:1;";

  const flipVButton = document.createElement("button");
  flipVButton.type = "button";
  flipVButton.textContent = "↕";
  flipVButton.setAttribute("aria-label", "Flip vertical");
  flipVButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:14px sans-serif;padding:0 9px;height:100%;line-height:1;border-left:1px solid rgba(148,163,184,0.2);";

  flipGroup.append(flipHButton, flipVButton);

  const moreButton = document.createElement("button");
  moreButton.type = "button";
  moreButton.setAttribute("aria-label", "More controls");
  moreButton.title = "More controls";
  moreButton.style.position = "fixed";
  moreButton.style.left = "-9999px";
  moreButton.style.top = "-9999px";
  moreButton.style.zIndex = "2147483647";
  moreButton.style.width = "28px";
  moreButton.style.height = "28px";
  moreButton.style.padding = "0";
  moreButton.style.border = "1px solid rgba(148, 163, 184, 0.35)";
  moreButton.style.borderRadius = "50%";
  moreButton.style.background = "rgba(10, 12, 18, 0.82)";
  moreButton.style.cursor = "pointer";
  moreButton.style.backdropFilter = "blur(8px)";
  moreButton.style.boxShadow = "0 0 14px rgba(148, 163, 184, 0.12)";
  moreButton.style.color = "#94a3b8";
  moreButton.style.fontSize = "16px";
  moreButton.style.lineHeight = "1";
  moreButton.textContent = "⋯";

  const surfaces = [];
  let rafId = 0;
  let frameCount = 0;
  const OPACITY_PRESETS = [1, 0.5, 0];
  let overlayOpacity = 1;
  let lastButtonRectKey = "";
  let lastOpacityIdx = -1;
  let lastIsRecording = null;
  let detachStorageListener = null;
  let pointerClientX = null;
  let pointerClientY = null;
  let detachPointerTracking = null;
  let lastHoveredElement = null;
  let lastHoveredDRMVideo = null;

  const BRIGHTNESS_PRESETS = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.5, 2.0];
  const BRIGHTNESS_DEFAULT_IDX = 5; // 1.0
  let brightnessIdx = BRIGHTNESS_DEFAULT_IDX;
  let loopSecs = 10;
  let loopActive = false;
  let panelOpen = false;
  let flipH = false;
  let flipV = false;
  let loopStart = 0;
  let loopEnd = 0;
  let loopTimeupdateListener = null;
  let loopTargetEl = null;
  const rejectedElements = new WeakSet();
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordingStream = null;
  let recordingAudioStream = null;

  opacityButton.addEventListener("click", () => {
    const idx = OPACITY_PRESETS.findIndex((v) => Math.abs(v - overlayOpacity) < 0.01);
    overlayOpacity = OPACITY_PRESETS[(idx + 1) % OPACITY_PRESETS.length];
    for (const surface of surfaces) {
      surface.canvas.style.opacity = String(overlayOpacity);
    }
    updateOpacityButton();
  });

  const SPEED_PRESETS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 4];

  recordButton.addEventListener("click", () => {
    if (mediaRecorder?.state === "recording") {
      stopRecording({ save: true });
      return;
    }

    startRecording();
  });

  speedDownButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    const idx = SPEED_PRESETS.findIndex((s) => Math.abs(s - targetEl.playbackRate) < 0.01);
    if (idx > 0) targetEl.playbackRate = SPEED_PRESETS[idx - 1];
  });

  speedUpButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    const idx = SPEED_PRESETS.findIndex((s) => Math.abs(s - targetEl.playbackRate) < 0.01);
    if (idx !== -1 && idx < SPEED_PRESETS.length - 1) targetEl.playbackRate = SPEED_PRESETS[idx + 1];
  });

  brightnessDownButton.addEventListener("click", () => {
    if (brightnessIdx > 0) {
      brightnessIdx -= 1;
      applyBrightness();
    }
  });

  brightnessUpButton.addEventListener("click", () => {
    if (brightnessIdx < BRIGHTNESS_PRESETS.length - 1) {
      brightnessIdx += 1;
      applyBrightness();
    }
  });

  framePrevButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    if (!targetEl.paused) targetEl.pause();
    targetEl.currentTime = Math.max(0, targetEl.currentTime - 1 / 30);
  });

  frameNextButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    if (!targetEl.paused) targetEl.pause();
    targetEl.currentTime = Math.min(targetEl.duration || Infinity, targetEl.currentTime + 1 / 30);
  });

  moreButton.addEventListener("click", () => {
    panelOpen = !panelOpen;
    updateMoreButton();
    lastButtonRectKey = "";
  });

  flipHButton.addEventListener("click", () => {
    flipH = !flipH;
    syncFlipToTargets();
    updateFlipButtons();
  });

  flipVButton.addEventListener("click", () => {
    flipV = !flipV;
    syncFlipToTargets();
    updateFlipButtons();
  });

  loopDownButton.addEventListener("click", () => {
    if (loopSecs > 1) {
      loopSecs -= 1;
      if (loopActive) activateLoop();
      updateLoopButton();
    }
  });

  loopUpButton.addEventListener("click", () => {
    if (loopSecs < 300) {
      loopSecs += 1;
      if (loopActive) activateLoop();
      updateLoopButton();
    }
  });

  loopLabel.addEventListener("click", () => {
    if (loopActive) {
      clearLoop();
    } else {
      activateLoop();
    }
    updateLoopButton();
  });

  function start() {
    document.body.append(recordButton, opacityButton, speedGroup, brightnessGroup, loopGroup, flipGroup, moreButton, expandedPanel, frameGroup);
    updateOpacityButton();
    attachSettingsSync();
    attachPointerTracking();
    updateRecordButton();
    draw();
  }

  function destroy() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    if (detachStorageListener) {
      detachStorageListener();
      detachStorageListener = null;
    }

    if (detachPointerTracking) {
      detachPointerTracking();
      detachPointerTracking = null;
    }

    stopRecording({ save: false });
    clearLoop();
    destroySurfaces();
    recordButton.remove();
    opacityButton.remove();
    speedGroup.remove();
    brightnessGroup.remove();
    loopGroup.remove();
    flipGroup.remove();
    moreButton.remove();
    expandedPanel.remove();
    frameGroup.remove();
  }

  function attachSettingsSync() {
    if (!chrome?.storage?.onChanged) {
      return;
    }

    const handleStorageChanged = (changes, areaName) => {
      if (areaName !== "local" || !changes[SETTINGS_STORAGE_KEY]?.newValue) {
        return;
      }

      currentSettings = normalizeSettings(changes[SETTINGS_STORAGE_KEY].newValue);
      applySettingsToSurfaces();
      syncSurfaceCount(currentSettings.overlayTargetCount);
    };

    chrome.storage.onChanged.addListener(handleStorageChanged);
    detachStorageListener = () => {
      chrome.storage.onChanged.removeListener(handleStorageChanged);
    };
  }

  function draw() {
    frameCount += 1;
    const targets = collectPreferredTargets();
    syncSurfaceCount(currentSettings.overlayTargetCount);

    // Track hovered DRM video separately
    const drmHovered = findHoveredDRMVideoElement(pointerClientX, pointerClientY);
    if (drmHovered) {
      lastHoveredDRMVideo = drmHovered;
    } else if (lastHoveredDRMVideo) {
      const r = lastHoveredDRMVideo.getBoundingClientRect();
      if (!isPointInsideRect(r, pointerClientX, pointerClientY)) {
        lastHoveredDRMVideo = null;
      }
    }

    // Read all rects first (batch reads before any DOM writes to avoid forced reflow)
    const targetRects = targets.map((t) => t?.getBoundingClientRect() ?? null);

    for (let index = 0; index < surfaces.length; index += 1) {
      const surface = surfaces[index];
      const target = targets[index] ?? null;
      const rect = targetRects[index] ?? null;
      renderSurface(surface, target, rect, index);
      updateSurfaceSpotlight(surface, rect);
    }

    updateButtonPositions(targetRects[0] ?? null);
    updateOpacityButton();
    updateSpeedButtonLabel();
    rafId = requestAnimationFrame(draw);
  }

  function updateSurfaceSpotlight(surface, rect) {
    if (
      typeof pointerClientX !== "number" ||
      typeof pointerClientY !== "number" ||
      !surface.targetElement ||
      !rect ||
      surface.canvas.style.display === "none"
    ) {
      surface.canvas.style.maskImage = "";
      surface.canvas.style.webkitMaskImage = "";
      return;
    }

    if (!isPointInsideRect(rect, pointerClientX, pointerClientY)) {
      surface.canvas.style.maskImage = "";
      surface.canvas.style.webkitMaskImage = "";
      return;
    }

    const localX = pointerClientX - rect.left;
    const localY = pointerClientY - rect.top;
    const mask = `radial-gradient(circle at ${localX}px ${localY}px, transparent 60px, rgba(0,0,0,0.6) 90px, black 120px)`;
    surface.canvas.style.maskImage = mask;
    surface.canvas.style.webkitMaskImage = mask;
  }

  function attachPointerTracking() {
    const handlePointerMove = (event) => {
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
    };

    const clearPointerFocus = () => {
      pointerClientX = null;
      pointerClientY = null;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", clearPointerFocus);
    document.addEventListener("pointerleave", clearPointerFocus);

    detachPointerTracking = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", clearPointerFocus);
      document.removeEventListener("pointerleave", clearPointerFocus);
    };
  }

  function isTargetTypeEnabled(element) {
    if (element instanceof HTMLVideoElement) return currentSettings.overlayVideo;
    if (element instanceof HTMLImageElement) return currentSettings.overlayImage;
    return false;
  }

  function collectPreferredTargets() {
    const currentHover = findPreferredHoverElement(pointerClientX, pointerClientY);
    if (currentHover && isDrawableElement(currentHover) && isTargetTypeEnabled(currentHover)) {
      lastHoveredElement = currentHover;
    }

    if (lastHoveredElement && (!isDrawableElement(lastHoveredElement) || !isInViewport(lastHoveredElement) || !isTargetTypeEnabled(lastHoveredElement))) {
      lastHoveredElement = null;
    }

    const targets = [];
    appendUniqueDrawableTarget(targets, lastHoveredElement);

    for (const candidate of findAutoDrawableTargets()) {
      if (!isTargetTypeEnabled(candidate)) continue;
      appendUniqueDrawableTarget(targets, candidate);
      if (targets.length >= currentSettings.overlayTargetCount) {
        break;
      }
    }

    return targets.slice(0, currentSettings.overlayTargetCount);
  }

  function syncSurfaceCount(count) {
    while (surfaces.length < count) {
      const surface = createOverlaySurface(surfaces.length);
      surface.canvas.style.opacity = String(overlayOpacity);
      const bLevel = BRIGHTNESS_PRESETS[brightnessIdx];
      surface.canvas.style.filter = brightnessIdx !== BRIGHTNESS_DEFAULT_IDX ? `brightness(${bLevel})` : "";
      surface.gl.useProgram(surface.renderer.program);
      surface.gl.uniform1f(surface.renderer.uniformLocations.uFlipH, flipH ? 1 : 0);
      surface.gl.uniform1f(surface.renderer.uniformLocations.uFlipV, flipV ? 1 : 0);
      surfaces.push(surface);
      applySettings(surface.gl, surface.renderer.program, surface.renderer.uniformLocations, currentSettings);
      if (document.body) {
        document.body.append(surface.canvas, surface.failureOverlay);
      }
    }

    while (surfaces.length > count) {
      const surface = surfaces.pop();
      surface?.destroy();
    }
  }

  function destroySurfaces() {
    while (surfaces.length > 0) {
      surfaces.pop()?.destroy();
    }
  }

  function applySettingsToSurfaces() {
    for (const surface of surfaces) {
      applySettings(surface.gl, surface.renderer.program, surface.renderer.uniformLocations, currentSettings);
    }
  }

  function renderSurface(surface, targetElement, rect, priorityIndex) {
    if (!targetElement || !rect || !isDrawableElement(targetElement)) {
      surface.updateTarget(null);
      surface.hide();
      return;
    }

    if (rect.width < 2 || rect.height < 2) {
      surface.updateTarget(null);
      surface.hide();
      return;
    }

    surface.updateTarget(targetElement);
    surface.syncRect(rect);

    if (rejectedElements.has(targetElement)) {
      surface.canvas.style.display = "none";
      surface.showFailureOverlay(rect);
      return;
    }

    const shouldRenderNow =
      surface.didTargetChange || frameCount % getFrameIntervalForPriority(priorityIndex) === 0;

    if (!shouldRenderNow) {
      surface.canvas.style.display = "block";
      surface.hideFailureOverlay();
      return;
    }

    surface.canvas.style.display = "block";
    surface.hideFailureOverlay();
    surface.gl.viewport(0, 0, surface.gl.drawingBufferWidth, surface.gl.drawingBufferHeight);
    surface.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    surface.gl.clear(surface.gl.COLOR_BUFFER_BIT);
    surface.gl.useProgram(surface.renderer.program);
    surface.gl.uniform1f(
      surface.renderer.uniformLocations.uTime,
      (performance.now() - surface.startedAt) / 1000,
    );
    surface.gl.activeTexture(surface.gl.TEXTURE0);
    surface.gl.bindTexture(surface.gl.TEXTURE_2D, surface.renderer.texture);

    try {
      const isSeeking = targetElement instanceof HTMLVideoElement && targetElement.seeking;
      if (!isSeeking) {
        const uploadStart = performance.now();
        surface.gl.texImage2D(
          surface.gl.TEXTURE_2D,
          0,
          surface.gl.RGBA,
          surface.gl.RGBA,
          surface.gl.UNSIGNED_BYTE,
          targetElement,
        );
        const uploadMs = performance.now() - uploadStart;
        surface.didTargetChange = false;
        if (uploadMs > 50) {
          rejectedElements.add(targetElement);
          surface.canvas.style.display = "none";
          surface.showFailureOverlay(rect);
          return;
        }
      }
      surface.gl.drawArrays(surface.gl.TRIANGLES, 0, 6);
    } catch (error) {
      if (error instanceof DOMException && error.name === "SecurityError") {
        rejectedElements.add(targetElement);
        surface.canvas.style.display = "none";
        surface.showFailureOverlay(rect);
        return;
      }

      if (!rejectedElements.has(targetElement)) {
        console.warn("Failed to upload overlay source to WebGL texture.", error);
      }
      rejectedElements.add(targetElement);
      surface.hide();
    }
  }

  return {
    start,
    destroy,
  };

  function startRecording() {
    const activeSurface = surfaces[0];
    if (!activeSurface?.targetElement || activeSurface.canvas.style.display === "none") {
      window.alert("Move the pointer over a visible video or image first.");
      return;
    }

    const canvasStream = activeSurface.canvas.captureStream(30);
    const nextRecordingStream = new MediaStream();
    canvasStream.getVideoTracks().forEach((track) => nextRecordingStream.addTrack(track));

    const audioStream = getElementAudioStream(activeSurface.targetElement);
    audioStream?.getAudioTracks().forEach((track) => nextRecordingStream.addTrack(track));

    const mimeType = getRecordingMimeType();

    try {
      mediaRecorder = mimeType
        ? new MediaRecorder(nextRecordingStream, { mimeType })
        : new MediaRecorder(nextRecordingStream);
    } catch (error) {
      window.alert(
        `Recording is not available: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      nextRecordingStream.getTracks().forEach((track) => track.stop());
      audioStream?.getTracks().forEach((track) => track.stop());
      return;
    }

    recordingStream = nextRecordingStream;
    recordingAudioStream = audioStream;
    recordedChunks = [];
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) {
        recordedChunks.push(event.data);
      }
    });
    mediaRecorder.addEventListener(
      "stop",
      () => {
        cleanupRecordingStreams();
        saveRecording(mediaRecorder?.mimeType || mimeType || "video/webm");
        mediaRecorder = null;
        updateRecordButton();
      },
      { once: true },
    );

    mediaRecorder.start();
    updateRecordButton();
  }

  function stopRecording({ save }) {
    if (!mediaRecorder) {
      cleanupRecordingStreams();
      updateRecordButton();
      return;
    }

    if (!save) {
      recordedChunks = [];
    }

    if (mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      return;
    }

    cleanupRecordingStreams();
    mediaRecorder = null;
    updateRecordButton();
  }

  function cleanupRecordingStreams() {
    recordingStream?.getTracks().forEach((track) => track.stop());
    recordingAudioStream?.getTracks().forEach((track) => track.stop());
    recordingStream = null;
    recordingAudioStream = null;
  }

  function saveRecording(mimeType) {
    if (recordedChunks.length === 0) {
      window.alert("Recording stopped, but no video data was captured.");
      return;
    }

    const blob = new Blob(recordedChunks, { type: mimeType });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `tetorica-overlay-${timestamp}.webm`;
    downloadLink.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    recordedChunks = [];
  }

  function updateRecordButton() {
    const isRecording = mediaRecorder?.state === "recording";
    if (isRecording === lastIsRecording) return;
    lastIsRecording = isRecording;
    recordButton.innerHTML = isRecording
      ? `<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" rx="1" fill="#fca5a5"/></svg>`
      : `<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#f87171"/></svg>`;
    recordButton.style.borderColor = isRecording
      ? "rgba(251, 113, 133, 0.75)"
      : "rgba(248, 113, 113, 0.35)";
    recordButton.style.background = isRecording
      ? "rgba(127, 29, 29, 0.9)"
      : "rgba(24, 9, 10, 0.82)";
    recordButton.style.boxShadow = isRecording
      ? "0 0 22px rgba(251, 113, 133, 0.38)"
      : "0 0 18px rgba(248, 113, 113, 0.22)";
    recordButton.setAttribute("aria-label", isRecording ? "Stop recording" : "Start recording");
    recordButton.title = isRecording ? "Stop recording" : "Start recording";
  }

  function updateOpacityButton() {
    const idx = OPACITY_PRESETS.findIndex((v) => Math.abs(v - overlayOpacity) < 0.01);
    if (idx === lastOpacityIdx) return;
    lastOpacityIdx = idx;
    const icons = [
      `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="#c4e67d"/><text x="9" y="13.5" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#1a2a00">R</text></svg>`,
      `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="#c4e67d" opacity="0.35"/><circle cx="9" cy="9" r="8" fill="none" stroke="#c4e67d" stroke-width="1.5"/><text x="9" y="13.5" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#c4e67d">R</text></svg>`,
      `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="none" stroke="#c4e67d" stroke-width="1.5" stroke-dasharray="3 2"/><text x="9" y="13.5" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#c4e67d" opacity="0.5">R</text></svg>`,
    ];
    opacityButton.innerHTML = icons[idx] ?? icons[0];
  }

  function getActiveVideoForSpeed() {
    const el = surfaces[0]?.targetElement;
    if (el instanceof HTMLVideoElement) return el;
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) return lastHoveredDRMVideo;
    return null;
  }

  function updateSpeedButtonLabel() {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    const rate = targetEl.playbackRate;
    speedLabel.textContent = `${rate}×`;
    const isModified = Math.abs(rate - 1) > 0.01;
    speedLabel.style.color = isModified ? "#a7f3d0" : "#bfdbfe";
    speedGroup.style.borderColor = isModified
      ? "rgba(167, 243, 208, 0.55)"
      : "rgba(147, 197, 253, 0.35)";
    const idx = SPEED_PRESETS.findIndex((s) => Math.abs(s - rate) < 0.01);
    speedDownButton.style.opacity = idx <= 0 ? "0.3" : "1";
    speedUpButton.style.opacity = idx >= SPEED_PRESETS.length - 1 ? "0.3" : "1";
  }

  function syncFlipToTargets() {
    const sx = flipH ? -1 : 1;
    const sy = flipV ? -1 : 1;
    const t = sx === 1 && sy === 1 ? "" : `scale(${sx},${sy})`;
    for (const surface of surfaces) {
      surface.gl.useProgram(surface.renderer.program);
      surface.gl.uniform1f(surface.renderer.uniformLocations.uFlipH, flipH ? 1 : 0);
      surface.gl.uniform1f(surface.renderer.uniformLocations.uFlipV, flipV ? 1 : 0);
      if (surface.targetElement instanceof HTMLVideoElement) {
        surface.targetElement.style.transformOrigin = "center";
        surface.targetElement.style.transform = t;
      }
    }
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) {
      lastHoveredDRMVideo.style.transformOrigin = "center";
      lastHoveredDRMVideo.style.transform = t;
    }
  }

  function updateFlipButtons() {
    flipHButton.style.color = flipH ? "#e2e8f0" : "#94a3b8";
    flipHButton.style.background = flipH ? "rgba(148,163,184,0.2)" : "transparent";
    flipVButton.style.color = flipV ? "#e2e8f0" : "#94a3b8";
    flipVButton.style.background = flipV ? "rgba(148,163,184,0.2)" : "transparent";
    flipGroup.style.borderColor = (flipH || flipV)
      ? "rgba(148,163,184,0.65)"
      : "rgba(148,163,184,0.35)";
  }

  function updateMoreButton() {
    moreButton.style.borderColor = panelOpen
      ? "rgba(148,163,184,0.65)"
      : "rgba(148,163,184,0.35)";
    moreButton.style.background = panelOpen
      ? "rgba(30,34,48,0.92)"
      : "rgba(10,12,18,0.82)";
    moreButton.style.color = panelOpen ? "#e2e8f0" : "#94a3b8";
  }

  function applyBrightness() {
    const level = BRIGHTNESS_PRESETS[brightnessIdx];
    const isModified = brightnessIdx !== BRIGHTNESS_DEFAULT_IDX;
    brightnessLabel.textContent = level.toFixed(1);
    brightnessLabel.style.color = isModified ? "#fcd34d" : "#fde68a";
    brightnessGroup.style.borderColor = isModified
      ? "rgba(252, 211, 77, 0.55)"
      : "rgba(251, 191, 36, 0.35)";
    brightnessDownButton.style.opacity = brightnessIdx <= 0 ? "0.3" : "1";
    brightnessUpButton.style.opacity = brightnessIdx >= BRIGHTNESS_PRESETS.length - 1 ? "0.3" : "1";
    syncBrightnessFilter();
  }

  function syncBrightnessFilter() {
    const level = BRIGHTNESS_PRESETS[brightnessIdx];
    const filterValue = brightnessIdx !== BRIGHTNESS_DEFAULT_IDX ? `brightness(${level})` : "";
    for (const surface of surfaces) {
      surface.canvas.style.filter = filterValue;
      if (surface.targetElement instanceof HTMLVideoElement) {
        surface.targetElement.style.filter = filterValue;
      }
    }
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) {
      lastHoveredDRMVideo.style.filter = filterValue;
    }
  }

  function activateLoop() {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    if (loopTargetEl && loopTimeupdateListener) {
      loopTargetEl.removeEventListener("timeupdate", loopTimeupdateListener);
    }
    loopTargetEl = targetEl;
    loopEnd = targetEl.currentTime;
    loopStart = Math.max(0, loopEnd - loopSecs);
    loopActive = true;
    loopTimeupdateListener = () => {
      if (loopTargetEl && loopTargetEl.currentTime >= loopEnd) {
        loopTargetEl.currentTime = loopStart;
      }
    };
    loopTargetEl.addEventListener("timeupdate", loopTimeupdateListener);
  }

  function clearLoop() {
    if (loopTargetEl && loopTimeupdateListener) {
      loopTargetEl.removeEventListener("timeupdate", loopTimeupdateListener);
    }
    loopTargetEl = null;
    loopTimeupdateListener = null;
    loopActive = false;
  }

  function updateLoopButton() {
    loopLabel.textContent = `↺${loopSecs}`;
    loopLabel.style.color = loopActive ? "#6ee7b7" : "#a7f3d0";
    loopDownButton.style.opacity = loopSecs <= 1 ? "0.3" : "1";
    loopUpButton.style.opacity = loopSecs >= 300 ? "0.3" : "1";
    loopGroup.style.borderColor = loopActive
      ? "rgba(167, 243, 208, 0.75)"
      : "rgba(167, 243, 208, 0.35)";
    loopGroup.style.background = loopActive
      ? "rgba(4, 60, 30, 0.9)"
      : "rgba(4, 14, 10, 0.82)";
    loopGroup.style.boxShadow = loopActive
      ? "0 0 18px rgba(167, 243, 208, 0.38)"
      : "0 0 14px rgba(167, 243, 208, 0.18)";
  }

  function updateButtonPositions(rect) {
    const isDRM = !surfaces[0]?.targetElement && lastHoveredDRMVideo != null;
    const drmRect = isDRM ? lastHoveredDRMVideo.getBoundingClientRect() : null;
    const activeRect = rect ?? drmRect;

    const hideAll = () => {
      recordButton.style.left = "-9999px";
      opacityButton.style.left = "-9999px";
      speedGroup.style.left = "-9999px";
      brightnessGroup.style.left = "-9999px";
      loopGroup.style.left = "-9999px";
      flipGroup.style.left = "-9999px";
      moreButton.style.left = "-9999px";
      expandedPanel.style.left = "-9999px";
      frameGroup.style.left = "-9999px";
    };

    if (!currentSettings.showOverlayButtons || !activeRect) {
      if (lastButtonRectKey !== "") { hideAll(); lastButtonRectKey = ""; }
      return;
    }

    const isVideo = isDRM || surfaces[0]?.targetElement instanceof HTMLVideoElement;
    const isNarrow = activeRect.width < 320;
    const rectKey = `${Math.round(activeRect.right)}:${Math.round(activeRect.top)}:${Math.round(activeRect.width)}:${isDRM ? "d" : ""}:${panelOpen ? "o" : ""}`;
    if (rectKey === lastButtonRectKey) return;
    lastButtonRectKey = rectKey;

    const size = 28;
    const gap = 6;
    const padding = 8;
    const topY = Math.max(0, activeRect.top - Math.round(size * 2 / 3));
    const recLeft = activeRect.right - size + Math.round(size / 3);

    // Anchor for ⋯ button
    let moreLeft;
    if (isDRM) {
      recordButton.style.left = "-9999px";
      opacityButton.style.left = "-9999px";
      moreLeft = recLeft;
    } else {
      recordButton.style.left = `${recLeft}px`;
      recordButton.style.top = `${topY}px`;
      opacityButton.style.left = `${recLeft - size - gap}px`;
      opacityButton.style.top = `${topY}px`;
      moreLeft = recLeft - size - gap - size - gap;
    }

    if (!isVideo) {
      hideAll();
      if (!isDRM) {
        recordButton.style.left = `${recLeft}px`;
        recordButton.style.top = `${topY}px`;
        opacityButton.style.left = `${recLeft - size - gap}px`;
        opacityButton.style.top = `${topY}px`;
      }
      return;
    }

    moreButton.style.left = `${moreLeft}px`;
    moreButton.style.top = `${topY}px`;

    // Frame step is always in bar
    const frameW = frameGroup.offsetWidth || 54;

    if (!isNarrow) {
      // Wide: [‹›] [−s+] [−b+] [⋯] (loop/flip in panel only)
      const brightnessW = brightnessGroup.offsetWidth || 92;
      const brightnessLeft = moreLeft - gap - brightnessW;
      brightnessGroup.style.left = `${brightnessLeft}px`;
      brightnessGroup.style.top = `${topY}px`;
      const speedW = speedGroup.offsetWidth || 92;
      const speedLeft = brightnessLeft - gap - speedW;
      speedGroup.style.left = `${speedLeft}px`;
      speedGroup.style.top = `${topY}px`;
      frameGroup.style.left = `${speedLeft - gap - frameW}px`;
      frameGroup.style.top = `${topY}px`;
    } else {
      // Narrow: [‹›] [⋯] only (speed/brightness/loop/flip all in panel)
      speedGroup.style.left = "-9999px";
      brightnessGroup.style.left = "-9999px";
      frameGroup.style.left = `${moreLeft - gap - frameW}px`;
      frameGroup.style.top = `${topY}px`;
    }

    // Panel
    if (panelOpen) {
      const panelItems = isNarrow
        ? [speedGroup, brightnessGroup, loopGroup, flipGroup]
        : [loopGroup, flipGroup];
      const contentW = Math.max(
        speedGroup.offsetWidth || 92,
        brightnessGroup.offsetWidth || 92,
        loopGroup.offsetWidth || 80,
        flipGroup.offsetWidth || 54,
      );
      const panelW = contentW + padding * 2;
      const panelH = panelItems.length * 28 + (panelItems.length - 1) * gap + padding * 2;
      const panelX = moreLeft + size - panelW;
      const panelY = topY + size + gap;
      expandedPanel.style.left = `${panelX}px`;
      expandedPanel.style.top = `${panelY}px`;
      expandedPanel.style.width = `${panelW}px`;
      expandedPanel.style.height = `${panelH}px`;
      const itemX = panelX + padding;
      let itemY = panelY + padding;
      for (const item of panelItems) {
        item.style.left = `${itemX}px`;
        item.style.top = `${itemY}px`;
        itemY += 28 + gap;
      }
    } else {
      expandedPanel.style.left = "-9999px";
      loopGroup.style.left = "-9999px";
      flipGroup.style.left = "-9999px";
      if (isNarrow) {
        speedGroup.style.left = "-9999px";
        brightnessGroup.style.left = "-9999px";
      }
    }
  }
}

function findPrimaryDrawableElement() {
  return findAutoDrawableTargets()[0] ?? null;
}

function findPreferredHoverElement(clientX, clientY) {
  const hoveredImage = findHoveredImage(clientX, clientY);
  if (hoveredImage) {
    return hoveredImage;
  }

  return findHoveredVideo(clientX, clientY);
}

function findAutoDrawableTargets() {
  return [...document.querySelectorAll("video, img")]
    .filter(isDrawableElement)
    .sort((left, right) => {
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      return rightRect.width * rightRect.height - leftRect.width * leftRect.height;
    });
}

function appendUniqueDrawableTarget(targets, candidate) {
  if (!candidate || !isDrawableElement(candidate) || targets.includes(candidate)) {
    return;
  }

  targets.push(candidate);
}

function getFrameIntervalForPriority(priorityIndex) {
  if (priorityIndex <= 0) {
    return 1;
  }

  if (priorityIndex === 1) {
    return 2;
  }

  return 4;
}

function createOverlaySurface(index) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = String(2147483500 - index * 2);
  canvas.style.pointerEvents = "none";
  canvas.style.display = "none";
  canvas.style.transformOrigin = "top left";
  canvas.dataset.tetoricaOverlay = "true";

  const failureOverlay = document.createElement("div");
  failureOverlay.style.position = "fixed";
  failureOverlay.style.left = "0";
  failureOverlay.style.top = "0";
  failureOverlay.style.zIndex = String(2147483501 - index * 2);
  failureOverlay.style.pointerEvents = "none";
  failureOverlay.style.display = "none";
  failureOverlay.style.alignItems = "center";
  failureOverlay.style.justifyContent = "center";
  failureOverlay.style.border = "1px solid rgba(255, 219, 138, 0.45)";
  failureOverlay.style.background =
    "linear-gradient(180deg, rgba(18, 12, 6, 0.10), rgba(18, 12, 6, 0.30))";
  failureOverlay.style.boxShadow = "inset 0 0 0 1px rgba(255, 246, 214, 0.12)";
  failureOverlay.style.backdropFilter = "blur(1px)";

  const failureOverlayLabel = document.createElement("div");
  failureOverlayLabel.textContent = "Cross-origin image";
  failureOverlayLabel.style.padding = "8px 12px";
  failureOverlayLabel.style.border = "1px solid rgba(255, 219, 138, 0.35)";
  failureOverlayLabel.style.borderRadius = "999px";
  failureOverlayLabel.style.background = "rgba(22, 14, 8, 0.72)";
  failureOverlayLabel.style.color = "#ffe0a6";
  failureOverlayLabel.style.font = '11px "IBM Plex Sans", "Segoe UI", sans-serif';
  failureOverlayLabel.style.letterSpacing = "0.08em";
  failureOverlayLabel.style.textTransform = "uppercase";
  failureOverlayLabel.style.boxShadow = "0 0 18px rgba(255, 180, 82, 0.16)";
  failureOverlay.append(failureOverlayLabel);

  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    throw new Error("WebGL2 is not available on this page.");
  }

  const renderer = setupRenderer(gl);

  return {
    canvas,
    failureOverlay,
    gl,
    renderer,
    targetElement: null,
    startedAt: performance.now(),
    lastRectKey: "",
    didTargetChange: true,
    destroy() {
      canvas.remove();
      failureOverlay.remove();
    },
    updateTarget(nextTarget) {
      if (this.targetElement === nextTarget) {
        return;
      }

      this.targetElement = nextTarget;
      this.startedAt = performance.now();
      this.lastRectKey = "";
      this.didTargetChange = true;
      this.hideFailureOverlay();
    },
    syncRect(rect) {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      const rectKey = [
        Math.round(rect.left),
        Math.round(rect.top),
        Math.round(rect.width),
        Math.round(rect.height),
        width,
        height,
      ].join(":");

      if (rectKey === this.lastRectKey) {
        return;
      }

      this.lastRectKey = rectKey;
      canvas.style.left = `${rect.left}px`;
      canvas.style.top = `${rect.top}px`;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    },
    showFailureOverlay(rect) {
      failureOverlay.style.display = "flex";
      failureOverlay.style.left = `${rect.left}px`;
      failureOverlay.style.top = `${rect.top}px`;
      failureOverlay.style.width = `${rect.width}px`;
      failureOverlay.style.height = `${rect.height}px`;
    },
    hideFailureOverlay() {
      failureOverlay.style.display = "none";
    },
    hide() {
      canvas.style.display = "none";
      this.hideFailureOverlay();
    },
  };
}

function findHoveredVideo(clientX, clientY) {
  if (typeof clientX !== "number" || typeof clientY !== "number") {
    return null;
  }

  return findHoveredMediaElement(
    clientX,
    clientY,
    "video",
    (element) => element instanceof HTMLVideoElement && isUsableVideo(element),
  );
}

function findHoveredDRMVideoElement(clientX, clientY) {
  if (typeof clientX !== "number" || typeof clientY !== "number") {
    return null;
  }
  return findHoveredMediaElement(
    clientX,
    clientY,
    "video",
    (el) => el instanceof HTMLVideoElement && el.mediaKeys != null,
  );
}

function findHoveredImage(clientX, clientY) {
  if (typeof clientX !== "number" || typeof clientY !== "number") {
    return null;
  }

  return findHoveredMediaElement(
    clientX,
    clientY,
    "img",
    (element) => element instanceof HTMLImageElement && isUsableImage(element),
  );
}

function findHoveredMediaElement(clientX, clientY, selector, isUsable) {
  const elementsAtPoint = document.elementsFromPoint(clientX, clientY);
  for (const element of elementsAtPoint) {
    if (isUsable(element)) {
      return element;
    }
  }

  // `elementsFromPoint()` can skip opacity:0 media after we hide the source element.
  const candidates = [...document.querySelectorAll(selector)];
  for (let index = candidates.length - 1; index >= 0; index -= 1) {
    const candidate = candidates[index];
    if (!isUsable(candidate)) {
      continue;
    }

    if (isPointInsideElement(candidate, clientX, clientY)) {
      return candidate;
    }
  }

  return null;
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

function isPointInsideElement(element, clientX, clientY) {
  return isPointInsideRect(element.getBoundingClientRect(), clientX, clientY);
}

function isPointInsideRect(rect, clientX, clientY) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

function isDrawableElement(candidate) {
  if (candidate instanceof HTMLVideoElement) {
    return isUsableVideo(candidate);
  }

  if (candidate instanceof HTMLImageElement) {
    return isUsableImage(candidate);
  }

  return false;
}

function isUsableVideo(candidate) {
  if (!(candidate instanceof HTMLVideoElement)) return false;
  if (candidate.mediaKeys != null) return false;
  if (!candidate.seeking && candidate.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;
  const rect = candidate.getBoundingClientRect();
  return rect.width > 32 && rect.height > 32;
}

function isUsableImage(candidate) {
  if (!(candidate instanceof HTMLImageElement)) return false;
  if (!candidate.complete || candidate.naturalWidth < 1 || candidate.naturalHeight < 1) {
    return false;
  }
  const rect = candidate.getBoundingClientRect();
  return rect.width > 32 && rect.height > 32;
}

function getElementAudioStream(targetElement) {
  if (!(targetElement instanceof HTMLVideoElement)) {
    return null;
  }

  const captureStream =
    targetElement.captureStream?.bind(targetElement) ||
    targetElement.mozCaptureStream?.bind(targetElement);

  if (!captureStream) {
    return null;
  }

  try {
    const stream = captureStream();
    return stream.getAudioTracks().length > 0 ? stream : null;
  } catch {
    return null;
  }
}

function getRecordingMimeType() {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
}

function applySettings(gl, program, uniformLocations, settings) {
  gl.useProgram(program);
  gl.uniform2f(uniformLocations.uTargetSize, settings.targetWidth, settings.targetHeight);
  const phosphorDotInternalScale = settings.phosphorDotInternalScale ? 2 : 1;
  gl.uniform2f(
    uniformLocations.uSampleTargetSize,
    settings.targetWidth * phosphorDotInternalScale,
    settings.targetHeight * phosphorDotInternalScale,
  );
  gl.uniform1f(uniformLocations.uColorLevels, settings.colorLevels);
  gl.uniform1f(uniformLocations.uDitherStrength, settings.ditherStrength);
  gl.uniform1f(uniformLocations.uPaletteMode, paletteModeToUniform(settings.paletteMode));
  gl.uniform1f(uniformLocations.uCurvature, settings.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, settings.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, settings.scanline2Strength);
  gl.uniform1f(uniformLocations.uScanlineBrightnessFade, settings.scanlineBrightnessFade);
  gl.uniform1f(uniformLocations.uVignetteStrength, settings.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, settings.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, settings.phosphorStrength);
  gl.uniform1f(uniformLocations.uSpotMaskStrength, settings.spotMaskStrength);
  gl.uniform1f(uniformLocations.uBulbRadius, settings.bulbRadius ?? 0.22);
  gl.uniform1f(uniformLocations.uBlackFloor, settings.blackFloor ?? 0.01);
  gl.uniform1f(
    uniformLocations.uPhosphorDotLightBalance,
    settings.phosphorDotLightBalance ?? 1,
  );
  gl.uniform1f(
    uniformLocations.uPixelAspect,
    (Math.max(gl.drawingBufferWidth, 1) * Math.max(settings.targetHeight, 1)) /
      (Math.max(gl.drawingBufferHeight, 1) * Math.max(settings.targetWidth, 1)),
  );
  gl.uniform1f(uniformLocations.uPhosphorDotMode, settings.phosphorDotMode ? 1 : 0);
  gl.uniform1f(
    uniformLocations.uPhosphorDotInternalScale,
    settings.phosphorDotInternalScale ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotBrightCore,
    settings.phosphorDotBrightCore ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotCellFill,
    settings.phosphorDotCellFill ?? 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotFlatDisc,
    settings.phosphorDotFlatDisc ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotNeighborBlend,
    settings.phosphorDotNeighborBlend ? 1 : 0,
  );
  gl.uniform1f(uniformLocations.uCloseUpNoiseStrength, settings.closeUpNoiseStrength);
  gl.uniform3f(uniformLocations.uMonoTint, ...toShaderMonoTint(settings.monoTint));
  gl.uniform1f(uniformLocations.uNeonBoost, settings.neonBoost ?? 1);
  gl.uniform1f(uniformLocations.uNeonSaturation, settings.neonSaturation ?? 1);
  gl.uniform1f(uniformLocations.uNeonDetail, settings.neonDetail ?? 1);
}

async function loadLatestSettings(fallbackSettings) {
  if (!chrome?.storage?.local) {
    return fallbackSettings;
  }

  try {
    const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY);
    return normalizeSettings(stored?.[SETTINGS_STORAGE_KEY] ?? fallbackSettings);
  } catch {
    return fallbackSettings;
  }
}

function paletteModeToUniform(mode) {
  if (mode === "pc98") return 1;
  if (mode === "pc98_tile") return 2;
  if (mode === "pc98_512") return 3;
  if (mode === "pc98_512_sat") return 4;
  if (mode === "pc98_4096") return 5;
  if (mode === "color32") return 6;
  if (mode === "color64") return 7;
  if (mode === "mono") return 8;
  if (mode === "neon") return 9;
  return 0;
}

function setupRenderer(webgl) {
  const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, FILTER_FRAGMENT);
  const program = webgl.createProgram();

  if (!program) {
    throw new Error("Failed to create WebGL program.");
  }

  webgl.attachShader(program, vertexShader);
  webgl.attachShader(program, fragmentShader);
  webgl.linkProgram(program);

  if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
    throw new Error(webgl.getProgramInfoLog(program) || "Failed to link overlay shader.");
  }

  const vertices = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
  ]);

  const vertexBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

  const vao = webgl.createVertexArray();
  webgl.bindVertexArray(vao);
  const positionLocation = webgl.getAttribLocation(program, "aPosition");
  webgl.enableVertexAttribArray(positionLocation);
  webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

  const texture = webgl.createTexture();
  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

  webgl.useProgram(program);
  webgl.uniform1i(webgl.getUniformLocation(program, "uTexture"), 0);

  return {
    program,
    texture,
    uniformLocations: {
      uTargetSize: webgl.getUniformLocation(program, "uTargetSize"),
      uSampleTargetSize: webgl.getUniformLocation(program, "uSampleTargetSize"),
      uColorLevels: webgl.getUniformLocation(program, "uColorLevels"),
      uDitherStrength: webgl.getUniformLocation(program, "uDitherStrength"),
      uPaletteMode: webgl.getUniformLocation(program, "uPaletteMode"),
      uCurvature: webgl.getUniformLocation(program, "uCurvature"),
      uScanlineStrength: webgl.getUniformLocation(program, "uScanlineStrength"),
      uScanline2Strength: webgl.getUniformLocation(program, "uScanline2Strength"),
      uScanlineBrightnessFade: webgl.getUniformLocation(program, "uScanlineBrightnessFade"),
      uVignetteStrength: webgl.getUniformLocation(program, "uVignetteStrength"),
      uGlowStrength: webgl.getUniformLocation(program, "uGlowStrength"),
      uPhosphorStrength: webgl.getUniformLocation(program, "uPhosphorStrength"),
      uSpotMaskStrength: webgl.getUniformLocation(program, "uSpotMaskStrength"),
      uBulbRadius: webgl.getUniformLocation(program, "uBulbRadius"),
      uBlackFloor: webgl.getUniformLocation(program, "uBlackFloor"),
      uPhosphorDotLightBalance: webgl.getUniformLocation(program, "uPhosphorDotLightBalance"),
      uPixelAspect: webgl.getUniformLocation(program, "uPixelAspect"),
      uPhosphorDotMode: webgl.getUniformLocation(program, "uPhosphorDotMode"),
      uPhosphorDotInternalScale: webgl.getUniformLocation(program, "uPhosphorDotInternalScale"),
      uPhosphorDotBrightCore: webgl.getUniformLocation(program, "uPhosphorDotBrightCore"),
      uPhosphorDotCellFill: webgl.getUniformLocation(program, "uPhosphorDotCellFill"),
      uPhosphorDotFlatDisc: webgl.getUniformLocation(program, "uPhosphorDotFlatDisc"),
      uPhosphorDotNeighborBlend: webgl.getUniformLocation(program, "uPhosphorDotNeighborBlend"),
      uCloseUpNoiseStrength: webgl.getUniformLocation(program, "uCloseUpNoiseStrength"),
      uMonoTint: webgl.getUniformLocation(program, "uMonoTint"),
      uNeonBoost: webgl.getUniformLocation(program, "uNeonBoost"),
      uNeonSaturation: webgl.getUniformLocation(program, "uNeonSaturation"),
      uNeonDetail: webgl.getUniformLocation(program, "uNeonDetail"),
      uTime: webgl.getUniformLocation(program, "uTime"),
      uFlipH: webgl.getUniformLocation(program, "uFlipH"),
      uFlipV: webgl.getUniformLocation(program, "uFlipV"),
    },
  };
}

function compileShader(webgl, type, source) {
  const shader = webgl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader.");
  }

  webgl.shaderSource(shader, source);
  webgl.compileShader(shader);

  if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
    throw new Error(webgl.getShaderInfoLog(shader) || "Failed to compile shader.");
  }

  return shader;
}
