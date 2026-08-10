import { FILTER_FRAGMENT_PASS1_LITE } from "./shared/filterPass1LiteShader.js";
import { FILTER_FRAGMENT_PASS1_LITE_BASE } from "./shared/filterPass1LiteBaseShader.js";
import { FILTER_FRAGMENT_PASS1_LITE_NEAREST } from "./shared/filterPass1LiteNearestShader.js";
import { FILTER_FRAGMENT_PASS1_LITE_SIMPLE } from "./shared/filterPass1LiteSimpleShader.js";
import { FILTER_FRAGMENT_PASS2_LITE } from "./shared/filterPass2LiteShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE } from "./shared/filterPass2BeamLiteShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE } from "./shared/filterPass2BeamLiteCompositeShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL } from "./shared/filterPass2BeamLiteKernelShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_SIMPLE } from "./shared/filterPass2BeamLiteSimpleShader.js";
import { FILTER_FRAGMENT_BEAM_SOURCE_DOWNSCALE } from "./shared/filterBeamSourceDownscaleShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_KERNEL } from "./shared/filterPass2BeamLiteCrtKernelShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_COMPOSE } from "./shared/filterPass2BeamLiteCrtComposeShader.js";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_POST } from "./shared/filterPass2BeamLiteCrtPostShader.js";
import { FILTER_FRAGMENT_PASS1_PC98_LITE } from "./shared/filterPass1Pc98LiteShader.js";
import { FILTER_FRAGMENT_PASS1_PC98_LITE_NEAREST } from "./shared/filterPass1Pc98LiteNearestShader.js";
import { FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE } from "./shared/filterPass2PhosphorLiteShader.js";
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
const compileBusyOverlay = document.getElementById("compileBusyOverlay");
const compileBusyLabel = document.getElementById("compileBusyLabel");

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
let pass1Program = null;
let passthroughProgram = null;
let texture = null;
let fbo = null;
let fboTexture = null;
let fboWidth = 0;
let fboHeight = 0;
let animationFrameId = 0;
let mediaStream = null;
let audioContext = null;
let mediaSourceNode = null;
let audioEngine = null;
let uniformLocations = null;
let pass1UniformLocations = null;
let beamKernelProgram = null;
let beamComposeProgram = null;
let beamDownscaleProgram = null;
let beamKernelUniformLocations = null;
let beamComposeUniformLocations = null;
let beamDownscaleUniformLocations = null;
let beamSourceFbo = null;
let beamSourceTexture = null;
let beamSourceFboWidth = 0;
let beamSourceFboHeight = 0;
let beamKernelFbo = null;
let beamKernelTexture = null;
let beamKernelFboWidth = 0;
let beamKernelFboHeight = 0;
let beamComposeFbo = null;
let beamComposeTexture = null;
let beamComposeFboWidth = 0;
let beamComposeFboHeight = 0;
let startedAt = performance.now();
let currentSettings = { ...DEFAULT_SETTINGS };
let currentSession = null;
let isFitModeEnabled = false;
let mediaRecorder = null;
let recordedChunks = [];
let isAlarmArmed = false;
let alarmOverlayEl = null;
let alarmClockIntervalId = null;
let activeRendererVariantSignature = null;
let compileStatusTimerId = null;

const isWindowsChromiumAngleRisk = () => {
  const userAgent = navigator.userAgent || "";
  const isWindows = /Windows/i.test(userAgent);
  const userAgentDataBrands = navigator.userAgentData?.brands;
  const isChromium =
    /\b(?:Chrome|Chromium|Edg|OPR|Brave)\//i.test(userAgent)
    || (Array.isArray(userAgentDataBrands) && userAgentDataBrands.some(({ brand }) => /Chrom/i.test(brand)));
  return isWindows && isChromium;
};

const isPc98PaletteMode = (mode) =>
  mode === "pc98"
  || mode === "pc98_tile"
  || mode === "pc98_512"
  || mode === "pc98_512_sat"
  || mode === "pc98_4096";

function isBeamCrossModeEnabled(settings) {
  return settings.phosphorDotShape === "beam";
}

function isPhosphorDotModeEnabled(settings) {
  return settings.phosphorDotShape !== "beam" &&
    (settings.spotMaskStrength ?? 0) > 0.001 &&
    (
      (settings.phosphorDotInternalScale ?? 1) > 1 ||
      !!settings.phosphorDotBrightCore ||
      (settings.phosphorDotCellFill ?? 0) > 0.001 ||
      !!settings.phosphorDotFlatDisc ||
      !!settings.phosphorDotNeighborBlend
    );
}

function shouldUsePreFilterDownscale(settings) {
  return !!settings.preFilterDownscaleEnabled || isBeamCrossModeEnabled(settings);
}

function getWindowsLiteVariantKey(settings) {
  const pass1 = isPc98PaletteMode(settings.paletteMode)
    ? "pc98"
    : settings.presetKey === "crtBeam"
      ? "basic_nearest"
      : "basic";

  if (isBeamCrossModeEnabled(settings)) {
    if (settings.presetKey === "crtBeam") {
      return "basic_nearest:beam_crt";
    }
    return `${pass1}:beam_full`;
  }

  const pass2 =
    settings.phosphorStrength > 0.001 ||
    settings.spotMaskStrength > 0.001 ||
    isPhosphorDotModeEnabled(settings)
      ? "phosphor"
      : "basic";

  return `${pass1}:${pass2}`;
}

