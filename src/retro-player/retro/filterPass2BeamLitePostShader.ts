export const FILTER_FRAGMENT_PASS2_BEAM_LITE_POST = `#version 300 es
precision highp float;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uPass1Texture;
uniform vec2 uTargetSize;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;
uniform float uVignetteStrength;
uniform float uOutputBrightness;
uniform float uBasicContrast;
uniform float uShadowCrush;
uniform float uBasicSaturation;
uniform float uReflectiveLcdBase;
uniform float uLightDependentTint;
uniform float uScreenFaceGlow;
uniform float uTime;

const float PI = 3.141592653589793;

float getScreenFaceGlow() { return clamp(uScreenFaceGlow, 0.0, 0.5); }

vec3 applyBasicColorControls(vec3 color) {
  float saturation = max(uBasicSaturation, 0.0);
  float contrast = max(uBasicContrast, 0.0);
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 saturated = mix(vec3(luma), color, saturation);
  vec3 contrasted = (saturated - 0.5) * contrast + 0.5;
  float shadowAmount = clamp(uShadowCrush, 0.0, 2.0);
  if (shadowAmount <= 0.001) return clamp(contrasted, 0.0, 1.0);
  float contrastedLuma = dot(contrasted, vec3(0.299, 0.587, 0.114));
  float shadowMask = 1.0 - smoothstep(0.05, 0.55, contrastedLuma);
  float crush = clamp(shadowMask * shadowAmount * 0.72, 0.0, 0.95);
  vec3 shadowed = contrasted * (1.0 - crush);
  return clamp(shadowed, 0.0, 1.0);
}

vec3 applyReflectiveLcdBase(vec3 color) {
  float amount = clamp(uReflectiveLcdBase, 0.0, 1.0);
  if (amount <= 0.001) return color;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float brightMask = smoothstep(0.06, 0.92, luma);
  vec3 darkPaper = vec3(0.30, 0.36, 0.22);
  vec3 brightPaper = vec3(0.79, 0.82, 0.60);
  vec3 baseTone = mix(darkPaper, brightPaper, smoothstep(0.0, 1.0, luma));
  vec3 lifted = max(color, baseTone * (0.24 + luma * 0.52));
  return mix(color, lifted, amount * brightMask);
}

vec3 applyLightDependentTint(vec3 color) {
  float amount = clamp(uLightDependentTint, 0.0, 1.0);
  if (amount <= 0.001) return color;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 darkTint = vec3(0.82, 1.00, 0.78);
  vec3 midTint = vec3(0.96, 1.00, 0.83);
  vec3 brightTint = vec3(1.06, 1.02, 0.82);
  vec3 tint = mix(darkTint, midTint, smoothstep(0.0, 0.55, luma));
  tint = mix(tint, brightTint, smoothstep(0.45, 1.0, luma));
  return clamp(color * mix(vec3(1.0), tint, amount), 0.0, 1.0);
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

void main(void) {
  vec2 targetSize = max(uTargetSize, vec2(1.0));
  vec2 targetCell = floor(vTextureCoord * targetSize);
  vec2 pixelatedUv = clamp((targetCell + 0.5) / targetSize, vec2(0.0), vec2(1.0));
  vec3 color = texture(uPass1Texture, vTextureCoord).rgb;
  float brightness = max(max(color.r, color.g), color.b);
  float visibility = mix(1.0, 1.0 - clamp(brightness, 0.0, 1.0), clamp(uScanlineBrightnessFade, 0.0, 1.0));
  float scanline = sin(pixelatedUv.y * targetSize.y * PI);
  float scanlineMask = (scanline * 0.5 + 0.5) * max(uScanlineStrength, 0.0) * visibility * 0.04;
  color *= 1.0 - clamp(scanlineMask, 0.0, 1.0);
  float scanline2 = sin((vTextureCoord.y + uTime * 0.05) * 720.0) * uScanline2Strength * visibility;
  color += vec3(scanline2);
  color = applyScreenFaceGlow(color);
  float vignette = distance(vMaskCoord, vec2(0.5));
  float vignetteAmount = smoothstep(0.2, 0.78, vignette) * clamp(uVignetteStrength, 0.0, 1.0);
  color *= 1.0 - vignetteAmount;
  color = applyBasicColorControls(color);
  color = applyReflectiveLcdBase(color);
  color = applyLightDependentTint(color);
  color = applyScreenFaceGlow(color);
  finalColor = vec4(clamp(color * max(uOutputBrightness, 0.0), 0.0, 1.0), 1.0);
}
`;
