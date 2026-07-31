import { composeNearestOnlyPass1Shader } from "./filterShaderComposer";
import { FILTER_FRAGMENT_PASS1_PC98_LITE } from "./filterPass1Pc98LiteShader";

export const FILTER_FRAGMENT_PASS1_PC98_LITE_NEAREST =
  composeNearestOnlyPass1Shader(FILTER_FRAGMENT_PASS1_PC98_LITE);
