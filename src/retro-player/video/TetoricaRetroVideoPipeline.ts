import {
  MONO_TINTS,
  paletteModeToUniform,
  type GrainVisibilityMode,
  type MonoTintMode,
  type PaletteMode,
  type PhosphorDotShape,
  type RetroPresetKey,
  type TargetSamplingMode,
  type VBlankSimulationMode,
} from "../retro/config.ts";
import { FILTER_FRAGMENT_PASS1_LITE_BASE } from "../retro/filterPass1LiteBaseShader.ts";
import { FILTER_FRAGMENT_PASS1_LITE_SIMPLE } from "../retro/filterPass1LiteSimpleShader.ts";
import { FILTER_FRAGMENT_PASS1_LITE_NEAREST } from "../retro/filterPass1LiteNearestShader.ts";
import { FILTER_FRAGMENT_PASS_COMPOSITE_MID } from "../retro/filterPassCompositeMidShader.ts";
import { FILTER_FRAGMENT_PASS2_LITE } from "../retro/filterPass2LiteShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE_COMPOSE } from "../retro/filterPass2BeamLiteCompositeComposeShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_COMPOSE } from "../retro/filterPass2BeamLiteCrtComposeShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_KERNEL } from "../retro/filterPass2BeamLiteCrtKernelShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_POST } from "../retro/filterPass2BeamLiteCrtPostShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL } from "../retro/filterPass2BeamLiteKernelShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_POST } from "../retro/filterPass2BeamLitePostShader.ts";
import { FILTER_FRAGMENT_PASS2_BEAM_LITE_SIMPLE_COMPOSE } from "../retro/filterPass2BeamLiteSimpleComposeShader.ts";
import { FILTER_FRAGMENT_PASS1_PC98_LITE } from "../retro/filterPass1Pc98LiteShader.ts";
import { FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE_CORE } from "../retro/filterPass2PhosphorLiteCoreShader.ts";
import { FILTER_FRAGMENT_PASS1_PC98_LITE_NEAREST } from "../retro/filterPass1Pc98LiteNearestShader.ts";
import { isWindowsRuntime } from "../platform/runtime.ts";

export type RetroVideoFilterState = {
  selectedPreset?: RetroPresetKey | null;
  autoTargetSize: boolean;
  targetWidth: number;
  targetHeight: number;
  samplingMode: TargetSamplingMode;
  vblankSimulationMode?: VBlankSimulationMode;
  matchTargetAspect: boolean;
  colorLevels: number;
  ditherStrength: number;
  paletteMode: PaletteMode;
  curvature: number;
  postCurvatureEnabled: boolean;
  scanlineStrength: number;
  scanline2Strength: number;
  scanlineBrightnessFade: number;
  vignetteStrength: number;
  glowStrength: number;
  lcdCrosstalkStrength: number;
  horizontalSharpness: number;
  rgbConvergenceOffset: number;
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
  shadowCrush: number;
  basicSaturation: number;
  reflectiveLcdBase: number;
  lightDependentTint: number;
  grainVisibilityMode: GrainVisibilityMode;
  phosphorDotLightBalance: number;
  phosphorDotShape: PhosphorDotShape;
  phosphorDotInternalScale: number;
  phosphorDotSizeResponse: number;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  phosphorDotGrainStrength: number;
  preFilterDownscaleEnabled: boolean;
  coloredGlowEnabled: boolean;
  compositeEnabled: boolean;
  compositeAmount: number;
  compositeChromaBlur: number;
  compositeChromaDelay: number;
  compositeNoise: number;
  beamDarkCutoff: number;
  beamHorizontalSpread: number;
  beamStripeStrength: number;
  beamWhiteBloom: number;
  beamWarmBloom: number;
  screenFaceGlow: number;
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
  if (shape === "beam") {
    return 2;
  }
  if (shape === "square") {
    return 3;
  }
  return 0;
}

function getSamplingModeValue(mode: TargetSamplingMode): number {
  if (mode === "average_fast_4") {
    return 1;
  }
  if (mode === "average_fast_8") {
    return 2;
  }
  if (mode === "average") {
    return 2;
  }
  return 0;
}

function getGrainVisibilityModeValue(mode: GrainVisibilityMode): number {
  return mode === "bright_only" ? 1 : 0;
}

type Pass1UniformLocations = {
  uTargetSize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uSamplingMode: WebGLUniformLocation | null;
  uPaletteMode: WebGLUniformLocation | null;
  uGlowStrength: WebGLUniformLocation | null;
  uHorizontalSharpness: WebGLUniformLocation | null;
  uRgbConvergenceOffset: WebGLUniformLocation | null;
  uSmoothStrength: WebGLUniformLocation | null;
  uToonSteps: WebGLUniformLocation | null;
  uEdgeBoost: WebGLUniformLocation | null;
  uAnimeEdgeLow: WebGLUniformLocation | null;
  uAnimeEdgeHigh: WebGLUniformLocation | null;
  uMonoTint: WebGLUniformLocation | null;
  uNeonBoost: WebGLUniformLocation | null;
  uNeonSaturation: WebGLUniformLocation | null;
  uNeonDetail: WebGLUniformLocation | null;
  uColoredGlowEnabled: WebGLUniformLocation | null;
  uCompositeEnabled: WebGLUniformLocation | null;
  uCompositeAmount: WebGLUniformLocation | null;
  uCompositeChromaBlur: WebGLUniformLocation | null;
  uCompositeChromaDelay: WebGLUniformLocation | null;
  uCompositeNoise: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
};

type Pass2UniformLocations = {
  uTargetSize: WebGLUniformLocation | null;
  uOutputSize: WebGLUniformLocation | null;
  uDisplaySize: WebGLUniformLocation | null;
  uBeamKernelTexture: WebGLUniformLocation | null;
  uBeamSourceSize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uSamplingMode: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
  uScanlineStrength: WebGLUniformLocation | null;
  uScanline2Strength: WebGLUniformLocation | null;
  uScanlineBrightnessFade: WebGLUniformLocation | null;
  uVignetteStrength: WebGLUniformLocation | null;
  uLcdCrosstalkStrength: WebGLUniformLocation | null;
  uGlowStrength: WebGLUniformLocation | null;
  uHorizontalSharpness: WebGLUniformLocation | null;
  uRgbConvergenceOffset: WebGLUniformLocation | null;
  uSmoothStrength: WebGLUniformLocation | null;
  uPhosphorStrength: WebGLUniformLocation | null;
  uSpotMaskStrength: WebGLUniformLocation | null;
  uBulbRadius: WebGLUniformLocation | null;
  uBlackFloor: WebGLUniformLocation | null;
  uOutputBrightness: WebGLUniformLocation | null;
  uBasicContrast: WebGLUniformLocation | null;
  uShadowCrush: WebGLUniformLocation | null;
  uBasicSaturation: WebGLUniformLocation | null;
  uReflectiveLcdBase: WebGLUniformLocation | null;
  uLightDependentTint: WebGLUniformLocation | null;
  uGrainVisibilityMode: WebGLUniformLocation | null;
  uPhosphorDotLightBalance: WebGLUniformLocation | null;
  uPixelAspect: WebGLUniformLocation | null;
  uPhosphorDotMode: WebGLUniformLocation | null;
  uPhosphorDotShape: WebGLUniformLocation | null;
  uPhosphorDotInternalScale: WebGLUniformLocation | null;
  uPhosphorDotSizeResponse: WebGLUniformLocation | null;
  uPhosphorDotBrightCore: WebGLUniformLocation | null;
  uPhosphorDotCellFill: WebGLUniformLocation | null;
  uPhosphorDotFlatDisc: WebGLUniformLocation | null;
  uPhosphorDotNeighborBlend: WebGLUniformLocation | null;
  uPhosphorDotGrainStrength: WebGLUniformLocation | null;
  uBeamDarkCutoff: WebGLUniformLocation | null;
  uBeamHorizontalSpread: WebGLUniformLocation | null;
  uBeamStripeStrength: WebGLUniformLocation | null;
  uBeamWhiteBloom: WebGLUniformLocation | null;
  uBeamWarmBloom: WebGLUniformLocation | null;
  uScreenFaceGlow: WebGLUniformLocation | null;
  uFocusStrength: WebGLUniformLocation | null;
  uFocusSize: WebGLUniformLocation | null;
  uFocusCenter: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
};

type Pass2Sizing = {
  pass2TargetWidth: number;
  pass2TargetHeight: number;
  beamSourceWidth: number;
  beamSourceHeight: number;
  isBeamMode: boolean;
  isPhosphorDotMode: boolean;
};

type BeamDownscaleUniformLocations = {
  uTexture: WebGLUniformLocation | null;
  uSourceSize: WebGLUniformLocation | null;
  uTargetSize: WebGLUniformLocation | null;
};

type CompositeMidUniformLocations = {
  uTexture: WebGLUniformLocation | null;
  uTargetSize: WebGLUniformLocation | null;
  uSamplingMode: WebGLUniformLocation | null;
  uCompositeAmount: WebGLUniformLocation | null;
  uCompositeChromaBlur: WebGLUniformLocation | null;
  uCompositeChromaDelay: WebGLUniformLocation | null;
  uCompositeNoise: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
};

type PostCurvatureUniformLocations = {
  uTexture: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
};

type FilterBufferCap = {
  width: number;
  height: number;
  maxPixelCount?: number;
};

type BeamKernelUniformLocations = {
  uSourceTexture: WebGLUniformLocation | null;
  uBeamSourceSize: WebGLUniformLocation | null;
  uDisplaySize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uSamplingMode: WebGLUniformLocation | null;
  uHorizontalSharpness: WebGLUniformLocation | null;
  uRgbConvergenceOffset: WebGLUniformLocation | null;
  uSmoothStrength: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
  uBeamDarkCutoff: WebGLUniformLocation | null;
  uBeamHorizontalSpread: WebGLUniformLocation | null;
  uBeamWhiteBloom: WebGLUniformLocation | null;
};

