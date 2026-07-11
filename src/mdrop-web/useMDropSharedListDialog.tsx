import React from "react";
import { File, Folder, X } from "lucide-react";
import { useDialog } from "../useDialog";
import { SharedFileInfo } from "./tauri";
import { usePreviewDialog } from "./usePreviewDialog";
import { useMDropFileListDialog } from "./useMDropFileListDialog";
import type { TargetFile } from "./api";
import { useZipFileListDialog } from "./useZipFileListDialog";
import {
  getFfmpegStreamingEnabled,
  getFfmpegStreamingMode,
  listenFfmpegStreamingEnabled,
  listenFfmpegStreamingMode,
} from "./ffmpegPreference";
import { getNativePlaybackMode } from "../retro-player/hooks/persistedRetroSettings";
import {
  isArchive,
  isAudio,
  isBrowserPlayableVideo,
  isEpub,
  isImage,
  isPdf,
  isText,
  isVideo,
  isVideoExtended,
} from "./utils";

type Options = {
  files: SharedFileInfo[];
  onPlay: (url: string, path: string) => void;
  useHls?: boolean;
};

function sharedToTargetFile(f: SharedFileInfo): TargetFile {
  return {
    id: f.id,
    path: f.name,
    isFile: !f.isDir,
    isDir: f.isDir,
    size: 0,
  };
}

const audioStreamUrl = (apiServer: string, file: TargetFile) =>
  `${apiServer}/audio-hls/${encodeURIComponent(file.id)}/index.m3u8`;

export function useMDropSharedListDialog() {
  const { showDialog } = useDialog();

  const showMDropSharedListDialog = React.useCallback(
    async (opts: Options) => {
      return await showDialog<void>(({ close }) => (
        <MDropSharedListDialog files={opts.files} useHls={opts.useHls ?? false} onClose={close} />
      ));
    },
    [showDialog]
  );

  return { showMDropSharedListDialog };
}

const cleanupHls = (apiServer: string) => {
  fetch(`${apiServer}/hls/cleanup`, { method: "POST" }).catch(() => {});
};

