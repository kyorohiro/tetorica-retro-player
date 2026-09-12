import test from 'node:test';
import assert from 'node:assert/strict';
import { createProgramCache, createCompileLease, delay } from '../../extension/shared/overlayCompiler.js';

function fakeGL({ polls = 0, fail = false, extension = true } = {}) {
  const calls = [];
  let count = 0;
  let lost = false;
  return {
    calls, VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, LINK_STATUS: 3,
    lose() { lost = true; },
    getExtension() { return extension ? { COMPLETION_STATUS_KHR: 4 } : null; },
    isContextLost() { return lost; },
    createShader() { return {}; },
    createProgram() { return { id: ++count, polls: 0 }; },
    shaderSource() {}, attachShader() {}, bindAttribLocation() {}, compileShader() {},
    linkProgram(p) { calls.push(['link', p.id]); },
    getProgramParameter(p, key) {
      calls.push([key === 3 ? 'status' : 'poll', p.id]);
      if (key === 4) return ++p.polls > polls;
      assert.ok(!extension || p.polls > polls, 'LINK_STATUS read before completion');
      return !fail;
    },
    getProgramInfoLog() { return 'driver failure'; },
    deleteProgram(p) { calls.push(['delete', p.id]); },
    deleteShader() {},
    getShaderParameter() { assert.fail('Synchronous shader status check'); },
  };
}

test('passes complete in order and revisiting a source reuses the program', async () => {
  const gl = fakeGL({ polls: 2 });
  const cache = createProgramCache(gl, 'vertex', { pollMs: 1 });
  const [a, b, same] = await Promise.all([cache.get('a', 'a'), cache.get('b', 'b'), cache.get('a', 'a-again')]);
  assert.equal(a, same);
  assert.notEqual(a, b);
  assert.ok(gl.calls.findIndex(c=>c[0]==='status'&&c[1]===1) < gl.calls.findIndex(c=>c[0]==='link'&&c[1]===2));
  assert.equal(gl.calls.filter(c=>c[0]==='link').length, 2);
  cache.dispose();
  assert.equal(gl.calls.filter(c=>c[0]==='delete').length, 2);
});

test('timeout does not fall through to a blocking LINK_STATUS query; queue recovers', async () => {
  const gl = fakeGL({ polls: 100000 });
  const cache = createProgramCache(gl, 'v', { timeoutMs: 3, pollMs: 1 });
  await assert.rejects(cache.get('bad', 'bad'), /timeout/);
  assert.equal(gl.calls.filter(c=>c[0]==='status').length, 0);
  await assert.rejects(cache.get('next', 'next'), /timeout/);
  assert.equal(gl.calls.filter(c=>c[0]==='link').length, 2);
});

test('cancelling a GPU wait stops polling and does not cache it', async () => {
  const gl = fakeGL({ polls: 100000 });
  const controller = new AbortController();
  const cache = createProgramCache(gl, 'v', { pollMs: 1, onStage(_, stage) { if(stage==='gpu-wait') controller.abort(); } });
  await assert.rejects(cache.get('a', 'a', controller.signal), { name: 'AbortError' });
  assert.equal(cache.has('a'), false);
  assert.equal(gl.calls.filter(c=>c[0]==='status').length, 0);
});

test('link failure is reported, not cached, and releases its program', async () => {
  const gl = fakeGL({ fail: true });
  const cache = createProgramCache(gl, 'v');
  await assert.rejects(cache.get('a', 'a'), /driver failure/);
  assert.equal(cache.has('a'), false);
  assert.equal(gl.calls.filter(c=>c[0]==='delete').length, 1);
});

test('context loss stops compilation', async () => {
  const gl = fakeGL({ polls: 100000 });
  const cache = createProgramCache(gl, 'v', { onStage(_, stage) { if(stage==='gpu-wait') gl.lose(); } });
  await assert.rejects(cache.get('a', 'a'), { name: 'AbortError' });
  assert.equal(gl.calls.filter(c=>c[0]==='status').length, 0);
});

test('without the parallel extension, fallback is explicitly diagnosed', async () => {
  const gl = fakeGL({ extension: false });
  const stages = [];
  await createProgramCache(gl, 'v', { fallbackDelayMs: 1, onStage(_, s) { stages.push(s); } }).get('a', 'a');
  assert.ok(stages.includes('synchronous-link-fallback'));
});

test('coordinator rejection terminates instead of retrying forever', async () => {
  const messages = [];
  const lease = createCompileLease(async m => { messages.push(m.type); return { ok: false }; });
  await assert.rejects(lease('id', null, () => assert.fail()), /unavailable/);
  assert.deepEqual(messages, ['ACQUIRE_OVERLAY_COMPILE_SLOT','RELEASE_OVERLAY_COMPILE_SLOT']);
});

test('missing coordinator response is bounded and attempts release', async () => {
  const messages = [];
  const lease = createCompileLease(m => { messages.push(m.type); return new Promise(()=>{}); }, { requestTimeoutMs: 3 });
  await assert.rejects(lease('id', null, () => assert.fail()), /did not respond/);
  assert.ok(messages.includes('RELEASE_OVERLAY_COMPILE_SLOT'));
});

test('slot ownership loss aborts the task and releases the lease', async () => {
  const messages = [];
  const lease = createCompileLease(async m => {
    messages.push(m.type);
    return { ok: true, acquired: true, refreshed: false };
  }, { heartbeatMs: 1 });
  await assert.rejects(lease('id', null, signal => delay(1000, signal)), /ownership lost/);
  assert.equal(messages.at(-1), 'RELEASE_OVERLAY_COMPILE_SLOT');
});

test('task failure and cancellation while waiting both release the slot', async () => {
  for (const acquired of [true, false]) {
    const controller = new AbortController();
    const messages = [];
    const lease = createCompileLease(async m => {
      messages.push(m.type);
      if (!acquired && m.type==='ACQUIRE_OVERLAY_COMPILE_SLOT') controller.abort();
      return { ok:true, acquired };
    });
    await assert.rejects(lease('id', controller.signal, async ()=>{throw new Error('compile failed');}));
    assert.equal(messages.at(-1), 'RELEASE_OVERLAY_COMPILE_SLOT');
  }
});
