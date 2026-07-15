export const FILTER_FRAGMENT_PASS2_LITE = `#version 300 es
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
uniform float uOutputBrightness;
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

  float brightness = max(max(color.r, color.g), color.b);
  float visibility = mix(1.0, 1.0 - brightness, uScanlineBrightnessFade);
  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * uScanlineStrength * visibility);

  float scanline2 =
    sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
    uScanline2Strength *
    visibility;
  color.rgb += vec3(scanline2);

  color.rgb = applySignalChromaInstability(color.rgb, pixelatedUv);
  color.rgb = applySignalStaticNoise(color.rgb, unstableUv);

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;

  finalColor = vec4(clamp(color.rgb * uOutputBrightness, 0.0, 1.0), 1.0);
}
`;
