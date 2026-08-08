export const FILTER_FRAGMENT_PASS_COMPOSITE_MID = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uSamplingMode;
uniform float uCompositeAmount;
uniform float uCompositeChromaBlur;
uniform float uCompositeChromaDelay;
uniform float uCompositeNoise;
uniform float uTime;

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

vec3 sampleSourceColorAtCell(vec2 cell)
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
  return sampleCellAverage8(cellMin, cellSize);
}

vec3 rgbToYiq(vec3 color)
{
  return vec3(
    dot(color, vec3(0.299, 0.587, 0.114)),
    dot(color, vec3(0.596, -0.275, -0.321)),
    dot(color, vec3(0.212, -0.523, 0.311))
  );
}

vec3 yiqToRgb(vec3 yiq)
{
  return vec3(
    yiq.x + 0.956 * yiq.y + 0.621 * yiq.z,
    yiq.x - 0.272 * yiq.y - 0.647 * yiq.z,
    yiq.x - 1.106 * yiq.y + 1.703 * yiq.z
  );
}

float hash12(vec2 p)
{
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 applyCompositeNtsc(vec2 cell, vec3 centerColor)
{
  if (uCompositeAmount <= 0.001) {
    return centerColor;
  }

  vec3 centerYiq = rgbToYiq(centerColor);
  vec3 left1Yiq = rgbToYiq(sampleSourceColorAtCell(cell + vec2(-1.0, 0.0)));
  vec3 right1Yiq = rgbToYiq(sampleSourceColorAtCell(cell + vec2(1.0, 0.0)));
  vec3 left2Yiq = rgbToYiq(sampleSourceColorAtCell(cell + vec2(-2.0, 0.0)));
  vec3 right2Yiq = rgbToYiq(sampleSourceColorAtCell(cell + vec2(2.0, 0.0)));
  vec3 left3Yiq = rgbToYiq(sampleSourceColorAtCell(cell + vec2(-3.0, 0.0)));
  vec3 right3Yiq = rgbToYiq(sampleSourceColorAtCell(cell + vec2(3.0, 0.0)));

  float blur = clamp(uCompositeChromaBlur, 0.0, 1.0);
  float delay = clamp(uCompositeChromaDelay, -1.0, 1.0);
  float amount = clamp(uCompositeAmount, 0.0, 1.0);
  float frame = floor(uTime * 60.0);
  float frameMed = floor(uTime * 19.0);
  float frameSlow = floor(uTime * 7.0);
  float linePhase = hash12(vec2(cell.y * 0.73 + 19.0, frame * 0.19 + frameSlow * 0.61)) - 0.5;
  float lineDrift = hash12(vec2(cell.y * 1.91 + 7.0, frameSlow + 41.0)) - 0.5;
  float lineBurst = hash12(vec2(cell.y * 3.17 + 3.0, frameMed + 113.0)) - 0.5;
  float chromaJitter = hash12(cell + vec2(frame * 0.618, frameMed * 1.731)) - 0.5;
  float jitterBurst = hash12(cell.yx + vec2(frameMed * 0.37, frameSlow * 2.13)) - 0.5;
  delay = clamp(delay + (chromaJitter * 0.1 + jitterBurst * 0.06) * amount, -1.0, 1.0);
  blur = clamp(blur + (linePhase * 0.032 + lineDrift * 0.022 + lineBurst * 0.018) * amount, 0.0, 1.0);

  vec2 preferredDir = delay >= 0.0 ? vec2(1.0, 0.0) : vec2(-1.0, 0.0);
  vec3 delayNearYiq = rgbToYiq(sampleSourceColorAtCell(cell + preferredDir));
  vec3 delayFarYiq = rgbToYiq(sampleSourceColorAtCell(cell + preferredDir * 2.0));
  vec3 delayFartherYiq = rgbToYiq(sampleSourceColorAtCell(cell + preferredDir * 3.0));
  vec3 ghostNearYiq = rgbToYiq(sampleSourceColorAtCell(cell + preferredDir * 4.0));
  vec3 ghostFarYiq = rgbToYiq(sampleSourceColorAtCell(cell + preferredDir * 6.0));
  vec2 chromaCenter = centerYiq.yz;
  vec2 chromaBlurred =
    chromaCenter * (1.0 - blur * 1.15) +
    (left1Yiq.yz + right1Yiq.yz) * (0.32 * blur) +
    (left2Yiq.yz + right2Yiq.yz) * (0.16 * blur) +
    (left3Yiq.yz + right3Yiq.yz) * (0.08 * blur);
  vec2 delayedChroma = mix(chromaBlurred, delayNearYiq.yz, abs(delay) * 0.95);
  delayedChroma = mix(delayedChroma, delayFarYiq.yz, abs(delay) * 0.55);
  delayedChroma = mix(delayedChroma, delayFartherYiq.yz, abs(delay) * 0.28);

  float chromaNoise = (hash12(
    cell + vec2(centerYiq.x, delayedChroma.x) * 97.0 + vec2(frame * 0.11, frame * 0.07)
  ) - 0.5) * 0.14 * clamp(uCompositeNoise, 0.0, 1.0);
  delayedChroma += vec2(chromaNoise, -chromaNoise * 0.85);

  float lumaEdge = abs(right1Yiq.x - left1Yiq.x) + abs(right2Yiq.x - left2Yiq.x) * 0.5;
  float chromaCross = smoothstep(0.04, 0.32, lumaEdge) * (0.04 + blur * 0.1) * amount;
  float subcarrierFlip = hash12(vec2(cell.y * 2.0 + mod(cell.x, 4.0), frameMed + 211.0)) > 0.5 ? 1.0 : -1.0;
  vec2 crawlTint = vec2(
    hash12(cell + vec2(frame * 0.23, 17.0)),
    hash12(cell.yx + vec2(frame * 0.17, 53.0))
  ) - 0.5;
  crawlTint *= chromaCross * vec2(1.0, 0.85) * subcarrierFlip;
  delayedChroma += crawlTint;

  float lumaLeak = 0.18 * amount;
  float compositeLuma =
    centerYiq.x * (1.0 - lumaLeak) +
    (left1Yiq.x + right1Yiq.x) * (0.36 * lumaLeak) +
    (left2Yiq.x + right2Yiq.x) * (0.14 * lumaLeak);
  float chromaMagnitude = length(delayedChroma);
  compositeLuma +=
    (hash12(cell + vec2(frame * 0.19, chromaMagnitude * 23.0)) - 0.5) *
    smoothstep(0.08, 0.45, chromaMagnitude) *
    0.035 *
    amount;

  vec3 compositeRgb = yiqToRgb(vec3(compositeLuma, delayedChroma));
  vec3 bleedRgb = yiqToRgb(vec3(centerYiq.x, delayedChroma));
  float ghostStrength = amount * (0.035 + clamp(uCompositeNoise, 0.0, 1.0) * 0.08 + abs(delay) * 0.03);
  vec3 ghostRgb =
    yiqToRgb(vec3(ghostNearYiq.x, ghostNearYiq.yz)) * 0.7 +
    yiqToRgb(vec3(ghostFarYiq.x, ghostFarYiq.yz)) * 0.3;
  vec3 pushedRgb = mix(compositeRgb, bleedRgb, 0.42 + blur * 0.2);
  pushedRgb += ghostRgb * ghostStrength;
  return clamp(mix(centerColor, pushedRgb, amount * 0.95), 0.0, 1.0);
}

void main(void)
{
  vec2 cell = floor(vTextureCoord * uTargetSize);
  vec3 sourceColor = sampleSourceColorAtCell(cell);
  finalColor = vec4(applyCompositeNtsc(cell, sourceColor), 1.0);
}
`;
