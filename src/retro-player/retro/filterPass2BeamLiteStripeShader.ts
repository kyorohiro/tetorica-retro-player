export const FILTER_FRAGMENT_PASS2_BEAM_LITE_STRIPE = `#version 300 es
precision highp float;
precision highp int;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uBeamKernelTexture;
uniform vec2 uOutputSize;
uniform vec2 uDisplaySize;
uniform vec2 uBeamSourceSize;
uniform float uCurvature;
uniform float uBeamStripeStrength;
uniform float uBeamWhiteBloom;
uniform float uBeamWarmBloom;
uniform float uBeamStripeMode;

const float BEAM_LIGHTMASK_LOW = 0.025;
const float BEAM_LIGHTMASK_HIGH = 0.23;
const float BEAM_FIELD_BASE = 0.095;
const float BEAM_FIELD_LIGHT_GAIN = 0.04;
const float BEAM_STRIPE_GLOW_BASE = 0.08;
const float BEAM_STRIPE_GLOW_LIGHT_GAIN = 0.18;
const float BEAM_STRIPE_BLEED_BASE = 0.10;
const float BEAM_STRIPE_BLEED_LIGHT_GAIN = 0.14;
const float BEAM_MERGED_FLARE_BASE = 0.14;
const float BEAM_MERGED_FLARE_LIGHT_GAIN = 0.19;
const float BEAM_WHITE_BLOOM_GAIN = 0.15;

vec2 curveUv(vec2 uv, float strength) {
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;
  centered += centered * offset * strength;
  return centered * 0.5 + 0.5;
}

float getBeamStripeStrength() { return clamp(uBeamStripeStrength, 0.0, 2.0); }
float getBeamWhiteBloom() { return clamp(uBeamWhiteBloom, 0.0, 2.0); }
float getBeamWarmBloom() { return clamp(uBeamWarmBloom, 0.0, 1.5); }

void sampleBeamStripeMasks(vec2 uv, vec2 sourceSize, out vec3 stripeMask, out vec3 bleedMask) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 cellCoord = uv * safeSourceSize;
  bool useModernStripe = uBeamStripeMode > 0.5;
  float stripeCoordX = useModernStripe ? cellCoord.x : cellCoord.x * 3.0;
  float cellIndex = floor(cellCoord.x);
  float staggerShift = mod(cellIndex, 2.0) * (useModernStripe ? 0.0 : 0.28);
  vec2 local = fract(vec2(stripeCoordX, cellCoord.y + staggerShift));
  float stripeWidth = useModernStripe ? 0.105 : 0.15;
  float bleedWidth = useModernStripe ? 0.145 : 0.21;
  float stripeR = (local.x - 1.0 / 6.0) / stripeWidth;
  float stripeG = (local.x - 0.5) / stripeWidth;
  float stripeB = (local.x - 5.0 / 6.0) / stripeWidth;
  vec3 stripeBars = exp(-vec3(stripeR * stripeR, stripeG * stripeG, stripeB * stripeB));
  float bleedR = (local.x - 1.0 / 6.0) / bleedWidth;
  float bleedG = (local.x - 0.5) / bleedWidth;
  float bleedB = (local.x - 5.0 / 6.0) / bleedWidth;
  vec3 bleedBars = exp(-vec3(bleedR * bleedR, bleedG * bleedG, bleedB * bleedB));
  float flatBody = useModernStripe
    ? smoothstep(0.06, 0.12, local.y) * (1.0 - smoothstep(0.88, 0.94, local.y))
    : smoothstep(0.01, 0.1, local.y) * (1.0 - smoothstep(0.9, 0.99, local.y));
  float roundedCapsCoord = (local.y - 0.5) / (useModernStripe ? 0.52 : 0.62);
  float roundedCaps = exp(-(roundedCapsCoord * roundedCapsCoord));
  float verticalShape = useModernStripe
    ? clamp(flatBody * 0.94 + roundedCaps * 0.04, 0.0, 1.0)
    : clamp(flatBody * 0.48 + roundedCaps * 0.68, 0.0, 1.0);
  float softVerticalCoord = (local.y - 0.5) / (useModernStripe ? 0.44 : 1.22);
  float softVertical = exp(-(softVerticalCoord * softVerticalCoord));
  stripeMask = clamp(stripeBars * verticalShape, 0.0, 1.0);
  bleedMask = clamp(bleedBars * softVertical, 0.0, 1.0);
}

float getBeamStripeResolve(vec2 sourceSize) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 visibleSize = max(min(uDisplaySize, uOutputSize), vec2(1.0));
  float pixelsPerCellX = visibleSize.x / safeSourceSize.x;
  float pixelsPerCellY = visibleSize.y / safeSourceSize.y;
  bool useModernStripe = uBeamStripeMode > 0.5;
  float subpixelPixels = min(useModernStripe ? pixelsPerCellX : pixelsPerCellX / 3.0, pixelsPerCellY);
  return clamp(smoothstep(3.0, 4.5, subpixelPixels), 0.0, 1.0);
}

vec3 sampleBeamMergedMask(vec2 uv, vec2 sourceSize, float sigmaX, float sigmaY) {
  vec2 safeSourceSize = max(sourceSize, vec2(1.0));
  vec2 cellCoord = uv * safeSourceSize;
  vec2 local = fract(cellCoord);
  float dx = (local.x - 0.5) / max(sigmaX, 0.0001);
  float dy = (local.y - 0.5) / max(sigmaY, 0.0001);
  float mask = clamp(exp(-(dx * dx + dy * dy)), 0.0, 1.0);
  return vec3(mask);
}

void main(void) {
  vec2 curvedUv = curveUv(vTextureCoord, uCurvature);
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 sourceSize = max(uBeamSourceSize, vec2(1.0));
  vec4 beamKernel = texture(uBeamKernelTexture, vTextureCoord);
  vec3 beamColor = beamKernel.rgb;
  float beamLuma = beamKernel.a;
  vec3 stripeMask;
  vec3 stripeBleedMask;
  sampleBeamStripeMasks(curvedUv, sourceSize, stripeMask, stripeBleedMask);
  float stripeResolve = getBeamStripeResolve(sourceSize);
  float mergedStripeMaskScalar = dot(stripeMask, vec3(1.0 / 3.0));
  float mergedBleedMaskScalar = dot(stripeBleedMask, vec3(1.0 / 3.0));
  vec3 mergedStripeMask = sampleBeamMergedMask(curvedUv, sourceSize, 0.48, 0.56);
  vec3 mergedBleedMask = sampleBeamMergedMask(curvedUv, sourceSize, 0.74, 1.08);
  stripeMask = mix(mergedStripeMask * mergedStripeMaskScalar, stripeMask, stripeResolve);
  stripeBleedMask = mix(mergedBleedMask * mergedBleedMaskScalar, stripeBleedMask, stripeResolve);
  float effectiveStripeStrength = getBeamStripeStrength() * mix(0.42, 1.0, stripeResolve);
  float lightMask = smoothstep(BEAM_LIGHTMASK_LOW, BEAM_LIGHTMASK_HIGH, beamLuma);
  vec3 beamField = beamColor * (BEAM_FIELD_BASE + lightMask * BEAM_FIELD_LIGHT_GAIN);
  vec3 stripeGlow = stripeMask * beamColor * (BEAM_STRIPE_GLOW_BASE + lightMask * BEAM_STRIPE_GLOW_LIGHT_GAIN) * effectiveStripeStrength;
  vec3 stripeBleed = stripeBleedMask * beamColor * (BEAM_STRIPE_BLEED_BASE + lightMask * BEAM_STRIPE_BLEED_LIGHT_GAIN) * effectiveStripeStrength;
  vec3 mergedFlare = beamColor * beamLuma * (BEAM_MERGED_FLARE_BASE + lightMask * BEAM_MERGED_FLARE_LIGHT_GAIN);
  vec3 whiteBloom = vec3(beamLuma) * lightMask * BEAM_WHITE_BLOOM_GAIN * getBeamWhiteBloom();
  vec3 warmBloom = vec3(1.0, 0.82, 0.30) * beamLuma * lightMask * BEAM_WHITE_BLOOM_GAIN * 0.55 * getBeamWhiteBloom() * getBeamWarmBloom();
  vec3 beamStripeColor = beamField + stripeGlow + stripeBleed + mergedFlare + whiteBloom + warmBloom;
  finalColor = vec4(clamp(beamStripeColor, 0.0, 1.0), beamLuma);
}
`;
