import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isAndroidRuntime, isTauriRuntime } from "../retro-player/platform/runtime";
import { useLongPress } from "../retro-player/hooks/useLongPress";
import { mdropGetConfig, mdropGetServerStatus, mdropStartServer, mdropStopServer } from "./tauri";

export function useMDropServer() {
  const [isMDropReady, setIsMDropReady] = useState(false);
  const [mDropPort, setMDropPort] = useState<number | null>(null);
  const [mDropIp, setMDropIp] = useState<string | null>(null);
  const [isShareMode, setIsShareMode] = useState(false);

  const isAndroidTauri = useMemo(() => isTauriRuntime() && isAndroidRuntime(), []);
  const isNativeMdropAvailable = useMemo(
    () => isTauriRuntime() && !isAndroidTauri,
    [isAndroidTauri],
  );

  // Desktop: auto-start mDrop server on mount.
  // isMDropReady drives the file picker choice (Tauri dialog vs <input>).
  useEffect(() => {
    if (!isNativeMdropAvailable) {
      setIsMDropReady(false);
      return;
    }
    mdropGetServerStatus()
      .then((status) => { setIsMDropReady(status.running); })
      .catch(() => { setIsMDropReady(false); });
  }, [isNativeMdropAvailable]);

  // Sync mDrop API key + actual port into window.__MDROP_CONFIG__.
  useEffect(() => {
    if (!isNativeMdropAvailable || !isMDropReady) return;
    Promise.all([mdropGetConfig(), mdropGetServerStatus()]).then(([config, status]) => {
      if (!window.__MDROP_CONFIG__) window.__MDROP_CONFIG__ = {};
      window.__MDROP_CONFIG__.apiKey = config.apiKey;
      window.__MDROP_CONFIG__.apiServer = `http://localhost:${status.port ?? 7878}`;
      setMDropPort(status.port);
      setMDropIp(status.ips?.[0] ?? null);
    }).catch(() => {});
  }, [isMDropReady, isNativeMdropAvailable]);

  // Ref to avoid stale closures in async Tauri event callbacks (drag-drop, deep-link).
  const isMDropReadyRef = React.useRef(isMDropReady);
  useEffect(() => {
    isMDropReadyRef.current = isMDropReady;
  }, [isMDropReady]);

  const handleMDropToggle = useCallback(async () => {
    if (!isNativeMdropAvailable) return;
    if (isMDropReady) {
      await mdropStopServer().catch(() => {});
      setIsMDropReady(false);
      setIsShareMode(false);
    } else {
      const status = await mdropStartServer({ hostname: "localhost", localOnly: true }).catch(() => null);
      setIsMDropReady(status?.running ?? false);
      if (status?.running && status.port) {
        if (!window.__MDROP_CONFIG__) window.__MDROP_CONFIG__ = {};
        window.__MDROP_CONFIG__.apiServer = `http://localhost:${status.port}`;
        setMDropPort(status.port);
        setMDropIp(null);
      }
    }
  }, [isMDropReady, isNativeMdropAvailable]);

  const handleMDropWebToggle = useCallback(async () => {
    if (!isNativeMdropAvailable) return;
    const nextWeb = !isShareMode;
    await mdropStopServer().catch(() => {});
    const status = await mdropStartServer({
      hostname: "localhost",
      localOnly: true,
      webEnabled: nextWeb,
    }).catch(() => null);
    setIsMDropReady(status?.running ?? false);
    setIsShareMode(nextWeb);
    if (status?.running && status.port) {
      if (!window.__MDROP_CONFIG__) window.__MDROP_CONFIG__ = {};
      window.__MDROP_CONFIG__.apiServer = `http://localhost:${status.port}`;
      setMDropPort(status.port);
      setMDropIp(nextWeb ? (status.ips?.[0] ?? null) : null);
    }
  }, [isNativeMdropAvailable, isShareMode]);

  const { isHolding: isMDropHolding, ...mDropLongPressHandlers } = useLongPress(
    useCallback(() => { void handleMDropWebToggle(); }, [handleMDropWebToggle]),
    useCallback(() => { void handleMDropToggle(); }, [handleMDropToggle]),
  );

  return {
    isMDropReady,
    mDropPort,
    mDropIp,
    isShareMode,
    isNativeMdropAvailable,
    isMDropReadyRef,
    isMDropHolding,
    mDropLongPressHandlers,
  };
}
