import {
  DEFAULT_AUDIO_SETTINGS,
  RETRO_AUDIO_PRESET_SETTINGS,
  type RetroAudioPresetKey,
  type RetroAudioSettings,
} from "./preset.ts";

export type RetroAudioPreviewKind = "video" | "audio" | "image" | "capture" | null;

export type CurrentRef<T> = {
  current: T;
};

export type TetoricaRetroAudioNodeOptions = {
  instanceLabel?: string;
  preset?: RetroAudioPresetKey;
  params?: Partial<RetroAudioSettings>;
  previewKind?: RetroAudioPreviewKind;
  isPlaying?: boolean;
  enableAudioWorklet?: boolean;
};

export type RetroAudioSettingsRefs = {
  isMutedRef: CurrentRef<boolean>;
  volumeRef: CurrentRef<number>;
  playbackRateRef: CurrentRef<number>;
  isLoopingRef: CurrentRef<boolean>;
  isAudioFxEnabledRef: CurrentRef<boolean>;
  lofiAmountRef: CurrentRef<number>;
  radioToneAmountRef: CurrentRef<number>;
  bitCrushAmountRef: CurrentRef<number>;
  sampleRateReductionAmountRef: CurrentRef<number>;
  bassAmountRef: CurrentRef<number>;
  midAmountRef: CurrentRef<number>;
  trebleAmountRef: CurrentRef<number>;
  stereoWidthAmountRef: CurrentRef<number>;
  smallSpeakerRoomAmountRef: CurrentRef<number>;
  wowFlutterAmountRef: CurrentRef<number>;
  isNoiseEnabledRef: CurrentRef<boolean>;
  noiseLevelRef: CurrentRef<number>;
  vinylDustAmountRef: CurrentRef<number>;
};

export type CreateRetroAudioEngineParams = {
  context?: AudioContextLike;
  createAudioContext?: () => AudioContextLike;
  connectOutputToDestination?: boolean;
  connectOutputToRecordingDestination?: boolean;
} & TetoricaRetroAudioNodeOptions;

type CreateManagedRetroAudioEngineParams = {
  instanceLabel: string;
  runtimeState: {
    settings: RetroAudioSettings;
    isPlaying: boolean;
    isOutputEnabled: boolean;
  };
  createAudioContext?: () => AudioContextLike;
  connectOutputToDestination?: boolean;
  connectOutputToRecordingDestination?: boolean;
  enableAudioWorklet?: boolean;
};

type AudioContextLike = AudioContext;
type AudioContextCtor = new () => AudioContextLike;

const isRetroPlayerDebugEnabled = () =>
  Boolean(
    (globalThis as typeof globalThis & { __RETRO_PLAYER_DEBUG__?: boolean })
      .__RETRO_PLAYER_DEBUG__,
  );

function createDriveCurve(amount: number) {
  const samples = 256;
  const curve = new Float32Array(samples);
  const drive = 1 + amount * 5;

  for (let index = 0; index < samples; index += 1) {
    const x = (index * 2) / (samples - 1) - 1;
    curve[index] = Math.tanh(x * drive);
  }

  return curve;
}

function createSmallRoomImpulse(context: AudioContext) {
  const duration = 0.22;
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const impulse = context.createBuffer(2, length, context.sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const channelData = impulse.getChannelData(channel);
    for (let index = 0; index < channelData.length; index += 1) {
      const t = index / channelData.length;
      const decay = (1 - t) ** 1.85;
      const flutter = 0.78 + 0.22 * Math.sin(t * 42 + channel * 0.9);
      const earlyReflection = Math.sin(t * 130 + channel * 0.35) * 0.08;
      channelData[index] =
        ((Math.random() * 2 - 1) + earlyReflection) * decay * flutter * 0.28;
    }
  }

  return impulse;
}

function createTintedNoiseBuffer(context: AudioContext) {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(2, length, context.sampleRate);
  let brownState = 0;
  let airState = 0;

  for (let index = 0; index < length; index += 1) {
    const white = Math.random() * 2 - 1;
    brownState = (brownState + white * 0.045) / 1.045;
    airState = airState * 0.82 + white * 0.18;
    const body = brownState * 1.35;
    const air = (white - airState) * 0.55;
    const sample = Math.max(-1, Math.min(1, body + air));

    for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
      const channelData = buffer.getChannelData(channel);
      const channelJitter = (Math.random() * 2 - 1) * 0.012;
      channelData[index] = Math.max(-1, Math.min(1, sample + channelJitter));
    }
  }

  return buffer;
}

