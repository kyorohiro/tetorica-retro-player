export type AudioChainSettings = {
  isAudioFxEnabled: boolean;
  lofiAmount: number;
  radioToneAmount: number;
  bitCrushAmount: number;
  sampleRateReductionAmount: number;
  noiseReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
  wowFlutterAmount: number;
  isNoiseEnabled: boolean;
  noiseLevel: number;
  vinylDustAmount: number;
  delayAmount: number;
  reverbAmount: number;
  chorusAmount: number;
  tapeSaturationAmount: number;
  compressorAmount: number;
  fxOutputTrimAmount: number;
};

export type AudioChainNodes = {
  entryNode: DelayNode;
  masterGainNode: GainNode;
  radioToneHighpassNode: BiquadFilterNode;
  radioToneLowpassNode: BiquadFilterNode;
  radioTonePresenceNode: BiquadFilterNode;
  lofiLowpassNode: BiquadFilterNode;
  lofiHighshelfNode: BiquadFilterNode;
  lofiDriveNode: WaveShaperNode;
  bitcrusherNode: AudioWorkletNode | null;
  postCrushLowpassNode: BiquadFilterNode;
  bassEqNode: BiquadFilterNode;
  midEqNode: BiquadFilterNode;
  trebleEqNode: BiquadFilterNode;
  tapeSaturatorNode: WaveShaperNode;
  stereoWidthNode: AudioWorkletNode | null;
  stereoWidthBypassGainNode: GainNode;
  stereoWidthWetGainNode: GainNode;
  roomDryGainNode: GainNode;
  roomConvolverNode: ConvolverNode;
  roomWetGainNode: GainNode;
  wowFlutterDelayNode: DelayNode;
  wowLfoNode: OscillatorNode;
  wowLfoGainNode: GainNode;
  flutterLfoNode: OscillatorNode;
  flutterLfoGainNode: GainNode;
  outputBusNode: GainNode;
  echoDelayLineNode: DelayNode;
  echoFeedbackGainNode: GainNode;
  echoWetGainNode: GainNode;
  hallReverbConvolverNode: ConvolverNode;
  hallReverbWetGainNode: GainNode;
  chorusDelay1Node: DelayNode;
  chorusDelay2Node: DelayNode;
  chorusLfo1Node: OscillatorNode;
  chorusLfo2Node: OscillatorNode;
  chorusLfoGain1Node: GainNode;
  chorusLfoGain2Node: GainNode;
  chorusWetGainNode: GainNode;
  busCompressorNode: DynamicsCompressorNode;
  fxOutputGainNode: GainNode;
  analyserNode: AnalyserNode;
  noiseSourceNode: AudioBufferSourceNode;
  noiseGainNode: GainNode;
  noiseLfoNode: OscillatorNode;
  noiseLfoGainNode: GainNode;
  crackleSourceNode: AudioBufferSourceNode;
  crackleFilterNode: BiquadFilterNode;
  vinylDustBedFilterNode: BiquadFilterNode;
  vinylDustBedGainNode: GainNode;
  crackleGainNode: GainNode;
};

export function createDriveCurve(amount: number): Float32Array<ArrayBuffer> {
  const samples = 4096;
  const curve = new Float32Array(samples) as Float32Array<ArrayBuffer>;
  const drive = 1 + amount * 5;
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / (samples - 1) - 1;
    curve[i] = Math.tanh(x * drive);
  }
  return curve;
}

export function createTapeSaturationCurve(amount: number): Float32Array<ArrayBuffer> {
  const samples = 4096;
  const curve = new Float32Array(samples) as Float32Array<ArrayBuffer>;
  const k = amount * 6;// saturation factor 4 is mild, 8 is heavy
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / (samples - 1) - 1;
    if (k < 0.001) {
      curve[i] = x;
    } else {
      curve[i] = Math.tanh(x * (1 + k)) / Math.tanh(1 + k);
    }
  }
  return curve;
}

export function createSmallRoomImpulse(context: BaseAudioContext): AudioBuffer {
  const duration = 0.22;
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      const t = i / channelData.length;
      const decay = (1 - t) ** 1.85;
      const flutter = 0.78 + 0.22 * Math.sin(t * 42 + channel * 0.9);
      const earlyReflection = Math.sin(t * 130 + channel * 0.35) * 0.08;
      channelData[i] = ((Math.random() * 2 - 1) + earlyReflection) * decay * flutter * 0.28;
    }
  }
  return impulse;
}

