const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-D_aBkxAg.js","./index-DtSMT9P5.js","./index-B1uFDyaf.css","./RetroFilterPanel-DHqqQJ1p.js"])))=>i.map(i=>d[i]);
import{b as We,r as a,R as ho,a as k,j as p,_ as Do,u as en,s as tn}from"./index-DtSMT9P5.js";const on=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],nn=We("aperture",on);const rn=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],sn=We("arrow-left-right",rn);const an=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],mo=We("circle",an);const ln=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],cn=We("ellipsis",ln);const un=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],dn=We("maximize-2",un);const hn=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Qt=We("minimize-2",hn);const mn=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],gn=We("pin",mn);const pn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],fn=We("power",pn);const vn=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",key:"1i73f7"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",key:"saxlbk"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]],bn=We("square-centerline-dashed-horizontal",vn);const An=[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",key:"14bfxa"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",key:"14rx03"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]],xn=We("square-centerline-dashed-vertical",An);const wn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],go=We("square",wn);const Cn=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Sn=We("sun",Cn);async function Lo(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function yn(t,e){await Lo("plugin:sharekit|share_file",{url:t,...e})}const no="tetorica-retro-player.settings",bt=1,At=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(no);if(!t)return null;const e=JSON.parse(t);return e.version!==bt?null:e}catch{return null}},ro=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(no,JSON.stringify(t))}catch{}},xt=()=>At(),Rn=t=>{const e=At();ro({version:bt,audio:e?.audio,filter:t,ui:e?.ui})},Tn=t=>{const e=At();ro({version:bt,audio:t,filter:e?.filter,ui:e?.ui})},Dn=t=>{const e=At();ro({version:bt,audio:e?.audio,filter:e?.filter,ui:t})},Ln=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(no)}catch{}},de={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,noiseReductionAmount:0,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},En={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.005,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},Mn=Object.fromEntries(Object.entries(En).map(([t,e])=>[t,{label:e.label,settings:{...de,...e.settings}}])),Bn=Object.fromEntries(Object.entries(Mn).map(([t,e])=>[t,e.settings]));function Pn(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n++){const u=n*2/255-1;o[n]=Math.tanh(u*r)}return o}function po(t){const o=new Float32Array(256),r=t*8;for(let n=0;n<256;n++){const u=n*2/255-1;r<.001?o[n]=u:o[n]=Math.tanh(u*(1+r))/Math.tanh(1+r)}return o}function kn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n++){const u=r.getChannelData(n);for(let h=0;h<u.length;h++){const i=h/u.length,m=(1-i)**1.85,E=.78+.22*Math.sin(i*42+n*.9),M=Math.sin(i*130+n*.35)*.08;u[h]=(Math.random()*2-1+M)*m*E*.28}}return r}function In(t){const o=Math.max(1,Math.floor(t.sampleRate*2.2)),r=t.createBuffer(2,o,t.sampleRate),n=Math.floor(t.sampleRate*.012);for(let u=0;u<r.numberOfChannels;u++){const h=r.getChannelData(u);for(let i=0;i<o;i++){if(i<n)continue;const m=(i-n)/(o-n),E=(1-m)**1.8,M=Math.max(0,1-m*2.5),b=Math.sin(m*160+u*.8)*M*.35;h[i]=(Math.random()*2-1+b)*E*.75}}return r}function Fn(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let u=0;u<e;u++){const h=Math.random()*2-1;r=(r+h*.045)/1.045,n=n*.82+h*.18;const i=r*1.35,m=(h-n)*.55,E=Math.max(-1,Math.min(1,i+m));for(let M=0;M<o.numberOfChannels;M++){const b=o.getChannelData(M),I=(Math.random()*2-1)*.012;b[u]=Math.max(-1,Math.min(1,E+I))}}return o}function Gn(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const h=Math.random()*2-1;n=n*.72+h*.28,o[r]+=(h-n)*.018;const i=Math.random();if(i<.0034){const m=8+Math.floor(Math.random()*42),E=.11+Math.random()*.28,M=Math.random()<.5?-1:1;for(let b=0;b<m&&r+b<e;b++){const I=Math.exp(-b/(2.4+Math.random()*5));o[r+b]+=M*E*I*(.7+Math.random()*.3)}r+=m+Math.floor(Math.random()*640);continue}if(i<.0038){const m=90+Math.floor(Math.random()*260),E=.055+Math.random()*.11,M=Math.random()*Math.PI*2;for(let b=0;b<m&&r+b<e;b++){const I=Math.exp(-b/(18+Math.random()*40)),R=Math.sin(M+b*(.22+Math.random()*.06));o[r+b]+=E*I*R}r+=m+Math.floor(Math.random()*2200);continue}r++}const u=t.createBuffer(2,e,t.sampleRate);for(let h=0;h<u.numberOfChannels;h++){const i=u.getChannelData(h);for(let m=0;m<e;m++){const E=(Math.random()*2-1)*.0035;i[m]=Math.max(-1,Math.min(1,o[m]+E))}}return u}const Nn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function Wn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function Eo({preset:t,params:e}){return{...de,...t?Bn[t]:null,...e}}class Hn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:u=!0,enableAudioWorklet:h=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=u,this.enableAudioWorklet=h}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){Nn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...de,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=Eo({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,u=this.nodes.lofiLowpass,h=this.nodes.lofiHighshelf,i=this.nodes.lofiDrive,m=this.nodes.bitcrusher,E=this.nodes.bassEq,M=this.nodes.midEq,b=this.nodes.trebleEq,I=this.nodes.stereoWidth,R=this.nodes.roomDryGain,G=this.nodes.roomWetGain,X=this.nodes.wowFlutterDelay,Y=this.nodes.wowLfo,oe=this.nodes.wowLfoGain,$=this.nodes.flutterLfo,K=this.nodes.flutterLfoGain,V=this.nodes.noiseGain,x=this.nodes.crackleGain,fe=this.nodes.vinylDustBedFilter,D=this.nodes.vinylDustBedGain,{settings:w,isPlaying:he,isOutputEnabled:Z}=this.runtimeState,F=w.isMuted||!Z?0:w.volume;if(e&&(e.gain.value=F),o&&r&&n){const v=w.isAudioFxEnabled?w.radioToneAmount:0;o.frequency.value=20+v*430,o.Q.value=.4+v*.35,r.frequency.value=2e4-v*17400,r.Q.value=.2+v*.9,n.frequency.value=1700,n.Q.value=.8+v*1.4,n.gain.value=v*6}if(u&&h&&i){const v=w.isAudioFxEnabled?w.lofiAmount:0;u.frequency.value=16e3-v*14200,u.Q.value=.3+v*1.8,h.gain.value=-v*18;try{i.curve=Pn(v*.6)}catch{}}if(m){const v=w.isAudioFxEnabled,O=16-(v?w.bitCrushAmount:0)*12,f=1+(v?w.sampleRateReductionAmount:0)*23,z=v?Math.max(w.bitCrushAmount,w.sampleRateReductionAmount):0;m.parameters.get("bitDepth")?.setValueAtTime(O,m.context.currentTime),m.parameters.get("holdFrames")?.setValueAtTime(f,m.context.currentTime),m.parameters.get("mix")?.setValueAtTime(z,m.context.currentTime)}const ae=this.nodes.postCrushLowpass;if(ae){const v=w.isAudioFxEnabled?w.noiseReductionAmount:0;ae.frequency.value=Math.max(3e3,18e3-v*15e3)}if(E&&M&&b){const v=w.isAudioFxEnabled?15:0;E.gain.value=w.bassAmount*v,M.gain.value=w.midAmount*v,b.gain.value=w.trebleAmount*v}if(I){const v=w.isAudioFxEnabled?1+w.stereoWidthAmount:1;I.parameters.get("width")?.setValueAtTime(v,I.context.currentTime)}if(R&&G){const v=w.isAudioFxEnabled?w.smallSpeakerRoomAmount:0;R.gain.value=Math.max(.52,1-v*.42),G.gain.value=v*.95}if(X&&Y&&oe&&$&&K){const v=w.isAudioFxEnabled?w.wowFlutterAmount:0;X.delayTime.value=.006+v*.004,Y.frequency.value=.18+v*.42,oe.gain.value=v*.0023,$.frequency.value=5.2+v*6.5,K.gain.value=v*6e-4}if(V&&(V.gain.value=w.isNoiseEnabled&&!w.isMuted&&Z&&he?Math.min(.24,w.noiseLevel*5.5):0),x){const v=w.isNoiseEnabled&&!w.isMuted&&Z&&he;x.gain.value=v?Math.min(.24,w.vinylDustAmount*.22+w.noiseLevel*.25):0}if(fe&&D){const O=w.isNoiseEnabled&&!w.isMuted&&Z&&he?w.vinylDustAmount:0;fe.frequency.value=2100+O*2600,fe.Q.value=.35+O*.25,D.gain.value=O*.11}const le=this.nodes.echoDelayLine,ge=this.nodes.echoFeedbackGain,J=this.nodes.echoWetGain;if(le&&ge&&J){const v=w.isAudioFxEnabled?w.delayAmount:0;ge.gain.value=v*.5,J.gain.value=v*.55}const S=this.nodes.hallReverbWetGain;if(S){const v=w.isAudioFxEnabled?w.reverbAmount:0;S.gain.value=v*2}const L=this.nodes.chorusLfoGain1,H=this.nodes.chorusLfoGain2,ee=this.nodes.chorusWetGain;if(L&&H&&ee){const v=w.isAudioFxEnabled?w.chorusAmount:0;ee.gain.value=v*.6,L.gain.value=v*.005,H.gain.value=v*.006}const me=this.nodes.tapeSaturator;if(me)try{me.curve=po(w.isAudioFxEnabled?w.tapeSaturationAmount:0)}catch{}const B=this.nodes.busCompressor;if(B){const v=w.isAudioFxEnabled?w.compressorAmount:0;B.threshold.value=-36*v,B.ratio.value=1+9*v}const q=this.nodes.fxOutputGain;q&&(q.gain.value=w.isAudioFxEnabled?w.fxOutputTrimAmount:1)}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const u=o.createBiquadFilter(),h=o.createBiquadFilter(),i=o.createBiquadFilter(),m=o.createBiquadFilter(),E=o.createBiquadFilter(),M=o.createWaveShaper();let b=null,I=null;const R=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&R){const A=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICAgIG5zRXJyb3I6IDAsICAvLyBub2lzZSBzaGFwaW5nIGZlZWRiYWNrCiAgICAgIH0pOwogICAgfQoKICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbENvdW50OyBjaGFubmVsICs9IDEpIHsKICAgICAgY29uc3QgaW5wdXRDaGFubmVsID0gaW5wdXQ/LltjaGFubmVsXSA/PyBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IG91dHB1dENoYW5uZWwgPSBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jaGFubmVsU3RhdGVbY2hhbm5lbF07CgogICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3V0cHV0Q2hhbm5lbC5sZW5ndGg7IGluZGV4ICs9IDEpIHsKICAgICAgICBjb25zdCBiaXREZXB0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLmJpdERlcHRoLCBpbmRleCk7CiAgICAgICAgY29uc3QgaG9sZEZyYW1lcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQocmVhZFBhcmFtKHBhcmFtZXRlcnMuaG9sZEZyYW1lcywgaW5kZXgpKSk7CiAgICAgICAgY29uc3QgbWl4ID0gcmVhZFBhcmFtKHBhcmFtZXRlcnMubWl4LCBpbmRleCk7CiAgICAgICAgY29uc3Qgc291cmNlID0gaW5wdXRDaGFubmVsPy5baW5kZXhdID8/IDA7CgogICAgICAgIGlmIChzdGF0ZS5ob2xkQ291bnRlciA8PSAwKSB7CiAgICAgICAgICAvLyDkuInop5Ljg4fjgqPjgrbjg6rjg7PjgrA6IOmHj+WtkOWMluatquOBvyDihpIg44K144Op44K144Op44GX44Gf44OS44K56Z+z44Gr5aSJ5o+bCiAgICAgICAgICBjb25zdCBsc2IgPSAyIC8gTWF0aC5wb3coMiwgYml0RGVwdGgpOwogICAgICAgICAgY29uc3QgZGl0aGVyID0gKE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpIC0gMSkgKiBsc2I7CiAgICAgICAgICAvLyAx5qyh44OO44Kk44K644K344Kn44O844OU44Oz44KwOiDliY3lm57jga7ph4/lrZDljJboqqTlt67jgpLjg5XjgqPjg7zjg4njg5Djg4Pjgq/jgZfjgabpq5jln5/jgbjmirzjgZflh7rjgZkKICAgICAgICAgIGNvbnN0IHNoYXBlZCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBzb3VyY2UgKyBkaXRoZXIgLSBzdGF0ZS5uc0Vycm9yICogMC44NSkpOwogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNoYXBlZCwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUubnNFcnJvciA9IHN0YXRlLmhlbGRTYW1wbGUgLSBzaGFwZWQ7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciA9IGhvbGRGcmFtZXMgLSAxOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciAtPSAxOwogICAgICAgIH0KCiAgICAgICAgb3V0cHV0Q2hhbm5lbFtpbmRleF0gPSBzb3VyY2UgKyAoc3RhdGUuaGVsZFNhbXBsZSAtIHNvdXJjZSkgKiBtaXg7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gdHJ1ZTsKICB9Cn0KCmZ1bmN0aW9uIHJlYWRQYXJhbSh2YWx1ZXMsIGluZGV4KSB7CiAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IDEgPyB2YWx1ZXNbMF0gOiB2YWx1ZXNbaW5kZXhdOwp9CgpmdW5jdGlvbiBxdWFudGl6ZVNhbXBsZShzYW1wbGUsIGJpdERlcHRoKSB7CiAgY29uc3QgcmVzb2x2ZWRCaXREZXB0aCA9IE1hdGgubWF4KDIsIE1hdGgubWluKDE2LCBNYXRoLnJvdW5kKGJpdERlcHRoKSkpOwogIGlmIChyZXNvbHZlZEJpdERlcHRoID49IDE2KSB7CiAgICByZXR1cm4gc2FtcGxlOwogIH0KCiAgY29uc3QgbGV2ZWxzID0gMiAqKiByZXNvbHZlZEJpdERlcHRoOwogIGNvbnN0IG5vcm1hbGl6ZWQgPSAoc2FtcGxlICsgMSkgKiAwLjU7CiAgY29uc3QgcXVhbnRpemVkID0gTWF0aC5yb3VuZChub3JtYWxpemVkICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTsKICByZXR1cm4gcXVhbnRpemVkICogMiAtIDE7Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1iaXRjcnVzaGVyIiwgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(A.href),b=new R(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const j=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(j.href),I=new R(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const G=o.createBiquadFilter();G.type="lowpass",G.frequency.value=18e3,G.Q.value=.5;const X=o.createBiquadFilter(),Y=o.createBiquadFilter(),oe=o.createBiquadFilter(),$=o.createGain(),K=o.createConvolver(),V=o.createGain(),x=o.createDelay(.05),fe=o.createOscillator(),D=o.createGain(),w=o.createOscillator(),he=o.createGain();u.type="highpass",h.type="lowpass",i.type="peaking",m.type="lowpass",E.type="highshelf",X.type="lowshelf",X.frequency.value=180,Y.type="peaking",Y.frequency.value=1200,Y.Q.value=.5,oe.type="highshelf",oe.frequency.value=2800,K.buffer=kn(o),E.frequency.value=2800,M.oversample="4x",x.delayTime.value=.006,fe.type="sine",w.type="sine",fe.connect(D),D.connect(x.delayTime),w.connect(he),he.connect(x.delayTime),x.connect(u),u.connect(h),h.connect(i),i.connect(m),m.connect(E),E.connect(M),b?(M.connect(b),b.connect(G)):M.connect(G),G.connect(X),X.connect(Y),Y.connect(oe);const Z=o.createWaveShaper();Z.curve=po(0),Z.oversample="4x",oe.connect(Z),I?(Z.connect(I),I.connect($),I.connect(K)):(Z.connect($),Z.connect(K)),K.connect(V),$.connect(r),V.connect(r);const F=o.createGain();F.gain.value=1;const ae=o.createDynamicsCompressor();ae.knee.value=10,ae.attack.value=.003,ae.release.value=.12,ae.threshold.value=0,ae.ratio.value=1;const le=o.createDelay(1);le.delayTime.value=.32;const ge=o.createGain();ge.gain.value=0;const J=o.createGain();J.gain.value=0;const S=o.createConvolver();S.buffer=In(o);const L=o.createGain();L.gain.value=0;const H=o.createDelay(.05),ee=o.createDelay(.05);H.delayTime.value=.018,ee.delayTime.value=.023;const me=o.createOscillator(),B=o.createOscillator();me.type="sine",B.type="sine",me.frequency.value=.8,B.frequency.value=1.3;const q=o.createGain(),v=o.createGain();q.gain.value=0,v.gain.value=0;const O=o.createGain();O.gain.value=0,r.connect(F),r.connect(le),le.connect(ge),ge.connect(le),le.connect(J),J.connect(F),r.connect(S),S.connect(L),L.connect(F),r.connect(H),r.connect(ee),me.connect(q),q.connect(H.delayTime),B.connect(v),v.connect(ee.delayTime),H.connect(O),ee.connect(O),O.connect(F),me.start(),B.start();const f=o.createGain();f.gain.value=1,F.connect(ae),ae.connect(f),this.connectOutputToDestination&&f.connect(o.destination),n&&this.connectOutputToRecordingDestination&&f.connect(n);const z=o.createBufferSource();z.buffer=Fn(o),z.loop=!0;const c=o.createBiquadFilter();c.type="highpass",c.frequency.value=1100,c.Q.value=.25;const s=o.createBiquadFilter();s.type="lowpass",s.frequency.value=5600,s.Q.value=.18;const W=o.createBiquadFilter();W.type="peaking",W.frequency.value=2400,W.Q.value=.7,W.gain.value=-2.5;const U=o.createStereoPanner(),ne=o.createGain(),be=o.createOscillator(),ve=o.createGain(),ce=o.createBufferSource(),Q=o.createBiquadFilter(),pe=o.createBiquadFilter(),xe=o.createGain(),Se=o.createGain();r.gain.value=0,ne.gain.value=0,be.type="sine",be.frequency.value=.021,ve.gain.value=.08,ce.buffer=Gn(o),ce.loop=!0,Q.type="highpass",Q.frequency.value=1250,Q.Q.value=.35,pe.type="bandpass",pe.frequency.value=2400,pe.Q.value=.4,xe.gain.value=0,Se.gain.value=0,z.connect(c),c.connect(s),s.connect(W),W.connect(U),U.connect(ne),ne.connect(r),be.connect(ve),ve.connect(U.pan),ce.connect(Q),Q.connect(Se),Se.connect(r),ce.connect(pe),pe.connect(xe),xe.connect(r),z.start(),be.start(),ce.start(),fe.start(),w.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:u,radioToneLowpass:h,radioTonePresence:i,recordingDestination:n,lofiLowpass:m,lofiHighshelf:E,lofiDrive:M,bitcrusher:b,postCrushLowpass:G,bassEq:X,midEq:Y,trebleEq:oe,stereoWidth:I,roomDryGain:$,roomConvolver:K,roomWetGain:V,wowFlutterDelay:x,wowLfo:fe,wowLfoGain:D,flutterLfo:w,flutterLfoGain:he,noiseSource:z,noiseFilter:W,noisePanner:U,noiseGain:ne,noiseLfo:be,noiseLfoGain:ve,crackleSource:ce,crackleFilter:Q,vinylDustBedFilter:pe,vinylDustBedGain:xe,crackleGain:Se,outputBus:F,echoDelayLine:le,echoFeedbackGain:ge,echoWetGain:J,hallReverbConvolver:S,hallReverbWetGain:L,chorusDelay1:H,chorusDelay2:ee,chorusLfo1:me,chorusLfo2:B,chorusLfoGain1:q,chorusLfoGain2:v,chorusWetGain:O,tapeSaturator:Z,busCompressor:ae,fxOutputGain:f})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const u=this.output;if(!u){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(Wn(e)){u.connect(e,o);return}u.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}try{this.nodes.chorusLfo1?.stop()}catch{}try{this.nodes.chorusLfo2?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function Un({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const u={settings:Eo(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new Hn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:u,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function $t(){if(typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc.")return!1;const t=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(t)}function te(t){return{get current(){return t()}}}function On({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:u}){const[h]=a.useState(()=>new AudioContext),[i]=a.useState(()=>{const d=xt()?.audio;return{isMuted:d?.isMuted??de.isMuted,volume:d?.volume??de.volume,playbackRate:d?.playbackRate??de.playbackRate,isLooping:d?.isLooping??de.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??de.isAudioFxEnabled,lofiAmount:d?.lofiAmount??de.lofiAmount,radioToneAmount:d?.radioToneAmount??de.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??de.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??de.sampleRateReductionAmount,noiseReductionAmount:d?.noiseReductionAmount??de.noiseReductionAmount,bassAmount:d?.bassAmount??de.bassAmount,midAmount:d?.midAmount??de.midAmount,trebleAmount:d?.trebleAmount??de.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??de.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??de.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??de.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??de.isNoiseEnabled,noiseLevel:d?.noiseLevel??de.noiseLevel,vinylDustAmount:d?.vinylDustAmount??de.vinylDustAmount,delayAmount:d?.delayAmount??de.delayAmount,reverbAmount:d?.reverbAmount??de.reverbAmount,chorusAmount:d?.chorusAmount??de.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??de.tapeSaturationAmount,compressorAmount:d?.compressorAmount??de.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??de.fxOutputTrimAmount}}),m=a.useRef(i.isMuted),E=a.useRef(i.volume),M=a.useRef(i.playbackRate),b=a.useRef(i.isLooping),I=a.useRef(i.isAudioFxEnabled),R=a.useRef(i.lofiAmount),G=a.useRef(i.radioToneAmount),X=a.useRef(i.bitCrushAmount),Y=a.useRef(i.sampleRateReductionAmount),oe=a.useRef(i.noiseReductionAmount),$=a.useRef(i.bassAmount),K=a.useRef(i.midAmount),V=a.useRef(i.trebleAmount),x=a.useRef(i.stereoWidthAmount),fe=a.useRef(i.smallSpeakerRoomAmount),D=a.useRef(i.wowFlutterAmount),w=a.useRef(i.isNoiseEnabled),he=a.useRef(i.noiseLevel),Z=a.useRef(i.vinylDustAmount),F=a.useRef(i.delayAmount),ae=a.useRef(i.reverbAmount),le=a.useRef(i.chorusAmount),ge=a.useRef(i.tapeSaturationAmount),J=a.useRef(i.compressorAmount),S=a.useRef(i.fxOutputTrimAmount),[L,H]=a.useState(i.isMuted),[ee,me]=a.useState(i.playbackRate),[B,q]=a.useState(i.volume),[v,O]=a.useState(i.isLooping),[f,z]=a.useState(i.isAudioFxEnabled),[c,s]=a.useState(i.lofiAmount),[W,U]=a.useState(i.radioToneAmount),[ne,be]=a.useState(i.bitCrushAmount),[ve,ce]=a.useState(i.sampleRateReductionAmount),[Q,pe]=a.useState(i.noiseReductionAmount),[xe,Se]=a.useState(i.bassAmount),[A,j]=a.useState(i.midAmount),[re,we]=a.useState(i.trebleAmount),[Ee,Be]=a.useState(i.stereoWidthAmount),[Pe,De]=a.useState(i.smallSpeakerRoomAmount),[Me,Xe]=a.useState(i.wowFlutterAmount),[He,Ie]=a.useState(i.isNoiseEnabled),[Le,Ae]=a.useState(i.noiseLevel),[Ce,Qe]=a.useState(i.vinylDustAmount),[Te,Ve]=a.useState(i.delayAmount),[ye,Ue]=a.useState(i.reverbAmount),[ke,Ke]=a.useState(i.chorusAmount),[Fe,$e]=a.useState(i.tapeSaturationAmount),[Oe,l]=a.useState(i.compressorAmount),[y,N]=a.useState(i.fxOutputTrimAmount),_=a.useRef(null),[g]=a.useState(()=>Un({context:h,instanceLabel:t,params:i,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[T]=a.useState(()=>({audioContextRef:te(()=>g.audioContext),masterGainRef:te(()=>g.masterGain),radioToneHighpassRef:te(()=>g.radioToneHighpass),radioToneLowpassRef:te(()=>g.radioToneLowpass),radioTonePresenceRef:te(()=>g.radioTonePresence),recordingDestinationRef:te(()=>g.recordingDestination),lofiLowpassRef:te(()=>g.lofiLowpass),lofiHighshelfRef:te(()=>g.lofiHighshelf),lofiDriveRef:te(()=>g.lofiDrive),bitcrusherRef:te(()=>g.bitcrusher),bassEqRef:te(()=>g.bassEq),midEqRef:te(()=>g.midEq),trebleEqRef:te(()=>g.trebleEq),stereoWidthRef:te(()=>g.stereoWidth),roomDryGainRef:te(()=>g.roomDryGain),roomConvolverRef:te(()=>g.roomConvolver),roomWetGainRef:te(()=>g.roomWetGain),wowFlutterDelayRef:te(()=>g.wowFlutterDelay),wowLfoRef:te(()=>g.wowLfo),wowLfoGainRef:te(()=>g.wowLfoGain),flutterLfoRef:te(()=>g.flutterLfo),flutterLfoGainRef:te(()=>g.flutterLfoGain),noiseSourceRef:te(()=>g.noiseSource),noiseFilterRef:te(()=>g.noiseFilter),noisePannerRef:te(()=>g.noisePanner),noiseGainRef:te(()=>g.noiseGain),noiseLfoRef:te(()=>g.noiseLfo),noiseLfoGainRef:te(()=>g.noiseLfoGain),crackleSourceRef:te(()=>g.crackleSource),crackleFilterRef:te(()=>g.crackleFilter),vinylDustBedFilterRef:te(()=>g.vinylDustBedFilter),vinylDustBedGainRef:te(()=>g.vinylDustBedGain),crackleGainRef:te(()=>g.crackleGain)})),{audioContextRef:Re,masterGainRef:ie,radioToneHighpassRef:rt,radioToneLowpassRef:Ct,radioTonePresenceRef:it,recordingDestinationRef:St,lofiLowpassRef:yt,lofiHighshelfRef:Rt,lofiDriveRef:st,bitcrusherRef:Tt,bassEqRef:at,midEqRef:Dt,trebleEqRef:Lt,stereoWidthRef:Et,roomDryGainRef:lt,roomConvolverRef:Mt,roomWetGainRef:ct,wowFlutterDelayRef:Bt,wowLfoRef:ut,wowLfoGainRef:Pt,flutterLfoRef:dt,flutterLfoGainRef:kt,noiseSourceRef:ht,noiseFilterRef:It,noisePannerRef:Ft,noiseGainRef:Gt,noiseLfoRef:Nt,noiseLfoGainRef:Wt,crackleSourceRef:Ht,crackleFilterRef:Ut,vinylDustBedFilterRef:Ot,vinylDustBedGainRef:zt,crackleGainRef:jt}=T,Ye=(d,ze)=>g.debugAudio(d,ze),mt=()=>g.ensureInitialized(),Vt=()=>g.ensureInitialized(),et=()=>g.updateAudioNodes(),_t=d=>g.connectSourceNode(d),Zt=()=>g.disposeAudioEngine(),gt=(d,ze)=>g.setParams(d,ze),Xt=d=>g.setIsPlaying(d),Kt=d=>g.setOutputEnabled(d),qt=async d=>{const ze=await mt();if(!ze||!g.input){Ye("connectMediaAudio:no-context",{mediaTag:d.tagName});return}_.current&&(Ye("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),_.current.disconnect(),_.current=null);try{const Ze=ze.createMediaElementSource(d);Ze.connect(g.input),_.current=Ze,$t()?(d.muted=!1,d.volume=0):(d.muted=m.current,d.volume=m.current?0:E.current),Ye("connectMediaAudio:connected",{audioContextState:ze.state,mediaTag:d.tagName,previewKind:o.current}),et()}catch(Ze){throw Ye("connectMediaAudio:error",{audioContextState:ze.state,mediaTag:d.tagName,message:Ze instanceof Error?Ze.message:String(Ze),previewKind:o.current}),Ze}},Yt=()=>{const d=_.current;!d||!g.input||(d.disconnect(),d.connect(g.input),et())},Jt=async()=>{_.current?.disconnect(),_.current=null,await Zt()},_e=d=>{m.current=d.isMuted,E.current=d.volume,M.current=d.playbackRate,b.current=d.isLooping,I.current=d.isAudioFxEnabled,R.current=d.lofiAmount,G.current=d.radioToneAmount,X.current=d.bitCrushAmount,Y.current=d.sampleRateReductionAmount,oe.current=d.noiseReductionAmount,$.current=d.bassAmount,K.current=d.midAmount,V.current=d.trebleAmount,x.current=d.stereoWidthAmount,fe.current=d.smallSpeakerRoomAmount,D.current=d.wowFlutterAmount,w.current=d.isNoiseEnabled,he.current=d.noiseLevel,Z.current=d.vinylDustAmount,F.current=d.delayAmount,ae.current=d.reverbAmount,le.current=d.chorusAmount,ge.current=d.tapeSaturationAmount,J.current=d.compressorAmount,S.current=d.fxOutputTrimAmount,H(d.isMuted),q(d.volume),me(d.playbackRate),O(d.isLooping),z(d.isAudioFxEnabled),s(d.lofiAmount),U(d.radioToneAmount),be(d.bitCrushAmount),ce(d.sampleRateReductionAmount),pe(d.noiseReductionAmount),Se(d.bassAmount),j(d.midAmount),we(d.trebleAmount),Be(d.stereoWidthAmount),De(d.smallSpeakerRoomAmount),Xe(d.wowFlutterAmount),Ie(d.isNoiseEnabled),Ae(d.noiseLevel),Qe(d.vinylDustAmount),Ve(d.delayAmount),Ue(d.reverbAmount),Ke(d.chorusAmount),$e(d.tapeSaturationAmount),l(d.compressorAmount),N(d.fxOutputTrimAmount),r.current&&($t()&&_.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=d.isMuted,r.current.volume=d.volume),r.current.playbackRate=d.playbackRate,r.current.loop=d.isLooping),gt(d),window.requestAnimationFrame(et)},Je=()=>_e({...de});return a.useEffect(()=>{m.current=L,E.current=B,M.current=ee,b.current=v,I.current=f,R.current=c,G.current=W,X.current=ne,Y.current=ve,oe.current=Q,$.current=xe,K.current=A,V.current=re,x.current=Ee,fe.current=Pe,D.current=Me,w.current=He,he.current=Le,Z.current=Ce,F.current=Te,ae.current=ye,le.current=ke,ge.current=Fe,J.current=Oe,S.current=y,gt({isMuted:L,volume:B,playbackRate:ee,isLooping:v,isAudioFxEnabled:f,lofiAmount:c,radioToneAmount:W,bitCrushAmount:ne,sampleRateReductionAmount:ve,noiseReductionAmount:Q,bassAmount:xe,midAmount:A,trebleAmount:re,stereoWidthAmount:Ee,smallSpeakerRoomAmount:Pe,wowFlutterAmount:Me,isNoiseEnabled:He,noiseLevel:Le,vinylDustAmount:Ce,delayAmount:Te,reverbAmount:ye,chorusAmount:ke,tapeSaturationAmount:Fe,compressorAmount:Oe,fxOutputTrimAmount:y},!0),Xt(n),Kt(e==="video"||e==="audio"||e==="capture"),r.current&&($t()&&_.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=L,r.current.volume=L?0:B),r.current.playbackRate=ee,r.current.loop=v)},[L,B,f,c,W,ne,ve,Q,xe,A,re,Ee,Pe,Me,He,Le,Ce,Te,ye,ke,Fe,Oe,y,n,ee,v,e]),a.useEffect(()=>{const d=setTimeout(()=>{Tn({isMuted:L,volume:B,playbackRate:ee,isLooping:v,isAudioFxEnabled:f,lofiAmount:c,radioToneAmount:W,bitCrushAmount:ne,sampleRateReductionAmount:ve,noiseReductionAmount:Q,bassAmount:xe,midAmount:A,trebleAmount:re,stereoWidthAmount:Ee,smallSpeakerRoomAmount:Pe,wowFlutterAmount:Me,isNoiseEnabled:He,noiseLevel:Le,vinylDustAmount:Ce,delayAmount:Te,reverbAmount:ye,chorusAmount:ke,tapeSaturationAmount:Fe,compressorAmount:Oe,fxOutputTrimAmount:y})},300);return()=>clearTimeout(d)},[L,B,ee,v,f,c,W,ne,ve,Q,xe,A,re,Ee,Pe,Me,He,Le,Ce,Te,ye,ke,Fe,Oe,y]),{audioContextRef:Re,mediaSourceRef:_,masterGainRef:ie,radioToneHighpassRef:rt,radioToneLowpassRef:Ct,radioTonePresenceRef:it,recordingDestinationRef:St,lofiLowpassRef:yt,lofiHighshelfRef:Rt,lofiDriveRef:st,bitcrusherRef:Tt,bassEqRef:at,midEqRef:Dt,trebleEqRef:Lt,stereoWidthRef:Et,roomDryGainRef:lt,roomConvolverRef:Mt,roomWetGainRef:ct,wowFlutterDelayRef:Bt,wowLfoRef:ut,wowLfoGainRef:Pt,flutterLfoRef:dt,flutterLfoGainRef:kt,noiseSourceRef:ht,noiseFilterRef:It,noisePannerRef:Ft,noiseGainRef:Gt,noiseLfoRef:Nt,noiseLfoGainRef:Wt,crackleSourceRef:Ht,crackleFilterRef:Ut,vinylDustBedFilterRef:Ot,vinylDustBedGainRef:zt,crackleGainRef:jt,isMutedRef:m,volumeRef:E,playbackRateRef:M,isLoopingRef:b,isAudioFxEnabledRef:I,lofiAmountRef:R,radioToneAmountRef:G,bitCrushAmountRef:X,sampleRateReductionAmountRef:Y,bassAmountRef:$,midAmountRef:K,trebleAmountRef:V,stereoWidthAmountRef:x,smallSpeakerRoomAmountRef:fe,wowFlutterAmountRef:D,isNoiseEnabledRef:w,noiseLevelRef:he,vinylDustAmountRef:Z,delayAmountRef:F,reverbAmountRef:ae,chorusAmountRef:le,tapeSaturationAmountRef:ge,compressorAmountRef:J,fxOutputTrimAmountRef:S,isMuted:L,setIsMuted:H,playbackRate:ee,setPlaybackRate:me,volume:B,setVolume:q,isLooping:v,setIsLooping:O,isAudioFxEnabled:f,setIsAudioFxEnabled:z,lofiAmount:c,setLofiAmount:s,radioToneAmount:W,setRadioToneAmount:U,bitCrushAmount:ne,setBitCrushAmount:be,sampleRateReductionAmount:ve,setSampleRateReductionAmount:ce,noiseReductionAmount:Q,setNoiseReductionAmount:pe,bassAmount:xe,setBassAmount:Se,midAmount:A,setMidAmount:j,trebleAmount:re,setTrebleAmount:we,stereoWidthAmount:Ee,setStereoWidthAmount:Be,smallSpeakerRoomAmount:Pe,setSmallSpeakerRoomAmount:De,wowFlutterAmount:Me,setWowFlutterAmount:Xe,isNoiseEnabled:He,setIsNoiseEnabled:Ie,noiseLevel:Le,setNoiseLevel:Ae,vinylDustAmount:Ce,setVinylDustAmount:Qe,delayAmount:Te,setDelayAmount:Ve,reverbAmount:ye,setReverbAmount:Ue,chorusAmount:ke,setChorusAmount:Ke,tapeSaturationAmount:Fe,setTapeSaturationAmount:$e,compressorAmount:Oe,setCompressorAmount:l,fxOutputTrimAmount:y,setFxOutputTrimAmount:N,debugAudio:Ye,ensureAudioContext:Vt,ensureInitialized:mt,updateAudioNodes:et,connectSourceNode:_t,connectMediaAudio:qt,reconnectCurrentMediaAudio:Yt,applyAudioSettings:_e,resetAudioSettings:Je,disposeAudioEngine:Jt}}const zn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},nt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,edgeBoost:1.5,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeCel:{label:"Anime Cel",width:640,height:360,colors:16,dither:0,palette:"anime",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.15,toonSteps:1,edgeBoost:.3,animeEdgeLow:.22,animeEdgeHigh:.66,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:8,edgeBoost:.22,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},jn=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:t==="anime"?10:0,Vn=`#version 300 es
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
`,fo=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Zn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),vo=640,eo=()=>typeof performance<"u"?performance.now():Date.now(),to=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,bo=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Xn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Ao=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),vt=t=>({width:to(t)?t.videoWidth:bo(t)?t.naturalWidth:t.width,height:to(t)?t.videoHeight:bo(t)?t.naturalHeight:t.height}),Kn=(t,e,o)=>to(t)&&(e>vo||o>vo),wt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),qn=t=>wt(t)&&t.phosphorDotInternalScale?2:1,Yn=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},Jn=(t,e,o,r,n,u)=>{if(!wt(o)||n===void 0||u===void 0||n<=0||u<=0)return{width:t,height:e};const h=Math.max(1.1,2.15+o.bulbRadius*1.15),i=Math.max(1,h/Math.max(r,1)),m=Math.max(1,Math.floor(n/i)),E=Math.max(1,Math.floor(u/i)),M=Math.min(1,m/Math.max(t,1),E/Math.max(e,1));return{width:Math.max(1,Math.round(t*M)),height:Math.max(1,Math.round(e*M))}},oo=(t,e,o,r,n)=>{const u=qn(t),h=Math.max(t.targetWidth,1),i=Math.max(t.targetHeight,1),m=t.matchTargetAspect?Yn(h,i,e,o):{width:h,height:i},E=m.width*u,M=m.height*u,b=Jn(E,M,t,u,r,n);return{width:b.width,height:b.height,sampleWidth:Math.max(1,Math.round(E)),sampleHeight:Math.max(1,Math.round(M)),internalScale:u,isPhosphorDotMode:wt(t)}};function xo(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function wo(t,e,o){const r=xo(t,t.VERTEX_SHADER,e),n=xo(t,t.FRAGMENT_SHADER,o),u=t.createProgram();if(!u)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(u,r),t.attachShader(u,n),t.bindAttribLocation(u,0,"aPosition"),t.linkProgram(u),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(u,t.LINK_STATUS)){const h=t.getProgramInfoLog(u)||"Unknown program link error.";throw t.deleteProgram(u),new Error(h)}return u}class Qn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=eo();constructor(e){this.gl=e,this.filterProgram=wo(e,fo,Vn),this.passthroughProgram=wo(e,fo,_n);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,Zn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uAnimeEdgeLow:e.getUniformLocation(this.filterProgram,"uAnimeEdgeLow"),uAnimeEdgeHigh:e.getUniformLocation(this.filterProgram,"uAnimeEdgeHigh"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=eo()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const u=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),Ao(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const h=vt(o);this.applyFilterUniforms(r,h.width,h.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(Ao(e)||!o.isFilterEnabled)return e;const r=vt(e);if(r.width<=0||r.height<=0||Kn(e,r.width,r.height))return e;const{width:n,height:u,sampleWidth:h,sampleHeight:i,isPhosphorDotMode:m}=oo(o,r.width,r.height),E=Math.max(1,Math.round(m?h:n)),M=Math.max(1,Math.round(m?i:u)),b=this.ensureUploadContext();return!b||!this.uploadCanvas?e:(this.uploadCanvas.width!==E&&(this.uploadCanvas.width=E),this.uploadCanvas.height!==M&&(this.uploadCanvas.height=M),b.imageSmoothingEnabled=!0,b.imageSmoothingQuality="high",b.fillStyle="#000",b.fillRect(0,0,E,M),b.drawImage(e,0,0,E,M),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,u=Xn(n.canvas)?n.canvas:null,h=Math.max(u?.clientWidth??n.drawingBufferWidth,1),i=Math.max(u?.clientHeight??n.drawingBufferHeight,1),{width:m,height:E,sampleWidth:M,sampleHeight:b,isPhosphorDotMode:I}=oo(e,o,r,h,i);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,m,E),n.uniform2f(this.uniformLocations.uSampleTargetSize,M,b),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,jn(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uAnimeEdgeLow,e.animeEdgeLow),n.uniform1f(this.uniformLocations.uAnimeEdgeHigh,e.animeEdgeHigh),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*E/(Math.max(n.drawingBufferHeight,1)*m)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,I?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...zn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(eo()-this.startedAt)/1e3)}}function $n({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:u,debugVideo:h}){const i=a.useRef(null),m=a.useRef(null),E=a.useRef(null),M=a.useRef(null),b=a.useRef(null),I=a.useRef(null),R=a.useRef(null),G=a.useRef(null),X=a.useRef(()=>{}),Y=a.useRef(t),oe=a.useRef(r),$=a.useRef(!1),K=a.useRef(null),V=a.useRef(null),x=a.useRef(null),[fe,D]=a.useState(!1),[w,he]=a.useState(null);Y.current=t,oe.current=r;const Z=a.useCallback(f=>{he(z=>{const c=typeof f=="function"?f(z):f;return x.current=c,c})},[]),F=a.useCallback(()=>{const f=m.current,z=b.current;f&&(f.pipeline.setOutputEnabled(oe.current),f.pipeline.setSource(z),f.pipeline.setFilterState(Y.current),f.pipeline.render())},[]);a.useLayoutEffect(()=>{X.current=F},[F]);const ae=a.useCallback(()=>{$.current=!1,G.current!==null&&(window.cancelAnimationFrame(G.current),G.current=null)},[]),le=a.useCallback(()=>{if($.current)return;$.current=!0;const f=()=>{if(!$.current)return;if(X.current(),!(u.current==="video"||u.current==="capture"||u.current==="image"||n.current)){G.current=null,$.current=!1;return}G.current=window.requestAnimationFrame(f)};G.current=window.requestAnimationFrame(f)},[n,u]),ge=a.useCallback(()=>{F()},[F]),J=a.useCallback(()=>{F()},[F]),S=a.useCallback(()=>{F()},[F]),L=a.useCallback(()=>(m.current&&m.current.pipeline.resetAnimationClock(),I.current={},F(),I.current),[F]),H=a.useCallback((f,z,c)=>{if(!f)return;const{width:s,height:W}=vt(c);if(s<=0||W<=0)return;const U=i.current,ne=U?.clientWidth??f.canvas.width,be=U?.clientHeight??f.canvas.height,ce=e==="width"?ne/s:Math.min(ne/s,be/W),Q=s*ce,pe=W*ce,xe=(ne-Q)/2,Se=(be-pe)/2,A={width:Q,height:pe,x:xe,y:Se},j=x.current;return j&&j.width===A.width&&j.height===A.height&&j.x===A.x&&j.y===A.y?j:(x.current=A,Z(A),A)},[e,Z]),ee=a.useCallback(()=>{b.current&&H(m.current,null,b.current)},[H]),me=a.useCallback(()=>{F()},[F]),B=a.useCallback(()=>{const f=m.current,z=i.current;if(!f||!z)return;ee();const c=x.current??{x:0,y:0,width:z.clientWidth,height:z.clientHeight},s=Math.max(1,Math.round(c.width)),W=Math.max(1,Math.round(c.height)),U=Y.current,ne=b.current?vt(b.current):null,{width:be,height:ve}=oo(U,ne?.width,ne?.height,s,W),ce=Math.max(1,Math.round(s*Math.max(1,o))),Q=Math.max(1,Math.round(W*Math.max(1,o))),pe=Math.max(1,Math.round(Math.max(1,be)*Math.max(1,o))),xe=Math.max(1,Math.round(Math.max(1,ve)*Math.max(1,o))),Se=wt(U),A=U.isFilterEnabled&&Se?Math.max(ce,pe):ce,j=U.isFilterEnabled&&Se?Math.max(Q,xe):Q;f.canvas.width!==A&&(f.canvas.width=A),f.canvas.height!==j&&(f.canvas.height=j),f.canvas.style.position="absolute",f.canvas.style.left=`${Math.round(c.x)}px`,f.canvas.style.top=`${Math.round(c.y)}px`,f.canvas.style.width=`${s}px`,f.canvas.style.height=`${W}px`,f.canvas.style.imageRendering="pixelated",F()},[ee,F,o]),q=a.useCallback(()=>{K.current!==null&&(window.cancelAnimationFrame(K.current),K.current=null),V.current!==null&&(window.clearTimeout(V.current),V.current=null),K.current=window.requestAnimationFrame(()=>{K.current=null,B()}),V.current=window.setTimeout(()=>{V.current=null,B()},120)},[B]),v=a.useCallback(async()=>{if(!m.current){if(R.current){await R.current;return}R.current=(async()=>{const f=i.current;if(!f||m.current)return;const z=typeof performance<"u"?performance.now():Date.now();h("startup:initPixi:start",{hostConnected:f.isConnected,hostWidth:f.clientWidth??null,hostHeight:f.clientHeight??null,resolution:o});const c=document.createElement("canvas");c.style.display="block",c.style.width="100%",c.style.height="100%",c.style.imageRendering="pixelated",c.style.background="#020617";const s=c.getContext("webgl2");if(!s)throw new Error("WebGL2 is not available in this app view.");h("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-z)*10)/10});const W={canvas:c,pipeline:new Qn(s),ticker:{start:le,stop:ae}},U=i.current;if(!U||U!==f||!U.isConnected)return;U.style.position="relative",U.appendChild(c),m.current=W,I.current={},D(!0),h("initWebGL:ready",{hostWidth:U.clientWidth??null,hostHeight:U.clientHeight??null,resolution:o}),h("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-z)*10)/10}),B();const ne=u.current==="video"||u.current==="capture"||u.current==="image"||n.current;r&&ne&&le(),h("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-z)*10)/10,shouldAnimateOnInit:ne})})();try{await R.current}finally{R.current=null}}},[h,r,B,o,le,ae]),O=a.useCallback(()=>{R.current=null,ae(),K.current!==null&&(window.cancelAnimationFrame(K.current),K.current=null),V.current!==null&&(window.clearTimeout(V.current),V.current=null);const f=m.current;f&&(f.pipeline.dispose(),f.canvas.remove()),m.current=null,I.current=null,Z(null),D(!1)},[ae,Z]);return a.useEffect(()=>{const f=i.current;if(!f)return;if(typeof ResizeObserver<"u"){const c=new ResizeObserver(()=>{q()});return c.observe(f),()=>{c.disconnect()}}const z=()=>{q()};return window.addEventListener("resize",z),()=>{window.removeEventListener("resize",z)}},[q]),{canvasHostRef:i,appRef:m,spriteRef:E,textureRef:M,previewElementRef:b,filterRef:I,isRendererReady:fe,viewportRect:w,setViewportRect:Z,applyFilterState:ge,createVideoTexture:f=>null,destroyPixi:O,fitCurrentSprite:ee,fitSprite:H,initPixi:v,refreshLayout:B,resetFilterInstance:L,safeRender:me,scheduleRefreshLayout:q,syncSpriteFilter:J,syncTexturePresentation:S}}const er=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),tr=()=>typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function or({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:u,streamRef:h,streamOwnedRef:i,previewRequestIdRef:m,isPlayingRef:E,previewKindRef:M,audioContextRef:b,mediaSourceRef:I,masterGainRef:R,noiseGainRef:G,isMutedRef:X,volumeRef:Y,playbackRateRef:oe,isLoopingRef:$,isAudioFxEnabled:K,lofiAmount:V,bitCrushAmount:x,sampleRateReductionAmount:fe,bassAmount:D,midAmount:w,trebleAmount:he,stereoWidthAmount:Z,smallSpeakerRoomAmount:F,isMuted:ae,volume:le,previewKind:ge,setPreviewName:J,setPreviewError:S,setNeedsUserPlay:L,setIsPlaying:H,setCurrentTime:ee,setDuration:me,setPlaybackRate:B,setIsLooping:q,setSourceDimensions:v,setViewportRect:O,setPreviewKindState:f,setIsPoweredOn:z,beginLoading:c,finishLoading:s,ensureAudioContext:W,updateAudioNodes:U,connectMediaAudio:ne,fitSprite:be,refreshLayout:ve,scheduleRefreshLayout:ce,safeRender:Q,resetFilterInstance:pe,initPixi:xe,resetPerfAccumulators:Se,debugVideo:A,debugAudio:j}){const re=async()=>{er()&&await new Promise(l=>{window.setTimeout(l,220)})},we=()=>{const l=b.current?.currentTime;if(G.current)if(typeof l=="number"){const y=G.current.gain;y.cancelScheduledValues(l),y.setValueAtTime(y.value,l),y.linearRampToValueAtTime(0,l+.03)}else G.current.gain.value=0;if(R.current)if(typeof l=="number"){const y=R.current.gain;y.cancelScheduledValues(l),y.setValueAtTime(y.value,l),y.linearRampToValueAtTime(0,l+.03)}else R.current.gain.value=0},Ee=()=>{G.current&&(G.current.gain.value=0)},Be=l=>l instanceof DOMException&&(l.name==="NotAllowedError"||l.name==="AbortError")?!0:l instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(l.message):!1,Pe=l=>Be(l)?(s(),S(""),L(!0),Ae(),Q(),!0):!1,De=(l,y,N=!0)=>{we(),l.muted=!0,l.volume=0,l.pause(),l.srcObject instanceof MediaStream&&(N&&l.srcObject.getTracks().forEach(_=>_.stop()),l.srcObject=null),l.src="",l.load(),y?.startsWith("blob:")&&URL.revokeObjectURL(y)},Me=l=>new Promise((y,N)=>{const _=ie=>ie?ie.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ie.code===MediaError.MEDIA_ERR_NETWORK?"network":ie.code===MediaError.MEDIA_ERR_DECODE?"decode":ie.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ie.code}`:"unknown",g=()=>{l.removeEventListener("loadeddata",T),l.removeEventListener("canplay",T),l.removeEventListener("error",Re)},T=()=>{g(),y()},Re=()=>{g(),N(new Error(`動画の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${_(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){y();return}l.addEventListener("loadeddata",T,{once:!0}),l.addEventListener("canplay",T,{once:!0}),l.addEventListener("error",Re,{once:!0}),l.load()}),Xe=l=>new Promise((y,N)=>{const _=ie=>ie?ie.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ie.code===MediaError.MEDIA_ERR_NETWORK?"network":ie.code===MediaError.MEDIA_ERR_DECODE?"decode":ie.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ie.code}`:"unknown",g=()=>{l.removeEventListener("loadedmetadata",T),l.removeEventListener("canplay",T),l.removeEventListener("error",Re)},T=()=>{g(),y()},Re=()=>{g(),N(new Error(`音声の読み込みに失敗しました。 src=${l.currentSrc||l.src||"(empty)"} reason=${_(l.error)}`))};if(l.readyState>=HTMLMediaElement.HAVE_METADATA){y();return}l.addEventListener("loadedmetadata",T,{once:!0}),l.addEventListener("canplay",T,{once:!0}),l.addEventListener("error",Re,{once:!0}),l.load()}),He=l=>new Promise((y,N)=>{const _=()=>{l.removeEventListener("load",g),l.removeEventListener("error",T)},g=()=>{_(),y()},T=()=>{_(),N(new Error("画像の読み込みに失敗しました。"))};if(l.complete&&l.naturalWidth>0&&l.naturalHeight>0){y();return}l.addEventListener("load",g,{once:!0}),l.addEventListener("error",T,{once:!0})}),Ie=l=>{l.addEventListener("play",Ae),l.addEventListener("pause",Ae),l.addEventListener("pause",we),l.addEventListener("abort",we),l.addEventListener("emptied",we),l.addEventListener("loadstart",we),l.addEventListener("seeking",we),l.addEventListener("stalled",we),l.addEventListener("suspend",we),l.addEventListener("waiting",we),l.addEventListener("volumechange",Ae),l.addEventListener("timeupdate",Ae),l.addEventListener("durationchange",Ae),l.addEventListener("seeked",Ae),l.addEventListener("ended",Ae),l.addEventListener("ratechange",Ae),l instanceof HTMLVideoElement&&l.addEventListener("resize",()=>{const y=l.videoWidth,N=l.videoHeight;y>0&&N>0&&(v({width:y,height:N}),ce())})},Le=l=>{l.loop=$.current,l.muted=X.current,l.volume=X.current?0:Y.current,l.playbackRate=oe.current,l.autoplay=!1,l.preload="auto",l.crossOrigin="anonymous",l instanceof HTMLVideoElement&&(l.playsInline=!0)},Ae=()=>{if(!n.current){A("syncVideoState:no-media",{previewKind:M.current,hasPreviewElement:!!r.current}),E.current=!1,H(!1),ee(0),me(0),U(),Q();return}E.current=!n.current.paused,H(!n.current.paused),n.current.paused||s(),ee(n.current.currentTime),me(n.current.duration||0),B(n.current.playbackRate||1),q(n.current.loop),U(),Q()},Ce=()=>{A("cleanupPreview:start",{previewKind:M.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),we(),m.current+=1,s();const l=n.current,y=h.current,N=i.current;e.current=null,o.current=null,n.current=null,r.current=null,h.current=null,i.current=!1,I.current?.disconnect(),I.current=null,L(!1),E.current=!1,H(!1),ee(0),me(0),f(null),v(null),O(null),u.current?.startsWith("blob:")&&URL.revokeObjectURL(u.current),u.current=null,l?De(l,void 0,N):N&&y?.getTracks().forEach(_=>_.stop()),Q()},Qe=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),we(),Ce(),b.current?.state==="running"&&b.current.suspend()},Te=()=>{z(!0),t.current?.ticker.start();try{Se?.()}catch{}},Ve=async()=>{if(n.current)try{await W(),tr()&&I.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=X.current,n.current.volume=X.current?0:Y.current),await n.current.play(),E.current=!0,H(!0),S(""),L(!1),j("playVideoWithAudio",{audioContextState:b.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:K,lofiAmount:V,bitCrushAmount:x,sampleRateReductionAmount:fe,bassAmount:D,midAmount:w,trebleAmount:he,stereoWidthAmount:Z,smallSpeakerRoomAmount:F,isMuted:ae,volume:le}),U(),Ae(),Q(),ce(),window.requestAnimationFrame(U)}catch(l){if(s(),Be(l)){L(!0),S("");return}L(!1),S(l instanceof Error?l.message:"音声付き再生を開始できませんでした。")}},ye=async()=>{if(await xe(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Ue=async(l,y)=>{const N=await ye();r.current=l,be(N,null,l),f(y),v(l instanceof HTMLVideoElement?{width:l.videoWidth,height:l.videoHeight}:{width:l.naturalWidth,height:l.naturalHeight}),Q(),ve(),ce(),t.current?.ticker.start()},ke=async l=>{const y=l.type.startsWith("video/"),N=l.type.startsWith("audio/"),_=l.type.startsWith("image/");if(!y&&!N&&!_){S("動画、音声、または画像ファイルを選んでください。");return}Te(),Ce(),pe();const g=m.current;S(""),J(l.name),c(y?"Loading video preview...":N?"Loading audio preview...":"Loading image preview...");let T=null;try{if(await ye(),T=URL.createObjectURL(l),u.current=T,y||N){const ie=y?document.createElement("video"):document.createElement("audio");if(ie.src=T,Le(ie),Ie(ie),ie instanceof HTMLVideoElement?await Me(ie):await Xe(ie),g!==m.current){De(ie,T);return}n.current=ie,ie instanceof HTMLVideoElement?await Ue(ie,"video"):(r.current=null,f("audio"),v(null),O(null),Q()),await ne(ie),Ae(),await re(),await Ve(),g===m.current&&s();return}const Re=new Image;if(Re.src=T,Re.crossOrigin="anonymous",await He(Re),g!==m.current){T.startsWith("blob:")&&URL.revokeObjectURL(T);return}n.current=null,Ee(),U(),await Ue(Re,"image"),Ae(),g===m.current&&s()}catch(Re){if(g!==m.current){T?.startsWith("blob:")&&URL.revokeObjectURL(T);return}if(Be(Re)){Pe(Re);return}Ce(),S(Re instanceof Error?Re.message:"動画プレビューに失敗しました。"),L(!1)}},Ke=async()=>{if(Te(),!navigator.mediaDevices?.getDisplayMedia){S("このブラウザでは画面キャプチャーに対応していません。");return}Ce();const l=m.current;S(""),J("Display Capture"),c("Preparing display capture...");try{await ye();const y=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(l!==m.current){y.getTracks().forEach(_=>_.stop());return}const N=document.createElement("video");N.srcObject=y,Le(N),Ie(N),y.getVideoTracks()[0]?.addEventListener("ended",()=>{Fe()}),await Me(N),h.current=y,i.current=!0,n.current=N,await Ue(N,"capture"),await ne(N),L(!1),await re(),await Ve(),l===m.current&&s()}catch(y){if(l!==m.current||Pe(y))return;Ce(),S(y instanceof Error?y.message:"画面キャプチャーを開始できませんでした。")}},Fe=()=>{ge==="capture"&&(Ce(),J(""),S(""))};return{cleanupPreview:Ce,cleanupForPageLeave:Qe,playVideoWithAudio:Ve,previewFile:ke,previewStream:async(l,y="video",N="Media Stream")=>{let _=0;try{if(Te(),Ce(),pe(),_=m.current,S(""),J(N),c(y==="video"?"Loading stream preview...":"Loading stream audio..."),await ye(),y==="video"){const g=document.createElement("video");if(g.srcObject=l,Le(g),Ie(g),await Me(g),_!==m.current){De(g,void 0,!1);return}h.current=l,i.current=!1,n.current=g,await Ue(g,"capture"),await ne(g)}else{const g=document.createElement("audio");if(g.srcObject=l,Le(g),Ie(g),await Xe(g),_!==m.current){De(g,void 0,!1);return}h.current=l,i.current=!1,n.current=g,r.current=null,f("audio"),v(null),O(null),Q(),await ne(g),Ae()}if(_!==m.current)return;await re(),await Ve(),_===m.current&&s()}catch(g){if(_!==m.current||Pe(g))return;Ce(),S(g instanceof Error?g.message:String(g))}},previewUrl:async(l,y="video")=>{let N=0;const _=typeof performance<"u"?performance.now():Date.now(),g=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-_)*10)/10;try{if(A("startup:previewUrl:start",{url:l,kind:y}),Te(),Ce(),pe(),N=m.current,S(""),J(l),c(y==="video"?"Loading video preview...":y==="image"?"Loading image preview...":"Loading audio preview..."),await ye(),A("startup:previewUrl:renderer-ready",{kind:y,elapsedMs:g()}),y==="video"){const T=document.createElement("video");if(T.src=l,Le(T),Ie(T),await Me(T),A("startup:previewUrl:video-ready",{elapsedMs:g(),readyState:T.readyState,videoWidth:T.videoWidth,videoHeight:T.videoHeight}),N!==m.current){De(T,l);return}n.current=T,await Ue(T,"video"),await ne(T),Ae()}else if(y==="image"){const T=new Image;if(T.src=l,T.crossOrigin="anonymous",await He(T),A("startup:previewUrl:image-ready",{elapsedMs:g(),naturalWidth:T.naturalWidth,naturalHeight:T.naturalHeight}),N!==m.current)return;n.current=null,Ee(),U(),await Ue(T,"image"),Ae()}else{const T=document.createElement("audio");if(T.src=l,Le(T),Ie(T),await Xe(T),A("startup:previewUrl:audio-ready",{elapsedMs:g(),readyState:T.readyState,duration:T.duration}),N!==m.current){De(T,l);return}r.current=null,f("audio"),v(null),O(null),n.current=T,Q(),await ne(T),Ae()}if(N!==m.current)return;(y==="video"||y==="audio")&&(await re(),await Ve()),N===m.current&&(s(),A("startup:previewUrl:done",{kind:y,elapsedMs:g()}))}catch(T){if(A("startup:previewUrl:error",{kind:y,elapsedMs:g(),error:T instanceof Error?T.message:String(T)}),N!==m.current||Pe(T))return;Ce(),S(T instanceof Error?T.message:String(T))}},startDisplayCapture:Ke,stopDisplayCapture:Fe,syncVideoState:Ae,releaseDetachedMedia:De,ensurePixiReady:ye}}let nr=0;const Co=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),So=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),rr=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function ir(t,e,o=1){const r=a.useRef(`player-${nr+=1}`),n=a.useRef(null),u=a.useRef(null),h=a.useRef(!1),i=a.useRef(null),m=a.useRef(null),E=a.useRef([]),M=a.useRef(null),b=a.useRef(null),I=a.useRef(null),R=a.useRef(null),G=a.useRef(null),X=a.useRef(0),Y=a.useRef(!1),oe=a.useRef(null),$=a.useRef(!1),[K,V]=a.useState(""),[x,fe]=a.useState(""),[D,w]=a.useState(!0),[he,Z]=a.useState(""),[F,ae]=a.useState(!1),[le,ge]=a.useState(!1),[J,S]=a.useState(!1),[L,H]=a.useState(0),[ee,me]=a.useState(0),[B,q]=a.useState(null),[v,O]=a.useState(null),[f,z]=a.useState(!1),[c,s]=a.useState(null),W=(C,P)=>{if(!rr())return;const se=P?` ${JSON.stringify(P)}`:"";console.log(`[retro-player video][${r.current}] ${C}${se}`)},U=$n({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:D,isPlayingRef:Y,previewKindRef:oe,debugVideo:W}),{canvasHostRef:ne,appRef:be,spriteRef:ve,textureRef:ce,previewElementRef:Q,filterRef:pe,isRendererReady:xe,viewportRect:Se,setViewportRect:A,applyFilterState:j,destroyPixi:re,fitSprite:we,initPixi:Ee,refreshLayout:Be,resetFilterInstance:Pe,safeRender:De,scheduleRefreshLayout:Me,syncSpriteFilter:Xe,syncTexturePresentation:He}=U,Ie=a.useRef(Ee),Le=a.useRef(re),Ae=a.useRef(()=>{}),Ce=a.useRef(()=>{}),Qe=On({instanceLabel:r.current,previewKind:B,previewKindRef:oe,mediaRef:i,isPlaying:J,isPlayingRef:Y}),{audioContextRef:Te,mediaSourceRef:Ve,masterGainRef:ye,recordingDestinationRef:Ue,noiseGainRef:ke,isMutedRef:Ke,volumeRef:Fe,playbackRateRef:$e,isLoopingRef:Oe,isMuted:l,setIsMuted:y,playbackRate:N,setPlaybackRate:_,volume:g,setVolume:T,isLooping:Re,setIsLooping:ie,isAudioFxEnabled:rt,setIsAudioFxEnabled:Ct,lofiAmount:it,setLofiAmount:St,radioToneAmount:yt,setRadioToneAmount:Rt,bitCrushAmount:st,setBitCrushAmount:Tt,sampleRateReductionAmount:at,setSampleRateReductionAmount:Dt,noiseReductionAmount:Lt,setNoiseReductionAmount:Et,bassAmount:lt,setBassAmount:Mt,midAmount:ct,setMidAmount:Bt,trebleAmount:ut,setTrebleAmount:Pt,stereoWidthAmount:dt,setStereoWidthAmount:kt,smallSpeakerRoomAmount:ht,setSmallSpeakerRoomAmount:It,wowFlutterAmount:Ft,setWowFlutterAmount:Gt,isNoiseEnabled:Nt,setIsNoiseEnabled:Wt,noiseLevel:Ht,setNoiseLevel:Ut,vinylDustAmount:Ot,setVinylDustAmount:zt,delayAmount:jt,setDelayAmount:Ye,reverbAmount:mt,setReverbAmount:Vt,chorusAmount:et,setChorusAmount:_t,tapeSaturationAmount:Zt,setTapeSaturationAmount:gt,compressorAmount:Xt,setCompressorAmount:Kt,fxOutputTrimAmount:qt,setFxOutputTrimAmount:Yt,debugAudio:Jt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,reconnectCurrentMediaAudio:ze,applyAudioSettings:Ze,resetAudioSettings:Mo,disposeAudioEngine:io}=Qe;a.useEffect(()=>{Ie.current=Ee,Le.current=re},[Ee,re]);const Bo=C=>{oe.current=C,q(C)},Po=C=>{Z(C),ae(!0)},tt=()=>{ae(!1),Z("")},so=()=>{w(!0),be.current?.ticker.start()},ko=()=>{i.current&&i.current.pause(),ke.current&&(ke.current.gain.value=0),ye.current&&(ye.current.gain.value=0),tt(),ge(!1),w(!1),be.current?.ticker.stop(),qe()},Io=or({filterState:t,appRef:be,spriteRef:ve,textureRef:ce,previewElementRef:Q,filterRef:pe,mediaRef:i,objectUrlRef:n,streamRef:u,streamOwnedRef:h,previewRequestIdRef:X,isPlayingRef:Y,previewKindRef:oe,audioContextRef:Te,mediaSourceRef:Ve,masterGainRef:ye,noiseGainRef:ke,isMutedRef:Ke,volumeRef:Fe,playbackRateRef:$e,isLoopingRef:Oe,isAudioFxEnabled:rt,lofiAmount:it,bitCrushAmount:st,sampleRateReductionAmount:at,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,isMuted:l,volume:g,previewKind:B,setPreviewName:V,setPreviewError:fe,setNeedsUserPlay:ge,setIsPlaying:S,setCurrentTime:H,setDuration:me,setPlaybackRate:_,setIsLooping:ie,setSourceDimensions:O,setViewportRect:A,setPreviewKindState:Bo,setIsPoweredOn:w,beginLoading:Po,finishLoading:tt,ensureAudioContext:_e,updateAudioNodes:Je,connectMediaAudio:d,fitSprite:we,refreshLayout:Be,scheduleRefreshLayout:Me,safeRender:De,resetFilterInstance:Pe,initPixi:Ee,debugVideo:W,debugAudio:Jt}),{cleanupPreview:ao,cleanupForPageLeave:Fo,playVideoWithAudio:lo,previewFile:Go,previewStream:No,previewUrl:Wo,startDisplayCapture:Ho,stopDisplayCapture:Uo,syncVideoState:qe}=Io;a.useEffect(()=>{Ae.current=ao},[ao]),a.useEffect(()=>{Ce.current=io},[io]);const co=async()=>{if(i.current){if(i.current.paused){D||so(),await lo(),qe();return}i.current.pause(),qe()}},Oo=()=>{i.current&&y(C=>{const P=!C;return Ke.current=P,window.requestAnimationFrame(Je),P})},ot=C=>{i.current&&(i.current.currentTime=C,H(C))},zo=C=>{if(!i.current)return;const P=1/30,se=Math.max(0,Math.min(i.current.currentTime+P*C,i.current.duration||i.current.currentTime+P));i.current.pause(),i.current.currentTime=se,qe()},jo=C=>{i.current&&(i.current.playbackRate=C,$e.current=C,_(C))},Vo=C=>{i.current&&(Fe.current=C,Ke.current=C===0,T(C),y(C===0),window.requestAnimationFrame(Je))},_o=()=>{i.current&&(i.current.loop=!i.current.loop,Oe.current=i.current.loop,ie(i.current.loop))},Zo=C=>{Oe.current=C,ie(C),i.current&&(i.current.loop=C)},pt=()=>{if(!b.current||typeof window>"u"){I.current=null,R.current=null;return}window.URL.revokeObjectURL(b.current),b.current=null,I.current=null,R.current=null},Xo=(C,P)=>{if(typeof document>"u")return;const se=document.createElement("a");se.href=C,se.download=P,se.rel="noopener",se.style.display="none",document.body.appendChild(se),se.click(),window.setTimeout(()=>{se.remove()},0)},Ko=(C,P)=>{if(typeof window>"u"||C.length===0)return null;pt();const se=new Blob(C,{type:P||"video/webm"}),je=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ne=window.URL.createObjectURL(se);return b.current=Ne,I.current=se,R.current=je,s(je),je},qo=()=>{const C=b.current,P=R.current;!C||!P||typeof window>"u"||(Xo(C,P),window.setTimeout(()=>{pt()},1e3),s(null))},Yo=async()=>{const C=I.current,P=R.current;if(!C||!P||typeof window>"u")return!1;if(Co()){const je=new Uint8Array(await C.arrayBuffer()),Ne=await Lo("persist_recording_for_share",{data:Array.from(je),filename:P});return await yn(Ne,{mimeType:C.type||"video/webm",title:P}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Ge={files:[new File([C],P,{type:C.type||"video/webm"})],title:P};return typeof navigator.canShare=="function"&&!navigator.canShare(Ge)?!1:(await navigator.share(Ge),!0)},Jo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(P=>MediaRecorder.isTypeSupported(P))??"",Qo=async()=>{const C=be.current?.canvas;if(!(C instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await _e();const P=new MediaStream;C.captureStream(30).getVideoTracks().forEach(Ne=>P.addTrack(Ne)),Ue.current?.stream.getAudioTracks().forEach(Ne=>P.addTrack(Ne.clone()));const Ge=Jo(),je=Ge?new MediaRecorder(P,{mimeType:Ge}):new MediaRecorder(P);E.current=[],pt(),s(null),M.current=P,m.current=je,je.addEventListener("dataavailable",Ne=>{Ne.data.size>0&&E.current.push(Ne.data)}),je.addEventListener("stop",()=>{const Ne=Ko(E.current,je.mimeType);E.current=[],M.current?.getTracks().forEach($o=>$o.stop()),M.current=null,m.current=null,z(!1),_e(),G.current?.(Ne),G.current=null},{once:!0}),je.start(),z(!0)},uo=(C=!0)=>{const P=m.current;return P?new Promise(se=>{if(G.current=se,C||(E.current=[]),P.state!=="inactive"){P.stop();return}M.current?.getTracks().forEach(Ge=>Ge.stop()),M.current=null,m.current=null,z(!1),G.current?.(R.current),G.current=null}):Promise.resolve(R.current)};return a.useEffect(()=>{let C=!1;return(async()=>(W("startup:setupPixi-effect:start",{renderResolutionScale:o}),await Ie.current(),C&&Le.current()))(),()=>{pt(),uo(!1),C=!0,Le.current()}},[o]),a.useEffect(()=>()=>{Ae.current(),Ce.current()},[]),a.useEffect(()=>{const C=()=>{Fo()};return window.addEventListener("beforeunload",C),()=>{window.removeEventListener("beforeunload",C)}},[]),a.useEffect(()=>{const C=()=>{i.current&&(i.current.muted=!0,i.current.volume=0,i.current.pause(),qe())};return window.addEventListener(ho,C),()=>{window.removeEventListener(ho,C)}},[qe]),a.useEffect(()=>{if(!So())return;const C=se=>se==="video"||se==="audio"||se==="capture",P=()=>{const se=i.current;if(!(!se||!C(oe.current))){if(document.visibilityState==="hidden"){$.current=!se.paused,se.pause(),Y.current=!1,S(!1),ke.current&&(ke.current.gain.value=0),ye.current&&(ye.current.gain.value=0),Te.current?.state==="running"&&Te.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await _e(),ze(),Je(),$.current&&i.current)try{await i.current.play(),ge(!1)}catch(Ge){Ge instanceof DOMException&&Ge.name==="NotAllowedError"&&ge(!0)}}finally{qe(),$.current=!1}})()},80)}};return document.addEventListener("visibilitychange",P),()=>{document.removeEventListener("visibilitychange",P)}},[Te,_e,ye,ke,ze,qe,Je]),a.useLayoutEffect(()=>{j(),Xe(),He(),Be()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,Be]),a.useEffect(()=>{if(x||le){tt();return}if(B==="image"||B==="audio"){tt();return}J&&tt()},[x,le,B,J]),a.useEffect(()=>{Y.current=J;const C=(B==="video"||B==="capture")&&i.current?.tagName==="VIDEO",P=!i.current||Math.abs(i.current.currentTime)<.05,se=i.current?.ended??!1;C&&tt(),C&&!J&&!x&&!se&&(Te.current?.state==="suspended"||P)&&ge(!0)},[Te,J,x,B]),a.useEffect(()=>{const C=P=>{if(!i.current)return;const se=P.target;if(!(se instanceof HTMLInputElement||se instanceof HTMLTextAreaElement||se?.isContentEditable)){if(P.code==="Space"||P.code==="KeyK"){P.preventDefault(),co();return}if(P.code==="KeyJ"){P.preventDefault(),ot(Math.max(i.current.currentTime-10,0));return}if(P.code==="KeyL"){P.preventDefault(),ot(Math.min(i.current.currentTime+10,i.current.duration||i.current.currentTime+10));return}if(P.code==="ArrowLeft"){P.preventDefault(),ot(Math.max(i.current.currentTime-5,0));return}P.code==="ArrowRight"&&(P.preventDefault(),ot(Math.min(i.current.currentTime+5,i.current.duration||i.current.currentTime+5)))}};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),{canvasHostRef:ne,previewName:K,previewError:x,isRendererReady:xe,loadingLabel:he,isLoading:F,needsUserPlay:le,isPlaying:J,isMuted:l,currentTime:L,duration:ee,playbackRate:N,volume:g,isLooping:Re,sourceDimensions:v,viewportRect:Se,isAudioFxEnabled:rt,lofiAmount:it,radioToneAmount:yt,bitCrushAmount:st,sampleRateReductionAmount:at,noiseReductionAmount:Lt,bassAmount:lt,midAmount:ct,trebleAmount:ut,stereoWidthAmount:dt,smallSpeakerRoomAmount:ht,wowFlutterAmount:Ft,isNoiseEnabled:Nt,noiseLevel:Ht,vinylDustAmount:Ot,delayAmount:jt,reverbAmount:mt,chorusAmount:et,tapeSaturationAmount:Zt,setTapeSaturationAmount:gt,compressorAmount:Xt,setCompressorAmount:Kt,fxOutputTrimAmount:qt,setFxOutputTrimAmount:Yt,hasPlayableMedia:B==="video"||B==="audio"||B==="capture",hasVideo:B==="video"||B==="capture",hasAudioOnly:B==="audio",hasImage:B==="image",isRecording:f,pendingRecordingFilename:c,prefersShareExport:Co()&&So(),isCaptureActive:B==="capture",canRecord:B==="video"||B==="capture"||B==="image"||B==="audio",previewFile:Go,previewStream:No,previewUrl:Wo,startDisplayCapture:Ho,stopDisplayCapture:Uo,togglePlayback:co,toggleMute:Oo,seekTo:ot,stepFrame:zo,changePlaybackRate:jo,changeVolume:Vo,toggleLoop:_o,setLoopingEnabled:Zo,applyAudioSettings:Ze,resetAudioSettings:Mo,playVideoWithAudio:lo,isPoweredOn:D,powerOn:so,powerOff:ko,downloadPendingRecording:qo,sharePendingRecording:Yo,startRecording:Qo,stopRecording:uo,ensureAudioContext:_e,refreshLayout:Be,toggleAudioFx:()=>{Ct(C=>!C)},setLofiAmount:St,setRadioToneAmount:Rt,setBitCrushAmount:Tt,setSampleRateReductionAmount:Dt,setNoiseReductionAmount:Et,setBassAmount:Mt,setMidAmount:Bt,setTrebleAmount:Pt,setStereoWidthAmount:kt,setSmallSpeakerRoomAmount:It,setWowFlutterAmount:Gt,toggleNoise:()=>{Wt(C=>!C)},setNoiseLevel:Ut,setVinylDustAmount:zt,setDelayAmount:Ye,setReverbAmount:Vt,setChorusAmount:_t}}const ue=nt.pc98_512,yo=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&(e.animeEdgeLow??.08)===t.animeEdgeLow&&(e.animeEdgeHigh??.55)===t.animeEdgeHigh&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,ft=t=>{for(const[e,o]of Object.entries(nt))if(yo(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(nt))if(yo(t,o,{ignoreDimensions:!0}))return e;return null},sr=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function ar(t={}){const[e]=a.useState(()=>({targetWidth:t.targetWidth??ue.width,targetHeight:t.targetHeight??ue.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ue.colors,ditherStrength:t.ditherStrength??ue.dither,paletteMode:t.paletteMode??ue.palette,curvature:t.curvature??ue.curvature,scanlineStrength:t.scanlineStrength??ue.scanline,scanline2Strength:t.scanline2Strength??ue.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ue.vignette,glowStrength:t.glowStrength??ue.glow,smoothStrength:t.smoothStrength??ue.smoothStrength??0,toonSteps:t.toonSteps??ue.toonSteps??0,edgeBoost:t.edgeBoost??ue.edgeBoost??0,animeEdgeLow:t.animeEdgeLow??ue.animeEdgeLow??.08,animeEdgeHigh:t.animeEdgeHigh??ue.animeEdgeHigh??.55,phosphorStrength:t.phosphorStrength??ue.phosphor,spotMaskStrength:t.spotMaskStrength??ue.spotMask,bulbRadius:t.bulbRadius??ue.bulbRadius,blackFloor:t.blackFloor??ue.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??ue.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ue.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ue.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ue.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ue.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ue.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ue.monoTint,neonBoost:t.neonBoost??ue.neonBoost,neonSaturation:t.neonSaturation??ue.neonSaturation,neonDetail:t.neonDetail??ue.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=a.useState(()=>({...e,...xt()?.filter,...t})),[r,n]=a.useState(o),[u,h]=a.useState(ft(o)),i=c=>{h(null),n(s=>s.targetWidth===c?s:{...s,targetWidth:c})},m=c=>{h(null),n(s=>s.targetHeight===c?s:{...s,targetHeight:c})},E=c=>{h(null),n(s=>s.matchTargetAspect===c?s:{...s,matchTargetAspect:c})},M=c=>{h(null),n(s=>({...s,colorLevels:c}))},b=c=>{h(null),n(s=>({...s,ditherStrength:c}))},I=c=>{h(null),n(s=>({...s,paletteMode:c,colorLevels:sr(c,s.colorLevels)}))},R=c=>{h(null),n(s=>({...s,curvature:c}))},G=c=>{h(null),n(s=>({...s,scanlineStrength:c}))},X=c=>{h(null),n(s=>({...s,scanline2Strength:c}))},Y=c=>{h(null),n(s=>({...s,scanlineBrightnessFade:c}))},oe=c=>{h(null),n(s=>({...s,vignetteStrength:c}))},$=c=>{h(null),n(s=>({...s,glowStrength:c}))},K=c=>{h(null),n(s=>({...s,smoothStrength:c}))},V=c=>{h(null),n(s=>({...s,toonSteps:c}))},x=c=>{h(null),n(s=>({...s,edgeBoost:c}))},fe=c=>{h(null),n(s=>({...s,animeEdgeLow:c}))},D=c=>{h(null),n(s=>({...s,animeEdgeHigh:c}))},w=c=>{h(null),n(s=>({...s,phosphorStrength:c}))},he=c=>{h(null),n(s=>({...s,spotMaskStrength:c}))},Z=c=>{h(null),n(s=>({...s,bulbRadius:c}))},F=c=>{h(null),n(s=>({...s,blackFloor:c}))},ae=c=>{h(null),n(s=>({...s,phosphorDotLightBalance:c}))},le=c=>{h(null),n(s=>({...s,phosphorDotInternalScale:c}))},ge=c=>{h(null),n(s=>({...s,phosphorDotBrightCore:c}))},J=c=>{h(null),n(s=>({...s,phosphorDotCellFill:c}))},S=c=>{h(null),n(s=>({...s,phosphorDotFlatDisc:c}))},L=c=>{h(null),n(s=>({...s,phosphorDotNeighborBlend:c}))},H=c=>{h(null),n(s=>({...s,closeUpNoiseStrength:c}))},ee=c=>{h(null),n(s=>({...s,monoTint:c}))},me=c=>{h(null),n(s=>({...s,neonBoost:c}))},B=c=>{h(null),n(s=>({...s,neonSaturation:c}))},q=c=>{h(null),n(s=>({...s,neonDetail:c}))},v=c=>{n(s=>({...s,isFilterEnabled:c}))},O=c=>{const s=nt[c];h(c),n(W=>({...W,targetWidth:s.width,targetHeight:s.height,colorLevels:s.colors,ditherStrength:s.dither,paletteMode:s.palette,curvature:s.curvature,scanlineStrength:s.scanline,scanline2Strength:s.scanline2,vignetteStrength:s.vignette,glowStrength:s.glow,smoothStrength:s.smoothStrength??0,toonSteps:s.toonSteps??0,edgeBoost:s.edgeBoost??0,animeEdgeLow:s.animeEdgeLow??.08,animeEdgeHigh:s.animeEdgeHigh??.55,phosphorStrength:s.phosphor,spotMaskStrength:s.spotMask,bulbRadius:s.bulbRadius,blackFloor:s.blackFloor,phosphorDotLightBalance:s.phosphorDotLightBalance??1,phosphorDotInternalScale:s.phosphorDotInternalScale??!1,phosphorDotBrightCore:s.phosphorDotBrightCore??!1,phosphorDotCellFill:s.phosphorDotCellFill??0,phosphorDotFlatDisc:s.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:s.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:s.closeUpNoiseStrength??0,scanlineBrightnessFade:s.scanlineBrightnessFade??.6,monoTint:s.monoTint,neonBoost:s.neonBoost,neonSaturation:s.neonSaturation,neonDetail:s.neonDetail,isFilterEnabled:!0}))},f=c=>{h(ft(c)),n(c)},z=()=>{h(ft(e)),n(e)};return a.useEffect(()=>{const c=setTimeout(()=>{Rn(r)},300);return()=>clearTimeout(c)},[r]),a.useEffect(()=>{const c=ft(r);h(s=>s===c?s:c)},[r]),{...r,selectedPreset:u,setTargetWidth:i,setTargetHeight:m,setMatchTargetAspect:E,setColorLevels:M,setDitherStrength:b,setPaletteMode:I,setCurvature:R,setScanlineStrength:G,setScanline2Strength:X,setScanlineBrightnessFade:Y,setVignetteStrength:oe,setGlowStrength:$,setSmoothStrength:K,setToonSteps:V,setEdgeBoost:x,setAnimeEdgeLow:fe,setAnimeEdgeHigh:D,setPhosphorStrength:w,setSpotMaskStrength:he,setBulbRadius:Z,setBlackFloor:F,setPhosphorDotLightBalance:ae,setPhosphorDotInternalScale:le,setPhosphorDotBrightCore:ge,setPhosphorDotCellFill:J,setPhosphorDotFlatDisc:S,setPhosphorDotNeighborBlend:L,setCloseUpNoiseStrength:H,setMonoTint:ee,setNeonBoost:me,setNeonSaturation:B,setNeonDetail:q,setIsFilterEnabled:v,applyAllFilterSettings:f,applyPreset:O,resetSettings:z}}function lr({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:u,controlPanelMode:h,confirmDialog:i,onHighResolutionChange:m,onFitWidthChange:E,onError:M}){const b=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},I=k.useMemo(()=>xt()?.ui,[]),[R,G]=k.useState(I?.isPreviewMaximized??!1),[X,Y]=k.useState(!1),[oe,$]=k.useState(!1),[K,V]=k.useState(0),[x,fe]=k.useState(null),[D,w]=k.useState(I?.brightness??1),[he,Z]=k.useState(I?.flipH??!1),[F,ae]=k.useState(I?.flipV??!1),[le,ge]=k.useState(!1),[J,S]=k.useState(()=>typeof window<"u"&&window.innerWidth<360),[L,H]=k.useState(null),ee=k.useRef(null),me=k.useRef(null),B=k.useRef(null),q=k.useRef(null),v=k.useCallback(()=>{const A=ee.current,j=B.current;if(!A||!j)return null;const re=A.getBoundingClientRect(),we=j.getBoundingClientRect();return{left:re.left,width:re.width,height:we.height}},[]),O=k.useCallback(A=>{q.current!==null&&window.clearTimeout(q.current),q.current=window.setTimeout(()=>{fe(A),q.current=null},120)},[]),f=k.useCallback(()=>{q.current!==null&&(window.clearTimeout(q.current),q.current=null),fe(null)},[]);k.useEffect(()=>{Dn({isPreviewMaximized:R,isHighResolution:n,brightness:D,flipH:he,flipV:F})},[n,R,D,he,F]),k.useEffect(()=>()=>{q.current!==null&&window.clearTimeout(q.current)},[]),k.useEffect(()=>{const A=()=>{S(window.innerWidth<360)};return window.addEventListener("resize",A,{passive:!0}),()=>{window.removeEventListener("resize",A)}},[]),k.useEffect(()=>{if(!R)return;const A=document.body.style.overflow,j=re=>{re.code==="Escape"&&G(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",j),()=>{document.body.style.overflow=A,window.removeEventListener("keydown",j)}},[R]),k.useEffect(()=>{R&&(Y(!1),$(!1),V(0),H(null))},[R]),k.useEffect(()=>{u&&(Y(!1),$(!1),V(0),H(null))},[u]),k.useEffect(()=>{if(h==="playback"||R||X||u){$(!1),V(0);return}const A=()=>{const j=me.current,re=B.current;if(!j||!re)return;const we=j.getBoundingClientRect().top,Ee=re.getBoundingClientRect().height,Be=Math.round(Math.min(Ee,window.innerHeight)*.4),Pe=-Math.max(120,Be);$(De=>{if(!De&&we<=Pe){V(Math.max(120,Be));const Me=v();return Me&&H(Me),!0}return De&&V(Math.max(120,Be)),De&&we>=-24?(V(0),!1):De})};return A(),window.addEventListener("scroll",A,{passive:!0}),window.addEventListener("resize",A),()=>{window.removeEventListener("scroll",A),window.removeEventListener("resize",A)}},[h,u,R,X,v]),k.useEffect(()=>{if(!((X||oe)&&!R)){H(null);return}const j=()=>{const re=v();re&&H(re)};return j(),window.addEventListener("resize",j),window.addEventListener("scroll",j,{passive:!0}),()=>{window.removeEventListener("resize",j),window.removeEventListener("scroll",j)}},[oe,R,X,u,v,r.sourceDimensions]),k.useEffect(()=>{r.refreshLayout()},[X,R,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const z=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),c=!R&&!u&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,s=c?`${c}px`:"60vh",W=k.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),U=(X||oe)&&!R,ne=oe?`calc(max(0.0rem, env(safe-area-inset-top)) - ${K}px)`:void 0,be="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",ve="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",ce="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",Q="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",pe=(A,j,re="w-44")=>p.jsx("div",{role:"tooltip","aria-hidden":x!==A,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",re,x===A?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:j}),xe=()=>{f(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording())return;const j=await i({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(r.ensureAudioContext(),!j)return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(A){M?.(A instanceof Error?A:new Error(String(A)))}return}try{await r.startRecording()}catch(A){M?.(A instanceof Error?A:new Error(String(A)))}})()},Se=()=>p.jsxs(p.Fragment,{children:[p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":"More options",onClick:()=>{f(),ge(A=>!A)},className:[be,le||D!==1||he||F?ve:ce].join(" "),children:p.jsx(cn,{size:16})}),le&&p.jsxs("div",{className:"absolute bottom-full left-0 mb-2 w-52 rounded-xl border border-slate-600/80 bg-slate-950/96 p-3 shadow-xl backdrop-blur-sm",children:[J&&r.canRecord&&p.jsx("div",{className:"mb-3 border-b border-slate-700 pb-3",children:p.jsxs("button",{type:"button",onClick:xe,className:["inline-flex w-full min-h-9 items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition",r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:[r.isRecording?p.jsx(go,{size:13,className:"fill-current animate-pulse"}):p.jsx(mo,{size:13,className:"text-rose-300"}),r.isRecording?"Stop REC":"Record"]})}),p.jsxs("div",{className:"mb-3",children:[p.jsxs("div",{className:"mb-1.5 flex items-center justify-between text-[11px] text-slate-400",children:[p.jsxs("span",{className:"flex items-center gap-1.5",children:[p.jsx(Sn,{size:11}),"Brightness"]}),p.jsxs("span",{children:[Math.round(D*100),"%"]})]}),p.jsx("input",{type:"range",min:"0.4",max:"2.0",step:"0.05",value:D,onChange:A=>{w(Number(A.currentTarget.value))},className:"w-full"})]}),p.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[p.jsxs("button",{type:"button",onClick:()=>{Z(A=>!A)},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",he?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[p.jsx(bn,{size:13}),"Flip H"]}),p.jsxs("button",{type:"button",onClick:()=>{ae(A=>!A)},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",F?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[p.jsx(xn,{size:13}),"Flip V"]})]})]})]}),r.canRecord&&!J&&p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:xe,onMouseEnter:()=>O("record"),onMouseLeave:f,onFocus:()=>O("record"),onBlur:f,className:[Q,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?p.jsx(go,{size:14,className:"fill-current animate-pulse"}):p.jsx(mo,{size:16,className:"text-rose-300"})}),pe("record",r.isRecording?b.recordStop:b.recordIdle)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(f(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>O("power"),onMouseLeave:f,onFocus:()=>O("power"),onBlur:f,className:[be,r.isPoweredOn?ve:ce].join(" "),children:p.jsx(fn,{size:16})}),pe("power",r.isPoweredOn?b.powerOff:b.powerOn)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{f(),m(!n)},onMouseEnter:()=>O("hi-res"),onMouseLeave:f,onFocus:()=>O("hi-res"),onBlur:f,className:[be,n?ve:ce].join(" "),children:p.jsx(nn,{size:16})}),pe("hi-res",b.hiRes)]}),p.jsxs("div",{className:"flex items-center",children:[p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":u?"Disable fit width":"Enable fit width",onClick:()=>{f(),E(!u)},onMouseEnter:()=>O("fit-width"),onMouseLeave:f,onFocus:()=>O("fit-width"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-l-full border-t border-b border-l border-r-0 text-sm transition backdrop-blur-sm",u?ve:ce].join(" "),children:p.jsx(sn,{size:16})}),pe("fit-width",u?b.fitWidthOn:b.fitWidthOff)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":U?"Unpin preview":"Pin preview",onClick:()=>{f(),!(R||u)&&Y(A=>{if(!A){const re=v();return re&&H(re),!0}return $(!1),V(0),H(null),!1})},onMouseEnter:()=>O("pin"),onMouseLeave:f,onFocus:()=>O("pin"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",R||u?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":U?ve:ce].join(" "),disabled:R||u,children:p.jsx(gn,{size:16})}),pe("pin",R?b.pinUnavailable:u?b.pinUnavailableFitWidth:U?b.pinOn:b.pinOff)]}),p.jsxs("div",{className:"relative",children:[p.jsx("button",{type:"button","aria-label":R?"Exit maximize":"Maximize preview",onClick:()=>{f(),G(A=>!A)},onMouseEnter:()=>O("maximize"),onMouseLeave:f,onFocus:()=>O("maximize"),onBlur:f,className:["inline-flex h-9 w-9 items-center justify-center rounded-r-full border-t border-b border-r border-l-0 text-sm transition backdrop-blur-sm",R?ve:ce].join(" "),children:R?p.jsx(Qt,{size:16}):p.jsx(dn,{size:16})}),pe("maximize",R?b.maximizeOn:b.maximizeOff)]})]})]});return p.jsxs("div",{ref:ee,className:"space-y-4",children:[p.jsx("div",{ref:me,"aria-hidden":"true"}),p.jsxs("div",{ref:B,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${R?u?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":U?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:U&&L?{left:`${L.left}px`,top:ne??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${L.width}px`}:R?void 0:{overflow:"visible"},children:[R&&(u?p.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:p.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{G(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:p.jsx(Qt,{size:18})})}):p.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{G(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:p.jsx(Qt,{size:18})})),p.jsxs("div",{className:`relative ${R?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:R?u&&W?{aspectRatio:W,width:"100%"}:void 0:u&&W?{aspectRatio:W,width:"100%"}:W?r.sourceDimensions&&r.sourceDimensions.height>r.sourceDimensions.width?{aspectRatio:W,height:c?`${c}px`:"min(60vh, calc(100vh - 12rem))",maxHeight:"min(60vh, calc(100vh - 12rem))",maxWidth:"100%",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))",margin:"0 auto"}:{aspectRatio:W,width:"100%",maxHeight:c?`${c}px`:"min(60vh, calc(100vh - 12rem))",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:s,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[p.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",style:{filter:D!==1?`brightness(${D})`:void 0,transform:he||F?`scale(${he?-1:1}, ${F?-1:1})`:void 0},children:[z&&p.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),p.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&p.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[p.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),p.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&p.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",z?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[p.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),p.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),p.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&p.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:p.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[p.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),p.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),p.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),p.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&p.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!u&&p.jsx("div",{className:"absolute -bottom-8 -right-4 z-50 flex items-center gap-2",children:Se()})]}),u&&R&&p.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:Se()})]}),u&&!R&&p.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:Se()}),U&&L&&p.jsx("div",{style:{height:`${L.height}px`}})]})}const cr=k.lazy(()=>Do(()=>import("./VideoControls-D_aBkxAg.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),ur=k.lazy(()=>Do(()=>import("./RetroFilterPanel-DHqqQJ1p.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Ro=p.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function dr({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:u,onSetTargetWidth:h,onSetTargetHeight:i,onSetMatchTargetAspect:m,onResetSettings:E,onImportSettings:M}){return p.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&p.jsx(k.Suspense,{fallback:Ro,children:p.jsx(cr,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,noiseReductionAmount:e.noiseReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeNoiseReductionAmount:e.setNoiseReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:E,onImportSettings:M,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&p.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&p.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[p.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:p.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),p.jsx(k.Suspense,{fallback:Ro,children:p.jsx(ur,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,animeEdgeLow:o.animeEdgeLow,animeEdgeHigh:o.animeEdgeHigh,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:u,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetAnimeEdgeLow:o.setAnimeEdgeLow,onSetAnimeEdgeHigh:o.setAnimeEdgeHigh,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:i,onSetTargetWidth:h,onSetMatchTargetAspect:m,onSetVignetteStrength:o.setVignetteStrength})})]})]})}function To({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:u,className:h,onError:i,initialFilterState:m,confirmDialog:E}){const{showConfirmDialog:M}=en(),b=E??(S=>M({...S,title:S.title??"",body:S.body??""}).then(L=>L??!1)),I=k.useMemo(()=>xt()?.ui,[]),[R,G]=k.useState(I?.isHighResolution??!1),[X,Y]=k.useState(!1),[oe,$]=k.useState("playback"),K=k.useRef(""),V=k.useRef(""),x=ar(m),fe=R&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,D=ir(x,X?"width":"contain",fe),w=k.useCallback(()=>{Ln(),x.resetSettings(),D.resetAudioSettings(),G(!1)},[x,D]),he=k.useCallback(S=>{x.applyAllFilterSettings(S.filter),D.applyAudioSettings(S.audio),G(S.ui.isHighResolution),tn(S.locale)},[x,D]),Z=k.useCallback(()=>{if(!D.sourceDimensions)return;const S=Math.max(8,Math.round(x.targetWidth/D.sourceDimensions.width*D.sourceDimensions.height/8)*8);S!==x.targetHeight&&x.setTargetHeight(S)},[x.targetHeight,x.targetWidth,x.setTargetHeight,D.sourceDimensions]),F=k.useCallback(()=>D.sourceDimensions?.width&&D.sourceDimensions?.height?D.sourceDimensions.width/D.sourceDimensions.height:Math.max(x.targetWidth,1)/Math.max(x.targetHeight,1),[x.targetHeight,x.targetWidth,D.sourceDimensions]),ae=k.useCallback(S=>{if(x.setTargetWidth(S),!x.matchTargetAspect)return;const L=Math.max(F(),1e-4);x.setTargetHeight(Math.max(1,Math.round(S/L)))},[x,F]),le=k.useCallback(S=>{if(x.setTargetHeight(S),!x.matchTargetAspect)return;const L=Math.max(F(),1e-4);x.setTargetWidth(Math.max(1,Math.round(S*L)))},[x,F]),ge=k.useCallback(S=>{x.setMatchTargetAspect(S),S&&D.sourceDimensions&&Z()},[x,D.sourceDimensions,Z]),J=k.useCallback(S=>{if(x.applyPreset(S),S!=="phosphorDot"||!D.sourceDimensions)return;const L=nt.phosphorDot,H=Math.max(D.sourceDimensions.width,1),ee=Math.max(D.sourceDimensions.height,1),me=H/ee,B=L.width/L.height;let q=L.width,v=L.height;me>B?v=Math.max(8,Math.round(L.width/me/8)*8):q=Math.max(8,Math.round(L.height*me/8)*8),!(L.width===q&&L.height===v)&&(x.setTargetWidth(q),x.setTargetHeight(v))},[x.applyPreset,x.setTargetHeight,x.setTargetWidth,D.sourceDimensions]);return k.useEffect(()=>{x.matchTargetAspect&&D.sourceDimensions&&Z()},[x.matchTargetAspect,D.sourceDimensions,Z]),k.useEffect(()=>{if(o){const L=`stream:${o.id}:${n}:${r??""}`;if(K.current===L)return;K.current=L,(async()=>{try{await D.previewStream(o,n==="audio"?"audio":"video",r)}catch(H){i?.(H instanceof Error?H:new Error(String(H)))}})();return}if(!e){K.current="";return}const S=`src:${e}:${n}`;K.current!==S&&(K.current=S,(async()=>{try{await D.previewUrl(e,n)}catch(L){i?.(L instanceof Error?L:new Error(String(L)))}})())},[e,o,r,n,i,D]),k.useEffect(()=>{D.refreshLayout()},[X,D.refreshLayout]),k.useEffect(()=>{D.refreshLayout()},[x.targetWidth,x.targetHeight,x.isFilterEnabled,fe,D.refreshLayout]),k.useEffect(()=>{if(typeof u!="boolean")return;const S=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!S){V.current="";return}const L=`${S}:${u}`;V.current!==L&&(V.current=L,D.setLoopingEnabled(u))},[n,u,D,e,o]),p.jsx("section",{className:h??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:p.jsxs("div",{className:"space-y-4",children:[p.jsx(lr,{locale:t,src:e,kind:n,player:D,isHighResolution:R,isFitWidthEnabled:X,controlPanelMode:oe,confirmDialog:b,onHighResolutionChange:G,onFitWidthChange:Y,onError:i}),p.jsx(dr,{locale:t,player:D,filterState:x,controlPanelMode:oe,onControlPanelModeChange:$,onApplyPreset:J,onSetTargetWidth:ae,onSetTargetHeight:le,onSetMatchTargetAspect:ge,onResetSettings:w,onImportSettings:he})]})})}const mr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:To,default:To},Symbol.toStringTag,{value:"Module"}));export{de as D,zn as M,Mn as R,nt as a,mr as b,xt as l};
