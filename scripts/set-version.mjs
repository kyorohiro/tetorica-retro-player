import fs from "node:fs";

const nextVersion = process.argv[2]?.trim();

if (!nextVersion) {
  console.error("Usage: npm run version:set -- <version>");
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(nextVersion)) {
  console.error(`Invalid version: ${nextVersion}`);
  process.exit(1);
}

const readText = (path) => fs.readFileSync(path, "utf-8");
const writeText = (path, value) => fs.writeFileSync(path, value);

const updateJsonFile = (path, updater) => {
  const json = JSON.parse(readText(path));
  updater(json);
  writeText(path, `${JSON.stringify(json, null, 2)}\n`);
};

const updateVersionField = (path) => {
  const source = readText(path);
  const versionPattern = /"version":\s*"[^"]+"/;
  if (!versionPattern.test(source)) {
    console.error(`Failed to update version in ${path}`);
    process.exit(1);
  }

  const nextSource = source.replace(
    versionPattern,
    `"version": "${nextVersion}"`,
  );

  writeText(path, nextSource);
};

const packageJsonPath = "package.json";
const packageJson = JSON.parse(readText(packageJsonPath));
const previousVersion = packageJson.version;

if (!previousVersion) {
  console.error("package.json does not contain a version field");
  process.exit(1);
}

updateVersionField("package.json");
updateVersionField("extension/manifest.json");
updateVersionField("src-tauri/tauri.conf.json");

updateJsonFile("package-lock.json", (json) => {
  json.version = nextVersion;
  if (json.packages?.[""]) {
    json.packages[""].version = nextVersion;
  }
});

const cargoTomlPath = "src-tauri/Cargo.toml";
const cargoToml = readText(cargoTomlPath);
const cargoVersionPattern = /^version = "[^"]+"$/m;
if (!cargoVersionPattern.test(cargoToml)) {
  console.error(`Failed to update version in ${cargoTomlPath}`);
  process.exit(1);
}

const nextCargoToml = cargoToml.replace(
  cargoVersionPattern,
  `version = "${nextVersion}"`,
);

writeText(cargoTomlPath, nextCargoToml);

const readmePath = "RELEASE_MEMO.md";
const readme = readText(readmePath);
const nextReadme = readme.replaceAll(previousVersion, nextVersion);

if (readme !== nextReadme) {
  writeText(readmePath, nextReadme);
}

console.log(`Updated version: ${previousVersion} -> ${nextVersion}`);
console.log("Updated files:");
console.log("- package.json");
console.log("- package-lock.json");
console.log("- extension/manifest.json");
console.log("- src-tauri/tauri.conf.json");
console.log("- src-tauri/Cargo.toml");
console.log("- README.md");