function getWindowsLiteShaderSources(settings) {
  const variantKey = getWindowsLiteVariantKey(settings);
  const [pass1Variant, pass2Variant] = variantKey.split(":");
  const pass1 =
    pass1Variant === "pc98_nearest"
      ? FILTER_FRAGMENT_PASS1_PC98_LITE_NEAREST
      : pass1Variant === "pc98"
        ? FILTER_FRAGMENT_PASS1_PC98_LITE
        : pass1Variant === "basic_nearest"
          ? FILTER_FRAGMENT_PASS1_LITE_NEAREST
          : pass1Variant === "basic"
            ? FILTER_FRAGMENT_PASS1_LITE_BASE
            : FILTER_FRAGMENT_PASS1_LITE_SIMPLE;
  const pass2 =
    pass2Variant === "beam_simple"
      ? FILTER_FRAGMENT_PASS2_BEAM_LITE_SIMPLE
      : pass2Variant === "beam_crt"
        ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_POST
        : pass2Variant === "beam_full"
          ? FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE
          : pass2Variant === "phosphor"
            ? FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE
            : FILTER_FRAGMENT_PASS2_LITE;
  return {
    pass1,
    pass2,
    beamDownscale: shouldUsePreFilterDownscale(settings) ? FILTER_FRAGMENT_BEAM_SOURCE_DOWNSCALE : null,
    beamKernel:
      pass2Variant === "beam_crt"
        ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_KERNEL
        : pass2Variant === "beam_full"
          ? FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL
          : null,
    beamCompose: pass2Variant === "beam_crt" ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_COMPOSE : null,
  };
}

function getRendererVariantSignature(settings) {
  return JSON.stringify({
    variantKey: getWindowsLiteVariantKey(settings),
    beamDownscale: shouldUsePreFilterDownscale(settings),
  });
}

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

function renderViewerCompileState(message) {
  if (compileBusyLabel) {
    compileBusyLabel.textContent = message || "Preparing shader...";
  }
  if (compileBusyOverlay) {
    compileBusyOverlay.hidden = !message;
  }
}

function publishCompileState(active, label = "") {
  renderViewerCompileState(active ? label : "");
  void chrome.runtime.sendMessage({
    type: "SET_COMPILE_STATUS",
    state: active
      ? {
          active: true,
          label,
          source: "viewer",
          updatedAt: Date.now(),
        }
      : {
          active: false,
          label: "",
          source: "viewer",
          updatedAt: Date.now(),
        },
  }).catch(() => {});
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

  currentSettings = await loadSettings();
  setupRenderer(gl);
  resizeCanvas();
  window.addEventListener("resize", handleWindowResize);
  fitButton?.addEventListener("click", toggleFitMode);
  recordButton?.addEventListener("click", handleRecordButtonClick);
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
  if (session?.sourceHasProtectedVideo) {
    setStatus("Protected video detected in source tab. Chrome may return gray frames.");
  }
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
  if (currentSession?.sourceHasProtectedVideo) {
    setStatus("Protected video detected in source tab. Chrome may return gray frames.");
  }
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

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

  if (program && uniformLocations && pass1Program && pass1UniformLocations) {
    applyPass1Settings();
    applyPass2Settings();
    ensureFramebuffer(gl.drawingBufferWidth, gl.drawingBufferHeight);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(pass1Program);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.01, 0.02, 0.01, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const limitedSize = getPhosphorDotLimitedTargetSize(currentSettings, getDisplaySize().width, getDisplaySize().height);
    const timeSec = (performance.now() - startedAt) / 1000;
    let pass2PrimaryTexture = fboTexture;
    let beamSourcePrimaryTexture = texture;
    if (beamDownscaleProgram && beamDownscaleUniformLocations) {
      ensureBeamSourceFramebuffer(limitedSize.w, limitedSize.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, beamSourceFbo);
      gl.viewport(0, 0, limitedSize.w, limitedSize.h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(beamDownscaleProgram);
      gl.uniform2f(beamDownscaleUniformLocations.uSourceSize, Math.max(gl.drawingBufferWidth, 1), Math.max(gl.drawingBufferHeight, 1));
      gl.uniform2f(beamDownscaleUniformLocations.uTargetSize, Math.max(limitedSize.w, 1), Math.max(limitedSize.h, 1));
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboTexture);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      beamSourcePrimaryTexture = beamSourceTexture;
      pass2PrimaryTexture = beamSourceTexture;

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0.01, 0.02, 0.01, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    if (beamKernelProgram && beamKernelUniformLocations) {
      ensureBeamKernelFramebuffer(gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, beamKernelFbo);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(beamKernelProgram);
      applyBeamKernelSettings(limitedSize);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, beamSourcePrimaryTexture);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (beamComposeProgram && beamComposeUniformLocations) {
        ensureBeamComposeFramebuffer(gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, beamComposeFbo);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(beamComposeProgram);
        applyBeamComposeSettings(limitedSize);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, beamSourcePrimaryTexture);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, beamKernelTexture);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        pass2PrimaryTexture = beamComposeTexture;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0.01, 0.02, 0.01, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    gl.useProgram(program);
    gl.uniform1f(uniformLocations.uTime, timeSec);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, pass2PrimaryTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, beamSourcePrimaryTexture);
    if (beamKernelTexture) {
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, beamKernelTexture);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.activeTexture(gl.TEXTURE0);
  } else {
    gl.useProgram(activeProgram);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

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

  return currentSession.sourceViewportWidth / currentSession.sourceViewportHeight;
}

function updateCanvasAspectRatio() {
  canvas.style.setProperty("--canvas-aspect-ratio", `${getCaptureAspectRatio()}`);
}

function getDisplaySize() {
  const dpr = window.devicePixelRatio || 1;
  return {
    width: Math.max(1, Math.round((canvas.clientWidth || gl?.drawingBufferWidth || 1) * dpr)),
    height: Math.max(1, Math.round((canvas.clientHeight || gl?.drawingBufferHeight || 1) * dpr)),
  };
}

function logCaptureAspect(reason) {
  void reason;
}

function applyPreset(presetKey) {
  void presetKey;
  if (!gl) return;
  applyPass1Settings();
  applyPass2Settings();
}

