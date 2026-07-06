import {
  applyPresetToSettings,
  COLOR_LEVEL_LIMITS,
  CUSTOM_PRESET_KEY,
  DEFAULT_PRESET_KEY,
  DEFAULT_SETTINGS,
  getDefaultColorLevelsForPalette,
  MONO_TINT_OPTIONS,
  OVERLAY_TARGET_LIMITS,
  PALETTE_OPTIONS,
  PRESETS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
} from "./shared/settings.js";

const captureButton = document.getElementById("captureButton");
const viewerButton = document.getElementById("viewerButton");
const overlayButton = document.getElementById("overlayButton");
const presetSelect = document.getElementById("presetSelect");
const audioPresetSelect = document.getElementById("audioPresetSelect");
const paletteModeSelect = document.getElementById("paletteMode");
const monoTintSelect = document.getElementById("monoTint");
const targetWidthInput = document.getElementById("targetWidth");
const targetWidthValue = document.getElementById("targetWidthValue");
const targetHeightInput = document.getElementById("targetHeight");
const targetHeightValue = document.getElementById("targetHeightValue");
const matchTargetAspectInput = document.getElementById("matchTargetAspect");
const colorLevelsInput = document.getElementById("colorLevels");
const colorLevelsValue = document.getElementById("colorLevelsValue");
const ditherStrengthInput = document.getElementById("ditherStrength");
const ditherStrengthValue = document.getElementById("ditherStrengthValue");
const curvatureInput = document.getElementById("curvature");
const curvatureValue = document.getElementById("curvatureValue");
const crtAspectInput = document.getElementById("crtAspect");
const crtAspectValue = document.getElementById("crtAspectValue");
const scanlineStrengthInput = document.getElementById("scanlineStrength");
const scanlineStrengthValue = document.getElementById("scanlineStrengthValue");
const scanline2StrengthInput = document.getElementById("scanline2Strength");
const scanline2StrengthValue = document.getElementById("scanline2StrengthValue");
const scanlineBrightnessFadeInput = document.getElementById("scanlineBrightnessFade");
const scanlineBrightnessFadeValue = document.getElementById("scanlineBrightnessFadeValue");
const vignetteStrengthInput = document.getElementById("vignetteStrength");
const vignetteStrengthValue = document.getElementById("vignetteStrengthValue");
const glowStrengthInput = document.getElementById("glowStrength");
const glowStrengthValue = document.getElementById("glowStrengthValue");
const phosphorStrengthInput = document.getElementById("phosphorStrength");
const phosphorStrengthValue = document.getElementById("phosphorStrengthValue");
const spotMaskStrengthInput = document.getElementById("spotMaskStrength");
const spotMaskStrengthValue = document.getElementById("spotMaskStrengthValue");
const phosphorDotInternalScaleInput = document.getElementById("phosphorDotInternalScale");
const phosphorDotBrightCoreInput = document.getElementById("phosphorDotBrightCore");
const phosphorDotFlatDiscInput = document.getElementById("phosphorDotFlatDisc");
const phosphorDotNeighborBlendInput = document.getElementById("phosphorDotNeighborBlend");
const phosphorDotCellFillInput = document.getElementById("phosphorDotCellFill");
const phosphorDotCellFillValue = document.getElementById("phosphorDotCellFillValue");
const bulbRadiusInput = document.getElementById("bulbRadius");
const bulbRadiusValue = document.getElementById("bulbRadiusValue");
const blackFloorInput = document.getElementById("blackFloor");
const blackFloorValue = document.getElementById("blackFloorValue");
const phosphorDotLightBalanceInput = document.getElementById("phosphorDotLightBalance");
const phosphorDotLightBalanceValue = document.getElementById("phosphorDotLightBalanceValue");
const lumaAmountInput = document.getElementById("lumaAmount");
const lumaAmountValue = document.getElementById("lumaAmountValue");
const lumaLowInput = document.getElementById("lumaLow");
const lumaLowValue = document.getElementById("lumaLowValue");
const lumaHighInput = document.getElementById("lumaHigh");
const lumaHighValue = document.getElementById("lumaHighValue");
const lumaKneeInput = document.getElementById("lumaKnee");
const lumaKneeValue = document.getElementById("lumaKneeValue");
const saturationAmountInput = document.getElementById("saturationAmount");
const saturationAmountValue = document.getElementById("saturationAmountValue");
const saturationLowInput = document.getElementById("saturationLow");
const saturationLowValue = document.getElementById("saturationLowValue");
const saturationHighInput = document.getElementById("saturationHigh");
const saturationHighValue = document.getElementById("saturationHighValue");
const saturationKneeInput = document.getElementById("saturationKnee");
const saturationKneeValue = document.getElementById("saturationKneeValue");
const outputBrightnessInput = document.getElementById("outputBrightness");
const outputBrightnessValue = document.getElementById("outputBrightnessValue");
const closeUpNoiseStrengthInput = document.getElementById("closeUpNoiseStrength");
const closeUpNoiseStrengthValue = document.getElementById("closeUpNoiseStrengthValue");
const smoothStrengthInput = document.getElementById("smoothStrength");
const smoothStrengthValue = document.getElementById("smoothStrengthValue");
const toonStepsInput = document.getElementById("toonSteps");
const toonStepsValue = document.getElementById("toonStepsValue");
const edgeBoostInput = document.getElementById("edgeBoost");
const edgeBoostValue = document.getElementById("edgeBoostValue");
const animeEdgeLowInput = document.getElementById("animeEdgeLow");
const animeEdgeLowValue = document.getElementById("animeEdgeLowValue");
const animeEdgeHighInput = document.getElementById("animeEdgeHigh");
const animeEdgeHighValue = document.getElementById("animeEdgeHighValue");
const overlayTargetCountInput = document.getElementById("overlayTargetCount");
const overlayTargetCountValue = document.getElementById("overlayTargetCountValue");
const overlayVideoInput = document.getElementById("overlayVideo");
const overlayImageInput = document.getElementById("overlayImage");
const showOverlayButtonsInput = document.getElementById("showOverlayButtons");
const audioFxEnabledInput = document.getElementById("audioFxEnabled");
const lofiAmountInput = document.getElementById("lofiAmount");
const lofiAmountValue = document.getElementById("lofiAmountValue");
const radioToneAmountInput = document.getElementById("radioToneAmount");
const radioToneAmountValue = document.getElementById("radioToneAmountValue");
const bitCrushAmountInput = document.getElementById("bitCrushAmount");
const bitCrushAmountValue = document.getElementById("bitCrushAmountValue");
const sampleRateReductionAmountInput = document.getElementById("sampleRateReductionAmount");
const sampleRateReductionAmountValue = document.getElementById("sampleRateReductionAmountValue");
const bassAmountInput = document.getElementById("bassAmount");
const bassAmountValue = document.getElementById("bassAmountValue");
const midAmountInput = document.getElementById("midAmount");
const midAmountValue = document.getElementById("midAmountValue");
const trebleAmountInput = document.getElementById("trebleAmount");
const trebleAmountValue = document.getElementById("trebleAmountValue");
const stereoWidthAmountInput = document.getElementById("stereoWidthAmount");
const stereoWidthAmountValue = document.getElementById("stereoWidthAmountValue");
const smallSpeakerRoomAmountInput = document.getElementById("smallSpeakerRoomAmount");
const smallSpeakerRoomAmountValue = document.getElementById("smallSpeakerRoomAmountValue");
const wowFlutterAmountInput = document.getElementById("wowFlutterAmount");
const wowFlutterAmountValue = document.getElementById("wowFlutterAmountValue");
const noiseEnabledInput = document.getElementById("noiseEnabled");
const noiseLevelInput = document.getElementById("noiseLevel");
const noiseLevelValue = document.getElementById("noiseLevelValue");
const vinylDustAmountInput = document.getElementById("vinylDustAmount");
const vinylDustAmountValue = document.getElementById("vinylDustAmountValue");
const noiseReductionAmountInput = document.getElementById("noiseReductionAmount");
const noiseReductionAmountValue = document.getElementById("noiseReductionAmountValue");
const delayAmountInput = document.getElementById("delayAmount");
const delayAmountValue = document.getElementById("delayAmountValue");
const reverbAmountInput = document.getElementById("reverbAmount");
const reverbAmountValue = document.getElementById("reverbAmountValue");
const chorusAmountInput = document.getElementById("chorusAmount");
const chorusAmountValue = document.getElementById("chorusAmountValue");
const tapeSaturationAmountInput = document.getElementById("tapeSaturationAmount");
const tapeSaturationAmountValue = document.getElementById("tapeSaturationAmountValue");
const compressorAmountInput = document.getElementById("compressorAmount");
const compressorAmountValue = document.getElementById("compressorAmountValue");
const fxOutputTrimAmountInput = document.getElementById("fxOutputTrimAmount");
const fxOutputTrimAmountValue = document.getElementById("fxOutputTrimAmountValue");
const statusText = document.getElementById("statusText");
const resetButton = document.getElementById("resetButton");
const alarmStatusText = document.getElementById("alarmStatusText");
const alarmOffButton = document.getElementById("alarmOffButton");
const alarmTimeInput = document.getElementById("alarmTimeInput");
const alarmSetButton = document.getElementById("alarmSetButton");
const alarmQuickButtons = document.querySelectorAll(".alarm-quick-btn[data-minutes]");

