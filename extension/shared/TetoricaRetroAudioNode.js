// src/retro-player/audio/preset.ts
var DEFAULT_AUDIO_SETTINGS = {
  audioOptimizationMode: "auto",
  isMuted: false,
  volume: 0.72,
  playbackRate: 1,
  isLooping: true,
  isAudioFxEnabled: true,
  lofiAmount: 0.58,
  radioToneAmount: 0,
  bitCrushAmount: 0.1,
  bitCrushNoiseAmount: 0,
  sampleRateReductionAmount: 0.1,
  noiseReductionAmount: 0,
  bassAmount: 0,
  midAmount: -0.25,
  trebleAmount: 0,
  stereoWidthAmount: 0,
  smallSpeakerRoomAmount: 0,
  wowFlutterAmount: 0,
  isNoiseEnabled: true,
  noiseLevel: 1e-3,
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
  inputTrimAmount: 1
};
var RETRO_AUDIO_PRESET_PARTIALS = {
  none: {
    label: "None",
    settings: {
      isAudioFxEnabled: false,
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
      fxOutputTrimAmount: 1
    }
  },
  lofi: {
    label: "Lo-Fi",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      //volume: 0.92,
      lofiAmount: 0.58,
      radioToneAmount: 0,
      bitCrushAmount: 0.1,
      sampleRateReductionAmount: 0.1,
      bassAmount: 0,
      midAmount: -0.25,
      trebleAmount: 0,
      stereoWidthAmount: 0,
      smallSpeakerRoomAmount: 0,
      wowFlutterAmount: 0,
      noiseLevel: 2e-3,
      vinylDustAmount: 0,
      delayAmount: 0,
      reverbAmount: 0,
      tapeSaturationAmount: 0,
      compressorAmount: 0,
      fxOutputTrimAmount: 0.66
    }
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
      noiseLevel: 4e-3,
      vinylDustAmount: 0,
      noiseWarmthAmount: 0.67,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0,
      compressorAmount: 0,
      fxOutputTrimAmount: 0.74
    }
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
      stereoWidthAmount: 0.1,
      smallSpeakerRoomAmount: 0.18,
      wowFlutterAmount: 0.48,
      noiseLevel: 45e-4,
      vinylDustAmount: 0,
      noiseWarmthAmount: 0.5,
      reverbAmount: 0.05,
      chorusAmount: 0,
      tapeSaturationAmount: 0.18,
      compressorAmount: 0.25,
      fxOutputTrimAmount: 0.58
    }
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
      noiseLevel: 25e-4,
      vinylDustAmount: 0.29,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0.05,
      compressorAmount: 0.15,
      fxOutputTrimAmount: 0.75
    }
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
      noiseLevel: 2e-3,
      vinylDustAmount: 0.04,
      reverbAmount: 0.08,
      tapeSaturationAmount: 0.08,
      compressorAmount: 0.12,
      fxOutputTrimAmount: 0.46
    }
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
      fxOutputTrimAmount: 1
    }
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
      noiseLevel: 2e-3,
      vinylDustAmount: 0,
      delayAmount: 0.05,
      reverbAmount: 0.05,
      chorusAmount: 0.05,
      tapeSaturationAmount: 0.13,
      compressorAmount: 0.25,
      fxOutputTrimAmount: 0.5
    }
  },
  boombox: {
    label: "Boom Box",
    settings: {
      isAudioFxEnabled: true,
      isNoiseEnabled: true,
      lofiAmount: 0.3,
      radioToneAmount: 0.06,
      bitCrushAmount: 0.06,
      sampleRateReductionAmount: 0.06,
      bassAmount: 0.2,
      midAmount: -0.55,
      trebleAmount: 0.05,
      stereoWidthAmount: -0.1,
      smallSpeakerRoomAmount: 0.14,
      wowFlutterAmount: 0.04,
      noiseLevel: 3e-3,
      vinylDustAmount: 0,
      noiseWarmthAmount: 0.5,
      delayAmount: 0,
      reverbAmount: 0,
      chorusAmount: 0,
      tapeSaturationAmount: 0.1,
      compressorAmount: 0.4,
      fxOutputTrimAmount: 0.58
    }
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
      bassAmount: 0.3,
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
      fxOutputTrimAmount: 0.62
    }
  }
};
var RETRO_AUDIO_PRESETS = Object.fromEntries(
  Object.entries(RETRO_AUDIO_PRESET_PARTIALS).map(([key, preset]) => [
    key,
    {
      label: preset.label,
      settings: {
        ...DEFAULT_AUDIO_SETTINGS,
        ...preset.settings
      }
    }
  ])
);
var RETRO_AUDIO_PRESET_SETTINGS = Object.fromEntries(
  Object.entries(RETRO_AUDIO_PRESETS).map(([key, preset]) => [key, preset.settings])
);

