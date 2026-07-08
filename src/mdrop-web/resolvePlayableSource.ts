import type { SharedFileInfo } from "./tauri";
import { isAudio, isVideoExtended } from "./utils";
import type { FfmpegStreamingMode } from "./ffmpegPreference";

const canTranscode = (f: Pick<SharedFileInfo, "isDir" | "path">) =>
  !f.isDir && (isVideoExtended(f.path) || isAudio(f.path));

export const toHlsUrl = (shared: Pick<SharedFileInfo, "id" | "url">) =>
  `${new URL(shared.url).origin}/hls/${shared.id}/index.m3u8`;

export const toAudioHlsUrl = (shared: Pick<SharedFileInfo, "id" | "url">) =>
  `${new URL(shared.url).origin}/audio-hls/${shared.id}/index.m3u8`;

// A shared mDrop file plays back at its direct URL, unless ffmpeg streaming
// is enabled and the file is actually transcodable (video/audio) — images
// and directories are never rewritten to an HLS url. Centralizing this
// avoids re-deriving the "origin + /hls/{id}/index.m3u8" convention at
// every call site that shares a file.
export function resolvePlayableUrl(
  shared: Pick<SharedFileInfo, "id" | "url" | "isDir" | "path">,
  useFfmpeg: boolean,
  mode: FfmpegStreamingMode = "video",
): string {
  if (!(useFfmpeg && canTranscode(shared))) {
    return shared.url;
  }
  return mode === "audio" ? toAudioHlsUrl(shared) : toHlsUrl(shared);
}
