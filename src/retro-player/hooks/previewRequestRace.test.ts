import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { expect, it, vi } from "vitest";

it("a late HLS onCreated cannot overwrite the current preview", async () => {
  const source = readFileSync("src/retro-player/hooks/useRetroPreviewMedia.ts", "utf8");
  const body = source.slice(source.indexOf("  const previewUrl ="), source.lastIndexOf("\n  return {"));
  const requests: { callbacks: {onCreated: (element: HTMLVideoElement) => void}; reject: (error: Error) => void }[] = [];
  const requestRef = { current: 0 };
  const mediaRef = { current: null as HTMLVideoElement | null };
  const visualRef = { current: null as HTMLVideoElement | null };
  const release = vi.fn();
  const context = vm.createContext({
    DOMException, HTMLImageElement, performance,
    previewKindRef: {current:null}, appRef:{current:null}, previewElementRef:visualRef, mediaRef,
    previewRequestIdRef:requestRef, debugVideo(){}, powerOn(){},
    cleanupPreview(){requestRef.current++;}, resetFilterInstance(){}, _setPreviewError(){},
    setPreviewName(){},beginLoading(){},applyMediaSettings(){},attachMediaEventListeners(){},
    setPreviewKindState(){},setSourceDimensions(){},setViewportRect(){},safeRender(){},
    releaseDetachedMedia:release,
    createVideoMediaSource: (_options: unknown, callbacks: {onCreated: (element: HTMLVideoElement) => void}) =>
      new Promise((_resolve,reject)=>requests.push({callbacks,reject})),
  });
  vm.runInContext(ts.transpileModule(body+"\nglobalThis.load = previewUrl;", {compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText,context);
  const a = context.load("A.m3u8","video");
  const b = context.load("B.m3u8","video");
  const current = document.createElement("video");
  requests[1].callbacks.onCreated(current);
  const old = document.createElement("video");
  expect(()=>requests[0].callbacks.onCreated(old)).toThrow("Preview superseded");
  expect(mediaRef.current).toBe(current);
  expect(visualRef.current).toBe(current);
  expect(release).toHaveBeenCalledWith(old,"A.m3u8");
  requestRef.current++;
  requests.forEach(request=>request.reject(new Error("superseded")));
  await Promise.all([a,b]);
});
