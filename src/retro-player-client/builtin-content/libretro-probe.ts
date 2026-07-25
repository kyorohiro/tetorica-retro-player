export type LibretroWasmDescriptor = {
  path: string;
  imports: WebAssembly.ModuleImportDescriptor[];
  exports: WebAssembly.ModuleExportDescriptor[];
};

export const probeLibretroWasm = async (
  path: string,
): Promise<LibretroWasmDescriptor> => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch WASM core: ${path} (${response.status})`);
  }

  const bytes = await response.arrayBuffer();
  const module = await WebAssembly.compile(bytes);

  return {
    path,
    imports: WebAssembly.Module.imports(module),
    exports: WebAssembly.Module.exports(module),
  };
};

export const summarizeLibretroWasm = (descriptor: LibretroWasmDescriptor) => {
  const exportNames = descriptor.exports.map((entry) => entry.name);
  const importNames = descriptor.imports.map(
    (entry) => `${entry.module}.${entry.name}`,
  );

  return {
    path: descriptor.path,
    importCount: descriptor.imports.length,
    exportCount: descriptor.exports.length,
    importNames,
    exportNames,
    hasRetroRun: exportNames.includes("retro_run"),
    hasRetroLoadGame: exportNames.includes("retro_load_game"),
    hasMalloc: exportNames.includes("malloc"),
    hasMemory: exportNames.includes("memory"),
  };
};
