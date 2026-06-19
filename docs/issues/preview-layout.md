# Preview Layout Issues

## Background

The preview container has been a recurring source of bugs because it involves:

- Safari vs Chrome differences in CSS `aspect-ratio` behavior
- Dual size management between the container (CSS) and Pixi.js canvas (JS)
- Different strategies needed for portrait vs landscape content

---

## Safari: `aspect-ratio` + `max-height` + `width: 100%`

### Problem

When all three are combined on the same element:

```css
aspect-ratio: 9 / 16;  /* portrait */
width: 100%;            /* e.g. 400px */
max-height: 500px;
```

- **Chrome**: respects aspect-ratio and reduces width to `500 × 9/16 = 281px` when max-height kicks in.
- **Safari**: keeps `width: 100%` (400px) and only caps the height at 500px → portrait content appears stretched to full width ("Fit Width" look).

### Fix (v0.23.8)

For portrait content (`sourceDimensions.height > sourceDimensions.width`), use `height` as the primary constraint instead of `width`:

```jsx
// Portrait: let aspect-ratio compute the width from the height
{
  aspectRatio: previewAspectRatio,
  height: "min(60vh, calc(100vh - 12rem))",
  maxHeight: "min(60vh, calc(100vh - 12rem))",
  maxWidth: "100%",
  margin: "0 auto",   // center horizontally
}

// Landscape: width-first is fine on all browsers
{
  aspectRatio: previewAspectRatio,
  width: "100%",
  maxHeight: "...",
}
```

**Why:** when `height` (not `width`) is the explicit constraint, Safari correctly derives `width = height × (w/h ratio)` from the aspect-ratio property. `maxWidth: 100%` prevents overflow on narrow screens, and `margin: 0 auto` centers the element.

---

## Recurring "Canvas in → heavy → remove → fix" cycle

### Root cause

The preview container size is managed in two places:
1. **CSS** on the React container div (responsive, viewport-relative)
2. **Pixi.js** internally (pixel dimensions, resize callbacks)

When these get out of sync (e.g., container changed by CSS without notifying Pixi, or Pixi resize fires before layout is stable), the canvas renders at the wrong size or causes reflows.

### Known triggers

- Adding a `<canvas>` element inside the container changes layout flow (block element, fixed pixel size)
- Removing and re-adding the canvas resets Pixi's internal dimensions
- `getBoundingClientRect()` called during layout transition returns stale values

### Mitigation

- Always wait for layout to stabilize before reading container dimensions (e.g., `requestAnimationFrame` × 2, or a ResizeObserver)
- Keep a single source of truth: either CSS controls size and Pixi observes via ResizeObserver, or Pixi controls size and CSS defers to it — not both
- For v1.1.1 rewrite: unify size management into one ResizeObserver → Pixi pipeline, remove the dual-management pattern
