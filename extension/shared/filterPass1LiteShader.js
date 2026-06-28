export const FILTER_FRAGMENT_PASS1_LITE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uPaletteMode;
uniform float uSmoothStrength;
uniform float uToonSteps;
uniform float uEdgeBoost;
uniform float uAnimeEdgeLow;
uniform float uAnimeEdgeHigh;
uniform vec3 uMonoTint;
uniform float uNeonBoost;
uniform float uNeonSaturation;

float bayer4x4(vec2 pos)
{
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = y * 4 + x;
  float matrix[16];
  matrix[0] = 0.0 / 16.0;
  matrix[1] = 8.0 / 16.0;
  matrix[2] = 2.0 / 16.0;
  matrix[3] = 10.0 / 16.0;
  matrix[4] = 12.0 / 16.0;
  matrix[5] = 4.0 / 16.0;
  matrix[6] = 14.0 / 16.0;
  matrix[7] = 6.0 / 16.0;
  matrix[8] = 3.0 / 16.0;
  matrix[9] = 11.0 / 16.0;
  matrix[10] = 1.0 / 16.0;
  matrix[11] = 9.0 / 16.0;
  matrix[12] = 15.0 / 16.0;
  matrix[13] = 7.0 / 16.0;
  matrix[14] = 13.0 / 16.0;
  matrix[15] = 5.0 / 16.0;
  return matrix[index];
}

vec3 smoothSourceColor(vec2 uv, vec2 texel, float amount)
{
  vec3 center = texture(uTexture, uv).rgb;
  if (amount <= 0.001) {
    return center;
  }

  vec3 left = texture(uTexture, clamp(uv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb;
  vec3 right = texture(uTexture, clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb;
  vec3 up = texture(uTexture, clamp(uv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 down = texture(uTexture, clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 blurred = center * 0.4 + (left + right + up + down) * 0.15;
  return mix(center, blurred, clamp(amount, 0.0, 1.0));
}

vec3 applyToonShading(vec3 color, float steps)
{
  if (steps < 2.0) {
    return color;
  }

  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (steps - 1.0) + 0.5) / max(steps - 1.0, 1.0);
  float scale = stepped / max(luminance, 0.001);
  return clamp(mix(color, color * scale, 0.88), 0.0, 1.0);
}

vec3 monochromePalette(vec3 color, float levels, vec3 tint)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
  return clamp(tint * stepped, 0.0, 1.0);
}

vec3 quantizeColor(vec3 color, float levels)
{
  return floor(color * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
}

float computeSourceEdge(vec2 uv, vec2 texel)
{
  float tl = dot(texture(uTexture, clamp(uv + vec2(-texel.x, -texel.y), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float tc = dot(texture(uTexture, clamp(uv + vec2( 0.0,     -texel.y), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float tr = dot(texture(uTexture, clamp(uv + vec2( texel.x, -texel.y), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float ml = dot(texture(uTexture, clamp(uv + vec2(-texel.x,  0.0    ), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float mr = dot(texture(uTexture, clamp(uv + vec2( texel.x,  0.0    ), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float bl = dot(texture(uTexture, clamp(uv + vec2(-texel.x,  texel.y), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float bc = dot(texture(uTexture, clamp(uv + vec2( 0.0,      texel.y), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));
  float br = dot(texture(uTexture, clamp(uv + vec2( texel.x,  texel.y), vec2(0.0), vec2(1.0))).rgb, vec3(0.299, 0.587, 0.114));

  float gx = -tl + tr - 2.0 * ml + 2.0 * mr - bl + br;
  float gy = -tl - 2.0 * tc - tr + bl + 2.0 * bc + br;
  return clamp(length(vec2(gx, gy)), 0.0, 1.0);
}

void main(void)
{
  vec2 cell = floor(vTextureCoord * uTargetSize);
  vec2 pixelatedUv = clamp((cell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
  vec2 texel = 1.0 / max(uTargetSize, vec2(1.0));

  vec3 color = smoothSourceColor(pixelatedUv, texel, uSmoothStrength);
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color = clamp(color + dither, 0.0, 1.0);
  color = applyToonShading(color, uToonSteps);

  if (uPaletteMode > 7.5 && uPaletteMode < 8.5) {
    color = monochromePalette(color, max(uColorLevels, 2.0), uMonoTint);
  } else if (uPaletteMode > 8.5 && uPaletteMode < 9.5) {
    float edge = pow(computeSourceEdge(pixelatedUv, texel), 0.7);
    vec3 neonTint = mix(uMonoTint, vec3(0.1, 1.0, 0.9), 0.45);
    color = neonTint * edge * (0.7 + clamp(uNeonBoost, 0.0, 2.0) * 0.5);
  } else if (uPaletteMode > 9.5) {
    color = quantizeColor(color, max(min(uColorLevels, 24.0), 6.0));
  } else {
    color = quantizeColor(color, max(uColorLevels, 2.0));
  }

  float edgeBoost = clamp(uEdgeBoost, 0.0, 1.5);
  if (edgeBoost > 0.001) {
    float edge = computeSourceEdge(pixelatedUv, texel);
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    float low = mix(uAnimeEdgeLow * 0.35, uAnimeEdgeLow, smoothstep(0.25, 0.65, luminance));
    float high = max(low + 0.02, uAnimeEdgeHigh);
    float edgeMix = smoothstep(low, high, edge) * min(edgeBoost, 1.0);
    color = mix(color, vec3(0.0), clamp(edgeMix, 0.0, 1.0));
  }

  finalColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
