import {
  AudioContext,
  GainNode,
  OscillatorNode,
} from "node-web-audio-api";
import {
  createRetroAudioEngine,
  DEFAULT_AUDIO_SETTINGS,
  type RetroAudioSettingsRefs,
} from "../../src/retro-player/audio/createRetroAudioEngine.ts";

Object.assign(globalThis, {
  AudioContext,
});

const previewKindRef = { current: "audio" as const };
const mediaRef = { current: null };
const isPlayingRef = { current: true };

const LOFI_PRESET_SETTINGS = {
  ...DEFAULT_AUDIO_SETTINGS,
  isAudioFxEnabled: true,
  isNoiseEnabled: true,
  volume: 0.92,
  lofiAmount: 0.7,
  radioToneAmount: 0.18,
  bitCrushAmount: 0.22,
  sampleRateReductionAmount: 0.24,
  bassAmount: 0.08,
  midAmount: -0.08,
  trebleAmount: -0.18,
  stereoWidthAmount: -0.08,
  smallSpeakerRoomAmount: 0.08,
  wowFlutterAmount: 0.12,
  noiseLevel: 0.005,
  vinylDustAmount: 0,
};

const settingsRefs: RetroAudioSettingsRefs = {
  isMutedRef: { current: LOFI_PRESET_SETTINGS.isMuted },
  volumeRef: { current: LOFI_PRESET_SETTINGS.volume },
  playbackRateRef: { current: LOFI_PRESET_SETTINGS.playbackRate },
  isLoopingRef: { current: LOFI_PRESET_SETTINGS.isLooping },
  isAudioFxEnabledRef: { current: LOFI_PRESET_SETTINGS.isAudioFxEnabled },
  lofiAmountRef: { current: LOFI_PRESET_SETTINGS.lofiAmount },
  radioToneAmountRef: { current: LOFI_PRESET_SETTINGS.radioToneAmount },
  bitCrushAmountRef: { current: LOFI_PRESET_SETTINGS.bitCrushAmount },
  sampleRateReductionAmountRef: {
    current: LOFI_PRESET_SETTINGS.sampleRateReductionAmount,
  },
  bassAmountRef: { current: LOFI_PRESET_SETTINGS.bassAmount },
  midAmountRef: { current: LOFI_PRESET_SETTINGS.midAmount },
  trebleAmountRef: { current: LOFI_PRESET_SETTINGS.trebleAmount },
  stereoWidthAmountRef: { current: LOFI_PRESET_SETTINGS.stereoWidthAmount },
  smallSpeakerRoomAmountRef: {
    current: LOFI_PRESET_SETTINGS.smallSpeakerRoomAmount,
  },
  wowFlutterAmountRef: { current: LOFI_PRESET_SETTINGS.wowFlutterAmount },
  isNoiseEnabledRef: { current: LOFI_PRESET_SETTINGS.isNoiseEnabled },
  noiseLevelRef: { current: LOFI_PRESET_SETTINGS.noiseLevel },
  vinylDustAmountRef: { current: LOFI_PRESET_SETTINGS.vinylDustAmount },
};

type NodeAudioContextCtor = new (
  options?: AudioContextOptions & { sinkId?: { type: "none" } },
) => AudioContext;

const nodeProcess = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process;
const useSilentSink = nodeProcess?.env?.NODE_AUDIO_SINK === "none";

const engine = createRetroAudioEngine({
  instanceLabel: "node-example",
  previewKindRef,
  mediaRef,
  isPlayingRef,
  settingsRefs,
  createAudioContext: () =>
    useSilentSink
      ? new (AudioContext as NodeAudioContextCtor)({
          sinkId: {
            type: "none",
          },
        })
      : new AudioContext(),
});

const context = await engine.ensureAudioContext();
if (!context) {
  throw new Error("AudioContext is not available in this environment.");
}

console.log(
  "Running node audio sample with Lo-Fi preset settings.",
  useSilentSink ? "Silent sink mode." : "Speaker output mode.",
  "AudioWorklet-based params may be ignored in this Node sample.",
);

const oscillator = new OscillatorNode(context, {
  type: "sawtooth",
  frequency: 220,
});
const gain = new GainNode(context, { gain: 0.08 });

oscillator.connect(gain);
if (!engine.input) {
  throw new Error("Retro audio engine input is not available.");
}
gain.connect(engine.input);

const now = context.currentTime;
gain.gain.setValueAtTime(0.0001, now);
gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

oscillator.start(now);
oscillator.stop(now + 3);

await new Promise((resolve) => setTimeout(resolve, 3200));
await engine.disposeAudioEngine();

console.log("Finished node audio sample.");
