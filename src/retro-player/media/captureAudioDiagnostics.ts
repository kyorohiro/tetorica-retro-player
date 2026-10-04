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
  target.__RETRO_CAPTURE_AUDIO__ = entries.slice(-120);
  console.info("[retro capture audio]", JSON.stringify(entry));
}

export function downloadCaptureAudioDiagnostics() {
  const target = window as typeof window & { __RETRO_CAPTURE_AUDIO__?: unknown[] };
  const report = {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    events: target.__RETRO_CAPTURE_AUDIO__ ?? [],
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `capture-diagnostics-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
