// Framework-agnostic "media input" boundary: create a video/audio/image
// element, wait until it has enough data to be usable, and decide whether
// native passthrough or the WebGL/Web Audio pipeline should handle it.
//
// Scope is intentionally narrow — this module does NOT own:
//   - ongoing playback-state event wiring (play/pause/timeupdate/HLS retry
//     logic etc.) — that stays in useRetroPreviewMedia.ts, tightly coupled
//     to React state setters.
//   - Web Audio connection (connectMediaAudio/connectMediaStream/
//     connectSourceNode) — that stays in useRetroAudioEngine.ts /
//     TetoricaRetroAudioNode.ts. Callers pass this module's `element`
//     straight into those unchanged.
//   - teardown (releaseDetachedMedia/cleanupPreview) — stays in the hook.
// See docs/plans (media input interface refactor) for the full rationale.
//
// Errors thrown here are RetroPreviewError instances: their .message is a
// short English technical string (safe to log to the console regardless of
// the host app's locale), and their .code is what callers use to look up a
// localized, user-facing message via resolvePreviewErrorMessage()/retroT()
// (see ../i18n.ts) — this module itself never picks a locale.
import { RetroPreviewError } from "../i18n";

export type RetroMediaElement = HTMLVideoElement | HTMLAudioElement | HTMLImageElement;
export type RetroMediaSourceKind = "video" | "audio" | "image";
// Tone.js / screen-capture audio is modeled as an "audio" kind with a
// "stream" origin — not a separate kind. Tone.js runs on its own
// AudioContext and is bridged out via createMediaStreamDestination() in
// src/builtin-content/demo-song-session.ts; by the time it reaches this
// module it's just a MediaStream like any other.
export type RetroMediaSourceOrigin = "url" | "stream";

export type RetroMediaSource = {
  readonly kind: RetroMediaSourceKind;
  readonly origin: RetroMediaSourceOrigin;
  /** Same object identity for the source's lifetime — callers keep their own ref. */
  readonly element: RetroMediaElement;
};

export type CreateVideoSourceOptions = { url: string } | { stream: MediaStream };
export type CreateAudioSourceOptions = { url: string } | { stream: MediaStream };
export type CreateImageSourceOptions = { url: string };

type DebugEventCallback = (label: string, payload: Record<string, unknown>) => void;

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

/**
 * Mirrors useRetroPreviewMedia.ts's waitForVideoFrame exactly, including the
 * 8s timeout safety net and the lack of a MediaStream short-circuit (video
 * always goes through the full load()+event-wait+timeout dance today, even
 * for srcObject-backed sources — that asymmetry with waitForAudioReady is
 * intentional, not a bug, and must not be "fixed" here).
 */
export function waitForVideoReady(
  video: HTMLVideoElement,
  onDebugEvent?: DebugEventCallback,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
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
      onDebugEvent?.("waitForVideoReady:event-ready", describeState(eventName));
      cleanup();
      resolve();
    };
    const handleLoadedData = () => { handleReady("loadeddata"); };
    const handleCanPlay = () => { handleReady("canplay"); };

    const handleError = () => {
      onDebugEvent?.("waitForVideoReady:event-error", describeState("error"));
      cleanup();
      reject(
        new RetroPreviewError(
          "video-load-failed",
          `Failed to load video. src=${video.currentSrc || video.src || "(empty)"} reason=${describeMediaError(video.error)}`,
        ),
      );
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      onDebugEvent?.("waitForVideoReady:already-ready", describeState("sync-check"));
      resolve();
      return;
    }

    // Diagnostic: some Safari builds have been observed to never fire
    // `loadeddata`/`canplay` for certain blob-URL sources even though
    // `readyState` does advance — log periodically so a stuck "Loading
    // video preview..." can be diagnosed from the console.
    const pollId = window.setInterval(() => {
      onDebugEvent?.("waitForVideoReady:poll", describeState("poll"));
    }, 1000);

    // Safety net: if neither a ready nor an error event ever fires, don't
    // hang forever. Fall back to whatever readyState says after a timeout.
    const timeoutId = window.setTimeout(() => {
      onDebugEvent?.("waitForVideoReady:timeout", describeState("timeout"));
      cleanup();
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        resolve();
      } else {
        reject(
          new RetroPreviewError(
            "video-load-timeout",
            `Video load timed out. src=${video.currentSrc || video.src || "(empty)"} readyState=${video.readyState}`,
          ),
        );
      }
    }, 8000);

    video.addEventListener("loadeddata", handleLoadedData, { once: true });
    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleError, { once: true });
    video.load();
  });
}

