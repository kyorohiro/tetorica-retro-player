import { FILTER_FRAGMENT } from "./shared/filterShader.js";

const statusText = document.getElementById("statusText");
const refreshButton = document.getElementById("refreshButton");
const presetSelect = document.getElementById("presetSelect");
const canvas = document.getElementById("glCanvas");
const video = document.getElementById("sourceVideo");

const PRESETS = {
  greenTerminal: {
    label: "Green Terminal",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.14,
    paletteMode: 6,
    curvature: 0.07,
    scanlineStrength: 0.16,
    scanline2Strength: 0.0,
    vignetteStrength: 0.1,
    glowStrength: 0.09,
    phosphorStrength: 0.06,
    monoTint: [0.72, 1.0, 0.58],
  },
  amberCrt: {
    label: "Amber CRT",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.16,
    paletteMode: 6,
    curvature: 0.08,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.11,
    glowStrength: 0.1,
    phosphorStrength: 0.05,
    monoTint: [1.0, 0.82, 0.45],
  },
  monochrome: {
    label: "Mono",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 16,
    ditherStrength: 0.18,
    paletteMode: 6,
    curvature: 0.05,
    scanlineStrength: 0.1,
    scanline2Strength: 0.0,
    vignetteStrength: 0.08,
    glowStrength: 0.07,
    phosphorStrength: 0.02,
    monoTint: [1.0, 1.0, 1.0],
  },
  lcdIce: {
    label: "LCD Ice",
    targetWidth: 480,
    targetHeight: 300,
    colorLevels: 16,
    ditherStrength: 0.06,
    paletteMode: 6,
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.015,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    monoTint: [0.7, 0.9, 1.0],
  },
  pc98_512: {
    label: "PC-98 512-color",
    targetWidth: 640,
    targetHeight: 400,
    colorLevels: 8,
    ditherStrength: 0.12,
    paletteMode: 2,
    curvature: 0.03,
    scanlineStrength: 0.0,
    scanline2Strength: 0.02,
    vignetteStrength: 0.05,
    glowStrength: 0.06,
    phosphorStrength: 0.03,
    monoTint: [1.0, 1.0, 1.0],
  },
};

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

let gl = null;
let program = null;
let texture = null;
let animationFrameId = 0;
let mediaStream = null;
let audioContext = null;
let audioSourceNode = null;
let uniformLocations = null;
let startedAt = performance.now();

init().catch((error) => {
  console.error(error);
  setStatus(`Failed to initialize: ${error instanceof Error ? error.message : String(error)}`);
});

refreshButton.addEventListener("click", () => {
  setStatus("Click the extension button again on the tab you want to capture.");
});

presetSelect.addEventListener("change", () => {
  applyPreset(presetSelect.value);
});

async function init() {
  gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("WebGL2 is not available in this extension page.");
  }

  setupRenderer(gl);
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  applyPreset(presetSelect.value);

  const session = await getCaptureSession();

  if (!session?.streamId) {
    setStatus("No active capture session. Open a tab and click the extension button.");
    return;
  }

  await startCapture(session.streamId);
  setStatus(`Rendering tab ${session.sourceTabId} with ${PRESETS[presetSelect.value].label}.`);
}

async function getCaptureSession() {
  const response = await chrome.runtime.sendMessage({ type: "GET_CAPTURE_SESSION" });
  return response?.session ?? null;
}

async function startCapture(streamId) {
  stopCapture();

  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId,
      },
    },
    video: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId,
      },
    },
  });

  video.srcObject = mediaStream;
  await video.play();
  replayAudio(mediaStream);
  startedAt = performance.now();
  drawFrame();
}

function replayAudio(stream) {
  const audioTracks = stream.getAudioTracks();
  if (audioTracks.length === 0) return;

  audioContext?.close().catch(() => {});
  audioContext = new AudioContext();
  audioSourceNode = audioContext.createMediaStreamSource(stream);
  audioSourceNode.connect(audioContext.destination);
}

function stopCapture() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }

  if (audioSourceNode) {
    audioSourceNode.disconnect();
    audioSourceNode = null;
  }

  if (audioContext) {
    audioContext.close().catch(() => {});
    audioContext = null;
  }

  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }

  video.srcObject = null;
}

function drawFrame() {
  if (!gl || !program || !texture || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    animationFrameId = requestAnimationFrame(drawFrame);
    return;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.01, 0.02, 0.01, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
  gl.uniform1f(uniformLocations.uTime, (performance.now() - startedAt) / 1000);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  animationFrameId = requestAnimationFrame(drawFrame);
}

function resizeCanvas() {
  const width = Math.max(640, Math.floor(canvas.clientWidth * window.devicePixelRatio));
  const height = Math.max(360, Math.floor((width * 9) / 16));

  if (canvas.width === width && canvas.height === height) {
    return;
  }

  canvas.width = width;
  canvas.height = height;
}

function applyPreset(presetKey) {
  if (!gl || !uniformLocations) return;

  const preset = PRESETS[presetKey] ?? PRESETS.greenTerminal;
  gl.useProgram(program);
  gl.uniform2f(uniformLocations.uTargetSize, preset.targetWidth, preset.targetHeight);
  gl.uniform1f(uniformLocations.uColorLevels, preset.colorLevels);
  gl.uniform1f(uniformLocations.uDitherStrength, preset.ditherStrength);
  gl.uniform1f(uniformLocations.uPaletteMode, preset.paletteMode);
  gl.uniform1f(uniformLocations.uCurvature, preset.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, preset.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, preset.scanline2Strength);
  gl.uniform1f(uniformLocations.uVignetteStrength, preset.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, preset.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, preset.phosphorStrength);
  gl.uniform3f(uniformLocations.uMonoTint, ...preset.monoTint);
  setStatus(`Preset switched to ${preset.label}.`);
}

function setupRenderer(webgl) {
  const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, FILTER_FRAGMENT);

  program = webgl.createProgram();
  if (!program) {
    throw new Error("Failed to create WebGL program.");
  }

  webgl.attachShader(program, vertexShader);
  webgl.attachShader(program, fragmentShader);
  webgl.linkProgram(program);

  if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
    const message = webgl.getProgramInfoLog(program) || "Unknown program link error.";
    throw new Error(message);
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

  texture = webgl.createTexture();
  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  // DOM media uploads use a different vertical origin than the Pixi pipeline expects.
  webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

  webgl.useProgram(program);
  webgl.uniform1i(webgl.getUniformLocation(program, "uTexture"), 0);

  uniformLocations = {
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
    const message = webgl.getShaderInfoLog(shader) || "Unknown shader compile error.";
    throw new Error(message);
  }

  return shader;
}

function setStatus(message) {
  statusText.textContent = message;
}
