export const FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE = `#version 300 es
precision mediump float;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uPass1Texture;
uniform vec2 uTargetSize;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;
uniform float uVignetteStrength;
uniform float uPhosphorStrength;
uniform float uSpotMaskStrength;
uniform float uBulbRadius;
uniform float uBlackFloor;
uniform float uTime;

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

vec3 applySpotMask(vec3 color, vec2 curvedUv, vec2 targetSize, float amount)
{
  if (amount <= 0.0) return color;
  float brightness = max(max(color.r, color.g), color.b);
  vec2 cellUv = fract(curvedUv * targetSize) - 0.5;
  float dist = length(cellUv);
  float bulb = 1.0 - smoothstep(uBulbRadius * 0.25, uBulbRadius * 0.95 + 0.02, dist);
  float halo = 1.0 - smoothstep(uBulbRadius * 0.55, uBulbRadius * 1.2 + 0.08, dist);
  float emission = bulb * (0.75 + brightness * 0.35) + halo * halo * (0.04 + brightness * 0.08);
  vec3 masked = color * emission * amount;
  masked += color * (uBlackFloor * amount * (1.0 - bulb));
  return masked;
}

void main(void)
{
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 cell = floor(curvedUv * uTargetSize);
  vec2 pixelatedUv = clamp((cell + 0.5) / uTargetSize, vec2(0.0), vec2(1.0));
  vec4 color = texture(uPass1Texture, pixelatedUv);

  float brightness = max(max(color.r, color.g), color.b);
  float visibility = mix(1.0, 1.0 - brightness, uScanlineBrightnessFade);
  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * (uScanlineStrength + uPhosphorStrength * 0.12) * visibility);

  float scanline2 =
    sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
    uScanline2Strength *
    visibility;
  color.rgb += vec3(scanline2);

  if (uPhosphorStrength > 0.001) {
    float phosphorPhase = pixelatedUv.x * uTargetSize.x * 6.2831853;
    vec3 phosphorTriad = vec3(
      sin(phosphorPhase) * 0.5 + 0.5,
      sin(phosphorPhase + 2.0943951) * 0.5 + 0.5,
      sin(phosphorPhase + 4.1887902) * 0.5 + 0.5
    );
    phosphorTriad = mix(vec3(0.5), phosphorTriad, 0.7);
    color.rgb *= mix(vec3(1.0), 0.82 + phosphorTriad * 0.42, uPhosphorStrength);
  }

  if (uSpotMaskStrength > 0.001) {
    color.rgb = applySpotMask(color.rgb, curvedUv, uTargetSize, uSpotMaskStrength);
  }

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;

  finalColor = vec4(clamp(color.rgb, 0.0, 1.0), 1.0);
}
`;
