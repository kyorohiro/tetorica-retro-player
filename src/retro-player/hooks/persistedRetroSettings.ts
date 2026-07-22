import {
  normalizePhosphorDotShape,
  type LegacyPhosphorDotShape,
  type MonoTintMode,
  type PaletteMode,
  type PhosphorDotShape,
  type TargetSamplingMode,
} from "../retro/config";
import { isWindowsRuntime } from "../platform/runtime";

const STORAGE_KEY = "tetorica-retro-player.settings";
const RECENT_LAUNCH_STORAGE_KEY = "tetorica-retro-player.recentLaunch";
const STORAGE_VERSION = 1;

export type PersistedRetroFilterSettings = {
  autoTargetSize: boolean;
  samplingMode: TargetSamplingMode;
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
  horizontalSharpness: number;
  rgbConvergenceOffset: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  outputBrightness: number;
  basicContrast: number;
  basicSaturation: number;
  phosphorDotLightBalance: number;
  phosphorDotShape: PhosphorDotShape;
  phosphorDotInternalScale: 1 | 2 | 3;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  phosphorDotGrainStrength: number;
  phosphorDotGlowColorStrength: number;
  beamDarkCutoff: number;
  beamHorizontalSpread: number;
  beamStripeStrength: number;
  beamWhiteBloom: number;
  signalInstabilityEnabled: boolean;
  signalInstabilityStrength: number;
  signalInstabilityFrequency: number;
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
  recordingContainer: "auto" | "webm" | "mp4";
  nativeAudioSuppressionOverride?: boolean | null;
  preferNativeHlsOverride?: boolean | null;
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
  maximizePerformanceMode?: "auto" | "on" | "off";
  brightness: number;
  flipH: boolean;
  flipV: boolean;
};

export type PersistedRecentLaunchItem = {
  id: string;
  type: "playlist" | "folder" | "file-list";
  label: string;
  paths: string[];
  startIndex?: number;
  pinned: boolean;
  updatedAt: number;
};

export type PersistedRecentLaunchSettings = {
  items: PersistedRecentLaunchItem[];
  bootItemId?: string | null;
};

type PersistedRetroSettings = {
  version: number;
  filter?: Omit<PersistedRetroFilterSettings, "phosphorDotShape"> & {
    phosphorDotShape?: LegacyPhosphorDotShape;
  };
  audio?: PersistedRetroAudioSettings;
  ui?: PersistedRetroUiSettings;
  preferredAudioInputDeviceId?: string;
  recentLaunch?: PersistedRecentLaunchSettings;
};

type NormalizedPersistedRetroSettings = Omit<PersistedRetroSettings, "filter"> & {
  filter?: PersistedRetroFilterSettings;
};

const normalizePersistedRetroSettings = (
  settings: PersistedRetroSettings,
): NormalizedPersistedRetroSettings => {
  const audio = settings.audio;
  const filter = settings.filter;
  const normalizedShape = normalizePhosphorDotShape(filter?.phosphorDotShape);

  return {
    ...settings,
    filter: filter
      ? {
        ...filter,
        phosphorDotShape: normalizedShape,
        samplingMode:
          filter.samplingMode === "average"
            ? "average_fast_8"
            : (filter.samplingMode ?? "nearest"),
      }
      : filter,
    audio: audio
      ? {
        ...audio,
        // Playback Profile no longer exposes Safari/Chrome presets directly.
        // Migrate old persisted values to auto so existing users do not keep
        // a stale silent-path policy after upgrading.
        audioOptimizationMode: audio.audioOptimizationMode === "auto" ? "auto" : "auto",
      }
      : audio,
    ui: settings.ui
      ? {
        ...settings.ui,
        maximizePerformanceMode:
          settings.ui.maximizePerformanceMode === "on" ||
          settings.ui.maximizePerformanceMode === "off"
            ? settings.ui.maximizePerformanceMode
            : "auto",
      }
      : settings.ui,
  };
};

const MAX_RECENT_LAUNCH_ITEMS = 3;

const readSettings = (): NormalizedPersistedRetroSettings | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = normalizePersistedRetroSettings(JSON.parse(raw) as PersistedRetroSettings);
    if (parsed.version !== STORAGE_VERSION) return null;

    if (raw !== JSON.stringify(parsed)) {
      writeSettings(parsed);
    }

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

const readRecentLaunchSettings = (): PersistedRecentLaunchSettings | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = window.localStorage.getItem(RECENT_LAUNCH_STORAGE_KEY);
    if (!raw) {
      const legacyRecentLaunch = readSettings()?.recentLaunch;
      if (legacyRecentLaunch) {
        writeRecentLaunchStorage(normalizeRecentLaunchSettings(legacyRecentLaunch));
      }
      return legacyRecentLaunch;
    }

    return JSON.parse(raw) as PersistedRecentLaunchSettings;
  } catch {
    const legacyRecentLaunch = readSettings()?.recentLaunch;
    if (legacyRecentLaunch) {
      writeRecentLaunchStorage(normalizeRecentLaunchSettings(legacyRecentLaunch));
    }
    return legacyRecentLaunch;
  }
};

const writeRecentLaunchStorage = (recentLaunch: PersistedRecentLaunchSettings) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(RECENT_LAUNCH_STORAGE_KEY, JSON.stringify(recentLaunch));
  } catch {
    // Ignore storage errors and keep runtime behavior.
  }
};

export const loadPersistedRetroSettings = (): NormalizedPersistedRetroSettings | null => readSettings();

export const getPreferredAudioInputDeviceId = (): string | null =>
  readSettings()?.preferredAudioInputDeviceId ?? null;

