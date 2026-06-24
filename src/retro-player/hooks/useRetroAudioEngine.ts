import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  loadPersistedRetroSettings,
  savePersistedRetroAudioSettings,
} from "./persistedRetroSettings";
import {
  createRetroAudioEngine,
  TetoricaRetroAudioNode,
  type CurrentRef,
  type RetroAudioPreviewKind,
} from "../audio/TetoricaRetroAudioNode";
import {
  DEFAULT_AUDIO_SETTINGS,
  type RetroAudioSettings,
} from "../audio/preset";

type UseRetroAudioEngineParams = {
  instanceLabel: string;
  previewKind: RetroAudioPreviewKind;
  previewKindRef: MutableRefObject<RetroAudioPreviewKind>;
  mediaRef: MutableRefObject<HTMLMediaElement | null>;
  isPlaying: boolean;
  isPlayingRef: MutableRefObject<boolean>;
};

// Safari's createMediaElementSource() does not suppress the element's native audio output,
// causing double audio. Setting media.volume=0 suppresses native output while the Web Audio
// graph (masterGain) controls the actual output level.
// Chrome/Firefox suppress native output automatically, so media.volume must stay at the
// user's value (setting it to 0 would also silence the Web Audio source).
//
// navigator.vendor is used as the primary discriminator because it is not affected by
// Chrome DevTools' UA override (Chrome always reports "Google Inc." regardless of
// the emulated UA, so spoofed iOS Safari UA strings don't trigger this path).
function needsNativeAudioSuppression(): boolean {
  if (typeof navigator === "undefined") return false;
  // navigator.vendor === "Apple Computer, Inc." only in real Safari/WebKit.
  // Chrome DevTools UA emulation does NOT change navigator.vendor.
  if (navigator.vendor !== "Apple Computer, Inc.") return false;
  // Exclude iOS Chrome (CriOS), Firefox for iOS (FxiOS), Opera for iOS (OPiOS)
  // which also run on WebKit and share the same vendor string.
  const ua = navigator.userAgent;
  return !/CriOS|FxiOS|OPiOS/i.test(ua);
}

