import { useCallback, useEffect, useState } from "react";
import {
  getPreferredAudioInputDeviceId,
  setPreferredAudioInputDeviceId,
} from "./persistedRetroSettings";
import { resolvePreviewErrorMessage, retroT } from "../i18n";
import type { RetroPlayerLocale } from "../types";

export type PreviewSourceKind = "video" | "image" | "audio";
export type DisplayCaptureResult = string | null;
export type PreviewStreamSource =
  | "display-capture"
  | "microphone"
  | "camera"
  | "audio-preview";

const attachStreamEndHandlers = (
  stream: MediaStream,
  onEnded: () => void,
) => {
  for (const track of stream.getTracks()) {
    track.addEventListener("ended", onEnded);
  }
};

const requestUserAudioStream = async (
  preferredAudioInputDeviceId: string | null,
  withVideo: boolean,
) => {
  const preferredAudioConstraint = preferredAudioInputDeviceId
    ? { deviceId: { exact: preferredAudioInputDeviceId } }
    : true;

  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: preferredAudioConstraint,
      video: withVideo,
    });
  } catch (error) {
    if (!preferredAudioInputDeviceId) {
      throw error;
    }

    setPreferredAudioInputDeviceId(null);
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: withVideo,
    });
  }
};

function kindFromPath(path: string): PreviewSourceKind {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  if (/^(mp4|m4v|mov|mkv|avi|wmv|flv|webm|ts|m2ts|mts|ogv)$/.test(ext)) return "video";
  if (/^(mp3|wav|ogg|oga|m4a|aac|flac|opus|wma|weba)$/.test(ext)) return "audio";
  return "image";
}

