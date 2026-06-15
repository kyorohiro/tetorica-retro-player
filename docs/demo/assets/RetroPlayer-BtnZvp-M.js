const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-D4Vql_Ie.js","./index-DCpyCO4t.js","./index-CbYnBJ7w.css","./RetroFilterPanel-C9AwYTZ4.js"])))=>i.map(i=>d[i]);
import{b as je,r as l,R as zt,a as P,j as x,_ as oo}from"./index-DCpyCO4t.js";const ko=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Fo=je("aperture",ko);const No=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Wo=je("arrow-left-right",No);const Go=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Uo=je("circle",Go);const Ho=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Vo=je("maximize-2",Ho);const _o=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],jt=je("minimize-2",_o);const Oo=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],zo=je("pin",Oo);const jo=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],Zo=je("power",jo);const Xo=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Yo=je("rotate-ccw",Xo);const Ko=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],qo=je("square",Ko);async function no(t,e={},r){return window.__TAURI_INTERNALS__.invoke(t,e,r)}async function Jo(t,e){await no("plugin:sharekit|share_file",{url:t,...e})}const kt="tetorica-retro-player.settings",pt=1,ft=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(kt);if(!t)return null;const e=JSON.parse(t);return e.version!==pt?null:e}catch{return null}},Ft=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(kt,JSON.stringify(t))}catch{}},Nt=()=>ft(),$o=t=>{const e=ft();Ft({version:pt,audio:e?.audio,filter:t,ui:e?.ui})},Qo=t=>{const e=ft();Ft({version:pt,audio:t,filter:e?.filter,ui:e?.ui})},en=t=>{const e=ft();Ft({version:pt,audio:e?.audio,filter:e?.filter,ui:t})},tn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(kt)}catch{}},we={isMuted:!1,volume:1,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.8,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!1,noiseLevel:.02,vinylDustAmount:0},on={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.92,lofiAmount:.7,radioToneAmount:.18,bitCrushAmount:.22,sampleRateReductionAmount:.24,bassAmount:.08,midAmount:-.08,trebleAmount:-.18,stereoWidthAmount:-.08,smallSpeakerRoomAmount:.08,wowFlutterAmount:.12,noiseLevel:.005,vinylDustAmount:0}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.88,lofiAmount:.4,radioToneAmount:.9,bitCrushAmount:.12,sampleRateReductionAmount:.38,bassAmount:-.4,midAmount:.18,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:.08,noiseLevel:.01,vinylDustAmount:0}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.06,smallSpeakerRoomAmount:.18,wowFlutterAmount:.42,noiseLevel:.0075,vinylDustAmount:0}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.96,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:.03,wowFlutterAmount:.18,noiseLevel:.0035,vinylDustAmount:.58}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.32,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:.04,noiseLevel:.0025,vinylDustAmount:.08}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.93,lofiAmount:.58,radioToneAmount:.12,bitCrushAmount:.12,sampleRateReductionAmount:.16,bassAmount:.1,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.12,wowFlutterAmount:.28,noiseLevel:.006,vinylDustAmount:0}}},nn=Object.fromEntries(Object.entries(on).map(([t,e])=>[t,{label:e.label,settings:{...we,...e.settings}}])),rn=Object.fromEntries(Object.entries(nn).map(([t,e])=>[t,e.settings])),an=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function sn(t){const r=new Float32Array(256),a=1+t*5;for(let n=0;n<256;n+=1){const p=n*2/255-1;r[n]=Math.tanh(p*a)}return r}function ln(t){const r=Math.max(1,Math.floor(t.sampleRate*.22)),a=t.createBuffer(2,r,t.sampleRate);for(let n=0;n<a.numberOfChannels;n+=1){const p=a.getChannelData(n);for(let h=0;h<p.length;h+=1){const i=h/p.length,m=(1-i)**1.85,T=.78+.22*Math.sin(i*42+n*.9),A=Math.sin(i*130+n*.35)*.08;p[h]=(Math.random()*2-1+A)*m*T*.28}}return a}function cn(t){const e=t.sampleRate*2,r=t.createBuffer(2,e,t.sampleRate);let a=0,n=0;for(let p=0;p<e;p+=1){const h=Math.random()*2-1;a=(a+h*.045)/1.045,n=n*.82+h*.18;const i=a*1.35,m=(h-n)*.55,T=Math.max(-1,Math.min(1,i+m));for(let A=0;A<r.numberOfChannels;A+=1){const C=r.getChannelData(A),b=(Math.random()*2-1)*.012;C[p]=Math.max(-1,Math.min(1,T+b))}}return r}function un(t){const e=t.sampleRate*2,r=new Float32Array(e);let a=0,n=0;for(;a<e;){const h=Math.random()*2-1;n=n*.72+h*.28,r[a]+=(h-n)*.018;const i=Math.random();if(i<.0034){const m=8+Math.floor(Math.random()*42),T=.11+Math.random()*.28,A=Math.random()<.5?-1:1;for(let C=0;C<m&&a+C<e;C+=1){const b=Math.exp(-C/(2.4+Math.random()*5));r[a+C]+=A*T*b*(.7+Math.random()*.3)}a+=m+Math.floor(Math.random()*640);continue}if(i<.0038){const m=90+Math.floor(Math.random()*260),T=.055+Math.random()*.11,A=Math.random()*Math.PI*2;for(let C=0;C<m&&a+C<e;C+=1){const b=Math.exp(-C/(18+Math.random()*40)),F=Math.sin(A+C*(.22+Math.random()*.06));r[a+C]+=T*b*F}a+=m+Math.floor(Math.random()*2200);continue}a+=1}const p=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<p.numberOfChannels;h+=1){const i=p.getChannelData(h);for(let m=0;m<e;m+=1){const T=(Math.random()*2-1)*.0035;i[m]=Math.max(-1,Math.min(1,r[m]+T))}}return p}function dn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function ro({preset:t,params:e}){return{...we,...t?rn[t]:null,...e}}class hn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null};constructor({context:e,instanceLabel:r,runtimeState:a,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:p=!0,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=r,this.runtimeState=a,this.currentSettings=a.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=p,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,r){an()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,r??{})}getParams(){return{...this.currentSettings}}setParams(e,r=!1){const a=r?{...this.currentSettings,...e}:{...we,...e};Object.assign(this.currentSettings,a),this.updateAudioNodes()}applyPreset(e,r){const a=ro({preset:e,params:r});Object.assign(this.currentSettings,a),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,r=this.nodes.radioToneHighpass,a=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,p=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,i=this.nodes.lofiDrive,m=this.nodes.bitcrusher,T=this.nodes.bassEq,A=this.nodes.midEq,C=this.nodes.trebleEq,b=this.nodes.stereoWidth,F=this.nodes.roomDryGain,k=this.nodes.roomWetGain,ne=this.nodes.wowFlutterDelay,E=this.nodes.wowLfo,ue=this.nodes.wowLfoGain,Z=this.nodes.flutterLfo,re=this.nodes.flutterLfoGain,q=this.nodes.noiseGain,Q=this.nodes.crackleGain,Ae=this.nodes.vinylDustBedFilter,oe=this.nodes.vinylDustBedGain,{settings:D,isPlaying:ge,isOutputEnabled:U}=this.runtimeState,O=D.isMuted||!U?0:D.volume;if(e&&(e.gain.value=O),r&&a&&n){const v=D.isAudioFxEnabled?D.radioToneAmount:0;r.frequency.value=20+v*430,r.Q.value=.4+v*.35,a.frequency.value=2e4-v*17400,a.Q.value=.2+v*.9,n.frequency.value=1700,n.Q.value=.8+v*1.4,n.gain.value=v*6}if(p&&h&&i){const v=D.isAudioFxEnabled?D.lofiAmount:0;p.frequency.value=16e3-v*14200,p.Q.value=.3+v*1.8,h.gain.value=-v*18;try{i.curve=sn(v*.6)}catch{}}if(m){const v=D.isAudioFxEnabled,H=16-(v?D.bitCrushAmount:0)*12,V=1+(v?D.sampleRateReductionAmount:0)*23,_=v?Math.max(D.bitCrushAmount,D.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(H,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(V,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(_,m.context.currentTime)}if(T&&A&&C){const v=D.isAudioFxEnabled?15:0;T.gain.value=D.bassAmount*v,A.gain.value=D.midAmount*v,C.gain.value=D.trebleAmount*v}if(b){const v=D.isAudioFxEnabled?1+D.stereoWidthAmount:1;b.parameters.get("width")?.setValueAtTime(v,b.context.currentTime)}if(F&&k){const v=D.isAudioFxEnabled?D.smallSpeakerRoomAmount:0;F.gain.value=Math.max(.52,1-v*.42),k.gain.value=v*.95}if(ne&&E&&ue&&Z&&re){const v=D.isAudioFxEnabled?D.wowFlutterAmount:0;ne.delayTime.value=.006+v*.004,E.frequency.value=.18+v*.42,ue.gain.value=v*.0035,Z.frequency.value=5.2+v*6.5,re.gain.value=v*9e-4}if(q&&(q.gain.value=D.isNoiseEnabled&&!D.isMuted&&U&&ge?Math.min(.24,D.noiseLevel*5.5):0),Q){const v=D.isNoiseEnabled&&!D.isMuted&&U&&ge;Q.gain.value=v?Math.min(.24,D.vinylDustAmount*.22+D.noiseLevel*.25):0}if(Ae&&oe){const H=D.isNoiseEnabled&&!D.isMuted&&U&&ge?D.vinylDustAmount:0;Ae.frequency.value=2100+H*2600,Ae.Q.value=.35+H*.25,oe.gain.value=H*.11}}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const r=this.context,a=r.createGain();let n=null;if("createMediaStreamDestination"in r)try{n=r.createMediaStreamDestination()}catch{n=null}const p=r.createBiquadFilter(),h=r.createBiquadFilter(),i=r.createBiquadFilter(),m=r.createBiquadFilter(),T=r.createBiquadFilter(),A=r.createWaveShaper();let C=null,b=null;const F=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in r&&F){const o=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await r.audioWorklet.addModule(o.href),C=new F(r,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const d=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await r.audioWorklet.addModule(d.href),b=new F(r,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const k=r.createBiquadFilter(),ne=r.createBiquadFilter(),E=r.createBiquadFilter(),ue=r.createGain(),Z=r.createConvolver(),re=r.createGain(),q=r.createDelay(.05),Q=r.createOscillator(),Ae=r.createGain(),oe=r.createOscillator(),D=r.createGain();p.type="highpass",h.type="lowpass",i.type="peaking",m.type="lowpass",T.type="highshelf",k.type="lowshelf",k.frequency.value=180,ne.type="peaking",ne.frequency.value=1200,ne.Q.value=.9,E.type="highshelf",E.frequency.value=3200,Z.buffer=ln(r),T.frequency.value=2800,A.oversample="4x",q.delayTime.value=.006,Q.type="sine",oe.type="sine",Q.connect(Ae),Ae.connect(q.delayTime),oe.connect(D),D.connect(q.delayTime),q.connect(p),p.connect(h),h.connect(i),i.connect(m),m.connect(T),T.connect(A),C?(A.connect(C),C.connect(k)):A.connect(k),k.connect(ne),ne.connect(E),b?(E.connect(b),b.connect(ue),b.connect(Z)):(E.connect(ue),E.connect(Z)),Z.connect(re),ue.connect(a),re.connect(a),this.connectOutputToDestination&&a.connect(r.destination),n&&this.connectOutputToRecordingDestination&&a.connect(n);const ge=r.createBufferSource();ge.buffer=cn(r),ge.loop=!0;const U=r.createBiquadFilter();U.type="highpass",U.frequency.value=1100,U.Q.value=.25;const O=r.createBiquadFilter();O.type="lowpass",O.frequency.value=5600,O.Q.value=.18;const v=r.createBiquadFilter();v.type="peaking",v.frequency.value=2400,v.Q.value=.7,v.gain.value=-2.5;const H=r.createStereoPanner(),V=r.createGain(),_=r.createOscillator(),I=r.createGain(),ce=r.createBufferSource(),X=r.createBiquadFilter(),de=r.createBiquadFilter(),u=r.createGain(),B=r.createGain();a.gain.value=0,V.gain.value=0,_.type="sine",_.frequency.value=.021,I.gain.value=.08,ce.buffer=un(r),ce.loop=!0,X.type="highpass",X.frequency.value=1250,X.Q.value=.35,de.type="bandpass",de.frequency.value=2400,de.Q.value=.4,u.gain.value=0,B.gain.value=0,ge.connect(U),U.connect(O),O.connect(v),v.connect(H),H.connect(V),V.connect(a),_.connect(I),I.connect(H.pan),ce.connect(X),X.connect(B),B.connect(a),ce.connect(de),de.connect(u),u.connect(a),ge.start(),_.start(),ce.start(),Q.start(),oe.start(),Object.assign(this.nodes,{audioContext:r,masterGain:a,radioToneHighpass:p,radioToneLowpass:h,radioTonePresence:i,recordingDestination:n,lofiLowpass:m,lofiHighshelf:T,lofiDrive:A,bitcrusher:C,bassEq:k,midEq:ne,trebleEq:E,stereoWidth:b,roomDryGain:ue,roomConvolver:Z,roomWetGain:re,wowFlutterDelay:q,wowLfo:Q,wowLfoGain:Ae,flutterLfo:oe,flutterLfoGain:D,noiseSource:ge,noiseFilter:v,noisePanner:H,noiseGain:V,noiseLfo:_,noiseLfoGain:I,crackleSource:ce,crackleFilter:X,vinylDustBedFilter:de,vinylDustBedGain:u,crackleGain:B})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const r=await this.ensureInitialized();if(!r){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:r.state})}async connect(e,r,a){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const p=this.output;if(!p){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(dn(e)){p.connect(e,r);return}p.connect(e,r,a)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function mn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:r=!1,...a}){const p={settings:ro(a),isPlaying:a.isPlaying??!0,isOutputEnabled:a.previewKind===void 0?!0:a.previewKind==="video"||a.previewKind==="audio"||a.previewKind==="capture"};return new hn({context:t,instanceLabel:a.instanceLabel??"tetorica-retro-audio-engine",runtimeState:p,connectOutputToDestination:e,connectOutputToRecordingDestination:r,enableAudioWorklet:a.enableAudioWorklet})}function K(t){return{get current(){return t()}}}function gn({instanceLabel:t,previewKind:e,previewKindRef:r,mediaRef:a,isPlaying:n,isPlayingRef:p}){const[h]=l.useState(()=>new AudioContext),[i]=l.useState(()=>{const g=Nt()?.audio;return{isMuted:g?.isMuted??we.isMuted,volume:g?.volume??we.volume,playbackRate:g?.playbackRate??we.playbackRate,isLooping:g?.isLooping??we.isLooping,isAudioFxEnabled:g?.isAudioFxEnabled??we.isAudioFxEnabled,lofiAmount:g?.lofiAmount??we.lofiAmount,radioToneAmount:g?.radioToneAmount??we.radioToneAmount,bitCrushAmount:g?.bitCrushAmount??we.bitCrushAmount,sampleRateReductionAmount:g?.sampleRateReductionAmount??we.sampleRateReductionAmount,bassAmount:g?.bassAmount??we.bassAmount,midAmount:g?.midAmount??we.midAmount,trebleAmount:g?.trebleAmount??we.trebleAmount,stereoWidthAmount:g?.stereoWidthAmount??we.stereoWidthAmount,smallSpeakerRoomAmount:g?.smallSpeakerRoomAmount??we.smallSpeakerRoomAmount,wowFlutterAmount:g?.wowFlutterAmount??we.wowFlutterAmount,isNoiseEnabled:g?.isNoiseEnabled??we.isNoiseEnabled,noiseLevel:g?.noiseLevel??we.noiseLevel,vinylDustAmount:g?.vinylDustAmount??we.vinylDustAmount}}),m=l.useRef(i.isMuted),T=l.useRef(i.volume),A=l.useRef(i.playbackRate),C=l.useRef(i.isLooping),b=l.useRef(i.isAudioFxEnabled),F=l.useRef(i.lofiAmount),k=l.useRef(i.radioToneAmount),ne=l.useRef(i.bitCrushAmount),E=l.useRef(i.sampleRateReductionAmount),ue=l.useRef(i.bassAmount),Z=l.useRef(i.midAmount),re=l.useRef(i.trebleAmount),q=l.useRef(i.stereoWidthAmount),Q=l.useRef(i.smallSpeakerRoomAmount),Ae=l.useRef(i.wowFlutterAmount),oe=l.useRef(i.isNoiseEnabled),D=l.useRef(i.noiseLevel),ge=l.useRef(i.vinylDustAmount),[U,O]=l.useState(i.isMuted),[v,H]=l.useState(i.playbackRate),[V,_]=l.useState(i.volume),[I,ce]=l.useState(i.isLooping),[X,de]=l.useState(i.isAudioFxEnabled),[u,B]=l.useState(i.lofiAmount),[o,d]=l.useState(i.radioToneAmount),[Se,y]=l.useState(i.bitCrushAmount),[z,G]=l.useState(i.sampleRateReductionAmount),[j,ye]=l.useState(i.bassAmount),[Y,ve]=l.useState(i.midAmount),[Ce,Pe]=l.useState(i.trebleAmount),[pe,ie]=l.useState(i.stereoWidthAmount),[Te,he]=l.useState(i.smallSpeakerRoomAmount),[W,ee]=l.useState(i.wowFlutterAmount),[ae,ke]=l.useState(i.isNoiseEnabled),[be,Be]=l.useState(i.noiseLevel),[fe,Ge]=l.useState(i.vinylDustAmount),Re=l.useRef(null),[c]=l.useState(()=>mn({context:h,instanceLabel:t,params:i,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[R]=l.useState(()=>({audioContextRef:K(()=>c.audioContext),masterGainRef:K(()=>c.masterGain),radioToneHighpassRef:K(()=>c.radioToneHighpass),radioToneLowpassRef:K(()=>c.radioToneLowpass),radioTonePresenceRef:K(()=>c.radioTonePresence),recordingDestinationRef:K(()=>c.recordingDestination),lofiLowpassRef:K(()=>c.lofiLowpass),lofiHighshelfRef:K(()=>c.lofiHighshelf),lofiDriveRef:K(()=>c.lofiDrive),bitcrusherRef:K(()=>c.bitcrusher),bassEqRef:K(()=>c.bassEq),midEqRef:K(()=>c.midEq),trebleEqRef:K(()=>c.trebleEq),stereoWidthRef:K(()=>c.stereoWidth),roomDryGainRef:K(()=>c.roomDryGain),roomConvolverRef:K(()=>c.roomConvolver),roomWetGainRef:K(()=>c.roomWetGain),wowFlutterDelayRef:K(()=>c.wowFlutterDelay),wowLfoRef:K(()=>c.wowLfo),wowLfoGainRef:K(()=>c.wowLfoGain),flutterLfoRef:K(()=>c.flutterLfo),flutterLfoGainRef:K(()=>c.flutterLfoGain),noiseSourceRef:K(()=>c.noiseSource),noiseFilterRef:K(()=>c.noiseFilter),noisePannerRef:K(()=>c.noisePanner),noiseGainRef:K(()=>c.noiseGain),noiseLfoRef:K(()=>c.noiseLfo),noiseLfoGainRef:K(()=>c.noiseLfoGain),crackleSourceRef:K(()=>c.crackleSource),crackleFilterRef:K(()=>c.crackleFilter),vinylDustBedFilterRef:K(()=>c.vinylDustBedFilter),vinylDustBedGainRef:K(()=>c.vinylDustBedGain),crackleGainRef:K(()=>c.crackleGain)})),{audioContextRef:te,masterGainRef:De,radioToneHighpassRef:Le,radioToneLowpassRef:se,radioTonePresenceRef:xe,recordingDestinationRef:Fe,lofiLowpassRef:Ee,lofiHighshelfRef:Oe,lofiDriveRef:Ie,bitcrusherRef:He,bassEqRef:Ve,midEqRef:Ye,trebleEqRef:Ke,stereoWidthRef:Qe,roomDryGainRef:qe,roomConvolverRef:s,roomWetGainRef:S,wowFlutterDelayRef:N,wowLfoRef:le,wowLfoGainRef:L,flutterLfoRef:w,flutterLfoGainRef:Me,noiseSourceRef:J,noiseFilterRef:rt,noisePannerRef:bt,noiseGainRef:it,noiseLfoRef:xt,noiseLfoGainRef:wt,crackleSourceRef:At,crackleFilterRef:at,vinylDustBedFilterRef:Ct,vinylDustBedGainRef:st,crackleGainRef:St}=R,Ze=(g,_e)=>c.debugAudio(g,_e),lt=()=>c.ensureInitialized(),ct=()=>c.ensureInitialized(),Je=()=>c.updateAudioNodes(),ut=g=>c.connectSourceNode(g),yt=()=>c.disposeAudioEngine(),et=(g,_e)=>c.setParams(g,_e),Rt=g=>c.setIsPlaying(g),dt=g=>c.setOutputEnabled(g),Tt=async g=>{const _e=await lt();if(!_e||!c.input){Ze("connectMediaAudio:no-context",{mediaTag:g.tagName});return}Re.current&&(Ze("connectMediaAudio:disconnect-previous",{mediaTag:g.tagName}),Re.current.disconnect(),Re.current=null);try{const ze=_e.createMediaElementSource(g);ze.connect(c.input),Re.current=ze,g.muted=m.current,g.volume=m.current?0:T.current,Ze("connectMediaAudio:connected",{audioContextState:_e.state,mediaTag:g.tagName,previewKind:r.current}),Je()}catch(ze){throw Ze("connectMediaAudio:error",{audioContextState:_e.state,mediaTag:g.tagName,message:ze instanceof Error?ze.message:String(ze),previewKind:r.current}),ze}},Dt=()=>{const g=Re.current;!g||!c.input||(g.disconnect(),g.connect(c.input),Je())},Mt=async()=>{Re.current?.disconnect(),Re.current=null,await yt()},Lt=()=>{const g={...we};m.current=g.isMuted,T.current=g.volume,A.current=g.playbackRate,C.current=g.isLooping,b.current=g.isAudioFxEnabled,F.current=g.lofiAmount,k.current=g.radioToneAmount,ne.current=g.bitCrushAmount,E.current=g.sampleRateReductionAmount,ue.current=g.bassAmount,Z.current=g.midAmount,re.current=g.trebleAmount,q.current=g.stereoWidthAmount,Q.current=g.smallSpeakerRoomAmount,Ae.current=g.wowFlutterAmount,oe.current=g.isNoiseEnabled,D.current=g.noiseLevel,ge.current=g.vinylDustAmount,O(g.isMuted),_(g.volume),H(g.playbackRate),ce(g.isLooping),de(g.isAudioFxEnabled),B(g.lofiAmount),d(g.radioToneAmount),y(g.bitCrushAmount),G(g.sampleRateReductionAmount),ye(g.bassAmount),ve(g.midAmount),Pe(g.trebleAmount),ie(g.stereoWidthAmount),he(g.smallSpeakerRoomAmount),ee(g.wowFlutterAmount),ke(g.isNoiseEnabled),Be(g.noiseLevel),Ge(g.vinylDustAmount),a.current&&(a.current.muted=g.isMuted,a.current.volume=g.volume,a.current.playbackRate=g.playbackRate,a.current.loop=g.isLooping),et(g),window.requestAnimationFrame(Je)};return l.useEffect(()=>{m.current=U,T.current=V,A.current=v,C.current=I,b.current=X,F.current=u,k.current=o,ne.current=Se,E.current=z,ue.current=j,Z.current=Y,re.current=Ce,q.current=pe,Q.current=Te,Ae.current=W,oe.current=ae,D.current=be,ge.current=fe,et({isMuted:U,volume:V,playbackRate:v,isLooping:I,isAudioFxEnabled:X,lofiAmount:u,radioToneAmount:o,bitCrushAmount:Se,sampleRateReductionAmount:z,bassAmount:j,midAmount:Y,trebleAmount:Ce,stereoWidthAmount:pe,smallSpeakerRoomAmount:Te,wowFlutterAmount:W,isNoiseEnabled:ae,noiseLevel:be,vinylDustAmount:fe},!0),Rt(n),dt(e==="video"||e==="audio"||e==="capture"),a.current&&(a.current.muted=U,a.current.volume=U?0:V,a.current.playbackRate=v,a.current.loop=I)},[U,V,X,u,o,Se,z,j,Y,Ce,pe,Te,W,ae,be,fe,n,v,I,e]),l.useEffect(()=>{Qo({isMuted:U,volume:V,playbackRate:v,isLooping:I,isAudioFxEnabled:X,lofiAmount:u,radioToneAmount:o,bitCrushAmount:Se,sampleRateReductionAmount:z,bassAmount:j,midAmount:Y,trebleAmount:Ce,stereoWidthAmount:pe,smallSpeakerRoomAmount:Te,wowFlutterAmount:W,isNoiseEnabled:ae,noiseLevel:be,vinylDustAmount:fe})},[U,V,v,I,X,u,o,Se,z,j,Y,Ce,pe,Te,W,ae,be,fe]),{audioContextRef:te,mediaSourceRef:Re,masterGainRef:De,radioToneHighpassRef:Le,radioToneLowpassRef:se,radioTonePresenceRef:xe,recordingDestinationRef:Fe,lofiLowpassRef:Ee,lofiHighshelfRef:Oe,lofiDriveRef:Ie,bitcrusherRef:He,bassEqRef:Ve,midEqRef:Ye,trebleEqRef:Ke,stereoWidthRef:Qe,roomDryGainRef:qe,roomConvolverRef:s,roomWetGainRef:S,wowFlutterDelayRef:N,wowLfoRef:le,wowLfoGainRef:L,flutterLfoRef:w,flutterLfoGainRef:Me,noiseSourceRef:J,noiseFilterRef:rt,noisePannerRef:bt,noiseGainRef:it,noiseLfoRef:xt,noiseLfoGainRef:wt,crackleSourceRef:At,crackleFilterRef:at,vinylDustBedFilterRef:Ct,vinylDustBedGainRef:st,crackleGainRef:St,isMutedRef:m,volumeRef:T,playbackRateRef:A,isLoopingRef:C,isAudioFxEnabledRef:b,lofiAmountRef:F,radioToneAmountRef:k,bitCrushAmountRef:ne,sampleRateReductionAmountRef:E,bassAmountRef:ue,midAmountRef:Z,trebleAmountRef:re,stereoWidthAmountRef:q,smallSpeakerRoomAmountRef:Q,wowFlutterAmountRef:Ae,isNoiseEnabledRef:oe,noiseLevelRef:D,vinylDustAmountRef:ge,isMuted:U,setIsMuted:O,playbackRate:v,setPlaybackRate:H,volume:V,setVolume:_,isLooping:I,setIsLooping:ce,isAudioFxEnabled:X,setIsAudioFxEnabled:de,lofiAmount:u,setLofiAmount:B,radioToneAmount:o,setRadioToneAmount:d,bitCrushAmount:Se,setBitCrushAmount:y,sampleRateReductionAmount:z,setSampleRateReductionAmount:G,bassAmount:j,setBassAmount:ye,midAmount:Y,setMidAmount:ve,trebleAmount:Ce,setTrebleAmount:Pe,stereoWidthAmount:pe,setStereoWidthAmount:ie,smallSpeakerRoomAmount:Te,setSmallSpeakerRoomAmount:he,wowFlutterAmount:W,setWowFlutterAmount:ee,isNoiseEnabled:ae,setIsNoiseEnabled:ke,noiseLevel:be,setNoiseLevel:Be,vinylDustAmount:fe,setVinylDustAmount:Ge,debugAudio:Ze,ensureAudioContext:ct,ensureInitialized:lt,updateAudioNodes:Je,connectSourceNode:ut,connectMediaAudio:Tt,reconnectCurrentMediaAudio:Dt,resetAudioSettings:Lt,disposeAudioEngine:Mt}}const pn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},fn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,vn=`#version 300 es
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
`,xn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),Xt=640,Pt=()=>typeof performance<"u"?performance.now():Date.now(),Bt=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Yt=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,wn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Kt=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),gt=t=>({width:Bt(t)?t.videoWidth:Yt(t)?t.naturalWidth:t.width,height:Bt(t)?t.videoHeight:Yt(t)?t.naturalHeight:t.height}),An=(t,e,r)=>Bt(t)&&(e>Xt||r>Xt),vt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Cn=t=>vt(t)&&t.phosphorDotInternalScale?2:1,Sn=(t,e,r,a)=>{if(r===void 0||a===void 0||r<=0||a<=0)return{width:t,height:e};const n=r/a;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},yn=(t,e,r,a,n,p)=>{if(!vt(r)||n===void 0||p===void 0||n<=0||p<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+r.bulbRadius*1.15),i=Math.max(1,h/Math.max(a,1)),m=Math.max(1,Math.floor(n/i)),T=Math.max(1,Math.floor(p/i)),A=Math.min(1,m/Math.max(t,1),T/Math.max(e,1));return{width:Math.max(1,Math.round(t*A)),height:Math.max(1,Math.round(e*A))}},It=(t,e,r,a,n)=>{const p=Cn(t),h=Math.max(t.targetWidth,1),i=Math.max(t.targetHeight,1),m=t.matchTargetAspect?Sn(h,i,e,r):{width:h,height:i},T=m.width*p,A=m.height*p,C=yn(T,A,t,p,a,n);return{width:C.width,height:C.height,sampleWidth:Math.max(1,Math.round(T)),sampleHeight:Math.max(1,Math.round(A)),internalScale:p,isPhosphorDotMode:vt(t)}};function qt(t,e,r){const a=t.createShader(e);if(!a)throw new Error("Failed to create shader.");if(t.shaderSource(a,r),t.compileShader(a),!t.getShaderParameter(a,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(a)||"Unknown shader compile error.";throw t.deleteShader(a),new Error(n)}return a}function Jt(t,e,r){const a=qt(t,t.VERTEX_SHADER,e),n=qt(t,t.FRAGMENT_SHADER,r),p=t.createProgram();if(!p)throw t.deleteShader(a),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(p,a),t.attachShader(p,n),t.bindAttribLocation(p,0,"aPosition"),t.linkProgram(p),t.deleteShader(a),t.deleteShader(n),!t.getProgramParameter(p,t.LINK_STATUS)){const h=t.getProgramInfoLog(p)||"Unknown program link error.";throw t.deleteProgram(p),new Error(h)}return p}class Rn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=Pt();constructor(e){this.gl=e,this.filterProgram=Jt(e,Zt,vn),this.passthroughProgram=Jt(e,Zt,bn);const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,xn,e.STATIC_DRAW);const a=e.createVertexArray();e.bindVertexArray(a),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=Pt()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const r=this.currentSource,a=this.currentFilterState;if(!this.outputEnabled||!r||!a)return;const n=this.getUploadSource(r,a);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const p=a.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,p),Kt(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),a.isFilterEnabled){const h=gt(r);this.applyFilterUniforms(a,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,r){if(Kt(e)||!r.isFilterEnabled)return e;const a=gt(e);if(a.width<=0||a.height<=0||An(e,a.width,a.height))return e;const{width:n,height:p,sampleWidth:h,sampleHeight:i,isPhosphorDotMode:m}=It(r,a.width,a.height),T=Math.max(1,Math.round(m?h:n)),A=Math.max(1,Math.round(m?i:p)),C=this.ensureUploadContext();return!C||!this.uploadCanvas?e:(this.uploadCanvas.width!==T&&(this.uploadCanvas.width=T),this.uploadCanvas.height!==A&&(this.uploadCanvas.height=A),C.imageSmoothingEnabled=!0,C.imageSmoothingQuality="high",C.fillStyle="#000",C.fillRect(0,0,T,A),C.drawImage(e,0,0,T,A),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),r=e.getContext("2d",{alpha:!1,desynchronized:!0});return r?(this.uploadCanvas=e,this.uploadContext=r,r):null}applyFilterUniforms(e,r,a){const{gl:n}=this,p=wn(n.canvas)?n.canvas:null,h=Math.max(p?.clientWidth??n.drawingBufferWidth,1),i=Math.max(p?.clientHeight??n.drawingBufferHeight,1),{width:m,height:T,sampleWidth:A,sampleHeight:C,isPhosphorDotMode:b}=It(e,r,a,h,i);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,m,T),n.uniform2f(this.uniformLocations.uSampleTargetSize,A,C),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,fn(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*T/(Math.max(n.drawingBufferHeight,1)*m)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,b?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...pn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(Pt()-this.startedAt)/1e3)}}function Tn({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:a,isPlayingRef:n,previewKindRef:p,debugVideo:h}){const i=l.useRef(null),m=l.useRef(null),T=l.useRef(null),A=l.useRef(null),C=l.useRef(null),b=l.useRef(null),F=l.useRef(null),k=l.useRef(null),ne=l.useRef(()=>{}),E=l.useRef(t),ue=l.useRef(a),Z=l.useRef(!1),re=l.useRef(null),q=l.useRef(null),Q=l.useRef(null),[Ae,oe]=l.useState(!1),[D,ge]=l.useState(null);E.current=t,ue.current=a;const U=l.useCallback(y=>{ge(z=>{const G=typeof y=="function"?y(z):y;return Q.current=G,G})},[]),O=l.useCallback(()=>{const y=m.current,z=C.current;y&&(y.pipeline.setOutputEnabled(ue.current),y.pipeline.setSource(z),y.pipeline.setFilterState(E.current),y.pipeline.render())},[]);l.useLayoutEffect(()=>{ne.current=O},[O]);const v=l.useCallback(()=>{Z.current=!1,k.current!==null&&(window.cancelAnimationFrame(k.current),k.current=null)},[]),H=l.useCallback(()=>{if(Z.current)return;Z.current=!0;const y=()=>{if(!Z.current)return;if(ne.current(),!(p.current==="video"||p.current==="capture"||p.current==="image"||n.current)){k.current=null,Z.current=!1;return}k.current=window.requestAnimationFrame(y)};k.current=window.requestAnimationFrame(y)},[n,p]),V=l.useCallback(()=>{O()},[O]),_=l.useCallback(()=>{O()},[O]),I=l.useCallback(()=>{O()},[O]),ce=l.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),b.current={},O(),b.current),[O]),X=l.useCallback((y,z,G)=>{if(!y)return;const{width:j,height:ye}=gt(G);if(j<=0||ye<=0)return;const Y=i.current,ve=Y?.clientWidth??y.canvas.width,Ce=Y?.clientHeight??y.canvas.height,pe=e==="width"?ve/j:Math.min(ve/j,Ce/ye),ie=j*pe,Te=ye*pe,he=(ve-ie)/2,W=(Ce-Te)/2,ee={width:ie,height:Te,x:he,y:W},ae=Q.current;return ae&&ae.width===ee.width&&ae.height===ee.height&&ae.x===ee.x&&ae.y===ee.y?ae:(Q.current=ee,U(ee),ee)},[e,U]),de=l.useCallback(()=>{C.current&&X(m.current,null,C.current)},[X]),u=l.useCallback(()=>{O()},[O]),B=l.useCallback(()=>{const y=m.current,z=i.current;if(!y||!z)return;de();const G=Q.current??{x:0,y:0,width:z.clientWidth,height:z.clientHeight},j=Math.max(1,Math.round(G.width)),ye=Math.max(1,Math.round(G.height)),Y=E.current,ve=C.current?gt(C.current):null,{width:Ce,height:Pe}=It(Y,ve?.width,ve?.height,j,ye),pe=Math.max(1,Math.round(j*Math.max(1,r))),ie=Math.max(1,Math.round(ye*Math.max(1,r))),Te=Math.max(1,Math.round(Math.max(1,Ce)*Math.max(1,r))),he=Math.max(1,Math.round(Math.max(1,Pe)*Math.max(1,r))),W=vt(Y),ee=Y.isFilterEnabled&&W?Math.max(pe,Te):pe,ae=Y.isFilterEnabled&&W?Math.max(ie,he):ie;y.canvas.width!==ee&&(y.canvas.width=ee),y.canvas.height!==ae&&(y.canvas.height=ae),y.canvas.style.position="absolute",y.canvas.style.left=`${Math.round(G.x)}px`,y.canvas.style.top=`${Math.round(G.y)}px`,y.canvas.style.width=`${j}px`,y.canvas.style.height=`${ye}px`,y.canvas.style.imageRendering="pixelated",O()},[de,O,r]),o=l.useCallback(()=>{re.current!==null&&(window.cancelAnimationFrame(re.current),re.current=null),q.current!==null&&(window.clearTimeout(q.current),q.current=null),re.current=window.requestAnimationFrame(()=>{re.current=null,B()}),q.current=window.setTimeout(()=>{q.current=null,B()},120)},[B]),d=l.useCallback(async()=>{if(!m.current){if(F.current){await F.current;return}F.current=(async()=>{const y=i.current;if(!y||m.current)return;const z=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:y.isConnected,hostWidth:y.clientWidth??null,hostHeight:y.clientHeight??null,resolution:r});const G=document.createElement("canvas");G.style.display="block",G.style.width="100%",G.style.height="100%",G.style.imageRendering="pixelated",G.style.background="#020617";const j=G.getContext("webgl2");if(!j)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-z)*10)/10});const ye={canvas:G,pipeline:new Rn(j),ticker:{start:H,stop:v}},Y=i.current;if(!Y||Y!==y||!Y.isConnected)return;Y.style.position="relative",Y.appendChild(G),m.current=ye,b.current={},oe(!0),h("initWebGL:ready",{hostWidth:Y.clientWidth??null,hostHeight:Y.clientHeight??null,resolution:r}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-z)*10)/10}),B();const ve=p.current==="video"||p.current==="capture"||p.current==="image"||n.current;a&&ve&&H(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-z)*10)/10,shouldAnimateOnInit:ve})})();try{await F.current}finally{F.current=null}}},[h,a,B,r,H,v]),Se=l.useCallback(()=>{F.current=null,v(),re.current!==null&&(window.cancelAnimationFrame(re.current),re.current=null),q.current!==null&&(window.clearTimeout(q.current),q.current=null);const y=m.current;y&&(y.pipeline.dispose(),y.canvas.remove()),m.current=null,b.current=null,U(null),oe(!1)},[v,U]);return l.useEffect(()=>{const y=i.current;if(!y)return;if(typeof ResizeObserver<"u"){const G=new ResizeObserver(()=>{o()});return G.observe(y),()=>{G.disconnect()}}const z=()=>{o()};return window.addEventListener("resize",z),()=>{window.removeEventListener("resize",z)}},[o]),{canvasHostRef:i,appRef:m,spriteRef:T,textureRef:A,previewElementRef:C,filterRef:b,isRendererReady:Ae,viewportRect:D,setViewportRect:U,applyFilterState:V,createVideoTexture:y=>null,destroyPixi:Se,fitCurrentSprite:de,fitSprite:X,initPixi:d,refreshLayout:B,resetFilterInstance:ce,safeRender:u,scheduleRefreshLayout:o,syncSpriteFilter:_,syncTexturePresentation:I}}const Dn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function Mn({appRef:t,spriteRef:e,textureRef:r,previewElementRef:a,mediaRef:n,objectUrlRef:p,streamRef:h,streamOwnedRef:i,previewRequestIdRef:m,isPlayingRef:T,previewKindRef:A,audioContextRef:C,mediaSourceRef:b,masterGainRef:F,noiseGainRef:k,isMutedRef:ne,volumeRef:E,playbackRateRef:ue,isLoopingRef:Z,isAudioFxEnabled:re,lofiAmount:q,bitCrushAmount:Q,sampleRateReductionAmount:Ae,bassAmount:oe,midAmount:D,trebleAmount:ge,stereoWidthAmount:U,smallSpeakerRoomAmount:O,isMuted:v,volume:H,previewKind:V,setPreviewName:_,setPreviewError:I,setNeedsUserPlay:ce,setIsPlaying:X,setCurrentTime:de,setDuration:u,setPlaybackRate:B,setIsLooping:o,setSourceDimensions:d,setViewportRect:Se,setPreviewKindState:y,setIsPoweredOn:z,beginLoading:G,finishLoading:j,ensureAudioContext:ye,updateAudioNodes:Y,connectMediaAudio:ve,fitSprite:Ce,refreshLayout:Pe,scheduleRefreshLayout:pe,safeRender:ie,resetFilterInstance:Te,initPixi:he,resetPerfAccumulators:W,debugVideo:ee,debugAudio:ae}){const ke=async()=>{Dn()&&await new Promise(s=>{window.setTimeout(s,220)})},be=()=>{const s=C.current?.currentTime;if(k.current)if(typeof s=="number"){const S=k.current.gain;S.cancelScheduledValues(s),S.setValueAtTime(S.value,s),S.linearRampToValueAtTime(0,s+.03)}else k.current.gain.value=0;if(F.current)if(typeof s=="number"){const S=F.current.gain;S.cancelScheduledValues(s),S.setValueAtTime(S.value,s),S.linearRampToValueAtTime(0,s+.03)}else F.current.gain.value=0},Be=()=>{k.current&&(k.current.gain.value=0)},fe=s=>s instanceof DOMException&&(s.name==="NotAllowedError"||s.name==="AbortError")?!0:s instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(s.message):!1,Ge=s=>fe(s)?(j(),I(""),ce(!0),se(),ie(),!0):!1,Re=(s,S,N=!0)=>{be(),s.muted=!0,s.volume=0,s.pause(),s.srcObject instanceof MediaStream&&(N&&s.srcObject.getTracks().forEach(le=>le.stop()),s.srcObject=null),s.src="",s.load(),S?.startsWith("blob:")&&URL.revokeObjectURL(S)},c=s=>new Promise((S,N)=>{const le=J=>J?J.code===MediaError.MEDIA_ERR_ABORTED?"aborted":J.code===MediaError.MEDIA_ERR_NETWORK?"network":J.code===MediaError.MEDIA_ERR_DECODE?"decode":J.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${J.code}`:"unknown",L=()=>{s.removeEventListener("loadeddata",w),s.removeEventListener("canplay",w),s.removeEventListener("error",Me)},w=()=>{L(),S()},Me=()=>{L(),N(new Error(`動画の読み込みに失敗しました。 src=${s.currentSrc||s.src||"(empty)"} reason=${le(s.error)}`))};if(s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){S();return}s.addEventListener("loadeddata",w,{once:!0}),s.addEventListener("canplay",w,{once:!0}),s.addEventListener("error",Me,{once:!0}),s.load()}),R=s=>new Promise((S,N)=>{const le=J=>J?J.code===MediaError.MEDIA_ERR_ABORTED?"aborted":J.code===MediaError.MEDIA_ERR_NETWORK?"network":J.code===MediaError.MEDIA_ERR_DECODE?"decode":J.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${J.code}`:"unknown",L=()=>{s.removeEventListener("loadedmetadata",w),s.removeEventListener("canplay",w),s.removeEventListener("error",Me)},w=()=>{L(),S()},Me=()=>{L(),N(new Error(`音声の読み込みに失敗しました。 src=${s.currentSrc||s.src||"(empty)"} reason=${le(s.error)}`))};if(s.readyState>=HTMLMediaElement.HAVE_METADATA){S();return}s.addEventListener("loadedmetadata",w,{once:!0}),s.addEventListener("canplay",w,{once:!0}),s.addEventListener("error",Me,{once:!0}),s.load()}),te=s=>new Promise((S,N)=>{const le=()=>{s.removeEventListener("load",L),s.removeEventListener("error",w)},L=()=>{le(),S()},w=()=>{le(),N(new Error("画像の読み込みに失敗しました。"))};if(s.complete&&s.naturalWidth>0&&s.naturalHeight>0){S();return}s.addEventListener("load",L,{once:!0}),s.addEventListener("error",w,{once:!0})}),De=s=>{s.addEventListener("play",se),s.addEventListener("pause",se),s.addEventListener("pause",be),s.addEventListener("abort",be),s.addEventListener("emptied",be),s.addEventListener("loadstart",be),s.addEventListener("seeking",be),s.addEventListener("stalled",be),s.addEventListener("suspend",be),s.addEventListener("waiting",be),s.addEventListener("volumechange",se),s.addEventListener("timeupdate",se),s.addEventListener("durationchange",se),s.addEventListener("seeked",se),s.addEventListener("ended",se),s.addEventListener("ratechange",se)},Le=s=>{s.loop=Z.current,s.muted=ne.current,s.volume=ne.current?0:E.current,s.playbackRate=ue.current,s.autoplay=!1,s.preload="auto",s.crossOrigin="anonymous",s instanceof HTMLVideoElement&&(s.playsInline=!0)},se=()=>{if(!n.current){ee("syncVideoState:no-media",{previewKind:A.current,hasPreviewElement:!!a.current}),T.current=!1,X(!1),de(0),u(0),Y(),ie();return}T.current=!n.current.paused,X(!n.current.paused),n.current.paused||j(),de(n.current.currentTime),u(n.current.duration||0),B(n.current.playbackRate||1),o(n.current.loop),Y(),ie()},xe=()=>{ee("cleanupPreview:start",{previewKind:A.current,hasMedia:!!n.current,hasPreviewElement:!!a.current}),be(),m.current+=1,j();const s=n.current,S=h.current,N=i.current;e.current=null,r.current=null,n.current=null,a.current=null,h.current=null,i.current=!1,b.current?.disconnect(),b.current=null,ce(!1),T.current=!1,X(!1),de(0),u(0),y(null),d(null),Se(null),p.current?.startsWith("blob:")&&URL.revokeObjectURL(p.current),p.current=null,s?Re(s,void 0,N):N&&S?.getTracks().forEach(le=>le.stop()),ie()},Fe=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),be(),xe(),C.current?.state==="running"&&C.current.suspend()},Ee=()=>{z(!0),t.current?.ticker.start();try{W?.()}catch{}},Oe=async()=>{if(n.current)try{await ye(),n.current.muted=ne.current,n.current.volume=ne.current?0:E.current,await n.current.play(),T.current=!0,X(!0),I(""),ce(!1),ae("playVideoWithAudio",{audioContextState:C.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:re,lofiAmount:q,bitCrushAmount:Q,sampleRateReductionAmount:Ae,bassAmount:oe,midAmount:D,trebleAmount:ge,stereoWidthAmount:U,smallSpeakerRoomAmount:O,isMuted:v,volume:H}),Y(),se(),ie(),pe(),window.requestAnimationFrame(Y)}catch(s){if(j(),fe(s)){ce(!0),I("");return}ce(!1),I(s instanceof Error?s.message:"音声付き再生を開始できませんでした。")}},Ie=async()=>{if(await he(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},He=async(s,S)=>{const N=await Ie();a.current=s,Ce(N,null,s),y(S),d(s instanceof HTMLVideoElement?{width:s.videoWidth,height:s.videoHeight}:{width:s.naturalWidth,height:s.naturalHeight}),ie(),Pe(),pe(),t.current?.ticker.start()},Ve=async s=>{const S=s.type.startsWith("video/"),N=s.type.startsWith("audio/"),le=s.type.startsWith("image/");if(!S&&!N&&!le){I("動画、音声、または画像ファイルを選んでください。");return}Ee(),xe(),Te();const L=m.current;I(""),_(s.name),G(S?"Loading video preview...":N?"Loading audio preview...":"Loading image preview...");let w=null;try{if(await Ie(),w=URL.createObjectURL(s),p.current=w,S||N){const J=S?document.createElement("video"):document.createElement("audio");if(J.src=w,Le(J),De(J),J instanceof HTMLVideoElement?await c(J):await R(J),L!==m.current){Re(J,w);return}n.current=J,J instanceof HTMLVideoElement?await He(J,"video"):(a.current=null,y("audio"),d(null),Se(null),ie()),await ve(J),se(),await ke(),await Oe(),L===m.current&&j();return}const Me=new Image;if(Me.src=w,Me.crossOrigin="anonymous",await te(Me),L!==m.current){w.startsWith("blob:")&&URL.revokeObjectURL(w);return}n.current=null,Be(),Y(),await He(Me,"image"),se(),L===m.current&&j()}catch(Me){if(L!==m.current){w?.startsWith("blob:")&&URL.revokeObjectURL(w);return}if(fe(Me)){Ge(Me);return}xe(),I(Me instanceof Error?Me.message:"動画プレビューに失敗しました。"),ce(!1)}},Ye=async()=>{if(Ee(),!navigator.mediaDevices?.getDisplayMedia){I("このブラウザでは画面キャプチャーに対応していません。");return}xe();const s=m.current;I(""),_("Display Capture"),G("Preparing display capture...");try{await Ie();const S=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(s!==m.current){S.getTracks().forEach(le=>le.stop());return}const N=document.createElement("video");N.srcObject=S,Le(N),De(N),S.getVideoTracks()[0]?.addEventListener("ended",()=>{Ke()}),await c(N),h.current=S,i.current=!0,n.current=N,await He(N,"capture"),await ve(N),ce(!1),await ke(),await Oe(),s===m.current&&j()}catch(S){if(s!==m.current||Ge(S))return;xe(),I(S instanceof Error?S.message:"画面キャプチャーを開始できませんでした。")}},Ke=()=>{V==="capture"&&(xe(),_(""),I(""))};return{cleanupPreview:xe,cleanupForPageLeave:Fe,playVideoWithAudio:Oe,previewFile:Ve,previewStream:async(s,S="video",N="Media Stream")=>{let le=0;try{if(Ee(),xe(),Te(),le=m.current,I(""),_(N),G(S==="video"?"Loading stream preview...":"Loading stream audio..."),await Ie(),S==="video"){const L=document.createElement("video");if(L.srcObject=s,Le(L),De(L),await c(L),le!==m.current){Re(L,void 0,!1);return}h.current=s,i.current=!1,n.current=L,await He(L,"capture"),await ve(L)}else{const L=document.createElement("audio");if(L.srcObject=s,Le(L),De(L),await R(L),le!==m.current){Re(L,void 0,!1);return}h.current=s,i.current=!1,n.current=L,a.current=null,y("audio"),d(null),Se(null),ie(),await ve(L),se()}if(le!==m.current)return;await ke(),await Oe(),le===m.current&&j()}catch(L){if(le!==m.current||Ge(L))return;xe(),I(L instanceof Error?L.message:String(L))}},previewUrl:async(s,S="video")=>{let N=0;const le=typeof performance<"u"?performance.now():Date.now(),L=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-le)*10)/10;try{if(ee("startup:previewUrl:start",{url:s,kind:S}),Ee(),xe(),Te(),N=m.current,I(""),_(s),G(S==="video"?"Loading video preview...":S==="image"?"Loading image preview...":"Loading audio preview..."),await Ie(),ee("startup:previewUrl:renderer-ready",{kind:S,elapsedMs:L()}),S==="video"){const w=document.createElement("video");if(w.src=s,Le(w),De(w),await c(w),ee("startup:previewUrl:video-ready",{elapsedMs:L(),readyState:w.readyState,videoWidth:w.videoWidth,videoHeight:w.videoHeight}),N!==m.current){Re(w,s);return}n.current=w,await He(w,"video"),await ve(w),se()}else if(S==="image"){const w=new Image;if(w.src=s,w.crossOrigin="anonymous",await te(w),ee("startup:previewUrl:image-ready",{elapsedMs:L(),naturalWidth:w.naturalWidth,naturalHeight:w.naturalHeight}),N!==m.current)return;n.current=null,Be(),Y(),await He(w,"image"),se()}else{const w=document.createElement("audio");if(w.src=s,Le(w),De(w),await R(w),ee("startup:previewUrl:audio-ready",{elapsedMs:L(),readyState:w.readyState,duration:w.duration}),N!==m.current){Re(w,s);return}a.current=null,y("audio"),d(null),Se(null),n.current=w,ie(),await ve(w),se()}if(N!==m.current)return;(S==="video"||S==="audio")&&(await ke(),await Oe()),N===m.current&&(j(),ee("startup:previewUrl:done",{kind:S,elapsedMs:L()}))}catch(w){if(ee("startup:previewUrl:error",{kind:S,elapsedMs:L(),error:w instanceof Error?w.message:String(w)}),N!==m.current||Ge(w))return;xe(),I(w instanceof Error?w.message:String(w))}},startDisplayCapture:Ye,stopDisplayCapture:Ke,syncVideoState:se,releaseDetachedMedia:Re,ensurePixiReady:Ie}}let Ln=0;const $t=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),Qt=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Pn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function En(t,e,r=1){const a=l.useRef(`player-${Ln+=1}`),n=l.useRef(null),p=l.useRef(null),h=l.useRef(!1),i=l.useRef(null),m=l.useRef(null),T=l.useRef([]),A=l.useRef(null),C=l.useRef(null),b=l.useRef(null),F=l.useRef(null),k=l.useRef(null),ne=l.useRef(0),E=l.useRef(!1),ue=l.useRef(null),Z=l.useRef(!1),[re,q]=l.useState(""),[Q,Ae]=l.useState(""),[oe,D]=l.useState(!0),[ge,U]=l.useState(""),[O,v]=l.useState(!1),[H,V]=l.useState(!1),[_,I]=l.useState(!1),[ce,X]=l.useState(0),[de,u]=l.useState(0),[B,o]=l.useState(null),[d,Se]=l.useState(null),[y,z]=l.useState(!1),[G,j]=l.useState(null),ye=(f,M)=>{if(!Pn())return;const $=M?` ${JSON.stringify(M)}`:"";console.log(`[retro-player video][${a.current}] ${f}${$}`)},Y=Tn({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:oe,isPlayingRef:E,previewKindRef:ue,debugVideo:ye}),{canvasHostRef:ve,appRef:Ce,spriteRef:Pe,textureRef:pe,previewElementRef:ie,filterRef:Te,isRendererReady:he,viewportRect:W,setViewportRect:ee,applyFilterState:ae,destroyPixi:ke,fitSprite:be,initPixi:Be,refreshLayout:fe,resetFilterInstance:Ge,safeRender:Re,scheduleRefreshLayout:c,syncSpriteFilter:R,syncTexturePresentation:te}=Y,De=l.useRef(Be),Le=l.useRef(ke),se=l.useRef(()=>{}),xe=l.useRef(()=>{}),Fe=gn({instanceLabel:a.current,previewKind:B,previewKindRef:ue,mediaRef:i,isPlaying:_,isPlayingRef:E}),{audioContextRef:Ee,mediaSourceRef:Oe,masterGainRef:Ie,recordingDestinationRef:He,noiseGainRef:Ve,isMutedRef:Ye,volumeRef:Ke,playbackRateRef:Qe,isLoopingRef:qe,isMuted:s,setIsMuted:S,playbackRate:N,setPlaybackRate:le,volume:L,setVolume:w,isLooping:Me,setIsLooping:J,isAudioFxEnabled:rt,setIsAudioFxEnabled:bt,lofiAmount:it,setLofiAmount:xt,radioToneAmount:wt,setRadioToneAmount:At,bitCrushAmount:at,setBitCrushAmount:Ct,sampleRateReductionAmount:st,setSampleRateReductionAmount:St,bassAmount:Ze,setBassAmount:lt,midAmount:ct,setMidAmount:Je,trebleAmount:ut,setTrebleAmount:yt,stereoWidthAmount:et,setStereoWidthAmount:Rt,smallSpeakerRoomAmount:dt,setSmallSpeakerRoomAmount:Tt,wowFlutterAmount:Dt,setWowFlutterAmount:Mt,isNoiseEnabled:Lt,setIsNoiseEnabled:g,noiseLevel:_e,setNoiseLevel:ze,vinylDustAmount:io,setVinylDustAmount:ao,debugAudio:so,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:lo,reconnectCurrentMediaAudio:Wt,resetAudioSettings:co,disposeAudioEngine:Gt}=Fe;l.useEffect(()=>{De.current=Be,Le.current=ke},[Be,ke]);const uo=f=>{ue.current=f,o(f)},ho=f=>{U(f),v(!0)},$e=()=>{v(!1),U("")},Ut=()=>{D(!0),Ce.current?.ticker.start()},mo=()=>{i.current&&i.current.pause(),Ve.current&&(Ve.current.gain.value=0),Ie.current&&(Ie.current.gain.value=0),$e(),V(!1),D(!1),Ce.current?.ticker.stop(),Xe()},go=Mn({filterState:t,appRef:Ce,spriteRef:Pe,textureRef:pe,previewElementRef:ie,filterRef:Te,mediaRef:i,objectUrlRef:n,streamRef:p,streamOwnedRef:h,previewRequestIdRef:ne,isPlayingRef:E,previewKindRef:ue,audioContextRef:Ee,mediaSourceRef:Oe,masterGainRef:Ie,noiseGainRef:Ve,isMutedRef:Ye,volumeRef:Ke,playbackRateRef:Qe,isLoopingRef:qe,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:Ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,isMuted:s,volume:L,previewKind:B,setPreviewName:q,setPreviewError:Ae,setNeedsUserPlay:V,setIsPlaying:I,setCurrentTime:X,setDuration:u,setPlaybackRate:le,setIsLooping:J,setSourceDimensions:Se,setViewportRect:ee,setPreviewKindState:uo,setIsPoweredOn:D,beginLoading:ho,finishLoading:$e,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:lo,fitSprite:be,refreshLayout:fe,scheduleRefreshLayout:c,safeRender:Re,resetFilterInstance:Ge,initPixi:Be,debugVideo:ye,debugAudio:so}),{cleanupPreview:Ht,cleanupForPageLeave:po,playVideoWithAudio:Vt,previewFile:fo,previewStream:vo,previewUrl:bo,startDisplayCapture:xo,stopDisplayCapture:wo,syncVideoState:Xe}=go;l.useEffect(()=>{se.current=Ht},[Ht]),l.useEffect(()=>{xe.current=Gt},[Gt]);const _t=async()=>{if(i.current){if(i.current.paused){oe||Ut(),await Vt(),Xe();return}i.current.pause(),Xe()}},Ao=()=>{i.current&&S(f=>{const M=!f;return Ye.current=M,window.requestAnimationFrame(tt),M})},ot=f=>{i.current&&(i.current.currentTime=f,X(f))},Co=f=>{if(!i.current)return;const M=1/30,$=Math.max(0,Math.min(i.current.currentTime+M*f,i.current.duration||i.current.currentTime+M));i.current.pause(),i.current.currentTime=$,Xe()},So=f=>{i.current&&(i.current.playbackRate=f,Qe.current=f,le(f))},yo=f=>{i.current&&(Ke.current=f,Ye.current=f===0,w(f),S(f===0),window.requestAnimationFrame(tt))},Ro=()=>{i.current&&(i.current.loop=!i.current.loop,qe.current=i.current.loop,J(i.current.loop))},To=f=>{qe.current=f,J(f),i.current&&(i.current.loop=f)},mt=()=>{if(!C.current||typeof window>"u"){b.current=null,F.current=null;return}window.URL.revokeObjectURL(C.current),C.current=null,b.current=null,F.current=null},Do=(f,M)=>{if(typeof document>"u")return;const $=document.createElement("a");$.href=f,$.download=M,$.rel="noopener",$.style.display="none",document.body.appendChild($),$.click(),window.setTimeout(()=>{$.remove()},0)},Mo=(f,M)=>{if(typeof window>"u"||f.length===0)return null;mt();const $=new Blob(f,{type:M||"video/webm"}),Ue=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,We=window.URL.createObjectURL($);return C.current=We,b.current=$,F.current=Ue,j(Ue),Ue},Lo=()=>{const f=C.current,M=F.current;!f||!M||typeof window>"u"||(Do(f,M),window.setTimeout(()=>{mt()},1e3),j(null))},Po=async()=>{const f=b.current,M=F.current;if(!f||!M||typeof window>"u")return!1;if($t()){const Ue=new Uint8Array(await f.arrayBuffer()),We=await no("persist_recording_for_share",{data:Array.from(Ue),filename:M});return await Jo(We,{mimeType:f.type||"video/webm",title:M}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Ne={files:[new File([f],M,{type:f.type||"video/webm"})],title:M};return typeof navigator.canShare=="function"&&!navigator.canShare(Ne)?!1:(await navigator.share(Ne),!0)},Eo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(M=>MediaRecorder.isTypeSupported(M))??"",Bo=async()=>{const f=Ce.current?.canvas;if(!(f instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await ht();const M=new MediaStream;f.captureStream(30).getVideoTracks().forEach(We=>M.addTrack(We)),He.current?.stream.getAudioTracks().forEach(We=>M.addTrack(We.clone()));const Ne=Eo(),Ue=Ne?new MediaRecorder(M,{mimeType:Ne}):new MediaRecorder(M);T.current=[],mt(),j(null),A.current=M,m.current=Ue,Ue.addEventListener("dataavailable",We=>{We.data.size>0&&T.current.push(We.data)}),Ue.addEventListener("stop",()=>{const We=Mo(T.current,Ue.mimeType);T.current=[],A.current?.getTracks().forEach(Io=>Io.stop()),A.current=null,m.current=null,z(!1),k.current?.(We),k.current=null},{once:!0}),Ue.start(),z(!0)},Ot=(f=!0)=>{const M=m.current;return M?new Promise($=>{if(k.current=$,f||(T.current=[]),M.state!=="inactive"){M.stop();return}A.current?.getTracks().forEach(Ne=>Ne.stop()),A.current=null,m.current=null,z(!1),k.current?.(F.current),k.current=null}):Promise.resolve(F.current)};return l.useEffect(()=>{let f=!1;return(async()=>(ye("startup:setupPixi-effect:start",{renderResolutionScale:r}),await De.current(),f&&Le.current()))(),()=>{mt(),Ot(!1),f=!0,Le.current()}},[r]),l.useEffect(()=>()=>{se.current(),xe.current()},[]),l.useEffect(()=>{const f=()=>{po()};return window.addEventListener("beforeunload",f),()=>{window.removeEventListener("beforeunload",f)}},[]),l.useEffect(()=>{const f=()=>{i.current&&(i.current.muted=!0,i.current.volume=0,i.current.pause(),Xe())};return window.addEventListener(zt,f),()=>{window.removeEventListener(zt,f)}},[Xe]),l.useEffect(()=>{if(!Qt())return;const f=$=>$==="video"||$==="audio"||$==="capture",M=()=>{const $=i.current;if(!(!$||!f(ue.current))){if(document.visibilityState==="hidden"){Z.current=!$.paused,$.pause(),E.current=!1,I(!1),Ve.current&&(Ve.current.gain.value=0),Ie.current&&(Ie.current.gain.value=0),Ee.current?.state==="running"&&Ee.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await ht(),Wt(),tt(),Z.current&&i.current)try{await i.current.play(),V(!1)}catch(Ne){Ne instanceof DOMException&&Ne.name==="NotAllowedError"&&V(!0)}}finally{Xe(),Z.current=!1}})()},80)}};return document.addEventListener("visibilitychange",M),()=>{document.removeEventListener("visibilitychange",M)}},[Ee,ht,Ie,Ve,Wt,Xe,tt]),l.useLayoutEffect(()=>{ae(),R(),te(),fe()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,fe]),l.useEffect(()=>{if(Q||H){$e();return}if(B==="image"||B==="audio"){$e();return}_&&$e()},[Q,H,B,_]),l.useEffect(()=>{E.current=_;const f=(B==="video"||B==="capture")&&i.current?.tagName==="VIDEO",M=!i.current||Math.abs(i.current.currentTime)<.05,$=i.current?.ended??!1;f&&$e(),f&&!_&&!Q&&!$&&(Ee.current?.state==="suspended"||M)&&V(!0)},[Ee,_,Q,B]),l.useEffect(()=>{const f=M=>{if(!i.current)return;const $=M.target;if(!($ instanceof HTMLInputElement||$ instanceof HTMLTextAreaElement||$?.isContentEditable)){if(M.code==="Space"||M.code==="KeyK"){M.preventDefault(),_t();return}if(M.code==="KeyJ"){M.preventDefault(),ot(Math.max(i.current.currentTime-10,0));return}if(M.code==="KeyL"){M.preventDefault(),ot(Math.min(i.current.currentTime+10,i.current.duration||i.current.currentTime+10));return}if(M.code==="ArrowLeft"){M.preventDefault(),ot(Math.max(i.current.currentTime-5,0));return}M.code==="ArrowRight"&&(M.preventDefault(),ot(Math.min(i.current.currentTime+5,i.current.duration||i.current.currentTime+5)))}};return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[]),{canvasHostRef:ve,previewName:re,previewError:Q,isRendererReady:he,loadingLabel:ge,isLoading:O,needsUserPlay:H,isPlaying:_,isMuted:s,currentTime:ce,duration:de,playbackRate:N,volume:L,isLooping:Me,sourceDimensions:d,viewportRect:W,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:wt,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:Ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,wowFlutterAmount:Dt,isNoiseEnabled:Lt,noiseLevel:_e,vinylDustAmount:io,hasPlayableMedia:B==="video"||B==="audio"||B==="capture",hasVideo:B==="video"||B==="capture",hasAudioOnly:B==="audio",hasImage:B==="image",isRecording:y,pendingRecordingFilename:G,prefersShareExport:$t()&&Qt(),isCaptureActive:B==="capture",canRecord:B==="video"||B==="capture"||B==="image"||B==="audio",previewFile:fo,previewStream:vo,previewUrl:bo,startDisplayCapture:xo,stopDisplayCapture:wo,togglePlayback:_t,toggleMute:Ao,seekTo:ot,stepFrame:Co,changePlaybackRate:So,changeVolume:yo,toggleLoop:Ro,setLoopingEnabled:To,resetAudioSettings:co,playVideoWithAudio:Vt,isPoweredOn:oe,powerOn:Ut,powerOff:mo,downloadPendingRecording:Lo,sharePendingRecording:Po,startRecording:Bo,stopRecording:Ot,refreshLayout:fe,toggleAudioFx:()=>{bt(f=>!f)},setLofiAmount:xt,setRadioToneAmount:At,setBitCrushAmount:Ct,setSampleRateReductionAmount:St,setBassAmount:lt,setMidAmount:Je,setTrebleAmount:yt,setStereoWidthAmount:Rt,setSmallSpeakerRoomAmount:Tt,setWowFlutterAmount:Mt,toggleNoise:()=>{g(f=>!f)},setNoiseLevel:ze,setVinylDustAmount:ao}}const me=nt.pc98_512,eo=(t,e,r)=>((r?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,Et=t=>{for(const[e,r]of Object.entries(nt))if(eo(t,r))return e;if(!t.matchTargetAspect)return null;for(const[e,r]of Object.entries(nt))if(eo(t,r,{ignoreDimensions:!0}))return e;return null},Bn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function In(t={}){const[e]=l.useState(()=>({targetWidth:t.targetWidth??me.width,targetHeight:t.targetHeight??me.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??me.colors,ditherStrength:t.ditherStrength??me.dither,paletteMode:t.paletteMode??me.palette,curvature:t.curvature??me.curvature,scanlineStrength:t.scanlineStrength??me.scanline,scanline2Strength:t.scanline2Strength??me.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??me.vignette,glowStrength:t.glowStrength??me.glow,edgeBoost:t.edgeBoost??me.edgeBoost??0,phosphorStrength:t.phosphorStrength??me.phosphor,spotMaskStrength:t.spotMaskStrength??me.spotMask,bulbRadius:t.bulbRadius??me.bulbRadius,blackFloor:t.blackFloor??me.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??me.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??me.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??me.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??me.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??me.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??me.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??me.monoTint,neonBoost:t.neonBoost??me.neonBoost,neonSaturation:t.neonSaturation??me.neonSaturation,neonDetail:t.neonDetail??me.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[r]=l.useState(()=>({...e,...Nt()?.filter,...t})),[a,n]=l.useState(r),[p,h]=l.useState(Et(r)),i=o=>{h(null),n(d=>d.targetWidth===o?d:{...d,targetWidth:o})},m=o=>{h(null),n(d=>d.targetHeight===o?d:{...d,targetHeight:o})},T=o=>{h(null),n(d=>d.matchTargetAspect===o?d:{...d,matchTargetAspect:o})},A=o=>{h(null),n(d=>({...d,colorLevels:o}))},C=o=>{h(null),n(d=>({...d,ditherStrength:o}))},b=o=>{h(null),n(d=>({...d,paletteMode:o,colorLevels:Bn(o,d.colorLevels)}))},F=o=>{h(null),n(d=>({...d,curvature:o}))},k=o=>{h(null),n(d=>({...d,scanlineStrength:o}))},ne=o=>{h(null),n(d=>({...d,scanline2Strength:o}))},E=o=>{h(null),n(d=>({...d,scanlineBrightnessFade:o}))},ue=o=>{h(null),n(d=>({...d,vignetteStrength:o}))},Z=o=>{h(null),n(d=>({...d,glowStrength:o}))},re=o=>{h(null),n(d=>({...d,edgeBoost:o}))},q=o=>{h(null),n(d=>({...d,phosphorStrength:o}))},Q=o=>{h(null),n(d=>({...d,spotMaskStrength:o}))},Ae=o=>{h(null),n(d=>({...d,bulbRadius:o}))},oe=o=>{h(null),n(d=>({...d,blackFloor:o}))},D=o=>{h(null),n(d=>({...d,phosphorDotLightBalance:o}))},ge=o=>{h(null),n(d=>({...d,phosphorDotInternalScale:o}))},U=o=>{h(null),n(d=>({...d,phosphorDotBrightCore:o}))},O=o=>{h(null),n(d=>({...d,phosphorDotCellFill:o}))},v=o=>{h(null),n(d=>({...d,phosphorDotFlatDisc:o}))},H=o=>{h(null),n(d=>({...d,phosphorDotNeighborBlend:o}))},V=o=>{h(null),n(d=>({...d,closeUpNoiseStrength:o}))},_=o=>{h(null),n(d=>({...d,monoTint:o}))},I=o=>{h(null),n(d=>({...d,neonBoost:o}))},ce=o=>{h(null),n(d=>({...d,neonSaturation:o}))},X=o=>{h(null),n(d=>({...d,neonDetail:o}))},de=o=>{n(d=>({...d,isFilterEnabled:o}))},u=o=>{const d=nt[o];h(o),n(Se=>({...Se,targetWidth:d.width,targetHeight:d.height,colorLevels:d.colors,ditherStrength:d.dither,paletteMode:d.palette,curvature:d.curvature,scanlineStrength:d.scanline,scanline2Strength:d.scanline2,vignetteStrength:d.vignette,glowStrength:d.glow,edgeBoost:d.edgeBoost??0,phosphorStrength:d.phosphor,spotMaskStrength:d.spotMask,bulbRadius:d.bulbRadius,blackFloor:d.blackFloor,phosphorDotLightBalance:d.phosphorDotLightBalance??1,phosphorDotInternalScale:d.phosphorDotInternalScale??!1,phosphorDotBrightCore:d.phosphorDotBrightCore??!1,phosphorDotCellFill:d.phosphorDotCellFill??0,phosphorDotFlatDisc:d.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:d.phosphorDotNeighborBlend??!1,monoTint:d.monoTint,neonBoost:d.neonBoost,neonSaturation:d.neonSaturation,neonDetail:d.neonDetail,isFilterEnabled:!0}))},B=()=>{h(Et(e)),n(e)};return l.useEffect(()=>{$o(a)},[a]),l.useEffect(()=>{const o=Et(a);h(d=>d===o?d:o)},[a]),{...a,selectedPreset:p,setTargetWidth:i,setTargetHeight:m,setMatchTargetAspect:T,setColorLevels:A,setDitherStrength:C,setPaletteMode:b,setCurvature:F,setScanlineStrength:k,setScanline2Strength:ne,setScanlineBrightnessFade:E,setVignetteStrength:ue,setGlowStrength:Z,setEdgeBoost:re,setPhosphorStrength:q,setSpotMaskStrength:Q,setBulbRadius:Ae,setBlackFloor:oe,setPhosphorDotLightBalance:D,setPhosphorDotInternalScale:ge,setPhosphorDotBrightCore:U,setPhosphorDotCellFill:O,setPhosphorDotFlatDisc:v,setPhosphorDotNeighborBlend:H,setCloseUpNoiseStrength:V,setMonoTint:_,setNeonBoost:I,setNeonSaturation:ce,setNeonDetail:X,setIsFilterEnabled:de,applyPreset:u,resetSettings:B}}const kn=P.lazy(()=>oo(()=>import("./VideoControls-D4Vql_Ie.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),Fn=P.lazy(()=>oo(()=>import("./RetroFilterPanel-C9AwYTZ4.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Nn=async({title:t,body:e,okText:r,cancelText:a})=>{if(typeof window>"u")return!1;const n=[t,e,r||a?`${r??"OK"} / ${a??"Cancel"}`:""].filter(Boolean).join(`

`);return window.confirm(n)};function to({locale:t="en",src:e,stream:r,streamName:a,kind:n="video",looping:p,className:h,onError:i,initialFilterState:m,confirmDialog:T=Nn}){const A=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},C=P.useMemo(()=>Nt()?.ui,[]),[b,F]=P.useState(C?.isPreviewMaximized??!1),[k,ne]=P.useState(C?.isHighResolution??!1),[E,ue]=P.useState(!1),[Z,re]=P.useState(!1),[q,Q]=P.useState(!1),[Ae,oe]=P.useState(0),[D,ge]=P.useState(null),U=P.useRef(null),O=P.useRef(null),v=P.useRef(null),H=P.useRef(null),[V,_]=P.useState(null),I=P.useRef(""),ce=P.useRef(""),[X,de]=P.useState("playback"),u=In(m),B=k&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,o=En(u,E?"width":"contain",B),d=n==="image"&&!!e&&!o.previewError&&(!o.isRendererReady||o.isLoading),Se=x.jsx("div",{className:"flex min-h-[6rem] items-center justify-center text-sm text-slate-400",children:"Preparing controls..."}),y=P.useCallback(()=>{tn(),u.resetSettings(),o.resetAudioSettings(),F(!1),ne(!1)},[u,o]),z=P.useCallback(()=>{if(!o.sourceDimensions)return;const c=Math.max(8,Math.round(u.targetWidth/o.sourceDimensions.width*o.sourceDimensions.height/8)*8);c!==u.targetHeight&&u.setTargetHeight(c)},[u.targetHeight,u.targetWidth,u.setTargetHeight,o.sourceDimensions]),G=P.useCallback(()=>o.sourceDimensions?.width&&o.sourceDimensions?.height?o.sourceDimensions.width/o.sourceDimensions.height:Math.max(u.targetWidth,1)/Math.max(u.targetHeight,1),[u.targetHeight,u.targetWidth,o.sourceDimensions]),j=P.useCallback(c=>{if(u.setTargetWidth(c),!u.matchTargetAspect)return;const R=Math.max(G(),1e-4);u.setTargetHeight(Math.max(1,Math.round(c/R)))},[u,G]),ye=P.useCallback(c=>{if(u.setTargetHeight(c),!u.matchTargetAspect)return;const R=Math.max(G(),1e-4);u.setTargetWidth(Math.max(1,Math.round(c*R)))},[u,G]),Y=P.useCallback(c=>{u.setMatchTargetAspect(c),c&&o.sourceDimensions&&z()},[u,o.sourceDimensions,z]);P.useEffect(()=>{u.matchTargetAspect&&o.sourceDimensions&&z()},[u.matchTargetAspect,o.sourceDimensions,z]);const ve=P.useCallback(c=>{if(u.applyPreset(c),c!=="phosphorDot"||!o.sourceDimensions)return;const R=nt.phosphorDot,te=Math.max(o.sourceDimensions.width,1),De=Math.max(o.sourceDimensions.height,1),Le=te/De,se=R.width/R.height;let xe=R.width,Fe=R.height;Le>se?Fe=Math.max(8,Math.round(R.width/Le/8)*8):xe=Math.max(8,Math.round(R.height*Le/8)*8),!(R.width===xe&&R.height===Fe)&&(u.setTargetWidth(xe),u.setTargetHeight(Fe))},[u.applyPreset,u.setTargetHeight,u.setTargetWidth,o.sourceDimensions]),Ce=P.useCallback(()=>{if(r&&o.isCaptureActive){window.setTimeout(()=>{o.previewStream(r,n==="audio"?"audio":"video",a)},120);return}window.requestAnimationFrame(()=>{o.refreshLayout(),window.requestAnimationFrame(()=>{o.refreshLayout()})})},[n,o,r,a]),Pe="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",pe="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",ie="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",Te="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",he=P.useCallback(c=>{H.current!==null&&window.clearTimeout(H.current),H.current=window.setTimeout(()=>{ge(c),H.current=null},120)},[]),W=P.useCallback(()=>{H.current!==null&&(window.clearTimeout(H.current),H.current=null),ge(null)},[]),ee=P.useCallback(()=>{const c=U.current,R=v.current;if(!c||!R)return null;const te=c.getBoundingClientRect(),De=R.getBoundingClientRect();return{left:te.left,width:te.width,height:De.height}},[]),ae=P.useCallback((c,R,te="w-44")=>x.jsx("div",{role:"tooltip","aria-hidden":D!==c,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",te,D===c?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:R}),[D]);P.useEffect(()=>{if(r){const R=`stream:${r.id}:${n}:${a??""}`;if(I.current===R)return;I.current=R,(async()=>{try{await o.previewStream(r,n==="audio"?"audio":"video",a)}catch(te){if(te instanceof Error){i?.(te);return}i?.(new Error(String(te)))}})();return}if(!e){I.current="";return}const c=`src:${e}:${n}`;I.current!==c&&(I.current=c,(async()=>{try{await o.previewUrl(e,n)}catch(R){if(R instanceof Error){i?.(R);return}i?.(new Error(String(R)))}})())},[e,r,a,n,i,o]),P.useEffect(()=>{en({isPreviewMaximized:b,isHighResolution:k})},[k,b]),P.useEffect(()=>()=>{H.current!==null&&window.clearTimeout(H.current)},[]),P.useEffect(()=>{if(!b)return;const c=document.body.style.overflow,R=te=>{te.code==="Escape"&&F(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",R),()=>{document.body.style.overflow=c,window.removeEventListener("keydown",R)}},[b]),P.useEffect(()=>{b&&(re(!1),Q(!1),oe(0),_(null))},[b]),P.useEffect(()=>{if(X!=="video-settings"||b||Z){Q(!1),oe(0);return}const c=()=>{const R=O.current,te=v.current;if(!R||!te)return;const De=R.getBoundingClientRect().top,Le=te.getBoundingClientRect().height,se=Math.round(Math.min(Le,window.innerHeight)*.4),xe=-Math.max(120,se);Q(Fe=>{if(!Fe&&De<=xe){oe(Math.max(120,se));const Ee=ee();return Ee&&_(Ee),!0}return Fe&&oe(Math.max(120,se)),Fe&&De>=-24?(oe(0),!1):Fe})};return c(),window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c),()=>{window.removeEventListener("scroll",c),window.removeEventListener("resize",c)}},[X,b,Z,ee]),P.useEffect(()=>{if(!((Z||q)&&!b)){_(null);return}const R=()=>{const te=ee();te&&_(te)};return R(),window.addEventListener("resize",R),window.addEventListener("scroll",R,{passive:!0}),()=>{window.removeEventListener("resize",R),window.removeEventListener("scroll",R)}},[q,b,Z,E,ee,o.sourceDimensions]),P.useEffect(()=>{o.refreshLayout()},[E,Z,b,o.refreshLayout,o.sourceDimensions?.height,o.sourceDimensions?.width]),P.useEffect(()=>{o.refreshLayout()},[u.targetWidth,u.targetHeight,u.isFilterEnabled,B,o.refreshLayout]),P.useEffect(()=>{if(typeof p!="boolean")return;const c=r?`stream:${r.id}:${n}`:e?`src:${e}:${n}`:"";if(!c){ce.current="";return}const R=`${c}:${p}`;ce.current!==R&&(ce.current=R,o.setLoopingEnabled(p))},[n,p,o,e,r]);const ke=!b&&o.viewportRect&&o.sourceDimensions&&(E||o.sourceDimensions.width>o.sourceDimensions.height)?Math.max(280,Math.ceil(o.viewportRect.height+24)):null,be=ke?`${ke}px`:"60vh",Be=P.useMemo(()=>{if(!(!E||!o.sourceDimensions))return`${o.sourceDimensions.width} / ${o.sourceDimensions.height}`},[E,o.sourceDimensions]),fe=(Z||q)&&!b,Ge=q?`calc(max(0.0rem, env(safe-area-inset-top)) - ${Ae}px)`:void 0,Re=P.useMemo(()=>{if(!fe||!E||!o.sourceDimensions||!V||typeof window>"u")return;const c=Math.max(o.sourceDimensions.width/Math.max(o.sourceDimensions.height,1),1e-4),R=V.width/c,te=Math.max(220,Math.round(window.innerHeight*.68));return`${Math.min(R,te)}px`},[E,fe,V,o.sourceDimensions]);return x.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:x.jsxs("div",{ref:U,className:"space-y-4",children:[x.jsx("div",{ref:O,"aria-hidden":"true"}),x.jsxs("div",{ref:v,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${b?`fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 ${E?"overflow-y-auto":"flex items-stretch justify-stretch"}`:fe?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":""}`,style:fe&&V?{left:`${V.left}px`,top:Ge??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${V.width}px`}:void 0,children:[b&&x.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{F(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:x.jsx(jt,{size:18})}),x.jsxs("div",{className:`relative ${b?E?"w-full":"h-full min-h-0 w-full":"w-full min-w-0"}`,style:b?E&&Be?{aspectRatio:Be,minHeight:"220px"}:void 0:{aspectRatio:Be,height:Be?Re:be,minHeight:"220px"},children:[x.jsxs("div",{className:"relative h-full w-full overflow-hidden rounded-xl bg-slate-950",children:[d&&x.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),x.jsx("div",{ref:o.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!o.isPoweredOn&&x.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/72",children:x.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[x.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),x.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),o.isLoading&&!o.needsUserPlay&&!o.previewError&&x.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",d?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:x.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[x.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),x.jsx("p",{className:"font-medium",children:o.loadingLabel||"Loading preview..."}),x.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),o.needsUserPlay&&!o.isLoading&&x.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:x.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[x.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),x.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),x.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),x.jsx("button",{type:"button",onClick:()=>{o.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),o.hasAudioOnly&&x.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),x.jsxs("div",{className:"absolute -bottom-8 right-3 z-20 flex items-center gap-2",children:[o.canRecord&&x.jsx(x.Fragment,{children:x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":o.isRecording?"Stop recording":"Start recording",onClick:()=>{W(),(async()=>{if(o.isRecording)try{if(!await o.stopRecording())return;const R=o.prefersShareExport;if(!await T({title:"Recording ready",body:R?"Share the recorded clip now?":"Save the recorded clip now?",okText:R?"Share":"Save",cancelText:"Cancel"}))return;if(R){await o.sharePendingRecording()||o.downloadPendingRecording();return}o.downloadPendingRecording();return}catch(c){if(c instanceof Error){i?.(c);return}i?.(new Error(String(c)));return}try{await o.startRecording()}catch(c){if(c instanceof Error){i?.(c);return}i?.(new Error(String(c)))}})()},onMouseEnter:()=>he("record"),onMouseLeave:W,onFocus:()=>he("record"),onBlur:W,className:[Te,o.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:o.isRecording?x.jsx(qo,{size:14,className:"fill-current animate-pulse"}):x.jsx(Uo,{size:16,className:"text-rose-300"})}),ae("record",o.isRecording?A.recordStop:A.recordIdle)]})}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":o.isPoweredOn?"Power off":"Power on",onClick:()=>{if(W(),o.isPoweredOn){o.powerOff();return}o.powerOn()},onMouseEnter:()=>he("power"),onMouseLeave:W,onFocus:()=>he("power"),onBlur:W,className:[Pe,o.isPoweredOn?pe:ie].join(" "),children:x.jsx(Zo,{size:16})}),ae("power",o.isPoweredOn?A.powerOff:A.powerOn)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":k?"Disable high resolution":"Enable high resolution",onClick:()=>{W(),ne(c=>!c)},onMouseEnter:()=>he("hi-res"),onMouseLeave:W,onFocus:()=>he("hi-res"),onBlur:W,className:[Pe,k?pe:ie].join(" "),children:x.jsx(Fo,{size:16})}),ae("hi-res",A.hiRes)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":E?"Disable fit width":"Enable fit width",onClick:()=>{W(),ue(c=>!c),Ce()},onMouseEnter:()=>he("fit-width"),onMouseLeave:W,onFocus:()=>he("fit-width"),onBlur:W,className:[Pe,E?pe:ie].join(" "),children:x.jsx(Wo,{size:16})}),ae("fit-width",E?A.fitWidthOn:A.fitWidthOff)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{W(),Ce()},onMouseEnter:()=>he("refit"),onMouseLeave:W,onFocus:()=>he("refit"),onBlur:W,className:[Pe,ie].join(" "),children:x.jsx(Yo,{size:16})}),ae("refit",A.refit)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":fe?"Unpin preview":"Pin preview",onClick:()=>{W(),!b&&re(c=>{if(!c){const te=ee();return te&&_(te),!0}return Q(!1),oe(0),_(null),!1})},onMouseEnter:()=>he("pin"),onMouseLeave:W,onFocus:()=>he("pin"),onBlur:W,className:[Pe,b?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":fe?pe:ie].join(" "),disabled:b,children:x.jsx(zo,{size:16})}),ae("pin",b?A.pinUnavailable:fe?A.pinOn:A.pinOff)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":b?"Exit maximize":"Maximize preview",onClick:()=>{W(),F(c=>!c)},onMouseEnter:()=>he("maximize"),onMouseLeave:W,onFocus:()=>he("maximize"),onBlur:W,className:[Pe,b?pe:ie].join(" "),children:b?x.jsx(jt,{size:16}):x.jsx(Vo,{size:16})}),ae("maximize",b?A.maximizeOn:A.maximizeOff)]})]})]})]}),fe&&V&&x.jsx("div",{style:{height:`${V.height}px`}}),x.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(o.hasPlayableMedia||o.hasImage)&&X!=="video-settings"&&x.jsx(P.Suspense,{fallback:Se,children:x.jsx(kn,{hasPlayback:o.hasPlayableMedia,currentTime:o.currentTime,duration:o.duration,mode:X==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:o.isAudioFxEnabled,isLooping:o.isLooping,isMuted:o.isMuted,isNoiseEnabled:o.isNoiseEnabled,isPlaying:o.isPlaying,hasVideo:o.hasVideo,isVideoSettingsOpen:!1,lofiAmount:o.lofiAmount,radioToneAmount:o.radioToneAmount,bitCrushAmount:o.bitCrushAmount,sampleRateReductionAmount:o.sampleRateReductionAmount,bassAmount:o.bassAmount,midAmount:o.midAmount,trebleAmount:o.trebleAmount,stereoWidthAmount:o.stereoWidthAmount,smallSpeakerRoomAmount:o.smallSpeakerRoomAmount,wowFlutterAmount:o.wowFlutterAmount,noiseLevel:o.noiseLevel,vinylDustAmount:o.vinylDustAmount,playbackRate:o.playbackRate,volume:o.volume,onChangeLofiAmount:o.setLofiAmount,onChangeRadioToneAmount:o.setRadioToneAmount,onChangeBitCrushAmount:o.setBitCrushAmount,onChangeSampleRateReductionAmount:o.setSampleRateReductionAmount,onChangeBassAmount:o.setBassAmount,onChangeMidAmount:o.setMidAmount,onChangeTrebleAmount:o.setTrebleAmount,onChangeStereoWidthAmount:o.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:o.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:o.setWowFlutterAmount,onChangeNoiseLevel:o.setNoiseLevel,onChangeVinylDustAmount:o.setVinylDustAmount,onChangePlaybackRate:o.changePlaybackRate,onChangeVolume:o.changeVolume,onRestart:()=>{o.seekTo(0),o.playVideoWithAudio()},onSeek:o.seekTo,onStepFrame:o.stepFrame,onToggleAudioFx:o.toggleAudioFx,onToggleLoop:o.toggleLoop,onToggleMute:o.toggleMute,onToggleNoise:o.toggleNoise,onTogglePlayback:()=>{o.togglePlayback()},onBackToPlayback:()=>{de("playback")},onResetSettings:y,onToggleVideoSettings:()=>{de(c=>c==="video-settings"?"playback":"video-settings")},onToggleAudioSettings:()=>{de(c=>c==="audio-settings"?"playback":"audio-settings")}})}),o.previewError&&x.jsx("p",{className:"mt-3 text-rose-400",children:o.previewError}),X==="video-settings"&&x.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[x.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:x.jsx("button",{type:"button",onClick:()=>{de("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),x.jsx(P.Suspense,{fallback:Se,children:x.jsx(Fn,{locale:t,colorLevels:u.colorLevels,curvature:u.curvature,ditherStrength:u.ditherStrength,glowStrength:u.glowStrength,edgeBoost:u.edgeBoost,isFilterEnabled:u.isFilterEnabled,monoTint:u.monoTint,neonBoost:u.neonBoost,neonDetail:u.neonDetail,neonSaturation:u.neonSaturation,paletteMode:u.paletteMode,phosphorStrength:u.phosphorStrength,spotMaskStrength:u.spotMaskStrength,bulbRadius:u.bulbRadius,blackFloor:u.blackFloor,phosphorDotLightBalance:u.phosphorDotLightBalance,phosphorDotInternalScale:u.phosphorDotInternalScale,phosphorDotBrightCore:u.phosphorDotBrightCore,phosphorDotCellFill:u.phosphorDotCellFill,phosphorDotFlatDisc:u.phosphorDotFlatDisc,phosphorDotNeighborBlend:u.phosphorDotNeighborBlend,closeUpNoiseStrength:u.closeUpNoiseStrength,scanlineBrightnessFade:u.scanlineBrightnessFade,scanlineStrength:u.scanlineStrength,scanline2Strength:u.scanline2Strength,selectedPreset:u.selectedPreset,sourceDimensions:o.sourceDimensions,targetHeight:u.targetHeight,targetWidth:u.targetWidth,matchTargetAspect:u.matchTargetAspect,vignetteStrength:u.vignetteStrength,onApplyPreset:ve,onSetColorLevels:u.setColorLevels,onSetCurvature:u.setCurvature,onSetDitherStrength:u.setDitherStrength,onSetGlowStrength:u.setGlowStrength,onSetEdgeBoost:u.setEdgeBoost,onSetIsFilterEnabled:u.setIsFilterEnabled,onSetMonoTint:u.setMonoTint,onSetNeonBoost:u.setNeonBoost,onSetNeonDetail:u.setNeonDetail,onSetNeonSaturation:u.setNeonSaturation,onSetPaletteMode:u.setPaletteMode,onSetPhosphorStrength:u.setPhosphorStrength,onSetSpotMaskStrength:u.setSpotMaskStrength,onSetBulbRadius:u.setBulbRadius,onSetBlackFloor:u.setBlackFloor,onSetPhosphorDotLightBalance:u.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:u.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:u.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:u.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:u.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:u.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:u.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:u.setScanlineBrightnessFade,onSetScanlineStrength:u.setScanlineStrength,onSetScanline2Strength:u.setScanline2Strength,onSetTargetHeight:ye,onSetTargetWidth:j,onSetMatchTargetAspect:Y,onSetVignetteStrength:u.setVignetteStrength})})]})]})]})})}const Gn=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:to,default:to},Symbol.toStringTag,{value:"Module"}));export{pn as M,nn as R,nt as a,Gn as b,Yo as c};
