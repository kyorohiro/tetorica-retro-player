import { useCallback, useRef, useState } from "react";

export function useLongPress(
  onLongPress: () => void,
  onShortPress: () => void,
  delay = 600,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressedRef = useRef(false);
  const [isHolding, setIsHolding] = useState(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      longPressedRef.current = false;
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

  const cancel = useCallback(() => {
    setIsHolding(false);
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (longPressedRef.current) {
        longPressedRef.current = false;
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
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
    onClick,
    onContextMenu,
  };
}
