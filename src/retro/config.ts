export type PaletteMode = "free" | "pc98" | "color32" | "color64" | "mono";
export type MonoTintMode = "gray" | "green" | "amber" | "ice";

export const MONO_TINTS: Record<
  MonoTintMode,
  { label: string; rgb: [number, number, number] }
> = {
  gray: { label: "Gray", rgb: [1, 1, 1] },
  green: { label: "Green", rgb: [0.72, 1, 0.58] },
  amber: { label: "Amber", rgb: [1, 0.82, 0.45] },
  ice: { label: "Ice", rgb: [0.7, 0.9, 1] },
};

export const RETRO_PRESETS = {
  chunky: {
    label: "Chunky",
    width: 256,
    height: 192,
    colors: 8,
    dither: 0.2,
    palette: "free",
    scanline: 0.08,
    scanline2: 0.0,
    vignette: 0.04,
    phosphor: 0.03,
    monoTint: "gray",
  },
  arcade: {
    label: "Arcade",
    width: 320,
    height: 224,
    colors: 12,
    dither: 0.28,
    palette: "free",
    scanline: 0.14,
    scanline2: 0.0,
    vignette: 0.08,
    phosphor: 0.05,
    monoTint: "gray",
  },
  pc98: {
    label: "PC-98",
    width: 640,
    height: 400,
    colors: 16,
    dither: 0.35,
    palette: "pc98",
    scanline: 0.09,
    scanline2: 0.0,
    vignette: 0.06,
    phosphor: 0.04,
    monoTint: "gray",
  },
  color32: {
    label: "Color 32",
    width: 320,
    height: 200,
    colors: 32,
    dither: 0.24,
    palette: "color32",
    scanline: 0.08,
    scanline2: 0.0,
    vignette: 0.05,
    phosphor: 0.03,
    monoTint: "gray",
  },
  color64: {
    label: "Color 64",
    width: 320,
    height: 200,
    colors: 64,
    dither: 0.2,
    palette: "color64",
    scanline: 0.07,
    scanline2: 0.0,
    vignette: 0.04,
    phosphor: 0.03,
    monoTint: "gray",
  },
  monochrome: {
    label: "Mono",
    width: 640,
    height: 400,
    colors: 4,
    dither: 0.18,
    palette: "mono",
    scanline: 0.1,
    scanline2: 0.0,
    vignette: 0.08,
    phosphor: 0.02,
    monoTint: "gray",
  },
  greenTerminal: {
    label: "Green Terminal",
    width: 640,
    height: 400,
    colors: 4,
    dither: 0.14,
    palette: "mono",
    scanline: 0.12,
    scanline2: 0.0,
    vignette: 0.1,
    phosphor: 0.06,
    monoTint: "green",
  },
  amberCrt: {
    label: "Amber CRT",
    width: 640,
    height: 400,
    colors: 4,
    dither: 0.16,
    palette: "mono",
    scanline: 0.14,
    scanline2: 0.0,
    vignette: 0.11,
    phosphor: 0.05,
    monoTint: "amber",
  },
  lcdIce: {
    label: "LCD Ice",
    width: 480,
    height: 300,
    colors: 5,
    dither: 0.1,
    palette: "mono",
    scanline: 0.03,
    scanline2: 0.0,
    vignette: 0.03,
    phosphor: 0.01,
    monoTint: "ice",
  },
} as const satisfies Record<
  string,
  {
    label: string;
    width: number;
    height: number;
    colors: number;
    dither: number;
    palette: PaletteMode;
    scanline: number;
    scanline2: number;
    vignette: number;
    phosphor: number;
    monoTint: MonoTintMode;
  }
>;

export type RetroPresetKey = keyof typeof RETRO_PRESETS;

export const paletteModeToUniform = (mode: PaletteMode) => {
  if (mode === "pc98") return 1;
  if (mode === "color32") return 2;
  if (mode === "color64") return 3;
  if (mode === "mono") return 4;

  return 0;
};
