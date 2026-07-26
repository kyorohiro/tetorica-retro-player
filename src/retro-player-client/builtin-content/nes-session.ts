import { Controller, NES } from "jsnes";
import type { ButtonKey } from "jsnes";
import type { NesControlButton } from "../../retro-player/types/gameControls";

const NES_WIDTH = 256;
const NES_HEIGHT = 240;
const NES_FRAME_MS = 1000 / 60;
const AUDIO_BUFFER_SIZE = 2048;
const MAX_AUDIO_QUEUE_LENGTH = 48000;
const AUDIO_RESUME_TIMEOUT_MS = 1200;

export type NesSession = {
  stream: MediaStream;
  needsUserGesture: boolean;
  resumeAudio: () => Promise<boolean>;
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

  const useLocalAudioMonitor = isSafariBrowser();
  const AudioContextCtor = getAudioContextCtor();
  const audioContext = AudioContextCtor ? new AudioContextCtor({ sampleRate: 48000 }) : null;
  const audioDestination = audioContext?.createMediaStreamDestination() ?? null;
  const audioProcessor = audioContext?.createScriptProcessor(AUDIO_BUFFER_SIZE, 0, 2) ?? null;
  const audioMuteGain = audioContext?.createGain() ?? null;
  const leftQueue: number[] = [];
  const rightQueue: number[] = [];
  let needsUserGesture = false;
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
      const left = event.outputBuffer.getChannelData(0);
      const right = event.outputBuffer.getChannelData(1);
      for (let i = 0; i < left.length; i += 1) {
        left[i] = leftQueue.length > 0 ? leftQueue.shift() ?? 0 : 0;
        right[i] = rightQueue.length > 0 ? rightQueue.shift() ?? 0 : 0;
      }
    };
    audioProcessor.connect(audioDestination);
    audioProcessor.connect(audioMuteGain);
    audioMuteGain.connect(audioContext.destination);
    needsUserGesture = !(await resumeAudio());
  }

  const videoStream = makeSilentStream(canvas);
  const stream = new MediaStream([
    ...videoStream.getVideoTracks(),
    ...(!useLocalAudioMonitor ? (audioDestination?.stream.getAudioTracks() ?? []) : []),
  ]);

  const nes = new NES({
    sampleRate: 48000,
    onFrame: (buffer) => {
      for (let i = 0; i < frameBuffer32.length; i += 1) {
        frameBuffer32[i] = 0xff000000 | buffer[i];
      }
      imageData.data.set(frameBuffer8);
      context.putImageData(imageData, 0, 0);
    },
    onAudioSample: audioProcessor
      ? (left, right) => {
          if (leftQueue.length >= MAX_AUDIO_QUEUE_LENGTH) {
            leftQueue.splice(0, leftQueue.length - MAX_AUDIO_QUEUE_LENGTH + 1);
          }
          if (rightQueue.length >= MAX_AUDIO_QUEUE_LENGTH) {
            rightQueue.splice(0, rightQueue.length - MAX_AUDIO_QUEUE_LENGTH + 1);
          }
          leftQueue.push(left);
          rightQueue.push(right);
        }
      : undefined,
  });

  nes.loadROM(romData);

  let frameTimerId: number | null = null;
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
    leftQueue.length = 0;
    rightQueue.length = 0;
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
      window.clearInterval(frameTimerId);
      frameTimerId = null;
    }
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    stream.getTracks().forEach((track) => track.stop());
    audioProcessor?.disconnect();
    audioMuteGain?.disconnect();
    void audioContext?.close().catch(() => {});
  };

  frameTimerId = window.setInterval(stepFrame, NES_FRAME_MS);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return {
    stream,
    needsUserGesture,
    resumeAudio,
    pressButton,
    releaseButton,
    reset,
    stop,
  };
}
