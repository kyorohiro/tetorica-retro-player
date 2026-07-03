import React from "react";
import { Camera, FileUp, FolderOpen, Mic, MonitorUp, ScrollText } from "lucide-react";
import { t, type Locale, type LocalePreference } from "./i18n";
import { DEMO_SONGS, type DemoSongMeta } from "./builtin-content/demo-songs";

interface MobileMenuProps {
  locale: Locale;
  localePreference: LocalePreference;
  isIosOrAndroid: boolean;
  onOpenFile: () => void;
  onOpenFolder: () => void;
  onCapture: () => void;
  onOpenMicrophone: () => void;
  onOpenCamera: () => void;
  onSelectMicrophoneDevice: () => void;
  onPresetVideo: () => void;
  onPresetImage: () => void;
  onPresetLofi: () => void;
  onPresetDemoSong: (meta: DemoSongMeta) => void;
  onChangeLocale: (pref: LocalePreference) => void;
  onOpenLicenses: () => void;
}

export function MobileMenu({
  locale,
  localePreference,
  isIosOrAndroid,
  onOpenFile,
  onOpenFolder,
  onCapture,
  onOpenMicrophone,
  onOpenCamera,
  onSelectMicrophoneDevice,
  onPresetVideo,
  onPresetImage,
  onPresetLofi,
  onPresetDemoSong,
  onChangeLocale,
  onOpenLicenses,
}: MobileMenuProps) {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="safe-top-menu fixed left-3 z-9999 w-[min(85vw,20rem)] rounded-2xl border border-slate-300 bg-white p-2 shadow-lg">
      {/* File picker */}
      <div className="grid grid-cols-1 gap-1.5">
        <button
          type="button"
          onClick={onOpenFile}
          className="flex items-center gap-2 rounded-xl border border-dashed border-slate-400 bg-slate-50 px-3 py-2.5 transition hover:border-sky-500 hover:bg-white"
        >
          <FileUp className="h-4 w-4 shrink-0 text-sky-600" />
          <span className="text-sm font-medium text-slate-800">{t(locale, "openFile")}</span>
          <span className="font-mono text-[11px] text-slate-400">mp4 · jpg · mp3 · zip · pdf · …</span>
        </button>
        <p className="px-1 text-[11px] text-amber-700">
          ⚠ {t(locale, "localFileRecommendationTitle")}
        </p>
        {!isIosOrAndroid && (
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={onOpenFolder}
              className="flex items-center gap-2 rounded-xl border border-dashed border-slate-400 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:border-sky-500 hover:bg-white"
            >
              <FolderOpen className="h-4 w-4 shrink-0 text-amber-600" />
              {t(locale, "openFolder")}
            </button>
            <button
              type="button"
              onClick={onCapture}
              className="flex items-center gap-2 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-emerald-500/20"
            >
              <MonitorUp className="h-4 w-4 shrink-0 text-emerald-700" />
              {t(locale, "captureScreen")}
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={onOpenMicrophone}
            className="flex items-center gap-2 rounded-xl border border-dashed border-violet-500/40 bg-violet-500/10 px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-violet-500/20"
          >
            <Mic className="h-4 w-4 shrink-0 text-violet-700" />
            {t(locale, "inputMicrophone")}
          </button>
          <button
            type="button"
            onClick={onOpenCamera}
            className="flex items-center gap-2 rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/10 px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-cyan-500/20"
          >
            <Camera className="h-4 w-4 shrink-0 text-cyan-700" />
            {t(locale, "inputCamera")}
          </button>
        </div>
        <button
          type="button"
          onClick={onSelectMicrophoneDevice}
          className="flex items-center gap-2 rounded-xl border border-dashed border-slate-400 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:border-violet-400 hover:bg-white"
        >
          <Mic className="h-4 w-4 shrink-0 text-slate-700" />
          {t(locale, "inputMicrophoneDevice")}
        </button>
      </div>

      {/* Test presets */}
      <div className="mt-2">
        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Test
        </p>
        <div className="grid grid-cols-4 gap-1">
          <button
            type="button"
            onClick={onPresetVideo}
            className="flex flex-col items-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 py-2 text-slate-700 transition hover:border-sky-400 hover:bg-sky-50"
          >
            <span className="text-sm">📺</span>
            <span className="text-[10px] font-medium leading-tight">ColorBars</span>
            <span className="text-[9px] text-slate-400">m</span>
          </button>
          <button
            type="button"
            onClick={onPresetImage}
            className="flex flex-col items-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 py-2 text-slate-700 transition hover:border-amber-400 hover:bg-amber-50"
          >
            <span className="text-sm">🖼</span>
            <span className="text-[10px] font-medium leading-tight">ColorBars</span>
            <span className="text-[9px] text-slate-400">i</span>
          </button>
          <button
            type="button"
            onClick={onPresetLofi}
            className="flex flex-col items-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 py-2 text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50"
          >
            <span className="text-sm">🎵</span>
            <span className="text-[10px] font-medium leading-tight">ToneJS</span>
            <span className="text-[9px] text-slate-400">lo-fi</span>
          </button>
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className={[
              "flex flex-col items-center gap-0.5 rounded-xl border py-2 text-slate-700 transition",
              showMore
                ? "border-violet-400 bg-violet-50 text-violet-700"
                : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50",
            ].join(" ")}
          >
            <span className="text-sm">⋯</span>
            <span className="text-[10px] font-medium leading-tight">More</span>
            <span className="text-[9px] text-slate-400">{DEMO_SONGS.length}</span>
          </button>
        </div>

        {/* Expanded song list */}
        {showMore && (
          <div className="mt-1.5 max-h-52 overflow-y-auto rounded-xl border border-violet-200 bg-violet-50/60">
            {DEMO_SONGS.map((song) => (
              <button
                key={song.id}
                type="button"
                onClick={() => onPresetDemoSong(song)}
                className="flex w-full items-center justify-between px-3 py-1.5 text-left transition hover:bg-violet-100"
              >
                <span className="text-[12px] font-medium text-slate-700">{song.name}</span>
                <span className="font-mono text-[10px] text-slate-400">{song.bpm} bpm</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Language */}
      <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {t(locale, "language")}
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {([
            ["auto", t(locale, "auto")],
            ["en", t(locale, "english")],
            ["ja", t(locale, "japanese")],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onChangeLocale(value)}
              className={[
                "rounded-lg border px-2 py-1.5 text-xs transition",
                localePreference === value
                  ? "border-sky-500 bg-sky-500/10 text-sky-700"
                  : "border-slate-300 bg-white text-slate-600 hover:border-slate-400",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenLicenses}
        className="mt-2 flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white"
      >
        <ScrollText className="h-4 w-4 shrink-0 text-slate-500" />
        {t(locale, "licenses")}
      </button>
    </div>
  );
}
