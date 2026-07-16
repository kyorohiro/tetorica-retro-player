export const FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uPass1Texture;
uniform vec2 uTargetSize;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;
uniform float uVignetteStrength;
uniform float uPhosphorStrength;
uniform float uSpotMaskStrength;
uniform float uBulbRadius;
uniform float uBlackFloor;
uniform float uFocusStrength;
uniform vec2 uFocusSize;
uniform vec2 uFocusCenter;
uniform float uGlowStrength;
uniform float uTime;
uniform float uPhosphorDotLightBalance;
uniform float uOutputBrightness;
uniform float uPixelAspect;
uniform float uPhosphorDotMode;
uniform float uPhosphorDotShape;
uniform float uPhosphorDotInternalScale;
uniform float uPhosphorDotBrightCore;
uniform float uPhosphorDotCellFill;
uniform float uPhosphorDotFlatDisc;
uniform float uPhosphorDotNeighborBlend;
uniform float uPhosphorDotGrainStrength;
uniform float uSignalInstabilityAmount;
uniform float uSignalHorizontalSync;
uniform float uSignalVerticalSync;
uniform float uSignalStaticNoise;
uniform float uSignalChromaNoise;
uniform float uSignalInstabilitySeed;
uniform float uSignalInstabilityPhase;

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

