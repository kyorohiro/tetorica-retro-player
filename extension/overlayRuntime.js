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
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = "2147483647";
  canvas.style.pointerEvents = "none";
  canvas.style.display = "block";
  canvas.style.transformOrigin = "top left";
  canvas.dataset.tetoricaOverlay = "true";

  const failureOverlay = document.createElement("div");
  failureOverlay.style.position = "fixed";
  failureOverlay.style.left = "0";
  failureOverlay.style.top = "0";
  failureOverlay.style.zIndex = "2147483647";
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
  let targetElement = null;
  let rafId = 0;
  let isVisible = true;
  let startedAt = performance.now();
  let lastRectKey = "";
  let detachStorageListener = null;
  let pointerClientX = null;
  let pointerClientY = null;
  let detachPointerTracking = null;
  let rejectedHoverImage = null;

  badge.addEventListener("click", async () => {
    isVisible = !isVisible;

    if (isVisible) {
      currentSettings = await loadLatestSettings(currentSettings);
      applySettings(gl, renderer.program, renderer.uniformLocations, currentSettings);
    }

    canvas.style.display = isVisible ? "block" : "none";
    hideFailureOverlay();
    badge.textContent = isVisible ? "Orig" : "Retro";
  });

  function start() {
    document.body.append(canvas, failureOverlay, badge);
    attachSettingsSync();
    attachPointerTracking();
    updateTargetElement(findPreferredElement());
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

    canvas.remove();
    failureOverlay.remove();
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
      applySettings(gl, renderer.program, renderer.uniformLocations, currentSettings);
    };

    chrome.storage.onChanged.addListener(handleStorageChanged);
    detachStorageListener = () => {
      chrome.storage.onChanged.removeListener(handleStorageChanged);
    };
  }

  function updateTargetElement(nextElement) {
    if (targetElement === nextElement) {
      return;
    }

    targetElement = nextElement;
    hideFailureOverlay();

    if (!targetElement) {
      return;
    }

    startedAt = performance.now();
  }

  function draw() {
    const hoveredImage = findHoveredImage(pointerClientX, pointerClientY);
    const isRejectedImageHovered =
      hoveredImage instanceof HTMLImageElement && hoveredImage === rejectedHoverImage;
    const nextElement = findPreferredElement(hoveredImage);
    updateTargetElement(nextElement);

    if (!targetElement || !isDrawableElement(targetElement)) {
      canvas.style.display = "none";
      hideFailureOverlay();
      rafId = requestAnimationFrame(draw);
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      canvas.style.display = "none";
      hideFailureOverlay();
      rafId = requestAnimationFrame(draw);
      return;
    }

    if (isRejectedImageHovered && hoveredImage) {
      canvas.style.display = "none";
      showFailureOverlay(hoveredImage.getBoundingClientRect());
      rafId = requestAnimationFrame(draw);
      return;
    }

    syncCanvasRect(rect);
    if (!renderVideoFrame()) {
      rafId = requestAnimationFrame(draw);
      return;
    }
    rafId = requestAnimationFrame(draw);
  }

  function attachPointerTracking() {
    const handlePointerMove = (event) => {
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      if (rejectedHoverImage && !isPointInsideElement(rejectedHoverImage, event.clientX, event.clientY)) {
        rejectedHoverImage = null;
      }
    };

    const clearPointerFocus = () => {
      pointerClientX = null;
      pointerClientY = null;
      rejectedHoverImage = null;
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

  function findPreferredElement(hoveredImage = findHoveredImage(pointerClientX, pointerClientY)) {
    if (hoveredImage && hoveredImage !== rejectedHoverImage) {
      return hoveredImage;
    }

    const hoveredVideo = findHoveredVideo(pointerClientX, pointerClientY);
    if (hoveredVideo) {
      return hoveredVideo;
    }

    return findPrimaryVideo();
  }

  function syncCanvasRect(rect) {
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

    if (rectKey === lastRectKey) {
      return;
    }

    lastRectKey = rectKey;
    canvas.style.left = `${rect.left}px`;
    canvas.style.top = `${rect.top}px`;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function renderVideoFrame() {
    canvas.style.display = isVisible ? "block" : "none";
    hideFailureOverlay();
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(renderer.program);
    gl.uniform1f(renderer.uniformLocations.uTime, (performance.now() - startedAt) / 1000);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, renderer.texture);
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, targetElement);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      return true;
    } catch (error) {
      if (targetElement instanceof HTMLImageElement && error instanceof DOMException && error.name === "SecurityError") {
        rejectedHoverImage = targetElement;
        showFailureOverlay(targetElement.getBoundingClientRect());
        return false;
      }

      console.warn("Failed to upload overlay source to WebGL texture.", error);
      return false;
    }
  }

  function showFailureOverlay(rect) {
    if (!isVisible) {
      failureOverlay.style.display = "none";
      return;
    }

    failureOverlay.style.display = "flex";
    failureOverlay.style.left = `${rect.left}px`;
    failureOverlay.style.top = `${rect.top}px`;
    failureOverlay.style.width = `${rect.width}px`;
    failureOverlay.style.height = `${rect.height}px`;
  }

  function hideFailureOverlay() {
    failureOverlay.style.display = "none";
  }

  applySettings(gl, renderer.program, renderer.uniformLocations, currentSettings);

  return {
    start,
    destroy,
  };
}

function findPrimaryVideo() {
  return [...document.querySelectorAll("video")]
    .filter(isUsableVideo)
    .sort((left, right) => {
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      return rightRect.width * rightRect.height - leftRect.width * leftRect.height;
    })[0] ?? null;
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
  gl.uniform1f(uniformLocations.uVignetteStrength, settings.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, settings.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, settings.phosphorStrength);
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
      uVignetteStrength: webgl.getUniformLocation(program, "uVignetteStrength"),
      uGlowStrength: webgl.getUniformLocation(program, "uGlowStrength"),
      uPhosphorStrength: webgl.getUniformLocation(program, "uPhosphorStrength"),
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
