export const FILTER_FRAGMENT_PASS1_PC98_LITE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uSamplingMode;
uniform float uPaletteMode;
uniform float uHorizontalSharpness;
uniform float uRgbConvergenceOffset;
uniform float uSmoothStrength;
uniform float uToonSteps;
uniform float uEdgeBoost;
uniform float uAnimeEdgeLow;
uniform float uAnimeEdgeHigh;
uniform vec3 uMonoTint;
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

vec2 targetCellUv(vec2 cell)
{
  return clamp((cell + 0.5) / max(uTargetSize, vec2(1.0)), vec2(0.0), vec2(1.0));
}

vec3 sampleCellAverage4(vec2 cellMin, vec2 cellSize)
{
  vec2 quarter = cellSize * 0.25;
  vec3 sum = vec3(0.0);
  sum += texture(uTexture, clamp(cellMin + vec2(quarter.x, quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + vec2(quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0))).rgb;
  return sum * 0.25;
}

vec3 sampleCellAverage8(vec2 cellMin, vec2 cellSize)
{
  vec3 sum = vec3(0.0);
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.25, 0.25), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.75, 0.25), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.25, 0.75), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.75, 0.75), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.50, 0.20), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.50, 0.80), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.20, 0.50), vec2(0.0), vec2(1.0))).rgb;
  sum += texture(uTexture, clamp(cellMin + cellSize * vec2(0.80, 0.50), vec2(0.0), vec2(1.0))).rgb;
  return sum * 0.125;
}

vec3 sampleCellAverage16(vec2 cellMin, vec2 cellSize)
{
  vec3 sum = vec3(0.0);
  for (int y = 0; y < 4; y++) {
    for (int x = 0; x < 4; x++) {
      vec2 offset = (vec2(float(x), float(y)) + 0.5) / 4.0;
      sum += texture(uTexture, clamp(cellMin + cellSize * offset, vec2(0.0), vec2(1.0))).rgb;
    }
  }
  return sum * (1.0 / 16.0);
}

vec3 sampleBaseSourceColorAtCell(vec2 cell)
{
  vec2 safeTargetSize = max(uTargetSize, vec2(1.0));
  vec2 uv = targetCellUv(cell);
  if (uSamplingMode < 0.5) {
    return texture(uTexture, uv).rgb;
  }

  vec2 clampedCell = clamp(cell, vec2(0.0), safeTargetSize - vec2(1.0));
  vec2 cellMin = clampedCell / safeTargetSize;
  vec2 cellSize = 1.0 / safeTargetSize;
  if (uSamplingMode < 1.5) {
    return sampleCellAverage4(cellMin, cellSize);
  }
  if (uSamplingMode < 2.5) {
    return sampleCellAverage8(cellMin, cellSize);
  }
  return sampleCellAverage8(cellMin, cellSize);
}

vec3 sampleSourceColorAtCell(vec2 cell)
{
  vec3 center = sampleBaseSourceColorAtCell(cell);
  if (uSmoothStrength <= 0.001) {
    return center;
  }

  vec3 left = sampleBaseSourceColorAtCell(cell + vec2(-1.0, 0.0));
  vec3 right = sampleBaseSourceColorAtCell(cell + vec2(1.0, 0.0));
  vec3 up = sampleBaseSourceColorAtCell(cell + vec2(0.0, -1.0));
  vec3 down = sampleBaseSourceColorAtCell(cell + vec2(0.0, 1.0));
  vec3 blurred = center * 0.4 + (left + right + up + down) * 0.15;
  return mix(center, blurred, clamp(uSmoothStrength, 0.0, 1.0));
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
  if (steps < 2.0) return color;
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (steps - 1.0) + 0.5) / max(steps - 1.0, 1.0);
  float scale = stepped / max(luminance, 0.001);
  return clamp(mix(color, color * scale, 0.88), 0.0, 1.0);
}

vec3 pc98Palette(float index)
{
  if (index < 0.5) return vec3(0.0, 0.0, 0.0);
  if (index < 1.5) return vec3(0.0, 0.0, 0.6667);
  if (index < 2.5) return vec3(0.0, 0.6667, 0.0);
  if (index < 3.5) return vec3(0.0, 0.6667, 0.6667);
  if (index < 4.5) return vec3(0.6667, 0.0, 0.0);
  if (index < 5.5) return vec3(0.6667, 0.0, 0.6667);
  if (index < 6.5) return vec3(0.6667, 0.3333, 0.0);
  if (index < 7.5) return vec3(0.6667, 0.6667, 0.6667);
  if (index < 8.5) return vec3(0.3333, 0.3333, 0.3333);
  if (index < 9.5) return vec3(0.3333, 0.3333, 1.0);
  if (index < 10.5) return vec3(0.3333, 1.0, 0.3333);
  if (index < 11.5) return vec3(0.3333, 1.0, 1.0);
  if (index < 12.5) return vec3(1.0, 0.3333, 0.3333);
  if (index < 13.5) return vec3(1.0, 0.3333, 1.0);
  if (index < 14.5) return vec3(1.0, 1.0, 0.3333);
  return vec3(1.0, 1.0, 1.0);
}

