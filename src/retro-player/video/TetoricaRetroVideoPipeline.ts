import {
  MONO_TINTS,
  paletteModeToUniform,
  type MonoTintMode,
  type PaletteMode,
  type PhosphorDotShape,
} from "../retro/config.ts";
import { FILTER_FRAGMENT_PASS1 } from "../retro/filterPass1Shader.ts";
import { FILTER_FRAGMENT_PASS2 } from "../retro/filterPass2Shader.ts";
import { FILTER_FRAGMENT_PASS1_LITE } from "../retro/filterPass1LiteShader.ts";
import { FILTER_FRAGMENT_PASS2_LITE } from "../retro/filterPass2LiteShader.ts";
import { FILTER_FRAGMENT_PASS1_PC98_LITE } from "../retro/filterPass1Pc98LiteShader.ts";
import { FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE } from "../retro/filterPass2PhosphorLiteShader.ts";
import { resolveVideoFilterLiteDefault } from "../platform/runtime";
import { createSignalInstabilityController } from "./signalInstability";

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
  outputBrightness: number;
  basicContrast: number;
  basicSaturation: number;
  phosphorDotLightBalance: number;
  phosphorDotShape: PhosphorDotShape;
  phosphorDotInternalScale: 1 | 2 | 3;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  phosphorDotGrainStrength: number;
  signalInstabilityEnabled: boolean;
  signalInstabilityStrength: number;
  signalInstabilityFrequency: number;
  focusStrength: number;
  focusWidth: number;
  focusHeight: number;
  focusCenterX: number;
  focusCenterY: number;
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

export type RetroPresentationSamplingMode = "crisp" | "smooth";

function getPhosphorDotShapeValue(shape: PhosphorDotShape): number {
  if (shape === "heart") {
    return 1;
  }
  return 0;
}

type Pass1UniformLocations = {
  uTargetSize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uPaletteMode: WebGLUniformLocation | null;
  uGlowStrength: WebGLUniformLocation | null;
  uSmoothStrength: WebGLUniformLocation | null;
  uToonSteps: WebGLUniformLocation | null;
  uEdgeBoost: WebGLUniformLocation | null;
  uAnimeEdgeLow: WebGLUniformLocation | null;
  uAnimeEdgeHigh: WebGLUniformLocation | null;
  uMonoTint: WebGLUniformLocation | null;
  uNeonBoost: WebGLUniformLocation | null;
  uNeonSaturation: WebGLUniformLocation | null;
  uNeonDetail: WebGLUniformLocation | null;
};

type Pass2UniformLocations = {
  uTargetSize: WebGLUniformLocation | null;
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
  uOutputBrightness: WebGLUniformLocation | null;
  uBasicContrast: WebGLUniformLocation | null;
  uBasicSaturation: WebGLUniformLocation | null;
  uPhosphorDotLightBalance: WebGLUniformLocation | null;
  uPixelAspect: WebGLUniformLocation | null;
  uPhosphorDotMode: WebGLUniformLocation | null;
  uPhosphorDotShape: WebGLUniformLocation | null;
  uPhosphorDotInternalScale: WebGLUniformLocation | null;
  uPhosphorDotBrightCore: WebGLUniformLocation | null;
  uPhosphorDotCellFill: WebGLUniformLocation | null;
  uPhosphorDotFlatDisc: WebGLUniformLocation | null;
  uPhosphorDotNeighborBlend: WebGLUniformLocation | null;
  uPhosphorDotGrainStrength: WebGLUniformLocation | null;
  uSignalInstabilityAmount: WebGLUniformLocation | null;
  uSignalHorizontalSync: WebGLUniformLocation | null;
  uSignalVerticalSync: WebGLUniformLocation | null;
  uSignalStaticNoise: WebGLUniformLocation | null;
  uSignalChromaNoise: WebGLUniformLocation | null;
  uSignalInstabilitySeed: WebGLUniformLocation | null;
  uSignalInstabilityPhase: WebGLUniformLocation | null;
  uFocusStrength: WebGLUniformLocation | null;
  uFocusSize: WebGLUniformLocation | null;
  uFocusCenter: WebGLUniformLocation | null;
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

type WindowsLitePass1Variant = "basic" | "pc98";
type WindowsLitePass2Variant = "basic" | "phosphor";
type WindowsLiteVariantKey = `${WindowsLitePass1Variant}:${WindowsLitePass2Variant}`;

// Only 4 combinations exist. Compiling each at most once (cached) and
// pre-warming the rest in the background avoids a multi-hundred-ms shader
// recompile stall (see docs/issues/windows-lite-shader-parity.md) the first
// time a user switches to a variant mid-playback (e.g. enabling phosphor).
const ALL_WINDOWS_LITE_VARIANT_KEYS: WindowsLiteVariantKey[] = [
  "basic:basic",
  "basic:phosphor",
  "pc98:basic",
  "pc98:phosphor",
];

const isPc98PaletteMode = (mode: PaletteMode) =>
  mode === "pc98" ||
  mode === "pc98_tile" ||
  mode === "pc98_512" ||
  mode === "pc98_512_sat" ||
  mode === "pc98_4096";

const getWindowsLiteVariantKey = (
  filterState: RetroVideoFilterState | null,
): WindowsLiteVariantKey => {
  const pass1: WindowsLitePass1Variant =
    filterState && isPc98PaletteMode(filterState.paletteMode) ? "pc98" : "basic";
  const pass2: WindowsLitePass2Variant =
    filterState &&
    (
      filterState.phosphorStrength > 0.001 ||
      filterState.spotMaskStrength > 0.001 ||
      isPhosphorDotModeEnabled(filterState)
    )
      ? "phosphor"
      : "basic";

  return `${pass1}:${pass2}`;
};

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

const hasRenderableVideoFrame = (video: HTMLVideoElement) =>
  video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
  video.videoWidth > 0 &&
  video.videoHeight > 0;

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
    filterState.phosphorDotInternalScale > 1 ||
    filterState.phosphorDotBrightCore ||
    filterState.phosphorDotCellFill > 0.001 ||
    filterState.phosphorDotFlatDisc ||
    filterState.phosphorDotNeighborBlend
  );

