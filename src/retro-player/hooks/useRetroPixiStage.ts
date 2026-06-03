import { useCallback, useRef, useState, type MutableRefObject } from "react";
import { Application, Filter, Sprite, Texture, VideoSource } from "pixi.js";
import {
  MONO_TINTS,
  RETRO_PRESETS,
  paletteModeToUniform,
} from "../retro/config";
import { FILTER_FRAGMENT, FILTER_VERTEX } from "../retro/filterShader";
import type { RetroFilterState } from "./useRetroFilterState";

type PreviewKind = "video" | "audio" | "image" | "capture" | null;

type UseRetroPixiStageParams = {
  filterState: RetroFilterState;
  fitMode: "contain" | "width";
  renderResolutionScale: number;
  isPoweredOn: boolean;
  isPlayingRef: MutableRefObject<boolean>;
  previewKindRef: MutableRefObject<PreviewKind>;
  debugVideo: (label: string, payload?: Record<string, unknown>) => void;
};

export function useRetroPixiStage({
  filterState,
  fitMode,
  renderResolutionScale,
  isPoweredOn,
  isPlayingRef,
  previewKindRef,
  debugVideo,
}: UseRetroPixiStageParams) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const spriteRef = useRef<Sprite | null>(null);
  const textureRef = useRef<Texture | null>(null);
  const previewElementRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const filterRef = useRef<Filter | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);
  const [isRendererReady, setIsRendererReady] = useState(false);
  const [viewportRect, setViewportRect] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const applyFilterStateTo = useCallback((filter: Filter | null) => {
    if (!filter) return;

    filter.resources.pixelUniforms.uniforms.uTargetSize[0] = Math.max(filterState.targetWidth, 1);
    filter.resources.pixelUniforms.uniforms.uTargetSize[1] = Math.max(filterState.targetHeight, 1);
    filter.resources.pixelUniforms.uniforms.uColorLevels = Math.max(filterState.colorLevels, 2);
    filter.resources.pixelUniforms.uniforms.uDitherStrength = filterState.ditherStrength;
    filter.resources.pixelUniforms.uniforms.uPaletteMode = paletteModeToUniform(filterState.paletteMode);
    filter.resources.pixelUniforms.uniforms.uCurvature = filterState.curvature;
    filter.resources.pixelUniforms.uniforms.uScanlineStrength = filterState.scanlineStrength;
    filter.resources.pixelUniforms.uniforms.uScanline2Strength = filterState.scanline2Strength;
    filter.resources.pixelUniforms.uniforms.uVignetteStrength = filterState.vignetteStrength;
    filter.resources.pixelUniforms.uniforms.uGlowStrength = filterState.glowStrength;
    filter.resources.pixelUniforms.uniforms.uPhosphorStrength = filterState.phosphorStrength;
    filter.resources.pixelUniforms.uniforms.uMonoTint[0] = MONO_TINTS[filterState.monoTint].rgb[0];
    filter.resources.pixelUniforms.uniforms.uMonoTint[1] = MONO_TINTS[filterState.monoTint].rgb[1];
    filter.resources.pixelUniforms.uniforms.uMonoTint[2] = MONO_TINTS[filterState.monoTint].rgb[2];
  }, [filterState]);

  const applyFilterState = useCallback(() => {
    applyFilterStateTo(filterRef.current);
  }, [applyFilterStateTo]);

  const createRetroFilter = useCallback(() => {
    const filter = Filter.from({
      gl: {
        vertex: FILTER_VERTEX,
        fragment: FILTER_FRAGMENT,
      },
      resources: {
        pixelUniforms: {
          uTargetSize: {
            value: new Float32Array([
              RETRO_PRESETS.pc98_512.width,
              RETRO_PRESETS.pc98_512.height,
            ]),
            type: "vec2<f32>",
          },
          uColorLevels: { value: RETRO_PRESETS.pc98_512.colors, type: "f32" },
          uDitherStrength: { value: RETRO_PRESETS.pc98_512.dither, type: "f32" },
          uPaletteMode: { value: 2, type: "f32" },
          uCurvature: { value: RETRO_PRESETS.pc98_512.curvature, type: "f32" },
          uScanlineStrength: { value: RETRO_PRESETS.pc98_512.scanline, type: "f32" },
          uScanline2Strength: { value: RETRO_PRESETS.pc98_512.scanline2, type: "f32" },
          uVignetteStrength: { value: RETRO_PRESETS.pc98_512.vignette, type: "f32" },
          uGlowStrength: { value: RETRO_PRESETS.pc98_512.glow, type: "f32" },
          uPhosphorStrength: { value: RETRO_PRESETS.pc98_512.phosphor, type: "f32" },
          uMonoTint: {
            value: new Float32Array(MONO_TINTS.green.rgb),
            type: "vec3<f32>",
          },
          uTime: { value: 0, type: "f32" },
        },
      },
    });

    applyFilterStateTo(filter);

    return filter;
  }, [applyFilterStateTo]);

  const syncSpriteFilter = useCallback(() => {
    if (!spriteRef.current) return;

    spriteRef.current.filters =
      filterState.isFilterEnabled && filterRef.current ? [filterRef.current] : [];
  }, [filterState.isFilterEnabled]);

  const syncTexturePresentation = useCallback(() => {
    const texture = textureRef.current;
    if (!texture?.source) return;

    texture.source.scaleMode = filterState.isFilterEnabled ? "nearest" : "linear";
  }, [filterState.isFilterEnabled]);

  const resetFilterInstance = useCallback(() => {
    const previousFilter = filterRef.current;
    const nextFilter = createRetroFilter();

    filterRef.current = nextFilter;
    syncSpriteFilter();
    previousFilter?.destroy();

    return nextFilter;
  }, [createRetroFilter, syncSpriteFilter]);

  const fitSprite = useCallback((
    app: Application | null,
    sprite: Sprite,
    source: HTMLVideoElement | HTMLImageElement,
  ) => {
    if (!app) return;

    const sourceWidth =
      source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
    const sourceHeight =
      source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;

    const screenWidth = app.screen.width;
    const screenHeight = app.screen.height;
    const scale =
      fitMode === "width"
        ? screenWidth / sourceWidth
        : Math.min(screenWidth / sourceWidth, screenHeight / sourceHeight);
    const integerScale = Math.max(1, Math.floor(scale));
    const appliedScale =
      fitMode === "width"
        ? scale
        : filterState.isFilterEnabled && scale >= 1
          ? integerScale
          : scale;

    debugVideo("fitSprite", {
      sourceTag: source.tagName,
      sourceWidth,
      sourceHeight,
      screenWidth,
      screenHeight,
      fitMode,
      scale,
      appliedScale,
    });

    const nextWidth = sourceWidth * appliedScale;
    const nextHeight = sourceHeight * appliedScale;
    const nextX = (screenWidth - nextWidth) / 2;
    const nextY = (screenHeight - nextHeight) / 2;

    sprite.width = nextWidth;
    sprite.height = nextHeight;
    sprite.x = nextX;
    sprite.y = nextY;

    setViewportRect((current) => {
      const next = {
        width: nextWidth,
        height: nextHeight,
        x: nextX,
        y: nextY,
      };

      if (
        current &&
        current.width === next.width &&
        current.height === next.height &&
        current.x === next.x &&
        current.y === next.y
      ) {
        return current;
      }

      return next;
    });
  }, [debugVideo, filterState.isFilterEnabled, fitMode]);

  const createVideoTexture = useCallback((video: HTMLVideoElement) => {
    const source = new VideoSource({
      resource: video,
      autoPlay: false,
    });
    const texture = new Texture({ source });

    source.resource.autoplay = false;
    source.update();

    return texture;
  }, []);

  const fitCurrentSprite = useCallback(() => {
    if (spriteRef.current && previewElementRef.current) {
      fitSprite(appRef.current, spriteRef.current, previewElementRef.current);
    }
  }, [fitSprite]);

  const safeRender = useCallback(() => {
    const app = appRef.current;

    if (!app) return;
    if (!canvasHostRef.current?.isConnected) return;
    if (!app.canvas?.isConnected) return;

    try {
      app.render();
    } catch (error) {
      debugVideo("safeRender:skipped", {
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }, [debugVideo]);

  const refreshLayout = useCallback(() => {
    const app = appRef.current;
    const host = canvasHostRef.current;
    if (!app || !host) return;

    const nextWidth = Math.max(1, Math.round(host.clientWidth));
    const nextHeight = Math.max(1, Math.round(host.clientHeight));

    debugVideo("refreshLayout", {
      hostWidth: host.clientWidth,
      hostHeight: host.clientHeight,
      nextWidth,
      nextHeight,
      previewKind: previewKindRef.current,
      hasSprite: Boolean(spriteRef.current),
      hasPreviewElement: Boolean(previewElementRef.current),
      isPoweredOn,
    });

    app.renderer.resize(nextWidth, nextHeight);
    fitCurrentSprite();
    safeRender();
  }, [debugVideo, fitCurrentSprite, isPoweredOn, previewKindRef, safeRender]);

  const scheduleRefreshLayout = useCallback(() => {
    if (typeof window === "undefined") {
      refreshLayout();
      return;
    }

    window.requestAnimationFrame(() => {
      refreshLayout();
      window.requestAnimationFrame(() => {
        refreshLayout();
      });
    });

    window.setTimeout(() => {
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

      const app = new Application();
      await app.init({
        resizeTo: host,
        background: "#020617",
        antialias: true,
        preference: "webgl",
        autoDensity: true,
        resolution: Math.max(1, renderResolutionScale),
      });

      const nextHost = canvasHostRef.current;
      if (!nextHost || nextHost !== host || !nextHost.isConnected) {
        app.destroy(true);
        return;
      }

      nextHost.appendChild(app.canvas);

      const filter = createRetroFilter();

      app.ticker.add((ticker) => {
        const shouldAnimate =
          isPlayingRef.current || previewKindRef.current === "image";

        if (!shouldAnimate) {
          return;
        }

        const activeFilter = filterRef.current;
        if (!activeFilter) {
          return;
        }

        activeFilter.resources.pixelUniforms.uniforms.uTime += 0.016 * ticker.deltaTime;
      });

      app.renderer.on("resize", fitCurrentSprite);
      appRef.current = app;
      filterRef.current = filter;
      setIsRendererReady(true);
      debugVideo("initPixi:ready", {
        hostWidth: nextHost.clientWidth ?? null,
        hostHeight: nextHost.clientHeight ?? null,
        resolution: renderResolutionScale,
      });

      if (!isPoweredOn) {
        app.ticker.stop();
      }

      applyFilterState();
      refreshLayout();
      scheduleRefreshLayout();
    })();

    try {
      await initPromiseRef.current;
    } finally {
      initPromiseRef.current = null;
    }
  }, [
    applyFilterState,
    createRetroFilter,
    fitCurrentSprite,
    isPlayingRef,
    isPoweredOn,
    previewKindRef,
    refreshLayout,
    renderResolutionScale,
    scheduleRefreshLayout,
  ]);

  const destroyPixi = useCallback(() => {
    initPromiseRef.current = null;
    appRef.current?.renderer.off("resize", fitCurrentSprite);
    appRef.current?.destroy(true);
    filterRef.current?.destroy();
    filterRef.current = null;
    appRef.current = null;
    setIsRendererReady(false);
  }, [fitCurrentSprite]);

  return {
    canvasHostRef,
    appRef,
    spriteRef,
    textureRef,
    previewElementRef,
    filterRef,
    isRendererReady,
    viewportRect,
    setViewportRect,
    applyFilterState,
    createVideoTexture,
    destroyPixi,
    fitCurrentSprite,
    fitSprite,
    initPixi,
    refreshLayout,
    resetFilterInstance,
    safeRender,
    scheduleRefreshLayout,
    syncSpriteFilter,
    syncTexturePresentation,
  };
}
