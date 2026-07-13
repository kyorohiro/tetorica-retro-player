import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type SetStateAction,
} from "react";
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
import { needsNativeAudioSuppression } from "../platform/runtime";
import { getHlsInstance } from "../media/RetroMediaSource";
import {
  DEFAULT_AUDIO_PRESET_SETTINGS,
  type RetroAudioSettings,
} from "../audio/preset";

const LATENCY_HINT_STORAGE_KEY = "tetorica-retro-player.latency-hint";

function loadLatencyHint(): AudioContextLatencyCategory {
  try {
    const v = localStorage.getItem(LATENCY_HINT_STORAGE_KEY);
    if (v === "interactive" || v === "balanced" || v === "playback") return v;
  } catch {}
  return "balanced";
}

function saveLatencyHint(hint: AudioContextLatencyCategory): void {
  try { localStorage.setItem(LATENCY_HINT_STORAGE_KEY, hint); } catch {}
}

type UseRetroAudioEngineParams = {
  instanceLabel: string;
  previewKind: RetroAudioPreviewKind;
  previewKindRef: MutableRefObject<RetroAudioPreviewKind>;
  mediaRef: MutableRefObject<HTMLMediaElement | null>;
  isPlaying: boolean;
  isPlayingRef: MutableRefObject<boolean>;
  nativePlaybackMode: boolean;
  playbackSource: "builtin-tone" | "media";
};

