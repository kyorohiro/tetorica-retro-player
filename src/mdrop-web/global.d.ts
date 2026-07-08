declare global {
  interface Window {
    __MDROP_CONFIG__?: {
      apiKey?: string;
      apiServer?: string;
      ffmpegStreamingEnabled?: boolean;
      ffmpegStreamingMode?: "video" | "audio";
      initData?: string;
      coverSrc?: string;
      coverData?: string;
    };
  }
}

export {};
