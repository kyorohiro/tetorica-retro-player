import { expect, it } from "vitest";
import { isDisplayCaptureStream, markDisplayCaptureStream } from "./displayCaptureOptions";

it("distinguishes display capture from camera, microphone and ordinary media", () => {
  const stream = (settings: MediaTrackSettings, hasVideo = true) => ({
    getAudioTracks: () => [],
    getVideoTracks: () => hasVideo ? [{ getSettings: () => settings }] : [],
  }) as unknown as MediaStream;
  expect(isDisplayCaptureStream(stream({ displaySurface: "window" }))).toBe(true);
  expect(isDisplayCaptureStream(stream({ deviceId: "camera" }))).toBe(false);
  expect(isDisplayCaptureStream(stream({}, false))).toBe(false);
  expect(isDisplayCaptureStream(null)).toBe(false);
  expect(isDisplayCaptureStream(new Blob())).toBe(false);
  const legacyDisplay = stream({});
  markDisplayCaptureStream(legacyDisplay);
  expect(isDisplayCaptureStream(legacyDisplay)).toBe(true);
});
