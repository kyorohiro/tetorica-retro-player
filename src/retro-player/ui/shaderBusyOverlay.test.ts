import { afterEach, expect, it, vi } from "vitest";
import { hideShaderBusyOverlay, showShaderBusyOverlay, showShaderPreparationNotice } from "./shaderBusyOverlay";

afterEach(() => {
  hideShaderBusyOverlay();
  document.body.replaceChildren();
  vi.useRealTimers();
});

it("keeps elapsed time and cancellation available as preparation stages change", () => {
  vi.useFakeTimers();
  const cancel = vi.fn();
  showShaderBusyOverlay("Preparing Beam", "Keep current settings on cancel", cancel);
  vi.advanceTimersByTime(2100);
  showShaderBusyOverlay("Preparing colors");
  expect(document.querySelector("[data-shader-busy-elapsed]")?.textContent).toContain("2 s");
  const button = document.querySelector<HTMLButtonElement>("[data-shader-busy-cancel]")!;
  expect(button.hidden).toBe(false);
  button.click();
  button.click();
  expect(cancel).toHaveBeenCalledTimes(1);
  hideShaderBusyOverlay();
  expect(vi.getTimerCount()).toBe(0);
  showShaderBusyOverlay("Another preparation");
  expect(button.hidden).toBe(true);
});

it("shows a dismissible result instead of a busy spinner after startup cancellation or failure", () => {
  vi.useFakeTimers();
  showShaderPreparationNotice("Preparation cancelled", "Showing the source");
  const overlay = document.getElementById("retro-player-shader-busy-overlay")!;
  expect(overlay.style.visibility).toBe("visible");
  expect(document.querySelector<HTMLElement>("[data-shader-busy-spinner]")!.hidden).toBe(true);
  expect(vi.getTimerCount()).toBe(0);
  document.querySelector<HTMLButtonElement>("[data-shader-busy-cancel]")!.click();
  expect(overlay.style.visibility).toBe("hidden");
});

it("uses only the selected language, including updates during preparation", () => {
  vi.useFakeTimers();
  const cancel = vi.fn();
  showShaderBusyOverlay("表示の準備", undefined, cancel, "ja");
  vi.advanceTimersByTime(2100);
  expect(document.querySelector("[data-shader-busy-cancel]")?.textContent).toBe("中断");
  expect(document.querySelector("[data-shader-busy-elapsed]")?.textContent).toBe("経過: 2 s");
  showShaderBusyOverlay("Preparing filter", undefined, undefined, "en");
  const overlay = document.getElementById("retro-player-shader-busy-overlay")!;
  const button = document.querySelector<HTMLButtonElement>("[data-shader-busy-cancel]")!;
  expect(button.textContent).toBe("Cancel");
  expect(overlay.textContent).not.toMatch(/[\u3040-\u30ff\u4e00-\u9fff]/);
  expect(document.querySelector("[data-shader-busy-elapsed]")?.textContent).toBe("Elapsed: 2 s");
  button.click();
  expect(button.textContent).toBe("Cancelling…");
  expect(cancel).toHaveBeenCalledTimes(1);
  showShaderPreparationNotice("Preparation cancelled", undefined, "en");
  expect(button.textContent).toBe("Close");
  expect(overlay.textContent).not.toMatch(/[\u3040-\u30ff\u4e00-\u9fff]/);
  showShaderPreparationNotice("表示の準備を中断しました", undefined, "ja");
  expect(button.textContent).toBe("閉じる");
});
