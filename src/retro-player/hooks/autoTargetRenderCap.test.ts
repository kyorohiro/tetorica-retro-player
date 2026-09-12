import { expect, it } from "vitest";
import { resolveCanvasSizing } from "./useRetroPixiStage";
import { getDisplayAutoTargetSize } from "../video/autoTargetSize";

const source = { width: 1920, height: 1080 };
const size = (scale: number, cap: boolean, targetWidth = 505) => resolveCanvasSizing({
  styleWidth: 1920, styleHeight: 1080,
  effectiveTargetWidth: targetWidth, effectiveTargetHeight: Math.round(targetWidth * 1080 / 1920),
  effectiveRenderResolutionScale: scale,
  isFilterEnabled: true, shouldUseLogicalBufferUpscale: true,
  maxTextureSize: 8192, filterBufferCap: cap ? { width: 960, height: 720 } : null,
});
const target = (s: ReturnType<typeof size>) => getDisplayAutoTargetSize(source, {
  width: s.presentedStyleWidth, height: s.presentedStyleHeight,
}, 3.8)!;

it("uses the cap-reduced CSS canvas size and remains stable after updating the target", () => {
  const capped = size(1, true);
  expect(capped.presentedStyleWidth).toBe(960);
  expect(target(capped).width).toBe(253);
  expect(target(size(1, true, target(capped).width))).toEqual(target(capped));
});
it("accounts for presentation shrink at higher render resolution without using buffer pixels", () => {
  const capped = size(2, true);
  expect(capped.nextWidth).toBe(960);
  // Canvas sizing floors the aspect-fitted dimensions to CSS pixels.
  expect(capped.presentedStyleWidth).toBeGreaterThanOrEqual(479);
  expect(capped.presentedStyleWidth).toBeLessThanOrEqual(480);
  expect(target(capped).width).toBe(126);
  expect(target(size(2, true, target(capped).width))).toEqual(target(capped));
});
it("returns to the full display target when the cap is disabled", () => {
  expect(target(size(1, false)).width).toBe(505);
  expect(target(size(2, false))).toEqual(target(size(1, false)));
});

it("allows sub-one density without enlarging the CSS presentation or exceeding a cap", () => {
  const normal = size(0.67, false);
  expect(normal.nextWidth).toBe(Math.round(1920 * 0.67));
  expect(normal.presentedStyleWidth).toBe(1920);
  const capped = size(0.67, true);
  expect(capped.nextWidth).toBeLessThanOrEqual(960);
  expect(capped.presentedStyleWidth).toBeLessThanOrEqual(1920);
  expect(target(size(0.67, true, target(capped).width))).toEqual(target(capped));
});

it("matches fractional density without changing CSS target semantics, including caps", () => {
  const uncapped = size(1.5, false);
  expect(uncapped.nextWidth).toBe(2880);
  expect(uncapped.nextWidth / uncapped.presentedStyleWidth).toBe(1.5);
  expect(target(uncapped)).toEqual(target(size(1, false)));
  const capped = size(1.5, true);
  expect(capped.nextWidth).toBeLessThanOrEqual(960);
  expect(capped.nextHeight).toBeLessThanOrEqual(720);
  expect(target(size(1.5, true, target(capped).width))).toEqual(target(capped));
});
