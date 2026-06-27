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
  lumaAmount: number;
  lumaLow: number;
  lumaHigh: number;
  lumaKnee: number;
  saturationAmount: number;
  saturationLow: number;
  saturationHigh: number;
  saturationKnee: number;
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
  uLumaAmount: WebGLUniformLocation | null;
  uLumaLow: WebGLUniformLocation | null;
  uLumaHigh: WebGLUniformLocation | null;
  uLumaKnee: WebGLUniformLocation | null;
  uSaturationAmount: WebGLUniformLocation | null;
  uSaturationLow: WebGLUniformLocation | null;
  uSaturationHigh: WebGLUniformLocation | null;
  uSaturationKnee: WebGLUniformLocation | null;
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

type KHRParallelShaderCompile = {
  COMPLETION_STATUS_KHR: number;
};

// --- Program binary cache (IndexedDB) ---
// Windows ANGLE translates GLSL→HLSL which can take minutes for large shaders.
// Caching the compiled binary skips that on subsequent loads.

const SHADER_CACHE_DB = "retro-player-shader-cache";
const SHADER_CACHE_STORE = "programs";

type CachedBinaries = {
  filter: { format: number; data: ArrayBuffer };
  passthrough: { format: number; data: ArrayBuffer };
};

function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

function getBinaryCacheKey(gl: WebGL2RenderingContext): string {
  const renderer = (gl.getParameter(gl.RENDERER) as string | null) ?? "unknown";
  const hash = fnv1a(VERTEX_SHADER_SOURCE + FILTER_FRAGMENT + PASS_THROUGH_FRAGMENT);
  return `${renderer}::${hash}`;
}

