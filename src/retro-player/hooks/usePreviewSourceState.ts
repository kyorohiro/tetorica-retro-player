import { useCallback, useEffect, useState } from "react";

export type PreviewSourceKind = "video" | "image" | "audio";
export type DisplayCaptureResult = string | null;

export function usePreviewSourceState() {
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [previewLabel, setPreviewLabel] = useState<string>();
  const [captureError, setCaptureError] = useState<string>("");
  const [previewKind, setPreviewKind] = useState<PreviewSourceKind>("video");

  const stopPreviewStream = useCallback(() => {
    setPreviewStream((current) => {
      current?.getTracks().forEach((track) => track.stop());
      return null;
    });
  }, []);

  const revokePreviewSrc = useCallback((src?: string) => {
    if (src?.startsWith("blob:")) {
      URL.revokeObjectURL(src);
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

  const previewFile = useCallback((file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      return;
    }

    stopPreviewStream();
    setPreviewLabel(undefined);
    setCaptureError("");
    setPreviewSrc((current) => {
      revokePreviewSrc(current);
      return URL.createObjectURL(file);
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
    previewKind,
    previewFile,
    startDisplayCapture,
    stopPreviewStream,
  };
}
