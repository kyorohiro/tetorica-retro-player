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

function createCurrentAccessor<T>(getValue: () => T) {
  return {
    get current() {
      return getValue();
    },
  };
}

function createManagedRetroAudioEngine({
  instanceLabel,
  runtimeState,
  createAudioContext,
  connectOutputToDestination = true,
  connectOutputToRecordingDestination = true,
}: CreateManagedRetroAudioEngineParams) {
  const nodes = {
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

  const debugAudio = (label: string, payload?: Record<string, unknown>) => {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    console.log(`[retro-player audio][${instanceLabel}] ${label}`, payload ?? {});
  };

  const resetNodeRefs = () => {
    Object.assign(nodes, {
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
  };

  const resolveAudioContextCtor = (): AudioContextCtor | null => {
    const ctor = (globalThis as typeof globalThis & { AudioContext?: AudioContextCtor })
      .AudioContext;
    return typeof ctor === "function" ? ctor : null;
  };

  const resolveAudioWorkletNodeCtor = () => {
    const ctor = (
      globalThis as typeof globalThis & {
        AudioWorkletNode?: typeof AudioWorkletNode;
      }
    ).AudioWorkletNode;
    return typeof ctor === "function" ? ctor : null;
  };

  const getInputNode = () => {
    return nodes.wowFlutterDelay ?? nodes.lofiLowpass;
  };

  const getOutputNode = () => {
    return nodes.masterGain;
  };

  const updateAudioNodes = () => {
    const masterGain = nodes.masterGain;
    const radioToneHighpass = nodes.radioToneHighpass;
    const radioToneLowpass = nodes.radioToneLowpass;
    const radioTonePresence = nodes.radioTonePresence;
    const lowpass = nodes.lofiLowpass;
    const highshelf = nodes.lofiHighshelf;
    const drive = nodes.lofiDrive;
    const bitcrusher = nodes.bitcrusher;
    const bassEq = nodes.bassEq;
    const midEq = nodes.midEq;
    const trebleEq = nodes.trebleEq;
    const stereoWidth = nodes.stereoWidth;
    const roomDryGain = nodes.roomDryGain;
    const roomWetGain = nodes.roomWetGain;
    const wowFlutterDelay = nodes.wowFlutterDelay;
    const wowLfo = nodes.wowLfo;
    const wowLfoGain = nodes.wowLfoGain;
    const flutterLfo = nodes.flutterLfo;
    const flutterLfoGain = nodes.flutterLfoGain;
    const noiseGainNode = nodes.noiseGain;
    const crackleGainNode = nodes.crackleGain;
    const vinylDustBedFilter = nodes.vinylDustBedFilter;
    const vinylDustBedGain = nodes.vinylDustBedGain;
    const {
      settings,
      isPlaying,
      isOutputEnabled,
    } = runtimeState;
    const isMediaPlaying = isPlaying;
    const nextMuted = settings.isMuted;
    const nextVolume = settings.volume;
    const nextAudioFxEnabled = settings.isAudioFxEnabled;
    const nextLofiAmount = settings.lofiAmount;
    const nextRadioToneAmount = settings.radioToneAmount;
    const nextBitCrushAmount = settings.bitCrushAmount;
    const nextSampleRateReductionAmount = settings.sampleRateReductionAmount;
    const nextBassAmount = settings.bassAmount;
    const nextMidAmount = settings.midAmount;
    const nextTrebleAmount = settings.trebleAmount;
    const nextStereoWidthAmount = settings.stereoWidthAmount;
    const nextSmallSpeakerRoomAmount = settings.smallSpeakerRoomAmount;
    const nextWowFlutterAmount = settings.wowFlutterAmount;
    const nextNoiseEnabled = settings.isNoiseEnabled;
    const nextNoiseLevel = settings.noiseLevel;
    const nextVinylDustAmount = settings.vinylDustAmount;
    const audibleMasterGain = nextMuted || !isOutputEnabled ? 0 : nextVolume;

    if (masterGain) {
      masterGain.gain.value = audibleMasterGain;
    }

    if (radioToneHighpass && radioToneLowpass && radioTonePresence) {
      const amount = nextAudioFxEnabled ? nextRadioToneAmount : 0;
      radioToneHighpass.frequency.value = 20 + amount * 430;
      radioToneHighpass.Q.value = 0.4 + amount * 0.35;
      radioToneLowpass.frequency.value = 20000 - amount * 17400;
      radioToneLowpass.Q.value = 0.2 + amount * 0.9;
      radioTonePresence.frequency.value = 1700;
      radioTonePresence.Q.value = 0.8 + amount * 1.4;
      radioTonePresence.gain.value = amount * 6;
    }

    if (lowpass && highshelf && drive) {
      const amount = nextAudioFxEnabled ? nextLofiAmount : 0;
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
      const isEnabled = nextAudioFxEnabled;
      const bitDepth = 16 - (isEnabled ? nextBitCrushAmount : 0) * 12;
      const holdFrames = 1 + (isEnabled ? nextSampleRateReductionAmount : 0) * 23;
      const mix = isEnabled
        ? Math.max(nextBitCrushAmount, nextSampleRateReductionAmount)
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
      const eqScale = nextAudioFxEnabled ? 15 : 0;
      bassEq.gain.value = nextBassAmount * eqScale;
      midEq.gain.value = nextMidAmount * eqScale;
      trebleEq.gain.value = nextTrebleAmount * eqScale;
    }

    if (stereoWidth) {
      const width = nextAudioFxEnabled ? 1 + nextStereoWidthAmount : 1;
      stereoWidth.parameters.get("width")?.setValueAtTime(
        width,
        stereoWidth.context.currentTime,
      );
    }

    if (roomDryGain && roomWetGain) {
      const amount = nextAudioFxEnabled ? nextSmallSpeakerRoomAmount : 0;
      roomDryGain.gain.value = Math.max(0.52, 1 - amount * 0.42);
      roomWetGain.gain.value = amount * 0.95;
    }

    if (wowFlutterDelay && wowLfo && wowLfoGain && flutterLfo && flutterLfoGain) {
      const amount = nextAudioFxEnabled ? nextWowFlutterAmount : 0;
      wowFlutterDelay.delayTime.value = 0.006 + amount * 0.004;
      wowLfo.frequency.value = 0.18 + amount * 0.42;
      wowLfoGain.gain.value = amount * 0.0035;
      flutterLfo.frequency.value = 5.2 + amount * 6.5;
      flutterLfoGain.gain.value = amount * 0.0009;
    }

    if (noiseGainNode) {
      noiseGainNode.gain.value =
        nextNoiseEnabled && !nextMuted && isOutputEnabled && isMediaPlaying
          ? Math.min(0.24, nextNoiseLevel * 5.5)
          : 0;
    }

    if (crackleGainNode) {
      const isCrackleActive =
        nextNoiseEnabled &&
        !nextMuted &&
        isOutputEnabled &&
        isMediaPlaying;
      crackleGainNode.gain.value = isCrackleActive
        ? Math.min(0.24, nextVinylDustAmount * 0.22 + nextNoiseLevel * 0.25)
        : 0;
    }

    if (vinylDustBedFilter && vinylDustBedGain) {
      const isDustBedActive =
        nextNoiseEnabled &&
        !nextMuted &&
        isOutputEnabled &&
        isMediaPlaying;
      const amount = isDustBedActive ? nextVinylDustAmount : 0;
      vinylDustBedFilter.frequency.value = 2100 + amount * 2600;
      vinylDustBedFilter.Q.value = 0.35 + amount * 0.25;
      vinylDustBedGain.gain.value = amount * 0.11;
    }
  };

  const ensureAudioContext = async () => {
    const AudioContextCtor = resolveAudioContextCtor();
    if (!AudioContextCtor) return null;

    if (nodes.audioContext?.state === "closed") {
      resetNodeRefs();
    }

    if (!nodes.audioContext) {
      const context = createAudioContext ? createAudioContext() : new AudioContextCtor();
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

      const AudioWorkletNodeCtor = resolveAudioWorkletNodeCtor();
      if ("audioWorklet" in context && AudioWorkletNodeCtor) {
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
      if (connectOutputToDestination) {
        masterGain.connect(context.destination);
      }
      if (recordingDestination && connectOutputToRecordingDestination) {
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

      Object.assign(nodes, {
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

    const activeContext = nodes.audioContext;

    if (activeContext?.state === "suspended") {
      try {
        await activeContext.resume();
      } catch {
        // Resume can be blocked until the next user gesture.
      }
    }

    updateAudioNodes();
    return activeContext;
  };

  const disposeAudioEngine = async () => {
    try {
      nodes.noiseSource?.stop();
    } catch {
      // already stopped
    }

    try {
      nodes.noiseLfo?.stop();
    } catch {
      // already stopped
    }

    try {
      nodes.crackleSource?.stop();
    } catch {
      // already stopped
    }

    try {
      nodes.wowLfo?.stop();
    } catch {
      // already stopped
    }

    try {
      nodes.flutterLfo?.stop();
    } catch {
      // already stopped
    }

    const context = nodes.audioContext;
    resetNodeRefs();

    if (!context || context.state === "closed") {
      return;
    }

    try {
      await context.close();
    } catch {
      // ignore double-close races
    }
  };

  const connectSourceNode = async (sourceNode: AudioNode) => {
    const context = await ensureAudioContext();
    if (!context) {
      debugAudio("connectSourceNode:no-context");
      return;
    }

    if (nodes.sourceNode) {
      try {
        nodes.sourceNode.disconnect();
      } catch {
        // ignore disconnect races
      }
      nodes.sourceNode = null;
    }

    sourceNode.connect(getInputNode()!);
    nodes.sourceNode = sourceNode;
    updateAudioNodes();
    debugAudio("connectSourceNode:connected", {
      audioContextState: context.state,
    });
  };

  const connect = async (
    destinationNode: AudioNode | AudioParam,
    outputIndex?: number,
    inputIndex?: number,
  ) => {
    const context = await ensureAudioContext();
    if (!context) {
      debugAudio("connect:no-context");
      return;
    }

    const outputNode = getOutputNode();
    if (!outputNode) {
      debugAudio("connect:no-output-node", {
        audioContextState: context.state,
      });
      return;
    }

    if (isAudioParamLike(destinationNode)) {
      outputNode.connect(destinationNode, outputIndex);
      return;
    }

    outputNode.connect(destinationNode, outputIndex, inputIndex);
  };

  const disconnect = () => {
    const outputNode = getOutputNode();
    if (!outputNode) {
      return;
    }

    try {
      outputNode.disconnect();
    } catch {
      // ignore disconnect races
    }
  };

  return {
    audioContextRef: createCurrentAccessor(() => nodes.audioContext),
    masterGainRef: createCurrentAccessor(() => nodes.masterGain),
    radioToneHighpassRef: createCurrentAccessor(() => nodes.radioToneHighpass),
    radioToneLowpassRef: createCurrentAccessor(() => nodes.radioToneLowpass),
    radioTonePresenceRef: createCurrentAccessor(() => nodes.radioTonePresence),
    recordingDestinationRef: createCurrentAccessor(() => nodes.recordingDestination),
    lofiLowpassRef: createCurrentAccessor(() => nodes.lofiLowpass),
    lofiHighshelfRef: createCurrentAccessor(() => nodes.lofiHighshelf),
    lofiDriveRef: createCurrentAccessor(() => nodes.lofiDrive),
    bitcrusherRef: createCurrentAccessor(() => nodes.bitcrusher),
    bassEqRef: createCurrentAccessor(() => nodes.bassEq),
    midEqRef: createCurrentAccessor(() => nodes.midEq),
    trebleEqRef: createCurrentAccessor(() => nodes.trebleEq),
    stereoWidthRef: createCurrentAccessor(() => nodes.stereoWidth),
    roomDryGainRef: createCurrentAccessor(() => nodes.roomDryGain),
    roomConvolverRef: createCurrentAccessor(() => nodes.roomConvolver),
    roomWetGainRef: createCurrentAccessor(() => nodes.roomWetGain),
    wowFlutterDelayRef: createCurrentAccessor(() => nodes.wowFlutterDelay),
    wowLfoRef: createCurrentAccessor(() => nodes.wowLfo),
    wowLfoGainRef: createCurrentAccessor(() => nodes.wowLfoGain),
    flutterLfoRef: createCurrentAccessor(() => nodes.flutterLfo),
    flutterLfoGainRef: createCurrentAccessor(() => nodes.flutterLfoGain),
    noiseSourceRef: createCurrentAccessor(() => nodes.noiseSource),
    noiseFilterRef: createCurrentAccessor(() => nodes.noiseFilter),
    noisePannerRef: createCurrentAccessor(() => nodes.noisePanner),
    noiseGainRef: createCurrentAccessor(() => nodes.noiseGain),
    noiseLfoRef: createCurrentAccessor(() => nodes.noiseLfo),
    noiseLfoGainRef: createCurrentAccessor(() => nodes.noiseLfoGain),
    crackleSourceRef: createCurrentAccessor(() => nodes.crackleSource),
    crackleFilterRef: createCurrentAccessor(() => nodes.crackleFilter),
    vinylDustBedFilterRef: createCurrentAccessor(() => nodes.vinylDustBedFilter),
    vinylDustBedGainRef: createCurrentAccessor(() => nodes.vinylDustBedGain),
    crackleGainRef: createCurrentAccessor(() => nodes.crackleGain),
    get input() {
      return getInputNode();
    },
    get output() {
      return getOutputNode();
    },
    debugAudio,
    ensureAudioContext,
    updateAudioNodes,
    connectSourceNode,
    connect,
    disconnect,
    disposeAudioEngine,
  };
}

export type CreateTetoricaRetroAudioNodeParams = Omit<
  CreateManagedRetroAudioEngineParams,
  "createAudioContext" | "connectOutputToDestination" | "connectOutputToRecordingDestination"
>;

export type TetoricaRetroAudioNode = ReturnType<typeof createTetoricaRetroAudioNode>;

export function createRetroAudioEngine({
  context,
  createAudioContext,
  connectOutputToDestination = false,
  connectOutputToRecordingDestination = false,
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
  const engine = createManagedRetroAudioEngine({
    instanceLabel: options.instanceLabel ?? "tetorica-retro-audio-engine",
    runtimeState,
    createAudioContext:
      createAudioContext ??
      (context
        ? () => context
        : undefined),
    connectOutputToDestination,
    connectOutputToRecordingDestination,
  });

  const setParams = (
    nextParams: Partial<RetroAudioSettings>,
    isPartialUpdate = false,
  ) => {
    const nextSettings = isPartialUpdate
      ? { ...currentSettings, ...nextParams }
      : { ...DEFAULT_AUDIO_SETTINGS, ...nextParams };

    Object.assign(currentSettings, nextSettings);
    engine.updateAudioNodes();
  };

  const getParams = () => ({ ...currentSettings });

  const applyPreset = (
    preset: RetroAudioPresetKey,
    extraParams?: Partial<RetroAudioSettings>,
  ) => {
    const nextSettings = resolveRetroAudioSettings({
      preset,
      params: extraParams,
    });
    Object.assign(currentSettings, nextSettings);
    engine.updateAudioNodes();
  };

  const setIsPlaying = (nextIsPlaying: boolean) => {
    runtimeState.isPlaying = nextIsPlaying;
    engine.updateAudioNodes();
  };

  const setOutputEnabled = (isEnabled: boolean) => {
    runtimeState.isOutputEnabled = isEnabled;
    engine.updateAudioNodes();
  };

  return Object.assign(engine, {
    setParams,
    getParams,
    applyPreset,
    setIsPlaying,
    setOutputEnabled,
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
