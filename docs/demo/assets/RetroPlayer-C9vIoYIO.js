const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-CCjXa2rz.js","./index-CVJHNaKs.js","./index-B65CcMs8.css","./RetroFilterPanel-DhiDPpyr.js"])))=>i.map(i=>d[i]);
import{b as We,r as a,R as mo,a as k,j as p,_ as Do,u as tn,s as on}from"./index-CVJHNaKs.js";const nn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],rn=We("aperture",nn);const sn=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],an=We("arrow-left-right",sn);const ln=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],go=We("circle",ln);const cn=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],un=We("ellipsis",cn);const dn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],hn=We("maximize-2",dn);const mn=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],$t=We("minimize-2",mn);const gn=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],pn=We("pin",gn);const fn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],vn=We("power",fn);const bn=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",key:"1i73f7"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",key:"saxlbk"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]],An=We("square-centerline-dashed-horizontal",bn);const xn=[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",key:"14bfxa"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",key:"14rx03"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]],wn=We("square-centerline-dashed-vertical",xn);const Cn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],po=We("square",Cn);const Sn=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],yn=We("sun",Sn);async function Eo(t,e={},r){return window.__TAURI_INTERNALS__.invoke(t,e,r)}async function Rn(t,e){await Eo("plugin:sharekit|share_file",{url:t,...e})}const ro="tetorica-retro-player.settings",At=1,xt=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(ro);if(!t)return null;const e=JSON.parse(t);return e.version!==At?null:e}catch{return null}},io=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(ro,JSON.stringify(t))}catch{}},wt=()=>xt(),Tn=t=>{const e=xt();io({version:At,audio:e?.audio,filter:t,ui:e?.ui})},Ln=t=>{const e=xt();io({version:At,audio:t,filter:e?.filter,ui:e?.ui})},Dn=t=>{const e=xt();io({version:At,audio:e?.audio,filter:e?.filter,ui:t})},En=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(ro)}catch{}},ce={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,noiseReductionAmount:0,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},Mn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.005,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},Bn=Object.fromEntries(Object.entries(Mn).map(([t,e])=>[t,{label:e.label,settings:{...ce,...e.settings}}])),Pn=Object.fromEntries(Object.entries(Bn).map(([t,e])=>[t,e.settings]));function kn(t){const r=new Float32Array(256),n=1+t*5;for(let o=0;o<256;o++){const u=o*2/255-1;r[o]=Math.tanh(u*n)}return r}function fo(t){const r=new Float32Array(256),n=t*8;for(let o=0;o<256;o++){const u=o*2/255-1;n<.001?r[o]=u:r[o]=Math.tanh(u*(1+n))/Math.tanh(1+n)}return r}function In(t){const r=Math.max(1,Math.floor(t.sampleRate*.22)),n=t.createBuffer(2,r,t.sampleRate);for(let o=0;o<n.numberOfChannels;o++){const u=n.getChannelData(o);for(let h=0;h<u.length;h++){const i=h/u.length,m=(1-i)**1.85,D=.78+.22*Math.sin(i*42+o*.9),E=Math.sin(i*130+o*.35)*.08;u[h]=(Math.random()*2-1+E)*m*D*.28}}return n}function Fn(t){const r=Math.max(1,Math.floor(t.sampleRate*2.2)),n=t.createBuffer(2,r,t.sampleRate),o=Math.floor(t.sampleRate*.012);for(let u=0;u<n.numberOfChannels;u++){const h=n.getChannelData(u);for(let i=0;i<r;i++){if(i<o)continue;const m=(i-o)/(r-o),D=(1-m)**1.8,E=Math.max(0,1-m*2.5),b=Math.sin(m*160+u*.8)*E*.35;h[i]=(Math.random()*2-1+b)*D*.75}}return n}function Gn(t){const e=t.sampleRate*2,r=t.createBuffer(2,e,t.sampleRate);let n=0,o=0;for(let u=0;u<e;u++){const h=Math.random()*2-1;n=(n+h*.045)/1.045,o=o*.82+h*.18;const i=n*1.35,m=(h-o)*.55,D=Math.max(-1,Math.min(1,i+m));for(let E=0;E<r.numberOfChannels;E++){const b=r.getChannelData(E),F=(Math.random()*2-1)*.012;b[u]=Math.max(-1,Math.min(1,D+F))}}return r}function Nn(t){const e=t.sampleRate*2,r=new Float32Array(e);let n=0,o=0;for(;n<e;){const h=Math.random()*2-1;o=o*.72+h*.28,r[n]+=(h-o)*.018;const i=Math.random();if(i<.0034){const m=8+Math.floor(Math.random()*42),D=.11+Math.random()*.28,E=Math.random()<.5?-1:1;for(let b=0;b<m&&n+b<e;b++){const F=Math.exp(-b/(2.4+Math.random()*5));r[n+b]+=E*D*F*(.7+Math.random()*.3)}n+=m+Math.floor(Math.random()*640);continue}if(i<.0038){const m=90+Math.floor(Math.random()*260),D=.055+Math.random()*.11,E=Math.random()*Math.PI*2;for(let b=0;b<m&&n+b<e;b++){const F=Math.exp(-b/(18+Math.random()*40)),x=Math.sin(E+b*(.22+Math.random()*.06));r[n+b]+=D*F*x}n+=m+Math.floor(Math.random()*2200);continue}n++}const u=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<u.numberOfChannels;h++){const i=u.getChannelData(h);for(let m=0;m<e;m++){const D=(Math.random()*2-1)*.0035;i[m]=Math.max(-1,Math.min(1,r[m]+D))}}return u}const Wn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function ft(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function Mo({preset:t,params:e}){return{...ce,...t?Pn[t]:null,...e}}class Hn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;autoConnections=new Set;externalConnections=new Set;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseHighpass:null,noiseLowpass:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:r,runtimeState:n,connectOutputToDestination:o=!1,connectOutputToRecordingDestination:u=!1,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=r,this.runtimeState=n,this.currentSettings=n.settings,this.connectOutputToDestination=o,this.connectOutputToRecordingDestination=u,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.fxOutputGain??this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,r){Wn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,r??{})}getParams(){return{...this.currentSettings}}setParams(e,r=!0){const n=r?{...this.currentSettings,...e}:{...ce,...e};Object.assign(this.currentSettings,n),this.updateAudioNodes()}applyPreset(e,r){const n=Mo({preset:e,params:r});Object.assign(this.currentSettings,n),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseHighpass:null,noiseLowpass:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,r=this.nodes.radioToneHighpass,n=this.nodes.radioToneLowpass,o=this.nodes.radioTonePresence,u=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,i=this.nodes.lofiDrive,m=this.nodes.bitcrusher,D=this.nodes.bassEq,E=this.nodes.midEq,b=this.nodes.trebleEq,F=this.nodes.stereoWidth,x=this.nodes.roomDryGain,N=this.nodes.roomWetGain,q=this.nodes.wowFlutterDelay,$=this.nodes.wowLfo,ae=this.nodes.wowLfoGain,Y=this.nodes.flutterLfo,ee=this.nodes.flutterLfoGain,z=this.nodes.noiseGain,S=this.nodes.crackleGain,fe=this.nodes.vinylDustBedFilter,y=this.nodes.vinylDustBedGain,{settings:A,isPlaying:te,isOutputEnabled:Z}=this.runtimeState,G=A.isMuted||!Z?0:A.volume;if(e&&(e.gain.value=G),r&&n&&o){const v=A.isAudioFxEnabled?A.radioToneAmount:0;r.frequency.value=20+v*430,r.Q.value=.4+v*.35,n.frequency.value=2e4-v*17400,n.Q.value=.2+v*.9,o.frequency.value=1700,o.Q.value=.8+v*1.4,o.gain.value=v*6}if(u&&h&&i){const v=A.isAudioFxEnabled?A.lofiAmount:0;u.frequency.value=16e3-v*14200,u.Q.value=.3+v*1.8,h.gain.value=-v*18;try{i.curve=kn(v*.6)}catch{}}if(m){const v=A.isAudioFxEnabled,U=16-(v?A.bitCrushAmount:0)*12,f=1+(v?A.sampleRateReductionAmount:0)*23,H=v?Math.max(A.bitCrushAmount,A.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(U,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(f,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(H,m.context.currentTime)}const de=this.nodes.postCrushLowpass;if(de){const v=A.isAudioFxEnabled?A.noiseReductionAmount:0;de.frequency.value=Math.max(3e3,18e3-v*15e3)}if(D&&E&&b){const v=A.isAudioFxEnabled?15:0;D.gain.value=A.bassAmount*v,E.gain.value=A.midAmount*v,b.gain.value=A.trebleAmount*v}if(F){const v=A.isAudioFxEnabled?1+A.stereoWidthAmount:1;F.parameters.get("width")?.setValueAtTime(v,F.context.currentTime)}if(x&&N){const v=A.isAudioFxEnabled?A.smallSpeakerRoomAmount:0;x.gain.value=Math.max(.52,1-v*.42),N.gain.value=v*.95}if(q&&$&&ae&&Y&&ee){const v=A.isAudioFxEnabled?A.wowFlutterAmount:0;q.delayTime.value=v>0?.006+v*.004:0,$.frequency.value=.18+v*.42,ae.gain.value=v*.0023,Y.frequency.value=5.2+v*6.5,ee.gain.value=v*6e-4}if(z&&(z.gain.value=A.isNoiseEnabled&&!A.isMuted&&Z&&te?Math.min(.24,A.noiseLevel*5.5):0),S){const v=A.isNoiseEnabled&&!A.isMuted&&Z&&te;S.gain.value=v?Math.min(.24,A.vinylDustAmount*.22+A.noiseLevel*.25):0}if(fe&&y){const U=A.isNoiseEnabled&&!A.isMuted&&Z&&te?A.vinylDustAmount:0;fe.frequency.value=2100+U*2600,fe.Q.value=.35+U*.25,y.gain.value=U*.11}const he=this.nodes.echoDelayLine,me=this.nodes.echoFeedbackGain,X=this.nodes.echoWetGain;if(he&&me&&X){const v=A.isAudioFxEnabled?A.delayAmount:0;me.gain.value=v*.5,X.gain.value=v*.55}const w=this.nodes.hallReverbWetGain;if(w){const v=A.isAudioFxEnabled?A.reverbAmount:0;w.gain.value=v*2}const L=this.nodes.chorusLfoGain1,O=this.nodes.chorusLfoGain2,re=this.nodes.chorusWetGain;if(L&&O&&re){const v=A.isAudioFxEnabled?A.chorusAmount:0;re.gain.value=v*.6,L.gain.value=v*.005,O.gain.value=v*.006}const ge=this.nodes.tapeSaturator;if(ge)try{ge.curve=fo(A.isAudioFxEnabled?A.tapeSaturationAmount:0)}catch{}const M=this.nodes.busCompressor;if(M){const v=A.isAudioFxEnabled?A.compressorAmount:0;M.threshold.value=-36*v,M.ratio.value=1+9*v}const J=this.nodes.fxOutputGain;J&&(J.gain.value=A.isAudioFxEnabled?A.fxOutputTrimAmount:1)}async loadWorklets(e){let r=null,n=null;const o=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in e&&o){const u=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICAgIG5zRXJyb3I6IDAsICAvLyBub2lzZSBzaGFwaW5nIGZlZWRiYWNrCiAgICAgIH0pOwogICAgfQoKICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbENvdW50OyBjaGFubmVsICs9IDEpIHsKICAgICAgY29uc3QgaW5wdXRDaGFubmVsID0gaW5wdXQ/LltjaGFubmVsXSA/PyBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IG91dHB1dENoYW5uZWwgPSBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jaGFubmVsU3RhdGVbY2hhbm5lbF07CgogICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3V0cHV0Q2hhbm5lbC5sZW5ndGg7IGluZGV4ICs9IDEpIHsKICAgICAgICBjb25zdCBiaXREZXB0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLmJpdERlcHRoLCBpbmRleCk7CiAgICAgICAgY29uc3QgaG9sZEZyYW1lcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQocmVhZFBhcmFtKHBhcmFtZXRlcnMuaG9sZEZyYW1lcywgaW5kZXgpKSk7CiAgICAgICAgY29uc3QgbWl4ID0gcmVhZFBhcmFtKHBhcmFtZXRlcnMubWl4LCBpbmRleCk7CiAgICAgICAgY29uc3Qgc291cmNlID0gaW5wdXRDaGFubmVsPy5baW5kZXhdID8/IDA7CgogICAgICAgIGlmIChzdGF0ZS5ob2xkQ291bnRlciA8PSAwKSB7CiAgICAgICAgICAvLyDkuInop5Ljg4fjgqPjgrbjg6rjg7PjgrA6IOmHj+WtkOWMluatquOBvyDihpIg44K144Op44K144Op44GX44Gf44OS44K56Z+z44Gr5aSJ5o+bCiAgICAgICAgICBjb25zdCBsc2IgPSAyIC8gTWF0aC5wb3coMiwgYml0RGVwdGgpOwogICAgICAgICAgY29uc3QgZGl0aGVyID0gKE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpIC0gMSkgKiBsc2I7CiAgICAgICAgICAvLyAx5qyh44OO44Kk44K644K344Kn44O844OU44Oz44KwOiDliY3lm57jga7ph4/lrZDljJboqqTlt67jgpLjg5XjgqPjg7zjg4njg5Djg4Pjgq/jgZfjgabpq5jln5/jgbjmirzjgZflh7rjgZkKICAgICAgICAgIGNvbnN0IHNoYXBlZCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBzb3VyY2UgKyBkaXRoZXIgLSBzdGF0ZS5uc0Vycm9yICogMC44NSkpOwogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNoYXBlZCwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUubnNFcnJvciA9IHN0YXRlLmhlbGRTYW1wbGUgLSBzaGFwZWQ7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciA9IGhvbGRGcmFtZXMgLSAxOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciAtPSAxOwogICAgICAgIH0KCiAgICAgICAgb3V0cHV0Q2hhbm5lbFtpbmRleF0gPSBzb3VyY2UgKyAoc3RhdGUuaGVsZFNhbXBsZSAtIHNvdXJjZSkgKiBtaXg7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gdHJ1ZTsKICB9Cn0KCmZ1bmN0aW9uIHJlYWRQYXJhbSh2YWx1ZXMsIGluZGV4KSB7CiAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IDEgPyB2YWx1ZXNbMF0gOiB2YWx1ZXNbaW5kZXhdOwp9CgpmdW5jdGlvbiBxdWFudGl6ZVNhbXBsZShzYW1wbGUsIGJpdERlcHRoKSB7CiAgY29uc3QgcmVzb2x2ZWRCaXREZXB0aCA9IE1hdGgubWF4KDIsIE1hdGgubWluKDE2LCBNYXRoLnJvdW5kKGJpdERlcHRoKSkpOwogIGlmIChyZXNvbHZlZEJpdERlcHRoID49IDE2KSB7CiAgICByZXR1cm4gc2FtcGxlOwogIH0KCiAgY29uc3QgbGV2ZWxzID0gMiAqKiByZXNvbHZlZEJpdERlcHRoOwogIGNvbnN0IG5vcm1hbGl6ZWQgPSAoc2FtcGxlICsgMSkgKiAwLjU7CiAgY29uc3QgcXVhbnRpemVkID0gTWF0aC5yb3VuZChub3JtYWxpemVkICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTsKICByZXR1cm4gcXVhbnRpemVkICogMiAtIDE7Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1iaXRjcnVzaGVyIiwgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yKTsK",import.meta.url);await e.audioWorklet.addModule(u.href),r=new o(e,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const h=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await e.audioWorklet.addModule(h.href),n=new o(e,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}return{bitcrusher:r,stereoWidth:n}}buildAndWireNodes(e,r){const n=e.createGain();let o=null;if("createMediaStreamDestination"in e)try{o=e.createMediaStreamDestination()}catch{o=null}const u=e.createBiquadFilter(),h=e.createBiquadFilter(),i=e.createBiquadFilter(),m=e.createBiquadFilter(),D=e.createBiquadFilter(),E=e.createWaveShaper(),b=e.createBiquadFilter(),F=e.createBiquadFilter(),x=e.createBiquadFilter(),N=e.createBiquadFilter(),q=e.createGain(),$=e.createConvolver(),ae=e.createGain(),Y=e.createDelay(.05),ee=e.createOscillator(),z=e.createGain(),S=e.createOscillator(),fe=e.createGain(),y=e.createWaveShaper(),A=e.createGain(),te=e.createDynamicsCompressor(),Z=e.createDelay(1),G=e.createGain(),de=e.createGain(),he=e.createConvolver(),me=e.createGain(),X=e.createDelay(.05),w=e.createDelay(.05),L=e.createOscillator(),O=e.createOscillator(),re=e.createGain(),ge=e.createGain(),M=e.createGain(),J=e.createGain(),v=e.createBufferSource(),U=e.createBiquadFilter(),f=e.createBiquadFilter(),H=e.createBiquadFilter(),c=e.createStereoPanner(),s=e.createGain(),_=e.createOscillator(),Q=e.createGain(),K=e.createBufferSource(),ue=e.createBiquadFilter(),pe=e.createBiquadFilter(),Ae=e.createGain(),j=e.createGain();u.type="highpass",h.type="lowpass",i.type="peaking",m.type="lowpass",D.type="highshelf",D.frequency.value=2800,E.oversample="4x",b.type="lowpass",b.frequency.value=18e3,b.Q.value=.5,F.type="lowshelf",F.frequency.value=180,x.type="peaking",x.frequency.value=1200,x.Q.value=.5,N.type="highshelf",N.frequency.value=2800,$.buffer=In(e),Y.delayTime.value=0,ee.type="sine",S.type="sine",y.curve=fo(0),y.oversample="4x",A.gain.value=1,te.knee.value=10,te.attack.value=.003,te.release.value=.12,te.threshold.value=0,te.ratio.value=1,Z.delayTime.value=.32,G.gain.value=0,de.gain.value=0,he.buffer=Fn(e),me.gain.value=0,X.delayTime.value=.018,w.delayTime.value=.023,L.type="sine",O.type="sine",L.frequency.value=.8,O.frequency.value=1.3,re.gain.value=0,ge.gain.value=0,M.gain.value=0,J.gain.value=1,n.gain.value=0,s.gain.value=0,v.buffer=Gn(e),v.loop=!0,U.type="highpass",U.frequency.value=1100,U.Q.value=.25,f.type="lowpass",f.frequency.value=5600,f.Q.value=.18,H.type="peaking",H.frequency.value=2400,H.Q.value=.7,H.gain.value=-2.5,_.type="sine",_.frequency.value=.021,Q.gain.value=.08,K.buffer=Nn(e),K.loop=!0,ue.type="highpass",ue.frequency.value=1250,ue.Q.value=.35,pe.type="bandpass",pe.frequency.value=2400,pe.Q.value=.4,Ae.gain.value=0,j.gain.value=0;const{bitcrusher:xe,stereoWidth:ve}=r;return ee.connect(z),z.connect(Y.delayTime),S.connect(fe),fe.connect(Y.delayTime),Y.connect(u),u.connect(h),h.connect(i),i.connect(m),m.connect(D),D.connect(E),xe?(E.connect(xe),xe.connect(b)):E.connect(b),b.connect(F),F.connect(x),x.connect(N),N.connect(y),ve?(y.connect(ve),ve.connect(q),ve.connect($)):(y.connect(q),y.connect($)),$.connect(ae),q.connect(n),ae.connect(n),n.connect(A),n.connect(Z),Z.connect(G),G.connect(Z),Z.connect(de),de.connect(A),n.connect(he),he.connect(me),me.connect(A),n.connect(X),n.connect(w),L.connect(re),re.connect(X.delayTime),O.connect(ge),ge.connect(w.delayTime),X.connect(M),w.connect(M),M.connect(A),A.connect(te),te.connect(J),v.connect(U),U.connect(f),f.connect(H),H.connect(c),c.connect(s),s.connect(n),_.connect(Q),Q.connect(c.pan),K.connect(ue),ue.connect(j),j.connect(n),K.connect(pe),pe.connect(Ae),Ae.connect(n),{masterGain:n,recordingDestination:o,radioToneHighpass:u,radioToneLowpass:h,radioTonePresence:i,lofiLowpass:m,lofiHighshelf:D,lofiDrive:E,bitcrusher:xe,postCrushLowpass:b,bassEq:F,midEq:x,trebleEq:N,stereoWidth:ve,roomDryGain:q,roomConvolver:$,roomWetGain:ae,wowFlutterDelay:Y,wowLfo:ee,wowLfoGain:z,flutterLfo:S,flutterLfoGain:fe,noiseSource:v,noiseHighpass:U,noiseLowpass:f,noiseFilter:H,noisePanner:c,noiseGain:s,noiseLfo:_,noiseLfoGain:Q,crackleSource:K,crackleFilter:ue,vinylDustBedFilter:pe,vinylDustBedGain:Ae,crackleGain:j,outputBus:A,echoDelayLine:Z,echoFeedbackGain:G,echoWetGain:de,hallReverbConvolver:he,hallReverbWetGain:me,chorusDelay1:X,chorusDelay2:w,chorusLfo1:L,chorusLfo2:O,chorusLfoGain1:re,chorusLfoGain2:ge,chorusWetGain:M,tapeSaturator:y,busCompressor:te,fxOutputGain:J}}startSources(){this.nodes.noiseSource?.start(),this.nodes.noiseLfo?.start(),this.nodes.crackleSource?.start(),this.nodes.wowLfo?.start(),this.nodes.flutterLfo?.start(),this.nodes.chorusLfo1?.start(),this.nodes.chorusLfo2?.start()}applyAutoConnect(){const e=this.nodes.fxOutputGain;if(!e)return;this.connectOutputToDestination&&(e.connect(this.context.destination),this.autoConnections.add(this.context.destination));const r=this.nodes.recordingDestination;r&&this.connectOutputToRecordingDestination&&(e.connect(r),this.autoConnections.add(r))}async initNodes(){const e=this.context,r=await this.loadWorklets(e),n=this.buildAndWireNodes(e,r);Object.assign(this.nodes,{audioContext:e,...n}),this.startSources(),this.applyAutoConnect()}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;(!this.nodes.audioContext||!this.nodes.masterGain)&&await this.initNodes();const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const r=await this.ensureInitialized();if(!r){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:r.state})}async connect(e,r,n){const o=await this.ensureInitialized();if(!o){this.debugAudio("connect:no-context");return}const u=this.output;if(!u){this.debugAudio("connect:no-output-node",{audioContextState:o.state});return}if(ft(e)){u.connect(e,r),this.externalConnections.add(e);return}if(this.connectOutputToDestination&&e===o.destination){this.debugAudio("connect:skipped-double-destination");return}u.connect(e,r,n),this.externalConnections.add(e)}disconnect(e){const r=this.output;if(r)if(e!==void 0){try{ft(e),r.disconnect(e)}catch{}this.externalConnections.delete(e)}else{for(const n of this.externalConnections)try{ft(n),r.disconnect(n)}catch{}this.externalConnections.clear()}}async dispose(){const e=[this.nodes.noiseSource,this.nodes.noiseLfo,this.nodes.crackleSource,this.nodes.wowLfo,this.nodes.flutterLfo,this.nodes.chorusLfo1,this.nodes.chorusLfo2];for(const o of e){try{o?.stop()}catch{}try{o?.disconnect()}catch{}}try{this.nodes.sourceNode?.disconnect()}catch{}this.disconnect();const r=this.output;if(r)for(const o of this.autoConnections)try{ft(o),r.disconnect(o)}catch{}this.autoConnections.clear();const n=[this.nodes.wowFlutterDelay,this.nodes.wowLfoGain,this.nodes.flutterLfoGain,this.nodes.radioToneHighpass,this.nodes.radioToneLowpass,this.nodes.radioTonePresence,this.nodes.lofiLowpass,this.nodes.lofiHighshelf,this.nodes.lofiDrive,this.nodes.bitcrusher,this.nodes.postCrushLowpass,this.nodes.bassEq,this.nodes.midEq,this.nodes.trebleEq,this.nodes.tapeSaturator,this.nodes.stereoWidth,this.nodes.roomDryGain,this.nodes.roomConvolver,this.nodes.roomWetGain,this.nodes.echoDelayLine,this.nodes.echoFeedbackGain,this.nodes.echoWetGain,this.nodes.hallReverbConvolver,this.nodes.hallReverbWetGain,this.nodes.chorusDelay1,this.nodes.chorusDelay2,this.nodes.chorusLfoGain1,this.nodes.chorusLfoGain2,this.nodes.chorusWetGain,this.nodes.noisePanner,this.nodes.noiseGain,this.nodes.noiseHighpass,this.nodes.noiseLowpass,this.nodes.noiseFilter,this.nodes.noiseLfoGain,this.nodes.crackleFilter,this.nodes.vinylDustBedFilter,this.nodes.vinylDustBedGain,this.nodes.crackleGain,this.nodes.masterGain,this.nodes.outputBus,this.nodes.busCompressor,this.nodes.fxOutputGain];for(const o of n)try{o?.disconnect()}catch{}this.resetNodes()}async ensureAudioContext(){return this.ensureInitialized()}}function Un({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:r=!1,...n}){const u={settings:Mo(n),isPlaying:n.isPlaying??!0,isOutputEnabled:n.previewKind===void 0?!0:n.previewKind==="video"||n.previewKind==="audio"||n.previewKind==="capture"};return new Hn({context:t,instanceLabel:n.instanceLabel??"tetorica-retro-audio-engine",runtimeState:u,connectOutputToDestination:e,connectOutputToRecordingDestination:r,enableAudioWorklet:n.enableAudioWorklet})}function eo(){if(typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc.")return!1;const t=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(t)}function ne(t){return{get current(){return t()}}}function On({instanceLabel:t,previewKind:e,previewKindRef:r,mediaRef:n,isPlaying:o,isPlayingRef:u}){const[h]=a.useState(()=>new AudioContext),[i]=a.useState(()=>{const d=wt()?.audio;return{isMuted:d?.isMuted??ce.isMuted,volume:d?.volume??ce.volume,playbackRate:d?.playbackRate??ce.playbackRate,isLooping:d?.isLooping??ce.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??ce.isAudioFxEnabled,lofiAmount:d?.lofiAmount??ce.lofiAmount,radioToneAmount:d?.radioToneAmount??ce.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??ce.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??ce.sampleRateReductionAmount,noiseReductionAmount:d?.noiseReductionAmount??ce.noiseReductionAmount,bassAmount:d?.bassAmount??ce.bassAmount,midAmount:d?.midAmount??ce.midAmount,trebleAmount:d?.trebleAmount??ce.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??ce.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??ce.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??ce.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??ce.isNoiseEnabled,noiseLevel:d?.noiseLevel??ce.noiseLevel,vinylDustAmount:d?.vinylDustAmount??ce.vinylDustAmount,delayAmount:d?.delayAmount??ce.delayAmount,reverbAmount:d?.reverbAmount??ce.reverbAmount,chorusAmount:d?.chorusAmount??ce.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??ce.tapeSaturationAmount,compressorAmount:d?.compressorAmount??ce.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??ce.fxOutputTrimAmount}}),m=a.useRef(i.isMuted),D=a.useRef(i.volume),E=a.useRef(i.playbackRate),b=a.useRef(i.isLooping),F=a.useRef(i.isAudioFxEnabled),x=a.useRef(i.lofiAmount),N=a.useRef(i.radioToneAmount),q=a.useRef(i.bitCrushAmount),$=a.useRef(i.sampleRateReductionAmount),ae=a.useRef(i.noiseReductionAmount),Y=a.useRef(i.bassAmount),ee=a.useRef(i.midAmount),z=a.useRef(i.trebleAmount),S=a.useRef(i.stereoWidthAmount),fe=a.useRef(i.smallSpeakerRoomAmount),y=a.useRef(i.wowFlutterAmount),A=a.useRef(i.isNoiseEnabled),te=a.useRef(i.noiseLevel),Z=a.useRef(i.vinylDustAmount),G=a.useRef(i.delayAmount),de=a.useRef(i.reverbAmount),he=a.useRef(i.chorusAmount),me=a.useRef(i.tapeSaturationAmount),X=a.useRef(i.compressorAmount),w=a.useRef(i.fxOutputTrimAmount),[L,O]=a.useState(i.isMuted),[re,ge]=a.useState(i.playbackRate),[M,J]=a.useState(i.volume),[v,U]=a.useState(i.isLooping),[f,H]=a.useState(i.isAudioFxEnabled),[c,s]=a.useState(i.lofiAmount),[_,Q]=a.useState(i.radioToneAmount),[K,ue]=a.useState(i.bitCrushAmount),[pe,Ae]=a.useState(i.sampleRateReductionAmount),[j,xe]=a.useState(i.noiseReductionAmount),[ve,B]=a.useState(i.bassAmount),[I,oe]=a.useState(i.midAmount),[Ce,Re]=a.useState(i.trebleAmount),[Te,Pe]=a.useState(i.stereoWidthAmount),[Le,Me]=a.useState(i.smallSpeakerRoomAmount),[ke,Xe]=a.useState(i.wowFlutterAmount),[He,Ie]=a.useState(i.isNoiseEnabled),[Ee,be]=a.useState(i.noiseLevel),[we,Qe]=a.useState(i.vinylDustAmount),[De,Ve]=a.useState(i.delayAmount),[Se,Ue]=a.useState(i.reverbAmount),[Be,Ke]=a.useState(i.chorusAmount),[Fe,$e]=a.useState(i.tapeSaturationAmount),[Oe,l]=a.useState(i.compressorAmount),[R,W]=a.useState(i.fxOutputTrimAmount),V=a.useRef(null),[g]=a.useState(()=>Un({context:h,instanceLabel:t,params:i,isPlaying:o,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[T]=a.useState(()=>({audioContextRef:ne(()=>g.audioContext),masterGainRef:ne(()=>g.masterGain),radioToneHighpassRef:ne(()=>g.radioToneHighpass),radioToneLowpassRef:ne(()=>g.radioToneLowpass),radioTonePresenceRef:ne(()=>g.radioTonePresence),recordingDestinationRef:ne(()=>g.recordingDestination),lofiLowpassRef:ne(()=>g.lofiLowpass),lofiHighshelfRef:ne(()=>g.lofiHighshelf),lofiDriveRef:ne(()=>g.lofiDrive),bitcrusherRef:ne(()=>g.bitcrusher),bassEqRef:ne(()=>g.bassEq),midEqRef:ne(()=>g.midEq),trebleEqRef:ne(()=>g.trebleEq),stereoWidthRef:ne(()=>g.stereoWidth),roomDryGainRef:ne(()=>g.roomDryGain),roomConvolverRef:ne(()=>g.roomConvolver),roomWetGainRef:ne(()=>g.roomWetGain),wowFlutterDelayRef:ne(()=>g.wowFlutterDelay),wowLfoRef:ne(()=>g.wowLfo),wowLfoGainRef:ne(()=>g.wowLfoGain),flutterLfoRef:ne(()=>g.flutterLfo),flutterLfoGainRef:ne(()=>g.flutterLfoGain),noiseSourceRef:ne(()=>g.noiseSource),noiseFilterRef:ne(()=>g.noiseFilter),noisePannerRef:ne(()=>g.noisePanner),noiseGainRef:ne(()=>g.noiseGain),noiseLfoRef:ne(()=>g.noiseLfo),noiseLfoGainRef:ne(()=>g.noiseLfoGain),crackleSourceRef:ne(()=>g.crackleSource),crackleFilterRef:ne(()=>g.crackleFilter),vinylDustBedFilterRef:ne(()=>g.vinylDustBedFilter),vinylDustBedGainRef:ne(()=>g.vinylDustBedGain),crackleGainRef:ne(()=>g.crackleGain)})),{audioContextRef:ye,masterGainRef:ie,radioToneHighpassRef:rt,radioToneLowpassRef:St,radioTonePresenceRef:it,recordingDestinationRef:yt,lofiLowpassRef:Rt,lofiHighshelfRef:Tt,lofiDriveRef:st,bitcrusherRef:Lt,bassEqRef:at,midEqRef:Dt,trebleEqRef:Et,stereoWidthRef:Mt,roomDryGainRef:lt,roomConvolverRef:Bt,roomWetGainRef:ct,wowFlutterDelayRef:Pt,wowLfoRef:ut,wowLfoGainRef:kt,flutterLfoRef:dt,flutterLfoGainRef:It,noiseSourceRef:ht,noiseFilterRef:Ft,noisePannerRef:Gt,noiseGainRef:Nt,noiseLfoRef:Wt,noiseLfoGainRef:Ht,crackleSourceRef:Ut,crackleFilterRef:Ot,vinylDustBedFilterRef:zt,vinylDustBedGainRef:jt,crackleGainRef:Vt}=T,Ye=(d,ze)=>g.debugAudio(d,ze),mt=()=>g.ensureInitialized(),_t=()=>g.ensureInitialized(),et=()=>g.updateAudioNodes(),Zt=d=>g.connectSourceNode(d),Xt=()=>g.dispose(),gt=(d,ze)=>g.setParams(d,ze),Kt=d=>g.setIsPlaying(d),qt=d=>g.setOutputEnabled(d),Yt=async d=>{const ze=await mt();if(!ze||!g.input){Ye("connectMediaAudio:no-context",{mediaTag:d.tagName});return}V.current&&(Ye("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),V.current.disconnect(),V.current=null);try{const Ze=ze.createMediaElementSource(d);Ze.connect(g.input),V.current=Ze,eo()?(d.muted=!1,d.volume=0):(d.muted=m.current,d.volume=m.current?0:D.current),Ye("connectMediaAudio:connected",{audioContextState:ze.state,mediaTag:d.tagName,previewKind:r.current}),et()}catch(Ze){throw Ye("connectMediaAudio:error",{audioContextState:ze.state,mediaTag:d.tagName,message:Ze instanceof Error?Ze.message:String(Ze),previewKind:r.current}),Ze}},Jt=()=>{const d=V.current;!d||!g.input||(d.disconnect(),d.connect(g.input),et())},Qt=async()=>{V.current?.disconnect(),V.current=null,await Xt()},_e=d=>{m.current=d.isMuted,D.current=d.volume,E.current=d.playbackRate,b.current=d.isLooping,F.current=d.isAudioFxEnabled,x.current=d.lofiAmount,N.current=d.radioToneAmount,q.current=d.bitCrushAmount,$.current=d.sampleRateReductionAmount,ae.current=d.noiseReductionAmount,Y.current=d.bassAmount,ee.current=d.midAmount,z.current=d.trebleAmount,S.current=d.stereoWidthAmount,fe.current=d.smallSpeakerRoomAmount,y.current=d.wowFlutterAmount,A.current=d.isNoiseEnabled,te.current=d.noiseLevel,Z.current=d.vinylDustAmount,G.current=d.delayAmount,de.current=d.reverbAmount,he.current=d.chorusAmount,me.current=d.tapeSaturationAmount,X.current=d.compressorAmount,w.current=d.fxOutputTrimAmount,O(d.isMuted),J(d.volume),ge(d.playbackRate),U(d.isLooping),H(d.isAudioFxEnabled),s(d.lofiAmount),Q(d.radioToneAmount),ue(d.bitCrushAmount),Ae(d.sampleRateReductionAmount),xe(d.noiseReductionAmount),B(d.bassAmount),oe(d.midAmount),Re(d.trebleAmount),Pe(d.stereoWidthAmount),Me(d.smallSpeakerRoomAmount),Xe(d.wowFlutterAmount),Ie(d.isNoiseEnabled),be(d.noiseLevel),Qe(d.vinylDustAmount),Ve(d.delayAmount),Ue(d.reverbAmount),Ke(d.chorusAmount),$e(d.tapeSaturationAmount),l(d.compressorAmount),W(d.fxOutputTrimAmount),n.current&&(eo()&&V.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=d.isMuted,n.current.volume=d.volume),n.current.playbackRate=d.playbackRate,n.current.loop=d.isLooping),gt(d),window.requestAnimationFrame(et)},Je=()=>_e({...ce});return a.useEffect(()=>{m.current=L,D.current=M,E.current=re,b.current=v,F.current=f,x.current=c,N.current=_,q.current=K,$.current=pe,ae.current=j,Y.current=ve,ee.current=I,z.current=Ce,S.current=Te,fe.current=Le,y.current=ke,A.current=He,te.current=Ee,Z.current=we,G.current=De,de.current=Se,he.current=Be,me.current=Fe,X.current=Oe,w.current=R,gt({isMuted:L,volume:M,playbackRate:re,isLooping:v,isAudioFxEnabled:f,lofiAmount:c,radioToneAmount:_,bitCrushAmount:K,sampleRateReductionAmount:pe,noiseReductionAmount:j,bassAmount:ve,midAmount:I,trebleAmount:Ce,stereoWidthAmount:Te,smallSpeakerRoomAmount:Le,wowFlutterAmount:ke,isNoiseEnabled:He,noiseLevel:Ee,vinylDustAmount:we,delayAmount:De,reverbAmount:Se,chorusAmount:Be,tapeSaturationAmount:Fe,compressorAmount:Oe,fxOutputTrimAmount:R},!0),Kt(o),qt(e==="video"||e==="audio"||e==="capture"),n.current&&(eo()&&V.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=L,n.current.volume=L?0:M),n.current.playbackRate=re,n.current.loop=v)},[L,M,f,c,_,K,pe,j,ve,I,Ce,Te,Le,ke,He,Ee,we,De,Se,Be,Fe,Oe,R,o,re,v,e]),a.useEffect(()=>{const d=setTimeout(()=>{Ln({isMuted:L,volume:M,playbackRate:re,isLooping:v,isAudioFxEnabled:f,lofiAmount:c,radioToneAmount:_,bitCrushAmount:K,sampleRateReductionAmount:pe,noiseReductionAmount:j,bassAmount:ve,midAmount:I,trebleAmount:Ce,stereoWidthAmount:Te,smallSpeakerRoomAmount:Le,wowFlutterAmount:ke,isNoiseEnabled:He,noiseLevel:Ee,vinylDustAmount:we,delayAmount:De,reverbAmount:Se,chorusAmount:Be,tapeSaturationAmount:Fe,compressorAmount:Oe,fxOutputTrimAmount:R})},300);return()=>clearTimeout(d)},[L,M,re,v,f,c,_,K,pe,j,ve,I,Ce,Te,Le,ke,He,Ee,we,De,Se,Be,Fe,Oe,R]),{audioContextRef:ye,mediaSourceRef:V,masterGainRef:ie,radioToneHighpassRef:rt,radioToneLowpassRef:St,radioTonePresenceRef:it,recordingDestinationRef:yt,lofiLowpassRef:Rt,lofiHighshelfRef:Tt,lofiDriveRef:st,bitcrusherRef:Lt,bassEqRef:at,midEqRef:Dt,trebleEqRef:Et,stereoWidthRef:Mt,roomDryGainRef:lt,roomConvolverRef:Bt,roomWetGainRef:ct,wowFlutterDelayRef:Pt,wowLfoRef:ut,wowLfoGainRef:kt,flutterLfoRef:dt,flutterLfoGainRef:It,noiseSourceRef:ht,noiseFilterRef:Ft,noisePannerRef:Gt,noiseGainRef:Nt,noiseLfoRef:Wt,noiseLfoGainRef:Ht,crackleSourceRef:Ut,crackleFilterRef:Ot,vinylDustBedFilterRef:zt,vinylDustBedGainRef:jt,crackleGainRef:Vt,isMutedRef:m,volumeRef:D,playbackRateRef:E,isLoopingRef:b,isAudioFxEnabledRef:F,lofiAmountRef:x,radioToneAmountRef:N,bitCrushAmountRef:q,sampleRateReductionAmountRef:$,bassAmountRef:Y,midAmountRef:ee,trebleAmountRef:z,stereoWidthAmountRef:S,smallSpeakerRoomAmountRef:fe,wowFlutterAmountRef:y,isNoiseEnabledRef:A,noiseLevelRef:te,vinylDustAmountRef:Z,delayAmountRef:G,reverbAmountRef:de,chorusAmountRef:he,tapeSaturationAmountRef:me,compressorAmountRef:X,fxOutputTrimAmountRef:w,isMuted:L,setIsMuted:O,playbackRate:re,setPlaybackRate:ge,volume:M,setVolume:J,isLooping:v,setIsLooping:U,isAudioFxEnabled:f,setIsAudioFxEnabled:H,lofiAmount:c,setLofiAmount:s,radioToneAmount:_,setRadioToneAmount:Q,bitCrushAmount:K,setBitCrushAmount:ue,sampleRateReductionAmount:pe,setSampleRateReductionAmount:Ae,noiseReductionAmount:j,setNoiseReductionAmount:xe,bassAmount:ve,setBassAmount:B,midAmount:I,setMidAmount:oe,trebleAmount:Ce,setTrebleAmount:Re,stereoWidthAmount:Te,setStereoWidthAmount:Pe,smallSpeakerRoomAmount:Le,setSmallSpeakerRoomAmount:Me,wowFlutterAmount:ke,setWowFlutterAmount:Xe,isNoiseEnabled:He,setIsNoiseEnabled:Ie,noiseLevel:Ee,setNoiseLevel:be,vinylDustAmount:we,setVinylDustAmount:Qe,delayAmount:De,setDelayAmount:Ve,reverbAmount:Se,setReverbAmount:Ue,chorusAmount:Be,setChorusAmount:Ke,tapeSaturationAmount:Fe,setTapeSaturationAmount:$e,compressorAmount:Oe,setCompressorAmount:l,fxOutputTrimAmount:R,setFxOutputTrimAmount:W,debugAudio:Ye,ensureAudioContext:_t,ensureInitialized:mt,updateAudioNodes:et,connectSourceNode:Zt,connectMediaAudio:Yt,reconnectCurrentMediaAudio:Jt,applyAudioSettings:_e,resetAudioSettings:Je,disposeAudioEngine:Qt}}const zn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,edgeBoost:1.5,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeCel:{label:"Anime Cel",width:640,height:360,colors:16,dither:0,palette:"anime",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.15,toonSteps:1,edgeBoost:.3,animeEdgeLow:.22,animeEdgeHigh:.66,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},tetorica:{label:"Tetorica",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,toonSteps:3,edgeBoost:1.5,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:8,edgeBoost:.22,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},jn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:t==="anime"?10:0,Vn=`#version 300 es
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
`,_n=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,vo=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Zn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),bo=640,to=()=>typeof performance<"u"?performance.now():Date.now(),oo=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Ao=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Xn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,xo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),bt=t=>({width:oo(t)?t.videoWidth:Ao(t)?t.naturalWidth:t.width,height:oo(t)?t.videoHeight:Ao(t)?t.naturalHeight:t.height}),Kn=(t,e,r)=>oo(t)&&(e>bo||r>bo),Ct=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),qn=t=>Ct(t)&&t.phosphorDotInternalScale?2:1,Yn=(t,e,r,n)=>{if(r===void 0||n===void 0||r<=0||n<=0)return{width:t,height:e};const o=r/n;return t/e>o?{width:Math.max(1,Math.round(e*o)),height:e}:{width:t,height:Math.max(1,Math.round(t/o))}},Jn=(t,e,r,n,o,u)=>{if(!Ct(r)||o===void 0||u===void 0||o<=0||u<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+r.bulbRadius*1.15),i=Math.max(1,h/Math.max(n,1)),m=Math.max(1,Math.floor(o/i)),D=Math.max(1,Math.floor(u/i)),E=Math.min(1,m/Math.max(t,1),D/Math.max(e,1));return{width:Math.max(1,Math.round(t*E)),height:Math.max(1,Math.round(e*E))}},no=(t,e,r,n,o)=>{const u=qn(t),h=Math.max(t.targetWidth,1),i=Math.max(t.targetHeight,1),m=t.matchTargetAspect?Yn(h,i,e,r):{width:h,height:i},D=m.width*u,E=m.height*u,b=Jn(D,E,t,u,n,o);return{width:b.width,height:b.height,sampleWidth:Math.max(1,Math.round(D)),sampleHeight:Math.max(1,Math.round(E)),internalScale:u,isPhosphorDotMode:Ct(t)}};function wo(t,e,r){const n=t.createShader(e);if(!n)throw new Error("Failed to create shader.");if(t.shaderSource(n,r),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(n)||"Unknown shader compile error.";throw t.deleteShader(n),new Error(o)}return n}function Co(t,e,r){const n=wo(t,t.VERTEX_SHADER,e),o=wo(t,t.FRAGMENT_SHADER,r),u=t.createProgram();if(!u)throw t.deleteShader(n),t.deleteShader(o),new Error("Failed to create WebGL program.");if(t.attachShader(u,n),t.attachShader(u,o),t.bindAttribLocation(u,0,"aPosition"),t.linkProgram(u),t.deleteShader(n),t.deleteShader(o),!t.getProgramParameter(u,t.LINK_STATUS)){const h=t.getProgramInfoLog(u)||"Unknown program link error.";throw t.deleteProgram(u),new Error(h)}return u}class Qn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=to();constructor(e){this.gl=e,this.filterProgram=Co(e,vo,Vn),this.passthroughProgram=Co(e,vo,_n);const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,Zn,e.STATIC_DRAW);const n=e.createVertexArray();e.bindVertexArray(n),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const o=e.createTexture();if(!o)throw new Error("Failed to create WebGL texture.");this.texture=o,e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uAnimeEdgeLow:e.getUniformLocation(this.filterProgram,"uAnimeEdgeLow"),uAnimeEdgeHigh:e.getUniformLocation(this.filterProgram,"uAnimeEdgeHigh"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=to()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const r=this.currentSource,n=this.currentFilterState;if(!this.outputEnabled||!r||!n)return;const o=this.getUploadSource(r,n);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const u=n.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),xo(o)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o.width,o.height,0,e.RGBA,e.UNSIGNED_BYTE,o.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),n.isFilterEnabled){const h=bt(r);this.applyFilterUniforms(n,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,r){if(xo(e)||!r.isFilterEnabled)return e;const n=bt(e);if(n.width<=0||n.height<=0||Kn(e,n.width,n.height))return e;const{width:o,height:u,sampleWidth:h,sampleHeight:i,isPhosphorDotMode:m}=no(r,n.width,n.height),D=Math.max(1,Math.round(m?h:o)),E=Math.max(1,Math.round(m?i:u)),b=this.ensureUploadContext();return!b||!this.uploadCanvas?e:(this.uploadCanvas.width!==D&&(this.uploadCanvas.width=D),this.uploadCanvas.height!==E&&(this.uploadCanvas.height=E),b.imageSmoothingEnabled=!0,b.imageSmoothingQuality="high",b.fillStyle="#000",b.fillRect(0,0,D,E),b.drawImage(e,0,0,D,E),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),r=e.getContext("2d",{alpha:!1,desynchronized:!0});return r?(this.uploadCanvas=e,this.uploadContext=r,r):null}applyFilterUniforms(e,r,n){const{gl:o}=this,u=Xn(o.canvas)?o.canvas:null,h=Math.max(u?.clientWidth??o.drawingBufferWidth,1),i=Math.max(u?.clientHeight??o.drawingBufferHeight,1),{width:m,height:D,sampleWidth:E,sampleHeight:b,isPhosphorDotMode:F}=no(e,r,n,h,i);o.useProgram(this.filterProgram),o.uniform2f(this.uniformLocations.uTargetSize,m,D),o.uniform2f(this.uniformLocations.uSampleTargetSize,E,b),o.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),o.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),o.uniform1f(this.uniformLocations.uPaletteMode,jn(e.paletteMode)),o.uniform1f(this.uniformLocations.uCurvature,e.curvature),o.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),o.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),o.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),o.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),o.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),o.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),o.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),o.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),o.uniform1f(this.uniformLocations.uAnimeEdgeLow,e.animeEdgeLow),o.uniform1f(this.uniformLocations.uAnimeEdgeHigh,e.animeEdgeHigh),o.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),o.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),o.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),o.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),o.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),o.uniform1f(this.uniformLocations.uPixelAspect,Math.max(o.drawingBufferWidth,1)*D/(Math.max(o.drawingBufferHeight,1)*m)),o.uniform1f(this.uniformLocations.uPhosphorDotMode,F?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),o.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),o.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),o.uniform3f(this.uniformLocations.uMonoTint,...zn[e.monoTint].rgb),o.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),o.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),o.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),o.uniform1f(this.uniformLocations.uTime,(to()-this.startedAt)/1e3)}}function $n({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:n,isPlayingRef:o,previewKindRef:u,debugVideo:h}){const i=a.useRef(null),m=a.useRef(null),D=a.useRef(null),E=a.useRef(null),b=a.useRef(null),F=a.useRef(null),x=a.useRef(null),N=a.useRef(null),q=a.useRef(()=>{}),$=a.useRef(t),ae=a.useRef(n),Y=a.useRef(!1),ee=a.useRef(null),z=a.useRef(null),S=a.useRef(null),[fe,y]=a.useState(!1),[A,te]=a.useState(null);$.current=t,ae.current=n;const Z=a.useCallback(f=>{te(H=>{const c=typeof f=="function"?f(H):f;return S.current=c,c})},[]),G=a.useCallback(()=>{const f=m.current,H=b.current;f&&(f.pipeline.setOutputEnabled(ae.current),f.pipeline.setSource(H),f.pipeline.setFilterState($.current),f.pipeline.render())},[]);a.useLayoutEffect(()=>{q.current=G},[G]);const de=a.useCallback(()=>{Y.current=!1,N.current!==null&&(window.cancelAnimationFrame(N.current),N.current=null)},[]),he=a.useCallback(()=>{if(Y.current)return;Y.current=!0;const f=()=>{if(!Y.current)return;if(q.current(),!(u.current==="video"||u.current==="capture"||u.current==="image"||o.current)){N.current=null,Y.current=!1;return}N.current=window.requestAnimationFrame(f)};N.current=window.requestAnimationFrame(f)},[o,u]),me=a.useCallback(()=>{G()},[G]),X=a.useCallback(()=>{G()},[G]),w=a.useCallback(()=>{G()},[G]),L=a.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),F.current={},G(),F.current),[G]),O=a.useCallback((f,H,c)=>{if(!f)return;const{width:s,height:_}=bt(c);if(s<=0||_<=0)return;const Q=i.current,K=Q?.clientWidth??f.canvas.width,ue=Q?.clientHeight??f.canvas.height,Ae=e==="width"?K/s:Math.min(K/s,ue/_),j=s*Ae,xe=_*Ae,ve=(K-j)/2,B=(ue-xe)/2,I={width:j,height:xe,x:ve,y:B},oe=S.current;return oe&&oe.width===I.width&&oe.height===I.height&&oe.x===I.x&&oe.y===I.y?oe:(S.current=I,Z(I),I)},[e,Z]),re=a.useCallback(()=>{b.current&&O(m.current,null,b.current)},[O]),ge=a.useCallback(()=>{G()},[G]),M=a.useCallback(()=>{const f=m.current,H=i.current;if(!f||!H)return;re();const c=S.current??{x:0,y:0,width:H.clientWidth,height:H.clientHeight},s=Math.max(1,Math.round(c.width)),_=Math.max(1,Math.round(c.height)),Q=$.current,K=b.current?bt(b.current):null,{width:ue,height:pe}=no(Q,K?.width,K?.height,s,_),Ae=Math.max(1,Math.round(s*Math.max(1,r))),j=Math.max(1,Math.round(_*Math.max(1,r))),xe=Math.max(1,Math.round(Math.max(1,ue)*Math.max(1,r))),ve=Math.max(1,Math.round(Math.max(1,pe)*Math.max(1,r))),B=Ct(Q),I=Q.isFilterEnabled&&B?Math.max(Ae,xe):Ae,oe=Q.isFilterEnabled&&B?Math.max(j,ve):j;f.canvas.width!==I&&(f.canvas.width=I),f.canvas.height!==oe&&(f.canvas.height=oe),f.canvas.style.position="absolute",f.canvas.style.left=`${Math.round(c.x)}px`,f.canvas.style.top=`${Math.round(c.y)}px`,f.canvas.style.width=`${s}px`,f.canvas.style.height=`${_}px`,f.canvas.style.imageRendering="pixelated",G()},[re,G,r]),J=a.useCallback(()=>{ee.current!==null&&(window.cancelAnimationFrame(ee.current),ee.current=null),z.current!==null&&(window.clearTimeout(z.current),z.current=null),ee.current=window.requestAnimationFrame(()=>{ee.current=null,M()}),z.current=window.setTimeout(()=>{z.current=null,M()},120)},[M]),v=a.useCallback(async()=>{if(!m.current){if(x.current){await x.current;return}x.current=(async()=>{const f=i.current;if(!f||m.current)return;const H=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:f.isConnected,hostWidth:f.clientWidth??null,hostHeight:f.clientHeight??null,resolution:r});const c=document.createElement("canvas");c.style.display="block",c.style.width="100%",c.style.height="100%",c.style.imageRendering="pixelated",c.style.background="#020617";const s=c.getContext("webgl2");if(!s)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-H)*10)/10});const _={canvas:c,pipeline:new Qn(s),ticker:{start:he,stop:de}},Q=i.current;if(!Q||Q!==f||!Q.isConnected)return;Q.style.position="relative",Q.appendChild(c),m.current=_,F.current={},y(!0),h("initWebGL:ready",{hostWidth:Q.clientWidth??null,hostHeight:Q.clientHeight??null,resolution:r}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-H)*10)/10}),M();const K=u.current==="video"||u.current==="capture"||u.current==="image"||o.current;n&&K&&he(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-H)*10)/10,shouldAnimateOnInit:K})})();try{await x.current}finally{x.current=null}}},[h,n,M,r,he,de]),U=a.useCallback(()=>{x.current=null,de(),ee.current!==null&&(window.cancelAnimationFrame(ee.current),ee.current=null),z.current!==null&&(window.clearTimeout(z.current),z.current=null);const f=m.current;f&&(f.pipeline.dispose(),f.canvas.remove()),m.current=null,F.current=null,Z(null),y(!1)},[de,Z]);return a.useEffect(()=>{const f=i.current;if(!f)return;if(typeof ResizeObserver<"u"){const c=new ResizeObserver(()=>{J()});return c.observe(f),()=>{c.disconnect()}}const H=()=>{J()};return window.addEventListener("resize",H),()=>{window.removeEventListener("resize",H)}},[J]),{canvasHostRef:i,appRef:m,spriteRef:D,textureRef:E,previewElementRef:b,filterRef:F,isRendererReady:fe,viewportRect:A,setViewportRect:Z,applyFilterState:me,createVideoTexture:f=>null,destroyPixi:U,fitCurrentSprite:re,fitSprite:O,initPixi:v,refreshLayout:M,resetFilterInstance:L,safeRender:ge,scheduleRefreshLayout:J,syncSpriteFilter:X,syncTexturePresentation:w}}const er=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),tr=()=>typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function or({appRef:t,spriteRef:e,textureRef:r,previewElementRef:n,mediaRef:o,objectUrlRef:u,streamRef:h,streamOwnedRef:i,previewRequestIdRef:m,isPlayingRef:D,previewKindRef:E,audioContextRef:b,mediaSourceRef:F,masterGainRef:x,noiseGainRef:N,isMutedRef:q,volumeRef:$,playbackRateRef:ae,isLoopingRef:Y,isAudioFxEnabled:ee,lofiAmount:z,bitCrushAmount:S,sampleRateReductionAmount:fe,bassAmount:y,midAmount:A,trebleAmount:te,stereoWidthAmount:Z,smallSpeakerRoomAmount:G,isMuted:de,volume:he,previewKind:me,setPreviewName:X,setPreviewError:w,setNeedsUserPlay:L,setIsPlaying:O,setCurrentTime:re,setDuration:ge,setPlaybackRate:M,setIsLooping:J,setSourceDimensions:v,setViewportRect:U,setPreviewKindState:f,setIsPoweredOn:H,beginLoading:c,finishLoading:s,ensureAudioContext:_,updateAudioNodes:Q,connectMediaAudio:K,fitSprite:ue,refreshLayout:pe,scheduleRefreshLayout:Ae,safeRender:j,resetFilterInstance:xe,initPixi:ve,resetPerfAccumulators:B,debugVideo:I,debugAudio:oe}){const Ce=async()=>{er()&&await new Promise(l=>{window.setTimeout(l,220)})},Re=()=>{const l=b.current?.currentTime;if(N.current)if(typeof l=="number"){const R=N.current.gain;R.cancelScheduledValues(l),R.setValueAtTime(R.value,l),R.linearRampToValueAtTime(0,l+.03)}else N.current.gain.value=0;if(x.current)if(typeof l=="number"){const R=x.current.gain;R.cancelScheduledValues(l),R.setValueAtTime(R.value,l),R.linearRampToValueAtTime(0,l+.03)}else x.current.gain.value=0},Te=()=>{N.current&&(N.current.gain.value=0)},Pe=l=>l instanceof DOMException&&(l.name==="NotAllowedError"||l.name==="AbortError")?!0:l instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(l.message):!1,Le=l=>Pe(l)?(s(),w(""),L(!0),be(),j(),!0):!1,Me=(l,R,W=!0)=>{Re(),l.muted=!0,l.volume=0,l.pause(),l.srcObject instanceof MediaStream&&(W&&l.srcObject.getTracks().forEach(V=>V.stop()),l.srcObject=null),l.src="",l.load(),R?.startsWith("blob:")&&URL.revokeObjectURL(R)},ke=l=>new Promise((R,W)=>{const V=ie=>ie?ie.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ie.code===MediaError.MEDIA_ERR_NETWORK?"network":ie.code===MediaError.MEDIA_ERR_DECODE?"decode":ie.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ie.code}`:"unknown",g=()=>{l.removeEventListener("loadeddata",T),l.removeEventListener("canplay",T),l.removeEventListener("error",ye)},T=()=>{g(),R()},ye=()=>{g(),W(new Error(`動画の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${V(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){R();return}l.addEventListener("loadeddata",T,{once:!0}),l.addEventListener("canplay",T,{once:!0}),l.addEventListener("error",ye,{once:!0}),l.load()}),Xe=l=>new Promise((R,W)=>{const V=ie=>ie?ie.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ie.code===MediaError.MEDIA_ERR_NETWORK?"network":ie.code===MediaError.MEDIA_ERR_DECODE?"decode":ie.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ie.code}`:"unknown",g=()=>{l.removeEventListener("loadedmetadata",T),l.removeEventListener("canplay",T),l.removeEventListener("error",ye)},T=()=>{g(),R()},ye=()=>{g(),W(new Error(`音声の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${V(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_METADATA){R();return}l.addEventListener("loadedmetadata",T,{once:!0}),l.addEventListener("canplay",T,{once:!0}),l.addEventListener("error",ye,{once:!0}),l.load()}),He=l=>new Promise((R,W)=>{const V=()=>{l.removeEventListener("load",g),l.removeEventListener("error",T)},g=()=>{V(),R()},T=()=>{V(),W(new Error("画像の読み込みに失敗しました。"))};if(l.complete&&l.naturalWidth>0&&l.naturalHeight>0){R();return}l.addEventListener("load",g,{once:!0}),l.addEventListener("error",T,{once:!0})}),Ie=l=>{l.addEventListener("play",be),l.addEventListener("pause",be),l.addEventListener("pause",Re),l.addEventListener("abort",Re),l.addEventListener("emptied",Re),l.addEventListener("loadstart",Re),l.addEventListener("seeking",Re),l.addEventListener("stalled",Re),l.addEventListener("suspend",Re),l.addEventListener("waiting",Re),l.addEventListener("volumechange",be),l.addEventListener("timeupdate",be),l.addEventListener("durationchange",be),l.addEventListener("seeked",be),l.addEventListener("ended",be),l.addEventListener("ratechange",be),l instanceof HTMLVideoElement&&l.addEventListener("resize",()=>{const R=l.videoWidth,W=l.videoHeight;R>0&&W>0&&(v({width:R,height:W}),Ae())})},Ee=l=>{l.loop=Y.current,l.muted=q.current,l.volume=q.current?0:$.current,l.playbackRate=ae.current,l.autoplay=!1,l.preload="auto",l.crossOrigin="anonymous",l instanceof HTMLVideoElement&&(l.playsInline=!0)},be=()=>{if(!o.current){I("syncVideoState:no-media",{previewKind:E.current,hasPreviewElement:!!n.current}),D.current=!1,O(!1),re(0),ge(0),Q(),j();return}D.current=!o.current.paused,O(!o.current.paused),o.current.paused||s(),re(o.current.currentTime),ge(o.current.duration||0),M(o.current.playbackRate||1),J(o.current.loop),Q(),j()},we=()=>{I("cleanupPreview:start",{previewKind:E.current,hasMedia:!!o.current,hasPreviewElement:!!n.current}),Re(),m.current+=1,s();const l=o.current,R=h.current,W=i.current;e.current=null,r.current=null,o.current=null,n.current=null,h.current=null,i.current=!1,F.current?.disconnect(),F.current=null,L(!1),D.current=!1,O(!1),re(0),ge(0),f(null),v(null),U(null),u.current?.startsWith("blob:")&&URL.revokeObjectURL(u.current),u.current=null,l?Me(l,void 0,W):W&&R?.getTracks().forEach(V=>V.stop()),j()},Qe=()=>{o.current&&(o.current.muted=!0,o.current.volume=0,o.current.pause()),Re(),we(),b.current?.state==="running"&&b.current.suspend()},De=()=>{H(!0),t.current?.ticker.start();try{B?.()}catch{}},Ve=async()=>{if(o.current)try{await _(),tr()&&F.current?(o.current.muted=!1,o.current.volume=0):(o.current.muted=q.current,o.current.volume=q.current?0:$.current),await o.current.play(),D.current=!0,O(!0),w(""),L(!1),oe("playVideoWithAudio",{audioContextState:b.current?.state,currentTime:o.current.currentTime,isAudioFxEnabled:ee,lofiAmount:z,bitCrushAmount:S,sampleRateReductionAmount:fe,bassAmount:y,midAmount:A,trebleAmount:te,stereoWidthAmount:Z,smallSpeakerRoomAmount:G,isMuted:de,volume:he}),Q(),be(),j(),Ae(),window.requestAnimationFrame(Q)}catch(l){if(s(),Pe(l)){L(!0),w("");return}L(!1),w(l instanceof Error?l.message:"音声付き再生を開始できませんでした。")}},Se=async()=>{if(await ve(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Ue=async(l,R)=>{const W=await Se();n.current=l,ue(W,null,l),f(R),v(l instanceof HTMLVideoElement?{width:l.videoWidth,height:l.videoHeight}:{width:l.naturalWidth,height:l.naturalHeight}),j(),pe(),Ae(),t.current?.ticker.start()},Be=async l=>{const R=l.type.startsWith("video/"),W=l.type.startsWith("audio/"),V=l.type.startsWith("image/");if(!R&&!W&&!V){w("動画、音声、または画像ファイルを選んでください。");return}De(),we(),xe();const g=m.current;w(""),X(l.name),c(R?"Loading video preview...":W?"Loading audio preview...":"Loading image preview...");let T=null;try{if(await Se(),T=URL.createObjectURL(l),u.current=T,R||W){const ie=R?document.createElement("video"):document.createElement("audio");if(ie.src=T,Ee(ie),Ie(ie),ie instanceof HTMLVideoElement?await ke(ie):await Xe(ie),g!==m.current){Me(ie,T);return}o.current=ie,ie instanceof HTMLVideoElement?await Ue(ie,"video"):(n.current=null,f("audio"),v(null),U(null),j()),await K(ie),be(),await Ce(),await Ve(),g===m.current&&s();return}const ye=new Image;if(ye.src=T,ye.crossOrigin="anonymous",await He(ye),g!==m.current){T.startsWith("blob:")&&URL.revokeObjectURL(T);return}o.current=null,Te(),Q(),await Ue(ye,"image"),be(),g===m.current&&s()}catch(ye){if(g!==m.current){T?.startsWith("blob:")&&URL.revokeObjectURL(T);return}if(Pe(ye)){Le(ye);return}we(),w(ye instanceof Error?ye.message:"動画プレビューに失敗しました。"),L(!1)}},Ke=async()=>{if(De(),!navigator.mediaDevices?.getDisplayMedia){w("このブラウザでは画面キャプチャーに対応していません。");return}we();const l=m.current;w(""),X("Display Capture"),c("Preparing display capture...");try{await Se();const R=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(l!==m.current){R.getTracks().forEach(V=>V.stop());return}const W=document.createElement("video");W.srcObject=R,Ee(W),Ie(W),R.getVideoTracks()[0]?.addEventListener("ended",()=>{Fe()}),await ke(W),h.current=R,i.current=!0,o.current=W,await Ue(W,"capture"),await K(W),L(!1),await Ce(),await Ve(),l===m.current&&s()}catch(R){if(l!==m.current||Le(R))return;we(),w(R instanceof Error?R.message:"画面キャプチャーを開始できませんでした。")}},Fe=()=>{me==="capture"&&(we(),X(""),w(""))};return{cleanupPreview:we,cleanupForPageLeave:Qe,playVideoWithAudio:Ve,previewFile:Be,previewStream:async(l,R="video",W="Media Stream")=>{let V=0;try{if(De(),we(),xe(),V=m.current,w(""),X(W),c(R==="video"?"Loading stream preview...":"Loading stream audio..."),await Se(),R==="video"){const g=document.createElement("video");if(g.srcObject=l,Ee(g),Ie(g),await ke(g),V!==m.current){Me(g,void 0,!1);return}h.current=l,i.current=!1,o.current=g,await Ue(g,"capture"),await K(g)}else{const g=document.createElement("audio");if(g.srcObject=l,Ee(g),Ie(g),await Xe(g),V!==m.current){Me(g,void 0,!1);return}h.current=l,i.current=!1,o.current=g,n.current=null,f("audio"),v(null),U(null),j(),await K(g),be()}if(V!==m.current)return;await Ce(),await Ve(),V===m.current&&s()}catch(g){if(V!==m.current||Le(g))return;we(),w(g instanceof Error?g.message:String(g))}},previewUrl:async(l,R="video")=>{let W=0;const V=typeof performance<"u"?performance.now():Date.now(),g=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-V)*10)/10;try{if(I("startup:previewUrl:start",{url:l,kind:R}),De(),we(),xe(),W=m.current,w(""),X(l),c(R==="video"?"Loading video preview...":R==="image"?"Loading image preview...":"Loading audio preview..."),await Se(),I("startup:previewUrl:renderer-ready",{kind:R,elapsedMs:g()}),R==="video"){const T=document.createElement("video");if(T.src=l,Ee(T),Ie(T),await ke(T),I("startup:previewUrl:video-ready",{elapsedMs:g(),readyState:T.readyState,videoWidth:T.videoWidth,videoHeight:T.videoHeight}),W!==m.current){Me(T,l);return}o.current=T,await Ue(T,"video"),await K(T),be()}else if(R==="image"){const T=new Image;if(T.src=l,T.crossOrigin="anonymous",await He(T),I("startup:previewUrl:image-ready",{elapsedMs:g(),naturalWidth:T.naturalWidth,naturalHeight:T.naturalHeight}),W!==m.current)return;o.current=null,Te(),Q(),await Ue(T,"image"),be()}else{const T=document.createElement("audio");if(T.src=l,Ee(T),Ie(T),await Xe(T),I("startup:previewUrl:audio-ready",{elapsedMs:g(),readyState:T.readyState,duration:T.duration}),W!==m.current){Me(T,l);return}n.current=null,f("audio"),v(null),U(null),o.current=T,j(),await K(T),be()}if(W!==m.current)return;(R==="video"||R==="audio")&&(await Ce(),await Ve()),W===m.current&&(s(),I("startup:previewUrl:done",{kind:R,elapsedMs:g()}))}catch(T){if(I("startup:previewUrl:error",{kind:R,elapsedMs:g(),error:T instanceof Error?T.message:String(T)}),W!==m.current||Le(T))return;we(),w(T instanceof Error?T.message:String(T))}},startDisplayCapture:Ke,stopDisplayCapture:Fe,syncVideoState:be,releaseDetachedMedia:Me,ensurePixiReady:Se}}let nr=0;const So=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),yo=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),rr=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function ir(t,e,r=1){const n=a.useRef(`player-${nr+=1}`),o=a.useRef(null),u=a.useRef(null),h=a.useRef(!1),i=a.useRef(null),m=a.useRef(null),D=a.useRef([]),E=a.useRef(null),b=a.useRef(null),F=a.useRef(null),x=a.useRef(null),N=a.useRef(null),q=a.useRef(0),$=a.useRef(!1),ae=a.useRef(null),Y=a.useRef(!1),[ee,z]=a.useState(""),[S,fe]=a.useState(""),[y,A]=a.useState(!0),[te,Z]=a.useState(""),[G,de]=a.useState(!1),[he,me]=a.useState(!1),[X,w]=a.useState(!1),[L,O]=a.useState(0),[re,ge]=a.useState(0),[M,J]=a.useState(null),[v,U]=a.useState(null),[f,H]=a.useState(!1),[c,s]=a.useState(null),_=(C,P)=>{if(!rr())return;const se=P?` ${JSON.stringify(P)}`:"";console.log(`[retro-player video][${n.current}] ${C}${se}`)},Q=$n({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:y,isPlayingRef:$,previewKindRef:ae,debugVideo:_}),{canvasHostRef:K,appRef:ue,spriteRef:pe,textureRef:Ae,previewElementRef:j,filterRef:xe,isRendererReady:ve,viewportRect:B,setViewportRect:I,applyFilterState:oe,destroyPixi:Ce,fitSprite:Re,initPixi:Te,refreshLayout:Pe,resetFilterInstance:Le,safeRender:Me,scheduleRefreshLayout:ke,syncSpriteFilter:Xe,syncTexturePresentation:He}=Q,Ie=a.useRef(Te),Ee=a.useRef(Ce),be=a.useRef(()=>{}),we=a.useRef(()=>{}),Qe=On({instanceLabel:n.current,previewKind:M,previewKindRef:ae,mediaRef:i,isPlaying:X,isPlayingRef:$}),{audioContextRef:De,mediaSourceRef:Ve,masterGainRef:Se,recordingDestinationRef:Ue,noiseGainRef:Be,isMutedRef:Ke,volumeRef:Fe,playbackRateRef:$e,isLoopingRef:Oe,isMuted:l,setIsMuted:R,playbackRate:W,setPlaybackRate:V,volume:g,setVolume:T,isLooping:ye,setIsLooping:ie,isAudioFxEnabled:rt,setIsAudioFxEnabled:St,lofiAmount:it,setLofiAmount:yt,radioToneAmount:Rt,setRadioToneAmount:Tt,bitCrushAmount:st,setBitCrushAmount:Lt,sampleRateReductionAmount:at,setSampleRateReductionAmount:Dt,noiseReductionAmount:Et,setNoiseReductionAmount:Mt,bassAmount:lt,setBassAmount:Bt,midAmount:ct,setMidAmount:Pt,trebleAmount:ut,setTrebleAmount:kt,stereoWidthAmount:dt,setStereoWidthAmount:It,smallSpeakerRoomAmount:ht,setSmallSpeakerRoomAmount:Ft,wowFlutterAmount:Gt,setWowFlutterAmount:Nt,isNoiseEnabled:Wt,setIsNoiseEnabled:Ht,noiseLevel:Ut,setNoiseLevel:Ot,vinylDustAmount:zt,setVinylDustAmount:jt,delayAmount:Vt,setDelayAmount:Ye,reverbAmount:mt,setReverbAmount:_t,chorusAmount:et,setChorusAmount:Zt,tapeSaturationAmount:Xt,setTapeSaturationAmount:gt,compressorAmount:Kt,setCompressorAmount:qt,fxOutputTrimAmount:Yt,setFxOutputTrimAmount:Jt,debugAudio:Qt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,reconnectCurrentMediaAudio:ze,applyAudioSettings:Ze,resetAudioSettings:Bo,disposeAudioEngine:so}=Qe;a.useEffect(()=>{Ie.current=Te,Ee.current=Ce},[Te,Ce]);const Po=C=>{ae.current=C,J(C)},ko=C=>{Z(C),de(!0)},tt=()=>{de(!1),Z("")},ao=()=>{A(!0),ue.current?.ticker.start()},Io=()=>{i.current&&i.current.pause(),Be.current&&(Be.current.gain.value=0),Se.current&&(Se.current.gain.value=0),tt(),me(!1),A(!1),ue.current?.ticker.stop(),qe()},Fo=or({filterState:t,appRef:ue,spriteRef:pe,textureRef:Ae,previewElementRef:j,filterRef:xe,mediaRef:i,objectUrlRef:o,streamRef:u,streamOwnedRef:h,previewRequestIdRef:q,isPlayingRef:$,previewKindRef:ae,audioContextRef:De,mediaSourceRef:Ve,masterGainRef:Se,noiseGainRef:Be,isMutedRef:Ke,volumeRef:Fe,playbackRateRef:$e,isLoopingRef:Oe,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:st,sampleRateReductionAmount:at,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,isMuted:l,volume:g,previewKind:M,setPreviewName:z,setPreviewError:fe,setNeedsUserPlay:me,setIsPlaying:w,setCurrentTime:O,setDuration:ge,setPlaybackRate:V,setIsLooping:ie,setSourceDimensions:U,setViewportRect:I,setPreviewKindState:Po,setIsPoweredOn:A,beginLoading:ko,finishLoading:tt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,fitSprite:Re,refreshLayout:Pe,scheduleRefreshLayout:ke,safeRender:Me,resetFilterInstance:Le,initPixi:Te,debugVideo:_,debugAudio:Qt}),{cleanupPreview:lo,cleanupForPageLeave:Go,playVideoWithAudio:co,previewFile:No,previewStream:Wo,previewUrl:Ho,startDisplayCapture:Uo,stopDisplayCapture:Oo,syncVideoState:qe}=Fo;a.useEffect(()=>{be.current=lo},[lo]),a.useEffect(()=>{we.current=so},[so]);const uo=async()=>{if(i.current){if(i.current.paused){y||ao(),await co(),qe();return}i.current.pause(),qe()}},zo=()=>{i.current&&R(C=>{const P=!C;return Ke.current=P,window.requestAnimationFrame(Je),P})},ot=C=>{i.current&&(i.current.currentTime=C,O(C))},jo=C=>{if(!i.current)return;const P=1/30,se=Math.max(0,Math.min(i.current.currentTime+P*C,i.current.duration||i.current.currentTime+P));i.current.pause(),i.current.currentTime=se,qe()},Vo=C=>{i.current&&(i.current.playbackRate=C,$e.current=C,V(C))},_o=C=>{i.current&&(Fe.current=C,Ke.current=C===0,T(C),R(C===0),window.requestAnimationFrame(Je))},Zo=()=>{i.current&&(i.current.loop=!i.current.loop,Oe.current=i.current.loop,ie(i.current.loop))},Xo=C=>{Oe.current=C,ie(C),i.current&&(i.current.loop=C)},pt=()=>{if(!b.current||typeof window>"u"){F.current=null,x.current=null;return}window.URL.revokeObjectURL(b.current),b.current=null,F.current=null,x.current=null},Ko=(C,P)=>{if(typeof document>"u")return;const se=document.createElement("a");se.href=C,se.download=P,se.rel="noopener",se.style.display="none",document.body.appendChild(se),se.click(),window.setTimeout(()=>{se.remove()},0)},qo=(C,P)=>{if(typeof window>"u"||C.length===0)return null;pt();const se=new Blob(C,{type:P||"video/webm"}),je=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ne=window.URL.createObjectURL(se);return b.current=Ne,F.current=se,x.current=je,s(je),je},Yo=()=>{const C=b.current,P=x.current;!C||!P||typeof window>"u"||(Ko(C,P),window.setTimeout(()=>{pt()},1e3),s(null))},Jo=async()=>{const C=F.current,P=x.current;if(!C||!P||typeof window>"u")return!1;if(So()){const je=new Uint8Array(await C.arrayBuffer()),Ne=await Eo("persist_recording_for_share",{data:Array.from(je),filename:P});return await Rn(Ne,{mimeType:C.type||"video/webm",title:P}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Ge={files:[new File([C],P,{type:C.type||"video/webm"})],title:P};return typeof navigator.canShare=="function"&&!navigator.canShare(Ge)?!1:(await navigator.share(Ge),!0)},Qo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(P=>MediaRecorder.isTypeSupported(P))??"",$o=async()=>{const C=ue.current?.canvas;if(!(C instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await _e();const P=new MediaStream;C.captureStream(30).getVideoTracks().forEach(Ne=>P.addTrack(Ne)),Ue.current?.stream.getAudioTracks().forEach(Ne=>P.addTrack(Ne.clone()));const Ge=Qo(),je=Ge?new MediaRecorder(P,{mimeType:Ge}):new MediaRecorder(P);D.current=[],pt(),s(null),E.current=P,m.current=je,je.addEventListener("dataavailable",Ne=>{Ne.data.size>0&&D.current.push(Ne.data)}),je.addEventListener("stop",()=>{const Ne=qo(D.current,je.mimeType);D.current=[],E.current?.getTracks().forEach(en=>en.stop()),E.current=null,m.current=null,H(!1),_e(),N.current?.(Ne),N.current=null},{once:!0}),je.start(),H(!0)},ho=(C=!0)=>{const P=m.current;return P?new Promise(se=>{if(N.current=se,C||(D.current=[]),P.state!=="inactive"){P.stop();return}E.current?.getTracks().forEach(Ge=>Ge.stop()),E.current=null,m.current=null,H(!1),N.current?.(x.current),N.current=null}):Promise.resolve(x.current)};return a.useEffect(()=>{let C=!1;return(async()=>(_("startup:setupPixi-effect:start",{renderResolutionScale:r}),await Ie.current(),C&&Ee.current()))(),()=>{pt(),ho(!1),C=!0,Ee.current()}},[r]),a.useEffect(()=>()=>{be.current(),we.current()},[]),a.useEffect(()=>{const C=()=>{Go()};return window.addEventListener("beforeunload",C),()=>{window.removeEventListener("beforeunload",C)}},[]),a.useEffect(()=>{const C=()=>{i.current&&(i.current.muted=!0,i.current.volume=0,i.current.pause(),qe())};return window.addEventListener(mo,C),()=>{window.removeEventListener(mo,C)}},[qe]),a.useEffect(()=>{if(!yo())return;const C=se=>se==="video"||se==="audio"||se==="capture",P=()=>{const se=i.current;if(!(!se||!C(ae.current))){if(document.visibilityState==="hidden"){Y.current=!se.paused,se.pause(),$.current=!1,w(!1),Be.current&&(Be.current.gain.value=0),Se.current&&(Se.current.gain.value=0),De.current?.state==="running"&&De.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await _e(),ze(),Je(),Y.current&&i.current)try{await i.current.play(),me(!1)}catch(Ge){Ge instanceof DOMException&&Ge.name==="NotAllowedError"&&me(!0)}}finally{qe(),Y.current=!1}})()},80)}};return document.addEventListener("visibilitychange",P),()=>{document.removeEventListener("visibilitychange",P)}},[De,_e,Se,Be,ze,qe,Je]),a.useLayoutEffect(()=>{oe(),Xe(),He(),Pe()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,Pe]),a.useEffect(()=>{if(S||he){tt();return}if(M==="image"||M==="audio"){tt();return}X&&tt()},[S,he,M,X]),a.useEffect(()=>{$.current=X;const C=(M==="video"||M==="capture")&&i.current?.tagName==="VIDEO",P=!i.current||Math.abs(i.current.currentTime)<.05,se=i.current?.ended??!1;C&&tt(),C&&!X&&!S&&!se&&(De.current?.state==="suspended"||P)&&me(!0)},[De,X,S,M]),a.useEffect(()=>{const C=P=>{if(!i.current)return;const se=P.target;if(!(se instanceof HTMLInputElement||se instanceof HTMLTextAreaElement||se?.isContentEditable)){if(P.code==="Space"||P.code==="KeyK"){P.preventDefault(),uo();return}if(P.code==="KeyJ"){P.preventDefault(),ot(Math.max(i.current.currentTime-10,0));return}if(P.code==="KeyL"){P.preventDefault(),ot(Math.min(i.current.currentTime+10,i.current.duration||i.current.currentTime+10));return}if(P.code==="ArrowLeft"){P.preventDefault(),ot(Math.max(i.current.currentTime-5,0));return}P.code==="ArrowRight"&&(P.preventDefault(),ot(Math.min(i.current.currentTime+5,i.current.duration||i.current.currentTime+5)))}};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),{canvasHostRef:K,previewName:ee,previewError:S,isRendererReady:ve,loadingLabel:te,isLoading:G,needsUserPlay:he,isPlaying:X,isMuted:l,currentTime:L,duration:re,playbackRate:W,volume:g,isLooping:ye,sourceDimensions:v,viewportRect:B,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:Rt,bitCrushAmount:st,sampleRateReductionAmount:at,noiseReductionAmount:Et,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,wowFlutterAmount:Gt,isNoiseEnabled:Wt,noiseLevel:Ut,vinylDustAmount:zt,delayAmount:Vt,reverbAmount:mt,chorusAmount:et,tapeSaturationAmount:Xt,setTapeSaturationAmount:gt,compressorAmount:Kt,setCompressorAmount:qt,fxOutputTrimAmount:Yt,setFxOutputTrimAmount:Jt,hasPlayableMedia:M==="video"||M==="audio"||M==="capture",hasVideo:M==="video"||M==="capture",hasAudioOnly:M==="audio",hasImage:M==="image",isRecording:f,pendingRecordingFilename:c,prefersShareExport:So()&&yo(),isCaptureActive:M==="capture",canRecord:M==="video"||M==="capture"||M==="image"||M==="audio",previewFile:No,previewStream:Wo,previewUrl:Ho,startDisplayCapture:Uo,stopDisplayCapture:Oo,togglePlayback:uo,toggleMute:zo,seekTo:ot,stepFrame:jo,changePlaybackRate:Vo,changeVolume:_o,toggleLoop:Zo,setLoopingEnabled:Xo,applyAudioSettings:Ze,resetAudioSettings:Bo,playVideoWithAudio:co,isPoweredOn:y,powerOn:ao,powerOff:Io,downloadPendingRecording:Yo,sharePendingRecording:Jo,startRecording:$o,stopRecording:ho,ensureAudioContext:_e,refreshLayout:Pe,toggleAudioFx:()=>{St(C=>!C)},setLofiAmount:yt,setRadioToneAmount:Tt,setBitCrushAmount:Lt,setSampleRateReductionAmount:Dt,setNoiseReductionAmount:Mt,setBassAmount:Bt,setMidAmount:Pt,setTrebleAmount:kt,setStereoWidthAmount:It,setSmallSpeakerRoomAmount:Ft,setWowFlutterAmount:Nt,toggleNoise:()=>{Ht(C=>!C)},setNoiseLevel:Ot,setVinylDustAmount:jt,setDelayAmount:Ye,setReverbAmount:_t,setChorusAmount:Zt}}const le=nt.tetorica,Ro=(t,e,r)=>((r?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&(e.animeEdgeLow??.08)===t.animeEdgeLow&&(e.animeEdgeHigh??.55)===t.animeEdgeHigh&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,vt=t=>{for(const[e,r]of Object.entries(nt))if(Ro(t,r))return e;if(!t.matchTargetAspect)return null;for(const[e,r]of Object.entries(nt))if(Ro(t,r,{ignoreDimensions:!0}))return e;return null},sr=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function ar(t={}){const[e]=a.useState(()=>({targetWidth:t.targetWidth??le.width,targetHeight:t.targetHeight??le.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??le.colors,ditherStrength:t.ditherStrength??le.dither,paletteMode:t.paletteMode??le.palette,curvature:t.curvature??le.curvature,scanlineStrength:t.scanlineStrength??le.scanline,scanline2Strength:t.scanline2Strength??le.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??le.vignette,glowStrength:t.glowStrength??le.glow,smoothStrength:t.smoothStrength??le.smoothStrength??0,toonSteps:t.toonSteps??le.toonSteps,edgeBoost:t.edgeBoost??le.edgeBoost,animeEdgeLow:t.animeEdgeLow??le.animeEdgeLow,animeEdgeHigh:t.animeEdgeHigh??le.animeEdgeHigh,phosphorStrength:t.phosphorStrength??le.phosphor,spotMaskStrength:t.spotMaskStrength??le.spotMask,bulbRadius:t.bulbRadius??le.bulbRadius,blackFloor:t.blackFloor??le.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??le.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??le.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??le.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??le.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??le.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??le.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??le.monoTint,neonBoost:t.neonBoost??le.neonBoost,neonSaturation:t.neonSaturation??le.neonSaturation,neonDetail:t.neonDetail??le.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[r]=a.useState(()=>({...e,...wt()?.filter,...t})),[n,o]=a.useState(r),[u,h]=a.useState(vt(r)),i=c=>{h(null),o(s=>s.targetWidth===c?s:{...s,targetWidth:c})},m=c=>{h(null),o(s=>s.targetHeight===c?s:{...s,targetHeight:c})},D=c=>{h(null),o(s=>s.matchTargetAspect===c?s:{...s,matchTargetAspect:c})},E=c=>{h(null),o(s=>({...s,colorLevels:c}))},b=c=>{h(null),o(s=>({...s,ditherStrength:c}))},F=c=>{h(null),o(s=>({...s,paletteMode:c,colorLevels:sr(c,s.colorLevels)}))},x=c=>{h(null),o(s=>({...s,curvature:c}))},N=c=>{h(null),o(s=>({...s,scanlineStrength:c}))},q=c=>{h(null),o(s=>({...s,scanline2Strength:c}))},$=c=>{h(null),o(s=>({...s,scanlineBrightnessFade:c}))},ae=c=>{h(null),o(s=>({...s,vignetteStrength:c}))},Y=c=>{h(null),o(s=>({...s,glowStrength:c}))},ee=c=>{h(null),o(s=>({...s,smoothStrength:c}))},z=c=>{h(null),o(s=>({...s,toonSteps:c}))},S=c=>{h(null),o(s=>({...s,edgeBoost:c}))},fe=c=>{h(null),o(s=>({...s,animeEdgeLow:c}))},y=c=>{h(null),o(s=>({...s,animeEdgeHigh:c}))},A=c=>{h(null),o(s=>({...s,phosphorStrength:c}))},te=c=>{h(null),o(s=>({...s,spotMaskStrength:c}))},Z=c=>{h(null),o(s=>({...s,bulbRadius:c}))},G=c=>{h(null),o(s=>({...s,blackFloor:c}))},de=c=>{h(null),o(s=>({...s,phosphorDotLightBalance:c}))},he=c=>{h(null),o(s=>({...s,phosphorDotInternalScale:c}))},me=c=>{h(null),o(s=>({...s,phosphorDotBrightCore:c}))},X=c=>{h(null),o(s=>({...s,phosphorDotCellFill:c}))},w=c=>{h(null),o(s=>({...s,phosphorDotFlatDisc:c}))},L=c=>{h(null),o(s=>({...s,phosphorDotNeighborBlend:c}))},O=c=>{h(null),o(s=>({...s,closeUpNoiseStrength:c}))},re=c=>{h(null),o(s=>({...s,monoTint:c}))},ge=c=>{h(null),o(s=>({...s,neonBoost:c}))},M=c=>{h(null),o(s=>({...s,neonSaturation:c}))},J=c=>{h(null),o(s=>({...s,neonDetail:c}))},v=c=>{o(s=>({...s,isFilterEnabled:c}))},U=c=>{const s=nt[c];h(c),o(_=>({..._,targetWidth:s.width,targetHeight:s.height,colorLevels:s.colors,ditherStrength:s.dither,paletteMode:s.palette,curvature:s.curvature,scanlineStrength:s.scanline,scanline2Strength:s.scanline2,vignetteStrength:s.vignette,glowStrength:s.glow,smoothStrength:s.smoothStrength??0,toonSteps:s.toonSteps??0,edgeBoost:s.edgeBoost??0,animeEdgeLow:s.animeEdgeLow??.08,animeEdgeHigh:s.animeEdgeHigh??.55,phosphorStrength:s.phosphor,spotMaskStrength:s.spotMask,bulbRadius:s.bulbRadius,blackFloor:s.blackFloor,phosphorDotLightBalance:s.phosphorDotLightBalance??1,phosphorDotInternalScale:s.phosphorDotInternalScale??!1,phosphorDotBrightCore:s.phosphorDotBrightCore??!1,phosphorDotCellFill:s.phosphorDotCellFill??0,phosphorDotFlatDisc:s.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:s.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:s.closeUpNoiseStrength??0,scanlineBrightnessFade:s.scanlineBrightnessFade??.6,monoTint:s.monoTint,neonBoost:s.neonBoost,neonSaturation:s.neonSaturation,neonDetail:s.neonDetail,isFilterEnabled:!0}))},f=c=>{h(vt(c)),o(c)},H=()=>{h(vt(e)),o(e)};return a.useEffect(()=>{const c=setTimeout(()=>{Tn(n)},300);return()=>clearTimeout(c)},[n]),a.useEffect(()=>{const c=vt(n);h(s=>s===c?s:c)},[n]),{...n,selectedPreset:u,setTargetWidth:i,setTargetHeight:m,setMatchTargetAspect:D,setColorLevels:E,setDitherStrength:b,setPaletteMode:F,setCurvature:x,setScanlineStrength:N,setScanline2Strength:q,setScanlineBrightnessFade:$,setVignetteStrength:ae,setGlowStrength:Y,setSmoothStrength:ee,setToonSteps:z,setEdgeBoost:S,setAnimeEdgeLow:fe,setAnimeEdgeHigh:y,setPhosphorStrength:A,setSpotMaskStrength:te,setBulbRadius:Z,setBlackFloor:G,setPhosphorDotLightBalance:de,setPhosphorDotInternalScale:he,setPhosphorDotBrightCore:me,setPhosphorDotCellFill:X,setPhosphorDotFlatDisc:w,setPhosphorDotNeighborBlend:L,setCloseUpNoiseStrength:O,setMonoTint:re,setNeonBoost:ge,setNeonSaturation:M,setNeonDetail:J,setIsFilterEnabled:v,applyAllFilterSettings:f,applyPreset:U,resetSettings:H}}function lr({locale:t,src:e,kind:r,player:n,isHighResolution:o,isFitWidthEnabled:u,controlPanelMode:h,confirmDialog:i,onHighResolutionChange:m,onFitWidthChange:D,onError:E}){const b=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},F=k.useMemo(()=>wt()?.ui,[]),[x,N]=k.useState(F?.isPreviewMaximized??!1),[q,$]=k.useState(!1),[ae,Y]=k.useState(!1),[ee,z]=k.useState(0),[S,fe]=k.useState(null),[y,A]=k.useState(F?.brightness??1),[te,Z]=k.useState(F?.flipH??!1),[G,de]=k.useState(F?.flipV??!1),[he,me]=k.useState(!1),[X,w]=k.useState(()=>typeof window<"u"&&window.innerWidth<360),[L,O]=k.useState(null),re=k.useRef(null),ge=k.useRef(null),M=k.useRef(null),J=k.useRef(null),v=k.useCallback(()=>{const B=re.current,I=M.current;if(!B||!I)return null;const oe=B.getBoundingClientRect(),Ce=I.getBoundingClientRect();return{left:oe.left,width:oe.width,height:Ce.height}},[]),U=k.useCallback(B=>{J.current!==null&&window.clearTimeout(J.current),J.current=window.setTimeout(()=>{fe(B),J.current=null},120)},[]),f=k.useCallback(()=>{J.current!==null&&(window.clearTimeout(J.current),J.current=null),fe(null)},[]);k.useEffect(()=>{Dn({isPreviewMaximized:x,isHighResolution:o,brightness:y,flipH:te,flipV:G})},[o,x,y,te,G]),k.useEffect(()=>()=>{J.current!==null&&window.clearTimeout(J.current)},[]),k.useEffect(()=>{const B=()=>{w(window.innerWidth<360)};return window.addEventListener("resize",B,{passive:!0}),()=>{window.removeEventListener("resize",B)}},[]),k.useEffect(()=>{if(!x)return;const B=document.body.style.overflow,I=oe=>{oe.code==="Escape"&&N(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",I),()=>{document.body.style.overflow=B,window.removeEventListener("keydown",I)}},[x]),k.useEffect(()=>{x&&($(!1),Y(!1),z(0),O(null))},[x]),k.useEffect(()=>{u&&($(!1),Y(!1),z(0),O(null))},[u]),k.useEffect(()=>{if(h==="playback"||x||q||u){Y(!1),z(0);return}const B=()=>{const I=ge.current,oe=M.current;if(!I||!oe)return;const Ce=I.getBoundingClientRect().top,Re=oe.getBoundingClientRect().height,Te=Math.round(Math.min(Re,window.innerHeight)*.4),Pe=-Math.max(120,Te);Y(Le=>{if(!Le&&Ce<=Pe){z(Math.max(120,Te));const Me=v();return Me&&O(Me),!0}return Le&&z(Math.max(120,Te)),Le&&Ce>=-24?(z(0),!1):Le})};return B(),window.addEventListener("scroll",B,{passive:!0}),window.addEventListener("resize",B),()=>{window.removeEventListener("scroll",B),window.removeEventListener("resize",B)}},[h,u,x,q,v]),k.useEffect(()=>{if(!((q||ae)&&!x)){O(null);return}const I=()=>{const oe=v();oe&&O(oe)};return I(),window.addEventListener("resize",I),window.addEventListener("scroll",I,{passive:!0}),()=>{window.removeEventListener("resize",I),window.removeEventListener("scroll",I)}},[ae,x,q,u,v,n.sourceDimensions]),k.useEffect(()=>{n.refreshLayout()},[q,x,n.refreshLayout,n.sourceDimensions?.height,n.sourceDimensions?.width]);const H=r==="image"&&!!e&&!n.previewError&&(!n.isRendererReady||n.isLoading),c="60vh",s=k.useMemo(()=>{if(n.sourceDimensions)return`${n.sourceDimensions.width} / ${n.sourceDimensions.height}`},[n.sourceDimensions]),_=(q||ae)&&!x,Q=ae?`calc(max(0.0rem, env(safe-area-inset-top)) - ${ee}px)`:void 0,K="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",ue="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",pe="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",Ae="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",j=(B,I,oe="w-44")=>p.jsx("div",{role:"tooltip","aria-hidden":S!==B,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",oe,S===B?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:I}),xe=()=>{f(),(async()=>{if(n.isRecording){try{if(!await n.stopRecording())return;const I=await i({title:"Recording ready",body:n.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:n.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(n.ensureAudioContext(),!I)return;if(n.prefersShareExport){await n.sharePendingRecording()||n.downloadPendingRecording();return}n.downloadPendingRecording()}catch(B){E?.(B instanceof Error?B:new Error(String(B)))}return}try{await n.startRecording()}catch(B){E?.(B instanceof Error?B:new Error(String(B)))}})()},ve=()=>p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":"More options",onClick:()=>{f(),me(B=>!B)},className:[K,he||y!==1||te||G?ue:pe].join(" "),children:p.jsx(un,{size:16})}),he&&p.jsxs("div",{className:"absolute bottom-full left-0 mb-2 w-52 rounded-xl border border-slate-600/80 bg-slate-950/96 p-3 shadow-xl backdrop-blur-sm",children:[X&&n.canRecord&&p.jsx("div",{className:"mb-3 border-b border-slate-700 pb-3",children:p.jsxs("button",{type:"button",onClick:xe,className:["inline-flex w-full min-h-9 items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition",n.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:[n.isRecording?p.jsx(po,{size:13,className:"fill-current animate-pulse"}):p.jsx(go,{size:13,className:"text-rose-300"}),n.isRecording?"Stop REC":"Record"]})}),p.jsxs("div",{className:"mb-3",children:[p.jsxs("div",{className:"mb-1.5 flex items-center justify-between text-[11px] text-slate-400",children:[p.jsxs("span",{className:"flex items-center gap-1.5",children:[p.jsx(yn,{size:11}),"Brightness"]}),p.jsxs("span",{children:[Math.round(y*100),"%"]})]}),p.jsx("input",{type:"range",min:"0.4",max:"2.0",step:"0.05",value:y,onChange:B=>{A(Number(B.currentTarget.value))},className:"w-full"})]}),p.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[p.jsxs("button",{type:"button",onClick:()=>{Z(B=>!B)},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",te?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[p.jsx(An,{size:13}),"Flip H"]}),p.jsxs("button",{type:"button",onClick:()=>{de(B=>!B)},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",G?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[p.jsx(wn,{size:13}),"Flip V"]})]})]})]}),n.canRecord&&!X&&p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":n.isRecording?"Stop recording":"Start recording",onClick:xe,onMouseEnter:()=>U("record"),onMouseLeave:f,onFocus:()=>U("record"),onBlur:f,className:[Ae,n.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:n.isRecording?p.jsx(po,{size:14,className:"fill-current animate-pulse"}):p.jsx(go,{size:16,className:"text-rose-300"})}),j("record",n.isRecording?b.recordStop:b.recordIdle)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":n.isPoweredOn?"Power off":"Power on",onClick:()=>{if(f(),n.isPoweredOn){n.powerOff();return}n.powerOn()},onMouseEnter:()=>U("power"),onMouseLeave:f,onFocus:()=>U("power"),onBlur:f,className:[K,n.isPoweredOn?ue:pe].join(" "),children:p.jsx(vn,{size:16})}),j("power",n.isPoweredOn?b.powerOff:b.powerOn)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":o?"Disable high resolution":"Enable high resolution",onClick:()=>{f(),m(!o)},onMouseEnter:()=>U("hi-res"),onMouseLeave:f,onFocus:()=>U("hi-res"),onBlur:f,className:[K,o?ue:pe].join(" "),children:p.jsx(rn,{size:16})}),j("hi-res",b.hiRes)]}),p.jsxs("div",{className:"flex items-center",children:[p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":u?"Disable fit width":"Enable fit width",onClick:()=>{f(),D(!u)},onMouseEnter:()=>U("fit-width"),onMouseLeave:f,onFocus:()=>U("fit-width"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-l-full border-t border-b border-l border-r-0 text-sm transition backdrop-blur-sm",u?ue:pe].join(" "),children:p.jsx(an,{size:16})}),j("fit-width",u?b.fitWidthOn:b.fitWidthOff)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":_?"Unpin preview":"Pin preview",onClick:()=>{f(),!(x||u)&&$(B=>{if(!B){const oe=v();return oe&&O(oe),!0}return Y(!1),z(0),O(null),!1})},onMouseEnter:()=>U("pin"),onMouseLeave:f,onFocus:()=>U("pin"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",x||u?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":_?ue:pe].join(" "),disabled:x||u,children:p.jsx(pn,{size:16})}),j("pin",x?b.pinUnavailable:u?b.pinUnavailableFitWidth:_?b.pinOn:b.pinOff)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":x?"Exit maximize":"Maximize preview",onClick:()=>{f(),N(B=>!B)},onMouseEnter:()=>U("maximize"),onMouseLeave:f,onFocus:()=>U("maximize"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-r-full border-t border-b border-r border-l-0 text-sm transition backdrop-blur-sm",x?ue:pe].join(" "),children:x?p.jsx($t,{size:16}):p.jsx(hn,{size:16})}),j("maximize",x?b.maximizeOn:b.maximizeOff)]})]})]});return p.jsxs("div",{ref:re,className:"space-y-4",children:[p.jsx("div",{ref:ge,"aria-hidden":"true"}),p.jsxs("div",{ref:M,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${x?u?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":_?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:_&&L?{left:`${L.left}px`,top:Q??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${L.width}px`}:x?void 0:{overflow:"visible"},children:[x&&(u?p.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:p.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{N(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:p.jsx($t,{size:18})})}):p.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{N(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:p.jsx($t,{size:18})})),p.jsxs("div",{className:`relative ${x?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:x?u&&s?{aspectRatio:s,width:"100%"}:void 0:u&&s?{aspectRatio:s,width:"100%"}:s?n.sourceDimensions&&n.sourceDimensions.height>n.sourceDimensions.width?{aspectRatio:s,height:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{aspectRatio:s,height:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{height:c,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[p.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",style:{filter:y!==1?`brightness(${y})`:void 0,transform:te||G?`scale(${te?-1:1}, ${G?-1:1})`:void 0},children:[H&&p.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),p.jsx("div",{ref:n.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!n.isPoweredOn&&p.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[p.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),p.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),n.isLoading&&!n.needsUserPlay&&!n.previewError&&p.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",H?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[p.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),p.jsx("p",{className:"font-medium",children:n.loadingLabel||"Loading preview..."}),p.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),n.needsUserPlay&&!n.isLoading&&p.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:p.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[p.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),p.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),p.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),p.jsx("button",{type:"button",onClick:()=>{n.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),n.hasAudioOnly&&p.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!u&&p.jsx("div",{className:"absolute -bottom-8 -right-4 z-50 flex items-center gap-2",children:ve()})]}),u&&x&&p.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:ve()})]}),u&&!x&&p.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:ve()}),_&&L&&p.jsx("div",{style:{height:`${L.height}px`}})]})}const cr=k.lazy(()=>Do(()=>import("./VideoControls-CCjXa2rz.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),ur=k.lazy(()=>Do(()=>import("./RetroFilterPanel-DhiDPpyr.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),To=p.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function dr({locale:t,player:e,filterState:r,controlPanelMode:n,onControlPanelModeChange:o,onApplyPreset:u,onSetTargetWidth:h,onSetTargetHeight:i,onSetMatchTargetAspect:m,onResetSettings:D,onImportSettings:E}){return p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&n!=="video-settings"&&p.jsx(k.Suspense,{fallback:To,children:p.jsx(cr,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:n==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,noiseReductionAmount:e.noiseReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeNoiseReductionAmount:e.setNoiseReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{o("playback")},onResetSettings:D,onImportSettings:E,onToggleVideoSettings:()=>{o("video-settings")},onToggleAudioSettings:()=>{o(n==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&p.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),n==="video-settings"&&p.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[p.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:p.jsx("button",{type:"button",onClick:()=>{o("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),p.jsx(k.Suspense,{fallback:To,children:p.jsx(ur,{locale:t,colorLevels:r.colorLevels,curvature:r.curvature,ditherStrength:r.ditherStrength,glowStrength:r.glowStrength,smoothStrength:r.smoothStrength,toonSteps:r.toonSteps,edgeBoost:r.edgeBoost,animeEdgeLow:r.animeEdgeLow,animeEdgeHigh:r.animeEdgeHigh,isFilterEnabled:r.isFilterEnabled,monoTint:r.monoTint,neonBoost:r.neonBoost,neonDetail:r.neonDetail,neonSaturation:r.neonSaturation,paletteMode:r.paletteMode,phosphorStrength:r.phosphorStrength,spotMaskStrength:r.spotMaskStrength,bulbRadius:r.bulbRadius,blackFloor:r.blackFloor,phosphorDotLightBalance:r.phosphorDotLightBalance,phosphorDotInternalScale:r.phosphorDotInternalScale,phosphorDotBrightCore:r.phosphorDotBrightCore,phosphorDotCellFill:r.phosphorDotCellFill,phosphorDotFlatDisc:r.phosphorDotFlatDisc,phosphorDotNeighborBlend:r.phosphorDotNeighborBlend,closeUpNoiseStrength:r.closeUpNoiseStrength,scanlineBrightnessFade:r.scanlineBrightnessFade,scanlineStrength:r.scanlineStrength,scanline2Strength:r.scanline2Strength,selectedPreset:r.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:r.targetHeight,targetWidth:r.targetWidth,matchTargetAspect:r.matchTargetAspect,vignetteStrength:r.vignetteStrength,onApplyPreset:u,onSetColorLevels:r.setColorLevels,onSetCurvature:r.setCurvature,onSetDitherStrength:r.setDitherStrength,onSetGlowStrength:r.setGlowStrength,onSetSmoothStrength:r.setSmoothStrength,onSetToonSteps:r.setToonSteps,onSetEdgeBoost:r.setEdgeBoost,onSetAnimeEdgeLow:r.setAnimeEdgeLow,onSetAnimeEdgeHigh:r.setAnimeEdgeHigh,onSetIsFilterEnabled:r.setIsFilterEnabled,onSetMonoTint:r.setMonoTint,onSetNeonBoost:r.setNeonBoost,onSetNeonDetail:r.setNeonDetail,onSetNeonSaturation:r.setNeonSaturation,onSetPaletteMode:r.setPaletteMode,onSetPhosphorStrength:r.setPhosphorStrength,onSetSpotMaskStrength:r.setSpotMaskStrength,onSetBulbRadius:r.setBulbRadius,onSetBlackFloor:r.setBlackFloor,onSetPhosphorDotLightBalance:r.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:r.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:r.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:r.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:r.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:r.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:r.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:r.setScanlineBrightnessFade,onSetScanlineStrength:r.setScanlineStrength,onSetScanline2Strength:r.setScanline2Strength,onSetTargetHeight:i,onSetTargetWidth:h,onSetMatchTargetAspect:m,onSetVignetteStrength:r.setVignetteStrength})})]})]})}function Lo({locale:t="en",src:e,stream:r,streamName:n,kind:o="video",looping:u,className:h,onError:i,initialFilterState:m,confirmDialog:D}){const{showConfirmDialog:E}=tn(),b=D??(w=>E({...w,title:w.title??"",body:w.body??""}).then(L=>L??!1)),F=k.useMemo(()=>wt()?.ui,[]),[x,N]=k.useState(F?.isHighResolution??!1),[q,$]=k.useState(!1),[ae,Y]=k.useState("playback"),ee=k.useRef(""),z=k.useRef(""),S=ar(m),fe=x&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,y=ir(S,q?"width":"contain",fe),A=k.useCallback(()=>{En(),S.resetSettings(),y.resetAudioSettings(),N(!1)},[S,y]),te=k.useCallback(w=>{S.applyAllFilterSettings(w.filter),y.applyAudioSettings(w.audio),N(w.ui.isHighResolution),on(w.locale)},[S,y]),Z=k.useCallback(()=>{if(!y.sourceDimensions)return;const w=Math.max(8,Math.round(S.targetWidth/y.sourceDimensions.width*y.sourceDimensions.height/8)*8);w!==S.targetHeight&&S.setTargetHeight(w)},[S.targetHeight,S.targetWidth,S.setTargetHeight,y.sourceDimensions]),G=k.useCallback(()=>y.sourceDimensions?.width&&y.sourceDimensions?.height?y.sourceDimensions.width/y.sourceDimensions.height:Math.max(S.targetWidth,1)/Math.max(S.targetHeight,1),[S.targetHeight,S.targetWidth,y.sourceDimensions]),de=k.useCallback(w=>{if(S.setTargetWidth(w),!S.matchTargetAspect)return;const L=Math.max(G(),1e-4);S.setTargetHeight(Math.max(1,Math.round(w/L)))},[S,G]),he=k.useCallback(w=>{if(S.setTargetHeight(w),!S.matchTargetAspect)return;const L=Math.max(G(),1e-4);S.setTargetWidth(Math.max(1,Math.round(w*L)))},[S,G]),me=k.useCallback(w=>{S.setMatchTargetAspect(w),w&&y.sourceDimensions&&Z()},[S,y.sourceDimensions,Z]),X=k.useCallback(w=>{if(S.applyPreset(w),w!=="phosphorDot"||!y.sourceDimensions)return;const L=nt.phosphorDot,O=Math.max(y.sourceDimensions.width,1),re=Math.max(y.sourceDimensions.height,1),ge=O/re,M=L.width/L.height;let J=L.width,v=L.height;ge>M?v=Math.max(8,Math.round(L.width/ge/8)*8):J=Math.max(8,Math.round(L.height*ge/8)*8),!(L.width===J&&L.height===v)&&(S.setTargetWidth(J),S.setTargetHeight(v))},[S.applyPreset,S.setTargetHeight,S.setTargetWidth,y.sourceDimensions]);return k.useEffect(()=>{S.matchTargetAspect&&y.sourceDimensions&&Z()},[S.matchTargetAspect,y.sourceDimensions,Z]),k.useEffect(()=>{if(r){const L=`stream:${r.id}:${o}:${n??""}`;if(ee.current===L)return;ee.current=L,(async()=>{try{await y.previewStream(r,o==="audio"?"audio":"video",n)}catch(O){i?.(O instanceof Error?O:new Error(String(O)))}})();return}if(!e){ee.current="";return}const w=`src:${e}:${o}`;ee.current!==w&&(ee.current=w,(async()=>{try{await y.previewUrl(e,o)}catch(L){i?.(L instanceof Error?L:new Error(String(L)))}})())},[e,r,n,o,i,y]),k.useEffect(()=>{y.refreshLayout()},[q,y.refreshLayout]),k.useEffect(()=>{y.refreshLayout()},[S.targetWidth,S.targetHeight,S.isFilterEnabled,fe,y.refreshLayout]),k.useEffect(()=>{if(typeof u!="boolean")return;const w=r?`stream:${r.id}:${o}`:e?`src:${e}:${o}`:"";if(!w){z.current="";return}const L=`${w}:${u}`;z.current!==L&&(z.current=L,y.setLoopingEnabled(u))},[o,u,y,e,r]),p.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:p.jsxs("div",{className:"space-y-4",children:[p.jsx(lr,{locale:t,src:e,kind:o,player:y,isHighResolution:x,isFitWidthEnabled:q,controlPanelMode:ae,confirmDialog:b,onHighResolutionChange:N,onFitWidthChange:$,onError:i}),p.jsx(dr,{locale:t,player:y,filterState:S,controlPanelMode:ae,onControlPanelModeChange:Y,onApplyPreset:X,onSetTargetWidth:de,onSetTargetHeight:he,onSetMatchTargetAspect:me,onResetSettings:A,onImportSettings:te})]})})}const mr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:Lo,default:Lo},Symbol.toStringTag,{value:"Module"}));export{ce as D,zn as M,Bn as R,nt as a,mr as b,wt as l};
