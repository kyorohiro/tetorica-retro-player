import type { RetroAudioSettings } from "../audio/preset";
import {
  isAppleWebKitFamily,
  isRealSafariWebKit,
  isTauriRuntime,
  needsNativeAudioSuppression,
} from "../platform/runtime";

export type RetroElementAudioMode =
  | "user-volume"
  | "force-muted"
  | "force-volume-zero";

export type RetroPlaybackAudioInputMode =
  | "none"
  | "media-stream-source"
  | "captured-media-stream"
  | "media-element-source";

export type RetroRecordingAudioSourceKind =
  | "safari-tap"
  | "media-capture"
  | "recording-destination"
  | "live-stream";

type PlaybackRouteParams = {
  preferNativeVideoSurface: boolean;
  isHlsManaged: boolean;
  isMediaStreamSource: boolean;
  audioOptimizationMode: RetroAudioSettings["audioOptimizationMode"];
  nativeAudioSuppressionOverride?: boolean | null;
};

export type RetroPlaybackAudioRoute = {
  bypassWebAudio: boolean;
  inputMode: RetroPlaybackAudioInputMode;
  elementAudioMode: RetroElementAudioMode;
  isHlsManaged: boolean;
  isMediaStreamSource: boolean;
};

export const shouldBypassPlaybackWebAudio = ({
  preferNativeVideoSurface,
  isHlsManaged,
}: Pick<PlaybackRouteParams, "preferNativeVideoSurface" | "isHlsManaged">): boolean =>
  preferNativeVideoSurface || (isTauriRuntime() && isHlsManaged);

export const resolvePlaybackAudioRoute = ({
  preferNativeVideoSurface,
  isHlsManaged,
  isMediaStreamSource,
  audioOptimizationMode,
  nativeAudioSuppressionOverride,
}: PlaybackRouteParams): RetroPlaybackAudioRoute => {
  const bypassWebAudio = shouldBypassPlaybackWebAudio({
    preferNativeVideoSurface,
    isHlsManaged,
  });

  if (bypassWebAudio) {
    return {
      bypassWebAudio,
      inputMode: "none",
      elementAudioMode: "user-volume",
      isHlsManaged,
      isMediaStreamSource,
    };
  }

  if (isMediaStreamSource) {
    return {
      bypassWebAudio,
      inputMode: "media-stream-source",
      elementAudioMode: "force-muted",
      isHlsManaged,
      isMediaStreamSource,
    };
  }

  if (isHlsManaged) {
    return {
      bypassWebAudio,
      inputMode: "captured-media-stream",
      elementAudioMode: "force-muted",
      isHlsManaged,
      isMediaStreamSource,
    };
  }

  if (
    isRealSafariWebKit() ||
    needsNativeAudioSuppression(
      audioOptimizationMode,
      nativeAudioSuppressionOverride,
    )
  ) {
    return {
      bypassWebAudio,
      inputMode: "media-element-source",
      elementAudioMode: "force-volume-zero",
      isHlsManaged,
      isMediaStreamSource,
    };
  }

  return {
    bypassWebAudio,
    inputMode: "media-element-source",
    elementAudioMode: "user-volume",
    isHlsManaged,
    isMediaStreamSource,
  };
};

export const applyElementAudioMode = (
  media: HTMLMediaElement,
  mode: RetroElementAudioMode,
  isMuted: boolean,
  volume: number,
): void => {
  switch (mode) {
    case "force-muted":
      media.muted = true;
      media.volume = 0;
      return;
    case "force-volume-zero":
      media.muted = false;
      media.volume = 0;
      return;
    case "user-volume":
    default:
      media.muted = isMuted;
      media.volume = isMuted ? 0 : volume;
  }
};

export const resolveRecordingAudioSourceOrder = ({
  bypassWebAudio,
}: Pick<RetroPlaybackAudioRoute, "bypassWebAudio">): RetroRecordingAudioSourceKind[] => {
  const order: RetroRecordingAudioSourceKind[] = [];

  if (isAppleWebKitFamily() && bypassWebAudio) {
    order.push("safari-tap");
  }

  order.push(bypassWebAudio ? "media-capture" : "recording-destination");

  if (isAppleWebKitFamily() && !bypassWebAudio) {
    order.push("safari-tap");
  }

  for (const fallback of [
    "media-capture",
    "recording-destination",
    "live-stream",
  ] satisfies RetroRecordingAudioSourceKind[]) {
    if (!order.includes(fallback)) {
      order.push(fallback);
    }
  }

  return order;
};
