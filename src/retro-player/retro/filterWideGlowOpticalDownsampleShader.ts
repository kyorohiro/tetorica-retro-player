export const FILTER_FRAGMENT_WIDE_GLOW_OPTICAL_DOWNSAMPLE = `#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTexelSize;

vec3 extractOpticalGlow(vec3 color) {
  float peak = max(color.r, max(color.g, color.b));
  float gate = smoothstep(0.24, 0.86, peak);
  vec3 lifted = max(color - vec3(0.08), vec3(0.0));
  return lifted * (0.28 + 1.32 * gate * gate);
}

void main() {
  vec2 d = uTexelSize;
  vec3 c0 = extractOpticalGlow(texture(uTexture, vTextureCoord).rgb);
  vec3 c1 = extractOpticalGlow(texture(uTexture, vTextureCoord + vec2(-d.x, -d.y)).rgb);
  vec3 c2 = extractOpticalGlow(texture(uTexture, vTextureCoord + vec2( d.x, -d.y)).rgb);
  vec3 c3 = extractOpticalGlow(texture(uTexture, vTextureCoord + vec2(-d.x,  d.y)).rgb);
  vec3 c4 = extractOpticalGlow(texture(uTexture, vTextureCoord + vec2( d.x,  d.y)).rgb);

  vec3 color =
    c0 * 0.40 +
    c1 * 0.15 +
    c2 * 0.15 +
    c3 * 0.15 +
    c4 * 0.15;

  finalColor = vec4(color * 1.08, 1.0);
}
`;
