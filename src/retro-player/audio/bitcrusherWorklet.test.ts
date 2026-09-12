import { describe, expect, it, vi } from "vitest";
import source from "./bitcrusherWorklet.js?raw";

type Processor = {
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
};

function createProcessor() {
  let ProcessorClass!: new () => Processor;
  const random = vi.fn(() => 0.5);
  const math = Object.create(Math);
  math.random = random;
  new Function("AudioWorkletProcessor", "registerProcessor", "Math", source)(
    class {}, (_name: string, ctor: new () => Processor) => { ProcessorClass = ctor; }, math,
  );
  const processor = new ProcessorClass();
  const run = (input: Float32Array[], mix: number, bitDepth = 2, holdFrames = 2) => {
    const output = [new Float32Array(input[0]?.length ?? 4), new Float32Array(input[0]?.length ?? 4)];
    output.forEach(channel => channel.fill(123));
    expect(processor.process([input], [output], {
      mix: new Float32Array([mix]), bitDepth: new Float32Array([bitDepth]), holdFrames: new Float32Array([holdFrames]),
    })).toBe(true);
    return output;
  };
  return { run, random };
}

describe("bitcrusher audio worklet", () => {
  it("copies dry stereo input exactly without generating dither", () => {
    const { run, random } = createProcessor();
    const input = [new Float32Array([0, 0.123, -1, 1]), new Float32Array([1, -0.25, 0, 0.5])];
    expect(run(input, 0)).toEqual(input);
    expect(random).not.toHaveBeenCalled();
  });

  it("clears absent dry channels instead of reading the output buffer", () => {
    const { run, random } = createProcessor();
    expect(run([], 0)).toEqual([new Float32Array(4), new Float32Array(4)]);
    expect(random).not.toHaveBeenCalled();
  });

  it("preserves quantization and sample holding while enabled", () => {
    const { run, random } = createProcessor();
    const input = new Float32Array([0, 0.5, -0.5, 1]);
    const output = run([input, input], 1);
    // The previous positive quantization error feeds into the next held sample.
    expect(output[0]).toEqual(new Float32Array([1 / 3, 1 / 3, -1, -1]));
    expect(output[1]).toEqual(output[0]);
    expect(random).toHaveBeenCalledTimes(8);
  });

  it("starts from fresh input after bypass instead of replaying a held sample", () => {
    const { run } = createProcessor();
    run([new Float32Array([1])], 1, 2, 32);
    run([new Float32Array([0])], 0, 2, 32);
    expect(run([new Float32Array([-1])], 1, 2, 32)[0][0]).toBe(-1);
  });
});
