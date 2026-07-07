import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { X } from "lucide-react";
import { t } from "../i18n";
import { mdropShareFile } from "../mdrop-web/tauri";
import { resolvePlayableUrl } from "../mdrop-web/resolvePlayableSource";
import type { DemoSongMeta } from "./builtin-content/demo-songs";
import {
  type PresetConfig,
  loadStartupPreset,
  saveStartupPreset,
  shouldPersistStartupPresetUrl,
} from "./builtin-content/preset-config";
import { usePreviewSourceState } from "../retro-player/hooks/usePreviewSourceState";
import { dispatchRetroPlayerPausePlayback } from "../retro-player/events";
import type { RetroPlaybackEvent } from "../retro-player/hooks/usePixiVideoPlayer";
import type { RetroPlayerLocale } from "../retro-player/types";

const RetroPlayer = React.lazy(() => import("../retro-player/components/RetroPlayer"));

const preloadToneBuiltins = () => {
  void import("tone");
  void import("./builtin-content/lofi-engine");
  void import("./builtin-content/demo-song-session");
  void import("./builtin-content/demo-songs");
};

type PlaylistItem =
  | { kind: "file"; file: File }
  | { kind: "path"; url: string; path: string };

// 'pending' = loading (dark overlay covers colorbars flash)
// 'blocked' = AudioContext suspended (Safari) → shows Touch & Play button
// 'done'    = playing or user chose something else
type AutoStartState = 'pending' | 'blocked' | 'done';

const retroPlayerKey = "player:root";

export type RetroPlayerPlusHandle = {
  loadPaths: (items: { url: string; path: string }[], startIndex?: number) => void;
  loadFiles: (files: File[], startIndex?: number) => void;
  rememberUrlPreset: (url: string, label: string) => void;
  stopBuiltinPlayback: () => void;
  playPresetVideo: () => void;
  playPresetImage: () => void;
  playPresetLofi: () => Promise<void>;
  playPresetDemoSong: (meta: DemoSongMeta) => Promise<void>;
};

type RetroPlayerPlusProps = {
  locale: RetroPlayerLocale;
  previewSource: ReturnType<typeof usePreviewSourceState>;
  isDialogActive: boolean;
  isMDropReadyRef: React.RefObject<boolean>;
  isFfmpegEnabled: boolean;
  setIsFfmpegEnabled: (value: boolean) => void;
  shouldPreferDialogRetroPreview: boolean;
  showDialogPreviewForPath: (url: string, path: string) => Promise<void>;
  showDialogPreviewForBrowserFiles: (files: FileList | File[]) => Promise<void>;
  loopMode: "one" | "autoplay" | "all" | "off";
  onCycleLoopMode: () => void;
};

