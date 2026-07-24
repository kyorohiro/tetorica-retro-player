export const FILTER_FRAGMENT_PASS2_BEAM_LITE = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
in vec2 vMaskCoord;

out vec4 finalColor;

uniform sampler2D uSourceTexture;

uniform vec2 uTargetSize;
uniform vec2 uOutputSize;
uniform vec2 uBeamSourceSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uSamplingMode;
uniform float uHorizontalSharpness;
uniform float uRgbConvergenceOffset;
uniform float uSmoothStrength;

uniform float uCurvature;

uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;

uniform float uVignetteStrength;
uniform float uOutputBrightness;
uniform float uBasicContrast;
uniform float uBasicSaturation;
uniform float uBeamDarkCutoff;
uniform float uBeamHorizontalSpread;
uniform float uBeamStripeStrength;
uniform float uBeamWhiteBloom;
uniform float uBeamWarmBloom;
uniform float uScreenFaceGlow;

uniform float uTime;

const float PI = 3.141592653589793;
const float BEAM_MERGED_MASK_CELL_PIXELS = 2.2;

/*
 * Analytic box-filtered sine.
 *
 * A single-sample sin() aliases once its period drops below the local
 * pixel footprint (screen-space derivative of phase). This applies the
 * closed-form average of sin() over that footprint (sinc falloff), so
 * scanlines fade to a flat field instead of flickering/moire-ing as the
 * output shrinks relative to the pattern frequency.
 */
float bandLimitedSin(float phase)
{
  float halfWidth = fwidth(phase) * 0.5;
  float sincTerm = halfWidth > 0.0001
    ? sin(halfWidth) / halfWidth
    : 1.0;
  return sin(phase) * sincTerm;
}

float getBeamPatternResolve(float patternCount)
{
  float pixelsPerPattern = uOutputSize.y / max(patternCount, 1.0);
  return clamp(
    smoothstep(
      BEAM_MERGED_MASK_CELL_PIXELS * 0.5,
      BEAM_MERGED_MASK_CELL_PIXELS,
      pixelsPerPattern
    ),
    0.0,
    1.0
  );
}

float bayer4x4(vec2 pos)
{
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  if (y == 0) {
    if (x == 0) return 0.0 / 16.0;
    if (x == 1) return 8.0 / 16.0;
    if (x == 2) return 2.0 / 16.0;
    return 10.0 / 16.0;
  }
  if (y == 1) {
    if (x == 0) return 12.0 / 16.0;
    if (x == 1) return 4.0 / 16.0;
    if (x == 2) return 14.0 / 16.0;
    return 6.0 / 16.0;
  }
  if (y == 2) {
    if (x == 0) return 3.0 / 16.0;
    if (x == 1) return 11.0 / 16.0;
    if (x == 2) return 1.0 / 16.0;
    return 9.0 / 16.0;
  }
  if (x == 0) return 15.0 / 16.0;
  if (x == 1) return 7.0 / 16.0;
  if (x == 2) return 13.0 / 16.0;
  return 5.0 / 16.0;
}

