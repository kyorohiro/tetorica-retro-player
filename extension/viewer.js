import { FILTER_FRAGMENT } from "./shared/filterShader.js";
import {
  CUSTOM_PRESET_KEY,
  DEFAULT_SETTINGS,
  PRESETS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
  toShaderMonoTint,
} from "./shared/settings.js";
import { createTetoricaRetroAudioNode } from "./shared/TetoricaRetroAudioNode.js";

const statusText = document.getElementById("statusText");
const canvas = document.getElementById("glCanvas");
const video = document.getElementById("sourceVideo");
const fitButton = document.getElementById("fitButton");
const recordButton = document.getElementById("recordButton");

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

const PASSTHROUGH_FRAGMENT = `#version 300 es
precision mediump float;
in vec2 vTextureCoord;
uniform sampler2D uTexture;
out vec4 fragColor;
void main() { fragColor = texture(uTexture, vTextureCoord); }
`;

let gl = null;
let program = null;
let passthroughProgram = null;
let texture = null;
let animationFrameId = 0;
let mediaStream = null;
let audioContext = null;
let mediaSourceNode = null;
let audioEngine = null;
let uniformLocations = null;
let startedAt = performance.now();
let currentSettings = { ...DEFAULT_SETTINGS };
let currentSession = null;
let isFitModeEnabled = false;
let mediaRecorder = null;
let recordedChunks = [];
let isAlarmArmed = false;
let alarmOverlayEl = null;
let alarmClockIntervalId = null;

function logViewerAudioRecovery(label, payload = {}, level = "info") {
  const details = {
    audioContextState: audioContext?.state ?? null,
    currentTime: video?.currentTime ?? null,
    hasAudioEngine: Boolean(audioEngine),
    hasMediaSourceNode: Boolean(mediaSourceNode),
    hasMediaStream: Boolean(mediaStream),
    readyState: video?.readyState ?? null,
    visibilityState: document.visibilityState,
    ...payload,
  };
  const prefix = `[viewer audio recovery] ${label}`;
  if (level === "warn") {
    console.warn(prefix, details);
    return;
  }
  console.info(prefix, details);
}

function createAlarmOverlay(targetAt) {
  if (alarmOverlayEl) alarmOverlayEl.remove();

  const overlay = document.createElement("div");
  overlay.style.cssText = [
    "position:fixed;inset:0;background:rgba(0,0,5,0.90);",
    "display:flex;flex-direction:column;align-items:center;justify-content:center;",
    "z-index:9999;color:#e8eaf0;font-family:monospace,sans-serif;user-select:none;",
  ].join("");

  const clockEl = document.createElement("div");
  clockEl.id = "alarmViewerClock";
  clockEl.style.cssText = "font-size:clamp(3rem,18vw,8rem);font-weight:700;letter-spacing:0.06em;line-height:1;";

  const targetEl = document.createElement("div");
  targetEl.style.cssText = "margin-top:1.2rem;font-size:1rem;opacity:0.55;letter-spacing:0.04em;";
  const targetTime = new Date(targetAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  targetEl.textContent = `Alarm • ${targetTime}`;

  const offBtn = document.createElement("button");
  offBtn.textContent = "Alarm Off";
  offBtn.style.cssText = [
    "margin-top:2rem;padding:12px 32px;font-size:0.95rem;font-weight:700;",
    "border:2px solid rgba(232,234,240,0.6);border-radius:8px;",
    "background:transparent;color:#e8eaf0;cursor:pointer;",
    "font-family:monospace,sans-serif;letter-spacing:0.06em;",
  ].join("");
  offBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "CLEAR_ALARM" });
  });

  overlay.appendChild(clockEl);
  overlay.appendChild(targetEl);
  overlay.appendChild(offBtn);
  document.body.appendChild(overlay);
  alarmOverlayEl = overlay;

  function updateClock() {
    clockEl.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  updateClock();
  alarmClockIntervalId = setInterval(updateClock, 1000);
}

