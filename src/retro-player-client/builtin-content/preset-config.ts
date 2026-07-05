export type PresetConfig =
  | { type: 'lofi' }
  | { type: 'demo-song'; songId: string }
  | { type: 'colorbars-video' }
  | { type: 'colorbars-image' }
  | { type: 'url'; url: string; label: string };

const STORAGE_KEY = 'tetorica:startup-preset';

export function loadStartupPreset(): PresetConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { type: 'lofi' };
    return JSON.parse(raw) as PresetConfig;
  } catch { return { type: 'lofi' }; }
}

export function saveStartupPreset(config: PresetConfig): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch {}
}
