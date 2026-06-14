export type Locale = "en" | "ja";
export type LocalePreference = "auto" | Locale;

const LOCALE_STORAGE_KEY = "tetorica-retro-player.locale";

const messages = {
  en: {
    reloadApp: "Reload app",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openFile: "Open file",
    openFileDetail: "Image, video, audio, zip, pdf, epub, text",
    openFolder: "Open folder",
    openFolderDetail: "Browse dropped folders and archive-style collections",
    captureScreen: "Capture screen",
    captureScreenDetail: "Preview a window or screen with retro effects",
    language: "Language",
    auto: "Auto",
    english: "English",
    japanese: "Japanese",
    stopCapture: "Stop capture",
    captureUnavailableTitle: "Capture unavailable",
    captureUnavailableBody:
      "Screen capture is not available on this site. Would you like to open the PWA version instead?",
    openPwaPage: "Open PWA page",
    cancel: "Cancel",
    retroPreviewActive: "Retro preview is active in the dialog.",
    preparingSelection: "Preparing your files...",
    preparingSelectionDetail:
      "This can take a moment on phones or with large folders, but the app is still working.",
  },
  ja: {
    reloadApp: "再読み込み",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    openFile: "ファイルを開く",
    openFileDetail: "画像、動画、音声、zip、pdf、epub、テキスト",
    openFolder: "フォルダを開く",
    openFolderDetail: "フォルダやアーカイブ風の一覧を開きます",
    captureScreen: "画面をキャプチャ",
    captureScreenDetail: "ウィンドウや画面をレトロ表示でプレビューします",
    language: "言語",
    auto: "自動",
    english: "English",
    japanese: "日本語",
    stopCapture: "キャプチャを停止",
    captureUnavailableTitle: "キャプチャできません",
    captureUnavailableBody:
      "このサイトでは画面キャプチャを使えません。PWA 版を開きますか？",
    openPwaPage: "PWA 版を開く",
    cancel: "キャンセル",
    retroPreviewActive: "レトロプレビューはダイアログ側で表示中です。",
    preparingSelection: "ファイルを準備しています...",
    preparingSelectionDetail:
      "スマホや大きなフォルダでは少し時間がかかりますが、アプリは動作中です。",
  },
} as const;

export type MessageKey = keyof typeof messages.en;

export function loadLocalePreference(): LocalePreference {
  if (typeof window === "undefined") return "auto";

  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === "ja" || saved === "en" || saved === "auto" ? saved : "auto";
  } catch {
    return "auto";
  }
}

export function saveLocalePreference(preference: LocalePreference) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, preference);
  } catch {
    // Ignore storage errors and keep runtime behavior.
  }
}

export function resolveLocale(preference: LocalePreference): Locale {
  if (preference === "ja" || preference === "en") {
    return preference;
  }

  if (typeof navigator === "undefined") return "en";

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  return languages.some((language) => language.toLowerCase().startsWith("ja"))
    ? "ja"
    : "en";
}

export function t(locale: Locale, key: MessageKey) {
  return messages[locale][key];
}
