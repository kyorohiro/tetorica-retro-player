// Lo-fi Chill engine — D minor, 72 BPM, boom bap drums + piano pad + bass
// Outputs to MediaStream so the Retro Player's audio chain can process it.
import * as Tone from 'tone';

export interface LofiSession {
  stream: MediaStream;
  dispose: () => void;
}

export async function startLofiSession(): Promise<LofiSession> {
  // Do NOT call Tone.start() here — on Safari without a user gesture the promise
  // may never settle (neither resolve nor reject), hanging the entire function.
  // The caller is responsible for calling Tone.start() on the first user gesture.
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  Tone.getTransport().bpm.value = 72;

  const ctx = Tone.getContext().rawContext as AudioContext;
  const streamDest = ctx.createMediaStreamDestination();

  // Final bus — everything connects here instead of toDestination()
  const master = new Tone.Gain(0.85);
  master.output.connect(streamDest);

  const comp = new Tone.Compressor({ threshold: -14, ratio: 4, attack: 0.005, release: 0.25 });
  comp.connect(master);

  const warm = new Tone.Filter({ frequency: 7000, type: 'lowpass', rolloff: -12 });
  warm.connect(comp);

  // --- Drums: boom bap (kick 1 & "and of 3", snare 2 & 4) ---
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.1, octaves: 6,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.2 }, volume: -4,
  });
  kick.connect(comp);

  const snare = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: { attack: 0.003, decay: 0.22, sustain: 0, release: 0.1 }, volume: -10,
  });
  snare.connect(comp);

  const hhFilter = new Tone.Filter({ frequency: 8000, type: 'highpass' });
  hhFilter.connect(warm);
  const hihat = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.07, sustain: 0, release: 0.02 }, volume: -24,
  });
  hihat.connect(hhFilter);

  const drumPattern = {
    kick:  [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],
    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    hhat:  [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
  };

  const drumSeq = new Tone.Sequence((time, i) => {
    const idx = i as number;
    const humanize = (Math.random() - 0.5) * 0.008;
    if (drumPattern.kick[idx])  kick.triggerAttackRelease('C1', '8n', time + humanize);
    if (drumPattern.snare[idx]) snare.triggerAttackRelease('16n', time + humanize);
    if (drumPattern.hhat[idx])  hihat.triggerAttackRelease('32n', time + humanize, 0.4 + Math.random() * 0.3);
  }, Array.from({ length: 16 }, (_, i) => i), '16n').start(0);

  // --- Bass: FMSynth sub-bass ---
  const bass = new Tone.FMSynth({
    harmonicity: 0.5, modulationIndex: 2,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.6, release: 0.5 },
    modulation: { type: 'triangle' },
    modulationEnvelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 0.4 },
    volume: -12,
  });
  bass.connect(comp);

  const bassNotes = [
    { time: '0:0', note: 'D2', dur: '4n' },
    { time: '0:2', note: 'D2', dur: '8n' },
    { time: '1:0', note: 'F2', dur: '4n' },
    { time: '1:2', note: 'F2', dur: '8n' },
    { time: '2:0', note: 'G2', dur: '4n' },
    { time: '2:2', note: 'G2', dur: '8n' },
    { time: '3:0', note: 'A2', dur: '4n' },
    { time: '3:2', note: 'A2', dur: '8n' },
  ];
  const bassPart = new Tone.Part((time, ev) => {
    const h = (Math.random() - 0.5) * 0.012;
    bass.triggerAttackRelease(ev.note, ev.dur, time + h, 0.7 + Math.random() * 0.2);
  }, bassNotes);
  bassPart.loop = true;
  bassPart.loopEnd = '4m';
  bassPart.start(0);

  // --- Piano pad: PolySynth triangle + reverb + delay ---
  // Don't await padReverb.ready — on Safari without a user gesture, OfflineAudioContext
  // may reject, causing startLofiSession() to throw before the stream is ever set.
  // The reverb node is connected immediately; it plays dry until the IR is ready.
  const padReverb = new Tone.Reverb({ decay: 2.5, preDelay: 0.02 });
  padReverb.connect(comp);
  padReverb.ready.catch(() => {});

  const padDelay = new Tone.FeedbackDelay({ delayTime: '8n', feedback: 0.25, wet: 0.3 });
  padDelay.connect(padReverb);

  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.08, decay: 0.3, sustain: 0.55, release: 1.8 },
    volume: -18,
  });
  pad.maxPolyphony = 8;
  pad.connect(padDelay);

  // Dm7 → Fmaj7 → Gmaj7 → Am7
  const chords = [
    { time: '0:0', notes: ['D3','F3','A3','C4'] },
    { time: '1:0', notes: ['F3','A3','C4','E4'] },
    { time: '2:0', notes: ['G3','B3','D4','F4'] },
    { time: '3:0', notes: ['A3','C4','E4','G4'] },
  ];
  const padPart = new Tone.Part((time, ev) => {
    const h = (Math.random() - 0.5) * 0.018;
    // Strum: each note slightly offset
    ev.notes.forEach((note: string, i: number) => {
      pad.triggerAttackRelease(note, '2n', time + h + i * 0.018, 0.5 + Math.random() * 0.15);
    });
  }, chords);
  padPart.loop = true;
  padPart.loopEnd = '4m';
  padPart.start(0);

  return {
    stream: streamDest.stream,
    dispose: () => {
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
      drumSeq.dispose();
      bassPart.dispose();
      padPart.dispose();
      kick.dispose(); snare.dispose(); hihat.dispose(); hhFilter.dispose();
      bass.dispose();
      pad.dispose(); padDelay.dispose(); padReverb.dispose();
      warm.dispose(); comp.dispose(); master.dispose();
    },
  };
}
