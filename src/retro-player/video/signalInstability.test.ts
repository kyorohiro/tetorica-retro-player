import { describe, expect, it } from "vitest";
import { SignalInstabilityController } from "./signalInstability";

const createSequenceRandom = (values: number[]) => {
  let index = 0;
  return () => {
    const value = values[index];
    index += 1;
    return value ?? 0;
  };
};

describe("SignalInstabilityController", () => {
  it("stays inactive when disabled or when frequency is zero", () => {
    const controller = new SignalInstabilityController(() => 0);

    expect(controller.update(0, {
      enabled: false,
      strength: 1,
      frequency: 1,
    })).toEqual({
      intensity: 0,
      horizontalSync: 0,
      verticalSync: 0,
      staticNoise: 0,
      chromaNoise: 0,
      seed: 0,
      phase: 0,
    });

    expect(controller.update(1, {
      enabled: true,
      strength: 1,
      frequency: 0,
    }).intensity).toBe(0);
  });

  it("creates a short event that keeps the same phase across nearby frames", () => {
    const controller = new SignalInstabilityController(createSequenceRandom([
      0.0,
      0.4,
      0.2,
      0.1,
      0.9,
      0.3,
      0.2,
      0.5,
      0.1,
      0.4,
      0.3,
      0.6,
    ]));

    expect(controller.update(0, {
      enabled: true,
      strength: 1,
      frequency: 1,
    }).intensity).toBe(0);

    const first = controller.update(0.1, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });
    const second = controller.update(0.14, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });
    const third = controller.update(0.18, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });

    expect(first.seed).toBeGreaterThanOrEqual(0);
    expect(second.intensity).toBeGreaterThan(0);
    expect(second.horizontalSync).toBeGreaterThan(0);
    expect(second.staticNoise).toBeGreaterThan(0);
    expect(second.phase).toBe(third.phase);
    expect(second.seed).toBe(third.seed);
  });

  it("returns to zero after the event and decay window finish", () => {
    const controller = new SignalInstabilityController(createSequenceRandom([
      0.0,
      0.5,
      0.0,
      0.0,
      0.99,
      0.0,
      0.0,
      0.0,
      0.5,
      0.0,
      0.0,
      0.0,
    ]));

    controller.update(0, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });
    controller.update(0.2, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });
    const active = controller.update(0.24, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });
    const settled = controller.update(1.2, {
      enabled: true,
      strength: 1,
      frequency: 1,
    });

    expect(active.intensity).toBeGreaterThan(0);
    expect(settled).toEqual({
      intensity: 0,
      horizontalSync: 0,
      verticalSync: 0,
      staticNoise: 0,
      chromaNoise: 0,
      seed: 0,
      phase: 0,
    });
  });
});
