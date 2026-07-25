const EMULATORJS_READY_MESSAGE = "emulatorjs-canvas-ready";
const EMULATORJS_DEBUG_MESSAGE = "emulatorjs-debug";
const EMULATORJS_ACTIVATE_MESSAGE = "emulatorjs-host-activate";
const DEFAULT_CORE = "nestopia";

type EmulatorJsSession = {
  canvas: HTMLCanvasElement;
  stop: () => void;
};

export const isNesRomFile = (file: File) => /\.nes$/i.test(file.name);

const isCanvasLike = (value: unknown): value is HTMLCanvasElement => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as {
    tagName?: string;
    nodeName?: string;
    width?: unknown;
    height?: unknown;
    captureStream?: unknown;
  };

  const tagName = candidate.tagName ?? candidate.nodeName;
  return (
    tagName === "CANVAS" &&
    typeof candidate.captureStream === "function" &&
    typeof candidate.width === "number" &&
    typeof candidate.height === "number"
  );
};

const waitForCanvasReady = (
  iframe: HTMLIFrameElement,
  timeoutMs = 15000,
): Promise<HTMLCanvasElement> =>
  new Promise((resolve, reject) => {
    let resolved = false;

    const findCanvasDeep = (root: ParentNode | ShadowRoot | null): HTMLCanvasElement | null => {
      if (!root || !("querySelectorAll" in root)) {
        return null;
      }

      const directCanvas = root.querySelector("canvas");
      if (isCanvasLike(directCanvas)) {
        return directCanvas;
      }

      const allElements = root.querySelectorAll("*");
      for (const element of allElements) {
        if (isCanvasLike(element)) {
          return element;
        }
        if (element instanceof HTMLElement && element.shadowRoot) {
          const nestedCanvas = findCanvasDeep(element.shadowRoot);
          if (nestedCanvas) {
            return nestedCanvas;
          }
        }
      }

      return null;
    };

    const findCanvasInWindow = (targetWindow: Window | null): HTMLCanvasElement | null => {
      if (!targetWindow) {
        return null;
      }

      try {
        const targetWindowWithModule = targetWindow as Window & {
          Module?: { canvas?: HTMLCanvasElement | null };
          __EJS_CANVAS_REF?: HTMLCanvasElement | null;
        };

        if (isCanvasLike(targetWindowWithModule.__EJS_CANVAS_REF)) {
          return targetWindowWithModule.__EJS_CANVAS_REF;
        }

        if (isCanvasLike(targetWindowWithModule.Module?.canvas)) {
          return targetWindowWithModule.Module.canvas;
        }

        const doc = targetWindow.document;
        const directCanvas = findCanvasDeep(doc);
        if (directCanvas) {
          return directCanvas;
        }

        const nestedIframes = Array.from(doc.querySelectorAll("iframe"));
        for (const nestedIframe of nestedIframes) {
          if (!(nestedIframe instanceof HTMLIFrameElement)) {
            continue;
          }
          const nestedCanvas = findCanvasInWindow(nestedIframe.contentWindow);
          if (nestedCanvas) {
            return nestedCanvas;
          }
        }
      } catch {
        return null;
      }

      return null;
    };

    const finish = (canvas: HTMLCanvasElement) => {
      if (resolved) return;
      resolved = true;
      window.removeEventListener("message", onMessage);
      window.clearInterval(pollId);
      window.clearTimeout(timeoutId);
      resolve(canvas);
    };

    const fail = (error: Error) => {
      if (resolved) return;
      resolved = true;
      window.removeEventListener("message", onMessage);
      window.clearInterval(pollId);
      window.clearTimeout(timeoutId);
      reject(error);
    };

    const findCanvas = () => {
      const canvas = findCanvasInWindow(iframe.contentWindow);
      if (isCanvasLike(canvas)) {
        finish(canvas);
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframe.contentWindow) return;
      if (event.data?.type === EMULATORJS_DEBUG_MESSAGE) {
        console.info("[emulatorjs][debug]", event.data.payload);
        return;
      }
      if (event.data?.type !== EMULATORJS_READY_MESSAGE) return;
      findCanvas();
    };

    const timeoutId = window.setTimeout(() => {
      fail(new Error("Timed out waiting for EmulatorJS canvas"));
    }, timeoutMs);
    const pollId = window.setInterval(findCanvas, 500);

    window.addEventListener("message", onMessage);
    window.setTimeout(findCanvas, 300);
  });

const forwardKeyboardEvent = (
  target: Window,
  type: "keydown" | "keyup",
  event: KeyboardEvent,
) => {
  const init = {
    key: event.key,
    code: event.code,
    location: event.location,
    repeat: event.repeat,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    altKey: event.altKey,
    metaKey: event.metaKey,
    bubbles: true,
    cancelable: true,
  } satisfies KeyboardEventInit;

  target.dispatchEvent(new KeyboardEvent(type, init));
  target.document.dispatchEvent(new KeyboardEvent(type, init));
};