export function createHallReverbImpulse(context: BaseAudioContext): AudioBuffer {
  const duration = 2.2;
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const impulse = context.createBuffer(2, length, context.sampleRate);
  const predelaySamples = Math.floor(context.sampleRate * 0.012);
  for (let channel = 0; channel < impulse.numberOfChannels; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      if (i < predelaySamples) continue;
      const t = (i - predelaySamples) / (length - predelaySamples);
      const decay = (1 - t) ** 1.8;
      const brightness = Math.max(0, 1 - t * 2.5);
      const early = Math.sin(t * 160 + channel * 0.8) * brightness * 0.35;
      channelData[i] = ((Math.random() * 2 - 1) + early) * decay * 0.75;
    }
  }
  return impulse;
}

export function createTintedNoiseBuffer(context: BaseAudioContext): AudioBuffer {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(2, length, context.sampleRate);
  let brownState = 0;
  let airState = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    // Heavier brownian accumulation → more low-end warmth
    brownState = (brownState + white * 0.06) / 1.06;
    airState = airState * 0.82 + white * 0.18;
    const body = brownState * 2.2;
    // Reduced air component → less harsh high-frequency hiss
    const air = (white - airState) * 0.15;
    const preSat = body + air;
    // Soft even-harmonic saturation (x - α·x|x|) adds tube-like glow
    const sample = Math.max(-1, Math.min(1, preSat - preSat * Math.abs(preSat) * 0.12));
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      const channelJitter = (Math.random() * 2 - 1) * 0.008;
      channelData[i] = Math.max(-1, Math.min(1, sample + channelJitter));
    }
  }
  return buffer;
}

export function createVinylDustBuffer(context: BaseAudioContext): AudioBuffer {
  const length = context.sampleRate * 2;
  const monoData = new Float32Array(length);
  let index = 0;
  let dustState = 0;
  while (index < length) {
    const white = Math.random() * 2 - 1;
    dustState = dustState * 0.72 + white * 0.28;
    monoData[index] += (white - dustState) * 0.018;
    const random = Math.random();
    if (random < 0.0034) {
      const crackleLength = 8 + Math.floor(Math.random() * 42);
      const crackleAmplitude = 0.11 + Math.random() * 0.28;
      const polarity = Math.random() < 0.5 ? -1 : 1;
      for (let offset = 0; offset < crackleLength && index + offset < length; offset++) {
        const decay = Math.exp(-offset / (2.4 + Math.random() * 5));
        monoData[index + offset] += polarity * crackleAmplitude * decay * (0.7 + Math.random() * 0.3);
      }
      index += crackleLength + Math.floor(Math.random() * 640);
      continue;
    }
    if (random < 0.0038) {
      const popLength = 90 + Math.floor(Math.random() * 260);
      const popAmplitude = 0.055 + Math.random() * 0.11;
      const phase = Math.random() * Math.PI * 2;
      for (let offset = 0; offset < popLength && index + offset < length; offset++) {
        const decay = Math.exp(-offset / (18 + Math.random() * 40));
        const wobble = Math.sin(phase + offset * (0.22 + Math.random() * 0.06));
        monoData[index + offset] += popAmplitude * decay * wobble;
      }
      index += popLength + Math.floor(Math.random() * 2200);
      continue;
    }
    index++;
  }
  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      const channelJitter = (Math.random() * 2 - 1) * 0.0035;
      channelData[i] = Math.max(-1, Math.min(1, monoData[i] + channelJitter));
    }
  }
  return buffer;
}