const getPhosphorDotInternalScale = (filterState: RetroVideoFilterState) =>
  isPhosphorDotModeEnabled(filterState) ? filterState.phosphorDotInternalScale : 1;

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

const getParallelShaderCompileExtension = (gl: WebGL2RenderingContext) =>
  (
    gl.getExtension("WEBGL_parallel_shader_compile") ??
    gl.getExtension("KHR_parallel_shader_compile")
  ) as KHRParallelShaderCompile | null;

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
  const ext = getParallelShaderCompileExtension(gl);

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
    void msg;
    void TetoricaRetroVideoPipeline.debugEl;
    // Keep call sites available for later investigation, but do not render the
    // on-screen debug overlay in normal builds.
  }

  private readonly gl: WebGL2RenderingContext;
  private readonly windowsLiteMode: boolean;

  // null until the background filter compilation finishes
  private filterPass1Program: WebGLProgram | null = null;
  private filterPass2Program: WebGLProgram | null = null;

  private readonly passthroughProgram: WebGLProgram;

  private readonly texture: WebGLTexture;
  private textureSamplingFilter: number | null = null;

  private readonly vao: WebGLVertexArrayObject;

  private pass1Locs: Pass1UniformLocations | null = null;
  private pass2Locs: Pass2UniformLocations | null = null;

  // Framebuffer for Pass 1 output (palette-quantized frame)
  private fbo: WebGLFramebuffer | null = null;
  private fboTexture: WebGLTexture | null = null;
  private fboWidth = 0;
  private fboHeight = 0;

  private currentSource: RetroVideoSource | null = null;

  private currentFilterState: RetroVideoFilterState | null = null;
  private readonly signalInstabilityController = createSignalInstabilityController();

  private outputEnabled = true;
  private presentationSamplingMode: RetroPresentationSamplingMode = "crisp";

  private startedAt = nowMs();
  private windowsLiteVariantKey: WindowsLiteVariantKey | null = null;
  private windowsLitePendingVariantKey: WindowsLiteVariantKey | null = null;
  private windowsLiteCompilePromise: Promise<void> | null = null;
  private readonly windowsLiteProgramCache = new Map<
    WindowsLiteVariantKey,
    { pass1: WebGLProgram; pass2: WebGLProgram }
  >();
  private windowsLitePrewarmStarted = false;
  private isDisposed = false;

  // Skip re-uploading the same HTMLImageElement on consecutive render() calls.
  // Video frames always upload (content changes each frame). Raw frames (HEIC)
  // are never equal by reference, so they always upload too.
  private lastUploadedImageSource: HTMLImageElement | null = null;
  private lastUploadedVideoSource: HTMLVideoElement | null = null;
  private lastUploadedVideoTime = Number.NaN;

  // Ensure the FBO matches the current drawing buffer size.
  private ensureFbo(width: number, height: number) {
    if (this.fboWidth === width && this.fboHeight === height && this.fbo) return;

    const { gl } = this;
    if (this.fbo) gl.deleteFramebuffer(this.fbo);
    if (this.fboTexture) gl.deleteTexture(this.fboTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Creating/configuring `tex` above left it bound on whatever texture
    // unit was last active (unit 0, per render()'s upload step just before
    // this call). Restore the source texture there so pass 1 doesn't end up
    // sampling from the same texture it's about to render into.
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    this.fbo = fbo;
    this.fboTexture = tex;
    this.fboWidth = width;
    this.fboHeight = height;
  }

  // Called once the background filter compilation succeeds.
  setFilterPrograms(pass1: WebGLProgram, pass2: WebGLProgram): void {
    const { gl } = this;
    if (!this.windowsLiteMode) {
      // Non-lite mode compiles the full shader exactly once, so it's safe to
      // free the previous (passthrough) program immediately. In lite mode,
      // pass1/pass2 always come from windowsLiteProgramCache, which owns
      // their lifetime (freed in dispose()) so a previously-used variant can
      // be swapped back in later without recompiling.
      if (this.filterPass1Program && this.filterPass1Program !== this.passthroughProgram) {
        gl.deleteProgram(this.filterPass1Program);
      }
      if (this.filterPass2Program) gl.deleteProgram(this.filterPass2Program);
    }

    this.filterPass1Program = pass1;
    this.filterPass2Program = pass2;

    gl.useProgram(pass1);
    gl.uniform1i(gl.getUniformLocation(pass1, "uTexture"), 0);
    this.pass1Locs = this.buildPass1UniformLocations(pass1);

    gl.useProgram(pass2);
    gl.uniform1i(gl.getUniformLocation(pass2, "uPass1Texture"), 0);
    this.pass2Locs = this.buildPass2UniformLocations(pass2);

    // Reset time so CRT/glow animations start from t=0.
    this.resetAnimationClock();
  }

  private getWindowsLiteShaderSources(variantKey: WindowsLiteVariantKey) {
    const [pass1Variant, pass2Variant] = variantKey.split(":") as [
      WindowsLitePass1Variant,
      WindowsLitePass2Variant,
    ];

    return {
      pass1:
        pass1Variant === "pc98"
          ? FILTER_FRAGMENT_PASS1_PC98_LITE
          : FILTER_FRAGMENT_PASS1_LITE,
      pass2:
        pass2Variant === "phosphor"
          ? FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE
          : FILTER_FRAGMENT_PASS2_LITE,
    };
  }

  private queueWindowsLiteVariant(filterState: RetroVideoFilterState | null) {
    if (!this.windowsLiteMode || this.isDisposed) {
      return;
    }

    const nextVariantKey = getWindowsLiteVariantKey(filterState);
    if (
      nextVariantKey === this.windowsLiteVariantKey ||
      nextVariantKey === this.windowsLitePendingVariantKey
    ) {
      return;
    }

    this.windowsLitePendingVariantKey = nextVariantKey;
    if (this.windowsLiteCompilePromise) {
      return;
    }

    this.startWindowsLiteForegroundCompile();
  }

  // Compiles a variant at most once; subsequent requests for the same
  // variant key are served from cache (near-instant, no shader compile or
  // WEBGL_parallel_shader_compile poll wait). This is what turns a mid-
  // playback variant switch (e.g. enabling phosphor) from a multi-hundred-ms
  // main-thread stall into an instant program swap after the first use —
  // see docs/issues/windows-lite-shader-parity.md for the measured impact.
  private async compileWindowsLiteVariant(
    variantKey: WindowsLiteVariantKey,
  ): Promise<{ pass1: WebGLProgram; pass2: WebGLProgram }> {
    const cached = this.windowsLiteProgramCache.get(variantKey);
    if (cached) return cached;
    if (this.isDisposed || this.gl.isContextLost()) {
      throw new Error("Pipeline was disposed before shader compile started.");
    }

    const { pass1, pass2 } = this.getWindowsLiteShaderSources(variantKey);
    const pass1Program = submitProgram(this.gl, VERTEX_SHADER_SOURCE, pass1);
    const pass2Program = submitProgram(this.gl, VERTEX_SHADER_SOURCE, pass2);

    try {
      await waitAndVerifyPrograms(this.gl, [pass1Program, pass2Program]);
      if (this.isDisposed || this.gl.isContextLost()) {
        throw new Error("Pipeline was disposed during shader compile.");
      }

      const entry = { pass1: pass1Program, pass2: pass2Program };
      this.windowsLiteProgramCache.set(variantKey, entry);
      return entry;
    } catch (error) {
      this.gl.deleteProgram(pass1Program);
      this.gl.deleteProgram(pass2Program);
      throw error;
    }
  }

  private startWindowsLiteForegroundCompile() {
    if (
      this.isDisposed ||
      this.windowsLiteCompilePromise ||
      !this.windowsLitePendingVariantKey ||
      this.windowsLitePendingVariantKey === this.windowsLiteVariantKey
    ) {
      return;
    }

    this.windowsLiteCompilePromise = this.compilePendingWindowsLiteVariant().finally(() => {
      this.windowsLiteCompilePromise = null;
      if (this.isDisposed) return;

      if (
        this.windowsLitePendingVariantKey &&
        this.windowsLitePendingVariantKey !== this.windowsLiteVariantKey
      ) {
        this.startWindowsLiteForegroundCompile();
        return;
      }

      this.maybeStartWindowsLitePrewarm();
    });
  }

  private async compilePendingWindowsLiteVariant() {
    while (
      !this.isDisposed &&
      !this.gl.isContextLost() &&
      this.windowsLitePendingVariantKey &&
      this.windowsLitePendingVariantKey !== this.windowsLiteVariantKey
    ) {
      const variantKey = this.windowsLitePendingVariantKey;
      TetoricaRetroVideoPipeline.showDebug(`filter: loading Windows lite variant ${variantKey}...`);

      try {
        const { pass1, pass2 } = await this.compileWindowsLiteVariant(variantKey);
        if (this.isDisposed || this.gl.isContextLost()) return;

        if (this.windowsLitePendingVariantKey !== variantKey) {
          // A newer request superseded this one; the compiled programs stay
          // cached for whichever variant asks for them next.
          continue;
        }

        this.setFilterPrograms(pass1, pass2);
        this.windowsLiteVariantKey = variantKey;
        this.windowsLitePendingVariantKey = null;
        TetoricaRetroVideoPipeline.showDebug(`filter: Windows lite variant ${variantKey} LOADED`);

        if (!this.windowsLitePrewarmStarted) {
          this.windowsLitePrewarmStarted = true;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        TetoricaRetroVideoPipeline.showDebug(
          `filter: Windows lite variant ${variantKey} failed, keeping previous programs (${message})`,
        );
        this.windowsLitePendingVariantKey = null;
        return;
      }
    }
  }

  private maybeStartWindowsLitePrewarm() {
    if (
      this.isDisposed ||
      !this.windowsLitePrewarmStarted ||
      this.windowsLiteCompilePromise ||
      this.windowsLitePendingVariantKey ||
      this.gl.isContextLost()
    ) {
      return;
    }

    const hasRemainingVariants = ALL_WINDOWS_LITE_VARIANT_KEYS.some(
      (variantKey) => !this.windowsLiteProgramCache.has(variantKey),
    );
    if (!hasRemainingVariants) {
      return;
    }

    this.windowsLiteCompilePromise = this.prewarmRemainingWindowsLiteVariants().finally(() => {
      this.windowsLiteCompilePromise = null;
      if (this.isDisposed) return;

      if (
        this.windowsLitePendingVariantKey &&
        this.windowsLitePendingVariantKey !== this.windowsLiteVariantKey
      ) {
        this.startWindowsLiteForegroundCompile();
        return;
      }

      this.maybeStartWindowsLitePrewarm();
    });
  }

  // Prewarm only while the pipeline is idle. A real user-triggered switch
  // sets windowsLitePendingVariantKey and takes over on the next turn through
  // the worker loop, so cache growth never outranks active interaction.
  private async prewarmRemainingWindowsLiteVariants() {
    for (const variantKey of ALL_WINDOWS_LITE_VARIANT_KEYS) {
      if (this.isDisposed || this.gl.isContextLost()) return;
      if (this.windowsLitePendingVariantKey) return;
      if (this.windowsLiteProgramCache.has(variantKey)) continue;

      await new Promise<void>((resolve) => { requestAnimationFrame(() => resolve()); });
      if (this.isDisposed || this.gl.isContextLost()) return;
      if (this.windowsLitePendingVariantKey) return;

      try {
        await this.compileWindowsLiteVariant(variantKey);
      } catch {
        // Best-effort prewarm; a real switch to this variant will retry.
      }
    }
  }

  // onFilterReady is called after the background filter compilation finishes.
  static async create(
    gl: WebGL2RenderingContext,
    onFilterReady?: () => void,
    options?: {
      videoFilterLiteMode?: boolean;
    },
  ): Promise<TetoricaRetroVideoPipeline> {
    const shouldUseWindowsLiteMode =
      options?.videoFilterLiteMode ?? resolveVideoFilterLiteDefault();

    // Passthrough is tiny — compiles in <10 ms even on ANGLE/Windows.
    const passthroughProgram = submitProgram(gl, VERTEX_SHADER_SOURCE, PASS_THROUGH_FRAGMENT);
    await waitAndVerifyPrograms(gl, [passthroughProgram]);
    const pipeline = new TetoricaRetroVideoPipeline(gl, passthroughProgram, shouldUseWindowsLiteMode);

    if (shouldUseWindowsLiteMode) {
      requestAnimationFrame(async () => {
        pipeline.queueWindowsLiteVariant(null);
        if (pipeline.windowsLiteCompilePromise) {
          await pipeline.windowsLiteCompilePromise;
        }
        onFilterReady?.();
      });

      return pipeline;
    }

    requestAnimationFrame(async () => {
      // Submit both filter passes simultaneously so the parallel-shader-compile
      // extension can overlap their compilation.
      // NOTE: Windows/ANGLE (D3D cache freeze) is already handled above by the
      // shouldUseWindowsLiteMode branch, so no 3-second delay is needed here.
      const pass1Program = submitProgram(gl, VERTEX_SHADER_SOURCE, FILTER_FRAGMENT_PASS1);
      const pass2Program = submitProgram(gl, VERTEX_SHADER_SOURCE, FILTER_FRAGMENT_PASS2);

      try {
        await waitAndVerifyPrograms(gl, [pass1Program, pass2Program]);
      } catch (err) {
        TetoricaRetroVideoPipeline.showDebug(`filter: link failed: ${err}`);
        gl.deleteProgram(pass1Program);
        gl.deleteProgram(pass2Program);
        return;
      }
      if (gl.isContextLost()) return;

      pipeline.setFilterPrograms(pass1Program, pass2Program);
      onFilterReady?.();
      TetoricaRetroVideoPipeline.showDebug("filter: LOADED (2-pass)");
    });

    return pipeline;
  }

  constructor(
    gl: WebGL2RenderingContext,
    passthroughProgram: WebGLProgram,
    windowsLiteMode = false,
  ) {
    this.gl = gl;
    this.passthroughProgram = passthroughProgram;
    this.windowsLiteMode = windowsLiteMode;

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
    this.textureSamplingFilter = gl.NEAREST;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.textureSamplingFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.textureSamplingFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.useProgram(this.passthroughProgram);
    gl.uniform1i(gl.getUniformLocation(this.passthroughProgram, "uTexture"), 0);
  }

  private buildPass1UniformLocations(program: WebGLProgram): Pass1UniformLocations {
    const { gl } = this;
    return {
      uTargetSize: gl.getUniformLocation(program, "uTargetSize"),
      uColorLevels: gl.getUniformLocation(program, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(program, "uDitherStrength"),
      uPaletteMode: gl.getUniformLocation(program, "uPaletteMode"),
      uGlowStrength: gl.getUniformLocation(program, "uGlowStrength"),
      uSmoothStrength: gl.getUniformLocation(program, "uSmoothStrength"),
      uToonSteps: gl.getUniformLocation(program, "uToonSteps"),
      uEdgeBoost: gl.getUniformLocation(program, "uEdgeBoost"),
      uAnimeEdgeLow: gl.getUniformLocation(program, "uAnimeEdgeLow"),
      uAnimeEdgeHigh: gl.getUniformLocation(program, "uAnimeEdgeHigh"),
      uMonoTint: gl.getUniformLocation(program, "uMonoTint"),
      uNeonBoost: gl.getUniformLocation(program, "uNeonBoost"),
      uNeonSaturation: gl.getUniformLocation(program, "uNeonSaturation"),
      uNeonDetail: gl.getUniformLocation(program, "uNeonDetail"),
    };
  }

  private buildPass2UniformLocations(program: WebGLProgram): Pass2UniformLocations {
    const { gl } = this;
    return {
      uTargetSize: gl.getUniformLocation(program, "uTargetSize"),
      uCurvature: gl.getUniformLocation(program, "uCurvature"),
      uScanlineStrength: gl.getUniformLocation(program, "uScanlineStrength"),
      uScanline2Strength: gl.getUniformLocation(program, "uScanline2Strength"),
      uScanlineBrightnessFade: gl.getUniformLocation(program, "uScanlineBrightnessFade"),
      uVignetteStrength: gl.getUniformLocation(program, "uVignetteStrength"),
      uGlowStrength: gl.getUniformLocation(program, "uGlowStrength"),
      uPhosphorStrength: gl.getUniformLocation(program, "uPhosphorStrength"),
      uSpotMaskStrength: gl.getUniformLocation(program, "uSpotMaskStrength"),
      uBulbRadius: gl.getUniformLocation(program, "uBulbRadius"),
      uBlackFloor: gl.getUniformLocation(program, "uBlackFloor"),
      uOutputBrightness: gl.getUniformLocation(program, "uOutputBrightness"),
      uBasicContrast: gl.getUniformLocation(program, "uBasicContrast"),
      uBasicSaturation: gl.getUniformLocation(program, "uBasicSaturation"),
      uPhosphorDotLightBalance: gl.getUniformLocation(program, "uPhosphorDotLightBalance"),
      uPixelAspect: gl.getUniformLocation(program, "uPixelAspect"),
      uPhosphorDotMode: gl.getUniformLocation(program, "uPhosphorDotMode"),
      uPhosphorDotShape: gl.getUniformLocation(program, "uPhosphorDotShape"),
      uPhosphorDotInternalScale: gl.getUniformLocation(program, "uPhosphorDotInternalScale"),
      uPhosphorDotBrightCore: gl.getUniformLocation(program, "uPhosphorDotBrightCore"),
      uPhosphorDotCellFill: gl.getUniformLocation(program, "uPhosphorDotCellFill"),
      uPhosphorDotFlatDisc: gl.getUniformLocation(program, "uPhosphorDotFlatDisc"),
      uPhosphorDotNeighborBlend: gl.getUniformLocation(program, "uPhosphorDotNeighborBlend"),
      uPhosphorDotGrainStrength: gl.getUniformLocation(program, "uPhosphorDotGrainStrength"),
      uSignalInstabilityAmount: gl.getUniformLocation(program, "uSignalInstabilityAmount"),
      uSignalHorizontalSync: gl.getUniformLocation(program, "uSignalHorizontalSync"),
      uSignalVerticalSync: gl.getUniformLocation(program, "uSignalVerticalSync"),
      uSignalStaticNoise: gl.getUniformLocation(program, "uSignalStaticNoise"),
      uSignalChromaNoise: gl.getUniformLocation(program, "uSignalChromaNoise"),
      uSignalInstabilitySeed: gl.getUniformLocation(program, "uSignalInstabilitySeed"),
      uSignalInstabilityPhase: gl.getUniformLocation(program, "uSignalInstabilityPhase"),
      uFocusStrength: gl.getUniformLocation(program, "uFocusStrength"),
      uFocusSize: gl.getUniformLocation(program, "uFocusSize"),
      uFocusCenter: gl.getUniformLocation(program, "uFocusCenter"),
      uTime: gl.getUniformLocation(program, "uTime"),
    };
  }

  setSource(source: RetroVideoSource | null) {
    if (source !== this.currentSource) {
      this.lastUploadedImageSource = null;
      this.lastUploadedVideoSource = null;
      this.lastUploadedVideoTime = Number.NaN;
    }
    this.currentSource = source;
  }

  setFilterState(filterState: RetroVideoFilterState) {
    this.currentFilterState = filterState;
    this.queueWindowsLiteVariant(filterState);
  }

  setOutputEnabled(enabled: boolean) {
    this.outputEnabled = enabled;
  }

  setPresentationSamplingMode(mode: RetroPresentationSamplingMode) {
    this.presentationSamplingMode = mode;
  }

  private syncTextureSamplingFilter(nextFilter: number) {
    if (this.textureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.textureSamplingFilter = nextFilter;
  }

  resetAnimationClock(startedAt = nowMs()) {
    this.startedAt = startedAt;
    this.signalInstabilityController.reset();
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

  private shouldSkipUpload(uploadSource: RetroVideoSource): boolean {
    if (isHtmlImageElement(uploadSource)) {
      return uploadSource === this.lastUploadedImageSource;
    }

    if (isHtmlVideoElement(uploadSource)) {
      const currentTime = uploadSource.currentTime;
      const sameFrame =
        uploadSource === this.lastUploadedVideoSource &&
        Number.isFinite(currentTime) &&
        currentTime === this.lastUploadedVideoTime;
      return sameFrame;
    }

    return false;
  }

  render() {
    const { gl } = this;
    if (gl.isContextLost()) {
      console.warn("[retro-player] render() skipped: WebGL context is lost");
      return;
    }

    gl.bindVertexArray(this.vao);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const source = this.currentSource;
    const filterState = this.currentFilterState;
    if (!this.outputEnabled || !source || !filterState) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0.01, 0.02, 0.01, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      TetoricaRetroVideoPipeline.showDebug(`EXIT out=${this.outputEnabled ? 1 : 0} src=${!!source ? 1 : 0} fs=${!!filterState ? 1 : 0}`);
      this.renderCount++;
      return;
    }

    if (isHtmlVideoElement(source) && !hasRenderableVideoFrame(source)) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0.01, 0.02, 0.01, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.renderCount++;
      return;
    }

    // Upload source texture (unit 0)
    const uploadSource = this.getUploadSource(source, filterState);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    const textureFilter =
      this.presentationSamplingMode === "smooth" ? gl.LINEAR : gl.NEAREST;
    this.syncTextureSamplingFilter(textureFilter);
    const isImageSource = isHtmlImageElement(uploadSource);
    const isVideoSource = isHtmlVideoElement(uploadSource);
    const skipUpload = this.shouldSkipUpload(uploadSource);
    if (!skipUpload) {
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
      this.lastUploadedImageSource = isImageSource ? (uploadSource as HTMLImageElement) : null;
      this.lastUploadedVideoSource = isVideoSource ? (uploadSource as HTMLVideoElement) : null;
      this.lastUploadedVideoTime = isVideoSource ? uploadSource.currentTime : Number.NaN;
    }

    const usingFilter = filterState.isFilterEnabled && this.filterPass1Program && this.filterPass2Program;

    if (usingFilter) {
      const w = gl.drawingBufferWidth;
      const h = gl.drawingBufferHeight;
      const sourceSize = getRetroVideoSourceSize(source);

      // Pass 1: source → FBO (palette quantization, dithering, glow, edge boost)
      this.ensureFbo(w, h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.filterPass1Program);
      this.applyPass1Uniforms(filterState, sourceSize.width, sourceSize.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Pass 2: FBO → screen (CRT effects: curvature, scanlines, phosphor dots, vignette)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.fboTexture);
      gl.useProgram(this.filterPass2Program);
      this.applyPass2Uniforms(filterState, sourceSize.width, sourceSize.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Restore source texture binding for next frame's upload
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0.01, 0.02, 0.01, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.passthroughProgram);
    }

    if (this.renderCount < 200) {
      const sourceSize = getRetroVideoSourceSize(source);
      const srcType = source instanceof HTMLVideoElement ? "vid" : source instanceof HTMLImageElement ? "img" : "cvs";
      const glErr = gl.getError();
      const info = `f=${!!usingFilter ? 1 : 0} fp1=${!!this.filterPass1Program ? 1 : 0} src=${srcType} ${sourceSize.width}x${sourceSize.height} up=${uploadSource === source ? "d" : "c"} err=${glErr} buf=${gl.drawingBufferWidth}x${gl.drawingBufferHeight}`;
      TetoricaRetroVideoPipeline.showDebug(info);
    }
    this.renderCount++;

    if (!usingFilter) {
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }

  dispose() {
    this.isDisposed = true;
    this.windowsLitePendingVariantKey = null;
    const { gl } = this;
    gl.deleteTexture(this.texture);
    gl.deleteVertexArray(this.vao);
    if (this.windowsLiteMode) {
      // filterPass1Program/filterPass2Program are just the currently-active
      // entry from this cache, not separately owned — free the cache instead
      // to also release the other pre-warmed variants.
      for (const { pass1, pass2 } of this.windowsLiteProgramCache.values()) {
        gl.deleteProgram(pass1);
        gl.deleteProgram(pass2);
      }
      this.windowsLiteProgramCache.clear();
    } else {
      if (this.filterPass1Program && this.filterPass1Program !== this.passthroughProgram) {
        gl.deleteProgram(this.filterPass1Program);
      }
      if (this.filterPass2Program) gl.deleteProgram(this.filterPass2Program);
    }
    gl.deleteProgram(this.passthroughProgram);
    if (this.fbo) gl.deleteFramebuffer(this.fbo);
    if (this.fboTexture) gl.deleteTexture(this.fboTexture);
    this.currentSource = null;
    this.currentFilterState = null;
    this.lastUploadedImageSource = null;
    this.lastUploadedVideoSource = null;
    this.lastUploadedVideoTime = Number.NaN;
    this.signalInstabilityController.reset();
  }

  private getUploadSource(
    source: RetroVideoSource,
    _filterState: RetroVideoFilterState,
  ): RetroVideoSource {
    // The WebGL shader quantizes pixels via uTargetSize uniforms, so direct
    // upload always works. Avoids drawImage() failures on older Android.
    return source;
  }

  private applyPass1Uniforms(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
  ) {
    if (!this.pass1Locs || !this.filterPass1Program) return;
    const { gl } = this;
    const canvasElement = isHtmlCanvasElement(gl.canvas) ? gl.canvas : null;
    const visibleWidth = Math.max(canvasElement?.clientWidth ?? gl.drawingBufferWidth, 1);
    const visibleHeight = Math.max(canvasElement?.clientHeight ?? gl.drawingBufferHeight, 1);
    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
    } = getEffectiveRetroTargetSize(
      filterState,
      sourceWidth,
      sourceHeight,
      visibleWidth,
      visibleHeight,
    );

    gl.useProgram(this.filterPass1Program);
    gl.uniform2f(this.pass1Locs.uTargetSize, effectiveTargetWidth, effectiveTargetHeight);
    gl.uniform1f(this.pass1Locs.uColorLevels, Math.max(filterState.colorLevels, 2));
    gl.uniform1f(this.pass1Locs.uDitherStrength, filterState.ditherStrength);
    gl.uniform1f(this.pass1Locs.uPaletteMode, paletteModeToUniform(filterState.paletteMode));
    gl.uniform1f(this.pass1Locs.uGlowStrength, filterState.glowStrength);
    gl.uniform1f(this.pass1Locs.uSmoothStrength, filterState.smoothStrength);
    gl.uniform1f(this.pass1Locs.uToonSteps, filterState.toonSteps);
    gl.uniform1f(this.pass1Locs.uEdgeBoost, filterState.edgeBoost);
    gl.uniform1f(this.pass1Locs.uAnimeEdgeLow, filterState.animeEdgeLow);
    gl.uniform1f(this.pass1Locs.uAnimeEdgeHigh, filterState.animeEdgeHigh);
    gl.uniform3f(this.pass1Locs.uMonoTint, ...MONO_TINTS[filterState.monoTint].rgb);
    gl.uniform1f(this.pass1Locs.uNeonBoost, filterState.neonBoost);
    gl.uniform1f(this.pass1Locs.uNeonSaturation, filterState.neonSaturation);
    gl.uniform1f(this.pass1Locs.uNeonDetail, filterState.neonDetail);
  }

  private applyPass2Uniforms(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
  ) {
    if (!this.pass2Locs || !this.filterPass2Program) return;
    const { gl } = this;
    const canvasElement = isHtmlCanvasElement(gl.canvas) ? gl.canvas : null;
    const visibleWidth = Math.max(canvasElement?.clientWidth ?? gl.drawingBufferWidth, 1);
    const visibleHeight = Math.max(canvasElement?.clientHeight ?? gl.drawingBufferHeight, 1);
    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
      isPhosphorDotMode,
    } = getEffectiveRetroTargetSize(
      filterState,
      sourceWidth,
      sourceHeight,
      visibleWidth,
      visibleHeight,
    );

    gl.useProgram(this.filterPass2Program);
    gl.uniform2f(this.pass2Locs.uTargetSize, effectiveTargetWidth, effectiveTargetHeight);
    gl.uniform1f(this.pass2Locs.uCurvature, filterState.curvature);
    gl.uniform1f(this.pass2Locs.uScanlineStrength, filterState.scanlineStrength);
    gl.uniform1f(this.pass2Locs.uScanline2Strength, filterState.scanline2Strength);
    gl.uniform1f(this.pass2Locs.uScanlineBrightnessFade, filterState.scanlineBrightnessFade);
    gl.uniform1f(this.pass2Locs.uVignetteStrength, filterState.vignetteStrength);
    gl.uniform1f(this.pass2Locs.uGlowStrength, filterState.glowStrength);
    gl.uniform1f(this.pass2Locs.uPhosphorStrength, filterState.phosphorStrength);
    gl.uniform1f(this.pass2Locs.uSpotMaskStrength, filterState.spotMaskStrength);
    gl.uniform1f(this.pass2Locs.uBulbRadius, filterState.bulbRadius);
    gl.uniform1f(this.pass2Locs.uBlackFloor, filterState.blackFloor);
    gl.uniform1f(this.pass2Locs.uOutputBrightness, filterState.outputBrightness);
    gl.uniform1f(this.pass2Locs.uBasicContrast, filterState.basicContrast);
    gl.uniform1f(this.pass2Locs.uBasicSaturation, filterState.basicSaturation);
    gl.uniform1f(this.pass2Locs.uPhosphorDotLightBalance, filterState.phosphorDotLightBalance);
    gl.uniform1f(
      this.pass2Locs.uPixelAspect,
      (Math.max(gl.drawingBufferWidth, 1) * effectiveTargetHeight) /
        (Math.max(gl.drawingBufferHeight, 1) * effectiveTargetWidth),
    );
    gl.uniform1f(this.pass2Locs.uPhosphorDotMode, isPhosphorDotMode ? 1 : 0);
    gl.uniform1f(
      this.pass2Locs.uPhosphorDotShape,
      getPhosphorDotShapeValue(filterState.phosphorDotShape),
    );
    gl.uniform1f(this.pass2Locs.uPhosphorDotInternalScale, filterState.phosphorDotInternalScale > 1 ? 1 : 0);
    gl.uniform1f(this.pass2Locs.uPhosphorDotBrightCore, filterState.phosphorDotBrightCore ? 1 : 0);
    gl.uniform1f(this.pass2Locs.uPhosphorDotCellFill, filterState.phosphorDotCellFill);
    gl.uniform1f(this.pass2Locs.uPhosphorDotFlatDisc, filterState.phosphorDotFlatDisc ? 1 : 0);
    gl.uniform1f(this.pass2Locs.uPhosphorDotNeighborBlend, filterState.phosphorDotNeighborBlend ? 1 : 0);
    gl.uniform1f(this.pass2Locs.uPhosphorDotGrainStrength, filterState.phosphorDotGrainStrength);
    const signalTimeSec = (nowMs() - this.startedAt) / 1000;
    const signalState = this.signalInstabilityController.update(signalTimeSec, {
      enabled: filterState.signalInstabilityEnabled,
      strength: filterState.signalInstabilityStrength,
      frequency: filterState.signalInstabilityFrequency,
    });
    gl.uniform1f(this.pass2Locs.uSignalInstabilityAmount, signalState.intensity);
    gl.uniform1f(this.pass2Locs.uSignalHorizontalSync, signalState.horizontalSync);
    gl.uniform1f(this.pass2Locs.uSignalVerticalSync, signalState.verticalSync);
    gl.uniform1f(this.pass2Locs.uSignalStaticNoise, signalState.staticNoise);
    gl.uniform1f(this.pass2Locs.uSignalChromaNoise, signalState.chromaNoise);
    gl.uniform1f(this.pass2Locs.uSignalInstabilitySeed, signalState.seed);
    gl.uniform1f(this.pass2Locs.uSignalInstabilityPhase, signalState.phase);
    gl.uniform1f(this.pass2Locs.uFocusStrength, filterState.focusStrength);
    gl.uniform2f(this.pass2Locs.uFocusSize, filterState.focusWidth, filterState.focusHeight);
    gl.uniform2f(this.pass2Locs.uFocusCenter, filterState.focusCenterX, filterState.focusCenterY);
    gl.uniform1f(this.pass2Locs.uTime, signalTimeSec);
  }
}
