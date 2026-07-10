import { useEffect, useRef } from "react";
import { isTauriRuntime } from "../retro-player/platform/runtime";

type Params = {
  onInputPaths: (
    paths: string[],
    options?: { useExtendedMedia?: boolean },
  ) => Promise<void> | void;
};

// Wires up the two Tauri-only ways media can arrive from outside the app
// (OS drag-drop and "Open With" file association) to the player.
export function useMDropDragDrop({
  onInputPaths,
}: Params) {
  const lastDragLogRef = useRef<{ type: string; at: number } | null>(null);

  // Tauri native OS drag-drop → mDrop HTTP URL
  useEffect(() => {
    if (!isTauriRuntime()) return;

    let unlisten: (() => void) | undefined;

    const setup = async () => {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      unlisten = await getCurrentWindow().onDragDropEvent(async (event) => {
        const now = Date.now();
        const payloadType = event.payload.type;
        const shouldLog =
          payloadType !== "over" ||
          !lastDragLogRef.current ||
          lastDragLogRef.current.type !== "over" ||
          now - lastDragLogRef.current.at >= 1000;
        if (shouldLog) {
          console.log("[mDrop] onDragDropEvent", payloadType, event.payload);
          lastDragLogRef.current = { type: payloadType, at: now };
        }
        if (event.payload.type !== "drop") return;

        const paths = event.payload.paths;
        console.log("[mDrop] paths:", paths);
        if (paths.length === 0) return;

        try {
          await onInputPaths(paths);
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

        await onInputPaths(paths, { useExtendedMedia: true });
      });
    };

    setup();
    return () => { unlisten?.(); };
  }, [onInputPaths]);
}