export const RetroPlayerPlus = React.forwardRef<RetroPlayerPlusHandle, RetroPlayerPlusProps>(
  function RetroPlayerPlus(
    {
      locale,
      previewSource,
      isDialogActive,
      isMDropReadyRef,
      isFfmpegEnabled,
      setIsFfmpegEnabled,
      shouldPreferDialogRetroPreview,
      showDialogPreviewForPath,
      showDialogPreviewForBrowserFiles,
      loopMode,
      onCycleLoopMode,
    },
    ref,
  ) {
    const [startupPreset] = useState<PresetConfig>(() => loadStartupPreset());
    const defaultPreviewSrc: string | undefined =
      startupPreset.type === 'colorbars-image' ? './test_colorbars.png' :
      startupPreset.type === 'colorbars-video' ? './test_colorbars.mp4' :
      startupPreset.type === 'url' ? startupPreset.url :
      undefined; // lofi / demo-song → audio UI, no src needed
    const defaultPreviewKind: "video" | "audio" | "image" =
      startupPreset.type === 'colorbars-image' ? 'image' :
      startupPreset.type === 'colorbars-video' ? 'video' :
      startupPreset.type === 'url' ? 'video' :
      'audio'; // lofi / demo-song

    const currentPresetConfigRef = useRef<PresetConfig>(startupPreset);
    const toneCleanupRef = useRef<(() => void) | null>(null);
    const [autoStartState, setAutoStartState] = useState<AutoStartState>('blocked');
    const isDialogActiveRef = useRef(isDialogActive);
    useEffect(() => { isDialogActiveRef.current = isDialogActive; }, [isDialogActive]);

    const previewSourceRef = useRef(previewSource);
    useEffect(() => { previewSourceRef.current = previewSource; }, [previewSource]);

    const playlistRef = useRef<PlaylistItem[]>([]);
    const [playlistLength, setPlaylistLength] = useState(0);
    const [, setPlaylistIndex] = useState(0);

    const currentPlayingPathRef = useRef<string | null>(null);
    const [showFfmpegRetry, setShowFfmpegRetry] = useState(false);
    const [showPlaybackRetryHint, setShowPlaybackRetryHint] = useState(false);
    const shouldShowFfmpegRetry = false;

    const isUsingDefaultPreview = !previewSource.previewSrc && !previewSource.previewStream;

    useEffect(() => {
      const idleCallback = window.setTimeout(() => {
        preloadToneBuiltins();
      }, 800);
      return () => {
        window.clearTimeout(idleCallback);
      };
    }, []);

    // Restore startup preset on mount.
    // ToneJS presets: do nothing — stay 'blocked' so Touch & Play shows.
    //   handleRetry builds the session when the user taps.
    // URL/ColorBar presets: load immediately and mark 'done'.
    useEffect(() => {
      let cancelled = false;

      (async () => {
        if (cancelled) return;
        try {
          const preset = currentPresetConfigRef.current;
          if (preset.type === 'lofi' || preset.type === 'demo-song') {
            // Stay 'blocked' — Touch & Play required before audio starts.
          } else if (preset.type === 'colorbars-video') {
            previewSourceRef.current.previewPath('./test_colorbars.mp4', 'test_colorbars.mp4');
            setAutoStartState('done');
          } else if (preset.type === 'colorbars-image') {
            previewSourceRef.current.previewPath('./test_colorbars.png', 'test_colorbars.png');
            setAutoStartState('done');
          } else if (preset.type === 'url') {
            previewSourceRef.current.previewPath(preset.url, preset.label);
            setAutoStartState('done');
          }
        } catch { setAutoStartState('done'); }
      })();

      return () => { cancelled = true; };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const stopTone = useCallback(() => {
      toneCleanupRef.current?.();
      toneCleanupRef.current = null;
    }, []);

    const stopBuiltinPlayback = useCallback(() => {
      stopTone();
      setAutoStartState('done');
    }, [stopTone]);

    const syncToneTransportPlayback = useCallback((playing: boolean) => {
      void import('tone').then(({ getTransport }) => {
        const transport = getTransport();
        if (playing) {
          transport.start();
        } else {
          transport.pause();
        }
      });
    }, []);

    const currentPlaybackSource = React.useMemo<RetroPlaybackEvent["source"]>(
      () => (previewSource.previewStreamSource === "audio-preview" ? "builtin-tone" : "media"),
      [previewSource.previewStreamSource],
    );

    useEffect(() => {
      if (!isDialogActive) return;
      dispatchRetroPlayerPausePlayback();
      if (currentPlaybackSource !== "builtin-tone") return;
      syncToneTransportPlayback(false);
    }, [currentPlaybackSource, isDialogActive, syncToneTransportPlayback]);

    // When a file/URL/stream is loaded while Touch & Play is showing, dismiss the overlay and stop ToneJS.
    useEffect(() => {
      if (!previewSource.previewSrc && !previewSource.previewStream) return;
      if (autoStartState !== 'blocked') return;
      toneCleanupRef.current?.();
      toneCleanupRef.current = null;
      setAutoStartState('done');
    }, [previewSource.previewSrc, previewSource.previewStream, autoStartState]);

    const savePreset = useCallback((config: PresetConfig) => {
      currentPresetConfigRef.current = config;
      saveStartupPreset(config);
      setAutoStartState('done');
    }, []);

    const playPresetVideo = useCallback(() => {
      savePreset({ type: 'colorbars-video' });
      stopTone();
      previewSource.previewPath('./test_colorbars.mp4', 'test_colorbars.mp4');
    }, [previewSource, savePreset, stopTone]);

    const playPresetImage = useCallback(() => {
      savePreset({ type: 'colorbars-image' });
      stopTone();
      previewSource.previewPath('./test_colorbars.png', 'test_colorbars.png');
    }, [previewSource, savePreset, stopTone]);

    const playPresetLofi = useCallback(async () => {
      savePreset({ type: 'lofi' });
      stopTone();
      const [{ startLofiSession }, Tone] = await Promise.all([
        import('./builtin-content/lofi-engine'),
        import('tone'),
      ]);
      await Tone.start().catch(() => {});
      const session = await startLofiSession();
      toneCleanupRef.current = session.dispose;
      previewSource.previewAudioStream(session.stream, 'Lo-fi Chill');
    }, [previewSource, savePreset, stopTone]);

    const playPresetDemoSong = useCallback(async (meta: DemoSongMeta) => {
      savePreset({ type: 'demo-song', songId: meta.id });
      stopTone();
      const { startDemoSongSession } = await import('./builtin-content/demo-song-session');
      const session = await startDemoSongSession(meta);
      toneCleanupRef.current = session.dispose;
      previewSource.previewAudioStream(session.stream, meta.name);
    }, [previewSource, savePreset, stopTone]);

    // Restart the currently saved preset. Called from RetroPlayer's onRetry
    // (play button pressed while media is in error/ended state).
    const handleRetry = useCallback(async () => {
      setAutoStartState('done');
      const preset = currentPresetConfigRef.current;
      stopTone();
      if (preset.type === 'lofi') {
        const [{ startLofiSession }, Tone] = await Promise.all([
          import('./builtin-content/lofi-engine'),
          import('tone'),
        ]);
        await Tone.start().catch(() => {});
        const session = await startLofiSession();
        toneCleanupRef.current = session.dispose;
        previewSource.previewAudioStream(session.stream, 'Lo-fi Chill');
      } else if (preset.type === 'demo-song') {
        const [{ DEMO_SONGS }, { startDemoSongSession }] = await Promise.all([
          import('./builtin-content/demo-songs'),
          import('./builtin-content/demo-song-session'),
        ]);
        const meta = DEMO_SONGS.find(s => s.id === preset.songId);
        if (meta) {
          const session = await startDemoSongSession(meta);
          toneCleanupRef.current = session.dispose;
          previewSource.previewAudioStream(session.stream, meta.name);
        }
      } else if (preset.type === 'colorbars-video') {
        previewSource.previewPath('./test_colorbars.mp4', 'test_colorbars.mp4');
      } else if (preset.type === 'colorbars-image') {
        previewSource.previewPath('./test_colorbars.png', 'test_colorbars.png');
      } else if (preset.type === 'url') {
        previewSource.previewPath(preset.url, preset.label);
      }
    }, [previewSource, stopTone]);

    const previewItem = useCallback((item: PlaylistItem) => {
      setShowFfmpegRetry(false);
      setShowPlaybackRetryHint(false);
      if (item.kind === "file") {
        currentPlayingPathRef.current = null;
        if (shouldPreferDialogRetroPreview) {
          void showDialogPreviewForBrowserFiles([item.file]);
          return;
        }
        previewSource.previewFile(item.file);
      } else {
        currentPlayingPathRef.current = item.path;
        currentPresetConfigRef.current = { type: "url", url: item.url, label: item.path };
        if (shouldPreferDialogRetroPreview) {
          void showDialogPreviewForPath(item.url, item.path);
          return;
        }
        previewSource.previewPath(item.url, item.path);
      }
    }, [shouldPreferDialogRetroPreview, showDialogPreviewForBrowserFiles, showDialogPreviewForPath]);

    const nextTrack = useCallback(() => {
      const list = playlistRef.current;
      setPlaylistIndex((idx) => {
        const next = idx + 1;
        if (next >= list.length) return idx;
        previewItem(list[next]);
        return next;
      });
    }, [previewItem]);

    const nextTrackAll = useCallback(() => {
      const list = playlistRef.current;
      if (list.length === 0) return;
      setPlaylistIndex((idx) => {
        const next = (idx + 1) % list.length;
        previewItem(list[next]);
        return next;
      });
    }, [previewItem]);

    const prevTrack = useCallback(() => {
      const list = playlistRef.current;
      setPlaylistIndex((idx) => {
        const prev = idx - 1;
        if (prev < 0) return idx;
        previewItem(list[prev]);
        return prev;
      });
    }, [previewItem]);

    const handleEnded = useCallback(() => {
      if (loopMode === "autoplay") nextTrack();
      else if (loopMode === "all") nextTrackAll();
    }, [loopMode, nextTrack, nextTrackAll]);

    const handleFfmpegRetry = useCallback(async () => {
      const path = currentPlayingPathRef.current;
      if (!path || !isMDropReadyRef.current) return;
      setShowFfmpegRetry(false);
      setShowPlaybackRetryHint(false);
      try {
        const shared = await mdropShareFile(path);
        const hlsUrl = resolvePlayableUrl(shared, true);
        setIsFfmpegEnabled(true);
        if (shouldPreferDialogRetroPreview) {
          await showDialogPreviewForPath(hlsUrl, path);
          return;
        }
        previewSourceRef.current.previewPath(hlsUrl, path);
        currentPresetConfigRef.current = { type: 'url', url: hlsUrl, label: path };
        if (shouldPersistStartupPresetUrl(hlsUrl)) {
          saveStartupPreset(currentPresetConfigRef.current);
        }
      } catch (e) {
        console.error("[ffmpeg retry] failed:", e);
      }
    }, [isMDropReadyRef, setIsFfmpegEnabled, shouldPreferDialogRetroPreview, showDialogPreviewForPath]);

    // Long-press play/pause: redo the mDrop share + (optional) ffmpeg HLS
    // resolve for whatever's currently loaded. Recovers playback when an
    // ffmpeg transcode session dies mid-stream — reloading the same URL
    // (what a plain retry does) doesn't restart a dead transcode, only
    // re-sharing does. Returns false when there's nothing mDrop-specific to
    // redo (e.g. a local file, or mDrop not ready), so RetroPlayer falls
    // back to its own generic "restart from 0".
    const retryCurrentSource = useCallback(async (): Promise<boolean> => {
      const path = currentPlayingPathRef.current;
      if (!path || !isMDropReadyRef.current) return false;
      setShowFfmpegRetry(false);
      setShowPlaybackRetryHint(false);
      try {
        const shared = await mdropShareFile(path);
        const url = resolvePlayableUrl(shared, isFfmpegEnabled);
        previewSource.previewPath(url, path);
        return true;
      } catch (e) {
        console.error("[retry current source] failed:", e);
        return false;
      }
    }, [isFfmpegEnabled, isMDropReadyRef, previewSource]);

    const handlePlayerError = useCallback((_error: Error) => {
      setShowPlaybackRetryHint(true);
      if (isMDropReadyRef.current && currentPlayingPathRef.current) {
        setShowFfmpegRetry(true);
      }
    }, [isMDropReadyRef]);

    const loadPaths = useCallback((items: { url: string; path: string }[], startIndex = 0) => {
      if (items.length === 0) return;
      if (items.length === 1 && shouldPreferDialogRetroPreview) {
        void showDialogPreviewForPath(items[0].url, items[0].path);
        return;
      }
      const target = items[startIndex] ?? items[0];
      playlistRef.current = items.map((item) => ({ kind: "path" as const, url: item.url, path: item.path }));
      setPlaylistLength(items.length);
      setPlaylistIndex(startIndex);
      currentPlayingPathRef.current = target.path;
      currentPresetConfigRef.current = { type: "url", url: target.url, label: target.path };
      setShowFfmpegRetry(false);
      previewSource.previewPath(target.url, target.path);
    }, [previewSource, shouldPreferDialogRetroPreview, showDialogPreviewForPath]);

    const loadFiles = useCallback((files: File[], startIndex = 0) => {
      if (files.length === 0) return;
      if (files.length === 1 && shouldPreferDialogRetroPreview) {
        void showDialogPreviewForBrowserFiles(files);
        return;
      }
      const target = files[startIndex] ?? files[0];
      playlistRef.current = files.map((file) => ({ kind: "file" as const, file }));
      setPlaylistLength(files.length);
      setPlaylistIndex(startIndex);
      currentPlayingPathRef.current = null;
      setShowFfmpegRetry(false);
      previewSource.previewFile(target);
    }, [previewSource, shouldPreferDialogRetroPreview, showDialogPreviewForBrowserFiles]);

    const rememberUrlPreset = useCallback((url: string, label: string) => {
      currentPresetConfigRef.current = { type: 'url', url, label };
      if (shouldPersistStartupPresetUrl(url)) {
        saveStartupPreset(currentPresetConfigRef.current);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      loadPaths,
      loadFiles,
      rememberUrlPreset,
      stopBuiltinPlayback,
      playPresetVideo,
      playPresetImage,
      playPresetLofi,
      playPresetDemoSong,
    }), [
      loadPaths,
      loadFiles,
      rememberUrlPreset,
      stopBuiltinPlayback,
      playPresetVideo,
      playPresetImage,
      playPresetLofi,
      playPresetDemoSong,
    ]);

    return (
      <div className="relative flex-1 min-h-0">
        <React.Suspense fallback={null}>
          <RetroPlayer
            locale={locale}
            key={retroPlayerKey}
            src={previewSource.previewSrc ?? defaultPreviewSrc}
            stream={previewSource.previewStream}
            streamName={previewSource.previewLabel}
            kind={previewSource.previewKind ?? defaultPreviewKind}
            playbackSource={currentPlaybackSource}
            looping={!isUsingDefaultPreview && loopMode === "one"}
            autoPlay={autoStartState === 'done'}
            onEnded={handleEnded}
            onError={handlePlayerError}
            onRetry={() => {
              void retryCurrentSource().then((handled) => {
                if (!handled) {
                  void handleRetry();
                }
              });
            }}
            onPlaybackChange={(event) => {
              if (event.playing) {
                setShowPlaybackRetryHint(false);
              }
              if (event.source === "builtin-tone") {
                if (isDialogActiveRef.current) {
                  syncToneTransportPlayback(false);
                  return;
                }
                syncToneTransportPlayback(event.playing);
                return;
              }
              if (event.playing) {
                stopTone();
              }
            }}
            onPrevTrack={playlistLength > 1 ? prevTrack : undefined}
            onNextTrack={playlistLength > 1 ? nextTrack : undefined}
            onForceReplay={retryCurrentSource}
            loopMode={loopMode}
            onCycleLoopMode={onCycleLoopMode}
          />
        </React.Suspense>
        {shouldShowFfmpegRetry && showFfmpegRetry && (
          <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center px-4">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-amber-400/60 bg-slate-900/80 px-4 py-2 text-sm shadow-lg backdrop-blur-sm">
              <span className="text-amber-300">{locale === "ja" ? "再生できません" : "Playback failed"}</span>
              <button
                type="button"
                onClick={() => { void handleFfmpegRetry(); }}
                className="rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-amber-400"
              >
                ffmpeg で再生
              </button>
              <button
                type="button"
                onClick={() => setShowFfmpegRetry(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {showPlaybackRetryHint && (
          <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center px-4">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-amber-400/60 bg-slate-900/80 px-4 py-2 text-sm text-amber-200 shadow-lg backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setShowPlaybackRetryHint(false)}
                className="text-left"
              >
                {t(locale, "playbackRetryHint")}
              </button>
              <button
                type="button"
                onClick={() => setShowPlaybackRetryHint(false)}
                aria-label={t(locale, "hideLoadingOverlay")}
                className="shrink-0 text-slate-400 transition hover:text-slate-200"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
        {autoStartState === 'blocked' && !isDialogActive && (
          <div className="pointer-events-none fixed inset-0 z-60 flex items-center justify-center">
            <button
              type="button"
              className="pointer-events-auto rounded-full border border-amber-400/40 bg-amber-500/15 px-8 py-3 text-sm text-amber-200 shadow-lg backdrop-blur-sm transition hover:bg-amber-500/25 active:scale-95"
              onClick={() => { void handleRetry(); }}
            >
              ▶ Touch &amp; Play
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default RetroPlayerPlus;
