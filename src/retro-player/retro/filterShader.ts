export const FILTER_VERTEX = `#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition(void)
{
  vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

  position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
  position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

  return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(void)
{
  return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
  gl_Position = filterVertexPosition();
  vTextureCoord = filterTextureCoord();
  vMaskCoord = aPosition;
}
`;

export const FILTER_FRAGMENT = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uPaletteMode;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uVignetteStrength;
uniform float uPhosphorStrength;
uniform vec3 uMonoTint;
uniform float uTime;

float bayer4x4(vec2 pos)
{
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = x + y * 4;

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
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 quantizePc98_4096(vec3 color)
{
  return floor(color * 15.0 + 0.5) / 15.0;
}

vec3 quantizePc98_512(vec3 color)
{
  return floor(color * 7.0 + 0.5) / 7.0;
}

vec3 color32Palette(float index)
{
  float r = mod(index, 4.0);
  float g = mod(floor(index / 4.0), 4.0);
  float b = mod(floor(index / 16.0), 2.0);

  return vec3(r / 3.0, g / 3.0, b);
}

vec3 nearestColor32(vec3 color)
{
  vec3 best = color32Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 32; i++) {
    vec3 candidate = color32Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 color64Palette(float index)
{
  float r = mod(index, 4.0);
  float g = mod(floor(index / 4.0), 4.0);
  float b = mod(floor(index / 16.0), 4.0);

  return vec3(r / 3.0, g / 3.0, b / 3.0);
}

vec3 nearestColor64(vec3 color)
{
  vec3 best = color64Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 64; i++) {
    vec3 candidate = color64Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 monochromePalette(vec3 color, float levels, vec3 tint)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);

  return mix(vec3(0.0), tint, stepped);
}

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;

  centered += centered * offset * strength;

  return centered * 0.5 + 0.5;
}

float roundedScreenMask(vec2 uv, float curvature)
{
  vec2 centered = abs(uv - vec2(0.5)) * 2.0;

  vec2 radius = vec2(0.92);
  vec2 corner = max(centered - radius, 0.0);
  float edge = length(corner);

  return 1.0 - smoothstep(0.0, 0.08, edge);
}

float glassHighlight(vec2 uv, float curvature)
{
  vec2 glareUv = uv - vec2(0.24, 0.18);
  float streak = exp(-dot(glareUv, glareUv * vec2(5.0, 28.0)));
  float sweep = exp(-pow((uv.x + uv.y * 0.55) - 0.34, 2.0) * 24.0);

  return (streak * 0.75 + sweep * 0.25) * (0.03 + curvature * 0.22);
}

void main(void)
{
  vec2 warpedMask = curveUv(vMaskCoord, uCurvature);
  vec2 delta = warpedMask - vMaskCoord;
  vec2 curvedUv = vTextureCoord + delta;
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 cell = floor(curvedUv * uTargetSize);
  vec2 pixelatedUv = (cell + 0.5) / uTargetSize;
  pixelatedUv = clamp(pixelatedUv, vec2(0.0), vec2(1.0));

  vec4 color = texture(uTexture, pixelatedUv);
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color.rgb = clamp(color.rgb + dither, 0.0, 1.0);

  if (uPaletteMode < 0.5) {
    color.rgb = floor(color.rgb * (uColorLevels - 1.0) + 0.5) / max(uColorLevels - 1.0, 1.0);
  } else if (uPaletteMode < 1.5) {
    color.rgb = nearestPc98(color.rgb);
  } else if (uPaletteMode < 2.5) {
    color.rgb = quantizePc98_512(color.rgb);
  } else if (uPaletteMode < 3.5) {
    color.rgb = quantizePc98_4096(color.rgb);
  } else if (uPaletteMode < 4.5) {
    color.rgb = nearestColor32(color.rgb);
  } else if (uPaletteMode < 5.5) {
    color.rgb = nearestColor64(color.rgb);
  }

  if (uPaletteMode > 5.5) {
    color.rgb = monochromePalette(color.rgb, max(uColorLevels, 2.0), uMonoTint);
  }

  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * uScanlineStrength);

  float scanline2 = sin((vTextureCoord.y + uTime * 0.05) * 720.0) * uScanline2Strength;
  color.rgb += scanline2;

  float phosphor = sin(pixelatedUv.x * uTargetSize.x * 6.2831853) * 0.5 + 0.5;
  color.rgb *= 1.0 + ((phosphor - 0.5) * uPhosphorStrength);

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;

  //float screenMask = roundedScreenMask(vMaskCoord, 0.05);
  //color.rgb *= screenMask;

  //float highlight = glassHighlight(vMaskCoord, uCurvature) * screenMask;
  //color.rgb += vec3(highlight);

  color.rgb = clamp(color.rgb, 0.0, 1.0);

  finalColor = color;
}
`;