// Safari's createMediaElementSource() does not suppress the element's native audio output,
// causing double audio. Setting media.volume=0 suppresses native output while the Web Audio
// graph (masterGain) controls the actual output level.
// Chrome/Firefox suppress native output automatically, so media.volume must stay at the
// user's value (setting it to 0 would also silence the Web Audio source).
//
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
  nativePlaybackMode,
  playbackSource,
}: UseRetroAudioEngineParams) {
  const shouldUseDestinationOutput = !nativePlaybackMode || playbackSource === "builtin-tone";
  const [latencyHint, setLatencyHintState] = useState<AudioContextLatencyCategory>(loadLatencyHint);
  const latencyHintRef = useRef<AudioContextLatencyCategory>(latencyHint);

  const setLatencyHint = useCallback((hint: AudioContextLatencyCategory) => {
    latencyHintRef.current = hint;
    saveLatencyHint(hint);
    setLatencyHintState(hint);
  }, []);
  const [initialAudioSettings] = useState(() => {
    const persisted = loadPersistedRetroSettings()?.audio;

    return {
      ...DEFAULT_AUDIO_PRESET_SETTINGS,
      ...persisted,
    } satisfies RetroAudioSettings;
  });
  const audioOptimizationModeRef = useRef<RetroAudioSettings["audioOptimizationMode"]>(
    initialAudioSettings.audioOptimizationMode,
  );
  const nativeAudioSuppressionOverrideRef = useRef<boolean | null>(
    initialAudioSettings.nativeAudioSuppressionOverride ?? null,
  );
  const preferNativeHlsOverrideRef = useRef<boolean | null>(
    initialAudioSettings.preferNativeHlsOverride ?? null,
  );
  const videoFilterLiteOverrideRef = useRef<boolean | null>(
    initialAudioSettings.videoFilterLiteOverride ?? null,
  );
  const isMutedRef = useRef<boolean>(initialAudioSettings.isMuted);
  const volumeRef = useRef<number>(initialAudioSettings.volume);
  const playbackRateRef = useRef<number>(initialAudioSettings.playbackRate);
  const isLoopingRef = useRef<boolean>(initialAudioSettings.isLooping);
  const isAudioFxEnabledRef = useRef<boolean>(initialAudioSettings.isAudioFxEnabled);
  const lofiAmountRef = useRef<number>(initialAudioSettings.lofiAmount);
  const radioToneAmountRef = useRef<number>(initialAudioSettings.radioToneAmount);
  const bitCrushAmountRef = useRef<number>(initialAudioSettings.bitCrushAmount);
  const bitCrushNoiseAmountRef = useRef<number>(initialAudioSettings.bitCrushNoiseAmount);
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
  const noiseWarmthAmountRef = useRef<number>(initialAudioSettings.noiseWarmthAmount);
  const noiseAirAmountRef = useRef<number>(initialAudioSettings.noiseAirAmount);
  const noisePresenceAmountRef = useRef<number>(initialAudioSettings.noisePresenceAmount);
  const delayAmountRef = useRef<number>(initialAudioSettings.delayAmount);
  const reverbAmountRef = useRef<number>(initialAudioSettings.reverbAmount);
  const chorusAmountRef = useRef<number>(initialAudioSettings.chorusAmount);
  const tapeSaturationAmountRef = useRef<number>(initialAudioSettings.tapeSaturationAmount);
  const compressorAmountRef = useRef<number>(initialAudioSettings.compressorAmount);
  const fxOutputTrimAmountRef = useRef<number>(initialAudioSettings.fxOutputTrimAmount);
  const inputTrimAmountRef = useRef<number>(initialAudioSettings.inputTrimAmount);

  const [audioOptimizationMode, setAudioOptimizationModeState] = useState<
    RetroAudioSettings["audioOptimizationMode"]
  >(initialAudioSettings.audioOptimizationMode);
  const [nativeAudioSuppressionOverride, setNativeAudioSuppressionOverrideState] = useState<boolean | null>(
    initialAudioSettings.nativeAudioSuppressionOverride ?? null,
  );
  const [preferNativeHlsOverride, setPreferNativeHlsOverrideState] = useState<boolean | null>(
    initialAudioSettings.preferNativeHlsOverride ?? null,
  );
  const [videoFilterLiteOverride, setVideoFilterLiteOverrideState] = useState<boolean | null>(
    initialAudioSettings.videoFilterLiteOverride ?? null,
  );
  const [isMuted, setIsMutedState] = useState<boolean>(initialAudioSettings.isMuted);
  const [playbackRate, setPlaybackRateState] = useState<number>(
    initialAudioSettings.playbackRate,
  );
  const [volume, setVolumeState] = useState<number>(initialAudioSettings.volume);
  const [isLooping, setIsLoopingState] = useState<boolean>(initialAudioSettings.isLooping);
  const [isAudioFxEnabled, setIsAudioFxEnabledState] = useState<boolean>(
    initialAudioSettings.isAudioFxEnabled,
  );
  const [lofiAmount, setLofiAmountState] = useState<number>(
    initialAudioSettings.lofiAmount,
  );
  const [radioToneAmount, setRadioToneAmountState] = useState<number>(
    initialAudioSettings.radioToneAmount,
  );
  const [bitCrushAmount, setBitCrushAmountState] = useState<number>(
    initialAudioSettings.bitCrushAmount,
  );
  const [bitCrushNoiseAmount, setBitCrushNoiseAmountState] = useState<number>(
    initialAudioSettings.bitCrushNoiseAmount,
  );
  const [sampleRateReductionAmount, setSampleRateReductionAmountState] = useState<number>(
    initialAudioSettings.sampleRateReductionAmount,
  );
  const [noiseReductionAmount, setNoiseReductionAmountState] = useState<number>(
    initialAudioSettings.noiseReductionAmount,
  );
  const [bassAmount, setBassAmountState] = useState<number>(
    initialAudioSettings.bassAmount,
  );
  const [midAmount, setMidAmountState] = useState<number>(initialAudioSettings.midAmount);
  const [trebleAmount, setTrebleAmountState] = useState<number>(
    initialAudioSettings.trebleAmount,
  );
  const [stereoWidthAmount, setStereoWidthAmountState] = useState<number>(
    initialAudioSettings.stereoWidthAmount,
  );
  const [smallSpeakerRoomAmount, setSmallSpeakerRoomAmountState] = useState<number>(
    initialAudioSettings.smallSpeakerRoomAmount,
  );
  const [wowFlutterAmount, setWowFlutterAmountState] = useState<number>(
    initialAudioSettings.wowFlutterAmount,
  );
  const [isNoiseEnabled, setIsNoiseEnabledState] = useState<boolean>(
    initialAudioSettings.isNoiseEnabled,
  );
  const [noiseLevel, setNoiseLevelState] = useState<number>(initialAudioSettings.noiseLevel);
  const [vinylDustAmount, setVinylDustAmountState] = useState<number>(
    initialAudioSettings.vinylDustAmount,
  );
  const [noiseWarmthAmount, setNoiseWarmthAmountState] = useState<number>(
    initialAudioSettings.noiseWarmthAmount,
  );
  const [noiseAirAmount, setNoiseAirAmountState] = useState<number>(
    initialAudioSettings.noiseAirAmount,
  );
  const [noisePresenceAmount, setNoisePresenceAmountState] = useState<number>(
    initialAudioSettings.noisePresenceAmount,
  );
  const [delayAmount, setDelayAmountState] = useState<number>(
    initialAudioSettings.delayAmount,
  );
  const [reverbAmount, setReverbAmountState] = useState<number>(
    initialAudioSettings.reverbAmount,
  );
  const [chorusAmount, setChorusAmountState] = useState<number>(
    initialAudioSettings.chorusAmount,
  );
  const [tapeSaturationAmount, setTapeSaturationAmountState] = useState<number>(
    initialAudioSettings.tapeSaturationAmount,
  );
  const [compressorAmount, setCompressorAmountState] = useState<number>(
    initialAudioSettings.compressorAmount,
  );
  const [fxOutputTrimAmount, setFxOutputTrimAmountState] = useState<number>(
    initialAudioSettings.fxOutputTrimAmount,
  );
  const [inputTrimAmount, setInputTrimAmountState] = useState<number>(
    initialAudioSettings.inputTrimAmount,
  );
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null>(null);
  // Lazy: AudioContext is created only on first audio operation (ensureInitialized /
  // connectSourceNode) to avoid Chrome auto-resuming a suspended context on the first
  // user gesture, which triggers repeated "audio device error" log spam.
  const audioContextOwnedRef = useRef<AudioContext | null>(null);
  const audioEngineRef = useRef<TetoricaRetroAudioNode | null>(null);

  const getOrCreateEngine = (): TetoricaRetroAudioNode => {
    if (!audioEngineRef.current) {
      const context = new AudioContext({ latencyHint: latencyHintRef.current });
      audioContextOwnedRef.current = context;
      const engine = createRetroAudioEngine({
        context,
        instanceLabel,
        params: initialAudioSettings,
        isPlaying: isPlayingRef.current,
        connectOutputToDestination: false,
        connectOutputToRecordingDestination: true,
      });
      engine.setDestinationOutputEnabled(shouldUseDestinationOutput);
      audioEngineRef.current = engine;
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
    analyserRef: createCurrentAccessor(() => audioEngineRef.current?.analyser ?? null),
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
    analyserRef,
  } = audioNodeRefs;

  const getCurrentAudioSettings = (): RetroAudioSettings => ({
    audioOptimizationMode: audioOptimizationModeRef.current,
    nativeAudioSuppressionOverride: nativeAudioSuppressionOverrideRef.current,
    preferNativeHlsOverride: preferNativeHlsOverrideRef.current,
    videoFilterLiteOverride: videoFilterLiteOverrideRef.current,
    isMuted: isMutedRef.current,
    volume: volumeRef.current,
    playbackRate: playbackRateRef.current,
    isLooping: isLoopingRef.current,
    isAudioFxEnabled: isAudioFxEnabledRef.current,
    lofiAmount: lofiAmountRef.current,
    radioToneAmount: radioToneAmountRef.current,
    bitCrushAmount: bitCrushAmountRef.current,
    bitCrushNoiseAmount: bitCrushNoiseAmountRef.current,
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
    noiseWarmthAmount: noiseWarmthAmountRef.current,
    noiseAirAmount: noiseAirAmountRef.current,
    noisePresenceAmount: noisePresenceAmountRef.current,
    delayAmount: delayAmountRef.current,
    reverbAmount: reverbAmountRef.current,
    chorusAmount: chorusAmountRef.current,
    tapeSaturationAmount: tapeSaturationAmountRef.current,
    compressorAmount: compressorAmountRef.current,
    fxOutputTrimAmount: fxOutputTrimAmountRef.current,
    inputTrimAmount: inputTrimAmountRef.current,
  });
  const debugAudio = (label: string, payload?: Record<string, unknown>) =>
    audioEngineRef.current?.debugAudio(label, payload);
  const ensureInitialized = (options?: { requireActivation?: boolean }) =>
    getOrCreateEngine().ensureInitialized(options);
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
  const setDestinationOutputEnabled = (isEnabled: boolean) =>
    audioEngineRef.current?.setDestinationOutputEnabled(isEnabled);

  const syncCurrentMediaSettings = useCallback(() => {
    if (!mediaRef.current) {
      return;
    }

    if (
      needsNativeAudioSuppression(
        audioOptimizationModeRef.current,
        nativeAudioSuppressionOverrideRef.current,
      ) &&
      mediaSourceRef.current
    ) {
      mediaRef.current.muted = false;
      mediaRef.current.volume = 0;
    } else {
      mediaRef.current.muted = isMutedRef.current;
      mediaRef.current.volume = isMutedRef.current ? 0 : volumeRef.current;
    }
    mediaRef.current.playbackRate = playbackRateRef.current;
    mediaRef.current.loop = isLoopingRef.current;
  }, [mediaRef]);

  const createPatchedSetter = useCallback(
    <T,>(
      stateSetter: (value: T) => void,
      valueRef: MutableRefObject<T>,
      key: keyof RetroAudioSettings,
    ) =>
      (nextValueOrUpdater: SetStateAction<T>) => {
        const nextValue =
          typeof nextValueOrUpdater === "function"
            ? (nextValueOrUpdater as (current: T) => T)(valueRef.current)
            : nextValueOrUpdater;

        valueRef.current = nextValue;
        stateSetter(nextValue);
        setParams({ [key]: nextValue } as Partial<RetroAudioSettings>, true);

        if (
          key === "audioOptimizationMode" ||
          key === "nativeAudioSuppressionOverride" ||
          key === "preferNativeHlsOverride" ||
          key === "videoFilterLiteOverride" ||
          key === "isMuted" ||
          key === "volume" ||
          key === "playbackRate" ||
          key === "isLooping"
        ) {
          syncCurrentMediaSettings();
        }
      },
    [setParams, syncCurrentMediaSettings],
  );

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

    const nextContext = new AudioContext({ latencyHint: latencyHintRef.current });
    const nextEngine = createRetroAudioEngine({
      context: nextContext,
      instanceLabel,
      params: nextSettings,
      isPlaying: isPlayingRef.current,
      connectOutputToDestination: false,
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
    nextEngine.setDestinationOutputEnabled(shouldUseDestinationOutput);

    debugAudio("recreateAudioEngine:ready", {
      audioContextState: initializedContext?.state ?? nextContext.state,
      hasMedia: Boolean(mediaRef.current),
      reason,
    });

    return initializedContext;
  };

  const connectMediaAudio = async (media: HTMLMediaElement) => {
    const context = await ensureInitialized({ requireActivation: true });
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
      let mediaSource: MediaElementAudioSourceNode | MediaStreamAudioSourceNode;

      if (media.srcObject instanceof MediaStream) {
        const audioTracks = media.srcObject.getAudioTracks();
        if (audioTracks.length === 0) {
          media.muted = true;
          media.volume = 0;
          engine.setOutputEnabled(false);
          updateAudioNodes();
          debugAudio("connectMediaAudio:no-audio-tracks", {
            audioContextState: context.state,
            mediaTag: media.tagName,
            previewKind: previewKindRef.current,
          });
          return;
        }

        // For MediaStream sources (Tone.js, etc.): createMediaElementSource does not
        // route audio through the Web Audio chain on Safari when srcObject is a
        // MediaStream from a different AudioContext. Use createMediaStreamSource directly.
        mediaSource = context.createMediaStreamSource(media.srcObject);
        mediaSource.connect(engine.input);
        // Mute the HTML element — audio flows exclusively through Web Audio chain.
        media.muted = true;
        media.volume = 0;
      } else {
        // MediaSource-backed (hls.js) <video> was confirmed NOT to have its
        // native audio output redirected by createMediaElementSource() on
        // Tauri's WKWebView — raw, un-effected audio keeps playing through
        // speakers regardless of .muted/.volume (both verified to have no
        // effect). captureStream() + createMediaStreamSource() goes through
        // the same mechanism already proven to work for MediaStream
        // srcObject sources (Tone.js, see the branch above) — try that
        // first for hls.js-managed elements, falling back to the plain
        // element tap if captureStream() isn't available or has no audio.
        const isHlsManaged = media instanceof HTMLVideoElement && Boolean(getHlsInstance(media));
        const capturedStream = isHlsManaged
          ? (media as HTMLVideoElement & { captureStream?: () => MediaStream }).captureStream?.()
          : undefined;
        const capturedAudioTracks = capturedStream?.getAudioTracks() ?? [];

        if (capturedStream && capturedAudioTracks.length > 0) {
          mediaSource = context.createMediaStreamSource(capturedStream);
          mediaSource.connect(engine.input);
          media.muted = true;
          media.volume = 0;
        } else {
          mediaSource = context.createMediaElementSource(media);
          mediaSource.connect(engine.input);
          if (
            isHlsManaged ||
            needsNativeAudioSuppression(
              audioOptimizationModeRef.current,
              nativeAudioSuppressionOverrideRef.current,
            )
          ) {
            media.muted = true;
            media.volume = 0;
          } else {
            media.muted = isMutedRef.current;
            media.volume = isMutedRef.current ? 0 : volumeRef.current;
          }
        }
        debugAudio("connectMediaAudio:native-suppression", {
          isHlsManaged,
          usedCaptureStream: Boolean(capturedStream && capturedAudioTracks.length > 0),
          capturedAudioTrackCount: capturedAudioTracks.length,
          mediaMuted: media.muted,
          mediaVolume: media.volume,
        });
      }
      mediaSourceRef.current = mediaSource;

      debugAudio("connectMediaAudio:connected", {
        audioContextState: context.state,
        mediaTag: media.tagName,
        previewKind: previewKindRef.current,
      });
      // Sync isOutputEnabled immediately from the current previewKindRef so that
      // updateAudioNodes() uses the correct masterGain value. Without this, Safari
      // mode (Web Audio path) would compute masterGain=0 because the React effect
      // that calls setOutputEnabled hasn't re-rendered yet at this point.
      engine.setOutputEnabled(
        previewKindRef.current === "video" ||
          previewKindRef.current === "audio" ||
          previewKindRef.current === "capture",
      );
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

  const connectMediaStream = async (stream: MediaStream, mediaTag = "STREAM") => {
    const context = await ensureInitialized();
    const engine = audioEngineRef.current;
    const streamInputTarget = engine?.input ?? null;
    if (!context || !engine || !streamInputTarget) {
      debugAudio("connectMediaStream:no-context", {
        mediaTag,
      });
      return;
    }

    if (mediaSourceRef.current) {
      debugAudio("connectMediaStream:disconnect-previous", {
        mediaTag,
      });
      mediaSourceRef.current.disconnect();
      mediaSourceRef.current = null;
    }

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      engine.setOutputEnabled(false);
      updateAudioNodes();
      debugAudio("connectMediaStream:no-audio-tracks", {
        audioContextState: context.state,
        mediaTag,
        previewKind: previewKindRef.current,
      });
      return;
    }

    try {
      const mediaSource = context.createMediaStreamSource(stream);
      mediaSource.connect(streamInputTarget);
      mediaSourceRef.current = mediaSource;

      debugAudio("connectMediaStream:connected", {
        audioContextState: context.state,
        mediaTag,
        previewKind: previewKindRef.current,
        trackCount: audioTracks.length,
      });

      engine.setOutputEnabled(
        previewKindRef.current === "video" ||
          previewKindRef.current === "audio" ||
          previewKindRef.current === "capture",
      );
      updateAudioNodes();
    } catch (error) {
      debugAudio("connectMediaStream:error", {
        audioContextState: context.state,
        mediaTag,
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
    audioOptimizationModeRef.current = nextSettings.audioOptimizationMode;
    nativeAudioSuppressionOverrideRef.current = nextSettings.nativeAudioSuppressionOverride ?? null;
    preferNativeHlsOverrideRef.current = nextSettings.preferNativeHlsOverride ?? null;
    videoFilterLiteOverrideRef.current = nextSettings.videoFilterLiteOverride ?? null;
    isMutedRef.current = nextSettings.isMuted;
    volumeRef.current = nextSettings.volume;
    playbackRateRef.current = nextSettings.playbackRate;
    isLoopingRef.current = nextSettings.isLooping;
    isAudioFxEnabledRef.current = nextSettings.isAudioFxEnabled;
    lofiAmountRef.current = nextSettings.lofiAmount;
    radioToneAmountRef.current = nextSettings.radioToneAmount;
    bitCrushAmountRef.current = nextSettings.bitCrushAmount;
    bitCrushNoiseAmountRef.current = nextSettings.bitCrushNoiseAmount;
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
    noiseWarmthAmountRef.current = nextSettings.noiseWarmthAmount;
    noiseAirAmountRef.current = nextSettings.noiseAirAmount;
    noisePresenceAmountRef.current = nextSettings.noisePresenceAmount;
    delayAmountRef.current = nextSettings.delayAmount;
    reverbAmountRef.current = nextSettings.reverbAmount;
    chorusAmountRef.current = nextSettings.chorusAmount;
    tapeSaturationAmountRef.current = nextSettings.tapeSaturationAmount;
    compressorAmountRef.current = nextSettings.compressorAmount;
    fxOutputTrimAmountRef.current = nextSettings.fxOutputTrimAmount;
    inputTrimAmountRef.current = nextSettings.inputTrimAmount;

    setAudioOptimizationModeState(nextSettings.audioOptimizationMode);
    setNativeAudioSuppressionOverrideState(nextSettings.nativeAudioSuppressionOverride ?? null);
    setPreferNativeHlsOverrideState(nextSettings.preferNativeHlsOverride ?? null);
    setVideoFilterLiteOverrideState(nextSettings.videoFilterLiteOverride ?? null);
    setIsMutedState(nextSettings.isMuted);
    setVolumeState(nextSettings.volume);
    setPlaybackRateState(nextSettings.playbackRate);
    setIsLoopingState(nextSettings.isLooping);
    setIsAudioFxEnabledState(nextSettings.isAudioFxEnabled);
    setLofiAmountState(nextSettings.lofiAmount);
    setRadioToneAmountState(nextSettings.radioToneAmount);
    setBitCrushAmountState(nextSettings.bitCrushAmount);
    setBitCrushNoiseAmountState(nextSettings.bitCrushNoiseAmount);
    setSampleRateReductionAmountState(nextSettings.sampleRateReductionAmount);
    setNoiseReductionAmountState(nextSettings.noiseReductionAmount);
    setBassAmountState(nextSettings.bassAmount);
    setMidAmountState(nextSettings.midAmount);
    setTrebleAmountState(nextSettings.trebleAmount);
    setStereoWidthAmountState(nextSettings.stereoWidthAmount);
    setSmallSpeakerRoomAmountState(nextSettings.smallSpeakerRoomAmount);
    setWowFlutterAmountState(nextSettings.wowFlutterAmount);
    setIsNoiseEnabledState(nextSettings.isNoiseEnabled);
    setNoiseLevelState(nextSettings.noiseLevel);
    setVinylDustAmountState(nextSettings.vinylDustAmount);
    setNoiseWarmthAmountState(nextSettings.noiseWarmthAmount);
    setNoiseAirAmountState(nextSettings.noiseAirAmount);
    setNoisePresenceAmountState(nextSettings.noisePresenceAmount);
    setDelayAmountState(nextSettings.delayAmount);
    setReverbAmountState(nextSettings.reverbAmount);
    setChorusAmountState(nextSettings.chorusAmount);
    setTapeSaturationAmountState(nextSettings.tapeSaturationAmount);
    setCompressorAmountState(nextSettings.compressorAmount);
    setFxOutputTrimAmountState(nextSettings.fxOutputTrimAmount);
    setInputTrimAmountState(nextSettings.inputTrimAmount);

    syncCurrentMediaSettings();

    setParams(nextSettings);
    window.requestAnimationFrame(updateAudioNodes);
  };

  const resetAudioSettings = () => applyAudioSettings({ ...DEFAULT_AUDIO_PRESET_SETTINGS });

  const setAudioOptimizationMode = createPatchedSetter(
    setAudioOptimizationModeState,
    audioOptimizationModeRef,
    "audioOptimizationMode",
  );
  const setNativeAudioSuppressionOverride = createPatchedSetter(
    setNativeAudioSuppressionOverrideState,
    nativeAudioSuppressionOverrideRef,
    "nativeAudioSuppressionOverride",
  );
  const setPreferNativeHlsOverride = createPatchedSetter(
    setPreferNativeHlsOverrideState,
    preferNativeHlsOverrideRef,
    "preferNativeHlsOverride",
  );
  const setVideoFilterLiteOverride = createPatchedSetter(
    setVideoFilterLiteOverrideState,
    videoFilterLiteOverrideRef,
    "videoFilterLiteOverride",
  );
  const setIsMuted = createPatchedSetter(setIsMutedState, isMutedRef, "isMuted");
  const setPlaybackRate = createPatchedSetter(
    setPlaybackRateState,
    playbackRateRef,
    "playbackRate",
  );
  const setVolume = createPatchedSetter(setVolumeState, volumeRef, "volume");
  const setIsLooping = createPatchedSetter(setIsLoopingState, isLoopingRef, "isLooping");
  const setIsAudioFxEnabled = createPatchedSetter(
    setIsAudioFxEnabledState,
    isAudioFxEnabledRef,
    "isAudioFxEnabled",
  );
  const setLofiAmount = createPatchedSetter(setLofiAmountState, lofiAmountRef, "lofiAmount");
  const setRadioToneAmount = createPatchedSetter(
    setRadioToneAmountState,
    radioToneAmountRef,
    "radioToneAmount",
  );
  const setBitCrushAmount = createPatchedSetter(
    setBitCrushAmountState,
    bitCrushAmountRef,
    "bitCrushAmount",
  );
  const setBitCrushNoiseAmount = createPatchedSetter(
    setBitCrushNoiseAmountState,
    bitCrushNoiseAmountRef,
    "bitCrushNoiseAmount",
  );
  const setSampleRateReductionAmount = createPatchedSetter(
    setSampleRateReductionAmountState,
    sampleRateReductionAmountRef,
    "sampleRateReductionAmount",
  );
  const setNoiseReductionAmount = createPatchedSetter(
    setNoiseReductionAmountState,
    noiseReductionAmountRef,
    "noiseReductionAmount",
  );
  const setBassAmount = createPatchedSetter(setBassAmountState, bassAmountRef, "bassAmount");
  const setMidAmount = createPatchedSetter(setMidAmountState, midAmountRef, "midAmount");
  const setTrebleAmount = createPatchedSetter(
    setTrebleAmountState,
    trebleAmountRef,
    "trebleAmount",
  );
  const setStereoWidthAmount = createPatchedSetter(
    setStereoWidthAmountState,
    stereoWidthAmountRef,
    "stereoWidthAmount",
  );
  const setSmallSpeakerRoomAmount = createPatchedSetter(
    setSmallSpeakerRoomAmountState,
    smallSpeakerRoomAmountRef,
    "smallSpeakerRoomAmount",
  );
  const setWowFlutterAmount = createPatchedSetter(
    setWowFlutterAmountState,
    wowFlutterAmountRef,
    "wowFlutterAmount",
  );
  const setIsNoiseEnabled = createPatchedSetter(
    setIsNoiseEnabledState,
    isNoiseEnabledRef,
    "isNoiseEnabled",
  );
  const setNoiseLevel = createPatchedSetter(setNoiseLevelState, noiseLevelRef, "noiseLevel");
  const setVinylDustAmount = createPatchedSetter(
    setVinylDustAmountState,
    vinylDustAmountRef,
    "vinylDustAmount",
  );
  const setNoiseWarmthAmount = createPatchedSetter(
    setNoiseWarmthAmountState,
    noiseWarmthAmountRef,
    "noiseWarmthAmount",
  );
  const setNoiseAirAmount = createPatchedSetter(
    setNoiseAirAmountState,
    noiseAirAmountRef,
    "noiseAirAmount",
  );
  const setNoisePresenceAmount = createPatchedSetter(
    setNoisePresenceAmountState,
    noisePresenceAmountRef,
    "noisePresenceAmount",
  );
  const setDelayAmount = createPatchedSetter(setDelayAmountState, delayAmountRef, "delayAmount");
  const setReverbAmount = createPatchedSetter(
    setReverbAmountState,
    reverbAmountRef,
    "reverbAmount",
  );
  const setChorusAmount = createPatchedSetter(
    setChorusAmountState,
    chorusAmountRef,
    "chorusAmount",
  );
  const setTapeSaturationAmount = createPatchedSetter(
    setTapeSaturationAmountState,
    tapeSaturationAmountRef,
    "tapeSaturationAmount",
  );
  const setCompressorAmount = createPatchedSetter(
    setCompressorAmountState,
    compressorAmountRef,
    "compressorAmount",
  );
  const setFxOutputTrimAmount = createPatchedSetter(
    setFxOutputTrimAmountState,
    fxOutputTrimAmountRef,
    "fxOutputTrimAmount",
  );
  const setInputTrimAmount = createPatchedSetter(
    setInputTrimAmountState,
    inputTrimAmountRef,
    "inputTrimAmount",
  );

  useEffect(() => {
    setEngineIsPlaying(isPlaying);
    setOutputEnabled(
      previewKind === "video" ||
        previewKind === "audio" ||
        previewKind === "capture",
    );
    setDestinationOutputEnabled(shouldUseDestinationOutput);
    syncCurrentMediaSettings();
  }, [isPlaying, previewKind, setDestinationOutputEnabled, setEngineIsPlaying, shouldUseDestinationOutput, syncCurrentMediaSettings]);

  useEffect(() => {
    const id = setTimeout(() => {
      savePersistedRetroAudioSettings({
        audioOptimizationMode,
        nativeAudioSuppressionOverride,
        preferNativeHlsOverride,
        isMuted,
        volume,
        playbackRate,
        isLooping,
        isAudioFxEnabled,
        lofiAmount,
        radioToneAmount,
        bitCrushAmount,
        bitCrushNoiseAmount,
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
        noiseWarmthAmount,
        noiseAirAmount,
        noisePresenceAmount,
        delayAmount,
        reverbAmount,
        chorusAmount,
        tapeSaturationAmount,
        compressorAmount,
        fxOutputTrimAmount,
        inputTrimAmount,
      });
    }, 300);
    return () => clearTimeout(id);
  }, [
    audioOptimizationMode,
    nativeAudioSuppressionOverride,
    preferNativeHlsOverride,
    isMuted,
    volume,
    playbackRate,
    isLooping,
    isAudioFxEnabled,
    lofiAmount,
    radioToneAmount,
    bitCrushAmount,
    bitCrushNoiseAmount,
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
    noiseWarmthAmount,
    noiseAirAmount,
    noisePresenceAmount,
    delayAmount,
    reverbAmount,
    chorusAmount,
    tapeSaturationAmount,
    compressorAmount,
    fxOutputTrimAmount,
    inputTrimAmount,
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
    analyserRef,
    audioOptimizationModeRef,
    audioOptimizationMode,
    setAudioOptimizationMode,
    nativeAudioSuppressionOverrideRef,
    nativeAudioSuppressionOverride,
    setNativeAudioSuppressionOverride,
    preferNativeHlsOverrideRef,
    preferNativeHlsOverride,
    setPreferNativeHlsOverride,
    videoFilterLiteOverrideRef,
    videoFilterLiteOverride,
    setVideoFilterLiteOverride,
    latencyHint,
    setLatencyHint,
    isMutedRef,
    volumeRef,
    playbackRateRef,
    isLoopingRef,
    isAudioFxEnabledRef,
    lofiAmountRef,
    radioToneAmountRef,
    bitCrushAmountRef,
    bitCrushNoiseAmountRef,
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
    inputTrimAmountRef,
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
    bitCrushNoiseAmount,
    setBitCrushNoiseAmount,
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
    noiseWarmthAmount,
    setNoiseWarmthAmount,
    noiseAirAmount,
    setNoiseAirAmount,
    noisePresenceAmount,
    setNoisePresenceAmount,
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
    inputTrimAmount,
    setInputTrimAmount,
    debugAudio,
    ensureAudioContext,
    ensureAudioContextWithRecovery,
    ensureInitialized,
    updateAudioNodes,
    setEngineIsPlaying,
    connectSourceNode,
    connectMediaStream,
    connectMediaAudio,
    reconnectCurrentMediaAudio,
    rebuildAudioGraphForCurrentMedia,
    applyAudioSettings,
    resetAudioSettings,
    disposeAudioEngine: disposeManagedAudioEngine,
  };
}
