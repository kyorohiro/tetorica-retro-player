type GbControlButton =
  | "up"
  | "down"
  | "left"
  | "right"
  | "a"
  | "b"
  | "start"
  | "select";

type GbSession = {
  stream: MediaStream;
  audioStream: MediaStream | null;
  canvas: HTMLCanvasElement;
  needsUserGesture: boolean;
  resumeAudio: () => Promise<boolean>;
  setLocalMonitorEnabled: (enabled: boolean) => void;
  pressButton: (button: GbControlButton) => void;
  releaseButton: (button: GbControlButton) => void;
  reset: () => void;
  stop: () => void;
};

type AudioContextCtor = new (contextOptions?: AudioContextOptions) => AudioContext;

type BinjgbFactory = (moduleArg?: {
  locateFile?: (path: string, scriptDirectory?: string) => string;
}) => Promise<BinjgbModule>;

type BinjgbModule = {
  HEAP8: Int8Array;
  HEAPU8: Uint8Array;
  _malloc: (size: number) => number;
  _free: (ptr: number) => void;
  _file_data_delete: (fileDataPtr: number) => void;
  _emulator_new_simple: (
    romDataPtr: number,
    romDataSize: number,
    sampleRate: number,
    audioFrames: number,
    cgbColorCurve: number,
  ) => number;
  _emulator_delete: (emulatorPtr: number) => void;
  _emulator_get_ticks_f64: (emulatorPtr: number) => number;
  _emulator_run_until_f64: (emulatorPtr: number, ticks: number) => number;
  _emulator_was_ext_ram_updated: (emulatorPtr: number) => number;
  _emulator_read_ext_ram: (emulatorPtr: number, fileDataPtr: number) => void;
  _emulator_write_ext_ram: (emulatorPtr: number, fileDataPtr: number) => void;
  _joypad_new: () => number;
  _joypad_delete: (joypadPtr: number) => void;
  _emulator_set_default_joypad_callback: (emulatorPtr: number, joypadPtr: number) => void;
  _set_joyp_up: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_down: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_left: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_right: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_B: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_A: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_start: (emulatorPtr: number, enabled: number) => void;
  _set_joyp_select: (emulatorPtr: number, enabled: number) => void;
  _get_frame_buffer_ptr: (emulatorPtr: number) => number;
  _get_frame_buffer_size: (emulatorPtr: number) => number;
  _get_audio_buffer_ptr: (emulatorPtr: number) => number;
  _get_audio_buffer_capacity: (emulatorPtr: number) => number;
  _ext_ram_file_data_new: (emulatorPtr: number) => number;
  _get_file_data_ptr: (fileDataPtr: number) => number;
  _get_file_data_size: (fileDataPtr: number) => number;
};

declare global {
  interface Window {
    Binjgb?: BinjgbFactory;
  }
}

const SCREEN_WIDTH = 160;
const SCREEN_HEIGHT = 144;
const CPU_TICKS_PER_SECOND = 4_194_304;
const AUDIO_FRAMES = 4096;
const AUDIO_LATENCY_SEC = 0.1;
const MAX_UPDATE_SEC = 5 / 60;
const CGB_COLOR_CURVE = 2;
const EVENT_NEW_FRAME = 1;
const EVENT_AUDIO_BUFFER_FULL = 2;
const EVENT_UNTIL_TICKS = 4;
const AUDIO_RESUME_TIMEOUT_MS = 1200;
const SAVE_FLUSH_INTERVAL_MS = 1000;
const SAVE_KEY_PREFIX = "tetorica-retro-player.binjgb.extram:";

const GB_SCRIPT_PATH = `${import.meta.env.BASE_URL}binjgb/binjgb.js`;
const GB_ASSET_PREFIX = `${import.meta.env.BASE_URL}binjgb/`;

const makeWasmBuffer = (module: BinjgbModule, ptr: number, size: number) =>
  new Uint8Array(module.HEAPU8.buffer, ptr, size);

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

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-binjgb-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.binjgbSrc = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    document.head.appendChild(script);
  });

let binjgbModulePromise: Promise<BinjgbModule> | null = null;

