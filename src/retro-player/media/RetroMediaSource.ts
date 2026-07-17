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
import type { HlsConfig } from "hls.js";
import { RetroPreviewError } from "../i18n";
import { getPreferNativeHlsOverride } from "../hooks/persistedRetroSettings";
import { isAppleWebKitFamily } from "../platform/runtime";
import { shouldBypassPlaybackWebAudio } from "./RetroAudioRouting";

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
type CachedImageEntry = {
  image: HTMLImageElement;
  lastAccessedAt: number;
};

// .m3u8 sources always go through hls.js rather than native <video src>
// playback. The native engine was found to under-prioritize manifest
// re-polling/duration updates for a <video> element that's never attached
// to the DOM (this app's default rendering path — PixiJS reads frames into
// a WebGL canvas for the retro-filter effect instead), which caused
// still-transcoding (EVENT-type, no #EXT-X-ENDLIST yet) streams to appear
// to end early. hls.js implements manifest polling and end-of-stream
// detection itself via MediaSource, independent of that native behavior.
const hlsInstances = new WeakMap<HTMLMediaElement, Hls>();
const hlsSourceUrls = new WeakMap<HTMLMediaElement, string>();
const HLS_STARTUP_MIN_BUFFER_SECONDS = 12;
const HLS_STARTUP_READY_TIMEOUT_MS = 60000;
const IMAGE_ELEMENT_CACHE_LIMIT = 12;
const cachedImages = new Map<string, CachedImageEntry>();
const pendingImageElements = new Map<string, Promise<HTMLImageElement>>();

const touchCachedImage = (url: string, image: HTMLImageElement) => {
  cachedImages.delete(url);
  cachedImages.set(url, {
    image,
    lastAccessedAt: Date.now(),
  });
  while (cachedImages.size > IMAGE_ELEMENT_CACHE_LIMIT) {
    const oldest = [...cachedImages.entries()]
      .sort((a, b) => a[1].lastAccessedAt - b[1].lastAccessedAt)[0];
    if (!oldest) {
      break;
    }
    cachedImages.delete(oldest[0]);
  }
};

export const getCachedImageElement = (url: string): HTMLImageElement | null => {
  const cached = cachedImages.get(url);
  if (!cached) {
    return null;
  }
  touchCachedImage(url, cached.image);
  return cached.image;
};

const getBufferedEnd = (media: HTMLMediaElement): number => {
  const ranges = media.buffered;
  if (!ranges || ranges.length === 0) return 0;
  try {
    return ranges.end(ranges.length - 1);
  } catch {
    return 0;
  }
};

const hasEnoughHlsStartupBuffer = (media: HTMLMediaElement): boolean => {
  if (!getHlsInstance(media)) {
    return true;
  }
  const duration = Number.isFinite(media.duration) ? media.duration : 0;
  const bufferedEnd = getBufferedEnd(media);
  return Math.max(duration, bufferedEnd) >= HLS_STARTUP_MIN_BUFFER_SECONDS;
};

export const isHlsUrl = (url: string): boolean =>
  url.includes(".m3u8") ||
  /\/hls-sub\/|\/audio-hls-sub\/|\/audio-hls\/.+\/index\.m3u8(?:$|\?)/.test(url) ||
  /\/hls\/.+\/index\.m3u8(?:$|\?)/.test(url);

