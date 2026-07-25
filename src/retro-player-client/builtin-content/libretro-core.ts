import {
  probeLibretroWasm,
  summarizeLibretroWasm,
  type LibretroWasmDescriptor,
} from "./libretro-probe";

type LibretroStubImport = (...args: number[]) => number;

const DEFAULT_LIBRETRO_MEMORY_PAGES = 1024;
const DEFAULT_LIBRETRO_MAX_MEMORY_PAGES = 2048;
const DEFAULT_LIBRETRO_TABLE_SIZE = 4096;

export type LibretroCoreExports = WebAssembly.Exports & {
  __wasm_call_ctors?: () => void;
  memory?: WebAssembly.Memory;
  malloc?: (size: number) => number;
  free?: (ptr: number) => void;
  retro_init?: () => void;
  retro_deinit?: () => void;
  retro_api_version?: () => number;
  retro_get_system_info?: (infoPtr: number) => void;
  retro_get_system_av_info?: (infoPtr: number) => void;
  retro_load_game?: (gameInfoPtr: number) => number;
  retro_unload_game?: () => void;
  retro_run?: () => void;
  retro_reset?: () => void;
};

export type LoadedLibretroCore = {
  descriptor: LibretroWasmDescriptor;
  instance: WebAssembly.Instance;
  exports: LibretroCoreExports;
  summary: ReturnType<typeof summarizeLibretroWasm>;
};

const createStubImport = (
  moduleName: string,
  importName: string,
): LibretroStubImport => {
  return (...args: number[]) => {
    console.debug("[libretro core] stub import called", {
      moduleName,
      importName,
      args,
    });
    return 0;
  };
};

const stackPointerInitialValue = (memory: WebAssembly.Memory) => {
  const stackGuardBytes = 64 * 1024;
  return Math.max(1024, memory.buffer.byteLength - stackGuardBytes);
};

const isMutableGlobalImport = (importName: string) => {
  // Toolchain-provided base globals like __memory_base / __table_base are
  // typically immutable in wasm imports.
  if (
    importName === "__memory_base" ||
    importName === "__table_base"
  ) {
    return false;
  }
  return true;
};

const createImportedMemory = () =>
  new WebAssembly.Memory({
    initial: DEFAULT_LIBRETRO_MEMORY_PAGES,
    maximum: DEFAULT_LIBRETRO_MAX_MEMORY_PAGES,
  });

const createImportedTable = () =>
  new WebAssembly.Table({
    initial: DEFAULT_LIBRETRO_TABLE_SIZE,
    element: "anyfunc",
  });

const createStubGlobal = (
  importName: string,
  importedMemory: WebAssembly.Memory,
) =>
  new WebAssembly.Global(
    { value: "i32", mutable: isMutableGlobalImport(importName) },
    importName === "__stack_pointer"
      ? stackPointerInitialValue(importedMemory)
      : 0,
  );

const createImportObject = (descriptor: LibretroWasmDescriptor): WebAssembly.Imports => {
  const importObject: Record<string, Record<string, unknown>> = {};
  const importedMemory = createImportedMemory();
  const importedTable = createImportedTable();

  for (const entry of descriptor.imports) {
    const moduleBucket = importObject[entry.module] ?? {};
    importObject[entry.module] = moduleBucket;

    if (entry.kind === "function") {
      moduleBucket[entry.name] = createStubImport(entry.module, entry.name);
      continue;
    }

    if (entry.kind === "global") {
      moduleBucket[entry.name] = createStubGlobal(entry.name, importedMemory);
      continue;
    }

    if (entry.kind === "memory") {
      moduleBucket[entry.name] = importedMemory;
      continue;
    }

    if (entry.kind === "table") {
      moduleBucket[entry.name] = importedTable;
      continue;
    }

    console.warn("[libretro core] unsupported import kind", {
      module: entry.module,
      name: entry.name,
      kind: entry.kind,
    });
  }

  return importObject;
};

export const loadLibretroCore = async (
  path: string,
): Promise<LoadedLibretroCore> => {
  const descriptor = await probeLibretroWasm(path);
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch libretro core: ${path} (${response.status})`);
  }

  const bytes = await response.arrayBuffer();
  const importObject = createImportObject(descriptor);
  const { instance } = await WebAssembly.instantiate(bytes, importObject);
  const exports = instance.exports as LibretroCoreExports;

  return {
    descriptor,
    instance,
    exports,
    summary: summarizeLibretroWasm(descriptor),
  };
};
