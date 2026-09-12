import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve('extension');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const files = fs.readdirSync(root, { recursive: true }).filter(file => file.endsWith('.js'));
const published = new Set(manifest.web_accessible_resources.flatMap(group => group.resources));
const dependencies = new Map();
for (const file of files) {
  const fullPath = path.join(root, file);
  const result = spawnSync(process.execPath, ['--check', fullPath], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || `Cannot check ${file}`);
  const imports = [...fs.readFileSync(fullPath, 'utf8').matchAll(/(?:from\s*|import\s*)["'](\.[^"']+)["']/g)]
    .map(match => path.relative(root, path.resolve(path.dirname(fullPath), match[1])).split(path.sep).join('/'));
  for (const dependency of imports) {
    if (!fs.existsSync(path.join(root, dependency))) throw new Error(`${file}: missing import ${dependency}`);
  }
  dependencies.set(file.split(path.sep).join('/'), imports);
}
for (const file of published) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing manifest resource: ${file}`);
}
// Every module loaded into the host page must be web-accessible, including its
// transitive imports. Viewer-only modules are served in the extension origin.
const visited = new Set();
function visit(file) {
  if (visited.has(file)) return;
  visited.add(file);
  if (!published.has(file)) throw new Error(`Overlay module is not web-accessible: ${file}`);
  for (const dependency of dependencies.get(file) ?? []) visit(dependency);
}
visit('overlayRuntime.js');
console.log(`Checked ${files.length} JavaScript files and ${visited.size} overlay modules.`);
