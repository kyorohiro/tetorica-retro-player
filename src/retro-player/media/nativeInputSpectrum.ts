// A diagnostic branch only: never attach a MediaElementAudioSource, change
// element volume, or connect to speakers while inspecting native playback.
export function connectNativeInputSpectrum(
  context: AudioContext,
  media: HTMLMediaElement,
  analyser: AnalyserNode | null,
  isHlsManaged: boolean,
): MediaStreamAudioSourceNode | null {
  if (isHlsManaged || !analyser) return null;
  try {
    const capturable = media as HTMLMediaElement & { captureStream?: () => MediaStream };
    const stream = media.srcObject instanceof MediaStream ? media.srcObject : capturable.captureStream?.();
    if (!stream?.getAudioTracks().some(track => track.readyState === "live")) return null;
    const source = context.createMediaStreamSource(stream);
    source.connect(analyser);
    return source;
  } catch {
    // Missing inspection support must not prevent native playback.
    return null;
  }
}
