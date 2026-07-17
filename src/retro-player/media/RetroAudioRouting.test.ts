import { describe, expect, it } from "vitest";
import {
  applyElementAudioMode,
  resolvePlaybackAudioRoute,
  resolveRecordingAudioSourceOrder,
  shouldBypassPlaybackWebAudio,
} from "./RetroAudioRouting";

describe("shouldBypassPlaybackWebAudio", () => {
  it("bypasses when native video surface is preferred", () => {
    expect(
      shouldBypassPlaybackWebAudio({
        preferNativeVideoSurface: true,
        isHlsManaged: false,
      }),
    ).toBe(true);
  });
});

describe("resolvePlaybackAudioRoute", () => {
  it("uses direct native playback when bypassed", () => {
    expect(
      resolvePlaybackAudioRoute({
        preferNativeVideoSurface: true,
        isHlsManaged: false,
        isMediaStreamSource: false,
        audioOptimizationMode: "auto",
        nativeAudioSuppressionOverride: null,
      }),
    ).toMatchObject({
      bypassWebAudio: true,
      inputMode: "none",
      elementAudioMode: "user-volume",
    });
  });

  it("routes MediaStream-backed sources through createMediaStreamSource", () => {
    expect(
      resolvePlaybackAudioRoute({
        preferNativeVideoSurface: false,
        isHlsManaged: false,
        isMediaStreamSource: true,
        audioOptimizationMode: "auto",
        nativeAudioSuppressionOverride: null,
      }),
    ).toMatchObject({
      bypassWebAudio: false,
      inputMode: "media-stream-source",
      elementAudioMode: "force-muted",
    });
  });
});

describe("applyElementAudioMode", () => {
  it("applies user volume/mute state", () => {
    const media = document.createElement("audio");

    applyElementAudioMode(media, "user-volume", false, 0.42);
    expect(media.muted).toBe(false);
    expect(media.volume).toBe(0.42);

    applyElementAudioMode(media, "user-volume", true, 0.9);
    expect(media.muted).toBe(true);
    expect(media.volume).toBe(0);
  });

  it("forces mute or zero-volume suppression", () => {
    const media = document.createElement("audio");

    applyElementAudioMode(media, "force-muted", false, 1);
    expect(media.muted).toBe(true);
    expect(media.volume).toBe(0);

    applyElementAudioMode(media, "force-volume-zero", true, 1);
    expect(media.muted).toBe(false);
    expect(media.volume).toBe(0);
  });
});

describe("resolveRecordingAudioSourceOrder", () => {
  it("prefers recording-destination when WebAudio stays active", () => {
    const order = resolveRecordingAudioSourceOrder({ bypassWebAudio: false });

    expect(order).toContain("recording-destination");
    expect(order).toContain("media-capture");
    expect(order[order.length - 1]).toBe("live-stream");
    expect(order.indexOf("recording-destination")).toBeLessThan(
      order.indexOf("media-capture"),
    );
  });

  it("prefers media capture when WebAudio is bypassed", () => {
    const order = resolveRecordingAudioSourceOrder({ bypassWebAudio: true });

    expect(order).toContain("media-capture");
    expect(order).toContain("recording-destination");
    expect(order[order.length - 1]).toBe("live-stream");
    expect(order.indexOf("media-capture")).toBeLessThan(
      order.indexOf("recording-destination"),
    );
  });
});
