import { Channel, invoke } from "@tauri-apps/api/core";
import { save } from "@tauri-apps/plugin-dialog";
import { selectNativeCaptureTarget, type NativeCaptureSelection } from "./nativeDisplayCapture";
import { recordCaptureAudioDiagnostic } from "./captureAudioDiagnostics";
export type NativeFfmpegEvent = { stage: "selected" | "started" | "preview" | "saved" | "failed"; message?: string; hardware?: boolean; targetTitle?: string; destination?: string; image?: number[] };
const sessions = new Set<string>();
export function stopNativeFfmpegCapture(id?: string) {
  if (id && sessions.has(id)) { sessions.delete(id); void invoke("native_ffmpeg_capture_stop", { sessionId: id }).catch(console.error); }
}
export async function startNativeFfmpegCapture(selection: NativeCaptureSelection, onEvent: (event: NativeFfmpegEvent) => void) {
  let targetTitle = "";
  const targetId = await selectNativeCaptureTarget({ ...selection, onSelected: target => { targetTitle = target.title; } }, true);
  const destination = await save({
    title: selection.locale === "ja" ? "加工前の映像・音声をMP4に保存" : "Save original video/audio to MP4",
    defaultPath: `capture-${new Date().toISOString().replace(/[:.]/g, "-")}.mp4`,
    filters: [{ name: "MP4", extensions: ["mp4"] }],
  });
  if (!destination) return null;
  onEvent({ stage: "selected", targetTitle, destination });
  const events = new Channel<NativeFfmpegEvent>();
  let sessionId: string | undefined;
  let ended = false;
  events.onmessage = event => {
    if (event.stage === "saved" || event.stage === "failed") { ended = true; if (sessionId) sessions.delete(sessionId); }
    if (event.stage !== "preview") recordCaptureAudioDiagnostic(`ffmpeg-${event.stage}`, { hardware: event.hardware });
    onEvent(event);
  };
  const result = await invoke<{ sessionId: string }>("native_ffmpeg_capture_start", { targetId, destination, events });
  sessionId = result.sessionId;
  if (!ended) sessions.add(result.sessionId);
  return result.sessionId;
}
window.addEventListener("pagehide", () => { for (const id of sessions) stopNativeFfmpegCapture(id); });

export type NativeRecordingProgress = { elapsedMs: number; bytes: number };
export function getNativeRecordingProgress(sessionId: string) {
  return invoke<NativeRecordingProgress | null>("native_ffmpeg_capture_progress", { sessionId });
}