const loadBinjgbModule = async () => {
  if (binjgbModulePromise) {
    return binjgbModulePromise;
  }

  binjgbModulePromise = (async () => {
    if (!window.Binjgb) {
      await loadScript(GB_SCRIPT_PATH);
    }
    if (!window.Binjgb) {
      throw new Error("binjgb factory is not available");
    }
    return window.Binjgb({
      locateFile: (path) => `${GB_ASSET_PREFIX}${path}`,
    });
  })();

  return binjgbModulePromise;
};

const buildSaveKey = (fileName: string) => `${SAVE_KEY_PREFIX}${fileName.toLowerCase()}`;

const loadSavedExtRam = (fileName: string) => {
  try {
    const raw = window.localStorage.getItem(buildSaveKey(fileName));
    if (!raw) {
      return null;
    }
    return new Uint8Array(JSON.parse(raw) as number[]);
  } catch {
    return null;
  }
};

const saveExtRam = (fileName: string, extRam: Uint8Array) => {
  try {
    window.localStorage.setItem(buildSaveKey(fileName), JSON.stringify(Array.from(extRam)));
  } catch {
    // Ignore storage failures.
  }
};

const KEY_TO_BUTTON = new Map<string, GbControlButton>([
  ["x", "a"],
  ["z", "b"],
  ["enter", "start"],
  ["tab", "select"],
  ["arrowup", "up"],
  ["arrowdown", "down"],
  ["arrowleft", "left"],
  ["arrowright", "right"],
]);

const setButtonState = (module: BinjgbModule, emulatorPtr: number, button: GbControlButton, enabled: boolean) => {
  const value = enabled ? 1 : 0;
  switch (button) {
    case "up":
      module._set_joyp_up(emulatorPtr, value);
      break;
    case "down":
      module._set_joyp_down(emulatorPtr, value);
      break;
    case "left":
      module._set_joyp_left(emulatorPtr, value);
      break;
    case "right":
      module._set_joyp_right(emulatorPtr, value);
      break;
    case "a":
      module._set_joyp_A(emulatorPtr, value);
      break;
    case "b":
      module._set_joyp_B(emulatorPtr, value);
      break;
    case "start":
      module._set_joyp_start(emulatorPtr, value);
      break;
    case "select":
      module._set_joyp_select(emulatorPtr, value);
      break;
  }
};

export const isGameBoyRomFile = (file: File) => /\.(gb|gbc)$/i.test(file.name);

