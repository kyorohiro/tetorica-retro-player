import { describe, expect, it } from "vitest";
import { getDisplayAutoTargetSize, normalizeAutoTargetSpacing, normalizeAutoTargetSizeBasis } from "./autoTargetSize";

describe("display auto target size", () => {
  it("uses CSS display size, not the source resolution", () => {
    expect(getDisplayAutoTargetSize({ width: 1920, height: 1080 }, { width: 660, height: 371 }, 3))
      .toEqual({ width: 220, height: 124 });
  });
  it("supports fractional spacing and follows display resizing", () => {
    const source = { width: 1920, height: 1080 };
    expect(getDisplayAutoTargetSize(source, { width: 800, height: 450 }, 2.5))
      .toEqual({ width: 320, height: 180 });
    expect(getDisplayAutoTargetSize(source, { width: 400, height: 225 }, 2.5))
      .toEqual({ width: 160, height: 90 });
  });
  it("preserves portrait aspect and removes unused space", () => {
    expect(getDisplayAutoTargetSize({ width: 1080, height: 1920 }, { width: 400, height: 800 }, 2))
      .toEqual({ width: 200, height: 356 });
  });
  it("waits for a valid viewport and keeps dimensions positive", () => {
    expect(getDisplayAutoTargetSize({ width: 1920, height: 1080 }, null, 3)).toBeNull();
    expect(getDisplayAutoTargetSize({ width: 0, height: 1080 }, { width: 660, height: 371 }, 3)).toBeNull();
    expect(getDisplayAutoTargetSize({ width: 1920, height: 1080 }, { width: 1, height: 1 }, 5))
      .toEqual({ width: 1, height: 1 });
  });
  it("defaults legacy settings and bounds imported spacing", () => {
    expect(normalizeAutoTargetSizeBasis(undefined)).toBe("source");
    expect(normalizeAutoTargetSpacing(undefined)).toBe(1);
    expect(normalizeAutoTargetSpacing(NaN)).toBe(1);
    expect(normalizeAutoTargetSpacing(0)).toBe(1);
    expect(normalizeAutoTargetSpacing(10)).toBe(5);
    expect(normalizeAutoTargetSpacing(2.56)).toBe(2.6);
  });
});

it("selects X for landscape and square, Y for portrait", () => {
  for (const [width, height, expectedWidth, expectedHeight] of [
    [400, 400, 100, 100],
    [400, 100, 100, 25],
    [100, 400, 50, 200],
  ]) {
    expect(getDisplayAutoTargetSize({ width, height }, { width, height }, 4, 2))
      .toEqual({ width: expectedWidth, height: expectedHeight });
  }
});
it("uses source orientation despite rounded viewport dimensions and supports fractional spacing", () => {
  expect(getDisplayAutoTargetSize({ width: 400, height: 401 }, { width: 400, height: 400 }, 4, 2))
    .toEqual({ width: 200, height: 200 });
  expect(getDisplayAutoTargetSize({ width: 420, height: 105 }, { width: 420, height: 105 }, 4.2, 2.5))
    .toEqual({ width: 100, height: 25 });
});
