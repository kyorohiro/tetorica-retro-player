import { describe, expect, it, vi } from "vitest";
import { createRetroAudioEngine } from "./TetoricaRetroAudioNode";

describe("audio graph initialization", () => {
  it("mutes only monitoring during display capture and preserves processed recording", () => {
    const engine = createRetroAudioEngine({
      context: { currentTime: 0 } as AudioContext,
      params: { isMuted: true, volume: 0.4, isNoiseEnabled: true, noiseLevel: 0.02 },
    });
    const param = () => ({ value: 1, cancelScheduledValues: vi.fn(), setValueAtTime: vi.fn() });
    const master = param(), monitor = param(), noise = param();
    Object.assign((engine as unknown as { nodes: object }).nodes, {
      masterGain: { gain: master }, monitorGain: { gain: monitor }, noiseGain: { gain: noise },
    });
    engine.setCaptureRecordingMode(true);
    expect(master.setValueAtTime).toHaveBeenLastCalledWith(1, 0);
    expect(monitor.value).toBe(0);
    expect(noise.setValueAtTime).toHaveBeenLastCalledWith(0.11, 0);
    engine.setParams({ isMuted: false }, true);
    expect(monitor.value).toBe(0.4);
    engine.setParams({ volume: 0 }, true);
    expect(monitor.value).toBe(0);
    expect(master.setValueAtTime).toHaveBeenLastCalledWith(1, 0);
    engine.setParams({ isMuted: true, volume: 0.4 }, true);
    engine.setCaptureRecordingMode(false);
    expect(master.setValueAtTime).toHaveBeenLastCalledWith(0, 0);
    expect(noise.setValueAtTime).toHaveBeenLastCalledWith(0, 0);
    expect(monitor.value).toBe(1);
  });

  it("shares one input and recording destination across concurrent callers", async () => {
    const context = { state: "running" } as AudioContext;
    const engine = createRetroAudioEngine({ context });
    const internal = engine as unknown as {
      initNodes(): Promise<void>;
      nodes: { audioContext: AudioContext; masterGain: GainNode; inputTrimGain: GainNode; recordingDestination: MediaStreamAudioDestinationNode };
    };
    let release!: () => void;
    const ready = new Promise<void>(resolve => { release = resolve; });
    const init = vi.spyOn(internal, "initNodes").mockImplementation(async () => {
      await ready;
      Object.assign(internal.nodes, { audioContext: context, masterGain: {}, inputTrimGain: {}, recordingDestination: {} });
    });
    vi.spyOn(engine, "updateAudioNodes").mockImplementation(() => {});
    const first = engine.ensureInitialized();
    const second = engine.ensureInitialized();
    expect(init).toHaveBeenCalledTimes(1);
    release();
    await Promise.all([first, second]);
    const input = engine.input;
    const destination = engine.recordingDestination;
    await engine.ensureInitialized();
    expect(engine.input).toBe(input);
    expect(engine.recordingDestination).toBe(destination);
    expect(init).toHaveBeenCalledTimes(1);
  });

  it("allows retry after initialization fails", async () => {
    const engine = createRetroAudioEngine({ context: { state: "running" } as AudioContext });
    const internal = engine as unknown as { initNodes(): Promise<void> };
    const init = vi.spyOn(internal, "initNodes").mockRejectedValueOnce(new Error("worklet failed")).mockResolvedValueOnce();
    vi.spyOn(engine, "updateAudioNodes").mockImplementation(() => {});
    await expect(engine.ensureInitialized()).rejects.toThrow("worklet failed");
    await engine.ensureInitialized();
    expect(init).toHaveBeenCalledTimes(2);
  });
});
