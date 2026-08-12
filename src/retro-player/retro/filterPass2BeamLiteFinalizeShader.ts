export const FILTER_FRAGMENT_PASS2_BEAM_LITE_FINALIZE = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uSourceTexture;
uniform sampler2D uBeamKernelTexture;
uniform vec2 uBeamSourceSize;
uniform float uSamplingMode;
uniform float uRgbConvergenceOffset;
uniform float uCurvature;

const float BEAM_SOURCE_DETAIL_SMOOTH_BLEND = 0.36;
const float BEAM_LIGHTMASK_LOW = 0.025;
const float BEAM_LIGHTMASK_HIGH = 0.23;
const float BEAM_SOURCE_DETAIL_BASE = 0.018;
const float BEAM_SOURCE_DETAIL_LIGHT_GAIN = 0.013;
const float BEAM_CHROMA_RESTORE_BASE = 0.14;
const float BEAM_CHROMA_RESTORE_LIGHT_GAIN = 0.26;
const float BEAM_CONTRAST_RESTORE = 1.12;

vec2 curveUv(vec2 uv, float strength) {
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

vec3 applyBeamColorRestore(vec3 color, vec3 sourceDetailColor, float lightMask) {
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float sourceSaturation = length(sourceDetailColor - vec3(dot(sourceDetailColor, vec3(0.299, 0.587, 0.114))));
  float beamSaturation = length(color - vec3(luma));
  float saturationGain = 1.0 + clamp(BEAM_CHROMA_RESTORE_BASE + lightMask * BEAM_CHROMA_RESTORE_LIGHT_GAIN, 0.0, 0.7) * clamp(sourceSaturation * 2.2, 0.0, 1.0);
  vec3 saturatedColor = mix(vec3(luma), color, saturationGain);
  float beamColorMask = smoothstep(0.015, 0.18, beamSaturation);
  vec3 contrasted = (mix(color, saturatedColor, beamColorMask) - 0.5) * BEAM_CONTRAST_RESTORE + 0.5;
  return clamp(contrasted, 0.0, 1.0);
}

vec3 sampleSourceTextureAverage4(vec2 cellMin, vec2 cellSize) {
  vec2 quarter = cellSize * 0.25;
  vec3 sum = vec3(0.0);
  sum += texture(uSourceTexture, clamp(cellMin + vec2(quarter.x, quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + vec2(quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0))).rgb;
  return sum * 0.25;
}

vec3 sampleSourceTextureAverage8(vec2 cellMin, vec2 cellSize) {
  vec3 sum = vec3(0.0);
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.25, 0.25), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.75, 0.25), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.25, 0.75), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.75, 0.75), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.50, 0.20), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.50, 0.80), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.20, 0.50), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + cellSize * vec2(0.80, 0.50), vec2(0.0), vec2(1.0))).rgb;
  return sum * 0.125;
}

vec3 sampleEmitterColor(vec2 emitterCell, vec2 sourceSize) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 maximumCell = max(safeSourceSize - vec2(1.0), vec2(0.0));
  vec2 clampedCell = clamp(emitterCell, vec2(0.0), maximumCell);
  vec2 sampleUv = (clampedCell + vec2(0.5)) / safeSourceSize;
  if (uSamplingMode < 0.5) {
    if (uRgbConvergenceOffset <= 0.0001) {
      ivec2 sourceTextureSize = textureSize(uSourceTexture, 0);
      ivec2 pixel = ivec2(floor(sampleUv * vec2(sourceTextureSize)));
      pixel = clamp(pixel, ivec2(0), max(sourceTextureSize - ivec2(1), ivec2(0)));
      return texelFetch(uSourceTexture, pixel, 0).rgb;
    }
    return texture(uSourceTexture, clamp(sampleUv, vec2(0.0), vec2(1.0))).rgb;
  }
  vec2 cellSize = 1.0 / safeSourceSize;
  vec2 cellMin = clampedCell / safeSourceSize;
  if (uSamplingMode < 1.5) return sampleSourceTextureAverage4(cellMin, cellSize);
  if (uSamplingMode < 2.5) return sampleSourceTextureAverage8(cellMin, cellSize);
  return sampleSourceTextureAverage8(cellMin, cellSize);
}

vec3 sampleEmitterColorSmooth(vec2 emitterCell, vec2 sourceSize) {
  vec2 base = floor(emitterCell);
  vec2 fracPart = fract(emitterCell);
  vec3 c00 = sampleEmitterColor(base, sourceSize);
  vec3 c10 = sampleEmitterColor(base + vec2(1.0, 0.0), sourceSize);
  vec3 c01 = sampleEmitterColor(base + vec2(0.0, 1.0), sourceSize);
  vec3 c11 = sampleEmitterColor(base + vec2(1.0, 1.0), sourceSize);
  vec3 cx0 = mix(c00, c10, fracPart.x);
  vec3 cx1 = mix(c01, c11, fracPart.x);
  return mix(cx0, cx1, fracPart.y);
}

void main(void) {
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 sourceCoord = curvedUv * sourceSize;
  vec4 beamStripe = texture(uBeamKernelTexture, vTextureCoord);
  vec3 beamColor = beamStripe.rgb;
  float beamLuma = beamStripe.a;
  vec3 sourceDetailColor = mix(sampleEmitterColor(sourceCoord, sourceSize), sampleEmitterColorSmooth(sourceCoord, sourceSize), BEAM_SOURCE_DETAIL_SMOOTH_BLEND);
  float sourceDetailLuma = max(max(sourceDetailColor.r, sourceDetailColor.g), sourceDetailColor.b);
  float lightMask = smoothstep(BEAM_LIGHTMASK_LOW, BEAM_LIGHTMASK_HIGH, beamLuma);
  vec3 sourceDetail = sourceDetailColor * smoothstep(0.03, 0.22, sourceDetailLuma) * (BEAM_SOURCE_DETAIL_BASE + lightMask * BEAM_SOURCE_DETAIL_LIGHT_GAIN);
  vec3 finalBeamColor = beamColor + sourceDetail;
  finalBeamColor = applyBeamColorRestore(finalBeamColor, sourceDetailColor, lightMask);
  finalColor = vec4(clamp(finalBeamColor, 0.0, 1.0), 1.0);
}
`;
