export const FILTER_FRAGMENT_PASS2_BEAM_LITE_SIMPLE = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
in vec2 vMaskCoord;

out vec4 finalColor;

uniform sampler2D uSourceTexture;

uniform vec2 uTargetSize;
uniform vec2 uBeamSourceSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uHorizontalSharpness;
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

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

vec3 quantizeBeamInputColor(vec3 color)
{
  if (uColorLevels >= 255.5) {
    return color;
  }
  float levels = max(uColorLevels, 2.0);
  return floor(color * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
}

vec3 applyBasicColorControls(vec3 color)
{
  float saturation = max(uBasicSaturation, 0.0);
  float contrast = max(uBasicContrast, 0.0);
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 saturated = mix(vec3(luma), color, saturation);
  vec3 contrasted = (saturated - 0.5) * contrast + 0.5;
  return clamp(contrasted, 0.0, 1.0);
}

float getBeamDarkCutoff()
{
  return clamp(uBeamDarkCutoff, 0.0, 0.15);
}

float getBeamHorizontalSpread()
{
  return clamp(uBeamHorizontalSpread, 0.5, 2.0);
}

float getBeamStripeStrength()
{
  return clamp(uBeamStripeStrength, 0.0, 2.0);
}

float getBeamWhiteBloom()
{
  return clamp(uBeamWhiteBloom, 0.0, 2.0);
}

float getBeamWarmBloom()
{
  return clamp(uBeamWarmBloom, 0.0, 1.5);
}

float getScreenFaceGlow()
{
  return clamp(uScreenFaceGlow, 0.0, 0.5);
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
  float hazeMask = faceGlow * (0.45 + smoothstep(0.02, 0.55, luma) * 0.90);
  vec3 hazeGlow = vec3(0.34, 0.32, 0.29) * hazeMask * amount * 0.72;
  return lifted + hazeGlow;
}

void sampleBeamStripeMasks(
  vec2 uv,
  vec2 sourceSize,
  out vec3 stripeMask,
  out vec3 bleedMask
)
{
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 cellCoord = uv * safeSourceSize;
  float stripeCoordX = cellCoord.x * 3.0;
  float cellIndex = floor(cellCoord.x);
  float staggerShift = mod(cellIndex, 2.0) * 0.28;
  vec2 local = fract(vec2(stripeCoordX, cellCoord.y + staggerShift));

  float stripeR = (local.x - 1.0 / 6.0) / 0.15;
  float stripeG = (local.x - 0.5) / 0.15;
  float stripeB = (local.x - 5.0 / 6.0) / 0.15;
  vec3 stripeBars = exp(-vec3(stripeR * stripeR, stripeG * stripeG, stripeB * stripeB));

  float bleedR = (local.x - 1.0 / 6.0) / 0.21;
  float bleedG = (local.x - 0.5) / 0.21;
  float bleedB = (local.x - 5.0 / 6.0) / 0.21;
  vec3 bleedBars = exp(-vec3(bleedR * bleedR, bleedG * bleedG, bleedB * bleedB));

  float flatBody = smoothstep(0.01, 0.1, local.y) * (1.0 - smoothstep(0.9, 0.99, local.y));
  float roundedCapsCoord = (local.y - 0.5) / 0.62;
  float roundedCaps = exp(-(roundedCapsCoord * roundedCapsCoord));
  float verticalShape = clamp(flatBody * 0.48 + roundedCaps * 0.68, 0.0, 1.0);
  float softVerticalCoord = (local.y - 0.5) / 1.22;
  float softVertical = exp(-(softVerticalCoord * softVerticalCoord));

  stripeMask = clamp(stripeBars * verticalShape, 0.0, 1.0);
  bleedMask = clamp(bleedBars * softVertical, 0.0, 1.0);
}

vec3 sampleEmitterColor(vec2 emitterCell, vec2 sourceSize)
{
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 maximumCell = max(safeSourceSize - vec2(1.0), vec2(0.0));
  vec2 clampedCell = clamp(emitterCell, vec2(0.0), maximumCell);
  vec2 sampleUv = (clampedCell + vec2(0.5)) / safeSourceSize;
  ivec2 sourceTextureSize = textureSize(uSourceTexture, 0);
  ivec2 pixel = ivec2(floor(sampleUv * vec2(sourceTextureSize)));
  pixel = clamp(pixel, ivec2(0), max(sourceTextureSize - ivec2(1), ivec2(0)));
  return texelFetch(uSourceTexture, pixel, 0).rgb;
}

vec3 applyBeamInputHorizontalSharpness(vec3 center, vec3 left, vec3 right)
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
  vec2 emitterCell
)
{
  vec3 color = applyBeamInputHorizontalSharpness(center, left, right);
  if (uDitherStrength > 0.001 && uColorLevels < 255.5) {
    float levels = max(uColorLevels, 2.0);
    float dither = (bayer4x4(floor(emitterCell)) - 0.5) * (uDitherStrength / max(levels, 1.0));
    color = clamp(color + dither, 0.0, 1.0);
  }
  return quantizeBeamInputColor(color);
}