// src/retro-player/audio/audioChainEngine.ts
function createDriveCurve(amount) {
  const samples = 4096;
  const curve = new Float32Array(samples);
  const drive = 1 + amount * 5;
  for (let i = 0; i < samples; i++) {
    const x = i * 2 / (samples - 1) - 1;
    curve[i] = Math.tanh(x * drive);
  }
  return curve;
}
function createTapeSaturationCurve(amount) {
  const samples = 4096;
  const curve = new Float32Array(samples);
  const k = amount * 6;
  for (let i = 0; i < samples; i++) {
    const x = i * 2 / (samples - 1) - 1;
    if (k < 1e-3) {
      curve[i] = x;
    } else {
      curve[i] = Math.tanh(x * (1 + k)) / Math.tanh(1 + k);
    }
  }
  return curve;
}
function createSmallRoomImpulse(context) {
  const duration = 0.22;
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      const t = i / channelData.length;
      const decay = (1 - t) ** 1.85;
      const flutter = 0.78 + 0.22 * Math.sin(t * 42 + channel * 0.9);
      const earlyReflection = Math.sin(t * 130 + channel * 0.35) * 0.08;
      channelData[i] = (Math.random() * 2 - 1 + earlyReflection) * decay * flutter * 0.28;
    }
  }
  return impulse;
}
function createHallReverbImpulse(context) {
  const duration = 2.2;
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const impulse = context.createBuffer(2, length, context.sampleRate);
  const predelaySamples = Math.floor(context.sampleRate * 0.012);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      if (i < predelaySamples) continue;
      const t = (i - predelaySamples) / (length - predelaySamples);
      const decay = (1 - t) ** 1.8;
      const brightness = Math.max(0, 1 - t * 2.5);
      const early = Math.sin(t * 160 + channel * 0.8) * brightness * 0.35;
      channelData[i] = (Math.random() * 2 - 1 + early) * decay * 0.75;
    }
  }
  return impulse;
}
function createTintedNoiseBuffer(context) {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(2, length, context.sampleRate);
  let brownState = 0;
  let airState = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    brownState = (brownState + white * 0.06) / 1.06;
    airState = airState * 0.82 + white * 0.18;
    const body = brownState * 2.2;
    const air = (white - airState) * 0.15;
    const preSat = body + air;
    const sample = Math.max(-1, Math.min(1, preSat - preSat * Math.abs(preSat) * 0.12));
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      const channelJitter = (Math.random() * 2 - 1) * 8e-3;
      channelData[i] = Math.max(-1, Math.min(1, sample + channelJitter));
    }
  }
  return buffer;
}
function createVinylDustBuffer(context) {
  const length = context.sampleRate * 2;
  const monoData = new Float32Array(length);
  let index = 0;
  let dustState = 0;
  while (index < length) {
    const white = Math.random() * 2 - 1;
    dustState = dustState * 0.72 + white * 0.28;
    monoData[index] += (white - dustState) * 0.018;
    const random = Math.random();
    if (random < 34e-4) {
      const crackleLength = 8 + Math.floor(Math.random() * 42);
      const crackleAmplitude = 0.11 + Math.random() * 0.28;
      const polarity = Math.random() < 0.5 ? -1 : 1;
      for (let offset = 0; offset < crackleLength && index + offset < length; offset++) {
        const decay = Math.exp(-offset / (2.4 + Math.random() * 5));
        monoData[index + offset] += polarity * crackleAmplitude * decay * (0.7 + Math.random() * 0.3);
      }
      index += crackleLength + Math.floor(Math.random() * 640);
      continue;
    }
    if (random < 38e-4) {
      const popLength = 90 + Math.floor(Math.random() * 260);
      const popAmplitude = 0.055 + Math.random() * 0.11;
      const phase = Math.random() * Math.PI * 2;
      for (let offset = 0; offset < popLength && index + offset < length; offset++) {
        const decay = Math.exp(-offset / (18 + Math.random() * 40));
        const wobble = Math.sin(phase + offset * (0.22 + Math.random() * 0.06));
        monoData[index + offset] += popAmplitude * decay * wobble;
      }
      index += popLength + Math.floor(Math.random() * 2200);
      continue;
    }
    index++;
  }
  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const channelJitter = (Math.random() * 2 - 1) * 35e-4;
      channelData[i] = Math.max(-1, Math.min(1, monoData[i] + channelJitter));
    }
  }
  return buffer;
}

