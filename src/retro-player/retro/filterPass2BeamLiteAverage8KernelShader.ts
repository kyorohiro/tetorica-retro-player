import { FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL } from "./filterPass2BeamLiteKernelShader";

// Keep the same eight taps and accumulation order as the generic kernel.
// Strip the unused nearest/four-tap branches before driver compilation;
// convergence, smoothing, sharpening and the Beam passes remain unchanged.
const average8EmitterSampling = `vec3 sampleEmitterColor(vec2 emitterCell, vec2 sourceSize) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 maximumCell = max(safeSourceSize - vec2(1.0), vec2(0.0));
  vec2 clampedCell = clamp(emitterCell, vec2(0.0), maximumCell);
  vec2 cellSize = 1.0 / safeSourceSize;
  vec2 cellMin = clampedCell / safeSourceSize;
  return sampleSourceTextureAverage8(cellMin, cellSize);
}

`;

const source = FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL;
const start = source.indexOf("vec3 sampleSourceTextureAverage4(");
const average8Start = source.indexOf("vec3 sampleSourceTextureAverage8(", start);
const emitterStart = source.indexOf("vec3 sampleEmitterColor(", average8Start);
const end = source.indexOf("vec3 sampleEmitterColorConverged(", emitterStart);
if (start < 0 || average8Start < 0 || emitterStart < 0 || end < 0) {
  throw new Error("Beam average8 kernel sampling section was not found.");
}

export const FILTER_FRAGMENT_PASS2_BEAM_LITE_AVERAGE8_KERNEL = (
  source.slice(0, start) +
  source.slice(average8Start, emitterStart) +
  average8EmitterSampling +
  source.slice(end)
).replace("uniform float uSamplingMode;\n", "");