type BeamComposeUniformLocations = {
  uSourceTexture: WebGLUniformLocation | null;
  uBeamKernelTexture: WebGLUniformLocation | null;
  uTargetSize: WebGLUniformLocation | null;
  uOutputSize: WebGLUniformLocation | null;
  uDisplaySize: WebGLUniformLocation | null;
  uBeamSourceSize: WebGLUniformLocation | null;
  uColorLevels: WebGLUniformLocation | null;
  uDitherStrength: WebGLUniformLocation | null;
  uSamplingMode: WebGLUniformLocation | null;
  uHorizontalSharpness: WebGLUniformLocation | null;
  uRgbConvergenceOffset: WebGLUniformLocation | null;
  uCurvature: WebGLUniformLocation | null;
  uBeamDarkCutoff: WebGLUniformLocation | null;
  uBeamHorizontalSpread: WebGLUniformLocation | null;
  uBeamStripeStrength: WebGLUniformLocation | null;
  uBeamWhiteBloom: WebGLUniformLocation | null;
  uBeamWarmBloom: WebGLUniformLocation | null;
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

const POST_CURVATURE_FRAGMENT = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uCurvature;

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

void main(void)
{
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  finalColor = texture(uTexture, curvedUv);
}
`;

const BEAM_SOURCE_DOWNSCALE_FRAGMENT = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uSourceSize;
uniform vec2 uTargetSize;

void main(void)
{
  vec2 sourceSize = max(uSourceSize, vec2(1.0));
  vec2 targetSize = max(uTargetSize, vec2(1.0));
  vec2 footprint = max(sourceSize / targetSize, vec2(1.0));
  vec2 texel = 1.0 / sourceSize;
  vec2 radius = 0.5 * max(footprint - 1.0, vec2(0.0)) * texel;

  vec4 accum = vec4(0.0);
  accum += texture(uTexture, vTextureCoord + radius * vec2(-1.0, -1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 0.0, -1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 1.0, -1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2(-1.0,  0.0));
  accum += texture(uTexture, vTextureCoord);
  accum += texture(uTexture, vTextureCoord + radius * vec2( 1.0,  0.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2(-1.0,  1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 0.0,  1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 1.0,  1.0));

  finalColor = accum / 9.0;
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

const waitForCompileStatusPaint = async () => {
  if (typeof window === "undefined") {
    return;
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), 16);
  });
};

type WindowsLitePass1Variant =
  | "basic_nearest"
  | "basic"
  | "basic_composite"
  | "pc98_nearest"
  | "pc98"
  | "pc98_composite";
type WindowsLitePass2Variant = "basic" | "phosphor" | "beam_simple" | "beam_full" | "beam_crt";
type WindowsLiteVariantKey = `${WindowsLitePass1Variant}:${WindowsLitePass2Variant}`;

const isPc98PaletteMode = (mode: PaletteMode) =>
  mode === "pc98" ||
  mode === "pc98_tile" ||
  mode === "pc98_512" ||
  mode === "pc98_512_sat" ||
  mode === "pc98_4096";

const isHeavyPc98PaletteMode = (mode: PaletteMode) =>
  mode === "pc98_tile" || mode === "pc98_512_sat";

const isNearestSamplingMode = (filterState: RetroVideoFilterState) =>
  getSamplingModeValue(filterState.samplingMode) < 0.5;

const isSimpleBeamCrossMode = (filterState: RetroVideoFilterState) =>
  isBeamCrossModeEnabled(filterState) &&
  filterState.smoothStrength <= 0.001 &&
  filterState.rgbConvergenceOffset <= 0.0001 &&
  isNearestSamplingMode(filterState);

const isCompositeNtscEnabled = (filterState: RetroVideoFilterState) =>
  filterState.compositeEnabled &&
  filterState.compositeAmount > 0.001;

const getVBlankFrameInterval = (mode: VBlankSimulationMode | undefined): number => {
  if (mode === "mild") return 2;
  if (mode === "strong") return 3;
  return 1;
};

const isExactSelectedPreset = (
  filterState: RetroVideoFilterState,
  presetKey: RetroPresetKey,
) => filterState.selectedPreset === presetKey;

const getWindowsLiteVariantKey = (
  filterState: RetroVideoFilterState | null,
): WindowsLiteVariantKey => {
  const pass1: WindowsLitePass1Variant =
    filterState
      ? isPc98PaletteMode(filterState.paletteMode)
        ? isCompositeNtscEnabled(filterState)
          ? "pc98_composite"
          : isNearestSamplingMode(filterState) &&
              !isHeavyPc98PaletteMode(filterState.paletteMode)
            ? "pc98_nearest"
          : "pc98"
        : isCompositeNtscEnabled(filterState)
          ? "basic_composite"
          : isNearestSamplingMode(filterState)
            ? "basic_nearest"
          : "basic"
      : "basic";
  if (filterState && isBeamCrossModeEnabled(filterState)) {
    if (isExactSelectedPreset(filterState, "crtBeam")) {
      return "basic_nearest:beam_crt";
    }
    return `${pass1}:${isSimpleBeamCrossMode(filterState) ? "beam_simple" : "beam_full"}`;
  }
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

const getInitialWindowsLiteCompileFilterState = (
  filterState: RetroVideoFilterState | null,
): RetroVideoFilterState | null => filterState;

const shouldQueueWindowsLiteVariant = (
  filterState: RetroVideoFilterState | null,
) => filterState?.isFilterEnabled === true;

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
  filterState.phosphorDotShape !== "beam" &&
  filterState.spotMaskStrength > 0.001 &&
  (
    filterState.phosphorDotInternalScale > 1 ||
    filterState.phosphorDotBrightCore ||
    filterState.phosphorDotCellFill > 0.001 ||
    filterState.phosphorDotFlatDisc ||
    filterState.phosphorDotNeighborBlend
  );

export const isBeamCrossModeEnabled = (filterState: RetroVideoFilterState) =>
  filterState.phosphorDotShape === "beam";

const shouldUsePreFilterDownscale = (filterState: RetroVideoFilterState) =>
  filterState.preFilterDownscaleEnabled || isBeamCrossModeEnabled(filterState);

const shouldUsePostCurvaturePass = (
  filterState: RetroVideoFilterState,
) =>
  filterState.postCurvatureEnabled &&
  filterState.curvature > 0.0001;

const getEffectivePreCurvature = (filterState: RetroVideoFilterState) =>
  filterState.postCurvatureEnabled ? 0 : filterState.curvature;

const getPhosphorDotInternalScale = (filterState: RetroVideoFilterState) =>
  isPhosphorDotModeEnabled(filterState) || isBeamCrossModeEnabled(filterState)
    ? Math.min(4, Math.max(1, filterState.phosphorDotInternalScale))
    : 1;

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

const getViewportFloorSize = (
  canvas: HTMLCanvasElement | null,
  drawingBufferWidth: number,
  drawingBufferHeight: number,
) => {
  const clientWidth = canvas?.clientWidth;
  const clientHeight = canvas?.clientHeight;

  return {
    width: Math.max(
      1,
      clientWidth !== undefined
        ? Math.min(clientWidth, drawingBufferWidth)
        : drawingBufferWidth,
    ),
    height: Math.max(
      1,
      clientHeight !== undefined
        ? Math.min(clientHeight, drawingBufferHeight)
        : drawingBufferHeight,
    ),
  };
};

const getPhosphorDotViewportLimitedSize = (
  width: number,
  height: number,
  filterState: RetroVideoFilterState,
  internalScale: number,
  visibleWidth?: number,
  visibleHeight?: number,
  isCapActive = false,
) => {
  if (
    (!isPhosphorDotModeEnabled(filterState) && !isBeamCrossModeEnabled(filterState)) ||
    visibleWidth === undefined ||
    visibleHeight === undefined ||
    visibleWidth <= 0 ||
    visibleHeight <= 0
  ) {
    return { width, height };
  }

  const isBeamMode = isBeamCrossModeEnabled(filterState);
  const beamCapFloor = isCapActive ? 1.6 : 1.2;
  const beamBloomFloor = filterState.beamWhiteBloom * 0.6;
  const baseMinCellPixels = isBeamMode
    ? Math.max(beamCapFloor, beamBloomFloor)
    : Math.max(1.1, 2.15 + filterState.bulbRadius * 1.15);
  const effectiveInternalScale = isBeamMode ? 1 : Math.max(internalScale, 1);
  const minCellPixels = Math.max(1.0, baseMinCellPixels / effectiveInternalScale);
  const maxWidth = Math.max(1, Math.floor(visibleWidth / minCellPixels));
  const maxHeight = Math.max(1, Math.floor(visibleHeight / minCellPixels));
  const scale = Math.min(
    1,
    maxWidth / Math.max(width, 1),
    maxHeight / Math.max(height, 1),
  );

  if (isBeamMode && isRetroVideoDebugEnabled()) {
    const debugKey = [
      isCapActive ? 1 : 0,
      filterState.beamWhiteBloom.toFixed(4),
      beamBloomFloor.toFixed(4),
      beamCapFloor.toFixed(4),
      baseMinCellPixels.toFixed(4),
      minCellPixels.toFixed(4),
      visibleWidth,
      visibleHeight,
      width,
      height,
      maxWidth,
      maxHeight,
      scale.toFixed(4),
    ].join(":");
    if (debugKey !== lastBeamViewportLimitDebugKey) {
      lastBeamViewportLimitDebugKey = debugKey;
      console.info("[retro-player beam viewport limit]", {
        isCapActive,
        beamWhiteBloom: filterState.beamWhiteBloom,
        beamBloomFloor,
        beamCapFloor,
        baseMinCellPixels,
        minCellPixels,
        visibleWidth,
        visibleHeight,
        requestedWidth: width,
        requestedHeight: height,
        maxWidth,
        maxHeight,
        scale,
      });
    }
  }

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
  isCapActive = false,
) => {
  const internalScale = getPhosphorDotInternalScale(filterState);
  const isBeamMode = isBeamCrossModeEnabled(filterState);
  const effectiveResolutionScale = isBeamMode ? 1 : internalScale;
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
  const scaledWidth = aspectCorrected.width * effectiveResolutionScale;
  const scaledHeight = aspectCorrected.height * effectiveResolutionScale;
  const viewportLimited = getPhosphorDotViewportLimitedSize(
    scaledWidth,
    scaledHeight,
    filterState,
    effectiveResolutionScale,
    visibleWidth,
    visibleHeight,
    isCapActive,
  );

  return {
    width: viewportLimited.width,
    height: viewportLimited.height,
    sampleWidth: Math.max(1, Math.round(scaledWidth)),
    sampleHeight: Math.max(1, Math.round(scaledHeight)),
    internalScale,
    isPhosphorDotMode:
      isPhosphorDotModeEnabled(filterState) || isBeamCrossModeEnabled(filterState),
  };
};

type KHRParallelShaderCompile = {
  COMPLETION_STATUS_KHR: number;
};

const getParallelShaderCompileExtension = (gl: WebGL2RenderingContext) =>
  (
    isWindowsRuntime()
      ? null
      : (
        gl.getExtension("WEBGL_parallel_shader_compile") ??
        gl.getExtension("KHR_parallel_shader_compile")
      )
  ) as KHRParallelShaderCompile | null;

const isRetroVideoDebugEnabled = () =>
  typeof window !== "undefined" &&
  (
    import.meta.env.DEV ||
    Boolean((window as typeof window & { __RETRO_PLAYER_DEBUG__?: boolean }).__RETRO_PLAYER_DEBUG__)
  );

let lastBeamViewportLimitDebugKey = "";

type SubmittedProgram = {
  program: WebGLProgram;
  vertexShader: WebGLShader;
  fragmentShader: WebGLShader;
};

type WindowsLiteCompiledPrograms = {
  pass1: WebGLProgram;
  pass2: WebGLProgram;
  compositeMid?: WebGLProgram;
  phosphorCore?: WebGLProgram;
  beamKernel?: WebGLProgram;
  beamCompose?: WebGLProgram;
};

type SharedCompiledProgramStage =
  | "pass1"
  | "pass2"
  | "compositeMid"
  | "phosphorCore"
  | "beamKernel"
  | "beamCompose";

function beginProgramCompile(
  gl: WebGL2RenderingContext,
): SubmittedProgram {
  const vert = gl.createShader(gl.VERTEX_SHADER);
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  if (!vert || !frag) throw new Error("Failed to create shader.");

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vert);
    gl.deleteShader(frag);
    throw new Error("Failed to create WebGL program.");
  }

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.bindAttribLocation(program, 0, "aPosition");

  return {
    program,
    vertexShader: vert,
    fragmentShader: frag,
  };
}

function submitProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram {
  const submitted = beginProgramCompile(gl);

  try {
    gl.shaderSource(submitted.vertexShader, vertexSource);
    gl.shaderSource(submitted.fragmentShader, fragmentSource);
    gl.compileShader(submitted.vertexShader);
    gl.compileShader(submitted.fragmentShader);
    return finishProgramLink(gl, submitted);
  } catch (error) {
    gl.deleteProgram(submitted.program);
    gl.deleteShader(submitted.vertexShader);
    gl.deleteShader(submitted.fragmentShader);
    throw error;
  }
}

function finishProgramLink(
  gl: WebGL2RenderingContext,
  submitted: SubmittedProgram,
): WebGLProgram {
  gl.linkProgram(submitted.program);
  gl.deleteShader(submitted.vertexShader);
  gl.deleteShader(submitted.fragmentShader);
  return submitted.program;
}

function logShaderCompileInfo(message: string) {
  if (!isRetroVideoDebugEnabled()) {
    return;
  }
  console.info(`INF : COMPILE SHADER : ${message}`);
}

function logShaderCompileWarn(message: string) {
  if (!isRetroVideoDebugEnabled()) {
    return;
  }
  console.warn(`WARN : DUPLICATE COMPILE SHADER : ${message}`);
}

// Verify link status after submitProgram() has already compiled and linked.
// The LINK_STATUS readback itself can still block, but we no longer insert an
// extra RAF here because the shader-busy overlay is now shown via direct DOM
// writes before compilation starts.
async function waitAndVerifyPrograms(
  gl: WebGL2RenderingContext,
  programs: WebGLProgram[],
): Promise<void> {
  void getParallelShaderCompileExtension;

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
  private beamDownscaleProgram: WebGLProgram | null = null;
  private compositeMidProgram: WebGLProgram | null = null;
  private postCurvatureProgram: WebGLProgram | null = null;
  private beamDownscaleLocs: BeamDownscaleUniformLocations | null = null;
  private compositeMidLocs: CompositeMidUniformLocations | null = null;
  private postCurvatureLocs: PostCurvatureUniformLocations | null = null;
  private phosphorCoreProgram: WebGLProgram | null = null;
  private phosphorCoreLocs: Pass2UniformLocations | null = null;
  private beamKernelProgram: WebGLProgram | null = null;
  private beamKernelLocs: BeamKernelUniformLocations | null = null;
  private beamComposeProgram: WebGLProgram | null = null;
  private beamComposeLocs: BeamComposeUniformLocations | null = null;

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
  private fboTextureSamplingFilter: number | null = null;
  private beamSourceFbo: WebGLFramebuffer | null = null;
  private beamSourceTexture: WebGLTexture | null = null;
  private beamSourceFboWidth = 0;
  private beamSourceFboHeight = 0;
  private beamSourceTextureSamplingFilter: number | null = null;
  private compositeMidFbo: WebGLFramebuffer | null = null;
  private compositeMidTexture: WebGLTexture | null = null;
  private compositeMidFboWidth = 0;
  private compositeMidFboHeight = 0;
  private compositeMidTextureSamplingFilter: number | null = null;
  private phosphorCoreFbo: WebGLFramebuffer | null = null;
  private phosphorCoreTexture: WebGLTexture | null = null;
  private phosphorCoreFboWidth = 0;
  private phosphorCoreFboHeight = 0;
  private phosphorCoreTextureSamplingFilter: number | null = null;
  private beamKernelFbo: WebGLFramebuffer | null = null;
  private beamKernelTexture: WebGLTexture | null = null;
  private beamKernelFboWidth = 0;
  private beamKernelFboHeight = 0;
  private beamKernelTextureSamplingFilter: number | null = null;
  private beamComposeFbo: WebGLFramebuffer | null = null;
  private beamComposeTexture: WebGLTexture | null = null;
  private beamComposeFboWidth = 0;
  private beamComposeFboHeight = 0;
  private beamComposeTextureSamplingFilter: number | null = null;
  private postCurvatureFbo: WebGLFramebuffer | null = null;
  private postCurvatureTexture: WebGLTexture | null = null;
  private postCurvatureFboWidth = 0;
  private postCurvatureFboHeight = 0;
  private postCurvatureTextureSamplingFilter: number | null = null;

  private currentSource: RetroVideoSource | null = null;

  private currentFilterState: RetroVideoFilterState | null = null;

  private outputEnabled = true;
  private presentationSamplingMode: RetroPresentationSamplingMode = "crisp";
  private filterViewportScale = 1;
  private isFilterBufferCapEnabled = false;
  private displaySizeOverride: { width: number; height: number } | null = null;

  private startedAt = nowMs();
  private animationTimeSec = 0;
  private lastAnimationTickAt = this.startedAt;
  private windowsLiteVariantKey: WindowsLiteVariantKey | null = null;
  private windowsLitePendingVariantKey: WindowsLiteVariantKey | null = null;
  private windowsLiteCompilePromise: Promise<void> | null = null;
  private windowsLiteCompileScheduled = false;
  private supportProgramCompilePromise: Promise<void> | null = null;
  private supportProgramCompileScheduled = false;
  private pendingSupportProgramFilterState: RetroVideoFilterState | null = null;
  private readonly windowsLiteProgramCache = new Map<
    WindowsLiteVariantKey,
    WindowsLiteCompiledPrograms
  >();
  private readonly sharedProgramCache = new Map<string, WebGLProgram>();
  private readonly sharedProgramCompileInflight = new Map<string, Promise<WebGLProgram>>();
  private windowsLitePrewarmStarted = false;
  private isDisposed = false;
  private compileSourceNonce = 0;
  private shaderCompileBusterTag: string | null = null;
  private readonly shaderCompileCacheBusterEnabled: boolean;
  private readonly onCompileStateChange?: (state: { active: boolean; label?: string }) => void;
  private readonly windowsLiteVariantCompileInflight = new Map<
    WindowsLiteVariantKey,
    Promise<WindowsLiteCompiledPrograms>
  >();
  private windowsLiteCompileSerialPromise: Promise<void> = Promise.resolve();
  private readonly programCompileHistory = new Set<string>();
  private lastRenderedFilterState: RetroVideoFilterState | null = null;
  private lastRenderedSource: RetroVideoSource | null = null;
  private lastRenderedBufferWidth = 0;
  private lastRenderedBufferHeight = 0;

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
    this.fboTextureSamplingFilter = gl.NEAREST;
  }

  private ensureBeamSourceFbo(width: number, height: number) {
    if (
      this.beamSourceFboWidth === width &&
      this.beamSourceFboHeight === height &&
      this.beamSourceFbo
    ) {
      return;
    }

    const { gl } = this;
    if (this.beamSourceFbo) gl.deleteFramebuffer(this.beamSourceFbo);
    if (this.beamSourceTexture) gl.deleteTexture(this.beamSourceTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create Beam source FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create Beam source FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    this.beamSourceFbo = fbo;
    this.beamSourceTexture = tex;
    this.beamSourceFboWidth = width;
    this.beamSourceFboHeight = height;
    this.beamSourceTextureSamplingFilter = gl.LINEAR;
  }

  private ensureCompositeMidFbo(width: number, height: number) {
    if (
      this.compositeMidFboWidth === width &&
      this.compositeMidFboHeight === height &&
      this.compositeMidFbo
    ) {
      return;
    }

    const { gl } = this;
    if (this.compositeMidFbo) gl.deleteFramebuffer(this.compositeMidFbo);
    if (this.compositeMidTexture) gl.deleteTexture(this.compositeMidTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create composite mid FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create composite mid FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    this.compositeMidFbo = fbo;
    this.compositeMidTexture = tex;
    this.compositeMidFboWidth = width;
    this.compositeMidFboHeight = height;
    this.compositeMidTextureSamplingFilter = gl.NEAREST;
  }

  private ensurePhosphorCoreFbo(width: number, height: number) {
    if (
      this.phosphorCoreFboWidth === width &&
      this.phosphorCoreFboHeight === height &&
      this.phosphorCoreFbo
    ) {
      return;
    }

    const { gl } = this;
    if (this.phosphorCoreFbo) gl.deleteFramebuffer(this.phosphorCoreFbo);
    if (this.phosphorCoreTexture) gl.deleteTexture(this.phosphorCoreTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create phosphor core FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create phosphor core FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    this.phosphorCoreFbo = fbo;
    this.phosphorCoreTexture = tex;
    this.phosphorCoreFboWidth = width;
    this.phosphorCoreFboHeight = height;
    this.phosphorCoreTextureSamplingFilter = gl.NEAREST;
  }

  private ensureBeamKernelFbo(width: number, height: number) {
    if (
      this.beamKernelFboWidth === width &&
      this.beamKernelFboHeight === height &&
      this.beamKernelFbo
    ) {
      return;
    }

    const { gl } = this;
    if (this.beamKernelFbo) gl.deleteFramebuffer(this.beamKernelFbo);
    if (this.beamKernelTexture) gl.deleteTexture(this.beamKernelTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create Beam kernel FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create Beam kernel FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.beamKernelFbo = fbo;
    this.beamKernelTexture = tex;
    this.beamKernelFboWidth = width;
    this.beamKernelFboHeight = height;
    this.beamKernelTextureSamplingFilter = gl.LINEAR;
  }

  private ensureBeamComposeFbo(width: number, height: number) {
    if (
      this.beamComposeFboWidth === width &&
      this.beamComposeFboHeight === height &&
      this.beamComposeFbo
    ) {
      return;
    }

    const { gl } = this;
    if (this.beamComposeFbo) gl.deleteFramebuffer(this.beamComposeFbo);
    if (this.beamComposeTexture) gl.deleteTexture(this.beamComposeTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create Beam compose FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create Beam compose FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.beamComposeFbo = fbo;
    this.beamComposeTexture = tex;
    this.beamComposeFboWidth = width;
    this.beamComposeFboHeight = height;
    this.beamComposeTextureSamplingFilter = gl.LINEAR;
  }

  private ensurePostCurvatureFbo(width: number, height: number) {
    if (
      this.postCurvatureFboWidth === width &&
      this.postCurvatureFboHeight === height &&
      this.postCurvatureFbo
    ) {
      return;
    }

    const { gl } = this;
    if (this.postCurvatureFbo) gl.deleteFramebuffer(this.postCurvatureFbo);
    if (this.postCurvatureTexture) gl.deleteTexture(this.postCurvatureTexture);

    const tex = gl.createTexture();
    if (!tex) throw new Error("Failed to create post-curvature FBO texture.");
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const fbo = gl.createFramebuffer();
    if (!fbo) throw new Error("Failed to create post-curvature FBO.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    this.postCurvatureFbo = fbo;
    this.postCurvatureTexture = tex;
    this.postCurvatureFboWidth = width;
    this.postCurvatureFboHeight = height;
    this.postCurvatureTextureSamplingFilter = gl.LINEAR;
  }

  private syncFboTextureSamplingFilter(nextFilter: number) {
    if (!this.fboTexture || this.fboTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.fboTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.fboTextureSamplingFilter = nextFilter;
  }

  private syncBeamSourceTextureSamplingFilter(nextFilter: number) {
    if (!this.beamSourceTexture || this.beamSourceTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.beamSourceTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.beamSourceTextureSamplingFilter = nextFilter;
  }

  private syncBeamKernelTextureSamplingFilter(nextFilter: number) {
    if (!this.beamKernelTexture || this.beamKernelTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.beamKernelTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.beamKernelTextureSamplingFilter = nextFilter;
  }

  private syncBeamComposeTextureSamplingFilter(nextFilter: number) {
    if (!this.beamComposeTexture || this.beamComposeTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.beamComposeTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.beamComposeTextureSamplingFilter = nextFilter;
  }

  private syncCompositeMidTextureSamplingFilter(nextFilter: number) {
    if (!this.compositeMidTexture || this.compositeMidTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.compositeMidTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.compositeMidTextureSamplingFilter = nextFilter;
  }

  private syncPhosphorCoreTextureSamplingFilter(nextFilter: number) {
    if (!this.phosphorCoreTexture || this.phosphorCoreTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.phosphorCoreTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.phosphorCoreTextureSamplingFilter = nextFilter;
  }

  private syncPostCurvatureTextureSamplingFilter(nextFilter: number) {
    if (!this.postCurvatureTexture || this.postCurvatureTextureSamplingFilter === nextFilter) {
      return;
    }

    const { gl } = this;
    gl.bindTexture(gl.TEXTURE_2D, this.postCurvatureTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, nextFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, nextFilter);
    this.postCurvatureTextureSamplingFilter = nextFilter;
  }

  // Called once the background filter compilation succeeds.
  setFilterPrograms(
    pass1: WebGLProgram,
    pass2: WebGLProgram,
    compositeMid?: WebGLProgram,
    phosphorCore?: WebGLProgram,
    beamKernel?: WebGLProgram,
    beamCompose?: WebGLProgram,
  ): void {
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

    this.setCompositeMidProgram(compositeMid ?? null);
    this.setPhosphorCoreProgram(phosphorCore ?? null);

    gl.useProgram(pass2);
    gl.uniform1i(gl.getUniformLocation(pass2, "uPass1Texture"), 0);
    gl.uniform1i(gl.getUniformLocation(pass2, "uSourceTexture"), 1);
    gl.uniform1i(gl.getUniformLocation(pass2, "uBeamKernelTexture"), 2);
    this.pass2Locs = this.buildPass2UniformLocations(pass2);
    this.setBeamKernelProgram(beamKernel ?? null);
    this.setBeamComposeProgram(beamCompose ?? null);

  }

  private setCompositeMidProgram(program: WebGLProgram | null) {
    this.compositeMidProgram = program;
    if (!program) {
      this.compositeMidLocs = null;
      return;
    }

    const { gl } = this;
    gl.useProgram(program);
    gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
    this.compositeMidLocs = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uTargetSize: gl.getUniformLocation(program, "uTargetSize"),
      uSamplingMode: gl.getUniformLocation(program, "uSamplingMode"),
      uCompositeAmount: gl.getUniformLocation(program, "uCompositeAmount"),
      uCompositeChromaBlur: gl.getUniformLocation(program, "uCompositeChromaBlur"),
      uCompositeChromaDelay: gl.getUniformLocation(program, "uCompositeChromaDelay"),
      uCompositeNoise: gl.getUniformLocation(program, "uCompositeNoise"),
      uTime: gl.getUniformLocation(program, "uTime"),
    };
  }

  private setBeamKernelProgram(program: WebGLProgram | null) {
    this.beamKernelProgram = program;
    if (!program) {
      this.beamKernelLocs = null;
      return;
    }

    const { gl } = this;
    gl.useProgram(program);
    gl.uniform1i(gl.getUniformLocation(program, "uSourceTexture"), 1);
    this.beamKernelLocs = {
      uSourceTexture: gl.getUniformLocation(program, "uSourceTexture"),
      uBeamSourceSize: gl.getUniformLocation(program, "uBeamSourceSize"),
      uDisplaySize: gl.getUniformLocation(program, "uDisplaySize"),
      uColorLevels: gl.getUniformLocation(program, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(program, "uDitherStrength"),
      uSamplingMode: gl.getUniformLocation(program, "uSamplingMode"),
      uHorizontalSharpness: gl.getUniformLocation(program, "uHorizontalSharpness"),
      uRgbConvergenceOffset: gl.getUniformLocation(program, "uRgbConvergenceOffset"),
      uSmoothStrength: gl.getUniformLocation(program, "uSmoothStrength"),
      uCurvature: gl.getUniformLocation(program, "uCurvature"),
      uBeamDarkCutoff: gl.getUniformLocation(program, "uBeamDarkCutoff"),
      uBeamHorizontalSpread: gl.getUniformLocation(program, "uBeamHorizontalSpread"),
      uBeamWhiteBloom: gl.getUniformLocation(program, "uBeamWhiteBloom"),
    };
  }

  private setPhosphorCoreProgram(program: WebGLProgram | null) {
    this.phosphorCoreProgram = program;
    if (!program) {
      this.phosphorCoreLocs = null;
      return;
    }

    const { gl } = this;
    gl.useProgram(program);
    gl.uniform1i(gl.getUniformLocation(program, "uPass1Texture"), 0);
    this.phosphorCoreLocs = this.buildPass2UniformLocations(program);
  }

  private setBeamComposeProgram(program: WebGLProgram | null) {
    this.beamComposeProgram = program;
    if (!program) {
      this.beamComposeLocs = null;
      return;
    }

    const { gl } = this;
    gl.useProgram(program);
    const uSourceTexture = gl.getUniformLocation(program, "uSourceTexture");
    const uBeamKernelTexture = gl.getUniformLocation(program, "uBeamKernelTexture");
    if (uSourceTexture) {
      gl.uniform1i(uSourceTexture, 1);
    }
    if (uBeamKernelTexture) {
      gl.uniform1i(uBeamKernelTexture, 2);
    }
    this.beamComposeLocs = {
      uSourceTexture,
      uBeamKernelTexture,
      uTargetSize: gl.getUniformLocation(program, "uTargetSize"),
      uOutputSize: gl.getUniformLocation(program, "uOutputSize"),
      uDisplaySize: gl.getUniformLocation(program, "uDisplaySize"),
      uBeamSourceSize: gl.getUniformLocation(program, "uBeamSourceSize"),
      uColorLevels: gl.getUniformLocation(program, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(program, "uDitherStrength"),
      uSamplingMode: gl.getUniformLocation(program, "uSamplingMode"),
      uHorizontalSharpness: gl.getUniformLocation(program, "uHorizontalSharpness"),
      uRgbConvergenceOffset: gl.getUniformLocation(program, "uRgbConvergenceOffset"),
      uCurvature: gl.getUniformLocation(program, "uCurvature"),
      uBeamDarkCutoff: gl.getUniformLocation(program, "uBeamDarkCutoff"),
      uBeamHorizontalSpread: gl.getUniformLocation(program, "uBeamHorizontalSpread"),
      uBeamStripeStrength: gl.getUniformLocation(program, "uBeamStripeStrength"),
      uBeamWhiteBloom: gl.getUniformLocation(program, "uBeamWhiteBloom"),
      uBeamWarmBloom: gl.getUniformLocation(program, "uBeamWarmBloom"),
    };
  }

  private applyCompositeMidUniforms(filterState: RetroVideoFilterState, timeSec: number) {
    if (!this.compositeMidLocs) {
      return;
    }

    const { gl } = this;
    gl.uniform2f(this.compositeMidLocs.uTargetSize, Math.max(filterState.targetWidth, 1), Math.max(filterState.targetHeight, 1));
    gl.uniform1f(this.compositeMidLocs.uSamplingMode, getSamplingModeValue(filterState.samplingMode));
    gl.uniform1f(this.compositeMidLocs.uCompositeAmount, filterState.compositeEnabled ? filterState.compositeAmount : 0);
    gl.uniform1f(this.compositeMidLocs.uCompositeChromaBlur, filterState.compositeChromaBlur);
    gl.uniform1f(this.compositeMidLocs.uCompositeChromaDelay, filterState.compositeChromaDelay);
    gl.uniform1f(this.compositeMidLocs.uCompositeNoise, filterState.compositeNoise);
    gl.uniform1f(this.compositeMidLocs.uTime, timeSec);
  }

  private applyBeamComposeUniforms(
    filterState: RetroVideoFilterState,
    pass2Sizing: Pass2Sizing,
    outputWidth: number,
    outputHeight: number,
  ) {
    if (!this.beamComposeLocs) {
      return;
    }

    const { gl } = this;
    const displaySize = this.getEffectiveDisplaySize();
    gl.uniform2f(this.beamComposeLocs.uTargetSize, Math.max(filterState.targetWidth, 1), Math.max(filterState.targetHeight, 1));
    gl.uniform2f(this.beamComposeLocs.uOutputSize, Math.max(outputWidth, 1), Math.max(outputHeight, 1));
    gl.uniform2f(this.beamComposeLocs.uDisplaySize, displaySize.width, displaySize.height);
    gl.uniform2f(this.beamComposeLocs.uBeamSourceSize, Math.max(pass2Sizing.beamSourceWidth, 1), Math.max(pass2Sizing.beamSourceHeight, 1));
    if (this.beamComposeLocs.uColorLevels) {
      gl.uniform1f(this.beamComposeLocs.uColorLevels, Math.max(filterState.colorLevels, 2));
    }
    if (this.beamComposeLocs.uDitherStrength) {
      gl.uniform1f(this.beamComposeLocs.uDitherStrength, filterState.ditherStrength);
    }
    gl.uniform1f(this.beamComposeLocs.uSamplingMode, getSamplingModeValue(filterState.samplingMode));
    if (this.beamComposeLocs.uHorizontalSharpness) {
      gl.uniform1f(this.beamComposeLocs.uHorizontalSharpness, filterState.horizontalSharpness);
    }
    gl.uniform1f(this.beamComposeLocs.uRgbConvergenceOffset, filterState.rgbConvergenceOffset);
    gl.uniform1f(this.beamComposeLocs.uCurvature, getEffectivePreCurvature(filterState));
    if (this.beamComposeLocs.uBeamDarkCutoff) {
      gl.uniform1f(this.beamComposeLocs.uBeamDarkCutoff, filterState.beamDarkCutoff);
    }
    if (this.beamComposeLocs.uBeamHorizontalSpread) {
      gl.uniform1f(this.beamComposeLocs.uBeamHorizontalSpread, filterState.beamHorizontalSpread);
    }
    gl.uniform1f(this.beamComposeLocs.uBeamStripeStrength, filterState.beamStripeStrength);
    gl.uniform1f(this.beamComposeLocs.uBeamWhiteBloom, filterState.beamWhiteBloom);
    gl.uniform1f(this.beamComposeLocs.uBeamWarmBloom, filterState.beamWarmBloom);
  }

  private getWindowsLiteShaderSources(variantKey: WindowsLiteVariantKey) {
    const [pass1Variant, pass2Variant] = variantKey.split(":") as [
      WindowsLitePass1Variant,
      WindowsLitePass2Variant,
    ];

    return {
      pass1:
        pass1Variant === "pc98_nearest"
          ? FILTER_FRAGMENT_PASS1_PC98_LITE_NEAREST
          : pass1Variant === "pc98"
          ? FILTER_FRAGMENT_PASS1_PC98_LITE
          : pass1Variant === "pc98_composite"
            ? FILTER_FRAGMENT_PASS1_PC98_LITE
            : pass1Variant === "basic_composite"
              ? FILTER_FRAGMENT_PASS1_LITE_BASE
              : pass1Variant === "basic_nearest"
                ? FILTER_FRAGMENT_PASS1_LITE_NEAREST
                : pass1Variant === "basic"
                  ? FILTER_FRAGMENT_PASS1_LITE_BASE
                  : FILTER_FRAGMENT_PASS1_LITE_SIMPLE,
      compositeMid:
        pass1Variant === "basic_composite" || pass1Variant === "pc98_composite"
          ? FILTER_FRAGMENT_PASS_COMPOSITE_MID
          : null,
      phosphorCore:
        pass2Variant === "phosphor"
          ? FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE_CORE
          : null,
      beamCompose:
        pass2Variant === "beam_simple"
          ? FILTER_FRAGMENT_PASS2_BEAM_LITE_SIMPLE_COMPOSE
          : pass2Variant === "beam_full"
            ? FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE_COMPOSE
            : pass2Variant === "beam_crt"
          ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_COMPOSE
          : null,
      pass2:
        pass2Variant === "beam_simple" || pass2Variant === "beam_full"
          ? FILTER_FRAGMENT_PASS2_BEAM_LITE_POST
          : pass2Variant === "beam_crt"
          ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_POST
          : pass2Variant === "phosphor"
            ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_POST
            : FILTER_FRAGMENT_PASS2_LITE,
    };
  }

  private appendShaderCompileBuster(source: string): string {
    const stableTag =
      this.shaderCompileBusterTag ??
      `${this.startedAt.toFixed(3)}:${this.compileSourceNonce}`;
    return `${source}\n// shader-compile-buster:${stableTag}`;
  }

  private refreshShaderCompileBusterTag() {
    this.compileSourceNonce += 1;
    this.shaderCompileBusterTag = `${nowMs().toFixed(3)}:${this.compileSourceNonce}`;
  }

  private logProgramCompile(key: string) {
    if (this.programCompileHistory.has(key)) {
      logShaderCompileWarn(key);
      return;
    }
    this.programCompileHistory.add(key);
    logShaderCompileInfo(key);
  }

  private getSharedProgramCacheKey(fragmentSource: string) {
    return fragmentSource;
  }

  private async getOrCompileSharedProgram(
    stage: SharedCompiledProgramStage,
    fragmentSource: string,
    variantKey: WindowsLiteVariantKey,
  ) {
    const cacheKey = this.getSharedProgramCacheKey(fragmentSource);
    const cached = this.sharedProgramCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const inflight = this.sharedProgramCompileInflight.get(cacheKey);
    if (inflight) {
      return inflight;
    }

    const compilePromise = (async () => {
      await this.updateCompileState(`Compiling shader (${variantKey} / ${stage})...`);
      this.logProgramCompile(`variant:${variantKey}:${stage}`);
      const program = submitProgram(this.gl, VERTEX_SHADER_SOURCE, fragmentSource);
      try {
        await this.updateCompileState(`Linking shader (${variantKey} / ${stage})...`);
        await waitAndVerifyPrograms(this.gl, [program]);
        this.sharedProgramCache.set(cacheKey, program);
        return program;
      } catch (error) {
        this.gl.deleteProgram(program);
        throw error;
      } finally {
        this.sharedProgramCompileInflight.delete(cacheKey);
      }
    })();

    this.sharedProgramCompileInflight.set(cacheKey, compilePromise);
    return compilePromise;
  }

  private reserveCompileTurn() {
    const waitForCompileTurn = this.windowsLiteCompileSerialPromise.catch(() => {});
    let releaseCompileTurn!: () => void;
    this.windowsLiteCompileSerialPromise = new Promise<void>((resolve) => {
      releaseCompileTurn = resolve;
    });
    return {
      waitForCompileTurn,
      releaseCompileTurn,
    };
  }

  private async updateCompileState(label: string) {
    this.onCompileStateChange?.({ active: true, label });
    await waitForCompileStatusPaint();
  }

  private queueWindowsLiteVariant(filterState: RetroVideoFilterState | null) {
    if (!this.windowsLiteMode || this.isDisposed) {
      return;
    }

    if (!shouldQueueWindowsLiteVariant(filterState)) {
      this.windowsLitePendingVariantKey = null;
      return;
    }

    const nextVariantKey = getWindowsLiteVariantKey(filterState);
    if (nextVariantKey === this.windowsLiteVariantKey) {
      if (this.windowsLitePendingVariantKey === nextVariantKey) {
        this.windowsLitePendingVariantKey = null;
      }
      return;
    }

    const cached = this.windowsLiteProgramCache.get(nextVariantKey);
    if (cached) {
      this.setFilterPrograms(
        cached.pass1,
        cached.pass2,
        cached.compositeMid,
        cached.phosphorCore,
        cached.beamKernel,
        cached.beamCompose,
      );
      this.windowsLiteVariantKey = nextVariantKey;
      if (this.windowsLitePendingVariantKey === nextVariantKey) {
        this.windowsLitePendingVariantKey = null;
      }
      return;
    }

    if (nextVariantKey === this.windowsLitePendingVariantKey) {
      return;
    }

    this.windowsLitePendingVariantKey = nextVariantKey;
    if (this.windowsLiteCompilePromise) {
      return;
    }

    this.scheduleWindowsLiteForegroundCompile();
  }

  private scheduleWindowsLiteForegroundCompile() {
    if (
      this.isDisposed ||
      this.windowsLiteCompilePromise ||
      this.windowsLiteCompileScheduled ||
      !this.windowsLitePendingVariantKey ||
      this.windowsLitePendingVariantKey === this.windowsLiteVariantKey
    ) {
      return;
    }

    this.windowsLiteCompileScheduled = true;
    window.setTimeout(() => {
      if (this.isDisposed) {
        this.windowsLiteCompileScheduled = false;
        return;
      }

      this.windowsLiteCompileScheduled = false;
      this.startWindowsLiteForegroundCompile();
    }, 0);
  }

  private async compileSupportProgramsForFilterState(filterState: RetroVideoFilterState | null) {
    if (!filterState || this.isDisposed || this.gl.isContextLost()) {
      return;
    }

    if (shouldUsePreFilterDownscale(filterState) && (!this.beamDownscaleProgram || !this.beamDownscaleLocs)) {
      await this.ensureBeamDownscaleProgram();
    }

    if (shouldUsePostCurvaturePass(filterState) && (!this.postCurvatureProgram || !this.postCurvatureLocs)) {
      await this.ensurePostCurvatureProgram();
    }
  }

  private async ensureSupportProgramsForFilterState(filterState: RetroVideoFilterState | null) {
    if (!filterState || this.isDisposed || this.gl.isContextLost()) {
      return;
    }

    if (this.hasPreparedSupportProgramsForFilterState(filterState)) {
      return;
    }

    if (this.supportProgramCompilePromise) {
      await this.supportProgramCompilePromise;
      return;
    }

    this.supportProgramCompilePromise = this.compileSupportProgramsForFilterState(filterState)
      .catch((error) => {
        console.warn("[retro-player] support shader compile failed", error);
        throw error;
      })
      .finally(() => {
        this.supportProgramCompilePromise = null;
        if (!this.windowsLiteCompilePromise) {
          this.onCompileStateChange?.({ active: false });
        }
      });

    await this.supportProgramCompilePromise;
  }

  private scheduleSupportProgramCompile() {
    if (
      this.isDisposed ||
      this.supportProgramCompilePromise ||
      this.supportProgramCompileScheduled
    ) {
      return;
    }

    this.supportProgramCompileScheduled = true;
    window.setTimeout(() => {
      if (this.isDisposed) {
        this.supportProgramCompileScheduled = false;
        return;
      }

      this.supportProgramCompileScheduled = false;
      const pendingFilterState = this.pendingSupportProgramFilterState;
      this.pendingSupportProgramFilterState = null;
      this.supportProgramCompilePromise = this.ensureSupportProgramsForFilterState(pendingFilterState)
        .catch(() => {
          // Logged in ensureSupportProgramsForFilterState.
        })
        .finally(() => {
          if (!this.windowsLiteCompilePromise) {
            this.onCompileStateChange?.({ active: false });
          }
          if (!this.isDisposed && this.currentFilterState) {
            this.queueSupportProgramsForFilterState(this.currentFilterState);
          }
        });
    }, 0);
  }

  private queueSupportProgramsForFilterState(filterState: RetroVideoFilterState | null) {
    if (!filterState || this.isDisposed) {
      return;
    }

    const needsBeamDownscale =
      shouldUsePreFilterDownscale(filterState) &&
      (!this.beamDownscaleProgram || !this.beamDownscaleLocs);
    const needsPostCurvature =
      shouldUsePostCurvaturePass(filterState) &&
      (!this.postCurvatureProgram || !this.postCurvatureLocs);

    if (!needsBeamDownscale && !needsPostCurvature) {
      return;
    }

    this.pendingSupportProgramFilterState = filterState;
    this.scheduleSupportProgramCompile();
  }

  // Compiles a variant at most once; subsequent requests for the same
  // variant key are served from cache (near-instant, no shader compile or
  // WEBGL_parallel_shader_compile poll wait). This is what turns a mid-
  // playback variant switch (e.g. enabling phosphor) from a multi-hundred-ms
  // main-thread stall into an instant program swap after the first use —
  // see docs/issues/windows-lite-shader-parity.md for the measured impact.
  private async compileWindowsLiteVariant(
    variantKey: WindowsLiteVariantKey,
  ): Promise<WindowsLiteCompiledPrograms> {
    const cached = this.windowsLiteProgramCache.get(variantKey);
    if (cached) return cached;
    const inflight = this.windowsLiteVariantCompileInflight.get(variantKey);
    if (inflight) {
      logShaderCompileWarn(`variant:${variantKey}`);
      return inflight;
    }
    if (this.isDisposed || this.gl.isContextLost()) {
      throw new Error("Pipeline was disposed before shader compile started.");
    }

    const { waitForCompileTurn, releaseCompileTurn } = this.reserveCompileTurn();

    const compilePromise = (async () => {
      await waitForCompileTurn;

      const cachedAfterWait = this.windowsLiteProgramCache.get(variantKey);
      if (cachedAfterWait) {
        return cachedAfterWait;
      }
      if (this.isDisposed || this.gl.isContextLost()) {
        throw new Error("Pipeline was disposed before shader compile started.");
      }

      const compileStartTime = nowMs();
      const { pass1, compositeMid, phosphorCore, beamCompose, pass2 } = this.getWindowsLiteShaderSources(variantKey);
      const pass1Source = this.shaderCompileCacheBusterEnabled
        ? this.appendShaderCompileBuster(pass1)
        : pass1;
      const pass2Source = this.shaderCompileCacheBusterEnabled
        ? this.appendShaderCompileBuster(pass2)
        : pass2;
      const compositeMidSource = compositeMid
        ? this.shaderCompileCacheBusterEnabled
          ? this.appendShaderCompileBuster(compositeMid)
          : compositeMid
        : null;
      const phosphorCoreSource = phosphorCore
        ? this.shaderCompileCacheBusterEnabled
          ? this.appendShaderCompileBuster(phosphorCore)
          : phosphorCore
        : null;
      const beamComposeSource = beamCompose
        ? this.shaderCompileCacheBusterEnabled
          ? this.appendShaderCompileBuster(beamCompose)
          : beamCompose
        : null;
      const beamKernelBaseSource = variantKey.endsWith(":beam_crt")
        ? FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_KERNEL
        : (variantKey.endsWith(":beam_full") ? FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL : null);
      const beamKernelSource = beamKernelBaseSource
        ? this.shaderCompileCacheBusterEnabled
          ? this.appendShaderCompileBuster(beamKernelBaseSource)
          : beamKernelBaseSource
        : null;

      try {
        const pass1Program = await this.getOrCompileSharedProgram("pass1", pass1Source, variantKey);
        let compositeMidProgram: WebGLProgram | null = null;
        let phosphorCoreProgram: WebGLProgram | null = null;
        let beamKernelProgram: WebGLProgram | null = null;
        let beamComposeProgram: WebGLProgram | null = null;
        if (compositeMidSource) {
          compositeMidProgram = await this.getOrCompileSharedProgram("compositeMid", compositeMidSource, variantKey);
        }
        if (phosphorCoreSource) {
          phosphorCoreProgram = await this.getOrCompileSharedProgram("phosphorCore", phosphorCoreSource, variantKey);
        }
        if (beamKernelSource) {
          beamKernelProgram = await this.getOrCompileSharedProgram("beamKernel", beamKernelSource, variantKey);
        }
        if (beamComposeSource) {
          beamComposeProgram = await this.getOrCompileSharedProgram("beamCompose", beamComposeSource, variantKey);
        }
        const pass2Program = await this.getOrCompileSharedProgram("pass2", pass2Source, variantKey);
        if (this.isDisposed || this.gl.isContextLost()) {
          throw new Error("Pipeline was disposed during shader compile.");
        }
        if (!pass2Program) {
          throw new Error("Pass 2 program did not compile.");
        }

        const entry: WindowsLiteCompiledPrograms = {
          pass1: pass1Program,
          pass2: pass2Program,
          ...(compositeMidProgram ? { compositeMid: compositeMidProgram } : {}),
          ...(phosphorCoreProgram ? { phosphorCore: phosphorCoreProgram } : {}),
          ...(beamKernelProgram ? { beamKernel: beamKernelProgram } : {}),
          ...(beamComposeProgram ? { beamCompose: beamComposeProgram } : {}),
        };
        this.windowsLiteProgramCache.set(variantKey, entry);
        TetoricaRetroVideoPipeline.showDebug(
          `filter: Windows lite variant ${variantKey} compiled in ${(nowMs() - compileStartTime).toFixed(1)}ms`,
        );
        return entry;
      } catch (error) {
        throw error;
      } finally {
        releaseCompileTurn();
        this.windowsLiteVariantCompileInflight.delete(variantKey);
      }
    })();

    this.windowsLiteVariantCompileInflight.set(variantKey, compilePromise);
    return compilePromise;
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
        this.scheduleWindowsLiteForegroundCompile();
      }
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
        const { pass1, pass2, compositeMid, phosphorCore, beamKernel, beamCompose } = await this.compileWindowsLiteVariant(variantKey);
        if (this.isDisposed || this.gl.isContextLost()) return;

        if (this.windowsLitePendingVariantKey !== variantKey) {
          // A newer request superseded this one; the compiled programs stay
          // cached for whichever variant asks for them next.
          continue;
        }

        this.setFilterPrograms(pass1, pass2, compositeMid, phosphorCore, beamKernel, beamCompose);
        this.windowsLiteVariantKey = variantKey;
        this.windowsLitePendingVariantKey = null;
        if (!this.supportProgramCompilePromise) {
          this.onCompileStateChange?.({ active: false });
        }
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
        if (!this.supportProgramCompilePromise) {
          this.onCompileStateChange?.({ active: false });
        }
        return;
      }
    }
  }

  // onFilterReady is called after the background filter compilation finishes.
  static async create(
    gl: WebGL2RenderingContext,
    initialFilterState: RetroVideoFilterState | null,
    options?: {
      shaderCompileCacheBusterEnabled?: boolean;
    },
    onFilterReady?: () => void,
    onCompileStateChange?: (state: { active: boolean; label?: string }) => void,
  ): Promise<TetoricaRetroVideoPipeline> {
    // Passthrough is tiny — compiles in <10 ms even on ANGLE/Windows.
    logShaderCompileInfo("base:passthrough");
    const passthroughProgram = submitProgram(gl, VERTEX_SHADER_SOURCE, PASS_THROUGH_FRAGMENT);
    await waitAndVerifyPrograms(gl, [passthroughProgram]);
    const pipeline = new TetoricaRetroVideoPipeline(
      gl,
      passthroughProgram,
      true,
      options?.shaderCompileCacheBusterEnabled === true,
      onCompileStateChange,
    );
    const initialCompileFilterState = getInitialWindowsLiteCompileFilterState(initialFilterState);

    window.setTimeout(async () => {
      if (!shouldQueueWindowsLiteVariant(initialCompileFilterState)) {
        onFilterReady?.();
        return;
      }
      try {
        pipeline.currentFilterState = initialCompileFilterState;
        if (
          pipeline.shaderCompileCacheBusterEnabled &&
          pipeline.shaderCompileBusterTag === null
        ) {
          pipeline.refreshShaderCompileBusterTag();
        }
        const initialVariantKey = getWindowsLiteVariantKey(initialCompileFilterState);
        const { pass1, pass2, compositeMid, phosphorCore, beamKernel, beamCompose } = await pipeline.compileWindowsLiteVariant(initialVariantKey);
        if (pipeline.isDisposed || pipeline.gl.isContextLost()) {
          return;
        }
        pipeline.setFilterPrograms(pass1, pass2, compositeMid, phosphorCore, beamKernel, beamCompose);
        pipeline.windowsLiteVariantKey = initialVariantKey;
        pipeline.windowsLitePendingVariantKey = null;
        pipeline.queueSupportProgramsForFilterState(initialCompileFilterState);
        onCompileStateChange?.({ active: false });
        onFilterReady?.();
      } catch (error) {
        onCompileStateChange?.({ active: false });
        console.warn("[retro-player] initial shader compile failed", error);
        onFilterReady?.();
      }
    }, 0);

    return pipeline;
  }

  constructor(
    gl: WebGL2RenderingContext,
    passthroughProgram: WebGLProgram,
    windowsLiteMode = false,
    shaderCompileCacheBusterEnabled = false,
    onCompileStateChange?: (state: { active: boolean; label?: string }) => void,
  ) {
    this.gl = gl;
    this.passthroughProgram = passthroughProgram;
    this.windowsLiteMode = windowsLiteMode;
    this.shaderCompileCacheBusterEnabled = shaderCompileCacheBusterEnabled;
    this.onCompileStateChange = onCompileStateChange;

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

  private async ensureBeamDownscaleProgram() {
    if (this.beamDownscaleProgram && this.beamDownscaleLocs) {
      return;
    }

    const { waitForCompileTurn, releaseCompileTurn } = this.reserveCompileTurn();
    await waitForCompileTurn;

    try {
      await this.updateCompileState("Compiling shader (beam downscale)...");
      logShaderCompileInfo("base:beamDownscale");
      const program = submitProgram(
        this.gl,
        VERTEX_SHADER_SOURCE,
        BEAM_SOURCE_DOWNSCALE_FRAGMENT,
      );
      await this.updateCompileState("Linking shader (beam downscale)...");
      await waitAndVerifyPrograms(this.gl, [program]);
      this.beamDownscaleProgram = program;
      this.gl.useProgram(program);
      this.gl.uniform1i(this.gl.getUniformLocation(program, "uTexture"), 0);
      this.beamDownscaleLocs = {
        uTexture: this.gl.getUniformLocation(program, "uTexture"),
        uSourceSize: this.gl.getUniformLocation(program, "uSourceSize"),
        uTargetSize: this.gl.getUniformLocation(program, "uTargetSize"),
      };
    } finally {
      releaseCompileTurn();
    }
  }

  private async ensurePostCurvatureProgram() {
    if (this.postCurvatureProgram && this.postCurvatureLocs) {
      return;
    }

    const { waitForCompileTurn, releaseCompileTurn } = this.reserveCompileTurn();
    await waitForCompileTurn;

    try {
      await this.updateCompileState("Compiling shader (post curvature)...");
      logShaderCompileInfo("base:postCurvature");
      const program = submitProgram(
        this.gl,
        VERTEX_SHADER_SOURCE,
        POST_CURVATURE_FRAGMENT,
      );
      await this.updateCompileState("Linking shader (post curvature)...");
      await waitAndVerifyPrograms(this.gl, [program]);
      this.postCurvatureProgram = program;
      this.gl.useProgram(program);
      this.gl.uniform1i(this.gl.getUniformLocation(program, "uTexture"), 0);
      this.postCurvatureLocs = {
        uTexture: this.gl.getUniformLocation(program, "uTexture"),
        uCurvature: this.gl.getUniformLocation(program, "uCurvature"),
      };
    } finally {
      releaseCompileTurn();
    }
  }

  private buildPass1UniformLocations(program: WebGLProgram): Pass1UniformLocations {
    const { gl } = this;
    return {
      uTargetSize: gl.getUniformLocation(program, "uTargetSize"),
      uColorLevels: gl.getUniformLocation(program, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(program, "uDitherStrength"),
      uSamplingMode: gl.getUniformLocation(program, "uSamplingMode"),
      uPaletteMode: gl.getUniformLocation(program, "uPaletteMode"),
      uGlowStrength: gl.getUniformLocation(program, "uGlowStrength"),
      uHorizontalSharpness: gl.getUniformLocation(program, "uHorizontalSharpness"),
      uRgbConvergenceOffset: gl.getUniformLocation(program, "uRgbConvergenceOffset"),
      uSmoothStrength: gl.getUniformLocation(program, "uSmoothStrength"),
      uToonSteps: gl.getUniformLocation(program, "uToonSteps"),
      uEdgeBoost: gl.getUniformLocation(program, "uEdgeBoost"),
      uAnimeEdgeLow: gl.getUniformLocation(program, "uAnimeEdgeLow"),
      uAnimeEdgeHigh: gl.getUniformLocation(program, "uAnimeEdgeHigh"),
      uMonoTint: gl.getUniformLocation(program, "uMonoTint"),
      uNeonBoost: gl.getUniformLocation(program, "uNeonBoost"),
      uNeonSaturation: gl.getUniformLocation(program, "uNeonSaturation"),
      uNeonDetail: gl.getUniformLocation(program, "uNeonDetail"),
      uColoredGlowEnabled: gl.getUniformLocation(program, "uColoredGlowEnabled"),
      uCompositeEnabled: gl.getUniformLocation(program, "uCompositeEnabled"),
      uCompositeAmount: gl.getUniformLocation(program, "uCompositeAmount"),
      uCompositeChromaBlur: gl.getUniformLocation(program, "uCompositeChromaBlur"),
      uCompositeChromaDelay: gl.getUniformLocation(program, "uCompositeChromaDelay"),
      uCompositeNoise: gl.getUniformLocation(program, "uCompositeNoise"),
      uTime: gl.getUniformLocation(program, "uTime"),
    };
  }

  private buildPass2UniformLocations(program: WebGLProgram): Pass2UniformLocations {
    const { gl } = this;
    return {
      uTargetSize: gl.getUniformLocation(program, "uTargetSize"),
      uOutputSize: gl.getUniformLocation(program, "uOutputSize"),
      uDisplaySize: gl.getUniformLocation(program, "uDisplaySize"),
      uBeamKernelTexture: gl.getUniformLocation(program, "uBeamKernelTexture"),
      uBeamSourceSize: gl.getUniformLocation(program, "uBeamSourceSize"),
      uColorLevels: gl.getUniformLocation(program, "uColorLevels"),
      uDitherStrength: gl.getUniformLocation(program, "uDitherStrength"),
      uSamplingMode: gl.getUniformLocation(program, "uSamplingMode"),
      uCurvature: gl.getUniformLocation(program, "uCurvature"),
      uScanlineStrength: gl.getUniformLocation(program, "uScanlineStrength"),
      uScanline2Strength: gl.getUniformLocation(program, "uScanline2Strength"),
      uScanlineBrightnessFade: gl.getUniformLocation(program, "uScanlineBrightnessFade"),
      uVignetteStrength: gl.getUniformLocation(program, "uVignetteStrength"),
      uLcdCrosstalkStrength: gl.getUniformLocation(program, "uLcdCrosstalkStrength"),
      uGlowStrength: gl.getUniformLocation(program, "uGlowStrength"),
      uHorizontalSharpness: gl.getUniformLocation(program, "uHorizontalSharpness"),
      uRgbConvergenceOffset: gl.getUniformLocation(program, "uRgbConvergenceOffset"),
      uSmoothStrength: gl.getUniformLocation(program, "uSmoothStrength"),
      uPhosphorStrength: gl.getUniformLocation(program, "uPhosphorStrength"),
      uSpotMaskStrength: gl.getUniformLocation(program, "uSpotMaskStrength"),
      uBulbRadius: gl.getUniformLocation(program, "uBulbRadius"),
      uBlackFloor: gl.getUniformLocation(program, "uBlackFloor"),
      uOutputBrightness: gl.getUniformLocation(program, "uOutputBrightness"),
      uBasicContrast: gl.getUniformLocation(program, "uBasicContrast"),
      uShadowCrush: gl.getUniformLocation(program, "uShadowCrush"),
      uBasicSaturation: gl.getUniformLocation(program, "uBasicSaturation"),
      uReflectiveLcdBase: gl.getUniformLocation(program, "uReflectiveLcdBase"),
      uLightDependentTint: gl.getUniformLocation(program, "uLightDependentTint"),
      uGrainVisibilityMode: gl.getUniformLocation(program, "uGrainVisibilityMode"),
      uPhosphorDotLightBalance: gl.getUniformLocation(program, "uPhosphorDotLightBalance"),
      uPixelAspect: gl.getUniformLocation(program, "uPixelAspect"),
      uPhosphorDotMode: gl.getUniformLocation(program, "uPhosphorDotMode"),
      uPhosphorDotShape: gl.getUniformLocation(program, "uPhosphorDotShape"),
      uPhosphorDotInternalScale: gl.getUniformLocation(program, "uPhosphorDotInternalScale"),
      uPhosphorDotSizeResponse: gl.getUniformLocation(program, "uPhosphorDotSizeResponse"),
      uPhosphorDotBrightCore: gl.getUniformLocation(program, "uPhosphorDotBrightCore"),
      uPhosphorDotCellFill: gl.getUniformLocation(program, "uPhosphorDotCellFill"),
      uPhosphorDotFlatDisc: gl.getUniformLocation(program, "uPhosphorDotFlatDisc"),
      uPhosphorDotNeighborBlend: gl.getUniformLocation(program, "uPhosphorDotNeighborBlend"),
      uPhosphorDotGrainStrength: gl.getUniformLocation(program, "uPhosphorDotGrainStrength"),
      uBeamDarkCutoff: gl.getUniformLocation(program, "uBeamDarkCutoff"),
      uBeamHorizontalSpread: gl.getUniformLocation(program, "uBeamHorizontalSpread"),
      uBeamStripeStrength: gl.getUniformLocation(program, "uBeamStripeStrength"),
      uBeamWhiteBloom: gl.getUniformLocation(program, "uBeamWhiteBloom"),
      uBeamWarmBloom: gl.getUniformLocation(program, "uBeamWarmBloom"),
      uScreenFaceGlow: gl.getUniformLocation(program, "uScreenFaceGlow"),
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
    if (this.shaderCompileCacheBusterEnabled && this.shaderCompileBusterTag === null) {
      this.refreshShaderCompileBusterTag();
    }

    this.currentFilterState = filterState;
    this.queueSupportProgramsForFilterState(filterState);
    this.queueWindowsLiteVariant(filterState);
  }

  private hasPreparedSupportProgramsForFilterState(filterState: RetroVideoFilterState) {
    const needsBeamDownscale = shouldUsePreFilterDownscale(filterState);
    const needsPostCurvature = shouldUsePostCurvaturePass(filterState);
    const hasBeamDownscale = !needsBeamDownscale || (!!this.beamDownscaleProgram && !!this.beamDownscaleLocs);
    const hasPostCurvature = !needsPostCurvature || (!!this.postCurvatureProgram && !!this.postCurvatureLocs);
    return hasBeamDownscale && hasPostCurvature;
  }

  hasPreparedFilterStateVariant(filterState: RetroVideoFilterState) {
    if (!this.hasPreparedSupportProgramsForFilterState(filterState)) {
      return false;
    }

    if (!this.windowsLiteMode) {
      return true;
    }

    return this.windowsLiteProgramCache.has(getWindowsLiteVariantKey(filterState));
  }

  async prepareFilterStateVariant(filterState: RetroVideoFilterState) {
    try {
      await this.ensureSupportProgramsForFilterState(filterState);
      if (!this.windowsLiteMode) {
        this.onCompileStateChange?.({ active: false });
        return;
      }

      await this.compileWindowsLiteVariant(getWindowsLiteVariantKey(filterState));
      this.onCompileStateChange?.({ active: false });
    } catch (error) {
      this.onCompileStateChange?.({ active: false });
      throw error;
    }
  }

  setOutputEnabled(enabled: boolean) {
    this.outputEnabled = enabled;
  }

  setPresentationSamplingMode(mode: RetroPresentationSamplingMode) {
    this.presentationSamplingMode = mode;
  }

  setFilterBufferCap(cap: FilterBufferCap | null) {
    this.isFilterBufferCapEnabled = cap !== null;
  }

  setFilterViewportScale(scale: number) {
    this.filterViewportScale = Number.isFinite(scale) && scale > 0
      ? Math.max(1, scale)
      : 1;
  }

  setDisplaySizeOverride(size: { width: number; height: number } | null) {
    if (!size) {
      this.displaySizeOverride = null;
      return;
    }

    this.displaySizeOverride = {
      width: Math.max(1, size.width),
      height: Math.max(1, size.height),
    };
  }

  private getEffectiveDisplaySize() {
    if (this.displaySizeOverride) {
      return this.displaySizeOverride;
    }

    const canvasElement = isHtmlCanvasElement(this.gl.canvas) ? this.gl.canvas : null;
    return {
      width: Math.max(canvasElement?.clientWidth ?? this.gl.drawingBufferWidth, 1),
      height: Math.max(canvasElement?.clientHeight ?? this.gl.drawingBufferHeight, 1),
    };
  }

  private getEffectiveViewportFloorSize() {
    const viewportFloorSize = this.displaySizeOverride
      ? {
          width: Math.max(1, Math.floor(this.displaySizeOverride.width)),
          height: Math.max(1, Math.floor(this.displaySizeOverride.height)),
        }
      : getViewportFloorSize(
          isHtmlCanvasElement(this.gl.canvas) ? this.gl.canvas : null,
          Math.max(this.gl.drawingBufferWidth, 1),
          Math.max(this.gl.drawingBufferHeight, 1),
        );

    if (this.filterViewportScale <= 1.0001) {
      return viewportFloorSize;
    }

    return {
      width: Math.max(1, Math.floor(viewportFloorSize.width / this.filterViewportScale)),
      height: Math.max(1, Math.floor(viewportFloorSize.height / this.filterViewportScale)),
    };
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
    this.lastAnimationTickAt = startedAt;
    this.animationTimeSec = 0;
  }

  private advanceAnimationClock() {
    const now = nowMs();
    const deltaMs = Math.max(0, Math.min(250, now - this.lastAnimationTickAt));
    this.lastAnimationTickAt = now;
    this.animationTimeSec = (this.animationTimeSec + deltaMs / 1000) % 4096;
    return this.animationTimeSec;
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

  private canReusePreviousFrame(source: RetroVideoSource): boolean {
    return !isHtmlImageElement(source);
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

    const vblankInterval = getVBlankFrameInterval(filterState.vblankSimulationMode);
    const shouldHoldPreviousFrame =
      vblankInterval > 1 &&
      this.canReusePreviousFrame(source) &&
      this.lastRenderedFilterState === filterState &&
      this.lastRenderedSource === source &&
      this.lastRenderedBufferWidth === gl.drawingBufferWidth &&
      this.lastRenderedBufferHeight === gl.drawingBufferHeight &&
      this.renderCount % vblankInterval !== 0;
    if (shouldHoldPreviousFrame) {
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
      const timeSec = this.advanceAnimationClock();

      // Pass 1: source → FBO (palette quantization, dithering, glow, edge boost)
      this.ensureFbo(w, h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.filterPass1Program);
      this.applyPass1Uniforms(filterState, sourceSize.width, sourceSize.height, timeSec);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      let pass1OutputTexture: WebGLTexture | null = this.fboTexture;
      if (this.compositeMidProgram && this.compositeMidLocs && this.fboTexture) {
        this.ensureCompositeMidFbo(w, h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.compositeMidFbo);
        gl.viewport(0, 0, w, h);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.compositeMidProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.fboTexture);
        this.syncFboTextureSamplingFilter(gl.NEAREST);
        this.applyCompositeMidUniforms(filterState, timeSec);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        pass1OutputTexture = this.compositeMidTexture;
      }

      // Pass 2: FBO → screen/FBO (CRT effects: curvature, scanlines, phosphor dots, vignette)
      const isBeamVariant = this.windowsLiteVariantKey?.includes(":beam_") ?? false;
      const isBeamFullVariant = this.windowsLiteVariantKey?.includes(":beam_full") ?? false;
      const isBeamCrtVariant = this.windowsLiteVariantKey?.includes(":beam_crt") ?? false;
      const isBeamKernelVariant = isBeamFullVariant || isBeamCrtVariant;
      const usePreFilterDownscale = shouldUsePreFilterDownscale(filterState);
      const usePostCurvaturePass = shouldUsePostCurvaturePass(filterState);
      const canUsePreFilterDownscale =
        usePreFilterDownscale &&
        Boolean(this.beamDownscaleProgram && this.beamDownscaleLocs);
      const canUsePostCurvaturePass =
        usePostCurvaturePass &&
        Boolean(this.postCurvatureProgram && this.postCurvatureLocs);
      if (canUsePostCurvaturePass) {
        this.ensurePostCurvatureFbo(w, h);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, canUsePostCurvaturePass ? this.postCurvatureFbo : null);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      let pass2SourceTexture: WebGLTexture = this.texture;
      let pass2PrimaryTexture: WebGLTexture | null = pass1OutputTexture;
      let pass2Sizing: Pass2Sizing | null = null;
      if (canUsePreFilterDownscale && this.beamDownscaleProgram && this.beamDownscaleLocs) {
        pass2Sizing = this.resolvePass2Sizing(filterState, sourceSize.width, sourceSize.height);
        const {
          beamSourceWidth,
          beamSourceHeight,
        } = pass2Sizing;
        this.ensureBeamSourceFbo(beamSourceWidth, beamSourceHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.beamSourceFbo);
        gl.viewport(0, 0, beamSourceWidth, beamSourceHeight);
        gl.useProgram(this.beamDownscaleProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pass1OutputTexture);
        if (pass1OutputTexture === this.compositeMidTexture) {
          this.syncCompositeMidTextureSamplingFilter(gl.LINEAR);
        } else {
          this.syncFboTextureSamplingFilter(gl.LINEAR);
        }
        gl.uniform2f(
          this.beamDownscaleLocs.uSourceSize,
          Math.max(w, 1),
          Math.max(h, 1),
        );
        gl.uniform2f(
          this.beamDownscaleLocs.uTargetSize,
          Math.max(beamSourceWidth, 1),
          Math.max(beamSourceHeight, 1),
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        pass2SourceTexture = this.beamSourceTexture ?? this.texture;
        if (!isBeamVariant) {
          pass2PrimaryTexture = this.beamSourceTexture ?? pass1OutputTexture;
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, w, h);

        if (isBeamKernelVariant && this.beamKernelProgram && this.beamKernelLocs) {
          this.ensureBeamKernelFbo(w, h);
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.beamKernelFbo);
          gl.viewport(0, 0, w, h);
          gl.useProgram(this.beamKernelProgram);
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, pass2SourceTexture);
          if (pass2SourceTexture === this.beamSourceTexture) {
            this.syncBeamSourceTextureSamplingFilter(gl.LINEAR);
          } else {
            this.syncTextureSamplingFilter(gl.LINEAR);
          }
          const displaySize = this.getEffectiveDisplaySize();
          gl.uniform2f(this.beamKernelLocs.uBeamSourceSize, Math.max(beamSourceWidth, 1), Math.max(beamSourceHeight, 1));
          gl.uniform2f(this.beamKernelLocs.uDisplaySize, displaySize.width, displaySize.height);
          gl.uniform1f(this.beamKernelLocs.uColorLevels, Math.max(filterState.colorLevels, 2));
          gl.uniform1f(this.beamKernelLocs.uDitherStrength, filterState.ditherStrength);
          gl.uniform1f(this.beamKernelLocs.uSamplingMode, getSamplingModeValue(filterState.samplingMode));
          gl.uniform1f(this.beamKernelLocs.uHorizontalSharpness, filterState.horizontalSharpness);
          gl.uniform1f(this.beamKernelLocs.uRgbConvergenceOffset, filterState.rgbConvergenceOffset);
          gl.uniform1f(this.beamKernelLocs.uSmoothStrength, filterState.smoothStrength);
          gl.uniform1f(this.beamKernelLocs.uCurvature, getEffectivePreCurvature(filterState));
          gl.uniform1f(this.beamKernelLocs.uBeamDarkCutoff, filterState.beamDarkCutoff);
          gl.uniform1f(this.beamKernelLocs.uBeamHorizontalSpread, filterState.beamHorizontalSpread);
          gl.uniform1f(this.beamKernelLocs.uBeamWhiteBloom, filterState.beamWhiteBloom);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, w, h);
        }
        if (
          isBeamVariant &&
          pass2Sizing &&
          this.beamComposeProgram &&
          this.beamComposeLocs &&
          (!isBeamKernelVariant || this.beamKernelTexture)
        ) {
          this.ensureBeamComposeFbo(w, h);
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.beamComposeFbo);
          gl.viewport(0, 0, w, h);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.useProgram(this.beamComposeProgram);
          gl.activeTexture(gl.TEXTURE1);
          gl.bindTexture(gl.TEXTURE_2D, pass2SourceTexture);
          if (pass2SourceTexture === this.beamSourceTexture) {
            this.syncBeamSourceTextureSamplingFilter(gl.LINEAR);
          } else {
            this.syncTextureSamplingFilter(gl.LINEAR);
          }
          if (isBeamKernelVariant && this.beamKernelTexture) {
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, this.beamKernelTexture);
            this.syncBeamKernelTextureSamplingFilter(gl.LINEAR);
          }
          this.applyBeamComposeUniforms(filterState, pass2Sizing, w, h);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, w, h);
          pass2PrimaryTexture = this.beamComposeTexture ?? pass2PrimaryTexture;
        }
      }
      if (this.phosphorCoreProgram && this.phosphorCoreLocs && pass2PrimaryTexture) {
        this.ensurePhosphorCoreFbo(w, h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.phosphorCoreFbo);
        gl.viewport(0, 0, w, h);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pass2PrimaryTexture);
        if (pass2PrimaryTexture === this.beamSourceTexture) {
          this.syncBeamSourceTextureSamplingFilter(gl.NEAREST);
        } else if (pass2PrimaryTexture === this.compositeMidTexture) {
          this.syncCompositeMidTextureSamplingFilter(gl.NEAREST);
        } else {
          this.syncFboTextureSamplingFilter(gl.NEAREST);
        }
        this.applyPass2UniformsTo(
          this.phosphorCoreProgram,
          this.phosphorCoreLocs,
          filterState,
          sourceSize.width,
          sourceSize.height,
          timeSec,
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindFramebuffer(gl.FRAMEBUFFER, canUsePostCurvaturePass ? this.postCurvatureFbo : null);
        gl.viewport(0, 0, w, h);
        pass2PrimaryTexture = this.phosphorCoreTexture ?? pass2PrimaryTexture;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, canUsePostCurvaturePass ? this.postCurvatureFbo : null);
      gl.viewport(0, 0, w, h);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pass2PrimaryTexture);
      const pass2TextureFilter =
        isBeamVariant ? gl.LINEAR : gl.NEAREST;
      if (pass2PrimaryTexture === this.beamSourceTexture) {
        this.syncBeamSourceTextureSamplingFilter(pass2TextureFilter);
      } else if (pass2PrimaryTexture === this.phosphorCoreTexture) {
        this.syncPhosphorCoreTextureSamplingFilter(pass2TextureFilter);
      } else if (pass2PrimaryTexture === this.beamComposeTexture) {
        this.syncBeamComposeTextureSamplingFilter(pass2TextureFilter);
      } else if (pass2PrimaryTexture === this.compositeMidTexture) {
        this.syncCompositeMidTextureSamplingFilter(pass2TextureFilter);
      } else {
        this.syncFboTextureSamplingFilter(pass2TextureFilter);
      }
      if (canUsePreFilterDownscale) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, pass2SourceTexture);
        if (pass2SourceTexture === this.beamSourceTexture) {
          this.syncBeamSourceTextureSamplingFilter(gl.LINEAR);
        } else {
          this.syncTextureSamplingFilter(gl.LINEAR);
        }
        if (isBeamKernelVariant && this.beamKernelTexture) {
          gl.activeTexture(gl.TEXTURE2);
          gl.bindTexture(gl.TEXTURE_2D, this.beamKernelTexture);
          this.syncBeamKernelTextureSamplingFilter(gl.LINEAR);
        }
      }
      gl.useProgram(this.filterPass2Program);
      this.applyPass2Uniforms(
        filterState,
        sourceSize.width,
        sourceSize.height,
        timeSec,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (canUsePostCurvaturePass && this.postCurvatureTexture && this.postCurvatureProgram && this.postCurvatureLocs) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, w, h);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.postCurvatureProgram);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.postCurvatureTexture);
        this.syncPostCurvatureTextureSamplingFilter(gl.LINEAR);
        gl.uniform1f(this.postCurvatureLocs.uCurvature, filterState.curvature);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      // Restore source texture binding for next frame's upload
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      this.syncTextureSamplingFilter(textureFilter);
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
    this.lastRenderedFilterState = filterState;
    this.lastRenderedSource = source;
    this.lastRenderedBufferWidth = gl.drawingBufferWidth;
    this.lastRenderedBufferHeight = gl.drawingBufferHeight;

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
      for (const program of this.sharedProgramCache.values()) {
        gl.deleteProgram(program);
      }
      this.windowsLiteProgramCache.clear();
      this.sharedProgramCache.clear();
      this.sharedProgramCompileInflight.clear();
    } else {
      if (this.filterPass1Program && this.filterPass1Program !== this.passthroughProgram) {
        gl.deleteProgram(this.filterPass1Program);
      }
      if (this.filterPass2Program) gl.deleteProgram(this.filterPass2Program);
    }
    gl.deleteProgram(this.passthroughProgram);
    if (this.beamDownscaleProgram) gl.deleteProgram(this.beamDownscaleProgram);
    if (this.postCurvatureProgram) gl.deleteProgram(this.postCurvatureProgram);
    if (this.fbo) gl.deleteFramebuffer(this.fbo);
    if (this.fboTexture) gl.deleteTexture(this.fboTexture);
    if (this.beamSourceFbo) gl.deleteFramebuffer(this.beamSourceFbo);
    if (this.beamSourceTexture) gl.deleteTexture(this.beamSourceTexture);
    if (this.compositeMidFbo) gl.deleteFramebuffer(this.compositeMidFbo);
    if (this.compositeMidTexture) gl.deleteTexture(this.compositeMidTexture);
    if (this.phosphorCoreFbo) gl.deleteFramebuffer(this.phosphorCoreFbo);
    if (this.phosphorCoreTexture) gl.deleteTexture(this.phosphorCoreTexture);
    if (this.beamKernelFbo) gl.deleteFramebuffer(this.beamKernelFbo);
    if (this.beamKernelTexture) gl.deleteTexture(this.beamKernelTexture);
    if (this.beamComposeFbo) gl.deleteFramebuffer(this.beamComposeFbo);
    if (this.beamComposeTexture) gl.deleteTexture(this.beamComposeTexture);
    if (this.postCurvatureFbo) gl.deleteFramebuffer(this.postCurvatureFbo);
    if (this.postCurvatureTexture) gl.deleteTexture(this.postCurvatureTexture);
    this.currentSource = null;
    this.currentFilterState = null;
    this.lastRenderedFilterState = null;
    this.lastRenderedSource = null;
    this.lastRenderedBufferWidth = 0;
    this.lastRenderedBufferHeight = 0;
    this.lastUploadedImageSource = null;
    this.lastUploadedVideoSource = null;
    this.lastUploadedVideoTime = Number.NaN;
  }

  private getUploadSource(
    source: RetroVideoSource,
    _filterState: RetroVideoFilterState,
  ): RetroVideoSource {
    // The WebGL shader quantizes pixels via uTargetSize uniforms, so direct
    // upload always works. Avoids drawImage() failures on older Android.
    return source;
  }

  private resolvePass2Sizing(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
  ): Pass2Sizing {
    const viewportFloorSize = this.getEffectiveViewportFloorSize();
    const visibleWidth = viewportFloorSize.width;
    const visibleHeight = viewportFloorSize.height;
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
      this.isFilterBufferCapEnabled,
    );
    const isBeamMode = isBeamCrossModeEnabled(filterState);
    const usePreFilterDownscale = shouldUsePreFilterDownscale(filterState);
    const pass2TargetWidth = effectiveTargetWidth;
    const pass2TargetHeight = effectiveTargetHeight;
    const beamSourceWidth = usePreFilterDownscale
      ? pass2TargetWidth
      : Math.max(sourceWidth ?? pass2TargetWidth, 1);
    const beamSourceHeight = usePreFilterDownscale
      ? pass2TargetHeight
      : Math.max(sourceHeight ?? pass2TargetHeight, 1);

    return {
      pass2TargetWidth,
      pass2TargetHeight,
      beamSourceWidth,
      beamSourceHeight,
      isBeamMode,
      isPhosphorDotMode,
    };
  }

  private applyPass1Uniforms(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
    timeSec: number,
  ) {
    if (!this.pass1Locs || !this.filterPass1Program) return;
    const { gl } = this;
    const viewportFloorSize = this.getEffectiveViewportFloorSize();
    const visibleWidth = viewportFloorSize.width;
    const visibleHeight = viewportFloorSize.height;
    const {
      width: effectiveTargetWidth,
      height: effectiveTargetHeight,
    } = getEffectiveRetroTargetSize(
      filterState,
      sourceWidth,
      sourceHeight,
      visibleWidth,
      visibleHeight,
      this.isFilterBufferCapEnabled,
    );

    gl.useProgram(this.filterPass1Program);
    gl.uniform2f(this.pass1Locs.uTargetSize, effectiveTargetWidth, effectiveTargetHeight);
    gl.uniform1f(this.pass1Locs.uColorLevels, Math.max(filterState.colorLevels, 2));
    gl.uniform1f(this.pass1Locs.uDitherStrength, filterState.ditherStrength);
    gl.uniform1f(this.pass1Locs.uSamplingMode, getSamplingModeValue(filterState.samplingMode));
    gl.uniform1f(this.pass1Locs.uPaletteMode, paletteModeToUniform(filterState.paletteMode));
    gl.uniform1f(this.pass1Locs.uGlowStrength, filterState.glowStrength);
    gl.uniform1f(this.pass1Locs.uHorizontalSharpness, filterState.horizontalSharpness);
    gl.uniform1f(this.pass1Locs.uRgbConvergenceOffset, filterState.rgbConvergenceOffset);
    gl.uniform1f(this.pass1Locs.uSmoothStrength, filterState.smoothStrength);
    gl.uniform1f(this.pass1Locs.uToonSteps, filterState.toonSteps);
    gl.uniform1f(this.pass1Locs.uEdgeBoost, filterState.edgeBoost);
    gl.uniform1f(this.pass1Locs.uAnimeEdgeLow, filterState.animeEdgeLow);
    gl.uniform1f(this.pass1Locs.uAnimeEdgeHigh, filterState.animeEdgeHigh);
    gl.uniform3f(this.pass1Locs.uMonoTint, ...MONO_TINTS[filterState.monoTint].rgb);
    gl.uniform1f(this.pass1Locs.uNeonBoost, filterState.neonBoost);
    gl.uniform1f(this.pass1Locs.uNeonSaturation, filterState.neonSaturation);
    gl.uniform1f(this.pass1Locs.uNeonDetail, filterState.neonDetail);
    gl.uniform1f(this.pass1Locs.uColoredGlowEnabled, filterState.coloredGlowEnabled ? 1 : 0);
    gl.uniform1f(this.pass1Locs.uCompositeEnabled, filterState.compositeEnabled ? 1 : 0);
    gl.uniform1f(this.pass1Locs.uCompositeAmount, filterState.compositeAmount);
    gl.uniform1f(this.pass1Locs.uCompositeChromaBlur, filterState.compositeChromaBlur);
    gl.uniform1f(this.pass1Locs.uCompositeChromaDelay, filterState.compositeChromaDelay);
    gl.uniform1f(this.pass1Locs.uCompositeNoise, filterState.compositeNoise);
    gl.uniform1f(this.pass1Locs.uTime, timeSec);
  }

  private applyPass2Uniforms(
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
    timeSec: number,
  ) {
    this.applyPass2UniformsTo(
      this.filterPass2Program,
      this.pass2Locs,
      filterState,
      sourceWidth,
      sourceHeight,
      timeSec,
    );
  }

  private applyPass2UniformsTo(
    program: WebGLProgram | null,
    locs: Pass2UniformLocations | null,
    filterState: RetroVideoFilterState,
    sourceWidth: number | undefined,
    sourceHeight: number | undefined,
    timeSec: number,
  ) {
    if (!locs || !program) return;
    const { gl } = this;
    const {
      pass2TargetWidth,
      pass2TargetHeight,
      beamSourceWidth,
      beamSourceHeight,
      isPhosphorDotMode,
    } = this.resolvePass2Sizing(
      filterState,
      sourceWidth,
      sourceHeight,
    );

    gl.useProgram(program);
    const displaySize = this.getEffectiveDisplaySize();
    gl.uniform2f(locs.uTargetSize, pass2TargetWidth, pass2TargetHeight);
    gl.uniform2f(
      locs.uOutputSize,
      Math.max(gl.drawingBufferWidth, 1),
      Math.max(gl.drawingBufferHeight, 1),
    );
    gl.uniform2f(
      locs.uDisplaySize,
      displaySize.width,
      displaySize.height,
    );
    gl.uniform2f(
      locs.uBeamSourceSize,
      beamSourceWidth,
      beamSourceHeight,
    );
    gl.uniform1f(locs.uColorLevels, Math.max(filterState.colorLevels, 2));
    gl.uniform1f(locs.uDitherStrength, filterState.ditherStrength);
    gl.uniform1f(locs.uSamplingMode, getSamplingModeValue(filterState.samplingMode));
    gl.uniform1f(locs.uCurvature, getEffectivePreCurvature(filterState));
    gl.uniform1f(locs.uScanlineStrength, filterState.scanlineStrength);
    gl.uniform1f(locs.uScanline2Strength, filterState.scanline2Strength);
    gl.uniform1f(locs.uScanlineBrightnessFade, filterState.scanlineBrightnessFade);
    gl.uniform1f(locs.uVignetteStrength, filterState.vignetteStrength);
    gl.uniform1f(locs.uLcdCrosstalkStrength, filterState.lcdCrosstalkStrength);
    gl.uniform1f(locs.uGlowStrength, filterState.glowStrength);
    gl.uniform1f(locs.uHorizontalSharpness, filterState.horizontalSharpness);
    gl.uniform1f(locs.uRgbConvergenceOffset, filterState.rgbConvergenceOffset);
    gl.uniform1f(locs.uSmoothStrength, filterState.smoothStrength);
    gl.uniform1f(locs.uPhosphorStrength, filterState.phosphorStrength);
    gl.uniform1f(locs.uSpotMaskStrength, filterState.spotMaskStrength);
    gl.uniform1f(locs.uBulbRadius, filterState.bulbRadius);
    gl.uniform1f(locs.uBlackFloor, filterState.blackFloor);
    gl.uniform1f(locs.uOutputBrightness, filterState.outputBrightness);
    gl.uniform1f(locs.uBasicContrast, filterState.basicContrast);
    gl.uniform1f(locs.uShadowCrush, filterState.shadowCrush);
    gl.uniform1f(locs.uBasicSaturation, filterState.basicSaturation);
    gl.uniform1f(locs.uReflectiveLcdBase, filterState.reflectiveLcdBase);
    gl.uniform1f(locs.uLightDependentTint, filterState.lightDependentTint);
    gl.uniform1f(
      locs.uGrainVisibilityMode,
      getGrainVisibilityModeValue(filterState.grainVisibilityMode),
    );
    gl.uniform1f(locs.uPhosphorDotLightBalance, filterState.phosphorDotLightBalance);
    gl.uniform1f(
      locs.uPixelAspect,
      (Math.max(gl.drawingBufferWidth, 1) * pass2TargetHeight) /
        (Math.max(gl.drawingBufferHeight, 1) * pass2TargetWidth),
    );
    gl.uniform1f(
      locs.uPhosphorDotMode,
      isPhosphorDotMode || isBeamCrossModeEnabled(filterState) ? 1 : 0,
    );
    gl.uniform1f(
      locs.uPhosphorDotShape,
      getPhosphorDotShapeValue(filterState.phosphorDotShape),
    );
    gl.uniform1f(
      locs.uPhosphorDotInternalScale,
      Math.min(4, Math.max(1, filterState.phosphorDotInternalScale)),
    );
    gl.uniform1f(
      locs.uPhosphorDotSizeResponse,
      Math.min(2, Math.max(0, filterState.phosphorDotSizeResponse)),
    );
    gl.uniform1f(locs.uPhosphorDotBrightCore, filterState.phosphorDotBrightCore ? 1 : 0);
    gl.uniform1f(locs.uPhosphorDotCellFill, filterState.phosphorDotCellFill);
    gl.uniform1f(locs.uPhosphorDotFlatDisc, filterState.phosphorDotFlatDisc ? 1 : 0);
    gl.uniform1f(locs.uPhosphorDotNeighborBlend, filterState.phosphorDotNeighborBlend ? 1 : 0);
    gl.uniform1f(locs.uPhosphorDotGrainStrength, filterState.phosphorDotGrainStrength);
    gl.uniform1f(locs.uBeamDarkCutoff, filterState.beamDarkCutoff);
    gl.uniform1f(locs.uBeamHorizontalSpread, filterState.beamHorizontalSpread);
    gl.uniform1f(locs.uBeamStripeStrength, filterState.beamStripeStrength);
    gl.uniform1f(locs.uBeamWhiteBloom, filterState.beamWhiteBloom);
    gl.uniform1f(locs.uBeamWarmBloom, filterState.beamWarmBloom);
    gl.uniform1f(locs.uScreenFaceGlow, filterState.screenFaceGlow);
    gl.uniform1f(locs.uFocusStrength, filterState.focusStrength);
    gl.uniform2f(locs.uFocusSize, filterState.focusWidth, filterState.focusHeight);
    gl.uniform2f(locs.uFocusCenter, filterState.focusCenterX, filterState.focusCenterY);
    gl.uniform1f(locs.uTime, timeSec);
  }
}
