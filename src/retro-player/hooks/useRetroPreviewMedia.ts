import { useRef } from "react";
import type { CanvasStageApp } from "./useRetroPixiStage";
import type { RetroFilterState } from "./useRetroFilterState";
import type { RetroAudioSettings } from "../audio/preset";
import { isAndroidRuntime } from "../platform/runtime";
import {
  attachHlsSource,
  createAudioMediaSource,
  createImageMediaSource,
  createVideoMediaSource,
  destroyHlsInstance,
  getHlsSourceUrl,
  getHlsInstance,
  shouldUseNativeVideoSurface,
} from "../media/RetroMediaSource";
import {
  applyElementAudioMode,
  resolvePlaybackAudioRoute,
} from "../media/RetroAudioRouting";
import { resolvePreviewErrorMessage, retroT } from "../i18n";
import type { RetroPlayerLocale } from "../types";

type PreviewKind = "video" | "audio" | "image" | "capture" | null;
type CurrentRef<T> = { current: T };

type UseRetroPreviewMediaParams = {
  locale: RetroPlayerLocale;
  preferNativeVideoSurface: boolean;
  filterState: RetroFilterState;
  appRef: CurrentRef<CanvasStageApp | null>;
  spriteRef: CurrentRef<null>;
  textureRef: CurrentRef<null>;
  previewElementRef: CurrentRef<HTMLImageElement | HTMLMediaElement | null>;
  filterRef: CurrentRef<Record<string, never> | null>;
  mediaRef: CurrentRef<HTMLMediaElement | null>;
  objectUrlRef: CurrentRef<string | null>;
  streamRef: CurrentRef<MediaStream | null>;
  streamOwnedRef: CurrentRef<boolean>;
  previewRequestIdRef: CurrentRef<number>;
  isPlayingRef: CurrentRef<boolean>;
  previewKindRef: CurrentRef<PreviewKind>;
  audioContextRef: CurrentRef<AudioContext | null>;
  mediaSourceRef: CurrentRef<MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null>;
  masterGainRef: CurrentRef<GainNode | null>;
  noiseGainRef: CurrentRef<GainNode | null>;
  audioOptimizationModeRef: CurrentRef<RetroAudioSettings["audioOptimizationMode"]>;
  nativeAudioSuppressionOverrideRef: CurrentRef<boolean | null>;
  isMutedRef: CurrentRef<boolean>;
  volumeRef: CurrentRef<number>;
  playbackRateRef: CurrentRef<number>;
  isLoopingRef: CurrentRef<boolean>;
  isAudioFxEnabled: boolean;
  lofiAmount: number;
  bitCrushAmount: number;
  sampleRateReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
  isMuted: boolean;
  volume: number;
  previewKind: PreviewKind;
  setPreviewName: (value: string) => void;
  setPreviewError: (value: string) => void;
  setNeedsUserPlay: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
  setCurrentTime: (value: number) => void;
  setDuration: (value: number) => void;
  setPlaybackRate: (value: number) => void;
  setIsLooping: (value: boolean) => void;
  setSourceDimensions: (value: { width: number; height: number } | null) => void;
  setViewportRect: (value: { width: number; height: number; x: number; y: number } | null) => void;
  setPreviewKindState: (kind: PreviewKind) => void;
  setIsPoweredOn: (value: boolean) => void;
  beginLoading: (label: string) => void;
  finishLoading: () => void;
  setIsBuffering: (v: boolean) => void;
  ensureAudioContext: () => Promise<AudioContext | null>;
  updateAudioNodes: () => void;
  setEngineIsPlaying: (nextIsPlaying: boolean) => void;
  connectMediaStream: (stream: MediaStream, mediaTag?: string) => Promise<void>;
  connectMediaAudio: (media: HTMLMediaElement) => Promise<void>;
  rebuildAudioGraphForCurrentMedia: (reason: string) => Promise<AudioContext | null>;
  fitSprite: (app: CanvasStageApp | null, sprite: null, source: HTMLVideoElement | HTMLImageElement) =>
    | { width: number; height: number; x: number; y: number }
    | undefined;
  refreshLayout: () => void;
  scheduleRefreshLayout: () => void;
  safeRender: () => void;
  resetFilterInstance: () => void;
  initPixi: () => Promise<void>;
  ensureFilterReady: () => Promise<void>;
  resetPerfAccumulators?: () => void;
  debugVideo: (label: string, payload?: Record<string, unknown>) => void;
  debugAudio: (label: string, payload?: Record<string, unknown>) => void;
  onEndedRef?: CurrentRef<(() => void) | undefined>;
  autoPlayRef: CurrentRef<boolean>;
};

const HLS_STARTUP_RETRY_DATASET_KEY = "retroHlsStartupRetry";
const HLS_STARTUP_RETRY_DELAYS_MS = [400, 900, 1600];
const HLS_TERMINAL_BUFFERING_GRACE_MS = 1500;
const HLS_TERMINAL_BUFFERING_EPSILON_SECONDS = 0.12;
const HLS_TERMINAL_DURATION_MISMATCH_SECONDS = 5;

