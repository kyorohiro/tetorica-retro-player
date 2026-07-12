import type { TargetFile } from "./api";
import { getFiles } from "./api";
import type { FfmpegStreamingMode } from "./ffmpegPreference";
import { downloadUrl } from "./usePreviewDialog";
import { isAudio, isImage, isVideoExtended } from "./utils";

type SharedFolderLike = {
  id: string;
  path: string;
  url: string;
  isDir: boolean;
};

type PlaylistItem = {
  url: string;
  path: string;
};

type ResolveOptions = {
  entries: SharedFolderLike[];
  useFfmpeg: boolean;
  ffmpegMode: FfmpegStreamingMode;
  maxFiles?: number;
};

const collator = new Intl.Collator("ja", {
  numeric: true,
  sensitivity: "base",
});

const compareComicPath = (a: string, b: string) => collator.compare(a, b);

const isPlayableMediaPath = (path: string) =>
  isImage(path) || isAudio(path) || isVideoExtended(path);

const hlsSubUrl = (apiServer: string, folderId: string, file: TargetFile): string => {
  const subpath = file.path.startsWith("/") ? file.path.slice(1) : file.path;
  return `${apiServer}/hls-sub/${encodeURIComponent(folderId)}/index.m3u8?subpath=${encodeURIComponent(subpath)}`;
};

const audioSubUrl = (apiServer: string, folderId: string, file: TargetFile): string => {
  const subpath = file.path.startsWith("/") ? file.path.slice(1) : file.path;
  return `${apiServer}/audio-hls-sub/${encodeURIComponent(folderId)}/index.m3u8?subpath=${encodeURIComponent(subpath)}`;
};

const playlistUrlForFolderFile = (
  apiServer: string,
  folderId: string,
  file: TargetFile,
  useFfmpeg: boolean,
  ffmpegMode: FfmpegStreamingMode,
) => {
  if (useFfmpeg && (isVideoExtended(file.path) || isAudio(file.path))) {
    return ffmpegMode === "audio"
      ? audioSubUrl(apiServer, folderId, file)
      : hlsSubUrl(apiServer, folderId, file);
  }
  return downloadUrl(apiServer, file);
};

const walkFolder = async (
  entry: SharedFolderLike,
  useFfmpeg: boolean,
  ffmpegMode: FfmpegStreamingMode,
  maxFiles: number,
): Promise<PlaylistItem[] | null> => {
  const apiServer = new URL(entry.url).origin;
  const playlistItems: PlaylistItem[] = [];
  const queue: string[] = ["/"];

  while (queue.length > 0) {
    const currentPath = queue.shift() ?? "/";
    const files = await getFiles(entry.id, currentPath);
    const sortedFiles = [...files].sort((a, b) => compareComicPath(a.path, b.path));

    for (const file of sortedFiles) {
      if (file.isDir) {
        queue.push(file.path);
        continue;
      }

      if (!isPlayableMediaPath(file.path)) {
        return null;
      }

      playlistItems.push({
        url: playlistUrlForFolderFile(apiServer, entry.id, file, useFfmpeg, ffmpegMode),
        path: `${entry.path.replace(/\/+$/, "")}/${file.path.replace(/^\/+/, "")}`,
      });

      if (playlistItems.length > maxFiles) {
        return null;
      }
    }
  }

  return playlistItems;
};

export const resolveSharedFolderPlaylistItems = async ({
  entries,
  useFfmpeg,
  ffmpegMode,
  maxFiles = 2000,
}: ResolveOptions): Promise<PlaylistItem[] | null> => {
  const playlistItems: PlaylistItem[] = [];

  for (const entry of entries) {
    if (!entry.isDir) {
      if (!isPlayableMediaPath(entry.path)) {
        return null;
      }
      playlistItems.push({ url: entry.url, path: entry.path });
      continue;
    }

    const folderItems = await walkFolder(entry, useFfmpeg, ffmpegMode, maxFiles);
    if (!folderItems || folderItems.length === 0) {
      return null;
    }
    playlistItems.push(...folderItems);

    if (playlistItems.length > maxFiles) {
      return null;
    }
  }

  return playlistItems.sort((a, b) => compareComicPath(a.path, b.path));
};
