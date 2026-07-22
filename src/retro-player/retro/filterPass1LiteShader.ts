export const FILTER_FRAGMENT_PASS1_LITE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uPaletteMode;
uniform float uHorizontalSharpness;
uniform float uRgbConvergenceOffset;
uniform float uSmoothStrength;
uniform float uToonSteps;
uniform float uEdgeBoost;
uniform float uAnimeEdgeLow;
uniform float uAnimeEdgeHigh;
uniform vec3 uMonoTint;
uniform float uNeonBoost;
uniform float uNeonSaturation;
uniform float uNeonDetail;
uniform float uGlowStrength;

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

vec3 sampleConvergedColor(vec2 uv, vec2 texel)
{
  if (uRgbConvergenceOffset <= 0.0001) {
    return texture(uTexture, uv).rgb;
  }

  vec2 offset = vec2(texel.x * uRgbConvergenceOffset, 0.0);
  float r = texture(uTexture, clamp(uv + offset, vec2(0.0), vec2(1.0))).r;
  float g = texture(uTexture, uv).g;
  float b = texture(uTexture, clamp(uv - offset, vec2(0.0), vec2(1.0))).b;
  return vec3(r, g, b);
}

vec3 applyHorizontalSharpness(vec3 center, vec3 left, vec3 right)
{
  float amount = clamp(uHorizontalSharpness - 1.0, -1.0, 1.0);
  if (abs(amount) <= 0.0001) {
    return center;
  }

  vec3 horizontalBlur = (left + center * 2.0 + right) * 0.25;
  if (amount < 0.0) {
    return mix(center, horizontalBlur, -amount);
  }

  vec3 sharpened = center + (center - 0.5 * (left + right)) * amount;
  return clamp(sharpened, 0.0, 1.0);
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

vec3 nearestColor32(vec3 color)
{
  return vec3(
    round(color.r * 3.0) / 3.0,
    round(color.g * 3.0) / 3.0,
    round(color.b)
  );
}

vec3 nearestColor64(vec3 color)
{
  return round(color * 3.0) / 3.0;
}

vec3 rgb2hsv(vec3 c)
{
  vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 1.0e-10)), d / (q.x + 1.0e-10), q.x);
}

vec3 hsv2rgb(vec3 c)
{
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 adjustSaturation(vec3 color, float saturation)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(vec3(luminance), color, saturation);
}

vec3 nearestColorAnime(vec3 color)
{
  vec3 hsv = rgb2hsv(color);
  float h = hsv.x;
  float s = hsv.y;
  float v = hsv.z;

  float skinWeight = max(
    1.0 - smoothstep(0.05, 0.10, h),
    smoothstep(0.90, 0.95, h)
  ) * smoothstep(0.08, 0.20, s);

  float vQ = 0.22 + round(v * 2.0) / 2.0 * 0.72;

  float shadowDepth = max(0.0, v - vQ);
  float hQ = fract(h + skinWeight * shadowDepth * 0.12);

  float satScale = mix(1.35, 0.85, vQ);
  float sQ = clamp(s * satScale, 0.0, 1.0);

  return hsv2rgb(vec3(hQ, sQ, vQ));
}

