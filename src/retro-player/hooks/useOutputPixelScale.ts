import { useEffect, useState } from "react";
import { readDisplayPixelRatio } from "./safariPageZoom";

const readDpr = () => typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;

// Retain the automatic upper resolution budget, but do not round fractional
// zoom densities up to an integer and force an extra presentation downscale.
export const preferredOutputScale = (dpr: number) =>
  Number.isFinite(dpr) && dpr > 0 ? Math.min(2, dpr) : 1;

export function useDisplayPixelRatio() {
  const [dpr, setDpr] = useState(readDisplayPixelRatio);
  useEffect(() => {
    let query: MediaQueryList | undefined;
    const update = () => {
      setDpr(readDisplayPixelRatio());
      // A resolution query stops matching after a change; re-arm it for the
      // new density, including monitor changes that do not resize the host.
      query?.removeEventListener("change", update);
      query = window.matchMedia?.(`(resolution: ${readDpr()}dppx)`);
      query?.addEventListener("change", update);
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      query?.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);
  return dpr;
}

export function useOutputPixelScale() {
  return preferredOutputScale(useDisplayPixelRatio());
}
