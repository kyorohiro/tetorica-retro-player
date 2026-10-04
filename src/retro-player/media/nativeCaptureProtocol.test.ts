import { describe, expect, it } from "vitest";
import { decodeNativeAudioPacket, nextNativeAudioTime } from "./nativeCaptureProtocol";

describe("native capture audio transport", () => {
  it("decodes unaligned stereo PCM without mixing channels", () => {
    const packet = new ArrayBuffer(25);
    const view = new DataView(packet);
    view.setUint8(0, 2);
    view.setUint32(1, 48000, true);
    view.setUint32(5, 2, true);
    [0.25, -0.5, 0.75, -1].forEach((sample, index) => view.setFloat32(9 + index * 4, sample, true));
    const audio = decodeNativeAudioPacket(packet);
    expect(audio.sampleRate).toBe(48000);
    expect(audio.channels).toBe(2);
    expect(audio.frames).toBe(2);
    expect(Array.from(audio.samples)).toEqual([0.25, -0.5, 0.75, -1]);
  });
  it("rejects truncated headers, unsupported channels and partial frames", () => {
    expect(() => decodeNativeAudioPacket(new ArrayBuffer(8))).toThrow();
    const packet = new ArrayBuffer(13);
    const view = new DataView(packet);
    view.setUint32(1, 48000, true);
    view.setUint32(5, 3, true);
    expect(() => decodeNativeAudioPacket(packet)).toThrow();
    view.setUint32(5, 2, true);
    expect(() => decodeNativeAudioPacket(packet)).toThrow();
  });
  it("recovers from pauses and bounds latency after IPC stalls", () => {
    expect(nextNativeAudioTime(10, 5)).toBeCloseTo(10.03);
    expect(nextNativeAudioTime(10, 20)).toBeCloseTo(10.03);
    expect(nextNativeAudioTime(10, 10.1)).toBeCloseTo(10.1);
  });
});
