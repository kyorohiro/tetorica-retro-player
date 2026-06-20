export function createDriveCurve(amount) {
  const samples = 256;
  const curve = new Float32Array(samples);
  const drive = 1 + amount * 5;
  for (let index = 0; index < samples; index += 1) {
    const x = (index * 2) / (samples - 1) - 1;
    curve[index] = Math.tanh(x * drive);
  }
  return curve;
}

export function createSmallRoomImpulse(context) {
  const duration = 0.22;
  const length = Math.max(1, Math.floor(context.sampleRate * duration));
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const channelData = impulse.getChannelData(channel);
    for (let index = 0; index < channelData.length; index += 1) {
      const t = index / channelData.length;
      const decay = (1 - t) ** 1.85;
      const flutter = 0.78 + 0.22 * Math.sin(t * 42 + channel * 0.9);
      const earlyReflection = Math.sin(t * 130 + channel * 0.35) * 0.08;
      channelData[index] = ((Math.random() * 2 - 1) + earlyReflection) * decay * flutter * 0.28;
    }
  }
  return impulse;
}

export function createTintedNoiseBuffer(context) {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(2, length, context.sampleRate);
  let brownState = 0;
  let airState = 0;
  for (let index = 0; index < length; index += 1) {
    const white = Math.random() * 2 - 1;
    brownState = (brownState + white * 0.045) / 1.045;
    airState = airState * 0.82 + white * 0.18;
    const body = brownState * 1.35;
    const air = (white - airState) * 0.55;
    const sample = Math.max(-1, Math.min(1, body + air));
    for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
      const channelData = buffer.getChannelData(channel);
      const channelJitter = (Math.random() * 2 - 1) * 0.012;
      channelData[index] = Math.max(-1, Math.min(1, sample + channelJitter));
    }
  }
  return buffer;
}

export function createVinylDustBuffer(context) {
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
      for (let offset = 0; offset < crackleLength && index + offset < length; offset += 1) {
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
      for (let offset = 0; offset < popLength && index + offset < length; offset += 1) {
        const decay = Math.exp(-offset / (18 + Math.random() * 40));
        const wobble = Math.sin(phase + offset * (0.22 + Math.random() * 0.06));
        monoData[index + offset] += popAmplitude * decay * wobble;
      }
      index += popLength + Math.floor(Math.random() * 2200);
      continue;
    }

    index += 1;
  }

  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const channelData = buffer.getChannelData(channel);
    for (let sampleIndex = 0; sampleIndex < length; sampleIndex += 1) {
      const channelJitter = (Math.random() * 2 - 1) * 0.0035;
      channelData[sampleIndex] = Math.max(-1, Math.min(1, monoData[sampleIndex] + channelJitter));
    }
  }
  return buffer;
}

