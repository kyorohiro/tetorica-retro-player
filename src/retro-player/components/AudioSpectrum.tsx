import { useEffect, useRef } from "react";

type Props = {
  analyserRef: React.RefObject<AnalyserNode | null>;
  className?: string;
};

export function AudioSpectrum({ analyserRef, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const analyser = analyserRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (!analyser) return;

      const bufferLength = analyser.frequencyBinCount; // fftSize / 2 = 256
      const data = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(data);

      // 低周波域に集中しているので対数スケールで表示
      const barCount = 48;
      const barW = w / barCount;
      for (let i = 0; i < barCount; i++) {
        // 対数マッピング: 低域を広く、高域を狭く
        const logMin = Math.log2(1);
        const logMax = Math.log2(bufferLength);
        const startBin = Math.floor(Math.pow(2, logMin + (i / barCount) * (logMax - logMin)));
        const endBin = Math.max(startBin + 1, Math.floor(Math.pow(2, logMin + ((i + 1) / barCount) * (logMax - logMin))));
        let peak = 0;
        for (let b = startBin; b < Math.min(endBin, bufferLength); b++) {
          if (data[b] > peak) peak = data[b];
        }
        const barH = (peak / 255) * h;
        const ratio = peak / 255;
        // レトロ感のある amber グラデーション
        const r = Math.round(180 + ratio * 75);
        const g = Math.round(100 + ratio * 60);
        const b2 = Math.round(20 + ratio * 10);
        ctx.fillStyle = `rgb(${r},${g},${b2})`;
        ctx.fillRect(i * barW + 1, h - barH, barW - 2, barH);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [analyserRef]);

  return (
    <canvas
      ref={canvasRef}
      width={192}
      height={40}
      className={className}
    />
  );
}