function createVinylDustBuffer(context: AudioContext) {
  const length = context.sampleRate * 2;
  const monoData = new Float32Array(length);
  let index = 0;
  let dustState = 0;

  while (index < length) {
    const white = Math.random() * 2 - 1;
    dustState = dustState * 0.72 + white * 0.28;
    monoData[index] += (white - dustState) * 0.018;

    const random = Math.random();

    if (random < 0.0034) {
      const crackleLength = 8 + Math.floor(Math.random() * 42);
      const crackleAmplitude = 0.11 + Math.random() * 0.28;
      const polarity = Math.random() < 0.5 ? -1 : 1;

      for (let offset = 0; offset < crackleLength && index + offset < length; offset += 1) {
        const decay = Math.exp(-offset / (2.4 + Math.random() * 5));
        monoData[index + offset] +=
          polarity * crackleAmplitude * decay * (0.7 + Math.random() * 0.3);
      }

      index += crackleLength + Math.floor(Math.random() * 640);
      continue;
    }

    if (random < 0.0038) {
      const popLength = 90 + Math.floor(Math.random() * 260);
      const popAmplitude = 0.055 + Math.random() * 0.11;
      const phase = Math.random() * Math.PI * 2;

      for (let offset = 0; offset < popLength && index + offset < length; offset += 1) {
        const decay = Math.exp(-offset / (18 + Math.random() * 40));
        const wobble = Math.sin(phase + offset * (0.22 + Math.random() * 0.06));
        monoData[index + offset] += popAmplitude * decay * wobble;
      }

      index += popLength + Math.floor(Math.random() * 2200);
      continue;
    }

    index += 1;
  }

  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const channelData = buffer.getChannelData(channel);

    for (let sampleIndex = 0; sampleIndex < length; sampleIndex += 1) {
      const channelJitter = (Math.random() * 2 - 1) * 0.0035;
      channelData[sampleIndex] = Math.max(
        -1,
        Math.min(1, monoData[sampleIndex] + channelJitter),
      );
    }
  }

  return buffer;
}

function isAudioParamLike(value: AudioNode | AudioParam): value is AudioParam {
  const AudioParamCtor = (globalThis as typeof globalThis & {
    AudioParam?: typeof AudioParam;
  }).AudioParam;

  if (typeof AudioParamCtor === "function") {
    return value instanceof AudioParamCtor;
  }

  return (
    typeof value === "object" &&
    value !== null &&
    "setValueAtTime" in value &&
    "value" in value
  );
}

function resolveRetroAudioSettings({
  preset,
  params,
}: {
  preset?: RetroAudioPresetKey;
  params?: Partial<RetroAudioSettings>;
}): RetroAudioSettings {
  return {
    ...DEFAULT_AUDIO_SETTINGS,
    ...(preset ? RETRO_AUDIO_PRESET_SETTINGS[preset] : null),
    ...params,
  };
}

export class TetoricaRetroAudioNode {
  private readonly instanceLabel: string;
  private readonly createAudioContext?: () => AudioContextLike;
  private readonly connectOutputToDestination: boolean;
  private readonly connectOutputToRecordingDestination: boolean;
  private readonly enableAudioWorklet: boolean;
  private readonly runtimeState: CreateManagedRetroAudioEngineParams["runtimeState"];
  private readonly currentSettings: RetroAudioSettings;
  private readonly nodes = {
    audioContext: null as AudioContext | null,
    masterGain: null as GainNode | null,
    radioToneHighpass: null as BiquadFilterNode | null,
    radioToneLowpass: null as BiquadFilterNode | null,
    radioTonePresence: null as BiquadFilterNode | null,
    recordingDestination: null as MediaStreamAudioDestinationNode | null,
    lofiLowpass: null as BiquadFilterNode | null,
    lofiHighshelf: null as BiquadFilterNode | null,
    lofiDrive: null as WaveShaperNode | null,
    bitcrusher: null as AudioWorkletNode | null,
    bassEq: null as BiquadFilterNode | null,
    midEq: null as BiquadFilterNode | null,
    trebleEq: null as BiquadFilterNode | null,
    stereoWidth: null as AudioWorkletNode | null,
    roomDryGain: null as GainNode | null,
    roomConvolver: null as ConvolverNode | null,
    roomWetGain: null as GainNode | null,
    wowFlutterDelay: null as DelayNode | null,
    wowLfo: null as OscillatorNode | null,
    wowLfoGain: null as GainNode | null,
    flutterLfo: null as OscillatorNode | null,
    flutterLfoGain: null as GainNode | null,
    noiseSource: null as AudioBufferSourceNode | null,
    noiseFilter: null as BiquadFilterNode | null,
    noisePanner: null as StereoPannerNode | null,
    noiseGain: null as GainNode | null,
    noiseLfo: null as OscillatorNode | null,
    noiseLfoGain: null as GainNode | null,
    crackleSource: null as AudioBufferSourceNode | null,
    crackleFilter: null as BiquadFilterNode | null,
    vinylDustBedFilter: null as BiquadFilterNode | null,
    vinylDustBedGain: null as GainNode | null,
    crackleGain: null as GainNode | null,
    sourceNode: null as AudioNode | null,
  };

