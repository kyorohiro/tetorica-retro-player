import { FILTER_FRAGMENT_PASS1 } from "./shared/filterPass1Shader.js";
import { FILTER_FRAGMENT_PASS2 } from "./shared/filterPass2Shader.js";
import { FILTER_FRAGMENT_PASS1_LITE } from "./shared/filterPass1LiteShader.js";
import { FILTER_FRAGMENT_PASS2_LITE } from "./shared/filterPass2LiteShader.js";
import { FILTER_FRAGMENT_PASS1_PC98_LITE } from "./shared/filterPass1Pc98LiteShader.js";
import { FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE } from "./shared/filterPass2PhosphorLiteShader.js";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
  toShaderMonoTint,
} from "./shared/settings.js";
import { createTetoricaRetroAudioNode } from "./shared/TetoricaRetroAudioNode.js";

const OVERLAY_KEY = "__tetoricaRetroOverlay";

// AudioContext と MediaElementSourceNode はオーバーレイのライフサイクルを超えて維持する。
// 理由: createMediaElementSource は同一 element に対して1度しか呼べない。
//       ctx を close すると async close が完了する前に次の hook が走り
//       "already connected to a different MediaElementSourceNode" エラーになる。
// 方針: ctx は close せず、source は常にどこかに接続しておく（lo-fi off 時は destination 直結）。
let _sharedAudioCtx = null;
let _sharedAudioSource = null;
let _sharedAudioSourceEl = null;
// lo-fi ボタンの ON/OFF 状態をオーバーレイをまたいで保持する。
// isAudioFxEnabled（settings の effects on/off）とは独立した制御:
//   _sharedAudioFxEnabled = "audio chain を使うか"（source の routing 先）
//   isAudioFxEnabled      = "chain 内の effect を適用するか"（engine のパラメータ）
let _sharedAudioFxEnabled = false;

