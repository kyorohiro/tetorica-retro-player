import React from "react";
import { File, Folder } from "lucide-react";
import { useDialog } from "../useDialog";
import { SharedFileInfo } from "./tauri";
import { usePreviewDialog } from "./usePreviewDialog";
import { useMDropFileListDialog } from "./useMDropFileListDialog";
import type { TargetFile } from "./api";

type Options = {
  files: SharedFileInfo[];
  onPlay: (url: string, path: string) => void;
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

export function useMDropSharedListDialog() {
  const { showDialog } = useDialog();

  const showMDropSharedListDialog = React.useCallback(
    async (opts: Options) => {
      return await showDialog<void>(({ close }) => (
        <MDropSharedListDialog files={opts.files} onClose={close} />
      ));
    },
    [showDialog]
  );

  return { showMDropSharedListDialog };
}

function MDropSharedListDialog({
  files,
  onClose,
}: {
  files: SharedFileInfo[];
  onClose: () => void;
}) {
  const { showPreviewDialog } = usePreviewDialog();
  const { showMDropFileListDialog } = useMDropFileListDialog();

  const targetFiles: TargetFile[] = files.filter((f) => !f.isDir).map(sharedToTargetFile);
  const urlMap = Object.fromEntries(files.map((f) => [f.id, f.url]));
  const getObjectUrl = async (file: TargetFile) => urlMap[file.id] ?? "";

  const apiServer = files.length > 0 ? new URL(files[0].url).origin : "http://localhost:7878";

  const handleClick = async (file: SharedFileInfo, fileIndex: number) => {
    if (file.isDir) {
      await showMDropFileListDialog({
        apiServer,
        targetId: file.id,
        initialPath: "/",
        title: file.name,
      });
      return;
    }
    await showPreviewDialog({
      files: targetFiles,
      initialIndex: fileIndex,
      isRetro: true,
      getObjectUrl,
    });
  };

  return (
    <div className="safe-dialog-fullscreen flex flex-col overflow-hidden bg-slate-950">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
        <h2 className="text-lg font-semibold">
          Files
          <span className="ml-2 text-sm font-normal text-slate-400">{files.length}</span>
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800"
        >
          Close
        </button>
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
