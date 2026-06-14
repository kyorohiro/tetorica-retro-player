const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-DB7cLLrh.js","./index-Dt6lJzGC.js","./index-BJSsp9-D.css","./RetroFilterPanel-C_yDhY0p.js"])))=>i.map(i=>d[i]);
import{b as At,r as o,R as mo,a as T,u as Mo,j as b,_ as So}from"./index-Dt6lJzGC.js";const To=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Do=At("aperture",To);const Bo=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Po=At("arrow-left-right",Bo);const Io=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Eo=At("circle",Io);const ko=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Lo=At("maximize-2",ko);const Fo=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],po=At("minimize-2",Fo);const Wo=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],No=At("pin",Wo);const Uo=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],Ho=At("power",Uo);const Go=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Vo=At("rotate-ccw",Go);const _o=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],zo=At("square",_o);async function yo(e,a={},d){return window.__TAURI_INTERNALS__.invoke(e,a,d)}async function Oo(e,a){await yo("plugin:sharekit|share_file",{url:e,...a})}const co="tetorica-retro-player.settings",Jt=1,qt=()=>{if(typeof window>"u")return null;try{const e=window.localStorage.getItem(co);if(!e)return null;const a=JSON.parse(e);return a.version!==Jt?null:a}catch{return null}},uo=e=>{if(!(typeof window>"u"))try{window.localStorage.setItem(co,JSON.stringify(e))}catch{}},ho=()=>qt(),Zo=e=>{const a=qt();uo({version:Jt,audio:a?.audio,filter:e,ui:a?.ui})},jo=e=>{const a=qt();uo({version:Jt,audio:e,filter:a?.filter,ui:a?.ui})},Xo=e=>{const a=qt();uo({version:Jt,audio:a?.audio,filter:a?.filter,ui:e})},Yo=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(co)}catch{}},He={isMuted:!1,volume:1,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.8,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!1,noiseLevel:.02,vinylDustAmount:0},Ko=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function Jo({instanceLabel:e,previewKind:a,previewKindRef:d,mediaRef:h,isPlaying:l,isPlayingRef:y}){const[c]=o.useState(()=>{const r=ho()?.audio;return{isMuted:r?.isMuted??He.isMuted,volume:r?.volume??He.volume,playbackRate:r?.playbackRate??He.playbackRate,isLooping:r?.isLooping??He.isLooping,isAudioFxEnabled:r?.isAudioFxEnabled??He.isAudioFxEnabled,lofiAmount:r?.lofiAmount??He.lofiAmount,radioToneAmount:r?.radioToneAmount??He.radioToneAmount,bitCrushAmount:r?.bitCrushAmount??He.bitCrushAmount,sampleRateReductionAmount:r?.sampleRateReductionAmount??He.sampleRateReductionAmount,bassAmount:r?.bassAmount??He.bassAmount,midAmount:r?.midAmount??He.midAmount,trebleAmount:r?.trebleAmount??He.trebleAmount,stereoWidthAmount:r?.stereoWidthAmount??He.stereoWidthAmount,smallSpeakerRoomAmount:r?.smallSpeakerRoomAmount??He.smallSpeakerRoomAmount,wowFlutterAmount:r?.wowFlutterAmount??He.wowFlutterAmount,isNoiseEnabled:r?.isNoiseEnabled??He.isNoiseEnabled,noiseLevel:r?.noiseLevel??He.noiseLevel,vinylDustAmount:r?.vinylDustAmount??He.vinylDustAmount}}),u=o.useRef(null),w=o.useRef(null),B=o.useRef(null),$=o.useRef(null),C=o.useRef(null),oe=o.useRef(null),F=o.useRef(null),X=o.useRef(null),O=o.useRef(null),we=o.useRef(null),se=o.useRef(null),Ce=o.useRef(null),le=o.useRef(null),ce=o.useRef(null),ye=o.useRef(null),Re=o.useRef(null),Ae=o.useRef(null),Ee=o.useRef(null),Ge=o.useRef(null),Oe=o.useRef(null),Ve=o.useRef(null),re=o.useRef(null),ge=o.useRef(null),W=o.useRef(null),Y=o.useRef(null),G=o.useRef(null),ue=o.useRef(null),Me=o.useRef(null),Ze=o.useRef(null),s=o.useRef(null),i=o.useRef(null),t=o.useRef(null),ke=o.useRef(null),Le=o.useRef(null),Te=o.useRef(c.isMuted),_e=o.useRef(c.volume),je=o.useRef(c.playbackRate),v=o.useRef(c.isLooping),D=o.useRef(c.isAudioFxEnabled),m=o.useRef(c.lofiAmount),z=o.useRef(c.radioToneAmount),K=o.useRef(c.bitCrushAmount),Q=o.useRef(c.sampleRateReductionAmount),V=o.useRef(c.bassAmount),I=o.useRef(c.midAmount),Se=o.useRef(c.trebleAmount),k=o.useRef(c.stereoWidthAmount),M=o.useRef(c.smallSpeakerRoomAmount),L=o.useRef(c.wowFlutterAmount),Fe=o.useRef(c.isNoiseEnabled),De=o.useRef(c.noiseLevel),J=o.useRef(c.vinylDustAmount),[ee,We]=o.useState(c.isMuted),[Je,qe]=o.useState(c.playbackRate),[p,A]=o.useState(c.volume),[N,Ne]=o.useState(c.isLooping),[ve,ne]=o.useState(c.isAudioFxEnabled),[q,Xe]=o.useState(c.lofiAmount),[Be,ut]=o.useState(c.radioToneAmount),[Ue,tt]=o.useState(c.bitCrushAmount),[it,Dt]=o.useState(c.sampleRateReductionAmount),[ot,kt]=o.useState(c.bassAmount),[dt,n]=o.useState(c.midAmount),[x,P]=o.useState(c.trebleAmount),[Z,R]=o.useState(c.stereoWidthAmount),[g,Pe]=o.useState(c.smallSpeakerRoomAmount),[U,Ft]=o.useState(c.wowFlutterAmount),[Bt,_t]=o.useState(c.isNoiseEnabled),[Pt,Wt]=o.useState(c.noiseLevel),[It,Nt]=o.useState(c.vinylDustAmount),Et=(r,_)=>{Ko()&&console.log(`[retro-player audio][${e}] ${r}`,_??{})},zt=r=>{const de=new Float32Array(256),E=1+r*5;for(let te=0;te<256;te+=1){const be=te*2/255-1;de[te]=Math.tanh(be*E)}return de},Qt=r=>{const de=Math.max(1,Math.floor(r.sampleRate*.22)),E=r.createBuffer(2,de,r.sampleRate);for(let te=0;te<E.numberOfChannels;te+=1){const be=E.getChannelData(te);for(let he=0;he<be.length;he+=1){const ie=he/be.length,me=(1-ie)**1.85,xe=.78+.22*Math.sin(ie*42+te*.9),pe=Math.sin(ie*130+te*.35)*.08;be[he]=(Math.random()*2-1+pe)*me*xe*.28}}return E},Ot=r=>{const _=r.sampleRate*2,de=r.createBuffer(2,_,r.sampleRate);let E=0,te=0;for(let be=0;be<_;be+=1){const he=Math.random()*2-1;E=(E+he*.045)/1.045,te=te*.82+he*.18;const ie=E*1.35,me=(he-te)*.55,xe=Math.max(-1,Math.min(1,ie+me));for(let pe=0;pe<de.numberOfChannels;pe+=1){const ae=de.getChannelData(pe),ze=(Math.random()*2-1)*.012;ae[be]=Math.max(-1,Math.min(1,xe+ze))}}return de},eo=r=>{const _=r.sampleRate*2,de=new Float32Array(_);let E=0,te=0;for(;E<_;){const he=Math.random()*2-1;te=te*.72+he*.28,de[E]+=(he-te)*.018;const ie=Math.random();if(ie<.0034){const me=8+Math.floor(Math.random()*42),xe=.11+Math.random()*.28,pe=Math.random()<.5?-1:1;for(let ae=0;ae<me&&E+ae<_;ae+=1){const ze=Math.exp(-ae/(2.4+Math.random()*5));de[E+ae]+=pe*xe*ze*(.7+Math.random()*.3)}E+=me+Math.floor(Math.random()*640);continue}if(ie<.0038){const me=90+Math.floor(Math.random()*260),xe=.055+Math.random()*.11,pe=Math.random()*Math.PI*2;for(let ae=0;ae<me&&E+ae<_;ae+=1){const ze=Math.exp(-ae/(18+Math.random()*40)),$e=Math.sin(pe+ae*(.22+Math.random()*.06));de[E+ae]+=xe*ze*$e}E+=me+Math.floor(Math.random()*2200);continue}E+=1}const be=r.createBuffer(2,_,r.sampleRate);for(let he=0;he<be.numberOfChannels;he+=1){const ie=be.getChannelData(he);for(let me=0;me<_;me+=1){const xe=(Math.random()*2-1)*.0035;ie[me]=Math.max(-1,Math.min(1,de[me]+xe))}}return be},St=()=>{const r=B.current,_=$.current,de=C.current,E=oe.current,te=F.current,be=X.current,he=O.current,ie=we.current,me=se.current,xe=Ce.current,pe=le.current,ae=ce.current,ze=ye.current,$e=Ae.current,bt=Ee.current,ht=Ge.current,yt=Oe.current,Ye=Ve.current,mt=re.current,Rt=G.current,xt=ke.current,wt=i.current,pt=t.current,Qe=h.current,st=d.current,et=st==="video"||st==="audio"||st==="capture",gt=Qe?!Qe.paused:y.current,rt=Te.current,ft=_e.current,Ie=D.current,lt=m.current,vt=z.current,Ke=K.current,Ct=Q.current,Mt=V.current,Ut=I.current,Ht=Se.current,ro=k.current,Lt=M.current,no=L.current,Gt=Fe.current,Yt=De.current,Kt=J.current,ao=rt||!et?0:ft;if(r&&(r.gain.value=ao),Qe&&(Qe.muted=rt,Qe.volume=rt?0:ft),_&&de&&E){const H=Ie?vt:0;_.frequency.value=20+H*430,_.Q.value=.4+H*.35,de.frequency.value=2e4-H*17400,de.Q.value=.2+H*.9,E.frequency.value=1700,E.Q.value=.8+H*1.4,E.gain.value=H*6}if(te&&be&&he){const H=Ie?lt:0;te.frequency.value=16e3-H*14200,te.Q.value=.3+H*1.8,be.gain.value=-H*18,he.curve=zt(H*.6)}if(ie){const H=Ie,Tt=16-(H?Ke:0)*12,f=1+(H?Ct:0)*23,S=H?Math.max(Ke,Ct):0;ie.parameters.get("bitDepth")?.setValueAtTime(Tt,ie.context.currentTime),ie.parameters.get("holdFrames")?.setValueAtTime(f,ie.context.currentTime),ie.parameters.get("mix")?.setValueAtTime(S,ie.context.currentTime)}if(me&&xe&&pe){const H=Ie?15:0;me.gain.value=Mt*H,xe.gain.value=Ut*H,pe.gain.value=Ht*H}if(ae){const H=Ie?1+ro:1;ae.parameters.get("width")?.setValueAtTime(H,ae.context.currentTime)}if(ze&&$e){const H=Ie?Lt:0;ze.gain.value=Math.max(.52,1-H*.42),$e.gain.value=H*.95}if(bt&&ht&&yt&&Ye&&mt){const H=Ie?no:0;bt.delayTime.value=.006+H*.004,ht.frequency.value=.18+H*.42,yt.gain.value=H*.0035,Ye.frequency.value=5.2+H*6.5,mt.gain.value=H*9e-4}if(Rt&&(Rt.gain.value=Gt&&!rt&&et&&gt?Math.min(.24,Yt*5.5):0),xt){const H=Gt&&!rt&&et&&gt;xt.gain.value=H?Math.min(.24,Kt*.22+Yt*.25):0}if(wt&&pt){const Tt=Gt&&!rt&&et&&gt?Kt:0;wt.frequency.value=2100+Tt*2600,wt.Q.value=.35+Tt*.25,pt.gain.value=Tt*.11}},Zt=async()=>{if(typeof window>"u")return null;if(u.current?.state==="closed"&&(u.current=null,w.current=null,B.current=null,$.current=null,C.current=null,oe.current=null,F.current=null,X.current=null,O.current=null,we.current=null,se.current=null,Ce.current=null,le.current=null,ce.current=null,ye.current=null,Re.current=null,Ae.current=null,Ee.current=null,Ge.current=null,Oe.current=null,Ve.current=null,re.current=null,ge.current=null,W.current=null,Y.current=null,G.current=null,ue.current=null,Me.current=null,Ze.current=null,s.current=null,i.current=null,t.current=null,ke.current=null),!u.current){const r=new window.AudioContext,_=r.createGain(),de=r.createMediaStreamDestination(),E=r.createBiquadFilter(),te=r.createBiquadFilter(),be=r.createBiquadFilter(),he=r.createBiquadFilter(),ie=r.createBiquadFilter(),me=r.createWaveShaper();let xe=null,pe=null;if("audioWorklet"in r){const Ut=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await r.audioWorklet.addModule(Ut.href),xe=new AudioWorkletNode(r,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const Ht=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await r.audioWorklet.addModule(Ht.href),pe=new AudioWorkletNode(r,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const ae=r.createBiquadFilter(),ze=r.createBiquadFilter(),$e=r.createBiquadFilter(),bt=r.createGain(),ht=r.createConvolver(),yt=r.createGain(),Ye=r.createDelay(.05),mt=r.createOscillator(),Rt=r.createGain(),xt=r.createOscillator(),wt=r.createGain();E.type="highpass",te.type="lowpass",be.type="peaking",he.type="lowpass",ie.type="highshelf",ae.type="lowshelf",ae.frequency.value=180,ze.type="peaking",ze.frequency.value=1200,ze.Q.value=.9,$e.type="highshelf",$e.frequency.value=3200,ht.buffer=Qt(r),ie.frequency.value=2800,me.oversample="4x",Ye.delayTime.value=.006,mt.type="sine",xt.type="sine",mt.connect(Rt),Rt.connect(Ye.delayTime),xt.connect(wt),wt.connect(Ye.delayTime),Ye.connect(E),E.connect(te),te.connect(be),be.connect(he),he.connect(ie),ie.connect(me),xe?(me.connect(xe),xe.connect(ae)):me.connect(ae),ae.connect(ze),ze.connect($e),pe?($e.connect(pe),pe.connect(bt),pe.connect(ht)):($e.connect(bt),$e.connect(ht)),ht.connect(yt),bt.connect(_),yt.connect(_),_.connect(r.destination),_.connect(de);const pt=r.createBufferSource();pt.buffer=Ot(r),pt.loop=!0;const Qe=r.createBiquadFilter();Qe.type="highpass",Qe.frequency.value=1100,Qe.Q.value=.25;const st=r.createBiquadFilter();st.type="lowpass",st.frequency.value=5600,st.Q.value=.18;const et=r.createBiquadFilter();et.type="peaking",et.frequency.value=2400,et.Q.value=.7,et.gain.value=-2.5;const gt=r.createStereoPanner(),rt=r.createGain(),ft=r.createOscillator(),Ie=r.createGain(),lt=r.createBufferSource(),vt=r.createBiquadFilter(),Ke=r.createBiquadFilter(),Ct=r.createGain(),Mt=r.createGain();_.gain.value=0,rt.gain.value=0,ft.type="sine",ft.frequency.value=.021,Ie.gain.value=.08,lt.buffer=eo(r),lt.loop=!0,vt.type="highpass",vt.frequency.value=1250,vt.Q.value=.35,Ke.type="bandpass",Ke.frequency.value=2400,Ke.Q.value=.4,Ct.gain.value=0,Mt.gain.value=0,pt.connect(Qe),Qe.connect(st),st.connect(et),et.connect(gt),gt.connect(rt),rt.connect(_),ft.connect(Ie),Ie.connect(gt.pan),lt.connect(vt),vt.connect(Mt),Mt.connect(_),lt.connect(Ke),Ke.connect(Ct),Ct.connect(_),pt.start(),ft.start(),lt.start(),mt.start(),xt.start(),u.current=r,B.current=_,$.current=E,C.current=te,oe.current=be,F.current=he,X.current=ie,O.current=me,we.current=xe,se.current=ae,Ce.current=ze,le.current=$e,ce.current=pe,ye.current=bt,Re.current=ht,Ae.current=yt,Ee.current=Ye,Ge.current=mt,Oe.current=Rt,Ve.current=xt,re.current=wt,ge.current=pt,W.current=et,Y.current=gt,G.current=rt,ue.current=ft,Me.current=Ie,Ze.current=lt,s.current=vt,i.current=Ke,t.current=Ct,ke.current=Mt,Le.current=de}if(u.current.state==="suspended")try{await u.current.resume()}catch{}return u.current},jt=async()=>{w.current?.disconnect(),w.current=null;try{ge.current?.stop()}catch{}try{ue.current?.stop()}catch{}try{Ze.current?.stop()}catch{}try{Ge.current?.stop()}catch{}try{Ve.current?.stop()}catch{}const r=u.current;if(u.current=null,B.current=null,Le.current=null,$.current=null,C.current=null,oe.current=null,F.current=null,X.current=null,O.current=null,we.current=null,se.current=null,Ce.current=null,le.current=null,ce.current=null,ye.current=null,Re.current=null,Ae.current=null,Ee.current=null,Ge.current=null,Oe.current=null,Ve.current=null,re.current=null,ge.current=null,W.current=null,Y.current=null,G.current=null,ue.current=null,Me.current=null,Ze.current=null,s.current=null,i.current=null,t.current=null,ke.current=null,!(!r||r.state==="closed"))try{await r.close()}catch{}},to=async r=>{const _=await Zt(),de=d.current;if(!_){Et("connectMediaAudio:no-context",{mediaTag:r.tagName});return}w.current&&(Et("connectMediaAudio:disconnect-previous",{mediaTag:r.tagName}),w.current.disconnect(),w.current=null);try{const E=_.createMediaElementSource(r);E.connect(Ee.current??F.current),w.current=E,r.muted=Te.current,r.volume=Te.current?0:_e.current,Et("connectMediaAudio:connected",{audioContextState:_.state,lofiAmount:q,radioToneAmount:Be,bitCrushAmount:Ue,sampleRateReductionAmount:it,bassAmount:ot,midAmount:dt,trebleAmount:x,stereoWidthAmount:Z,smallSpeakerRoomAmount:g,wowFlutterAmount:U,isAudioFxEnabled:ve,isMuted:ee,volume:p,mediaTag:r.tagName,previewKind:de}),St()}catch(E){throw Et("connectMediaAudio:error",{audioContextState:_.state,mediaTag:r.tagName,message:E instanceof Error?E.message:String(E),previewKind:de}),E}},Xt=()=>{const r=w.current;r&&(r.disconnect(),r.connect(Ee.current??F.current),St())},oo=()=>{const r={...He};Te.current=r.isMuted,_e.current=r.volume,je.current=r.playbackRate,v.current=r.isLooping,D.current=r.isAudioFxEnabled,m.current=r.lofiAmount,z.current=r.radioToneAmount,K.current=r.bitCrushAmount,Q.current=r.sampleRateReductionAmount,V.current=r.bassAmount,I.current=r.midAmount,Se.current=r.trebleAmount,k.current=r.stereoWidthAmount,M.current=r.smallSpeakerRoomAmount,L.current=r.wowFlutterAmount,Fe.current=r.isNoiseEnabled,De.current=r.noiseLevel,J.current=r.vinylDustAmount,We(r.isMuted),A(r.volume),qe(r.playbackRate),Ne(r.isLooping),ne(r.isAudioFxEnabled),Xe(r.lofiAmount),ut(r.radioToneAmount),tt(r.bitCrushAmount),Dt(r.sampleRateReductionAmount),kt(r.bassAmount),n(r.midAmount),P(r.trebleAmount),R(r.stereoWidthAmount),Pe(r.smallSpeakerRoomAmount),Ft(r.wowFlutterAmount),_t(r.isNoiseEnabled),Wt(r.noiseLevel),Nt(r.vinylDustAmount),h.current&&(h.current.muted=r.isMuted,h.current.volume=r.volume,h.current.playbackRate=r.playbackRate,h.current.loop=r.isLooping),window.requestAnimationFrame(St)};return o.useEffect(()=>{Te.current=ee,_e.current=p,je.current=Je,v.current=N,D.current=ve,m.current=q,z.current=Be,K.current=Ue,Q.current=it,V.current=ot,I.current=dt,Se.current=x,k.current=Z,M.current=g,L.current=U,Fe.current=Bt,De.current=Pt,J.current=It,St()},[ee,p,ve,q,Be,Ue,it,ot,dt,x,Z,g,U,Bt,Pt,It,l,Je,N,a]),o.useEffect(()=>{jo({isMuted:ee,volume:p,playbackRate:Je,isLooping:N,isAudioFxEnabled:ve,lofiAmount:q,radioToneAmount:Be,bitCrushAmount:Ue,sampleRateReductionAmount:it,bassAmount:ot,midAmount:dt,trebleAmount:x,stereoWidthAmount:Z,smallSpeakerRoomAmount:g,wowFlutterAmount:U,isNoiseEnabled:Bt,noiseLevel:Pt,vinylDustAmount:It})},[ee,p,Je,N,ve,q,Be,Ue,it,ot,dt,x,Z,g,U,Bt,Pt,It]),{audioContextRef:u,mediaSourceRef:w,masterGainRef:B,radioToneHighpassRef:$,radioToneLowpassRef:C,radioTonePresenceRef:oe,recordingDestinationRef:Le,lofiLowpassRef:F,lofiHighshelfRef:X,lofiDriveRef:O,bitcrusherRef:we,bassEqRef:se,midEqRef:Ce,trebleEqRef:le,stereoWidthRef:ce,roomDryGainRef:ye,roomConvolverRef:Re,roomWetGainRef:Ae,wowFlutterDelayRef:Ee,wowLfoRef:Ge,wowLfoGainRef:Oe,flutterLfoRef:Ve,flutterLfoGainRef:re,noiseSourceRef:ge,noiseFilterRef:W,noisePannerRef:Y,noiseGainRef:G,noiseLfoRef:ue,noiseLfoGainRef:Me,crackleSourceRef:Ze,crackleFilterRef:s,vinylDustBedFilterRef:i,vinylDustBedGainRef:t,crackleGainRef:ke,isMutedRef:Te,volumeRef:_e,playbackRateRef:je,isLoopingRef:v,isAudioFxEnabledRef:D,lofiAmountRef:m,radioToneAmountRef:z,bitCrushAmountRef:K,sampleRateReductionAmountRef:Q,bassAmountRef:V,midAmountRef:I,trebleAmountRef:Se,stereoWidthAmountRef:k,smallSpeakerRoomAmountRef:M,wowFlutterAmountRef:L,isNoiseEnabledRef:Fe,noiseLevelRef:De,vinylDustAmountRef:J,isMuted:ee,setIsMuted:We,playbackRate:Je,setPlaybackRate:qe,volume:p,setVolume:A,isLooping:N,setIsLooping:Ne,isAudioFxEnabled:ve,setIsAudioFxEnabled:ne,lofiAmount:q,setLofiAmount:Xe,radioToneAmount:Be,setRadioToneAmount:ut,bitCrushAmount:Ue,setBitCrushAmount:tt,sampleRateReductionAmount:it,setSampleRateReductionAmount:Dt,bassAmount:ot,setBassAmount:kt,midAmount:dt,setMidAmount:n,trebleAmount:x,setTrebleAmount:P,stereoWidthAmount:Z,setStereoWidthAmount:R,smallSpeakerRoomAmount:g,setSmallSpeakerRoomAmount:Pe,wowFlutterAmount:U,setWowFlutterAmount:Ft,isNoiseEnabled:Bt,setIsNoiseEnabled:_t,noiseLevel:Pt,setNoiseLevel:Wt,vinylDustAmount:It,setVinylDustAmount:Nt,debugAudio:Et,ensureAudioContext:Zt,updateAudioNodes:St,connectMediaAudio:to,reconnectCurrentMediaAudio:Xt,resetAudioSettings:oo,disposeAudioEngine:jt}}const qo={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},Vt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},$o=e=>e==="pc98"?1:e==="pc98_tile"?2:e==="pc98_512"?3:e==="pc98_512_sat"?4:e==="pc98_4096"?5:e==="color32"?6:e==="color64"?7:e==="mono"?8:e==="neon"?9:0,Qo=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
in vec2 vMaskCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uTargetSize;
uniform vec2 uSampleTargetSize;
uniform float uColorLevels;
uniform float uDitherStrength;
uniform float uPaletteMode;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanline2Strength;
uniform float uScanlineBrightnessFade;
uniform float uVignetteStrength;
uniform float uGlowStrength;
uniform float uPhosphorStrength;
uniform float uSpotMaskStrength;
uniform float uBulbRadius;
uniform float uBlackFloor;
uniform float uPhosphorDotLightBalance;
uniform float uPixelAspect;
uniform float uPhosphorDotMode;
uniform float uPhosphorDotInternalScale;
uniform float uPhosphorDotBrightCore;
uniform float uPhosphorDotCellFill;
uniform float uPhosphorDotFlatDisc;
uniform float uPhosphorDotNeighborBlend;
uniform float uCloseUpNoiseStrength;
uniform vec3 uMonoTint;
uniform float uNeonBoost;
uniform float uNeonSaturation;
uniform float uNeonDetail;
uniform float uTime;

vec3 shapePc98_512SatColor(vec3 color);
vec3 quantizePc98_512Sat(vec3 color);

float bayer4x4(vec2 pos)
{
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = x + y * 4;

  float matrix[16];
  matrix[0] = 0.0 / 16.0;
  matrix[1] = 8.0 / 16.0;
  matrix[2] = 2.0 / 16.0;
  matrix[3] = 10.0 / 16.0;
  matrix[4] = 12.0 / 16.0;
  matrix[5] = 4.0 / 16.0;
  matrix[6] = 14.0 / 16.0;
  matrix[7] = 6.0 / 16.0;
  matrix[8] = 3.0 / 16.0;
  matrix[9] = 11.0 / 16.0;
  matrix[10] = 1.0 / 16.0;
  matrix[11] = 9.0 / 16.0;
  matrix[12] = 15.0 / 16.0;
  matrix[13] = 7.0 / 16.0;
  matrix[14] = 13.0 / 16.0;
  matrix[15] = 5.0 / 16.0;

  return matrix[index];
}

vec3 pc98Palette(float index)
{
  if (index < 0.5) return vec3(0.0, 0.0, 0.0);
  if (index < 1.5) return vec3(0.0, 0.0, 0.6667);
  if (index < 2.5) return vec3(0.0, 0.6667, 0.0);
  if (index < 3.5) return vec3(0.0, 0.6667, 0.6667);
  if (index < 4.5) return vec3(0.6667, 0.0, 0.0);
  if (index < 5.5) return vec3(0.6667, 0.0, 0.6667);
  if (index < 6.5) return vec3(0.6667, 0.3333, 0.0);
  if (index < 7.5) return vec3(0.6667, 0.6667, 0.6667);
  if (index < 8.5) return vec3(0.3333, 0.3333, 0.3333);
  if (index < 9.5) return vec3(0.3333, 0.3333, 1.0);
  if (index < 10.5) return vec3(0.3333, 1.0, 0.3333);
  if (index < 11.5) return vec3(0.3333, 1.0, 1.0);
  if (index < 12.5) return vec3(1.0, 0.3333, 0.3333);
  if (index < 13.5) return vec3(1.0, 0.3333, 1.0);
  if (index < 14.5) return vec3(1.0, 1.0, 0.3333);
  return vec3(1.0, 1.0, 1.0);
}

vec3 nearestPc98(vec3 color)
{
  vec3 best = pc98Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 16; i++) {
    vec3 candidate = pc98Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

float pc98WeightedDistance(vec3 a, vec3 b)
{
  vec3 delta = (a - b) * vec3(0.92, 1.06, 1.0);
  return dot(delta, delta);
}

float pc98TileDistance(vec3 sourceColor, vec3 candidateColor)
{
  vec3 shapedSource = shapePc98_512SatColor(sourceColor);
  vec3 shapedCandidate = shapePc98_512SatColor(candidateColor);
  vec3 delta = (shapedSource - shapedCandidate) * vec3(0.94, 1.02, 0.98);

  float sourceWarm = smoothstep(0.18, 0.62, sourceColor.r - sourceColor.b)
    * smoothstep(0.12, 0.42, sourceColor.g - sourceColor.b);
  float sourceSat = max(max(sourceColor.r, sourceColor.g), sourceColor.b)
    - min(min(sourceColor.r, sourceColor.g), sourceColor.b);
  float pastelBias = (1.0 - smoothstep(0.08, 0.26, sourceSat)) * sourceWarm;
  float warmthMismatch = abs((sourceColor.r - sourceColor.b) - (candidateColor.r - candidateColor.b));

  return dot(delta, delta) + warmthMismatch * pastelBias * 0.18;
}

void insertPc98Candidate(
  vec3 candidate,
  float candidateDistance,
  inout vec3 best0,
  inout vec3 best1,
  inout vec3 best2,
  inout float dist0,
  inout float dist1,
  inout float dist2
)
{
  if (candidateDistance < dist0) {
    best2 = best1;
    dist2 = dist1;
    best1 = best0;
    dist1 = dist0;
    best0 = candidate;
    dist0 = candidateDistance;
    return;
  }

  if (candidateDistance < dist1) {
    best2 = best1;
    dist2 = dist1;
    best1 = candidate;
    dist1 = candidateDistance;
    return;
  }

  if (candidateDistance < dist2) {
    best2 = candidate;
    dist2 = candidateDistance;
  }
}

vec3 checkerMix(vec3 colorA, vec3 colorB, vec2 cell)
{
  return mod(cell.x + cell.y, 2.0) < 1.0 ? colorA : colorB;
}

vec3 quarterMix(vec3 majorColor, vec3 accentColor, vec2 cell)
{
  vec2 local = mod(cell, 4.0);
  bool accent =
    (local.x < 1.0 && local.y < 1.0) ||
    (local.x >= 2.0 && local.x < 3.0 && local.y >= 1.0 && local.y < 2.0) ||
    (local.x >= 1.0 && local.x < 2.0 && local.y >= 2.0 && local.y < 3.0) ||
    (local.x >= 3.0 && local.y >= 3.0);
  return accent ? accentColor : majorColor;
}

void considerPc98TileMix(
  vec3 sourceColor,
  vec2 cell,
  vec3 colorA,
  vec3 colorB,
  inout vec3 bestApproximation,
  inout vec3 bestOutput,
  inout float bestError
)
{
  float pairContrast = distance(colorA, colorB);
  if (pairContrast < 0.08) {
    return;
  }

  vec3 mix50 = mix(colorA, colorB, 0.5);
  float mix50Error = pc98TileDistance(sourceColor, mix50);
  if (mix50Error + 0.006 < bestError) {
    bestError = mix50Error;
    bestApproximation = mix50;
    bestOutput = checkerMix(colorA, colorB, cell);
  }

  vec3 mix25 = mix(colorA, colorB, 0.25);
  float mix25Error = pc98TileDistance(sourceColor, mix25);
  if (mix25Error + 0.004 < bestError) {
    bestError = mix25Error;
    bestApproximation = mix25;
    bestOutput = quarterMix(colorA, colorB, cell);
  }

  vec3 mix75 = mix(colorA, colorB, 0.75);
  float mix75Error = pc98TileDistance(sourceColor, mix75);
  if (mix75Error + 0.004 < bestError) {
    bestError = mix75Error;
    bestApproximation = mix75;
    bestOutput = quarterMix(colorB, colorA, cell);
  }
}

vec3 pc98TilePalette(vec3 color, vec2 cell)
{
  vec3 shapedColor = shapePc98_512SatColor(color);
  vec3 baseCell = shapedColor * 7.0;
  vec3 low = floor(baseCell) / 7.0;
  vec3 high = ceil(baseCell) / 7.0;
  vec3 best0 = quantizePc98_512Sat(color);
  vec3 best1 = best0;
  vec3 best2 = best0;
  float dist0 = pc98TileDistance(color, best0);
  float dist1 = 1e9;
  float dist2 = 1e9;

  for (int i = 0; i < 8; i++) {
    vec3 candidate = vec3(
      (mod(float(i), 2.0) < 1.0) ? low.r : high.r,
      (mod(floor(float(i) / 2.0), 2.0) < 1.0) ? low.g : high.g,
      (mod(floor(float(i) / 4.0), 2.0) < 1.0) ? low.b : high.b
    );
    float candidateDistance = pc98TileDistance(color, candidate);
    insertPc98Candidate(candidate, candidateDistance, best0, best1, best2, dist0, dist1, dist2);
  }

  vec3 bestApproximation = best0;
  vec3 bestOutput = best0;
  float bestError = dist0;

  considerPc98TileMix(color, cell, best0, best1, bestApproximation, bestOutput, bestError);
  considerPc98TileMix(color, cell, best0, best2, bestApproximation, bestOutput, bestError);
  considerPc98TileMix(color, cell, best1, best2, bestApproximation, bestOutput, bestError);

  return bestOutput;
}

vec3 samplePc98TileSource(sampler2D textureSampler, vec2 cell, vec2 targetSize)
{
  vec2 blockSize = vec2(4.0, 4.0);
  vec2 blockOrigin = floor(cell / blockSize) * blockSize;
  vec2 blockCenter = blockOrigin + blockSize * 0.5;
  vec2 blockUv = clamp(blockCenter / targetSize, vec2(0.0), vec2(1.0));

  vec3 center = texture(textureSampler, blockUv).rgb;
  vec3 downRight = texture(
    textureSampler,
    clamp((blockOrigin + vec2(3.0, 3.0) + 0.5) / targetSize, vec2(0.0), vec2(1.0))
  ).rgb;
  vec3 upRight = texture(
    textureSampler,
    clamp((blockOrigin + vec2(3.0, 0.0) + 0.5) / targetSize, vec2(0.0), vec2(1.0))
  ).rgb;
  vec3 downLeft = texture(
    textureSampler,
    clamp((blockOrigin + vec2(0.0, 3.0) + 0.5) / targetSize, vec2(0.0), vec2(1.0))
  ).rgb;

  vec3 averaged = (center * 0.4) + (downRight * 0.2) + (upRight * 0.2) + (downLeft * 0.2);
  return shapePc98_512SatColor(averaged);
}

vec3 quantizePc98_4096(vec3 color)
{
  return floor(color * 15.0 + 0.5) / 15.0;
}

vec3 quantizePc98_512(vec3 color)
{
  return floor(color * 7.0 + 0.5) / 7.0;
}

vec3 color32Palette(float index)
{
  float r = mod(index, 4.0);
  float g = mod(floor(index / 4.0), 4.0);
  float b = mod(floor(index / 16.0), 2.0);

  return vec3(r / 3.0, g / 3.0, b);
}

vec3 nearestColor32(vec3 color)
{
  vec3 best = color32Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 32; i++) {
    vec3 candidate = color32Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 color64Palette(float index)
{
  float r = mod(index, 4.0);
  float g = mod(floor(index / 4.0), 4.0);
  float b = mod(floor(index / 16.0), 4.0);

  return vec3(r / 3.0, g / 3.0, b / 3.0);
}

vec3 nearestColor64(vec3 color)
{
  vec3 best = color64Palette(0.0);
  float bestDistance = distance(color, best);

  for (int i = 1; i < 64; i++) {
    vec3 candidate = color64Palette(float(i));
    float candidateDistance = distance(color, candidate);

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      best = candidate;
    }
  }

  return best;
}

vec3 monochromePalette(vec3 color, float levels, vec3 tint)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);

  return mix(vec3(0.0), tint, stepped);
}

vec3 adjustSaturation(vec3 color, float saturation)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(vec3(luminance), color, saturation);
}