export async function startEmulatorJsNesSession(
  file: File,
): Promise<EmulatorJsSession> {
  const romUrl = URL.createObjectURL(file);
  const gameId = Math.max(
    1,
    Array.from(file.name).reduce((acc, ch) => ((acc * 31) + ch.charCodeAt(0)) >>> 0, 7),
  );
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = "512px";
  iframe.style.height = "480px";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.border = "0";
  iframe.src = `/emulatorjs/nes.html?rom=${encodeURIComponent(romUrl)}&core=${encodeURIComponent(DEFAULT_CORE)}&gameId=${gameId}`;
  document.body.appendChild(iframe);

  let stopped = false;
  let stream: MediaStream | null = null;
  let bridgeFrameId = 0;
  let bridgeCanvas: HTMLCanvasElement | null = null;
  let activationCleanup: (() => void) | null = null;

  const stopBridgeLoop = () => {
    if (bridgeFrameId) {
      window.cancelAnimationFrame(bridgeFrameId);
      bridgeFrameId = 0;
    }
  };

  const stop = () => {
    if (stopped) return;
    stopped = true;
    stopBridgeLoop();
    window.removeEventListener("keydown", handleKeyDown, true);
    window.removeEventListener("keyup", handleKeyUp, true);
    activationCleanup?.();
    activationCleanup = null;
    stream?.getTracks().forEach((track) => track.stop());
    bridgeCanvas = null;
    try {
      iframe.remove();
    } catch {}
    URL.revokeObjectURL(romUrl);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!iframe.contentWindow) return;
    forwardKeyboardEvent(iframe.contentWindow, "keydown", event);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!iframe.contentWindow) return;
    forwardKeyboardEvent(iframe.contentWindow, "keyup", event);
  };

  const activateEmulator = () => {
    const targetWindow = iframe.contentWindow;
    if (!targetWindow) {
      return;
    }

    try {
      targetWindow.focus();
    } catch {}

    try {
      targetWindow.postMessage(
        { type: EMULATORJS_ACTIVATE_MESSAGE },
        window.location.origin,
      );
    } catch {}
  };

  const bindActivationBridge = () => {
    const relayActivation = () => {
      activateEmulator();
    };

    const activationEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "mousedown",
      "touchstart",
      "keydown",
    ];

    for (const eventName of activationEvents) {
      window.addEventListener(eventName, relayActivation, true);
    }

    activationCleanup = () => {
      for (const eventName of activationEvents) {
        window.removeEventListener(eventName, relayActivation, true);
      }
    };
  };

  try {
    bindActivationBridge();
    window.setTimeout(activateEmulator, 400);
    window.setTimeout(activateEmulator, 1200);

    const sourceCanvas = await waitForCanvasReady(iframe);
    bridgeCanvas = document.createElement("canvas");
    bridgeCanvas.width = Math.max(1, sourceCanvas.width);
    bridgeCanvas.height = Math.max(1, sourceCanvas.height);

    const bridgeContext = bridgeCanvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!bridgeContext) {
      throw new Error("Failed to create EmulatorJS bridge canvas context");
    }

    const copyFrame = () => {
      if (stopped || !bridgeCanvas) {
        return;
      }

      const nextWidth = Math.max(1, sourceCanvas.width);
      const nextHeight = Math.max(1, sourceCanvas.height);
      if (bridgeCanvas.width !== nextWidth || bridgeCanvas.height !== nextHeight) {
        bridgeCanvas.width = nextWidth;
        bridgeCanvas.height = nextHeight;
      }

      bridgeContext.clearRect(0, 0, bridgeCanvas.width, bridgeCanvas.height);
      try {
        bridgeContext.drawImage(sourceCanvas, 0, 0, bridgeCanvas.width, bridgeCanvas.height);
      } catch (error) {
        console.warn("[emulatorjs] failed to copy iframe canvas into bridge canvas", error);
      }

      bridgeFrameId = window.requestAnimationFrame(copyFrame);
    };

    copyFrame();

    const capturedStream = sourceCanvas.captureStream(60);
    const capturedTracks = capturedStream.getTracks();
    stream = new MediaStream(capturedTracks);
    console.info("[emulatorjs] bridge canvas attached", {
      gameId,
      sourceWidth: sourceCanvas.width,
      sourceHeight: sourceCanvas.height,
      bridgeWidth: bridgeCanvas.width,
      bridgeHeight: bridgeCanvas.height,
    });
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    return { canvas: bridgeCanvas, stop };
  } catch (error) {
    stop();
    throw error;
  }
}
