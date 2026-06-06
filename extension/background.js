import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
} from "./shared/settings.js";

const VIEWER_URL = chrome.runtime.getURL("viewer.html");

let currentSession = null;

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

  if (message?.type === "CLEAR_CAPTURE_SESSION") {
    currentSession = null;
    sendResponse({ ok: true });
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
    sourceViewportWidth: sourceViewport?.width ?? null,
    sourceViewportHeight: sourceViewport?.height ?? null,
    sourceOuterWidth: sourceViewport?.outerWidth ?? null,
    sourceOuterHeight: sourceViewport?.outerHeight ?? null,
    createdAt: Date.now(),
  };

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
    await chrome.tabs.update(existing.id, { active: true });
    return;
  }

  await chrome.tabs.create({
    url: VIEWER_URL,
    active: true,
  });
}