const ALARM_STORAGE_KEY = "retro-alarm-state";

const TAB_KEY = "retro-popup-tab";
const tabButtons = document.querySelectorAll(".tab-btn[data-tab]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");

function renderAlarmState(state) {
  const isArmed = state?.status === "armed" && state?.targetAt;
  if (isArmed) {
    const targetTime = new Date(state.targetAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    alarmStatusText.textContent = `Alarm set for ${targetTime}`;
    alarmOffButton.style.display = "";
  } else {
    alarmStatusText.textContent = "No alarm set.";
    alarmOffButton.style.display = "none";
  }
}

alarmSetButton.addEventListener("click", async () => {
  const timeStr = alarmTimeInput.value;
  if (!timeStr) {
    setStatus("Please select a time.");
    return;
  }
  const [hours, minutes] = timeStr.split(":").map(Number);
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target.getTime() <= Date.now()) {
    target.setDate(target.getDate() + 1);
  }
  const targetAt = target.getTime();
  const response = await chrome.runtime.sendMessage({ type: "ARM_ALARM", targetAt });
  if (response?.ok) {
    renderAlarmState({ status: "armed", targetAt });
    setStatus(`Alarm set for ${timeStr}.`);
  } else {
    setStatus("Failed to set alarm.");
  }
});

alarmQuickButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const minutes = Number(btn.dataset.minutes);
    const targetAt = Date.now() + minutes * 60 * 1000;
    const response = await chrome.runtime.sendMessage({ type: "ARM_ALARM", targetAt });
    if (response?.ok) {
      renderAlarmState({ status: "armed", targetAt });
      setStatus(`Alarm set for ${minutes}m.`);
    } else {
      setStatus("Failed to set alarm.");
    }
  });
});

alarmOffButton.addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ type: "CLEAR_ALARM" });
  renderAlarmState(null);
  setStatus("Alarm cleared.");
});