const shouldAllowNativeHlsFallback = (url: string): boolean =>
  !(/\/hls-sub\/|\/audio-hls-sub\//.test(url));

const shouldPreferNativeAppleHls = (): boolean => {
  const override = getPreferNativeHlsOverride();
  if (typeof override === "boolean") {
    return override;
  }
  if (typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent ?? "";
  const vendor = navigator.vendor ?? "";
  const isAppleVendor = /Apple/i.test(vendor);
  const isWebKit = /AppleWebKit/i.test(ua);
  const isChromiumFamily = /Chrome|Chromium|CriOS|Edg|OPR|SamsungBrowser|DuckDuckGo/i.test(ua);
  return isAppleVendor && isWebKit && !isChromiumFamily;
};

const shouldPreferNativeSubpathHls = (
  media: HTMLMediaElement,
  url: string,
): boolean =>
  /\/hls-sub\/|\/audio-hls-sub\//.test(url) &&
  canUseNativeHls(media) &&
  shouldPreferNativeAppleHls();

export const getHlsInstance = (media: HTMLMediaElement): Hls | undefined =>
  hlsInstances.get(media);

export const getHlsSourceUrl = (media: HTMLMediaElement): string | undefined =>
  hlsSourceUrls.get(media);

export const destroyHlsInstance = (media: HTMLMediaElement): void => {
  const hls = hlsInstances.get(media);
  hlsSourceUrls.delete(media);
  if (!hls) return;
  hls.destroy();
  hlsInstances.delete(media);
};

const canUseNativeHls = (media: HTMLMediaElement): boolean =>
  Boolean(
    media.canPlayType("application/vnd.apple.mpegurl") ||
    media.canPlayType("application/x-mpegURL"),
  );

/**
 * Attach hls.js to `video` for `url`. hls.js's own network/media errors
 * don't set the native video.error or fire the native "error" event, so
 * existing error handling (waitForVideoReady's error listener,
 * RetroPlayerClient's onError) would never see them. Follow hls.js's
 * documented recovery pattern for fatal errors, capped at 3 attempts each,
 * and only once truly unrecoverable, dispatch a synthetic native "error"
 * event to reuse all the existing native-error plumbing unchanged.
 */
export const attachHlsSource = async (media: HTMLMediaElement, url: string): Promise<Hls> => {
  destroyHlsInstance(media);
  console.log("[retro-player hls]", "attach:start", {
    url,
    currentSrc: media.currentSrc || media.src || null,
    readyState: media.readyState,
    networkState: media.networkState,
  });

  const { default: HlsCtor } = await import("hls.js");
  console.log("[retro-player hls]", "attach:module-ready", {
    url,
    isSupported: typeof HlsCtor.isSupported === "function" ? HlsCtor.isSupported() : null,
    hasDefault: Boolean(HlsCtor),
  });
  const advancedConfig: Partial<HlsConfig> = {
    autoStartLoad: false,
    backBufferLength: 0,
    initialLiveManifestSize: 3,
    lowLatencyMode: false,
    // Our ffmpeg-generated manifests are "pseudo-live": they grow quickly
    // from segment 0 while a finite local file is being transcoded. Chrome's
    // hls.js path can otherwise drift toward the live edge and start pulling
    // far-future segments before the early ones have played. Pin the live
    // sync window absurdly far back so playback starts from the beginning.
    liveMaxLatencyDurationCount: 999999,
    liveSyncDurationCount: 999999,
    // Keep the media timeline open-ended while ffmpeg is still appending
    // segments. With a finite duration here, Chrome can decide the stream is
    // over around the first manifest window (roughly 10s) before later
    // segments are observed.
    liveDurationInfinity: true,
    liveSyncMode: "buffered",
    maxBufferLength: 120,
    maxFragLookUpTolerance: 0,
    maxMaxBufferLength: 180,
    startPosition: 0,
    startOnSegmentBoundary: true,
  };
  const fallbackConfig: Partial<HlsConfig> = {
    autoStartLoad: false,
    backBufferLength: 0,
    liveDurationInfinity: true,
    maxBufferLength: 120,
    maxMaxBufferLength: 180,
    startPosition: 0,
  };
  let hls: Hls;
  try {
    hls = new HlsCtor(advancedConfig);
    console.log("[retro-player hls]", "attach:instance-created", {
      url,
      configMode: "advanced",
    });
  } catch (error) {
    console.error("[retro-player hls]", "attach:instance-create-failed", {
      url,
      configMode: "advanced",
      error: error instanceof Error ? error.message : String(error),
    });
    hls = new HlsCtor(fallbackConfig);
    console.log("[retro-player hls]", "attach:instance-created", {
      url,
      configMode: "fallback",
    });
  }
  let networkRetries = 0;
  let mediaRetries = 0;
  let sourceLoaded = false;

  const logHls = (label: string, payload?: Record<string, unknown>) => {
    console.log("[retro-player hls]", label, {
      url,
      currentSrc: media.currentSrc || media.src || null,
      readyState: media.readyState,
      networkState: media.networkState,
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
      firstLevelBitrate:
        typeof data.firstLevel === "number"
          ? data.levels?.[data.firstLevel]?.bitrate ?? null
          : null,
      levels: data.levels?.length ?? 0,
    });
    hls.startLoad(0);
  });

  hls.on(HlsCtor.Events.LEVEL_LOADED, (_event, data) => {
    logHls("level-loaded", {
      bufferedEnd: getBufferedEnd(media),
      currentTime: media.currentTime,
      endCC: data.details.endCC,
      enoughStartupBuffer: hasEnoughHlsStartupBuffer(media),
      fragments: data.details.fragments.length,
      live: data.details.live,
      mediaDuration: Number.isFinite(media.duration) ? media.duration : null,
      targetduration: data.details.targetduration,
      totalduration: data.details.totalduration,
    });
  });

  hls.on(HlsCtor.Events.FRAG_LOADED, (_event, data) => {
    logHls("frag-loaded", {
      duration: data.frag.duration,
      bufferedEnd: getBufferedEnd(media),
      currentTime: media.currentTime,
      sn: data.frag.sn,
      type: data.frag.type,
    });
  });

  hls.on(HlsCtor.Events.FRAG_LOADING, (_event, data) => {
    logHls("frag-loading", {
      bufferedEnd: getBufferedEnd(media),
      currentTime: media.currentTime,
      level: data.frag.level,
      sn: data.frag.sn,
      start: data.frag.start,
      type: data.frag.type,
    });
  });

  hls.on(HlsCtor.Events.ERROR, (_event, data) => {
    logHls("error", {
      bufferedEnd: getBufferedEnd(media),
      currentTime: media.currentTime,
      details: data.details,
      fatal: data.fatal,
      mediaDuration: Number.isFinite(media.duration) ? media.duration : null,
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
    destroyHlsInstance(media);
    media.dispatchEvent(new Event("error"));
  });

  hlsInstances.set(media, hls);
  hlsSourceUrls.set(media, url);
  console.log("[retro-player hls]", "attach:attach-media", {
    url,
  });
  hls.attachMedia(media);
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
    const timeoutMs = getHlsInstance(video) ? HLS_STARTUP_READY_TIMEOUT_MS : 8000;
    const describeState = (label: string) => ({
      bufferedEnd: getBufferedEnd(video),
      label,
      src: video.currentSrc || video.src || "(empty)",
      duration: Number.isFinite(video.duration) ? video.duration : 0,
      hasEnoughHlsStartupBuffer: hasEnoughHlsStartupBuffer(video),
      hasHls: Boolean(getHlsInstance(video)),
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
      if (getHlsInstance(video) && !hasEnoughHlsStartupBuffer(video)) {
        onDebugEvent?.("waitForVideoReady:hls-startup-buffering", describeState(eventName));
        return;
      }
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
      if (
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        hasEnoughHlsStartupBuffer(video)
      ) {
        handleReady("poll-ready");
      }
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
    if (!getHlsInstance(audio)) {
      audio.load();
    }
  });
}

/** Mirrors useRetroPreviewMedia.ts's waitForImageFrame exactly. */
export function waitForImageReady(image: HTMLImageElement): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsedMs = () =>
      Math.round(
        ((typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt) * 10,
      ) / 10;
    const imageSrc = image.currentSrc || image.src || "(empty)";
    console.log("[retro-player image]", "waitForImageReady:start", {
      src: imageSrc,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    });
    const cleanup = () => {
      image.removeEventListener("load", handleReady);
      image.removeEventListener("error", handleError);
    };

    const handleReady = () => {
      console.log("[retro-player image]", "waitForImageReady:ready", {
        src: image.currentSrc || image.src || imageSrc,
        elapsedMs: elapsedMs(),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      });
      cleanup();
      resolve();
    };

    const handleError = () => {
      console.log("[retro-player image]", "waitForImageReady:error", {
        src: image.currentSrc || image.src || imageSrc,
        elapsedMs: elapsedMs(),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      });
      cleanup();
      reject(new RetroPreviewError("image-load-failed", "Failed to load image."));
    };

    if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
      console.log("[retro-player image]", "waitForImageReady:already-ready", {
        src: image.currentSrc || image.src || imageSrc,
        elapsedMs: elapsedMs(),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      });
      resolve();
      return;
    }

    image.addEventListener("load", handleReady, { once: true });
    image.addEventListener("error", handleError, { once: true });
  });
}