const vertexShaderSource = `#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;
uniform float uFlipH;
uniform float uFlipV;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  if (uFlipH > 0.5) uv.x = 1.0 - uv.x;
  if (uFlipV > 0.5) uv.y = 1.0 - uv.y;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const isWindowsChromiumAngleRisk = () => {
  const userAgent = navigator.userAgent || "";
  const isWindows = /Windows/i.test(userAgent);
  const userAgentDataBrands = navigator.userAgentData?.brands;
  const isChromium =
    /\b(?:Chrome|Chromium|Edg|OPR|Brave)\//i.test(userAgent)
    || (Array.isArray(userAgentDataBrands) && userAgentDataBrands.some(({ brand }) => /Chrom/i.test(brand)));
  return isWindows && isChromium;
};

const isPc98PaletteMode = (mode) =>
  mode === "pc98"
  || mode === "pc98_tile"
  || mode === "pc98_512"
  || mode === "pc98_512_sat"
  || mode === "pc98_4096";

function getWindowsLiteShaderSources(settings) {
  const pass1 = isPc98PaletteMode(settings.paletteMode)
    ? FILTER_FRAGMENT_PASS1_PC98_LITE
    : FILTER_FRAGMENT_PASS1_LITE;
  const pass2 =
    settings.phosphorStrength > 0.001
    || settings.spotMaskStrength > 0.001
    || settings.phosphorDotMode
      ? FILTER_FRAGMENT_PASS2_PHOSPHOR_LITE
      : FILTER_FRAGMENT_PASS2_LITE;
  return { pass1, pass2 };
}

export function isRetroOverlayActive() {
  return !!globalThis[OVERLAY_KEY];
}

export async function startRetroOverlay(settingsInput) {
  if (globalThis[OVERLAY_KEY]) return { active: true };
  const overlay = createOverlay(normalizeSettings(settingsInput ?? DEFAULT_SETTINGS));
  globalThis[OVERLAY_KEY] = overlay;
  overlay.start();
  return { active: true };
}

export async function stopRetroOverlay() {
  const existing = globalThis[OVERLAY_KEY];
  if (!existing) return { active: false };
  existing.destroy();
  delete globalThis[OVERLAY_KEY];
  return { active: false };
}

export async function toggleRetroOverlay(settingsInput) {
  if (globalThis[OVERLAY_KEY]) return stopRetroOverlay();
  return startRetroOverlay(settingsInput);
}

function createOverlay(settings) {
  let currentSettings = settings;
  const recordButton = document.createElement("button");
  const opacityButton = document.createElement("button");
  opacityButton.type = "button";
  opacityButton.setAttribute("aria-label", "Overlay opacity");
  opacityButton.title = "Overlay opacity";
  opacityButton.style.position = "fixed";
  opacityButton.style.left = "-9999px";
  opacityButton.style.top = "-9999px";
  opacityButton.style.zIndex = "2147483647";
  opacityButton.style.width = "28px";
  opacityButton.style.height = "28px";
  opacityButton.style.padding = "0";
  opacityButton.style.border = "1px solid rgba(196, 230, 125, 0.35)";
  opacityButton.style.borderRadius = "50%";
  opacityButton.style.background = "rgba(9, 10, 8, 0.82)";
  opacityButton.style.cursor = "pointer";
  opacityButton.style.backdropFilter = "blur(8px)";
  opacityButton.style.boxShadow = "0 0 14px rgba(110, 147, 58, 0.22)";
  opacityButton.style.display = "flex";
  opacityButton.style.alignItems = "center";
  opacityButton.style.justifyContent = "center";

  recordButton.type = "button";
  recordButton.setAttribute("aria-label", "Start recording");
  recordButton.title = "Start recording";
  recordButton.style.position = "fixed";
  recordButton.style.left = "-9999px";
  recordButton.style.top = "-9999px";
  recordButton.style.zIndex = "2147483647";
  recordButton.style.width = "28px";
  recordButton.style.height = "28px";
  recordButton.style.padding = "0";
  recordButton.style.border = "1px solid rgba(248, 113, 113, 0.35)";
  recordButton.style.borderRadius = "50%";
  recordButton.style.background = "rgba(24, 9, 10, 0.82)";
  recordButton.style.cursor = "pointer";
  recordButton.style.backdropFilter = "blur(8px)";
  recordButton.style.boxShadow = "0 0 18px rgba(248, 113, 113, 0.22)";
  recordButton.style.display = "flex";
  recordButton.style.alignItems = "center";
  recordButton.style.justifyContent = "center";

  const speedGroup = document.createElement("div");
  speedGroup.style.position = "fixed";
  speedGroup.style.left = "-9999px";
  speedGroup.style.top = "-9999px";
  speedGroup.style.zIndex = "2147483647";
  speedGroup.style.display = "flex";
  speedGroup.style.alignItems = "center";
  speedGroup.style.height = "28px";
  speedGroup.style.border = "1px solid rgba(147, 197, 253, 0.35)";
  speedGroup.style.borderRadius = "999px";
  speedGroup.style.background = "rgba(8, 12, 24, 0.82)";
  speedGroup.style.backdropFilter = "blur(8px)";
  speedGroup.style.boxShadow = "0 0 14px rgba(147, 197, 253, 0.18)";
  speedGroup.style.overflow = "hidden";

  const speedDownButton = document.createElement("button");
  speedDownButton.type = "button";
  speedDownButton.textContent = "−";
  speedDownButton.setAttribute("aria-label", "Decrease speed");
  speedDownButton.style.cssText =
    "background:transparent;border:none;color:#bfdbfe;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  const speedLabel = document.createElement("span");
  speedLabel.textContent = "1×";
  speedLabel.style.cssText =
    'color:#bfdbfe;font:11px "IBM Plex Sans","Segoe UI",sans-serif;min-width:32px;text-align:center;user-select:none;pointer-events:none;';

  const speedUpButton = document.createElement("button");
  speedUpButton.type = "button";
  speedUpButton.textContent = "+";
  speedUpButton.setAttribute("aria-label", "Increase speed");
  speedUpButton.style.cssText =
    "background:transparent;border:none;color:#bfdbfe;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  speedGroup.append(speedDownButton, speedLabel, speedUpButton);

  const brightnessGroup = document.createElement("div");
  brightnessGroup.style.position = "fixed";
  brightnessGroup.style.left = "-9999px";
  brightnessGroup.style.top = "-9999px";
  brightnessGroup.style.zIndex = "2147483647";
  brightnessGroup.style.display = "flex";
  brightnessGroup.style.alignItems = "center";
  brightnessGroup.style.height = "28px";
  brightnessGroup.style.border = "1px solid rgba(251, 191, 36, 0.35)";
  brightnessGroup.style.borderRadius = "999px";
  brightnessGroup.style.background = "rgba(18, 12, 4, 0.82)";
  brightnessGroup.style.backdropFilter = "blur(8px)";
  brightnessGroup.style.boxShadow = "0 0 14px rgba(251, 191, 36, 0.18)";
  brightnessGroup.style.overflow = "hidden";

  const brightnessDownButton = document.createElement("button");
  brightnessDownButton.type = "button";
  brightnessDownButton.textContent = "−";
  brightnessDownButton.setAttribute("aria-label", "Decrease brightness");
  brightnessDownButton.style.cssText =
    "background:transparent;border:none;color:#fde68a;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  const brightnessLabel = document.createElement("span");
  brightnessLabel.textContent = "1.0";
  brightnessLabel.style.cssText =
    'color:#fde68a;font:11px "IBM Plex Sans","Segoe UI",sans-serif;min-width:28px;text-align:center;user-select:none;pointer-events:none;';

  const brightnessUpButton = document.createElement("button");
  brightnessUpButton.type = "button";
  brightnessUpButton.textContent = "+";
  brightnessUpButton.setAttribute("aria-label", "Increase brightness");
  brightnessUpButton.style.cssText =
    "background:transparent;border:none;color:#fde68a;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  brightnessGroup.append(brightnessDownButton, brightnessLabel, brightnessUpButton);

  const frameGroup = document.createElement("div");
  frameGroup.style.position = "fixed";
  frameGroup.style.left = "-9999px";
  frameGroup.style.top = "-9999px";
  frameGroup.style.zIndex = "2147483647";
  frameGroup.style.display = "flex";
  frameGroup.style.alignItems = "center";
  frameGroup.style.height = "28px";
  frameGroup.style.border = "1px solid rgba(148, 163, 184, 0.35)";
  frameGroup.style.borderRadius = "999px";
  frameGroup.style.background = "rgba(10, 12, 18, 0.82)";
  frameGroup.style.backdropFilter = "blur(8px)";
  frameGroup.style.boxShadow = "0 0 14px rgba(148, 163, 184, 0.12)";
  frameGroup.style.overflow = "hidden";

  const framePrevButton = document.createElement("button");
  framePrevButton.type = "button";
  framePrevButton.textContent = "‹";
  framePrevButton.setAttribute("aria-label", "Previous frame");
  framePrevButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:16px sans-serif;padding:0 9px;height:100%;line-height:1;";

  const frameNextButton = document.createElement("button");
  frameNextButton.type = "button";
  frameNextButton.textContent = "›";
  frameNextButton.setAttribute("aria-label", "Next frame");
  frameNextButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:16px sans-serif;padding:0 9px;height:100%;line-height:1;border-left:1px solid rgba(148,163,184,0.2);";

  frameGroup.append(framePrevButton, frameNextButton);

  const loopGroup = document.createElement("div");
  loopGroup.style.position = "fixed";
  loopGroup.style.left = "-9999px";
  loopGroup.style.top = "-9999px";
  loopGroup.style.zIndex = "2147483647";
  loopGroup.style.display = "flex";
  loopGroup.style.alignItems = "center";
  loopGroup.style.height = "28px";
  loopGroup.style.border = "1px solid rgba(167, 243, 208, 0.35)";
  loopGroup.style.borderRadius = "999px";
  loopGroup.style.background = "rgba(4, 14, 10, 0.82)";
  loopGroup.style.overflow = "hidden";

  const loopDownButton = document.createElement("button");
  loopDownButton.type = "button";
  loopDownButton.textContent = "−";
  loopDownButton.setAttribute("aria-label", "Decrease loop duration");
  loopDownButton.style.cssText =
    "background:transparent;border:none;color:#a7f3d0;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  const loopLabel = document.createElement("button");
  loopLabel.type = "button";
  loopLabel.setAttribute("aria-label", "Toggle loop");
  loopLabel.style.cssText =
    'background:transparent;border:none;color:#a7f3d0;cursor:pointer;font:11px "IBM Plex Sans","Segoe UI",sans-serif;min-width:32px;text-align:center;padding:0;height:100%;line-height:1;white-space:nowrap;';
  loopLabel.textContent = "↺10";

  const loopUpButton = document.createElement("button");
  loopUpButton.type = "button";
  loopUpButton.textContent = "+";
  loopUpButton.setAttribute("aria-label", "Increase loop duration");
  loopUpButton.style.cssText =
    "background:transparent;border:none;color:#a7f3d0;cursor:pointer;font:14px sans-serif;padding:0 8px;height:100%;line-height:1;";

  loopGroup.append(loopDownButton, loopLabel, loopUpButton);

  const expandedPanel = document.createElement("div");
  expandedPanel.style.position = "fixed";
  expandedPanel.style.left = "-9999px";
  expandedPanel.style.top = "-9999px";
  expandedPanel.style.zIndex = "2147483646";
  expandedPanel.style.display = "flex";
  expandedPanel.style.flexDirection = "column";
  expandedPanel.style.gap = "6px";
  expandedPanel.style.padding = "8px";
  expandedPanel.style.border = "1px solid rgba(148, 163, 184, 0.2)";
  expandedPanel.style.borderRadius = "12px";
  expandedPanel.style.background = "rgba(8, 10, 16, 0.92)";
  expandedPanel.style.backdropFilter = "blur(12px)";
  expandedPanel.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";

  const flipGroup = document.createElement("div");
  flipGroup.style.position = "fixed";
  flipGroup.style.left = "-9999px";
  flipGroup.style.top = "-9999px";
  flipGroup.style.zIndex = "2147483647";
  flipGroup.style.display = "flex";
  flipGroup.style.alignItems = "center";
  flipGroup.style.height = "28px";
  flipGroup.style.border = "1px solid rgba(148, 163, 184, 0.35)";
  flipGroup.style.borderRadius = "999px";
  flipGroup.style.background = "rgba(10, 12, 18, 0.82)";
  flipGroup.style.overflow = "hidden";

  const flipHButton = document.createElement("button");
  flipHButton.type = "button";
  flipHButton.textContent = "↔";
  flipHButton.setAttribute("aria-label", "Flip horizontal");
  flipHButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:14px sans-serif;padding:0 9px;height:100%;line-height:1;";

  const flipVButton = document.createElement("button");
  flipVButton.type = "button";
  flipVButton.textContent = "↕";
  flipVButton.setAttribute("aria-label", "Flip vertical");
  flipVButton.style.cssText =
    "background:transparent;border:none;color:#94a3b8;cursor:pointer;font:14px sans-serif;padding:0 9px;height:100%;line-height:1;border-left:1px solid rgba(148,163,184,0.2);";

  flipGroup.append(flipHButton, flipVButton);

  const audioFxButton = document.createElement("button");
  audioFxButton.type = "button";
  audioFxButton.setAttribute("aria-label", "Toggle retro audio effects");
  audioFxButton.title = "Retro lofi audio FX";
  audioFxButton.style.position = "fixed";
  audioFxButton.style.left = "-9999px";
  audioFxButton.style.top = "-9999px";
  audioFxButton.style.zIndex = "2147483647";
  audioFxButton.style.width = "28px";
  audioFxButton.style.height = "28px";
  audioFxButton.style.padding = "0";
  audioFxButton.style.border = "1px solid rgba(216, 180, 254, 0.35)";
  audioFxButton.style.borderRadius = "50%";
  audioFxButton.style.background = "rgba(14, 10, 22, 0.82)";
  audioFxButton.style.cursor = "pointer";
  audioFxButton.style.backdropFilter = "blur(8px)";
  audioFxButton.style.boxShadow = "0 0 14px rgba(216, 180, 254, 0.12)";
  audioFxButton.style.color = "#d8b4fe";
  audioFxButton.style.fontSize = "14px";
  audioFxButton.style.lineHeight = "1";
  audioFxButton.style.display = "flex";
  audioFxButton.style.alignItems = "center";
  audioFxButton.style.justifyContent = "center";
  audioFxButton.textContent = "♩";

  const moreButton = document.createElement("button");
  moreButton.type = "button";
  moreButton.setAttribute("aria-label", "More controls");
  moreButton.title = "More controls";
  moreButton.style.position = "fixed";
  moreButton.style.left = "-9999px";
  moreButton.style.top = "-9999px";
  moreButton.style.zIndex = "2147483647";
  moreButton.style.width = "28px";
  moreButton.style.height = "28px";
  moreButton.style.padding = "0";
  moreButton.style.border = "1px solid rgba(148, 163, 184, 0.35)";
  moreButton.style.borderRadius = "50%";
  moreButton.style.background = "rgba(10, 12, 18, 0.82)";
  moreButton.style.cursor = "pointer";
  moreButton.style.backdropFilter = "blur(8px)";
  moreButton.style.boxShadow = "0 0 14px rgba(148, 163, 184, 0.12)";
  moreButton.style.color = "#94a3b8";
  moreButton.style.fontSize = "16px";
  moreButton.style.lineHeight = "1";
  moreButton.textContent = "⋯";

  const fallbackFrame = document.createElement("div");
  fallbackFrame.style.position = "fixed";
  fallbackFrame.style.left = "-9999px";
  fallbackFrame.style.top = "-9999px";
  fallbackFrame.style.zIndex = "2147483499";
  fallbackFrame.style.pointerEvents = "none";
  fallbackFrame.style.display = "none";
  fallbackFrame.style.boxSizing = "border-box";
  fallbackFrame.style.border = "1px solid rgba(196, 230, 125, 0.65)";
  fallbackFrame.style.boxShadow = "0 0 0 1px rgba(18, 31, 7, 0.5) inset, 0 0 18px rgba(196, 230, 125, 0.22)";
  fallbackFrame.style.borderRadius = "2px";
  fallbackFrame.dataset.tetoricaOverlayFrame = "true";

  const surfaces = [];
  let rafId = 0;
  let frameCount = 0;
  const OPACITY_PRESETS = [1, 0.5, 0];
  let overlayOpacity = 1;
  let lastButtonRectKey = "";
  let lastOpacityIdx = -1;
  let lastIsRecording = null;
  let detachStorageListener = null;
  let pointerClientX = null;
  let pointerClientY = null;
  let detachPointerTracking = null;
  let lastHoveredElement = null;
  let lastHoveredDRMVideo = null;
  let activePrimaryTarget = null;

  const BRIGHTNESS_PRESETS = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.5, 2.0];
  const BRIGHTNESS_DEFAULT_IDX = 5; // 1.0
  let brightnessIdx = BRIGHTNESS_DEFAULT_IDX;
  let loopSecs = 10;
  let loopActive = false;
  let panelOpen = false;
  let flipH = false;
  let flipV = false;
  let loopStart = 0;
  let loopEnd = 0;
  let loopTimeupdateListener = null;
  let loopTargetEl = null;
  let audioFxEnabled = _sharedAudioFxEnabled;
  let overlayAudioEngine = null;
  let overlayAudioHookedEl = null;
  let _hookSeq = 0;
  const rejectedElements = new WeakSet();
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordingStream = null;
  let recordingAudioStream = null;

  function logOverlayAudioRecovery(label, payload = {}, level = "info") {
    const details = {
      audioContextState: _sharedAudioCtx?.state ?? null,
      audioFxEnabled,
      currentSrc:
        overlayAudioHookedEl?.currentSrc || overlayAudioHookedEl?.src || null,
      currentTime: overlayAudioHookedEl?.currentTime ?? null,
      hasEngine: Boolean(overlayAudioEngine),
      hasSource: Boolean(_sharedAudioSource),
      hasTarget: Boolean(overlayAudioHookedEl),
      visibilityState: document.visibilityState,
      ...payload,
    };
    const prefix = `[overlay audio recovery] ${label}`;
    if (level === "warn") {
      console.warn(prefix, details);
      return;
    }
    console.info(prefix, details);
  }

  async function closeSharedAudioContext() {
    const context = _sharedAudioCtx;
    if (!context || context.state === "closed") {
      return;
    }

    try {
      await context.close();
    } catch (error) {
      logOverlayAudioRecovery(
        "close-context-failed",
        { error: error instanceof Error ? error.message : String(error) },
        "warn",
      );
    }
  }

  async function recreateOverlayAudioContext(reason) {
    logOverlayAudioRecovery("recreate-context:start", { reason });
    if (overlayAudioEngine) {
      try { await overlayAudioEngine.dispose(); } catch {}
      overlayAudioEngine = null;
    }
    try { _sharedAudioSource?.disconnect(); } catch {}
    _sharedAudioSource = null;
    _sharedAudioSourceEl = null;
    await closeSharedAudioContext();
    _sharedAudioCtx = new AudioContext();
    logOverlayAudioRecovery("recreate-context:done", { reason });
    return _sharedAudioCtx;
  }

  async function ensureOverlayAudioContext(reason) {
    if (!_sharedAudioCtx || _sharedAudioCtx.state === "closed") {
      _sharedAudioCtx = new AudioContext();
      _sharedAudioSource = null;
      _sharedAudioSourceEl = null;
      logOverlayAudioRecovery("ensure-context:created", { reason });
    }

    const context = _sharedAudioCtx;
    if (context.state === "suspended") {
      try {
        await context.resume();
      } catch (error) {
        logOverlayAudioRecovery(
          "ensure-context:resume-failed",
          { error: error instanceof Error ? error.message : String(error), reason },
          "warn",
        );
      }
    }

    if (context.state === "closed") {
      logOverlayAudioRecovery("ensure-context:recreate-needed", {
        audioContextState: context.state,
        reason,
      });
      return recreateOverlayAudioContext(reason);
    }

    // "suspended" はユーザーアクション待ちで復帰可能。closed の時だけ recreate する。
    return context;
  }

  async function recoverOverlayAudioOutput(videoElement, reason) {
    if (!videoElement) {
      return null;
    }

    try {
      const context = await ensureOverlayAudioContext(reason);
      if (!context) {
        return null;
      }

      if (!overlayAudioEngine || overlayAudioHookedEl !== videoElement) {
        await hookOverlayAudio(videoElement, `${reason}:hook`);
        logOverlayAudioRecovery("recover:hooked", { reason });
        return _sharedAudioCtx;
      }

      overlayAudioEngine.setParams({ volume: 1.0, isMuted: false, ...overlayAudioSettings() }, true);
      try { _sharedAudioSource?.disconnect(); } catch {}
      if (_sharedAudioSource && overlayAudioEngine.input) {
        _sharedAudioSource.connect(overlayAudioEngine.input);
      }
      logOverlayAudioRecovery("recover:reconnected", { reason });
      return context;
    } catch (error) {
      logOverlayAudioRecovery(
        "recover:failed-rehooking",
        { error: error instanceof Error ? error.message : String(error), reason },
        "warn",
      );
      await hookOverlayAudio(videoElement, `${reason}:rebuild`);
      logOverlayAudioRecovery("recover:rehooked", { reason });
      return _sharedAudioCtx;
    }
  }

  opacityButton.addEventListener("click", () => {
    const idx = OPACITY_PRESETS.findIndex((v) => Math.abs(v - overlayOpacity) < 0.01);
    overlayOpacity = OPACITY_PRESETS[(idx + 1) % OPACITY_PRESETS.length];
    for (const surface of surfaces) {
      surface.canvas.style.opacity = String(overlayOpacity);
    }
    updateOpacityButton();
  });

  const SPEED_PRESETS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 4];

  recordButton.addEventListener("click", () => {
    if (mediaRecorder?.state === "recording") {
      stopRecording({ save: true });
      return;
    }

    startRecording();
  });

  speedDownButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    const idx = SPEED_PRESETS.findIndex((s) => Math.abs(s - targetEl.playbackRate) < 0.01);
    if (idx > 0) targetEl.playbackRate = SPEED_PRESETS[idx - 1];
  });

  speedUpButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    const idx = SPEED_PRESETS.findIndex((s) => Math.abs(s - targetEl.playbackRate) < 0.01);
    if (idx !== -1 && idx < SPEED_PRESETS.length - 1) targetEl.playbackRate = SPEED_PRESETS[idx + 1];
  });

  brightnessDownButton.addEventListener("click", () => {
    if (brightnessIdx > 0) {
      brightnessIdx -= 1;
      applyBrightness();
    }
  });

  brightnessUpButton.addEventListener("click", () => {
    if (brightnessIdx < BRIGHTNESS_PRESETS.length - 1) {
      brightnessIdx += 1;
      applyBrightness();
    }
  });

  framePrevButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    if (!targetEl.paused) targetEl.pause();
    targetEl.currentTime = Math.max(0, targetEl.currentTime - 1 / 30);
  });

  frameNextButton.addEventListener("click", () => {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    if (!targetEl.paused) targetEl.pause();
    targetEl.currentTime = Math.min(targetEl.duration || Infinity, targetEl.currentTime + 1 / 30);
  });

  moreButton.addEventListener("click", () => {
    panelOpen = !panelOpen;
    updateMoreButton();
    lastButtonRectKey = "";
  });

  audioFxButton.addEventListener("click", async () => {
    audioFxEnabled = !audioFxEnabled;
    _sharedAudioFxEnabled = audioFxEnabled;
    if (audioFxEnabled) {
      const targetEl = getActiveVideoForSpeed();
      if (!targetEl) {
        audioFxEnabled = false;
        _sharedAudioFxEnabled = false;
      } else {
        await recoverOverlayAudioOutput(targetEl, "audio-fx-toggle:on");
      }
    } else {
      // Bypass: keep AudioContext alive, route directly to destination (no gap in audio)
      if (_sharedAudioSource && _sharedAudioCtx) {
        try {
          _sharedAudioSource.disconnect();
          _sharedAudioSource.connect(_sharedAudioCtx.destination);
        } catch {}
      }
    }
    updateAudioFxButton();
  });

  flipHButton.addEventListener("click", () => {
    flipH = !flipH;
    syncFlipToTargets();
    updateFlipButtons();
  });

  flipVButton.addEventListener("click", () => {
    flipV = !flipV;
    syncFlipToTargets();
    updateFlipButtons();
  });

  loopDownButton.addEventListener("click", () => {
    if (loopSecs > 1) {
      loopSecs -= 1;
      if (loopActive) activateLoop();
      updateLoopButton();
    }
  });

  loopUpButton.addEventListener("click", () => {
    if (loopSecs < 300) {
      loopSecs += 1;
      if (loopActive) activateLoop();
      updateLoopButton();
    }
  });

  loopLabel.addEventListener("click", () => {
    if (loopActive) {
      clearLoop();
    } else {
      activateLoop();
    }
    updateLoopButton();
  });

  function start() {
    document.body.append(recordButton, opacityButton, speedGroup, brightnessGroup, loopGroup, flipGroup, audioFxButton, moreButton, expandedPanel, frameGroup, fallbackFrame);
    updateOpacityButton();
    updateAudioFxButton();
    attachSettingsSync();
    attachPointerTracking();
    updateRecordButton();
    draw();
  }

  function destroy() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    if (detachStorageListener) {
      detachStorageListener();
      detachStorageListener = null;
    }

    if (detachPointerTracking) {
      detachPointerTracking();
      detachPointerTracking = null;
    }

    stopRecording({ save: false });
    clearLoop();
    destroyOverlayAudio();
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) {
      lastHoveredDRMVideo.style.filter = "";
      lastHoveredDRMVideo.style.transform = "";
      lastHoveredDRMVideo.style.transformOrigin = "";
      lastHoveredDRMVideo = null;
    }
    destroySurfaces();
    recordButton.remove();
    opacityButton.remove();
    speedGroup.remove();
    brightnessGroup.remove();
    loopGroup.remove();
    flipGroup.remove();
    audioFxButton.remove();
    moreButton.remove();
    expandedPanel.remove();
    frameGroup.remove();
    fallbackFrame.remove();
  }

  function attachSettingsSync() {
    if (!chrome?.storage?.onChanged) {
      return;
    }

    const handleStorageChanged = (changes, areaName) => {
      if (areaName !== "local" || !changes[SETTINGS_STORAGE_KEY]?.newValue) {
        return;
      }

      currentSettings = normalizeSettings(changes[SETTINGS_STORAGE_KEY].newValue);
      applySettingsToSurfaces();
      syncSurfaceCount(currentSettings.overlayTargetCount);
      if (overlayAudioEngine) overlayAudioEngine.setParams({ volume: 1.0, isMuted: false, ...overlayAudioSettings() }, true);
    };

    chrome.storage.onChanged.addListener(handleStorageChanged);
    detachStorageListener = () => {
      chrome.storage.onChanged.removeListener(handleStorageChanged);
    };
  }

  function draw() {
    frameCount += 1;
    const targets = collectPreferredTargets();
    activePrimaryTarget = targets[0] ?? lastHoveredDRMVideo ?? null;

    // Track hovered DRM video separately
    const drmHovered = findHoveredDRMVideoElement(pointerClientX, pointerClientY);
    if (drmHovered) {
      lastHoveredDRMVideo = drmHovered;
    } else if (lastHoveredDRMVideo) {
      const r = lastHoveredDRMVideo.getBoundingClientRect();
      if (!isPointInsideRect(r, pointerClientX, pointerClientY)) {
        lastHoveredDRMVideo = null;
      }
    }

    if (!lastHoveredDRMVideo) {
      lastHoveredDRMVideo = findAutoDrmVideoElement();
    }

    // Read all rects first (batch reads before any DOM writes to avoid forced reflow)
    const targetRects = targets.map((t) => t?.getBoundingClientRect() ?? null);
    const primaryRect = targetRects[0] ?? null;

    updateButtonPositions(primaryRect);
    updateFallbackFrame(primaryRect);

    syncSurfaceCount(currentSettings.overlayTargetCount);

    for (let index = 0; index < surfaces.length; index += 1) {
      const surface = surfaces[index];
      const target = targets[index] ?? null;
      const rect = targetRects[index] ?? null;
      renderSurface(surface, target, rect, index);
      updateSurfaceSpotlight(surface, rect);
    }

    updateOpacityButton();
    updateSpeedButtonLabel();
    if (audioFxEnabled) {
      const activeVideo = getActiveVideoForSpeed();
      if (activeVideo && (activeVideo !== overlayAudioHookedEl || !overlayAudioEngine)) {
        hookOverlayAudio(activeVideo);
      }
    }
    rafId = requestAnimationFrame(draw);
  }

  function updateSurfaceSpotlight(surface, rect) {
    const inside =
      typeof pointerClientX === "number" &&
      typeof pointerClientY === "number" &&
      !!surface.targetElement &&
      !!rect &&
      surface.canvas.style.display !== "none" &&
      isPointInsideRect(rect, pointerClientX, pointerClientY);

    if (!inside) {
      if (surface._spotlightActive) {
        surface._spotlightActive = false;
        surface.canvas.style.maskImage = "";
        surface.canvas.style.webkitMaskImage = "";
      }
      return;
    }

    const localX = Math.round(pointerClientX - rect.left);
    const localY = Math.round(pointerClientY - rect.top);
    const key = `${localX},${localY}`;
    if (!surface._spotlightActive || surface._spotlightKey !== key) {
      surface._spotlightActive = true;
      surface._spotlightKey = key;
      const mask = `radial-gradient(circle at ${localX}px ${localY}px, transparent 60px, rgba(0,0,0,0.6) 90px, black 120px)`;
      surface.canvas.style.maskImage = mask;
      surface.canvas.style.webkitMaskImage = mask;
    }
  }

  function attachPointerTracking() {
    const handlePointerMove = (event) => {
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
    };

    const clearPointerFocus = () => {
      pointerClientX = null;
      pointerClientY = null;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", clearPointerFocus);
    document.addEventListener("pointerleave", clearPointerFocus);

    detachPointerTracking = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", clearPointerFocus);
      document.removeEventListener("pointerleave", clearPointerFocus);
    };
  }

  function isTargetTypeEnabled(element) {
    if (element instanceof HTMLVideoElement) return currentSettings.overlayVideo;
    if (element instanceof HTMLImageElement) return currentSettings.overlayImage;
    return false;
  }

  function collectPreferredTargets() {
    const currentHover = findPreferredHoverElement(pointerClientX, pointerClientY);
    if (currentHover && isDrawableElement(currentHover) && isTargetTypeEnabled(currentHover)) {
      lastHoveredElement = currentHover;
    }

    if (lastHoveredElement && (!isDrawableElement(lastHoveredElement) || !isInViewport(lastHoveredElement) || !isTargetTypeEnabled(lastHoveredElement))) {
      lastHoveredElement = null;
    }

    const targets = [];
    appendUniqueDrawableTarget(targets, lastHoveredElement);

    for (const candidate of findAutoDrawableTargets(frameCount)) {
      if (!isTargetTypeEnabled(candidate)) continue;
      appendUniqueDrawableTarget(targets, candidate);
      if (targets.length >= currentSettings.overlayTargetCount) {
        break;
      }
    }

    if (targets.length === 0 && currentSettings.overlayVideo) {
      appendUniqueDrawableTarget(targets, findLargestVisibleVideoElement({ relaxed: true }), { relaxed: true });
    }

    if (targets.length === 0 && currentSettings.overlayImage) {
      appendUniqueDrawableTarget(targets, findLargestVisibleImageElement({ relaxed: true }), { relaxed: true });
    }

    return targets.slice(0, currentSettings.overlayTargetCount);
  }

  function findAutoDrmVideoElement() {
    const candidates = [...document.querySelectorAll("video")]
      .filter((el) => el instanceof HTMLVideoElement && el.mediaKeys != null && isInViewport(el));

    if (candidates.length === 0) {
      return null;
    }

    candidates.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return (rectB.width * rectB.height) - (rectA.width * rectA.height);
    });

    return candidates[0] ?? null;
  }

  function syncSurfaceCount(count) {
    while (surfaces.length < count) {
      const surface = createOverlaySurface(surfaces.length, (renderer) => {
        if (!renderer.uniformLocations) return;
        applySettings(surface.gl, renderer, currentSettings);
        applyFlipUniforms(surface.gl, renderer, flipH, flipV);
      });
      surface.canvas.style.opacity = String(overlayOpacity);
      const bLevel = BRIGHTNESS_PRESETS[brightnessIdx];
      surface.canvas.style.filter = brightnessIdx !== BRIGHTNESS_DEFAULT_IDX ? `brightness(${bLevel})` : "";
      surfaces.push(surface);
      if (document.body) {
        document.body.append(surface.canvas, surface.failureOverlay);
      }
    }

    while (surfaces.length > count) {
      const surface = surfaces.pop();
      surface?.destroy();
    }
  }

  function destroySurfaces() {
    while (surfaces.length > 0) {
      surfaces.pop()?.destroy();
    }
  }

  function applySettingsToSurfaces() {
    for (const surface of surfaces) {
      if (!surface.gl || !surface.renderer) {
        continue;
      }
      applySettings(surface.gl, surface.renderer, currentSettings);
    }
  }

  function renderSurface(surface, targetElement, rect, priorityIndex) {
    if (!targetElement || !rect || !isDrawableElement(targetElement)) {
      surface.updateTarget(null);
      surface.hide();
      return;
    }

    if (rect.width < 2 || rect.height < 2) {
      surface.updateTarget(null);
      surface.hide();
      return;
    }

    surface.updateTarget(targetElement);
    surface.syncRect(rect);
    const drawableSource = surface.getDrawableSource(targetElement);
    if (!drawableSource) {
      surface.canvas.style.display = "block";
      surface.hideFailureOverlay();
      return;
    }

    if (rejectedElements.has(targetElement)) {
      surface.canvas.style.display = "none";
      surface.showFailureOverlay(rect);
      return;
    }

    const shouldRenderNow =
      surface.didTargetChange || frameCount % getFrameIntervalForPriority(priorityIndex) === 0;

    if (!shouldRenderNow) {
      surface.canvas.style.display = "block";
      surface.hideFailureOverlay();
      return;
    }

    surface.canvas.style.display = "block";
    surface.hideFailureOverlay();

    if (!surface.gl || !surface.renderer) {
      try {
        surface.renderRaw(drawableSource);
        surface.didTargetChange = false;
      } catch (error) {
        if (error instanceof DOMException && error.name === "SecurityError") {
          rejectedElements.add(targetElement);
          surface.canvas.style.display = "none";
          surface.showFailureOverlay(rect);
          return;
        }
        console.warn("Failed to draw overlay source on 2d canvas.", error);
        surface.hide();
      }
      return;
    }

    surface.gl.viewport(0, 0, surface.gl.drawingBufferWidth, surface.gl.drawingBufferHeight);
    surface.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    surface.gl.clear(surface.gl.COLOR_BUFFER_BIT);
    surface.gl.activeTexture(surface.gl.TEXTURE0);
    surface.gl.bindTexture(surface.gl.TEXTURE_2D, surface.renderer.texture);

    try {
      const isSeeking = targetElement instanceof HTMLVideoElement && targetElement.seeking;
      if (!isSeeking) {
        const uploadStart = performance.now();
        surface.gl.texImage2D(
          surface.gl.TEXTURE_2D,
          0,
          surface.gl.RGBA,
          surface.gl.RGBA,
          surface.gl.UNSIGNED_BYTE,
          drawableSource,
        );
        const uploadMs = performance.now() - uploadStart;
        surface.didTargetChange = false;
        if (uploadMs > 50) {
          rejectedElements.add(targetElement);
          surface.canvas.style.display = "none";
          surface.showFailureOverlay(rect);
          return;
        }
      }
      if (surface.renderer.pass1Program && surface.renderer.pass1UniformLocations && surface.renderer.uniformLocations) {
        ensureRendererFramebuffer(surface.gl, surface.renderer);
        surface.gl.bindFramebuffer(surface.gl.FRAMEBUFFER, surface.renderer.fbo);
        surface.gl.viewport(0, 0, surface.gl.drawingBufferWidth, surface.gl.drawingBufferHeight);
        surface.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        surface.gl.clear(surface.gl.COLOR_BUFFER_BIT);
        surface.gl.useProgram(surface.renderer.pass1Program);
        surface.gl.drawArrays(surface.gl.TRIANGLES, 0, 6);

        surface.gl.bindFramebuffer(surface.gl.FRAMEBUFFER, null);
        surface.gl.viewport(0, 0, surface.gl.drawingBufferWidth, surface.gl.drawingBufferHeight);
        surface.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        surface.gl.clear(surface.gl.COLOR_BUFFER_BIT);
        surface.gl.useProgram(surface.renderer.program);
        surface.gl.uniform1f(
          surface.renderer.uniformLocations.uTime,
          (performance.now() - surface.startedAt) / 1000,
        );
        surface.gl.activeTexture(surface.gl.TEXTURE0);
        surface.gl.bindTexture(surface.gl.TEXTURE_2D, surface.renderer.fboTexture);
        surface.gl.drawArrays(surface.gl.TRIANGLES, 0, 6);
      } else {
        surface.gl.useProgram(surface.renderer.program);
        surface.gl.drawArrays(surface.gl.TRIANGLES, 0, 6);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "SecurityError") {
        rejectedElements.add(targetElement);
        surface.canvas.style.display = "none";
        surface.showFailureOverlay(rect);
        return;
      }

      if (!rejectedElements.has(targetElement)) {
        console.warn("Failed to upload overlay source to WebGL texture.", error);
      }
      surface.fallbackTo2d(error);
      try {
        surface.renderRaw(drawableSource);
        surface.didTargetChange = false;
      } catch (fallbackError) {
        if (fallbackError instanceof DOMException && fallbackError.name === "SecurityError") {
          rejectedElements.add(targetElement);
          surface.canvas.style.display = "none";
          surface.showFailureOverlay(rect);
          return;
        }
        rejectedElements.add(targetElement);
        surface.hide();
      }
    }
  }

  return {
    start,
    destroy,
  };

  function startRecording() {
    const activeSurface = surfaces[0];
    if (!activeSurface?.targetElement || activeSurface.canvas.style.display === "none") {
      window.alert("Move the pointer over a visible video or image first.");
      return;
    }

    const canvasStream = activeSurface.canvas.captureStream(30);
    const nextRecordingStream = new MediaStream();
    canvasStream.getVideoTracks().forEach((track) => nextRecordingStream.addTrack(track));

    const audioStream = getElementAudioStream(activeSurface.targetElement);
    audioStream?.getAudioTracks().forEach((track) => nextRecordingStream.addTrack(track));

    const mimeType = getRecordingMimeType();

    try {
      mediaRecorder = mimeType
        ? new MediaRecorder(nextRecordingStream, { mimeType })
        : new MediaRecorder(nextRecordingStream);
    } catch (error) {
      window.alert(
        `Recording is not available: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      nextRecordingStream.getTracks().forEach((track) => track.stop());
      audioStream?.getTracks().forEach((track) => track.stop());
      return;
    }

    recordingStream = nextRecordingStream;
    recordingAudioStream = audioStream;
    recordedChunks = [];
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) {
        recordedChunks.push(event.data);
      }
    });
    mediaRecorder.addEventListener(
      "stop",
      () => {
        cleanupRecordingStreams();
        saveRecording(mediaRecorder?.mimeType || mimeType || "video/webm");
        mediaRecorder = null;
        updateRecordButton();
      },
      { once: true },
    );

    mediaRecorder.start();
    updateRecordButton();
  }

  function stopRecording({ save }) {
    if (!mediaRecorder) {
      cleanupRecordingStreams();
      updateRecordButton();
      return;
    }

    if (!save) {
      recordedChunks = [];
    }

    if (mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      return;
    }

    cleanupRecordingStreams();
    mediaRecorder = null;
    updateRecordButton();
  }

  function cleanupRecordingStreams() {
    recordingStream?.getTracks().forEach((track) => track.stop());
    recordingAudioStream?.getTracks().forEach((track) => track.stop());
    recordingStream = null;
    recordingAudioStream = null;
  }

  function saveRecording(mimeType) {
    if (recordedChunks.length === 0) {
      window.alert("Recording stopped, but no video data was captured.");
      return;
    }

    const blob = new Blob(recordedChunks, { type: mimeType });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `tetorica-overlay-${timestamp}.webm`;
    downloadLink.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    recordedChunks = [];
  }

  function updateRecordButton() {
    const isRecording = mediaRecorder?.state === "recording";
    if (isRecording === lastIsRecording) return;
    lastIsRecording = isRecording;
    recordButton.innerHTML = isRecording
      ? `<svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" rx="1" fill="#fca5a5"/></svg>`
      : `<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#f87171"/></svg>`;
    recordButton.style.borderColor = isRecording
      ? "rgba(251, 113, 133, 0.75)"
      : "rgba(248, 113, 113, 0.35)";
    recordButton.style.background = isRecording
      ? "rgba(127, 29, 29, 0.9)"
      : "rgba(24, 9, 10, 0.82)";
    recordButton.style.boxShadow = isRecording
      ? "0 0 22px rgba(251, 113, 133, 0.38)"
      : "0 0 18px rgba(248, 113, 113, 0.22)";
    recordButton.setAttribute("aria-label", isRecording ? "Stop recording" : "Start recording");
    recordButton.title = isRecording ? "Stop recording" : "Start recording";
  }

  function updateOpacityButton() {
    const idx = OPACITY_PRESETS.findIndex((v) => Math.abs(v - overlayOpacity) < 0.01);
    if (idx === lastOpacityIdx) return;
    lastOpacityIdx = idx;
    const icons = [
      `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="#c4e67d"/><text x="9" y="13.5" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#1a2a00">R</text></svg>`,
      `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="#c4e67d" opacity="0.35"/><circle cx="9" cy="9" r="8" fill="none" stroke="#c4e67d" stroke-width="1.5"/><text x="9" y="13.5" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#c4e67d">R</text></svg>`,
      `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8" fill="none" stroke="#c4e67d" stroke-width="1.5" stroke-dasharray="3 2"/><text x="9" y="13.5" text-anchor="middle" font-size="11" font-weight="bold" font-family="sans-serif" fill="#c4e67d" opacity="0.5">R</text></svg>`,
    ];
    opacityButton.innerHTML = icons[idx] ?? icons[0];
  }

  function getActiveVideoForSpeed() {
    const el = surfaces[0]?.targetElement ?? activePrimaryTarget;
    if (el instanceof HTMLVideoElement) return el;
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) return lastHoveredDRMVideo;
    return null;
  }

  function updateSpeedButtonLabel() {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    const rate = targetEl.playbackRate;
    speedLabel.textContent = `${rate}×`;
    const isModified = Math.abs(rate - 1) > 0.01;
    speedLabel.style.color = isModified ? "#a7f3d0" : "#bfdbfe";
    speedGroup.style.borderColor = isModified
      ? "rgba(167, 243, 208, 0.55)"
      : "rgba(147, 197, 253, 0.35)";
    const idx = SPEED_PRESETS.findIndex((s) => Math.abs(s - rate) < 0.01);
    speedDownButton.style.opacity = idx <= 0 ? "0.3" : "1";
    speedUpButton.style.opacity = idx >= SPEED_PRESETS.length - 1 ? "0.3" : "1";
  }

  function syncFlipToTargets() {
    const sx = flipH ? -1 : 1;
    const sy = flipV ? -1 : 1;
    const t = sx === 1 && sy === 1 ? "" : `scale(${sx},${sy})`;
    for (const surface of surfaces) {
      if (!surface.gl || !surface.renderer?.uniformLocations) continue;
      applyFlipUniforms(surface.gl, surface.renderer, flipH, flipV);
      if (surface.targetElement instanceof HTMLVideoElement) {
        surface.targetElement.style.transformOrigin = "center";
        surface.targetElement.style.transform = t;
      }
    }
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) {
      lastHoveredDRMVideo.style.transformOrigin = "center";
      lastHoveredDRMVideo.style.transform = t;
    }
  }

  function updateFlipButtons() {
    flipHButton.style.color = flipH ? "#e2e8f0" : "#94a3b8";
    flipHButton.style.background = flipH ? "rgba(148,163,184,0.2)" : "transparent";
    flipVButton.style.color = flipV ? "#e2e8f0" : "#94a3b8";
    flipVButton.style.background = flipV ? "rgba(148,163,184,0.2)" : "transparent";
    flipGroup.style.borderColor = (flipH || flipV)
      ? "rgba(148,163,184,0.65)"
      : "rgba(148,163,184,0.35)";
  }

  function updateMoreButton() {
    moreButton.style.borderColor = panelOpen
      ? "rgba(148,163,184,0.65)"
      : "rgba(148,163,184,0.35)";
    moreButton.style.background = panelOpen
      ? "rgba(30,34,48,0.92)"
      : "rgba(10,12,18,0.82)";
    moreButton.style.color = panelOpen ? "#e2e8f0" : "#94a3b8";
  }

  function overlayAudioSettings() {
    return { ...currentSettings, isNoiseEnabled: false, vinylDustAmount: 0 };
  }

  function updateAudioFxButton() {
    audioFxButton.textContent = audioFxEnabled ? "♪" : "♩";
    audioFxButton.style.borderColor = audioFxEnabled
      ? "rgba(216,180,254,0.75)"
      : "rgba(216,180,254,0.35)";
    audioFxButton.style.background = audioFxEnabled
      ? "rgba(60,20,100,0.9)"
      : "rgba(14,10,22,0.82)";
    audioFxButton.style.color = audioFxEnabled ? "#f0e6ff" : "#d8b4fe";
    audioFxButton.style.boxShadow = audioFxEnabled
      ? "0 0 18px rgba(216,180,254,0.38)"
      : "none";
  }

  async function hookOverlayAudio(videoElement, reason = "hook") {
    if (
      overlayAudioHookedEl === videoElement &&
      _sharedAudioCtx?.state === "running" &&
      overlayAudioEngine
    ) return;

    overlayAudioHookedEl = videoElement;
    const seq = ++_hookSeq;

    // 既存エンジンチェーンだけ解体（ctx と source はモジュールレベルで維持）
    if (overlayAudioEngine) {
      try { _sharedAudioSource?.disconnect(); } catch {}
      await overlayAudioEngine.dispose();
      overlayAudioEngine = null;
    }

    if (seq !== _hookSeq) return;

    try {
      const ctx = await ensureOverlayAudioContext(reason);
      if (!ctx) {
        return;
      }

      const engine = createTetoricaRetroAudioNode(ctx, { instanceLabel: "overlay" });
      await engine.ensureInitialized();
      await engine.connect(ctx.destination);

      if (seq !== _hookSeq) {
        await engine.dispose();
        return;
      }

      overlayAudioEngine = engine;
      engine.setParams({ volume: 1.0, isMuted: false, ...overlayAudioSettings() }, true);
      logOverlayAudioRecovery("hook:engine-ready", { reason });

      // 同じ video element なら source を再利用（createMediaElementSource は1度しか呼べないため）。
      // どちらの場合も必ず disconnect してから engine に繋ぐ。
      // 理由: destroyOverlayAudio が source を destination 直結（bypass）にするため、
      //       disconnect せずに connect すると source が destination と engine.input の
      //       両方に繋がり二重出力になる。
      if (_sharedAudioSourceEl !== videoElement || !_sharedAudioSource) {
        try { _sharedAudioSource?.disconnect(); } catch {}
        _sharedAudioSource = ctx.createMediaElementSource(videoElement);
        _sharedAudioSourceEl = videoElement;
      } else {
        try { _sharedAudioSource.disconnect(); } catch {}
      }
      _sharedAudioSource.connect(overlayAudioEngine.input);
      logOverlayAudioRecovery("hook:source-connected", { reason });
    } catch (err) {
      if (seq === _hookSeq) {
        console.warn("[overlay audio] hook failed:", err);
        logOverlayAudioRecovery(
          "hook:failed",
          { error: err instanceof Error ? err.message : String(err), reason },
          "warn",
        );
        overlayAudioHookedEl = null;
        releaseOverlayAudio();
      }
    }
  }

  function releaseOverlayAudio() {
    // エラー時のリカバリ: source を bypass に戻してエンジンを解体
    if (_sharedAudioSource && _sharedAudioCtx && _sharedAudioCtx.state !== "closed") {
      try { _sharedAudioSource.disconnect(); } catch {}
      try { _sharedAudioSource.connect(_sharedAudioCtx.destination); } catch {}
    }
    if (overlayAudioEngine) { overlayAudioEngine.dispose().catch(() => {}); overlayAudioEngine = null; }
    overlayAudioHookedEl = null;
    audioFxEnabled = false;
    _sharedAudioFxEnabled = false;
  }

  function destroyOverlayAudio() {
    // ctx と source はモジュールレベルで維持する。
    // source は必ず bypass (destination 直結) にしておく。disconnect するとビデオが無音になる。
    if (_sharedAudioSource && _sharedAudioCtx && _sharedAudioCtx.state !== "closed") {
      try { _sharedAudioSource.disconnect(); } catch {}
      try { _sharedAudioSource.connect(_sharedAudioCtx.destination); } catch {}
    }
    if (overlayAudioEngine) { overlayAudioEngine.dispose().catch(() => {}); overlayAudioEngine = null; }
    overlayAudioHookedEl = null;
    // audioFxEnabled は _sharedAudioFxEnabled で次の overlay に引き継ぐためリセットしない
  }

  function applyBrightness() {
    const level = BRIGHTNESS_PRESETS[brightnessIdx];
    const isModified = brightnessIdx !== BRIGHTNESS_DEFAULT_IDX;
    brightnessLabel.textContent = level.toFixed(1);
    brightnessLabel.style.color = isModified ? "#fcd34d" : "#fde68a";
    brightnessGroup.style.borderColor = isModified
      ? "rgba(252, 211, 77, 0.55)"
      : "rgba(251, 191, 36, 0.35)";
    brightnessDownButton.style.opacity = brightnessIdx <= 0 ? "0.3" : "1";
    brightnessUpButton.style.opacity = brightnessIdx >= BRIGHTNESS_PRESETS.length - 1 ? "0.3" : "1";
    syncBrightnessFilter();
  }

  function syncBrightnessFilter() {
    const level = BRIGHTNESS_PRESETS[brightnessIdx];
    const filterValue = brightnessIdx !== BRIGHTNESS_DEFAULT_IDX ? `brightness(${level})` : "";
    for (const surface of surfaces) {
      surface.canvas.style.filter = filterValue;
      if (surface.targetElement instanceof HTMLVideoElement) {
        surface.targetElement.style.filter = filterValue;
      }
    }
    if (lastHoveredDRMVideo instanceof HTMLVideoElement) {
      lastHoveredDRMVideo.style.filter = filterValue;
    }
  }

  function activateLoop() {
    const targetEl = getActiveVideoForSpeed();
    if (!targetEl) return;
    if (loopTargetEl && loopTimeupdateListener) {
      loopTargetEl.removeEventListener("timeupdate", loopTimeupdateListener);
    }
    loopTargetEl = targetEl;
    loopEnd = targetEl.currentTime;
    loopStart = Math.max(0, loopEnd - loopSecs);
    loopActive = true;
    loopTimeupdateListener = () => {
      if (loopTargetEl && loopTargetEl.currentTime >= loopEnd) {
        loopTargetEl.currentTime = loopStart;
      }
    };
    loopTargetEl.addEventListener("timeupdate", loopTimeupdateListener);
  }

  function clearLoop() {
    if (loopTargetEl && loopTimeupdateListener) {
      loopTargetEl.removeEventListener("timeupdate", loopTimeupdateListener);
    }
    loopTargetEl = null;
    loopTimeupdateListener = null;
    loopActive = false;
  }

  function updateLoopButton() {
    loopLabel.textContent = `↺${loopSecs}`;
    loopLabel.style.color = loopActive ? "#6ee7b7" : "#a7f3d0";
    loopDownButton.style.opacity = loopSecs <= 1 ? "0.3" : "1";
    loopUpButton.style.opacity = loopSecs >= 300 ? "0.3" : "1";
    loopGroup.style.borderColor = loopActive
      ? "rgba(167, 243, 208, 0.75)"
      : "rgba(167, 243, 208, 0.35)";
    loopGroup.style.background = loopActive
      ? "rgba(4, 60, 30, 0.9)"
      : "rgba(4, 14, 10, 0.82)";
    loopGroup.style.boxShadow = loopActive
      ? "0 0 18px rgba(167, 243, 208, 0.38)"
      : "0 0 14px rgba(167, 243, 208, 0.18)";
  }

  function updateButtonPositions(rect) {
    const activeTarget = surfaces[0]?.targetElement ?? activePrimaryTarget;
    const isDRM = !(activeTarget instanceof HTMLVideoElement) && lastHoveredDRMVideo != null;
    const drmRect = isDRM ? lastHoveredDRMVideo.getBoundingClientRect() : null;
    const activeRect = rect ?? drmRect;

    const hideAll = () => {
      recordButton.style.left = "-9999px";
      opacityButton.style.left = "-9999px";
      speedGroup.style.left = "-9999px";
      brightnessGroup.style.left = "-9999px";
      loopGroup.style.left = "-9999px";
      flipGroup.style.left = "-9999px";
      audioFxButton.style.left = "-9999px";
      moreButton.style.left = "-9999px";
      expandedPanel.style.left = "-9999px";
      frameGroup.style.left = "-9999px";
    };

    if (!currentSettings.showOverlayButtons || !activeRect) {
      if (lastButtonRectKey !== "") { hideAll(); lastButtonRectKey = ""; }
      return;
    }

    const isVideo = isDRM || activeTarget instanceof HTMLVideoElement;
    const isNarrow = activeRect.width < 320;
    const rectKey = `${Math.round(activeRect.right)}:${Math.round(activeRect.top)}:${Math.round(activeRect.width)}:${isDRM ? "d" : ""}:${panelOpen ? "o" : ""}`;
    if (rectKey === lastButtonRectKey) return;
    lastButtonRectKey = rectKey;

    const size = 28;
    const gap = 6;
    const padding = 8;
    const topY = Math.max(0, activeRect.top - Math.round(size * 2 / 3));
    const recLeft = activeRect.right - size + Math.round(size / 3);

    // Anchor for ⋯ button
    let moreLeft;
    if (isDRM) {
      recordButton.style.left = "-9999px";
      opacityButton.style.left = "-9999px";
      audioFxButton.style.left = `${recLeft}px`;
      audioFxButton.style.top = `${topY}px`;
      moreLeft = recLeft - size - gap;
    } else {
      recordButton.style.left = `${recLeft}px`;
      recordButton.style.top = `${topY}px`;
      opacityButton.style.left = `${recLeft - size - gap}px`;
      opacityButton.style.top = `${topY}px`;
      audioFxButton.style.left = `${recLeft - size - gap - size - gap}px`;
      audioFxButton.style.top = `${topY}px`;
      moreLeft = recLeft - size - gap - size - gap - size - gap;
    }

    if (!isVideo) {
      hideAll();
      if (!isDRM) {
        recordButton.style.left = `${recLeft}px`;
        recordButton.style.top = `${topY}px`;
        opacityButton.style.left = `${recLeft - size - gap}px`;
        opacityButton.style.top = `${topY}px`;
      }
      return;
    }

    moreButton.style.left = `${moreLeft}px`;
    moreButton.style.top = `${topY}px`;

    // Frame step is always in bar
    const frameW = frameGroup.offsetWidth || 54;

    if (!isNarrow) {
      // Wide: [‹›] [−s+] [−b+] [⋯] (loop/flip in panel only)
      const brightnessW = brightnessGroup.offsetWidth || 92;
      const brightnessLeft = moreLeft - gap - brightnessW;
      brightnessGroup.style.left = `${brightnessLeft}px`;
      brightnessGroup.style.top = `${topY}px`;
      const speedW = speedGroup.offsetWidth || 92;
      const speedLeft = brightnessLeft - gap - speedW;
      speedGroup.style.left = `${speedLeft}px`;
      speedGroup.style.top = `${topY}px`;
      frameGroup.style.left = `${speedLeft - gap - frameW}px`;
      frameGroup.style.top = `${topY}px`;
    } else {
      // Narrow: [‹›] [⋯] only (speed/brightness/loop/flip all in panel)
      speedGroup.style.left = "-9999px";
      brightnessGroup.style.left = "-9999px";
      frameGroup.style.left = `${moreLeft - gap - frameW}px`;
      frameGroup.style.top = `${topY}px`;
    }

    // Panel
    if (panelOpen) {
      const panelItems = isNarrow
        ? [speedGroup, brightnessGroup, loopGroup, flipGroup]
        : [loopGroup, flipGroup];
      const contentW = Math.max(
        speedGroup.offsetWidth || 92,
        brightnessGroup.offsetWidth || 92,
        loopGroup.offsetWidth || 80,
        flipGroup.offsetWidth || 54,
      );
      const panelW = contentW + padding * 2;
      const panelH = panelItems.length * 28 + (panelItems.length - 1) * gap + padding * 2;
      const panelX = moreLeft + size - panelW;
      const panelY = topY + size + gap;
      expandedPanel.style.left = `${panelX}px`;
      expandedPanel.style.top = `${panelY}px`;
      expandedPanel.style.width = `${panelW}px`;
      expandedPanel.style.height = `${panelH}px`;
      const itemX = panelX + padding;
      let itemY = panelY + padding;
      for (const item of panelItems) {
        item.style.left = `${itemX}px`;
        item.style.top = `${itemY}px`;
        itemY += 28 + gap;
      }
    } else {
      expandedPanel.style.left = "-9999px";
      loopGroup.style.left = "-9999px";
      flipGroup.style.left = "-9999px";
      if (isNarrow) {
        speedGroup.style.left = "-9999px";
        brightnessGroup.style.left = "-9999px";
      }
    }
  }

  function updateFallbackFrame(rect) {
    const activeRect = rect ?? (lastHoveredDRMVideo ? lastHoveredDRMVideo.getBoundingClientRect() : null);
    if (!activeRect) {
      fallbackFrame.style.display = "none";
      fallbackFrame.style.left = "-9999px";
      return;
    }

    fallbackFrame.style.display = "block";
    fallbackFrame.style.left = `${activeRect.left}px`;
    fallbackFrame.style.top = `${activeRect.top}px`;
    fallbackFrame.style.width = `${activeRect.width}px`;
    fallbackFrame.style.height = `${activeRect.height}px`;
  }
}