function getPhosphorDotLimitedTargetSize(settings, visibleWidth, visibleHeight) {
  const isBeamMode = isBeamCrossModeEnabled(settings);
  const isDotMode = isPhosphorDotModeEnabled(settings);
  if ((!isBeamMode && !isDotMode) || !visibleWidth || !visibleHeight) {
    return { w: settings.targetWidth, h: settings.targetHeight };
  }

  const bulbRadius = settings.bulbRadius ?? 0.22;
  const beamCapFloor = 1.2;
  const beamBloomFloor = (settings.beamWhiteBloom ?? 1) * 0.6;
  const baseMinCellPixels = isBeamMode
    ? Math.max(beamCapFloor, beamBloomFloor)
    : Math.max(1.1, 2.15 + bulbRadius * 1.15);
  const internalScale = Math.min(4, Math.max(1, Number(settings.phosphorDotInternalScale ?? 1)));
  const effectiveInternalScale = isBeamMode ? 1 : internalScale;
  const minCellPixels = Math.max(1.0, baseMinCellPixels / effectiveInternalScale);
  const scaledW = settings.targetWidth * effectiveInternalScale;
  const scaledH = settings.targetHeight * effectiveInternalScale;
  const maxWidth = Math.max(1, Math.floor(visibleWidth / minCellPixels));
  const maxHeight = Math.max(1, Math.floor(visibleHeight / minCellPixels));
  const scale = Math.min(
    1,
    maxWidth / Math.max(scaledW, 1),
    maxHeight / Math.max(scaledH, 1),
  );

  return {
    w: Math.max(1, Math.round(scaledW * scale)),
    h: Math.max(1, Math.round(scaledH * scale)),
  };
}

function applyPass1Settings() {
  if (!gl || !pass1Program || !pass1UniformLocations) return;
  const displaySize = getDisplaySize();
  const limitedSize = getPhosphorDotLimitedTargetSize(
    currentSettings,
    displaySize.width,
    displaySize.height,
  );
  gl.useProgram(pass1Program);
  gl.uniform2f(pass1UniformLocations.uTargetSize, limitedSize.w, limitedSize.h);
  gl.uniform1f(pass1UniformLocations.uColorLevels, currentSettings.colorLevels);
  gl.uniform1f(pass1UniformLocations.uDitherStrength, currentSettings.ditherStrength);
  gl.uniform1f(pass1UniformLocations.uPaletteMode, paletteModeToUniform(currentSettings.paletteMode));
  gl.uniform1f(pass1UniformLocations.uGlowStrength, currentSettings.glowStrength);
  gl.uniform1f(pass1UniformLocations.uSmoothStrength, currentSettings.smoothStrength ?? 0);
  gl.uniform1f(pass1UniformLocations.uToonSteps, currentSettings.toonSteps ?? 0);
  gl.uniform1f(pass1UniformLocations.uEdgeBoost, currentSettings.edgeBoost ?? 0);
  gl.uniform1f(pass1UniformLocations.uAnimeEdgeLow, currentSettings.animeEdgeLow ?? 0.08);
  gl.uniform1f(pass1UniformLocations.uAnimeEdgeHigh, currentSettings.animeEdgeHigh ?? 0.55);
  gl.uniform3f(pass1UniformLocations.uMonoTint, ...toShaderMonoTint(currentSettings.monoTint));
  gl.uniform1f(pass1UniformLocations.uNeonBoost, currentSettings.neonBoost ?? 1);
  gl.uniform1f(pass1UniformLocations.uNeonSaturation, currentSettings.neonSaturation ?? 1);
  gl.uniform1f(pass1UniformLocations.uNeonDetail, currentSettings.neonDetail ?? 1);
}

