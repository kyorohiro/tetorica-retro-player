import esbuild from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const configPath = path.join("src", "retro-player", "retro", "config.ts");
const settingsPath = path.join("extension", "shared", "settings.js");

// The extension's shader pipeline does not implement the "focus" (tilt-shift
// blur) uniforms yet (uFocusStrength / uFocusCenter / uFocusSize are absent
// from extension/shared/filterPass2Shader.js), so those fields are skipped.
const FIELD_MAP = {
  label: "label",
  width: "targetWidth",
  height: "targetHeight",
  colors: "colorLevels",
  dither: "ditherStrength",
  palette: "paletteMode", // converted via paletteModeToUniform
  curvature: "curvature",
  scanline: "scanlineStrength",
  scanline2: "scanline2Strength",
  vignette: "vignetteStrength",
  glow: "glowStrength",
  smoothStrength: "smoothStrength",
  toonSteps: "toonSteps",
  edgeBoost: "edgeBoost",
  animeEdgeLow: "animeEdgeLow",
  animeEdgeHigh: "animeEdgeHigh",
  phosphor: "phosphorStrength",
  spotMask: "spotMaskStrength",
  bulbRadius: "bulbRadius",
  blackFloor: "blackFloor",
  lumaAmount: "lumaAmount",
  lumaLow: "lumaLow",
  lumaHigh: "lumaHigh",
  lumaKnee: "lumaKnee",
  saturationAmount: "saturationAmount",
  saturationLow: "saturationLow",
  saturationHigh: "saturationHigh",
  saturationKnee: "saturationKnee",
  phosphorDotLightBalance: "phosphorDotLightBalance",
  phosphorDotInternalScale: "phosphorDotInternalScale",
  phosphorDotBrightCore: "phosphorDotBrightCore",
  phosphorDotCellFill: "phosphorDotCellFill",
  phosphorDotFlatDisc: "phosphorDotFlatDisc",
  phosphorDotNeighborBlend: "phosphorDotNeighborBlend",
  closeUpNoiseStrength: "closeUpNoiseStrength",
  scanlineBrightnessFade: "scanlineBrightnessFade",
  monoTint: "monoTint",
  neonBoost: "neonBoost",
  neonSaturation: "neonSaturation",
  neonDetail: "neonDetail",
};

// Audio fields the extension bundles into each video preset. Main app has no
// equivalent concept, so new presets fall back to these (matching
// DEFAULT_SETTINGS), and existing presets keep whatever was already there.
const AUDIO_FIELD_DEFAULTS = {
  isAudioFxEnabled: false,
  lofiAmount: 0.0,
  wowFlutterAmount: 0.0,
  isNoiseEnabled: false,
  noiseLevel: 0.0,
};

async function loadTsModule(tsPath) {
  const source = fs.readFileSync(tsPath, "utf-8");
  const { code } = esbuild.transformSync(source, { loader: "ts", format: "esm" });
  const tmpFile = path.join(os.tmpdir(), `tetorica-config-${Date.now()}-${Math.random().toString(36).slice(2)}.mjs`);
  fs.writeFileSync(tmpFile, code);
  try {
    return await import(`file://${tmpFile}`);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

async function loadPlainModule(jsPath) {
  const absPath = path.resolve(jsPath);
  return import(`file://${absPath}?t=${Date.now()}`);
}

function paletteModeToUniform(mode) {
  if (mode === "pc98") return 1;
  if (mode === "pc98_tile") return 2;
  if (mode === "pc98_512") return 3;
  if (mode === "pc98_512_sat") return 4;
  if (mode === "pc98_4096") return 5;
  if (mode === "color32") return 6;
  if (mode === "color64") return 7;
  if (mode === "mono") return 8;
  if (mode === "neon") return 9;
  if (mode === "anime") return 10;
  return 0;
}

function mapPreset(mainPreset, existingExtPreset) {
  const mapped = {};
  for (const [mainKey, extKey] of Object.entries(FIELD_MAP)) {
    if (!(mainKey in mainPreset)) continue;
    const value = mainPreset[mainKey];
    mapped[extKey] = mainKey === "palette" ? paletteModeToUniform(value) : value;
  }

  const audio = {};
  for (const key of Object.keys(AUDIO_FIELD_DEFAULTS)) {
    audio[key] = existingExtPreset?.[key] ?? AUDIO_FIELD_DEFAULTS[key];
  }

  // Preserve any other extension-only fields verbatim (e.g. phosphorDotMode).
  const extras = {};
  if (existingExtPreset) {
    for (const [key, value] of Object.entries(existingExtPreset)) {
      if (key in mapped || key in audio) continue;
      extras[key] = value;
    }
  }

  return { ...mapped, ...extras, ...audio };
}

function serializePreset(preset) {
  const lines = Object.entries(preset).map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`);
  return `{\n${lines.join("\n")}\n  },`;
}

async function main() {
  const { RETRO_PRESETS, defaultPresetId } = await loadTsModule(configPath);
  const { PRESETS: existingPresets } = await loadPlainModule(settingsPath);

  const orderedKeys = Object.keys(RETRO_PRESETS);
  const generatedEntries = orderedKeys.map((key) => {
    const merged = mapPreset(RETRO_PRESETS[key], existingPresets[key]);
    return `  ${key}: ${serializePreset(merged)}`;
  });

  const newPresetsBlock = `export const PRESETS = {\n${generatedEntries.join("\n")}\n};`;

  const settingsSource = fs.readFileSync(settingsPath, "utf-8");
  const blockRegex = /export const PRESETS = \{[\s\S]*?\n\};/;
  if (!blockRegex.test(settingsSource)) {
    throw new Error("Could not locate `export const PRESETS = { ... };` block in settings.js");
  }
  const defaultKeyRegex = /export const DEFAULT_PRESET_KEY = "[^"]*";/;
  if (!defaultKeyRegex.test(settingsSource)) {
    throw new Error("Could not locate `export const DEFAULT_PRESET_KEY = \"...\";` in settings.js");
  }

  const updatedSource = settingsSource
    .replace(blockRegex, newPresetsBlock)
    .replace(defaultKeyRegex, `export const DEFAULT_PRESET_KEY = "${defaultPresetId}";`);
  fs.writeFileSync(settingsPath, updatedSource);

  const missingInExtensionBefore = orderedKeys.filter((key) => !(key in existingPresets));
  console.log(`generated ${settingsPath}: ${orderedKeys.length} presets from ${configPath}`);
  if (missingInExtensionBefore.length > 0) {
    console.log(`  added new preset(s): ${missingInExtensionBefore.join(", ")}`);
  }
  console.log(`  default preset key (config.ts): ${defaultPresetId}`);
}

await main();
