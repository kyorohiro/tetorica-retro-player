export const RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT =
  "retro-player:prepare-external-navigation";

export const dispatchRetroPlayerPrepareExternalNavigation = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(RETRO_PLAYER_PREPARE_EXTERNAL_NAVIGATION_EVENT),
  );
};