function createCurrentAccessor<T>(getValue: () => T): CurrentRef<T> {
  return {
    get current() {
      return getValue();
    },
  };
}

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
      noiseReductionAmount:
        persisted?.noiseReductionAmount ??
        DEFAULT_AUDIO_SETTINGS.noiseReductionAmount,
      bassAmount: persisted?.bassAmount ?? DEFAULT_AUDIO_SETTINGS.bassAmount,
      midAmount: persisted?.midAmount ?? DEFAULT_AUDIO_SETTINGS.midAmount,
      trebleAmount: persisted?.trebleAmount ?? DEFAULT_AUDIO_SETTINGS.trebleAmount,
      stereoWidthAmount:
        persisted?.stereoWidthAmount ?? DEFAULT_AUDIO_SETTINGS.stereoWidthAmount,
      smallSpeakerRoomAmount:
        persisted?.smallSpeakerRoomAmount ??
        DEFAULT_AUDIO_SETTINGS.smallSpeakerRoomAmount,
      wowFlutterAmount:
        persisted?.wowFlutterAmount ?? DEFAULT_AUDIO_SETTINGS.wowFlutterAmount,
      isNoiseEnabled:
        persisted?.isNoiseEnabled ?? DEFAULT_AUDIO_SETTINGS.isNoiseEnabled,
      noiseLevel: persisted?.noiseLevel ?? DEFAULT_AUDIO_SETTINGS.noiseLevel,
      vinylDustAmount:
        persisted?.vinylDustAmount ?? DEFAULT_AUDIO_SETTINGS.vinylDustAmount,
      delayAmount:
        persisted?.delayAmount ?? DEFAULT_AUDIO_SETTINGS.delayAmount,
      reverbAmount:
        persisted?.reverbAmount ?? DEFAULT_AUDIO_SETTINGS.reverbAmount,
      chorusAmount:
        persisted?.chorusAmount ?? DEFAULT_AUDIO_SETTINGS.chorusAmount,
      tapeSaturationAmount:
        persisted?.tapeSaturationAmount ?? DEFAULT_AUDIO_SETTINGS.tapeSaturationAmount,
      compressorAmount:
        persisted?.compressorAmount ?? DEFAULT_AUDIO_SETTINGS.compressorAmount,
      fxOutputTrimAmount:
        persisted?.fxOutputTrimAmount ?? DEFAULT_AUDIO_SETTINGS.fxOutputTrimAmount,
    } satisfies RetroAudioSettings;
  });
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
  const noiseReductionAmountRef = useRef<number>(initialAudioSettings.noiseReductionAmount);
  const bassAmountRef = useRef<number>(initialAudioSettings.bassAmount);
  const midAmountRef = useRef<number>(initialAudioSettings.midAmount);
  const trebleAmountRef = useRef<number>(initialAudioSettings.trebleAmount);
  const stereoWidthAmountRef = useRef<number>(initialAudioSettings.stereoWidthAmount);
  const smallSpeakerRoomAmountRef = useRef<number>(
    initialAudioSettings.smallSpeakerRoomAmount,
  );
  const wowFlutterAmountRef = useRef<number>(initialAudioSettings.wowFlutterAmount);
  const isNoiseEnabledRef = useRef<boolean>(initialAudioSettings.isNoiseEnabled);
  const noiseLevelRef = useRef<number>(initialAudioSettings.noiseLevel);
  const vinylDustAmountRef = useRef<number>(initialAudioSettings.vinylDustAmount);
  const delayAmountRef = useRef<number>(initialAudioSettings.delayAmount);
  const reverbAmountRef = useRef<number>(initialAudioSettings.reverbAmount);
  const chorusAmountRef = useRef<number>(initialAudioSettings.chorusAmount);
  const tapeSaturationAmountRef = useRef<number>(initialAudioSettings.tapeSaturationAmount);
  const compressorAmountRef = useRef<number>(initialAudioSettings.compressorAmount);
  const fxOutputTrimAmountRef = useRef<number>(initialAudioSettings.fxOutputTrimAmount);

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
  const [noiseReductionAmount, setNoiseReductionAmount] = useState<number>(
    initialAudioSettings.noiseReductionAmount,
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
  const [smallSpeakerRoomAmount, setSmallSpeakerRoomAmount] = useState<number>(
    initialAudioSettings.smallSpeakerRoomAmount,
  );
  const [wowFlutterAmount, setWowFlutterAmount] = useState<number>(
    initialAudioSettings.wowFlutterAmount,
  );
  const [isNoiseEnabled, setIsNoiseEnabled] = useState<boolean>(
    initialAudioSettings.isNoiseEnabled,
  );
  const [noiseLevel, setNoiseLevel] = useState<number>(initialAudioSettings.noiseLevel);
  const [vinylDustAmount, setVinylDustAmount] = useState<number>(
    initialAudioSettings.vinylDustAmount,
  );
  const [delayAmount, setDelayAmount] = useState<number>(
    initialAudioSettings.delayAmount,
  );
  const [reverbAmount, setReverbAmount] = useState<number>(
    initialAudioSettings.reverbAmount,
  );
  const [chorusAmount, setChorusAmount] = useState<number>(
    initialAudioSettings.chorusAmount,
  );
  const [tapeSaturationAmount, setTapeSaturationAmount] = useState<number>(
    initialAudioSettings.tapeSaturationAmount,
  );
  const [compressorAmount, setCompressorAmount] = useState<number>(
    initialAudioSettings.compressorAmount,
  );
  const [fxOutputTrimAmount, setFxOutputTrimAmount] = useState<number>(
    initialAudioSettings.fxOutputTrimAmount,
  );
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  // Lazy: AudioContext is created only on first audio operation (ensureInitialized /
  // connectSourceNode) to avoid Chrome auto-resuming a suspended context on the first
  // user gesture, which triggers repeated "audio device error" log spam.
  const audioContextOwnedRef = useRef<AudioContext | null>(null);
  const audioEngineRef = useRef<TetoricaRetroAudioNode | null>(null);

  const getOrCreateEngine = (): TetoricaRetroAudioNode => {
    if (!audioEngineRef.current) {
      const context = new AudioContext({ latencyHint: "interactive" });
      audioContextOwnedRef.current = context;
      audioEngineRef.current = createRetroAudioEngine({
        context,
        instanceLabel,
        params: initialAudioSettings,
        isPlaying: isPlayingRef.current,
        connectOutputToDestination: true,
        connectOutputToRecordingDestination: true,
      });
    }
    return audioEngineRef.current;
  };

  const [audioNodeRefs] = useState(() => ({
    audioContextRef: createCurrentAccessor(() => audioEngineRef.current?.audioContext ?? null),
    masterGainRef: createCurrentAccessor(() => audioEngineRef.current?.masterGain ?? null),
    radioToneHighpassRef: createCurrentAccessor(() => audioEngineRef.current?.radioToneHighpass ?? null),
    radioToneLowpassRef: createCurrentAccessor(() => audioEngineRef.current?.radioToneLowpass ?? null),
    radioTonePresenceRef: createCurrentAccessor(() => audioEngineRef.current?.radioTonePresence ?? null),
    recordingDestinationRef: createCurrentAccessor(() => audioEngineRef.current?.recordingDestination ?? null),
    lofiLowpassRef: createCurrentAccessor(() => audioEngineRef.current?.lofiLowpass ?? null),
    lofiHighshelfRef: createCurrentAccessor(() => audioEngineRef.current?.lofiHighshelf ?? null),
    lofiDriveRef: createCurrentAccessor(() => audioEngineRef.current?.lofiDrive ?? null),
    bitcrusherRef: createCurrentAccessor(() => audioEngineRef.current?.bitcrusher ?? null),
    bassEqRef: createCurrentAccessor(() => audioEngineRef.current?.bassEq ?? null),
    midEqRef: createCurrentAccessor(() => audioEngineRef.current?.midEq ?? null),
    trebleEqRef: createCurrentAccessor(() => audioEngineRef.current?.trebleEq ?? null),
    stereoWidthRef: createCurrentAccessor(() => audioEngineRef.current?.stereoWidth ?? null),
    roomDryGainRef: createCurrentAccessor(() => audioEngineRef.current?.roomDryGain ?? null),
    roomConvolverRef: createCurrentAccessor(() => audioEngineRef.current?.roomConvolver ?? null),
    roomWetGainRef: createCurrentAccessor(() => audioEngineRef.current?.roomWetGain ?? null),
    wowFlutterDelayRef: createCurrentAccessor(() => audioEngineRef.current?.wowFlutterDelay ?? null),
    wowLfoRef: createCurrentAccessor(() => audioEngineRef.current?.wowLfo ?? null),
    wowLfoGainRef: createCurrentAccessor(() => audioEngineRef.current?.wowLfoGain ?? null),
    flutterLfoRef: createCurrentAccessor(() => audioEngineRef.current?.flutterLfo ?? null),
    flutterLfoGainRef: createCurrentAccessor(() => audioEngineRef.current?.flutterLfoGain ?? null),
    noiseSourceRef: createCurrentAccessor(() => audioEngineRef.current?.noiseSource ?? null),
    noiseFilterRef: createCurrentAccessor(() => audioEngineRef.current?.noiseFilter ?? null),
    noisePannerRef: createCurrentAccessor(() => audioEngineRef.current?.noisePanner ?? null),
    noiseGainRef: createCurrentAccessor(() => audioEngineRef.current?.noiseGain ?? null),
    noiseLfoRef: createCurrentAccessor(() => audioEngineRef.current?.noiseLfo ?? null),
    noiseLfoGainRef: createCurrentAccessor(() => audioEngineRef.current?.noiseLfoGain ?? null),
    crackleSourceRef: createCurrentAccessor(() => audioEngineRef.current?.crackleSource ?? null),
    crackleFilterRef: createCurrentAccessor(() => audioEngineRef.current?.crackleFilter ?? null),
    vinylDustBedFilterRef: createCurrentAccessor(() => audioEngineRef.current?.vinylDustBedFilter ?? null),
    vinylDustBedGainRef: createCurrentAccessor(() => audioEngineRef.current?.vinylDustBedGain ?? null),
    crackleGainRef: createCurrentAccessor(() => audioEngineRef.current?.crackleGain ?? null),
  }));

  const {
    audioContextRef,
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
  } = audioNodeRefs;

  const getCurrentAudioSettings = (): RetroAudioSettings => ({
    isMuted: isMutedRef.current,
    volume: volumeRef.current,
    playbackRate: playbackRateRef.current,
    isLooping: isLoopingRef.current,
    isAudioFxEnabled: isAudioFxEnabledRef.current,
    lofiAmount: lofiAmountRef.current,
    radioToneAmount: radioToneAmountRef.current,
    bitCrushAmount: bitCrushAmountRef.current,
    sampleRateReductionAmount: sampleRateReductionAmountRef.current,
    noiseReductionAmount: noiseReductionAmountRef.current,
    bassAmount: bassAmountRef.current,
    midAmount: midAmountRef.current,
    trebleAmount: trebleAmountRef.current,
    stereoWidthAmount: stereoWidthAmountRef.current,
    smallSpeakerRoomAmount: smallSpeakerRoomAmountRef.current,
    wowFlutterAmount: wowFlutterAmountRef.current,
    isNoiseEnabled: isNoiseEnabledRef.current,
    noiseLevel: noiseLevelRef.current,
    vinylDustAmount: vinylDustAmountRef.current,
    delayAmount: delayAmountRef.current,
    reverbAmount: reverbAmountRef.current,
    chorusAmount: chorusAmountRef.current,
    tapeSaturationAmount: tapeSaturationAmountRef.current,
    compressorAmount: compressorAmountRef.current,
    fxOutputTrimAmount: fxOutputTrimAmountRef.current,
  });
  const debugAudio = (label: string, payload?: Record<string, unknown>) =>
    audioEngineRef.current?.debugAudio(label, payload);
  const ensureInitialized = () => getOrCreateEngine().ensureInitialized();
  const ensureAudioContext = () => getOrCreateEngine().ensureInitialized();
  const updateAudioNodes = () => audioEngineRef.current?.updateAudioNodes();
  const connectSourceNode = (sourceNode: AudioNode) =>
    getOrCreateEngine().connectSourceNode(sourceNode);
  const disposeAudioEngine = async () => { await audioEngineRef.current?.dispose(); };
  const setParams = (
    nextParams: Partial<RetroAudioSettings>,
    isPartialUpdate?: boolean,
  ) => audioEngineRef.current?.setParams(nextParams, isPartialUpdate);
  const setEngineIsPlaying = (nextIsPlaying: boolean) =>
    audioEngineRef.current?.setIsPlaying(nextIsPlaying);
  const setOutputEnabled = (isEnabled: boolean) =>
    audioEngineRef.current?.setOutputEnabled(isEnabled);

  const closeOwnedAudioContext = async (context: AudioContext) => {
    if (context.state === "closed") {
      return;
    }

    try {
      await context.close();
    } catch (error) {
      debugAudio("closeOwnedAudioContext:error", {
        audioContextState: context.state,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const recreateAudioEngine = async (reason: string) => {
    const previousContext = audioContextOwnedRef.current;
    const previousEngine = audioEngineRef.current;
    const nextSettings = getCurrentAudioSettings();

    debugAudio("recreateAudioEngine:start", {
      audioContextState: previousContext?.state ?? "none",
      hasMedia: Boolean(mediaRef.current),
      reason,
    });

    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;
    if (previousEngine) await previousEngine.dispose();
    if (previousContext) await closeOwnedAudioContext(previousContext);

    const nextContext = new AudioContext({ latencyHint: "interactive" });
    const nextEngine = createRetroAudioEngine({
      context: nextContext,
      instanceLabel,
      params: nextSettings,
      isPlaying: isPlayingRef.current,
      connectOutputToDestination: true,
      connectOutputToRecordingDestination: true,
    });

    audioContextOwnedRef.current = nextContext;
    audioEngineRef.current = nextEngine;

    const initializedContext = await nextEngine.ensureInitialized();
    nextEngine.setParams(nextSettings, true);
    nextEngine.setIsPlaying(isPlayingRef.current);
    nextEngine.setOutputEnabled(
      previewKindRef.current === "video" ||
        previewKindRef.current === "audio" ||
        previewKindRef.current === "capture",
    );

    debugAudio("recreateAudioEngine:ready", {
      audioContextState: initializedContext?.state ?? nextContext.state,
      hasMedia: Boolean(mediaRef.current),
      reason,
    });

    return initializedContext;
  };

  const connectMediaAudio = async (media: HTMLMediaElement) => {
    const context = await ensureInitialized();
    const engine = audioEngineRef.current;
    if (!context || !engine || !engine.input) {
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
      mediaSource.connect(engine.input);
      mediaSourceRef.current = mediaSource;

      // Apply initial state using best current knowledge (static fallback until probe runs)
      if (needsNativeAudioSuppression()) {
        media.muted = false;
        media.volume = 0;
      } else {
        media.muted = isMutedRef.current;
        media.volume = isMutedRef.current ? 0 : volumeRef.current;
      }

      debugAudio("connectMediaAudio:connected", {
        audioContextState: context.state,
        mediaTag: media.tagName,
        previewKind: previewKindRef.current,
      });
      updateAudioNodes();
    } catch (error) {
      debugAudio("connectMediaAudio:error", {
        audioContextState: context.state,
        mediaTag: media.tagName,
        message: error instanceof Error ? error.message : String(error),
        previewKind: previewKindRef.current,
      });
      throw error;
    }
  };

  const reconnectCurrentMediaAudio = () => {
    const mediaSource = mediaSourceRef.current;
    const engine = audioEngineRef.current;
    if (!mediaSource || !engine?.input) {
      return;
    }

    mediaSource.disconnect();
    mediaSource.connect(engine.input);
    updateAudioNodes();
  };

  const ensureAudioContextWithRecovery = async (reason: string) => {
    const context = await ensureInitialized();
    if (context) {
      // "suspended" はユーザーアクション待ちで復帰可能。再生成は "closed" (null) の時だけ。
      debugAudio("ensureAudioContextWithRecovery:healthy", {
        audioContextState: context.state,
        reason,
      });
      return context;
    }

    debugAudio("ensureAudioContextWithRecovery:recreate-needed", {
      audioContextState: audioContextOwnedRef.current?.state ?? "none",
      reason,
    });

    return recreateAudioEngine(reason);
  };

  const rebuildAudioGraphForCurrentMedia = async (reason: string) => {
    const media = mediaRef.current;
    const context = await recreateAudioEngine(reason);

    if (!context) {
      return null;
    }

    if (media) {
      await connectMediaAudio(media);
    }

    updateAudioNodes();
    debugAudio("rebuildAudioGraphForCurrentMedia:done", {
      audioContextState: context.state,
      hasMedia: Boolean(media),
      reason,
    });
    return context;
  };

  const disposeManagedAudioEngine = async () => {
    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;
    await disposeAudioEngine();
    if (audioContextOwnedRef.current) {
      await closeOwnedAudioContext(audioContextOwnedRef.current);
    }
  };

  const applyAudioSettings = (nextSettings: RetroAudioSettings) => {

    isMutedRef.current = nextSettings.isMuted;
    volumeRef.current = nextSettings.volume;
    playbackRateRef.current = nextSettings.playbackRate;
    isLoopingRef.current = nextSettings.isLooping;
    isAudioFxEnabledRef.current = nextSettings.isAudioFxEnabled;
    lofiAmountRef.current = nextSettings.lofiAmount;
    radioToneAmountRef.current = nextSettings.radioToneAmount;
    bitCrushAmountRef.current = nextSettings.bitCrushAmount;
    sampleRateReductionAmountRef.current = nextSettings.sampleRateReductionAmount;
    noiseReductionAmountRef.current = nextSettings.noiseReductionAmount;
    bassAmountRef.current = nextSettings.bassAmount;
    midAmountRef.current = nextSettings.midAmount;
    trebleAmountRef.current = nextSettings.trebleAmount;
    stereoWidthAmountRef.current = nextSettings.stereoWidthAmount;
    smallSpeakerRoomAmountRef.current = nextSettings.smallSpeakerRoomAmount;
    wowFlutterAmountRef.current = nextSettings.wowFlutterAmount;
    isNoiseEnabledRef.current = nextSettings.isNoiseEnabled;
    noiseLevelRef.current = nextSettings.noiseLevel;
    vinylDustAmountRef.current = nextSettings.vinylDustAmount;
    delayAmountRef.current = nextSettings.delayAmount;
    reverbAmountRef.current = nextSettings.reverbAmount;
    chorusAmountRef.current = nextSettings.chorusAmount;
    tapeSaturationAmountRef.current = nextSettings.tapeSaturationAmount;
    compressorAmountRef.current = nextSettings.compressorAmount;
    fxOutputTrimAmountRef.current = nextSettings.fxOutputTrimAmount;

    setIsMuted(nextSettings.isMuted);
    setVolume(nextSettings.volume);
    setPlaybackRate(nextSettings.playbackRate);
    setIsLooping(nextSettings.isLooping);
    setIsAudioFxEnabled(nextSettings.isAudioFxEnabled);
    setLofiAmount(nextSettings.lofiAmount);
    setRadioToneAmount(nextSettings.radioToneAmount);
    setBitCrushAmount(nextSettings.bitCrushAmount);
    setSampleRateReductionAmount(nextSettings.sampleRateReductionAmount);
    setNoiseReductionAmount(nextSettings.noiseReductionAmount);
    setBassAmount(nextSettings.bassAmount);
    setMidAmount(nextSettings.midAmount);
    setTrebleAmount(nextSettings.trebleAmount);
    setStereoWidthAmount(nextSettings.stereoWidthAmount);
    setSmallSpeakerRoomAmount(nextSettings.smallSpeakerRoomAmount);
    setWowFlutterAmount(nextSettings.wowFlutterAmount);
    setIsNoiseEnabled(nextSettings.isNoiseEnabled);
    setNoiseLevel(nextSettings.noiseLevel);
    setVinylDustAmount(nextSettings.vinylDustAmount);
    setDelayAmount(nextSettings.delayAmount);
    setReverbAmount(nextSettings.reverbAmount);
    setChorusAmount(nextSettings.chorusAmount);
    setTapeSaturationAmount(nextSettings.tapeSaturationAmount);
    setCompressorAmount(nextSettings.compressorAmount);
    setFxOutputTrimAmount(nextSettings.fxOutputTrimAmount);

    if (mediaRef.current) {
      if (needsNativeAudioSuppression() && mediaSourceRef.current) {
        mediaRef.current.muted = false;
        mediaRef.current.volume = 0;
      } else {
        mediaRef.current.muted = nextSettings.isMuted;
        mediaRef.current.volume = nextSettings.volume;
      }
      mediaRef.current.playbackRate = nextSettings.playbackRate;
      mediaRef.current.loop = nextSettings.isLooping;
    }

    setParams(nextSettings);
    window.requestAnimationFrame(updateAudioNodes);
  };

  const resetAudioSettings = () => applyAudioSettings({ ...DEFAULT_AUDIO_SETTINGS });

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
    noiseReductionAmountRef.current = noiseReductionAmount;
    bassAmountRef.current = bassAmount;
    midAmountRef.current = midAmount;
    trebleAmountRef.current = trebleAmount;
    stereoWidthAmountRef.current = stereoWidthAmount;
    smallSpeakerRoomAmountRef.current = smallSpeakerRoomAmount;
    wowFlutterAmountRef.current = wowFlutterAmount;
    isNoiseEnabledRef.current = isNoiseEnabled;
    noiseLevelRef.current = noiseLevel;
    vinylDustAmountRef.current = vinylDustAmount;
    delayAmountRef.current = delayAmount;
    reverbAmountRef.current = reverbAmount;
    chorusAmountRef.current = chorusAmount;
    tapeSaturationAmountRef.current = tapeSaturationAmount;
    compressorAmountRef.current = compressorAmount;
    fxOutputTrimAmountRef.current = fxOutputTrimAmount;

    setParams(
      {
        isMuted,
        volume,
        playbackRate,
        isLooping,
        isAudioFxEnabled,
        lofiAmount,
        radioToneAmount,
        bitCrushAmount,
        sampleRateReductionAmount,
        noiseReductionAmount,
        bassAmount,
        midAmount,
        trebleAmount,
        stereoWidthAmount,
        smallSpeakerRoomAmount,
        wowFlutterAmount,
        isNoiseEnabled,
        noiseLevel,
        vinylDustAmount,
        delayAmount,
        reverbAmount,
        chorusAmount,
        tapeSaturationAmount,
        compressorAmount,
        fxOutputTrimAmount,
      },
      true,
    );
    setEngineIsPlaying(isPlaying);
    setOutputEnabled(
      previewKind === "video" ||
        previewKind === "audio" ||
        previewKind === "capture",
    );

    if (mediaRef.current) {
      if (needsNativeAudioSuppression() && mediaSourceRef.current) {
        mediaRef.current.muted = false;
        mediaRef.current.volume = 0;
      } else {
        mediaRef.current.muted = isMuted;
        mediaRef.current.volume = isMuted ? 0 : volume;
      }
      mediaRef.current.playbackRate = playbackRate;
      mediaRef.current.loop = isLooping;
    }
  }, [
    isMuted,
    volume,
    isAudioFxEnabled,
    lofiAmount,
    radioToneAmount,
    bitCrushAmount,
    sampleRateReductionAmount,
    noiseReductionAmount,
    bassAmount,
    midAmount,
    trebleAmount,
    stereoWidthAmount,
    smallSpeakerRoomAmount,
    wowFlutterAmount,
    isNoiseEnabled,
    noiseLevel,
    vinylDustAmount,
    delayAmount,
    reverbAmount,
    chorusAmount,
    tapeSaturationAmount,
    compressorAmount,
    fxOutputTrimAmount,
    isPlaying,
    playbackRate,
    isLooping,
    previewKind,
  ]);

  useEffect(() => {
    const id = setTimeout(() => {
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
        noiseReductionAmount,
        bassAmount,
        midAmount,
        trebleAmount,
        stereoWidthAmount,
        smallSpeakerRoomAmount,
        wowFlutterAmount,
        isNoiseEnabled,
        noiseLevel,
        vinylDustAmount,
        delayAmount,
        reverbAmount,
        chorusAmount,
        tapeSaturationAmount,
        compressorAmount,
        fxOutputTrimAmount,
      });
    }, 300);
    return () => clearTimeout(id);
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
    noiseReductionAmount,
    bassAmount,
    midAmount,
    trebleAmount,
    stereoWidthAmount,
    smallSpeakerRoomAmount,
    wowFlutterAmount,
    isNoiseEnabled,
    noiseLevel,
    vinylDustAmount,
    delayAmount,
    reverbAmount,
    chorusAmount,
    tapeSaturationAmount,
    compressorAmount,
    fxOutputTrimAmount,
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
    smallSpeakerRoomAmountRef,
    wowFlutterAmountRef,
    isNoiseEnabledRef,
    noiseLevelRef,
    vinylDustAmountRef,
    delayAmountRef,
    reverbAmountRef,
    chorusAmountRef,
    tapeSaturationAmountRef,
    compressorAmountRef,
    fxOutputTrimAmountRef,
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
    noiseReductionAmount,
    setNoiseReductionAmount,
    bassAmount,
    setBassAmount,
    midAmount,
    setMidAmount,
    trebleAmount,
    setTrebleAmount,
    stereoWidthAmount,
    setStereoWidthAmount,
    smallSpeakerRoomAmount,
    setSmallSpeakerRoomAmount,
    wowFlutterAmount,
    setWowFlutterAmount,
    isNoiseEnabled,
    setIsNoiseEnabled,
    noiseLevel,
    setNoiseLevel,
    vinylDustAmount,
    setVinylDustAmount,
    delayAmount,
    setDelayAmount,
    reverbAmount,
    setReverbAmount,
    chorusAmount,
    setChorusAmount,
    tapeSaturationAmount,
    setTapeSaturationAmount,
    compressorAmount,
    setCompressorAmount,
    fxOutputTrimAmount,
    setFxOutputTrimAmount,
    debugAudio,
    ensureAudioContext,
    ensureAudioContextWithRecovery,
    ensureInitialized,
    updateAudioNodes,
    connectSourceNode,
    connectMediaAudio,
    reconnectCurrentMediaAudio,
    rebuildAudioGraphForCurrentMedia,
    applyAudioSettings,
    resetAudioSettings,
    disposeAudioEngine: disposeManagedAudioEngine,
  };
}
