const VIEWER_URL = chrome.runtime.getURL("viewer.html");

let currentSession = null;

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    const streamId = await chrome.tabCapture.getMediaStreamId({
      targetTabId: tab.id,
    });

    currentSession = {
      streamId,
      sourceTabId: tab.id,
      createdAt: Date.now(),
    };

    await openViewerTab();
  } catch (error) {
    console.error("Failed to capture tab", error);
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "GET_CAPTURE_SESSION") {
    sendResponse({
      ok: true,
      session: currentSession,
    });
    return;
  }

  if (message?.type === "CLEAR_CAPTURE_SESSION") {
    currentSession = null;
    sendResponse({ ok: true });
  }
});

async function openViewerTab() {
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