vec3 nearestPc98(vec3 color)
{
  vec3 best = pc98Palette(0.0);
  float bestDistance = distance(color, best);
  for (int i = 1; i < 16; i++) {
    vec3 candidate = pc98Palette(float(i));
    float candidateDistance = distance(color, candidate);
    if (candidateDistance < bestDistance) {
      best = candidate;
      bestDistance = candidateDistance;
    }
  }
  return best;
}

vec3 quantizePc98_512(vec3 color)
{
  return floor(clamp(color, 0.0, 1.0) * 7.0 + 0.5) / 7.0;
}

vec3 quantizePc98_512Sat(vec3 color)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float saturation = max(max(color.r, color.g), color.b) - min(min(color.r, color.g), color.b);
  vec3 boosted = mix(vec3(luminance), color, 1.0 + smoothstep(0.08, 0.4, saturation) * 0.2);
  return floor(clamp(boosted, 0.0, 1.0) * 7.0 + 0.5) / 7.0;
}

vec3 quantizePc98_4096(vec3 color)
{
  return floor(clamp(color, 0.0, 1.0) * 15.0 + 0.5) / 15.0;
}

vec3 pc98TilePalette(vec3 color, vec2 cell)
{
  vec3 low = floor(clamp(color, 0.0, 1.0) * 7.0) / 7.0;
  vec3 high = ceil(clamp(color, 0.0, 1.0) * 7.0) / 7.0;
  return mod(cell.x + cell.y, 2.0) < 1.0 ? low : high;
}

// Shared between the center pixel and the raw neighbor samples used by the
// glow pass below; cell must be the neighbor's own grid cell so the tile
// checkerboard (pc98TilePalette) stays aligned at glow sample positions.
vec3 applyPc98PaletteMode(vec3 color, vec2 cell)
{
  if (uPaletteMode < 1.5) {
    return nearestPc98(color);
  } else if (uPaletteMode < 2.5) {
    return pc98TilePalette(color, cell);
  } else if (uPaletteMode < 3.5) {
    return quantizePc98_512(color);
  } else if (uPaletteMode < 4.5) {
    return quantizePc98_512Sat(color);
  }

  return quantizePc98_4096(color);
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
  vec2 pixelatedUv = targetCellUv(cell);
  vec2 texel = 1.0 / max(uTargetSize, vec2(1.0));

  vec3 sourceColor = sampleSourceColorAtCell(cell);
  if (uRgbConvergenceOffset > 0.0001) {
    vec3 center = sourceColor;
    float r = sampleSourceColorAtCell(cell + vec2(uRgbConvergenceOffset, 0.0)).r;
    float b = sampleSourceColorAtCell(cell + vec2(-uRgbConvergenceOffset, 0.0)).b;
    sourceColor = vec3(r, center.g, b);
  }
  vec3 leftSharp = sampleSourceColorAtCell(cell + vec2(-1.0, 0.0));
  vec3 rightSharp = sampleSourceColorAtCell(cell + vec2(1.0, 0.0));
  vec3 color = applyHorizontalSharpness(sourceColor, leftSharp, rightSharp);
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color = clamp(color + dither, 0.0, 1.0);
  color = applyToonShading(color, uToonSteps);

  color = applyPc98PaletteMode(color, cell);

  if (uGlowStrength > 0.001) {
    vec3 glow = vec3(0.0);
    glow += applyPc98PaletteMode(texture(uTexture, clamp(pixelatedUv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb, cell + vec2(1.0, 0.0)) * 0.34;
    glow += applyPc98PaletteMode(texture(uTexture, clamp(pixelatedUv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb, cell - vec2(1.0, 0.0)) * 0.34;
    glow += applyPc98PaletteMode(texture(uTexture, clamp(pixelatedUv + vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb, cell + vec2(2.0, 0.0)) * 0.18;
    glow += applyPc98PaletteMode(texture(uTexture, clamp(pixelatedUv - vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb, cell - vec2(2.0, 0.0)) * 0.18;
    glow += applyPc98PaletteMode(texture(uTexture, clamp(pixelatedUv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb, cell + vec2(0.0, 1.0)) * 0.10;
    glow += applyPc98PaletteMode(texture(uTexture, clamp(pixelatedUv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb, cell - vec2(0.0, 1.0)) * 0.10;

    float brightness = max(max(color.r, color.g), color.b);
    float glowMask = smoothstep(0.45, 1.0, brightness);
    color += glow * glowMask * uGlowStrength;
    color = clamp(color, 0.0, 1.0);
  }

  float edgeBoost = clamp(uEdgeBoost, 0.0, 1.5);
  if (edgeBoost > 0.001) {
    float edge = computeSourceEdge(pixelatedUv, texel);
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    float low = mix(uAnimeEdgeLow * 0.35, uAnimeEdgeLow, smoothstep(0.25, 0.65, luminance));
    float high = max(low + 0.02, uAnimeEdgeHigh);
    color = mix(color, vec3(0.0), smoothstep(low, high, edge) * min(edgeBoost, 1.0));
  }

  finalColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
