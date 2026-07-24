export const FILTER_FRAGMENT_PASS2_BEAM_LITE_KERNEL = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uSourceTexture;
uniform vec2 uBeamSourceSize;
uniform vec2 uDisplaySize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uSamplingMode;
uniform float uHorizontalSharpness;
uniform float uRgbConvergenceOffset;
uniform float uSmoothStrength;
uniform float uCurvature;
uniform float uBeamDarkCutoff;
uniform float uBeamHorizontalSpread;
uniform float uBeamWhiteBloom;

const float BEAM_GATE_LOW = 0.0;
const float BEAM_CORE_SIGMA_X = 0.26;
const float BEAM_CORE_SIGMA_Y = 0.24;
const float BEAM_FLARE_SIGMA_X = 1.35;
const float BEAM_FLARE_SIGMA_Y = 0.30;
const float BEAM_LEAK_SIGMA_X = 0.34;
const float BEAM_LEAK_SIGMA_Y = 0.88;
const float BEAM_HALO_SIGMA_X = 1.58;
const float BEAM_HALO_SIGMA_Y = 1.08;
const float BEAM_BRIDGE_SIGMA_X = 0.72;
const float BEAM_BRIDGE_SIGMA_Y = 0.52;
const float BEAM_AURA_SIGMA_X = 1.95;
const float BEAM_AURA_SIGMA_Y = 1.42;
const float BEAM_SPARKLE_SIGMA_X = 0.14;
const float BEAM_SPARKLE_SIGMA_Y = 0.14;
const float BEAM_EXTENT_X_OUTER = 3.5;
const float BEAM_EXTENT_X_INNER = 2.6;
const float BEAM_EXTENT_Y_OUTER = 2.4;
const float BEAM_EXTENT_Y_INNER = 1.55;
const float BEAM_CORE_GAIN = 0.82;
const float BEAM_FLARE_GAIN = 0.48;
const float BEAM_LEAK_GAIN = 0.16;
const float BEAM_HALO_GAIN = 0.21;
const float BEAM_BRIDGE_GAIN = 0.39;
const float BEAM_AURA_GAIN = 0.08;
const float BEAM_SOFT_FIELD_THRESHOLD_LOW = 0.02;
const float BEAM_SOFT_FIELD_THRESHOLD_HIGH = 0.18;
const float BEAM_SOFT_FIELD_GAIN = 0.06;
const float BEAM_HIGHLIGHT_THRESHOLD_LOW = 0.025;
const float BEAM_HIGHLIGHT_THRESHOLD_HIGH = 0.11;
const float BEAM_HIGHLIGHT_LUMA_GAIN = 0.64;
const float BEAM_BASE_TONE = 0.34;
const float BEAM_BASE_HIGHLIGHT_GAIN = 0.07;
const float BEAM_WHITE_CORE_BASE = 0.065;
const float BEAM_WHITE_CORE_LUMA_GAIN = 0.17;

float bayer4x4(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  if (y == 0) { if (x == 0) return 0.0/16.0; if (x == 1) return 8.0/16.0; if (x == 2) return 2.0/16.0; return 10.0/16.0; }
  if (y == 1) { if (x == 0) return 12.0/16.0; if (x == 1) return 4.0/16.0; if (x == 2) return 14.0/16.0; return 6.0/16.0; }
  if (y == 2) { if (x == 0) return 3.0/16.0; if (x == 1) return 11.0/16.0; if (x == 2) return 1.0/16.0; return 9.0/16.0; }
  if (x == 0) return 15.0/16.0; if (x == 1) return 7.0/16.0; if (x == 2) return 13.0/16.0; return 5.0/16.0;
}

vec2 curveUv(vec2 uv, float strength) {
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

float getBeamEnergyCompensation(vec2 sourceSize) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 visibleSize = max(uDisplaySize, vec2(1.0));
  float pixelsPerCellX = visibleSize.x / safeSourceSize.x;
  float pixelsPerCellY = visibleSize.y / safeSourceSize.y;
  float pixelsPerCell = sqrt(max(pixelsPerCellX * pixelsPerCellY, 0.0001));
  return clamp(sqrt(1.6 / max(pixelsPerCell, 0.0001)), 0.72, 1.18);
}

float getBeamDarkCutoff() { return clamp(uBeamDarkCutoff, 0.0, 0.15); }
float getBeamHorizontalSpread() { return clamp(uBeamHorizontalSpread, 0.5, 2.0); }
float getBeamWhiteBloom() { return clamp(uBeamWhiteBloom, 0.0, 2.0); }

