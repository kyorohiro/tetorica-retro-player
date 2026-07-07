declare global {
  interface Window {
    __MDROP_CONFIG__?: {
      apiKey?: string;
      apiServer?: string;
      ffmpegStreamingEnabled?: boolean;
      initData?: string;
      coverSrc?: string;
      coverData?: string;
    };
  }
}

export {};