function findPrimaryDrawableElement() {
  return findAutoDrawableTargets(_autoDrawableCacheFrame)[0] ?? null;
}

function findLargestVisibleVideoElement(options = {}) {
  const { relaxed = false } = options;
  const candidates = [...document.querySelectorAll("video")]
    .filter((element) =>
      element instanceof HTMLVideoElement
      && isVisibleMediaRect(element)
      && (relaxed ? isRelaxedVideoCandidate(element) : isUsableVideo(element)));

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort(compareElementAreaDesc);
  return candidates[0] ?? null;
}

function findLargestVisibleImageElement(options = {}) {
  const { relaxed = false } = options;
  const candidates = [...document.querySelectorAll("img")]
    .filter((element) =>
      element instanceof HTMLImageElement
      && isVisibleMediaRect(element)
      && (relaxed ? isRelaxedImageCandidate(element) : isUsableImage(element)));

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort(compareElementAreaDesc);
  return candidates[0] ?? null;
}

function findPreferredHoverElement(clientX, clientY) {
  const hoveredImage = findHoveredImage(clientX, clientY);
  if (hoveredImage) {
    return hoveredImage;
  }

  return findHoveredVideo(clientX, clientY);
}

let _autoDrawableCache = [];
let _autoDrawableCacheFrame = -999;