function switchTab(tabName) {
  tabButtons.forEach((btn) => {
    const active = btn.dataset.tab === tabName;
    btn.setAttribute("aria-selected", String(active));
  });
  tabPanels.forEach((panel) => {
    panel.style.display = panel.dataset.tabPanel === tabName ? "" : "none";
  });
  localStorage.setItem(TAB_KEY, tabName);
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

switchTab(localStorage.getItem(TAB_KEY) ?? "video");

let currentSettings = { ...DEFAULT_SETTINGS };

const AUDIO_PRESET_OPTIONS = [
  { key: "none", label: "None" },
  { key: "lofi", label: "Lo-Fi" },
  { key: "radio", label: "Radio" },
  { key: "tape", label: "Tape" },
  { key: "vinyl", label: "Vinyl" },
  { key: "vintage-mic", label: "Vintage Mic" },
  { key: "earphone", label: "Earphone" },
  { key: "lofiTape", label: "Lo-Fi Tape" },
  { key: "boombox", label: "Boom Box" },
  { key: "club", label: "Club" },
  { key: "custom", label: "Custom" },
];

const AUDIO_PRESETS = {
  none: {
    isAudioFxEnabled: false,
    isNoiseEnabled: false,
    lofiAmount: 0,
    radioToneAmount: 0,
    bitCrushAmount: 0,
    sampleRateReductionAmount: 0,
    bassAmount: 0,
    midAmount: 0,
    trebleAmount: 0,
    stereoWidthAmount: 0,
    smallSpeakerRoomAmount: 0,
    wowFlutterAmount: 0,
    noiseLevel: 0,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0,
    chorusAmount: 0,
    tapeSaturationAmount: 0,
    compressorAmount: 0,
    fxOutputTrimAmount: 1.0,
  },
  lofi: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.58,
    radioToneAmount: 0.0,
    bitCrushAmount: 0.10,
    sampleRateReductionAmount: 0.10,
    bassAmount: 0.0,
    midAmount: -0.25,
    trebleAmount: 0.0,
    stereoWidthAmount: 0.0,
    smallSpeakerRoomAmount: 0.0,
    wowFlutterAmount: 0.00,
    noiseLevel: 0.005,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0,
    chorusAmount: 0,
    tapeSaturationAmount: 0.00,
    compressorAmount: 0.00,
    fxOutputTrimAmount: 0.66,
  },
  radio: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.2,
    radioToneAmount: 0.7,
    bitCrushAmount: 0.12,
    sampleRateReductionAmount: 0.28,
    bassAmount: -0.4,
    midAmount: 0.13,
    trebleAmount: -0.32,
    stereoWidthAmount: -0.55,
    smallSpeakerRoomAmount: 0.12,
    wowFlutterAmount: 0,
    noiseLevel: 0.007,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0,
    chorusAmount: 0,
    tapeSaturationAmount: 0,
    compressorAmount: 0.00,
    fxOutputTrimAmount: 0.74,
  },
  tape: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.22,
    radioToneAmount: 0.1,
    bitCrushAmount: 0.04,
    sampleRateReductionAmount: 0.08,
    bassAmount: 0.12,
    midAmount: 0,
    trebleAmount: -0.14,
    stereoWidthAmount: 0.10,
    smallSpeakerRoomAmount: 0.18,
    wowFlutterAmount: 0.48,
    noiseLevel: 0.0075,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0.05,
    chorusAmount: 0,
    tapeSaturationAmount: 0.18,
    compressorAmount: 0.25,
    fxOutputTrimAmount: 0.58,
  },
  vinyl: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.14,
    radioToneAmount: 0.06,
    bitCrushAmount: 0.01,
    sampleRateReductionAmount: 0.03,
    bassAmount: 0.06,
    midAmount: -0.02,
    trebleAmount: -0.16,
    stereoWidthAmount: -0.18,
    smallSpeakerRoomAmount: 0,
    wowFlutterAmount: 0.09,
    noiseLevel: 0.0035,
    vinylDustAmount: 0.29,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0,
    chorusAmount: 0,
    tapeSaturationAmount: 0.05,
    compressorAmount: 0.15,
    fxOutputTrimAmount: 0.75,
  },
  "vintage-mic": {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.34,
    radioToneAmount: 0.28,
    bitCrushAmount: 0,
    sampleRateReductionAmount: 0.02,
    bassAmount: -0.24,
    midAmount: 0.24,
    trebleAmount: -0.68,
    stereoWidthAmount: -0.32,
    smallSpeakerRoomAmount: 0.12,
    wowFlutterAmount: 0,
    noiseLevel: 0.0025,
    vinylDustAmount: 0.04,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0.08,
    chorusAmount: 0,
    tapeSaturationAmount: 0.08,
    compressorAmount: 0.12,
    fxOutputTrimAmount: 0.46,
  },
  earphone: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0,
    radioToneAmount: 0,
    bitCrushAmount: 0,
    sampleRateReductionAmount: 0,
    bassAmount: 0.1,
    midAmount: 0,
    trebleAmount: 0.08,
    stereoWidthAmount: 0.22,
    smallSpeakerRoomAmount: 0,
    wowFlutterAmount: 0,
    noiseLevel: 0,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0,
    chorusAmount: 0,
    tapeSaturationAmount: 0,
    compressorAmount: 0,
    fxOutputTrimAmount: 1.0,
  },
  lofiTape: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.48,
    radioToneAmount: 0.1,
    bitCrushAmount: 0.1,
    sampleRateReductionAmount: 0.12,
    bassAmount: 0.1,
    midAmount: -0.02,
    trebleAmount: -0.14,
    stereoWidthAmount: -0.02,
    smallSpeakerRoomAmount: 0.1,
    wowFlutterAmount: 0.08,
    noiseLevel: 0.005,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0.05,
    reverbAmount: 0.05,
    chorusAmount: 0.05,
    tapeSaturationAmount: 0.13,
    compressorAmount: 0.25,
    fxOutputTrimAmount: 0.50,
  },
  boombox: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0.30,
    radioToneAmount: 0.06,
    bitCrushAmount: 0.06,
    sampleRateReductionAmount: 0.06,
    bassAmount: 0.20,
    midAmount: -0.55,
    trebleAmount: 0.05,
    stereoWidthAmount: -0.10,
    smallSpeakerRoomAmount: 0.14,
    wowFlutterAmount: 0.04,
    noiseLevel: 0.004,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0,
    chorusAmount: 0,
    tapeSaturationAmount: 0.10,
    compressorAmount: 0.40,
    fxOutputTrimAmount: 0.58,
  },
  club: {
    isAudioFxEnabled: true,
    isNoiseEnabled: false,
    lofiAmount: 0,
    radioToneAmount: 0,
    bitCrushAmount: 0,
    sampleRateReductionAmount: 0,
    bassAmount: 0.30,
    midAmount: -0.65,
    trebleAmount: 0.15,
    stereoWidthAmount: 0.15,
    smallSpeakerRoomAmount: 0,
    wowFlutterAmount: 0,
    noiseLevel: 0,
    vinylDustAmount: 0,
    noiseReductionAmount: 0,
    delayAmount: 0,
    reverbAmount: 0.05,
    chorusAmount: 0,
    tapeSaturationAmount: 0,
    compressorAmount: 0.45,
    fxOutputTrimAmount: 0.62,
  },
};