vec3 quantizeBeamInputColor(vec3 color)
{
  if (uColorLevels >= 255.5) {
    return color;
  }

  float levels = max(uColorLevels, 2.0);
  return floor(color * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
}

vec3 sampleSourceTextureAverage4(vec2 cellMin, vec2 cellSize)
{
  vec2 quarter = cellSize * 0.25;
  vec3 sum = vec3(0.0);
  sum += texture(uSourceTexture, clamp(cellMin + vec2(quarter.x, quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + vec2(quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uSourceTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0))).rgb;
  return sum * 0.25;
}

vec3 sampleSourceTextureAverage8(vec2 cellMin, vec2 cellSize)
{
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

vec3 sampleSourceTextureAverage16(vec2 cellMin, vec2 cellSize)
{
  vec3 sum = vec3(0.0);
  for (int y = 0; y < 4; y++) {
    for (int x = 0; x < 4; x++) {
      vec2 offset = (vec2(float(x), float(y)) + 0.5) / 4.0;
      sum += texture(uSourceTexture, clamp(cellMin + cellSize * offset, vec2(0.0), vec2(1.0))).rgb;
    }
  }
  return sum * (1.0 / 16.0);
}

/*
 * Beam tuning
 *
 * Keep these values together so we can tune the beam look without hunting
 * through the kernel math.
 */
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

const float BEAM_SOURCE_DETAIL_SMOOTH_BLEND = 0.36;

const float BEAM_LIGHTMASK_LOW = 0.025;
const float BEAM_LIGHTMASK_HIGH = 0.23;

const float BEAM_FIELD_BASE = 0.095;
const float BEAM_FIELD_LIGHT_GAIN = 0.04;
const float BEAM_STRIPE_GLOW_BASE = 0.08;
const float BEAM_STRIPE_GLOW_LIGHT_GAIN = 0.18;
const float BEAM_STRIPE_BLEED_BASE = 0.10;
const float BEAM_STRIPE_BLEED_LIGHT_GAIN = 0.14;
const float BEAM_MERGED_FLARE_BASE = 0.14;
const float BEAM_MERGED_FLARE_LIGHT_GAIN = 0.19;
const float BEAM_WHITE_BLOOM_GAIN = 0.15;
const float BEAM_SOURCE_DETAIL_BASE = 0.018;
const float BEAM_SOURCE_DETAIL_LIGHT_GAIN = 0.013;
const float BEAM_CHROMA_RESTORE_BASE = 0.14;
const float BEAM_CHROMA_RESTORE_LIGHT_GAIN = 0.26;
const float BEAM_CONTRAST_RESTORE = 1.12;


/*
 * CRT curvature
 */
vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;

  centered += centered * offset * strength;

  return centered * 0.5 + 0.5;
}

/*
 * Basic color adjustment
 */
vec3 applyBasicColorControls(vec3 color)
{
  float saturation = max(uBasicSaturation, 0.0);
  float contrast = max(uBasicContrast, 0.0);

  float luma = dot(
    color,
    vec3(0.299, 0.587, 0.114)
  );

  vec3 saturated = mix(
    vec3(luma),
    color,
    saturation
  );

  vec3 contrasted =
    (saturated - 0.5) *
    contrast +
    0.5;

  return clamp(
    contrasted,
    0.0,
    1.0
  );
}

vec3 applyBeamColorRestore(
  vec3 color,
  vec3 sourceDetailColor,
  float lightMask
)
{
  float luma = dot(
    color,
    vec3(0.299, 0.587, 0.114)
  );

  float sourceSaturation = length(
    sourceDetailColor - vec3(
      dot(sourceDetailColor, vec3(0.299, 0.587, 0.114))
    )
  );

  float beamSaturation = length(
    color - vec3(luma)
  );

  float saturationGain =
    1.0 +
    clamp(
      BEAM_CHROMA_RESTORE_BASE +
      lightMask * BEAM_CHROMA_RESTORE_LIGHT_GAIN,
      0.0,
      0.7
    ) *
    clamp(sourceSaturation * 2.2, 0.0, 1.0);

  vec3 saturatedColor = mix(
    vec3(luma),
    color,
    saturationGain
  );

  float beamColorMask = smoothstep(
    0.015,
    0.18,
    beamSaturation
  );

  vec3 contrasted =
    (mix(color, saturatedColor, beamColorMask) - 0.5) *
    BEAM_CONTRAST_RESTORE +
    0.5;

  return clamp(
    contrasted,
    0.0,
    1.0
  );
}

float getBeamDarkCutoff()
{
  return clamp(
    uBeamDarkCutoff,
    0.0,
    0.15
  );
}

float getBeamHorizontalSpread()
{
  return clamp(
    uBeamHorizontalSpread,
    0.5,
    2.0
  );
}

float getBeamStripeStrength()
{
  return clamp(
    uBeamStripeStrength,
    0.0,
    2.0
  );
}

float getBeamWhiteBloom()
{
  return clamp(
    uBeamWhiteBloom,
    0.0,
    2.0
  );
}

float getBeamWarmBloom()
{
  return clamp(
    uBeamWarmBloom,
    0.0,
    1.5
  );
}

float getScreenFaceGlow()
{
  return clamp(
    uScreenFaceGlow,
    0.0,
    0.5
  );
}

vec3 applyScreenFaceGlow(vec3 color)
{
  float amount = getScreenFaceGlow();
  if (amount <= 0.001) {
    return color;
  }

  float dist = distance(vMaskCoord, vec2(0.5));
  float broadField = 1.0 - smoothstep(0.08, 0.9, dist);
  float centerCoreDist = dist / 0.38;
  float centerCore = exp(-(centerCoreDist * centerCoreDist));
  float faceGlow = clamp(broadField * 0.65 + centerCore * 0.75, 0.0, 1.25);
  vec3 floorGlow = vec3(0.22, 0.19, 0.15) * faceGlow * amount;
  vec3 lifted = max(color, floorGlow);
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float hazeMask =
    faceGlow *
    (0.45 + smoothstep(0.02, 0.55, luma) * 0.90);
  vec3 hazeGlow = vec3(0.34, 0.32, 0.29) * hazeMask * amount * 0.72;

  return lifted + hazeGlow;
}


/*
 * RGB stripe and bleed masks
 *
 * Both masks share the same local coordinates, so they are calculated
 * together instead of repeating the coordinate calculations.
 */
void sampleBeamStripeMasks(
  vec2 uv,
  vec2 sourceSize,
  out vec3 stripeMask,
  out vec3 bleedMask
)
{
  vec2 safeSourceSize = max(
    sourceSize,
    vec2(1.0)
  );

  vec2 cellCoord = uv * safeSourceSize;

  float stripeCoordX = cellCoord.x * 3.0;
  float cellIndex = floor(cellCoord.x);
  float staggerShift = mod(cellIndex, 2.0) * 0.28;

  vec2 local = fract(
    vec2(
      stripeCoordX,
      cellCoord.y + staggerShift
    )
  );

  float stripeR = (local.x - 1.0 / 6.0) / 0.15;
  float stripeG = (local.x - 0.5) / 0.15;
  float stripeB = (local.x - 5.0 / 6.0) / 0.15;
  vec3 stripeBars = exp(-vec3(
    stripeR * stripeR,
    stripeG * stripeG,
    stripeB * stripeB
  ));

  float bleedR = (local.x - 1.0 / 6.0) / 0.21;
  float bleedG = (local.x - 0.5) / 0.21;
  float bleedB = (local.x - 5.0 / 6.0) / 0.21;
  vec3 bleedBars = exp(-vec3(
    bleedR * bleedR,
    bleedG * bleedG,
    bleedB * bleedB
  ));

  float flatBody =
    smoothstep(0.01, 0.1, local.y) *
    (
      1.0 -
      smoothstep(0.9, 0.99, local.y)
    );

  float roundedCapsCoord = (local.y - 0.5) / 0.62;
  float roundedCaps = exp(-(roundedCapsCoord * roundedCapsCoord));

  float verticalShape = clamp(
    flatBody * 0.48 +
    roundedCaps * 0.68,
    0.0,
    1.0
  );

  float softVerticalCoord = (local.y - 0.5) / 1.22;
  float softVertical = exp(-(softVerticalCoord * softVerticalCoord));

  stripeMask = clamp(
    stripeBars * verticalShape,
    0.0,
    1.0
  );

  bleedMask = clamp(
    bleedBars * softVertical,
    0.0,
    1.0
  );
}

float getBeamStripeResolve(vec2 sourceSize)
{
  vec2 safeSourceSize = max(
    sourceSize,
    vec2(1.0)
  );

  float pixelsPerCellX = uOutputSize.x / safeSourceSize.x;
  float pixelsPerCellY = uOutputSize.y / safeSourceSize.y;
  float pixelsPerCell = min(
    pixelsPerCellX,
    pixelsPerCellY
  );

  return clamp(
    smoothstep(
      BEAM_MERGED_MASK_CELL_PIXELS * 0.5,
      BEAM_MERGED_MASK_CELL_PIXELS,
      pixelsPerCell
    ),
    0.0,
    1.0
  );
}

vec3 sampleBeamMergedMask(
  vec2 uv,
  vec2 sourceSize,
  float sigmaX,
  float sigmaY
)
{
  vec2 safeSourceSize = max(
    sourceSize,
    vec2(1.0)
  );

  vec2 cellCoord = uv * safeSourceSize;
  vec2 local = fract(cellCoord);

  float dx = (local.x - 0.5) / max(sigmaX, 0.0001);
  float dy = (local.y - 0.5) / max(sigmaY, 0.0001);
  float mask = clamp(
    exp(-(dx * dx + dy * dy)),
    0.0,
    1.0
  );

  return vec3(mask);
}


/*
 * Fetch one source emitter.
 *
 * Lite version intentionally avoids four-point interpolation.
 */
vec3 sampleEmitterColor(
  vec2 emitterCell,
  vec2 sourceSize
)
{
  vec2 safeSourceSize = max(
    sourceSize,
    vec2(1.0)
  );

  vec2 maximumCell = max(
    safeSourceSize - vec2(1.0),
    vec2(0.0)
  );

  vec2 clampedCell = clamp(
    emitterCell,
    vec2(0.0),
    maximumCell
  );

  vec2 sampleUv =
    (clampedCell + vec2(0.5)) /
    safeSourceSize;

  if (uSamplingMode < 0.5) {
    if (uRgbConvergenceOffset <= 0.0001) {
      ivec2 sourceTextureSize = textureSize(
        uSourceTexture,
        0
      );
      ivec2 pixel = ivec2(
        floor(sampleUv * vec2(sourceTextureSize))
      );

      pixel = clamp(
        pixel,
        ivec2(0),
        max(
          sourceTextureSize - ivec2(1),
          ivec2(0)
        )
      );

      return texelFetch(
        uSourceTexture,
        pixel,
        0
      ).rgb;
    }

    return texture(
      uSourceTexture,
      clamp(sampleUv, vec2(0.0), vec2(1.0))
    ).rgb;
  }

  vec2 cellSize = 1.0 / safeSourceSize;
  vec2 cellMin = (clampedCell - vec2(0.5)) / safeSourceSize;
  if (uSamplingMode < 1.5) {
    return sampleSourceTextureAverage4(cellMin, cellSize);
  }
  if (uSamplingMode < 2.5) {
    return sampleSourceTextureAverage8(cellMin, cellSize);
  }
  return sampleSourceTextureAverage16(cellMin, cellSize);
}

vec3 sampleEmitterColorConverged(
  vec2 emitterCell,
  vec2 sourceSize
)
{
  float convergenceOffset = max(uRgbConvergenceOffset, 0.0);
  if (convergenceOffset <= 0.0001) {
    return sampleEmitterColor(emitterCell, sourceSize);
  }

  vec3 center = sampleEmitterColor(emitterCell, sourceSize);
  float r = sampleEmitterColor(emitterCell + vec2(convergenceOffset, 0.0), sourceSize).r;
  float b = sampleEmitterColor(emitterCell + vec2(-convergenceOffset, 0.0), sourceSize).b;
  return vec3(r, center.g, b);
}

vec3 applyBeamInputHorizontalSharpness(
  vec3 center,
  vec3 left,
  vec3 right
)
{
  float amount = clamp(uHorizontalSharpness - 1.0, -1.0, 1.0);
  if (abs(amount) <= 0.0001) {
    return center;
  }

  vec3 horizontalBlur = (left + center * 2.0 + right) * 0.25;
  if (amount < 0.0) {
    return mix(center, horizontalBlur, -amount);
  }

  vec3 sharpened = center + (center - 0.5 * (left + right)) * amount;
  return clamp(sharpened, 0.0, 1.0);
}

vec3 applyBeamInputPostProcess(
  vec3 center,
  vec3 left,
  vec3 right,
  vec3 up,
  vec3 down,
  vec2 emitterCell
)
{
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


/*
 * Smooth source lookup
 *
 * Kept separate from the main beam kernel so we can blend in only a small
 * amount of soft neighborhood light without losing the "one emitter stays
 * one light source" behavior.
 */
vec3 sampleEmitterColorSmooth(
  vec2 emitterCell,
  vec2 sourceSize
)
{
  vec2 base = floor(emitterCell);
  vec2 fracPart = fract(emitterCell);

  vec3 c00 = sampleEmitterColorConverged(
    base,
    sourceSize
  );

  vec3 c10 = sampleEmitterColorConverged(
    base + vec2(1.0, 0.0),
    sourceSize
  );

  vec3 c01 = sampleEmitterColorConverged(
    base + vec2(0.0, 1.0),
    sourceSize
  );

  vec3 c11 = sampleEmitterColorConverged(
    base + vec2(1.0, 1.0),
    sourceSize
  );

  vec3 cx0 = mix(
    c00,
    c10,
    fracPart.x
  );

  vec3 cx1 = mix(
    c01,
    c11,
    fracPart.x
  );

  return mix(
    cx0,
    cx1,
    fracPart.y
  );
}


/*
 * Beam cross kernel
 *
 * 5 × 3 emitters = 15 source texture fetches per fragment.
 */
vec3 applyBeamCross(vec2 gridUv)
{
  float horizontalSpread = getBeamHorizontalSpread();
  vec2 sourceSize = max(
    uBeamSourceSize,
    vec2(1.0)
  );

  vec2 sourceCoord = gridUv * sourceSize;

  vec2 sourceCenter =
    floor(sourceCoord) +
    vec2(0.5);

  vec3 accumulatedStreak = vec3(0.0);
  float accumulatedHighlight = 0.0;
  float accumulatedEnergy = 0.0;
  bool needsHorizontalNeighbors =
    abs(uHorizontalSharpness - 1.0) > 0.0001 ||
    uSmoothStrength > 0.001;
  bool needsVerticalNeighbors =
    uSmoothStrength > 0.001;

  for (int sy = -1; sy <= 1; sy++) {
    for (int sx = -2; sx <= 2; sx++) {
      vec2 emitterCell =
        sourceCenter +
        vec2(
          float(sx),
          float(sy)
        );

      vec3 centerSample = sampleEmitterColorConverged(
        emitterCell,
        sourceSize
      );
      vec3 leftSample = needsHorizontalNeighbors
        ? sampleEmitterColorConverged(
          emitterCell + vec2(-1.0, 0.0),
          sourceSize
        )
        : centerSample;
      vec3 rightSample = needsHorizontalNeighbors
        ? sampleEmitterColorConverged(
          emitterCell + vec2(1.0, 0.0),
          sourceSize
        )
        : centerSample;
      vec3 upSample = needsVerticalNeighbors
        ? sampleEmitterColorConverged(
          emitterCell + vec2(0.0, -1.0),
          sourceSize
        )
        : centerSample;
      vec3 downSample = needsVerticalNeighbors
        ? sampleEmitterColorConverged(
          emitterCell + vec2(0.0, 1.0),
          sourceSize
        )
        : centerSample;
      vec3 sampleColor = applyBeamInputPostProcess(
        centerSample,
        leftSample,
        rightSample,
        upSample,
        downSample,
        emitterCell
      );

      float sampleBrightness = max(
        max(sampleColor.r, sampleColor.g),
        sampleColor.b
      );

      float sampleGate = smoothstep(
        BEAM_GATE_LOW,
        getBeamDarkCutoff(),
        sampleBrightness
      );

      vec2 delta =
        sourceCoord -
        emitterCell;

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

      float core = exp(
        -(
          dx2 / coreSigmaX2 +
          dy2 / coreSigmaY2
        )
      );

      float horizontalFlare = exp(
        -(
          dx2 / flareSigmaX2 +
          dy2 / flareSigmaY2
        )
      );

      float verticalLeak = exp(
        -(
          dx2 / leakSigmaX2 +
          dy2 / leakSigmaY2
        )
      );

      float halo = exp(
        -(
          dx2 / haloSigmaX2 +
          dy2 / haloSigmaY2
        )
      );

      float bridge = exp(
        -(
          dx2 / bridgeSigmaX2 +
          dy2 / bridgeSigmaY2
        )
      );

      float broadAura = exp(
        -(
          dx2 / auraSigmaX2 +
          dy2 / auraSigmaY2
        )
      );

      float sparkle = exp(
        -(
          dx2 / sparkleSigmaX2 +
          dy2 / sparkleSigmaY2
        )
      );

      float extentMask =
        smoothstep(BEAM_EXTENT_X_OUTER, BEAM_EXTENT_X_INNER, abs(dx)) *
        smoothstep(BEAM_EXTENT_Y_OUTER, BEAM_EXTENT_Y_INNER, abs(dy));

      float kernel =
        sampleGate *
        extentMask *
        (
          core * BEAM_CORE_GAIN +
          horizontalFlare * BEAM_FLARE_GAIN +
          verticalLeak * BEAM_LEAK_GAIN +
          halo * BEAM_HALO_GAIN +
          bridge * BEAM_BRIDGE_GAIN +
          broadAura * BEAM_AURA_GAIN
        );

      accumulatedStreak +=
        sampleColor *
        kernel;

      accumulatedHighlight +=
        sampleBrightness *
        sparkle *
        sampleGate;

      accumulatedEnergy +=
        sampleBrightness *
        kernel;
    }
  }

  if (accumulatedEnergy <= 0.0001) {
    return vec3(0.0);
  }

  vec3 beamTint =
    accumulatedStreak /
    accumulatedEnergy;

  vec3 beamBase =
    accumulatedStreak /
    (
      vec3(1.0) +
      accumulatedStreak * 0.74
    );

  float luminance = max(
    max(beamBase.r, beamBase.g),
    beamBase.b
  );

  float floorMask = smoothstep(
    BEAM_SOFT_FIELD_THRESHOLD_LOW,
    BEAM_SOFT_FIELD_THRESHOLD_HIGH,
    accumulatedEnergy
  );

  vec3 softField =
    beamTint *
    accumulatedEnergy *
    BEAM_SOFT_FIELD_GAIN *
    floorMask;

  float highlightMask = smoothstep(
    BEAM_HIGHLIGHT_THRESHOLD_LOW,
    BEAM_HIGHLIGHT_THRESHOLD_HIGH,
    accumulatedHighlight +
    luminance * BEAM_HIGHLIGHT_LUMA_GAIN
  );

  vec3 coloredHalo =
    beamBase *
    (
      BEAM_BASE_TONE +
      highlightMask * BEAM_BASE_HIGHLIGHT_GAIN
    ) +
    softField;

  vec3 whiteCore =
    vec3(1.0) *
    highlightMask *
    (
      BEAM_WHITE_CORE_BASE +
      luminance * BEAM_WHITE_CORE_LUMA_GAIN
    ) *
    getBeamWhiteBloom();

  return coloredHalo + whiteCore;
}

void main(void)
{
  vec2 curvedUv = curveUv(
    vTextureCoord,
    uCurvature
  );

  if (
    curvedUv.x < 0.0 ||
    curvedUv.x > 1.0 ||
    curvedUv.y < 0.0 ||
    curvedUv.y > 1.0
  ) {
    finalColor = vec4(
      0.0,
      0.0,
      0.0,
      1.0
    );

    return;
  }

  vec2 targetSize = max(
    uTargetSize,
    vec2(1.0)
  );

  vec2 sourceSize = max(
    uBeamSourceSize,
    vec2(1.0)
  );

  vec2 targetCell = floor(
    curvedUv *
    targetSize
  );

  vec2 pixelatedUv = clamp(
    (targetCell + 0.5) /
    targetSize,
    vec2(0.0),
    vec2(1.0)
  );

  vec2 sourceCoord =
    curvedUv *
    sourceSize;

  /*
   * Single Beam evaluation.
   *
   * The previous implementation evaluated this five times.
   */
  vec3 beamColor = applyBeamCross(curvedUv);

  vec3 sourceDetailColor = mix(
    sampleEmitterColor(
      sourceCoord,
      sourceSize
    ),
    sampleEmitterColorSmooth(
      sourceCoord,
      sourceSize
    ),
    BEAM_SOURCE_DETAIL_SMOOTH_BLEND
  );

  float sourceDetailLuma = max(
    max(
      sourceDetailColor.r,
      sourceDetailColor.g
    ),
    sourceDetailColor.b
  );

  float beamLuma = max(
    max(
      beamColor.r,
      beamColor.g
    ),
    beamColor.b
  );

  vec3 stripeMask;
  vec3 stripeBleedMask;

  sampleBeamStripeMasks(
    curvedUv,
    sourceSize,
    stripeMask,
    stripeBleedMask
  );

  float stripeResolve = getBeamStripeResolve(sourceSize);
  vec3 mergedStripeMask = sampleBeamMergedMask(
    curvedUv,
    sourceSize,
    0.34,
    0.58
  );
  vec3 mergedBleedMask = sampleBeamMergedMask(
    curvedUv,
    sourceSize,
    0.46,
    0.86
  );

  stripeMask = mix(
    mergedStripeMask,
    stripeMask,
    stripeResolve
  );

  stripeBleedMask = mix(
    mergedBleedMask,
    stripeBleedMask,
    stripeResolve
  );

  float lightMask = smoothstep(
    BEAM_LIGHTMASK_LOW,
    BEAM_LIGHTMASK_HIGH,
    beamLuma
  );

  vec3 beamField =
    beamColor *
    (
      BEAM_FIELD_BASE +
      lightMask * BEAM_FIELD_LIGHT_GAIN
    );

  vec3 stripeGlow =
    stripeMask *
    beamColor *
    (
      BEAM_STRIPE_GLOW_BASE +
      lightMask * BEAM_STRIPE_GLOW_LIGHT_GAIN
    ) *
    getBeamStripeStrength();

  vec3 stripeBleed =
    stripeBleedMask *
    beamColor *
    (
      BEAM_STRIPE_BLEED_BASE +
      lightMask * BEAM_STRIPE_BLEED_LIGHT_GAIN
    ) *
    getBeamStripeStrength();

  vec3 mergedFlare =
    beamColor *
    beamLuma *
    (
      BEAM_MERGED_FLARE_BASE +
      lightMask * BEAM_MERGED_FLARE_LIGHT_GAIN
    );

  /*
   * Slightly reduced from 0.28 so the RGB emitter structure
   * remains visible in bright areas.
   */
  vec3 whiteBloom =
    vec3(beamLuma) *
    lightMask *
    BEAM_WHITE_BLOOM_GAIN *
    getBeamWhiteBloom();

  vec3 warmBloom =
    vec3(1.0, 0.82, 0.30) *
    beamLuma *
    lightMask *
    BEAM_WHITE_BLOOM_GAIN *
    0.55 *
    getBeamWhiteBloom() *
    getBeamWarmBloom();

  vec3 sourceDetail =
    sourceDetailColor *
    smoothstep(
      0.03,
      0.22,
      sourceDetailLuma
    ) *
    (
      BEAM_SOURCE_DETAIL_BASE +
      lightMask * BEAM_SOURCE_DETAIL_LIGHT_GAIN
    );

  vec3 finalBeamColor =
    beamField +
    stripeGlow +
    stripeBleed +
    mergedFlare +
    whiteBloom +
    warmBloom +
    sourceDetail;

  float brightness = max(
    max(
      finalBeamColor.r,
      finalBeamColor.g
    ),
    finalBeamColor.b
  );

  float brightnessFade = clamp(
    uScanlineBrightnessFade,
    0.0,
    1.0
  );

  float visibility = mix(
    1.0,
    1.0 - clamp(brightness, 0.0, 1.0),
    brightnessFade
  );

  float scanlineResolve = getBeamPatternResolve(targetSize.y);
  float scanline2Resolve = getBeamPatternResolve(720.0);

  float scanline = bandLimitedSin(
    pixelatedUv.y *
    targetSize.y *
    PI
  );

  float scanlineMask =
    (scanline * 0.5 + 0.5) *
    max(uScanlineStrength, 0.0) *
    scanlineResolve *
    visibility *
    0.04;

  finalBeamColor *=
    1.0 -
    clamp(scanlineMask, 0.0, 1.0);

  float scanline2 =
    bandLimitedSin(
      (
        vTextureCoord.y +
        uTime * 0.05
      ) *
      720.0
    ) *
    uScanline2Strength *
    scanline2Resolve *
    visibility;

  finalBeamColor += vec3(scanline2);

  finalBeamColor = applyScreenFaceGlow(
    finalBeamColor
  );

  float vignette = distance(
    vMaskCoord,
    vec2(0.5)
  );

  float vignetteAmount =
    smoothstep(
      0.2,
      0.78,
      vignette
    ) *
    clamp(
      uVignetteStrength,
      0.0,
      1.0
    );

  finalBeamColor *=
    1.0 -
    vignetteAmount;

  finalBeamColor = applyBeamColorRestore(
    finalBeamColor,
    sourceDetailColor,
    lightMask
  );

  finalBeamColor = applyBasicColorControls(
    finalBeamColor
  );

  finalBeamColor = applyScreenFaceGlow(
    finalBeamColor
  );

  finalColor = vec4(
    clamp(
      finalBeamColor *
      max(uOutputBrightness, 0.0),
      0.0,
      1.0
    ),
    1.0
  );
}
`;