export async function buildAudioChain(audioCtx, getWorkletUrl) {
  const masterGainNode = audioCtx.createGain();
  const radioToneHighpassNode = audioCtx.createBiquadFilter();
  const radioToneLowpassNode = audioCtx.createBiquadFilter();
  const radioTonePresenceNode = audioCtx.createBiquadFilter();
  const lofiLowpassNode = audioCtx.createBiquadFilter();
  const lofiHighshelfNode = audioCtx.createBiquadFilter();
  const lofiDriveNode = audioCtx.createWaveShaper();
  const bassEqNode = audioCtx.createBiquadFilter();
  const midEqNode = audioCtx.createBiquadFilter();
  const trebleEqNode = audioCtx.createBiquadFilter();
  const roomDryGainNode = audioCtx.createGain();
  const roomConvolverNode = audioCtx.createConvolver();
  const roomWetGainNode = audioCtx.createGain();
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
  bassEqNode.type = "lowshelf";
  bassEqNode.frequency.value = 180;
  midEqNode.type = "peaking";
  midEqNode.frequency.value = 1200;
  midEqNode.Q.value = 0.9;
  trebleEqNode.type = "highshelf";
  trebleEqNode.frequency.value = 3200;
  roomConvolverNode.buffer = createSmallRoomImpulse(audioCtx);
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

  let bitcrusherNode = null;
  let stereoWidthNode = null;
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

  if (bitcrusherNode) {
    lofiDriveNode.connect(bitcrusherNode);
    bitcrusherNode.connect(bassEqNode);
  } else {
    lofiDriveNode.connect(bassEqNode);
  }
  bassEqNode.connect(midEqNode);
  midEqNode.connect(trebleEqNode);
  if (stereoWidthNode) {
    trebleEqNode.connect(stereoWidthNode);
    stereoWidthNode.connect(roomDryGainNode);
    stereoWidthNode.connect(roomConvolverNode);
  } else {
    trebleEqNode.connect(roomDryGainNode);
    trebleEqNode.connect(roomConvolverNode);
  }
  roomConvolverNode.connect(roomWetGainNode);
  roomDryGainNode.connect(masterGainNode);
  roomWetGainNode.connect(masterGainNode);
  masterGainNode.connect(audioCtx.destination);

  // Noise chain
  const noiseSourceNode = audioCtx.createBufferSource();
  noiseSourceNode.buffer = createTintedNoiseBuffer(audioCtx);
  noiseSourceNode.loop = true;
  const noiseHighpassNode = audioCtx.createBiquadFilter();
  noiseHighpassNode.type = "highpass";
  noiseHighpassNode.frequency.value = 1100;
  noiseHighpassNode.Q.value = 0.25;
  const noiseLowpassNode = audioCtx.createBiquadFilter();
  noiseLowpassNode.type = "lowpass";
  noiseLowpassNode.frequency.value = 5600;
  noiseLowpassNode.Q.value = 0.18;
  const noiseFilterNode = audioCtx.createBiquadFilter();
  noiseFilterNode.type = "peaking";
  noiseFilterNode.frequency.value = 2400;
  noiseFilterNode.Q.value = 0.7;
  noiseFilterNode.gain.value = -2.5;
  const noisePannerNode = audioCtx.createStereoPanner();
  const noiseGainNode = audioCtx.createGain();
  const noiseLfoNode = audioCtx.createOscillator();
  const noiseLfoGainNode = audioCtx.createGain();
  noiseLfoNode.type = "sine";
  noiseLfoNode.frequency.value = 0.021;
  noiseLfoGainNode.gain.value = 0.08;

  noiseSourceNode.connect(noiseHighpassNode);
  noiseHighpassNode.connect(noiseLowpassNode);
  noiseLowpassNode.connect(noiseFilterNode);
  noiseFilterNode.connect(noisePannerNode);
  noisePannerNode.connect(noiseGainNode);
  noiseGainNode.connect(masterGainNode);
  noiseLfoNode.connect(noiseLfoGainNode);
  noiseLfoGainNode.connect(noisePannerNode.pan);

  // Crackle / vinyl dust chain
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

  return {
    entryNode: wowFlutterDelayNode,
    masterGainNode,
    radioToneHighpassNode, radioToneLowpassNode, radioTonePresenceNode,
    lofiLowpassNode, lofiHighshelfNode, lofiDriveNode,
    bitcrusherNode, stereoWidthNode,
    bassEqNode, midEqNode, trebleEqNode,
    roomDryGainNode, roomConvolverNode, roomWetGainNode,
    wowFlutterDelayNode, wowLfoNode, wowLfoGainNode,
    flutterLfoNode, flutterLfoGainNode,
    noiseSourceNode, noiseGainNode,
    noiseLfoNode, noiseLfoGainNode,
    crackleSourceNode, crackleFilterNode,
    vinylDustBedFilterNode, vinylDustBedGainNode, crackleGainNode,
  };
}

