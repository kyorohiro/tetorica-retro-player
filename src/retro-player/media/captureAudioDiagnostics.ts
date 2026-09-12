import { isTauriRuntime } from "../platform/runtime";

export const describeAudioTracks = (tracks: MediaStreamTrack[]) => tracks.map(track => ({
  readyState: track.readyState,
  enabled: track.enabled,
  muted: track.muted,
  sampleRate: track.getSettings().sampleRate ?? null,
  channelCount: track.getSettings().channelCount ?? null,
}));

// Bounded, event-only snapshots: no audio samples, device labels or window titles.
export function recordCaptureAudioDiagnostic(stage: string, details: Record<string, unknown>) {
  const entry = { stage, runtime: isTauriRuntime() ? "tauri" : "browser", time: new Date().toISOString(), ...details };
  const target = window as typeof window & { __RETRO_CAPTURE_AUDIO__?: unknown[] };
  const entries = target.__RETRO_CAPTURE_AUDIO__ ?? [];
  entries.push(entry);
  target.__RETRO_CAPTURE_AUDIO__ = entries.slice(-20);
  console.info("[retro capture audio]", JSON.stringify(entry));
}
