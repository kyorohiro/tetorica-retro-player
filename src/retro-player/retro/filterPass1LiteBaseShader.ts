import { FILTER_FRAGMENT_PASS1_LITE } from "./filterPass1LiteShader";

const removeUniformLine = (source: string, uniformName: string): string =>
  source.replace(`uniform float ${uniformName};\n`, "");

const removeBetween = (source: string, startMarker: string, endMarker: string): string => {
  const start = source.indexOf(startMarker);
  if (start < 0) {
    return source;
  }
  const end = source.indexOf(endMarker, start);
  if (end < 0) {
    return source;
  }
  return source.slice(0, start) + source.slice(end);
};

const withoutCompositeUniforms = [
  "uCompositeEnabled",
  "uCompositeAmount",
  "uCompositeChromaBlur",
  "uCompositeChromaDelay",
  "uCompositeNoise",
].reduce(
  (source, uniformName) => removeUniformLine(source, uniformName),
  FILTER_FRAGMENT_PASS1_LITE,
);

const withoutCompositeFunction = removeBetween(
  withoutCompositeUniforms,
  "vec3 applyCompositeNtsc(vec2 cell, vec3 centerColor)\n",
  "\nvec3 nearestColorAnime(vec3 color)\n",
);

export const FILTER_FRAGMENT_PASS1_LITE_BASE = withoutCompositeFunction.replace(
  "  sourceColor = applyCompositeNtsc(cell, sourceColor);\n",
  "",
);
