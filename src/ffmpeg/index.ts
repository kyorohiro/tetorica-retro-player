import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FfmpegOutput {
  stdout: string;
  stderr: string;
  exitCode: number;
}

export type FfmpegMode = "system" | "sidecar";

/** Progress event emitted by tauri-plugin-ffmpeg during transcode (sidecar mode only). */
export interface FfmpegProgressPayload {
  progress: number;        // 0-100, -1 on error
  currentTimeMs: number | null;
  totalDurationMs: number | null;
}

/** Options for ffmpegTranscode — mirrors tauri-plugin-ffmpeg's TranscodeRequest. */
export interface FfmpegTranscodeOptions {
  inputPath: string;
  outputPath: string;
  mediaType: "video" | "audio";
}

export interface FfmpegTranscodeResult {
  success: boolean;
  outputPath: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Core: arbitrary args
// ---------------------------------------------------------------------------

/**
 * Run ffmpeg with arbitrary arguments.
 * Works in both system mode and sidecar mode.
 */
export async function ffmpegExec(args: string[]): Promise<FfmpegOutput> {
  return invoke<FfmpegOutput>("ffmpeg_exec", { args });
}

// ---------------------------------------------------------------------------
// Mode detection
// ---------------------------------------------------------------------------

let _mode: FfmpegMode | null = null;

/** Returns "system" or "sidecar" depending on how the app was built. */
export async function getFfmpegMode(): Promise<FfmpegMode> {
  if (_mode !== null) return _mode;
  _mode = await invoke<FfmpegMode>("get_ffmpeg_mode");
  return _mode;
}

// ---------------------------------------------------------------------------
// Transcode (high-level)
// ---------------------------------------------------------------------------

/**
 * Transcode a media file.
 * - Sidecar mode: delegates to tauri-plugin-ffmpeg (supports progress events via onFfmpegProgress).
 * - System mode:  builds ffmpeg args and calls ffmpegExec.
 */
export async function ffmpegTranscode(
  options: FfmpegTranscodeOptions,
): Promise<FfmpegTranscodeResult> {
  const mode = await getFfmpegMode();

  if (mode === "sidecar") {
    return invoke<FfmpegTranscodeResult>("plugin:ffmpeg|transcode", {
      payload: {
        inputPath: options.inputPath,
        outputPath: options.outputPath,
        mediaType: options.mediaType,
      },
    });
  }

  // System mode: build args manually
  const args = buildTranscodeArgs(options);
  const out = await ffmpegExec(args);
  return {
    success: out.exitCode === 0,
    outputPath: options.outputPath,
    error: out.exitCode !== 0 ? out.stderr : undefined,
  };
}

function buildTranscodeArgs(options: FfmpegTranscodeOptions): string[] {
  const args = ["-y", "-hide_banner", "-i", options.inputPath];

  if (options.mediaType === "video") {
    args.push("-c:v", "libx264", "-c:a", "aac", "-b:a", "128k");
  } else {
    args.push("-c:a", "libmp3lame", "-q:a", "2");
  }

  args.push(options.outputPath);
  return args;
}

// ---------------------------------------------------------------------------
// Progress events (sidecar mode only)
// ---------------------------------------------------------------------------

/**
 * Listen to ffmpeg progress events emitted by tauri-plugin-ffmpeg.
 * Only fires in sidecar mode. Returns an unlisten function.
 */
export async function onFfmpegProgress(
  callback: (payload: FfmpegProgressPayload) => void,
): Promise<UnlistenFn> {
  return listen<FfmpegProgressPayload>("ffmpeg://progress", (event) => {
    callback(event.payload);
  });
}
