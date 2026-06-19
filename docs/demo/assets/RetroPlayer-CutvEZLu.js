const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-DVcVBI6I.js","./index-Dq7XZV12.js","./index-TRG_Kstf.css","./RetroFilterPanel-WiXdCoLt.js"])))=>i.map(i=>d[i]);
import{b as Ye,r as s,R as ho,a as G,j as b,_ as Ro,u as Qo,s as $o}from"./index-Dq7XZV12.js";const en=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],tn=Ye("aperture",en);const on=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],nn=Ye("arrow-left-right",on);const rn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],an=Ye("circle",rn);const sn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],ln=Ye("maximize-2",sn);const cn=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Qt=Ye("minimize-2",cn);const un=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],dn=Ye("pin",un);const hn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],mn=Ye("power",hn);const pn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],gn=Ye("square",pn);async function To(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function fn(t,e){await To("plugin:sharekit|share_file",{url:t,...e})}const no="tetorica-retro-player.settings",bt=1,At=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(no);if(!t)return null;const e=JSON.parse(t);return e.version!==bt?null:e}catch{return null}},ro=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(no,JSON.stringify(t))}catch{}},xt=()=>At(),vn=t=>{const e=At();ro({version:bt,audio:e?.audio,filter:t,ui:e?.ui})},bn=t=>{const e=At();ro({version:bt,audio:t,filter:e?.filter,ui:e?.ui})},An=t=>{const e=At();ro({version:bt,audio:e?.audio,filter:e?.filter,ui:t})},xn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(no)}catch{}},ce={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,noiseReductionAmount:0,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},Cn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.005,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},wn=Object.fromEntries(Object.entries(Cn).map(([t,e])=>[t,{label:e.label,settings:{...ce,...e.settings}}])),Sn=Object.fromEntries(Object.entries(wn).map(([t,e])=>[t,e.settings])),yn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function Rn(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n+=1){const u=n*2/255-1;o[n]=Math.tanh(u*r)}return o}function mo(t){const o=new Float32Array(256),r=t*8;for(let n=0;n<256;n++){const u=n*2/255-1;r<.001?o[n]=u:o[n]=Math.tanh(u*(1+r))/Math.tanh(1+r)}return o}function Tn(t){const o=Math.max(1,Math.floor(t.sampleRate*2.2)),r=t.createBuffer(2,o,t.sampleRate),n=Math.floor(t.sampleRate*.012);for(let u=0;u<r.numberOfChannels;u+=1){const h=r.getChannelData(u);for(let i=0;i<o;i+=1){if(i<n)continue;const m=(i-n)/(o-n),L=(1-m)**1.8,M=Math.max(0,1-m*2.5),f=Math.sin(m*160+u*.8)*M*.35;h[i]=(Math.random()*2-1+f)*L*.75}}return r}function Dn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n+=1){const u=r.getChannelData(n);for(let h=0;h<u.length;h+=1){const i=h/u.length,m=(1-i)**1.85,L=.78+.22*Math.sin(i*42+n*.9),M=Math.sin(i*130+n*.35)*.08;u[h]=(Math.random()*2-1+M)*m*L*.28}}return r}function Ln(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let u=0;u<e;u+=1){const h=Math.random()*2-1;r=(r+h*.045)/1.045,n=n*.82+h*.18;const i=r*1.35,m=(h-n)*.55,L=Math.max(-1,Math.min(1,i+m));for(let M=0;M<o.numberOfChannels;M+=1){const f=o.getChannelData(M),W=(Math.random()*2-1)*.012;f[u]=Math.max(-1,Math.min(1,L+W))}}return o}function Mn(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const h=Math.random()*2-1;n=n*.72+h*.28,o[r]+=(h-n)*.018;const i=Math.random();if(i<.0034){const m=8+Math.floor(Math.random()*42),L=.11+Math.random()*.28,M=Math.random()<.5?-1:1;for(let f=0;f<m&&r+f<e;f+=1){const W=Math.exp(-f/(2.4+Math.random()*5));o[r+f]+=M*L*W*(.7+Math.random()*.3)}r+=m+Math.floor(Math.random()*640);continue}if(i<.0038){const m=90+Math.floor(Math.random()*260),L=.055+Math.random()*.11,M=Math.random()*Math.PI*2;for(let f=0;f<m&&r+f<e;f+=1){const W=Math.exp(-f/(18+Math.random()*40)),S=Math.sin(M+f*(.22+Math.random()*.06));o[r+f]+=L*W*S}r+=m+Math.floor(Math.random()*2200);continue}r+=1}const u=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<u.numberOfChannels;h+=1){const i=u.getChannelData(h);for(let m=0;m<e;m+=1){const L=(Math.random()*2-1)*.0035;i[m]=Math.max(-1,Math.min(1,o[m]+L))}}return u}function En(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function Do({preset:t,params:e}){return{...ce,...t?Sn[t]:null,...e}}class Bn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:u=!0,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=u,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){yn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...ce,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=Do({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,u=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,i=this.nodes.lofiDrive,m=this.nodes.bitcrusher,L=this.nodes.bassEq,M=this.nodes.midEq,f=this.nodes.trebleEq,W=this.nodes.stereoWidth,S=this.nodes.roomDryGain,N=this.nodes.roomWetGain,K=this.nodes.wowFlutterDelay,J=this.nodes.wowLfo,te=this.nodes.wowLfoGain,Q=this.nodes.flutterLfo,Y=this.nodes.flutterLfoGain,_=this.nodes.noiseGain,A=this.nodes.crackleGain,de=this.nodes.vinylDustBedFilter,D=this.nodes.vinylDustBedGain,{settings:v,isPlaying:he,isOutputEnabled:j}=this.runtimeState,U=v.isMuted||!j?0:v.volume;if(e&&(e.gain.value=U),o&&r&&n){const g=v.isAudioFxEnabled?v.radioToneAmount:0;o.frequency.value=20+g*430,o.Q.value=.4+g*.35,r.frequency.value=2e4-g*17400,r.Q.value=.2+g*.9,n.frequency.value=1700,n.Q.value=.8+g*1.4,n.gain.value=g*6}if(u&&h&&i){const g=v.isAudioFxEnabled?v.lofiAmount:0;u.frequency.value=16e3-g*14200,u.Q.value=.3+g*1.8,h.gain.value=-g*18;try{i.curve=Rn(g*.6)}catch{}}if(m){const g=v.isAudioFxEnabled,se=16-(g?v.bitCrushAmount:0)*12,a=1+(g?v.sampleRateReductionAmount:0)*23,l=g?Math.max(v.bitCrushAmount,v.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(se,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(a,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(l,m.context.currentTime)}const H=this.nodes.postCrushLowpass;if(H){const g=v.isAudioFxEnabled?v.noiseReductionAmount:0;H.frequency.value=Math.max(3e3,18e3-g*15e3)}if(L&&M&&f){const g=v.isAudioFxEnabled?15:0;L.gain.value=v.bassAmount*g,M.gain.value=v.midAmount*g,f.gain.value=v.trebleAmount*g}if(W){const g=v.isAudioFxEnabled?1+v.stereoWidthAmount:1;W.parameters.get("width")?.setValueAtTime(g,W.context.currentTime)}if(S&&N){const g=v.isAudioFxEnabled?v.smallSpeakerRoomAmount:0;S.gain.value=Math.max(.52,1-g*.42),N.gain.value=g*.95}if(K&&J&&te&&Q&&Y){const g=v.isAudioFxEnabled?v.wowFlutterAmount:0;K.delayTime.value=.006+g*.004,J.frequency.value=.18+g*.42,te.gain.value=g*.0023,Q.frequency.value=5.2+g*6.5,Y.gain.value=g*6e-4}if(_&&(_.gain.value=v.isNoiseEnabled&&!v.isMuted&&j&&he?Math.min(.24,v.noiseLevel*5.5):0),A){const g=v.isNoiseEnabled&&!v.isMuted&&j&&he;A.gain.value=g?Math.min(.24,v.vinylDustAmount*.22+v.noiseLevel*.25):0}if(de&&D){const se=v.isNoiseEnabled&&!v.isMuted&&j&&he?v.vinylDustAmount:0;de.frequency.value=2100+se*2600,de.Q.value=.35+se*.25,D.gain.value=se*.11}const oe=this.nodes.echoDelayLine,V=this.nodes.echoFeedbackGain,P=this.nodes.echoWetGain;if(oe&&V&&P){const g=v.isAudioFxEnabled?v.delayAmount:0;V.gain.value=g*.5,P.gain.value=g*.55}const x=this.nodes.hallReverbWetGain;if(x){const g=v.isAudioFxEnabled?v.reverbAmount:0;x.gain.value=g*2}const T=this.nodes.chorusLfoGain1,$=this.nodes.chorusLfoGain2,z=this.nodes.chorusWetGain;if(T&&$&&z){const g=v.isAudioFxEnabled?v.chorusAmount:0;z.gain.value=g*.6,T.gain.value=g*.005,$.gain.value=g*.006}const ne=this.nodes.tapeSaturator;if(ne)try{ne.curve=mo(v.isAudioFxEnabled?v.tapeSaturationAmount:0)}catch{}const E=this.nodes.busCompressor;if(E){const g=v.isAudioFxEnabled?v.compressorAmount:0;E.threshold.value=-36*g,E.ratio.value=1+9*g}const ae=this.nodes.fxOutputGain;ae&&(ae.gain.value=v.isAudioFxEnabled?v.fxOutputTrimAmount:1)}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const u=o.createBiquadFilter(),h=o.createBiquadFilter(),i=o.createBiquadFilter(),m=o.createBiquadFilter(),L=o.createBiquadFilter(),M=o.createWaveShaper();let f=null,W=null;const S=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&S){const le=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICAgIG5zRXJyb3I6IDAsICAvLyBub2lzZSBzaGFwaW5nIGZlZWRiYWNrCiAgICAgIH0pOwogICAgfQoKICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbENvdW50OyBjaGFubmVsICs9IDEpIHsKICAgICAgY29uc3QgaW5wdXRDaGFubmVsID0gaW5wdXQ/LltjaGFubmVsXSA/PyBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IG91dHB1dENoYW5uZWwgPSBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jaGFubmVsU3RhdGVbY2hhbm5lbF07CgogICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3V0cHV0Q2hhbm5lbC5sZW5ndGg7IGluZGV4ICs9IDEpIHsKICAgICAgICBjb25zdCBiaXREZXB0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLmJpdERlcHRoLCBpbmRleCk7CiAgICAgICAgY29uc3QgaG9sZEZyYW1lcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQocmVhZFBhcmFtKHBhcmFtZXRlcnMuaG9sZEZyYW1lcywgaW5kZXgpKSk7CiAgICAgICAgY29uc3QgbWl4ID0gcmVhZFBhcmFtKHBhcmFtZXRlcnMubWl4LCBpbmRleCk7CiAgICAgICAgY29uc3Qgc291cmNlID0gaW5wdXRDaGFubmVsPy5baW5kZXhdID8/IDA7CgogICAgICAgIGlmIChzdGF0ZS5ob2xkQ291bnRlciA8PSAwKSB7CiAgICAgICAgICAvLyDkuInop5Ljg4fjgqPjgrbjg6rjg7PjgrA6IOmHj+WtkOWMluatquOBvyDihpIg44K144Op44K144Op44GX44Gf44OS44K56Z+z44Gr5aSJ5o+bCiAgICAgICAgICBjb25zdCBsc2IgPSAyIC8gTWF0aC5wb3coMiwgYml0RGVwdGgpOwogICAgICAgICAgY29uc3QgZGl0aGVyID0gKE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpIC0gMSkgKiBsc2I7CiAgICAgICAgICAvLyAx5qyh44OO44Kk44K644K344Kn44O844OU44Oz44KwOiDliY3lm57jga7ph4/lrZDljJboqqTlt67jgpLjg5XjgqPjg7zjg4njg5Djg4Pjgq/jgZfjgabpq5jln5/jgbjmirzjgZflh7rjgZkKICAgICAgICAgIGNvbnN0IHNoYXBlZCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBzb3VyY2UgKyBkaXRoZXIgLSBzdGF0ZS5uc0Vycm9yICogMC44NSkpOwogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNoYXBlZCwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUubnNFcnJvciA9IHN0YXRlLmhlbGRTYW1wbGUgLSBzaGFwZWQ7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciA9IGhvbGRGcmFtZXMgLSAxOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciAtPSAxOwogICAgICAgIH0KCiAgICAgICAgb3V0cHV0Q2hhbm5lbFtpbmRleF0gPSBzb3VyY2UgKyAoc3RhdGUuaGVsZFNhbXBsZSAtIHNvdXJjZSkgKiBtaXg7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gdHJ1ZTsKICB9Cn0KCmZ1bmN0aW9uIHJlYWRQYXJhbSh2YWx1ZXMsIGluZGV4KSB7CiAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IDEgPyB2YWx1ZXNbMF0gOiB2YWx1ZXNbaW5kZXhdOwp9CgpmdW5jdGlvbiBxdWFudGl6ZVNhbXBsZShzYW1wbGUsIGJpdERlcHRoKSB7CiAgY29uc3QgcmVzb2x2ZWRCaXREZXB0aCA9IE1hdGgubWF4KDIsIE1hdGgubWluKDE2LCBNYXRoLnJvdW5kKGJpdERlcHRoKSkpOwogIGlmIChyZXNvbHZlZEJpdERlcHRoID49IDE2KSB7CiAgICByZXR1cm4gc2FtcGxlOwogIH0KCiAgY29uc3QgbGV2ZWxzID0gMiAqKiByZXNvbHZlZEJpdERlcHRoOwogIGNvbnN0IG5vcm1hbGl6ZWQgPSAoc2FtcGxlICsgMSkgKiAwLjU7CiAgY29uc3QgcXVhbnRpemVkID0gTWF0aC5yb3VuZChub3JtYWxpemVkICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTsKICByZXR1cm4gcXVhbnRpemVkICogMiAtIDE7Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1iaXRjcnVzaGVyIiwgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(le.href),f=new S(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const we=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(we.href),W=new S(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const N=o.createBiquadFilter();N.type="lowpass",N.frequency.value=18e3,N.Q.value=.5;const K=o.createBiquadFilter(),J=o.createBiquadFilter(),te=o.createBiquadFilter(),Q=o.createGain(),Y=o.createConvolver(),_=o.createGain(),A=o.createDelay(.05),de=o.createOscillator(),D=o.createGain(),v=o.createOscillator(),he=o.createGain();u.type="highpass",h.type="lowpass",i.type="peaking",m.type="lowpass",L.type="highshelf",K.type="lowshelf",K.frequency.value=180,J.type="peaking",J.frequency.value=1200,J.Q.value=.5,te.type="highshelf",te.frequency.value=2800,Y.buffer=Dn(o),L.frequency.value=2800,M.oversample="4x",A.delayTime.value=.006,de.type="sine",v.type="sine",de.connect(D),D.connect(A.delayTime),v.connect(he),he.connect(A.delayTime),A.connect(u),u.connect(h),h.connect(i),i.connect(m),m.connect(L),L.connect(M),f?(M.connect(f),f.connect(N)):M.connect(N),N.connect(K),K.connect(J),J.connect(te);const j=o.createWaveShaper();j.curve=mo(0),j.oversample="4x",te.connect(j),W?(j.connect(W),W.connect(Q),W.connect(Y)):(j.connect(Q),j.connect(Y)),Y.connect(_),Q.connect(r),_.connect(r);const U=o.createGain();U.gain.value=1;const H=o.createDynamicsCompressor();H.knee.value=10,H.attack.value=.003,H.release.value=.12,H.threshold.value=0,H.ratio.value=1;const oe=o.createDelay(1);oe.delayTime.value=.32;const V=o.createGain();V.gain.value=0;const P=o.createGain();P.gain.value=0;const x=o.createConvolver();x.buffer=Tn(o);const T=o.createGain();T.gain.value=0;const $=o.createDelay(.05),z=o.createDelay(.05);$.delayTime.value=.018,z.delayTime.value=.023;const ne=o.createOscillator(),E=o.createOscillator();ne.type="sine",E.type="sine",ne.frequency.value=.8,E.frequency.value=1.3;const ae=o.createGain(),g=o.createGain();ae.gain.value=0,g.gain.value=0;const se=o.createGain();se.gain.value=0,r.connect(U),r.connect(oe),oe.connect(V),V.connect(oe),oe.connect(P),P.connect(U),r.connect(x),x.connect(T),T.connect(U),r.connect($),r.connect(z),ne.connect(ae),ae.connect($.delayTime),E.connect(g),g.connect(z.delayTime),$.connect(se),z.connect(se),se.connect(U),ne.start(),E.start();const a=o.createGain();a.gain.value=1,U.connect(H),H.connect(a),this.connectOutputToDestination&&a.connect(o.destination),n&&this.connectOutputToRecordingDestination&&a.connect(n);const l=o.createBufferSource();l.buffer=Ln(o),l.loop=!0;const F=o.createBiquadFilter();F.type="highpass",F.frequency.value=1100,F.Q.value=.25;const y=o.createBiquadFilter();y.type="lowpass",y.frequency.value=5600,y.Q.value=.18;const I=o.createBiquadFilter();I.type="peaking",I.frequency.value=2400,I.Q.value=.7,I.gain.value=-2.5;const k=o.createStereoPanner(),q=o.createGain(),fe=o.createOscillator(),ve=o.createGain(),me=o.createBufferSource(),Z=o.createBiquadFilter(),pe=o.createBiquadFilter(),xe=o.createGain(),Re=o.createGain();r.gain.value=0,q.gain.value=0,fe.type="sine",fe.frequency.value=.021,ve.gain.value=.08,me.buffer=Mn(o),me.loop=!0,Z.type="highpass",Z.frequency.value=1250,Z.Q.value=.35,pe.type="bandpass",pe.frequency.value=2400,pe.Q.value=.4,xe.gain.value=0,Re.gain.value=0,l.connect(F),F.connect(y),y.connect(I),I.connect(k),k.connect(q),q.connect(r),fe.connect(ve),ve.connect(k.pan),me.connect(Z),Z.connect(Re),Re.connect(r),me.connect(pe),pe.connect(xe),xe.connect(r),l.start(),fe.start(),me.start(),de.start(),v.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:u,radioToneLowpass:h,radioTonePresence:i,recordingDestination:n,lofiLowpass:m,lofiHighshelf:L,lofiDrive:M,bitcrusher:f,postCrushLowpass:N,bassEq:K,midEq:J,trebleEq:te,stereoWidth:W,roomDryGain:Q,roomConvolver:Y,roomWetGain:_,wowFlutterDelay:A,wowLfo:de,wowLfoGain:D,flutterLfo:v,flutterLfoGain:he,noiseSource:l,noiseFilter:I,noisePanner:k,noiseGain:q,noiseLfo:fe,noiseLfoGain:ve,crackleSource:me,crackleFilter:Z,vinylDustBedFilter:pe,vinylDustBedGain:xe,crackleGain:Re,outputBus:U,echoDelayLine:oe,echoFeedbackGain:V,echoWetGain:P,hallReverbConvolver:x,hallReverbWetGain:T,chorusDelay1:$,chorusDelay2:z,chorusLfo1:ne,chorusLfo2:E,chorusLfoGain1:ae,chorusLfoGain2:g,chorusWetGain:se,tapeSaturator:j,busCompressor:H,fxOutputGain:a})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const u=this.output;if(!u){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(En(e)){u.connect(e,o);return}u.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}try{this.nodes.chorusLfo1?.stop()}catch{}try{this.nodes.chorusLfo2?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function Pn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const u={settings:Do(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new Bn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:u,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function $t(){if(typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc.")return!1;const t=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(t)}function ee(t){return{get current(){return t()}}}function In({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:u}){const[h]=s.useState(()=>new AudioContext),[i]=s.useState(()=>{const d=xt()?.audio;return{isMuted:d?.isMuted??ce.isMuted,volume:d?.volume??ce.volume,playbackRate:d?.playbackRate??ce.playbackRate,isLooping:d?.isLooping??ce.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??ce.isAudioFxEnabled,lofiAmount:d?.lofiAmount??ce.lofiAmount,radioToneAmount:d?.radioToneAmount??ce.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??ce.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??ce.sampleRateReductionAmount,noiseReductionAmount:d?.noiseReductionAmount??ce.noiseReductionAmount,bassAmount:d?.bassAmount??ce.bassAmount,midAmount:d?.midAmount??ce.midAmount,trebleAmount:d?.trebleAmount??ce.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??ce.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??ce.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??ce.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??ce.isNoiseEnabled,noiseLevel:d?.noiseLevel??ce.noiseLevel,vinylDustAmount:d?.vinylDustAmount??ce.vinylDustAmount,delayAmount:d?.delayAmount??ce.delayAmount,reverbAmount:d?.reverbAmount??ce.reverbAmount,chorusAmount:d?.chorusAmount??ce.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??ce.tapeSaturationAmount,compressorAmount:d?.compressorAmount??ce.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??ce.fxOutputTrimAmount}}),m=s.useRef(i.isMuted),L=s.useRef(i.volume),M=s.useRef(i.playbackRate),f=s.useRef(i.isLooping),W=s.useRef(i.isAudioFxEnabled),S=s.useRef(i.lofiAmount),N=s.useRef(i.radioToneAmount),K=s.useRef(i.bitCrushAmount),J=s.useRef(i.sampleRateReductionAmount),te=s.useRef(i.noiseReductionAmount),Q=s.useRef(i.bassAmount),Y=s.useRef(i.midAmount),_=s.useRef(i.trebleAmount),A=s.useRef(i.stereoWidthAmount),de=s.useRef(i.smallSpeakerRoomAmount),D=s.useRef(i.wowFlutterAmount),v=s.useRef(i.isNoiseEnabled),he=s.useRef(i.noiseLevel),j=s.useRef(i.vinylDustAmount),U=s.useRef(i.delayAmount),H=s.useRef(i.reverbAmount),oe=s.useRef(i.chorusAmount),V=s.useRef(i.tapeSaturationAmount),P=s.useRef(i.compressorAmount),x=s.useRef(i.fxOutputTrimAmount),[T,$]=s.useState(i.isMuted),[z,ne]=s.useState(i.playbackRate),[E,ae]=s.useState(i.volume),[g,se]=s.useState(i.isLooping),[a,l]=s.useState(i.isAudioFxEnabled),[F,y]=s.useState(i.lofiAmount),[I,k]=s.useState(i.radioToneAmount),[q,fe]=s.useState(i.bitCrushAmount),[ve,me]=s.useState(i.sampleRateReductionAmount),[Z,pe]=s.useState(i.noiseReductionAmount),[xe,Re]=s.useState(i.bassAmount),[le,we]=s.useState(i.midAmount),[De,Te]=s.useState(i.trebleAmount),[Me,Ne]=s.useState(i.stereoWidthAmount),[Ee,Pe]=s.useState(i.smallSpeakerRoomAmount),[Be,Ze]=s.useState(i.wowFlutterAmount),[We,Ie]=s.useState(i.isNoiseEnabled),[ye,ge]=s.useState(i.noiseLevel),[be,Qe]=s.useState(i.vinylDustAmount),[Se,ze]=s.useState(i.delayAmount),[Ae,Ue]=s.useState(i.reverbAmount),[Le,Xe]=s.useState(i.chorusAmount),[ke,$e]=s.useState(i.tapeSaturationAmount),[Oe,c]=s.useState(i.compressorAmount),[w,O]=s.useState(i.fxOutputTrimAmount),X=s.useRef(null),[p]=s.useState(()=>Pn({context:h,instanceLabel:t,params:i,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[R]=s.useState(()=>({audioContextRef:ee(()=>p.audioContext),masterGainRef:ee(()=>p.masterGain),radioToneHighpassRef:ee(()=>p.radioToneHighpass),radioToneLowpassRef:ee(()=>p.radioToneLowpass),radioTonePresenceRef:ee(()=>p.radioTonePresence),recordingDestinationRef:ee(()=>p.recordingDestination),lofiLowpassRef:ee(()=>p.lofiLowpass),lofiHighshelfRef:ee(()=>p.lofiHighshelf),lofiDriveRef:ee(()=>p.lofiDrive),bitcrusherRef:ee(()=>p.bitcrusher),bassEqRef:ee(()=>p.bassEq),midEqRef:ee(()=>p.midEq),trebleEqRef:ee(()=>p.trebleEq),stereoWidthRef:ee(()=>p.stereoWidth),roomDryGainRef:ee(()=>p.roomDryGain),roomConvolverRef:ee(()=>p.roomConvolver),roomWetGainRef:ee(()=>p.roomWetGain),wowFlutterDelayRef:ee(()=>p.wowFlutterDelay),wowLfoRef:ee(()=>p.wowLfo),wowLfoGainRef:ee(()=>p.wowLfoGain),flutterLfoRef:ee(()=>p.flutterLfo),flutterLfoGainRef:ee(()=>p.flutterLfoGain),noiseSourceRef:ee(()=>p.noiseSource),noiseFilterRef:ee(()=>p.noiseFilter),noisePannerRef:ee(()=>p.noisePanner),noiseGainRef:ee(()=>p.noiseGain),noiseLfoRef:ee(()=>p.noiseLfo),noiseLfoGainRef:ee(()=>p.noiseLfoGain),crackleSourceRef:ee(()=>p.crackleSource),crackleFilterRef:ee(()=>p.crackleFilter),vinylDustBedFilterRef:ee(()=>p.vinylDustBedFilter),vinylDustBedGainRef:ee(()=>p.vinylDustBedGain),crackleGainRef:ee(()=>p.crackleGain)})),{audioContextRef:Ce,masterGainRef:re,radioToneHighpassRef:rt,radioToneLowpassRef:wt,radioTonePresenceRef:it,recordingDestinationRef:St,lofiLowpassRef:yt,lofiHighshelfRef:Rt,lofiDriveRef:at,bitcrusherRef:Tt,bassEqRef:st,midEqRef:Dt,trebleEqRef:Lt,stereoWidthRef:Mt,roomDryGainRef:lt,roomConvolverRef:Et,roomWetGainRef:ct,wowFlutterDelayRef:Bt,wowLfoRef:ut,wowLfoGainRef:Pt,flutterLfoRef:dt,flutterLfoGainRef:It,noiseSourceRef:ht,noiseFilterRef:kt,noisePannerRef:Ft,noiseGainRef:Gt,noiseLfoRef:Nt,noiseLfoGainRef:Wt,crackleSourceRef:Ut,crackleFilterRef:Ot,vinylDustBedFilterRef:Ht,vinylDustBedGainRef:Vt,crackleGainRef:zt}=R,qe=(d,He)=>p.debugAudio(d,He),mt=()=>p.ensureInitialized(),_t=()=>p.ensureInitialized(),et=()=>p.updateAudioNodes(),jt=d=>p.connectSourceNode(d),Zt=()=>p.disposeAudioEngine(),pt=(d,He)=>p.setParams(d,He),Xt=d=>p.setIsPlaying(d),Kt=d=>p.setOutputEnabled(d),Yt=async d=>{const He=await mt();if(!He||!p.input){qe("connectMediaAudio:no-context",{mediaTag:d.tagName});return}X.current&&(qe("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),X.current.disconnect(),X.current=null);try{const je=He.createMediaElementSource(d);je.connect(p.input),X.current=je,$t()?(d.muted=!1,d.volume=0):(d.muted=m.current,d.volume=m.current?0:L.current),qe("connectMediaAudio:connected",{audioContextState:He.state,mediaTag:d.tagName,previewKind:o.current}),et()}catch(je){throw qe("connectMediaAudio:error",{audioContextState:He.state,mediaTag:d.tagName,message:je instanceof Error?je.message:String(je),previewKind:o.current}),je}},qt=()=>{const d=X.current;!d||!p.input||(d.disconnect(),d.connect(p.input),et())},Jt=async()=>{X.current?.disconnect(),X.current=null,await Zt()},_e=d=>{m.current=d.isMuted,L.current=d.volume,M.current=d.playbackRate,f.current=d.isLooping,W.current=d.isAudioFxEnabled,S.current=d.lofiAmount,N.current=d.radioToneAmount,K.current=d.bitCrushAmount,J.current=d.sampleRateReductionAmount,te.current=d.noiseReductionAmount,Q.current=d.bassAmount,Y.current=d.midAmount,_.current=d.trebleAmount,A.current=d.stereoWidthAmount,de.current=d.smallSpeakerRoomAmount,D.current=d.wowFlutterAmount,v.current=d.isNoiseEnabled,he.current=d.noiseLevel,j.current=d.vinylDustAmount,U.current=d.delayAmount,H.current=d.reverbAmount,oe.current=d.chorusAmount,V.current=d.tapeSaturationAmount,P.current=d.compressorAmount,x.current=d.fxOutputTrimAmount,$(d.isMuted),ae(d.volume),ne(d.playbackRate),se(d.isLooping),l(d.isAudioFxEnabled),y(d.lofiAmount),k(d.radioToneAmount),fe(d.bitCrushAmount),me(d.sampleRateReductionAmount),pe(d.noiseReductionAmount),Re(d.bassAmount),we(d.midAmount),Te(d.trebleAmount),Ne(d.stereoWidthAmount),Pe(d.smallSpeakerRoomAmount),Ze(d.wowFlutterAmount),Ie(d.isNoiseEnabled),ge(d.noiseLevel),Qe(d.vinylDustAmount),ze(d.delayAmount),Ue(d.reverbAmount),Xe(d.chorusAmount),$e(d.tapeSaturationAmount),c(d.compressorAmount),O(d.fxOutputTrimAmount),r.current&&($t()&&X.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=d.isMuted,r.current.volume=d.volume),r.current.playbackRate=d.playbackRate,r.current.loop=d.isLooping),pt(d),window.requestAnimationFrame(et)},Je=()=>_e({...ce});return s.useEffect(()=>{m.current=T,L.current=E,M.current=z,f.current=g,W.current=a,S.current=F,N.current=I,K.current=q,J.current=ve,te.current=Z,Q.current=xe,Y.current=le,_.current=De,A.current=Me,de.current=Ee,D.current=Be,v.current=We,he.current=ye,j.current=be,U.current=Se,H.current=Ae,oe.current=Le,V.current=ke,P.current=Oe,x.current=w,pt({isMuted:T,volume:E,playbackRate:z,isLooping:g,isAudioFxEnabled:a,lofiAmount:F,radioToneAmount:I,bitCrushAmount:q,sampleRateReductionAmount:ve,noiseReductionAmount:Z,bassAmount:xe,midAmount:le,trebleAmount:De,stereoWidthAmount:Me,smallSpeakerRoomAmount:Ee,wowFlutterAmount:Be,isNoiseEnabled:We,noiseLevel:ye,vinylDustAmount:be,delayAmount:Se,reverbAmount:Ae,chorusAmount:Le,tapeSaturationAmount:ke,compressorAmount:Oe,fxOutputTrimAmount:w},!0),Xt(n),Kt(e==="video"||e==="audio"||e==="capture"),r.current&&($t()&&X.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=T,r.current.volume=T?0:E),r.current.playbackRate=z,r.current.loop=g)},[T,E,a,F,I,q,ve,Z,xe,le,De,Me,Ee,Be,We,ye,be,Se,Ae,Le,ke,Oe,w,n,z,g,e]),s.useEffect(()=>{const d=setTimeout(()=>{bn({isMuted:T,volume:E,playbackRate:z,isLooping:g,isAudioFxEnabled:a,lofiAmount:F,radioToneAmount:I,bitCrushAmount:q,sampleRateReductionAmount:ve,noiseReductionAmount:Z,bassAmount:xe,midAmount:le,trebleAmount:De,stereoWidthAmount:Me,smallSpeakerRoomAmount:Ee,wowFlutterAmount:Be,isNoiseEnabled:We,noiseLevel:ye,vinylDustAmount:be,delayAmount:Se,reverbAmount:Ae,chorusAmount:Le,tapeSaturationAmount:ke,compressorAmount:Oe,fxOutputTrimAmount:w})},300);return()=>clearTimeout(d)},[T,E,z,g,a,F,I,q,ve,Z,xe,le,De,Me,Ee,Be,We,ye,be,Se,Ae,Le,ke,Oe,w]),{audioContextRef:Ce,mediaSourceRef:X,masterGainRef:re,radioToneHighpassRef:rt,radioToneLowpassRef:wt,radioTonePresenceRef:it,recordingDestinationRef:St,lofiLowpassRef:yt,lofiHighshelfRef:Rt,lofiDriveRef:at,bitcrusherRef:Tt,bassEqRef:st,midEqRef:Dt,trebleEqRef:Lt,stereoWidthRef:Mt,roomDryGainRef:lt,roomConvolverRef:Et,roomWetGainRef:ct,wowFlutterDelayRef:Bt,wowLfoRef:ut,wowLfoGainRef:Pt,flutterLfoRef:dt,flutterLfoGainRef:It,noiseSourceRef:ht,noiseFilterRef:kt,noisePannerRef:Ft,noiseGainRef:Gt,noiseLfoRef:Nt,noiseLfoGainRef:Wt,crackleSourceRef:Ut,crackleFilterRef:Ot,vinylDustBedFilterRef:Ht,vinylDustBedGainRef:Vt,crackleGainRef:zt,isMutedRef:m,volumeRef:L,playbackRateRef:M,isLoopingRef:f,isAudioFxEnabledRef:W,lofiAmountRef:S,radioToneAmountRef:N,bitCrushAmountRef:K,sampleRateReductionAmountRef:J,bassAmountRef:Q,midAmountRef:Y,trebleAmountRef:_,stereoWidthAmountRef:A,smallSpeakerRoomAmountRef:de,wowFlutterAmountRef:D,isNoiseEnabledRef:v,noiseLevelRef:he,vinylDustAmountRef:j,delayAmountRef:U,reverbAmountRef:H,chorusAmountRef:oe,tapeSaturationAmountRef:V,compressorAmountRef:P,fxOutputTrimAmountRef:x,isMuted:T,setIsMuted:$,playbackRate:z,setPlaybackRate:ne,volume:E,setVolume:ae,isLooping:g,setIsLooping:se,isAudioFxEnabled:a,setIsAudioFxEnabled:l,lofiAmount:F,setLofiAmount:y,radioToneAmount:I,setRadioToneAmount:k,bitCrushAmount:q,setBitCrushAmount:fe,sampleRateReductionAmount:ve,setSampleRateReductionAmount:me,noiseReductionAmount:Z,setNoiseReductionAmount:pe,bassAmount:xe,setBassAmount:Re,midAmount:le,setMidAmount:we,trebleAmount:De,setTrebleAmount:Te,stereoWidthAmount:Me,setStereoWidthAmount:Ne,smallSpeakerRoomAmount:Ee,setSmallSpeakerRoomAmount:Pe,wowFlutterAmount:Be,setWowFlutterAmount:Ze,isNoiseEnabled:We,setIsNoiseEnabled:Ie,noiseLevel:ye,setNoiseLevel:ge,vinylDustAmount:be,setVinylDustAmount:Qe,delayAmount:Se,setDelayAmount:ze,reverbAmount:Ae,setReverbAmount:Ue,chorusAmount:Le,setChorusAmount:Xe,tapeSaturationAmount:ke,setTapeSaturationAmount:$e,compressorAmount:Oe,setCompressorAmount:c,fxOutputTrimAmount:w,setFxOutputTrimAmount:O,debugAudio:qe,ensureAudioContext:_t,ensureInitialized:mt,updateAudioNodes:et,connectSourceNode:jt,connectMediaAudio:Yt,reconnectCurrentMediaAudio:qt,applyAudioSettings:_e,resetAudioSettings:Je,disposeAudioEngine:Jt}}const kn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},Fn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,Gn=`#version 300 es
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
`,Nn=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,po=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Wn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),go=640,eo=()=>typeof performance<"u"?performance.now():Date.now(),to=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,fo=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Un=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,vo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),vt=t=>({width:to(t)?t.videoWidth:fo(t)?t.naturalWidth:t.width,height:to(t)?t.videoHeight:fo(t)?t.naturalHeight:t.height}),On=(t,e,o)=>to(t)&&(e>go||o>go),Ct=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Hn=t=>Ct(t)&&t.phosphorDotInternalScale?2:1,Vn=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},zn=(t,e,o,r,n,u)=>{if(!Ct(o)||n===void 0||u===void 0||n<=0||u<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+o.bulbRadius*1.15),i=Math.max(1,h/Math.max(r,1)),m=Math.max(1,Math.floor(n/i)),L=Math.max(1,Math.floor(u/i)),M=Math.min(1,m/Math.max(t,1),L/Math.max(e,1));return{width:Math.max(1,Math.round(t*M)),height:Math.max(1,Math.round(e*M))}},oo=(t,e,o,r,n)=>{const u=Hn(t),h=Math.max(t.targetWidth,1),i=Math.max(t.targetHeight,1),m=t.matchTargetAspect?Vn(h,i,e,o):{width:h,height:i},L=m.width*u,M=m.height*u,f=zn(L,M,t,u,r,n);return{width:f.width,height:f.height,sampleWidth:Math.max(1,Math.round(L)),sampleHeight:Math.max(1,Math.round(M)),internalScale:u,isPhosphorDotMode:Ct(t)}};function bo(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function Ao(t,e,o){const r=bo(t,t.VERTEX_SHADER,e),n=bo(t,t.FRAGMENT_SHADER,o),u=t.createProgram();if(!u)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(u,r),t.attachShader(u,n),t.bindAttribLocation(u,0,"aPosition"),t.linkProgram(u),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(u,t.LINK_STATUS)){const h=t.getProgramInfoLog(u)||"Unknown program link error.";throw t.deleteProgram(u),new Error(h)}return u}class _n{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=eo();constructor(e){this.gl=e,this.filterProgram=Ao(e,po,Gn),this.passthroughProgram=Ao(e,po,Nn);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,Wn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=eo()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const u=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),vo(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const h=vt(o);this.applyFilterUniforms(r,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(vo(e)||!o.isFilterEnabled)return e;const r=vt(e);if(r.width<=0||r.height<=0||On(e,r.width,r.height))return e;const{width:n,height:u,sampleWidth:h,sampleHeight:i,isPhosphorDotMode:m}=oo(o,r.width,r.height),L=Math.max(1,Math.round(m?h:n)),M=Math.max(1,Math.round(m?i:u)),f=this.ensureUploadContext();return!f||!this.uploadCanvas?e:(this.uploadCanvas.width!==L&&(this.uploadCanvas.width=L),this.uploadCanvas.height!==M&&(this.uploadCanvas.height=M),f.imageSmoothingEnabled=!0,f.imageSmoothingQuality="high",f.fillStyle="#000",f.fillRect(0,0,L,M),f.drawImage(e,0,0,L,M),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,u=Un(n.canvas)?n.canvas:null,h=Math.max(u?.clientWidth??n.drawingBufferWidth,1),i=Math.max(u?.clientHeight??n.drawingBufferHeight,1),{width:m,height:L,sampleWidth:M,sampleHeight:f,isPhosphorDotMode:W}=oo(e,o,r,h,i);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,m,L),n.uniform2f(this.uniformLocations.uSampleTargetSize,M,f),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,Fn(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*L/(Math.max(n.drawingBufferHeight,1)*m)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,W?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...kn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(eo()-this.startedAt)/1e3)}}function jn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:u,debugVideo:h}){const i=s.useRef(null),m=s.useRef(null),L=s.useRef(null),M=s.useRef(null),f=s.useRef(null),W=s.useRef(null),S=s.useRef(null),N=s.useRef(null),K=s.useRef(()=>{}),J=s.useRef(t),te=s.useRef(r),Q=s.useRef(!1),Y=s.useRef(null),_=s.useRef(null),A=s.useRef(null),[de,D]=s.useState(!1),[v,he]=s.useState(null);J.current=t,te.current=r;const j=s.useCallback(a=>{he(l=>{const F=typeof a=="function"?a(l):a;return A.current=F,F})},[]),U=s.useCallback(()=>{const a=m.current,l=f.current;a&&(a.pipeline.setOutputEnabled(te.current),a.pipeline.setSource(l),a.pipeline.setFilterState(J.current),a.pipeline.render())},[]);s.useLayoutEffect(()=>{K.current=U},[U]);const H=s.useCallback(()=>{Q.current=!1,N.current!==null&&(window.cancelAnimationFrame(N.current),N.current=null)},[]),oe=s.useCallback(()=>{if(Q.current)return;Q.current=!0;const a=()=>{if(!Q.current)return;if(K.current(),!(u.current==="video"||u.current==="capture"||u.current==="image"||n.current)){N.current=null,Q.current=!1;return}N.current=window.requestAnimationFrame(a)};N.current=window.requestAnimationFrame(a)},[n,u]),V=s.useCallback(()=>{U()},[U]),P=s.useCallback(()=>{U()},[U]),x=s.useCallback(()=>{U()},[U]),T=s.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),W.current={},U(),W.current),[U]),$=s.useCallback((a,l,F)=>{if(!a)return;const{width:y,height:I}=vt(F);if(y<=0||I<=0)return;const k=i.current,q=k?.clientWidth??a.canvas.width,fe=k?.clientHeight??a.canvas.height,me=e==="width"?q/y:Math.min(q/y,fe/I),Z=y*me,pe=I*me,xe=(q-Z)/2,Re=(fe-pe)/2,le={width:Z,height:pe,x:xe,y:Re},we=A.current;return we&&we.width===le.width&&we.height===le.height&&we.x===le.x&&we.y===le.y?we:(A.current=le,j(le),le)},[e,j]),z=s.useCallback(()=>{f.current&&$(m.current,null,f.current)},[$]),ne=s.useCallback(()=>{U()},[U]),E=s.useCallback(()=>{const a=m.current,l=i.current;if(!a||!l)return;z();const F=A.current??{x:0,y:0,width:l.clientWidth,height:l.clientHeight},y=Math.max(1,Math.round(F.width)),I=Math.max(1,Math.round(F.height)),k=J.current,q=f.current?vt(f.current):null,{width:fe,height:ve}=oo(k,q?.width,q?.height,y,I),me=Math.max(1,Math.round(y*Math.max(1,o))),Z=Math.max(1,Math.round(I*Math.max(1,o))),pe=Math.max(1,Math.round(Math.max(1,fe)*Math.max(1,o))),xe=Math.max(1,Math.round(Math.max(1,ve)*Math.max(1,o))),Re=Ct(k),le=k.isFilterEnabled&&Re?Math.max(me,pe):me,we=k.isFilterEnabled&&Re?Math.max(Z,xe):Z;a.canvas.width!==le&&(a.canvas.width=le),a.canvas.height!==we&&(a.canvas.height=we),a.canvas.style.position="absolute",a.canvas.style.left=`${Math.round(F.x)}px`,a.canvas.style.top=`${Math.round(F.y)}px`,a.canvas.style.width=`${y}px`,a.canvas.style.height=`${I}px`,a.canvas.style.imageRendering="pixelated",U()},[z,U,o]),ae=s.useCallback(()=>{Y.current!==null&&(window.cancelAnimationFrame(Y.current),Y.current=null),_.current!==null&&(window.clearTimeout(_.current),_.current=null),Y.current=window.requestAnimationFrame(()=>{Y.current=null,E()}),_.current=window.setTimeout(()=>{_.current=null,E()},120)},[E]),g=s.useCallback(async()=>{if(!m.current){if(S.current){await S.current;return}S.current=(async()=>{const a=i.current;if(!a||m.current)return;const l=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:a.isConnected,hostWidth:a.clientWidth??null,hostHeight:a.clientHeight??null,resolution:o});const F=document.createElement("canvas");F.style.display="block",F.style.width="100%",F.style.height="100%",F.style.imageRendering="pixelated",F.style.background="#020617";const y=F.getContext("webgl2");if(!y)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-l)*10)/10});const I={canvas:F,pipeline:new _n(y),ticker:{start:oe,stop:H}},k=i.current;if(!k||k!==a||!k.isConnected)return;k.style.position="relative",k.appendChild(F),m.current=I,W.current={},D(!0),h("initWebGL:ready",{hostWidth:k.clientWidth??null,hostHeight:k.clientHeight??null,resolution:o}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-l)*10)/10}),E();const q=u.current==="video"||u.current==="capture"||u.current==="image"||n.current;r&&q&&oe(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-l)*10)/10,shouldAnimateOnInit:q})})();try{await S.current}finally{S.current=null}}},[h,r,E,o,oe,H]),se=s.useCallback(()=>{S.current=null,H(),Y.current!==null&&(window.cancelAnimationFrame(Y.current),Y.current=null),_.current!==null&&(window.clearTimeout(_.current),_.current=null);const a=m.current;a&&(a.pipeline.dispose(),a.canvas.remove()),m.current=null,W.current=null,j(null),D(!1)},[H,j]);return s.useEffect(()=>{const a=i.current;if(!a)return;if(typeof ResizeObserver<"u"){const F=new ResizeObserver(()=>{ae()});return F.observe(a),()=>{F.disconnect()}}const l=()=>{ae()};return window.addEventListener("resize",l),()=>{window.removeEventListener("resize",l)}},[ae]),{canvasHostRef:i,appRef:m,spriteRef:L,textureRef:M,previewElementRef:f,filterRef:W,isRendererReady:de,viewportRect:v,setViewportRect:j,applyFilterState:V,createVideoTexture:a=>null,destroyPixi:se,fitCurrentSprite:z,fitSprite:$,initPixi:g,refreshLayout:E,resetFilterInstance:T,safeRender:ne,scheduleRefreshLayout:ae,syncSpriteFilter:P,syncTexturePresentation:x}}const Zn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Xn=()=>typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function Kn({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:u,streamRef:h,streamOwnedRef:i,previewRequestIdRef:m,isPlayingRef:L,previewKindRef:M,audioContextRef:f,mediaSourceRef:W,masterGainRef:S,noiseGainRef:N,isMutedRef:K,volumeRef:J,playbackRateRef:te,isLoopingRef:Q,isAudioFxEnabled:Y,lofiAmount:_,bitCrushAmount:A,sampleRateReductionAmount:de,bassAmount:D,midAmount:v,trebleAmount:he,stereoWidthAmount:j,smallSpeakerRoomAmount:U,isMuted:H,volume:oe,previewKind:V,setPreviewName:P,setPreviewError:x,setNeedsUserPlay:T,setIsPlaying:$,setCurrentTime:z,setDuration:ne,setPlaybackRate:E,setIsLooping:ae,setSourceDimensions:g,setViewportRect:se,setPreviewKindState:a,setIsPoweredOn:l,beginLoading:F,finishLoading:y,ensureAudioContext:I,updateAudioNodes:k,connectMediaAudio:q,fitSprite:fe,refreshLayout:ve,scheduleRefreshLayout:me,safeRender:Z,resetFilterInstance:pe,initPixi:xe,resetPerfAccumulators:Re,debugVideo:le,debugAudio:we}){const De=async()=>{Zn()&&await new Promise(c=>{window.setTimeout(c,220)})},Te=()=>{const c=f.current?.currentTime;if(N.current)if(typeof c=="number"){const w=N.current.gain;w.cancelScheduledValues(c),w.setValueAtTime(w.value,c),w.linearRampToValueAtTime(0,c+.03)}else N.current.gain.value=0;if(S.current)if(typeof c=="number"){const w=S.current.gain;w.cancelScheduledValues(c),w.setValueAtTime(w.value,c),w.linearRampToValueAtTime(0,c+.03)}else S.current.gain.value=0},Me=()=>{N.current&&(N.current.gain.value=0)},Ne=c=>c instanceof DOMException&&(c.name==="NotAllowedError"||c.name==="AbortError")?!0:c instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(c.message):!1,Ee=c=>Ne(c)?(y(),x(""),T(!0),ge(),Z(),!0):!1,Pe=(c,w,O=!0)=>{Te(),c.muted=!0,c.volume=0,c.pause(),c.srcObject instanceof MediaStream&&(O&&c.srcObject.getTracks().forEach(X=>X.stop()),c.srcObject=null),c.src="",c.load(),w?.startsWith("blob:")&&URL.revokeObjectURL(w)},Be=c=>new Promise((w,O)=>{const X=re=>re?re.code===MediaError.MEDIA_ERR_ABORTED?"aborted":re.code===MediaError.MEDIA_ERR_NETWORK?"network":re.code===MediaError.MEDIA_ERR_DECODE?"decode":re.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${re.code}`:"unknown",p=()=>{c.removeEventListener("loadeddata",R),c.removeEventListener("canplay",R),c.removeEventListener("error",Ce)},R=()=>{p(),w()},Ce=()=>{p(),O(new Error(`動画の読み込みに失敗しました。 src=${c.currentSrc||c.src||"(empty)"} reason=${X(c.error)}`))};if(c.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){w();return}c.addEventListener("loadeddata",R,{once:!0}),c.addEventListener("canplay",R,{once:!0}),c.addEventListener("error",Ce,{once:!0}),c.load()}),Ze=c=>new Promise((w,O)=>{const X=re=>re?re.code===MediaError.MEDIA_ERR_ABORTED?"aborted":re.code===MediaError.MEDIA_ERR_NETWORK?"network":re.code===MediaError.MEDIA_ERR_DECODE?"decode":re.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${re.code}`:"unknown",p=()=>{c.removeEventListener("loadedmetadata",R),c.removeEventListener("canplay",R),c.removeEventListener("error",Ce)},R=()=>{p(),w()},Ce=()=>{p(),O(new Error(`音声の読み込みに失敗しました。 src=${c.currentSrc||c.src||"(empty)"} reason=${X(c.error)}`))};if(c.readyState>=HTMLMediaElement.HAVE_METADATA){w();return}c.addEventListener("loadedmetadata",R,{once:!0}),c.addEventListener("canplay",R,{once:!0}),c.addEventListener("error",Ce,{once:!0}),c.load()}),We=c=>new Promise((w,O)=>{const X=()=>{c.removeEventListener("load",p),c.removeEventListener("error",R)},p=()=>{X(),w()},R=()=>{X(),O(new Error("画像の読み込みに失敗しました。"))};if(c.complete&&c.naturalWidth>0&&c.naturalHeight>0){w();return}c.addEventListener("load",p,{once:!0}),c.addEventListener("error",R,{once:!0})}),Ie=c=>{c.addEventListener("play",ge),c.addEventListener("pause",ge),c.addEventListener("pause",Te),c.addEventListener("abort",Te),c.addEventListener("emptied",Te),c.addEventListener("loadstart",Te),c.addEventListener("seeking",Te),c.addEventListener("stalled",Te),c.addEventListener("suspend",Te),c.addEventListener("waiting",Te),c.addEventListener("volumechange",ge),c.addEventListener("timeupdate",ge),c.addEventListener("durationchange",ge),c.addEventListener("seeked",ge),c.addEventListener("ended",ge),c.addEventListener("ratechange",ge),c instanceof HTMLVideoElement&&c.addEventListener("resize",()=>{const w=c.videoWidth,O=c.videoHeight;w>0&&O>0&&(g({width:w,height:O}),me())})},ye=c=>{c.loop=Q.current,c.muted=K.current,c.volume=K.current?0:J.current,c.playbackRate=te.current,c.autoplay=!1,c.preload="auto",c.crossOrigin="anonymous",c instanceof HTMLVideoElement&&(c.playsInline=!0)},ge=()=>{if(!n.current){le("syncVideoState:no-media",{previewKind:M.current,hasPreviewElement:!!r.current}),L.current=!1,$(!1),z(0),ne(0),k(),Z();return}L.current=!n.current.paused,$(!n.current.paused),n.current.paused||y(),z(n.current.currentTime),ne(n.current.duration||0),E(n.current.playbackRate||1),ae(n.current.loop),k(),Z()},be=()=>{le("cleanupPreview:start",{previewKind:M.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),Te(),m.current+=1,y();const c=n.current,w=h.current,O=i.current;e.current=null,o.current=null,n.current=null,r.current=null,h.current=null,i.current=!1,W.current?.disconnect(),W.current=null,T(!1),L.current=!1,$(!1),z(0),ne(0),a(null),g(null),se(null),u.current?.startsWith("blob:")&&URL.revokeObjectURL(u.current),u.current=null,c?Pe(c,void 0,O):O&&w?.getTracks().forEach(X=>X.stop()),Z()},Qe=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),Te(),be(),f.current?.state==="running"&&f.current.suspend()},Se=()=>{l(!0),t.current?.ticker.start();try{Re?.()}catch{}},ze=async()=>{if(n.current)try{await I(),Xn()&&W.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=K.current,n.current.volume=K.current?0:J.current),await n.current.play(),L.current=!0,$(!0),x(""),T(!1),we("playVideoWithAudio",{audioContextState:f.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:Y,lofiAmount:_,bitCrushAmount:A,sampleRateReductionAmount:de,bassAmount:D,midAmount:v,trebleAmount:he,stereoWidthAmount:j,smallSpeakerRoomAmount:U,isMuted:H,volume:oe}),k(),ge(),Z(),me(),window.requestAnimationFrame(k)}catch(c){if(y(),Ne(c)){T(!0),x("");return}T(!1),x(c instanceof Error?c.message:"音声付き再生を開始できませんでした。")}},Ae=async()=>{if(await xe(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Ue=async(c,w)=>{const O=await Ae();r.current=c,fe(O,null,c),a(w),g(c instanceof HTMLVideoElement?{width:c.videoWidth,height:c.videoHeight}:{width:c.naturalWidth,height:c.naturalHeight}),Z(),ve(),me(),t.current?.ticker.start()},Le=async c=>{const w=c.type.startsWith("video/"),O=c.type.startsWith("audio/"),X=c.type.startsWith("image/");if(!w&&!O&&!X){x("動画、音声、または画像ファイルを選んでください。");return}Se(),be(),pe();const p=m.current;x(""),P(c.name),F(w?"Loading video preview...":O?"Loading audio preview...":"Loading image preview...");let R=null;try{if(await Ae(),R=URL.createObjectURL(c),u.current=R,w||O){const re=w?document.createElement("video"):document.createElement("audio");if(re.src=R,ye(re),Ie(re),re instanceof HTMLVideoElement?await Be(re):await Ze(re),p!==m.current){Pe(re,R);return}n.current=re,re instanceof HTMLVideoElement?await Ue(re,"video"):(r.current=null,a("audio"),g(null),se(null),Z()),await q(re),ge(),await De(),await ze(),p===m.current&&y();return}const Ce=new Image;if(Ce.src=R,Ce.crossOrigin="anonymous",await We(Ce),p!==m.current){R.startsWith("blob:")&&URL.revokeObjectURL(R);return}n.current=null,Me(),k(),await Ue(Ce,"image"),ge(),p===m.current&&y()}catch(Ce){if(p!==m.current){R?.startsWith("blob:")&&URL.revokeObjectURL(R);return}if(Ne(Ce)){Ee(Ce);return}be(),x(Ce instanceof Error?Ce.message:"動画プレビューに失敗しました。"),T(!1)}},Xe=async()=>{if(Se(),!navigator.mediaDevices?.getDisplayMedia){x("このブラウザでは画面キャプチャーに対応していません。");return}be();const c=m.current;x(""),P("Display Capture"),F("Preparing display capture...");try{await Ae();const w=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(c!==m.current){w.getTracks().forEach(X=>X.stop());return}const O=document.createElement("video");O.srcObject=w,ye(O),Ie(O),w.getVideoTracks()[0]?.addEventListener("ended",()=>{ke()}),await Be(O),h.current=w,i.current=!0,n.current=O,await Ue(O,"capture"),await q(O),T(!1),await De(),await ze(),c===m.current&&y()}catch(w){if(c!==m.current||Ee(w))return;be(),x(w instanceof Error?w.message:"画面キャプチャーを開始できませんでした。")}},ke=()=>{V==="capture"&&(be(),P(""),x(""))};return{cleanupPreview:be,cleanupForPageLeave:Qe,playVideoWithAudio:ze,previewFile:Le,previewStream:async(c,w="video",O="Media Stream")=>{let X=0;try{if(Se(),be(),pe(),X=m.current,x(""),P(O),F(w==="video"?"Loading stream preview...":"Loading stream audio..."),await Ae(),w==="video"){const p=document.createElement("video");if(p.srcObject=c,ye(p),Ie(p),await Be(p),X!==m.current){Pe(p,void 0,!1);return}h.current=c,i.current=!1,n.current=p,await Ue(p,"capture"),await q(p)}else{const p=document.createElement("audio");if(p.srcObject=c,ye(p),Ie(p),await Ze(p),X!==m.current){Pe(p,void 0,!1);return}h.current=c,i.current=!1,n.current=p,r.current=null,a("audio"),g(null),se(null),Z(),await q(p),ge()}if(X!==m.current)return;await De(),await ze(),X===m.current&&y()}catch(p){if(X!==m.current||Ee(p))return;be(),x(p instanceof Error?p.message:String(p))}},previewUrl:async(c,w="video")=>{let O=0;const X=typeof performance<"u"?performance.now():Date.now(),p=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-X)*10)/10;try{if(le("startup:previewUrl:start",{url:c,kind:w}),Se(),be(),pe(),O=m.current,x(""),P(c),F(w==="video"?"Loading video preview...":w==="image"?"Loading image preview...":"Loading audio preview..."),await Ae(),le("startup:previewUrl:renderer-ready",{kind:w,elapsedMs:p()}),w==="video"){const R=document.createElement("video");if(R.src=c,ye(R),Ie(R),await Be(R),le("startup:previewUrl:video-ready",{elapsedMs:p(),readyState:R.readyState,videoWidth:R.videoWidth,videoHeight:R.videoHeight}),O!==m.current){Pe(R,c);return}n.current=R,await Ue(R,"video"),await q(R),ge()}else if(w==="image"){const R=new Image;if(R.src=c,R.crossOrigin="anonymous",await We(R),le("startup:previewUrl:image-ready",{elapsedMs:p(),naturalWidth:R.naturalWidth,naturalHeight:R.naturalHeight}),O!==m.current)return;n.current=null,Me(),k(),await Ue(R,"image"),ge()}else{const R=document.createElement("audio");if(R.src=c,ye(R),Ie(R),await Ze(R),le("startup:previewUrl:audio-ready",{elapsedMs:p(),readyState:R.readyState,duration:R.duration}),O!==m.current){Pe(R,c);return}r.current=null,a("audio"),g(null),se(null),n.current=R,Z(),await q(R),ge()}if(O!==m.current)return;(w==="video"||w==="audio")&&(await De(),await ze()),O===m.current&&(y(),le("startup:previewUrl:done",{kind:w,elapsedMs:p()}))}catch(R){if(le("startup:previewUrl:error",{kind:w,elapsedMs:p(),error:R instanceof Error?R.message:String(R)}),O!==m.current||Ee(R))return;be(),x(R instanceof Error?R.message:String(R))}},startDisplayCapture:Xe,stopDisplayCapture:ke,syncVideoState:ge,releaseDetachedMedia:Pe,ensurePixiReady:Ae}}let Yn=0;const xo=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),Co=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),qn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function Jn(t,e,o=1){const r=s.useRef(`player-${Yn+=1}`),n=s.useRef(null),u=s.useRef(null),h=s.useRef(!1),i=s.useRef(null),m=s.useRef(null),L=s.useRef([]),M=s.useRef(null),f=s.useRef(null),W=s.useRef(null),S=s.useRef(null),N=s.useRef(null),K=s.useRef(0),J=s.useRef(!1),te=s.useRef(null),Q=s.useRef(!1),[Y,_]=s.useState(""),[A,de]=s.useState(""),[D,v]=s.useState(!0),[he,j]=s.useState(""),[U,H]=s.useState(!1),[oe,V]=s.useState(!1),[P,x]=s.useState(!1),[T,$]=s.useState(0),[z,ne]=s.useState(0),[E,ae]=s.useState(null),[g,se]=s.useState(null),[a,l]=s.useState(!1),[F,y]=s.useState(null),I=(C,B)=>{if(!qn())return;const ie=B?` ${JSON.stringify(B)}`:"";console.log(`[retro-player video][${r.current}] ${C}${ie}`)},k=jn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:D,isPlayingRef:J,previewKindRef:te,debugVideo:I}),{canvasHostRef:q,appRef:fe,spriteRef:ve,textureRef:me,previewElementRef:Z,filterRef:pe,isRendererReady:xe,viewportRect:Re,setViewportRect:le,applyFilterState:we,destroyPixi:De,fitSprite:Te,initPixi:Me,refreshLayout:Ne,resetFilterInstance:Ee,safeRender:Pe,scheduleRefreshLayout:Be,syncSpriteFilter:Ze,syncTexturePresentation:We}=k,Ie=s.useRef(Me),ye=s.useRef(De),ge=s.useRef(()=>{}),be=s.useRef(()=>{}),Qe=In({instanceLabel:r.current,previewKind:E,previewKindRef:te,mediaRef:i,isPlaying:P,isPlayingRef:J}),{audioContextRef:Se,mediaSourceRef:ze,masterGainRef:Ae,recordingDestinationRef:Ue,noiseGainRef:Le,isMutedRef:Xe,volumeRef:ke,playbackRateRef:$e,isLoopingRef:Oe,isMuted:c,setIsMuted:w,playbackRate:O,setPlaybackRate:X,volume:p,setVolume:R,isLooping:Ce,setIsLooping:re,isAudioFxEnabled:rt,setIsAudioFxEnabled:wt,lofiAmount:it,setLofiAmount:St,radioToneAmount:yt,setRadioToneAmount:Rt,bitCrushAmount:at,setBitCrushAmount:Tt,sampleRateReductionAmount:st,setSampleRateReductionAmount:Dt,noiseReductionAmount:Lt,setNoiseReductionAmount:Mt,bassAmount:lt,setBassAmount:Et,midAmount:ct,setMidAmount:Bt,trebleAmount:ut,setTrebleAmount:Pt,stereoWidthAmount:dt,setStereoWidthAmount:It,smallSpeakerRoomAmount:ht,setSmallSpeakerRoomAmount:kt,wowFlutterAmount:Ft,setWowFlutterAmount:Gt,isNoiseEnabled:Nt,setIsNoiseEnabled:Wt,noiseLevel:Ut,setNoiseLevel:Ot,vinylDustAmount:Ht,setVinylDustAmount:Vt,delayAmount:zt,setDelayAmount:qe,reverbAmount:mt,setReverbAmount:_t,chorusAmount:et,setChorusAmount:jt,tapeSaturationAmount:Zt,setTapeSaturationAmount:pt,compressorAmount:Xt,setCompressorAmount:Kt,fxOutputTrimAmount:Yt,setFxOutputTrimAmount:qt,debugAudio:Jt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,reconnectCurrentMediaAudio:He,applyAudioSettings:je,resetAudioSettings:Lo,disposeAudioEngine:io}=Qe;s.useEffect(()=>{Ie.current=Me,ye.current=De},[Me,De]);const Mo=C=>{te.current=C,ae(C)},Eo=C=>{j(C),H(!0)},tt=()=>{H(!1),j("")},ao=()=>{v(!0),fe.current?.ticker.start()},Bo=()=>{i.current&&i.current.pause(),Le.current&&(Le.current.gain.value=0),Ae.current&&(Ae.current.gain.value=0),tt(),V(!1),v(!1),fe.current?.ticker.stop(),Ke()},Po=Kn({filterState:t,appRef:fe,spriteRef:ve,textureRef:me,previewElementRef:Z,filterRef:pe,mediaRef:i,objectUrlRef:n,streamRef:u,streamOwnedRef:h,previewRequestIdRef:K,isPlayingRef:J,previewKindRef:te,audioContextRef:Se,mediaSourceRef:ze,masterGainRef:Ae,noiseGainRef:Le,isMutedRef:Xe,volumeRef:ke,playbackRateRef:$e,isLoopingRef:Oe,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,isMuted:c,volume:p,previewKind:E,setPreviewName:_,setPreviewError:de,setNeedsUserPlay:V,setIsPlaying:x,setCurrentTime:$,setDuration:ne,setPlaybackRate:X,setIsLooping:re,setSourceDimensions:se,setViewportRect:le,setPreviewKindState:Mo,setIsPoweredOn:v,beginLoading:Eo,finishLoading:tt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,fitSprite:Te,refreshLayout:Ne,scheduleRefreshLayout:Be,safeRender:Pe,resetFilterInstance:Ee,initPixi:Me,debugVideo:I,debugAudio:Jt}),{cleanupPreview:so,cleanupForPageLeave:Io,playVideoWithAudio:lo,previewFile:ko,previewStream:Fo,previewUrl:Go,startDisplayCapture:No,stopDisplayCapture:Wo,syncVideoState:Ke}=Po;s.useEffect(()=>{ge.current=so},[so]),s.useEffect(()=>{be.current=io},[io]);const co=async()=>{if(i.current){if(i.current.paused){D||ao(),await lo(),Ke();return}i.current.pause(),Ke()}},Uo=()=>{i.current&&w(C=>{const B=!C;return Xe.current=B,window.requestAnimationFrame(Je),B})},ot=C=>{i.current&&(i.current.currentTime=C,$(C))},Oo=C=>{if(!i.current)return;const B=1/30,ie=Math.max(0,Math.min(i.current.currentTime+B*C,i.current.duration||i.current.currentTime+B));i.current.pause(),i.current.currentTime=ie,Ke()},Ho=C=>{i.current&&(i.current.playbackRate=C,$e.current=C,X(C))},Vo=C=>{i.current&&(ke.current=C,Xe.current=C===0,R(C),w(C===0),window.requestAnimationFrame(Je))},zo=()=>{i.current&&(i.current.loop=!i.current.loop,Oe.current=i.current.loop,re(i.current.loop))},_o=C=>{Oe.current=C,re(C),i.current&&(i.current.loop=C)},gt=()=>{if(!f.current||typeof window>"u"){W.current=null,S.current=null;return}window.URL.revokeObjectURL(f.current),f.current=null,W.current=null,S.current=null},jo=(C,B)=>{if(typeof document>"u")return;const ie=document.createElement("a");ie.href=C,ie.download=B,ie.rel="noopener",ie.style.display="none",document.body.appendChild(ie),ie.click(),window.setTimeout(()=>{ie.remove()},0)},Zo=(C,B)=>{if(typeof window>"u"||C.length===0)return null;gt();const ie=new Blob(C,{type:B||"video/webm"}),Ve=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ge=window.URL.createObjectURL(ie);return f.current=Ge,W.current=ie,S.current=Ve,y(Ve),Ve},Xo=()=>{const C=f.current,B=S.current;!C||!B||typeof window>"u"||(jo(C,B),window.setTimeout(()=>{gt()},1e3),y(null))},Ko=async()=>{const C=W.current,B=S.current;if(!C||!B||typeof window>"u")return!1;if(xo()){const Ve=new Uint8Array(await C.arrayBuffer()),Ge=await To("persist_recording_for_share",{data:Array.from(Ve),filename:B});return await fn(Ge,{mimeType:C.type||"video/webm",title:B}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Fe={files:[new File([C],B,{type:C.type||"video/webm"})],title:B};return typeof navigator.canShare=="function"&&!navigator.canShare(Fe)?!1:(await navigator.share(Fe),!0)},Yo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(B=>MediaRecorder.isTypeSupported(B))??"",qo=async()=>{const C=fe.current?.canvas;if(!(C instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await _e();const B=new MediaStream;C.captureStream(30).getVideoTracks().forEach(Ge=>B.addTrack(Ge)),Ue.current?.stream.getAudioTracks().forEach(Ge=>B.addTrack(Ge.clone()));const Fe=Yo(),Ve=Fe?new MediaRecorder(B,{mimeType:Fe}):new MediaRecorder(B);L.current=[],gt(),y(null),M.current=B,m.current=Ve,Ve.addEventListener("dataavailable",Ge=>{Ge.data.size>0&&L.current.push(Ge.data)}),Ve.addEventListener("stop",()=>{const Ge=Zo(L.current,Ve.mimeType);L.current=[],M.current?.getTracks().forEach(Jo=>Jo.stop()),M.current=null,m.current=null,l(!1),_e(),N.current?.(Ge),N.current=null},{once:!0}),Ve.start(),l(!0)},uo=(C=!0)=>{const B=m.current;return B?new Promise(ie=>{if(N.current=ie,C||(L.current=[]),B.state!=="inactive"){B.stop();return}M.current?.getTracks().forEach(Fe=>Fe.stop()),M.current=null,m.current=null,l(!1),N.current?.(S.current),N.current=null}):Promise.resolve(S.current)};return s.useEffect(()=>{let C=!1;return(async()=>(I("startup:setupPixi-effect:start",{renderResolutionScale:o}),await Ie.current(),C&&ye.current()))(),()=>{gt(),uo(!1),C=!0,ye.current()}},[o]),s.useEffect(()=>()=>{ge.current(),be.current()},[]),s.useEffect(()=>{const C=()=>{Io()};return window.addEventListener("beforeunload",C),()=>{window.removeEventListener("beforeunload",C)}},[]),s.useEffect(()=>{const C=()=>{i.current&&(i.current.muted=!0,i.current.volume=0,i.current.pause(),Ke())};return window.addEventListener(ho,C),()=>{window.removeEventListener(ho,C)}},[Ke]),s.useEffect(()=>{if(!Co())return;const C=ie=>ie==="video"||ie==="audio"||ie==="capture",B=()=>{const ie=i.current;if(!(!ie||!C(te.current))){if(document.visibilityState==="hidden"){Q.current=!ie.paused,ie.pause(),J.current=!1,x(!1),Le.current&&(Le.current.gain.value=0),Ae.current&&(Ae.current.gain.value=0),Se.current?.state==="running"&&Se.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await _e(),He(),Je(),Q.current&&i.current)try{await i.current.play(),V(!1)}catch(Fe){Fe instanceof DOMException&&Fe.name==="NotAllowedError"&&V(!0)}}finally{Ke(),Q.current=!1}})()},80)}};return document.addEventListener("visibilitychange",B),()=>{document.removeEventListener("visibilitychange",B)}},[Se,_e,Ae,Le,He,Ke,Je]),s.useLayoutEffect(()=>{we(),Ze(),We(),Ne()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,Ne]),s.useEffect(()=>{if(A||oe){tt();return}if(E==="image"||E==="audio"){tt();return}P&&tt()},[A,oe,E,P]),s.useEffect(()=>{J.current=P;const C=(E==="video"||E==="capture")&&i.current?.tagName==="VIDEO",B=!i.current||Math.abs(i.current.currentTime)<.05,ie=i.current?.ended??!1;C&&tt(),C&&!P&&!A&&!ie&&(Se.current?.state==="suspended"||B)&&V(!0)},[Se,P,A,E]),s.useEffect(()=>{const C=B=>{if(!i.current)return;const ie=B.target;if(!(ie instanceof HTMLInputElement||ie instanceof HTMLTextAreaElement||ie?.isContentEditable)){if(B.code==="Space"||B.code==="KeyK"){B.preventDefault(),co();return}if(B.code==="KeyJ"){B.preventDefault(),ot(Math.max(i.current.currentTime-10,0));return}if(B.code==="KeyL"){B.preventDefault(),ot(Math.min(i.current.currentTime+10,i.current.duration||i.current.currentTime+10));return}if(B.code==="ArrowLeft"){B.preventDefault(),ot(Math.max(i.current.currentTime-5,0));return}B.code==="ArrowRight"&&(B.preventDefault(),ot(Math.min(i.current.currentTime+5,i.current.duration||i.current.currentTime+5)))}};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),{canvasHostRef:q,previewName:Y,previewError:A,isRendererReady:xe,loadingLabel:he,isLoading:U,needsUserPlay:oe,isPlaying:P,isMuted:c,currentTime:T,duration:z,playbackRate:O,volume:p,isLooping:Ce,sourceDimensions:g,viewportRect:Re,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:yt,bitCrushAmount:at,sampleRateReductionAmount:st,noiseReductionAmount:Lt,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,wowFlutterAmount:Ft,isNoiseEnabled:Nt,noiseLevel:Ut,vinylDustAmount:Ht,delayAmount:zt,reverbAmount:mt,chorusAmount:et,tapeSaturationAmount:Zt,setTapeSaturationAmount:pt,compressorAmount:Xt,setCompressorAmount:Kt,fxOutputTrimAmount:Yt,setFxOutputTrimAmount:qt,hasPlayableMedia:E==="video"||E==="audio"||E==="capture",hasVideo:E==="video"||E==="capture",hasAudioOnly:E==="audio",hasImage:E==="image",isRecording:a,pendingRecordingFilename:F,prefersShareExport:xo()&&Co(),isCaptureActive:E==="capture",canRecord:E==="video"||E==="capture"||E==="image"||E==="audio",previewFile:ko,previewStream:Fo,previewUrl:Go,startDisplayCapture:No,stopDisplayCapture:Wo,togglePlayback:co,toggleMute:Uo,seekTo:ot,stepFrame:Oo,changePlaybackRate:Ho,changeVolume:Vo,toggleLoop:zo,setLoopingEnabled:_o,applyAudioSettings:je,resetAudioSettings:Lo,playVideoWithAudio:lo,isPoweredOn:D,powerOn:ao,powerOff:Bo,downloadPendingRecording:Xo,sharePendingRecording:Ko,startRecording:qo,stopRecording:uo,ensureAudioContext:_e,refreshLayout:Ne,toggleAudioFx:()=>{wt(C=>!C)},setLofiAmount:St,setRadioToneAmount:Rt,setBitCrushAmount:Tt,setSampleRateReductionAmount:Dt,setNoiseReductionAmount:Mt,setBassAmount:Et,setMidAmount:Bt,setTrebleAmount:Pt,setStereoWidthAmount:It,setSmallSpeakerRoomAmount:kt,setWowFlutterAmount:Gt,toggleNoise:()=>{Wt(C=>!C)},setNoiseLevel:Ot,setVinylDustAmount:Vt,setDelayAmount:qe,setReverbAmount:_t,setChorusAmount:jt}}const ue=nt.pc98_512,wo=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,ft=t=>{for(const[e,o]of Object.entries(nt))if(wo(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(nt))if(wo(t,o,{ignoreDimensions:!0}))return e;return null},Qn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function $n(t={}){const[e]=s.useState(()=>({targetWidth:t.targetWidth??ue.width,targetHeight:t.targetHeight??ue.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ue.colors,ditherStrength:t.ditherStrength??ue.dither,paletteMode:t.paletteMode??ue.palette,curvature:t.curvature??ue.curvature,scanlineStrength:t.scanlineStrength??ue.scanline,scanline2Strength:t.scanline2Strength??ue.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ue.vignette,glowStrength:t.glowStrength??ue.glow,smoothStrength:t.smoothStrength??ue.smoothStrength??0,toonSteps:t.toonSteps??ue.toonSteps??0,edgeBoost:t.edgeBoost??ue.edgeBoost??0,phosphorStrength:t.phosphorStrength??ue.phosphor,spotMaskStrength:t.spotMaskStrength??ue.spotMask,bulbRadius:t.bulbRadius??ue.bulbRadius,blackFloor:t.blackFloor??ue.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??ue.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ue.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ue.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ue.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ue.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ue.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ue.monoTint,neonBoost:t.neonBoost??ue.neonBoost,neonSaturation:t.neonSaturation??ue.neonSaturation,neonDetail:t.neonDetail??ue.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=s.useState(()=>({...e,...xt()?.filter,...t})),[r,n]=s.useState(o),[u,h]=s.useState(ft(o)),i=a=>{h(null),n(l=>l.targetWidth===a?l:{...l,targetWidth:a})},m=a=>{h(null),n(l=>l.targetHeight===a?l:{...l,targetHeight:a})},L=a=>{h(null),n(l=>l.matchTargetAspect===a?l:{...l,matchTargetAspect:a})},M=a=>{h(null),n(l=>({...l,colorLevels:a}))},f=a=>{h(null),n(l=>({...l,ditherStrength:a}))},W=a=>{h(null),n(l=>({...l,paletteMode:a,colorLevels:Qn(a,l.colorLevels)}))},S=a=>{h(null),n(l=>({...l,curvature:a}))},N=a=>{h(null),n(l=>({...l,scanlineStrength:a}))},K=a=>{h(null),n(l=>({...l,scanline2Strength:a}))},J=a=>{h(null),n(l=>({...l,scanlineBrightnessFade:a}))},te=a=>{h(null),n(l=>({...l,vignetteStrength:a}))},Q=a=>{h(null),n(l=>({...l,glowStrength:a}))},Y=a=>{h(null),n(l=>({...l,smoothStrength:a}))},_=a=>{h(null),n(l=>({...l,toonSteps:a}))},A=a=>{h(null),n(l=>({...l,edgeBoost:a}))},de=a=>{h(null),n(l=>({...l,phosphorStrength:a}))},D=a=>{h(null),n(l=>({...l,spotMaskStrength:a}))},v=a=>{h(null),n(l=>({...l,bulbRadius:a}))},he=a=>{h(null),n(l=>({...l,blackFloor:a}))},j=a=>{h(null),n(l=>({...l,phosphorDotLightBalance:a}))},U=a=>{h(null),n(l=>({...l,phosphorDotInternalScale:a}))},H=a=>{h(null),n(l=>({...l,phosphorDotBrightCore:a}))},oe=a=>{h(null),n(l=>({...l,phosphorDotCellFill:a}))},V=a=>{h(null),n(l=>({...l,phosphorDotFlatDisc:a}))},P=a=>{h(null),n(l=>({...l,phosphorDotNeighborBlend:a}))},x=a=>{h(null),n(l=>({...l,closeUpNoiseStrength:a}))},T=a=>{h(null),n(l=>({...l,monoTint:a}))},$=a=>{h(null),n(l=>({...l,neonBoost:a}))},z=a=>{h(null),n(l=>({...l,neonSaturation:a}))},ne=a=>{h(null),n(l=>({...l,neonDetail:a}))},E=a=>{n(l=>({...l,isFilterEnabled:a}))},ae=a=>{const l=nt[a];h(a),n(F=>({...F,targetWidth:l.width,targetHeight:l.height,colorLevels:l.colors,ditherStrength:l.dither,paletteMode:l.palette,curvature:l.curvature,scanlineStrength:l.scanline,scanline2Strength:l.scanline2,vignetteStrength:l.vignette,glowStrength:l.glow,smoothStrength:l.smoothStrength??0,toonSteps:l.toonSteps??0,edgeBoost:l.edgeBoost??0,phosphorStrength:l.phosphor,spotMaskStrength:l.spotMask,bulbRadius:l.bulbRadius,blackFloor:l.blackFloor,phosphorDotLightBalance:l.phosphorDotLightBalance??1,phosphorDotInternalScale:l.phosphorDotInternalScale??!1,phosphorDotBrightCore:l.phosphorDotBrightCore??!1,phosphorDotCellFill:l.phosphorDotCellFill??0,phosphorDotFlatDisc:l.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:l.phosphorDotNeighborBlend??!1,monoTint:l.monoTint,neonBoost:l.neonBoost,neonSaturation:l.neonSaturation,neonDetail:l.neonDetail,isFilterEnabled:!0}))},g=a=>{h(ft(a)),n(a)},se=()=>{h(ft(e)),n(e)};return s.useEffect(()=>{const a=setTimeout(()=>{vn(r)},300);return()=>clearTimeout(a)},[r]),s.useEffect(()=>{const a=ft(r);h(l=>l===a?l:a)},[r]),{...r,selectedPreset:u,setTargetWidth:i,setTargetHeight:m,setMatchTargetAspect:L,setColorLevels:M,setDitherStrength:f,setPaletteMode:W,setCurvature:S,setScanlineStrength:N,setScanline2Strength:K,setScanlineBrightnessFade:J,setVignetteStrength:te,setGlowStrength:Q,setSmoothStrength:Y,setToonSteps:_,setEdgeBoost:A,setPhosphorStrength:de,setSpotMaskStrength:D,setBulbRadius:v,setBlackFloor:he,setPhosphorDotLightBalance:j,setPhosphorDotInternalScale:U,setPhosphorDotBrightCore:H,setPhosphorDotCellFill:oe,setPhosphorDotFlatDisc:V,setPhosphorDotNeighborBlend:P,setCloseUpNoiseStrength:x,setMonoTint:T,setNeonBoost:$,setNeonSaturation:z,setNeonDetail:ne,setIsFilterEnabled:E,applyAllFilterSettings:g,applyPreset:ae,resetSettings:se}}function er({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:u,controlPanelMode:h,confirmDialog:i,onHighResolutionChange:m,onFitWidthChange:L,onError:M}){const f=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},W=G.useMemo(()=>xt()?.ui,[]),[S,N]=G.useState(W?.isPreviewMaximized??!1),[K,J]=G.useState(!1),[te,Q]=G.useState(!1),[Y,_]=G.useState(0),[A,de]=G.useState(null),[D,v]=G.useState(null),he=G.useRef(null),j=G.useRef(null),U=G.useRef(null),H=G.useRef(null),oe=G.useCallback(()=>{const y=he.current,I=U.current;if(!y||!I)return null;const k=y.getBoundingClientRect(),q=I.getBoundingClientRect();return{left:k.left,width:k.width,height:q.height}},[]),V=G.useCallback(y=>{H.current!==null&&window.clearTimeout(H.current),H.current=window.setTimeout(()=>{de(y),H.current=null},120)},[]),P=G.useCallback(()=>{H.current!==null&&(window.clearTimeout(H.current),H.current=null),de(null)},[]);G.useEffect(()=>{An({isPreviewMaximized:S,isHighResolution:n})},[n,S]),G.useEffect(()=>()=>{H.current!==null&&window.clearTimeout(H.current)},[]),G.useEffect(()=>{if(!S)return;const y=document.body.style.overflow,I=k=>{k.code==="Escape"&&N(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",I),()=>{document.body.style.overflow=y,window.removeEventListener("keydown",I)}},[S]),G.useEffect(()=>{S&&(J(!1),Q(!1),_(0),v(null))},[S]),G.useEffect(()=>{u&&(J(!1),Q(!1),_(0),v(null))},[u]),G.useEffect(()=>{if(h==="playback"||S||K||u){Q(!1),_(0);return}const y=()=>{const I=j.current,k=U.current;if(!I||!k)return;const q=I.getBoundingClientRect().top,fe=k.getBoundingClientRect().height,ve=Math.round(Math.min(fe,window.innerHeight)*.4),me=-Math.max(120,ve);Q(Z=>{if(!Z&&q<=me){_(Math.max(120,ve));const pe=oe();return pe&&v(pe),!0}return Z&&_(Math.max(120,ve)),Z&&q>=-24?(_(0),!1):Z})};return y(),window.addEventListener("scroll",y,{passive:!0}),window.addEventListener("resize",y),()=>{window.removeEventListener("scroll",y),window.removeEventListener("resize",y)}},[h,u,S,K,oe]),G.useEffect(()=>{if(!((K||te)&&!S)){v(null);return}const I=()=>{const k=oe();k&&v(k)};return I(),window.addEventListener("resize",I),window.addEventListener("scroll",I,{passive:!0}),()=>{window.removeEventListener("resize",I),window.removeEventListener("scroll",I)}},[te,S,K,u,oe,r.sourceDimensions]),G.useEffect(()=>{r.refreshLayout()},[K,S,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const x=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),T=!S&&!u&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,$=T?`${T}px`:"60vh",z=G.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),ne=(K||te)&&!S,E=te?`calc(max(0.0rem, env(safe-area-inset-top)) - ${Y}px)`:void 0,ae="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",g="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",se="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",a="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",l=(y,I,k="w-44")=>b.jsx("div",{role:"tooltip","aria-hidden":A!==y,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",k,A===y?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:I}),F=()=>b.jsxs(b.Fragment,{children:[r.canRecord&&b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{P(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording())return;const I=await i({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(r.ensureAudioContext(),!I)return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(y){M?.(y instanceof Error?y:new Error(String(y)))}return}try{await r.startRecording()}catch(y){M?.(y instanceof Error?y:new Error(String(y)))}})()},onMouseEnter:()=>V("record"),onMouseLeave:P,onFocus:()=>V("record"),onBlur:P,className:[a,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?b.jsx(gn,{size:14,className:"fill-current animate-pulse"}):b.jsx(an,{size:16,className:"text-rose-300"})}),l("record",r.isRecording?f.recordStop:f.recordIdle)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(P(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>V("power"),onMouseLeave:P,onFocus:()=>V("power"),onBlur:P,className:[ae,r.isPoweredOn?g:se].join(" "),children:b.jsx(mn,{size:16})}),l("power",r.isPoweredOn?f.powerOff:f.powerOn)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{P(),m(!n)},onMouseEnter:()=>V("hi-res"),onMouseLeave:P,onFocus:()=>V("hi-res"),onBlur:P,className:[ae,n?g:se].join(" "),children:b.jsx(tn,{size:16})}),l("hi-res",f.hiRes)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":u?"Disable fit width":"Enable fit width",onClick:()=>{P(),L(!u)},onMouseEnter:()=>V("fit-width"),onMouseLeave:P,onFocus:()=>V("fit-width"),onBlur:P,className:[ae,u?g:se].join(" "),children:b.jsx(nn,{size:16})}),l("fit-width",u?f.fitWidthOn:f.fitWidthOff)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":ne?"Unpin preview":"Pin preview",onClick:()=>{P(),!(S||u)&&J(y=>{if(!y){const k=oe();return k&&v(k),!0}return Q(!1),_(0),v(null),!1})},onMouseEnter:()=>V("pin"),onMouseLeave:P,onFocus:()=>V("pin"),onBlur:P,className:[ae,S||u?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":ne?g:se].join(" "),disabled:S||u,children:b.jsx(dn,{size:16})}),l("pin",S?f.pinUnavailable:u?f.pinUnavailableFitWidth:ne?f.pinOn:f.pinOff)]}),b.jsxs("div",{className:"relative",children:[b.jsx("button",{type:"button","aria-label":S?"Exit maximize":"Maximize preview",onClick:()=>{P(),N(y=>!y)},onMouseEnter:()=>V("maximize"),onMouseLeave:P,onFocus:()=>V("maximize"),onBlur:P,className:[ae,S?g:se].join(" "),children:S?b.jsx(Qt,{size:16}):b.jsx(ln,{size:16})}),l("maximize",S?f.maximizeOn:f.maximizeOff)]})]});return b.jsxs("div",{ref:he,className:"space-y-4",children:[b.jsx("div",{ref:j,"aria-hidden":"true"}),b.jsxs("div",{ref:U,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${S?u?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":ne?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:ne&&D?{left:`${D.left}px`,top:E??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${D.width}px`}:S?void 0:{overflow:"visible"},children:[S&&(u?b.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:b.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{N(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:b.jsx(Qt,{size:18})})}):b.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{N(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:b.jsx(Qt,{size:18})})),b.jsxs("div",{className:`relative ${S?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:S?u&&z?{aspectRatio:z,width:"100%"}:void 0:u&&z?{aspectRatio:z,width:"100%"}:z?r.sourceDimensions&&r.sourceDimensions.height>r.sourceDimensions.width?{aspectRatio:z,height:T?`${T}px`:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{aspectRatio:z,width:"100%",maxHeight:T?`${T}px`:"min(60vh, calc(100vh - 12rem))",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:$,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[b.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[x&&b.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),b.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&b.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:b.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[b.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),b.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&b.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",x?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:b.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[b.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),b.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),b.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&b.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:b.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[b.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),b.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),b.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),b.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&b.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!u&&b.jsx("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:F()})]}),u&&S&&b.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:F()})]}),u&&!S&&b.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:F()}),ne&&D&&b.jsx("div",{style:{height:`${D.height}px`}})]})}const tr=G.lazy(()=>Ro(()=>import("./VideoControls-DVcVBI6I.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),or=G.lazy(()=>Ro(()=>import("./RetroFilterPanel-WiXdCoLt.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),So=b.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function nr({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:u,onSetTargetWidth:h,onSetTargetHeight:i,onSetMatchTargetAspect:m,onResetSettings:L,onImportSettings:M}){return b.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&b.jsx(G.Suspense,{fallback:So,children:b.jsx(tr,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,noiseReductionAmount:e.noiseReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeNoiseReductionAmount:e.setNoiseReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:L,onImportSettings:M,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&b.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&b.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[b.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:b.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),b.jsx(G.Suspense,{fallback:So,children:b.jsx(or,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:u,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:i,onSetTargetWidth:h,onSetMatchTargetAspect:m,onSetVignetteStrength:o.setVignetteStrength})})]})]})}function yo({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:u,className:h,onError:i,initialFilterState:m,confirmDialog:L}){const{showConfirmDialog:M}=Qo(),f=L??(x=>M({...x,title:x.title??"",body:x.body??""}).then(T=>T??!1)),W=G.useMemo(()=>xt()?.ui,[]),[S,N]=G.useState(W?.isHighResolution??!1),[K,J]=G.useState(!1),[te,Q]=G.useState("playback"),Y=G.useRef(""),_=G.useRef(""),A=$n(m),de=S&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,D=Jn(A,K?"width":"contain",de),v=G.useCallback(()=>{xn(),A.resetSettings(),D.resetAudioSettings(),N(!1)},[A,D]),he=G.useCallback(x=>{A.applyAllFilterSettings(x.filter),D.applyAudioSettings(x.audio),N(x.ui.isHighResolution),$o(x.locale)},[A,D]),j=G.useCallback(()=>{if(!D.sourceDimensions)return;const x=Math.max(8,Math.round(A.targetWidth/D.sourceDimensions.width*D.sourceDimensions.height/8)*8);x!==A.targetHeight&&A.setTargetHeight(x)},[A.targetHeight,A.targetWidth,A.setTargetHeight,D.sourceDimensions]),U=G.useCallback(()=>D.sourceDimensions?.width&&D.sourceDimensions?.height?D.sourceDimensions.width/D.sourceDimensions.height:Math.max(A.targetWidth,1)/Math.max(A.targetHeight,1),[A.targetHeight,A.targetWidth,D.sourceDimensions]),H=G.useCallback(x=>{if(A.setTargetWidth(x),!A.matchTargetAspect)return;const T=Math.max(U(),1e-4);A.setTargetHeight(Math.max(1,Math.round(x/T)))},[A,U]),oe=G.useCallback(x=>{if(A.setTargetHeight(x),!A.matchTargetAspect)return;const T=Math.max(U(),1e-4);A.setTargetWidth(Math.max(1,Math.round(x*T)))},[A,U]),V=G.useCallback(x=>{A.setMatchTargetAspect(x),x&&D.sourceDimensions&&j()},[A,D.sourceDimensions,j]),P=G.useCallback(x=>{if(A.applyPreset(x),x!=="phosphorDot"||!D.sourceDimensions)return;const T=nt.phosphorDot,$=Math.max(D.sourceDimensions.width,1),z=Math.max(D.sourceDimensions.height,1),ne=$/z,E=T.width/T.height;let ae=T.width,g=T.height;ne>E?g=Math.max(8,Math.round(T.width/ne/8)*8):ae=Math.max(8,Math.round(T.height*ne/8)*8),!(T.width===ae&&T.height===g)&&(A.setTargetWidth(ae),A.setTargetHeight(g))},[A.applyPreset,A.setTargetHeight,A.setTargetWidth,D.sourceDimensions]);return G.useEffect(()=>{A.matchTargetAspect&&D.sourceDimensions&&j()},[A.matchTargetAspect,D.sourceDimensions,j]),G.useEffect(()=>{if(o){const T=`stream:${o.id}:${n}:${r??""}`;if(Y.current===T)return;Y.current=T,(async()=>{try{await D.previewStream(o,n==="audio"?"audio":"video",r)}catch($){i?.($ instanceof Error?$:new Error(String($)))}})();return}if(!e){Y.current="";return}const x=`src:${e}:${n}`;Y.current!==x&&(Y.current=x,(async()=>{try{await D.previewUrl(e,n)}catch(T){i?.(T instanceof Error?T:new Error(String(T)))}})())},[e,o,r,n,i,D]),G.useEffect(()=>{D.refreshLayout()},[K,D.refreshLayout]),G.useEffect(()=>{D.refreshLayout()},[A.targetWidth,A.targetHeight,A.isFilterEnabled,de,D.refreshLayout]),G.useEffect(()=>{if(typeof u!="boolean")return;const x=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!x){_.current="";return}const T=`${x}:${u}`;_.current!==T&&(_.current=T,D.setLoopingEnabled(u))},[n,u,D,e,o]),b.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:b.jsxs("div",{className:"space-y-4",children:[b.jsx(er,{locale:t,src:e,kind:n,player:D,isHighResolution:S,isFitWidthEnabled:K,controlPanelMode:te,confirmDialog:f,onHighResolutionChange:N,onFitWidthChange:J,onError:i}),b.jsx(nr,{locale:t,player:D,filterState:A,controlPanelMode:te,onControlPanelModeChange:Q,onApplyPreset:P,onSetTargetWidth:H,onSetTargetHeight:oe,onSetMatchTargetAspect:V,onResetSettings:v,onImportSettings:he})]})})}const ir=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:yo,default:yo},Symbol.toStringTag,{value:"Module"}));export{ce as D,kn as M,wn as R,nt as a,ir as b,xt as l};
