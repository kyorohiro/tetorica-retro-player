import * as Tone from 'tone';

// ============================================================
// UI refs
// ============================================================
const playBtn      = document.getElementById('play-btn')!;
const chordDisplay = document.getElementById('chord-display')!;
const barDisplay   = document.getElementById('bar-display')!;
const stepsEl      = document.getElementById('steps')!;
const bpmSlider    = document.getElementById('bpm-slider') as HTMLInputElement;
const bpmVal       = document.getElementById('bpm-val')!;

// 16-step indicator dots
const stepEls: HTMLElement[] = [];
for (let i = 0; i < 16; i++) {
  const d = document.createElement('div');
  d.className = 'step';
  stepsEl.appendChild(d);
  stepEls.push(d);
}

// ============================================================
// Transport
// ============================================================
Tone.getTransport().bpm.value = 80;
Tone.getTransport().swing = 0.10;
Tone.getTransport().loop = true;
Tone.getTransport().loopStart = 0;
Tone.getTransport().loopEnd = '8m';

// ============================================================
// Master chain  (compressor → destination)
// ============================================================
const comp = new Tone.Compressor({ threshold: -14, ratio: 6, attack: 0.005, release: 0.15 });
comp.toDestination();
const warmFilter = new Tone.Filter({ frequency: 7500, type: 'lowpass', rolloff: -12 });
warmFilter.connect(comp);

// ============================================================
// DRUMS
// ============================================================
const kick = new Tone.MembraneSynth({
  pitchDecay: 0.09, octaves: 6,
  envelope: { attack: 0.001, decay: 0.38, sustain: 0, release: 0.2 },
  volume: -4,
}).toDestination();

const snare = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.05 },
  volume: -8,
}).toDestination();

const hhHpf = new Tone.Filter({ frequency: 9000, type: 'highpass' });
hhHpf.connect(warmFilter);
const hihat = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.01 },
  volume: -20,
}).connect(hhHpf);

const openHpf = new Tone.Filter({ frequency: 7000, type: 'highpass' });
openHpf.connect(warmFilter);
const openhat = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.28, sustain: 0, release: 0.08 },
  volume: -24,
}).connect(openHpf);

const dp = {
  kick:  [1,0,0,0, 0,0,1,0, 0,0,0,1, 0,0,0,0],
  snare: [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
  hhat:  [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
  open:  [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1],
};
const hhV = [0.8,0,0.5,0, 0.7,0,0.5,0, 0.8,0,0.5,0, 0.7,0,0.5,0];

let currentStep = 0;
new Tone.Sequence((time, s) => {
  currentStep = s as number;
  if (dp.kick[s as number])  kick.triggerAttackRelease('C1', '8n', time);
  if (dp.snare[s as number]) snare.triggerAttackRelease('16n', time);
  if (dp.hhat[s as number])  hihat.triggerAttackRelease('32n', time, hhV[s as number]);
  if (dp.open[s as number])  openhat.triggerAttackRelease('8n', time);

  // UI update (schedule on next animation frame to avoid audio thread contention)
  Tone.getDraw().schedule(() => {
    stepEls.forEach((el, i) => {
      el.classList.toggle('active', i === (s as number));
      el.classList.toggle('kick',  i === (s as number) && !!dp.kick[s as number]);
      el.classList.toggle('snare', i === (s as number) && !!dp.snare[s as number]);
    });
  }, time);
}, Array.from({ length: 16 }, (_, i) => i), '16n').start(0);

// ============================================================
// BASS
// ============================================================
const bass = new Tone.MonoSynth({
  oscillator: { type: 'triangle' },
  filter: { Q: 2, type: 'lowpass', rolloff: -24, frequency: 500 },
  envelope: { attack: 0.02, decay: 0.15, sustain: 0.5, release: 0.5 },
  filterEnvelope: {
    attack: 0.05, decay: 0.2, sustain: 0.5, release: 0.5,
    baseFrequency: 200, octaves: 2,
  },
  volume: -12,
}).toDestination();

// ============================================================
// PAD
// ============================================================
const pad = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'sine' },
  envelope: { attack: 0.12, decay: 0.3, sustain: 0.6, release: 0.4 },
  volume: -20,
});
pad.maxPolyphony = 12;
pad.connect(warmFilter);

// ============================================================
// MELODY
// ============================================================
const mel = new Tone.Synth({
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.02, decay: 0.12, sustain: 0.45, release: 0.7 },
  volume: -14,
}).connect(warmFilter);

// ============================================================
// 8-bar chord progression
// ============================================================
const CHORD_NAMES = ['Cmaj7','Em7','Am7','Fmaj7','Cmaj7','Em7','Dm7','G7'];

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
  { time: '0:0:0', pitch: 'C2', dur: '4n' }, { time: '0:2:0', pitch: 'G1', dur: '4n' },
  { time: '1:0:0', pitch: 'E2', dur: '4n' }, { time: '1:2:0', pitch: 'B1', dur: '4n' },
  { time: '2:0:0', pitch: 'A1', dur: '4n' }, { time: '2:2:0', pitch: 'E2', dur: '4n' },
  { time: '3:0:0', pitch: 'F2', dur: '4n' }, { time: '3:2:0', pitch: 'C2', dur: '4n' },
  { time: '4:0:0', pitch: 'C2', dur: '4n' }, { time: '4:2:0', pitch: 'E2', dur: '4n' },
  { time: '5:0:0', pitch: 'E2', dur: '4n' }, { time: '5:2:0', pitch: 'G1', dur: '4n' },
  { time: '6:0:0', pitch: 'D2', dur: '4n' }, { time: '6:2:0', pitch: 'A1', dur: '4n' },
  { time: '7:0:0', pitch: 'G1', dur: '4n' }, { time: '7:2:0', pitch: 'D2', dur: '4n' },
];

