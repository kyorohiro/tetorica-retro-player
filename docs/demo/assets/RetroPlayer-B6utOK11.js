const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-BQtqREg0.js","./index-BYfDTNZ3.js","./index-BZ0MWIlr.css","./RetroFilterPanel-DO6blkTX.js"])))=>i.map(i=>d[i]);
import{b as qe,r as s,R as ho,a as F,j as A,_ as Ro,u as Qo,s as $o}from"./index-BYfDTNZ3.js";const en=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],tn=qe("aperture",en);const on=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],nn=qe("arrow-left-right",on);const rn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],an=qe("circle",rn);const sn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],ln=qe("maximize-2",sn);const cn=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Qt=qe("minimize-2",cn);const un=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],dn=qe("pin",un);const hn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],mn=qe("power",hn);const gn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],pn=qe("square",gn);async function To(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function fn(t,e){await To("plugin:sharekit|share_file",{url:t,...e})}const no="tetorica-retro-player.settings",bt=1,At=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(no);if(!t)return null;const e=JSON.parse(t);return e.version!==bt?null:e}catch{return null}},ro=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(no,JSON.stringify(t))}catch{}},xt=()=>At(),vn=t=>{const e=At();ro({version:bt,audio:e?.audio,filter:t,ui:e?.ui})},bn=t=>{const e=At();ro({version:bt,audio:t,filter:e?.filter,ui:e?.ui})},An=t=>{const e=At();ro({version:bt,audio:e?.audio,filter:e?.filter,ui:t})},xn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(no)}catch{}},ue={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,noiseReductionAmount:0,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},wn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.005,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},Cn=Object.fromEntries(Object.entries(wn).map(([t,e])=>[t,{label:e.label,settings:{...ue,...e.settings}}])),Sn=Object.fromEntries(Object.entries(Cn).map(([t,e])=>[t,e.settings])),yn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function Rn(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n+=1){const u=n*2/255-1;o[n]=Math.tanh(u*r)}return o}function mo(t){const o=new Float32Array(256),r=t*8;for(let n=0;n<256;n++){const u=n*2/255-1;r<.001?o[n]=u:o[n]=Math.tanh(u*(1+r))/Math.tanh(1+r)}return o}function Tn(t){const o=Math.max(1,Math.floor(t.sampleRate*2.2)),r=t.createBuffer(2,o,t.sampleRate),n=Math.floor(t.sampleRate*.012);for(let u=0;u<r.numberOfChannels;u+=1){const h=r.getChannelData(u);for(let a=0;a<o;a+=1){if(a<n)continue;const m=(a-n)/(o-n),L=(1-m)**1.8,E=Math.max(0,1-m*2.5),f=Math.sin(m*160+u*.8)*E*.35;h[a]=(Math.random()*2-1+f)*L*.75}}return r}function Dn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n+=1){const u=r.getChannelData(n);for(let h=0;h<u.length;h+=1){const a=h/u.length,m=(1-a)**1.85,L=.78+.22*Math.sin(a*42+n*.9),E=Math.sin(a*130+n*.35)*.08;u[h]=(Math.random()*2-1+E)*m*L*.28}}return r}function Ln(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let u=0;u<e;u+=1){const h=Math.random()*2-1;r=(r+h*.045)/1.045,n=n*.82+h*.18;const a=r*1.35,m=(h-n)*.55,L=Math.max(-1,Math.min(1,a+m));for(let E=0;E<o.numberOfChannels;E+=1){const f=o.getChannelData(E),N=(Math.random()*2-1)*.012;f[u]=Math.max(-1,Math.min(1,L+N))}}return o}function En(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const h=Math.random()*2-1;n=n*.72+h*.28,o[r]+=(h-n)*.018;const a=Math.random();if(a<.0034){const m=8+Math.floor(Math.random()*42),L=.11+Math.random()*.28,E=Math.random()<.5?-1:1;for(let f=0;f<m&&r+f<e;f+=1){const N=Math.exp(-f/(2.4+Math.random()*5));o[r+f]+=E*L*N*(.7+Math.random()*.3)}r+=m+Math.floor(Math.random()*640);continue}if(a<.0038){const m=90+Math.floor(Math.random()*260),L=.055+Math.random()*.11,E=Math.random()*Math.PI*2;for(let f=0;f<m&&r+f<e;f+=1){const N=Math.exp(-f/(18+Math.random()*40)),y=Math.sin(E+f*(.22+Math.random()*.06));o[r+f]+=L*N*y}r+=m+Math.floor(Math.random()*2200);continue}r+=1}const u=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<u.numberOfChannels;h+=1){const a=u.getChannelData(h);for(let m=0;m<e;m+=1){const L=(Math.random()*2-1)*.0035;a[m]=Math.max(-1,Math.min(1,o[m]+L))}}return u}function Mn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function Do({preset:t,params:e}){return{...ue,...t?Sn[t]:null,...e}}class Bn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:u=!0,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=u,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){yn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...ue,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=Do({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,u=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,a=this.nodes.lofiDrive,m=this.nodes.bitcrusher,L=this.nodes.bassEq,E=this.nodes.midEq,f=this.nodes.trebleEq,N=this.nodes.stereoWidth,y=this.nodes.roomDryGain,G=this.nodes.roomWetGain,K=this.nodes.wowFlutterDelay,J=this.nodes.wowLfo,te=this.nodes.wowLfoGain,Q=this.nodes.flutterLfo,q=this.nodes.flutterLfoGain,_=this.nodes.noiseGain,x=this.nodes.crackleGain,de=this.nodes.vinylDustBedFilter,D=this.nodes.vinylDustBedGain,{settings:v,isPlaying:he,isOutputEnabled:j}=this.runtimeState,W=v.isMuted||!j?0:v.volume;if(e&&(e.gain.value=W),o&&r&&n){const p=v.isAudioFxEnabled?v.radioToneAmount:0;o.frequency.value=20+p*430,o.Q.value=.4+p*.35,r.frequency.value=2e4-p*17400,r.Q.value=.2+p*.9,n.frequency.value=1700,n.Q.value=.8+p*1.4,n.gain.value=p*6}if(u&&h&&a){const p=v.isAudioFxEnabled?v.lofiAmount:0;u.frequency.value=16e3-p*14200,u.Q.value=.3+p*1.8,h.gain.value=-p*18;try{a.curve=Rn(p*.6)}catch{}}if(m){const p=v.isAudioFxEnabled,se=16-(p?v.bitCrushAmount:0)*12,b=1+(p?v.sampleRateReductionAmount:0)*23,U=p?Math.max(v.bitCrushAmount,v.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(se,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(b,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(U,m.context.currentTime)}const O=this.nodes.postCrushLowpass;if(O){const p=v.isAudioFxEnabled?v.noiseReductionAmount:0;O.frequency.value=Math.max(3e3,18e3-p*15e3)}if(L&&E&&f){const p=v.isAudioFxEnabled?15:0;L.gain.value=v.bassAmount*p,E.gain.value=v.midAmount*p,f.gain.value=v.trebleAmount*p}if(N){const p=v.isAudioFxEnabled?1+v.stereoWidthAmount:1;N.parameters.get("width")?.setValueAtTime(p,N.context.currentTime)}if(y&&G){const p=v.isAudioFxEnabled?v.smallSpeakerRoomAmount:0;y.gain.value=Math.max(.52,1-p*.42),G.gain.value=p*.95}if(K&&J&&te&&Q&&q){const p=v.isAudioFxEnabled?v.wowFlutterAmount:0;K.delayTime.value=.006+p*.004,J.frequency.value=.18+p*.42,te.gain.value=p*.0023,Q.frequency.value=5.2+p*6.5,q.gain.value=p*6e-4}if(_&&(_.gain.value=v.isNoiseEnabled&&!v.isMuted&&j&&he?Math.min(.24,v.noiseLevel*5.5):0),x){const p=v.isNoiseEnabled&&!v.isMuted&&j&&he;x.gain.value=p?Math.min(.24,v.vinylDustAmount*.22+v.noiseLevel*.25):0}if(de&&D){const se=v.isNoiseEnabled&&!v.isMuted&&j&&he?v.vinylDustAmount:0;de.frequency.value=2100+se*2600,de.Q.value=.35+se*.25,D.gain.value=se*.11}const oe=this.nodes.echoDelayLine,z=this.nodes.echoFeedbackGain,I=this.nodes.echoWetGain;if(oe&&z&&I){const p=v.isAudioFxEnabled?v.delayAmount:0;z.gain.value=p*.5,I.gain.value=p*.55}const w=this.nodes.hallReverbWetGain;if(w){const p=v.isAudioFxEnabled?v.reverbAmount:0;w.gain.value=p*2}const T=this.nodes.chorusLfoGain1,$=this.nodes.chorusLfoGain2,V=this.nodes.chorusWetGain;if(T&&$&&V){const p=v.isAudioFxEnabled?v.chorusAmount:0;V.gain.value=p*.6,T.gain.value=p*.005,$.gain.value=p*.006}const ne=this.nodes.tapeSaturator;if(ne)try{ne.curve=mo(v.isAudioFxEnabled?v.tapeSaturationAmount:0)}catch{}const M=this.nodes.busCompressor;if(M){const p=v.isAudioFxEnabled?v.compressorAmount:0;M.threshold.value=-36*p,M.ratio.value=1+9*p}const ae=this.nodes.fxOutputGain;ae&&(ae.gain.value=v.isAudioFxEnabled?v.fxOutputTrimAmount:1)}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const u=o.createBiquadFilter(),h=o.createBiquadFilter(),a=o.createBiquadFilter(),m=o.createBiquadFilter(),L=o.createBiquadFilter(),E=o.createWaveShaper();let f=null,N=null;const y=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&y){const le=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICAgIG5zRXJyb3I6IDAsICAvLyBub2lzZSBzaGFwaW5nIGZlZWRiYWNrCiAgICAgIH0pOwogICAgfQoKICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbENvdW50OyBjaGFubmVsICs9IDEpIHsKICAgICAgY29uc3QgaW5wdXRDaGFubmVsID0gaW5wdXQ/LltjaGFubmVsXSA/PyBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IG91dHB1dENoYW5uZWwgPSBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jaGFubmVsU3RhdGVbY2hhbm5lbF07CgogICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3V0cHV0Q2hhbm5lbC5sZW5ndGg7IGluZGV4ICs9IDEpIHsKICAgICAgICBjb25zdCBiaXREZXB0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLmJpdERlcHRoLCBpbmRleCk7CiAgICAgICAgY29uc3QgaG9sZEZyYW1lcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQocmVhZFBhcmFtKHBhcmFtZXRlcnMuaG9sZEZyYW1lcywgaW5kZXgpKSk7CiAgICAgICAgY29uc3QgbWl4ID0gcmVhZFBhcmFtKHBhcmFtZXRlcnMubWl4LCBpbmRleCk7CiAgICAgICAgY29uc3Qgc291cmNlID0gaW5wdXRDaGFubmVsPy5baW5kZXhdID8/IDA7CgogICAgICAgIGlmIChzdGF0ZS5ob2xkQ291bnRlciA8PSAwKSB7CiAgICAgICAgICAvLyDkuInop5Ljg4fjgqPjgrbjg6rjg7PjgrA6IOmHj+WtkOWMluatquOBvyDihpIg44K144Op44K144Op44GX44Gf44OS44K56Z+z44Gr5aSJ5o+bCiAgICAgICAgICBjb25zdCBsc2IgPSAyIC8gTWF0aC5wb3coMiwgYml0RGVwdGgpOwogICAgICAgICAgY29uc3QgZGl0aGVyID0gKE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpIC0gMSkgKiBsc2I7CiAgICAgICAgICAvLyAx5qyh44OO44Kk44K644K344Kn44O844OU44Oz44KwOiDliY3lm57jga7ph4/lrZDljJboqqTlt67jgpLjg5XjgqPjg7zjg4njg5Djg4Pjgq/jgZfjgabpq5jln5/jgbjmirzjgZflh7rjgZkKICAgICAgICAgIGNvbnN0IHNoYXBlZCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBzb3VyY2UgKyBkaXRoZXIgLSBzdGF0ZS5uc0Vycm9yICogMC44NSkpOwogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNoYXBlZCwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUubnNFcnJvciA9IHN0YXRlLmhlbGRTYW1wbGUgLSBzaGFwZWQ7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciA9IGhvbGRGcmFtZXMgLSAxOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciAtPSAxOwogICAgICAgIH0KCiAgICAgICAgb3V0cHV0Q2hhbm5lbFtpbmRleF0gPSBzb3VyY2UgKyAoc3RhdGUuaGVsZFNhbXBsZSAtIHNvdXJjZSkgKiBtaXg7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gdHJ1ZTsKICB9Cn0KCmZ1bmN0aW9uIHJlYWRQYXJhbSh2YWx1ZXMsIGluZGV4KSB7CiAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IDEgPyB2YWx1ZXNbMF0gOiB2YWx1ZXNbaW5kZXhdOwp9CgpmdW5jdGlvbiBxdWFudGl6ZVNhbXBsZShzYW1wbGUsIGJpdERlcHRoKSB7CiAgY29uc3QgcmVzb2x2ZWRCaXREZXB0aCA9IE1hdGgubWF4KDIsIE1hdGgubWluKDE2LCBNYXRoLnJvdW5kKGJpdERlcHRoKSkpOwogIGlmIChyZXNvbHZlZEJpdERlcHRoID49IDE2KSB7CiAgICByZXR1cm4gc2FtcGxlOwogIH0KCiAgY29uc3QgbGV2ZWxzID0gMiAqKiByZXNvbHZlZEJpdERlcHRoOwogIGNvbnN0IG5vcm1hbGl6ZWQgPSAoc2FtcGxlICsgMSkgKiAwLjU7CiAgY29uc3QgcXVhbnRpemVkID0gTWF0aC5yb3VuZChub3JtYWxpemVkICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTsKICByZXR1cm4gcXVhbnRpemVkICogMiAtIDE7Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1iaXRjcnVzaGVyIiwgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(le.href),f=new y(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const Ce=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(Ce.href),N=new y(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const G=o.createBiquadFilter();G.type="lowpass",G.frequency.value=18e3,G.Q.value=.5;const K=o.createBiquadFilter(),J=o.createBiquadFilter(),te=o.createBiquadFilter(),Q=o.createGain(),q=o.createConvolver(),_=o.createGain(),x=o.createDelay(.05),de=o.createOscillator(),D=o.createGain(),v=o.createOscillator(),he=o.createGain();u.type="highpass",h.type="lowpass",a.type="peaking",m.type="lowpass",L.type="highshelf",K.type="lowshelf",K.frequency.value=180,J.type="peaking",J.frequency.value=1200,J.Q.value=.5,te.type="highshelf",te.frequency.value=2800,q.buffer=Dn(o),L.frequency.value=2800,E.oversample="4x",x.delayTime.value=.006,de.type="sine",v.type="sine",de.connect(D),D.connect(x.delayTime),v.connect(he),he.connect(x.delayTime),x.connect(u),u.connect(h),h.connect(a),a.connect(m),m.connect(L),L.connect(E),f?(E.connect(f),f.connect(G)):E.connect(G),G.connect(K),K.connect(J),J.connect(te);const j=o.createWaveShaper();j.curve=mo(0),j.oversample="4x",te.connect(j),N?(j.connect(N),N.connect(Q),N.connect(q)):(j.connect(Q),j.connect(q)),q.connect(_),Q.connect(r),_.connect(r);const W=o.createGain();W.gain.value=1;const O=o.createDynamicsCompressor();O.knee.value=10,O.attack.value=.003,O.release.value=.12,O.threshold.value=0,O.ratio.value=1;const oe=o.createDelay(1);oe.delayTime.value=.32;const z=o.createGain();z.gain.value=0;const I=o.createGain();I.gain.value=0;const w=o.createConvolver();w.buffer=Tn(o);const T=o.createGain();T.gain.value=0;const $=o.createDelay(.05),V=o.createDelay(.05);$.delayTime.value=.018,V.delayTime.value=.023;const ne=o.createOscillator(),M=o.createOscillator();ne.type="sine",M.type="sine",ne.frequency.value=.8,M.frequency.value=1.3;const ae=o.createGain(),p=o.createGain();ae.gain.value=0,p.gain.value=0;const se=o.createGain();se.gain.value=0,r.connect(W),r.connect(oe),oe.connect(z),z.connect(oe),oe.connect(I),I.connect(W),r.connect(w),w.connect(T),T.connect(W),r.connect($),r.connect(V),ne.connect(ae),ae.connect($.delayTime),M.connect(p),p.connect(V.delayTime),$.connect(se),V.connect(se),se.connect(W),ne.start(),M.start();const b=o.createGain();b.gain.value=1,W.connect(O),O.connect(b),this.connectOutputToDestination&&b.connect(o.destination),n&&this.connectOutputToRecordingDestination&&b.connect(n);const U=o.createBufferSource();U.buffer=Ln(o),U.loop=!0;const c=o.createBiquadFilter();c.type="highpass",c.frequency.value=1100,c.Q.value=.25;const i=o.createBiquadFilter();i.type="lowpass",i.frequency.value=5600,i.Q.value=.18;const B=o.createBiquadFilter();B.type="peaking",B.frequency.value=2400,B.Q.value=.7,B.gain.value=-2.5;const k=o.createStereoPanner(),Y=o.createGain(),fe=o.createOscillator(),ve=o.createGain(),me=o.createBufferSource(),Z=o.createBiquadFilter(),ge=o.createBiquadFilter(),xe=o.createGain(),Re=o.createGain();r.gain.value=0,Y.gain.value=0,fe.type="sine",fe.frequency.value=.021,ve.gain.value=.08,me.buffer=En(o),me.loop=!0,Z.type="highpass",Z.frequency.value=1250,Z.Q.value=.35,ge.type="bandpass",ge.frequency.value=2400,ge.Q.value=.4,xe.gain.value=0,Re.gain.value=0,U.connect(c),c.connect(i),i.connect(B),B.connect(k),k.connect(Y),Y.connect(r),fe.connect(ve),ve.connect(k.pan),me.connect(Z),Z.connect(Re),Re.connect(r),me.connect(ge),ge.connect(xe),xe.connect(r),U.start(),fe.start(),me.start(),de.start(),v.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:u,radioToneLowpass:h,radioTonePresence:a,recordingDestination:n,lofiLowpass:m,lofiHighshelf:L,lofiDrive:E,bitcrusher:f,postCrushLowpass:G,bassEq:K,midEq:J,trebleEq:te,stereoWidth:N,roomDryGain:Q,roomConvolver:q,roomWetGain:_,wowFlutterDelay:x,wowLfo:de,wowLfoGain:D,flutterLfo:v,flutterLfoGain:he,noiseSource:U,noiseFilter:B,noisePanner:k,noiseGain:Y,noiseLfo:fe,noiseLfoGain:ve,crackleSource:me,crackleFilter:Z,vinylDustBedFilter:ge,vinylDustBedGain:xe,crackleGain:Re,outputBus:W,echoDelayLine:oe,echoFeedbackGain:z,echoWetGain:I,hallReverbConvolver:w,hallReverbWetGain:T,chorusDelay1:$,chorusDelay2:V,chorusLfo1:ne,chorusLfo2:M,chorusLfoGain1:ae,chorusLfoGain2:p,chorusWetGain:se,tapeSaturator:j,busCompressor:O,fxOutputGain:b})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const u=this.output;if(!u){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(Mn(e)){u.connect(e,o);return}u.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}try{this.nodes.chorusLfo1?.stop()}catch{}try{this.nodes.chorusLfo2?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function Pn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const u={settings:Do(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new Bn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:u,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function $t(){if(typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc.")return!1;const t=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(t)}function ee(t){return{get current(){return t()}}}function In({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:u}){const[h]=s.useState(()=>new AudioContext),[a]=s.useState(()=>{const d=xt()?.audio;return{isMuted:d?.isMuted??ue.isMuted,volume:d?.volume??ue.volume,playbackRate:d?.playbackRate??ue.playbackRate,isLooping:d?.isLooping??ue.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??ue.isAudioFxEnabled,lofiAmount:d?.lofiAmount??ue.lofiAmount,radioToneAmount:d?.radioToneAmount??ue.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??ue.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??ue.sampleRateReductionAmount,noiseReductionAmount:d?.noiseReductionAmount??ue.noiseReductionAmount,bassAmount:d?.bassAmount??ue.bassAmount,midAmount:d?.midAmount??ue.midAmount,trebleAmount:d?.trebleAmount??ue.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??ue.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??ue.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??ue.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??ue.isNoiseEnabled,noiseLevel:d?.noiseLevel??ue.noiseLevel,vinylDustAmount:d?.vinylDustAmount??ue.vinylDustAmount,delayAmount:d?.delayAmount??ue.delayAmount,reverbAmount:d?.reverbAmount??ue.reverbAmount,chorusAmount:d?.chorusAmount??ue.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??ue.tapeSaturationAmount,compressorAmount:d?.compressorAmount??ue.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??ue.fxOutputTrimAmount}}),m=s.useRef(a.isMuted),L=s.useRef(a.volume),E=s.useRef(a.playbackRate),f=s.useRef(a.isLooping),N=s.useRef(a.isAudioFxEnabled),y=s.useRef(a.lofiAmount),G=s.useRef(a.radioToneAmount),K=s.useRef(a.bitCrushAmount),J=s.useRef(a.sampleRateReductionAmount),te=s.useRef(a.noiseReductionAmount),Q=s.useRef(a.bassAmount),q=s.useRef(a.midAmount),_=s.useRef(a.trebleAmount),x=s.useRef(a.stereoWidthAmount),de=s.useRef(a.smallSpeakerRoomAmount),D=s.useRef(a.wowFlutterAmount),v=s.useRef(a.isNoiseEnabled),he=s.useRef(a.noiseLevel),j=s.useRef(a.vinylDustAmount),W=s.useRef(a.delayAmount),O=s.useRef(a.reverbAmount),oe=s.useRef(a.chorusAmount),z=s.useRef(a.tapeSaturationAmount),I=s.useRef(a.compressorAmount),w=s.useRef(a.fxOutputTrimAmount),[T,$]=s.useState(a.isMuted),[V,ne]=s.useState(a.playbackRate),[M,ae]=s.useState(a.volume),[p,se]=s.useState(a.isLooping),[b,U]=s.useState(a.isAudioFxEnabled),[c,i]=s.useState(a.lofiAmount),[B,k]=s.useState(a.radioToneAmount),[Y,fe]=s.useState(a.bitCrushAmount),[ve,me]=s.useState(a.sampleRateReductionAmount),[Z,ge]=s.useState(a.noiseReductionAmount),[xe,Re]=s.useState(a.bassAmount),[le,Ce]=s.useState(a.midAmount),[De,Te]=s.useState(a.trebleAmount),[Ee,Ne]=s.useState(a.stereoWidthAmount),[Me,Pe]=s.useState(a.smallSpeakerRoomAmount),[Be,Ze]=s.useState(a.wowFlutterAmount),[We,Ie]=s.useState(a.isNoiseEnabled),[ye,pe]=s.useState(a.noiseLevel),[be,Qe]=s.useState(a.vinylDustAmount),[Se,Ve]=s.useState(a.delayAmount),[Ae,Ue]=s.useState(a.reverbAmount),[Le,Xe]=s.useState(a.chorusAmount),[ke,$e]=s.useState(a.tapeSaturationAmount),[He,l]=s.useState(a.compressorAmount),[S,H]=s.useState(a.fxOutputTrimAmount),X=s.useRef(null),[g]=s.useState(()=>Pn({context:h,instanceLabel:t,params:a,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[R]=s.useState(()=>({audioContextRef:ee(()=>g.audioContext),masterGainRef:ee(()=>g.masterGain),radioToneHighpassRef:ee(()=>g.radioToneHighpass),radioToneLowpassRef:ee(()=>g.radioToneLowpass),radioTonePresenceRef:ee(()=>g.radioTonePresence),recordingDestinationRef:ee(()=>g.recordingDestination),lofiLowpassRef:ee(()=>g.lofiLowpass),lofiHighshelfRef:ee(()=>g.lofiHighshelf),lofiDriveRef:ee(()=>g.lofiDrive),bitcrusherRef:ee(()=>g.bitcrusher),bassEqRef:ee(()=>g.bassEq),midEqRef:ee(()=>g.midEq),trebleEqRef:ee(()=>g.trebleEq),stereoWidthRef:ee(()=>g.stereoWidth),roomDryGainRef:ee(()=>g.roomDryGain),roomConvolverRef:ee(()=>g.roomConvolver),roomWetGainRef:ee(()=>g.roomWetGain),wowFlutterDelayRef:ee(()=>g.wowFlutterDelay),wowLfoRef:ee(()=>g.wowLfo),wowLfoGainRef:ee(()=>g.wowLfoGain),flutterLfoRef:ee(()=>g.flutterLfo),flutterLfoGainRef:ee(()=>g.flutterLfoGain),noiseSourceRef:ee(()=>g.noiseSource),noiseFilterRef:ee(()=>g.noiseFilter),noisePannerRef:ee(()=>g.noisePanner),noiseGainRef:ee(()=>g.noiseGain),noiseLfoRef:ee(()=>g.noiseLfo),noiseLfoGainRef:ee(()=>g.noiseLfoGain),crackleSourceRef:ee(()=>g.crackleSource),crackleFilterRef:ee(()=>g.crackleFilter),vinylDustBedFilterRef:ee(()=>g.vinylDustBedFilter),vinylDustBedGainRef:ee(()=>g.vinylDustBedGain),crackleGainRef:ee(()=>g.crackleGain)})),{audioContextRef:we,masterGainRef:re,radioToneHighpassRef:rt,radioToneLowpassRef:Ct,radioTonePresenceRef:it,recordingDestinationRef:St,lofiLowpassRef:yt,lofiHighshelfRef:Rt,lofiDriveRef:at,bitcrusherRef:Tt,bassEqRef:st,midEqRef:Dt,trebleEqRef:Lt,stereoWidthRef:Et,roomDryGainRef:lt,roomConvolverRef:Mt,roomWetGainRef:ct,wowFlutterDelayRef:Bt,wowLfoRef:ut,wowLfoGainRef:Pt,flutterLfoRef:dt,flutterLfoGainRef:It,noiseSourceRef:ht,noiseFilterRef:kt,noisePannerRef:Ft,noiseGainRef:Gt,noiseLfoRef:Nt,noiseLfoGainRef:Wt,crackleSourceRef:Ut,crackleFilterRef:Ht,vinylDustBedFilterRef:Ot,vinylDustBedGainRef:zt,crackleGainRef:Vt}=R,Ye=(d,Oe)=>g.debugAudio(d,Oe),mt=()=>g.ensureInitialized(),_t=()=>g.ensureInitialized(),et=()=>g.updateAudioNodes(),jt=d=>g.connectSourceNode(d),Zt=()=>g.disposeAudioEngine(),gt=(d,Oe)=>g.setParams(d,Oe),Xt=d=>g.setIsPlaying(d),Kt=d=>g.setOutputEnabled(d),qt=async d=>{const Oe=await mt();if(!Oe||!g.input){Ye("connectMediaAudio:no-context",{mediaTag:d.tagName});return}X.current&&(Ye("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),X.current.disconnect(),X.current=null);try{const je=Oe.createMediaElementSource(d);je.connect(g.input),X.current=je,$t()?(d.muted=!1,d.volume=0):(d.muted=m.current,d.volume=m.current?0:L.current),Ye("connectMediaAudio:connected",{audioContextState:Oe.state,mediaTag:d.tagName,previewKind:o.current}),et()}catch(je){throw Ye("connectMediaAudio:error",{audioContextState:Oe.state,mediaTag:d.tagName,message:je instanceof Error?je.message:String(je),previewKind:o.current}),je}},Yt=()=>{const d=X.current;!d||!g.input||(d.disconnect(),d.connect(g.input),et())},Jt=async()=>{X.current?.disconnect(),X.current=null,await Zt()},_e=d=>{m.current=d.isMuted,L.current=d.volume,E.current=d.playbackRate,f.current=d.isLooping,N.current=d.isAudioFxEnabled,y.current=d.lofiAmount,G.current=d.radioToneAmount,K.current=d.bitCrushAmount,J.current=d.sampleRateReductionAmount,te.current=d.noiseReductionAmount,Q.current=d.bassAmount,q.current=d.midAmount,_.current=d.trebleAmount,x.current=d.stereoWidthAmount,de.current=d.smallSpeakerRoomAmount,D.current=d.wowFlutterAmount,v.current=d.isNoiseEnabled,he.current=d.noiseLevel,j.current=d.vinylDustAmount,W.current=d.delayAmount,O.current=d.reverbAmount,oe.current=d.chorusAmount,z.current=d.tapeSaturationAmount,I.current=d.compressorAmount,w.current=d.fxOutputTrimAmount,$(d.isMuted),ae(d.volume),ne(d.playbackRate),se(d.isLooping),U(d.isAudioFxEnabled),i(d.lofiAmount),k(d.radioToneAmount),fe(d.bitCrushAmount),me(d.sampleRateReductionAmount),ge(d.noiseReductionAmount),Re(d.bassAmount),Ce(d.midAmount),Te(d.trebleAmount),Ne(d.stereoWidthAmount),Pe(d.smallSpeakerRoomAmount),Ze(d.wowFlutterAmount),Ie(d.isNoiseEnabled),pe(d.noiseLevel),Qe(d.vinylDustAmount),Ve(d.delayAmount),Ue(d.reverbAmount),Xe(d.chorusAmount),$e(d.tapeSaturationAmount),l(d.compressorAmount),H(d.fxOutputTrimAmount),r.current&&($t()&&X.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=d.isMuted,r.current.volume=d.volume),r.current.playbackRate=d.playbackRate,r.current.loop=d.isLooping),gt(d),window.requestAnimationFrame(et)},Je=()=>_e({...ue});return s.useEffect(()=>{m.current=T,L.current=M,E.current=V,f.current=p,N.current=b,y.current=c,G.current=B,K.current=Y,J.current=ve,te.current=Z,Q.current=xe,q.current=le,_.current=De,x.current=Ee,de.current=Me,D.current=Be,v.current=We,he.current=ye,j.current=be,W.current=Se,O.current=Ae,oe.current=Le,z.current=ke,I.current=He,w.current=S,gt({isMuted:T,volume:M,playbackRate:V,isLooping:p,isAudioFxEnabled:b,lofiAmount:c,radioToneAmount:B,bitCrushAmount:Y,sampleRateReductionAmount:ve,noiseReductionAmount:Z,bassAmount:xe,midAmount:le,trebleAmount:De,stereoWidthAmount:Ee,smallSpeakerRoomAmount:Me,wowFlutterAmount:Be,isNoiseEnabled:We,noiseLevel:ye,vinylDustAmount:be,delayAmount:Se,reverbAmount:Ae,chorusAmount:Le,tapeSaturationAmount:ke,compressorAmount:He,fxOutputTrimAmount:S},!0),Xt(n),Kt(e==="video"||e==="audio"||e==="capture"),r.current&&($t()&&X.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=T,r.current.volume=T?0:M),r.current.playbackRate=V,r.current.loop=p)},[T,M,b,c,B,Y,ve,Z,xe,le,De,Ee,Me,Be,We,ye,be,Se,Ae,Le,ke,He,S,n,V,p,e]),s.useEffect(()=>{const d=setTimeout(()=>{bn({isMuted:T,volume:M,playbackRate:V,isLooping:p,isAudioFxEnabled:b,lofiAmount:c,radioToneAmount:B,bitCrushAmount:Y,sampleRateReductionAmount:ve,noiseReductionAmount:Z,bassAmount:xe,midAmount:le,trebleAmount:De,stereoWidthAmount:Ee,smallSpeakerRoomAmount:Me,wowFlutterAmount:Be,isNoiseEnabled:We,noiseLevel:ye,vinylDustAmount:be,delayAmount:Se,reverbAmount:Ae,chorusAmount:Le,tapeSaturationAmount:ke,compressorAmount:He,fxOutputTrimAmount:S})},300);return()=>clearTimeout(d)},[T,M,V,p,b,c,B,Y,ve,Z,xe,le,De,Ee,Me,Be,We,ye,be,Se,Ae,Le,ke,He,S]),{audioContextRef:we,mediaSourceRef:X,masterGainRef:re,radioToneHighpassRef:rt,radioToneLowpassRef:Ct,radioTonePresenceRef:it,recordingDestinationRef:St,lofiLowpassRef:yt,lofiHighshelfRef:Rt,lofiDriveRef:at,bitcrusherRef:Tt,bassEqRef:st,midEqRef:Dt,trebleEqRef:Lt,stereoWidthRef:Et,roomDryGainRef:lt,roomConvolverRef:Mt,roomWetGainRef:ct,wowFlutterDelayRef:Bt,wowLfoRef:ut,wowLfoGainRef:Pt,flutterLfoRef:dt,flutterLfoGainRef:It,noiseSourceRef:ht,noiseFilterRef:kt,noisePannerRef:Ft,noiseGainRef:Gt,noiseLfoRef:Nt,noiseLfoGainRef:Wt,crackleSourceRef:Ut,crackleFilterRef:Ht,vinylDustBedFilterRef:Ot,vinylDustBedGainRef:zt,crackleGainRef:Vt,isMutedRef:m,volumeRef:L,playbackRateRef:E,isLoopingRef:f,isAudioFxEnabledRef:N,lofiAmountRef:y,radioToneAmountRef:G,bitCrushAmountRef:K,sampleRateReductionAmountRef:J,bassAmountRef:Q,midAmountRef:q,trebleAmountRef:_,stereoWidthAmountRef:x,smallSpeakerRoomAmountRef:de,wowFlutterAmountRef:D,isNoiseEnabledRef:v,noiseLevelRef:he,vinylDustAmountRef:j,delayAmountRef:W,reverbAmountRef:O,chorusAmountRef:oe,tapeSaturationAmountRef:z,compressorAmountRef:I,fxOutputTrimAmountRef:w,isMuted:T,setIsMuted:$,playbackRate:V,setPlaybackRate:ne,volume:M,setVolume:ae,isLooping:p,setIsLooping:se,isAudioFxEnabled:b,setIsAudioFxEnabled:U,lofiAmount:c,setLofiAmount:i,radioToneAmount:B,setRadioToneAmount:k,bitCrushAmount:Y,setBitCrushAmount:fe,sampleRateReductionAmount:ve,setSampleRateReductionAmount:me,noiseReductionAmount:Z,setNoiseReductionAmount:ge,bassAmount:xe,setBassAmount:Re,midAmount:le,setMidAmount:Ce,trebleAmount:De,setTrebleAmount:Te,stereoWidthAmount:Ee,setStereoWidthAmount:Ne,smallSpeakerRoomAmount:Me,setSmallSpeakerRoomAmount:Pe,wowFlutterAmount:Be,setWowFlutterAmount:Ze,isNoiseEnabled:We,setIsNoiseEnabled:Ie,noiseLevel:ye,setNoiseLevel:pe,vinylDustAmount:be,setVinylDustAmount:Qe,delayAmount:Se,setDelayAmount:Ve,reverbAmount:Ae,setReverbAmount:Ue,chorusAmount:Le,setChorusAmount:Xe,tapeSaturationAmount:ke,setTapeSaturationAmount:$e,compressorAmount:He,setCompressorAmount:l,fxOutputTrimAmount:S,setFxOutputTrimAmount:H,debugAudio:Ye,ensureAudioContext:_t,ensureInitialized:mt,updateAudioNodes:et,connectSourceNode:jt,connectMediaAudio:qt,reconnectCurrentMediaAudio:Yt,applyAudioSettings:_e,resetAudioSettings:Je,disposeAudioEngine:Jt}}const kn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeCel:{label:"Anime Cel",width:640,height:360,colors:16,dither:0,palette:"anime",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.15,toonSteps:0,edgeBoost:.3,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:8,edgeBoost:.22,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},Fn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:t==="anime"?10:0,Gn=`#version 300 es
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
uniform float uAnimeEdgeLow;
uniform float uAnimeEdgeHigh;
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
  // 4x4x2 uniform grid: r,g in {0, 1/3, 2/3, 1}, b in {0, 1}
  return vec3(
    round(color.r * 3.0) / 3.0,
    round(color.g * 3.0) / 3.0,
    round(color.b)
  );
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
  // 4x4x4 uniform grid: each channel independently snaps to nearest of {0, 1/3, 2/3, 1}
  return round(color * 3.0) / 3.0;
}

vec3 rgb2hsv(vec3 c)
{
  vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 1.0e-10)), d / (q.x + 1.0e-10), q.x);
}

vec3 hsv2rgb(vec3 c)
{
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Anime cel palette: quantize V only, keep H/S continuous.
// Smooth hue zone boundaries prevent checkerboard artifacts.
// Skin shadows get a subtle cool hue shift.
vec3 nearestColorAnime(vec3 color)
{
  vec3 hsv = rgb2hsv(color);
  float h = hsv.x;
  float s = hsv.y;
  float v = hsv.z;

  // Skin zone weight for shadow hue shift only
  float skinWeight = max(
    smoothstep(0.10, 0.05, h),
    smoothstep(0.90, 0.95, h)
  ) * smoothstep(0.08, 0.20, s);

  // Uniform 3 steps for all hues — fewest artifacts, strongest cel look
  float vQ = round(v * 2.0) / 2.0;

  // Skin shadow: drift hue slightly toward cool pink/purple
  float shadowDepth = max(0.0, v - vQ);
  float hQ = fract(h + skinWeight * shadowDepth * 0.12);

  // S stays continuous — no quantization to avoid gradient noise
  return hsv2rgb(vec3(hQ, s, vQ));
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

  if (paletteMode < 8.5) {
    return monochromePalette(color, max(levels, 2.0), monoTint);
  }

  if (paletteMode < 10.5) {
    return nearestColorAnime(color);
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
  bool isNeon = uPaletteMode > 8.5 && uPaletteMode < 9.5;

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

float computeAnimeEdge(vec2 uv, vec2 texel)
{
  vec3 tl = texture(uTexture, clamp(uv + vec2(-texel.x, -texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 tc = texture(uTexture, clamp(uv + vec2( 0.0,     -texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 tr = texture(uTexture, clamp(uv + vec2( texel.x, -texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 ml = texture(uTexture, clamp(uv + vec2(-texel.x,  0.0    ), vec2(0.0), vec2(1.0))).rgb;
  vec3 mr = texture(uTexture, clamp(uv + vec2( texel.x,  0.0    ), vec2(0.0), vec2(1.0))).rgb;
  vec3 bl = texture(uTexture, clamp(uv + vec2(-texel.x,  texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 bc = texture(uTexture, clamp(uv + vec2( 0.0,      texel.y), vec2(0.0), vec2(1.0))).rgb;
  vec3 br = texture(uTexture, clamp(uv + vec2( texel.x,  texel.y), vec2(0.0), vec2(1.0))).rgb;

  vec3 gx = -tl + tr - 2.0*ml + 2.0*mr - bl + br;
  vec3 gy = -tl - 2.0*tc - tr + bl + 2.0*bc + br;
  return clamp(length(vec2(length(gx), length(gy))) * 0.4, 0.0, 1.0);
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
  bool isNeon = uPaletteMode > 8.5 && uPaletteMode < 9.5;

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
    if (uToonSteps >= 2.0) {
      float edge = computeAnimeEdge(pixelatedUv, texel);
      float edgeMix = smoothstep(uAnimeEdgeLow, uAnimeEdgeHigh, edge) * edgeBoost;
      color.rgb = mix(color.rgb, vec3(0.0), clamp(edgeMix, 0.0, 1.0));
    } else {
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
`,Wn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),po=640,eo=()=>typeof performance<"u"?performance.now():Date.now(),to=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,fo=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Un=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,vo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),vt=t=>({width:to(t)?t.videoWidth:fo(t)?t.naturalWidth:t.width,height:to(t)?t.videoHeight:fo(t)?t.naturalHeight:t.height}),Hn=(t,e,o)=>to(t)&&(e>po||o>po),wt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),On=t=>wt(t)&&t.phosphorDotInternalScale?2:1,zn=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},Vn=(t,e,o,r,n,u)=>{if(!wt(o)||n===void 0||u===void 0||n<=0||u<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+o.bulbRadius*1.15),a=Math.max(1,h/Math.max(r,1)),m=Math.max(1,Math.floor(n/a)),L=Math.max(1,Math.floor(u/a)),E=Math.min(1,m/Math.max(t,1),L/Math.max(e,1));return{width:Math.max(1,Math.round(t*E)),height:Math.max(1,Math.round(e*E))}},oo=(t,e,o,r,n)=>{const u=On(t),h=Math.max(t.targetWidth,1),a=Math.max(t.targetHeight,1),m=t.matchTargetAspect?zn(h,a,e,o):{width:h,height:a},L=m.width*u,E=m.height*u,f=Vn(L,E,t,u,r,n);return{width:f.width,height:f.height,sampleWidth:Math.max(1,Math.round(L)),sampleHeight:Math.max(1,Math.round(E)),internalScale:u,isPhosphorDotMode:wt(t)}};function bo(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function Ao(t,e,o){const r=bo(t,t.VERTEX_SHADER,e),n=bo(t,t.FRAGMENT_SHADER,o),u=t.createProgram();if(!u)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(u,r),t.attachShader(u,n),t.bindAttribLocation(u,0,"aPosition"),t.linkProgram(u),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(u,t.LINK_STATUS)){const h=t.getProgramInfoLog(u)||"Unknown program link error.";throw t.deleteProgram(u),new Error(h)}return u}class _n{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=eo();constructor(e){this.gl=e,this.filterProgram=Ao(e,go,Gn),this.passthroughProgram=Ao(e,go,Nn);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,Wn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uAnimeEdgeLow:e.getUniformLocation(this.filterProgram,"uAnimeEdgeLow"),uAnimeEdgeHigh:e.getUniformLocation(this.filterProgram,"uAnimeEdgeHigh"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=eo()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const u=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),vo(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const h=vt(o);this.applyFilterUniforms(r,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(vo(e)||!o.isFilterEnabled)return e;const r=vt(e);if(r.width<=0||r.height<=0||Hn(e,r.width,r.height))return e;const{width:n,height:u,sampleWidth:h,sampleHeight:a,isPhosphorDotMode:m}=oo(o,r.width,r.height),L=Math.max(1,Math.round(m?h:n)),E=Math.max(1,Math.round(m?a:u)),f=this.ensureUploadContext();return!f||!this.uploadCanvas?e:(this.uploadCanvas.width!==L&&(this.uploadCanvas.width=L),this.uploadCanvas.height!==E&&(this.uploadCanvas.height=E),f.imageSmoothingEnabled=!0,f.imageSmoothingQuality="high",f.fillStyle="#000",f.fillRect(0,0,L,E),f.drawImage(e,0,0,L,E),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,u=Un(n.canvas)?n.canvas:null,h=Math.max(u?.clientWidth??n.drawingBufferWidth,1),a=Math.max(u?.clientHeight??n.drawingBufferHeight,1),{width:m,height:L,sampleWidth:E,sampleHeight:f,isPhosphorDotMode:N}=oo(e,o,r,h,a);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,m,L),n.uniform2f(this.uniformLocations.uSampleTargetSize,E,f),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,Fn(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uAnimeEdgeLow,e.animeEdgeLow),n.uniform1f(this.uniformLocations.uAnimeEdgeHigh,e.animeEdgeHigh),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*L/(Math.max(n.drawingBufferHeight,1)*m)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,N?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...kn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(eo()-this.startedAt)/1e3)}}function jn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:u,debugVideo:h}){const a=s.useRef(null),m=s.useRef(null),L=s.useRef(null),E=s.useRef(null),f=s.useRef(null),N=s.useRef(null),y=s.useRef(null),G=s.useRef(null),K=s.useRef(()=>{}),J=s.useRef(t),te=s.useRef(r),Q=s.useRef(!1),q=s.useRef(null),_=s.useRef(null),x=s.useRef(null),[de,D]=s.useState(!1),[v,he]=s.useState(null);J.current=t,te.current=r;const j=s.useCallback(b=>{he(U=>{const c=typeof b=="function"?b(U):b;return x.current=c,c})},[]),W=s.useCallback(()=>{const b=m.current,U=f.current;b&&(b.pipeline.setOutputEnabled(te.current),b.pipeline.setSource(U),b.pipeline.setFilterState(J.current),b.pipeline.render())},[]);s.useLayoutEffect(()=>{K.current=W},[W]);const O=s.useCallback(()=>{Q.current=!1,G.current!==null&&(window.cancelAnimationFrame(G.current),G.current=null)},[]),oe=s.useCallback(()=>{if(Q.current)return;Q.current=!0;const b=()=>{if(!Q.current)return;if(K.current(),!(u.current==="video"||u.current==="capture"||u.current==="image"||n.current)){G.current=null,Q.current=!1;return}G.current=window.requestAnimationFrame(b)};G.current=window.requestAnimationFrame(b)},[n,u]),z=s.useCallback(()=>{W()},[W]),I=s.useCallback(()=>{W()},[W]),w=s.useCallback(()=>{W()},[W]),T=s.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),N.current={},W(),N.current),[W]),$=s.useCallback((b,U,c)=>{if(!b)return;const{width:i,height:B}=vt(c);if(i<=0||B<=0)return;const k=a.current,Y=k?.clientWidth??b.canvas.width,fe=k?.clientHeight??b.canvas.height,me=e==="width"?Y/i:Math.min(Y/i,fe/B),Z=i*me,ge=B*me,xe=(Y-Z)/2,Re=(fe-ge)/2,le={width:Z,height:ge,x:xe,y:Re},Ce=x.current;return Ce&&Ce.width===le.width&&Ce.height===le.height&&Ce.x===le.x&&Ce.y===le.y?Ce:(x.current=le,j(le),le)},[e,j]),V=s.useCallback(()=>{f.current&&$(m.current,null,f.current)},[$]),ne=s.useCallback(()=>{W()},[W]),M=s.useCallback(()=>{const b=m.current,U=a.current;if(!b||!U)return;V();const c=x.current??{x:0,y:0,width:U.clientWidth,height:U.clientHeight},i=Math.max(1,Math.round(c.width)),B=Math.max(1,Math.round(c.height)),k=J.current,Y=f.current?vt(f.current):null,{width:fe,height:ve}=oo(k,Y?.width,Y?.height,i,B),me=Math.max(1,Math.round(i*Math.max(1,o))),Z=Math.max(1,Math.round(B*Math.max(1,o))),ge=Math.max(1,Math.round(Math.max(1,fe)*Math.max(1,o))),xe=Math.max(1,Math.round(Math.max(1,ve)*Math.max(1,o))),Re=wt(k),le=k.isFilterEnabled&&Re?Math.max(me,ge):me,Ce=k.isFilterEnabled&&Re?Math.max(Z,xe):Z;b.canvas.width!==le&&(b.canvas.width=le),b.canvas.height!==Ce&&(b.canvas.height=Ce),b.canvas.style.position="absolute",b.canvas.style.left=`${Math.round(c.x)}px`,b.canvas.style.top=`${Math.round(c.y)}px`,b.canvas.style.width=`${i}px`,b.canvas.style.height=`${B}px`,b.canvas.style.imageRendering="pixelated",W()},[V,W,o]),ae=s.useCallback(()=>{q.current!==null&&(window.cancelAnimationFrame(q.current),q.current=null),_.current!==null&&(window.clearTimeout(_.current),_.current=null),q.current=window.requestAnimationFrame(()=>{q.current=null,M()}),_.current=window.setTimeout(()=>{_.current=null,M()},120)},[M]),p=s.useCallback(async()=>{if(!m.current){if(y.current){await y.current;return}y.current=(async()=>{const b=a.current;if(!b||m.current)return;const U=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:b.isConnected,hostWidth:b.clientWidth??null,hostHeight:b.clientHeight??null,resolution:o});const c=document.createElement("canvas");c.style.display="block",c.style.width="100%",c.style.height="100%",c.style.imageRendering="pixelated",c.style.background="#020617";const i=c.getContext("webgl2");if(!i)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-U)*10)/10});const B={canvas:c,pipeline:new _n(i),ticker:{start:oe,stop:O}},k=a.current;if(!k||k!==b||!k.isConnected)return;k.style.position="relative",k.appendChild(c),m.current=B,N.current={},D(!0),h("initWebGL:ready",{hostWidth:k.clientWidth??null,hostHeight:k.clientHeight??null,resolution:o}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-U)*10)/10}),M();const Y=u.current==="video"||u.current==="capture"||u.current==="image"||n.current;r&&Y&&oe(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-U)*10)/10,shouldAnimateOnInit:Y})})();try{await y.current}finally{y.current=null}}},[h,r,M,o,oe,O]),se=s.useCallback(()=>{y.current=null,O(),q.current!==null&&(window.cancelAnimationFrame(q.current),q.current=null),_.current!==null&&(window.clearTimeout(_.current),_.current=null);const b=m.current;b&&(b.pipeline.dispose(),b.canvas.remove()),m.current=null,N.current=null,j(null),D(!1)},[O,j]);return s.useEffect(()=>{const b=a.current;if(!b)return;if(typeof ResizeObserver<"u"){const c=new ResizeObserver(()=>{ae()});return c.observe(b),()=>{c.disconnect()}}const U=()=>{ae()};return window.addEventListener("resize",U),()=>{window.removeEventListener("resize",U)}},[ae]),{canvasHostRef:a,appRef:m,spriteRef:L,textureRef:E,previewElementRef:f,filterRef:N,isRendererReady:de,viewportRect:v,setViewportRect:j,applyFilterState:z,createVideoTexture:b=>null,destroyPixi:se,fitCurrentSprite:V,fitSprite:$,initPixi:p,refreshLayout:M,resetFilterInstance:T,safeRender:ne,scheduleRefreshLayout:ae,syncSpriteFilter:I,syncTexturePresentation:w}}const Zn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Xn=()=>typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function Kn({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:u,streamRef:h,streamOwnedRef:a,previewRequestIdRef:m,isPlayingRef:L,previewKindRef:E,audioContextRef:f,mediaSourceRef:N,masterGainRef:y,noiseGainRef:G,isMutedRef:K,volumeRef:J,playbackRateRef:te,isLoopingRef:Q,isAudioFxEnabled:q,lofiAmount:_,bitCrushAmount:x,sampleRateReductionAmount:de,bassAmount:D,midAmount:v,trebleAmount:he,stereoWidthAmount:j,smallSpeakerRoomAmount:W,isMuted:O,volume:oe,previewKind:z,setPreviewName:I,setPreviewError:w,setNeedsUserPlay:T,setIsPlaying:$,setCurrentTime:V,setDuration:ne,setPlaybackRate:M,setIsLooping:ae,setSourceDimensions:p,setViewportRect:se,setPreviewKindState:b,setIsPoweredOn:U,beginLoading:c,finishLoading:i,ensureAudioContext:B,updateAudioNodes:k,connectMediaAudio:Y,fitSprite:fe,refreshLayout:ve,scheduleRefreshLayout:me,safeRender:Z,resetFilterInstance:ge,initPixi:xe,resetPerfAccumulators:Re,debugVideo:le,debugAudio:Ce}){const De=async()=>{Zn()&&await new Promise(l=>{window.setTimeout(l,220)})},Te=()=>{const l=f.current?.currentTime;if(G.current)if(typeof l=="number"){const S=G.current.gain;S.cancelScheduledValues(l),S.setValueAtTime(S.value,l),S.linearRampToValueAtTime(0,l+.03)}else G.current.gain.value=0;if(y.current)if(typeof l=="number"){const S=y.current.gain;S.cancelScheduledValues(l),S.setValueAtTime(S.value,l),S.linearRampToValueAtTime(0,l+.03)}else y.current.gain.value=0},Ee=()=>{G.current&&(G.current.gain.value=0)},Ne=l=>l instanceof DOMException&&(l.name==="NotAllowedError"||l.name==="AbortError")?!0:l instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(l.message):!1,Me=l=>Ne(l)?(i(),w(""),T(!0),pe(),Z(),!0):!1,Pe=(l,S,H=!0)=>{Te(),l.muted=!0,l.volume=0,l.pause(),l.srcObject instanceof MediaStream&&(H&&l.srcObject.getTracks().forEach(X=>X.stop()),l.srcObject=null),l.src="",l.load(),S?.startsWith("blob:")&&URL.revokeObjectURL(S)},Be=l=>new Promise((S,H)=>{const X=re=>re?re.code===MediaError.MEDIA_ERR_ABORTED?"aborted":re.code===MediaError.MEDIA_ERR_NETWORK?"network":re.code===MediaError.MEDIA_ERR_DECODE?"decode":re.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${re.code}`:"unknown",g=()=>{l.removeEventListener("loadeddata",R),l.removeEventListener("canplay",R),l.removeEventListener("error",we)},R=()=>{g(),S()},we=()=>{g(),H(new Error(`動画の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${X(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){S();return}l.addEventListener("loadeddata",R,{once:!0}),l.addEventListener("canplay",R,{once:!0}),l.addEventListener("error",we,{once:!0}),l.load()}),Ze=l=>new Promise((S,H)=>{const X=re=>re?re.code===MediaError.MEDIA_ERR_ABORTED?"aborted":re.code===MediaError.MEDIA_ERR_NETWORK?"network":re.code===MediaError.MEDIA_ERR_DECODE?"decode":re.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${re.code}`:"unknown",g=()=>{l.removeEventListener("loadedmetadata",R),l.removeEventListener("canplay",R),l.removeEventListener("error",we)},R=()=>{g(),S()},we=()=>{g(),H(new Error(`音声の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${X(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_METADATA){S();return}l.addEventListener("loadedmetadata",R,{once:!0}),l.addEventListener("canplay",R,{once:!0}),l.addEventListener("error",we,{once:!0}),l.load()}),We=l=>new Promise((S,H)=>{const X=()=>{l.removeEventListener("load",g),l.removeEventListener("error",R)},g=()=>{X(),S()},R=()=>{X(),H(new Error("画像の読み込みに失敗しました。"))};if(l.complete&&l.naturalWidth>0&&l.naturalHeight>0){S();return}l.addEventListener("load",g,{once:!0}),l.addEventListener("error",R,{once:!0})}),Ie=l=>{l.addEventListener("play",pe),l.addEventListener("pause",pe),l.addEventListener("pause",Te),l.addEventListener("abort",Te),l.addEventListener("emptied",Te),l.addEventListener("loadstart",Te),l.addEventListener("seeking",Te),l.addEventListener("stalled",Te),l.addEventListener("suspend",Te),l.addEventListener("waiting",Te),l.addEventListener("volumechange",pe),l.addEventListener("timeupdate",pe),l.addEventListener("durationchange",pe),l.addEventListener("seeked",pe),l.addEventListener("ended",pe),l.addEventListener("ratechange",pe),l instanceof HTMLVideoElement&&l.addEventListener("resize",()=>{const S=l.videoWidth,H=l.videoHeight;S>0&&H>0&&(p({width:S,height:H}),me())})},ye=l=>{l.loop=Q.current,l.muted=K.current,l.volume=K.current?0:J.current,l.playbackRate=te.current,l.autoplay=!1,l.preload="auto",l.crossOrigin="anonymous",l instanceof HTMLVideoElement&&(l.playsInline=!0)},pe=()=>{if(!n.current){le("syncVideoState:no-media",{previewKind:E.current,hasPreviewElement:!!r.current}),L.current=!1,$(!1),V(0),ne(0),k(),Z();return}L.current=!n.current.paused,$(!n.current.paused),n.current.paused||i(),V(n.current.currentTime),ne(n.current.duration||0),M(n.current.playbackRate||1),ae(n.current.loop),k(),Z()},be=()=>{le("cleanupPreview:start",{previewKind:E.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),Te(),m.current+=1,i();const l=n.current,S=h.current,H=a.current;e.current=null,o.current=null,n.current=null,r.current=null,h.current=null,a.current=!1,N.current?.disconnect(),N.current=null,T(!1),L.current=!1,$(!1),V(0),ne(0),b(null),p(null),se(null),u.current?.startsWith("blob:")&&URL.revokeObjectURL(u.current),u.current=null,l?Pe(l,void 0,H):H&&S?.getTracks().forEach(X=>X.stop()),Z()},Qe=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),Te(),be(),f.current?.state==="running"&&f.current.suspend()},Se=()=>{U(!0),t.current?.ticker.start();try{Re?.()}catch{}},Ve=async()=>{if(n.current)try{await B(),Xn()&&N.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=K.current,n.current.volume=K.current?0:J.current),await n.current.play(),L.current=!0,$(!0),w(""),T(!1),Ce("playVideoWithAudio",{audioContextState:f.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:q,lofiAmount:_,bitCrushAmount:x,sampleRateReductionAmount:de,bassAmount:D,midAmount:v,trebleAmount:he,stereoWidthAmount:j,smallSpeakerRoomAmount:W,isMuted:O,volume:oe}),k(),pe(),Z(),me(),window.requestAnimationFrame(k)}catch(l){if(i(),Ne(l)){T(!0),w("");return}T(!1),w(l instanceof Error?l.message:"音声付き再生を開始できませんでした。")}},Ae=async()=>{if(await xe(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Ue=async(l,S)=>{const H=await Ae();r.current=l,fe(H,null,l),b(S),p(l instanceof HTMLVideoElement?{width:l.videoWidth,height:l.videoHeight}:{width:l.naturalWidth,height:l.naturalHeight}),Z(),ve(),me(),t.current?.ticker.start()},Le=async l=>{const S=l.type.startsWith("video/"),H=l.type.startsWith("audio/"),X=l.type.startsWith("image/");if(!S&&!H&&!X){w("動画、音声、または画像ファイルを選んでください。");return}Se(),be(),ge();const g=m.current;w(""),I(l.name),c(S?"Loading video preview...":H?"Loading audio preview...":"Loading image preview...");let R=null;try{if(await Ae(),R=URL.createObjectURL(l),u.current=R,S||H){const re=S?document.createElement("video"):document.createElement("audio");if(re.src=R,ye(re),Ie(re),re instanceof HTMLVideoElement?await Be(re):await Ze(re),g!==m.current){Pe(re,R);return}n.current=re,re instanceof HTMLVideoElement?await Ue(re,"video"):(r.current=null,b("audio"),p(null),se(null),Z()),await Y(re),pe(),await De(),await Ve(),g===m.current&&i();return}const we=new Image;if(we.src=R,we.crossOrigin="anonymous",await We(we),g!==m.current){R.startsWith("blob:")&&URL.revokeObjectURL(R);return}n.current=null,Ee(),k(),await Ue(we,"image"),pe(),g===m.current&&i()}catch(we){if(g!==m.current){R?.startsWith("blob:")&&URL.revokeObjectURL(R);return}if(Ne(we)){Me(we);return}be(),w(we instanceof Error?we.message:"動画プレビューに失敗しました。"),T(!1)}},Xe=async()=>{if(Se(),!navigator.mediaDevices?.getDisplayMedia){w("このブラウザでは画面キャプチャーに対応していません。");return}be();const l=m.current;w(""),I("Display Capture"),c("Preparing display capture...");try{await Ae();const S=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(l!==m.current){S.getTracks().forEach(X=>X.stop());return}const H=document.createElement("video");H.srcObject=S,ye(H),Ie(H),S.getVideoTracks()[0]?.addEventListener("ended",()=>{ke()}),await Be(H),h.current=S,a.current=!0,n.current=H,await Ue(H,"capture"),await Y(H),T(!1),await De(),await Ve(),l===m.current&&i()}catch(S){if(l!==m.current||Me(S))return;be(),w(S instanceof Error?S.message:"画面キャプチャーを開始できませんでした。")}},ke=()=>{z==="capture"&&(be(),I(""),w(""))};return{cleanupPreview:be,cleanupForPageLeave:Qe,playVideoWithAudio:Ve,previewFile:Le,previewStream:async(l,S="video",H="Media Stream")=>{let X=0;try{if(Se(),be(),ge(),X=m.current,w(""),I(H),c(S==="video"?"Loading stream preview...":"Loading stream audio..."),await Ae(),S==="video"){const g=document.createElement("video");if(g.srcObject=l,ye(g),Ie(g),await Be(g),X!==m.current){Pe(g,void 0,!1);return}h.current=l,a.current=!1,n.current=g,await Ue(g,"capture"),await Y(g)}else{const g=document.createElement("audio");if(g.srcObject=l,ye(g),Ie(g),await Ze(g),X!==m.current){Pe(g,void 0,!1);return}h.current=l,a.current=!1,n.current=g,r.current=null,b("audio"),p(null),se(null),Z(),await Y(g),pe()}if(X!==m.current)return;await De(),await Ve(),X===m.current&&i()}catch(g){if(X!==m.current||Me(g))return;be(),w(g instanceof Error?g.message:String(g))}},previewUrl:async(l,S="video")=>{let H=0;const X=typeof performance<"u"?performance.now():Date.now(),g=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-X)*10)/10;try{if(le("startup:previewUrl:start",{url:l,kind:S}),Se(),be(),ge(),H=m.current,w(""),I(l),c(S==="video"?"Loading video preview...":S==="image"?"Loading image preview...":"Loading audio preview..."),await Ae(),le("startup:previewUrl:renderer-ready",{kind:S,elapsedMs:g()}),S==="video"){const R=document.createElement("video");if(R.src=l,ye(R),Ie(R),await Be(R),le("startup:previewUrl:video-ready",{elapsedMs:g(),readyState:R.readyState,videoWidth:R.videoWidth,videoHeight:R.videoHeight}),H!==m.current){Pe(R,l);return}n.current=R,await Ue(R,"video"),await Y(R),pe()}else if(S==="image"){const R=new Image;if(R.src=l,R.crossOrigin="anonymous",await We(R),le("startup:previewUrl:image-ready",{elapsedMs:g(),naturalWidth:R.naturalWidth,naturalHeight:R.naturalHeight}),H!==m.current)return;n.current=null,Ee(),k(),await Ue(R,"image"),pe()}else{const R=document.createElement("audio");if(R.src=l,ye(R),Ie(R),await Ze(R),le("startup:previewUrl:audio-ready",{elapsedMs:g(),readyState:R.readyState,duration:R.duration}),H!==m.current){Pe(R,l);return}r.current=null,b("audio"),p(null),se(null),n.current=R,Z(),await Y(R),pe()}if(H!==m.current)return;(S==="video"||S==="audio")&&(await De(),await Ve()),H===m.current&&(i(),le("startup:previewUrl:done",{kind:S,elapsedMs:g()}))}catch(R){if(le("startup:previewUrl:error",{kind:S,elapsedMs:g(),error:R instanceof Error?R.message:String(R)}),H!==m.current||Me(R))return;be(),w(R instanceof Error?R.message:String(R))}},startDisplayCapture:Xe,stopDisplayCapture:ke,syncVideoState:pe,releaseDetachedMedia:Pe,ensurePixiReady:Ae}}let qn=0;const xo=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),wo=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Yn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function Jn(t,e,o=1){const r=s.useRef(`player-${qn+=1}`),n=s.useRef(null),u=s.useRef(null),h=s.useRef(!1),a=s.useRef(null),m=s.useRef(null),L=s.useRef([]),E=s.useRef(null),f=s.useRef(null),N=s.useRef(null),y=s.useRef(null),G=s.useRef(null),K=s.useRef(0),J=s.useRef(!1),te=s.useRef(null),Q=s.useRef(!1),[q,_]=s.useState(""),[x,de]=s.useState(""),[D,v]=s.useState(!0),[he,j]=s.useState(""),[W,O]=s.useState(!1),[oe,z]=s.useState(!1),[I,w]=s.useState(!1),[T,$]=s.useState(0),[V,ne]=s.useState(0),[M,ae]=s.useState(null),[p,se]=s.useState(null),[b,U]=s.useState(!1),[c,i]=s.useState(null),B=(C,P)=>{if(!Yn())return;const ie=P?` ${JSON.stringify(P)}`:"";console.log(`[retro-player video][${r.current}] ${C}${ie}`)},k=jn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:D,isPlayingRef:J,previewKindRef:te,debugVideo:B}),{canvasHostRef:Y,appRef:fe,spriteRef:ve,textureRef:me,previewElementRef:Z,filterRef:ge,isRendererReady:xe,viewportRect:Re,setViewportRect:le,applyFilterState:Ce,destroyPixi:De,fitSprite:Te,initPixi:Ee,refreshLayout:Ne,resetFilterInstance:Me,safeRender:Pe,scheduleRefreshLayout:Be,syncSpriteFilter:Ze,syncTexturePresentation:We}=k,Ie=s.useRef(Ee),ye=s.useRef(De),pe=s.useRef(()=>{}),be=s.useRef(()=>{}),Qe=In({instanceLabel:r.current,previewKind:M,previewKindRef:te,mediaRef:a,isPlaying:I,isPlayingRef:J}),{audioContextRef:Se,mediaSourceRef:Ve,masterGainRef:Ae,recordingDestinationRef:Ue,noiseGainRef:Le,isMutedRef:Xe,volumeRef:ke,playbackRateRef:$e,isLoopingRef:He,isMuted:l,setIsMuted:S,playbackRate:H,setPlaybackRate:X,volume:g,setVolume:R,isLooping:we,setIsLooping:re,isAudioFxEnabled:rt,setIsAudioFxEnabled:Ct,lofiAmount:it,setLofiAmount:St,radioToneAmount:yt,setRadioToneAmount:Rt,bitCrushAmount:at,setBitCrushAmount:Tt,sampleRateReductionAmount:st,setSampleRateReductionAmount:Dt,noiseReductionAmount:Lt,setNoiseReductionAmount:Et,bassAmount:lt,setBassAmount:Mt,midAmount:ct,setMidAmount:Bt,trebleAmount:ut,setTrebleAmount:Pt,stereoWidthAmount:dt,setStereoWidthAmount:It,smallSpeakerRoomAmount:ht,setSmallSpeakerRoomAmount:kt,wowFlutterAmount:Ft,setWowFlutterAmount:Gt,isNoiseEnabled:Nt,setIsNoiseEnabled:Wt,noiseLevel:Ut,setNoiseLevel:Ht,vinylDustAmount:Ot,setVinylDustAmount:zt,delayAmount:Vt,setDelayAmount:Ye,reverbAmount:mt,setReverbAmount:_t,chorusAmount:et,setChorusAmount:jt,tapeSaturationAmount:Zt,setTapeSaturationAmount:gt,compressorAmount:Xt,setCompressorAmount:Kt,fxOutputTrimAmount:qt,setFxOutputTrimAmount:Yt,debugAudio:Jt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,reconnectCurrentMediaAudio:Oe,applyAudioSettings:je,resetAudioSettings:Lo,disposeAudioEngine:io}=Qe;s.useEffect(()=>{Ie.current=Ee,ye.current=De},[Ee,De]);const Eo=C=>{te.current=C,ae(C)},Mo=C=>{j(C),O(!0)},tt=()=>{O(!1),j("")},ao=()=>{v(!0),fe.current?.ticker.start()},Bo=()=>{a.current&&a.current.pause(),Le.current&&(Le.current.gain.value=0),Ae.current&&(Ae.current.gain.value=0),tt(),z(!1),v(!1),fe.current?.ticker.stop(),Ke()},Po=Kn({filterState:t,appRef:fe,spriteRef:ve,textureRef:me,previewElementRef:Z,filterRef:ge,mediaRef:a,objectUrlRef:n,streamRef:u,streamOwnedRef:h,previewRequestIdRef:K,isPlayingRef:J,previewKindRef:te,audioContextRef:Se,mediaSourceRef:Ve,masterGainRef:Ae,noiseGainRef:Le,isMutedRef:Xe,volumeRef:ke,playbackRateRef:$e,isLoopingRef:He,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:at,sampleRateReductionAmount:st,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,isMuted:l,volume:g,previewKind:M,setPreviewName:_,setPreviewError:de,setNeedsUserPlay:z,setIsPlaying:w,setCurrentTime:$,setDuration:ne,setPlaybackRate:X,setIsLooping:re,setSourceDimensions:se,setViewportRect:le,setPreviewKindState:Eo,setIsPoweredOn:v,beginLoading:Mo,finishLoading:tt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,fitSprite:Te,refreshLayout:Ne,scheduleRefreshLayout:Be,safeRender:Pe,resetFilterInstance:Me,initPixi:Ee,debugVideo:B,debugAudio:Jt}),{cleanupPreview:so,cleanupForPageLeave:Io,playVideoWithAudio:lo,previewFile:ko,previewStream:Fo,previewUrl:Go,startDisplayCapture:No,stopDisplayCapture:Wo,syncVideoState:Ke}=Po;s.useEffect(()=>{pe.current=so},[so]),s.useEffect(()=>{be.current=io},[io]);const co=async()=>{if(a.current){if(a.current.paused){D||ao(),await lo(),Ke();return}a.current.pause(),Ke()}},Uo=()=>{a.current&&S(C=>{const P=!C;return Xe.current=P,window.requestAnimationFrame(Je),P})},ot=C=>{a.current&&(a.current.currentTime=C,$(C))},Ho=C=>{if(!a.current)return;const P=1/30,ie=Math.max(0,Math.min(a.current.currentTime+P*C,a.current.duration||a.current.currentTime+P));a.current.pause(),a.current.currentTime=ie,Ke()},Oo=C=>{a.current&&(a.current.playbackRate=C,$e.current=C,X(C))},zo=C=>{a.current&&(ke.current=C,Xe.current=C===0,R(C),S(C===0),window.requestAnimationFrame(Je))},Vo=()=>{a.current&&(a.current.loop=!a.current.loop,He.current=a.current.loop,re(a.current.loop))},_o=C=>{He.current=C,re(C),a.current&&(a.current.loop=C)},pt=()=>{if(!f.current||typeof window>"u"){N.current=null,y.current=null;return}window.URL.revokeObjectURL(f.current),f.current=null,N.current=null,y.current=null},jo=(C,P)=>{if(typeof document>"u")return;const ie=document.createElement("a");ie.href=C,ie.download=P,ie.rel="noopener",ie.style.display="none",document.body.appendChild(ie),ie.click(),window.setTimeout(()=>{ie.remove()},0)},Zo=(C,P)=>{if(typeof window>"u"||C.length===0)return null;pt();const ie=new Blob(C,{type:P||"video/webm"}),ze=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ge=window.URL.createObjectURL(ie);return f.current=Ge,N.current=ie,y.current=ze,i(ze),ze},Xo=()=>{const C=f.current,P=y.current;!C||!P||typeof window>"u"||(jo(C,P),window.setTimeout(()=>{pt()},1e3),i(null))},Ko=async()=>{const C=N.current,P=y.current;if(!C||!P||typeof window>"u")return!1;if(xo()){const ze=new Uint8Array(await C.arrayBuffer()),Ge=await To("persist_recording_for_share",{data:Array.from(ze),filename:P});return await fn(Ge,{mimeType:C.type||"video/webm",title:P}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Fe={files:[new File([C],P,{type:C.type||"video/webm"})],title:P};return typeof navigator.canShare=="function"&&!navigator.canShare(Fe)?!1:(await navigator.share(Fe),!0)},qo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(P=>MediaRecorder.isTypeSupported(P))??"",Yo=async()=>{const C=fe.current?.canvas;if(!(C instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await _e();const P=new MediaStream;C.captureStream(30).getVideoTracks().forEach(Ge=>P.addTrack(Ge)),Ue.current?.stream.getAudioTracks().forEach(Ge=>P.addTrack(Ge.clone()));const Fe=qo(),ze=Fe?new MediaRecorder(P,{mimeType:Fe}):new MediaRecorder(P);L.current=[],pt(),i(null),E.current=P,m.current=ze,ze.addEventListener("dataavailable",Ge=>{Ge.data.size>0&&L.current.push(Ge.data)}),ze.addEventListener("stop",()=>{const Ge=Zo(L.current,ze.mimeType);L.current=[],E.current?.getTracks().forEach(Jo=>Jo.stop()),E.current=null,m.current=null,U(!1),_e(),G.current?.(Ge),G.current=null},{once:!0}),ze.start(),U(!0)},uo=(C=!0)=>{const P=m.current;return P?new Promise(ie=>{if(G.current=ie,C||(L.current=[]),P.state!=="inactive"){P.stop();return}E.current?.getTracks().forEach(Fe=>Fe.stop()),E.current=null,m.current=null,U(!1),G.current?.(y.current),G.current=null}):Promise.resolve(y.current)};return s.useEffect(()=>{let C=!1;return(async()=>(B("startup:setupPixi-effect:start",{renderResolutionScale:o}),await Ie.current(),C&&ye.current()))(),()=>{pt(),uo(!1),C=!0,ye.current()}},[o]),s.useEffect(()=>()=>{pe.current(),be.current()},[]),s.useEffect(()=>{const C=()=>{Io()};return window.addEventListener("beforeunload",C),()=>{window.removeEventListener("beforeunload",C)}},[]),s.useEffect(()=>{const C=()=>{a.current&&(a.current.muted=!0,a.current.volume=0,a.current.pause(),Ke())};return window.addEventListener(ho,C),()=>{window.removeEventListener(ho,C)}},[Ke]),s.useEffect(()=>{if(!wo())return;const C=ie=>ie==="video"||ie==="audio"||ie==="capture",P=()=>{const ie=a.current;if(!(!ie||!C(te.current))){if(document.visibilityState==="hidden"){Q.current=!ie.paused,ie.pause(),J.current=!1,w(!1),Le.current&&(Le.current.gain.value=0),Ae.current&&(Ae.current.gain.value=0),Se.current?.state==="running"&&Se.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await _e(),Oe(),Je(),Q.current&&a.current)try{await a.current.play(),z(!1)}catch(Fe){Fe instanceof DOMException&&Fe.name==="NotAllowedError"&&z(!0)}}finally{Ke(),Q.current=!1}})()},80)}};return document.addEventListener("visibilitychange",P),()=>{document.removeEventListener("visibilitychange",P)}},[Se,_e,Ae,Le,Oe,Ke,Je]),s.useLayoutEffect(()=>{Ce(),Ze(),We(),Ne()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,Ne]),s.useEffect(()=>{if(x||oe){tt();return}if(M==="image"||M==="audio"){tt();return}I&&tt()},[x,oe,M,I]),s.useEffect(()=>{J.current=I;const C=(M==="video"||M==="capture")&&a.current?.tagName==="VIDEO",P=!a.current||Math.abs(a.current.currentTime)<.05,ie=a.current?.ended??!1;C&&tt(),C&&!I&&!x&&!ie&&(Se.current?.state==="suspended"||P)&&z(!0)},[Se,I,x,M]),s.useEffect(()=>{const C=P=>{if(!a.current)return;const ie=P.target;if(!(ie instanceof HTMLInputElement||ie instanceof HTMLTextAreaElement||ie?.isContentEditable)){if(P.code==="Space"||P.code==="KeyK"){P.preventDefault(),co();return}if(P.code==="KeyJ"){P.preventDefault(),ot(Math.max(a.current.currentTime-10,0));return}if(P.code==="KeyL"){P.preventDefault(),ot(Math.min(a.current.currentTime+10,a.current.duration||a.current.currentTime+10));return}if(P.code==="ArrowLeft"){P.preventDefault(),ot(Math.max(a.current.currentTime-5,0));return}P.code==="ArrowRight"&&(P.preventDefault(),ot(Math.min(a.current.currentTime+5,a.current.duration||a.current.currentTime+5)))}};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),{canvasHostRef:Y,previewName:q,previewError:x,isRendererReady:xe,loadingLabel:he,isLoading:W,needsUserPlay:oe,isPlaying:I,isMuted:l,currentTime:T,duration:V,playbackRate:H,volume:g,isLooping:we,sourceDimensions:p,viewportRect:Re,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:yt,bitCrushAmount:at,sampleRateReductionAmount:st,noiseReductionAmount:Lt,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,wowFlutterAmount:Ft,isNoiseEnabled:Nt,noiseLevel:Ut,vinylDustAmount:Ot,delayAmount:Vt,reverbAmount:mt,chorusAmount:et,tapeSaturationAmount:Zt,setTapeSaturationAmount:gt,compressorAmount:Xt,setCompressorAmount:Kt,fxOutputTrimAmount:qt,setFxOutputTrimAmount:Yt,hasPlayableMedia:M==="video"||M==="audio"||M==="capture",hasVideo:M==="video"||M==="capture",hasAudioOnly:M==="audio",hasImage:M==="image",isRecording:b,pendingRecordingFilename:c,prefersShareExport:xo()&&wo(),isCaptureActive:M==="capture",canRecord:M==="video"||M==="capture"||M==="image"||M==="audio",previewFile:ko,previewStream:Fo,previewUrl:Go,startDisplayCapture:No,stopDisplayCapture:Wo,togglePlayback:co,toggleMute:Uo,seekTo:ot,stepFrame:Ho,changePlaybackRate:Oo,changeVolume:zo,toggleLoop:Vo,setLoopingEnabled:_o,applyAudioSettings:je,resetAudioSettings:Lo,playVideoWithAudio:lo,isPoweredOn:D,powerOn:ao,powerOff:Bo,downloadPendingRecording:Xo,sharePendingRecording:Ko,startRecording:Yo,stopRecording:uo,ensureAudioContext:_e,refreshLayout:Ne,toggleAudioFx:()=>{Ct(C=>!C)},setLofiAmount:St,setRadioToneAmount:Rt,setBitCrushAmount:Tt,setSampleRateReductionAmount:Dt,setNoiseReductionAmount:Et,setBassAmount:Mt,setMidAmount:Bt,setTrebleAmount:Pt,setStereoWidthAmount:It,setSmallSpeakerRoomAmount:kt,setWowFlutterAmount:Gt,toggleNoise:()=>{Wt(C=>!C)},setNoiseLevel:Ht,setVinylDustAmount:zt,setDelayAmount:Ye,setReverbAmount:_t,setChorusAmount:jt}}const ce=nt.pc98_512,Co=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&(e.animeEdgeLow??.08)===t.animeEdgeLow&&(e.animeEdgeHigh??.55)===t.animeEdgeHigh&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,ft=t=>{for(const[e,o]of Object.entries(nt))if(Co(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(nt))if(Co(t,o,{ignoreDimensions:!0}))return e;return null},Qn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function $n(t={}){const[e]=s.useState(()=>({targetWidth:t.targetWidth??ce.width,targetHeight:t.targetHeight??ce.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ce.colors,ditherStrength:t.ditherStrength??ce.dither,paletteMode:t.paletteMode??ce.palette,curvature:t.curvature??ce.curvature,scanlineStrength:t.scanlineStrength??ce.scanline,scanline2Strength:t.scanline2Strength??ce.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ce.vignette,glowStrength:t.glowStrength??ce.glow,smoothStrength:t.smoothStrength??ce.smoothStrength??0,toonSteps:t.toonSteps??ce.toonSteps??0,edgeBoost:t.edgeBoost??ce.edgeBoost??0,animeEdgeLow:t.animeEdgeLow??ce.animeEdgeLow??.08,animeEdgeHigh:t.animeEdgeHigh??ce.animeEdgeHigh??.55,phosphorStrength:t.phosphorStrength??ce.phosphor,spotMaskStrength:t.spotMaskStrength??ce.spotMask,bulbRadius:t.bulbRadius??ce.bulbRadius,blackFloor:t.blackFloor??ce.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??ce.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ce.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ce.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ce.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ce.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ce.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ce.monoTint,neonBoost:t.neonBoost??ce.neonBoost,neonSaturation:t.neonSaturation??ce.neonSaturation,neonDetail:t.neonDetail??ce.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=s.useState(()=>({...e,...xt()?.filter,...t})),[r,n]=s.useState(o),[u,h]=s.useState(ft(o)),a=c=>{h(null),n(i=>i.targetWidth===c?i:{...i,targetWidth:c})},m=c=>{h(null),n(i=>i.targetHeight===c?i:{...i,targetHeight:c})},L=c=>{h(null),n(i=>i.matchTargetAspect===c?i:{...i,matchTargetAspect:c})},E=c=>{h(null),n(i=>({...i,colorLevels:c}))},f=c=>{h(null),n(i=>({...i,ditherStrength:c}))},N=c=>{h(null),n(i=>({...i,paletteMode:c,colorLevels:Qn(c,i.colorLevels)}))},y=c=>{h(null),n(i=>({...i,curvature:c}))},G=c=>{h(null),n(i=>({...i,scanlineStrength:c}))},K=c=>{h(null),n(i=>({...i,scanline2Strength:c}))},J=c=>{h(null),n(i=>({...i,scanlineBrightnessFade:c}))},te=c=>{h(null),n(i=>({...i,vignetteStrength:c}))},Q=c=>{h(null),n(i=>({...i,glowStrength:c}))},q=c=>{h(null),n(i=>({...i,smoothStrength:c}))},_=c=>{h(null),n(i=>({...i,toonSteps:c}))},x=c=>{h(null),n(i=>({...i,edgeBoost:c}))},de=c=>{h(null),n(i=>({...i,animeEdgeLow:c}))},D=c=>{h(null),n(i=>({...i,animeEdgeHigh:c}))},v=c=>{h(null),n(i=>({...i,phosphorStrength:c}))},he=c=>{h(null),n(i=>({...i,spotMaskStrength:c}))},j=c=>{h(null),n(i=>({...i,bulbRadius:c}))},W=c=>{h(null),n(i=>({...i,blackFloor:c}))},O=c=>{h(null),n(i=>({...i,phosphorDotLightBalance:c}))},oe=c=>{h(null),n(i=>({...i,phosphorDotInternalScale:c}))},z=c=>{h(null),n(i=>({...i,phosphorDotBrightCore:c}))},I=c=>{h(null),n(i=>({...i,phosphorDotCellFill:c}))},w=c=>{h(null),n(i=>({...i,phosphorDotFlatDisc:c}))},T=c=>{h(null),n(i=>({...i,phosphorDotNeighborBlend:c}))},$=c=>{h(null),n(i=>({...i,closeUpNoiseStrength:c}))},V=c=>{h(null),n(i=>({...i,monoTint:c}))},ne=c=>{h(null),n(i=>({...i,neonBoost:c}))},M=c=>{h(null),n(i=>({...i,neonSaturation:c}))},ae=c=>{h(null),n(i=>({...i,neonDetail:c}))},p=c=>{n(i=>({...i,isFilterEnabled:c}))},se=c=>{const i=nt[c];h(c),n(B=>({...B,targetWidth:i.width,targetHeight:i.height,colorLevels:i.colors,ditherStrength:i.dither,paletteMode:i.palette,curvature:i.curvature,scanlineStrength:i.scanline,scanline2Strength:i.scanline2,vignetteStrength:i.vignette,glowStrength:i.glow,smoothStrength:i.smoothStrength??0,toonSteps:i.toonSteps??0,edgeBoost:i.edgeBoost??0,animeEdgeLow:i.animeEdgeLow??.08,animeEdgeHigh:i.animeEdgeHigh??.55,phosphorStrength:i.phosphor,spotMaskStrength:i.spotMask,bulbRadius:i.bulbRadius,blackFloor:i.blackFloor,phosphorDotLightBalance:i.phosphorDotLightBalance??1,phosphorDotInternalScale:i.phosphorDotInternalScale??!1,phosphorDotBrightCore:i.phosphorDotBrightCore??!1,phosphorDotCellFill:i.phosphorDotCellFill??0,phosphorDotFlatDisc:i.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:i.phosphorDotNeighborBlend??!1,monoTint:i.monoTint,neonBoost:i.neonBoost,neonSaturation:i.neonSaturation,neonDetail:i.neonDetail,isFilterEnabled:!0}))},b=c=>{h(ft(c)),n(c)},U=()=>{h(ft(e)),n(e)};return s.useEffect(()=>{const c=setTimeout(()=>{vn(r)},300);return()=>clearTimeout(c)},[r]),s.useEffect(()=>{const c=ft(r);h(i=>i===c?i:c)},[r]),{...r,selectedPreset:u,setTargetWidth:a,setTargetHeight:m,setMatchTargetAspect:L,setColorLevels:E,setDitherStrength:f,setPaletteMode:N,setCurvature:y,setScanlineStrength:G,setScanline2Strength:K,setScanlineBrightnessFade:J,setVignetteStrength:te,setGlowStrength:Q,setSmoothStrength:q,setToonSteps:_,setEdgeBoost:x,setAnimeEdgeLow:de,setAnimeEdgeHigh:D,setPhosphorStrength:v,setSpotMaskStrength:he,setBulbRadius:j,setBlackFloor:W,setPhosphorDotLightBalance:O,setPhosphorDotInternalScale:oe,setPhosphorDotBrightCore:z,setPhosphorDotCellFill:I,setPhosphorDotFlatDisc:w,setPhosphorDotNeighborBlend:T,setCloseUpNoiseStrength:$,setMonoTint:V,setNeonBoost:ne,setNeonSaturation:M,setNeonDetail:ae,setIsFilterEnabled:p,applyAllFilterSettings:b,applyPreset:se,resetSettings:U}}function er({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:u,controlPanelMode:h,confirmDialog:a,onHighResolutionChange:m,onFitWidthChange:L,onError:E}){const f=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},N=F.useMemo(()=>xt()?.ui,[]),[y,G]=F.useState(N?.isPreviewMaximized??!1),[K,J]=F.useState(!1),[te,Q]=F.useState(!1),[q,_]=F.useState(0),[x,de]=F.useState(null),[D,v]=F.useState(null),he=F.useRef(null),j=F.useRef(null),W=F.useRef(null),O=F.useRef(null),oe=F.useCallback(()=>{const i=he.current,B=W.current;if(!i||!B)return null;const k=i.getBoundingClientRect(),Y=B.getBoundingClientRect();return{left:k.left,width:k.width,height:Y.height}},[]),z=F.useCallback(i=>{O.current!==null&&window.clearTimeout(O.current),O.current=window.setTimeout(()=>{de(i),O.current=null},120)},[]),I=F.useCallback(()=>{O.current!==null&&(window.clearTimeout(O.current),O.current=null),de(null)},[]);F.useEffect(()=>{An({isPreviewMaximized:y,isHighResolution:n})},[n,y]),F.useEffect(()=>()=>{O.current!==null&&window.clearTimeout(O.current)},[]),F.useEffect(()=>{if(!y)return;const i=document.body.style.overflow,B=k=>{k.code==="Escape"&&G(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",B),()=>{document.body.style.overflow=i,window.removeEventListener("keydown",B)}},[y]),F.useEffect(()=>{y&&(J(!1),Q(!1),_(0),v(null))},[y]),F.useEffect(()=>{u&&(J(!1),Q(!1),_(0),v(null))},[u]),F.useEffect(()=>{if(h==="playback"||y||K||u){Q(!1),_(0);return}const i=()=>{const B=j.current,k=W.current;if(!B||!k)return;const Y=B.getBoundingClientRect().top,fe=k.getBoundingClientRect().height,ve=Math.round(Math.min(fe,window.innerHeight)*.4),me=-Math.max(120,ve);Q(Z=>{if(!Z&&Y<=me){_(Math.max(120,ve));const ge=oe();return ge&&v(ge),!0}return Z&&_(Math.max(120,ve)),Z&&Y>=-24?(_(0),!1):Z})};return i(),window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i)}},[h,u,y,K,oe]),F.useEffect(()=>{if(!((K||te)&&!y)){v(null);return}const B=()=>{const k=oe();k&&v(k)};return B(),window.addEventListener("resize",B),window.addEventListener("scroll",B,{passive:!0}),()=>{window.removeEventListener("resize",B),window.removeEventListener("scroll",B)}},[te,y,K,u,oe,r.sourceDimensions]),F.useEffect(()=>{r.refreshLayout()},[K,y,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const w=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),T=!y&&!u&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,$=T?`${T}px`:"60vh",V=F.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),ne=(K||te)&&!y,M=te?`calc(max(0.0rem, env(safe-area-inset-top)) - ${q}px)`:void 0,ae="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",p="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",se="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",b="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",U=(i,B,k="w-44")=>A.jsx("div",{role:"tooltip","aria-hidden":x!==i,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",k,x===i?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:B}),c=()=>A.jsxs(A.Fragment,{children:[r.canRecord&&A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{I(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording())return;const B=await a({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(r.ensureAudioContext(),!B)return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(i){E?.(i instanceof Error?i:new Error(String(i)))}return}try{await r.startRecording()}catch(i){E?.(i instanceof Error?i:new Error(String(i)))}})()},onMouseEnter:()=>z("record"),onMouseLeave:I,onFocus:()=>z("record"),onBlur:I,className:[b,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?A.jsx(pn,{size:14,className:"fill-current animate-pulse"}):A.jsx(an,{size:16,className:"text-rose-300"})}),U("record",r.isRecording?f.recordStop:f.recordIdle)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(I(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>z("power"),onMouseLeave:I,onFocus:()=>z("power"),onBlur:I,className:[ae,r.isPoweredOn?p:se].join(" "),children:A.jsx(mn,{size:16})}),U("power",r.isPoweredOn?f.powerOff:f.powerOn)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{I(),m(!n)},onMouseEnter:()=>z("hi-res"),onMouseLeave:I,onFocus:()=>z("hi-res"),onBlur:I,className:[ae,n?p:se].join(" "),children:A.jsx(tn,{size:16})}),U("hi-res",f.hiRes)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":u?"Disable fit width":"Enable fit width",onClick:()=>{I(),L(!u)},onMouseEnter:()=>z("fit-width"),onMouseLeave:I,onFocus:()=>z("fit-width"),onBlur:I,className:[ae,u?p:se].join(" "),children:A.jsx(nn,{size:16})}),U("fit-width",u?f.fitWidthOn:f.fitWidthOff)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":ne?"Unpin preview":"Pin preview",onClick:()=>{I(),!(y||u)&&J(i=>{if(!i){const k=oe();return k&&v(k),!0}return Q(!1),_(0),v(null),!1})},onMouseEnter:()=>z("pin"),onMouseLeave:I,onFocus:()=>z("pin"),onBlur:I,className:[ae,y||u?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":ne?p:se].join(" "),disabled:y||u,children:A.jsx(dn,{size:16})}),U("pin",y?f.pinUnavailable:u?f.pinUnavailableFitWidth:ne?f.pinOn:f.pinOff)]}),A.jsxs("div",{className:"relative",children:[A.jsx("button",{type:"button","aria-label":y?"Exit maximize":"Maximize preview",onClick:()=>{I(),G(i=>!i)},onMouseEnter:()=>z("maximize"),onMouseLeave:I,onFocus:()=>z("maximize"),onBlur:I,className:[ae,y?p:se].join(" "),children:y?A.jsx(Qt,{size:16}):A.jsx(ln,{size:16})}),U("maximize",y?f.maximizeOn:f.maximizeOff)]})]});return A.jsxs("div",{ref:he,className:"space-y-4",children:[A.jsx("div",{ref:j,"aria-hidden":"true"}),A.jsxs("div",{ref:W,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${y?u?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":ne?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:ne&&D?{left:`${D.left}px`,top:M??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${D.width}px`}:y?void 0:{overflow:"visible"},children:[y&&(u?A.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:A.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{G(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:A.jsx(Qt,{size:18})})}):A.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{G(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:A.jsx(Qt,{size:18})})),A.jsxs("div",{className:`relative ${y?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:y?u&&V?{aspectRatio:V,width:"100%"}:void 0:u&&V?{aspectRatio:V,width:"100%"}:V?r.sourceDimensions&&r.sourceDimensions.height>r.sourceDimensions.width?{aspectRatio:V,height:T?`${T}px`:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{aspectRatio:V,width:"100%",maxHeight:T?`${T}px`:"min(60vh, calc(100vh - 12rem))",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:$,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[A.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[w&&A.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),A.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&A.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:A.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[A.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),A.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&A.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",w?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:A.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[A.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),A.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),A.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&A.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:A.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[A.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),A.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),A.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),A.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&A.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!u&&A.jsx("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:c()})]}),u&&y&&A.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:c()})]}),u&&!y&&A.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:c()}),ne&&D&&A.jsx("div",{style:{height:`${D.height}px`}})]})}const tr=F.lazy(()=>Ro(()=>import("./VideoControls-BQtqREg0.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),or=F.lazy(()=>Ro(()=>import("./RetroFilterPanel-DO6blkTX.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),So=A.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function nr({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:u,onSetTargetWidth:h,onSetTargetHeight:a,onSetMatchTargetAspect:m,onResetSettings:L,onImportSettings:E}){return A.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&A.jsx(F.Suspense,{fallback:So,children:A.jsx(tr,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,noiseReductionAmount:e.noiseReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeNoiseReductionAmount:e.setNoiseReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:L,onImportSettings:E,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&A.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&A.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[A.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:A.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),A.jsx(F.Suspense,{fallback:So,children:A.jsx(or,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,animeEdgeLow:o.animeEdgeLow,animeEdgeHigh:o.animeEdgeHigh,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:u,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetAnimeEdgeLow:o.setAnimeEdgeLow,onSetAnimeEdgeHigh:o.setAnimeEdgeHigh,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:a,onSetTargetWidth:h,onSetMatchTargetAspect:m,onSetVignetteStrength:o.setVignetteStrength})})]})]})}function yo({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:u,className:h,onError:a,initialFilterState:m,confirmDialog:L}){const{showConfirmDialog:E}=Qo(),f=L??(w=>E({...w,title:w.title??"",body:w.body??""}).then(T=>T??!1)),N=F.useMemo(()=>xt()?.ui,[]),[y,G]=F.useState(N?.isHighResolution??!1),[K,J]=F.useState(!1),[te,Q]=F.useState("playback"),q=F.useRef(""),_=F.useRef(""),x=$n(m),de=y&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,D=Jn(x,K?"width":"contain",de),v=F.useCallback(()=>{xn(),x.resetSettings(),D.resetAudioSettings(),G(!1)},[x,D]),he=F.useCallback(w=>{x.applyAllFilterSettings(w.filter),D.applyAudioSettings(w.audio),G(w.ui.isHighResolution),$o(w.locale)},[x,D]),j=F.useCallback(()=>{if(!D.sourceDimensions)return;const w=Math.max(8,Math.round(x.targetWidth/D.sourceDimensions.width*D.sourceDimensions.height/8)*8);w!==x.targetHeight&&x.setTargetHeight(w)},[x.targetHeight,x.targetWidth,x.setTargetHeight,D.sourceDimensions]),W=F.useCallback(()=>D.sourceDimensions?.width&&D.sourceDimensions?.height?D.sourceDimensions.width/D.sourceDimensions.height:Math.max(x.targetWidth,1)/Math.max(x.targetHeight,1),[x.targetHeight,x.targetWidth,D.sourceDimensions]),O=F.useCallback(w=>{if(x.setTargetWidth(w),!x.matchTargetAspect)return;const T=Math.max(W(),1e-4);x.setTargetHeight(Math.max(1,Math.round(w/T)))},[x,W]),oe=F.useCallback(w=>{if(x.setTargetHeight(w),!x.matchTargetAspect)return;const T=Math.max(W(),1e-4);x.setTargetWidth(Math.max(1,Math.round(w*T)))},[x,W]),z=F.useCallback(w=>{x.setMatchTargetAspect(w),w&&D.sourceDimensions&&j()},[x,D.sourceDimensions,j]),I=F.useCallback(w=>{if(x.applyPreset(w),w!=="phosphorDot"||!D.sourceDimensions)return;const T=nt.phosphorDot,$=Math.max(D.sourceDimensions.width,1),V=Math.max(D.sourceDimensions.height,1),ne=$/V,M=T.width/T.height;let ae=T.width,p=T.height;ne>M?p=Math.max(8,Math.round(T.width/ne/8)*8):ae=Math.max(8,Math.round(T.height*ne/8)*8),!(T.width===ae&&T.height===p)&&(x.setTargetWidth(ae),x.setTargetHeight(p))},[x.applyPreset,x.setTargetHeight,x.setTargetWidth,D.sourceDimensions]);return F.useEffect(()=>{x.matchTargetAspect&&D.sourceDimensions&&j()},[x.matchTargetAspect,D.sourceDimensions,j]),F.useEffect(()=>{if(o){const T=`stream:${o.id}:${n}:${r??""}`;if(q.current===T)return;q.current=T,(async()=>{try{await D.previewStream(o,n==="audio"?"audio":"video",r)}catch($){a?.($ instanceof Error?$:new Error(String($)))}})();return}if(!e){q.current="";return}const w=`src:${e}:${n}`;q.current!==w&&(q.current=w,(async()=>{try{await D.previewUrl(e,n)}catch(T){a?.(T instanceof Error?T:new Error(String(T)))}})())},[e,o,r,n,a,D]),F.useEffect(()=>{D.refreshLayout()},[K,D.refreshLayout]),F.useEffect(()=>{D.refreshLayout()},[x.targetWidth,x.targetHeight,x.isFilterEnabled,de,D.refreshLayout]),F.useEffect(()=>{if(typeof u!="boolean")return;const w=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!w){_.current="";return}const T=`${w}:${u}`;_.current!==T&&(_.current=T,D.setLoopingEnabled(u))},[n,u,D,e,o]),A.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:A.jsxs("div",{className:"space-y-4",children:[A.jsx(er,{locale:t,src:e,kind:n,player:D,isHighResolution:y,isFitWidthEnabled:K,controlPanelMode:te,confirmDialog:f,onHighResolutionChange:G,onFitWidthChange:J,onError:a}),A.jsx(nr,{locale:t,player:D,filterState:x,controlPanelMode:te,onControlPanelModeChange:Q,onApplyPreset:I,onSetTargetWidth:O,onSetTargetHeight:oe,onSetMatchTargetAspect:z,onResetSettings:v,onImportSettings:he})]})})}const ir=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:yo,default:yo},Symbol.toStringTag,{value:"Module"}));export{ue as D,kn as M,Cn as R,nt as a,ir as b,xt as l};
