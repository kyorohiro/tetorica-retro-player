import { FILTER_FRAGMENT } from "./shared/filterShader.js";
import {
  CUSTOM_PRESET_KEY,
  DEFAULT_SETTINGS,
  PRESETS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
  toShaderMonoTint,
} from "./shared/settings.js";
import {
  createDriveCurve,
  createSmallRoomImpulse,
  createTintedNoiseBuffer,
  createVinylDustBuffer,
  createTapeSaturationCurve,
  createHallReverbImpulse,
} from "./shared/audioEngine.js";

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

let gl = null;
let program = null;
let texture = null;
let animationFrameId = 0;
let mediaStream = null;
let audioContext = null;
let mediaSourceNode = null;
let masterGainNode = null;
let radioToneHighpassNode = null;
let radioToneLowpassNode = null;
let radioTonePresenceNode = null;
let lofiLowpassNode = null;
let lofiHighshelfNode = null;
let lofiDriveNode = null;
let bitcrusherNode = null;
let postCrushLowpassNode = null;
let bassEqNode = null;
let midEqNode = null;
let trebleEqNode = null;
let tapeSaturatorNode = null;
let stereoWidthNode = null;
let roomDryGainNode = null;
let roomConvolverNode = null;
let roomWetGainNode = null;
let outputBusNode = null;
let echoDelayLineNode = null;
let echoFeedbackGainNode = null;
let echoWetGainNode = null;
let hallReverbConvolverNode = null;
let hallReverbWetGainNode = null;
let chorusDelay1Node = null;
let chorusDelay2Node = null;
let chorusLfo1Node = null;
let chorusLfo2Node = null;
let chorusLfoGain1Node = null;
let chorusLfoGain2Node = null;
let chorusWetGainNode = null;
let busCompressorNode = null;
let fxOutputGainNode = null;
let wowFlutterDelayNode = null;
let wowLfoNode = null;
let wowLfoGainNode = null;
let flutterLfoNode = null;
let flutterLfoGainNode = null;
let noiseSourceNode = null;
let noiseFilterNode = null;
let noisePannerNode = null;
let noiseGainNode = null;
let noiseLfoNode = null;
let noiseLfoGainNode = null;
let crackleSourceNode = null;
let crackleFilterNode = null;
let vinylDustBedFilterNode = null;
let vinylDustBedGainNode = null;
let crackleGainNode = null;
let uniformLocations = null;
let startedAt = performance.now();
let currentSettings = { ...DEFAULT_SETTINGS };
let currentSession = null;
let isFitModeEnabled = false;
let mediaRecorder = null;
let recordedChunks = [];

init().catch((error) => {
  console.error(error);
  setStatus(`Failed to initialize: ${error instanceof Error ? error.message : String(error)}`);
});

