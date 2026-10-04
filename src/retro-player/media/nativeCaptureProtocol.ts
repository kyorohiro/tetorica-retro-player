export function decodeNativeAudioPacket(packet: ArrayBuffer) {
  if (packet.byteLength < 9) throw new Error("Invalid native audio header.");
  const view = new DataView(packet);
  const sampleRate = view.getUint32(1, true);
  const channels = view.getUint32(5, true);
  const byteLength = packet.byteLength - 9;
  if (sampleRate < 8000 || sampleRate > 192000 || channels < 1 || channels > 2 ||
      byteLength === 0 || byteLength % (4 * channels) !== 0) {
    throw new Error("Invalid native audio format.");
  }
  // Packet header is nine bytes, so copy into aligned storage for Float32Array.
  const samples = new Float32Array(packet.slice(9));
  return { sampleRate, channels, samples, frames: samples.length / channels };
}

export function nextNativeAudioTime(currentTime: number, queuedUntil: number) {
  // Recover after suspension or IPC stalls without accumulating latency.
  return queuedUntil < currentTime || queuedUntil > currentTime + 0.25
    ? currentTime + 0.03
    : Math.max(currentTime + 0.01, queuedUntil);
}