// Palette quantization for all modes except neon (mode 9), which uses its own
// edge-based tint instead of quantizing a sampled color. Shared between the
// center pixel and the raw neighbor samples used by the glow pass below.
vec3 applyPaletteMode(vec3 color)
{
  if (uPaletteMode > 7.5 && uPaletteMode < 8.5) {
    return monochromePalette(color, max(uColorLevels, 2.0), uMonoTint);
  } else if (uPaletteMode > 9.5 && uPaletteMode < 10.5) {
    return nearestColorAnime(color);
  } else if (uPaletteMode > 10.5) {
    return quantizeColor(color, max(min(uColorLevels, 24.0), 6.0));
  } else if (uPaletteMode > 5.5 && uPaletteMode < 6.5) {
    return nearestColor32(color);
  } else if (uPaletteMode > 6.5 && uPaletteMode < 7.5) {
    return nearestColor64(color);
  }

  return quantizeColor(color, max(uColorLevels, 2.0));
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

vec3 applyNeonLinePalette(vec2 uv, vec2 texel, float levels, vec3 monoTint)
{
  vec3 center = texture(uTexture, uv).rgb;
  vec3 left = texture(uTexture, clamp(uv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb;
  vec3 right = texture(uTexture, clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb;
  vec3 up = texture(uTexture, clamp(uv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 down = texture(uTexture, clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb;

  float centerLum = dot(center, vec3(0.299, 0.587, 0.114));
  float leftLum = dot(left, vec3(0.299, 0.587, 0.114));
  float rightLum = dot(right, vec3(0.299, 0.587, 0.114));
  float upLum = dot(up, vec3(0.299, 0.587, 0.114));
  float downLum = dot(down, vec3(0.299, 0.587, 0.114));

  float gradient = length(vec2(rightLum - leftLum, downLum - upLum));
  float detailScale = mix(2.0, 4.2, clamp(uNeonDetail - 0.5, 0.0, 1.5) / 1.5);
  float edge = pow(
    clamp(gradient * detailScale, 0.0, 1.0),
    mix(0.95, 0.58, clamp(uNeonDetail, 0.0, 2.0) * 0.5)
  );
  float silhouette = smoothstep(0.18, 0.8, centerLum);
  float line = clamp(edge + silhouette * 0.2, 0.0, 1.0);
  float stepped = floor(line * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);

  vec3 tintCore = adjustSaturation(monoTint, 1.14);
  vec3 tintWarm = vec3(
    monoTint.r,
    max(monoTint.g * 0.62, 0.04),
    max(monoTint.b * 0.28, 0.02)
  );
  vec3 tintCool = vec3(
    max(monoTint.r * 0.34, 0.03),
    monoTint.g * 0.82,
    monoTint.b
  );
  float tintVariance = max(max(monoTint.r, monoTint.g), monoTint.b)
    - min(min(monoTint.r, monoTint.g), monoTint.b);
  vec3 tintAccent = adjustSaturation(
    mix(tintCool, tintWarm, smoothstep(0.52, 0.9, monoTint.r)),
    1.28
  );
  vec3 neonCore = vec3(0.08, 0.94, 1.0);
  vec3 neonAccent = vec3(1.0, 0.16, 0.82);
  vec3 primary = mix(neonCore, tintCore, 0.56);
  vec3 accent = mix(neonAccent, tintAccent, clamp(tintVariance * 1.85, 0.18, 0.82));
  vec3 backgroundTint = mix(vec3(0.01, 0.012, 0.03), tintCore * vec3(0.09, 0.07, 0.13), 0.38);
  vec3 background = mix(
    backgroundTint,
    backgroundTint + neonAccent * 0.06 + accent * 0.04,
    silhouette * 0.18
  );
  vec3 beamBase = mix(primary, accent, smoothstep(0.2, 1.0, centerLum + edge * 0.6));
  float saturation = clamp(uNeonSaturation, 0.0, 2.5);
  vec3 beam = adjustSaturation(beamBase, saturation);
  float boost = clamp(uNeonBoost, 0.0, 2.5);
  vec3 haloBase = mix(primary, accent, 0.72);
  vec3 halo = adjustSaturation(haloBase, 0.65 + saturation * 0.8)
    * pow(stepped, 1.8 + boost * 0.35)
    * (0.40 + boost * 0.23);

  vec3 neon = background + beam * stepped * (0.7 + boost * 0.45) + halo;
  return adjustSaturation(neon, 0.85 + saturation * 0.35);
}

void main(void)
{
  vec2 cell = floor(vTextureCoord * uTargetSize);
  vec2 pixelatedUv = clamp((cell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
  vec2 texel = 1.0 / max(uTargetSize, vec2(1.0));

  vec3 sourceColor = sampleConvergedColor(pixelatedUv, texel);
  if (uSmoothStrength > 0.001) {
    vec3 smoothed = smoothSourceColor(pixelatedUv, texel, uSmoothStrength);
    sourceColor = mix(sourceColor, smoothed, clamp(uSmoothStrength, 0.0, 1.0));
  }
  vec3 leftSharp = sampleConvergedColor(clamp(pixelatedUv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0)), texel);
  vec3 rightSharp = sampleConvergedColor(clamp(pixelatedUv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0)), texel);
  vec3 color = applyHorizontalSharpness(sourceColor, leftSharp, rightSharp);
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color = clamp(color + dither, 0.0, 1.0);
  color = applyToonShading(color, uToonSteps);

  bool isNeon = uPaletteMode > 8.5 && uPaletteMode < 9.5;

  if (isNeon) {
    color = applyNeonLinePalette(pixelatedUv, texel, max(uColorLevels, 2.0), uMonoTint);
    if (uGlowStrength > 0.001) {
      vec3 halo = applyNeonLinePalette(
        clamp(pixelatedUv + vec2(texel.x * 0.5, texel.y * 0.5), vec2(0.0), vec2(1.0)),
        texel,
        max(uColorLevels, 2.0),
        uMonoTint
      );
      color = mix(
        color,
        color + halo * uGlowStrength * (0.35 + uNeonBoost * 0.22),
        0.45
      );
    }
  } else {
    color = applyPaletteMode(color);

    if (uGlowStrength > 0.001) {
      vec3 glow = vec3(0.0);
      glow += applyPaletteMode(texture(uTexture, clamp(pixelatedUv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb) * 0.34;
      glow += applyPaletteMode(texture(uTexture, clamp(pixelatedUv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb) * 0.34;
      glow += applyPaletteMode(texture(uTexture, clamp(pixelatedUv + vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb) * 0.18;
      glow += applyPaletteMode(texture(uTexture, clamp(pixelatedUv - vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb) * 0.18;
      glow += applyPaletteMode(texture(uTexture, clamp(pixelatedUv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb) * 0.10;
      glow += applyPaletteMode(texture(uTexture, clamp(pixelatedUv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb) * 0.10;

      float brightness = max(max(color.r, color.g), color.b);
      float glowMask = smoothstep(0.45, 1.0, brightness);
      color += glow * glowMask * uGlowStrength;
    }
  }

  color = clamp(color, 0.0, 1.0);

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
