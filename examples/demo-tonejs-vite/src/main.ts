import * as Tone from 'tone';
import * as Song1 from './song1';
import * as Song2 from './song2';
import * as Song3 from './song3';
import * as Song4 from './song4';
import * as Song5 from './song5';
import * as Song6 from './song6';
import * as Song7  from './song7';
import * as Song8  from './song8';
import * as Song9  from './song9';
import * as Song10 from './song10';
import * as Song11 from './song11';
import * as Song12 from './song12';

// ============================================================
// UI refs
// ============================================================
const playBtn      = document.getElementById('play-btn')!;
const chordDisplay = document.getElementById('chord-display')!;
const barDisplay   = document.getElementById('bar-display')!;
const stepsEl      = document.getElementById('steps')!;
const bpmSlider    = document.getElementById('bpm-slider') as HTMLInputElement;
const bpmVal       = document.getElementById('bpm-val')!;
const songBtns     = document.querySelectorAll<HTMLButtonElement>('.song-btn');

// 16-step indicator dots
const stepEls: HTMLElement[] = [];
for (let i = 0; i < 16; i++) {
  const d = document.createElement('div');
  d.className = 'step';
  stepsEl.appendChild(d);
  stepEls.push(d);
}

// ============================================================
// Song registry
// ============================================================
const SONGS = [
  { meta: Song1.META, create: Song1.create },
  { meta: Song2.META, create: Song2.create },
  { meta: Song3.META, create: Song3.create },
  { meta: Song4.META, create: Song4.create },
  { meta: Song5.META, create: Song5.create },
  { meta: Song6.META, create: Song6.create },
  { meta: Song7.META,  create: Song7.create  },
  { meta: Song8.META,  create: Song8.create  },
  { meta: Song9.META,  create: Song9.create  },
  { meta: Song10.META, create: Song10.create },
  { meta: Song11.META, create: Song11.create },
  { meta: Song12.META, create: Song12.create },
];

// ============================================================
// State
// ============================================================
let playing     = false;
let songIndex   = 0;
let disposeSong: (() => void) | null = null;

// ============================================================
// Transport
// ============================================================
Tone.getTransport().loop      = true;
Tone.getTransport().loopStart = 0;
Tone.getTransport().loopEnd   = '8m';

// ============================================================
// UI callbacks from song modules
// ============================================================
function onStep(s: number, kick: boolean, snare: boolean) {
  stepEls.forEach((el, i) => {
    el.classList.toggle('active', i === s);
    el.classList.toggle('kick',   i === s && kick);
    el.classList.toggle('snare',  i === s && snare);
  });
}

function onChord(name: string, bar: number) {
  chordDisplay.textContent = name;
  barDisplay.textContent   = `bar ${bar + 1} / 8`;
}

// ============================================================
// Song switching
// ============================================================
function loadSong(idx: number) {
  const wasPlaying = playing;

  if (playing) {
    Tone.getTransport().stop();
    playing = false;
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
  }

  disposeSong?.();
  disposeSong = null;
  Tone.getTransport().position = 0;

  songIndex = idx;
  const song = SONGS[idx];
  Tone.getTransport().bpm.value = song.meta.bpm;
  bpmSlider.value    = String(song.meta.bpm);
  bpmSlider.min      = String(Math.max(40, song.meta.bpm - 40));
  bpmSlider.max      = String(song.meta.bpm + 40);
  bpmVal.textContent = String(song.meta.bpm);

  disposeSong = song.create(onStep, onChord);

  chordDisplay.textContent = '—';
  barDisplay.textContent   = 'bar — / 8';
  stepEls.forEach(el => (el.className = 'step'));
  songBtns.forEach((btn, i) => btn.classList.toggle('active', i === idx));

  if (wasPlaying) {
    Tone.getTransport().start();
    playing = true;
    playBtn.textContent = '■';
    playBtn.classList.add('playing');
  }
}

// ============================================================
// Play / Stop
// ============================================================
playBtn.addEventListener('click', async () => {
  await Tone.start();

  if (!disposeSong) {
    disposeSong = SONGS[songIndex].create(onStep, onChord);
  }

  if (playing) {
    Tone.getTransport().stop();
    Tone.getTransport().position = 0;
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
    chordDisplay.textContent = '—';
    barDisplay.textContent   = 'bar — / 8';
    stepEls.forEach(el => (el.className = 'step'));
  } else {
    Tone.getTransport().start();
    playBtn.textContent = '■';
    playBtn.classList.add('playing');
  }
  playing = !playing;
});

// Song select buttons
songBtns.forEach((btn, i) => {
  btn.addEventListener('click', async () => {
    await Tone.start();
    loadSong(i);
  });
});

// BPM slider
bpmSlider.addEventListener('input', () => {
  const v = Number(bpmSlider.value);
  Tone.getTransport().bpm.value = v;
  bpmVal.textContent = String(v);
});

// Initial highlight
songBtns[0]?.classList.add('active');
