import test from 'node:test';
import assert from 'node:assert/strict';
import { PRESETS } from '../../extension/shared/settings.js';
import { loadRuntime, fakeGL } from './runtimeHarness.mjs';

async function ready(renderer) {
  const start = performance.now();
  while(renderer.compiling) {
    assert.ok(performance.now()-start < 3000, 'renderer stuck compiling');
    await new Promise(r=>setTimeout(r,1));
  }
  if(renderer.error) throw renderer.error;
}

test('runtime compiles all presets and reuses earlier programs on the same context', async () => {
  const api = await loadRuntime();
  const gl = fakeGL();
  const normalize = api.settings.normalizeSettings;
  const initial = normalize({ presetKey:'crtBeam' });
  const renderer = api.setupRenderer(gl, null, initial, ()=>{});
  await ready(renderer);
  for(const presetKey of Object.keys(PRESETS)) {
    const settings = normalize({ presetKey });
    renderer.updateSettings(settings);
    await ready(renderer);
    api.applySettings(gl,renderer,settings);
    api.applyFlipUniforms(gl,renderer,false,false);
    for(const stage of ['samplingPrep','composite','phosphorCore']) {
      if(renderer[stage+'Program']) api.drawOverlayIntermediate(gl,renderer,stage,renderer.texture,settings);
    }
  }
  renderer.updateSettings(initial);
  await ready(renderer);
  const before = gl.calls.filter(c=>c[0]==='link').length;
  renderer.updateSettings(initial);
  await ready(renderer);
  assert.equal(gl.calls.filter(c=>c[0]==='link').length, before);
  renderer.cancel();
});

test('rapid settings changes only activate the final variant', async () => {
  const api = await loadRuntime();
  const gl = fakeGL();
  const states=[];
  const renderer=api.setupRenderer(gl, ()=>states.push('ready'),api.settings.normalizeSettings({presetKey:'crtBeam'}),()=>{});
  renderer.updateSettings(api.settings.normalizeSettings({presetKey:'phosphorDot'}));
  renderer.updateSettings(api.settings.normalizeSettings({presetKey:'gameboy'}));
  await ready(renderer);
  assert.equal(states.length,1);
  assert.equal(renderer.beamKernelProgram,null);
  renderer.cancel();
});

test('stopping a queued renderer never activates it', async () => {
  const api=await loadRuntime();
  const gl=fakeGL();
  let activated=false;
  const renderer=api.setupRenderer(gl,()=>{activated=true;},api.settings.normalizeSettings({}),()=>{});
  renderer.cancel();
  await new Promise(r=>setTimeout(r,20));
  assert.equal(activated,false);
  assert.equal(gl.calls.filter(c=>c[0]==='link').length,0);
});

test('settings select separate sampling, composite, and phosphor passes', async () => {
  const api=await loadRuntime();
  const sources=api.getWindowsLiteShaderSources(api.settings.normalizeSettings({presetKey:'phosphorDot',samplingMode:'average_fast_4',compositeEnabled:true,compositeAmount:1}));
  assert.ok(sources.samplingPrep);
  assert.ok(sources.composite);
  assert.ok(sources.phosphorCore);
  assert.equal(api.getSamplingModeValue('average_fast_4'),1);
  assert.equal(api.getSamplingModeValue('average_fast_8'),2);
  assert.equal(api.getBeamStripeModeValue('modern'),1);
});

function fakeDocument(gl) {
  const elements=[];
  class Element {
    constructor(tag) {
      this.tagName=tag;
      this.style={ setProperty(k,v) { this[k]=v; } };
      this.dataset={}; this.listeners={}; this.width=640; this.height=360;
      elements.push(this);
    }
    append() {}
    addEventListener(type,handler) { this.listeners[type]=handler; }
    getBoundingClientRect() { return {left:0,top:0,width:640,height:360}; }
    getContext(type) {
      if(this.mode && this.mode!==type) return null;
      this.mode=type;
      return type==='2d' ? { clearRect(){}, drawImage(){} } : gl;
    }
    cloneNode() { return new Element(this.tagName); }
    replaceWith(next) { this.replacement=next; }
    remove() { this.removed=true; }
  }
  return { elements, createElement: tag=>new Element(tag) };
}

test('WebGL fallback replaces the canvas instead of requesting an incompatible context', async () => {
  const gl=fakeGL();
  const document=fakeDocument(gl);
  const api=await loadRuntime({ document, HTMLVideoElement:class{} });
  const surface=api.createOverlaySurface(0,()=>{},api.settings.normalizeSettings({}));
  surface.ensureRenderer(api.settings.normalizeSettings({}));
  await ready(surface.renderer);
  const original=surface.canvas;
  assert.equal(original.mode,'webgl2');
  surface.fallbackTo2d(new Error('upload failed'));
  assert.notEqual(surface.canvas,original);
  assert.equal(original.replacement,surface.canvas);
  assert.equal(surface.canvas.mode,'2d');
  assert.equal(surface.gl,null);
  surface.renderRaw({});
  surface.destroy();
  assert.ok(surface.canvas.removed);
});

test('context loss ends the compile state and leaves the canvas hidden', async () => {
  const gl=fakeGL();
  const document=fakeDocument(gl);
  const api=await loadRuntime({ document, HTMLVideoElement:class{} });
  const surface=api.createOverlaySurface(0,()=>{},api.settings.normalizeSettings({}));
  surface.ensureRenderer(api.settings.normalizeSettings({}));
  surface.canvas.listeners.webglcontextlost();
  assert.equal(surface.renderer.compiling,false);
  assert.match(surface.renderer.error.message,/context lost/);
  assert.equal(surface.canvas.style.display,'none');
  surface.destroy();
});

test('late proxy bitmap from a previous target is closed instead of becoming the current frame', async () => {
  const gl=fakeGL();
  const api=await loadRuntime({ document:fakeDocument(gl), HTMLVideoElement:class{} });
  const surface=api.createOverlaySurface(0,()=>{},api.settings.normalizeSettings({}));
  let resolve;
  let closed=false;
  surface.proxyImageCapture={ grabFrame:()=>new Promise(r=>{resolve=r;}) };
  surface.requestProxyBitmapFrame();
  surface.disposeProxyVideo();
  resolve({ close() { closed=true; } });
  await new Promise(r=>setTimeout(r,0));
  assert.equal(closed,true);
  assert.equal(surface.proxyBitmap,null);
  surface.destroy();
});
