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

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
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
  const badge = document.createElement("button");
  const recordButton = document.createElement("button");
  badge.type = "button";
  badge.textContent = "Retro";
  badge.style.position = "fixed";
  badge.style.right = "16px";
  badge.style.top = "16px";
  badge.style.zIndex = "2147483647";
  badge.style.padding = "8px 12px";
  badge.style.border = "1px solid rgba(196, 230, 125, 0.35)";
  badge.style.borderRadius = "999px";
  badge.style.background = "rgba(9, 10, 8, 0.82)";
  badge.style.color = "#eff7ca";
  badge.style.font = '12px "IBM Plex Sans", "Segoe UI", sans-serif';
  badge.style.cursor = "pointer";
  badge.style.backdropFilter = "blur(8px)";
  badge.style.boxShadow = "0 0 18px rgba(110, 147, 58, 0.22)";

  recordButton.type = "button";
  recordButton.textContent = "Rec";
  recordButton.setAttribute("aria-label", "Start recording");
  recordButton.title = "Start recording";
  recordButton.style.position = "fixed";
  recordButton.style.right = "78px";
  recordButton.style.top = "16px";
  recordButton.style.zIndex = "2147483647";
  recordButton.style.padding = "8px 12px";
  recordButton.style.border = "1px solid rgba(248, 113, 113, 0.35)";
  recordButton.style.borderRadius = "999px";
  recordButton.style.background = "rgba(24, 9, 10, 0.82)";
  recordButton.style.color = "#ffe5e5";
  recordButton.style.font = '12px "IBM Plex Sans", "Segoe UI", sans-serif';
  recordButton.style.cursor = "pointer";
  recordButton.style.backdropFilter = "blur(8px)";
  recordButton.style.boxShadow = "0 0 18px rgba(248, 113, 113, 0.22)";

  const surfaces = [];
  let rafId = 0;
  let frameCount = 0;
  let isVisible = true;
  let detachStorageListener = null;
  let pointerClientX = null;
  let pointerClientY = null;
  let detachPointerTracking = null;
  let lastHoveredElement = null;
  const rejectedImages = new WeakSet();
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordingStream = null;
  let recordingAudioStream = null;

  badge.addEventListener("click", async () => {
    isVisible = !isVisible;

    if (isVisible) {
      currentSettings = await loadLatestSettings(currentSettings);
      applySettingsToSurfaces();
    }

    setSurfaceVisibility();
    badge.textContent = isVisible ? "Orig" : "Retro";
  });

  recordButton.addEventListener("click", () => {
    if (mediaRecorder?.state === "recording") {
      stopRecording({ save: true });
      return;
    }

    startRecording();
  });

  function start() {
    document.body.append(badge, recordButton);
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
    destroySurfaces();
    badge.remove();
    recordButton.remove();
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

    for (let index = 0; index < surfaces.length; index += 1) {
      const surface = surfaces[index];
      const target = targets[index] ?? null;
      renderSurface(surface, target, index);
      updateSurfaceSpotlight(surface);
    }

    rafId = requestAnimationFrame(draw);
  }

  function updateSurfaceSpotlight(surface) {
    if (
      typeof pointerClientX !== "number" ||
      typeof pointerClientY !== "number" ||
      !surface.targetElement ||
      surface.canvas.style.display === "none"
    ) {
      surface.canvas.style.maskImage = "";
      surface.canvas.style.webkitMaskImage = "";
      return;
    }

    if (!isPointInsideElement(surface.targetElement, pointerClientX, pointerClientY)) {
      surface.canvas.style.maskImage = "";
      surface.canvas.style.webkitMaskImage = "";
      return;
    }

    const rect = surface.targetElement.getBoundingClientRect();
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

  function collectPreferredTargets() {
    const currentHover = findPreferredHoverElement(pointerClientX, pointerClientY);
    if (currentHover && isDrawableElement(currentHover)) {
      lastHoveredElement = currentHover;
    }

    if (lastHoveredElement && (!isDrawableElement(lastHoveredElement) || !isInViewport(lastHoveredElement))) {
      lastHoveredElement = null;
    }

    const targets = [];
    appendUniqueDrawableTarget(targets, lastHoveredElement);

    for (const candidate of findAutoDrawableTargets()) {
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

  function setSurfaceVisibility() {
    for (const surface of surfaces) {
      if (isVisible) {
        surface.canvas.style.display = surface.targetElement ? "block" : "none";
      } else {
        surface.canvas.style.display = "none";
      }

      if (!isVisible) {
        surface.hideFailureOverlay();
      }
    }

    recordButton.style.display = isVisible ? "block" : "none";
  }

  function renderSurface(surface, targetElement, priorityIndex) {
    if (!targetElement || !isDrawableElement(targetElement)) {
      surface.updateTarget(null);
      surface.hide();
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      surface.updateTarget(null);
      surface.hide();
      return;
    }

    surface.updateTarget(targetElement);
    surface.syncRect(rect);

    if (!isVisible) {
      surface.hide();
      return;
    }

    if (targetElement instanceof HTMLImageElement && rejectedImages.has(targetElement)) {
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
      surface.gl.texImage2D(
        surface.gl.TEXTURE_2D,
        0,
        surface.gl.RGBA,
        surface.gl.RGBA,
        surface.gl.UNSIGNED_BYTE,
        targetElement,
      );
      surface.gl.drawArrays(surface.gl.TRIANGLES, 0, 6);
      surface.didTargetChange = false;
    } catch (error) {
      if (
        targetElement instanceof HTMLImageElement &&
        error instanceof DOMException &&
        error.name === "SecurityError"
      ) {
        rejectedImages.add(targetElement);
        surface.canvas.style.display = "none";
        surface.showFailureOverlay(rect);
        return;
      }

      console.warn("Failed to upload overlay source to WebGL texture.", error);
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
    recordButton.textContent = isRecording ? "Stop" : "Rec";
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
  const rect = element.getBoundingClientRect();
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
  if (candidate.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;
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
