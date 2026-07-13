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
  float radiusJitter = 1.0 + cellJitter * 0.045;
  float emissionJitter = 1.0 + cellJitter * 0.035;
  float dotRadius = mix(
    uBulbRadius * (useBrightCore ? 0.14 : 0.19),
    uBulbRadius * ((useBrightCore ? 0.64 : 0.82) + highlightBloom * (useBrightCore ? 0.24 : 0.12)),
    radiusBias
  ) * radiusJitter;
  float innerCoreRadius = dotRadius * (useBrightCore ? mix(0.28, 0.42, brightness) : mix(0.44, 0.58, brightness));
  float haloRadius = dotRadius + mix(0.028, 0.12 + highlightBloom * 0.08, brightness);
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
    vec3 dotCoreColor = color * emission;
    dotCoreColor += color * mix(cellFill, cellFill * flatDisc * 1.75, cellFillMix);
    vec3 discCoreColor = color * flatDiscFill;
    vec3 dotColor = mix(dotCoreColor, discCoreColor, flatDiscMode);
    dotColor += color * floorLight;
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
  vec3 dotCoreColor = color * emission;
  dotCoreColor += color * mix(cellFill, cellFill * flatDisc * 1.75, cellFillMix);
  vec3 discCoreColor = color * flatDiscFill;
  vec3 dotColor = mix(dotCoreColor, discCoreColor, flatDiscMode);
  dotColor += color * floorLight;
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

  vec2 cell = floor(curvedUv * uTargetSize);
  vec2 pixelatedUv = clamp((cell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
  vec4 color = texture(uPass1Texture, pixelatedUv);

  if (uFocusStrength > 0.001) {
    vec2 focusScale = max(uFocusSize, vec2(0.001));
    float focusDist = length((vMaskCoord - uFocusCenter) / focusScale);
    float blurMask = smoothstep(1.0, 2.15, focusDist);
    float blurAmt = pow(blurMask, 1.35);
    if (blurAmt > 0.001) {
      float blurRadius = (2.0 + uFocusStrength * 38.0) * blurAmt;
      vec3 blurredColor = sampleFocusBlur(curvedUv, blurRadius);
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

    float flatDiscMode = smoothstep(0.5, 1.0, uPhosphorDotFlatDisc);
    float neighborBlendMix = smoothstep(0.5, 1.0, uPhosphorDotNeighborBlend);
    vec3 neighborMix = (rightColor + leftColor + upColor + downColor) * 0.25;
    float sourceColorDelta = length(centerColor - neighborMix);
    float sourceBlendAmount =
      neighborBlendMix *
      (0.38 + flatDiscMode * 0.16 + smoothstep(0.04, 0.4, sourceColorDelta) * 0.28);
    vec3 mixedSourceColor = mix(centerColor, centerColor * 0.24 + neighborMix * 0.76, sourceBlendAmount);

    vec3 phosphorColor = applyPhosphorDot(mixedSourceColor, curvedUv, uTargetSize, uSpotMaskStrength);
    float phosphorBrightness = max(max(mixedSourceColor.r, mixedSourceColor.g), mixedSourceColor.b);
    float bleedMask = smoothstep(0.52, 1.0, phosphorBrightness);

    vec3 bleedColor = rightColor * 0.34 + leftColor * 0.34 + downColor * 0.16 + upColor * 0.16;
    phosphorColor += bleedColor * bleedMask * uSpotMaskStrength * (0.06 + phosphorBrightness * 0.1);

    vec3 fourWayMix = mixedSourceColor * 0.34 + (rightColor + leftColor + upColor + downColor) * 0.165;
    float internalScaleMix = smoothstep(0.5, 1.0, uPhosphorDotInternalScale);
    float fourWayAmount = neighborBlendMix * (0.16 + phosphorBrightness * 0.16 + flatDiscMode * 0.08 + internalScaleMix * 0.06);
    phosphorColor = mix(phosphorColor, fourWayMix, fourWayAmount);

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
    phosphorColor += mixedSourceColor * phosphorBaseLift;

    float vignette = distance(vMaskCoord, vec2(0.5));
    phosphorColor *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;

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
    color.rgb = applySpotMask(color.rgb, curvedUv, uTargetSize, uSpotMaskStrength);
  }

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;

  finalColor = vec4(clamp(color.rgb * uOutputBrightness, 0.0, 1.0), 1.0);
}
`;
