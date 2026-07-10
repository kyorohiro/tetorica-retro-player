import type { FileTargetFile } from "./api";
import {
  isAudio,
  isBrowserPlayableVideo,
  isImage,
  isVideo,
  isVideoExtended,
  type FileWithRelativePath,
} from "./utils";

export type LoopMode = "one" | "autoplay" | "all" | "off";

export type SharedDropItem = {
  url: string;
  path: string;
  isDir: boolean;
};

const isPlaylistLoopMode = (loopMode: LoopMode) =>
  loopMode === "autoplay" || loopMode === "all";

export const isDirectRetroFile = (file: File) =>
  isImage(file.name) || isBrowserPlayableVideo(file.name) || isAudio(file.name);

export const normalizeBrowserFiles = (files: FileList | File[]) =>
  Array.from(files);

export const browserFilesToTargets = (files: FileList | File[]) =>
  normalizeBrowserFiles(files).map((file) => {
    const fileWithRelativePath = file as FileWithRelativePath;
    return {
      id: "",
      entry: fileWithRelativePath,
      isDir: false,
      isFile: true,
      path: fileWithRelativePath.webkitRelativePath || fileWithRelativePath.name,
      createdAt: 0,
      modifiedAt: fileWithRelativePath.lastModified ?? 0,
      size: fileWithRelativePath.size ?? 0,
      isRoot: true,
    } satisfies FileTargetFile;
  });

export type BrowserFileDecision =
  | { kind: "ignore" }
  | { kind: "play-files"; files: File[] }
  | { kind: "open-browser-dialog"; targets: FileTargetFile[] };

export const decideBrowserFileSelection = (
  files: FileList | File[],
  loopMode: LoopMode,
): BrowserFileDecision => {
  const normalizedFiles = normalizeBrowserFiles(files);
  if (normalizedFiles.length === 0) {
    return { kind: "ignore" };
  }

  if (normalizedFiles.length === 1 && isDirectRetroFile(normalizedFiles[0])) {
    return { kind: "play-files", files: [normalizedFiles[0]] };
  }

  const mediaFiles = normalizedFiles.filter((file) => isDirectRetroFile(file));
  if (
    isPlaylistLoopMode(loopMode) &&
    mediaFiles.length > 1 &&
    mediaFiles.length === normalizedFiles.length
  ) {
    return { kind: "play-files", files: mediaFiles };
  }

  return {
    kind: "open-browser-dialog",
    targets: browserFilesToTargets(normalizedFiles),
  };
};

export type SharedDropDecision =
  | { kind: "ignore" }
  | { kind: "play-paths"; items: { url: string; path: string }[] }
  | { kind: "open-shared-dialog"; rememberFolderPath?: string; rememberFileListPaths?: string[] };

export const decideSharedDropSelection = (
  items: SharedDropItem[],
  loopMode: LoopMode,
): SharedDropDecision => {
  if (items.length === 0) {
    return { kind: "ignore" };
  }

  const mediaItems = items.filter(
    (item) => !item.isDir && (isVideoExtended(item.path) || isAudio(item.path) || isImage(item.path)),
  );

  if (items.length === 1 && mediaItems.length === 1) {
    const item = mediaItems[0];
    return { kind: "play-paths", items: [{ url: item.url, path: item.path }] };
  }

  if (items.length === 1 && items[0].isDir) {
    return {
      kind: "open-shared-dialog",
      rememberFolderPath: items[0].path,
    };
  }

  if (
    isPlaylistLoopMode(loopMode) &&
    mediaItems.length > 1 &&
    mediaItems.length === items.length
  ) {
    return {
      kind: "play-paths",
      items: mediaItems.map((item) => ({ url: item.url, path: item.path })),
    };
  }

  const rememberFileListPaths = items.filter((item) => !item.isDir).map((item) => item.path);
  return {
    kind: "open-shared-dialog",
    rememberFileListPaths: rememberFileListPaths.length > 1 ? rememberFileListPaths : undefined,
  };
};

export type PathDropDecision =
  | { kind: "ignore" }
  | { kind: "play-paths"; paths: string[] }
  | { kind: "open-browser-dialog"; rememberFileListPaths?: string[] };

export const decidePathDropSelection = (
  paths: string[],
  loopMode: LoopMode,
  isMediaPath: (path: string) => boolean = (path) => isVideo(path) || isAudio(path) || isImage(path),
): PathDropDecision => {
  if (paths.length === 0) {
    return { kind: "ignore" };
  }

  const isAllMedia = paths.every((path) => isMediaPath(path));
  if (paths.length === 1 && isAllMedia) {
    return { kind: "play-paths", paths: [paths[0]] };
  }

  if (isPlaylistLoopMode(loopMode) && paths.length > 1 && isAllMedia) {
    return { kind: "play-paths", paths };
  }

  return {
    kind: "open-browser-dialog",
    rememberFileListPaths: paths.length > 1 ? paths : undefined,
  };
};
