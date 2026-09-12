import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { preferredOutputScale, useOutputPixelScale } from "./useOutputPixelScale";

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

it("preserves fractional density within the automatic resolution budget", () => {
  expect([0.75, 1, 1.25, 1.5, 1.75, 2, 3].map(preferredOutputScale))
    .toEqual([0.75, 1, 1.25, 1.5, 1.75, 2, 2]);
});

it("tracks zoom and monitor changes without requiring a CSS resize and cleans up", async () => {
  const queries: EventTarget[] = [];
  vi.stubGlobal("matchMedia", vi.fn(() => {
    const query = new EventTarget();
    queries.push(query);
    return query;
  }));
  vi.stubGlobal("devicePixelRatio", 2);
  const host = document.createElement("div");
  const root = createRoot(host);
  function Probe() { return React.createElement("span", null, useOutputPixelScale()); }
  try {
    await act(async () => root.render(React.createElement(Probe)));
    expect(host.textContent).toBe("2");
    vi.stubGlobal("devicePixelRatio", 1.5);
    await act(async () => queries[queries.length - 1].dispatchEvent(new Event("change")));
    expect(host.textContent).toBe("1.5");
    vi.stubGlobal("devicePixelRatio", 1.25);
    await act(async () => window.dispatchEvent(new Event("resize")));
    expect(host.textContent).toBe("1.25");
    await act(async () => root.unmount());
    const count = queries.length;
    window.dispatchEvent(new Event("resize"));
    queries[queries.length - 1].dispatchEvent(new Event("change"));
    expect(queries.length).toBe(count);
  } finally {
    vi.unstubAllGlobals();
  }
});
