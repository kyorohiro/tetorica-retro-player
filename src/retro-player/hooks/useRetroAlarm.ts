import React from "react";

export type RetroAlarmStatus = "idle" | "armed" | "triggered";

type UseRetroAlarmParams = {
  locale: "ja" | "en";
  hasAudibleMedia: boolean;
  hasPlayableMedia: boolean;
  isPlaying: boolean;
  isPoweredOn: boolean;
  ensureAudioContext: () => Promise<AudioContext | null | undefined>;
  playVideoWithAudio: () => Promise<void>;
  powerOn: () => void;
  setLoopingEnabled: (nextLooping: boolean) => void;
  togglePlayback: () => Promise<void>;
};

export function useRetroAlarm({
  locale,
  hasAudibleMedia,
  hasPlayableMedia,
  isPlaying,
  isPoweredOn,
  ensureAudioContext,
  playVideoWithAudio,
  powerOn,
  setLoopingEnabled,
  togglePlayback,
}: UseRetroAlarmParams) {
  const [alarmTime, setAlarmTime] = React.useState("07:00");
  const [alarmTargetAt, setAlarmTargetAt] = React.useState<number | null>(null);
  const [alarmStatus, setAlarmStatus] = React.useState<RetroAlarmStatus>("idle");
  const [clockTime, setClockTime] = React.useState(() => new Date());
  const [showSeconds, setShowSeconds] = React.useState(false);

  const alarmTimeoutRef = React.useRef<number | null>(null);
  const alarmAudioContextRef = React.useRef<AudioContext | null>(null);
  const alarmRingingRef = React.useRef(false);

  const formatAlarmTarget = React.useCallback((targetAt: number) => {
    const date = new Date(targetAt);
    return date.toLocaleString(locale === "ja" ? "ja-JP" : "en-US", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [locale]);

  const ensureAlarmAudioContext = React.useCallback(async () => {
    let context = alarmAudioContextRef.current;
    if (!context || context.state === "closed") {
      context = new AudioContext();
      alarmAudioContextRef.current = context;
    }

    if (context.state === "suspended") {
      try {
        await context.resume();
      } catch (error) {
        console.warn("[retro-player alarm] resume alarm context failed", {
          message: error instanceof Error ? error.message : String(error),
          state: context.state,
        });
      }
    }

    return context;
  }, []);

  const playAlarmTone = React.useCallback(async () => {
    let audioContext = await ensureAlarmAudioContext();
    if (audioContext.state !== "running") {
      audioContext = (await ensureAudioContext()) ?? audioContext;
    }
    if (!audioContext || audioContext.state !== "running") {
      console.warn("[retro-player alarm] no running audio context for fallback tone", {
        alarmContextState: alarmAudioContextRef.current?.state ?? null,
        playerContextState: audioContext?.state ?? null,
      });
      return false;
    }

    const startAt = audioContext.currentTime + 0.02;
    const outputGain = audioContext.createGain();
    outputGain.gain.setValueAtTime(0.9, startAt);
    outputGain.connect(audioContext.destination);

    const playBeep = (offset: number, frequency: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const toneStart = startAt + offset;
      const toneEnd = toneStart + duration;

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(frequency, toneStart);
      gain.gain.setValueAtTime(0.0001, toneStart);
      gain.gain.exponentialRampToValueAtTime(0.16, toneStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, toneEnd);

      oscillator.connect(gain);
      gain.connect(outputGain);
      oscillator.start(toneStart);
      oscillator.stop(toneEnd + 0.02);
    };

    playBeep(0.0, 740, 0.22);
    playBeep(0.28, 988, 0.24);
    playBeep(0.60, 1318, 0.5);

    window.setTimeout(() => {
      try {
        outputGain.disconnect();
      } catch {
        // Ignore disconnect failures during cleanup.
      }
    }, 1600);

    return true;
  }, [ensureAlarmAudioContext, ensureAudioContext]);

  const triggerAlarm = React.useCallback(async () => {
    setAlarmTargetAt(null);
    setAlarmStatus("triggered");

    console.info("[retro-player alarm] trigger", {
      hasAudibleMedia,
      hasPlayableMedia,
      isPoweredOn,
    });

    if (hasAudibleMedia) {
      try {
        if (!isPoweredOn) {
          powerOn();
        }
        await playVideoWithAudio();
        console.info("[retro-player alarm] media playback started");
        setAlarmStatus("idle");
        return;
      } catch (error) {
        console.warn("[retro-player alarm] media playback failed; using fallback tone", {
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const didPlayTone = await playAlarmTone();
    console.info("[retro-player alarm] fallback tone", { didPlayTone });
  }, [
    hasAudibleMedia,
    hasPlayableMedia,
    isPoweredOn,
    playAlarmTone,
    playVideoWithAudio,
    powerOn,
  ]);

  React.useEffect(() => {
    return () => {
      if (alarmTimeoutRef.current !== null) {
        window.clearTimeout(alarmTimeoutRef.current);
      }
      if (alarmAudioContextRef.current && alarmAudioContextRef.current.state !== "closed") {
        void alarmAudioContextRef.current.close().catch(() => {
          // Ignore close failures during unmount cleanup.
        });
      }
    };
  }, []);

  React.useEffect(() => {
    if (alarmTimeoutRef.current !== null) {
      window.clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }

    if (!alarmTargetAt) {
      if (alarmStatus === "armed") {
        setAlarmStatus("idle");
      }
      return;
    }

    const delay = alarmTargetAt - Date.now();
    if (delay <= 0) {
      void triggerAlarm();
      return;
    }

    setAlarmStatus("armed");
    alarmTimeoutRef.current = window.setTimeout(() => {
      alarmTimeoutRef.current = null;
      void triggerAlarm();
    }, delay);

    return () => {
      if (alarmTimeoutRef.current !== null) {
        window.clearTimeout(alarmTimeoutRef.current);
        alarmTimeoutRef.current = null;
      }
    };
  }, [alarmStatus, alarmTargetAt, triggerAlarm]);

  React.useEffect(() => {
    if (alarmStatus !== "armed" && alarmStatus !== "triggered") return;
    const id = window.setInterval(() => setClockTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [alarmStatus]);

  React.useEffect(() => {
    const shouldRing = alarmStatus === "triggered" && !hasAudibleMedia;
    if (!shouldRing) {
      alarmRingingRef.current = false;
      return;
    }

    alarmRingingRef.current = true;
    const ring = async () => {
      if (!alarmRingingRef.current) return;
      await playAlarmTone();
      if (alarmRingingRef.current) {
        window.setTimeout(ring, 400);
      }
    };
    void ring();
    return () => {
      alarmRingingRef.current = false;
    };
  }, [alarmStatus, hasAudibleMedia, playAlarmTone]);

  const prepareAlarm = React.useCallback(async () => {
    setClockTime(new Date());
    if (isPlaying) {
      await togglePlayback();
    }
    setLoopingEnabled(true);
    const alarmContext = await ensureAlarmAudioContext();
    void ensureAudioContext();
    return alarmContext;
  }, [
    ensureAlarmAudioContext,
    ensureAudioContext,
    isPlaying,
    setLoopingEnabled,
    togglePlayback,
  ]);

  const armAlarmAtTime = React.useCallback(async (nextAlarmTime: string) => {
    const [hoursRaw, minutesRaw] = nextAlarmTime.split(":");
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
      return;
    }

    const now = new Date();
    const nextTarget = new Date(now);
    nextTarget.setHours(hours, minutes, 0, 0);
    if (nextTarget.getTime() <= now.getTime()) {
      nextTarget.setDate(nextTarget.getDate() + 1);
    }

    setAlarmTargetAt(nextTarget.getTime());
    setAlarmStatus("armed");
    setShowSeconds(false);
    const alarmContext = await prepareAlarm();
    console.info("[retro-player alarm] armed", {
      alarmContextState: alarmContext.state,
      alarmTime: nextAlarmTime,
      targetAt: nextTarget.toISOString(),
      hasAudibleMedia,
      hasPlayableMedia,
    });
  }, [hasAudibleMedia, hasPlayableMedia, prepareAlarm]);

  const armAlarmIn = React.useCallback(async (minutes: number) => {
    const targetAt = Date.now() + minutes * 60 * 1000;
    setAlarmTargetAt(targetAt);
    setAlarmStatus("armed");
    setShowSeconds(true);
    const alarmContext = await prepareAlarm();
    console.info("[retro-player alarm] armed (relative)", {
      alarmContextState: alarmContext.state,
      minutes,
      targetAt: new Date(targetAt).toISOString(),
    });
  }, [prepareAlarm]);

  const clearAlarm = React.useCallback(() => {
    setAlarmTargetAt(null);
    setAlarmStatus("idle");
    setShowSeconds(false);
    console.info("[retro-player alarm] cleared");
  }, []);

  const testAlarm = React.useCallback(() => {
    console.info("[retro-player alarm] manual test");
    void triggerAlarm();
  }, [triggerAlarm]);

  return {
    alarmTime,
    setAlarmTime,
    alarmTargetAt,
    alarmStatus,
    clockTime,
    showSeconds,
    formatAlarmTarget,
    armAlarmAtTime,
    armAlarmIn,
    clearAlarm,
    testAlarm,
    isAlarmOverlayVisible:
      alarmStatus === "armed" || (alarmStatus === "triggered" && !hasAudibleMedia),
  };
}
