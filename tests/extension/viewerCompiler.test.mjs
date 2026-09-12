import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createProgramCache } from '../../extension/shared/overlayCompiler.js';
const source = fs.readFileSync(new URL('../../extension/viewer.js', import.meta.url), 'utf8');
function harness({ timeout = false } = {}) {
  let links = 0;
  let statuses = 0;
  const gl = new Proxy({
    VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, LINK_STATUS: 3,
    getExtension: () => ({ COMPLETION_STATUS_KHR: 4 }), isContextLost: () => false,
    createShader: () => ({}), createProgram: () => ({ ready: false }),
    linkProgram(p) { links++; p.ready = !timeout; },
    getShaderParameter() { assert.fail('early COMPILE_STATUS'); },
    getProgramParameter(p, key) {
      if (key === 4) return p.ready;
      assert.ok(p.ready, 'early LINK_STATUS'); statuses++; return true;
    },
    createTexture: () => ({}), createBuffer: () => ({}), createVertexArray: () => ({}),
  }, { get: (target, key) => key in target ? target[key] : () => {} });
  const scope = vm.createContext({
    console: { info() {}, warn() {}, error() {} }, DOMException, AbortController,
    rendererSetupGeneration: 0, rendererPreparing: false, rendererFailed: false,
    rendererCompileQueue: Promise.resolve(), rendererProgramCache: null,
    rendererAbort: new AbortController(), currentSettings: { variant: 'a' }, texture: null,
    vertexShaderSource: 'vertex', PASSTHROUGH_FRAGMENT: 'passthrough',
    getRendererVariantSignature: s => s.variant, getWindowsLiteVariantKey: s => s.variant,
    getWindowsLiteShaderSources: s => ({ pass1: s.variant, pass2: 'pass2', beamKernel: 'kernel' }),
    withShaderCompileCacheBuster: s => s,
    createProgramCache: (gl, vertex, opts) => createProgramCache(gl, vertex, { ...opts, timeoutMs: 10, pollMs: 1 }),
    publishCompileState() {}, renderViewerCompileState() {}, setStatus() {},
    resizeCanvas() {}, applyCurrentSettings() {},
  });
  vm.runInContext(source.slice(source.indexOf('function setupRenderer(webgl)'), source.indexOf('function ensureBeamKernelFramebuffer')), scope);
  return { scope, gl, counts: () => ({ links, statuses }) };
}
test('viewer compiles passthrough and filter passes safely and reuses its cache', async () => {
  const h = harness();
  h.scope.setupRenderer(h.gl); await h.scope.rendererCompileQueue;
  assert.equal(h.scope.rendererFailed, false);
  assert.deepEqual(h.counts(), { links: 4, statuses: 4 });
  h.scope.setupRenderer(h.gl); await h.scope.rendererCompileQueue;
  assert.deepEqual(h.counts(), { links: 4, statuses: 4 });
});
test('viewer switches to latest settings without overlapping compile batches', async () => {
  const h = harness();
  h.scope.setupRenderer(h.gl);
  h.scope.currentSettings = { variant: 'b' };
  h.scope.setupRenderer(h.gl); await h.scope.rendererCompileQueue;
  assert.equal(h.scope.rendererFailed, false);
  assert.equal(h.scope.rendererPreparing, false);
  assert.equal(h.scope.activeRendererVariantSignature, 'b');
  assert.deepEqual(h.counts(), { links: 4, statuses: 4 });
});
test('viewer timeout stops further GPU submissions and never reads LINK_STATUS', async () => {
  const h = harness({ timeout: true });
  h.scope.setupRenderer(h.gl); await h.scope.rendererCompileQueue;
  assert.equal(h.scope.rendererFailed, true);
  h.scope.setupRenderer(h.gl); await h.scope.rendererCompileQueue;
  assert.deepEqual(h.counts(), { links: 1, statuses: 0 });
});

test('viewer pauses video uploads, draws and buffer resize during preparation or failure', () => {
  for (const flag of ['rendererPreparing', 'rendererFailed']) {
    const scope = vm.createContext({ rendererPreparing: false, rendererFailed: false,
      requestAnimationFrame: () => 1, animationFrameId: 0,
      [flag]: true,
    });
    vm.runInContext(source.slice(source.indexOf('function drawFrame()'), source.indexOf('function toggleFitMode()')), scope);
    // No GL, canvas or video objects exist in this scope: any access fails.
    scope.drawFrame(); scope.resizeCanvas();
    assert.equal(scope.animationFrameId, 1);
  }
});
