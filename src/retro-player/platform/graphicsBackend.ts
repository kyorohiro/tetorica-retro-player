import { invoke } from "@tauri-apps/api/core";
import { isTauriRuntime } from "./runtime";

export type GraphicsBackendMode = "default" | "desktop-opengl";

export const DEFAULT_GRAPHICS_BACKEND_MODE: GraphicsBackendMode = "default";

export const getGraphicsBackendMode = async (): Promise<GraphicsBackendMode> => {
  if (!isTauriRuntime()) {
    return DEFAULT_GRAPHICS_BACKEND_MODE;
  }
  return invoke<GraphicsBackendMode>("get_graphics_backend_mode");
};

export const setGraphicsBackendMode = async (
  mode: GraphicsBackendMode,
): Promise<void> => {
  if (!isTauriRuntime()) {
    return;
  }
  await invoke("set_graphics_backend_mode", { mode });
};

export const restartApplication = async (): Promise<void> => {
  if (!isTauriRuntime()) {
    return;
  }
  await invoke("restart_application");
};