  constructor({
    instanceLabel,
    runtimeState,
    createAudioContext,
    connectOutputToDestination = true,
    connectOutputToRecordingDestination = true,
    enableAudioWorklet = true,
  }: CreateManagedRetroAudioEngineParams) {
    this.instanceLabel = instanceLabel;
    this.runtimeState = runtimeState;
    this.currentSettings = runtimeState.settings;
    this.createAudioContext = createAudioContext;
    this.connectOutputToDestination = connectOutputToDestination;
    this.connectOutputToRecordingDestination = connectOutputToRecordingDestination;
    this.enableAudioWorklet = enableAudioWorklet;
  }

  get input() {
    return this.nodes.wowFlutterDelay ?? this.nodes.lofiLowpass;
  }

  get output() {
    return this.nodes.masterGain;
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

  debugAudio(label: string, payload?: Record<string, unknown>) {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    console.log(`[retro-player audio][${this.instanceLabel}] ${label}`, payload ?? {});
  }

  getParams() {
    return { ...this.currentSettings };
  }

  setParams(nextParams: Partial<RetroAudioSettings>, isPartialUpdate = false) {
    const nextSettings = isPartialUpdate
      ? { ...this.currentSettings, ...nextParams }
      : { ...DEFAULT_AUDIO_SETTINGS, ...nextParams };

    Object.assign(this.currentSettings, nextSettings);
    this.updateAudioNodes();
  }

  applyPreset(
    preset: RetroAudioPresetKey,
    extraParams?: Partial<RetroAudioSettings>,
  ) {
    const nextSettings = resolveRetroAudioSettings({
      preset,
      params: extraParams,
    });
    Object.assign(this.currentSettings, nextSettings);
    this.updateAudioNodes();
  }

  setIsPlaying(nextIsPlaying: boolean) {
    this.runtimeState.isPlaying = nextIsPlaying;
    this.updateAudioNodes();
  }

  setOutputEnabled(isEnabled: boolean) {
    this.runtimeState.isOutputEnabled = isEnabled;
    this.updateAudioNodes();
  }

  private resetNodes() {
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
    });
  }

  private resolveAudioContextCtor(): AudioContextCtor | null {
    const ctor = (globalThis as typeof globalThis & { AudioContext?: AudioContextCtor })
      .AudioContext;
    return typeof ctor === "function" ? ctor : null;
  }

  private resolveAudioWorkletNodeCtor() {
    const ctor = (
      globalThis as typeof globalThis & {
        AudioWorkletNode?: typeof AudioWorkletNode;
      }
    ).AudioWorkletNode;
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
      masterGain.gain.value = audibleMasterGain;
    }

    if (radioToneHighpass && radioToneLowpass && radioTonePresence) {
      const amount = settings.isAudioFxEnabled ? settings.radioToneAmount : 0;
      radioToneHighpass.frequency.value = 20 + amount * 430;
      radioToneHighpass.Q.value = 0.4 + amount * 0.35;
      radioToneLowpass.frequency.value = 20000 - amount * 17400;
      radioToneLowpass.Q.value = 0.2 + amount * 0.9;
      radioTonePresence.frequency.value = 1700;
      radioTonePresence.Q.value = 0.8 + amount * 1.4;
      radioTonePresence.gain.value = amount * 6;
    }

    if (lowpass && highshelf && drive) {
      const amount = settings.isAudioFxEnabled ? settings.lofiAmount : 0;
      lowpass.frequency.value = 16000 - amount * 14200;
      lowpass.Q.value = 0.3 + amount * 1.8;
      highshelf.gain.value = -amount * 18;
      try {
        drive.curve = createDriveCurve(amount * 0.6);
      } catch {
        // Some non-browser Web Audio implementations reject reassigning curve.
      }
    }

    if (bitcrusher) {
      const isEnabled = settings.isAudioFxEnabled;
      const bitDepth = 16 - (isEnabled ? settings.bitCrushAmount : 0) * 12;
      const holdFrames = 1 + (isEnabled ? settings.sampleRateReductionAmount : 0) * 23;
      const mix = isEnabled
        ? Math.max(settings.bitCrushAmount, settings.sampleRateReductionAmount)
        : 0;

      bitcrusher.parameters.get("bitDepth")?.setValueAtTime(
        bitDepth,
        bitcrusher.context.currentTime,
      );
      bitcrusher.parameters.get("holdFrames")?.setValueAtTime(
        holdFrames,
        bitcrusher.context.currentTime,
      );
      bitcrusher.parameters.get("mix")?.setValueAtTime(
        mix,
        bitcrusher.context.currentTime,
      );
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
        stereoWidth.context.currentTime,
      );
    }

    if (roomDryGain && roomWetGain) {
      const amount = settings.isAudioFxEnabled ? settings.smallSpeakerRoomAmount : 0;
      roomDryGain.gain.value = Math.max(0.52, 1 - amount * 0.42);
      roomWetGain.gain.value = amount * 0.95;
    }

    if (wowFlutterDelay && wowLfo && wowLfoGain && flutterLfo && flutterLfoGain) {
      const amount = settings.isAudioFxEnabled ? settings.wowFlutterAmount : 0;
      wowFlutterDelay.delayTime.value = 0.006 + amount * 0.004;
      wowLfo.frequency.value = 0.18 + amount * 0.42;
      wowLfoGain.gain.value = amount * 0.0035;
      flutterLfo.frequency.value = 5.2 + amount * 6.5;
      flutterLfoGain.gain.value = amount * 0.0009;
    }

    if (noiseGainNode) {
      noiseGainNode.gain.value =
        settings.isNoiseEnabled && !settings.isMuted && isOutputEnabled && isPlaying
          ? Math.min(0.24, settings.noiseLevel * 5.5)
          : 0;
    }

    if (crackleGainNode) {
      const isCrackleActive =
        settings.isNoiseEnabled && !settings.isMuted && isOutputEnabled && isPlaying;
      crackleGainNode.gain.value = isCrackleActive
        ? Math.min(0.24, settings.vinylDustAmount * 0.22 + settings.noiseLevel * 0.25)
        : 0;
    }

    if (vinylDustBedFilter && vinylDustBedGain) {
      const isDustBedActive =
        settings.isNoiseEnabled && !settings.isMuted && isOutputEnabled && isPlaying;
      const amount = isDustBedActive ? settings.vinylDustAmount : 0;
      vinylDustBedFilter.frequency.value = 2100 + amount * 2600;
      vinylDustBedFilter.Q.value = 0.35 + amount * 0.25;
      vinylDustBedGain.gain.value = amount * 0.11;
    }
  }

  async ensureAudioContext() {
    const AudioContextCtor = this.resolveAudioContextCtor();
    if (!AudioContextCtor) return null;

    if (this.nodes.audioContext?.state === "closed") {
      this.resetNodes();
    }

    if (!this.nodes.audioContext) {
      const context = this.createAudioContext ? this.createAudioContext() : new AudioContextCtor();
      const masterGain = context.createGain();
      let recordingDestination: MediaStreamAudioDestinationNode | null = null;
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

      let bitcrusher: AudioWorkletNode | null = null;
      let stereoWidth: AudioWorkletNode | null = null;

      const AudioWorkletNodeCtor = this.resolveAudioWorkletNodeCtor();
      if (this.enableAudioWorklet && "audioWorklet" in context && AudioWorkletNodeCtor) {
        const bitcrusherModuleUrl = new URL("./bitcrusherWorklet.js", import.meta.url);
        await context.audioWorklet.addModule(bitcrusherModuleUrl.href);
        bitcrusher = new AudioWorkletNodeCtor(context, "retro-bitcrusher", {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          outputChannelCount: [2],
        });

        const stereoWidthModuleUrl = new URL("./stereoWidthWorklet.js", import.meta.url);
        await context.audioWorklet.addModule(stereoWidthModuleUrl.href);
        stereoWidth = new AudioWorkletNodeCtor(context, "retro-stereo-width", {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          outputChannelCount: [2],
        });
      }

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
      radioToneHighpass.type = "highpass";
      radioToneLowpass.type = "lowpass";
      radioTonePresence.type = "peaking";
      lowpass.type = "lowpass";
      highshelf.type = "highshelf";
      bassEq.type = "lowshelf";
      bassEq.frequency.value = 180;
      midEq.type = "peaking";
      midEq.frequency.value = 1200;
      midEq.Q.value = 0.9;
      trebleEq.type = "highshelf";
      trebleEq.frequency.value = 3200;
      roomConvolver.buffer = createSmallRoomImpulse(context);
      highshelf.frequency.value = 2800;
      drive.oversample = "4x";
      wowFlutterDelay.delayTime.value = 0.006;
      wowLfo.type = "sine";
      flutterLfo.type = "sine";

      wowLfo.connect(wowLfoGain);
      wowLfoGain.connect(wowFlutterDelay.delayTime);
      flutterLfo.connect(flutterLfoGain);
      flutterLfoGain.connect(wowFlutterDelay.delayTime);

      wowFlutterDelay.connect(radioToneHighpass);
      radioToneHighpass.connect(radioToneLowpass);
      radioToneLowpass.connect(radioTonePresence);
      radioTonePresence.connect(lowpass);
      lowpass.connect(highshelf);
      highshelf.connect(drive);
      if (bitcrusher) {
        drive.connect(bitcrusher);
        bitcrusher.connect(bassEq);
      } else {
        drive.connect(bassEq);
      }
      bassEq.connect(midEq);
      midEq.connect(trebleEq);
      if (stereoWidth) {
        trebleEq.connect(stereoWidth);
        stereoWidth.connect(roomDryGain);
        stereoWidth.connect(roomConvolver);
      } else {
        trebleEq.connect(roomDryGain);
        trebleEq.connect(roomConvolver);
      }
      roomConvolver.connect(roomWetGain);
      roomDryGain.connect(masterGain);
      roomWetGain.connect(masterGain);
      if (this.connectOutputToDestination) {
        masterGain.connect(context.destination);
      }
      if (recordingDestination && this.connectOutputToRecordingDestination) {
        masterGain.connect(recordingDestination);
      }

      const noiseSource = context.createBufferSource();
      noiseSource.buffer = createTintedNoiseBuffer(context);
      noiseSource.loop = true;

      const noiseHighpass = context.createBiquadFilter();
      noiseHighpass.type = "highpass";
      noiseHighpass.frequency.value = 1100;
      noiseHighpass.Q.value = 0.25;

      const noiseLowpass = context.createBiquadFilter();
      noiseLowpass.type = "lowpass";
      noiseLowpass.frequency.value = 5600;
      noiseLowpass.Q.value = 0.18;

      const noisePresence = context.createBiquadFilter();
      noisePresence.type = "peaking";
      noisePresence.frequency.value = 2400;
      noisePresence.Q.value = 0.7;
      noisePresence.gain.value = -2.5;

      const noisePanner = context.createStereoPanner();
      const noiseGain = context.createGain();
      const noiseLfo = context.createOscillator();
      const noiseLfoGain = context.createGain();
      const crackleSource = context.createBufferSource();
      const crackleFilter = context.createBiquadFilter();
      const vinylDustBedFilter = context.createBiquadFilter();
      const vinylDustBedGain = context.createGain();
      const crackleGain = context.createGain();

      masterGain.gain.value = 0;
      noiseGain.gain.value = 0;

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

      noiseSource.connect(noiseHighpass);
      noiseHighpass.connect(noiseLowpass);
      noiseLowpass.connect(noisePresence);
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
      noiseSource.start();
      noiseLfo.start();
      crackleSource.start();
      wowLfo.start();
      flutterLfo.start();

      Object.assign(this.nodes, {
        audioContext: context,
        masterGain,
        radioToneHighpass,
        radioToneLowpass,
        radioTonePresence,
        recordingDestination,
        lofiLowpass: lowpass,
        lofiHighshelf: highshelf,
        lofiDrive: drive,
        bitcrusher,
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
      });
    }

    const activeContext = this.nodes.audioContext;

    if (activeContext?.state === "suspended") {
      try {
        await activeContext.resume();
      } catch {
        // Resume can be blocked until the next user gesture.
      }
    }

    this.updateAudioNodes();
    return activeContext;
  }

  async connectSourceNode(sourceNode: AudioNode) {
    const context = await this.ensureAudioContext();
    if (!context) {
      this.debugAudio("connectSourceNode:no-context");
      return;
    }

    if (this.nodes.sourceNode) {
      try {
        this.nodes.sourceNode.disconnect();
      } catch {
        // ignore disconnect races
      }
      this.nodes.sourceNode = null;
    }

    sourceNode.connect(this.input!);
    this.nodes.sourceNode = sourceNode;
    this.updateAudioNodes();
    this.debugAudio("connectSourceNode:connected", {
      audioContextState: context.state,
    });
  }

  async connect(
    destinationNode: AudioNode | AudioParam,
    outputIndex?: number,
    inputIndex?: number,
  ) {
    const context = await this.ensureAudioContext();
    if (!context) {
      this.debugAudio("connect:no-context");
      return;
    }

    const outputNode = this.output;
    if (!outputNode) {
      this.debugAudio("connect:no-output-node", {
        audioContextState: context.state,
      });
      return;
    }

    if (isAudioParamLike(destinationNode)) {
      outputNode.connect(destinationNode, outputIndex);
      return;
    }

    outputNode.connect(destinationNode, outputIndex, inputIndex);
  }

  disconnect() {
    const outputNode = this.output;
    if (!outputNode) {
      return;
    }

    try {
      outputNode.disconnect();
    } catch {
      // ignore disconnect races
    }
  }

  async dispose() {
    try {
      this.nodes.noiseSource?.stop();
    } catch {
      // already stopped
    }

    try {
      this.nodes.noiseLfo?.stop();
    } catch {
      // already stopped
    }

    try {
      this.nodes.crackleSource?.stop();
    } catch {
      // already stopped
    }

    try {
      this.nodes.wowLfo?.stop();
    } catch {
      // already stopped
    }

    try {
      this.nodes.flutterLfo?.stop();
    } catch {
      // already stopped
    }

    const context = this.nodes.audioContext;
    this.resetNodes();

    if (!context || context.state === "closed") {
      return;
    }

    try {
      await context.close();
    } catch {
      // ignore double-close races
    }
  }

  async disposeAudioEngine() {
    await this.dispose();
  }
}

