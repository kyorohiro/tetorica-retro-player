import React from "react";
import { usePixiVideoPlayer } from "../hooks/usePixiVideoPlayer";
import { useRetroFilterState } from "../hooks/useRetroFilterState";

type RetroPlayerProps = {
  src: string;
  kind?: "video" | "image" | "audio";
  className?: string;
};

export function RetroPlayer({ src, kind = "video", className }: RetroPlayerProps) {
  const filterState = useRetroFilterState();
  const player = usePixiVideoPlayer(filterState);

  React.useEffect(() => {
    if (!src) return;

    let mounted = true;

    void (async () => {
      try {
        await player.previewUrl(src, kind);
      } catch (e) {
        // ignore here; parent can handle errors if needed
      }
    })();

    return () => {
      mounted = false;
      player.stopDisplayCapture();
    };
  }, [src, kind]);

  return <div className={className ?? "h-full w-full"} ref={player.canvasHostRef} />;
}

export default RetroPlayer;
