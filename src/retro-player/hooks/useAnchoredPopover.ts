import React from "react";

// Shared position/dismiss logic for a small popover anchored to a button:
// keeps it on-screen, prefers opening below the anchor (only flips above
// when there truly isn't room below), and closes on outside click,
// scroll/resize reflow, or Escape.
export function useAnchoredPopover(estimatedWidth: number, estimatedHeight: number) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  const updatePosition = React.useCallback(() => {
    if (typeof window === "undefined" || !anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const margin = 8;
    const width = Math.min(estimatedWidth, window.innerWidth - margin * 2);
    const spaceAbove = Math.max(0, rect.top - margin);
    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - margin);
    // Bias toward opening below: only flip above when below truly doesn't
    // fit and above does.
    const openUp = spaceBelow < estimatedHeight && spaceAbove >= estimatedHeight;

    const left = Math.min(
      Math.max(margin, rect.left),
      Math.max(margin, window.innerWidth - width - margin),
    );
    const top = openUp
      ? Math.max(margin, rect.top - estimatedHeight - margin)
      : Math.min(rect.bottom + margin, Math.max(margin, window.innerHeight - estimatedHeight - margin));

    setStyle({ position: "fixed", left, top, width, zIndex: 1000 });
  }, [estimatedWidth, estimatedHeight]);

  React.useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleWindowChange = () => { updatePosition(); };
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        target &&
        !popoverRef.current?.contains(target) &&
        !anchorRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("resize", handleWindowChange, { passive: true });
    window.addEventListener("scroll", handleWindowChange, { passive: true });
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange);
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, updatePosition]);

  return { isOpen, setIsOpen, style, anchorRef, popoverRef };
}
