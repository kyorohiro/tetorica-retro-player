import { useEffect, useState } from "react";
import {
  MONO_TINTS,
  RETRO_PRESETS,
  type MonoTintMode,
  type PaletteMode,
  type RetroPresetKey,
} from "../retro/config";
import type { RetroPlayerLocale } from "../types";

function InfoTip({
  label,
  text,
  helpSuffix,
}: {
  label: string;
  text: string;
  helpSuffix: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <span className="relative inline-flex items-center group">
        <button
          type="button"
          aria-label={`${label}${helpSuffix}`}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#a8a29a]/80 bg-[#eae6df] text-[10px] font-bold leading-none text-[#1a1610] transition hover:border-[#000000] hover:text-[#ffffff] focus:outline-none focus:ring-1 focus:ring-[#000000]"
        >
          ?
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-52 -translate-x-1/2 rounded-lg border border-[#bcb4a6]/80 bg-[#f5f1ea] px-3 py-2 text-[11px] leading-4 text-[#12141c] opacity-0 shadow-lg transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          {text}
        </span>
      </span>
    </span>
  );
}

type RetroFilterPanelProps = {
  locale: RetroPlayerLocale;
  colorLevels: number;
  curvature: number;
  ditherStrength: number;
  glowStrength: number;
  smoothStrength: number;
  toonSteps: number;
  edgeBoost: number;
  animeEdgeLow: number;
  animeEdgeHigh: number;
  isFilterEnabled: boolean;
  monoTint: MonoTintMode;
  paletteMode: PaletteMode;
  phosphorStrength: number;
  spotMaskStrength: number;
  bulbRadius: number;
  blackFloor: number;
  lumaLow: number;
  lumaHigh: number;
  lumaKnee: number;
  phosphorDotLightBalance: number;
  phosphorDotInternalScale: boolean;
  phosphorDotBrightCore: boolean;
  phosphorDotCellFill: number;
  phosphorDotFlatDisc: boolean;
  phosphorDotNeighborBlend: boolean;
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
  matchTargetAspect: boolean;
  vignetteStrength: number;
  onApplyPreset: (preset: RetroPresetKey) => void;
  onSetIsFilterEnabled: (value: boolean) => void;
  onSetColorLevels: (value: number) => void;
  onSetCurvature: (value: number) => void;
  onSetDitherStrength: (value: number) => void;
  onSetGlowStrength: (value: number) => void;
  onSetSmoothStrength: (value: number) => void;
  onSetToonSteps: (value: number) => void;
  onSetEdgeBoost: (value: number) => void;
  onSetAnimeEdgeLow: (value: number) => void;
  onSetAnimeEdgeHigh: (value: number) => void;
  onSetMonoTint: (value: MonoTintMode) => void;
  onSetPaletteMode: (value: PaletteMode) => void;
  onSetPhosphorStrength: (value: number) => void;
  onSetSpotMaskStrength: (value: number) => void;
  onSetBulbRadius: (value: number) => void;
  onSetBlackFloor: (value: number) => void;
  onSetLumaLow: (value: number) => void;
  onSetLumaHigh: (value: number) => void;
  onSetLumaKnee: (value: number) => void;
  onSetPhosphorDotLightBalance: (value: number) => void;
  onSetPhosphorDotInternalScale: (value: boolean) => void;
  onSetPhosphorDotBrightCore: (value: boolean) => void;
  onSetPhosphorDotCellFill: (value: number) => void;
  onSetPhosphorDotFlatDisc: (value: boolean) => void;
  onSetPhosphorDotNeighborBlend: (value: boolean) => void;
  onSetCloseUpNoiseStrength: (value: number) => void;
  onSetScanlineBrightnessFade: (value: number) => void;
  onSetScanlineStrength: (value: number) => void;
  onSetScanline2Strength: (value: number) => void;
  onSetNeonBoost: (value: number) => void;
  onSetNeonSaturation: (value: number) => void;
  onSetNeonDetail: (value: number) => void;
  onSetTargetHeight: (value: number) => void;
  onSetTargetWidth: (value: number) => void;
  onSetMatchTargetAspect: (value: boolean) => void;
  onSetVignetteStrength: (value: number) => void;
};

export function RetroFilterPanel({
  locale,
  colorLevels,
  curvature,
  ditherStrength,
  glowStrength,
  smoothStrength,
  toonSteps,
  edgeBoost,
  animeEdgeLow,
  animeEdgeHigh,
  isFilterEnabled,
  monoTint,
  paletteMode,
  phosphorStrength,
  spotMaskStrength,
  bulbRadius,
  blackFloor,
  lumaLow,
  lumaHigh,
  lumaKnee,
  phosphorDotLightBalance,
  phosphorDotInternalScale,
  phosphorDotBrightCore,
  phosphorDotCellFill,
  phosphorDotFlatDisc,
  phosphorDotNeighborBlend,
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
  matchTargetAspect,
  vignetteStrength,
  onApplyPreset,
  onSetIsFilterEnabled,
  onSetColorLevels,
  onSetCurvature,
  onSetDitherStrength,
  onSetGlowStrength,
  onSetSmoothStrength,
  onSetToonSteps,
  onSetEdgeBoost,
  onSetAnimeEdgeLow,
  onSetAnimeEdgeHigh,
  onSetMonoTint,
  onSetPaletteMode,
  onSetPhosphorStrength,
  onSetSpotMaskStrength,
  onSetBulbRadius,
  onSetBlackFloor,
  onSetLumaLow,
  onSetLumaHigh,
  onSetLumaKnee,
  onSetPhosphorDotLightBalance,
  onSetPhosphorDotInternalScale,
  onSetPhosphorDotBrightCore,
  onSetPhosphorDotCellFill,
  onSetPhosphorDotFlatDisc,
  onSetPhosphorDotNeighborBlend,
  onSetCloseUpNoiseStrength,
  onSetScanlineBrightnessFade,
  onSetScanlineStrength,
  onSetScanline2Strength,
  onSetNeonBoost,
  onSetNeonSaturation,
  onSetNeonDetail,
  onSetTargetHeight,
  onSetTargetWidth,
  onSetMatchTargetAspect,
  onSetVignetteStrength,
}: RetroFilterPanelProps) {
  const [localTargetWidth, setLocalTargetWidth] = useState(targetWidth);
  const [localTargetHeight, setLocalTargetHeight] = useState(targetHeight);
  const [realtimeTargetSize, setRealtimeTargetSize] = useState(false);
  useEffect(() => setLocalTargetWidth(targetWidth), [targetWidth]);
  useEffect(() => setLocalTargetHeight(targetHeight), [targetHeight]);

  const helpText =
    locale === "ja"
      ? {
          helpSuffix: "のヘルプ",
          curvature:
            "古い CRT の湾曲ガラスのように、画面を内側へたわませます。値を上げるほど端の反りが強くなります。",
          bayerDither:
            "4x4 のドットパターンを加えて減色の見え方をなじませます。値を上げるほど格子感とザラつきが強くなります。",
          scanline:
            "古い表示のような横方向の暗い帯を加えます。値を上げるほど線の隙間が目立ちます。",
          scanline2:
            "さらに細かい第2のライン感を加えます。より密な CRT の縞感が欲しいときに使います。",
          scanlineBrightFade:
            "明るい部分では scanline を薄くします。値を上げると暗部は縞を保ちつつ、明部は自然に発光して見えます。",
          vignette:
            "画面の外周を暗くします。値を上げるほど中央に視線が集まり、レトロな額縁感も強くなります。",
          glow:
            "明るい部分のまわりに柔らかな光のにじみを足します。値を上げるほどハイライトが広がって熱っぽく見えます。",
          smooth:
            "近い色同士を少しだけならして、細かな質感を減らします。アニメ調では面がまとまりやすくなりますが、上げすぎると眠い絵になります。",
          toonSteps:
            "明るさの段階数を減らして、セル画みたいな影の切れ目を作ります。0 で無効、少ないほどアニメ寄りになります。",
          edgeBoost:
            "輪郭の変化を拾って、境界を少し暗く締めます。明るい場所では効きを少し弱めています。上げるほど形が読みやすくなりますが、ノイズや圧縮のザラつきも見えやすくなります。",
          phosphor:
            "CRT 表面の発光構造のような RGB の細かな揺らぎを加えます。値を上げるほど画面テクスチャが見えやすくなります。",
          spotMask:
            "Phosphor Dot のセル形状を有効にします。値を上げるほどドット構造と CRT 風マスクがはっきり見えます。",
          cellFill:
            "各 phosphor セル内部に均一なベース光を加えます。上げるとセル全体が明るくなり、下げると黒が残りやすくなります。",
          bulbRadius:
            "各 phosphor セル内で光るバルブの大きさを決めます。下げるほど明るい芯が小さくなり、周囲の黒が増えます。",
          blackFloor:
            "phosphor バルブ周囲の黒背景へどれだけ光が漏れるかを決めます。下げるほど未点灯部分が純黒に近づきます。",
          lumaLow:
            "これより暗い輝度を持ち上げ始めます。黒つぶれを減らして、暗部を見やすくします。",
          lumaHigh:
            "これより明るい輝度を圧縮し始めます。白飛びや強すぎる発光を丸めます。",
          lumaKnee:
            "Luma Low / High の効き始めを柔らかくします。下げると硬く、上げると自然に移行します。",
          lightLevel:
            "色付き phosphor バルブ全体の明るさを一様に調整します。下げると全体が暗くなり、上げると均一に明るくなります。",
          closeUpNoise:
            "細かなアニメーション粒子を足して、近接撮影した CRT っぽさを出します。値を上げると効果を確認しやすくなります。",
        }
      : {
          helpSuffix: " help",
          curvature:
            "Bends the picture inward to mimic the curved glass of an old CRT. Higher values make the screen edges bow more.",
          bayerDither:
            "Adds a 4x4 dot pattern to smooth reduced colors. Higher values make the image feel more grid-like and gritty.",
          scanline:
            "Adds broad horizontal dark bands like an old display. Higher values make the line gaps more obvious.",
          scanline2:
            "Adds a finer second layer of line texture. Useful when you want a denser CRT stripe feel.",
          scanlineBrightFade:
            "Makes scanlines fade out in bright areas. Higher values keep dark parts striped while bright parts look more naturally emissive.",
          vignette:
            "Darkens the outer edges of the screen. Higher values pull more attention toward the center and can be exaggerated for a stronger retro frame.",
          glow:
            "Adds a soft light bloom around bright areas. Higher values make highlights spread and feel hotter, even beyond the usual subtle CRT look.",
          smooth:
            "Gently blends nearby colors to knock back fine texture. This helps toon-style presets form cleaner color regions, but too much will make the image feel sleepy.",
          toonSteps:
            "Reduces the number of brightness bands to create cel-style shading breaks. Use 0 to disable it; fewer steps look more toon-like.",
          edgeBoost:
            "Detects local contrast changes and darkens contour boundaries slightly. The effect eases off in very bright areas. Higher values make shapes easier to read, but can also bring out noise and compression grit.",
          phosphor:
            "Adds subtle RGB triad variation like the glow structure of a CRT surface. Higher values make the screen texture more visible and easier to inspect.",
          spotMask:
            "Enables the phosphor-dot cell shaping itself. Higher values make the dot structure and CRT-style masking more visible.",
          cellFill:
            "Adds a more uniform base fill inside each phosphor cell. Raise it to make the whole cell brighter; lower it to keep more black visible.",
          bulbRadius:
            "Sets how large the glowing bulb can grow inside each phosphor cell. Lower values make the lit core smaller and expose more black around it.",
          blackFloor:
            "Sets how much light leaks into the black background around each phosphor bulb. Lower values keep the unlit area closer to pure black.",
          lumaLow:
            "Starts lifting luminance below this point. Use it to reduce crushed shadows and recover dark detail.",
          lumaHigh:
            "Starts compressing luminance above this point. Use it to tame clipped highlights and overly hot glow.",
          lumaKnee:
            "Softens how Luma Low and Luma High engage. Lower values feel harder; higher values transition more gently.",
          lightLevel:
            "Scales the brightness of the colored phosphor bulbs uniformly, like changing the drive voltage. Lower values dim the whole dot; higher values brighten it evenly.",
          closeUpNoise:
            "Adds fine animated grain so the screen feels less clean and more like a close-up filmed CRT. Higher values are useful for clearly previewing the effect.",
        };
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
            "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
            isFilterEnabled
              ? "border-emerald-400 bg-emerald-500/20"
              : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
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
              "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
              selectedPreset === key
                ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                : "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20",
            ].join(" ")}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-[#12141c]">Palette</span>
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
                  "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                  paletteMode === mode
                    ? "border-[#000000] bg-[#111014]/20"
                    : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
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
            <span className="text-[#12141c]">
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
                    "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                    monoTint === key
                      ? "border-[#000000] bg-[#111014]/20"
                      : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
                  ].join(" ")}
                >
                  {tint.label}
                </button>
              ))}
            </div>
          </label>
        )}

        <label className="flex cursor-pointer items-center gap-2 text-xs text-[#2c2418]">
          <input
            type="checkbox"
            checked={realtimeTargetSize}
            onChange={(ev) => setRealtimeTargetSize(ev.currentTarget.checked)}
            className="accent-[#111014]"
          />
          Live update
        </label>

        <label className="block">
          <span className="text-[#12141c]">Target width: {localTargetWidth}px</span>
          <input
            type="range"
            min="1"
            max="2560"
            step="1"
            value={localTargetWidth}
            onChange={(ev) => {
              const v = Number(ev.currentTarget.value);
              setLocalTargetWidth(v);
              if (realtimeTargetSize) onSetTargetWidth(v);
            }}
            onPointerUp={(ev) => onSetTargetWidth(Number(ev.currentTarget.value))}
            onKeyUp={(ev) => onSetTargetWidth(Number(ev.currentTarget.value))}
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-[#12141c]">Target height: {localTargetHeight}px</span>
          <input
            type="range"
            min="1"
            max="2560"
            step="1"
            value={localTargetHeight}
            onChange={(ev) => {
              const v = Number(ev.currentTarget.value);
              setLocalTargetHeight(v);
              if (realtimeTargetSize) onSetTargetHeight(v);
            }}
            onPointerUp={(ev) => onSetTargetHeight(Number(ev.currentTarget.value))}
            onKeyUp={(ev) => onSetTargetHeight(Number(ev.currentTarget.value))}
            className="mt-2 w-full"
          />
        </label>

        <div className="flex flex-col gap-3 rounded-lg border border-[#cac0b2] bg-[#ede8e2] px-3 py-3">
          <div className="text-[11px] leading-5 text-[#7a7268]">
            {sourceDimensions
              ? `Source aspect: ${sourceDimensions.width} x ${sourceDimensions.height}`
              : "Source aspect: unavailable for audio-only preview"}
          </div>
          <label className="flex min-h-11 items-center justify-between rounded-lg border border-[#000000]/35 bg-[#111014]/10 px-3 py-2 text-[#12141c]">
            <span>Match aspect</span>
            <input
              type="checkbox"
              checked={matchTargetAspect}
              onChange={(ev) => {
                onSetMatchTargetAspect(ev.currentTarget.checked);
              }}
              className="h-5 w-5"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[#12141c]">Color levels: {colorLevels}</span>
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
          <span className="text-[#12141c]">
            <InfoTip
              label={`Bayer dither: ${ditherStrength.toFixed(2)}`}
              text={helpText.bayerDither}
              helpSuffix={helpText.helpSuffix}
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
          <span className="text-[#12141c]">
            <InfoTip
              label={`Smooth: ${smoothStrength.toFixed(2)}`}
              text={helpText.smooth}
              helpSuffix={helpText.helpSuffix}
            />
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={smoothStrength}
            onChange={(ev) => onSetSmoothStrength(Number(ev.currentTarget.value))}
            className="mt-2 w-full"
          />
        </label>

        {paletteMode === "neon" && (
          <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-3">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
              Neon
            </div>
            <div className="flex flex-col gap-3">
              <label className="block">
                <span className="text-[#12141c]">
                  Neon Boost: {neonBoost.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.01"
                  value={neonBoost}
                  onChange={(ev) => onSetNeonBoost(Number(ev.currentTarget.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="block">
                <span className="text-[#12141c]">
                  Neon Saturation: {neonSaturation.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="2.0"
                  step="0.01"
                  value={neonSaturation}
                  onChange={(ev) => onSetNeonSaturation(Number(ev.currentTarget.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="block">
                <span className="text-[#12141c]">
                  Neon Detail: {neonDetail.toFixed(2)}
                </span>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.01"
                  value={neonDetail}
                  onChange={(ev) => onSetNeonDetail(Number(ev.currentTarget.value))}
                  className="mt-2 w-full"
                />
              </label>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            CRT / LCD
          </div>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Glow: ${glowStrength.toFixed(2)}`}
                  text={helpText.glow}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={glowStrength}
                onChange={(ev) => onSetGlowStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Curvature: ${curvature.toFixed(2)}`}
                  text={helpText.curvature}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={curvature}
                onChange={(ev) => onSetCurvature(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Scanline: ${scanlineStrength.toFixed(2)}`}
                  text={helpText.scanline}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.4"
                step="0.01"
                value={scanlineStrength}
                onChange={(ev) => onSetScanlineStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Scanline2: ${scanline2Strength.toFixed(2)}`}
                  text={helpText.scanline2}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={scanline2Strength}
                onChange={(ev) => onSetScanline2Strength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Scanline bright fade: ${scanlineBrightnessFade.toFixed(2)}`}
                  text={helpText.scanlineBrightFade}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={scanlineBrightnessFade}
                onChange={(ev) => onSetScanlineBrightnessFade(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Vignette: ${vignetteStrength.toFixed(2)}`}
                  text={helpText.vignette}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.01"
                value={vignetteStrength}
                onChange={(ev) => onSetVignetteStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Phosphor: ${phosphorStrength.toFixed(2)}`}
                  text={helpText.phosphor}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={phosphorStrength}
                onChange={(ev) => onSetPhosphorStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
              {isPhosphorDotModeActive ? (
                <span className="mt-2 block text-[11px] text-[#7a7268]">
                  Phosphor Dot mode ではこの項目は通常 CRT の triad 用です。
                </span>
              ) : null}
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Close-up noise: ${closeUpNoiseStrength.toFixed(2)}`}
                  text={helpText.closeUpNoise}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={closeUpNoiseStrength}
                onChange={(ev) => onSetCloseUpNoiseStrength(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#6b7688]">
            Luma / Tone
          </div>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Luma Low: ${lumaLow.toFixed(2)}`}
                  text={helpText.lumaLow}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.01"
                value={lumaLow}
                onChange={(ev) => onSetLumaLow(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Luma High: ${lumaHigh.toFixed(2)}`}
                  text={helpText.lumaHigh}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                value={lumaHigh}
                onChange={(ev) => onSetLumaHigh(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Luma Knee: ${lumaKnee.toFixed(2)}`}
                  text={helpText.lumaKnee}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0.02"
                max="0.5"
                step="0.01"
                value={lumaKnee}
                onChange={(ev) => onSetLumaKnee(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-[#000000]/30 bg-[#111014]/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            Anime Toon / Edge
          </div>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Toon steps: ${toonSteps.toFixed(0)}`}
                  text={helpText.toonSteps}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={toonSteps}
                onChange={(ev) => onSetToonSteps(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="block">
              <span className="text-[#12141c]">
                <InfoTip
                  label={`Edge boost: ${edgeBoost.toFixed(2)}`}
                  text={helpText.edgeBoost}
                  helpSuffix={helpText.helpSuffix}
                />
              </span>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.01"
                value={edgeBoost}
                onChange={(ev) => onSetEdgeBoost(Number(ev.currentTarget.value))}
                className="mt-2 w-full"
              />
            </label>
            {toonSteps >= 1 && (
              <>
                <label className="block">
                  <span className="text-[#12141c]">
                    Edge threshold low: {animeEdgeLow.toFixed(2)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={animeEdgeLow}
                    onChange={(ev) => onSetAnimeEdgeLow(Number(ev.currentTarget.value))}
                    className="mt-2 w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-[#12141c]">
                    Edge threshold high: {animeEdgeHigh.toFixed(2)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={animeEdgeHigh}
                    onChange={(ev) => onSetAnimeEdgeHigh(Number(ev.currentTarget.value))}
                    className="mt-2 w-full"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-3">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a7268]">
            Phosphor Dot / Spot Mask
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onSetPhosphorDotInternalScale(!phosphorDotInternalScale);
              }}
              className={[
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                phosphorDotInternalScale
                  ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
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
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                phosphorDotBrightCore
                  ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
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
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                phosphorDotFlatDisc
                  ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
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
                "min-h-10 rounded-lg border px-2 py-2 text-[11px] leading-tight text-[#12141c]",
                phosphorDotNeighborBlend
                  ? "border-emerald-600/60 bg-emerald-500/15 text-[#0a3a1a] font-semibold"
                  : "border-[#bcb4a6] bg-[#f5f1ea] hover:bg-[#e2ddd5]",
              ].join(" ")}
            >
              Neighbor blend
            </button>
          </div>

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Spot mask: ${spotMaskStrength.toFixed(3)}`}
                text={helpText.spotMask}
                helpSuffix={helpText.helpSuffix}
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
            <span className="text-[#12141c]">
              <InfoTip
                label={`Cell fill: ${phosphorDotCellFill.toFixed(3)}`}
                text={helpText.cellFill}
                helpSuffix={helpText.helpSuffix}
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
            <span className="text-[#12141c]">
              <InfoTip
                label={`Bulb radius: ${bulbRadius.toFixed(3)}`}
                text={helpText.bulbRadius}
                helpSuffix={helpText.helpSuffix}
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
            <span className="text-[#12141c]">
              <InfoTip
                label={`Black floor: ${blackFloor.toFixed(3)}`}
                text={helpText.blackFloor}
                helpSuffix={helpText.helpSuffix}
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

          <label className="mt-3 block">
            <span className="text-[#12141c]">
              <InfoTip
                label={`Light level: ${phosphorDotLightBalance.toFixed(2)}`}
                text={helpText.lightLevel}
                helpSuffix={helpText.helpSuffix}
              />
            </span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={phosphorDotLightBalance}
              onChange={(ev) => {
                onSetPhosphorDotLightBalance(Number(ev.currentTarget.value));
              }}
              className="mt-2 w-full"
            />
          </label>
        </div>

      </div>
    </>
  );
}