init().catch((error) => {
  setStatus(error instanceof Error ? error.message : String(error));
});

captureButton.addEventListener("click", async () => {
  setStatus("Capturing active tab...");
  const response = await chrome.runtime.sendMessage({ type: "START_CAPTURE" });

  if (!response?.ok) {
    setStatus(response?.error ?? "Failed to start capture.");
    return;
  }

  setStatus("Capture started. Viewer updated.");
});

viewerButton.addEventListener("click", async () => {
  await chrome.runtime.sendMessage({ type: "OPEN_VIEWER" });
  setStatus("Viewer opened.");
});

const OVERLAY_ACTIVE_KEY = "retro-overlay-active-tabs";
let currentTabId = null;

async function loadOverlayState() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab?.id) return;
  currentTabId = activeTab.id;

  // Query actual page state as source of truth.
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      args: [chrome.runtime.getURL("overlayRuntime.js")],
      func: async (moduleUrl) => {
        const runtime = await import(moduleUrl);
        return runtime.isRetroOverlayActive();
      },
    });
    const isOn = !!result?.result;
    setOverlayButtonState(isOn);
    await saveOverlayState(isOn);
  } catch {
    // Page may not be injectable (e.g. chrome:// URLs) — fall back to stored state.
    const stored = await chrome.storage.local.get(OVERLAY_ACTIVE_KEY);
    const activeTabs = stored[OVERLAY_ACTIVE_KEY] ?? {};
    setOverlayButtonState(!!activeTabs[currentTabId]);
  }
}

function setOverlayButtonState(isOn) {
  overlayButton.classList.toggle("is-on", isOn);
}

async function saveOverlayState(isOn) {
  const stored = await chrome.storage.local.get(OVERLAY_ACTIVE_KEY);
  const activeTabs = stored[OVERLAY_ACTIVE_KEY] ?? {};
  if (isOn) {
    activeTabs[currentTabId] = true;
  } else {
    delete activeTabs[currentTabId];
  }
  await chrome.storage.local.set({ [OVERLAY_ACTIVE_KEY]: activeTabs });
}

overlayButton.addEventListener("click", async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab?.id) {
    setStatus("No active tab found.");
    return;
  }

  const nextState = !overlayButton.classList.contains("is-on");
  const func = nextState
    ? "startRetroOverlay"
    : "stopRetroOverlay";

  try {
    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      args: [chrome.runtime.getURL("overlayRuntime.js"), currentSettings, func],
      func: async (moduleUrl, settings, fnName) => {
        const runtime = await import(moduleUrl);
        await runtime[fnName](settings);
      },
    });

    setOverlayButtonState(nextState);
    await saveOverlayState(nextState);
    setStatus(nextState ? "Overlay on." : "Overlay off.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error));
  }
});

presetSelect.addEventListener("change", () => {
  if (presetSelect.value === CUSTOM_PRESET_KEY) {
    return;
  }

  currentSettings = normalizeSettings({
    ...applyPresetToSettings(presetSelect.value),
    audioPresetKey: currentSettings.audioPresetKey,
    matchTargetAspect: currentSettings.matchTargetAspect,
    scanlineBrightnessFade: currentSettings.scanlineBrightnessFade,
    closeUpNoiseStrength: currentSettings.closeUpNoiseStrength,
    overlayTargetCount: currentSettings.overlayTargetCount,
    isAudioFxEnabled: currentSettings.isAudioFxEnabled,
    lofiAmount: currentSettings.lofiAmount,
    radioToneAmount: currentSettings.radioToneAmount,
    bitCrushAmount: currentSettings.bitCrushAmount,
    sampleRateReductionAmount: currentSettings.sampleRateReductionAmount,
    bassAmount: currentSettings.bassAmount,
    midAmount: currentSettings.midAmount,
    trebleAmount: currentSettings.trebleAmount,
    stereoWidthAmount: currentSettings.stereoWidthAmount,
    smallSpeakerRoomAmount: currentSettings.smallSpeakerRoomAmount,
    wowFlutterAmount: currentSettings.wowFlutterAmount,
    isNoiseEnabled: currentSettings.isNoiseEnabled,
    noiseLevel: currentSettings.noiseLevel,
    vinylDustAmount: currentSettings.vinylDustAmount,
  });
  void persistSettings();
});

audioPresetSelect.addEventListener("change", () => {
  const presetKey = audioPresetSelect.value;
  if (presetKey === "custom") {
    updateSettings({ audioPresetKey: "custom" });
    return;
  }

  updateSettings({
    audioPresetKey: presetKey,
    ...AUDIO_PRESETS[presetKey],
  });
});

paletteModeSelect.addEventListener("change", () => {
  const paletteMode = paletteModeSelect.value;
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    paletteMode,
    colorLevels:
      paletteMode === "mono" || paletteMode === "free" || paletteMode === "neon"
        ? currentSettings.colorLevels
        : getDefaultColorLevelsForPalette(paletteMode),
  });
});

monoTintSelect.addEventListener("change", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    monoTint: monoTintSelect.value,
  });
});

targetWidthInput.addEventListener("input", () => {
  const targetWidth = Number(targetWidthInput.value);
  if (!currentSettings.matchTargetAspect) {
    updateSettings({
      presetKey: CUSTOM_PRESET_KEY,
      targetWidth,
    });
    return;
  }

  const aspectRatio = Math.max(currentSettings.targetWidth, 1) / Math.max(currentSettings.targetHeight, 1);
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    targetWidth,
    targetHeight: Math.max(1, Math.round(targetWidth / Math.max(aspectRatio, 0.0001))),
  });
});

targetHeightInput.addEventListener("input", () => {
  const targetHeight = Number(targetHeightInput.value);
  if (!currentSettings.matchTargetAspect) {
    updateSettings({
      presetKey: CUSTOM_PRESET_KEY,
      targetHeight,
    });
    return;
  }

  const aspectRatio = Math.max(currentSettings.targetWidth, 1) / Math.max(currentSettings.targetHeight, 1);
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    targetHeight,
    targetWidth: Math.max(1, Math.round(targetHeight * aspectRatio)),
  });
});

