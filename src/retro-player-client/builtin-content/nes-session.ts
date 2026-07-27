import { Controller, NES } from "jsnes";
import type { ButtonKey } from "jsnes";
import type { NesControlButton } from "../../retro-player/types/gameControls";

const NES_WIDTH = 256;
const NES_HEIGHT = 240;
const NES_EMULATION_FPS = 60;
const NES_RENDER_FPS = 30;
const NES_FRAME_MS = 1000 / NES_EMULATION_FPS;
const NES_RENDER_EVERY_N_FRAMES = Math.max(1, Math.round(NES_EMULATION_FPS / NES_RENDER_FPS));
const AUDIO_BUFFER_SIZE = 4096;
const MAX_AUDIO_QUEUE_LENGTH = 48000;
const AUDIO_RESUME_TIMEOUT_MS = 1200;
const MAX_FRAME_DRIFT_MS = 250;
const AUDIO_CATCH_UP_THRESHOLD = 1024;
const AUDIO_CATCH_UP_FRAMES = 2;

type StereoRingBuffer = {
  push: (left: number, right: number) => void;
  shift: () => [number, number] | null;
  size: () => number;
  clear: () => void;
};

const createStereoRingBuffer = (capacity: number): StereoRingBuffer => {
  const left = new Float32Array(capacity);
  const right = new Float32Array(capacity);
  let readIndex = 0;
  let writeIndex = 0;
  let size = 0;

  const advance = (index: number) => (index + 1) % capacity;

  return {
    push(sampleLeft, sampleRight) {
      if (size >= capacity) {
        readIndex = advance(readIndex);
        size -= 1;
      }
      left[writeIndex] = sampleLeft;
      right[writeIndex] = sampleRight;
      writeIndex = advance(writeIndex);
      size += 1;
    },
    shift() {
      if (size <= 0) {
        return null;
      }
      const sample: [number, number] = [left[readIndex], right[readIndex]];
      readIndex = advance(readIndex);
      size -= 1;
      return sample;
    },
    size() {
      return size;
    },
    clear() {
      readIndex = 0;
      writeIndex = 0;
      size = 0;
    },
  };
};

export type NesSession = {
  stream: MediaStream;
  audioStream: MediaStream | null;
  canvas: HTMLCanvasElement;
  needsUserGesture: boolean;
  resumeAudio: () => Promise<boolean>;
  setLocalMonitorEnabled: (enabled: boolean) => void;
  setLocalMonitorVolume: (volume: number) => void;
  pressButton: (button: NesControlButton) => void;
  releaseButton: (button: NesControlButton) => void;
  reset: () => void;
  stop: () => void;
};

type AudioContextCtor = new (contextOptions?: AudioContextOptions) => AudioContext;

const getAudioContextCtor = (): AudioContextCtor | null => {
  const windowWithWebkit = window as Window & {
    webkitAudioContext?: AudioContextCtor;
  };
  return window.AudioContext ?? windowWithWebkit.webkitAudioContext ?? null;
};

const isSafariBrowser = () => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const userAgent = navigator.userAgent || "";
  return /Safari/i.test(userAgent) && !/Chrome|Chromium|Android/i.test(userAgent);
};

const KEY_TO_BUTTON = new Map<string, ButtonKey>([
  ["x", Controller.BUTTON_A],
  ["z", Controller.BUTTON_B],
  ["enter", Controller.BUTTON_START],
  ["shift", Controller.BUTTON_SELECT],
  ["arrowup", Controller.BUTTON_UP],
  ["arrowdown", Controller.BUTTON_DOWN],
  ["arrowleft", Controller.BUTTON_LEFT],
  ["arrowright", Controller.BUTTON_RIGHT],
  ["s", Controller.BUTTON_TURBO_A],
  ["a", Controller.BUTTON_TURBO_B],
]);

