export const FILTER_FRAGMENT_WIDE_GLOW_DOWNSAMPLE = `#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTexelSize;

vec3 emissiveColor(vec3 color) {
  float peak = max(color.r, max(color.g, color.b));
  float gate = smoothstep(0.42, 0.92, peak);
  vec3 lifted = max(color - vec3(0.22), vec3(0.0));
  return lifted * gate * gate * 2.8;
}

void main() {
  vec2 d = uTexelSize;
  vec3 c0 = emissiveColor(texture(uTexture, vTextureCoord).rgb);
  vec3 c1 = emissiveColor(texture(uTexture, vTextureCoord + vec2(-d.x, -d.y)).rgb);
  vec3 c2 = emissiveColor(texture(uTexture, vTextureCoord + vec2( d.x, -d.y)).rgb);
  vec3 c3 = emissiveColor(texture(uTexture, vTextureCoord + vec2(-d.x,  d.y)).rgb);
  vec3 c4 = emissiveColor(texture(uTexture, vTextureCoord + vec2( d.x,  d.y)).rgb);

  vec3 color = (
    c0 * 0.42 +
    c1 * 0.145 +
    c2 * 0.145 +
    c3 * 0.145 +
    c4 * 0.145
  );
  color *= 1.12;
  finalColor = vec4(color, 1.0);
}
`;
