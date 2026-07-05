import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { t } from "../i18n";
import type { RetroPlayerLocale } from "../retro-player/types";
import type { RetroPlayerPlusHandle } from "../retro-player-client/RetroPlayerPlus";
import { FileTargetFile } from "./api";
import { isAudio, isImage, isVideo, type FileWithRelativePath } from "./utils";
import type { useBrowserFileListDialog } from "./useBrowserFileListDialog";

const waitForNextPaint = async () => {
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
};

export type FilePickerHandle = {
  openFileInput: () => void;
  openFolderInput: () => void;
  openDroppedFiles: (files: FileList | File[]) => Promise<void>;
};

type FilePickerProps = {
  locale: RetroPlayerLocale;
  isIosOrAndroid: boolean;
  loopModeRef: React.RefObject<"one" | "autoplay" | "all" | "off">;
  retroPlayerPlusRef: React.RefObject<RetroPlayerPlusHandle | null>;
  showBrowserFileListDialog: ReturnType<typeof useBrowserFileListDialog>["showBrowserFileListDialog"];
  setIsMobileMenuOpen: (value: boolean) => void;
};

export const FilePicker = React.forwardRef<FilePickerHandle, FilePickerProps>(
  function FilePicker(
    { locale, isIosOrAndroid, loopModeRef, retroPlayerPlusRef, showBrowserFileListDialog, setIsMobileMenuOpen },
    ref,
  ) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);
    const pickerStateRef = useRef<"idle" | "opening" | "processing">("idle");
    const [isPreparingSelection, setIsPreparingSelection] = useState(false);
    const [isPreparingSelectionDismissed, setIsPreparingSelectionDismissed] = useState(false);

    const finishPreparingSelection = useCallback(() => {
      pickerStateRef.current = "idle";
      setIsPreparingSelection(false);
      setIsPreparingSelectionDismissed(false);
    }, []);

    // Detect when the native file/folder picker was cancelled (no "cancel" event
    // fires on some platforms) by watching for focus returning to the page.
    useEffect(() => {
      const clearIfPickerWasCancelled = () => {
        if (pickerStateRef.current !== "opening") return;

        window.setTimeout(() => {
          if (pickerStateRef.current !== "opening") return;
          finishPreparingSelection();
        }, 0);
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState !== "visible") return;
        clearIfPickerWasCancelled();
      };

      const fileInput = fileInputRef.current;
      const folderInput = folderInputRef.current;

      window.addEventListener("focus", clearIfPickerWasCancelled);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      fileInput?.addEventListener("cancel", clearIfPickerWasCancelled);
      folderInput?.addEventListener("cancel", clearIfPickerWasCancelled);

      return () => {
        window.removeEventListener("focus", clearIfPickerWasCancelled);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        fileInput?.removeEventListener("cancel", clearIfPickerWasCancelled);
        folderInput?.removeEventListener("cancel", clearIfPickerWasCancelled);
      };
    }, [finishPreparingSelection]);

    const beginPreparingSelection = useCallback(() => {
      pickerStateRef.current = "opening";
      flushSync(() => {
        setIsPreparingSelection(true);
        setIsPreparingSelectionDismissed(false);
        setIsMobileMenuOpen(false);
      });
    }, [setIsMobileMenuOpen]);

    const showPreparingSelection = useCallback(() => {
      pickerStateRef.current = "processing";
      flushSync(() => {
        setIsPreparingSelection(true);
        setIsPreparingSelectionDismissed(false);
      });
    }, []);

    const dismissPreparingSelection = useCallback(() => {
      flushSync(() => {
        setIsPreparingSelectionDismissed(true);
      });
    }, []);

    const filesToTargets = useCallback((files: FileList | File[]) => {
      const targets: FileTargetFile[] = [];

      for (let index = 0; index < files.length; index += 1) {
        const file = files[index] as FileWithRelativePath;

        targets.push({
          id: "",
          entry: file,
          isDir: false,
          isFile: true,
          path: file.webkitRelativePath || file.name,
          createdAt: 0,
          modifiedAt: file.lastModified ?? 0,
          size: file.size ?? 0,
          isRoot: true,
        });
      }

      return targets;
    }, []);

    const isDirectRetroFile = useCallback((file: File) => {
      return isImage(file.name) || isVideo(file.name) || isAudio(file.name);
    }, []);

    const openPortableTargets = useCallback(async (files: FileList | File[]) => {
      const targets = filesToTargets(files);
      if (targets.length === 0) return;

      await showBrowserFileListDialog({
        files: targets,
        initialPath: "/",
        title: "",
      });
    }, [filesToTargets, showBrowserFileListDialog]);

    const openFiles = useCallback(async (files: FileList | File[]) => {
      if (files.length === 0) return;

      pickerStateRef.current = "processing";

      try {
        await waitForNextPaint();

        if (files.length === 1 && isDirectRetroFile(files[0])) {
          retroPlayerPlusRef.current?.loadFiles([files[0]]);
          return;
        }

        const mediaFiles = Array.from(files).filter((f) => isDirectRetroFile(f));
        if ((loopModeRef.current === "autoplay" || loopModeRef.current === "all") && mediaFiles.length > 1 && mediaFiles.length === files.length) {
          retroPlayerPlusRef.current?.loadFiles(mediaFiles);
          finishPreparingSelection();
          return;
        }

        await openPortableTargets(files);
      } finally {
        finishPreparingSelection();
      }
    }, [finishPreparingSelection, isDirectRetroFile, loopModeRef, openPortableTargets, retroPlayerPlusRef]);

    const openFileInput = useCallback(() => {
      beginPreparingSelection();
      fileInputRef.current?.click();
    }, [beginPreparingSelection]);

    const openFolderInput = useCallback(() => {
      beginPreparingSelection();
      folderInputRef.current?.click();
    }, [beginPreparingSelection]);

    useImperativeHandle(ref, () => ({
      openFileInput,
      openFolderInput,
      openDroppedFiles: openFiles,
    }), [openFileInput, openFolderInput, openFiles]);

    return (
      <>
        {isPreparingSelection && !isPreparingSelectionDismissed && (
          <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-slate-950/56 px-4">
            <div
              className="pointer-events-auto w-[min(92vw,28rem)] rounded-2xl border border-slate-700 bg-slate-900/94 px-4 py-4 text-slate-100 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 shrink-0 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {t(locale, "preparingSelection")}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    {t(locale, "preparingSelectionDetail")}
                  </p>
                </div>
                <button
                  type="button"
                  onPointerDown={dismissPreparingSelection}
                  onTouchStart={dismissPreparingSelection}
                  onMouseDown={dismissPreparingSelection}
                  onClick={dismissPreparingSelection}
                  className="shrink-0 rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-slate-700"
                >
                  {t(locale, "hideLoadingOverlay")}
                </button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*,.zip,.cbz,.rar,.cbr,.pdf,.epub,.txt,.md"
          multiple
          className="hidden"
          onChange={async (event) => {
            const input = event.currentTarget;
            const files = input.files;
            if (files && files.length > 0) {
              showPreparingSelection();
              await waitForNextPaint();
              await openFiles(files);
            } else {
              finishPreparingSelection();
            }

            input.value = "";
          }}
        />

        {!isIosOrAndroid && (
          <input
            ref={folderInputRef}
            type="file"
            multiple
            {...({ webkitdirectory: "true" } as any)}
            className="hidden"
            onChange={async (event) => {
              const input = event.currentTarget;
              const files = input.files;
              if (files && files.length > 0) {
                showPreparingSelection();
                await waitForNextPaint();
                try {
                  pickerStateRef.current = "processing";
                  await openPortableTargets(files);
                } finally {
                  finishPreparingSelection();
                }
              } else {
                finishPreparingSelection();
              }

              input.value = "";
            }}
          />
        )}
      </>
    );
  },
);

export default FilePicker;
