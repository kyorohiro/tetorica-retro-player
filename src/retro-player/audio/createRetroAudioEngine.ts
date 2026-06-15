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
} as const;

export type RetroAudioPreviewKind = "video" | "audio" | "image" | "capture" | null;

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

export type CurrentRef<T> = {
  current: T;
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

type CreateRetroAudioEngineParams = {
  instanceLabel: string;
  previewKindRef: CurrentRef<RetroAudioPreviewKind>;
  mediaRef: CurrentRef<HTMLMediaElement | null>;
  isPlayingRef: CurrentRef<boolean>;
  settingsRefs: RetroAudioSettingsRefs;
  createAudioContext?: () => AudioContextLike;
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

export function createRetroAudioEngine({
  instanceLabel,
  previewKindRef,
  mediaRef,
  isPlayingRef,
  settingsRefs,
  createAudioContext,
}: CreateRetroAudioEngineParams) {
  const audioContextRef: CurrentRef<AudioContext | null> = { current: null };
  const mediaSourceRef: CurrentRef<MediaElementAudioSourceNode | null> = { current: null };
  const masterGainRef: CurrentRef<GainNode | null> = { current: null };
  const radioToneHighpassRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const radioToneLowpassRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const radioTonePresenceRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const recordingDestinationRef: CurrentRef<MediaStreamAudioDestinationNode | null> = {
    current: null,
  };
  const lofiLowpassRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const lofiHighshelfRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const lofiDriveRef: CurrentRef<WaveShaperNode | null> = { current: null };
  const bitcrusherRef: CurrentRef<AudioWorkletNode | null> = { current: null };
  const bassEqRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const midEqRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const trebleEqRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const stereoWidthRef: CurrentRef<AudioWorkletNode | null> = { current: null };
  const roomDryGainRef: CurrentRef<GainNode | null> = { current: null };
  const roomConvolverRef: CurrentRef<ConvolverNode | null> = { current: null };
  const roomWetGainRef: CurrentRef<GainNode | null> = { current: null };
  const wowFlutterDelayRef: CurrentRef<DelayNode | null> = { current: null };
  const wowLfoRef: CurrentRef<OscillatorNode | null> = { current: null };
  const wowLfoGainRef: CurrentRef<GainNode | null> = { current: null };
  const flutterLfoRef: CurrentRef<OscillatorNode | null> = { current: null };
  const flutterLfoGainRef: CurrentRef<GainNode | null> = { current: null };
  const noiseSourceRef: CurrentRef<AudioBufferSourceNode | null> = { current: null };
  const noiseFilterRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const noisePannerRef: CurrentRef<StereoPannerNode | null> = { current: null };
  const noiseGainRef: CurrentRef<GainNode | null> = { current: null };
  const noiseLfoRef: CurrentRef<OscillatorNode | null> = { current: null };
  const noiseLfoGainRef: CurrentRef<GainNode | null> = { current: null };
  const crackleSourceRef: CurrentRef<AudioBufferSourceNode | null> = { current: null };
  const crackleFilterRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const vinylDustBedFilterRef: CurrentRef<BiquadFilterNode | null> = { current: null };
  const vinylDustBedGainRef: CurrentRef<GainNode | null> = { current: null };
  const crackleGainRef: CurrentRef<GainNode | null> = { current: null };
  const sourceNodeRef: CurrentRef<AudioNode | null> = { current: null };

  const debugAudio = (label: string, payload?: Record<string, unknown>) => {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    console.log(`[retro-player audio][${instanceLabel}] ${label}`, payload ?? {});
  };

  const resetNodeRefs = () => {
    audioContextRef.current = null;
    mediaSourceRef.current = null;
    masterGainRef.current = null;
    radioToneHighpassRef.current = null;
    radioToneLowpassRef.current = null;
    radioTonePresenceRef.current = null;
    recordingDestinationRef.current = null;
    lofiLowpassRef.current = null;
    lofiHighshelfRef.current = null;
    lofiDriveRef.current = null;
    bitcrusherRef.current = null;
    bassEqRef.current = null;
    midEqRef.current = null;
    trebleEqRef.current = null;
    stereoWidthRef.current = null;
    roomDryGainRef.current = null;
    roomConvolverRef.current = null;
    roomWetGainRef.current = null;
    wowFlutterDelayRef.current = null;
    wowLfoRef.current = null;
    wowLfoGainRef.current = null;
    flutterLfoRef.current = null;
    flutterLfoGainRef.current = null;
    noiseSourceRef.current = null;
    noiseFilterRef.current = null;
    noisePannerRef.current = null;
    noiseGainRef.current = null;
    noiseLfoRef.current = null;
    noiseLfoGainRef.current = null;
    crackleSourceRef.current = null;
    crackleFilterRef.current = null;
    vinylDustBedFilterRef.current = null;
    vinylDustBedGainRef.current = null;
    crackleGainRef.current = null;
    sourceNodeRef.current = null;
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
    return wowFlutterDelayRef.current ?? lofiLowpassRef.current;
  };

  const updateAudioNodes = () => {
    const masterGain = masterGainRef.current;
    const radioToneHighpass = radioToneHighpassRef.current;
    const radioToneLowpass = radioToneLowpassRef.current;
    const radioTonePresence = radioTonePresenceRef.current;
    const lowpass = lofiLowpassRef.current;
    const highshelf = lofiHighshelfRef.current;
    const drive = lofiDriveRef.current;
    const bitcrusher = bitcrusherRef.current;
    const bassEq = bassEqRef.current;
    const midEq = midEqRef.current;
    const trebleEq = trebleEqRef.current;
    const stereoWidth = stereoWidthRef.current;
    const roomDryGain = roomDryGainRef.current;
    const roomWetGain = roomWetGainRef.current;
    const wowFlutterDelay = wowFlutterDelayRef.current;
    const wowLfo = wowLfoRef.current;
    const wowLfoGain = wowLfoGainRef.current;
    const flutterLfo = flutterLfoRef.current;
    const flutterLfoGain = flutterLfoGainRef.current;
    const noiseGainNode = noiseGainRef.current;
    const crackleGainNode = crackleGainRef.current;
    const vinylDustBedFilter = vinylDustBedFilterRef.current;
    const vinylDustBedGain = vinylDustBedGainRef.current;
    const media = mediaRef.current;
    const currentPreviewKind = previewKindRef.current;
    const hasPlayablePreview =
      currentPreviewKind === "video" ||
      currentPreviewKind === "audio" ||
      currentPreviewKind === "capture";
    const isMediaPlaying = media ? !media.paused : isPlayingRef.current;
    const nextMuted = settingsRefs.isMutedRef.current;
    const nextVolume = settingsRefs.volumeRef.current;
    const nextAudioFxEnabled = settingsRefs.isAudioFxEnabledRef.current;
    const nextLofiAmount = settingsRefs.lofiAmountRef.current;
    const nextRadioToneAmount = settingsRefs.radioToneAmountRef.current;
    const nextBitCrushAmount = settingsRefs.bitCrushAmountRef.current;
    const nextSampleRateReductionAmount = settingsRefs.sampleRateReductionAmountRef.current;
    const nextBassAmount = settingsRefs.bassAmountRef.current;
    const nextMidAmount = settingsRefs.midAmountRef.current;
    const nextTrebleAmount = settingsRefs.trebleAmountRef.current;
    const nextStereoWidthAmount = settingsRefs.stereoWidthAmountRef.current;
    const nextSmallSpeakerRoomAmount = settingsRefs.smallSpeakerRoomAmountRef.current;
    const nextWowFlutterAmount = settingsRefs.wowFlutterAmountRef.current;
    const nextNoiseEnabled = settingsRefs.isNoiseEnabledRef.current;
    const nextNoiseLevel = settingsRefs.noiseLevelRef.current;
    const nextVinylDustAmount = settingsRefs.vinylDustAmountRef.current;
    const audibleMasterGain = nextMuted || !hasPlayablePreview ? 0 : nextVolume;

    if (masterGain) {
      masterGain.gain.value = audibleMasterGain;
    }

    if (media) {
      media.muted = nextMuted;
      media.volume = nextMuted ? 0 : nextVolume;
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
      drive.curve = createDriveCurve(amount * 0.6);
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
        nextNoiseEnabled && !nextMuted && hasPlayablePreview && isMediaPlaying
          ? Math.min(0.24, nextNoiseLevel * 5.5)
          : 0;
    }

    if (crackleGainNode) {
      const isCrackleActive =
        nextNoiseEnabled &&
        !nextMuted &&
        hasPlayablePreview &&
        isMediaPlaying;
      crackleGainNode.gain.value = isCrackleActive
        ? Math.min(0.24, nextVinylDustAmount * 0.22 + nextNoiseLevel * 0.25)
        : 0;
    }

    if (vinylDustBedFilter && vinylDustBedGain) {
      const isDustBedActive =
        nextNoiseEnabled &&
        !nextMuted &&
        hasPlayablePreview &&
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

    if (audioContextRef.current?.state === "closed") {
      resetNodeRefs();
    }

    if (!audioContextRef.current) {
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
      masterGain.connect(context.destination);
      if (recordingDestination) {
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

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
      radioToneHighpassRef.current = radioToneHighpass;
      radioToneLowpassRef.current = radioToneLowpass;
      radioTonePresenceRef.current = radioTonePresence;
      recordingDestinationRef.current = recordingDestination;
      lofiLowpassRef.current = lowpass;
      lofiHighshelfRef.current = highshelf;
      lofiDriveRef.current = drive;
      bitcrusherRef.current = bitcrusher;
      bassEqRef.current = bassEq;
      midEqRef.current = midEq;
      trebleEqRef.current = trebleEq;
      stereoWidthRef.current = stereoWidth;
      roomDryGainRef.current = roomDryGain;
      roomConvolverRef.current = roomConvolver;
      roomWetGainRef.current = roomWetGain;
      wowFlutterDelayRef.current = wowFlutterDelay;
      wowLfoRef.current = wowLfo;
      wowLfoGainRef.current = wowLfoGain;
      flutterLfoRef.current = flutterLfo;
      flutterLfoGainRef.current = flutterLfoGain;
      noiseSourceRef.current = noiseSource;
      noiseFilterRef.current = noisePresence;
      noisePannerRef.current = noisePanner;
      noiseGainRef.current = noiseGain;
      noiseLfoRef.current = noiseLfo;
      noiseLfoGainRef.current = noiseLfoGain;
      crackleSourceRef.current = crackleSource;
      crackleFilterRef.current = crackleFilter;
      vinylDustBedFilterRef.current = vinylDustBedFilter;
      vinylDustBedGainRef.current = vinylDustBedGain;
      crackleGainRef.current = crackleGain;
    }

    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch {
        // Resume can be blocked until the next user gesture.
      }
    }

    return audioContextRef.current;
  };

  const disposeAudioEngine = async () => {
    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;

    try {
      noiseSourceRef.current?.stop();
    } catch {
      // already stopped
    }

    try {
      noiseLfoRef.current?.stop();
    } catch {
      // already stopped
    }

    try {
      crackleSourceRef.current?.stop();
    } catch {
      // already stopped
    }

    try {
      wowLfoRef.current?.stop();
    } catch {
      // already stopped
    }

    try {
      flutterLfoRef.current?.stop();
    } catch {
      // already stopped
    }

    const context = audioContextRef.current;
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

  const connectMediaAudio = async (media: HTMLMediaElement) => {
    const context = await ensureAudioContext();
    const currentPreviewKind = previewKindRef.current;

    if (!context) {
      debugAudio("connectMediaAudio:no-context", {
        mediaTag: media.tagName,
      });
      return;
    }

    if (mediaSourceRef.current) {
      debugAudio("connectMediaAudio:disconnect-previous", {
        mediaTag: media.tagName,
      });
      mediaSourceRef.current.disconnect();
      mediaSourceRef.current = null;
    }

    try {
      const mediaSource = context.createMediaElementSource(media);
      mediaSource.connect(getInputNode()!);
      mediaSourceRef.current = mediaSource;
      sourceNodeRef.current = mediaSource;
      media.muted = settingsRefs.isMutedRef.current;
      media.volume = settingsRefs.isMutedRef.current ? 0 : settingsRefs.volumeRef.current;
      debugAudio("connectMediaAudio:connected", {
        audioContextState: context.state,
        lofiAmount: settingsRefs.lofiAmountRef.current,
        radioToneAmount: settingsRefs.radioToneAmountRef.current,
        bitCrushAmount: settingsRefs.bitCrushAmountRef.current,
        sampleRateReductionAmount: settingsRefs.sampleRateReductionAmountRef.current,
        bassAmount: settingsRefs.bassAmountRef.current,
        midAmount: settingsRefs.midAmountRef.current,
        trebleAmount: settingsRefs.trebleAmountRef.current,
        stereoWidthAmount: settingsRefs.stereoWidthAmountRef.current,
        smallSpeakerRoomAmount: settingsRefs.smallSpeakerRoomAmountRef.current,
        wowFlutterAmount: settingsRefs.wowFlutterAmountRef.current,
        isAudioFxEnabled: settingsRefs.isAudioFxEnabledRef.current,
        isMuted: settingsRefs.isMutedRef.current,
        volume: settingsRefs.volumeRef.current,
        mediaTag: media.tagName,
        previewKind: currentPreviewKind,
      });
      updateAudioNodes();
    } catch (error) {
      debugAudio("connectMediaAudio:error", {
        audioContextState: context.state,
        mediaTag: media.tagName,
        message: error instanceof Error ? error.message : String(error),
        previewKind: currentPreviewKind,
      });
      throw error;
    }
  };

  const reconnectCurrentMediaAudio = () => {
    const mediaSource = mediaSourceRef.current;
    if (!mediaSource) {
      return;
    }

    mediaSource.disconnect();
    mediaSource.connect(getInputNode()!);
    updateAudioNodes();
  };

  const connectSourceNode = async (sourceNode: AudioNode) => {
    const context = await ensureAudioContext();
    if (!context) {
      debugAudio("connectSourceNode:no-context");
      return;
    }

    if (sourceNodeRef.current && sourceNodeRef.current !== mediaSourceRef.current) {
      try {
        sourceNodeRef.current.disconnect();
      } catch {
        // ignore disconnect races
      }
      sourceNodeRef.current = null;
    }

    sourceNode.connect(getInputNode()!);
    sourceNodeRef.current = sourceNode;
    updateAudioNodes();
    debugAudio("connectSourceNode:connected", {
      previewKind: previewKindRef.current,
      audioContextState: context.state,
    });
  };

  return {
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
    radioToneHighpassRef,
    radioToneLowpassRef,
    radioTonePresenceRef,
    recordingDestinationRef,
    lofiLowpassRef,
    lofiHighshelfRef,
    lofiDriveRef,
    bitcrusherRef,
    bassEqRef,
    midEqRef,
    trebleEqRef,
    stereoWidthRef,
    roomDryGainRef,
    roomConvolverRef,
    roomWetGainRef,
    wowFlutterDelayRef,
    wowLfoRef,
    wowLfoGainRef,
    flutterLfoRef,
    flutterLfoGainRef,
    noiseSourceRef,
    noiseFilterRef,
    noisePannerRef,
    noiseGainRef,
    noiseLfoRef,
    noiseLfoGainRef,
    crackleSourceRef,
    crackleFilterRef,
    vinylDustBedFilterRef,
    vinylDustBedGainRef,
    crackleGainRef,
    debugAudio,
    ensureAudioContext,
    updateAudioNodes,
    connectMediaAudio,
    connectSourceNode,
    reconnectCurrentMediaAudio,
    disposeAudioEngine,
  };
}
