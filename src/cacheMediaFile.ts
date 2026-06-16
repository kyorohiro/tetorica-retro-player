import { invoke } from "@tauri-apps/api/core";

const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB per IPC call

export type CacheProgress = {
  loaded: number;
  total: number;
};

/**
 * Copy a File to Rust's app_cache_dir/video-cache/ in chunks.
 * Uses file.slice().arrayBuffer() instead of URL.createObjectURL to avoid
 * Android WebView reading the entire content:// file into blob memory.
 * Returns the absolute local path of the cached file.
 */
export async function cacheMediaFile(
  file: File,
  session: string,
  onProgress?: (p: CacheProgress) => void,
): Promise<string> {
  let offset = 0;

  while (offset < file.size) {
    const end = Math.min(offset + CHUNK_SIZE, file.size);
    const slice = file.slice(offset, end);
    const buffer = await slice.arrayBuffer();
    const data = Array.from(new Uint8Array(buffer));

    await invoke("write_media_chunk", { session, offset, data });

    offset = end;
    onProgress?.({ loaded: offset, total: file.size });
  }

  return invoke<string>("get_media_cache_path", { session });
}

export function makeSessionId(file: File): string {
  return `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
}
