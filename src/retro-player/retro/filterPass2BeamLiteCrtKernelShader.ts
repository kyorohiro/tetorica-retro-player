import { FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL } from "./filterPass2BeamLiteKernelShader";

const removeUniformLine = (source: string, uniformName: string): string =>
  source.replace(`uniform float ${uniformName};\n`, "");

const inlineFloatConstant = (source: string, uniformName: string, value: number): string =>
  removeUniformLine(source, uniformName).split(uniformName).join(value.toFixed(4));

export const FILTER_FRAGMENT_PASS2_BEAM_LITE_CRT_KERNEL = ([
  ["uSamplingMode", 0],
  ["uHorizontalSharpness", 1],
  ["uRgbConvergenceOffset", 0],
  ["uSmoothStrength", 0],
  ["uCurvature", 0.03],
  ["uBeamDarkCutoff", 0.04],
  ["uBeamHorizontalSpread", 1.27],
  ["uBeamWhiteBloom", 1.14],
] as const).reduce(
  (source, [uniformName, value]) => inlineFloatConstant(source, uniformName, value),
  FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL,
);
