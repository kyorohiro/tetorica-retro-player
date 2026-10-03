import { FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL } from "./filterPass2BeamLiteKernelShader";

// basic_composite uses nearest sampling. Remove the unused averaging code
// before driver compilation: it otherwise expands inside every emitter and
// convergence/neighbor sample. Keep all other controls and the separate passes.
const nearestEmitterSampling = `vec3 sampleEmitterColor(vec2 emitterCell, vec2 sourceSize) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 maximumCell = max(safeSourceSize - vec2(1.0), vec2(0.0));
  vec2 clampedCell = clamp(emitterCell, vec2(0.0), maximumCell);
  vec2 sampleUv = (clampedCell + vec2(0.5)) / safeSourceSize;
  if (uRgbConvergenceOffset <= 0.0001) {
    ivec2 sourceTextureSize = textureSize(uSourceTexture, 0);
    ivec2 pixel = ivec2(floor(sampleUv * vec2(sourceTextureSize)));
    pixel = clamp(pixel, ivec2(0), max(sourceTextureSize - ivec2(1), ivec2(0)));
    return texelFetch(uSourceTexture, pixel, 0).rgb;
  }
  return texture(uSourceTexture, clamp(sampleUv, vec2(0.0), vec2(1.0))).rgb;
}

`;

const start = FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL.indexOf("vec3 sampleSourceTextureAverage4(");
const end = FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL.indexOf("vec3 sampleEmitterColorConverged(", start);
if (start < 0 || end < 0) {
  throw new Error("Beam nearest kernel sampling section was not found.");
}

export const FILTER_FRAGMENT_PASS2_BEAM_LITE_NEAREST_KERNEL = (
  FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL.slice(0, start) +
  nearestEmitterSampling +
  FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL.slice(end)
).replace("uniform float uSamplingMode;\n", "");
