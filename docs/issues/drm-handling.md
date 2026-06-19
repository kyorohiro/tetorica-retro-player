# DRM Video Handling

## Problem

On DRM-protected video sites (Amazon Prime Video, Netflix, etc.), the browser blocks
`texImage2D()` calls on the protected `<video>` element. This caused the WebGL canvas
to go black and triggered continuous GPU errors, making the entire page heavy and slow.

## Approaches Tried

### 1. Throttle on slow frames
Detect when `requestAnimationFrame` takes too long (>50ms) and skip drawing for that element.

**Result: Failed.**
The throttle skipped `gl.clear()` inconsistently. With `preserveDrawingBuffer: false`
(WebGL default), the canvas buffer is invalidated after each frame presentation anyway,
so skipping clear caused the retro effect to freeze on the first frame or go black.

### 2. Reject after N consecutive slow frames
Track slow frame counts per element and permanently skip elements that are repeatedly slow.

**Result: Failed.**
This also blocked non-DRM videos that happened to be slow (large 4K videos, heavy pages).
Too blunt an instrument — collateral damage to legitimate targets.

### 3. Detect DRM via `mediaKeys` (EME)
Check `HTMLVideoElement.mediaKeys != null`. This property is set when the browser has
negotiated Encrypted Media Extensions for the element.

**Result: Works cleanly.**

```javascript
function isUsableVideo(candidate) {
  if (!(candidate instanceof HTMLVideoElement)) return false;
  if (candidate.mediaKeys != null) return false; // DRM: skip
  if (candidate.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;
  const rect = candidate.getBoundingClientRect();
  return rect.width > 32 && rect.height > 32;
}
```

DRM videos are excluded from overlay targets entirely — `texImage2D` is never called on them.
No GPU errors, no performance hit.

## Conclusion

Respect DRM. Detect via `mediaKeys` and skip the retro effect on protected content.

As a consolation, the playback speed button is still shown when hovering over a DRM video,
using a separate hover-detection path (`findHoveredDRMVideoElement`) that explicitly filters
for `el.mediaKeys != null` rather than going through `isUsableVideo`.

## Notes

- `mediaKeys` is part of the W3C Encrypted Media Extensions (EME) spec, available in all
  major browsers.
- The property is set asynchronously after `requestMediaKeySystemAccess()` resolves, so
  there is a brief window at page load where a DRM video might pass the check. In practice
  this causes at most one failed `texImage2D` call before the key is set.
