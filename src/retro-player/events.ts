export const RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT =
  "retro-player:prepare-external-navigation";
export const RETRO_PLAYER_ENSURE_AUDIO_CONTEXT_EVENT =
  "retro-player:ensure-audio-context";
export const RETRO_PLAYER_PAUSE_PLAYBACK_EVENT =
  "retro-player:pause-playback";

export const dispatchRetroPlayerPrepareExternalNavigation = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT),
  );
};

export const dispatchRetroPlayerEnsureAudioContext = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(RETRO_PLAYER_ENSURE_AUDIO_CONTEXT_EVENT),
  );
};

export const dispatchRetroPlayerPausePlayback = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(RETRO_PLAYER_PAUSE_PLAYBACK_EVENT),
  );
};