export async function buildAudioChain(
  audioCtx: AudioContext,
  getWorkletUrl?: (name: string) => string,
): Promise<AudioChainNodes> {
  const masterGainNode = audioCtx.createGain();
  const radioToneHighpassNode = audioCtx.createBiquadFilter();
  const radioToneLowpassNode = audioCtx.createBiquadFilter();
  const radioTonePresenceNode = audioCtx.createBiquadFilter();
  const lofiLowpassNode = audioCtx.createBiquadFilter();
  const lofiHighshelfNode = audioCtx.createBiquadFilter();
  const lofiDriveNode = audioCtx.createWaveShaper();
  const wowFlutterDelayNode = audioCtx.createDelay(0.05);
  const wowLfoNode = audioCtx.createOscillator();
  const wowLfoGainNode = audioCtx.createGain();
  const flutterLfoNode = audioCtx.createOscillator();
  const flutterLfoGainNode = audioCtx.createGain();

  radioToneHighpassNode.type = "highpass";
  radioToneLowpassNode.type = "lowpass";
  radioTonePresenceNode.type = "peaking";
  lofiLowpassNode.type = "lowpass";
  lofiHighshelfNode.type = "highshelf";
  lofiHighshelfNode.frequency.value = 2800;
  lofiDriveNode.oversample = "4x";
  wowFlutterDelayNode.delayTime.value = 0.006;
  wowLfoNode.type = "sine";
  flutterLfoNode.type = "sine";

  wowLfoNode.connect(wowLfoGainNode);
  wowLfoGainNode.connect(wowFlutterDelayNode.delayTime);
  flutterLfoNode.connect(flutterLfoGainNode);
  flutterLfoGainNode.connect(wowFlutterDelayNode.delayTime);

  wowFlutterDelayNode.connect(radioToneHighpassNode);
  radioToneHighpassNode.connect(radioToneLowpassNode);
  radioToneLowpassNode.connect(radioTonePresenceNode);
  radioTonePresenceNode.connect(lofiLowpassNode);
  lofiLowpassNode.connect(lofiHighshelfNode);
  lofiHighshelfNode.connect(lofiDriveNode);

  let bitcrusherNode: AudioWorkletNode | null = null;
  let stereoWidthNode: AudioWorkletNode | null = null;
  if ("audioWorklet" in audioCtx && getWorkletUrl) {
    try {
      await audioCtx.audioWorklet.addModule(getWorkletUrl("bitcrusherWorklet.js"));
      bitcrusherNode = new AudioWorkletNode(audioCtx, "retro-bitcrusher", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
      });
      await audioCtx.audioWorklet.addModule(getWorkletUrl("stereoWidthWorklet.js"));
      stereoWidthNode = new AudioWorkletNode(audioCtx, "retro-stereo-width", {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
      });
    } catch {
      bitcrusherNode = null;
      stereoWidthNode = null;
    }
  }

  const postCrushLowpassNode = audioCtx.createBiquadFilter();
  postCrushLowpassNode.type = "lowpass";
  postCrushLowpassNode.frequency.value = 18000;
  postCrushLowpassNode.Q.value = 0.5;

  const bassEqNode = audioCtx.createBiquadFilter();
  const midEqNode = audioCtx.createBiquadFilter();
  const trebleEqNode = audioCtx.createBiquadFilter();
  bassEqNode.type = "lowshelf";
  bassEqNode.frequency.value = 180;
  midEqNode.type = "peaking";
  midEqNode.frequency.value = 1200;
  midEqNode.Q.value = 0.5;
  trebleEqNode.type = "highshelf";
  trebleEqNode.frequency.value = 2800;

  if (bitcrusherNode) {
    lofiDriveNode.connect(bitcrusherNode);
    bitcrusherNode.connect(postCrushLowpassNode);
  } else {
    lofiDriveNode.connect(postCrushLowpassNode);
  }
  postCrushLowpassNode.connect(bassEqNode);
  bassEqNode.connect(midEqNode);
  midEqNode.connect(trebleEqNode);

  const tapeSaturatorNode = audioCtx.createWaveShaper();
  tapeSaturatorNode.curve = createTapeSaturationCurve(0);
  tapeSaturatorNode.oversample = "4x";
  trebleEqNode.connect(tapeSaturatorNode);

  const roomDryGainNode = audioCtx.createGain();
  const roomConvolverNode = audioCtx.createConvolver();
  const roomWetGainNode = audioCtx.createGain();
  roomConvolverNode.buffer = createSmallRoomImpulse(audioCtx);

  const stereoWidthBypassGainNode = audioCtx.createGain();
  const stereoWidthWetGainNode = audioCtx.createGain();
  stereoWidthBypassGainNode.gain.value = 1; // default: bypass (no processing)
  stereoWidthWetGainNode.gain.value = 0;

  tapeSaturatorNode.connect(stereoWidthBypassGainNode);
  stereoWidthBypassGainNode.connect(roomDryGainNode);
  stereoWidthBypassGainNode.connect(roomConvolverNode);

  if (stereoWidthNode) {
    tapeSaturatorNode.connect(stereoWidthNode);
    stereoWidthNode.connect(stereoWidthWetGainNode);
    stereoWidthWetGainNode.connect(roomDryGainNode);
    stereoWidthWetGainNode.connect(roomConvolverNode);
  }
  roomConvolverNode.connect(roomWetGainNode);
  roomDryGainNode.connect(masterGainNode);
  roomWetGainNode.connect(masterGainNode);

  // Spatial effects
  const outputBusNode = audioCtx.createGain();
  outputBusNode.gain.value = 1;

  const echoDelayLineNode = audioCtx.createDelay(1.0);
  echoDelayLineNode.delayTime.value = 0.32;
  const echoFeedbackGainNode = audioCtx.createGain();
  echoFeedbackGainNode.gain.value = 0;
  const echoWetGainNode = audioCtx.createGain();
  echoWetGainNode.gain.value = 0;

  const hallReverbConvolverNode = audioCtx.createConvolver();
  hallReverbConvolverNode.buffer = createHallReverbImpulse(audioCtx);
  const hallReverbWetGainNode = audioCtx.createGain();
  hallReverbWetGainNode.gain.value = 0;

  const chorusDelay1Node = audioCtx.createDelay(0.05);
  const chorusDelay2Node = audioCtx.createDelay(0.05);
  chorusDelay1Node.delayTime.value = 0.018;
  chorusDelay2Node.delayTime.value = 0.023;
  const chorusLfo1Node = audioCtx.createOscillator();
  const chorusLfo2Node = audioCtx.createOscillator();
  chorusLfo1Node.type = "sine";
  chorusLfo2Node.type = "sine";
  chorusLfo1Node.frequency.value = 0.8;
  chorusLfo2Node.frequency.value = 1.3;
  const chorusLfoGain1Node = audioCtx.createGain();
  const chorusLfoGain2Node = audioCtx.createGain();
  chorusLfoGain1Node.gain.value = 0;
  chorusLfoGain2Node.gain.value = 0;
  const chorusWetGainNode = audioCtx.createGain();
  chorusWetGainNode.gain.value = 0;

  masterGainNode.connect(outputBusNode);
  masterGainNode.connect(echoDelayLineNode);
  echoDelayLineNode.connect(echoFeedbackGainNode);
  echoFeedbackGainNode.connect(echoDelayLineNode);
  echoDelayLineNode.connect(echoWetGainNode);
  echoWetGainNode.connect(outputBusNode);
  masterGainNode.connect(hallReverbConvolverNode);
  hallReverbConvolverNode.connect(hallReverbWetGainNode);
  hallReverbWetGainNode.connect(outputBusNode);
  masterGainNode.connect(chorusDelay1Node);
  masterGainNode.connect(chorusDelay2Node);
  chorusLfo1Node.connect(chorusLfoGain1Node);
  chorusLfoGain1Node.connect(chorusDelay1Node.delayTime);
  chorusLfo2Node.connect(chorusLfoGain2Node);
  chorusLfoGain2Node.connect(chorusDelay2Node.delayTime);
  chorusDelay1Node.connect(chorusWetGainNode);
  chorusDelay2Node.connect(chorusWetGainNode);
  chorusWetGainNode.connect(outputBusNode);

  const busCompressorNode = audioCtx.createDynamicsCompressor();
  busCompressorNode.knee.value = 10;
  busCompressorNode.attack.value = 0.003;
  busCompressorNode.release.value = 0.12;
  busCompressorNode.threshold.value = 0;
  busCompressorNode.ratio.value = 1;

  const fxOutputGainNode = audioCtx.createGain();
  fxOutputGainNode.gain.value = 1;

  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 512;
  analyserNode.smoothingTimeConstant = 0.8;

  outputBusNode.connect(busCompressorNode);
  busCompressorNode.connect(fxOutputGainNode);
  fxOutputGainNode.connect(audioCtx.destination);
  fxOutputGainNode.connect(analyserNode);

  // Noise chain
  const noiseSourceNode = audioCtx.createBufferSource();
  noiseSourceNode.buffer = createTintedNoiseBuffer(audioCtx);
  noiseSourceNode.loop = true;
  // Tube noise filter chain:
  // highpass @ 220Hz (pass warmth) → lowpass @ 4500Hz (soft highs)
  // → warmth boost @ 350Hz → harshness cut @ 3200Hz
  const noiseHighpassNode = audioCtx.createBiquadFilter();
  noiseHighpassNode.type = "highpass";
  noiseHighpassNode.frequency.value = 220;
  noiseHighpassNode.Q.value = 0.5;
  const noiseLowpassNode = audioCtx.createBiquadFilter();
  noiseLowpassNode.type = "lowpass";
  noiseLowpassNode.frequency.value = 4500;
  noiseLowpassNode.Q.value = 0.2;
  const noiseWarmthNode = audioCtx.createBiquadFilter();
  noiseWarmthNode.type = "peaking";
  noiseWarmthNode.frequency.value = 350;
  noiseWarmthNode.Q.value = 0.9;
  noiseWarmthNode.gain.value = 1.5;
  const noiseFilterNode = audioCtx.createBiquadFilter();
  noiseFilterNode.type = "peaking";
  noiseFilterNode.frequency.value = 3200;
  noiseFilterNode.Q.value = 0.8;
  noiseFilterNode.gain.value = -2.0;
  const noisePannerNode = audioCtx.createStereoPanner();
  const noiseGainNode = audioCtx.createGain();
  noiseGainNode.gain.value = 0;
  const noiseLfoNode = audioCtx.createOscillator();
  const noiseLfoGainNode = audioCtx.createGain();
  noiseLfoNode.type = "sine";
  noiseLfoNode.frequency.value = 0.021;
  noiseLfoGainNode.gain.value = 0.08;

  noiseSourceNode.connect(noiseHighpassNode);
  noiseHighpassNode.connect(noiseLowpassNode);
  noiseLowpassNode.connect(noiseWarmthNode);
  noiseWarmthNode.connect(noiseFilterNode);
  noiseFilterNode.connect(noisePannerNode);
  noisePannerNode.connect(noiseGainNode);
  noiseGainNode.connect(masterGainNode);
  noiseLfoNode.connect(noiseLfoGainNode);
  noiseLfoGainNode.connect(noisePannerNode.pan);

  // Crackle/vinyl dust chain
  const crackleSourceNode = audioCtx.createBufferSource();
  crackleSourceNode.buffer = createVinylDustBuffer(audioCtx);
  crackleSourceNode.loop = true;
  const crackleFilterNode = audioCtx.createBiquadFilter();
  crackleFilterNode.type = "highpass";
  crackleFilterNode.frequency.value = 1250;
  crackleFilterNode.Q.value = 0.35;
  const vinylDustBedFilterNode = audioCtx.createBiquadFilter();
  vinylDustBedFilterNode.type = "bandpass";
  vinylDustBedFilterNode.frequency.value = 2400;
  vinylDustBedFilterNode.Q.value = 0.4;
  const vinylDustBedGainNode = audioCtx.createGain();
  vinylDustBedGainNode.gain.value = 0;
  const crackleGainNode = audioCtx.createGain();
  crackleGainNode.gain.value = 0;

  crackleSourceNode.connect(crackleFilterNode);
  crackleFilterNode.connect(crackleGainNode);
  crackleGainNode.connect(masterGainNode);
  crackleSourceNode.connect(vinylDustBedFilterNode);
  vinylDustBedFilterNode.connect(vinylDustBedGainNode);
  vinylDustBedGainNode.connect(masterGainNode);

  noiseSourceNode.start();
  noiseLfoNode.start();
  crackleSourceNode.start();
  wowLfoNode.start();
  flutterLfoNode.start();
  chorusLfo1Node.start();
  chorusLfo2Node.start();

  return {
    entryNode: wowFlutterDelayNode,
    masterGainNode,
    radioToneHighpassNode, radioToneLowpassNode, radioTonePresenceNode,
    lofiLowpassNode, lofiHighshelfNode, lofiDriveNode,
    bitcrusherNode, stereoWidthNode,
    stereoWidthBypassGainNode, stereoWidthWetGainNode,
    postCrushLowpassNode,
    bassEqNode, midEqNode, trebleEqNode,
    tapeSaturatorNode,
    roomDryGainNode, roomConvolverNode, roomWetGainNode,
    wowFlutterDelayNode, wowLfoNode, wowLfoGainNode,
    flutterLfoNode, flutterLfoGainNode,
    outputBusNode,
    echoDelayLineNode, echoFeedbackGainNode, echoWetGainNode,
    hallReverbConvolverNode, hallReverbWetGainNode,
    chorusDelay1Node, chorusDelay2Node,
    chorusLfo1Node, chorusLfo2Node,
    chorusLfoGain1Node, chorusLfoGain2Node,
    chorusWetGainNode,
    busCompressorNode, fxOutputGainNode, analyserNode,
    noiseSourceNode, noiseGainNode,
    noiseLfoNode, noiseLfoGainNode,
    crackleSourceNode, crackleFilterNode,
    vinylDustBedFilterNode, vinylDustBedGainNode, crackleGainNode,
  };
}

