import { useRef } from "react";
import "./App.css";
import { RetroFilterPanel } from "./components/RetroFilterPanel";
import { VideoControls } from "./components/VideoControls";
import { usePixiVideoPlayer } from "./hooks/usePixiVideoPlayer";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const player = usePixiVideoPlayer();

  return (
    <main
      className="h-screen overflow-y-auto bg-slate-200 text-slate-800"
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full rounded-xl border border-dashed border-slate-600 bg-slate-950 p-6 text-center text-sm text-slate-300 transition hover:border-sky-400 hover:bg-slate-900"
              >
                Drop video here, or click to add file
              </button>

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
                  colorLevels={player.colorLevels}
                  ditherStrength={player.ditherStrength}
                  monoTint={player.monoTint}
                  paletteMode={player.paletteMode}
                  phosphorStrength={player.phosphorStrength}
                  previewName={player.previewName}
                  scanlineStrength={player.scanlineStrength}
                  targetHeight={player.targetHeight}
                  targetWidth={player.targetWidth}
                  vignetteStrength={player.vignetteStrength}
                  onApplyPreset={player.applyPreset}
                  onSetColorLevels={player.setColorLevels}
                  onSetDitherStrength={player.setDitherStrength}
                  onSetMonoTint={player.setMonoTint}
                  onSetPaletteMode={player.setPaletteMode}
                  onSetPhosphorStrength={player.setPhosphorStrength}
                  onSetScanlineStrength={player.setScanlineStrength}
                  onSetTargetHeight={player.setTargetHeight}
                  onSetTargetWidth={player.setTargetWidth}
                  onSetVignetteStrength={player.setVignetteStrength}
                />

                {player.hasVideo && (
                  <VideoControls
                    currentTime={player.currentTime}
                    duration={player.duration}
                    isLooping={player.isLooping}
                    isMuted={player.isMuted}
                    isPlaying={player.isPlaying}
                    playbackRate={player.playbackRate}
                    volume={player.volume}
                    onChangePlaybackRate={player.changePlaybackRate}
                    onChangeVolume={player.changeVolume}
                    onRestart={() => {
                      player.seekTo(0);
                      void player.playVideoWithAudio();
                    }}
                    onSeek={player.seekTo}
                    onStepFrame={player.stepFrame}
                    onToggleLoop={player.toggleLoop}
                    onToggleMute={player.toggleMute}
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

            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
              <div
                ref={player.canvasHostRef}
                className="h-[60vh] min-h-[360px] overflow-hidden rounded-xl bg-slate-950"
              />
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
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