vec3 quantizeBeamInputColor(vec3 color) {
  if (uColorLevels >= 255.5) return color;
  float levels = max(uColorLevels, 2.0);
  return floor(color * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
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

vec3 sampleSourceTextureAverage16(vec2 cellMin, vec2 cellSize) {
  vec3 sum = vec3(0.0);
  for (int y = 0; y < 4; y++) {
    for (int x = 0; x < 4; x++) {
      vec2 offset = (vec2(float(x), float(y)) + 0.5) / 4.0;
      sum += texture(uSourceTexture, clamp(cellMin + cellSize * offset, vec2(0.0), vec2(1.0))).rgb;
    }
  }
  return sum * (1.0 / 16.0);
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
  return sampleSourceTextureAverage16(cellMin, cellSize);
}

vec3 sampleEmitterColorConverged(vec2 emitterCell, vec2 sourceSize) {
  float convergenceOffset = max(uRgbConvergenceOffset, 0.0);
  if (convergenceOffset <= 0.0001) return sampleEmitterColor(emitterCell, sourceSize);
  vec3 center = sampleEmitterColor(emitterCell, sourceSize);
  float r = sampleEmitterColor(emitterCell + vec2(convergenceOffset, 0.0), sourceSize).r;
  float b = sampleEmitterColor(emitterCell + vec2(-convergenceOffset, 0.0), sourceSize).b;
  return vec3(r, center.g, b);
}

vec3 applyBeamInputHorizontalSharpness(vec3 center, vec3 left, vec3 right) {
  float amount = clamp(uHorizontalSharpness - 1.0, -1.0, 1.0);
  if (abs(amount) <= 0.0001) return center;
  vec3 horizontalBlur = (left + center * 2.0 + right) * 0.25;
  if (amount < 0.0) return mix(center, horizontalBlur, -amount);
  vec3 sharpened = center + (center - 0.5 * (left + right)) * amount;
  return clamp(sharpened, 0.0, 1.0);
}

vec3 applyBeamInputPostProcess(vec3 center, vec3 left, vec3 right, vec3 up, vec3 down, vec2 emitterCell) {
  vec3 color = center;
  if (uSmoothStrength > 0.001) {
    vec3 blurred = center * 0.4 + (left + right + up + down) * 0.15;
    color = mix(color, blurred, clamp(uSmoothStrength, 0.0, 1.0));
  }
  color = applyBeamInputHorizontalSharpness(color, left, right);
  if (uDitherStrength > 0.001 && uColorLevels < 255.5) {
    float levels = max(uColorLevels, 2.0);
    float dither = (bayer4x4(floor(emitterCell)) - 0.5) * (uDitherStrength / max(levels, 1.0));
    color = clamp(color + dither, 0.0, 1.0);
  }
  return quantizeBeamInputColor(color);
}

vec3 applyBeamCross(vec2 gridUv) {
  float horizontalSpread = getBeamHorizontalSpread();
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 sourceCoord = gridUv * sourceSize;
  vec2 sourceCell = floor(sourceCoord);
  vec3 accumulatedStreak = vec3(0.0);
  float accumulatedHighlight = 0.0;
  float accumulatedEnergy = 0.0;
  bool needsHorizontalNeighbors = abs(uHorizontalSharpness - 1.0) > 0.0001 || uSmoothStrength > 0.001;
  bool needsVerticalNeighbors = uSmoothStrength > 0.001;
  for (int sy = -1; sy <= 1; sy++) {
    for (int sx = -2; sx <= 2; sx++) {
      vec2 emitterCell = sourceCell + vec2(float(sx), float(sy));
      vec2 emitterCenter = emitterCell + vec2(0.5);
      vec3 centerSample = sampleEmitterColorConverged(emitterCell, sourceSize);
      vec3 leftSample = needsHorizontalNeighbors ? sampleEmitterColorConverged(emitterCell + vec2(-1.0, 0.0), sourceSize) : centerSample;
      vec3 rightSample = needsHorizontalNeighbors ? sampleEmitterColorConverged(emitterCell + vec2(1.0, 0.0), sourceSize) : centerSample;
      vec3 upSample = needsVerticalNeighbors ? sampleEmitterColorConverged(emitterCell + vec2(0.0, -1.0), sourceSize) : centerSample;
      vec3 downSample = needsVerticalNeighbors ? sampleEmitterColorConverged(emitterCell + vec2(0.0, 1.0), sourceSize) : centerSample;
      vec3 sampleColor = applyBeamInputPostProcess(centerSample, leftSample, rightSample, upSample, downSample, emitterCell);
      float sampleBrightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
      float sampleGate = smoothstep(BEAM_GATE_LOW, getBeamDarkCutoff(), sampleBrightness);
      vec2 delta = sourceCoord - emitterCenter;
      float dx = delta.x;
      float dy = delta.y;
      float dx2 = dx * dx;
      float dy2 = dy * dy;
      float coreSigmaX2 = BEAM_CORE_SIGMA_X * BEAM_CORE_SIGMA_X;
      float coreSigmaY2 = BEAM_CORE_SIGMA_Y * BEAM_CORE_SIGMA_Y;
      float flareSigmaX = BEAM_FLARE_SIGMA_X * horizontalSpread;
      float flareSigmaX2 = flareSigmaX * flareSigmaX;
      float flareSigmaY2 = BEAM_FLARE_SIGMA_Y * BEAM_FLARE_SIGMA_Y;
      float leakSigmaX2 = BEAM_LEAK_SIGMA_X * BEAM_LEAK_SIGMA_X;
      float leakSigmaY2 = BEAM_LEAK_SIGMA_Y * BEAM_LEAK_SIGMA_Y;
      float haloSigmaX2 = BEAM_HALO_SIGMA_X * BEAM_HALO_SIGMA_X;
      float haloSigmaY2 = BEAM_HALO_SIGMA_Y * BEAM_HALO_SIGMA_Y;
      float bridgeSigmaX = BEAM_BRIDGE_SIGMA_X * horizontalSpread;
      float bridgeSigmaX2 = bridgeSigmaX * bridgeSigmaX;
      float bridgeSigmaY2 = BEAM_BRIDGE_SIGMA_Y * BEAM_BRIDGE_SIGMA_Y;
      float auraSigmaX = BEAM_AURA_SIGMA_X * horizontalSpread;
      float auraSigmaX2 = auraSigmaX * auraSigmaX;
      float auraSigmaY2 = BEAM_AURA_SIGMA_Y * BEAM_AURA_SIGMA_Y;
      float sparkleSigmaX2 = BEAM_SPARKLE_SIGMA_X * BEAM_SPARKLE_SIGMA_X;
      float sparkleSigmaY2 = BEAM_SPARKLE_SIGMA_Y * BEAM_SPARKLE_SIGMA_Y;
      float core = exp(-(dx2 / coreSigmaX2 + dy2 / coreSigmaY2));
      float horizontalFlare = exp(-(dx2 / flareSigmaX2 + dy2 / flareSigmaY2));
      float verticalLeak = exp(-(dx2 / leakSigmaX2 + dy2 / leakSigmaY2));
      float halo = exp(-(dx2 / haloSigmaX2 + dy2 / haloSigmaY2));
      float bridge = exp(-(dx2 / bridgeSigmaX2 + dy2 / bridgeSigmaY2));
      float broadAura = exp(-(dx2 / auraSigmaX2 + dy2 / auraSigmaY2));
      float sparkle = exp(-(dx2 / sparkleSigmaX2 + dy2 / sparkleSigmaY2));
      float extentMask = smoothstep(BEAM_EXTENT_X_OUTER, BEAM_EXTENT_X_INNER, abs(dx)) * smoothstep(BEAM_EXTENT_Y_OUTER, BEAM_EXTENT_Y_INNER, abs(dy));
      float kernel = sampleGate * extentMask * (core * BEAM_CORE_GAIN + horizontalFlare * BEAM_FLARE_GAIN + verticalLeak * BEAM_LEAK_GAIN + halo * BEAM_HALO_GAIN + bridge * BEAM_BRIDGE_GAIN + broadAura * BEAM_AURA_GAIN);
      accumulatedStreak += sampleColor * kernel;
      accumulatedHighlight += sampleBrightness * sparkle * sampleGate;
      accumulatedEnergy += sampleBrightness * kernel;
    }
  }
  if (accumulatedEnergy <= 0.0001) return vec3(0.0);
  vec3 beamTint = accumulatedStreak / accumulatedEnergy;
  vec3 beamBase = accumulatedStreak / (vec3(1.0) + accumulatedStreak * 0.74);
  float luminance = max(max(beamBase.r, beamBase.g), beamBase.b);
  float floorMask = smoothstep(BEAM_SOFT_FIELD_THRESHOLD_LOW, BEAM_SOFT_FIELD_THRESHOLD_HIGH, accumulatedEnergy);
  vec3 softField = beamTint * accumulatedEnergy * BEAM_SOFT_FIELD_GAIN * floorMask;
  float highlightMask = smoothstep(BEAM_HIGHLIGHT_THRESHOLD_LOW, BEAM_HIGHLIGHT_THRESHOLD_HIGH, accumulatedHighlight + luminance * BEAM_HIGHLIGHT_LUMA_GAIN);
  vec3 coloredHalo = beamBase * (BEAM_BASE_TONE + highlightMask * BEAM_BASE_HIGHLIGHT_GAIN) + softField;
  vec3 whiteCore = vec3(1.0) * highlightMask * (BEAM_WHITE_CORE_BASE + luminance * BEAM_WHITE_CORE_LUMA_GAIN) * getBeamWhiteBloom();
  return coloredHalo + whiteCore;
}

void main(void) {
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0);
    return;
  }
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec3 beamColor = applyBeamCross(curvedUv);
  beamColor *= getBeamEnergyCompensation(sourceSize);
  float beamLuma = max(max(beamColor.r, beamColor.g), beamColor.b);
  finalColor = vec4(clamp(beamColor, 0.0, 1.0), clamp(beamLuma, 0.0, 1.0));
}
`;