function findAutoDrawableTargets(frameCount) {
  if (frameCount - _autoDrawableCacheFrame < 30) return _autoDrawableCache;
  _autoDrawableCacheFrame = frameCount;
  _hoveredMediaCache.clear();
  const elements = [...document.querySelectorAll("video, img")].filter(isDrawableElement);
  // Pre-compute rects once so the sort comparator never forces layout
  const withArea = elements.map((el) => {
    const r = el.getBoundingClientRect();
    return { el, area: r.width * r.height };
  });
  withArea.sort((a, b) => b.area - a.area);
  _autoDrawableCache = withArea.map((x) => x.el);
  return _autoDrawableCache;
}

function compareElementAreaDesc(a, b) {
  const rectA = a.getBoundingClientRect();
  const rectB = b.getBoundingClientRect();
  return (rectB.width * rectB.height) - (rectA.width * rectA.height);
}

function isVisibleMediaRect(element) {
  const rect = element.getBoundingClientRect();
  return rect.width > 32 && rect.height > 32 && isInViewport(element);
}

function appendUniqueDrawableTarget(targets, candidate, options = {}) {
  const { relaxed = false } = options;
  const isDrawable = relaxed ? isRelaxedDrawableElement(candidate) : isDrawableElement(candidate);
  if (!candidate || !isDrawable || targets.includes(candidate)) {
    return;
  }

  targets.push(candidate);
}

