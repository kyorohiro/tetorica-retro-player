import { useState } from "react";
import {
  Gauge,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";

type VideoControlsProps = {
  currentTime: number;
  duration: number;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isAudioFxEnabled: boolean;
  isNoiseEnabled: boolean;
  hasVideo: boolean;
  isSettingsOpen: boolean;
  lofiAmount: number;
  noiseLevel: number;
  playbackRate: number;
  volume: number;
  onChangeLofiAmount: (amount: number) => void;
  onChangeNoiseLevel: (amount: number) => void;
  onChangePlaybackRate: (rate: number) => void;
  onChangeVolume: (volume: number) => void;
  onRestart: () => void;
  onSeek: (time: number) => void;
  onStepFrame: (direction: -1 | 1) => void;
  onToggleLoop: () => void;
  onToggleAudioFx: () => void;
  onToggleMute: () => void;
  onToggleNoise: () => void;
  onTogglePlayback: () => void;
  onToggleSettings: () => void;
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
  isAudioFxEnabled,
  isNoiseEnabled,
  hasVideo,
  isSettingsOpen,
  lofiAmount,
  noiseLevel,
  playbackRate,
  volume,
  onChangeLofiAmount,
  onChangeNoiseLevel,
  onChangePlaybackRate,
  onChangeVolume,
  onRestart,
  onSeek,
  onStepFrame,
  onToggleLoop,
  onToggleAudioFx,
  onToggleMute,
  onToggleNoise,
  onTogglePlayback,
  onToggleSettings,
}: VideoControlsProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onTogglePlayback}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-slate-100 hover:bg-emerald-500/20"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-slate-100 hover:bg-sky-500/20"
        >
          <RotateCcw size={16} />
          Restart
        </button>
        <button
          type="button"
          onClick={() => {
            onSeek(Math.max(currentTime - 5, 0));
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
        >
          <SkipBack size={16} />
          -5s
        </button>
        <button
          type="button"
          onClick={() => {
            onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
        >
          <SkipForward size={16} />
          +5s
        </button>
        <button
          type="button"
          onClick={onToggleMute}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          type="button"
          onClick={onToggleLoop}
          className={[
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-slate-100",
            isLooping
              ? "border-sky-400 bg-sky-500/20"
              : "border-slate-600 bg-slate-900 hover:bg-slate-800",
          ].join(" ")}
        >
          <RotateCcw size={16} />
          {isLooping ? "Loop on" : "Loop off"}
        </button>
        {hasVideo && (
          <>
            <button
              type="button"
              onClick={() => {
                onStepFrame(-1);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
            >
              <StepBack size={16} />
              Prev frame
            </button>
            <button
              type="button"
              onClick={() => {
                onStepFrame(1);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
            >
              <StepForward size={16} />
              Next frame
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onToggleSettings}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
        >
          <SlidersHorizontal size={16} />
          {isSettingsOpen ? "Hide settings" : "Show settings"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsAdvancedOpen((current) => !current);
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
        >
          {isAdvancedOpen ? "Hide details" : "More controls"}
        </button>
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
              "rounded-lg border px-3 py-2 text-slate-100",
              playbackRate === rate
                ? "border-sky-400 bg-sky-500/20"
                : "border-slate-600 bg-slate-900 hover:bg-slate-800",
            ].join(" ")}
          >
            <Gauge size={14} />
            {rate}x
          </button>
        ))}
      </div>

      {isAdvancedOpen && (
        <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/50 p-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onToggleAudioFx}
              className={[
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-slate-100",
                isAudioFxEnabled
                  ? "border-amber-400 bg-amber-500/20"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              <Waves size={16} />
              {isAudioFxEnabled ? "Lo-Fi on" : "Lo-Fi off"}
            </button>
            <button
              type="button"
              onClick={onToggleNoise}
              className={[
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-slate-100",
                isNoiseEnabled
                  ? "border-fuchsia-400 bg-fuchsia-500/20"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              <Mic2 size={16} />
              {isNoiseEnabled ? "Noise on" : "Noise off"}
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

          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Lo-Fi amount</span>
              <span>{Math.round(lofiAmount * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={lofiAmount}
              onChange={(ev) => {
                onChangeLofiAmount(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Spatial noise</span>
              <span>{Math.round(noiseLevel * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={noiseLevel}
              onChange={(ev) => {
                onChangeNoiseLevel(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>
        </div>
      )}

      <p className="text-[11px] text-slate-500">
        Shortcuts: `Space`/`K` play-pause, `Left/Right` seek 5s, `J/L` seek 10s
      </p>
    </div>
  );
}
