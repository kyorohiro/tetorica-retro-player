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
  radioToneAmount: number;
  bitCrushAmount: number;
  sampleRateReductionAmount: number;
  bassAmount: number;
  midAmount: number;
  trebleAmount: number;
  stereoWidthAmount: number;
  smallSpeakerRoomAmount: number;
  wowFlutterAmount: number;
  noiseLevel: number;
  vinylDustAmount: number;
  playbackRate: number;
  volume: number;
  onChangeLofiAmount: (amount: number) => void;
  onChangeRadioToneAmount: (amount: number) => void;
  onChangeBitCrushAmount: (amount: number) => void;
  onChangeSampleRateReductionAmount: (amount: number) => void;
  onChangeBassAmount: (amount: number) => void;
  onChangeMidAmount: (amount: number) => void;
  onChangeTrebleAmount: (amount: number) => void;
  onChangeStereoWidthAmount: (amount: number) => void;
  onChangeSmallSpeakerRoomAmount: (amount: number) => void;
  onChangeWowFlutterAmount: (amount: number) => void;
  onChangeNoiseLevel: (amount: number) => void;
  onChangeVinylDustAmount: (amount: number) => void;
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
  radioToneAmount,
  bitCrushAmount,
  sampleRateReductionAmount,
  bassAmount,
  midAmount,
  trebleAmount,
  stereoWidthAmount,
  smallSpeakerRoomAmount,
  wowFlutterAmount,
  noiseLevel,
  vinylDustAmount,
  playbackRate,
  volume,
  onChangeLofiAmount,
  onChangeRadioToneAmount,
  onChangeBitCrushAmount,
  onChangeSampleRateReductionAmount,
  onChangeBassAmount,
  onChangeMidAmount,
  onChangeTrebleAmount,
  onChangeStereoWidthAmount,
  onChangeSmallSpeakerRoomAmount,
  onChangeWowFlutterAmount,
  onChangeNoiseLevel,
  onChangeVinylDustAmount,
  onChangePlaybackRate,
  onChangeVolume,
  onRestart: _onRestart,
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
  const [selectedAudioPreset, setSelectedAudioPreset] = useState<
    "none" | "lofi" | "radio" | "tape" | "vinyl" | "vintage-mic" | "earphone" | null
  >(null);
  // Keep the restart callback in the surface area for future UI revival.
  void _onRestart;

  const applyAudioPreset = (
    preset: "none" | "lofi" | "radio" | "tape" | "vinyl" | "vintage-mic" | "earphone",
  ) => {
    const presetNeedsFx = preset !== "none";
    const presetNeedsNoise =
      preset === "lofi" ||
      preset === "radio" ||
      preset === "tape" ||
      preset === "vinyl" ||
      preset === "vintage-mic";

    if (presetNeedsFx && !isAudioFxEnabled) {
      onToggleAudioFx();
    }
    if (!presetNeedsFx && isAudioFxEnabled) {
      onToggleAudioFx();
    }
    if (presetNeedsNoise !== isNoiseEnabled) {
      onToggleNoise();
    }

    switch (preset) {
      case "none":
        onChangeVolume(1);
        onChangeLofiAmount(0);
        onChangeRadioToneAmount(0);
        onChangeBitCrushAmount(0);
        onChangeSampleRateReductionAmount(0);
        onChangeBassAmount(0);
        onChangeMidAmount(0);
        onChangeTrebleAmount(0);
        onChangeStereoWidthAmount(0);
        onChangeSmallSpeakerRoomAmount(0);
        onChangeWowFlutterAmount(0);
        onChangeNoiseLevel(0);
        onChangeVinylDustAmount(0);
        break;
      case "lofi":
        onChangeVolume(0.92);
        onChangeLofiAmount(0.7);
        onChangeRadioToneAmount(0.18);
        onChangeBitCrushAmount(0.22);
        onChangeSampleRateReductionAmount(0.24);
        onChangeBassAmount(0.08);
        onChangeMidAmount(-0.08);
        onChangeTrebleAmount(-0.18);
        onChangeStereoWidthAmount(-0.08);
        onChangeSmallSpeakerRoomAmount(0.08);
        onChangeWowFlutterAmount(0.12);
        onChangeNoiseLevel(0.005);
        onChangeVinylDustAmount(0);
        break;
      case "radio":
        onChangeVolume(0.88);
        onChangeLofiAmount(0.4);
        onChangeRadioToneAmount(0.9);
        onChangeBitCrushAmount(0.12);
        onChangeSampleRateReductionAmount(0.38);
        onChangeBassAmount(-0.4);
        onChangeMidAmount(0.18);
        onChangeTrebleAmount(-0.32);
        onChangeStereoWidthAmount(-0.55);
        onChangeSmallSpeakerRoomAmount(0.12);
        onChangeWowFlutterAmount(0.08);
        onChangeNoiseLevel(0.01);
        onChangeVinylDustAmount(0);
        break;
      case "tape":
        onChangeVolume(0.94);
        onChangeLofiAmount(0.22);
        onChangeRadioToneAmount(0.1);
        onChangeBitCrushAmount(0.04);
        onChangeSampleRateReductionAmount(0.08);
        onChangeBassAmount(0.12);
        onChangeMidAmount(0);
        onChangeTrebleAmount(-0.14);
        onChangeStereoWidthAmount(0.06);
        onChangeSmallSpeakerRoomAmount(0.18);
        onChangeWowFlutterAmount(0.42);
        onChangeNoiseLevel(0.0075);
        onChangeVinylDustAmount(0);
        break;
      case "vinyl":
        onChangeVolume(0.96);
        onChangeLofiAmount(0.14);
        onChangeRadioToneAmount(0.06);
        onChangeBitCrushAmount(0.01);
        onChangeSampleRateReductionAmount(0.03);
        onChangeBassAmount(0.06);
        onChangeMidAmount(-0.02);
        onChangeTrebleAmount(-0.16);
        onChangeStereoWidthAmount(-0.18);
        onChangeSmallSpeakerRoomAmount(0.03);
        onChangeWowFlutterAmount(0.18);
        onChangeNoiseLevel(0.0035);
        onChangeVinylDustAmount(0.58);
        break;
      case "vintage-mic":
        onChangeVolume(0.94);
        onChangeLofiAmount(0.34);
        onChangeRadioToneAmount(0.28);
        onChangeBitCrushAmount(0);
        onChangeSampleRateReductionAmount(0.02);
        onChangeBassAmount(-0.24);
        onChangeMidAmount(0.32);
        onChangeTrebleAmount(-0.68);
        onChangeStereoWidthAmount(-0.32);
        onChangeSmallSpeakerRoomAmount(0.12);
        onChangeWowFlutterAmount(0.04);
        onChangeNoiseLevel(0.0025);
        onChangeVinylDustAmount(0.08);
        break;
      case "earphone":
        onChangeVolume(1);
        onChangeLofiAmount(0);
        onChangeRadioToneAmount(0);
        onChangeBitCrushAmount(0);
        onChangeSampleRateReductionAmount(0);
        onChangeBassAmount(0.1);
        onChangeMidAmount(0);
        onChangeTrebleAmount(0.08);
        onChangeStereoWidthAmount(0.22);
        onChangeSmallSpeakerRoomAmount(0);
        onChangeWowFlutterAmount(0);
        onChangeNoiseLevel(0);
        onChangeVinylDustAmount(0);
        break;
    }

    setSelectedAudioPreset(preset);
  };

  if (mode === "audio-settings") {
    return (
      <div className="mt-3 space-y-3 rounded-xl border border-slate-700 bg-slate-900/50 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-100">Audio settings</p>
            <p className="text-[11px] text-slate-400">Shape the sound with effects, noise, and space.</p>
          </div>
          <button
            type="button"
            onClick={onBackToPlayback}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
          >
            Back to Playback
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onToggleAudioFx}
            className={[
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-slate-100",
              isAudioFxEnabled
                ? "border-amber-400 bg-amber-500/20"
                : "border-slate-600 bg-slate-900 hover:bg-slate-800",
            ].join(" ")}
          >
            <Waves size={16} />
            {isAudioFxEnabled ? "Effects on" : "Effects off"}
          </button>
          <button
            type="button"
            onClick={onToggleNoise}
            className={[
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-slate-100",
              isNoiseEnabled
                ? "border-fuchsia-400 bg-fuchsia-500/20"
                : "border-slate-600 bg-slate-900 hover:bg-slate-800",
            ].join(" ")}
          >
            <Mic2 size={16} />
            {isNoiseEnabled ? "Noise on" : "Noise off"}
          </button>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/55 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Presets
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["none", "None"],
              ["lofi", "Lo-Fi"],
              ["radio", "Radio"],
              ["tape", "Tape"],
              ["vinyl", "Vinyl"],
              ["vintage-mic", "Vintage Mic"],
              ["earphone", "Earphone"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  applyAudioPreset(
                    key as
                      | "none"
                      | "lofi"
                      | "radio"
                      | "tape"
                      | "vinyl"
                      | "vintage-mic"
                      | "earphone",
                  );
                }}
                className={[
                  "inline-flex min-h-10 items-center justify-center rounded-lg border px-3 py-2 text-sm transition",
                  selectedAudioPreset === key
                    ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-50 shadow-[0_0_14px_rgba(74,222,128,0.45)]"
                    : "border-cyan-400/40 bg-cyan-500/10 text-cyan-50 hover:bg-cyan-500/20",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/55 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Effects
          </p>
          <div className="space-y-3">
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
                <span>Radio tone</span>
                <span>{Math.round(radioToneAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={radioToneAmount}
                onChange={(ev) => {
                  onChangeRadioToneAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Bit crush</span>
                <span>{Math.round(bitCrushAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bitCrushAmount}
                onChange={(ev) => {
                  onChangeBitCrushAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Sample rate</span>
                <span>{Math.round(sampleRateReductionAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sampleRateReductionAmount}
                onChange={(ev) => {
                  onChangeSampleRateReductionAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Wow & Flutter</span>
                <span>{Math.round(wowFlutterAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={wowFlutterAmount}
                onChange={(ev) => {
                  onChangeWowFlutterAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Bass</span>
                <span>{bassAmount >= 0 ? "+" : ""}{(bassAmount * 15).toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.01"
                value={bassAmount}
                onChange={(ev) => {
                  onChangeBassAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Mid</span>
                <span>{midAmount >= 0 ? "+" : ""}{(midAmount * 15).toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.01"
                value={midAmount}
                onChange={(ev) => {
                  onChangeMidAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Treble</span>
                <span>{trebleAmount >= 0 ? "+" : ""}{(trebleAmount * 15).toFixed(1)} dB</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.01"
                value={trebleAmount}
                onChange={(ev) => {
                  onChangeTrebleAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/55 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Output
          </p>
          <div className="space-y-3">
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
                <span>Stereo width</span>
                <span>
                  {stereoWidthAmount < 0
                    ? `Mono ${Math.round(Math.abs(stereoWidthAmount) * 100)}%`
                    : stereoWidthAmount > 0
                      ? `Wide ${Math.round(stereoWidthAmount * 100)}%`
                      : "Original"}
                </span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={stereoWidthAmount}
                onChange={(ev) => {
                  onChangeStereoWidthAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Small room</span>
                <span>{Math.round(smallSpeakerRoomAmount * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={smallSpeakerRoomAmount}
                onChange={(ev) => {
                  onChangeSmallSpeakerRoomAmount(Number(ev.currentTarget.value));
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950/55 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Noise
          </p>
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Surface hiss</span>
              <span>{(noiseLevel * 100).toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.05"
              value={noiseLevel * 100}
              onChange={(ev) => {
                onChangeNoiseLevel(Number(ev.currentTarget.value) / 100);
              }}
              className="w-full"
            />
          </div>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Vinyl dust</span>
              <span>{Math.round(vinylDustAmount * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={vinylDustAmount}
              onChange={(ev) => {
                onChangeVinylDustAmount(Number(ev.currentTarget.value));
              }}
              className="w-full"
            />
          </div>
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

          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={onTogglePlayback}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-slate-100 hover:bg-emerald-500/20"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              title={isMuted ? "Unmute" : "Mute"}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              type="button"
              onClick={onToggleLoop}
              aria-label={isLooping ? "Loop on" : "Loop off"}
              title={isLooping ? "Loop on" : "Loop off"}
              className={[
                  "inline-flex min-h-11 items-center justify-center rounded-lg border px-3 py-2 text-slate-100",
                  isLooping
                    ? "border-sky-400 bg-sky-500/20"
                    : "border-slate-600 bg-slate-900 hover:bg-slate-800",
              ].join(" ")}
            >
              <RotateCcw size={16} />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSpeedOpen((current) => !current);
                }}
                aria-label={`Speed ${playbackRate}x`}
                title={`Speed ${playbackRate}x`}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
              >
                <Gauge size={14} />
              </button>
              {isSpeedOpen && (
                <div className="absolute bottom-full left-0 z-10 mb-1 flex min-w-full flex-col gap-1 rounded-lg border border-slate-700 bg-slate-950 p-2 shadow-lg">
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
            {hasVideo ? (
              <div className="col-span-4 grid grid-cols-6 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onStepFrame(-1);
                  }}
                  aria-label="Previous frame"
                  title="Previous frame"
                  className="col-span-1 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-2 py-2 text-slate-100 hover:bg-slate-800"
                >
                  <StepBack size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.max(currentTime - 5, 0));
                  }}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
                >
                  <SkipBack size={16} />
                  -5s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
                  }}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
                >
                  <SkipForward size={16} />
                  +5s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onStepFrame(1);
                  }}
                  aria-label="Next frame"
                  title="Next frame"
                  className="col-span-1 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-2 py-2 text-slate-100 hover:bg-slate-800"
                >
                  <StepForward size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.max(currentTime - 5, 0));
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
                >
                  <SkipBack size={16} />
                  -5s
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSeek(Math.min(currentTime + 5, duration || currentTime + 5));
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
                >
                  <SkipForward size={16} />
                  +5s
                </button>
              </>
            )}
          </div>
        </>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={onToggleVideoSettings}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-cyan-400/60 bg-cyan-500/20 px-2 py-2 text-xs text-cyan-50 hover:bg-cyan-500/30"
        >
          <SlidersHorizontal size={16} />
          {isVideoSettingsOpen ? "Close Video" : "Video"}
        </button>
        <button
          type="button"
          onClick={onToggleAudioSettings}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-fuchsia-400/60 bg-fuchsia-500/20 px-2 py-2 text-xs text-fuchsia-50 hover:bg-fuchsia-500/30"
        >
          <Mic2 size={16} />
          Audio
        </button>
        {/* Keep restart wired for future UX experiments; hiding the button is intentional. */}
        <button
          type="button"
          onClick={onResetSettings}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-2 py-2 text-xs text-slate-100 hover:bg-rose-500/20"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>
      {hasPlayback && (
        <p className="hidden text-[11px] text-slate-500">
          Shortcuts: `Space`/`K` play-pause, `Left/Right` seek 5s, `J/L` seek 10s
        </p>
      )}
    </div>
  );
}
