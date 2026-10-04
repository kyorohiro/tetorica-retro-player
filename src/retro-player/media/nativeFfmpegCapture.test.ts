import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ invoke: vi.fn(), save: vi.fn(), select: vi.fn(), channel: null as null | {onmessage: (event: {stage: "saved" | "preview"; image?: number[]}) => void} }));
vi.mock("@tauri-apps/api/core", () => ({ invoke: mocks.invoke, Channel: class { constructor() { mocks.channel = this; } onmessage = () => {}; } }));
vi.mock("@tauri-apps/plugin-dialog", () => ({ save: mocks.save }));
vi.mock("./nativeDisplayCapture", () => ({ selectNativeCaptureTarget: mocks.select }));
import { startNativeFfmpegCapture, stopNativeFfmpegCapture } from "./nativeFfmpegCapture";
beforeEach(() => { mocks.invoke.mockReset(); mocks.save.mockReset(); mocks.select.mockResolvedValue("window:1"); });
it("does not start capture when the save dialog is cancelled", async () => {
  mocks.save.mockResolvedValue(null);
  expect(await startNativeFfmpegCapture({locale: "ja", select: vi.fn()}, vi.fn())).toBeNull();
  expect(mocks.invoke).not.toHaveBeenCalled();
});
it("stops each recording once and releases completed sessions", async () => {
  mocks.save.mockResolvedValue("/tmp/recording.mp4");
  mocks.invoke.mockResolvedValue({sessionId: "test"});
  const onEvent = vi.fn();
  const url = await startNativeFfmpegCapture({locale: "ja", select: vi.fn()}, onEvent);
  mocks.channel!.onmessage({stage: "preview", image: [1, 2, 3]});
  expect(onEvent).toHaveBeenCalledWith({stage: "preview", image: [1, 2, 3]});
  stopNativeFfmpegCapture(url!); stopNativeFfmpegCapture(url!);
  expect(mocks.invoke.mock.calls.filter(([name]) => name === "native_ffmpeg_capture_stop")).toHaveLength(1);
  const finishedUrl = await startNativeFfmpegCapture({locale: "ja", select: vi.fn()}, vi.fn());
  mocks.channel!.onmessage({stage: "saved"});
  stopNativeFfmpegCapture(finishedUrl!);
  expect(mocks.invoke.mock.calls.filter(([name]) => name === "native_ffmpeg_capture_stop")).toHaveLength(1);
});
