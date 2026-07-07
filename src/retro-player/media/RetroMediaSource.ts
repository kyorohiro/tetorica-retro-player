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
// Type-only: the actual hls.js module is dynamically imported inside
// attachHlsSource, so builds/platforms that never touch an .m3u8 source
// (e.g. the plain web build, which has no mDrop/ffmpeg HLS server to talk
// to) never pay for it in their bundle.
import type Hls from "hls.js";
import { RetroPreviewError } from "../i18n";

export type RetroMediaElement = HTMLVideoElement | HTMLAudioElement | HTMLImageElement;
export type RetroMediaSourceKind = "video" | "audio" | "image";
// Tone.js / screen-capture audio is modeled as an "audio" kind with a
// "stream" origin — not a separate kind. Tone.js runs on its own
// AudioContext and is bridged out via createMediaStreamDestination() in
// src/retro-player-client/builtin-content/demo-song-session.ts; by the time it reaches this
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

// .m3u8 sources always go through hls.js rather than native <video src>
// playback. The native engine was found to under-prioritize manifest
// re-polling/duration updates for a <video> element that's never attached
// to the DOM (this app's default rendering path — PixiJS reads frames into
// a WebGL canvas for the retro-filter effect instead), which caused
// still-transcoding (EVENT-type, no #EXT-X-ENDLIST yet) streams to appear
// to end early. hls.js implements manifest polling and end-of-stream
// detection itself via MediaSource, independent of that native behavior.
const hlsInstances = new WeakMap<HTMLVideoElement, Hls>();
const hlsSourceUrls = new WeakMap<HTMLVideoElement, string>();

export const isHlsUrl = (url: string): boolean => url.includes(".m3u8");

export const getHlsInstance = (video: HTMLVideoElement): Hls | undefined =>
  hlsInstances.get(video);

export const getHlsSourceUrl = (video: HTMLVideoElement): string | undefined =>
  hlsSourceUrls.get(video);

export const destroyHlsInstance = (video: HTMLVideoElement): void => {
  const hls = hlsInstances.get(video);
  hlsSourceUrls.delete(video);
  if (!hls) return;
  hls.destroy();
  hlsInstances.delete(video);
};

const canUseNativeHls = (video: HTMLVideoElement): boolean =>
  Boolean(
    video.canPlayType("application/vnd.apple.mpegurl") ||
    video.canPlayType("application/x-mpegURL"),
  );

/**
 * Attach hls.js to `video` for `url`. hls.js's own network/media errors
 * don't set the native video.error or fire the native "error" event, so
 * existing error handling (waitForVideoReady's error listener,
 * RetroPlayerPlus's onError) would never see them. Follow hls.js's
 * documented recovery pattern for fatal errors, capped at 3 attempts each,
 * and only once truly unrecoverable, dispatch a synthetic native "error"
 * event to reuse all the existing native-error plumbing unchanged.
 */
export const attachHlsSource = async (video: HTMLVideoElement, url: string): Promise<Hls> => {
  destroyHlsInstance(video);

  const { default: HlsCtor } = await import("hls.js");
  const hls = new HlsCtor({
    autoStartLoad: true,
    startPosition: 0,
  });
  let networkRetries = 0;
  let mediaRetries = 0;
  let sourceLoaded = false;

  const logHls = (label: string, payload?: Record<string, unknown>) => {
    console.log("[retro-player hls]", label, {
      url,
      currentSrc: video.currentSrc || video.src || null,
      readyState: video.readyState,
      networkState: video.networkState,
      ...payload,
    });
  };

  hls.on(HlsCtor.Events.MEDIA_ATTACHED, () => {
    logHls("media-attached");
    if (sourceLoaded) {
      return;
    }
    sourceLoaded = true;
    hls.loadSource(url);
  });

  hls.on(HlsCtor.Events.MANIFEST_PARSED, (_event, data) => {
    logHls("manifest-parsed", {
      audioTracks: data.audioTracks?.length ?? 0,
      firstLevelBitrate: data.firstLevel?.bitrate ?? null,
      levels: data.levels?.length ?? 0,
    });
  });

  hls.on(HlsCtor.Events.LEVEL_LOADED, (_event, data) => {
    logHls("level-loaded", {
      endCC: data.details.endCC,
      fragments: data.details.fragments.length,
      live: data.details.live,
      targetduration: data.details.targetduration,
      totalduration: data.details.totalduration,
    });
  });

  hls.on(HlsCtor.Events.FRAG_LOADED, (_event, data) => {
    logHls("frag-loaded", {
      sn: data.frag.sn,
      type: data.frag.type,
      duration: data.frag.duration,
    });
  });

  hls.on(HlsCtor.Events.ERROR, (_event, data) => {
    logHls("error", {
      details: data.details,
      fatal: data.fatal,
      responseCode: data.response?.code ?? null,
      type: data.type,
    });
    if (!data.fatal) return;
    switch (data.type) {
      case HlsCtor.ErrorTypes.NETWORK_ERROR:
        if (networkRetries < 3) {
          networkRetries += 1;
          hls.startLoad();
          return;
        }
        break;
      case HlsCtor.ErrorTypes.MEDIA_ERROR:
        if (mediaRetries < 3) {
          mediaRetries += 1;
          hls.recoverMediaError();
          return;
        }
        break;
      default:
        break;
    }
    destroyHlsInstance(video);
    video.dispatchEvent(new Event("error"));
  });

  hlsInstances.set(video, hls);
  hlsSourceUrls.set(video, url);
  hls.attachMedia(video);
  return hls;
};

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
    const timeoutMs = getHlsInstance(video) ? 20000 : 8000;
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
    }, timeoutMs);

    video.addEventListener("loadeddata", handleLoadedData, { once: true });
    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleError, { once: true });
    // hls.js already triggers loading via attachMedia()/loadSource() —
    // calling video.load() ourselves here would reset its MediaSource
    // attachment mid-setup. The listeners above still fire normally once
    // hls.js starts feeding the MediaSource.
    if (!getHlsInstance(video)) {
      video.load();
    }
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
  } else if (isHlsUrl(options.url)) {
    try {
      await attachHlsSource(video, options.url);
    } catch (error) {
      if (!canUseNativeHls(video)) {
        throw error;
      }
      console.warn("[retro-player hls] falling back to native playback after attach failure", {
        url: options.url,
        error: error instanceof Error ? error.message : String(error),
      });
      destroyHlsInstance(video);
      video.src = options.url;
    }
  } else {
    video.src = options.url;
  }
  callbacks?.onCreated?.(video);
  try {
    await waitForVideoReady(video, callbacks?.onDebugEvent);
  } catch (error) {
    if (!("url" in options) || !isHlsUrl(options.url) || !canUseNativeHls(video) || !getHlsInstance(video)) {
      throw error;
    }
    console.warn("[retro-player hls] falling back to native playback after readiness failure", {
      url: options.url,
      error: error instanceof Error ? error.message : String(error),
    });
    destroyHlsInstance(video);
    video.src = options.url;
    callbacks?.onCreated?.(video);
    await waitForVideoReady(video, callbacks?.onDebugEvent);
  }
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
