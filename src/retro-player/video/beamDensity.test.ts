import { expect, it } from "vitest";
import { limitBeamViewportByDensity } from "./beamDensity";

it("preserves the 100% Retina viewport and reduces the cell budget at 80% and 33%", () => {
  const full = { width: 379, height: 213 };
  expect(limitBeamViewportByDensity(full, full, { width: 758, height: 426 }, 2)).toEqual(full);
  const reduced = { width: 493.75, height: 278.13 };
  expect(limitBeamViewportByDensity(reduced, reduced, { width: 790, height: 445 }, 1.6).width).toBe(395);
  const small = { width: 942.98, height: 529.99 };
  expect(limitBeamViewportByDensity(small, small, { width: 943, height: 530 }, 0.67).width)
    .toBeCloseTo(315.8983);
});

it("respects buffer and existing cap limits even with supersampling or a dense screen", () => {
  const display = { width: 800, height: 600 };
  expect(limitBeamViewportByDensity(display, display, { width: 400, height: 300 }, 2))
    .toEqual({ width: 200, height: 150 });
  const capped = { width: 100, height: 75 };
  expect(limitBeamViewportByDensity(capped, display, { width: 1600, height: 1200 }, 3)).toEqual(capped);
});
