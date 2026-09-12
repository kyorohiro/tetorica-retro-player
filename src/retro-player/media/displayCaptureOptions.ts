// A hint to offer the selected window's audio; sharing still requires the
// user's choice in the browser dialog. Unsupported hints can be ignored.
export const getDisplayCaptureOptions = (): DisplayMediaStreamOptions & { windowAudio: "window" } => ({
  video: true,
  audio: true,
  windowAudio: "window",
});
