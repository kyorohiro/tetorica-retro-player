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
    curvature: 0.0,
    scanlineStrength: 0.0,
    scanline2Strength: 0.0,
    vignetteStrength: 0.015,
    glowStrength: 0.0,
    phosphorStrength: 0.0,
    monoTint: [0.7, 0.9, 1.0],
  },
};

const vertexShaderSource = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
out vec2 vMaskCoord;

void main() {
  vUv = (aPosition + 1.0) * 0.5;
  vMaskCoord = vUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uVignetteStrength;
uniform float uGlowStrength;
uniform float uPhosphorStrength;
uniform vec3 uMonoTint;
uniform float uTime;

in vec2 vUv;
in vec2 vMaskCoord;
out vec4 outColor;

float bayer4x4(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = x + y * 4;

  float matrix[16];
  matrix[0] = 0.0 / 16.0;
  matrix[1] = 8.0 / 16.0;
  matrix[2] = 2.0 / 16.0;
  matrix[3] = 10.0 / 16.0;
  matrix[4] = 12.0 / 16.0;
  matrix[5] = 4.0 / 16.0;
  matrix[6] = 14.0 / 16.0;
  matrix[7] = 6.0 / 16.0;
  matrix[8] = 3.0 / 16.0;
  matrix[9] = 11.0 / 16.0;
  matrix[10] = 1.0 / 16.0;
  matrix[11] = 9.0 / 16.0;
  matrix[12] = 15.0 / 16.0;
  matrix[13] = 7.0 / 16.0;
  matrix[14] = 13.0 / 16.0;
  matrix[15] = 5.0 / 16.0;

  return matrix[index];
}

vec2 curveUv(vec2 uv, float strength) {
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

float edgeShadow(vec2 uv, float curvature) {
  vec2 centered = abs(uv - vec2(0.5)) * 2.0;
  float horizontal = pow(centered.x, 2.6);
  float vertical = pow(centered.y, 2.1);
  float edge = horizontal * 0.45 + vertical * 0.8 + horizontal * vertical * 0.35;
  return 1.0 - edge * (curvature * 0.45);
}

float horizontalUnevenness(vec2 uv, float time, float strength) {
  if (strength <= 0.0) {
    return 1.0;
  }

  float broad = sin(uv.y * 17.0 + time * 0.35) * 0.5 + 0.5;
  float fine = sin(uv.y * 61.0 + time * 0.12) * 0.5 + 0.5;
  return 1.0 - (broad * 0.03 + fine * 0.012) * strength;
}

vec3 monochromePalette(vec3 color, float levels, vec3 tint) {
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
  return mix(vec3(0.0), tint, stepped);
}

void main() {
  vec2 warpedMask = curveUv(vMaskCoord, uCurvature);
  vec2 delta = warpedMask - vMaskCoord;
  vec2 curvedUv = vUv + delta;

  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 cell = floor(curvedUv * uTargetSize);
  vec2 pixelatedUv = clamp((cell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
  vec2 sampledUv = vec2(pixelatedUv.x, 1.0 - pixelatedUv.y);
  vec2 texel = 1.0 / uTargetSize;

  vec4 color = texture(uTexture, sampledUv);
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color.rgb = clamp(color.rgb + dither, 0.0, 1.0);
  color.rgb = monochromePalette(color.rgb, uColorLevels, uMonoTint);

  vec3 glow = vec3(0.0);
  glow += monochromePalette(texture(uTexture, clamp(sampledUv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uMonoTint) * 0.34;
  glow += monochromePalette(texture(uTexture, clamp(sampledUv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uMonoTint) * 0.34;
  glow += monochromePalette(texture(uTexture, clamp(sampledUv + vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uMonoTint) * 0.18;
  glow += monochromePalette(texture(uTexture, clamp(sampledUv - vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uMonoTint) * 0.18;

  float brightness = max(max(color.r, color.g), color.b);
  float glowMask = smoothstep(0.45, 1.0, brightness);
  color.rgb += glow * glowMask * uGlowStrength;

  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * uScanlineStrength);

  float scanline2 = sin((vUv.y + uTime * 0.05) * 720.0) * uScanline2Strength;
  color.rgb += scanline2;

  float phosphor = sin(pixelatedUv.x * uTargetSize.x * 6.2831853) * 0.5 + 0.5;
  color.rgb *= 1.0 + ((phosphor - 0.5) * uPhosphorStrength);

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;
  color.rgb *= edgeShadow(warpedMask, uCurvature);
  color.rgb *= horizontalUnevenness(
    warpedMask,
    uTime,
    max(max(uScanlineStrength, uScanline2Strength), max(uGlowStrength, uPhosphorStrength))
  );

  outColor = vec4(clamp(color.rgb, 0.0, 1.0), 1.0);
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
  const fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, fragmentShaderSource);

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