vec3 shapePc98_512SatColor(vec3 color)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float maxChannel = max(max(color.r, color.g), color.b);
  float minChannel = min(min(color.r, color.g), color.b);
  float saturation = maxChannel - minChannel;
  float satBias = smoothstep(0.09, 0.58, saturation);
  float lowSatBias = 1.0 - smoothstep(0.08, 0.26, saturation);
  float warmBias = smoothstep(0.18, 0.62, color.r - color.b) * smoothstep(0.16, 0.48, color.g - color.b);
  float pastelBias = lowSatBias * mix(0.55, 1.0, warmBias);

  vec3 saturationShaped = adjustSaturation(color, mix(1.02, 1.22, satBias));
  vec3 huePreserved = mix(saturationShaped, color, 0.32 + pastelBias * 0.38);
  vec3 luminanceGuided = mix(vec3(luminance), huePreserved, mix(0.72, 0.97, satBias));
  vec3 warmLift = vec3(0.018, 0.008, -0.012) * pastelBias;

  return clamp(luminanceGuided + warmLift, 0.0, 1.0);
}

vec3 quantizePc98_512Sat(vec3 color)
{
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float maxChannel = max(max(color.r, color.g), color.b);
  float minChannel = min(min(color.r, color.g), color.b);
  float saturation = maxChannel - minChannel;
  float satBias = smoothstep(0.09, 0.58, saturation);
  vec3 quantized = quantizePc98_512(shapePc98_512SatColor(color));

  float targetLuma = floor(luminance * 7.0 + 0.5) / 7.0;
  float quantizedLuma = dot(quantized, vec3(0.299, 0.587, 0.114));
  float lowSatBias = 1.0 - smoothstep(0.08, 0.26, saturation);
  float lumaCorrection = (targetLuma - quantizedLuma) * mix(0.24, 0.12, satBias) * (1.0 - lowSatBias * 0.35);
  vec3 lumaBalanced = clamp(quantized + vec3(lumaCorrection), 0.0, 1.0);

  return quantizePc98_512(lumaBalanced);
}