export async function startGbSession(file: File): Promise<GbSession> {
  const romBuffer = await file.arrayBuffer();
  const module = await loadBinjgbModule();
  const canvas = document.createElement("canvas");
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  canvas.style.imageRendering = "pixelated";

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("Failed to create Game Boy canvas context");
  }

  const imageData = context.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
  const AudioContextCtor = getAudioContextCtor();
  const audioContext = AudioContextCtor ? new AudioContextCtor({ sampleRate: 48000 }) : null;
  const audioDestination = audioContext?.createMediaStreamDestination() ?? null;
  const audioMuteGain = audioContext?.createGain() ?? null;
  const useLocalAudioMonitor = isSafariBrowser();
  let needsUserGesture = false;
  let audioStarted = false;
  let audioStartSec = 0;
  let extRamDirty = false;
  let extRamFlushTimerId: number | null = null;
  let frameHandle: number | null = null;
  let stopped = false;
  let emulatorPtr = 0;
  let romDataPtr = 0;
  let romDataSize = 0;
  let joypadPtr = 0;
  let frameBuffer: Uint8Array | null = null;
  let audioBuffer: Int8Array | null = null;
  let lastRafSec = 0;
  let leftoverTicks = 0;
  const saveFileName = file.name;

  const isAudioRunning = () => audioContext?.state === "running";

  const resumeAudio = async () => {
    if (!audioContext) {
      return false;
    }

    if (isAudioRunning()) {
      audioStarted = true;
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
      audioStarted = isAudioRunning();
      needsUserGesture = !audioStarted;
      return resumed && audioStarted;
    } catch {
      audioStarted = false;
      needsUserGesture = true;
      return false;
    }
  };

  if (audioMuteGain && audioContext) {
    audioMuteGain.gain.value = useLocalAudioMonitor ? 1 : 0;
    audioMuteGain.connect(audioContext.destination);
    needsUserGesture = !(await resumeAudio());
  }

  const allocRomData = () => {
    romDataSize = (romBuffer.byteLength + 0x7fff) & ~0x7fff;
    romDataPtr = module._malloc(romDataSize);
    makeWasmBuffer(module, romDataPtr, romDataSize)
      .fill(0)
      .set(new Uint8Array(romBuffer));
  };

  const readExtRam = () => {
    const fileDataPtr = module._ext_ram_file_data_new(emulatorPtr);
    try {
      const dataPtr = module._get_file_data_ptr(fileDataPtr);
      const dataSize = module._get_file_data_size(fileDataPtr);
      const buffer = new Uint8Array(module.HEAPU8.buffer, dataPtr, dataSize);
      module._emulator_write_ext_ram(emulatorPtr, fileDataPtr);
      return new Uint8Array(buffer);
    } finally {
      module._file_data_delete(fileDataPtr);
    }
  };

  const writeExtRam = (buffer: Uint8Array | null) => {
    if (!buffer || buffer.byteLength === 0) {
      return;
    }
    const fileDataPtr = module._ext_ram_file_data_new(emulatorPtr);
    try {
      const dataPtr = module._get_file_data_ptr(fileDataPtr);
      const dataSize = module._get_file_data_size(fileDataPtr);
      const target = new Uint8Array(module.HEAPU8.buffer, dataPtr, dataSize);
      if (target.byteLength !== buffer.byteLength) {
        return;
      }
      target.set(buffer);
      module._emulator_read_ext_ram(emulatorPtr, fileDataPtr);
    } finally {
      module._file_data_delete(fileDataPtr);
    }
  };

  const flushExtRam = () => {
    if (!extRamDirty || !emulatorPtr) {
      return;
    }
    extRamDirty = false;
    saveExtRam(saveFileName, readExtRam());
  };

  const createEmulator = () => {
    allocRomData();
    emulatorPtr = module._emulator_new_simple(
      romDataPtr,
      romDataSize,
      audioContext?.sampleRate ?? 48000,
      AUDIO_FRAMES,
      CGB_COLOR_CURVE,
    );
    if (!emulatorPtr) {
      throw new Error("Invalid Game Boy ROM");
    }
    joypadPtr = module._joypad_new();
    module._emulator_set_default_joypad_callback(emulatorPtr, joypadPtr);
    frameBuffer = new Uint8Array(
      module.HEAPU8.buffer,
      module._get_frame_buffer_ptr(emulatorPtr),
      module._get_frame_buffer_size(emulatorPtr),
    );
    audioBuffer = new Int8Array(
      module.HEAP8.buffer,
      module._get_audio_buffer_ptr(emulatorPtr),
      module._get_audio_buffer_capacity(emulatorPtr),
    );
    writeExtRam(loadSavedExtRam(saveFileName));
    lastRafSec = 0;
    leftoverTicks = 0;
    audioStartSec = 0;
  };

  const destroyEmulator = () => {
    if (joypadPtr) {
      module._joypad_delete(joypadPtr);
      joypadPtr = 0;
    }
    if (emulatorPtr) {
      flushExtRam();
      module._emulator_delete(emulatorPtr);
      emulatorPtr = 0;
    }
    if (romDataPtr) {
      module._free(romDataPtr);
      romDataPtr = 0;
    }
    frameBuffer = null;
    audioBuffer = null;
  };

  const uploadFrame = () => {
    if (!frameBuffer) {
      return;
    }
    imageData.data.set(frameBuffer.subarray(0, imageData.data.length));
    context.putImageData(imageData, 0, 0);
  };

  const pushAudioBuffer = () => {
    if (!audioStarted || !audioContext || !audioDestination || !audioBuffer) {
      return;
    }
    const nowSec = audioContext.currentTime;
    const nowPlusLatency = nowSec + AUDIO_LATENCY_SEC;
    audioStartSec = audioStartSec || nowPlusLatency;
    if (audioStartSec < nowSec) {
      audioStartSec = nowPlusLatency;
    }

    const frameCount = Math.floor(audioBuffer.length / 2);
    const buffer = audioContext.createBuffer(2, frameCount, audioContext.sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);
    for (let i = 0; i < frameCount; i += 1) {
      left[i] = audioBuffer[2 * i] / 128;
      right[i] = audioBuffer[2 * i + 1] / 128;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioDestination);
    if (audioMuteGain) {
      source.connect(audioMuteGain);
    }
    source.onended = () => {
      source.disconnect();
    };
    source.start(audioStartSec);
    audioStartSec += frameCount / audioContext.sampleRate;
  };

  const runUntil = (ticks: number) => {
    while (!stopped) {
      const event = module._emulator_run_until_f64(emulatorPtr, ticks);
      if (event & EVENT_NEW_FRAME) {
        uploadFrame();
      }
      if (event & EVENT_AUDIO_BUFFER_FULL) {
        pushAudioBuffer();
      }
      if (event & EVENT_UNTIL_TICKS) {
        break;
      }
    }
    if (module._emulator_was_ext_ram_updated(emulatorPtr)) {
      extRamDirty = true;
    }
  };

  const stepFrame = (startMs: number) => {
    if (stopped || !emulatorPtr) {
      return;
    }
    frameHandle = window.requestAnimationFrame(stepFrame);
    const startSec = startMs / 1000;
    const deltaSec = Math.max(startSec - (lastRafSec || startSec), 0);
    const deltaTicks = Math.min(deltaSec, MAX_UPDATE_SEC) * CPU_TICKS_PER_SECOND;
    const runUntilTicks = module._emulator_get_ticks_f64(emulatorPtr) + deltaTicks - leftoverTicks;
    runUntil(runUntilTicks);
    leftoverTicks = (module._emulator_get_ticks_f64(emulatorPtr) - runUntilTicks) | 0;
    lastRafSec = startSec;
  };

  const stopFrameLoop = () => {
    if (frameHandle !== null) {
      window.cancelAnimationFrame(frameHandle);
      frameHandle = null;
    }
  };

  createEmulator();
  uploadFrame();
  frameHandle = window.requestAnimationFrame(stepFrame);

  if (SAVE_FLUSH_INTERVAL_MS > 0) {
    extRamFlushTimerId = window.setInterval(flushExtRam, SAVE_FLUSH_INTERVAL_MS);
  }

  const videoStream = canvas.captureStream(60);
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

  const pressButton = (button: GbControlButton) => {
    if (!emulatorPtr) {
      return;
    }
    setButtonState(module, emulatorPtr, button, true);
  };

  const releaseButton = (button: GbControlButton) => {
    if (!emulatorPtr) {
      return;
    }
    setButtonState(module, emulatorPtr, button, false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const button = KEY_TO_BUTTON.get(event.key.toLowerCase());
    if (!button) {
      return;
    }
    event.preventDefault();
    pressButton(button);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const button = KEY_TO_BUTTON.get(event.key.toLowerCase());
    if (!button) {
      return;
    }
    event.preventDefault();
    releaseButton(button);
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  const reset = () => {
    if (stopped) {
      return;
    }
    releaseButton("up");
    releaseButton("down");
    releaseButton("left");
    releaseButton("right");
    releaseButton("a");
    releaseButton("b");
    releaseButton("start");
    releaseButton("select");
    stopFrameLoop();
    destroyEmulator();
    createEmulator();
    uploadFrame();
    frameHandle = window.requestAnimationFrame(stepFrame);
  };

  const stop = () => {
    if (stopped) {
      return;
    }
    stopped = true;
    stopFrameLoop();
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    if (extRamFlushTimerId !== null) {
      window.clearInterval(extRamFlushTimerId);
      extRamFlushTimerId = null;
    }
    stream.getTracks().forEach((track) => track.stop());
    destroyEmulator();
    audioMuteGain?.disconnect();
    void audioContext?.close().catch(() => {});
  };

  return {
    stream,
    audioStream,
    canvas,
    needsUserGesture,
    resumeAudio,
    setLocalMonitorEnabled,
    pressButton,
    releaseButton,
    reset,
    stop,
  };
}
