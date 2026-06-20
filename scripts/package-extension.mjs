import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;
const extensionDir = path.resolve("extension");
const releaseDir = path.resolve("release");
const zipName = `tetorica-retro-tab-filter-extension-v${version}.zip`;
const zipPath = path.join(releaseDir, zipName);

fs.mkdirSync(releaseDir, { recursive: true });
fs.rmSync(zipPath, { force: true });

execFileSync("npx", ["tsc", "-p", "tsconfig.extension.json"], {
  stdio: "inherit",
});

execFileSync("zip", ["-r", zipPath, ".", "-x", ".DS_Store", "*/.DS_Store"], {
  cwd: extensionDir,
  stdio: "inherit",
});

console.log(`packaged ${zipPath}`);