vec3 applyNeonLinePalette(
  sampler2D textureSampler,
  vec2 uv,
  vec2 texel,
  float levels,
  vec3 monoTint
)
{
  vec3 center = texture(textureSampler, uv).rgb;
  vec3 left = texture(textureSampler, clamp(uv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb;
  vec3 right = texture(textureSampler, clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb;
  vec3 up = texture(textureSampler, clamp(uv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 down = texture(textureSampler, clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb;

  float centerLum = dot(center, vec3(0.299, 0.587, 0.114));
  float leftLum = dot(left, vec3(0.299, 0.587, 0.114));
  float rightLum = dot(right, vec3(0.299, 0.587, 0.114));
  float upLum = dot(up, vec3(0.299, 0.587, 0.114));
  float downLum = dot(down, vec3(0.299, 0.587, 0.114));

  float gradient = length(vec2(rightLum - leftLum, downLum - upLum));
  float detailScale = mix(2.0, 4.2, clamp(uNeonDetail - 0.5, 0.0, 1.5) / 1.5);
  float edge = pow(clamp(gradient * detailScale, 0.0, 1.0), mix(0.95, 0.58, clamp(uNeonDetail, 0.0, 2.0) * 0.5));
  float silhouette = smoothstep(0.18, 0.8, centerLum);
  float line = clamp(edge + silhouette * 0.2, 0.0, 1.0);
  float stepped = floor(line * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);

  vec3 tintCore = adjustSaturation(monoTint, 1.14);
  vec3 tintWarm = vec3(
    monoTint.r,
    max(monoTint.g * 0.62, 0.04),
    max(monoTint.b * 0.28, 0.02)
  );
  vec3 tintCool = vec3(
    max(monoTint.r * 0.34, 0.03),
    monoTint.g * 0.82,
    monoTint.b
  );
  float tintVariance = max(max(monoTint.r, monoTint.g), monoTint.b)
    - min(min(monoTint.r, monoTint.g), monoTint.b);
  vec3 tintAccent = adjustSaturation(
    mix(tintCool, tintWarm, smoothstep(0.52, 0.9, monoTint.r)),
    1.28
  );
  vec3 neonCore = vec3(0.08, 0.94, 1.0);
  vec3 neonAccent = vec3(1.0, 0.16, 0.82);
  vec3 primary = mix(neonCore, tintCore, 0.56);
  vec3 accent = mix(neonAccent, tintAccent, clamp(tintVariance * 1.85, 0.18, 0.82));
  vec3 backgroundTint = mix(vec3(0.01, 0.012, 0.03), tintCore * vec3(0.09, 0.07, 0.13), 0.38);
  vec3 background = mix(backgroundTint, backgroundTint + neonAccent * 0.06 + accent * 0.04, silhouette * 0.18);
  vec3 beamBase = mix(primary, accent, smoothstep(0.2, 1.0, centerLum + edge * 0.6));
  float saturation = clamp(uNeonSaturation, 0.0, 2.5);
  vec3 beam = adjustSaturation(beamBase, saturation);
  float boost = clamp(uNeonBoost, 0.0, 2.5);
  vec3 haloBase = mix(primary, accent, 0.72);
  vec3 halo = adjustSaturation(haloBase, 0.65 + saturation * 0.8)
    * pow(stepped, 1.8 + boost * 0.35)
    * (0.40 + boost * 0.23);

  vec3 neon = background + beam * stepped * (0.7 + boost * 0.45) + halo;
  return adjustSaturation(neon, 0.85 + saturation * 0.35);
}

vec2 curveUv(vec2 uv, float strength)
{
  vec2 centered = uv * 2.0 - 1.0;
  vec2 offset = centered.yx * centered.yx;

  centered += centered * offset * strength;

  return centered * 0.5 + 0.5;
}

float edgeShadow(vec2 uv, float curvature)
{
  vec2 centered = abs(uv - vec2(0.5)) * 2.0;
  float horizontal = pow(centered.x, 2.6);
  float vertical = pow(centered.y, 2.1);
  float edge = horizontal * 0.45 + vertical * 0.8 + horizontal * vertical * 0.35;

  return 1.0 - edge * (curvature * 0.45);
}

float horizontalUnevenness(vec2 uv, float time, float strength)
{
  if (strength <= 0.0) {
    return 1.0;
  }

  float broad = sin(uv.y * 17.0 + time * 0.35) * 0.5 + 0.5;
  float fine = sin(uv.y * 61.0 + time * 0.12) * 0.5 + 0.5;

  return 1.0 - (broad * 0.03 + fine * 0.012) * strength;
}

float hash12(vec2 p)
{
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float hash13(vec3 p3)
{
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}

float closeUpNoiseAmount(vec2 uv, vec2 targetSize)
{
  vec2 sourceDelta = fwidth(uv * targetSize);
  float sourcePixelsPerScreenPixel = max(max(sourceDelta.x, sourceDelta.y), 0.0001);
  float zoomFactor = 1.0 / sourcePixelsPerScreenPixel;
  return smoothstep(1.02, 2.2, zoomFactor);
}

vec3 applyCloseUpTubeNoise(vec3 color, vec2 uv, vec2 cell, float time, float amount)
{
  if (amount <= 0.0) {
    return color;
  }

  float flickerTime = time * 18.0;
  float frameA = floor(flickerTime);
  float frameB = frameA + 1.0;
  float frameMix = smoothstep(0.0, 1.0, fract(flickerTime));
  float frameFlicker = 0.82 + hash12(vec2(frameA, 17.0)) * 0.36;

  vec2 fragA = floor(gl_FragCoord.xy);
  vec2 fragB = floor(gl_FragCoord.xy * 0.5);
  vec2 cellNoise = floor(cell * 1.37);

  float grainA0 = hash13(vec3(fragA, frameA)) - 0.5;
  float grainA1 = hash13(vec3(fragA, frameB)) - 0.5;
  float grainB0 = hash13(vec3(fragB + vec2(31.0, 0.0), frameA + 11.0)) - 0.5;
  float grainB1 = hash13(vec3(fragB + vec2(31.0, 0.0), frameB + 11.0)) - 0.5;
  float grainC0 = hash13(vec3(cellNoise + vec2(59.0, 0.0), frameA + 23.0)) - 0.5;
  float grainC1 = hash13(vec3(cellNoise + vec2(59.0, 0.0), frameB + 23.0)) - 0.5;

  float grainA = mix(grainA0, grainA1, frameMix);
  float grainB = mix(grainB0, grainB1, frameMix);
  float grainC = mix(grainC0, grainC1, frameMix);
  float grain = grainA * 0.5 + grainB * 0.3 + grainC * 0.2;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float noiseStrength = amount * frameFlicker * (0.085 + (1.0 - luma) * 0.05);
  float dust0 = hash13(vec3(floor(gl_FragCoord.xy * 0.35) + vec2(97.0, 0.0), frameA + 5.0));
  float dust1 = hash13(vec3(floor(gl_FragCoord.xy * 0.35) + vec2(97.0, 0.0), frameB + 5.0));
  float dust = mix(dust0, dust1, frameMix);
  float sparkle = smoothstep(0.94, 0.995, dust) * amount * (frameFlicker - 0.7) * 0.05;
  vec3 tintedNoise = vec3(
    grain * 0.95,
    grain,
    grain * 1.05
  );

  return clamp(color + tintedNoise * noiseStrength + vec3(sparkle), 0.0, 1.0);
}

vec3 applyPalette(vec3 color, float levels, float paletteMode, vec3 monoTint, vec2 cell)
{
  if (paletteMode < 0.5) {
    return floor(color * (levels - 1.0) + 0.5) / max(levels - 1.0, 1.0);
  }

  if (paletteMode < 1.5) {
    return nearestPc98(color);
  }

  if (paletteMode < 2.5) {
    return pc98TilePalette(color, cell);
  }

  if (paletteMode < 3.5) {
    return quantizePc98_512(color);
  }

  if (paletteMode < 4.5) {
    return quantizePc98_512Sat(color);
  }

  if (paletteMode < 5.5) {
    return quantizePc98_4096(color);
  }

  if (paletteMode < 6.5) {
    return nearestColor32(color);
  }

  if (paletteMode < 7.5) {
    return nearestColor64(color);
  }

  return monochromePalette(color, max(levels, 2.0), monoTint);
}

vec3 applySpotMask(vec3 color, vec2 curvedUv, vec2 targetSize, float amount)
{
  if (amount <= 0.0) {
    return color;
  }

  float brightness = max(max(color.r, color.g), color.b);
  vec2 cellUv = fract(curvedUv * targetSize) - 0.5;
  float pixelAspect = clamp(uPixelAspect, 0.5, 2.0);
  float aspectCompensation = sqrt(pixelAspect);
  vec2 aspectAdjustedUv = pixelAspect >= 1.0
    ? vec2(cellUv.x, cellUv.y * aspectCompensation)
    : vec2(cellUv.x / aspectCompensation, cellUv.y);
  float crtBias = 0.12;
  vec2 ellipseScale = vec2(1.0 + crtBias, 1.0 - crtBias * 0.55);
  vec2 ellipseUv = aspectAdjustedUv / ellipseScale;
  float ellipseDist = length(ellipseUv);
  float bulbRadius = mix(uBulbRadius * 0.22, uBulbRadius * 0.78, pow(brightness, 0.7));
  float glowRadius = bulbRadius + mix(0.03, 0.08, brightness);
  float bulb = 1.0 - smoothstep(bulbRadius - 0.018, bulbRadius + 0.025, ellipseDist);
  float glow = 1.0 - smoothstep(glowRadius - 0.015, glowRadius + 0.045, ellipseDist);
  float filament = exp(-ellipseDist * ellipseDist * mix(34.0, 14.0, brightness));
  float blackFloor = mix(0.0, uBlackFloor, brightness) * amount;
  float bulbLight = bulb * (0.9 + brightness * 0.28);
  float glowLight = glow * glow * (0.01 + brightness * 0.04);
  float filamentLight = filament * (0.24 + brightness * 0.42);
  float emission = (bulbLight + glowLight + filamentLight) * amount;
  float visibilityFloor = smoothstep(0.02, 0.28, brightness) * (0.035 + amount * 0.045);
  emission = max(emission, visibilityFloor);
  float shape = clamp(max(bulb, max(glow * 0.35, filament)), 0.0, 1.0);
  float blackMask = pow(1.0 - shape, 2.8);
  vec3 maskedColor = color * emission;
  maskedColor += color * (blackFloor * blackMask);

  return maskedColor;
}

vec3 applyPhosphorDot(vec3 color, vec2 gridUv, vec2 targetSize, float amount)
{
  if (amount <= 0.0) {
    return color;
  }

  float brightness = max(max(color.r, color.g), color.b);
  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float minChannel = min(min(color.r, color.g), color.b);
  float saturation = brightness - minChannel;
  float chromaLift = smoothstep(0.04, 0.28, saturation) * smoothstep(0.0, 0.22, brightness);
  float lightLevel = clamp(uPhosphorDotLightBalance, 0.0, 2.0);
  float perceivedLight = max(luminance, brightness * 0.72 + chromaLift * 0.12);
  vec2 cellIndex = floor(gridUv * targetSize);
  float cellJitter = hash12(cellIndex + vec2(17.0, 43.0)) - 0.5;
  vec2 cellUv = fract(gridUv * targetSize) - 0.5;
  float pixelAspect = clamp(uPixelAspect, 0.5, 2.0);
  float aspectCompensation = sqrt(pixelAspect);
  vec2 dotUv = pixelAspect >= 1.0
    ? vec2(cellUv.x, cellUv.y * aspectCompensation)
    : vec2(cellUv.x / aspectCompensation, cellUv.y);
  float dist = length(dotUv);
  float lit = smoothstep(0.01, 0.28, perceivedLight);
  float gate = smoothstep(0.0, 0.12, perceivedLight);
  float radiusBias = pow(brightness, 0.7);
  float highlightBloom = smoothstep(0.68, 1.0, brightness);
  float cellFillMix = smoothstep(0.2, 0.5, uPhosphorDotCellFill);
  float flatDiscMode = smoothstep(0.5, 1.0, uPhosphorDotFlatDisc);
  bool useBrightCore = uPhosphorDotBrightCore > 0.5;
  float brightCoreMix = (useBrightCore ? 1.0 : 0.0) * (1.0 - cellFillMix) * (1.0 - flatDiscMode);
  float brightCoreCompensation = mix(1.0, 1.2 + brightness * 0.18 + highlightBloom * 0.08, brightCoreMix);
  float radiusJitter = 1.0 + cellJitter * 0.045;
  float emissionJitter = 1.0 + cellJitter * 0.035;
  float dotRadius = mix(
    uBulbRadius * (useBrightCore ? 0.14 : 0.19),
    uBulbRadius * ((useBrightCore ? 0.64 : 0.82) + highlightBloom * (useBrightCore ? 0.24 : 0.12)),
    radiusBias
  ) * radiusJitter;
  float innerCoreRadius = dotRadius * (useBrightCore ? mix(0.28, 0.42, brightness) : mix(0.44, 0.58, brightness));
  float haloRadius = dotRadius + mix(0.028, 0.12 + highlightBloom * 0.08, brightness);
  float innerCore = exp(-dist * dist * mix(useBrightCore ? 220.0 : 120.0, useBrightCore ? 110.0 : 72.0, brightness));
  float bulb = 1.0 - smoothstep(dotRadius - 0.014, dotRadius + 0.02, dist);
  float flatDisc = 1.0 - smoothstep(dotRadius - 0.01, dotRadius + 0.012, dist);
  float halo = 1.0 - smoothstep(haloRadius - 0.025, haloRadius + 0.07, dist);
  float rimDarkness = smoothstep(innerCoreRadius * (useBrightCore ? 0.9 : 1.02), dotRadius * 1.05, dist);
  float cavity = 1.0 - rimDarkness * (useBrightCore ? 0.18 : 0.04);
  float bodyGlow = bulb * mix(
    0.28 + brightness * 0.32,
    0.28 + brightness * 0.32,
    brightCoreMix
  );
  float emission =
    gate *
    lit *
    amount *
    (
      innerCore * mix(
        0.9 + brightness * 0.56 + highlightBloom * 0.14,
        1.45 + brightness * 1.02 + highlightBloom * 0.34,
        brightCoreMix
      ) +
      bodyGlow +
      bulb * cavity * mix(
        0.24 + brightness * 0.28,
        0.26 + brightness * 0.32,
        brightCoreMix
      ) +
      halo * halo * (0.03 + brightness * 0.06 + highlightBloom * 0.09)
    ) *
    brightCoreCompensation *
    emissionJitter;
  float floorLight =
    gate *
    lit *
    amount *
    (uBlackFloor * (0.48 + halo * 0.58)) *
    (1.0 + cellJitter * 0.025);
  float cellFill =
    gate *
    lit *
    amount *
    uPhosphorDotCellFill *
    (0.26 + brightness * 0.22);
  float flatDiscFill =
    gate *
    lit *
    amount *
    flatDisc *
    (0.78 + brightness * 0.18);
  vec3 dotCoreColor = color * emission;
  dotCoreColor += color * mix(cellFill, cellFill * flatDisc * 1.75, cellFillMix);
  vec3 discCoreColor = color * flatDiscFill;
  vec3 dotColor = mix(dotCoreColor, discCoreColor, flatDiscMode);
  dotColor += color * floorLight;
  return dotColor * lightLevel;
}

vec3 sampleProcessedSourceColor(vec2 sampleUv, vec2 sampleCell, vec2 texel)
{
  vec2 clampedUv = clamp(sampleUv, vec2(0.0), vec2(1.0));
  vec4 sampleColor = texture(uTexture, clampedUv);
  bool isPc98Tile = uPaletteMode > 1.5 && uPaletteMode < 2.5;

  if (isPc98Tile) {
    return samplePc98TileSource(uTexture, sampleCell, uTargetSize);
  }

  float dither = (bayer4x4(sampleCell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  sampleColor.rgb = clamp(sampleColor.rgb + dither, 0.0, 1.0);
  bool isNeon = uPaletteMode > 8.5;

  if (isNeon) {
    return applyNeonLinePalette(
      uTexture,
      clampedUv,
      texel,
      max(uColorLevels, 2.0),
      uMonoTint
    );
  }

  return applyPalette(sampleColor.rgb, uColorLevels, uPaletteMode, uMonoTint, sampleCell);
}

void main(void)
{
  vec2 warpedMask = curveUv(vMaskCoord, uCurvature);
  vec2 delta = warpedMask - vMaskCoord;
  vec2 curvedUv = vTextureCoord + delta;
  vec2 gridUv = vTextureCoord;
  if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
    finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 cell = floor(curvedUv * uTargetSize);
  vec2 pixelatedUv = (cell + 0.5) / uTargetSize;
  pixelatedUv = clamp(pixelatedUv, vec2(0.0), vec2(1.0));

  vec2 maskCentered = warpedMask - vec2(0.5);
  float edgeAmount = smoothstep(0.2, 0.95, length(maskCentered) * 1.35);
  vec2 chromaOffset = maskCentered * (uCurvature * 0.01) * edgeAmount;
  vec2 redUv = clamp(pixelatedUv + chromaOffset, vec2(0.0), vec2(1.0));
  vec2 blueUv = clamp(pixelatedUv - chromaOffset * 0.8, vec2(0.0), vec2(1.0));
  vec2 texel = 1.0 / uTargetSize;

  vec4 color = texture(uTexture, pixelatedUv);
  color.r = texture(uTexture, redUv).r;
  color.b = texture(uTexture, blueUv).b;
  bool isPc98Tile = uPaletteMode > 1.5 && uPaletteMode < 2.5;
  if (isPc98Tile) {
    color.rgb = samplePc98TileSource(uTexture, cell, uTargetSize);
  }
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color.rgb = clamp(color.rgb + dither, 0.0, 1.0);
  bool isNeon = uPaletteMode > 8.5;

  if (isNeon) {
    color.rgb = applyNeonLinePalette(uTexture, pixelatedUv, texel, max(uColorLevels, 2.0), uMonoTint);
    if (uGlowStrength > 0.001) {
      vec3 halo = applyNeonLinePalette(
        uTexture,
        clamp(pixelatedUv + vec2(texel.x * 0.5, texel.y * 0.5), vec2(0.0), vec2(1.0)),
        texel,
        max(uColorLevels, 2.0),
        uMonoTint
      );
      color.rgb = mix(color.rgb, color.rgb + halo * uGlowStrength * (0.35 + uNeonBoost * 0.22), 0.45);
    }
  } else {
    color.rgb = applyPalette(color.rgb, uColorLevels, uPaletteMode, uMonoTint, cell);

    if (uGlowStrength > 0.001) {
      vec3 glow = vec3(0.0);
      glow += applyPalette(texture(uTexture, clamp(pixelatedUv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uPaletteMode, uMonoTint, cell + vec2(1.0, 0.0)) * 0.34;
      glow += applyPalette(texture(uTexture, clamp(pixelatedUv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uPaletteMode, uMonoTint, cell - vec2(1.0, 0.0)) * 0.34;
      glow += applyPalette(texture(uTexture, clamp(pixelatedUv + vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uPaletteMode, uMonoTint, cell + vec2(2.0, 0.0)) * 0.18;
      glow += applyPalette(texture(uTexture, clamp(pixelatedUv - vec2(texel.x * 2.0, 0.0), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uPaletteMode, uMonoTint, cell - vec2(2.0, 0.0)) * 0.18;
      glow += applyPalette(texture(uTexture, clamp(pixelatedUv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uPaletteMode, uMonoTint, cell + vec2(0.0, 1.0)) * 0.10;
      glow += applyPalette(texture(uTexture, clamp(pixelatedUv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb, uColorLevels, uPaletteMode, uMonoTint, cell - vec2(0.0, 1.0)) * 0.10;

      float brightness = max(max(color.r, color.g), color.b);
      float glowMask = smoothstep(0.45, 1.0, brightness);
      color.rgb += glow * glowMask * uGlowStrength;
    }
  }
  color.rgb = clamp(color.rgb, 0.0, 1.0);

  if (uPhosphorDotMode > 0.5) {
    vec2 sampleTargetSize = max(uSampleTargetSize, vec2(1.0));
    vec2 dotCell = floor(curvedUv * uTargetSize);
    vec2 sampleCell = floor(curvedUv * sampleTargetSize);
    vec2 dotPixelatedUv = (sampleCell + 0.5) / sampleTargetSize;
    dotPixelatedUv = clamp(dotPixelatedUv, vec2(0.0), vec2(1.0));
    vec2 sampleTexel = 1.0 / sampleTargetSize;
    vec2 rightUv = clamp((sampleCell + vec2(1.0, 0.0) + 0.5) / sampleTargetSize, vec2(0.0), vec2(1.0));
    vec2 leftUv = clamp((sampleCell + vec2(-1.0, 0.0) + 0.5) / sampleTargetSize, vec2(0.0), vec2(1.0));
    vec2 downUv = clamp((sampleCell + vec2(0.0, 1.0) + 0.5) / sampleTargetSize, vec2(0.0), vec2(1.0));
    vec2 upUv = clamp((sampleCell + vec2(0.0, -1.0) + 0.5) / sampleTargetSize, vec2(0.0), vec2(1.0));
    vec3 centerColor = sampleProcessedSourceColor(dotPixelatedUv, sampleCell, sampleTexel);
    vec3 rightColor = sampleProcessedSourceColor(rightUv, sampleCell + vec2(1.0, 0.0), sampleTexel);
    vec3 leftColor = sampleProcessedSourceColor(leftUv, sampleCell + vec2(-1.0, 0.0), sampleTexel);
    vec3 downColor = sampleProcessedSourceColor(downUv, sampleCell + vec2(0.0, 1.0), sampleTexel);
    vec3 upColor = sampleProcessedSourceColor(upUv, sampleCell + vec2(0.0, -1.0), sampleTexel);
    float internalScaleMix = smoothstep(0.5, 1.0, uPhosphorDotInternalScale);
    float flatDiscMode = smoothstep(0.5, 1.0, uPhosphorDotFlatDisc);
    float neighborBlendMix = smoothstep(0.5, 1.0, uPhosphorDotNeighborBlend);
    vec3 neighborMix = (rightColor + leftColor + upColor + downColor) * 0.25;
    float sourceColorDelta = length(centerColor - neighborMix);
    float sourceBlendAmount =
      neighborBlendMix *
      (0.38 + flatDiscMode * 0.16 + smoothstep(0.04, 0.4, sourceColorDelta) * 0.28);
    vec3 mixedSourceColor = mix(centerColor, centerColor * 0.24 + neighborMix * 0.76, sourceBlendAmount);
    vec3 baseProcessedColor = color.rgb;

    vec3 phosphorColor = applyPhosphorDot(mixedSourceColor, curvedUv, uTargetSize, uSpotMaskStrength);
    float phosphorBrightness = max(max(mixedSourceColor.r, mixedSourceColor.g), mixedSourceColor.b);
    float bleedMask = smoothstep(0.52, 1.0, phosphorBrightness);
    vec3 bleedColor = vec3(0.0);
    bleedColor += rightColor * 0.34;
    bleedColor += leftColor * 0.34;
    bleedColor += downColor * 0.16;
    bleedColor += upColor * 0.16;
    phosphorColor += bleedColor * bleedMask * uSpotMaskStrength * (0.06 + phosphorBrightness * 0.1);

    float pixelAspect = clamp(uPixelAspect, 0.5, 2.0);
    float aspectCompensation = sqrt(pixelAspect);
    vec2 cellUv = fract(curvedUv * uTargetSize) - 0.5;
    vec2 dotUv = pixelAspect >= 1.0
      ? vec2(cellUv.x, cellUv.y * aspectCompensation)
      : vec2(cellUv.x / aspectCompensation, cellUv.y);
    float dist = length(dotUv);
    float highlightBloom = smoothstep(0.68, 1.0, phosphorBrightness);
    bool useBrightCore = uPhosphorDotBrightCore > 0.5;
    float dotRadius = mix(
      uBulbRadius * (useBrightCore ? 0.14 : 0.19),
      uBulbRadius * ((useBrightCore ? 0.64 : 0.82) + highlightBloom * (useBrightCore ? 0.24 : 0.12)),
      pow(phosphorBrightness, 0.7)
    );
    float edgeWidth = max(fwidth(dist) * mix(1.4, 2.2, flatDiscMode), 0.002);
    float edgeBand = 1.0 - smoothstep(0.0, edgeWidth, abs(dist - dotRadius));
    float colorDelta = length(mixedSourceColor - neighborMix);
    float edgeBlend =
      edgeBand *
      smoothstep(0.04, 0.32, colorDelta) *
      neighborBlendMix *
      (0.14 + phosphorBrightness * 0.18 + flatDiscMode * 0.1);
    phosphorColor = mix(phosphorColor, mix(phosphorColor, neighborMix, 0.7), edgeBlend);

    vec3 fourWayMix =
      mixedSourceColor * 0.34 +
      (rightColor + leftColor + upColor + downColor) * 0.165;
    float fourWayAmount =
      neighborBlendMix *
      (0.16 + phosphorBrightness * 0.16 + flatDiscMode * 0.08 + internalScaleMix * 0.06);
    phosphorColor = mix(phosphorColor, fourWayMix, fourWayAmount);

    float phosphorScanlineVisibility = mix(1.0, 1.0 - phosphorBrightness, uScanlineBrightnessFade);
    float phosphorScanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
    float phosphorScanlineStrength = mix(0.035, 0.12, bleedMask) + uScanlineStrength * 0.25;
    phosphorColor *= 1.0 - (
      (phosphorScanline * 0.5 + 0.5) *
      phosphorScanlineStrength *
      phosphorScanlineVisibility
    );
    float phosphorScanline2 =
      sin((vTextureCoord.y + uTime * 0.05) * 720.0) *
      uScanline2Strength *
      phosphorScanlineVisibility *
      0.45;
    phosphorColor += vec3(phosphorScanline2);

    if (uGlowStrength > 0.001) {
      vec3 glowLift = max(baseProcessedColor - mixedSourceColor, vec3(0.0));
      phosphorColor += glowLift * (0.3 + bleedMask * 0.25 + phosphorBrightness * 0.15);
    }

    float phosphorBaseLift =
      uSpotMaskStrength *
      (0.035 + uPhosphorDotCellFill * 0.22 + phosphorBrightness * 0.04);
    phosphorColor += mixedSourceColor * phosphorBaseLift;

    float phosphorDotVignette = distance(vMaskCoord, vec2(0.5));
    phosphorColor *= 1.0 - smoothstep(0.2, 0.78, phosphorDotVignette) * uVignetteStrength;
    phosphorColor *= edgeShadow(warpedMask, uCurvature);
    phosphorColor *= horizontalUnevenness(
      warpedMask,
      uTime,
      max(
        max(uScanlineStrength, uScanline2Strength),
        max(max(uGlowStrength, uPhosphorStrength), uSpotMaskStrength)
      )
    );

    color.rgb = clamp(phosphorColor, 0.0, 1.0);
    finalColor = color;
    return;
  }

  float scanlineBrightness = max(max(color.r, color.g), color.b);
  float scanlineVisibility = mix(1.0, 1.0 - scanlineBrightness, uScanlineBrightnessFade);

  float scanline = sin(pixelatedUv.y * uTargetSize.y * 3.14159265);
  color.rgb *= 1.0 - ((scanline * 0.5 + 0.5) * uScanlineStrength * scanlineVisibility);

  float scanline2 = sin((vTextureCoord.y + uTime * 0.05) * 720.0) * uScanline2Strength * scanlineVisibility;
  color.rgb += scanline2;

  if (uPhosphorStrength > 0.001) {
    float phosphorPhase = pixelatedUv.x * uTargetSize.x * 6.2831853;
    vec3 phosphorTriad = vec3(
      sin(phosphorPhase) * 0.5 + 0.5,
      sin(phosphorPhase + 2.0943951) * 0.5 + 0.5,
      sin(phosphorPhase + 4.1887902) * 0.5 + 0.5
    );
    phosphorTriad = mix(vec3(0.5), phosphorTriad, 0.7);
    color.rgb *= mix(vec3(1.0), 0.82 + phosphorTriad * 0.42, uPhosphorStrength);
  }

  if (uSpotMaskStrength > 0.001) {
    color.rgb = applySpotMask(color.rgb, curvedUv, uTargetSize, uSpotMaskStrength);
  }

  float closeUpAmount = uCloseUpNoiseStrength;
  if (closeUpAmount > 0.001) {
    color.rgb = applyCloseUpTubeNoise(color.rgb, vTextureCoord, cell, uTime, closeUpAmount);
  }

  float vignette = distance(vMaskCoord, vec2(0.5));
  color.rgb *= 1.0 - smoothstep(0.2, 0.78, vignette) * uVignetteStrength;
  color.rgb *= edgeShadow(warpedMask, uCurvature);
  color.rgb *= horizontalUnevenness(
    warpedMask,
    uTime,
    max(
      max(uScanlineStrength, uScanline2Strength),
      max(max(uGlowStrength, uPhosphorStrength), uSpotMaskStrength)
    )
  );

  color.rgb = clamp(color.rgb, 0.0, 1.0);

  finalColor = color;
}
`,er=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,go=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,tr=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),fo=640,io=e=>({width:e instanceof HTMLVideoElement?e.videoWidth:e.naturalWidth,height:e instanceof HTMLVideoElement?e.videoHeight:e.naturalHeight}),or=(e,a,d)=>e instanceof HTMLVideoElement&&(a>fo||d>fo),$t=e=>e.spotMaskStrength>.001&&(e.phosphorDotInternalScale||e.phosphorDotBrightCore||e.phosphorDotCellFill>.001||e.phosphorDotFlatDisc||e.phosphorDotNeighborBlend),rr=e=>$t(e)&&e.phosphorDotInternalScale?2:1,nr=(e,a,d,h)=>{if(d===void 0||h===void 0||d<=0||h<=0)return{width:e,height:a};const l=d/h;return e/a>l?{width:Math.max(1,Math.round(a*l)),height:a}:{width:e,height:Math.max(1,Math.round(e/l))}},ar=(e,a,d,h,l,y)=>{if(!$t(d)||l===void 0||y===void 0||l<=0||y<=0)return{width:e,height:a};const c=Math.max(1.1,2.15+d.bulbRadius*1.15),u=Math.max(1,c/Math.max(h,1)),w=Math.max(1,Math.floor(l/u)),B=Math.max(1,Math.floor(y/u)),$=Math.min(1,w/Math.max(e,1),B/Math.max(a,1));return{width:Math.max(1,Math.round(e*$)),height:Math.max(1,Math.round(a*$))}},lo=(e,a,d,h,l)=>{const y=rr(e),c=Math.max(e.targetWidth,1),u=Math.max(e.targetHeight,1),w=e.matchTargetAspect?nr(c,u,a,d):{width:c,height:u},B=w.width*y,$=w.height*y,C=ar(B,$,e,y,h,l);return{width:C.width,height:C.height,sampleWidth:Math.max(1,Math.round(B)),sampleHeight:Math.max(1,Math.round($)),internalScale:y,isPhosphorDotMode:$t(e)}};function vo(e,a,d){const h=e.createShader(a);if(!h)throw new Error("Failed to create shader.");if(e.shaderSource(h,d),e.compileShader(h),!e.getShaderParameter(h,e.COMPILE_STATUS)){const l=e.getShaderInfoLog(h)||"Unknown shader compile error.";throw e.deleteShader(h),new Error(l)}return h}function bo(e,a,d){const h=vo(e,e.VERTEX_SHADER,a),l=vo(e,e.FRAGMENT_SHADER,d),y=e.createProgram();if(!y)throw e.deleteShader(h),e.deleteShader(l),new Error("Failed to create WebGL program.");if(e.attachShader(y,h),e.attachShader(y,l),e.bindAttribLocation(y,0,"aPosition"),e.linkProgram(y),e.deleteShader(h),e.deleteShader(l),!e.getProgramParameter(y,e.LINK_STATUS)){const c=e.getProgramInfoLog(y)||"Unknown program link error.";throw e.deleteProgram(y),new Error(c)}return y}function ir(e){const a=bo(e,go,Qo),d=bo(e,go,er),h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.bufferData(e.ARRAY_BUFFER,tr,e.STATIC_DRAW);const l=e.createVertexArray();e.bindVertexArray(l),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const y=e.createTexture();if(!y)throw new Error("Failed to create WebGL texture.");return e.bindTexture(e.TEXTURE_2D,y),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(a),e.uniform1i(e.getUniformLocation(a,"uTexture"),0),e.useProgram(d),e.uniform1i(e.getUniformLocation(d,"uTexture"),0),{gl:e,filterProgram:a,passthroughProgram:d,texture:y,uniformLocations:{uTargetSize:e.getUniformLocation(a,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(a,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(a,"uColorLevels"),uDitherStrength:e.getUniformLocation(a,"uDitherStrength"),uPaletteMode:e.getUniformLocation(a,"uPaletteMode"),uCurvature:e.getUniformLocation(a,"uCurvature"),uScanlineStrength:e.getUniformLocation(a,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(a,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(a,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(a,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(a,"uGlowStrength"),uPhosphorStrength:e.getUniformLocation(a,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(a,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(a,"uBulbRadius"),uBlackFloor:e.getUniformLocation(a,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(a,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(a,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(a,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(a,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(a,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(a,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(a,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(a,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(a,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(a,"uMonoTint"),uNeonBoost:e.getUniformLocation(a,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(a,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(a,"uNeonDetail"),uTime:e.getUniformLocation(a,"uTime")}}}function sr(e,a,d,h,l,y,c){const u=e.canvas instanceof HTMLCanvasElement?e.canvas:null,w=Math.max(u?.clientWidth??e.drawingBufferWidth,1),B=Math.max(u?.clientHeight??e.drawingBufferHeight,1),{width:$,height:C,sampleWidth:oe,sampleHeight:F,isPhosphorDotMode:X}=lo(h,l,y,w,B);e.useProgram(a),e.uniform2f(d.uTargetSize,$,C),e.uniform2f(d.uSampleTargetSize,oe,F),e.uniform1f(d.uColorLevels,Math.max(h.colorLevels,2)),e.uniform1f(d.uDitherStrength,h.ditherStrength),e.uniform1f(d.uPaletteMode,$o(h.paletteMode)),e.uniform1f(d.uCurvature,h.curvature),e.uniform1f(d.uScanlineStrength,h.scanlineStrength),e.uniform1f(d.uScanline2Strength,h.scanline2Strength),e.uniform1f(d.uScanlineBrightnessFade,h.scanlineBrightnessFade),e.uniform1f(d.uVignetteStrength,h.vignetteStrength),e.uniform1f(d.uGlowStrength,h.glowStrength),e.uniform1f(d.uPhosphorStrength,h.phosphorStrength),e.uniform1f(d.uSpotMaskStrength,h.spotMaskStrength),e.uniform1f(d.uBulbRadius,h.bulbRadius),e.uniform1f(d.uBlackFloor,h.blackFloor),e.uniform1f(d.uPhosphorDotLightBalance,h.phosphorDotLightBalance),e.uniform1f(d.uPixelAspect,Math.max(e.drawingBufferWidth,1)*C/(Math.max(e.drawingBufferHeight,1)*$)),e.uniform1f(d.uPhosphorDotMode,X?1:0),e.uniform1f(d.uPhosphorDotInternalScale,h.phosphorDotInternalScale?1:0),e.uniform1f(d.uPhosphorDotBrightCore,h.phosphorDotBrightCore?1:0),e.uniform1f(d.uPhosphorDotCellFill,h.phosphorDotCellFill),e.uniform1f(d.uPhosphorDotFlatDisc,h.phosphorDotFlatDisc?1:0),e.uniform1f(d.uPhosphorDotNeighborBlend,h.phosphorDotNeighborBlend?1:0),e.uniform1f(d.uCloseUpNoiseStrength,h.closeUpNoiseStrength),e.uniform3f(d.uMonoTint,...qo[h.monoTint].rgb),e.uniform1f(d.uNeonBoost,h.neonBoost),e.uniform1f(d.uNeonSaturation,h.neonSaturation),e.uniform1f(d.uNeonDetail,h.neonDetail),e.uniform1f(d.uTime,((typeof performance<"u"?performance.now():Date.now())-c)/1e3)}function lr({filterState:e,fitMode:a,renderResolutionScale:d,isPoweredOn:h,isPlayingRef:l,previewKindRef:y,debugVideo:c}){const u=o.useRef(null),w=o.useRef(null),B=o.useRef(null),$=o.useRef(null),C=o.useRef(null),oe=o.useRef(null),F=o.useRef(null),X=o.useRef(null),O=o.useRef(()=>{}),we=o.useRef(e),se=o.useRef(h),Ce=o.useRef(!1),le=o.useRef(null),ce=o.useRef(null),ye=o.useRef(null),Re=o.useRef(null),Ae=o.useRef(null),[Ee,Ge]=o.useState(!1),[Oe,Ve]=o.useState(null);we.current=e,se.current=h;const re=o.useCallback(v=>{Ve(D=>{const m=typeof v=="function"?v(D):v;return Ae.current=m,m})},[]),ge=o.useCallback((v,D)=>{if(!D.isFilterEnabled)return v;const m=io(v);if(m.width<=0||m.height<=0||or(v,m.width,m.height))return v;const{width:z,height:K,sampleWidth:Q,sampleHeight:V,isPhosphorDotMode:I}=lo(D,m.width,m.height),Se=Math.max(1,Math.round(I?Q:z)),k=Math.max(1,Math.round(I?V:K));let M=ye.current,L=Re.current;if(!M||!L){if(M=document.createElement("canvas"),L=M.getContext("2d",{alpha:!1,desynchronized:!0}),!L)return v;ye.current=M,Re.current=L}return M.width!==Se&&(M.width=Se),M.height!==k&&(M.height=k),L.imageSmoothingEnabled=!0,L.imageSmoothingQuality="high",L.fillStyle="#000",L.fillRect(0,0,Se,k),L.drawImage(v,0,0,Se,k),M},[c]),W=o.useCallback(()=>{const v=w.current,D=C.current;if(!v)return;const{gl:m,texture:z,filterProgram:K,passthroughProgram:Q,uniformLocations:V}=v.renderer;if(m.viewport(0,0,m.drawingBufferWidth,m.drawingBufferHeight),m.clearColor(.01,.02,.01,1),m.clear(m.COLOR_BUFFER_BIT),!se.current||!D)return;const I=we.current,Se=ge(D,I);m.activeTexture(m.TEXTURE0),m.bindTexture(m.TEXTURE_2D,z);const k=I.isFilterEnabled?m.LINEAR:m.NEAREST;m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MIN_FILTER,k),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MAG_FILTER,k),m.texImage2D(m.TEXTURE_2D,0,m.RGBA,m.RGBA,m.UNSIGNED_BYTE,Se),I.isFilterEnabled?(sr(m,K,V,I,D instanceof HTMLVideoElement?D.videoWidth:D.naturalWidth,D instanceof HTMLVideoElement?D.videoHeight:D.naturalHeight,v.startedAt),m.useProgram(K)):m.useProgram(Q),m.drawArrays(m.TRIANGLES,0,6)},[]);o.useLayoutEffect(()=>{O.current=W},[W]);const Y=o.useCallback(()=>{Ce.current=!1,X.current!==null&&(window.cancelAnimationFrame(X.current),X.current=null)},[]),G=o.useCallback(()=>{if(Ce.current)return;Ce.current=!0;const v=()=>{if(!Ce.current)return;if(O.current(),!(y.current==="video"||y.current==="capture"||y.current==="image"||l.current)){X.current=null,Ce.current=!1;return}X.current=window.requestAnimationFrame(v)};X.current=window.requestAnimationFrame(v)},[l,y]),ue=o.useCallback(()=>{W()},[W]),Me=o.useCallback(()=>{W()},[W]),Ze=o.useCallback(()=>{W()},[W]),s=o.useCallback(()=>(w.current&&(w.current.startedAt=typeof performance<"u"?performance.now():Date.now()),oe.current={},W(),oe.current),[W]),i=o.useCallback((v,D,m)=>{if(!v)return;const{width:z,height:K}=io(m);if(z<=0||K<=0)return;const Q=u.current,V=Q?.clientWidth??v.canvas.width,I=Q?.clientHeight??v.canvas.height,k=a==="width"?V/z:Math.min(V/z,I/K),M=z*k,L=K*k,Fe=(V-M)/2,De=(I-L)/2,J={width:M,height:L,x:Fe,y:De},ee=Ae.current;return ee&&ee.width===J.width&&ee.height===J.height&&ee.x===J.x&&ee.y===J.y?ee:(Ae.current=J,re(J),J)},[c,a,re]),t=o.useCallback(()=>{C.current&&i(w.current,null,C.current)},[i]),ke=o.useCallback(()=>{W()},[W]),Le=o.useCallback(()=>{const v=w.current,D=u.current;if(!v||!D)return;t();const m=Ae.current??{x:0,y:0,width:D.clientWidth,height:D.clientHeight},z=Math.max(1,Math.round(m.width)),K=Math.max(1,Math.round(m.height)),Q=we.current,V=C.current?io(C.current):null,{width:I,height:Se}=lo(Q,V?.width,V?.height,z,K),k=Math.max(1,Math.round(z*Math.max(1,d))),M=Math.max(1,Math.round(K*Math.max(1,d))),L=Math.max(1,Math.round(Math.max(1,I)*Math.max(1,d))),Fe=Math.max(1,Math.round(Math.max(1,Se)*Math.max(1,d))),De=$t(Q),J=Q.isFilterEnabled&&De?Math.max(k,L):k,ee=Q.isFilterEnabled&&De?Math.max(M,Fe):M;v.canvas.width!==J&&(v.canvas.width=J),v.canvas.height!==ee&&(v.canvas.height=ee),v.canvas.style.position="absolute",v.canvas.style.left=`${Math.round(m.x)}px`,v.canvas.style.top=`${Math.round(m.y)}px`,v.canvas.style.width=`${z}px`,v.canvas.style.height=`${K}px`,v.canvas.style.imageRendering="pixelated",W()},[t,W,d]),Te=o.useCallback(()=>{le.current!==null&&(window.cancelAnimationFrame(le.current),le.current=null),ce.current!==null&&(window.clearTimeout(ce.current),ce.current=null),le.current=window.requestAnimationFrame(()=>{le.current=null,Le()}),ce.current=window.setTimeout(()=>{ce.current=null,Le()},120)},[Le]),_e=o.useCallback(async()=>{if(!w.current){if(F.current){await F.current;return}F.current=(async()=>{const v=u.current;if(!v||w.current)return;const D=typeof performance<"u"?performance.now():Date.now();c("startup:initPixi:start",{hostConnected:v.isConnected,hostWidth:v.clientWidth??null,hostHeight:v.clientHeight??null,resolution:d});const m=document.createElement("canvas");m.style.display="block",m.style.width="100%",m.style.height="100%",m.style.imageRendering="pixelated",m.style.background="#020617";const z=m.getContext("webgl2");if(!z)throw new Error("WebGL2 is not available in this app view.");c("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-D)*10)/10});const K=ir(z),Q={canvas:m,renderer:K,ticker:{start:G,stop:Y},startedAt:typeof performance<"u"?performance.now():Date.now()},V=u.current;if(!V||V!==v||!V.isConnected)return;V.style.position="relative",V.appendChild(m),w.current=Q,oe.current={},Ge(!0),c("initWebGL:ready",{hostWidth:V.clientWidth??null,hostHeight:V.clientHeight??null,resolution:d}),c("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-D)*10)/10}),Le();const I=y.current==="video"||y.current==="capture"||y.current==="image"||l.current;h&&I&&G(),c("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-D)*10)/10,shouldAnimateOnInit:I})})();try{await F.current}finally{F.current=null}}},[c,h,Le,d,G,Y]),je=o.useCallback(()=>{F.current=null,Y(),le.current!==null&&(window.cancelAnimationFrame(le.current),le.current=null),ce.current!==null&&(window.clearTimeout(ce.current),ce.current=null);const v=w.current;if(v){const{gl:D,filterProgram:m,passthroughProgram:z,texture:K}=v.renderer;D.deleteTexture(K),D.deleteProgram(m),D.deleteProgram(z),v.canvas.remove()}w.current=null,oe.current=null,C.current=null,re(null),Re.current=null,ye.current=null,Ge(!1)},[Y,re]);return o.useEffect(()=>{const v=u.current;if(!v)return;if(typeof ResizeObserver<"u"){const m=new ResizeObserver(()=>{Te()});return m.observe(v),()=>{m.disconnect()}}const D=()=>{Te()};return window.addEventListener("resize",D),()=>{window.removeEventListener("resize",D)}},[Te]),{canvasHostRef:u,appRef:w,spriteRef:B,textureRef:$,previewElementRef:C,filterRef:oe,isRendererReady:Ee,viewportRect:Oe,setViewportRect:re,applyFilterState:ue,createVideoTexture:v=>null,destroyPixi:je,fitCurrentSprite:t,fitSprite:i,initPixi:_e,refreshLayout:Le,resetFilterInstance:s,safeRender:ke,scheduleRefreshLayout:Te,syncSpriteFilter:Me,syncTexturePresentation:Ze}}const cr=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function ur({appRef:e,spriteRef:a,textureRef:d,previewElementRef:h,mediaRef:l,objectUrlRef:y,streamRef:c,streamOwnedRef:u,previewRequestIdRef:w,isPlayingRef:B,previewKindRef:$,audioContextRef:C,mediaSourceRef:oe,masterGainRef:F,noiseGainRef:X,isMutedRef:O,volumeRef:we,playbackRateRef:se,isLoopingRef:Ce,isAudioFxEnabled:le,lofiAmount:ce,bitCrushAmount:ye,sampleRateReductionAmount:Re,bassAmount:Ae,midAmount:Ee,trebleAmount:Ge,stereoWidthAmount:Oe,smallSpeakerRoomAmount:Ve,isMuted:re,volume:ge,previewKind:W,setPreviewName:Y,setPreviewError:G,setNeedsUserPlay:ue,setIsPlaying:Me,setCurrentTime:Ze,setDuration:s,setPlaybackRate:i,setIsLooping:t,setSourceDimensions:ke,setViewportRect:Le,setPreviewKindState:Te,setIsPoweredOn:_e,beginLoading:je,finishLoading:v,ensureAudioContext:D,updateAudioNodes:m,connectMediaAudio:z,fitSprite:K,refreshLayout:Q,scheduleRefreshLayout:V,safeRender:I,resetFilterInstance:Se,initPixi:k,resetPerfAccumulators:M,debugVideo:L,debugAudio:Fe}){const De=async()=>{cr()&&await new Promise(n=>{window.setTimeout(n,220)})},J=()=>{const n=C.current?.currentTime;if(X.current)if(typeof n=="number"){const x=X.current.gain;x.cancelScheduledValues(n),x.setValueAtTime(x.value,n),x.linearRampToValueAtTime(0,n+.03)}else X.current.gain.value=0;if(F.current)if(typeof n=="number"){const x=F.current.gain;x.cancelScheduledValues(n),x.setValueAtTime(x.value,n),x.linearRampToValueAtTime(0,n+.03)}else F.current.gain.value=0},ee=()=>{X.current&&(X.current.gain.value=0)},We=n=>n instanceof DOMException&&(n.name==="NotAllowedError"||n.name==="AbortError")?!0:n instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(n.message):!1,Je=n=>We(n)?(v(),G(""),ue(!0),ne(),I(),!0):!1,qe=(n,x,P=!0)=>{J(),n.muted=!0,n.volume=0,n.pause(),n.srcObject instanceof MediaStream&&(P&&n.srcObject.getTracks().forEach(Z=>Z.stop()),n.srcObject=null),n.src="",n.load(),x?.startsWith("blob:")&&URL.revokeObjectURL(x)},p=n=>new Promise((x,P)=>{const Z=U=>U?U.code===MediaError.MEDIA_ERR_ABORTED?"aborted":U.code===MediaError.MEDIA_ERR_NETWORK?"network":U.code===MediaError.MEDIA_ERR_DECODE?"decode":U.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${U.code}`:"unknown",R=()=>{n.removeEventListener("loadeddata",g),n.removeEventListener("canplay",g),n.removeEventListener("error",Pe)},g=()=>{R(),x()},Pe=()=>{R(),P(new Error(`動画の読み込みに失敗しました。 src=${n.currentSrc||n.src||"(empty)"} reason=${Z(n.error)}`))};if(n.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){x();return}n.addEventListener("loadeddata",g,{once:!0}),n.addEventListener("canplay",g,{once:!0}),n.addEventListener("error",Pe,{once:!0}),n.load()}),A=n=>new Promise((x,P)=>{const Z=U=>U?U.code===MediaError.MEDIA_ERR_ABORTED?"aborted":U.code===MediaError.MEDIA_ERR_NETWORK?"network":U.code===MediaError.MEDIA_ERR_DECODE?"decode":U.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${U.code}`:"unknown",R=()=>{n.removeEventListener("loadedmetadata",g),n.removeEventListener("canplay",g),n.removeEventListener("error",Pe)},g=()=>{R(),x()},Pe=()=>{R(),P(new Error(`音声の読み込みに失敗しました。 src=${n.currentSrc||n.src||"(empty)"} reason=${Z(n.error)}`))};if(n.readyState>=HTMLMediaElement.HAVE_METADATA){x();return}n.addEventListener("loadedmetadata",g,{once:!0}),n.addEventListener("canplay",g,{once:!0}),n.addEventListener("error",Pe,{once:!0}),n.load()}),N=n=>new Promise((x,P)=>{const Z=()=>{n.removeEventListener("load",R),n.removeEventListener("error",g)},R=()=>{Z(),x()},g=()=>{Z(),P(new Error("画像の読み込みに失敗しました。"))};if(n.complete&&n.naturalWidth>0&&n.naturalHeight>0){x();return}n.addEventListener("load",R,{once:!0}),n.addEventListener("error",g,{once:!0})}),Ne=n=>{n.addEventListener("play",ne),n.addEventListener("pause",ne),n.addEventListener("pause",J),n.addEventListener("abort",J),n.addEventListener("emptied",J),n.addEventListener("loadstart",J),n.addEventListener("seeking",J),n.addEventListener("stalled",J),n.addEventListener("suspend",J),n.addEventListener("waiting",J),n.addEventListener("volumechange",ne),n.addEventListener("timeupdate",ne),n.addEventListener("durationchange",ne),n.addEventListener("seeked",ne),n.addEventListener("ended",ne),n.addEventListener("ratechange",ne)},ve=n=>{n.loop=Ce.current,n.muted=O.current,n.volume=O.current?0:we.current,n.playbackRate=se.current,n.autoplay=!1,n.preload="auto",n.crossOrigin="anonymous",n instanceof HTMLVideoElement&&(n.playsInline=!0)},ne=()=>{if(!l.current){L("syncVideoState:no-media",{previewKind:$.current,hasPreviewElement:!!h.current}),B.current=!1,Me(!1),Ze(0),s(0),m(),I();return}B.current=!l.current.paused,Me(!l.current.paused),l.current.paused||v(),Ze(l.current.currentTime),s(l.current.duration||0),i(l.current.playbackRate||1),t(l.current.loop),m(),I()},q=()=>{L("cleanupPreview:start",{previewKind:$.current,hasMedia:!!l.current,hasPreviewElement:!!h.current}),J(),w.current+=1,v();const n=l.current,x=c.current,P=u.current;a.current=null,d.current=null,l.current=null,h.current=null,c.current=null,u.current=!1,oe.current?.disconnect(),oe.current=null,ue(!1),B.current=!1,Me(!1),Ze(0),s(0),Te(null),ke(null),Le(null),y.current?.startsWith("blob:")&&URL.revokeObjectURL(y.current),y.current=null,n?qe(n,void 0,P):P&&x?.getTracks().forEach(Z=>Z.stop()),I()},Xe=()=>{l.current&&(l.current.muted=!0,l.current.volume=0,l.current.pause()),J(),q(),C.current?.state==="running"&&C.current.suspend()},Be=()=>{_e(!0),e.current?.ticker.start();try{M?.()}catch{}},ut=async()=>{if(l.current)try{await D(),l.current.muted=O.current,l.current.volume=O.current?0:we.current,await l.current.play(),B.current=!0,Me(!0),G(""),ue(!1),Fe("playVideoWithAudio",{audioContextState:C.current?.state,currentTime:l.current.currentTime,isAudioFxEnabled:le,lofiAmount:ce,bitCrushAmount:ye,sampleRateReductionAmount:Re,bassAmount:Ae,midAmount:Ee,trebleAmount:Ge,stereoWidthAmount:Oe,smallSpeakerRoomAmount:Ve,isMuted:re,volume:ge}),m(),ne(),I(),V(),window.requestAnimationFrame(m)}catch(n){if(v(),We(n)){ue(!0),G("");return}ue(!1),G(n instanceof Error?n.message:"音声付き再生を開始できませんでした。")}},Ue=async()=>{if(await k(),!e.current)throw new Error("Canvas renderer is not ready yet.");return e.current},tt=async(n,x)=>{const P=await Ue();h.current=n,K(P,null,n),Te(x),ke(n instanceof HTMLVideoElement?{width:n.videoWidth,height:n.videoHeight}:{width:n.naturalWidth,height:n.naturalHeight}),I(),Q(),V(),e.current?.ticker.start()},it=async n=>{const x=n.type.startsWith("video/"),P=n.type.startsWith("audio/"),Z=n.type.startsWith("image/");if(!x&&!P&&!Z){G("動画、音声、または画像ファイルを選んでください。");return}Be(),q(),Se();const R=w.current;G(""),Y(n.name),je(x?"Loading video preview...":P?"Loading audio preview...":"Loading image preview...");let g=null;try{if(await Ue(),g=URL.createObjectURL(n),y.current=g,x||P){const U=x?document.createElement("video"):document.createElement("audio");if(U.src=g,ve(U),Ne(U),U instanceof HTMLVideoElement?await p(U):await A(U),R!==w.current){qe(U,g);return}l.current=U,U instanceof HTMLVideoElement?await tt(U,"video"):(h.current=null,Te("audio"),ke(null),Le(null),I()),await z(U),ne(),await De(),await ut(),R===w.current&&v();return}const Pe=new Image;if(Pe.src=g,Pe.crossOrigin="anonymous",await N(Pe),R!==w.current){g.startsWith("blob:")&&URL.revokeObjectURL(g);return}l.current=null,ee(),m(),await tt(Pe,"image"),ne(),R===w.current&&v()}catch(Pe){if(R!==w.current){g?.startsWith("blob:")&&URL.revokeObjectURL(g);return}if(We(Pe)){Je(Pe);return}q(),G(Pe instanceof Error?Pe.message:"動画プレビューに失敗しました。"),ue(!1)}},Dt=async()=>{if(Be(),!navigator.mediaDevices?.getDisplayMedia){G("このブラウザでは画面キャプチャーに対応していません。");return}q();const n=w.current;G(""),Y("Display Capture"),je("Preparing display capture...");try{await Ue();const x=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(n!==w.current){x.getTracks().forEach(Z=>Z.stop());return}const P=document.createElement("video");P.srcObject=x,ve(P),Ne(P),x.getVideoTracks()[0]?.addEventListener("ended",()=>{ot()}),await p(P),c.current=x,u.current=!0,l.current=P,await tt(P,"capture"),await z(P),ue(!1),await De(),await ut(),n===w.current&&v()}catch(x){if(n!==w.current||Je(x))return;q(),G(x instanceof Error?x.message:"画面キャプチャーを開始できませんでした。")}},ot=()=>{W==="capture"&&(q(),Y(""),G(""))};return{cleanupPreview:q,cleanupForPageLeave:Xe,playVideoWithAudio:ut,previewFile:it,previewStream:async(n,x="video",P="Media Stream")=>{let Z=0;try{if(Be(),q(),Se(),Z=w.current,G(""),Y(P),je(x==="video"?"Loading stream preview...":"Loading stream audio..."),await Ue(),x==="video"){const R=document.createElement("video");if(R.srcObject=n,ve(R),Ne(R),await p(R),Z!==w.current){qe(R,void 0,!1);return}c.current=n,u.current=!1,l.current=R,await tt(R,"capture"),await z(R)}else{const R=document.createElement("audio");if(R.srcObject=n,ve(R),Ne(R),await A(R),Z!==w.current){qe(R,void 0,!1);return}c.current=n,u.current=!1,l.current=R,h.current=null,Te("audio"),ke(null),Le(null),I(),await z(R),ne()}if(Z!==w.current)return;await De(),await ut(),Z===w.current&&v()}catch(R){if(Z!==w.current||Je(R))return;q(),G(R instanceof Error?R.message:String(R))}},previewUrl:async(n,x="video")=>{let P=0;const Z=typeof performance<"u"?performance.now():Date.now(),R=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-Z)*10)/10;try{if(L("startup:previewUrl:start",{url:n,kind:x}),Be(),q(),Se(),P=w.current,G(""),Y(n),je(x==="video"?"Loading video preview...":x==="image"?"Loading image preview...":"Loading audio preview..."),await Ue(),L("startup:previewUrl:renderer-ready",{kind:x,elapsedMs:R()}),x==="video"){const g=document.createElement("video");if(g.src=n,ve(g),Ne(g),await p(g),L("startup:previewUrl:video-ready",{elapsedMs:R(),readyState:g.readyState,videoWidth:g.videoWidth,videoHeight:g.videoHeight}),P!==w.current){qe(g,n);return}l.current=g,await tt(g,"video"),await z(g),ne()}else if(x==="image"){const g=new Image;if(g.src=n,g.crossOrigin="anonymous",await N(g),L("startup:previewUrl:image-ready",{elapsedMs:R(),naturalWidth:g.naturalWidth,naturalHeight:g.naturalHeight}),P!==w.current)return;l.current=null,ee(),m(),await tt(g,"image"),ne()}else{const g=document.createElement("audio");if(g.src=n,ve(g),Ne(g),await A(g),L("startup:previewUrl:audio-ready",{elapsedMs:R(),readyState:g.readyState,duration:g.duration}),P!==w.current){qe(g,n);return}h.current=null,Te("audio"),ke(null),Le(null),l.current=g,I(),await z(g),ne()}if(P!==w.current)return;(x==="video"||x==="audio")&&(await De(),await ut()),P===w.current&&(v(),L("startup:previewUrl:done",{kind:x,elapsedMs:R()}))}catch(g){if(L("startup:previewUrl:error",{kind:x,elapsedMs:R(),error:g instanceof Error?g.message:String(g)}),P!==w.current||Je(g))return;q(),G(g instanceof Error?g.message:String(g))}},startDisplayCapture:Dt,stopDisplayCapture:ot,syncVideoState:ne,releaseDetachedMedia:qe,ensurePixiReady:Ue}}let dr=0;const xo=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),wo=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),hr=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function mr(e,a,d=1){const h=o.useRef(`player-${dr+=1}`),l=o.useRef(null),y=o.useRef(null),c=o.useRef(!1),u=o.useRef(null),w=o.useRef(null),B=o.useRef([]),$=o.useRef(null),C=o.useRef(null),oe=o.useRef(null),F=o.useRef(null),X=o.useRef(null),O=o.useRef(0),we=o.useRef(!1),se=o.useRef(null),Ce=o.useRef(!1),[le,ce]=o.useState(""),[ye,Re]=o.useState(""),[Ae,Ee]=o.useState(!0),[Ge,Oe]=o.useState(""),[Ve,re]=o.useState(!1),[ge,W]=o.useState(!1),[Y,G]=o.useState(!1),[ue,Me]=o.useState(0),[Ze,s]=o.useState(0),[i,t]=o.useState(null),[ke,Le]=o.useState(null),[Te,_e]=o.useState(!1),[je,v]=o.useState(null),D=(f,S)=>{if(!hr())return;const j=S?` ${JSON.stringify(S)}`:"";console.log(`[retro-player video][${h.current}] ${f}${j}`)},m=lr({filterState:e,fitMode:a,renderResolutionScale:d,isPoweredOn:Ae,isPlayingRef:we,previewKindRef:se,debugVideo:D}),{canvasHostRef:z,appRef:K,spriteRef:Q,textureRef:V,previewElementRef:I,filterRef:Se,isRendererReady:k,viewportRect:M,setViewportRect:L,applyFilterState:Fe,destroyPixi:De,fitSprite:J,initPixi:ee,refreshLayout:We,resetFilterInstance:Je,safeRender:qe,scheduleRefreshLayout:p,syncSpriteFilter:A,syncTexturePresentation:N}=m,Ne=o.useRef(ee),ve=o.useRef(De),ne=Jo({instanceLabel:h.current,previewKind:i,previewKindRef:se,mediaRef:u,isPlaying:Y,isPlayingRef:we}),{audioContextRef:q,mediaSourceRef:Xe,masterGainRef:Be,recordingDestinationRef:ut,noiseGainRef:Ue,isMutedRef:tt,volumeRef:it,playbackRateRef:Dt,isLoopingRef:ot,isMuted:kt,setIsMuted:dt,playbackRate:n,setPlaybackRate:x,volume:P,setVolume:Z,isLooping:R,setIsLooping:g,isAudioFxEnabled:Pe,setIsAudioFxEnabled:U,lofiAmount:Ft,setLofiAmount:Bt,radioToneAmount:_t,setRadioToneAmount:Pt,bitCrushAmount:Wt,setBitCrushAmount:It,sampleRateReductionAmount:Nt,setSampleRateReductionAmount:Et,bassAmount:zt,setBassAmount:Qt,midAmount:Ot,setMidAmount:eo,trebleAmount:St,setTrebleAmount:Zt,stereoWidthAmount:jt,setStereoWidthAmount:to,smallSpeakerRoomAmount:Xt,setSmallSpeakerRoomAmount:oo,wowFlutterAmount:r,setWowFlutterAmount:_,isNoiseEnabled:de,setIsNoiseEnabled:E,noiseLevel:te,setNoiseLevel:be,vinylDustAmount:he,setVinylDustAmount:ie,debugAudio:me,ensureAudioContext:xe,updateAudioNodes:pe,connectMediaAudio:ae,reconnectCurrentMediaAudio:ze,resetAudioSettings:$e,disposeAudioEngine:bt}=ne;o.useEffect(()=>{Ne.current=ee,ve.current=De},[ee,De]);const ht=f=>{se.current=f,t(f)},yt=f=>{Oe(f),re(!0)},Ye=()=>{re(!1),Oe("")},mt=()=>{Ee(!0),K.current?.ticker.start()},Rt=()=>{u.current&&u.current.pause(),Ue.current&&(Ue.current.gain.value=0),Be.current&&(Be.current.gain.value=0),Ye(),W(!1),Ee(!1),K.current?.ticker.stop(),Ie()},xt=ur({filterState:e,appRef:K,spriteRef:Q,textureRef:V,previewElementRef:I,filterRef:Se,mediaRef:u,objectUrlRef:l,streamRef:y,streamOwnedRef:c,previewRequestIdRef:O,isPlayingRef:we,previewKindRef:se,audioContextRef:q,mediaSourceRef:Xe,masterGainRef:Be,noiseGainRef:Ue,isMutedRef:tt,volumeRef:it,playbackRateRef:Dt,isLoopingRef:ot,isAudioFxEnabled:Pe,lofiAmount:Ft,bitCrushAmount:Wt,sampleRateReductionAmount:Nt,bassAmount:zt,midAmount:Ot,trebleAmount:St,stereoWidthAmount:jt,smallSpeakerRoomAmount:Xt,isMuted:kt,volume:P,previewKind:i,setPreviewName:ce,setPreviewError:Re,setNeedsUserPlay:W,setIsPlaying:G,setCurrentTime:Me,setDuration:s,setPlaybackRate:x,setIsLooping:g,setSourceDimensions:Le,setViewportRect:L,setPreviewKindState:ht,setIsPoweredOn:Ee,beginLoading:yt,finishLoading:Ye,ensureAudioContext:xe,updateAudioNodes:pe,connectMediaAudio:ae,fitSprite:J,refreshLayout:We,scheduleRefreshLayout:p,safeRender:qe,resetFilterInstance:Je,initPixi:ee,debugVideo:D,debugAudio:me}),{cleanupPreview:wt,cleanupForPageLeave:pt,playVideoWithAudio:Qe,previewFile:st,previewStream:et,previewUrl:gt,startDisplayCapture:rt,stopDisplayCapture:ft,syncVideoState:Ie}=xt,lt=async()=>{if(u.current){if(u.current.paused){Ae||mt(),await Qe(),Ie();return}u.current.pause(),Ie()}},vt=()=>{u.current&&dt(f=>{const S=!f;return tt.current=S,window.requestAnimationFrame(pe),S})},Ke=f=>{u.current&&(u.current.currentTime=f,Me(f))},Ct=f=>{if(!u.current)return;const S=1/30,j=Math.max(0,Math.min(u.current.currentTime+S*f,u.current.duration||u.current.currentTime+S));u.current.pause(),u.current.currentTime=j,Ie()},Mt=f=>{u.current&&(u.current.playbackRate=f,Dt.current=f,x(f))},Ut=f=>{u.current&&(it.current=f,tt.current=f===0,Z(f),dt(f===0),window.requestAnimationFrame(pe))},Ht=()=>{u.current&&(u.current.loop=!u.current.loop,ot.current=u.current.loop,g(u.current.loop))},ro=f=>{ot.current=f,g(f),u.current&&(u.current.loop=f)},Lt=()=>{if(!C.current||typeof window>"u"){oe.current=null,F.current=null;return}window.URL.revokeObjectURL(C.current),C.current=null,oe.current=null,F.current=null},no=(f,S)=>{if(typeof document>"u")return;const j=document.createElement("a");j.href=f,j.download=S,j.rel="noopener",j.style.display="none",document.body.appendChild(j),j.click(),window.setTimeout(()=>{j.remove()},0)},Gt=(f,S)=>{if(typeof window>"u"||f.length===0)return null;Lt();const j=new Blob(f,{type:S||"video/webm"}),ct=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,at=window.URL.createObjectURL(j);return C.current=at,oe.current=j,F.current=ct,v(ct),ct},Yt=()=>{const f=C.current,S=F.current;!f||!S||typeof window>"u"||(no(f,S),window.setTimeout(()=>{Lt()},1e3),v(null))},Kt=async()=>{const f=oe.current,S=F.current;if(!f||!S||typeof window>"u")return!1;if(xo()){const ct=new Uint8Array(await f.arrayBuffer()),at=await yo("persist_recording_for_share",{data:Array.from(ct),filename:S});return await Oo(at,{mimeType:f.type||"video/webm",title:S}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const nt={files:[new File([f],S,{type:f.type||"video/webm"})],title:S};return typeof navigator.canShare=="function"&&!navigator.canShare(nt)?!1:(await navigator.share(nt),!0)},ao=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(S=>MediaRecorder.isTypeSupported(S))??"",H=async()=>{const f=K.current?.canvas;if(!(f instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await xe();const S=new MediaStream;f.captureStream(30).getVideoTracks().forEach(at=>S.addTrack(at)),ut.current?.stream.getAudioTracks().forEach(at=>S.addTrack(at.clone()));const nt=ao(),ct=nt?new MediaRecorder(S,{mimeType:nt}):new MediaRecorder(S);B.current=[],Lt(),v(null),$.current=S,w.current=ct,ct.addEventListener("dataavailable",at=>{at.data.size>0&&B.current.push(at.data)}),ct.addEventListener("stop",()=>{const at=Gt(B.current,ct.mimeType);B.current=[],$.current?.getTracks().forEach(Ro=>Ro.stop()),$.current=null,w.current=null,_e(!1),X.current?.(at),X.current=null},{once:!0}),ct.start(),_e(!0)},Tt=(f=!0)=>{const S=w.current;return S?new Promise(j=>{if(X.current=j,f||(B.current=[]),S.state!=="inactive"){S.stop();return}$.current?.getTracks().forEach(nt=>nt.stop()),$.current=null,w.current=null,_e(!1),X.current?.(F.current),X.current=null}):Promise.resolve(F.current)};return o.useEffect(()=>{let f=!1;return(async()=>(D("startup:setupPixi-effect:start",{renderResolutionScale:d}),await Ne.current(),f&&ve.current()))(),()=>{Lt(),Tt(!1),f=!0,wt(),bt(),ve.current()}},[d]),o.useEffect(()=>{const f=()=>{pt()};return window.addEventListener("beforeunload",f),()=>{window.removeEventListener("beforeunload",f)}},[]),o.useEffect(()=>{const f=()=>{u.current&&(u.current.muted=!0,u.current.volume=0,u.current.pause(),Ie())};return window.addEventListener(mo,f),()=>{window.removeEventListener(mo,f)}},[Ie]),o.useEffect(()=>{if(!wo())return;const f=j=>j==="video"||j==="audio"||j==="capture",S=()=>{const j=u.current;if(!(!j||!f(se.current))){if(document.visibilityState==="hidden"){Ce.current=!j.paused,j.pause(),we.current=!1,G(!1),Ue.current&&(Ue.current.gain.value=0),Be.current&&(Be.current.gain.value=0),q.current?.state==="running"&&q.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await xe(),ze(),pe(),Ce.current&&u.current)try{await u.current.play(),W(!1)}catch(nt){nt instanceof DOMException&&nt.name==="NotAllowedError"&&W(!0)}}finally{Ie(),Ce.current=!1}})()},80)}};return document.addEventListener("visibilitychange",S),()=>{document.removeEventListener("visibilitychange",S)}},[q,xe,Be,Ue,ze,Ie,pe]),o.useLayoutEffect(()=>{Fe(),A(),N(),We()},[e.colorLevels,e.curvature,e.ditherStrength,e.isFilterEnabled,e.monoTint,e.neonBoost,e.neonDetail,e.neonSaturation,e.paletteMode,e.phosphorStrength,e.spotMaskStrength,e.bulbRadius,e.blackFloor,e.selectedPreset,e.closeUpNoiseStrength,e.scanlineBrightnessFade,e.scanlineStrength,e.scanline2Strength,e.targetHeight,e.targetWidth,e.vignetteStrength,e.glowStrength,We]),o.useEffect(()=>{if(ye||ge){Ye();return}if(i==="image"||i==="audio"){Ye();return}Y&&Ye()},[ye,ge,i,Y]),o.useEffect(()=>{we.current=Y;const f=(i==="video"||i==="capture")&&u.current?.tagName==="VIDEO",S=!u.current||Math.abs(u.current.currentTime)<.05,j=u.current?.ended??!1;f&&Ye(),f&&!Y&&!ye&&!j&&(q.current?.state==="suspended"||S)&&W(!0)},[q,Y,ye,i]),o.useEffect(()=>{const f=S=>{if(!u.current)return;const j=S.target;if(!(j instanceof HTMLInputElement||j instanceof HTMLTextAreaElement||j?.isContentEditable)){if(S.code==="Space"||S.code==="KeyK"){S.preventDefault(),lt();return}if(S.code==="KeyJ"){S.preventDefault(),Ke(Math.max(u.current.currentTime-10,0));return}if(S.code==="KeyL"){S.preventDefault(),Ke(Math.min(u.current.currentTime+10,u.current.duration||u.current.currentTime+10));return}if(S.code==="ArrowLeft"){S.preventDefault(),Ke(Math.max(u.current.currentTime-5,0));return}S.code==="ArrowRight"&&(S.preventDefault(),Ke(Math.min(u.current.currentTime+5,u.current.duration||u.current.currentTime+5)))}};return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[]),{canvasHostRef:z,previewName:le,previewError:ye,isRendererReady:k,loadingLabel:Ge,isLoading:Ve,needsUserPlay:ge,isPlaying:Y,isMuted:kt,currentTime:ue,duration:Ze,playbackRate:n,volume:P,isLooping:R,sourceDimensions:ke,viewportRect:M,isAudioFxEnabled:Pe,lofiAmount:Ft,radioToneAmount:_t,bitCrushAmount:Wt,sampleRateReductionAmount:Nt,bassAmount:zt,midAmount:Ot,trebleAmount:St,stereoWidthAmount:jt,smallSpeakerRoomAmount:Xt,wowFlutterAmount:r,isNoiseEnabled:de,noiseLevel:te,vinylDustAmount:he,hasPlayableMedia:i==="video"||i==="audio"||i==="capture",hasVideo:i==="video"||i==="capture",hasAudioOnly:i==="audio",hasImage:i==="image",isRecording:Te,pendingRecordingFilename:je,prefersShareExport:xo()&&wo(),isCaptureActive:i==="capture",canRecord:i==="video"||i==="capture"||i==="image"||i==="audio",previewFile:st,previewStream:et,previewUrl:gt,startDisplayCapture:rt,stopDisplayCapture:ft,togglePlayback:lt,toggleMute:vt,seekTo:Ke,stepFrame:Ct,changePlaybackRate:Mt,changeVolume:Ut,toggleLoop:Ht,setLoopingEnabled:ro,resetAudioSettings:$e,playVideoWithAudio:Qe,isPoweredOn:Ae,powerOn:mt,powerOff:Rt,downloadPendingRecording:Yt,sharePendingRecording:Kt,startRecording:H,stopRecording:Tt,refreshLayout:We,toggleAudioFx:()=>{U(f=>!f)},setLofiAmount:Bt,setRadioToneAmount:Pt,setBitCrushAmount:It,setSampleRateReductionAmount:Et,setBassAmount:Qt,setMidAmount:eo,setTrebleAmount:Zt,setStereoWidthAmount:to,setSmallSpeakerRoomAmount:oo,setWowFlutterAmount:_,toggleNoise:()=>{E(f=>!f)},setNoiseLevel:be,setVinylDustAmount:ie}}const fe=Vt.pc98_512,Co=(e,a,d)=>((d?.ignoreDimensions??!1)||a.width===e.targetWidth&&a.height===e.targetHeight)&&a.colors===e.colorLevels&&a.dither===e.ditherStrength&&a.palette===e.paletteMode&&a.curvature===e.curvature&&a.scanline===e.scanlineStrength&&a.scanline2===e.scanline2Strength&&a.vignette===e.vignetteStrength&&a.glow===e.glowStrength&&a.phosphor===e.phosphorStrength&&a.spotMask===e.spotMaskStrength&&a.bulbRadius===e.bulbRadius&&a.blackFloor===e.blackFloor&&(a.phosphorDotLightBalance??1)===e.phosphorDotLightBalance&&(a.phosphorDotInternalScale??!1)===e.phosphorDotInternalScale&&(a.phosphorDotBrightCore??!1)===e.phosphorDotBrightCore&&(a.phosphorDotCellFill??0)===e.phosphorDotCellFill&&(a.phosphorDotFlatDisc??!1)===e.phosphorDotFlatDisc&&(a.phosphorDotNeighborBlend??!1)===e.phosphorDotNeighborBlend&&a.monoTint===e.monoTint&&a.neonBoost===e.neonBoost&&a.neonSaturation===e.neonSaturation&&a.neonDetail===e.neonDetail,so=e=>{for(const[a,d]of Object.entries(Vt))if(Co(e,d))return a;if(!e.matchTargetAspect)return null;for(const[a,d]of Object.entries(Vt))if(Co(e,d,{ignoreDimensions:!0}))return a;return null},pr=(e,a)=>e==="pc98"||e==="pc98_tile"||e==="pc98_4096"?16:e==="pc98_512"||e==="pc98_512_sat"?8:e==="color32"?32:e==="color64"?64:a;function gr(e={}){const[a]=o.useState(()=>({targetWidth:e.targetWidth??fe.width,targetHeight:e.targetHeight??fe.height,matchTargetAspect:e.matchTargetAspect??!0,colorLevels:e.colorLevels??fe.colors,ditherStrength:e.ditherStrength??fe.dither,paletteMode:e.paletteMode??fe.palette,curvature:e.curvature??fe.curvature,scanlineStrength:e.scanlineStrength??fe.scanline,scanline2Strength:e.scanline2Strength??fe.scanline2,scanlineBrightnessFade:e.scanlineBrightnessFade??.6,vignetteStrength:e.vignetteStrength??fe.vignette,glowStrength:e.glowStrength??fe.glow,phosphorStrength:e.phosphorStrength??fe.phosphor,spotMaskStrength:e.spotMaskStrength??fe.spotMask,bulbRadius:e.bulbRadius??fe.bulbRadius,blackFloor:e.blackFloor??fe.blackFloor,phosphorDotLightBalance:e.phosphorDotLightBalance??fe.phosphorDotLightBalance??1,phosphorDotInternalScale:e.phosphorDotInternalScale??fe.phosphorDotInternalScale??!1,phosphorDotBrightCore:e.phosphorDotBrightCore??fe.phosphorDotBrightCore??!1,phosphorDotCellFill:e.phosphorDotCellFill??fe.phosphorDotCellFill??0,phosphorDotFlatDisc:e.phosphorDotFlatDisc??fe.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:e.phosphorDotNeighborBlend??fe.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:e.closeUpNoiseStrength??0,monoTint:e.monoTint??fe.monoTint,neonBoost:e.neonBoost??fe.neonBoost,neonSaturation:e.neonSaturation??fe.neonSaturation,neonDetail:e.neonDetail??fe.neonDetail,isFilterEnabled:e.isFilterEnabled??!0})),[d]=o.useState(()=>({...a,...ho()?.filter,...e})),[h,l]=o.useState(d),[y,c]=o.useState(so(d)),u=i=>{c(null),l(t=>t.targetWidth===i?t:{...t,targetWidth:i})},w=i=>{c(null),l(t=>t.targetHeight===i?t:{...t,targetHeight:i})},B=i=>{c(null),l(t=>t.matchTargetAspect===i?t:{...t,matchTargetAspect:i})},$=i=>{c(null),l(t=>({...t,colorLevels:i}))},C=i=>{c(null),l(t=>({...t,ditherStrength:i}))},oe=i=>{c(null),l(t=>({...t,paletteMode:i,colorLevels:pr(i,t.colorLevels)}))},F=i=>{c(null),l(t=>({...t,curvature:i}))},X=i=>{c(null),l(t=>({...t,scanlineStrength:i}))},O=i=>{c(null),l(t=>({...t,scanline2Strength:i}))},we=i=>{c(null),l(t=>({...t,scanlineBrightnessFade:i}))},se=i=>{c(null),l(t=>({...t,vignetteStrength:i}))},Ce=i=>{c(null),l(t=>({...t,glowStrength:i}))},le=i=>{c(null),l(t=>({...t,phosphorStrength:i}))},ce=i=>{c(null),l(t=>({...t,spotMaskStrength:i}))},ye=i=>{c(null),l(t=>({...t,bulbRadius:i}))},Re=i=>{c(null),l(t=>({...t,blackFloor:i}))},Ae=i=>{c(null),l(t=>({...t,phosphorDotLightBalance:i}))},Ee=i=>{c(null),l(t=>({...t,phosphorDotInternalScale:i}))},Ge=i=>{c(null),l(t=>({...t,phosphorDotBrightCore:i}))},Oe=i=>{c(null),l(t=>({...t,phosphorDotCellFill:i}))},Ve=i=>{c(null),l(t=>({...t,phosphorDotFlatDisc:i}))},re=i=>{c(null),l(t=>({...t,phosphorDotNeighborBlend:i}))},ge=i=>{c(null),l(t=>({...t,closeUpNoiseStrength:i}))},W=i=>{c(null),l(t=>({...t,monoTint:i}))},Y=i=>{c(null),l(t=>({...t,neonBoost:i}))},G=i=>{c(null),l(t=>({...t,neonSaturation:i}))},ue=i=>{c(null),l(t=>({...t,neonDetail:i}))},Me=i=>{l(t=>({...t,isFilterEnabled:i}))},Ze=i=>{const t=Vt[i];c(i),l(ke=>({...ke,targetWidth:t.width,targetHeight:t.height,colorLevels:t.colors,ditherStrength:t.dither,paletteMode:t.palette,curvature:t.curvature,scanlineStrength:t.scanline,scanline2Strength:t.scanline2,vignetteStrength:t.vignette,glowStrength:t.glow,phosphorStrength:t.phosphor,spotMaskStrength:t.spotMask,bulbRadius:t.bulbRadius,blackFloor:t.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??!1,monoTint:t.monoTint,neonBoost:t.neonBoost,neonSaturation:t.neonSaturation,neonDetail:t.neonDetail,isFilterEnabled:!0}))},s=()=>{c(so(a)),l(a)};return o.useEffect(()=>{Zo(h)},[h]),o.useEffect(()=>{const i=so(h);c(t=>t===i?t:i)},[h]),{...h,selectedPreset:y,setTargetWidth:u,setTargetHeight:w,setMatchTargetAspect:B,setColorLevels:$,setDitherStrength:C,setPaletteMode:oe,setCurvature:F,setScanlineStrength:X,setScanline2Strength:O,setScanlineBrightnessFade:we,setVignetteStrength:se,setGlowStrength:Ce,setPhosphorStrength:le,setSpotMaskStrength:ce,setBulbRadius:ye,setBlackFloor:Re,setPhosphorDotLightBalance:Ae,setPhosphorDotInternalScale:Ee,setPhosphorDotBrightCore:Ge,setPhosphorDotCellFill:Oe,setPhosphorDotFlatDisc:Ve,setPhosphorDotNeighborBlend:re,setCloseUpNoiseStrength:ge,setMonoTint:W,setNeonBoost:Y,setNeonSaturation:G,setNeonDetail:ue,setIsFilterEnabled:Me,applyPreset:Ze,resetSettings:s}}const fr=T.lazy(()=>So(()=>import("./VideoControls-DB7cLLrh.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(e=>({default:e.VideoControls}))),vr=T.lazy(()=>So(()=>import("./RetroFilterPanel-C_yDhY0p.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(e=>({default:e.RetroFilterPanel})));function Ao({locale:e="en",src:a,stream:d,streamName:h,kind:l="video",looping:y,className:c,onError:u,initialFilterState:w}){const B=e==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},$=T.useMemo(()=>ho()?.ui,[]),[C,oe]=T.useState($?.isPreviewMaximized??!1),[F,X]=T.useState($?.isHighResolution??!1),[O,we]=T.useState(!1),[se,Ce]=T.useState(!1),[le,ce]=T.useState(!1),[ye,Re]=T.useState(0),[Ae,Ee]=T.useState(null),Ge=T.useRef(null),Oe=T.useRef(null),Ve=T.useRef(null),re=T.useRef(null),[ge,W]=T.useState(null),Y=T.useRef(""),G=T.useRef(""),[ue,Me]=T.useState("playback"),{showConfirmDialog:Ze}=Mo(),s=gr(w),i=F&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,t=mr(s,O?"width":"contain",i),ke=l==="image"&&!!a&&!t.previewError&&(!t.isRendererReady||t.isLoading),Le=b.jsx("div",{className:"flex min-h-[6rem] items-center justify-center text-sm text-slate-400",children:"Preparing controls..."}),Te=T.useCallback(()=>{Yo(),s.resetSettings(),t.resetAudioSettings(),oe(!1),X(!1)},[s,t]),_e=T.useCallback(()=>{if(!t.sourceDimensions)return;const p=Math.max(8,Math.round(s.targetWidth/t.sourceDimensions.width*t.sourceDimensions.height/8)*8);p!==s.targetHeight&&s.setTargetHeight(p)},[s.targetHeight,s.targetWidth,s.setTargetHeight,t.sourceDimensions]),je=T.useCallback(()=>t.sourceDimensions?.width&&t.sourceDimensions?.height?t.sourceDimensions.width/t.sourceDimensions.height:Math.max(s.targetWidth,1)/Math.max(s.targetHeight,1),[s.targetHeight,s.targetWidth,t.sourceDimensions]),v=T.useCallback(p=>{if(s.setTargetWidth(p),!s.matchTargetAspect)return;const A=Math.max(je(),1e-4);s.setTargetHeight(Math.max(1,Math.round(p/A)))},[s,je]),D=T.useCallback(p=>{if(s.setTargetHeight(p),!s.matchTargetAspect)return;const A=Math.max(je(),1e-4);s.setTargetWidth(Math.max(1,Math.round(p*A)))},[s,je]),m=T.useCallback(p=>{s.setMatchTargetAspect(p),p&&t.sourceDimensions&&_e()},[s,t.sourceDimensions,_e]);T.useEffect(()=>{s.matchTargetAspect&&t.sourceDimensions&&_e()},[s.matchTargetAspect,t.sourceDimensions,_e]);const z=T.useCallback(p=>{if(s.applyPreset(p),p!=="phosphorDot"||!t.sourceDimensions)return;const A=Vt.phosphorDot,N=Math.max(t.sourceDimensions.width,1),Ne=Math.max(t.sourceDimensions.height,1),ve=N/Ne,ne=A.width/A.height;let q=A.width,Xe=A.height;ve>ne?Xe=Math.max(8,Math.round(A.width/ve/8)*8):q=Math.max(8,Math.round(A.height*ve/8)*8),!(A.width===q&&A.height===Xe)&&(s.setTargetWidth(q),s.setTargetHeight(Xe))},[s.applyPreset,s.setTargetHeight,s.setTargetWidth,t.sourceDimensions]),K=T.useCallback(()=>{if(d&&t.isCaptureActive){window.setTimeout(()=>{t.previewStream(d,l==="audio"?"audio":"video",h)},120);return}window.requestAnimationFrame(()=>{t.refreshLayout(),window.requestAnimationFrame(()=>{t.refreshLayout()})})},[l,t,d,h]),Q="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",V="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",I="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",Se="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",k=T.useCallback(p=>{re.current!==null&&window.clearTimeout(re.current),re.current=window.setTimeout(()=>{Ee(p),re.current=null},120)},[]),M=T.useCallback(()=>{re.current!==null&&(window.clearTimeout(re.current),re.current=null),Ee(null)},[]),L=T.useCallback(()=>{const p=Ge.current,A=Ve.current;if(!p||!A)return null;const N=p.getBoundingClientRect(),Ne=A.getBoundingClientRect();return{left:N.left,width:N.width,height:Ne.height}},[]),Fe=T.useCallback((p,A,N="w-44")=>b.jsx("div",{role:"tooltip","aria-hidden":Ae!==p,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",N,Ae===p?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:A}),[Ae]);T.useEffect(()=>{if(d){const A=`stream:${d.id}:${l}:${h??""}:${i}`;if(Y.current===A)return;Y.current=A,(async()=>{try{await t.previewStream(d,l==="audio"?"audio":"video",h)}catch(N){if(N instanceof Error){u?.(N);return}u?.(new Error(String(N)))}})();return}if(!a){Y.current="";return}const p=`src:${a}:${l}:${i}`;Y.current!==p&&(Y.current=p,(async()=>{try{await t.previewUrl(a,l)}catch(A){if(A instanceof Error){u?.(A);return}u?.(new Error(String(A)))}})())},[a,d,h,l,u,t,i]),T.useEffect(()=>{Xo({isPreviewMaximized:C,isHighResolution:F})},[F,C]),T.useEffect(()=>()=>{re.current!==null&&window.clearTimeout(re.current)},[]),T.useEffect(()=>{if(!C)return;const p=document.body.style.overflow,A=N=>{N.code==="Escape"&&oe(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",A),()=>{document.body.style.overflow=p,window.removeEventListener("keydown",A)}},[C]),T.useEffect(()=>{C&&(Ce(!1),ce(!1),Re(0),W(null))},[C]),T.useEffect(()=>{if(ue!=="video-settings"||C||se){ce(!1),Re(0);return}const p=()=>{const A=Oe.current,N=Ve.current;if(!A||!N)return;const Ne=A.getBoundingClientRect().top,ve=N.getBoundingClientRect().height,ne=Math.round(Math.min(ve,window.innerHeight)*.4),q=-Math.max(120,ne);ce(Xe=>{if(!Xe&&Ne<=q){Re(Math.max(120,ne));const Be=L();return Be&&W(Be),!0}return Xe&&Re(Math.max(120,ne)),Xe&&Ne>=-24?(Re(0),!1):Xe})};return p(),window.addEventListener("scroll",p,{passive:!0}),window.addEventListener("resize",p),()=>{window.removeEventListener("scroll",p),window.removeEventListener("resize",p)}},[ue,C,se,L]),T.useEffect(()=>{if(!((se||le)&&!C)){W(null);return}const A=()=>{const N=L();N&&W(N)};return A(),window.addEventListener("resize",A),window.addEventListener("scroll",A,{passive:!0}),()=>{window.removeEventListener("resize",A),window.removeEventListener("scroll",A)}},[le,C,se,O,L,t.sourceDimensions]),T.useEffect(()=>{t.refreshLayout()},[O,se,C,t.refreshLayout,t.sourceDimensions?.height,t.sourceDimensions?.width]),T.useEffect(()=>{t.refreshLayout()},[s.targetWidth,s.targetHeight,s.isFilterEnabled,i,t.refreshLayout]),T.useEffect(()=>{if(typeof y!="boolean")return;const p=d?`stream:${d.id}:${l}`:a?`src:${a}:${l}`:"";if(!p){G.current="";return}const A=`${p}:${y}`;G.current!==A&&(G.current=A,t.setLoopingEnabled(y))},[l,y,t,a,d]);const De=!C&&t.viewportRect&&t.sourceDimensions&&(O||t.sourceDimensions.width>t.sourceDimensions.height)?Math.max(280,Math.ceil(t.viewportRect.height+24)):null,J=De?`${De}px`:"60vh",ee=T.useMemo(()=>{if(!(!O||!t.sourceDimensions))return`${t.sourceDimensions.width} / ${t.sourceDimensions.height}`},[O,t.sourceDimensions]),We=(se||le)&&!C,Je=le?`calc(max(0.0rem, env(safe-area-inset-top)) - ${ye}px)`:void 0,qe=T.useMemo(()=>{if(!We||!O||!t.sourceDimensions||!ge||typeof window>"u")return;const p=Math.max(t.sourceDimensions.width/Math.max(t.sourceDimensions.height,1),1e-4),A=ge.width/p,N=Math.max(220,Math.round(window.innerHeight*.68));return`${Math.min(A,N)}px`},[O,We,ge,t.sourceDimensions]);return b.jsx("section",{className:c??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:b.jsxs("div",{ref:Ge,className:"space-y-4",children:[b.jsx("div",{ref:Oe,"aria-hidden":"true"}),b.jsxs("div",{ref:Ve,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${C?`fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 ${O?"overflow-y-auto":"flex items-stretch justify-stretch"}`:We?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":""}`,style:We&&ge?{left:`${ge.left}px`,top:Je??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${ge.width}px`}:void 0,children:[C&&b.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{oe(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:b.jsx(po,{size:18})}),b.jsxs("div",{className:`relative ${C?O?"w-full":"h-full min-h-0 w-full":"w-full min-w-0"}`,style:C?O&&ee?{aspectRatio:ee,minHeight:"220px"}:void 0:{aspectRatio:ee,height:ee?qe:J,minHeight:"220px"},children:[b.jsxs("div",{className:"relative h-full w-full overflow-hidden rounded-xl bg-slate-950",children:[ke&&b.jsx("img",{src:a,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),b.jsx("div",{ref:t.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!t.isPoweredOn&&b.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/72",children:b.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[b.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),b.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),t.isLoading&&!t.needsUserPlay&&!t.previewError&&b.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",ke?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:b.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[b.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),b.jsx("p",{className:"font-medium",children:t.loadingLabel||"Loading preview..."}),b.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),t.needsUserPlay&&!t.isLoading&&b.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:b.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[b.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),b.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),b.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),b.jsx("button",{type:"button",onClick:()=>{t.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),t.hasAudioOnly&&b.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),b.jsxs("div",{className:"absolute -bottom-8 right-3 z-20 flex items-center gap-2",children:[t.canRecord&&b.jsx(b.Fragment,{children:b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":t.isRecording?"Stop recording":"Start recording",onClick:()=>{M(),(async()=>{if(t.isRecording)try{if(!await t.stopRecording())return;const A=t.prefersShareExport;if(!await Ze({title:"Recording ready",body:A?"Share the recorded clip now?":"Save the recorded clip now?",okText:A?"Share":"Save",cancelText:"Cancel"}))return;if(A){await t.sharePendingRecording()||t.downloadPendingRecording();return}t.downloadPendingRecording();return}catch(p){if(p instanceof Error){u?.(p);return}u?.(new Error(String(p)));return}try{await t.startRecording()}catch(p){if(p instanceof Error){u?.(p);return}u?.(new Error(String(p)))}})()},onMouseEnter:()=>k("record"),onMouseLeave:M,onFocus:()=>k("record"),onBlur:M,className:[Se,t.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:t.isRecording?b.jsx(zo,{size:14,className:"fill-current animate-pulse"}):b.jsx(Eo,{size:16,className:"text-rose-300"})}),Fe("record",t.isRecording?B.recordStop:B.recordIdle)]})}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":t.isPoweredOn?"Power off":"Power on",onClick:()=>{if(M(),t.isPoweredOn){t.powerOff();return}t.powerOn()},onMouseEnter:()=>k("power"),onMouseLeave:M,onFocus:()=>k("power"),onBlur:M,className:[Q,t.isPoweredOn?V:I].join(" "),children:b.jsx(Ho,{size:16})}),Fe("power",t.isPoweredOn?B.powerOff:B.powerOn)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":F?"Disable high resolution":"Enable high resolution",onClick:()=>{M(),X(p=>!p)},onMouseEnter:()=>k("hi-res"),onMouseLeave:M,onFocus:()=>k("hi-res"),onBlur:M,className:[Q,F?V:I].join(" "),children:b.jsx(Do,{size:16})}),Fe("hi-res",B.hiRes)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":O?"Disable fit width":"Enable fit width",onClick:()=>{M(),we(p=>!p),K()},onMouseEnter:()=>k("fit-width"),onMouseLeave:M,onFocus:()=>k("fit-width"),onBlur:M,className:[Q,O?V:I].join(" "),children:b.jsx(Po,{size:16})}),Fe("fit-width",O?B.fitWidthOn:B.fitWidthOff)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{M(),K()},onMouseEnter:()=>k("refit"),onMouseLeave:M,onFocus:()=>k("refit"),onBlur:M,className:[Q,I].join(" "),children:b.jsx(Vo,{size:16})}),Fe("refit",B.refit)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":We?"Unpin preview":"Pin preview",onClick:()=>{M(),!C&&Ce(p=>{if(!p){const N=L();return N&&W(N),!0}return ce(!1),Re(0),W(null),!1})},onMouseEnter:()=>k("pin"),onMouseLeave:M,onFocus:()=>k("pin"),onBlur:M,className:[Q,C?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":We?V:I].join(" "),disabled:C,children:b.jsx(No,{size:16})}),Fe("pin",C?B.pinUnavailable:We?B.pinOn:B.pinOff)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":C?"Exit maximize":"Maximize preview",onClick:()=>{M(),oe(p=>!p)},onMouseEnter:()=>k("maximize"),onMouseLeave:M,onFocus:()=>k("maximize"),onBlur:M,className:[Q,C?V:I].join(" "),children:C?b.jsx(po,{size:16}):b.jsx(Lo,{size:16})}),Fe("maximize",C?B.maximizeOn:B.maximizeOff)]})]})]})]}),We&&ge&&b.jsx("div",{style:{height:`${ge.height}px`}}),b.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(t.hasPlayableMedia||t.hasImage)&&ue!=="video-settings"&&b.jsx(T.Suspense,{fallback:Le,children:b.jsx(fr,{hasPlayback:t.hasPlayableMedia,currentTime:t.currentTime,duration:t.duration,mode:ue==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:t.isAudioFxEnabled,isLooping:t.isLooping,isMuted:t.isMuted,isNoiseEnabled:t.isNoiseEnabled,isPlaying:t.isPlaying,hasVideo:t.hasVideo,isVideoSettingsOpen:!1,lofiAmount:t.lofiAmount,radioToneAmount:t.radioToneAmount,bitCrushAmount:t.bitCrushAmount,sampleRateReductionAmount:t.sampleRateReductionAmount,bassAmount:t.bassAmount,midAmount:t.midAmount,trebleAmount:t.trebleAmount,stereoWidthAmount:t.stereoWidthAmount,smallSpeakerRoomAmount:t.smallSpeakerRoomAmount,wowFlutterAmount:t.wowFlutterAmount,noiseLevel:t.noiseLevel,vinylDustAmount:t.vinylDustAmount,playbackRate:t.playbackRate,volume:t.volume,onChangeLofiAmount:t.setLofiAmount,onChangeRadioToneAmount:t.setRadioToneAmount,onChangeBitCrushAmount:t.setBitCrushAmount,onChangeSampleRateReductionAmount:t.setSampleRateReductionAmount,onChangeBassAmount:t.setBassAmount,onChangeMidAmount:t.setMidAmount,onChangeTrebleAmount:t.setTrebleAmount,onChangeStereoWidthAmount:t.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:t.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:t.setWowFlutterAmount,onChangeNoiseLevel:t.setNoiseLevel,onChangeVinylDustAmount:t.setVinylDustAmount,onChangePlaybackRate:t.changePlaybackRate,onChangeVolume:t.changeVolume,onRestart:()=>{t.seekTo(0),t.playVideoWithAudio()},onSeek:t.seekTo,onStepFrame:t.stepFrame,onToggleAudioFx:t.toggleAudioFx,onToggleLoop:t.toggleLoop,onToggleMute:t.toggleMute,onToggleNoise:t.toggleNoise,onTogglePlayback:()=>{t.togglePlayback()},onBackToPlayback:()=>{Me("playback")},onResetSettings:Te,onToggleVideoSettings:()=>{Me(p=>p==="video-settings"?"playback":"video-settings")},onToggleAudioSettings:()=>{Me(p=>p==="audio-settings"?"playback":"audio-settings")}})}),t.previewError&&b.jsx("p",{className:"mt-3 text-rose-400",children:t.previewError}),ue==="video-settings"&&b.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[b.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:b.jsx("button",{type:"button",onClick:()=>{Me("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),b.jsx(T.Suspense,{fallback:Le,children:b.jsx(vr,{locale:e,colorLevels:s.colorLevels,curvature:s.curvature,ditherStrength:s.ditherStrength,glowStrength:s.glowStrength,isFilterEnabled:s.isFilterEnabled,monoTint:s.monoTint,neonBoost:s.neonBoost,neonDetail:s.neonDetail,neonSaturation:s.neonSaturation,paletteMode:s.paletteMode,phosphorStrength:s.phosphorStrength,spotMaskStrength:s.spotMaskStrength,bulbRadius:s.bulbRadius,blackFloor:s.blackFloor,phosphorDotLightBalance:s.phosphorDotLightBalance,phosphorDotInternalScale:s.phosphorDotInternalScale,phosphorDotBrightCore:s.phosphorDotBrightCore,phosphorDotCellFill:s.phosphorDotCellFill,phosphorDotFlatDisc:s.phosphorDotFlatDisc,phosphorDotNeighborBlend:s.phosphorDotNeighborBlend,closeUpNoiseStrength:s.closeUpNoiseStrength,scanlineBrightnessFade:s.scanlineBrightnessFade,scanlineStrength:s.scanlineStrength,scanline2Strength:s.scanline2Strength,selectedPreset:s.selectedPreset,sourceDimensions:t.sourceDimensions,targetHeight:s.targetHeight,targetWidth:s.targetWidth,matchTargetAspect:s.matchTargetAspect,vignetteStrength:s.vignetteStrength,onApplyPreset:z,onSetColorLevels:s.setColorLevels,onSetCurvature:s.setCurvature,onSetDitherStrength:s.setDitherStrength,onSetGlowStrength:s.setGlowStrength,onSetIsFilterEnabled:s.setIsFilterEnabled,onSetMonoTint:s.setMonoTint,onSetNeonBoost:s.setNeonBoost,onSetNeonDetail:s.setNeonDetail,onSetNeonSaturation:s.setNeonSaturation,onSetPaletteMode:s.setPaletteMode,onSetPhosphorStrength:s.setPhosphorStrength,onSetSpotMaskStrength:s.setSpotMaskStrength,onSetBulbRadius:s.setBulbRadius,onSetBlackFloor:s.setBlackFloor,onSetPhosphorDotLightBalance:s.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:s.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:s.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:s.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:s.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:s.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:s.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:s.setScanlineBrightnessFade,onSetScanlineStrength:s.setScanlineStrength,onSetScanline2Strength:s.setScanline2Strength,onSetTargetHeight:D,onSetTargetWidth:v,onSetMatchTargetAspect:m,onSetVignetteStrength:s.setVignetteStrength})})]})]})]})})}const xr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:Ao,default:Ao},Symbol.toStringTag,{value:"Module"}));export{qo as M,Vt as R,xr as a,Vo as b};