export type CreateTetoricaRetroAudioNodeParams = Omit<
  CreateManagedRetroAudioEngineParams,
  "createAudioContext" | "connectOutputToDestination" | "connectOutputToRecordingDestination"
>;

export function createRetroAudioEngine({
  context,
  createAudioContext,
  connectOutputToDestination = false,
  connectOutputToRecordingDestination = false,
  //enableAudioWorklet = true,
  ...options
}: CreateRetroAudioEngineParams = {},
) {
  const currentSettings = resolveRetroAudioSettings(options);
  const runtimeState = {
    settings: currentSettings,
    isPlaying: options.isPlaying ?? true,
    isOutputEnabled:
      options.previewKind === undefined
        ? true
        : options.previewKind === "video" ||
          options.previewKind === "audio" ||
          options.previewKind === "capture",
  };
  return new TetoricaRetroAudioNode({
    instanceLabel: options.instanceLabel ?? "tetorica-retro-audio-engine",
    runtimeState,
    createAudioContext:
      createAudioContext ??
      (context
        ? () => context
        : undefined),
    connectOutputToDestination,
    connectOutputToRecordingDestination,
    enableAudioWorklet: options.enableAudioWorklet,
  });
}

export function createTetoricaRetroAudioNode(
  context: AudioContextLike,
  options: TetoricaRetroAudioNodeOptions = {},
) {
  return createRetroAudioEngine({
    context,
    ...options,
  });
}
