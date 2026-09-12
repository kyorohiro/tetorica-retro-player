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

  it("records native capture from the live stream, never the unconnected FX destination", () => {
    expect(resolveRecordingAudioSourceOrder({ bypassWebAudio: true, isMediaStreamSource: true }))
      .toEqual(["live-stream"]);
  });

  it("keeps processed audio first for a stream routed through WebAudio", () => {
    expect(resolveRecordingAudioSourceOrder({ bypassWebAudio: false, isMediaStreamSource: true })[0])
      .toBe("recording-destination");
  });

  it("records original capture audio with FX off even when WebAudio playback is muted", () => {
    expect(resolveRecordingAudioSourceOrder({ bypassWebAudio: false, isMediaStreamSource: true, preferRawAudio: true }))
      .toEqual(["live-stream"]);
  });

  it("taps file playback before effects and volume for dry recording", () => {
    expect(resolveRecordingAudioSourceOrder({ bypassWebAudio: false, preferRawAudio: true }))
      .toEqual(["input-tap", "media-capture"]);
  });

  it("does not fall back to generated FX noise for native file recording", () => {
    const order = resolveRecordingAudioSourceOrder({ bypassWebAudio: true, preferRawAudio: true });
    expect(order).toContain("media-capture");
    expect(order).not.toContain("recording-destination");
    expect(order).not.toContain("input-tap");
  });
});
