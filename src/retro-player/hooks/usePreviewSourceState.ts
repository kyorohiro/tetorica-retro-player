import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __onNativeFileCached?: (path: string, name: string, mime: string) => void;
    __onNativeFileCacheError?: (msg: string) => void;
  }
}
import { invoke } from "@tauri-apps/api/core";
import { createFileStreamUrl, revokeFileStreamUrl } from "../../swFileStream";
import { cacheMediaFile, makeSessionId } from "../../cacheMediaFile";

export type PreviewSourceKind = "video" | "image" | "audio";
export type DisplayCaptureResult = string | null;
export type CacheProgress = { loaded: number; total: number } | null;

const isTauriApp = typeof window !== "undefined" && "__TAURI__" in window;

// True when running inside a Tauri app on Android.
const isTauriAndroid =
  isTauriApp && /android/i.test(navigator.userAgent);

const MDROP_DOWNLOAD_PREFIX = "http://127.0.0.1:19088/download/";

async function startMediaServerAndShare(localPath: string): Promise<{ url: string; id: string }> {
  await invoke("mdrop_start_server");
  return invoke<{ url: string; id: string }>("mdrop_share_file", { path: localPath });
}

export function usePreviewSourceState() {
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [previewLabel, setPreviewLabel] = useState<string>();
  const [captureError, setCaptureError] = useState<string>("");
  const [previewKind, setPreviewKind] = useState<PreviewSourceKind | undefined>(undefined);
  const [cacheProgress, setCacheProgress] = useState<CacheProgress>(null);
  const activeSessionRef = useRef<string | null>(null);

  const stopPreviewStream = useCallback(() => {
    setPreviewKind(undefined);
    setPreviewLabel(undefined);
    setCaptureError("");
    setPreviewStream((current) => {
      current?.getTracks().forEach((track) => track.stop());
      return null;
    });
  }, []);

  const revokePreviewSrc = useCallback((src?: string) => {
    if (src?.startsWith("blob:")) {
      URL.revokeObjectURL(src);
    } else if (src?.startsWith("/sw-stream/")) {
      revokeFileStreamUrl(src);
    } else if (isTauriApp && src?.startsWith(MDROP_DOWNLOAD_PREFIX)) {
      const id = src.slice(MDROP_DOWNLOAD_PREFIX.length);
      if (id) {
        void invoke("mdrop_unshare_file", { id }).catch(() => {});
      }
    }
  }, []);

  const clearPreviewSrc = useCallback(() => {
    setPreviewSrc((current) => {
      revokePreviewSrc(current);
      return undefined;
    });
  }, [revokePreviewSrc]);

  useEffect(() => {
    return () => {
      revokePreviewSrc(previewSrc);
      previewStream?.getTracks().forEach((track) => track.stop());
    };
  }, [previewSrc, previewStream, revokePreviewSrc]);

  // Android native cache path: called from Kotlin via evaluateJavascript
  useEffect(() => {
    if (!isTauriAndroid) return;
    window.__onNativeFileCached = async (path, name, mime) => {
      const isVideo = mime.startsWith("video/");
      const isAudio = mime.startsWith("audio/");
      if (!isVideo && !isAudio) return;
      stopPreviewStream();
      setPreviewLabel(name);
      setCaptureError("");
      try {
        const { url } = await startMediaServerAndShare(path);
        setPreviewSrc((current) => {
          revokePreviewSrc(current);
          return url;
        });
        setPreviewKind(isVideo ? "video" : "audio");
        void invoke("cleanup_media_cache", { maxAgeSecs: 24 * 60 * 60 }).catch(() => {});
      } catch (error) {
        setCaptureError(error instanceof Error ? error.message : "Failed to serve file");
      }
    };
    window.__onNativeFileCacheError = (msg) => {
      setCaptureError(msg);
    };
    return () => {
      delete window.__onNativeFileCached;
      delete window.__onNativeFileCacheError;
    };
  }, [isTauriAndroid, stopPreviewStream, revokePreviewSrc]);

  const previewFile = useCallback(async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      return;
    }

    stopPreviewStream();
    setPreviewLabel(file.name);
    setCaptureError("");

    // On Android (Tauri): copy video/audio to app cache via Rust, then stream
    // via the local mDrop HTTP server. This avoids Android WebView reading the
    // entire content:// file into blob memory (e.g., Google Drive files).
    if (isTauriAndroid && (isVideo || isAudio)) {
      const session = makeSessionId(file);
      activeSessionRef.current = session;
      setCacheProgress({ loaded: 0, total: file.size });

      try {
        const localPath = await cacheMediaFile(file, session, (p) => {
          if (activeSessionRef.current !== session) return;
          setCacheProgress(p);
        });

        if (activeSessionRef.current !== session) return;

        const { url } = await startMediaServerAndShare(localPath);

        if (activeSessionRef.current !== session) return;

        setPreviewSrc((current) => {
          revokePreviewSrc(current);
          return url;
        });
        setPreviewKind(isVideo ? "video" : "audio");

        // Evict cache files older than 24 h.
        void invoke("cleanup_media_cache", { maxAgeSecs: 24 * 60 * 60 }).catch(() => {});
      } catch (error) {
        if (activeSessionRef.current === session) {
          setCaptureError(
            error instanceof Error ? error.message : "Failed to cache file",
          );
        }
      } finally {
        if (activeSessionRef.current === session) {
          setCacheProgress(null);
        }
      }
      return;
    }

    setPreviewSrc((current) => {
      revokePreviewSrc(current);
      return createFileStreamUrl(file) ?? URL.createObjectURL(file);
    });
    setPreviewKind(isVideo ? "video" : isAudio ? "audio" : "image");
  }, [revokePreviewSrc, stopPreviewStream]);

  const startDisplayCapture = useCallback(async (): Promise<DisplayCaptureResult> => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      const message = "このブラウザでは画面キャプチャーに対応していません。";
      setCaptureError(message);
      return message;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      clearPreviewSrc();
      setPreviewKind("video");
      setPreviewLabel("Display Capture");
      setCaptureError("");
      setPreviewStream((current) => {
        current?.getTracks().forEach((track) => track.stop());
        return stream;
      });

      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        setPreviewKind((current) => (current === "video" ? undefined : current));
        setPreviewLabel((current) => (current === "Display Capture" ? undefined : current));
        setCaptureError("");
        setPreviewStream((current) => {
          if (current !== stream) return current;
          return null;
        });
      });
      return null;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "画面キャプチャーを開始できませんでした。";
      setCaptureError(message);
      return message;
    }
  }, [clearPreviewSrc]);

  return {
    previewSrc,
    previewStream,
    previewLabel,
    captureError,
    cacheProgress,
    previewKind,
    previewFile,
    startDisplayCapture,
    stopPreviewStream,
  };
}
