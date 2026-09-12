export const normalizeAutoTargetSizeBasis = (value: unknown): "source" | "display" =>
  value === "display" ? "display" : "source";

export const normalizeAutoTargetSpacing = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.round(Math.min(5, Math.max(1, value)) * 10) / 10
    : 1;

// The viewport is the fitted image in CSS pixels, excluding letterboxing.
// Derive both axes from the source aspect to avoid accumulating rounding errors.
export const getDisplayAutoTargetSize = (
  source: { width: number; height: number },
  viewport: { width: number; height: number } | null,
  spacing: number,
): { width: number; height: number } | null => {
  if (!viewport || ![source.width, source.height, viewport.width, viewport.height]
    .every(value => Number.isFinite(value) && value > 0)) return null;
  const scale = Math.min(viewport.width / source.width, viewport.height / source.height)
    / normalizeAutoTargetSpacing(spacing);
  const width = Math.max(1, Math.round(source.width * scale));
  return { width, height: Math.max(1, Math.round(width * source.height / source.width)) };
};
