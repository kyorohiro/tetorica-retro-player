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
  MONO_TINTS,
  paletteModeToUniform,
} from "../retro/config";
import { FILTER_FRAGMENT } from "../retro/filterShader";
import type { RetroFilterState } from "./useRetroFilterState";

type PreviewKind = "video" | "audio" | "image" | "capture" | null;

type RendererUniformLocations = {
  uTargetSize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uPaletteMode: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
  uScanlineStrength: WebGLUniformLocation | null;
  uScanline2Strength: WebGLUniformLocation | null;
  uScanlineBrightnessFade: WebGLUniformLocation | null;
  uVignetteStrength: WebGLUniformLocation | null;
  uGlowStrength: WebGLUniformLocation | null;
  uPhosphorStrength: WebGLUniformLocation | null;
  uSpotMaskStrength: WebGLUniformLocation | null;
  uBulbRadius: WebGLUniformLocation | null;
  uBlackFloor: WebGLUniformLocation | null;
  uPixelAspect: WebGLUniformLocation | null;
  uPhosphorDotMode: WebGLUniformLocation | null;
  uPhosphorDotInternalScale: WebGLUniformLocation | null;
  uPhosphorDotBrightCore: WebGLUniformLocation | null;
  uPhosphorDotCellFill: WebGLUniformLocation | null;
  uPhosphorDotFlatDisc: WebGLUniformLocation | null;
  uPhosphorDotNeighborBlend: WebGLUniformLocation | null;
  uCloseUpNoiseStrength: WebGLUniformLocation | null;
  uMonoTint: WebGLUniformLocation | null;
  uNeonBoost: WebGLUniformLocation | null;
  uNeonSaturation: WebGLUniformLocation | null;
  uNeonDetail: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
};

type RendererResources = {
  gl: WebGL2RenderingContext;
  filterProgram: WebGLProgram;
  passthroughProgram: WebGLProgram;
  texture: WebGLTexture;
  uniformLocations: RendererUniformLocations;
};

export type CanvasStageApp = {
  canvas: HTMLCanvasElement;
  renderer: RendererResources;
  ticker: {
    start: () => void;
    stop: () => void;
  };
  startedAt: number;
};

type UploadSource = HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;

type UseRetroPixiStageParams = {
  filterState: RetroFilterState;
  fitMode: "contain" | "width";
  renderResolutionScale: number;
  isPoweredOn: boolean;
  isPlayingRef: MutableRefObject<boolean>;
  previewKindRef: MutableRefObject<PreviewKind>;
  debugVideo: (label: string, payload?: Record<string, unknown>) => void;
};

