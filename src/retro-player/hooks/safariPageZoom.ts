export type ZoomMeasurement = {
  width: number; height: number;
  outerWidth: number; outerHeight: number;
  dpr: number; visualScale: number;
};

// Relative estimate, not an absolute browser zoom API. The initial page load
// is the reference. Share one tracker across players so page turns retain it.
export function createPageZoomTracker() {
  let previous: ZoomMeasurement | null = null;
  let zoom = 1;
  return (next: ZoomMeasurement) => {
    if (![next.width, next.height, next.outerWidth, next.outerHeight, next.dpr, next.visualScale]
      .every(value => Number.isFinite(value) && value > 0)) return zoom;
    if (previous && previous.outerWidth === next.outerWidth && previous.outerHeight === next.outerHeight
      && previous.dpr === next.dpr && previous.visualScale === 1 && next.visualScale === 1) {
      const x = previous.width / next.width;
      const y = previous.height / next.height;
      // Page zoom scales both axes together. Sidebar or toolbar changes
      // normally affect just one axis. Allow rounding of viewport dimensions.
      if (Math.abs(x - y) < 0.005 && Math.abs(x - 1) > 0.005 && Math.abs(y - 1) > 0.005) {
        zoom *= Math.sqrt(x * y);
      }
    }
    previous = next;
    return zoom;
  };
}

const trackZoom = createPageZoomTracker();
export function readDisplayPixelRatio() {
  if (typeof window === "undefined") return 1;
  const dpr = window.devicePixelRatio > 0 ? window.devicePixelRatio : 1;
  // Chromium includes page zoom in DPR. Never apply this estimate there.
  const ua = window.navigator.userAgent;
  const isSafari = /Safari\//.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Android/.test(ua);
  if (!isSafari) return dpr;
  return dpr * trackZoom({
    width: window.visualViewport?.width ?? window.innerWidth,
    height: window.visualViewport?.height ?? window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    dpr,
    visualScale: window.visualViewport?.scale ?? 1,
  });
}
