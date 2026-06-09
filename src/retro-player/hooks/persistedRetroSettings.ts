import type { MonoTintMode, PaletteMode } from "../retro/config";

const STORAGE_KEY = "tetorica-retro-player.settings";
const STORAGE_VERSION = 1;

export type PersistedRetroFilterSettings = {
  targetWidth: number;
  targetHeight: number;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  curvature: number;
  scanlineStrength: number;
  scanline2Strength: number;
  scanlineBrightnessFade: number;
  vignetteStrength: number;
  glowStrength: number;
  phosphorStrength: number;
  closeUpNoiseStrength: number;
  monoTint: MonoTintMode;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  isFilterEnabled: boolean;
};

export type PersistedRetroAudioSettings = {
  isMuted: boolean;
  volume: number;
  playbackRate: number;
  isLooping: boolean;
  isAudioFxEnabled: boolean;
  lofiAmount: number;
  wowFlutterAmount: number;
  isNoiseEnabled: boolean;
  noiseLevel: number;
};

export type PersistedRetroUiSettings = {
  isPreviewMaximized: boolean;
  isHighResolution: boolean;
};

type PersistedRetroSettings = {
  version: number;
  filter?: PersistedRetroFilterSettings;
  audio?: PersistedRetroAudioSettings;
  ui?: PersistedRetroUiSettings;
};

const readSettings = (): PersistedRetroSettings | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedRetroSettings;
    if (parsed.version !== STORAGE_VERSION) return null;

    return parsed;
  } catch {
    return null;
  }
};

const writeSettings = (settings: PersistedRetroSettings) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors and keep runtime behavior.
  }
};

export const loadPersistedRetroSettings = () => readSettings();

export const savePersistedRetroFilterSettings = (
  filter: PersistedRetroFilterSettings,
) => {
  const current = readSettings();

  writeSettings({
    version: STORAGE_VERSION,
    audio: current?.audio,
    filter,
    ui: current?.ui,
  });
};

export const savePersistedRetroAudioSettings = (
  audio: PersistedRetroAudioSettings,
) => {
  const current = readSettings();

  writeSettings({
    version: STORAGE_VERSION,
    audio,
    filter: current?.filter,
    ui: current?.ui,
  });
};

export const savePersistedRetroUiSettings = (
  ui: PersistedRetroUiSettings,
) => {
  const current = readSettings();

  writeSettings({
    version: STORAGE_VERSION,
    audio: current?.audio,
    filter: current?.filter,
    ui,
  });
};

export const clearPersistedRetroSettings = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors and keep runtime behavior.
  }
};