function MDropSharedListDialog({
  files,
  useHls,
  onClose,
}: {
  files: SharedFileInfo[];
  useHls: boolean;
  onClose: () => void;
}) {
  const [currentUseHls, setCurrentUseHls] = React.useState(
    () => useHls || getFfmpegStreamingEnabled()
  );
  const [currentFfmpegMode, setCurrentFfmpegMode] = React.useState(() => getFfmpegStreamingMode());
  const { showPreviewDialog } = usePreviewDialog();
  const { showMDropFileListDialog } = useMDropFileListDialog();
  const { showZipFileListDialog } = useZipFileListDialog();
  const { showSelectDialog } = useDialog();

  React.useEffect(() => {
    setCurrentUseHls(useHls || getFfmpegStreamingEnabled());
  }, [useHls]);

  React.useEffect(() => listenFfmpegStreamingEnabled(setCurrentUseHls), []);
  React.useEffect(() => listenFfmpegStreamingMode(setCurrentFfmpegMode), []);

  const targetFiles: TargetFile[] = files.filter((f) => !f.isDir).map(sharedToTargetFile);
  const urlMap = Object.fromEntries(files.map((f) => [f.id, f.url]));
  const getObjectUrl = async (file: TargetFile) => urlMap[file.id] ?? "";
  const previewableFiles = targetFiles.filter((target) => (
    isImage(target.path) ||
    isBrowserPlayableVideo(target.path) ||
    isText(target.path) ||
    isAudio(target.path) ||
    isPdf(target.path) ||
    isEpub(target.path)
  ));

  const apiServer = files.length > 0 ? new URL(files[0].url).origin : "http://localhost:7878";

  const handleClick = async (file: SharedFileInfo, fileIndex: number) => {
    if (file.isDir) {
      await showMDropFileListDialog({
        apiServer,
        targetId: file.id,
        initialPath: "/",
        title: file.name,
        useHls: currentUseHls,
      });
      return;
    }

    const canPreviewDirect =
      isImage(file.path) ||
      isBrowserPlayableVideo(file.path) ||
      isText(file.path) ||
      isAudio(file.path) ||
      isPdf(file.path) ||
      isEpub(file.path);
    const canPlayWithFfmpeg = currentUseHls && (isVideoExtended(file.path) || isAudio(file.path));
    const canOpenArchive = isArchive(file.path);
    const options: {
      value: string;
      label: string;
      description: string;
    }[] = [];

    if (canPreviewDirect) {
      options.push({
        value: "play",
        label: "Play",
        description: "Try direct preview first.",
      });
    }

    if (canPlayWithFfmpeg) {
      options.push({
        value: "ffmpeg",
        label: "ffmpeg",
        description: currentFfmpegMode === "audio"
          ? "Open through ffmpeg audio-only HLS playback."
          : "Open through ffmpeg HLS playback.",
      });
    }

    if (canOpenArchive) {
      options.push({
        value: "open-archive",
        label: "Open archive",
        description: "Browse files inside this archive.",
      });
    }

    options.push({
      value: "download",
      label: "Download",
      description: "Save the original file.",
    });

    const action = await showSelectDialog({
      title: file.name,
      message: "Choose an action for this file.",
      options,
      cancelText: "Cancel",
    });

    if (action === "download") {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (action === "play") {
      const initialIndex = previewableFiles.findIndex((target) => target.id === file.id);
      if (initialIndex >= 0) {
        await showPreviewDialog({
          files: previewableFiles,
          initialIndex,
          isRetro: !getNativePlaybackMode(),
          getObjectUrl,
        });
      }
      return;
    }

    if (action === "open-archive") {
      await showZipFileListDialog({
        title: file.name,
        source: {
          type: "url",
          url: file.url,
        },
        initialPath: "/",
      });
      return;
    }

    const forceFfmpeg = action === "ffmpeg";
    const forceFfmpegAudio = action === "ffmpeg" && currentFfmpegMode === "audio";
    const playableFiles = forceFfmpegAudio
      ? targetFiles.filter((target) => isVideo(target.path) || isVideoExtended(target.path) || isAudio(target.path))
      : targetFiles;
    const initialPlayableIndex = playableFiles.findIndex((target) => target.id === file.id);
    await showPreviewDialog({
      files: playableFiles,
      initialIndex: initialPlayableIndex >= 0 ? initialPlayableIndex : fileIndex,
      isRetro: !getNativePlaybackMode(),
      useHls: forceFfmpeg || forceFfmpegAudio,
      forcedKind: forceFfmpegAudio ? "audio" : undefined,
      getObjectUrl: async (target) =>
        forceFfmpeg
          ? `${apiServer}/hls/${target.id}/index.m3u8`
          : forceFfmpegAudio
            ? audioStreamUrl(apiServer, target)
            : getObjectUrl(target),
    });
  };

  return (
    <div className="safe-dialog-fullscreen flex flex-col overflow-hidden bg-slate-950">
      <button
        type="button"
        onClick={() => { if (currentUseHls) cleanupHls(apiServer); onClose(); }}
        aria-label="Close"
        className="safe-top-offset-right fixed right-2 z-9998 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-700 hover:text-slate-200"
      >
        <X size={16} />
      </button>
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-800 px-4 py-3">
        <h2 className="text-lg font-semibold">
          Files
          <span className="ml-2 text-sm font-normal text-slate-400">{files.length}</span>
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {files.map((file) => {
            const fileIndex = targetFiles.findIndex((t) => t.id === file.id);
            return (
              <div
                key={file.id}
                className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm"
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => handleClick(file, fileIndex)}
                >
                  <div className="flex items-center gap-2 font-medium text-slate-100">
                    {file.isDir ? (
                      <Folder className="h-4 w-4 shrink-0 text-amber-500" />
                    ) : (
                      <File className="h-4 w-4 shrink-0 text-cyan-200" />
                    )}
                    <span className={`min-w-0 flex-1 break-all ${file.isDir ? "text-amber-50" : "text-cyan-50"}`}>
                      {file.name}{file.isDir ? "/" : ""}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