function applyPass2Settings() {
  if (!gl || !program || !uniformLocations) return;
  const displaySize = getDisplaySize();
  const limitedSize = getPhosphorDotLimitedTargetSize(
    currentSettings,
    displaySize.width,
    displaySize.height,
  );
  gl.useProgram(program);
  gl.uniform2f(uniformLocations.uTargetSize, limitedSize.w, limitedSize.h);
  gl.uniform2f(uniformLocations.uOutputSize, Math.max(gl.drawingBufferWidth, 1), Math.max(gl.drawingBufferHeight, 1));
  gl.uniform2f(uniformLocations.uDisplaySize, displaySize.width, displaySize.height);
  gl.uniform2f(uniformLocations.uBeamSourceSize, limitedSize.w, limitedSize.h);
  gl.uniform1f(uniformLocations.uColorLevels, currentSettings.colorLevels);
  gl.uniform1f(uniformLocations.uDitherStrength, currentSettings.ditherStrength);
  gl.uniform1f(uniformLocations.uSamplingMode, 0);
  gl.uniform1f(uniformLocations.uCurvature, currentSettings.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, currentSettings.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, currentSettings.scanline2Strength);
  gl.uniform1f(uniformLocations.uScanlineBrightnessFade, currentSettings.scanlineBrightnessFade);
  gl.uniform1f(uniformLocations.uVignetteStrength, currentSettings.vignetteStrength);
  gl.uniform1f(uniformLocations.uLcdCrosstalkStrength, currentSettings.lcdCrosstalkStrength ?? 0);
  gl.uniform1f(uniformLocations.uGlowStrength, currentSettings.glowStrength);
  gl.uniform1f(uniformLocations.uHorizontalSharpness, currentSettings.horizontalSharpness ?? 0);
  gl.uniform1f(uniformLocations.uRgbConvergenceOffset, currentSettings.rgbConvergenceOffset ?? 0);
  gl.uniform1f(uniformLocations.uSmoothStrength, currentSettings.smoothStrength ?? 0);
  gl.uniform1f(uniformLocations.uPhosphorStrength, currentSettings.phosphorStrength);
  gl.uniform1f(uniformLocations.uSpotMaskStrength, currentSettings.spotMaskStrength);
  gl.uniform1f(uniformLocations.uBulbRadius, currentSettings.bulbRadius ?? 0.22);
  gl.uniform1f(uniformLocations.uBlackFloor, currentSettings.blackFloor ?? 0.01);
  gl.uniform1f(uniformLocations.uBasicContrast, currentSettings.basicContrast ?? 1);
  gl.uniform1f(uniformLocations.uBasicSaturation, currentSettings.basicSaturation ?? 1);
  gl.uniform1f(uniformLocations.uReflectiveLcdBase, currentSettings.reflectiveLcdBase ?? 0);
  gl.uniform1f(uniformLocations.uLightDependentTint, currentSettings.lightDependentTint ?? 0);
  gl.uniform1f(uniformLocations.uGrainVisibilityMode, currentSettings.grainVisibilityMode ? 1 : 0);
  gl.uniform1f(uniformLocations.uBeamDarkCutoff, currentSettings.beamDarkCutoff ?? 0);
  gl.uniform1f(uniformLocations.uBeamHorizontalSpread, currentSettings.beamHorizontalSpread ?? 0.5);
  gl.uniform1f(uniformLocations.uBeamStripeStrength, currentSettings.beamStripeStrength ?? 0);
  gl.uniform1f(uniformLocations.uBeamWhiteBloom, currentSettings.beamWhiteBloom ?? 1);
  gl.uniform1f(uniformLocations.uBeamWarmBloom, currentSettings.beamWarmBloom ?? 0);
  gl.uniform1f(uniformLocations.uScreenFaceGlow, currentSettings.screenFaceGlow ?? 0);
  gl.uniform1f(uniformLocations.uFocusStrength, currentSettings.focusStrength ?? 0);
  gl.uniform2f(uniformLocations.uFocusSize, currentSettings.focusSizeX ?? 0.35, currentSettings.focusSizeY ?? 0.2);
  gl.uniform2f(uniformLocations.uFocusCenter, currentSettings.focusCenterX ?? 0.5, currentSettings.focusCenterY ?? 0.5);
  gl.uniform1f(uniformLocations.uLumaAmount, currentSettings.lumaAmount ?? 1);
  gl.uniform1f(uniformLocations.uLumaLow, currentSettings.lumaLow ?? 0);
  gl.uniform1f(uniformLocations.uLumaHigh, currentSettings.lumaHigh ?? 1);
  gl.uniform1f(uniformLocations.uLumaKnee, currentSettings.lumaKnee ?? 0.2);
  gl.uniform1f(uniformLocations.uSaturationAmount, currentSettings.saturationAmount ?? 1);
  gl.uniform1f(uniformLocations.uSaturationLow, currentSettings.saturationLow ?? 0);
  gl.uniform1f(uniformLocations.uSaturationHigh, currentSettings.saturationHigh ?? 1);
  gl.uniform1f(uniformLocations.uSaturationKnee, currentSettings.saturationKnee ?? 0.2);
  gl.uniform1f(uniformLocations.uOutputBrightness, currentSettings.outputBrightness ?? 1);
  gl.uniform1f(uniformLocations.uPhosphorDotLightBalance, currentSettings.phosphorDotLightBalance ?? 1);
  gl.uniform1f(
    uniformLocations.uPixelAspect,
    (Math.max(gl.drawingBufferWidth, 1) * Math.max(currentSettings.targetHeight, 1)) /
      (Math.max(gl.drawingBufferHeight, 1) * Math.max(currentSettings.targetWidth, 1)),
  );
  gl.uniform1f(uniformLocations.uPhosphorDotMode, isPhosphorDotModeEnabled(currentSettings) ? 1 : 0);
  gl.uniform1f(uniformLocations.uPhosphorDotShape, phosphorDotShapeToUniform(currentSettings.phosphorDotShape));
  gl.uniform1f(
    uniformLocations.uPhosphorDotInternalScale,
    Math.min(4, Math.max(1, Number(currentSettings.phosphorDotInternalScale ?? 1))),
  );
  gl.uniform1f(uniformLocations.uPhosphorDotSizeResponse, currentSettings.phosphorDotSizeResponse ?? 1);
  gl.uniform1f(uniformLocations.uPhosphorDotBrightCore, currentSettings.phosphorDotBrightCore ? 1 : 0);
  gl.uniform1f(uniformLocations.uPhosphorDotCellFill, currentSettings.phosphorDotCellFill ?? 0);
  gl.uniform1f(uniformLocations.uPhosphorDotFlatDisc, currentSettings.phosphorDotFlatDisc ? 1 : 0);
  gl.uniform1f(
    uniformLocations.uPhosphorDotNeighborBlend,
    currentSettings.phosphorDotNeighborBlend ? 1 : 0,
  );
  gl.uniform1f(uniformLocations.uPhosphorDotGrainStrength, currentSettings.phosphorDotGrainStrength ?? 0);
  gl.uniform1f(uniformLocations.uCloseUpNoiseStrength, currentSettings.closeUpNoiseStrength);
}

function applyBeamKernelSettings(limitedSize) {
  if (!gl || !beamKernelProgram || !beamKernelUniformLocations) return;
  const displaySize = getDisplaySize();
  gl.useProgram(beamKernelProgram);
  gl.uniform2f(beamKernelUniformLocations.uBeamSourceSize, limitedSize.w, limitedSize.h);
  gl.uniform2f(beamKernelUniformLocations.uDisplaySize, displaySize.width, displaySize.height);
  gl.uniform1f(beamKernelUniformLocations.uColorLevels, Math.max(currentSettings.colorLevels, 2));
  gl.uniform1f(beamKernelUniformLocations.uDitherStrength, currentSettings.ditherStrength);
  gl.uniform1f(beamKernelUniformLocations.uSamplingMode, 0);
  gl.uniform1f(beamKernelUniformLocations.uHorizontalSharpness, currentSettings.horizontalSharpness ?? 0);
  gl.uniform1f(beamKernelUniformLocations.uRgbConvergenceOffset, currentSettings.rgbConvergenceOffset ?? 0);
  gl.uniform1f(beamKernelUniformLocations.uSmoothStrength, currentSettings.smoothStrength ?? 0);
  gl.uniform1f(beamKernelUniformLocations.uCurvature, currentSettings.curvature ?? 0);
  gl.uniform1f(beamKernelUniformLocations.uBeamDarkCutoff, currentSettings.beamDarkCutoff ?? 0);
  gl.uniform1f(beamKernelUniformLocations.uBeamHorizontalSpread, currentSettings.beamHorizontalSpread ?? 0.5);
  gl.uniform1f(beamKernelUniformLocations.uBeamWhiteBloom, currentSettings.beamWhiteBloom ?? 1);
}

