import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
} from "./shared/settings.js";

const VIEWER_URL = chrome.runtime.getURL("viewer.html");
const ALARM_STORAGE_KEY = "retro-alarm-state";
const COMPILE_STATUS_SESSION_KEY = "retro-compile-status";
const OVERLAY_COMPILE_SLOT_TTL_MS = 3000;

let currentSession = null;
let currentCompileStatus = null;
let overlayCompileSlot = {
  holderId: null,
  expiresAt: 0,
};

function isSameCompileStatus(a, b) {
  return Boolean(a?.active) === Boolean(b?.active)
    && (a?.label ?? "") === (b?.label ?? "")
    && (a?.source ?? "") === (b?.source ?? "");
}

function isOverlayCompileSlotAvailable(now = Date.now()) {
  return !overlayCompileSlot.holderId || overlayCompileSlot.expiresAt <= now;
}

chrome.storage.session.get(COMPILE_STATUS_SESSION_KEY).then((stored) => {
  currentCompileStatus = stored[COMPILE_STATUS_SESSION_KEY] ?? null;
}).catch(() => {});

async function sendMessageToViewer(message) {
  const tabs = await chrome.tabs.query({ url: VIEWER_URL });
  const viewerTab = tabs[0];
  if (viewerTab?.id) {
    try {
      await chrome.tabs.sendMessage(viewerTab.id, message);
    } catch {
      // viewer tab may not be ready to receive messages
    }
  }
}

async function pauseSourceTabVideos(tabId) {
  // Browser-level mute (works even if page JS fights back)
  try { await chrome.tabs.update(tabId, { muted: true }); } catch {}
  // Pause HTML5 video elements + YouTube player API
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        document.querySelectorAll("video").forEach((v) => {
          if (!v.paused) {
            v._retroAlarmPaused = true;
            v.pause();
          }
        });
      },
    });
  } catch (e) {
    console.warn("[retro-alarm] Could not pause source tab videos:", e);
  }
}

async function resumeSourceTabVideos(tabId) {
  // Resume HTML5 video elements + YouTube player API
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        document.querySelectorAll("video").forEach((v) => {
          if (v._retroAlarmPaused) {
            v._retroAlarmPaused = false;
            v.play().catch(() => {});
          }
        });
      },
    });
  } catch (e) {
    console.warn("[retro-alarm] Could not resume source tab videos:", e);
  }
  // Unmute after resume so the stream audio comes back
  try { await chrome.tabs.update(tabId, { muted: false }); } catch {}
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== "retroPlayerAlarm") return;
  const stored = await chrome.storage.local.get(ALARM_STORAGE_KEY);
  const sourceTabId = stored[ALARM_STORAGE_KEY]?.sourceTabId;
  await chrome.storage.local.set({ [ALARM_STORAGE_KEY]: { status: "idle", targetAt: null } });
  if (sourceTabId) {
    await resumeSourceTabVideos(sourceTabId);
  }
  await sendMessageToViewer({ type: "ALARM_TRIGGERED" });
});

const OVERLAY_ACTIVE_KEY = "retro-overlay-active-tabs";
const SESSION_CACHE_KEY = "retro-capture-session-cache";

// Restore currentSession from session storage on service worker restart.
chrome.storage.session.get(SESSION_CACHE_KEY).then((stored) => {
  if (stored[SESSION_CACHE_KEY]) {
    currentSession = stored[SESSION_CACHE_KEY];
  }
}).catch(() => {});

