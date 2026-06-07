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
  let video = null;
  let rafId = 0;
  let isVisible = true;
  let startedAt = performance.now();
  let lastRectKey = "";
  let cleanupVideo = null;

  badge.addEventListener("click", async () => {
    isVisible = !isVisible;

    if (isVisible) {
      currentSettings = await loadLatestSettings(currentSettings);
      applySettings(gl, renderer.program, renderer.uniformLocations, currentSettings);
    }

    canvas.style.display = isVisible ? "block" : "none";
    if (video) {
      setVideoVisibility(video, isVisible);
    }
    badge.textContent = isVisible ? "Orig" : "Retro";
  });

  function start() {
    document.body.append(canvas, badge);
    updateVideoTarget(findPrimaryVideo());
    draw();
  }

  function destroy() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    if (cleanupVideo) {
      cleanupVideo();
      cleanupVideo = null;
    }

    canvas.remove();
    badge.remove();
  }

  function updateVideoTarget(nextVideo) {
    if (video === nextVideo) {
      return;
    }

    if (cleanupVideo) {
      cleanupVideo();
      cleanupVideo = null;
    }

    video = nextVideo;

    if (!video) {
      return;
    }

    cleanupVideo = rememberAndHideVideo(video);
    startedAt = performance.now();
  }

  function draw() {
    const nextVideo = findPrimaryVideo();
    if (nextVideo) {
      updateVideoTarget(nextVideo);
    }

    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      rafId = requestAnimationFrame(draw);
      return;
    }

    const rect = video.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      rafId = requestAnimationFrame(draw);
      return;
    }

    syncCanvasRect(rect);
    renderVideoFrame();
    rafId = requestAnimationFrame(draw);
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
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(renderer.program);
    gl.uniform1f(renderer.uniformLocations.uTime, (performance.now() - startedAt) / 1000);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, renderer.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  applySettings(gl, renderer.program, renderer.uniformLocations, currentSettings);

  return {
    start,
    destroy,
  };
}

function findPrimaryVideo() {
  return [...document.querySelectorAll("video")]
    .filter((candidate) => {
      if (!(candidate instanceof HTMLVideoElement)) return false;
      if (candidate.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;
      const rect = candidate.getBoundingClientRect();
      return rect.width > 32 && rect.height > 32;
    })
    .sort((left, right) => {
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      return rightRect.width * rightRect.height - leftRect.width * leftRect.height;
    })[0] ?? null;
}

function rememberAndHideVideo(video) {
  const previousOpacity = video.style.opacity;
  setVideoVisibility(video, true);
  return () => {
    video.style.opacity = previousOpacity;
  };
}

function setVideoVisibility(video, hidden) {
  video.style.opacity = hidden ? "0" : "1";
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
  if (mode === "pc98_512") return 2;
  if (mode === "pc98_4096") return 3;
  if (mode === "color32") return 4;
  if (mode === "color64") return 5;
  if (mode === "mono") return 6;
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
