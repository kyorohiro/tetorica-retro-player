import {
  MONO_TINTS,
  paletteModeToUniform,
  type MonoTintMode,
  type PaletteMode,
} from "../retro/config.ts";
import { FILTER_FRAGMENT } from "../retro/filterShader.ts";

export type RetroVideoFilterState = {
  targetWidth: number;
  targetHeight: number;
  matchTargetAspect: boolean;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  curvature: number;
  scanlineStrength: number;
  scanline2Strength: number;
  scanlineBrightnessFade: number;
  vignetteStrength: number;
  glowStrength: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  phosphorDotLightBalance: number;
  phosphorDotInternalScale: boolean;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  closeUpNoiseStrength: number;
  monoTint: MonoTintMode;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  isFilterEnabled: boolean;
};

export type RetroVideoSource =
  | HTMLVideoElement
  | HTMLImageElement
  | HTMLCanvasElement
  | RawRetroVideoFrame;

export type RawRetroVideoFrame = {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
};

type RendererUniformLocations = {
  uTargetSize: WebGLUniformLocation | null;
  uSampleTargetSize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uPaletteMode: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
  uScanlineStrength: WebGLUniformLocation | null;
  uScanline2Strength: WebGLUniformLocation | null;
  uScanlineBrightnessFade: WebGLUniformLocation | null;
  uVignetteStrength: WebGLUniformLocation | null;
  uGlowStrength: WebGLUniformLocation | null;
  uSmoothStrength: WebGLUniformLocation | null;
  uToonSteps: WebGLUniformLocation | null;
  uEdgeBoost: WebGLUniformLocation | null;
  uAnimeEdgeLow: WebGLUniformLocation | null;
  uAnimeEdgeHigh: WebGLUniformLocation | null;
  uPhosphorStrength: WebGLUniformLocation | null;
  uSpotMaskStrength: WebGLUniformLocation | null;
  uBulbRadius: WebGLUniformLocation | null;
  uBlackFloor: WebGLUniformLocation | null;
  uPhosphorDotLightBalance: WebGLUniformLocation | null;
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

const LARGE_VIDEO_SOURCE_THRESHOLD = 640;

const nowMs = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

const isHtmlVideoElement = (value: unknown): value is HTMLVideoElement =>
  typeof HTMLVideoElement !== "undefined" && value instanceof HTMLVideoElement;

const isHtmlImageElement = (value: unknown): value is HTMLImageElement =>
  typeof HTMLImageElement !== "undefined" && value instanceof HTMLImageElement;

const isHtmlCanvasElement = (value: unknown): value is HTMLCanvasElement =>
  typeof HTMLCanvasElement !== "undefined" && value instanceof HTMLCanvasElement;

const isRawRetroVideoFrame = (value: unknown): value is RawRetroVideoFrame =>
  Boolean(
    value &&
      typeof value === "object" &&
      "width" in value &&
      "height" in value &&
      "data" in value,
  );

export const getRetroVideoSourceSize = (source: RetroVideoSource) => ({
  width:
    isHtmlVideoElement(source)
      ? source.videoWidth
      : isHtmlImageElement(source)
        ? source.naturalWidth
        : source.width,
  height:
    isHtmlVideoElement(source)
      ? source.videoHeight
      : isHtmlImageElement(source)
        ? source.naturalHeight
        : source.height,
});

const shouldUseDirectVideoUpload = (
  source: RetroVideoSource,
  sourceWidth: number,
  sourceHeight: number,
) =>
  isHtmlVideoElement(source) &&
  (
    sourceWidth > LARGE_VIDEO_SOURCE_THRESHOLD ||
    sourceHeight > LARGE_VIDEO_SOURCE_THRESHOLD
  );

export const isPhosphorDotModeEnabled = (filterState: RetroVideoFilterState) =>
  filterState.spotMaskStrength > 0.001 &&
  (
    filterState.phosphorDotInternalScale ||
    filterState.phosphorDotBrightCore ||
    filterState.phosphorDotCellFill > 0.001 ||
    filterState.phosphorDotFlatDisc ||
    filterState.phosphorDotNeighborBlend
  );

const getPhosphorDotInternalScale = (filterState: RetroVideoFilterState) =>
  isPhosphorDotModeEnabled(filterState) && filterState.phosphorDotInternalScale ? 2 : 1;

const getAspectCorrectedSize = (
  requestedWidth: number,
  requestedHeight: number,
  sourceWidth?: number,
  sourceHeight?: number,
) => {
  if (
    sourceWidth === undefined ||
    sourceHeight === undefined ||
    sourceWidth <= 0 ||
    sourceHeight <= 0
  ) {
    return {
      width: requestedWidth,
      height: requestedHeight,
    };
  }

  const sourceAspect = sourceWidth / sourceHeight;
  const requestedAspect = requestedWidth / requestedHeight;

  if (requestedAspect > sourceAspect) {
    return {
      width: Math.max(1, Math.round(requestedHeight * sourceAspect)),
      height: requestedHeight,
    };
  }

  return {
    width: requestedWidth,
    height: Math.max(1, Math.round(requestedWidth / sourceAspect)),
  };
};

const getPhosphorDotViewportLimitedSize = (
  width: number,
  height: number,
  filterState: RetroVideoFilterState,
  internalScale: number,
  visibleWidth?: number,
  visibleHeight?: number,
) => {
  if (
    !isPhosphorDotModeEnabled(filterState) ||
    visibleWidth === undefined ||
    visibleHeight === undefined ||
    visibleWidth <= 0 ||
    visibleHeight <= 0
  ) {
    return { width, height };
  }

  const baseMinCellPixels = Math.max(1.1, 2.15 + filterState.bulbRadius * 1.15);
  const minCellPixels = Math.max(1.0, baseMinCellPixels / Math.max(internalScale, 1));
  const maxWidth = Math.max(1, Math.floor(visibleWidth / minCellPixels));
  const maxHeight = Math.max(1, Math.floor(visibleHeight / minCellPixels));
  const scale = Math.min(
    1,
    maxWidth / Math.max(width, 1),
    maxHeight / Math.max(height, 1),
  );

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
};

export const getEffectiveRetroTargetSize = (
  filterState: RetroVideoFilterState,
  sourceWidth?: number,
  sourceHeight?: number,
  visibleWidth?: number,
  visibleHeight?: number,
) => {
  const internalScale = getPhosphorDotInternalScale(filterState);
  const requestedWidth = Math.max(filterState.targetWidth, 1);
  const requestedHeight = Math.max(filterState.targetHeight, 1);
  const aspectCorrected = filterState.matchTargetAspect
    ? getAspectCorrectedSize(
      requestedWidth,
      requestedHeight,
      sourceWidth,
      sourceHeight,
    )
    : {
      width: requestedWidth,
      height: requestedHeight,
    };
  const scaledWidth = aspectCorrected.width * internalScale;
  const scaledHeight = aspectCorrected.height * internalScale;
  const viewportLimited = getPhosphorDotViewportLimitedSize(
    scaledWidth,
    scaledHeight,
    filterState,
    internalScale,
    visibleWidth,
    visibleHeight,
  );

  return {
    width: viewportLimited.width,
    height: viewportLimited.height,
    sampleWidth: Math.max(1, Math.round(scaledWidth)),
    sampleHeight: Math.max(1, Math.round(scaledHeight)),
    internalScale,
    isPhosphorDotMode: isPhosphorDotModeEnabled(filterState),
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

export class TetoricaRetroVideoPipeline {
  private readonly gl: WebGL2RenderingContext;

  private readonly filterProgram: WebGLProgram;

  private readonly passthroughProgram: WebGLProgram;

  private readonly texture: WebGLTexture;

  private readonly uniformLocations: RendererUniformLocations;

  private uploadCanvas: HTMLCanvasElement | null = null;

  private uploadContext: CanvasRenderingContext2D | null = null;

  private currentSource: RetroVideoSource | null = null;

  private currentFilterState: RetroVideoFilterState | null = null;

  private outputEnabled = true;

  private startedAt = nowMs();

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.filterProgram = createProgram(gl, VERTEX_SHADER_SOURCE, FILTER_FRAGMENT);
    this.passthroughProgram = createProgram(gl, VERTEX_SHADER_SOURCE, PASS_THROUGH_FRAGMENT);

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
    this.texture = texture;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.useProgram(this.filterProgram);
    gl.uniform1i(gl.getUniformLocation(this.filterProgram, "uTexture"), 0);
    gl.useProgram(this.passthroughProgram);
    gl.uniform1i(gl.getUniformLocation(this.passthroughProgram, "uTexture"), 0);

    this.uniformLocations = {
      uTargetSize: gl.getUniformLocation(this.filterProgram, "uTargetSize"),
      uSampleTargetSize: gl.getUniformLocation(this.filterProgram, "uSampleTargetSize"),
      uColorLevels: gl.getUniformLocation(this.filterProgram, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(this.filterProgram, "uDitherStrength"),
      uPaletteMode: gl.getUniformLocation(this.filterProgram, "uPaletteMode"),
      uCurvature: gl.getUniformLocation(this.filterProgram, "uCurvature"),
      uScanlineStrength: gl.getUniformLocation(this.filterProgram, "uScanlineStrength"),
      uScanline2Strength: gl.getUniformLocation(this.filterProgram, "uScanline2Strength"),
      uScanlineBrightnessFade: gl.getUniformLocation(this.filterProgram, "uScanlineBrightnessFade"),
      uVignetteStrength: gl.getUniformLocation(this.filterProgram, "uVignetteStrength"),
      uGlowStrength: gl.getUniformLocation(this.filterProgram, "uGlowStrength"),
      uSmoothStrength: gl.getUniformLocation(this.filterProgram, "uSmoothStrength"),
      uToonSteps: gl.getUniformLocation(this.filterProgram, "uToonSteps"),
      uEdgeBoost: gl.getUniformLocation(this.filterProgram, "uEdgeBoost"),
      uAnimeEdgeLow: gl.getUniformLocation(this.filterProgram, "uAnimeEdgeLow"),
      uAnimeEdgeHigh: gl.getUniformLocation(this.filterProgram, "uAnimeEdgeHigh"),
      uPhosphorStrength: gl.getUniformLocation(this.filterProgram, "uPhosphorStrength"),
      uSpotMaskStrength: gl.getUniformLocation(this.filterProgram, "uSpotMaskStrength"),
      uBulbRadius: gl.getUniformLocation(this.filterProgram, "uBulbRadius"),
      uBlackFloor: gl.getUniformLocation(this.filterProgram, "uBlackFloor"),
      uPhosphorDotLightBalance: gl.getUniformLocation(this.filterProgram, "uPhosphorDotLightBalance"),
      uPixelAspect: gl.getUniformLocation(this.filterProgram, "uPixelAspect"),
      uPhosphorDotMode: gl.getUniformLocation(this.filterProgram, "uPhosphorDotMode"),
      uPhosphorDotInternalScale: gl.getUniformLocation(this.filterProgram, "uPhosphorDotInternalScale"),
      uPhosphorDotBrightCore: gl.getUniformLocation(this.filterProgram, "uPhosphorDotBrightCore"),
      uPhosphorDotCellFill: gl.getUniformLocation(this.filterProgram, "uPhosphorDotCellFill"),
      uPhosphorDotFlatDisc: gl.getUniformLocation(this.filterProgram, "uPhosphorDotFlatDisc"),
      uPhosphorDotNeighborBlend: gl.getUniformLocation(this.filterProgram, "uPhosphorDotNeighborBlend"),
      uCloseUpNoiseStrength: gl.getUniformLocation(this.filterProgram, "uCloseUpNoiseStrength"),
      uMonoTint: gl.getUniformLocation(this.filterProgram, "uMonoTint"),
      uNeonBoost: gl.getUniformLocation(this.filterProgram, "uNeonBoost"),
      uNeonSaturation: gl.getUniformLocation(this.filterProgram, "uNeonSaturation"),
      uNeonDetail: gl.getUniformLocation(this.filterProgram, "uNeonDetail"),
      uTime: gl.getUniformLocation(this.filterProgram, "uTime"),
    };
  }

  setSource(source: RetroVideoSource | null) {
    this.currentSource = source;
  }

  setFilterState(filterState: RetroVideoFilterState) {
    this.currentFilterState = filterState;
  }

  setOutputEnabled(enabled: boolean) {
    this.outputEnabled = enabled;
  }

  resetAnimationClock(startedAt = nowMs()) {
    this.startedAt = startedAt;
  }

  readPixels() {
    const buffer = new Uint8Array(
      Math.max(this.gl.drawingBufferWidth, 1) *
        Math.max(this.gl.drawingBufferHeight, 1) * 4,
    );
    this.gl.readPixels(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      buffer,
    );
    return buffer;
  }

  render() {
    const { gl } = this;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.01, 0.02, 0.01, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const source = this.currentSource;
    const filterState = this.currentFilterState;
    if (!this.outputEnabled || !source || !filterState) {
      return;
    }

    const uploadSource = this.getUploadSource(source, filterState);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    const textureFilter = filterState.isFilterEnabled ? gl.LINEAR : gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, textureFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, textureFilter);
    if (isRawRetroVideoFrame(uploadSource)) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        uploadSource.width,
        uploadSource.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        uploadSource.data,
      );
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, uploadSource);
    }

    if (filterState.isFilterEnabled) {
      const sourceSize = getRetroVideoSourceSize(source);
      this.applyFilterUniforms(filterState, sourceSize.width, sourceSize.height);
      gl.useProgram(this.filterProgram);
    } else {
      gl.useProgram(this.passthroughProgram);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  dispose() {
    this.gl.deleteTexture(this.texture);
    this.gl.deleteProgram(this.filterProgram);
    this.gl.deleteProgram(this.passthroughProgram);
    this.currentSource = null;
    this.currentFilterState = null;
    this.uploadCanvas = null;
    this.uploadContext = null;
  }

  private getUploadSource(
    source: RetroVideoSource,
    filterState: RetroVideoFilterState,
  ): RetroVideoSource {
    if (isRawRetroVideoFrame(source)) {
      return source;
    }

    if (!filterState.isFilterEnabled) {
      return source;
    }

    const sourceSize = getRetroVideoSourceSize(source);
    if (sourceSize.width <= 0 || sourceSize.height <= 0) {
      return source;
    }

    if (shouldUseDirectVideoUpload(source, sourceSize.width, sourceSize.height)) {
      return source;
    }

    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
      sampleWidth,
      sampleHeight,
      isPhosphorDotMode,
    } = getEffectiveRetroTargetSize(
      filterState,
      sourceSize.width,
      sourceSize.height,
    );
    const targetWidth = Math.max(
      1,
      Math.round(isPhosphorDotMode ? sampleWidth : effectiveTargetWidth),
    );
    const targetHeight = Math.max(
      1,
      Math.round(isPhosphorDotMode ? sampleHeight : effectiveTargetHeight),
    );

    const uploadContext = this.ensureUploadContext();
    if (!uploadContext || !this.uploadCanvas) {
      return source;
    }

    if (this.uploadCanvas.width !== targetWidth) this.uploadCanvas.width = targetWidth;
    if (this.uploadCanvas.height !== targetHeight) this.uploadCanvas.height = targetHeight;

    uploadContext.imageSmoothingEnabled = true;
    uploadContext.imageSmoothingQuality = "high";
    uploadContext.fillStyle = "#000";
    uploadContext.fillRect(0, 0, targetWidth, targetHeight);
    uploadContext.drawImage(source, 0, 0, targetWidth, targetHeight);
    return this.uploadCanvas;
  }

  private ensureUploadContext() {
    if (this.uploadCanvas && this.uploadContext) {
      return this.uploadContext;
    }

    if (typeof document === "undefined") {
      return null;
    }

    const uploadCanvas = document.createElement("canvas");
    const uploadContext = uploadCanvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (!uploadContext) {
      return null;
    }

    this.uploadCanvas = uploadCanvas;
    this.uploadContext = uploadContext;
    return uploadContext;
  }

  private applyFilterUniforms(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
  ) {
    const { gl } = this;
    const canvasElement = isHtmlCanvasElement(gl.canvas) ? gl.canvas : null;
    const visibleWidth = Math.max(canvasElement?.clientWidth ?? gl.drawingBufferWidth, 1);
    const visibleHeight = Math.max(canvasElement?.clientHeight ?? gl.drawingBufferHeight, 1);
    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
      sampleWidth,
      sampleHeight,
      isPhosphorDotMode,
    } = getEffectiveRetroTargetSize(
      filterState,
      sourceWidth,
      sourceHeight,
      visibleWidth,
      visibleHeight,
    );

    gl.useProgram(this.filterProgram);
    gl.uniform2f(
      this.uniformLocations.uTargetSize,
      effectiveTargetWidth,
      effectiveTargetHeight,
    );
    gl.uniform2f(
      this.uniformLocations.uSampleTargetSize,
      sampleWidth,
      sampleHeight,
    );
    gl.uniform1f(this.uniformLocations.uColorLevels, Math.max(filterState.colorLevels, 2));
    gl.uniform1f(this.uniformLocations.uDitherStrength, filterState.ditherStrength);
    gl.uniform1f(
      this.uniformLocations.uPaletteMode,
      paletteModeToUniform(filterState.paletteMode),
    );
    gl.uniform1f(this.uniformLocations.uCurvature, filterState.curvature);
    gl.uniform1f(this.uniformLocations.uScanlineStrength, filterState.scanlineStrength);
    gl.uniform1f(this.uniformLocations.uScanline2Strength, filterState.scanline2Strength);
    gl.uniform1f(
      this.uniformLocations.uScanlineBrightnessFade,
      filterState.scanlineBrightnessFade,
    );
    gl.uniform1f(this.uniformLocations.uVignetteStrength, filterState.vignetteStrength);
    gl.uniform1f(this.uniformLocations.uGlowStrength, filterState.glowStrength);
    gl.uniform1f(this.uniformLocations.uSmoothStrength, filterState.smoothStrength);
    gl.uniform1f(this.uniformLocations.uToonSteps, filterState.toonSteps);
    gl.uniform1f(this.uniformLocations.uEdgeBoost, filterState.edgeBoost);
    gl.uniform1f(this.uniformLocations.uAnimeEdgeLow, filterState.animeEdgeLow);
    gl.uniform1f(this.uniformLocations.uAnimeEdgeHigh, filterState.animeEdgeHigh);
    gl.uniform1f(this.uniformLocations.uPhosphorStrength, filterState.phosphorStrength);
    gl.uniform1f(this.uniformLocations.uSpotMaskStrength, filterState.spotMaskStrength);
    gl.uniform1f(this.uniformLocations.uBulbRadius, filterState.bulbRadius);
    gl.uniform1f(this.uniformLocations.uBlackFloor, filterState.blackFloor);
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotLightBalance,
      filterState.phosphorDotLightBalance,
    );
    gl.uniform1f(
      this.uniformLocations.uPixelAspect,
      (Math.max(gl.drawingBufferWidth, 1) * effectiveTargetHeight) /
        (Math.max(gl.drawingBufferHeight, 1) * effectiveTargetWidth),
    );
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotMode,
      isPhosphorDotMode ? 1 : 0,
    );
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotInternalScale,
      filterState.phosphorDotInternalScale ? 1 : 0,
    );
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotBrightCore,
      filterState.phosphorDotBrightCore ? 1 : 0,
    );
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotCellFill,
      filterState.phosphorDotCellFill,
    );
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotFlatDisc,
      filterState.phosphorDotFlatDisc ? 1 : 0,
    );
    gl.uniform1f(
      this.uniformLocations.uPhosphorDotNeighborBlend,
      filterState.phosphorDotNeighborBlend ? 1 : 0,
    );
    gl.uniform1f(
      this.uniformLocations.uCloseUpNoiseStrength,
      filterState.closeUpNoiseStrength,
    );
    gl.uniform3f(
      this.uniformLocations.uMonoTint,
      ...MONO_TINTS[filterState.monoTint].rgb,
    );
    gl.uniform1f(this.uniformLocations.uNeonBoost, filterState.neonBoost);
    gl.uniform1f(this.uniformLocations.uNeonSaturation, filterState.neonSaturation);
    gl.uniform1f(this.uniformLocations.uNeonDetail, filterState.neonDetail);
    gl.uniform1f(
      this.uniformLocations.uTime,
      (nowMs() - this.startedAt) / 1000,
    );
  }
}