function applyBeamComposeSettings(limitedSize) {
  if (!gl || !beamComposeProgram || !beamComposeUniformLocations) return;
  const displaySize = getDisplaySize();
  gl.useProgram(beamComposeProgram);
  gl.uniform2f(beamComposeUniformLocations.uTargetSize, Math.max(currentSettings.targetWidth, 1), Math.max(currentSettings.targetHeight, 1));
  gl.uniform2f(beamComposeUniformLocations.uOutputSize, Math.max(gl.drawingBufferWidth, 1), Math.max(gl.drawingBufferHeight, 1));
  gl.uniform2f(beamComposeUniformLocations.uDisplaySize, displaySize.width, displaySize.height);
  gl.uniform2f(beamComposeUniformLocations.uBeamSourceSize, limitedSize.w, limitedSize.h);
  gl.uniform1f(beamComposeUniformLocations.uSamplingMode, 0);
  gl.uniform1f(beamComposeUniformLocations.uRgbConvergenceOffset, currentSettings.rgbConvergenceOffset ?? 0);
  gl.uniform1f(beamComposeUniformLocations.uCurvature, currentSettings.curvature ?? 0);
  gl.uniform1f(beamComposeUniformLocations.uBeamStripeStrength, currentSettings.beamStripeStrength ?? 0);
  gl.uniform1f(beamComposeUniformLocations.uBeamWhiteBloom, currentSettings.beamWhiteBloom ?? 1);
  gl.uniform1f(beamComposeUniformLocations.uBeamWarmBloom, currentSettings.beamWarmBloom ?? 0);
}

function ensureBeamSourceFramebuffer(width, height) {
  if (!gl) return;
  if (beamSourceFbo && beamSourceTexture && beamSourceFboWidth === width && beamSourceFboHeight === height) {
    return;
  }
  if (beamSourceFbo) gl.deleteFramebuffer(beamSourceFbo);
  if (beamSourceTexture) gl.deleteTexture(beamSourceTexture);
  beamSourceTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, beamSourceTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  beamSourceFbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, beamSourceFbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, beamSourceTexture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  beamSourceFboWidth = width;
  beamSourceFboHeight = height;
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
  activeRendererVariantSignature = getRendererVariantSignature(currentSettings);
  if (compileStatusTimerId != null) {
    window.clearTimeout(compileStatusTimerId);
    compileStatusTimerId = null;
  }
  renderViewerCompileState("Preparing retro filter...");
  compileStatusTimerId = window.setTimeout(() => {
    compileStatusTimerId = null;
    publishCompileState(true, "Preparing retro filter...");
  }, 120);
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

  // --- Filter programs (lite variants only) ---
  const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const shaderSources = getWindowsLiteShaderSources(currentSettings);
  console.info("[viewer shader route]", {
    presetKey: currentSettings.presetKey,
    phosphorDotShape: currentSettings.phosphorDotShape,
    variantKey: getWindowsLiteVariantKey(currentSettings),
    beamDownscale: Boolean(shaderSources.beamDownscale),
    beamKernel: Boolean(shaderSources.beamKernel),
    beamCompose: Boolean(shaderSources.beamCompose),
    beamStripeStrength: currentSettings.beamStripeStrength ?? 0,
    beamWhiteBloom: currentSettings.beamWhiteBloom ?? 1,
    beamWarmBloom: currentSettings.beamWarmBloom ?? 0,
  });
  const pass1Frag = compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.pass1);
  const pass2Frag = compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.pass2);

  const prog1 = webgl.createProgram();
  const prog2 = webgl.createProgram();
  if (!prog1 || !prog2) {
    throw new Error("Failed to create WebGL program.");
  }

  webgl.attachShader(prog1, vertexShader);
  webgl.attachShader(prog1, pass1Frag);
  webgl.linkProgram(prog1);
  webgl.attachShader(prog2, vertexShader);
  webgl.attachShader(prog2, pass2Frag);
  webgl.linkProgram(prog2);

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
  finalizeFilterProgram(webgl, prog1, prog2);
}

