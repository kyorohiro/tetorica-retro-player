import { afterEach, expect, it, vi } from "vitest";
import { waitForPreviewFrame } from "./waitForPreviewFrame";
import { hasCurrentPlaybackData } from "./playbackReadiness";

afterEach(() => vi.useRealTimers());
it("does not release startup until a frame is submitted after target settling", async () => {
  vi.useFakeTimers();
  let ready = false;
  const render = vi.fn();
  const done = vi.fn();
  const pending = waitForPreviewFrame(() => ready, () => true, render).then(done);
  await vi.advanceTimersByTimeAsync(48);
  expect(done).not.toHaveBeenCalled();
  ready = true;
  await vi.advanceTimersByTimeAsync(16);
  await pending;
  expect(done).toHaveBeenCalledOnce();
});
it("stops on source replacement and rejects a stalled renderer", async () => {
  vi.useFakeTimers();
  let current = true;
  const render = vi.fn();
  const pending = waitForPreviewFrame(() => false, () => current, render);
  current = false;
  await vi.advanceTimersByTimeAsync(16);
  await pending;
  expect(render).toHaveBeenCalledOnce();
  const failure = waitForPreviewFrame(() => false, () => true, render, 32).catch(error => error);
  await vi.advanceTimersByTimeAsync(32);
  expect((await failure).message).toContain("timed out");
});
it("does not mistake audio/timeline progress for a usable video frame", () => {
  const video = document.createElement("video");
  Object.defineProperties(video, {
    readyState: { value: 3, configurable: true },
    videoWidth: { value: 0, configurable: true },
    videoHeight: { value: 0, configurable: true },
  });
  video.currentTime = 1;
  expect(hasCurrentPlaybackData(video)).toBe(false);
  Object.defineProperties(video, {
    videoWidth: { value: 640 }, videoHeight: { value: 360 },
  });
  expect(hasCurrentPlaybackData(video)).toBe(true);
  Object.defineProperty(video, "readyState", { value: 1 });
  expect(hasCurrentPlaybackData(video)).toBe(false);
  const audio = document.createElement("audio");
  Object.defineProperty(audio, "readyState", { value: 2 });
  expect(hasCurrentPlaybackData(audio)).toBe(true);
});
