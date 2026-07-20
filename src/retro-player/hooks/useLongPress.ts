import { useCallback, useRef, useState } from "react";

export function useLongPress(
  onLongPress: () => void,
  onShortPress: () => void,
  delay = 600,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressedRef = useRef(false);
  const shortPressHandledRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      activePointerIdRef.current = e.pointerId;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      longPressedRef.current = false;
      shortPressHandledRef.current = false;
      setIsHolding(true);
      timerRef.current = setTimeout(() => {
        longPressedRef.current = true;
        timerRef.current = null;
        setIsHolding(false);
        onLongPress();
      }, delay);
    },
    [onLongPress, delay],
  );

  const clearHold = useCallback(() => {
    setIsHolding(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const releasePointer = useCallback((e: React.PointerEvent) => {
    if (activePointerIdRef.current !== e.pointerId) {
      return false;
    }

    activePointerIdRef.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    return true;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!releasePointer(e)) {
      return;
    }

    const shouldTriggerShortPress =
      !longPressedRef.current &&
      !shortPressHandledRef.current &&
      timerRef.current !== null;
    clearHold();
    if (shouldTriggerShortPress) {
      shortPressHandledRef.current = true;
      onShortPress();
    }
  }, [clearHold, onShortPress, releasePointer]);

  const cancel = useCallback((e?: React.PointerEvent) => {
    if (e && !releasePointer(e)) {
      return;
    }

    clearHold();
    shortPressHandledRef.current = false;
  }, [clearHold, releasePointer]);

  const onPointerLeave = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      return;
    }
    cancel(e);
  }, [cancel]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (longPressedRef.current) {
        longPressedRef.current = false;
        shortPressHandledRef.current = false;
        e.stopPropagation();
        return;
      }
      if (shortPressHandledRef.current) {
        shortPressHandledRef.current = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onShortPress();
    },
    [onShortPress],
  );

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return {
    isHolding,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerCancel: cancel,
    onClick,
    onContextMenu,
  };
}
