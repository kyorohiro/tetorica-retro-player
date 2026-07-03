import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const outputPath = path.join("src", "licenses.json");

function licenseFromPackageJson(pkg) {
  if (typeof pkg.license === "string") return pkg.license;
  if (pkg.license && typeof pkg.license === "object" && pkg.license.type) return pkg.license.type;
  if (Array.isArray(pkg.licenses) && pkg.licenses.length > 0) {
    return pkg.licenses.map((l) => l.type).filter(Boolean).join(" OR ");
  }
  return null;
}

function collectNpmLicenses() {
  const nodeModulesDir = path.join(repoRoot, "node_modules");
  const found = new Map();

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === ".bin") continue;
      const full = path.join(dir, entry.name);
      if (entry.name.startsWith("@")) {
        walk(full);
        continue;
      }
      const pkgJsonPath = path.join(full, "package.json");
      if (fs.existsSync(pkgJsonPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
          if (pkg.name && !found.has(pkg.name)) {
            found.set(pkg.name, {
              name: pkg.name,
              version: pkg.version ?? null,
              license: licenseFromPackageJson(pkg) ?? "Unknown",
            });
          }
        } catch {
          // ignore unreadable/invalid package.json
        }
      }
      const nestedNodeModules = path.join(full, "node_modules");
      if (fs.existsSync(nestedNodeModules)) {
        walk(nestedNodeModules);
      }
    }
  }

  walk(nodeModulesDir);
  return [...found.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function collectRustLicenses() {
  const raw = execFileSync(
    "cargo",
    ["metadata", "--format-version=1"],
    { cwd: repoRoot, encoding: "utf-8", maxBuffer: 1024 * 1024 * 64 },
  );
  const metadata = JSON.parse(raw);

  return metadata.packages
    .filter((p) => p.source !== null) // drop this repo's own workspace crates
    .map((p) => ({
      name: p.name,
      version: p.version,
      license: p.license ?? (p.license_file ? "(see license_file)" : "Unknown"),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const other = [
  {
    name: "FFmpeg",
    version: null,
    license: "GPL-3.0-or-later / LGPL-2.1-or-later (depends on build)",
    note:
      "Bundled or invoked as a separate ffmpeg binary (sidecar or system-installed), not linked into the app. " +
      "Builds used by this project (evermeet.cx, BtbN/FFmpeg-Builds) are GPL builds. Source: https://ffmpeg.org/",
  },
];

let npm = [];
try {
  npm = collectNpmLicenses();
} catch (error) {
  console.error("Failed to collect npm licenses:", error.message);
}

let rust = [];
try {
  rust = collectRustLicenses();
} catch (error) {
  console.error("Failed to collect Rust licenses (is `cargo` on PATH?):", error.message);
}

const data = {
  generatedAt: new Date().toISOString(),
  npm,
  rust,
  other,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`generated ${outputPath}: ${npm.length} npm, ${rust.length} rust, ${other.length} other`);