const NES_BUTTON_TO_BUTTON_KEY: Record<NesControlButton, ButtonKey> = {
  up: Controller.BUTTON_UP,
  down: Controller.BUTTON_DOWN,
  left: Controller.BUTTON_LEFT,
  right: Controller.BUTTON_RIGHT,
  a: Controller.BUTTON_A,
  b: Controller.BUTTON_B,
  start: Controller.BUTTON_START,
  select: Controller.BUTTON_SELECT,
};

const makeSilentStream = (canvas: HTMLCanvasElement) => canvas.captureStream(60);

export const isNesRomFile = (file: File) => /\.nes$/i.test(file.name);

export async function startNesSession(file: File): Promise<NesSession> {
  const romData = await file.arrayBuffer();
  const canvas = document.createElement("canvas");
  canvas.width = NES_WIDTH;
  canvas.height = NES_HEIGHT;
  canvas.style.imageRendering = "pixelated";

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Failed to create NES canvas context");
  }

  const imageData = context.getImageData(0, 0, NES_WIDTH, NES_HEIGHT);
  const frameBuffer = new ArrayBuffer(imageData.data.length);
  const frameBuffer8 = new Uint8ClampedArray(frameBuffer);
  const frameBuffer32 = new Uint32Array(frameBuffer);
  frameBuffer32.fill(0xff000000);
  let renderedFrameCount = 0;

  const useLocalAudioMonitor = isSafariBrowser();
  const AudioContextCtor = getAudioContextCtor();
  const audioContext = AudioContextCtor ? new AudioContextCtor() : null;
  const audioDestination = audioContext?.createMediaStreamDestination() ?? null;
  const audioProcessor = audioContext?.createScriptProcessor(AUDIO_BUFFER_SIZE, 0, 2) ?? null;
  const audioMuteGain = audioContext?.createGain() ?? null;
  const audioQueue = createStereoRingBuffer(MAX_AUDIO_QUEUE_LENGTH);
  const nesSampleRate = audioContext?.sampleRate ?? 48000;
  let needsUserGesture = false;
  let fillAudioUnderrun: (() => void) | null = null;
  const isAudioRunning = () => audioContext?.state === "running";

  const resumeAudio = async () => {
    if (!audioContext) {
      return false;
    }

    if (isAudioRunning()) {
      needsUserGesture = false;
      return true;
    }

    try {
      const resumed = await Promise.race([
        audioContext.resume().then(() => true).catch(() => false),
        new Promise<boolean>((resolve) => {
          window.setTimeout(() => resolve(false), AUDIO_RESUME_TIMEOUT_MS);
        }),
      ]);
      needsUserGesture = !isAudioRunning();
      return resumed && isAudioRunning();
    } catch {
      needsUserGesture = !isAudioRunning();
      return false;
    }
  };

  if (audioProcessor && audioDestination && audioMuteGain && audioContext) {
    audioMuteGain.gain.value = useLocalAudioMonitor ? 1 : 0;
    audioProcessor.onaudioprocess = (event) => {
      fillAudioUnderrun?.();
      const left = event.outputBuffer.getChannelData(0);
      const right = event.outputBuffer.getChannelData(1);
      for (let i = 0; i < left.length; i += 1) {
        const sample = audioQueue.shift();
        left[i] = sample?.[0] ?? 0;
        right[i] = sample?.[1] ?? 0;
      }
    };
    audioProcessor.connect(audioDestination);
    audioProcessor.connect(audioMuteGain);
    audioMuteGain.connect(audioContext.destination);
    needsUserGesture = !(await resumeAudio());
  }

  const videoStream = makeSilentStream(canvas);
  const audioStream = audioDestination?.stream ?? null;
  const stream = new MediaStream([
    ...videoStream.getVideoTracks(),
    ...(!useLocalAudioMonitor ? (audioDestination?.stream.getAudioTracks() ?? []) : []),
  ]);

  const setLocalMonitorEnabled = (enabled: boolean) => {
    if (!audioMuteGain) {
      return;
    }
    audioMuteGain.gain.value = enabled ? 1 : 0;
  };

  const setLocalMonitorVolume = (volume: number) => {
    if (!audioMuteGain) {
      return;
    }
    audioMuteGain.gain.value = Math.max(0, Math.min(1, volume));
  };

  const nes = new NES({
    sampleRate: nesSampleRate,
    onFrame: (buffer) => {
      for (let i = 0; i < frameBuffer32.length; i += 1) {
        frameBuffer32[i] = 0xff000000 | buffer[i];
      }
      renderedFrameCount += 1;
      if (
        renderedFrameCount === 1 ||
        renderedFrameCount % NES_RENDER_EVERY_N_FRAMES === 0
      ) {
        imageData.data.set(frameBuffer8);
        context.putImageData(imageData, 0, 0);
      }
    },
    onAudioSample: audioProcessor
      ? (left, right) => {
          audioQueue.push(left, right);
        }
      : undefined,
  });

  nes.loadROM(romData);
  nes.setFramerate(NES_EMULATION_FPS);

  let frameTimerId: number | null = null;
  let nextFrameAt = performance.now() + NES_FRAME_MS;
  let stopped = false;

  const stepFrame = () => {
    if (stopped) return;
    try {
      nes.frame();
    } catch (error) {
      console.error("[jsnes] frame failed", error);
      stop();
    }
  };

  fillAudioUnderrun = () => {
    if (stopped) {
      return;
    }
    if (audioQueue.size() >= AUDIO_CATCH_UP_THRESHOLD) {
      return;
    }
    for (let i = 0; i < AUDIO_CATCH_UP_FRAMES && audioQueue.size() < AUDIO_CATCH_UP_THRESHOLD; i += 1) {
      stepFrame();
    }
  };

  const scheduleNextFrame = () => {
    if (stopped) return;
    const now = performance.now();
    if (now - nextFrameAt > MAX_FRAME_DRIFT_MS) {
      nextFrameAt = now + NES_FRAME_MS;
    }
    const delay = Math.max(0, nextFrameAt - now);
    frameTimerId = window.setTimeout(() => {
      frameTimerId = null;
      stepFrame();
      nextFrameAt += NES_FRAME_MS;
      scheduleNextFrame();
    }, delay);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const button = KEY_TO_BUTTON.get(event.key.toLowerCase());
    if (button === undefined) return;
    event.preventDefault();
    nes.buttonDown(1, button);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const button = KEY_TO_BUTTON.get(event.key.toLowerCase());
    if (button === undefined) return;
    event.preventDefault();
    nes.buttonUp(1, button);
  };

  const pressButton = (button: NesControlButton) => {
    nes.buttonDown(1, NES_BUTTON_TO_BUTTON_KEY[button]);
  };

  const releaseButton = (button: NesControlButton) => {
    nes.buttonUp(1, NES_BUTTON_TO_BUTTON_KEY[button]);
  };

  const reset = () => {
    audioQueue.clear();
    releaseButton("up");
    releaseButton("down");
    releaseButton("left");
    releaseButton("right");
    releaseButton("a");
    releaseButton("b");
    releaseButton("start");
    releaseButton("select");
    nes.reloadROM();
  };

  const stop = () => {
    if (stopped) return;
    stopped = true;
    if (frameTimerId !== null) {
      window.clearTimeout(frameTimerId);
      frameTimerId = null;
    }
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    stream.getTracks().forEach((track) => track.stop());
    audioProcessor?.disconnect();
    audioMuteGain?.disconnect();
    void audioContext?.close().catch(() => {});
  };

  scheduleNextFrame();
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return {
    stream,
    audioStream,
    canvas,
    needsUserGesture,
    resumeAudio,
    setLocalMonitorEnabled,
    setLocalMonitorVolume,
    pressButton,
    releaseButton,
    reset,
    stop,
  };
}
