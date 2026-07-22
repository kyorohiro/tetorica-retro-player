export const FILTER_FRAGMENT_PASS2_BEAM_LITE = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
in vec2 vMaskCoord;

out vec4 finalColor;

uniform sampler2D uPass1Texture;
uniform sampler2D uSourceTexture;

uniform vec2 uTargetSize;
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

uniform float uSignalInstabilityAmount;
uniform float uSignalHorizontalSync;
uniform float uSignalVerticalSync;
uniform float uSignalStaticNoise;
uniform float uSignalChromaNoise;
uniform float uSignalInstabilitySeed;
uniform float uSignalInstabilityPhase;

uniform float uTime;

const float PI = 3.141592653589793;

float bayer4x4(vec2 pos)
{
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = y * 4 + x;
  float matrix[16];
  matrix[0] = 0.0 / 16.0;
  matrix[1] = 8.0 / 16.0;
  matrix[2] = 2.0 / 16.0;
  matrix[3] = 10.0 / 16.0;
  matrix[4] = 12.0 / 16.0;
  matrix[5] = 4.0 / 16.0;
  matrix[6] = 14.0 / 16.0;
  matrix[7] = 6.0 / 16.0;
  matrix[8] = 3.0 / 16.0;
  matrix[9] = 11.0 / 16.0;
  matrix[10] = 1.0 / 16.0;
  matrix[11] = 9.0 / 16.0;
  matrix[12] = 15.0 / 16.0;
  matrix[13] = 7.0 / 16.0;
  matrix[14] = 13.0 / 16.0;
  matrix[15] = 5.0 / 16.0;
  return matrix[index];
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
const float BEAM_GATE_HIGH = 0.04;

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

const float BEAM_SOFT_SAMPLE_OFFSET_X = 0.18;
const float BEAM_SOFT_SAMPLE_OFFSET_Y = 0.16;
const float BEAM_SOFT_CENTER_WEIGHT = 0.72;
const float BEAM_SOFT_HORIZONTAL_WEIGHT = 0.09;
const float BEAM_SOFT_VERTICAL_WEIGHT = 0.05;

const float BEAM_SOFT_BLEND = 0.24;
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
 * Pseudo-random hash
 */
float hash13(vec3 p3)
{
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);

  return fract((p3.x + p3.y) * p3.z);
}


/*
 * Signal disturbance band
 */
float signalBandMask(vec2 uv)
{
  float staticNoise = clamp(uSignalStaticNoise, 0.0, 1.0);
  float horizontalSync = clamp(uSignalHorizontalSync, 0.0, 1.0);
  float verticalSync = clamp(uSignalVerticalSync, 0.0, 1.0);

  float amount = clamp(
    max(
      staticNoise,
      max(horizontalSync * 0.35, verticalSync * 0.2)
    ),
    0.0,
    1.0
  );

  if (amount <= 0.001) {
    return 0.0;
  }

  float phase = floor(uSignalInstabilityPhase);

  float center = fract(
    uSignalInstabilitySeed * 0.173 +
    phase * 0.137 +
    0.11
  );

  float thickness =
    mix(
      0.004,
      0.065,
      hash13(vec3(uSignalInstabilitySeed, phase, 5.0))
    ) *
    (0.4 + amount * 0.6);

  float dy = abs(uv.y - center);
  dy = min(dy, 1.0 - dy);

  return
    (1.0 - smoothstep(thickness * 0.45, thickness, dy)) *
    amount;
}


/*
 * Horizontal synchronization disturbance
 */
vec2 applySignalInstabilityUv(vec2 uv)
{
  float instability = clamp(uSignalInstabilityAmount, 0.0, 1.0);

  if (instability <= 0.001) {
    return uv;
  }

  float horizontalSync = clamp(uSignalHorizontalSync, 0.0, 1.0);
  float phase = floor(uSignalInstabilityPhase);

  float lineSpan =
    1.0 +
    floor(mix(0.0, 6.0, 1.0 - horizontalSync));

  float targetHeight = max(uTargetSize.y, 1.0);
  float targetWidth = max(uTargetSize.x, 1.0);

  float lineIndex = floor(
    (uv.y * targetHeight) /
    max(lineSpan, 1.0)
  );

  float lineNoise = hash13(
    vec3(
      lineIndex + uSignalInstabilitySeed * 37.0,
      phase,
      1.0
    )
  );

  float lineActive = smoothstep(0.72, 0.985, lineNoise);

  float lineStrength = hash13(
    vec3(
      lineIndex + uSignalInstabilitySeed * 53.0,
      phase,
      2.0
    )
  );

  float direction =
    hash13(
      vec3(
        lineIndex + uSignalInstabilitySeed * 71.0,
        phase,
        3.0
      )
    ) -
    0.5;

  float lineOffsetPixels =
    direction *
    (0.6 + lineStrength * (1.0 + instability * 7.0)) *
    (0.4 + horizontalSync * 2.8);

  float bandOffsetPixels =
    signalBandMask(uv) *
    (
      hash13(
        vec3(
          uSignalInstabilitySeed,
          phase,
          13.0
        )
      ) -
      0.5
    ) *
    (1.0 + instability * 6.0);

  uv.x +=
    (
      lineOffsetPixels * lineActive +
      bandOffsetPixels
    ) /
    targetWidth;

  return vec2(
    clamp(uv.x, 0.0, 1.0),
    fract(uv.y + 1.0)
  );
}


