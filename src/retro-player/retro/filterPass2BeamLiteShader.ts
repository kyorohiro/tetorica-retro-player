export const FILTER_FRAGMENT_PASS2_BEAM_LITE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uPass1Texture;
uniform sampler2D uSourceTexture;
uniform vec2 uTargetSize;
uniform vec2 uBeamSourceSize;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;
uniform float uVignetteStrength;
uniform float uOutputBrightness;
uniform float uBasicContrast;
uniform float uBasicSaturation;
uniform float uSignalInstabilityAmount;
uniform float uSignalHorizontalSync;
uniform float uSignalVerticalSync;
uniform float uSignalStaticNoise;
uniform float uSignalChromaNoise;
uniform float uSignalInstabilitySeed;
uniform float uSignalInstabilityPhase;
uniform float uFocusStrength;
uniform vec2 uFocusSize;
uniform vec2 uFocusCenter;
uniform float uTime;

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

float hash13(vec3 p3)
{
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float signalBandMask(vec2 uv)
{
  float amount = max(uSignalStaticNoise, max(uSignalHorizontalSync * 0.35, uSignalVerticalSync * 0.2));
  if (amount <= 0.001) {
    return 0.0;
  }

  float phase = floor(uSignalInstabilityPhase);
  float center = fract(uSignalInstabilitySeed * 0.173 + phase * 0.137 + 0.11);
  float thickness =
    mix(0.004, 0.065, hash13(vec3(uSignalInstabilitySeed, phase, 5.0))) *
    (0.4 + amount * 0.6);
  float dy = abs(uv.y - center);
  dy = min(dy, 1.0 - dy);
  return (1.0 - smoothstep(thickness * 0.45, thickness, dy)) * amount;
}

vec2 applySignalInstabilityUv(vec2 uv)
{
  if (uSignalInstabilityAmount <= 0.001) {
    return uv;
  }

  float phase = floor(uSignalInstabilityPhase);
  float lineSpan = 1.0 + floor(mix(0.0, 6.0, 1.0 - min(uSignalHorizontalSync, 1.0)));
  float lineIndex = floor((uv.y * uTargetSize.y) / lineSpan);
  float lineNoise = hash13(vec3(lineIndex + uSignalInstabilitySeed * 37.0, phase, 1.0));
  float lineActive = smoothstep(0.72, 0.985, lineNoise);
  float lineStrength = hash13(vec3(lineIndex + uSignalInstabilitySeed * 53.0, phase, 2.0));
  float direction = hash13(vec3(lineIndex + uSignalInstabilitySeed * 71.0, phase, 3.0)) - 0.5;
  float lineOffsetPixels =
    direction *
    (0.6 + lineStrength * (1.0 + uSignalInstabilityAmount * 7.0)) *
    (0.4 + uSignalHorizontalSync * 2.8);
  float bandOffsetPixels =
    signalBandMask(uv) *
    (hash13(vec3(uSignalInstabilitySeed, phase, 13.0)) - 0.5) *
    (1.0 + uSignalInstabilityAmount * 6.0);

  uv.x += (lineOffsetPixels * lineActive + bandOffsetPixels) / max(uTargetSize.x, 1.0);
  return vec2(clamp(uv.x, 0.0, 1.0), fract(uv.y + 1.0));
}

vec3 applySignalChromaInstability(vec3 color, vec2 sampleUv)
{
  if (uSignalChromaNoise <= 0.001) {
    return color;
  }

  float chromaOffset =
    (0.35 + uSignalInstabilityAmount * 1.8 + uSignalChromaNoise * 1.2) /
    max(uTargetSize.x, 1.0);
  vec3 left = texture(
    uPass1Texture,
    clamp(sampleUv - vec2(chromaOffset, 0.0), vec2(0.0), vec2(1.0))
  ).rgb;
  vec3 right = texture(
    uPass1Texture,
    clamp(sampleUv + vec2(chromaOffset, 0.0), vec2(0.0), vec2(1.0))
  ).rgb;
  vec3 bled = vec3(
    mix(color.r, right.r, 0.22),
    color.g,
    mix(color.b, left.b, 0.18)
  );
  float luma = dot(bled, vec3(0.299, 0.587, 0.114));
  vec3 desaturated = mix(vec3(luma), bled, 1.0 - uSignalChromaNoise * 0.3);
  float hueJitter = (hash13(vec3(uSignalInstabilitySeed, floor(uSignalInstabilityPhase), 21.0)) - 0.5) * uSignalChromaNoise;
  desaturated.r += hueJitter * 0.05;
  desaturated.b -= hueJitter * 0.04;
  return clamp(mix(color, desaturated, min(0.75, uSignalChromaNoise)), 0.0, 1.0);
}

vec3 applySignalStaticNoise(vec3 color, vec2 uv)
{
  float band = signalBandMask(uv);
  if (band <= 0.001) {
    return color;
  }

  float phase = floor(uSignalInstabilityPhase);
  vec2 coarse = floor(gl_FragCoord.xy * vec2(1.0, 0.35));
  float noiseA = hash13(vec3(coarse.x + 13.0, coarse.y + 7.0, phase + uSignalInstabilitySeed * 97.0)) - 0.5;
  float noiseB = hash13(vec3(coarse.x * 0.5 + 41.0, coarse.y + 17.0, phase * 0.7 + uSignalInstabilitySeed * 53.0)) - 0.5;
  float stripe = hash13(vec3(floor(gl_FragCoord.y * 0.5), phase + 3.0, uSignalInstabilitySeed * 31.0)) - 0.5;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float amplitude = band * (0.08 + uSignalStaticNoise * 0.26) * (1.0 - luma * 0.35);
  vec3 noise = vec3(
    noiseA * 0.9 + stripe * 0.25,
    noiseA * 0.75 + noiseB * 0.25,
    noiseA * 1.05 - stripe * 0.18
  );
  return clamp(color + noise * amplitude, 0.0, 1.0);
}

const float FOCUS_GOLDEN_ANGLE = 2.39996323;

vec3 sampleFocusBlur(vec2 uv, float blurRadius)
{
  vec2 texel = 1.0 / vec2(textureSize(uPass1Texture, 0));
  vec3 accum = texture(uPass1Texture, uv).rgb * 0.18;
  float totalWeight = 0.18;
  for (int i = 0; i < 24; i++) {
    float t = (float(i) + 0.5) / 24.0;
    float r = sqrt(t) * blurRadius;
    float angle = float(i) * FOCUS_GOLDEN_ANGLE;
    vec2 offset = vec2(cos(angle), sin(angle)) * texel * r;
    float weight = 1.0 - t * 0.72;
    accum += texture(uPass1Texture, clamp(uv + offset, vec2(0.0), vec2(1.0))).rgb * weight;
    totalWeight += weight;
  }
  return accum / max(totalWeight, 0.0001);
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

vec3 sampleBeamStripeMask(vec2 uv, vec2 sourceSize)
{
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 cellCoord = uv * safeSourceSize;
  float stripeCoordX = cellCoord.x * 3.0;
  float cellIndex = floor(cellCoord.x);
  float staggerShift = mod(cellIndex, 2.0) * 0.28;
  vec2 local = fract(vec2(stripeCoordX, cellCoord.y + staggerShift));

  float redBar = exp(-pow((local.x - (1.0 / 6.0)) / 0.15, 2.0));
  float greenBar = exp(-pow((local.x - 0.5) / 0.15, 2.0));
  float blueBar = exp(-pow((local.x - (5.0 / 6.0)) / 0.15, 2.0));

  float flatBody =
    smoothstep(0.01, 0.1, local.y) *
    (1.0 - smoothstep(0.9, 0.99, local.y));
  float roundedCaps = exp(-pow((local.y - 0.5) / 0.62, 2.0));
  float verticalShape = clamp(flatBody * 0.48 + roundedCaps * 0.68, 0.0, 1.0);

  return clamp(vec3(redBar, greenBar, blueBar) * verticalShape, 0.0, 1.0);
}

vec3 sampleBeamStripeBleedMask(vec2 uv, vec2 sourceSize)
{
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 cellCoord = uv * safeSourceSize;
  float stripeCoordX = cellCoord.x * 3.0;
  float cellIndex = floor(cellCoord.x);
  float staggerShift = mod(cellIndex, 2.0) * 0.28;
  vec2 local = fract(vec2(stripeCoordX, cellCoord.y + staggerShift));

  float redBar = exp(-pow((local.x - (1.0 / 6.0)) / 0.21, 2.0));
  float greenBar = exp(-pow((local.x - 0.5) / 0.21, 2.0));
  float blueBar = exp(-pow((local.x - (5.0 / 6.0)) / 0.21, 2.0));
  float softVertical = exp(-pow((local.y - 0.5) / 1.22, 2.0));

  return clamp(vec3(redBar, greenBar, blueBar) * softVertical, 0.0, 1.0);
}

vec3 sampleEmitterColor(vec2 emitterCell, vec2 sourceSize)
{
  ivec2 sourceTexSize = textureSize(uSourceTexture, 0);
  vec2 clampedCell = clamp(floor(emitterCell), vec2(0.0), sourceSize - vec2(1.0));
  ivec2 pixel = ivec2(clampedCell);
  pixel = clamp(pixel, ivec2(0), sourceTexSize - ivec2(1));
  return texelFetch(uSourceTexture, pixel, 0).rgb;
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

vec3 applyBeamCross(vec2 gridUv, vec2 targetSize)
{
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 sourceCoord = gridUv * sourceSize;
  vec2 sourceCenter = floor(sourceCoord) + vec2(0.5);
  vec3 accumulatedStreak = vec3(0.0);
  float accumulatedHighlight = 0.0;
  float accumulatedEnergy = 0.0;

  for (int sy = -1; sy <= 1; sy++) {
    for (int sx = -2; sx <= 2; sx++) {
      vec2 emitterCell = sourceCenter + vec2(float(sx), float(sy));
      vec3 sampleColor = sampleEmitterColorSmooth(emitterCell, sourceSize);
      float sampleBrightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
      float sampleGate = smoothstep(0.0, 0.03, sampleBrightness);

      vec2 delta = sourceCoord - emitterCell;
      float dx = delta.x;
      float dy = delta.y;
      float core =
        exp(
          -(
            (dx * dx) / (0.26 * 0.26) +
            (dy * dy) / (0.24 * 0.24)
          )
        );
      float horizontalFlare =
        exp(
          -(
            (dx * dx) / (1.35 * 1.35) +
            (dy * dy) / (0.3 * 0.3)
          )
        );
      float verticalLeak =
        exp(
          -(
            (dx * dx) / (0.34 * 0.34) +
            (dy * dy) / (0.88 * 0.88)
          )
        );
      float halo =
        exp(
          -(
            (dx * dx) / (1.58 * 1.58) +
            (dy * dy) / (1.08 * 1.08)
          )
        );
      float bridge =
        exp(
          -(
            (dx * dx) / (0.72 * 0.72) +
            (dy * dy) / (0.52 * 0.52)
          )
        );
      float broadAura =
        exp(
          -(
            (dx * dx) / (1.95 * 1.95) +
            (dy * dy) / (1.42 * 1.42)
          )
        );
      float sparkle =
        exp(
          -(
            (dx * dx) / (0.14 * 0.14) +
            (dy * dy) / (0.14 * 0.14)
          )
        );
      float extentMask =
        smoothstep(3.5, 2.6, abs(dx)) *
        smoothstep(2.4, 1.55, abs(dy));
      float kernel = sampleGate * extentMask * (
        core * 0.82 +
        horizontalFlare * 0.48 +
        verticalLeak * 0.18 +
        halo * 0.24 +
        bridge * 0.42 +
        broadAura * 0.1
      );

      accumulatedStreak += sampleColor * kernel;
      accumulatedHighlight += sampleBrightness * sparkle * sampleGate;
      accumulatedEnergy += sampleBrightness * kernel;
    }
  }

  if (accumulatedEnergy <= 0.0001) {
    return vec3(0.0);
  }

  vec3 beamTint = accumulatedStreak / max(accumulatedEnergy, 0.0001);
  vec3 beamBase = accumulatedStreak / (vec3(1.0) + accumulatedStreak * 0.74);
  float luminance = max(max(beamBase.r, beamBase.g), beamBase.b);
  float floorMask = smoothstep(0.02, 0.18, accumulatedEnergy);
  vec3 softField = beamTint * accumulatedEnergy * 0.07 * floorMask;
  float highlightMask = smoothstep(0.025, 0.11, accumulatedHighlight + luminance * 0.68);
  vec3 coloredHalo = beamBase * (0.38 + highlightMask * 0.08) + softField;
  vec3 whiteCore = vec3(1.0) * highlightMask * (0.08 + luminance * 0.2);
  return coloredHalo + whiteCore;
}

vec3 sampleBeamCrossFiltered(vec2 uv, vec2 targetSize, vec2 sourceSize)
{
  vec2 sourceTexel = 1.0 / max(sourceSize, vec2(1.0));
  vec3 center = applyBeamCross(uv, targetSize);
  vec3 offsetA = applyBeamCross(uv + sourceTexel * vec2(0.22, 0.0), targetSize);
  vec3 offsetB = applyBeamCross(uv + sourceTexel * vec2(-0.22, 0.0), targetSize);
  vec3 offsetC = applyBeamCross(uv + sourceTexel * vec2(0.0, 0.22), targetSize);
  vec3 offsetD = applyBeamCross(uv + sourceTexel * vec2(0.0, -0.22), targetSize);
  return center * 0.52 + (offsetA + offsetB + offsetC + offsetD) * 0.12;
}

void main(void)
{
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 unstableUv = applySignalInstabilityUv(curvedUv);
  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec2 sourceCoord = unstableUv * sourceSize;
  vec2 cell = floor(unstableUv * uTargetSize);
  vec2 pixelatedUv = clamp((cell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
  vec4 color = texture(uPass1Texture, pixelatedUv);
  if (uFocusStrength > 0.001) {
    vec2 focusScale = max(uFocusSize, vec2(0.001));
    float focusDist = length((vMaskCoord - uFocusCenter) / focusScale);
    float blurMask = smoothstep(1.0, 2.15, focusDist);
    float blurAmt = pow(blurMask, 1.35);
    if (blurAmt > 0.001) {
      float blurRadius = (2.0 + uFocusStrength * 38.0) * blurAmt;
      vec3 blurredColor = sampleFocusBlur(unstableUv, blurRadius);
      float blendFactor = clamp(blurAmt * (0.6 + uFocusStrength * 0.4), 0.0, 1.0);
      color.rgb = mix(color.rgb, blurredColor, blendFactor);
    }
  }

  vec3 beamColor = sampleBeamCrossFiltered(unstableUv, uTargetSize, sourceSize);
  vec3 sourceDetailColor = sampleEmitterColorSmooth(sourceCoord, sourceSize);
  float sourceDetailLuma = max(
    max(sourceDetailColor.r, sourceDetailColor.g),
    sourceDetailColor.b
  );
  float beamLuma = max(max(beamColor.r, beamColor.g), beamColor.b);
  vec3 stripeMask = sampleBeamStripeMask(unstableUv, sourceSize);
  vec3 stripeBleedMask = sampleBeamStripeBleedMask(unstableUv, sourceSize);
  float lightMask = smoothstep(0.02, 0.22, beamLuma);
  vec3 beamField = beamColor * (0.1 + lightMask * 0.04);
  vec3 stripeGlow = stripeMask * beamColor * (0.12 + lightMask * 0.24);
  vec3 stripeBleed = stripeBleedMask * beamColor * (0.14 + lightMask * 0.18);
  vec3 mergedFlare = beamColor * beamLuma * (0.16 + lightMask * 0.22);
  vec3 whiteBloom = vec3(beamLuma) * lightMask * 0.28;
  vec3 smoothSourceDetail =
    sourceDetailColor *
    smoothstep(0.03, 0.22, sourceDetailLuma) *
    (0.02 + lightMask * 0.015);
  vec3 finalBeamColor =
    beamField +
    stripeGlow +
    stripeBleed +
    mergedFlare +
    whiteBloom +
    smoothSourceDetail;
  float brightness = max(max(finalBeamColor.r, finalBeamColor.g), finalBeamColor.b);
  float visibility = mix(1.0, 1.0 - brightness, uScanlineBrightnessFade);
  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  float scanlineMask = (scanline * 0.5 + 0.5) * uScanlineStrength * visibility * 0.06;
  finalBeamColor *= 1.0 - scanlineMask;

  float scanline2 =
    sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
    uScanline2Strength *
    visibility;
  finalBeamColor += vec3(scanline2);

  finalBeamColor = applySignalChromaInstability(finalBeamColor, pixelatedUv);
  finalBeamColor = applySignalStaticNoise(finalBeamColor, unstableUv);

  float vignette = distance(vMaskCoord, vec2(0.5));
  finalBeamColor *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;
  finalBeamColor = applyBasicColorControls(finalBeamColor);

  finalColor = vec4(clamp(finalBeamColor * uOutputBrightness, 0.0, 1.0), 1.0);
}
`;
