export const FILTER_FRAGMENT_BEAM_SOURCE_DOWNSCALE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uSourceSize;
uniform vec2 uTargetSize;

void main(void)
{
  vec2 sourceSize = max(uSourceSize, vec2(1.0));
  vec2 targetSize = max(uTargetSize, vec2(1.0));
  vec2 footprint = max(sourceSize / targetSize, vec2(1.0));
  vec2 texel = 1.0 / sourceSize;
  vec2 radius = 0.5 * max(footprint - 1.0, vec2(0.0)) * texel;

  vec4 accum = vec4(0.0);
  accum += texture(uTexture, vTextureCoord + radius * vec2(-1.0, -1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 0.0, -1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 1.0, -1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2(-1.0,  0.0));
  accum += texture(uTexture, vTextureCoord);
  accum += texture(uTexture, vTextureCoord + radius * vec2( 1.0,  0.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2(-1.0,  1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 0.0,  1.0));
  accum += texture(uTexture, vTextureCoord + radius * vec2( 1.0,  1.0));

  finalColor = accum / 9.0;
}
`;
