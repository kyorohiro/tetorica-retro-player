import { useEffect, useState, type RefObject } from "react";

/** DOM-only diagnostics: no WebGL queries and no space reserved in layout. */
export function RenderDensityOverlay({ hostRef }: {
  hostRef: RefObject<HTMLDivElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState("");

  useEffect(() => {
    if (!open) return;
    const refresh = () => {
      const canvas = hostRef.current?.querySelector<HTMLCanvasElement>("canvas[data-retro-sizing]");
      if (!canvas) {
        setReport("Canvas の準備待ち");
        return;
      }
      const info = JSON.parse(canvas.dataset.retroSizing!);
      const rect = canvas.getBoundingClientRect();
      const number = (value: number) => Number.isFinite(value) ? value.toFixed(2) : "—";
      setReport([
        `CSS: ${number(rect.width)} × ${number(rect.height)}`,
        `Canvas: ${canvas.width} × ${canvas.height}`,
        `描画 px / CSS px: ${number(canvas.width / rect.width)} × ${number(canvas.height / rect.height)}`,
        `DPR: ${number(window.devicePixelRatio)}`,
        `補正後の表示密度: ${number(info.displayPixelRatio ?? window.devicePixelRatio)}`,
        `推定ページ倍率（起動時基準）: ${number((info.displayPixelRatio ?? window.devicePixelRatio) / window.devicePixelRatio)}`,
        `Viewport scale: ${number(window.visualViewport?.scale ?? 1)}`,
        `Window inner: ${window.innerWidth} × ${window.innerHeight}`,
        `Window outer: ${window.outerWidth} × ${window.outerHeight}`,
        `Document client: ${document.documentElement.clientWidth} × ${document.documentElement.clientHeight}`,
        `Visual viewport: ${number(window.visualViewport?.width ?? NaN)} × ${number(window.visualViewport?.height ?? NaN)}`,
        // Observation only: browser chrome and sidebars also affect this ratio.
        `Outer / inner幅（倍率未確定）: ${number(window.outerWidth / window.innerWidth)}`,
        `Render scale: ${number(info.renderScale)}`,
        `Cap縮小倍率: ${number(info.totalScaleDownFactor)}`,
        `Source: ${info.sourceWidth} × ${info.sourceHeight}`,
        `設定Target: ${info.targetWidth} × ${info.targetHeight}`,
        `Spacing: X ${info.spacingX} / Y ${info.spacingY}`,
        `Auto: ${info.autoTargetSize ? info.basis : "off"} / 軸 ${info.selectedAxis}`,
        `Sampling: ${info.presentationSamplingMode}`,
        `CSS sampling: ${getComputedStyle(canvas).imageRendering}`,
        `サイズ適用: ${canvas.width === info.plannedBufferWidth && canvas.height === info.plannedBufferHeight ? "完了" : "待機中"}`,
      ].join("\n"));
    };
    refresh();
    const timer = window.setInterval(refresh, 1000);
    return () => window.clearInterval(timer);
  }, [open, hostRef]);

  return (
    <div className="absolute left-2 top-2 z-30 max-w-[calc(100%-1rem)] text-xs"
      onPointerDown={event => event.stopPropagation()}
      onPointerUp={event => event.stopPropagation()}
      onClick={event => event.stopPropagation()}
      onDoubleClick={event => event.stopPropagation()}>
      <button type="button" aria-expanded={open} title="描画サイズ・ピクセル密度"
        className="rounded bg-black/75 px-2 py-1 text-white"
        onClick={() => setOpen(value => !value)}>
        {open ? "密度情報を閉じる" : "px"}
      </button>
      {open && <textarea readOnly aria-label="描画サイズ・ピクセル密度"
        className="mt-1 block h-64 w-80 max-w-full resize-none rounded border border-slate-600 bg-black/90 p-2 font-mono text-xs text-white"
        value={report} spellCheck={false} />}
    </div>
  );
}
