type VideoControlsProps = {
  currentTime: number;
  duration: number;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  playbackRate: number;
  volume: number;
  onChangePlaybackRate: (rate: number) => void;
  onChangeVolume: (volume: number) => void;
  onRestart: () => void;
  onSeek: (time: number) => void;
  onStepFrame: (direction: -1 | 1) => void;
  onToggleLoop: () => void;
  onToggleMute: () => void;
  onTogglePlayback: () => void;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainSeconds).padStart(2, "0")}`;
};

export function VideoControls({
  currentTime,
  duration,
  isLooping,
  isMuted,
  isPlaying,
  playbackRate,
  volume,
  onChangePlaybackRate,
  onChangeVolume,
  onRestart,
  onSeek,
  onStepFrame,
  onToggleLoop,
  onToggleMute,
  onTogglePlayback,
}: VideoControlsProps) {
  return (
    <div className="mt-3 space-y-3">
      <div>
        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={Math.max(duration, 0)}
          step="0.01"
          value={Math.min(currentTime, duration || 0)}
          onChange={(ev) => {
            onSeek(Number(ev.currentTarget.value));
          }}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onTogglePlayback}
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-slate-100 hover:bg-emerald-500/20"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-slate-100 hover:bg-sky-500/20"
        >
          Restart
        </button>
        <button
          type="button"
          onClick={() => {
            onSeek(Math.max(currentTime - 5, 0));
          }}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-100 hover:bg-slate-800"
        >
          -5s
        </button>
        <button
          type="button"
          onClick={() => {
            onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
          }}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-100 hover:bg-slate-800"
        >
          +5s
        </button>
        <button
          type="button"
          onClick={() => {
            onStepFrame(-1);
          }}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-100 hover:bg-slate-800"
        >
          Prev frame
        </button>
        <button
          type="button"
          onClick={() => {
            onStepFrame(1);
          }}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-100 hover:bg-slate-800"
        >
          Next frame
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onToggleMute}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-slate-100 hover:bg-slate-800"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          type="button"
          onClick={onToggleLoop}
          className={[
            "rounded-lg border px-3 py-1.5 text-slate-100",
            isLooping
              ? "border-sky-400 bg-sky-500/20"
              : "border-slate-600 bg-slate-900 hover:bg-slate-800",
          ].join(" ")}
        >
          {isLooping ? "Loop on" : "Loop off"}
        </button>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
          <span>Volume</span>
          <span>{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(ev) => {
            onChangeVolume(Number(ev.currentTarget.value));
          }}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-slate-400">Speed</span>
        {[0.5, 1, 2].map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => {
              onChangePlaybackRate(rate);
            }}
            className={[
              "rounded-lg border px-3 py-1.5 text-slate-100",
              playbackRate === rate
                ? "border-sky-400 bg-sky-500/20"
                : "border-slate-600 bg-slate-900 hover:bg-slate-800",
            ].join(" ")}
          >
            {rate}x
          </button>
        ))}
      </div>

      <p className="text-[11px] text-slate-500">
        Shortcuts: `Space`/`K` play-pause, `Left/Right` seek 5s, `J/L` seek 10s
      </p>
    </div>
  );
}