export async function primeImageElementCache(url: string): Promise<void> {
  if (!url || getCachedImageElement(url) || pendingImageElements.has(url)) {
    return;
  }

  const loadPromise = (async () => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    await waitForImageReady(image);
    if (typeof image.decode === "function") {
      try {
        await image.decode();
      } catch {
        // Some browsers reject decode() for already-usable images.
      }
    }
    touchCachedImage(url, image);
    return image;
  })();

  pendingImageElements.set(url, loadPromise);
  try {
    await loadPromise;
  } finally {
    pendingImageElements.delete(url);
  }
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
  console.log("[retro-player media]", "createVideoMediaSource:start", {
    sourceType: "stream" in options ? "stream" : "url",
    url: "url" in options ? options.url : null,
  });
  if ("stream" in options) {
    video.srcObject = options.stream;
  } else if (isHlsUrl(options.url)) {
    console.log("[retro-player media]", "createVideoMediaSource:hls-detected", {
      url: options.url,
      nativeSubpathPreferred: shouldPreferNativeSubpathHls(video, options.url),
      nativeHlsCapable: canUseNativeHls(video),
    });
    if (shouldPreferNativeSubpathHls(video, options.url)) {
      video.src = options.url;
    } else {
      try {
        console.log("[retro-player media]", "createVideoMediaSource:hls-attach-start", {
          url: options.url,
        });
        await attachHlsSource(video, options.url);
        console.log("[retro-player media]", "createVideoMediaSource:hls-attach-done", {
          url: options.url,
        });
      } catch (error) {
        if (!canUseNativeHls(video) || !shouldAllowNativeHlsFallback(options.url)) {
          throw error;
        }
        console.warn("[retro-player hls] falling back to native playback after attach failure", {
          url: options.url,
          error: error instanceof Error ? error.message : String(error),
        });
        destroyHlsInstance(video);
        video.src = options.url;
      }
    }
  } else {
    video.src = options.url;
  }
  callbacks?.onCreated?.(video);
  try {
    await waitForVideoReady(video, callbacks?.onDebugEvent);
  } catch (error) {
    if (
      !("url" in options) ||
      !isHlsUrl(options.url) ||
      !canUseNativeHls(video) ||
      !getHlsInstance(video) ||
      !shouldAllowNativeHlsFallback(options.url)
    ) {
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
  console.log("[retro-player media]", "createVideoMediaSource:ready", {
    sourceType: "stream" in options ? "stream" : "url",
    url: "url" in options ? options.url : null,
    currentSrc: video.currentSrc || video.src || null,
    readyState: video.readyState,
  });
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
  } else if (isHlsUrl(options.url)) {
    if (shouldPreferNativeSubpathHls(audio, options.url)) {
      audio.src = options.url;
    } else if (canUseNativeHls(audio) && shouldAllowNativeHlsFallback(options.url)) {
      audio.src = options.url;
    } else {
      await attachHlsSource(audio, options.url);
    }
  } else {
    audio.src = options.url;
  }
  callbacks?.onCreated?.(audio);
  await waitForAudioReady(audio);
  return { kind: "audio", origin: "stream" in options ? "stream" : "url", element: audio };
}

