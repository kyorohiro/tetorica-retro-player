// Registry of demo songs. Each song is a standalone copy under ./songs,
// forked from examples/demo-tonejs-vite so the two can evolve independently.
// Loaded lazily via dynamic import when the user selects [More]

export interface DemoSongMeta {
  id: string;
  name: string;
  bpm: number;
  load: () => Promise<{ create: (onStep: (s: number, kick: boolean, snare: boolean) => void, onChord: (name: string, bar: number) => void) => () => void }>;
}

export const DEMO_SONGS: DemoSongMeta[] = [
  { id: 'song1',  name: 'Chill Loop',       bpm: 80,  load: () => import('./songs/song1') },
  { id: 'song2',  name: 'Rain Window',      bpm: 75,  load: () => import('./songs/song2') },
  { id: 'song3',  name: 'Midnight Keys',    bpm: 88,  load: () => import('./songs/song3') },
  { id: 'song4',  name: 'Duo Dusk',         bpm: 82,  load: () => import('./songs/song4') },
  { id: 'song5',  name: '8bit Blues',       bpm: 78,  load: () => import('./songs/song5') },
  { id: 'song6',  name: 'Dark Orbit',       bpm: 76,  load: () => import('./songs/song6') },
  { id: 'song7',  name: 'Jazz Wah',         bpm: 85,  load: () => import('./songs/song7') },
  { id: 'song8',  name: 'Rock Edge',        bpm: 90,  load: () => import('./songs/song8') },
  { id: 'song9',  name: 'Tremolo Sky',      bpm: 72,  load: () => import('./songs/song9') },
  { id: 'song10', name: 'Neon Funk',        bpm: 95,  load: () => import('./songs/song10') },
  { id: 'song11', name: 'Shimmer',          bpm: 78,  load: () => import('./songs/song11') },
  { id: 'song12', name: 'Lofi Tape',        bpm: 70,  load: () => import('./songs/song12') },
  { id: 'song13', name: 'Starlight',        bpm: 130, load: () => import('./songs/song13') },
  { id: 'song14', name: 'Jazz Night',       bpm: 92,  load: () => import('./songs/song14') },
  { id: 'song15', name: 'Hero Call',        bpm: 148, load: () => import('./songs/song15') },
  { id: 'song16', name: 'City Glow',        bpm: 108, load: () => import('./songs/song16') },
  { id: 'song17', name: 'Canon Light',      bpm: 66,  load: () => import('./songs/song17') },
  { id: 'song18', name: 'Ipanema Nights',   bpm: 88,  load: () => import('./songs/song18') },
  { id: 'song19', name: 'One Drop',         bpm: 80,  load: () => import('./songs/song19') },
  { id: 'song20', name: 'Rio Beat',         bpm: 120, load: () => import('./songs/song20') },
  { id: 'song21', name: 'Cold Synth',       bpm: 126, load: () => import('./songs/song21') },
  { id: 'song22', name: 'Amen Wave',        bpm: 170, load: () => import('./songs/song22') },
  { id: 'song23', name: 'Starfield',        bpm: 60,  load: () => import('./songs/song23') },
  { id: 'song24', name: 'House Drive',      bpm: 128, load: () => import('./songs/song24') },
  { id: 'song25', name: 'Trap Night',       bpm: 72,  load: () => import('./songs/song25') },
  { id: 'song26', name: 'Groove Machine',   bpm: 118, load: () => import('./songs/song26') },
  { id: 'song27', name: 'Flamenco Fuego',   bpm: 155, load: () => import('./songs/song27') },
  { id: 'song28', name: 'Spain Nights',     bpm: 138, load: () => import('./songs/song28') },
  { id: 'song29', name: 'Seven Pulse',      bpm: 132, load: () => import('./songs/song29') },
  { id: 'song30', name: 'Poly Groove',      bpm: 92,  load: () => import('./songs/song30') },
  { id: 'song31', name: 'Soul Groove',      bpm: 72,  load: () => import('./songs/song31') },
  { id: 'song32', name: 'Praise Song',      bpm: 84,  load: () => import('./songs/song32') },
  { id: 'song33', name: 'Neon Seoul',       bpm: 120, load: () => import('./songs/song33') },
  { id: 'song34', name: 'Fusion Five',      bpm: 138, load: () => import('./songs/song34') },
  { id: 'song35', name: 'Misty Glen',       bpm: 96,  load: () => import('./songs/song35') },
];