function removeAlarmOverlay() {
  if (alarmClockIntervalId) {
    clearInterval(alarmClockIntervalId);
    alarmClockIntervalId = null;
  }
  if (alarmOverlayEl) {
    alarmOverlayEl.remove();
    alarmOverlayEl = null;
  }
}

function armAlarm(targetAt) {
  isAlarmArmed = true;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
  if (mediaSourceNode) {
    try { mediaSourceNode.disconnect(); } catch {}
  }
  video.pause();
  createAlarmOverlay(targetAt);
}

function resumeViewerPlayback() {
  if (mediaSourceNode && audioEngine?.input) {
    try { mediaSourceNode.connect(audioEngine.input); } catch {}
  }
  if (mediaStream) {
    void video.play().catch(() => {});
    if (!animationFrameId) {
      drawFrame();
    }
  }
}

function triggerAlarm() {
  isAlarmArmed = false;
  removeAlarmOverlay();
  resumeViewerPlayback();
  setStatus("Alarm fired!");
  setTimeout(() => {
    if (!isAlarmArmed) {
      setStatus(currentSession ? `Rendering tab ${currentSession.sourceTabId}.` : "Ready.");
    }
  }, 3000);
}

function clearAlarm() {
  if (!isAlarmArmed) return;
  isAlarmArmed = false;
  removeAlarmOverlay();
  resumeViewerPlayback();
}

init().catch((error) => {
  console.error(error);
  setStatus(`Failed to initialize: ${error instanceof Error ? error.message : String(error)}`);
});

if (chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type === "CAPTURE_SESSION_UPDATED" && message.session?.streamId) {
      currentSession = message.session;
      void startCapture(message.session.streamId)
        .then(() => {
          applyCurrentSettings();
          setStatus(`Rendering tab ${message.session.sourceTabId}.`);
        })
        .catch((error) => {
          setStatus(error instanceof Error ? error.message : String(error));
        });
      return;
    }

    if (message?.type === "ARM_ALARM") {
      armAlarm(message.targetAt);
      return;
    }

    if (message?.type === "ALARM_TRIGGERED") {
      triggerAlarm();
      return;
    }

    if (message?.type === "CLEAR_ALARM") {
      clearAlarm();
      return;
    }
  });
}

async function init() {
  gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("WebGL2 is not available in this extension page.");
  }

  setupRenderer(gl);
  resizeCanvas();
  window.addEventListener("resize", handleWindowResize);
  fitButton?.addEventListener("click", toggleFitMode);
  recordButton?.addEventListener("click", handleRecordButtonClick);
  currentSettings = await loadSettings();
  applyCurrentSettings();
  if (chrome.storage?.onChanged) {
    chrome.storage.onChanged.addListener(handleStorageChanged);
  }

  const session = await getCaptureSession();
  currentSession = session;

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
  logCaptureAspect("startCapture");
  attachCaptureSizeListeners();
  resizeCanvas();
  await connectStreamAudio(mediaStream);
  startedAt = performance.now();
  drawFrame();
}