function getFrameIntervalForPriority(priorityIndex) {
  if (priorityIndex <= 0) {
    return 1;
  }

  if (priorityIndex === 1) {
    return 2;
  }

  return 4;
}

function createOverlaySurface(index, onReady) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.zIndex = String(2147483500 - index * 2);
  canvas.style.pointerEvents = "none";
  canvas.style.display = "none";
  canvas.style.transformOrigin = "top left";
  canvas.style.willChange = "mask-image";
  canvas.dataset.tetoricaOverlay = "true";

  const failureOverlay = document.createElement("div");
  failureOverlay.style.position = "fixed";
  failureOverlay.style.left = "0";
  failureOverlay.style.top = "0";
  failureOverlay.style.zIndex = String(2147483501 - index * 2);
  failureOverlay.style.pointerEvents = "none";
  failureOverlay.style.display = "none";
  failureOverlay.style.alignItems = "center";
  failureOverlay.style.justifyContent = "center";
  failureOverlay.style.border = "1px solid rgba(255, 219, 138, 0.45)";
  failureOverlay.style.background =
    "linear-gradient(180deg, rgba(18, 12, 6, 0.10), rgba(18, 12, 6, 0.30))";
  failureOverlay.style.boxShadow = "inset 0 0 0 1px rgba(255, 246, 214, 0.12)";
  failureOverlay.style.backdropFilter = "blur(1px)";

  const failureOverlayLabel = document.createElement("div");
  failureOverlayLabel.textContent = "Cross-origin image";
  failureOverlayLabel.style.padding = "8px 12px";
  failureOverlayLabel.style.border = "1px solid rgba(255, 219, 138, 0.35)";
  failureOverlayLabel.style.borderRadius = "999px";
  failureOverlayLabel.style.background = "rgba(22, 14, 8, 0.72)";
  failureOverlayLabel.style.color = "#ffe0a6";
  failureOverlayLabel.style.font = '11px "IBM Plex Sans", "Segoe UI", sans-serif';
  failureOverlayLabel.style.letterSpacing = "0.08em";
  failureOverlayLabel.style.textTransform = "uppercase";
  failureOverlayLabel.style.boxShadow = "0 0 18px rgba(255, 180, 82, 0.16)";
  failureOverlay.append(failureOverlayLabel);

  let gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });
  let ctx2d = gl ? null : canvas.getContext("2d");
  let renderer = null;
  if (gl) {
    try {
      renderer = setupRenderer(gl, onReady);
    } catch (error) {
      console.warn("Overlay WebGL setup failed; falling back to 2d canvas.", error);
      gl = null;
      ctx2d = canvas.getContext("2d");
    }
  }

  return {
    canvas,
    failureOverlay,
    gl,
    ctx2d,
    renderer,
    targetElement: null,
    proxyTargetElement: null,
    proxyVideo: null,
    proxyStream: null,
    proxyImageCapture: null,
    proxyBitmap: null,
    proxyFramePending: false,
    proxyReady: false,
    startedAt: performance.now(),
    lastRectKey: "",
    didTargetChange: true,
    _spotlightActive: false,
    _spotlightKey: "",
    destroy() {
      if (this.targetElement instanceof HTMLVideoElement) {
        this.targetElement.style.filter = "";
        this.targetElement.style.transform = "";
        this.targetElement.style.transformOrigin = "";
      }
      // cancel() defers loseContext() until after the D3D shader cache load
      // is done. Calling loseContext() while linkProgram is pending on
      // Windows/ANGLE blocks the JS main thread for ~3 s (the cache load).
      this.renderer?.cancel?.();
      this.disposeProxyVideo();
      canvas.remove();
      failureOverlay.remove();
    },
    updateTarget(nextTarget) {
      if (this.targetElement === nextTarget) {
        return;
      }

      if (this.targetElement instanceof HTMLVideoElement) {
        this.targetElement.style.filter = "";
        this.targetElement.style.transform = "";
        this.targetElement.style.transformOrigin = "";
      }
      this.disposeProxyVideo();
      this.targetElement = nextTarget;
      this.startedAt = performance.now();
      this.lastRectKey = "";
      this.didTargetChange = true;
      this.hideFailureOverlay();
      this.ensureProxyVideo(nextTarget);
    },
    syncRect(rect) {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      const rectKey = [
        Math.round(rect.left),
        Math.round(rect.top),
        Math.round(rect.width),
        Math.round(rect.height),
        width,
        height,
      ].join(":");

      if (rectKey === this.lastRectKey) {
        return;
      }

      this.lastRectKey = rectKey;
      canvas.style.left = `${rect.left}px`;
      canvas.style.top = `${rect.top}px`;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    },
    ensureProxyVideo(targetElement) {
      if (!isWindowsChromiumAngleRisk()) {
        return;
      }
      if (!(targetElement instanceof HTMLVideoElement)) {
        return;
      }
      if (targetElement.mediaKeys != null) {
        return;
      }
      if (this.proxyTargetElement === targetElement || this.proxyVideo) {
        return;
      }

      const captureStream =
        targetElement.captureStream?.bind(targetElement)
        || targetElement.mozCaptureStream?.bind(targetElement);
      if (!captureStream) {
        return;
      }

      try {
        const stream = captureStream();
        const videoTrack = stream.getVideoTracks()[0] ?? null;
        const proxyVideo = document.createElement("video");
        proxyVideo.muted = true;
        proxyVideo.autoplay = true;
        proxyVideo.playsInline = true;
        proxyVideo.srcObject = stream;
        proxyVideo.addEventListener("loadeddata", () => {
          this.proxyReady = true;
        });
        void proxyVideo.play().then(() => {
          this.proxyReady = true;
        }).catch(() => {});
        this.proxyTargetElement = targetElement;
        this.proxyStream = stream;
        this.proxyVideo = proxyVideo;
        this.proxyImageCapture =
          typeof ImageCapture !== "undefined" && videoTrack
            ? new ImageCapture(videoTrack)
            : null;
      } catch {}
    },
    requestProxyBitmapFrame() {
      if (!this.proxyImageCapture || this.proxyFramePending) {
        return;
      }
      this.proxyFramePending = true;
      void this.proxyImageCapture.grabFrame()
        .then((bitmap) => {
          if (this.proxyBitmap && this.proxyBitmap !== bitmap) {
            try {
              this.proxyBitmap.close();
            } catch {}
          }
          this.proxyBitmap = bitmap;
          this.proxyReady = true;
        })
        .catch(() => {})
        .finally(() => {
          this.proxyFramePending = false;
        });
    },
    disposeProxyVideo() {
      if (this.proxyBitmap) {
        try {
          this.proxyBitmap.close();
        } catch {}
      }
      if (this.proxyVideo) {
        try {
          this.proxyVideo.pause();
        } catch {}
        this.proxyVideo.srcObject = null;
      }
      this.proxyStream?.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      this.proxyTargetElement = null;
      this.proxyVideo = null;
      this.proxyStream = null;
      this.proxyImageCapture = null;
      this.proxyBitmap = null;
      this.proxyFramePending = false;
      this.proxyReady = false;
    },
    getDrawableSource(targetElement) {
      if (
        isWindowsChromiumAngleRisk()
        && targetElement instanceof HTMLVideoElement
        && targetElement.mediaKeys == null
        && this.proxyTargetElement === targetElement
      ) {
        this.requestProxyBitmapFrame();
        if (this.proxyBitmap) {
          return this.proxyBitmap;
        }
        if (
          this.proxyVideo
          && (this.proxyReady || this.proxyVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)
        ) {
          return this.proxyVideo;
        }
        return null;
      }
      if (
        this.proxyTargetElement === targetElement
        && this.proxyVideo
        && (this.proxyReady || this.proxyVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)
      ) {
        return this.proxyVideo;
      }
      return targetElement;
    },
    renderRaw(drawableSource) {
      if (!this.ctx2d) {
        return;
      }
      this.ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx2d.drawImage(drawableSource, 0, 0, canvas.width, canvas.height);
    },
    fallbackTo2d(error) {
      if (!this.ctx2d) {
        const nextCtx = canvas.getContext("2d");
        if (!nextCtx) {
          throw error;
        }
        this.ctx2d = nextCtx;
      }
      this.renderer?.cancel?.();
      this.renderer = null;
      this.gl = null;
      canvas.style.background = "transparent";
    },
    showFailureOverlay(rect) {
      failureOverlay.style.display = "flex";
      failureOverlay.style.left = `${rect.left}px`;
      failureOverlay.style.top = `${rect.top}px`;
      failureOverlay.style.width = `${rect.width}px`;
      failureOverlay.style.height = `${rect.height}px`;
    },
    hideFailureOverlay() {
      failureOverlay.style.display = "none";
    },
    hide() {
      canvas.style.display = "none";
      this.hideFailureOverlay();
    },
  };
}