export function updateAudioChainNodes(nodes, settings) {
  const {
    radioToneHighpassNode, radioToneLowpassNode, radioTonePresenceNode,
    lofiLowpassNode, lofiHighshelfNode, lofiDriveNode,
    bitcrusherNode, stereoWidthNode,
    bassEqNode, midEqNode, trebleEqNode,
    roomDryGainNode, roomWetGainNode,
    wowFlutterDelayNode, wowLfoNode, wowLfoGainNode,
    flutterLfoNode, flutterLfoGainNode,
    noiseGainNode, crackleGainNode,
    vinylDustBedFilterNode, vinylDustBedGainNode,
  } = nodes;

  if (radioToneHighpassNode && radioToneLowpassNode && radioTonePresenceNode) {
    const amount = settings.isAudioFxEnabled ? settings.radioToneAmount : 0;
    radioToneHighpassNode.frequency.value = 20 + amount * 430;
    radioToneHighpassNode.Q.value = 0.4 + amount * 0.35;
    radioToneLowpassNode.frequency.value = 20000 - amount * 17400;
    radioToneLowpassNode.Q.value = 0.2 + amount * 0.9;
    radioTonePresenceNode.frequency.value = 1700;
    radioTonePresenceNode.Q.value = 0.8 + amount * 1.4;
    radioTonePresenceNode.gain.value = amount * 6;
  }

  if (lofiLowpassNode && lofiHighshelfNode && lofiDriveNode) {
    const amount = settings.isAudioFxEnabled ? settings.lofiAmount : 0;
    lofiLowpassNode.frequency.value = 16000 - amount * 14200;
    lofiLowpassNode.Q.value = 0.3 + amount * 1.8;
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
    bitcrusherNode.parameters.get("bitDepth")?.setValueAtTime(bitDepth, bitcrusherNode.context.currentTime);
    bitcrusherNode.parameters.get("holdFrames")?.setValueAtTime(holdFrames, bitcrusherNode.context.currentTime);
    bitcrusherNode.parameters.get("mix")?.setValueAtTime(mix, bitcrusherNode.context.currentTime);
  }

  if (bassEqNode && midEqNode && trebleEqNode) {
    const eqScale = settings.isAudioFxEnabled ? 15 : 0;
    bassEqNode.gain.value = settings.bassAmount * eqScale;
    midEqNode.gain.value = settings.midAmount * eqScale;
    trebleEqNode.gain.value = settings.trebleAmount * eqScale;
  }

  if (stereoWidthNode) {
    const width = settings.isAudioFxEnabled ? 1 + settings.stereoWidthAmount : 1;
    stereoWidthNode.parameters.get("width")?.setValueAtTime(width, stereoWidthNode.context.currentTime);
  }

  if (roomDryGainNode && roomWetGainNode) {
    const amount = settings.isAudioFxEnabled ? settings.smallSpeakerRoomAmount : 0;
    roomDryGainNode.gain.value = Math.max(0.52, 1 - amount * 0.42);
    roomWetGainNode.gain.value = amount * 0.95;
  }

  if (wowFlutterDelayNode && wowLfoNode && wowLfoGainNode && flutterLfoNode && flutterLfoGainNode) {
    const amount = settings.isAudioFxEnabled ? settings.wowFlutterAmount : 0;
    wowFlutterDelayNode.delayTime.value = 0.006 + amount * 0.004;
    wowLfoNode.frequency.value = 0.18 + amount * 0.42;
    wowLfoGainNode.gain.value = amount * 0.0035;
    flutterLfoNode.frequency.value = 5.2 + amount * 6.5;
    flutterLfoGainNode.gain.value = amount * 0.0009;
  }

  if (noiseGainNode) {
    noiseGainNode.gain.value = settings.isNoiseEnabled
      ? Math.min(0.24, settings.noiseLevel * 5.5)
      : 0;
  }

  if (crackleGainNode) {
    crackleGainNode.gain.value = settings.isNoiseEnabled
      ? Math.min(0.24, settings.vinylDustAmount * 0.22 + settings.noiseLevel * 0.25)
      : 0;
  }

  if (vinylDustBedFilterNode && vinylDustBedGainNode) {
    const amount = settings.isNoiseEnabled ? settings.vinylDustAmount : 0;
    vinylDustBedFilterNode.frequency.value = 2100 + amount * 2600;
    vinylDustBedFilterNode.Q.value = 0.35 + amount * 0.25;
    vinylDustBedGainNode.gain.value = amount * 0.11;
  }
}

export function disposeAudioChain(nodes) {
  const { noiseSourceNode, noiseLfoNode, crackleSourceNode, wowLfoNode, flutterLfoNode } = nodes;
  for (const osc of [noiseSourceNode, noiseLfoNode, crackleSourceNode, wowLfoNode, flutterLfoNode]) {
    try { osc?.stop(); } catch {}
  }
}