float hash12(vec2 p)
{
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
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

vec3 applySpotMask(vec3 color, vec2 curvedUv, vec2 targetSize, float amount)
{
  if (amount <= 0.0) return color;
  float brightness = max(max(color.r, color.g), color.b);
  vec2 cellUv = fract(curvedUv * targetSize) - 0.5;
  float dist = length(cellUv);
  float bulb = 1.0 - smoothstep(uBulbRadius * 0.25, uBulbRadius * 0.95 + 0.02, dist);
  float halo = 1.0 - smoothstep(uBulbRadius * 0.55, uBulbRadius * 1.2 + 0.08, dist);
  float emission = bulb * (0.75 + brightness * 0.35) + halo * halo * (0.04 + brightness * 0.08);
  vec3 masked = color * emission * amount;
  masked += color * (uBlackFloor * amount * (1.0 - bulb));
  return masked;
}

vec3 applyPhosphorDot(vec3 color, vec2 gridUv, vec2 targetSize, float amount)
{
  if (amount <= 0.0) {
    return color;
  }

  float brightness = max(max(color.r, color.g), color.b);
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float minChannel = min(min(color.r, color.g), color.b);
  float saturation = brightness - minChannel;
  float chromaLift = smoothstep(0.04, 0.28, saturation) * smoothstep(0.0, 0.22, brightness);
  float lightLevel = clamp(uPhosphorDotLightBalance, 0.0, 2.0);
  float perceivedLight = max(luminance, brightness * 0.72 + chromaLift * 0.12);
  vec2 cellIndex = floor(gridUv * targetSize);
  float cellJitter = hash12(cellIndex + vec2(17.0, 43.0)) - 0.5;
  vec2 cellUv = fract(gridUv * targetSize) - 0.5;
  float pixelAspect = clamp(uPixelAspect, 0.5, 2.0);
  float aspectCompensation = sqrt(pixelAspect);
  vec2 dotUv = pixelAspect >= 1.0
    ? vec2(cellUv.x, cellUv.y * aspectCompensation)
    : vec2(cellUv.x / aspectCompensation, cellUv.y);
  float dist = length(dotUv);
  float lit = smoothstep(0.01, 0.28, perceivedLight);
  float gate = smoothstep(0.0, 0.12, perceivedLight);
  float radiusBias = pow(brightness, 0.7);
  float highlightBloom = smoothstep(0.68, 1.0, brightness);
  float cellFillMix = smoothstep(0.2, 0.5, uPhosphorDotCellFill);
  float flatDiscMode = smoothstep(0.5, 1.0, uPhosphorDotFlatDisc);
  bool useBrightCore = uPhosphorDotBrightCore > 0.5;
  float brightCoreMix = (useBrightCore ? 1.0 : 0.0) * (1.0 - cellFillMix) * (1.0 - flatDiscMode);
  float brightCoreCompensation = mix(1.0, 1.2 + brightness * 0.18 + highlightBloom * 0.08, brightCoreMix);
  float brightCoreRadiusBoost = mix(1.0, 1.85 + highlightBloom * 0.35, brightCoreMix);
  float brightCoreHaloBoost = mix(1.0, 2.1 + highlightBloom * 0.45, brightCoreMix);
  float radiusJitter = 1.0 + cellJitter * 0.045;
  float emissionJitter = 1.0 + cellJitter * 0.035;
  float dotRadius = mix(
    uBulbRadius * (useBrightCore ? 0.14 : 0.19),
    uBulbRadius * ((useBrightCore ? 0.64 : 0.82) + highlightBloom * (useBrightCore ? 0.24 : 0.12)),
    radiusBias
  ) * radiusJitter * brightCoreRadiusBoost;
  float innerCoreRadius = dotRadius * (useBrightCore ? mix(0.28, 0.42, brightness) : mix(0.44, 0.58, brightness));
  float haloRadius =
    dotRadius +
    mix(0.028, 0.12 + highlightBloom * 0.08, brightness) * brightCoreHaloBoost;
  bool useHeartShape = uPhosphorDotShape > 0.5;
  if (useHeartShape) {
    vec2 heartUv = dotUv / max(dotRadius, 0.0001);
    heartUv.x *= 1.02;
    heartUv.y = heartUv.y * 1.08 + 0.2;

    vec2 heartCoreUv = dotUv / max(innerCoreRadius, 0.0001);
    heartCoreUv.x *= 1.02;
    heartCoreUv.y = heartCoreUv.y * 1.08 + 0.2;

    vec2 heartHaloUv = dotUv / max(haloRadius, 0.0001);
    heartHaloUv.x *= 1.02;
    heartHaloUv.y = heartHaloUv.y * 1.08 + 0.2;

    float heartField =
      pow(heartUv.x * heartUv.x + heartUv.y * heartUv.y - 0.9, 3.0) -
      heartUv.x * heartUv.x * pow(heartUv.y, 3.0);
    float heartCoreField =
      pow(heartCoreUv.x * heartCoreUv.x + heartCoreUv.y * heartCoreUv.y - 0.9, 3.0) -
      heartCoreUv.x * heartCoreUv.x * pow(heartCoreUv.y, 3.0);
    float heartHaloField =
      pow(heartHaloUv.x * heartHaloUv.x + heartHaloUv.y * heartHaloUv.y - 0.9, 3.0) -
      heartHaloUv.x * heartHaloUv.x * pow(heartHaloUv.y, 3.0);

    float heartEdge = 0.12 + highlightBloom * 0.03;
    float heartRoundMask = 1.0 - smoothstep(1.02, 1.42, length(vec2(heartUv.x, heartUv.y * 0.88)));
    float heartCoreRoundMask = 1.0 - smoothstep(1.0, 1.34, length(vec2(heartCoreUv.x, heartCoreUv.y * 0.88)));
    float heartHaloRoundMask = 1.0 - smoothstep(1.08, 1.56, length(vec2(heartHaloUv.x, heartHaloUv.y * 0.88)));
    float innerCore = 1.0 - smoothstep(-heartEdge * 0.55, heartEdge * 0.55, heartCoreField);
    float bulb = 1.0 - smoothstep(-heartEdge, heartEdge, heartField);
    float flatDisc = 1.0 - smoothstep(-heartEdge * 0.72, heartEdge * 0.72, heartField);
    float halo = 1.0 - smoothstep(-heartEdge * 1.95, heartEdge * 1.95, heartHaloField);
    innerCore *= heartCoreRoundMask;
    bulb *= heartRoundMask;
    flatDisc *= heartRoundMask;
    halo *= heartHaloRoundMask;
    float cavity = mix(1.0, 0.92, smoothstep(0.1, 1.0, brightness));
    float bodyGlow = bulb * mix(
      0.3 + brightness * 0.34,
      0.3 + brightness * 0.34,
      brightCoreMix
    );
    float emission =
      gate *
      lit *
      amount *
      (
        innerCore * mix(
          0.96 + brightness * 0.62 + highlightBloom * 0.18,
          1.52 + brightness * 1.06 + highlightBloom * 0.38,
          brightCoreMix
        ) +
        bodyGlow +
        bulb * cavity * mix(
          0.26 + brightness * 0.3,
          0.28 + brightness * 0.34,
          brightCoreMix
        ) +
        halo * halo * (0.035 + brightness * 0.065 + highlightBloom * 0.1)
      ) *
      brightCoreCompensation *
      emissionJitter;
    float floorLight =
      gate *
      lit *
      amount *
      (uBlackFloor * (0.48 + halo * 0.58)) *
      (1.0 + cellJitter * 0.025);
    float cellFill =
      gate *
      lit *
      amount *
      uPhosphorDotCellFill *
      (0.26 + brightness * 0.22);
    float flatDiscFill =
      gate *
      lit *
      amount *
      flatDisc *
      (0.78 + brightness * 0.18);
    float brightCoreCellClamp = mix(1.0, 0.08, brightCoreMix);
    float brightCoreFloorClamp = mix(1.0, 0.18, brightCoreMix);
    vec3 dotCoreColor = color * emission;
    dotCoreColor += color * mix(cellFill, cellFill * flatDisc * 1.75, cellFillMix) * brightCoreCellClamp;
    vec3 discCoreColor = color * flatDiscFill;
    vec3 dotColor = mix(dotCoreColor, discCoreColor, flatDiscMode);
    dotColor += color * floorLight * brightCoreFloorClamp;
    return dotColor * lightLevel;
  }

  float innerCore = exp(-dist * dist * mix(useBrightCore ? 220.0 : 120.0, useBrightCore ? 110.0 : 72.0, brightness));
  float bulb = 1.0 - smoothstep(dotRadius - 0.014, dotRadius + 0.02, dist);
  float flatDisc = 1.0 - smoothstep(dotRadius - 0.01, dotRadius + 0.012, dist);
  float halo = 1.0 - smoothstep(haloRadius - 0.025, haloRadius + 0.07, dist);
  float rimDarkness = smoothstep(innerCoreRadius * (useBrightCore ? 0.9 : 1.02), dotRadius * 1.05, dist);
  float cavity = 1.0 - rimDarkness * (useBrightCore ? 0.18 : 0.04);
  float bodyGlow = bulb * mix(
    0.28 + brightness * 0.32,
    0.28 + brightness * 0.32,
    brightCoreMix
  );
  float emission =
    gate *
    lit *
    amount *
    (
      innerCore * mix(
        0.9 + brightness * 0.56 + highlightBloom * 0.14,
        1.45 + brightness * 1.02 + highlightBloom * 0.34,
        brightCoreMix
      ) +
      bodyGlow +
      bulb * cavity * mix(
        0.24 + brightness * 0.28,
        0.26 + brightness * 0.32,
        brightCoreMix
      ) +
      halo * halo * (0.03 + brightness * 0.06 + highlightBloom * 0.09)
    ) *
    brightCoreCompensation *
    emissionJitter;
  float floorLight =
    gate *
    lit *
    amount *
    (uBlackFloor * (0.48 + halo * 0.58)) *
    (1.0 + cellJitter * 0.025);
  float cellFill =
    gate *
    lit *
    amount *
    uPhosphorDotCellFill *
    (0.26 + brightness * 0.22);
  float flatDiscFill =
    gate *
    lit *
    amount *
    flatDisc *
    (0.78 + brightness * 0.18);
  float brightCoreCellClamp = mix(1.0, 0.1, brightCoreMix);
  float brightCoreFloorClamp = mix(1.0, 0.22, brightCoreMix);
  vec3 dotCoreColor = color * emission;
  dotCoreColor += color * mix(cellFill, cellFill * flatDisc * 1.75, cellFillMix) * brightCoreCellClamp;
  vec3 discCoreColor = color * flatDiscFill;
  vec3 dotColor = mix(dotCoreColor, discCoreColor, flatDiscMode);
  dotColor += color * floorLight * brightCoreFloorClamp;
  return dotColor * lightLevel;
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

void main(void)
{
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 unstableUv = applySignalInstabilityUv(curvedUv);
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

  if (uPhosphorDotMode > 0.5) {
    vec3 centerColor = color.rgb;

    vec2 rightUv = clamp((cell + vec2(1.0, 0.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
    vec2 leftUv  = clamp((cell + vec2(-1.0, 0.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
    vec2 downUv  = clamp((cell + vec2(0.0, 1.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
    vec2 upUv    = clamp((cell + vec2(0.0, -1.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
    vec3 rightColor = texture(uPass1Texture, rightUv).rgb;
    vec3 leftColor  = texture(uPass1Texture, leftUv).rgb;
    vec3 downColor  = texture(uPass1Texture, downUv).rgb;
    vec3 upColor    = texture(uPass1Texture, upUv).rgb;
    bool useBrightCoreLeak = uPhosphorDotBrightCore > 0.5;

    float flatDiscMode = smoothstep(0.5, 1.0, uPhosphorDotFlatDisc);
    float neighborBlendMix = smoothstep(0.5, 1.0, uPhosphorDotNeighborBlend);
    vec3 neighborMix = (rightColor + leftColor + upColor + downColor) * 0.25;
    float sourceColorDelta = length(centerColor - neighborMix);
    float sourceBlendAmount =
      neighborBlendMix *
      (0.38 + flatDiscMode * 0.16 + smoothstep(0.04, 0.4, sourceColorDelta) * 0.28);
    vec3 mixedSourceColor = mix(centerColor, centerColor * 0.24 + neighborMix * 0.76, sourceBlendAmount);

    vec3 phosphorColor = applyPhosphorDot(mixedSourceColor, unstableUv, uTargetSize, uSpotMaskStrength);
    if (useBrightCoreLeak) {
      phosphorColor *= 0.22;
    }

    // Phosphor moiré is a static per-cell brightness beat against the
    // display's pixel grid. A smooth wobble on a fixed block grid just
    // pulses that same fixed pattern in sync with itself — it doesn't
    // decorrelate anything. Re-rolling each dot's brightness from an
    // independent hash every frame (like film grain / static) actually
    // gives eye persistence a different pattern to average out each frame.
    float ditherFrame = floor(uTime * 20.0);
    float ditherNoise = hash13(vec3(cell, ditherFrame)) - 0.5;
    phosphorColor *= 1.0 + ditherNoise * uPhosphorDotGrainStrength * uSpotMaskStrength;

    float phosphorBrightness = max(max(mixedSourceColor.r, mixedSourceColor.g), mixedSourceColor.b);
    float bleedMask = smoothstep(0.52, 1.0, phosphorBrightness);

    vec3 bleedColor = rightColor * 0.34 + leftColor * 0.34 + downColor * 0.16 + upColor * 0.16;
    phosphorColor += bleedColor * bleedMask * uSpotMaskStrength * (0.06 + phosphorBrightness * 0.1);

    float internalScaleMix = smoothstep(0.5, 1.0, uPhosphorDotInternalScale);
    float pixelAspect = clamp(uPixelAspect, 0.5, 2.0);
    float aspectCompensation = sqrt(pixelAspect);
    vec2 cellUv = fract(unstableUv * uTargetSize) - 0.5;
    vec2 dotUv = pixelAspect >= 1.0
      ? vec2(cellUv.x, cellUv.y * aspectCompensation)
      : vec2(cellUv.x / aspectCompensation, cellUv.y);
    float dist = length(dotUv);
    float highlightBloom = smoothstep(0.68, 1.0, phosphorBrightness);
    if (useBrightCoreLeak) {
      vec2 texel = 1.0 / vec2(textureSize(uPass1Texture, 0));
      float leakRadius = (1.2 + phosphorBrightness * 2.2 + internalScaleMix * 0.8) * max(uBulbRadius, 0.08);
      vec2 leakOffsetX = vec2(texel.x * leakRadius, 0.0);
      vec2 leakOffsetY = vec2(0.0, texel.y * leakRadius);
      vec2 leakOffsetD = vec2(texel.x, texel.y) * leakRadius * 0.82;
      vec3 bloomSample =
        texture(uPass1Texture, clamp(unstableUv + leakOffsetX, vec2(0.0), vec2(1.0))).rgb * 0.18 +
        texture(uPass1Texture, clamp(unstableUv - leakOffsetX, vec2(0.0), vec2(1.0))).rgb * 0.18 +
        texture(uPass1Texture, clamp(unstableUv + leakOffsetY, vec2(0.0), vec2(1.0))).rgb * 0.18 +
        texture(uPass1Texture, clamp(unstableUv - leakOffsetY, vec2(0.0), vec2(1.0))).rgb * 0.18 +
        texture(uPass1Texture, clamp(unstableUv + leakOffsetD, vec2(0.0), vec2(1.0))).rgb * 0.07 +
        texture(uPass1Texture, clamp(unstableUv + vec2(leakOffsetD.x, -leakOffsetD.y), vec2(0.0), vec2(1.0))).rgb * 0.07 +
        texture(uPass1Texture, clamp(unstableUv + vec2(-leakOffsetD.x, leakOffsetD.y), vec2(0.0), vec2(1.0))).rgb * 0.07 +
        texture(uPass1Texture, clamp(unstableUv - leakOffsetD, vec2(0.0), vec2(1.0))).rgb * 0.07;
      float leakStrength =
        uSpotMaskStrength *
        (0.14 + phosphorBrightness * 0.24 + neighborBlendMix * 0.08 + internalScaleMix * 0.1);
      phosphorColor += bloomSample * leakStrength;

      float strongLightLeak = smoothstep(0.72, 1.0, phosphorBrightness) * smoothstep(0.42, 0.92, uBulbRadius);
      float overlapRadius = 1.04 + uBulbRadius * 4.2 + phosphorBrightness * 0.64 + strongLightLeak * 0.22;
      vec2 rightNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x - 1.0, cellUv.y * aspectCompensation)
        : vec2((cellUv.x - 1.0) / aspectCompensation, cellUv.y);
      vec2 leftNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x + 1.0, cellUv.y * aspectCompensation)
        : vec2((cellUv.x + 1.0) / aspectCompensation, cellUv.y);
      vec2 downNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x, (cellUv.y - 1.0) * aspectCompensation)
        : vec2(cellUv.x / aspectCompensation, cellUv.y - 1.0);
      vec2 upNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x, (cellUv.y + 1.0) * aspectCompensation)
        : vec2(cellUv.x / aspectCompensation, cellUv.y + 1.0);
      vec2 downRightNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x - 1.0, (cellUv.y - 1.0) * aspectCompensation)
        : vec2((cellUv.x - 1.0) / aspectCompensation, cellUv.y - 1.0);
      vec2 downLeftNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x + 1.0, (cellUv.y - 1.0) * aspectCompensation)
        : vec2((cellUv.x + 1.0) / aspectCompensation, cellUv.y - 1.0);
      vec2 upRightNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x - 1.0, (cellUv.y + 1.0) * aspectCompensation)
        : vec2((cellUv.x - 1.0) / aspectCompensation, cellUv.y + 1.0);
      vec2 upLeftNeighborUv = pixelAspect >= 1.0
        ? vec2(cellUv.x + 1.0, (cellUv.y + 1.0) * aspectCompensation)
        : vec2((cellUv.x + 1.0) / aspectCompensation, cellUv.y + 1.0);
      float rightNeighborHalo = exp(-pow(length(rightNeighborUv) / overlapRadius, 2.0));
      float leftNeighborHalo = exp(-pow(length(leftNeighborUv) / overlapRadius, 2.0));
      float downNeighborHalo = exp(-pow(length(downNeighborUv) / overlapRadius, 2.0));
      float upNeighborHalo = exp(-pow(length(upNeighborUv) / overlapRadius, 2.0));
      float downRightNeighborHalo = exp(-pow(length(downRightNeighborUv) / overlapRadius, 2.0));
      float downLeftNeighborHalo = exp(-pow(length(downLeftNeighborUv) / overlapRadius, 2.0));
      float upRightNeighborHalo = exp(-pow(length(upRightNeighborUv) / overlapRadius, 2.0));
      float upLeftNeighborHalo = exp(-pow(length(upLeftNeighborUv) / overlapRadius, 2.0));
      vec3 overlapHalo =
        rightColor * rightNeighborHalo +
        leftColor * leftNeighborHalo +
        downColor * downNeighborHalo +
        upColor * upNeighborHalo +
        texture(uPass1Texture, clamp((cell + vec2(1.0, 1.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0))).rgb * downRightNeighborHalo * 0.75 +
        texture(uPass1Texture, clamp((cell + vec2(-1.0, 1.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0))).rgb * downLeftNeighborHalo * 0.75 +
        texture(uPass1Texture, clamp((cell + vec2(1.0, -1.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0))).rgb * upRightNeighborHalo * 0.75 +
        texture(uPass1Texture, clamp((cell + vec2(-1.0, -1.0) + 0.5) / uTargetSize, vec2(0.0), vec2(1.0))).rgb * upLeftNeighborHalo * 0.75;
      phosphorColor += overlapHalo * uSpotMaskStrength * (0.18 + phosphorBrightness * 0.3 + strongLightLeak * 0.08);

      float bulbSpread = smoothstep(0.18, 0.62, uBulbRadius);
      float dotRadius = mix(
        uBulbRadius * 0.14,
        uBulbRadius * (0.64 + smoothstep(0.68, 1.0, phosphorBrightness) * 0.24),
        pow(phosphorBrightness, 0.7)
      );
      vec2 globalCellUv = unstableUv * uTargetSize;
      vec3 emitterLeak = vec3(0.0);
      float emitterWeight = 0.0;
      for (int oy = -1; oy <= 1; oy++) {
        for (int ox = -1; ox <= 1; ox++) {
          vec2 emitterOffset = vec2(float(ox), float(oy));
          vec2 emitterCell = cell + emitterOffset;
          vec2 emitterSampleUv = clamp((emitterCell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
          vec3 emitterColor = texture(uPass1Texture, emitterSampleUv).rgb;
          float emitterBrightness = max(max(emitterColor.r, emitterColor.g), emitterColor.b);
          float emitterRadius =
            0.28 +
            uBulbRadius * 1.62 +
            emitterBrightness * (1.0 + uBulbRadius * 0.78) +
            highlightBloom * 0.24 +
            strongLightLeak * 0.24;
          vec2 emitterUv = globalCellUv - (emitterCell + 0.5);
          emitterUv = pixelAspect >= 1.0
            ? vec2(emitterUv.x, emitterUv.y * aspectCompensation)
            : vec2(emitterUv.x / aspectCompensation, emitterUv.y);
          float emitterDist = length(emitterUv);
          float emitterGlow =
            exp(-pow(emitterDist / max(emitterRadius, 0.0001), 2.0)) *
            (1.0 - smoothstep(emitterRadius * 1.08, emitterRadius * 1.9, emitterDist));
          float axialWeight = (ox == 0 || oy == 0) ? 1.0 : 0.78;
          float weight = emitterGlow * axialWeight * smoothstep(0.16, 1.0, emitterBrightness);
          emitterLeak += emitterColor * weight;
          emitterWeight += weight;
        }
      }
      vec3 circularEmitterLeak = emitterLeak / max(emitterWeight, 0.0001);
      float centerLeakMask =
        1.0 -
        smoothstep(dotRadius * (0.24 + bulbSpread * 0.04), dotRadius * (0.76 + bulbSpread * 0.16) + 0.08, dist);
      vec3 brightCoreBody =
        circularEmitterLeak *
        uSpotMaskStrength *
        (0.72 + phosphorBrightness * 1.02 + uBulbRadius * 0.64 + strongLightLeak * 0.14);
      brightCoreBody += mixedSourceColor * centerLeakMask * (0.28 + phosphorBrightness * 0.32);
      float bubbleField = clamp(emitterWeight * (0.28 + bulbSpread * 0.46 + strongLightLeak * 0.14), 0.0, 1.0);
      phosphorColor = mix(
        phosphorColor,
        max(phosphorColor, brightCoreBody),
        clamp(bubbleField * (0.36 + bulbSpread * 0.34 + strongLightLeak * 0.12), 0.0, 1.0)
      );
    }

    float dotRadius = mix(
      uBulbRadius * (useBrightCoreLeak ? 0.14 : 0.19),
      uBulbRadius * ((useBrightCoreLeak ? 0.64 : 0.82) + highlightBloom * (useBrightCoreLeak ? 0.24 : 0.12)),
      pow(phosphorBrightness, 0.7)
    );
    float edgeWidth = max(fwidth(dist) * mix(1.4, 2.2, flatDiscMode), 0.002);
    float edgeBand = 1.0 - smoothstep(0.0, edgeWidth, abs(dist - dotRadius));
    float colorDelta = length(mixedSourceColor - neighborMix);
    float edgeBlend =
      edgeBand *
      smoothstep(0.04, 0.32, colorDelta) *
      neighborBlendMix *
      (0.14 + phosphorBrightness * 0.18 + flatDiscMode * 0.1);
    phosphorColor = mix(phosphorColor, mix(phosphorColor, neighborMix, 0.7), edgeBlend * (useBrightCoreLeak ? 0.08 : 1.0));

    vec3 fourWayMix = mixedSourceColor * 0.34 + (rightColor + leftColor + upColor + downColor) * 0.165;
    float fourWayAmount = neighborBlendMix * (0.16 + phosphorBrightness * 0.16 + flatDiscMode * 0.08 + internalScaleMix * 0.06);
    phosphorColor = mix(phosphorColor, fourWayMix, fourWayAmount * (useBrightCoreLeak ? 0.04 : 1.0));

    if (uGlowStrength > 0.001) {
      vec3 glowLift = max(centerColor - mixedSourceColor, vec3(0.0));
      phosphorColor += glowLift * (0.3 + bleedMask * 0.25 + phosphorBrightness * 0.15);
    }

    float phosphorScanlineVisibility = mix(1.0, 1.0 - phosphorBrightness, uScanlineBrightnessFade);
    float phosphorScanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
    phosphorColor *= 1.0 - (
      (phosphorScanline * 0.5 + 0.5) *
      (uScanlineStrength * 0.25 + mix(0.035, 0.12, bleedMask)) *
      phosphorScanlineVisibility
    );
    float phosphorScanline2 =
      sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
      uScanline2Strength *
      phosphorScanlineVisibility *
      0.45;
    phosphorColor += vec3(phosphorScanline2);

    float phosphorBaseLift =
      uSpotMaskStrength *
      (0.035 + uPhosphorDotCellFill * 0.22 + phosphorBrightness * 0.04);
    phosphorColor += mixedSourceColor * phosphorBaseLift * (useBrightCoreLeak ? 0.02 : 1.0);
    if (useBrightCoreLeak) {
      phosphorColor += mixedSourceColor * uSpotMaskStrength * (0.008 + phosphorBrightness * 0.02);
    }

    float vignette = distance(vMaskCoord, vec2(0.5));
    phosphorColor *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;
    phosphorColor = applySignalChromaInstability(phosphorColor, pixelatedUv);
    phosphorColor = applySignalStaticNoise(phosphorColor, unstableUv);

    finalColor = vec4(clamp(phosphorColor * uOutputBrightness, 0.0, 1.0), 1.0);
    return;
  }

  float brightness = max(max(color.r, color.g), color.b);
  float visibility = mix(1.0, 1.0 - brightness, uScanlineBrightnessFade);
  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * (uScanlineStrength + uPhosphorStrength * 0.12) * visibility);

  float scanline2 =
    sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
    uScanline2Strength *
    visibility;
  color.rgb += vec3(scanline2);

  if (uPhosphorStrength > 0.001) {
    float phosphorPhase = pixelatedUv.x * uTargetSize.x * 6.2831853;
    vec3 phosphorTriad = vec3(
      sin(phosphorPhase) * 0.5 + 0.5,
      sin(phosphorPhase + 2.0943951) * 0.5 + 0.5,
      sin(phosphorPhase + 4.1887902) * 0.5 + 0.5
    );
    phosphorTriad = mix(vec3(0.5), phosphorTriad, 0.7);
    color.rgb *= mix(vec3(1.0), 0.82 + phosphorTriad * 0.42, uPhosphorStrength);
  }

  if (uSpotMaskStrength > 0.001) {
    color.rgb = applySpotMask(color.rgb, unstableUv, uTargetSize, uSpotMaskStrength);
  }

  color.rgb = applySignalChromaInstability(color.rgb, pixelatedUv);
  color.rgb = applySignalStaticNoise(color.rgb, unstableUv);

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;

  finalColor = vec4(clamp(color.rgb * uOutputBrightness, 0.0, 1.0), 1.0);
}
`;
