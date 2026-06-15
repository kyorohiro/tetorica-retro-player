import {
  AudioContext,
  GainNode,
  OscillatorNode,
} from "node-web-audio-api";
import {
  createTetoricaRetroAudioNode,
} from "../../src/retro-player/audio/createRetroAudioEngine.ts";

Object.assign(globalThis, {
  AudioContext,
});

type NodeAudioContextCtor = new (
  options?: AudioContextOptions & { sinkId?: { type: "none" } },
) => AudioContext;

const nodeProcess = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process;
const useSilentSink = nodeProcess?.env?.NODE_AUDIO_SINK === "none";

const context = useSilentSink
  ? new (AudioContext as NodeAudioContextCtor)({
      sinkId: {
        type: "none",
      },
    })
  : new AudioContext();

const engine = createTetoricaRetroAudioNode(context, {
  instanceLabel: "node-example",
  preset: "lofiTape",
  params: {
    lofiAmount: 0.7,
    wowFlutterAmount: 0.12,
  },
});

await engine.ensureInitialized();
engine.setParams(
  {
    stereoWidthAmount: -0.08,
    noiseLevel: 0.005,
  },
  true,
);

console.log(
  "Running node audio sample with lofiTape preset settings.",
  useSilentSink ? "Silent sink mode." : "Speaker output mode.",
  "AudioWorklet-based params may be ignored in this Node sample.",
);

const oscillator = new OscillatorNode(context, {
  type: "sawtooth",
  frequency: 220,
});
const gain = new GainNode(context, { gain: 0.01 });

oscillator.connect(gain);
if (!engine.input) {
  throw new Error("Retro audio engine input is not available.");
}
gain.connect(engine.input);
await engine.connect(context.destination);

const now = context.currentTime;
gain.gain.setValueAtTime(0.0001, now);
gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

oscillator.start(now);
oscillator.stop(now + 3);

await new Promise((resolve) => setTimeout(resolve, 3200));
await engine.disposeAudioEngine();

console.log("Finished node audio sample.");