if (chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((message) => {
    if (message?.type !== "CAPTURE_SESSION_UPDATED" || !message.session?.streamId) {
      return;
    }

    currentSession = message.session;

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
  if (radioToneHighpassNode && radioToneLowpassNode && radioTonePresenceNode) {
    const amount = currentSettings.isAudioFxEnabled ? currentSettings.radioToneAmount : 0;
    radioToneHighpassNode.frequency.value = 20 + amount * 430;
    radioToneHighpassNode.Q.value = 0.4 + amount * 0.35;
    radioToneLowpassNode.frequency.value = 20000 - amount * 17400;
    radioToneLowpassNode.Q.value = 0.2 + amount * 0.9;
    radioTonePresenceNode.frequency.value = 1700;
    radioTonePresenceNode.Q.value = 0.8 + amount * 1.4;
    radioTonePresenceNode.gain.value = amount * 6;
  }

  if (lofiLowpassNode && lofiHighshelfNode && lofiDriveNode) {
    const amount = currentSettings.isAudioFxEnabled ? currentSettings.lofiAmount : 0;
    lofiLowpassNode.frequency.value = 16000 - amount * 14200;
    lofiLowpassNode.Q.value = 0.3 + amount * 1.8;
    lofiHighshelfNode.gain.value = -amount * 18;
    lofiDriveNode.curve = createDriveCurve(amount * 0.6);
  }

  if (bitcrusherNode) {
    const isEnabled = currentSettings.isAudioFxEnabled;
    const bitDepth = 16 - (isEnabled ? currentSettings.bitCrushAmount : 0) * 12;
    const holdFrames = 1 + (isEnabled ? currentSettings.sampleRateReductionAmount : 0) * 23;
    const mix = isEnabled
      ? Math.max(currentSettings.bitCrushAmount, currentSettings.sampleRateReductionAmount)
      : 0;

    bitcrusherNode.parameters.get("bitDepth")?.setValueAtTime(
      bitDepth,
      bitcrusherNode.context.currentTime,
    );
    bitcrusherNode.parameters.get("holdFrames")?.setValueAtTime(
      holdFrames,
      bitcrusherNode.context.currentTime,
    );
    bitcrusherNode.parameters.get("mix")?.setValueAtTime(
      mix,
      bitcrusherNode.context.currentTime,
    );
  }

  if (bassEqNode && midEqNode && trebleEqNode) {
    const eqScale = currentSettings.isAudioFxEnabled ? 15 : 0;
    bassEqNode.gain.value = currentSettings.bassAmount * eqScale;
    midEqNode.gain.value = currentSettings.midAmount * eqScale;
    trebleEqNode.gain.value = currentSettings.trebleAmount * eqScale;
  }

  if (stereoWidthNode) {
    const width = currentSettings.isAudioFxEnabled ? 1 + currentSettings.stereoWidthAmount : 1;
    stereoWidthNode.parameters.get("width")?.setValueAtTime(
      width,
      stereoWidthNode.context.currentTime,
    );
  }

  if (roomDryGainNode && roomWetGainNode) {
    const amount = currentSettings.isAudioFxEnabled ? currentSettings.smallSpeakerRoomAmount : 0;
    roomDryGainNode.gain.value = Math.max(0.52, 1 - amount * 0.42);
    roomWetGainNode.gain.value = amount * 0.95;
  }

  if (
    wowFlutterDelayNode &&
    wowLfoNode &&
    wowLfoGainNode &&
    flutterLfoNode &&
    flutterLfoGainNode
  ) {
    const amount = currentSettings.isAudioFxEnabled ? currentSettings.wowFlutterAmount : 0;
    wowFlutterDelayNode.delayTime.value = 0.006 + amount * 0.004;
    wowLfoNode.frequency.value = 0.18 + amount * 0.42;
    wowLfoGainNode.gain.value = amount * 0.0035;
    flutterLfoNode.frequency.value = 5.2 + amount * 6.5;
    flutterLfoGainNode.gain.value = amount * 0.0009;
  }

  if (noiseGainNode) {
    noiseGainNode.gain.value = currentSettings.isNoiseEnabled
      ? Math.min(0.24, currentSettings.noiseLevel * 5.5)
      : 0;
  }

  if (crackleGainNode) {
    crackleGainNode.gain.value = currentSettings.isNoiseEnabled
      ? Math.min(
          0.24,
          currentSettings.vinylDustAmount * 0.22 + currentSettings.noiseLevel * 0.25,
        )
      : 0;
  }

  if (vinylDustBedFilterNode && vinylDustBedGainNode) {
    const amount = currentSettings.isNoiseEnabled ? currentSettings.vinylDustAmount : 0;
    vinylDustBedFilterNode.frequency.value = 2100 + amount * 2600;
    vinylDustBedFilterNode.Q.value = 0.35 + amount * 0.25;
    vinylDustBedGainNode.gain.value = amount * 0.11;
  }

  if (postCrushLowpassNode) {
    const amount = currentSettings.isAudioFxEnabled ? (currentSettings.noiseReductionAmount ?? 0) : 0;
    postCrushLowpassNode.frequency.value = Math.max(3000, 18000 - amount * 15000);
  }

  if (tapeSaturatorNode) {
    const amount = currentSettings.isAudioFxEnabled ? (currentSettings.tapeSaturationAmount ?? 0) : 0;
    tapeSaturatorNode.curve = createTapeSaturationCurve(amount);
  }

  if (echoDelayLineNode && echoFeedbackGainNode && echoWetGainNode) {
    const amount = currentSettings.isAudioFxEnabled ? (currentSettings.delayAmount ?? 0) : 0;
    echoDelayLineNode.delayTime.value = 0.32;
    echoFeedbackGainNode.gain.value = amount * 0.42;
    echoWetGainNode.gain.value = amount * 0.75;
  }

  if (hallReverbWetGainNode) {
    const amount = currentSettings.isAudioFxEnabled ? (currentSettings.reverbAmount ?? 0) : 0;
    hallReverbWetGainNode.gain.value = amount * 2.0;
  }

  if (chorusLfoGain1Node && chorusLfoGain2Node && chorusWetGainNode) {
    const amount = currentSettings.isAudioFxEnabled ? (currentSettings.chorusAmount ?? 0) : 0;
    chorusWetGainNode.gain.value = amount * 0.6;
    chorusLfoGain1Node.gain.value = amount * 0.005;
    chorusLfoGain2Node.gain.value = amount * 0.006;
  }

  if (busCompressorNode) {
    const amount = currentSettings.isAudioFxEnabled ? (currentSettings.compressorAmount ?? 0) : 0;
    busCompressorNode.threshold.value = -36 * amount;
    busCompressorNode.ratio.value = 1 + 9 * amount;
  }

  if (fxOutputGainNode) {
    fxOutputGainNode.gain.value = currentSettings.isAudioFxEnabled
      ? (currentSettings.fxOutputTrimAmount ?? 1.0)
      : 1.0;
  }
}

async function ensureAudioContext() {
  if (audioContext?.state === "closed") {
    audioContext = null;
    mediaSourceNode = null;
    masterGainNode = null;
    radioToneHighpassNode = null;
    radioToneLowpassNode = null;
    radioTonePresenceNode = null;
    lofiLowpassNode = null;
    lofiHighshelfNode = null;
    lofiDriveNode = null;
    bitcrusherNode = null;
    postCrushLowpassNode = null;
    bassEqNode = null;
    midEqNode = null;
    trebleEqNode = null;
    tapeSaturatorNode = null;
    stereoWidthNode = null;
    roomDryGainNode = null;
    roomConvolverNode = null;
    roomWetGainNode = null;
    outputBusNode = null;
    echoDelayLineNode = null;
    echoFeedbackGainNode = null;
    echoWetGainNode = null;
    hallReverbConvolverNode = null;
    hallReverbWetGainNode = null;
    chorusDelay1Node = null;
    chorusDelay2Node = null;
    chorusLfo1Node = null;
    chorusLfo2Node = null;
    chorusLfoGain1Node = null;
    chorusLfoGain2Node = null;
    chorusWetGainNode = null;
    busCompressorNode = null;
    fxOutputGainNode = null;
    wowFlutterDelayNode = null;
    wowLfoNode = null;
    wowLfoGainNode = null;
    flutterLfoNode = null;
    flutterLfoGainNode = null;
    noiseSourceNode = null;
    noiseFilterNode = null;
    noisePannerNode = null;
    noiseGainNode = null;
    noiseLfoNode = null;
    noiseLfoGainNode = null;
    crackleSourceNode = null;
    crackleFilterNode = null;
    vinylDustBedFilterNode = null;
    vinylDustBedGainNode = null;
    crackleGainNode = null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
    masterGainNode = audioContext.createGain();
    radioToneHighpassNode = audioContext.createBiquadFilter();
    radioToneLowpassNode = audioContext.createBiquadFilter();
    radioTonePresenceNode = audioContext.createBiquadFilter();
    lofiLowpassNode = audioContext.createBiquadFilter();
    lofiHighshelfNode = audioContext.createBiquadFilter();
    lofiDriveNode = audioContext.createWaveShaper();
    if ("audioWorklet" in audioContext) {
      await audioContext.audioWorklet.addModule(
        new URL("./shared/bitcrusherWorklet.js", import.meta.url).href,
      );
      bitcrusherNode = new AudioWorkletNode(audioContext, "retro-bitcrusher", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
      });
      await audioContext.audioWorklet.addModule(
        new URL("./shared/stereoWidthWorklet.js", import.meta.url).href,
      );
      stereoWidthNode = new AudioWorkletNode(audioContext, "retro-stereo-width", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
      });
    }
    bassEqNode = audioContext.createBiquadFilter();
    midEqNode = audioContext.createBiquadFilter();
    trebleEqNode = audioContext.createBiquadFilter();
    roomDryGainNode = audioContext.createGain();
    roomConvolverNode = audioContext.createConvolver();
    roomWetGainNode = audioContext.createGain();
    wowFlutterDelayNode = audioContext.createDelay(0.05);
    wowLfoNode = audioContext.createOscillator();
    wowLfoGainNode = audioContext.createGain();
    flutterLfoNode = audioContext.createOscillator();
    flutterLfoGainNode = audioContext.createGain();

    radioToneHighpassNode.type = "highpass";
    radioToneLowpassNode.type = "lowpass";
    radioTonePresenceNode.type = "peaking";
    lofiLowpassNode.type = "lowpass";
    lofiHighshelfNode.type = "highshelf";
    bassEqNode.type = "lowshelf";
    bassEqNode.frequency.value = 180;
    midEqNode.type = "peaking";
    midEqNode.frequency.value = 1200;
    midEqNode.Q.value = 0.9;
    trebleEqNode.type = "highshelf";
    trebleEqNode.frequency.value = 3200;
    roomConvolverNode.buffer = createSmallRoomImpulse(audioContext);
    lofiHighshelfNode.frequency.value = 2800;
    lofiDriveNode.oversample = "4x";
    wowFlutterDelayNode.delayTime.value = 0.006;
    wowLfoNode.type = "sine";
    flutterLfoNode.type = "sine";

    wowLfoNode.connect(wowLfoGainNode);
    wowLfoGainNode.connect(wowFlutterDelayNode.delayTime);
    flutterLfoNode.connect(flutterLfoGainNode);
    flutterLfoGainNode.connect(wowFlutterDelayNode.delayTime);

    wowFlutterDelayNode.connect(radioToneHighpassNode);
    radioToneHighpassNode.connect(radioToneLowpassNode);
    radioToneLowpassNode.connect(radioTonePresenceNode);
    radioTonePresenceNode.connect(lofiLowpassNode);
    lofiLowpassNode.connect(lofiHighshelfNode);
    lofiHighshelfNode.connect(lofiDriveNode);
    postCrushLowpassNode = audioContext.createBiquadFilter();
    postCrushLowpassNode.type = "lowpass";
    postCrushLowpassNode.frequency.value = 18000;
    postCrushLowpassNode.Q.value = 0.5;

    if (bitcrusherNode) {
      lofiDriveNode.connect(bitcrusherNode);
      bitcrusherNode.connect(postCrushLowpassNode);
    } else {
      lofiDriveNode.connect(postCrushLowpassNode);
    }
    postCrushLowpassNode.connect(bassEqNode);
    bassEqNode.connect(midEqNode);
    midEqNode.connect(trebleEqNode);

    tapeSaturatorNode = audioContext.createWaveShaper();
    tapeSaturatorNode.curve = createTapeSaturationCurve(0);
    tapeSaturatorNode.oversample = "4x";
    trebleEqNode.connect(tapeSaturatorNode);

    if (stereoWidthNode) {
      tapeSaturatorNode.connect(stereoWidthNode);
      stereoWidthNode.connect(roomDryGainNode);
      stereoWidthNode.connect(roomConvolverNode);
    } else {
      tapeSaturatorNode.connect(roomDryGainNode);
      tapeSaturatorNode.connect(roomConvolverNode);
    }
    roomConvolverNode.connect(roomWetGainNode);
    roomDryGainNode.connect(masterGainNode);
    roomWetGainNode.connect(masterGainNode);

    outputBusNode = audioContext.createGain();
    outputBusNode.gain.value = 1;

    echoDelayLineNode = audioContext.createDelay(1.0);
    echoDelayLineNode.delayTime.value = 0.32;
    echoFeedbackGainNode = audioContext.createGain();
    echoFeedbackGainNode.gain.value = 0;
    echoWetGainNode = audioContext.createGain();
    echoWetGainNode.gain.value = 0;

    hallReverbConvolverNode = audioContext.createConvolver();
    hallReverbConvolverNode.buffer = createHallReverbImpulse(audioContext);
    hallReverbWetGainNode = audioContext.createGain();
    hallReverbWetGainNode.gain.value = 0;

    chorusDelay1Node = audioContext.createDelay(0.05);
    chorusDelay2Node = audioContext.createDelay(0.05);
    chorusDelay1Node.delayTime.value = 0.018;
    chorusDelay2Node.delayTime.value = 0.023;
    chorusLfo1Node = audioContext.createOscillator();
    chorusLfo2Node = audioContext.createOscillator();
    chorusLfo1Node.type = "sine";
    chorusLfo2Node.type = "sine";
    chorusLfo1Node.frequency.value = 0.8;
    chorusLfo2Node.frequency.value = 1.3;
    chorusLfoGain1Node = audioContext.createGain();
    chorusLfoGain2Node = audioContext.createGain();
    chorusLfoGain1Node.gain.value = 0;
    chorusLfoGain2Node.gain.value = 0;
    chorusWetGainNode = audioContext.createGain();
    chorusWetGainNode.gain.value = 0;

    busCompressorNode = audioContext.createDynamicsCompressor();
    busCompressorNode.knee.value = 10;
    busCompressorNode.attack.value = 0.003;
    busCompressorNode.release.value = 0.12;
    busCompressorNode.threshold.value = 0;
    busCompressorNode.ratio.value = 1;

    fxOutputGainNode = audioContext.createGain();
    fxOutputGainNode.gain.value = 1;

    masterGainNode.connect(outputBusNode);
    masterGainNode.connect(echoDelayLineNode);
    echoDelayLineNode.connect(echoFeedbackGainNode);
    echoFeedbackGainNode.connect(echoDelayLineNode);
    echoDelayLineNode.connect(echoWetGainNode);
    echoWetGainNode.connect(outputBusNode);
    masterGainNode.connect(hallReverbConvolverNode);
    hallReverbConvolverNode.connect(hallReverbWetGainNode);
    hallReverbWetGainNode.connect(outputBusNode);
    masterGainNode.connect(chorusDelay1Node);
    masterGainNode.connect(chorusDelay2Node);
    chorusLfo1Node.connect(chorusLfoGain1Node);
    chorusLfoGain1Node.connect(chorusDelay1Node.delayTime);
    chorusLfo2Node.connect(chorusLfoGain2Node);
    chorusLfoGain2Node.connect(chorusDelay2Node.delayTime);
    chorusDelay1Node.connect(chorusWetGainNode);
    chorusDelay2Node.connect(chorusWetGainNode);
    chorusWetGainNode.connect(outputBusNode);

    outputBusNode.connect(busCompressorNode);
    busCompressorNode.connect(fxOutputGainNode);
    fxOutputGainNode.connect(audioContext.destination);

    noiseSourceNode = audioContext.createBufferSource();
    noiseSourceNode.buffer = createTintedNoiseBuffer(audioContext);
    noiseSourceNode.loop = true;

    const noiseHighpassNode = audioContext.createBiquadFilter();
    noiseHighpassNode.type = "highpass";
    noiseHighpassNode.frequency.value = 1100;
    noiseHighpassNode.Q.value = 0.25;

    const noiseLowpassNode = audioContext.createBiquadFilter();
    noiseLowpassNode.type = "lowpass";
    noiseLowpassNode.frequency.value = 5600;
    noiseLowpassNode.Q.value = 0.18;

    noiseFilterNode = audioContext.createBiquadFilter();
    noiseFilterNode.type = "peaking";
    noiseFilterNode.frequency.value = 2400;
    noiseFilterNode.Q.value = 0.7;
    noiseFilterNode.gain.value = -2.5;

    noisePannerNode = audioContext.createStereoPanner();
    noiseGainNode = audioContext.createGain();
    noiseLfoNode = audioContext.createOscillator();
    noiseLfoGainNode = audioContext.createGain();
    crackleSourceNode = audioContext.createBufferSource();
    crackleFilterNode = audioContext.createBiquadFilter();
    vinylDustBedFilterNode = audioContext.createBiquadFilter();
    vinylDustBedGainNode = audioContext.createGain();
    crackleGainNode = audioContext.createGain();

    noiseLfoNode.type = "sine";
    noiseLfoNode.frequency.value = 0.021;
    noiseLfoGainNode.gain.value = 0.08;
    crackleSourceNode.buffer = createVinylDustBuffer(audioContext);
    crackleSourceNode.loop = true;
    crackleFilterNode.type = "highpass";
    crackleFilterNode.frequency.value = 1250;
    crackleFilterNode.Q.value = 0.35;
    vinylDustBedFilterNode.type = "bandpass";
    vinylDustBedFilterNode.frequency.value = 2400;
    vinylDustBedFilterNode.Q.value = 0.4;
    vinylDustBedGainNode.gain.value = 0;
    crackleGainNode.gain.value = 0;

    noiseSourceNode.connect(noiseHighpassNode);
    noiseHighpassNode.connect(noiseLowpassNode);
    noiseLowpassNode.connect(noiseFilterNode);
    noiseFilterNode.connect(noisePannerNode);
    noisePannerNode.connect(noiseGainNode);
    noiseGainNode.connect(masterGainNode);
    noiseLfoNode.connect(noiseLfoGainNode);
    noiseLfoGainNode.connect(noisePannerNode.pan);
    crackleSourceNode.connect(crackleFilterNode);
    crackleFilterNode.connect(crackleGainNode);
    crackleGainNode.connect(masterGainNode);
    crackleSourceNode.connect(vinylDustBedFilterNode);
    vinylDustBedFilterNode.connect(vinylDustBedGainNode);
    vinylDustBedGainNode.connect(masterGainNode);
    noiseSourceNode.start();
    noiseLfoNode.start();
    crackleSourceNode.start();
    wowLfoNode.start();
    flutterLfoNode.start();
    chorusLfo1Node.start();
    chorusLfo2Node.start();

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
  mediaSourceNode.connect(wowFlutterDelayNode ?? lofiLowpassNode);
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

  try {
    crackleSourceNode?.stop();
  } catch {
    // ignore repeated stop
  }

  try {
    wowLfoNode?.stop();
  } catch {
    // ignore repeated stop
  }

  try {
    flutterLfoNode?.stop();
  } catch {
    // ignore repeated stop
  }

  try {
    chorusLfo1Node?.stop();
  } catch {
    // ignore repeated stop
  }

  try {
    chorusLfo2Node?.stop();
  } catch {
    // ignore repeated stop
  }

  const context = audioContext;
  audioContext = null;
  masterGainNode = null;
  radioToneHighpassNode = null;
  radioToneLowpassNode = null;
  radioTonePresenceNode = null;
  lofiLowpassNode = null;
  lofiHighshelfNode = null;
  lofiDriveNode = null;
  bitcrusherNode = null;
  postCrushLowpassNode = null;
  bassEqNode = null;
  midEqNode = null;
  trebleEqNode = null;
  tapeSaturatorNode = null;
  stereoWidthNode = null;
  roomDryGainNode = null;
  roomConvolverNode = null;
  roomWetGainNode = null;
  outputBusNode = null;
  echoDelayLineNode = null;
  echoFeedbackGainNode = null;
  echoWetGainNode = null;
  hallReverbConvolverNode = null;
  hallReverbWetGainNode = null;
  chorusDelay1Node = null;
  chorusDelay2Node = null;
  chorusLfo1Node = null;
  chorusLfo2Node = null;
  chorusLfoGain1Node = null;
  chorusLfoGain2Node = null;
  chorusWetGainNode = null;
  busCompressorNode = null;
  fxOutputGainNode = null;
  wowFlutterDelayNode = null;
  wowLfoNode = null;
  wowLfoGainNode = null;
  flutterLfoNode = null;
  flutterLfoGainNode = null;
  noiseSourceNode = null;
  noiseFilterNode = null;
  noisePannerNode = null;
  noiseGainNode = null;
  noiseLfoNode = null;
  noiseLfoGainNode = null;
  crackleSourceNode = null;
  crackleFilterNode = null;
  vinylDustBedFilterNode = null;
  vinylDustBedGainNode = null;
  crackleGainNode = null;

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
    uSmoothStrength: webgl.getUniformLocation(program, "uSmoothStrength"),
    uToonSteps: webgl.getUniformLocation(program, "uToonSteps"),
    uEdgeBoost: webgl.getUniformLocation(program, "uEdgeBoost"),
    uAnimeEdgeLow: webgl.getUniformLocation(program, "uAnimeEdgeLow"),
    uAnimeEdgeHigh: webgl.getUniformLocation(program, "uAnimeEdgeHigh"),
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
