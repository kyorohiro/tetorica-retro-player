// Beam's existing minimum cell width is 1.2 CSS px (2.4 raster pixels
// at 2x). Keep that sampling budget as density falls, without increasing
// target detail above the existing CSS limit on denser screens.
export function limitBeamViewportByDensity(
  viewport: { width: number; height: number },
  display: { width: number; height: number },
  buffer: { width: number; height: number },
  dpr: number,
) {
  return {
    width: Math.max(1, Math.min(viewport.width, display.width * dpr / 2, buffer.width / 2)),
    height: Math.max(1, Math.min(viewport.height, display.height * dpr / 2, buffer.height / 2)),
  };
}
