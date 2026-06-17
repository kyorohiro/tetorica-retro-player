import { useEffect, useRef, useState, type MutableRefObject } from "react";
import {
  loadPersistedRetroSettings,
  savePersistedRetroAudioSettings,
} from "./persistedRetroSettings";
import {
  createRetroAudioEngine,
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
  isPlayingRef: _isPlayingRef,
}: UseRetroAudioEngineParams) {
  void _isPlayingRef;
  const [audioContext] = useState(() => new AudioContext());
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
  const [audioEngine] = useState(() =>
    createRetroAudioEngine({
      context: audioContext,
      instanceLabel,
      params: initialAudioSettings,
      isPlaying,
      connectOutputToDestination: true,
      connectOutputToRecordingDestination: true,
    }),
  );
  const [audioNodeRefs] = useState(() => ({
    audioContextRef: createCurrentAccessor(() => audioEngine.audioContext),
    masterGainRef: createCurrentAccessor(() => audioEngine.masterGain),
    radioToneHighpassRef: createCurrentAccessor(() => audioEngine.radioToneHighpass),
    radioToneLowpassRef: createCurrentAccessor(() => audioEngine.radioToneLowpass),
    radioTonePresenceRef: createCurrentAccessor(() => audioEngine.radioTonePresence),
    recordingDestinationRef: createCurrentAccessor(() => audioEngine.recordingDestination),
    lofiLowpassRef: createCurrentAccessor(() => audioEngine.lofiLowpass),
    lofiHighshelfRef: createCurrentAccessor(() => audioEngine.lofiHighshelf),
    lofiDriveRef: createCurrentAccessor(() => audioEngine.lofiDrive),
    bitcrusherRef: createCurrentAccessor(() => audioEngine.bitcrusher),
    bassEqRef: createCurrentAccessor(() => audioEngine.bassEq),
    midEqRef: createCurrentAccessor(() => audioEngine.midEq),
    trebleEqRef: createCurrentAccessor(() => audioEngine.trebleEq),
    stereoWidthRef: createCurrentAccessor(() => audioEngine.stereoWidth),
    roomDryGainRef: createCurrentAccessor(() => audioEngine.roomDryGain),
    roomConvolverRef: createCurrentAccessor(() => audioEngine.roomConvolver),
    roomWetGainRef: createCurrentAccessor(() => audioEngine.roomWetGain),
    wowFlutterDelayRef: createCurrentAccessor(() => audioEngine.wowFlutterDelay),
    wowLfoRef: createCurrentAccessor(() => audioEngine.wowLfo),
    wowLfoGainRef: createCurrentAccessor(() => audioEngine.wowLfoGain),
    flutterLfoRef: createCurrentAccessor(() => audioEngine.flutterLfo),
    flutterLfoGainRef: createCurrentAccessor(() => audioEngine.flutterLfoGain),
    noiseSourceRef: createCurrentAccessor(() => audioEngine.noiseSource),
    noiseFilterRef: createCurrentAccessor(() => audioEngine.noiseFilter),
    noisePannerRef: createCurrentAccessor(() => audioEngine.noisePanner),
    noiseGainRef: createCurrentAccessor(() => audioEngine.noiseGain),
    noiseLfoRef: createCurrentAccessor(() => audioEngine.noiseLfo),
    noiseLfoGainRef: createCurrentAccessor(() => audioEngine.noiseLfoGain),
    crackleSourceRef: createCurrentAccessor(() => audioEngine.crackleSource),
    crackleFilterRef: createCurrentAccessor(() => audioEngine.crackleFilter),
    vinylDustBedFilterRef: createCurrentAccessor(() => audioEngine.vinylDustBedFilter),
    vinylDustBedGainRef: createCurrentAccessor(() => audioEngine.vinylDustBedGain),
    crackleGainRef: createCurrentAccessor(() => audioEngine.crackleGain),
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

  const debugAudio = (label: string, payload?: Record<string, unknown>) =>
    audioEngine.debugAudio(label, payload);
  const ensureInitialized = () => audioEngine.ensureInitialized();
  const ensureAudioContext = () => audioEngine.ensureInitialized();
  const updateAudioNodes = () => audioEngine.updateAudioNodes();
  const connectSourceNode = (sourceNode: AudioNode) =>
    audioEngine.connectSourceNode(sourceNode);
  const disposeAudioEngine = () => audioEngine.disposeAudioEngine();
  const setParams = (
    nextParams: Partial<RetroAudioSettings>,
    isPartialUpdate?: boolean,
  ) => audioEngine.setParams(nextParams, isPartialUpdate);
  const setEngineIsPlaying = (nextIsPlaying: boolean) =>
    audioEngine.setIsPlaying(nextIsPlaying);
  const setOutputEnabled = (isEnabled: boolean) =>
    audioEngine.setOutputEnabled(isEnabled);

  const connectMediaAudio = async (media: HTMLMediaElement) => {
    const context = await ensureInitialized();
    if (!context || !audioEngine.input) {
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
      mediaSource.connect(audioEngine.input);
      mediaSourceRef.current = mediaSource;
      media.muted = isMutedRef.current;
      media.volume = isMutedRef.current ? 0 : volumeRef.current;
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
    if (!mediaSource || !audioEngine.input) {
      return;
    }

    mediaSource.disconnect();
    mediaSource.connect(audioEngine.input);
    updateAudioNodes();
  };

  const disposeManagedAudioEngine = async () => {
    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;
    await disposeAudioEngine();
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
      mediaRef.current.muted = nextSettings.isMuted;
      mediaRef.current.volume = nextSettings.volume;
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
      mediaRef.current.muted = isMuted;
      mediaRef.current.volume = isMuted ? 0 : volume;
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
    ensureInitialized,
    updateAudioNodes,
    connectSourceNode,
    connectMediaAudio,
    reconnectCurrentMediaAudio,
    applyAudioSettings,
    resetAudioSettings,
    disposeAudioEngine: disposeManagedAudioEngine,
  };
}