function stopCapture() {
  stopRecording({ save: true });
  detachCaptureSizeListeners();

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

function attachCaptureSizeListeners() {
  detachCaptureSizeListeners();
  video.addEventListener("resize", handleCaptureResize);
}

function detachCaptureSizeListeners() {
  video.removeEventListener("resize", handleCaptureResize);
}

function drawFrame() {
  const activeProgram = program ?? passthroughProgram;
  if (!gl || !activeProgram || !texture || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    animationFrameId = requestAnimationFrame(drawFrame);
    return;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.01, 0.02, 0.01, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(activeProgram);
  if (program && uniformLocations) {
    gl.uniform1f(uniformLocations.uTime, (performance.now() - startedAt) / 1000);
  }
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  animationFrameId = requestAnimationFrame(drawFrame);
}

function resizeCanvas() {
  updateCanvasAspectRatio();
  const width = Math.max(640, Math.floor(canvas.clientWidth * window.devicePixelRatio));
  const aspectRatio = getCaptureAspectRatio();
  const height = Math.max(1, Math.floor(width / aspectRatio));

  if (canvas.width === width && canvas.height === height) {
    return;
  }

  canvas.width = width;
  canvas.height = height;
}

function toggleFitMode() {
  isFitModeEnabled = !isFitModeEnabled;
  document.body.classList.toggle("fit-mode", isFitModeEnabled);
  if (fitButton) {
    fitButton.classList.toggle("is-fit-active", isFitModeEnabled);
    fitButton.setAttribute("aria-label", isFitModeEnabled ? "Exit fit mode" : "Fit to window");
    fitButton.setAttribute("title", isFitModeEnabled ? "Exit fit mode" : "Fit to window");
  }
  applyCanvasLayout();
}

function handleWindowResize() {
  applyCanvasLayout();
}

function handleCaptureResize() {
  logCaptureAspect("handleCaptureResize");
  applyCanvasLayout();
}

function applyCanvasLayout() {
  if (isFitModeEnabled) {
    fitCanvasToWindow();
    return;
  }

  resetCanvasInlineSize();
  resizeCanvas();
}

function fitCanvasToWindow() {
  const aspectRatio = getCaptureAspectRatio();
  const canvasFrame = canvas.parentElement;

  if (!canvasFrame) {
    resizeCanvas();
    return;
  }

  const availableWidth = Math.max(1, window.innerWidth);
  const availableHeight = Math.max(1, window.innerHeight);
  const widthScale = availableWidth / aspectRatio;

  const fittedWidth =
    widthScale <= availableHeight
      ? availableWidth
      : Math.max(1, availableHeight * aspectRatio);
  const fittedHeight =
    widthScale <= availableHeight
      ? Math.max(1, availableWidth / aspectRatio)
      : availableHeight;

  canvas.style.width = `${Math.floor(fittedWidth)}px`;
  canvas.style.height = `${Math.floor(fittedHeight)}px`;
  canvasFrame.style.width = canvas.style.width;
  canvasFrame.style.height = canvas.style.height;
  resizeCanvas();
}

function resetCanvasInlineSize() {
  const canvasFrame = canvas.parentElement;
  canvas.style.removeProperty("width");
  canvas.style.removeProperty("height");
  if (canvasFrame) {
    canvasFrame.style.removeProperty("width");
    canvasFrame.style.removeProperty("height");
  }
}

function handleRecordButtonClick() {
  if (mediaRecorder?.state === "recording") {
    stopRecording({ save: true });
    return;
  }

  startRecording();
}

function startRecording() {
  if (!mediaStream) {
    setStatus("Start a capture session before recording.");
    return;
  }

  const canvasStream = canvas.captureStream(30);
  const recordingStream = new MediaStream();

  canvasStream.getVideoTracks().forEach((track) => recordingStream.addTrack(track));
  mediaStream.getAudioTracks().forEach((track) => recordingStream.addTrack(track.clone()));

  const mimeType = getRecordingMimeType();

  try {
    mediaRecorder = mimeType
      ? new MediaRecorder(recordingStream, { mimeType })
      : new MediaRecorder(recordingStream);
  } catch (error) {
    setStatus(`Recording is not available: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  recordedChunks = [];
  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data?.size) {
      recordedChunks.push(event.data);
    }
  });
  mediaRecorder.addEventListener("stop", () => {
    const tracks = recordingStream.getTracks();
    tracks.forEach((track) => track.stop());
    saveRecording();
    mediaRecorder = null;
    updateRecordButton();
  }, { once: true });

  mediaRecorder.start();
  updateRecordButton();
  setStatus("Recording current tab...");
}

function stopRecording({ save }) {
  if (!mediaRecorder) {
    return;
  }

  if (!save) {
    recordedChunks = [];
  }

  if (mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    return;
  }

  mediaRecorder = null;
  updateRecordButton();
}

function saveRecording() {
  if (recordedChunks.length === 0) {
    setStatus("Recording stopped, but no video data was captured.");
    return;
  }

  const blob = new Blob(recordedChunks, {
    type: mediaRecorder?.mimeType || "video/webm",
  });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = `tetorica-retro-player-${timestamp}.webm`;
  downloadLink.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  recordedChunks = [];
  setStatus("Saved recording as .webm.");
}

function updateRecordButton() {
  if (!recordButton) {
    return;
  }

  const isRecording = mediaRecorder?.state === "recording";
  recordButton.classList.toggle("is-recording", isRecording);
  recordButton.setAttribute("aria-label", isRecording ? "Stop recording" : "Start recording");
  recordButton.setAttribute("title", isRecording ? "Stop recording" : "Start recording");
}

function getRecordingMimeType() {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
}

function getCaptureAspectRatio() {
  const crtAspect = typeof currentSettings?.crtAspect === "number"
    ? currentSettings.crtAspect
    : 1;
  const videoAspectRatio =
    video.videoWidth > 0 && video.videoHeight > 0
      ? video.videoWidth / video.videoHeight
      : null;
  let baseAspectRatio = null;

  if (isFitModeEnabled) {
    if (videoAspectRatio) {
      baseAspectRatio = videoAspectRatio;
    } else if (canvas.width > 0 && canvas.height > 0) {
      baseAspectRatio = canvas.width / canvas.height;
    }
  }

  if (!baseAspectRatio) {
    const sessionAspectRatio = getSessionAspectRatio();
    if (sessionAspectRatio && videoAspectRatio) {
      baseAspectRatio = Math.max(sessionAspectRatio, videoAspectRatio);
    } else if (sessionAspectRatio) {
      baseAspectRatio = sessionAspectRatio;
    } else if (videoAspectRatio) {
      baseAspectRatio = videoAspectRatio;
    } else if (canvas.width > 0 && canvas.height > 0) {
      baseAspectRatio = canvas.width / canvas.height;
    } else {
      baseAspectRatio = 16 / 9;
    }
  }

  return baseAspectRatio * crtAspect;
}

function getSessionAspectRatio() {
  if (!currentSession?.sourceViewportWidth || !currentSession?.sourceViewportHeight) {
    return null;
  }

  const viewportAspect =
    currentSession.sourceViewportWidth / currentSession.sourceViewportHeight;
  const widthAdjustedAspect = currentSession?.sourceOuterWidth
    ? currentSession.sourceOuterWidth / currentSession.sourceViewportHeight
    : null;

  return Math.max(viewportAspect, widthAdjustedAspect ?? 0);
}

function updateCanvasAspectRatio() {
  canvas.style.setProperty("--canvas-aspect-ratio", `${getCaptureAspectRatio()}`);
}

function logCaptureAspect(reason) {
  void reason;
}

function applyPreset(presetKey) {
  if (!gl || !uniformLocations) return;

  gl.useProgram(program);
  gl.uniform2f(uniformLocations.uTargetSize, currentSettings.targetWidth, currentSettings.targetHeight);
  const phosphorDotInternalScale = currentSettings.phosphorDotInternalScale ? 2 : 1;
  gl.uniform2f(
    uniformLocations.uSampleTargetSize,
    currentSettings.targetWidth * phosphorDotInternalScale,
    currentSettings.targetHeight * phosphorDotInternalScale,
  );
  gl.uniform1f(uniformLocations.uColorLevels, currentSettings.colorLevels);
  gl.uniform1f(uniformLocations.uDitherStrength, currentSettings.ditherStrength);
  gl.uniform1f(uniformLocations.uPaletteMode, paletteModeToUniform(currentSettings.paletteMode));
  gl.uniform1f(uniformLocations.uCurvature, currentSettings.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, currentSettings.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, currentSettings.scanline2Strength);
  gl.uniform1f(uniformLocations.uScanlineBrightnessFade, currentSettings.scanlineBrightnessFade);
  gl.uniform1f(uniformLocations.uVignetteStrength, currentSettings.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, currentSettings.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, currentSettings.phosphorStrength);
  gl.uniform1f(uniformLocations.uSpotMaskStrength, currentSettings.spotMaskStrength);
  gl.uniform1f(uniformLocations.uBulbRadius, currentSettings.bulbRadius ?? 0.22);
  gl.uniform1f(uniformLocations.uBlackFloor, currentSettings.blackFloor ?? 0.01);
  gl.uniform1f(uniformLocations.uLumaAmount, currentSettings.lumaAmount ?? 1);
  gl.uniform1f(uniformLocations.uLumaLow, currentSettings.lumaLow ?? 0);
  gl.uniform1f(uniformLocations.uLumaHigh, currentSettings.lumaHigh ?? 1);
  gl.uniform1f(uniformLocations.uLumaKnee, currentSettings.lumaKnee ?? 0.2);
  gl.uniform1f(uniformLocations.uSaturationAmount, currentSettings.saturationAmount ?? 1);
  gl.uniform1f(uniformLocations.uSaturationLow, currentSettings.saturationLow ?? 0);
  gl.uniform1f(uniformLocations.uSaturationHigh, currentSettings.saturationHigh ?? 1);
  gl.uniform1f(uniformLocations.uSaturationKnee, currentSettings.saturationKnee ?? 0.2);
  gl.uniform1f(
    uniformLocations.uPhosphorDotLightBalance,
    currentSettings.phosphorDotLightBalance ?? 1,
  );
  gl.uniform1f(
    uniformLocations.uPixelAspect,
    (Math.max(gl.drawingBufferWidth, 1) * Math.max(currentSettings.targetHeight, 1)) /
      (Math.max(gl.drawingBufferHeight, 1) * Math.max(currentSettings.targetWidth, 1)),
  );
  gl.uniform1f(uniformLocations.uPhosphorDotMode, currentSettings.phosphorDotMode ? 1 : 0);
  gl.uniform1f(
    uniformLocations.uPhosphorDotInternalScale,
    currentSettings.phosphorDotInternalScale ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotBrightCore,
    currentSettings.phosphorDotBrightCore ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotCellFill,
    currentSettings.phosphorDotCellFill ?? 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotFlatDisc,
    currentSettings.phosphorDotFlatDisc ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotNeighborBlend,
    currentSettings.phosphorDotNeighborBlend ? 1 : 0,
  );
  gl.uniform1f(uniformLocations.uCloseUpNoiseStrength, currentSettings.closeUpNoiseStrength);
  gl.uniform3f(uniformLocations.uMonoTint, ...toShaderMonoTint(currentSettings.monoTint));
  gl.uniform1f(uniformLocations.uNeonBoost, currentSettings.neonBoost ?? 1);
  gl.uniform1f(uniformLocations.uNeonSaturation, currentSettings.neonSaturation ?? 1);
  gl.uniform1f(uniformLocations.uNeonDetail, currentSettings.neonDetail ?? 1);
  gl.uniform1f(uniformLocations.uSmoothStrength, currentSettings.smoothStrength ?? 0);
  gl.uniform1f(uniformLocations.uToonSteps, currentSettings.toonSteps ?? 0);
  gl.uniform1f(uniformLocations.uEdgeBoost, currentSettings.edgeBoost ?? 0);
  gl.uniform1f(uniformLocations.uAnimeEdgeLow, currentSettings.animeEdgeLow ?? 0.08);
  gl.uniform1f(uniformLocations.uAnimeEdgeHigh, currentSettings.animeEdgeHigh ?? 0.55);
}

function updateAudioNodes() {
  if (audioEngine) {
    audioEngine.setParams({ volume: 1.0, isMuted: false, ...currentSettings }, true);
  }
}

async function createViewerAudioEngine(context) {
  audioEngine = createTetoricaRetroAudioNode(context, { instanceLabel: "viewer" });
  await audioEngine.ensureInitialized();
  await audioEngine.connect(context.destination);
  updateAudioNodes();
}

async function closeViewerAudioContext(context) {
  if (!context || context.state === "closed") {
    return;
  }

  try {
    await context.close();
  } catch (error) {
    logViewerAudioRecovery(
      "close-context-failed",
      { error: error instanceof Error ? error.message : String(error) },
      "warn",
    );
  }
}

async function rebuildViewerAudioGraph(reason) {
  logViewerAudioRecovery("rebuild:start", { reason });
  mediaSourceNode?.disconnect();
  mediaSourceNode = null;

  if (audioEngine) {
    await audioEngine.dispose();
    audioEngine = null;
  }

  const previousContext = audioContext;
  audioContext = null;
  await closeViewerAudioContext(previousContext);

  audioContext = new AudioContext();
  await createViewerAudioEngine(audioContext);

  if (mediaStream && !isAlarmArmed) {
    mediaSourceNode = audioContext.createMediaStreamSource(mediaStream);
    mediaSourceNode.connect(audioEngine.input);
  }

  updateAudioNodes();
  logViewerAudioRecovery("rebuild:done", { reason });
  return audioContext;
}

async function ensureAudioContext(reason = "ensure") {
  if (audioContext?.state === "closed") {
    audioContext = null;
    mediaSourceNode = null;
    audioEngine = null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
    await createViewerAudioEngine(audioContext);
    logViewerAudioRecovery("ensure:created", { reason });
  }

  if (audioContext.state === "suspended") {
    try {
      await audioContext.resume();
    } catch (error) {
      logViewerAudioRecovery(
        "ensure:resume-failed",
        { error: error instanceof Error ? error.message : String(error), reason },
        "warn",
      );
    }
  }

  if (audioContext.state === "closed") {
    logViewerAudioRecovery("ensure:rebuild-needed", {
      audioContextState: audioContext.state,
      reason,
    });
    return rebuildViewerAudioGraph(reason);
  }

  // "suspended" はユーザーアクション待ちで復帰可能。closed の時だけ rebuild する。
  logViewerAudioRecovery("ensure:healthy", { reason });
  return audioContext;
}

async function connectStreamAudio(stream) {
  const audioTracks = stream.getAudioTracks();
  if (audioTracks.length === 0) return;

  const context = await ensureAudioContext("connect-stream");
  if (!context || !audioEngine?.input) return;

  if (mediaSourceNode) {
    mediaSourceNode.disconnect();
    mediaSourceNode = null;
  }

  mediaSourceNode = context.createMediaStreamSource(stream);
  mediaSourceNode.connect(audioEngine.input);
  updateAudioNodes();
}

async function recoverViewerAudioOutput(reason) {
  if (!mediaStream || isAlarmArmed) {
    return null;
  }

  const context = await ensureAudioContext(reason);
  if (!context || !audioEngine?.input) {
    return null;
  }

  try {
    if (mediaSourceNode) {
      mediaSourceNode.disconnect();
    } else {
      mediaSourceNode = context.createMediaStreamSource(mediaStream);
    }

    mediaSourceNode.connect(audioEngine.input);
    updateAudioNodes();
    logViewerAudioRecovery("recover:reconnected", { reason });
    return context;
  } catch (error) {
    logViewerAudioRecovery(
      "recover:rebuild-needed",
      { error: error instanceof Error ? error.message : String(error), reason },
      "warn",
    );
    return rebuildViewerAudioGraph(`${reason}:rebuild`);
  }
}

async function disposeAudioEngine() {
  mediaSourceNode?.disconnect();
  mediaSourceNode = null;

  if (audioEngine) {
    await audioEngine.dispose();
    audioEngine = null;
  }

  const context = audioContext;
  audioContext = null;
  await closeViewerAudioContext(context);
}

function setupRenderer(webgl) {
  // --- Passthrough program (tiny; compiles instantly, safe to link-check now) ---
  // Used while the full filter shader compiles in the background so the canvas
  // shows raw video immediately instead of staying black.
  const passVert = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const passFrag = compileShader(webgl, webgl.FRAGMENT_SHADER, PASSTHROUGH_FRAGMENT);
  const passthru = webgl.createProgram();
  if (passthru) {
    webgl.attachShader(passthru, passVert);
    webgl.attachShader(passthru, passFrag);
    webgl.linkProgram(passthru);
    if (webgl.getProgramParameter(passthru, webgl.LINK_STATUS)) {
      passthroughProgram = passthru;
      webgl.useProgram(passthru);
      webgl.uniform1i(webgl.getUniformLocation(passthru, "uTexture"), 0);
    }
  }

  // --- Full filter program (async; D3D cache can block if checked immediately) ---
  const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(webgl, webgl.FRAGMENT_SHADER, FILTER_FRAGMENT);

  const prog = webgl.createProgram();
  if (!prog) {
    throw new Error("Failed to create WebGL program.");
  }

  webgl.attachShader(prog, vertexShader);
  webgl.attachShader(prog, fragmentShader);
  webgl.linkProgram(prog);

  // CRITICAL: Do NOT call getProgramParameter here. On Windows/ANGLE, Chrome's
  // D3D GPU shader cache causes any readback during cache loading to freeze the
  // main thread. program and uniformLocations are set asynchronously below.
  // drawFrame() uses passthroughProgram until program is ready.

  const vertices = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]);

  const vertexBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

  const vao = webgl.createVertexArray();
  webgl.bindVertexArray(vao);
  // aPosition is the only attribute so it is always assigned location 0.
  webgl.enableVertexAttribArray(0);
  webgl.vertexAttribPointer(0, 2, webgl.FLOAT, false, 0, 0);

  texture = webgl.createTexture();
  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  // DOM media uploads use a different vertical origin than the Pixi pipeline expects.
  webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

  // useProgram, getUniformLocation, and uniformLocations assignment are deferred
  // to finalizeFilterProgram() to avoid the Windows D3D cache freeze.
  finalizeFilterProgram(webgl, prog);
}

async function finalizeFilterProgram(webgl, prog) {
  // On Windows/Chrome ANGLE, calling getProgramParameter immediately after
  // linkProgram blocks the JS main thread while the GPU process loads
  // pre-compiled DXBC bytecode from the D3D shader cache (~3 s on first load).
  // Wait 3 s via setTimeout (not RAF) so the GPU process finishes loading
  // before we issue the read-back. COMPLETION_STATUS_KHR is intentionally NOT
  // used here: on some Windows/ANGLE configurations it never returns true for
  // large shaders, causing the filter to never be applied.
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!webgl.getProgramParameter(prog, webgl.LINK_STATUS)) {
    const message = webgl.getProgramInfoLog(prog) || "Unknown program link error.";
    console.error("[viewer] Filter shader link failed:", message);
    return;
  }

  webgl.useProgram(prog);
  webgl.uniform1i(webgl.getUniformLocation(prog, "uTexture"), 0);

  uniformLocations = {
    uTargetSize: webgl.getUniformLocation(prog, "uTargetSize"),
    uSampleTargetSize: webgl.getUniformLocation(prog, "uSampleTargetSize"),
    uColorLevels: webgl.getUniformLocation(prog, "uColorLevels"),
    uDitherStrength: webgl.getUniformLocation(prog, "uDitherStrength"),
    uPaletteMode: webgl.getUniformLocation(prog, "uPaletteMode"),
    uCurvature: webgl.getUniformLocation(prog, "uCurvature"),
    uScanlineStrength: webgl.getUniformLocation(prog, "uScanlineStrength"),
    uScanline2Strength: webgl.getUniformLocation(prog, "uScanline2Strength"),
    uScanlineBrightnessFade: webgl.getUniformLocation(prog, "uScanlineBrightnessFade"),
    uVignetteStrength: webgl.getUniformLocation(prog, "uVignetteStrength"),
    uGlowStrength: webgl.getUniformLocation(prog, "uGlowStrength"),
    uPhosphorStrength: webgl.getUniformLocation(prog, "uPhosphorStrength"),
    uSpotMaskStrength: webgl.getUniformLocation(prog, "uSpotMaskStrength"),
    uBulbRadius: webgl.getUniformLocation(prog, "uBulbRadius"),
    uBlackFloor: webgl.getUniformLocation(prog, "uBlackFloor"),
    uLumaAmount: webgl.getUniformLocation(prog, "uLumaAmount"),
    uLumaLow: webgl.getUniformLocation(prog, "uLumaLow"),
    uLumaHigh: webgl.getUniformLocation(prog, "uLumaHigh"),
    uLumaKnee: webgl.getUniformLocation(prog, "uLumaKnee"),
    uSaturationAmount: webgl.getUniformLocation(prog, "uSaturationAmount"),
    uSaturationLow: webgl.getUniformLocation(prog, "uSaturationLow"),
    uSaturationHigh: webgl.getUniformLocation(prog, "uSaturationHigh"),
    uSaturationKnee: webgl.getUniformLocation(prog, "uSaturationKnee"),
    uPhosphorDotLightBalance: webgl.getUniformLocation(prog, "uPhosphorDotLightBalance"),
    uPixelAspect: webgl.getUniformLocation(prog, "uPixelAspect"),
    uPhosphorDotMode: webgl.getUniformLocation(prog, "uPhosphorDotMode"),
    uPhosphorDotInternalScale: webgl.getUniformLocation(prog, "uPhosphorDotInternalScale"),
    uPhosphorDotBrightCore: webgl.getUniformLocation(prog, "uPhosphorDotBrightCore"),
    uPhosphorDotCellFill: webgl.getUniformLocation(prog, "uPhosphorDotCellFill"),
    uPhosphorDotFlatDisc: webgl.getUniformLocation(prog, "uPhosphorDotFlatDisc"),
    uPhosphorDotNeighborBlend: webgl.getUniformLocation(prog, "uPhosphorDotNeighborBlend"),
    uCloseUpNoiseStrength: webgl.getUniformLocation(prog, "uCloseUpNoiseStrength"),
    uMonoTint: webgl.getUniformLocation(prog, "uMonoTint"),
    uNeonBoost: webgl.getUniformLocation(prog, "uNeonBoost"),
    uNeonSaturation: webgl.getUniformLocation(prog, "uNeonSaturation"),
    uNeonDetail: webgl.getUniformLocation(prog, "uNeonDetail"),
    uSmoothStrength: webgl.getUniformLocation(prog, "uSmoothStrength"),
    uToonSteps: webgl.getUniformLocation(prog, "uToonSteps"),
    uEdgeBoost: webgl.getUniformLocation(prog, "uEdgeBoost"),
    uAnimeEdgeLow: webgl.getUniformLocation(prog, "uAnimeEdgeLow"),
    uAnimeEdgeHigh: webgl.getUniformLocation(prog, "uAnimeEdgeHigh"),
    uTime: webgl.getUniformLocation(prog, "uTime"),
  };

  program = prog;
  applyCurrentSettings();
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
  if (mode === "pc98_tile") return 2;
  if (mode === "pc98_512") return 3;
  if (mode === "pc98_512_sat") return 4;
  if (mode === "pc98_4096") return 5;
  if (mode === "color32") return 6;
  if (mode === "color64") return 7;
  if (mode === "mono") return 8;
  if (mode === "neon") return 9;
  if (mode === "anime") return 10;
  return 0;
}
