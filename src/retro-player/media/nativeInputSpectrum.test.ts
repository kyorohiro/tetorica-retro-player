import { afterEach, expect, it, vi } from "vitest";
import { connectNativeInputSpectrum } from "./nativeInputSpectrum";

afterEach(() => vi.unstubAllGlobals());

function setup() {
  class Stream { getAudioTracks() { return [{ readyState: "live" }]; } }
  vi.stubGlobal("MediaStream", Stream);
  const stream = new Stream();
  const source = { connect: vi.fn() };
  const context = { createMediaStreamSource: vi.fn(() => source), destination: {} };
  const analyser = {} as AnalyserNode;
  const media = { srcObject: stream, volume: 0, muted: true } as unknown as HTMLMediaElement;
  return { context, source, analyser, media };
}

it("inspects the original stream while native playback stays muted at volume zero", () => {
  const { context, source, analyser, media } = setup();
  expect(connectNativeInputSpectrum(context as unknown as AudioContext, media, analyser, false)).toBe(source);
  expect(context.createMediaStreamSource).toHaveBeenCalledWith(media.srcObject);
  expect(source.connect).toHaveBeenCalledExactlyOnceWith(analyser);
  expect(media.volume).toBe(0);
  expect(media.muted).toBe(true);
});

it("does not attempt to capture FFmpeg/HLS native playback", () => {
  const { context, analyser, media } = setup();
  expect(connectNativeInputSpectrum(context as unknown as AudioContext, media, analyser, true)).toBeNull();
  expect(context.createMediaStreamSource).not.toHaveBeenCalled();
});

it("keeps native playback available when the browser rejects inspection", () => {
  const { context, analyser, media } = setup();
  context.createMediaStreamSource.mockImplementation(() => { throw new Error("unavailable"); });
  expect(connectNativeInputSpectrum(context as unknown as AudioContext, media, analyser, false)).toBeNull();
  expect(media.muted).toBe(true);
});
