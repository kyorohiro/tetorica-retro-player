// Adapter: runs a demo-tonejs-vite song through the Retro Player's audio chain
// Each song calls toDestination() which routes through Tone.Destination.
// We redirect Tone.Destination.output to a MediaStreamDestination instead of speakers.
import * as Tone from 'tone';
import type { DemoSongMeta } from './demo-songs';

export interface DemoSongSession {
  stream: MediaStream;
  dispose: () => void;
}

export async function startDemoSongSession(meta: DemoSongMeta): Promise<DemoSongSession> {
  await Tone.start();
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  Tone.getTransport().bpm.value = meta.bpm;

  const ctx = Tone.getContext().rawContext as AudioContext;
  const streamDest = ctx.createMediaStreamDestination();

  // Tone.Destination chain: Destination.input (Volume) → Destination.output (Gain) → ctx.destination
  // We disconnect Destination.output from ctx.destination and connect to streamDest.
  const toneOutput = Tone.getDestination().output as unknown as { disconnect: () => void; connect: (node: AudioNode) => void };
  toneOutput.disconnect();
  toneOutput.connect(streamDest);

  const mod = await meta.load();
  const disposeCreate = mod.create(() => {}, () => {});
  Tone.getTransport().start();

  return {
    stream: streamDest.stream,
    dispose: () => {
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
      try { disposeCreate(); } catch {}
      // Restore Tone.Destination.output → speakers
      try {
        toneOutput.disconnect();
        toneOutput.connect(ctx.destination);
      } catch {}
    },
  };
}
