export const FILTER_FRAGMENT_WIDE_GLOW_COMPOSITE = `#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uSharpTexture;
uniform sampler2D uGlowTexture;
uniform float uStrength;

void main() {
  vec3 sharp = texture(uSharpTexture, vTextureCoord).rgb;
  vec3 glow = texture(uGlowTexture, vTextureCoord).rgb;
  float glowLuma = max(glow.r, max(glow.g, glow.b));
  float haloBoost = 0.45 + 1.15 * smoothstep(0.015, 0.75, glowLuma);
  vec3 color = sharp + glow * haloBoost * max(uStrength, 0.0);
  finalColor = vec4(color, 1.0);
}
`;