const PASS_THROUGH_FRAGMENT = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`;

const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const QUAD_VERTICES = new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  -1, 1,
  1, -1,
  1, 1,
]);

const getSourceSize = (source: HTMLVideoElement | HTMLImageElement) => ({
  width: source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth,
  height: source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight,
});

const isPhosphorDotModeEnabled = (filterState: RetroFilterState) =>
  filterState.spotMaskStrength > 0.001;

const getPhosphorDotInternalScale = (filterState: RetroFilterState) =>
  isPhosphorDotModeEnabled(filterState) && filterState.phosphorDotInternalScale ? 2 : 1;

const getEffectiveTargetSize = (
  filterState: RetroFilterState,
  visibleWidth?: number,
  visibleHeight?: number,
) => {
  const internalScale = getPhosphorDotInternalScale(filterState);
  const requestedWidth = Math.max(filterState.targetWidth, 1);
  const requestedHeight = Math.max(filterState.targetHeight, 1);

  if (
    !isPhosphorDotModeEnabled(filterState) ||
    visibleWidth === undefined ||
    visibleHeight === undefined
  ) {
    return {
      width: requestedWidth * internalScale,
      height: requestedHeight * internalScale,
      internalScale,
      isPhosphorDotMode: isPhosphorDotModeEnabled(filterState),
    };
  }

  const phosphorDotMinimumCellSize = 4;
  const clampedWidth = Math.min(
    requestedWidth,
    Math.max(1, Math.floor(visibleWidth / phosphorDotMinimumCellSize)),
  );
  const clampedHeight = Math.min(
    requestedHeight,
    Math.max(1, Math.floor(visibleHeight / phosphorDotMinimumCellSize)),
  );

  return {
    width: clampedWidth * internalScale,
    height: clampedHeight * internalScale,
    internalScale,
    isPhosphorDotMode: true,
  };
};

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown shader compile error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Failed to create WebGL program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Unknown program link error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function createRenderer(gl: WebGL2RenderingContext): RendererResources {
  const filterProgram = createProgram(gl, VERTEX_SHADER_SOURCE, FILTER_FRAGMENT);
  const passthroughProgram = createProgram(gl, VERTEX_SHADER_SOURCE, PASS_THROUGH_FRAGMENT);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Failed to create WebGL texture.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  gl.useProgram(filterProgram);
  gl.uniform1i(gl.getUniformLocation(filterProgram, "uTexture"), 0);
  gl.useProgram(passthroughProgram);
  gl.uniform1i(gl.getUniformLocation(passthroughProgram, "uTexture"), 0);

  return {
    gl,
    filterProgram,
    passthroughProgram,
    texture,
    uniformLocations: {
      uTargetSize: gl.getUniformLocation(filterProgram, "uTargetSize"),
      uColorLevels: gl.getUniformLocation(filterProgram, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(filterProgram, "uDitherStrength"),
      uPaletteMode: gl.getUniformLocation(filterProgram, "uPaletteMode"),
      uCurvature: gl.getUniformLocation(filterProgram, "uCurvature"),
      uScanlineStrength: gl.getUniformLocation(filterProgram, "uScanlineStrength"),
      uScanline2Strength: gl.getUniformLocation(filterProgram, "uScanline2Strength"),
      uScanlineBrightnessFade: gl.getUniformLocation(filterProgram, "uScanlineBrightnessFade"),
      uVignetteStrength: gl.getUniformLocation(filterProgram, "uVignetteStrength"),
      uGlowStrength: gl.getUniformLocation(filterProgram, "uGlowStrength"),
      uPhosphorStrength: gl.getUniformLocation(filterProgram, "uPhosphorStrength"),
      uSpotMaskStrength: gl.getUniformLocation(filterProgram, "uSpotMaskStrength"),
      uBulbRadius: gl.getUniformLocation(filterProgram, "uBulbRadius"),
      uBlackFloor: gl.getUniformLocation(filterProgram, "uBlackFloor"),
      uPixelAspect: gl.getUniformLocation(filterProgram, "uPixelAspect"),
      uPhosphorDotMode: gl.getUniformLocation(filterProgram, "uPhosphorDotMode"),
      uPhosphorDotInternalScale: gl.getUniformLocation(filterProgram, "uPhosphorDotInternalScale"),
      uPhosphorDotBrightCore: gl.getUniformLocation(filterProgram, "uPhosphorDotBrightCore"),
      uPhosphorDotCellFill: gl.getUniformLocation(filterProgram, "uPhosphorDotCellFill"),
      uPhosphorDotFlatDisc: gl.getUniformLocation(filterProgram, "uPhosphorDotFlatDisc"),
      uPhosphorDotNeighborBlend: gl.getUniformLocation(filterProgram, "uPhosphorDotNeighborBlend"),
      uCloseUpNoiseStrength: gl.getUniformLocation(filterProgram, "uCloseUpNoiseStrength"),
      uMonoTint: gl.getUniformLocation(filterProgram, "uMonoTint"),
      uNeonBoost: gl.getUniformLocation(filterProgram, "uNeonBoost"),
      uNeonSaturation: gl.getUniformLocation(filterProgram, "uNeonSaturation"),
      uNeonDetail: gl.getUniformLocation(filterProgram, "uNeonDetail"),
      uTime: gl.getUniformLocation(filterProgram, "uTime"),
    },
  };
}

function applyFilterUniforms(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  uniformLocations: RendererUniformLocations,
  filterState: RetroFilterState,
  startedAt: number,
) {
  const canvasElement = gl.canvas instanceof HTMLCanvasElement ? gl.canvas : null;
  const visibleWidth = Math.max(canvasElement?.clientWidth ?? gl.drawingBufferWidth, 1);
  const visibleHeight = Math.max(canvasElement?.clientHeight ?? gl.drawingBufferHeight, 1);
  const {
    width: effectiveTargetWidth,
    height: effectiveTargetHeight,
    isPhosphorDotMode,
  } = getEffectiveTargetSize(filterState, visibleWidth, visibleHeight);

  gl.useProgram(program);
  gl.uniform2f(
    uniformLocations.uTargetSize,
    effectiveTargetWidth,
    effectiveTargetHeight,
  );
  gl.uniform1f(uniformLocations.uColorLevels, Math.max(filterState.colorLevels, 2));
  gl.uniform1f(uniformLocations.uDitherStrength, filterState.ditherStrength);
  gl.uniform1f(uniformLocations.uPaletteMode, paletteModeToUniform(filterState.paletteMode));
  gl.uniform1f(uniformLocations.uCurvature, filterState.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, filterState.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, filterState.scanline2Strength);
  gl.uniform1f(
    uniformLocations.uScanlineBrightnessFade,
    filterState.scanlineBrightnessFade,
  );
  gl.uniform1f(uniformLocations.uVignetteStrength, filterState.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, filterState.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, filterState.phosphorStrength);
  gl.uniform1f(uniformLocations.uSpotMaskStrength, filterState.spotMaskStrength);
  gl.uniform1f(uniformLocations.uBulbRadius, filterState.bulbRadius);
  gl.uniform1f(uniformLocations.uBlackFloor, filterState.blackFloor);
  gl.uniform1f(
    uniformLocations.uPixelAspect,
    (Math.max(gl.drawingBufferWidth, 1) * effectiveTargetHeight) /
      (Math.max(gl.drawingBufferHeight, 1) * effectiveTargetWidth),
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotMode,
    isPhosphorDotMode ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotInternalScale,
    filterState.phosphorDotInternalScale ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotBrightCore,
    filterState.phosphorDotBrightCore ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotCellFill,
    filterState.phosphorDotCellFill,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotFlatDisc,
    filterState.phosphorDotFlatDisc ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uPhosphorDotNeighborBlend,
    filterState.phosphorDotNeighborBlend ? 1 : 0,
  );
  gl.uniform1f(
    uniformLocations.uCloseUpNoiseStrength,
    filterState.closeUpNoiseStrength,
  );
  gl.uniform3f(
    uniformLocations.uMonoTint,
    ...MONO_TINTS[filterState.monoTint].rgb,
  );
  gl.uniform1f(uniformLocations.uNeonBoost, filterState.neonBoost);
  gl.uniform1f(uniformLocations.uNeonSaturation, filterState.neonSaturation);
  gl.uniform1f(uniformLocations.uNeonDetail, filterState.neonDetail);
  gl.uniform1f(
    uniformLocations.uTime,
    ((typeof performance !== "undefined" ? performance.now() : Date.now()) - startedAt) /
      1000,
  );
}

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
  const uploadCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const viewportRectRef = useRef<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);
  const [isRendererReady, setIsRendererReady] = useState(false);
  const [viewportRect, setViewportRect] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

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
    setViewportRect((current) => {
      const resolved =
        typeof nextValue === "function"
          ? nextValue(current)
          : nextValue;
      viewportRectRef.current = resolved;
      return resolved;
    });
  }, []);

  const getUploadSource = useCallback((
    source: HTMLVideoElement | HTMLImageElement,
    currentFilterState: RetroFilterState,
  ): UploadSource => {
    if (!currentFilterState.isFilterEnabled) {
      return source;
    }

    const sourceSize = getSourceSize(source);
    if (sourceSize.width <= 0 || sourceSize.height <= 0) {
      return source;
    }

    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
    } = getEffectiveTargetSize(currentFilterState);
    const targetWidth = Math.max(1, Math.round(effectiveTargetWidth));
    const targetHeight = Math.max(1, Math.round(effectiveTargetHeight));

    let uploadCanvas = uploadCanvasRef.current;
    let uploadContext = uploadContextRef.current;

    if (!uploadCanvas || !uploadContext) {
      uploadCanvas = document.createElement("canvas");
      uploadContext = uploadCanvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });

      if (!uploadContext) {
        return source;
      }

      uploadCanvasRef.current = uploadCanvas;
      uploadContextRef.current = uploadContext;
    }

    if (uploadCanvas.width !== targetWidth) uploadCanvas.width = targetWidth;
    if (uploadCanvas.height !== targetHeight) uploadCanvas.height = targetHeight;

    uploadContext.imageSmoothingEnabled = true;
    uploadContext.imageSmoothingQuality = "high";
    uploadContext.fillStyle = "#000";
    uploadContext.fillRect(0, 0, targetWidth, targetHeight);

    uploadContext.drawImage(source, 0, 0, targetWidth, targetHeight);
    return uploadCanvas;
  }, []);

  const renderFrame = useCallback(() => {
    const app = appRef.current;
    const source = previewElementRef.current;
    if (!app) return;

    const { gl, texture, filterProgram, passthroughProgram, uniformLocations } = app.renderer;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.01, 0.02, 0.01, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (!isPoweredOnRef.current || !source) {
      return;
    }

    const currentFilterState = filterStateRef.current;
    const uploadSource = getUploadSource(source, currentFilterState);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const textureFilter = currentFilterState.isFilterEnabled ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, textureFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, textureFilter);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, uploadSource);

    if (currentFilterState.isFilterEnabled) {
      applyFilterUniforms(
        gl,
        filterProgram,
        uniformLocations,
        currentFilterState,
        app.startedAt,
      );
      gl.useProgram(filterProgram);
    } else {
      gl.useProgram(passthroughProgram);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, []);

  useLayoutEffect(() => {
    renderFrameRef.current = renderFrame;
  }, [renderFrame]);

  const stopTicker = useCallback(() => {
    isTickerRunningRef.current = false;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startTicker = useCallback(() => {
    if (isTickerRunningRef.current) return;
    isTickerRunningRef.current = true;

    const tick = () => {
      if (!isTickerRunningRef.current) return;
      renderFrameRef.current();

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

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  }, [isPlayingRef, previewKindRef]);

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
      appRef.current.startedAt =
        typeof performance !== "undefined" ? performance.now() : Date.now();
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

    const { width: sourceWidth, height: sourceHeight } = getSourceSize(source);
    if (sourceWidth <= 0 || sourceHeight <= 0) return;

    const host = canvasHostRef.current;
    const screenWidth = host?.clientWidth ?? app.canvas.width;
    const screenHeight = host?.clientHeight ?? app.canvas.height;
    const scale =
      fitMode === "width"
        ? screenWidth / sourceWidth
        : Math.min(screenWidth / sourceWidth, screenHeight / sourceHeight);
    // Use the raw computed scale for smoother, predictable sizing across presets
    // (avoid integer rounding which can cause large jumps in applied size).
    const appliedScale = scale;

    const nextWidth = sourceWidth * appliedScale;
    const nextHeight = sourceHeight * appliedScale;
    const nextX = (screenWidth - nextWidth) / 2;
    const nextY = (screenHeight - nextHeight) / 2;

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
  }, [debugVideo, fitMode, updateViewportRect]);

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
    const displayBufferWidth = Math.max(
      1,
      Math.round(styleWidth * Math.max(1, renderResolutionScale)),
    );
    const displayBufferHeight = Math.max(
      1,
      Math.round(styleHeight * Math.max(1, renderResolutionScale)),
    );
    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
    } = getEffectiveTargetSize(currentFilterState, styleWidth, styleHeight);
    const logicalBufferWidth = Math.max(
      1,
      Math.round(Math.max(1, effectiveTargetWidth) * Math.max(1, renderResolutionScale)),
    );
    const logicalBufferHeight = Math.max(
      1,
      Math.round(Math.max(1, effectiveTargetHeight) * Math.max(1, renderResolutionScale)),
    );
    const nextWidth = currentFilterState.isFilterEnabled
      ? Math.max(displayBufferWidth, logicalBufferWidth)
      : displayBufferWidth;
    const nextHeight = currentFilterState.isFilterEnabled
      ? Math.max(displayBufferHeight, logicalBufferHeight)
      : displayBufferHeight;

    if (app.canvas.width !== nextWidth) app.canvas.width = nextWidth;
    if (app.canvas.height !== nextHeight) app.canvas.height = nextHeight;
    app.canvas.style.position = "absolute";
    app.canvas.style.left = `${Math.round(viewRect.x)}px`;
    app.canvas.style.top = `${Math.round(viewRect.y)}px`;
    app.canvas.style.width = `${styleWidth}px`;
    app.canvas.style.height = `${styleHeight}px`;
    app.canvas.style.imageRendering = "pixelated";

    if (currentFilterState.spotMaskStrength > 0.001) {
      console.log("[phosphor-dot layout]", {
        targetWidth: currentFilterState.targetWidth,
        targetHeight: currentFilterState.targetHeight,
        effectiveTargetWidth,
        effectiveTargetHeight,
        styleWidth,
        styleHeight,
        displayBufferWidth,
        displayBufferHeight,
        logicalBufferWidth,
        logicalBufferHeight,
        canvasWidth: app.canvas.width,
        canvasHeight: app.canvas.height,
      });
    }

    renderFrame();
  }, [fitCurrentSprite, renderFrame, renderResolutionScale]);

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

      const renderer = createRenderer(gl);
      const app: CanvasStageApp = {
        canvas,
        renderer,
        ticker: {
          start: startTicker,
          stop: stopTicker,
        },
        startedAt: typeof performance !== "undefined" ? performance.now() : Date.now(),
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
        resolution: renderResolutionScale,
      });

      refreshLayout();

      const shouldAnimateOnInit =
        previewKindRef.current === "video" ||
        previewKindRef.current === "capture" ||
        previewKindRef.current === "image" ||
        isPlayingRef.current;

      if (isPoweredOn && shouldAnimateOnInit) {
        startTicker();
      }
    })();

    try {
      await initPromiseRef.current;
    } finally {
      initPromiseRef.current = null;
    }
  }, [
    debugVideo,
    isPoweredOn,
    refreshLayout,
    renderResolutionScale,
    startTicker,
    stopTicker,
  ]);

  const destroyPixi = useCallback(() => {
    initPromiseRef.current = null;
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
      const { gl, filterProgram, passthroughProgram, texture } = app.renderer;
      gl.deleteTexture(texture);
      gl.deleteProgram(filterProgram);
      gl.deleteProgram(passthroughProgram);
      app.canvas.remove();
    }

    appRef.current = null;
    filterRef.current = null;
    previewElementRef.current = null;
    updateViewportRect(null);
    uploadContextRef.current = null;
    uploadCanvasRef.current = null;
    setIsRendererReady(false);
  }, [stopTicker, updateViewportRect]);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        scheduleRefreshLayout();
      });
      observer.observe(host);
      return () => {
        observer.disconnect();
      };
    }

    const handleResize = () => {
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
    viewportRect,
    setViewportRect: updateViewportRect,
    applyFilterState,
    createVideoTexture: (_video: HTMLVideoElement) => null,
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
