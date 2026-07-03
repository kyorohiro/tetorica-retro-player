export type RetroAudioSettings = {
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

// The numeric "amount" knobs a preset can set, shared by anything that needs
// to apply a full RetroAudioPresetDefinition (e.g. quick-controls steppers)
// without depending on every individual onChangeXxx prop.
export const RETRO_AUDIO_AMOUNT_KEYS = [
  "lofiAmount",
  "radioToneAmount",
  "bitCrushAmount",
  "bitCrushNoiseAmount",
  "sampleRateReductionAmount",
  "noiseReductionAmount",
  "bassAmount",
  "midAmount",
  "trebleAmount",
  "stereoWidthAmount",
  "smallSpeakerRoomAmount",
  "wowFlutterAmount",
  "noiseLevel",
  "vinylDustAmount",
  "noiseWarmthAmount",
  "noiseAirAmount",
  "noisePresenceAmount",
  "delayAmount",
  "reverbAmount",
  "chorusAmount",
  "tapeSaturationAmount",
  "compressorAmount",
  "fxOutputTrimAmount",
  "inputTrimAmount",
] as const satisfies readonly (keyof RetroAudioSettings)[];

export type RetroAudioAmountKey = (typeof RETRO_AUDIO_AMOUNT_KEYS)[number];

export type RetroAudioAmountSetters = {
  [K in RetroAudioAmountKey as `set${Capitalize<K>}`]: (value: number) => void;
};

export const DEFAULT_AUDIO_SETTINGS = {
  audioOptimizationMode: "auto",
  isMuted: false,
  volume: 0.72,
  playbackRate: 1,
  isLooping: true,
  isAudioFxEnabled: true,
  lofiAmount: 0.58,
  radioToneAmount: 0,
  bitCrushAmount: 0.10,
  bitCrushNoiseAmount: 0,
  sampleRateReductionAmount: 0.10,
  noiseReductionAmount: 0,
  bassAmount: 0,
  midAmount: -0.25,
  trebleAmount: 0,
  stereoWidthAmount: 0,
  smallSpeakerRoomAmount: 0,
  wowFlutterAmount: 0,
  isNoiseEnabled: true,
  noiseLevel: 0.0010,
  vinylDustAmount: 0,
  noiseWarmthAmount: 0.33,
  noiseAirAmount: 0.55,
  noisePresenceAmount: 0.5,
  delayAmount: 0,
  reverbAmount: 0,
  chorusAmount: 0,
  tapeSaturationAmount: 0,
  compressorAmount: 0,
  fxOutputTrimAmount: 0.66,
  inputTrimAmount: 1.0,
} as const satisfies RetroAudioSettings;

export type RetroAudioPresetKey =
  | "none"
  | "lofi"
  | "radio"
  | "tape"
  | "vinyl"
  | "vintage-mic"
  | "earphone"
  | "lofiTape"
  | "boombox"
  | "club";

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
      isAudioFxEnabled: true,
      isNoiseEnabled: false,
      //volume: 1,
      lofiAmount: 0,
      radioToneAmount: 0,
      bitCrushAmount: 0,
      bitCrushNoiseAmount: 0,
      sampleRateReductionAmount: 0,
      bassAmount: 0,
      midAmount: 0,
      trebleAmount: 0,
      stereoWidthAmount: 0,
      smallSpeakerRoomAmount: 0,
      wowFlutterAmount: 0,
      noiseLevel: 0,
      vinylDustAmount: 0,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0,
      compressorAmount: 0,
      fxOutputTrimAmount: 1.0,
    },
  },
  lofi: {
    label: "Lo-Fi",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.92,
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
      noiseLevel: 0.002,
      vinylDustAmount: 0,
      delayAmount: 0.000,
      reverbAmount: 0.000,
      tapeSaturationAmount: 0.00,
      compressorAmount: 0.00,
      fxOutputTrimAmount: 0.66,
    },
  },
  radio: {
    label: "Radio",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.88,
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
      noiseLevel: 0.004,
      vinylDustAmount: 0,
      noiseWarmthAmount: 0.67,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0,
      compressorAmount: 0.00,
      fxOutputTrimAmount: 0.74,
    },
  },
  tape: {
    label: "Tape",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.94,
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
      noiseLevel: 0.0045,
      vinylDustAmount: 0,
      noiseWarmthAmount: 0.5,
      reverbAmount: 0.05,
      chorusAmount: 0,
      tapeSaturationAmount: 0.18,
      compressorAmount: 0.25,
      fxOutputTrimAmount: 0.58,
    },
  },
  vinyl: {
    label: "Vinyl",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.96,
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
      noiseLevel: 0.0025,
      vinylDustAmount: 0.29,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0.05,
      compressorAmount: 0.15,
      fxOutputTrimAmount: 0.75,
    },
  },
  "vintage-mic": {
    label: "Vintage Mic",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.94,
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
      noiseLevel: 0.0020,
      vinylDustAmount: 0.04,
      reverbAmount: 0.08,
      tapeSaturationAmount: 0.08,
      compressorAmount: 0.12,
      fxOutputTrimAmount: 0.46,
    },
  },
  earphone: {
    label: "Earphone",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: false,
      //volume: 1,
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
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0,
      compressorAmount: 0,
      fxOutputTrimAmount: 1.0,
    },
  },
  lofiTape: {
    label: "Lo-Fi Tape",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.93,
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
      noiseLevel: 0.002,
      vinylDustAmount: 0,
      delayAmount: 0.05,
      reverbAmount: 0.05,
      chorusAmount: 0.05,
      tapeSaturationAmount: 0.13,
      compressorAmount: 0.25,
      fxOutputTrimAmount: 0.50,
    },
  },
  boombox: {
    label: "Boom Box",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
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
      noiseLevel: 0.003,
      vinylDustAmount: 0,
      noiseWarmthAmount: 0.5,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0.10,
      compressorAmount: 0.40,
      fxOutputTrimAmount: 0.58,
    },
  },
  club: {
    label: "Club",
    settings: {
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
      delayAmount: 0,
      reverbAmount: 0.05,
      chorusAmount: 0,
      tapeSaturationAmount: 0,
      compressorAmount: 0.45,
      fxOutputTrimAmount: 0.62,
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
