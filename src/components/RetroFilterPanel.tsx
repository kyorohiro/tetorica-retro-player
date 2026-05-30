import {
  MONO_TINTS,
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "../retro/config";

type RetroFilterPanelProps = {
  colorLevels: number;
  ditherStrength: number;
  monoTint: MonoTintMode;
  paletteMode: PaletteMode;
  phosphorStrength: number;
  previewName: string;
  scanlineStrength: number;
  targetHeight: number;
  targetWidth: number;
  vignetteStrength: number;
  onApplyPreset: (preset: RetroPresetKey) => void;
  onSetColorLevels: (value: number) => void;
  onSetDitherStrength: (value: number) => void;
  onSetMonoTint: (value: MonoTintMode) => void;
  onSetPaletteMode: (value: PaletteMode) => void;
  onSetPhosphorStrength: (value: number) => void;
  onSetScanlineStrength: (value: number) => void;
  onSetTargetHeight: (value: number) => void;
  onSetTargetWidth: (value: number) => void;
  onSetVignetteStrength: (value: number) => void;
};

export function RetroFilterPanel({
  colorLevels,
  ditherStrength,
  monoTint,
  paletteMode,
  phosphorStrength,
  previewName,
  scanlineStrength,
  targetHeight,
  targetWidth,
  vignetteStrength,
  onApplyPreset,
  onSetColorLevels,
  onSetDitherStrength,
  onSetMonoTint,
  onSetPaletteMode,
  onSetPhosphorStrength,
  onSetScanlineStrength,
  onSetTargetHeight,
  onSetTargetWidth,
  onSetVignetteStrength,
}: RetroFilterPanelProps) {
  return (
    <>
      <p className="mt-2 break-all">
        {previewName || "動画、音声、画像がまだ選択されていません"}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(RETRO_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              onApplyPreset(key as RetroPresetKey);
            }}
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-slate-100 hover:bg-amber-500/20"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-slate-100">Palette</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["free", "pc98", "color32", "mono"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  onSetPaletteMode(mode);
                }}
                className={[
                  "rounded-lg border px-3 py-1.5 text-slate-100",
                  paletteMode === mode
                    ? "border-sky-400 bg-sky-500/20"
                    : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                ].join(" ")}
              >
                {mode === "free"
                  ? "Free"
                  : mode === "pc98"
                    ? "PC-98 16-color"
                    : mode === "color32"
                      ? "Color 32"
                      : "Monochrome"}
              </button>
            ))}
          </div>
        </label>

        {paletteMode === "mono" && (
          <label className="block">
            <span className="text-slate-100">Mono tint</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(MONO_TINTS).map(([key, tint]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onSetMonoTint(key as MonoTintMode);
                  }}
                  className={[
                    "rounded-lg border px-3 py-1.5 text-slate-100",
                    monoTint === key
                      ? "border-sky-400 bg-sky-500/20"
                      : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                  ].join(" ")}
                >
                  {tint.label}
                </button>
              ))}
            </div>
          </label>
        )}

        <label className="block">
          <span className="text-slate-100">Target width: {targetWidth}px</span>
          <input
            type="range"
            min="160"
            max="640"
            step="16"
            value={targetWidth}
            onChange={(ev) => {
              onSetTargetWidth(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">Target height: {targetHeight}px</span>
          <input
            type="range"
            min="100"
            max="400"
            step="8"
            value={targetHeight}
            onChange={(ev) => {
              onSetTargetHeight(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">Color levels: {colorLevels}</span>
          <input
            type="range"
            min="2"
            max="16"
            step="1"
            value={colorLevels}
            onChange={(ev) => {
              onSetColorLevels(Number(ev.currentTarget.value));
            }}
            disabled={paletteMode === "pc98" || paletteMode === "color32"}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            Bayer dither: {ditherStrength.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={ditherStrength}
            onChange={(ev) => {
              onSetDitherStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            Scanline: {scanlineStrength.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.01"
            value={scanlineStrength}
            onChange={(ev) => {
              onSetScanlineStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            Vignette: {vignetteStrength.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="0.3"
            step="0.01"
            value={vignetteStrength}
            onChange={(ev) => {
              onSetVignetteStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            Phosphor: {phosphorStrength.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={phosphorStrength}
            onChange={(ev) => {
              onSetPhosphorStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>
      </div>
    </>
  );
}
