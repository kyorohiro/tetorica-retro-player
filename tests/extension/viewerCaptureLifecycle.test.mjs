import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../../extension/viewer.js', import.meta.url), 'utf8');
const flush = async () => { for (let i=0;i<12;i++) await Promise.resolve(); };
function harness() {
  const pending = {}, stopped = [];
  const context = vm.createContext({
    captureGeneration: 0, captureStartQueue: Promise.resolve(), mediaStream: null,
    animationFrameId: 0, currentSession: null, startedAt: 0,
    navigator: {mediaDevices: {getUserMedia: options => new Promise(resolve => {pending[options.video.mandatory.chromeMediaSourceId]=resolve;})}},
    video: {srcObject:null,play:async()=>{}}, performance:{now:()=>0},
    stopRecording(){},detachCaptureSizeListeners(){},disposeAudioEngine:async()=>{},
    cancelAnimationFrame(){}, logCaptureAspect(){},attachCaptureSizeListeners(){},resizeCanvas(){},
    connectStreamAudio:async()=>{},drawFrame(){},setStatus(){},
  });
  vm.runInContext(source.slice(source.indexOf('function startCapture('),source.indexOf('function attachCaptureSizeListeners(')),context);
  return {context,pending,stopped,stream:id=>({id,getTracks:()=>[{stop:()=>stopped.push(id)}]})};
}
test('late capture is stopped and only the latest request is displayed',async()=>{
  const {context:c,pending,stopped,stream}=harness();
  const a=c.startCapture('A'); await flush();
  const b=c.startCapture('B');
  pending.A(stream('A')); await a; await flush();
  assert.deepEqual(stopped,['A']);
  pending.B(stream('B')); await b;
  assert.equal(c.video.srcObject.id,'B');
});
test('stop while capture acquisition is pending prevents resurrection',async()=>{
  const {context:c,pending,stopped,stream}=harness();
  const a=c.startCapture('A');await flush();
  await c.stopCapture();pending.A(stream('A'));await a;
  assert.equal(c.video.srcObject,null); assert.deepEqual(stopped,['A']);
});
test('audio teardown owns its old resources and does not close replacements',async()=>{
  let finish;
  const oldContext={state:'running',close:async function(){this.state='closed';}};
  const freshContext={state:'running',close:async function(){this.state='closed';}};
  const c=vm.createContext({audioContext:oldContext,audioEngine:{dispose:()=>new Promise(resolve=>finish=resolve)},mediaSourceNode:null,closeViewerAudioContext:async ctx=>{if(ctx)await ctx.close();}});
  vm.runInContext(source.slice(source.indexOf('async function disposeAudioEngine('),source.indexOf('function setupRenderer(')),c);
  const closing=c.disposeAudioEngine();
  assert.equal(c.audioContext,null);assert.equal(c.audioEngine,null);
  const engine={input:{}};c.audioContext=freshContext;c.audioEngine=engine;
  finish();await closing;
  assert.equal(oldContext.state,'closed');assert.equal(freshContext.state,'running');
  assert.equal(c.audioContext,freshContext);assert.equal(c.audioEngine,engine);
});
