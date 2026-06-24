const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-a3YzMDO5.js","./index-NBL4zKwB.js","./index-ef2Oc0Be.css","./core-RciSkj6z.js","./RetroFilterPanel-BOXpm9Zt.js"])))=>i.map(i=>d[i]);
import{b as Ke,r as u,R as Lo,a as S,j as l,P as fn,_ as Vo,u as vn,s as bn}from"./index-NBL4zKwB.js";import{i as _o}from"./core-RciSkj6z.js";const An=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],xn=Ke("aperture",An);const wn=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],Cn=Ke("arrow-left-right",wn);const yn=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],ht=Ke("bell",yn);const Sn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Do=Ke("circle",Sn);const Tn=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],Rn=Ke("ellipsis",Tn);const Ln=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Dn=Ke("maximize-2",Ln);const Mn=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],vo=Ke("minimize-2",Mn);const kn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],En=Ke("power",kn);const Bn=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3",key:"1i73f7"}],["path",{d:"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3",key:"saxlbk"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 14v2",key:"8jcxud"}],["path",{d:"M12 8v2",key:"1woqiv"}],["path",{d:"M12 2v2",key:"tus03m"}]],Pn=Ke("square-centerline-dashed-horizontal",Bn);const In=[["path",{d:"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3",key:"14bfxa"}],["path",{d:"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",key:"14rx03"}],["path",{d:"M4 12H2",key:"rhcxmi"}],["path",{d:"M10 12H8",key:"s88cx1"}],["path",{d:"M16 12h-2",key:"10asgb"}],["path",{d:"M22 12h-2",key:"14jgyd"}]],Fn=Ke("square-centerline-dashed-vertical",In);const Nn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Mo=Ke("square",Nn);const Gn=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],jn=Ke("sun",Gn);async function Hn(t,e){await _o("plugin:sharekit|share_file",{url:t,...e})}const xo="tetorica-retro-player.settings",Pt=1,It=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(xo);if(!t)return null;const e=JSON.parse(t);return e.version!==Pt?null:e}catch{return null}},wo=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(xo,JSON.stringify(t))}catch{}},Ft=()=>It(),On=t=>{const e=It();wo({version:Pt,audio:e?.audio,filter:t,ui:e?.ui})},Wn=t=>{const e=It();wo({version:Pt,audio:t,filter:e?.filter,ui:e?.ui})},Un=t=>{const e=It();wo({version:Pt,audio:e?.audio,filter:e?.filter,ui:t})},zn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(xo)}catch{}},ve={audioOptimizationMode:"auto",isMuted:!1,volume:.72,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,noiseReductionAmount:0,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.002,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},Vn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.002,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.002,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},_n=Object.fromEntries(Object.entries(Vn).map(([t,e])=>[t,{label:e.label,settings:{...ve,...e.settings}}])),Zn=Object.fromEntries(Object.entries(_n).map(([t,e])=>[t,e.settings]));function Kn(t){const r=new Float32Array(256),n=1+t*5;for(let o=0;o<256;o++){const c=o*2/255-1;r[o]=Math.tanh(c*n)}return r}function ko(t){const r=new Float32Array(256),n=t*8;for(let o=0;o<256;o++){const c=o*2/255-1;n<.001?r[o]=c:r[o]=Math.tanh(c*(1+n))/Math.tanh(1+n)}return r}function Xn(t){const r=Math.max(1,Math.floor(t.sampleRate*.22)),n=t.createBuffer(2,r,t.sampleRate);for(let o=0;o<n.numberOfChannels;o++){const c=n.getChannelData(o);for(let a=0;a<c.length;a++){const m=a/c.length,p=(1-m)**1.85,M=.78+.22*Math.sin(m*42+o*.9),P=Math.sin(m*130+o*.35)*.08;c[a]=(Math.random()*2-1+P)*p*M*.28}}return n}function qn(t){const r=Math.max(1,Math.floor(t.sampleRate*2.2)),n=t.createBuffer(2,r,t.sampleRate),o=Math.floor(t.sampleRate*.012);for(let c=0;c<n.numberOfChannels;c++){const a=n.getChannelData(c);for(let m=0;m<r;m++){if(m<o)continue;const p=(m-o)/(r-o),M=(1-p)**1.8,P=Math.max(0,1-p*2.5),y=Math.sin(p*160+c*.8)*P*.35;a[m]=(Math.random()*2-1+y)*M*.75}}return n}function Yn(t){const e=t.sampleRate*2,r=t.createBuffer(2,e,t.sampleRate);let n=0,o=0;for(let c=0;c<e;c++){const a=Math.random()*2-1;n=(n+a*.045)/1.045,o=o*.82+a*.18;const m=n*1.35,p=(a-o)*.55,M=Math.max(-1,Math.min(1,m+p));for(let P=0;P<r.numberOfChannels;P++){const y=r.getChannelData(P),H=(Math.random()*2-1)*.012;y[c]=Math.max(-1,Math.min(1,M+H))}}return r}function Jn(t){const e=t.sampleRate*2,r=new Float32Array(e);let n=0,o=0;for(;n<e;){const a=Math.random()*2-1;o=o*.72+a*.28,r[n]+=(a-o)*.018;const m=Math.random();if(m<.0034){const p=8+Math.floor(Math.random()*42),M=.11+Math.random()*.28,P=Math.random()<.5?-1:1;for(let y=0;y<p&&n+y<e;y++){const H=Math.exp(-y/(2.4+Math.random()*5));r[n+y]+=P*M*H*(.7+Math.random()*.3)}n+=p+Math.floor(Math.random()*640);continue}if(m<.0038){const p=90+Math.floor(Math.random()*260),M=.055+Math.random()*.11,P=Math.random()*Math.PI*2;for(let y=0;y<p&&n+y<e;y++){const H=Math.exp(-y/(18+Math.random()*40)),O=Math.sin(P+y*(.22+Math.random()*.06));r[n+y]+=M*H*O}n+=p+Math.floor(Math.random()*2200);continue}n++}const c=t.createBuffer(2,e,t.sampleRate);for(let a=0;a<c.numberOfChannels;a++){const m=c.getChannelData(a);for(let p=0;p<e;p++){const M=(Math.random()*2-1)*.0035;m[p]=Math.max(-1,Math.min(1,r[p]+M))}}return c}const $n=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function kt(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function Zo({preset:t,params:e}){return{...ve,...t?Zn[t]:null,...e}}class Qn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;autoConnections=new Set;externalConnections=new Set;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseHighpass:null,noiseLowpass:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:r,runtimeState:n,connectOutputToDestination:o=!1,connectOutputToRecordingDestination:c=!1,enableAudioWorklet:a=!0}){this.context=e,this.instanceLabel=r,this.runtimeState=n,this.currentSettings=n.settings,this.connectOutputToDestination=o,this.connectOutputToRecordingDestination=c,this.enableAudioWorklet=a}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.fxOutputGain??this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,r){$n()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,r??{})}getParams(){return{...this.currentSettings}}setParams(e,r=!0){const n=r?{...this.currentSettings,...e}:{...ve,...e};Object.assign(this.currentSettings,n),this.updateAudioNodes()}applyPreset(e,r){const n=Zo({preset:e,params:r});Object.assign(this.currentSettings,n),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,postCrushLowpass:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseHighpass:null,noiseLowpass:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,r=this.nodes.radioToneHighpass,n=this.nodes.radioToneLowpass,o=this.nodes.radioTonePresence,c=this.nodes.lofiLowpass,a=this.nodes.lofiHighshelf,m=this.nodes.lofiDrive,p=this.nodes.bitcrusher,M=this.nodes.bassEq,P=this.nodes.midEq,y=this.nodes.trebleEq,H=this.nodes.stereoWidth,O=this.nodes.roomDryGain,A=this.nodes.roomWetGain,_=this.nodes.wowFlutterDelay,Y=this.nodes.wowLfo,$=this.nodes.wowLfoGain,te=this.nodes.flutterLfo,ee=this.nodes.flutterLfoGain,Q=this.nodes.noiseGain,z=this.nodes.crackleGain,ne=this.nodes.vinylDustBedFilter,T=this.nodes.vinylDustBedGain,{settings:b,isPlaying:L,isOutputEnabled:Z}=this.runtimeState,q=b.isMuted||!Z?0:b.volume;if(e&&(e.gain.value=q),r&&n&&o){const v=b.isAudioFxEnabled?b.radioToneAmount:0;r.frequency.value=20+v*430,r.Q.value=.4+v*.35,n.frequency.value=2e4-v*17400,n.Q.value=.2+v*.9,o.frequency.value=1700,o.Q.value=.8+v*1.4,o.gain.value=v*6}if(c&&a&&m){const v=b.isAudioFxEnabled?b.lofiAmount:0;c.frequency.value=16e3-v*14200,c.Q.value=.3+v*1.8,a.gain.value=-v*18;try{m.curve=Kn(v*.6)}catch{}}if(p){const v=b.isAudioFxEnabled,X=16-(v?b.bitCrushAmount:0)*12,w=1+(v?b.sampleRateReductionAmount:0)*23,j=v?Math.max(b.bitCrushAmount,b.sampleRateReductionAmount):0;p.parameters.get("bitDepth")?.setValueAtTime(X,p.context.currentTime),p.parameters.get("holdFrames")?.setValueAtTime(w,p.context.currentTime),p.parameters.get("mix")?.setValueAtTime(j,p.context.currentTime)}const G=this.nodes.postCrushLowpass;if(G){const v=b.isAudioFxEnabled?b.noiseReductionAmount:0;G.frequency.value=Math.max(3e3,18e3-v*15e3)}if(M&&P&&y){const v=b.isAudioFxEnabled?15:0;M.gain.value=b.bassAmount*v,P.gain.value=b.midAmount*v,y.gain.value=b.trebleAmount*v}if(H){const v=b.isAudioFxEnabled?1+b.stereoWidthAmount:1;H.parameters.get("width")?.setValueAtTime(v,H.context.currentTime)}if(O&&A){const v=b.isAudioFxEnabled?b.smallSpeakerRoomAmount:0;O.gain.value=Math.max(.52,1-v*.42),A.gain.value=v*.95}if(_&&Y&&$&&te&&ee){const v=b.isAudioFxEnabled?b.wowFlutterAmount:0;_.delayTime.value=v>0?.006+v*.004:0,Y.frequency.value=.18+v*.42,$.gain.value=v*.0023,te.frequency.value=5.2+v*6.5,ee.gain.value=v*6e-4}if(Q&&(Q.gain.value=b.isNoiseEnabled&&!b.isMuted&&Z&&L?Math.min(.24,b.noiseLevel*5.5):0),z){const v=b.isNoiseEnabled&&!b.isMuted&&Z&&L;z.gain.value=v?Math.min(.24,b.vinylDustAmount*.22+b.noiseLevel*.25):0}if(ne&&T){const X=b.isNoiseEnabled&&!b.isMuted&&Z&&L?b.vinylDustAmount:0;ne.frequency.value=2100+X*2600,ne.Q.value=.35+X*.25,T.gain.value=X*.11}const J=this.nodes.echoDelayLine,ce=this.nodes.echoFeedbackGain,se=this.nodes.echoWetGain;if(J&&ce&&se){const v=b.isAudioFxEnabled?b.delayAmount:0;ce.gain.value=v*.5,se.gain.value=v*.55}const R=this.nodes.hallReverbWetGain;if(R){const v=b.isAudioFxEnabled?b.reverbAmount:0;R.gain.value=v*2}const D=this.nodes.chorusLfoGain1,V=this.nodes.chorusLfoGain2,W=this.nodes.chorusWetGain;if(D&&V&&W){const v=b.isAudioFxEnabled?b.chorusAmount:0;W.gain.value=v*.6,D.gain.value=v*.005,V.gain.value=v*.006}const K=this.nodes.tapeSaturator;if(K)try{K.curve=ko(b.isAudioFxEnabled?b.tapeSaturationAmount:0)}catch{}const g=this.nodes.busCompressor;if(g){const v=b.isAudioFxEnabled?b.compressorAmount:0;g.threshold.value=-36*v,g.ratio.value=1+9*v}const I=this.nodes.fxOutputGain;I&&(I.gain.value=b.isAudioFxEnabled?b.fxOutputTrimAmount:1)}async loadWorklets(e){let r=null,n=null;const o=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in e&&o){const c=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICAgIG5zRXJyb3I6IDAsICAvLyBub2lzZSBzaGFwaW5nIGZlZWRiYWNrCiAgICAgIH0pOwogICAgfQoKICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgY2hhbm5lbENvdW50OyBjaGFubmVsICs9IDEpIHsKICAgICAgY29uc3QgaW5wdXRDaGFubmVsID0gaW5wdXQ/LltjaGFubmVsXSA/PyBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IG91dHB1dENoYW5uZWwgPSBvdXRwdXRbY2hhbm5lbF07CiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jaGFubmVsU3RhdGVbY2hhbm5lbF07CgogICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgb3V0cHV0Q2hhbm5lbC5sZW5ndGg7IGluZGV4ICs9IDEpIHsKICAgICAgICBjb25zdCBiaXREZXB0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLmJpdERlcHRoLCBpbmRleCk7CiAgICAgICAgY29uc3QgaG9sZEZyYW1lcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQocmVhZFBhcmFtKHBhcmFtZXRlcnMuaG9sZEZyYW1lcywgaW5kZXgpKSk7CiAgICAgICAgY29uc3QgbWl4ID0gcmVhZFBhcmFtKHBhcmFtZXRlcnMubWl4LCBpbmRleCk7CiAgICAgICAgY29uc3Qgc291cmNlID0gaW5wdXRDaGFubmVsPy5baW5kZXhdID8/IDA7CgogICAgICAgIGlmIChzdGF0ZS5ob2xkQ291bnRlciA8PSAwKSB7CiAgICAgICAgICAvLyDkuInop5Ljg4fjgqPjgrbjg6rjg7PjgrA6IOmHj+WtkOWMluatquOBvyDihpIg44K144Op44K144Op44GX44Gf44OS44K56Z+z44Gr5aSJ5o+bCiAgICAgICAgICBjb25zdCBsc2IgPSAyIC8gTWF0aC5wb3coMiwgYml0RGVwdGgpOwogICAgICAgICAgY29uc3QgZGl0aGVyID0gKE1hdGgucmFuZG9tKCkgKyBNYXRoLnJhbmRvbSgpIC0gMSkgKiBsc2I7CiAgICAgICAgICAvLyAx5qyh44OO44Kk44K644K344Kn44O844OU44Oz44KwOiDliY3lm57jga7ph4/lrZDljJboqqTlt67jgpLjg5XjgqPjg7zjg4njg5Djg4Pjgq/jgZfjgabpq5jln5/jgbjmirzjgZflh7rjgZkKICAgICAgICAgIGNvbnN0IHNoYXBlZCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBzb3VyY2UgKyBkaXRoZXIgLSBzdGF0ZS5uc0Vycm9yICogMC44NSkpOwogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNoYXBlZCwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUubnNFcnJvciA9IHN0YXRlLmhlbGRTYW1wbGUgLSBzaGFwZWQ7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciA9IGhvbGRGcmFtZXMgLSAxOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBzdGF0ZS5ob2xkQ291bnRlciAtPSAxOwogICAgICAgIH0KCiAgICAgICAgb3V0cHV0Q2hhbm5lbFtpbmRleF0gPSBzb3VyY2UgKyAoc3RhdGUuaGVsZFNhbXBsZSAtIHNvdXJjZSkgKiBtaXg7CiAgICAgIH0KICAgIH0KCiAgICByZXR1cm4gdHJ1ZTsKICB9Cn0KCmZ1bmN0aW9uIHJlYWRQYXJhbSh2YWx1ZXMsIGluZGV4KSB7CiAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IDEgPyB2YWx1ZXNbMF0gOiB2YWx1ZXNbaW5kZXhdOwp9CgpmdW5jdGlvbiBxdWFudGl6ZVNhbXBsZShzYW1wbGUsIGJpdERlcHRoKSB7CiAgY29uc3QgcmVzb2x2ZWRCaXREZXB0aCA9IE1hdGgubWF4KDIsIE1hdGgubWluKDE2LCBNYXRoLnJvdW5kKGJpdERlcHRoKSkpOwogIGlmIChyZXNvbHZlZEJpdERlcHRoID49IDE2KSB7CiAgICByZXR1cm4gc2FtcGxlOwogIH0KCiAgY29uc3QgbGV2ZWxzID0gMiAqKiByZXNvbHZlZEJpdERlcHRoOwogIGNvbnN0IG5vcm1hbGl6ZWQgPSAoc2FtcGxlICsgMSkgKiAwLjU7CiAgY29uc3QgcXVhbnRpemVkID0gTWF0aC5yb3VuZChub3JtYWxpemVkICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTsKICByZXR1cm4gcXVhbnRpemVkICogMiAtIDE7Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1iaXRjcnVzaGVyIiwgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yKTsK",import.meta.url);await e.audioWorklet.addModule(c.href),r=new o(e,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const a=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await e.audioWorklet.addModule(a.href),n=new o(e,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}return{bitcrusher:r,stereoWidth:n}}buildAndWireNodes(e,r){const n=e.createGain();let o=null;if("createMediaStreamDestination"in e)try{o=e.createMediaStreamDestination()}catch{o=null}const c=e.createBiquadFilter(),a=e.createBiquadFilter(),m=e.createBiquadFilter(),p=e.createBiquadFilter(),M=e.createBiquadFilter(),P=e.createWaveShaper(),y=e.createBiquadFilter(),H=e.createBiquadFilter(),O=e.createBiquadFilter(),A=e.createBiquadFilter(),_=e.createGain(),Y=e.createConvolver(),$=e.createGain(),te=e.createDelay(.05),ee=e.createOscillator(),Q=e.createGain(),z=e.createOscillator(),ne=e.createGain(),T=e.createWaveShaper(),b=e.createGain(),L=e.createDynamicsCompressor(),Z=e.createDelay(1),q=e.createGain(),G=e.createGain(),J=e.createConvolver(),ce=e.createGain(),se=e.createDelay(.05),R=e.createDelay(.05),D=e.createOscillator(),V=e.createOscillator(),W=e.createGain(),K=e.createGain(),g=e.createGain(),I=e.createGain(),v=e.createBufferSource(),X=e.createBiquadFilter(),w=e.createBiquadFilter(),j=e.createBiquadFilter(),k=e.createStereoPanner(),re=e.createGain(),oe=e.createOscillator(),ge=e.createGain(),U=e.createBufferSource(),Ce=e.createBiquadFilter(),ae=e.createBiquadFilter(),we=e.createGain(),h=e.createGain();c.type="highpass",a.type="lowpass",m.type="peaking",p.type="lowpass",M.type="highshelf",M.frequency.value=2800,P.oversample="4x",y.type="lowpass",y.frequency.value=18e3,y.Q.value=.5,H.type="lowshelf",H.frequency.value=180,O.type="peaking",O.frequency.value=1200,O.Q.value=.5,A.type="highshelf",A.frequency.value=2800,Y.buffer=Xn(e),te.delayTime.value=0,ee.type="sine",z.type="sine",T.curve=ko(0),T.oversample="4x",b.gain.value=1,L.knee.value=10,L.attack.value=.003,L.release.value=.12,L.threshold.value=0,L.ratio.value=1,Z.delayTime.value=.32,q.gain.value=0,G.gain.value=0,J.buffer=qn(e),ce.gain.value=0,se.delayTime.value=.018,R.delayTime.value=.023,D.type="sine",V.type="sine",D.frequency.value=.8,V.frequency.value=1.3,W.gain.value=0,K.gain.value=0,g.gain.value=0,I.gain.value=1,n.gain.value=0,re.gain.value=0,v.buffer=Yn(e),v.loop=!0,X.type="highpass",X.frequency.value=1100,X.Q.value=.25,w.type="lowpass",w.frequency.value=5600,w.Q.value=.18,j.type="peaking",j.frequency.value=2400,j.Q.value=.7,j.gain.value=-2.5,oe.type="sine",oe.frequency.value=.021,ge.gain.value=.08,U.buffer=Jn(e),U.loop=!0,Ce.type="highpass",Ce.frequency.value=1250,Ce.Q.value=.35,ae.type="bandpass",ae.frequency.value=2400,ae.Q.value=.4,we.gain.value=0,h.gain.value=0;const{bitcrusher:s,stereoWidth:fe}=r;return ee.connect(Q),Q.connect(te.delayTime),z.connect(ne),ne.connect(te.delayTime),te.connect(c),c.connect(a),a.connect(m),m.connect(p),p.connect(M),M.connect(P),s?(P.connect(s),s.connect(y)):P.connect(y),y.connect(H),H.connect(O),O.connect(A),A.connect(T),fe?(T.connect(fe),fe.connect(_),fe.connect(Y)):(T.connect(_),T.connect(Y)),Y.connect($),_.connect(n),$.connect(n),n.connect(b),n.connect(Z),Z.connect(q),q.connect(Z),Z.connect(G),G.connect(b),n.connect(J),J.connect(ce),ce.connect(b),n.connect(se),n.connect(R),D.connect(W),W.connect(se.delayTime),V.connect(K),K.connect(R.delayTime),se.connect(g),R.connect(g),g.connect(b),b.connect(L),L.connect(I),v.connect(X),X.connect(w),w.connect(j),j.connect(k),k.connect(re),re.connect(n),oe.connect(ge),ge.connect(k.pan),U.connect(Ce),Ce.connect(h),h.connect(n),U.connect(ae),ae.connect(we),we.connect(n),{masterGain:n,recordingDestination:o,radioToneHighpass:c,radioToneLowpass:a,radioTonePresence:m,lofiLowpass:p,lofiHighshelf:M,lofiDrive:P,bitcrusher:s,postCrushLowpass:y,bassEq:H,midEq:O,trebleEq:A,stereoWidth:fe,roomDryGain:_,roomConvolver:Y,roomWetGain:$,wowFlutterDelay:te,wowLfo:ee,wowLfoGain:Q,flutterLfo:z,flutterLfoGain:ne,noiseSource:v,noiseHighpass:X,noiseLowpass:w,noiseFilter:j,noisePanner:k,noiseGain:re,noiseLfo:oe,noiseLfoGain:ge,crackleSource:U,crackleFilter:Ce,vinylDustBedFilter:ae,vinylDustBedGain:we,crackleGain:h,outputBus:b,echoDelayLine:Z,echoFeedbackGain:q,echoWetGain:G,hallReverbConvolver:J,hallReverbWetGain:ce,chorusDelay1:se,chorusDelay2:R,chorusLfo1:D,chorusLfo2:V,chorusLfoGain1:W,chorusLfoGain2:K,chorusWetGain:g,tapeSaturator:T,busCompressor:L,fxOutputGain:I}}startSources(){this.nodes.noiseSource?.start(),this.nodes.noiseLfo?.start(),this.nodes.crackleSource?.start(),this.nodes.wowLfo?.start(),this.nodes.flutterLfo?.start(),this.nodes.chorusLfo1?.start(),this.nodes.chorusLfo2?.start()}applyAutoConnect(){const e=this.nodes.fxOutputGain;if(!e)return;this.connectOutputToDestination&&(e.connect(this.context.destination),this.autoConnections.add(this.context.destination));const r=this.nodes.recordingDestination;r&&this.connectOutputToRecordingDestination&&(e.connect(r),this.autoConnections.add(r))}async initNodes(){const e=this.context,r=await this.loadWorklets(e),n=this.buildAndWireNodes(e,r);Object.assign(this.nodes,{audioContext:e,...n}),this.startSources(),this.applyAutoConnect()}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;(!this.nodes.audioContext||!this.nodes.masterGain)&&await this.initNodes();const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const r=await this.ensureInitialized();if(!r){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:r.state})}async connect(e,r,n){const o=await this.ensureInitialized();if(!o){this.debugAudio("connect:no-context");return}const c=this.output;if(!c){this.debugAudio("connect:no-output-node",{audioContextState:o.state});return}if(kt(e)){c.connect(e,r),this.externalConnections.add(e);return}if(this.connectOutputToDestination&&e===o.destination){this.debugAudio("connect:skipped-double-destination");return}c.connect(e,r,n),this.externalConnections.add(e)}disconnect(e){const r=this.output;if(r)if(e!==void 0){try{kt(e),r.disconnect(e)}catch{}this.externalConnections.delete(e)}else{for(const n of this.externalConnections)try{kt(n),r.disconnect(n)}catch{}this.externalConnections.clear()}}async dispose(){const e=[this.nodes.noiseSource,this.nodes.noiseLfo,this.nodes.crackleSource,this.nodes.wowLfo,this.nodes.flutterLfo,this.nodes.chorusLfo1,this.nodes.chorusLfo2];for(const o of e){try{o?.stop()}catch{}try{o?.disconnect()}catch{}}try{this.nodes.sourceNode?.disconnect()}catch{}this.disconnect();const r=this.output;if(r)for(const o of this.autoConnections)try{kt(o),r.disconnect(o)}catch{}this.autoConnections.clear();const n=[this.nodes.wowFlutterDelay,this.nodes.wowLfoGain,this.nodes.flutterLfoGain,this.nodes.radioToneHighpass,this.nodes.radioToneLowpass,this.nodes.radioTonePresence,this.nodes.lofiLowpass,this.nodes.lofiHighshelf,this.nodes.lofiDrive,this.nodes.bitcrusher,this.nodes.postCrushLowpass,this.nodes.bassEq,this.nodes.midEq,this.nodes.trebleEq,this.nodes.tapeSaturator,this.nodes.stereoWidth,this.nodes.roomDryGain,this.nodes.roomConvolver,this.nodes.roomWetGain,this.nodes.echoDelayLine,this.nodes.echoFeedbackGain,this.nodes.echoWetGain,this.nodes.hallReverbConvolver,this.nodes.hallReverbWetGain,this.nodes.chorusDelay1,this.nodes.chorusDelay2,this.nodes.chorusLfoGain1,this.nodes.chorusLfoGain2,this.nodes.chorusWetGain,this.nodes.noisePanner,this.nodes.noiseGain,this.nodes.noiseHighpass,this.nodes.noiseLowpass,this.nodes.noiseFilter,this.nodes.noiseLfoGain,this.nodes.crackleFilter,this.nodes.vinylDustBedFilter,this.nodes.vinylDustBedGain,this.nodes.crackleGain,this.nodes.masterGain,this.nodes.outputBus,this.nodes.busCompressor,this.nodes.fxOutputGain];for(const o of n)try{o?.disconnect()}catch{}this.resetNodes()}async ensureAudioContext(){return this.ensureInitialized()}}function Eo({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:r=!1,...n}){const c={settings:Zo(n),isPlaying:n.isPlaying??!0,isOutputEnabled:n.previewKind===void 0?!0:n.previewKind==="video"||n.previewKind==="audio"||n.previewKind==="capture"};return new Qn({context:t,instanceLabel:n.instanceLabel??"tetorica-retro-audio-engine",runtimeState:c,connectOutputToDestination:e,connectOutputToRecordingDestination:r,enableAudioWorklet:n.enableAudioWorklet})}function ho(t){if(t==="chrome")return!1;if(t==="safari")return!0;if(typeof navigator>"u"||typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window)||navigator.vendor!=="Apple Computer, Inc.")return!1;const e=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(e)}function he(t){return{get current(){return t()}}}function er({instanceLabel:t,previewKind:e,previewKindRef:r,mediaRef:n,isPlaying:o,isPlayingRef:c}){const[a]=u.useState(()=>{const d=Ft()?.audio;return{audioOptimizationMode:d?.audioOptimizationMode??ve.audioOptimizationMode,isMuted:d?.isMuted??ve.isMuted,volume:d?.volume??ve.volume,playbackRate:d?.playbackRate??ve.playbackRate,isLooping:d?.isLooping??ve.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??ve.isAudioFxEnabled,lofiAmount:d?.lofiAmount??ve.lofiAmount,radioToneAmount:d?.radioToneAmount??ve.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??ve.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??ve.sampleRateReductionAmount,noiseReductionAmount:d?.noiseReductionAmount??ve.noiseReductionAmount,bassAmount:d?.bassAmount??ve.bassAmount,midAmount:d?.midAmount??ve.midAmount,trebleAmount:d?.trebleAmount??ve.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??ve.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??ve.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??ve.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??ve.isNoiseEnabled,noiseLevel:d?.noiseLevel??ve.noiseLevel,vinylDustAmount:d?.vinylDustAmount??ve.vinylDustAmount,delayAmount:d?.delayAmount??ve.delayAmount,reverbAmount:d?.reverbAmount??ve.reverbAmount,chorusAmount:d?.chorusAmount??ve.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??ve.tapeSaturationAmount,compressorAmount:d?.compressorAmount??ve.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??ve.fxOutputTrimAmount}}),m=u.useRef(a.audioOptimizationMode),p=u.useRef(a.isMuted),M=u.useRef(a.volume),P=u.useRef(a.playbackRate),y=u.useRef(a.isLooping),H=u.useRef(a.isAudioFxEnabled),O=u.useRef(a.lofiAmount),A=u.useRef(a.radioToneAmount),_=u.useRef(a.bitCrushAmount),Y=u.useRef(a.sampleRateReductionAmount),$=u.useRef(a.noiseReductionAmount),te=u.useRef(a.bassAmount),ee=u.useRef(a.midAmount),Q=u.useRef(a.trebleAmount),z=u.useRef(a.stereoWidthAmount),ne=u.useRef(a.smallSpeakerRoomAmount),T=u.useRef(a.wowFlutterAmount),b=u.useRef(a.isNoiseEnabled),L=u.useRef(a.noiseLevel),Z=u.useRef(a.vinylDustAmount),q=u.useRef(a.delayAmount),G=u.useRef(a.reverbAmount),J=u.useRef(a.chorusAmount),ce=u.useRef(a.tapeSaturationAmount),se=u.useRef(a.compressorAmount),R=u.useRef(a.fxOutputTrimAmount),[D,V]=u.useState(a.audioOptimizationMode),[W,K]=u.useState(a.isMuted),[g,I]=u.useState(a.playbackRate),[v,X]=u.useState(a.volume),[w,j]=u.useState(a.isLooping),[k,re]=u.useState(a.isAudioFxEnabled),[oe,ge]=u.useState(a.lofiAmount),[U,Ce]=u.useState(a.radioToneAmount),[ae,we]=u.useState(a.bitCrushAmount),[h,s]=u.useState(a.sampleRateReductionAmount),[fe,ye]=u.useState(a.noiseReductionAmount),[Ae,B]=u.useState(a.bassAmount),[pe,le]=u.useState(a.midAmount),[Le,Ie]=u.useState(a.trebleAmount),[Te,Oe]=u.useState(a.stereoWidthAmount),[ke,We]=u.useState(a.smallSpeakerRoomAmount),[Fe,Ue]=u.useState(a.wowFlutterAmount),[Ne,Je]=u.useState(a.isNoiseEnabled),[Ge,et]=u.useState(a.noiseLevel),[Ee,Xe]=u.useState(a.vinylDustAmount),[Re,De]=u.useState(a.delayAmount),[ze,$e]=u.useState(a.reverbAmount),[Be,qe]=u.useState(a.chorusAmount),[Pe,it]=u.useState(a.tapeSaturationAmount),[Ve,tt]=u.useState(a.compressorAmount),[Ye,ot]=u.useState(a.fxOutputTrimAmount),i=u.useRef(null),x=u.useRef(null),f=u.useRef(null),ie=()=>{if(!f.current){const d=new AudioContext({latencyHint:"interactive"});x.current=d,f.current=Eo({context:d,instanceLabel:t,params:a,isPlaying:c.current,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})}return f.current},[N]=u.useState(()=>({audioContextRef:he(()=>f.current?.audioContext??null),masterGainRef:he(()=>f.current?.masterGain??null),radioToneHighpassRef:he(()=>f.current?.radioToneHighpass??null),radioToneLowpassRef:he(()=>f.current?.radioToneLowpass??null),radioTonePresenceRef:he(()=>f.current?.radioTonePresence??null),recordingDestinationRef:he(()=>f.current?.recordingDestination??null),lofiLowpassRef:he(()=>f.current?.lofiLowpass??null),lofiHighshelfRef:he(()=>f.current?.lofiHighshelf??null),lofiDriveRef:he(()=>f.current?.lofiDrive??null),bitcrusherRef:he(()=>f.current?.bitcrusher??null),bassEqRef:he(()=>f.current?.bassEq??null),midEqRef:he(()=>f.current?.midEq??null),trebleEqRef:he(()=>f.current?.trebleEq??null),stereoWidthRef:he(()=>f.current?.stereoWidth??null),roomDryGainRef:he(()=>f.current?.roomDryGain??null),roomConvolverRef:he(()=>f.current?.roomConvolver??null),roomWetGainRef:he(()=>f.current?.roomWetGain??null),wowFlutterDelayRef:he(()=>f.current?.wowFlutterDelay??null),wowLfoRef:he(()=>f.current?.wowLfo??null),wowLfoGainRef:he(()=>f.current?.wowLfoGain??null),flutterLfoRef:he(()=>f.current?.flutterLfo??null),flutterLfoGainRef:he(()=>f.current?.flutterLfoGain??null),noiseSourceRef:he(()=>f.current?.noiseSource??null),noiseFilterRef:he(()=>f.current?.noiseFilter??null),noisePannerRef:he(()=>f.current?.noisePanner??null),noiseGainRef:he(()=>f.current?.noiseGain??null),noiseLfoRef:he(()=>f.current?.noiseLfo??null),noiseLfoGainRef:he(()=>f.current?.noiseLfoGain??null),crackleSourceRef:he(()=>f.current?.crackleSource??null),crackleFilterRef:he(()=>f.current?.crackleFilter??null),vinylDustBedFilterRef:he(()=>f.current?.vinylDustBedFilter??null),vinylDustBedGainRef:he(()=>f.current?.vinylDustBedGain??null),crackleGainRef:he(()=>f.current?.crackleGain??null)})),{audioContextRef:E,masterGainRef:xe,radioToneHighpassRef:de,radioToneLowpassRef:pt,radioTonePresenceRef:Gt,recordingDestinationRef:ft,lofiLowpassRef:jt,lofiHighshelfRef:Ht,lofiDriveRef:Ot,bitcrusherRef:vt,bassEqRef:Wt,midEqRef:bt,trebleEqRef:Ut,stereoWidthRef:zt,roomDryGainRef:Vt,roomConvolverRef:At,roomWetGainRef:_t,wowFlutterDelayRef:xt,wowLfoRef:Zt,wowLfoGainRef:wt,flutterLfoRef:Kt,flutterLfoGainRef:Ct,noiseSourceRef:Xt,noiseFilterRef:yt,noisePannerRef:qt,noiseGainRef:Yt,noiseLfoRef:Jt,noiseLfoGainRef:$t,crackleSourceRef:Qt,crackleFilterRef:eo,vinylDustBedFilterRef:to,vinylDustBedGainRef:oo,crackleGainRef:no}=N,ro=()=>({audioOptimizationMode:m.current,isMuted:p.current,volume:M.current,playbackRate:P.current,isLooping:y.current,isAudioFxEnabled:H.current,lofiAmount:O.current,radioToneAmount:A.current,bitCrushAmount:_.current,sampleRateReductionAmount:Y.current,noiseReductionAmount:$.current,bassAmount:te.current,midAmount:ee.current,trebleAmount:Q.current,stereoWidthAmount:z.current,smallSpeakerRoomAmount:ne.current,wowFlutterAmount:T.current,isNoiseEnabled:b.current,noiseLevel:L.current,vinylDustAmount:Z.current,delayAmount:q.current,reverbAmount:G.current,chorusAmount:J.current,tapeSaturationAmount:ce.current,compressorAmount:se.current,fxOutputTrimAmount:R.current}),je=(d,be)=>f.current?.debugAudio(d,be),ut=()=>ie().ensureInitialized(),ao=()=>ie().ensureInitialized(),nt=()=>f.current?.updateAudioNodes(),io=d=>ie().connectSourceNode(d),so=async()=>{await f.current?.dispose()},St=(d,be)=>f.current?.setParams(d,be),Tt=d=>f.current?.setIsPlaying(d),lo=d=>f.current?.setOutputEnabled(d),Rt=async d=>{if(d.state!=="closed")try{await d.close()}catch(be){je("closeOwnedAudioContext:error",{audioContextState:d.state,message:be instanceof Error?be.message:String(be)})}},Lt=async d=>{const be=x.current,_e=f.current,He=ro();je("recreateAudioEngine:start",{audioContextState:be?.state??"none",hasMedia:!!n.current,reason:d}),i.current?.disconnect(),i.current=null,_e&&await _e.dispose(),be&&await Rt(be);const dt=new AudioContext({latencyHint:"interactive"}),rt=Eo({context:dt,instanceLabel:t,params:He,isPlaying:c.current,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0});x.current=dt,f.current=rt;const Qe=await rt.ensureInitialized();return rt.setParams(He,!0),rt.setIsPlaying(c.current),rt.setOutputEnabled(r.current==="video"||r.current==="audio"||r.current==="capture"),je("recreateAudioEngine:ready",{audioContextState:Qe?.state??dt.state,hasMedia:!!n.current,reason:d}),Qe},Dt=async d=>{const be=await ut(),_e=f.current;if(!be||!_e||!_e.input){je("connectMediaAudio:no-context",{mediaTag:d.tagName});return}i.current&&(je("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),i.current.disconnect(),i.current=null);try{const He=be.createMediaElementSource(d);He.connect(_e.input),i.current=He,ho(m.current)?(d.muted=!1,d.volume=0):(d.muted=p.current,d.volume=p.current?0:M.current),je("connectMediaAudio:connected",{audioContextState:be.state,mediaTag:d.tagName,previewKind:r.current}),nt()}catch(He){throw je("connectMediaAudio:error",{audioContextState:be.state,mediaTag:d.tagName,message:He instanceof Error?He.message:String(He),previewKind:r.current}),He}},st=()=>{const d=i.current,be=f.current;!d||!be?.input||(d.disconnect(),d.connect(be.input),nt())},uo=async d=>{const be=await ut();return be?(je("ensureAudioContextWithRecovery:healthy",{audioContextState:be.state,reason:d}),be):(je("ensureAudioContextWithRecovery:recreate-needed",{audioContextState:x.current?.state??"none",reason:d}),Lt(d))},lt=async d=>{const be=n.current,_e=await Lt(d);return _e?(be&&await Dt(be),nt(),je("rebuildAudioGraphForCurrentMedia:done",{audioContextState:_e.state,hasMedia:!!be,reason:d}),_e):null},co=async()=>{i.current?.disconnect(),i.current=null,await so(),x.current&&await Rt(x.current)},ct=d=>{m.current=d.audioOptimizationMode,p.current=d.isMuted,M.current=d.volume,P.current=d.playbackRate,y.current=d.isLooping,H.current=d.isAudioFxEnabled,O.current=d.lofiAmount,A.current=d.radioToneAmount,_.current=d.bitCrushAmount,Y.current=d.sampleRateReductionAmount,$.current=d.noiseReductionAmount,te.current=d.bassAmount,ee.current=d.midAmount,Q.current=d.trebleAmount,z.current=d.stereoWidthAmount,ne.current=d.smallSpeakerRoomAmount,T.current=d.wowFlutterAmount,b.current=d.isNoiseEnabled,L.current=d.noiseLevel,Z.current=d.vinylDustAmount,q.current=d.delayAmount,G.current=d.reverbAmount,J.current=d.chorusAmount,ce.current=d.tapeSaturationAmount,se.current=d.compressorAmount,R.current=d.fxOutputTrimAmount,V(d.audioOptimizationMode),K(d.isMuted),X(d.volume),I(d.playbackRate),j(d.isLooping),re(d.isAudioFxEnabled),ge(d.lofiAmount),Ce(d.radioToneAmount),we(d.bitCrushAmount),s(d.sampleRateReductionAmount),ye(d.noiseReductionAmount),B(d.bassAmount),le(d.midAmount),Ie(d.trebleAmount),Oe(d.stereoWidthAmount),We(d.smallSpeakerRoomAmount),Ue(d.wowFlutterAmount),Je(d.isNoiseEnabled),et(d.noiseLevel),Xe(d.vinylDustAmount),De(d.delayAmount),$e(d.reverbAmount),qe(d.chorusAmount),it(d.tapeSaturationAmount),tt(d.compressorAmount),ot(d.fxOutputTrimAmount),n.current&&(ho(d.audioOptimizationMode)&&i.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=d.isMuted,n.current.volume=d.volume),n.current.playbackRate=d.playbackRate,n.current.loop=d.isLooping),St(d),window.requestAnimationFrame(nt)},mo=()=>ct({...ve});return u.useEffect(()=>{m.current=D,p.current=W,M.current=v,P.current=g,y.current=w,H.current=k,O.current=oe,A.current=U,_.current=ae,Y.current=h,$.current=fe,te.current=Ae,ee.current=pe,Q.current=Le,z.current=Te,ne.current=ke,T.current=Fe,b.current=Ne,L.current=Ge,Z.current=Ee,q.current=Re,G.current=ze,J.current=Be,ce.current=Pe,se.current=Ve,R.current=Ye,St({isMuted:W,audioOptimizationMode:D,volume:v,playbackRate:g,isLooping:w,isAudioFxEnabled:k,lofiAmount:oe,radioToneAmount:U,bitCrushAmount:ae,sampleRateReductionAmount:h,noiseReductionAmount:fe,bassAmount:Ae,midAmount:pe,trebleAmount:Le,stereoWidthAmount:Te,smallSpeakerRoomAmount:ke,wowFlutterAmount:Fe,isNoiseEnabled:Ne,noiseLevel:Ge,vinylDustAmount:Ee,delayAmount:Re,reverbAmount:ze,chorusAmount:Be,tapeSaturationAmount:Pe,compressorAmount:Ve,fxOutputTrimAmount:Ye},!0),Tt(o),lo(e==="video"||e==="audio"||e==="capture"),n.current&&(ho(D)&&i.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=W,n.current.volume=W?0:v),n.current.playbackRate=g,n.current.loop=w)},[D,W,v,k,oe,U,ae,h,fe,Ae,pe,Le,Te,ke,Fe,Ne,Ge,Ee,Re,ze,Be,Pe,Ve,Ye,o,g,w,e]),u.useEffect(()=>{const d=setTimeout(()=>{Wn({audioOptimizationMode:D,isMuted:W,volume:v,playbackRate:g,isLooping:w,isAudioFxEnabled:k,lofiAmount:oe,radioToneAmount:U,bitCrushAmount:ae,sampleRateReductionAmount:h,noiseReductionAmount:fe,bassAmount:Ae,midAmount:pe,trebleAmount:Le,stereoWidthAmount:Te,smallSpeakerRoomAmount:ke,wowFlutterAmount:Fe,isNoiseEnabled:Ne,noiseLevel:Ge,vinylDustAmount:Ee,delayAmount:Re,reverbAmount:ze,chorusAmount:Be,tapeSaturationAmount:Pe,compressorAmount:Ve,fxOutputTrimAmount:Ye})},300);return()=>clearTimeout(d)},[D,W,v,g,w,k,oe,U,ae,h,fe,Ae,pe,Le,Te,ke,Fe,Ne,Ge,Ee,Re,ze,Be,Pe,Ve,Ye]),{audioContextRef:E,mediaSourceRef:i,masterGainRef:xe,radioToneHighpassRef:de,radioToneLowpassRef:pt,radioTonePresenceRef:Gt,recordingDestinationRef:ft,lofiLowpassRef:jt,lofiHighshelfRef:Ht,lofiDriveRef:Ot,bitcrusherRef:vt,bassEqRef:Wt,midEqRef:bt,trebleEqRef:Ut,stereoWidthRef:zt,roomDryGainRef:Vt,roomConvolverRef:At,roomWetGainRef:_t,wowFlutterDelayRef:xt,wowLfoRef:Zt,wowLfoGainRef:wt,flutterLfoRef:Kt,flutterLfoGainRef:Ct,noiseSourceRef:Xt,noiseFilterRef:yt,noisePannerRef:qt,noiseGainRef:Yt,noiseLfoRef:Jt,noiseLfoGainRef:$t,crackleSourceRef:Qt,crackleFilterRef:eo,vinylDustBedFilterRef:to,vinylDustBedGainRef:oo,crackleGainRef:no,audioOptimizationModeRef:m,audioOptimizationMode:D,setAudioOptimizationMode:V,isMutedRef:p,volumeRef:M,playbackRateRef:P,isLoopingRef:y,isAudioFxEnabledRef:H,lofiAmountRef:O,radioToneAmountRef:A,bitCrushAmountRef:_,sampleRateReductionAmountRef:Y,bassAmountRef:te,midAmountRef:ee,trebleAmountRef:Q,stereoWidthAmountRef:z,smallSpeakerRoomAmountRef:ne,wowFlutterAmountRef:T,isNoiseEnabledRef:b,noiseLevelRef:L,vinylDustAmountRef:Z,delayAmountRef:q,reverbAmountRef:G,chorusAmountRef:J,tapeSaturationAmountRef:ce,compressorAmountRef:se,fxOutputTrimAmountRef:R,isMuted:W,setIsMuted:K,playbackRate:g,setPlaybackRate:I,volume:v,setVolume:X,isLooping:w,setIsLooping:j,isAudioFxEnabled:k,setIsAudioFxEnabled:re,lofiAmount:oe,setLofiAmount:ge,radioToneAmount:U,setRadioToneAmount:Ce,bitCrushAmount:ae,setBitCrushAmount:we,sampleRateReductionAmount:h,setSampleRateReductionAmount:s,noiseReductionAmount:fe,setNoiseReductionAmount:ye,bassAmount:Ae,setBassAmount:B,midAmount:pe,setMidAmount:le,trebleAmount:Le,setTrebleAmount:Ie,stereoWidthAmount:Te,setStereoWidthAmount:Oe,smallSpeakerRoomAmount:ke,setSmallSpeakerRoomAmount:We,wowFlutterAmount:Fe,setWowFlutterAmount:Ue,isNoiseEnabled:Ne,setIsNoiseEnabled:Je,noiseLevel:Ge,setNoiseLevel:et,vinylDustAmount:Ee,setVinylDustAmount:Xe,delayAmount:Re,setDelayAmount:De,reverbAmount:ze,setReverbAmount:$e,chorusAmount:Be,setChorusAmount:qe,tapeSaturationAmount:Pe,setTapeSaturationAmount:it,compressorAmount:Ve,setCompressorAmount:tt,fxOutputTrimAmount:Ye,setFxOutputTrimAmount:ot,debugAudio:je,ensureAudioContext:ao,ensureAudioContextWithRecovery:uo,ensureInitialized:ut,updateAudioNodes:nt,setEngineIsPlaying:Tt,connectSourceNode:io,connectMediaAudio:Dt,reconnectCurrentMediaAudio:st,rebuildAudioGraphForCurrentMedia:lt,applyAudioSettings:ct,resetAudioSettings:mo,disposeAudioEngine:co}}const tr={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},gt={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:0,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,edgeBoost:1.5,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeCel:{label:"Anime Cel",width:640,height:360,colors:16,dither:0,palette:"anime",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.15,toonSteps:1,edgeBoost:.3,animeEdgeLow:.22,animeEdgeHigh:.66,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},tetorica:{label:"Tetorica",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.12,vignette:.48,glow:.28,toonSteps:3,edgeBoost:1.5,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:.48,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1,closeUpNoiseStrength:1.8,scanlineBrightnessFade:.92},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:8,edgeBoost:.22,animeEdgeLow:.08,animeEdgeHigh:.55,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},or=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:t==="anime"?10:0,nr=`#version 300 es
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
uniform float uLumaAmount;
uniform float uLumaLow;
uniform float uLumaHigh;
uniform float uLumaKnee;
uniform float uSaturationAmount;
uniform float uSaturationLow;
uniform float uSaturationHigh;
uniform float uSaturationKnee;
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

vec3 applyLumaToneCompression(vec3 color)
{
  float amount = max(uLumaAmount, 0.0);
  if (amount <= 0.0001) {
    return color;
  }

  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  float low = clamp(uLumaLow, 0.0, 1.0);
  float high = clamp(uLumaHigh, 0.0, 1.0);
  float knee = max(uLumaKnee, 0.0001);
  high = max(high, low + 0.0001);

  if (low <= 0.0001 && high >= 0.9999) {
    return color;
  }

  float adjustedLuma = luma;

  // Low side: lift darks toward low. Same (x*knee)/(x+knee) curve as high side —
  // knee is the asymptotic floor below the threshold (consistent with audio gain).
  if (adjustedLuma < low) {
    float under = low - adjustedLuma;
    float compressedUnder = (under * knee) / (under + knee);
    adjustedLuma = low - compressedUnder;
  }

  // High side: compress brights above high. Asymptote at high + knee.
  if (adjustedLuma > high) {
    float over = adjustedLuma - high;
    float compressedOver = (over * knee) / (over + knee);
    adjustedLuma = high + compressedOver;
  }

  // Multiplicative gain (like audio compressor) to preserve hue/saturation.
  // Fallback to additive for near-black where multiplicative is undefined.
  vec3 adjustedColor;
  if (luma > 0.0001) {
    adjustedColor = clamp(color * (adjustedLuma / luma), 0.0, 1.0);
  } else {
    adjustedColor = clamp(color + vec3(adjustedLuma), 0.0, 1.0);
  }
  return clamp(mix(color, adjustedColor, amount), 0.0, 1.0);
}

vec3 applySaturationToneCompression(vec3 color)
{
  float amount = max(uSaturationAmount, 0.0);
  if (amount <= 0.0001) {
    return color;
  }

  float sat = max(max(color.r, color.g), color.b) - min(min(color.r, color.g), color.b);
  float low = clamp(uSaturationLow, 0.0, 1.0);
  float high = clamp(uSaturationHigh, 0.1, 1.0);
  float knee = max(uSaturationKnee, 0.0001);
  high = max(high, low + 0.0001);

  if (low <= 0.0001 && high >= 0.9999) {
    return color;
  }

  float adjustedSat = sat;

  // Same (x*knee)/(x+knee) curve on both sides for consistent knee semantics.
  if (adjustedSat < low) {
    float under = low - adjustedSat;
    float compressedUnder = (under * knee) / (under + knee);
    adjustedSat = low - compressedUnder;
  }

  if (adjustedSat > high) {
    float over = adjustedSat - high;
    float compressedOver = (over * knee) / (over + knee);
    adjustedSat = high + compressedOver;
  }

  if (sat <= 0.0001) {
    return clamp(color, 0.0, 1.0);
  }

  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 neutral = vec3(luma);
  vec3 chroma = color - neutral;
  float scale = adjustedSat / sat;
  vec3 adjustedColor = clamp(neutral + chroma * scale, 0.0, 1.0);
  return clamp(mix(color, adjustedColor, amount), 0.0, 1.0);
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
    color.rgb = applyLumaToneCompression(color.rgb);
    color.rgb = applySaturationToneCompression(color.rgb);
    color.rgb = clamp(color.rgb, 0.0, 1.0);
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

  color.rgb = applyLumaToneCompression(color.rgb);
  color.rgb = applySaturationToneCompression(color.rgb);
  color.rgb = clamp(color.rgb, 0.0, 1.0);

  finalColor = color;
}
`,rr=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,Bo=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,ar=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),Po=640,go=()=>typeof performance<"u"?performance.now():Date.now(),bo=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,Io=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,ir=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,Fo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),Bt=t=>({width:bo(t)?t.videoWidth:Io(t)?t.naturalWidth:t.width,height:bo(t)?t.videoHeight:Io(t)?t.naturalHeight:t.height}),sr=(t,e,r)=>bo(t)&&(e>Po||r>Po),Nt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),lr=t=>Nt(t)&&t.phosphorDotInternalScale?2:1,ur=(t,e,r,n)=>{if(r===void 0||n===void 0||r<=0||n<=0)return{width:t,height:e};const o=r/n;return t/e>o?{width:Math.max(1,Math.round(e*o)),height:e}:{width:t,height:Math.max(1,Math.round(t/o))}},cr=(t,e,r,n,o,c)=>{if(!Nt(r)||o===void 0||c===void 0||o<=0||c<=0)return{width:t,height:e};const a=Math.max(1.1,2.15+r.bulbRadius*1.15),m=Math.max(1,a/Math.max(n,1)),p=Math.max(1,Math.floor(o/m)),M=Math.max(1,Math.floor(c/m)),P=Math.min(1,p/Math.max(t,1),M/Math.max(e,1));return{width:Math.max(1,Math.round(t*P)),height:Math.max(1,Math.round(e*P))}},Ao=(t,e,r,n,o)=>{const c=lr(t),a=Math.max(t.targetWidth,1),m=Math.max(t.targetHeight,1),p=t.matchTargetAspect?ur(a,m,e,r):{width:a,height:m},M=p.width*c,P=p.height*c,y=cr(M,P,t,c,n,o);return{width:y.width,height:y.height,sampleWidth:Math.max(1,Math.round(M)),sampleHeight:Math.max(1,Math.round(P)),internalScale:c,isPhosphorDotMode:Nt(t)}};function No(t,e,r){const n=t.createShader(e);if(!n)throw new Error("Failed to create shader.");if(t.shaderSource(n,r),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(n)||"Unknown shader compile error.";throw t.deleteShader(n),new Error(o)}return n}function Go(t,e,r){const n=No(t,t.VERTEX_SHADER,e),o=No(t,t.FRAGMENT_SHADER,r),c=t.createProgram();if(!c)throw t.deleteShader(n),t.deleteShader(o),new Error("Failed to create WebGL program.");if(t.attachShader(c,n),t.attachShader(c,o),t.bindAttribLocation(c,0,"aPosition"),t.linkProgram(c),t.deleteShader(n),t.deleteShader(o),!t.getProgramParameter(c,t.LINK_STATUS)){const a=t.getProgramInfoLog(c)||"Unknown program link error.";throw t.deleteProgram(c),new Error(a)}return c}class dr{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=go();constructor(e){this.gl=e,this.filterProgram=Go(e,Bo,nr),this.passthroughProgram=Go(e,Bo,rr);const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,ar,e.STATIC_DRAW);const n=e.createVertexArray();e.bindVertexArray(n),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const o=e.createTexture();if(!o)throw new Error("Failed to create WebGL texture.");this.texture=o,e.bindTexture(e.TEXTURE_2D,o),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uAnimeEdgeLow:e.getUniformLocation(this.filterProgram,"uAnimeEdgeLow"),uAnimeEdgeHigh:e.getUniformLocation(this.filterProgram,"uAnimeEdgeHigh"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uLumaAmount:e.getUniformLocation(this.filterProgram,"uLumaAmount"),uLumaLow:e.getUniformLocation(this.filterProgram,"uLumaLow"),uLumaHigh:e.getUniformLocation(this.filterProgram,"uLumaHigh"),uLumaKnee:e.getUniformLocation(this.filterProgram,"uLumaKnee"),uSaturationAmount:e.getUniformLocation(this.filterProgram,"uSaturationAmount"),uSaturationLow:e.getUniformLocation(this.filterProgram,"uSaturationLow"),uSaturationHigh:e.getUniformLocation(this.filterProgram,"uSaturationHigh"),uSaturationKnee:e.getUniformLocation(this.filterProgram,"uSaturationKnee"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=go()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const r=this.currentSource,n=this.currentFilterState;if(!this.outputEnabled||!r||!n)return;const o=this.getUploadSource(r,n);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const c=n.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),Fo(o)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o.width,o.height,0,e.RGBA,e.UNSIGNED_BYTE,o.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),n.isFilterEnabled){const a=Bt(r);this.applyFilterUniforms(n,a.width,a.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,r){if(Fo(e)||!r.isFilterEnabled)return e;const n=Bt(e);if(n.width<=0||n.height<=0||sr(e,n.width,n.height))return e;const{width:o,height:c,sampleWidth:a,sampleHeight:m,isPhosphorDotMode:p}=Ao(r,n.width,n.height),M=Math.max(1,Math.round(p?a:o)),P=Math.max(1,Math.round(p?m:c)),y=this.ensureUploadContext();return!y||!this.uploadCanvas?e:(this.uploadCanvas.width!==M&&(this.uploadCanvas.width=M),this.uploadCanvas.height!==P&&(this.uploadCanvas.height=P),y.imageSmoothingEnabled=!0,y.imageSmoothingQuality="high",y.fillStyle="#000",y.fillRect(0,0,M,P),y.drawImage(e,0,0,M,P),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),r=e.getContext("2d",{alpha:!1,desynchronized:!0});return r?(this.uploadCanvas=e,this.uploadContext=r,r):null}applyFilterUniforms(e,r,n){const{gl:o}=this,c=ir(o.canvas)?o.canvas:null,a=Math.max(c?.clientWidth??o.drawingBufferWidth,1),m=Math.max(c?.clientHeight??o.drawingBufferHeight,1),{width:p,height:M,sampleWidth:P,sampleHeight:y,isPhosphorDotMode:H}=Ao(e,r,n,a,m);o.useProgram(this.filterProgram),o.uniform2f(this.uniformLocations.uTargetSize,p,M),o.uniform2f(this.uniformLocations.uSampleTargetSize,P,y),o.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),o.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),o.uniform1f(this.uniformLocations.uPaletteMode,or(e.paletteMode)),o.uniform1f(this.uniformLocations.uCurvature,e.curvature),o.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),o.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),o.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),o.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),o.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),o.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),o.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),o.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),o.uniform1f(this.uniformLocations.uAnimeEdgeLow,e.animeEdgeLow),o.uniform1f(this.uniformLocations.uAnimeEdgeHigh,e.animeEdgeHigh),o.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),o.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),o.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),o.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),o.uniform1f(this.uniformLocations.uLumaAmount,e.lumaAmount),o.uniform1f(this.uniformLocations.uLumaLow,e.lumaLow),o.uniform1f(this.uniformLocations.uLumaHigh,e.lumaHigh),o.uniform1f(this.uniformLocations.uLumaKnee,e.lumaKnee),o.uniform1f(this.uniformLocations.uSaturationAmount,e.saturationAmount),o.uniform1f(this.uniformLocations.uSaturationLow,e.saturationLow),o.uniform1f(this.uniformLocations.uSaturationHigh,e.saturationHigh),o.uniform1f(this.uniformLocations.uSaturationKnee,e.saturationKnee),o.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),o.uniform1f(this.uniformLocations.uPixelAspect,Math.max(o.drawingBufferWidth,1)*M/(Math.max(o.drawingBufferHeight,1)*p)),o.uniform1f(this.uniformLocations.uPhosphorDotMode,H?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),o.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),o.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),o.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),o.uniform3f(this.uniformLocations.uMonoTint,...tr[e.monoTint].rgb),o.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),o.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),o.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),o.uniform1f(this.uniformLocations.uTime,(go()-this.startedAt)/1e3)}}function mr({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:n,isPlayingRef:o,previewKindRef:c,debugVideo:a}){const m=u.useRef(null),p=u.useRef(null),M=u.useRef(null),P=u.useRef(null),y=u.useRef(null),H=u.useRef(null),O=u.useRef(null),A=u.useRef(null),_=u.useRef(()=>{}),Y=u.useRef(t),$=u.useRef(n),te=u.useRef(!1),ee=u.useRef(null),Q=u.useRef(null),z=u.useRef(null),[ne,T]=u.useState(!1),[b,L]=u.useState(null);Y.current=t,$.current=n;const Z=u.useCallback(w=>{L(j=>{const k=typeof w=="function"?w(j):w;return z.current=k,k})},[]),q=u.useCallback(()=>{const w=p.current,j=y.current;w&&(w.pipeline.setOutputEnabled($.current),w.pipeline.setSource(j),w.pipeline.setFilterState(Y.current),w.pipeline.render())},[]);u.useLayoutEffect(()=>{_.current=q},[q]);const G=u.useCallback(()=>{te.current=!1,A.current!==null&&(window.cancelAnimationFrame(A.current),window.clearTimeout(A.current),A.current=null)},[]),J=u.useCallback(()=>{if(te.current)return;te.current=!0;const w=()=>{if(!te.current)return;if(typeof document<"u"&&document.hidden||_.current(),!(c.current==="video"||c.current==="capture"||c.current==="image"||o.current)){A.current=null,te.current=!1;return}A.current=window.requestAnimationFrame(w)};A.current=window.requestAnimationFrame(w)},[o,c]),ce=u.useCallback(()=>{q()},[q]),se=u.useCallback(()=>{q()},[q]),R=u.useCallback(()=>{q()},[q]),D=u.useCallback(()=>(p.current&&p.current.pipeline.resetAnimationClock(),H.current={},q(),H.current),[q]),V=u.useCallback((w,j,k)=>{if(!w)return;const{width:re,height:oe}=Bt(k);if(re<=0||oe<=0)return;const ge=m.current,U=ge?.clientWidth??w.canvas.width,Ce=ge?.clientHeight??w.canvas.height,we=e==="width"?U/re:Math.min(U/re,Ce/oe),h=re*we,s=oe*we,fe=(U-h)/2,ye=(Ce-s)/2,Ae={width:h,height:s,x:fe,y:ye},B=z.current;return B&&B.width===Ae.width&&B.height===Ae.height&&B.x===Ae.x&&B.y===Ae.y?B:(z.current=Ae,Z(Ae),Ae)},[e,Z]),W=u.useCallback(()=>{y.current&&V(p.current,null,y.current)},[V]),K=u.useCallback(()=>{q()},[q]),g=u.useCallback(()=>{const w=p.current,j=m.current;if(!w||!j)return;W();const k=z.current??{x:0,y:0,width:j.clientWidth,height:j.clientHeight},re=Math.max(1,Math.round(k.width)),oe=Math.max(1,Math.round(k.height)),ge=Y.current,U=y.current?Bt(y.current):null,{width:Ce,height:ae}=Ao(ge,U?.width,U?.height,re,oe),we=Math.max(1,Math.round(re*Math.max(1,r))),h=Math.max(1,Math.round(oe*Math.max(1,r))),s=Math.max(1,Math.round(Math.max(1,Ce)*Math.max(1,r))),fe=Math.max(1,Math.round(Math.max(1,ae)*Math.max(1,r))),ye=Nt(ge),Ae=ge.isFilterEnabled&&ye?Math.max(we,s):we,B=ge.isFilterEnabled&&ye?Math.max(h,fe):h;w.canvas.width!==Ae&&(w.canvas.width=Ae),w.canvas.height!==B&&(w.canvas.height=B),w.canvas.style.position="absolute",w.canvas.style.left=`${Math.round(k.x)}px`,w.canvas.style.top=`${Math.round(k.y)}px`,w.canvas.style.width=`${re}px`,w.canvas.style.height=`${oe}px`,w.canvas.style.imageRendering="pixelated",q()},[W,q,r]),I=u.useCallback(()=>{ee.current!==null&&(window.cancelAnimationFrame(ee.current),ee.current=null),Q.current!==null&&(window.clearTimeout(Q.current),Q.current=null),ee.current=window.requestAnimationFrame(()=>{ee.current=null,g()}),Q.current=window.setTimeout(()=>{Q.current=null,g()},120)},[g]),v=u.useCallback(async()=>{if(!p.current){if(O.current){await O.current;return}O.current=(async()=>{const w=m.current;if(!w||p.current)return;const j=typeof performance<"u"?performance.now():Date.now();a("startup:initPixi:start",{hostConnected:w.isConnected,hostWidth:w.clientWidth??null,hostHeight:w.clientHeight??null,resolution:r});const k=document.createElement("canvas");k.style.display="block",k.style.width="100%",k.style.height="100%",k.style.imageRendering="pixelated",k.style.background="#020617";const re=k.getContext("webgl2");if(!re)throw new Error("WebGL2 is not available in this app view.");a("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-j)*10)/10});const oe={canvas:k,pipeline:new dr(re),ticker:{start:J,stop:G}},ge=m.current;if(!ge||ge!==w||!ge.isConnected)return;ge.style.position="relative",ge.appendChild(k),p.current=oe,H.current={},T(!0),a("initWebGL:ready",{hostWidth:ge.clientWidth??null,hostHeight:ge.clientHeight??null,resolution:r}),a("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-j)*10)/10}),g();const U=c.current==="video"||c.current==="capture"||c.current==="image"||o.current;n&&U&&J(),a("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-j)*10)/10,shouldAnimateOnInit:U})})();try{await O.current}finally{O.current=null}}},[a,n,g,r,J,G]),X=u.useCallback(()=>{O.current=null,G(),ee.current!==null&&(window.cancelAnimationFrame(ee.current),ee.current=null),Q.current!==null&&(window.clearTimeout(Q.current),Q.current=null);const w=p.current;w&&(w.pipeline.dispose(),w.canvas.remove()),p.current=null,H.current=null,Z(null),T(!1)},[G,Z]);return u.useEffect(()=>{const w=m.current;if(!w)return;if(typeof ResizeObserver<"u"){const k=new ResizeObserver(()=>{I()});return k.observe(w),()=>{k.disconnect()}}const j=()=>{I()};return window.addEventListener("resize",j),()=>{window.removeEventListener("resize",j)}},[I]),{canvasHostRef:m,appRef:p,spriteRef:M,textureRef:P,previewElementRef:y,filterRef:H,isRendererReady:ne,viewportRect:b,setViewportRect:Z,applyFilterState:ce,createVideoTexture:w=>null,destroyPixi:X,fitCurrentSprite:W,fitSprite:V,initPixi:v,refreshLayout:g,resetFilterInstance:D,safeRender:K,scheduleRefreshLayout:I,syncSpriteFilter:se,syncTexturePresentation:R}}const hr=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),jo=t=>t==="chrome"?!1:t==="safari"?!0:typeof navigator>"u"||typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window)||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function gr({appRef:t,spriteRef:e,textureRef:r,previewElementRef:n,mediaRef:o,objectUrlRef:c,streamRef:a,streamOwnedRef:m,previewRequestIdRef:p,isPlayingRef:M,previewKindRef:P,audioContextRef:y,mediaSourceRef:H,masterGainRef:O,noiseGainRef:A,audioOptimizationModeRef:_,isMutedRef:Y,volumeRef:$,playbackRateRef:te,isLoopingRef:ee,isAudioFxEnabled:Q,lofiAmount:z,bitCrushAmount:ne,sampleRateReductionAmount:T,bassAmount:b,midAmount:L,trebleAmount:Z,stereoWidthAmount:q,smallSpeakerRoomAmount:G,isMuted:J,volume:ce,previewKind:se,setPreviewName:R,setPreviewError:D,setNeedsUserPlay:V,setIsPlaying:W,setCurrentTime:K,setDuration:g,setPlaybackRate:I,setIsLooping:v,setSourceDimensions:X,setViewportRect:w,setPreviewKindState:j,setIsPoweredOn:k,beginLoading:re,finishLoading:oe,ensureAudioContext:ge,updateAudioNodes:U,setEngineIsPlaying:Ce,connectMediaAudio:ae,rebuildAudioGraphForCurrentMedia:we,fitSprite:h,refreshLayout:s,scheduleRefreshLayout:fe,safeRender:ye,resetFilterInstance:Ae,initPixi:B,resetPerfAccumulators:pe,debugVideo:le,debugAudio:Le}){const Ie=async()=>{hr()&&await new Promise(i=>{window.setTimeout(i,220)})},Te=()=>{const i=y.current?.currentTime;if(A.current)if(typeof i=="number"){const x=A.current.gain;x.cancelScheduledValues(i),x.setValueAtTime(x.value,i),x.linearRampToValueAtTime(0,i+.03)}else A.current.gain.value=0;if(O.current)if(typeof i=="number"){const x=O.current.gain;x.cancelScheduledValues(i),x.setValueAtTime(x.value,i),x.linearRampToValueAtTime(0,i+.03)}else O.current.gain.value=0},Oe=()=>{A.current&&(A.current.gain.value=0)},ke=i=>i instanceof DOMException&&(i.name==="NotAllowedError"||i.name==="AbortError")?!0:i instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(i.message):!1,We=i=>ke(i)?(oe(),D(""),V(!0),Re(),ye(),!0):!1,Fe=async(i,x)=>{try{await we(`${i}:audio-reset`),Le(`${i}:audio-reset:done`,{message:x instanceof Error?x.message:String(x)})}catch(f){Le(`${i}:audio-reset:failed`,{message:x instanceof Error?x.message:String(x),resetMessage:f instanceof Error?f.message:String(f)})}},Ue=(i,x,f=!0)=>{Te(),i.muted=!0,i.volume=0,i.pause(),i.srcObject instanceof MediaStream&&(f&&i.srcObject.getTracks().forEach(ie=>ie.stop()),i.srcObject=null),i.src="",i.load(),x?.startsWith("blob:")&&URL.revokeObjectURL(x)},Ne=i=>new Promise((x,f)=>{const ie=de=>de?de.code===MediaError.MEDIA_ERR_ABORTED?"aborted":de.code===MediaError.MEDIA_ERR_NETWORK?"network":de.code===MediaError.MEDIA_ERR_DECODE?"decode":de.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${de.code}`:"unknown",N=()=>{i.removeEventListener("loadeddata",E),i.removeEventListener("canplay",E),i.removeEventListener("error",xe)},E=()=>{N(),x()},xe=()=>{N(),f(new Error(`動画の読み込みに失敗しました。 src=${i.currentSrc||i.src||"(empty)"} reason=${ie(i.error)}`))};if(i.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){x();return}i.addEventListener("loadeddata",E,{once:!0}),i.addEventListener("canplay",E,{once:!0}),i.addEventListener("error",xe,{once:!0}),i.load()}),Je=i=>new Promise((x,f)=>{const ie=de=>de?de.code===MediaError.MEDIA_ERR_ABORTED?"aborted":de.code===MediaError.MEDIA_ERR_NETWORK?"network":de.code===MediaError.MEDIA_ERR_DECODE?"decode":de.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${de.code}`:"unknown",N=()=>{i.removeEventListener("loadedmetadata",E),i.removeEventListener("canplay",E),i.removeEventListener("error",xe)},E=()=>{N(),x()},xe=()=>{N(),f(new Error(`音声の読み込みに失敗しました。 src=${i.currentSrc||i.src||"(empty)"} reason=${ie(i.error)}`))};if(i.readyState>=HTMLMediaElement.HAVE_METADATA){x();return}i.addEventListener("loadedmetadata",E,{once:!0}),i.addEventListener("canplay",E,{once:!0}),i.addEventListener("error",xe,{once:!0}),i.load()}),Ge=i=>new Promise((x,f)=>{const ie=()=>{i.removeEventListener("load",N),i.removeEventListener("error",E)},N=()=>{ie(),x()},E=()=>{ie(),f(new Error("画像の読み込みに失敗しました。"))};if(i.complete&&i.naturalWidth>0&&i.naturalHeight>0){x();return}i.addEventListener("load",N,{once:!0}),i.addEventListener("error",E,{once:!0})}),et=i=>{if(!i||!i.loop||!i.paused)return!1;if(i.ended)return!0;const x=Number.isFinite(i.currentTime)?i.currentTime:0,f=Number.isFinite(i.duration)?i.duration:0,ie=x<=.08,N=f>0&&f-x<=.12;return ie||N},Ee=i=>{const x=()=>o.current===i,f=()=>{x()&&Re()},ie=()=>{x()&&Te()};i.addEventListener("play",f),i.addEventListener("pause",f),i.addEventListener("pause",()=>{x()&&(et(i)||Te())}),i.addEventListener("abort",ie),i.addEventListener("emptied",ie),i.addEventListener("loadstart",ie),i.addEventListener("seeking",ie),i.addEventListener("volumechange",f);let N=-1;const E=()=>{const xe=o.current?.currentTime??0;Math.abs(xe-N)<.08||(N=xe,K(xe))};i.addEventListener("timeupdate",E),i.addEventListener("durationchange",f),i.addEventListener("seeked",f),i.addEventListener("ended",f),i.addEventListener("ratechange",f),i instanceof HTMLVideoElement&&i.addEventListener("resize",()=>{const xe=i.videoWidth,de=i.videoHeight;xe>0&&de>0&&(X({width:xe,height:de}),fe())})},Xe=i=>{i.loop=ee.current,i.muted=Y.current,i.volume=Y.current?0:$.current,i.playbackRate=te.current,i.autoplay=!1,i.preload="auto",i.crossOrigin="anonymous",i instanceof HTMLVideoElement&&(i.playsInline=!0)},Re=()=>{if(!o.current){le("syncVideoState:no-media",{previewKind:P.current,hasPreviewElement:!!n.current}),M.current=!1,W(!1),K(0),g(0),Te(),ye();return}const i=et(o.current),x=!o.current.paused||i;M.current=x,W(x),x&&oe(),K(o.current.currentTime),g(o.current.duration||0),I(o.current.playbackRate||1),v(o.current.loop),U(),ye()},De=()=>{le("cleanupPreview:start",{previewKind:P.current,hasMedia:!!o.current,hasPreviewElement:!!n.current}),Te(),p.current+=1,oe();const i=o.current,x=a.current,f=m.current;e.current=null,r.current=null,o.current=null,n.current=null,a.current=null,m.current=!1,H.current?.disconnect(),H.current=null,V(!1),M.current=!1,W(!1),K(0),g(0),j(null),X(null),w(null),c.current?.startsWith("blob:")&&URL.revokeObjectURL(c.current),c.current=null,i?Ue(i,void 0,f):f&&x?.getTracks().forEach(ie=>ie.stop()),ye()},ze=()=>{o.current&&(o.current.muted=!0,o.current.volume=0,o.current.pause()),Te(),De(),y.current?.state==="running"&&y.current.suspend()},$e=()=>{k(!0),t.current?.ticker.start();try{pe?.()}catch{}},Be=async()=>{if(o.current)try{const i=o.current,x=y.current?.state==="suspended",f=await ge();jo(_.current)&&H.current?(i.muted=!1,i.volume=0):(i.muted=Y.current,i.volume=Y.current?0:$.current),U();const ie=typeof document<"u"&&document.visibilityState==="hidden";x&&!ie&&await new Promise(E=>{setTimeout(E,30)}),await i.play(),M.current=!0,Ce(!0),W(!0),D(""),V(!1);const N=y.current?.state??f?.state??"none";N!=="running"&&jo(_.current)&&H.current&&(i.muted=Y.current,i.volume=Y.current?0:$.current,Le("playVideoWithAudio:native-audio-fallback",{audioContextState:N,currentTime:i.currentTime})),Le("playVideoWithAudio",{audioContextState:N,currentTime:i.currentTime,isAudioFxEnabled:Q,lofiAmount:z,bitCrushAmount:ne,sampleRateReductionAmount:T,bassAmount:b,midAmount:L,trebleAmount:Z,stereoWidthAmount:q,smallSpeakerRoomAmount:G,isMuted:J,volume:ce}),U(),Re(),ye(),fe(),window.requestAnimationFrame(U)}catch(i){if(Ce(!1),oe(),ke(i)){V(!0),D("");return}V(!1),D(i instanceof Error?i.message:"音声付き再生を開始できませんでした。")}},qe=async()=>{if(await B(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Pe=async(i,x)=>{const f=await qe();n.current=i,h(f,null,i),j(x),X(i instanceof HTMLVideoElement?{width:i.videoWidth,height:i.videoHeight}:{width:i.naturalWidth,height:i.naturalHeight}),ye(),s(),fe(),t.current?.ticker.start()},it=async i=>{const x=i.type.startsWith("video/"),f=i.type.startsWith("audio/"),ie=i.type.startsWith("image/");if(!x&&!f&&!ie){D("動画、音声、または画像ファイルを選んでください。");return}$e(),De(),Ae();const N=p.current;D(""),R(i.name),re(x?"Loading video preview...":f?"Loading audio preview...":"Loading image preview...");let E=null;try{if(await qe(),E=URL.createObjectURL(i),c.current=E,x||f){const de=x?document.createElement("video"):document.createElement("audio");if(de.src=E,Xe(de),Ee(de),de instanceof HTMLVideoElement?await Ne(de):await Je(de),N!==p.current){Ue(de,E);return}o.current=de,de instanceof HTMLVideoElement?await Pe(de,"video"):(n.current=null,j("audio"),X(null),w(null),ye()),await ae(de),Re(),await Ie(),await Be(),N===p.current&&oe();return}const xe=new Image;if(xe.src=E,xe.crossOrigin="anonymous",await Ge(xe),N!==p.current){E.startsWith("blob:")&&URL.revokeObjectURL(E);return}o.current=null,Oe(),U(),await Pe(xe,"image"),Re(),N===p.current&&oe()}catch(xe){if(N!==p.current){E?.startsWith("blob:")&&URL.revokeObjectURL(E);return}if(ke(xe)){We(xe);return}De(),await Fe("previewFile:error",xe),D(xe instanceof Error?xe.message:"動画プレビューに失敗しました。"),V(!1)}},Ve=async()=>{if($e(),!navigator.mediaDevices?.getDisplayMedia){D("このブラウザでは画面キャプチャーに対応していません。");return}De();const i=p.current;D(""),R("Display Capture"),re("Preparing display capture...");try{await qe();const x=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(i!==p.current){x.getTracks().forEach(ie=>ie.stop());return}const f=document.createElement("video");f.srcObject=x,Xe(f),Ee(f),x.getVideoTracks()[0]?.addEventListener("ended",()=>{tt()}),await Ne(f),a.current=x,m.current=!0,o.current=f,await Pe(f,"capture"),await ae(f),V(!1),await Ie(),await Be(),i===p.current&&oe()}catch(x){if(i!==p.current||We(x))return;De(),await Fe("startDisplayCapture:error",x),D(x instanceof Error?x.message:"画面キャプチャーを開始できませんでした。")}},tt=()=>{se==="capture"&&(De(),R(""),D(""))};return{cleanupPreview:De,cleanupForPageLeave:ze,playVideoWithAudio:Be,previewFile:it,previewStream:async(i,x="video",f="Media Stream")=>{let ie=0;try{if($e(),De(),Ae(),ie=p.current,D(""),R(f),re(x==="video"?"Loading stream preview...":"Loading stream audio..."),await qe(),x==="video"){const N=document.createElement("video");if(N.srcObject=i,Xe(N),Ee(N),await Ne(N),ie!==p.current){Ue(N,void 0,!1);return}a.current=i,m.current=!1,o.current=N,await Pe(N,"capture"),await ae(N)}else{const N=document.createElement("audio");if(N.srcObject=i,Xe(N),Ee(N),await Je(N),ie!==p.current){Ue(N,void 0,!1);return}a.current=i,m.current=!1,o.current=N,n.current=null,j("audio"),X(null),w(null),ye(),await ae(N),Re()}if(ie!==p.current)return;await Ie(),await Be(),ie===p.current&&oe()}catch(N){if(ie!==p.current||We(N))return;De(),await Fe("previewStream:error",N),D(N instanceof Error?N.message:String(N))}},previewUrl:async(i,x="video")=>{let f=0;const ie=typeof performance<"u"?performance.now():Date.now(),N=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-ie)*10)/10;try{if(le("startup:previewUrl:start",{url:i,kind:x}),$e(),De(),Ae(),f=p.current,D(""),R(i),re(x==="video"?"Loading video preview...":x==="image"?"Loading image preview...":"Loading audio preview..."),await qe(),le("startup:previewUrl:renderer-ready",{kind:x,elapsedMs:N()}),x==="video"){const E=document.createElement("video");if(E.src=i,Xe(E),Ee(E),await Ne(E),le("startup:previewUrl:video-ready",{elapsedMs:N(),readyState:E.readyState,videoWidth:E.videoWidth,videoHeight:E.videoHeight}),f!==p.current){Ue(E,i);return}o.current=E,await Pe(E,"video"),await ae(E),Re()}else if(x==="image"){const E=new Image;if(E.src=i,E.crossOrigin="anonymous",await Ge(E),le("startup:previewUrl:image-ready",{elapsedMs:N(),naturalWidth:E.naturalWidth,naturalHeight:E.naturalHeight}),f!==p.current)return;o.current=null,Oe(),U(),await Pe(E,"image"),Re()}else{const E=document.createElement("audio");if(E.src=i,Xe(E),Ee(E),await Je(E),le("startup:previewUrl:audio-ready",{elapsedMs:N(),readyState:E.readyState,duration:E.duration}),f!==p.current){Ue(E,i);return}n.current=null,j("audio"),X(null),w(null),o.current=E,ye(),await ae(E),Re()}if(f!==p.current)return;(x==="video"||x==="audio")&&(await Ie(),await Be()),f===p.current&&(oe(),le("startup:previewUrl:done",{kind:x,elapsedMs:N()}))}catch(E){if(le("startup:previewUrl:error",{kind:x,elapsedMs:N(),error:E instanceof Error?E.message:String(E)}),f!==p.current||We(E))return;De(),await Fe("previewUrl:error",E),D(E instanceof Error?E.message:String(E))}},startDisplayCapture:Ve,stopDisplayCapture:tt,syncVideoState:Re,releaseDetachedMedia:Ue,ensurePixiReady:qe}}let pr=0;const Ho=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),fr=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),vr=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__,br=(t,e)=>{if(e==="audio")return!0;if(e!=="video"||!t)return!1;const r=t;return typeof r.audioTracks?.length=="number"?r.audioTracks.length>0:typeof r.mozHasAudio=="boolean"?r.mozHasAudio:typeof r.webkitAudioDecodedByteCount=="number"?r.webkitAudioDecodedByteCount>0:!1};function Ar(t,e,r=1){const n=u.useRef(`player-${pr+=1}`),o=u.useRef(null),c=u.useRef(null),a=u.useRef(!1),m=u.useRef(null),p=u.useRef(null),M=u.useRef([]),P=u.useRef(null),y=u.useRef(null),H=u.useRef(null),O=u.useRef(null),A=u.useRef(null),_=u.useRef(0),Y=u.useRef(!1),$=u.useRef(null),te=u.useRef(!1),[ee,Q]=u.useState(""),[z,ne]=u.useState(""),[T,b]=u.useState(!0),[L,Z]=u.useState(""),[q,G]=u.useState(!1),[J,ce]=u.useState(!1),[se,R]=u.useState(!1),[D,V]=u.useState(0),[W,K]=u.useState(0),[g,I]=u.useState(null),[v,X]=u.useState(null),[w,j]=u.useState(!1),[k,re]=u.useState(null),oe=(C,F)=>{if(!vr())return;const me=F?` ${JSON.stringify(F)}`:"";console.log(`[retro-player video][${n.current}] ${C}${me}`)},ge=br(m.current,g),U=(C,F,me="info")=>{const Se=m.current,Me={audioContextState:Re.current?.state??null,currentSrc:Se?.currentSrc||Se?.src||null,currentTime:Se?.currentTime??null,ended:Se?.ended??null,hasMedia:!!Se,hasMediaSource:!!De.current,isPoweredOn:T,mediaMuted:Se?.muted??null,mediaPaused:Se?.paused??null,mediaReadyState:Se?.readyState??null,mediaVolume:Se?.volume??null,previewKind:$.current,visibilityState:typeof document>"u"?null:document.visibilityState,...F};if(me==="warn"){console.warn(`[retro-player audio recovery][${n.current}] ${C}`,Me);return}console.info(`[retro-player audio recovery][${n.current}] ${C}`,Me)},Ce=mr({filterState:t,fitMode:e,renderResolutionScale:r,isPoweredOn:T,isPlayingRef:Y,previewKindRef:$,debugVideo:oe}),{canvasHostRef:ae,appRef:we,spriteRef:h,textureRef:s,previewElementRef:fe,filterRef:ye,isRendererReady:Ae,viewportRect:B,setViewportRect:pe,applyFilterState:le,destroyPixi:Le,fitSprite:Ie,initPixi:Te,refreshLayout:Oe,resetFilterInstance:ke,safeRender:We,scheduleRefreshLayout:Fe,syncSpriteFilter:Ue,syncTexturePresentation:Ne}=Ce,Je=u.useRef(Te),Ge=u.useRef(Le),et=u.useRef(()=>{}),Ee=u.useRef(()=>{}),Xe=er({instanceLabel:n.current,previewKind:g,previewKindRef:$,mediaRef:m,isPlaying:se,isPlayingRef:Y}),{audioContextRef:Re,mediaSourceRef:De,masterGainRef:ze,recordingDestinationRef:$e,noiseGainRef:Be,audioOptimizationModeRef:qe,audioOptimizationMode:Pe,setAudioOptimizationMode:it,isMutedRef:Ve,volumeRef:tt,playbackRateRef:Ye,isLoopingRef:ot,isMuted:i,setIsMuted:x,playbackRate:f,setPlaybackRate:ie,volume:N,setVolume:E,isLooping:xe,setIsLooping:de,isAudioFxEnabled:pt,setIsAudioFxEnabled:Gt,lofiAmount:ft,setLofiAmount:jt,radioToneAmount:Ht,setRadioToneAmount:Ot,bitCrushAmount:vt,setBitCrushAmount:Wt,sampleRateReductionAmount:bt,setSampleRateReductionAmount:Ut,noiseReductionAmount:zt,setNoiseReductionAmount:Vt,bassAmount:At,setBassAmount:_t,midAmount:xt,setMidAmount:Zt,trebleAmount:wt,setTrebleAmount:Kt,stereoWidthAmount:Ct,setStereoWidthAmount:Xt,smallSpeakerRoomAmount:yt,setSmallSpeakerRoomAmount:qt,wowFlutterAmount:Yt,setWowFlutterAmount:Jt,isNoiseEnabled:$t,setIsNoiseEnabled:Qt,noiseLevel:eo,setNoiseLevel:to,vinylDustAmount:oo,setVinylDustAmount:no,delayAmount:ro,setDelayAmount:je,reverbAmount:ut,setReverbAmount:ao,chorusAmount:nt,setChorusAmount:io,tapeSaturationAmount:so,setTapeSaturationAmount:St,compressorAmount:Tt,setCompressorAmount:lo,fxOutputTrimAmount:Rt,setFxOutputTrimAmount:Lt,debugAudio:Dt,ensureAudioContext:st,ensureAudioContextWithRecovery:uo,updateAudioNodes:lt,setEngineIsPlaying:co,connectMediaAudio:ct,reconnectCurrentMediaAudio:mo,rebuildAudioGraphForCurrentMedia:d,applyAudioSettings:be,resetAudioSettings:_e,disposeAudioEngine:He}=Xe;u.useEffect(()=>{Je.current=Te,Ge.current=Le},[Te,Le]);const dt=C=>{$.current=C,I(C)},rt=C=>{Z(C),G(!0)},Qe=()=>{G(!1),Z("")},Ko=async C=>{const F=await uo(C);if(!F)return U(`${C}:no-audio-context`,void 0,"warn"),null;const me=m.current;try{return me&&(De.current?(mo(),U(`${C}:reconnected-media-source`,{audioContextState:F.state})):(await ct(me),U(`${C}:connected-media-source`,{audioContextState:F.state}))),lt(),F}catch(Se){U(`${C}:reconnect-failed-rebuilding`,{error:Se instanceof Error?Se.message:String(Se)},"warn");const Me=await d(`${C}:rebuild`);return Me?(U(`${C}:rebuild-complete`,{audioContextState:Me.state}),Me):(U(`${C}:rebuild-returned-null`,void 0,"warn"),null)}},Co=()=>{b(!0),we.current?.ticker.start(),(async()=>{const C=te.current&&!!m.current;U("powerOn:start",{shouldResumePlayback:C});try{if(!await Ko("powerOn"))return;if(C&&m.current)try{await m.current.play(),ce(!1)}catch(me){me instanceof DOMException&&me.name==="NotAllowedError"&&ce(!0),U("powerOn:play-failed",{error:me instanceof Error?me.message:String(me)},"warn")}}catch(F){U("powerOn:recover-failed",{error:F instanceof Error?F.message:String(F)},"warn")}finally{at(),te.current=!1,U("powerOn:done",{shouldResumePlayback:C})}})()},Xo=()=>{te.current=!!(m.current&&!m.current.paused),U("powerOff",{wasPlayingBeforePowerOff:te.current}),m.current&&m.current.pause(),Be.current&&(Be.current.gain.value=0),ze.current&&(ze.current.gain.value=0),Qe(),ce(!1),b(!1),we.current?.ticker.stop(),at()},qo=gr({filterState:t,appRef:we,spriteRef:h,textureRef:s,previewElementRef:fe,filterRef:ye,mediaRef:m,objectUrlRef:o,streamRef:c,streamOwnedRef:a,previewRequestIdRef:_,isPlayingRef:Y,previewKindRef:$,audioContextRef:Re,mediaSourceRef:De,masterGainRef:ze,noiseGainRef:Be,audioOptimizationModeRef:qe,isMutedRef:Ve,volumeRef:tt,playbackRateRef:Ye,isLoopingRef:ot,isAudioFxEnabled:pt,lofiAmount:ft,bitCrushAmount:vt,sampleRateReductionAmount:bt,bassAmount:At,midAmount:xt,trebleAmount:wt,stereoWidthAmount:Ct,smallSpeakerRoomAmount:yt,isMuted:i,volume:N,previewKind:g,setPreviewName:Q,setPreviewError:ne,setNeedsUserPlay:ce,setIsPlaying:R,setCurrentTime:V,setDuration:K,setPlaybackRate:ie,setIsLooping:de,setSourceDimensions:X,setViewportRect:pe,setPreviewKindState:dt,setIsPoweredOn:b,beginLoading:rt,finishLoading:Qe,ensureAudioContext:st,updateAudioNodes:lt,setEngineIsPlaying:co,connectMediaAudio:ct,rebuildAudioGraphForCurrentMedia:d,fitSprite:Ie,refreshLayout:Oe,scheduleRefreshLayout:Fe,safeRender:We,resetFilterInstance:ke,initPixi:Te,debugVideo:oe,debugAudio:Dt}),{cleanupPreview:yo,cleanupForPageLeave:Yo,playVideoWithAudio:So,previewFile:Jo,previewStream:$o,previewUrl:Qo,startDisplayCapture:en,stopDisplayCapture:tn,syncVideoState:at}=qo;u.useEffect(()=>{et.current=yo},[yo]),u.useEffect(()=>{Ee.current=He},[He]);const To=async()=>{if(m.current){if(m.current.paused){T||Co(),await So(),at();return}m.current.pause(),at()}},on=()=>{m.current&&x(C=>{const F=!C;return Ve.current=F,window.requestAnimationFrame(lt),F})},mt=C=>{m.current&&(m.current.currentTime=C,V(C))},nn=C=>{if(!m.current)return;const F=1/30,me=Math.max(0,Math.min(m.current.currentTime+F*C,m.current.duration||m.current.currentTime+F));m.current.pause(),m.current.currentTime=me,at()},rn=C=>{m.current&&(m.current.playbackRate=C,Ye.current=C,ie(C))},an=C=>{m.current&&(tt.current=C,Ve.current=C===0,E(C),x(C===0),window.requestAnimationFrame(lt))},sn=()=>{m.current&&(m.current.loop=!m.current.loop,ot.current=m.current.loop,de(m.current.loop))},ln=C=>{ot.current=C,de(C),m.current&&(m.current.loop=C)},Mt=()=>{if(!y.current||typeof window>"u"){H.current=null,O.current=null;return}window.URL.revokeObjectURL(y.current),y.current=null,H.current=null,O.current=null},un=(C,F)=>{if(typeof document>"u")return;const me=document.createElement("a");me.href=C,me.download=F,me.rel="noopener",me.style.display="none",document.body.appendChild(me),me.click(),window.setTimeout(()=>{me.remove()},0)},cn=(C,F)=>{if(typeof window>"u"||C.length===0)return null;Mt();const me=new Blob(C,{type:F||"video/webm"}),Me=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Ze=window.URL.createObjectURL(me);return y.current=Ze,H.current=me,O.current=Me,re(Me),Me},dn=()=>{const C=y.current,F=O.current;!C||!F||typeof window>"u"||(un(C,F),window.setTimeout(()=>{Mt()},1e3),re(null))},mn=async()=>{const C=H.current,F=O.current;if(!C||!F||typeof window>"u")return!1;if(Ho()){const Me=new Uint8Array(await C.arrayBuffer()),Ze=await _o("persist_recording_for_share",{data:Array.from(Me),filename:F});return await Hn(Ze,{mimeType:C.type||"video/webm",title:F}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Se={files:[new File([C],F,{type:C.type||"video/webm"})],title:F};return typeof navigator.canShare=="function"&&!navigator.canShare(Se)?!1:(await navigator.share(Se),!0)},hn=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(F=>MediaRecorder.isTypeSupported(F))??"",gn=async()=>{const C=we.current?.canvas;if(!(C instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await st();const F=new MediaStream;C.captureStream(30).getVideoTracks().forEach(Ze=>F.addTrack(Ze)),$e.current?.stream.getAudioTracks().forEach(Ze=>F.addTrack(Ze.clone()));const Se=hn(),Me=Se?new MediaRecorder(F,{mimeType:Se}):new MediaRecorder(F);M.current=[],Mt(),re(null),P.current=F,p.current=Me,Me.addEventListener("dataavailable",Ze=>{Ze.data.size>0&&M.current.push(Ze.data)}),Me.addEventListener("stop",()=>{const Ze=cn(M.current,Me.mimeType);M.current=[],P.current?.getTracks().forEach(pn=>pn.stop()),P.current=null,p.current=null,j(!1),st(),A.current?.(Ze),A.current=null},{once:!0}),Me.start(),j(!0)},Ro=(C=!0)=>{const F=p.current;return F?new Promise(me=>{if(A.current=me,C||(M.current=[]),F.state!=="inactive"){F.stop();return}P.current?.getTracks().forEach(Se=>Se.stop()),P.current=null,p.current=null,j(!1),A.current?.(O.current),A.current=null}):Promise.resolve(O.current)};return u.useEffect(()=>{let C=!1;return(async()=>(oe("startup:setupPixi-effect:start",{renderResolutionScale:r}),await Je.current(),C&&Ge.current()))(),()=>{Mt(),Ro(!1),C=!0,Ge.current()}},[r]),u.useEffect(()=>()=>{et.current(),Ee.current()},[]),u.useEffect(()=>{const C=()=>{Yo()};return window.addEventListener("beforeunload",C),()=>{window.removeEventListener("beforeunload",C)}},[]),u.useEffect(()=>{const C=()=>{m.current&&(m.current.muted=!0,m.current.volume=0,m.current.pause(),at())};return window.addEventListener(Lo,C),()=>{window.removeEventListener(Lo,C)}},[at]),u.useLayoutEffect(()=>{le(),Ue(),Ne(),Oe()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,Oe]),u.useEffect(()=>{if(z||J){Qe();return}if(g==="image"||g==="audio"){Qe();return}se&&Qe()},[z,J,g,se]),u.useEffect(()=>{Y.current=se;const C=(g==="video"||g==="capture")&&m.current?.tagName==="VIDEO",F=!m.current||Math.abs(m.current.currentTime)<.05,me=m.current?.ended??!1;C&&Qe(),C&&!se&&!z&&!me&&(Re.current?.state==="suspended"||F)&&ce(!0)},[Re,se,z,g]),u.useEffect(()=>{const C=F=>{if(!m.current)return;const me=F.target;if(!(me instanceof HTMLInputElement||me instanceof HTMLTextAreaElement||me?.isContentEditable)){if(F.code==="Space"||F.code==="KeyK"){F.preventDefault(),To();return}if(F.code==="KeyJ"){F.preventDefault(),mt(Math.max(m.current.currentTime-10,0));return}if(F.code==="KeyL"){F.preventDefault(),mt(Math.min(m.current.currentTime+10,m.current.duration||m.current.currentTime+10));return}if(F.code==="ArrowLeft"){F.preventDefault(),mt(Math.max(m.current.currentTime-5,0));return}F.code==="ArrowRight"&&(F.preventDefault(),mt(Math.min(m.current.currentTime+5,m.current.duration||m.current.currentTime+5)))}};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),{canvasHostRef:ae,previewName:ee,previewError:z,isRendererReady:Ae,audioOptimizationMode:Pe,loadingLabel:L,isLoading:q,needsUserPlay:J,isPlaying:se,isMuted:i,currentTime:D,duration:W,playbackRate:f,volume:N,isLooping:xe,sourceDimensions:v,viewportRect:B,isAudioFxEnabled:pt,lofiAmount:ft,radioToneAmount:Ht,bitCrushAmount:vt,sampleRateReductionAmount:bt,noiseReductionAmount:zt,bassAmount:At,midAmount:xt,trebleAmount:wt,stereoWidthAmount:Ct,smallSpeakerRoomAmount:yt,wowFlutterAmount:Yt,isNoiseEnabled:$t,noiseLevel:eo,vinylDustAmount:oo,delayAmount:ro,reverbAmount:ut,chorusAmount:nt,tapeSaturationAmount:so,setTapeSaturationAmount:St,compressorAmount:Tt,setCompressorAmount:lo,fxOutputTrimAmount:Rt,setFxOutputTrimAmount:Lt,hasPlayableMedia:g==="video"||g==="audio"||g==="capture",hasAudibleMedia:ge,hasVideo:g==="video"||g==="capture",hasAudioOnly:g==="audio",hasImage:g==="image",isRecording:w,pendingRecordingFilename:k,prefersShareExport:Ho()&&fr(),isCaptureActive:g==="capture",canRecord:g==="video"||g==="capture"||g==="image"||g==="audio",previewFile:Jo,previewStream:$o,previewUrl:Qo,startDisplayCapture:en,stopDisplayCapture:tn,togglePlayback:To,toggleMute:on,seekTo:mt,stepFrame:nn,changePlaybackRate:rn,changeVolume:an,toggleLoop:sn,setLoopingEnabled:ln,applyAudioSettings:be,resetAudioSettings:_e,setAudioOptimizationMode:it,playVideoWithAudio:So,isPoweredOn:T,powerOn:Co,powerOff:Xo,downloadPendingRecording:dn,sharePendingRecording:mn,startRecording:gn,stopRecording:Ro,ensureAudioContext:st,refreshLayout:Oe,toggleAudioFx:()=>{Gt(C=>!C)},setLofiAmount:jt,setRadioToneAmount:Ot,setBitCrushAmount:Wt,setSampleRateReductionAmount:Ut,setNoiseReductionAmount:Vt,setBassAmount:_t,setMidAmount:Zt,setTrebleAmount:Kt,setStereoWidthAmount:Xt,setSmallSpeakerRoomAmount:qt,setWowFlutterAmount:Jt,toggleNoise:()=>{Qt(C=>!C)},setNoiseLevel:to,setVinylDustAmount:no,setDelayAmount:je,setReverbAmount:ao,setChorusAmount:io}}const ue=gt.tetorica,Oo=(t,e,r)=>((r?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&(e.animeEdgeLow??.08)===t.animeEdgeLow&&(e.animeEdgeHigh??.55)===t.animeEdgeHigh&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.lumaAmount??1)===t.lumaAmount&&(e.lumaLow??0)===t.lumaLow&&(e.lumaHigh??1)===t.lumaHigh&&(e.lumaKnee??.2)===t.lumaKnee&&(e.saturationAmount??1)===t.saturationAmount&&(e.saturationLow??0)===t.saturationLow&&(e.saturationHigh??1)===t.saturationHigh&&(e.saturationKnee??.2)===t.saturationKnee&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,Et=t=>{for(const[e,r]of Object.entries(gt))if(Oo(t,r))return e;if(!t.matchTargetAspect)return null;for(const[e,r]of Object.entries(gt))if(Oo(t,r,{ignoreDimensions:!0}))return e;return null},xr=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function wr(t={}){const[e]=u.useState(()=>({targetWidth:t.targetWidth??ue.width,targetHeight:t.targetHeight??ue.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ue.colors,ditherStrength:t.ditherStrength??ue.dither,paletteMode:t.paletteMode??ue.palette,curvature:t.curvature??ue.curvature,scanlineStrength:t.scanlineStrength??ue.scanline,scanline2Strength:t.scanline2Strength??ue.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ue.vignette,glowStrength:t.glowStrength??ue.glow,smoothStrength:t.smoothStrength??ue.smoothStrength??0,toonSteps:t.toonSteps??ue.toonSteps,edgeBoost:t.edgeBoost??ue.edgeBoost,animeEdgeLow:t.animeEdgeLow??ue.animeEdgeLow,animeEdgeHigh:t.animeEdgeHigh??ue.animeEdgeHigh,phosphorStrength:t.phosphorStrength??ue.phosphor,spotMaskStrength:t.spotMaskStrength??ue.spotMask,bulbRadius:t.bulbRadius??ue.bulbRadius,blackFloor:t.blackFloor??ue.blackFloor,lumaAmount:t.lumaAmount??ue.lumaAmount??1,lumaLow:t.lumaLow??ue.lumaLow??0,lumaHigh:t.lumaHigh??ue.lumaHigh??1,lumaKnee:t.lumaKnee??ue.lumaKnee??.2,saturationAmount:t.saturationAmount??ue.saturationAmount??1,saturationLow:t.saturationLow??ue.saturationLow??0,saturationHigh:t.saturationHigh??ue.saturationHigh??1,saturationKnee:t.saturationKnee??ue.saturationKnee??.2,phosphorDotLightBalance:t.phosphorDotLightBalance??ue.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ue.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ue.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ue.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ue.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ue.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ue.monoTint,neonBoost:t.neonBoost??ue.neonBoost,neonSaturation:t.neonSaturation??ue.neonSaturation,neonDetail:t.neonDetail??ue.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[r]=u.useState(()=>({...e,...Ft()?.filter,...t})),[n,o]=u.useState(r),[c,a]=u.useState(Et(r)),m=h=>{a(null),o(s=>s.targetWidth===h?s:{...s,targetWidth:h})},p=h=>{a(null),o(s=>s.targetHeight===h?s:{...s,targetHeight:h})},M=h=>{a(null),o(s=>s.matchTargetAspect===h?s:{...s,matchTargetAspect:h})},P=h=>{a(null),o(s=>({...s,colorLevels:h}))},y=h=>{a(null),o(s=>({...s,ditherStrength:h}))},H=h=>{a(null),o(s=>({...s,paletteMode:h,colorLevels:xr(h,s.colorLevels)}))},O=h=>{a(null),o(s=>({...s,curvature:h}))},A=h=>{a(null),o(s=>({...s,scanlineStrength:h}))},_=h=>{a(null),o(s=>({...s,scanline2Strength:h}))},Y=h=>{a(null),o(s=>({...s,scanlineBrightnessFade:h}))},$=h=>{a(null),o(s=>({...s,vignetteStrength:h}))},te=h=>{a(null),o(s=>({...s,glowStrength:h}))},ee=h=>{a(null),o(s=>({...s,smoothStrength:h}))},Q=h=>{a(null),o(s=>({...s,toonSteps:h}))},z=h=>{a(null),o(s=>({...s,edgeBoost:h}))},ne=h=>{a(null),o(s=>({...s,animeEdgeLow:h}))},T=h=>{a(null),o(s=>({...s,animeEdgeHigh:h}))},b=h=>{a(null),o(s=>({...s,phosphorStrength:h}))},L=h=>{a(null),o(s=>({...s,spotMaskStrength:h}))},Z=h=>{a(null),o(s=>({...s,bulbRadius:h}))},q=h=>{a(null),o(s=>({...s,blackFloor:h}))},G=h=>{a(null),o(s=>({...s,lumaAmount:h}))},J=h=>{a(null),o(s=>({...s,lumaLow:h}))},ce=h=>{a(null),o(s=>({...s,lumaHigh:h}))},se=h=>{a(null),o(s=>({...s,lumaKnee:h}))},R=h=>{a(null),o(s=>({...s,saturationAmount:h}))},D=h=>{a(null),o(s=>({...s,saturationLow:h}))},V=h=>{a(null),o(s=>({...s,saturationHigh:h}))},W=h=>{a(null),o(s=>({...s,saturationKnee:h}))},K=h=>{a(null),o(s=>({...s,phosphorDotLightBalance:h}))},g=h=>{a(null),o(s=>({...s,phosphorDotInternalScale:h}))},I=h=>{a(null),o(s=>({...s,phosphorDotBrightCore:h}))},v=h=>{a(null),o(s=>({...s,phosphorDotCellFill:h}))},X=h=>{a(null),o(s=>({...s,phosphorDotFlatDisc:h}))},w=h=>{a(null),o(s=>({...s,phosphorDotNeighborBlend:h}))},j=h=>{a(null),o(s=>({...s,closeUpNoiseStrength:h}))},k=h=>{a(null),o(s=>({...s,monoTint:h}))},re=h=>{a(null),o(s=>({...s,neonBoost:h}))},oe=h=>{a(null),o(s=>({...s,neonSaturation:h}))},ge=h=>{a(null),o(s=>({...s,neonDetail:h}))},U=h=>{o(s=>({...s,isFilterEnabled:h}))},Ce=h=>{const s=gt[h];a(h),o(fe=>({...fe,targetWidth:s.width,targetHeight:s.height,colorLevels:s.colors,ditherStrength:s.dither,paletteMode:s.palette,curvature:s.curvature,scanlineStrength:s.scanline,scanline2Strength:s.scanline2,vignetteStrength:s.vignette,glowStrength:s.glow,smoothStrength:s.smoothStrength??0,toonSteps:s.toonSteps??0,edgeBoost:s.edgeBoost??0,animeEdgeLow:s.animeEdgeLow??.08,animeEdgeHigh:s.animeEdgeHigh??.55,phosphorStrength:s.phosphor,spotMaskStrength:s.spotMask,bulbRadius:s.bulbRadius,blackFloor:s.blackFloor,lumaAmount:s.lumaAmount??1,lumaLow:s.lumaLow??0,lumaHigh:s.lumaHigh??1,lumaKnee:s.lumaKnee??.2,saturationAmount:s.saturationAmount??1,saturationLow:s.saturationLow??0,saturationHigh:s.saturationHigh??1,saturationKnee:s.saturationKnee??.2,phosphorDotLightBalance:s.phosphorDotLightBalance??1,phosphorDotInternalScale:s.phosphorDotInternalScale??!1,phosphorDotBrightCore:s.phosphorDotBrightCore??!1,phosphorDotCellFill:s.phosphorDotCellFill??0,phosphorDotFlatDisc:s.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:s.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:s.closeUpNoiseStrength??0,scanlineBrightnessFade:s.scanlineBrightnessFade??.6,monoTint:s.monoTint,neonBoost:s.neonBoost,neonSaturation:s.neonSaturation,neonDetail:s.neonDetail,isFilterEnabled:!0}))},ae=h=>{a(Et(h)),o(h)},we=()=>{a(Et(e)),o(e)};return u.useEffect(()=>{const h=setTimeout(()=>{On(n)},300);return()=>clearTimeout(h)},[n]),u.useEffect(()=>{const h=Et(n);a(s=>s===h?s:h)},[n]),{...n,selectedPreset:c,setTargetWidth:m,setTargetHeight:p,setMatchTargetAspect:M,setColorLevels:P,setDitherStrength:y,setPaletteMode:H,setCurvature:O,setScanlineStrength:A,setScanline2Strength:_,setScanlineBrightnessFade:Y,setVignetteStrength:$,setGlowStrength:te,setSmoothStrength:ee,setToonSteps:Q,setEdgeBoost:z,setAnimeEdgeLow:ne,setAnimeEdgeHigh:T,setPhosphorStrength:b,setSpotMaskStrength:L,setBulbRadius:Z,setBlackFloor:q,setLumaAmount:G,setLumaLow:J,setLumaHigh:ce,setLumaKnee:se,setSaturationAmount:R,setSaturationLow:D,setSaturationHigh:V,setSaturationKnee:W,setPhosphorDotLightBalance:K,setPhosphorDotInternalScale:g,setPhosphorDotBrightCore:I,setPhosphorDotCellFill:v,setPhosphorDotFlatDisc:X,setPhosphorDotNeighborBlend:w,setCloseUpNoiseStrength:j,setMonoTint:k,setNeonBoost:re,setNeonSaturation:oe,setNeonDetail:ge,setIsFilterEnabled:U,applyAllFilterSettings:ae,applyPreset:Ce,resetSettings:we}}function Cr({locale:t,hasAudibleMedia:e,hasPlayableMedia:r,isPlaying:n,isPoweredOn:o,ensureAudioContext:c,playVideoWithAudio:a,powerOn:m,setLoopingEnabled:p,togglePlayback:M}){const[P,y]=S.useState("07:00"),[H,O]=S.useState(null),[A,_]=S.useState("idle"),[Y,$]=S.useState(()=>new Date),[te,ee]=S.useState(!1),Q=S.useRef(null),z=S.useRef(null),ne=S.useRef(!1),T=S.useCallback(R=>new Date(R).toLocaleString(t==="ja"?"ja-JP":"en-US",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),[t]),b=S.useCallback(async()=>{let R=z.current;if((!R||R.state==="closed")&&(R=new AudioContext,z.current=R),R.state==="suspended")try{await R.resume()}catch(D){console.warn("[retro-player alarm] resume alarm context failed",{message:D instanceof Error?D.message:String(D),state:R.state})}return R},[]),L=S.useCallback(async()=>{let R=await b();if(R.state!=="running"&&(R=await c()??R),!R||R.state!=="running")return console.warn("[retro-player alarm] no running audio context for fallback tone",{alarmContextState:z.current?.state??null,playerContextState:R?.state??null}),!1;const D=R.currentTime+.02,V=R.createGain();V.gain.setValueAtTime(.9,D),V.connect(R.destination);const W=(K,g,I)=>{const v=R.createOscillator(),X=R.createGain(),w=D+K,j=w+I;v.type="triangle",v.frequency.setValueAtTime(g,w),X.gain.setValueAtTime(1e-4,w),X.gain.exponentialRampToValueAtTime(.16,w+.02),X.gain.exponentialRampToValueAtTime(1e-4,j),v.connect(X),X.connect(V),v.start(w),v.stop(j+.02)};return W(0,740,.22),W(.28,988,.24),W(.6,1318,.5),window.setTimeout(()=>{try{V.disconnect()}catch{}},1600),!0},[b,c]),Z=S.useCallback(async()=>{if(O(null),_("triggered"),console.info("[retro-player alarm] trigger",{hasAudibleMedia:e,hasPlayableMedia:r,isPoweredOn:o}),e)try{o||m(),await a(),console.info("[retro-player alarm] media playback started"),_("idle");return}catch(D){console.warn("[retro-player alarm] media playback failed; using fallback tone",{message:D instanceof Error?D.message:String(D)})}const R=await L();console.info("[retro-player alarm] fallback tone",{didPlayTone:R})},[e,r,o,L,a,m]);S.useEffect(()=>()=>{Q.current!==null&&window.clearTimeout(Q.current),z.current&&z.current.state!=="closed"&&z.current.close().catch(()=>{})},[]),S.useEffect(()=>{if(Q.current!==null&&(window.clearTimeout(Q.current),Q.current=null),!H){A==="armed"&&_("idle");return}const R=H-Date.now();if(R<=0){Z();return}return _("armed"),Q.current=window.setTimeout(()=>{Q.current=null,Z()},R),()=>{Q.current!==null&&(window.clearTimeout(Q.current),Q.current=null)}},[A,H,Z]),S.useEffect(()=>{if(A!=="armed"&&A!=="triggered")return;const R=window.setInterval(()=>$(new Date),1e3);return()=>window.clearInterval(R)},[A]),S.useEffect(()=>{if(!(A==="triggered"&&!e)){ne.current=!1;return}ne.current=!0;const D=async()=>{ne.current&&(await L(),ne.current&&window.setTimeout(D,400))};return D(),()=>{ne.current=!1}},[A,e,L]);const q=S.useCallback(async()=>{$(new Date),n&&await M(),p(!0);const R=await b();return c(),R},[b,c,n,p,M]),G=S.useCallback(async R=>{const[D,V]=R.split(":"),W=Number(D),K=Number(V);if(!Number.isFinite(W)||!Number.isFinite(K))return;const g=new Date,I=new Date(g);I.setHours(W,K,0,0),I.getTime()<=g.getTime()&&I.setDate(I.getDate()+1),O(I.getTime()),_("armed"),ee(!1);const v=await q();console.info("[retro-player alarm] armed",{alarmContextState:v.state,alarmTime:R,targetAt:I.toISOString(),hasAudibleMedia:e,hasPlayableMedia:r})},[e,r,q]),J=S.useCallback(async R=>{const D=Date.now()+R*60*1e3;O(D),_("armed"),ee(!0);const V=await q();console.info("[retro-player alarm] armed (relative)",{alarmContextState:V.state,minutes:R,targetAt:new Date(D).toISOString()})},[q]),ce=S.useCallback(()=>{O(null),_("idle"),ee(!1),console.info("[retro-player alarm] cleared")},[]),se=S.useCallback(()=>{console.info("[retro-player alarm] manual test"),Z()},[Z]);return{alarmTime:P,setAlarmTime:y,alarmTargetAt:H,alarmStatus:A,clockTime:Y,showSeconds:te,formatAlarmTarget:T,armAlarmAtTime:G,armAlarmIn:J,clearAlarm:ce,testAlarm:se,isAlarmOverlayVisible:A==="armed"||A==="triggered"&&!e}}function po({locale:t,player:e,isHighResolution:r,isFitWidthEnabled:n,isPinnedPreview:o,isPreviewMaximized:c,brightness:a,flipH:m,flipV:p,alarmTime:M,alarmTargetAt:P,alarmStatus:y,formatAlarmTarget:H,onAlarmTimeChange:O,onArmAlarm:A,onArmAlarmIn:_,onClearAlarm:Y,onTestAlarm:$,onRecordClick:te,onPowerToggle:ee,onHighResolutionChange:Q,onFitWidthToggle:z,onPinToggle:ne,onMaximizeToggle:T,onBrightnessChange:b,onFlipHToggle:L,onFlipVToggle:Z,onAudioOptimizationModeChange:q}){const G=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。",alarmIdle:"Alarm: 指定時刻にメディア再生か通知音を鳴らします。",alarmArmed:"Alarm: 時刻を待っています。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen.",alarmIdle:"Alarm: play media or a fallback tone at the selected time.",alarmArmed:"Alarm: armed and waiting for the selected time."},[J,ce]=S.useState(!1),[se,R]=S.useState(()=>typeof window<"u"&&window.innerWidth<360),[D,V]=S.useState(null),W=S.useRef(null),K=S.useCallback(k=>{W.current!==null&&window.clearTimeout(W.current),W.current=window.setTimeout(()=>{V(k),W.current=null},120)},[]),g=S.useCallback(()=>{W.current!==null&&(window.clearTimeout(W.current),W.current=null),V(null)},[]);S.useEffect(()=>()=>{W.current!==null&&window.clearTimeout(W.current)},[]),S.useEffect(()=>{const k=()=>{R(window.innerWidth<360)};return window.addEventListener("resize",k,{passive:!0}),()=>{window.removeEventListener("resize",k)}},[]);const I="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",v="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",X="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",w="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",j=(k,re,oe="w-44")=>l.jsx("div",{role:"tooltip","aria-hidden":D!==k,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",oe,D===k?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:re});return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":"More options",onClick:()=>{g(),ce(k=>!k)},className:[I,J||a!==1||m||p?v:X].join(" "),children:l.jsx(Rn,{size:16})}),J&&l.jsxs("div",{className:"absolute bottom-full left-0 mb-2 w-52 rounded-xl border border-slate-600/80 bg-slate-950/96 p-3 shadow-xl backdrop-blur-sm",children:[l.jsxs("div",{className:"mb-3 border-b border-slate-700 pb-3",children:[l.jsxs("div",{className:"mb-1.5 flex items-center justify-between text-[11px] text-slate-400",children:[l.jsx("span",{children:"Audio Optimize"}),l.jsx("span",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:e.audioOptimizationMode})]}),l.jsx("div",{className:"grid grid-cols-3 gap-1.5",children:["auto","chrome","safari"].map(k=>{const re=e.audioOptimizationMode===k;return l.jsx("button",{type:"button",onClick:()=>{q(k)},className:["inline-flex min-h-8 items-center justify-center rounded-md border px-1.5 py-1 text-[11px] font-medium capitalize transition",re?"border-cyan-300/70 bg-cyan-400/18 text-cyan-50":"border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800"].join(" "),children:k},k)})})]}),l.jsxs("div",{className:"mb-3 border-b border-slate-700 pb-3",children:[l.jsxs("div",{className:"mb-1.5 flex items-center justify-between text-[11px] text-slate-400",children:[l.jsxs("span",{className:"flex items-center gap-1.5",children:[l.jsx(ht,{size:11}),"Alarm"]}),l.jsx("span",{className:"text-[10px] uppercase tracking-[0.2em] text-slate-500",children:y==="armed"?"Armed":y==="triggered"?"Done":"Off"})]}),l.jsx("input",{type:"time",value:M,onChange:k=>{O(k.currentTarget.value)},className:"mb-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 outline-none transition focus:border-slate-400"}),l.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[l.jsxs("button",{type:"button",onClick:()=>{ce(!1),A()},className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",P?"border-cyan-300/70 bg-cyan-400/18 text-cyan-50 hover:bg-cyan-400/24":"border-slate-500 bg-slate-800 text-slate-100 hover:bg-slate-700"].join(" "),children:[l.jsx(ht,{size:12}),"Set"]}),l.jsx("button",{type:"button",onClick:$,className:"inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-500 bg-slate-800 px-2 py-1.5 text-xs text-slate-100 transition hover:bg-slate-700",children:"Test"}),l.jsx("button",{type:"button",onClick:Y,className:"inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-xs text-slate-200 transition hover:bg-slate-800",children:"Clear"})]}),l.jsx("div",{className:"mt-2 flex gap-2",children:[1,5,10].map(k=>l.jsxs("button",{type:"button",onClick:()=>{ce(!1),_(k)},className:"inline-flex min-h-8 flex-1 items-center justify-center rounded-md border border-slate-700 bg-slate-900/70 px-1.5 py-1 text-[11px] text-slate-300 transition hover:bg-slate-800",children:["+",k,"m"]},k))}),l.jsx("p",{className:"mt-2 text-[11px] leading-4 text-slate-400",children:P?t==="ja"?`次回: ${H(P)}`:`Next: ${H(P)}`:y==="armed"?G.alarmArmed:G.alarmIdle}),l.jsx("p",{className:"mt-1.5 text-[10px] leading-[1.45] text-slate-500",children:t==="ja"?"※ バックグラウンド動作はブラウザ依存。他のウィンドウが前面にある場合など、正常に動作しないことがあります。":"※ Background behavior depends on the browser and may not work reliably when another window is in front."})]}),se&&e.canRecord&&l.jsx("div",{className:"mb-3 border-b border-slate-700 pb-3",children:l.jsxs("button",{type:"button",onClick:te,className:["inline-flex w-full min-h-9 items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition",e.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:[e.isRecording?l.jsx(Mo,{size:13,className:"fill-current animate-pulse"}):l.jsx(Do,{size:13,className:"text-rose-300"}),e.isRecording?"Stop REC":"Record"]})}),l.jsxs("div",{className:"mb-3",children:[l.jsxs("div",{className:"mb-1.5 flex items-center justify-between text-[11px] text-slate-400",children:[l.jsxs("span",{className:"flex items-center gap-1.5",children:[l.jsx(jn,{size:11}),"Brightness"]}),l.jsxs("span",{children:[Math.round(a*100),"%"]})]}),l.jsx("input",{type:"range",min:"0.4",max:"2.0",step:"0.05",value:a,onChange:k=>{b(Number(k.currentTarget.value))},className:"w-full"})]}),l.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[l.jsxs("button",{type:"button",onClick:L,className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",m?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[l.jsx(Pn,{size:13}),"Flip H"]}),l.jsxs("button",{type:"button",onClick:Z,className:["inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs transition",p?"border-emerald-300/80 bg-emerald-400/20 text-emerald-50":"border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"].join(" "),children:[l.jsx(Fn,{size:13}),"Flip V"]})]})]})]}),e.canRecord&&!se&&l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":e.isRecording?"Stop recording":"Start recording",onClick:te,onMouseEnter:()=>K("record"),onMouseLeave:g,onFocus:()=>K("record"),onBlur:g,className:[w,e.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:e.isRecording?l.jsx(Mo,{size:14,className:"fill-current animate-pulse"}):l.jsx(Do,{size:16,className:"text-rose-300"})}),j("record",e.isRecording?G.recordStop:G.recordIdle)]}),l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":e.isPoweredOn?"Power off":"Power on",onClick:()=>{g(),ee()},onMouseEnter:()=>K("power"),onMouseLeave:g,onFocus:()=>K("power"),onBlur:g,className:[I,e.isPoweredOn?v:X].join(" "),children:l.jsx(En,{size:16})}),j("power",e.isPoweredOn?G.powerOff:G.powerOn)]}),l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":r?"Disable high resolution":"Enable high resolution",onClick:()=>{g(),Q(!r)},onMouseEnter:()=>K("hi-res"),onMouseLeave:g,onFocus:()=>K("hi-res"),onBlur:g,className:[I,r?v:X].join(" "),children:l.jsx(xn,{size:16})}),j("hi-res",G.hiRes)]}),l.jsxs("div",{className:"flex items-center",children:[l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":n?"Disable fit width":"Enable fit width",onClick:()=>{g(),z()},onMouseEnter:()=>K("fit-width"),onMouseLeave:g,onFocus:()=>K("fit-width"),onBlur:g,className:["inline-flex h-9 w-9 items-center justify-center rounded-l-full border-t border-b border-l border-r-0 text-sm transition backdrop-blur-sm",n?v:X].join(" "),children:l.jsx(Cn,{size:16})}),j("fit-width",n?G.fitWidthOn:G.fitWidthOff)]}),l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":o?"Unpin preview":"Pin preview",onClick:()=>{g(),ne()},onMouseEnter:()=>K("pin"),onMouseLeave:g,onFocus:()=>K("pin"),onBlur:g,className:["inline-flex h-9 w-9 items-center justify-center rounded-none border-t border-b border-l-0 border-r-0 text-sm transition backdrop-blur-sm",c||n?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":o?v:X].join(" "),disabled:c||n,children:l.jsx(fn,{size:16})}),j("pin",c?G.pinUnavailable:n?G.pinUnavailableFitWidth:o?G.pinOn:G.pinOff)]}),l.jsxs("div",{className:"relative",children:[l.jsx("button",{type:"button","aria-label":c?"Exit maximize":"Maximize preview",onClick:()=>{g(),T()},onMouseEnter:()=>K("maximize"),onMouseLeave:g,onFocus:()=>K("maximize"),onBlur:g,className:["inline-flex h-9 w-9 items-center justify-center rounded-r-full border-t border-b border-r border-l-0 text-sm transition backdrop-blur-sm",c?v:X].join(" "),children:c?l.jsx(vo,{size:16}):l.jsx(Dn,{size:16})}),j("maximize",c?G.maximizeOn:G.maximizeOff)]})]})]})}function Wo({locale:t,src:e,kind:r,player:n,isHighResolution:o,isFitWidthEnabled:c,controlPanelMode:a,confirmDialog:m,onHighResolutionChange:p,onFitWidthChange:M,onError:P,fillHeight:y=!1,onIsPinnedPreviewChange:H}){const O=S.useMemo(()=>Ft()?.ui,[]),[A,_]=S.useState(O?.isPreviewMaximized??!1),[Y,$]=S.useState(!1),[te,ee]=S.useState(!1),[Q,z]=S.useState(0),[ne,T]=S.useState(O?.brightness??1),[b,L]=S.useState(O?.flipH??!1),[Z,q]=S.useState(O?.flipV??!1),[G,J]=S.useState(null),ce=S.useRef(null),se=S.useRef(null),R=S.useRef(null),D=S.useCallback(()=>{const B=ce.current,pe=R.current;if(!B||!pe)return null;const le=B.getBoundingClientRect(),Le=pe.getBoundingClientRect();return{left:le.left,width:le.width,height:Le.height}},[]),{alarmTime:V,setAlarmTime:W,alarmTargetAt:K,alarmStatus:g,clockTime:I,showSeconds:v,formatAlarmTarget:X,armAlarmAtTime:w,armAlarmIn:j,clearAlarm:k,testAlarm:re,isAlarmOverlayVisible:oe}=Cr({locale:t,hasAudibleMedia:n.hasAudibleMedia,hasPlayableMedia:n.hasPlayableMedia,isPlaying:n.isPlaying,isPoweredOn:n.isPoweredOn,ensureAudioContext:n.ensureAudioContext,playVideoWithAudio:n.playVideoWithAudio,powerOn:n.powerOn,setLoopingEnabled:n.setLoopingEnabled,togglePlayback:n.togglePlayback});S.useEffect(()=>{Un({isPreviewMaximized:A,isHighResolution:o,brightness:ne,flipH:b,flipV:Z})},[o,A,ne,b,Z]),S.useEffect(()=>{},[]),S.useEffect(()=>{if(!A)return;const B=document.body.style.overflow,pe=le=>{le.code==="Escape"&&_(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",pe),()=>{document.body.style.overflow=B,window.removeEventListener("keydown",pe)}},[A]),S.useEffect(()=>{A&&($(!1),ee(!1),z(0),J(null))},[A]),S.useEffect(()=>{c&&($(!1),ee(!1),z(0),J(null))},[c]),S.useEffect(()=>{if(a==="playback"||A||Y||c){ee(!1),z(0);return}const B=()=>{const pe=se.current,le=R.current;if(!pe||!le)return;const Le=pe.getBoundingClientRect().top,Ie=le.getBoundingClientRect().height,Te=Math.round(Math.min(Ie,window.innerHeight)*.4),Oe=-Math.max(120,Te);ee(ke=>{if(!ke&&Le<=Oe){z(Math.max(120,Te));const We=D();return We&&J(We),!0}return ke&&z(Math.max(120,Te)),ke&&Le>=-24?(z(0),!1):ke})};return B(),window.addEventListener("scroll",B,{passive:!0}),window.addEventListener("resize",B),()=>{window.removeEventListener("scroll",B),window.removeEventListener("resize",B)}},[a,c,A,Y,D]),S.useEffect(()=>{if(!((Y||te)&&!A)){J(null);return}const pe=()=>{const le=D();le&&J(le)};return pe(),window.addEventListener("resize",pe),window.addEventListener("scroll",pe,{passive:!0}),()=>{window.removeEventListener("resize",pe),window.removeEventListener("scroll",pe)}},[a,te,A,Y,c,D,n.sourceDimensions]),S.useEffect(()=>{n.refreshLayout()},[Y,A,n.refreshLayout,n.sourceDimensions?.height,n.sourceDimensions?.width]);const ge=r==="image"&&!!e&&!n.previewError&&(!n.isRendererReady||n.isLoading),U=S.useMemo(()=>{if(n.sourceDimensions)return`${n.sourceDimensions.width} / ${n.sourceDimensions.height}`},[n.sourceDimensions]),Ce=S.useMemo(()=>{if(!n.sourceDimensions||!G)return;const{width:B,height:pe}=n.sourceDimensions,le=B/Math.max(pe,1),Ie=(typeof window<"u"?window.innerHeight*.5:300)*le;return`${Math.floor(Math.min(Ie,G.width))}px`},[n.sourceDimensions,G]),ae=(Y||te)&&!A,we=te?`calc(max(0.0rem, env(safe-area-inset-top)) - ${Q}px)`:void 0;S.useEffect(()=>{H?.(ae)},[ae,H]);const h=()=>{(async()=>{if(n.isRecording){try{if(!await n.stopRecording())return;const pe=await m({title:"Recording ready",body:n.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:n.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(n.ensureAudioContext(),!pe)return;if(n.prefersShareExport){await n.sharePendingRecording()||n.downloadPendingRecording();return}n.downloadPendingRecording()}catch(B){P?.(B instanceof Error?B:new Error(String(B)))}return}try{await n.startRecording()}catch(B){P?.(B instanceof Error?B:new Error(String(B)))}})()},s=()=>{w(V)},fe=()=>{k()},ye=B=>{j(B)},Ae=()=>{re()};return l.jsxs("div",{ref:ce,className:ae||A||!y?"space-y-4":"h-full flex flex-col",children:[l.jsx("div",{ref:se,"aria-hidden":"true"}),l.jsxs("div",{ref:R,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${A?c?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":ae?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":y?"flex-1 min-h-0 overflow-visible":"overflow-visible"}`,style:ae&&G?{left:`${G.left}px`,top:we??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${G.width}px`}:A?void 0:{overflow:"visible"},children:[A&&(c?l.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:l.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{_(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:l.jsx(vo,{size:18})})}):l.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{_(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:l.jsx(vo,{size:18})})),l.jsxs("div",{className:`relative ${A?"w-full":"max-w-full min-w-0 overflow-visible"} ${y&&!A&&!ae&&!c?"h-full":""}`,style:A?c&&U?{aspectRatio:U,width:"100%"}:void 0:c&&U?{aspectRatio:U,width:"100%"}:ae?{height:"50vh",width:Ce??"100%",maxWidth:"100%",margin:"0 auto"}:U?{aspectRatio:U,maxWidth:y?"100%":a==="playback"?`min(100%, calc(min(60dvh, calc(100dvh - 260px)) * ${U}))`:`min(100%, calc(70dvh * ${U}))`,maxHeight:y?"100%":a==="playback"?"min(60dvh, calc(100dvh - 260px))":"70dvh",margin:"0 auto"}:void 0,children:[l.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",style:{filter:ne!==1?`brightness(${ne})`:void 0,transform:b||Z?`scale(${b?-1:1}, ${Z?-1:1})`:void 0},children:[ge&&l.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),l.jsx("div",{ref:n.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!n.isPoweredOn&&l.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:l.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[l.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),l.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),n.isLoading&&!n.needsUserPlay&&!n.previewError&&l.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",ge?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:l.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[l.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#cac0b2] border-t-[#111014]"}),l.jsx("p",{className:"font-medium",children:n.loadingLabel||"Loading preview..."}),l.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),n.needsUserPlay&&!n.isLoading&&l.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:l.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[l.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),l.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),l.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),l.jsx("button",{type:"button",onClick:()=>{n.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),n.hasAudioOnly&&l.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!c&&l.jsx("div",{className:"absolute -bottom-8 -right-4 z-50 flex items-center gap-2",children:l.jsx(po,{locale:t,player:n,isHighResolution:o,isFitWidthEnabled:c,isPinnedPreview:ae,isPreviewMaximized:A,brightness:ne,flipH:b,flipV:Z,alarmTime:V,alarmTargetAt:K,alarmStatus:g,formatAlarmTarget:X,onAlarmTimeChange:W,onArmAlarm:s,onArmAlarmIn:ye,onClearAlarm:fe,onTestAlarm:Ae,onRecordClick:h,onPowerToggle:()=>{if(n.isPoweredOn){n.powerOff();return}n.powerOn()},onHighResolutionChange:p,onFitWidthToggle:()=>{c||_(!1),M(!c)},onPinToggle:()=>{A||c||$(B=>{if(!B){const le=D();return le&&J(le),!0}return ee(!1),z(0),J(null),!1})},onMaximizeToggle:()=>{A||M(!1),_(B=>!B)},onBrightnessChange:T,onFlipHToggle:()=>{L(B=>!B)},onFlipVToggle:()=>{q(B=>!B)},onAudioOptimizationModeChange:n.setAudioOptimizationMode})})]}),c&&A&&l.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:l.jsx(po,{locale:t,player:n,isHighResolution:o,isFitWidthEnabled:c,isPinnedPreview:ae,isPreviewMaximized:A,brightness:ne,flipH:b,flipV:Z,alarmTime:V,alarmTargetAt:K,alarmStatus:g,formatAlarmTarget:X,onAlarmTimeChange:W,onArmAlarm:s,onArmAlarmIn:ye,onClearAlarm:fe,onTestAlarm:Ae,onRecordClick:h,onPowerToggle:()=>{if(n.isPoweredOn){n.powerOff();return}n.powerOn()},onHighResolutionChange:p,onFitWidthToggle:()=>{c||_(!1),M(!c)},onPinToggle:()=>{A||c||$(B=>{if(!B){const le=D();return le&&J(le),!0}return ee(!1),z(0),J(null),!1})},onMaximizeToggle:()=>{A||M(!1),_(B=>!B)},onBrightnessChange:T,onFlipHToggle:()=>{L(B=>!B)},onFlipVToggle:()=>{q(B=>!B)},onAudioOptimizationModeChange:n.setAudioOptimizationMode})})]}),c&&!A&&l.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-0",children:l.jsx(po,{locale:t,player:n,isHighResolution:o,isFitWidthEnabled:c,isPinnedPreview:ae,isPreviewMaximized:A,brightness:ne,flipH:b,flipV:Z,alarmTime:V,alarmTargetAt:K,alarmStatus:g,formatAlarmTarget:X,onAlarmTimeChange:W,onArmAlarm:s,onArmAlarmIn:ye,onClearAlarm:fe,onTestAlarm:Ae,onRecordClick:h,onPowerToggle:()=>{if(n.isPoweredOn){n.powerOff();return}n.powerOn()},onHighResolutionChange:p,onFitWidthToggle:()=>{c||_(!1),M(!c)},onPinToggle:()=>{A||c||$(B=>{if(!B){const le=D();return le&&J(le),!0}return ee(!1),z(0),J(null),!1})},onMaximizeToggle:()=>{A||M(!1),_(B=>!B)},onBrightnessChange:T,onFlipHToggle:()=>{L(B=>!B)},onFlipVToggle:()=>{q(B=>!B)},onAudioOptimizationModeChange:n.setAudioOptimizationMode})}),ae&&G&&l.jsx("div",{style:{height:`min(${G.height}px, 50vh)`}}),oe&&l.jsx("div",{className:"fixed inset-0 z-200 flex flex-col items-center justify-center bg-slate-950/96 backdrop-blur-md",children:g==="armed"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"pointer-events-none select-none text-center",children:[l.jsx("div",{className:v?"text-[min(14vw,5.5rem)] font-thin leading-none tracking-[-0.02em] text-slate-50 tabular-nums":"text-[min(22vw,9rem)] font-thin leading-none tracking-[-0.02em] text-slate-50 tabular-nums",children:I.toLocaleTimeString(t==="ja"?"ja-JP":"en-US",{hour:"2-digit",minute:"2-digit",...v?{second:"2-digit"}:{}})}),l.jsx("div",{className:"mt-3 text-sm text-slate-400",children:I.toLocaleDateString(t==="ja"?"ja-JP":"en-US",{month:"long",day:"numeric",weekday:"long"})}),l.jsxs("div",{className:"mt-8 flex items-center justify-center gap-2 text-slate-500",children:[l.jsx(ht,{size:13}),l.jsx("span",{className:"text-sm",children:K?X(K):"—"})]})]}),l.jsx("button",{type:"button",onClick:B=>{B.stopPropagation(),fe()},className:"pointer-events-auto mt-12 rounded-full border border-slate-500/60 bg-slate-800/80 px-8 py-3 text-sm text-slate-300 transition hover:bg-slate-700 active:scale-95",children:"Alarm Off"}),l.jsx("p",{className:"pointer-events-none mt-5 text-xs text-slate-600",children:t==="ja"?"ボタンを押して解除":"Press the button to dismiss"}),l.jsx("p",{className:"pointer-events-none mt-3 max-w-xs text-center text-[10px] leading-relaxed text-slate-700",children:t==="ja"?"※ バックグラウンド動作はブラウザ依存。他のウィンドウが前面にある場合など、正常に動作しないことがあります。":"※ Background behavior depends on the browser and may not work reliably when another window is in front."})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"pointer-events-none select-none text-center",children:[l.jsx("div",{className:`animate-pulse ${v?"text-[min(14vw,5.5rem)]":"text-[min(22vw,9rem)]"} font-thin leading-none tracking-[-0.02em] text-slate-50 tabular-nums`,children:I.toLocaleTimeString(t==="ja"?"ja-JP":"en-US",{hour:"2-digit",minute:"2-digit",...v?{second:"2-digit"}:{}})}),l.jsxs("div",{className:"mt-6 flex items-center justify-center gap-2 text-amber-300/80",children:[l.jsx(ht,{size:18}),l.jsx("span",{className:"text-lg font-medium tracking-widest uppercase",children:t==="ja"?"アラーム":"Alarm"}),l.jsx(ht,{size:18})]})]}),l.jsx("button",{type:"button",onClick:fe,className:"pointer-events-auto mt-12 rounded-full border border-amber-400/40 bg-amber-500/15 px-8 py-3 text-sm text-amber-200 transition hover:bg-amber-500/25 active:scale-95",children:t==="ja"?"アラームを止める":"Stop Alarm"}),l.jsx("p",{className:"pointer-events-none mt-5 text-xs text-slate-600",children:t==="ja"?"ボタンを押して止める":"Press the button to stop"})]})})]})}const yr=S.lazy(()=>Vo(()=>import("./VideoControls-a3YzMDO5.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(t=>({default:t.VideoControls}))),Sr=S.lazy(()=>Vo(()=>import("./RetroFilterPanel-BOXpm9Zt.js"),__vite__mapDeps([4,1,2,3]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Uo=l.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-[#7a7268]",children:"Preparing controls..."});function fo({locale:t,player:e,filterState:r,controlPanelMode:n,onControlPanelModeChange:o,onApplyPreset:c,onSetTargetWidth:a,onSetTargetHeight:m,onSetMatchTargetAspect:p,onResetSettings:M,onImportSettings:P}){return l.jsxs("div",{className:"rounded-2xl border border-[#cac0b2] bg-[#eae6df] p-3 text-xs text-[#2c2418]",children:[(e.hasPlayableMedia||e.hasImage)&&n!=="video-settings"&&l.jsx(S.Suspense,{fallback:Uo,children:l.jsx(yr,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:n==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,noiseReductionAmount:e.noiseReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeNoiseReductionAmount:e.setNoiseReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{o("playback")},onResetSettings:M,onImportSettings:P,onToggleVideoSettings:()=>{o("video-settings")},onToggleAudioSettings:()=>{o(n==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&l.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),n==="video-settings"&&l.jsxs("div",{className:"mt-4 border-t border-[#cac0b2] pt-4",children:[l.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:l.jsx("button",{type:"button",onClick:()=>{o("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-[#bcb4a6] bg-[#f5f1ea] px-3 py-2 text-[#12141c] hover:bg-[#e2ddd5]",children:"Back to Playback"})}),l.jsx(S.Suspense,{fallback:Uo,children:l.jsx(Sr,{locale:t,colorLevels:r.colorLevels,curvature:r.curvature,ditherStrength:r.ditherStrength,glowStrength:r.glowStrength,smoothStrength:r.smoothStrength,toonSteps:r.toonSteps,edgeBoost:r.edgeBoost,animeEdgeLow:r.animeEdgeLow,animeEdgeHigh:r.animeEdgeHigh,isFilterEnabled:r.isFilterEnabled,monoTint:r.monoTint,neonBoost:r.neonBoost,neonDetail:r.neonDetail,neonSaturation:r.neonSaturation,paletteMode:r.paletteMode,phosphorStrength:r.phosphorStrength,spotMaskStrength:r.spotMaskStrength,bulbRadius:r.bulbRadius,blackFloor:r.blackFloor,lumaAmount:r.lumaAmount,lumaLow:r.lumaLow,lumaHigh:r.lumaHigh,lumaKnee:r.lumaKnee,saturationAmount:r.saturationAmount,saturationLow:r.saturationLow,saturationHigh:r.saturationHigh,saturationKnee:r.saturationKnee,phosphorDotLightBalance:r.phosphorDotLightBalance,phosphorDotInternalScale:r.phosphorDotInternalScale,phosphorDotBrightCore:r.phosphorDotBrightCore,phosphorDotCellFill:r.phosphorDotCellFill,phosphorDotFlatDisc:r.phosphorDotFlatDisc,phosphorDotNeighborBlend:r.phosphorDotNeighborBlend,closeUpNoiseStrength:r.closeUpNoiseStrength,scanlineBrightnessFade:r.scanlineBrightnessFade,scanlineStrength:r.scanlineStrength,scanline2Strength:r.scanline2Strength,selectedPreset:r.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:r.targetHeight,targetWidth:r.targetWidth,matchTargetAspect:r.matchTargetAspect,vignetteStrength:r.vignetteStrength,onApplyPreset:c,onSetColorLevels:r.setColorLevels,onSetCurvature:r.setCurvature,onSetDitherStrength:r.setDitherStrength,onSetGlowStrength:r.setGlowStrength,onSetSmoothStrength:r.setSmoothStrength,onSetToonSteps:r.setToonSteps,onSetEdgeBoost:r.setEdgeBoost,onSetAnimeEdgeLow:r.setAnimeEdgeLow,onSetAnimeEdgeHigh:r.setAnimeEdgeHigh,onSetIsFilterEnabled:r.setIsFilterEnabled,onSetMonoTint:r.setMonoTint,onSetNeonBoost:r.setNeonBoost,onSetNeonDetail:r.setNeonDetail,onSetNeonSaturation:r.setNeonSaturation,onSetPaletteMode:r.setPaletteMode,onSetPhosphorStrength:r.setPhosphorStrength,onSetSpotMaskStrength:r.setSpotMaskStrength,onSetBulbRadius:r.setBulbRadius,onSetBlackFloor:r.setBlackFloor,onSetLumaAmount:r.setLumaAmount,onSetLumaLow:r.setLumaLow,onSetLumaHigh:r.setLumaHigh,onSetLumaKnee:r.setLumaKnee,onSetSaturationAmount:r.setSaturationAmount,onSetSaturationLow:r.setSaturationLow,onSetSaturationHigh:r.setSaturationHigh,onSetSaturationKnee:r.setSaturationKnee,onSetPhosphorDotLightBalance:r.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:r.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:r.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:r.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:r.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:r.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:r.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:r.setScanlineBrightnessFade,onSetScanlineStrength:r.setScanlineStrength,onSetScanline2Strength:r.setScanline2Strength,onSetTargetHeight:m,onSetTargetWidth:a,onSetMatchTargetAspect:p,onSetVignetteStrength:r.setVignetteStrength})})]})]})}function Tr({mode:t,preview:e,playbackControls:r,settingsOverlay:n,isPinnedInSettings:o=!1}){const c=t==="playback"||t==="settings";return l.jsxs("div",{className:c?"flex flex-col flex-1 min-h-0 gap-4":"space-y-4",children:[l.jsx("div",{className:t==="playback"?"flex-1 min-h-0":void 0,style:t==="settings"?{height:o?"50dvh":"33dvh",flexShrink:0}:void 0,children:e}),l.jsx("div",{className:t==="playback"?"shrink-0":t==="settings"?"flex-1 min-h-0 overflow-y-auto":void 0,children:t==="settings"?n:r})]})}function zo({locale:t="en",src:e,stream:r,streamName:n,kind:o="video",looping:c,className:a,onError:m,initialFilterState:p,confirmDialog:M}){const{showConfirmDialog:P}=vn(),y=M??(g=>P({...g,title:g.title??"",body:g.body??""}).then(I=>I??!1)),H=S.useMemo(()=>Ft()?.ui,[]),[O,A]=S.useState(H?.isHighResolution??!1),[_,Y]=S.useState(!1),[$,te]=S.useState("playback"),[ee,Q]=S.useState(!1),z=S.useRef(""),ne=S.useRef(""),T=wr(p),b=O&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,L=Ar(T,_?"width":"contain",b),Z=S.useCallback(()=>{zn(),T.resetSettings(),L.resetAudioSettings(),A(!1)},[T,L]),q=S.useCallback(g=>{T.applyAllFilterSettings(g.filter),L.applyAudioSettings(g.audio),A(g.ui.isHighResolution),bn(g.locale)},[T,L]),G=S.useCallback(()=>{if(!L.sourceDimensions)return;const g=Math.max(8,Math.round(T.targetWidth/L.sourceDimensions.width*L.sourceDimensions.height/8)*8);g!==T.targetHeight&&T.setTargetHeight(g)},[T.targetHeight,T.targetWidth,T.setTargetHeight,L.sourceDimensions]),J=S.useCallback(()=>L.sourceDimensions?.width&&L.sourceDimensions?.height?L.sourceDimensions.width/L.sourceDimensions.height:Math.max(T.targetWidth,1)/Math.max(T.targetHeight,1),[T.targetHeight,T.targetWidth,L.sourceDimensions]),ce=S.useCallback(g=>{if(T.setTargetWidth(g),!T.matchTargetAspect)return;const I=Math.max(J(),1e-4);T.setTargetHeight(Math.max(1,Math.round(g/I)))},[T,J]),se=S.useCallback(g=>{if(T.setTargetHeight(g),!T.matchTargetAspect)return;const I=Math.max(J(),1e-4);T.setTargetWidth(Math.max(1,Math.round(g*I)))},[T,J]),R=S.useCallback(g=>{T.setMatchTargetAspect(g),g&&L.sourceDimensions&&G()},[T,L.sourceDimensions,G]),D=S.useCallback(g=>{if(T.applyPreset(g),g!=="phosphorDot"||!L.sourceDimensions)return;const I=gt.phosphorDot,v=Math.max(L.sourceDimensions.width,1),X=Math.max(L.sourceDimensions.height,1),w=v/X,j=I.width/I.height;let k=I.width,re=I.height;w>j?re=Math.max(8,Math.round(I.width/w/8)*8):k=Math.max(8,Math.round(I.height*w/8)*8),!(I.width===k&&I.height===re)&&(T.setTargetWidth(k),T.setTargetHeight(re))},[T.applyPreset,T.setTargetHeight,T.setTargetWidth,L.sourceDimensions]);if(S.useEffect(()=>{T.matchTargetAspect&&L.sourceDimensions&&G()},[T.matchTargetAspect,L.sourceDimensions,G]),S.useEffect(()=>{if(r){const I=`stream:${r.id}:${o}:${n??""}`;if(z.current===I)return;z.current=I,(async()=>{try{await L.previewStream(r,o==="audio"?"audio":"video",n)}catch(v){m?.(v instanceof Error?v:new Error(String(v)))}})();return}if(!e){z.current="";return}const g=`src:${e}:${o}`;z.current!==g&&(z.current=g,(async()=>{try{await L.previewUrl(e,o)}catch(I){m?.(I instanceof Error?I:new Error(String(I)))}})())},[e,r,n,o,m,L]),S.useEffect(()=>{L.refreshLayout()},[_,L.refreshLayout]),S.useEffect(()=>{L.refreshLayout()},[T.targetWidth,T.targetHeight,T.isFilterEnabled,b,L.refreshLayout]),S.useEffect(()=>{if(typeof c!="boolean")return;const g=r?`stream:${r.id}:${o}`:e?`src:${e}:${o}`:"";if(!g){ne.current="";return}const I=`${g}:${c}`;ne.current!==I&&(ne.current=I,L.setLoopingEnabled(c))},[o,c,L,e,r]),a)return l.jsx("section",{className:a,children:l.jsxs("div",{className:"space-y-4",children:[l.jsx(Wo,{locale:t,src:e,kind:o,player:L,isHighResolution:O,isFitWidthEnabled:_,controlPanelMode:$,confirmDialog:y,onHighResolutionChange:A,onFitWidthChange:Y,onError:m}),l.jsx(fo,{locale:t,player:L,filterState:T,controlPanelMode:$,onControlPanelModeChange:te,onApplyPreset:D,onSetTargetWidth:ce,onSetTargetHeight:se,onSetMatchTargetAspect:R,onResetSettings:Z,onImportSettings:q})]})});const V=_?"fitwidth":$!=="playback"?"settings":"playback",W=V==="playback"||V==="settings",K={locale:t,player:L,filterState:T,onControlPanelModeChange:te,onApplyPreset:D,onSetTargetWidth:ce,onSetTargetHeight:se,onSetMatchTargetAspect:R,onResetSettings:Z,onImportSettings:q};return l.jsx("div",{className:"flex flex-col h-full rounded-2xl p-0.75 shadow-md",style:{background:"linear-gradient(135deg, #555 0%, #111 30%, #333 65%, #111 100%)"},children:l.jsx("section",{className:`relative flex flex-col flex-1 min-h-0 ${V==="fitwidth"?"overflow-y-auto":"overflow-hidden"} rounded-[13px] bg-[rgba(245,241,234,0.78)] p-3`,children:l.jsx(Tr,{mode:V,preview:l.jsx(Wo,{locale:t,src:e,kind:o,player:L,isHighResolution:O,isFitWidthEnabled:_,controlPanelMode:$,confirmDialog:y,fillHeight:W,onHighResolutionChange:A,onFitWidthChange:Y,onError:m,onIsPinnedPreviewChange:Q}),playbackControls:l.jsx(fo,{...K,controlPanelMode:V==="fitwidth"?$:"playback"}),settingsOverlay:l.jsx(fo,{...K,controlPanelMode:$}),isPinnedInSettings:ee&&V==="settings"})})})}const Dr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:zo,default:zo},Symbol.toStringTag,{value:"Module"}));export{ve as D,tr as M,_n as R,gt as a,Dr as b,Ft as l};
