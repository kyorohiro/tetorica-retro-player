import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  shouldBypassWebAudio,
  shouldUseNativeVideoSurface,
  waitForAudioReady,
  waitForImageReady,
  waitForVideoReady,
} from "./RetroMediaSource";

// jsdom does not implement the MediaStream/WebRTC API at all; stub a minimal
// class purely so `instanceof MediaStream` checks in the source under test
// have something real to check against.
beforeAll(() => {
  if (typeof globalThis.MediaStream === "undefined") {
    vi.stubGlobal("MediaStream", class MediaStream {});
  }
});

describe("shouldUseNativeVideoSurface", () => {
  it("is true only when preferNativeVideoSurface is on and the element is a video", () => {
    const video = document.createElement("video");
    const audio = document.createElement("audio");

    expect(shouldUseNativeVideoSurface(video, true)).toBe(true);
    expect(shouldUseNativeVideoSurface(video, false)).toBe(false);
    expect(shouldUseNativeVideoSurface(audio, true)).toBe(false);
  });
});

describe("shouldBypassWebAudio", () => {
  it("depends only on preferNativeVideoSurface, regardless of media kind", () => {
    const video = document.createElement("video");
    const audio = document.createElement("audio");

    expect(shouldBypassWebAudio(video, true)).toBe(true);
    expect(shouldBypassWebAudio(audio, true)).toBe(true);
    expect(shouldBypassWebAudio(video, false)).toBe(false);
    expect(shouldBypassWebAudio(audio, false)).toBe(false);
  });
});

describe("waitForVideoReady", () => {
  it("resolves immediately without calling load() if readyState is already sufficient", async () => {
    const video = document.createElement("video");
    Object.defineProperty(video, "readyState", { value: HTMLMediaElement.HAVE_CURRENT_DATA });
    const loadSpy = vi.spyOn(video, "load").mockImplementation(() => {});

    await expect(waitForVideoReady(video)).resolves.toBeUndefined();
    expect(loadSpy).not.toHaveBeenCalled();
  });

  it("resolves when loadeddata fires after load()", async () => {
    const video = document.createElement("video");
    vi.spyOn(video, "load").mockImplementation(() => {
      queueMicrotask(() => video.dispatchEvent(new Event("loadeddata")));
    });

    await expect(waitForVideoReady(video)).resolves.toBeUndefined();
  });

  it("rejects with a Japanese error message when the error event fires", async () => {
    const video = document.createElement("video");
    vi.spyOn(video, "load").mockImplementation(() => {
      queueMicrotask(() => video.dispatchEvent(new Event("error")));
    });

    await expect(waitForVideoReady(video)).rejects.toThrow("動画の読み込みに失敗しました。");
  });

  it("times out after 8s if neither loadeddata/canplay nor error ever fire", async () => {
    vi.useFakeTimers();
    try {
      const video = document.createElement("video");
      vi.spyOn(video, "load").mockImplementation(() => {});

      const pending = waitForVideoReady(video);
      const assertion = expect(pending).rejects.toThrow("動画の読み込みがタイムアウトしました。");
      await vi.advanceTimersByTimeAsync(8000);
      await assertion;
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("waitForAudioReady", () => {
  it("resolves immediately without calling load() for a MediaStream srcObject", async () => {
    const audio = document.createElement("audio");
    const loadSpy = vi.spyOn(audio, "load").mockImplementation(() => {});
    Object.defineProperty(audio, "srcObject", { value: new MediaStream(), writable: true });

    await expect(waitForAudioReady(audio)).resolves.toBeUndefined();
    expect(loadSpy).not.toHaveBeenCalled();
  });

  it("resolves immediately if readyState is already sufficient", async () => {
    const audio = document.createElement("audio");
    Object.defineProperty(audio, "readyState", { value: HTMLMediaElement.HAVE_METADATA });
    const loadSpy = vi.spyOn(audio, "load").mockImplementation(() => {});

    await expect(waitForAudioReady(audio)).resolves.toBeUndefined();
    expect(loadSpy).not.toHaveBeenCalled();
  });

  it("resolves when canplay fires after load(), with no timeout applied", async () => {
    const audio = document.createElement("audio");
    vi.spyOn(audio, "load").mockImplementation(() => {
      queueMicrotask(() => audio.dispatchEvent(new Event("canplay")));
    });

    await expect(waitForAudioReady(audio)).resolves.toBeUndefined();
  });
});

describe("waitForImageReady", () => {
  it("resolves immediately if the image is already complete with valid dimensions", async () => {
    const image = new Image();
    Object.defineProperty(image, "complete", { value: true });
    Object.defineProperty(image, "naturalWidth", { value: 100 });
    Object.defineProperty(image, "naturalHeight", { value: 100 });

    await expect(waitForImageReady(image)).resolves.toBeUndefined();
  });

  it("waits for the load event otherwise", async () => {
    const image = new Image();
    queueMicrotask(() => image.dispatchEvent(new Event("load")));

    await expect(waitForImageReady(image)).resolves.toBeUndefined();
  });

  it("rejects with a Japanese error message on the error event", async () => {
    const image = new Image();
    queueMicrotask(() => image.dispatchEvent(new Event("error")));

    await expect(waitForImageReady(image)).rejects.toThrow("画像の読み込みに失敗しました。");
  });
});
