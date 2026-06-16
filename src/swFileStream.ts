let seq = 0;

export function createFileStreamUrl(file: File): string | null {
  const sw = navigator.serviceWorker?.controller;
  if (!sw) return null;

  const id = `${Date.now()}-${++seq}`;
  sw.postMessage({ type: "SW_REGISTER_FILE", id, file });
  return `/sw-stream/${id}`;
}

export function revokeFileStreamUrl(url: string): void {
  if (!url.startsWith("/sw-stream/")) return;
  const id = url.slice("/sw-stream/".length);
  navigator.serviceWorker?.controller?.postMessage({ type: "SW_UNREGISTER_FILE", id });
}
