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
uniform float uBasicContrast;
uniform float uBasicSaturation;
uniform float uScreenFaceGlow;
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
  float hazeMask =
    faceGlow *
    (0.45 + smoothstep(0.02, 0.55, luma) * 0.90);
  vec3 hazeGlow = vec3(0.34, 0.32, 0.29) * hazeMask * amount * 0.72;

  return lifted + hazeGlow;
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

  float brightness = max(max(color.r, color.g), color.b);
  float visibility = mix(1.0, 1.0 - brightness, uScanlineBrightnessFade);
  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * uScanlineStrength * visibility);

  float scanline2 =
    sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
    uScanline2Strength *
    visibility;
  color.rgb += vec3(scanline2);

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;
  color.rgb = applyBasicColorControls(color.rgb);
  color.rgb = applyScreenFaceGlow(color.rgb);

  finalColor = vec4(clamp(color.rgb * uOutputBrightness, 0.0, 1.0), 1.0);
}
`;
