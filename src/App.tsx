import { useEffect, useRef, useState } from "react";
import "./App.css";
import { RetroFilterPanel } from "./components/RetroFilterPanel";
import { VideoControls } from "./components/VideoControls";
import { usePixiVideoPlayer } from "./hooks/usePixiVideoPlayer";
import { useRetroFilterState } from "./hooks/useRetroFilterState";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const filterState = useRetroFilterState();
  const player = usePixiVideoPlayer(filterState);

  useEffect(() => {
    if (!isPreviewMaximized) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setIsPreviewMaximized(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewMaximized]);

  useEffect(() => {
    const frameA = window.requestAnimationFrame(() => {
      player.refreshLayout();
      window.requestAnimationFrame(() => {
        player.refreshLayout();
      });
    });

    const timeoutId = window.setTimeout(() => {
      player.refreshLayout();
    }, 120);

    return () => {
      window.cancelAnimationFrame(frameA);
      window.clearTimeout(timeoutId);
    };
  }, [isPreviewMaximized]);

  return (
    <main
      className={`bg-slate-200 text-slate-800 ${
        isPreviewMaximized ? "h-screen overflow-hidden" : "h-screen overflow-y-auto"
      }`}
      onDrop={(ev) => {
        ev.preventDefault();
        const files = ev.dataTransfer.files;

        if (files.length > 0) {
          void player.previewFile(files[0]);
        }
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8">
          <p className="text-sm text-slate-400">video preview via pixi.js</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Tetorica Retro Player
          </h1>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className={`space-y-3 ${isPreviewMaximized ? "min-h-0 overflow-y-auto pr-1" : ""}`}>
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop image/video/audio here, or click to add file
              </button>

              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    void player.startDisplayCapture();
                  }}
                  className="rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-sm text-slate-100 transition hover:bg-emerald-500/20"
                >
                  Capture screen or window
                </button>
                {player.isCaptureActive && (
                  <button
                    type="button"
                    onClick={player.stopDisplayCapture}
                    className="rounded-xl border border-dashed border-rose-500/40 bg-rose-500/10 p-4 text-center text-sm text-slate-100 transition hover:bg-rose-500/20"
                  >
                    Stop capture
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewMaximized((current) => !current);
                  }}
                  className="rounded-xl border border-dashed border-sky-500/40 bg-sky-500/10 p-4 text-center text-sm text-slate-100 transition hover:bg-sky-500/20"
                >
                  {isPreviewMaximized ? "Exit maximize" : "Maximize preview"}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  folderInputRef.current?.click();
                }}
                className="hidden rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop folders here, or click to add folders
              </button>

              <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-xs text-slate-300">
                <p className="font-semibold text-slate-100">Current preview</p>

                <RetroFilterPanel
                  colorLevels={filterState.colorLevels}
                  ditherStrength={filterState.ditherStrength}
                  monoTint={filterState.monoTint}
                  paletteMode={filterState.paletteMode}
                  phosphorStrength={filterState.phosphorStrength}
                  previewName={player.previewName}
                  scanlineStrength={filterState.scanlineStrength}
                  targetHeight={filterState.targetHeight}
                  targetWidth={filterState.targetWidth}
                  vignetteStrength={filterState.vignetteStrength}
                  onApplyPreset={filterState.applyPreset}
                  onSetColorLevels={filterState.setColorLevels}
                  onSetDitherStrength={filterState.setDitherStrength}
                  onSetMonoTint={filterState.setMonoTint}
                  onSetPaletteMode={filterState.setPaletteMode}
                  onSetPhosphorStrength={filterState.setPhosphorStrength}
                  onSetScanlineStrength={filterState.setScanlineStrength}
                  onSetTargetHeight={filterState.setTargetHeight}
                  onSetTargetWidth={filterState.setTargetWidth}
                  onSetVignetteStrength={filterState.setVignetteStrength}
                />

                {player.hasPlayableMedia && (
                  <VideoControls
                    currentTime={player.currentTime}
                    duration={player.duration}
                    isAudioFxEnabled={player.isAudioFxEnabled}
                    isLooping={player.isLooping}
                    isMuted={player.isMuted}
                    isNoiseEnabled={player.isNoiseEnabled}
                    isPlaying={player.isPlaying}
                    lofiAmount={player.lofiAmount}
                    noiseLevel={player.noiseLevel}
                    playbackRate={player.playbackRate}
                    volume={player.volume}
                    onChangeLofiAmount={player.setLofiAmount}
                    onChangeNoiseLevel={player.setNoiseLevel}
                    onChangePlaybackRate={player.changePlaybackRate}
                    onChangeVolume={player.changeVolume}
                    onRestart={() => {
                      player.seekTo(0);
                      void player.playVideoWithAudio();
                    }}
                    onSeek={player.seekTo}
                    onStepFrame={player.stepFrame}
                    onToggleAudioFx={player.toggleAudioFx}
                    onToggleLoop={player.toggleLoop}
                    onToggleMute={player.toggleMute}
                    onToggleNoise={player.toggleNoise}
                    onTogglePlayback={() => {
                      void player.togglePlayback();
                    }}
                  />
                )}

                {player.needsUserPlay && (
                  <p className="mt-2 text-amber-300">
                    自動再生が止められたので、Play ボタンを押すと音が出ます。
                  </p>
                )}

                {player.previewError && (
                  <p className="mt-2 text-rose-400">{player.previewError}</p>
                )}
              </div>
            </div>

            <div
              className={`rounded-2xl border border-slate-700 bg-slate-950 p-3 ${
                isPreviewMaximized
                  ? "fixed inset-0 z-50 flex items-stretch justify-stretch border-0 bg-slate-950/95 p-6"
                  : "min-w-0"
              }`}
            >
              {isPreviewMaximized && (
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewMaximized(false);
                  }}
                  className="absolute right-6 top-6 z-10 rounded-xl border border-slate-500/50 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-800"
                >
                  Exit maximize
                </button>
              )}
              <div
                ref={player.canvasHostRef}
                className={`overflow-hidden rounded-xl bg-slate-950 ${
                  isPreviewMaximized
                    ? "h-full min-h-0 w-full"
                    : "h-[60vh] min-h-[360px] w-full min-w-0"
                }`}
              >
                {player.hasAudioOnly && (
                  <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400">
                    Audio preview is playing through the retro audio chain.
                  </div>
                )}
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,audio/*"
            multiple
            className="hidden"
            onChange={(ev) => {
              const files = ev.currentTarget.files;
              if (files && files.length > 0) {
                void player.previewFile(files[0]);
              }

              ev.currentTarget.value = "";
            }}
          />

          <input
            ref={folderInputRef}
            type="file"
            multiple
            {...({ webkitdirectory: "true" } as any)}
            className="hidden"
            onChange={(ev) => {
              ev.currentTarget.value = "";
            }}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
