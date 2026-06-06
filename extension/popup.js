import {
  DEFAULT_SETTINGS,
  PRESETS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
} from "./shared/settings.js";

const captureButton = document.getElementById("captureButton");
const viewerButton = document.getElementById("viewerButton");
const presetSelect = document.getElementById("presetSelect");
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

presetSelect.addEventListener("change", () => {
  updateSettings({ presetKey: presetSelect.value });
});

audioFxEnabledInput.addEventListener("change", () => {
  updateSettings({ isAudioFxEnabled: audioFxEnabledInput.checked });
});

lofiAmountInput.addEventListener("input", () => {
  const lofiAmount = Number(lofiAmountInput.value);
  lofiAmountValue.textContent = `${Math.round(lofiAmount * 100)}%`;
  updateSettings({ lofiAmount });
});

noiseEnabledInput.addEventListener("change", () => {
  updateSettings({ isNoiseEnabled: noiseEnabledInput.checked });
});

noiseLevelInput.addEventListener("input", () => {
  const noiseLevel = Number(noiseLevelInput.value);
  noiseLevelValue.textContent = `${Math.round(noiseLevel * 100)}%`;
  updateSettings({ noiseLevel });
});

async function init() {
  for (const [presetKey, preset] of Object.entries(PRESETS)) {
    const option = document.createElement("option");
    option.value = presetKey;
    option.textContent = preset.label;
    presetSelect.append(option);
  }

  const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY);
  currentSettings = normalizeSettings(stored[SETTINGS_STORAGE_KEY]);
  renderSettings(currentSettings);
  await chrome.storage.local.set({ [SETTINGS_STORAGE_KEY]: currentSettings });
}

function renderSettings(settings) {
  presetSelect.value = settings.presetKey;
  audioFxEnabledInput.checked = settings.isAudioFxEnabled;
  lofiAmountInput.value = String(settings.lofiAmount);
  lofiAmountValue.textContent = `${Math.round(settings.lofiAmount * 100)}%`;
  noiseEnabledInput.checked = settings.isNoiseEnabled;
  noiseLevelInput.value = String(settings.noiseLevel);
  noiseLevelValue.textContent = `${Math.round(settings.noiseLevel * 100)}%`;
}

async function updateSettings(patch) {
  currentSettings = normalizeSettings({
    ...currentSettings,
    ...patch,
  });
  renderSettings(currentSettings);
  await chrome.storage.local.set({ [SETTINGS_STORAGE_KEY]: currentSettings });
}

function setStatus(message) {
  statusText.textContent = message;
}