export function useRetroPreviewMedia({
  locale,
  preferNativeVideoSurface,
  filterState,
  appRef,
  spriteRef,
  textureRef,
  previewElementRef,
  mediaRef,
  objectUrlRef,
  streamRef,
  streamOwnedRef,
  previewRequestIdRef,
  isPlayingRef,
  previewKindRef,
  audioContextRef,
  mediaSourceRef,
  masterGainRef,
  noiseGainRef,
  audioOptimizationModeRef,
  nativeAudioSuppressionOverrideRef,
  isMutedRef,
  volumeRef,
  playbackRateRef,
  isLoopingRef,
  isAudioFxEnabled,
  lofiAmount,
  bitCrushAmount,
  sampleRateReductionAmount,
  bassAmount,
  midAmount,
  trebleAmount,
  stereoWidthAmount,
  smallSpeakerRoomAmount,
  isMuted,
  volume,
  previewKind,
  setPreviewName,
  setPreviewError,
  setNeedsUserPlay,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setPlaybackRate,
  setIsLooping,
  setSourceDimensions,
  setViewportRect,
  setPreviewKindState,
  setIsPoweredOn,
  beginLoading,
  finishLoading,
  setIsBuffering,
  ensureAudioContext,
  updateAudioNodes,
  setEngineIsPlaying,
  connectMediaStream,
  connectMediaAudio,
  rebuildAudioGraphForCurrentMedia,
  fitSprite,
  refreshLayout,
  scheduleRefreshLayout,
  safeRender,
  resetFilterInstance,
  initPixi,
  ensureFilterReady,
  resetPerfAccumulators,
  debugVideo,
  debugAudio,
  onEndedRef,
  autoPlayRef,
}: UseRetroPreviewMediaParams) {
  const _setPreviewError = setPreviewError;
  const playbackStartAttemptRef = useRef(0);
  const resolveCurrentPlaybackAudioRoute = (media: HTMLMediaElement) =>
    resolvePlaybackAudioRoute({
      preferNativeVideoSurface,
      isHlsManaged: media instanceof HTMLVideoElement && Boolean(getHlsInstance(media)),
      isMediaStreamSource: media.srcObject instanceof MediaStream,
      audioOptimizationMode: audioOptimizationModeRef.current,
      nativeAudioSuppressionOverride: nativeAudioSuppressionOverrideRef.current,
    });

  const waitForMediaSwitchCooldown = async () => {
    if (!isAndroidRuntime()) {
      return;
    }

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 220);
    });
  };

  const quietAudioOutputImmediately = () => {
    const currentTime = audioContextRef.current?.currentTime;

    if (noiseGainRef.current) {
      if (typeof currentTime === "number") {
        const gain = noiseGainRef.current.gain;
        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + 0.03);
      } else {
        noiseGainRef.current.gain.value = 0;
      }
    }

    if (masterGainRef.current) {
      if (typeof currentTime === "number") {
        const gain = masterGainRef.current.gain;
        gain.cancelScheduledValues(currentTime);
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + 0.03);
      } else {
        masterGainRef.current.gain.value = 0;
      }
    }
  };

  const muteNoiseImmediately = () => {
    if (noiseGainRef.current) {
      noiseGainRef.current.gain.value = 0;
    }
  };

  const isAutoplayBlockedError = (error: unknown) => {
    if (error instanceof DOMException) {
      if (error.name === "NotAllowedError" || error.name === "AbortError") {
        return true;
      }
    }

    if (error instanceof Error) {
      return /autoplay|user gesture|user activation|interaction|not allowed/i.test(
        error.message,
      );
    }

    return false;
  };

  const recoverToManualPlayPrompt = (error: unknown) => {
    if (!isAutoplayBlockedError(error)) {
      return false;
    }

    finishLoading();
    _setPreviewError("");
    setNeedsUserPlay(true);
    syncVideoState();
    safeRender();
    return true;
  };

  const resetAudioGraphAfterPreviewFailure = async (
    reason: string,
    error: unknown,
  ) => {
    try {
      await rebuildAudioGraphForCurrentMedia(`${reason}:audio-reset`);
      debugAudio(`${reason}:audio-reset:done`, {
        message: error instanceof Error ? error.message : String(error),
      });
    } catch (resetError) {
      debugAudio(`${reason}:audio-reset:failed`, {
        message: error instanceof Error ? error.message : String(error),
        resetMessage:
          resetError instanceof Error ? resetError.message : String(resetError),
      });
    }
  };

  const releaseDetachedMedia = (
    media: HTMLMediaElement,
    url?: string,
    stopStream = true,
  ) => {
    quietAudioOutputImmediately();
    media.muted = true;
    media.volume = 0;
    media.pause();
    if (media instanceof HTMLVideoElement) {
      destroyHlsInstance(media);
    }
    if (media.srcObject instanceof MediaStream) {
      if (stopStream) {
        media.srcObject.getTracks().forEach((track) => track.stop());
      }
      media.srcObject = null;
    }
    media.src = "";
    media.load();

    if (url?.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  const waitForVideoFrame = (video: HTMLVideoElement) =>
    new Promise<void>((resolve, reject) => {
      const describeMediaError = (mediaError: MediaError | null) => {
        if (!mediaError) return "unknown";
        if (mediaError.code === MediaError.MEDIA_ERR_ABORTED) return "aborted";
        if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return "network";
        if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return "decode";
        if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          return "src-not-supported";
        }

        return `code-${mediaError.code}`;
      };

      const describeState = (label: string) => ({
        label,
        src: video.currentSrc || video.src || "(empty)",
        readyState: video.readyState,
        networkState: video.networkState,
        error: video.error ? describeMediaError(video.error) : null,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      });

      const cleanup = () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
        window.clearInterval(pollId);
        window.clearTimeout(timeoutId);
      };

      const handleReady = (eventName: string) => {
        debugVideo("waitForVideoFrame:event-ready", describeState(eventName));
        cleanup();
        resolve();
      };
      const handleLoadedData = () => { handleReady("loadeddata"); };
      const handleCanPlay = () => { handleReady("canplay"); };

      const handleError = () => {
        debugVideo("waitForVideoFrame:event-error", describeState("error"));
        cleanup();
        reject(
          new Error(
            `Failed to load video. src=${video.currentSrc || video.src || "(empty)"} reason=${describeMediaError(video.error)}`,
          ),
        );
      };

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        debugVideo("waitForVideoFrame:already-ready", describeState("sync-check"));
        resolve();
        return;
      }

      // Diagnostic: some Safari builds have been observed to never fire
      // `loadeddata`/`canplay` for certain blob-URL sources even though
      // `readyState` does advance — log periodically so a stuck "Loading
      // video preview..." can be diagnosed from the console.
      const pollId = window.setInterval(() => {
        debugVideo("waitForVideoFrame:poll", describeState("poll"));
      }, 1000);

      // Safety net: if neither a ready nor an error event ever fires, don't
      // hang forever. Fall back to whatever readyState says after a timeout.
      const timeoutMs = getHlsInstance(video) ? 20000 : 8000;
      const timeoutId = window.setTimeout(() => {
        debugVideo("waitForVideoFrame:timeout", describeState("timeout"));
        cleanup();
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          resolve();
        } else {
          reject(
            new Error(
              `Video load timed out. src=${video.currentSrc || video.src || "(empty)"} readyState=${video.readyState}`,
            ),
          );
        }
      }, timeoutMs);

      video.addEventListener("loadeddata", handleLoadedData, { once: true });
      video.addEventListener("canplay", handleCanPlay, { once: true });
      video.addEventListener("error", handleError, { once: true });
      video.load();
    });

  const waitForConfirmedPlaybackStart = (media: HTMLMediaElement) =>
    new Promise<void>((resolve, reject) => {
      const startTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;

      const cleanup = () => {
        media.removeEventListener("playing", handleMaybeReady);
        media.removeEventListener("timeupdate", handleMaybeReady);
        media.removeEventListener("error", handleError);
        if (timer !== null) {
          window.clearTimeout(timer);
        }
      };

      const isAdvanced = () => {
        const currentTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;
        return currentTime > startTime + 0.01;
      };

      const finish = () => {
        cleanup();
        resolve();
      };

      const handleMaybeReady = () => {
        if (!media.paused && isAdvanced()) {
          finish();
        }
      };

      const handleError = () => {
        cleanup();
        reject(
          new Error(
            `Failed to confirm playback start. src=${media.currentSrc || media.src || "(empty)"} paused=${media.paused} readyState=${media.readyState} currentTime=${media.currentTime}`,
          ),
        );
      };

      if (!media.paused && isAdvanced()) {
        resolve();
        return;
      }

      media.addEventListener("playing", handleMaybeReady);
      media.addEventListener("timeupdate", handleMaybeReady);
      media.addEventListener("error", handleError, { once: true });

      const timer = window.setTimeout(() => {
        cleanup();
        const currentTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;
        if (!media.paused && media.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          resolve();
          return;
        }
        reject(
          new Error(
            `Could not confirm playback start. src=${media.currentSrc || media.src || "(empty)"} paused=${media.paused} readyState=${media.readyState} currentTime=${currentTime}`,
          ),
        );
      }, 5000);
    });

  const waitForAudioReady = (audio: HTMLAudioElement) =>
    new Promise<void>((resolve, reject) => {
      const describeMediaError = (mediaError: MediaError | null) => {
        if (!mediaError) return "unknown";
        if (mediaError.code === MediaError.MEDIA_ERR_ABORTED) return "aborted";
        if (mediaError.code === MediaError.MEDIA_ERR_NETWORK) return "network";
        if (mediaError.code === MediaError.MEDIA_ERR_DECODE) return "decode";
        if (mediaError.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          return "src-not-supported";
        }

        return `code-${mediaError.code}`;
      };

      const cleanup = () => {
        audio.removeEventListener("loadedmetadata", handleReady);
        audio.removeEventListener("canplay", handleReady);
        audio.removeEventListener("error", handleError);
      };

      const handleReady = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        cleanup();
        reject(
          new Error(
            `Failed to load audio. src=${audio.currentSrc || audio.src || "(empty)"} reason=${describeMediaError(audio.error)}`,
          ),
        );
      };

      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
        resolve();
        return;
      }

      // For MediaStream sources (Tone.js, screen capture audio), Safari does not
      // fire loadedmetadata/canplay after audio.load(), causing a permanent hang.
      // Skip load() and resolve immediately — playVideoWithAudio() handles errors.
      if (audio.srcObject instanceof MediaStream) {
        resolve();
        return;
      }

      audio.addEventListener("loadedmetadata", handleReady, { once: true });
      audio.addEventListener("canplay", handleReady, { once: true });
      audio.addEventListener("error", handleError, { once: true });
      audio.load();
    });

  const waitMs = (ms: number) =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });

  const cancelPendingPlaybackStart = () => {
    playbackStartAttemptRef.current += 1;
  };

  const settleManualStartState = () => {
    const media = mediaRef.current;
    if (!media) {
      return;
    }

    cancelPendingPlaybackStart();
    media.pause();
    isPlayingRef.current = false;
    setEngineIsPlaying(false);
    setIsPlaying(false);
    setNeedsUserPlay(false);
    setIsBuffering(false);
    syncVideoState();
  };

  const isHlsStartupRetryableError = (
    media: HTMLMediaElement | null | undefined,
    error: unknown,
  ) => {
    if (!(media instanceof HTMLVideoElement)) {
      return false;
    }

    if (!getHlsInstance(media)) {
      return false;
    }

    if ((media.currentTime ?? 0) > 0.05) {
      return false;
    }

    const message = error instanceof Error ? error.message : String(error);
    return /src-not-supported|network|failed to load|playback start/i.test(message);
  };

  const restartCurrentMedia = async () => {
    const media = mediaRef.current;
    if (!media) {
      return false;
    }

    const existingHls = media instanceof HTMLVideoElement ? getHlsInstance(media) : undefined;
    const src = media instanceof HTMLVideoElement
      ? getHlsSourceUrl(media) || media.currentSrc || media.src
      : media.currentSrc || media.src;
    if (!src) {
      return false;
    }

    const resumeTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;
    const isVideo = media instanceof HTMLVideoElement;
    const isAudio = media instanceof HTMLAudioElement;

    debugVideo("restartCurrentMedia:start", {
      currentTime: resumeTime,
      paused: media.paused,
      readyState: media.readyState,
      src,
      isVideo,
      isAudio,
    });

    media.pause();
    if (existingHls && media instanceof HTMLVideoElement) {
      // Native src reassignment would fight hls.js's own MediaSource
      // attachment — tear down and re-attach a fresh hls.js instance
      // against the same (real, non-blob) manifest URL instead.
      await attachHlsSource(media, src);
      applyMediaSettings(media);
    } else {
      media.removeAttribute("src");
      media.load();
      media.src = src;
      applyMediaSettings(media);
      media.load();
    }

    if (isVideo) {
      await waitForVideoFrame(media);
    } else if (isAudio) {
      await waitForAudioReady(media);
    }

    if (resumeTime > 0) {
      try {
        media.currentTime = resumeTime;
      } catch (error) {
        debugVideo("restartCurrentMedia:seek-failed", {
          currentTime: resumeTime,
          error: error instanceof Error ? error.message : String(error),
          src,
        });
      }
    }

    syncVideoState();
    debugVideo("restartCurrentMedia:ready", {
      currentTime: media.currentTime,
      paused: media.paused,
      readyState: media.readyState,
      src,
    });
    return true;
  };

  const isLikelyLoopTransition = (media: HTMLMediaElement | null) => {
    if (!media || !media.loop || !media.paused) {
      return false;
    }

    if (media.ended) {
      return true;
    }

    const currentTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;
    const duration = Number.isFinite(media.duration) ? media.duration : 0;
    const nearEnd = duration > 0 && duration - currentTime <= 0.12;
    return nearEnd;
  };

  const getBufferedEnd = (media: HTMLMediaElement | null) => {
    if (!media || media.buffered.length === 0) {
      return 0;
    }
    return media.buffered.end(media.buffered.length - 1);
  };

  const isPotentialTerminalHlsBuffering = (media: HTMLMediaElement | null) => {
    if (!media || media.loop || media.ended || media.paused) {
      return false;
    }
    if (!getHlsSourceUrl(media)) {
      return false;
    }

    const currentTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;
    const bufferedEnd = getBufferedEnd(media);
    const duration = Number.isFinite(media.duration) ? media.duration : 0;
    const nearBufferedEnd =
      bufferedEnd > 0 &&
      bufferedEnd - currentTime <= HLS_TERMINAL_BUFFERING_EPSILON_SECONDS;
    const hasDurationMismatch =
      duration > 0 &&
      duration - bufferedEnd >= HLS_TERMINAL_DURATION_MISMATCH_SECONDS;

    return (
      currentTime > 1 &&
      media.readyState < HTMLMediaElement.HAVE_FUTURE_DATA &&
      nearBufferedEnd &&
      hasDurationMismatch
    );
  };

  const attachMediaEventListeners = (media: HTMLMediaElement) => {
    const isCurrentMedia = () => mediaRef.current === media;
    let forcedTerminalHlsEnd = false;
    let terminalHlsBufferTimer: number | null = null;

    const clearTerminalHlsBufferTimer = () => {
      if (terminalHlsBufferTimer !== null) {
        window.clearTimeout(terminalHlsBufferTimer);
        terminalHlsBufferTimer = null;
      }
    };

    const syncIfCurrentMedia = () => {
      if (!isCurrentMedia()) {
        return;
      }
      syncVideoState();
    };
    const quietIfCurrentMedia = () => {
      if (!isCurrentMedia()) {
        return;
      }
      quietAudioOutputImmediately();
    };
    const debugMediaEvent = (label: string) => {
      if (!isCurrentMedia()) {
        return;
      }
      debugVideo(`media:${label}`, {
        currentTime: media.currentTime,
        duration: media.duration,
        ended: media.ended,
        paused: media.paused,
        previewKind: previewKindRef.current,
        readyState: media.readyState,
        src: media.currentSrc || media.src || null,
      });
    };
    const resolveForcedTerminalHlsEnd = (reason: string) => {
      if (!isCurrentMedia() || forcedTerminalHlsEnd) {
        return;
      }
      if (!isPotentialTerminalHlsBuffering(media)) {
        return;
      }

      forcedTerminalHlsEnd = true;
      clearTerminalHlsBufferTimer();
      const bufferedEnd = getBufferedEnd(media);
      debugVideo("media:forced-terminal-hls-end", {
        reason,
        bufferedEnd,
        currentTime: media.currentTime,
        duration: media.duration,
        src: media.currentSrc || media.src || null,
      });

      try {
        media.pause();
      } catch {
        // pause() may fail on a detached/replaced element; state sync below
        // still closes the lingering Buffering UI for the active element.
      }

      setCurrentTime(Math.max(media.currentTime, bufferedEnd));
      setDuration(bufferedEnd > 0 ? bufferedEnd : media.duration || 0);
      setIsBuffering(false);
      finishLoading();
      syncVideoState();
      if (!media.loop) {
        onEndedRef?.current?.();
      }
    };
    const scheduleTerminalHlsBufferCheck = (reason: string) => {
      if (!isCurrentMedia()) {
        return;
      }
      if (!isPotentialTerminalHlsBuffering(media)) {
        clearTerminalHlsBufferTimer();
        return;
      }

      const snapshot = {
        currentTime: Number.isFinite(media.currentTime) ? media.currentTime : 0,
        bufferedEnd: getBufferedEnd(media),
      };
      clearTerminalHlsBufferTimer();
      terminalHlsBufferTimer = window.setTimeout(() => {
        terminalHlsBufferTimer = null;
        if (!isCurrentMedia() || forcedTerminalHlsEnd) {
          return;
        }

        const currentTime = Number.isFinite(media.currentTime) ? media.currentTime : 0;
        const bufferedEnd = getBufferedEnd(media);
        const playbackStable = Math.abs(currentTime - snapshot.currentTime) < 0.05;
        const bufferStable = Math.abs(bufferedEnd - snapshot.bufferedEnd) < 0.05;
        if (!playbackStable || !bufferStable) {
          return;
        }

        resolveForcedTerminalHlsEnd(reason);
      }, HLS_TERMINAL_BUFFERING_GRACE_MS);
    };

    media.addEventListener("play", syncIfCurrentMedia);
    media.addEventListener("play", () => {
      forcedTerminalHlsEnd = false;
      clearTerminalHlsBufferTimer();
      debugMediaEvent("play");
    });
    media.addEventListener("pause", syncIfCurrentMedia);
    media.addEventListener("pause", () => debugMediaEvent("pause"));
    media.addEventListener("pause", () => {
      clearTerminalHlsBufferTimer();
      if (!isCurrentMedia()) {
        return;
      }
      // Safari can briefly fire "pause" around a loop boundary before restarting.
      // Don't silence during that transition — audio is effectively uninterrupted.
      if (isLikelyLoopTransition(media)) return;
      quietAudioOutputImmediately();
    });
    media.addEventListener("abort", quietIfCurrentMedia);
    media.addEventListener("emptied", quietIfCurrentMedia);
    media.addEventListener("loadstart", quietIfCurrentMedia);
    media.addEventListener("seeking", quietIfCurrentMedia);
    // "suspend" intentionally NOT handled here.
    // abort/emptied/loadstart/seeking/pause already cover every case where we
    // need to silence. The "suspend" event fires when the browser buffer fills
    // during ACTIVE playback, which must NOT silence audio. It can also fire
    // after "play" (race with resume flow), and with the lightweight timeupdate
    // handler no longer calling updateAudioNodes(), a quietAudioOutputImmediately()
    // ramp from "suspend" would not be cancelled and would leave audio silent.
    // "stalled" and "waiting" are transient network/buffer states that resolve
    // on their own. Silencing on these and immediately restoring on "playing"
    // caused repeated click noise during media loading and file switching.
    // We DO track buffering state for the UI loading indicator (no audio impact).
    media.addEventListener("waiting", () => {
      if (isCurrentMedia()) setIsBuffering(true);
      scheduleTerminalHlsBufferCheck("waiting");
      debugMediaEvent("waiting");
    });
    media.addEventListener("playing", () => {
      if (isCurrentMedia()) setIsBuffering(false);
      clearTerminalHlsBufferTimer();
      debugMediaEvent("playing");
    });
    media.addEventListener("loadeddata", () => debugMediaEvent("loadeddata"));
    media.addEventListener("canplay", () => debugMediaEvent("canplay"));
    media.addEventListener("stalled", () => {
      scheduleTerminalHlsBufferCheck("stalled");
      debugMediaEvent("stalled");
    });
    media.addEventListener("suspend", () => debugMediaEvent("suspend"));
    media.addEventListener("error", () => debugMediaEvent("error"));
    media.addEventListener("volumechange", syncIfCurrentMedia);

    // Lightweight timeupdate handler: only update the scrubber position.
    // syncVideoState (5x setState + updateAudioNodes) is too heavy to run at
    // 15Hz — it generates significant GC pressure in JavaScriptCore and causes
    // the periodic main-thread pauses that make A/V playback speed wobble.
    // All other state (isPlaying, duration, playbackRate, isLooping) is kept
    // correct by their dedicated events below.
    let lastTimeupdateTime = -1;
    const handleTimeUpdate = () => {
      const t = mediaRef.current?.currentTime ?? 0;
      if (Math.abs(t - lastTimeupdateTime) < 0.08) return;
      lastTimeupdateTime = t;
      clearTerminalHlsBufferTimer();
      debugMediaEvent("timeupdate");
      setCurrentTime(t);
    };
    media.addEventListener("timeupdate", handleTimeUpdate);

    media.addEventListener("durationchange", syncIfCurrentMedia);
    media.addEventListener("seeked", syncIfCurrentMedia);
    // hls.js owns manifest polling and end-of-stream/duration detection for
    // .m3u8 sources (see RetroMediaSource.ts's attachHlsSource) via
    // MediaSource, so the native "ended"/"durationchange" events fire
    // correctly and no HLS-specific handling is needed here.
    media.addEventListener("ended", () => {
      if (!isCurrentMedia()) return;
      clearTerminalHlsBufferTimer();
      syncVideoState();
      if (!media.loop && !forcedTerminalHlsEnd) {
        onEndedRef?.current?.();
      }
    });

    media.addEventListener("ratechange", syncIfCurrentMedia);

    // The "resize" event fires on <video> when the video's intrinsic size
    // changes — this happens for capture streams when the captured window is
    // resized. Without this, sourceDimensions stays stale and the canvas keeps
    // rendering at the old aspect ratio, squishing the content vertically.
    if (media instanceof HTMLVideoElement) {
      media.addEventListener("resize", () => {
        const w = media.videoWidth;
        const h = media.videoHeight;
        if (w > 0 && h > 0) {
          setSourceDimensions({ width: w, height: h });
          scheduleRefreshLayout();
        }
      });
    }
  };

  const applyMediaSettings = (media: HTMLMediaElement) => {
    media.loop = isLoopingRef.current;
    media.muted = isMutedRef.current;
    media.volume = isMutedRef.current ? 0 : volumeRef.current;
    media.playbackRate = playbackRateRef.current;
    media.autoplay = false;
    media.preload = "auto";
    media.crossOrigin = "anonymous";
    if (media instanceof HTMLVideoElement) {
      media.playsInline = true;
    }
  };

  const syncVideoState = () => {
    if (!mediaRef.current) {
      debugVideo("syncVideoState:no-media", {
        previewKind: previewKindRef.current,
        hasPreviewElement: Boolean(previewElementRef.current),
      });
      isPlayingRef.current = false;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      // Use a fade rather than updateAudioNodes(): stale event listeners on
      // the old media element (e.g. the "pause" fired by releaseDetachedMedia)
      // reach here while engine.runtimeState.isPlaying is still true, so
      // updateAudioNodes() would snap masterGain back to full and re-enable
      // noiseGain, causing a brief noise burst.
      quietAudioOutputImmediately();
      setIsBuffering(false);
      safeRender();
      return;
    }

    const currentMedia = mediaRef.current;

    // During a loop transition Safari may briefly fire "pause" even though the
    // video is about to restart. Treat that window as still-playing.
    const isLoopTransition = isLikelyLoopTransition(currentMedia);
    // A live MediaStream track only tells us the source still exists.
    // It must not override an explicit user pause, otherwise paused Tone/audio
    // previews can be treated as "playing" again when unrelated UI state syncs.
    const effectivelyPlaying = !currentMedia.paused || isLoopTransition;
    isPlayingRef.current = effectivelyPlaying;
    setEngineIsPlaying(effectivelyPlaying);
    setIsPlaying(effectivelyPlaying);
    if (
      currentMedia.paused ||
      currentMedia.ended ||
      currentMedia.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
    ) {
      setIsBuffering(false);
    }
    if (effectivelyPlaying) {
      finishLoading();
    }
    setCurrentTime(currentMedia.currentTime);
    setDuration(currentMedia.duration || 0);
    setPlaybackRate(currentMedia.playbackRate || 1);
    setIsLooping(currentMedia.loop);
    updateAudioNodes();
    safeRender();
  };

  const cleanupPreview = () => {
    debugVideo("cleanupPreview:start", {
      previewKind: previewKindRef.current,
      hasMedia: Boolean(mediaRef.current),
      hasPreviewElement: Boolean(previewElementRef.current),
    });
    quietAudioOutputImmediately();
    previewRequestIdRef.current += 1;
    finishLoading();

    const currentMedia = mediaRef.current;
    const currentStream = streamRef.current;
    const shouldStopCurrentStream = streamOwnedRef.current;

    spriteRef.current = null;
    textureRef.current = null;
    mediaRef.current = null;
    previewElementRef.current = null;
    streamRef.current = null;
    streamOwnedRef.current = false;
    mediaSourceRef.current?.disconnect();
    mediaSourceRef.current = null;

    setNeedsUserPlay(false);
    setIsBuffering(false);
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPreviewKindState(null);
    setSourceDimensions(null);
    setViewportRect(null);

    if (objectUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = null;

    if (currentMedia) {
      releaseDetachedMedia(currentMedia, undefined, shouldStopCurrentStream);
    } else if (shouldStopCurrentStream) {
      currentStream?.getTracks().forEach((track) => track.stop());
    }

    safeRender();
  };

  const cleanupForPageLeave = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = true;
      mediaRef.current.volume = 0;
      mediaRef.current.pause();
    }

    quietAudioOutputImmediately();

    cleanupPreview();

    if (audioContextRef.current?.state === "running") {
      void audioContextRef.current.suspend();
    }
  };

  const powerOn = () => {
    setIsPoweredOn(true);
    appRef.current?.ticker.start();
    try {
      resetPerfAccumulators?.();
    } catch (e) {
      // ignore
    }
  };

  const playVideoWithAudio = async () => {
    if (!mediaRef.current) return;
    const playbackAttemptId = playbackStartAttemptRef.current + 1;
    playbackStartAttemptRef.current = playbackAttemptId;
    const isPlaybackAttemptStale = () => playbackStartAttemptRef.current !== playbackAttemptId;

    try {
      const media = mediaRef.current;
      const contextWasSuspended = audioContextRef.current?.state === "suspended";
      const context = await ensureAudioContext();
      if (isPlaybackAttemptStale()) {
        return;
      }
      let route = resolveCurrentPlaybackAudioRoute(media);
      if (!route.bypassWebAudio && !mediaSourceRef.current) {
        await connectMediaAudio(media);
        if (isPlaybackAttemptStale()) {
          return;
        }
        route = resolveCurrentPlaybackAudioRoute(media);
      }
      applyElementAudioMode(
        media,
        mediaSourceRef.current ? route.elementAudioMode : "user-volume",
        isMutedRef.current,
        volumeRef.current,
      );
      // Restore gain immediately before play in case a "suspend" event fired
      // during ensureAudioContext() and scheduled a ramp-to-0.
      updateAudioNodes();
      // After a long pause Safari suspends the AudioContext. When resumed, the
      // CoreAudio pipeline on macOS needs a moment to stabilize before audio
      // and video can start in sync. Without this delay the video starts ahead
      // of the audio output path, causing a stutter and permanent lip-sync offset.
      const isHiddenDoc = typeof document !== "undefined" && document.visibilityState === "hidden";
      if (contextWasSuspended && !isHiddenDoc) {
        await new Promise<void>((resolve) => { setTimeout(resolve, 30); });
        if (isPlaybackAttemptStale()) {
          return;
        }
      }
      const shouldConfirmPlaybackStart =
        media instanceof HTMLVideoElement &&
        media.src.includes(".m3u8");
      const startedAtTime = media.currentTime;
      await media.play();
      if (isPlaybackAttemptStale()) {
        media.pause();
        return;
      }
      if (shouldConfirmPlaybackStart) {
        debugVideo("playVideoWithAudio:play-resolved", {
          currentTime: media.currentTime,
          paused: media.paused,
          readyState: media.readyState,
          src: media.currentSrc || media.src || null,
          startedAtTime,
        });
        await waitForConfirmedPlaybackStart(media);
        if (isPlaybackAttemptStale()) {
          media.pause();
          return;
        }
        debugVideo("playVideoWithAudio:confirmed-start", {
          currentTime: media.currentTime,
          paused: media.paused,
          readyState: media.readyState,
          src: media.currentSrc || media.src || null,
          startedAtTime,
        });
      }
      if (media instanceof HTMLVideoElement) {
        delete media.dataset[HLS_STARTUP_RETRY_DATASET_KEY];
      }
      isPlayingRef.current = true;
      setEngineIsPlaying(true);
      setIsPlaying(true);
      _setPreviewError("");
      setNeedsUserPlay(false);
      let audioContextState = audioContextRef.current?.state ?? context?.state ?? "none";
      // play() succeeded but AudioContext is still suspended (e.g. Tauri WKWebView allows
      // video autoplay but cannot resume AudioContext without a user gesture).
      if (audioContextState === "suspended" && mediaSourceRef.current) {
        // ensureAudioContext() above already attempted resume(), but it races
        // against a timeout (see TetoricaRetroAudioNode.ensureInitialized) so
        // it doesn't hang forever when resume() never settles without a
        // gesture. That timeout can fire even when resume() would have
        // succeeded moments later — this function only runs from a genuine
        // Play click or an autoplay attempt that already reached play(), so
        // give the in-flight resume() one more bounded chance to finish
        // before concluding it's truly stuck and re-prompting the user.
        const activeContext = audioContextRef.current;
        if (activeContext) {
          await Promise.race([
            activeContext.resume().catch(() => {}),
            new Promise<void>((resolve) => { window.setTimeout(resolve, 1000); }),
          ]);
          if (isPlaybackAttemptStale()) {
            media.pause();
            return;
          }
        }
        audioContextState = audioContextRef.current?.state ?? context?.state ?? "none";
      }
      // Pause and require the user to click Play so the next gesture unlocks
      // the audio chain, if it's still stuck after the grace period above.
      if (audioContextState === "suspended" && mediaSourceRef.current) {
        media.pause();
        isPlayingRef.current = false;
        setEngineIsPlaying(false);
        setIsPlaying(false);
        finishLoading();
        setNeedsUserPlay(true);
        return;
      }
      if (
        (audioContextState !== "running" &&
          mediaSourceRef.current &&
          route.elementAudioMode !== "user-volume") ||
        route.bypassWebAudio
      ) {
        applyElementAudioMode(
          media,
          "user-volume",
          isMutedRef.current,
          volumeRef.current,
        );
        debugAudio("playVideoWithAudio:native-audio-fallback", {
          audioContextState,
          bypassWebAudio: route.bypassWebAudio,
          currentTime: media.currentTime,
          elementAudioMode: route.elementAudioMode,
        });
      }
      debugAudio("playVideoWithAudio", {
        audioContextState,
        currentTime: media.currentTime,
        isAudioFxEnabled,
        lofiAmount,
        bitCrushAmount,
        sampleRateReductionAmount,
        bassAmount,
        midAmount,
        trebleAmount,
        stereoWidthAmount,
        smallSpeakerRoomAmount,
        isMuted,
        volume,
        routeInputMode: route.inputMode,
        routeElementAudioMode: route.elementAudioMode,
      });
      updateAudioNodes();
      syncVideoState();
      safeRender();
      scheduleRefreshLayout();
      window.requestAnimationFrame(updateAudioNodes);
    } catch (error) {
      const media = mediaRef.current;
      const retryAttempt =
        media instanceof HTMLVideoElement
          ? Number.parseInt(media.dataset[HLS_STARTUP_RETRY_DATASET_KEY] ?? "0", 10) || 0
          : 0;
      const shouldRetryHlsStartup =
        isHlsStartupRetryableError(media, error) &&
        !isPlaybackAttemptStale() &&
        retryAttempt < HLS_STARTUP_RETRY_DELAYS_MS.length;

      if (shouldRetryHlsStartup && media instanceof HTMLVideoElement) {
        const retryDelayMs = HLS_STARTUP_RETRY_DELAYS_MS[retryAttempt] ?? 0;
        media.dataset[HLS_STARTUP_RETRY_DATASET_KEY] = String(retryAttempt + 1);
        debugVideo("playVideoWithAudio:hls-startup-retry", {
          attempt: retryAttempt + 1,
          error: error instanceof Error ? error.message : String(error),
          currentTime: media.currentTime,
          paused: media.paused,
          readyState: media.readyState,
          retryDelayMs,
          src: media.currentSrc || media.src || null,
        });
        try {
          media.pause();
          if (retryDelayMs > 0) {
            await waitMs(retryDelayMs);
            if (isPlaybackAttemptStale()) {
              return;
            }
          }
          media.load();
          await waitForVideoFrame(media);
          if (isPlaybackAttemptStale()) {
            return;
          }
          await playVideoWithAudio();
          return;
        } catch (retryError) {
          debugVideo("playVideoWithAudio:hls-startup-retry-failed", {
            attempt: retryAttempt + 1,
            error: retryError instanceof Error ? retryError.message : String(retryError),
            currentTime: media.currentTime,
            paused: media.paused,
            readyState: media.readyState,
            src: media.currentSrc || media.src || null,
          });
        }
      }

      isPlayingRef.current = false;
      debugVideo("playVideoWithAudio:error", {
        error: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : null,
        currentTime: mediaRef.current?.currentTime ?? null,
        paused: mediaRef.current?.paused ?? null,
        readyState: mediaRef.current?.readyState ?? null,
        src: mediaRef.current?.currentSrc || mediaRef.current?.src || null,
      });
      setEngineIsPlaying(false);
      setIsPlaying(false);
      finishLoading();
      if (isHlsStartupRetryableError(media, error)) {
        media?.pause();
        setIsBuffering(false);
        syncVideoState();
        setNeedsUserPlay(true);
        _setPreviewError(retroT(locale, "hls-retry-preparing"));
        return;
      }
      if (isAutoplayBlockedError(error)) {
        syncVideoState();
        setNeedsUserPlay(true);
        _setPreviewError("");
        return;
      }

      setNeedsUserPlay(false);
      syncVideoState();
      _setPreviewError(resolvePreviewErrorMessage(error, locale, "playback-failed"));
    }
  };

  const ensureRendererReady = async () => {
    await initPixi();

    if (!appRef.current) {
      throw new Error("Canvas renderer is not ready yet.");
    }

    return appRef.current;
  };

  const ensureVisualStartupReady = async (
    kind: "video" | "image" | "capture",
  ) => {
    if (!filterState.isFilterEnabled) {
      return;
    }

    beginLoading(
      kind === "image" ? "Preparing shader preview..." : "Preparing video shader...",
    );
    await ensureFilterReady();
  };

  const attachVisualPreview = async (
    source: HTMLVideoElement | HTMLImageElement,
    kind: "video" | "image" | "capture",
    skipLayoutRefresh = false,
  ) => {
    const app = await ensureRendererReady();
    previewElementRef.current = source;
    fitSprite(app, null, source);
    setPreviewKindState(kind);
    setSourceDimensions(
      source instanceof HTMLVideoElement
        ? { width: source.videoWidth, height: source.videoHeight }
        : { width: source.naturalWidth, height: source.naturalHeight },
    );
    // skipLayoutRefresh=true (canReuseImagePreview): canvas size/CSS unchanged,
    // so skip the full refreshLayout() recalculation and just draw once.
    if (skipLayoutRefresh) {
      safeRender();
    } else {
      refreshLayout();
    }
    scheduleRefreshLayout();

    appRef.current?.ticker.start();
  };

  const attachNativeVideoPreview = (video: HTMLVideoElement) => {
    previewElementRef.current = null;
    setPreviewKindState("video");
    setSourceDimensions({ width: video.videoWidth, height: video.videoHeight });
    setViewportRect(null);
    safeRender();
    refreshLayout();
    scheduleRefreshLayout();
    appRef.current?.ticker.stop();
  };

  const attachNativeImagePreview = (image: HTMLImageElement) => {
    previewElementRef.current = image;
    setPreviewKindState("image");
    setSourceDimensions({ width: image.naturalWidth, height: image.naturalHeight });
    setViewportRect(null);
    safeRender();
    refreshLayout();
    scheduleRefreshLayout();
    appRef.current?.ticker.stop();
  };

  const previewFile = async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isAudio && !isImage) {
      _setPreviewError(retroT(locale, "unsupported-file-type"));
      return;
    }

    powerOn();
    cleanupPreview();
    resetFilterInstance();
    const requestId = previewRequestIdRef.current;
    _setPreviewError("");
    setPreviewName(file.name);
    beginLoading(
      isVideo ? "Loading video preview..." : isAudio ? "Loading audio preview..." : "Loading image preview...",
    );

    let url: string | null = null;

    try {
      url = URL.createObjectURL(file);
      objectUrlRef.current = url;

      if (isVideo || isAudio) {
        const onCreated = (element: HTMLVideoElement | HTMLAudioElement) => {
          applyMediaSettings(element);
          attachMediaEventListeners(element);
        };
        const mediaSource = isVideo
          ? await createVideoMediaSource({ url }, { onCreated })
          : await createAudioMediaSource({ url }, { onCreated });
        const media = mediaSource.element as HTMLVideoElement | HTMLAudioElement;

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, url);
          return;
        }

        mediaRef.current = media;

        if (media instanceof HTMLVideoElement) {
          if (shouldUseNativeVideoSurface(media, preferNativeVideoSurface)) {
            attachNativeVideoPreview(media);
          } else {
            await attachVisualPreview(media, "video");
            await ensureVisualStartupReady("video");
          }
        } else {
          previewElementRef.current = null;
          setPreviewKindState("audio");
          setSourceDimensions(null);
          setViewportRect(null);
          safeRender();
        }

        await connectMediaAudio(media);
        syncVideoState();
        await waitForMediaSwitchCooldown();
        if (autoPlayRef.current) {
          await playVideoWithAudio();
        } else {
          settleManualStartState();
        }
        if (requestId === previewRequestIdRef.current) {
          finishLoading();
        }
        return;
      }

      const imageSource = await createImageMediaSource({ url });
      const image = imageSource.element as HTMLImageElement;

      if (requestId !== previewRequestIdRef.current) {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
        return;
      }

      mediaRef.current = null;
      muteNoiseImmediately();
      updateAudioNodes();
      if (preferNativeVideoSurface) {
        attachNativeImagePreview(image);
      } else {
        await ensureRendererReady();
        await attachVisualPreview(image, "image");
        await ensureVisualStartupReady("image");
      }
      syncVideoState();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) {
        if (url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
        return;
      }

      const isAutoplayBlocked = isAutoplayBlockedError(error);
      if (isAutoplayBlocked) {
        recoverToManualPlayPrompt(error);
        return;
      }

      cleanupPreview();
      await resetAudioGraphAfterPreviewFailure("previewFile:error", error);
      _setPreviewError(resolvePreviewErrorMessage(error, locale, "video-preview-failed"));
      setNeedsUserPlay(false);
    }
  };

  const startDisplayCapture = async () => {
    powerOn();

    if (!navigator.mediaDevices?.getDisplayMedia) {
      _setPreviewError(retroT(locale, "capture-unsupported"));
      return;
    }

    cleanupPreview();
    const requestId = previewRequestIdRef.current;
    _setPreviewError("");
    setPreviewName("Display Capture");
    beginLoading("Preparing display capture...");

    try {
      await ensureRendererReady();
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (requestId !== previewRequestIdRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const videoSource = await createVideoMediaSource(
        { stream },
        {
          onCreated: (element) => {
            applyMediaSettings(element);
            attachMediaEventListeners(element);
            stream.getVideoTracks()[0]?.addEventListener("ended", () => {
              stopDisplayCapture();
            });
          },
          onDebugEvent: debugVideo,
        },
      );
      const video = videoSource.element as HTMLVideoElement;

      streamRef.current = stream;
      streamOwnedRef.current = true;
      mediaRef.current = video;
      await attachVisualPreview(video, "capture");
      await ensureVisualStartupReady("capture");
      await connectMediaAudio(video);
      setNeedsUserPlay(false);
      await waitForMediaSwitchCooldown();
      await playVideoWithAudio();
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      if (recoverToManualPlayPrompt(error)) {
        return;
      }

      cleanupPreview();
      await resetAudioGraphAfterPreviewFailure("startDisplayCapture:error", error);
      _setPreviewError(resolvePreviewErrorMessage(error, locale, "capture-failed"));
    }
  };

  const stopDisplayCapture = () => {
    if (previewKind !== "capture") return;
    cleanupPreview();
    setPreviewName("");
    _setPreviewError("");
  };

  const previewStream = async (
    stream: MediaStream,
    kind: "video" | "audio" = "video",
    name = "Media Stream",
  ) => {
    let requestId = 0;

    try {
      powerOn();
      cleanupPreview();
      resetFilterInstance();
      requestId = previewRequestIdRef.current;

      _setPreviewError("");
      setPreviewName(name);
      beginLoading(kind === "video" ? "Loading stream preview..." : "Loading stream audio...");
      await ensureRendererReady();

      if (kind === "video") {
        const videoSource = await createVideoMediaSource(
          { stream },
          {
            onCreated: (element) => {
              applyMediaSettings(element);
              attachMediaEventListeners(element);
            },
            onDebugEvent: debugVideo,
          },
        );
        const media = videoSource.element as HTMLVideoElement;

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, undefined, false);
          return;
        }

        streamRef.current = stream;
        streamOwnedRef.current = false;
        mediaRef.current = media;
        await attachVisualPreview(media, "capture");
        await ensureVisualStartupReady("capture");
        await connectMediaStream(stream, "VIDEO_STREAM");
      } else {
        const audioSource = await createAudioMediaSource(
          { stream },
          {
            onCreated: (element) => {
              applyMediaSettings(element);
              attachMediaEventListeners(element);
            },
          },
        );
        const media = audioSource.element as HTMLAudioElement;

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, undefined, false);
          return;
        }

        streamRef.current = stream;
        streamOwnedRef.current = false;
        mediaRef.current = media;
        previewElementRef.current = null;
        setPreviewKindState("audio");
        setSourceDimensions(null);
        setViewportRect(null);
        safeRender();
        await connectMediaStream(stream, "AUDIO_STREAM");
        syncVideoState();
      }

      if (requestId !== previewRequestIdRef.current) return;

      await waitForMediaSwitchCooldown();
      if (autoPlayRef.current) {
        await playVideoWithAudio();
      } else {
        settleManualStartState();
      }
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
      }
    } catch (error) {
      if (requestId !== previewRequestIdRef.current) return;

      if (recoverToManualPlayPrompt(error)) {
        return;
      }

      cleanupPreview();
      await resetAudioGraphAfterPreviewFailure("previewStream:error", error);
      _setPreviewError(resolvePreviewErrorMessage(error, locale, "playback-failed"));
    }
  };

  const previewUrl = async (
    url: string,
    kind: "video" | "image" | "audio" = "video",
    displayName?: string,
  ) => {
    let requestId = 0;
    const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsedMs = () =>
      Math.round(
        ((typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt) * 10,
      ) / 10;
    const canReuseImagePreview =
      kind === "image" &&
      previewKindRef.current === "image" &&
      appRef.current !== null &&
      previewElementRef.current instanceof HTMLImageElement &&
      mediaRef.current === null;

    try {
      debugVideo("startup:previewUrl:start", {
        url,
        kind,
        canReuseImagePreview,
      });
      powerOn();
      if (canReuseImagePreview) {
        previewRequestIdRef.current += 1;
        requestId = previewRequestIdRef.current;
        finishLoading();
        setNeedsUserPlay(false);
        setIsBuffering(false);
        isPlayingRef.current = false;
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      } else {
        cleanupPreview();
        resetFilterInstance();
        requestId = previewRequestIdRef.current;
      }

      _setPreviewError("");
      setPreviewName(displayName || url);
      beginLoading(
        kind === "video"
          ? "Loading video preview..."
          : kind === "image"
            ? "Loading image preview..."
            : "Loading audio preview...",
      );
      debugVideo("startup:previewUrl:renderer-ready", {
        kind,
        elapsedMs: elapsedMs(),
      });

      if (kind === "video") {
        const videoSource = await createVideoMediaSource(
          { url },
          {
            onCreated: (element) => {
              applyMediaSettings(element);
              attachMediaEventListeners(element);
              previewElementRef.current = element;
              mediaRef.current = element;
              setPreviewKindState("video");
              setSourceDimensions(null);
              setViewportRect(null);
              safeRender();
            },
            onDebugEvent: debugVideo,
          },
        );
        const media = videoSource.element as HTMLVideoElement;
        debugVideo("startup:previewUrl:video-ready", {
          elapsedMs: elapsedMs(),
          readyState: media.readyState,
          videoWidth: media.videoWidth,
          videoHeight: media.videoHeight,
        });

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(media, url);
          return;
        }

        if (shouldUseNativeVideoSurface(media, preferNativeVideoSurface)) {
          attachNativeVideoPreview(media);
        } else {
          await ensureRendererReady();
          await attachVisualPreview(media, "video");
          await ensureVisualStartupReady("video");
        }
        await connectMediaAudio(media);
        syncVideoState();
      } else if (kind === "image") {
        const imageSource = await createImageMediaSource({ url });
        const image = imageSource.element as HTMLImageElement;
        debugVideo("startup:previewUrl:image-ready", {
          elapsedMs: elapsedMs(),
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        });

        if (requestId !== previewRequestIdRef.current) {
          return;
        }

        mediaRef.current = null;
        muteNoiseImmediately();
        updateAudioNodes();
        if (preferNativeVideoSurface) {
          attachNativeImagePreview(image);
        } else {
          await ensureRendererReady();
          await attachVisualPreview(image, "image", canReuseImagePreview);
          await ensureVisualStartupReady("image");
        }
        syncVideoState();
      } else {
        const audioSource = await createAudioMediaSource(
          { url },
          {
            onCreated: (element) => {
              applyMediaSettings(element);
              attachMediaEventListeners(element);
            },
          },
        );
        const audio = audioSource.element as HTMLAudioElement;
        debugVideo("startup:previewUrl:audio-ready", {
          elapsedMs: elapsedMs(),
          readyState: audio.readyState,
          duration: audio.duration,
        });

        if (requestId !== previewRequestIdRef.current) {
          releaseDetachedMedia(audio, url);
          return;
        }

        previewElementRef.current = null;
        setPreviewKindState("audio");
        setSourceDimensions(null);
        setViewportRect(null);
        mediaRef.current = audio;
        safeRender();
        await ensureRendererReady();
        await connectMediaAudio(audio);
        syncVideoState();
      }

      if (requestId !== previewRequestIdRef.current) return;

      if ((kind === "video" || kind === "audio") && autoPlayRef.current) {
        await waitForMediaSwitchCooldown();
        await playVideoWithAudio();
      } else if (kind === "video" || kind === "audio") {
        settleManualStartState();
      }
      if (requestId === previewRequestIdRef.current) {
        finishLoading();
        debugVideo("startup:previewUrl:done", {
          kind,
          elapsedMs: elapsedMs(),
        });
      }
    } catch (error) {
      debugVideo("startup:previewUrl:error", {
        kind,
        elapsedMs: elapsedMs(),
        error: error instanceof Error ? error.message : String(error),
      });
      if (requestId !== previewRequestIdRef.current) return;

      if (recoverToManualPlayPrompt(error)) {
        return;
      }

      const fallbackCode =
        kind === "audio" ? "audio-load-failed" : kind === "image" ? "image-load-failed" : "video-preview-failed";

      if (kind === "video" && isHlsStartupRetryableError(mediaRef.current, error)) {
        finishLoading();
        setNeedsUserPlay(false);
        syncVideoState();
        _setPreviewError(resolvePreviewErrorMessage(error, locale, fallbackCode));
        return;
      }

      cleanupPreview();
      _setPreviewError(resolvePreviewErrorMessage(error, locale, fallbackCode));
      await resetAudioGraphAfterPreviewFailure("previewUrl:error", error);
    }
  };

  return {
    cancelPendingPlaybackStart,
    cleanupPreview,
    cleanupForPageLeave,
    playVideoWithAudio,
    restartCurrentMedia,
    previewFile,
    previewStream,
    previewUrl,
    startDisplayCapture,
    stopDisplayCapture,
    syncVideoState,
    releaseDetachedMedia,
    ensurePixiReady: ensureRendererReady,
  };
}
