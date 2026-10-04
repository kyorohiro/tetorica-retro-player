import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import type { NativeFfmpegEvent } from "../media/nativeFfmpegCapture";
const mocks = vi.hoisted(() => ({
  event: undefined as undefined | ((event: NativeFfmpegEvent) => void),
  stop: vi.fn(),
  select: vi.fn(),
}));
vi.mock("../../useDialog", () => ({ useDialog: () => ({ showSelectDialog: mocks.select }) }));
vi.mock("../media/nativeFfmpegCapture", () => ({
  startNativeFfmpegCapture: async (_selection: unknown, onEvent: (event: NativeFfmpegEvent) => void) => {
    mocks.event = onEvent;
    onEvent({ stage: "selected", targetTitle: "Test window", destination: "/tmp/test.mp4" });
    return "test-session";
  },
  stopNativeFfmpegCapture: mocks.stop,
  getNativeRecordingProgress: async () => ({elapsedMs: 1000, bytes: 100}),
}));
import { usePreviewSourceState } from "./usePreviewSourceState";
it("clears the recording view on stop, ignores late images, and preserves the original media", async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("URL", Object.assign(URL, { createObjectURL: vi.fn().mockReturnValue("blob:test-image"), revokeObjectURL: vi.fn() }));
  const host = document.createElement("div");
  const root = createRoot(host);
  let state!: ReturnType<typeof usePreviewSourceState>;
  function Harness() { state = usePreviewSourceState("ja"); return null; }
  try {
    await act(async () => { root.render(createElement(Harness)); });
    await act(async () => { state.previewPath("/before.mp4", "before"); });
    await act(async () => { await state.startFfmpegCapture(); });
    await act(async () => { mocks.event!({stage: "preview", image: [1,2,3]}); });
    expect(state.nativeRecordingActive).toBe(true);
    expect(state.nativeRecordingThumbnail).toBe("blob:test-image");
    await act(async () => { state.stopFfmpegCapture(); });
    expect(mocks.stop).toHaveBeenCalledWith("test-session");
    expect(state.nativeRecordingActive).toBe(false);
    expect(state.nativeRecordingThumbnail).toBeUndefined();
    expect(state.nativeRecordingTarget).toBe("");
    expect(state.nativeRecordingDestination).toBe("");
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test-image");
    await act(async () => { mocks.event!({stage: "preview", image: [4,5,6]}); });
    expect(state.nativeRecordingThumbnail).toBeUndefined();
    expect(state.previewSrc).toBe("/before.mp4");
    await act(async () => { mocks.event!({stage: "saved", message: "/tmp/test.mp4"}); });
    expect(state.nativeFfmpegStatus).toContain("保存完了");
  } finally {
    await act(async () => root.unmount());
    vi.unstubAllGlobals();
  }
});
