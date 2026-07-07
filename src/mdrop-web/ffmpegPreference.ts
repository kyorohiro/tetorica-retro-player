const FFMPEG_STREAMING_EVENT = "tetorica-ffmpeg-streaming-change";

const readWindowValue = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.__MDROP_CONFIG__?.ffmpegStreamingEnabled === true;
};

export const getFfmpegStreamingEnabled = (): boolean => readWindowValue();

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
      detail: { enabled },
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