function findHoveredVideo(clientX, clientY) {
  if (typeof clientX !== "number" || typeof clientY !== "number") {
    return null;
  }

  return findHoveredMediaElement(
    clientX,
    clientY,
    "video",
    (element) => element instanceof HTMLVideoElement && isUsableVideo(element),
  );
}

function findHoveredDRMVideoElement(clientX, clientY) {
  if (typeof clientX !== "number" || typeof clientY !== "number") {
    return null;
  }
  return findHoveredMediaElement(
    clientX,
    clientY,
    "video",
    (el) => el instanceof HTMLVideoElement && el.mediaKeys != null,
  );
}

function findHoveredImage(clientX, clientY) {
  if (typeof clientX !== "number" || typeof clientY !== "number") {
    return null;
  }

  return findHoveredMediaElement(
    clientX,
    clientY,
    "img",
    (element) => element instanceof HTMLImageElement && isUsableImage(element),
  );
}

const _hoveredMediaCache = new Map();

function findHoveredMediaElement(clientX, clientY, selector, isUsable) {
  const elementsAtPoint = document.elementsFromPoint(clientX, clientY);
  for (const element of elementsAtPoint) {
    if (isUsable(element)) {
      return element;
    }
  }

  // `elementsFromPoint()` can skip opacity:0 media after we hide the source element.
  // Use cached querySelectorAll result (shared with findAutoDrawableTargets cache).
  const candidates = _hoveredMediaCache.get(selector) ?? [...document.querySelectorAll(selector)];
  _hoveredMediaCache.set(selector, candidates);
  for (let index = candidates.length - 1; index >= 0; index -= 1) {
    const candidate = candidates[index];
    if (!isUsable(candidate)) {
      continue;
    }

    if (isPointInsideElement(candidate, clientX, clientY)) {
      return candidate;
    }
  }

  return null;
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

function isPointInsideElement(element, clientX, clientY) {
  return isPointInsideRect(element.getBoundingClientRect(), clientX, clientY);
}

function isPointInsideRect(rect, clientX, clientY) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

function isDrawableElement(candidate) {
  if (candidate instanceof HTMLVideoElement) {
    return isUsableVideo(candidate);
  }

  if (candidate instanceof HTMLImageElement) {
    return isUsableImage(candidate);
  }

  return false;
}

function isRelaxedDrawableElement(candidate) {
  if (candidate instanceof HTMLVideoElement) {
    return isRelaxedVideoCandidate(candidate);
  }

  if (candidate instanceof HTMLImageElement) {
    return isRelaxedImageCandidate(candidate);
  }

  return false;
}

function isUsableVideo(candidate) {
  if (!(candidate instanceof HTMLVideoElement)) return false;
  const rect = candidate.getBoundingClientRect();
  const hasVisiblePixels =
    candidate.videoWidth > 0 &&
    candidate.videoHeight > 0;
  const hasEnoughMediaState =
    candidate.seeking ||
    candidate.readyState >= HTMLMediaElement.HAVE_METADATA;
  return rect.width > 32 &&
    rect.height > 32 &&
    (hasVisiblePixels || hasEnoughMediaState);
}

function isRelaxedVideoCandidate(candidate) {
  if (!(candidate instanceof HTMLVideoElement)) return false;
  if (!isVisibleMediaRect(candidate)) return false;
  return !!candidate.currentSrc || !!candidate.srcObject || candidate.readyState >= HTMLMediaElement.HAVE_NOTHING;
}

function isUsableImage(candidate) {
  if (!(candidate instanceof HTMLImageElement)) return false;
  if (!candidate.complete || candidate.naturalWidth < 1 || candidate.naturalHeight < 1) {
    return false;
  }
  const rect = candidate.getBoundingClientRect();
  return rect.width > 32 && rect.height > 32;
}

function isRelaxedImageCandidate(candidate) {
  if (!(candidate instanceof HTMLImageElement)) return false;
  if (!isVisibleMediaRect(candidate)) return false;
  return !!candidate.currentSrc || !!candidate.src;
}

function getElementAudioStream(targetElement) {
  if (!(targetElement instanceof HTMLVideoElement)) {
    return null;
  }

  const captureStream =
    targetElement.captureStream?.bind(targetElement) ||
    targetElement.mozCaptureStream?.bind(targetElement);

  if (!captureStream) {
    return null;
  }

  try {
    const stream = captureStream();
    return stream.getAudioTracks().length > 0 ? stream : null;
  } catch {
    return null;
  }
}

function getRecordingMimeType() {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) ?? "";
}

