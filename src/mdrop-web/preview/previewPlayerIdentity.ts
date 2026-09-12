import { isHeic, isImage } from "../utils";
import type { TargetFile } from "../api";

export const canReuseRetroImagePlayer = (path: string, isRetro: boolean, forcedKind?: "audio" | "video" | "image") =>
  isRetro && (!forcedKind || forcedKind === "image") && (isImage(path) || isHeic(path));

export const getPreviewPageIdentity = (
  file: TargetFile, requestSequence: number, isRetro: boolean, useHls: boolean,
  forcedKind?: "audio" | "video" | "image",
) => [
  ...(canReuseRetroImagePlayer(file.path, isRetro, forcedKind)
    ? ["retro-image-pages"] : [file.id, file.path, requestSequence]),
  isRetro ? "retro" : "native", useHls ? "hls" : "direct", forcedKind ?? "auto",
].join(":");
