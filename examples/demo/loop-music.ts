import 'web-audio-api/polyfill';
const Tone = await import('tone');

const audioCtx = new AudioContext();
Tone.setContext(audioCtx);
await Tone.start();

// Chill lo-fi half-time groove  80 BPM
Tone.getTransport().bpm.value = 80;
Tone.getTransport().swing = 0.12;

// --- Instruments ---

const kick = new Tone.MembraneSynth({
  pitchDecay: 0.09,
  octaves: 6,
  envelope: { attack: 0.001, decay: 0.38, sustain: 0, release: 0.2 },
  volume: -4,
}).toDestination();

const snare = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.05 },
  volume: -8,
}).toDestination();

// Hi-hat: NoiseSynth + highpass filter (MetalSynth は Node.js で retrigger エラーになる)
const hhFilter = new Tone.Filter({ frequency: 9000, type: 'highpass' });
hhFilter.toDestination();
const hihat = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.01 },
  volume: -18,
}).connect(hhFilter);

const openFilter = new Tone.Filter({ frequency: 7000, type: 'highpass' });
openFilter.toDestination();
const openhat = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.08 },
  volume: -22,
}).connect(openFilter);

const rimFilter = new Tone.Filter({ frequency: 5000, type: 'bandpass' });
rimFilter.toDestination();
const rim = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.02 },
  volume: -24,
}).connect(rimFilter);

// --- 16-step pattern (1 bar, 4/4, 16th notes) ---
//
// beat:   1           2           3           4
// step:   0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
// kick:   x  .  .  .  .  .  x  .  .  .  .  x  .  .  .  .
// snare:  .  .  .  .  .  .  .  .  x  .  .  .  .  .  .  .   half-time (beat 3)
// hihat:  x  .  x  .  x  .  x  .  x  .  x  .  x  .  x  .  8th notes
// open:   .  .  .  .  .  .  .  x  .  .  .  .  .  .  .  x   before snare & 4
// rim:    .  .  .  .  x  .  .  .  .  .  .  .  x  .  x  .   ghost notes

const pat = {
  kick:    [1,0,0,0, 0,0,1,0, 0,0,0,1, 0,0,0,0],
  snare:   [0,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
  hihat:   [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
  openhat: [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,1],
  rim:     [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,1,0],
};

const hhVel = [0.8,0,0.5,0, 0.7,0,0.5,0, 0.8,0,0.5,0, 0.7,0,0.5,0];

let step = 0;
const loop = new Tone.Sequence(
  (time) => {
    const s = step % 16;

    if (pat.kick[s])    kick.triggerAttackRelease('C1', '8n', time);
    if (pat.snare[s])   snare.triggerAttackRelease('16n', time);
    if (pat.hihat[s])   hihat.triggerAttackRelease('32n', time, hhVel[s]);
    if (pat.openhat[s]) openhat.triggerAttackRelease('8n', time);
    if (pat.rim[s])     rim.triggerAttackRelease('32n', time, 0.5);

    step++;
  },
  Array.from({ length: 16 }, (_, i) => i),
  '16n',
);

loop.start(0);
Tone.getTransport().start();

console.log('🥁 Chill drum loop — 80 BPM, half-time groove (Ctrl+C to stop)');

await new Promise(() => {});

