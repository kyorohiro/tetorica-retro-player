export const FILTER_FRAGMENT_WIDE_GLOW_COMPOSITE = `#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uSharpTexture;
uniform sampler2D uGlowTexture;
uniform float uStrength;
uniform float uRadius;
uniform float uOpticalMode;

void main() {
  vec3 sharp = texture(uSharpTexture, vTextureCoord).rgb;
  vec3 glow = texture(uGlowTexture, vTextureCoord).rgb;
  vec3 smokyColor = sharp + glow * max(uStrength, 0.0);
  float glowLuma = max(glow.r, max(glow.g, glow.b));
  float haloMask = smoothstep(0.010, 0.085, glowLuma);
  float haloBoost = 0.58 + 0.95 * smoothstep(0.02, 0.55, glowLuma);
  float radiusCompensation = 1.0 / (1.0 + max(uRadius - 1.0, 0.0) * 0.16);
  vec3 opticalColor =
    sharp + glow * haloMask * haloBoost * radiusCompensation * max(uStrength, 0.0);
  vec3 color = mix(smokyColor, opticalColor, clamp(uOpticalMode, 0.0, 1.0));
  finalColor = vec4(color, 1.0);
}
`;
