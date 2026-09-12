import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, expect, it, vi } from "vitest";
import type { TargetFile } from "../api";
const counts = vi.hoisted(() => ({ mounts: 0, unmounts: 0 }));
vi.mock("../../retro-player/components/RetroPlayer", async () => {
  const React = await import("react");
  return { default: (props: { src: string; displayName: string }) => {
    React.useEffect(() => {
      counts.mounts++;
      return () => { counts.unmounts++; };
    }, []);
    return React.createElement("span", null, `${props.src}|${props.displayName}`);
  } };
});
vi.mock("../useZipFileListDialog", () => ({ useZipFileListDialog: () => ({}) }));
vi.mock("../usePreviewDialog", () => ({ downloadUrl: vi.fn() }));
import { PreviewPage } from "./PreviewPage";
import { canReuseRetroImagePlayer, getPreviewPageIdentity } from "./previewPlayerIdentity";
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
beforeEach(() => { counts.mounts = 0; counts.unmounts = 0; });
const file = (n: number, ext = "png"): TargetFile => ({ id: String(n), path: `${n}.${ext}`, isFile: true, isDir: false, size: 1 });
function harness(getObjectUrl: (file: TargetFile) => Promise<string>) {
  const host = document.createElement("div");
  const root = createRoot(host);
  const releaseObjectUrl = vi.fn();
  return {
    host, releaseObjectUrl,
    async page(n: number) {
      await act(async () => { root.render(React.createElement(PreviewPage, {
        key: getPreviewPageIdentity(file(n), n, true, false),
        file: file(n), requestSequence: n, isRetro: true, getObjectUrl, releaseObjectUrl,
      })); });
      await act(async () => { await import("../../retro-player/components/RetroPlayer"); });
    },
    async close() { await act(async () => root.unmount()); },
  };
}
it("keeps one renderer and the current image/name while the next manga page loads", async () => {
  let resolveSecond!: (url: string) => void;
  const get = vi.fn().mockResolvedValueOnce("blob:page1")
    .mockImplementationOnce(() => new Promise<string>(resolve => { resolveSecond = resolve; }));
  const h = harness(get);
  try {
    await h.page(1);
    expect(counts.mounts).toBe(1);
    await h.page(2);
    expect(h.host.textContent).toBe("blob:page1|1.png");
    expect(counts.unmounts).toBe(0);
    await act(async () => { resolveSecond("blob:page2"); });
    expect(h.host.textContent).toBe("blob:page2|2.png");
    expect(counts.mounts).toBe(1);
    expect(counts.unmounts).toBe(0);
  } finally { await h.close(); }
  expect(counts.unmounts).toBe(1);
  expect(h.releaseObjectUrl).toHaveBeenCalledWith("blob:page1");
  expect(h.releaseObjectUrl).toHaveBeenCalledWith("blob:page2");
});
it("discards and releases late results after rapid navigation or closing", async () => {
  let resolveSecond!: (url: string) => void;
  let resolveFourth!: (url: string) => void;
  const get = vi.fn().mockResolvedValueOnce("blob:page1")
    .mockImplementationOnce(() => new Promise<string>(resolve => { resolveSecond = resolve; }))
    .mockResolvedValueOnce("blob:page3")
    .mockImplementationOnce(() => new Promise<string>(resolve => { resolveFourth = resolve; }));
  const h = harness(get);
  try {
    await h.page(1); await h.page(2); await h.page(3);
    await act(async () => { resolveSecond("blob:page2"); });
    expect(h.host.textContent).toBe("blob:page3|3.png");
    expect(h.releaseObjectUrl).toHaveBeenCalledWith("blob:page2");
    expect(counts.mounts).toBe(1);
    await h.page(4);
  } finally { await h.close(); }
  await act(async () => { resolveFourth("blob:page4"); });
  expect(h.releaseObjectUrl).toHaveBeenCalledWith("blob:page4");
});
it("recovers on the next page after a load failure", async () => {
  const get = vi.fn().mockResolvedValueOnce("blob:page1")
    .mockRejectedValueOnce(new Error("Page unavailable"))
    .mockResolvedValueOnce("blob:page3");
  const h = harness(get);
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    await h.page(1); await h.page(2);
    expect(h.host.textContent).toContain("Page unavailable");
    await h.page(3);
    expect(h.host.textContent).toBe("blob:page3|3.png");
  } finally { await h.close(); log.mockRestore(); }
});
it("only shares identity for consecutive retro images, preserving mode and media resets", () => {
  expect(getPreviewPageIdentity(file(1), 1, true, false)).toBe(getPreviewPageIdentity(file(2, "heic"), 2, true, false));
  expect(getPreviewPageIdentity(file(1), 1, false, false)).not.toBe(getPreviewPageIdentity(file(2), 2, false, false));
  expect(getPreviewPageIdentity(file(1, "mp4"), 1, true, false)).not.toBe(getPreviewPageIdentity(file(2, "mp4"), 2, true, false));
  expect(getPreviewPageIdentity(file(1), 1, true, false)).not.toBe(getPreviewPageIdentity(file(1), 1, false, false));
  expect(canReuseRetroImagePlayer("a.png", true, "audio")).toBe(false);
});
