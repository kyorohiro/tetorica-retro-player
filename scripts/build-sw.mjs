import fs from "node:fs";
import path from "node:path";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const version = pkg.version;
const buildId = `${version}-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}`;

const inputPath = path.join("public", "sw-template.js");
const outputPath = path.join("public", "sw.js");

const source = fs.readFileSync(inputPath, "utf-8");
const output = source
  .replaceAll("__APP_VERSION__", version)
  .replaceAll("__APP_BUILD_ID__", buildId);

fs.writeFileSync(outputPath, output);
console.log(`generated public/sw.js with version ${version} and build ${buildId}`);
