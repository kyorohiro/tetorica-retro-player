import { expect, it, vi } from "vitest";
import { createPageZoomTracker, readDisplayPixelRatio, type ZoomMeasurement } from "./safariPageZoom";

const base: ZoomMeasurement = {
  width: 1085, height: 781, outerWidth: 1085, outerHeight: 861, dpr: 2, visualScale: 1,
};
it("tracks the reported Safari sizes and returns to the reference without compounding repeated reads", () => {
  const track = createPageZoomTracker();
  expect(track(base)).toBe(1);
  const at85 = { ...base, width: 1276.47, height: 918.82 };
  expect(track(at85) * 2).toBeCloseTo(1.7, 3);
  expect(track(at85) * 2).toBeCloseTo(1.7, 3);
  expect(track({ ...base, width: 1446.67, height: 1041.33 }) * 2).toBeCloseTo(1.5, 3);
  expect(track(base)).toBeCloseTo(1, 6);
});
it("does not interpret window resize, sidebar, DPR change or pinch zoom as page zoom", () => {
  for (const changed of [
    { ...base, width: 900, height: 650, outerWidth: 900, outerHeight: 730 },
    { ...base, width: 800 },
    { ...base, width: 1276, height: 919, dpr: 1.7 },
    { ...base, width: 1276, height: 919, visualScale: 0.85 },
  ]) {
    const track = createPageZoomTracker();
    track(base);
    expect(track(changed)).toBe(1);
  }
});
it("does not apply the Safari estimate in Chrome", () => {
  const ua = vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue("Chrome/140 Safari/537.36");
  vi.stubGlobal("devicePixelRatio", 1.6);
  try { expect(readDisplayPixelRatio()).toBe(1.6); }
  finally { ua.mockRestore(); vi.unstubAllGlobals(); }
});
