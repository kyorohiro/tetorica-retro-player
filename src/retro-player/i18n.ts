// Self-contained locale messages for the retro-player package. This is
// intentionally independent from the host app's own i18n system (../i18n.ts)
// — retro-player/ is designed to be copied into other projects wholesale, so
// it must not depend on anything outside this directory.
import type { RetroPlayerLocale } from "./types";

export type RetroPreviewErrorCode =
  | "unsupported-file-type"
  | "video-preview-failed"
  | "capture-unsupported"
  | "capture-failed"
  | "playback-failed"
  | "video-load-failed"
  | "video-load-timeout"
  | "audio-load-failed"
  | "image-load-failed"
  | "hls-retry-preparing"
  | "microphone-unsupported"
  | "microphone-failed"
  | "camera-unsupported"
  | "camera-failed";

const RETRO_MESSAGES: Record<RetroPlayerLocale, Record<RetroPreviewErrorCode, string>> = {
  en: {
    "unsupported-file-type": "Please choose a video, audio, or image file.",
    "video-preview-failed": "Failed to load the video preview.",
    "capture-unsupported": "Screen capture is not supported in this browser.",
    "capture-failed": "Could not start screen capture.",
    "playback-failed": "Could not start playback.",
    "video-load-failed": "Failed to load the video.",
    "video-load-timeout": "Loading the video timed out.",
    "audio-load-failed": "Failed to load the audio.",
    "image-load-failed": "Failed to load the image.",
    "hls-retry-preparing": "Playback is still preparing. Press Play to retry this video.",
    "microphone-unsupported": "Microphone input is not supported in this browser.",
    "microphone-failed": "Could not start microphone input.",
    "camera-unsupported": "Camera input is not supported in this browser.",
    "camera-failed": "Could not start camera input.",
  },
  ja: {
    "unsupported-file-type": "動画、音声、または画像ファイルを選んでください。",
    "video-preview-failed": "動画プレビューに失敗しました。",
    "capture-unsupported": "このブラウザでは画面キャプチャーに対応していません。",
    "capture-failed": "画面キャプチャーを開始できませんでした。",
    "playback-failed": "再生を開始できませんでした。",
    "video-load-failed": "動画の読み込みに失敗しました。",
    "video-load-timeout": "動画の読み込みがタイムアウトしました。",
    "audio-load-failed": "音声の読み込みに失敗しました。",
    "image-load-failed": "画像の読み込みに失敗しました。",
    "hls-retry-preparing": "再生の準備中です。もう一度Playを押して再試行してください。",
    "microphone-unsupported": "このブラウザではマイク入力に対応していません。",
    "microphone-failed": "マイク入力を開始できませんでした。",
    "camera-unsupported": "このブラウザではカメラ入力に対応していません。",
    "camera-failed": "カメラ入力を開始できませんでした。",
  },
};

export function retroT(locale: RetroPlayerLocale, code: RetroPreviewErrorCode): string {
  return RETRO_MESSAGES[locale]?.[code] ?? RETRO_MESSAGES.en[code];
}

/**
 * Thrown by retro-player internals (e.g. RetroMediaSource) for failures that
 * need a localized, user-facing message. `message` should stay a short
 * English technical string (src/readyState/reason) — it's what shows up in
 * console/debug logs — while `code` is what the UI uses to look up the
 * localized display text via retroT()/resolvePreviewErrorMessage().
 */
export class RetroPreviewError extends Error {
  constructor(
    public readonly code: RetroPreviewErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "RetroPreviewError";
  }
}

/**
 * Resolves a user-facing, localized message for an error caught from a
 * preview/load operation. Known RetroPreviewError codes get their proper
 * localized text; anything else (unexpected errors, browser exceptions)
 * falls back to a generic localized message rather than leaking a raw
 * (possibly English-only or Japanese-only) technical Error.message into the
 * UI regardless of the app's locale.
 */
export function resolvePreviewErrorMessage(
  error: unknown,
  locale: RetroPlayerLocale,
  fallbackCode: RetroPreviewErrorCode = "playback-failed",
): string {
  if (error instanceof RetroPreviewError) {
    return retroT(locale, error.code);
  }
  return retroT(locale, fallbackCode);
}
