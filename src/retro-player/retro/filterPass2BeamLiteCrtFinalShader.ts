import { FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE } from "./filterPass2BeamLiteCompositeShader";

const removeUniformLine = (source: string, uniformName: string): string =>
  source.replace(`uniform float ${uniformName};\n`, "");

const inlineFloatConstant = (source: string, uniformName: string, value: number): string =>
  removeUniformLine(source, uniformName).split(uniformName).join(value.toFixed(4));

export const FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_FINAL = ([
  ["uSamplingMode", 0],
  ["uRgbConvergenceOffset", 0],
  ["uCurvature", 0.03],
  ["uScanlineStrength", 0],
  ["uScanline2Strength", 0.01],
  ["uScanlineBrightnessFade", 0.6],
  ["uVignetteStrength", 0.3],
  ["uOutputBrightness", 1.0],
  ["uBasicContrast", 1.59],
  ["uBasicSaturation", 1.83],
  ["uBeamStripeStrength", 0.95],
  ["uBeamWhiteBloom", 1.14],
  ["uBeamWarmBloom", 0.28],
  ["uScreenFaceGlow", 0.33],
] as const).reduce(
  (source, [uniformName, value]) => inlineFloatConstant(source, uniformName, value),
  FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE,
);