// Track tabs that navigated while overlay was active, waiting for page to complete.
const pendingReinjection = new Set();

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  const stored = await chrome.storage.local.get(OVERLAY_ACTIVE_KEY);
  const activeTabs = stored[OVERLAY_ACTIVE_KEY] ?? {};

  // URL changed → mark this tab as needing re-injection if overlay is active.
  if (changeInfo.url) {
    if (activeTabs[tabId]) {
      pendingReinjection.add(tabId);
    }
  }

  // Page fully loaded → re-inject whenever this tab is marked overlay-active.
  // Plain reload often keeps the same URL, so waiting for changeInfo.url misses it.
  if (changeInfo.status === "complete" && activeTabs[tabId]) {
    pendingReinjection.delete(tabId);
    const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY);
    const settings = stored[SETTINGS_STORAGE_KEY] ?? DEFAULT_SETTINGS;
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        args: [chrome.runtime.getURL("overlayRuntime.js"), settings],
        func: async (moduleUrl, s) => {
          const runtime = await import(moduleUrl);
          await runtime.startRetroOverlay(s);
        },
      });
    } catch (error) {
      console.warn("Overlay re-injection failed:", error);
    }
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "START_CAPTURE") {
    void startCaptureForActiveTab()
      .then((session) => sendResponse({ ok: true, session }))
      .catch((error) => {
        console.error("Failed to capture tab", error);
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        });
      });
    return true;
  }

  if (message?.type === "OPEN_VIEWER") {
    void openViewerTab()
      .then(() => sendResponse({ ok: true }))
      .catch((error) => {
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        });
      });
    return true;
  }

  if (message?.type === "GET_CAPTURE_SESSION") {
    sendResponse({
      ok: true,
      session: currentSession,
    });
    return;
  }

  if (message?.type === "GET_SETTINGS") {
    void chrome.storage.local
      .get(SETTINGS_STORAGE_KEY)
      .then((stored) => {
        sendResponse({
          ok: true,
          settings: stored[SETTINGS_STORAGE_KEY] ?? DEFAULT_SETTINGS,
        });
      })
      .catch((error) => {
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        });
      });
    return true;
  }

  if (message?.type === "ACQUIRE_OVERLAY_COMPILE_SLOT") {
    const requesterId = message.requesterId || null;
    const now = Date.now();
    if (!requesterId) {
      sendResponse({ ok: false, acquired: false, error: "missing requesterId" });
      return;
    }
    if (overlayCompileSlot.holderId === requesterId || isOverlayCompileSlotAvailable(now)) {
      overlayCompileSlot = {
        holderId: requesterId,
        expiresAt: now + OVERLAY_COMPILE_SLOT_TTL_MS,
      };
      sendResponse({ ok: true, acquired: true });
      return;
    }
    sendResponse({
      ok: true,
      acquired: false,
      holderId: overlayCompileSlot.holderId,
      retryAfterMs: Math.max(50, Math.min(1000, overlayCompileSlot.expiresAt - now)),
    });
    return;
  }

  if (message?.type === "RELEASE_OVERLAY_COMPILE_SLOT") {
    const requesterId = message.requesterId || null;
    if (requesterId && overlayCompileSlot.holderId === requesterId) {
      overlayCompileSlot = {
        holderId: null,
        expiresAt: 0,
      };
    }
    sendResponse({ ok: true });
    return;
  }

  if (message?.type === "REFRESH_OVERLAY_COMPILE_SLOT") {
    const requesterId = message.requesterId || null;
    if (requesterId && overlayCompileSlot.holderId === requesterId) {
      overlayCompileSlot = {
        holderId: requesterId,
        expiresAt: Date.now() + OVERLAY_COMPILE_SLOT_TTL_MS,
      };
      sendResponse({ ok: true, refreshed: true });
      return;
    }
    sendResponse({ ok: true, refreshed: false });
    return;
  }

  if (message?.type === "SET_COMPILE_STATUS") {
    const nextState = message.state ?? null;
    if (isSameCompileStatus(currentCompileStatus, nextState)) {
      sendResponse({ ok: true, deduped: true });
      return;
    }
    currentCompileStatus = nextState;
    void chrome.storage.session
      .set({ [COMPILE_STATUS_SESSION_KEY]: currentCompileStatus })
      .catch(() => {});
    void chrome.runtime.sendMessage({
      type: "COMPILE_STATUS_UPDATED",
      state: currentCompileStatus,
    }).catch(() => {
      // Ignore when no popup/viewer is currently listening.
    });
    sendResponse({ ok: true });
    return;
  }

  if (message?.type === "GET_COMPILE_STATUS") {
    sendResponse({
      ok: true,
      state: currentCompileStatus,
    });
    return;
  }

  if (message?.type === "GET_RENDERER_ACTIVITY") {
    void (async () => {
      const viewerTabs = await chrome.tabs.query({ url: VIEWER_URL });
      const overlayStored = await chrome.storage.local.get(OVERLAY_ACTIVE_KEY);
      const activeTabs = overlayStored[OVERLAY_ACTIVE_KEY] ?? {};
      sendResponse({
        ok: true,
        hasViewerTab: viewerTabs.length > 0,
        hasOverlayActive: Object.keys(activeTabs).length > 0,
      });
    })().catch((error) => {
      sendResponse({
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    });
    return true;
  }

  if (message?.type === "CLEAR_CAPTURE_SESSION") {
    currentSession = null;
    sendResponse({ ok: true });
  }

  if (message?.type === "ARM_ALARM") {
    const { targetAt } = message;
    void (async () => {
      // Prefer the captured tab; fall back to whatever tab is active right now.
      let sourceTabId = currentSession?.sourceTabId ?? null;
      if (!sourceTabId) {
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        sourceTabId = activeTab?.id ?? null;
      }
      await chrome.alarms.clear("retroPlayerAlarm");
      await chrome.alarms.create("retroPlayerAlarm", { when: targetAt });
      await chrome.storage.local.set({ [ALARM_STORAGE_KEY]: { status: "armed", targetAt, sourceTabId } });
      if (sourceTabId) {
        await pauseSourceTabVideos(sourceTabId);
      }
      await sendMessageToViewer({ type: "ARM_ALARM", targetAt });
      sendResponse({ ok: true });
    })();
    return true;
  }

  if (message?.type === "CLEAR_ALARM") {
    void (async () => {
      const stored = await chrome.storage.local.get(ALARM_STORAGE_KEY);
      const sourceTabId = stored[ALARM_STORAGE_KEY]?.sourceTabId;
      await chrome.alarms.clear("retroPlayerAlarm");
      await chrome.storage.local.set({ [ALARM_STORAGE_KEY]: { status: "idle", targetAt: null } });
      if (sourceTabId) {
        await resumeSourceTabVideos(sourceTabId);
      }
      await sendMessageToViewer({ type: "CLEAR_ALARM" });
      sendResponse({ ok: true });
    })();
    return true;
  }

  if (message?.type === "GET_ALARM_STATE") {
    void chrome.storage.local.get(ALARM_STORAGE_KEY).then((stored) => {
      sendResponse({ ok: true, state: stored[ALARM_STORAGE_KEY] ?? { status: "idle", targetAt: null } });
    });
    return true;
  }
});

