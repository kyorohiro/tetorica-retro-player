const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-FPx3oQPs.js","./index-B2WpC0X_.js","./index-tofjfY6V.css","./RetroFilterPanel-CLqrzayc.js"])))=>i.map(i=>d[i]);
import{b as Ze,r as l,R as so,a as G,j as v,_ as wo,u as Ko,s as qo}from"./index-B2WpC0X_.js";const Jo=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],$o=Ze("aperture",Jo);const Qo=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],en=Ze("arrow-left-right",Qo);const tn=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],on=Ze("circle",tn);const nn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],rn=Ze("maximize-2",nn);const an=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Kt=Ze("minimize-2",an);const sn=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],ln=Ze("pin",sn);const cn=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],un=Ze("power",cn);const dn=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],hn=Ze("rotate-ccw",dn);const mn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],pn=Ze("square",mn);async function Co(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function gn(t,e){await Co("plugin:sharekit|share_file",{url:t,...e})}const Qt="tetorica-retro-player.settings",bt=1,At=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(Qt);if(!t)return null;const e=JSON.parse(t);return e.version!==bt?null:e}catch{return null}},eo=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(Qt,JSON.stringify(t))}catch{}},xt=()=>At(),fn=t=>{const e=At();eo({version:bt,audio:e?.audio,filter:t,ui:e?.ui})},vn=t=>{const e=At();eo({version:bt,audio:t,filter:e?.filter,ui:e?.ui})},bn=t=>{const e=At();eo({version:bt,audio:e?.audio,filter:e?.filter,ui:t})},An=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(Qt)}catch{}},de={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},xn={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.005,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},wn=Object.fromEntries(Object.entries(xn).map(([t,e])=>[t,{label:e.label,settings:{...de,...e.settings}}])),Cn=Object.fromEntries(Object.entries(wn).map(([t,e])=>[t,e.settings])),Sn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function yn(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n+=1){const u=n*2/255-1;o[n]=Math.tanh(u*r)}return o}function lo(t){const o=new Float32Array(256),r=t*8;for(let n=0;n<256;n++){const u=n*2/255-1;r<.001?o[n]=u:o[n]=Math.tanh(u*(1+r))/Math.tanh(1+r)}return o}function Rn(t){const o=Math.max(1,Math.floor(t.sampleRate*2.2)),r=t.createBuffer(2,o,t.sampleRate),n=Math.floor(t.sampleRate*.012);for(let u=0;u<r.numberOfChannels;u+=1){const m=r.getChannelData(u);for(let i=0;i<o;i+=1){if(i<n)continue;const p=(i-n)/(o-n),R=(1-p)**1.8,L=Math.max(0,1-p*2.5),w=Math.sin(p*160+u*.8)*L*.35;m[i]=(Math.random()*2-1+w)*R*.75}}return r}function Tn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n+=1){const u=r.getChannelData(n);for(let m=0;m<u.length;m+=1){const i=m/u.length,p=(1-i)**1.85,R=.78+.22*Math.sin(i*42+n*.9),L=Math.sin(i*130+n*.35)*.08;u[m]=(Math.random()*2-1+L)*p*R*.28}}return r}function Dn(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let u=0;u<e;u+=1){const m=Math.random()*2-1;r=(r+m*.045)/1.045,n=n*.82+m*.18;const i=r*1.35,p=(m-n)*.55,R=Math.max(-1,Math.min(1,i+p));for(let L=0;L<o.numberOfChannels;L+=1){const w=o.getChannelData(L),B=(Math.random()*2-1)*.012;w[u]=Math.max(-1,Math.min(1,R+B))}}return o}function Ln(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const m=Math.random()*2-1;n=n*.72+m*.28,o[r]+=(m-n)*.018;const i=Math.random();if(i<.0034){const p=8+Math.floor(Math.random()*42),R=.11+Math.random()*.28,L=Math.random()<.5?-1:1;for(let w=0;w<p&&r+w<e;w+=1){const B=Math.exp(-w/(2.4+Math.random()*5));o[r+w]+=L*R*B*(.7+Math.random()*.3)}r+=p+Math.floor(Math.random()*640);continue}if(i<.0038){const p=90+Math.floor(Math.random()*260),R=.055+Math.random()*.11,L=Math.random()*Math.PI*2;for(let w=0;w<p&&r+w<e;w+=1){const B=Math.exp(-w/(18+Math.random()*40)),V=Math.sin(L+w*(.22+Math.random()*.06));o[r+w]+=R*B*V}r+=p+Math.floor(Math.random()*2200);continue}r+=1}const u=t.createBuffer(2,e,t.sampleRate);for(let m=0;m<u.numberOfChannels;m+=1){const i=u.getChannelData(m);for(let p=0;p<e;p+=1){const R=(Math.random()*2-1)*.0035;i[p]=Math.max(-1,Math.min(1,o[p]+R))}}return u}function Mn(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function So({preset:t,params:e}){return{...de,...t?Cn[t]:null,...e}}class Bn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:u=!0,enableAudioWorklet:m=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=u,this.enableAudioWorklet=m}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){Sn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...de,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=So({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,u=this.nodes.lofiLowpass,m=this.nodes.lofiHighshelf,i=this.nodes.lofiDrive,p=this.nodes.bitcrusher,R=this.nodes.bassEq,L=this.nodes.midEq,w=this.nodes.trebleEq,B=this.nodes.stereoWidth,V=this.nodes.roomDryGain,A=this.nodes.roomWetGain,q=this.nodes.wowFlutterDelay,Z=this.nodes.wowLfo,ne=this.nodes.wowLfoGain,J=this.nodes.flutterLfo,z=this.nodes.flutterLfoGain,$=this.nodes.noiseGain,f=this.nodes.crackleGain,fe=this.nodes.vinylDustBedFilter,C=this.nodes.vinylDustBedGain,{settings:b,isPlaying:Q,isOutputEnabled:j}=this.runtimeState,H=b.isMuted||!j?0:b.volume;if(e&&(e.gain.value=H),o&&r&&n){const g=b.isAudioFxEnabled?b.radioToneAmount:0;o.frequency.value=20+g*430,o.Q.value=.4+g*.35,r.frequency.value=2e4-g*17400,r.Q.value=.2+g*.9,n.frequency.value=1700,n.Q.value=.8+g*1.4,n.gain.value=g*6}if(u&&m&&i){const g=b.isAudioFxEnabled?b.lofiAmount:0;u.frequency.value=16e3-g*14200,u.Q.value=.3+g*1.8,m.gain.value=-g*18;try{i.curve=yn(g*.6)}catch{}}if(p){const g=b.isAudioFxEnabled,_=16-(g?b.bitCrushAmount:0)*12,K=1+(g?b.sampleRateReductionAmount:0)*23,a=g?Math.max(b.bitCrushAmount,b.sampleRateReductionAmount):0;p.parameters.get("bitDepth")?.setValueAtTime(_,p.context.currentTime),p.parameters.get("holdFrames")?.setValueAtTime(K,p.context.currentTime),p.parameters.get("mix")?.setValueAtTime(a,p.context.currentTime)}if(R&&L&&w){const g=b.isAudioFxEnabled?15:0;R.gain.value=b.bassAmount*g,L.gain.value=b.midAmount*g,w.gain.value=b.trebleAmount*g}if(B){const g=b.isAudioFxEnabled?1+b.stereoWidthAmount:1;B.parameters.get("width")?.setValueAtTime(g,B.context.currentTime)}if(V&&A){const g=b.isAudioFxEnabled?b.smallSpeakerRoomAmount:0;V.gain.value=Math.max(.52,1-g*.42),A.gain.value=g*.95}if(q&&Z&&ne&&J&&z){const g=b.isAudioFxEnabled?b.wowFlutterAmount:0;q.delayTime.value=.006+g*.004,Z.frequency.value=.18+g*.42,ne.gain.value=g*.0023,J.frequency.value=5.2+g*6.5,z.gain.value=g*6e-4}if($&&($.gain.value=b.isNoiseEnabled&&!b.isMuted&&j&&Q?Math.min(.24,b.noiseLevel*5.5):0),f){const g=b.isNoiseEnabled&&!b.isMuted&&j&&Q;f.gain.value=g?Math.min(.24,b.vinylDustAmount*.22+b.noiseLevel*.25):0}if(fe&&C){const _=b.isNoiseEnabled&&!b.isMuted&&j&&Q?b.vinylDustAmount:0;fe.frequency.value=2100+_*2600,fe.Q.value=.35+_*.25,C.gain.value=_*.11}const ae=this.nodes.echoDelayLine,Y=this.nodes.echoFeedbackGain,re=this.nodes.echoWetGain;if(ae&&Y&&re){const g=b.isAudioFxEnabled?b.delayAmount:0;Y.gain.value=g*.5,re.gain.value=g*.55}const N=this.nodes.hallReverbWetGain;if(N){const g=b.isAudioFxEnabled?b.reverbAmount:0;N.gain.value=g*2}const S=this.nodes.chorusLfoGain1,T=this.nodes.chorusLfoGain2,D=this.nodes.chorusWetGain;if(S&&T&&D){const g=b.isAudioFxEnabled?b.chorusAmount:0;D.gain.value=g*.6,S.gain.value=g*.005,T.gain.value=g*.006}const ie=this.nodes.tapeSaturator;if(ie)try{ie.curve=lo(b.isAudioFxEnabled?b.tapeSaturationAmount:0)}catch{}const X=this.nodes.busCompressor;if(X){const g=b.isAudioFxEnabled?b.compressorAmount:0;X.threshold.value=-36*g,X.ratio.value=1+9*g}const P=this.nodes.fxOutputGain;P&&(P.gain.value=b.isAudioFxEnabled?b.fxOutputTrimAmount:1)}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const u=o.createBiquadFilter(),m=o.createBiquadFilter(),i=o.createBiquadFilter(),p=o.createBiquadFilter(),R=o.createBiquadFilter(),L=o.createWaveShaper();let w=null,B=null;const V=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&V){const Ce=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await o.audioWorklet.addModule(Ce.href),w=new V(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const me=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(me.href),B=new V(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const A=o.createBiquadFilter(),q=o.createBiquadFilter(),Z=o.createBiquadFilter(),ne=o.createGain(),J=o.createConvolver(),z=o.createGain(),$=o.createDelay(.05),f=o.createOscillator(),fe=o.createGain(),C=o.createOscillator(),b=o.createGain();u.type="highpass",m.type="lowpass",i.type="peaking",p.type="lowpass",R.type="highshelf",A.type="lowshelf",A.frequency.value=180,q.type="peaking",q.frequency.value=1200,q.Q.value=.5,Z.type="highshelf",Z.frequency.value=2800,J.buffer=Tn(o),R.frequency.value=2800,L.oversample="4x",$.delayTime.value=.006,f.type="sine",C.type="sine",f.connect(fe),fe.connect($.delayTime),C.connect(b),b.connect($.delayTime),$.connect(u),u.connect(m),m.connect(i),i.connect(p),p.connect(R),R.connect(L),w?(L.connect(w),w.connect(A)):L.connect(A),A.connect(q),q.connect(Z);const Q=o.createWaveShaper();Q.curve=lo(0),Q.oversample="4x",Z.connect(Q),B?(Q.connect(B),B.connect(ne),B.connect(J)):(Q.connect(ne),Q.connect(J)),J.connect(z),ne.connect(r),z.connect(r);const j=o.createGain();j.gain.value=1;const H=o.createDynamicsCompressor();H.knee.value=10,H.attack.value=.003,H.release.value=.12,H.threshold.value=0,H.ratio.value=1;const ae=o.createDelay(1);ae.delayTime.value=.32;const Y=o.createGain();Y.gain.value=0;const re=o.createGain();re.gain.value=0;const N=o.createConvolver();N.buffer=Rn(o);const S=o.createGain();S.gain.value=0;const T=o.createDelay(.05),D=o.createDelay(.05);T.delayTime.value=.018,D.delayTime.value=.023;const ie=o.createOscillator(),X=o.createOscillator();ie.type="sine",X.type="sine",ie.frequency.value=.8,X.frequency.value=1.3;const P=o.createGain(),g=o.createGain();P.gain.value=0,g.gain.value=0;const _=o.createGain();_.gain.value=0,r.connect(j),r.connect(ae),ae.connect(Y),Y.connect(ae),ae.connect(re),re.connect(j),r.connect(N),N.connect(S),S.connect(j),r.connect(T),r.connect(D),ie.connect(P),P.connect(T.delayTime),X.connect(g),g.connect(D.delayTime),T.connect(_),D.connect(_),_.connect(j),ie.start(),X.start();const K=o.createGain();K.gain.value=1,j.connect(H),H.connect(K),this.connectOutputToDestination&&K.connect(o.destination),n&&this.connectOutputToRecordingDestination&&K.connect(n);const a=o.createBufferSource();a.buffer=Dn(o),a.loop=!0;const c=o.createBiquadFilter();c.type="highpass",c.frequency.value=1100,c.Q.value=.25;const F=o.createBiquadFilter();F.type="lowpass",F.frequency.value=5600,F.Q.value=.18;const W=o.createBiquadFilter();W.type="peaking",W.frequency.value=2400,W.Q.value=.7,W.gain.value=-2.5;const E=o.createStereoPanner(),M=o.createGain(),U=o.createOscillator(),ce=o.createGain(),xe=o.createBufferSource(),se=o.createBiquadFilter(),le=o.createBiquadFilter(),he=o.createGain(),we=o.createGain();r.gain.value=0,M.gain.value=0,U.type="sine",U.frequency.value=.021,ce.gain.value=.08,xe.buffer=Ln(o),xe.loop=!0,se.type="highpass",se.frequency.value=1250,se.Q.value=.35,le.type="bandpass",le.frequency.value=2400,le.Q.value=.4,he.gain.value=0,we.gain.value=0,a.connect(c),c.connect(F),F.connect(W),W.connect(E),E.connect(M),M.connect(r),U.connect(ce),ce.connect(E.pan),xe.connect(se),se.connect(we),we.connect(r),xe.connect(le),le.connect(he),he.connect(r),a.start(),U.start(),xe.start(),f.start(),C.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:u,radioToneLowpass:m,radioTonePresence:i,recordingDestination:n,lofiLowpass:p,lofiHighshelf:R,lofiDrive:L,bitcrusher:w,bassEq:A,midEq:q,trebleEq:Z,stereoWidth:B,roomDryGain:ne,roomConvolver:J,roomWetGain:z,wowFlutterDelay:$,wowLfo:f,wowLfoGain:fe,flutterLfo:C,flutterLfoGain:b,noiseSource:a,noiseFilter:W,noisePanner:E,noiseGain:M,noiseLfo:U,noiseLfoGain:ce,crackleSource:xe,crackleFilter:se,vinylDustBedFilter:le,vinylDustBedGain:he,crackleGain:we,outputBus:j,echoDelayLine:ae,echoFeedbackGain:Y,echoWetGain:re,hallReverbConvolver:N,hallReverbWetGain:S,chorusDelay1:T,chorusDelay2:D,chorusLfo1:ie,chorusLfo2:X,chorusLfoGain1:P,chorusLfoGain2:g,chorusWetGain:_,tapeSaturator:Q,busCompressor:H,fxOutputGain:K})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const u=this.output;if(!u){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(Mn(e)){u.connect(e,o);return}u.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}try{this.nodes.chorusLfo1?.stop()}catch{}try{this.nodes.chorusLfo2?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function Pn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const u={settings:So(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new Bn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:u,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function ee(t){return{get current(){return t()}}}function En({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:u}){const[m]=l.useState(()=>new AudioContext),[i]=l.useState(()=>{const d=xt()?.audio;return{isMuted:d?.isMuted??de.isMuted,volume:d?.volume??de.volume,playbackRate:d?.playbackRate??de.playbackRate,isLooping:d?.isLooping??de.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??de.isAudioFxEnabled,lofiAmount:d?.lofiAmount??de.lofiAmount,radioToneAmount:d?.radioToneAmount??de.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??de.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??de.sampleRateReductionAmount,bassAmount:d?.bassAmount??de.bassAmount,midAmount:d?.midAmount??de.midAmount,trebleAmount:d?.trebleAmount??de.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??de.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??de.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??de.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??de.isNoiseEnabled,noiseLevel:d?.noiseLevel??de.noiseLevel,vinylDustAmount:d?.vinylDustAmount??de.vinylDustAmount,delayAmount:d?.delayAmount??de.delayAmount,reverbAmount:d?.reverbAmount??de.reverbAmount,chorusAmount:d?.chorusAmount??de.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??de.tapeSaturationAmount,compressorAmount:d?.compressorAmount??de.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??de.fxOutputTrimAmount}}),p=l.useRef(i.isMuted),R=l.useRef(i.volume),L=l.useRef(i.playbackRate),w=l.useRef(i.isLooping),B=l.useRef(i.isAudioFxEnabled),V=l.useRef(i.lofiAmount),A=l.useRef(i.radioToneAmount),q=l.useRef(i.bitCrushAmount),Z=l.useRef(i.sampleRateReductionAmount),ne=l.useRef(i.bassAmount),J=l.useRef(i.midAmount),z=l.useRef(i.trebleAmount),$=l.useRef(i.stereoWidthAmount),f=l.useRef(i.smallSpeakerRoomAmount),fe=l.useRef(i.wowFlutterAmount),C=l.useRef(i.isNoiseEnabled),b=l.useRef(i.noiseLevel),Q=l.useRef(i.vinylDustAmount),j=l.useRef(i.delayAmount),H=l.useRef(i.reverbAmount),ae=l.useRef(i.chorusAmount),Y=l.useRef(i.tapeSaturationAmount),re=l.useRef(i.compressorAmount),N=l.useRef(i.fxOutputTrimAmount),[S,T]=l.useState(i.isMuted),[D,ie]=l.useState(i.playbackRate),[X,P]=l.useState(i.volume),[g,_]=l.useState(i.isLooping),[K,a]=l.useState(i.isAudioFxEnabled),[c,F]=l.useState(i.lofiAmount),[W,E]=l.useState(i.radioToneAmount),[M,U]=l.useState(i.bitCrushAmount),[ce,xe]=l.useState(i.sampleRateReductionAmount),[se,le]=l.useState(i.bassAmount),[he,we]=l.useState(i.midAmount),[Ce,me]=l.useState(i.trebleAmount),[ve,Ge]=l.useState(i.stereoWidthAmount),[be,Ue]=l.useState(i.smallSpeakerRoomAmount),[De,ze]=l.useState(i.wowFlutterAmount),[ye,je]=l.useState(i.isNoiseEnabled),[Ee,qe]=l.useState(i.noiseLevel),[Re,Pe]=l.useState(i.vinylDustAmount),[pe,Se]=l.useState(i.delayAmount),[He,Me]=l.useState(i.reverbAmount),[Be,Te]=l.useState(i.chorusAmount),[Le,Ne]=l.useState(i.tapeSaturationAmount),[ke,Xe]=l.useState(i.compressorAmount),[Oe,Je]=l.useState(i.fxOutputTrimAmount),s=l.useRef(null),[h]=l.useState(()=>Pn({context:m,instanceLabel:t,params:i,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[O]=l.useState(()=>({audioContextRef:ee(()=>h.audioContext),masterGainRef:ee(()=>h.masterGain),radioToneHighpassRef:ee(()=>h.radioToneHighpass),radioToneLowpassRef:ee(()=>h.radioToneLowpass),radioTonePresenceRef:ee(()=>h.radioTonePresence),recordingDestinationRef:ee(()=>h.recordingDestination),lofiLowpassRef:ee(()=>h.lofiLowpass),lofiHighshelfRef:ee(()=>h.lofiHighshelf),lofiDriveRef:ee(()=>h.lofiDrive),bitcrusherRef:ee(()=>h.bitcrusher),bassEqRef:ee(()=>h.bassEq),midEqRef:ee(()=>h.midEq),trebleEqRef:ee(()=>h.trebleEq),stereoWidthRef:ee(()=>h.stereoWidth),roomDryGainRef:ee(()=>h.roomDryGain),roomConvolverRef:ee(()=>h.roomConvolver),roomWetGainRef:ee(()=>h.roomWetGain),wowFlutterDelayRef:ee(()=>h.wowFlutterDelay),wowLfoRef:ee(()=>h.wowLfo),wowLfoGainRef:ee(()=>h.wowLfoGain),flutterLfoRef:ee(()=>h.flutterLfo),flutterLfoGainRef:ee(()=>h.flutterLfoGain),noiseSourceRef:ee(()=>h.noiseSource),noiseFilterRef:ee(()=>h.noiseFilter),noisePannerRef:ee(()=>h.noisePanner),noiseGainRef:ee(()=>h.noiseGain),noiseLfoRef:ee(()=>h.noiseLfo),noiseLfoGainRef:ee(()=>h.noiseLfoGain),crackleSourceRef:ee(()=>h.crackleSource),crackleFilterRef:ee(()=>h.crackleFilter),vinylDustBedFilterRef:ee(()=>h.vinylDustBedFilter),vinylDustBedGainRef:ee(()=>h.vinylDustBedGain),crackleGainRef:ee(()=>h.crackleGain)})),{audioContextRef:ue,masterGainRef:I,radioToneHighpassRef:y,radioToneLowpassRef:Ae,radioTonePresenceRef:te,recordingDestinationRef:nt,lofiLowpassRef:Ct,lofiHighshelfRef:rt,lofiDriveRef:St,bitcrusherRef:yt,bassEqRef:Rt,midEqRef:it,trebleEqRef:Tt,stereoWidthRef:at,roomDryGainRef:Dt,roomConvolverRef:st,roomWetGainRef:Lt,wowFlutterDelayRef:lt,wowLfoRef:Mt,wowLfoGainRef:ct,flutterLfoRef:Bt,flutterLfoGainRef:ut,noiseSourceRef:Pt,noiseFilterRef:dt,noisePannerRef:Et,noiseGainRef:kt,noiseLfoRef:It,noiseLfoGainRef:Ft,crackleSourceRef:Gt,crackleFilterRef:Nt,vinylDustBedFilterRef:Wt,vinylDustBedGainRef:Ut,crackleGainRef:Ht}=O,$e=(d,Ve)=>h.debugAudio(d,Ve),ht=()=>h.ensureInitialized(),Ot=()=>h.ensureInitialized(),Qe=()=>h.updateAudioNodes(),Vt=d=>h.connectSourceNode(d),_t=()=>h.disposeAudioEngine(),mt=(d,Ve)=>h.setParams(d,Ve),zt=d=>h.setIsPlaying(d),jt=d=>h.setOutputEnabled(d),Zt=async d=>{const Ve=await ht();if(!Ve||!h.input){$e("connectMediaAudio:no-context",{mediaTag:d.tagName});return}s.current&&($e("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),s.current.disconnect(),s.current=null);try{const _e=Ve.createMediaElementSource(d);_e.connect(h.input),s.current=_e,d.muted=p.current,d.volume=p.current?0:R.current,$e("connectMediaAudio:connected",{audioContextState:Ve.state,mediaTag:d.tagName,previewKind:o.current}),Qe()}catch(_e){throw $e("connectMediaAudio:error",{audioContextState:Ve.state,mediaTag:d.tagName,message:_e instanceof Error?_e.message:String(_e),previewKind:o.current}),_e}},Xt=()=>{const d=s.current;!d||!h.input||(d.disconnect(),d.connect(h.input),Qe())},Yt=async()=>{s.current?.disconnect(),s.current=null,await _t()},pt=d=>{p.current=d.isMuted,R.current=d.volume,L.current=d.playbackRate,w.current=d.isLooping,B.current=d.isAudioFxEnabled,V.current=d.lofiAmount,A.current=d.radioToneAmount,q.current=d.bitCrushAmount,Z.current=d.sampleRateReductionAmount,ne.current=d.bassAmount,J.current=d.midAmount,z.current=d.trebleAmount,$.current=d.stereoWidthAmount,f.current=d.smallSpeakerRoomAmount,fe.current=d.wowFlutterAmount,C.current=d.isNoiseEnabled,b.current=d.noiseLevel,Q.current=d.vinylDustAmount,j.current=d.delayAmount,H.current=d.reverbAmount,ae.current=d.chorusAmount,Y.current=d.tapeSaturationAmount,re.current=d.compressorAmount,N.current=d.fxOutputTrimAmount,T(d.isMuted),P(d.volume),ie(d.playbackRate),_(d.isLooping),a(d.isAudioFxEnabled),F(d.lofiAmount),E(d.radioToneAmount),U(d.bitCrushAmount),xe(d.sampleRateReductionAmount),le(d.bassAmount),we(d.midAmount),me(d.trebleAmount),Ge(d.stereoWidthAmount),Ue(d.smallSpeakerRoomAmount),ze(d.wowFlutterAmount),je(d.isNoiseEnabled),qe(d.noiseLevel),Pe(d.vinylDustAmount),Se(d.delayAmount),Me(d.reverbAmount),Te(d.chorusAmount),Ne(d.tapeSaturationAmount),Xe(d.compressorAmount),Je(d.fxOutputTrimAmount),r.current&&(r.current.muted=d.isMuted,r.current.volume=d.volume,r.current.playbackRate=d.playbackRate,r.current.loop=d.isLooping),mt(d),window.requestAnimationFrame(Qe)},Ye=()=>pt({...de});return l.useEffect(()=>{p.current=S,R.current=X,L.current=D,w.current=g,B.current=K,V.current=c,A.current=W,q.current=M,Z.current=ce,ne.current=se,J.current=he,z.current=Ce,$.current=ve,f.current=be,fe.current=De,C.current=ye,b.current=Ee,Q.current=Re,j.current=pe,H.current=He,ae.current=Be,Y.current=Le,re.current=ke,N.current=Oe,mt({isMuted:S,volume:X,playbackRate:D,isLooping:g,isAudioFxEnabled:K,lofiAmount:c,radioToneAmount:W,bitCrushAmount:M,sampleRateReductionAmount:ce,bassAmount:se,midAmount:he,trebleAmount:Ce,stereoWidthAmount:ve,smallSpeakerRoomAmount:be,wowFlutterAmount:De,isNoiseEnabled:ye,noiseLevel:Ee,vinylDustAmount:Re,delayAmount:pe,reverbAmount:He,chorusAmount:Be,tapeSaturationAmount:Le,compressorAmount:ke,fxOutputTrimAmount:Oe},!0),zt(n),jt(e==="video"||e==="audio"||e==="capture"),r.current&&(r.current.muted=S,r.current.volume=S?0:X,r.current.playbackRate=D,r.current.loop=g)},[S,X,K,c,W,M,ce,se,he,Ce,ve,be,De,ye,Ee,Re,pe,He,Be,Le,ke,Oe,n,D,g,e]),l.useEffect(()=>{const d=setTimeout(()=>{vn({isMuted:S,volume:X,playbackRate:D,isLooping:g,isAudioFxEnabled:K,lofiAmount:c,radioToneAmount:W,bitCrushAmount:M,sampleRateReductionAmount:ce,bassAmount:se,midAmount:he,trebleAmount:Ce,stereoWidthAmount:ve,smallSpeakerRoomAmount:be,wowFlutterAmount:De,isNoiseEnabled:ye,noiseLevel:Ee,vinylDustAmount:Re,delayAmount:pe,reverbAmount:He,chorusAmount:Be,tapeSaturationAmount:Le,compressorAmount:ke,fxOutputTrimAmount:Oe})},300);return()=>clearTimeout(d)},[S,X,D,g,K,c,W,M,ce,se,he,Ce,ve,be,De,ye,Ee,Re,pe,He,Be,Le,ke,Oe]),{audioContextRef:ue,mediaSourceRef:s,masterGainRef:I,radioToneHighpassRef:y,radioToneLowpassRef:Ae,radioTonePresenceRef:te,recordingDestinationRef:nt,lofiLowpassRef:Ct,lofiHighshelfRef:rt,lofiDriveRef:St,bitcrusherRef:yt,bassEqRef:Rt,midEqRef:it,trebleEqRef:Tt,stereoWidthRef:at,roomDryGainRef:Dt,roomConvolverRef:st,roomWetGainRef:Lt,wowFlutterDelayRef:lt,wowLfoRef:Mt,wowLfoGainRef:ct,flutterLfoRef:Bt,flutterLfoGainRef:ut,noiseSourceRef:Pt,noiseFilterRef:dt,noisePannerRef:Et,noiseGainRef:kt,noiseLfoRef:It,noiseLfoGainRef:Ft,crackleSourceRef:Gt,crackleFilterRef:Nt,vinylDustBedFilterRef:Wt,vinylDustBedGainRef:Ut,crackleGainRef:Ht,isMutedRef:p,volumeRef:R,playbackRateRef:L,isLoopingRef:w,isAudioFxEnabledRef:B,lofiAmountRef:V,radioToneAmountRef:A,bitCrushAmountRef:q,sampleRateReductionAmountRef:Z,bassAmountRef:ne,midAmountRef:J,trebleAmountRef:z,stereoWidthAmountRef:$,smallSpeakerRoomAmountRef:f,wowFlutterAmountRef:fe,isNoiseEnabledRef:C,noiseLevelRef:b,vinylDustAmountRef:Q,delayAmountRef:j,reverbAmountRef:H,chorusAmountRef:ae,tapeSaturationAmountRef:Y,compressorAmountRef:re,fxOutputTrimAmountRef:N,isMuted:S,setIsMuted:T,playbackRate:D,setPlaybackRate:ie,volume:X,setVolume:P,isLooping:g,setIsLooping:_,isAudioFxEnabled:K,setIsAudioFxEnabled:a,lofiAmount:c,setLofiAmount:F,radioToneAmount:W,setRadioToneAmount:E,bitCrushAmount:M,setBitCrushAmount:U,sampleRateReductionAmount:ce,setSampleRateReductionAmount:xe,bassAmount:se,setBassAmount:le,midAmount:he,setMidAmount:we,trebleAmount:Ce,setTrebleAmount:me,stereoWidthAmount:ve,setStereoWidthAmount:Ge,smallSpeakerRoomAmount:be,setSmallSpeakerRoomAmount:Ue,wowFlutterAmount:De,setWowFlutterAmount:ze,isNoiseEnabled:ye,setIsNoiseEnabled:je,noiseLevel:Ee,setNoiseLevel:qe,vinylDustAmount:Re,setVinylDustAmount:Pe,delayAmount:pe,setDelayAmount:Se,reverbAmount:He,setReverbAmount:Me,chorusAmount:Be,setChorusAmount:Te,tapeSaturationAmount:Le,setTapeSaturationAmount:Ne,compressorAmount:ke,setCompressorAmount:Xe,fxOutputTrimAmount:Oe,setFxOutputTrimAmount:Je,debugAudio:$e,ensureAudioContext:Ot,ensureInitialized:ht,updateAudioNodes:Qe,connectSourceNode:Vt,connectMediaAudio:Zt,reconnectCurrentMediaAudio:Xt,applyAudioSettings:pt,resetAudioSettings:Ye,disposeAudioEngine:Yt}}const kn={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},ot={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},In=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,Fn=`#version 300 es
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
`,Gn=`#version 300 es
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
`,Nn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),uo=640,qt=()=>typeof performance<"u"?performance.now():Date.now(),Jt=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,ho=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Wn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,mo=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),vt=t=>({width:Jt(t)?t.videoWidth:ho(t)?t.naturalWidth:t.width,height:Jt(t)?t.videoHeight:ho(t)?t.naturalHeight:t.height}),Un=(t,e,o)=>Jt(t)&&(e>uo||o>uo),wt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Hn=t=>wt(t)&&t.phosphorDotInternalScale?2:1,On=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},Vn=(t,e,o,r,n,u)=>{if(!wt(o)||n===void 0||u===void 0||n<=0||u<=0)return{width:t,height:e};const m=Math.max(1.1,2.15+o.bulbRadius*1.15),i=Math.max(1,m/Math.max(r,1)),p=Math.max(1,Math.floor(n/i)),R=Math.max(1,Math.floor(u/i)),L=Math.min(1,p/Math.max(t,1),R/Math.max(e,1));return{width:Math.max(1,Math.round(t*L)),height:Math.max(1,Math.round(e*L))}},$t=(t,e,o,r,n)=>{const u=Hn(t),m=Math.max(t.targetWidth,1),i=Math.max(t.targetHeight,1),p=t.matchTargetAspect?On(m,i,e,o):{width:m,height:i},R=p.width*u,L=p.height*u,w=Vn(R,L,t,u,r,n);return{width:w.width,height:w.height,sampleWidth:Math.max(1,Math.round(R)),sampleHeight:Math.max(1,Math.round(L)),internalScale:u,isPhosphorDotMode:wt(t)}};function po(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function go(t,e,o){const r=po(t,t.VERTEX_SHADER,e),n=po(t,t.FRAGMENT_SHADER,o),u=t.createProgram();if(!u)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(u,r),t.attachShader(u,n),t.bindAttribLocation(u,0,"aPosition"),t.linkProgram(u),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(u,t.LINK_STATUS)){const m=t.getProgramInfoLog(u)||"Unknown program link error.";throw t.deleteProgram(u),new Error(m)}return u}class _n{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=qt();constructor(e){this.gl=e,this.filterProgram=go(e,co,Fn),this.passthroughProgram=go(e,co,Gn);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,Nn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=qt()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const u=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),mo(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const m=vt(o);this.applyFilterUniforms(r,m.width,m.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(mo(e)||!o.isFilterEnabled)return e;const r=vt(e);if(r.width<=0||r.height<=0||Un(e,r.width,r.height))return e;const{width:n,height:u,sampleWidth:m,sampleHeight:i,isPhosphorDotMode:p}=$t(o,r.width,r.height),R=Math.max(1,Math.round(p?m:n)),L=Math.max(1,Math.round(p?i:u)),w=this.ensureUploadContext();return!w||!this.uploadCanvas?e:(this.uploadCanvas.width!==R&&(this.uploadCanvas.width=R),this.uploadCanvas.height!==L&&(this.uploadCanvas.height=L),w.imageSmoothingEnabled=!0,w.imageSmoothingQuality="high",w.fillStyle="#000",w.fillRect(0,0,R,L),w.drawImage(e,0,0,R,L),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,u=Wn(n.canvas)?n.canvas:null,m=Math.max(u?.clientWidth??n.drawingBufferWidth,1),i=Math.max(u?.clientHeight??n.drawingBufferHeight,1),{width:p,height:R,sampleWidth:L,sampleHeight:w,isPhosphorDotMode:B}=$t(e,o,r,m,i);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,p,R),n.uniform2f(this.uniformLocations.uSampleTargetSize,L,w),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,In(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*R/(Math.max(n.drawingBufferHeight,1)*p)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,B?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...kn[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(qt()-this.startedAt)/1e3)}}function zn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:u,debugVideo:m}){const i=l.useRef(null),p=l.useRef(null),R=l.useRef(null),L=l.useRef(null),w=l.useRef(null),B=l.useRef(null),V=l.useRef(null),A=l.useRef(null),q=l.useRef(()=>{}),Z=l.useRef(t),ne=l.useRef(r),J=l.useRef(!1),z=l.useRef(null),$=l.useRef(null),f=l.useRef(null),[fe,C]=l.useState(!1),[b,Q]=l.useState(null);Z.current=t,ne.current=r;const j=l.useCallback(a=>{Q(c=>{const F=typeof a=="function"?a(c):a;return f.current=F,F})},[]),H=l.useCallback(()=>{const a=p.current,c=w.current;a&&(a.pipeline.setOutputEnabled(ne.current),a.pipeline.setSource(c),a.pipeline.setFilterState(Z.current),a.pipeline.render())},[]);l.useLayoutEffect(()=>{q.current=H},[H]);const ae=l.useCallback(()=>{J.current=!1,A.current!==null&&(window.cancelAnimationFrame(A.current),A.current=null)},[]),Y=l.useCallback(()=>{if(J.current)return;J.current=!0;const a=()=>{if(!J.current)return;if(q.current(),!(u.current==="video"||u.current==="capture"||u.current==="image"||n.current)){A.current=null,J.current=!1;return}A.current=window.requestAnimationFrame(a)};A.current=window.requestAnimationFrame(a)},[n,u]),re=l.useCallback(()=>{H()},[H]),N=l.useCallback(()=>{H()},[H]),S=l.useCallback(()=>{H()},[H]),T=l.useCallback(()=>(p.current&&p.current.pipeline.resetAnimationClock(),B.current={},H(),B.current),[H]),D=l.useCallback((a,c,F)=>{if(!a)return;const{width:W,height:E}=vt(F);if(W<=0||E<=0)return;const M=i.current,U=M?.clientWidth??a.canvas.width,ce=M?.clientHeight??a.canvas.height,se=e==="width"?U/W:Math.min(U/W,ce/E),le=W*se,he=E*se,we=(U-le)/2,Ce=(ce-he)/2,me={width:le,height:he,x:we,y:Ce},ve=f.current;return ve&&ve.width===me.width&&ve.height===me.height&&ve.x===me.x&&ve.y===me.y?ve:(f.current=me,j(me),me)},[e,j]),ie=l.useCallback(()=>{w.current&&D(p.current,null,w.current)},[D]),X=l.useCallback(()=>{H()},[H]),P=l.useCallback(()=>{const a=p.current,c=i.current;if(!a||!c)return;ie();const F=f.current??{x:0,y:0,width:c.clientWidth,height:c.clientHeight},W=Math.max(1,Math.round(F.width)),E=Math.max(1,Math.round(F.height)),M=Z.current,U=w.current?vt(w.current):null,{width:ce,height:xe}=$t(M,U?.width,U?.height,W,E),se=Math.max(1,Math.round(W*Math.max(1,o))),le=Math.max(1,Math.round(E*Math.max(1,o))),he=Math.max(1,Math.round(Math.max(1,ce)*Math.max(1,o))),we=Math.max(1,Math.round(Math.max(1,xe)*Math.max(1,o))),Ce=wt(M),me=M.isFilterEnabled&&Ce?Math.max(se,he):se,ve=M.isFilterEnabled&&Ce?Math.max(le,we):le;a.canvas.width!==me&&(a.canvas.width=me),a.canvas.height!==ve&&(a.canvas.height=ve),a.canvas.style.position="absolute",a.canvas.style.left=`${Math.round(F.x)}px`,a.canvas.style.top=`${Math.round(F.y)}px`,a.canvas.style.width=`${W}px`,a.canvas.style.height=`${E}px`,a.canvas.style.imageRendering="pixelated",H()},[ie,H,o]),g=l.useCallback(()=>{z.current!==null&&(window.cancelAnimationFrame(z.current),z.current=null),$.current!==null&&(window.clearTimeout($.current),$.current=null),z.current=window.requestAnimationFrame(()=>{z.current=null,P()}),$.current=window.setTimeout(()=>{$.current=null,P()},120)},[P]),_=l.useCallback(async()=>{if(!p.current){if(V.current){await V.current;return}V.current=(async()=>{const a=i.current;if(!a||p.current)return;const c=typeof performance<"u"?performance.now():Date.now();m("startup:initPixi:start",{hostConnected:a.isConnected,hostWidth:a.clientWidth??null,hostHeight:a.clientHeight??null,resolution:o});const F=document.createElement("canvas");F.style.display="block",F.style.width="100%",F.style.height="100%",F.style.imageRendering="pixelated",F.style.background="#020617";const W=F.getContext("webgl2");if(!W)throw new Error("WebGL2 is not available in this app view.");m("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-c)*10)/10});const E={canvas:F,pipeline:new _n(W),ticker:{start:Y,stop:ae}},M=i.current;if(!M||M!==a||!M.isConnected)return;M.style.position="relative",M.appendChild(F),p.current=E,B.current={},C(!0),m("initWebGL:ready",{hostWidth:M.clientWidth??null,hostHeight:M.clientHeight??null,resolution:o}),m("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-c)*10)/10}),P();const U=u.current==="video"||u.current==="capture"||u.current==="image"||n.current;r&&U&&Y(),m("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-c)*10)/10,shouldAnimateOnInit:U})})();try{await V.current}finally{V.current=null}}},[m,r,P,o,Y,ae]),K=l.useCallback(()=>{V.current=null,ae(),z.current!==null&&(window.cancelAnimationFrame(z.current),z.current=null),$.current!==null&&(window.clearTimeout($.current),$.current=null);const a=p.current;a&&(a.pipeline.dispose(),a.canvas.remove()),p.current=null,B.current=null,j(null),C(!1)},[ae,j]);return l.useEffect(()=>{const a=i.current;if(!a)return;if(typeof ResizeObserver<"u"){const F=new ResizeObserver(()=>{g()});return F.observe(a),()=>{F.disconnect()}}const c=()=>{g()};return window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c)}},[g]),{canvasHostRef:i,appRef:p,spriteRef:R,textureRef:L,previewElementRef:w,filterRef:B,isRendererReady:fe,viewportRect:b,setViewportRect:j,applyFilterState:re,createVideoTexture:a=>null,destroyPixi:K,fitCurrentSprite:ie,fitSprite:D,initPixi:_,refreshLayout:P,resetFilterInstance:T,safeRender:X,scheduleRefreshLayout:g,syncSpriteFilter:N,syncTexturePresentation:S}}const jn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent);function Zn({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:u,streamRef:m,streamOwnedRef:i,previewRequestIdRef:p,isPlayingRef:R,previewKindRef:L,audioContextRef:w,mediaSourceRef:B,masterGainRef:V,noiseGainRef:A,isMutedRef:q,volumeRef:Z,playbackRateRef:ne,isLoopingRef:J,isAudioFxEnabled:z,lofiAmount:$,bitCrushAmount:f,sampleRateReductionAmount:fe,bassAmount:C,midAmount:b,trebleAmount:Q,stereoWidthAmount:j,smallSpeakerRoomAmount:H,isMuted:ae,volume:Y,previewKind:re,setPreviewName:N,setPreviewError:S,setNeedsUserPlay:T,setIsPlaying:D,setCurrentTime:ie,setDuration:X,setPlaybackRate:P,setIsLooping:g,setSourceDimensions:_,setViewportRect:K,setPreviewKindState:a,setIsPoweredOn:c,beginLoading:F,finishLoading:W,ensureAudioContext:E,updateAudioNodes:M,connectMediaAudio:U,fitSprite:ce,refreshLayout:xe,scheduleRefreshLayout:se,safeRender:le,resetFilterInstance:he,initPixi:we,resetPerfAccumulators:Ce,debugVideo:me,debugAudio:ve}){const Ge=async()=>{jn()&&await new Promise(s=>{window.setTimeout(s,220)})},be=()=>{const s=w.current?.currentTime;if(A.current)if(typeof s=="number"){const h=A.current.gain;h.cancelScheduledValues(s),h.setValueAtTime(h.value,s),h.linearRampToValueAtTime(0,s+.03)}else A.current.gain.value=0;if(V.current)if(typeof s=="number"){const h=V.current.gain;h.cancelScheduledValues(s),h.setValueAtTime(h.value,s),h.linearRampToValueAtTime(0,s+.03)}else V.current.gain.value=0},Ue=()=>{A.current&&(A.current.gain.value=0)},De=s=>s instanceof DOMException&&(s.name==="NotAllowedError"||s.name==="AbortError")?!0:s instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(s.message):!1,ze=s=>De(s)?(W(),S(""),T(!0),pe(),le(),!0):!1,ye=(s,h,O=!0)=>{be(),s.muted=!0,s.volume=0,s.pause(),s.srcObject instanceof MediaStream&&(O&&s.srcObject.getTracks().forEach(ue=>ue.stop()),s.srcObject=null),s.src="",s.load(),h?.startsWith("blob:")&&URL.revokeObjectURL(h)},je=s=>new Promise((h,O)=>{const ue=te=>te?te.code===MediaError.MEDIA_ERR_ABORTED?"aborted":te.code===MediaError.MEDIA_ERR_NETWORK?"network":te.code===MediaError.MEDIA_ERR_DECODE?"decode":te.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${te.code}`:"unknown",I=()=>{s.removeEventListener("loadeddata",y),s.removeEventListener("canplay",y),s.removeEventListener("error",Ae)},y=()=>{I(),h()},Ae=()=>{I(),O(new Error(`動画の読み込みに失敗しました。 src=${s.currentSrc||s.src||"(empty)"} reason=${ue(s.error)}`))};if(s.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){h();return}s.addEventListener("loadeddata",y,{once:!0}),s.addEventListener("canplay",y,{once:!0}),s.addEventListener("error",Ae,{once:!0}),s.load()}),Ee=s=>new Promise((h,O)=>{const ue=te=>te?te.code===MediaError.MEDIA_ERR_ABORTED?"aborted":te.code===MediaError.MEDIA_ERR_NETWORK?"network":te.code===MediaError.MEDIA_ERR_DECODE?"decode":te.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${te.code}`:"unknown",I=()=>{s.removeEventListener("loadedmetadata",y),s.removeEventListener("canplay",y),s.removeEventListener("error",Ae)},y=()=>{I(),h()},Ae=()=>{I(),O(new Error(`音声の読み込みに失敗しました。 src=${s.currentSrc||s.src||"(empty)"} reason=${ue(s.error)}`))};if(s.readyState>=HTMLMediaElement.HAVE_METADATA){h();return}s.addEventListener("loadedmetadata",y,{once:!0}),s.addEventListener("canplay",y,{once:!0}),s.addEventListener("error",Ae,{once:!0}),s.load()}),qe=s=>new Promise((h,O)=>{const ue=()=>{s.removeEventListener("load",I),s.removeEventListener("error",y)},I=()=>{ue(),h()},y=()=>{ue(),O(new Error("画像の読み込みに失敗しました。"))};if(s.complete&&s.naturalWidth>0&&s.naturalHeight>0){h();return}s.addEventListener("load",I,{once:!0}),s.addEventListener("error",y,{once:!0})}),Re=s=>{s.addEventListener("play",pe),s.addEventListener("pause",pe),s.addEventListener("pause",be),s.addEventListener("abort",be),s.addEventListener("emptied",be),s.addEventListener("loadstart",be),s.addEventListener("seeking",be),s.addEventListener("stalled",be),s.addEventListener("suspend",be),s.addEventListener("waiting",be),s.addEventListener("volumechange",pe),s.addEventListener("timeupdate",pe),s.addEventListener("durationchange",pe),s.addEventListener("seeked",pe),s.addEventListener("ended",pe),s.addEventListener("ratechange",pe),s instanceof HTMLVideoElement&&s.addEventListener("resize",()=>{const h=s.videoWidth,O=s.videoHeight;h>0&&O>0&&(_({width:h,height:O}),se())})},Pe=s=>{s.loop=J.current,s.muted=q.current,s.volume=q.current?0:Z.current,s.playbackRate=ne.current,s.autoplay=!1,s.preload="auto",s.crossOrigin="anonymous",s instanceof HTMLVideoElement&&(s.playsInline=!0)},pe=()=>{if(!n.current){me("syncVideoState:no-media",{previewKind:L.current,hasPreviewElement:!!r.current}),R.current=!1,D(!1),ie(0),X(0),M(),le();return}R.current=!n.current.paused,D(!n.current.paused),n.current.paused||W(),ie(n.current.currentTime),X(n.current.duration||0),P(n.current.playbackRate||1),g(n.current.loop),M(),le()},Se=()=>{me("cleanupPreview:start",{previewKind:L.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),be(),p.current+=1,W();const s=n.current,h=m.current,O=i.current;e.current=null,o.current=null,n.current=null,r.current=null,m.current=null,i.current=!1,B.current?.disconnect(),B.current=null,T(!1),R.current=!1,D(!1),ie(0),X(0),a(null),_(null),K(null),u.current?.startsWith("blob:")&&URL.revokeObjectURL(u.current),u.current=null,s?ye(s,void 0,O):O&&h?.getTracks().forEach(ue=>ue.stop()),le()},He=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),be(),Se(),w.current?.state==="running"&&w.current.suspend()},Me=()=>{c(!0),t.current?.ticker.start();try{Ce?.()}catch{}},Be=async()=>{if(n.current)try{await E(),n.current.muted=q.current,n.current.volume=q.current?0:Z.current,await n.current.play(),R.current=!0,D(!0),S(""),T(!1),ve("playVideoWithAudio",{audioContextState:w.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:z,lofiAmount:$,bitCrushAmount:f,sampleRateReductionAmount:fe,bassAmount:C,midAmount:b,trebleAmount:Q,stereoWidthAmount:j,smallSpeakerRoomAmount:H,isMuted:ae,volume:Y}),M(),pe(),le(),se(),window.requestAnimationFrame(M)}catch(s){if(W(),De(s)){T(!0),S("");return}T(!1),S(s instanceof Error?s.message:"音声付き再生を開始できませんでした。")}},Te=async()=>{if(await we(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Le=async(s,h)=>{const O=await Te();r.current=s,ce(O,null,s),a(h),_(s instanceof HTMLVideoElement?{width:s.videoWidth,height:s.videoHeight}:{width:s.naturalWidth,height:s.naturalHeight}),le(),xe(),se(),t.current?.ticker.start()},Ne=async s=>{const h=s.type.startsWith("video/"),O=s.type.startsWith("audio/"),ue=s.type.startsWith("image/");if(!h&&!O&&!ue){S("動画、音声、または画像ファイルを選んでください。");return}Me(),Se(),he();const I=p.current;S(""),N(s.name),F(h?"Loading video preview...":O?"Loading audio preview...":"Loading image preview...");let y=null;try{if(await Te(),y=URL.createObjectURL(s),u.current=y,h||O){const te=h?document.createElement("video"):document.createElement("audio");if(te.src=y,Pe(te),Re(te),te instanceof HTMLVideoElement?await je(te):await Ee(te),I!==p.current){ye(te,y);return}n.current=te,te instanceof HTMLVideoElement?await Le(te,"video"):(r.current=null,a("audio"),_(null),K(null),le()),await U(te),pe(),await Ge(),await Be(),I===p.current&&W();return}const Ae=new Image;if(Ae.src=y,Ae.crossOrigin="anonymous",await qe(Ae),I!==p.current){y.startsWith("blob:")&&URL.revokeObjectURL(y);return}n.current=null,Ue(),M(),await Le(Ae,"image"),pe(),I===p.current&&W()}catch(Ae){if(I!==p.current){y?.startsWith("blob:")&&URL.revokeObjectURL(y);return}if(De(Ae)){ze(Ae);return}Se(),S(Ae instanceof Error?Ae.message:"動画プレビューに失敗しました。"),T(!1)}},ke=async()=>{if(Me(),!navigator.mediaDevices?.getDisplayMedia){S("このブラウザでは画面キャプチャーに対応していません。");return}Se();const s=p.current;S(""),N("Display Capture"),F("Preparing display capture...");try{await Te();const h=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(s!==p.current){h.getTracks().forEach(ue=>ue.stop());return}const O=document.createElement("video");O.srcObject=h,Pe(O),Re(O),h.getVideoTracks()[0]?.addEventListener("ended",()=>{Xe()}),await je(O),m.current=h,i.current=!0,n.current=O,await Le(O,"capture"),await U(O),T(!1),await Ge(),await Be(),s===p.current&&W()}catch(h){if(s!==p.current||ze(h))return;Se(),S(h instanceof Error?h.message:"画面キャプチャーを開始できませんでした。")}},Xe=()=>{re==="capture"&&(Se(),N(""),S(""))};return{cleanupPreview:Se,cleanupForPageLeave:He,playVideoWithAudio:Be,previewFile:Ne,previewStream:async(s,h="video",O="Media Stream")=>{let ue=0;try{if(Me(),Se(),he(),ue=p.current,S(""),N(O),F(h==="video"?"Loading stream preview...":"Loading stream audio..."),await Te(),h==="video"){const I=document.createElement("video");if(I.srcObject=s,Pe(I),Re(I),await je(I),ue!==p.current){ye(I,void 0,!1);return}m.current=s,i.current=!1,n.current=I,await Le(I,"capture"),await U(I)}else{const I=document.createElement("audio");if(I.srcObject=s,Pe(I),Re(I),await Ee(I),ue!==p.current){ye(I,void 0,!1);return}m.current=s,i.current=!1,n.current=I,r.current=null,a("audio"),_(null),K(null),le(),await U(I),pe()}if(ue!==p.current)return;await Ge(),await Be(),ue===p.current&&W()}catch(I){if(ue!==p.current||ze(I))return;Se(),S(I instanceof Error?I.message:String(I))}},previewUrl:async(s,h="video")=>{let O=0;const ue=typeof performance<"u"?performance.now():Date.now(),I=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-ue)*10)/10;try{if(me("startup:previewUrl:start",{url:s,kind:h}),Me(),Se(),he(),O=p.current,S(""),N(s),F(h==="video"?"Loading video preview...":h==="image"?"Loading image preview...":"Loading audio preview..."),await Te(),me("startup:previewUrl:renderer-ready",{kind:h,elapsedMs:I()}),h==="video"){const y=document.createElement("video");if(y.src=s,Pe(y),Re(y),await je(y),me("startup:previewUrl:video-ready",{elapsedMs:I(),readyState:y.readyState,videoWidth:y.videoWidth,videoHeight:y.videoHeight}),O!==p.current){ye(y,s);return}n.current=y,await Le(y,"video"),await U(y),pe()}else if(h==="image"){const y=new Image;if(y.src=s,y.crossOrigin="anonymous",await qe(y),me("startup:previewUrl:image-ready",{elapsedMs:I(),naturalWidth:y.naturalWidth,naturalHeight:y.naturalHeight}),O!==p.current)return;n.current=null,Ue(),M(),await Le(y,"image"),pe()}else{const y=document.createElement("audio");if(y.src=s,Pe(y),Re(y),await Ee(y),me("startup:previewUrl:audio-ready",{elapsedMs:I(),readyState:y.readyState,duration:y.duration}),O!==p.current){ye(y,s);return}r.current=null,a("audio"),_(null),K(null),n.current=y,le(),await U(y),pe()}if(O!==p.current)return;(h==="video"||h==="audio")&&(await Ge(),await Be()),O===p.current&&(W(),me("startup:previewUrl:done",{kind:h,elapsedMs:I()}))}catch(y){if(me("startup:previewUrl:error",{kind:h,elapsedMs:I(),error:y instanceof Error?y.message:String(y)}),O!==p.current||ze(y))return;Se(),S(y instanceof Error?y.message:String(y))}},startDisplayCapture:ke,stopDisplayCapture:Xe,syncVideoState:pe,releaseDetachedMedia:ye,ensurePixiReady:Te}}let Xn=0;const fo=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),vo=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Yn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function Kn(t,e,o=1){const r=l.useRef(`player-${Xn+=1}`),n=l.useRef(null),u=l.useRef(null),m=l.useRef(!1),i=l.useRef(null),p=l.useRef(null),R=l.useRef([]),L=l.useRef(null),w=l.useRef(null),B=l.useRef(null),V=l.useRef(null),A=l.useRef(null),q=l.useRef(0),Z=l.useRef(!1),ne=l.useRef(null),J=l.useRef(!1),[z,$]=l.useState(""),[f,fe]=l.useState(""),[C,b]=l.useState(!0),[Q,j]=l.useState(""),[H,ae]=l.useState(!1),[Y,re]=l.useState(!1),[N,S]=l.useState(!1),[T,D]=l.useState(0),[ie,X]=l.useState(0),[P,g]=l.useState(null),[_,K]=l.useState(null),[a,c]=l.useState(!1),[F,W]=l.useState(null),E=(x,k)=>{if(!Yn())return;const oe=k?` ${JSON.stringify(k)}`:"";console.log(`[retro-player video][${r.current}] ${x}${oe}`)},M=zn({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:C,isPlayingRef:Z,previewKindRef:ne,debugVideo:E}),{canvasHostRef:U,appRef:ce,spriteRef:xe,textureRef:se,previewElementRef:le,filterRef:he,isRendererReady:we,viewportRect:Ce,setViewportRect:me,applyFilterState:ve,destroyPixi:Ge,fitSprite:be,initPixi:Ue,refreshLayout:De,resetFilterInstance:ze,safeRender:ye,scheduleRefreshLayout:je,syncSpriteFilter:Ee,syncTexturePresentation:qe}=M,Re=l.useRef(Ue),Pe=l.useRef(Ge),pe=l.useRef(()=>{}),Se=l.useRef(()=>{}),He=En({instanceLabel:r.current,previewKind:P,previewKindRef:ne,mediaRef:i,isPlaying:N,isPlayingRef:Z}),{audioContextRef:Me,mediaSourceRef:Be,masterGainRef:Te,recordingDestinationRef:Le,noiseGainRef:Ne,isMutedRef:ke,volumeRef:Xe,playbackRateRef:Oe,isLoopingRef:Je,isMuted:s,setIsMuted:h,playbackRate:O,setPlaybackRate:ue,volume:I,setVolume:y,isLooping:Ae,setIsLooping:te,isAudioFxEnabled:nt,setIsAudioFxEnabled:Ct,lofiAmount:rt,setLofiAmount:St,radioToneAmount:yt,setRadioToneAmount:Rt,bitCrushAmount:it,setBitCrushAmount:Tt,sampleRateReductionAmount:at,setSampleRateReductionAmount:Dt,bassAmount:st,setBassAmount:Lt,midAmount:lt,setMidAmount:Mt,trebleAmount:ct,setTrebleAmount:Bt,stereoWidthAmount:ut,setStereoWidthAmount:Pt,smallSpeakerRoomAmount:dt,setSmallSpeakerRoomAmount:Et,wowFlutterAmount:kt,setWowFlutterAmount:It,isNoiseEnabled:Ft,setIsNoiseEnabled:Gt,noiseLevel:Nt,setNoiseLevel:Wt,vinylDustAmount:Ut,setVinylDustAmount:Ht,delayAmount:$e,setDelayAmount:ht,reverbAmount:Ot,setReverbAmount:Qe,chorusAmount:Vt,setChorusAmount:_t,tapeSaturationAmount:mt,setTapeSaturationAmount:zt,compressorAmount:jt,setCompressorAmount:Zt,fxOutputTrimAmount:Xt,setFxOutputTrimAmount:Yt,debugAudio:pt,ensureAudioContext:Ye,updateAudioNodes:d,connectMediaAudio:Ve,reconnectCurrentMediaAudio:_e,applyAudioSettings:yo,resetAudioSettings:Ro,disposeAudioEngine:to}=He;l.useEffect(()=>{Re.current=Ue,Pe.current=Ge},[Ue,Ge]);const To=x=>{ne.current=x,g(x)},Do=x=>{j(x),ae(!0)},et=()=>{ae(!1),j("")},oo=()=>{b(!0),ce.current?.ticker.start()},Lo=()=>{i.current&&i.current.pause(),Ne.current&&(Ne.current.gain.value=0),Te.current&&(Te.current.gain.value=0),et(),re(!1),b(!1),ce.current?.ticker.stop(),Ke()},Mo=Zn({filterState:t,appRef:ce,spriteRef:xe,textureRef:se,previewElementRef:le,filterRef:he,mediaRef:i,objectUrlRef:n,streamRef:u,streamOwnedRef:m,previewRequestIdRef:q,isPlayingRef:Z,previewKindRef:ne,audioContextRef:Me,mediaSourceRef:Be,masterGainRef:Te,noiseGainRef:Ne,isMutedRef:ke,volumeRef:Xe,playbackRateRef:Oe,isLoopingRef:Je,isAudioFxEnabled:nt,lofiAmount:rt,bitCrushAmount:it,sampleRateReductionAmount:at,bassAmount:st,midAmount:lt,trebleAmount:ct,stereoWidthAmount:ut,smallSpeakerRoomAmount:dt,isMuted:s,volume:I,previewKind:P,setPreviewName:$,setPreviewError:fe,setNeedsUserPlay:re,setIsPlaying:S,setCurrentTime:D,setDuration:X,setPlaybackRate:ue,setIsLooping:te,setSourceDimensions:K,setViewportRect:me,setPreviewKindState:To,setIsPoweredOn:b,beginLoading:Do,finishLoading:et,ensureAudioContext:Ye,updateAudioNodes:d,connectMediaAudio:Ve,fitSprite:be,refreshLayout:De,scheduleRefreshLayout:je,safeRender:ye,resetFilterInstance:ze,initPixi:Ue,debugVideo:E,debugAudio:pt}),{cleanupPreview:no,cleanupForPageLeave:Bo,playVideoWithAudio:ro,previewFile:Po,previewStream:Eo,previewUrl:ko,startDisplayCapture:Io,stopDisplayCapture:Fo,syncVideoState:Ke}=Mo;l.useEffect(()=>{pe.current=no},[no]),l.useEffect(()=>{Se.current=to},[to]);const io=async()=>{if(i.current){if(i.current.paused){C||oo(),await ro(),Ke();return}i.current.pause(),Ke()}},Go=()=>{i.current&&h(x=>{const k=!x;return ke.current=k,window.requestAnimationFrame(d),k})},tt=x=>{i.current&&(i.current.currentTime=x,D(x))},No=x=>{if(!i.current)return;const k=1/30,oe=Math.max(0,Math.min(i.current.currentTime+k*x,i.current.duration||i.current.currentTime+k));i.current.pause(),i.current.currentTime=oe,Ke()},Wo=x=>{i.current&&(i.current.playbackRate=x,Oe.current=x,ue(x))},Uo=x=>{i.current&&(Xe.current=x,ke.current=x===0,y(x),h(x===0),window.requestAnimationFrame(d))},Ho=()=>{i.current&&(i.current.loop=!i.current.loop,Je.current=i.current.loop,te(i.current.loop))},Oo=x=>{Je.current=x,te(x),i.current&&(i.current.loop=x)},gt=()=>{if(!w.current||typeof window>"u"){B.current=null,V.current=null;return}window.URL.revokeObjectURL(w.current),w.current=null,B.current=null,V.current=null},Vo=(x,k)=>{if(typeof document>"u")return;const oe=document.createElement("a");oe.href=x,oe.download=k,oe.rel="noopener",oe.style.display="none",document.body.appendChild(oe),oe.click(),window.setTimeout(()=>{oe.remove()},0)},_o=(x,k)=>{if(typeof window>"u"||x.length===0)return null;gt();const oe=new Blob(x,{type:k||"video/webm"}),We=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Fe=window.URL.createObjectURL(oe);return w.current=Fe,B.current=oe,V.current=We,W(We),We},zo=()=>{const x=w.current,k=V.current;!x||!k||typeof window>"u"||(Vo(x,k),window.setTimeout(()=>{gt()},1e3),W(null))},jo=async()=>{const x=B.current,k=V.current;if(!x||!k||typeof window>"u")return!1;if(fo()){const We=new Uint8Array(await x.arrayBuffer()),Fe=await Co("persist_recording_for_share",{data:Array.from(We),filename:k});return await gn(Fe,{mimeType:x.type||"video/webm",title:k}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const Ie={files:[new File([x],k,{type:x.type||"video/webm"})],title:k};return typeof navigator.canShare=="function"&&!navigator.canShare(Ie)?!1:(await navigator.share(Ie),!0)},Zo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(k=>MediaRecorder.isTypeSupported(k))??"",Xo=async()=>{const x=ce.current?.canvas;if(!(x instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await Ye();const k=new MediaStream;x.captureStream(30).getVideoTracks().forEach(Fe=>k.addTrack(Fe)),Le.current?.stream.getAudioTracks().forEach(Fe=>k.addTrack(Fe.clone()));const Ie=Zo(),We=Ie?new MediaRecorder(k,{mimeType:Ie}):new MediaRecorder(k);R.current=[],gt(),W(null),L.current=k,p.current=We,We.addEventListener("dataavailable",Fe=>{Fe.data.size>0&&R.current.push(Fe.data)}),We.addEventListener("stop",()=>{const Fe=_o(R.current,We.mimeType);R.current=[],L.current?.getTracks().forEach(Yo=>Yo.stop()),L.current=null,p.current=null,c(!1),Ye(),A.current?.(Fe),A.current=null},{once:!0}),We.start(),c(!0)},ao=(x=!0)=>{const k=p.current;return k?new Promise(oe=>{if(A.current=oe,x||(R.current=[]),k.state!=="inactive"){k.stop();return}L.current?.getTracks().forEach(Ie=>Ie.stop()),L.current=null,p.current=null,c(!1),A.current?.(V.current),A.current=null}):Promise.resolve(V.current)};return l.useEffect(()=>{let x=!1;return(async()=>(E("startup:setupPixi-effect:start",{renderResolutionScale:o}),await Re.current(),x&&Pe.current()))(),()=>{gt(),ao(!1),x=!0,Pe.current()}},[o]),l.useEffect(()=>()=>{pe.current(),Se.current()},[]),l.useEffect(()=>{const x=()=>{Bo()};return window.addEventListener("beforeunload",x),()=>{window.removeEventListener("beforeunload",x)}},[]),l.useEffect(()=>{const x=()=>{i.current&&(i.current.muted=!0,i.current.volume=0,i.current.pause(),Ke())};return window.addEventListener(so,x),()=>{window.removeEventListener(so,x)}},[Ke]),l.useEffect(()=>{if(!vo())return;const x=oe=>oe==="video"||oe==="audio"||oe==="capture",k=()=>{const oe=i.current;if(!(!oe||!x(ne.current))){if(document.visibilityState==="hidden"){J.current=!oe.paused,oe.pause(),Z.current=!1,S(!1),Ne.current&&(Ne.current.gain.value=0),Te.current&&(Te.current.gain.value=0),Me.current?.state==="running"&&Me.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await Ye(),_e(),d(),J.current&&i.current)try{await i.current.play(),re(!1)}catch(Ie){Ie instanceof DOMException&&Ie.name==="NotAllowedError"&&re(!0)}}finally{Ke(),J.current=!1}})()},80)}};return document.addEventListener("visibilitychange",k),()=>{document.removeEventListener("visibilitychange",k)}},[Me,Ye,Te,Ne,_e,Ke,d]),l.useLayoutEffect(()=>{ve(),Ee(),qe(),De()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,De]),l.useEffect(()=>{if(f||Y){et();return}if(P==="image"||P==="audio"){et();return}N&&et()},[f,Y,P,N]),l.useEffect(()=>{Z.current=N;const x=(P==="video"||P==="capture")&&i.current?.tagName==="VIDEO",k=!i.current||Math.abs(i.current.currentTime)<.05,oe=i.current?.ended??!1;x&&et(),x&&!N&&!f&&!oe&&(Me.current?.state==="suspended"||k)&&re(!0)},[Me,N,f,P]),l.useEffect(()=>{const x=k=>{if(!i.current)return;const oe=k.target;if(!(oe instanceof HTMLInputElement||oe instanceof HTMLTextAreaElement||oe?.isContentEditable)){if(k.code==="Space"||k.code==="KeyK"){k.preventDefault(),io();return}if(k.code==="KeyJ"){k.preventDefault(),tt(Math.max(i.current.currentTime-10,0));return}if(k.code==="KeyL"){k.preventDefault(),tt(Math.min(i.current.currentTime+10,i.current.duration||i.current.currentTime+10));return}if(k.code==="ArrowLeft"){k.preventDefault(),tt(Math.max(i.current.currentTime-5,0));return}k.code==="ArrowRight"&&(k.preventDefault(),tt(Math.min(i.current.currentTime+5,i.current.duration||i.current.currentTime+5)))}};return window.addEventListener("keydown",x),()=>{window.removeEventListener("keydown",x)}},[]),{canvasHostRef:U,previewName:z,previewError:f,isRendererReady:we,loadingLabel:Q,isLoading:H,needsUserPlay:Y,isPlaying:N,isMuted:s,currentTime:T,duration:ie,playbackRate:O,volume:I,isLooping:Ae,sourceDimensions:_,viewportRect:Ce,isAudioFxEnabled:nt,lofiAmount:rt,radioToneAmount:yt,bitCrushAmount:it,sampleRateReductionAmount:at,bassAmount:st,midAmount:lt,trebleAmount:ct,stereoWidthAmount:ut,smallSpeakerRoomAmount:dt,wowFlutterAmount:kt,isNoiseEnabled:Ft,noiseLevel:Nt,vinylDustAmount:Ut,delayAmount:$e,reverbAmount:Ot,chorusAmount:Vt,tapeSaturationAmount:mt,setTapeSaturationAmount:zt,compressorAmount:jt,setCompressorAmount:Zt,fxOutputTrimAmount:Xt,setFxOutputTrimAmount:Yt,hasPlayableMedia:P==="video"||P==="audio"||P==="capture",hasVideo:P==="video"||P==="capture",hasAudioOnly:P==="audio",hasImage:P==="image",isRecording:a,pendingRecordingFilename:F,prefersShareExport:fo()&&vo(),isCaptureActive:P==="capture",canRecord:P==="video"||P==="capture"||P==="image"||P==="audio",previewFile:Po,previewStream:Eo,previewUrl:ko,startDisplayCapture:Io,stopDisplayCapture:Fo,togglePlayback:io,toggleMute:Go,seekTo:tt,stepFrame:No,changePlaybackRate:Wo,changeVolume:Uo,toggleLoop:Ho,setLoopingEnabled:Oo,applyAudioSettings:yo,resetAudioSettings:Ro,playVideoWithAudio:ro,isPoweredOn:C,powerOn:oo,powerOff:Lo,downloadPendingRecording:zo,sharePendingRecording:jo,startRecording:Xo,stopRecording:ao,ensureAudioContext:Ye,refreshLayout:De,toggleAudioFx:()=>{Ct(x=>!x)},setLofiAmount:St,setRadioToneAmount:Rt,setBitCrushAmount:Tt,setSampleRateReductionAmount:Dt,setBassAmount:Lt,setMidAmount:Mt,setTrebleAmount:Bt,setStereoWidthAmount:Pt,setSmallSpeakerRoomAmount:Et,setWowFlutterAmount:It,toggleNoise:()=>{Gt(x=>!x)},setNoiseLevel:Wt,setVinylDustAmount:Ht,setDelayAmount:ht,setReverbAmount:Qe,setChorusAmount:_t}}const ge=ot.pc98_512,bo=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,ft=t=>{for(const[e,o]of Object.entries(ot))if(bo(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(ot))if(bo(t,o,{ignoreDimensions:!0}))return e;return null},qn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function Jn(t={}){const[e]=l.useState(()=>({targetWidth:t.targetWidth??ge.width,targetHeight:t.targetHeight??ge.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??ge.colors,ditherStrength:t.ditherStrength??ge.dither,paletteMode:t.paletteMode??ge.palette,curvature:t.curvature??ge.curvature,scanlineStrength:t.scanlineStrength??ge.scanline,scanline2Strength:t.scanline2Strength??ge.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??ge.vignette,glowStrength:t.glowStrength??ge.glow,smoothStrength:t.smoothStrength??ge.smoothStrength??0,toonSteps:t.toonSteps??ge.toonSteps??0,edgeBoost:t.edgeBoost??ge.edgeBoost??0,phosphorStrength:t.phosphorStrength??ge.phosphor,spotMaskStrength:t.spotMaskStrength??ge.spotMask,bulbRadius:t.bulbRadius??ge.bulbRadius,blackFloor:t.blackFloor??ge.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??ge.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??ge.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??ge.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??ge.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??ge.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??ge.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??ge.monoTint,neonBoost:t.neonBoost??ge.neonBoost,neonSaturation:t.neonSaturation??ge.neonSaturation,neonDetail:t.neonDetail??ge.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=l.useState(()=>({...e,...xt()?.filter,...t})),[r,n]=l.useState(o),[u,m]=l.useState(ft(o)),i=a=>{m(null),n(c=>c.targetWidth===a?c:{...c,targetWidth:a})},p=a=>{m(null),n(c=>c.targetHeight===a?c:{...c,targetHeight:a})},R=a=>{m(null),n(c=>c.matchTargetAspect===a?c:{...c,matchTargetAspect:a})},L=a=>{m(null),n(c=>({...c,colorLevels:a}))},w=a=>{m(null),n(c=>({...c,ditherStrength:a}))},B=a=>{m(null),n(c=>({...c,paletteMode:a,colorLevels:qn(a,c.colorLevels)}))},V=a=>{m(null),n(c=>({...c,curvature:a}))},A=a=>{m(null),n(c=>({...c,scanlineStrength:a}))},q=a=>{m(null),n(c=>({...c,scanline2Strength:a}))},Z=a=>{m(null),n(c=>({...c,scanlineBrightnessFade:a}))},ne=a=>{m(null),n(c=>({...c,vignetteStrength:a}))},J=a=>{m(null),n(c=>({...c,glowStrength:a}))},z=a=>{m(null),n(c=>({...c,smoothStrength:a}))},$=a=>{m(null),n(c=>({...c,toonSteps:a}))},f=a=>{m(null),n(c=>({...c,edgeBoost:a}))},fe=a=>{m(null),n(c=>({...c,phosphorStrength:a}))},C=a=>{m(null),n(c=>({...c,spotMaskStrength:a}))},b=a=>{m(null),n(c=>({...c,bulbRadius:a}))},Q=a=>{m(null),n(c=>({...c,blackFloor:a}))},j=a=>{m(null),n(c=>({...c,phosphorDotLightBalance:a}))},H=a=>{m(null),n(c=>({...c,phosphorDotInternalScale:a}))},ae=a=>{m(null),n(c=>({...c,phosphorDotBrightCore:a}))},Y=a=>{m(null),n(c=>({...c,phosphorDotCellFill:a}))},re=a=>{m(null),n(c=>({...c,phosphorDotFlatDisc:a}))},N=a=>{m(null),n(c=>({...c,phosphorDotNeighborBlend:a}))},S=a=>{m(null),n(c=>({...c,closeUpNoiseStrength:a}))},T=a=>{m(null),n(c=>({...c,monoTint:a}))},D=a=>{m(null),n(c=>({...c,neonBoost:a}))},ie=a=>{m(null),n(c=>({...c,neonSaturation:a}))},X=a=>{m(null),n(c=>({...c,neonDetail:a}))},P=a=>{n(c=>({...c,isFilterEnabled:a}))},g=a=>{const c=ot[a];m(a),n(F=>({...F,targetWidth:c.width,targetHeight:c.height,colorLevels:c.colors,ditherStrength:c.dither,paletteMode:c.palette,curvature:c.curvature,scanlineStrength:c.scanline,scanline2Strength:c.scanline2,vignetteStrength:c.vignette,glowStrength:c.glow,smoothStrength:c.smoothStrength??0,toonSteps:c.toonSteps??0,edgeBoost:c.edgeBoost??0,phosphorStrength:c.phosphor,spotMaskStrength:c.spotMask,bulbRadius:c.bulbRadius,blackFloor:c.blackFloor,phosphorDotLightBalance:c.phosphorDotLightBalance??1,phosphorDotInternalScale:c.phosphorDotInternalScale??!1,phosphorDotBrightCore:c.phosphorDotBrightCore??!1,phosphorDotCellFill:c.phosphorDotCellFill??0,phosphorDotFlatDisc:c.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:c.phosphorDotNeighborBlend??!1,monoTint:c.monoTint,neonBoost:c.neonBoost,neonSaturation:c.neonSaturation,neonDetail:c.neonDetail,isFilterEnabled:!0}))},_=a=>{m(ft(a)),n(a)},K=()=>{m(ft(e)),n(e)};return l.useEffect(()=>{const a=setTimeout(()=>{fn(r)},300);return()=>clearTimeout(a)},[r]),l.useEffect(()=>{const a=ft(r);m(c=>c===a?c:a)},[r]),{...r,selectedPreset:u,setTargetWidth:i,setTargetHeight:p,setMatchTargetAspect:R,setColorLevels:L,setDitherStrength:w,setPaletteMode:B,setCurvature:V,setScanlineStrength:A,setScanline2Strength:q,setScanlineBrightnessFade:Z,setVignetteStrength:ne,setGlowStrength:J,setSmoothStrength:z,setToonSteps:$,setEdgeBoost:f,setPhosphorStrength:fe,setSpotMaskStrength:C,setBulbRadius:b,setBlackFloor:Q,setPhosphorDotLightBalance:j,setPhosphorDotInternalScale:H,setPhosphorDotBrightCore:ae,setPhosphorDotCellFill:Y,setPhosphorDotFlatDisc:re,setPhosphorDotNeighborBlend:N,setCloseUpNoiseStrength:S,setMonoTint:T,setNeonBoost:D,setNeonSaturation:ie,setNeonDetail:X,setIsFilterEnabled:P,applyAllFilterSettings:_,applyPreset:g,resetSettings:K}}function $n({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:u,controlPanelMode:m,confirmDialog:i,onHighResolutionChange:p,onFitWidthChange:R,onRefit:L,onError:w}){const B=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",refit:"Refit: プレビュー配置を立て直します。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",refit:"Refit: recover the preview layout.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},V=G.useMemo(()=>xt()?.ui,[]),[A,q]=G.useState(V?.isPreviewMaximized??!1),[Z,ne]=G.useState(!1),[J,z]=G.useState(!1),[$,f]=G.useState(0),[fe,C]=G.useState(null),[b,Q]=G.useState(null),j=G.useRef(null),H=G.useRef(null),ae=G.useRef(null),Y=G.useRef(null),re=G.useCallback(()=>{const E=j.current,M=ae.current;if(!E||!M)return null;const U=E.getBoundingClientRect(),ce=M.getBoundingClientRect();return{left:U.left,width:U.width,height:ce.height}},[]),N=G.useCallback(E=>{Y.current!==null&&window.clearTimeout(Y.current),Y.current=window.setTimeout(()=>{C(E),Y.current=null},120)},[]),S=G.useCallback(()=>{Y.current!==null&&(window.clearTimeout(Y.current),Y.current=null),C(null)},[]);G.useEffect(()=>{bn({isPreviewMaximized:A,isHighResolution:n})},[n,A]),G.useEffect(()=>()=>{Y.current!==null&&window.clearTimeout(Y.current)},[]),G.useEffect(()=>{if(!A)return;const E=document.body.style.overflow,M=U=>{U.code==="Escape"&&q(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",M),()=>{document.body.style.overflow=E,window.removeEventListener("keydown",M)}},[A]),G.useEffect(()=>{A&&(ne(!1),z(!1),f(0),Q(null))},[A]),G.useEffect(()=>{u&&(ne(!1),z(!1),f(0),Q(null))},[u]),G.useEffect(()=>{if(m!=="video-settings"||A||Z||u){z(!1),f(0);return}const E=()=>{const M=H.current,U=ae.current;if(!M||!U)return;const ce=M.getBoundingClientRect().top,xe=U.getBoundingClientRect().height,se=Math.round(Math.min(xe,window.innerHeight)*.4),le=-Math.max(120,se);z(he=>{if(!he&&ce<=le){f(Math.max(120,se));const we=re();return we&&Q(we),!0}return he&&f(Math.max(120,se)),he&&ce>=-24?(f(0),!1):he})};return E(),window.addEventListener("scroll",E,{passive:!0}),window.addEventListener("resize",E),()=>{window.removeEventListener("scroll",E),window.removeEventListener("resize",E)}},[m,u,A,Z,re]),G.useEffect(()=>{if(!((Z||J)&&!A)){Q(null);return}const M=()=>{const U=re();U&&Q(U)};return M(),window.addEventListener("resize",M),window.addEventListener("scroll",M,{passive:!0}),()=>{window.removeEventListener("resize",M),window.removeEventListener("scroll",M)}},[J,A,Z,u,re,r.sourceDimensions]),G.useEffect(()=>{r.refreshLayout()},[Z,A,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const T=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),D=!A&&!u&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,ie=D?`${D}px`:"60vh",X=G.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),P=(Z||J)&&!A,g=J?`calc(max(0.0rem, env(safe-area-inset-top)) - ${$}px)`:void 0,_="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",K="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",a="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",c="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",F=(E,M,U="w-44")=>v.jsx("div",{role:"tooltip","aria-hidden":fe!==E,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",U,fe===E?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:M}),W=()=>v.jsxs(v.Fragment,{children:[r.canRecord&&v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{S(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording())return;const M=await i({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(r.ensureAudioContext(),!M)return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(E){w?.(E instanceof Error?E:new Error(String(E)))}return}try{await r.startRecording()}catch(E){w?.(E instanceof Error?E:new Error(String(E)))}})()},onMouseEnter:()=>N("record"),onMouseLeave:S,onFocus:()=>N("record"),onBlur:S,className:[c,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?v.jsx(pn,{size:14,className:"fill-current animate-pulse"}):v.jsx(on,{size:16,className:"text-rose-300"})}),F("record",r.isRecording?B.recordStop:B.recordIdle)]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(S(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>N("power"),onMouseLeave:S,onFocus:()=>N("power"),onBlur:S,className:[_,r.isPoweredOn?K:a].join(" "),children:v.jsx(un,{size:16})}),F("power",r.isPoweredOn?B.powerOff:B.powerOn)]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{S(),p(!n)},onMouseEnter:()=>N("hi-res"),onMouseLeave:S,onFocus:()=>N("hi-res"),onBlur:S,className:[_,n?K:a].join(" "),children:v.jsx($o,{size:16})}),F("hi-res",B.hiRes)]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":u?"Disable fit width":"Enable fit width",onClick:()=>{S(),R(!u)},onMouseEnter:()=>N("fit-width"),onMouseLeave:S,onFocus:()=>N("fit-width"),onBlur:S,className:[_,u?K:a].join(" "),children:v.jsx(en,{size:16})}),F("fit-width",u?B.fitWidthOn:B.fitWidthOff)]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":"Refit preview",onClick:()=>{S(),L()},onMouseEnter:()=>N("refit"),onMouseLeave:S,onFocus:()=>N("refit"),onBlur:S,className:[_,a].join(" "),children:v.jsx(hn,{size:16})}),F("refit",B.refit)]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":P?"Unpin preview":"Pin preview",onClick:()=>{S(),!(A||u)&&ne(E=>{if(!E){const U=re();return U&&Q(U),!0}return z(!1),f(0),Q(null),!1})},onMouseEnter:()=>N("pin"),onMouseLeave:S,onFocus:()=>N("pin"),onBlur:S,className:[_,A||u?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":P?K:a].join(" "),disabled:A||u,children:v.jsx(ln,{size:16})}),F("pin",A?B.pinUnavailable:u?B.pinUnavailableFitWidth:P?B.pinOn:B.pinOff)]}),v.jsxs("div",{className:"relative",children:[v.jsx("button",{type:"button","aria-label":A?"Exit maximize":"Maximize preview",onClick:()=>{S(),q(E=>!E)},onMouseEnter:()=>N("maximize"),onMouseLeave:S,onFocus:()=>N("maximize"),onBlur:S,className:[_,A?K:a].join(" "),children:A?v.jsx(Kt,{size:16}):v.jsx(rn,{size:16})}),F("maximize",A?B.maximizeOn:B.maximizeOff)]})]});return v.jsxs("div",{ref:j,className:"space-y-4",children:[v.jsx("div",{ref:H,"aria-hidden":"true"}),v.jsxs("div",{ref:ae,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${A?u?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":P?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:P&&b?{left:`${b.left}px`,top:g??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${b.width}px`}:A?void 0:{overflow:"visible"},children:[A&&(u?v.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:v.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{q(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:v.jsx(Kt,{size:18})})}):v.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{q(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:v.jsx(Kt,{size:18})})),v.jsxs("div",{className:`relative ${A?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:A?u&&X?{aspectRatio:X,width:"100%"}:void 0:u&&X?{aspectRatio:X,width:"100%"}:X?{aspectRatio:X,width:"100%",height:"min(60vh, calc(100vh - 12rem))",maxHeight:"calc(100vh - 12rem)",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:ie,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[v.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[T&&v.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),v.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&v.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:v.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[v.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),v.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&v.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",T?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:v.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[v.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),v.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),v.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&v.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:v.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[v.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),v.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),v.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),v.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&v.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!u&&v.jsx("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:W()})]}),u&&A&&v.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:W()})]}),u&&!A&&v.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:W()}),P&&b&&v.jsx("div",{style:{height:`${b.height}px`}})]})}const Qn=G.lazy(()=>wo(()=>import("./VideoControls-FPx3oQPs.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),er=G.lazy(()=>wo(()=>import("./RetroFilterPanel-CLqrzayc.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),Ao=v.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function tr({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:u,onSetTargetWidth:m,onSetTargetHeight:i,onSetMatchTargetAspect:p,onResetSettings:R,onImportSettings:L}){return v.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&v.jsx(G.Suspense,{fallback:Ao,children:v.jsx(Qn,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:R,onImportSettings:L,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&v.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&v.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[v.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:v.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),v.jsx(G.Suspense,{fallback:Ao,children:v.jsx(er,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:u,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:i,onSetTargetWidth:m,onSetMatchTargetAspect:p,onSetVignetteStrength:o.setVignetteStrength})})]})]})}function xo({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:u,className:m,onError:i,initialFilterState:p,confirmDialog:R}){const{showConfirmDialog:L}=Ko(),w=R??(T=>L({...T,title:T.title??"",body:T.body??""}).then(D=>D??!1)),B=G.useMemo(()=>xt()?.ui,[]),[V,A]=G.useState(B?.isHighResolution??!1),[q,Z]=G.useState(!1),[ne,J]=G.useState("playback"),z=G.useRef(""),$=G.useRef(""),f=Jn(p),fe=V&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,C=Kn(f,q?"width":"contain",fe),b=G.useCallback(()=>{An(),f.resetSettings(),C.resetAudioSettings(),A(!1)},[f,C]),Q=G.useCallback(T=>{f.applyAllFilterSettings(T.filter),C.applyAudioSettings(T.audio),A(T.ui.isHighResolution),qo(T.locale)},[f,C]),j=G.useCallback(()=>{if(!C.sourceDimensions)return;const T=Math.max(8,Math.round(f.targetWidth/C.sourceDimensions.width*C.sourceDimensions.height/8)*8);T!==f.targetHeight&&f.setTargetHeight(T)},[f.targetHeight,f.targetWidth,f.setTargetHeight,C.sourceDimensions]),H=G.useCallback(()=>C.sourceDimensions?.width&&C.sourceDimensions?.height?C.sourceDimensions.width/C.sourceDimensions.height:Math.max(f.targetWidth,1)/Math.max(f.targetHeight,1),[f.targetHeight,f.targetWidth,C.sourceDimensions]),ae=G.useCallback(T=>{if(f.setTargetWidth(T),!f.matchTargetAspect)return;const D=Math.max(H(),1e-4);f.setTargetHeight(Math.max(1,Math.round(T/D)))},[f,H]),Y=G.useCallback(T=>{if(f.setTargetHeight(T),!f.matchTargetAspect)return;const D=Math.max(H(),1e-4);f.setTargetWidth(Math.max(1,Math.round(T*D)))},[f,H]),re=G.useCallback(T=>{f.setMatchTargetAspect(T),T&&C.sourceDimensions&&j()},[f,C.sourceDimensions,j]),N=G.useCallback(T=>{if(f.applyPreset(T),T!=="phosphorDot"||!C.sourceDimensions)return;const D=ot.phosphorDot,ie=Math.max(C.sourceDimensions.width,1),X=Math.max(C.sourceDimensions.height,1),P=ie/X,g=D.width/D.height;let _=D.width,K=D.height;P>g?K=Math.max(8,Math.round(D.width/P/8)*8):_=Math.max(8,Math.round(D.height*P/8)*8),!(D.width===_&&D.height===K)&&(f.setTargetWidth(_),f.setTargetHeight(K))},[f.applyPreset,f.setTargetHeight,f.setTargetWidth,C.sourceDimensions]),S=G.useCallback(()=>{if(o&&C.isCaptureActive){window.setTimeout(()=>{C.previewStream(o,n==="audio"?"audio":"video",r)},120);return}window.requestAnimationFrame(()=>{C.refreshLayout(),window.requestAnimationFrame(()=>{C.refreshLayout()})})},[n,C,o,r]);return G.useEffect(()=>{f.matchTargetAspect&&C.sourceDimensions&&j()},[f.matchTargetAspect,C.sourceDimensions,j]),G.useEffect(()=>{if(o){const D=`stream:${o.id}:${n}:${r??""}`;if(z.current===D)return;z.current=D,(async()=>{try{await C.previewStream(o,n==="audio"?"audio":"video",r)}catch(ie){i?.(ie instanceof Error?ie:new Error(String(ie)))}})();return}if(!e){z.current="";return}const T=`src:${e}:${n}`;z.current!==T&&(z.current=T,(async()=>{try{await C.previewUrl(e,n)}catch(D){i?.(D instanceof Error?D:new Error(String(D)))}})())},[e,o,r,n,i,C]),G.useEffect(()=>{C.refreshLayout()},[q,C.refreshLayout]),G.useEffect(()=>{C.refreshLayout()},[f.targetWidth,f.targetHeight,f.isFilterEnabled,fe,C.refreshLayout]),G.useEffect(()=>{if(typeof u!="boolean")return;const T=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!T){$.current="";return}const D=`${T}:${u}`;$.current!==D&&($.current=D,C.setLoopingEnabled(u))},[n,u,C,e,o]),v.jsx("section",{className:m??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:v.jsxs("div",{className:"space-y-4",children:[v.jsx($n,{locale:t,src:e,kind:n,player:C,isHighResolution:V,isFitWidthEnabled:q,controlPanelMode:ne,confirmDialog:w,onHighResolutionChange:A,onFitWidthChange:Z,onRefit:S,onError:i}),v.jsx(tr,{locale:t,player:C,filterState:f,controlPanelMode:ne,onControlPanelModeChange:J,onApplyPreset:N,onSetTargetWidth:ae,onSetTargetHeight:Y,onSetMatchTargetAspect:re,onResetSettings:b,onImportSettings:Q})]})})}const nr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:xo,default:xo},Symbol.toStringTag,{value:"Module"}));export{de as D,kn as M,wn as R,ot as a,nr as b,hn as c,xt as l};
