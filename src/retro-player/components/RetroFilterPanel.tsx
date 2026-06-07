import {
  MONO_TINTS,
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "../retro/config";

type RetroFilterPanelProps = {
  colorLevels: number;
  curvature: number;
  ditherStrength: number;
  glowStrength: number;
  isFilterEnabled: boolean;
  monoTint: MonoTintMode;
  paletteMode: PaletteMode;
  phosphorStrength: number;
  scanlineStrength: number;
  scanline2Strength: number;
  neonBoost: number;
  neonSaturation: number;
  neonDetail: number;
  selectedPreset: RetroPresetKey | null;
  sourceDimensions: { width: number; height: number } | null;
  targetHeight: number;
  targetWidth: number;
  vignetteStrength: number;
  onApplyPreset: (preset: RetroPresetKey) => void;
  onSetIsFilterEnabled: (value: boolean) => void;
  onSetColorLevels: (value: number) => void;
  onSetCurvature: (value: number) => void;
  onSetDitherStrength: (value: number) => void;
  onSetGlowStrength: (value: number) => void;
  onSetMonoTint: (value: MonoTintMode) => void;
  onSetPaletteMode: (value: PaletteMode) => void;
  onSetPhosphorStrength: (value: number) => void;
  onSetScanlineStrength: (value: number) => void;
  onSetScanline2Strength: (value: number) => void;
  onSetNeonBoost: (value: number) => void;
  onSetNeonSaturation: (value: number) => void;
  onSetNeonDetail: (value: number) => void;
  onSetTargetHeight: (value: number) => void;
  onSetTargetWidth: (value: number) => void;
  onSetVignetteStrength: (value: number) => void;
  onSyncTargetAspect: () => void;
};

export function RetroFilterPanel({
  colorLevels,
  curvature,
  ditherStrength,
  glowStrength,
  isFilterEnabled,
  monoTint,
  paletteMode,
  phosphorStrength,
  scanlineStrength,
  scanline2Strength,
  neonBoost,
  neonSaturation,
  neonDetail,
  selectedPreset,
  sourceDimensions,
  targetHeight,
  targetWidth,
  vignetteStrength,
  onApplyPreset,
  onSetIsFilterEnabled,
  onSetColorLevels,
  onSetCurvature,
  onSetDitherStrength,
  onSetGlowStrength,
  onSetMonoTint,
  onSetPaletteMode,
  onSetPhosphorStrength,
  onSetScanlineStrength,
  onSetScanline2Strength,
  onSetNeonBoost,
  onSetNeonSaturation,
  onSetNeonDetail,
  onSetTargetHeight,
  onSetTargetWidth,
  onSetVignetteStrength,
  onSyncTargetAspect,
}: RetroFilterPanelProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => {
            onSetIsFilterEnabled(!isFilterEnabled);
          }}
          className={[
            "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
            isFilterEnabled
              ? "border-emerald-400 bg-emerald-500/20"
              : "border-slate-600 bg-slate-900 hover:bg-slate-800",
          ].join(" ")}
        >
          {isFilterEnabled ? "Filter on" : "Filter off"}
        </button>
        {Object.entries(RETRO_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              onApplyPreset(key as RetroPresetKey);
            }}
            className={[
              "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
              selectedPreset === key
                ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50 shadow-[0_0_14px_rgba(74,222,128,0.45)]"
                : "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20",
            ].join(" ")}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-slate-100">Palette</span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(
              ["free", "pc98", "pc98_512", "pc98_4096", "color32", "color64", "mono", "neon"] as const
            ).map(
              (mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  onSetPaletteMode(mode);
                }}
                className={[
                  "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
                  paletteMode === mode
                    ? "border-sky-400 bg-sky-500/20"
                    : "border-slate-600 bg-slate-900 hover:bg-slate-800",
                ].join(" ")}
              >
                {mode === "free"
                  ? "Free"
                  : mode === "pc98"
                    ? "Color 16"
                    : mode === "pc98_512"
                      ? "PC-98 512-color"
                    : mode === "pc98_4096"
                      ? "PC-98 4096-color"
                    : mode === "color32"
                      ? "Color 32"
                    : mode === "color64"
                        ? "Color 64"
                      : mode === "neon"
                        ? "Neon"
                      : "Monochrome"}
              </button>
            ),
            )}
          </div>
        </label>

        {(paletteMode === "mono" || paletteMode === "neon") && (
          <label className="block">
            <span className="text-slate-100">
              {paletteMode === "neon" ? "Neon tint" : "Mono tint"}
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {Object.entries(MONO_TINTS).map(([key, tint]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onSetMonoTint(key as MonoTintMode);
                  }}
                  className={[
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
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

        {paletteMode === "neon" && (
          <>
            <label className="block">
              <span className="text-slate-100">
                Neon Boost: {neonBoost.toFixed(2)}
              </span>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.01"
                value={neonBoost}
                onChange={(ev) => {
                  onSetNeonBoost(Number(ev.currentTarget.value));
                }}
                className="mt-2 w-full"
              />
            </label>

            <label className="block">
              <span className="text-slate-100">
                Neon Saturation: {neonSaturation.toFixed(2)}
              </span>
              <input
                type="range"
                min="0"
                max="2.0"
                step="0.01"
                value={neonSaturation}
                onChange={(ev) => {
                  onSetNeonSaturation(Number(ev.currentTarget.value));
                }}
                className="mt-2 w-full"
              />
            </label>

            <label className="block">
              <span className="text-slate-100">
                Neon Detail: {neonDetail.toFixed(2)}
              </span>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.01"
                value={neonDetail}
                onChange={(ev) => {
                  onSetNeonDetail(Number(ev.currentTarget.value));
                }}
                className="mt-2 w-full"
              />
            </label>
          </>
        )}

        <label className="block">
          <span className="text-slate-100">Target width: {targetWidth}px</span>
          <input
            type="range"
            min="160"
            max="2560"
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
            max="2560"
            step="8"
            value={targetHeight}
            onChange={(ev) => {
              onSetTargetHeight(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <div className="flex flex-col gap-3 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-3">
          <div className="text-[11px] leading-5 text-slate-400">
            {sourceDimensions
              ? `Source aspect: ${sourceDimensions.width} x ${sourceDimensions.height}`
              : "Source aspect: unavailable for audio-only preview"}
          </div>
          <button
            type="button"
            onClick={onSyncTargetAspect}
            disabled={!sourceDimensions}
            className={[
              "min-h-11 rounded-lg border px-3 py-2 text-slate-100",
              sourceDimensions
                ? "border-sky-400/50 bg-sky-500/10 hover:bg-sky-500/20"
                : "cursor-not-allowed border-slate-700 bg-slate-900 text-slate-500",
            ].join(" ")}
          >
            Match aspect
          </button>
        </div>

        <label className="block">
          <span className="text-slate-100">Color levels: {colorLevels}</span>
          <input
            type="range"
            min="2"
            max="256"
            step="1"
            value={colorLevels}
            onChange={(ev) => {
              onSetColorLevels(Number(ev.currentTarget.value));
            }}
            disabled={
              paletteMode === "pc98" ||
              paletteMode === "pc98_512" ||
              paletteMode === "pc98_4096" ||
              paletteMode === "color32" ||
              paletteMode === "color64"
            }
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            Curvature: {curvature.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={curvature}
            onChange={(ev) => {
              onSetCurvature(Number(ev.currentTarget.value));
            }}
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
            Scanline2: {scanline2Strength.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={scanline2Strength}
            onChange={(ev) => {
              onSetScanline2Strength(Number(ev.currentTarget.value));
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
            Glow: {glowStrength.toFixed(2)}
          </span>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={glowStrength}
            onChange={(ev) => {
              onSetGlowStrength(Number(ev.currentTarget.value));
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