vec3 sampleEmitterColorSmooth(vec2 emitterCell, vec2 sourceSize)
{
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

vec3 applyBeamColorRestore(
  vec3 color,
  vec3 sourceDetailColor,
  float lightMask
)
{
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float sourceSaturation = length(
    sourceDetailColor - vec3(dot(sourceDetailColor, vec3(0.299, 0.587, 0.114)))
  );
  float beamSaturation = length(color - vec3(luma));
  float saturationGain =
    1.0 +
    clamp(0.14 + lightMask * 0.26, 0.0, 0.7) *
    clamp(sourceSaturation * 2.2, 0.0, 1.0);
  vec3 saturatedColor = mix(vec3(luma), color, saturationGain);
  float beamColorMask = smoothstep(0.015, 0.18, beamSaturation);
  vec3 contrasted = (mix(color, saturatedColor, beamColorMask) - 0.5) * 1.12 + 0.5;
  return clamp(contrasted, 0.0, 1.0);
}

vec3 applyBeamCross(vec2 gridUv)
{
  float horizontalSpread = getBeamHorizontalSpread();
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 sourceCoord = gridUv * sourceSize;
  vec2 sourceCenter = floor(sourceCoord) + vec2(0.5);

  vec3 accumulatedStreak = vec3(0.0);
  float accumulatedHighlight = 0.0;
  float accumulatedEnergy = 0.0;
  bool needsHorizontalNeighbors = abs(uHorizontalSharpness - 1.0) > 0.0001;

  for (int sy = -1; sy <= 1; sy++) {
    for (int sx = -2; sx <= 2; sx++) {
      vec2 emitterCell = sourceCenter + vec2(float(sx), float(sy));
      vec3 centerSample = sampleEmitterColor(emitterCell, sourceSize);
      vec3 leftSample = needsHorizontalNeighbors
        ? sampleEmitterColor(emitterCell + vec2(-1.0, 0.0), sourceSize)
        : centerSample;
      vec3 rightSample = needsHorizontalNeighbors
        ? sampleEmitterColor(emitterCell + vec2(1.0, 0.0), sourceSize)
        : centerSample;
      vec3 sampleColor = applyBeamInputPostProcess(
        centerSample,
        leftSample,
        rightSample,
        emitterCell
      );

      float sampleBrightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
      float sampleGate = smoothstep(0.0, getBeamDarkCutoff(), sampleBrightness);

      vec2 delta = sourceCoord - emitterCell;
      float dx = delta.x;
      float dy = delta.y;
      float dx2 = dx * dx;
      float dy2 = dy * dy;

      float coreSigmaX2 = 0.26 * 0.26;
      float coreSigmaY2 = 0.24 * 0.24;
      float flareSigmaX = 1.35 * horizontalSpread;
      float flareSigmaX2 = flareSigmaX * flareSigmaX;
      float flareSigmaY2 = 0.30 * 0.30;
      float leakSigmaX2 = 0.34 * 0.34;
      float leakSigmaY2 = 0.88 * 0.88;
      float haloSigmaX2 = 1.58 * 1.58;
      float haloSigmaY2 = 1.08 * 1.08;
      float bridgeSigmaX = 0.72 * horizontalSpread;
      float bridgeSigmaX2 = bridgeSigmaX * bridgeSigmaX;
      float bridgeSigmaY2 = 0.52 * 0.52;
      float auraSigmaX = 1.95 * horizontalSpread;
      float auraSigmaX2 = auraSigmaX * auraSigmaX;
      float auraSigmaY2 = 1.42 * 1.42;
      float sparkleSigmaX2 = 0.14 * 0.14;
      float sparkleSigmaY2 = 0.14 * 0.14;

      float core = exp(-(dx2 / coreSigmaX2 + dy2 / coreSigmaY2));
      float horizontalFlare = exp(-(dx2 / flareSigmaX2 + dy2 / flareSigmaY2));
      float verticalLeak = exp(-(dx2 / leakSigmaX2 + dy2 / leakSigmaY2));
      float halo = exp(-(dx2 / haloSigmaX2 + dy2 / haloSigmaY2));
      float bridge = exp(-(dx2 / bridgeSigmaX2 + dy2 / bridgeSigmaY2));
      float broadAura = exp(-(dx2 / auraSigmaX2 + dy2 / auraSigmaY2));
      float sparkle = exp(-(dx2 / sparkleSigmaX2 + dy2 / sparkleSigmaY2));

      float extentMask =
        smoothstep(3.5, 2.6, abs(dx)) *
        smoothstep(2.4, 1.55, abs(dy));

      float kernel =
        sampleGate *
        extentMask *
        (
          core * 0.82 +
          horizontalFlare * 0.48 +
          verticalLeak * 0.16 +
          halo * 0.21 +
          bridge * 0.39 +
          broadAura * 0.08
        );

      accumulatedStreak += sampleColor * kernel;
      accumulatedHighlight += sampleBrightness * sparkle * sampleGate;
      accumulatedEnergy += sampleBrightness * kernel;
    }
  }

  if (accumulatedEnergy <= 0.0001) {
    return vec3(0.0);
  }

  vec3 beamTint = accumulatedStreak / accumulatedEnergy;
  vec3 beamBase = accumulatedStreak / (vec3(1.0) + accumulatedStreak * 0.74);
  float luminance = max(max(beamBase.r, beamBase.g), beamBase.b);
  float floorMask = smoothstep(0.02, 0.18, accumulatedEnergy);
  vec3 softField = beamTint * accumulatedEnergy * 0.06 * floorMask;
  float highlightMask = smoothstep(0.025, 0.11, accumulatedHighlight + luminance * 0.64);
  vec3 coloredHalo = beamBase * (0.34 + highlightMask * 0.07) + softField;
  vec3 whiteCore = vec3(1.0) * highlightMask * (0.065 + luminance * 0.17) * getBeamWhiteBloom();
  return coloredHalo + whiteCore;
}

void main(void)
{
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (
    curvedUv.x < 0.0 ||
    curvedUv.x > 1.0 ||
    curvedUv.y < 0.0 ||
    curvedUv.y > 1.0
  ) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 targetSize = max(uTargetSize, vec2(1.0));
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 targetCell = floor(curvedUv * targetSize);
  vec2 pixelatedUv = clamp((targetCell + 0.5) / targetSize, vec2(0.0), vec2(1.0));
  vec2 sourceCoord = curvedUv * sourceSize;

  vec3 beamColor = applyBeamCross(curvedUv);
  vec3 sourceDetailColor = mix(
    sampleEmitterColor(sourceCoord, sourceSize),
    sampleEmitterColorSmooth(sourceCoord, sourceSize),
    0.36
  );

  float sourceDetailLuma = max(max(sourceDetailColor.r, sourceDetailColor.g), sourceDetailColor.b);
  float beamLuma = max(max(beamColor.r, beamColor.g), beamColor.b);

  vec3 stripeMask;
  vec3 stripeBleedMask;
  sampleBeamStripeMasks(curvedUv, sourceSize, stripeMask, stripeBleedMask);

  float lightMask = smoothstep(0.025, 0.23, beamLuma);
  vec3 beamField = beamColor * (0.095 + lightMask * 0.04);
  vec3 stripeGlow = stripeMask * beamColor * (0.08 + lightMask * 0.18) * getBeamStripeStrength();
  vec3 stripeBleed = stripeBleedMask * beamColor * (0.10 + lightMask * 0.14) * getBeamStripeStrength();
  vec3 mergedFlare = beamColor * beamLuma * (0.14 + lightMask * 0.19);
  vec3 whiteBloom = vec3(beamLuma) * lightMask * 0.15 * getBeamWhiteBloom();
  vec3 warmBloom =
    vec3(1.0, 0.82, 0.30) *
    beamLuma *
    lightMask *
    0.15 *
    0.55 *
    getBeamWhiteBloom() *
    getBeamWarmBloom();
  vec3 sourceDetail =
    sourceDetailColor *
    smoothstep(0.03, 0.22, sourceDetailLuma) *
    (0.018 + lightMask * 0.013);

  vec3 finalBeamColor =
    beamField +
    stripeGlow +
    stripeBleed +
    mergedFlare +
    whiteBloom +
    warmBloom +
    sourceDetail;

  float brightness = max(max(finalBeamColor.r, finalBeamColor.g), finalBeamColor.b);
  float brightnessFade = clamp(uScanlineBrightnessFade, 0.0, 1.0);
  float visibility = mix(1.0, 1.0 - clamp(brightness, 0.0, 1.0), brightnessFade);

  float scanline = sin(pixelatedUv.y * targetSize.y * PI);
  float scanlineMask = (scanline * 0.5 + 0.5) * max(uScanlineStrength, 0.0) * visibility * 0.04;
  finalBeamColor *= 1.0 - clamp(scanlineMask, 0.0, 1.0);

  float scanline2 = sin((vTextureCoord.y + uTime * 0.05) * 720.0) * uScanline2Strength * visibility;
  finalBeamColor += vec3(scanline2);
  finalBeamColor = applyScreenFaceGlow(finalBeamColor);

  float vignette = distance(vMaskCoord, vec2(0.5));
  float vignetteAmount = smoothstep(0.2, 0.78, vignette) * clamp(uVignetteStrength, 0.0, 1.0);
  finalBeamColor *= 1.0 - vignetteAmount;
  finalBeamColor = applyBeamColorRestore(finalBeamColor, sourceDetailColor, lightMask);
  finalBeamColor = applyBasicColorControls(finalBeamColor);
  finalBeamColor = applyScreenFaceGlow(finalBeamColor);

  finalColor = vec4(
    clamp(finalBeamColor * max(uOutputBrightness, 0.0), 0.0, 1.0),
    1.0
  );
}
`;
