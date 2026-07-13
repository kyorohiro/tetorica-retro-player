import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import {
  TetoricaRetroVideoPipeline,
  getEffectiveRetroTargetSize,
  getRetroVideoSourceSize,
  isPhosphorDotModeEnabled,
  type RetroVideoFilterState,
} from "../video/TetoricaRetroVideoPipeline";
import type { RetroFilterState } from "./useRetroFilterState";
import { isTauriRuntime, resolveVideoFilterLiteDefault } from "../platform/runtime";

const TAURI_HIDDEN_TICK_MS = 250;
const getPreferredOutputScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  return Math.max(1, Math.min(2, Math.round(window.devicePixelRatio || 1)));
};

type PreviewKind = "video" | "audio" | "image" | "capture" | null;

export type CanvasStageApp = {
  canvas: HTMLCanvasElement;
  pipeline: TetoricaRetroVideoPipeline;
  ticker: {
    start: () => void;
    stop: () => void;
  };
};

type UseRetroPixiStageParams = {
  filterState: RetroFilterState;
  fitMode: "contain" | "width";
  renderResolutionScale: number;
  isPoweredOn: boolean;
  videoFilterLiteOverride: boolean | null;
  isPlayingRef: MutableRefObject<boolean>;
  previewKindRef: MutableRefObject<PreviewKind>;
  isRecordingRef: MutableRefObject<boolean>;
  debugVideo: (label: string, payload?: Record<string, unknown>) => void;
};

