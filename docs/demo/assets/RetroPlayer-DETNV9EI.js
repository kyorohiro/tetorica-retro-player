const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-DLyxg4yV.js","./index-CumBANWv.js","./index-K6RrvRGI.css","./RetroFilterPanel-BOFR7Utn.js"])))=>i.map(i=>d[i]);
import{b as Ve,r as a,R as wo,a as I,j as p,_ as No,u as ln,s as cn}from"./index-CumBANWv.js";const un=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],dn=Ve("aperture",un);const hn=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],mn=Ve("arrow-left-right",hn);const gn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Co=Ve("circle",gn);const pn=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],fn=Ve("ellipsis",pn);const vn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],bn=Ve("maximize-2",vn);const An=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],lo=Ve("minimize-2",An);const xn=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],wn=Ve("pin",xn);const Cn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],Sn=Ve("power",Cn);const yn=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",key:"1i73f7"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",key:"saxlbk"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]],Rn=Ve("square-centerline-dashed-horizontal",yn);const Tn=[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",key:"14bfxa"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",key:"14rx03"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]],Ln=Ve("square-centerline-dashed-vertical",Tn);const Dn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],So=Ve("square",Dn);const En=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Mn=Ve("sun",En);async function Wo(t,e={},r){return window.__TAURI_INTERNALS__.invoke(t,e,r)}async function Bn(t,e){await Wo("plugin:sharekit|share_file",{url:t,...e})}const go="tetorica-retro-player.settings",Et=1,Mt=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(go);if(!t)return null;const e=JSON.parse(t);return e.version!==Et?null:e}catch{return null}},po=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(go,JSON.stringify(t))}catch{}},Bt=()=>Mt(),Pn=t=>{const e=Mt();po({version:Et,audio:e?.audio,filter:t,ui:e?.ui})},kn=t=>{const e=Mt();po({version:Et,audio:t,filter:e?.filter,ui:e?.ui})},In=t=>{const e=Mt();po({version:Et,audio:e?.audio,filter:e?.filter,ui:t})},Fn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(go)}catch{}},me={isMuted:!1,volume:.72,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,noiseReductionAmount:0,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.002,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},Gn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.002,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.002,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},Nn=Object.fromEntries(Object.entries(Gn).map(([t,e])=>[t,{label:e.label,settings:{...me,...e.settings}}])),Wn=Object.fromEntries(Object.entries(Nn).map(([t,e])=>[t,e.settings]));function Hn(t){const r=new Float32Array(256),n=1+t*5;for(let o=0;o<256;o++){const h=o*2/255-1;r[o]=Math.tanh(h*n)}return r}function yo(t){const r=new Float32Array(256),n=t*8;for(let o=0;o<256;o++){const h=o*2/255-1;n<.001?r[o]=h:r[o]=Math.tanh(h*(1+n))/Math.tanh(1+n)}return r}function Un(t){const r=Math.max(1,Math.floor(t.sampleRate*.22)),n=t.createBuffer(2,r,t.sampleRate);for(let o=0;o<n.numberOfChannels;o++){const h=n.getChannelData(o);for(let i=0;i<h.length;i++){const d=i/h.length,m=(1-d)**1.85,D=.78+.22*Math.sin(d*42+o*.9),E=Math.sin(d*130+o*.35)*.08;h[i]=(Math.random()*2-1+E)*m*D*.28}}return n}function On(t){const r=Math.max(1,Math.floor(t.sampleRate*2.2)),n=t.createBuffer(2,r,t.sampleRate),o=Math.floor(t.sampleRate*.012);for(let h=0;h<n.numberOfChannels;h++){const i=n.getChannelData(h);for(let d=0;d<r;d++){if(d<o)continue;const m=(d-o)/(r-o),D=(1-m)**1.8,E=Math.max(0,1-m*2.5),b=Math.sin(m*160+h*.8)*E*.35;i[d]=(Math.random()*2-1+b)*D*.75}}return n}function zn(t){const e=t.sampleRate*2,r=t.createBuffer(2,e,t.sampleRate);let n=0,o=0;for(let h=0;h<e;h++){const i=Math.random()*2-1;n=(n+i*.045)/1.045,o=o*.82+i*.18;const d=n*1.35,m=(i-o)*.55,D=Math.max(-1,Math.min(1,d+m));for(let E=0;E<r.numberOfChannels;E++){const b=r.getChannelData(E),F=(Math.random()*2-1)*.012;b[h]=Math.max(-1,Math.min(1,D+F))}}return r}function Vn(t){const e=t.sampleRate*2,r=new Float32Array(e);let n=0,o=0;for(;n<e;){const i=Math.random()*2-1;o=o*.72+i*.28,r[n]+=(i-o)*.018;const d=Math.random();if(d<.0034){const m=8+Math.floor(Math.random()*42),D=.11+Math.random()*.28,E=Math.random()<.5?-1:1;for(let b=0;b<m&&n+b<e;b++){const F=Math.exp(-b/(2.4+Math.random()*5));r[n+b]+=E*D*F*(.7+Math.random()*.3)}n+=m+Math.floor(Math.random()*640);continue}if(d<.0038){const m=90+Math.floor(Math.random()*260),D=.055+Math.random()*.11,E=Math.random()*Math.PI*2;for(let b=0;b<m&&n+b<e;b++){const F=Math.exp(-b/(18+Math.random()*40)),C=Math.sin(E+b*(.22+Math.random()*.06));r[n+b]+=D*F*C}n+=m+Math.floor(Math.random()*2200);continue}n++}const h=t.createBuffer(2,e,t.sampleRate);for(let i=0;i<h.numberOfChannels;i++){const d=h.getChannelData(i);for(let m=0;m<e;m++){const D=(Math.random()*2-1)*.0035;d[m]=Math.max(-1,Math.min(1,r[m]+D))}}return h}const jn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function Tt(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function Ho({preset:t,params:e}){return{...me,...t?Wn[t]:null,...e}}class _n{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;autoConnections=new Set;externalConnections=new Set;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseHighpass:null,noiseLowpass:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:r,runtimeState:n,connectOutputToDestination:o=!1,connectOutputToRecordingDestination:h=!1,enableAudioWorklet:i=!0}){this.context=e,this.instanceLabel=r,this.runtimeState=n,this.currentSettings=n.settings,this.connectOutputToDestination=o,this.connectOutputToRecordingDestination=h,this.enableAudioWorklet=i}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.fxOutputGain??this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,r){jn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,r??{})}getParams(){return{...this.currentSettings}}setParams(e,r=!0){const n=r?{...this.currentSettings,...e}:{...me,...e};Object.assign(this.currentSettings,n),this.updateAudioNodes()}applyPreset(e,r){const n=Ho({preset:e,params:r});Object.assign(this.currentSettings,n),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseHighpass:null,noiseLowpass:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,r=this.nodes.radioToneHighpass,n=this.nodes.radioToneLowpass,o=this.nodes.radioTonePresence,h=this.nodes.lofiLowpass,i=this.nodes.lofiHighshelf,d=this.nodes.lofiDrive,m=this.nodes.bitcrusher,D=this.nodes.bassEq,E=this.nodes.midEq,b=this.nodes.trebleEq,F=this.nodes.stereoWidth,C=this.nodes.roomDryGain,H=this.nodes.roomWetGain,J=this.nodes.wowFlutterDelay,$=this.nodes.wowLfo,ee=this.nodes.wowLfoGain,Z=this.nodes.flutterLfo,X=this.nodes.flutterLfoGain,_=this.nodes.noiseGain,T=this.nodes.crackleGain,ae=this.nodes.vinylDustBedFilter,y=this.nodes.vinylDustBedGain,{settings:w,isPlaying:q,isOutputEnabled:Q}=this.runtimeState,N=w.isMuted||!Q?0:w.volume;if(e&&(e.gain.value=N),r&&n&&o){const A=w.isAudioFxEnabled?w.radioToneAmount:0;r.frequency.value=20+A*430,r.Q.value=.4+A*.35,n.frequency.value=2e4-A*17400,n.Q.value=.2+A*.9,o.frequency.value=1700,o.Q.value=.8+A*1.4,o.gain.value=A*6}if(h&&i&&d){const A=w.isAudioFxEnabled?w.lofiAmount:0;h.frequency.value=16e3-A*14200,h.Q.value=.3+A*1.8,i.gain.value=-A*18;try{d.curve=Hn(A*.6)}catch{}}if(m){const A=w.isAudioFxEnabled,U=16-(A?w.bitCrushAmount:0)*12,f=1+(A?w.sampleRateReductionAmount:0)*23,V=A?Math.max(w.bitCrushAmount,w.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(U,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(f,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(V,m.context.currentTime)}const fe=this.nodes.postCrushLowpass;if(fe){const A=w.isAudioFxEnabled?w.noiseReductionAmount:0;fe.frequency.value=Math.max(3e3,18e3-A*15e3)}if(D&&E&&b){const A=w.isAudioFxEnabled?15:0;D.gain.value=w.bassAmount*A,E.gain.value=w.midAmount*A,b.gain.value=w.trebleAmount*A}if(F){const A=w.isAudioFxEnabled?1+w.stereoWidthAmount:1;F.parameters.get("width")?.setValueAtTime(A,F.context.currentTime)}if(C&&H){const A=w.isAudioFxEnabled?w.smallSpeakerRoomAmount:0;C.gain.value=Math.max(.52,1-A*.42),H.gain.value=A*.95}if(J&&$&&ee&&Z&&X){const A=w.isAudioFxEnabled?w.wowFlutterAmount:0;J.delayTime.value=A>0?.006+A*.004:0,$.frequency.value=.18+A*.42,ee.gain.value=A*.0023,Z.frequency.value=5.2+A*6.5,X.gain.value=A*6e-4}if(_&&(_.gain.value=w.isNoiseEnabled&&!w.isMuted&&Q&&q?Math.min(.24,w.noiseLevel*5.5):0),T){const A=w.isNoiseEnabled&&!w.isMuted&&Q&&q;T.gain.value=A?Math.min(.24,w.vinylDustAmount*.22+w.noiseLevel*.25):0}if(ae&&y){const U=w.isNoiseEnabled&&!w.isMuted&&Q&&q?w.vinylDustAmount:0;ae.frequency.value=2100+U*2600,ae.Q.value=.35+U*.25,y.gain.value=U*.11}const ve=this.nodes.echoDelayLine,Ae=this.nodes.echoFeedbackGain,Y=this.nodes.echoWetGain;if(ve&&Ae&&Y){const A=w.isAudioFxEnabled?w.delayAmount:0;Ae.gain.value=A*.5,Y.gain.value=A*.55}const x=this.nodes.hallReverbWetGain;if(x){const A=w.isAudioFxEnabled?w.reverbAmount:0;x.gain.value=A*2}const B=this.nodes.chorusLfoGain1,z=this.nodes.chorusLfoGain2,ge=this.nodes.chorusWetGain;if(B&&z&&ge){const A=w.isAudioFxEnabled?w.chorusAmount:0;ge.gain.value=A*.6,B.gain.value=A*.005,z.gain.value=A*.006}const re=this.nodes.tapeSaturator;if(re)try{re.curve=yo(w.isAudioFxEnabled?w.tapeSaturationAmount:0)}catch{}const se=this.nodes.busCompressor;if(se){const A=w.isAudioFxEnabled?w.compressorAmount:0;se.threshold.value=-36*A,se.ratio.value=1+9*A}const M=this.nodes.fxOutputGain;M&&(M.gain.value=w.isAudioFxEnabled?w.fxOutputTrimAmount:1)}async loadWorklets(e){let r=null,n=null;const o=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in e&&o){const h=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICAgIG5zRXJyb3I6IDAsICAvLyBub2lzZSBzaGFwaW5nIGZlZWRiYWNrCiAgICAgIH0pOwogICAgfQoKICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbENvdW50OyBjaGFubmVsICs9IDEpIHsKICAgICAgY29uc3QgaW5wdXRDaGFubmVsID0gaW5wdXQ/LltjaGFubmVsXSA/PyBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IG91dHB1dENoYW5uZWwgPSBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jaGFubmVsU3RhdGVbY2hhbm5lbF07CgogICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3V0cHV0Q2hhbm5lbC5sZW5ndGg7IGluZGV4ICs9IDEpIHsKICAgICAgICBjb25zdCBiaXREZXB0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLmJpdERlcHRoLCBpbmRleCk7CiAgICAgICAgY29uc3QgaG9sZEZyYW1lcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQocmVhZFBhcmFtKHBhcmFtZXRlcnMuaG9sZEZyYW1lcywgaW5kZXgpKSk7CiAgICAgICAgY29uc3QgbWl4ID0gcmVhZFBhcmFtKHBhcmFtZXRlcnMubWl4LCBpbmRleCk7CiAgICAgICAgY29uc3Qgc291cmNlID0gaW5wdXRDaGFubmVsPy5baW5kZXhdID8/IDA7CgogICAgICAgIGlmIChzdGF0ZS5ob2xkQ291bnRlciA8PSAwKSB7CiAgICAgICAgICAvLyDkuInop5Ljg4fjgqPjgrbjg6rjg7PjgrA6IOmHj+WtkOWMluatquOBvyDihpIg44K144Op44K144Op44GX44Gf44OS44K56Z+z44Gr5aSJ5o+bCiAgICAgICAgICBjb25zdCBsc2IgPSAyIC8gTWF0aC5wb3coMiwgYml0RGVwdGgpOwogICAgICAgICAgY29uc3QgZGl0aGVyID0gKE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpIC0gMSkgKiBsc2I7CiAgICAgICAgICAvLyAx5qyh44OO44Kk44K644K344Kn44O844OU44Oz44KwOiDliY3lm57jga7ph4/lrZDljJboqqTlt67jgpLjg5XjgqPjg7zjg4njg5Djg4Pjgq/jgZfjgabpq5jln5/jgbjmirzjgZflh7rjgZkKICAgICAgICAgIGNvbnN0IHNoYXBlZCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBzb3VyY2UgKyBkaXRoZXIgLSBzdGF0ZS5uc0Vycm9yICogMC44NSkpOwogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNoYXBlZCwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUubnNFcnJvciA9IHN0YXRlLmhlbGRTYW1wbGUgLSBzaGFwZWQ7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciA9IGhvbGRGcmFtZXMgLSAxOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciAtPSAxOwogICAgICAgIH0KCiAgICAgICAgb3V0cHV0Q2hhbm5lbFtpbmRleF0gPSBzb3VyY2UgKyAoc3RhdGUuaGVsZFNhbXBsZSAtIHNvdXJjZSkgKiBtaXg7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gdHJ1ZTsKICB9Cn0KCmZ1bmN0aW9uIHJlYWRQYXJhbSh2YWx1ZXMsIGluZGV4KSB7CiAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IDEgPyB2YWx1ZXNbMF0gOiB2YWx1ZXNbaW5kZXhdOwp9CgpmdW5jdGlvbiBxdWFudGl6ZVNhbXBsZShzYW1wbGUsIGJpdERlcHRoKSB7CiAgY29uc3QgcmVzb2x2ZWRCaXREZXB0aCA9IE1hdGgubWF4KDIsIE1hdGgubWluKDE2LCBNYXRoLnJvdW5kKGJpdERlcHRoKSkpOwogIGlmIChyZXNvbHZlZEJpdERlcHRoID49IDE2KSB7CiAgICByZXR1cm4gc2FtcGxlOwogIH0KCiAgY29uc3QgbGV2ZWxzID0gMiAqKiByZXNvbHZlZEJpdERlcHRoOwogIGNvbnN0IG5vcm1hbGl6ZWQgPSAoc2FtcGxlICsgMSkgKiAwLjU7CiAgY29uc3QgcXVhbnRpemVkID0gTWF0aC5yb3VuZChub3JtYWxpemVkICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTsKICByZXR1cm4gcXVhbnRpemVkICogMiAtIDE7Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1iaXRjcnVzaGVyIiwgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yKTsK",import.meta.url);await e.audioWorklet.addModule(h.href),r=new o(e,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const i=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await e.audioWorklet.addModule(i.href),n=new o(e,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}return{bitcrusher:r,stereoWidth:n}}buildAndWireNodes(e,r){const n=e.createGain();let o=null;if("createMediaStreamDestination"in e)try{o=e.createMediaStreamDestination()}catch{o=null}const h=e.createBiquadFilter(),i=e.createBiquadFilter(),d=e.createBiquadFilter(),m=e.createBiquadFilter(),D=e.createBiquadFilter(),E=e.createWaveShaper(),b=e.createBiquadFilter(),F=e.createBiquadFilter(),C=e.createBiquadFilter(),H=e.createBiquadFilter(),J=e.createGain(),$=e.createConvolver(),ee=e.createGain(),Z=e.createDelay(.05),X=e.createOscillator(),_=e.createGain(),T=e.createOscillator(),ae=e.createGain(),y=e.createWaveShaper(),w=e.createGain(),q=e.createDynamicsCompressor(),Q=e.createDelay(1),N=e.createGain(),fe=e.createGain(),ve=e.createConvolver(),Ae=e.createGain(),Y=e.createDelay(.05),x=e.createDelay(.05),B=e.createOscillator(),z=e.createOscillator(),ge=e.createGain(),re=e.createGain(),se=e.createGain(),M=e.createGain(),A=e.createBufferSource(),U=e.createBiquadFilter(),f=e.createBiquadFilter(),V=e.createBiquadFilter(),u=e.createStereoPanner(),s=e.createGain(),ie=e.createOscillator(),j=e.createGain(),G=e.createBufferSource(),ce=e.createBiquadFilter(),Ce=e.createBiquadFilter(),ue=e.createGain(),te=e.createGain();h.type="highpass",i.type="lowpass",d.type="peaking",m.type="lowpass",D.type="highshelf",D.frequency.value=2800,E.oversample="4x",b.type="lowpass",b.frequency.value=18e3,b.Q.value=.5,F.type="lowshelf",F.frequency.value=180,C.type="peaking",C.frequency.value=1200,C.Q.value=.5,H.type="highshelf",H.frequency.value=2800,$.buffer=Un(e),Z.delayTime.value=0,X.type="sine",T.type="sine",y.curve=yo(0),y.oversample="4x",w.gain.value=1,q.knee.value=10,q.attack.value=.003,q.release.value=.12,q.threshold.value=0,q.ratio.value=1,Q.delayTime.value=.32,N.gain.value=0,fe.gain.value=0,ve.buffer=On(e),Ae.gain.value=0,Y.delayTime.value=.018,x.delayTime.value=.023,B.type="sine",z.type="sine",B.frequency.value=.8,z.frequency.value=1.3,ge.gain.value=0,re.gain.value=0,se.gain.value=0,M.gain.value=1,n.gain.value=0,s.gain.value=0,A.buffer=zn(e),A.loop=!0,U.type="highpass",U.frequency.value=1100,U.Q.value=.25,f.type="lowpass",f.frequency.value=5600,f.Q.value=.18,V.type="peaking",V.frequency.value=2400,V.Q.value=.7,V.gain.value=-2.5,ie.type="sine",ie.frequency.value=.021,j.gain.value=.08,G.buffer=Vn(e),G.loop=!0,ce.type="highpass",ce.frequency.value=1250,ce.Q.value=.35,Ce.type="bandpass",Ce.frequency.value=2400,Ce.Q.value=.4,ue.gain.value=0,te.gain.value=0;const{bitcrusher:xe,stereoWidth:Re}=r;return X.connect(_),_.connect(Z.delayTime),T.connect(ae),ae.connect(Z.delayTime),Z.connect(h),h.connect(i),i.connect(d),d.connect(m),m.connect(D),D.connect(E),xe?(E.connect(xe),xe.connect(b)):E.connect(b),b.connect(F),F.connect(C),C.connect(H),H.connect(y),Re?(y.connect(Re),Re.connect(J),Re.connect($)):(y.connect(J),y.connect($)),$.connect(ee),J.connect(n),ee.connect(n),n.connect(w),n.connect(Q),Q.connect(N),N.connect(Q),Q.connect(fe),fe.connect(w),n.connect(ve),ve.connect(Ae),Ae.connect(w),n.connect(Y),n.connect(x),B.connect(ge),ge.connect(Y.delayTime),z.connect(re),re.connect(x.delayTime),Y.connect(se),x.connect(se),se.connect(w),w.connect(q),q.connect(M),A.connect(U),U.connect(f),f.connect(V),V.connect(u),u.connect(s),s.connect(n),ie.connect(j),j.connect(u.pan),G.connect(ce),ce.connect(te),te.connect(n),G.connect(Ce),Ce.connect(ue),ue.connect(n),{masterGain:n,recordingDestination:o,radioToneHighpass:h,radioToneLowpass:i,radioTonePresence:d,lofiLowpass:m,lofiHighshelf:D,lofiDrive:E,bitcrusher:xe,postCrushLowpass:b,bassEq:F,midEq:C,trebleEq:H,stereoWidth:Re,roomDryGain:J,roomConvolver:$,roomWetGain:ee,wowFlutterDelay:Z,wowLfo:X,wowLfoGain:_,flutterLfo:T,flutterLfoGain:ae,noiseSource:A,noiseHighpass:U,noiseLowpass:f,noiseFilter:V,noisePanner:u,noiseGain:s,noiseLfo:ie,noiseLfoGain:j,crackleSource:G,crackleFilter:ce,vinylDustBedFilter:Ce,vinylDustBedGain:ue,crackleGain:te,outputBus:w,echoDelayLine:Q,echoFeedbackGain:N,echoWetGain:fe,hallReverbConvolver:ve,hallReverbWetGain:Ae,chorusDelay1:Y,chorusDelay2:x,chorusLfo1:B,chorusLfo2:z,chorusLfoGain1:ge,chorusLfoGain2:re,chorusWetGain:se,tapeSaturator:y,busCompressor:q,fxOutputGain:M}}startSources(){this.nodes.noiseSource?.start(),this.nodes.noiseLfo?.start(),this.nodes.crackleSource?.start(),this.nodes.wowLfo?.start(),this.nodes.flutterLfo?.start(),this.nodes.chorusLfo1?.start(),this.nodes.chorusLfo2?.start()}applyAutoConnect(){const e=this.nodes.fxOutputGain;if(!e)return;this.connectOutputToDestination&&(e.connect(this.context.destination),this.autoConnections.add(this.context.destination));const r=this.nodes.recordingDestination;r&&this.connectOutputToRecordingDestination&&(e.connect(r),this.autoConnections.add(r))}async initNodes(){const e=this.context,r=await this.loadWorklets(e),n=this.buildAndWireNodes(e,r);Object.assign(this.nodes,{audioContext:e,...n}),this.startSources(),this.applyAutoConnect()}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;(!this.nodes.audioContext||!this.nodes.masterGain)&&await this.initNodes();const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const r=await this.ensureInitialized();if(!r){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:r.state})}async connect(e,r,n){const o=await this.ensureInitialized();if(!o){this.debugAudio("connect:no-context");return}const h=this.output;if(!h){this.debugAudio("connect:no-output-node",{audioContextState:o.state});return}if(Tt(e)){h.connect(e,r),this.externalConnections.add(e);return}if(this.connectOutputToDestination&&e===o.destination){this.debugAudio("connect:skipped-double-destination");return}h.connect(e,r,n),this.externalConnections.add(e)}disconnect(e){const r=this.output;if(r)if(e!==void 0){try{Tt(e),r.disconnect(e)}catch{}this.externalConnections.delete(e)}else{for(const n of this.externalConnections)try{Tt(n),r.disconnect(n)}catch{}this.externalConnections.clear()}}async dispose(){const e=[this.nodes.noiseSource,this.nodes.noiseLfo,this.nodes.crackleSource,this.nodes.wowLfo,this.nodes.flutterLfo,this.nodes.chorusLfo1,this.nodes.chorusLfo2];for(const o of e){try{o?.stop()}catch{}try{o?.disconnect()}catch{}}try{this.nodes.sourceNode?.disconnect()}catch{}this.disconnect();const r=this.output;if(r)for(const o of this.autoConnections)try{Tt(o),r.disconnect(o)}catch{}this.autoConnections.clear();const n=[this.nodes.wowFlutterDelay,this.nodes.wowLfoGain,this.nodes.flutterLfoGain,this.nodes.radioToneHighpass,this.nodes.radioToneLowpass,this.nodes.radioTonePresence,this.nodes.lofiLowpass,this.nodes.lofiHighshelf,this.nodes.lofiDrive,this.nodes.bitcrusher,this.nodes.postCrushLowpass,this.nodes.bassEq,this.nodes.midEq,this.nodes.trebleEq,this.nodes.tapeSaturator,this.nodes.stereoWidth,this.nodes.roomDryGain,this.nodes.roomConvolver,this.nodes.roomWetGain,this.nodes.echoDelayLine,this.nodes.echoFeedbackGain,this.nodes.echoWetGain,this.nodes.hallReverbConvolver,this.nodes.hallReverbWetGain,this.nodes.chorusDelay1,this.nodes.chorusDelay2,this.nodes.chorusLfoGain1,this.nodes.chorusLfoGain2,this.nodes.chorusWetGain,this.nodes.noisePanner,this.nodes.noiseGain,this.nodes.noiseHighpass,this.nodes.noiseLowpass,this.nodes.noiseFilter,this.nodes.noiseLfoGain,this.nodes.crackleFilter,this.nodes.vinylDustBedFilter,this.nodes.vinylDustBedGain,this.nodes.crackleGain,this.nodes.masterGain,this.nodes.outputBus,this.nodes.busCompressor,this.nodes.fxOutputGain];for(const o of n)try{o?.disconnect()}catch{}this.resetNodes()}async ensureAudioContext(){return this.ensureInitialized()}}function Ro({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:r=!1,...n}){const h={settings:Ho(n),isPlaying:n.isPlaying??!0,isOutputEnabled:n.previewKind===void 0?!0:n.previewKind==="video"||n.previewKind==="audio"||n.previewKind==="capture"};return new _n({context:t,instanceLabel:n.instanceLabel??"tetorica-retro-audio-engine",runtimeState:h,connectOutputToDestination:e,connectOutputToRecordingDestination:r,enableAudioWorklet:n.enableAudioWorklet})}function co(){if(typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc.")return!1;const t=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(t)}function ne(t){return{get current(){return t()}}}function Zn({instanceLabel:t,previewKind:e,previewKindRef:r,mediaRef:n,isPlaying:o,isPlayingRef:h}){const[i]=a.useState(()=>{const c=Bt()?.audio;return{isMuted:c?.isMuted??me.isMuted,volume:c?.volume??me.volume,playbackRate:c?.playbackRate??me.playbackRate,isLooping:c?.isLooping??me.isLooping,isAudioFxEnabled:c?.isAudioFxEnabled??me.isAudioFxEnabled,lofiAmount:c?.lofiAmount??me.lofiAmount,radioToneAmount:c?.radioToneAmount??me.radioToneAmount,bitCrushAmount:c?.bitCrushAmount??me.bitCrushAmount,sampleRateReductionAmount:c?.sampleRateReductionAmount??me.sampleRateReductionAmount,noiseReductionAmount:c?.noiseReductionAmount??me.noiseReductionAmount,bassAmount:c?.bassAmount??me.bassAmount,midAmount:c?.midAmount??me.midAmount,trebleAmount:c?.trebleAmount??me.trebleAmount,stereoWidthAmount:c?.stereoWidthAmount??me.stereoWidthAmount,smallSpeakerRoomAmount:c?.smallSpeakerRoomAmount??me.smallSpeakerRoomAmount,wowFlutterAmount:c?.wowFlutterAmount??me.wowFlutterAmount,isNoiseEnabled:c?.isNoiseEnabled??me.isNoiseEnabled,noiseLevel:c?.noiseLevel??me.noiseLevel,vinylDustAmount:c?.vinylDustAmount??me.vinylDustAmount,delayAmount:c?.delayAmount??me.delayAmount,reverbAmount:c?.reverbAmount??me.reverbAmount,chorusAmount:c?.chorusAmount??me.chorusAmount,tapeSaturationAmount:c?.tapeSaturationAmount??me.tapeSaturationAmount,compressorAmount:c?.compressorAmount??me.compressorAmount,fxOutputTrimAmount:c?.fxOutputTrimAmount??me.fxOutputTrimAmount}}),d=a.useRef(i.isMuted),m=a.useRef(i.volume),D=a.useRef(i.playbackRate),E=a.useRef(i.isLooping),b=a.useRef(i.isAudioFxEnabled),F=a.useRef(i.lofiAmount),C=a.useRef(i.radioToneAmount),H=a.useRef(i.bitCrushAmount),J=a.useRef(i.sampleRateReductionAmount),$=a.useRef(i.noiseReductionAmount),ee=a.useRef(i.bassAmount),Z=a.useRef(i.midAmount),X=a.useRef(i.trebleAmount),_=a.useRef(i.stereoWidthAmount),T=a.useRef(i.smallSpeakerRoomAmount),ae=a.useRef(i.wowFlutterAmount),y=a.useRef(i.isNoiseEnabled),w=a.useRef(i.noiseLevel),q=a.useRef(i.vinylDustAmount),Q=a.useRef(i.delayAmount),N=a.useRef(i.reverbAmount),fe=a.useRef(i.chorusAmount),ve=a.useRef(i.tapeSaturationAmount),Ae=a.useRef(i.compressorAmount),Y=a.useRef(i.fxOutputTrimAmount),[x,B]=a.useState(i.isMuted),[z,ge]=a.useState(i.playbackRate),[re,se]=a.useState(i.volume),[M,A]=a.useState(i.isLooping),[U,f]=a.useState(i.isAudioFxEnabled),[V,u]=a.useState(i.lofiAmount),[s,ie]=a.useState(i.radioToneAmount),[j,G]=a.useState(i.bitCrushAmount),[ce,Ce]=a.useState(i.sampleRateReductionAmount),[ue,te]=a.useState(i.noiseReductionAmount),[xe,Re]=a.useState(i.bassAmount),[P,W]=a.useState(i.midAmount),[K,Pe]=a.useState(i.trebleAmount),[Se,Fe]=a.useState(i.stereoWidthAmount),[ke,Ee]=a.useState(i.smallSpeakerRoomAmount),[ye,Ye]=a.useState(i.wowFlutterAmount),[We,Qe]=a.useState(i.isNoiseEnabled),[Be,je]=a.useState(i.noiseLevel),[be,Le]=a.useState(i.vinylDustAmount),[_e,Ke]=a.useState(i.delayAmount),[Ie,Me]=a.useState(i.reverbAmount),[De,Ze]=a.useState(i.chorusAmount),[qe,He]=a.useState(i.tapeSaturationAmount),[Xe,et]=a.useState(i.compressorAmount),[l,L]=a.useState(i.fxOutputTrimAmount),k=a.useRef(null),oe=a.useRef(null),g=a.useRef(null),S=()=>{if(!g.current){const c=new AudioContext;oe.current=c,g.current=Ro({context:c,instanceLabel:t,params:i,isPlaying:h.current,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})}return g.current},[Te]=a.useState(()=>({audioContextRef:ne(()=>g.current?.audioContext??null),masterGainRef:ne(()=>g.current?.masterGain??null),radioToneHighpassRef:ne(()=>g.current?.radioToneHighpass??null),radioToneLowpassRef:ne(()=>g.current?.radioToneLowpass??null),radioTonePresenceRef:ne(()=>g.current?.radioTonePresence??null),recordingDestinationRef:ne(()=>g.current?.recordingDestination??null),lofiLowpassRef:ne(()=>g.current?.lofiLowpass??null),lofiHighshelfRef:ne(()=>g.current?.lofiHighshelf??null),lofiDriveRef:ne(()=>g.current?.lofiDrive??null),bitcrusherRef:ne(()=>g.current?.bitcrusher??null),bassEqRef:ne(()=>g.current?.bassEq??null),midEqRef:ne(()=>g.current?.midEq??null),trebleEqRef:ne(()=>g.current?.trebleEq??null),stereoWidthRef:ne(()=>g.current?.stereoWidth??null),roomDryGainRef:ne(()=>g.current?.roomDryGain??null),roomConvolverRef:ne(()=>g.current?.roomConvolver??null),roomWetGainRef:ne(()=>g.current?.roomWetGain??null),wowFlutterDelayRef:ne(()=>g.current?.wowFlutterDelay??null),wowLfoRef:ne(()=>g.current?.wowLfo??null),wowLfoGainRef:ne(()=>g.current?.wowLfoGain??null),flutterLfoRef:ne(()=>g.current?.flutterLfo??null),flutterLfoGainRef:ne(()=>g.current?.flutterLfoGain??null),noiseSourceRef:ne(()=>g.current?.noiseSource??null),noiseFilterRef:ne(()=>g.current?.noiseFilter??null),noisePannerRef:ne(()=>g.current?.noisePanner??null),noiseGainRef:ne(()=>g.current?.noiseGain??null),noiseLfoRef:ne(()=>g.current?.noiseLfo??null),noiseLfoGainRef:ne(()=>g.current?.noiseLfoGain??null),crackleSourceRef:ne(()=>g.current?.crackleSource??null),crackleFilterRef:ne(()=>g.current?.crackleFilter??null),vinylDustBedFilterRef:ne(()=>g.current?.vinylDustBedFilter??null),vinylDustBedGainRef:ne(()=>g.current?.vinylDustBedGain??null),crackleGainRef:ne(()=>g.current?.crackleGain??null)})),{audioContextRef:le,masterGainRef:kt,radioToneHighpassRef:rt,radioToneLowpassRef:ct,radioTonePresenceRef:It,recordingDestinationRef:ut,lofiLowpassRef:Ft,lofiHighshelfRef:Gt,lofiDriveRef:Nt,bitcrusherRef:dt,bassEqRef:Wt,midEqRef:ht,trebleEqRef:Ht,stereoWidthRef:Ut,roomDryGainRef:Ot,roomConvolverRef:mt,roomWetGainRef:zt,wowFlutterDelayRef:gt,wowLfoRef:Vt,wowLfoGainRef:pt,flutterLfoRef:jt,flutterLfoGainRef:ft,noiseSourceRef:_t,noiseFilterRef:vt,noisePannerRef:Zt,noiseGainRef:Xt,noiseLfoRef:Kt,noiseLfoGainRef:qt,crackleSourceRef:Yt,crackleFilterRef:Jt,vinylDustBedFilterRef:Qt,vinylDustBedGainRef:$t,crackleGainRef:eo}=Te,to=()=>({isMuted:d.current,volume:m.current,playbackRate:D.current,isLooping:E.current,isAudioFxEnabled:b.current,lofiAmount:F.current,radioToneAmount:C.current,bitCrushAmount:H.current,sampleRateReductionAmount:J.current,noiseReductionAmount:$.current,bassAmount:ee.current,midAmount:Z.current,trebleAmount:X.current,stereoWidthAmount:_.current,smallSpeakerRoomAmount:T.current,wowFlutterAmount:ae.current,isNoiseEnabled:y.current,noiseLevel:w.current,vinylDustAmount:q.current,delayAmount:Q.current,reverbAmount:N.current,chorusAmount:fe.current,tapeSaturationAmount:ve.current,compressorAmount:Ae.current,fxOutputTrimAmount:Y.current}),Ge=(c,de)=>g.current?.debugAudio(c,de),it=()=>S().ensureInitialized(),oo=()=>S().ensureInitialized(),$e=()=>g.current?.updateAudioNodes(),no=c=>S().connectSourceNode(c),ro=async()=>{await g.current?.dispose()},bt=(c,de)=>g.current?.setParams(c,de),io=c=>g.current?.setIsPlaying(c),so=c=>g.current?.setOutputEnabled(c),At=async c=>{if(c.state!=="closed")try{await c.close()}catch(de){Ge("closeOwnedAudioContext:error",{audioContextState:c.state,message:de instanceof Error?de.message:String(de)})}},xt=async c=>{const de=oe.current,Ne=g.current,Ue=to();Ge("recreateAudioEngine:start",{audioContextState:de?.state??"none",hasMedia:!!n.current,reason:c}),k.current?.disconnect(),k.current=null,Ne&&await Ne.dispose(),de&&await At(de);const st=new AudioContext,Oe=Ro({context:st,instanceLabel:t,params:Ue,isPlaying:h.current,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0});oe.current=st,g.current=Oe;const nt=await Oe.ensureInitialized();return Oe.setParams(Ue,!0),Oe.setIsPlaying(h.current),Oe.setOutputEnabled(r.current==="video"||r.current==="audio"||r.current==="capture"),Ge("recreateAudioEngine:ready",{audioContextState:nt?.state??st.state,hasMedia:!!n.current,reason:c}),nt},wt=async c=>{const de=await it(),Ne=g.current;if(!de||!Ne||!Ne.input){Ge("connectMediaAudio:no-context",{mediaTag:c.tagName});return}k.current&&(Ge("connectMediaAudio:disconnect-previous",{mediaTag:c.tagName}),k.current.disconnect(),k.current=null);try{const Ue=de.createMediaElementSource(c);Ue.connect(Ne.input),k.current=Ue,co()?(c.muted=!1,c.volume=0):(c.muted=d.current,c.volume=d.current?0:m.current),Ge("connectMediaAudio:connected",{audioContextState:de.state,mediaTag:c.tagName,previewKind:r.current}),$e()}catch(Ue){throw Ge("connectMediaAudio:error",{audioContextState:de.state,mediaTag:c.tagName,message:Ue instanceof Error?Ue.message:String(Ue),previewKind:r.current}),Ue}},tt=()=>{const c=k.current,de=g.current;!c||!de?.input||(c.disconnect(),c.connect(de.input),$e())},Ct=async c=>{const de=await it();return de?(Ge("ensureAudioContextWithRecovery:healthy",{audioContextState:de.state,reason:c}),de):(Ge("ensureAudioContextWithRecovery:recreate-needed",{audioContextState:oe.current?.state??"none",reason:c}),xt(c))},ot=async c=>{const de=n.current,Ne=await xt(c);return Ne?(de&&await wt(de),$e(),Ge("rebuildAudioGraphForCurrentMedia:done",{audioContextState:Ne.state,hasMedia:!!de,reason:c}),Ne):null},St=async()=>{k.current?.disconnect(),k.current=null,await ro(),oe.current&&await At(oe.current)},yt=c=>{d.current=c.isMuted,m.current=c.volume,D.current=c.playbackRate,E.current=c.isLooping,b.current=c.isAudioFxEnabled,F.current=c.lofiAmount,C.current=c.radioToneAmount,H.current=c.bitCrushAmount,J.current=c.sampleRateReductionAmount,$.current=c.noiseReductionAmount,ee.current=c.bassAmount,Z.current=c.midAmount,X.current=c.trebleAmount,_.current=c.stereoWidthAmount,T.current=c.smallSpeakerRoomAmount,ae.current=c.wowFlutterAmount,y.current=c.isNoiseEnabled,w.current=c.noiseLevel,q.current=c.vinylDustAmount,Q.current=c.delayAmount,N.current=c.reverbAmount,fe.current=c.chorusAmount,ve.current=c.tapeSaturationAmount,Ae.current=c.compressorAmount,Y.current=c.fxOutputTrimAmount,B(c.isMuted),se(c.volume),ge(c.playbackRate),A(c.isLooping),f(c.isAudioFxEnabled),u(c.lofiAmount),ie(c.radioToneAmount),G(c.bitCrushAmount),Ce(c.sampleRateReductionAmount),te(c.noiseReductionAmount),Re(c.bassAmount),W(c.midAmount),Pe(c.trebleAmount),Fe(c.stereoWidthAmount),Ee(c.smallSpeakerRoomAmount),Ye(c.wowFlutterAmount),Qe(c.isNoiseEnabled),je(c.noiseLevel),Le(c.vinylDustAmount),Ke(c.delayAmount),Me(c.reverbAmount),Ze(c.chorusAmount),He(c.tapeSaturationAmount),et(c.compressorAmount),L(c.fxOutputTrimAmount),n.current&&(co()&&k.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=c.isMuted,n.current.volume=c.volume),n.current.playbackRate=c.playbackRate,n.current.loop=c.isLooping),bt(c),window.requestAnimationFrame($e)},ao=()=>yt({...me});return a.useEffect(()=>{d.current=x,m.current=re,D.current=z,E.current=M,b.current=U,F.current=V,C.current=s,H.current=j,J.current=ce,$.current=ue,ee.current=xe,Z.current=P,X.current=K,_.current=Se,T.current=ke,ae.current=ye,y.current=We,w.current=Be,q.current=be,Q.current=_e,N.current=Ie,fe.current=De,ve.current=qe,Ae.current=Xe,Y.current=l,bt({isMuted:x,volume:re,playbackRate:z,isLooping:M,isAudioFxEnabled:U,lofiAmount:V,radioToneAmount:s,bitCrushAmount:j,sampleRateReductionAmount:ce,noiseReductionAmount:ue,bassAmount:xe,midAmount:P,trebleAmount:K,stereoWidthAmount:Se,smallSpeakerRoomAmount:ke,wowFlutterAmount:ye,isNoiseEnabled:We,noiseLevel:Be,vinylDustAmount:be,delayAmount:_e,reverbAmount:Ie,chorusAmount:De,tapeSaturationAmount:qe,compressorAmount:Xe,fxOutputTrimAmount:l},!0),io(o),so(e==="video"||e==="audio"||e==="capture"),n.current&&(co()&&k.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=x,n.current.volume=x?0:re),n.current.playbackRate=z,n.current.loop=M)},[x,re,U,V,s,j,ce,ue,xe,P,K,Se,ke,ye,We,Be,be,_e,Ie,De,qe,Xe,l,o,z,M,e]),a.useEffect(()=>{const c=setTimeout(()=>{kn({isMuted:x,volume:re,playbackRate:z,isLooping:M,isAudioFxEnabled:U,lofiAmount:V,radioToneAmount:s,bitCrushAmount:j,sampleRateReductionAmount:ce,noiseReductionAmount:ue,bassAmount:xe,midAmount:P,trebleAmount:K,stereoWidthAmount:Se,smallSpeakerRoomAmount:ke,wowFlutterAmount:ye,isNoiseEnabled:We,noiseLevel:Be,vinylDustAmount:be,delayAmount:_e,reverbAmount:Ie,chorusAmount:De,tapeSaturationAmount:qe,compressorAmount:Xe,fxOutputTrimAmount:l})},300);return()=>clearTimeout(c)},[x,re,z,M,U,V,s,j,ce,ue,xe,P,K,Se,ke,ye,We,Be,be,_e,Ie,De,qe,Xe,l]),{audioContextRef:le,mediaSourceRef:k,masterGainRef:kt,radioToneHighpassRef:rt,radioToneLowpassRef:ct,radioTonePresenceRef:It,recordingDestinationRef:ut,lofiLowpassRef:Ft,lofiHighshelfRef:Gt,lofiDriveRef:Nt,bitcrusherRef:dt,bassEqRef:Wt,midEqRef:ht,trebleEqRef:Ht,stereoWidthRef:Ut,roomDryGainRef:Ot,roomConvolverRef:mt,roomWetGainRef:zt,wowFlutterDelayRef:gt,wowLfoRef:Vt,wowLfoGainRef:pt,flutterLfoRef:jt,flutterLfoGainRef:ft,noiseSourceRef:_t,noiseFilterRef:vt,noisePannerRef:Zt,noiseGainRef:Xt,noiseLfoRef:Kt,noiseLfoGainRef:qt,crackleSourceRef:Yt,crackleFilterRef:Jt,vinylDustBedFilterRef:Qt,vinylDustBedGainRef:$t,crackleGainRef:eo,isMutedRef:d,volumeRef:m,playbackRateRef:D,isLoopingRef:E,isAudioFxEnabledRef:b,lofiAmountRef:F,radioToneAmountRef:C,bitCrushAmountRef:H,sampleRateReductionAmountRef:J,bassAmountRef:ee,midAmountRef:Z,trebleAmountRef:X,stereoWidthAmountRef:_,smallSpeakerRoomAmountRef:T,wowFlutterAmountRef:ae,isNoiseEnabledRef:y,noiseLevelRef:w,vinylDustAmountRef:q,delayAmountRef:Q,reverbAmountRef:N,chorusAmountRef:fe,tapeSaturationAmountRef:ve,compressorAmountRef:Ae,fxOutputTrimAmountRef:Y,isMuted:x,setIsMuted:B,playbackRate:z,setPlaybackRate:ge,volume:re,setVolume:se,isLooping:M,setIsLooping:A,isAudioFxEnabled:U,setIsAudioFxEnabled:f,lofiAmount:V,setLofiAmount:u,radioToneAmount:s,setRadioToneAmount:ie,bitCrushAmount:j,setBitCrushAmount:G,sampleRateReductionAmount:ce,setSampleRateReductionAmount:Ce,noiseReductionAmount:ue,setNoiseReductionAmount:te,bassAmount:xe,setBassAmount:Re,midAmount:P,setMidAmount:W,trebleAmount:K,setTrebleAmount:Pe,stereoWidthAmount:Se,setStereoWidthAmount:Fe,smallSpeakerRoomAmount:ke,setSmallSpeakerRoomAmount:Ee,wowFlutterAmount:ye,setWowFlutterAmount:Ye,isNoiseEnabled:We,setIsNoiseEnabled:Qe,noiseLevel:Be,setNoiseLevel:je,vinylDustAmount:be,setVinylDustAmount:Le,delayAmount:_e,setDelayAmount:Ke,reverbAmount:Ie,setReverbAmount:Me,chorusAmount:De,setChorusAmount:Ze,tapeSaturationAmount:qe,setTapeSaturationAmount:He,compressorAmount:Xe,setCompressorAmount:et,fxOutputTrimAmount:l,setFxOutputTrimAmount:L,debugAudio:Ge,ensureAudioContext:oo,ensureAudioContextWithRecovery:Ct,ensureInitialized:it,updateAudioNodes:$e,connectSourceNode:no,connectMediaAudio:wt,reconnectCurrentMediaAudio:tt,rebuildAudioGraphForCurrentMedia:ot,applyAudioSettings:yt,resetAudioSettings:ao,disposeAudioEngine:St}}const Xn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},lt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,edgeBoost:1.5,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeCel:{label:"Anime Cel",width:640,height:360,colors:16,dither:0,palette:"anime",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.15,toonSteps:1,edgeBoost:.3,animeEdgeLow:.22,animeEdgeHigh:.66,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},tetorica:{label:"Tetorica",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,toonSteps:3,edgeBoost:1.5,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:8,edgeBoost:.22,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},Kn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:t==="anime"?10:0,qn=`#version 300 es
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

  // 3 steps shifted to {0.22, 0.58, 0.94} — black reserved for edge lines only
  float vQ = 0.22 + round(v * 2.0) / 2.0 * 0.72;

  // Skin shadow: drift hue slightly toward cool pink/purple
  float shadowDepth = max(0.0, v - vQ);
  float hQ = fract(h + skinWeight * shadowDepth * 0.12);

  // Saturation modulation by V step: anime shadows are vivid, highlights soften
  // shadow (vQ=0): boost S, highlight (vQ=1): reduce S slightly
  float satScale = mix(1.35, 0.85, vQ);
  float sQ = clamp(s * satScale, 0.0, 1.0);

  return hsv2rgb(vec3(hQ, sQ, vQ));
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
    if (uToonSteps >= 1.0) {
      float edge = computeAnimeEdge(pixelatedUv, texel);
      // Shadow areas get thicker lines: lower threshold in dark zones
      float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      float adaptedLow = mix(uAnimeEdgeLow * 0.35, uAnimeEdgeLow, smoothstep(0.25, 0.65, lum));
      float edgeMix = smoothstep(adaptedLow, uAnimeEdgeHigh, edge) * edgeBoost;
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
`,Yn=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,To=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Jn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),Lo=640,uo=()=>typeof performance<"u"?performance.now():Date.now(),ho=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Do=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Qn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Eo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),Dt=t=>({width:ho(t)?t.videoWidth:Do(t)?t.naturalWidth:t.width,height:ho(t)?t.videoHeight:Do(t)?t.naturalHeight:t.height}),$n=(t,e,r)=>ho(t)&&(e>Lo||r>Lo),Pt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),er=t=>Pt(t)&&t.phosphorDotInternalScale?2:1,tr=(t,e,r,n)=>{if(r===void 0||n===void 0||r<=0||n<=0)return{width:t,height:e};const o=r/n;return t/e>o?{width:Math.max(1,Math.round(e*o)),height:e}:{width:t,height:Math.max(1,Math.round(t/o))}},or=(t,e,r,n,o,h)=>{if(!Pt(r)||o===void 0||h===void 0||o<=0||h<=0)return{width:t,height:e};const i=Math.max(1.1,2.15+r.bulbRadius*1.15),d=Math.max(1,i/Math.max(n,1)),m=Math.max(1,Math.floor(o/d)),D=Math.max(1,Math.floor(h/d)),E=Math.min(1,m/Math.max(t,1),D/Math.max(e,1));return{width:Math.max(1,Math.round(t*E)),height:Math.max(1,Math.round(e*E))}},mo=(t,e,r,n,o)=>{const h=er(t),i=Math.max(t.targetWidth,1),d=Math.max(t.targetHeight,1),m=t.matchTargetAspect?tr(i,d,e,r):{width:i,height:d},D=m.width*h,E=m.height*h,b=or(D,E,t,h,n,o);return{width:b.width,height:b.height,sampleWidth:Math.max(1,Math.round(D)),sampleHeight:Math.max(1,Math.round(E)),internalScale:h,isPhosphorDotMode:Pt(t)}};function Mo(t,e,r){const n=t.createShader(e);if(!n)throw new Error("Failed to create shader.");if(t.shaderSource(n,r),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(n)||"Unknown shader compile error.";throw t.deleteShader(n),new Error(o)}return n}function Bo(t,e,r){const n=Mo(t,t.VERTEX_SHADER,e),o=Mo(t,t.FRAGMENT_SHADER,r),h=t.createProgram();if(!h)throw t.deleteShader(n),t.deleteShader(o),new Error("Failed to create WebGL program.");if(t.attachShader(h,n),t.attachShader(h,o),t.bindAttribLocation(h,0,"aPosition"),t.linkProgram(h),t.deleteShader(n),t.deleteShader(o),!t.getProgramParameter(h,t.LINK_STATUS)){const i=t.getProgramInfoLog(h)||"Unknown program link error.";throw t.deleteProgram(h),new Error(i)}return h}class nr{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=uo();constructor(e){this.gl=e,this.filterProgram=Bo(e,To,qn),this.passthroughProgram=Bo(e,To,Yn);const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,Jn,e.STATIC_DRAW);const n=e.createVertexArray();e.bindVertexArray(n),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const o=e.createTexture();if(!o)throw new Error("Failed to create WebGL texture.");this.texture=o,e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uAnimeEdgeLow:e.getUniformLocation(this.filterProgram,"uAnimeEdgeLow"),uAnimeEdgeHigh:e.getUniformLocation(this.filterProgram,"uAnimeEdgeHigh"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=uo()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const r=this.currentSource,n=this.currentFilterState;if(!this.outputEnabled||!r||!n)return;const o=this.getUploadSource(r,n);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const h=n.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,h),Eo(o)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o.width,o.height,0,e.RGBA,e.UNSIGNED_BYTE,o.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),n.isFilterEnabled){const i=Dt(r);this.applyFilterUniforms(n,i.width,i.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,r){if(Eo(e)||!r.isFilterEnabled)return e;const n=Dt(e);if(n.width<=0||n.height<=0||$n(e,n.width,n.height))return e;const{width:o,height:h,sampleWidth:i,sampleHeight:d,isPhosphorDotMode:m}=mo(r,n.width,n.height),D=Math.max(1,Math.round(m?i:o)),E=Math.max(1,Math.round(m?d:h)),b=this.ensureUploadContext();return!b||!this.uploadCanvas?e:(this.uploadCanvas.width!==D&&(this.uploadCanvas.width=D),this.uploadCanvas.height!==E&&(this.uploadCanvas.height=E),b.imageSmoothingEnabled=!0,b.imageSmoothingQuality="high",b.fillStyle="#000",b.fillRect(0,0,D,E),b.drawImage(e,0,0,D,E),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),r=e.getContext("2d",{alpha:!1,desynchronized:!0});return r?(this.uploadCanvas=e,this.uploadContext=r,r):null}applyFilterUniforms(e,r,n){const{gl:o}=this,h=Qn(o.canvas)?o.canvas:null,i=Math.max(h?.clientWidth??o.drawingBufferWidth,1),d=Math.max(h?.clientHeight??o.drawingBufferHeight,1),{width:m,height:D,sampleWidth:E,sampleHeight:b,isPhosphorDotMode:F}=mo(e,r,n,i,d);o.useProgram(this.filterProgram),o.uniform2f(this.uniformLocations.uTargetSize,m,D),o.uniform2f(this.uniformLocations.uSampleTargetSize,E,b),o.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),o.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),o.uniform1f(this.uniformLocations.uPaletteMode,Kn(e.paletteMode)),o.uniform1f(this.uniformLocations.uCurvature,e.curvature),o.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),o.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),o.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),o.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),o.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),o.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),o.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),o.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),o.uniform1f(this.uniformLocations.uAnimeEdgeLow,e.animeEdgeLow),o.uniform1f(this.uniformLocations.uAnimeEdgeHigh,e.animeEdgeHigh),o.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),o.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),o.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),o.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),o.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),o.uniform1f(this.uniformLocations.uPixelAspect,Math.max(o.drawingBufferWidth,1)*D/(Math.max(o.drawingBufferHeight,1)*m)),o.uniform1f(this.uniformLocations.uPhosphorDotMode,F?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),o.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),o.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),o.uniform3f(this.uniformLocations.uMonoTint,...Xn[e.monoTint].rgb),o.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),o.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),o.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),o.uniform1f(this.uniformLocations.uTime,(uo()-this.startedAt)/1e3)}}function rr({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:n,isPlayingRef:o,previewKindRef:h,debugVideo:i}){const d=a.useRef(null),m=a.useRef(null),D=a.useRef(null),E=a.useRef(null),b=a.useRef(null),F=a.useRef(null),C=a.useRef(null),H=a.useRef(null),J=a.useRef(()=>{}),$=a.useRef(t),ee=a.useRef(n),Z=a.useRef(!1),X=a.useRef(null),_=a.useRef(null),T=a.useRef(null),[ae,y]=a.useState(!1),[w,q]=a.useState(null);$.current=t,ee.current=n;const Q=a.useCallback(f=>{q(V=>{const u=typeof f=="function"?f(V):f;return T.current=u,u})},[]),N=a.useCallback(()=>{const f=m.current,V=b.current;f&&(f.pipeline.setOutputEnabled(ee.current),f.pipeline.setSource(V),f.pipeline.setFilterState($.current),f.pipeline.render())},[]);a.useLayoutEffect(()=>{J.current=N},[N]);const fe=a.useCallback(()=>{Z.current=!1,H.current!==null&&(window.cancelAnimationFrame(H.current),H.current=null)},[]),ve=a.useCallback(()=>{if(Z.current)return;Z.current=!0;const f=()=>{if(!Z.current)return;if(J.current(),!(h.current==="video"||h.current==="capture"||h.current==="image"||o.current)){H.current=null,Z.current=!1;return}H.current=window.requestAnimationFrame(f)};H.current=window.requestAnimationFrame(f)},[o,h]),Ae=a.useCallback(()=>{N()},[N]),Y=a.useCallback(()=>{N()},[N]),x=a.useCallback(()=>{N()},[N]),B=a.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),F.current={},N(),F.current),[N]),z=a.useCallback((f,V,u)=>{if(!f)return;const{width:s,height:ie}=Dt(u);if(s<=0||ie<=0)return;const j=d.current,G=j?.clientWidth??f.canvas.width,ce=j?.clientHeight??f.canvas.height,ue=e==="width"?G/s:Math.min(G/s,ce/ie),te=s*ue,xe=ie*ue,Re=(G-te)/2,P=(ce-xe)/2,W={width:te,height:xe,x:Re,y:P},K=T.current;return K&&K.width===W.width&&K.height===W.height&&K.x===W.x&&K.y===W.y?K:(T.current=W,Q(W),W)},[e,Q]),ge=a.useCallback(()=>{b.current&&z(m.current,null,b.current)},[z]),re=a.useCallback(()=>{N()},[N]),se=a.useCallback(()=>{const f=m.current,V=d.current;if(!f||!V)return;ge();const u=T.current??{x:0,y:0,width:V.clientWidth,height:V.clientHeight},s=Math.max(1,Math.round(u.width)),ie=Math.max(1,Math.round(u.height)),j=$.current,G=b.current?Dt(b.current):null,{width:ce,height:Ce}=mo(j,G?.width,G?.height,s,ie),ue=Math.max(1,Math.round(s*Math.max(1,r))),te=Math.max(1,Math.round(ie*Math.max(1,r))),xe=Math.max(1,Math.round(Math.max(1,ce)*Math.max(1,r))),Re=Math.max(1,Math.round(Math.max(1,Ce)*Math.max(1,r))),P=Pt(j),W=j.isFilterEnabled&&P?Math.max(ue,xe):ue,K=j.isFilterEnabled&&P?Math.max(te,Re):te;f.canvas.width!==W&&(f.canvas.width=W),f.canvas.height!==K&&(f.canvas.height=K),f.canvas.style.position="absolute",f.canvas.style.left=`${Math.round(u.x)}px`,f.canvas.style.top=`${Math.round(u.y)}px`,f.canvas.style.width=`${s}px`,f.canvas.style.height=`${ie}px`,f.canvas.style.imageRendering="pixelated",N()},[ge,N,r]),M=a.useCallback(()=>{X.current!==null&&(window.cancelAnimationFrame(X.current),X.current=null),_.current!==null&&(window.clearTimeout(_.current),_.current=null),X.current=window.requestAnimationFrame(()=>{X.current=null,se()}),_.current=window.setTimeout(()=>{_.current=null,se()},120)},[se]),A=a.useCallback(async()=>{if(!m.current){if(C.current){await C.current;return}C.current=(async()=>{const f=d.current;if(!f||m.current)return;const V=typeof performance<"u"?performance.now():Date.now();i("startup:initPixi:start",{hostConnected:f.isConnected,hostWidth:f.clientWidth??null,hostHeight:f.clientHeight??null,resolution:r});const u=document.createElement("canvas");u.style.display="block",u.style.width="100%",u.style.height="100%",u.style.imageRendering="pixelated",u.style.background="#020617";const s=u.getContext("webgl2");if(!s)throw new Error("WebGL2 is not available in this app view.");i("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10});const ie={canvas:u,pipeline:new nr(s),ticker:{start:ve,stop:fe}},j=d.current;if(!j||j!==f||!j.isConnected)return;j.style.position="relative",j.appendChild(u),m.current=ie,F.current={},y(!0),i("initWebGL:ready",{hostWidth:j.clientWidth??null,hostHeight:j.clientHeight??null,resolution:r}),i("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10}),se();const G=h.current==="video"||h.current==="capture"||h.current==="image"||o.current;n&&G&&ve(),i("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10,shouldAnimateOnInit:G})})();try{await C.current}finally{C.current=null}}},[i,n,se,r,ve,fe]),U=a.useCallback(()=>{C.current=null,fe(),X.current!==null&&(window.cancelAnimationFrame(X.current),X.current=null),_.current!==null&&(window.clearTimeout(_.current),_.current=null);const f=m.current;f&&(f.pipeline.dispose(),f.canvas.remove()),m.current=null,F.current=null,Q(null),y(!1)},[fe,Q]);return a.useEffect(()=>{const f=d.current;if(!f)return;if(typeof ResizeObserver<"u"){const u=new ResizeObserver(()=>{M()});return u.observe(f),()=>{u.disconnect()}}const V=()=>{M()};return window.addEventListener("resize",V),()=>{window.removeEventListener("resize",V)}},[M]),{canvasHostRef:d,appRef:m,spriteRef:D,textureRef:E,previewElementRef:b,filterRef:F,isRendererReady:ae,viewportRect:w,setViewportRect:Q,applyFilterState:Ae,createVideoTexture:f=>null,destroyPixi:U,fitCurrentSprite:ge,fitSprite:z,initPixi:A,refreshLayout:se,resetFilterInstance:B,safeRender:re,scheduleRefreshLayout:M,syncSpriteFilter:Y,syncTexturePresentation:x}}const ir=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),sr=()=>typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function ar({appRef:t,spriteRef:e,textureRef:r,previewElementRef:n,mediaRef:o,objectUrlRef:h,streamRef:i,streamOwnedRef:d,previewRequestIdRef:m,isPlayingRef:D,previewKindRef:E,audioContextRef:b,mediaSourceRef:F,masterGainRef:C,noiseGainRef:H,isMutedRef:J,volumeRef:$,playbackRateRef:ee,isLoopingRef:Z,isAudioFxEnabled:X,lofiAmount:_,bitCrushAmount:T,sampleRateReductionAmount:ae,bassAmount:y,midAmount:w,trebleAmount:q,stereoWidthAmount:Q,smallSpeakerRoomAmount:N,isMuted:fe,volume:ve,previewKind:Ae,setPreviewName:Y,setPreviewError:x,setNeedsUserPlay:B,setIsPlaying:z,setCurrentTime:ge,setDuration:re,setPlaybackRate:se,setIsLooping:M,setSourceDimensions:A,setViewportRect:U,setPreviewKindState:f,setIsPoweredOn:V,beginLoading:u,finishLoading:s,ensureAudioContext:ie,updateAudioNodes:j,connectMediaAudio:G,fitSprite:ce,refreshLayout:Ce,scheduleRefreshLayout:ue,safeRender:te,resetFilterInstance:xe,initPixi:Re,resetPerfAccumulators:P,debugVideo:W,debugAudio:K}){const Pe=async()=>{ir()&&await new Promise(l=>{window.setTimeout(l,220)})},Se=()=>{const l=b.current?.currentTime;if(H.current)if(typeof l=="number"){const L=H.current.gain;L.cancelScheduledValues(l),L.setValueAtTime(L.value,l),L.linearRampToValueAtTime(0,l+.03)}else H.current.gain.value=0;if(C.current)if(typeof l=="number"){const L=C.current.gain;L.cancelScheduledValues(l),L.setValueAtTime(L.value,l),L.linearRampToValueAtTime(0,l+.03)}else C.current.gain.value=0},Fe=()=>{H.current&&(H.current.gain.value=0)},ke=l=>l instanceof DOMException&&(l.name==="NotAllowedError"||l.name==="AbortError")?!0:l instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(l.message):!1,Ee=l=>ke(l)?(s(),x(""),B(!0),be(),te(),!0):!1,ye=(l,L,k=!0)=>{Se(),l.muted=!0,l.volume=0,l.pause(),l.srcObject instanceof MediaStream&&(k&&l.srcObject.getTracks().forEach(oe=>oe.stop()),l.srcObject=null),l.src="",l.load(),L?.startsWith("blob:")&&URL.revokeObjectURL(L)},Ye=l=>new Promise((L,k)=>{const oe=le=>le?le.code===MediaError.MEDIA_ERR_ABORTED?"aborted":le.code===MediaError.MEDIA_ERR_NETWORK?"network":le.code===MediaError.MEDIA_ERR_DECODE?"decode":le.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${le.code}`:"unknown",g=()=>{l.removeEventListener("loadeddata",S),l.removeEventListener("canplay",S),l.removeEventListener("error",Te)},S=()=>{g(),L()},Te=()=>{g(),k(new Error(`動画の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${oe(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){L();return}l.addEventListener("loadeddata",S,{once:!0}),l.addEventListener("canplay",S,{once:!0}),l.addEventListener("error",Te,{once:!0}),l.load()}),We=l=>new Promise((L,k)=>{const oe=le=>le?le.code===MediaError.MEDIA_ERR_ABORTED?"aborted":le.code===MediaError.MEDIA_ERR_NETWORK?"network":le.code===MediaError.MEDIA_ERR_DECODE?"decode":le.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${le.code}`:"unknown",g=()=>{l.removeEventListener("loadedmetadata",S),l.removeEventListener("canplay",S),l.removeEventListener("error",Te)},S=()=>{g(),L()},Te=()=>{g(),k(new Error(`音声の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${oe(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_METADATA){L();return}l.addEventListener("loadedmetadata",S,{once:!0}),l.addEventListener("canplay",S,{once:!0}),l.addEventListener("error",Te,{once:!0}),l.load()}),Qe=l=>new Promise((L,k)=>{const oe=()=>{l.removeEventListener("load",g),l.removeEventListener("error",S)},g=()=>{oe(),L()},S=()=>{oe(),k(new Error("画像の読み込みに失敗しました。"))};if(l.complete&&l.naturalWidth>0&&l.naturalHeight>0){L();return}l.addEventListener("load",g,{once:!0}),l.addEventListener("error",S,{once:!0})}),Be=l=>{l.addEventListener("play",be),l.addEventListener("pause",be),l.addEventListener("pause",Se),l.addEventListener("abort",Se),l.addEventListener("emptied",Se),l.addEventListener("loadstart",Se),l.addEventListener("seeking",Se),l.addEventListener("stalled",Se),l.addEventListener("suspend",Se),l.addEventListener("waiting",Se),l.addEventListener("volumechange",be),l.addEventListener("timeupdate",be),l.addEventListener("durationchange",be),l.addEventListener("seeked",be),l.addEventListener("ended",be),l.addEventListener("ratechange",be),l instanceof HTMLVideoElement&&l.addEventListener("resize",()=>{const L=l.videoWidth,k=l.videoHeight;L>0&&k>0&&(A({width:L,height:k}),ue())})},je=l=>{l.loop=Z.current,l.muted=J.current,l.volume=J.current?0:$.current,l.playbackRate=ee.current,l.autoplay=!1,l.preload="auto",l.crossOrigin="anonymous",l instanceof HTMLVideoElement&&(l.playsInline=!0)},be=()=>{if(!o.current){W("syncVideoState:no-media",{previewKind:E.current,hasPreviewElement:!!n.current}),D.current=!1,z(!1),ge(0),re(0),j(),te();return}D.current=!o.current.paused,z(!o.current.paused),o.current.paused||s(),ge(o.current.currentTime),re(o.current.duration||0),se(o.current.playbackRate||1),M(o.current.loop),j(),te()},Le=()=>{W("cleanupPreview:start",{previewKind:E.current,hasMedia:!!o.current,hasPreviewElement:!!n.current}),Se(),m.current+=1,s();const l=o.current,L=i.current,k=d.current;e.current=null,r.current=null,o.current=null,n.current=null,i.current=null,d.current=!1,F.current?.disconnect(),F.current=null,B(!1),D.current=!1,z(!1),ge(0),re(0),f(null),A(null),U(null),h.current?.startsWith("blob:")&&URL.revokeObjectURL(h.current),h.current=null,l?ye(l,void 0,k):k&&L?.getTracks().forEach(oe=>oe.stop()),te()},_e=()=>{o.current&&(o.current.muted=!0,o.current.volume=0,o.current.pause()),Se(),Le(),b.current?.state==="running"&&b.current.suspend()},Ke=()=>{V(!0),t.current?.ticker.start();try{P?.()}catch{}},Ie=async()=>{if(o.current)try{await ie(),sr()&&F.current?(o.current.muted=!1,o.current.volume=0):(o.current.muted=J.current,o.current.volume=J.current?0:$.current),await o.current.play(),D.current=!0,z(!0),x(""),B(!1),K("playVideoWithAudio",{audioContextState:b.current?.state,currentTime:o.current.currentTime,isAudioFxEnabled:X,lofiAmount:_,bitCrushAmount:T,sampleRateReductionAmount:ae,bassAmount:y,midAmount:w,trebleAmount:q,stereoWidthAmount:Q,smallSpeakerRoomAmount:N,isMuted:fe,volume:ve}),j(),be(),te(),ue(),window.requestAnimationFrame(j)}catch(l){if(s(),ke(l)){B(!0),x("");return}B(!1),x(l instanceof Error?l.message:"音声付き再生を開始できませんでした。")}},Me=async()=>{if(await Re(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},De=async(l,L)=>{const k=await Me();n.current=l,ce(k,null,l),f(L),A(l instanceof HTMLVideoElement?{width:l.videoWidth,height:l.videoHeight}:{width:l.naturalWidth,height:l.naturalHeight}),te(),Ce(),ue(),t.current?.ticker.start()},Ze=async l=>{const L=l.type.startsWith("video/"),k=l.type.startsWith("audio/"),oe=l.type.startsWith("image/");if(!L&&!k&&!oe){x("動画、音声、または画像ファイルを選んでください。");return}Ke(),Le(),xe();const g=m.current;x(""),Y(l.name),u(L?"Loading video preview...":k?"Loading audio preview...":"Loading image preview...");let S=null;try{if(await Me(),S=URL.createObjectURL(l),h.current=S,L||k){const le=L?document.createElement("video"):document.createElement("audio");if(le.src=S,je(le),Be(le),le instanceof HTMLVideoElement?await Ye(le):await We(le),g!==m.current){ye(le,S);return}o.current=le,le instanceof HTMLVideoElement?await De(le,"video"):(n.current=null,f("audio"),A(null),U(null),te()),await G(le),be(),await Pe(),await Ie(),g===m.current&&s();return}const Te=new Image;if(Te.src=S,Te.crossOrigin="anonymous",await Qe(Te),g!==m.current){S.startsWith("blob:")&&URL.revokeObjectURL(S);return}o.current=null,Fe(),j(),await De(Te,"image"),be(),g===m.current&&s()}catch(Te){if(g!==m.current){S?.startsWith("blob:")&&URL.revokeObjectURL(S);return}if(ke(Te)){Ee(Te);return}Le(),x(Te instanceof Error?Te.message:"動画プレビューに失敗しました。"),B(!1)}},qe=async()=>{if(Ke(),!navigator.mediaDevices?.getDisplayMedia){x("このブラウザでは画面キャプチャーに対応していません。");return}Le();const l=m.current;x(""),Y("Display Capture"),u("Preparing display capture...");try{await Me();const L=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(l!==m.current){L.getTracks().forEach(oe=>oe.stop());return}const k=document.createElement("video");k.srcObject=L,je(k),Be(k),L.getVideoTracks()[0]?.addEventListener("ended",()=>{He()}),await Ye(k),i.current=L,d.current=!0,o.current=k,await De(k,"capture"),await G(k),B(!1),await Pe(),await Ie(),l===m.current&&s()}catch(L){if(l!==m.current||Ee(L))return;Le(),x(L instanceof Error?L.message:"画面キャプチャーを開始できませんでした。")}},He=()=>{Ae==="capture"&&(Le(),Y(""),x(""))};return{cleanupPreview:Le,cleanupForPageLeave:_e,playVideoWithAudio:Ie,previewFile:Ze,previewStream:async(l,L="video",k="Media Stream")=>{let oe=0;try{if(Ke(),Le(),xe(),oe=m.current,x(""),Y(k),u(L==="video"?"Loading stream preview...":"Loading stream audio..."),await Me(),L==="video"){const g=document.createElement("video");if(g.srcObject=l,je(g),Be(g),await Ye(g),oe!==m.current){ye(g,void 0,!1);return}i.current=l,d.current=!1,o.current=g,await De(g,"capture"),await G(g)}else{const g=document.createElement("audio");if(g.srcObject=l,je(g),Be(g),await We(g),oe!==m.current){ye(g,void 0,!1);return}i.current=l,d.current=!1,o.current=g,n.current=null,f("audio"),A(null),U(null),te(),await G(g),be()}if(oe!==m.current)return;await Pe(),await Ie(),oe===m.current&&s()}catch(g){if(oe!==m.current||Ee(g))return;Le(),x(g instanceof Error?g.message:String(g))}},previewUrl:async(l,L="video")=>{let k=0;const oe=typeof performance<"u"?performance.now():Date.now(),g=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-oe)*10)/10;try{if(W("startup:previewUrl:start",{url:l,kind:L}),Ke(),Le(),xe(),k=m.current,x(""),Y(l),u(L==="video"?"Loading video preview...":L==="image"?"Loading image preview...":"Loading audio preview..."),await Me(),W("startup:previewUrl:renderer-ready",{kind:L,elapsedMs:g()}),L==="video"){const S=document.createElement("video");if(S.src=l,je(S),Be(S),await Ye(S),W("startup:previewUrl:video-ready",{elapsedMs:g(),readyState:S.readyState,videoWidth:S.videoWidth,videoHeight:S.videoHeight}),k!==m.current){ye(S,l);return}o.current=S,await De(S,"video"),await G(S),be()}else if(L==="image"){const S=new Image;if(S.src=l,S.crossOrigin="anonymous",await Qe(S),W("startup:previewUrl:image-ready",{elapsedMs:g(),naturalWidth:S.naturalWidth,naturalHeight:S.naturalHeight}),k!==m.current)return;o.current=null,Fe(),j(),await De(S,"image"),be()}else{const S=document.createElement("audio");if(S.src=l,je(S),Be(S),await We(S),W("startup:previewUrl:audio-ready",{elapsedMs:g(),readyState:S.readyState,duration:S.duration}),k!==m.current){ye(S,l);return}n.current=null,f("audio"),A(null),U(null),o.current=S,te(),await G(S),be()}if(k!==m.current)return;(L==="video"||L==="audio")&&(await Pe(),await Ie()),k===m.current&&(s(),W("startup:previewUrl:done",{kind:L,elapsedMs:g()}))}catch(S){if(W("startup:previewUrl:error",{kind:L,elapsedMs:g(),error:S instanceof Error?S.message:String(S)}),k!==m.current||Ee(S))return;Le(),x(S instanceof Error?S.message:String(S))}},startDisplayCapture:qe,stopDisplayCapture:He,syncVideoState:be,releaseDetachedMedia:ye,ensurePixiReady:Me}}let lr=0;const Po=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),ko=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),cr=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function ur(t,e,r=1){const n=a.useRef(`player-${lr+=1}`),o=a.useRef(null),h=a.useRef(null),i=a.useRef(!1),d=a.useRef(null),m=a.useRef(null),D=a.useRef([]),E=a.useRef(null),b=a.useRef(null),F=a.useRef(null),C=a.useRef(null),H=a.useRef(null),J=a.useRef(0),$=a.useRef(!1),ee=a.useRef(null),Z=a.useRef(!1),X=a.useRef(!1),[_,T]=a.useState(""),[ae,y]=a.useState(""),[w,q]=a.useState(!0),[Q,N]=a.useState(""),[fe,ve]=a.useState(!1),[Ae,Y]=a.useState(!1),[x,B]=a.useState(!1),[z,ge]=a.useState(0),[re,se]=a.useState(0),[M,A]=a.useState(null),[U,f]=a.useState(null),[V,u]=a.useState(!1),[s,ie]=a.useState(null),j=(v,R)=>{if(!cr())return;const O=R?` ${JSON.stringify(R)}`:"";console.log(`[retro-player video][${n.current}] ${v}${O}`)},G=(v,R,O="info")=>{const pe=d.current,we={audioContextState:Me.current?.state??null,currentSrc:pe?.currentSrc||pe?.src||null,currentTime:pe?.currentTime??null,ended:pe?.ended??null,hasMedia:!!pe,hasMediaSource:!!De.current,isPoweredOn:w,mediaMuted:pe?.muted??null,mediaPaused:pe?.paused??null,mediaReadyState:pe?.readyState??null,mediaVolume:pe?.volume??null,previewKind:ee.current,visibilityState:typeof document>"u"?null:document.visibilityState,...R};if(O==="warn"){console.warn(`[retro-player audio recovery][${n.current}] ${v}`,we);return}console.info(`[retro-player audio recovery][${n.current}] ${v}`,we)},ce=rr({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:w,isPlayingRef:$,previewKindRef:ee,debugVideo:j}),{canvasHostRef:Ce,appRef:ue,spriteRef:te,textureRef:xe,previewElementRef:Re,filterRef:P,isRendererReady:W,viewportRect:K,setViewportRect:Pe,applyFilterState:Se,destroyPixi:Fe,fitSprite:ke,initPixi:Ee,refreshLayout:ye,resetFilterInstance:Ye,safeRender:We,scheduleRefreshLayout:Qe,syncSpriteFilter:Be,syncTexturePresentation:je}=ce,be=a.useRef(Ee),Le=a.useRef(Fe),_e=a.useRef(()=>{}),Ke=a.useRef(()=>{}),Ie=Zn({instanceLabel:n.current,previewKind:M,previewKindRef:ee,mediaRef:d,isPlaying:x,isPlayingRef:$}),{audioContextRef:Me,mediaSourceRef:De,masterGainRef:Ze,recordingDestinationRef:qe,noiseGainRef:He,isMutedRef:Xe,volumeRef:et,playbackRateRef:l,isLoopingRef:L,isMuted:k,setIsMuted:oe,playbackRate:g,setPlaybackRate:S,volume:Te,setVolume:le,isLooping:kt,setIsLooping:rt,isAudioFxEnabled:ct,setIsAudioFxEnabled:It,lofiAmount:ut,setLofiAmount:Ft,radioToneAmount:Gt,setRadioToneAmount:Nt,bitCrushAmount:dt,setBitCrushAmount:Wt,sampleRateReductionAmount:ht,setSampleRateReductionAmount:Ht,noiseReductionAmount:Ut,setNoiseReductionAmount:Ot,bassAmount:mt,setBassAmount:zt,midAmount:gt,setMidAmount:Vt,trebleAmount:pt,setTrebleAmount:jt,stereoWidthAmount:ft,setStereoWidthAmount:_t,smallSpeakerRoomAmount:vt,setSmallSpeakerRoomAmount:Zt,wowFlutterAmount:Xt,setWowFlutterAmount:Kt,isNoiseEnabled:qt,setIsNoiseEnabled:Yt,noiseLevel:Jt,setNoiseLevel:Qt,vinylDustAmount:$t,setVinylDustAmount:eo,delayAmount:to,setDelayAmount:Ge,reverbAmount:it,setReverbAmount:oo,chorusAmount:$e,setChorusAmount:no,tapeSaturationAmount:ro,setTapeSaturationAmount:bt,compressorAmount:io,setCompressorAmount:so,fxOutputTrimAmount:At,setFxOutputTrimAmount:xt,debugAudio:wt,ensureAudioContext:tt,ensureAudioContextWithRecovery:Ct,updateAudioNodes:ot,connectMediaAudio:St,reconnectCurrentMediaAudio:yt,rebuildAudioGraphForCurrentMedia:ao,applyAudioSettings:c,resetAudioSettings:de,disposeAudioEngine:Ne}=Ie;a.useEffect(()=>{be.current=Ee,Le.current=Fe},[Ee,Fe]);const Ue=v=>{ee.current=v,A(v)},st=v=>{N(v),ve(!0)},Oe=()=>{ve(!1),N("")},nt=async v=>{const R=await Ct(v);if(!R)return G(`${v}:no-audio-context`,void 0,"warn"),null;const O=d.current;try{return O&&(De.current?(yt(),G(`${v}:reconnected-media-source`,{audioContextState:R.state})):(await St(O),G(`${v}:connected-media-source`,{audioContextState:R.state}))),ot(),R}catch(pe){G(`${v}:reconnect-failed-rebuilding`,{error:pe instanceof Error?pe.message:String(pe)},"warn");const we=await ao(`${v}:rebuild`);return we?(G(`${v}:rebuild-complete`,{audioContextState:we.state}),we):(G(`${v}:rebuild-returned-null`,void 0,"warn"),null)}},fo=()=>{q(!0),ue.current?.ticker.start(),(async()=>{const v=X.current&&!!d.current;G("powerOn:start",{shouldResumePlayback:v});try{if(!await nt("powerOn"))return;if(v&&d.current)try{await d.current.play(),Y(!1)}catch(O){O instanceof DOMException&&O.name==="NotAllowedError"&&Y(!0),G("powerOn:play-failed",{error:O instanceof Error?O.message:String(O)},"warn")}}catch(R){G("powerOn:recover-failed",{error:R instanceof Error?R.message:String(R)},"warn")}finally{Je(),X.current=!1,G("powerOn:done",{shouldResumePlayback:v})}})()},Uo=()=>{X.current=!!(d.current&&!d.current.paused),G("powerOff",{wasPlayingBeforePowerOff:X.current}),d.current&&d.current.pause(),He.current&&(He.current.gain.value=0),Ze.current&&(Ze.current.gain.value=0),Oe(),Y(!1),q(!1),ue.current?.ticker.stop(),Je()},Oo=ar({filterState:t,appRef:ue,spriteRef:te,textureRef:xe,previewElementRef:Re,filterRef:P,mediaRef:d,objectUrlRef:o,streamRef:h,streamOwnedRef:i,previewRequestIdRef:J,isPlayingRef:$,previewKindRef:ee,audioContextRef:Me,mediaSourceRef:De,masterGainRef:Ze,noiseGainRef:He,isMutedRef:Xe,volumeRef:et,playbackRateRef:l,isLoopingRef:L,isAudioFxEnabled:ct,lofiAmount:ut,bitCrushAmount:dt,sampleRateReductionAmount:ht,bassAmount:mt,midAmount:gt,trebleAmount:pt,stereoWidthAmount:ft,smallSpeakerRoomAmount:vt,isMuted:k,volume:Te,previewKind:M,setPreviewName:T,setPreviewError:y,setNeedsUserPlay:Y,setIsPlaying:B,setCurrentTime:ge,setDuration:se,setPlaybackRate:S,setIsLooping:rt,setSourceDimensions:f,setViewportRect:Pe,setPreviewKindState:Ue,setIsPoweredOn:q,beginLoading:st,finishLoading:Oe,ensureAudioContext:tt,updateAudioNodes:ot,connectMediaAudio:St,fitSprite:ke,refreshLayout:ye,scheduleRefreshLayout:Qe,safeRender:We,resetFilterInstance:Ye,initPixi:Ee,debugVideo:j,debugAudio:wt}),{cleanupPreview:vo,cleanupForPageLeave:zo,playVideoWithAudio:bo,previewFile:Vo,previewStream:jo,previewUrl:_o,startDisplayCapture:Zo,stopDisplayCapture:Xo,syncVideoState:Je}=Oo;a.useEffect(()=>{_e.current=vo},[vo]),a.useEffect(()=>{Ke.current=Ne},[Ne]);const Ao=async()=>{if(d.current){if(d.current.paused){w||fo(),await bo(),Je();return}d.current.pause(),Je()}},Ko=()=>{d.current&&oe(v=>{const R=!v;return Xe.current=R,window.requestAnimationFrame(ot),R})},at=v=>{d.current&&(d.current.currentTime=v,ge(v))},qo=v=>{if(!d.current)return;const R=1/30,O=Math.max(0,Math.min(d.current.currentTime+R*v,d.current.duration||d.current.currentTime+R));d.current.pause(),d.current.currentTime=O,Je()},Yo=v=>{d.current&&(d.current.playbackRate=v,l.current=v,S(v))},Jo=v=>{d.current&&(et.current=v,Xe.current=v===0,le(v),oe(v===0),window.requestAnimationFrame(ot))},Qo=()=>{d.current&&(d.current.loop=!d.current.loop,L.current=d.current.loop,rt(d.current.loop))},$o=v=>{L.current=v,rt(v),d.current&&(d.current.loop=v)},Rt=()=>{if(!b.current||typeof window>"u"){F.current=null,C.current=null;return}window.URL.revokeObjectURL(b.current),b.current=null,F.current=null,C.current=null},en=(v,R)=>{if(typeof document>"u")return;const O=document.createElement("a");O.href=v,O.download=R,O.rel="noopener",O.style.display="none",document.body.appendChild(O),O.click(),window.setTimeout(()=>{O.remove()},0)},tn=(v,R)=>{if(typeof window>"u"||v.length===0)return null;Rt();const O=new Blob(v,{type:R||"video/webm"}),we=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,ze=window.URL.createObjectURL(O);return b.current=ze,F.current=O,C.current=we,ie(we),we},on=()=>{const v=b.current,R=C.current;!v||!R||typeof window>"u"||(en(v,R),window.setTimeout(()=>{Rt()},1e3),ie(null))},nn=async()=>{const v=F.current,R=C.current;if(!v||!R||typeof window>"u")return!1;if(Po()){const we=new Uint8Array(await v.arrayBuffer()),ze=await Wo("persist_recording_for_share",{data:Array.from(we),filename:R});return await Bn(ze,{mimeType:v.type||"video/webm",title:R}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const pe={files:[new File([v],R,{type:v.type||"video/webm"})],title:R};return typeof navigator.canShare=="function"&&!navigator.canShare(pe)?!1:(await navigator.share(pe),!0)},rn=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(R=>MediaRecorder.isTypeSupported(R))??"",sn=async()=>{const v=ue.current?.canvas;if(!(v instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await tt();const R=new MediaStream;v.captureStream(30).getVideoTracks().forEach(ze=>R.addTrack(ze)),qe.current?.stream.getAudioTracks().forEach(ze=>R.addTrack(ze.clone()));const pe=rn(),we=pe?new MediaRecorder(R,{mimeType:pe}):new MediaRecorder(R);D.current=[],Rt(),ie(null),E.current=R,m.current=we,we.addEventListener("dataavailable",ze=>{ze.data.size>0&&D.current.push(ze.data)}),we.addEventListener("stop",()=>{const ze=tn(D.current,we.mimeType);D.current=[],E.current?.getTracks().forEach(an=>an.stop()),E.current=null,m.current=null,u(!1),tt(),H.current?.(ze),H.current=null},{once:!0}),we.start(),u(!0)},xo=(v=!0)=>{const R=m.current;return R?new Promise(O=>{if(H.current=O,v||(D.current=[]),R.state!=="inactive"){R.stop();return}E.current?.getTracks().forEach(pe=>pe.stop()),E.current=null,m.current=null,u(!1),H.current?.(C.current),H.current=null}):Promise.resolve(C.current)};return a.useEffect(()=>{let v=!1;return(async()=>(j("startup:setupPixi-effect:start",{renderResolutionScale:r}),await be.current(),v&&Le.current()))(),()=>{Rt(),xo(!1),v=!0,Le.current()}},[r]),a.useEffect(()=>()=>{_e.current(),Ke.current()},[]),a.useEffect(()=>{const v=()=>{zo()};return window.addEventListener("beforeunload",v),()=>{window.removeEventListener("beforeunload",v)}},[]),a.useEffect(()=>{const v=()=>{d.current&&(d.current.muted=!0,d.current.volume=0,d.current.pause(),Je())};return window.addEventListener(wo,v),()=>{window.removeEventListener(wo,v)}},[Je]),a.useEffect(()=>{if(!ko())return;const v=O=>O==="video"||O==="audio"||O==="capture",R=()=>{const O=d.current;if(!(!O||!v(ee.current))){if(document.visibilityState==="hidden"){Z.current=!O.paused,O.pause(),$.current=!1,B(!1),G("visibility:hidden",{wasPlayingBeforeBackground:Z.current}),He.current&&(He.current.gain.value=0),Ze.current&&(Ze.current.gain.value=0),Me.current?.state==="running"&&Me.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(G("visibility:visible:start",{wasPlayingBeforeBackground:Z.current}),!await nt("visibility:visible"))return;if(Z.current&&d.current)try{await d.current.play(),Y(!1)}catch(we){we instanceof DOMException&&we.name==="NotAllowedError"&&Y(!0),G("visibility:visible:play-failed",{error:we instanceof Error?we.message:String(we)},"warn")}}catch(pe){G("visibility:visible:recover-failed",{error:pe instanceof Error?pe.message:String(pe)},"warn")}finally{Je(),Z.current=!1,G("visibility:visible:done")}})()},80)}};return document.addEventListener("visibilitychange",R),()=>{document.removeEventListener("visibilitychange",R)}},[Me,Ct,Ze,He,De,nt,Je]),a.useLayoutEffect(()=>{Se(),Be(),je(),ye()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,ye]),a.useEffect(()=>{if(ae||Ae){Oe();return}if(M==="image"||M==="audio"){Oe();return}x&&Oe()},[ae,Ae,M,x]),a.useEffect(()=>{$.current=x;const v=(M==="video"||M==="capture")&&d.current?.tagName==="VIDEO",R=!d.current||Math.abs(d.current.currentTime)<.05,O=d.current?.ended??!1;v&&Oe(),v&&!x&&!ae&&!O&&(Me.current?.state==="suspended"||R)&&Y(!0)},[Me,x,ae,M]),a.useEffect(()=>{const v=R=>{if(!d.current)return;const O=R.target;if(!(O instanceof HTMLInputElement||O instanceof HTMLTextAreaElement||O?.isContentEditable)){if(R.code==="Space"||R.code==="KeyK"){R.preventDefault(),Ao();return}if(R.code==="KeyJ"){R.preventDefault(),at(Math.max(d.current.currentTime-10,0));return}if(R.code==="KeyL"){R.preventDefault(),at(Math.min(d.current.currentTime+10,d.current.duration||d.current.currentTime+10));return}if(R.code==="ArrowLeft"){R.preventDefault(),at(Math.max(d.current.currentTime-5,0));return}R.code==="ArrowRight"&&(R.preventDefault(),at(Math.min(d.current.currentTime+5,d.current.duration||d.current.currentTime+5)))}};return window.addEventListener("keydown",v),()=>{window.removeEventListener("keydown",v)}},[]),{canvasHostRef:Ce,previewName:_,previewError:ae,isRendererReady:W,loadingLabel:Q,isLoading:fe,needsUserPlay:Ae,isPlaying:x,isMuted:k,currentTime:z,duration:re,playbackRate:g,volume:Te,isLooping:kt,sourceDimensions:U,viewportRect:K,isAudioFxEnabled:ct,lofiAmount:ut,radioToneAmount:Gt,bitCrushAmount:dt,sampleRateReductionAmount:ht,noiseReductionAmount:Ut,bassAmount:mt,midAmount:gt,trebleAmount:pt,stereoWidthAmount:ft,smallSpeakerRoomAmount:vt,wowFlutterAmount:Xt,isNoiseEnabled:qt,noiseLevel:Jt,vinylDustAmount:$t,delayAmount:to,reverbAmount:it,chorusAmount:$e,tapeSaturationAmount:ro,setTapeSaturationAmount:bt,compressorAmount:io,setCompressorAmount:so,fxOutputTrimAmount:At,setFxOutputTrimAmount:xt,hasPlayableMedia:M==="video"||M==="audio"||M==="capture",hasVideo:M==="video"||M==="capture",hasAudioOnly:M==="audio",hasImage:M==="image",isRecording:V,pendingRecordingFilename:s,prefersShareExport:Po()&&ko(),isCaptureActive:M==="capture",canRecord:M==="video"||M==="capture"||M==="image"||M==="audio",previewFile:Vo,previewStream:jo,previewUrl:_o,startDisplayCapture:Zo,stopDisplayCapture:Xo,togglePlayback:Ao,toggleMute:Ko,seekTo:at,stepFrame:qo,changePlaybackRate:Yo,changeVolume:Jo,toggleLoop:Qo,setLoopingEnabled:$o,applyAudioSettings:c,resetAudioSettings:de,playVideoWithAudio:bo,isPoweredOn:w,powerOn:fo,powerOff:Uo,downloadPendingRecording:on,sharePendingRecording:nn,startRecording:sn,stopRecording:xo,ensureAudioContext:tt,refreshLayout:ye,toggleAudioFx:()=>{It(v=>!v)},setLofiAmount:Ft,setRadioToneAmount:Nt,setBitCrushAmount:Wt,setSampleRateReductionAmount:Ht,setNoiseReductionAmount:Ot,setBassAmount:zt,setMidAmount:Vt,setTrebleAmount:jt,setStereoWidthAmount:_t,setSmallSpeakerRoomAmount:Zt,setWowFlutterAmount:Kt,toggleNoise:()=>{Yt(v=>!v)},setNoiseLevel:Qt,setVinylDustAmount:eo,setDelayAmount:Ge,setReverbAmount:oo,setChorusAmount:no}}const he=lt.tetorica,Io=(t,e,r)=>((r?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&(e.animeEdgeLow??.08)===t.animeEdgeLow&&(e.animeEdgeHigh??.55)===t.animeEdgeHigh&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,Lt=t=>{for(const[e,r]of Object.entries(lt))if(Io(t,r))return e;if(!t.matchTargetAspect)return null;for(const[e,r]of Object.entries(lt))if(Io(t,r,{ignoreDimensions:!0}))return e;return null},dr=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function hr(t={}){const[e]=a.useState(()=>({targetWidth:t.targetWidth??he.width,targetHeight:t.targetHeight??he.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??he.colors,ditherStrength:t.ditherStrength??he.dither,paletteMode:t.paletteMode??he.palette,curvature:t.curvature??he.curvature,scanlineStrength:t.scanlineStrength??he.scanline,scanline2Strength:t.scanline2Strength??he.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??he.vignette,glowStrength:t.glowStrength??he.glow,smoothStrength:t.smoothStrength??he.smoothStrength??0,toonSteps:t.toonSteps??he.toonSteps,edgeBoost:t.edgeBoost??he.edgeBoost,animeEdgeLow:t.animeEdgeLow??he.animeEdgeLow,animeEdgeHigh:t.animeEdgeHigh??he.animeEdgeHigh,phosphorStrength:t.phosphorStrength??he.phosphor,spotMaskStrength:t.spotMaskStrength??he.spotMask,bulbRadius:t.bulbRadius??he.bulbRadius,blackFloor:t.blackFloor??he.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??he.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??he.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??he.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??he.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??he.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??he.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??he.monoTint,neonBoost:t.neonBoost??he.neonBoost,neonSaturation:t.neonSaturation??he.neonSaturation,neonDetail:t.neonDetail??he.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[r]=a.useState(()=>({...e,...Bt()?.filter,...t})),[n,o]=a.useState(r),[h,i]=a.useState(Lt(r)),d=u=>{i(null),o(s=>s.targetWidth===u?s:{...s,targetWidth:u})},m=u=>{i(null),o(s=>s.targetHeight===u?s:{...s,targetHeight:u})},D=u=>{i(null),o(s=>s.matchTargetAspect===u?s:{...s,matchTargetAspect:u})},E=u=>{i(null),o(s=>({...s,colorLevels:u}))},b=u=>{i(null),o(s=>({...s,ditherStrength:u}))},F=u=>{i(null),o(s=>({...s,paletteMode:u,colorLevels:dr(u,s.colorLevels)}))},C=u=>{i(null),o(s=>({...s,curvature:u}))},H=u=>{i(null),o(s=>({...s,scanlineStrength:u}))},J=u=>{i(null),o(s=>({...s,scanline2Strength:u}))},$=u=>{i(null),o(s=>({...s,scanlineBrightnessFade:u}))},ee=u=>{i(null),o(s=>({...s,vignetteStrength:u}))},Z=u=>{i(null),o(s=>({...s,glowStrength:u}))},X=u=>{i(null),o(s=>({...s,smoothStrength:u}))},_=u=>{i(null),o(s=>({...s,toonSteps:u}))},T=u=>{i(null),o(s=>({...s,edgeBoost:u}))},ae=u=>{i(null),o(s=>({...s,animeEdgeLow:u}))},y=u=>{i(null),o(s=>({...s,animeEdgeHigh:u}))},w=u=>{i(null),o(s=>({...s,phosphorStrength:u}))},q=u=>{i(null),o(s=>({...s,spotMaskStrength:u}))},Q=u=>{i(null),o(s=>({...s,bulbRadius:u}))},N=u=>{i(null),o(s=>({...s,blackFloor:u}))},fe=u=>{i(null),o(s=>({...s,phosphorDotLightBalance:u}))},ve=u=>{i(null),o(s=>({...s,phosphorDotInternalScale:u}))},Ae=u=>{i(null),o(s=>({...s,phosphorDotBrightCore:u}))},Y=u=>{i(null),o(s=>({...s,phosphorDotCellFill:u}))},x=u=>{i(null),o(s=>({...s,phosphorDotFlatDisc:u}))},B=u=>{i(null),o(s=>({...s,phosphorDotNeighborBlend:u}))},z=u=>{i(null),o(s=>({...s,closeUpNoiseStrength:u}))},ge=u=>{i(null),o(s=>({...s,monoTint:u}))},re=u=>{i(null),o(s=>({...s,neonBoost:u}))},se=u=>{i(null),o(s=>({...s,neonSaturation:u}))},M=u=>{i(null),o(s=>({...s,neonDetail:u}))},A=u=>{o(s=>({...s,isFilterEnabled:u}))},U=u=>{const s=lt[u];i(u),o(ie=>({...ie,targetWidth:s.width,targetHeight:s.height,colorLevels:s.colors,ditherStrength:s.dither,paletteMode:s.palette,curvature:s.curvature,scanlineStrength:s.scanline,scanline2Strength:s.scanline2,vignetteStrength:s.vignette,glowStrength:s.glow,smoothStrength:s.smoothStrength??0,toonSteps:s.toonSteps??0,edgeBoost:s.edgeBoost??0,animeEdgeLow:s.animeEdgeLow??.08,animeEdgeHigh:s.animeEdgeHigh??.55,phosphorStrength:s.phosphor,spotMaskStrength:s.spotMask,bulbRadius:s.bulbRadius,blackFloor:s.blackFloor,phosphorDotLightBalance:s.phosphorDotLightBalance??1,phosphorDotInternalScale:s.phosphorDotInternalScale??!1,phosphorDotBrightCore:s.phosphorDotBrightCore??!1,phosphorDotCellFill:s.phosphorDotCellFill??0,phosphorDotFlatDisc:s.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:s.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:s.closeUpNoiseStrength??0,scanlineBrightnessFade:s.scanlineBrightnessFade??.6,monoTint:s.monoTint,neonBoost:s.neonBoost,neonSaturation:s.neonSaturation,neonDetail:s.neonDetail,isFilterEnabled:!0}))},f=u=>{i(Lt(u)),o(u)},V=()=>{i(Lt(e)),o(e)};return a.useEffect(()=>{const u=setTimeout(()=>{Pn(n)},300);return()=>clearTimeout(u)},[n]),a.useEffect(()=>{const u=Lt(n);i(s=>s===u?s:u)},[n]),{...n,selectedPreset:h,setTargetWidth:d,setTargetHeight:m,setMatchTargetAspect:D,setColorLevels:E,setDitherStrength:b,setPaletteMode:F,setCurvature:C,setScanlineStrength:H,setScanline2Strength:J,setScanlineBrightnessFade:$,setVignetteStrength:ee,setGlowStrength:Z,setSmoothStrength:X,setToonSteps:_,setEdgeBoost:T,setAnimeEdgeLow:ae,setAnimeEdgeHigh:y,setPhosphorStrength:w,setSpotMaskStrength:q,setBulbRadius:Q,setBlackFloor:N,setPhosphorDotLightBalance:fe,setPhosphorDotInternalScale:ve,setPhosphorDotBrightCore:Ae,setPhosphorDotCellFill:Y,setPhosphorDotFlatDisc:x,setPhosphorDotNeighborBlend:B,setCloseUpNoiseStrength:z,setMonoTint:ge,setNeonBoost:re,setNeonSaturation:se,setNeonDetail:M,setIsFilterEnabled:A,applyAllFilterSettings:f,applyPreset:U,resetSettings:V}}function mr({locale:t,src:e,kind:r,player:n,isHighResolution:o,isFitWidthEnabled:h,controlPanelMode:i,confirmDialog:d,onHighResolutionChange:m,onFitWidthChange:D,onError:E}){const b=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},F=I.useMemo(()=>Bt()?.ui,[]),[C,H]=I.useState(F?.isPreviewMaximized??!1),[J,$]=I.useState(!1),[ee,Z]=I.useState(!1),[X,_]=I.useState(0),[T,ae]=I.useState(null),[y,w]=I.useState(F?.brightness??1),[q,Q]=I.useState(F?.flipH??!1),[N,fe]=I.useState(F?.flipV??!1),[ve,Ae]=I.useState(!1),[Y,x]=I.useState(()=>typeof window<"u"&&window.innerWidth<360),[B,z]=I.useState(null),ge=I.useRef(null),re=I.useRef(null),se=I.useRef(null),M=I.useRef(null),A=I.useCallback(()=>{const P=ge.current,W=se.current;if(!P||!W)return null;const K=P.getBoundingClientRect(),Pe=W.getBoundingClientRect();return{left:K.left,width:K.width,height:Pe.height}},[]),U=I.useCallback(P=>{M.current!==null&&window.clearTimeout(M.current),M.current=window.setTimeout(()=>{ae(P),M.current=null},120)},[]),f=I.useCallback(()=>{M.current!==null&&(window.clearTimeout(M.current),M.current=null),ae(null)},[]);I.useEffect(()=>{In({isPreviewMaximized:C,isHighResolution:o,brightness:y,flipH:q,flipV:N})},[o,C,y,q,N]),I.useEffect(()=>()=>{M.current!==null&&window.clearTimeout(M.current)},[]),I.useEffect(()=>{const P=()=>{x(window.innerWidth<360)};return window.addEventListener("resize",P,{passive:!0}),()=>{window.removeEventListener("resize",P)}},[]),I.useEffect(()=>{if(!C)return;const P=document.body.style.overflow,W=K=>{K.code==="Escape"&&H(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",W),()=>{document.body.style.overflow=P,window.removeEventListener("keydown",W)}},[C]),I.useEffect(()=>{C&&($(!1),Z(!1),_(0),z(null))},[C]),I.useEffect(()=>{h&&($(!1),Z(!1),_(0),z(null))},[h]),I.useEffect(()=>{if(i==="playback"||C||J||h){Z(!1),_(0);return}const P=()=>{const W=re.current,K=se.current;if(!W||!K)return;const Pe=W.getBoundingClientRect().top,Se=K.getBoundingClientRect().height,Fe=Math.round(Math.min(Se,window.innerHeight)*.4),ke=-Math.max(120,Fe);Z(Ee=>{if(!Ee&&Pe<=ke){_(Math.max(120,Fe));const ye=A();return ye&&z(ye),!0}return Ee&&_(Math.max(120,Fe)),Ee&&Pe>=-24?(_(0),!1):Ee})};return P(),window.addEventListener("scroll",P,{passive:!0}),window.addEventListener("resize",P),()=>{window.removeEventListener("scroll",P),window.removeEventListener("resize",P)}},[i,h,C,J,A]),I.useEffect(()=>{if(!((J||ee)&&!C)){z(null);return}const W=()=>{const K=A();K&&z(K)};return W(),window.addEventListener("resize",W),window.addEventListener("scroll",W,{passive:!0}),()=>{window.removeEventListener("resize",W),window.removeEventListener("scroll",W)}},[ee,C,J,h,A,n.sourceDimensions]),I.useEffect(()=>{n.refreshLayout()},[J,C,n.refreshLayout,n.sourceDimensions?.height,n.sourceDimensions?.width]);const V=r==="image"&&!!e&&!n.previewError&&(!n.isRendererReady||n.isLoading),u="60vh",s=I.useMemo(()=>{if(n.sourceDimensions)return`${n.sourceDimensions.width} / ${n.sourceDimensions.height}`},[n.sourceDimensions]),ie=(J||ee)&&!C,j=ee?`calc(max(0.0rem, env(safe-area-inset-top)) - ${X}px)`:void 0,G="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",ce="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",Ce="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",ue="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",te=(P,W,K="w-44")=>p.jsx("div",{role:"tooltip","aria-hidden":T!==P,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",K,T===P?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:W}),xe=()=>{f(),(async()=>{if(n.isRecording){try{if(!await n.stopRecording())return;const W=await d({title:"Recording ready",body:n.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:n.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(n.ensureAudioContext(),!W)return;if(n.prefersShareExport){await n.sharePendingRecording()||n.downloadPendingRecording();return}n.downloadPendingRecording()}catch(P){E?.(P instanceof Error?P:new Error(String(P)))}return}try{await n.startRecording()}catch(P){E?.(P instanceof Error?P:new Error(String(P)))}})()},Re=()=>p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":"More options",onClick:()=>{f(),Ae(P=>!P)},className:[G,ve||y!==1||q||N?ce:Ce].join(" "),children:p.jsx(fn,{size:16})}),ve&&p.jsxs("div",{className:"absolute bottom-full left-0 mb-2 w-52 rounded-xl border border-slate-600/80 bg-slate-950/96 p-3 shadow-xl backdrop-blur-sm",children:[Y&&n.canRecord&&p.jsx("div",{className:"mb-3 border-b border-slate-700 pb-3",children:p.jsxs("button",{type:"button",onClick:xe,className:["inline-flex w-full min-h-9 items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition",n.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:[n.isRecording?p.jsx(So,{size:13,className:"fill-current animate-pulse"}):p.jsx(Co,{size:13,className:"text-rose-300"}),n.isRecording?"Stop REC":"Record"]})}),p.jsxs("div",{className:"mb-3",children:[p.jsxs("div",{className:"mb-1.5 flex items-center justify-between text-[11px] text-slate-400",children:[p.jsxs("span",{className:"flex items-center gap-1.5",children:[p.jsx(Mn,{size:11}),"Brightness"]}),p.jsxs("span",{children:[Math.round(y*100),"%"]})]}),p.jsx("input",{type:"range",min:"0.4",max:"2.0",step:"0.05",value:y,onChange:P=>{w(Number(P.currentTarget.value))},className:"w-full"})]}),p.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[p.jsxs("button",{type:"button",onClick:()=>{Q(P=>!P)},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",q?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[p.jsx(Rn,{size:13}),"Flip H"]}),p.jsxs("button",{type:"button",onClick:()=>{fe(P=>!P)},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",N?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[p.jsx(Ln,{size:13}),"Flip V"]})]})]})]}),n.canRecord&&!Y&&p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":n.isRecording?"Stop recording":"Start recording",onClick:xe,onMouseEnter:()=>U("record"),onMouseLeave:f,onFocus:()=>U("record"),onBlur:f,className:[ue,n.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:n.isRecording?p.jsx(So,{size:14,className:"fill-current animate-pulse"}):p.jsx(Co,{size:16,className:"text-rose-300"})}),te("record",n.isRecording?b.recordStop:b.recordIdle)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":n.isPoweredOn?"Power off":"Power on",onClick:()=>{if(f(),n.isPoweredOn){n.powerOff();return}n.powerOn()},onMouseEnter:()=>U("power"),onMouseLeave:f,onFocus:()=>U("power"),onBlur:f,className:[G,n.isPoweredOn?ce:Ce].join(" "),children:p.jsx(Sn,{size:16})}),te("power",n.isPoweredOn?b.powerOff:b.powerOn)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":o?"Disable high resolution":"Enable high resolution",onClick:()=>{f(),m(!o)},onMouseEnter:()=>U("hi-res"),onMouseLeave:f,onFocus:()=>U("hi-res"),onBlur:f,className:[G,o?ce:Ce].join(" "),children:p.jsx(dn,{size:16})}),te("hi-res",b.hiRes)]}),p.jsxs("div",{className:"flex items-center",children:[p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":h?"Disable fit width":"Enable fit width",onClick:()=>{f(),D(!h)},onMouseEnter:()=>U("fit-width"),onMouseLeave:f,onFocus:()=>U("fit-width"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-l-full border-t border-b border-l border-r-0 text-sm transition backdrop-blur-sm",h?ce:Ce].join(" "),children:p.jsx(mn,{size:16})}),te("fit-width",h?b.fitWidthOn:b.fitWidthOff)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":ie?"Unpin preview":"Pin preview",onClick:()=>{f(),!(C||h)&&$(P=>{if(!P){const K=A();return K&&z(K),!0}return Z(!1),_(0),z(null),!1})},onMouseEnter:()=>U("pin"),onMouseLeave:f,onFocus:()=>U("pin"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",C||h?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":ie?ce:Ce].join(" "),disabled:C||h,children:p.jsx(wn,{size:16})}),te("pin",C?b.pinUnavailable:h?b.pinUnavailableFitWidth:ie?b.pinOn:b.pinOff)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":C?"Exit maximize":"Maximize preview",onClick:()=>{f(),H(P=>!P)},onMouseEnter:()=>U("maximize"),onMouseLeave:f,onFocus:()=>U("maximize"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-r-full border-t border-b border-r border-l-0 text-sm transition backdrop-blur-sm",C?ce:Ce].join(" "),children:C?p.jsx(lo,{size:16}):p.jsx(bn,{size:16})}),te("maximize",C?b.maximizeOn:b.maximizeOff)]})]})]});return p.jsxs("div",{ref:ge,className:"space-y-4",children:[p.jsx("div",{ref:re,"aria-hidden":"true"}),p.jsxs("div",{ref:se,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${C?h?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":ie?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:ie&&B?{left:`${B.left}px`,top:j??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${B.width}px`}:C?void 0:{overflow:"visible"},children:[C&&(h?p.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:p.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{H(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:p.jsx(lo,{size:18})})}):p.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{H(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:p.jsx(lo,{size:18})})),p.jsxs("div",{className:`relative ${C?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:C?h&&s?{aspectRatio:s,width:"100%"}:void 0:h&&s?{aspectRatio:s,width:"100%"}:s?n.sourceDimensions&&n.sourceDimensions.height>n.sourceDimensions.width?{aspectRatio:s,height:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{aspectRatio:s,height:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{height:u,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[p.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",style:{filter:y!==1?`brightness(${y})`:void 0,transform:q||N?`scale(${q?-1:1}, ${N?-1:1})`:void 0},children:[V&&p.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),p.jsx("div",{ref:n.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!n.isPoweredOn&&p.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[p.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),p.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),n.isLoading&&!n.needsUserPlay&&!n.previewError&&p.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",V?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[p.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#c8cede] border-t-[#111014]"}),p.jsx("p",{className:"font-medium",children:n.loadingLabel||"Loading preview..."}),p.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),n.needsUserPlay&&!n.isLoading&&p.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:p.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[p.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),p.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),p.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),p.jsx("button",{type:"button",onClick:()=>{n.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),n.hasAudioOnly&&p.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!h&&p.jsx("div",{className:"absolute -bottom-8 -right-4 z-50 flex items-center gap-2",children:Re()})]}),h&&C&&p.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:Re()})]}),h&&!C&&p.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:Re()}),ie&&B&&p.jsx("div",{style:{height:`${B.height}px`}})]})}const gr=I.lazy(()=>No(()=>import("./VideoControls-DLyxg4yV.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),pr=I.lazy(()=>No(()=>import("./RetroFilterPanel-BOFR7Utn.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Fo=p.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-[#7a88a8]",children:"Preparing controls..."});function fr({locale:t,player:e,filterState:r,controlPanelMode:n,onControlPanelModeChange:o,onApplyPreset:h,onSetTargetWidth:i,onSetTargetHeight:d,onSetMatchTargetAspect:m,onResetSettings:D,onImportSettings:E}){return p.jsxs("div",{className:"rounded-2xl border border-[#c8cede] bg-[#eceef4] p-3 text-xs text-[#2c3550]",children:[(e.hasPlayableMedia||e.hasImage)&&n!=="video-settings"&&p.jsx(I.Suspense,{fallback:Fo,children:p.jsx(gr,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:n==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,noiseReductionAmount:e.noiseReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeNoiseReductionAmount:e.setNoiseReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{o("playback")},onResetSettings:D,onImportSettings:E,onToggleVideoSettings:()=>{o("video-settings")},onToggleAudioSettings:()=>{o(n==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&p.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),n==="video-settings"&&p.jsxs("div",{className:"mt-4 border-t border-[#c8cede] pt-4",children:[p.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:p.jsx("button",{type:"button",onClick:()=>{o("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-[#b8c0d4] bg-[#f8f9fc] px-3 py-2 text-[#12141c] hover:bg-[#e2e5ee]",children:"Back to Playback"})}),p.jsx(I.Suspense,{fallback:Fo,children:p.jsx(pr,{locale:t,colorLevels:r.colorLevels,curvature:r.curvature,ditherStrength:r.ditherStrength,glowStrength:r.glowStrength,smoothStrength:r.smoothStrength,toonSteps:r.toonSteps,edgeBoost:r.edgeBoost,animeEdgeLow:r.animeEdgeLow,animeEdgeHigh:r.animeEdgeHigh,isFilterEnabled:r.isFilterEnabled,monoTint:r.monoTint,neonBoost:r.neonBoost,neonDetail:r.neonDetail,neonSaturation:r.neonSaturation,paletteMode:r.paletteMode,phosphorStrength:r.phosphorStrength,spotMaskStrength:r.spotMaskStrength,bulbRadius:r.bulbRadius,blackFloor:r.blackFloor,phosphorDotLightBalance:r.phosphorDotLightBalance,phosphorDotInternalScale:r.phosphorDotInternalScale,phosphorDotBrightCore:r.phosphorDotBrightCore,phosphorDotCellFill:r.phosphorDotCellFill,phosphorDotFlatDisc:r.phosphorDotFlatDisc,phosphorDotNeighborBlend:r.phosphorDotNeighborBlend,closeUpNoiseStrength:r.closeUpNoiseStrength,scanlineBrightnessFade:r.scanlineBrightnessFade,scanlineStrength:r.scanlineStrength,scanline2Strength:r.scanline2Strength,selectedPreset:r.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:r.targetHeight,targetWidth:r.targetWidth,matchTargetAspect:r.matchTargetAspect,vignetteStrength:r.vignetteStrength,onApplyPreset:h,onSetColorLevels:r.setColorLevels,onSetCurvature:r.setCurvature,onSetDitherStrength:r.setDitherStrength,onSetGlowStrength:r.setGlowStrength,onSetSmoothStrength:r.setSmoothStrength,onSetToonSteps:r.setToonSteps,onSetEdgeBoost:r.setEdgeBoost,onSetAnimeEdgeLow:r.setAnimeEdgeLow,onSetAnimeEdgeHigh:r.setAnimeEdgeHigh,onSetIsFilterEnabled:r.setIsFilterEnabled,onSetMonoTint:r.setMonoTint,onSetNeonBoost:r.setNeonBoost,onSetNeonDetail:r.setNeonDetail,onSetNeonSaturation:r.setNeonSaturation,onSetPaletteMode:r.setPaletteMode,onSetPhosphorStrength:r.setPhosphorStrength,onSetSpotMaskStrength:r.setSpotMaskStrength,onSetBulbRadius:r.setBulbRadius,onSetBlackFloor:r.setBlackFloor,onSetPhosphorDotLightBalance:r.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:r.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:r.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:r.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:r.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:r.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:r.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:r.setScanlineBrightnessFade,onSetScanlineStrength:r.setScanlineStrength,onSetScanline2Strength:r.setScanline2Strength,onSetTargetHeight:d,onSetTargetWidth:i,onSetMatchTargetAspect:m,onSetVignetteStrength:r.setVignetteStrength})})]})]})}function Go({locale:t="en",src:e,stream:r,streamName:n,kind:o="video",looping:h,className:i,onError:d,initialFilterState:m,confirmDialog:D}){const{showConfirmDialog:E}=ln(),b=D??(x=>E({...x,title:x.title??"",body:x.body??""}).then(B=>B??!1)),F=I.useMemo(()=>Bt()?.ui,[]),[C,H]=I.useState(F?.isHighResolution??!1),[J,$]=I.useState(!1),[ee,Z]=I.useState("playback"),X=I.useRef(""),_=I.useRef(""),T=hr(m),ae=C&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,y=ur(T,J?"width":"contain",ae),w=I.useCallback(()=>{Fn(),T.resetSettings(),y.resetAudioSettings(),H(!1)},[T,y]),q=I.useCallback(x=>{T.applyAllFilterSettings(x.filter),y.applyAudioSettings(x.audio),H(x.ui.isHighResolution),cn(x.locale)},[T,y]),Q=I.useCallback(()=>{if(!y.sourceDimensions)return;const x=Math.max(8,Math.round(T.targetWidth/y.sourceDimensions.width*y.sourceDimensions.height/8)*8);x!==T.targetHeight&&T.setTargetHeight(x)},[T.targetHeight,T.targetWidth,T.setTargetHeight,y.sourceDimensions]),N=I.useCallback(()=>y.sourceDimensions?.width&&y.sourceDimensions?.height?y.sourceDimensions.width/y.sourceDimensions.height:Math.max(T.targetWidth,1)/Math.max(T.targetHeight,1),[T.targetHeight,T.targetWidth,y.sourceDimensions]),fe=I.useCallback(x=>{if(T.setTargetWidth(x),!T.matchTargetAspect)return;const B=Math.max(N(),1e-4);T.setTargetHeight(Math.max(1,Math.round(x/B)))},[T,N]),ve=I.useCallback(x=>{if(T.setTargetHeight(x),!T.matchTargetAspect)return;const B=Math.max(N(),1e-4);T.setTargetWidth(Math.max(1,Math.round(x*B)))},[T,N]),Ae=I.useCallback(x=>{T.setMatchTargetAspect(x),x&&y.sourceDimensions&&Q()},[T,y.sourceDimensions,Q]),Y=I.useCallback(x=>{if(T.applyPreset(x),x!=="phosphorDot"||!y.sourceDimensions)return;const B=lt.phosphorDot,z=Math.max(y.sourceDimensions.width,1),ge=Math.max(y.sourceDimensions.height,1),re=z/ge,se=B.width/B.height;let M=B.width,A=B.height;re>se?A=Math.max(8,Math.round(B.width/re/8)*8):M=Math.max(8,Math.round(B.height*re/8)*8),!(B.width===M&&B.height===A)&&(T.setTargetWidth(M),T.setTargetHeight(A))},[T.applyPreset,T.setTargetHeight,T.setTargetWidth,y.sourceDimensions]);return I.useEffect(()=>{T.matchTargetAspect&&y.sourceDimensions&&Q()},[T.matchTargetAspect,y.sourceDimensions,Q]),I.useEffect(()=>{if(r){const B=`stream:${r.id}:${o}:${n??""}`;if(X.current===B)return;X.current=B,(async()=>{try{await y.previewStream(r,o==="audio"?"audio":"video",n)}catch(z){d?.(z instanceof Error?z:new Error(String(z)))}})();return}if(!e){X.current="";return}const x=`src:${e}:${o}`;X.current!==x&&(X.current=x,(async()=>{try{await y.previewUrl(e,o)}catch(B){d?.(B instanceof Error?B:new Error(String(B)))}})())},[e,r,n,o,d,y]),I.useEffect(()=>{y.refreshLayout()},[J,y.refreshLayout]),I.useEffect(()=>{y.refreshLayout()},[T.targetWidth,T.targetHeight,T.isFilterEnabled,ae,y.refreshLayout]),I.useEffect(()=>{if(typeof h!="boolean")return;const x=r?`stream:${r.id}:${o}`:e?`src:${e}:${o}`:"";if(!x){_.current="";return}const B=`${x}:${h}`;_.current!==B&&(_.current=B,y.setLoopingEnabled(h))},[o,h,y,e,r]),p.jsx("section",{className:i??"rounded-2xl border-4 border-[#111014] bg-[#f8f9fc]   p-3 shadow-sm",children:p.jsxs("div",{className:"space-y-4",children:[p.jsx(mr,{locale:t,src:e,kind:o,player:y,isHighResolution:C,isFitWidthEnabled:J,controlPanelMode:ee,confirmDialog:b,onHighResolutionChange:H,onFitWidthChange:$,onError:d}),p.jsx(fr,{locale:t,player:y,filterState:T,controlPanelMode:ee,onControlPanelModeChange:Z,onApplyPreset:Y,onSetTargetWidth:fe,onSetTargetHeight:ve,onSetMatchTargetAspect:Ae,onResetSettings:w,onImportSettings:q})]})})}const br=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:Go,default:Go},Symbol.toStringTag,{value:"Module"}));export{me as D,Xn as M,Nn as R,lt as a,br as b,Bt as l};