matchTargetAspectInput.addEventListener("change", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    matchTargetAspect: matchTargetAspectInput.checked,
  });
});

colorLevelsInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    colorLevels: Number(colorLevelsInput.value),
  });
});

ditherStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    ditherStrength: Number(ditherStrengthInput.value),
  });
});

curvatureInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    curvature: Number(curvatureInput.value),
  });
});

crtAspectInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    crtAspect: Number(crtAspectInput.value),
  });
});

scanlineStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    scanlineStrength: Number(scanlineStrengthInput.value),
  });
});

scanline2StrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    scanline2Strength: Number(scanline2StrengthInput.value),
  });
});

scanlineBrightnessFadeInput.addEventListener("input", () => {
  const scanlineBrightnessFade = Number(scanlineBrightnessFadeInput.value);
  scanlineBrightnessFadeValue.textContent = scanlineBrightnessFade.toFixed(2);
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    scanlineBrightnessFade,
  });
});

vignetteStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    vignetteStrength: Number(vignetteStrengthInput.value),
  });
});

glowStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    glowStrength: Number(glowStrengthInput.value),
  });
});

phosphorStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorStrength: Number(phosphorStrengthInput.value),
  });
});

spotMaskStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    spotMaskStrength: Number(spotMaskStrengthInput.value),
  });
});

phosphorDotInternalScaleInput.addEventListener("change", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorDotInternalScale: phosphorDotInternalScaleInput.checked,
  });
});

phosphorDotBrightCoreInput.addEventListener("change", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorDotBrightCore: phosphorDotBrightCoreInput.checked,
  });
});

phosphorDotFlatDiscInput.addEventListener("change", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorDotFlatDisc: phosphorDotFlatDiscInput.checked,
  });
});

phosphorDotNeighborBlendInput.addEventListener("change", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorDotNeighborBlend: phosphorDotNeighborBlendInput.checked,
  });
});

phosphorDotCellFillInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorDotCellFill: Number(phosphorDotCellFillInput.value),
  });
});

bulbRadiusInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    bulbRadius: Number(bulbRadiusInput.value),
  });
});

blackFloorInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    blackFloor: Number(blackFloorInput.value),
  });
});

phosphorDotLightBalanceInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    phosphorDotLightBalance: Number(phosphorDotLightBalanceInput.value),
  });
});

lumaAmountInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    lumaAmount: Number(lumaAmountInput.value),
  });
});

lumaLowInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    lumaLow: Number(lumaLowInput.value),
  });
});

lumaHighInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    lumaHigh: Number(lumaHighInput.value),
  });
});

lumaKneeInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    lumaKnee: Number(lumaKneeInput.value),
  });
});

saturationAmountInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    saturationAmount: Number(saturationAmountInput.value),
  });
});

saturationLowInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    saturationLow: Number(saturationLowInput.value),
  });
});

saturationHighInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    saturationHigh: Number(saturationHighInput.value),
  });
});

saturationKneeInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    saturationKnee: Number(saturationKneeInput.value),
  });
});

outputBrightnessInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    outputBrightness: Number(outputBrightnessInput.value),
  });
});

closeUpNoiseStrengthInput.addEventListener("input", () => {
  const closeUpNoiseStrength = Number(closeUpNoiseStrengthInput.value);
  closeUpNoiseStrengthValue.textContent = closeUpNoiseStrength.toFixed(2);
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    closeUpNoiseStrength,
  });
});

smoothStrengthInput.addEventListener("input", () => {
  const smoothStrength = Number(smoothStrengthInput.value);
  smoothStrengthValue.textContent = smoothStrength.toFixed(2);
  updateSettings({ presetKey: CUSTOM_PRESET_KEY, smoothStrength });
});

toonStepsInput.addEventListener("input", () => {
  const toonSteps = Number(toonStepsInput.value);
  toonStepsValue.textContent = toonSteps === 0 ? "off" : String(toonSteps);
  updateSettings({ presetKey: CUSTOM_PRESET_KEY, toonSteps });
});

edgeBoostInput.addEventListener("input", () => {
  const edgeBoost = Number(edgeBoostInput.value);
  edgeBoostValue.textContent = edgeBoost.toFixed(2);
  updateSettings({ presetKey: CUSTOM_PRESET_KEY, edgeBoost });
});

animeEdgeLowInput.addEventListener("input", () => {
  const animeEdgeLow = Number(animeEdgeLowInput.value);
  animeEdgeLowValue.textContent = animeEdgeLow.toFixed(2);
  updateSettings({ presetKey: CUSTOM_PRESET_KEY, animeEdgeLow });
});

animeEdgeHighInput.addEventListener("input", () => {
  const animeEdgeHigh = Number(animeEdgeHighInput.value);
  animeEdgeHighValue.textContent = animeEdgeHigh.toFixed(2);
  updateSettings({ presetKey: CUSTOM_PRESET_KEY, animeEdgeHigh });
});

overlayTargetCountInput.addEventListener("input", () => {
  updateSettings({
    overlayTargetCount: Number(overlayTargetCountInput.value),
  });
});

overlayVideoInput.addEventListener("change", () => {
  updateSettings({ overlayVideo: overlayVideoInput.checked });
});

overlayImageInput.addEventListener("change", () => {
  updateSettings({ overlayImage: overlayImageInput.checked });
});

showOverlayButtonsInput.addEventListener("change", () => {
  updateSettings({ showOverlayButtons: showOverlayButtonsInput.checked });
});

audioFxEnabledInput.addEventListener("change", () => {
  updateAudioSettings({ isAudioFxEnabled: audioFxEnabledInput.checked });
});

lofiAmountInput.addEventListener("input", () => {
  const lofiAmount = Number(lofiAmountInput.value);
  lofiAmountValue.textContent = lofiAmount.toFixed(2);
  updateAudioSettings({ lofiAmount });
});

radioToneAmountInput.addEventListener("input", () => {
  const radioToneAmount = Number(radioToneAmountInput.value);
  radioToneAmountValue.textContent = radioToneAmount.toFixed(2);
  updateAudioSettings({ radioToneAmount });
});