export function updateAudioChainNodes(nodes: AudioChainNodes, settings: AudioChainSettings): void {
  const {
    radioToneHighpassNode, radioToneLowpassNode, radioTonePresenceNode,
    lofiLowpassNode, lofiHighshelfNode, lofiDriveNode,
    bitcrusherNode, stereoWidthNode,
    stereoWidthBypassGainNode, stereoWidthWetGainNode,
    postCrushLowpassNode,
    bassEqNode, midEqNode, trebleEqNode,
    tapeSaturatorNode,
    roomDryGainNode, roomWetGainNode,
    wowFlutterDelayNode, wowLfoNode, wowLfoGainNode,
    flutterLfoNode, flutterLfoGainNode,
    echoDelayLineNode, echoFeedbackGainNode, echoWetGainNode,
    hallReverbWetGainNode,
    chorusLfoGain1Node, chorusLfoGain2Node, chorusWetGainNode,
    busCompressorNode, fxOutputGainNode,
    noiseGainNode, crackleGainNode,
    vinylDustBedFilterNode, vinylDustBedGainNode,
  } = nodes;

  {
    const amount = settings.isAudioFxEnabled ? settings.radioToneAmount : 0;
    radioToneHighpassNode.frequency.value = 20 + amount * 430;
    radioToneHighpassNode.Q.value = 0.4 + amount * 0.35;
    radioToneLowpassNode.frequency.value = 20000 - amount * 17400;
    radioToneLowpassNode.Q.value = 0.2 + amount * 0.9;
    radioTonePresenceNode.frequency.value = 1700;
    radioTonePresenceNode.Q.value = 0.8 + amount * 1.4;
    radioTonePresenceNode.gain.value = amount * 6;
  }

  {
    const amount = settings.isAudioFxEnabled ? settings.lofiAmount : 0;
    lofiLowpassNode.frequency.value = 16000 - amount * 14200;
    lofiLowpassNode.Q.value = 0.3 + amount * 0.5;
    lofiHighshelfNode.gain.value = -amount * 18;
    lofiDriveNode.curve = createDriveCurve(amount * 0.6);
  }

  if (bitcrusherNode) {
    const isEnabled = settings.isAudioFxEnabled;
    const bitDepth = 16 - (isEnabled ? settings.bitCrushAmount : 0) * 12;
    const holdFrames = 1 + (isEnabled ? settings.sampleRateReductionAmount : 0) * 23;
    const mix = isEnabled
      ? Math.max(settings.bitCrushAmount, settings.sampleRateReductionAmount)
      : 0;
    const t = bitcrusherNode.context.currentTime;
    bitcrusherNode.parameters.get("bitDepth")?.setValueAtTime(bitDepth, t);
    bitcrusherNode.parameters.get("holdFrames")?.setValueAtTime(holdFrames, t);
    bitcrusherNode.parameters.get("mix")?.setValueAtTime(mix, t);
  }

  {
    const amount = settings.isAudioFxEnabled ? settings.noiseReductionAmount : 0;
    postCrushLowpassNode.frequency.value = Math.max(3000, 18000 - amount * 15000);
  }

  {
    const eqScale = settings.isAudioFxEnabled ? 15 : 0;
    bassEqNode.gain.value = settings.bassAmount * eqScale;
    midEqNode.gain.value = settings.midAmount * eqScale;
    trebleEqNode.gain.value = settings.trebleAmount * eqScale;
  }

  try {
    tapeSaturatorNode.curve = createTapeSaturationCurve(
      settings.isAudioFxEnabled ? settings.tapeSaturationAmount : 0,
    );
  } catch {
    // Some non-browser Web Audio implementations reject reassigning curve.
  }

  if (stereoWidthNode) {
    const amount = settings.isAudioFxEnabled ? settings.stereoWidthAmount : 0;
    const now = stereoWidthNode.context.currentTime;
    const ramp = 0.05;
    if (amount === 0) {
      // bypass: route through dry gain, mute worklet output
      stereoWidthBypassGainNode.gain.setTargetAtTime(1, now, ramp);
      stereoWidthWetGainNode.gain.setTargetAtTime(0, now, ramp);
    } else {
      // processing active
      stereoWidthBypassGainNode.gain.setTargetAtTime(0, now, ramp);
      stereoWidthWetGainNode.gain.setTargetAtTime(1, now, ramp);
      stereoWidthNode.parameters.get("width")?.setValueAtTime(1 + amount, now);
    }
  }

  {
    const amount = settings.isAudioFxEnabled ? settings.smallSpeakerRoomAmount : 0;
    roomDryGainNode.gain.value = Math.max(0.52, 1 - amount * 0.42);
    roomWetGainNode.gain.value = amount * 0.95;
  }

  {
    const amount = settings.isAudioFxEnabled ? settings.wowFlutterAmount : 0;
    wowFlutterDelayNode.delayTime.value = 0.006 + amount * 0.004;
    wowLfoNode.frequency.value = 0.18 + amount * 0.42;
    wowLfoGainNode.gain.value = amount * 0.0023;
    flutterLfoNode.frequency.value = 5.2 + amount * 6.5;
    flutterLfoGainNode.gain.value = amount * 0.0006;
  }

  {
    const amount = settings.isAudioFxEnabled ? settings.delayAmount : 0;
    echoDelayLineNode.delayTime.value = 0.32;
    echoFeedbackGainNode.gain.value = amount * 0.5;
    echoWetGainNode.gain.value = amount * 0.55;
  }

  hallReverbWetGainNode.gain.value =
    settings.isAudioFxEnabled ? settings.reverbAmount * 2.0 : 0;

  {
    const amount = settings.isAudioFxEnabled ? settings.chorusAmount : 0;
    chorusWetGainNode.gain.value = amount * 0.6;
    chorusLfoGain1Node.gain.value = amount * 0.005;
    chorusLfoGain2Node.gain.value = amount * 0.006;
  }

  {
    const amount = settings.isAudioFxEnabled ? settings.compressorAmount : 0;
    busCompressorNode.threshold.value = -36 * amount;
    busCompressorNode.ratio.value = 1 + 9 * amount;
  }

  fxOutputGainNode.gain.value = settings.isAudioFxEnabled ? settings.fxOutputTrimAmount : 1;

  noiseGainNode.gain.value = settings.isNoiseEnabled
    ? Math.min(0.24, settings.noiseLevel * 5.5)
    : 0;

  crackleGainNode.gain.value = settings.isNoiseEnabled
    ? Math.min(0.24, settings.vinylDustAmount * 0.22 + settings.noiseLevel * 0.25)
    : 0;

  {
    const amount = settings.isNoiseEnabled ? settings.vinylDustAmount : 0;
    vinylDustBedFilterNode.frequency.value = 2100 + amount * 2600;
    vinylDustBedFilterNode.Q.value = 0.35 + amount * 0.25;
    vinylDustBedGainNode.gain.value = amount * 0.11;
  }
}

export function disposeAudioChain(nodes: AudioChainNodes): void {
  for (const source of [
    nodes.noiseSourceNode,
    nodes.noiseLfoNode,
    nodes.crackleSourceNode,
    nodes.wowLfoNode,
    nodes.flutterLfoNode,
    nodes.chorusLfo1Node,
    nodes.chorusLfo2Node,
  ]) {
    try { source.stop(); } catch { /* ignore repeated stop */ }
  }
}
