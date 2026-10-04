import { RetroPreviewError } from "../i18n";
import { Channel, invoke } from "@tauri-apps/api/core";
import { isTauriRuntime } from "../platform/runtime";
import { getDisplayCaptureOptions } from "./displayCaptureOptions";
import { recordCaptureAudioDiagnostic } from "./captureAudioDiagnostics";
import { decodeNativeAudioPacket, nextNativeAudioTime } from "./nativeCaptureProtocol";

const nativeStreams = new WeakMap<MediaStream, string>();

export function getDisplayCaptureLabel(stream: MediaStream, locale: string) {
  if (nativeStreams.has(stream)) {
    return nativeStreams.get(stream) === "system-output"
      ? locale === "ja" ? "Display Capture（Native・システム音声）" : "Display Capture (native, system audio)"
      : locale === "ja" ? "Display Capture（Native・音声入力）" : "Display Capture (native, audio input)";
  }
  return stream.getAudioTracks().length > 0 ? "Display Capture"
    : locale === "ja" ? "Display Capture（音声なし）" : "Display Capture (no audio)";
}

export function canRequestDisplayCapture() {
  return Boolean(navigator.mediaDevices?.getDisplayMedia) ||
    (isTauriRuntime() && /Mac|Windows/i.test(navigator.userAgent));
}

type CaptureTarget = { id: string; title: string; kind: "window" | "display" };
export type NativeCaptureSelection = {
  locale: string;
  select: (options: { title: string; message: string; options: { value: string; label: string; description: string }[]; cancelText: string }) => Promise<string | null>;
};

export async function requestDisplayCapture(selection?: NativeCaptureSelection): Promise<MediaStream> {
  if (isTauriRuntime() && /Mac|Windows/i.test(navigator.userAgent) &&
      await invoke<boolean>("native_capture_available")) {
    if (!selection) throw new Error("Native capture requires a window or display selection.");
    const ja = selection.locale === "ja";
    const windows = /Windows/i.test(navigator.userAgent);
    const targets = await invoke<CaptureTarget[]>("native_capture_targets").catch(error => {
      const permissionRequired = String(error).includes("NATIVE_CAPTURE_PERMISSION_REQUIRED");
      recordCaptureAudioDiagnostic("native-targets-failed", { reason: permissionRequired ? "permission-required" : "target-query-failed" });
      if (permissionRequired) throw new RetroPreviewError("capture-permission-required", "Native capture permission required");
      throw error;
    });
    const targetId = await selection.select({
      title: ja ? "キャプチャーする画面・ウィンドウ" : "Choose a display or window",
      message: windows
        ? ja ? "音声は既定の出力デバイス全体を取得します。他のアプリの音声も含まれます。" : "Audio includes all apps playing through the default output device."
        : ja ? "ウィンドウはそのアプリの音声、画面はシステム音声を取得します。このプレイヤーの出力音声は除外します。" : "Window capture includes application audio; display capture includes system audio. This player's output is excluded.",
      options: targets.map(target => ({
        value: target.id,
        label: target.title || (ja ? "無題のウィンドウ" : "Untitled window"),
        description: target.kind === "display" ? ja ? "画面" : "Display" : ja ? "ウィンドウ" : "Window",
      })),
      cancelText: ja ? "キャンセル" : "Cancel",
    });
    if (!targetId) throw new DOMException("Capture cancelled.", "NotAllowedError");
    return startNativeCapture(targetId, windows ? "system-output" : "application-or-display");
  }
  return navigator.mediaDevices.getDisplayMedia(getDisplayCaptureOptions());
}