bitCrushAmountInput.addEventListener("input", () => {
  const bitCrushAmount = Number(bitCrushAmountInput.value);
  bitCrushAmountValue.textContent = bitCrushAmount.toFixed(2);
  updateAudioSettings({ bitCrushAmount });
});

sampleRateReductionAmountInput.addEventListener("input", () => {
  const sampleRateReductionAmount = Number(sampleRateReductionAmountInput.value);
  sampleRateReductionAmountValue.textContent = sampleRateReductionAmount.toFixed(2);
  updateAudioSettings({ sampleRateReductionAmount });
});

bassAmountInput.addEventListener("input", () => {
  const bassAmount = Number(bassAmountInput.value);
  bassAmountValue.textContent = formatEqAmount(bassAmount);
  updateAudioSettings({ bassAmount });
});

midAmountInput.addEventListener("input", () => {
  const midAmount = Number(midAmountInput.value);
  midAmountValue.textContent = formatEqAmount(midAmount);
  updateAudioSettings({ midAmount });
});

trebleAmountInput.addEventListener("input", () => {
  const trebleAmount = Number(trebleAmountInput.value);
  trebleAmountValue.textContent = formatEqAmount(trebleAmount);
  updateAudioSettings({ trebleAmount });
});

stereoWidthAmountInput.addEventListener("input", () => {
  const stereoWidthAmount = Number(stereoWidthAmountInput.value);
  stereoWidthAmountValue.textContent = formatStereoWidthAmount(stereoWidthAmount);
  updateAudioSettings({ stereoWidthAmount });
});

smallSpeakerRoomAmountInput.addEventListener("input", () => {
  const smallSpeakerRoomAmount = Number(smallSpeakerRoomAmountInput.value);
  smallSpeakerRoomAmountValue.textContent = smallSpeakerRoomAmount.toFixed(2);
  updateAudioSettings({ smallSpeakerRoomAmount });
});

wowFlutterAmountInput.addEventListener("input", () => {
  const wowFlutterAmount = Number(wowFlutterAmountInput.value);
  wowFlutterAmountValue.textContent = wowFlutterAmount.toFixed(2);
  updateAudioSettings({ wowFlutterAmount });
});

noiseEnabledInput.addEventListener("change", () => {
  updateAudioSettings({ isNoiseEnabled: noiseEnabledInput.checked });
});

noiseLevelInput.addEventListener("input", () => {
  const noiseLevel = Number(noiseLevelInput.value) / 100;
  noiseLevelValue.textContent = `${(noiseLevel * 100).toFixed(2)}%`;
  updateAudioSettings({ noiseLevel });
});

vinylDustAmountInput.addEventListener("input", () => {
  const vinylDustAmount = Number(vinylDustAmountInput.value);
  vinylDustAmountValue.textContent = `${Math.round(vinylDustAmount * 100)}%`;
  updateAudioSettings({ vinylDustAmount });
});

noiseReductionAmountInput?.addEventListener("input", () => {
  const noiseReductionAmount = Number(noiseReductionAmountInput.value);
  noiseReductionAmountValue.textContent = `${Math.round(noiseReductionAmount * 100)}%`;
  updateAudioSettings({ noiseReductionAmount });
});

delayAmountInput?.addEventListener("input", () => {
  const delayAmount = Number(delayAmountInput.value);
  delayAmountValue.textContent = delayAmount.toFixed(2);
  updateAudioSettings({ delayAmount });
});

reverbAmountInput?.addEventListener("input", () => {
  const reverbAmount = Number(reverbAmountInput.value);
  reverbAmountValue.textContent = reverbAmount.toFixed(2);
  updateAudioSettings({ reverbAmount });
});

chorusAmountInput?.addEventListener("input", () => {
  const chorusAmount = Number(chorusAmountInput.value);
  chorusAmountValue.textContent = chorusAmount.toFixed(2);
  updateAudioSettings({ chorusAmount });
});

tapeSaturationAmountInput?.addEventListener("input", () => {
  const tapeSaturationAmount = Number(tapeSaturationAmountInput.value);
  tapeSaturationAmountValue.textContent = tapeSaturationAmount.toFixed(2);
  updateAudioSettings({ tapeSaturationAmount });
});

compressorAmountInput?.addEventListener("input", () => {
  const compressorAmount = Number(compressorAmountInput.value);
  compressorAmountValue.textContent = compressorAmount.toFixed(2);
  updateAudioSettings({ compressorAmount });
});

fxOutputTrimAmountInput?.addEventListener("input", () => {
  const fxOutputTrimAmount = Number(fxOutputTrimAmountInput.value);
  fxOutputTrimAmountValue.textContent = fxOutputTrimAmount.toFixed(2);
  updateAudioSettings({ fxOutputTrimAmount });
});

async function init() {
  for (const [presetKey, preset] of Object.entries(PRESETS)) {
    const option = document.createElement("option");
    option.value = presetKey;
    option.textContent = preset.label;
    presetSelect.append(option);
  }
  const customOption = document.createElement("option");
  customOption.value = CUSTOM_PRESET_KEY;
  customOption.textContent = "Custom";
  presetSelect.append(customOption);

  for (const optionData of AUDIO_PRESET_OPTIONS) {
    const option = document.createElement("option");
    option.value = optionData.key;
    option.textContent = optionData.label;
    audioPresetSelect.append(option);
  }

  for (const optionData of PALETTE_OPTIONS) {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    paletteModeSelect.append(option);
  }

  for (const optionData of MONO_TINT_OPTIONS) {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    monoTintSelect.append(option);
  }

  const stored = await chrome.storage.local.get([SETTINGS_STORAGE_KEY, ALARM_STORAGE_KEY]);
  currentSettings = normalizeSettings(stored[SETTINGS_STORAGE_KEY]);
  renderSettings(currentSettings);
  await persistSettings();
  await loadOverlayState();
  renderAlarmState(stored[ALARM_STORAGE_KEY]);
}

