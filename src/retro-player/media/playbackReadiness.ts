// A play event expresses intent; HLS audio can advance before a video frame
// exists. Do not use paused/currentTime alone to dismiss video loading UI.
export function hasCurrentPlaybackData(media: HTMLMediaElement | null): boolean {
  if (!media || media.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;
  return !(media instanceof HTMLVideoElement) || (media.videoWidth > 0 && media.videoHeight > 0);
}
