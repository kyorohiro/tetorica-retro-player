export async function waitForPreviewFrame(
  isReady: () => boolean,
  isCurrent: () => boolean,
  render: () => void,
  timeoutMs = 8000,
) {
  const deadline = Date.now() + timeoutMs;
  while (isCurrent()) {
    render();
    if (isReady()) return;
    if (Date.now() >= deadline) throw new Error("Video preview frame preparation timed out.");
    await new Promise<void>(resolve => setTimeout(resolve, 16));
  }
}