function renderSettings(settings) {
  presetSelect.value = settings.presetKey;
  audioPresetSelect.value = settings.audioPresetKey ?? "custom";
  paletteModeSelect.value = settings.paletteMode;
  monoTintSelect.value = settings.monoTint;
  monoTintSelect.disabled =
    settings.paletteMode !== "mono" && settings.paletteMode !== "neon";
  targetWidthInput.value = String(settings.targetWidth);
  targetWidthValue.textContent = `${settings.targetWidth}px`;
  targetHeightInput.value = String(settings.targetHeight);
  targetHeightValue.textContent = `${settings.targetHeight}px`;
  matchTargetAspectInput.checked = settings.matchTargetAspect ?? false;
  colorLevelsInput.value = String(settings.colorLevels);
  colorLevelsValue.textContent = String(settings.colorLevels);
  colorLevelsInput.disabled =
    settings.paletteMode !== "mono" &&
    settings.paletteMode !== "free" &&
    settings.paletteMode !== "neon";
  colorLevelsInput.min = String(COLOR_LEVEL_LIMITS.min);
  colorLevelsInput.max = String(
    settings.paletteMode === "mono" ||
      settings.paletteMode === "free" ||
      settings.paletteMode === "neon"
      ? COLOR_LEVEL_LIMITS.max
      : getDefaultColorLevelsForPalette(settings.paletteMode),
  );
  ditherStrengthInput.value = String(settings.ditherStrength);
  ditherStrengthValue.textContent = settings.ditherStrength.toFixed(2);
  curvatureInput.value = String(settings.curvature);
  curvatureValue.textContent = settings.curvature.toFixed(2);
  crtAspectInput.value = String(settings.crtAspect);
  crtAspectValue.textContent = settings.crtAspect.toFixed(3);
  scanlineStrengthInput.value = String(settings.scanlineStrength);
  scanlineStrengthValue.textContent = settings.scanlineStrength.toFixed(2);
  scanline2StrengthInput.value = String(settings.scanline2Strength);
  scanline2StrengthValue.textContent = settings.scanline2Strength.toFixed(3);
  scanlineBrightnessFadeInput.value = String(settings.scanlineBrightnessFade);
  scanlineBrightnessFadeValue.textContent = settings.scanlineBrightnessFade.toFixed(2);
  vignetteStrengthInput.value = String(settings.vignetteStrength);
  vignetteStrengthValue.textContent = settings.vignetteStrength.toFixed(2);
  glowStrengthInput.value = String(settings.glowStrength);
  glowStrengthValue.textContent = settings.glowStrength.toFixed(2);
  phosphorStrengthInput.value = String(settings.phosphorStrength);
  phosphorStrengthValue.textContent = settings.phosphorStrength.toFixed(2);
  spotMaskStrengthInput.value = String(settings.spotMaskStrength);
  spotMaskStrengthValue.textContent = settings.spotMaskStrength.toFixed(2);
  phosphorDotInternalScaleInput.checked = settings.phosphorDotInternalScale;
  phosphorDotBrightCoreInput.checked = settings.phosphorDotBrightCore;
  phosphorDotFlatDiscInput.checked = settings.phosphorDotFlatDisc;
  phosphorDotNeighborBlendInput.checked = settings.phosphorDotNeighborBlend;
  phosphorDotCellFillInput.value = String(settings.phosphorDotCellFill);
  phosphorDotCellFillValue.textContent = settings.phosphorDotCellFill.toFixed(3);
  bulbRadiusInput.value = String(settings.bulbRadius);
  bulbRadiusValue.textContent = settings.bulbRadius.toFixed(3);
  blackFloorInput.value = String(settings.blackFloor);
  blackFloorValue.textContent = settings.blackFloor.toFixed(3);
  phosphorDotLightBalanceInput.value = String(settings.phosphorDotLightBalance ?? 1);
  phosphorDotLightBalanceValue.textContent = (settings.phosphorDotLightBalance ?? 1).toFixed(2);
  lumaAmountInput.value = String(settings.lumaAmount ?? 1);
  lumaAmountValue.textContent = (settings.lumaAmount ?? 1).toFixed(2);
  lumaLowInput.value = String(settings.lumaLow ?? 0);
  lumaLowValue.textContent = (settings.lumaLow ?? 0).toFixed(2);
  lumaHighInput.value = String(settings.lumaHigh ?? 1);
  lumaHighValue.textContent = (settings.lumaHigh ?? 1).toFixed(2);
  lumaKneeInput.value = String(settings.lumaKnee ?? 0.2);
  lumaKneeValue.textContent = (settings.lumaKnee ?? 0.2).toFixed(2);
  saturationAmountInput.value = String(settings.saturationAmount ?? 1);
  saturationAmountValue.textContent = (settings.saturationAmount ?? 1).toFixed(2);
  saturationLowInput.value = String(settings.saturationLow ?? 0);
  saturationLowValue.textContent = (settings.saturationLow ?? 0).toFixed(2);
  saturationHighInput.value = String(settings.saturationHigh ?? 1);
  saturationHighValue.textContent = (settings.saturationHigh ?? 1).toFixed(2);
  saturationKneeInput.value = String(settings.saturationKnee ?? 0.2);
  saturationKneeValue.textContent = (settings.saturationKnee ?? 0.2).toFixed(2);
  outputBrightnessInput.value = String(settings.outputBrightness ?? 1);
  outputBrightnessValue.textContent = (settings.outputBrightness ?? 1).toFixed(2);
  closeUpNoiseStrengthInput.value = String(settings.closeUpNoiseStrength);
  closeUpNoiseStrengthValue.textContent = settings.closeUpNoiseStrength.toFixed(2);
  smoothStrengthInput.value = String(settings.smoothStrength ?? 0);
  smoothStrengthValue.textContent = (settings.smoothStrength ?? 0).toFixed(2);
  toonStepsInput.value = String(settings.toonSteps ?? 0);
  toonStepsValue.textContent = (settings.toonSteps ?? 0) === 0 ? "off" : String(settings.toonSteps);
  edgeBoostInput.value = String(settings.edgeBoost ?? 0);
  edgeBoostValue.textContent = (settings.edgeBoost ?? 0).toFixed(2);
  animeEdgeLowInput.value = String(settings.animeEdgeLow ?? 0.08);
  animeEdgeLowValue.textContent = (settings.animeEdgeLow ?? 0.08).toFixed(2);
  animeEdgeHighInput.value = String(settings.animeEdgeHigh ?? 0.55);
  animeEdgeHighValue.textContent = (settings.animeEdgeHigh ?? 0.55).toFixed(2);
  overlayTargetCountInput.min = String(OVERLAY_TARGET_LIMITS.min);
  overlayTargetCountInput.max = String(OVERLAY_TARGET_LIMITS.max);
  overlayTargetCountInput.value = String(settings.overlayTargetCount);
  overlayTargetCountValue.textContent = `${settings.overlayTargetCount} target${settings.overlayTargetCount === 1 ? "" : "s"}`;
  overlayVideoInput.checked = settings.overlayVideo;
  overlayImageInput.checked = settings.overlayImage;
  showOverlayButtonsInput.checked = settings.showOverlayButtons;
  audioFxEnabledInput.checked = settings.isAudioFxEnabled;
  lofiAmountInput.value = String(settings.lofiAmount);
  lofiAmountValue.textContent = settings.lofiAmount.toFixed(2);
  radioToneAmountInput.value = String(settings.radioToneAmount);
  radioToneAmountValue.textContent = settings.radioToneAmount.toFixed(2);
  bitCrushAmountInput.value = String(settings.bitCrushAmount);
  bitCrushAmountValue.textContent = settings.bitCrushAmount.toFixed(2);
  sampleRateReductionAmountInput.value = String(settings.sampleRateReductionAmount);
  sampleRateReductionAmountValue.textContent = settings.sampleRateReductionAmount.toFixed(2);
  bassAmountInput.value = String(settings.bassAmount);
  bassAmountInput.min = "-1.5";
  bassAmountInput.max = "1.5";
  bassAmountValue.textContent = formatEqAmount(settings.bassAmount);
  midAmountInput.value = String(settings.midAmount);
  midAmountInput.min = "-1.5";
  midAmountInput.max = "1.5";
  midAmountValue.textContent = formatEqAmount(settings.midAmount);
  trebleAmountInput.value = String(settings.trebleAmount);
  trebleAmountInput.min = "-1.5";
  trebleAmountInput.max = "1.5";
  trebleAmountValue.textContent = formatEqAmount(settings.trebleAmount);
  stereoWidthAmountInput.value = String(settings.stereoWidthAmount);
  stereoWidthAmountValue.textContent = formatStereoWidthAmount(settings.stereoWidthAmount);
  smallSpeakerRoomAmountInput.value = String(settings.smallSpeakerRoomAmount);
  smallSpeakerRoomAmountValue.textContent = settings.smallSpeakerRoomAmount.toFixed(2);
  wowFlutterAmountInput.value = String(settings.wowFlutterAmount);
  wowFlutterAmountValue.textContent = settings.wowFlutterAmount.toFixed(2);
  noiseEnabledInput.checked = settings.isNoiseEnabled;
  noiseLevelInput.value = String(settings.noiseLevel * 100);
  noiseLevelValue.textContent = `${(settings.noiseLevel * 100).toFixed(2)}%`;
  vinylDustAmountInput.value = String(settings.vinylDustAmount ?? 0);
  vinylDustAmountValue.textContent = `${Math.round((settings.vinylDustAmount ?? 0) * 100)}%`;
  if (noiseReductionAmountInput) {
    noiseReductionAmountInput.value = String(settings.noiseReductionAmount ?? 0);
    noiseReductionAmountValue.textContent = `${Math.round((settings.noiseReductionAmount ?? 0) * 100)}%`;
  }
  if (delayAmountInput) {
    delayAmountInput.value = String(settings.delayAmount ?? 0);
    delayAmountValue.textContent = (settings.delayAmount ?? 0).toFixed(2);
  }
  if (reverbAmountInput) {
    reverbAmountInput.value = String(settings.reverbAmount ?? 0);
    reverbAmountValue.textContent = (settings.reverbAmount ?? 0).toFixed(2);
  }
  if (chorusAmountInput) {
    chorusAmountInput.value = String(settings.chorusAmount ?? 0);
    chorusAmountValue.textContent = (settings.chorusAmount ?? 0).toFixed(2);
  }
  if (tapeSaturationAmountInput) {
    tapeSaturationAmountInput.value = String(settings.tapeSaturationAmount ?? 0);
    tapeSaturationAmountValue.textContent = (settings.tapeSaturationAmount ?? 0).toFixed(2);
  }
  if (compressorAmountInput) {
    compressorAmountInput.value = String(settings.compressorAmount ?? 0);
    compressorAmountValue.textContent = (settings.compressorAmount ?? 0).toFixed(2);
  }
  if (fxOutputTrimAmountInput) {
    fxOutputTrimAmountInput.value = String(settings.fxOutputTrimAmount ?? 0.66);
    fxOutputTrimAmountValue.textContent = (settings.fxOutputTrimAmount ?? 0.66).toFixed(2);
  }
}