async function startCaptureForActiveTab() {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!activeTab?.id) {
    throw new Error("No active tab found.");
  }

  const streamId = await chrome.tabCapture.getMediaStreamId({
    targetTabId: activeTab.id,
  });
  const sourceViewport = await getTabViewportSize(activeTab.id);

  currentSession = {
    streamId,
    sourceTabId: activeTab.id,
    sourceUrl: activeTab.url ?? null,
    sourceViewportWidth: sourceViewport?.width ?? null,
    sourceViewportHeight: sourceViewport?.height ?? null,
    sourceOuterWidth: sourceViewport?.outerWidth ?? null,
    sourceOuterHeight: sourceViewport?.outerHeight ?? null,
    sourceHasProtectedVideo: sourceViewport?.hasProtectedVideo ?? null,
    createdAt: Date.now(),
  };
  chrome.storage.session.set({ [SESSION_CACHE_KEY]: currentSession }).catch(() => {});

  await chrome.runtime.sendMessage({
    type: "CAPTURE_SESSION_UPDATED",
    session: currentSession,
  }).catch(() => {
    // Ignore when no viewer is currently listening.
  });

  await openViewerTab(currentSession);
  return currentSession;
}

async function getTabViewportSize(tabId) {
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => ({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
        outerWidth: Math.round(window.outerWidth),
        outerHeight: Math.round(window.outerHeight),
        hasProtectedVideo: [...document.querySelectorAll("video")]
          .some((element) => element instanceof HTMLVideoElement && element.mediaKeys != null),
      }),
    });

    return result?.result ?? null;
  } catch (error) {
    console.warn("Failed to read tab viewport size", error);
    return null;
  }
}

async function openViewerTab(session = currentSession) {
  const tabs = await chrome.tabs.query({ url: VIEWER_URL });
  const existing = tabs[0];

  if (existing?.id) {
    await chrome.tabs.update(existing.id, {
      url: VIEWER_URL,
      active: true,
    });
    return;
  }

  await chrome.tabs.create({
    url: VIEWER_URL,
    active: true,
  });
}
