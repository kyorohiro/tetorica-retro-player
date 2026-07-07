export type PresetConfig =
  | { type: 'lofi' }
  | { type: 'demo-song'; songId: string }
  | { type: 'colorbars-video' }
  | { type: 'colorbars-image' }
  | { type: 'url'; url: string; label: string };

const STORAGE_KEY = 'tetorica:startup-preset';

const isLoopbackHost = (hostname: string) =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

const isTransientLocalMdropUrl = (value: string) => {
  try {
    const url = new URL(value);
    if (!isLoopbackHost(url.hostname)) {
      return false;
    }
    return /^\/(?:hls(?:-sub)?|download)(?:\/|$)/.test(url.pathname);
  } catch {
    return false;
  }
};

export const shouldPersistStartupPresetUrl = (value: string) =>
  /^https?:\/\//i.test(value) && !isTransientLocalMdropUrl(value);

export function loadStartupPreset(): PresetConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { type: 'lofi' };
    const parsed = JSON.parse(raw) as PresetConfig;
    if (parsed.type === "url" && isTransientLocalMdropUrl(parsed.url)) {
      localStorage.removeItem(STORAGE_KEY);
      return { type: "lofi" };
    }
    return parsed;
  } catch { return { type: 'lofi' }; }
}

export function saveStartupPreset(config: PresetConfig): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch {}
}