const isHlsPreviewUrl = (src?: string) => Boolean(src && /\/hls(?:\/|$)|\/hls-sub\//.test(src));

const fireAndForgetHlsCleanup = (src?: string) => {
  if (!isHlsPreviewUrl(src)) {
    return;
  }

  try {
    const apiServer = src ? new URL(src).origin : window.__MDROP_CONFIG__?.apiServer;
    if (!apiServer) {
      return;
    }
    fetch(`${apiServer}/hls/cleanup`, { method: "POST" }).catch(() => {});
  } catch {
    // ignore malformed URLs and cleanup failures
  }
};

export function usePreviewSourceState(locale: RetroPlayerLocale = "en") {
  const [preferredAudioInputDeviceId, setPreferredAudioInputDeviceIdState] = useState<string | null>(
    () => getPreferredAudioInputDeviceId(),
  );
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [previewStreamSource, setPreviewStreamSource] = useState<PreviewStreamSource | null>(null);
  const [previewLabel, setPreviewLabel] = useState<string>();
  const [captureError, setCaptureError] = useState<string>("");
  const [previewKind, setPreviewKind] = useState<PreviewSourceKind | undefined>(undefined);
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([]);

  const stopPreviewStream = useCallback(() => {
    setPreviewKind(undefined);
    setPreviewLabel(undefined);
    setPreviewStreamSource(null);
    setCaptureError("");
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
      fireAndForgetHlsCleanup(current);
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

  const refreshAudioInputDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      setAudioInputDevices([]);
      return [];
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter((device) => device.kind === "audioinput");
    setAudioInputDevices(audioInputs);
    return audioInputs;
  }, []);

  useEffect(() => {
    void refreshAudioInputDevices();
  }, [refreshAudioInputDevices]);

  const updatePreferredAudioInputDeviceId = useCallback((deviceId: string | null) => {
    setPreferredAudioInputDeviceId(deviceId);
    setPreferredAudioInputDeviceIdState(deviceId);
  }, []);

  const previewFile = useCallback((file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      return;
    }

    stopPreviewStream();
    setPreviewLabel(file.name);
    setCaptureError("");
    setPreviewSrc((current) => {
      fireAndForgetHlsCleanup(current);
      revokePreviewSrc(current);
      return URL.createObjectURL(file);
    });
    setPreviewKind(isVideo ? "video" : isAudio ? "audio" : "image");
  }, [revokePreviewSrc, stopPreviewStream]);

  const startDisplayCapture = useCallback(async (): Promise<DisplayCaptureResult> => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      const message = retroT(locale, "capture-unsupported");
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
      setPreviewStreamSource("display-capture");
      setCaptureError("");
      setPreviewStream((current) => {
        current?.getTracks().forEach((track) => track.stop());
        return stream;
      });

      attachStreamEndHandlers(stream, () => {
        setPreviewKind((current) => (current === "video" ? undefined : current));
        setPreviewLabel((current) => (current === "Display Capture" ? undefined : current));
        setPreviewStreamSource((current) => (current === "display-capture" ? null : current));
        setCaptureError("");
        setPreviewStream((current) => {
          if (current !== stream) return current;
          return null;
        });
      });
      return null;
    } catch (error) {
      const message = resolvePreviewErrorMessage(error, locale, "capture-failed");
      setCaptureError(message);
      return message;
    }
  }, [clearPreviewSrc, locale]);

  const startMicrophoneInput = useCallback(async (
    deviceIdOverride?: string | null,
  ): Promise<DisplayCaptureResult> => {
    if (!navigator.mediaDevices?.getUserMedia) {
      const message = retroT(locale, "microphone-unsupported");
      setCaptureError(message);
      return message;
    }

    try {
      const stream = await requestUserAudioStream(
        deviceIdOverride ?? preferredAudioInputDeviceId,
        false,
      );

      void refreshAudioInputDevices();

      clearPreviewSrc();
      setPreviewKind("audio");
      setPreviewLabel("Microphone");
      setPreviewStreamSource("microphone");
      setCaptureError("");
      setPreviewStream((current) => {
        current?.getTracks().forEach((track) => track.stop());
        return stream;
      });

      attachStreamEndHandlers(stream, () => {
        setPreviewKind((current) => (current === "audio" ? undefined : current));
        setPreviewLabel((current) => (current === "Microphone" ? undefined : current));
        setPreviewStreamSource((current) => (current === "microphone" ? null : current));
        setCaptureError("");
        setPreviewStream((current) => (current === stream ? null : current));
      });
      return null;
    } catch (error) {
      const message = resolvePreviewErrorMessage(error, locale, "microphone-failed");
      setCaptureError(message);
      return message;
    }
  }, [clearPreviewSrc, locale, preferredAudioInputDeviceId, refreshAudioInputDevices]);

  const startCameraInput = useCallback(async (
    deviceIdOverride?: string | null,
  ): Promise<DisplayCaptureResult> => {
    if (!navigator.mediaDevices?.getUserMedia) {
      const message = retroT(locale, "camera-unsupported");
      setCaptureError(message);
      return message;
    }

    try {
      const stream = await requestUserAudioStream(
        deviceIdOverride ?? preferredAudioInputDeviceId,
        true,
      );

      void refreshAudioInputDevices();

      clearPreviewSrc();
      setPreviewKind("video");
      setPreviewLabel("Camera");
      setPreviewStreamSource("camera");
      setCaptureError("");
      setPreviewStream((current) => {
        current?.getTracks().forEach((track) => track.stop());
        return stream;
      });

      attachStreamEndHandlers(stream, () => {
        setPreviewKind((current) => (current === "video" ? undefined : current));
        setPreviewLabel((current) => (current === "Camera" ? undefined : current));
        setPreviewStreamSource((current) => (current === "camera" ? null : current));
        setCaptureError("");
        setPreviewStream((current) => (current === stream ? null : current));
      });
      return null;
    } catch (error) {
      const message = resolvePreviewErrorMessage(error, locale, "camera-failed");
      setCaptureError(message);
      return message;
    }
  }, [clearPreviewSrc, locale, preferredAudioInputDeviceId, refreshAudioInputDevices]);

  // For Desktop: src is already a valid URL (convertFileSrc result or HTTP URL).
  // Does NOT create a blob — revokePreviewSrc only revokes blob: URLs, so cleanup is safe.
  const previewPath = useCallback((src: string, filePath: string) => {
    stopPreviewStream();
    setCaptureError("");
    setPreviewLabel(filePath.replace(/.*[\\/]/, ""));
    setPreviewSrc((current) => {
      if (current !== src) {
        fireAndForgetHlsCleanup(current);
      }
      revokePreviewSrc(current);
      return src;
    });
    setPreviewKind(kindFromPath(filePath));
  }, [revokePreviewSrc, stopPreviewStream]);

  const previewAudioStream = useCallback((stream: MediaStream, label: string) => {
    clearPreviewSrc();
    setCaptureError("");
    setPreviewLabel(label);
    setPreviewKind("audio");
    setPreviewStreamSource("audio-preview");
    setPreviewStream((current) => {
      current?.getTracks().forEach((track) => track.stop());
      return stream;
    });
  }, [clearPreviewSrc]);

  return {
    previewSrc,
    previewStream,
    previewStreamSource,
    previewLabel,
    captureError,
    previewKind,
    audioInputDevices,
    preferredAudioInputDeviceId,
    previewFile,
    previewPath,
    previewAudioStream,
    refreshAudioInputDevices,
    setPreferredAudioInputDeviceId: updatePreferredAudioInputDeviceId,
    startDisplayCapture,
    startMicrophoneInput,
    startCameraInput,
    stopPreviewStream,
  };
}