function applySettings(gl, renderer, settings) {
  if (!renderer) return;
  if (renderer.pass1Program && renderer.pass1UniformLocations) {
    gl.useProgram(renderer.pass1Program);
    gl.uniform2f(renderer.pass1UniformLocations.uTargetSize, settings.targetWidth, settings.targetHeight);
    gl.uniform1f(renderer.pass1UniformLocations.uColorLevels, settings.colorLevels);
    gl.uniform1f(renderer.pass1UniformLocations.uDitherStrength, settings.ditherStrength);
    gl.uniform1f(renderer.pass1UniformLocations.uPaletteMode, paletteModeToUniform(settings.paletteMode));
    gl.uniform1f(renderer.pass1UniformLocations.uGlowStrength, settings.glowStrength);
    gl.uniform1f(renderer.pass1UniformLocations.uSmoothStrength, settings.smoothStrength ?? 0);
    gl.uniform1f(renderer.pass1UniformLocations.uToonSteps, settings.toonSteps ?? 0);
    gl.uniform1f(renderer.pass1UniformLocations.uEdgeBoost, settings.edgeBoost ?? 0);
    gl.uniform1f(renderer.pass1UniformLocations.uAnimeEdgeLow, settings.animeEdgeLow ?? 0.08);
    gl.uniform1f(renderer.pass1UniformLocations.uAnimeEdgeHigh, settings.animeEdgeHigh ?? 0.55);
    gl.uniform3f(renderer.pass1UniformLocations.uMonoTint, ...toShaderMonoTint(settings.monoTint));
    gl.uniform1f(renderer.pass1UniformLocations.uNeonBoost, settings.neonBoost ?? 1);
    gl.uniform1f(renderer.pass1UniformLocations.uNeonSaturation, settings.neonSaturation ?? 1);
    gl.uniform1f(renderer.pass1UniformLocations.uNeonDetail, settings.neonDetail ?? 1);
  }

  if (!renderer.program || !renderer.uniformLocations) return;
  const uniformLocations = renderer.uniformLocations;
  gl.useProgram(renderer.program);
  gl.uniform2f(uniformLocations.uTargetSize, settings.targetWidth, settings.targetHeight);
  gl.uniform1f(uniformLocations.uCurvature, settings.curvature);
  gl.uniform1f(uniformLocations.uScanlineStrength, settings.scanlineStrength);
  gl.uniform1f(uniformLocations.uScanline2Strength, settings.scanline2Strength);
  gl.uniform1f(uniformLocations.uScanlineBrightnessFade, settings.scanlineBrightnessFade);
  gl.uniform1f(uniformLocations.uVignetteStrength, settings.vignetteStrength);
  gl.uniform1f(uniformLocations.uGlowStrength, settings.glowStrength);
  gl.uniform1f(uniformLocations.uPhosphorStrength, settings.phosphorStrength);
  gl.uniform1f(uniformLocations.uSpotMaskStrength, settings.spotMaskStrength);
  gl.uniform1f(uniformLocations.uBulbRadius, settings.bulbRadius ?? 0.22);
  gl.uniform1f(uniformLocations.uBlackFloor, settings.blackFloor ?? 0.01);
  gl.uniform1f(uniformLocations.uLumaAmount, settings.lumaAmount ?? 1);
  gl.uniform1f(uniformLocations.uLumaLow, settings.lumaLow ?? 0);
  gl.uniform1f(uniformLocations.uLumaHigh, settings.lumaHigh ?? 1);
  gl.uniform1f(uniformLocations.uLumaKnee, settings.lumaKnee ?? 0.2);
  gl.uniform1f(uniformLocations.uSaturationAmount, settings.saturationAmount ?? 1);
  gl.uniform1f(uniformLocations.uSaturationLow, settings.saturationLow ?? 0);
  gl.uniform1f(uniformLocations.uSaturationHigh, settings.saturationHigh ?? 1);
  gl.uniform1f(uniformLocations.uSaturationKnee, settings.saturationKnee ?? 0.2);
  gl.uniform1f(uniformLocations.uPhosphorDotLightBalance, settings.phosphorDotLightBalance ?? 1);
  gl.uniform1f(
    uniformLocations.uPixelAspect,
    (Math.max(gl.drawingBufferWidth, 1) * Math.max(settings.targetHeight, 1)) /
      (Math.max(gl.drawingBufferHeight, 1) * Math.max(settings.targetWidth, 1)),
  );
  gl.uniform1f(uniformLocations.uPhosphorDotMode, settings.phosphorDotMode ? 1 : 0);
  gl.uniform1f(uniformLocations.uPhosphorDotInternalScale, settings.phosphorDotInternalScale ? 1 : 0);
  gl.uniform1f(uniformLocations.uPhosphorDotBrightCore, settings.phosphorDotBrightCore ? 1 : 0);
  gl.uniform1f(uniformLocations.uPhosphorDotCellFill, settings.phosphorDotCellFill ?? 0);
  gl.uniform1f(uniformLocations.uPhosphorDotFlatDisc, settings.phosphorDotFlatDisc ? 1 : 0);
  gl.uniform1f(uniformLocations.uPhosphorDotNeighborBlend, settings.phosphorDotNeighborBlend ? 1 : 0);
  gl.uniform1f(uniformLocations.uCloseUpNoiseStrength, settings.closeUpNoiseStrength);
}

function applyFlipUniforms(gl, renderer, flipH, flipV) {
  if (!gl || !renderer) {
    return;
  }
  if (renderer.pass1Program && renderer.pass1UniformLocations) {
    gl.useProgram(renderer.pass1Program);
    gl.uniform1f(renderer.pass1UniformLocations.uFlipH, flipH ? 1 : 0);
    gl.uniform1f(renderer.pass1UniformLocations.uFlipV, flipV ? 1 : 0);
  }
  if (renderer.program && renderer.uniformLocations) {
    gl.useProgram(renderer.program);
    gl.uniform1f(renderer.uniformLocations.uFlipH, flipH ? 1 : 0);
    gl.uniform1f(renderer.uniformLocations.uFlipV, flipV ? 1 : 0);
  }
}

async function loadLatestSettings(fallbackSettings) {
  if (!chrome?.storage?.local) {
    return fallbackSettings;
  }

  try {
    const stored = await chrome.storage.local.get(SETTINGS_STORAGE_KEY);
    return normalizeSettings(stored?.[SETTINGS_STORAGE_KEY] ?? fallbackSettings);
  } catch {
    return fallbackSettings;
  }
}