// src/retro-player/audio/TetoricaRetroAudioNode.ts
var isRetroPlayerDebugEnabled = () => Boolean(
  globalThis.__RETRO_PLAYER_DEBUG__
);
function isAudioParamLike(value) {
  const AudioParamCtor = globalThis.AudioParam;
  if (typeof AudioParamCtor === "function") {
    return value instanceof AudioParamCtor;
  }
  return typeof value === "object" && value !== null && "setValueAtTime" in value && "value" in value;
}
function resolveRetroAudioSettings({
  preset,
  params
}) {
  return {
    ...DEFAULT_AUDIO_SETTINGS,
    ...preset ? RETRO_AUDIO_PRESET_SETTINGS[preset] : null,
    ...params
  };
}
var TetoricaRetroAudioNode = class {
  context;
  instanceLabel;
  // Deprecated: prefer await engine.connect(context.destination) instead.
  connectOutputToDestination;
  connectOutputToRecordingDestination;
  enableAudioWorklet;
  runtimeState;
  currentSettings;
  // Destinations wired by applyAutoConnect() (constructor option-driven, managed internally).
  autoConnections = /* @__PURE__ */ new Set();
  // Destinations added by explicit connect() calls (caller-managed, cleared by disconnect()).
  externalConnections = /* @__PURE__ */ new Set();
  nodes = {
    audioContext: null,
    masterGain: null,
    radioToneHighpass: null,
    radioToneLowpass: null,
    radioTonePresence: null,
    recordingDestination: null,
    lofiLowpass: null,
    lofiHighshelf: null,
    lofiDrive: null,
    bitcrusher: null,
    bitcrusherDiff: null,
    crushNoiseWetGain: null,
    crushNoiseDryGain: null,
    crushNoiseMixGain: null,
    crushNoisePostLowpass: null,
    postCrushLowpass: null,
    bassEq: null,
    midEq: null,
    trebleEq: null,
    stereoWidth: null,
    roomDryGain: null,
    roomConvolver: null,
    roomWetGain: null,
    wowFlutterDelay: null,
    wowLfo: null,
    wowLfoGain: null,
    flutterLfo: null,
    flutterLfoGain: null,
    noiseSource: null,
    noiseHighpass: null,
    noiseLowpass: null,
    noiseWarmth: null,
    noiseFilter: null,
    noisePanner: null,
    noiseGain: null,
    noiseLfo: null,
    noiseLfoGain: null,
    crackleSource: null,
    crackleFilter: null,
    vinylDustBedFilter: null,
    vinylDustBedGain: null,
    crackleGain: null,
    sourceNode: null,
    outputBus: null,
    echoDelayLine: null,
    echoFeedbackGain: null,
    echoWetGain: null,
    hallReverbConvolver: null,
    hallReverbWetGain: null,
    chorusDelay1: null,
    chorusDelay2: null,
    chorusLfo1: null,
    chorusLfo2: null,
    chorusLfoGain1: null,
    chorusLfoGain2: null,
    chorusWetGain: null,
    tapeSaturator: null,
    busCompressor: null,
    fxOutputGain: null,
    inputTrimGain: null,
    analyser: null
  };
  constructor({
    context,
    instanceLabel,
    runtimeState,
    connectOutputToDestination = false,
    connectOutputToRecordingDestination = false,
    enableAudioWorklet = true
  }) {
    this.context = context;
    this.instanceLabel = instanceLabel;
    this.runtimeState = runtimeState;
    this.currentSettings = runtimeState.settings;
    this.connectOutputToDestination = connectOutputToDestination;
    this.connectOutputToRecordingDestination = connectOutputToRecordingDestination;
    this.enableAudioWorklet = enableAudioWorklet;
  }
  get input() {
    return this.nodes.inputTrimGain ?? this.nodes.wowFlutterDelay ?? this.nodes.lofiLowpass;
  }
  get output() {
    return this.nodes.fxOutputGain ?? this.nodes.outputBus ?? this.nodes.masterGain;
  }
  get audioContext() {
    return this.nodes.audioContext;
  }
  get masterGain() {
    return this.nodes.masterGain;
  }
  get radioToneHighpass() {
    return this.nodes.radioToneHighpass;
  }
  get radioToneLowpass() {
    return this.nodes.radioToneLowpass;
  }
  get radioTonePresence() {
    return this.nodes.radioTonePresence;
  }
  get recordingDestination() {
    return this.nodes.recordingDestination;
  }
  get lofiLowpass() {
    return this.nodes.lofiLowpass;
  }
  get lofiHighshelf() {
    return this.nodes.lofiHighshelf;
  }
  get lofiDrive() {
    return this.nodes.lofiDrive;
  }
  get bitcrusher() {
    return this.nodes.bitcrusher;
  }
  get bassEq() {
    return this.nodes.bassEq;
  }
  get midEq() {
    return this.nodes.midEq;
  }
  get trebleEq() {
    return this.nodes.trebleEq;
  }
  get stereoWidth() {
    return this.nodes.stereoWidth;
  }
  get roomDryGain() {
    return this.nodes.roomDryGain;
  }
  get roomConvolver() {
    return this.nodes.roomConvolver;
  }
  get roomWetGain() {
    return this.nodes.roomWetGain;
  }
  get wowFlutterDelay() {
    return this.nodes.wowFlutterDelay;
  }
  get wowLfo() {
    return this.nodes.wowLfo;
  }
  get wowLfoGain() {
    return this.nodes.wowLfoGain;
  }
  get flutterLfo() {
    return this.nodes.flutterLfo;
  }
  get flutterLfoGain() {
    return this.nodes.flutterLfoGain;
  }
  get noiseSource() {
    return this.nodes.noiseSource;
  }
  get noiseFilter() {
    return this.nodes.noiseFilter;
  }
  get noisePanner() {
    return this.nodes.noisePanner;
  }
  get noiseGain() {
    return this.nodes.noiseGain;
  }
  get noiseLfo() {
    return this.nodes.noiseLfo;
  }
  get noiseLfoGain() {
    return this.nodes.noiseLfoGain;
  }
  get crackleSource() {
    return this.nodes.crackleSource;
  }
  get crackleFilter() {
    return this.nodes.crackleFilter;
  }
  get vinylDustBedFilter() {
    return this.nodes.vinylDustBedFilter;
  }
  get vinylDustBedGain() {
    return this.nodes.vinylDustBedGain;
  }
  get crackleGain() {
    return this.nodes.crackleGain;
  }
  get analyser() {
    return this.nodes.analyser;
  }
  debugAudio(label, payload) {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }
    console.log(`[retro-player audio][${this.instanceLabel}] ${label}`, payload ?? {});
  }
  getParams() {
    return { ...this.currentSettings };
  }
  setParams(nextParams, isPartialUpdate = true) {
    const nextSettings = isPartialUpdate ? { ...this.currentSettings, ...nextParams } : { ...DEFAULT_AUDIO_SETTINGS, ...nextParams };
    Object.assign(this.currentSettings, nextSettings);
    this.updateAudioNodes();
  }
  applyPreset(preset, extraParams) {
    const nextSettings = resolveRetroAudioSettings({
      preset,
      params: extraParams
    });
    Object.assign(this.currentSettings, nextSettings);
    this.updateAudioNodes();
  }
  setIsPlaying(nextIsPlaying) {
    this.runtimeState.isPlaying = nextIsPlaying;
    this.updateAudioNodes();
  }
  setOutputEnabled(isEnabled) {
    this.runtimeState.isOutputEnabled = isEnabled;
    this.updateAudioNodes();
  }
  resetNodes() {
    Object.assign(this.nodes, {
      audioContext: null,
      masterGain: null,
      radioToneHighpass: null,
      radioToneLowpass: null,
      radioTonePresence: null,
      recordingDestination: null,
      lofiLowpass: null,
      lofiHighshelf: null,
      lofiDrive: null,
      bitcrusher: null,
      bitcrusherDiff: null,
      crushNoiseWetGain: null,
      crushNoiseDryGain: null,
      crushNoiseMixGain: null,
      crushNoisePostLowpass: null,
      postCrushLowpass: null,
      bassEq: null,
      midEq: null,
      trebleEq: null,
      stereoWidth: null,
      roomDryGain: null,
      roomConvolver: null,
      roomWetGain: null,
      wowFlutterDelay: null,
      wowLfo: null,
      wowLfoGain: null,
      flutterLfo: null,
      flutterLfoGain: null,
      noiseSource: null,
      noiseHighpass: null,
      noiseLowpass: null,
      noiseWarmth: null,
      noiseFilter: null,
      noisePanner: null,
      noiseGain: null,
      noiseLfo: null,
      noiseLfoGain: null,
      crackleSource: null,
      crackleFilter: null,
      vinylDustBedFilter: null,
      vinylDustBedGain: null,
      crackleGain: null,
      sourceNode: null,
      outputBus: null,
      echoDelayLine: null,
      echoFeedbackGain: null,
      echoWetGain: null,
      hallReverbConvolver: null,
      hallReverbWetGain: null,
      chorusDelay1: null,
      chorusDelay2: null,
      chorusLfo1: null,
      chorusLfo2: null,
      chorusLfoGain1: null,
      chorusLfoGain2: null,
      chorusWetGain: null,
      tapeSaturator: null,
      busCompressor: null,
      fxOutputGain: null
    });
  }
  resolveAudioWorkletNodeCtor() {
    const ctor = globalThis.AudioWorkletNode;
    return typeof ctor === "function" ? ctor : null;
  }
  updateAudioNodes() {
    const masterGain = this.nodes.masterGain;
    const radioToneHighpass = this.nodes.radioToneHighpass;
    const radioToneLowpass = this.nodes.radioToneLowpass;
    const radioTonePresence = this.nodes.radioTonePresence;
    const lowpass = this.nodes.lofiLowpass;
    const highshelf = this.nodes.lofiHighshelf;
    const drive = this.nodes.lofiDrive;
    const bitcrusher = this.nodes.bitcrusher;
    const bitcrusherDiff = this.nodes.bitcrusherDiff;
    const crushNoiseMixGain = this.nodes.crushNoiseMixGain;
    const crushNoisePostLowpass = this.nodes.crushNoisePostLowpass;
    const bassEq = this.nodes.bassEq;
    const midEq = this.nodes.midEq;
    const trebleEq = this.nodes.trebleEq;
    const stereoWidth = this.nodes.stereoWidth;
    const roomDryGain = this.nodes.roomDryGain;
    const roomWetGain = this.nodes.roomWetGain;
    const wowFlutterDelay = this.nodes.wowFlutterDelay;
    const wowLfo = this.nodes.wowLfo;
    const wowLfoGain = this.nodes.wowLfoGain;
    const flutterLfo = this.nodes.flutterLfo;
    const flutterLfoGain = this.nodes.flutterLfoGain;
    const noiseGainNode = this.nodes.noiseGain;
    const crackleGainNode = this.nodes.crackleGain;
    const vinylDustBedFilter = this.nodes.vinylDustBedFilter;
    const vinylDustBedGain = this.nodes.vinylDustBedGain;
    const { settings, isPlaying, isOutputEnabled } = this.runtimeState;
    const audibleMasterGain = settings.isMuted || !isOutputEnabled ? 0 : settings.volume;
    if (masterGain) {
      masterGain.gain.cancelScheduledValues(this.context.currentTime);
      masterGain.gain.setValueAtTime(audibleMasterGain, this.context.currentTime);
    }
    if (radioToneHighpass && radioToneLowpass && radioTonePresence) {
      const amount = settings.isAudioFxEnabled ? settings.radioToneAmount : 0;
      radioToneHighpass.frequency.value = 20 + amount * 430;
      radioToneHighpass.Q.value = 0.4 + amount * 0.35;
      radioToneLowpass.frequency.value = 2e4 - amount * 17400;
      radioToneLowpass.Q.value = 0.2 + amount * 0.9;
      radioTonePresence.frequency.value = 1700;
      radioTonePresence.Q.value = 0.8 + amount * 1.4;
      radioTonePresence.gain.value = amount * 6;
    }
    if (lowpass && highshelf && drive) {
      const amount = settings.isAudioFxEnabled ? settings.lofiAmount : 0;
      lowpass.frequency.value = 16e3 - amount * 14200;
      lowpass.Q.value = 0.3 + amount * 1.8;
      highshelf.gain.value = -amount * 18;
      try {
        drive.curve = createDriveCurve(amount * 0.6);
      } catch {
      }
    }
    if (bitcrusher) {
      const isEnabled = settings.isAudioFxEnabled;
      const bitDepth = 16 - (isEnabled ? settings.bitCrushAmount : 0) * 12;
      const holdFrames = 1 + (isEnabled ? settings.sampleRateReductionAmount : 0) * 23;
      const mix = isEnabled ? Math.max(settings.bitCrushAmount, settings.sampleRateReductionAmount) : 0;
      bitcrusher.parameters.get("bitDepth")?.setValueAtTime(
        bitDepth,
        bitcrusher.context.currentTime
      );
      bitcrusher.parameters.get("holdFrames")?.setValueAtTime(
        holdFrames,
        bitcrusher.context.currentTime
      );
      bitcrusher.parameters.get("mix")?.setValueAtTime(
        mix,
        bitcrusher.context.currentTime
      );
    }
    if (bitcrusherDiff) {
      const isEnabled = settings.isAudioFxEnabled;
      const crushNoiseAmount = isEnabled ? settings.bitCrushNoiseAmount : 0;
      const bitDepth = 16 - crushNoiseAmount * 12;
      const holdFrames = 1;
      bitcrusherDiff.parameters.get("bitDepth")?.setValueAtTime(
        bitDepth,
        bitcrusherDiff.context.currentTime
      );
      bitcrusherDiff.parameters.get("holdFrames")?.setValueAtTime(
        holdFrames,
        bitcrusherDiff.context.currentTime
      );
      bitcrusherDiff.parameters.get("mix")?.setValueAtTime(
        1,
        bitcrusherDiff.context.currentTime
      );
    }
    const postCrushLowpass = this.nodes.postCrushLowpass;
    if (postCrushLowpass) {
      const amount = settings.isAudioFxEnabled ? settings.noiseReductionAmount : 0;
      postCrushLowpass.frequency.value = Math.max(3e3, 18e3 - amount * 15e3);
    }
    if (crushNoisePostLowpass) {
      const amount = settings.isAudioFxEnabled ? settings.noiseReductionAmount : 0;
      crushNoisePostLowpass.frequency.value = Math.max(3e3, 18e3 - amount * 15e3);
    }
    if (crushNoiseMixGain) {
      const amount = settings.isAudioFxEnabled ? settings.bitCrushNoiseAmount : 0;
      crushNoiseMixGain.gain.value = amount * 0.85;
    }
    if (bassEq && midEq && trebleEq) {
      const eqScale = settings.isAudioFxEnabled ? 15 : 0;
      bassEq.gain.value = settings.bassAmount * eqScale;
      midEq.gain.value = settings.midAmount * eqScale;
      trebleEq.gain.value = settings.trebleAmount * eqScale;
    }
    if (stereoWidth) {
      const width = settings.isAudioFxEnabled ? 1 + settings.stereoWidthAmount : 1;
      stereoWidth.parameters.get("width")?.setValueAtTime(
        width,
        stereoWidth.context.currentTime
      );
    }
    if (roomDryGain && roomWetGain) {
      const amount = settings.isAudioFxEnabled ? settings.smallSpeakerRoomAmount : 0;
      roomDryGain.gain.value = Math.max(0.52, 1 - amount * 0.42);
      roomWetGain.gain.value = amount * 0.95;
    }
    if (wowFlutterDelay && wowLfo && wowLfoGain && flutterLfo && flutterLfoGain) {
      const amount = settings.isAudioFxEnabled ? settings.wowFlutterAmount : 0;
      wowFlutterDelay.delayTime.value = amount > 0 ? 6e-3 + amount * 4e-3 : 0;
      wowLfo.frequency.value = 0.18 + amount * 0.42;
      wowLfoGain.gain.value = amount * 23e-4;
      flutterLfo.frequency.value = 5.2 + amount * 6.5;
      flutterLfoGain.gain.value = amount * 6e-4;
    }
    const noiseHighpassNode = this.nodes.noiseHighpass;
    const noiseLowpassNode = this.nodes.noiseLowpass;
    const noiseWarmthNode = this.nodes.noiseWarmth;
    if (noiseHighpassNode && noiseLowpassNode && noiseWarmthNode && noiseGainNode) {
      const w = settings.noiseWarmthAmount;
      const a = settings.noiseAirAmount;
      const p = settings.noisePresenceAmount;
      noiseHighpassNode.frequency.value = 1100 - w * 1040;
      noiseHighpassNode.Q.value = 0.25 + w * 0.45;
      noiseLowpassNode.frequency.value = 2e3 + a * 4500;
      noiseWarmthNode.gain.value = w * 2;
      const noiseFilterNode = this.nodes.noiseFilter;
      if (noiseFilterNode) {
        noiseFilterNode.frequency.value = 3200;
        noiseFilterNode.gain.value = (p - 1) * 4;
      }
    }
    if (noiseGainNode) {
      const targetNoiseGain = settings.isNoiseEnabled && !settings.isMuted && isOutputEnabled && isPlaying ? Math.min(0.24, settings.noiseLevel * 5.5) : 0;
      noiseGainNode.gain.cancelScheduledValues(this.context.currentTime);
      noiseGainNode.gain.setValueAtTime(targetNoiseGain, this.context.currentTime);
    }
    if (crackleGainNode) {
      const isCrackleActive = settings.isNoiseEnabled && !settings.isMuted && isOutputEnabled && isPlaying;
      crackleGainNode.gain.value = isCrackleActive ? Math.min(0.24, settings.vinylDustAmount * 0.22 + settings.noiseLevel * 0.25) : 0;
    }
    if (vinylDustBedFilter && vinylDustBedGain) {
      const isDustBedActive = settings.isNoiseEnabled && !settings.isMuted && isOutputEnabled && isPlaying;
      const amount = isDustBedActive ? settings.vinylDustAmount : 0;
      vinylDustBedFilter.frequency.value = 2100 + amount * 2600;
      vinylDustBedFilter.Q.value = 0.35 + amount * 0.25;
      vinylDustBedGain.gain.value = amount * 0.11;
    }
    const echoDelayLine = this.nodes.echoDelayLine;
    const echoFeedbackGain = this.nodes.echoFeedbackGain;
    const echoWetGain = this.nodes.echoWetGain;
    if (echoDelayLine && echoFeedbackGain && echoWetGain) {
      const amount = settings.isAudioFxEnabled ? settings.delayAmount : 0;
      echoFeedbackGain.gain.value = amount * 0.5;
      echoWetGain.gain.value = amount * 0.55;
    }
    const hallReverbWetGain = this.nodes.hallReverbWetGain;
    if (hallReverbWetGain) {
      const amount = settings.isAudioFxEnabled ? settings.reverbAmount : 0;
      hallReverbWetGain.gain.value = amount * 2;
    }
    const chorusLfoGain1 = this.nodes.chorusLfoGain1;
    const chorusLfoGain2 = this.nodes.chorusLfoGain2;
    const chorusWetGain = this.nodes.chorusWetGain;
    if (chorusLfoGain1 && chorusLfoGain2 && chorusWetGain) {
      const amount = settings.isAudioFxEnabled ? settings.chorusAmount : 0;
      chorusWetGain.gain.value = amount * 0.6;
      chorusLfoGain1.gain.value = amount * 5e-3;
      chorusLfoGain2.gain.value = amount * 6e-3;
    }
    const tapeSaturator = this.nodes.tapeSaturator;
    if (tapeSaturator) {
      try {
        tapeSaturator.curve = createTapeSaturationCurve(
          settings.isAudioFxEnabled ? settings.tapeSaturationAmount : 0
        );
      } catch {
      }
    }
    const busCompressor = this.nodes.busCompressor;
    if (busCompressor) {
      const amount = settings.isAudioFxEnabled ? settings.compressorAmount : 0;
      busCompressor.threshold.value = -36 * amount;
      busCompressor.ratio.value = 1 + 9 * amount;
    }
    const fxOutputGain = this.nodes.fxOutputGain;
    if (fxOutputGain) {
      fxOutputGain.gain.value = settings.isAudioFxEnabled ? settings.fxOutputTrimAmount : 1;
    }
    const inputTrimGain = this.nodes.inputTrimGain;
    if (inputTrimGain) {
      inputTrimGain.gain.value = settings.isAudioFxEnabled ? settings.inputTrimAmount : 1;
    }
  }
  // ---------------------------------------------------------------------------
  // Private initialization helpers
  // ---------------------------------------------------------------------------
  async loadWorklets(context) {
    let bitcrusher = null;
    let bitcrusherDiff = null;
    let stereoWidth = null;
    const AudioWorkletNodeCtor = this.resolveAudioWorkletNodeCtor();
    if (this.enableAudioWorklet && "audioWorklet" in context && AudioWorkletNodeCtor) {
      const bitcrusherModuleUrl = new URL("./bitcrusherWorklet.js", import.meta.url);
      await context.audioWorklet.addModule(bitcrusherModuleUrl.href);
      bitcrusher = new AudioWorkletNodeCtor(context, "retro-bitcrusher", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2]
      });
      bitcrusherDiff = new AudioWorkletNodeCtor(context, "retro-bitcrusher", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2]
      });
      const stereoWidthModuleUrl = new URL("./stereoWidthWorklet.js", import.meta.url);
      await context.audioWorklet.addModule(stereoWidthModuleUrl.href);
      stereoWidth = new AudioWorkletNodeCtor(context, "retro-stereo-width", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2]
      });
    }
    return { bitcrusher, bitcrusherDiff, stereoWidth };
  }
  buildAndWireNodes(context, worklets) {
    const masterGain = context.createGain();
    let recordingDestination = null;
    if ("createMediaStreamDestination" in context) {
      try {
        recordingDestination = context.createMediaStreamDestination();
      } catch {
        recordingDestination = null;
      }
    }
    const radioToneHighpass = context.createBiquadFilter();
    const radioToneLowpass = context.createBiquadFilter();
    const radioTonePresence = context.createBiquadFilter();
    const lowpass = context.createBiquadFilter();
    const highshelf = context.createBiquadFilter();
    const drive = context.createWaveShaper();
    const postCrushLowpass = context.createBiquadFilter();
    const crushNoiseWetGain = context.createGain();
    const crushNoiseDryGain = context.createGain();
    const crushNoiseMixGain = context.createGain();
    const crushNoisePostLowpass = context.createBiquadFilter();
    const bassEq = context.createBiquadFilter();
    const midEq = context.createBiquadFilter();
    const trebleEq = context.createBiquadFilter();
    const roomDryGain = context.createGain();
    const roomConvolver = context.createConvolver();
    const roomWetGain = context.createGain();
    const wowFlutterDelay = context.createDelay(0.05);
    const wowLfo = context.createOscillator();
    const wowLfoGain = context.createGain();
    const flutterLfo = context.createOscillator();
    const flutterLfoGain = context.createGain();
    const tapeSaturator = context.createWaveShaper();
    const outputBus = context.createGain();
    const busCompressor = context.createDynamicsCompressor();
    const echoDelayLine = context.createDelay(1);
    const echoFeedbackGain = context.createGain();
    const echoWetGain = context.createGain();
    const hallReverbConvolver = context.createConvolver();
    const hallReverbWetGain = context.createGain();
    const chorusDelay1 = context.createDelay(0.05);
    const chorusDelay2 = context.createDelay(0.05);
    const chorusLfo1 = context.createOscillator();
    const chorusLfo2 = context.createOscillator();
    const chorusLfoGain1 = context.createGain();
    const chorusLfoGain2 = context.createGain();
    const chorusWetGain = context.createGain();
    const fxOutputGain = context.createGain();
    const inputTrimGain = context.createGain();
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;
    const noiseSource = context.createBufferSource();
    const noiseHighpass = context.createBiquadFilter();
    const noiseLowpass = context.createBiquadFilter();
    const noiseWarmth = context.createBiquadFilter();
    const noisePresence = context.createBiquadFilter();
    const noisePanner = context.createStereoPanner();
    const noiseGain = context.createGain();
    const noiseLfo = context.createOscillator();
    const noiseLfoGain = context.createGain();
    const crackleSource = context.createBufferSource();
    const crackleFilter = context.createBiquadFilter();
    const vinylDustBedFilter = context.createBiquadFilter();
    const vinylDustBedGain = context.createGain();
    const crackleGain = context.createGain();
    radioToneHighpass.type = "highpass";
    radioToneLowpass.type = "lowpass";
    radioTonePresence.type = "peaking";
    lowpass.type = "lowpass";
    highshelf.type = "highshelf";
    highshelf.frequency.value = 2800;
    drive.oversample = "4x";
    postCrushLowpass.type = "lowpass";
    postCrushLowpass.frequency.value = 18e3;
    postCrushLowpass.Q.value = 0.5;
    crushNoiseWetGain.gain.value = 1;
    crushNoiseDryGain.gain.value = -1;
    crushNoiseMixGain.gain.value = 0;
    crushNoisePostLowpass.type = "lowpass";
    crushNoisePostLowpass.frequency.value = 18e3;
    crushNoisePostLowpass.Q.value = 0.5;
    bassEq.type = "lowshelf";
    bassEq.frequency.value = 180;
    midEq.type = "peaking";
    midEq.frequency.value = 1200;
    midEq.Q.value = 0.5;
    trebleEq.type = "highshelf";
    trebleEq.frequency.value = 2800;
    roomConvolver.buffer = createSmallRoomImpulse(context);
    wowFlutterDelay.delayTime.value = 0;
    wowLfo.type = "sine";
    flutterLfo.type = "sine";
    tapeSaturator.curve = createTapeSaturationCurve(0);
    tapeSaturator.oversample = "4x";
    outputBus.gain.value = 1;
    busCompressor.knee.value = 10;
    busCompressor.attack.value = 3e-3;
    busCompressor.release.value = 0.12;
    busCompressor.threshold.value = 0;
    busCompressor.ratio.value = 1;
    echoDelayLine.delayTime.value = 0.32;
    echoFeedbackGain.gain.value = 0;
    echoWetGain.gain.value = 0;
    hallReverbConvolver.buffer = createHallReverbImpulse(context);
    hallReverbWetGain.gain.value = 0;
    chorusDelay1.delayTime.value = 0.018;
    chorusDelay2.delayTime.value = 0.023;
    chorusLfo1.type = "sine";
    chorusLfo2.type = "sine";
    chorusLfo1.frequency.value = 0.8;
    chorusLfo2.frequency.value = 1.3;
    chorusLfoGain1.gain.value = 0;
    chorusLfoGain2.gain.value = 0;
    chorusWetGain.gain.value = 0;
    fxOutputGain.gain.value = 1;
    inputTrimGain.gain.value = 1;
    masterGain.gain.value = 0;
    noiseGain.gain.value = 0;
    noiseSource.buffer = createTintedNoiseBuffer(context);
    noiseSource.loop = true;
    noiseHighpass.type = "highpass";
    noiseHighpass.frequency.value = 220;
    noiseHighpass.Q.value = 0.5;
    noiseLowpass.type = "lowpass";
    noiseLowpass.frequency.value = 4500;
    noiseLowpass.Q.value = 0.2;
    noiseWarmth.type = "peaking";
    noiseWarmth.frequency.value = 350;
    noiseWarmth.Q.value = 0.9;
    noiseWarmth.gain.value = 1.7;
    noisePresence.type = "peaking";
    noisePresence.frequency.value = 3200;
    noisePresence.Q.value = 0.8;
    noisePresence.gain.value = -2;
    noiseLfo.type = "sine";
    noiseLfo.frequency.value = 0.021;
    noiseLfoGain.gain.value = 0.08;
    crackleSource.buffer = createVinylDustBuffer(context);
    crackleSource.loop = true;
    crackleFilter.type = "highpass";
    crackleFilter.frequency.value = 1250;
    crackleFilter.Q.value = 0.35;
    vinylDustBedFilter.type = "bandpass";
    vinylDustBedFilter.frequency.value = 2400;
    vinylDustBedFilter.Q.value = 0.4;
    vinylDustBedGain.gain.value = 0;
    crackleGain.gain.value = 0;
    const { bitcrusher, bitcrusherDiff, stereoWidth } = worklets;
    wowLfo.connect(wowLfoGain);
    wowLfoGain.connect(wowFlutterDelay.delayTime);
    flutterLfo.connect(flutterLfoGain);
    flutterLfoGain.connect(wowFlutterDelay.delayTime);
    inputTrimGain.connect(wowFlutterDelay);
    wowFlutterDelay.connect(radioToneHighpass);
    radioToneHighpass.connect(radioToneLowpass);
    radioToneLowpass.connect(radioTonePresence);
    radioTonePresence.connect(lowpass);
    lowpass.connect(highshelf);
    highshelf.connect(drive);
    if (bitcrusher) {
      drive.connect(bitcrusher);
      bitcrusher.connect(postCrushLowpass);
    } else {
      drive.connect(postCrushLowpass);
    }
    if (bitcrusherDiff) {
      drive.connect(bitcrusherDiff);
      bitcrusherDiff.connect(crushNoisePostLowpass);
      crushNoisePostLowpass.connect(crushNoiseWetGain);
      drive.connect(crushNoiseDryGain);
      crushNoiseWetGain.connect(crushNoiseMixGain);
      crushNoiseDryGain.connect(crushNoiseMixGain);
      crushNoiseMixGain.connect(bassEq);
    }
    postCrushLowpass.connect(bassEq);
    bassEq.connect(midEq);
    midEq.connect(trebleEq);
    trebleEq.connect(tapeSaturator);
    if (stereoWidth) {
      tapeSaturator.connect(stereoWidth);
      stereoWidth.connect(roomDryGain);
      stereoWidth.connect(roomConvolver);
    } else {
      tapeSaturator.connect(roomDryGain);
      tapeSaturator.connect(roomConvolver);
    }
    roomConvolver.connect(roomWetGain);
    roomDryGain.connect(masterGain);
    roomWetGain.connect(masterGain);
    masterGain.connect(outputBus);
    masterGain.connect(echoDelayLine);
    echoDelayLine.connect(echoFeedbackGain);
    echoFeedbackGain.connect(echoDelayLine);
    echoDelayLine.connect(echoWetGain);
    echoWetGain.connect(outputBus);
    masterGain.connect(hallReverbConvolver);
    hallReverbConvolver.connect(hallReverbWetGain);
    hallReverbWetGain.connect(outputBus);
    masterGain.connect(chorusDelay1);
    masterGain.connect(chorusDelay2);
    chorusLfo1.connect(chorusLfoGain1);
    chorusLfoGain1.connect(chorusDelay1.delayTime);
    chorusLfo2.connect(chorusLfoGain2);
    chorusLfoGain2.connect(chorusDelay2.delayTime);
    chorusDelay1.connect(chorusWetGain);
    chorusDelay2.connect(chorusWetGain);
    chorusWetGain.connect(outputBus);
    outputBus.connect(busCompressor);
    busCompressor.connect(fxOutputGain);
    fxOutputGain.connect(analyser);
    noiseSource.connect(noiseHighpass);
    noiseHighpass.connect(noiseLowpass);
    noiseLowpass.connect(noiseWarmth);
    noiseWarmth.connect(noisePresence);
    noisePresence.connect(noisePanner);
    noisePanner.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseLfo.connect(noiseLfoGain);
    noiseLfoGain.connect(noisePanner.pan);
    crackleSource.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(masterGain);
    crackleSource.connect(vinylDustBedFilter);
    vinylDustBedFilter.connect(vinylDustBedGain);
    vinylDustBedGain.connect(masterGain);
    return {
      masterGain,
      recordingDestination,
      radioToneHighpass,
      radioToneLowpass,
      radioTonePresence,
      lofiLowpass: lowpass,
      lofiHighshelf: highshelf,
      lofiDrive: drive,
      bitcrusher,
      bitcrusherDiff,
      crushNoiseWetGain,
      crushNoiseDryGain,
      crushNoiseMixGain,
      crushNoisePostLowpass,
      postCrushLowpass,
      bassEq,
      midEq,
      trebleEq,
      stereoWidth,
      roomDryGain,
      roomConvolver,
      roomWetGain,
      wowFlutterDelay,
      wowLfo,
      wowLfoGain,
      flutterLfo,
      flutterLfoGain,
      noiseSource,
      noiseHighpass,
      noiseLowpass,
      noiseWarmth,
      noiseFilter: noisePresence,
      noisePanner,
      noiseGain,
      noiseLfo,
      noiseLfoGain,
      crackleSource,
      crackleFilter,
      vinylDustBedFilter,
      vinylDustBedGain,
      crackleGain,
      outputBus,
      echoDelayLine,
      echoFeedbackGain,
      echoWetGain,
      hallReverbConvolver,
      hallReverbWetGain,
      chorusDelay1,
      chorusDelay2,
      chorusLfo1,
      chorusLfo2,
      chorusLfoGain1,
      chorusLfoGain2,
      chorusWetGain,
      tapeSaturator,
      busCompressor,
      fxOutputGain,
      inputTrimGain,
      analyser
    };
  }
  startSources() {
    this.nodes.noiseSource?.start();
    this.nodes.noiseLfo?.start();
    this.nodes.crackleSource?.start();
    this.nodes.wowLfo?.start();
    this.nodes.flutterLfo?.start();
    this.nodes.chorusLfo1?.start();
    this.nodes.chorusLfo2?.start();
  }
  applyAutoConnect() {
    const fxOutputGain = this.nodes.fxOutputGain;
    if (!fxOutputGain) return;
    if (this.connectOutputToDestination) {
      fxOutputGain.connect(this.context.destination);
      this.autoConnections.add(this.context.destination);
    }
    const recordingDestination = this.nodes.recordingDestination;
    if (recordingDestination && this.connectOutputToRecordingDestination) {
      fxOutputGain.connect(recordingDestination);
      this.autoConnections.add(recordingDestination);
    }
  }
  async initNodes() {
    const context = this.context;
    const worklets = await this.loadWorklets(context);
    const built = this.buildAndWireNodes(context, worklets);
    Object.assign(this.nodes, { audioContext: context, ...built });
    this.startSources();
    this.applyAutoConnect();
  }
  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  async ensureInitialized() {
    if (this.context.state === "closed") {
      this.resetNodes();
      return null;
    }
    if (!this.nodes.audioContext || !this.nodes.masterGain) {
      await this.initNodes();
    }
    const activeContext = this.nodes.audioContext;
    if (activeContext?.state === "suspended") {
      try {
        await activeContext.resume();
      } catch {
      }
    }
    this.updateAudioNodes();
    return activeContext;
  }
  async connectSourceNode(sourceNode) {
    const context = await this.ensureInitialized();
    if (!context) {
      this.debugAudio("connectSourceNode:no-context");
      return;
    }
    if (this.nodes.sourceNode) {
      try {
        this.nodes.sourceNode.disconnect();
      } catch {
      }
      this.nodes.sourceNode = null;
    }
    sourceNode.connect(this.input);
    this.nodes.sourceNode = sourceNode;
    this.updateAudioNodes();
    this.debugAudio("connectSourceNode:connected", {
      audioContextState: context.state
    });
  }
  async connect(destinationNode, outputIndex, inputIndex) {
    const context = await this.ensureInitialized();
    if (!context) {
      this.debugAudio("connect:no-context");
      return;
    }
    const outputNode = this.output;
    if (!outputNode) {
      this.debugAudio("connect:no-output-node", {
        audioContextState: context.state
      });
      return;
    }
    if (isAudioParamLike(destinationNode)) {
      outputNode.connect(destinationNode, outputIndex);
      this.externalConnections.add(destinationNode);
      return;
    }
    if (this.connectOutputToDestination && destinationNode === context.destination) {
      this.debugAudio("connect:skipped-double-destination");
      return;
    }
    outputNode.connect(destinationNode, outputIndex, inputIndex);
    this.externalConnections.add(destinationNode);
  }
  disconnect(destination) {
    const outputNode = this.output;
    if (!outputNode) return;
    if (destination !== void 0) {
      try {
        if (isAudioParamLike(destination)) {
          outputNode.disconnect(destination);
        } else {
          outputNode.disconnect(destination);
        }
      } catch {
      }
      this.externalConnections.delete(destination);
    } else {
      for (const dest of this.externalConnections) {
        try {
          if (isAudioParamLike(dest)) {
            outputNode.disconnect(dest);
          } else {
            outputNode.disconnect(dest);
          }
        } catch {
        }
      }
      this.externalConnections.clear();
    }
  }
  async dispose() {
    const scheduledNodes = [
      this.nodes.noiseSource,
      this.nodes.noiseLfo,
      this.nodes.crackleSource,
      this.nodes.wowLfo,
      this.nodes.flutterLfo,
      this.nodes.chorusLfo1,
      this.nodes.chorusLfo2
    ];
    for (const node of scheduledNodes) {
      try {
        node?.stop();
      } catch {
      }
      try {
        node?.disconnect();
      } catch {
      }
    }
    try {
      this.nodes.sourceNode?.disconnect();
    } catch {
    }
    this.disconnect();
    const outputNode = this.output;
    if (outputNode) {
      for (const dest of this.autoConnections) {
        try {
          if (isAudioParamLike(dest)) {
            outputNode.disconnect(dest);
          } else {
            outputNode.disconnect(dest);
          }
        } catch {
        }
      }
    }
    this.autoConnections.clear();
    const internalNodes = [
      this.nodes.wowFlutterDelay,
      this.nodes.wowLfoGain,
      this.nodes.flutterLfoGain,
      this.nodes.radioToneHighpass,
      this.nodes.radioToneLowpass,
      this.nodes.radioTonePresence,
      this.nodes.lofiLowpass,
      this.nodes.lofiHighshelf,
      this.nodes.lofiDrive,
      this.nodes.bitcrusher,
      this.nodes.bitcrusherDiff,
      this.nodes.crushNoiseWetGain,
      this.nodes.crushNoiseDryGain,
      this.nodes.crushNoiseMixGain,
      this.nodes.crushNoisePostLowpass,
      this.nodes.postCrushLowpass,
      this.nodes.bassEq,
      this.nodes.midEq,
      this.nodes.trebleEq,
      this.nodes.tapeSaturator,
      this.nodes.stereoWidth,
      this.nodes.roomDryGain,
      this.nodes.roomConvolver,
      this.nodes.roomWetGain,
      this.nodes.echoDelayLine,
      this.nodes.echoFeedbackGain,
      this.nodes.echoWetGain,
      this.nodes.hallReverbConvolver,
      this.nodes.hallReverbWetGain,
      this.nodes.chorusDelay1,
      this.nodes.chorusDelay2,
      this.nodes.chorusLfoGain1,
      this.nodes.chorusLfoGain2,
      this.nodes.chorusWetGain,
      this.nodes.noisePanner,
      this.nodes.noiseGain,
      this.nodes.noiseHighpass,
      this.nodes.noiseLowpass,
      this.nodes.noiseFilter,
      this.nodes.noiseLfoGain,
      this.nodes.crackleFilter,
      this.nodes.vinylDustBedFilter,
      this.nodes.vinylDustBedGain,
      this.nodes.crackleGain,
      this.nodes.masterGain,
      this.nodes.outputBus,
      this.nodes.busCompressor,
      this.nodes.fxOutputGain
    ];
    for (const node of internalNodes) {
      try {
        node?.disconnect();
      } catch {
      }
    }
    this.resetNodes();
  }
  async ensureAudioContext() {
    return this.ensureInitialized();
  }
};
function createRetroAudioEngine({
  context,
  connectOutputToDestination = false,
  connectOutputToRecordingDestination = false,
  //enableAudioWorklet = true,
  ...options
}) {
  const currentSettings = resolveRetroAudioSettings(options);
  const runtimeState = {
    settings: currentSettings,
    isPlaying: options.isPlaying ?? true,
    isOutputEnabled: options.previewKind === void 0 ? true : options.previewKind === "video" || options.previewKind === "audio" || options.previewKind === "capture"
  };
  return new TetoricaRetroAudioNode({
    context,
    instanceLabel: options.instanceLabel ?? "tetorica-retro-audio-engine",
    runtimeState,
    connectOutputToDestination,
    connectOutputToRecordingDestination,
    enableAudioWorklet: options.enableAudioWorklet
  });
}
function createTetoricaRetroAudioNode(context, options = {}) {
  return createRetroAudioEngine({
    context,
    ...options
  });
}
export {
  TetoricaRetroAudioNode,
  createRetroAudioEngine,
  createTetoricaRetroAudioNode
};
