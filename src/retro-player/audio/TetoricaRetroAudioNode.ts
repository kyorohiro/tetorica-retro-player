import {
  DEFAULT_AUDIO_SETTINGS,
  RETRO_AUDIO_PRESET_SETTINGS,
  type RetroAudioPresetKey,
  type RetroAudioSettings,
} from "./preset.ts";
import {
  createDriveCurve,
  createTapeSaturationCurve,
  createSmallRoomImpulse,
  createHallReverbImpulse,
  createTintedNoiseBuffer,
  createVinylDustBuffer,
} from "./audioChainEngine.ts";

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

export type CreateRetroAudioEngineParams = {
  context: AudioContextLike;
  // Deprecated: prefer `await engine.connect(context.destination)` for explicit lifecycle control.
  connectOutputToDestination?: boolean;
  connectOutputToRecordingDestination?: boolean;
} & TetoricaRetroAudioNodeOptions;

type CreateManagedRetroAudioEngineParams = {
  context: AudioContextLike;
  instanceLabel: string;
  runtimeState: {
    settings: RetroAudioSettings;
    isPlaying: boolean;
    isOutputEnabled: boolean;
  };
  connectOutputToDestination?: boolean;
  connectOutputToRecordingDestination?: boolean;
  enableAudioWorklet?: boolean;
};

type AudioContextLike = AudioContext;