const melNotes = [
  { time: '0:0:0', pitch: 'E4', dur: '8n',  vel: 0.7  },
  { time: '0:0:2', pitch: 'G4', dur: '8n',  vel: 0.55 },
  { time: '0:1:0', pitch: 'E4', dur: '4n',  vel: 0.6  },
  { time: '0:2:2', pitch: 'D4', dur: '8n',  vel: 0.5  },
  { time: '0:3:0', pitch: 'C4', dur: '4n',  vel: 0.6  },
  { time: '1:0:0', pitch: 'B4', dur: '8n',  vel: 0.65 },
  { time: '1:0:2', pitch: 'G4', dur: '8n',  vel: 0.5  },
  { time: '1:1:0', pitch: 'B4', dur: '4n',  vel: 0.6  },
  { time: '1:2:2', pitch: 'A4', dur: '4n.', vel: 0.55 },
  { time: '2:0:0', pitch: 'A4', dur: '8n',  vel: 0.7  },
  { time: '2:0:2', pitch: 'G4', dur: '8n',  vel: 0.55 },
  { time: '2:1:0', pitch: 'E4', dur: '4n',  vel: 0.6  },
  { time: '2:2:0', pitch: 'D4', dur: '4n',  vel: 0.5  },
  { time: '2:3:0', pitch: 'E4', dur: '4n',  vel: 0.5  },
  { time: '3:0:0', pitch: 'C4', dur: '8n',  vel: 0.65 },
  { time: '3:0:2', pitch: 'E4', dur: '8n',  vel: 0.55 },
  { time: '3:1:0', pitch: 'C4', dur: '4n',  vel: 0.6  },
  { time: '3:2:2', pitch: 'A3', dur: '4n.', vel: 0.55 },
  { time: '4:0:0', pitch: 'G4', dur: '8n',  vel: 0.7  },
  { time: '4:0:2', pitch: 'E4', dur: '8n',  vel: 0.55 },
  { time: '4:1:0', pitch: 'G4', dur: '4n',  vel: 0.6  },
  { time: '4:2:0', pitch: 'A4', dur: '8n',  vel: 0.6  },
  { time: '4:2:2', pitch: 'G4', dur: '4n',  vel: 0.55 },
  { time: '5:0:0', pitch: 'B4', dur: '4n',  vel: 0.65 },
  { time: '5:1:0', pitch: 'A4', dur: '8n',  vel: 0.55 },
  { time: '5:1:2', pitch: 'G4', dur: '8n',  vel: 0.5  },
  { time: '5:2:0', pitch: 'E4', dur: '2n',  vel: 0.55 },
  { time: '6:0:0', pitch: 'D4', dur: '8n',  vel: 0.65 },
  { time: '6:0:2', pitch: 'E4', dur: '8n',  vel: 0.55 },
  { time: '6:1:0', pitch: 'A4', dur: '4n',  vel: 0.6  },
  { time: '6:2:0', pitch: 'D4', dur: '2n',  vel: 0.6  },
  { time: '7:0:0', pitch: 'D5', dur: '8n',  vel: 0.7  },
  { time: '7:0:2', pitch: 'B4', dur: '8n',  vel: 0.6  },
  { time: '7:1:0', pitch: 'G4', dur: '4n',  vel: 0.6  },
  { time: '7:2:0', pitch: 'D4', dur: '4n',  vel: 0.55 },
  { time: '7:3:0', pitch: 'E4', dur: '4n',  vel: 0.6  },
];

// chord UI update
const chordPart = new Tone.Part((time, ev) => {
  pad.triggerAttackRelease(ev.notes, ev.dur, time, ev.vel);
  const bar = parseInt((ev.time as string).split(':')[0]);
  Tone.getDraw().schedule(() => {
    chordDisplay.textContent = CHORD_NAMES[bar] ?? '—';
    barDisplay.textContent = `bar ${bar + 1} / 8`;
  }, time);
}, chords);
chordPart.start(0);

const bassPart = new Tone.Part((time, ev) => {
  bass.triggerAttackRelease(ev.pitch, ev.dur, time);
}, bassLine);
bassPart.start(0);

const melPart = new Tone.Part((time, ev) => {
  mel.triggerAttackRelease(ev.pitch, ev.dur, time, ev.vel);
}, melNotes);
melPart.start(0);

// ============================================================
// Play / Stop
// ============================================================
let playing = false;

playBtn.addEventListener('click', async () => {
  await Tone.start(); // resume AudioContext (browser requires user gesture)
  if (playing) {
    Tone.getTransport().stop();
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
    chordDisplay.textContent = '—';
    barDisplay.textContent = 'bar — / 8';
    stepEls.forEach(el => el.className = 'step');
  } else {
    Tone.getTransport().start();
    playBtn.textContent = '■';
    playBtn.classList.add('playing');
  }
  playing = !playing;
});

// BPM slider
bpmSlider.addEventListener('input', () => {
  const v = Number(bpmSlider.value);
  Tone.getTransport().bpm.value = v;
  bpmVal.textContent = String(v);
});