export function useRetroPixiStage({
  filterState,
  fitMode,
  renderResolutionScale,
  isPoweredOn,
  videoFilterLiteOverride,
  isRecordingRef,
  isPlayingRef,
  previewKindRef,
  debugVideo,
}: UseRetroPixiStageParams) {
  const effectiveRenderResolutionScale = Math.max(
    renderResolutionScale,
    getPreferredOutputScale(),
  );
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<CanvasStageApp | null>(null);
  const spriteRef = useRef<null>(null);
  const textureRef = useRef<null>(null);
  const previewElementRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const filterRef = useRef<Record<string, never> | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const renderFrameRef = useRef<() => void>(() => {});
  const filterStateRef = useRef(filterState);
  const isPoweredOnRef = useRef(isPoweredOn);
  const isTickerRunningRef = useRef(false);
  const layoutFrameRef = useRef<number | null>(null);
  const layoutTimeoutRef = useRef<number | null>(null);
  const observedHostSizeRef = useRef<{ width: number; height: number } | null>(null);
  const filterReadyPromiseRef = useRef<Promise<void> | null>(null);
  const resolveFilterReadyRef = useRef<(() => void) | null>(null);
  const viewportRectRef = useRef<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);
  const [isRendererReady, setIsRendererReady] = useState(false);
  const [isFilterReady, setIsFilterReady] = useState(false);
  const viewportRect = viewportRectRef.current;
  const effectiveVideoFilterLiteMode =
    videoFilterLiteOverride ?? resolveVideoFilterLiteDefault();
  const effectiveVideoFilterLiteModeRef = useRef(effectiveVideoFilterLiteMode);
  const initPixiRef = useRef<() => Promise<void>>(async () => {});
  const destroyPixiRef = useRef<() => void>(() => {});

  filterStateRef.current = filterState;
  isPoweredOnRef.current = isPoweredOn;

  const updateViewportRect = useCallback((
    nextValue: SetStateAction<{
      width: number;
      height: number;
      x: number;
      y: number;
    } | null>,
  ) => {
    const current = viewportRectRef.current;
    const resolved =
      typeof nextValue === "function"
        ? nextValue(current)
        : nextValue;
    if (
      current
      && resolved
      && current.width === resolved.width
      && current.height === resolved.height
      && current.x === resolved.x
      && current.y === resolved.y
    ) {
      return;
    }
    viewportRectRef.current = resolved;
  }, []);

  const renderFrame = useCallback(() => {
    const app = appRef.current;
    const source = previewElementRef.current;
    if (!app) return;
    app.pipeline.setOutputEnabled(isPoweredOnRef.current);
    app.pipeline.setSource(source);
    app.pipeline.setFilterState(filterStateRef.current as RetroVideoFilterState);
    app.pipeline.render();
  }, []);

  useLayoutEffect(() => {
    renderFrameRef.current = renderFrame;
  }, [renderFrame]);

  const stopTicker = useCallback(() => {
    isTickerRunningRef.current = false;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      window.clearTimeout(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startTicker = useCallback(() => {
    if (isTickerRunningRef.current) return;
    isTickerRunningRef.current = true;

    const tick = () => {
      if (!isTickerRunningRef.current) return;

      // Skip WebGL rendering when hidden — no visual output needed, and the
      // per-frame drawImage + texImage2D calls on the main thread add GC
      // pressure that can cause AudioContext timing drift.
      const isHidden = typeof document !== "undefined" && document.hidden;
      if (!isHidden) {
        renderFrameRef.current();
      }

      const shouldAnimate =
        previewKindRef.current === "video" ||
        previewKindRef.current === "capture" ||
        previewKindRef.current === "image" ||
        isPlayingRef.current;

      if (!shouldAnimate) {
        animationFrameRef.current = null;
        isTickerRunningRef.current = false;
        return;
      }

      // During recording, cap at 30 fps via setTimeout so captureStream(30)
      // gets exactly 30 frames/s regardless of display refresh rate.
      if (isRecordingRef.current) {
        animationFrameRef.current = window.setTimeout(tick, 1000 / 30) as unknown as number;
      } else if (isTauriRuntime() && document.hidden) {
        // A hidden Tauri WebView does not need a near-60fps heartbeat.
        // Keep the loop alive at a low rate so playback state can resume
        // cleanly, but avoid burning CPU while the window is minimized.
        animationFrameRef.current =
          window.setTimeout(tick, TAURI_HIDDEN_TICK_MS) as unknown as number;
      } else {
        animationFrameRef.current = window.requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  }, [isPlayingRef, isRecordingRef, previewKindRef]);

  useEffect(() => {
    if (typeof document === "undefined" || !isTauriRuntime()) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        return;
      }

      const shouldAnimate =
        previewKindRef.current === "video" ||
        previewKindRef.current === "capture" ||
        previewKindRef.current === "image" ||
        isPlayingRef.current;

      renderFrameRef.current();

      if (!shouldAnimate) {
        return;
      }

      stopTicker();
      startTicker();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlayingRef, previewKindRef, startTicker, stopTicker]);

  const applyFilterState = useCallback(() => {
    renderFrame();
  }, [renderFrame]);

  const syncSpriteFilter = useCallback(() => {
    renderFrame();
  }, [renderFrame]);

  const syncTexturePresentation = useCallback(() => {
    renderFrame();
  }, [renderFrame]);

  const resetFilterInstance = useCallback(() => {
    if (appRef.current) {
      appRef.current.pipeline.resetAnimationClock();
    }
    filterRef.current = {};
    renderFrame();
    return filterRef.current;
  }, [renderFrame]);

  const fitSprite = useCallback((
    app: CanvasStageApp | null,
    _sprite: null,
    source: HTMLVideoElement | HTMLImageElement,
  ) => {
    if (!app) return;

    const { width: sourceWidth, height: sourceHeight } = getRetroVideoSourceSize(source);
    if (sourceWidth <= 0 || sourceHeight <= 0) return;

    const host = canvasHostRef.current;
    const screenWidth = host?.clientWidth ?? app.canvas.width;
    const screenHeight = host?.clientHeight ?? app.canvas.height;
    const scale =
      fitMode === "width"
        ? screenWidth / sourceWidth
        : Math.min(screenWidth / sourceWidth, screenHeight / sourceHeight);
    const appliedScale = scale;

    const nextWidth = Math.max(1, Math.round(sourceWidth * appliedScale));
    const nextHeight = Math.max(1, Math.round(sourceHeight * appliedScale));
    const nextX = Math.round((screenWidth - nextWidth) / 2);
    const nextY = Math.round((screenHeight - nextHeight) / 2);

    const next = {
      width: nextWidth,
      height: nextHeight,
      x: nextX,
      y: nextY,
    };

    const current = viewportRectRef.current;
    if (
      current &&
      current.width === next.width &&
      current.height === next.height &&
      current.x === next.x &&
      current.y === next.y
    ) {
      return current;
    }

    viewportRectRef.current = next;
    updateViewportRect(next);
    return next;
  }, [fitMode, updateViewportRect]);

  const fitCurrentSprite = useCallback(() => {
    if (!previewElementRef.current) return;
    fitSprite(appRef.current, null, previewElementRef.current);
  }, [fitSprite]);

  const safeRender = useCallback(() => {
    renderFrame();
  }, [renderFrame]);

  const refreshLayout = useCallback(() => {
    const app = appRef.current;
    const host = canvasHostRef.current;
    if (!app || !host) return;

    fitCurrentSprite();

    const viewRect = viewportRectRef.current ?? {
      x: 0,
      y: 0,
      width: host.clientWidth,
      height: host.clientHeight,
    };
    const styleWidth = Math.max(1, Math.round(viewRect.width));
    const styleHeight = Math.max(1, Math.round(viewRect.height));
    const currentFilterState = filterStateRef.current;
    const previewSourceSize = previewElementRef.current
      ? getRetroVideoSourceSize(previewElementRef.current)
      : null;
    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
    } = getEffectiveRetroTargetSize(
      currentFilterState as RetroVideoFilterState,
      previewSourceSize?.width,
      previewSourceSize?.height,
      styleWidth,
      styleHeight,
    );

    const displayBufferWidth = Math.max(
      1,
      Math.round(styleWidth * Math.max(1, effectiveRenderResolutionScale)),
    );
    const displayBufferHeight = Math.max(
      1,
      Math.round(styleHeight * Math.max(1, effectiveRenderResolutionScale)),
    );
    const logicalBufferWidth = Math.max(
      1,
      Math.round(Math.max(1, effectiveTargetWidth) * Math.max(1, effectiveRenderResolutionScale)),
    );
    const logicalBufferHeight = Math.max(
      1,
      Math.round(Math.max(1, effectiveTargetHeight) * Math.max(1, effectiveRenderResolutionScale)),
    );
    const shouldUseLogicalBufferUpscale = isPhosphorDotModeEnabled(currentFilterState);
    const nextWidth = currentFilterState.isFilterEnabled
      ? (
        shouldUseLogicalBufferUpscale
          ? Math.max(displayBufferWidth, logicalBufferWidth)
          : displayBufferWidth
      )
      : displayBufferWidth;
    const nextHeight = currentFilterState.isFilterEnabled
      ? (
        shouldUseLogicalBufferUpscale
          ? Math.max(displayBufferHeight, logicalBufferHeight)
          : displayBufferHeight
      )
      : displayBufferHeight;

    if (app.canvas.width !== nextWidth) app.canvas.width = nextWidth;
    if (app.canvas.height !== nextHeight) app.canvas.height = nextHeight;

    app.canvas.style.position = "absolute";
    app.canvas.style.left = `${Math.round(viewRect.x)}px`;
    app.canvas.style.top = `${Math.round(viewRect.y)}px`;
    app.canvas.style.width = `${styleWidth}px`;
    app.canvas.style.height = `${styleHeight}px`;
    app.canvas.style.imageRendering = "pixelated";

    renderFrame();
  }, [effectiveRenderResolutionScale, fitCurrentSprite, renderFrame]);

  const scheduleRefreshLayout = useCallback(() => {
    if (layoutFrameRef.current !== null) {
      window.cancelAnimationFrame(layoutFrameRef.current);
      layoutFrameRef.current = null;
    }
    if (layoutTimeoutRef.current !== null) {
      window.clearTimeout(layoutTimeoutRef.current);
      layoutTimeoutRef.current = null;
    }

    layoutFrameRef.current = window.requestAnimationFrame(() => {
      layoutFrameRef.current = null;
      refreshLayout();
    });
    layoutTimeoutRef.current = window.setTimeout(() => {
      layoutTimeoutRef.current = null;
      refreshLayout();
    }, 120);
  }, [refreshLayout]);

  const initPixi = useCallback(async () => {
    if (appRef.current) return;
    if (initPromiseRef.current) {
      await initPromiseRef.current;
      return;
    }

    initPromiseRef.current = (async () => {
      const host = canvasHostRef.current;
      if (!host || appRef.current) return;
      const initStartedAt =
        typeof performance !== "undefined" ? performance.now() : Date.now();

      debugVideo("startup:initPixi:start", {
        hostConnected: host.isConnected,
        hostWidth: host.clientWidth ?? null,
        hostHeight: host.clientHeight ?? null,
        resolution: effectiveRenderResolutionScale,
      });

      const canvas = document.createElement("canvas");
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.imageRendering = "pixelated";
      canvas.style.background = "#020617";

      const gl = canvas.getContext("webgl2");
      if (!gl) {
        throw new Error("WebGL2 is not available in this app view.");
      }

      debugVideo("startup:initPixi:webgl2-ready", {
        elapsedMs:
          Math.round(
            ((typeof performance !== "undefined" ? performance.now() : Date.now()) - initStartedAt) *
              10,
          ) / 10,
      });

      // onFilterReady fires after background filter compilation.
      // appRef.current is set below, so by the time the callback fires it's available.
      setIsFilterReady(false);
      filterReadyPromiseRef.current = new Promise<void>((resolve) => {
        resolveFilterReadyRef.current = resolve;
      });
      const onFilterReady = () => {
        setIsFilterReady(true);
        resolveFilterReadyRef.current?.();
        resolveFilterReadyRef.current = null;
        renderFrameRef.current();
        startTicker();
      };
      const pipeline = await TetoricaRetroVideoPipeline.create(gl, onFilterReady, {
        videoFilterLiteMode: effectiveVideoFilterLiteMode,
      });
      const app: CanvasStageApp = {
        canvas,
        pipeline,
        ticker: {
          start: startTicker,
          stop: stopTicker,
        },
      };

      const nextHost = canvasHostRef.current;
      if (!nextHost || nextHost !== host || !nextHost.isConnected) {
        return;
      }

      nextHost.style.position = "relative";
      nextHost.appendChild(canvas);
      appRef.current = app;
      filterRef.current = {};
      setIsRendererReady(true);

      debugVideo("initWebGL:ready", {
        hostWidth: nextHost.clientWidth ?? null,
        hostHeight: nextHost.clientHeight ?? null,
        resolution: effectiveRenderResolutionScale,
      });
      debugVideo("startup:initPixi:renderer-ready", {
        elapsedMs:
          Math.round(
            ((typeof performance !== "undefined" ? performance.now() : Date.now()) - initStartedAt) *
              10,
          ) / 10,
      });

      refreshLayout();

      debugVideo("startup:initPixi:done", {
        elapsedMs:
          Math.round(
            ((typeof performance !== "undefined" ? performance.now() : Date.now()) - initStartedAt) *
              10,
          ) / 10,
        shouldAnimateOnInit:
          previewKindRef.current === "video" ||
          previewKindRef.current === "capture" ||
          previewKindRef.current === "image" ||
          isPlayingRef.current,
      });
    })();

    try {
      await initPromiseRef.current;
    } finally {
      initPromiseRef.current = null;
    }
  }, [
    debugVideo,
    effectiveVideoFilterLiteMode,
    effectiveRenderResolutionScale,
    isPoweredOn,
    refreshLayout,
    startTicker,
    stopTicker,
  ]);

  const destroyPixi = useCallback(() => {
    initPromiseRef.current = null;
    resolveFilterReadyRef.current?.();
    resolveFilterReadyRef.current = null;
    filterReadyPromiseRef.current = null;
    stopTicker();

    if (layoutFrameRef.current !== null) {
      window.cancelAnimationFrame(layoutFrameRef.current);
      layoutFrameRef.current = null;
    }
    if (layoutTimeoutRef.current !== null) {
      window.clearTimeout(layoutTimeoutRef.current);
      layoutTimeoutRef.current = null;
    }

    const app = appRef.current;
    if (app) {
      app.pipeline.dispose();
      app.canvas.remove();
    }

    appRef.current = null;
    filterRef.current = null;
    updateViewportRect(null);
    setIsRendererReady(false);
    setIsFilterReady(false);
  }, [stopTicker, updateViewportRect]);

  useLayoutEffect(() => {
    initPixiRef.current = initPixi;
    destroyPixiRef.current = destroyPixi;
  }, [destroyPixi, initPixi]);

  const waitForCanvasPresentation = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => resolve());
    });
    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => resolve());
    });
  }, []);

  const ensureFilterReady = useCallback(async () => {
    await initPixi();
    if (filterReadyPromiseRef.current) {
      await filterReadyPromiseRef.current;
    }
    renderFrameRef.current();
    await waitForCanvasPresentation();
  }, [initPixi, waitForCanvasPresentation]);

  useEffect(() => {
    if (effectiveVideoFilterLiteModeRef.current === effectiveVideoFilterLiteMode) {
      return;
    }

    effectiveVideoFilterLiteModeRef.current = effectiveVideoFilterLiteMode;

    if (!appRef.current) {
      return;
    }

    destroyPixiRef.current();
    void initPixiRef.current();
  }, [effectiveVideoFilterLiteMode]);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const readHostSize = () => ({
      width: Math.round(host.clientWidth),
      height: Math.round(host.clientHeight),
    });

    const shouldRefreshForHostSize = (next: { width: number; height: number }) => {
      const current = observedHostSizeRef.current;
      if (current && current.width === next.width && current.height === next.height) {
        return false;
      }
      observedHostSizeRef.current = next;
      return true;
    };

    observedHostSizeRef.current = readHostSize();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const next = {
          width: Math.round(entry.contentRect.width),
          height: Math.round(entry.contentRect.height),
        };
        if (!shouldRefreshForHostSize(next)) return;
        scheduleRefreshLayout();
      });
      observer.observe(host);
      return () => {
        observer.disconnect();
      };
    }

    const handleResize = () => {
      if (!shouldRefreshForHostSize(readHostSize())) return;
      scheduleRefreshLayout();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scheduleRefreshLayout]);

  return {
    canvasHostRef,
    appRef,
    spriteRef,
    textureRef,
    previewElementRef,
    filterRef,
    isRendererReady,
    isFilterReady,
    viewportRect,
    setViewportRect: updateViewportRect,
    applyFilterState,
    createVideoTexture: (_video: HTMLVideoElement) => null,
    destroyPixi,
    fitCurrentSprite,
    fitSprite,
    initPixi,
    ensureFilterReady,
    refreshLayout,
    resetFilterInstance,
    safeRender,
    scheduleRefreshLayout,
    syncSpriteFilter,
    syncTexturePresentation,
  };
}
