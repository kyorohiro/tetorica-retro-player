import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';

export async function loadRuntime(extra = {}) {
  const url = new URL('../../extension/overlayRuntime.js', import.meta.url);
  let source = await fs.readFile(url, 'utf8');
  const imports = {};
  for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*"([^"]+)";/g)) {
    const module = await import(new URL(match[2], url));
    for (const name of match[1].split(',').map(s=>s.trim()).filter(Boolean)) imports[name] = module[name];
  }
  source = source.replace(/import\s*\{[^}]+\}\s*from\s*"[^"]+";/g, '').replace(/export /g, '');
  const context = vm.createContext({
    ...imports, performance, setTimeout, clearTimeout, AbortController, DOMException, Uint8Array, Float32Array,
    console: { ...console, debug() {} },
    window: { setTimeout, clearTimeout, devicePixelRatio: 1 },
    navigator: { userAgent: 'Windows Chrome/140' },
    chrome: { runtime: { sendMessage: async () => ({ ok:true, acquired:true, refreshed:true }) } },
    ...extra,
  });
  vm.runInContext(source + '\nglobalThis.testAPI = {setupRenderer, createOverlaySurface, getWindowsLiteShaderSources, getOverlayRendererVariantSignature, applySettings, applyFlipUniforms, drawOverlayIntermediate, getSamplingModeValue, getBeamStripeModeValue, getOverlayDiagnostics};', context);
  return { ...context.testAPI, settings: imports };
}

export function fakeGL() {
  let activeProgram;
  let id = 0;
  let activeUnit = 0;
  let boundFbo = null;
  const units = new Map();
  const calls = [];
  const gl = {
    calls, drawingBufferWidth:640, drawingBufferHeight:360,
    VERTEX_SHADER:1, FRAGMENT_SHADER:2, LINK_STATUS:3, TEXTURE0:0, TEXTURE1:1, TEXTURE2:2,
    getExtension(name) { return name.includes('parallel') ? { COMPLETION_STATUS_KHR:4 } : null; },
    isContextLost() { return false; },
    createShader(type) { return { type }; },
    createProgram() { return { id:++id, shaders:[], uniforms:new Map() }; },
    shaderSource(shader, source) { shader.source = source; },
    attachShader(program, shader) { program.shaders.push(shader); },
    compileShader() {}, bindAttribLocation() {},
    linkProgram(program) { calls.push(['link', program.id]); program.linked = true; },
    getShaderParameter() { assert.fail('Synchronous compile status query'); },
    getProgramParameter(program, key) { if(key===4) program.complete=true; else assert.ok(program.complete); return true; },
    getProgramInfoLog() { return ''; },
    getUniformLocation(program, name) {
      assert.ok(program.complete, 'uniform lookup before completion');
      return program.shaders.some(s=>new RegExp('uniform \\w+ '+name+';').test(s.source)) ? { program, name } : null;
    },
    useProgram(program) { assert.ok(program.complete, 'use before completion'); activeProgram=program; },
    createBuffer() { return {}; }, createVertexArray() { return {}; }, createTexture() { return { id:++id }; }, createFramebuffer() { return {}; },
    activeTexture(unit) { activeUnit=unit; },
    bindTexture(_, texture) { units.set(activeUnit, texture); },
    bindFramebuffer(_, fbo) { boundFbo=fbo; },
    framebufferTexture2D(_a,_b,_c,texture) { boundFbo.texture=texture; },
    drawArrays() {
      for (const shader of activeProgram.shaders) {
        for (const [,name] of shader.source.matchAll(/uniform sampler2D (\w+);/g)) {
          const unit = activeProgram.uniforms.get(name)?.[0] ?? 0;
          assert.ok(!boundFbo || boundFbo.texture !== units.get(unit), 'texture feedback loop');
        }
      }
      calls.push(['draw',activeProgram.id]);
    },
  };
  for (const fn of ['uniform1i','uniform1f','uniform2f','uniform3f']) {
    gl[fn] = (location,...values) => {
      if(location===null) return;
      assert.ok(location, `undefined uniform in ${fn}`);
      assert.equal(location.program, activeProgram, 'uniform belongs to a different active program');
      assert.ok(values.every(Number.isFinite), `nonfinite uniform ${location.name}`);
      activeProgram.uniforms.set(location.name,values);
    };
  }
  for(const fn of ['bindBuffer','bufferData','bindVertexArray','enableVertexAttribArray','vertexAttribPointer','pixelStorei','texParameteri','texImage2D','deleteBuffer','deleteVertexArray','deleteShader','deleteProgram','deleteTexture','deleteFramebuffer','viewport','clear','clearColor']) gl[fn]=()=>{};
  return gl;
}