async function updateSettings(patch) {
  currentSettings = normalizeSettings({
    ...currentSettings,
    ...patch,
  });
  renderSettings(currentSettings);
  await persistSettings();
}

async function persistSettings() {
  renderSettings(currentSettings);
  await chrome.storage.local.set({ [SETTINGS_STORAGE_KEY]: currentSettings });
}

function updateAudioSettings(patch) {
  return updateSettings({
    audioPresetKey: "custom",
    ...patch,
  });
}

resetButton.addEventListener("click", async () => {
  if (!confirm("Reset all settings to defaults?")) return;
  currentSettings = normalizeSettings({ presetKey: DEFAULT_PRESET_KEY });
  renderSettings(currentSettings);
  await persistSettings();
  setStatus("Settings reset to defaults.");
});

function setStatus(message) {
  statusText.textContent = message;
}

if (chrome.storage?.onChanged) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[ALARM_STORAGE_KEY]) {
      renderAlarmState(changes[ALARM_STORAGE_KEY].newValue);
    }
  });
}

function formatEqAmount(value) {
  const amount = value * 15;
  return `${amount >= 0 ? "+" : ""}${amount.toFixed(1)} dB`;
}

function formatStereoWidthAmount(value) {
  if (value < 0) {
    return `Mono ${Math.round(Math.abs(value) * 100)}%`;
  }
  if (value > 0) {
    return `Wide ${Math.round(value * 100)}%`;
  }
  return "Original";
}
