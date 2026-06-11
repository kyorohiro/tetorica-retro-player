import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  loadPersistedRetroSettings,
  savePersistedRetroAudioSettings,
} from "./persistedRetroSettings";

const DEFAULT_AUDIO_SETTINGS = {
  isMuted: false,
  volume: 1,
  playbackRate: 1,
  isLooping: true,
  isAudioFxEnabled: true,
  lofiAmount: 0.80,
  radioToneAmount: 0,
  bitCrushAmount: 0,
  sampleRateReductionAmount: 0,
  bassAmount: 0,
  midAmount: 0,
  trebleAmount: 0,
  stereoWidthAmount: 0,
  wowFlutterAmount: 0,
  isNoiseEnabled: true,
  noiseLevel: 0.02,
} as const;

const isRetroPlayerDebugEnabled = () =>
  typeof window !== "undefined" &&
  Boolean((window as typeof window & { __RETRO_PLAYER_DEBUG__?: boolean }).__RETRO_PLAYER_DEBUG__);

type PreviewKind = "video" | "audio" | "image" | "capture" | null;

type UseRetroAudioEngineParams = {
  instanceLabel: string;
  previewKind: PreviewKind;
  previewKindRef: MutableRefObject<PreviewKind>;
  mediaRef: MutableRefObject<HTMLMediaElement | null>;
  isPlaying: boolean;
  isPlayingRef: MutableRefObject<boolean>;
};

