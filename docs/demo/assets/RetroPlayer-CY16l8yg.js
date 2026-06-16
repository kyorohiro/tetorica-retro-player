const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-TfD4XhaR.js","./index-BEl28r4Z.js","./index-6MRf2m_K.css","./RetroFilterPanel-C84LID1A.js"])))=>i.map(i=>d[i]);
import{b as _e,r as l,R as jt,a as N,j as g,_ as no}from"./index-BEl28r4Z.js";const Fo=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],No=_e("aperture",Fo);const Go=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Wo=_e("arrow-left-right",Go);const Uo=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Ho=_e("circle",Uo);const Vo=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],_o=_e("maximize-2",Vo);const zo=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Bt=_e("minimize-2",zo);const Oo=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],jo=_e("pin",Oo);const Zo=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],Xo=_e("power",Zo);const Yo=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Ko=_e("rotate-ccw",Yo);const qo=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Jo=_e("square",qo);async function ro(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function $o(t,e){await ro("plugin:sharekit|share_file",{url:t,...e})}const Nt="tetorica-retro-player.settings",pt=1,ft=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(Nt);if(!t)return null;const e=JSON.parse(t);return e.version!==pt?null:e}catch{return null}},Gt=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(Nt,JSON.stringify(t))}catch{}},vt=()=>ft(),Qo=t=>{const e=ft();Gt({version:pt,audio:e?.audio,filter:t,ui:e?.ui})},en=t=>{const e=ft();Gt({version:pt,audio:t,filter:e?.filter,ui:e?.ui})},tn=t=>{const e=ft();Gt({version:pt,audio:e?.audio,filter:e?.filter,ui:t})},on=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(Nt)}catch{}},fe={isMuted:!1,volume:1,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.8,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!1,noiseLevel:.02,vinylDustAmount:0},nn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.92,lofiAmount:.7,radioToneAmount:.18,bitCrushAmount:.22,sampleRateReductionAmount:.24,bassAmount:.08,midAmount:-.08,trebleAmount:-.18,stereoWidthAmount:-.08,smallSpeakerRoomAmount:.08,wowFlutterAmount:.12,noiseLevel:.005,vinylDustAmount:0}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.88,lofiAmount:.4,radioToneAmount:.9,bitCrushAmount:.12,sampleRateReductionAmount:.38,bassAmount:-.4,midAmount:.18,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:.08,noiseLevel:.01,vinylDustAmount:0}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.06,smallSpeakerRoomAmount:.18,wowFlutterAmount:.42,noiseLevel:.0075,vinylDustAmount:0}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.96,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:.03,wowFlutterAmount:.18,noiseLevel:.0035,vinylDustAmount:.58}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.94,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.32,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:.04,noiseLevel:.0025,vinylDustAmount:.08}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,volume:1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,volume:.93,lofiAmount:.58,radioToneAmount:.12,bitCrushAmount:.12,sampleRateReductionAmount:.16,bassAmount:.1,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.12,wowFlutterAmount:.28,noiseLevel:.006,vinylDustAmount:0}}},rn=Object.fromEntries(Object.entries(nn).map(([t,e])=>[t,{label:e.label,settings:{...fe,...e.settings}}])),sn=Object.fromEntries(Object.entries(rn).map(([t,e])=>[t,e.settings])),an=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function ln(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n+=1){const c=n*2/255-1;o[n]=Math.tanh(c*r)}return o}function cn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n+=1){const c=r.getChannelData(n);for(let u=0;u<c.length;u+=1){const s=u/c.length,d=(1-s)**1.85,T=.78+.22*Math.sin(s*42+n*.9),P=Math.sin(s*130+n*.35)*.08;c[u]=(Math.random()*2-1+P)*d*T*.28}}return r}function un(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let c=0;c<e;c+=1){const u=Math.random()*2-1;r=(r+u*.045)/1.045,n=n*.82+u*.18;const s=r*1.35,d=(u-n)*.55,T=Math.max(-1,Math.min(1,s+d));for(let P=0;P<o.numberOfChannels;P+=1){const w=o.getChannelData(P),D=(Math.random()*2-1)*.012;w[c]=Math.max(-1,Math.min(1,T+D))}}return o}function dn(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const u=Math.random()*2-1;n=n*.72+u*.28,o[r]+=(u-n)*.018;const s=Math.random();if(s<.0034){const d=8+Math.floor(Math.random()*42),T=.11+Math.random()*.28,P=Math.random()<.5?-1:1;for(let w=0;w<d&&r+w<e;w+=1){const D=Math.exp(-w/(2.4+Math.random()*5));o[r+w]+=P*T*D*(.7+Math.random()*.3)}r+=d+Math.floor(Math.random()*640);continue}if(s<.0038){const d=90+Math.floor(Math.random()*260),T=.055+Math.random()*.11,P=Math.random()*Math.PI*2;for(let w=0;w<d&&r+w<e;w+=1){const D=Math.exp(-w/(18+Math.random()*40)),W=Math.sin(P+w*(.22+Math.random()*.06));o[r+w]+=T*D*W}r+=d+Math.floor(Math.random()*2200);continue}r+=1}const c=t.createBuffer(2,e,t.sampleRate);for(let u=0;u<c.numberOfChannels;u+=1){const s=c.getChannelData(u);for(let d=0;d<e;d+=1){const T=(Math.random()*2-1)*.0035;s[d]=Math.max(-1,Math.min(1,o[d]+T))}}return c}function hn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function io({preset:t,params:e}){return{...fe,...t?sn[t]:null,...e}}class mn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:c=!0,enableAudioWorklet:u=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=c,this.enableAudioWorklet=u}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){an()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...fe,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=io({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,c=this.nodes.lofiLowpass,u=this.nodes.lofiHighshelf,s=this.nodes.lofiDrive,d=this.nodes.bitcrusher,T=this.nodes.bassEq,P=this.nodes.midEq,w=this.nodes.trebleEq,D=this.nodes.stereoWidth,W=this.nodes.roomDryGain,A=this.nodes.roomWetGain,K=this.nodes.wowFlutterDelay,H=this.nodes.wowLfo,X=this.nodes.wowLfoGain,Z=this.nodes.flutterLfo,f=this.nodes.flutterLfoGain,$=this.nodes.noiseGain,p=this.nodes.crackleGain,ce=this.nodes.vinylDustBedFilter,ne=this.nodes.vinylDustBedGain,{settings:R,isPlaying:oe,isOutputEnabled:_}=this.runtimeState,O=R.isMuted||!_?0:R.volume;if(e&&(e.gain.value=O),o&&r&&n){const v=R.isAudioFxEnabled?R.radioToneAmount:0;o.frequency.value=20+v*430,o.Q.value=.4+v*.35,r.frequency.value=2e4-v*17400,r.Q.value=.2+v*.9,n.frequency.value=1700,n.Q.value=.8+v*1.4,n.gain.value=v*6}if(c&&u&&s){const v=R.isAudioFxEnabled?R.lofiAmount:0;c.frequency.value=16e3-v*14200,c.Q.value=.3+v*1.8,u.gain.value=-v*18;try{s.curve=ln(v*.6)}catch{}}if(d){const v=R.isAudioFxEnabled,z=16-(v?R.bitCrushAmount:0)*12,M=1+(v?R.sampleRateReductionAmount:0)*23,x=v?Math.max(R.bitCrushAmount,R.sampleRateReductionAmount):0;d.parameters.get("bitDepth")?.setValueAtTime(z,d.context.currentTime),d.parameters.get("holdFrames")?.setValueAtTime(M,d.context.currentTime),d.parameters.get("mix")?.setValueAtTime(x,d.context.currentTime)}if(T&&P&&w){const v=R.isAudioFxEnabled?15:0;T.gain.value=R.bassAmount*v,P.gain.value=R.midAmount*v,w.gain.value=R.trebleAmount*v}if(D){const v=R.isAudioFxEnabled?1+R.stereoWidthAmount:1;D.parameters.get("width")?.setValueAtTime(v,D.context.currentTime)}if(W&&A){const v=R.isAudioFxEnabled?R.smallSpeakerRoomAmount:0;W.gain.value=Math.max(.52,1-v*.42),A.gain.value=v*.95}if(K&&H&&X&&Z&&f){const v=R.isAudioFxEnabled?R.wowFlutterAmount:0;K.delayTime.value=.006+v*.004,H.frequency.value=.18+v*.42,X.gain.value=v*.0035,Z.frequency.value=5.2+v*6.5,f.gain.value=v*9e-4}if($&&($.gain.value=R.isNoiseEnabled&&!R.isMuted&&_&&oe?Math.min(.24,R.noiseLevel*5.5):0),p){const v=R.isNoiseEnabled&&!R.isMuted&&_&&oe;p.gain.value=v?Math.min(.24,R.vinylDustAmount*.22+R.noiseLevel*.25):0}if(ce&&ne){const z=R.isNoiseEnabled&&!R.isMuted&&_&&oe?R.vinylDustAmount:0;ce.frequency.value=2100+z*2600,ce.Q.value=.35+z*.25,ne.gain.value=z*.11}}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const c=o.createBiquadFilter(),u=o.createBiquadFilter(),s=o.createBiquadFilter(),d=o.createBiquadFilter(),T=o.createBiquadFilter(),P=o.createWaveShaper();let w=null,D=null;const W=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&W){const ve=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await o.audioWorklet.addModule(ve.href),w=new W(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const ue=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(ue.href),D=new W(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const A=o.createBiquadFilter(),K=o.createBiquadFilter(),H=o.createBiquadFilter(),X=o.createGain(),Z=o.createConvolver(),f=o.createGain(),$=o.createDelay(.05),p=o.createOscillator(),ce=o.createGain(),ne=o.createOscillator(),R=o.createGain();c.type="highpass",u.type="lowpass",s.type="peaking",d.type="lowpass",T.type="highshelf",A.type="lowshelf",A.frequency.value=180,K.type="peaking",K.frequency.value=1200,K.Q.value=.9,H.type="highshelf",H.frequency.value=3200,Z.buffer=cn(o),T.frequency.value=2800,P.oversample="4x",$.delayTime.value=.006,p.type="sine",ne.type="sine",p.connect(ce),ce.connect($.delayTime),ne.connect(R),R.connect($.delayTime),$.connect(c),c.connect(u),u.connect(s),s.connect(d),d.connect(T),T.connect(P),w?(P.connect(w),w.connect(A)):P.connect(A),A.connect(K),K.connect(H),D?(H.connect(D),D.connect(X),D.connect(Z)):(H.connect(X),H.connect(Z)),Z.connect(f),X.connect(r),f.connect(r),this.connectOutputToDestination&&r.connect(o.destination),n&&this.connectOutputToRecordingDestination&&r.connect(n);const oe=o.createBufferSource();oe.buffer=un(o),oe.loop=!0;const _=o.createBiquadFilter();_.type="highpass",_.frequency.value=1100,_.Q.value=.25;const O=o.createBiquadFilter();O.type="lowpass",O.frequency.value=5600,O.Q.value=.18;const v=o.createBiquadFilter();v.type="peaking",v.frequency.value=2400,v.Q.value=.7,v.gain.value=-2.5;const z=o.createStereoPanner(),M=o.createGain(),x=o.createOscillator(),C=o.createGain(),re=o.createBufferSource(),Y=o.createBiquadFilter(),ae=o.createBiquadFilter(),Q=o.createGain(),E=o.createGain();r.gain.value=0,M.gain.value=0,x.type="sine",x.frequency.value=.021,C.gain.value=.08,re.buffer=dn(o),re.loop=!0,Y.type="highpass",Y.frequency.value=1250,Y.Q.value=.35,ae.type="bandpass",ae.frequency.value=2400,ae.Q.value=.4,Q.gain.value=0,E.gain.value=0,oe.connect(_),_.connect(O),O.connect(v),v.connect(z),z.connect(M),M.connect(r),x.connect(C),C.connect(z.pan),re.connect(Y),Y.connect(E),E.connect(r),re.connect(ae),ae.connect(Q),Q.connect(r),oe.start(),x.start(),re.start(),p.start(),ne.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:c,radioToneLowpass:u,radioTonePresence:s,recordingDestination:n,lofiLowpass:d,lofiHighshelf:T,lofiDrive:P,bitcrusher:w,bassEq:A,midEq:K,trebleEq:H,stereoWidth:D,roomDryGain:X,roomConvolver:Z,roomWetGain:f,wowFlutterDelay:$,wowLfo:p,wowLfoGain:ce,flutterLfo:ne,flutterLfoGain:R,noiseSource:oe,noiseFilter:v,noisePanner:z,noiseGain:M,noiseLfo:x,noiseLfoGain:C,crackleSource:re,crackleFilter:Y,vinylDustBedFilter:ae,vinylDustBedGain:Q,crackleGain:E})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const c=this.output;if(!c){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(hn(e)){c.connect(e,o);return}c.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function gn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const c={settings:io(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new mn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:c,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function J(t){return{get current(){return t()}}}function pn({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:c}){const[u]=l.useState(()=>new AudioContext),[s]=l.useState(()=>{const m=vt()?.audio;return{isMuted:m?.isMuted??fe.isMuted,volume:m?.volume??fe.volume,playbackRate:m?.playbackRate??fe.playbackRate,isLooping:m?.isLooping??fe.isLooping,isAudioFxEnabled:m?.isAudioFxEnabled??fe.isAudioFxEnabled,lofiAmount:m?.lofiAmount??fe.lofiAmount,radioToneAmount:m?.radioToneAmount??fe.radioToneAmount,bitCrushAmount:m?.bitCrushAmount??fe.bitCrushAmount,sampleRateReductionAmount:m?.sampleRateReductionAmount??fe.sampleRateReductionAmount,bassAmount:m?.bassAmount??fe.bassAmount,midAmount:m?.midAmount??fe.midAmount,trebleAmount:m?.trebleAmount??fe.trebleAmount,stereoWidthAmount:m?.stereoWidthAmount??fe.stereoWidthAmount,smallSpeakerRoomAmount:m?.smallSpeakerRoomAmount??fe.smallSpeakerRoomAmount,wowFlutterAmount:m?.wowFlutterAmount??fe.wowFlutterAmount,isNoiseEnabled:m?.isNoiseEnabled??fe.isNoiseEnabled,noiseLevel:m?.noiseLevel??fe.noiseLevel,vinylDustAmount:m?.vinylDustAmount??fe.vinylDustAmount}}),d=l.useRef(s.isMuted),T=l.useRef(s.volume),P=l.useRef(s.playbackRate),w=l.useRef(s.isLooping),D=l.useRef(s.isAudioFxEnabled),W=l.useRef(s.lofiAmount),A=l.useRef(s.radioToneAmount),K=l.useRef(s.bitCrushAmount),H=l.useRef(s.sampleRateReductionAmount),X=l.useRef(s.bassAmount),Z=l.useRef(s.midAmount),f=l.useRef(s.trebleAmount),$=l.useRef(s.stereoWidthAmount),p=l.useRef(s.smallSpeakerRoomAmount),ce=l.useRef(s.wowFlutterAmount),ne=l.useRef(s.isNoiseEnabled),R=l.useRef(s.noiseLevel),oe=l.useRef(s.vinylDustAmount),[_,O]=l.useState(s.isMuted),[v,z]=l.useState(s.playbackRate),[M,x]=l.useState(s.volume),[C,re]=l.useState(s.isLooping),[Y,ae]=l.useState(s.isAudioFxEnabled),[Q,E]=l.useState(s.lofiAmount),[ve,ue]=l.useState(s.radioToneAmount),[h,i]=l.useState(s.bitCrushAmount),[q,U]=l.useState(s.sampleRateReductionAmount),[j,k]=l.useState(s.bassAmount),[I,V]=l.useState(s.midAmount),[de,Be]=l.useState(s.trebleAmount),[he,me]=l.useState(s.stereoWidthAmount),[ge,Te]=l.useState(s.smallSpeakerRoomAmount),[Se,le]=l.useState(s.wowFlutterAmount),[be,Ee]=l.useState(s.isNoiseEnabled),[xe,Fe]=l.useState(s.noiseLevel),[ye,Ue]=l.useState(s.vinylDustAmount),Ae=l.useRef(null),[L]=l.useState(()=>gn({context:u,instanceLabel:t,params:s,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[je]=l.useState(()=>({audioContextRef:J(()=>L.audioContext),masterGainRef:J(()=>L.masterGain),radioToneHighpassRef:J(()=>L.radioToneHighpass),radioToneLowpassRef:J(()=>L.radioToneLowpass),radioTonePresenceRef:J(()=>L.radioTonePresence),recordingDestinationRef:J(()=>L.recordingDestination),lofiLowpassRef:J(()=>L.lofiLowpass),lofiHighshelfRef:J(()=>L.lofiHighshelf),lofiDriveRef:J(()=>L.lofiDrive),bitcrusherRef:J(()=>L.bitcrusher),bassEqRef:J(()=>L.bassEq),midEqRef:J(()=>L.midEq),trebleEqRef:J(()=>L.trebleEq),stereoWidthRef:J(()=>L.stereoWidth),roomDryGainRef:J(()=>L.roomDryGain),roomConvolverRef:J(()=>L.roomConvolver),roomWetGainRef:J(()=>L.roomWetGain),wowFlutterDelayRef:J(()=>L.wowFlutterDelay),wowLfoRef:J(()=>L.wowLfo),wowLfoGainRef:J(()=>L.wowLfoGain),flutterLfoRef:J(()=>L.flutterLfo),flutterLfoGainRef:J(()=>L.flutterLfoGain),noiseSourceRef:J(()=>L.noiseSource),noiseFilterRef:J(()=>L.noiseFilter),noisePannerRef:J(()=>L.noisePanner),noiseGainRef:J(()=>L.noiseGain),noiseLfoRef:J(()=>L.noiseLfo),noiseLfoGainRef:J(()=>L.noiseLfoGain),crackleSourceRef:J(()=>L.crackleSource),crackleFilterRef:J(()=>L.crackleFilter),vinylDustBedFilterRef:J(()=>L.vinylDustBedFilter),vinylDustBedGainRef:J(()=>L.vinylDustBedGain),crackleGainRef:J(()=>L.crackleGain)})),{audioContextRef:Ye,masterGainRef:Ie,radioToneHighpassRef:Me,radioToneLowpassRef:pe,radioTonePresenceRef:Ce,recordingDestinationRef:$e,lofiLowpassRef:De,lofiHighshelfRef:He,lofiDriveRef:Re,bitcrusherRef:Ne,bassEqRef:Ge,midEqRef:Ze,trebleEqRef:Xe,stereoWidthRef:Qe,roomDryGainRef:Ke,roomConvolverRef:a,roomWetGainRef:y,wowFlutterDelayRef:G,wowLfoRef:ie,wowLfoGainRef:F,flutterLfoRef:S,flutterLfoGainRef:we,noiseSourceRef:ee,noiseFilterRef:rt,noisePannerRef:xt,noiseGainRef:it,noiseLfoRef:wt,noiseLfoGainRef:At,crackleSourceRef:Ct,crackleFilterRef:st,vinylDustBedFilterRef:St,vinylDustBedGainRef:at,crackleGainRef:yt}=je,ze=(m,We)=>L.debugAudio(m,We),lt=()=>L.ensureInitialized(),ct=()=>L.ensureInitialized(),qe=()=>L.updateAudioNodes(),ut=m=>L.connectSourceNode(m),Rt=()=>L.disposeAudioEngine(),et=(m,We)=>L.setParams(m,We),Tt=m=>L.setIsPlaying(m),dt=m=>L.setOutputEnabled(m),Dt=async m=>{const We=await lt();if(!We||!L.input){ze("connectMediaAudio:no-context",{mediaTag:m.tagName});return}Ae.current&&(ze("connectMediaAudio:disconnect-previous",{mediaTag:m.tagName}),Ae.current.disconnect(),Ae.current=null);try{const Ve=We.createMediaElementSource(m);Ve.connect(L.input),Ae.current=Ve,m.muted=d.current,m.volume=d.current?0:T.current,ze("connectMediaAudio:connected",{audioContextState:We.state,mediaTag:m.tagName,previewKind:o.current}),qe()}catch(Ve){throw ze("connectMediaAudio:error",{audioContextState:We.state,mediaTag:m.tagName,message:Ve instanceof Error?Ve.message:String(Ve),previewKind:o.current}),Ve}},Mt=()=>{const m=Ae.current;!m||!L.input||(m.disconnect(),m.connect(L.input),qe())},Lt=async()=>{Ae.current?.disconnect(),Ae.current=null,await Rt()},Pt=()=>{const m={...fe};d.current=m.isMuted,T.current=m.volume,P.current=m.playbackRate,w.current=m.isLooping,D.current=m.isAudioFxEnabled,W.current=m.lofiAmount,A.current=m.radioToneAmount,K.current=m.bitCrushAmount,H.current=m.sampleRateReductionAmount,X.current=m.bassAmount,Z.current=m.midAmount,f.current=m.trebleAmount,$.current=m.stereoWidthAmount,p.current=m.smallSpeakerRoomAmount,ce.current=m.wowFlutterAmount,ne.current=m.isNoiseEnabled,R.current=m.noiseLevel,oe.current=m.vinylDustAmount,O(m.isMuted),x(m.volume),z(m.playbackRate),re(m.isLooping),ae(m.isAudioFxEnabled),E(m.lofiAmount),ue(m.radioToneAmount),i(m.bitCrushAmount),U(m.sampleRateReductionAmount),k(m.bassAmount),V(m.midAmount),Be(m.trebleAmount),me(m.stereoWidthAmount),Te(m.smallSpeakerRoomAmount),le(m.wowFlutterAmount),Ee(m.isNoiseEnabled),Fe(m.noiseLevel),Ue(m.vinylDustAmount),r.current&&(r.current.muted=m.isMuted,r.current.volume=m.volume,r.current.playbackRate=m.playbackRate,r.current.loop=m.isLooping),et(m),window.requestAnimationFrame(qe)};return l.useEffect(()=>{d.current=_,T.current=M,P.current=v,w.current=C,D.current=Y,W.current=Q,A.current=ve,K.current=h,H.current=q,X.current=j,Z.current=I,f.current=de,$.current=he,p.current=ge,ce.current=Se,ne.current=be,R.current=xe,oe.current=ye,et({isMuted:_,volume:M,playbackRate:v,isLooping:C,isAudioFxEnabled:Y,lofiAmount:Q,radioToneAmount:ve,bitCrushAmount:h,sampleRateReductionAmount:q,bassAmount:j,midAmount:I,trebleAmount:de,stereoWidthAmount:he,smallSpeakerRoomAmount:ge,wowFlutterAmount:Se,isNoiseEnabled:be,noiseLevel:xe,vinylDustAmount:ye},!0),Tt(n),dt(e==="video"||e==="audio"||e==="capture"),r.current&&(r.current.muted=_,r.current.volume=_?0:M,r.current.playbackRate=v,r.current.loop=C)},[_,M,Y,Q,ve,h,q,j,I,de,he,ge,Se,be,xe,ye,n,v,C,e]),l.useEffect(()=>{en({isMuted:_,volume:M,playbackRate:v,isLooping:C,isAudioFxEnabled:Y,lofiAmount:Q,radioToneAmount:ve,bitCrushAmount:h,sampleRateReductionAmount:q,bassAmount:j,midAmount:I,trebleAmount:de,stereoWidthAmount:he,smallSpeakerRoomAmount:ge,wowFlutterAmount:Se,isNoiseEnabled:be,noiseLevel:xe,vinylDustAmount:ye})},[_,M,v,C,Y,Q,ve,h,q,j,I,de,he,ge,Se,be,xe,ye]),{audioContextRef:Ye,mediaSourceRef:Ae,masterGainRef:Ie,radioToneHighpassRef:Me,radioToneLowpassRef:pe,radioTonePresenceRef:Ce,recordingDestinationRef:$e,lofiLowpassRef:De,lofiHighshelfRef:He,lofiDriveRef:Re,bitcrusherRef:Ne,bassEqRef:Ge,midEqRef:Ze,trebleEqRef:Xe,stereoWidthRef:Qe,roomDryGainRef:Ke,roomConvolverRef:a,roomWetGainRef:y,wowFlutterDelayRef:G,wowLfoRef:ie,wowLfoGainRef:F,flutterLfoRef:S,flutterLfoGainRef:we,noiseSourceRef:ee,noiseFilterRef:rt,noisePannerRef:xt,noiseGainRef:it,noiseLfoRef:wt,noiseLfoGainRef:At,crackleSourceRef:Ct,crackleFilterRef:st,vinylDustBedFilterRef:St,vinylDustBedGainRef:at,crackleGainRef:yt,isMutedRef:d,volumeRef:T,playbackRateRef:P,isLoopingRef:w,isAudioFxEnabledRef:D,lofiAmountRef:W,radioToneAmountRef:A,bitCrushAmountRef:K,sampleRateReductionAmountRef:H,bassAmountRef:X,midAmountRef:Z,trebleAmountRef:f,stereoWidthAmountRef:$,smallSpeakerRoomAmountRef:p,wowFlutterAmountRef:ce,isNoiseEnabledRef:ne,noiseLevelRef:R,vinylDustAmountRef:oe,isMuted:_,setIsMuted:O,playbackRate:v,setPlaybackRate:z,volume:M,setVolume:x,isLooping:C,setIsLooping:re,isAudioFxEnabled:Y,setIsAudioFxEnabled:ae,lofiAmount:Q,setLofiAmount:E,radioToneAmount:ve,setRadioToneAmount:ue,bitCrushAmount:h,setBitCrushAmount:i,sampleRateReductionAmount:q,setSampleRateReductionAmount:U,bassAmount:j,setBassAmount:k,midAmount:I,setMidAmount:V,trebleAmount:de,setTrebleAmount:Be,stereoWidthAmount:he,setStereoWidthAmount:me,smallSpeakerRoomAmount:ge,setSmallSpeakerRoomAmount:Te,wowFlutterAmount:Se,setWowFlutterAmount:le,isNoiseEnabled:be,setIsNoiseEnabled:Ee,noiseLevel:xe,setNoiseLevel:Fe,vinylDustAmount:ye,setVinylDustAmount:Ue,debugAudio:ze,ensureAudioContext:ct,ensureInitialized:lt,updateAudioNodes:qe,connectSourceNode:ut,connectMediaAudio:Dt,reconnectCurrentMediaAudio:Mt,resetAudioSettings:Pt,disposeAudioEngine:Lt}}const fn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},vn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,bn=`#version 300 es
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
`,xn=`#version 300 es
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
`,wn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),Xt=640,Et=()=>typeof performance<"u"?performance.now():Date.now(),kt=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Yt=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,An=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Kt=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),gt=t=>({width:kt(t)?t.videoWidth:Yt(t)?t.naturalWidth:t.width,height:kt(t)?t.videoHeight:Yt(t)?t.naturalHeight:t.height}),Cn=(t,e,o)=>kt(t)&&(e>Xt||o>Xt),bt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Sn=t=>bt(t)&&t.phosphorDotInternalScale?2:1,yn=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},Rn=(t,e,o,r,n,c)=>{if(!bt(o)||n===void 0||c===void 0||n<=0||c<=0)return{width:t,height:e};const u=Math.max(1.1,2.15+o.bulbRadius*1.15),s=Math.max(1,u/Math.max(r,1)),d=Math.max(1,Math.floor(n/s)),T=Math.max(1,Math.floor(c/s)),P=Math.min(1,d/Math.max(t,1),T/Math.max(e,1));return{width:Math.max(1,Math.round(t*P)),height:Math.max(1,Math.round(e*P))}},Ft=(t,e,o,r,n)=>{const c=Sn(t),u=Math.max(t.targetWidth,1),s=Math.max(t.targetHeight,1),d=t.matchTargetAspect?yn(u,s,e,o):{width:u,height:s},T=d.width*c,P=d.height*c,w=Rn(T,P,t,c,r,n);return{width:w.width,height:w.height,sampleWidth:Math.max(1,Math.round(T)),sampleHeight:Math.max(1,Math.round(P)),internalScale:c,isPhosphorDotMode:bt(t)}};function qt(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function Jt(t,e,o){const r=qt(t,t.VERTEX_SHADER,e),n=qt(t,t.FRAGMENT_SHADER,o),c=t.createProgram();if(!c)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(c,r),t.attachShader(c,n),t.bindAttribLocation(c,0,"aPosition"),t.linkProgram(c),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(c,t.LINK_STATUS)){const u=t.getProgramInfoLog(c)||"Unknown program link error.";throw t.deleteProgram(c),new Error(u)}return c}class Tn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=Et();constructor(e){this.gl=e,this.filterProgram=Jt(e,Zt,bn),this.passthroughProgram=Jt(e,Zt,xn);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,wn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=Et()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const c=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),Kt(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const u=gt(o);this.applyFilterUniforms(r,u.width,u.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(Kt(e)||!o.isFilterEnabled)return e;const r=gt(e);if(r.width<=0||r.height<=0||Cn(e,r.width,r.height))return e;const{width:n,height:c,sampleWidth:u,sampleHeight:s,isPhosphorDotMode:d}=Ft(o,r.width,r.height),T=Math.max(1,Math.round(d?u:n)),P=Math.max(1,Math.round(d?s:c)),w=this.ensureUploadContext();return!w||!this.uploadCanvas?e:(this.uploadCanvas.width!==T&&(this.uploadCanvas.width=T),this.uploadCanvas.height!==P&&(this.uploadCanvas.height=P),w.imageSmoothingEnabled=!0,w.imageSmoothingQuality="high",w.fillStyle="#000",w.fillRect(0,0,T,P),w.drawImage(e,0,0,T,P),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,c=An(n.canvas)?n.canvas:null,u=Math.max(c?.clientWidth??n.drawingBufferWidth,1),s=Math.max(c?.clientHeight??n.drawingBufferHeight,1),{width:d,height:T,sampleWidth:P,sampleHeight:w,isPhosphorDotMode:D}=Ft(e,o,r,u,s);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,d,T),n.uniform2f(this.uniformLocations.uSampleTargetSize,P,w),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,vn(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*T/(Math.max(n.drawingBufferHeight,1)*d)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,D?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...fn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(Et()-this.startedAt)/1e3)}}function Dn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:c,debugVideo:u}){const s=l.useRef(null),d=l.useRef(null),T=l.useRef(null),P=l.useRef(null),w=l.useRef(null),D=l.useRef(null),W=l.useRef(null),A=l.useRef(null),K=l.useRef(()=>{}),H=l.useRef(t),X=l.useRef(r),Z=l.useRef(!1),f=l.useRef(null),$=l.useRef(null),p=l.useRef(null),[ce,ne]=l.useState(!1),[R,oe]=l.useState(null);H.current=t,X.current=r;const _=l.useCallback(i=>{oe(q=>{const U=typeof i=="function"?i(q):i;return p.current=U,U})},[]),O=l.useCallback(()=>{const i=d.current,q=w.current;i&&(i.pipeline.setOutputEnabled(X.current),i.pipeline.setSource(q),i.pipeline.setFilterState(H.current),i.pipeline.render())},[]);l.useLayoutEffect(()=>{K.current=O},[O]);const v=l.useCallback(()=>{Z.current=!1,A.current!==null&&(window.cancelAnimationFrame(A.current),A.current=null)},[]),z=l.useCallback(()=>{if(Z.current)return;Z.current=!0;const i=()=>{if(!Z.current)return;if(K.current(),!(c.current==="video"||c.current==="capture"||c.current==="image"||n.current)){A.current=null,Z.current=!1;return}A.current=window.requestAnimationFrame(i)};A.current=window.requestAnimationFrame(i)},[n,c]),M=l.useCallback(()=>{O()},[O]),x=l.useCallback(()=>{O()},[O]),C=l.useCallback(()=>{O()},[O]),re=l.useCallback(()=>(d.current&&d.current.pipeline.resetAnimationClock(),D.current={},O(),D.current),[O]),Y=l.useCallback((i,q,U)=>{if(!i)return;const{width:j,height:k}=gt(U);if(j<=0||k<=0)return;const I=s.current,V=I?.clientWidth??i.canvas.width,de=I?.clientHeight??i.canvas.height,he=e==="width"?V/j:Math.min(V/j,de/k),me=j*he,ge=k*he,Te=(V-me)/2,Se=(de-ge)/2,le={width:me,height:ge,x:Te,y:Se},be=p.current;return be&&be.width===le.width&&be.height===le.height&&be.x===le.x&&be.y===le.y?be:(p.current=le,_(le),le)},[e,_]),ae=l.useCallback(()=>{w.current&&Y(d.current,null,w.current)},[Y]),Q=l.useCallback(()=>{O()},[O]),E=l.useCallback(()=>{const i=d.current,q=s.current;if(!i||!q)return;ae();const U=p.current??{x:0,y:0,width:q.clientWidth,height:q.clientHeight},j=Math.max(1,Math.round(U.width)),k=Math.max(1,Math.round(U.height)),I=H.current,V=w.current?gt(w.current):null,{width:de,height:Be}=Ft(I,V?.width,V?.height,j,k),he=Math.max(1,Math.round(j*Math.max(1,o))),me=Math.max(1,Math.round(k*Math.max(1,o))),ge=Math.max(1,Math.round(Math.max(1,de)*Math.max(1,o))),Te=Math.max(1,Math.round(Math.max(1,Be)*Math.max(1,o))),Se=bt(I),le=I.isFilterEnabled&&Se?Math.max(he,ge):he,be=I.isFilterEnabled&&Se?Math.max(me,Te):me;i.canvas.width!==le&&(i.canvas.width=le),i.canvas.height!==be&&(i.canvas.height=be),i.canvas.style.position="absolute",i.canvas.style.left=`${Math.round(U.x)}px`,i.canvas.style.top=`${Math.round(U.y)}px`,i.canvas.style.width=`${j}px`,i.canvas.style.height=`${k}px`,i.canvas.style.imageRendering="pixelated",O()},[ae,O,o]),ve=l.useCallback(()=>{f.current!==null&&(window.cancelAnimationFrame(f.current),f.current=null),$.current!==null&&(window.clearTimeout($.current),$.current=null),f.current=window.requestAnimationFrame(()=>{f.current=null,E()}),$.current=window.setTimeout(()=>{$.current=null,E()},120)},[E]),ue=l.useCallback(async()=>{if(!d.current){if(W.current){await W.current;return}W.current=(async()=>{const i=s.current;if(!i||d.current)return;const q=typeof performance<"u"?performance.now():Date.now();u("startup:initPixi:start",{hostConnected:i.isConnected,hostWidth:i.clientWidth??null,hostHeight:i.clientHeight??null,resolution:o});const U=document.createElement("canvas");U.style.display="block",U.style.width="100%",U.style.height="100%",U.style.imageRendering="pixelated",U.style.background="#020617";const j=U.getContext("webgl2");if(!j)throw new Error("WebGL2 is not available in this app view.");u("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-q)*10)/10});const k={canvas:U,pipeline:new Tn(j),ticker:{start:z,stop:v}},I=s.current;if(!I||I!==i||!I.isConnected)return;I.style.position="relative",I.appendChild(U),d.current=k,D.current={},ne(!0),u("initWebGL:ready",{hostWidth:I.clientWidth??null,hostHeight:I.clientHeight??null,resolution:o}),u("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-q)*10)/10}),E();const V=c.current==="video"||c.current==="capture"||c.current==="image"||n.current;r&&V&&z(),u("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-q)*10)/10,shouldAnimateOnInit:V})})();try{await W.current}finally{W.current=null}}},[u,r,E,o,z,v]),h=l.useCallback(()=>{W.current=null,v(),f.current!==null&&(window.cancelAnimationFrame(f.current),f.current=null),$.current!==null&&(window.clearTimeout($.current),$.current=null);const i=d.current;i&&(i.pipeline.dispose(),i.canvas.remove()),d.current=null,D.current=null,_(null),ne(!1)},[v,_]);return l.useEffect(()=>{const i=s.current;if(!i)return;if(typeof ResizeObserver<"u"){const U=new ResizeObserver(()=>{ve()});return U.observe(i),()=>{U.disconnect()}}const q=()=>{ve()};return window.addEventListener("resize",q),()=>{window.removeEventListener("resize",q)}},[ve]),{canvasHostRef:s,appRef:d,spriteRef:T,textureRef:P,previewElementRef:w,filterRef:D,isRendererReady:ce,viewportRect:R,setViewportRect:_,applyFilterState:M,createVideoTexture:i=>null,destroyPixi:h,fitCurrentSprite:ae,fitSprite:Y,initPixi:ue,refreshLayout:E,resetFilterInstance:re,safeRender:Q,scheduleRefreshLayout:ve,syncSpriteFilter:x,syncTexturePresentation:C}}const Mn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function Ln({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:c,streamRef:u,streamOwnedRef:s,previewRequestIdRef:d,isPlayingRef:T,previewKindRef:P,audioContextRef:w,mediaSourceRef:D,masterGainRef:W,noiseGainRef:A,isMutedRef:K,volumeRef:H,playbackRateRef:X,isLoopingRef:Z,isAudioFxEnabled:f,lofiAmount:$,bitCrushAmount:p,sampleRateReductionAmount:ce,bassAmount:ne,midAmount:R,trebleAmount:oe,stereoWidthAmount:_,smallSpeakerRoomAmount:O,isMuted:v,volume:z,previewKind:M,setPreviewName:x,setPreviewError:C,setNeedsUserPlay:re,setIsPlaying:Y,setCurrentTime:ae,setDuration:Q,setPlaybackRate:E,setIsLooping:ve,setSourceDimensions:ue,setViewportRect:h,setPreviewKindState:i,setIsPoweredOn:q,beginLoading:U,finishLoading:j,ensureAudioContext:k,updateAudioNodes:I,connectMediaAudio:V,fitSprite:de,refreshLayout:Be,scheduleRefreshLayout:he,safeRender:me,resetFilterInstance:ge,initPixi:Te,resetPerfAccumulators:Se,debugVideo:le,debugAudio:be}){const Ee=async()=>{Mn()&&await new Promise(a=>{window.setTimeout(a,220)})},xe=()=>{const a=w.current?.currentTime;if(A.current)if(typeof a=="number"){const y=A.current.gain;y.cancelScheduledValues(a),y.setValueAtTime(y.value,a),y.linearRampToValueAtTime(0,a+.03)}else A.current.gain.value=0;if(W.current)if(typeof a=="number"){const y=W.current.gain;y.cancelScheduledValues(a),y.setValueAtTime(y.value,a),y.linearRampToValueAtTime(0,a+.03)}else W.current.gain.value=0},Fe=()=>{A.current&&(A.current.gain.value=0)},ye=a=>a instanceof DOMException&&(a.name==="NotAllowedError"||a.name==="AbortError")?!0:a instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(a.message):!1,Ue=a=>ye(a)?(j(),C(""),re(!0),pe(),me(),!0):!1,Ae=(a,y,G=!0)=>{xe(),a.muted=!0,a.volume=0,a.pause(),a.srcObject instanceof MediaStream&&(G&&a.srcObject.getTracks().forEach(ie=>ie.stop()),a.srcObject=null),a.src="",a.load(),y?.startsWith("blob:")&&URL.revokeObjectURL(y)},L=a=>new Promise((y,G)=>{const ie=ee=>ee?ee.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ee.code===MediaError.MEDIA_ERR_NETWORK?"network":ee.code===MediaError.MEDIA_ERR_DECODE?"decode":ee.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ee.code}`:"unknown",F=()=>{a.removeEventListener("loadeddata",S),a.removeEventListener("canplay",S),a.removeEventListener("error",we)},S=()=>{F(),y()},we=()=>{F(),G(new Error(`動画の読み込みに失敗しました。 src=${a.currentSrc||a.src||"(empty)"} reason=${ie(a.error)}`))};if(a.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){y();return}a.addEventListener("loadeddata",S,{once:!0}),a.addEventListener("canplay",S,{once:!0}),a.addEventListener("error",we,{once:!0}),a.load()}),je=a=>new Promise((y,G)=>{const ie=ee=>ee?ee.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ee.code===MediaError.MEDIA_ERR_NETWORK?"network":ee.code===MediaError.MEDIA_ERR_DECODE?"decode":ee.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ee.code}`:"unknown",F=()=>{a.removeEventListener("loadedmetadata",S),a.removeEventListener("canplay",S),a.removeEventListener("error",we)},S=()=>{F(),y()},we=()=>{F(),G(new Error(`音声の読み込みに失敗しました。 src=${a.currentSrc||a.src||"(empty)"} reason=${ie(a.error)}`))};if(a.readyState>=HTMLMediaElement.HAVE_METADATA){y();return}a.addEventListener("loadedmetadata",S,{once:!0}),a.addEventListener("canplay",S,{once:!0}),a.addEventListener("error",we,{once:!0}),a.load()}),Ye=a=>new Promise((y,G)=>{const ie=()=>{a.removeEventListener("load",F),a.removeEventListener("error",S)},F=()=>{ie(),y()},S=()=>{ie(),G(new Error("画像の読み込みに失敗しました。"))};if(a.complete&&a.naturalWidth>0&&a.naturalHeight>0){y();return}a.addEventListener("load",F,{once:!0}),a.addEventListener("error",S,{once:!0})}),Ie=a=>{a.addEventListener("play",pe),a.addEventListener("pause",pe),a.addEventListener("pause",xe),a.addEventListener("abort",xe),a.addEventListener("emptied",xe),a.addEventListener("loadstart",xe),a.addEventListener("seeking",xe),a.addEventListener("stalled",xe),a.addEventListener("suspend",xe),a.addEventListener("waiting",xe),a.addEventListener("volumechange",pe),a.addEventListener("timeupdate",pe),a.addEventListener("durationchange",pe),a.addEventListener("seeked",pe),a.addEventListener("ended",pe),a.addEventListener("ratechange",pe),a instanceof HTMLVideoElement&&a.addEventListener("resize",()=>{const y=a.videoWidth,G=a.videoHeight;y>0&&G>0&&(ue({width:y,height:G}),he())})},Me=a=>{a.loop=Z.current,a.muted=K.current,a.volume=K.current?0:H.current,a.playbackRate=X.current,a.autoplay=!1,a.preload="auto",a.crossOrigin="anonymous",a instanceof HTMLVideoElement&&(a.playsInline=!0)},pe=()=>{if(!n.current){le("syncVideoState:no-media",{previewKind:P.current,hasPreviewElement:!!r.current}),T.current=!1,Y(!1),ae(0),Q(0),I(),me();return}T.current=!n.current.paused,Y(!n.current.paused),n.current.paused||j(),ae(n.current.currentTime),Q(n.current.duration||0),E(n.current.playbackRate||1),ve(n.current.loop),I(),me()},Ce=()=>{le("cleanupPreview:start",{previewKind:P.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),xe(),d.current+=1,j();const a=n.current,y=u.current,G=s.current;e.current=null,o.current=null,n.current=null,r.current=null,u.current=null,s.current=!1,D.current?.disconnect(),D.current=null,re(!1),T.current=!1,Y(!1),ae(0),Q(0),i(null),ue(null),h(null),c.current?.startsWith("blob:")&&URL.revokeObjectURL(c.current),c.current=null,a?Ae(a,void 0,G):G&&y?.getTracks().forEach(ie=>ie.stop()),me()},$e=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),xe(),Ce(),w.current?.state==="running"&&w.current.suspend()},De=()=>{q(!0),t.current?.ticker.start();try{Se?.()}catch{}},He=async()=>{if(n.current)try{await k(),n.current.muted=K.current,n.current.volume=K.current?0:H.current,await n.current.play(),T.current=!0,Y(!0),C(""),re(!1),be("playVideoWithAudio",{audioContextState:w.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:f,lofiAmount:$,bitCrushAmount:p,sampleRateReductionAmount:ce,bassAmount:ne,midAmount:R,trebleAmount:oe,stereoWidthAmount:_,smallSpeakerRoomAmount:O,isMuted:v,volume:z}),I(),pe(),me(),he(),window.requestAnimationFrame(I)}catch(a){if(j(),ye(a)){re(!0),C("");return}re(!1),C(a instanceof Error?a.message:"音声付き再生を開始できませんでした。")}},Re=async()=>{if(await Te(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Ne=async(a,y)=>{const G=await Re();r.current=a,de(G,null,a),i(y),ue(a instanceof HTMLVideoElement?{width:a.videoWidth,height:a.videoHeight}:{width:a.naturalWidth,height:a.naturalHeight}),me(),Be(),he(),t.current?.ticker.start()},Ge=async a=>{const y=a.type.startsWith("video/"),G=a.type.startsWith("audio/"),ie=a.type.startsWith("image/");if(!y&&!G&&!ie){C("動画、音声、または画像ファイルを選んでください。");return}De(),Ce(),ge();const F=d.current;C(""),x(a.name),U(y?"Loading video preview...":G?"Loading audio preview...":"Loading image preview...");let S=null;try{if(await Re(),S=URL.createObjectURL(a),c.current=S,y||G){const ee=y?document.createElement("video"):document.createElement("audio");if(ee.src=S,Me(ee),Ie(ee),ee instanceof HTMLVideoElement?await L(ee):await je(ee),F!==d.current){Ae(ee,S);return}n.current=ee,ee instanceof HTMLVideoElement?await Ne(ee,"video"):(r.current=null,i("audio"),ue(null),h(null),me()),await V(ee),pe(),await Ee(),await He(),F===d.current&&j();return}const we=new Image;if(we.src=S,we.crossOrigin="anonymous",await Ye(we),F!==d.current){S.startsWith("blob:")&&URL.revokeObjectURL(S);return}n.current=null,Fe(),I(),await Ne(we,"image"),pe(),F===d.current&&j()}catch(we){if(F!==d.current){S?.startsWith("blob:")&&URL.revokeObjectURL(S);return}if(ye(we)){Ue(we);return}Ce(),C(we instanceof Error?we.message:"動画プレビューに失敗しました。"),re(!1)}},Ze=async()=>{if(De(),!navigator.mediaDevices?.getDisplayMedia){C("このブラウザでは画面キャプチャーに対応していません。");return}Ce();const a=d.current;C(""),x("Display Capture"),U("Preparing display capture...");try{await Re();const y=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(a!==d.current){y.getTracks().forEach(ie=>ie.stop());return}const G=document.createElement("video");G.srcObject=y,Me(G),Ie(G),y.getVideoTracks()[0]?.addEventListener("ended",()=>{Xe()}),await L(G),u.current=y,s.current=!0,n.current=G,await Ne(G,"capture"),await V(G),re(!1),await Ee(),await He(),a===d.current&&j()}catch(y){if(a!==d.current||Ue(y))return;Ce(),C(y instanceof Error?y.message:"画面キャプチャーを開始できませんでした。")}},Xe=()=>{M==="capture"&&(Ce(),x(""),C(""))};return{cleanupPreview:Ce,cleanupForPageLeave:$e,playVideoWithAudio:He,previewFile:Ge,previewStream:async(a,y="video",G="Media Stream")=>{let ie=0;try{if(De(),Ce(),ge(),ie=d.current,C(""),x(G),U(y==="video"?"Loading stream preview...":"Loading stream audio..."),await Re(),y==="video"){const F=document.createElement("video");if(F.srcObject=a,Me(F),Ie(F),await L(F),ie!==d.current){Ae(F,void 0,!1);return}u.current=a,s.current=!1,n.current=F,await Ne(F,"capture"),await V(F)}else{const F=document.createElement("audio");if(F.srcObject=a,Me(F),Ie(F),await je(F),ie!==d.current){Ae(F,void 0,!1);return}u.current=a,s.current=!1,n.current=F,r.current=null,i("audio"),ue(null),h(null),me(),await V(F),pe()}if(ie!==d.current)return;await Ee(),await He(),ie===d.current&&j()}catch(F){if(ie!==d.current||Ue(F))return;Ce(),C(F instanceof Error?F.message:String(F))}},previewUrl:async(a,y="video")=>{let G=0;const ie=typeof performance<"u"?performance.now():Date.now(),F=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-ie)*10)/10;try{if(le("startup:previewUrl:start",{url:a,kind:y}),De(),Ce(),ge(),G=d.current,C(""),x(a),U(y==="video"?"Loading video preview...":y==="image"?"Loading image preview...":"Loading audio preview..."),await Re(),le("startup:previewUrl:renderer-ready",{kind:y,elapsedMs:F()}),y==="video"){const S=document.createElement("video");if(S.src=a,Me(S),Ie(S),await L(S),le("startup:previewUrl:video-ready",{elapsedMs:F(),readyState:S.readyState,videoWidth:S.videoWidth,videoHeight:S.videoHeight}),G!==d.current){Ae(S,a);return}n.current=S,await Ne(S,"video"),await V(S),pe()}else if(y==="image"){const S=new Image;if(S.src=a,S.crossOrigin="anonymous",await Ye(S),le("startup:previewUrl:image-ready",{elapsedMs:F(),naturalWidth:S.naturalWidth,naturalHeight:S.naturalHeight}),G!==d.current)return;n.current=null,Fe(),I(),await Ne(S,"image"),pe()}else{const S=document.createElement("audio");if(S.src=a,Me(S),Ie(S),await je(S),le("startup:previewUrl:audio-ready",{elapsedMs:F(),readyState:S.readyState,duration:S.duration}),G!==d.current){Ae(S,a);return}r.current=null,i("audio"),ue(null),h(null),n.current=S,me(),await V(S),pe()}if(G!==d.current)return;(y==="video"||y==="audio")&&(await Ee(),await He()),G===d.current&&(j(),le("startup:previewUrl:done",{kind:y,elapsedMs:F()}))}catch(S){if(le("startup:previewUrl:error",{kind:y,elapsedMs:F(),error:S instanceof Error?S.message:String(S)}),G!==d.current||Ue(S))return;Ce(),C(S instanceof Error?S.message:String(S))}},startDisplayCapture:Ze,stopDisplayCapture:Xe,syncVideoState:pe,releaseDetachedMedia:Ae,ensurePixiReady:Re}}let Pn=0;const $t=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),Qt=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Bn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function En(t,e,o=1){const r=l.useRef(`player-${Pn+=1}`),n=l.useRef(null),c=l.useRef(null),u=l.useRef(!1),s=l.useRef(null),d=l.useRef(null),T=l.useRef([]),P=l.useRef(null),w=l.useRef(null),D=l.useRef(null),W=l.useRef(null),A=l.useRef(null),K=l.useRef(0),H=l.useRef(!1),X=l.useRef(null),Z=l.useRef(!1),[f,$]=l.useState(""),[p,ce]=l.useState(""),[ne,R]=l.useState(!0),[oe,_]=l.useState(""),[O,v]=l.useState(!1),[z,M]=l.useState(!1),[x,C]=l.useState(!1),[re,Y]=l.useState(0),[ae,Q]=l.useState(0),[E,ve]=l.useState(null),[ue,h]=l.useState(null),[i,q]=l.useState(!1),[U,j]=l.useState(null),k=(b,B)=>{if(!Bn())return;const te=B?` ${JSON.stringify(B)}`:"";console.log(`[retro-player video][${r.current}] ${b}${te}`)},I=Dn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:ne,isPlayingRef:H,previewKindRef:X,debugVideo:k}),{canvasHostRef:V,appRef:de,spriteRef:Be,textureRef:he,previewElementRef:me,filterRef:ge,isRendererReady:Te,viewportRect:Se,setViewportRect:le,applyFilterState:be,destroyPixi:Ee,fitSprite:xe,initPixi:Fe,refreshLayout:ye,resetFilterInstance:Ue,safeRender:Ae,scheduleRefreshLayout:L,syncSpriteFilter:je,syncTexturePresentation:Ye}=I,Ie=l.useRef(Fe),Me=l.useRef(Ee),pe=l.useRef(()=>{}),Ce=l.useRef(()=>{}),$e=pn({instanceLabel:r.current,previewKind:E,previewKindRef:X,mediaRef:s,isPlaying:x,isPlayingRef:H}),{audioContextRef:De,mediaSourceRef:He,masterGainRef:Re,recordingDestinationRef:Ne,noiseGainRef:Ge,isMutedRef:Ze,volumeRef:Xe,playbackRateRef:Qe,isLoopingRef:Ke,isMuted:a,setIsMuted:y,playbackRate:G,setPlaybackRate:ie,volume:F,setVolume:S,isLooping:we,setIsLooping:ee,isAudioFxEnabled:rt,setIsAudioFxEnabled:xt,lofiAmount:it,setLofiAmount:wt,radioToneAmount:At,setRadioToneAmount:Ct,bitCrushAmount:st,setBitCrushAmount:St,sampleRateReductionAmount:at,setSampleRateReductionAmount:yt,bassAmount:ze,setBassAmount:lt,midAmount:ct,setMidAmount:qe,trebleAmount:ut,setTrebleAmount:Rt,stereoWidthAmount:et,setStereoWidthAmount:Tt,smallSpeakerRoomAmount:dt,setSmallSpeakerRoomAmount:Dt,wowFlutterAmount:Mt,setWowFlutterAmount:Lt,isNoiseEnabled:Pt,setIsNoiseEnabled:m,noiseLevel:We,setNoiseLevel:Ve,vinylDustAmount:so,setVinylDustAmount:ao,debugAudio:lo,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:co,reconnectCurrentMediaAudio:Wt,resetAudioSettings:uo,disposeAudioEngine:Ut}=$e;l.useEffect(()=>{Ie.current=Fe,Me.current=Ee},[Fe,Ee]);const ho=b=>{X.current=b,ve(b)},mo=b=>{_(b),v(!0)},Je=()=>{v(!1),_("")},Ht=()=>{R(!0),de.current?.ticker.start()},go=()=>{s.current&&s.current.pause(),Ge.current&&(Ge.current.gain.value=0),Re.current&&(Re.current.gain.value=0),Je(),M(!1),R(!1),de.current?.ticker.stop(),Oe()},po=Ln({filterState:t,appRef:de,spriteRef:Be,textureRef:he,previewElementRef:me,filterRef:ge,mediaRef:s,objectUrlRef:n,streamRef:c,streamOwnedRef:u,previewRequestIdRef:K,isPlayingRef:H,previewKindRef:X,audioContextRef:De,mediaSourceRef:He,masterGainRef:Re,noiseGainRef:Ge,isMutedRef:Ze,volumeRef:Xe,playbackRateRef:Qe,isLoopingRef:Ke,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:st,sampleRateReductionAmount:at,bassAmount:ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,isMuted:a,volume:F,previewKind:E,setPreviewName:$,setPreviewError:ce,setNeedsUserPlay:M,setIsPlaying:C,setCurrentTime:Y,setDuration:Q,setPlaybackRate:ie,setIsLooping:ee,setSourceDimensions:h,setViewportRect:le,setPreviewKindState:ho,setIsPoweredOn:R,beginLoading:mo,finishLoading:Je,ensureAudioContext:ht,updateAudioNodes:tt,connectMediaAudio:co,fitSprite:xe,refreshLayout:ye,scheduleRefreshLayout:L,safeRender:Ae,resetFilterInstance:Ue,initPixi:Fe,debugVideo:k,debugAudio:lo}),{cleanupPreview:Vt,cleanupForPageLeave:fo,playVideoWithAudio:_t,previewFile:vo,previewStream:bo,previewUrl:xo,startDisplayCapture:wo,stopDisplayCapture:Ao,syncVideoState:Oe}=po;l.useEffect(()=>{pe.current=Vt},[Vt]),l.useEffect(()=>{Ce.current=Ut},[Ut]);const zt=async()=>{if(s.current){if(s.current.paused){ne||Ht(),await _t(),Oe();return}s.current.pause(),Oe()}},Co=()=>{s.current&&y(b=>{const B=!b;return Ze.current=B,window.requestAnimationFrame(tt),B})},ot=b=>{s.current&&(s.current.currentTime=b,Y(b))},So=b=>{if(!s.current)return;const B=1/30,te=Math.max(0,Math.min(s.current.currentTime+B*b,s.current.duration||s.current.currentTime+B));s.current.pause(),s.current.currentTime=te,Oe()},yo=b=>{s.current&&(s.current.playbackRate=b,Qe.current=b,ie(b))},Ro=b=>{s.current&&(Xe.current=b,Ze.current=b===0,S(b),y(b===0),window.requestAnimationFrame(tt))},To=()=>{s.current&&(s.current.loop=!s.current.loop,Ke.current=s.current.loop,ee(s.current.loop))},Do=b=>{Ke.current=b,ee(b),s.current&&(s.current.loop=b)},mt=()=>{if(!w.current||typeof window>"u"){D.current=null,W.current=null;return}window.URL.revokeObjectURL(w.current),w.current=null,D.current=null,W.current=null},Mo=(b,B)=>{if(typeof document>"u")return;const te=document.createElement("a");te.href=b,te.download=B,te.rel="noopener",te.style.display="none",document.body.appendChild(te),te.click(),window.setTimeout(()=>{te.remove()},0)},Lo=(b,B)=>{if(typeof window>"u"||b.length===0)return null;mt();const te=new Blob(b,{type:B||"video/webm"}),ke=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Pe=window.URL.createObjectURL(te);return w.current=Pe,D.current=te,W.current=ke,j(ke),ke},Po=()=>{const b=w.current,B=W.current;!b||!B||typeof window>"u"||(Mo(b,B),window.setTimeout(()=>{mt()},1e3),j(null))},Bo=async()=>{const b=D.current,B=W.current;if(!b||!B||typeof window>"u")return!1;if($t()){const ke=new Uint8Array(await b.arrayBuffer()),Pe=await ro("persist_recording_for_share",{data:Array.from(ke),filename:B});return await $o(Pe,{mimeType:b.type||"video/webm",title:B}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Le={files:[new File([b],B,{type:b.type||"video/webm"})],title:B};return typeof navigator.canShare=="function"&&!navigator.canShare(Le)?!1:(await navigator.share(Le),!0)},Eo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(B=>MediaRecorder.isTypeSupported(B))??"",Io=async()=>{const b=de.current?.canvas;if(!(b instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await ht();const B=new MediaStream;b.captureStream(30).getVideoTracks().forEach(Pe=>B.addTrack(Pe)),Ne.current?.stream.getAudioTracks().forEach(Pe=>B.addTrack(Pe.clone()));const Le=Eo(),ke=Le?new MediaRecorder(B,{mimeType:Le}):new MediaRecorder(B);T.current=[],mt(),j(null),P.current=B,d.current=ke,ke.addEventListener("dataavailable",Pe=>{Pe.data.size>0&&T.current.push(Pe.data)}),ke.addEventListener("stop",()=>{const Pe=Lo(T.current,ke.mimeType);T.current=[],P.current?.getTracks().forEach(ko=>ko.stop()),P.current=null,d.current=null,q(!1),A.current?.(Pe),A.current=null},{once:!0}),ke.start(),q(!0)},Ot=(b=!0)=>{const B=d.current;return B?new Promise(te=>{if(A.current=te,b||(T.current=[]),B.state!=="inactive"){B.stop();return}P.current?.getTracks().forEach(Le=>Le.stop()),P.current=null,d.current=null,q(!1),A.current?.(W.current),A.current=null}):Promise.resolve(W.current)};return l.useEffect(()=>{let b=!1;return(async()=>(k("startup:setupPixi-effect:start",{renderResolutionScale:o}),await Ie.current(),b&&Me.current()))(),()=>{mt(),Ot(!1),b=!0,Me.current()}},[o]),l.useEffect(()=>()=>{pe.current(),Ce.current()},[]),l.useEffect(()=>{const b=()=>{fo()};return window.addEventListener("beforeunload",b),()=>{window.removeEventListener("beforeunload",b)}},[]),l.useEffect(()=>{const b=()=>{s.current&&(s.current.muted=!0,s.current.volume=0,s.current.pause(),Oe())};return window.addEventListener(jt,b),()=>{window.removeEventListener(jt,b)}},[Oe]),l.useEffect(()=>{if(!Qt())return;const b=te=>te==="video"||te==="audio"||te==="capture",B=()=>{const te=s.current;if(!(!te||!b(X.current))){if(document.visibilityState==="hidden"){Z.current=!te.paused,te.pause(),H.current=!1,C(!1),Ge.current&&(Ge.current.gain.value=0),Re.current&&(Re.current.gain.value=0),De.current?.state==="running"&&De.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await ht(),Wt(),tt(),Z.current&&s.current)try{await s.current.play(),M(!1)}catch(Le){Le instanceof DOMException&&Le.name==="NotAllowedError"&&M(!0)}}finally{Oe(),Z.current=!1}})()},80)}};return document.addEventListener("visibilitychange",B),()=>{document.removeEventListener("visibilitychange",B)}},[De,ht,Re,Ge,Wt,Oe,tt]),l.useLayoutEffect(()=>{be(),je(),Ye(),ye()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,ye]),l.useEffect(()=>{if(p||z){Je();return}if(E==="image"||E==="audio"){Je();return}x&&Je()},[p,z,E,x]),l.useEffect(()=>{H.current=x;const b=(E==="video"||E==="capture")&&s.current?.tagName==="VIDEO",B=!s.current||Math.abs(s.current.currentTime)<.05,te=s.current?.ended??!1;b&&Je(),b&&!x&&!p&&!te&&(De.current?.state==="suspended"||B)&&M(!0)},[De,x,p,E]),l.useEffect(()=>{const b=B=>{if(!s.current)return;const te=B.target;if(!(te instanceof HTMLInputElement||te instanceof HTMLTextAreaElement||te?.isContentEditable)){if(B.code==="Space"||B.code==="KeyK"){B.preventDefault(),zt();return}if(B.code==="KeyJ"){B.preventDefault(),ot(Math.max(s.current.currentTime-10,0));return}if(B.code==="KeyL"){B.preventDefault(),ot(Math.min(s.current.currentTime+10,s.current.duration||s.current.currentTime+10));return}if(B.code==="ArrowLeft"){B.preventDefault(),ot(Math.max(s.current.currentTime-5,0));return}B.code==="ArrowRight"&&(B.preventDefault(),ot(Math.min(s.current.currentTime+5,s.current.duration||s.current.currentTime+5)))}};return window.addEventListener("keydown",b),()=>{window.removeEventListener("keydown",b)}},[]),{canvasHostRef:V,previewName:f,previewError:p,isRendererReady:Te,loadingLabel:oe,isLoading:O,needsUserPlay:z,isPlaying:x,isMuted:a,currentTime:re,duration:ae,playbackRate:G,volume:F,isLooping:we,sourceDimensions:ue,viewportRect:Se,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:At,bitCrushAmount:st,sampleRateReductionAmount:at,bassAmount:ze,midAmount:ct,trebleAmount:ut,stereoWidthAmount:et,smallSpeakerRoomAmount:dt,wowFlutterAmount:Mt,isNoiseEnabled:Pt,noiseLevel:We,vinylDustAmount:so,hasPlayableMedia:E==="video"||E==="audio"||E==="capture",hasVideo:E==="video"||E==="capture",hasAudioOnly:E==="audio",hasImage:E==="image",isRecording:i,pendingRecordingFilename:U,prefersShareExport:$t()&&Qt(),isCaptureActive:E==="capture",canRecord:E==="video"||E==="capture"||E==="image"||E==="audio",previewFile:vo,previewStream:bo,previewUrl:xo,startDisplayCapture:wo,stopDisplayCapture:Ao,togglePlayback:zt,toggleMute:Co,seekTo:ot,stepFrame:So,changePlaybackRate:yo,changeVolume:Ro,toggleLoop:To,setLoopingEnabled:Do,resetAudioSettings:uo,playVideoWithAudio:_t,isPoweredOn:ne,powerOn:Ht,powerOff:go,downloadPendingRecording:Po,sharePendingRecording:Bo,startRecording:Io,stopRecording:Ot,refreshLayout:ye,toggleAudioFx:()=>{xt(b=>!b)},setLofiAmount:wt,setRadioToneAmount:Ct,setBitCrushAmount:St,setSampleRateReductionAmount:yt,setBassAmount:lt,setMidAmount:qe,setTrebleAmount:Rt,setStereoWidthAmount:Tt,setSmallSpeakerRoomAmount:Dt,setWowFlutterAmount:Lt,toggleNoise:()=>{m(b=>!b)},setNoiseLevel:Ve,setVinylDustAmount:ao}}const se=nt.pc98_512,eo=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,It=t=>{for(const[e,o]of Object.entries(nt))if(eo(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(nt))if(eo(t,o,{ignoreDimensions:!0}))return e;return null},In=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function kn(t={}){const[e]=l.useState(()=>({targetWidth:t.targetWidth??se.width,targetHeight:t.targetHeight??se.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??se.colors,ditherStrength:t.ditherStrength??se.dither,paletteMode:t.paletteMode??se.palette,curvature:t.curvature??se.curvature,scanlineStrength:t.scanlineStrength??se.scanline,scanline2Strength:t.scanline2Strength??se.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??se.vignette,glowStrength:t.glowStrength??se.glow,smoothStrength:t.smoothStrength??se.smoothStrength??0,toonSteps:t.toonSteps??se.toonSteps??0,edgeBoost:t.edgeBoost??se.edgeBoost??0,phosphorStrength:t.phosphorStrength??se.phosphor,spotMaskStrength:t.spotMaskStrength??se.spotMask,bulbRadius:t.bulbRadius??se.bulbRadius,blackFloor:t.blackFloor??se.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??se.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??se.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??se.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??se.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??se.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??se.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??se.monoTint,neonBoost:t.neonBoost??se.neonBoost,neonSaturation:t.neonSaturation??se.neonSaturation,neonDetail:t.neonDetail??se.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=l.useState(()=>({...e,...vt()?.filter,...t})),[r,n]=l.useState(o),[c,u]=l.useState(It(o)),s=h=>{u(null),n(i=>i.targetWidth===h?i:{...i,targetWidth:h})},d=h=>{u(null),n(i=>i.targetHeight===h?i:{...i,targetHeight:h})},T=h=>{u(null),n(i=>i.matchTargetAspect===h?i:{...i,matchTargetAspect:h})},P=h=>{u(null),n(i=>({...i,colorLevels:h}))},w=h=>{u(null),n(i=>({...i,ditherStrength:h}))},D=h=>{u(null),n(i=>({...i,paletteMode:h,colorLevels:In(h,i.colorLevels)}))},W=h=>{u(null),n(i=>({...i,curvature:h}))},A=h=>{u(null),n(i=>({...i,scanlineStrength:h}))},K=h=>{u(null),n(i=>({...i,scanline2Strength:h}))},H=h=>{u(null),n(i=>({...i,scanlineBrightnessFade:h}))},X=h=>{u(null),n(i=>({...i,vignetteStrength:h}))},Z=h=>{u(null),n(i=>({...i,glowStrength:h}))},f=h=>{u(null),n(i=>({...i,smoothStrength:h}))},$=h=>{u(null),n(i=>({...i,toonSteps:h}))},p=h=>{u(null),n(i=>({...i,edgeBoost:h}))},ce=h=>{u(null),n(i=>({...i,phosphorStrength:h}))},ne=h=>{u(null),n(i=>({...i,spotMaskStrength:h}))},R=h=>{u(null),n(i=>({...i,bulbRadius:h}))},oe=h=>{u(null),n(i=>({...i,blackFloor:h}))},_=h=>{u(null),n(i=>({...i,phosphorDotLightBalance:h}))},O=h=>{u(null),n(i=>({...i,phosphorDotInternalScale:h}))},v=h=>{u(null),n(i=>({...i,phosphorDotBrightCore:h}))},z=h=>{u(null),n(i=>({...i,phosphorDotCellFill:h}))},M=h=>{u(null),n(i=>({...i,phosphorDotFlatDisc:h}))},x=h=>{u(null),n(i=>({...i,phosphorDotNeighborBlend:h}))},C=h=>{u(null),n(i=>({...i,closeUpNoiseStrength:h}))},re=h=>{u(null),n(i=>({...i,monoTint:h}))},Y=h=>{u(null),n(i=>({...i,neonBoost:h}))},ae=h=>{u(null),n(i=>({...i,neonSaturation:h}))},Q=h=>{u(null),n(i=>({...i,neonDetail:h}))},E=h=>{n(i=>({...i,isFilterEnabled:h}))},ve=h=>{const i=nt[h];u(h),n(q=>({...q,targetWidth:i.width,targetHeight:i.height,colorLevels:i.colors,ditherStrength:i.dither,paletteMode:i.palette,curvature:i.curvature,scanlineStrength:i.scanline,scanline2Strength:i.scanline2,vignetteStrength:i.vignette,glowStrength:i.glow,smoothStrength:i.smoothStrength??0,toonSteps:i.toonSteps??0,edgeBoost:i.edgeBoost??0,phosphorStrength:i.phosphor,spotMaskStrength:i.spotMask,bulbRadius:i.bulbRadius,blackFloor:i.blackFloor,phosphorDotLightBalance:i.phosphorDotLightBalance??1,phosphorDotInternalScale:i.phosphorDotInternalScale??!1,phosphorDotBrightCore:i.phosphorDotBrightCore??!1,phosphorDotCellFill:i.phosphorDotCellFill??0,phosphorDotFlatDisc:i.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:i.phosphorDotNeighborBlend??!1,monoTint:i.monoTint,neonBoost:i.neonBoost,neonSaturation:i.neonSaturation,neonDetail:i.neonDetail,isFilterEnabled:!0}))},ue=()=>{u(It(e)),n(e)};return l.useEffect(()=>{Qo(r)},[r]),l.useEffect(()=>{const h=It(r);u(i=>i===h?i:h)},[r]),{...r,selectedPreset:c,setTargetWidth:s,setTargetHeight:d,setMatchTargetAspect:T,setColorLevels:P,setDitherStrength:w,setPaletteMode:D,setCurvature:W,setScanlineStrength:A,setScanline2Strength:K,setScanlineBrightnessFade:H,setVignetteStrength:X,setGlowStrength:Z,setSmoothStrength:f,setToonSteps:$,setEdgeBoost:p,setPhosphorStrength:ce,setSpotMaskStrength:ne,setBulbRadius:R,setBlackFloor:oe,setPhosphorDotLightBalance:_,setPhosphorDotInternalScale:O,setPhosphorDotBrightCore:v,setPhosphorDotCellFill:z,setPhosphorDotFlatDisc:M,setPhosphorDotNeighborBlend:x,setCloseUpNoiseStrength:C,setMonoTint:re,setNeonBoost:Y,setNeonSaturation:ae,setNeonDetail:Q,setIsFilterEnabled:E,applyPreset:ve,resetSettings:ue}}function Fn({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:c,controlPanelMode:u,confirmDialog:s,onHighResolutionChange:d,onFitWidthChange:T,onRefit:P,onError:w}){const D=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},W=N.useMemo(()=>vt()?.ui,[]),[A,K]=N.useState(W?.isPreviewMaximized??!1),[H,X]=N.useState(!1),[Z,f]=N.useState(!1),[$,p]=N.useState(0),[ce,ne]=N.useState(null),[R,oe]=N.useState(null),_=N.useRef(null),O=N.useRef(null),v=N.useRef(null),z=N.useRef(null),M=N.useCallback(()=>{const k=_.current,I=v.current;if(!k||!I)return null;const V=k.getBoundingClientRect(),de=I.getBoundingClientRect();return{left:V.left,width:V.width,height:de.height}},[]),x=N.useCallback(k=>{z.current!==null&&window.clearTimeout(z.current),z.current=window.setTimeout(()=>{ne(k),z.current=null},120)},[]),C=N.useCallback(()=>{z.current!==null&&(window.clearTimeout(z.current),z.current=null),ne(null)},[]);N.useEffect(()=>{tn({isPreviewMaximized:A,isHighResolution:n})},[n,A]),N.useEffect(()=>()=>{z.current!==null&&window.clearTimeout(z.current)},[]),N.useEffect(()=>{if(!A)return;const k=document.body.style.overflow,I=V=>{V.code==="Escape"&&K(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",I),()=>{document.body.style.overflow=k,window.removeEventListener("keydown",I)}},[A]),N.useEffect(()=>{A&&(X(!1),f(!1),p(0),oe(null))},[A]),N.useEffect(()=>{c&&(X(!1),f(!1),p(0),oe(null))},[c]),N.useEffect(()=>{if(u!=="video-settings"||A||H||c){f(!1),p(0);return}const k=()=>{const I=O.current,V=v.current;if(!I||!V)return;const de=I.getBoundingClientRect().top,Be=V.getBoundingClientRect().height,he=Math.round(Math.min(Be,window.innerHeight)*.4),me=-Math.max(120,he);f(ge=>{if(!ge&&de<=me){p(Math.max(120,he));const Te=M();return Te&&oe(Te),!0}return ge&&p(Math.max(120,he)),ge&&de>=-24?(p(0),!1):ge})};return k(),window.addEventListener("scroll",k,{passive:!0}),window.addEventListener("resize",k),()=>{window.removeEventListener("scroll",k),window.removeEventListener("resize",k)}},[u,c,A,H,M]),N.useEffect(()=>{if(!((H||Z)&&!A)){oe(null);return}const I=()=>{const V=M();V&&oe(V)};return I(),window.addEventListener("resize",I),window.addEventListener("scroll",I,{passive:!0}),()=>{window.removeEventListener("resize",I),window.removeEventListener("scroll",I)}},[Z,A,H,c,M,r.sourceDimensions]),N.useEffect(()=>{r.refreshLayout()},[H,A,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const re=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),Y=!A&&!c&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,ae=Y?`${Y}px`:"60vh",Q=N.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),E=(H||Z)&&!A,ve=Z?`calc(max(0.0rem, env(safe-area-inset-top)) - ${$}px)`:void 0,ue="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",h="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",i="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",q="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",U=(k,I,V="w-44")=>g.jsx("div",{role:"tooltip","aria-hidden":ce!==k,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",V,ce===k?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:I}),j=()=>g.jsxs(g.Fragment,{children:[r.canRecord&&g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{C(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording()||!await s({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"}))return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(k){w?.(k instanceof Error?k:new Error(String(k)))}return}try{await r.startRecording()}catch(k){w?.(k instanceof Error?k:new Error(String(k)))}})()},onMouseEnter:()=>x("record"),onMouseLeave:C,onFocus:()=>x("record"),onBlur:C,className:[q,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?g.jsx(Jo,{size:14,className:"fill-current animate-pulse"}):g.jsx(Ho,{size:16,className:"text-rose-300"})}),U("record",r.isRecording?D.recordStop:D.recordIdle)]}),g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(C(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>x("power"),onMouseLeave:C,onFocus:()=>x("power"),onBlur:C,className:[ue,r.isPoweredOn?h:i].join(" "),children:g.jsx(Xo,{size:16})}),U("power",r.isPoweredOn?D.powerOff:D.powerOn)]}),g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{C(),d(!n)},onMouseEnter:()=>x("hi-res"),onMouseLeave:C,onFocus:()=>x("hi-res"),onBlur:C,className:[ue,n?h:i].join(" "),children:g.jsx(No,{size:16})}),U("hi-res",D.hiRes)]}),g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":c?"Disable fit width":"Enable fit width",onClick:()=>{C(),T(!c)},onMouseEnter:()=>x("fit-width"),onMouseLeave:C,onFocus:()=>x("fit-width"),onBlur:C,className:[ue,c?h:i].join(" "),children:g.jsx(Wo,{size:16})}),U("fit-width",c?D.fitWidthOn:D.fitWidthOff)]}),g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{C(),P()},onMouseEnter:()=>x("refit"),onMouseLeave:C,onFocus:()=>x("refit"),onBlur:C,className:[ue,i].join(" "),children:g.jsx(Ko,{size:16})}),U("refit",D.refit)]}),g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":E?"Unpin preview":"Pin preview",onClick:()=>{C(),!(A||c)&&X(k=>{if(!k){const V=M();return V&&oe(V),!0}return f(!1),p(0),oe(null),!1})},onMouseEnter:()=>x("pin"),onMouseLeave:C,onFocus:()=>x("pin"),onBlur:C,className:[ue,A||c?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":E?h:i].join(" "),disabled:A||c,children:g.jsx(jo,{size:16})}),U("pin",A?D.pinUnavailable:c?D.pinUnavailableFitWidth:E?D.pinOn:D.pinOff)]}),g.jsxs("div",{className:"relative",children:[g.jsx("button",{type:"button","aria-label":A?"Exit maximize":"Maximize preview",onClick:()=>{C(),K(k=>!k)},onMouseEnter:()=>x("maximize"),onMouseLeave:C,onFocus:()=>x("maximize"),onBlur:C,className:[ue,A?h:i].join(" "),children:A?g.jsx(Bt,{size:16}):g.jsx(_o,{size:16})}),U("maximize",A?D.maximizeOn:D.maximizeOff)]})]});return g.jsxs("div",{ref:_,className:"space-y-4",children:[g.jsx("div",{ref:O,"aria-hidden":"true"}),g.jsxs("div",{ref:v,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${A?c?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":E?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:E&&R?{left:`${R.left}px`,top:ve??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${R.width}px`}:A?void 0:{overflow:"visible"},children:[A&&(c?g.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:g.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{K(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:g.jsx(Bt,{size:18})})}):g.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{K(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:g.jsx(Bt,{size:18})})),g.jsxs("div",{className:`relative ${A?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:A?c&&Q?{aspectRatio:Q,width:"100%"}:void 0:c&&Q?{aspectRatio:Q,width:"100%"}:Q?{aspectRatio:Q,width:"100%",height:"min(60vh, calc(100vh - 12rem))",maxHeight:"calc(100vh - 12rem)",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:ae,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[g.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[re&&g.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),g.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&g.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:g.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[g.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),g.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&g.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",re?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:g.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[g.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),g.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),g.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&g.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:g.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[g.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),g.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),g.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),g.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&g.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!c&&g.jsx("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:j()})]}),c&&A&&g.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:j()})]}),c&&!A&&g.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:j()}),E&&R&&g.jsx("div",{style:{height:`${R.height}px`}})]})}const Nn=N.lazy(()=>no(()=>import("./VideoControls-TfD4XhaR.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),Gn=N.lazy(()=>no(()=>import("./RetroFilterPanel-C84LID1A.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),to=g.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function Wn({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:c,onSetTargetWidth:u,onSetTargetHeight:s,onSetMatchTargetAspect:d,onResetSettings:T}){return g.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&g.jsx(N.Suspense,{fallback:to,children:g.jsx(Nn,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:T,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&g.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&g.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[g.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:g.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),g.jsx(N.Suspense,{fallback:to,children:g.jsx(Gn,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:c,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:s,onSetTargetWidth:u,onSetMatchTargetAspect:d,onSetVignetteStrength:o.setVignetteStrength})})]})]})}const Un=async({title:t,body:e,okText:o,cancelText:r})=>{if(typeof window>"u")return!1;const n=[t,e,o||r?`${o??"OK"} / ${r??"Cancel"}`:""].filter(Boolean).join(`

`);return window.confirm(n)};function oo({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:c,className:u,onError:s,initialFilterState:d,confirmDialog:T=Un}){const P=N.useMemo(()=>vt()?.ui,[]),[w,D]=N.useState(P?.isHighResolution??!1),[W,A]=N.useState(!1),[K,H]=N.useState("playback"),X=N.useRef(""),Z=N.useRef(""),f=kn(d),$=w&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,p=En(f,W?"width":"contain",$),ce=N.useCallback(()=>{on(),f.resetSettings(),p.resetAudioSettings(),D(!1)},[f,p]),ne=N.useCallback(()=>{if(!p.sourceDimensions)return;const M=Math.max(8,Math.round(f.targetWidth/p.sourceDimensions.width*p.sourceDimensions.height/8)*8);M!==f.targetHeight&&f.setTargetHeight(M)},[f.targetHeight,f.targetWidth,f.setTargetHeight,p.sourceDimensions]),R=N.useCallback(()=>p.sourceDimensions?.width&&p.sourceDimensions?.height?p.sourceDimensions.width/p.sourceDimensions.height:Math.max(f.targetWidth,1)/Math.max(f.targetHeight,1),[f.targetHeight,f.targetWidth,p.sourceDimensions]),oe=N.useCallback(M=>{if(f.setTargetWidth(M),!f.matchTargetAspect)return;const x=Math.max(R(),1e-4);f.setTargetHeight(Math.max(1,Math.round(M/x)))},[f,R]),_=N.useCallback(M=>{if(f.setTargetHeight(M),!f.matchTargetAspect)return;const x=Math.max(R(),1e-4);f.setTargetWidth(Math.max(1,Math.round(M*x)))},[f,R]),O=N.useCallback(M=>{f.setMatchTargetAspect(M),M&&p.sourceDimensions&&ne()},[f,p.sourceDimensions,ne]),v=N.useCallback(M=>{if(f.applyPreset(M),M!=="phosphorDot"||!p.sourceDimensions)return;const x=nt.phosphorDot,C=Math.max(p.sourceDimensions.width,1),re=Math.max(p.sourceDimensions.height,1),Y=C/re,ae=x.width/x.height;let Q=x.width,E=x.height;Y>ae?E=Math.max(8,Math.round(x.width/Y/8)*8):Q=Math.max(8,Math.round(x.height*Y/8)*8),!(x.width===Q&&x.height===E)&&(f.setTargetWidth(Q),f.setTargetHeight(E))},[f.applyPreset,f.setTargetHeight,f.setTargetWidth,p.sourceDimensions]),z=N.useCallback(()=>{if(o&&p.isCaptureActive){window.setTimeout(()=>{p.previewStream(o,n==="audio"?"audio":"video",r)},120);return}window.requestAnimationFrame(()=>{p.refreshLayout(),window.requestAnimationFrame(()=>{p.refreshLayout()})})},[n,p,o,r]);return N.useEffect(()=>{f.matchTargetAspect&&p.sourceDimensions&&ne()},[f.matchTargetAspect,p.sourceDimensions,ne]),N.useEffect(()=>{if(o){const x=`stream:${o.id}:${n}:${r??""}`;if(X.current===x)return;X.current=x,(async()=>{try{await p.previewStream(o,n==="audio"?"audio":"video",r)}catch(C){s?.(C instanceof Error?C:new Error(String(C)))}})();return}if(!e){X.current="";return}const M=`src:${e}:${n}`;X.current!==M&&(X.current=M,(async()=>{try{await p.previewUrl(e,n)}catch(x){s?.(x instanceof Error?x:new Error(String(x)))}})())},[e,o,r,n,s,p]),N.useEffect(()=>{p.refreshLayout()},[W,p.refreshLayout]),N.useEffect(()=>{p.refreshLayout()},[f.targetWidth,f.targetHeight,f.isFilterEnabled,$,p.refreshLayout]),N.useEffect(()=>{if(typeof c!="boolean")return;const M=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!M){Z.current="";return}const x=`${M}:${c}`;Z.current!==x&&(Z.current=x,p.setLoopingEnabled(c))},[n,c,p,e,o]),g.jsx("section",{className:u??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:g.jsxs("div",{className:"space-y-4",children:[g.jsx(Fn,{locale:t,src:e,kind:n,player:p,isHighResolution:w,isFitWidthEnabled:W,controlPanelMode:K,confirmDialog:T,onHighResolutionChange:D,onFitWidthChange:A,onRefit:z,onError:s}),g.jsx(Wn,{locale:t,player:p,filterState:f,controlPanelMode:K,onControlPanelModeChange:H,onApplyPreset:v,onSetTargetWidth:oe,onSetTargetHeight:_,onSetMatchTargetAspect:O,onResetSettings:ce})]})})}const Vn=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:oo,default:oo},Symbol.toStringTag,{value:"Module"}));export{fn as M,rn as R,nt as a,Vn as b,Ko as c};
