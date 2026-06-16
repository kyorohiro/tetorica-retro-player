const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-Dnep4IEo.js","./index-zfE7DFmk.js","./index-CNCWBc-B.css","./RetroFilterPanel-DISpEdMr.js"])))=>i.map(i=>d[i]);
import{b as Ze,r as l,R as so,a as F,j as f,_ as wo}from"./index-zfE7DFmk.js";const Yo=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Ko=Ze("aperture",Yo);const qo=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Jo=Ze("arrow-left-right",qo);const $o=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Qo=Ze("circle",$o);const en=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],tn=Ze("maximize-2",en);const on=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Xt=Ze("minimize-2",on);const nn=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],rn=Ze("pin",nn);const an=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],sn=Ze("power",an);const ln=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],cn=Ze("rotate-ccw",ln);const un=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],dn=Ze("square",un);async function Co(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function hn(t,e){await Co("plugin:sharekit|share_file",{url:t,...e})}const $t="tetorica-retro-player.settings",pt=1,ft=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem($t);if(!t)return null;const e=JSON.parse(t);return e.version!==pt?null:e}catch{return null}},Qt=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem($t,JSON.stringify(t))}catch{}},vt=()=>ft(),mn=t=>{const e=ft();Qt({version:pt,audio:e?.audio,filter:t,ui:e?.ui})},gn=t=>{const e=ft();Qt({version:pt,audio:t,filter:e?.filter,ui:e?.ui})},pn=t=>{const e=ft();Qt({version:pt,audio:e?.audio,filter:e?.filter,ui:t})},fn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem($t)}catch{}},ue={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.8,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!1,noiseLevel:.02,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1},vn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:.18,bitCrushAmount:.22,sampleRateReductionAmount:.24,bassAmount:.08,midAmount:-.08,trebleAmount:-.18,stereoWidthAmount:-.08,smallSpeakerRoomAmount:.08,wowFlutterAmount:.12,noiseLevel:.005,vinylDustAmount:0,delayAmount:.1,reverbAmount:.1,tapeSaturationAmount:.15,compressorAmount:.25,fxOutputTrimAmount:.78}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.4,radioToneAmount:.9,bitCrushAmount:.12,sampleRateReductionAmount:.38,bassAmount:-.4,midAmount:.18,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:.08,noiseLevel:.01,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.4,fxOutputTrimAmount:.78}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.06,smallSpeakerRoomAmount:.18,wowFlutterAmount:.3,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.1,chorusAmount:.25,tapeSaturationAmount:.35,compressorAmount:.25,fxOutputTrimAmount:.78}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:.03,wowFlutterAmount:.18,noiseLevel:.0035,vinylDustAmount:.58,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.15,fxOutputTrimAmount:.82}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.32,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:.04,noiseLevel:.0025,vinylDustAmount:.08,reverbAmount:.15,tapeSaturationAmount:.15,compressorAmount:.25,fxOutputTrimAmount:.82}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.16,noiseLevel:.005,vinylDustAmount:0,delayAmount:.1,reverbAmount:.1,chorusAmount:.1,tapeSaturationAmount:.25,compressorAmount:.25,fxOutputTrimAmount:.78}}},bn=Object.fromEntries(Object.entries(vn).map(([t,e])=>[t,{label:e.label,settings:{...ue,...e.settings}}])),An=Object.fromEntries(Object.entries(bn).map(([t,e])=>[t,e.settings])),xn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function wn(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n+=1){const c=n*2/255-1;o[n]=Math.tanh(c*r)}return o}function lo(t){const o=new Float32Array(256),r=t*8;for(let n=0;n<256;n++){const c=n*2/255-1;r<.001?o[n]=c:o[n]=Math.tanh(c*(1+r))/Math.tanh(1+r)}return o}function Cn(t){const o=Math.max(1,Math.floor(t.sampleRate*2.2)),r=t.createBuffer(2,o,t.sampleRate),n=Math.floor(t.sampleRate*.012);for(let c=0;c<r.numberOfChannels;c+=1){const m=r.getChannelData(c);for(let a=0;a<o;a+=1){if(a<n)continue;const g=(a-n)/(o-n),T=(1-g)**1.8,M=Math.max(0,1-g*2.5),A=Math.sin(g*160+c*.8)*M*.35;m[a]=(Math.random()*2-1+A)*T*.75}}return r}function Sn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n+=1){const c=r.getChannelData(n);for(let m=0;m<c.length;m+=1){const a=m/c.length,g=(1-a)**1.85,T=.78+.22*Math.sin(a*42+n*.9),M=Math.sin(a*130+n*.35)*.08;c[m]=(Math.random()*2-1+M)*g*T*.28}}return r}function yn(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let c=0;c<e;c+=1){const m=Math.random()*2-1;r=(r+m*.045)/1.045,n=n*.82+m*.18;const a=r*1.35,g=(m-n)*.55,T=Math.max(-1,Math.min(1,a+g));for(let M=0;M<o.numberOfChannels;M+=1){const A=o.getChannelData(M),D=(Math.random()*2-1)*.012;A[c]=Math.max(-1,Math.min(1,T+D))}}return o}function Rn(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const m=Math.random()*2-1;n=n*.72+m*.28,o[r]+=(m-n)*.018;const a=Math.random();if(a<.0034){const g=8+Math.floor(Math.random()*42),T=.11+Math.random()*.28,M=Math.random()<.5?-1:1;for(let A=0;A<g&&r+A<e;A+=1){const D=Math.exp(-A/(2.4+Math.random()*5));o[r+A]+=M*T*D*(.7+Math.random()*.3)}r+=g+Math.floor(Math.random()*640);continue}if(a<.0038){const g=90+Math.floor(Math.random()*260),T=.055+Math.random()*.11,M=Math.random()*Math.PI*2;for(let A=0;A<g&&r+A<e;A+=1){const D=Math.exp(-A/(18+Math.random()*40)),O=Math.sin(M+A*(.22+Math.random()*.06));o[r+A]+=T*D*O}r+=g+Math.floor(Math.random()*2200);continue}r+=1}const c=t.createBuffer(2,e,t.sampleRate);for(let m=0;m<c.numberOfChannels;m+=1){const a=c.getChannelData(m);for(let g=0;g<e;g+=1){const T=(Math.random()*2-1)*.0035;a[g]=Math.max(-1,Math.min(1,o[g]+T))}}return c}function Tn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function So({preset:t,params:e}){return{...ue,...t?An[t]:null,...e}}class Dn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:c=!0,enableAudioWorklet:m=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=c,this.enableAudioWorklet=m}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){xn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...ue,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=So({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,c=this.nodes.lofiLowpass,m=this.nodes.lofiHighshelf,a=this.nodes.lofiDrive,g=this.nodes.bitcrusher,T=this.nodes.bassEq,M=this.nodes.midEq,A=this.nodes.trebleEq,D=this.nodes.stereoWidth,O=this.nodes.roomDryGain,y=this.nodes.roomWetGain,J=this.nodes.wowFlutterDelay,j=this.nodes.wowLfo,Y=this.nodes.wowLfoGain,Z=this.nodes.flutterLfo,x=this.nodes.flutterLfoGain,ee=this.nodes.noiseGain,b=this.nodes.crackleGain,fe=this.nodes.vinylDustBedFilter,ne=this.nodes.vinylDustBedGain,{settings:p,isPlaying:$,isOutputEnabled:K}=this.runtimeState,H=p.isMuted||!K?0:p.volume;if(e&&(e.gain.value=H),o&&r&&n){const v=p.isAudioFxEnabled?p.radioToneAmount:0;o.frequency.value=20+v*430,o.Q.value=.4+v*.35,r.frequency.value=2e4-v*17400,r.Q.value=.2+v*.9,n.frequency.value=1700,n.Q.value=.8+v*1.4,n.gain.value=v*6}if(c&&m&&a){const v=p.isAudioFxEnabled?p.lofiAmount:0;c.frequency.value=16e3-v*14200,c.Q.value=.3+v*1.8,m.gain.value=-v*18;try{a.curve=wn(v*.6)}catch{}}if(g){const v=p.isAudioFxEnabled,q=16-(v?p.bitCrushAmount:0)*12,h=1+(v?p.sampleRateReductionAmount:0)*23,i=v?Math.max(p.bitCrushAmount,p.sampleRateReductionAmount):0;g.parameters.get("bitDepth")?.setValueAtTime(q,g.context.currentTime),g.parameters.get("holdFrames")?.setValueAtTime(h,g.context.currentTime),g.parameters.get("mix")?.setValueAtTime(i,g.context.currentTime)}if(T&&M&&A){const v=p.isAudioFxEnabled?15:0;T.gain.value=p.bassAmount*v,M.gain.value=p.midAmount*v,A.gain.value=p.trebleAmount*v}if(D){const v=p.isAudioFxEnabled?1+p.stereoWidthAmount:1;D.parameters.get("width")?.setValueAtTime(v,D.context.currentTime)}if(O&&y){const v=p.isAudioFxEnabled?p.smallSpeakerRoomAmount:0;O.gain.value=Math.max(.52,1-v*.42),y.gain.value=v*.95}if(J&&j&&Y&&Z&&x){const v=p.isAudioFxEnabled?p.wowFlutterAmount:0;J.delayTime.value=.006+v*.004,j.frequency.value=.18+v*.42,Y.gain.value=v*.0023,Z.frequency.value=5.2+v*6.5,x.gain.value=v*6e-4}if(ee&&(ee.gain.value=p.isNoiseEnabled&&!p.isMuted&&K&&$?Math.min(.24,p.noiseLevel*5.5):0),b){const v=p.isNoiseEnabled&&!p.isMuted&&K&&$;b.gain.value=v?Math.min(.24,p.vinylDustAmount*.22+p.noiseLevel*.25):0}if(fe&&ne){const q=p.isNoiseEnabled&&!p.isMuted&&K&&$?p.vinylDustAmount:0;fe.frequency.value=2100+q*2600,fe.Q.value=.35+q*.25,ne.gain.value=q*.11}const re=this.nodes.echoDelayLine,X=this.nodes.echoFeedbackGain,I=this.nodes.echoWetGain;if(re&&X&&I){const v=p.isAudioFxEnabled?p.delayAmount:0;X.gain.value=v*.5,I.gain.value=v*.55}const w=this.nodes.hallReverbWetGain;if(w){const v=p.isAudioFxEnabled?p.reverbAmount:0;w.gain.value=v*2}const C=this.nodes.chorusLfoGain1,ie=this.nodes.chorusLfoGain2,z=this.nodes.chorusWetGain;if(C&&ie&&z){const v=p.isAudioFxEnabled?p.chorusAmount:0;z.gain.value=v*.6,C.gain.value=v*.005,ie.gain.value=v*.006}const de=this.nodes.tapeSaturator;if(de)try{de.curve=lo(p.isAudioFxEnabled?p.tapeSaturationAmount:0)}catch{}const _=this.nodes.busCompressor;if(_){const v=p.isAudioFxEnabled?p.compressorAmount:0;_.threshold.value=-36*v,_.ratio.value=1+9*v}const B=this.nodes.fxOutputGain;B&&(B.gain.value=p.isAudioFxEnabled?p.fxOutputTrimAmount:1)}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const c=o.createBiquadFilter(),m=o.createBiquadFilter(),a=o.createBiquadFilter(),g=o.createBiquadFilter(),T=o.createBiquadFilter(),M=o.createWaveShaper();let A=null,D=null;const O=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&O){const Ce=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await o.audioWorklet.addModule(Ce.href),A=new O(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const me=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(me.href),D=new O(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const y=o.createBiquadFilter(),J=o.createBiquadFilter(),j=o.createBiquadFilter(),Y=o.createGain(),Z=o.createConvolver(),x=o.createGain(),ee=o.createDelay(.05),b=o.createOscillator(),fe=o.createGain(),ne=o.createOscillator(),p=o.createGain();c.type="highpass",m.type="lowpass",a.type="peaking",g.type="lowpass",T.type="highshelf",y.type="lowshelf",y.frequency.value=180,J.type="peaking",J.frequency.value=1200,J.Q.value=.9,j.type="highshelf",j.frequency.value=3200,Z.buffer=Sn(o),T.frequency.value=2800,M.oversample="4x",ee.delayTime.value=.006,b.type="sine",ne.type="sine",b.connect(fe),fe.connect(ee.delayTime),ne.connect(p),p.connect(ee.delayTime),ee.connect(c),c.connect(m),m.connect(a),a.connect(g),g.connect(T),T.connect(M),A?(M.connect(A),A.connect(y)):M.connect(y),y.connect(J),J.connect(j);const $=o.createWaveShaper();$.curve=lo(0),$.oversample="4x",j.connect($),D?($.connect(D),D.connect(Y),D.connect(Z)):($.connect(Y),$.connect(Z)),Z.connect(x),Y.connect(r),x.connect(r);const K=o.createGain();K.gain.value=1;const H=o.createDynamicsCompressor();H.knee.value=10,H.attack.value=.003,H.release.value=.12,H.threshold.value=0,H.ratio.value=1;const re=o.createDelay(1);re.delayTime.value=.32;const X=o.createGain();X.gain.value=0;const I=o.createGain();I.gain.value=0;const w=o.createConvolver();w.buffer=Cn(o);const C=o.createGain();C.gain.value=0;const ie=o.createDelay(.05),z=o.createDelay(.05);ie.delayTime.value=.018,z.delayTime.value=.023;const de=o.createOscillator(),_=o.createOscillator();de.type="sine",_.type="sine",de.frequency.value=.8,_.frequency.value=1.3;const B=o.createGain(),v=o.createGain();B.gain.value=0,v.gain.value=0;const q=o.createGain();q.gain.value=0,r.connect(K),r.connect(re),re.connect(X),X.connect(re),re.connect(I),I.connect(K),r.connect(w),w.connect(C),C.connect(K),r.connect(ie),r.connect(z),de.connect(B),B.connect(ie.delayTime),_.connect(v),v.connect(z.delayTime),ie.connect(q),z.connect(q),q.connect(K),de.start(),_.start();const h=o.createGain();h.gain.value=1,K.connect(H),H.connect(h),this.connectOutputToDestination&&h.connect(o.destination),n&&this.connectOutputToRecordingDestination&&h.connect(n);const i=o.createBufferSource();i.buffer=yn(o),i.loop=!0;const V=o.createBiquadFilter();V.type="highpass",V.frequency.value=1100,V.Q.value=.25;const G=o.createBiquadFilter();G.type="lowpass",G.frequency.value=5600,G.Q.value=.18;const N=o.createBiquadFilter();N.type="peaking",N.frequency.value=2400,N.Q.value=.7,N.gain.value=-2.5;const P=o.createStereoPanner(),L=o.createGain(),W=o.createOscillator(),le=o.createGain(),xe=o.createBufferSource(),ae=o.createBiquadFilter(),se=o.createBiquadFilter(),he=o.createGain(),we=o.createGain();r.gain.value=0,L.gain.value=0,W.type="sine",W.frequency.value=.021,le.gain.value=.08,xe.buffer=Rn(o),xe.loop=!0,ae.type="highpass",ae.frequency.value=1250,ae.Q.value=.35,se.type="bandpass",se.frequency.value=2400,se.Q.value=.4,he.gain.value=0,we.gain.value=0,i.connect(V),V.connect(G),G.connect(N),N.connect(P),P.connect(L),L.connect(r),W.connect(le),le.connect(P.pan),xe.connect(ae),ae.connect(we),we.connect(r),xe.connect(se),se.connect(he),he.connect(r),i.start(),W.start(),xe.start(),b.start(),ne.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:c,radioToneLowpass:m,radioTonePresence:a,recordingDestination:n,lofiLowpass:g,lofiHighshelf:T,lofiDrive:M,bitcrusher:A,bassEq:y,midEq:J,trebleEq:j,stereoWidth:D,roomDryGain:Y,roomConvolver:Z,roomWetGain:x,wowFlutterDelay:ee,wowLfo:b,wowLfoGain:fe,flutterLfo:ne,flutterLfoGain:p,noiseSource:i,noiseFilter:N,noisePanner:P,noiseGain:L,noiseLfo:W,noiseLfoGain:le,crackleSource:xe,crackleFilter:ae,vinylDustBedFilter:se,vinylDustBedGain:he,crackleGain:we,outputBus:K,echoDelayLine:re,echoFeedbackGain:X,echoWetGain:I,hallReverbConvolver:w,hallReverbWetGain:C,chorusDelay1:ie,chorusDelay2:z,chorusLfo1:de,chorusLfo2:_,chorusLfoGain1:B,chorusLfoGain2:v,chorusWetGain:q,tapeSaturator:$,busCompressor:H,fxOutputGain:h})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const c=this.output;if(!c){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(Tn(e)){c.connect(e,o);return}c.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}try{this.nodes.chorusLfo1?.stop()}catch{}try{this.nodes.chorusLfo2?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function Ln({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const c={settings:So(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new Dn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:c,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function Q(t){return{get current(){return t()}}}function Mn({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:c}){const[m]=l.useState(()=>new AudioContext),[a]=l.useState(()=>{const d=vt()?.audio;return{isMuted:d?.isMuted??ue.isMuted,volume:d?.volume??ue.volume,playbackRate:d?.playbackRate??ue.playbackRate,isLooping:d?.isLooping??ue.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??ue.isAudioFxEnabled,lofiAmount:d?.lofiAmount??ue.lofiAmount,radioToneAmount:d?.radioToneAmount??ue.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??ue.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??ue.sampleRateReductionAmount,bassAmount:d?.bassAmount??ue.bassAmount,midAmount:d?.midAmount??ue.midAmount,trebleAmount:d?.trebleAmount??ue.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??ue.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??ue.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??ue.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??ue.isNoiseEnabled,noiseLevel:d?.noiseLevel??ue.noiseLevel,vinylDustAmount:d?.vinylDustAmount??ue.vinylDustAmount,delayAmount:d?.delayAmount??ue.delayAmount,reverbAmount:d?.reverbAmount??ue.reverbAmount,chorusAmount:d?.chorusAmount??ue.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??ue.tapeSaturationAmount,compressorAmount:d?.compressorAmount??ue.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??ue.fxOutputTrimAmount}}),g=l.useRef(a.isMuted),T=l.useRef(a.volume),M=l.useRef(a.playbackRate),A=l.useRef(a.isLooping),D=l.useRef(a.isAudioFxEnabled),O=l.useRef(a.lofiAmount),y=l.useRef(a.radioToneAmount),J=l.useRef(a.bitCrushAmount),j=l.useRef(a.sampleRateReductionAmount),Y=l.useRef(a.bassAmount),Z=l.useRef(a.midAmount),x=l.useRef(a.trebleAmount),ee=l.useRef(a.stereoWidthAmount),b=l.useRef(a.smallSpeakerRoomAmount),fe=l.useRef(a.wowFlutterAmount),ne=l.useRef(a.isNoiseEnabled),p=l.useRef(a.noiseLevel),$=l.useRef(a.vinylDustAmount),K=l.useRef(a.delayAmount),H=l.useRef(a.reverbAmount),re=l.useRef(a.chorusAmount),X=l.useRef(a.tapeSaturationAmount),I=l.useRef(a.compressorAmount),w=l.useRef(a.fxOutputTrimAmount),[C,ie]=l.useState(a.isMuted),[z,de]=l.useState(a.playbackRate),[_,B]=l.useState(a.volume),[v,q]=l.useState(a.isLooping),[h,i]=l.useState(a.isAudioFxEnabled),[V,G]=l.useState(a.lofiAmount),[N,P]=l.useState(a.radioToneAmount),[L,W]=l.useState(a.bitCrushAmount),[le,xe]=l.useState(a.sampleRateReductionAmount),[ae,se]=l.useState(a.bassAmount),[he,we]=l.useState(a.midAmount),[Ce,me]=l.useState(a.trebleAmount),[ve,Ne]=l.useState(a.stereoWidthAmount),[be,He]=l.useState(a.smallSpeakerRoomAmount),[De,_e]=l.useState(a.wowFlutterAmount),[ye,ze]=l.useState(a.isNoiseEnabled),[Ie,Ke]=l.useState(a.noiseLevel),[Re,Ee]=l.useState(a.vinylDustAmount),[ge,Se]=l.useState(a.delayAmount),[Oe,Me]=l.useState(a.reverbAmount),[Be,Te]=l.useState(a.chorusAmount),[Le,We]=l.useState(a.tapeSaturationAmount),[ke,Xe]=l.useState(a.compressorAmount),[Ve,qe]=l.useState(a.fxOutputTrimAmount),s=l.useRef(null),[u]=l.useState(()=>Ln({context:m,instanceLabel:t,params:a,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[U]=l.useState(()=>({audioContextRef:Q(()=>u.audioContext),masterGainRef:Q(()=>u.masterGain),radioToneHighpassRef:Q(()=>u.radioToneHighpass),radioToneLowpassRef:Q(()=>u.radioToneLowpass),radioTonePresenceRef:Q(()=>u.radioTonePresence),recordingDestinationRef:Q(()=>u.recordingDestination),lofiLowpassRef:Q(()=>u.lofiLowpass),lofiHighshelfRef:Q(()=>u.lofiHighshelf),lofiDriveRef:Q(()=>u.lofiDrive),bitcrusherRef:Q(()=>u.bitcrusher),bassEqRef:Q(()=>u.bassEq),midEqRef:Q(()=>u.midEq),trebleEqRef:Q(()=>u.trebleEq),stereoWidthRef:Q(()=>u.stereoWidth),roomDryGainRef:Q(()=>u.roomDryGain),roomConvolverRef:Q(()=>u.roomConvolver),roomWetGainRef:Q(()=>u.roomWetGain),wowFlutterDelayRef:Q(()=>u.wowFlutterDelay),wowLfoRef:Q(()=>u.wowLfo),wowLfoGainRef:Q(()=>u.wowLfoGain),flutterLfoRef:Q(()=>u.flutterLfo),flutterLfoGainRef:Q(()=>u.flutterLfoGain),noiseSourceRef:Q(()=>u.noiseSource),noiseFilterRef:Q(()=>u.noiseFilter),noisePannerRef:Q(()=>u.noisePanner),noiseGainRef:Q(()=>u.noiseGain),noiseLfoRef:Q(()=>u.noiseLfo),noiseLfoGainRef:Q(()=>u.noiseLfoGain),crackleSourceRef:Q(()=>u.crackleSource),crackleFilterRef:Q(()=>u.crackleFilter),vinylDustBedFilterRef:Q(()=>u.vinylDustBedFilter),vinylDustBedGainRef:Q(()=>u.vinylDustBedGain),crackleGainRef:Q(()=>u.crackleGain)})),{audioContextRef:ce,masterGainRef:k,radioToneHighpassRef:R,radioToneLowpassRef:Ae,radioTonePresenceRef:te,recordingDestinationRef:ot,lofiLowpassRef:At,lofiHighshelfRef:nt,lofiDriveRef:xt,bitcrusherRef:wt,bassEqRef:Ct,midEqRef:rt,trebleEqRef:St,stereoWidthRef:it,roomDryGainRef:yt,roomConvolverRef:at,roomWetGainRef:Rt,wowFlutterDelayRef:st,wowLfoRef:Tt,wowLfoGainRef:lt,flutterLfoRef:Dt,flutterLfoGainRef:ct,noiseSourceRef:Lt,noiseFilterRef:ut,noisePannerRef:Mt,noiseGainRef:Bt,noiseLfoRef:Pt,noiseLfoGainRef:Et,crackleSourceRef:It,crackleFilterRef:kt,vinylDustBedFilterRef:Ft,vinylDustBedGainRef:Gt,crackleGainRef:Nt}=U,Je=(d,Pe)=>u.debugAudio(d,Pe),dt=()=>u.ensureInitialized(),Wt=()=>u.ensureInitialized(),$e=()=>u.updateAudioNodes(),Ut=d=>u.connectSourceNode(d),Ht=()=>u.disposeAudioEngine(),ht=(d,Pe)=>u.setParams(d,Pe),Ot=d=>u.setIsPlaying(d),Vt=d=>u.setOutputEnabled(d),_t=async d=>{const Pe=await dt();if(!Pe||!u.input){Je("connectMediaAudio:no-context",{mediaTag:d.tagName});return}s.current&&(Je("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),s.current.disconnect(),s.current=null);try{const je=Pe.createMediaElementSource(d);je.connect(u.input),s.current=je,d.muted=g.current,d.volume=g.current?0:T.current,Je("connectMediaAudio:connected",{audioContextState:Pe.state,mediaTag:d.tagName,previewKind:o.current}),$e()}catch(je){throw Je("connectMediaAudio:error",{audioContextState:Pe.state,mediaTag:d.tagName,message:je instanceof Error?je.message:String(je),previewKind:o.current}),je}},zt=()=>{const d=s.current;!d||!u.input||(d.disconnect(),d.connect(u.input),$e())},jt=async()=>{s.current?.disconnect(),s.current=null,await Ht()},Zt=()=>{const d={...ue};g.current=d.isMuted,T.current=d.volume,M.current=d.playbackRate,A.current=d.isLooping,D.current=d.isAudioFxEnabled,O.current=d.lofiAmount,y.current=d.radioToneAmount,J.current=d.bitCrushAmount,j.current=d.sampleRateReductionAmount,Y.current=d.bassAmount,Z.current=d.midAmount,x.current=d.trebleAmount,ee.current=d.stereoWidthAmount,b.current=d.smallSpeakerRoomAmount,fe.current=d.wowFlutterAmount,ne.current=d.isNoiseEnabled,p.current=d.noiseLevel,$.current=d.vinylDustAmount,K.current=d.delayAmount,H.current=d.reverbAmount,re.current=d.chorusAmount,X.current=d.tapeSaturationAmount,I.current=d.compressorAmount,w.current=d.fxOutputTrimAmount,ie(d.isMuted),B(d.volume),de(d.playbackRate),q(d.isLooping),i(d.isAudioFxEnabled),G(d.lofiAmount),P(d.radioToneAmount),W(d.bitCrushAmount),xe(d.sampleRateReductionAmount),se(d.bassAmount),we(d.midAmount),me(d.trebleAmount),Ne(d.stereoWidthAmount),He(d.smallSpeakerRoomAmount),_e(d.wowFlutterAmount),ze(d.isNoiseEnabled),Ke(d.noiseLevel),Ee(d.vinylDustAmount),Se(d.delayAmount),Me(d.reverbAmount),Te(d.chorusAmount),We(d.tapeSaturationAmount),Xe(d.compressorAmount),qe(d.fxOutputTrimAmount),r.current&&(r.current.muted=d.isMuted,r.current.volume=d.volume,r.current.playbackRate=d.playbackRate,r.current.loop=d.isLooping),ht(d),window.requestAnimationFrame($e)};return l.useEffect(()=>{g.current=C,T.current=_,M.current=z,A.current=v,D.current=h,O.current=V,y.current=N,J.current=L,j.current=le,Y.current=ae,Z.current=he,x.current=Ce,ee.current=ve,b.current=be,fe.current=De,ne.current=ye,p.current=Ie,$.current=Re,K.current=ge,H.current=Oe,re.current=Be,X.current=Le,I.current=ke,w.current=Ve,ht({isMuted:C,volume:_,playbackRate:z,isLooping:v,isAudioFxEnabled:h,lofiAmount:V,radioToneAmount:N,bitCrushAmount:L,sampleRateReductionAmount:le,bassAmount:ae,midAmount:he,trebleAmount:Ce,stereoWidthAmount:ve,smallSpeakerRoomAmount:be,wowFlutterAmount:De,isNoiseEnabled:ye,noiseLevel:Ie,vinylDustAmount:Re,delayAmount:ge,reverbAmount:Oe,chorusAmount:Be,tapeSaturationAmount:Le,compressorAmount:ke,fxOutputTrimAmount:Ve},!0),Ot(n),Vt(e==="video"||e==="audio"||e==="capture"),r.current&&(r.current.muted=C,r.current.volume=C?0:_,r.current.playbackRate=z,r.current.loop=v)},[C,_,h,V,N,L,le,ae,he,Ce,ve,be,De,ye,Ie,Re,ge,Oe,Be,Le,ke,Ve,n,z,v,e]),l.useEffect(()=>{gn({isMuted:C,volume:_,playbackRate:z,isLooping:v,isAudioFxEnabled:h,lofiAmount:V,radioToneAmount:N,bitCrushAmount:L,sampleRateReductionAmount:le,bassAmount:ae,midAmount:he,trebleAmount:Ce,stereoWidthAmount:ve,smallSpeakerRoomAmount:be,wowFlutterAmount:De,isNoiseEnabled:ye,noiseLevel:Ie,vinylDustAmount:Re,delayAmount:ge,reverbAmount:Oe,chorusAmount:Be,tapeSaturationAmount:Le,compressorAmount:ke,fxOutputTrimAmount:Ve})},[C,_,z,v,h,V,N,L,le,ae,he,Ce,ve,be,De,ye,Ie,Re,ge,Oe,Be,Le,ke,Ve]),{audioContextRef:ce,mediaSourceRef:s,masterGainRef:k,radioToneHighpassRef:R,radioToneLowpassRef:Ae,radioTonePresenceRef:te,recordingDestinationRef:ot,lofiLowpassRef:At,lofiHighshelfRef:nt,lofiDriveRef:xt,bitcrusherRef:wt,bassEqRef:Ct,midEqRef:rt,trebleEqRef:St,stereoWidthRef:it,roomDryGainRef:yt,roomConvolverRef:at,roomWetGainRef:Rt,wowFlutterDelayRef:st,wowLfoRef:Tt,wowLfoGainRef:lt,flutterLfoRef:Dt,flutterLfoGainRef:ct,noiseSourceRef:Lt,noiseFilterRef:ut,noisePannerRef:Mt,noiseGainRef:Bt,noiseLfoRef:Pt,noiseLfoGainRef:Et,crackleSourceRef:It,crackleFilterRef:kt,vinylDustBedFilterRef:Ft,vinylDustBedGainRef:Gt,crackleGainRef:Nt,isMutedRef:g,volumeRef:T,playbackRateRef:M,isLoopingRef:A,isAudioFxEnabledRef:D,lofiAmountRef:O,radioToneAmountRef:y,bitCrushAmountRef:J,sampleRateReductionAmountRef:j,bassAmountRef:Y,midAmountRef:Z,trebleAmountRef:x,stereoWidthAmountRef:ee,smallSpeakerRoomAmountRef:b,wowFlutterAmountRef:fe,isNoiseEnabledRef:ne,noiseLevelRef:p,vinylDustAmountRef:$,delayAmountRef:K,reverbAmountRef:H,chorusAmountRef:re,tapeSaturationAmountRef:X,compressorAmountRef:I,fxOutputTrimAmountRef:w,isMuted:C,setIsMuted:ie,playbackRate:z,setPlaybackRate:de,volume:_,setVolume:B,isLooping:v,setIsLooping:q,isAudioFxEnabled:h,setIsAudioFxEnabled:i,lofiAmount:V,setLofiAmount:G,radioToneAmount:N,setRadioToneAmount:P,bitCrushAmount:L,setBitCrushAmount:W,sampleRateReductionAmount:le,setSampleRateReductionAmount:xe,bassAmount:ae,setBassAmount:se,midAmount:he,setMidAmount:we,trebleAmount:Ce,setTrebleAmount:me,stereoWidthAmount:ve,setStereoWidthAmount:Ne,smallSpeakerRoomAmount:be,setSmallSpeakerRoomAmount:He,wowFlutterAmount:De,setWowFlutterAmount:_e,isNoiseEnabled:ye,setIsNoiseEnabled:ze,noiseLevel:Ie,setNoiseLevel:Ke,vinylDustAmount:Re,setVinylDustAmount:Ee,delayAmount:ge,setDelayAmount:Se,reverbAmount:Oe,setReverbAmount:Me,chorusAmount:Be,setChorusAmount:Te,tapeSaturationAmount:Le,setTapeSaturationAmount:We,compressorAmount:ke,setCompressorAmount:Xe,fxOutputTrimAmount:Ve,setFxOutputTrimAmount:qe,debugAudio:Je,ensureAudioContext:Wt,ensureInitialized:dt,updateAudioNodes:$e,connectSourceNode:Ut,connectMediaAudio:_t,reconnectCurrentMediaAudio:zt,resetAudioSettings:Zt,disposeAudioEngine:jt}}const Bn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},tt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},Pn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,En=`#version 300 es
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
`,In=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,co=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,kn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),uo=640,Yt=()=>typeof performance<"u"?performance.now():Date.now(),qt=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,ho=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Fn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,mo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),gt=t=>({width:qt(t)?t.videoWidth:ho(t)?t.naturalWidth:t.width,height:qt(t)?t.videoHeight:ho(t)?t.naturalHeight:t.height}),Gn=(t,e,o)=>qt(t)&&(e>uo||o>uo),bt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Nn=t=>bt(t)&&t.phosphorDotInternalScale?2:1,Wn=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},Un=(t,e,o,r,n,c)=>{if(!bt(o)||n===void 0||c===void 0||n<=0||c<=0)return{width:t,height:e};const m=Math.max(1.1,2.15+o.bulbRadius*1.15),a=Math.max(1,m/Math.max(r,1)),g=Math.max(1,Math.floor(n/a)),T=Math.max(1,Math.floor(c/a)),M=Math.min(1,g/Math.max(t,1),T/Math.max(e,1));return{width:Math.max(1,Math.round(t*M)),height:Math.max(1,Math.round(e*M))}},Jt=(t,e,o,r,n)=>{const c=Nn(t),m=Math.max(t.targetWidth,1),a=Math.max(t.targetHeight,1),g=t.matchTargetAspect?Wn(m,a,e,o):{width:m,height:a},T=g.width*c,M=g.height*c,A=Un(T,M,t,c,r,n);return{width:A.width,height:A.height,sampleWidth:Math.max(1,Math.round(T)),sampleHeight:Math.max(1,Math.round(M)),internalScale:c,isPhosphorDotMode:bt(t)}};function go(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function po(t,e,o){const r=go(t,t.VERTEX_SHADER,e),n=go(t,t.FRAGMENT_SHADER,o),c=t.createProgram();if(!c)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(c,r),t.attachShader(c,n),t.bindAttribLocation(c,0,"aPosition"),t.linkProgram(c),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(c,t.LINK_STATUS)){const m=t.getProgramInfoLog(c)||"Unknown program link error.";throw t.deleteProgram(c),new Error(m)}return c}class Hn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=Yt();constructor(e){this.gl=e,this.filterProgram=po(e,co,En),this.passthroughProgram=po(e,co,In);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,kn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=Yt()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const c=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),mo(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const m=gt(o);this.applyFilterUniforms(r,m.width,m.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(mo(e)||!o.isFilterEnabled)return e;const r=gt(e);if(r.width<=0||r.height<=0||Gn(e,r.width,r.height))return e;const{width:n,height:c,sampleWidth:m,sampleHeight:a,isPhosphorDotMode:g}=Jt(o,r.width,r.height),T=Math.max(1,Math.round(g?m:n)),M=Math.max(1,Math.round(g?a:c)),A=this.ensureUploadContext();return!A||!this.uploadCanvas?e:(this.uploadCanvas.width!==T&&(this.uploadCanvas.width=T),this.uploadCanvas.height!==M&&(this.uploadCanvas.height=M),A.imageSmoothingEnabled=!0,A.imageSmoothingQuality="high",A.fillStyle="#000",A.fillRect(0,0,T,M),A.drawImage(e,0,0,T,M),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,c=Fn(n.canvas)?n.canvas:null,m=Math.max(c?.clientWidth??n.drawingBufferWidth,1),a=Math.max(c?.clientHeight??n.drawingBufferHeight,1),{width:g,height:T,sampleWidth:M,sampleHeight:A,isPhosphorDotMode:D}=Jt(e,o,r,m,a);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,g,T),n.uniform2f(this.uniformLocations.uSampleTargetSize,M,A),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,Pn(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*T/(Math.max(n.drawingBufferHeight,1)*g)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,D?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...Bn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(Yt()-this.startedAt)/1e3)}}function On({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:c,debugVideo:m}){const a=l.useRef(null),g=l.useRef(null),T=l.useRef(null),M=l.useRef(null),A=l.useRef(null),D=l.useRef(null),O=l.useRef(null),y=l.useRef(null),J=l.useRef(()=>{}),j=l.useRef(t),Y=l.useRef(r),Z=l.useRef(!1),x=l.useRef(null),ee=l.useRef(null),b=l.useRef(null),[fe,ne]=l.useState(!1),[p,$]=l.useState(null);j.current=t,Y.current=r;const K=l.useCallback(i=>{$(V=>{const G=typeof i=="function"?i(V):i;return b.current=G,G})},[]),H=l.useCallback(()=>{const i=g.current,V=A.current;i&&(i.pipeline.setOutputEnabled(Y.current),i.pipeline.setSource(V),i.pipeline.setFilterState(j.current),i.pipeline.render())},[]);l.useLayoutEffect(()=>{J.current=H},[H]);const re=l.useCallback(()=>{Z.current=!1,y.current!==null&&(window.cancelAnimationFrame(y.current),y.current=null)},[]),X=l.useCallback(()=>{if(Z.current)return;Z.current=!0;const i=()=>{if(!Z.current)return;if(J.current(),!(c.current==="video"||c.current==="capture"||c.current==="image"||n.current)){y.current=null,Z.current=!1;return}y.current=window.requestAnimationFrame(i)};y.current=window.requestAnimationFrame(i)},[n,c]),I=l.useCallback(()=>{H()},[H]),w=l.useCallback(()=>{H()},[H]),C=l.useCallback(()=>{H()},[H]),ie=l.useCallback(()=>(g.current&&g.current.pipeline.resetAnimationClock(),D.current={},H(),D.current),[H]),z=l.useCallback((i,V,G)=>{if(!i)return;const{width:N,height:P}=gt(G);if(N<=0||P<=0)return;const L=a.current,W=L?.clientWidth??i.canvas.width,le=L?.clientHeight??i.canvas.height,ae=e==="width"?W/N:Math.min(W/N,le/P),se=N*ae,he=P*ae,we=(W-se)/2,Ce=(le-he)/2,me={width:se,height:he,x:we,y:Ce},ve=b.current;return ve&&ve.width===me.width&&ve.height===me.height&&ve.x===me.x&&ve.y===me.y?ve:(b.current=me,K(me),me)},[e,K]),de=l.useCallback(()=>{A.current&&z(g.current,null,A.current)},[z]),_=l.useCallback(()=>{H()},[H]),B=l.useCallback(()=>{const i=g.current,V=a.current;if(!i||!V)return;de();const G=b.current??{x:0,y:0,width:V.clientWidth,height:V.clientHeight},N=Math.max(1,Math.round(G.width)),P=Math.max(1,Math.round(G.height)),L=j.current,W=A.current?gt(A.current):null,{width:le,height:xe}=Jt(L,W?.width,W?.height,N,P),ae=Math.max(1,Math.round(N*Math.max(1,o))),se=Math.max(1,Math.round(P*Math.max(1,o))),he=Math.max(1,Math.round(Math.max(1,le)*Math.max(1,o))),we=Math.max(1,Math.round(Math.max(1,xe)*Math.max(1,o))),Ce=bt(L),me=L.isFilterEnabled&&Ce?Math.max(ae,he):ae,ve=L.isFilterEnabled&&Ce?Math.max(se,we):se;i.canvas.width!==me&&(i.canvas.width=me),i.canvas.height!==ve&&(i.canvas.height=ve),i.canvas.style.position="absolute",i.canvas.style.left=`${Math.round(G.x)}px`,i.canvas.style.top=`${Math.round(G.y)}px`,i.canvas.style.width=`${N}px`,i.canvas.style.height=`${P}px`,i.canvas.style.imageRendering="pixelated",H()},[de,H,o]),v=l.useCallback(()=>{x.current!==null&&(window.cancelAnimationFrame(x.current),x.current=null),ee.current!==null&&(window.clearTimeout(ee.current),ee.current=null),x.current=window.requestAnimationFrame(()=>{x.current=null,B()}),ee.current=window.setTimeout(()=>{ee.current=null,B()},120)},[B]),q=l.useCallback(async()=>{if(!g.current){if(O.current){await O.current;return}O.current=(async()=>{const i=a.current;if(!i||g.current)return;const V=typeof performance<"u"?performance.now():Date.now();m("startup:initPixi:start",{hostConnected:i.isConnected,hostWidth:i.clientWidth??null,hostHeight:i.clientHeight??null,resolution:o});const G=document.createElement("canvas");G.style.display="block",G.style.width="100%",G.style.height="100%",G.style.imageRendering="pixelated",G.style.background="#020617";const N=G.getContext("webgl2");if(!N)throw new Error("WebGL2 is not available in this app view.");m("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10});const P={canvas:G,pipeline:new Hn(N),ticker:{start:X,stop:re}},L=a.current;if(!L||L!==i||!L.isConnected)return;L.style.position="relative",L.appendChild(G),g.current=P,D.current={},ne(!0),m("initWebGL:ready",{hostWidth:L.clientWidth??null,hostHeight:L.clientHeight??null,resolution:o}),m("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10}),B();const W=c.current==="video"||c.current==="capture"||c.current==="image"||n.current;r&&W&&X(),m("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10,shouldAnimateOnInit:W})})();try{await O.current}finally{O.current=null}}},[m,r,B,o,X,re]),h=l.useCallback(()=>{O.current=null,re(),x.current!==null&&(window.cancelAnimationFrame(x.current),x.current=null),ee.current!==null&&(window.clearTimeout(ee.current),ee.current=null);const i=g.current;i&&(i.pipeline.dispose(),i.canvas.remove()),g.current=null,D.current=null,K(null),ne(!1)},[re,K]);return l.useEffect(()=>{const i=a.current;if(!i)return;if(typeof ResizeObserver<"u"){const G=new ResizeObserver(()=>{v()});return G.observe(i),()=>{G.disconnect()}}const V=()=>{v()};return window.addEventListener("resize",V),()=>{window.removeEventListener("resize",V)}},[v]),{canvasHostRef:a,appRef:g,spriteRef:T,textureRef:M,previewElementRef:A,filterRef:D,isRendererReady:fe,viewportRect:p,setViewportRect:K,applyFilterState:I,createVideoTexture:i=>null,destroyPixi:h,fitCurrentSprite:de,fitSprite:z,initPixi:q,refreshLayout:B,resetFilterInstance:ie,safeRender:_,scheduleRefreshLayout:v,syncSpriteFilter:w,syncTexturePresentation:C}}const Vn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function _n({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:c,streamRef:m,streamOwnedRef:a,previewRequestIdRef:g,isPlayingRef:T,previewKindRef:M,audioContextRef:A,mediaSourceRef:D,masterGainRef:O,noiseGainRef:y,isMutedRef:J,volumeRef:j,playbackRateRef:Y,isLoopingRef:Z,isAudioFxEnabled:x,lofiAmount:ee,bitCrushAmount:b,sampleRateReductionAmount:fe,bassAmount:ne,midAmount:p,trebleAmount:$,stereoWidthAmount:K,smallSpeakerRoomAmount:H,isMuted:re,volume:X,previewKind:I,setPreviewName:w,setPreviewError:C,setNeedsUserPlay:ie,setIsPlaying:z,setCurrentTime:de,setDuration:_,setPlaybackRate:B,setIsLooping:v,setSourceDimensions:q,setViewportRect:h,setPreviewKindState:i,setIsPoweredOn:V,beginLoading:G,finishLoading:N,ensureAudioContext:P,updateAudioNodes:L,connectMediaAudio:W,fitSprite:le,refreshLayout:xe,scheduleRefreshLayout:ae,safeRender:se,resetFilterInstance:he,initPixi:we,resetPerfAccumulators:Ce,debugVideo:me,debugAudio:ve}){const Ne=async()=>{Vn()&&await new Promise(s=>{window.setTimeout(s,220)})},be=()=>{const s=A.current?.currentTime;if(y.current)if(typeof s=="number"){const u=y.current.gain;u.cancelScheduledValues(s),u.setValueAtTime(u.value,s),u.linearRampToValueAtTime(0,s+.03)}else y.current.gain.value=0;if(O.current)if(typeof s=="number"){const u=O.current.gain;u.cancelScheduledValues(s),u.setValueAtTime(u.value,s),u.linearRampToValueAtTime(0,s+.03)}else O.current.gain.value=0},He=()=>{y.current&&(y.current.gain.value=0)},De=s=>s instanceof DOMException&&(s.name==="NotAllowedError"||s.name==="AbortError")?!0:s instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(s.message):!1,_e=s=>De(s)?(N(),C(""),ie(!0),ge(),se(),!0):!1,ye=(s,u,U=!0)=>{be(),s.muted=!0,s.volume=0,s.pause(),s.srcObject instanceof MediaStream&&(U&&s.srcObject.getTracks().forEach(ce=>ce.stop()),s.srcObject=null),s.src="",s.load(),u?.startsWith("blob:")&&URL.revokeObjectURL(u)},ze=s=>new Promise((u,U)=>{const ce=te=>te?te.code===MediaError.MEDIA_ERR_ABORTED?"aborted":te.code===MediaError.MEDIA_ERR_NETWORK?"network":te.code===MediaError.MEDIA_ERR_DECODE?"decode":te.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${te.code}`:"unknown",k=()=>{s.removeEventListener("loadeddata",R),s.removeEventListener("canplay",R),s.removeEventListener("error",Ae)},R=()=>{k(),u()},Ae=()=>{k(),U(new Error(`動画の読み込みに失敗しました。 src=${s.currentSrc||s.src||"(empty)"} reason=${ce(s.error)}`))};if(s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){u();return}s.addEventListener("loadeddata",R,{once:!0}),s.addEventListener("canplay",R,{once:!0}),s.addEventListener("error",Ae,{once:!0}),s.load()}),Ie=s=>new Promise((u,U)=>{const ce=te=>te?te.code===MediaError.MEDIA_ERR_ABORTED?"aborted":te.code===MediaError.MEDIA_ERR_NETWORK?"network":te.code===MediaError.MEDIA_ERR_DECODE?"decode":te.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${te.code}`:"unknown",k=()=>{s.removeEventListener("loadedmetadata",R),s.removeEventListener("canplay",R),s.removeEventListener("error",Ae)},R=()=>{k(),u()},Ae=()=>{k(),U(new Error(`音声の読み込みに失敗しました。 src=${s.currentSrc||s.src||"(empty)"} reason=${ce(s.error)}`))};if(s.readyState>=HTMLMediaElement.HAVE_METADATA){u();return}s.addEventListener("loadedmetadata",R,{once:!0}),s.addEventListener("canplay",R,{once:!0}),s.addEventListener("error",Ae,{once:!0}),s.load()}),Ke=s=>new Promise((u,U)=>{const ce=()=>{s.removeEventListener("load",k),s.removeEventListener("error",R)},k=()=>{ce(),u()},R=()=>{ce(),U(new Error("画像の読み込みに失敗しました。"))};if(s.complete&&s.naturalWidth>0&&s.naturalHeight>0){u();return}s.addEventListener("load",k,{once:!0}),s.addEventListener("error",R,{once:!0})}),Re=s=>{s.addEventListener("play",ge),s.addEventListener("pause",ge),s.addEventListener("pause",be),s.addEventListener("abort",be),s.addEventListener("emptied",be),s.addEventListener("loadstart",be),s.addEventListener("seeking",be),s.addEventListener("stalled",be),s.addEventListener("suspend",be),s.addEventListener("waiting",be),s.addEventListener("volumechange",ge),s.addEventListener("timeupdate",ge),s.addEventListener("durationchange",ge),s.addEventListener("seeked",ge),s.addEventListener("ended",ge),s.addEventListener("ratechange",ge),s instanceof HTMLVideoElement&&s.addEventListener("resize",()=>{const u=s.videoWidth,U=s.videoHeight;u>0&&U>0&&(q({width:u,height:U}),ae())})},Ee=s=>{s.loop=Z.current,s.muted=J.current,s.volume=J.current?0:j.current,s.playbackRate=Y.current,s.autoplay=!1,s.preload="auto",s.crossOrigin="anonymous",s instanceof HTMLVideoElement&&(s.playsInline=!0)},ge=()=>{if(!n.current){me("syncVideoState:no-media",{previewKind:M.current,hasPreviewElement:!!r.current}),T.current=!1,z(!1),de(0),_(0),L(),se();return}T.current=!n.current.paused,z(!n.current.paused),n.current.paused||N(),de(n.current.currentTime),_(n.current.duration||0),B(n.current.playbackRate||1),v(n.current.loop),L(),se()},Se=()=>{me("cleanupPreview:start",{previewKind:M.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),be(),g.current+=1,N();const s=n.current,u=m.current,U=a.current;e.current=null,o.current=null,n.current=null,r.current=null,m.current=null,a.current=!1,D.current?.disconnect(),D.current=null,ie(!1),T.current=!1,z(!1),de(0),_(0),i(null),q(null),h(null),c.current?.startsWith("blob:")&&URL.revokeObjectURL(c.current),c.current=null,s?ye(s,void 0,U):U&&u?.getTracks().forEach(ce=>ce.stop()),se()},Oe=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),be(),Se(),A.current?.state==="running"&&A.current.suspend()},Me=()=>{V(!0),t.current?.ticker.start();try{Ce?.()}catch{}},Be=async()=>{if(n.current)try{await P(),n.current.muted=J.current,n.current.volume=J.current?0:j.current,await n.current.play(),T.current=!0,z(!0),C(""),ie(!1),ve("playVideoWithAudio",{audioContextState:A.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:x,lofiAmount:ee,bitCrushAmount:b,sampleRateReductionAmount:fe,bassAmount:ne,midAmount:p,trebleAmount:$,stereoWidthAmount:K,smallSpeakerRoomAmount:H,isMuted:re,volume:X}),L(),ge(),se(),ae(),window.requestAnimationFrame(L)}catch(s){if(N(),De(s)){ie(!0),C("");return}ie(!1),C(s instanceof Error?s.message:"音声付き再生を開始できませんでした。")}},Te=async()=>{if(await we(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Le=async(s,u)=>{const U=await Te();r.current=s,le(U,null,s),i(u),q(s instanceof HTMLVideoElement?{width:s.videoWidth,height:s.videoHeight}:{width:s.naturalWidth,height:s.naturalHeight}),se(),xe(),ae(),t.current?.ticker.start()},We=async s=>{const u=s.type.startsWith("video/"),U=s.type.startsWith("audio/"),ce=s.type.startsWith("image/");if(!u&&!U&&!ce){C("動画、音声、または画像ファイルを選んでください。");return}Me(),Se(),he();const k=g.current;C(""),w(s.name),G(u?"Loading video preview...":U?"Loading audio preview...":"Loading image preview...");let R=null;try{if(await Te(),R=URL.createObjectURL(s),c.current=R,u||U){const te=u?document.createElement("video"):document.createElement("audio");if(te.src=R,Ee(te),Re(te),te instanceof HTMLVideoElement?await ze(te):await Ie(te),k!==g.current){ye(te,R);return}n.current=te,te instanceof HTMLVideoElement?await Le(te,"video"):(r.current=null,i("audio"),q(null),h(null),se()),await W(te),ge(),await Ne(),await Be(),k===g.current&&N();return}const Ae=new Image;if(Ae.src=R,Ae.crossOrigin="anonymous",await Ke(Ae),k!==g.current){R.startsWith("blob:")&&URL.revokeObjectURL(R);return}n.current=null,He(),L(),await Le(Ae,"image"),ge(),k===g.current&&N()}catch(Ae){if(k!==g.current){R?.startsWith("blob:")&&URL.revokeObjectURL(R);return}if(De(Ae)){_e(Ae);return}Se(),C(Ae instanceof Error?Ae.message:"動画プレビューに失敗しました。"),ie(!1)}},ke=async()=>{if(Me(),!navigator.mediaDevices?.getDisplayMedia){C("このブラウザでは画面キャプチャーに対応していません。");return}Se();const s=g.current;C(""),w("Display Capture"),G("Preparing display capture...");try{await Te();const u=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(s!==g.current){u.getTracks().forEach(ce=>ce.stop());return}const U=document.createElement("video");U.srcObject=u,Ee(U),Re(U),u.getVideoTracks()[0]?.addEventListener("ended",()=>{Xe()}),await ze(U),m.current=u,a.current=!0,n.current=U,await Le(U,"capture"),await W(U),ie(!1),await Ne(),await Be(),s===g.current&&N()}catch(u){if(s!==g.current||_e(u))return;Se(),C(u instanceof Error?u.message:"画面キャプチャーを開始できませんでした。")}},Xe=()=>{I==="capture"&&(Se(),w(""),C(""))};return{cleanupPreview:Se,cleanupForPageLeave:Oe,playVideoWithAudio:Be,previewFile:We,previewStream:async(s,u="video",U="Media Stream")=>{let ce=0;try{if(Me(),Se(),he(),ce=g.current,C(""),w(U),G(u==="video"?"Loading stream preview...":"Loading stream audio..."),await Te(),u==="video"){const k=document.createElement("video");if(k.srcObject=s,Ee(k),Re(k),await ze(k),ce!==g.current){ye(k,void 0,!1);return}m.current=s,a.current=!1,n.current=k,await Le(k,"capture"),await W(k)}else{const k=document.createElement("audio");if(k.srcObject=s,Ee(k),Re(k),await Ie(k),ce!==g.current){ye(k,void 0,!1);return}m.current=s,a.current=!1,n.current=k,r.current=null,i("audio"),q(null),h(null),se(),await W(k),ge()}if(ce!==g.current)return;await Ne(),await Be(),ce===g.current&&N()}catch(k){if(ce!==g.current||_e(k))return;Se(),C(k instanceof Error?k.message:String(k))}},previewUrl:async(s,u="video")=>{let U=0;const ce=typeof performance<"u"?performance.now():Date.now(),k=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-ce)*10)/10;try{if(me("startup:previewUrl:start",{url:s,kind:u}),Me(),Se(),he(),U=g.current,C(""),w(s),G(u==="video"?"Loading video preview...":u==="image"?"Loading image preview...":"Loading audio preview..."),await Te(),me("startup:previewUrl:renderer-ready",{kind:u,elapsedMs:k()}),u==="video"){const R=document.createElement("video");if(R.src=s,Ee(R),Re(R),await ze(R),me("startup:previewUrl:video-ready",{elapsedMs:k(),readyState:R.readyState,videoWidth:R.videoWidth,videoHeight:R.videoHeight}),U!==g.current){ye(R,s);return}n.current=R,await Le(R,"video"),await W(R),ge()}else if(u==="image"){const R=new Image;if(R.src=s,R.crossOrigin="anonymous",await Ke(R),me("startup:previewUrl:image-ready",{elapsedMs:k(),naturalWidth:R.naturalWidth,naturalHeight:R.naturalHeight}),U!==g.current)return;n.current=null,He(),L(),await Le(R,"image"),ge()}else{const R=document.createElement("audio");if(R.src=s,Ee(R),Re(R),await Ie(R),me("startup:previewUrl:audio-ready",{elapsedMs:k(),readyState:R.readyState,duration:R.duration}),U!==g.current){ye(R,s);return}r.current=null,i("audio"),q(null),h(null),n.current=R,se(),await W(R),ge()}if(U!==g.current)return;(u==="video"||u==="audio")&&(await Ne(),await Be()),U===g.current&&(N(),me("startup:previewUrl:done",{kind:u,elapsedMs:k()}))}catch(R){if(me("startup:previewUrl:error",{kind:u,elapsedMs:k(),error:R instanceof Error?R.message:String(R)}),U!==g.current||_e(R))return;Se(),C(R instanceof Error?R.message:String(R))}},startDisplayCapture:ke,stopDisplayCapture:Xe,syncVideoState:ge,releaseDetachedMedia:ye,ensurePixiReady:Te}}let zn=0;const fo=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),vo=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),jn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function Zn(t,e,o=1){const r=l.useRef(`player-${zn+=1}`),n=l.useRef(null),c=l.useRef(null),m=l.useRef(!1),a=l.useRef(null),g=l.useRef(null),T=l.useRef([]),M=l.useRef(null),A=l.useRef(null),D=l.useRef(null),O=l.useRef(null),y=l.useRef(null),J=l.useRef(0),j=l.useRef(!1),Y=l.useRef(null),Z=l.useRef(!1),[x,ee]=l.useState(""),[b,fe]=l.useState(""),[ne,p]=l.useState(!0),[$,K]=l.useState(""),[H,re]=l.useState(!1),[X,I]=l.useState(!1),[w,C]=l.useState(!1),[ie,z]=l.useState(0),[de,_]=l.useState(0),[B,v]=l.useState(null),[q,h]=l.useState(null),[i,V]=l.useState(!1),[G,N]=l.useState(null),P=(S,E)=>{if(!jn())return;const oe=E?` ${JSON.stringify(E)}`:"";console.log(`[retro-player video][${r.current}] ${S}${oe}`)},L=On({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:ne,isPlayingRef:j,previewKindRef:Y,debugVideo:P}),{canvasHostRef:W,appRef:le,spriteRef:xe,textureRef:ae,previewElementRef:se,filterRef:he,isRendererReady:we,viewportRect:Ce,setViewportRect:me,applyFilterState:ve,destroyPixi:Ne,fitSprite:be,initPixi:He,refreshLayout:De,resetFilterInstance:_e,safeRender:ye,scheduleRefreshLayout:ze,syncSpriteFilter:Ie,syncTexturePresentation:Ke}=L,Re=l.useRef(He),Ee=l.useRef(Ne),ge=l.useRef(()=>{}),Se=l.useRef(()=>{}),Oe=Mn({instanceLabel:r.current,previewKind:B,previewKindRef:Y,mediaRef:a,isPlaying:w,isPlayingRef:j}),{audioContextRef:Me,mediaSourceRef:Be,masterGainRef:Te,recordingDestinationRef:Le,noiseGainRef:We,isMutedRef:ke,volumeRef:Xe,playbackRateRef:Ve,isLoopingRef:qe,isMuted:s,setIsMuted:u,playbackRate:U,setPlaybackRate:ce,volume:k,setVolume:R,isLooping:Ae,setIsLooping:te,isAudioFxEnabled:ot,setIsAudioFxEnabled:At,lofiAmount:nt,setLofiAmount:xt,radioToneAmount:wt,setRadioToneAmount:Ct,bitCrushAmount:rt,setBitCrushAmount:St,sampleRateReductionAmount:it,setSampleRateReductionAmount:yt,bassAmount:at,setBassAmount:Rt,midAmount:st,setMidAmount:Tt,trebleAmount:lt,setTrebleAmount:Dt,stereoWidthAmount:ct,setStereoWidthAmount:Lt,smallSpeakerRoomAmount:ut,setSmallSpeakerRoomAmount:Mt,wowFlutterAmount:Bt,setWowFlutterAmount:Pt,isNoiseEnabled:Et,setIsNoiseEnabled:It,noiseLevel:kt,setNoiseLevel:Ft,vinylDustAmount:Gt,setVinylDustAmount:Nt,delayAmount:Je,setDelayAmount:dt,reverbAmount:Wt,setReverbAmount:$e,chorusAmount:Ut,setChorusAmount:Ht,tapeSaturationAmount:ht,setTapeSaturationAmount:Ot,compressorAmount:Vt,setCompressorAmount:_t,fxOutputTrimAmount:zt,setFxOutputTrimAmount:jt,debugAudio:Zt,ensureAudioContext:d,updateAudioNodes:Pe,connectMediaAudio:je,reconnectCurrentMediaAudio:eo,resetAudioSettings:yo,disposeAudioEngine:to}=Oe;l.useEffect(()=>{Re.current=He,Ee.current=Ne},[He,Ne]);const Ro=S=>{Y.current=S,v(S)},To=S=>{K(S),re(!0)},Qe=()=>{re(!1),K("")},oo=()=>{p(!0),le.current?.ticker.start()},Do=()=>{a.current&&a.current.pause(),We.current&&(We.current.gain.value=0),Te.current&&(Te.current.gain.value=0),Qe(),I(!1),p(!1),le.current?.ticker.stop(),Ye()},Lo=_n({filterState:t,appRef:le,spriteRef:xe,textureRef:ae,previewElementRef:se,filterRef:he,mediaRef:a,objectUrlRef:n,streamRef:c,streamOwnedRef:m,previewRequestIdRef:J,isPlayingRef:j,previewKindRef:Y,audioContextRef:Me,mediaSourceRef:Be,masterGainRef:Te,noiseGainRef:We,isMutedRef:ke,volumeRef:Xe,playbackRateRef:Ve,isLoopingRef:qe,isAudioFxEnabled:ot,lofiAmount:nt,bitCrushAmount:rt,sampleRateReductionAmount:it,bassAmount:at,midAmount:st,trebleAmount:lt,stereoWidthAmount:ct,smallSpeakerRoomAmount:ut,isMuted:s,volume:k,previewKind:B,setPreviewName:ee,setPreviewError:fe,setNeedsUserPlay:I,setIsPlaying:C,setCurrentTime:z,setDuration:_,setPlaybackRate:ce,setIsLooping:te,setSourceDimensions:h,setViewportRect:me,setPreviewKindState:Ro,setIsPoweredOn:p,beginLoading:To,finishLoading:Qe,ensureAudioContext:d,updateAudioNodes:Pe,connectMediaAudio:je,fitSprite:be,refreshLayout:De,scheduleRefreshLayout:ze,safeRender:ye,resetFilterInstance:_e,initPixi:He,debugVideo:P,debugAudio:Zt}),{cleanupPreview:no,cleanupForPageLeave:Mo,playVideoWithAudio:ro,previewFile:Bo,previewStream:Po,previewUrl:Eo,startDisplayCapture:Io,stopDisplayCapture:ko,syncVideoState:Ye}=Lo;l.useEffect(()=>{ge.current=no},[no]),l.useEffect(()=>{Se.current=to},[to]);const io=async()=>{if(a.current){if(a.current.paused){ne||oo(),await ro(),Ye();return}a.current.pause(),Ye()}},Fo=()=>{a.current&&u(S=>{const E=!S;return ke.current=E,window.requestAnimationFrame(Pe),E})},et=S=>{a.current&&(a.current.currentTime=S,z(S))},Go=S=>{if(!a.current)return;const E=1/30,oe=Math.max(0,Math.min(a.current.currentTime+E*S,a.current.duration||a.current.currentTime+E));a.current.pause(),a.current.currentTime=oe,Ye()},No=S=>{a.current&&(a.current.playbackRate=S,Ve.current=S,ce(S))},Wo=S=>{a.current&&(Xe.current=S,ke.current=S===0,R(S),u(S===0),window.requestAnimationFrame(Pe))},Uo=()=>{a.current&&(a.current.loop=!a.current.loop,qe.current=a.current.loop,te(a.current.loop))},Ho=S=>{qe.current=S,te(S),a.current&&(a.current.loop=S)},mt=()=>{if(!A.current||typeof window>"u"){D.current=null,O.current=null;return}window.URL.revokeObjectURL(A.current),A.current=null,D.current=null,O.current=null},Oo=(S,E)=>{if(typeof document>"u")return;const oe=document.createElement("a");oe.href=S,oe.download=E,oe.rel="noopener",oe.style.display="none",document.body.appendChild(oe),oe.click(),window.setTimeout(()=>{oe.remove()},0)},Vo=(S,E)=>{if(typeof window>"u"||S.length===0)return null;mt();const oe=new Blob(S,{type:E||"video/webm"}),Ue=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ge=window.URL.createObjectURL(oe);return A.current=Ge,D.current=oe,O.current=Ue,N(Ue),Ue},_o=()=>{const S=A.current,E=O.current;!S||!E||typeof window>"u"||(Oo(S,E),window.setTimeout(()=>{mt()},1e3),N(null))},zo=async()=>{const S=D.current,E=O.current;if(!S||!E||typeof window>"u")return!1;if(fo()){const Ue=new Uint8Array(await S.arrayBuffer()),Ge=await Co("persist_recording_for_share",{data:Array.from(Ue),filename:E});return await hn(Ge,{mimeType:S.type||"video/webm",title:E}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Fe={files:[new File([S],E,{type:S.type||"video/webm"})],title:E};return typeof navigator.canShare=="function"&&!navigator.canShare(Fe)?!1:(await navigator.share(Fe),!0)},jo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(E=>MediaRecorder.isTypeSupported(E))??"",Zo=async()=>{const S=le.current?.canvas;if(!(S instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await d();const E=new MediaStream;S.captureStream(30).getVideoTracks().forEach(Ge=>E.addTrack(Ge)),Le.current?.stream.getAudioTracks().forEach(Ge=>E.addTrack(Ge.clone()));const Fe=jo(),Ue=Fe?new MediaRecorder(E,{mimeType:Fe}):new MediaRecorder(E);T.current=[],mt(),N(null),M.current=E,g.current=Ue,Ue.addEventListener("dataavailable",Ge=>{Ge.data.size>0&&T.current.push(Ge.data)}),Ue.addEventListener("stop",()=>{const Ge=Vo(T.current,Ue.mimeType);T.current=[],M.current?.getTracks().forEach(Xo=>Xo.stop()),M.current=null,g.current=null,V(!1),y.current?.(Ge),y.current=null},{once:!0}),Ue.start(),V(!0)},ao=(S=!0)=>{const E=g.current;return E?new Promise(oe=>{if(y.current=oe,S||(T.current=[]),E.state!=="inactive"){E.stop();return}M.current?.getTracks().forEach(Fe=>Fe.stop()),M.current=null,g.current=null,V(!1),y.current?.(O.current),y.current=null}):Promise.resolve(O.current)};return l.useEffect(()=>{let S=!1;return(async()=>(P("startup:setupPixi-effect:start",{renderResolutionScale:o}),await Re.current(),S&&Ee.current()))(),()=>{mt(),ao(!1),S=!0,Ee.current()}},[o]),l.useEffect(()=>()=>{ge.current(),Se.current()},[]),l.useEffect(()=>{const S=()=>{Mo()};return window.addEventListener("beforeunload",S),()=>{window.removeEventListener("beforeunload",S)}},[]),l.useEffect(()=>{const S=()=>{a.current&&(a.current.muted=!0,a.current.volume=0,a.current.pause(),Ye())};return window.addEventListener(so,S),()=>{window.removeEventListener(so,S)}},[Ye]),l.useEffect(()=>{if(!vo())return;const S=oe=>oe==="video"||oe==="audio"||oe==="capture",E=()=>{const oe=a.current;if(!(!oe||!S(Y.current))){if(document.visibilityState==="hidden"){Z.current=!oe.paused,oe.pause(),j.current=!1,C(!1),We.current&&(We.current.gain.value=0),Te.current&&(Te.current.gain.value=0),Me.current?.state==="running"&&Me.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await d(),eo(),Pe(),Z.current&&a.current)try{await a.current.play(),I(!1)}catch(Fe){Fe instanceof DOMException&&Fe.name==="NotAllowedError"&&I(!0)}}finally{Ye(),Z.current=!1}})()},80)}};return document.addEventListener("visibilitychange",E),()=>{document.removeEventListener("visibilitychange",E)}},[Me,d,Te,We,eo,Ye,Pe]),l.useLayoutEffect(()=>{ve(),Ie(),Ke(),De()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,De]),l.useEffect(()=>{if(b||X){Qe();return}if(B==="image"||B==="audio"){Qe();return}w&&Qe()},[b,X,B,w]),l.useEffect(()=>{j.current=w;const S=(B==="video"||B==="capture")&&a.current?.tagName==="VIDEO",E=!a.current||Math.abs(a.current.currentTime)<.05,oe=a.current?.ended??!1;S&&Qe(),S&&!w&&!b&&!oe&&(Me.current?.state==="suspended"||E)&&I(!0)},[Me,w,b,B]),l.useEffect(()=>{const S=E=>{if(!a.current)return;const oe=E.target;if(!(oe instanceof HTMLInputElement||oe instanceof HTMLTextAreaElement||oe?.isContentEditable)){if(E.code==="Space"||E.code==="KeyK"){E.preventDefault(),io();return}if(E.code==="KeyJ"){E.preventDefault(),et(Math.max(a.current.currentTime-10,0));return}if(E.code==="KeyL"){E.preventDefault(),et(Math.min(a.current.currentTime+10,a.current.duration||a.current.currentTime+10));return}if(E.code==="ArrowLeft"){E.preventDefault(),et(Math.max(a.current.currentTime-5,0));return}E.code==="ArrowRight"&&(E.preventDefault(),et(Math.min(a.current.currentTime+5,a.current.duration||a.current.currentTime+5)))}};return window.addEventListener("keydown",S),()=>{window.removeEventListener("keydown",S)}},[]),{canvasHostRef:W,previewName:x,previewError:b,isRendererReady:we,loadingLabel:$,isLoading:H,needsUserPlay:X,isPlaying:w,isMuted:s,currentTime:ie,duration:de,playbackRate:U,volume:k,isLooping:Ae,sourceDimensions:q,viewportRect:Ce,isAudioFxEnabled:ot,lofiAmount:nt,radioToneAmount:wt,bitCrushAmount:rt,sampleRateReductionAmount:it,bassAmount:at,midAmount:st,trebleAmount:lt,stereoWidthAmount:ct,smallSpeakerRoomAmount:ut,wowFlutterAmount:Bt,isNoiseEnabled:Et,noiseLevel:kt,vinylDustAmount:Gt,delayAmount:Je,reverbAmount:Wt,chorusAmount:Ut,tapeSaturationAmount:ht,setTapeSaturationAmount:Ot,compressorAmount:Vt,setCompressorAmount:_t,fxOutputTrimAmount:zt,setFxOutputTrimAmount:jt,hasPlayableMedia:B==="video"||B==="audio"||B==="capture",hasVideo:B==="video"||B==="capture",hasAudioOnly:B==="audio",hasImage:B==="image",isRecording:i,pendingRecordingFilename:G,prefersShareExport:fo()&&vo(),isCaptureActive:B==="capture",canRecord:B==="video"||B==="capture"||B==="image"||B==="audio",previewFile:Bo,previewStream:Po,previewUrl:Eo,startDisplayCapture:Io,stopDisplayCapture:ko,togglePlayback:io,toggleMute:Fo,seekTo:et,stepFrame:Go,changePlaybackRate:No,changeVolume:Wo,toggleLoop:Uo,setLoopingEnabled:Ho,resetAudioSettings:yo,playVideoWithAudio:ro,isPoweredOn:ne,powerOn:oo,powerOff:Do,downloadPendingRecording:_o,sharePendingRecording:zo,startRecording:Zo,stopRecording:ao,refreshLayout:De,toggleAudioFx:()=>{At(S=>!S)},setLofiAmount:xt,setRadioToneAmount:Ct,setBitCrushAmount:St,setSampleRateReductionAmount:yt,setBassAmount:Rt,setMidAmount:Tt,setTrebleAmount:Dt,setStereoWidthAmount:Lt,setSmallSpeakerRoomAmount:Mt,setWowFlutterAmount:Pt,toggleNoise:()=>{It(S=>!S)},setNoiseLevel:Ft,setVinylDustAmount:Nt,setDelayAmount:dt,setReverbAmount:$e,setChorusAmount:Ht}}const pe=tt.pc98_512,bo=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,Kt=t=>{for(const[e,o]of Object.entries(tt))if(bo(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(tt))if(bo(t,o,{ignoreDimensions:!0}))return e;return null},Xn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function Yn(t={}){const[e]=l.useState(()=>({targetWidth:t.targetWidth??pe.width,targetHeight:t.targetHeight??pe.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??pe.colors,ditherStrength:t.ditherStrength??pe.dither,paletteMode:t.paletteMode??pe.palette,curvature:t.curvature??pe.curvature,scanlineStrength:t.scanlineStrength??pe.scanline,scanline2Strength:t.scanline2Strength??pe.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??pe.vignette,glowStrength:t.glowStrength??pe.glow,smoothStrength:t.smoothStrength??pe.smoothStrength??0,toonSteps:t.toonSteps??pe.toonSteps??0,edgeBoost:t.edgeBoost??pe.edgeBoost??0,phosphorStrength:t.phosphorStrength??pe.phosphor,spotMaskStrength:t.spotMaskStrength??pe.spotMask,bulbRadius:t.bulbRadius??pe.bulbRadius,blackFloor:t.blackFloor??pe.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??pe.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??pe.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??pe.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??pe.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??pe.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??pe.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??pe.monoTint,neonBoost:t.neonBoost??pe.neonBoost,neonSaturation:t.neonSaturation??pe.neonSaturation,neonDetail:t.neonDetail??pe.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=l.useState(()=>({...e,...vt()?.filter,...t})),[r,n]=l.useState(o),[c,m]=l.useState(Kt(o)),a=h=>{m(null),n(i=>i.targetWidth===h?i:{...i,targetWidth:h})},g=h=>{m(null),n(i=>i.targetHeight===h?i:{...i,targetHeight:h})},T=h=>{m(null),n(i=>i.matchTargetAspect===h?i:{...i,matchTargetAspect:h})},M=h=>{m(null),n(i=>({...i,colorLevels:h}))},A=h=>{m(null),n(i=>({...i,ditherStrength:h}))},D=h=>{m(null),n(i=>({...i,paletteMode:h,colorLevels:Xn(h,i.colorLevels)}))},O=h=>{m(null),n(i=>({...i,curvature:h}))},y=h=>{m(null),n(i=>({...i,scanlineStrength:h}))},J=h=>{m(null),n(i=>({...i,scanline2Strength:h}))},j=h=>{m(null),n(i=>({...i,scanlineBrightnessFade:h}))},Y=h=>{m(null),n(i=>({...i,vignetteStrength:h}))},Z=h=>{m(null),n(i=>({...i,glowStrength:h}))},x=h=>{m(null),n(i=>({...i,smoothStrength:h}))},ee=h=>{m(null),n(i=>({...i,toonSteps:h}))},b=h=>{m(null),n(i=>({...i,edgeBoost:h}))},fe=h=>{m(null),n(i=>({...i,phosphorStrength:h}))},ne=h=>{m(null),n(i=>({...i,spotMaskStrength:h}))},p=h=>{m(null),n(i=>({...i,bulbRadius:h}))},$=h=>{m(null),n(i=>({...i,blackFloor:h}))},K=h=>{m(null),n(i=>({...i,phosphorDotLightBalance:h}))},H=h=>{m(null),n(i=>({...i,phosphorDotInternalScale:h}))},re=h=>{m(null),n(i=>({...i,phosphorDotBrightCore:h}))},X=h=>{m(null),n(i=>({...i,phosphorDotCellFill:h}))},I=h=>{m(null),n(i=>({...i,phosphorDotFlatDisc:h}))},w=h=>{m(null),n(i=>({...i,phosphorDotNeighborBlend:h}))},C=h=>{m(null),n(i=>({...i,closeUpNoiseStrength:h}))},ie=h=>{m(null),n(i=>({...i,monoTint:h}))},z=h=>{m(null),n(i=>({...i,neonBoost:h}))},de=h=>{m(null),n(i=>({...i,neonSaturation:h}))},_=h=>{m(null),n(i=>({...i,neonDetail:h}))},B=h=>{n(i=>({...i,isFilterEnabled:h}))},v=h=>{const i=tt[h];m(h),n(V=>({...V,targetWidth:i.width,targetHeight:i.height,colorLevels:i.colors,ditherStrength:i.dither,paletteMode:i.palette,curvature:i.curvature,scanlineStrength:i.scanline,scanline2Strength:i.scanline2,vignetteStrength:i.vignette,glowStrength:i.glow,smoothStrength:i.smoothStrength??0,toonSteps:i.toonSteps??0,edgeBoost:i.edgeBoost??0,phosphorStrength:i.phosphor,spotMaskStrength:i.spotMask,bulbRadius:i.bulbRadius,blackFloor:i.blackFloor,phosphorDotLightBalance:i.phosphorDotLightBalance??1,phosphorDotInternalScale:i.phosphorDotInternalScale??!1,phosphorDotBrightCore:i.phosphorDotBrightCore??!1,phosphorDotCellFill:i.phosphorDotCellFill??0,phosphorDotFlatDisc:i.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:i.phosphorDotNeighborBlend??!1,monoTint:i.monoTint,neonBoost:i.neonBoost,neonSaturation:i.neonSaturation,neonDetail:i.neonDetail,isFilterEnabled:!0}))},q=()=>{m(Kt(e)),n(e)};return l.useEffect(()=>{mn(r)},[r]),l.useEffect(()=>{const h=Kt(r);m(i=>i===h?i:h)},[r]),{...r,selectedPreset:c,setTargetWidth:a,setTargetHeight:g,setMatchTargetAspect:T,setColorLevels:M,setDitherStrength:A,setPaletteMode:D,setCurvature:O,setScanlineStrength:y,setScanline2Strength:J,setScanlineBrightnessFade:j,setVignetteStrength:Y,setGlowStrength:Z,setSmoothStrength:x,setToonSteps:ee,setEdgeBoost:b,setPhosphorStrength:fe,setSpotMaskStrength:ne,setBulbRadius:p,setBlackFloor:$,setPhosphorDotLightBalance:K,setPhosphorDotInternalScale:H,setPhosphorDotBrightCore:re,setPhosphorDotCellFill:X,setPhosphorDotFlatDisc:I,setPhosphorDotNeighborBlend:w,setCloseUpNoiseStrength:C,setMonoTint:ie,setNeonBoost:z,setNeonSaturation:de,setNeonDetail:_,setIsFilterEnabled:B,applyPreset:v,resetSettings:q}}function Kn({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:c,controlPanelMode:m,confirmDialog:a,onHighResolutionChange:g,onFitWidthChange:T,onRefit:M,onError:A}){const D=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},O=F.useMemo(()=>vt()?.ui,[]),[y,J]=F.useState(O?.isPreviewMaximized??!1),[j,Y]=F.useState(!1),[Z,x]=F.useState(!1),[ee,b]=F.useState(0),[fe,ne]=F.useState(null),[p,$]=F.useState(null),K=F.useRef(null),H=F.useRef(null),re=F.useRef(null),X=F.useRef(null),I=F.useCallback(()=>{const P=K.current,L=re.current;if(!P||!L)return null;const W=P.getBoundingClientRect(),le=L.getBoundingClientRect();return{left:W.left,width:W.width,height:le.height}},[]),w=F.useCallback(P=>{X.current!==null&&window.clearTimeout(X.current),X.current=window.setTimeout(()=>{ne(P),X.current=null},120)},[]),C=F.useCallback(()=>{X.current!==null&&(window.clearTimeout(X.current),X.current=null),ne(null)},[]);F.useEffect(()=>{pn({isPreviewMaximized:y,isHighResolution:n})},[n,y]),F.useEffect(()=>()=>{X.current!==null&&window.clearTimeout(X.current)},[]),F.useEffect(()=>{if(!y)return;const P=document.body.style.overflow,L=W=>{W.code==="Escape"&&J(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",L),()=>{document.body.style.overflow=P,window.removeEventListener("keydown",L)}},[y]),F.useEffect(()=>{y&&(Y(!1),x(!1),b(0),$(null))},[y]),F.useEffect(()=>{c&&(Y(!1),x(!1),b(0),$(null))},[c]),F.useEffect(()=>{if(m!=="video-settings"||y||j||c){x(!1),b(0);return}const P=()=>{const L=H.current,W=re.current;if(!L||!W)return;const le=L.getBoundingClientRect().top,xe=W.getBoundingClientRect().height,ae=Math.round(Math.min(xe,window.innerHeight)*.4),se=-Math.max(120,ae);x(he=>{if(!he&&le<=se){b(Math.max(120,ae));const we=I();return we&&$(we),!0}return he&&b(Math.max(120,ae)),he&&le>=-24?(b(0),!1):he})};return P(),window.addEventListener("scroll",P,{passive:!0}),window.addEventListener("resize",P),()=>{window.removeEventListener("scroll",P),window.removeEventListener("resize",P)}},[m,c,y,j,I]),F.useEffect(()=>{if(!((j||Z)&&!y)){$(null);return}const L=()=>{const W=I();W&&$(W)};return L(),window.addEventListener("resize",L),window.addEventListener("scroll",L,{passive:!0}),()=>{window.removeEventListener("resize",L),window.removeEventListener("scroll",L)}},[Z,y,j,c,I,r.sourceDimensions]),F.useEffect(()=>{r.refreshLayout()},[j,y,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const ie=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),z=!y&&!c&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,de=z?`${z}px`:"60vh",_=F.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),B=(j||Z)&&!y,v=Z?`calc(max(0.0rem, env(safe-area-inset-top)) - ${ee}px)`:void 0,q="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",h="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",i="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",V="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",G=(P,L,W="w-44")=>f.jsx("div",{role:"tooltip","aria-hidden":fe!==P,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",W,fe===P?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:L}),N=()=>f.jsxs(f.Fragment,{children:[r.canRecord&&f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{C(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording()||!await a({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"}))return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(P){A?.(P instanceof Error?P:new Error(String(P)))}return}try{await r.startRecording()}catch(P){A?.(P instanceof Error?P:new Error(String(P)))}})()},onMouseEnter:()=>w("record"),onMouseLeave:C,onFocus:()=>w("record"),onBlur:C,className:[V,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?f.jsx(dn,{size:14,className:"fill-current animate-pulse"}):f.jsx(Qo,{size:16,className:"text-rose-300"})}),G("record",r.isRecording?D.recordStop:D.recordIdle)]}),f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(C(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>w("power"),onMouseLeave:C,onFocus:()=>w("power"),onBlur:C,className:[q,r.isPoweredOn?h:i].join(" "),children:f.jsx(sn,{size:16})}),G("power",r.isPoweredOn?D.powerOff:D.powerOn)]}),f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{C(),g(!n)},onMouseEnter:()=>w("hi-res"),onMouseLeave:C,onFocus:()=>w("hi-res"),onBlur:C,className:[q,n?h:i].join(" "),children:f.jsx(Ko,{size:16})}),G("hi-res",D.hiRes)]}),f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":c?"Disable fit width":"Enable fit width",onClick:()=>{C(),T(!c)},onMouseEnter:()=>w("fit-width"),onMouseLeave:C,onFocus:()=>w("fit-width"),onBlur:C,className:[q,c?h:i].join(" "),children:f.jsx(Jo,{size:16})}),G("fit-width",c?D.fitWidthOn:D.fitWidthOff)]}),f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{C(),M()},onMouseEnter:()=>w("refit"),onMouseLeave:C,onFocus:()=>w("refit"),onBlur:C,className:[q,i].join(" "),children:f.jsx(cn,{size:16})}),G("refit",D.refit)]}),f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":B?"Unpin preview":"Pin preview",onClick:()=>{C(),!(y||c)&&Y(P=>{if(!P){const W=I();return W&&$(W),!0}return x(!1),b(0),$(null),!1})},onMouseEnter:()=>w("pin"),onMouseLeave:C,onFocus:()=>w("pin"),onBlur:C,className:[q,y||c?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":B?h:i].join(" "),disabled:y||c,children:f.jsx(rn,{size:16})}),G("pin",y?D.pinUnavailable:c?D.pinUnavailableFitWidth:B?D.pinOn:D.pinOff)]}),f.jsxs("div",{className:"relative",children:[f.jsx("button",{type:"button","aria-label":y?"Exit maximize":"Maximize preview",onClick:()=>{C(),J(P=>!P)},onMouseEnter:()=>w("maximize"),onMouseLeave:C,onFocus:()=>w("maximize"),onBlur:C,className:[q,y?h:i].join(" "),children:y?f.jsx(Xt,{size:16}):f.jsx(tn,{size:16})}),G("maximize",y?D.maximizeOn:D.maximizeOff)]})]});return f.jsxs("div",{ref:K,className:"space-y-4",children:[f.jsx("div",{ref:H,"aria-hidden":"true"}),f.jsxs("div",{ref:re,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${y?c?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":B?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:B&&p?{left:`${p.left}px`,top:v??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${p.width}px`}:y?void 0:{overflow:"visible"},children:[y&&(c?f.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:f.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{J(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:f.jsx(Xt,{size:18})})}):f.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{J(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:f.jsx(Xt,{size:18})})),f.jsxs("div",{className:`relative ${y?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:y?c&&_?{aspectRatio:_,width:"100%"}:void 0:c&&_?{aspectRatio:_,width:"100%"}:_?{aspectRatio:_,width:"100%",height:"min(60vh, calc(100vh - 12rem))",maxHeight:"calc(100vh - 12rem)",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:de,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[f.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[ie&&f.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),f.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&f.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:f.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[f.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),f.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&f.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",ie?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:f.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[f.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),f.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),f.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&f.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:f.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[f.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),f.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),f.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),f.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&f.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!c&&f.jsx("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:N()})]}),c&&y&&f.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:N()})]}),c&&!y&&f.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:N()}),B&&p&&f.jsx("div",{style:{height:`${p.height}px`}})]})}const qn=F.lazy(()=>wo(()=>import("./VideoControls-Dnep4IEo.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),Jn=F.lazy(()=>wo(()=>import("./RetroFilterPanel-DISpEdMr.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Ao=f.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function $n({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:c,onSetTargetWidth:m,onSetTargetHeight:a,onSetMatchTargetAspect:g,onResetSettings:T}){return f.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&f.jsx(F.Suspense,{fallback:Ao,children:f.jsx(qn,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:T,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&f.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&f.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[f.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:f.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),f.jsx(F.Suspense,{fallback:Ao,children:f.jsx(Jn,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:c,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:a,onSetTargetWidth:m,onSetMatchTargetAspect:g,onSetVignetteStrength:o.setVignetteStrength})})]})]})}const Qn=async({title:t,body:e,okText:o,cancelText:r})=>{if(typeof window>"u")return!1;const n=[t,e,o||r?`${o??"OK"} / ${r??"Cancel"}`:""].filter(Boolean).join(`

`);return window.confirm(n)};function xo({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:c,className:m,onError:a,initialFilterState:g,confirmDialog:T=Qn}){const M=F.useMemo(()=>vt()?.ui,[]),[A,D]=F.useState(M?.isHighResolution??!1),[O,y]=F.useState(!1),[J,j]=F.useState("playback"),Y=F.useRef(""),Z=F.useRef(""),x=Yn(g),ee=A&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,b=Zn(x,O?"width":"contain",ee),fe=F.useCallback(()=>{fn(),x.resetSettings(),b.resetAudioSettings(),D(!1)},[x,b]),ne=F.useCallback(()=>{if(!b.sourceDimensions)return;const I=Math.max(8,Math.round(x.targetWidth/b.sourceDimensions.width*b.sourceDimensions.height/8)*8);I!==x.targetHeight&&x.setTargetHeight(I)},[x.targetHeight,x.targetWidth,x.setTargetHeight,b.sourceDimensions]),p=F.useCallback(()=>b.sourceDimensions?.width&&b.sourceDimensions?.height?b.sourceDimensions.width/b.sourceDimensions.height:Math.max(x.targetWidth,1)/Math.max(x.targetHeight,1),[x.targetHeight,x.targetWidth,b.sourceDimensions]),$=F.useCallback(I=>{if(x.setTargetWidth(I),!x.matchTargetAspect)return;const w=Math.max(p(),1e-4);x.setTargetHeight(Math.max(1,Math.round(I/w)))},[x,p]),K=F.useCallback(I=>{if(x.setTargetHeight(I),!x.matchTargetAspect)return;const w=Math.max(p(),1e-4);x.setTargetWidth(Math.max(1,Math.round(I*w)))},[x,p]),H=F.useCallback(I=>{x.setMatchTargetAspect(I),I&&b.sourceDimensions&&ne()},[x,b.sourceDimensions,ne]),re=F.useCallback(I=>{if(x.applyPreset(I),I!=="phosphorDot"||!b.sourceDimensions)return;const w=tt.phosphorDot,C=Math.max(b.sourceDimensions.width,1),ie=Math.max(b.sourceDimensions.height,1),z=C/ie,de=w.width/w.height;let _=w.width,B=w.height;z>de?B=Math.max(8,Math.round(w.width/z/8)*8):_=Math.max(8,Math.round(w.height*z/8)*8),!(w.width===_&&w.height===B)&&(x.setTargetWidth(_),x.setTargetHeight(B))},[x.applyPreset,x.setTargetHeight,x.setTargetWidth,b.sourceDimensions]),X=F.useCallback(()=>{if(o&&b.isCaptureActive){window.setTimeout(()=>{b.previewStream(o,n==="audio"?"audio":"video",r)},120);return}window.requestAnimationFrame(()=>{b.refreshLayout(),window.requestAnimationFrame(()=>{b.refreshLayout()})})},[n,b,o,r]);return F.useEffect(()=>{x.matchTargetAspect&&b.sourceDimensions&&ne()},[x.matchTargetAspect,b.sourceDimensions,ne]),F.useEffect(()=>{if(o){const w=`stream:${o.id}:${n}:${r??""}`;if(Y.current===w)return;Y.current=w,(async()=>{try{await b.previewStream(o,n==="audio"?"audio":"video",r)}catch(C){a?.(C instanceof Error?C:new Error(String(C)))}})();return}if(!e){Y.current="";return}const I=`src:${e}:${n}`;Y.current!==I&&(Y.current=I,(async()=>{try{await b.previewUrl(e,n)}catch(w){a?.(w instanceof Error?w:new Error(String(w)))}})())},[e,o,r,n,a,b]),F.useEffect(()=>{b.refreshLayout()},[O,b.refreshLayout]),F.useEffect(()=>{b.refreshLayout()},[x.targetWidth,x.targetHeight,x.isFilterEnabled,ee,b.refreshLayout]),F.useEffect(()=>{if(typeof c!="boolean")return;const I=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!I){Z.current="";return}const w=`${I}:${c}`;Z.current!==w&&(Z.current=w,b.setLoopingEnabled(c))},[n,c,b,e,o]),f.jsx("section",{className:m??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:f.jsxs("div",{className:"space-y-4",children:[f.jsx(Kn,{locale:t,src:e,kind:n,player:b,isHighResolution:A,isFitWidthEnabled:O,controlPanelMode:J,confirmDialog:T,onHighResolutionChange:D,onFitWidthChange:y,onRefit:X,onError:a}),f.jsx($n,{locale:t,player:b,filterState:x,controlPanelMode:J,onControlPanelModeChange:j,onApplyPreset:re,onSetTargetWidth:$,onSetTargetHeight:K,onSetMatchTargetAspect:H,onResetSettings:fe})]})})}const tr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:xo,default:xo},Symbol.toStringTag,{value:"Module"}));export{Bn as M,bn as R,tt as a,tr as b,cn as c};
