const FFMPEG_STREAMING_EVENT = "tetorica-ffmpeg-streaming-change";
export type FfmpegStreamingMode = "video" | "audio";

const readWindowValue = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.__MDROP_CONFIG__?.ffmpegStreamingEnabled === true;
};

const readWindowMode = (): FfmpegStreamingMode => {
  if (typeof window === "undefined") {
    return "video";
  }
  return window.__MDROP_CONFIG__?.ffmpegStreamingMode === "audio" ? "audio" : "video";
};

export const getFfmpegStreamingEnabled = (): boolean => readWindowValue();
export const getFfmpegStreamingMode = (): FfmpegStreamingMode => readWindowMode();

export const setFfmpegStreamingEnabled = (enabled: boolean): void => {
  if (typeof window === "undefined") {
    return;
  }
  if (!window.__MDROP_CONFIG__) {
    window.__MDROP_CONFIG__ = {};
  }
  window.__MDROP_CONFIG__.ffmpegStreamingEnabled = enabled;
  window.dispatchEvent(
    new CustomEvent(FFMPEG_STREAMING_EVENT, {
      detail: { enabled, mode: readWindowMode() },
    }),
  );
};

export const setFfmpegStreamingMode = (mode: FfmpegStreamingMode): void => {
  if (typeof window === "undefined") {
    return;
  }
  if (!window.__MDROP_CONFIG__) {
    window.__MDROP_CONFIG__ = {};
  }
  window.__MDROP_CONFIG__.ffmpegStreamingMode = mode;
  window.dispatchEvent(
    new CustomEvent(FFMPEG_STREAMING_EVENT, {
      detail: { enabled: readWindowValue(), mode },
    }),
  );
};

export const listenFfmpegStreamingEnabled = (
  listener: (enabled: boolean) => void,
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const wrapped = (event: Event) => {
    const detail = (event as CustomEvent<{ enabled?: boolean }>).detail;
    listener(detail?.enabled === true);
  };

  window.addEventListener(FFMPEG_STREAMING_EVENT, wrapped as EventListener);
  return () => {
    window.removeEventListener(FFMPEG_STREAMING_EVENT, wrapped as EventListener);
  };
};

export const listenFfmpegStreamingMode = (
  listener: (mode: FfmpegStreamingMode) => void,
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const wrapped = (event: Event) => {
    const detail = (event as CustomEvent<{ mode?: FfmpegStreamingMode }>).detail;
    listener(detail?.mode === "audio" ? "audio" : "video");
  };

  window.addEventListener(FFMPEG_STREAMING_EVENT, wrapped as EventListener);
  return () => {
    window.removeEventListener(FFMPEG_STREAMING_EVENT, wrapped as EventListener);
  };
};