export async function createImageMediaSource(
  options: CreateImageSourceOptions,
  callbacks?: {
    /** Called synchronously right after the Image object is created/configured. */
    onCreated?: (image: HTMLImageElement) => void;
  },
): Promise<RetroMediaSource> {
  const startedAt = typeof performance !== "undefined" ? performance.now() : Date.now();
  const elapsedMs = () =>
    Math.round(
      ((typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt) * 10,
    ) / 10;
  console.log("[retro-player image]", "createImageMediaSource:start", {
    url: options.url,
  });
  const cached = getCachedImageElement(options.url);
  if (cached) {
    console.log("[retro-player image]", "createImageMediaSource:created", {
      url: options.url,
      elapsedMs: elapsedMs(),
      cached: true,
    });
    callbacks?.onCreated?.(cached);
    await waitForImageReady(cached);
    touchCachedImage(options.url, cached);
    console.log("[retro-player image]", "createImageMediaSource:ready", {
      url: options.url,
      elapsedMs: elapsedMs(),
      naturalWidth: cached.naturalWidth,
      naturalHeight: cached.naturalHeight,
      cached: true,
    });
    return { kind: "image", origin: "url", element: cached };
  }

  // If a prefetch is already in flight, piggyback on it instead of decoding twice.
  const pending = pendingImageElements.get(options.url);
  if (pending) {
    console.log("[retro-player image]", "createImageMediaSource:created", {
      url: options.url,
      elapsedMs: elapsedMs(),
      cached: false,
      pending: true,
    });
    const image = await pending;
    callbacks?.onCreated?.(image);
    console.log("[retro-player image]", "createImageMediaSource:ready", {
      url: options.url,
      elapsedMs: elapsedMs(),
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      cached: false,
      pending: true,
    });
    return { kind: "image", origin: "url", element: image };
  }

  const image = new Image();
  image.src = options.url;
  // Both existing call sites (previewFile, previewUrl) set this immediately
  // after src, in this order — kept as-is rather than reordered.
  image.crossOrigin = "anonymous";
  console.log("[retro-player image]", "createImageMediaSource:created", {
    url: options.url,
    elapsedMs: elapsedMs(),
    cached: false,
  });
  callbacks?.onCreated?.(image);
  await waitForImageReady(image);
  touchCachedImage(options.url, image);
  console.log("[retro-player image]", "createImageMediaSource:ready", {
    url: options.url,
    elapsedMs: elapsedMs(),
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
    cached: false,
  });
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
  return (
    preferNativeVideoSurface &&
    media instanceof HTMLVideoElement &&
    !isAppleWebKitFamily()
  );
}

/**
 * Mirrors useRetroPreviewMedia.ts's shouldBypassWebAudioForMedia exactly.
 * Native mode is a full passthrough regardless of media kind. In addition,
 * Tauri + hls.js media stays on the element's native playback path because
 * WKWebView does not reliably route that HLS audio through Web Audio.
 */
export function shouldBypassWebAudio(
  media: HTMLMediaElement,
  preferNativeVideoSurface: boolean,
): boolean {
  return shouldBypassPlaybackWebAudio({
    preferNativeVideoSurface,
    isHlsManaged: Boolean(getHlsInstance(media)),
  });
}
