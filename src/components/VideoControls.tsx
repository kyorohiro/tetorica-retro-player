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
  mode: "playback" | "audio-settings";
  hasPlayback: boolean;
  currentTime: number;
  duration: number;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isAudioFxEnabled: boolean;
  isNoiseEnabled: boolean;
  hasVideo: boolean;
  isVideoSettingsOpen: boolean;
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
  onBackToPlayback: () => void;
  onResetSettings: () => void;
  onToggleVideoSettings: () => void;
  onToggleAudioSettings: () => void;
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
  mode,
  hasPlayback,
  currentTime,
  duration,
  isLooping,
  isMuted,
  isPlaying,
  isAudioFxEnabled,
  isNoiseEnabled,
  hasVideo,
  isVideoSettingsOpen,
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
  onBackToPlayback,
  onResetSettings,
  onToggleVideoSettings,
  onToggleAudioSettings,
}: VideoControlsProps) {
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  if (mode === "audio-settings") {
    return (
      <div className="mt-3 space-y-3 rounded-xl border border-slate-700 bg-slate-900/50 p-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onBackToPlayback}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
          >
            Back to Playback
          </button>
        </div>

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
    );
  }

  return (
    <div className="mt-3 space-y-3">
      {hasPlayback && (
        <>
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
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSpeedOpen((current) => !current);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
              >
                <Gauge size={14} />
                Speed {playbackRate}x
              </button>
              {isSpeedOpen && (
                <div className="absolute bottom-full left-0 z-10 mb-1 flex min-w-28 flex-col gap-1 rounded-lg border border-slate-700 bg-slate-950 p-2 shadow-lg">
                  {[0.5, 1, 2].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        onChangePlaybackRate(rate);
                        setIsSpeedOpen(false);
                      }}
                      className={[
                        "rounded-md px-3 py-2 text-left text-slate-100 hover:bg-slate-800",
                        playbackRate === rate ? "bg-sky-500/20 text-sky-100" : "",
                      ].join(" ")}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>
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
          </div>
        </>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleVideoSettings}
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/60 bg-cyan-500/20 px-3 py-2 text-cyan-50 hover:bg-cyan-500/30"
        >
          <SlidersHorizontal size={16} />
          {isVideoSettingsOpen ? "Hide Video Setting" : "Show Video Setting"}
        </button>
        {hasPlayback && (
          <button
            type="button"
            onClick={onToggleAudioSettings}
            className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/60 bg-fuchsia-500/20 px-3 py-2 text-fuchsia-50 hover:bg-fuchsia-500/30"
          >
            <Mic2 size={16} />
            Show Audio Setting
          </button>
        )}
        <button
          type="button"
          onClick={onResetSettings}
          className="inline-flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-slate-100 hover:bg-rose-500/20"
        >
          Reset Settings
        </button>
      </div>
      {hasPlayback && (
        <p className="text-[11px] text-slate-500">
          Shortcuts: `Space`/`K` play-pause, `Left/Right` seek 5s, `J/L` seek 10s
        </p>
      )}
    </div>
  );
}
