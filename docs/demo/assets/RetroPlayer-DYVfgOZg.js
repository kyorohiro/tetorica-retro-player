const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-CnbcLWp0.js","./index-CrI-qOyL.js","./index-CS7NMA0k.css","./RetroFilterPanel-COsJk_SL.js"])))=>i.map(i=>d[i]);
import{b as ze,r as c,R as zt,a as P,j as A,_ as oo}from"./index-CrI-qOyL.js";const ko=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Fo=ze("aperture",ko);const No=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Wo=ze("arrow-left-right",No);const Go=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Uo=ze("circle",Go);const Ho=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Vo=ze("maximize-2",Ho);const _o=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],jt=ze("minimize-2",_o);const Oo=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],zo=ze("pin",Oo);const jo=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],Zo=ze("power",jo);const Xo=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Yo=ze("rotate-ccw",Xo);const Ko=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],qo=ze("square",Ko);async function no(t,e={},r){return window.__TAURI_INTERNALS__.invoke(t,e,r)}async function Jo(t,e){await no("plugin:sharekit|share_file",{url:t,...e})}const kt="tetorica-retro-player.settings",pt=1,ft=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(kt);if(!t)return null;const e=JSON.parse(t);return e.version!==pt?null:e}catch{return null}},Ft=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(kt,JSON.stringify(t))}catch{}},Nt=()=>ft(),$o=t=>{const e=ft();Ft({version:pt,audio:e?.audio,filter:t,ui:e?.ui})},Qo=t=>{const e=ft();Ft({version:pt,audio:t,filter:e?.filter,ui:e?.ui})},en=t=>{const e=ft();Ft({version:pt,audio:e?.audio,filter:e?.filter,ui:t})},tn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(kt)}catch{}},we={isMuted:!1,volume:1,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.8,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!1,noiseLevel:.02,vinylDustAmount:0},on={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.92,lofiAmount:.7,radioToneAmount:.18,bitCrushAmount:.22,sampleRateReductionAmount:.24,bassAmount:.08,midAmount:-.08,trebleAmount:-.18,stereoWidthAmount:-.08,smallSpeakerRoomAmount:.08,wowFlutterAmount:.12,noiseLevel:.005,vinylDustAmount:0}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.88,lofiAmount:.4,radioToneAmount:.9,bitCrushAmount:.12,sampleRateReductionAmount:.38,bassAmount:-.4,midAmount:.18,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:.08,noiseLevel:.01,vinylDustAmount:0}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.06,smallSpeakerRoomAmount:.18,wowFlutterAmount:.42,noiseLevel:.0075,vinylDustAmount:0}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.96,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:.03,wowFlutterAmount:.18,noiseLevel:.0035,vinylDustAmount:.58}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.32,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:.04,noiseLevel:.0025,vinylDustAmount:.08}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.93,lofiAmount:.58,radioToneAmount:.12,bitCrushAmount:.12,sampleRateReductionAmount:.16,bassAmount:.1,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.12,wowFlutterAmount:.28,noiseLevel:.006,vinylDustAmount:0}}},nn=Object.fromEntries(Object.entries(on).map(([t,e])=>[t,{label:e.label,settings:{...we,...e.settings}}])),rn=Object.fromEntries(Object.entries(nn).map(([t,e])=>[t,e.settings])),an=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function sn(t){const r=new Float32Array(256),s=1+t*5;for(let o=0;o<256;o+=1){const f=o*2/255-1;r[o]=Math.tanh(f*s)}return r}function ln(t){const r=Math.max(1,Math.floor(t.sampleRate*.22)),s=t.createBuffer(2,r,t.sampleRate);for(let o=0;o<s.numberOfChannels;o+=1){const f=s.getChannelData(o);for(let h=0;h<f.length;h+=1){const a=h/f.length,m=(1-a)**1.85,T=.78+.22*Math.sin(a*42+o*.9),S=Math.sin(a*130+o*.35)*.08;f[h]=(Math.random()*2-1+S)*m*T*.28}}return s}function cn(t){const e=t.sampleRate*2,r=t.createBuffer(2,e,t.sampleRate);let s=0,o=0;for(let f=0;f<e;f+=1){const h=Math.random()*2-1;s=(s+h*.045)/1.045,o=o*.82+h*.18;const a=s*1.35,m=(h-o)*.55,T=Math.max(-1,Math.min(1,a+m));for(let S=0;S<r.numberOfChannels;S+=1){const y=r.getChannelData(S),x=(Math.random()*2-1)*.012;y[f]=Math.max(-1,Math.min(1,T+x))}}return r}function un(t){const e=t.sampleRate*2,r=new Float32Array(e);let s=0,o=0;for(;s<e;){const h=Math.random()*2-1;o=o*.72+h*.28,r[s]+=(h-o)*.018;const a=Math.random();if(a<.0034){const m=8+Math.floor(Math.random()*42),T=.11+Math.random()*.28,S=Math.random()<.5?-1:1;for(let y=0;y<m&&s+y<e;y+=1){const x=Math.exp(-y/(2.4+Math.random()*5));r[s+y]+=S*T*x*(.7+Math.random()*.3)}s+=m+Math.floor(Math.random()*640);continue}if(a<.0038){const m=90+Math.floor(Math.random()*260),T=.055+Math.random()*.11,S=Math.random()*Math.PI*2;for(let y=0;y<m&&s+y<e;y+=1){const x=Math.exp(-y/(18+Math.random()*40)),k=Math.sin(S+y*(.22+Math.random()*.06));r[s+y]+=T*x*k}s+=m+Math.floor(Math.random()*2200);continue}s+=1}const f=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<f.numberOfChannels;h+=1){const a=f.getChannelData(h);for(let m=0;m<e;m+=1){const T=(Math.random()*2-1)*.0035;a[m]=Math.max(-1,Math.min(1,r[m]+T))}}return f}function dn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function ro({preset:t,params:e}){return{...we,...t?rn[t]:null,...e}}class hn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null};constructor({context:e,instanceLabel:r,runtimeState:s,connectOutputToDestination:o=!0,connectOutputToRecordingDestination:f=!0,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=r,this.runtimeState=s,this.currentSettings=s.settings,this.connectOutputToDestination=o,this.connectOutputToRecordingDestination=f,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,r){an()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,r??{})}getParams(){return{...this.currentSettings}}setParams(e,r=!1){const s=r?{...this.currentSettings,...e}:{...we,...e};Object.assign(this.currentSettings,s),this.updateAudioNodes()}applyPreset(e,r){const s=ro({preset:e,params:r});Object.assign(this.currentSettings,s),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,r=this.nodes.radioToneHighpass,s=this.nodes.radioToneLowpass,o=this.nodes.radioTonePresence,f=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,a=this.nodes.lofiDrive,m=this.nodes.bitcrusher,T=this.nodes.bassEq,S=this.nodes.midEq,y=this.nodes.trebleEq,x=this.nodes.stereoWidth,k=this.nodes.roomDryGain,I=this.nodes.roomWetGain,ne=this.nodes.wowFlutterDelay,F=this.nodes.wowLfo,de=this.nodes.wowLfoGain,j=this.nodes.flutterLfo,re=this.nodes.flutterLfoGain,K=this.nodes.noiseGain,Q=this.nodes.crackleGain,Ae=this.nodes.vinylDustBedFilter,oe=this.nodes.vinylDustBedGain,{settings:D,isPlaying:pe,isOutputEnabled:H}=this.runtimeState,O=D.isMuted||!H?0:D.volume;if(e&&(e.gain.value=O),r&&s&&o){const w=D.isAudioFxEnabled?D.radioToneAmount:0;r.frequency.value=20+w*430,r.Q.value=.4+w*.35,s.frequency.value=2e4-w*17400,s.Q.value=.2+w*.9,o.frequency.value=1700,o.Q.value=.8+w*1.4,o.gain.value=w*6}if(f&&h&&a){const w=D.isAudioFxEnabled?D.lofiAmount:0;f.frequency.value=16e3-w*14200,f.Q.value=.3+w*1.8,h.gain.value=-w*18;try{a.curve=sn(w*.6)}catch{}}if(m){const w=D.isAudioFxEnabled,V=16-(w?D.bitCrushAmount:0)*12,q=1+(w?D.sampleRateReductionAmount:0)*23,_=w?Math.max(D.bitCrushAmount,D.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(V,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(q,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(_,m.context.currentTime)}if(T&&S&&y){const w=D.isAudioFxEnabled?15:0;T.gain.value=D.bassAmount*w,S.gain.value=D.midAmount*w,y.gain.value=D.trebleAmount*w}if(x){const w=D.isAudioFxEnabled?1+D.stereoWidthAmount:1;x.parameters.get("width")?.setValueAtTime(w,x.context.currentTime)}if(k&&I){const w=D.isAudioFxEnabled?D.smallSpeakerRoomAmount:0;k.gain.value=Math.max(.52,1-w*.42),I.gain.value=w*.95}if(ne&&F&&de&&j&&re){const w=D.isAudioFxEnabled?D.wowFlutterAmount:0;ne.delayTime.value=.006+w*.004,F.frequency.value=.18+w*.42,de.gain.value=w*.0035,j.frequency.value=5.2+w*6.5,re.gain.value=w*9e-4}if(K&&(K.gain.value=D.isNoiseEnabled&&!D.isMuted&&H&&pe?Math.min(.24,D.noiseLevel*5.5):0),Q){const w=D.isNoiseEnabled&&!D.isMuted&&H&&pe;Q.gain.value=w?Math.min(.24,D.vinylDustAmount*.22+D.noiseLevel*.25):0}if(Ae&&oe){const V=D.isNoiseEnabled&&!D.isMuted&&H&&pe?D.vinylDustAmount:0;Ae.frequency.value=2100+V*2600,Ae.Q.value=.35+V*.25,oe.gain.value=V*.11}}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const r=this.context,s=r.createGain();let o=null;if("createMediaStreamDestination"in r)try{o=r.createMediaStreamDestination()}catch{o=null}const f=r.createBiquadFilter(),h=r.createBiquadFilter(),a=r.createBiquadFilter(),m=r.createBiquadFilter(),T=r.createBiquadFilter(),S=r.createWaveShaper();let y=null,x=null;const k=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in r&&k){const i=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await r.audioWorklet.addModule(i.href),y=new k(r,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const ye=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await r.audioWorklet.addModule(ye.href),x=new k(r,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const I=r.createBiquadFilter(),ne=r.createBiquadFilter(),F=r.createBiquadFilter(),de=r.createGain(),j=r.createConvolver(),re=r.createGain(),K=r.createDelay(.05),Q=r.createOscillator(),Ae=r.createGain(),oe=r.createOscillator(),D=r.createGain();f.type="highpass",h.type="lowpass",a.type="peaking",m.type="lowpass",T.type="highshelf",I.type="lowshelf",I.frequency.value=180,ne.type="peaking",ne.frequency.value=1200,ne.Q.value=.9,F.type="highshelf",F.frequency.value=3200,j.buffer=ln(r),T.frequency.value=2800,S.oversample="4x",K.delayTime.value=.006,Q.type="sine",oe.type="sine",Q.connect(Ae),Ae.connect(K.delayTime),oe.connect(D),D.connect(K.delayTime),K.connect(f),f.connect(h),h.connect(a),a.connect(m),m.connect(T),T.connect(S),y?(S.connect(y),y.connect(I)):S.connect(I),I.connect(ne),ne.connect(F),x?(F.connect(x),x.connect(de),x.connect(j)):(F.connect(de),F.connect(j)),j.connect(re),de.connect(s),re.connect(s),this.connectOutputToDestination&&s.connect(r.destination),o&&this.connectOutputToRecordingDestination&&s.connect(o);const pe=r.createBufferSource();pe.buffer=cn(r),pe.loop=!0;const H=r.createBiquadFilter();H.type="highpass",H.frequency.value=1100,H.Q.value=.25;const O=r.createBiquadFilter();O.type="lowpass",O.frequency.value=5600,O.Q.value=.18;const w=r.createBiquadFilter();w.type="peaking",w.frequency.value=2400,w.Q.value=.7,w.gain.value=-2.5;const V=r.createStereoPanner(),q=r.createGain(),_=r.createOscillator(),B=r.createGain(),ce=r.createBufferSource(),Z=r.createBiquadFilter(),he=r.createBiquadFilter(),u=r.createGain(),E=r.createGain();s.gain.value=0,q.gain.value=0,_.type="sine",_.frequency.value=.021,B.gain.value=.08,ce.buffer=un(r),ce.loop=!0,Z.type="highpass",Z.frequency.value=1250,Z.Q.value=.35,he.type="bandpass",he.frequency.value=2400,he.Q.value=.4,u.gain.value=0,E.gain.value=0,pe.connect(H),H.connect(O),O.connect(w),w.connect(V),V.connect(q),q.connect(s),_.connect(B),B.connect(V.pan),ce.connect(Z),Z.connect(E),E.connect(s),ce.connect(he),he.connect(u),u.connect(s),pe.start(),_.start(),ce.start(),Q.start(),oe.start(),Object.assign(this.nodes,{audioContext:r,masterGain:s,radioToneHighpass:f,radioToneLowpass:h,radioTonePresence:a,recordingDestination:o,lofiLowpass:m,lofiHighshelf:T,lofiDrive:S,bitcrusher:y,bassEq:I,midEq:ne,trebleEq:F,stereoWidth:x,roomDryGain:de,roomConvolver:j,roomWetGain:re,wowFlutterDelay:K,wowLfo:Q,wowLfoGain:Ae,flutterLfo:oe,flutterLfoGain:D,noiseSource:pe,noiseFilter:w,noisePanner:V,noiseGain:q,noiseLfo:_,noiseLfoGain:B,crackleSource:ce,crackleFilter:Z,vinylDustBedFilter:he,vinylDustBedGain:u,crackleGain:E})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const r=await this.ensureInitialized();if(!r){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:r.state})}async connect(e,r,s){const o=await this.ensureInitialized();if(!o){this.debugAudio("connect:no-context");return}const f=this.output;if(!f){this.debugAudio("connect:no-output-node",{audioContextState:o.state});return}if(dn(e)){f.connect(e,r);return}f.connect(e,r,s)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function mn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:r=!1,...s}){const f={settings:ro(s),isPlaying:s.isPlaying??!0,isOutputEnabled:s.previewKind===void 0?!0:s.previewKind==="video"||s.previewKind==="audio"||s.previewKind==="capture"};return new hn({context:t,instanceLabel:s.instanceLabel??"tetorica-retro-audio-engine",runtimeState:f,connectOutputToDestination:e,connectOutputToRecordingDestination:r,enableAudioWorklet:s.enableAudioWorklet})}function Y(t){return{get current(){return t()}}}function gn({instanceLabel:t,previewKind:e,previewKindRef:r,mediaRef:s,isPlaying:o,isPlayingRef:f}){const[h]=c.useState(()=>new AudioContext),[a]=c.useState(()=>{const p=Nt()?.audio;return{isMuted:p?.isMuted??we.isMuted,volume:p?.volume??we.volume,playbackRate:p?.playbackRate??we.playbackRate,isLooping:p?.isLooping??we.isLooping,isAudioFxEnabled:p?.isAudioFxEnabled??we.isAudioFxEnabled,lofiAmount:p?.lofiAmount??we.lofiAmount,radioToneAmount:p?.radioToneAmount??we.radioToneAmount,bitCrushAmount:p?.bitCrushAmount??we.bitCrushAmount,sampleRateReductionAmount:p?.sampleRateReductionAmount??we.sampleRateReductionAmount,bassAmount:p?.bassAmount??we.bassAmount,midAmount:p?.midAmount??we.midAmount,trebleAmount:p?.trebleAmount??we.trebleAmount,stereoWidthAmount:p?.stereoWidthAmount??we.stereoWidthAmount,smallSpeakerRoomAmount:p?.smallSpeakerRoomAmount??we.smallSpeakerRoomAmount,wowFlutterAmount:p?.wowFlutterAmount??we.wowFlutterAmount,isNoiseEnabled:p?.isNoiseEnabled??we.isNoiseEnabled,noiseLevel:p?.noiseLevel??we.noiseLevel,vinylDustAmount:p?.vinylDustAmount??we.vinylDustAmount}}),m=c.useRef(a.isMuted),T=c.useRef(a.volume),S=c.useRef(a.playbackRate),y=c.useRef(a.isLooping),x=c.useRef(a.isAudioFxEnabled),k=c.useRef(a.lofiAmount),I=c.useRef(a.radioToneAmount),ne=c.useRef(a.bitCrushAmount),F=c.useRef(a.sampleRateReductionAmount),de=c.useRef(a.bassAmount),j=c.useRef(a.midAmount),re=c.useRef(a.trebleAmount),K=c.useRef(a.stereoWidthAmount),Q=c.useRef(a.smallSpeakerRoomAmount),Ae=c.useRef(a.wowFlutterAmount),oe=c.useRef(a.isNoiseEnabled),D=c.useRef(a.noiseLevel),pe=c.useRef(a.vinylDustAmount),[H,O]=c.useState(a.isMuted),[w,V]=c.useState(a.playbackRate),[q,_]=c.useState(a.volume),[B,ce]=c.useState(a.isLooping),[Z,he]=c.useState(a.isAudioFxEnabled),[u,E]=c.useState(a.lofiAmount),[i,ye]=c.useState(a.radioToneAmount),[g,n]=c.useState(a.bitCrushAmount),[G,U]=c.useState(a.sampleRateReductionAmount),[z,Se]=c.useState(a.bassAmount),[X,ve]=c.useState(a.midAmount),[Ce,Le]=c.useState(a.trebleAmount),[fe,ie]=c.useState(a.stereoWidthAmount),[Re,me]=c.useState(a.smallSpeakerRoomAmount),[W,ee]=c.useState(a.wowFlutterAmount),[ae,Be]=c.useState(a.isNoiseEnabled),[be,Pe]=c.useState(a.noiseLevel),[xe,We]=c.useState(a.vinylDustAmount),v=c.useRef(null),[d]=c.useState(()=>mn({context:h,instanceLabel:t,params:a,isPlaying:o,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[te]=c.useState(()=>({audioContextRef:Y(()=>d.audioContext),masterGainRef:Y(()=>d.masterGain),radioToneHighpassRef:Y(()=>d.radioToneHighpass),radioToneLowpassRef:Y(()=>d.radioToneLowpass),radioTonePresenceRef:Y(()=>d.radioTonePresence),recordingDestinationRef:Y(()=>d.recordingDestination),lofiLowpassRef:Y(()=>d.lofiLowpass),lofiHighshelfRef:Y(()=>d.lofiHighshelf),lofiDriveRef:Y(()=>d.lofiDrive),bitcrusherRef:Y(()=>d.bitcrusher),bassEqRef:Y(()=>d.bassEq),midEqRef:Y(()=>d.midEq),trebleEqRef:Y(()=>d.trebleEq),stereoWidthRef:Y(()=>d.stereoWidth),roomDryGainRef:Y(()=>d.roomDryGain),roomConvolverRef:Y(()=>d.roomConvolver),roomWetGainRef:Y(()=>d.roomWetGain),wowFlutterDelayRef:Y(()=>d.wowFlutterDelay),wowLfoRef:Y(()=>d.wowLfo),wowLfoGainRef:Y(()=>d.wowLfoGain),flutterLfoRef:Y(()=>d.flutterLfo),flutterLfoGainRef:Y(()=>d.flutterLfoGain),noiseSourceRef:Y(()=>d.noiseSource),noiseFilterRef:Y(()=>d.noiseFilter),noisePannerRef:Y(()=>d.noisePanner),noiseGainRef:Y(()=>d.noiseGain),noiseLfoRef:Y(()=>d.noiseLfo),noiseLfoGainRef:Y(()=>d.noiseLfoGain),crackleSourceRef:Y(()=>d.crackleSource),crackleFilterRef:Y(()=>d.crackleFilter),vinylDustBedFilterRef:Y(()=>d.vinylDustBedFilter),vinylDustBedGainRef:Y(()=>d.vinylDustBedGain),crackleGainRef:Y(()=>d.crackleGain)})),{audioContextRef:Ie,masterGainRef:Me,radioToneHighpassRef:De,radioToneLowpassRef:se,radioTonePresenceRef:ge,recordingDestinationRef:je,lofiLowpassRef:ke,lofiHighshelfRef:_e,lofiDriveRef:Ee,bitcrusherRef:Ue,bassEqRef:He,midEqRef:Ye,trebleEqRef:Ke,stereoWidthRef:Qe,roomDryGainRef:qe,roomConvolverRef:l,roomWetGainRef:R,wowFlutterDelayRef:N,wowLfoRef:le,wowLfoGainRef:L,flutterLfoRef:C,flutterLfoGainRef:Te,noiseSourceRef:J,noiseFilterRef:rt,noisePannerRef:bt,noiseGainRef:it,noiseLfoRef:xt,noiseLfoGainRef:wt,crackleSourceRef:At,crackleFilterRef:at,vinylDustBedFilterRef:Ct,vinylDustBedGainRef:st,crackleGainRef:St}=te,Ze=(p,Ve)=>d.debugAudio(p,Ve),lt=()=>d.ensureInitialized(),ct=()=>d.ensureInitialized(),Je=()=>d.updateAudioNodes(),ut=p=>d.connectSourceNode(p),yt=()=>d.disposeAudioEngine(),et=(p,Ve)=>d.setParams(p,Ve),Rt=p=>d.setIsPlaying(p),dt=p=>d.setOutputEnabled(p),Tt=async p=>{const Ve=await lt();if(!Ve||!d.input){Ze("connectMediaAudio:no-context",{mediaTag:p.tagName});return}v.current&&(Ze("connectMediaAudio:disconnect-previous",{mediaTag:p.tagName}),v.current.disconnect(),v.current=null);try{const Oe=Ve.createMediaElementSource(p);Oe.connect(d.input),v.current=Oe,p.muted=m.current,p.volume=m.current?0:T.current,Ze("connectMediaAudio:connected",{audioContextState:Ve.state,mediaTag:p.tagName,previewKind:r.current}),Je()}catch(Oe){throw Ze("connectMediaAudio:error",{audioContextState:Ve.state,mediaTag:p.tagName,message:Oe instanceof Error?Oe.message:String(Oe),previewKind:r.current}),Oe}},Dt=()=>{const p=v.current;!p||!d.input||(p.disconnect(),p.connect(d.input),Je())},Mt=async()=>{v.current?.disconnect(),v.current=null,await yt()},Lt=()=>{const p={...we};m.current=p.isMuted,T.current=p.volume,S.current=p.playbackRate,y.current=p.isLooping,x.current=p.isAudioFxEnabled,k.current=p.lofiAmount,I.current=p.radioToneAmount,ne.current=p.bitCrushAmount,F.current=p.sampleRateReductionAmount,de.current=p.bassAmount,j.current=p.midAmount,re.current=p.trebleAmount,K.current=p.stereoWidthAmount,Q.current=p.smallSpeakerRoomAmount,Ae.current=p.wowFlutterAmount,oe.current=p.isNoiseEnabled,D.current=p.noiseLevel,pe.current=p.vinylDustAmount,O(p.isMuted),_(p.volume),V(p.playbackRate),ce(p.isLooping),he(p.isAudioFxEnabled),E(p.lofiAmount),ye(p.radioToneAmount),n(p.bitCrushAmount),U(p.sampleRateReductionAmount),Se(p.bassAmount),ve(p.midAmount),Le(p.trebleAmount),ie(p.stereoWidthAmount),me(p.smallSpeakerRoomAmount),ee(p.wowFlutterAmount),Be(p.isNoiseEnabled),Pe(p.noiseLevel),We(p.vinylDustAmount),s.current&&(s.current.muted=p.isMuted,s.current.volume=p.volume,s.current.playbackRate=p.playbackRate,s.current.loop=p.isLooping),et(p),window.requestAnimationFrame(Je)};return c.useEffect(()=>{m.current=H,T.current=q,S.current=w,y.current=B,x.current=Z,k.current=u,I.current=i,ne.current=g,F.current=G,de.current=z,j.current=X,re.current=Ce,K.current=fe,Q.current=Re,Ae.current=W,oe.current=ae,D.current=be,pe.current=xe,et({isMuted:H,volume:q,playbackRate:w,isLooping:B,isAudioFxEnabled:Z,lofiAmount:u,radioToneAmount:i,bitCrushAmount:g,sampleRateReductionAmount:G,bassAmount:z,midAmount:X,trebleAmount:Ce,stereoWidthAmount:fe,smallSpeakerRoomAmount:Re,wowFlutterAmount:W,isNoiseEnabled:ae,noiseLevel:be,vinylDustAmount:xe},!0),Rt(o),dt(e==="video"||e==="audio"||e==="capture"),s.current&&(s.current.muted=H,s.current.volume=H?0:q,s.current.playbackRate=w,s.current.loop=B)},[H,q,Z,u,i,g,G,z,X,Ce,fe,Re,W,ae,be,xe,o,w,B,e]),c.useEffect(()=>{Qo({isMuted:H,volume:q,playbackRate:w,isLooping:B,isAudioFxEnabled:Z,lofiAmount:u,radioToneAmount:i,bitCrushAmount:g,sampleRateReductionAmount:G,bassAmount:z,midAmount:X,trebleAmount:Ce,stereoWidthAmount:fe,smallSpeakerRoomAmount:Re,wowFlutterAmount:W,isNoiseEnabled:ae,noiseLevel:be,vinylDustAmount:xe})},[H,q,w,B,Z,u,i,g,G,z,X,Ce,fe,Re,W,ae,be,xe]),{audioContextRef:Ie,mediaSourceRef:v,masterGainRef:Me,radioToneHighpassRef:De,radioToneLowpassRef:se,radioTonePresenceRef:ge,recordingDestinationRef:je,lofiLowpassRef:ke,lofiHighshelfRef:_e,lofiDriveRef:Ee,bitcrusherRef:Ue,bassEqRef:He,midEqRef:Ye,trebleEqRef:Ke,stereoWidthRef:Qe,roomDryGainRef:qe,roomConvolverRef:l,roomWetGainRef:R,wowFlutterDelayRef:N,wowLfoRef:le,wowLfoGainRef:L,flutterLfoRef:C,flutterLfoGainRef:Te,noiseSourceRef:J,noiseFilterRef:rt,noisePannerRef:bt,noiseGainRef:it,noiseLfoRef:xt,noiseLfoGainRef:wt,crackleSourceRef:At,crackleFilterRef:at,vinylDustBedFilterRef:Ct,vinylDustBedGainRef:st,crackleGainRef:St,isMutedRef:m,volumeRef:T,playbackRateRef:S,isLoopingRef:y,isAudioFxEnabledRef:x,lofiAmountRef:k,radioToneAmountRef:I,bitCrushAmountRef:ne,sampleRateReductionAmountRef:F,bassAmountRef:de,midAmountRef:j,trebleAmountRef:re,stereoWidthAmountRef:K,smallSpeakerRoomAmountRef:Q,wowFlutterAmountRef:Ae,isNoiseEnabledRef:oe,noiseLevelRef:D,vinylDustAmountRef:pe,isMuted:H,setIsMuted:O,playbackRate:w,setPlaybackRate:V,volume:q,setVolume:_,isLooping:B,setIsLooping:ce,isAudioFxEnabled:Z,setIsAudioFxEnabled:he,lofiAmount:u,setLofiAmount:E,radioToneAmount:i,setRadioToneAmount:ye,bitCrushAmount:g,setBitCrushAmount:n,sampleRateReductionAmount:G,setSampleRateReductionAmount:U,bassAmount:z,setBassAmount:Se,midAmount:X,setMidAmount:ve,trebleAmount:Ce,setTrebleAmount:Le,stereoWidthAmount:fe,setStereoWidthAmount:ie,smallSpeakerRoomAmount:Re,setSmallSpeakerRoomAmount:me,wowFlutterAmount:W,setWowFlutterAmount:ee,isNoiseEnabled:ae,setIsNoiseEnabled:Be,noiseLevel:be,setNoiseLevel:Pe,vinylDustAmount:xe,setVinylDustAmount:We,debugAudio:Ze,ensureAudioContext:ct,ensureInitialized:lt,updateAudioNodes:Je,connectSourceNode:ut,connectMediaAudio:Tt,reconnectCurrentMediaAudio:Dt,resetAudioSettings:Lt,disposeAudioEngine:Mt}}const pn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},fn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,vn=`#version 300 es
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
uniform float uSmoothStrength;
uniform float uToonSteps;
uniform float uEdgeBoost;
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

vec3 smoothSourceColor(sampler2D textureSampler, vec2 uv, vec2 texel, float amount)
{
  if (amount <= 0.001) {
    return texture(textureSampler, uv).rgb;
  }

  vec3 center = texture(textureSampler, uv).rgb * 0.4;
  vec3 left = texture(textureSampler, clamp(uv - vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb * 0.15;
  vec3 right = texture(textureSampler, clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0))).rgb * 0.15;
  vec3 up = texture(textureSampler, clamp(uv - vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb * 0.15;
  vec3 down = texture(textureSampler, clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0))).rgb * 0.15;
  vec3 blurred = center + left + right + up + down;
  return mix(texture(textureSampler, uv).rgb, blurred, clamp(amount, 0.0, 1.0));
}

vec3 applyToonShading(vec3 color, float steps)
{
  if (steps < 2.0) {
    return color;
  }

  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  float stepped = floor(luminance * (steps - 1.0) + 0.5) / max(steps - 1.0, 1.0);
  float scale = stepped / max(luminance, 0.001);
  vec3 scaled = clamp(color * scale, 0.0, 1.0);
  return mix(color, scaled, 0.88);
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
  vec4 sampleColor = vec4(smoothSourceColor(uTexture, clampedUv, texel, uSmoothStrength), 1.0);
  bool isPc98Tile = uPaletteMode > 1.5 && uPaletteMode < 2.5;

  if (isPc98Tile) {
    return samplePc98TileSource(uTexture, sampleCell, uTargetSize);
  }

  float dither = (bayer4x4(sampleCell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  sampleColor.rgb = clamp(sampleColor.rgb + dither, 0.0, 1.0);
  sampleColor.rgb = applyToonShading(sampleColor.rgb, uToonSteps);
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

float sampleProcessedLuminance(vec2 sampleUv, vec2 sampleCell, vec2 texel)
{
  return dot(
    sampleProcessedSourceColor(sampleUv, sampleCell, texel),
    vec3(0.299, 0.587, 0.114)
  );
}

float computeEdgeBoost(vec2 uv, vec2 texel, vec2 cell)
{
  float tl = sampleProcessedLuminance(
    clamp(uv + vec2(-texel.x, -texel.y), vec2(0.0), vec2(1.0)),
    cell + vec2(-1.0, -1.0),
    texel
  );
  float tc = sampleProcessedLuminance(
    clamp(uv + vec2(0.0, -texel.y), vec2(0.0), vec2(1.0)),
    cell + vec2(0.0, -1.0),
    texel
  );
  float tr = sampleProcessedLuminance(
    clamp(uv + vec2(texel.x, -texel.y), vec2(0.0), vec2(1.0)),
    cell + vec2(1.0, -1.0),
    texel
  );
  float ml = sampleProcessedLuminance(
    clamp(uv + vec2(-texel.x, 0.0), vec2(0.0), vec2(1.0)),
    cell + vec2(-1.0, 0.0),
    texel
  );
  float mr = sampleProcessedLuminance(
    clamp(uv + vec2(texel.x, 0.0), vec2(0.0), vec2(1.0)),
    cell + vec2(1.0, 0.0),
    texel
  );
  float bl = sampleProcessedLuminance(
    clamp(uv + vec2(-texel.x, texel.y), vec2(0.0), vec2(1.0)),
    cell + vec2(-1.0, 1.0),
    texel
  );
  float bc = sampleProcessedLuminance(
    clamp(uv + vec2(0.0, texel.y), vec2(0.0), vec2(1.0)),
    cell + vec2(0.0, 1.0),
    texel
  );
  float br = sampleProcessedLuminance(
    clamp(uv + vec2(texel.x, texel.y), vec2(0.0), vec2(1.0)),
    cell + vec2(1.0, 1.0),
    texel
  );

  float gx = -tl + tr - 2.0 * ml + 2.0 * mr - bl + br;
  float gy = -tl - 2.0 * tc - tr + bl + 2.0 * bc + br;
  float gradient = length(vec2(gx, gy));
  return clamp(pow(clamp(gradient * 0.85, 0.0, 1.0), 0.9), 0.0, 1.0);
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

  float smoothStrength = clamp(uSmoothStrength, 0.0, 1.0);
  vec4 color = vec4(smoothSourceColor(uTexture, pixelatedUv, texel, smoothStrength), 1.0);
  color.r = smoothSourceColor(uTexture, redUv, texel, smoothStrength).r;
  color.b = smoothSourceColor(uTexture, blueUv, texel, smoothStrength).b;
  bool isPc98Tile = uPaletteMode > 1.5 && uPaletteMode < 2.5;
  if (isPc98Tile) {
    color.rgb = samplePc98TileSource(uTexture, cell, uTargetSize);
  }
  float dither = (bayer4x4(cell) - 0.5) * (uDitherStrength / max(uColorLevels, 1.0));
  color.rgb = clamp(color.rgb + dither, 0.0, 1.0);
  color.rgb = applyToonShading(color.rgb, uToonSteps);
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

  float edgeBoost = clamp(uEdgeBoost, 0.0, 1.5);
  if (edgeBoost > 0.001) {
    float edge = computeEdgeBoost(pixelatedUv, texel, cell);
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float darkPreference = 1.0 - smoothstep(0.45, 0.92, luminance);
    float edgeMix = smoothstep(0.04, 0.75, edge) * min(edgeBoost, 1.0) * (0.55 + darkPreference * 0.45);
    float edgeShade = edge * (0.12 + edgeBoost * 0.34) * (0.65 + darkPreference * 0.55);
    vec3 edgeColor = color.rgb * (1.0 - edgeShade);
    color.rgb = clamp(
      mix(color.rgb, edgeColor, edgeMix),
      0.0,
      1.0
    );
  }

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
`,bn=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,Zt=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,xn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),Xt=640,Pt=()=>typeof performance<"u"?performance.now():Date.now(),Bt=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Yt=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,wn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Kt=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),gt=t=>({width:Bt(t)?t.videoWidth:Yt(t)?t.naturalWidth:t.width,height:Bt(t)?t.videoHeight:Yt(t)?t.naturalHeight:t.height}),An=(t,e,r)=>Bt(t)&&(e>Xt||r>Xt),vt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Cn=t=>vt(t)&&t.phosphorDotInternalScale?2:1,Sn=(t,e,r,s)=>{if(r===void 0||s===void 0||r<=0||s<=0)return{width:t,height:e};const o=r/s;return t/e>o?{width:Math.max(1,Math.round(e*o)),height:e}:{width:t,height:Math.max(1,Math.round(t/o))}},yn=(t,e,r,s,o,f)=>{if(!vt(r)||o===void 0||f===void 0||o<=0||f<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+r.bulbRadius*1.15),a=Math.max(1,h/Math.max(s,1)),m=Math.max(1,Math.floor(o/a)),T=Math.max(1,Math.floor(f/a)),S=Math.min(1,m/Math.max(t,1),T/Math.max(e,1));return{width:Math.max(1,Math.round(t*S)),height:Math.max(1,Math.round(e*S))}},It=(t,e,r,s,o)=>{const f=Cn(t),h=Math.max(t.targetWidth,1),a=Math.max(t.targetHeight,1),m=t.matchTargetAspect?Sn(h,a,e,r):{width:h,height:a},T=m.width*f,S=m.height*f,y=yn(T,S,t,f,s,o);return{width:y.width,height:y.height,sampleWidth:Math.max(1,Math.round(T)),sampleHeight:Math.max(1,Math.round(S)),internalScale:f,isPhosphorDotMode:vt(t)}};function qt(t,e,r){const s=t.createShader(e);if(!s)throw new Error("Failed to create shader.");if(t.shaderSource(s,r),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(s)||"Unknown shader compile error.";throw t.deleteShader(s),new Error(o)}return s}function Jt(t,e,r){const s=qt(t,t.VERTEX_SHADER,e),o=qt(t,t.FRAGMENT_SHADER,r),f=t.createProgram();if(!f)throw t.deleteShader(s),t.deleteShader(o),new Error("Failed to create WebGL program.");if(t.attachShader(f,s),t.attachShader(f,o),t.bindAttribLocation(f,0,"aPosition"),t.linkProgram(f),t.deleteShader(s),t.deleteShader(o),!t.getProgramParameter(f,t.LINK_STATUS)){const h=t.getProgramInfoLog(f)||"Unknown program link error.";throw t.deleteProgram(f),new Error(h)}return f}class Rn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=Pt();constructor(e){this.gl=e,this.filterProgram=Jt(e,Zt,vn),this.passthroughProgram=Jt(e,Zt,bn);const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,xn,e.STATIC_DRAW);const s=e.createVertexArray();e.bindVertexArray(s),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const o=e.createTexture();if(!o)throw new Error("Failed to create WebGL texture.");this.texture=o,e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=Pt()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const r=this.currentSource,s=this.currentFilterState;if(!this.outputEnabled||!r||!s)return;const o=this.getUploadSource(r,s);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const f=s.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,f),Kt(o)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o.width,o.height,0,e.RGBA,e.UNSIGNED_BYTE,o.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),s.isFilterEnabled){const h=gt(r);this.applyFilterUniforms(s,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,r){if(Kt(e)||!r.isFilterEnabled)return e;const s=gt(e);if(s.width<=0||s.height<=0||An(e,s.width,s.height))return e;const{width:o,height:f,sampleWidth:h,sampleHeight:a,isPhosphorDotMode:m}=It(r,s.width,s.height),T=Math.max(1,Math.round(m?h:o)),S=Math.max(1,Math.round(m?a:f)),y=this.ensureUploadContext();return!y||!this.uploadCanvas?e:(this.uploadCanvas.width!==T&&(this.uploadCanvas.width=T),this.uploadCanvas.height!==S&&(this.uploadCanvas.height=S),y.imageSmoothingEnabled=!0,y.imageSmoothingQuality="high",y.fillStyle="#000",y.fillRect(0,0,T,S),y.drawImage(e,0,0,T,S),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),r=e.getContext("2d",{alpha:!1,desynchronized:!0});return r?(this.uploadCanvas=e,this.uploadContext=r,r):null}applyFilterUniforms(e,r,s){const{gl:o}=this,f=wn(o.canvas)?o.canvas:null,h=Math.max(f?.clientWidth??o.drawingBufferWidth,1),a=Math.max(f?.clientHeight??o.drawingBufferHeight,1),{width:m,height:T,sampleWidth:S,sampleHeight:y,isPhosphorDotMode:x}=It(e,r,s,h,a);o.useProgram(this.filterProgram),o.uniform2f(this.uniformLocations.uTargetSize,m,T),o.uniform2f(this.uniformLocations.uSampleTargetSize,S,y),o.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),o.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),o.uniform1f(this.uniformLocations.uPaletteMode,fn(e.paletteMode)),o.uniform1f(this.uniformLocations.uCurvature,e.curvature),o.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),o.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),o.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),o.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),o.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),o.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),o.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),o.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),o.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),o.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),o.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),o.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),o.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),o.uniform1f(this.uniformLocations.uPixelAspect,Math.max(o.drawingBufferWidth,1)*T/(Math.max(o.drawingBufferHeight,1)*m)),o.uniform1f(this.uniformLocations.uPhosphorDotMode,x?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),o.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),o.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),o.uniform3f(this.uniformLocations.uMonoTint,...pn[e.monoTint].rgb),o.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),o.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),o.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),o.uniform1f(this.uniformLocations.uTime,(Pt()-this.startedAt)/1e3)}}function Tn({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:s,isPlayingRef:o,previewKindRef:f,debugVideo:h}){const a=c.useRef(null),m=c.useRef(null),T=c.useRef(null),S=c.useRef(null),y=c.useRef(null),x=c.useRef(null),k=c.useRef(null),I=c.useRef(null),ne=c.useRef(()=>{}),F=c.useRef(t),de=c.useRef(s),j=c.useRef(!1),re=c.useRef(null),K=c.useRef(null),Q=c.useRef(null),[Ae,oe]=c.useState(!1),[D,pe]=c.useState(null);F.current=t,de.current=s;const H=c.useCallback(n=>{pe(G=>{const U=typeof n=="function"?n(G):n;return Q.current=U,U})},[]),O=c.useCallback(()=>{const n=m.current,G=y.current;n&&(n.pipeline.setOutputEnabled(de.current),n.pipeline.setSource(G),n.pipeline.setFilterState(F.current),n.pipeline.render())},[]);c.useLayoutEffect(()=>{ne.current=O},[O]);const w=c.useCallback(()=>{j.current=!1,I.current!==null&&(window.cancelAnimationFrame(I.current),I.current=null)},[]),V=c.useCallback(()=>{if(j.current)return;j.current=!0;const n=()=>{if(!j.current)return;if(ne.current(),!(f.current==="video"||f.current==="capture"||f.current==="image"||o.current)){I.current=null,j.current=!1;return}I.current=window.requestAnimationFrame(n)};I.current=window.requestAnimationFrame(n)},[o,f]),q=c.useCallback(()=>{O()},[O]),_=c.useCallback(()=>{O()},[O]),B=c.useCallback(()=>{O()},[O]),ce=c.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),x.current={},O(),x.current),[O]),Z=c.useCallback((n,G,U)=>{if(!n)return;const{width:z,height:Se}=gt(U);if(z<=0||Se<=0)return;const X=a.current,ve=X?.clientWidth??n.canvas.width,Ce=X?.clientHeight??n.canvas.height,fe=e==="width"?ve/z:Math.min(ve/z,Ce/Se),ie=z*fe,Re=Se*fe,me=(ve-ie)/2,W=(Ce-Re)/2,ee={width:ie,height:Re,x:me,y:W},ae=Q.current;return ae&&ae.width===ee.width&&ae.height===ee.height&&ae.x===ee.x&&ae.y===ee.y?ae:(Q.current=ee,H(ee),ee)},[e,H]),he=c.useCallback(()=>{y.current&&Z(m.current,null,y.current)},[Z]),u=c.useCallback(()=>{O()},[O]),E=c.useCallback(()=>{const n=m.current,G=a.current;if(!n||!G)return;he();const U=Q.current??{x:0,y:0,width:G.clientWidth,height:G.clientHeight},z=Math.max(1,Math.round(U.width)),Se=Math.max(1,Math.round(U.height)),X=F.current,ve=y.current?gt(y.current):null,{width:Ce,height:Le}=It(X,ve?.width,ve?.height,z,Se),fe=Math.max(1,Math.round(z*Math.max(1,r))),ie=Math.max(1,Math.round(Se*Math.max(1,r))),Re=Math.max(1,Math.round(Math.max(1,Ce)*Math.max(1,r))),me=Math.max(1,Math.round(Math.max(1,Le)*Math.max(1,r))),W=vt(X),ee=X.isFilterEnabled&&W?Math.max(fe,Re):fe,ae=X.isFilterEnabled&&W?Math.max(ie,me):ie;n.canvas.width!==ee&&(n.canvas.width=ee),n.canvas.height!==ae&&(n.canvas.height=ae),n.canvas.style.position="absolute",n.canvas.style.left=`${Math.round(U.x)}px`,n.canvas.style.top=`${Math.round(U.y)}px`,n.canvas.style.width=`${z}px`,n.canvas.style.height=`${Se}px`,n.canvas.style.imageRendering="pixelated",O()},[he,O,r]),i=c.useCallback(()=>{re.current!==null&&(window.cancelAnimationFrame(re.current),re.current=null),K.current!==null&&(window.clearTimeout(K.current),K.current=null),re.current=window.requestAnimationFrame(()=>{re.current=null,E()}),K.current=window.setTimeout(()=>{K.current=null,E()},120)},[E]),ye=c.useCallback(async()=>{if(!m.current){if(k.current){await k.current;return}k.current=(async()=>{const n=a.current;if(!n||m.current)return;const G=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:n.isConnected,hostWidth:n.clientWidth??null,hostHeight:n.clientHeight??null,resolution:r});const U=document.createElement("canvas");U.style.display="block",U.style.width="100%",U.style.height="100%",U.style.imageRendering="pixelated",U.style.background="#020617";const z=U.getContext("webgl2");if(!z)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-G)*10)/10});const Se={canvas:U,pipeline:new Rn(z),ticker:{start:V,stop:w}},X=a.current;if(!X||X!==n||!X.isConnected)return;X.style.position="relative",X.appendChild(U),m.current=Se,x.current={},oe(!0),h("initWebGL:ready",{hostWidth:X.clientWidth??null,hostHeight:X.clientHeight??null,resolution:r}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-G)*10)/10}),E();const ve=f.current==="video"||f.current==="capture"||f.current==="image"||o.current;s&&ve&&V(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-G)*10)/10,shouldAnimateOnInit:ve})})();try{await k.current}finally{k.current=null}}},[h,s,E,r,V,w]),g=c.useCallback(()=>{k.current=null,w(),re.current!==null&&(window.cancelAnimationFrame(re.current),re.current=null),K.current!==null&&(window.clearTimeout(K.current),K.current=null);const n=m.current;n&&(n.pipeline.dispose(),n.canvas.remove()),m.current=null,x.current=null,H(null),oe(!1)},[w,H]);return c.useEffect(()=>{const n=a.current;if(!n)return;if(typeof ResizeObserver<"u"){const U=new ResizeObserver(()=>{i()});return U.observe(n),()=>{U.disconnect()}}const G=()=>{i()};return window.addEventListener("resize",G),()=>{window.removeEventListener("resize",G)}},[i]),{canvasHostRef:a,appRef:m,spriteRef:T,textureRef:S,previewElementRef:y,filterRef:x,isRendererReady:Ae,viewportRect:D,setViewportRect:H,applyFilterState:q,createVideoTexture:n=>null,destroyPixi:g,fitCurrentSprite:he,fitSprite:Z,initPixi:ye,refreshLayout:E,resetFilterInstance:ce,safeRender:u,scheduleRefreshLayout:i,syncSpriteFilter:_,syncTexturePresentation:B}}const Dn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function Mn({appRef:t,spriteRef:e,textureRef:r,previewElementRef:s,mediaRef:o,objectUrlRef:f,streamRef:h,streamOwnedRef:a,previewRequestIdRef:m,isPlayingRef:T,previewKindRef:S,audioContextRef:y,mediaSourceRef:x,masterGainRef:k,noiseGainRef:I,isMutedRef:ne,volumeRef:F,playbackRateRef:de,isLoopingRef:j,isAudioFxEnabled:re,lofiAmount:K,bitCrushAmount:Q,sampleRateReductionAmount:Ae,bassAmount:oe,midAmount:D,trebleAmount:pe,stereoWidthAmount:H,smallSpeakerRoomAmount:O,isMuted:w,volume:V,previewKind:q,setPreviewName:_,setPreviewError:B,setNeedsUserPlay:ce,setIsPlaying:Z,setCurrentTime:he,setDuration:u,setPlaybackRate:E,setIsLooping:i,setSourceDimensions:ye,setViewportRect:g,setPreviewKindState:n,setIsPoweredOn:G,beginLoading:U,finishLoading:z,ensureAudioContext:Se,updateAudioNodes:X,connectMediaAudio:ve,fitSprite:Ce,refreshLayout:Le,scheduleRefreshLayout:fe,safeRender:ie,resetFilterInstance:Re,initPixi:me,resetPerfAccumulators:W,debugVideo:ee,debugAudio:ae}){const Be=async()=>{Dn()&&await new Promise(l=>{window.setTimeout(l,220)})},be=()=>{const l=y.current?.currentTime;if(I.current)if(typeof l=="number"){const R=I.current.gain;R.cancelScheduledValues(l),R.setValueAtTime(R.value,l),R.linearRampToValueAtTime(0,l+.03)}else I.current.gain.value=0;if(k.current)if(typeof l=="number"){const R=k.current.gain;R.cancelScheduledValues(l),R.setValueAtTime(R.value,l),R.linearRampToValueAtTime(0,l+.03)}else k.current.gain.value=0},Pe=()=>{I.current&&(I.current.gain.value=0)},xe=l=>l instanceof DOMException&&(l.name==="NotAllowedError"||l.name==="AbortError")?!0:l instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(l.message):!1,We=l=>xe(l)?(z(),B(""),ce(!0),se(),ie(),!0):!1,v=(l,R,N=!0)=>{be(),l.muted=!0,l.volume=0,l.pause(),l.srcObject instanceof MediaStream&&(N&&l.srcObject.getTracks().forEach(le=>le.stop()),l.srcObject=null),l.src="",l.load(),R?.startsWith("blob:")&&URL.revokeObjectURL(R)},d=l=>new Promise((R,N)=>{const le=J=>J?J.code===MediaError.MEDIA_ERR_ABORTED?"aborted":J.code===MediaError.MEDIA_ERR_NETWORK?"network":J.code===MediaError.MEDIA_ERR_DECODE?"decode":J.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${J.code}`:"unknown",L=()=>{l.removeEventListener("loadeddata",C),l.removeEventListener("canplay",C),l.removeEventListener("error",Te)},C=()=>{L(),R()},Te=()=>{L(),N(new Error(`動画の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${le(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){R();return}l.addEventListener("loadeddata",C,{once:!0}),l.addEventListener("canplay",C,{once:!0}),l.addEventListener("error",Te,{once:!0}),l.load()}),te=l=>new Promise((R,N)=>{const le=J=>J?J.code===MediaError.MEDIA_ERR_ABORTED?"aborted":J.code===MediaError.MEDIA_ERR_NETWORK?"network":J.code===MediaError.MEDIA_ERR_DECODE?"decode":J.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${J.code}`:"unknown",L=()=>{l.removeEventListener("loadedmetadata",C),l.removeEventListener("canplay",C),l.removeEventListener("error",Te)},C=()=>{L(),R()},Te=()=>{L(),N(new Error(`音声の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${le(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_METADATA){R();return}l.addEventListener("loadedmetadata",C,{once:!0}),l.addEventListener("canplay",C,{once:!0}),l.addEventListener("error",Te,{once:!0}),l.load()}),Ie=l=>new Promise((R,N)=>{const le=()=>{l.removeEventListener("load",L),l.removeEventListener("error",C)},L=()=>{le(),R()},C=()=>{le(),N(new Error("画像の読み込みに失敗しました。"))};if(l.complete&&l.naturalWidth>0&&l.naturalHeight>0){R();return}l.addEventListener("load",L,{once:!0}),l.addEventListener("error",C,{once:!0})}),Me=l=>{l.addEventListener("play",se),l.addEventListener("pause",se),l.addEventListener("pause",be),l.addEventListener("abort",be),l.addEventListener("emptied",be),l.addEventListener("loadstart",be),l.addEventListener("seeking",be),l.addEventListener("stalled",be),l.addEventListener("suspend",be),l.addEventListener("waiting",be),l.addEventListener("volumechange",se),l.addEventListener("timeupdate",se),l.addEventListener("durationchange",se),l.addEventListener("seeked",se),l.addEventListener("ended",se),l.addEventListener("ratechange",se)},De=l=>{l.loop=j.current,l.muted=ne.current,l.volume=ne.current?0:F.current,l.playbackRate=de.current,l.autoplay=!1,l.preload="auto",l.crossOrigin="anonymous",l instanceof HTMLVideoElement&&(l.playsInline=!0)},se=()=>{if(!o.current){ee("syncVideoState:no-media",{previewKind:S.current,hasPreviewElement:!!s.current}),T.current=!1,Z(!1),he(0),u(0),X(),ie();return}T.current=!o.current.paused,Z(!o.current.paused),o.current.paused||z(),he(o.current.currentTime),u(o.current.duration||0),E(o.current.playbackRate||1),i(o.current.loop),X(),ie()},ge=()=>{ee("cleanupPreview:start",{previewKind:S.current,hasMedia:!!o.current,hasPreviewElement:!!s.current}),be(),m.current+=1,z();const l=o.current,R=h.current,N=a.current;e.current=null,r.current=null,o.current=null,s.current=null,h.current=null,a.current=!1,x.current?.disconnect(),x.current=null,ce(!1),T.current=!1,Z(!1),he(0),u(0),n(null),ye(null),g(null),f.current?.startsWith("blob:")&&URL.revokeObjectURL(f.current),f.current=null,l?v(l,void 0,N):N&&R?.getTracks().forEach(le=>le.stop()),ie()},je=()=>{o.current&&(o.current.muted=!0,o.current.volume=0,o.current.pause()),be(),ge(),y.current?.state==="running"&&y.current.suspend()},ke=()=>{G(!0),t.current?.ticker.start();try{W?.()}catch{}},_e=async()=>{if(o.current)try{await Se(),o.current.muted=ne.current,o.current.volume=ne.current?0:F.current,await o.current.play(),T.current=!0,Z(!0),B(""),ce(!1),ae("playVideoWithAudio",{audioContextState:y.current?.state,currentTime:o.current.currentTime,isAudioFxEnabled:re,lofiAmount:K,bitCrushAmount:Q,sampleRateReductionAmount:Ae,bassAmount:oe,midAmount:D,trebleAmount:pe,stereoWidthAmount:H,smallSpeakerRoomAmount:O,isMuted:w,volume:V}),X(),se(),ie(),fe(),window.requestAnimationFrame(X)}catch(l){if(z(),xe(l)){ce(!0),B("");return}ce(!1),B(l instanceof Error?l.message:"音声付き再生を開始できませんでした。")}},Ee=async()=>{if(await me(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Ue=async(l,R)=>{const N=await Ee();s.current=l,Ce(N,null,l),n(R),ye(l instanceof HTMLVideoElement?{width:l.videoWidth,height:l.videoHeight}:{width:l.naturalWidth,height:l.naturalHeight}),ie(),Le(),fe(),t.current?.ticker.start()},He=async l=>{const R=l.type.startsWith("video/"),N=l.type.startsWith("audio/"),le=l.type.startsWith("image/");if(!R&&!N&&!le){B("動画、音声、または画像ファイルを選んでください。");return}ke(),ge(),Re();const L=m.current;B(""),_(l.name),U(R?"Loading video preview...":N?"Loading audio preview...":"Loading image preview...");let C=null;try{if(await Ee(),C=URL.createObjectURL(l),f.current=C,R||N){const J=R?document.createElement("video"):document.createElement("audio");if(J.src=C,De(J),Me(J),J instanceof HTMLVideoElement?await d(J):await te(J),L!==m.current){v(J,C);return}o.current=J,J instanceof HTMLVideoElement?await Ue(J,"video"):(s.current=null,n("audio"),ye(null),g(null),ie()),await ve(J),se(),await Be(),await _e(),L===m.current&&z();return}const Te=new Image;if(Te.src=C,Te.crossOrigin="anonymous",await Ie(Te),L!==m.current){C.startsWith("blob:")&&URL.revokeObjectURL(C);return}o.current=null,Pe(),X(),await Ue(Te,"image"),se(),L===m.current&&z()}catch(Te){if(L!==m.current){C?.startsWith("blob:")&&URL.revokeObjectURL(C);return}if(xe(Te)){We(Te);return}ge(),B(Te instanceof Error?Te.message:"動画プレビューに失敗しました。"),ce(!1)}},Ye=async()=>{if(ke(),!navigator.mediaDevices?.getDisplayMedia){B("このブラウザでは画面キャプチャーに対応していません。");return}ge();const l=m.current;B(""),_("Display Capture"),U("Preparing display capture...");try{await Ee();const R=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(l!==m.current){R.getTracks().forEach(le=>le.stop());return}const N=document.createElement("video");N.srcObject=R,De(N),Me(N),R.getVideoTracks()[0]?.addEventListener("ended",()=>{Ke()}),await d(N),h.current=R,a.current=!0,o.current=N,await Ue(N,"capture"),await ve(N),ce(!1),await Be(),await _e(),l===m.current&&z()}catch(R){if(l!==m.current||We(R))return;ge(),B(R instanceof Error?R.message:"画面キャプチャーを開始できませんでした。")}},Ke=()=>{q==="capture"&&(ge(),_(""),B(""))};return{cleanupPreview:ge,cleanupForPageLeave:je,playVideoWithAudio:_e,previewFile:He,previewStream:async(l,R="video",N="Media Stream")=>{let le=0;try{if(ke(),ge(),Re(),le=m.current,B(""),_(N),U(R==="video"?"Loading stream preview...":"Loading stream audio..."),await Ee(),R==="video"){const L=document.createElement("video");if(L.srcObject=l,De(L),Me(L),await d(L),le!==m.current){v(L,void 0,!1);return}h.current=l,a.current=!1,o.current=L,await Ue(L,"capture"),await ve(L)}else{const L=document.createElement("audio");if(L.srcObject=l,De(L),Me(L),await te(L),le!==m.current){v(L,void 0,!1);return}h.current=l,a.current=!1,o.current=L,s.current=null,n("audio"),ye(null),g(null),ie(),await ve(L),se()}if(le!==m.current)return;await Be(),await _e(),le===m.current&&z()}catch(L){if(le!==m.current||We(L))return;ge(),B(L instanceof Error?L.message:String(L))}},previewUrl:async(l,R="video")=>{let N=0;const le=typeof performance<"u"?performance.now():Date.now(),L=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-le)*10)/10;try{if(ee("startup:previewUrl:start",{url:l,kind:R}),ke(),ge(),Re(),N=m.current,B(""),_(l),U(R==="video"?"Loading video preview...":R==="image"?"Loading image preview...":"Loading audio preview..."),await Ee(),ee("startup:previewUrl:renderer-ready",{kind:R,elapsedMs:L()}),R==="video"){const C=document.createElement("video");if(C.src=l,De(C),Me(C),await d(C),ee("startup:previewUrl:video-ready",{elapsedMs:L(),readyState:C.readyState,videoWidth:C.videoWidth,videoHeight:C.videoHeight}),N!==m.current){v(C,l);return}o.current=C,await Ue(C,"video"),await ve(C),se()}else if(R==="image"){const C=new Image;if(C.src=l,C.crossOrigin="anonymous",await Ie(C),ee("startup:previewUrl:image-ready",{elapsedMs:L(),naturalWidth:C.naturalWidth,naturalHeight:C.naturalHeight}),N!==m.current)return;o.current=null,Pe(),X(),await Ue(C,"image"),se()}else{const C=document.createElement("audio");if(C.src=l,De(C),Me(C),await te(C),ee("startup:previewUrl:audio-ready",{elapsedMs:L(),readyState:C.readyState,duration:C.duration}),N!==m.current){v(C,l);return}s.current=null,n("audio"),ye(null),g(null),o.current=C,ie(),await ve(C),se()}if(N!==m.current)return;(R==="video"||R==="audio")&&(await Be(),await _e()),N===m.current&&(z(),ee("startup:previewUrl:done",{kind:R,elapsedMs:L()}))}catch(C){if(ee("startup:previewUrl:error",{kind:R,elapsedMs:L(),error:C instanceof Error?C.message:String(C)}),N!==m.current||We(C))return;ge(),B(C instanceof Error?C.message:String(C))}},startDisplayCapture:Ye,stopDisplayCapture:Ke,syncVideoState:se,releaseDetachedMedia:v,ensurePixiReady:Ee}}let Ln=0;const $t=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),Qt=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Pn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function En(t,e,r=1){const s=c.useRef(`player-${Ln+=1}`),o=c.useRef(null),f=c.useRef(null),h=c.useRef(!1),a=c.useRef(null),m=c.useRef(null),T=c.useRef([]),S=c.useRef(null),y=c.useRef(null),x=c.useRef(null),k=c.useRef(null),I=c.useRef(null),ne=c.useRef(0),F=c.useRef(!1),de=c.useRef(null),j=c.useRef(!1),[re,K]=c.useState(""),[Q,Ae]=c.useState(""),[oe,D]=c.useState(!0),[pe,H]=c.useState(""),[O,w]=c.useState(!1),[V,q]=c.useState(!1),[_,B]=c.useState(!1),[ce,Z]=c.useState(0),[he,u]=c.useState(0),[E,i]=c.useState(null),[ye,g]=c.useState(null),[n,G]=c.useState(!1),[U,z]=c.useState(null),Se=(b,M)=>{if(!Pn())return;const $=M?` ${JSON.stringify(M)}`:"";console.log(`[retro-player video][${s.current}] ${b}${$}`)},X=Tn({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:oe,isPlayingRef:F,previewKindRef:de,debugVideo:Se}),{canvasHostRef:ve,appRef:Ce,spriteRef:Le,textureRef:fe,previewElementRef:ie,filterRef:Re,isRendererReady:me,viewportRect:W,setViewportRect:ee,applyFilterState:ae,destroyPixi:Be,fitSprite:be,initPixi:Pe,refreshLayout:xe,resetFilterInstance:We,safeRender:v,scheduleRefreshLayout:d,syncSpriteFilter:te,syncTexturePresentation:Ie}=X,Me=c.useRef(Pe),De=c.useRef(Be),se=c.useRef(()=>{}),ge=c.useRef(()=>{}),je=gn({instanceLabel:s.current,previewKind:E,previewKindRef:de,mediaRef:a,isPlaying:_,isPlayingRef:F}),{audioContextRef:ke,mediaSourceRef:_e,masterGainRef:Ee,recordingDestinationRef:Ue,noiseGainRef:He,isMutedRef:Ye,volumeRef:Ke,playbackRateRef:Qe,isLoopingRef:qe,isMuted:l,setIsMuted:R,playbackRate:N,setPlaybackRate:le,volume:L,setVolume:C,isLooping:Te,setIsLooping:J,isAudioFxEnabled:rt,setIsAudioFxEnabled:bt,lofiAmount:it,setLofiAmount:xt,radioToneAmount:wt,setRadioToneAmount:At,bitCrushAmount:at,setBitCrushAmount:Ct,sampleRateReductionAmount:st,setSampleRateReductionAmount:St,bassAmount:Ze,setBassAmount:lt,midAmount:ct,setMidAmount:Je,trebleAmount:ut,setTrebleAmount:yt,stereoWidthAmount:et,setStereoWidthAmount:Rt,smallSpeakerRoomAmount:dt,setSmallSpeakerRoomAmount:Tt,wowFlutterAmount:Dt,setWowFlutterAmount:Mt,isNoiseEnabled:Lt,setIsNoiseEnabled:p,noiseLevel:Ve,setNoiseLevel:Oe,vinylDustAmount:io,setVinylDustAmount:ao,debugAudio:so,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:lo,reconnectCurrentMediaAudio:Wt,resetAudioSettings:co,disposeAudioEngine:Gt}=je;c.useEffect(()=>{Me.current=Pe,De.current=Be},[Pe,Be]);const uo=b=>{de.current=b,i(b)},ho=b=>{H(b),w(!0)},$e=()=>{w(!1),H("")},Ut=()=>{D(!0),Ce.current?.ticker.start()},mo=()=>{a.current&&a.current.pause(),He.current&&(He.current.gain.value=0),Ee.current&&(Ee.current.gain.value=0),$e(),q(!1),D(!1),Ce.current?.ticker.stop(),Xe()},go=Mn({filterState:t,appRef:Ce,spriteRef:Le,textureRef:fe,previewElementRef:ie,filterRef:Re,mediaRef:a,objectUrlRef:o,streamRef:f,streamOwnedRef:h,previewRequestIdRef:ne,isPlayingRef:F,previewKindRef:de,audioContextRef:ke,mediaSourceRef:_e,masterGainRef:Ee,noiseGainRef:He,isMutedRef:Ye,volumeRef:Ke,playbackRateRef:Qe,isLoopingRef:qe,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:Ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,isMuted:l,volume:L,previewKind:E,setPreviewName:K,setPreviewError:Ae,setNeedsUserPlay:q,setIsPlaying:B,setCurrentTime:Z,setDuration:u,setPlaybackRate:le,setIsLooping:J,setSourceDimensions:g,setViewportRect:ee,setPreviewKindState:uo,setIsPoweredOn:D,beginLoading:ho,finishLoading:$e,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:lo,fitSprite:be,refreshLayout:xe,scheduleRefreshLayout:d,safeRender:v,resetFilterInstance:We,initPixi:Pe,debugVideo:Se,debugAudio:so}),{cleanupPreview:Ht,cleanupForPageLeave:po,playVideoWithAudio:Vt,previewFile:fo,previewStream:vo,previewUrl:bo,startDisplayCapture:xo,stopDisplayCapture:wo,syncVideoState:Xe}=go;c.useEffect(()=>{se.current=Ht},[Ht]),c.useEffect(()=>{ge.current=Gt},[Gt]);const _t=async()=>{if(a.current){if(a.current.paused){oe||Ut(),await Vt(),Xe();return}a.current.pause(),Xe()}},Ao=()=>{a.current&&R(b=>{const M=!b;return Ye.current=M,window.requestAnimationFrame(tt),M})},ot=b=>{a.current&&(a.current.currentTime=b,Z(b))},Co=b=>{if(!a.current)return;const M=1/30,$=Math.max(0,Math.min(a.current.currentTime+M*b,a.current.duration||a.current.currentTime+M));a.current.pause(),a.current.currentTime=$,Xe()},So=b=>{a.current&&(a.current.playbackRate=b,Qe.current=b,le(b))},yo=b=>{a.current&&(Ke.current=b,Ye.current=b===0,C(b),R(b===0),window.requestAnimationFrame(tt))},Ro=()=>{a.current&&(a.current.loop=!a.current.loop,qe.current=a.current.loop,J(a.current.loop))},To=b=>{qe.current=b,J(b),a.current&&(a.current.loop=b)},mt=()=>{if(!y.current||typeof window>"u"){x.current=null,k.current=null;return}window.URL.revokeObjectURL(y.current),y.current=null,x.current=null,k.current=null},Do=(b,M)=>{if(typeof document>"u")return;const $=document.createElement("a");$.href=b,$.download=M,$.rel="noopener",$.style.display="none",document.body.appendChild($),$.click(),window.setTimeout(()=>{$.remove()},0)},Mo=(b,M)=>{if(typeof window>"u"||b.length===0)return null;mt();const $=new Blob(b,{type:M||"video/webm"}),Ge=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ne=window.URL.createObjectURL($);return y.current=Ne,x.current=$,k.current=Ge,z(Ge),Ge},Lo=()=>{const b=y.current,M=k.current;!b||!M||typeof window>"u"||(Do(b,M),window.setTimeout(()=>{mt()},1e3),z(null))},Po=async()=>{const b=x.current,M=k.current;if(!b||!M||typeof window>"u")return!1;if($t()){const Ge=new Uint8Array(await b.arrayBuffer()),Ne=await no("persist_recording_for_share",{data:Array.from(Ge),filename:M});return await Jo(Ne,{mimeType:b.type||"video/webm",title:M}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Fe={files:[new File([b],M,{type:b.type||"video/webm"})],title:M};return typeof navigator.canShare=="function"&&!navigator.canShare(Fe)?!1:(await navigator.share(Fe),!0)},Eo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(M=>MediaRecorder.isTypeSupported(M))??"",Bo=async()=>{const b=Ce.current?.canvas;if(!(b instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await ht();const M=new MediaStream;b.captureStream(30).getVideoTracks().forEach(Ne=>M.addTrack(Ne)),Ue.current?.stream.getAudioTracks().forEach(Ne=>M.addTrack(Ne.clone()));const Fe=Eo(),Ge=Fe?new MediaRecorder(M,{mimeType:Fe}):new MediaRecorder(M);T.current=[],mt(),z(null),S.current=M,m.current=Ge,Ge.addEventListener("dataavailable",Ne=>{Ne.data.size>0&&T.current.push(Ne.data)}),Ge.addEventListener("stop",()=>{const Ne=Mo(T.current,Ge.mimeType);T.current=[],S.current?.getTracks().forEach(Io=>Io.stop()),S.current=null,m.current=null,G(!1),I.current?.(Ne),I.current=null},{once:!0}),Ge.start(),G(!0)},Ot=(b=!0)=>{const M=m.current;return M?new Promise($=>{if(I.current=$,b||(T.current=[]),M.state!=="inactive"){M.stop();return}S.current?.getTracks().forEach(Fe=>Fe.stop()),S.current=null,m.current=null,G(!1),I.current?.(k.current),I.current=null}):Promise.resolve(k.current)};return c.useEffect(()=>{let b=!1;return(async()=>(Se("startup:setupPixi-effect:start",{renderResolutionScale:r}),await Me.current(),b&&De.current()))(),()=>{mt(),Ot(!1),b=!0,De.current()}},[r]),c.useEffect(()=>()=>{se.current(),ge.current()},[]),c.useEffect(()=>{const b=()=>{po()};return window.addEventListener("beforeunload",b),()=>{window.removeEventListener("beforeunload",b)}},[]),c.useEffect(()=>{const b=()=>{a.current&&(a.current.muted=!0,a.current.volume=0,a.current.pause(),Xe())};return window.addEventListener(zt,b),()=>{window.removeEventListener(zt,b)}},[Xe]),c.useEffect(()=>{if(!Qt())return;const b=$=>$==="video"||$==="audio"||$==="capture",M=()=>{const $=a.current;if(!(!$||!b(de.current))){if(document.visibilityState==="hidden"){j.current=!$.paused,$.pause(),F.current=!1,B(!1),He.current&&(He.current.gain.value=0),Ee.current&&(Ee.current.gain.value=0),ke.current?.state==="running"&&ke.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await ht(),Wt(),tt(),j.current&&a.current)try{await a.current.play(),q(!1)}catch(Fe){Fe instanceof DOMException&&Fe.name==="NotAllowedError"&&q(!0)}}finally{Xe(),j.current=!1}})()},80)}};return document.addEventListener("visibilitychange",M),()=>{document.removeEventListener("visibilitychange",M)}},[ke,ht,Ee,He,Wt,Xe,tt]),c.useLayoutEffect(()=>{ae(),te(),Ie(),xe()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,xe]),c.useEffect(()=>{if(Q||V){$e();return}if(E==="image"||E==="audio"){$e();return}_&&$e()},[Q,V,E,_]),c.useEffect(()=>{F.current=_;const b=(E==="video"||E==="capture")&&a.current?.tagName==="VIDEO",M=!a.current||Math.abs(a.current.currentTime)<.05,$=a.current?.ended??!1;b&&$e(),b&&!_&&!Q&&!$&&(ke.current?.state==="suspended"||M)&&q(!0)},[ke,_,Q,E]),c.useEffect(()=>{const b=M=>{if(!a.current)return;const $=M.target;if(!($ instanceof HTMLInputElement||$ instanceof HTMLTextAreaElement||$?.isContentEditable)){if(M.code==="Space"||M.code==="KeyK"){M.preventDefault(),_t();return}if(M.code==="KeyJ"){M.preventDefault(),ot(Math.max(a.current.currentTime-10,0));return}if(M.code==="KeyL"){M.preventDefault(),ot(Math.min(a.current.currentTime+10,a.current.duration||a.current.currentTime+10));return}if(M.code==="ArrowLeft"){M.preventDefault(),ot(Math.max(a.current.currentTime-5,0));return}M.code==="ArrowRight"&&(M.preventDefault(),ot(Math.min(a.current.currentTime+5,a.current.duration||a.current.currentTime+5)))}};return window.addEventListener("keydown",b),()=>{window.removeEventListener("keydown",b)}},[]),{canvasHostRef:ve,previewName:re,previewError:Q,isRendererReady:me,loadingLabel:pe,isLoading:O,needsUserPlay:V,isPlaying:_,isMuted:l,currentTime:ce,duration:he,playbackRate:N,volume:L,isLooping:Te,sourceDimensions:ye,viewportRect:W,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:wt,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:Ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,wowFlutterAmount:Dt,isNoiseEnabled:Lt,noiseLevel:Ve,vinylDustAmount:io,hasPlayableMedia:E==="video"||E==="audio"||E==="capture",hasVideo:E==="video"||E==="capture",hasAudioOnly:E==="audio",hasImage:E==="image",isRecording:n,pendingRecordingFilename:U,prefersShareExport:$t()&&Qt(),isCaptureActive:E==="capture",canRecord:E==="video"||E==="capture"||E==="image"||E==="audio",previewFile:fo,previewStream:vo,previewUrl:bo,startDisplayCapture:xo,stopDisplayCapture:wo,togglePlayback:_t,toggleMute:Ao,seekTo:ot,stepFrame:Co,changePlaybackRate:So,changeVolume:yo,toggleLoop:Ro,setLoopingEnabled:To,resetAudioSettings:co,playVideoWithAudio:Vt,isPoweredOn:oe,powerOn:Ut,powerOff:mo,downloadPendingRecording:Lo,sharePendingRecording:Po,startRecording:Bo,stopRecording:Ot,refreshLayout:xe,toggleAudioFx:()=>{bt(b=>!b)},setLofiAmount:xt,setRadioToneAmount:At,setBitCrushAmount:Ct,setSampleRateReductionAmount:St,setBassAmount:lt,setMidAmount:Je,setTrebleAmount:yt,setStereoWidthAmount:Rt,setSmallSpeakerRoomAmount:Tt,setWowFlutterAmount:Mt,toggleNoise:()=>{p(b=>!b)},setNoiseLevel:Oe,setVinylDustAmount:ao}}const ue=nt.pc98_512,eo=(t,e,r)=>((r?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,Et=t=>{for(const[e,r]of Object.entries(nt))if(eo(t,r))return e;if(!t.matchTargetAspect)return null;for(const[e,r]of Object.entries(nt))if(eo(t,r,{ignoreDimensions:!0}))return e;return null},Bn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function In(t={}){const[e]=c.useState(()=>({targetWidth:t.targetWidth??ue.width,targetHeight:t.targetHeight??ue.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ue.colors,ditherStrength:t.ditherStrength??ue.dither,paletteMode:t.paletteMode??ue.palette,curvature:t.curvature??ue.curvature,scanlineStrength:t.scanlineStrength??ue.scanline,scanline2Strength:t.scanline2Strength??ue.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ue.vignette,glowStrength:t.glowStrength??ue.glow,smoothStrength:t.smoothStrength??ue.smoothStrength??0,toonSteps:t.toonSteps??ue.toonSteps??0,edgeBoost:t.edgeBoost??ue.edgeBoost??0,phosphorStrength:t.phosphorStrength??ue.phosphor,spotMaskStrength:t.spotMaskStrength??ue.spotMask,bulbRadius:t.bulbRadius??ue.bulbRadius,blackFloor:t.blackFloor??ue.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??ue.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ue.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ue.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ue.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ue.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ue.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ue.monoTint,neonBoost:t.neonBoost??ue.neonBoost,neonSaturation:t.neonSaturation??ue.neonSaturation,neonDetail:t.neonDetail??ue.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[r]=c.useState(()=>({...e,...Nt()?.filter,...t})),[s,o]=c.useState(r),[f,h]=c.useState(Et(r)),a=g=>{h(null),o(n=>n.targetWidth===g?n:{...n,targetWidth:g})},m=g=>{h(null),o(n=>n.targetHeight===g?n:{...n,targetHeight:g})},T=g=>{h(null),o(n=>n.matchTargetAspect===g?n:{...n,matchTargetAspect:g})},S=g=>{h(null),o(n=>({...n,colorLevels:g}))},y=g=>{h(null),o(n=>({...n,ditherStrength:g}))},x=g=>{h(null),o(n=>({...n,paletteMode:g,colorLevels:Bn(g,n.colorLevels)}))},k=g=>{h(null),o(n=>({...n,curvature:g}))},I=g=>{h(null),o(n=>({...n,scanlineStrength:g}))},ne=g=>{h(null),o(n=>({...n,scanline2Strength:g}))},F=g=>{h(null),o(n=>({...n,scanlineBrightnessFade:g}))},de=g=>{h(null),o(n=>({...n,vignetteStrength:g}))},j=g=>{h(null),o(n=>({...n,glowStrength:g}))},re=g=>{h(null),o(n=>({...n,smoothStrength:g}))},K=g=>{h(null),o(n=>({...n,toonSteps:g}))},Q=g=>{h(null),o(n=>({...n,edgeBoost:g}))},Ae=g=>{h(null),o(n=>({...n,phosphorStrength:g}))},oe=g=>{h(null),o(n=>({...n,spotMaskStrength:g}))},D=g=>{h(null),o(n=>({...n,bulbRadius:g}))},pe=g=>{h(null),o(n=>({...n,blackFloor:g}))},H=g=>{h(null),o(n=>({...n,phosphorDotLightBalance:g}))},O=g=>{h(null),o(n=>({...n,phosphorDotInternalScale:g}))},w=g=>{h(null),o(n=>({...n,phosphorDotBrightCore:g}))},V=g=>{h(null),o(n=>({...n,phosphorDotCellFill:g}))},q=g=>{h(null),o(n=>({...n,phosphorDotFlatDisc:g}))},_=g=>{h(null),o(n=>({...n,phosphorDotNeighborBlend:g}))},B=g=>{h(null),o(n=>({...n,closeUpNoiseStrength:g}))},ce=g=>{h(null),o(n=>({...n,monoTint:g}))},Z=g=>{h(null),o(n=>({...n,neonBoost:g}))},he=g=>{h(null),o(n=>({...n,neonSaturation:g}))},u=g=>{h(null),o(n=>({...n,neonDetail:g}))},E=g=>{o(n=>({...n,isFilterEnabled:g}))},i=g=>{const n=nt[g];h(g),o(G=>({...G,targetWidth:n.width,targetHeight:n.height,colorLevels:n.colors,ditherStrength:n.dither,paletteMode:n.palette,curvature:n.curvature,scanlineStrength:n.scanline,scanline2Strength:n.scanline2,vignetteStrength:n.vignette,glowStrength:n.glow,smoothStrength:n.smoothStrength??0,toonSteps:n.toonSteps??0,edgeBoost:n.edgeBoost??0,phosphorStrength:n.phosphor,spotMaskStrength:n.spotMask,bulbRadius:n.bulbRadius,blackFloor:n.blackFloor,phosphorDotLightBalance:n.phosphorDotLightBalance??1,phosphorDotInternalScale:n.phosphorDotInternalScale??!1,phosphorDotBrightCore:n.phosphorDotBrightCore??!1,phosphorDotCellFill:n.phosphorDotCellFill??0,phosphorDotFlatDisc:n.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:n.phosphorDotNeighborBlend??!1,monoTint:n.monoTint,neonBoost:n.neonBoost,neonSaturation:n.neonSaturation,neonDetail:n.neonDetail,isFilterEnabled:!0}))},ye=()=>{h(Et(e)),o(e)};return c.useEffect(()=>{$o(s)},[s]),c.useEffect(()=>{const g=Et(s);h(n=>n===g?n:g)},[s]),{...s,selectedPreset:f,setTargetWidth:a,setTargetHeight:m,setMatchTargetAspect:T,setColorLevels:S,setDitherStrength:y,setPaletteMode:x,setCurvature:k,setScanlineStrength:I,setScanline2Strength:ne,setScanlineBrightnessFade:F,setVignetteStrength:de,setGlowStrength:j,setSmoothStrength:re,setToonSteps:K,setEdgeBoost:Q,setPhosphorStrength:Ae,setSpotMaskStrength:oe,setBulbRadius:D,setBlackFloor:pe,setPhosphorDotLightBalance:H,setPhosphorDotInternalScale:O,setPhosphorDotBrightCore:w,setPhosphorDotCellFill:V,setPhosphorDotFlatDisc:q,setPhosphorDotNeighborBlend:_,setCloseUpNoiseStrength:B,setMonoTint:ce,setNeonBoost:Z,setNeonSaturation:he,setNeonDetail:u,setIsFilterEnabled:E,applyPreset:i,resetSettings:ye}}const kn=P.lazy(()=>oo(()=>import("./VideoControls-CnbcLWp0.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),Fn=P.lazy(()=>oo(()=>import("./RetroFilterPanel-COsJk_SL.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Nn=async({title:t,body:e,okText:r,cancelText:s})=>{if(typeof window>"u")return!1;const o=[t,e,r||s?`${r??"OK"} / ${s??"Cancel"}`:""].filter(Boolean).join(`

`);return window.confirm(o)};function to({locale:t="en",src:e,stream:r,streamName:s,kind:o="video",looping:f,className:h,onError:a,initialFilterState:m,confirmDialog:T=Nn}){const S=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},y=P.useMemo(()=>Nt()?.ui,[]),[x,k]=P.useState(y?.isPreviewMaximized??!1),[I,ne]=P.useState(y?.isHighResolution??!1),[F,de]=P.useState(!1),[j,re]=P.useState(!1),[K,Q]=P.useState(!1),[Ae,oe]=P.useState(0),[D,pe]=P.useState(null),H=P.useRef(null),O=P.useRef(null),w=P.useRef(null),V=P.useRef(null),[q,_]=P.useState(null),B=P.useRef(""),ce=P.useRef(""),[Z,he]=P.useState("playback"),u=In(m),E=I&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,i=En(u,F?"width":"contain",E),ye=o==="image"&&!!e&&!i.previewError&&(!i.isRendererReady||i.isLoading),g=A.jsx("div",{className:"flex min-h-[6rem] items-center justify-center text-sm text-slate-400",children:"Preparing controls..."}),n=P.useCallback(()=>{tn(),u.resetSettings(),i.resetAudioSettings(),k(!1),ne(!1)},[u,i]),G=P.useCallback(()=>{if(!i.sourceDimensions)return;const v=Math.max(8,Math.round(u.targetWidth/i.sourceDimensions.width*i.sourceDimensions.height/8)*8);v!==u.targetHeight&&u.setTargetHeight(v)},[u.targetHeight,u.targetWidth,u.setTargetHeight,i.sourceDimensions]),U=P.useCallback(()=>i.sourceDimensions?.width&&i.sourceDimensions?.height?i.sourceDimensions.width/i.sourceDimensions.height:Math.max(u.targetWidth,1)/Math.max(u.targetHeight,1),[u.targetHeight,u.targetWidth,i.sourceDimensions]),z=P.useCallback(v=>{if(u.setTargetWidth(v),!u.matchTargetAspect)return;const d=Math.max(U(),1e-4);u.setTargetHeight(Math.max(1,Math.round(v/d)))},[u,U]),Se=P.useCallback(v=>{if(u.setTargetHeight(v),!u.matchTargetAspect)return;const d=Math.max(U(),1e-4);u.setTargetWidth(Math.max(1,Math.round(v*d)))},[u,U]),X=P.useCallback(v=>{u.setMatchTargetAspect(v),v&&i.sourceDimensions&&G()},[u,i.sourceDimensions,G]);P.useEffect(()=>{u.matchTargetAspect&&i.sourceDimensions&&G()},[u.matchTargetAspect,i.sourceDimensions,G]);const ve=P.useCallback(v=>{if(u.applyPreset(v),v!=="phosphorDot"||!i.sourceDimensions)return;const d=nt.phosphorDot,te=Math.max(i.sourceDimensions.width,1),Ie=Math.max(i.sourceDimensions.height,1),Me=te/Ie,De=d.width/d.height;let se=d.width,ge=d.height;Me>De?ge=Math.max(8,Math.round(d.width/Me/8)*8):se=Math.max(8,Math.round(d.height*Me/8)*8),!(d.width===se&&d.height===ge)&&(u.setTargetWidth(se),u.setTargetHeight(ge))},[u.applyPreset,u.setTargetHeight,u.setTargetWidth,i.sourceDimensions]),Ce=P.useCallback(()=>{if(r&&i.isCaptureActive){window.setTimeout(()=>{i.previewStream(r,o==="audio"?"audio":"video",s)},120);return}window.requestAnimationFrame(()=>{i.refreshLayout(),window.requestAnimationFrame(()=>{i.refreshLayout()})})},[o,i,r,s]),Le="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",fe="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",ie="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",Re="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",me=P.useCallback(v=>{V.current!==null&&window.clearTimeout(V.current),V.current=window.setTimeout(()=>{pe(v),V.current=null},120)},[]),W=P.useCallback(()=>{V.current!==null&&(window.clearTimeout(V.current),V.current=null),pe(null)},[]),ee=P.useCallback(()=>{const v=H.current,d=w.current;if(!v||!d)return null;const te=v.getBoundingClientRect(),Ie=d.getBoundingClientRect();return{left:te.left,width:te.width,height:Ie.height}},[]),ae=P.useCallback((v,d,te="w-44")=>A.jsx("div",{role:"tooltip","aria-hidden":D!==v,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",te,D===v?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:d}),[D]);P.useEffect(()=>{if(r){const d=`stream:${r.id}:${o}:${s??""}`;if(B.current===d)return;B.current=d,(async()=>{try{await i.previewStream(r,o==="audio"?"audio":"video",s)}catch(te){if(te instanceof Error){a?.(te);return}a?.(new Error(String(te)))}})();return}if(!e){B.current="";return}const v=`src:${e}:${o}`;B.current!==v&&(B.current=v,(async()=>{try{await i.previewUrl(e,o)}catch(d){if(d instanceof Error){a?.(d);return}a?.(new Error(String(d)))}})())},[e,r,s,o,a,i]),P.useEffect(()=>{en({isPreviewMaximized:x,isHighResolution:I})},[I,x]),P.useEffect(()=>()=>{V.current!==null&&window.clearTimeout(V.current)},[]),P.useEffect(()=>{if(!x)return;const v=document.body.style.overflow,d=te=>{te.code==="Escape"&&k(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",d),()=>{document.body.style.overflow=v,window.removeEventListener("keydown",d)}},[x]),P.useEffect(()=>{x&&(re(!1),Q(!1),oe(0),_(null))},[x]),P.useEffect(()=>{if(Z!=="video-settings"||x||j){Q(!1),oe(0);return}const v=()=>{const d=O.current,te=w.current;if(!d||!te)return;const Ie=d.getBoundingClientRect().top,Me=te.getBoundingClientRect().height,De=Math.round(Math.min(Me,window.innerHeight)*.4),se=-Math.max(120,De);Q(ge=>{if(!ge&&Ie<=se){oe(Math.max(120,De));const je=ee();return je&&_(je),!0}return ge&&oe(Math.max(120,De)),ge&&Ie>=-24?(oe(0),!1):ge})};return v(),window.addEventListener("scroll",v,{passive:!0}),window.addEventListener("resize",v),()=>{window.removeEventListener("scroll",v),window.removeEventListener("resize",v)}},[Z,x,j,ee]),P.useEffect(()=>{if(!((j||K)&&!x)){_(null);return}const d=()=>{const te=ee();te&&_(te)};return d(),window.addEventListener("resize",d),window.addEventListener("scroll",d,{passive:!0}),()=>{window.removeEventListener("resize",d),window.removeEventListener("scroll",d)}},[K,x,j,F,ee,i.sourceDimensions]),P.useEffect(()=>{i.refreshLayout()},[F,j,x,i.refreshLayout,i.sourceDimensions?.height,i.sourceDimensions?.width]),P.useEffect(()=>{i.refreshLayout()},[u.targetWidth,u.targetHeight,u.isFilterEnabled,E,i.refreshLayout]),P.useEffect(()=>{if(typeof f!="boolean")return;const v=r?`stream:${r.id}:${o}`:e?`src:${e}:${o}`:"";if(!v){ce.current="";return}const d=`${v}:${f}`;ce.current!==d&&(ce.current=d,i.setLoopingEnabled(f))},[o,f,i,e,r]);const Be=!x&&i.viewportRect&&i.sourceDimensions&&(F||i.sourceDimensions.width>i.sourceDimensions.height)?Math.max(280,Math.ceil(i.viewportRect.height+24)):null,be=Be?`${Be}px`:"60vh",Pe=P.useMemo(()=>{if(i.sourceDimensions)return`${i.sourceDimensions.width} / ${i.sourceDimensions.height}`},[i.sourceDimensions]),xe=(j||K)&&!x,We=K?`calc(max(0.0rem, env(safe-area-inset-top)) - ${Ae}px)`:void 0;return A.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:A.jsxs("div",{ref:H,className:"space-y-4",children:[A.jsx("div",{ref:O,"aria-hidden":"true"}),A.jsxs("div",{ref:w,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${x?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":xe?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:xe&&q?{left:`${q.left}px`,top:We??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${q.width}px`}:x?void 0:{maxHeight:"calc(100vh - 12rem)",overflow:"visible"},children:[x&&A.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{k(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:A.jsx(jt,{size:18})}),A.jsxs("div",{className:`relative ${x?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:x?F&&Pe?{aspectRatio:Pe,minHeight:"220px",maxHeight:"calc(100vh - 4rem)"}:void 0:Pe?{aspectRatio:Pe,width:"100%",height:"auto",maxHeight:"calc(100vh - 12rem)",minHeight:"220px"}:{height:be,minHeight:"220px"},children:[A.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[ye&&A.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),A.jsx("div",{ref:i.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!i.isPoweredOn&&A.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:A.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[A.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),A.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),i.isLoading&&!i.needsUserPlay&&!i.previewError&&A.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",ye?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:A.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[A.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),A.jsx("p",{className:"font-medium",children:i.loadingLabel||"Loading preview..."}),A.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),i.needsUserPlay&&!i.isLoading&&A.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:A.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[A.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),A.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),A.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),A.jsx("button",{type:"button",onClick:()=>{i.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),i.hasAudioOnly&&A.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),A.jsxs("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:[i.canRecord&&A.jsx(A.Fragment,{children:A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":i.isRecording?"Stop recording":"Start recording",onClick:()=>{W(),(async()=>{if(i.isRecording)try{if(!await i.stopRecording())return;const d=i.prefersShareExport;if(!await T({title:"Recording ready",body:d?"Share the recorded clip now?":"Save the recorded clip now?",okText:d?"Share":"Save",cancelText:"Cancel"}))return;if(d){await i.sharePendingRecording()||i.downloadPendingRecording();return}i.downloadPendingRecording();return}catch(v){if(v instanceof Error){a?.(v);return}a?.(new Error(String(v)));return}try{await i.startRecording()}catch(v){if(v instanceof Error){a?.(v);return}a?.(new Error(String(v)))}})()},onMouseEnter:()=>me("record"),onMouseLeave:W,onFocus:()=>me("record"),onBlur:W,className:[Re,i.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:i.isRecording?A.jsx(qo,{size:14,className:"fill-current animate-pulse"}):A.jsx(Uo,{size:16,className:"text-rose-300"})}),ae("record",i.isRecording?S.recordStop:S.recordIdle)]})}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":i.isPoweredOn?"Power off":"Power on",onClick:()=>{if(W(),i.isPoweredOn){i.powerOff();return}i.powerOn()},onMouseEnter:()=>me("power"),onMouseLeave:W,onFocus:()=>me("power"),onBlur:W,className:[Le,i.isPoweredOn?fe:ie].join(" "),children:A.jsx(Zo,{size:16})}),ae("power",i.isPoweredOn?S.powerOff:S.powerOn)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":I?"Disable high resolution":"Enable high resolution",onClick:()=>{W(),ne(v=>!v)},onMouseEnter:()=>me("hi-res"),onMouseLeave:W,onFocus:()=>me("hi-res"),onBlur:W,className:[Le,I?fe:ie].join(" "),children:A.jsx(Fo,{size:16})}),ae("hi-res",S.hiRes)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":F?"Disable fit width":"Enable fit width",onClick:()=>{W(),de(v=>!v),Ce()},onMouseEnter:()=>me("fit-width"),onMouseLeave:W,onFocus:()=>me("fit-width"),onBlur:W,className:[Le,F?fe:ie].join(" "),children:A.jsx(Wo,{size:16})}),ae("fit-width",F?S.fitWidthOn:S.fitWidthOff)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{W(),Ce()},onMouseEnter:()=>me("refit"),onMouseLeave:W,onFocus:()=>me("refit"),onBlur:W,className:[Le,ie].join(" "),children:A.jsx(Yo,{size:16})}),ae("refit",S.refit)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":xe?"Unpin preview":"Pin preview",onClick:()=>{W(),!x&&re(v=>{if(!v){const te=ee();return te&&_(te),!0}return Q(!1),oe(0),_(null),!1})},onMouseEnter:()=>me("pin"),onMouseLeave:W,onFocus:()=>me("pin"),onBlur:W,className:[Le,x?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":xe?fe:ie].join(" "),disabled:x,children:A.jsx(zo,{size:16})}),ae("pin",x?S.pinUnavailable:xe?S.pinOn:S.pinOff)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":x?"Exit maximize":"Maximize preview",onClick:()=>{W(),k(v=>!v)},onMouseEnter:()=>me("maximize"),onMouseLeave:W,onFocus:()=>me("maximize"),onBlur:W,className:[Le,x?fe:ie].join(" "),children:x?A.jsx(jt,{size:16}):A.jsx(Vo,{size:16})}),ae("maximize",x?S.maximizeOn:S.maximizeOff)]})]})]})]}),xe&&q&&A.jsx("div",{style:{height:`${q.height}px`}}),A.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(i.hasPlayableMedia||i.hasImage)&&Z!=="video-settings"&&A.jsx(P.Suspense,{fallback:g,children:A.jsx(kn,{hasPlayback:i.hasPlayableMedia,currentTime:i.currentTime,duration:i.duration,mode:Z==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:i.isAudioFxEnabled,isLooping:i.isLooping,isMuted:i.isMuted,isNoiseEnabled:i.isNoiseEnabled,isPlaying:i.isPlaying,hasVideo:i.hasVideo,isVideoSettingsOpen:!1,lofiAmount:i.lofiAmount,radioToneAmount:i.radioToneAmount,bitCrushAmount:i.bitCrushAmount,sampleRateReductionAmount:i.sampleRateReductionAmount,bassAmount:i.bassAmount,midAmount:i.midAmount,trebleAmount:i.trebleAmount,stereoWidthAmount:i.stereoWidthAmount,smallSpeakerRoomAmount:i.smallSpeakerRoomAmount,wowFlutterAmount:i.wowFlutterAmount,noiseLevel:i.noiseLevel,vinylDustAmount:i.vinylDustAmount,playbackRate:i.playbackRate,volume:i.volume,onChangeLofiAmount:i.setLofiAmount,onChangeRadioToneAmount:i.setRadioToneAmount,onChangeBitCrushAmount:i.setBitCrushAmount,onChangeSampleRateReductionAmount:i.setSampleRateReductionAmount,onChangeBassAmount:i.setBassAmount,onChangeMidAmount:i.setMidAmount,onChangeTrebleAmount:i.setTrebleAmount,onChangeStereoWidthAmount:i.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:i.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:i.setWowFlutterAmount,onChangeNoiseLevel:i.setNoiseLevel,onChangeVinylDustAmount:i.setVinylDustAmount,onChangePlaybackRate:i.changePlaybackRate,onChangeVolume:i.changeVolume,onRestart:()=>{i.seekTo(0),i.playVideoWithAudio()},onSeek:i.seekTo,onStepFrame:i.stepFrame,onToggleAudioFx:i.toggleAudioFx,onToggleLoop:i.toggleLoop,onToggleMute:i.toggleMute,onToggleNoise:i.toggleNoise,onTogglePlayback:()=>{i.togglePlayback()},onBackToPlayback:()=>{he("playback")},onResetSettings:n,onToggleVideoSettings:()=>{he(v=>v==="video-settings"?"playback":"video-settings")},onToggleAudioSettings:()=>{he(v=>v==="audio-settings"?"playback":"audio-settings")}})}),i.previewError&&A.jsx("p",{className:"mt-3 text-rose-400",children:i.previewError}),Z==="video-settings"&&A.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[A.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:A.jsx("button",{type:"button",onClick:()=>{he("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),A.jsx(P.Suspense,{fallback:g,children:A.jsx(Fn,{locale:t,colorLevels:u.colorLevels,curvature:u.curvature,ditherStrength:u.ditherStrength,glowStrength:u.glowStrength,smoothStrength:u.smoothStrength,toonSteps:u.toonSteps,edgeBoost:u.edgeBoost,isFilterEnabled:u.isFilterEnabled,monoTint:u.monoTint,neonBoost:u.neonBoost,neonDetail:u.neonDetail,neonSaturation:u.neonSaturation,paletteMode:u.paletteMode,phosphorStrength:u.phosphorStrength,spotMaskStrength:u.spotMaskStrength,bulbRadius:u.bulbRadius,blackFloor:u.blackFloor,phosphorDotLightBalance:u.phosphorDotLightBalance,phosphorDotInternalScale:u.phosphorDotInternalScale,phosphorDotBrightCore:u.phosphorDotBrightCore,phosphorDotCellFill:u.phosphorDotCellFill,phosphorDotFlatDisc:u.phosphorDotFlatDisc,phosphorDotNeighborBlend:u.phosphorDotNeighborBlend,closeUpNoiseStrength:u.closeUpNoiseStrength,scanlineBrightnessFade:u.scanlineBrightnessFade,scanlineStrength:u.scanlineStrength,scanline2Strength:u.scanline2Strength,selectedPreset:u.selectedPreset,sourceDimensions:i.sourceDimensions,targetHeight:u.targetHeight,targetWidth:u.targetWidth,matchTargetAspect:u.matchTargetAspect,vignetteStrength:u.vignetteStrength,onApplyPreset:ve,onSetColorLevels:u.setColorLevels,onSetCurvature:u.setCurvature,onSetDitherStrength:u.setDitherStrength,onSetGlowStrength:u.setGlowStrength,onSetSmoothStrength:u.setSmoothStrength,onSetToonSteps:u.setToonSteps,onSetEdgeBoost:u.setEdgeBoost,onSetIsFilterEnabled:u.setIsFilterEnabled,onSetMonoTint:u.setMonoTint,onSetNeonBoost:u.setNeonBoost,onSetNeonDetail:u.setNeonDetail,onSetNeonSaturation:u.setNeonSaturation,onSetPaletteMode:u.setPaletteMode,onSetPhosphorStrength:u.setPhosphorStrength,onSetSpotMaskStrength:u.setSpotMaskStrength,onSetBulbRadius:u.setBulbRadius,onSetBlackFloor:u.setBlackFloor,onSetPhosphorDotLightBalance:u.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:u.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:u.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:u.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:u.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:u.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:u.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:u.setScanlineBrightnessFade,onSetScanlineStrength:u.setScanlineStrength,onSetScanline2Strength:u.setScanline2Strength,onSetTargetHeight:Se,onSetTargetWidth:z,onSetMatchTargetAspect:X,onSetVignetteStrength:u.setVignetteStrength})})]})]})]})})}const Gn=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:to,default:to},Symbol.toStringTag,{value:"Module"}));export{pn as M,nn as R,nt as a,Gn as b,Yo as c};
