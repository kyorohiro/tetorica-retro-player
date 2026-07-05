import React, { useEffect, useRef } from "react";
import { isTauriRuntime } from "../retro-player/platform/runtime";
import type { MediaPlaybackTarget } from "./mediaPlaybackTarget";
import type { FileTargetFile } from "./api";
import { mdropShareFile, mdropUnshareAll } from "./tauri";
import { resolvePlayableUrl } from "./resolvePlayableSource";
import { useMDropSharedListDialog } from "./useMDropSharedListDialog";
import { isAudio, isImage, isVideo, isVideoExtended, mimeFromPath } from "./utils";
import type { useBrowserFileListDialog } from "./useBrowserFileListDialog";

type Params = {
  isMDropReadyRef: React.RefObject<boolean>;
  isFfmpegEnabledRef: React.RefObject<boolean>;
  loopModeRef: React.RefObject<"one" | "autoplay" | "all" | "off">;
  retroPlayerPlusRef: React.RefObject<MediaPlaybackTarget | null>;
  showBrowserFileListDialog: ReturnType<typeof useBrowserFileListDialog>["showBrowserFileListDialog"];
};

// Wires up the two Tauri-only ways media can arrive from outside the app
// (OS drag-drop and "Open With" file association) to the player.
export function useMDropDragDrop({
  isMDropReadyRef,
  isFfmpegEnabledRef,
  loopModeRef,
  retroPlayerPlusRef,
  showBrowserFileListDialog,
}: Params) {
  const { showMDropSharedListDialog } = useMDropSharedListDialog();

  const showMDropSharedListDialogRef = useRef(showMDropSharedListDialog);
  useEffect(() => {
    showMDropSharedListDialogRef.current = showMDropSharedListDialog;
  }, [showMDropSharedListDialog]);

  const showBrowserFileListDialogRef = useRef(showBrowserFileListDialog);
  useEffect(() => {
    showBrowserFileListDialogRef.current = showBrowserFileListDialog;
  }, [showBrowserFileListDialog]);

  // Tauri native OS drag-drop → mDrop HTTP URL
  useEffect(() => {
    if (!isTauriRuntime()) return;

    let unlisten: (() => void) | undefined;

    const setup = async () => {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      unlisten = await getCurrentWindow().onDragDropEvent(async (event) => {
        console.log("[mDrop] onDragDropEvent", event.payload.type, event.payload);
        if (event.payload.type !== "drop") return;

        const paths = event.payload.paths;
        console.log("[mDrop] paths:", paths, "isMDropReady:", isMDropReadyRef.current);
        if (paths.length === 0) return;

        try {
          if (isMDropReadyRef.current) {
            // mDrop ON: clear stale list first, then share new files
            await mdropUnshareAll().catch(() => {});
            const raw = await Promise.all(paths.map((p) => mdropShareFile(p)));
            const sharedFiles = raw.map((f) => ({
              ...f,
              url: resolvePlayableUrl(f, isFfmpegEnabledRef.current),
            }));
            const mediaShared = sharedFiles.filter((f) => !f.isDir && (isVideoExtended(f.path) || isAudio(f.path) || isImage(f.path)));
            const isPlaylistMode = (loopModeRef.current === "autoplay" || loopModeRef.current === "all") && mediaShared.length > 1 && mediaShared.length === sharedFiles.length;
            if (sharedFiles.length === 1 && mediaShared.length === 1) {
              const f = sharedFiles[0];
              retroPlayerPlusRef.current?.loadPaths([{ url: f.url, path: f.path }]);
            } else if (isPlaylistMode) {
              retroPlayerPlusRef.current?.loadPaths(mediaShared.map((f) => ({ url: f.url, path: f.path })));
            } else {
              await showMDropSharedListDialogRef.current({
                files: sharedFiles,
                useHls: isFfmpegEnabledRef.current,
                onPlay: (url, path) => {
                  retroPlayerPlusRef.current?.loadPaths([{ url, path }]);
                },
              });
            }
          } else {
            // mDrop OFF: Tauri intercepts OS drag-drop; DOM events do not fire.
            // Use asset:// protocol (assetProtocol.enable: true in tauri.conf.json).
            const { convertFileSrc } = await import("@tauri-apps/api/core");

            const isAllMedia = paths.every((p) => isVideo(p) || isAudio(p) || isImage(p));
            const isPlaylistMode = (loopModeRef.current === "autoplay" || loopModeRef.current === "all") && paths.length > 1 && isAllMedia;
            if (paths.length === 1 && isAllMedia) {
              retroPlayerPlusRef.current?.loadPaths([{ url: convertFileSrc(paths[0]), path: paths[0] }]);
            } else if (isPlaylistMode) {
              const items = paths.map((p) => ({ url: convertFileSrc(p), path: p }));
              retroPlayerPlusRef.current?.loadPaths(items);
            } else {
              // Non-media or multiple files: fetch as blobs to get real File objects for the dialog
              const fileEntries: FileTargetFile[] = [];
              for (const p of paths) {
                const name = p.split("/").pop() ?? p;
                try {
                  const res = await fetch(convertFileSrc(p));
                  const blob = await res.blob();
                  const mime = mimeFromPath(p) || blob.type;
                  fileEntries.push({
                    id: "", entry: new File([blob], name, { type: mime }),
                    isDir: false, isFile: true, path: name,
                    createdAt: 0, modifiedAt: 0, size: blob.size, isRoot: true,
                  });
                } catch (e) {
                  console.error("[mDrop OFF] fetch failed:", p, e);
                }
              }
              if (fileEntries.length > 0) {
                await showBrowserFileListDialogRef.current({ files: fileEntries, initialPath: "/", title: "" });
              }
            }
          }
        } catch (e) {
          console.error("[mDrop] drag-drop share failed:", e);
        }
      });
    };

    setup();
    return () => { unlisten?.(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Tauri "Open With" / file association handler (tauri-plugin-deep-link)
  useEffect(() => {
    if (!isTauriRuntime()) return;

    let unlisten: (() => void) | undefined;

    const setup = async () => {
      const { listen } = await import("@tauri-apps/api/event");
      unlisten = await listen<string[]>("retro://open-files", async (event) => {
        const fileUrls = event.payload;
        if (!fileUrls || fileUrls.length === 0) return;

        // file:///path/to/file → /path/to/file
        const paths = fileUrls.map((u) => {
          try { return decodeURIComponent(new URL(u).pathname); } catch { return u; }
        });

        const isAllMedia = paths.every((p) => isVideoExtended(p) || isAudio(p) || isImage(p));
        if (!isAllMedia || paths.length === 0) return;

        const isPlaylistMode =
          (loopModeRef.current === "autoplay" || loopModeRef.current === "all") &&
          paths.length > 1;

        const { convertFileSrc } = await import("@tauri-apps/api/core");
        const items = paths.map((p) => ({ url: convertFileSrc(p), path: p }));
        retroPlayerPlusRef.current?.loadPaths(isPlaylistMode ? items : [items[0]]);
      });
    };

    setup();
    return () => { unlisten?.(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
