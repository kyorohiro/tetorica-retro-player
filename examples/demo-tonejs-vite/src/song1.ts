import * as Tone from 'tone';

export const META = { name: 'Chill Loop', bpm: 80 };

type StepCb  = (s: number, kick: boolean, snare: boolean) => void;
type ChordCb = (name: string, bar: number) => void;

export function create(onStep: StepCb, onChord: ChordCb): () => void {
  const comp = new Tone.Compressor({ threshold: -14, ratio: 6, attack: 0.005, release: 0.15 });
  comp.toDestination();
  const warm = new Tone.Filter({ frequency: 7500, type: 'lowpass', rolloff: -12 });
  warm.connect(comp);

  // --- drums ---
  const kick = new Tone.MembraneSynth({
    pitchDecay: 0.09, octaves: 6,
    envelope: { attack: 0.001, decay: 0.38, sustain: 0, release: 0.2 }, volume: -4,
  }).toDestination();
  const snare = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.05 }, volume: -8,
  }).toDestination();
  const hhHpf = new Tone.Filter({ frequency: 9000, type: 'highpass' });
  hhHpf.connect(warm);
  const hihat = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.01 }, volume: -20,
  }).connect(hhHpf);
  const openHpf = new Tone.Filter({ frequency: 7000, type: 'highpass' });
  openHpf.connect(warm);
  const openhat = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.28, sustain: 0, release: 0.08 }, volume: -24,
  }).connect(openHpf);

  const dp = {
    kick:  [1,0,0,0, 0,0,1,0, 0,0,0,1, 0,0,0,0],
    snare: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
    hhat:  [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
    open:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1],
  };
  const hhV = [0.8,0,0.5,0, 0.7,0,0.5,0, 0.8,0,0.5,0, 0.7,0,0.5,0];

  const drumSeq = new Tone.Sequence((time, s) => {
    const i = s as number;
    if (dp.kick[i])  kick.triggerAttackRelease('C1', '8n', time);
    if (dp.snare[i]) snare.triggerAttackRelease('16n', time);
    if (dp.hhat[i])  hihat.triggerAttackRelease('32n', time, hhV[i]);
    if (dp.open[i])  openhat.triggerAttackRelease('8n', time);
    Tone.getDraw().schedule(() => onStep(i, !!dp.kick[i], !!dp.snare[i]), time);
  }, Array.from({ length: 16 }, (_, i) => i), '16n').start(0);

  // --- bass (triangle) ---
  const bass = new Tone.MonoSynth({
    oscillator: { type: 'triangle' },
    filter: { Q: 2, type: 'lowpass', rolloff: -24, frequency: 500 },
    envelope: { attack: 0.02, decay: 0.15, sustain: 0.5, release: 0.5 },
    filterEnvelope: { attack: 0.05, decay: 0.2, sustain: 0.5, release: 0.5, baseFrequency: 200, octaves: 2 },
    volume: -12,
  }).toDestination();

  // --- pad (sine PolySynth) ---
  const pad = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.12, decay: 0.3, sustain: 0.6, release: 0.4 }, volume: -20,
  });
  pad.maxPolyphony = 12;
  pad.connect(warm);

  // --- melody (triangle) ---
  const mel = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.02, decay: 0.12, sustain: 0.45, release: 0.7 }, volume: -14,
  }).connect(warm);

  // Cmaj7 Em7 Am7 Fmaj7 Cmaj7 Em7 Dm7 G7
  const NAMES = ['Cmaj7','Em7','Am7','Fmaj7','Cmaj7','Em7','Dm7','G7'];
  const chords = [
    { time: '0:0:0', notes: ['C3','E3','G3','B3'], dur: '1m', vel: 0.35 },
    { time: '1:0:0', notes: ['E3','G3','B3','D4'], dur: '1m', vel: 0.35 },
    { time: '2:0:0', notes: ['A2','C3','E3','G3'], dur: '1m', vel: 0.35 },
    { time: '3:0:0', notes: ['F2','A2','C3','E3'], dur: '1m', vel: 0.35 },
    { time: '4:0:0', notes: ['C3','E3','G3','B3'], dur: '1m', vel: 0.33 },
    { time: '5:0:0', notes: ['E3','G3','B3','D4'], dur: '1m', vel: 0.33 },
    { time: '6:0:0', notes: ['D3','F3','A3','C4'], dur: '1m', vel: 0.35 },
    { time: '7:0:0', notes: ['G2','B2','D3','F3'], dur: '1m', vel: 0.38 },
  ];
  const bassLine = [
    { time: '0:0:0', p: 'C2', d: '4n' }, { time: '0:2:0', p: 'G1', d: '4n' },
    { time: '1:0:0', p: 'E2', d: '4n' }, { time: '1:2:0', p: 'B1', d: '4n' },
    { time: '2:0:0', p: 'A1', d: '4n' }, { time: '2:2:0', p: 'E2', d: '4n' },
    { time: '3:0:0', p: 'F2', d: '4n' }, { time: '3:2:0', p: 'C2', d: '4n' },
    { time: '4:0:0', p: 'C2', d: '4n' }, { time: '4:2:0', p: 'E2', d: '4n' },
    { time: '5:0:0', p: 'E2', d: '4n' }, { time: '5:2:0', p: 'G1', d: '4n' },
    { time: '6:0:0', p: 'D2', d: '4n' }, { time: '6:2:0', p: 'A1', d: '4n' },
    { time: '7:0:0', p: 'G1', d: '4n' }, { time: '7:2:0', p: 'D2', d: '4n' },
  ];
  const melNotes = [
    { time: '0:0:0', n: 'E4', d: '8n',  v: 0.7  }, { time: '0:0:2', n: 'G4', d: '8n',  v: 0.55 },
    { time: '0:1:0', n: 'E4', d: '4n',  v: 0.6  }, { time: '0:2:2', n: 'D4', d: '8n',  v: 0.5  },
    { time: '0:3:0', n: 'C4', d: '4n',  v: 0.6  },
    { time: '1:0:0', n: 'B4', d: '8n',  v: 0.65 }, { time: '1:0:2', n: 'G4', d: '8n',  v: 0.5  },
    { time: '1:1:0', n: 'B4', d: '4n',  v: 0.6  }, { time: '1:2:2', n: 'A4', d: '4n.', v: 0.55 },
    { time: '2:0:0', n: 'A4', d: '8n',  v: 0.7  }, { time: '2:0:2', n: 'G4', d: '8n',  v: 0.55 },
    { time: '2:1:0', n: 'E4', d: '4n',  v: 0.6  }, { time: '2:2:0', n: 'D4', d: '4n',  v: 0.5  },
    { time: '2:3:0', n: 'E4', d: '4n',  v: 0.5  },
    { time: '3:0:0', n: 'C4', d: '8n',  v: 0.65 }, { time: '3:0:2', n: 'E4', d: '8n',  v: 0.55 },
    { time: '3:1:0', n: 'C4', d: '4n',  v: 0.6  }, { time: '3:2:2', n: 'A3', d: '4n.', v: 0.55 },
    { time: '4:0:0', n: 'G4', d: '8n',  v: 0.7  }, { time: '4:0:2', n: 'E4', d: '8n',  v: 0.55 },
    { time: '4:1:0', n: 'G4', d: '4n',  v: 0.6  }, { time: '4:2:0', n: 'A4', d: '8n',  v: 0.6  },
    { time: '4:2:2', n: 'G4', d: '4n',  v: 0.55 },
    { time: '5:0:0', n: 'B4', d: '4n',  v: 0.65 }, { time: '5:1:0', n: 'A4', d: '8n',  v: 0.55 },
    { time: '5:1:2', n: 'G4', d: '8n',  v: 0.5  }, { time: '5:2:0', n: 'E4', d: '2n',  v: 0.55 },
    { time: '6:0:0', n: 'D4', d: '8n',  v: 0.65 }, { time: '6:0:2', n: 'E4', d: '8n',  v: 0.55 },
    { time: '6:1:0', n: 'A4', d: '4n',  v: 0.6  }, { time: '6:2:0', n: 'D4', d: '2n',  v: 0.6  },
    { time: '7:0:0', n: 'D5', d: '8n',  v: 0.7  }, { time: '7:0:2', n: 'B4', d: '8n',  v: 0.6  },
    { time: '7:1:0', n: 'G4', d: '4n',  v: 0.6  }, { time: '7:2:0', n: 'D4', d: '4n',  v: 0.55 },
    { time: '7:3:0', n: 'E4', d: '4n',  v: 0.6  },
  ];

  const cp = new Tone.Part((time, ev) => {
    pad.triggerAttackRelease(ev.notes, ev.dur, time, ev.vel);
    const bar = parseInt((ev.time as string).split(':')[0]);
    Tone.getDraw().schedule(() => onChord(NAMES[bar], bar), time);
  }, chords).start(0);

  const bp = new Tone.Part((time, ev) => {
    bass.triggerAttackRelease(ev.p, ev.d, time);
  }, bassLine).start(0);

  const mp = new Tone.Part((time, ev) => {
    mel.triggerAttackRelease(ev.n, ev.d, time, ev.v);
  }, melNotes).start(0);

  return () => {
    drumSeq.dispose(); cp.dispose(); bp.dispose(); mp.dispose();
    kick.dispose(); snare.dispose(); hihat.dispose(); openhat.dispose();
    bass.dispose(); pad.dispose(); mel.dispose();
    warm.dispose(); comp.dispose(); hhHpf.dispose(); openHpf.dispose();
  };
}
