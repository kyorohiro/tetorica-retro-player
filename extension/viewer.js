import { FILTER_FRAGMENT } from "./shared/filterShader.js";
import {
  CUSTOM_PRESET_KEY,
  DEFAULT_SETTINGS,
  PRESETS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
  toShaderMonoTint,
} from "./shared/settings.js";

const statusText = document.getElementById("statusText");
const canvas = document.getElementById("glCanvas");
const video = document.getElementById("sourceVideo");

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
let mediaSourceNode = null;
let masterGainNode = null;
let lofiLowpassNode = null;
let lofiHighshelfNode = null;
let lofiDriveNode = null;
let noiseSourceNode = null;
let noiseFilterNode = null;
let noisePannerNode = null;
let noiseGainNode = null;
let noiseLfoNode = null;
let noiseLfoGainNode = null;
let uniformLocations = null;
let startedAt = performance.now();
let currentSettings = { ...DEFAULT_SETTINGS };

init().catch((error) => {
  console.error(error);
  setStatus(`Failed to initialize: ${error instanceof Error ? error.message : String(error)}`);
});

if (chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type !== "CAPTURE_SESSION_UPDATED" || !message.session?.streamId) {
      return;
    }

    void startCapture(message.session.streamId)
      .then(() => {
        applyCurrentSettings();
        setStatus(`Rendering tab ${message.session.sourceTabId}.`);
      })
      .catch((error) => {
        setStatus(error instanceof Error ? error.message : String(error));
      });
  });
}

async function init() {
  gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("WebGL2 is not available in this extension page.");
  }

  setupRenderer(gl);
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  currentSettings = await loadSettings();
  applyCurrentSettings();
  if (chrome.storage?.onChanged) {
    chrome.storage.onChanged.addListener(handleStorageChanged);
  }

  const session = await getCaptureSession();

  if (!session?.streamId) {
    setStatus("No active capture session. Open a tab and click the extension button.");
    return;
  }

  await startCapture(session.streamId);
  applyCurrentSettings();
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
  await connectStreamAudio(mediaStream);
  startedAt = performance.now();
  drawFrame();
}

function stopCapture() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }

  void disposeAudioEngine();

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

  gl.useProgram(program);
  gl.uniform2f(uniformLocations.uTargetSize, currentSettings.targetWidth, currentSettings.targetHeight);
  gl.uniform1f(uniformLocations.uColorLevels, currentSettings.colorLevels);
  gl.uniform1f(uniformLocations.uDitherStrength, currentSettings.ditherStrength);
  gl.uniform1f(uniformLocations.uPaletteMode, paletteModeToUniform(currentSettings.paletteMode));
  gl.uniform1f(uniformLocations.uCurvature, currentSettings.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, currentSettings.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, currentSettings.scanline2Strength);
  gl.uniform1f(uniformLocations.uVignetteStrength, currentSettings.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, currentSettings.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, currentSettings.phosphorStrength);
  gl.uniform3f(uniformLocations.uMonoTint, ...toShaderMonoTint(currentSettings.monoTint));
}

function createDriveCurve(amount) {
  const samples = 256;
  const curve = new Float32Array(samples);
  const drive = 1 + amount * 5;

  for (let index = 0; index < samples; index += 1) {
    const x = (index * 2) / (samples - 1) - 1;
    curve[index] = Math.tanh(x * drive);
  }

  return curve;
}

function updateAudioNodes() {
  if (lofiLowpassNode && lofiHighshelfNode && lofiDriveNode) {
    const amount = currentSettings.isAudioFxEnabled ? currentSettings.lofiAmount : 0;
    lofiLowpassNode.frequency.value = 16000 - amount * 14200;
    lofiLowpassNode.Q.value = 0.3 + amount * 1.8;
    lofiHighshelfNode.gain.value = -amount * 18;
    lofiDriveNode.curve = createDriveCurve(amount * 0.6);
  }

  if (noiseGainNode) {
    noiseGainNode.gain.value = currentSettings.isNoiseEnabled ? currentSettings.noiseLevel : 0;
  }
}

