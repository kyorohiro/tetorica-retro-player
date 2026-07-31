import { composeNearestOnlyPass1Shader } from "./filterShaderComposer";
import { FILTER_FRAGMENT_PASS1_LITE_SIMPLE } from "./filterPass1LiteSimpleShader";

export const FILTER_FRAGMENT_PASS1_LITE_NEAREST =
  composeNearestOnlyPass1Shader(FILTER_FRAGMENT_PASS1_LITE_SIMPLE);
