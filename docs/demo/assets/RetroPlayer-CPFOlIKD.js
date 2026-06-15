const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-BgesXvj1.js","./index-C7ccYYh7.js","./index-CbYnBJ7w.css","./RetroFilterPanel-BV3Rehcj.js"])))=>i.map(i=>d[i]);
import{b as je,r as c,R as zt,a as P,j as w,_ as oo}from"./index-C7ccYYh7.js";const ko=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Fo=je("aperture",ko);const No=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Wo=je("arrow-left-right",No);const Go=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Uo=je("circle",Go);const Ho=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Vo=je("maximize-2",Ho);const _o=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],jt=je("minimize-2",_o);const Oo=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],zo=je("pin",Oo);const jo=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],Zo=je("power",jo);const Xo=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Yo=je("rotate-ccw",Xo);const Ko=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],qo=je("square",Ko);async function no(t,e={},i){return window.__TAURI_INTERNALS__.invoke(t,e,i)}async function Jo(t,e){await no("plugin:sharekit|share_file",{url:t,...e})}const kt="tetorica-retro-player.settings",pt=1,ft=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(kt);if(!t)return null;const e=JSON.parse(t);return e.version!==pt?null:e}catch{return null}},Ft=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(kt,JSON.stringify(t))}catch{}},Nt=()=>ft(),$o=t=>{const e=ft();Ft({version:pt,audio:e?.audio,filter:t,ui:e?.ui})},Qo=t=>{const e=ft();Ft({version:pt,audio:t,filter:e?.filter,ui:e?.ui})},en=t=>{const e=ft();Ft({version:pt,audio:e?.audio,filter:e?.filter,ui:t})},tn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(kt)}catch{}},we={isMuted:!1,volume:1,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.8,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!1,noiseLevel:.02,vinylDustAmount:0},on={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.92,lofiAmount:.7,radioToneAmount:.18,bitCrushAmount:.22,sampleRateReductionAmount:.24,bassAmount:.08,midAmount:-.08,trebleAmount:-.18,stereoWidthAmount:-.08,smallSpeakerRoomAmount:.08,wowFlutterAmount:.12,noiseLevel:.005,vinylDustAmount:0}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.88,lofiAmount:.4,radioToneAmount:.9,bitCrushAmount:.12,sampleRateReductionAmount:.38,bassAmount:-.4,midAmount:.18,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:.08,noiseLevel:.01,vinylDustAmount:0}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.06,smallSpeakerRoomAmount:.18,wowFlutterAmount:.42,noiseLevel:.0075,vinylDustAmount:0}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.96,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:.03,wowFlutterAmount:.18,noiseLevel:.0035,vinylDustAmount:.58}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.32,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:.04,noiseLevel:.0025,vinylDustAmount:.08}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.93,lofiAmount:.58,radioToneAmount:.12,bitCrushAmount:.12,sampleRateReductionAmount:.16,bassAmount:.1,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.12,wowFlutterAmount:.28,noiseLevel:.006,vinylDustAmount:0}}},nn=Object.fromEntries(Object.entries(on).map(([t,e])=>[t,{label:e.label,settings:{...we,...e.settings}}])),rn=Object.fromEntries(Object.entries(nn).map(([t,e])=>[t,e.settings])),an=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function sn(t){const i=new Float32Array(256),s=1+t*5;for(let o=0;o<256;o+=1){const f=o*2/255-1;i[o]=Math.tanh(f*s)}return i}function ln(t){const i=Math.max(1,Math.floor(t.sampleRate*.22)),s=t.createBuffer(2,i,t.sampleRate);for(let o=0;o<s.numberOfChannels;o+=1){const f=s.getChannelData(o);for(let h=0;h<f.length;h+=1){const a=h/f.length,m=(1-a)**1.85,T=.78+.22*Math.sin(a*42+o*.9),C=Math.sin(a*130+o*.35)*.08;f[h]=(Math.random()*2-1+C)*m*T*.28}}return s}function cn(t){const e=t.sampleRate*2,i=t.createBuffer(2,e,t.sampleRate);let s=0,o=0;for(let f=0;f<e;f+=1){const h=Math.random()*2-1;s=(s+h*.045)/1.045,o=o*.82+h*.18;const a=s*1.35,m=(h-o)*.55,T=Math.max(-1,Math.min(1,a+m));for(let C=0;C<i.numberOfChannels;C+=1){const S=i.getChannelData(C),x=(Math.random()*2-1)*.012;S[f]=Math.max(-1,Math.min(1,T+x))}}return i}function un(t){const e=t.sampleRate*2,i=new Float32Array(e);let s=0,o=0;for(;s<e;){const h=Math.random()*2-1;o=o*.72+h*.28,i[s]+=(h-o)*.018;const a=Math.random();if(a<.0034){const m=8+Math.floor(Math.random()*42),T=.11+Math.random()*.28,C=Math.random()<.5?-1:1;for(let S=0;S<m&&s+S<e;S+=1){const x=Math.exp(-S/(2.4+Math.random()*5));i[s+S]+=C*T*x*(.7+Math.random()*.3)}s+=m+Math.floor(Math.random()*640);continue}if(a<.0038){const m=90+Math.floor(Math.random()*260),T=.055+Math.random()*.11,C=Math.random()*Math.PI*2;for(let S=0;S<m&&s+S<e;S+=1){const x=Math.exp(-S/(18+Math.random()*40)),F=Math.sin(C+S*(.22+Math.random()*.06));i[s+S]+=T*x*F}s+=m+Math.floor(Math.random()*2200);continue}s+=1}const f=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<f.numberOfChannels;h+=1){const a=f.getChannelData(h);for(let m=0;m<e;m+=1){const T=(Math.random()*2-1)*.0035;a[m]=Math.max(-1,Math.min(1,i[m]+T))}}return f}function dn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function ro({preset:t,params:e}){return{...we,...t?rn[t]:null,...e}}class hn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null};constructor({context:e,instanceLabel:i,runtimeState:s,connectOutputToDestination:o=!0,connectOutputToRecordingDestination:f=!0,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=i,this.runtimeState=s,this.currentSettings=s.settings,this.connectOutputToDestination=o,this.connectOutputToRecordingDestination=f,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,i){an()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,i??{})}getParams(){return{...this.currentSettings}}setParams(e,i=!1){const s=i?{...this.currentSettings,...e}:{...we,...e};Object.assign(this.currentSettings,s),this.updateAudioNodes()}applyPreset(e,i){const s=ro({preset:e,params:i});Object.assign(this.currentSettings,s),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,i=this.nodes.radioToneHighpass,s=this.nodes.radioToneLowpass,o=this.nodes.radioTonePresence,f=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,a=this.nodes.lofiDrive,m=this.nodes.bitcrusher,T=this.nodes.bassEq,C=this.nodes.midEq,S=this.nodes.trebleEq,x=this.nodes.stereoWidth,F=this.nodes.roomDryGain,k=this.nodes.roomWetGain,ne=this.nodes.wowFlutterDelay,E=this.nodes.wowLfo,de=this.nodes.wowLfoGain,Z=this.nodes.flutterLfo,re=this.nodes.flutterLfoGain,q=this.nodes.noiseGain,Q=this.nodes.crackleGain,Ae=this.nodes.vinylDustBedFilter,oe=this.nodes.vinylDustBedGain,{settings:D,isPlaying:ge,isOutputEnabled:H}=this.runtimeState,z=D.isMuted||!H?0:D.volume;if(e&&(e.gain.value=z),i&&s&&o){const b=D.isAudioFxEnabled?D.radioToneAmount:0;i.frequency.value=20+b*430,i.Q.value=.4+b*.35,s.frequency.value=2e4-b*17400,s.Q.value=.2+b*.9,o.frequency.value=1700,o.Q.value=.8+b*1.4,o.gain.value=b*6}if(f&&h&&a){const b=D.isAudioFxEnabled?D.lofiAmount:0;f.frequency.value=16e3-b*14200,f.Q.value=.3+b*1.8,h.gain.value=-b*18;try{a.curve=sn(b*.6)}catch{}}if(m){const b=D.isAudioFxEnabled,V=16-(b?D.bitCrushAmount:0)*12,_=1+(b?D.sampleRateReductionAmount:0)*23,O=b?Math.max(D.bitCrushAmount,D.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(V,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(_,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(O,m.context.currentTime)}if(T&&C&&S){const b=D.isAudioFxEnabled?15:0;T.gain.value=D.bassAmount*b,C.gain.value=D.midAmount*b,S.gain.value=D.trebleAmount*b}if(x){const b=D.isAudioFxEnabled?1+D.stereoWidthAmount:1;x.parameters.get("width")?.setValueAtTime(b,x.context.currentTime)}if(F&&k){const b=D.isAudioFxEnabled?D.smallSpeakerRoomAmount:0;F.gain.value=Math.max(.52,1-b*.42),k.gain.value=b*.95}if(ne&&E&&de&&Z&&re){const b=D.isAudioFxEnabled?D.wowFlutterAmount:0;ne.delayTime.value=.006+b*.004,E.frequency.value=.18+b*.42,de.gain.value=b*.0035,Z.frequency.value=5.2+b*6.5,re.gain.value=b*9e-4}if(q&&(q.gain.value=D.isNoiseEnabled&&!D.isMuted&&H&&ge?Math.min(.24,D.noiseLevel*5.5):0),Q){const b=D.isNoiseEnabled&&!D.isMuted&&H&&ge;Q.gain.value=b?Math.min(.24,D.vinylDustAmount*.22+D.noiseLevel*.25):0}if(Ae&&oe){const V=D.isNoiseEnabled&&!D.isMuted&&H&&ge?D.vinylDustAmount:0;Ae.frequency.value=2100+V*2600,Ae.Q.value=.35+V*.25,oe.gain.value=V*.11}}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const i=this.context,s=i.createGain();let o=null;if("createMediaStreamDestination"in i)try{o=i.createMediaStreamDestination()}catch{o=null}const f=i.createBiquadFilter(),h=i.createBiquadFilter(),a=i.createBiquadFilter(),m=i.createBiquadFilter(),T=i.createBiquadFilter(),C=i.createWaveShaper();let S=null,x=null;const F=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in i&&F){const r=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await i.audioWorklet.addModule(r.href),S=new F(i,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const Re=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await i.audioWorklet.addModule(Re.href),x=new F(i,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const k=i.createBiquadFilter(),ne=i.createBiquadFilter(),E=i.createBiquadFilter(),de=i.createGain(),Z=i.createConvolver(),re=i.createGain(),q=i.createDelay(.05),Q=i.createOscillator(),Ae=i.createGain(),oe=i.createOscillator(),D=i.createGain();f.type="highpass",h.type="lowpass",a.type="peaking",m.type="lowpass",T.type="highshelf",k.type="lowshelf",k.frequency.value=180,ne.type="peaking",ne.frequency.value=1200,ne.Q.value=.9,E.type="highshelf",E.frequency.value=3200,Z.buffer=ln(i),T.frequency.value=2800,C.oversample="4x",q.delayTime.value=.006,Q.type="sine",oe.type="sine",Q.connect(Ae),Ae.connect(q.delayTime),oe.connect(D),D.connect(q.delayTime),q.connect(f),f.connect(h),h.connect(a),a.connect(m),m.connect(T),T.connect(C),S?(C.connect(S),S.connect(k)):C.connect(k),k.connect(ne),ne.connect(E),x?(E.connect(x),x.connect(de),x.connect(Z)):(E.connect(de),E.connect(Z)),Z.connect(re),de.connect(s),re.connect(s),this.connectOutputToDestination&&s.connect(i.destination),o&&this.connectOutputToRecordingDestination&&s.connect(o);const ge=i.createBufferSource();ge.buffer=cn(i),ge.loop=!0;const H=i.createBiquadFilter();H.type="highpass",H.frequency.value=1100,H.Q.value=.25;const z=i.createBiquadFilter();z.type="lowpass",z.frequency.value=5600,z.Q.value=.18;const b=i.createBiquadFilter();b.type="peaking",b.frequency.value=2400,b.Q.value=.7,b.gain.value=-2.5;const V=i.createStereoPanner(),_=i.createGain(),O=i.createOscillator(),I=i.createGain(),ce=i.createBufferSource(),X=i.createBiquadFilter(),he=i.createBiquadFilter(),u=i.createGain(),B=i.createGain();s.gain.value=0,_.gain.value=0,O.type="sine",O.frequency.value=.021,I.gain.value=.08,ce.buffer=un(i),ce.loop=!0,X.type="highpass",X.frequency.value=1250,X.Q.value=.35,he.type="bandpass",he.frequency.value=2400,he.Q.value=.4,u.gain.value=0,B.gain.value=0,ge.connect(H),H.connect(z),z.connect(b),b.connect(V),V.connect(_),_.connect(s),O.connect(I),I.connect(V.pan),ce.connect(X),X.connect(B),B.connect(s),ce.connect(he),he.connect(u),u.connect(s),ge.start(),O.start(),ce.start(),Q.start(),oe.start(),Object.assign(this.nodes,{audioContext:i,masterGain:s,radioToneHighpass:f,radioToneLowpass:h,radioTonePresence:a,recordingDestination:o,lofiLowpass:m,lofiHighshelf:T,lofiDrive:C,bitcrusher:S,bassEq:k,midEq:ne,trebleEq:E,stereoWidth:x,roomDryGain:de,roomConvolver:Z,roomWetGain:re,wowFlutterDelay:q,wowLfo:Q,wowLfoGain:Ae,flutterLfo:oe,flutterLfoGain:D,noiseSource:ge,noiseFilter:b,noisePanner:V,noiseGain:_,noiseLfo:O,noiseLfoGain:I,crackleSource:ce,crackleFilter:X,vinylDustBedFilter:he,vinylDustBedGain:u,crackleGain:B})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const i=await this.ensureInitialized();if(!i){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:i.state})}async connect(e,i,s){const o=await this.ensureInitialized();if(!o){this.debugAudio("connect:no-context");return}const f=this.output;if(!f){this.debugAudio("connect:no-output-node",{audioContextState:o.state});return}if(dn(e)){f.connect(e,i);return}f.connect(e,i,s)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function mn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:i=!1,...s}){const f={settings:ro(s),isPlaying:s.isPlaying??!0,isOutputEnabled:s.previewKind===void 0?!0:s.previewKind==="video"||s.previewKind==="audio"||s.previewKind==="capture"};return new hn({context:t,instanceLabel:s.instanceLabel??"tetorica-retro-audio-engine",runtimeState:f,connectOutputToDestination:e,connectOutputToRecordingDestination:i,enableAudioWorklet:s.enableAudioWorklet})}function K(t){return{get current(){return t()}}}function gn({instanceLabel:t,previewKind:e,previewKindRef:i,mediaRef:s,isPlaying:o,isPlayingRef:f}){const[h]=c.useState(()=>new AudioContext),[a]=c.useState(()=>{const p=Nt()?.audio;return{isMuted:p?.isMuted??we.isMuted,volume:p?.volume??we.volume,playbackRate:p?.playbackRate??we.playbackRate,isLooping:p?.isLooping??we.isLooping,isAudioFxEnabled:p?.isAudioFxEnabled??we.isAudioFxEnabled,lofiAmount:p?.lofiAmount??we.lofiAmount,radioToneAmount:p?.radioToneAmount??we.radioToneAmount,bitCrushAmount:p?.bitCrushAmount??we.bitCrushAmount,sampleRateReductionAmount:p?.sampleRateReductionAmount??we.sampleRateReductionAmount,bassAmount:p?.bassAmount??we.bassAmount,midAmount:p?.midAmount??we.midAmount,trebleAmount:p?.trebleAmount??we.trebleAmount,stereoWidthAmount:p?.stereoWidthAmount??we.stereoWidthAmount,smallSpeakerRoomAmount:p?.smallSpeakerRoomAmount??we.smallSpeakerRoomAmount,wowFlutterAmount:p?.wowFlutterAmount??we.wowFlutterAmount,isNoiseEnabled:p?.isNoiseEnabled??we.isNoiseEnabled,noiseLevel:p?.noiseLevel??we.noiseLevel,vinylDustAmount:p?.vinylDustAmount??we.vinylDustAmount}}),m=c.useRef(a.isMuted),T=c.useRef(a.volume),C=c.useRef(a.playbackRate),S=c.useRef(a.isLooping),x=c.useRef(a.isAudioFxEnabled),F=c.useRef(a.lofiAmount),k=c.useRef(a.radioToneAmount),ne=c.useRef(a.bitCrushAmount),E=c.useRef(a.sampleRateReductionAmount),de=c.useRef(a.bassAmount),Z=c.useRef(a.midAmount),re=c.useRef(a.trebleAmount),q=c.useRef(a.stereoWidthAmount),Q=c.useRef(a.smallSpeakerRoomAmount),Ae=c.useRef(a.wowFlutterAmount),oe=c.useRef(a.isNoiseEnabled),D=c.useRef(a.noiseLevel),ge=c.useRef(a.vinylDustAmount),[H,z]=c.useState(a.isMuted),[b,V]=c.useState(a.playbackRate),[_,O]=c.useState(a.volume),[I,ce]=c.useState(a.isLooping),[X,he]=c.useState(a.isAudioFxEnabled),[u,B]=c.useState(a.lofiAmount),[r,Re]=c.useState(a.radioToneAmount),[g,n]=c.useState(a.bitCrushAmount),[G,U]=c.useState(a.sampleRateReductionAmount),[j,Se]=c.useState(a.bassAmount),[Y,ve]=c.useState(a.midAmount),[Ce,Pe]=c.useState(a.trebleAmount),[pe,ie]=c.useState(a.stereoWidthAmount),[Te,me]=c.useState(a.smallSpeakerRoomAmount),[W,ee]=c.useState(a.wowFlutterAmount),[ae,ke]=c.useState(a.isNoiseEnabled),[be,Be]=c.useState(a.noiseLevel),[fe,Ge]=c.useState(a.vinylDustAmount),ye=c.useRef(null),[d]=c.useState(()=>mn({context:h,instanceLabel:t,params:a,isPlaying:o,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[R]=c.useState(()=>({audioContextRef:K(()=>d.audioContext),masterGainRef:K(()=>d.masterGain),radioToneHighpassRef:K(()=>d.radioToneHighpass),radioToneLowpassRef:K(()=>d.radioToneLowpass),radioTonePresenceRef:K(()=>d.radioTonePresence),recordingDestinationRef:K(()=>d.recordingDestination),lofiLowpassRef:K(()=>d.lofiLowpass),lofiHighshelfRef:K(()=>d.lofiHighshelf),lofiDriveRef:K(()=>d.lofiDrive),bitcrusherRef:K(()=>d.bitcrusher),bassEqRef:K(()=>d.bassEq),midEqRef:K(()=>d.midEq),trebleEqRef:K(()=>d.trebleEq),stereoWidthRef:K(()=>d.stereoWidth),roomDryGainRef:K(()=>d.roomDryGain),roomConvolverRef:K(()=>d.roomConvolver),roomWetGainRef:K(()=>d.roomWetGain),wowFlutterDelayRef:K(()=>d.wowFlutterDelay),wowLfoRef:K(()=>d.wowLfo),wowLfoGainRef:K(()=>d.wowLfoGain),flutterLfoRef:K(()=>d.flutterLfo),flutterLfoGainRef:K(()=>d.flutterLfoGain),noiseSourceRef:K(()=>d.noiseSource),noiseFilterRef:K(()=>d.noiseFilter),noisePannerRef:K(()=>d.noisePanner),noiseGainRef:K(()=>d.noiseGain),noiseLfoRef:K(()=>d.noiseLfo),noiseLfoGainRef:K(()=>d.noiseLfoGain),crackleSourceRef:K(()=>d.crackleSource),crackleFilterRef:K(()=>d.crackleFilter),vinylDustBedFilterRef:K(()=>d.vinylDustBedFilter),vinylDustBedGainRef:K(()=>d.vinylDustBedGain),crackleGainRef:K(()=>d.crackleGain)})),{audioContextRef:te,masterGainRef:De,radioToneHighpassRef:Le,radioToneLowpassRef:se,radioTonePresenceRef:xe,recordingDestinationRef:Fe,lofiLowpassRef:Ee,lofiHighshelfRef:Oe,lofiDriveRef:Ie,bitcrusherRef:He,bassEqRef:Ve,midEqRef:Ye,trebleEqRef:Ke,stereoWidthRef:Qe,roomDryGainRef:qe,roomConvolverRef:l,roomWetGainRef:y,wowFlutterDelayRef:N,wowLfoRef:le,wowLfoGainRef:L,flutterLfoRef:A,flutterLfoGainRef:Me,noiseSourceRef:J,noiseFilterRef:rt,noisePannerRef:bt,noiseGainRef:it,noiseLfoRef:xt,noiseLfoGainRef:wt,crackleSourceRef:At,crackleFilterRef:at,vinylDustBedFilterRef:Ct,vinylDustBedGainRef:st,crackleGainRef:St}=R,Ze=(p,_e)=>d.debugAudio(p,_e),lt=()=>d.ensureInitialized(),ct=()=>d.ensureInitialized(),Je=()=>d.updateAudioNodes(),ut=p=>d.connectSourceNode(p),yt=()=>d.disposeAudioEngine(),et=(p,_e)=>d.setParams(p,_e),Rt=p=>d.setIsPlaying(p),dt=p=>d.setOutputEnabled(p),Tt=async p=>{const _e=await lt();if(!_e||!d.input){Ze("connectMediaAudio:no-context",{mediaTag:p.tagName});return}ye.current&&(Ze("connectMediaAudio:disconnect-previous",{mediaTag:p.tagName}),ye.current.disconnect(),ye.current=null);try{const ze=_e.createMediaElementSource(p);ze.connect(d.input),ye.current=ze,p.muted=m.current,p.volume=m.current?0:T.current,Ze("connectMediaAudio:connected",{audioContextState:_e.state,mediaTag:p.tagName,previewKind:i.current}),Je()}catch(ze){throw Ze("connectMediaAudio:error",{audioContextState:_e.state,mediaTag:p.tagName,message:ze instanceof Error?ze.message:String(ze),previewKind:i.current}),ze}},Dt=()=>{const p=ye.current;!p||!d.input||(p.disconnect(),p.connect(d.input),Je())},Mt=async()=>{ye.current?.disconnect(),ye.current=null,await yt()},Lt=()=>{const p={...we};m.current=p.isMuted,T.current=p.volume,C.current=p.playbackRate,S.current=p.isLooping,x.current=p.isAudioFxEnabled,F.current=p.lofiAmount,k.current=p.radioToneAmount,ne.current=p.bitCrushAmount,E.current=p.sampleRateReductionAmount,de.current=p.bassAmount,Z.current=p.midAmount,re.current=p.trebleAmount,q.current=p.stereoWidthAmount,Q.current=p.smallSpeakerRoomAmount,Ae.current=p.wowFlutterAmount,oe.current=p.isNoiseEnabled,D.current=p.noiseLevel,ge.current=p.vinylDustAmount,z(p.isMuted),O(p.volume),V(p.playbackRate),ce(p.isLooping),he(p.isAudioFxEnabled),B(p.lofiAmount),Re(p.radioToneAmount),n(p.bitCrushAmount),U(p.sampleRateReductionAmount),Se(p.bassAmount),ve(p.midAmount),Pe(p.trebleAmount),ie(p.stereoWidthAmount),me(p.smallSpeakerRoomAmount),ee(p.wowFlutterAmount),ke(p.isNoiseEnabled),Be(p.noiseLevel),Ge(p.vinylDustAmount),s.current&&(s.current.muted=p.isMuted,s.current.volume=p.volume,s.current.playbackRate=p.playbackRate,s.current.loop=p.isLooping),et(p),window.requestAnimationFrame(Je)};return c.useEffect(()=>{m.current=H,T.current=_,C.current=b,S.current=I,x.current=X,F.current=u,k.current=r,ne.current=g,E.current=G,de.current=j,Z.current=Y,re.current=Ce,q.current=pe,Q.current=Te,Ae.current=W,oe.current=ae,D.current=be,ge.current=fe,et({isMuted:H,volume:_,playbackRate:b,isLooping:I,isAudioFxEnabled:X,lofiAmount:u,radioToneAmount:r,bitCrushAmount:g,sampleRateReductionAmount:G,bassAmount:j,midAmount:Y,trebleAmount:Ce,stereoWidthAmount:pe,smallSpeakerRoomAmount:Te,wowFlutterAmount:W,isNoiseEnabled:ae,noiseLevel:be,vinylDustAmount:fe},!0),Rt(o),dt(e==="video"||e==="audio"||e==="capture"),s.current&&(s.current.muted=H,s.current.volume=H?0:_,s.current.playbackRate=b,s.current.loop=I)},[H,_,X,u,r,g,G,j,Y,Ce,pe,Te,W,ae,be,fe,o,b,I,e]),c.useEffect(()=>{Qo({isMuted:H,volume:_,playbackRate:b,isLooping:I,isAudioFxEnabled:X,lofiAmount:u,radioToneAmount:r,bitCrushAmount:g,sampleRateReductionAmount:G,bassAmount:j,midAmount:Y,trebleAmount:Ce,stereoWidthAmount:pe,smallSpeakerRoomAmount:Te,wowFlutterAmount:W,isNoiseEnabled:ae,noiseLevel:be,vinylDustAmount:fe})},[H,_,b,I,X,u,r,g,G,j,Y,Ce,pe,Te,W,ae,be,fe]),{audioContextRef:te,mediaSourceRef:ye,masterGainRef:De,radioToneHighpassRef:Le,radioToneLowpassRef:se,radioTonePresenceRef:xe,recordingDestinationRef:Fe,lofiLowpassRef:Ee,lofiHighshelfRef:Oe,lofiDriveRef:Ie,bitcrusherRef:He,bassEqRef:Ve,midEqRef:Ye,trebleEqRef:Ke,stereoWidthRef:Qe,roomDryGainRef:qe,roomConvolverRef:l,roomWetGainRef:y,wowFlutterDelayRef:N,wowLfoRef:le,wowLfoGainRef:L,flutterLfoRef:A,flutterLfoGainRef:Me,noiseSourceRef:J,noiseFilterRef:rt,noisePannerRef:bt,noiseGainRef:it,noiseLfoRef:xt,noiseLfoGainRef:wt,crackleSourceRef:At,crackleFilterRef:at,vinylDustBedFilterRef:Ct,vinylDustBedGainRef:st,crackleGainRef:St,isMutedRef:m,volumeRef:T,playbackRateRef:C,isLoopingRef:S,isAudioFxEnabledRef:x,lofiAmountRef:F,radioToneAmountRef:k,bitCrushAmountRef:ne,sampleRateReductionAmountRef:E,bassAmountRef:de,midAmountRef:Z,trebleAmountRef:re,stereoWidthAmountRef:q,smallSpeakerRoomAmountRef:Q,wowFlutterAmountRef:Ae,isNoiseEnabledRef:oe,noiseLevelRef:D,vinylDustAmountRef:ge,isMuted:H,setIsMuted:z,playbackRate:b,setPlaybackRate:V,volume:_,setVolume:O,isLooping:I,setIsLooping:ce,isAudioFxEnabled:X,setIsAudioFxEnabled:he,lofiAmount:u,setLofiAmount:B,radioToneAmount:r,setRadioToneAmount:Re,bitCrushAmount:g,setBitCrushAmount:n,sampleRateReductionAmount:G,setSampleRateReductionAmount:U,bassAmount:j,setBassAmount:Se,midAmount:Y,setMidAmount:ve,trebleAmount:Ce,setTrebleAmount:Pe,stereoWidthAmount:pe,setStereoWidthAmount:ie,smallSpeakerRoomAmount:Te,setSmallSpeakerRoomAmount:me,wowFlutterAmount:W,setWowFlutterAmount:ee,isNoiseEnabled:ae,setIsNoiseEnabled:ke,noiseLevel:be,setNoiseLevel:Be,vinylDustAmount:fe,setVinylDustAmount:Ge,debugAudio:Ze,ensureAudioContext:ct,ensureInitialized:lt,updateAudioNodes:Je,connectSourceNode:ut,connectMediaAudio:Tt,reconnectCurrentMediaAudio:Dt,resetAudioSettings:Lt,disposeAudioEngine:Mt}}const pn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},fn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,vn=`#version 300 es
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
`,xn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),Xt=640,Pt=()=>typeof performance<"u"?performance.now():Date.now(),Bt=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Yt=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,wn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Kt=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),gt=t=>({width:Bt(t)?t.videoWidth:Yt(t)?t.naturalWidth:t.width,height:Bt(t)?t.videoHeight:Yt(t)?t.naturalHeight:t.height}),An=(t,e,i)=>Bt(t)&&(e>Xt||i>Xt),vt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Cn=t=>vt(t)&&t.phosphorDotInternalScale?2:1,Sn=(t,e,i,s)=>{if(i===void 0||s===void 0||i<=0||s<=0)return{width:t,height:e};const o=i/s;return t/e>o?{width:Math.max(1,Math.round(e*o)),height:e}:{width:t,height:Math.max(1,Math.round(t/o))}},yn=(t,e,i,s,o,f)=>{if(!vt(i)||o===void 0||f===void 0||o<=0||f<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+i.bulbRadius*1.15),a=Math.max(1,h/Math.max(s,1)),m=Math.max(1,Math.floor(o/a)),T=Math.max(1,Math.floor(f/a)),C=Math.min(1,m/Math.max(t,1),T/Math.max(e,1));return{width:Math.max(1,Math.round(t*C)),height:Math.max(1,Math.round(e*C))}},It=(t,e,i,s,o)=>{const f=Cn(t),h=Math.max(t.targetWidth,1),a=Math.max(t.targetHeight,1),m=t.matchTargetAspect?Sn(h,a,e,i):{width:h,height:a},T=m.width*f,C=m.height*f,S=yn(T,C,t,f,s,o);return{width:S.width,height:S.height,sampleWidth:Math.max(1,Math.round(T)),sampleHeight:Math.max(1,Math.round(C)),internalScale:f,isPhosphorDotMode:vt(t)}};function qt(t,e,i){const s=t.createShader(e);if(!s)throw new Error("Failed to create shader.");if(t.shaderSource(s,i),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(s)||"Unknown shader compile error.";throw t.deleteShader(s),new Error(o)}return s}function Jt(t,e,i){const s=qt(t,t.VERTEX_SHADER,e),o=qt(t,t.FRAGMENT_SHADER,i),f=t.createProgram();if(!f)throw t.deleteShader(s),t.deleteShader(o),new Error("Failed to create WebGL program.");if(t.attachShader(f,s),t.attachShader(f,o),t.bindAttribLocation(f,0,"aPosition"),t.linkProgram(f),t.deleteShader(s),t.deleteShader(o),!t.getProgramParameter(f,t.LINK_STATUS)){const h=t.getProgramInfoLog(f)||"Unknown program link error.";throw t.deleteProgram(f),new Error(h)}return f}class Rn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=Pt();constructor(e){this.gl=e,this.filterProgram=Jt(e,Zt,vn),this.passthroughProgram=Jt(e,Zt,bn);const i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,xn,e.STATIC_DRAW);const s=e.createVertexArray();e.bindVertexArray(s),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const o=e.createTexture();if(!o)throw new Error("Failed to create WebGL texture.");this.texture=o,e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=Pt()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const i=this.currentSource,s=this.currentFilterState;if(!this.outputEnabled||!i||!s)return;const o=this.getUploadSource(i,s);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const f=s.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,f),Kt(o)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o.width,o.height,0,e.RGBA,e.UNSIGNED_BYTE,o.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),s.isFilterEnabled){const h=gt(i);this.applyFilterUniforms(s,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,i){if(Kt(e)||!i.isFilterEnabled)return e;const s=gt(e);if(s.width<=0||s.height<=0||An(e,s.width,s.height))return e;const{width:o,height:f,sampleWidth:h,sampleHeight:a,isPhosphorDotMode:m}=It(i,s.width,s.height),T=Math.max(1,Math.round(m?h:o)),C=Math.max(1,Math.round(m?a:f)),S=this.ensureUploadContext();return!S||!this.uploadCanvas?e:(this.uploadCanvas.width!==T&&(this.uploadCanvas.width=T),this.uploadCanvas.height!==C&&(this.uploadCanvas.height=C),S.imageSmoothingEnabled=!0,S.imageSmoothingQuality="high",S.fillStyle="#000",S.fillRect(0,0,T,C),S.drawImage(e,0,0,T,C),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),i=e.getContext("2d",{alpha:!1,desynchronized:!0});return i?(this.uploadCanvas=e,this.uploadContext=i,i):null}applyFilterUniforms(e,i,s){const{gl:o}=this,f=wn(o.canvas)?o.canvas:null,h=Math.max(f?.clientWidth??o.drawingBufferWidth,1),a=Math.max(f?.clientHeight??o.drawingBufferHeight,1),{width:m,height:T,sampleWidth:C,sampleHeight:S,isPhosphorDotMode:x}=It(e,i,s,h,a);o.useProgram(this.filterProgram),o.uniform2f(this.uniformLocations.uTargetSize,m,T),o.uniform2f(this.uniformLocations.uSampleTargetSize,C,S),o.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),o.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),o.uniform1f(this.uniformLocations.uPaletteMode,fn(e.paletteMode)),o.uniform1f(this.uniformLocations.uCurvature,e.curvature),o.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),o.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),o.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),o.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),o.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),o.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),o.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),o.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),o.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),o.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),o.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),o.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),o.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),o.uniform1f(this.uniformLocations.uPixelAspect,Math.max(o.drawingBufferWidth,1)*T/(Math.max(o.drawingBufferHeight,1)*m)),o.uniform1f(this.uniformLocations.uPhosphorDotMode,x?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),o.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),o.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),o.uniform3f(this.uniformLocations.uMonoTint,...pn[e.monoTint].rgb),o.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),o.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),o.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),o.uniform1f(this.uniformLocations.uTime,(Pt()-this.startedAt)/1e3)}}function Tn({filterState:t,fitMode:e,renderResolutionScale:i,isPoweredOn:s,isPlayingRef:o,previewKindRef:f,debugVideo:h}){const a=c.useRef(null),m=c.useRef(null),T=c.useRef(null),C=c.useRef(null),S=c.useRef(null),x=c.useRef(null),F=c.useRef(null),k=c.useRef(null),ne=c.useRef(()=>{}),E=c.useRef(t),de=c.useRef(s),Z=c.useRef(!1),re=c.useRef(null),q=c.useRef(null),Q=c.useRef(null),[Ae,oe]=c.useState(!1),[D,ge]=c.useState(null);E.current=t,de.current=s;const H=c.useCallback(n=>{ge(G=>{const U=typeof n=="function"?n(G):n;return Q.current=U,U})},[]),z=c.useCallback(()=>{const n=m.current,G=S.current;n&&(n.pipeline.setOutputEnabled(de.current),n.pipeline.setSource(G),n.pipeline.setFilterState(E.current),n.pipeline.render())},[]);c.useLayoutEffect(()=>{ne.current=z},[z]);const b=c.useCallback(()=>{Z.current=!1,k.current!==null&&(window.cancelAnimationFrame(k.current),k.current=null)},[]),V=c.useCallback(()=>{if(Z.current)return;Z.current=!0;const n=()=>{if(!Z.current)return;if(ne.current(),!(f.current==="video"||f.current==="capture"||f.current==="image"||o.current)){k.current=null,Z.current=!1;return}k.current=window.requestAnimationFrame(n)};k.current=window.requestAnimationFrame(n)},[o,f]),_=c.useCallback(()=>{z()},[z]),O=c.useCallback(()=>{z()},[z]),I=c.useCallback(()=>{z()},[z]),ce=c.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),x.current={},z(),x.current),[z]),X=c.useCallback((n,G,U)=>{if(!n)return;const{width:j,height:Se}=gt(U);if(j<=0||Se<=0)return;const Y=a.current,ve=Y?.clientWidth??n.canvas.width,Ce=Y?.clientHeight??n.canvas.height,pe=e==="width"?ve/j:Math.min(ve/j,Ce/Se),ie=j*pe,Te=Se*pe,me=(ve-ie)/2,W=(Ce-Te)/2,ee={width:ie,height:Te,x:me,y:W},ae=Q.current;return ae&&ae.width===ee.width&&ae.height===ee.height&&ae.x===ee.x&&ae.y===ee.y?ae:(Q.current=ee,H(ee),ee)},[e,H]),he=c.useCallback(()=>{S.current&&X(m.current,null,S.current)},[X]),u=c.useCallback(()=>{z()},[z]),B=c.useCallback(()=>{const n=m.current,G=a.current;if(!n||!G)return;he();const U=Q.current??{x:0,y:0,width:G.clientWidth,height:G.clientHeight},j=Math.max(1,Math.round(U.width)),Se=Math.max(1,Math.round(U.height)),Y=E.current,ve=S.current?gt(S.current):null,{width:Ce,height:Pe}=It(Y,ve?.width,ve?.height,j,Se),pe=Math.max(1,Math.round(j*Math.max(1,i))),ie=Math.max(1,Math.round(Se*Math.max(1,i))),Te=Math.max(1,Math.round(Math.max(1,Ce)*Math.max(1,i))),me=Math.max(1,Math.round(Math.max(1,Pe)*Math.max(1,i))),W=vt(Y),ee=Y.isFilterEnabled&&W?Math.max(pe,Te):pe,ae=Y.isFilterEnabled&&W?Math.max(ie,me):ie;n.canvas.width!==ee&&(n.canvas.width=ee),n.canvas.height!==ae&&(n.canvas.height=ae),n.canvas.style.position="absolute",n.canvas.style.left=`${Math.round(U.x)}px`,n.canvas.style.top=`${Math.round(U.y)}px`,n.canvas.style.width=`${j}px`,n.canvas.style.height=`${Se}px`,n.canvas.style.imageRendering="pixelated",z()},[he,z,i]),r=c.useCallback(()=>{re.current!==null&&(window.cancelAnimationFrame(re.current),re.current=null),q.current!==null&&(window.clearTimeout(q.current),q.current=null),re.current=window.requestAnimationFrame(()=>{re.current=null,B()}),q.current=window.setTimeout(()=>{q.current=null,B()},120)},[B]),Re=c.useCallback(async()=>{if(!m.current){if(F.current){await F.current;return}F.current=(async()=>{const n=a.current;if(!n||m.current)return;const G=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:n.isConnected,hostWidth:n.clientWidth??null,hostHeight:n.clientHeight??null,resolution:i});const U=document.createElement("canvas");U.style.display="block",U.style.width="100%",U.style.height="100%",U.style.imageRendering="pixelated",U.style.background="#020617";const j=U.getContext("webgl2");if(!j)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-G)*10)/10});const Se={canvas:U,pipeline:new Rn(j),ticker:{start:V,stop:b}},Y=a.current;if(!Y||Y!==n||!Y.isConnected)return;Y.style.position="relative",Y.appendChild(U),m.current=Se,x.current={},oe(!0),h("initWebGL:ready",{hostWidth:Y.clientWidth??null,hostHeight:Y.clientHeight??null,resolution:i}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-G)*10)/10}),B();const ve=f.current==="video"||f.current==="capture"||f.current==="image"||o.current;s&&ve&&V(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-G)*10)/10,shouldAnimateOnInit:ve})})();try{await F.current}finally{F.current=null}}},[h,s,B,i,V,b]),g=c.useCallback(()=>{F.current=null,b(),re.current!==null&&(window.cancelAnimationFrame(re.current),re.current=null),q.current!==null&&(window.clearTimeout(q.current),q.current=null);const n=m.current;n&&(n.pipeline.dispose(),n.canvas.remove()),m.current=null,x.current=null,H(null),oe(!1)},[b,H]);return c.useEffect(()=>{const n=a.current;if(!n)return;if(typeof ResizeObserver<"u"){const U=new ResizeObserver(()=>{r()});return U.observe(n),()=>{U.disconnect()}}const G=()=>{r()};return window.addEventListener("resize",G),()=>{window.removeEventListener("resize",G)}},[r]),{canvasHostRef:a,appRef:m,spriteRef:T,textureRef:C,previewElementRef:S,filterRef:x,isRendererReady:Ae,viewportRect:D,setViewportRect:H,applyFilterState:_,createVideoTexture:n=>null,destroyPixi:g,fitCurrentSprite:he,fitSprite:X,initPixi:Re,refreshLayout:B,resetFilterInstance:ce,safeRender:u,scheduleRefreshLayout:r,syncSpriteFilter:O,syncTexturePresentation:I}}const Dn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function Mn({appRef:t,spriteRef:e,textureRef:i,previewElementRef:s,mediaRef:o,objectUrlRef:f,streamRef:h,streamOwnedRef:a,previewRequestIdRef:m,isPlayingRef:T,previewKindRef:C,audioContextRef:S,mediaSourceRef:x,masterGainRef:F,noiseGainRef:k,isMutedRef:ne,volumeRef:E,playbackRateRef:de,isLoopingRef:Z,isAudioFxEnabled:re,lofiAmount:q,bitCrushAmount:Q,sampleRateReductionAmount:Ae,bassAmount:oe,midAmount:D,trebleAmount:ge,stereoWidthAmount:H,smallSpeakerRoomAmount:z,isMuted:b,volume:V,previewKind:_,setPreviewName:O,setPreviewError:I,setNeedsUserPlay:ce,setIsPlaying:X,setCurrentTime:he,setDuration:u,setPlaybackRate:B,setIsLooping:r,setSourceDimensions:Re,setViewportRect:g,setPreviewKindState:n,setIsPoweredOn:G,beginLoading:U,finishLoading:j,ensureAudioContext:Se,updateAudioNodes:Y,connectMediaAudio:ve,fitSprite:Ce,refreshLayout:Pe,scheduleRefreshLayout:pe,safeRender:ie,resetFilterInstance:Te,initPixi:me,resetPerfAccumulators:W,debugVideo:ee,debugAudio:ae}){const ke=async()=>{Dn()&&await new Promise(l=>{window.setTimeout(l,220)})},be=()=>{const l=S.current?.currentTime;if(k.current)if(typeof l=="number"){const y=k.current.gain;y.cancelScheduledValues(l),y.setValueAtTime(y.value,l),y.linearRampToValueAtTime(0,l+.03)}else k.current.gain.value=0;if(F.current)if(typeof l=="number"){const y=F.current.gain;y.cancelScheduledValues(l),y.setValueAtTime(y.value,l),y.linearRampToValueAtTime(0,l+.03)}else F.current.gain.value=0},Be=()=>{k.current&&(k.current.gain.value=0)},fe=l=>l instanceof DOMException&&(l.name==="NotAllowedError"||l.name==="AbortError")?!0:l instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(l.message):!1,Ge=l=>fe(l)?(j(),I(""),ce(!0),se(),ie(),!0):!1,ye=(l,y,N=!0)=>{be(),l.muted=!0,l.volume=0,l.pause(),l.srcObject instanceof MediaStream&&(N&&l.srcObject.getTracks().forEach(le=>le.stop()),l.srcObject=null),l.src="",l.load(),y?.startsWith("blob:")&&URL.revokeObjectURL(y)},d=l=>new Promise((y,N)=>{const le=J=>J?J.code===MediaError.MEDIA_ERR_ABORTED?"aborted":J.code===MediaError.MEDIA_ERR_NETWORK?"network":J.code===MediaError.MEDIA_ERR_DECODE?"decode":J.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${J.code}`:"unknown",L=()=>{l.removeEventListener("loadeddata",A),l.removeEventListener("canplay",A),l.removeEventListener("error",Me)},A=()=>{L(),y()},Me=()=>{L(),N(new Error(`動画の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${le(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){y();return}l.addEventListener("loadeddata",A,{once:!0}),l.addEventListener("canplay",A,{once:!0}),l.addEventListener("error",Me,{once:!0}),l.load()}),R=l=>new Promise((y,N)=>{const le=J=>J?J.code===MediaError.MEDIA_ERR_ABORTED?"aborted":J.code===MediaError.MEDIA_ERR_NETWORK?"network":J.code===MediaError.MEDIA_ERR_DECODE?"decode":J.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${J.code}`:"unknown",L=()=>{l.removeEventListener("loadedmetadata",A),l.removeEventListener("canplay",A),l.removeEventListener("error",Me)},A=()=>{L(),y()},Me=()=>{L(),N(new Error(`音声の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${le(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_METADATA){y();return}l.addEventListener("loadedmetadata",A,{once:!0}),l.addEventListener("canplay",A,{once:!0}),l.addEventListener("error",Me,{once:!0}),l.load()}),te=l=>new Promise((y,N)=>{const le=()=>{l.removeEventListener("load",L),l.removeEventListener("error",A)},L=()=>{le(),y()},A=()=>{le(),N(new Error("画像の読み込みに失敗しました。"))};if(l.complete&&l.naturalWidth>0&&l.naturalHeight>0){y();return}l.addEventListener("load",L,{once:!0}),l.addEventListener("error",A,{once:!0})}),De=l=>{l.addEventListener("play",se),l.addEventListener("pause",se),l.addEventListener("pause",be),l.addEventListener("abort",be),l.addEventListener("emptied",be),l.addEventListener("loadstart",be),l.addEventListener("seeking",be),l.addEventListener("stalled",be),l.addEventListener("suspend",be),l.addEventListener("waiting",be),l.addEventListener("volumechange",se),l.addEventListener("timeupdate",se),l.addEventListener("durationchange",se),l.addEventListener("seeked",se),l.addEventListener("ended",se),l.addEventListener("ratechange",se)},Le=l=>{l.loop=Z.current,l.muted=ne.current,l.volume=ne.current?0:E.current,l.playbackRate=de.current,l.autoplay=!1,l.preload="auto",l.crossOrigin="anonymous",l instanceof HTMLVideoElement&&(l.playsInline=!0)},se=()=>{if(!o.current){ee("syncVideoState:no-media",{previewKind:C.current,hasPreviewElement:!!s.current}),T.current=!1,X(!1),he(0),u(0),Y(),ie();return}T.current=!o.current.paused,X(!o.current.paused),o.current.paused||j(),he(o.current.currentTime),u(o.current.duration||0),B(o.current.playbackRate||1),r(o.current.loop),Y(),ie()},xe=()=>{ee("cleanupPreview:start",{previewKind:C.current,hasMedia:!!o.current,hasPreviewElement:!!s.current}),be(),m.current+=1,j();const l=o.current,y=h.current,N=a.current;e.current=null,i.current=null,o.current=null,s.current=null,h.current=null,a.current=!1,x.current?.disconnect(),x.current=null,ce(!1),T.current=!1,X(!1),he(0),u(0),n(null),Re(null),g(null),f.current?.startsWith("blob:")&&URL.revokeObjectURL(f.current),f.current=null,l?ye(l,void 0,N):N&&y?.getTracks().forEach(le=>le.stop()),ie()},Fe=()=>{o.current&&(o.current.muted=!0,o.current.volume=0,o.current.pause()),be(),xe(),S.current?.state==="running"&&S.current.suspend()},Ee=()=>{G(!0),t.current?.ticker.start();try{W?.()}catch{}},Oe=async()=>{if(o.current)try{await Se(),o.current.muted=ne.current,o.current.volume=ne.current?0:E.current,await o.current.play(),T.current=!0,X(!0),I(""),ce(!1),ae("playVideoWithAudio",{audioContextState:S.current?.state,currentTime:o.current.currentTime,isAudioFxEnabled:re,lofiAmount:q,bitCrushAmount:Q,sampleRateReductionAmount:Ae,bassAmount:oe,midAmount:D,trebleAmount:ge,stereoWidthAmount:H,smallSpeakerRoomAmount:z,isMuted:b,volume:V}),Y(),se(),ie(),pe(),window.requestAnimationFrame(Y)}catch(l){if(j(),fe(l)){ce(!0),I("");return}ce(!1),I(l instanceof Error?l.message:"音声付き再生を開始できませんでした。")}},Ie=async()=>{if(await me(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},He=async(l,y)=>{const N=await Ie();s.current=l,Ce(N,null,l),n(y),Re(l instanceof HTMLVideoElement?{width:l.videoWidth,height:l.videoHeight}:{width:l.naturalWidth,height:l.naturalHeight}),ie(),Pe(),pe(),t.current?.ticker.start()},Ve=async l=>{const y=l.type.startsWith("video/"),N=l.type.startsWith("audio/"),le=l.type.startsWith("image/");if(!y&&!N&&!le){I("動画、音声、または画像ファイルを選んでください。");return}Ee(),xe(),Te();const L=m.current;I(""),O(l.name),U(y?"Loading video preview...":N?"Loading audio preview...":"Loading image preview...");let A=null;try{if(await Ie(),A=URL.createObjectURL(l),f.current=A,y||N){const J=y?document.createElement("video"):document.createElement("audio");if(J.src=A,Le(J),De(J),J instanceof HTMLVideoElement?await d(J):await R(J),L!==m.current){ye(J,A);return}o.current=J,J instanceof HTMLVideoElement?await He(J,"video"):(s.current=null,n("audio"),Re(null),g(null),ie()),await ve(J),se(),await ke(),await Oe(),L===m.current&&j();return}const Me=new Image;if(Me.src=A,Me.crossOrigin="anonymous",await te(Me),L!==m.current){A.startsWith("blob:")&&URL.revokeObjectURL(A);return}o.current=null,Be(),Y(),await He(Me,"image"),se(),L===m.current&&j()}catch(Me){if(L!==m.current){A?.startsWith("blob:")&&URL.revokeObjectURL(A);return}if(fe(Me)){Ge(Me);return}xe(),I(Me instanceof Error?Me.message:"動画プレビューに失敗しました。"),ce(!1)}},Ye=async()=>{if(Ee(),!navigator.mediaDevices?.getDisplayMedia){I("このブラウザでは画面キャプチャーに対応していません。");return}xe();const l=m.current;I(""),O("Display Capture"),U("Preparing display capture...");try{await Ie();const y=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(l!==m.current){y.getTracks().forEach(le=>le.stop());return}const N=document.createElement("video");N.srcObject=y,Le(N),De(N),y.getVideoTracks()[0]?.addEventListener("ended",()=>{Ke()}),await d(N),h.current=y,a.current=!0,o.current=N,await He(N,"capture"),await ve(N),ce(!1),await ke(),await Oe(),l===m.current&&j()}catch(y){if(l!==m.current||Ge(y))return;xe(),I(y instanceof Error?y.message:"画面キャプチャーを開始できませんでした。")}},Ke=()=>{_==="capture"&&(xe(),O(""),I(""))};return{cleanupPreview:xe,cleanupForPageLeave:Fe,playVideoWithAudio:Oe,previewFile:Ve,previewStream:async(l,y="video",N="Media Stream")=>{let le=0;try{if(Ee(),xe(),Te(),le=m.current,I(""),O(N),U(y==="video"?"Loading stream preview...":"Loading stream audio..."),await Ie(),y==="video"){const L=document.createElement("video");if(L.srcObject=l,Le(L),De(L),await d(L),le!==m.current){ye(L,void 0,!1);return}h.current=l,a.current=!1,o.current=L,await He(L,"capture"),await ve(L)}else{const L=document.createElement("audio");if(L.srcObject=l,Le(L),De(L),await R(L),le!==m.current){ye(L,void 0,!1);return}h.current=l,a.current=!1,o.current=L,s.current=null,n("audio"),Re(null),g(null),ie(),await ve(L),se()}if(le!==m.current)return;await ke(),await Oe(),le===m.current&&j()}catch(L){if(le!==m.current||Ge(L))return;xe(),I(L instanceof Error?L.message:String(L))}},previewUrl:async(l,y="video")=>{let N=0;const le=typeof performance<"u"?performance.now():Date.now(),L=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-le)*10)/10;try{if(ee("startup:previewUrl:start",{url:l,kind:y}),Ee(),xe(),Te(),N=m.current,I(""),O(l),U(y==="video"?"Loading video preview...":y==="image"?"Loading image preview...":"Loading audio preview..."),await Ie(),ee("startup:previewUrl:renderer-ready",{kind:y,elapsedMs:L()}),y==="video"){const A=document.createElement("video");if(A.src=l,Le(A),De(A),await d(A),ee("startup:previewUrl:video-ready",{elapsedMs:L(),readyState:A.readyState,videoWidth:A.videoWidth,videoHeight:A.videoHeight}),N!==m.current){ye(A,l);return}o.current=A,await He(A,"video"),await ve(A),se()}else if(y==="image"){const A=new Image;if(A.src=l,A.crossOrigin="anonymous",await te(A),ee("startup:previewUrl:image-ready",{elapsedMs:L(),naturalWidth:A.naturalWidth,naturalHeight:A.naturalHeight}),N!==m.current)return;o.current=null,Be(),Y(),await He(A,"image"),se()}else{const A=document.createElement("audio");if(A.src=l,Le(A),De(A),await R(A),ee("startup:previewUrl:audio-ready",{elapsedMs:L(),readyState:A.readyState,duration:A.duration}),N!==m.current){ye(A,l);return}s.current=null,n("audio"),Re(null),g(null),o.current=A,ie(),await ve(A),se()}if(N!==m.current)return;(y==="video"||y==="audio")&&(await ke(),await Oe()),N===m.current&&(j(),ee("startup:previewUrl:done",{kind:y,elapsedMs:L()}))}catch(A){if(ee("startup:previewUrl:error",{kind:y,elapsedMs:L(),error:A instanceof Error?A.message:String(A)}),N!==m.current||Ge(A))return;xe(),I(A instanceof Error?A.message:String(A))}},startDisplayCapture:Ye,stopDisplayCapture:Ke,syncVideoState:se,releaseDetachedMedia:ye,ensurePixiReady:Ie}}let Ln=0;const $t=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),Qt=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Pn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function En(t,e,i=1){const s=c.useRef(`player-${Ln+=1}`),o=c.useRef(null),f=c.useRef(null),h=c.useRef(!1),a=c.useRef(null),m=c.useRef(null),T=c.useRef([]),C=c.useRef(null),S=c.useRef(null),x=c.useRef(null),F=c.useRef(null),k=c.useRef(null),ne=c.useRef(0),E=c.useRef(!1),de=c.useRef(null),Z=c.useRef(!1),[re,q]=c.useState(""),[Q,Ae]=c.useState(""),[oe,D]=c.useState(!0),[ge,H]=c.useState(""),[z,b]=c.useState(!1),[V,_]=c.useState(!1),[O,I]=c.useState(!1),[ce,X]=c.useState(0),[he,u]=c.useState(0),[B,r]=c.useState(null),[Re,g]=c.useState(null),[n,G]=c.useState(!1),[U,j]=c.useState(null),Se=(v,M)=>{if(!Pn())return;const $=M?` ${JSON.stringify(M)}`:"";console.log(`[retro-player video][${s.current}] ${v}${$}`)},Y=Tn({filterState:t,fitMode:e,renderResolutionScale:i,isPoweredOn:oe,isPlayingRef:E,previewKindRef:de,debugVideo:Se}),{canvasHostRef:ve,appRef:Ce,spriteRef:Pe,textureRef:pe,previewElementRef:ie,filterRef:Te,isRendererReady:me,viewportRect:W,setViewportRect:ee,applyFilterState:ae,destroyPixi:ke,fitSprite:be,initPixi:Be,refreshLayout:fe,resetFilterInstance:Ge,safeRender:ye,scheduleRefreshLayout:d,syncSpriteFilter:R,syncTexturePresentation:te}=Y,De=c.useRef(Be),Le=c.useRef(ke),se=c.useRef(()=>{}),xe=c.useRef(()=>{}),Fe=gn({instanceLabel:s.current,previewKind:B,previewKindRef:de,mediaRef:a,isPlaying:O,isPlayingRef:E}),{audioContextRef:Ee,mediaSourceRef:Oe,masterGainRef:Ie,recordingDestinationRef:He,noiseGainRef:Ve,isMutedRef:Ye,volumeRef:Ke,playbackRateRef:Qe,isLoopingRef:qe,isMuted:l,setIsMuted:y,playbackRate:N,setPlaybackRate:le,volume:L,setVolume:A,isLooping:Me,setIsLooping:J,isAudioFxEnabled:rt,setIsAudioFxEnabled:bt,lofiAmount:it,setLofiAmount:xt,radioToneAmount:wt,setRadioToneAmount:At,bitCrushAmount:at,setBitCrushAmount:Ct,sampleRateReductionAmount:st,setSampleRateReductionAmount:St,bassAmount:Ze,setBassAmount:lt,midAmount:ct,setMidAmount:Je,trebleAmount:ut,setTrebleAmount:yt,stereoWidthAmount:et,setStereoWidthAmount:Rt,smallSpeakerRoomAmount:dt,setSmallSpeakerRoomAmount:Tt,wowFlutterAmount:Dt,setWowFlutterAmount:Mt,isNoiseEnabled:Lt,setIsNoiseEnabled:p,noiseLevel:_e,setNoiseLevel:ze,vinylDustAmount:io,setVinylDustAmount:ao,debugAudio:so,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:lo,reconnectCurrentMediaAudio:Wt,resetAudioSettings:co,disposeAudioEngine:Gt}=Fe;c.useEffect(()=>{De.current=Be,Le.current=ke},[Be,ke]);const uo=v=>{de.current=v,r(v)},ho=v=>{H(v),b(!0)},$e=()=>{b(!1),H("")},Ut=()=>{D(!0),Ce.current?.ticker.start()},mo=()=>{a.current&&a.current.pause(),Ve.current&&(Ve.current.gain.value=0),Ie.current&&(Ie.current.gain.value=0),$e(),_(!1),D(!1),Ce.current?.ticker.stop(),Xe()},go=Mn({filterState:t,appRef:Ce,spriteRef:Pe,textureRef:pe,previewElementRef:ie,filterRef:Te,mediaRef:a,objectUrlRef:o,streamRef:f,streamOwnedRef:h,previewRequestIdRef:ne,isPlayingRef:E,previewKindRef:de,audioContextRef:Ee,mediaSourceRef:Oe,masterGainRef:Ie,noiseGainRef:Ve,isMutedRef:Ye,volumeRef:Ke,playbackRateRef:Qe,isLoopingRef:qe,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:Ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,isMuted:l,volume:L,previewKind:B,setPreviewName:q,setPreviewError:Ae,setNeedsUserPlay:_,setIsPlaying:I,setCurrentTime:X,setDuration:u,setPlaybackRate:le,setIsLooping:J,setSourceDimensions:g,setViewportRect:ee,setPreviewKindState:uo,setIsPoweredOn:D,beginLoading:ho,finishLoading:$e,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:lo,fitSprite:be,refreshLayout:fe,scheduleRefreshLayout:d,safeRender:ye,resetFilterInstance:Ge,initPixi:Be,debugVideo:Se,debugAudio:so}),{cleanupPreview:Ht,cleanupForPageLeave:po,playVideoWithAudio:Vt,previewFile:fo,previewStream:vo,previewUrl:bo,startDisplayCapture:xo,stopDisplayCapture:wo,syncVideoState:Xe}=go;c.useEffect(()=>{se.current=Ht},[Ht]),c.useEffect(()=>{xe.current=Gt},[Gt]);const _t=async()=>{if(a.current){if(a.current.paused){oe||Ut(),await Vt(),Xe();return}a.current.pause(),Xe()}},Ao=()=>{a.current&&y(v=>{const M=!v;return Ye.current=M,window.requestAnimationFrame(tt),M})},ot=v=>{a.current&&(a.current.currentTime=v,X(v))},Co=v=>{if(!a.current)return;const M=1/30,$=Math.max(0,Math.min(a.current.currentTime+M*v,a.current.duration||a.current.currentTime+M));a.current.pause(),a.current.currentTime=$,Xe()},So=v=>{a.current&&(a.current.playbackRate=v,Qe.current=v,le(v))},yo=v=>{a.current&&(Ke.current=v,Ye.current=v===0,A(v),y(v===0),window.requestAnimationFrame(tt))},Ro=()=>{a.current&&(a.current.loop=!a.current.loop,qe.current=a.current.loop,J(a.current.loop))},To=v=>{qe.current=v,J(v),a.current&&(a.current.loop=v)},mt=()=>{if(!S.current||typeof window>"u"){x.current=null,F.current=null;return}window.URL.revokeObjectURL(S.current),S.current=null,x.current=null,F.current=null},Do=(v,M)=>{if(typeof document>"u")return;const $=document.createElement("a");$.href=v,$.download=M,$.rel="noopener",$.style.display="none",document.body.appendChild($),$.click(),window.setTimeout(()=>{$.remove()},0)},Mo=(v,M)=>{if(typeof window>"u"||v.length===0)return null;mt();const $=new Blob(v,{type:M||"video/webm"}),Ue=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,We=window.URL.createObjectURL($);return S.current=We,x.current=$,F.current=Ue,j(Ue),Ue},Lo=()=>{const v=S.current,M=F.current;!v||!M||typeof window>"u"||(Do(v,M),window.setTimeout(()=>{mt()},1e3),j(null))},Po=async()=>{const v=x.current,M=F.current;if(!v||!M||typeof window>"u")return!1;if($t()){const Ue=new Uint8Array(await v.arrayBuffer()),We=await no("persist_recording_for_share",{data:Array.from(Ue),filename:M});return await Jo(We,{mimeType:v.type||"video/webm",title:M}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Ne={files:[new File([v],M,{type:v.type||"video/webm"})],title:M};return typeof navigator.canShare=="function"&&!navigator.canShare(Ne)?!1:(await navigator.share(Ne),!0)},Eo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(M=>MediaRecorder.isTypeSupported(M))??"",Bo=async()=>{const v=Ce.current?.canvas;if(!(v instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await ht();const M=new MediaStream;v.captureStream(30).getVideoTracks().forEach(We=>M.addTrack(We)),He.current?.stream.getAudioTracks().forEach(We=>M.addTrack(We.clone()));const Ne=Eo(),Ue=Ne?new MediaRecorder(M,{mimeType:Ne}):new MediaRecorder(M);T.current=[],mt(),j(null),C.current=M,m.current=Ue,Ue.addEventListener("dataavailable",We=>{We.data.size>0&&T.current.push(We.data)}),Ue.addEventListener("stop",()=>{const We=Mo(T.current,Ue.mimeType);T.current=[],C.current?.getTracks().forEach(Io=>Io.stop()),C.current=null,m.current=null,G(!1),k.current?.(We),k.current=null},{once:!0}),Ue.start(),G(!0)},Ot=(v=!0)=>{const M=m.current;return M?new Promise($=>{if(k.current=$,v||(T.current=[]),M.state!=="inactive"){M.stop();return}C.current?.getTracks().forEach(Ne=>Ne.stop()),C.current=null,m.current=null,G(!1),k.current?.(F.current),k.current=null}):Promise.resolve(F.current)};return c.useEffect(()=>{let v=!1;return(async()=>(Se("startup:setupPixi-effect:start",{renderResolutionScale:i}),await De.current(),v&&Le.current()))(),()=>{mt(),Ot(!1),v=!0,Le.current()}},[i]),c.useEffect(()=>()=>{se.current(),xe.current()},[]),c.useEffect(()=>{const v=()=>{po()};return window.addEventListener("beforeunload",v),()=>{window.removeEventListener("beforeunload",v)}},[]),c.useEffect(()=>{const v=()=>{a.current&&(a.current.muted=!0,a.current.volume=0,a.current.pause(),Xe())};return window.addEventListener(zt,v),()=>{window.removeEventListener(zt,v)}},[Xe]),c.useEffect(()=>{if(!Qt())return;const v=$=>$==="video"||$==="audio"||$==="capture",M=()=>{const $=a.current;if(!(!$||!v(de.current))){if(document.visibilityState==="hidden"){Z.current=!$.paused,$.pause(),E.current=!1,I(!1),Ve.current&&(Ve.current.gain.value=0),Ie.current&&(Ie.current.gain.value=0),Ee.current?.state==="running"&&Ee.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await ht(),Wt(),tt(),Z.current&&a.current)try{await a.current.play(),_(!1)}catch(Ne){Ne instanceof DOMException&&Ne.name==="NotAllowedError"&&_(!0)}}finally{Xe(),Z.current=!1}})()},80)}};return document.addEventListener("visibilitychange",M),()=>{document.removeEventListener("visibilitychange",M)}},[Ee,ht,Ie,Ve,Wt,Xe,tt]),c.useLayoutEffect(()=>{ae(),R(),te(),fe()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,fe]),c.useEffect(()=>{if(Q||V){$e();return}if(B==="image"||B==="audio"){$e();return}O&&$e()},[Q,V,B,O]),c.useEffect(()=>{E.current=O;const v=(B==="video"||B==="capture")&&a.current?.tagName==="VIDEO",M=!a.current||Math.abs(a.current.currentTime)<.05,$=a.current?.ended??!1;v&&$e(),v&&!O&&!Q&&!$&&(Ee.current?.state==="suspended"||M)&&_(!0)},[Ee,O,Q,B]),c.useEffect(()=>{const v=M=>{if(!a.current)return;const $=M.target;if(!($ instanceof HTMLInputElement||$ instanceof HTMLTextAreaElement||$?.isContentEditable)){if(M.code==="Space"||M.code==="KeyK"){M.preventDefault(),_t();return}if(M.code==="KeyJ"){M.preventDefault(),ot(Math.max(a.current.currentTime-10,0));return}if(M.code==="KeyL"){M.preventDefault(),ot(Math.min(a.current.currentTime+10,a.current.duration||a.current.currentTime+10));return}if(M.code==="ArrowLeft"){M.preventDefault(),ot(Math.max(a.current.currentTime-5,0));return}M.code==="ArrowRight"&&(M.preventDefault(),ot(Math.min(a.current.currentTime+5,a.current.duration||a.current.currentTime+5)))}};return window.addEventListener("keydown",v),()=>{window.removeEventListener("keydown",v)}},[]),{canvasHostRef:ve,previewName:re,previewError:Q,isRendererReady:me,loadingLabel:ge,isLoading:z,needsUserPlay:V,isPlaying:O,isMuted:l,currentTime:ce,duration:he,playbackRate:N,volume:L,isLooping:Me,sourceDimensions:Re,viewportRect:W,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:wt,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:Ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,wowFlutterAmount:Dt,isNoiseEnabled:Lt,noiseLevel:_e,vinylDustAmount:io,hasPlayableMedia:B==="video"||B==="audio"||B==="capture",hasVideo:B==="video"||B==="capture",hasAudioOnly:B==="audio",hasImage:B==="image",isRecording:n,pendingRecordingFilename:U,prefersShareExport:$t()&&Qt(),isCaptureActive:B==="capture",canRecord:B==="video"||B==="capture"||B==="image"||B==="audio",previewFile:fo,previewStream:vo,previewUrl:bo,startDisplayCapture:xo,stopDisplayCapture:wo,togglePlayback:_t,toggleMute:Ao,seekTo:ot,stepFrame:Co,changePlaybackRate:So,changeVolume:yo,toggleLoop:Ro,setLoopingEnabled:To,resetAudioSettings:co,playVideoWithAudio:Vt,isPoweredOn:oe,powerOn:Ut,powerOff:mo,downloadPendingRecording:Lo,sharePendingRecording:Po,startRecording:Bo,stopRecording:Ot,refreshLayout:fe,toggleAudioFx:()=>{bt(v=>!v)},setLofiAmount:xt,setRadioToneAmount:At,setBitCrushAmount:Ct,setSampleRateReductionAmount:St,setBassAmount:lt,setMidAmount:Je,setTrebleAmount:yt,setStereoWidthAmount:Rt,setSmallSpeakerRoomAmount:Tt,setWowFlutterAmount:Mt,toggleNoise:()=>{p(v=>!v)},setNoiseLevel:ze,setVinylDustAmount:ao}}const ue=nt.pc98_512,eo=(t,e,i)=>((i?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,Et=t=>{for(const[e,i]of Object.entries(nt))if(eo(t,i))return e;if(!t.matchTargetAspect)return null;for(const[e,i]of Object.entries(nt))if(eo(t,i,{ignoreDimensions:!0}))return e;return null},Bn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function In(t={}){const[e]=c.useState(()=>({targetWidth:t.targetWidth??ue.width,targetHeight:t.targetHeight??ue.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ue.colors,ditherStrength:t.ditherStrength??ue.dither,paletteMode:t.paletteMode??ue.palette,curvature:t.curvature??ue.curvature,scanlineStrength:t.scanlineStrength??ue.scanline,scanline2Strength:t.scanline2Strength??ue.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ue.vignette,glowStrength:t.glowStrength??ue.glow,smoothStrength:t.smoothStrength??ue.smoothStrength??0,toonSteps:t.toonSteps??ue.toonSteps??0,edgeBoost:t.edgeBoost??ue.edgeBoost??0,phosphorStrength:t.phosphorStrength??ue.phosphor,spotMaskStrength:t.spotMaskStrength??ue.spotMask,bulbRadius:t.bulbRadius??ue.bulbRadius,blackFloor:t.blackFloor??ue.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??ue.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ue.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ue.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ue.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ue.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ue.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ue.monoTint,neonBoost:t.neonBoost??ue.neonBoost,neonSaturation:t.neonSaturation??ue.neonSaturation,neonDetail:t.neonDetail??ue.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[i]=c.useState(()=>({...e,...Nt()?.filter,...t})),[s,o]=c.useState(i),[f,h]=c.useState(Et(i)),a=g=>{h(null),o(n=>n.targetWidth===g?n:{...n,targetWidth:g})},m=g=>{h(null),o(n=>n.targetHeight===g?n:{...n,targetHeight:g})},T=g=>{h(null),o(n=>n.matchTargetAspect===g?n:{...n,matchTargetAspect:g})},C=g=>{h(null),o(n=>({...n,colorLevels:g}))},S=g=>{h(null),o(n=>({...n,ditherStrength:g}))},x=g=>{h(null),o(n=>({...n,paletteMode:g,colorLevels:Bn(g,n.colorLevels)}))},F=g=>{h(null),o(n=>({...n,curvature:g}))},k=g=>{h(null),o(n=>({...n,scanlineStrength:g}))},ne=g=>{h(null),o(n=>({...n,scanline2Strength:g}))},E=g=>{h(null),o(n=>({...n,scanlineBrightnessFade:g}))},de=g=>{h(null),o(n=>({...n,vignetteStrength:g}))},Z=g=>{h(null),o(n=>({...n,glowStrength:g}))},re=g=>{h(null),o(n=>({...n,smoothStrength:g}))},q=g=>{h(null),o(n=>({...n,toonSteps:g}))},Q=g=>{h(null),o(n=>({...n,edgeBoost:g}))},Ae=g=>{h(null),o(n=>({...n,phosphorStrength:g}))},oe=g=>{h(null),o(n=>({...n,spotMaskStrength:g}))},D=g=>{h(null),o(n=>({...n,bulbRadius:g}))},ge=g=>{h(null),o(n=>({...n,blackFloor:g}))},H=g=>{h(null),o(n=>({...n,phosphorDotLightBalance:g}))},z=g=>{h(null),o(n=>({...n,phosphorDotInternalScale:g}))},b=g=>{h(null),o(n=>({...n,phosphorDotBrightCore:g}))},V=g=>{h(null),o(n=>({...n,phosphorDotCellFill:g}))},_=g=>{h(null),o(n=>({...n,phosphorDotFlatDisc:g}))},O=g=>{h(null),o(n=>({...n,phosphorDotNeighborBlend:g}))},I=g=>{h(null),o(n=>({...n,closeUpNoiseStrength:g}))},ce=g=>{h(null),o(n=>({...n,monoTint:g}))},X=g=>{h(null),o(n=>({...n,neonBoost:g}))},he=g=>{h(null),o(n=>({...n,neonSaturation:g}))},u=g=>{h(null),o(n=>({...n,neonDetail:g}))},B=g=>{o(n=>({...n,isFilterEnabled:g}))},r=g=>{const n=nt[g];h(g),o(G=>({...G,targetWidth:n.width,targetHeight:n.height,colorLevels:n.colors,ditherStrength:n.dither,paletteMode:n.palette,curvature:n.curvature,scanlineStrength:n.scanline,scanline2Strength:n.scanline2,vignetteStrength:n.vignette,glowStrength:n.glow,smoothStrength:n.smoothStrength??0,toonSteps:n.toonSteps??0,edgeBoost:n.edgeBoost??0,phosphorStrength:n.phosphor,spotMaskStrength:n.spotMask,bulbRadius:n.bulbRadius,blackFloor:n.blackFloor,phosphorDotLightBalance:n.phosphorDotLightBalance??1,phosphorDotInternalScale:n.phosphorDotInternalScale??!1,phosphorDotBrightCore:n.phosphorDotBrightCore??!1,phosphorDotCellFill:n.phosphorDotCellFill??0,phosphorDotFlatDisc:n.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:n.phosphorDotNeighborBlend??!1,monoTint:n.monoTint,neonBoost:n.neonBoost,neonSaturation:n.neonSaturation,neonDetail:n.neonDetail,isFilterEnabled:!0}))},Re=()=>{h(Et(e)),o(e)};return c.useEffect(()=>{$o(s)},[s]),c.useEffect(()=>{const g=Et(s);h(n=>n===g?n:g)},[s]),{...s,selectedPreset:f,setTargetWidth:a,setTargetHeight:m,setMatchTargetAspect:T,setColorLevels:C,setDitherStrength:S,setPaletteMode:x,setCurvature:F,setScanlineStrength:k,setScanline2Strength:ne,setScanlineBrightnessFade:E,setVignetteStrength:de,setGlowStrength:Z,setSmoothStrength:re,setToonSteps:q,setEdgeBoost:Q,setPhosphorStrength:Ae,setSpotMaskStrength:oe,setBulbRadius:D,setBlackFloor:ge,setPhosphorDotLightBalance:H,setPhosphorDotInternalScale:z,setPhosphorDotBrightCore:b,setPhosphorDotCellFill:V,setPhosphorDotFlatDisc:_,setPhosphorDotNeighborBlend:O,setCloseUpNoiseStrength:I,setMonoTint:ce,setNeonBoost:X,setNeonSaturation:he,setNeonDetail:u,setIsFilterEnabled:B,applyPreset:r,resetSettings:Re}}const kn=P.lazy(()=>oo(()=>import("./VideoControls-BgesXvj1.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),Fn=P.lazy(()=>oo(()=>import("./RetroFilterPanel-BV3Rehcj.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Nn=async({title:t,body:e,okText:i,cancelText:s})=>{if(typeof window>"u")return!1;const o=[t,e,i||s?`${i??"OK"} / ${s??"Cancel"}`:""].filter(Boolean).join(`

`);return window.confirm(o)};function to({locale:t="en",src:e,stream:i,streamName:s,kind:o="video",looping:f,className:h,onError:a,initialFilterState:m,confirmDialog:T=Nn}){const C=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},S=P.useMemo(()=>Nt()?.ui,[]),[x,F]=P.useState(S?.isPreviewMaximized??!1),[k,ne]=P.useState(S?.isHighResolution??!1),[E,de]=P.useState(!1),[Z,re]=P.useState(!1),[q,Q]=P.useState(!1),[Ae,oe]=P.useState(0),[D,ge]=P.useState(null),H=P.useRef(null),z=P.useRef(null),b=P.useRef(null),V=P.useRef(null),[_,O]=P.useState(null),I=P.useRef(""),ce=P.useRef(""),[X,he]=P.useState("playback"),u=In(m),B=k&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,r=En(u,E?"width":"contain",B),Re=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),g=w.jsx("div",{className:"flex min-h-[6rem] items-center justify-center text-sm text-slate-400",children:"Preparing controls..."}),n=P.useCallback(()=>{tn(),u.resetSettings(),r.resetAudioSettings(),F(!1),ne(!1)},[u,r]),G=P.useCallback(()=>{if(!r.sourceDimensions)return;const d=Math.max(8,Math.round(u.targetWidth/r.sourceDimensions.width*r.sourceDimensions.height/8)*8);d!==u.targetHeight&&u.setTargetHeight(d)},[u.targetHeight,u.targetWidth,u.setTargetHeight,r.sourceDimensions]),U=P.useCallback(()=>r.sourceDimensions?.width&&r.sourceDimensions?.height?r.sourceDimensions.width/r.sourceDimensions.height:Math.max(u.targetWidth,1)/Math.max(u.targetHeight,1),[u.targetHeight,u.targetWidth,r.sourceDimensions]),j=P.useCallback(d=>{if(u.setTargetWidth(d),!u.matchTargetAspect)return;const R=Math.max(U(),1e-4);u.setTargetHeight(Math.max(1,Math.round(d/R)))},[u,U]),Se=P.useCallback(d=>{if(u.setTargetHeight(d),!u.matchTargetAspect)return;const R=Math.max(U(),1e-4);u.setTargetWidth(Math.max(1,Math.round(d*R)))},[u,U]),Y=P.useCallback(d=>{u.setMatchTargetAspect(d),d&&r.sourceDimensions&&G()},[u,r.sourceDimensions,G]);P.useEffect(()=>{u.matchTargetAspect&&r.sourceDimensions&&G()},[u.matchTargetAspect,r.sourceDimensions,G]);const ve=P.useCallback(d=>{if(u.applyPreset(d),d!=="phosphorDot"||!r.sourceDimensions)return;const R=nt.phosphorDot,te=Math.max(r.sourceDimensions.width,1),De=Math.max(r.sourceDimensions.height,1),Le=te/De,se=R.width/R.height;let xe=R.width,Fe=R.height;Le>se?Fe=Math.max(8,Math.round(R.width/Le/8)*8):xe=Math.max(8,Math.round(R.height*Le/8)*8),!(R.width===xe&&R.height===Fe)&&(u.setTargetWidth(xe),u.setTargetHeight(Fe))},[u.applyPreset,u.setTargetHeight,u.setTargetWidth,r.sourceDimensions]),Ce=P.useCallback(()=>{if(i&&r.isCaptureActive){window.setTimeout(()=>{r.previewStream(i,o==="audio"?"audio":"video",s)},120);return}window.requestAnimationFrame(()=>{r.refreshLayout(),window.requestAnimationFrame(()=>{r.refreshLayout()})})},[o,r,i,s]),Pe="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",pe="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",ie="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",Te="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",me=P.useCallback(d=>{V.current!==null&&window.clearTimeout(V.current),V.current=window.setTimeout(()=>{ge(d),V.current=null},120)},[]),W=P.useCallback(()=>{V.current!==null&&(window.clearTimeout(V.current),V.current=null),ge(null)},[]),ee=P.useCallback(()=>{const d=H.current,R=b.current;if(!d||!R)return null;const te=d.getBoundingClientRect(),De=R.getBoundingClientRect();return{left:te.left,width:te.width,height:De.height}},[]),ae=P.useCallback((d,R,te="w-44")=>w.jsx("div",{role:"tooltip","aria-hidden":D!==d,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",te,D===d?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:R}),[D]);P.useEffect(()=>{if(i){const R=`stream:${i.id}:${o}:${s??""}`;if(I.current===R)return;I.current=R,(async()=>{try{await r.previewStream(i,o==="audio"?"audio":"video",s)}catch(te){if(te instanceof Error){a?.(te);return}a?.(new Error(String(te)))}})();return}if(!e){I.current="";return}const d=`src:${e}:${o}`;I.current!==d&&(I.current=d,(async()=>{try{await r.previewUrl(e,o)}catch(R){if(R instanceof Error){a?.(R);return}a?.(new Error(String(R)))}})())},[e,i,s,o,a,r]),P.useEffect(()=>{en({isPreviewMaximized:x,isHighResolution:k})},[k,x]),P.useEffect(()=>()=>{V.current!==null&&window.clearTimeout(V.current)},[]),P.useEffect(()=>{if(!x)return;const d=document.body.style.overflow,R=te=>{te.code==="Escape"&&F(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",R),()=>{document.body.style.overflow=d,window.removeEventListener("keydown",R)}},[x]),P.useEffect(()=>{x&&(re(!1),Q(!1),oe(0),O(null))},[x]),P.useEffect(()=>{if(X!=="video-settings"||x||Z){Q(!1),oe(0);return}const d=()=>{const R=z.current,te=b.current;if(!R||!te)return;const De=R.getBoundingClientRect().top,Le=te.getBoundingClientRect().height,se=Math.round(Math.min(Le,window.innerHeight)*.4),xe=-Math.max(120,se);Q(Fe=>{if(!Fe&&De<=xe){oe(Math.max(120,se));const Ee=ee();return Ee&&O(Ee),!0}return Fe&&oe(Math.max(120,se)),Fe&&De>=-24?(oe(0),!1):Fe})};return d(),window.addEventListener("scroll",d,{passive:!0}),window.addEventListener("resize",d),()=>{window.removeEventListener("scroll",d),window.removeEventListener("resize",d)}},[X,x,Z,ee]),P.useEffect(()=>{if(!((Z||q)&&!x)){O(null);return}const R=()=>{const te=ee();te&&O(te)};return R(),window.addEventListener("resize",R),window.addEventListener("scroll",R,{passive:!0}),()=>{window.removeEventListener("resize",R),window.removeEventListener("scroll",R)}},[q,x,Z,E,ee,r.sourceDimensions]),P.useEffect(()=>{r.refreshLayout()},[E,Z,x,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]),P.useEffect(()=>{r.refreshLayout()},[u.targetWidth,u.targetHeight,u.isFilterEnabled,B,r.refreshLayout]),P.useEffect(()=>{if(typeof f!="boolean")return;const d=i?`stream:${i.id}:${o}`:e?`src:${e}:${o}`:"";if(!d){ce.current="";return}const R=`${d}:${f}`;ce.current!==R&&(ce.current=R,r.setLoopingEnabled(f))},[o,f,r,e,i]);const ke=!x&&r.viewportRect&&r.sourceDimensions&&(E||r.sourceDimensions.width>r.sourceDimensions.height)?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,be=ke?`${ke}px`:"60vh",Be=P.useMemo(()=>{if(!(!E||!r.sourceDimensions))return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[E,r.sourceDimensions]),fe=(Z||q)&&!x,Ge=q?`calc(max(0.0rem, env(safe-area-inset-top)) - ${Ae}px)`:void 0,ye=P.useMemo(()=>{if(!fe||!E||!r.sourceDimensions||!_||typeof window>"u")return;const d=Math.max(r.sourceDimensions.width/Math.max(r.sourceDimensions.height,1),1e-4),R=_.width/d,te=Math.max(220,Math.round(window.innerHeight*.68));return`${Math.min(R,te)}px`},[E,fe,_,r.sourceDimensions]);return w.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:w.jsxs("div",{ref:H,className:"space-y-4",children:[w.jsx("div",{ref:z,"aria-hidden":"true"}),w.jsxs("div",{ref:b,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${x?`fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 ${E?"overflow-y-auto":"flex items-stretch justify-stretch"}`:fe?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":""}`,style:fe&&_?{left:`${_.left}px`,top:Ge??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${_.width}px`}:void 0,children:[x&&w.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{F(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:w.jsx(jt,{size:18})}),w.jsxs("div",{className:`relative ${x?E?"w-full":"h-full min-h-0 w-full":"w-full min-w-0"}`,style:x?E&&Be?{aspectRatio:Be,minHeight:"220px"}:void 0:{aspectRatio:Be,height:Be?ye:be,minHeight:"220px"},children:[w.jsxs("div",{className:"relative h-full w-full overflow-hidden rounded-xl bg-slate-950",children:[Re&&w.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),w.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&w.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/72",children:w.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[w.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),w.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&w.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",Re?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:w.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[w.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),w.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),w.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&w.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:w.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[w.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),w.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),w.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),w.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&w.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),w.jsxs("div",{className:"absolute -bottom-8 right-3 z-20 flex items-center gap-2",children:[r.canRecord&&w.jsx(w.Fragment,{children:w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{W(),(async()=>{if(r.isRecording)try{if(!await r.stopRecording())return;const R=r.prefersShareExport;if(!await T({title:"Recording ready",body:R?"Share the recorded clip now?":"Save the recorded clip now?",okText:R?"Share":"Save",cancelText:"Cancel"}))return;if(R){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording();return}catch(d){if(d instanceof Error){a?.(d);return}a?.(new Error(String(d)));return}try{await r.startRecording()}catch(d){if(d instanceof Error){a?.(d);return}a?.(new Error(String(d)))}})()},onMouseEnter:()=>me("record"),onMouseLeave:W,onFocus:()=>me("record"),onBlur:W,className:[Te,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?w.jsx(qo,{size:14,className:"fill-current animate-pulse"}):w.jsx(Uo,{size:16,className:"text-rose-300"})}),ae("record",r.isRecording?C.recordStop:C.recordIdle)]})}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(W(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>me("power"),onMouseLeave:W,onFocus:()=>me("power"),onBlur:W,className:[Pe,r.isPoweredOn?pe:ie].join(" "),children:w.jsx(Zo,{size:16})}),ae("power",r.isPoweredOn?C.powerOff:C.powerOn)]}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":k?"Disable high resolution":"Enable high resolution",onClick:()=>{W(),ne(d=>!d)},onMouseEnter:()=>me("hi-res"),onMouseLeave:W,onFocus:()=>me("hi-res"),onBlur:W,className:[Pe,k?pe:ie].join(" "),children:w.jsx(Fo,{size:16})}),ae("hi-res",C.hiRes)]}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":E?"Disable fit width":"Enable fit width",onClick:()=>{W(),de(d=>!d),Ce()},onMouseEnter:()=>me("fit-width"),onMouseLeave:W,onFocus:()=>me("fit-width"),onBlur:W,className:[Pe,E?pe:ie].join(" "),children:w.jsx(Wo,{size:16})}),ae("fit-width",E?C.fitWidthOn:C.fitWidthOff)]}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{W(),Ce()},onMouseEnter:()=>me("refit"),onMouseLeave:W,onFocus:()=>me("refit"),onBlur:W,className:[Pe,ie].join(" "),children:w.jsx(Yo,{size:16})}),ae("refit",C.refit)]}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":fe?"Unpin preview":"Pin preview",onClick:()=>{W(),!x&&re(d=>{if(!d){const te=ee();return te&&O(te),!0}return Q(!1),oe(0),O(null),!1})},onMouseEnter:()=>me("pin"),onMouseLeave:W,onFocus:()=>me("pin"),onBlur:W,className:[Pe,x?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":fe?pe:ie].join(" "),disabled:x,children:w.jsx(zo,{size:16})}),ae("pin",x?C.pinUnavailable:fe?C.pinOn:C.pinOff)]}),w.jsxs("div",{className:"relative",children:[w.jsx("button",{type:"button","aria-label":x?"Exit maximize":"Maximize preview",onClick:()=>{W(),F(d=>!d)},onMouseEnter:()=>me("maximize"),onMouseLeave:W,onFocus:()=>me("maximize"),onBlur:W,className:[Pe,x?pe:ie].join(" "),children:x?w.jsx(jt,{size:16}):w.jsx(Vo,{size:16})}),ae("maximize",x?C.maximizeOn:C.maximizeOff)]})]})]})]}),fe&&_&&w.jsx("div",{style:{height:`${_.height}px`}}),w.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(r.hasPlayableMedia||r.hasImage)&&X!=="video-settings"&&w.jsx(P.Suspense,{fallback:g,children:w.jsx(kn,{hasPlayback:r.hasPlayableMedia,currentTime:r.currentTime,duration:r.duration,mode:X==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:r.isAudioFxEnabled,isLooping:r.isLooping,isMuted:r.isMuted,isNoiseEnabled:r.isNoiseEnabled,isPlaying:r.isPlaying,hasVideo:r.hasVideo,isVideoSettingsOpen:!1,lofiAmount:r.lofiAmount,radioToneAmount:r.radioToneAmount,bitCrushAmount:r.bitCrushAmount,sampleRateReductionAmount:r.sampleRateReductionAmount,bassAmount:r.bassAmount,midAmount:r.midAmount,trebleAmount:r.trebleAmount,stereoWidthAmount:r.stereoWidthAmount,smallSpeakerRoomAmount:r.smallSpeakerRoomAmount,wowFlutterAmount:r.wowFlutterAmount,noiseLevel:r.noiseLevel,vinylDustAmount:r.vinylDustAmount,playbackRate:r.playbackRate,volume:r.volume,onChangeLofiAmount:r.setLofiAmount,onChangeRadioToneAmount:r.setRadioToneAmount,onChangeBitCrushAmount:r.setBitCrushAmount,onChangeSampleRateReductionAmount:r.setSampleRateReductionAmount,onChangeBassAmount:r.setBassAmount,onChangeMidAmount:r.setMidAmount,onChangeTrebleAmount:r.setTrebleAmount,onChangeStereoWidthAmount:r.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:r.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:r.setWowFlutterAmount,onChangeNoiseLevel:r.setNoiseLevel,onChangeVinylDustAmount:r.setVinylDustAmount,onChangePlaybackRate:r.changePlaybackRate,onChangeVolume:r.changeVolume,onRestart:()=>{r.seekTo(0),r.playVideoWithAudio()},onSeek:r.seekTo,onStepFrame:r.stepFrame,onToggleAudioFx:r.toggleAudioFx,onToggleLoop:r.toggleLoop,onToggleMute:r.toggleMute,onToggleNoise:r.toggleNoise,onTogglePlayback:()=>{r.togglePlayback()},onBackToPlayback:()=>{he("playback")},onResetSettings:n,onToggleVideoSettings:()=>{he(d=>d==="video-settings"?"playback":"video-settings")},onToggleAudioSettings:()=>{he(d=>d==="audio-settings"?"playback":"audio-settings")}})}),r.previewError&&w.jsx("p",{className:"mt-3 text-rose-400",children:r.previewError}),X==="video-settings"&&w.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[w.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:w.jsx("button",{type:"button",onClick:()=>{he("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),w.jsx(P.Suspense,{fallback:g,children:w.jsx(Fn,{locale:t,colorLevels:u.colorLevels,curvature:u.curvature,ditherStrength:u.ditherStrength,glowStrength:u.glowStrength,smoothStrength:u.smoothStrength,toonSteps:u.toonSteps,edgeBoost:u.edgeBoost,isFilterEnabled:u.isFilterEnabled,monoTint:u.monoTint,neonBoost:u.neonBoost,neonDetail:u.neonDetail,neonSaturation:u.neonSaturation,paletteMode:u.paletteMode,phosphorStrength:u.phosphorStrength,spotMaskStrength:u.spotMaskStrength,bulbRadius:u.bulbRadius,blackFloor:u.blackFloor,phosphorDotLightBalance:u.phosphorDotLightBalance,phosphorDotInternalScale:u.phosphorDotInternalScale,phosphorDotBrightCore:u.phosphorDotBrightCore,phosphorDotCellFill:u.phosphorDotCellFill,phosphorDotFlatDisc:u.phosphorDotFlatDisc,phosphorDotNeighborBlend:u.phosphorDotNeighborBlend,closeUpNoiseStrength:u.closeUpNoiseStrength,scanlineBrightnessFade:u.scanlineBrightnessFade,scanlineStrength:u.scanlineStrength,scanline2Strength:u.scanline2Strength,selectedPreset:u.selectedPreset,sourceDimensions:r.sourceDimensions,targetHeight:u.targetHeight,targetWidth:u.targetWidth,matchTargetAspect:u.matchTargetAspect,vignetteStrength:u.vignetteStrength,onApplyPreset:ve,onSetColorLevels:u.setColorLevels,onSetCurvature:u.setCurvature,onSetDitherStrength:u.setDitherStrength,onSetGlowStrength:u.setGlowStrength,onSetSmoothStrength:u.setSmoothStrength,onSetToonSteps:u.setToonSteps,onSetEdgeBoost:u.setEdgeBoost,onSetIsFilterEnabled:u.setIsFilterEnabled,onSetMonoTint:u.setMonoTint,onSetNeonBoost:u.setNeonBoost,onSetNeonDetail:u.setNeonDetail,onSetNeonSaturation:u.setNeonSaturation,onSetPaletteMode:u.setPaletteMode,onSetPhosphorStrength:u.setPhosphorStrength,onSetSpotMaskStrength:u.setSpotMaskStrength,onSetBulbRadius:u.setBulbRadius,onSetBlackFloor:u.setBlackFloor,onSetPhosphorDotLightBalance:u.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:u.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:u.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:u.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:u.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:u.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:u.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:u.setScanlineBrightnessFade,onSetScanlineStrength:u.setScanlineStrength,onSetScanline2Strength:u.setScanline2Strength,onSetTargetHeight:Se,onSetTargetWidth:j,onSetMatchTargetAspect:Y,onSetVignetteStrength:u.setVignetteStrength})})]})]})]})})}const Gn=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:to,default:to},Symbol.toStringTag,{value:"Module"}));export{pn as M,nn as R,nt as a,Gn as b,Yo as c};