const isRetroPlayerDebugEnabled = () =>
  Boolean(
    (globalThis as typeof globalThis & { __RETRO_PLAYER_DEBUG__?: boolean })
      .__RETRO_PLAYER_DEBUG__,
  );

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
  private readonly context: AudioContextLike;
  private readonly instanceLabel: string;
  // Deprecated: prefer await engine.connect(context.destination) instead.
  private readonly connectOutputToDestination: boolean;
  private readonly connectOutputToRecordingDestination: boolean;
  private readonly enableAudioWorklet: boolean;
  private readonly runtimeState: CreateManagedRetroAudioEngineParams["runtimeState"];
  private readonly currentSettings: RetroAudioSettings;
  // Tracks external destinations added via connect() for selective disconnect.
  private readonly externalConnections = new Set<AudioNode | AudioParam>();
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
    postCrushLowpass: null as BiquadFilterNode | null,
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
    outputBus: null as GainNode | null,
    echoDelayLine: null as DelayNode | null,
    echoFeedbackGain: null as GainNode | null,
    echoWetGain: null as GainNode | null,
    hallReverbConvolver: null as ConvolverNode | null,
    hallReverbWetGain: null as GainNode | null,
    chorusDelay1: null as DelayNode | null,
    chorusDelay2: null as DelayNode | null,
    chorusLfo1: null as OscillatorNode | null,
    chorusLfo2: null as OscillatorNode | null,
    chorusLfoGain1: null as GainNode | null,
    chorusLfoGain2: null as GainNode | null,
    chorusWetGain: null as GainNode | null,
    tapeSaturator: null as WaveShaperNode | null,
    busCompressor: null as DynamicsCompressorNode | null,
    fxOutputGain: null as GainNode | null,
  };

  constructor({
    context,
    instanceLabel,
    runtimeState,
    connectOutputToDestination = false,
    connectOutputToRecordingDestination = false,
    enableAudioWorklet = true,
  }: CreateManagedRetroAudioEngineParams) {
    this.context = context;
    this.instanceLabel = instanceLabel;
    this.runtimeState = runtimeState;
    this.currentSettings = runtimeState.settings;
    this.connectOutputToDestination = connectOutputToDestination;
    this.connectOutputToRecordingDestination = connectOutputToRecordingDestination;
    this.enableAudioWorklet = enableAudioWorklet;
  }

  get input() {
    return this.nodes.wowFlutterDelay ?? this.nodes.lofiLowpass;
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
    });
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

    const postCrushLowpass = this.nodes.postCrushLowpass;
    if (postCrushLowpass) {
      const amount = settings.isAudioFxEnabled ? settings.noiseReductionAmount : 0;
      // 0 = 18000Hz（素通り）、1 = 3000Hz（強めにカット）
      postCrushLowpass.frequency.value = Math.max(3000, 18000 - amount * 15000);
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
      wowLfoGain.gain.value = amount * 0.0023;
      flutterLfo.frequency.value = 5.2 + amount * 6.5;
      flutterLfoGain.gain.value = amount * 0.0006;
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
      hallReverbWetGain.gain.value = amount * 2.0;
    }

    const chorusLfoGain1 = this.nodes.chorusLfoGain1;
    const chorusLfoGain2 = this.nodes.chorusLfoGain2;
    const chorusWetGain = this.nodes.chorusWetGain;
    if (chorusLfoGain1 && chorusLfoGain2 && chorusWetGain) {
      const amount = settings.isAudioFxEnabled ? settings.chorusAmount : 0;
      chorusWetGain.gain.value = amount * 0.6;
      chorusLfoGain1.gain.value = amount * 0.005;
      chorusLfoGain2.gain.value = amount * 0.006;
    }

    const tapeSaturator = this.nodes.tapeSaturator;
    if (tapeSaturator) {
      try {
        tapeSaturator.curve = createTapeSaturationCurve(
          settings.isAudioFxEnabled ? settings.tapeSaturationAmount : 0,
        );
      } catch {
        // Some non-browser Web Audio implementations reject reassigning curve.
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
      fxOutputGain.gain.value = settings.isAudioFxEnabled
        ? settings.fxOutputTrimAmount
        : 1;
    }
  }

  // ---------------------------------------------------------------------------
  // Private initialization helpers
  // ---------------------------------------------------------------------------

  private async loadWorklets(context: AudioContext): Promise<{
    bitcrusher: AudioWorkletNode | null;
    stereoWidth: AudioWorkletNode | null;
  }> {
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

    return { bitcrusher, stereoWidth };
  }

  private buildAndWireNodes(
    context: AudioContext,
    worklets: { bitcrusher: AudioWorkletNode | null; stereoWidth: AudioWorkletNode | null },
  ) {
    // --- Create all nodes ---
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
    const postCrushLowpass = context.createBiquadFilter();
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
    const echoDelayLine = context.createDelay(1.0);
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
    const noiseSource = context.createBufferSource();
    const noiseHighpass = context.createBiquadFilter();
    const noiseLowpass = context.createBiquadFilter();
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

    // --- Configure initial properties ---
    radioToneHighpass.type = "highpass";
    radioToneLowpass.type = "lowpass";
    radioTonePresence.type = "peaking";
    lowpass.type = "lowpass";
    highshelf.type = "highshelf";
    highshelf.frequency.value = 2800;
    drive.oversample = "4x";
    postCrushLowpass.type = "lowpass";
    postCrushLowpass.frequency.value = 18000;
    postCrushLowpass.Q.value = 0.5;
    bassEq.type = "lowshelf";
    bassEq.frequency.value = 180;
    midEq.type = "peaking";
    midEq.frequency.value = 1200;
    midEq.Q.value = 0.5;
    trebleEq.type = "highshelf";
    trebleEq.frequency.value = 2800;
    roomConvolver.buffer = createSmallRoomImpulse(context);
    wowFlutterDelay.delayTime.value = 0.006;
    wowLfo.type = "sine";
    flutterLfo.type = "sine";
    tapeSaturator.curve = createTapeSaturationCurve(0);
    tapeSaturator.oversample = "4x";
    outputBus.gain.value = 1;
    busCompressor.knee.value = 10;
    busCompressor.attack.value = 0.003;
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
    masterGain.gain.value = 0;
    noiseGain.gain.value = 0;
    noiseSource.buffer = createTintedNoiseBuffer(context);
    noiseSource.loop = true;
    noiseHighpass.type = "highpass";
    noiseHighpass.frequency.value = 1100;
    noiseHighpass.Q.value = 0.25;
    noiseLowpass.type = "lowpass";
    noiseLowpass.frequency.value = 5600;
    noiseLowpass.Q.value = 0.18;
    noisePresence.type = "peaking";
    noisePresence.frequency.value = 2400;
    noisePresence.Q.value = 0.7;
    noisePresence.gain.value = -2.5;
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

    // --- Wire signal chain ---
    const { bitcrusher, stereoWidth } = worklets;

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
      bitcrusher.connect(postCrushLowpass);
    } else {
      drive.connect(postCrushLowpass);
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

    // --- Wire spatial effects ---
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

    // --- Wire noise / crackle chain ---
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
    };
  }

  private startSources() {
    this.nodes.noiseSource?.start();
    this.nodes.noiseLfo?.start();
    this.nodes.crackleSource?.start();
    this.nodes.wowLfo?.start();
    this.nodes.flutterLfo?.start();
    this.nodes.chorusLfo1?.start();
    this.nodes.chorusLfo2?.start();
  }

  private applyAutoConnect() {
    const fxOutputGain = this.nodes.fxOutputGain;
    if (!fxOutputGain) return;

    if (this.connectOutputToDestination) {
      fxOutputGain.connect(this.context.destination);
      this.externalConnections.add(this.context.destination);
    }

    const recordingDestination = this.nodes.recordingDestination;
    if (recordingDestination && this.connectOutputToRecordingDestination) {
      fxOutputGain.connect(recordingDestination);
      this.externalConnections.add(recordingDestination);
    }
  }

  private async initNodes() {
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
        // Resume can be blocked until the next user gesture.
      }
    }

    this.updateAudioNodes();
    return activeContext;
  }

  async connectSourceNode(sourceNode: AudioNode) {
    const context = await this.ensureInitialized();
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
    const context = await this.ensureInitialized();
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
      this.externalConnections.add(destinationNode);
      return;
    }

    // connectOutputToDestination: true のとき context.destination には既に接続済みなので二重接続しない
    if (this.connectOutputToDestination && destinationNode === context.destination) {
      this.debugAudio("connect:skipped-double-destination");
      return;
    }

    outputNode.connect(destinationNode, outputIndex, inputIndex);
    this.externalConnections.add(destinationNode);
  }

  disconnect(destination?: AudioNode | AudioParam) {
    const outputNode = this.output;
    if (!outputNode) return;

    if (destination !== undefined) {
      try {
        if (isAudioParamLike(destination)) {
          outputNode.disconnect(destination);
        } else {
          outputNode.disconnect(destination as AudioNode);
        }
      } catch {
        // ignore disconnect races
      }
      this.externalConnections.delete(destination);
    } else {
      // Disconnect all tracked external connections; internal graph is untouched.
      for (const dest of this.externalConnections) {
        try {
          if (isAudioParamLike(dest)) {
            outputNode.disconnect(dest);
          } else {
            outputNode.disconnect(dest as AudioNode);
          }
        } catch {
          // ignore disconnect races
        }
      }
      this.externalConnections.clear();
    }
  }

  async dispose() {
    // Stop and disconnect schedulable sources
    const scheduledNodes = [
      this.nodes.noiseSource,
      this.nodes.noiseLfo,
      this.nodes.crackleSource,
      this.nodes.wowLfo,
      this.nodes.flutterLfo,
      this.nodes.chorusLfo1,
      this.nodes.chorusLfo2,
    ] as (AudioScheduledSourceNode | null)[];
    for (const node of scheduledNodes) {
      try { node?.stop(); } catch {}
      try { node?.disconnect(); } catch {}
    }

    // Disconnect external input (sourceNode)
    try { this.nodes.sourceNode?.disconnect(); } catch {}

    // Disconnect all tracked external output connections without touching internal graph
    this.disconnect();

    // Disconnect all remaining internal routing nodes
    const internalNodes: (AudioNode | null)[] = [
      this.nodes.wowFlutterDelay, this.nodes.wowLfoGain, this.nodes.flutterLfoGain,
      this.nodes.radioToneHighpass, this.nodes.radioToneLowpass, this.nodes.radioTonePresence,
      this.nodes.lofiLowpass, this.nodes.lofiHighshelf, this.nodes.lofiDrive,
      this.nodes.bitcrusher, this.nodes.postCrushLowpass,
      this.nodes.bassEq, this.nodes.midEq, this.nodes.trebleEq,
      this.nodes.tapeSaturator, this.nodes.stereoWidth,
      this.nodes.roomDryGain, this.nodes.roomConvolver, this.nodes.roomWetGain,
      this.nodes.echoDelayLine, this.nodes.echoFeedbackGain, this.nodes.echoWetGain,
      this.nodes.hallReverbConvolver, this.nodes.hallReverbWetGain,
      this.nodes.chorusDelay1, this.nodes.chorusDelay2,
      this.nodes.chorusLfoGain1, this.nodes.chorusLfoGain2, this.nodes.chorusWetGain,
      this.nodes.noisePanner, this.nodes.noiseGain, this.nodes.noiseFilter,
      this.nodes.noiseLfoGain, this.nodes.crackleFilter,
      this.nodes.vinylDustBedFilter, this.nodes.vinylDustBedGain, this.nodes.crackleGain,
      this.nodes.masterGain, this.nodes.outputBus, this.nodes.busCompressor,
    ];
    for (const node of internalNodes) {
      try { node?.disconnect(); } catch {}
    }

    this.resetNodes();
    // AudioContext は呼び出し元が管理する。ここでは close しない。
  }

  async disposeAudioEngine() {
    await this.dispose();
  }

  async ensureAudioContext() {
    return this.ensureInitialized();
  }
}

export function createRetroAudioEngine({
  context,
  connectOutputToDestination = false,
  connectOutputToRecordingDestination = false,
  //enableAudioWorklet = true,
  ...options
}: CreateRetroAudioEngineParams,
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
    context,
    instanceLabel: options.instanceLabel ?? "tetorica-retro-audio-engine",
    runtimeState,
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