async function ensureAudioContext() {
  if (audioContext?.state === "closed") {
    audioContext = null;
    mediaSourceNode = null;
    masterGainNode = null;
    lofiLowpassNode = null;
    lofiHighshelfNode = null;
    lofiDriveNode = null;
    noiseSourceNode = null;
    noiseFilterNode = null;
    noisePannerNode = null;
    noiseGainNode = null;
    noiseLfoNode = null;
    noiseLfoGainNode = null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
    masterGainNode = audioContext.createGain();
    lofiLowpassNode = audioContext.createBiquadFilter();
    lofiHighshelfNode = audioContext.createBiquadFilter();
    lofiDriveNode = audioContext.createWaveShaper();

    lofiLowpassNode.type = "lowpass";
    lofiHighshelfNode.type = "highshelf";
    lofiHighshelfNode.frequency.value = 2800;
    lofiDriveNode.oversample = "4x";

    lofiLowpassNode.connect(lofiHighshelfNode);
    lofiHighshelfNode.connect(lofiDriveNode);
    lofiDriveNode.connect(masterGainNode);
    masterGainNode.connect(audioContext.destination);

    noiseSourceNode = audioContext.createBufferSource();
    const noiseBuffer = audioContext.createBuffer(
      2,
      audioContext.sampleRate * 2,
      audioContext.sampleRate,
    );
    for (let channel = 0; channel < noiseBuffer.numberOfChannels; channel += 1) {
      const channelData = noiseBuffer.getChannelData(channel);
      for (let index = 0; index < channelData.length; index += 1) {
        channelData[index] = Math.random() * 2 - 1;
      }
    }
    noiseSourceNode.buffer = noiseBuffer;
    noiseSourceNode.loop = true;

    noiseFilterNode = audioContext.createBiquadFilter();
    noiseFilterNode.type = "bandpass";
    noiseFilterNode.frequency.value = 4200;
    noiseFilterNode.Q.value = 0.8;

    noisePannerNode = audioContext.createStereoPanner();
    noiseGainNode = audioContext.createGain();
    noiseLfoNode = audioContext.createOscillator();
    noiseLfoGainNode = audioContext.createGain();

    noiseLfoNode.type = "sine";
    noiseLfoNode.frequency.value = 0.065;
    noiseLfoGainNode.gain.value = 0.45;

    noiseSourceNode.connect(noiseFilterNode);
    noiseFilterNode.connect(noisePannerNode);
    noisePannerNode.connect(noiseGainNode);
    noiseGainNode.connect(masterGainNode);
    noiseLfoNode.connect(noiseLfoGainNode);
    noiseLfoGainNode.connect(noisePannerNode.pan);
    noiseSourceNode.start();
    noiseLfoNode.start();

    updateAudioNodes();
  }

  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch {
      // Resume can still be blocked until the next user gesture.
    }
  }

  return audioContext;
}

async function connectStreamAudio(stream) {
  const audioTracks = stream.getAudioTracks();
  if (audioTracks.length === 0) return;

  const context = await ensureAudioContext();
  if (!context || !lofiLowpassNode) return;

  if (mediaSourceNode) {
    mediaSourceNode.disconnect();
    mediaSourceNode = null;
  }

  mediaSourceNode = context.createMediaStreamSource(stream);
  mediaSourceNode.connect(lofiLowpassNode);
  updateAudioNodes();
}

async function disposeAudioEngine() {
  mediaSourceNode?.disconnect();
  mediaSourceNode = null;

  try {
    noiseSourceNode?.stop();
  } catch {
    // ignore repeated stop
  }

  try {
    noiseLfoNode?.stop();
  } catch {
    // ignore repeated stop
  }

  const context = audioContext;
  audioContext = null;
  masterGainNode = null;
  lofiLowpassNode = null;
  lofiHighshelfNode = null;
  lofiDriveNode = null;
  noiseSourceNode = null;
  noiseFilterNode = null;
  noisePannerNode = null;
  noiseGainNode = null;
  noiseLfoNode = null;
  noiseLfoGainNode = null;

  if (!context || context.state === "closed") {
    return;
  }

  try {
    await context.close();
  } catch {
    // ignore double-close races
  }
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

async function loadSettings() {
  const response = await chrome.runtime.sendMessage({ type: "GET_SETTINGS" });
  if (!response?.ok) {
    return { ...DEFAULT_SETTINGS };
  }

  return normalizeSettings(response.settings);
}

function handleStorageChanged(changes, areaName) {
  if (areaName !== "local" || !changes[SETTINGS_STORAGE_KEY]) {
    return;
  }

  currentSettings = normalizeSettings(changes[SETTINGS_STORAGE_KEY].newValue);
  applyCurrentSettings();
}

function applyCurrentSettings() {
  applyPreset(currentSettings.presetKey);
  updateAudioNodes();
  if (currentSettings.presetKey === CUSTOM_PRESET_KEY) {
    setStatus("Rendering with custom settings.");
    return;
  }

  setStatus(`Rendering with ${PRESETS[currentSettings.presetKey].label}.`);
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