const normalizeRecentLaunchSettings = (
  recent: PersistedRecentLaunchSettings | undefined,
): PersistedRecentLaunchSettings => {
  const items = Array.isArray(recent?.items)
    ? recent.items.filter((item): item is PersistedRecentLaunchItem => {
      if (!item || typeof item !== "object") return false;
      if (item.type !== "playlist" && item.type !== "folder" && item.type !== "file-list") return false;
      if (typeof item.id !== "string" || item.id.length === 0) return false;
      if (typeof item.label !== "string") return false;
      if (!Array.isArray(item.paths) || item.paths.some((path) => typeof path !== "string")) return false;
      return true;
    })
    : [];

  const nextItems = items
    .map((item) => ({
      ...item,
      pinned: Boolean(item.pinned),
      updatedAt: Number.isFinite(item.updatedAt) ? item.updatedAt : 0,
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_RECENT_LAUNCH_ITEMS);

  const bootItemId = typeof recent?.bootItemId === "string"
    && nextItems.some((item) => item.id === recent.bootItemId)
    ? recent.bootItemId
    : null;

  return {
    items: nextItems,
    bootItemId,
  };
};

const writeRecentLaunchSettings = (recentLaunch: PersistedRecentLaunchSettings) => {
  writeRecentLaunchStorage(recentLaunch);
};

const trimRecentLaunchItems = (
  items: PersistedRecentLaunchItem[],
): PersistedRecentLaunchItem[] => {
  const nextItems = [...items].sort((a, b) => b.updatedAt - a.updatedAt);
  while (nextItems.length > MAX_RECENT_LAUNCH_ITEMS) {
    let removableIndex = -1;
    for (let index = nextItems.length - 1; index >= 0; index -= 1) {
      if (!nextItems[index].pinned) {
        removableIndex = index;
        break;
      }
    }
    if (removableIndex < 0) {
      nextItems.pop();
      continue;
    }
    nextItems.splice(removableIndex, 1);
  }
  return nextItems;
};

export const loadPersistedRecentLaunchSettings = (): PersistedRecentLaunchSettings =>
  normalizeRecentLaunchSettings(readRecentLaunchSettings());

export const savePersistedRecentLaunchSettings = (
  recentLaunch: PersistedRecentLaunchSettings,
) => {
  writeRecentLaunchSettings(normalizeRecentLaunchSettings(recentLaunch));
};

export const upsertPersistedRecentLaunchItem = (
  item: Omit<PersistedRecentLaunchItem, "updatedAt"> & { updatedAt?: number },
) => {
  const current = loadPersistedRecentLaunchSettings();
  const updatedAt = item.updatedAt ?? Date.now();
  const existing = current.items.find((entry) => entry.id === item.id);
  const nextItems = trimRecentLaunchItems([
    {
      ...item,
      pinned: existing?.pinned ?? item.pinned,
      updatedAt,
    },
    ...current.items.filter((entry) => entry.id !== item.id),
  ]);

  writeRecentLaunchSettings({
    items: nextItems,
    bootItemId: nextItems.some((entry) => entry.id === current.bootItemId)
      ? current.bootItemId
      : null,
  });
};

export const removePersistedRecentLaunchItem = (id: string) => {
  const current = loadPersistedRecentLaunchSettings();
  const nextItems = current.items.filter((item) => item.id !== id);
  writeRecentLaunchSettings({
    items: nextItems,
    bootItemId: current.bootItemId === id ? null : current.bootItemId,
  });
};

export const setPersistedRecentLaunchPinned = (id: string, pinned: boolean) => {
  const current = loadPersistedRecentLaunchSettings();
  const nextItems = current.items.map((item) => (
    item.id === id ? { ...item, pinned } : item
  ));
  writeRecentLaunchSettings({
    items: trimRecentLaunchItems(nextItems),
    bootItemId: current.bootItemId,
  });
};

export const setPersistedRecentLaunchBootItem = (id: string | null) => {
  const current = loadPersistedRecentLaunchSettings();
  writeRecentLaunchSettings({
    items: current.items,
    bootItemId: id && current.items.some((item) => item.id === id) ? id : null,
  });
};

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

export const getPreferNativeHlsOverride = (): boolean | null => {
  const value = readSettings()?.audio?.preferNativeHlsOverride;
  return typeof value === "boolean" ? value : null;
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
export const DEFAULT_RETRO_PLAYBACK = {
  mode: "native" as "retro" | "native",
};

export const getNativePlaybackMode = (): boolean => {
  if (typeof window === "undefined") return DEFAULT_RETRO_PLAYBACK.mode === "native";
  try {
    const stored = window.localStorage.getItem(NATIVE_MODE_KEY);
    if (stored === null) {
      return DEFAULT_RETRO_PLAYBACK.mode === "native";
    }
    return stored === "true";
  } catch {
    return DEFAULT_RETRO_PLAYBACK.mode === "native";
  }
};

export const setNativePlaybackMode = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(NATIVE_MODE_KEY, enabled ? "true" : "false");
  } catch {}
};

export const getFfmpegUseQsv = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(FFMPEG_USE_QSV_KEY);
    if (stored === null) {
      return isWindowsRuntime();
    }
    return stored === "true";
  } catch {
    return isWindowsRuntime();
  }
};

export const setFfmpegUseQsv = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    const defaultEnabled = isWindowsRuntime();
    if (enabled === defaultEnabled) {
      window.localStorage.removeItem(FFMPEG_USE_QSV_KEY);
      return;
    }
    if (enabled) {
      window.localStorage.setItem(FFMPEG_USE_QSV_KEY, "true");
    } else {
      window.localStorage.setItem(FFMPEG_USE_QSV_KEY, "false");
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