async function startNativeCapture(targetId: string, audioScope: string): Promise<MediaStream> {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const drawing = canvas.getContext("2d");
  if (!drawing) throw new Error("Capture canvas could not be created.");
  const audio = new AudioContext({ sampleRate: 48000 });
  const destination = audio.createMediaStreamDestination();
  const stream = canvas.captureStream(30);
  nativeStreams.set(stream, audioScope);
  destination.stream.getAudioTracks().forEach(track => stream.addTrack(track));
  let sessionId: string | null = null;
  let disposed = false;
  let started = false;
  let decoding = false;
  let queuedUntil = 0;
  let acknowledged = 0;
  let lastAudioDiagnostic = -Infinity;
  const scheduledAudio = new Set<AudioBufferSourceNode>();
  let resolveReady!: (stream: MediaStream) => void;
  let rejectReady!: (reason: Error) => void;
  const ready = new Promise<MediaStream>((resolve, reject) => { resolveReady = resolve; rejectReady = reject; });
  // Install a rejection handler while the start command is still pending.
  void ready.catch(() => {});

  const ack = () => {
    if (!sessionId || acknowledged === 0) return;
    const count = acknowledged;
    acknowledged = 0;
    void invoke("native_capture_ack", { sessionId, count }).catch(() => {});
  };
  const ackTimer = window.setInterval(ack, 50);
  const originalStops = stream.getTracks().map(track => track.stop.bind(track));
  const dispose = (notifyEnded: boolean) => {
    if (disposed) return;
    disposed = true;
    if (!started) rejectReady(new Error("Native capture cancelled."));
    window.clearInterval(ackTimer);
    window.removeEventListener("pagehide", onPageHide);
    ack();
    if (sessionId) void invoke("native_capture_stop", { sessionId }).catch(console.error);
    scheduledAudio.forEach(source => { try { source.stop(); } catch {} source.disconnect(); });
    scheduledAudio.clear();
    originalStops.forEach(stop => stop());
    void audio.close().catch(() => {});
    if (notifyEnded) stream.getTracks().forEach(track => track.dispatchEvent(new Event("ended")));
  };
  const onPageHide = () => dispose(false);
  window.addEventListener("pagehide", onPageHide);
  // Existing source cleanup calls track.stop(); recording clones keep their own stop.
  stream.getTracks().forEach(track => { track.stop = () => dispose(false); });

  const packets = new Channel<ArrayBuffer>();
  packets.onmessage = packet => {
    const kind = new Uint8Array(packet)[0];
    if (kind === 1 || kind === 2) acknowledged++;
    if (disposed) return;
    if (kind === 0) {
      recordCaptureAudioDiagnostic("native-started", { videoMaxDimension: 1280, fps: 30, audioScope });
      started = true;
      resolveReady(stream);
    } else if (kind === 3) {
      recordCaptureAudioDiagnostic("native-ended", { beforeReady: !started, hasError: packet.byteLength > 1 });
      const message = new TextDecoder().decode(packet.slice(1));
      if (!started) rejectReady(message.includes("NATIVE_CAPTURE_PERMISSION_REQUIRED")
        ? new RetroPreviewError("capture-permission-required", "Native capture permission required")
        : new Error(message || "Native capture ended before starting."));
      dispose(true);
    } else if (kind === 1 && !decoding) {
      decoding = true;
      void createImageBitmap(new Blob([packet.slice(1)], { type: "image/jpeg" }))
        .then(bitmap => {
          try {
            if (!disposed) {
              if (canvas.width !== bitmap.width || canvas.height !== bitmap.height) {
                canvas.width = bitmap.width;
                canvas.height = bitmap.height;
              }
              drawing.drawImage(bitmap, 0, 0);
            }
          } finally { bitmap.close(); }
        })
        .catch(error => { rejectReady(error); dispose(true); })
        .finally(() => { decoding = false; });
    } else if (kind === 2 && audio.state === "running") {
      try {
        const { sampleRate, channels, samples, frames } = decodeNativeAudioPacket(packet);
        if (audio.currentTime - lastAudioDiagnostic >= 5) {
          let peak = 0;
          for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
          recordCaptureAudioDiagnostic("native-audio", { sampleRate, channels, frames, peak });
          lastAudioDiagnostic = audio.currentTime;
        }
        const buffer = audio.createBuffer(channels, frames, sampleRate);
        for (let channel = 0; channel < channels; channel++) {
          const output = buffer.getChannelData(channel);
          for (let frame = 0; frame < frames; frame++) output[frame] = samples[frame * channels + channel];
        }
        if (queuedUntil > audio.currentTime + 0.25) {
          scheduledAudio.forEach(source => { try { source.stop(); } catch {} source.disconnect(); });
          scheduledAudio.clear();
        }
        const source = audio.createBufferSource();
        source.buffer = buffer;
        // This feeds only the shared stream. The player controls monitoring/FX.
        source.connect(destination);
        scheduledAudio.add(source);
        source.onended = () => { scheduledAudio.delete(source); source.disconnect(); };
        const at = nextNativeAudioTime(audio.currentTime, queuedUntil);
        source.start(at);
        queuedUntil = at + buffer.duration;
      } catch (error) {
        rejectReady(error instanceof Error ? error : new Error(String(error)));
        dispose(true);
      }
    }
  };
  try {
    await audio.resume();
    if (audio.state !== "running") throw new Error("Audio capture could not start. Try the capture button again.");
    sessionId = await invoke<string>("native_capture_start", { targetId, packets });
    if (disposed) await invoke("native_capture_stop", { sessionId });
    const result = await ready;
    if (disposed) throw new Error("Native capture ended before the preview was ready.");
    return result;
  } catch (error) {
    dispose(false);
    throw error;
  }
}
