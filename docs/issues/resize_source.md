# Resize Source Before Beam

## Background

`CRT Beam` is fragile when the final image is shrunk after the beam pattern has
already been generated.

Typical failure flow:

1. Source is uploaded at a relatively high resolution.
2. Beam shader generates high-frequency structure from that source.
3. `render cap` or final canvas scaling shrinks the result.
4. The shrink step creates moire, RGB color breakup, or large wave-like alias
   patterns.

This was especially visible when:

- `Render Cap` was `On`
- Beam mode was active
- The final canvas size was smaller than the internal pattern density

## Current Understanding

The main issue is not just `RGB stripe`.

Even if stripe masking is merged or scanlines are weakened, Beam still contains
high-frequency structure in:

- beam body
- white bloom
- flare / halo
- curvature-compressed regions

Once those are generated at a frequency that the final canvas cannot represent,
downscaling produces new artifacts.

In other words:

- bad order: `source -> beam -> shrink`
- better order: `source -> shrink -> beam`

## Goal

Resize the source texture before the Beam shader sees it.

Expected pipeline:

1. Upload original source texture
2. Downscale that source to a smaller intermediate texture
3. Feed the downscaled texture into the Beam shader
4. Present the Beam result to screen

This should reduce:

- RGB stripe breakup
- white bloom moire
- wave-like alias patterns under render caps

## Why This Is Preferable

If Beam is generated after the source has already been reduced to the practical
working resolution, the shader can build its pattern against the true available
detail budget.

That is usually better than:

- generating high-frequency Beam first
- relying on canvas / browser / render-cap scaling to collapse it later

## Options Considered

### 1. Canvas 2D `drawImage()` pre-resize

Pros:

- simple
- easy to prototype

Cons:

- Safari was previously very heavy when using canvas-resize before shader input
- browser-dependent quality/performance

Conclusion:

- possible for quick testing
- not preferred as the main solution

### 2. WebGL pre-downscale pass

Pros:

- stays on GPU
- avoids expensive CPU/canvas path
- fits existing multi-pass pipeline structure

Cons:

- requires one more pass / FBO
- needs careful sizing policy

Conclusion:

- preferred direction

### 3. Multi-step WebGL downscale

Example:

- original -> half -> quarter -> target

Pros:

- more stable than one large shrink
- useful when shrink ratio is large

Cons:

- more passes
- more complexity

Conclusion:

- likely useful if one-pass linear downscale is not enough

## Recommended Direction

Implement a Beam-specific pre-scale path in WebGL.

Target shape:

1. original source texture
2. pre-downscaled Beam source FBO
3. Beam pass
4. screen

This keeps the expensive/high-frequency Beam generation aligned with the actual
working resolution instead of asking the final canvas shrink to solve it.

## Practical Notes

- `Render Cap` may still be needed on Windows because disabling it can increase
  display latency.
- Because of that, "disable render cap in Beam mode" is not a sufficient final
  answer.
- The better long-term fix is to preserve the cap while moving the shrink step
  before Beam generation.

## Open Questions

1. What downscale policy should choose the Beam pre-scale size?
2. Should Beam use a dedicated cap different from other filter modes?
3. Is one-pass `LINEAR` enough, or does Beam need box/average downscale?
4. Should the pre-downscale size depend on:
   - final canvas size
   - render cap
   - curvature
   - Beam-specific density thresholds

## First Implementation Proposal

Start with the smallest useful change:

1. Add a Beam-only pre-scale FBO
2. Render the uploaded source into that FBO using `LINEAR` sampling
3. Use the pre-scaled texture as Beam input
4. Compare:
   - `Render Cap Off`
   - `Render Cap On`
   - Windows / Safari behavior

If artifacts remain, try:

1. multi-step downscale
2. explicit box-filter / average downscale
3. additional Beam-side low-pass only after pre-resize is in place

## Summary

The key idea is:

Do not shrink Beam after it has been generated.

Instead:

Shrink the source first, then generate Beam from that reduced source.

## Result After Iteration

After several attempts, the problem turned out to be a combination of:

1. `Render Cap` changing the effective display size
2. Beam still trying to preserve RGB stripe structure at frequencies the final
   visible canvas could not represent
3. fallback behavior that removed too much CRT-like structure when trying to
   suppress rainbow moire

What finally worked was not a single change, but a stack of corrections.

## What Did Not Work Well

### 1. Fixing Beam only inside the final shader

Trying to suppress moire only by weakening scanlines, bloom, or stripe masks
inside Beam was not enough.

Reason:

- the source had already reached Beam at a problematic density
- the final shrink still reintroduced aliasing

### 2. Disabling stripe too aggressively

When low-resolution fallback effectively behaved like `Stripe strength: 0`, the
rainbow artifacts improved, but CRT character was lost too.

Symptoms:

- vertical beam-stripe feel disappeared
- the image became closer to merged dots than scanline-like emitters

### 3. Dot-style fallback for unresolved RGB stripe

A merged dot fallback reduced color breakup, but it removed the vertical
"operation line" feel the Beam mode should keep.

That was visually stable, but aesthetically wrong for this mode.

## What Worked

### 1. Pre-resize the source before Beam

Using a Beam-specific pre-resize pass before the Beam shader helped separate:

- source-resolution problems
- Beam-generation problems
- final presentation / render-cap problems

This was an important structural fix even before the final stripe tuning.

### 2. Use visible display size, not only drawing buffer size

The key Beam stripe decision should be based on what the user can actually see,
not only on internal framebuffer size.

Important distinction:

- unstable basis: `gl.drawingBufferWidth/Height`
- useful basis: visible canvas size (`clientWidth/clientHeight`)

This was a major reason `Render Cap On` behaved differently from `Off`.

### 3. Keep stripe shape even when RGB must be abandoned

The final useful fallback was:

- abandon RGB separation when the display cannot represent it safely
- keep the stripe shape
- collapse color to monochrome stripe instead of switching to dot blobs

In short:

- bad fallback: `RGB stripe -> merged dot`
- better fallback: `RGB stripe -> monochrome stripe`

### 4. Do not reduce stripe strength all the way to zero

A partial lower bound on fallback stripe strength preserved CRT character while
still avoiding rainbow breakup.

This kept:

- vertical connection between bright emitters
- the sense that bright regions can fill gaps

without restoring the original moire problem.

### 5. Beam Cross also benefits strongly from internal resolution

`phosphorDotInternalScale` affects Beam Cross in a useful way.

Why this matters:

- it is not equivalent to simply increasing target width/height
- it changes internal phosphor / beam cell density while still passing through
  the viewport-limiting logic
- this often improves Beam appearance without the same kind of instability as
  brute-force target-size increases

This should be exposed clearly in the UI for Beam users.

## Current Practical Guidance

If Beam moire returns in the future, check these first:

1. Is the problem caused before Beam, inside Beam, or after Beam?
2. Is the stripe-resolution decision using visible display size?
3. Is fallback preserving stripe shape, or accidentally collapsing into dots?
4. Is `Render Cap` changing the visible frequency budget?
5. Is `Internal res` changing Beam quality in a helpful way before touching
   target width/height?

## Final Takeaway

The eventual solution came from repeated iteration, not a single insight.

The successful path was:

1. separate source-resize issues from Beam issues
2. switch stripe decisions to visible display size
3. suppress unsafe RGB stripe only when necessary
4. preserve monochrome stripe structure instead of removing it completely
5. use internal-resolution control as a Beam-quality lever
