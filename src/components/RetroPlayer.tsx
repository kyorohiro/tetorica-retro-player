import { useDialog } from "../useDialog";
import { showRetroPlayerSetting } from "./showRetroPlayerSetting";
import type { RetroFilterState as RetroFilterStateType } from "../hooks/useRetroFilterState";
import type { usePixiVideoPlayer } from "../hooks/usePixiVideoPlayer";

type RetroPlayerProps = {
  player: ReturnType<typeof usePixiVideoPlayer>;
  className?: string;
  externalFilterState: RetroFilterStateType;
};

export function RetroPlayer({ player, className, externalFilterState }: RetroPlayerProps) {
  const filterState = externalFilterState;
  const { showDialog } = useDialog();

  return (
    <div className={className ?? "h-full w-full relative"}>
      <div ref={player.canvasHostRef} className="h-full w-full" />
      <button
        type="button"
        onClick={() => {
          void showRetroPlayerSetting(
            showDialog,
            filterState,
            player.previewName,
            player.sourceDimensions,
            () => {
              player.refreshLayout();
            },
          );
        }}
        className="absolute right-3 top-3 z-10 rounded-md bg-slate-800/60 px-2 py-1 text-xs text-slate-100 hover:bg-slate-800"
      >
        Settings
      </button>
    </div>
  );
}

export default RetroPlayer;
