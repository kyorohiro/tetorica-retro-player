import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadStartupPreset, saveStartupPreset } from './preset-config';

beforeEach(() => {
  // Node 25 also exposes localStorage; isolate browser persistence from it.
  const values = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  });
});
afterEach(() => vi.unstubAllGlobals());

describe('startup media after removing Tone.js', () => {
  it('defaults to a still image without synthetic audio', () => {
    expect(loadStartupPreset()).toEqual({ type: 'colorbars-image' });
  });

  it.each([{ type: 'lofi' }, { type: 'demo-song', songId: 'song1' }])(
    'migrates a removed built-in music setting: %j', preset => {
      localStorage.setItem('tetorica:startup-preset', JSON.stringify(preset));
      expect(loadStartupPreset()).toEqual({ type: 'colorbars-image' });
      expect(localStorage.getItem('tetorica:startup-preset')).toBeNull();
    },
  );

  it.each([
    { type: 'colorbars-video' } as const,
    { type: 'colorbars-image' } as const,
    { type: 'url', url: 'https://example.com/video.mp4', label: 'Video' } as const,
  ])('restores supported media: %j', preset => {
    saveStartupPreset(preset);
    expect(loadStartupPreset()).toEqual(preset);
  });

  it('discards expired local ffmpeg sessions', () => {
    saveStartupPreset({ type: 'url', url: 'http://localhost:8080/hls/session/video.m3u8', label: 'Video' });
    expect(loadStartupPreset()).toEqual({ type: 'colorbars-image' });
  });

  it.each(['null', 'broken json', '{"type":"unknown"}'])(
    'recovers from invalid saved data: %s', raw => {
      localStorage.setItem('tetorica:startup-preset', raw);
      expect(loadStartupPreset()).toEqual({ type: 'colorbars-image' });
    },
  );
});
