export const FILTER_FRAGMENT_PASS2_BEAM_LITE_COMPOSITE = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uSourceTexture;
uniform sampler2D uBeamKernelTexture;
uniform vec2 uTargetSize;
uniform vec2 uOutputSize;
uniform vec2 uDisplaySize;
uniform vec2 uBeamSourceSize;
uniform float uSamplingMode;
uniform float uRgbConvergenceOffset;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;
uniform float uVignetteStrength;
uniform float uOutputBrightness;
uniform float uBasicContrast;
uniform float uBasicSaturation;
uniform float uBeamStripeStrength;
uniform float uBeamWhiteBloom;
uniform float uBeamWarmBloom;
uniform float uScreenFaceGlow;
uniform float uTime;

const float PI = 3.141592653589793;
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

vec2 curveUv(vec2 uv, float strength) {
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

float getBeamStripeStrength() { return clamp(uBeamStripeStrength, 0.0, 2.0); }
float getBeamWhiteBloom() { return clamp(uBeamWhiteBloom, 0.0, 2.0); }
float getBeamWarmBloom() { return clamp(uBeamWarmBloom, 0.0, 1.5); }
float getScreenFaceGlow() { return clamp(uScreenFaceGlow, 0.0, 0.5); }

vec3 applyBasicColorControls(vec3 color) {
  float saturation = max(uBasicSaturation, 0.0);
  float contrast = max(uBasicContrast, 0.0);
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 saturated = mix(vec3(luma), color, saturation);
  vec3 contrasted = (saturated - 0.5) * contrast + 0.5;
  return clamp(contrasted, 0.0, 1.0);
}

vec3 applyScreenFaceGlow(vec3 color) {
  float amount = getScreenFaceGlow();
  if (amount <= 0.001) return color;
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

void sampleBeamStripeMasks(vec2 uv, vec2 sourceSize, out vec3 stripeMask, out vec3 bleedMask) {
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

float getBeamStripeResolve(vec2 sourceSize) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 visibleSize = max(uDisplaySize, vec2(1.0));
  float pixelsPerCellX = visibleSize.x / safeSourceSize.x;
  float pixelsPerCellY = visibleSize.y / safeSourceSize.y;
  float subpixelPixels = min(pixelsPerCellX / 3.0, pixelsPerCellY);
  return clamp(smoothstep(1.0, 1.45, subpixelPixels), 0.0, 1.0);
}

void main(void) {
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  vec2 targetSize = max(uTargetSize, vec2(1.0));
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 targetCell = floor(curvedUv * targetSize);
  vec2 pixelatedUv = clamp((targetCell + 0.5) / targetSize, vec2(0.0), vec2(1.0));
  vec2 sourceCoord = curvedUv * sourceSize;
  vec4 beamKernel = texture(uBeamKernelTexture, vTextureCoord);
  vec3 beamColor = beamKernel.rgb;
  float beamLuma = beamKernel.a;
  vec3 sourceDetailColor = mix(sampleEmitterColor(sourceCoord, sourceSize), sampleEmitterColorSmooth(sourceCoord, sourceSize), BEAM_SOURCE_DETAIL_SMOOTH_BLEND);
  float sourceDetailLuma = max(max(sourceDetailColor.r, sourceDetailColor.g), sourceDetailColor.b);
  vec3 stripeMask;
  vec3 stripeBleedMask;
  sampleBeamStripeMasks(curvedUv, sourceSize, stripeMask, stripeBleedMask);
  float stripeResolve = getBeamStripeResolve(sourceSize);
  float mergedStripeMaskScalar = dot(stripeMask, vec3(1.0 / 3.0));
  float mergedBleedMaskScalar = dot(stripeBleedMask, vec3(1.0 / 3.0));
  stripeMask = mix(vec3(mergedStripeMaskScalar), stripeMask, stripeResolve);
  stripeBleedMask = mix(vec3(mergedBleedMaskScalar), stripeBleedMask, stripeResolve);
  float effectiveStripeStrength = getBeamStripeStrength() * mix(0.42, 1.0, stripeResolve);
  float lightMask = smoothstep(BEAM_LIGHTMASK_LOW, BEAM_LIGHTMASK_HIGH, beamLuma);
  vec3 beamField = beamColor * (BEAM_FIELD_BASE + lightMask * BEAM_FIELD_LIGHT_GAIN);
  vec3 stripeGlow = stripeMask * beamColor * (BEAM_STRIPE_GLOW_BASE + lightMask * BEAM_STRIPE_GLOW_LIGHT_GAIN) * effectiveStripeStrength;
  vec3 stripeBleed = stripeBleedMask * beamColor * (BEAM_STRIPE_BLEED_BASE + lightMask * BEAM_STRIPE_BLEED_LIGHT_GAIN) * effectiveStripeStrength;
  vec3 mergedFlare = beamColor * beamLuma * (BEAM_MERGED_FLARE_BASE + lightMask * BEAM_MERGED_FLARE_LIGHT_GAIN);
  vec3 whiteBloom = vec3(beamLuma) * lightMask * BEAM_WHITE_BLOOM_GAIN * getBeamWhiteBloom();
  vec3 warmBloom = vec3(1.0, 0.82, 0.30) * beamLuma * lightMask * BEAM_WHITE_BLOOM_GAIN * 0.55 * getBeamWhiteBloom() * getBeamWarmBloom();
  vec3 sourceDetail = sourceDetailColor * smoothstep(0.03, 0.22, sourceDetailLuma) * (BEAM_SOURCE_DETAIL_BASE + lightMask * BEAM_SOURCE_DETAIL_LIGHT_GAIN);
  vec3 finalBeamColor = beamField + stripeGlow + stripeBleed + mergedFlare + whiteBloom + warmBloom + sourceDetail;
  float brightness = max(max(finalBeamColor.r, finalBeamColor.g), finalBeamColor.b);
  float visibility = mix(1.0, 1.0 - clamp(brightness, 0.0, 1.0), clamp(uScanlineBrightnessFade, 0.0, 1.0));
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
  finalColor = vec4(clamp(finalBeamColor * max(uOutputBrightness, 0.0), 0.0, 1.0), 1.0);
}
`;
