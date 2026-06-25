import React from "react";
import { File } from "lucide-react";
import { useDialog } from "../useDialog";
import { SharedFileInfo } from "./tauri";
import { usePreviewDialog } from "./usePreviewDialog";
import type { TargetFile } from "./api";

type Options = {
  files: SharedFileInfo[];
  onPlay: (url: string, path: string) => void;
};

function sharedToTargetFile(f: SharedFileInfo): TargetFile {
  return {
    id: f.id,
    path: f.name,
    isFile: true,
    isDir: false,
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

  const targetFiles: TargetFile[] = files.map(sharedToTargetFile);
  const urlMap = Object.fromEntries(files.map((f) => [f.id, f.url]));
  const getObjectUrl = async (file: TargetFile) => urlMap[file.id] ?? "";

  const handleClick = async (index: number) => {
    await showPreviewDialog({
      files: targetFiles,
      initialIndex: index,
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
          {files.map((file, index) => (
            <div
              key={file.id}
              className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm"
            >
              <button
                type="button"
                className="w-full text-left"
                onClick={() => handleClick(index)}
              >
                <div className="flex items-center gap-2 font-medium text-slate-100">
                  <File className="h-4 w-4 shrink-0 text-cyan-200" />
                  <span className="min-w-0 flex-1 break-all text-cyan-50">{file.name}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
