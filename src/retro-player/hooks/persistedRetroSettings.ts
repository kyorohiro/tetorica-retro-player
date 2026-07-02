import type { MonoTintMode, PaletteMode } from "../retro/config";

const STORAGE_KEY = "tetorica-retro-player.settings";
const STORAGE_VERSION = 1;

export type PersistedRetroFilterSettings = {
  targetWidth: number;
  targetHeight: number;
  matchTargetAspect: boolean;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  curvature: number;
  scanlineStrength: number;
  scanline2Strength: number;
  scanlineBrightnessFade: number;
  vignetteStrength: number;
  glowStrength: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  lumaAmount: number;
  lumaLow: number;
  lumaHigh: number;
  lumaKnee: number;
  saturationAmount: number;
  saturationLow: number;
  saturationHigh: number;
  saturationKnee: number;
  phosphorDotLightBalance: number;
  phosphorDotInternalScale: boolean;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  closeUpNoiseStrength: number;
  monoTint: MonoTintMode;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  focusStrength: number;
  focusWidth: number;
  focusHeight: number;
  focusCenterX: number;
  focusCenterY: number;
  focusTrackCursor: boolean;
  isFilterEnabled: boolean;
};

export type PersistedRetroAudioSettings = {
  audioOptimizationMode: "auto" | "chrome" | "safari";
  isMuted: boolean;
  volume: number;
  playbackRate: number;
  isLooping: boolean;
  isAudioFxEnabled: boolean;
  lofiAmount: number;
  radioToneAmount: number;
  bitCrushAmount: number;
  bitCrushNoiseAmount: number;
  sampleRateReductionAmount: number;
  noiseReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
  wowFlutterAmount: number;
  isNoiseEnabled: boolean;
  noiseLevel: number;
  vinylDustAmount: number;
  noiseWarmthAmount: number;
  noiseAirAmount: number;
  noisePresenceAmount: number;
  delayAmount: number;
  reverbAmount: number;
  chorusAmount: number;
  tapeSaturationAmount: number;
  compressorAmount: number;
  fxOutputTrimAmount: number;
  inputTrimAmount: number;
};

export type PersistedRetroUiSettings = {
  isPreviewMaximized: boolean;
  isHighResolution: boolean;
  renderResolutionPreset?: number;
  brightness: number;
  flipH: boolean;
  flipV: boolean;
};

type PersistedRetroSettings = {
  version: number;
  filter?: PersistedRetroFilterSettings;
  audio?: PersistedRetroAudioSettings;
  ui?: PersistedRetroUiSettings;
  preferredAudioInputDeviceId?: string;
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

export const getPreferredAudioInputDeviceId = (): string | null =>
  readSettings()?.preferredAudioInputDeviceId ?? null;

export const savePersistedRetroFilterSettings = (
  filter: PersistedRetroFilterSettings,
) => {
  const current = readSettings();

  writeSettings({
    version: STORAGE_VERSION,
    audio: current?.audio,
    filter,
    ui: current?.ui,
    preferredAudioInputDeviceId: current?.preferredAudioInputDeviceId,
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
    preferredAudioInputDeviceId: current?.preferredAudioInputDeviceId,
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
    preferredAudioInputDeviceId: current?.preferredAudioInputDeviceId,
  });
};

export const setPreferredAudioInputDeviceId = (deviceId: string | null) => {
  const current = readSettings();

  writeSettings({
    version: STORAGE_VERSION,
    audio: current?.audio,
    filter: current?.filter,
    ui: current?.ui,
    preferredAudioInputDeviceId: deviceId ?? undefined,
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

const NATIVE_MODE_KEY = "tetorica-retro-player.nativeMode";
const FFMPEG_USE_QSV_KEY = "tetorica-retro-player.ffmpegUseQsv";
const FFMPEG_MAX_CONCURRENT_HLS_SESSIONS_KEY = "tetorica-retro-player.ffmpegMaxConcurrentHlsSessions";

export const getNativePlaybackMode = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(NATIVE_MODE_KEY) === "true";
  } catch {
    return false;
  }
};

export const setNativePlaybackMode = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    if (enabled) {
      window.localStorage.setItem(NATIVE_MODE_KEY, "true");
    } else {
      window.localStorage.removeItem(NATIVE_MODE_KEY);
    }
  } catch {}
};

export const getFfmpegUseQsv = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(FFMPEG_USE_QSV_KEY) === "true";
  } catch {
    return false;
  }
};

export const setFfmpegUseQsv = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    if (enabled) {
      window.localStorage.setItem(FFMPEG_USE_QSV_KEY, "true");
    } else {
      window.localStorage.removeItem(FFMPEG_USE_QSV_KEY);
    }
  } catch {}
};

export const getFfmpegMaxConcurrentHlsSessions = (): number => {
  if (typeof window === "undefined") return 2;
  try {
    const raw = window.localStorage.getItem(FFMPEG_MAX_CONCURRENT_HLS_SESSIONS_KEY);
    const parsed = raw ? Number.parseInt(raw, 10) : 2;
    if (!Number.isFinite(parsed)) return 2;
    return Math.min(8, Math.max(1, parsed));
  } catch {
    return 2;
  }
};

export const setFfmpegMaxConcurrentHlsSessions = (limit: number): void => {
  if (typeof window === "undefined") return;
  try {
    const normalized = Math.min(8, Math.max(1, Math.round(limit)));
    window.localStorage.setItem(
      FFMPEG_MAX_CONCURRENT_HLS_SESSIONS_KEY,
      String(normalized),
    );
  } catch {}
};
