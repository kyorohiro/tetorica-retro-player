import { FILTER_FRAGMENT_PASS1_PC98_LITE } from "./filterPass1Pc98LiteShader";

const SAMPLING_UNIFORM = "uniform float uSamplingMode;\n";

const SAMPLING_FUNCTIONS = `vec2 targetCellUv(vec2 cell)
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
`;

const NEAREST_FUNCTIONS = `vec2 targetCellUv(vec2 cell)
{
  return clamp((cell + 0.5) / max(uTargetSize, vec2(1.0)), vec2(0.0), vec2(1.0));
}

vec3 sampleBaseSourceColorAtCell(vec2 cell)
{
  return texture(uTexture, targetCellUv(cell)).rgb;
}
`;

export const FILTER_FRAGMENT_PASS1_PC98_LITE_NEAREST = FILTER_FRAGMENT_PASS1_PC98_LITE
  .replace(SAMPLING_UNIFORM, "")
  .replace(SAMPLING_FUNCTIONS, NEAREST_FUNCTIONS);