async function finalizeFilterProgram(webgl, prog1, prog2) {
  const shaderSources = getWindowsLiteShaderSources(currentSettings);
  const updateCompileState = (message) => {
    if (compileStatusTimerId != null) {
      window.clearTimeout(compileStatusTimerId);
      compileStatusTimerId = null;
    }
    publishCompileState(Boolean(message), message || "");
  };
  const beamDownscaleFrag = shaderSources.beamDownscale
    ? compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.beamDownscale)
    : null;
  const beamKernelFrag = shaderSources.beamKernel
    ? compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.beamKernel)
    : null;
  const beamComposeFrag = shaderSources.beamCompose
    ? compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.beamCompose)
    : null;
  const beamDownscaleProg = beamDownscaleFrag ? webgl.createProgram() : null;
  const beamKernelProg = beamKernelFrag ? webgl.createProgram() : null;
  const beamComposeProg = beamComposeFrag ? webgl.createProgram() : null;
  if ((beamDownscaleFrag && !beamDownscaleProg) || (beamKernelFrag && !beamKernelProg) || (beamComposeFrag && !beamComposeProg)) {
    throw new Error("Failed to create viewer beam programs.");
  }
  if (beamDownscaleProg && beamDownscaleFrag) {
    updateCompileState("Linking shader (beam downscale)...");
    webgl.attachShader(beamDownscaleProg, compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource));
    webgl.attachShader(beamDownscaleProg, beamDownscaleFrag);
    webgl.linkProgram(beamDownscaleProg);
  }
  if (beamKernelProg && beamKernelFrag) {
    updateCompileState("Linking shader (beam kernel)...");
    webgl.attachShader(beamKernelProg, compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource));
    webgl.attachShader(beamKernelProg, beamKernelFrag);
    webgl.linkProgram(beamKernelProg);
  }
  if (beamComposeProg && beamComposeFrag) {
    updateCompileState("Linking shader (beam compose)...");
    webgl.attachShader(beamComposeProg, compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource));
    webgl.attachShader(beamComposeProg, beamComposeFrag);
    webgl.linkProgram(beamComposeProg);
  }
  const ext =
    webgl.getExtension("WEBGL_parallel_shader_compile")
    || webgl.getExtension("KHR_parallel_shader_compile");

  if (ext) {
    await new Promise((resolve) => {
      const poll = () => {
        updateCompileState("Linking shader (waiting for GPU)...");
        const ready1 = webgl.getProgramParameter(prog1, ext.COMPLETION_STATUS_KHR);
        const ready2 = webgl.getProgramParameter(prog2, ext.COMPLETION_STATUS_KHR);
        const ready3 = beamDownscaleProg ? webgl.getProgramParameter(beamDownscaleProg, ext.COMPLETION_STATUS_KHR) : true;
        const ready4 = beamKernelProg ? webgl.getProgramParameter(beamKernelProg, ext.COMPLETION_STATUS_KHR) : true;
        const ready5 = beamComposeProg ? webgl.getProgramParameter(beamComposeProg, ext.COMPLETION_STATUS_KHR) : true;
        if (ready1 && ready2 && ready3 && ready4 && ready5) {
          resolve();
          return;
        }
        requestAnimationFrame(poll);
      };
      requestAnimationFrame(poll);
    });
  } else {
    // Chromium should normally expose parallel shader compile. Keep a minimal
    // fallback for unexpected runtimes rather than hard-failing.
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  if (!webgl.getProgramParameter(prog1, webgl.LINK_STATUS)) {
    updateCompileState("");
    const message = webgl.getProgramInfoLog(prog1) || "Unknown pass1 program link error.";
    console.error("[viewer] Filter shader link failed:", message);
    return;
  }

  if (!webgl.getProgramParameter(prog2, webgl.LINK_STATUS)) {
    updateCompileState("");
    const message = webgl.getProgramInfoLog(prog2) || "Unknown pass2 program link error.";
    console.error("[viewer] Filter shader link failed:", message);
    return;
  }
  if (beamDownscaleProg && !webgl.getProgramParameter(beamDownscaleProg, webgl.LINK_STATUS)) {
    updateCompileState("");
    console.error("[viewer] Beam downscale shader link failed:", webgl.getProgramInfoLog(beamDownscaleProg) || "unknown");
    return;
  }
  if (beamKernelProg && !webgl.getProgramParameter(beamKernelProg, webgl.LINK_STATUS)) {
    updateCompileState("");
    console.error("[viewer] Beam kernel shader link failed:", webgl.getProgramInfoLog(beamKernelProg) || "unknown");
    return;
  }
  if (beamComposeProg && !webgl.getProgramParameter(beamComposeProg, webgl.LINK_STATUS)) {
    updateCompileState("");
    console.error("[viewer] Beam compose shader link failed:", webgl.getProgramInfoLog(beamComposeProg) || "unknown");
    return;
  }

  webgl.useProgram(prog1);
  webgl.uniform1i(webgl.getUniformLocation(prog1, "uTexture"), 0);
  pass1UniformLocations = {
    uTargetSize: webgl.getUniformLocation(prog1, "uTargetSize"),
    uColorLevels: webgl.getUniformLocation(prog1, "uColorLevels"),
    uDitherStrength: webgl.getUniformLocation(prog1, "uDitherStrength"),
    uPaletteMode: webgl.getUniformLocation(prog1, "uPaletteMode"),
    uGlowStrength: webgl.getUniformLocation(prog1, "uGlowStrength"),
    uSmoothStrength: webgl.getUniformLocation(prog1, "uSmoothStrength"),
    uToonSteps: webgl.getUniformLocation(prog1, "uToonSteps"),
    uEdgeBoost: webgl.getUniformLocation(prog1, "uEdgeBoost"),
    uAnimeEdgeLow: webgl.getUniformLocation(prog1, "uAnimeEdgeLow"),
    uAnimeEdgeHigh: webgl.getUniformLocation(prog1, "uAnimeEdgeHigh"),
    uMonoTint: webgl.getUniformLocation(prog1, "uMonoTint"),
    uNeonBoost: webgl.getUniformLocation(prog1, "uNeonBoost"),
    uNeonSaturation: webgl.getUniformLocation(prog1, "uNeonSaturation"),
    uNeonDetail: webgl.getUniformLocation(prog1, "uNeonDetail"),
  };

  webgl.useProgram(prog2);
  webgl.uniform1i(webgl.getUniformLocation(prog2, "uPass1Texture"), 0);
  webgl.uniform1i(webgl.getUniformLocation(prog2, "uSourceTexture"), 1);
  webgl.uniform1i(webgl.getUniformLocation(prog2, "uBeamKernelTexture"), 2);
  uniformLocations = {
    uTargetSize: webgl.getUniformLocation(prog2, "uTargetSize"),
    uOutputSize: webgl.getUniformLocation(prog2, "uOutputSize"),
    uDisplaySize: webgl.getUniformLocation(prog2, "uDisplaySize"),
    uBeamSourceSize: webgl.getUniformLocation(prog2, "uBeamSourceSize"),
    uColorLevels: webgl.getUniformLocation(prog2, "uColorLevels"),
    uDitherStrength: webgl.getUniformLocation(prog2, "uDitherStrength"),
    uSamplingMode: webgl.getUniformLocation(prog2, "uSamplingMode"),
    uCurvature: webgl.getUniformLocation(prog2, "uCurvature"),
    uScanlineStrength: webgl.getUniformLocation(prog2, "uScanlineStrength"),
    uScanline2Strength: webgl.getUniformLocation(prog2, "uScanline2Strength"),
    uScanlineBrightnessFade: webgl.getUniformLocation(prog2, "uScanlineBrightnessFade"),
    uVignetteStrength: webgl.getUniformLocation(prog2, "uVignetteStrength"),
    uLcdCrosstalkStrength: webgl.getUniformLocation(prog2, "uLcdCrosstalkStrength"),
    uGlowStrength: webgl.getUniformLocation(prog2, "uGlowStrength"),
    uHorizontalSharpness: webgl.getUniformLocation(prog2, "uHorizontalSharpness"),
    uRgbConvergenceOffset: webgl.getUniformLocation(prog2, "uRgbConvergenceOffset"),
    uSmoothStrength: webgl.getUniformLocation(prog2, "uSmoothStrength"),
    uPhosphorStrength: webgl.getUniformLocation(prog2, "uPhosphorStrength"),
    uSpotMaskStrength: webgl.getUniformLocation(prog2, "uSpotMaskStrength"),
    uBulbRadius: webgl.getUniformLocation(prog2, "uBulbRadius"),
    uBlackFloor: webgl.getUniformLocation(prog2, "uBlackFloor"),
    uBasicContrast: webgl.getUniformLocation(prog2, "uBasicContrast"),
    uBasicSaturation: webgl.getUniformLocation(prog2, "uBasicSaturation"),
    uReflectiveLcdBase: webgl.getUniformLocation(prog2, "uReflectiveLcdBase"),
    uLightDependentTint: webgl.getUniformLocation(prog2, "uLightDependentTint"),
    uGrainVisibilityMode: webgl.getUniformLocation(prog2, "uGrainVisibilityMode"),
    uBeamDarkCutoff: webgl.getUniformLocation(prog2, "uBeamDarkCutoff"),
    uBeamHorizontalSpread: webgl.getUniformLocation(prog2, "uBeamHorizontalSpread"),
    uBeamStripeStrength: webgl.getUniformLocation(prog2, "uBeamStripeStrength"),
    uBeamWhiteBloom: webgl.getUniformLocation(prog2, "uBeamWhiteBloom"),
    uBeamWarmBloom: webgl.getUniformLocation(prog2, "uBeamWarmBloom"),
    uScreenFaceGlow: webgl.getUniformLocation(prog2, "uScreenFaceGlow"),
    uFocusStrength: webgl.getUniformLocation(prog2, "uFocusStrength"),
    uFocusSize: webgl.getUniformLocation(prog2, "uFocusSize"),
    uFocusCenter: webgl.getUniformLocation(prog2, "uFocusCenter"),
    uLumaAmount: webgl.getUniformLocation(prog2, "uLumaAmount"),
    uLumaLow: webgl.getUniformLocation(prog2, "uLumaLow"),
    uLumaHigh: webgl.getUniformLocation(prog2, "uLumaHigh"),
    uLumaKnee: webgl.getUniformLocation(prog2, "uLumaKnee"),
    uSaturationAmount: webgl.getUniformLocation(prog2, "uSaturationAmount"),
    uSaturationLow: webgl.getUniformLocation(prog2, "uSaturationLow"),
    uSaturationHigh: webgl.getUniformLocation(prog2, "uSaturationHigh"),
    uSaturationKnee: webgl.getUniformLocation(prog2, "uSaturationKnee"),
    uOutputBrightness: webgl.getUniformLocation(prog2, "uOutputBrightness"),
    uPhosphorDotLightBalance: webgl.getUniformLocation(prog2, "uPhosphorDotLightBalance"),
    uPixelAspect: webgl.getUniformLocation(prog2, "uPixelAspect"),
    uPhosphorDotMode: webgl.getUniformLocation(prog2, "uPhosphorDotMode"),
    uPhosphorDotShape: webgl.getUniformLocation(prog2, "uPhosphorDotShape"),
    uPhosphorDotInternalScale: webgl.getUniformLocation(prog2, "uPhosphorDotInternalScale"),
    uPhosphorDotSizeResponse: webgl.getUniformLocation(prog2, "uPhosphorDotSizeResponse"),
    uPhosphorDotBrightCore: webgl.getUniformLocation(prog2, "uPhosphorDotBrightCore"),
    uPhosphorDotCellFill: webgl.getUniformLocation(prog2, "uPhosphorDotCellFill"),
    uPhosphorDotFlatDisc: webgl.getUniformLocation(prog2, "uPhosphorDotFlatDisc"),
    uPhosphorDotNeighborBlend: webgl.getUniformLocation(prog2, "uPhosphorDotNeighborBlend"),
    uPhosphorDotGrainStrength: webgl.getUniformLocation(prog2, "uPhosphorDotGrainStrength"),
    uCloseUpNoiseStrength: webgl.getUniformLocation(prog2, "uCloseUpNoiseStrength"),
    uTime: webgl.getUniformLocation(prog2, "uTime"),
  };

  pass1Program = prog1;
  program = prog2;
  beamDownscaleProgram = beamDownscaleProg;
  beamKernelProgram = beamKernelProg;
  beamComposeProgram = beamComposeProg;
  if (beamDownscaleProg) {
    webgl.useProgram(beamDownscaleProg);
    webgl.uniform1i(webgl.getUniformLocation(beamDownscaleProg, "uTexture"), 0);
    beamDownscaleUniformLocations = {
      uTexture: webgl.getUniformLocation(beamDownscaleProg, "uTexture"),
      uSourceSize: webgl.getUniformLocation(beamDownscaleProg, "uSourceSize"),
      uTargetSize: webgl.getUniformLocation(beamDownscaleProg, "uTargetSize"),
    };
  } else {
    beamDownscaleUniformLocations = null;
  }
  if (beamKernelProg) {
    webgl.useProgram(beamKernelProg);
    webgl.uniform1i(webgl.getUniformLocation(beamKernelProg, "uSourceTexture"), 1);
    beamKernelUniformLocations = {
      uSourceTexture: webgl.getUniformLocation(beamKernelProg, "uSourceTexture"),
      uBeamSourceSize: webgl.getUniformLocation(beamKernelProg, "uBeamSourceSize"),
      uDisplaySize: webgl.getUniformLocation(beamKernelProg, "uDisplaySize"),
      uColorLevels: webgl.getUniformLocation(beamKernelProg, "uColorLevels"),
      uDitherStrength: webgl.getUniformLocation(beamKernelProg, "uDitherStrength"),
      uSamplingMode: webgl.getUniformLocation(beamKernelProg, "uSamplingMode"),
      uHorizontalSharpness: webgl.getUniformLocation(beamKernelProg, "uHorizontalSharpness"),
      uRgbConvergenceOffset: webgl.getUniformLocation(beamKernelProg, "uRgbConvergenceOffset"),
      uSmoothStrength: webgl.getUniformLocation(beamKernelProg, "uSmoothStrength"),
      uCurvature: webgl.getUniformLocation(beamKernelProg, "uCurvature"),
      uBeamDarkCutoff: webgl.getUniformLocation(beamKernelProg, "uBeamDarkCutoff"),
      uBeamHorizontalSpread: webgl.getUniformLocation(beamKernelProg, "uBeamHorizontalSpread"),
      uBeamWhiteBloom: webgl.getUniformLocation(beamKernelProg, "uBeamWhiteBloom"),
    };
  } else {
    beamKernelUniformLocations = null;
  }
  if (beamComposeProg) {
    webgl.useProgram(beamComposeProg);
    webgl.uniform1i(webgl.getUniformLocation(beamComposeProg, "uSourceTexture"), 1);
    webgl.uniform1i(webgl.getUniformLocation(beamComposeProg, "uBeamKernelTexture"), 2);
    beamComposeUniformLocations = {
      uSourceTexture: webgl.getUniformLocation(beamComposeProg, "uSourceTexture"),
      uBeamKernelTexture: webgl.getUniformLocation(beamComposeProg, "uBeamKernelTexture"),
      uTargetSize: webgl.getUniformLocation(beamComposeProg, "uTargetSize"),
      uOutputSize: webgl.getUniformLocation(beamComposeProg, "uOutputSize"),
      uDisplaySize: webgl.getUniformLocation(beamComposeProg, "uDisplaySize"),
      uBeamSourceSize: webgl.getUniformLocation(beamComposeProg, "uBeamSourceSize"),
      uSamplingMode: webgl.getUniformLocation(beamComposeProg, "uSamplingMode"),
      uRgbConvergenceOffset: webgl.getUniformLocation(beamComposeProg, "uRgbConvergenceOffset"),
      uCurvature: webgl.getUniformLocation(beamComposeProg, "uCurvature"),
      uBeamStripeStrength: webgl.getUniformLocation(beamComposeProg, "uBeamStripeStrength"),
      uBeamWhiteBloom: webgl.getUniformLocation(beamComposeProg, "uBeamWhiteBloom"),
      uBeamWarmBloom: webgl.getUniformLocation(beamComposeProg, "uBeamWarmBloom"),
    };
  } else {
    beamComposeUniformLocations = null;
  }
  console.info("[viewer shader ready]", {
    variantKey: getWindowsLiteVariantKey(currentSettings),
    beamDownscaleProgram: Boolean(beamDownscaleProgram),
    beamKernelProgram: Boolean(beamKernelProgram),
    beamComposeProgram: Boolean(beamComposeProgram),
  });
  updateCompileState("");
  applyCurrentSettings();
}

