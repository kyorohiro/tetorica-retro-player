import {
  MONO_TINTS,
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "../retro/config";

function InfoTip({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <span className="relative inline-flex items-center group">
        <button
          type="button"
          aria-label={`${label} help`}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-500/80 bg-slate-900/90 text-[10px] font-bold leading-none text-slate-200 transition hover:border-sky-400 hover:text-sky-100 focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          ?
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-52 -translate-x-1/2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 opacity-0 shadow-lg transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {text}
        </span>
      </span>
    </span>
  );
}

type RetroFilterPanelProps = {
  colorLevels: number;
  curvature: number;
  ditherStrength: number;
  glowStrength: number;
  isFilterEnabled: boolean;
  monoTint: MonoTintMode;
  paletteMode: PaletteMode;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  phosphorDotInternalScale: boolean;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
  persistenceStrength: number;
  closeUpNoiseStrength: number;
  scanlineBrightnessFade: number;
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
  onSetSpotMaskStrength: (value: number) => void;
  onSetBulbRadius: (value: number) => void;
  onSetBlackFloor: (value: number) => void;
  onSetPhosphorDotInternalScale: (value: boolean) => void;
  onSetPhosphorDotBrightCore: (value: boolean) => void;
  onSetPhosphorDotCellFill: (value: number) => void;
  onSetPhosphorDotFlatDisc: (value: boolean) => void;
  onSetPhosphorDotNeighborBlend: (value: boolean) => void;
  onSetPersistenceStrength: (value: number) => void;
  onSetCloseUpNoiseStrength: (value: number) => void;
  onSetScanlineBrightnessFade: (value: number) => void;
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
  spotMaskStrength,
  bulbRadius,
  blackFloor,
  phosphorDotInternalScale,
  phosphorDotBrightCore,
  phosphorDotCellFill,
  phosphorDotFlatDisc,
  phosphorDotNeighborBlend,
  persistenceStrength,
  closeUpNoiseStrength,
  scanlineBrightnessFade,
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
  onSetSpotMaskStrength,
  onSetBulbRadius,
  onSetBlackFloor,
  onSetPhosphorDotInternalScale,
  onSetPhosphorDotBrightCore,
  onSetPhosphorDotCellFill,
  onSetPhosphorDotFlatDisc,
  onSetPhosphorDotNeighborBlend,
  onSetPersistenceStrength,
  onSetCloseUpNoiseStrength,
  onSetScanlineBrightnessFade,
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
  const isPhosphorDotModeActive =
    spotMaskStrength > 0.001 &&
    (
      phosphorDotInternalScale ||
      phosphorDotBrightCore ||
      phosphorDotCellFill > 0.001 ||
      phosphorDotFlatDisc ||
      phosphorDotNeighborBlend
    );

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
              ["free", "pc98", "pc98_tile", "pc98_512", "pc98_512_sat", "pc98_4096", "color32", "color64", "mono", "neon"] as const
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
                    : mode === "pc98_tile"
                      ? "PC-98 Tile"
                    : mode === "pc98_512"
                      ? "PC-98 512-color"
                    : mode === "pc98_512_sat"
                      ? "PC-98 512 Sat"
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
            min="1"
            max="2560"
            step="1"
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
            min="1"
            max="2560"
            step="1"
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
              paletteMode === "pc98_tile" ||
              paletteMode === "pc98_512" ||
              paletteMode === "pc98_512_sat" ||
              paletteMode === "pc98_4096" ||
              paletteMode === "color32" ||
              paletteMode === "color64"
            }
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            <InfoTip
              label={`Curvature: ${curvature.toFixed(2)}`}
              text="Bends the picture inward to mimic the curved glass of an old CRT. Higher values make the screen edges bow more."
            />
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
            <InfoTip
              label={`Bayer dither: ${ditherStrength.toFixed(2)}`}
              text="Adds a 4x4 dot pattern to smooth reduced colors. Higher values make the image feel more grid-like and gritty."
            />
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
            <InfoTip
              label={`Scanline: ${scanlineStrength.toFixed(2)}`}
              text="Adds broad horizontal dark bands like an old display. Higher values make the line gaps more obvious."
            />
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
            <InfoTip
              label={`Scanline2: ${scanline2Strength.toFixed(2)}`}
              text="Adds a finer second layer of line texture. Useful when you want a denser CRT stripe feel."
            />
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
            <InfoTip
              label={`Scanline bright fade: ${scanlineBrightnessFade.toFixed(2)}`}
              text="Makes scanlines fade out in bright areas. Higher values keep dark parts striped while bright parts look more naturally emissive."
            />
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={scanlineBrightnessFade}
            onChange={(ev) => {
              onSetScanlineBrightnessFade(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-slate-100">
            <InfoTip
              label={`Vignette: ${vignetteStrength.toFixed(2)}`}
              text="Darkens the outer edges of the screen. Higher values pull more attention toward the center and can be exaggerated for a stronger retro frame."
            />
          </span>
          <input
            type="range"
            min="0"
            max="0.6"
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
            <InfoTip
              label={`Glow: ${glowStrength.toFixed(2)}`}
              text="Adds a soft light bloom around bright areas. Higher values make highlights spread and feel hotter, even beyond the usual subtle CRT look."
            />
          </span>
          <input
            type="range"
            min="0"
            max="0.5"
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
            <InfoTip
              label={`Phosphor: ${phosphorStrength.toFixed(2)}`}
              text="Adds subtle RGB triad variation like the glow structure of a CRT surface. Higher values make the screen texture more visible and easier to inspect."
            />
          </span>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={phosphorStrength}
            onChange={(ev) => {
              onSetPhosphorStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
          {isPhosphorDotModeActive ? (
            <span className="mt-2 block text-[11px] text-slate-400">
              Phosphor Dot mode ではこの項目は通常 CRT の triad 用です。
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="text-slate-100">
            <InfoTip
              label={`Persistence: ${persistenceStrength.toFixed(2)}`}
              text="Blends a little of the previous frame into the current one. Higher values increase afterimage and CRT-like trailing."
            />
          </span>
          <input
            type="range"
            min="0"
            max="0.95"
            step="0.01"
            value={persistenceStrength}
            onChange={(ev) => {
              onSetPersistenceStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200/90">
            Phosphor Dot / Spot Mask
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onSetPhosphorDotInternalScale(!phosphorDotInternalScale);
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
                phosphorDotInternalScale
                  ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              2x internal resolution
            </button>
            <button
              type="button"
              onClick={() => {
                onSetPhosphorDotBrightCore(!phosphorDotBrightCore);
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
                phosphorDotBrightCore
                  ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              Bright core
            </button>
            <button
              type="button"
              onClick={() => {
                onSetPhosphorDotFlatDisc(!phosphorDotFlatDisc);
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
                phosphorDotFlatDisc
                  ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              Flat disc
            </button>
            <button
              type="button"
              onClick={() => {
                onSetPhosphorDotNeighborBlend(!phosphorDotNeighborBlend);
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-slate-100",
                phosphorDotNeighborBlend
                  ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              Neighbor blend
            </button>
          </div>

          <label className="mt-3 block">
            <span className="text-slate-100">
              <InfoTip
                label={`Spot mask: ${spotMaskStrength.toFixed(3)}`}
                text="Enables the phosphor-dot cell shaping itself. Higher values make the dot structure and CRT-style masking more visible."
              />
            </span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.001"
              value={spotMaskStrength}
              onChange={(ev) => {
                onSetSpotMaskStrength(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-slate-100">
              <InfoTip
                label={`Cell fill: ${phosphorDotCellFill.toFixed(3)}`}
                text="Adds a more uniform base fill inside each phosphor cell. Raise it to make the whole cell brighter; lower it to keep more black visible."
              />
            </span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.001"
              value={phosphorDotCellFill}
              onChange={(ev) => {
                onSetPhosphorDotCellFill(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-slate-100">
              <InfoTip
                label={`Bulb radius: ${bulbRadius.toFixed(3)}`}
                text="Sets how large the glowing bulb can grow inside each phosphor cell. Lower values make the lit core smaller and expose more black around it."
              />
            </span>
            <input
              type="range"
              min="0.001"
              max="0.5"
              step="0.001"
              value={bulbRadius}
              onChange={(ev) => {
                onSetBulbRadius(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-slate-100">
              <InfoTip
                label={`Black floor: ${blackFloor.toFixed(3)}`}
                text="Sets how much light leaks into the black background around each phosphor bulb. Lower values keep the unlit area closer to pure black."
              />
            </span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.001"
              value={blackFloor}
              onChange={(ev) => {
                onSetBlackFloor(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-slate-100">
            <InfoTip
              label={`Close-up noise: ${closeUpNoiseStrength.toFixed(2)}`}
              text="Adds fine animated grain so the screen feels less clean and more like a close-up filmed CRT. Higher values are useful for clearly previewing the effect."
            />
          </span>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={closeUpNoiseStrength}
            onChange={(ev) => {
              onSetCloseUpNoiseStrength(Number(ev.currentTarget.value));
            }}
            className="mt-2 w-full"
          />
        </label>
      </div>
    </>
  );
}
