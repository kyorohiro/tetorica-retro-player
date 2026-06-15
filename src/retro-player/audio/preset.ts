export type RetroAudioSettings = {
  isMuted: boolean;
  volume: number;
  playbackRate: number;
  isLooping: boolean;
  isAudioFxEnabled: boolean;
  lofiAmount: number;
  radioToneAmount: number;
  bitCrushAmount: number;
  sampleRateReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
  wowFlutterAmount: number;
  isNoiseEnabled: boolean;
  noiseLevel: number;
  vinylDustAmount: number;
};

export const DEFAULT_AUDIO_SETTINGS = {
  isMuted: false,
  volume: 1,
  playbackRate: 1,
  isLooping: true,
  isAudioFxEnabled: true,
  lofiAmount: 0.8,
  radioToneAmount: 0,
  bitCrushAmount: 0,
  sampleRateReductionAmount: 0,
  bassAmount: 0,
  midAmount: 0,
  trebleAmount: 0,
  stereoWidthAmount: 0,
  smallSpeakerRoomAmount: 0,
  wowFlutterAmount: 0,
  isNoiseEnabled: false,
  noiseLevel: 0.02,
  vinylDustAmount: 0,
} as const satisfies RetroAudioSettings;

export type RetroAudioPresetKey =
  | "none"
  | "lofi"
  | "radio"
  | "tape"
  | "vinyl"
  | "vintage-mic"
  | "earphone"
  | "lofiTape";

export type RetroAudioPresetDefinition = {
  label: string;
  settings: RetroAudioSettings;
};

const RETRO_AUDIO_PRESET_PARTIALS: Record<
  RetroAudioPresetKey,
  { label: string; settings: Partial<RetroAudioSettings> }
> = {
  none: {
    label: "None",
    settings: {
      isAudioFxEnabled: false,
      isNoiseEnabled: false,
      volume: 1,
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
    },
  },
  lofi: {
    label: "Lo-Fi",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      volume: 0.92,
      lofiAmount: 0.7,
      radioToneAmount: 0.18,
      bitCrushAmount: 0.22,
      sampleRateReductionAmount: 0.24,
      bassAmount: 0.08,
      midAmount: -0.08,
      trebleAmount: -0.18,
      stereoWidthAmount: -0.08,
      smallSpeakerRoomAmount: 0.08,
      wowFlutterAmount: 0.12,
      noiseLevel: 0.005,
      vinylDustAmount: 0,
    },
  },
  radio: {
    label: "Radio",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      volume: 0.88,
      lofiAmount: 0.4,
      radioToneAmount: 0.9,
      bitCrushAmount: 0.12,
      sampleRateReductionAmount: 0.38,
      bassAmount: -0.4,
      midAmount: 0.18,
      trebleAmount: -0.32,
      stereoWidthAmount: -0.55,
      smallSpeakerRoomAmount: 0.12,
      wowFlutterAmount: 0.08,
      noiseLevel: 0.01,
      vinylDustAmount: 0,
    },
  },
  tape: {
    label: "Tape",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      volume: 0.94,
      lofiAmount: 0.22,
      radioToneAmount: 0.1,
      bitCrushAmount: 0.04,
      sampleRateReductionAmount: 0.08,
      bassAmount: 0.12,
      midAmount: 0,
      trebleAmount: -0.14,
      stereoWidthAmount: 0.06,
      smallSpeakerRoomAmount: 0.18,
      wowFlutterAmount: 0.42,
      noiseLevel: 0.0075,
      vinylDustAmount: 0,
    },
  },
  vinyl: {
    label: "Vinyl",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      volume: 0.96,
      lofiAmount: 0.14,
      radioToneAmount: 0.06,
      bitCrushAmount: 0.01,
      sampleRateReductionAmount: 0.03,
      bassAmount: 0.06,
      midAmount: -0.02,
      trebleAmount: -0.16,
      stereoWidthAmount: -0.18,
      smallSpeakerRoomAmount: 0.03,
      wowFlutterAmount: 0.18,
      noiseLevel: 0.0035,
      vinylDustAmount: 0.58,
    },
  },
  "vintage-mic": {
    label: "Vintage Mic",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      volume: 0.94,
      lofiAmount: 0.34,
      radioToneAmount: 0.28,
      bitCrushAmount: 0,
      sampleRateReductionAmount: 0.02,
      bassAmount: -0.24,
      midAmount: 0.32,
      trebleAmount: -0.68,
      stereoWidthAmount: -0.32,
      smallSpeakerRoomAmount: 0.12,
      wowFlutterAmount: 0.04,
      noiseLevel: 0.0025,
      vinylDustAmount: 0.08,
    },
  },
  earphone: {
    label: "Earphone",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: false,
      volume: 1,
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
    },
  },
  lofiTape: {
    label: "Lo-Fi Tape",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      volume: 0.93,
      lofiAmount: 0.58,
      radioToneAmount: 0.12,
      bitCrushAmount: 0.12,
      sampleRateReductionAmount: 0.16,
      bassAmount: 0.1,
      midAmount: -0.02,
      trebleAmount: -0.16,
      stereoWidthAmount: -0.02,
      smallSpeakerRoomAmount: 0.12,
      wowFlutterAmount: 0.28,
      noiseLevel: 0.006,
      vinylDustAmount: 0,
    },
  },
};

export const RETRO_AUDIO_PRESETS: Record<
  RetroAudioPresetKey,
  RetroAudioPresetDefinition
> = Object.fromEntries(
  Object.entries(RETRO_AUDIO_PRESET_PARTIALS).map(([key, preset]) => [
    key,
    {
      label: preset.label,
      settings: {
        ...DEFAULT_AUDIO_SETTINGS,
        ...preset.settings,
      },
    },
  ]),
) as Record<RetroAudioPresetKey, RetroAudioPresetDefinition>;

export const RETRO_AUDIO_PRESET_SETTINGS: Record<
  RetroAudioPresetKey,
  RetroAudioSettings
> = Object.fromEntries(
  Object.entries(RETRO_AUDIO_PRESETS).map(([key, preset]) => [key, preset.settings]),
) as Record<RetroAudioPresetKey, RetroAudioSettings>;
