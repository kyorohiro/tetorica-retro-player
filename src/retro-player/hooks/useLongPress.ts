import { useCallback, useRef, useState } from "react";

export function useLongPress(
  onLongPress: () => void,
  onShortPress: () => void,
  delay = 600,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressedRef = useRef(false);
  const shortPressHandledRef = useRef(false);
  const [isHolding, setIsHolding] = useState(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
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

  const onPointerUp = useCallback(() => {
    const shouldTriggerShortPress =
      !longPressedRef.current &&
      !shortPressHandledRef.current &&
      timerRef.current !== null;
    clearHold();
    if (shouldTriggerShortPress) {
      shortPressHandledRef.current = true;
      onShortPress();
    }
  }, [clearHold, onShortPress]);

  const cancel = useCallback(() => {
    clearHold();
    shortPressHandledRef.current = false;
  }, [clearHold]);

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
    onPointerLeave: cancel,
    onPointerCancel: cancel,
    onClick,
    onContextMenu,
  };
}
