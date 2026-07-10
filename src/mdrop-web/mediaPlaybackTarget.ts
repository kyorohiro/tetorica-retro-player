// mDrop-web only needs to hand off "play this" to whatever is driving the
// preview — it shouldn't know that's RetroPlayerClient specifically. Callers
// pass a ref typed as this narrower shape; RetroPlayerClientHandle satisfies it
// structurally, so App.tsx can wire the two together without mdrop-web
// depending on retro-player-client.
export type MediaPlaybackTarget = {
  loadPaths: (items: { url: string; path: string }[], startIndex?: number) => void;
  loadFiles: (files: File[], startIndex?: number) => void;
};
