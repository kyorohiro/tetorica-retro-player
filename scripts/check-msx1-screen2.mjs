// Run with: node scripts/check-msx1-screen2.mjs [path-to-playwright-module]
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const shader = fs.readFileSync('src/retro-player/retro/filterPass1Msx1Screen2Shader.ts', 'utf8').split('`')[1];
    const result = await page.evaluate(shader => {
      const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 192;
      const gl = canvas.getContext('webgl2'); if (!gl) throw Error('WebGL2 unavailable');
      function compile(type, source) {
        const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(s)); return s;
      }
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, `#version 300 es
      out vec2 vTextureCoord;
      void main() { vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); vTextureCoord = p; gl_Position = vec4(p * 2.0 - 1.0, 0, 1); }`));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, shader)); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
      gl.useProgram(program); gl.bindVertexArray(gl.createVertexArray());
      const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.uniform2f(gl.getUniformLocation(program, 'uTargetSize'), 256, 192);
      const palette = [[0,0,0],[0,0,0],[33,200,66],[94,220,120],[84,85,237],[125,118,252],[212,82,77],[66,235,245],[252,85,84],[255,121,120],[212,193,84],[230,206,128],[33,176,59],[201,91,186],[204,204,204],[255,255,255]];
      const allowed = new Set(palette.map(c => c.join(',')));
      const extendedPalette = [[32,32,32], ...palette.slice(1),
        [64,64,64],[96,96,96],[144,144,144],[176,176,176],
        [24,32,80],[40,64,144],[24,80,40],[32,112,104],
        [80,32,48],[112,48,104],[96,56,32],[144,88,48],
        [192,128,80],[232,168,120],[255,208,168],[240,144,48]];
      const extendedAllowed = new Set(extendedPalette.map(c => c.join(',')));
      if (extendedAllowed.size !== 32) throw Error('Extended palette must have 32 distinct colors');
      function draw(data, diffusion, sampling = 0, extended = false) {
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,256,192,0,gl.RGBA,gl.UNSIGNED_BYTE,data);
        gl.uniform1f(gl.getUniformLocation(program,'uDitherStrength'),diffusion);
        gl.uniform1f(gl.getUniformLocation(program,'uSamplingMode'),sampling);
        gl.uniform1f(gl.getUniformLocation(program,'uPaletteMode'),extended ? 12 : 11);
        const start = performance.now(); gl.drawArrays(gl.TRIANGLES,0,3);
        const out = new Uint8Array(data.length); gl.readPixels(0,0,256,192,gl.RGBA,gl.UNSIGNED_BYTE,out);
        if (gl.getError()) throw Error('GL error');
        for (let y=0;y<192;y++) for (let x=0;x<256;x+=8) {
          const colors = new Set();
          for(let k=0;k<8;k++) { const o=4*(y*256+x+k); const c=Array.from(out.slice(o,o+3)).join(','); if(!(extended ? extendedAllowed : allowed).has(c)) throw Error('nonpalette '+c); colors.add(c); }
          if(colors.size>2) throw Error('8x1 color clash');
        }
        return {out, ms:performance.now()-start};
      }
      const exact = new Uint8Array(256*192*4);
      for(let y=0;y<192;y++) for(let x=0;x<256;x++) {
        const c=palette[y%2 ? (x%2?3:4) : (x%2?7:8)]; exact.set([...c,255],4*(y*256+x));
      }
      for(const diffusion of [0,1]) {
        const {out} = draw(exact,diffusion);
        if(out.some((v,i)=>v!==exact[i])) throw Error('Two-color pattern not preserved');
      }
      // A flat intermediate gray must form horizontal bands, not columns.
      const flat = new Uint8Array(exact.length);
      for (let i=0; i<flat.length; i+=4) flat.set([230,230,230,255], i);
      const {out: bands} = draw(flat, 1);
      let rowChanges = 0;
      for (let y=0; y<192; y++) {
        const first = Array.from(bands.slice(y*256*4, y*256*4+3)).join(',');
        for (let x=1; x<256; x++) {
          const o=4*(y*256+x);
          if (Array.from(bands.slice(o,o+3)).join(',') !== first) throw Error('Flat tone produced vertical columns');
        }
        if (y && bands[y*256*4] !== bands[(y-1)*256*4]) rowChanges++;
      }
      if (rowChanges < 96) throw Error('Expected horizontal diffusion bands');
      const gradient=new Uint8Array(exact.length);
      for(let y=0;y<192;y++) for(let x=0;x<256;x++) gradient.set([x,(x*3+y)%256,(y*5+x)%256,255],4*(y*256+x));
      const nearest=draw(gradient,0); const diffused=draw(gradient,1); draw(gradient,1,2);
      draw(gradient,1,0,true);
      const extendedExact = new Uint8Array(exact.length);
      for(let y=0;y<192;y++) for(let x=0;x<256;x++) {
        extendedExact.set([...extendedPalette[Math.floor(x/8)],255],4*(y*256+x));
      }
      const {out: extendedOutput} = draw(extendedExact,1,0,true);
      if(extendedOutput.some((v,i)=>v!==extendedExact[i])) throw Error('Extended palette colors not preserved');
      const changed=nearest.out.reduce((n,v,i)=>n+(v!==diffused.out[i]),0);
      if(!changed) throw Error('Diffusion has no effect');
      return {extended32ColorsPreserved:true,horizontalBandRowChanges:rowChanges,twoColorPatternsPreserved:true,allBlocksAtMostTwoPaletteColors:true,diffusionChangedBytes:changed,nearestMs:nearest.ms,diffusionMs:diffused.ms};
    }, shader);
    console.log(JSON.stringify(result));
  } finally { await browser.close(); }
})();