function paletteModeToUniform(mode) {
  if (mode === "pc98") return 1;
  if (mode === "pc98_tile") return 2;
  if (mode === "pc98_512") return 3;
  if (mode === "pc98_512_sat") return 4;
  if (mode === "pc98_4096") return 5;
  if (mode === "color32") return 6;
  if (mode === "color64") return 7;
  if (mode === "mono") return 8;
  if (mode === "neon") return 9;
  if (mode === "anime") return 10;
  return 0;
}

const PASSTHROUGH_FRAGMENT_OVERLAY = `#version 300 es
precision mediump float;
in vec2 vTextureCoord;
uniform sampler2D uTexture;
out vec4 fragColor;
void main() { fragColor = texture(uTexture, vTextureCoord); }
`;

function setupRenderer(webgl, onReady) {
  // --- Passthrough program (tiny; compiles instantly) ---
  // Returned immediately so the overlay shows raw video while the full filter
  // compiles in the background. After compilation, renderer.program is swapped.
  let passthruProg = null;
  const passVert = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const passFrag = compileShader(webgl, webgl.FRAGMENT_SHADER, PASSTHROUGH_FRAGMENT_OVERLAY);
  const passthru = webgl.createProgram();
  if (passthru) {
    webgl.attachShader(passthru, passVert);
    webgl.attachShader(passthru, passFrag);
    webgl.linkProgram(passthru);
    if (webgl.getProgramParameter(passthru, webgl.LINK_STATUS)) {
      passthruProg = passthru;
      webgl.useProgram(passthru);
      webgl.uniform1i(webgl.getUniformLocation(passthru, "uTexture"), 0);
    }
  }

  // --- Full filter programs (async; D3D cache can block if checked immediately) ---
  const vertexShader = compileShader(webgl, webgl.VERTEX_SHADER, vertexShaderSource);
  const shouldUseWindowsLiteMode = isWindowsChromiumAngleRisk();
  const shaderSources = shouldUseWindowsLiteMode
    ? getWindowsLiteShaderSources(currentSettings)
    : { pass1: FILTER_FRAGMENT_PASS1, pass2: FILTER_FRAGMENT_PASS2 };
  const pass1Frag = compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.pass1);
  const pass2Frag = compileShader(webgl, webgl.FRAGMENT_SHADER, shaderSources.pass2);
  const prog1 = webgl.createProgram();
  const prog2 = webgl.createProgram();

  if (!prog1 || !prog2) {
    throw new Error("Failed to create WebGL program.");
  }

  webgl.attachShader(prog1, vertexShader);
  webgl.attachShader(prog1, pass1Frag);
  webgl.linkProgram(prog1);
  webgl.attachShader(prog2, vertexShader);
  webgl.attachShader(prog2, pass2Frag);
  webgl.linkProgram(prog2);

  // CRITICAL: Do NOT call getProgramParameter here. On Windows/ANGLE, Chrome's
  // D3D GPU shader cache causes any readback during cache loading to freeze the
  // main thread. renderer.program starts as passthruProg and is replaced
  // asynchronously with the full filter when compilation finishes.

  const vertices = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]);

  const vertexBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, vertexBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

  const vao = webgl.createVertexArray();
  webgl.bindVertexArray(vao);
  // aPosition is the only attribute so it is always assigned location 0.
  webgl.enableVertexAttribArray(0);
  webgl.vertexAttribPointer(0, 2, webgl.FLOAT, false, 0, 0);

  const texture = webgl.createTexture();
  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

  // destroyed: set by cancel() when the surface is torn down before compilation
  // finishes. compiling: true until the async block below exits. Together they
  // ensure loseContext() is called exactly once — either immediately (if the
  // surface is torn down after compilation) or deferred inside the async block
  // (to avoid freezing while D3D DXBC is still loading from the shader cache).
  let destroyed = false;
  let compiling = true;

  const renderer = {
    program: passthruProg,
    pass1Program: null,
    texture,
    uniformLocations: null,
    pass1UniformLocations: null,
    fbo: null,
    fboTexture: null,
    fboWidth: 0,
    fboHeight: 0,
    cancel() {
      destroyed = true;
      if (!compiling) {
        // Compilation already done; safe to lose context immediately.
        webgl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      // else: IIFE will call loseContext() after the 3 s wait completes.
    },
  };

  (async () => {
    const ext =
      webgl.getExtension("WEBGL_parallel_shader_compile")
      || webgl.getExtension("KHR_parallel_shader_compile");

    if (ext) {
      await new Promise((resolve) => {
        const poll = () => {
          const ready1 = webgl.getProgramParameter(prog1, ext.COMPLETION_STATUS_KHR);
          const ready2 = webgl.getProgramParameter(prog2, ext.COMPLETION_STATUS_KHR);
          if (ready1 && ready2) {
            resolve();
            return;
          }
          requestAnimationFrame(poll);
        };
        requestAnimationFrame(poll);
      });
    } else {
      // Chromium should normally expose parallel shader compile. Keep a small
      // fallback for unexpected runtimes instead of breaking the overlay.
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    if (destroyed) {
      // Surface was torn down during the wait; loseContext() is now safe.
      webgl.getExtension("WEBGL_lose_context")?.loseContext();
      compiling = false;
      return;
    }

    if (!webgl.getProgramParameter(prog1, webgl.LINK_STATUS)) {
      console.error("[overlay] Filter shader link failed:", webgl.getProgramInfoLog(prog1) || "unknown");
      compiling = false;
      return;
    }

    if (!webgl.getProgramParameter(prog2, webgl.LINK_STATUS)) {
      console.error("[overlay] Filter shader link failed:", webgl.getProgramInfoLog(prog2) || "unknown");
      compiling = false;
      return;
    }

    if (destroyed) {
      webgl.getExtension("WEBGL_lose_context")?.loseContext();
      compiling = false;
      return;
    }

    webgl.useProgram(prog1);
    webgl.uniform1i(webgl.getUniformLocation(prog1, "uTexture"), 0);
    renderer.pass1UniformLocations = {
      uTargetSize: webgl.getUniformLocation(prog1, "uTargetSize"),
      uColorLevels: webgl.getUniformLocation(prog1, "uColorLevels"),
      uDitherStrength: webgl.getUniformLocation(prog1, "uDitherStrength"),
      uPaletteMode: webgl.getUniformLocation(prog1, "uPaletteMode"),
      uGlowStrength: webgl.getUniformLocation(prog1, "uGlowStrength"),
      uSmoothStrength: webgl.getUniformLocation(prog1, "uSmoothStrength"),
      uToonSteps: webgl.getUniformLocation(prog1, "uToonSteps"),
      uEdgeBoost: webgl.getUniformLocation(prog1, "uEdgeBoost"),
      uAnimeEdgeLow: webgl.getUniformLocation(prog1, "uAnimeEdgeLow"),
      uAnimeEdgeHigh: webgl.getUniformLocation(prog1, "uAnimeEdgeHigh"),
      uMonoTint: webgl.getUniformLocation(prog1, "uMonoTint"),
      uNeonBoost: webgl.getUniformLocation(prog1, "uNeonBoost"),
      uNeonSaturation: webgl.getUniformLocation(prog1, "uNeonSaturation"),
      uNeonDetail: webgl.getUniformLocation(prog1, "uNeonDetail"),
      uFlipH: webgl.getUniformLocation(prog1, "uFlipH"),
      uFlipV: webgl.getUniformLocation(prog1, "uFlipV"),
    };

    webgl.useProgram(prog2);
    webgl.uniform1i(webgl.getUniformLocation(prog2, "uPass1Texture"), 0);
    renderer.uniformLocations = {
      uTargetSize: webgl.getUniformLocation(prog2, "uTargetSize"),
      uCurvature: webgl.getUniformLocation(prog2, "uCurvature"),
      uScanlineStrength: webgl.getUniformLocation(prog2, "uScanlineStrength"),
      uScanline2Strength: webgl.getUniformLocation(prog2, "uScanline2Strength"),
      uScanlineBrightnessFade: webgl.getUniformLocation(prog2, "uScanlineBrightnessFade"),
      uVignetteStrength: webgl.getUniformLocation(prog2, "uVignetteStrength"),
      uGlowStrength: webgl.getUniformLocation(prog2, "uGlowStrength"),
      uPhosphorStrength: webgl.getUniformLocation(prog2, "uPhosphorStrength"),
      uSpotMaskStrength: webgl.getUniformLocation(prog2, "uSpotMaskStrength"),
      uBulbRadius: webgl.getUniformLocation(prog2, "uBulbRadius"),
      uBlackFloor: webgl.getUniformLocation(prog2, "uBlackFloor"),
      uLumaAmount: webgl.getUniformLocation(prog2, "uLumaAmount"),
      uLumaLow: webgl.getUniformLocation(prog2, "uLumaLow"),
      uLumaHigh: webgl.getUniformLocation(prog2, "uLumaHigh"),
      uLumaKnee: webgl.getUniformLocation(prog2, "uLumaKnee"),
      uSaturationAmount: webgl.getUniformLocation(prog2, "uSaturationAmount"),
      uSaturationLow: webgl.getUniformLocation(prog2, "uSaturationLow"),
      uSaturationHigh: webgl.getUniformLocation(prog2, "uSaturationHigh"),
      uSaturationKnee: webgl.getUniformLocation(prog2, "uSaturationKnee"),
      uPhosphorDotLightBalance: webgl.getUniformLocation(prog2, "uPhosphorDotLightBalance"),
      uPixelAspect: webgl.getUniformLocation(prog2, "uPixelAspect"),
      uPhosphorDotMode: webgl.getUniformLocation(prog2, "uPhosphorDotMode"),
      uPhosphorDotInternalScale: webgl.getUniformLocation(prog2, "uPhosphorDotInternalScale"),
      uPhosphorDotBrightCore: webgl.getUniformLocation(prog2, "uPhosphorDotBrightCore"),
      uPhosphorDotCellFill: webgl.getUniformLocation(prog2, "uPhosphorDotCellFill"),
      uPhosphorDotFlatDisc: webgl.getUniformLocation(prog2, "uPhosphorDotFlatDisc"),
      uPhosphorDotNeighborBlend: webgl.getUniformLocation(prog2, "uPhosphorDotNeighborBlend"),
      uCloseUpNoiseStrength: webgl.getUniformLocation(prog2, "uCloseUpNoiseStrength"),
      uTime: webgl.getUniformLocation(prog2, "uTime"),
      uFlipH: webgl.getUniformLocation(prog2, "uFlipH"),
      uFlipV: webgl.getUniformLocation(prog2, "uFlipV"),
    };

    renderer.pass1Program = prog1;
    renderer.program = prog2;
    compiling = false;
    onReady?.(renderer);
  })();

  return renderer;
}

function ensureRendererFramebuffer(gl, renderer) {
  if (
    renderer.fbo &&
    renderer.fboTexture &&
    renderer.fboWidth === gl.drawingBufferWidth &&
    renderer.fboHeight === gl.drawingBufferHeight
  ) {
    return;
  }

  if (renderer.fbo) {
    gl.deleteFramebuffer(renderer.fbo);
    renderer.fbo = null;
  }
  if (renderer.fboTexture) {
    gl.deleteTexture(renderer.fboTexture);
    renderer.fboTexture = null;
  }

  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Failed to create overlay FBO texture.");
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.drawingBufferWidth,
    gl.drawingBufferHeight,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fbo = gl.createFramebuffer();
  if (!fbo) {
    gl.deleteTexture(texture);
    throw new Error("Failed to create overlay framebuffer.");
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  renderer.fbo = fbo;
  renderer.fboTexture = texture;
  renderer.fboWidth = gl.drawingBufferWidth;
  renderer.fboHeight = gl.drawingBufferHeight;
}

function compileShader(webgl, type, source) {
  const shader = webgl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader.");
  }

  webgl.shaderSource(shader, source);
  webgl.compileShader(shader);

  if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
    throw new Error(webgl.getShaderInfoLog(shader) || "Failed to compile shader.");
  }

  return shader;
}
