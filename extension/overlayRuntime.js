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

export async function toggleRetroOverlay(settingsInput) {
  const existing = globalThis[OVERLAY_KEY];
  if (existing) {
    existing.destroy();
    delete globalThis[OVERLAY_KEY];
    return { active: false };
  }

  const overlay = createOverlay(normalizeSettings(settingsInput ?? DEFAULT_SETTINGS));
  globalThis[OVERLAY_KEY] = overlay;
  overlay.start();
  return { active: true };
}

function createOverlay(settings) {
  let currentSettings = settings;
  const badge = document.createElement("button");
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

  const surfaces = [];
  let rafId = 0;
  let frameCount = 0;
  let isVisible = true;
  let detachStorageListener = null;
  let pointerClientX = null;
  let pointerClientY = null;
  let detachPointerTracking = null;
  let hoveredElement = null;
  let previousHoveredElement = null;
  const rejectedImages = new WeakSet();

  badge.addEventListener("click", async () => {
    isVisible = !isVisible;

    if (isVisible) {
      currentSettings = await loadLatestSettings(currentSettings);
      applySettingsToSurfaces();
    }

    setSurfaceVisibility();
    badge.textContent = isVisible ? "Orig" : "Retro";
  });

  function start() {
    document.body.append(badge);
    attachSettingsSync();
    attachPointerTracking();
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

    destroySurfaces();
    badge.remove();
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
    }

    rafId = requestAnimationFrame(draw);
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
    const nextHoveredElement = findPreferredHoverElement(pointerClientX, pointerClientY);
    updateHoverHistory(nextHoveredElement);

    if (hoveredElement && !isDrawableElement(hoveredElement)) {
      hoveredElement = null;
    }

    if (previousHoveredElement && !isDrawableElement(previousHoveredElement)) {
      previousHoveredElement = null;
    }

    const targets = [];
    appendUniqueDrawableTarget(targets, hoveredElement);
    appendUniqueDrawableTarget(targets, findPrimaryDrawableElement());
    appendUniqueDrawableTarget(targets, previousHoveredElement);

    for (const candidate of findAutoDrawableTargets()) {
      appendUniqueDrawableTarget(targets, candidate);
      if (targets.length >= currentSettings.overlayTargetCount) {
        break;
      }
    }

    return targets.slice(0, currentSettings.overlayTargetCount);
  }

  function updateHoverHistory(nextHoveredElement) {
    if (hoveredElement === nextHoveredElement) {
      return;
    }

    if (
      hoveredElement &&
      hoveredElement !== nextHoveredElement &&
      isDrawableElement(hoveredElement)
    ) {
      previousHoveredElement = hoveredElement;
    }

    hoveredElement = nextHoveredElement;
    if (previousHoveredElement === hoveredElement) {
      previousHoveredElement = null;
    }
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

function applySettings(gl, program, uniformLocations, settings) {
  gl.useProgram(program);
  gl.uniform2f(uniformLocations.uTargetSize, settings.targetWidth, settings.targetHeight);
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
  gl.uniform1f(
    uniformLocations.uPixelAspect,
    (Math.max(gl.drawingBufferWidth, 1) * Math.max(settings.targetHeight, 1)) /
      (Math.max(gl.drawingBufferHeight, 1) * Math.max(settings.targetWidth, 1)),
  );
  gl.uniform1f(uniformLocations.uCloseUpNoiseStrength, settings.closeUpNoiseStrength);
  gl.uniform3f(uniformLocations.uMonoTint, ...toShaderMonoTint(settings.monoTint));
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
      uPixelAspect: webgl.getUniformLocation(program, "uPixelAspect"),
      uCloseUpNoiseStrength: webgl.getUniformLocation(program, "uCloseUpNoiseStrength"),
      uMonoTint: webgl.getUniformLocation(program, "uMonoTint"),
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
