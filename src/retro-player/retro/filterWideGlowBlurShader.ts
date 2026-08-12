export const FILTER_FRAGMENT_WIDE_GLOW_BLUR = `#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTexelSize;
uniform vec2 uDirection;
uniform float uRadius;

void main() {
  vec2 stepVec = uTexelSize * uDirection * max(uRadius, 0.0);
  vec3 color = texture(uTexture, vTextureCoord).rgb * 0.20;
  color += texture(uTexture, vTextureCoord + stepVec * 2.0).rgb * 0.23;
  color += texture(uTexture, vTextureCoord - stepVec * 2.0).rgb * 0.23;
  color += texture(uTexture, vTextureCoord + stepVec * 5.5).rgb * 0.17;
  color += texture(uTexture, vTextureCoord - stepVec * 5.5).rgb * 0.17;
  finalColor = vec4(color, 1.0);
}
`;
