import {
  applyPresetToSettings,
  COLOR_LEVEL_LIMITS,
  CUSTOM_PRESET_KEY,
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
const paletteModeSelect = document.getElementById("paletteMode");
const monoTintSelect = document.getElementById("monoTint");
const targetWidthInput = document.getElementById("targetWidth");
const targetWidthValue = document.getElementById("targetWidthValue");
const targetHeightInput = document.getElementById("targetHeight");
const targetHeightValue = document.getElementById("targetHeightValue");
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
const glowStrengthInput = document.getElementById("glowStrength");
const glowStrengthValue = document.getElementById("glowStrengthValue");
const closeUpNoiseStrengthInput = document.getElementById("closeUpNoiseStrength");
const closeUpNoiseStrengthValue = document.getElementById("closeUpNoiseStrengthValue");
const overlayTargetCountInput = document.getElementById("overlayTargetCount");
const overlayTargetCountValue = document.getElementById("overlayTargetCountValue");
const audioFxEnabledInput = document.getElementById("audioFxEnabled");
const lofiAmountInput = document.getElementById("lofiAmount");
const lofiAmountValue = document.getElementById("lofiAmountValue");
const noiseEnabledInput = document.getElementById("noiseEnabled");
const noiseLevelInput = document.getElementById("noiseLevel");
const noiseLevelValue = document.getElementById("noiseLevelValue");
const statusText = document.getElementById("statusText");

let currentSettings = { ...DEFAULT_SETTINGS };

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

overlayButton.addEventListener("click", async () => {
  setStatus("Starting experimental video overlay on the active tab...");

  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab?.id) {
    setStatus("No active tab found.");
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      args: [chrome.runtime.getURL("overlayRuntime.js"), currentSettings],
      func: async (moduleUrl, settings) => {
        const runtime = await import(moduleUrl);
        await runtime.toggleRetroOverlay(settings);
      },
    });

    setStatus("Experimental overlay toggled on the current page.");
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
    closeUpNoiseStrength: currentSettings.closeUpNoiseStrength,
    overlayTargetCount: currentSettings.overlayTargetCount,
  });
  void persistSettings();
});

paletteModeSelect.addEventListener("change", () => {
  const paletteMode = paletteModeSelect.value;
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    paletteMode,
    colorLevels:
      paletteMode === "mono" || paletteMode === "free"
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
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    targetWidth: Number(targetWidthInput.value),
  });
});

targetHeightInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    targetHeight: Number(targetHeightInput.value),
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

glowStrengthInput.addEventListener("input", () => {
  updateSettings({
    presetKey: CUSTOM_PRESET_KEY,
    glowStrength: Number(glowStrengthInput.value),
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

overlayTargetCountInput.addEventListener("input", () => {
  updateSettings({
    overlayTargetCount: Number(overlayTargetCountInput.value),
  });
});

audioFxEnabledInput.addEventListener("change", () => {
  updateSettings({ isAudioFxEnabled: audioFxEnabledInput.checked });
});

lofiAmountInput.addEventListener("input", () => {
  const lofiAmount = Number(lofiAmountInput.value);
  lofiAmountValue.textContent = lofiAmount.toFixed(2);
  updateSettings({ lofiAmount });
});

noiseEnabledInput.addEventListener("change", () => {
  updateSettings({ isNoiseEnabled: noiseEnabledInput.checked });
});

noiseLevelInput.addEventListener("input", () => {
  const noiseLevel = Number(noiseLevelInput.value);
  noiseLevelValue.textContent = noiseLevel.toFixed(3);
  updateSettings({ noiseLevel });
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

  const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY);
  currentSettings = normalizeSettings(stored[SETTINGS_STORAGE_KEY]);
  renderSettings(currentSettings);
  await persistSettings();
}

function renderSettings(settings) {
  presetSelect.value = settings.presetKey;
  paletteModeSelect.value = settings.paletteMode;
  monoTintSelect.value = settings.monoTint;
  monoTintSelect.disabled = settings.paletteMode !== "mono";
  targetWidthInput.value = String(settings.targetWidth);
  targetWidthValue.textContent = `${settings.targetWidth}px`;
  targetHeightInput.value = String(settings.targetHeight);
  targetHeightValue.textContent = `${settings.targetHeight}px`;
  colorLevelsInput.value = String(settings.colorLevels);
  colorLevelsValue.textContent = String(settings.colorLevels);
  colorLevelsInput.disabled = settings.paletteMode !== "mono" && settings.paletteMode !== "free";
  colorLevelsInput.min = String(COLOR_LEVEL_LIMITS.min);
  colorLevelsInput.max = String(
    settings.paletteMode === "mono" || settings.paletteMode === "free"
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
  glowStrengthInput.value = String(settings.glowStrength);
  glowStrengthValue.textContent = settings.glowStrength.toFixed(2);
  closeUpNoiseStrengthInput.value = String(settings.closeUpNoiseStrength);
  closeUpNoiseStrengthValue.textContent = settings.closeUpNoiseStrength.toFixed(2);
  overlayTargetCountInput.min = String(OVERLAY_TARGET_LIMITS.min);
  overlayTargetCountInput.max = String(OVERLAY_TARGET_LIMITS.max);
  overlayTargetCountInput.value = String(settings.overlayTargetCount);
  overlayTargetCountValue.textContent = `${settings.overlayTargetCount} target${settings.overlayTargetCount === 1 ? "" : "s"}`;
  audioFxEnabledInput.checked = settings.isAudioFxEnabled;
  lofiAmountInput.value = String(settings.lofiAmount);
  lofiAmountValue.textContent = settings.lofiAmount.toFixed(2);
  noiseEnabledInput.checked = settings.isNoiseEnabled;
  noiseLevelInput.value = String(settings.noiseLevel);
  noiseLevelValue.textContent = settings.noiseLevel.toFixed(3);
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

function setStatus(message) {
  statusText.textContent = message;
}