/*
 * Chroma bleeding
 *
 * uPass1Texture is intentionally sampled here.
 * The source image's red and blue channels bleed into the Beam result.
 */
vec3 applySignalChromaInstability(
  vec3 color,
  vec2 sampleUv
)
{
  float chromaNoise = clamp(uSignalChromaNoise, 0.0, 1.0);

  if (chromaNoise <= 0.001) {
    return color;
  }

  float instability = clamp(uSignalInstabilityAmount, 0.0, 1.0);
  float targetWidth = max(uTargetSize.x, 1.0);

  float chromaOffset =
    (
      0.35 +
      instability * 1.8 +
      chromaNoise * 1.2
    ) /
    targetWidth;

  vec2 leftUv = clamp(
    sampleUv - vec2(chromaOffset, 0.0),
    vec2(0.0),
    vec2(1.0)
  );

  vec2 rightUv = clamp(
    sampleUv + vec2(chromaOffset, 0.0),
    vec2(0.0),
    vec2(1.0)
  );

  vec3 left = texture(uPass1Texture, leftUv).rgb;
  vec3 right = texture(uPass1Texture, rightUv).rgb;

  vec3 bled = vec3(
    mix(color.r, right.r, 0.22),
    color.g,
    mix(color.b, left.b, 0.18)
  );

  float luma = dot(
    bled,
    vec3(0.299, 0.587, 0.114)
  );

  vec3 desaturated = mix(
    vec3(luma),
    bled,
    1.0 - chromaNoise * 0.3
  );

  float hueJitter =
    (
      hash13(
        vec3(
          uSignalInstabilitySeed,
          floor(uSignalInstabilityPhase),
          21.0
        )
      ) -
      0.5
    ) *
    chromaNoise;

  desaturated.r += hueJitter * 0.05;
  desaturated.b -= hueJitter * 0.04;

  return clamp(
    mix(
      color,
      desaturated,
      min(0.75, chromaNoise)
    ),
    0.0,
    1.0
  );
}


/*
 * Static noise within the disturbance band
 */
