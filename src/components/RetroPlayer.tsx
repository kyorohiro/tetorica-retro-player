import React from "react";
import { usePixiVideoPlayer } from "../hooks/usePixiVideoPlayer";
import { useRetroFilterState } from "../hooks/useRetroFilterState";

type RetroPlayerProps = {
  src: string;
  kind?: "video" | "image" | "audio";
  className?: string;
  onError?: (error: Error) => void;
};

export function RetroPlayer({
  src,
  kind = "video",
  className,
  onError,
}: RetroPlayerProps) {
  const filterState = useRetroFilterState();
  const player = usePixiVideoPlayer(filterState);

  React.useEffect(() => {
    if (!src) return;

    void (async () => {
      try {
        await player.previewUrl(src, kind);
      } catch (error) {
        if (error instanceof Error) {
          onError?.(error);
          return;
        }

        onError?.(new Error(String(error)));
      }
    })();

    return undefined;
  }, [src, kind, onError]);

  return <div className={className ?? "h-full w-full"} ref={player.canvasHostRef} />;
}

export default RetroPlayer;
