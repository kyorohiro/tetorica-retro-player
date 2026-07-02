export const TILT_SHIFT_FRAGMENT = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uMiniatureBlurStrength;
uniform float uMiniatureFocusHeight;
uniform float uMiniatureFocusFalloff;
uniform float uSaturationAmount;
uniform float uLumaAmount;

const float GOLDEN_ANGLE = 2.39996323;

float tiltShiftBlurMask(vec2 uv)
{
  float strength = clamp(uMiniatureBlurStrength, 0.0, 1.0);
  if (strength <= 0.0001) {
    return 0.0;
  }

  // Keep the focus area wider horizontally so it reads less like a hard box.
  vec2 centered = uv - vec2(0.5);
  centered.x *= 1.15;
  centered.y *= 1.0;

  float focusRadius = clamp(uMiniatureFocusHeight * 0.42, 0.04, 0.42);
  float falloff = max(uMiniatureFocusFalloff, 0.0001);
  float outerRadius = min(focusRadius + falloff * 1.2, 0.85);
  float distanceFromFocus = length(centered);
  return smoothstep(focusRadius, outerRadius, distanceFromFocus);
}

vec3 applySaturationLift(vec3 color, float amount)
{
  float lift = clamp(amount, 0.0, 1.0) * 0.18;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  return clamp(mix(vec3(luma), color, 1.0 + lift), 0.0, 1.0);
}

vec3 applyLumaLift(vec3 color, float amount)
{
  float lift = clamp(amount, 0.0, 1.0) * 0.08;
  return clamp(color + vec3(lift), 0.0, 1.0);
}

vec3 sampleDiskBlur(vec2 uv, vec2 texel, float blurRadiusPx)
{
  vec3 accum = texture(uTexture, uv).rgb * 0.18;
  float totalWeight = 0.18;

  for (int i = 0; i < 24; i++) {
    float fi = float(i);
    float t = (fi + 0.5) / 24.0;
    float radius = sqrt(t) * blurRadiusPx;
    float angle = fi * GOLDEN_ANGLE;
    vec2 offset = vec2(cos(angle), sin(angle)) * texel * radius;
    float weight = 1.0 - t * 0.72;
    accum += texture(uTexture, clamp(uv + offset, vec2(0.0), vec2(1.0))).rgb * weight;
    totalWeight += weight;
  }

  return accum / max(totalWeight, 0.0001);
}

void main(void)
{
  vec2 uv = clamp(vTextureCoord, vec2(0.0), vec2(1.0));
  vec2 texel = 1.0 / vec2(textureSize(uTexture, 0));
  vec3 sharpColor = texture(uTexture, uv).rgb;

  float blurMask = tiltShiftBlurMask(uv);
  float strength = clamp(uMiniatureBlurStrength, 0.0, 1.0);
  float blurAmount = pow(blurMask, 1.35);

  vec3 blurredColor = sharpColor;
  if (blurAmount > 0.0001 && strength > 0.0001) {
    float blurRadiusPx = (2.0 + strength * 20.0) * blurAmount;
    blurredColor = sampleDiskBlur(uv, texel, blurRadiusPx);
  }

  vec3 color = mix(sharpColor, blurredColor, clamp(blurAmount * (0.65 + strength * 0.35), 0.0, 1.0));
  color = applyLumaLift(color, uLumaAmount);
  color = applySaturationLift(color, uSaturationAmount);
  finalColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
