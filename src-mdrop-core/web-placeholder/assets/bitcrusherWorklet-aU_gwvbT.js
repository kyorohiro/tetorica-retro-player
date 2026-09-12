class RetroBitcrusherProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "bitDepth",
        defaultValue: 16,
        minValue: 2,
        maxValue: 16,
        automationRate: "k-rate",
      },
      {
        name: "holdFrames",
        defaultValue: 1,
        minValue: 1,
        maxValue: 32,
        automationRate: "k-rate",
      },
      {
        name: "mix",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
    ];
  }

  constructor() {
    super();
    this.channelState = [];
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    if (!output) {
      return true;
    }

    const channelCount = output.length;
    // These AudioParams are k-rate: constant for the whole render quantum.
    const bitDepth = parameters.bitDepth[0];
    const holdFrames = Math.max(1, Math.round(parameters.holdFrames[0]));
    const mix = parameters.mix[0];
    const resolvedBitDepth = Math.max(2, Math.min(16, Math.round(bitDepth)));
    const levelsMinusOne = 2 ** resolvedBitDepth - 1;
    const lsb = 2 / Math.pow(2, bitDepth);
    while (this.channelState.length < channelCount) {
      this.channelState.push({
        holdCounter: 0,
        heldSample: 0,
        nsError: 0,  // noise shaping feedback
      });
    }

    for (let channel = 0; channel < channelCount; channel += 1) {
      const inputChannel = input?.[channel];
      const outputChannel = output[channel];
      const state = this.channelState[channel];

      if (mix === 0) {
        if (inputChannel) outputChannel.set(inputChannel);
        else outputChannel.fill(0);
        // Restart from fresh input when enabled; do not retain an old held sample.
        state.holdCounter = 0;
        state.heldSample = 0;
        state.nsError = 0;
        continue;
      }

      for (let index = 0; index < outputChannel.length; index += 1) {
        const source = inputChannel?.[index] ?? 0;

        if (state.holdCounter <= 0) {
          // 三角ディザリング: 量子化歪み → サラサラしたヒス音に変換
          const dither = (Math.random() + Math.random() - 1) * lsb;
          // 1次ノイズシェーピング: 前回の量子化誤差をフィードバックして高域へ押し出す
          const shaped = Math.max(-1, Math.min(1, source + dither - state.nsError * 0.85));
          state.heldSample = resolvedBitDepth >= 16
            ? shaped
            : Math.round((shaped + 1) * 0.5 * levelsMinusOne) / levelsMinusOne * 2 - 1;
          state.nsError = state.heldSample - shaped;
          state.holdCounter = holdFrames - 1;
        } else {
          state.holdCounter -= 1;
        }

        outputChannel[index] = source + (state.heldSample - source) * mix;
      }
    }

    return true;
  }
}

registerProcessor("retro-bitcrusher", RetroBitcrusherProcessor);
