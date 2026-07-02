import { DEFAULT_AUDIO_SETTINGS } from "../audio/preset";
import { loadLocalePreference } from "../../i18n";
import type { LocalePreference } from "../../i18n";
import { RETRO_PRESETS, type RetroPresetDefinition } from "../retro/config";
import { loadPersistedRetroSettings } from "./persistedRetroSettings";
import type {
  PersistedRetroAudioSettings,
  PersistedRetroFilterSettings,
  PersistedRetroUiSettings,
} from "./persistedRetroSettings";

const FILE_TYPE = "tetorica-retro-player-settings";
const FILE_VERSION = 1;

const DEFAULT_PRESET: RetroPresetDefinition = RETRO_PRESETS.pc98_512;

const DEFAULT_FILTER_SETTINGS: PersistedRetroFilterSettings = {
  targetWidth: DEFAULT_PRESET.width,
  targetHeight: DEFAULT_PRESET.height,
  matchTargetAspect: true,
  colorLevels: DEFAULT_PRESET.colors,
  ditherStrength: DEFAULT_PRESET.dither,
  paletteMode: DEFAULT_PRESET.palette,
  curvature: DEFAULT_PRESET.curvature,
  scanlineStrength: DEFAULT_PRESET.scanline,
  scanline2Strength: DEFAULT_PRESET.scanline2,
  scanlineBrightnessFade: 0.6,
  vignetteStrength: DEFAULT_PRESET.vignette,
  glowStrength: DEFAULT_PRESET.glow,
  smoothStrength: 0,
  toonSteps: 0,
  edgeBoost: 0,
  animeEdgeLow: 0.08,
  animeEdgeHigh: 0.55,
  phosphorStrength: DEFAULT_PRESET.phosphor,
  spotMaskStrength: DEFAULT_PRESET.spotMask,
  bulbRadius: DEFAULT_PRESET.bulbRadius,
  blackFloor: DEFAULT_PRESET.blackFloor,
  lumaAmount: DEFAULT_PRESET.lumaAmount ?? 1,
  lumaLow: DEFAULT_PRESET.lumaLow ?? 0,
  lumaHigh: DEFAULT_PRESET.lumaHigh ?? 1,
  lumaKnee: DEFAULT_PRESET.lumaKnee ?? 0.2,
  saturationAmount: DEFAULT_PRESET.saturationAmount ?? 1,
  saturationLow: DEFAULT_PRESET.saturationLow ?? 0,
  saturationHigh: DEFAULT_PRESET.saturationHigh ?? 1,
  saturationKnee: DEFAULT_PRESET.saturationKnee ?? 0.2,
  phosphorDotLightBalance: 1,
  phosphorDotInternalScale: false,
  phosphorDotBrightCore: false,
  phosphorDotCellFill: 0,
  phosphorDotFlatDisc: false,
  phosphorDotNeighborBlend: false,
  closeUpNoiseStrength: 0,
  monoTint: DEFAULT_PRESET.monoTint,
  neonBoost: DEFAULT_PRESET.neonBoost,
  neonSaturation: DEFAULT_PRESET.neonSaturation,
  neonDetail: DEFAULT_PRESET.neonDetail,
  focusStrength: 0,
  focusWidth: DEFAULT_PRESET.focusWidth ?? 0.24,
  focusHeight: DEFAULT_PRESET.focusHeight ?? 0.16,
  focusCenterX: 0.5,
  focusCenterY: 0.5,
  focusTrackCursor: false,
  isFilterEnabled: true,
};

const DEFAULT_UI_SETTINGS: PersistedRetroUiSettings = {
  isPreviewMaximized: false,
  isHighResolution: false,
  renderResolutionPreset: 1,
  brightness: 1.0,
  flipH: false,
  flipV: false,
};

type PresetFileContent = {
  fileType: typeof FILE_TYPE;
  version: number;
  filter: PersistedRetroFilterSettings;
  audio: PersistedRetroAudioSettings;
  ui: PersistedRetroUiSettings;
  locale: LocalePreference;
};

export type PresetFileData = {
  filter: PersistedRetroFilterSettings;
  audio: PersistedRetroAudioSettings;
  ui: PersistedRetroUiSettings;
  locale: LocalePreference;
};

const applyFilterDefaults = (
  raw: Partial<PersistedRetroFilterSettings>,
): PersistedRetroFilterSettings => ({ ...DEFAULT_FILTER_SETTINGS, ...raw });

const applyAudioDefaults = (
  raw: Partial<PersistedRetroAudioSettings>,
): PersistedRetroAudioSettings => ({ ...DEFAULT_AUDIO_SETTINGS, ...raw });

const applyUiDefaults = (
  raw: Partial<PersistedRetroUiSettings>,
): PersistedRetroUiSettings => ({ ...DEFAULT_UI_SETTINGS, ...raw });

const triggerDownload = (url: string, filename: string) => {
  if (typeof document === "undefined") return;
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => link.remove(), 0);
};

export const exportPresetFile = () => {
  if (typeof window === "undefined") return;

  const persisted = loadPersistedRetroSettings();
  const content: PresetFileContent = {
    fileType: FILE_TYPE,
    version: FILE_VERSION,
    filter: applyFilterDefaults(persisted?.filter ?? {}),
    audio: applyAudioDefaults(persisted?.audio ?? {}),
    ui: applyUiDefaults(persisted?.ui ?? {}),
    locale: loadLocalePreference(),
  };

  const json = JSON.stringify(content, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const filename = `retro-${date}-${Date.now()}.retro.json`;
  triggerDownload(url, filename);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const importPresetFile = (file: File): Promise<PresetFileData | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(
          e.target!.result as string,
        ) as Partial<PresetFileContent>;

        if (parsed.fileType !== FILE_TYPE) {
          resolve(null);
          return;
        }

        const loc = parsed.locale;
        resolve({
          filter: applyFilterDefaults(parsed.filter ?? {}),
          audio: applyAudioDefaults(parsed.audio ?? {}),
          ui: applyUiDefaults(parsed.ui ?? {}),
          locale: loc === "ja" || loc === "en" || loc === "auto" ? loc : "auto",
        });
      } catch {
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
};
