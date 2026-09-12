// A hint to offer the selected window's audio; sharing still requires the
// user's choice in the browser dialog. Unsupported hints can be ignored.
export const getDisplayCaptureOptions = (): DisplayMediaStreamOptions & { windowAudio: "window" } => ({
  video: true,
  audio: true,
  windowAudio: "window",
});

const displayCaptureStreams = new WeakSet<MediaStream>();
export const markDisplayCaptureStream = (stream: MediaStream) => {
  displayCaptureStreams.add(stream);
};
export const isDisplayCaptureStream = (value: unknown): value is MediaStream => {
  const stream = value as MediaStream | null;
  return !!stream && typeof stream.getVideoTracks === "function" && (
    displayCaptureStreams.has(stream) || stream.getVideoTracks().some(track =>
      Boolean(track.getSettings().displaySurface))
  );
};