vec3 applySignalStaticNoise(
  vec3 color,
  vec2 uv
)
{
  float band = signalBandMask(uv);

  if (band <= 0.001) {
    return color;
  }

  float staticNoise = clamp(uSignalStaticNoise, 0.0, 1.0);
  float phase = floor(uSignalInstabilityPhase);

  vec2 coarse = floor(
    gl_FragCoord.xy *
    vec2(1.0, 0.35)
  );

  float noiseA =
    hash13(
      vec3(
        coarse.x + 13.0,
        coarse.y + 7.0,
        phase + uSignalInstabilitySeed * 97.0
      )
    ) -
    0.5;

  float noiseB =
    hash13(
      vec3(
        coarse.x * 0.5 + 41.0,
        coarse.y + 17.0,
        phase * 0.7 + uSignalInstabilitySeed * 53.0
      )
    ) -
    0.5;

  float stripe =
    hash13(
      vec3(
        floor(gl_FragCoord.y * 0.5),
        phase + 3.0,
        uSignalInstabilitySeed * 31.0
      )
    ) -
    0.5;

  float luma = dot(
    color,
    vec3(0.299, 0.587, 0.114)
  );

  float amplitude =
    band *
    (0.08 + staticNoise * 0.26) *
    (1.0 - luma * 0.35);

  vec3 noise = vec3(
    noiseA * 0.9 + stripe * 0.25,
    noiseA * 0.75 + noiseB * 0.25,
    noiseA * 1.05 - stripe * 0.18
  );

  return clamp(
    color + noise * amplitude,
    0.0,
    1.0
  );
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

  vec3 stripeBars = vec3(
    exp(
      -pow(
        (local.x - 1.0 / 6.0) /
        0.15,
        2.0
      )
    ),
    exp(
      -pow(
        (local.x - 0.5) /
        0.15,
        2.0
      )
    ),
    exp(
      -pow(
        (local.x - 5.0 / 6.0) /
        0.15,
        2.0
      )
    )
  );

  vec3 bleedBars = vec3(
    exp(
      -pow(
        (local.x - 1.0 / 6.0) /
        0.21,
        2.0
      )
    ),
    exp(
      -pow(
        (local.x - 0.5) /
        0.21,
        2.0
      )
    ),
    exp(
      -pow(
        (local.x - 5.0 / 6.0) /
        0.21,
        2.0
      )
    )
  );

  float flatBody =
    smoothstep(0.01, 0.1, local.y) *
    (
      1.0 -
      smoothstep(0.9, 0.99, local.y)
    );

  float roundedCaps = exp(
    -pow(
      (local.y - 0.5) /
      0.62,
      2.0
    )
  );

  float verticalShape = clamp(
    flatBody * 0.48 +
    roundedCaps * 0.68,
    0.0,
    1.0
  );

  float softVertical = exp(
    -pow(
      (local.y - 0.5) /
      1.22,
      2.0
    )
  );

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
  ivec2 sourceTextureSize = textureSize(
    uSourceTexture,
    0
  );

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

  vec2 cellMin = (clampedCell - vec2(0.5)) / safeSourceSize;
  vec2 cellSize = 1.0 / safeSourceSize;
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

      float core = exp(
        -(
          dx * dx / (BEAM_CORE_SIGMA_X * BEAM_CORE_SIGMA_X) +
          dy * dy / (BEAM_CORE_SIGMA_Y * BEAM_CORE_SIGMA_Y)
        )
      );

      float horizontalFlare = exp(
        -(
          dx * dx / ((BEAM_FLARE_SIGMA_X * horizontalSpread) * (BEAM_FLARE_SIGMA_X * horizontalSpread)) +
          dy * dy / (BEAM_FLARE_SIGMA_Y * BEAM_FLARE_SIGMA_Y)
        )
      );

      float verticalLeak = exp(
        -(
          dx * dx / (BEAM_LEAK_SIGMA_X * BEAM_LEAK_SIGMA_X) +
          dy * dy / (BEAM_LEAK_SIGMA_Y * BEAM_LEAK_SIGMA_Y)
        )
      );

      float halo = exp(
        -(
          dx * dx / (BEAM_HALO_SIGMA_X * BEAM_HALO_SIGMA_X) +
          dy * dy / (BEAM_HALO_SIGMA_Y * BEAM_HALO_SIGMA_Y)
        )
      );

      float bridge = exp(
        -(
          dx * dx / ((BEAM_BRIDGE_SIGMA_X * horizontalSpread) * (BEAM_BRIDGE_SIGMA_X * horizontalSpread)) +
          dy * dy / (BEAM_BRIDGE_SIGMA_Y * BEAM_BRIDGE_SIGMA_Y)
        )
      );

      float broadAura = exp(
        -(
          dx * dx / ((BEAM_AURA_SIGMA_X * horizontalSpread) * (BEAM_AURA_SIGMA_X * horizontalSpread)) +
          dy * dy / (BEAM_AURA_SIGMA_Y * BEAM_AURA_SIGMA_Y)
        )
      );

      float sparkle = exp(
        -(
          dx * dx / (BEAM_SPARKLE_SIGMA_X * BEAM_SPARKLE_SIGMA_X) +
          dy * dy / (BEAM_SPARKLE_SIGMA_Y * BEAM_SPARKLE_SIGMA_Y)
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


/*
 * Soft beam neighborhood
 *
 * A very light 3-tap blend keeps the current single-light look as the base,
 * then lets the surrounding glow connect a little more naturally.
 */
vec3 sampleBeamCrossSoft(vec2 uv, vec2 sourceSize)
{
  vec2 sourceTexel = 1.0 / max(
    sourceSize,
    vec2(1.0)
  );

  vec3 center = applyBeamCross(uv);
  vec3 offsetA = applyBeamCross(
    uv + sourceTexel * vec2(BEAM_SOFT_SAMPLE_OFFSET_X, 0.0)
  );
  vec3 offsetB = applyBeamCross(
    uv + sourceTexel * vec2(-BEAM_SOFT_SAMPLE_OFFSET_X, 0.0)
  );

  return
    center * (
      BEAM_SOFT_CENTER_WEIGHT +
      BEAM_SOFT_VERTICAL_WEIGHT * 2.0
    ) +
    (offsetA + offsetB) * BEAM_SOFT_HORIZONTAL_WEIGHT;
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

  vec2 unstableUv = applySignalInstabilityUv(
    curvedUv
  );

  vec2 targetCell = floor(
    unstableUv *
    targetSize
  );

  vec2 pixelatedUv = clamp(
    (targetCell + 0.5) /
    targetSize,
    vec2(0.0),
    vec2(1.0)
  );

  vec2 sourceCoord =
    unstableUv *
    sourceSize;

  /*
   * Single Beam evaluation.
   *
   * The previous implementation evaluated this five times.
   */
  vec3 beamColor = mix(
    applyBeamCross(unstableUv),
    sampleBeamCrossSoft(
      unstableUv,
      sourceSize
    ),
    BEAM_SOFT_BLEND
  );

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
    unstableUv,
    sourceSize,
    stripeMask,
    stripeBleedMask
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

  float scanline = sin(
    pixelatedUv.y *
    targetSize.y *
    PI
  );

  float scanlineMask =
    (scanline * 0.5 + 0.5) *
    max(uScanlineStrength, 0.0) *
    visibility *
    0.04;

  finalBeamColor *=
    1.0 -
    clamp(scanlineMask, 0.0, 1.0);

  float scanline2 =
    sin(
      (
        vTextureCoord.y +
        uTime * 0.05
      ) *
      720.0
    ) *
    uScanline2Strength *
    visibility;

  finalBeamColor += vec3(scanline2);

  finalBeamColor = applySignalChromaInstability(
    finalBeamColor,
    pixelatedUv
  );

  finalBeamColor = applySignalStaticNoise(
    finalBeamColor,
    unstableUv
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