async function openCacheDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(SHADER_CACHE_DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(SHADER_CACHE_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readCachedBinaries(key: string): Promise<CachedBinaries | null> {
  try {
    const db = await openCacheDB();
    return await new Promise<CachedBinaries | null>((resolve, reject) => {
      const req = db.transaction(SHADER_CACHE_STORE, "readonly")
        .objectStore(SHADER_CACHE_STORE).get(key);
      req.onsuccess = () => resolve((req.result as CachedBinaries) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function writeCachedBinaries(key: string, value: CachedBinaries): Promise<void> {
  try {
    const db = await openCacheDB();
    await new Promise<void>((resolve, reject) => {
      const req = db.transaction(SHADER_CACHE_STORE, "readwrite")
        .objectStore(SHADER_CACHE_STORE).put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Cache write failure is non-fatal
  }
}

// PROGRAM_BINARY_LENGTH (0x8741) and programBinary/getProgramBinary are part of
// WebGL2 core but absent from TypeScript's lib.dom.d.ts. Cast via this interface.
type GL2WithBinary = WebGL2RenderingContext & {
  readonly PROGRAM_BINARY_LENGTH: 0x8741;
  getProgramBinary(program: WebGLProgram): { binary: ArrayBuffer; format: number } | null;
  programBinary(program: WebGLProgram, binaryFormat: number, binary: ArrayBuffer | ArrayBufferView): void;
};

function getProgramBinaryEntry(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
): { format: number; data: ArrayBuffer } | null {
  try {
    const gl2 = gl as GL2WithBinary;
    const len = gl.getProgramParameter(program, gl2.PROGRAM_BINARY_LENGTH) as number;
    if (!len) return null;
    const result = gl2.getProgramBinary(program);
    if (!result?.binary) return null;
    return { format: result.format, data: result.binary };
  } catch {
    return null;
  }
}

function restoreProgramFromBinary(
  gl: WebGL2RenderingContext,
  entry: { format: number; data: ArrayBuffer },
): WebGLProgram | null {
  try {
    const gl2 = gl as GL2WithBinary;
    const program = gl.createProgram();
    if (!program) return null;
    gl2.programBinary(program, entry.format, entry.data);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    return program;
  } catch {
    return null;
  }
}

// Submit shader compilation and linking without blocking on status checks.
// Caller must await completion before calling gl.getProgramParameter(LINK_STATUS).
function submitProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram {
  const vert = gl.createShader(gl.VERTEX_SHADER);
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vert || !frag) throw new Error("Failed to create shader.");

  gl.shaderSource(vert, vertexSource);
  gl.shaderSource(frag, fragmentSource);
  gl.compileShader(vert);
  gl.compileShader(frag);

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vert);
    gl.deleteShader(frag);
    throw new Error("Failed to create WebGL program.");
  }

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  gl.deleteShader(vert);
  gl.deleteShader(frag);

  return program;
}

// Wait for both programs to finish compiling, then verify link status.
// Uses WEBGL_parallel_shader_compile for non-blocking polling when available.
// Without the extension, yields via setTimeout so the UI can breathe, but the
// final gl.getProgramParameter(LINK_STATUS) call is still synchronous on the GPU.
async function waitAndVerifyPrograms(
  gl: WebGL2RenderingContext,
  programs: WebGLProgram[],
): Promise<void> {
  const ext = (
    gl.getExtension("WEBGL_parallel_shader_compile") ??
    gl.getExtension("KHR_parallel_shader_compile")
  ) as KHRParallelShaderCompile | null;

  if (ext) {
    await new Promise<void>((resolve) => {
      const poll = () => {
        const allDone = programs.every(
          (p) => gl.getProgramParameter(p, ext.COMPLETION_STATUS_KHR) as boolean,
        );
        if (allDone) resolve();
        else requestAnimationFrame(poll);
      };
      requestAnimationFrame(poll);
    });
  } else {
    // Yield at least one frame so React can paint before blocking on link status.
    await new Promise<void>((resolve) => { requestAnimationFrame(() => resolve()); });
  }

  for (const program of programs) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || "Unknown program link error.";
      gl.deleteProgram(program);
      throw new Error(message);
    }
  }
}

export class TetoricaRetroVideoPipeline {
  private static debugEl: HTMLElement | null = null;

  private static showDebug(msg: string) {
    if (typeof document === "undefined") return;
    if (!TetoricaRetroVideoPipeline.debugEl) {
      const el = document.createElement("div");
      el.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:99999;background:rgba(0,0,0,0.85);color:#0f0;font-family:monospace;font-size:13px;padding:6px 8px;white-space:pre-wrap;word-break:break-all;pointer-events:none;";
      document.body.appendChild(el);
      TetoricaRetroVideoPipeline.debugEl = el;
    }
    TetoricaRetroVideoPipeline.debugEl.textContent = msg;
  }

  private readonly gl: WebGL2RenderingContext;

  // null until the background filter compilation finishes
  private filterProgram: WebGLProgram | null;

  private readonly passthroughProgram: WebGLProgram;

  private readonly texture: WebGLTexture;

  private readonly vao: WebGLVertexArrayObject;

  private uniformLocations: RendererUniformLocations | null;

  private currentSource: RetroVideoSource | null = null;

  private currentFilterState: RetroVideoFilterState | null = null;

  private outputEnabled = true;

  private startedAt = nowMs();

  // Called once the background filter compilation succeeds.
  setFilterProgram(program: WebGLProgram): void {
    const { gl } = this;
    if (this.filterProgram) gl.deleteProgram(this.filterProgram);
    this.filterProgram = program;
    gl.useProgram(program);
    gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
    this.uniformLocations = this.buildUniformLocations(program);
    // Reset time so CRT/glow animations start from t=0 (avoids large initial uTime jump).
    this.resetAnimationClock();
  }

  // onFilterReady is called after the background filter compilation finishes.
  // The caller (useRetroPixiStage) uses it to trigger safeRender() + startTicker()
  // so the render loop picks up the filter with a valid currentSource/currentFilterState.
  static async create(
    gl: WebGL2RenderingContext,
    onFilterReady?: () => void,
  ): Promise<TetoricaRetroVideoPipeline> {
    const cacheKey = getBinaryCacheKey(gl);

    // Try restoring from binary cache (skips GLSL→HLSL translation on Windows)
    const cached = await readCachedBinaries(cacheKey);
    if (cached) {
      const filterProgram = restoreProgramFromBinary(gl, cached.filter);
      const passthroughProgram = restoreProgramFromBinary(gl, cached.passthrough);
      if (filterProgram && passthroughProgram) {
        const pipeline = new TetoricaRetroVideoPipeline(gl, passthroughProgram);
        pipeline.setFilterProgram(filterProgram);
        return pipeline;
      }
    }

    // Fast path: compile passthrough only → return and render immediately
    const passthroughProgram = submitProgram(gl, VERTEX_SHADER_SOURCE, PASS_THROUGH_FRAGMENT);
    await waitAndVerifyPrograms(gl, [passthroughProgram]);
    const pipeline = new TetoricaRetroVideoPipeline(gl, passthroughProgram);

    // Background: compile filter shader after yielding so the browser can paint first.
    // On Windows/ANGLE this can take minutes; passthrough renders in the meantime.
    requestAnimationFrame(() => {
      const filterJob = submitProgram(gl, VERTEX_SHADER_SOURCE, FILTER_FRAGMENT);
      waitAndVerifyPrograms(gl, [filterJob]).then(() => {
        pipeline.setFilterProgram(filterJob);
        onFilterReady?.();
        const filterBin = getProgramBinaryEntry(gl, filterJob);
        const passthroughBin = getProgramBinaryEntry(gl, passthroughProgram);
        if (filterBin && passthroughBin) {
          void writeCachedBinaries(cacheKey, { filter: filterBin, passthrough: passthroughBin });
        }
      }).catch((err: unknown) => {
        console.warn("[retro-player] filter shader compile failed:", err);
      });
    });

    return pipeline;
  }

  constructor(gl: WebGL2RenderingContext, passthroughProgram: WebGLProgram) {
    this.gl = gl;
    this.filterProgram = null;
    this.passthroughProgram = passthroughProgram;
    this.uniformLocations = null;

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    if (!vao) throw new Error("Failed to create VAO.");
    this.vao = vao;
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

    gl.useProgram(this.passthroughProgram);
    gl.uniform1i(gl.getUniformLocation(this.passthroughProgram, "uTexture"), 0);
  }

  private buildUniformLocations(filterProgram: WebGLProgram): RendererUniformLocations {
    const { gl } = this;
    return {
      uTargetSize: gl.getUniformLocation(filterProgram, "uTargetSize"),
      uSampleTargetSize: gl.getUniformLocation(filterProgram, "uSampleTargetSize"),
      uColorLevels: gl.getUniformLocation(filterProgram, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(filterProgram, "uDitherStrength"),
      uPaletteMode: gl.getUniformLocation(filterProgram, "uPaletteMode"),
      uCurvature: gl.getUniformLocation(filterProgram, "uCurvature"),
      uScanlineStrength: gl.getUniformLocation(filterProgram, "uScanlineStrength"),
      uScanline2Strength: gl.getUniformLocation(filterProgram, "uScanline2Strength"),
      uScanlineBrightnessFade: gl.getUniformLocation(filterProgram, "uScanlineBrightnessFade"),
      uVignetteStrength: gl.getUniformLocation(filterProgram, "uVignetteStrength"),
      uGlowStrength: gl.getUniformLocation(filterProgram, "uGlowStrength"),
      uSmoothStrength: gl.getUniformLocation(filterProgram, "uSmoothStrength"),
      uToonSteps: gl.getUniformLocation(filterProgram, "uToonSteps"),
      uEdgeBoost: gl.getUniformLocation(filterProgram, "uEdgeBoost"),
      uAnimeEdgeLow: gl.getUniformLocation(filterProgram, "uAnimeEdgeLow"),
      uAnimeEdgeHigh: gl.getUniformLocation(filterProgram, "uAnimeEdgeHigh"),
      uPhosphorStrength: gl.getUniformLocation(filterProgram, "uPhosphorStrength"),
      uSpotMaskStrength: gl.getUniformLocation(filterProgram, "uSpotMaskStrength"),
      uBulbRadius: gl.getUniformLocation(filterProgram, "uBulbRadius"),
      uBlackFloor: gl.getUniformLocation(filterProgram, "uBlackFloor"),
      uLumaAmount: gl.getUniformLocation(filterProgram, "uLumaAmount"),
      uLumaLow: gl.getUniformLocation(filterProgram, "uLumaLow"),
      uLumaHigh: gl.getUniformLocation(filterProgram, "uLumaHigh"),
      uLumaKnee: gl.getUniformLocation(filterProgram, "uLumaKnee"),
      uSaturationAmount: gl.getUniformLocation(filterProgram, "uSaturationAmount"),
      uSaturationLow: gl.getUniformLocation(filterProgram, "uSaturationLow"),
      uSaturationHigh: gl.getUniformLocation(filterProgram, "uSaturationHigh"),
      uSaturationKnee: gl.getUniformLocation(filterProgram, "uSaturationKnee"),
      uPhosphorDotLightBalance: gl.getUniformLocation(filterProgram, "uPhosphorDotLightBalance"),
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

  private renderCount = 0;

  render() {
    const { gl } = this;
    if (gl.isContextLost()) {
      console.warn("[retro-player] render() skipped: WebGL context is lost");
      return;
    }

    gl.bindVertexArray(this.vao);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.01, 0.02, 0.01, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const source = this.currentSource;
    const filterState = this.currentFilterState;
    if (!this.outputEnabled || !source || !filterState) {
      TetoricaRetroVideoPipeline.showDebug(`EXIT out=${this.outputEnabled ? 1 : 0} src=${!!source ? 1 : 0} fs=${!!filterState ? 1 : 0}`);
      this.renderCount++;
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

    const usingFilter = filterState.isFilterEnabled && this.filterProgram;
    if (usingFilter) {
      gl.useProgram(this.filterProgram);
      const sourceSize = getRetroVideoSourceSize(source);
      this.applyFilterUniforms(filterState, sourceSize.width, sourceSize.height);
    } else {
      gl.useProgram(this.passthroughProgram);
    }

    if (this.renderCount < 200) {
      const sourceSize = getRetroVideoSourceSize(source);
      const srcType = source instanceof HTMLVideoElement ? "vid" : source instanceof HTMLImageElement ? "img" : "cvs";
      const glErr = gl.getError();
      const info = `f=${!!usingFilter ? 1 : 0} fp=${!!this.filterProgram ? 1 : 0} src=${srcType} ${sourceSize.width}x${sourceSize.height} up=${uploadSource === source ? "d" : "c"} err=${glErr} buf=${gl.drawingBufferWidth}x${gl.drawingBufferHeight}`;
      TetoricaRetroVideoPipeline.showDebug(info);
    }
    this.renderCount++;

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  dispose() {
    this.gl.deleteTexture(this.texture);
    this.gl.deleteVertexArray(this.vao);
    if (this.filterProgram) this.gl.deleteProgram(this.filterProgram);
    this.gl.deleteProgram(this.passthroughProgram);
    this.currentSource = null;
    this.currentFilterState = null;
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

    // The WebGL shader quantizes pixels via uTargetSize uniforms, so direct
    // upload always works. Avoids drawImage() failures on older Android.
    return source;
  }

  private applyFilterUniforms(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
  ) {
    if (!this.uniformLocations || !this.filterProgram) return;
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
    gl.uniform1f(this.uniformLocations.uLumaAmount, filterState.lumaAmount);
    gl.uniform1f(this.uniformLocations.uLumaLow, filterState.lumaLow);
    gl.uniform1f(this.uniformLocations.uLumaHigh, filterState.lumaHigh);
    gl.uniform1f(this.uniformLocations.uLumaKnee, filterState.lumaKnee);
    gl.uniform1f(this.uniformLocations.uSaturationAmount, filterState.saturationAmount);
    gl.uniform1f(this.uniformLocations.uSaturationLow, filterState.saturationLow);
    gl.uniform1f(this.uniformLocations.uSaturationHigh, filterState.saturationHigh);
    gl.uniform1f(this.uniformLocations.uSaturationKnee, filterState.saturationKnee);
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