export function useRetroAudioEngine({
  instanceLabel,
  previewKind,
  previewKindRef,
  mediaRef,
  isPlaying,
  isPlayingRef,
}: UseRetroAudioEngineParams) {
  const [initialAudioSettings] = useState(() => {
    const persisted = loadPersistedRetroSettings()?.audio;

    return {
      isMuted: persisted?.isMuted ?? DEFAULT_AUDIO_SETTINGS.isMuted,
      volume: persisted?.volume ?? DEFAULT_AUDIO_SETTINGS.volume,
      playbackRate: persisted?.playbackRate ?? DEFAULT_AUDIO_SETTINGS.playbackRate,
      isLooping: persisted?.isLooping ?? DEFAULT_AUDIO_SETTINGS.isLooping,
      isAudioFxEnabled:
        persisted?.isAudioFxEnabled ?? DEFAULT_AUDIO_SETTINGS.isAudioFxEnabled,
      lofiAmount: persisted?.lofiAmount ?? DEFAULT_AUDIO_SETTINGS.lofiAmount,
      radioToneAmount:
        persisted?.radioToneAmount ?? DEFAULT_AUDIO_SETTINGS.radioToneAmount,
      bitCrushAmount:
        persisted?.bitCrushAmount ?? DEFAULT_AUDIO_SETTINGS.bitCrushAmount,
      sampleRateReductionAmount:
        persisted?.sampleRateReductionAmount ??
        DEFAULT_AUDIO_SETTINGS.sampleRateReductionAmount,
      bassAmount: persisted?.bassAmount ?? DEFAULT_AUDIO_SETTINGS.bassAmount,
      midAmount: persisted?.midAmount ?? DEFAULT_AUDIO_SETTINGS.midAmount,
      trebleAmount: persisted?.trebleAmount ?? DEFAULT_AUDIO_SETTINGS.trebleAmount,
      stereoWidthAmount:
        persisted?.stereoWidthAmount ?? DEFAULT_AUDIO_SETTINGS.stereoWidthAmount,
      wowFlutterAmount:
        persisted?.wowFlutterAmount ?? DEFAULT_AUDIO_SETTINGS.wowFlutterAmount,
      isNoiseEnabled:
        persisted?.isNoiseEnabled ?? DEFAULT_AUDIO_SETTINGS.isNoiseEnabled,
      noiseLevel: persisted?.noiseLevel ?? DEFAULT_AUDIO_SETTINGS.noiseLevel,
    };
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const radioToneHighpassRef = useRef<BiquadFilterNode | null>(null);
  const radioToneLowpassRef = useRef<BiquadFilterNode | null>(null);
  const radioTonePresenceRef = useRef<BiquadFilterNode | null>(null);
  const lofiLowpassRef = useRef<BiquadFilterNode | null>(null);
  const lofiHighshelfRef = useRef<BiquadFilterNode | null>(null);
  const lofiDriveRef = useRef<WaveShaperNode | null>(null);
  const bitcrusherRef = useRef<AudioWorkletNode | null>(null);
  const bassEqRef = useRef<BiquadFilterNode | null>(null);
  const midEqRef = useRef<BiquadFilterNode | null>(null);
  const trebleEqRef = useRef<BiquadFilterNode | null>(null);
  const stereoWidthRef = useRef<AudioWorkletNode | null>(null);
  const wowFlutterDelayRef = useRef<DelayNode | null>(null);
  const wowLfoRef = useRef<OscillatorNode | null>(null);
  const wowLfoGainRef = useRef<GainNode | null>(null);
  const flutterLfoRef = useRef<OscillatorNode | null>(null);
  const flutterLfoGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const noisePannerRef = useRef<StereoPannerNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const noiseLfoRef = useRef<OscillatorNode | null>(null);
  const noiseLfoGainRef = useRef<GainNode | null>(null);
  const recordingDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const isMutedRef = useRef<boolean>(initialAudioSettings.isMuted);
  const volumeRef = useRef<number>(initialAudioSettings.volume);
  const playbackRateRef = useRef<number>(initialAudioSettings.playbackRate);
  const isLoopingRef = useRef<boolean>(initialAudioSettings.isLooping);
  const isAudioFxEnabledRef = useRef<boolean>(initialAudioSettings.isAudioFxEnabled);
  const lofiAmountRef = useRef<number>(initialAudioSettings.lofiAmount);
  const radioToneAmountRef = useRef<number>(initialAudioSettings.radioToneAmount);
  const bitCrushAmountRef = useRef<number>(initialAudioSettings.bitCrushAmount);
  const sampleRateReductionAmountRef = useRef<number>(
    initialAudioSettings.sampleRateReductionAmount,
  );
  const bassAmountRef = useRef<number>(initialAudioSettings.bassAmount);
  const midAmountRef = useRef<number>(initialAudioSettings.midAmount);
  const trebleAmountRef = useRef<number>(initialAudioSettings.trebleAmount);
  const stereoWidthAmountRef = useRef<number>(initialAudioSettings.stereoWidthAmount);
  const wowFlutterAmountRef = useRef<number>(initialAudioSettings.wowFlutterAmount);
  const isNoiseEnabledRef = useRef<boolean>(initialAudioSettings.isNoiseEnabled);
  const noiseLevelRef = useRef<number>(initialAudioSettings.noiseLevel);

  const [isMuted, setIsMuted] = useState<boolean>(initialAudioSettings.isMuted);
  const [playbackRate, setPlaybackRate] = useState<number>(
    initialAudioSettings.playbackRate,
  );
  const [volume, setVolume] = useState<number>(initialAudioSettings.volume);
  const [isLooping, setIsLooping] = useState<boolean>(initialAudioSettings.isLooping);
  const [isAudioFxEnabled, setIsAudioFxEnabled] = useState<boolean>(
    initialAudioSettings.isAudioFxEnabled,
  );
  const [lofiAmount, setLofiAmount] = useState<number>(
    initialAudioSettings.lofiAmount,
  );
  const [radioToneAmount, setRadioToneAmount] = useState<number>(
    initialAudioSettings.radioToneAmount,
  );
  const [bitCrushAmount, setBitCrushAmount] = useState<number>(
    initialAudioSettings.bitCrushAmount,
  );
  const [sampleRateReductionAmount, setSampleRateReductionAmount] = useState<number>(
    initialAudioSettings.sampleRateReductionAmount,
  );
  const [bassAmount, setBassAmount] = useState<number>(
    initialAudioSettings.bassAmount,
  );
  const [midAmount, setMidAmount] = useState<number>(initialAudioSettings.midAmount);
  const [trebleAmount, setTrebleAmount] = useState<number>(
    initialAudioSettings.trebleAmount,
  );
  const [stereoWidthAmount, setStereoWidthAmount] = useState<number>(
    initialAudioSettings.stereoWidthAmount,
  );
  const [wowFlutterAmount, setWowFlutterAmount] = useState<number>(
    initialAudioSettings.wowFlutterAmount,
  );
  const [isNoiseEnabled, setIsNoiseEnabled] = useState<boolean>(
    initialAudioSettings.isNoiseEnabled,
  );
  const [noiseLevel, setNoiseLevel] = useState<number>(initialAudioSettings.noiseLevel);

  const debugAudio = (label: string, payload?: Record<string, unknown>) => {
    if (!isRetroPlayerDebugEnabled()) {
      return;
    }

    console.log(
      `[retro-player audio][${instanceLabel}] ${label}`,
      payload ?? {},
    );
  };

  const createDriveCurve = (amount: number) => {
    const samples = 256;
    const curve = new Float32Array(samples);
    const drive = 1 + amount * 5;

    for (let index = 0; index < samples; index += 1) {
      const x = (index * 2) / (samples - 1) - 1;
      curve[index] = Math.tanh(x * drive);
    }

    return curve;
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
    const wowFlutterDelay = wowFlutterDelayRef.current;
    const wowLfo = wowLfoRef.current;
    const wowLfoGain = wowLfoGainRef.current;
    const flutterLfo = flutterLfoRef.current;
    const flutterLfoGain = flutterLfoGainRef.current;
    const noiseGainNode = noiseGainRef.current;
    const media = mediaRef.current;
    const currentPreviewKind = previewKindRef.current;
    const hasPlayablePreview =
      currentPreviewKind === "video" ||
      currentPreviewKind === "audio" ||
      currentPreviewKind === "capture";
    const isMediaPlaying = media ? !media.paused : isPlayingRef.current;
    const nextMuted = isMutedRef.current;
    const nextVolume = volumeRef.current;
    const nextAudioFxEnabled = isAudioFxEnabledRef.current;
    const nextLofiAmount = lofiAmountRef.current;
    const nextRadioToneAmount = radioToneAmountRef.current;
    const nextBitCrushAmount = bitCrushAmountRef.current;
    const nextSampleRateReductionAmount = sampleRateReductionAmountRef.current;
    const nextBassAmount = bassAmountRef.current;
    const nextMidAmount = midAmountRef.current;
    const nextTrebleAmount = trebleAmountRef.current;
    const nextStereoWidthAmount = stereoWidthAmountRef.current;
    const nextWowFlutterAmount = wowFlutterAmountRef.current;
    const nextNoiseEnabled = isNoiseEnabledRef.current;
    const nextNoiseLevel = noiseLevelRef.current;
    const audibleMasterGain =
      nextMuted || !hasPlayablePreview ? 0 : nextVolume;

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
      const bitDepth =
        16 - (isEnabled ? nextBitCrushAmount : 0) * 12;
      const holdFrames =
        1 + (isEnabled ? nextSampleRateReductionAmount : 0) * 23;
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
          ? nextNoiseLevel
          : 0;
    }
  };

  const ensureAudioContext = async () => {
    if (typeof window === "undefined") return null;

    if (audioContextRef.current?.state === "closed") {
      audioContextRef.current = null;
      mediaSourceRef.current = null;
      masterGainRef.current = null;
      radioToneHighpassRef.current = null;
      radioToneLowpassRef.current = null;
      radioTonePresenceRef.current = null;
      lofiLowpassRef.current = null;
      lofiHighshelfRef.current = null;
      lofiDriveRef.current = null;
      bitcrusherRef.current = null;
      bassEqRef.current = null;
      midEqRef.current = null;
      trebleEqRef.current = null;
      stereoWidthRef.current = null;
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
    }

    if (!audioContextRef.current) {
      const context = new window.AudioContext();
      const masterGain = context.createGain();
      const recordingDestination = context.createMediaStreamDestination();
      const radioToneHighpass = context.createBiquadFilter();
      const radioToneLowpass = context.createBiquadFilter();
      const radioTonePresence = context.createBiquadFilter();
      const lowpass = context.createBiquadFilter();
      const highshelf = context.createBiquadFilter();
      const drive = context.createWaveShaper();
      let bitcrusher: AudioWorkletNode | null = null;
      let stereoWidth: AudioWorkletNode | null = null;
      if ("audioWorklet" in context) {
        const bitcrusherModuleUrl = new URL(
          "../audio/bitcrusherWorklet.js",
          import.meta.url,
        );
        await context.audioWorklet.addModule(bitcrusherModuleUrl.href);
        bitcrusher = new AudioWorkletNode(context, "retro-bitcrusher", {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          outputChannelCount: [2],
        });
        const stereoWidthModuleUrl = new URL(
          "../audio/stereoWidthWorklet.js",
          import.meta.url,
        );
        await context.audioWorklet.addModule(stereoWidthModuleUrl.href);
        stereoWidth = new AudioWorkletNode(context, "retro-stereo-width", {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          outputChannelCount: [2],
        });
      }
      const bassEq = context.createBiquadFilter();
      const midEq = context.createBiquadFilter();
      const trebleEq = context.createBiquadFilter();
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
        stereoWidth.connect(masterGain);
      } else {
        trebleEq.connect(masterGain);
      }
      masterGain.connect(context.destination);
      masterGain.connect(recordingDestination);

      const noiseSource = context.createBufferSource();
      const noiseBuffer = context.createBuffer(2, context.sampleRate * 2, context.sampleRate);
      for (let channel = 0; channel < noiseBuffer.numberOfChannels; channel += 1) {
        const channelData = noiseBuffer.getChannelData(channel);
        for (let index = 0; index < channelData.length; index += 1) {
          channelData[index] = Math.random() * 2 - 1;
        }
      }
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = context.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 4200;
      noiseFilter.Q.value = 0.8;

      const noisePanner = context.createStereoPanner();
      const noiseGain = context.createGain();
      const noiseLfo = context.createOscillator();
      const noiseLfoGain = context.createGain();

      masterGain.gain.value = 0;
      noiseGain.gain.value = 0;

      noiseLfo.type = "sine";
      noiseLfo.frequency.value = 0.065;
      noiseLfoGain.gain.value = 0.45;

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noisePanner);
      noisePanner.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseLfo.connect(noiseLfoGain);
      noiseLfoGain.connect(noisePanner.pan);
      noiseSource.start();
      noiseLfo.start();
      wowLfo.start();
      flutterLfo.start();

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
      radioToneHighpassRef.current = radioToneHighpass;
      radioToneLowpassRef.current = radioToneLowpass;
      radioTonePresenceRef.current = radioTonePresence;
      lofiLowpassRef.current = lowpass;
      lofiHighshelfRef.current = highshelf;
      lofiDriveRef.current = drive;
      bitcrusherRef.current = bitcrusher;
      bassEqRef.current = bassEq;
      midEqRef.current = midEq;
      trebleEqRef.current = trebleEq;
      stereoWidthRef.current = stereoWidth;
      wowFlutterDelayRef.current = wowFlutterDelay;
      wowLfoRef.current = wowLfo;
      wowLfoGainRef.current = wowLfoGain;
      flutterLfoRef.current = flutterLfo;
      flutterLfoGainRef.current = flutterLfoGain;
      noiseSourceRef.current = noiseSource;
      noiseFilterRef.current = noiseFilter;
      noisePannerRef.current = noisePanner;
      noiseGainRef.current = noiseGain;
      noiseLfoRef.current = noiseLfo;
      noiseLfoGainRef.current = noiseLfoGain;
      recordingDestinationRef.current = recordingDestination;
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
    audioContextRef.current = null;
    masterGainRef.current = null;
    recordingDestinationRef.current = null;
    radioToneHighpassRef.current = null;
    radioToneLowpassRef.current = null;
    radioTonePresenceRef.current = null;
    lofiLowpassRef.current = null;
    lofiHighshelfRef.current = null;
    lofiDriveRef.current = null;
    bitcrusherRef.current = null;
    bassEqRef.current = null;
    midEqRef.current = null;
    trebleEqRef.current = null;
    stereoWidthRef.current = null;
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
      mediaSource.connect(wowFlutterDelayRef.current ?? lofiLowpassRef.current!);
      mediaSourceRef.current = mediaSource;
      media.muted = isMutedRef.current;
      media.volume = isMutedRef.current ? 0 : volumeRef.current;
      debugAudio("connectMediaAudio:connected", {
        audioContextState: context.state,
        lofiAmount,
        radioToneAmount,
        bitCrushAmount,
        sampleRateReductionAmount,
        bassAmount,
        midAmount,
        trebleAmount,
        stereoWidthAmount,
        wowFlutterAmount,
        isAudioFxEnabled,
        isMuted,
        volume,
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

  const resetAudioSettings = () => {
    const nextSettings = { ...DEFAULT_AUDIO_SETTINGS };

    isMutedRef.current = nextSettings.isMuted;
    volumeRef.current = nextSettings.volume;
    playbackRateRef.current = nextSettings.playbackRate;
    isLoopingRef.current = nextSettings.isLooping;
    isAudioFxEnabledRef.current = nextSettings.isAudioFxEnabled;
    lofiAmountRef.current = nextSettings.lofiAmount;
    radioToneAmountRef.current = nextSettings.radioToneAmount;
    bitCrushAmountRef.current = nextSettings.bitCrushAmount;
    sampleRateReductionAmountRef.current = nextSettings.sampleRateReductionAmount;
    bassAmountRef.current = nextSettings.bassAmount;
    midAmountRef.current = nextSettings.midAmount;
    trebleAmountRef.current = nextSettings.trebleAmount;
    stereoWidthAmountRef.current = nextSettings.stereoWidthAmount;
    wowFlutterAmountRef.current = nextSettings.wowFlutterAmount;
    isNoiseEnabledRef.current = nextSettings.isNoiseEnabled;
    noiseLevelRef.current = nextSettings.noiseLevel;

    setIsMuted(nextSettings.isMuted);
    setVolume(nextSettings.volume);
    setPlaybackRate(nextSettings.playbackRate);
    setIsLooping(nextSettings.isLooping);
    setIsAudioFxEnabled(nextSettings.isAudioFxEnabled);
    setLofiAmount(nextSettings.lofiAmount);
    setRadioToneAmount(nextSettings.radioToneAmount);
    setBitCrushAmount(nextSettings.bitCrushAmount);
    setSampleRateReductionAmount(nextSettings.sampleRateReductionAmount);
    setBassAmount(nextSettings.bassAmount);
    setMidAmount(nextSettings.midAmount);
    setTrebleAmount(nextSettings.trebleAmount);
    setStereoWidthAmount(nextSettings.stereoWidthAmount);
    setWowFlutterAmount(nextSettings.wowFlutterAmount);
    setIsNoiseEnabled(nextSettings.isNoiseEnabled);
    setNoiseLevel(nextSettings.noiseLevel);

    if (mediaRef.current) {
      mediaRef.current.muted = nextSettings.isMuted;
      mediaRef.current.volume = nextSettings.volume;
      mediaRef.current.playbackRate = nextSettings.playbackRate;
      mediaRef.current.loop = nextSettings.isLooping;
    }

    window.requestAnimationFrame(updateAudioNodes);
  };

  useEffect(() => {
    isMutedRef.current = isMuted;
    volumeRef.current = volume;
    playbackRateRef.current = playbackRate;
    isLoopingRef.current = isLooping;
    isAudioFxEnabledRef.current = isAudioFxEnabled;
    lofiAmountRef.current = lofiAmount;
    radioToneAmountRef.current = radioToneAmount;
    bitCrushAmountRef.current = bitCrushAmount;
    sampleRateReductionAmountRef.current = sampleRateReductionAmount;
    bassAmountRef.current = bassAmount;
    midAmountRef.current = midAmount;
    trebleAmountRef.current = trebleAmount;
    stereoWidthAmountRef.current = stereoWidthAmount;
    wowFlutterAmountRef.current = wowFlutterAmount;
    isNoiseEnabledRef.current = isNoiseEnabled;
    noiseLevelRef.current = noiseLevel;

    updateAudioNodes();
  }, [
    isMuted,
    volume,
    isAudioFxEnabled,
    lofiAmount,
    radioToneAmount,
    bitCrushAmount,
    sampleRateReductionAmount,
    bassAmount,
    midAmount,
    trebleAmount,
    stereoWidthAmount,
    wowFlutterAmount,
    isNoiseEnabled,
    noiseLevel,
    isPlaying,
    playbackRate,
    isLooping,
    previewKind,
  ]);

  useEffect(() => {
    savePersistedRetroAudioSettings({
      isMuted,
      volume,
      playbackRate,
      isLooping,
      isAudioFxEnabled,
      lofiAmount,
      radioToneAmount,
      bitCrushAmount,
      sampleRateReductionAmount,
      bassAmount,
      midAmount,
      trebleAmount,
      stereoWidthAmount,
      wowFlutterAmount,
      isNoiseEnabled,
      noiseLevel,
    });
  }, [
    isMuted,
    volume,
    playbackRate,
    isLooping,
    isAudioFxEnabled,
    lofiAmount,
    radioToneAmount,
    bitCrushAmount,
    sampleRateReductionAmount,
    bassAmount,
    midAmount,
    trebleAmount,
    stereoWidthAmount,
    wowFlutterAmount,
    isNoiseEnabled,
    noiseLevel,
  ]);

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
    isMutedRef,
    volumeRef,
    playbackRateRef,
    isLoopingRef,
    isAudioFxEnabledRef,
    lofiAmountRef,
    radioToneAmountRef,
    bitCrushAmountRef,
    sampleRateReductionAmountRef,
    bassAmountRef,
    midAmountRef,
    trebleAmountRef,
    stereoWidthAmountRef,
    wowFlutterAmountRef,
    isNoiseEnabledRef,
    noiseLevelRef,
    isMuted,
    setIsMuted,
    playbackRate,
    setPlaybackRate,
    volume,
    setVolume,
    isLooping,
    setIsLooping,
    isAudioFxEnabled,
    setIsAudioFxEnabled,
    lofiAmount,
    setLofiAmount,
    radioToneAmount,
    setRadioToneAmount,
    bitCrushAmount,
    setBitCrushAmount,
    sampleRateReductionAmount,
    setSampleRateReductionAmount,
    bassAmount,
    setBassAmount,
    midAmount,
    setMidAmount,
    trebleAmount,
    setTrebleAmount,
    stereoWidthAmount,
    setStereoWidthAmount,
    wowFlutterAmount,
    setWowFlutterAmount,
    isNoiseEnabled,
    setIsNoiseEnabled,
    noiseLevel,
    setNoiseLevel,
    debugAudio,
    ensureAudioContext,
    updateAudioNodes,
    connectMediaAudio,
    resetAudioSettings,
    disposeAudioEngine,
  };
}
