import { invoke } from "@tauri-apps/api/core";

// ---------------------------------------------------------------------------
// Types (mirror Rust structs)
// ---------------------------------------------------------------------------

export interface ServerStatus {
  running: boolean;
  port: number | null;
  url: string | null;
  hostname: string | null;
  ips: string[] | null;
  id: string | null;
  password: string | null;
  localOnly: boolean | null;
  isHttps: boolean | null;
}

export interface BonjourStatus {
  running: boolean;
  serviceName: string | null;
  serviceType: string | null;
  port: number | null;
}

export interface SharedFileInfo {
  id: string;
  name: string;
  path: string;
  url: string;
  isDir: boolean;
}

export interface MdropConfig {
  apiKey: string;
  serverUrl: string | null;
}

export interface StartServerRequest {
  hostname: string;
  port: string;
  id?: string;
  password?: string;
  isHttps?: boolean;
  localOnly?: boolean;
}

// ---------------------------------------------------------------------------
// Server commands
// ---------------------------------------------------------------------------

export const mdropStartServer = (req: StartServerRequest) =>
  invoke<ServerStatus>("mdrop_start_server", { req });

export const mdropStopServer = () =>
  invoke<ServerStatus>("mdrop_stop_server");

export const mdropGetServerStatus = () =>
  invoke<ServerStatus>("mdrop_get_server_status");

// ---------------------------------------------------------------------------
// File sharing commands
// ---------------------------------------------------------------------------

export const mdropShareFile = (path: string) =>
  invoke<SharedFileInfo>("mdrop_share_file", { req: { path } });

export const mdropUnshareFile = (id: string) =>
  invoke<void>("mdrop_unshare_file", { req: { id } });

export const mdropUnshareAll = () =>
  invoke<void>("mdrop_unshare_all");

// ---------------------------------------------------------------------------
// Bonjour / mDNS commands
// ---------------------------------------------------------------------------

export const mdropStartBonjour = () =>
  invoke<BonjourStatus>("mdrop_start_bonjour");

export const mdropStopBonjour = () =>
  invoke<BonjourStatus>("mdrop_stop_bonjour");

export const mdropGetBonjourStatus = () =>
  invoke<BonjourStatus>("mdrop_get_bonjour_status");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const mdropGetConfig = () =>
  invoke<MdropConfig>("mdrop_get_config");
