import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  invoke: vi.fn(),
  channel: null as { onmessage: (packet: ArrayBuffer) => void } | null,
}));
vi.mock("@tauri-apps/api/core", () => ({
  invoke: mocks.invoke,
  Channel: class { constructor() { mocks.channel = this; } onmessage = (_packet: ArrayBuffer) => {}; },
}));
vi.mock("../platform/runtime", () => ({ isTauriRuntime: () => true }));
import { requestDisplayCapture } from "./nativeDisplayCapture";

class Track extends EventTarget { stop = vi.fn(); }
class Stream {
  tracks = [new Track()];
  getTracks() { return this.tracks; }
  getAudioTracks() { return this.tracks.slice(1); }
  addTrack(track: Track) { this.tracks.push(track); }
}
let stream: Stream;
let audioClose: ReturnType<typeof vi.fn>;
let audioConnect: ReturnType<typeof vi.fn>;
let audioStart: ReturnType<typeof vi.fn>;
function packet(kind: number, text: string) {
  const payload = new TextEncoder().encode(text);
  const bytes = new Uint8Array(payload.length + 1);
  bytes[0] = kind;
  bytes.set(payload, 1);
  return bytes.buffer;
}

describe("native capture lifecycle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mocks.invoke.mockReset();
    mocks.channel = null;
    stream = new Stream();
    audioClose = vi.fn().mockResolvedValue(undefined);
    audioConnect = vi.fn();
    audioStart = vi.fn();
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Macintosh");
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ drawImage: vi.fn() } as unknown as CanvasRenderingContext2D);
    Object.defineProperty(HTMLCanvasElement.prototype, "captureStream", { configurable: true, value: () => stream });
    vi.stubGlobal("AudioContext", class {
      currentTime = 1;
      state = "running";
      resume = vi.fn().mockResolvedValue(undefined);
      close = audioClose;
      createMediaStreamDestination() { return { stream: { getAudioTracks: () => [new Track()] } }; }
      createBuffer(channels: number, frames: number, rate: number) {
        return { getChannelData: () => new Float32Array(frames), duration: frames / rate, numberOfChannels: channels };
      }
      createBufferSource() { return { connect: audioConnect, start: audioStart, stop: vi.fn(), disconnect: vi.fn() }; }
    });
    mocks.invoke.mockImplementation(async (command: string) => {
      if (command === "native_capture_available") return true;
      if (command === "native_capture_start") { mocks.channel!.onmessage(packet(0, "started")); return "session-1"; }
    });
  });
  afterEach(() => {
    stream.getTracks()[0].stop();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    Reflect.deleteProperty(HTMLCanvasElement.prototype, "captureStream");
  });
  it("feeds audio into the stream and releases native capture once when the player stops tracks", async () => {
    await requestDisplayCapture();
    const audio = new ArrayBuffer(17);
    const view = new DataView(audio);
    view.setUint8(0, 2);
    view.setUint32(1, 48000, true);
    view.setUint32(5, 2, true);
    view.setFloat32(9, 0.5, true);
    view.setFloat32(13, -0.5, true);
    mocks.channel!.onmessage(audio);
    expect(audioConnect).toHaveBeenCalledOnce();
    expect(audioStart).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(50);
    expect(mocks.invoke).toHaveBeenCalledWith("native_capture_ack", { sessionId: "session-1", count: 1 });
    stream.getTracks().forEach(track => track.stop());
    expect(audioClose).toHaveBeenCalledOnce();
    expect(mocks.invoke.mock.calls.filter(([command]) => command === "native_capture_stop")).toHaveLength(1);
  });
  it("cleans up the audio context when selection is cancelled before start resolves", async () => {
    mocks.invoke.mockImplementation(async (command: string) => {
      if (command === "native_capture_available") return true;
      if (command === "native_capture_start") { mocks.channel!.onmessage(packet(3, "Capture cancelled.")); return "session-1"; }
    });
    await expect(requestDisplayCapture()).rejects.toThrow("Capture cancelled.");
    expect(audioClose).toHaveBeenCalledOnce();
    expect(mocks.invoke).toHaveBeenCalledWith("native_capture_stop", { sessionId: "session-1" });
  });
  it("propagates OS capture termination to existing source end handlers", async () => {
    await requestDisplayCapture();
    const ended = vi.fn();
    stream.getTracks()[0].addEventListener("ended", ended);
    mocks.channel!.onmessage(packet(3, "Window closed."));
    expect(ended).toHaveBeenCalledOnce();
    expect(audioClose).toHaveBeenCalledOnce();
  });
});