function ensureBeamKernelFramebuffer(width, height) {
  if (!gl) return;
  if (beamKernelFbo && beamKernelTexture && beamKernelFboWidth === width && beamKernelFboHeight === height) {
    return;
  }
  if (beamKernelFbo) gl.deleteFramebuffer(beamKernelFbo);
  if (beamKernelTexture) gl.deleteTexture(beamKernelTexture);
  beamKernelTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, beamKernelTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  beamKernelFbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, beamKernelFbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, beamKernelTexture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  beamKernelFboWidth = width;
  beamKernelFboHeight = height;
}

function ensureBeamComposeFramebuffer(width, height) {
  if (!gl) return;
  if (beamComposeFbo && beamComposeTexture && beamComposeFboWidth === width && beamComposeFboHeight === height) {
    return;
  }
  if (beamComposeFbo) gl.deleteFramebuffer(beamComposeFbo);
  if (beamComposeTexture) gl.deleteTexture(beamComposeTexture);
  beamComposeTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, beamComposeTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  beamComposeFbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, beamComposeFbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, beamComposeTexture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  beamComposeFboWidth = width;
  beamComposeFboHeight = height;
}

function ensureFramebuffer(width, height) {
  if (!gl) return;
  if (fbo && fboTexture && fboWidth === width && fboHeight === height) {
    return;
  }

  if (fbo) {
    gl.deleteFramebuffer(fbo);
    fbo = null;
  }
  if (fboTexture) {
    gl.deleteTexture(fboTexture);
    fboTexture = null;
  }

  const nextTexture = gl.createTexture();
  if (!nextTexture) {
    throw new Error("Failed to create viewer FBO texture.");
  }
  gl.bindTexture(gl.TEXTURE_2D, nextTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const nextFbo = gl.createFramebuffer();
  if (!nextFbo) {
    gl.deleteTexture(nextTexture);
    throw new Error("Failed to create viewer framebuffer.");
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, nextFbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, nextTexture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  // Creating the FBO texture above leaves it bound on the active texture unit.
  // Pass 1 must continue sampling from the live capture texture, otherwise
  // Chrome can detect a framebuffer/texture feedback loop and render garbage.
  gl.bindTexture(gl.TEXTURE_2D, texture);

  fbo = nextFbo;
  fboTexture = nextTexture;
  fboWidth = width;
  fboHeight = height;
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

  const nextSettings = normalizeSettings(changes[SETTINGS_STORAGE_KEY].newValue);
  const previousSignature = activeRendererVariantSignature;
  const nextSignature = getRendererVariantSignature(nextSettings);
  currentSettings = nextSettings;
  if (gl && previousSignature !== nextSignature) {
    setupRenderer(gl);
    return;
  }
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

function phosphorDotShapeToUniform(shape) {
  if (shape === "heart") return 1;
  if (shape === "beam") return 2;
  if (shape === "square") return 3;
  return 0;
}
