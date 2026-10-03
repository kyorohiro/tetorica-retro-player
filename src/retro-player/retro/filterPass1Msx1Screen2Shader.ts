// Graphic II bitmap approximation: each scanline independently owns 32 color
// bytes and 32 pattern bytes. Sprites and VRAM name-table reuse are not simulated.
// Conventional TMS9918A RGB approximation; code 0 is transparent on hardware.
// We resolve it to the fixed black backdrop (code 1) for opaque video conversion.
export const FILTER_FRAGMENT_PASS1_MSX1_SCREEN2 = `#version 300 es
precision highp float;
precision highp int;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uSamplingMode;
uniform float uDitherStrength;
uniform float uPaletteMode;
// Extended mode adds dark tones, browns and skin tones. Entry 0 becomes an
// opaque dark gray; strict MSX1 mode still skips this transparent index.
const vec3 PALETTE[32] = vec3[32](
  vec3(32, 32, 32), vec3(0, 0, 0),
  vec3(33, 200, 66), vec3(94, 220, 120),
  vec3(84, 85, 237), vec3(125, 118, 252),
  vec3(212, 82, 77), vec3(66, 235, 245),
  vec3(252, 85, 84), vec3(255, 121, 120),
  vec3(212, 193, 84), vec3(230, 206, 128),
  vec3(33, 176, 59), vec3(201, 91, 186),
  vec3(204, 204, 204), vec3(255, 255, 255),
  vec3(64, 64, 64), vec3(96, 96, 96),
  vec3(144, 144, 144), vec3(176, 176, 176),
  vec3(24, 32, 80), vec3(40, 64, 144),
  vec3(24, 80, 40), vec3(32, 112, 104),
  vec3(80, 32, 48), vec3(112, 48, 104),
  vec3(96, 56, 32), vec3(144, 88, 48),
  vec3(192, 128, 80), vec3(232, 168, 120),
  vec3(255, 208, 168), vec3(240, 144, 48)
);
float colorError(vec3 delta) { return dot(delta, delta); }

vec2 targetCellUv(vec2 cell)
{
  return clamp((cell + 0.5) / max(uTargetSize, vec2(1.0)), vec2(0.0), vec2(1.0));
}

vec3 sampleCellAverage4(vec2 cellMin, vec2 cellSize)
{
  vec2 quarter = cellSize * 0.25;
  vec3 sum = vec3(0.0);
  sum += textureLod(uTexture, clamp(cellMin + vec2(quarter.x, quarter.y), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, quarter.y), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + vec2(quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + vec2(cellSize.x - quarter.x, cellSize.y - quarter.y), vec2(0.0), vec2(1.0)), 0.0).rgb;
  return sum * 0.25;
}

vec3 sampleCellAverage8(vec2 cellMin, vec2 cellSize)
{
  vec3 sum = vec3(0.0);
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.25, 0.25), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.75, 0.25), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.25, 0.75), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.75, 0.75), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.50, 0.20), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.50, 0.80), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.20, 0.50), vec2(0.0), vec2(1.0)), 0.0).rgb;
  sum += textureLod(uTexture, clamp(cellMin + cellSize * vec2(0.80, 0.50), vec2(0.0), vec2(1.0)), 0.0).rgb;
  return sum * 0.125;
}

vec3 sampleBaseSourceColorAtCell(vec2 cell)
{
  vec2 safeTargetSize = max(uTargetSize, vec2(1.0));
  vec2 uv = targetCellUv(cell);
  if (uSamplingMode < 0.5) {
    return textureLod(uTexture, uv, 0.0).rgb;
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

void main()
{
  vec2 cell = min(floor(vTextureCoord * uTargetSize), uTargetSize - 1.0);
  vec2 block = vec2(floor(cell.x / 8.0) * 8.0, cell.y);
  vec3 pixels[8];
  for (int x = 0; x < 8; x++) {
    pixels[x] = sampleBaseSourceColorAtCell(block + vec2(float(x), 0));
  }
  // Exhaustively score all distinct opaque color pairs. Strict MSX1 skips
  // transparent code 0; Extended 32 uses it as an additional opaque gray.
  float diffusion = clamp(uDitherStrength, 0.0, 1.0);
  float bestScore = 1e20;
  vec3 background = vec3(0), foreground = vec3(0);
  bool extended = uPaletteMode > 11.5;
  int colorCount = extended ? 32 : 16;
  int firstColor = extended ? 0 : 1;
  int visibleColors = colorCount - firstColor;
  int pairCount = visibleColors * (visibleColors - 1) / 2;
  int a = firstColor;
  int b = a + 1;
  // Uniform-dependent trip count, one pair loop rather than nested 32×32
  // loops. Keep exhaustive selection/order but avoid a huge static HLSL body.
  for (int pair = 0; pair < pairCount; pair++) {
    vec3 ca = PALETTE[a] / 255.0, cb = PALETTE[b] / 255.0;
    vec3 axis = cb - ca;
    float axisLength = dot(axis, axis);
    // Prefer nearby endpoints when equally accurate mixtures are available.
    // Otherwise a flat gray can choose black/white and make sparse dark rows.
    float score = diffusion * axisLength * 0.001;
    for (int x = 0; x < 8; x++) {
      vec3 c = pixels[x];
      float nearestError = min(colorError(c - ca), colorError(c - cb));
      // With diffusion, score representable mixtures as well. A small
      // nearest-error penalty breaks ties in favor of less noisy pairs.
      float t = clamp(dot(c - ca, axis) / axisLength, 0.0, 1.0);
      float mixtureError = colorError(c - mix(ca, cb, t));
      score += mix(nearestError, mixtureError + nearestError * 0.05, diffusion);
    }
    if (score < bestScore) {
      bestScore = score; background = ca; foreground = cb;
    }
    b++;
    if (b >= colorCount) { a++; b = a + 1; }
  }
  // Each fragment computes its bit of the row's 8-bit 1bpp pattern, MSB
  // first. Diffuse vertically: flat tones alternate whole scanlines rather
  // than repeating the same alternating columns on every row.
  // Replay at most eight source rows using THIS row's selected pair. This is
  // local vertical diffusion, not a dependency on preceding output rows,
  // which may select different pairs. No frame history or readback is needed.
  int x = int(mod(cell.x, 8.0));
  bool bit = colorError(pixels[x] - foreground) < colorError(pixels[x] - background);
  if (diffusion > 0.0) {
    vec3 axis = foreground - background;
    float axisLength = dot(axis, axis);
    float bandStart = floor(cell.y / 8.0) * 8.0;
    float residual = 0.0;
    for (int y = 0; y < 8; y++) {
      float row = bandStart + float(y);
      if (row > cell.y) break;
      vec3 source = row == cell.y ? pixels[x]
        : sampleBaseSourceColorAtCell(vec2(block.x + float(x), row));
      // Only the component along the pair's color axis affects the choice.
      // Clamp to its representable segment to preserve exact endpoints.
      float coverage = clamp(dot(source - background, axis) / axisLength, 0.0, 1.0);
      float corrected = coverage + residual * diffusion;
      bit = corrected > 0.5;
      residual = corrected - (bit ? 1.0 : 0.0);
    }
  }
  uint shift = uint(7 - x);
  uint pattern = 0u;
  if (bit) pattern |= 1u << shift;
  finalColor = vec4(((pattern >> shift) & 1u) != 0u ? foreground : background, 1);
}
`;