/**
 * Mirrors useRetroPreviewMedia.ts's waitForAudioReady exactly: resolves
 * immediately (skipping load()) for MediaStream-backed sources — Safari
 * never fires loadedmetadata/canplay for srcObject MediaStreams — and has
 * NO timeout on the URL-based path (do not add one here).
 */
export function waitForAudioReady(audio: HTMLAudioElement): Promise<void> {
  return new Promise<void>((resolve, reject) => {
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
        new RetroPreviewError(
          "audio-load-failed",
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
    // Skip load() and resolve immediately — the caller's playback-start flow
    // handles errors from there.
    if (audio.srcObject instanceof MediaStream) {
      resolve();
      return;
    }

    audio.addEventListener("loadedmetadata", handleReady, { once: true });
    audio.addEventListener("canplay", handleReady, { once: true });
    audio.addEventListener("error", handleError, { once: true });
    audio.load();
  });
}

/** Mirrors useRetroPreviewMedia.ts's waitForImageFrame exactly. */
export function waitForImageReady(image: HTMLImageElement): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      image.removeEventListener("load", handleReady);
      image.removeEventListener("error", handleError);
    };

    const handleReady = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      reject(new RetroPreviewError("image-load-failed", "Failed to load image."));
    };

    if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
      resolve();
      return;
    }

    image.addEventListener("load", handleReady, { once: true });
    image.addEventListener("error", handleError, { once: true });
  });
}

export async function createVideoMediaSource(
  options: CreateVideoSourceOptions,
  callbacks?: {
    /**
     * Called synchronously right after src/srcObject is set, before
     * waiting for readiness begins. Existing call sites attach their own
     * playback-event listeners and media settings (mute/volume/etc.) here —
     * doing that AFTER waitForVideoReady would miss any of those events
     * (loadstart, waiting, stalled, ...) that fire during the wait itself.
     */
    onCreated?: (video: HTMLVideoElement) => void;
    onDebugEvent?: DebugEventCallback;
  },
): Promise<RetroMediaSource> {
  const video = document.createElement("video");
  if ("stream" in options) {
    video.srcObject = options.stream;
  } else {
    video.src = options.url;
  }
  callbacks?.onCreated?.(video);
  await waitForVideoReady(video, callbacks?.onDebugEvent);
  return { kind: "video", origin: "stream" in options ? "stream" : "url", element: video };
}

export async function createAudioMediaSource(
  options: CreateAudioSourceOptions,
  callbacks?: {
    /** Same rationale as createVideoMediaSource's onCreated. */
    onCreated?: (audio: HTMLAudioElement) => void;
  },
): Promise<RetroMediaSource> {
  const audio = document.createElement("audio");
  if ("stream" in options) {
    audio.srcObject = options.stream;
  } else {
    audio.src = options.url;
  }
  callbacks?.onCreated?.(audio);
  await waitForAudioReady(audio);
  return { kind: "audio", origin: "stream" in options ? "stream" : "url", element: audio };
}

export async function createImageMediaSource(
  options: CreateImageSourceOptions,
): Promise<RetroMediaSource> {
  const image = new Image();
  image.src = options.url;
  // Both existing call sites (previewFile, previewUrl) set this immediately
  // after src, in this order — kept as-is rather than reordered.
  image.crossOrigin = "anonymous";
  await waitForImageReady(image);
  return { kind: "image", origin: "url", element: image };
}

/**
 * Mirrors useRetroPreviewMedia.ts's shouldUseNativeVideoSurfaceForMedia
 * exactly. Only ever meaningful for HTMLMediaElement (video/audio) — image
 * has no "native surface" to swap to.
 */
export function shouldUseNativeVideoSurface(
  media: HTMLMediaElement,
  preferNativeVideoSurface: boolean,
): boolean {
  return preferNativeVideoSurface && media instanceof HTMLVideoElement;
}

/**
 * Mirrors useRetroPreviewMedia.ts's shouldBypassWebAudioForMedia exactly.
 * Native mode is a full passthrough regardless of media kind: the Web Audio
 * FX chain drops out the same way the WebGL retro filter does. Unlike
 * shouldUseNativeVideoSurface, this doesn't require an HTMLVideoElement —
 * the `media` param is kept for signature symmetry / future use even though
 * today's logic only checks the raw setting.
 */
export function shouldBypassWebAudio(
  _media: HTMLMediaElement,
  preferNativeVideoSurface: boolean,
): boolean {
  return preferNativeVideoSurface;
}
