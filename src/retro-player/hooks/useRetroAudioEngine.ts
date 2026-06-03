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
      isNoiseEnabled:
        persisted?.isNoiseEnabled ?? DEFAULT_AUDIO_SETTINGS.isNoiseEnabled,
      noiseLevel: persisted?.noiseLevel ?? DEFAULT_AUDIO_SETTINGS.noiseLevel,
    };
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const lofiLowpassRef = useRef<BiquadFilterNode | null>(null);
  const lofiHighshelfRef = useRef<BiquadFilterNode | null>(null);
  const lofiDriveRef = useRef<WaveShaperNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const noisePannerRef = useRef<StereoPannerNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const noiseLfoRef = useRef<OscillatorNode | null>(null);
  const noiseLfoGainRef = useRef<GainNode | null>(null);
  const isMutedRef = useRef<boolean>(initialAudioSettings.isMuted);
  const volumeRef = useRef<number>(initialAudioSettings.volume);
  const playbackRateRef = useRef<number>(initialAudioSettings.playbackRate);
  const isLoopingRef = useRef<boolean>(initialAudioSettings.isLooping);
  const isAudioFxEnabledRef = useRef<boolean>(initialAudioSettings.isAudioFxEnabled);
  const lofiAmountRef = useRef<number>(initialAudioSettings.lofiAmount);
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
    const lowpass = lofiLowpassRef.current;
    const highshelf = lofiHighshelfRef.current;
    const drive = lofiDriveRef.current;
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
    const nextNoiseEnabled = isNoiseEnabledRef.current;
    const nextNoiseLevel = noiseLevelRef.current;

    if (masterGain) {
      masterGain.gain.value = nextMuted ? 0 : nextVolume;
    }

    if (media) {
      media.muted = nextMuted;
      media.volume = nextMuted ? 0 : nextVolume;
    }

    if (lowpass && highshelf && drive) {
      const amount = nextAudioFxEnabled ? nextLofiAmount : 0;
      lowpass.frequency.value = 16000 - amount * 14200;
      lowpass.Q.value = 0.3 + amount * 1.8;
      highshelf.gain.value = -amount * 18;
      drive.curve = createDriveCurve(amount * 0.6);
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
      lofiLowpassRef.current = null;
      lofiHighshelfRef.current = null;
      lofiDriveRef.current = null;
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
      const lowpass = context.createBiquadFilter();
      const highshelf = context.createBiquadFilter();
      const drive = context.createWaveShaper();
      lowpass.type = "lowpass";
      highshelf.type = "highshelf";
      highshelf.frequency.value = 2800;
      drive.oversample = "4x";

      lowpass.connect(highshelf);
      highshelf.connect(drive);
      drive.connect(masterGain);
      masterGain.connect(context.destination);

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

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
      lofiLowpassRef.current = lowpass;
      lofiHighshelfRef.current = highshelf;
      lofiDriveRef.current = drive;
      noiseSourceRef.current = noiseSource;
      noiseFilterRef.current = noiseFilter;
      noisePannerRef.current = noisePanner;
      noiseGainRef.current = noiseGain;
      noiseLfoRef.current = noiseLfo;
      noiseLfoGainRef.current = noiseLfoGain;
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

    const context = audioContextRef.current;
    audioContextRef.current = null;
    masterGainRef.current = null;
    lofiLowpassRef.current = null;
    lofiHighshelfRef.current = null;
    lofiDriveRef.current = null;
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
      mediaSource.connect(lofiLowpassRef.current!);
      mediaSourceRef.current = mediaSource;
      media.muted = isMutedRef.current;
      media.volume = isMutedRef.current ? 0 : volumeRef.current;
      debugAudio("connectMediaAudio:connected", {
        audioContextState: context.state,
        lofiAmount,
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
    isNoiseEnabledRef.current = nextSettings.isNoiseEnabled;
    noiseLevelRef.current = nextSettings.noiseLevel;

    setIsMuted(nextSettings.isMuted);
    setVolume(nextSettings.volume);
    setPlaybackRate(nextSettings.playbackRate);
    setIsLooping(nextSettings.isLooping);
    setIsAudioFxEnabled(nextSettings.isAudioFxEnabled);
    setLofiAmount(nextSettings.lofiAmount);
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
    isNoiseEnabledRef.current = isNoiseEnabled;
    noiseLevelRef.current = noiseLevel;

    updateAudioNodes();
  }, [
    isMuted,
    volume,
    isAudioFxEnabled,
    lofiAmount,
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
    isNoiseEnabled,
    noiseLevel,
  ]);

  return {
    audioContextRef,
    mediaSourceRef,
    masterGainRef,
    lofiLowpassRef,
    lofiHighshelfRef,
    lofiDriveRef,
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
