const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./VideoControls-DzTUO89r.js","./index-CujdVGNi.js","./index-Cbqe7M3t.css","./RetroFilterPanel-LFW92FZk.js"])))=>i.map(i=>d[i]);
import{b as Ke,r as c,R as lo,a as k,j as x,_ as Co,u as qo,s as Jo}from"./index-CujdVGNi.js";const $o=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Qo=Ke("aperture",$o);const en=[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]],tn=Ke("arrow-left-right",en);const on=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],nn=Ke("circle",on);const rn=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],an=Ke("maximize-2",rn);const sn=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],Kt=Ke("minimize-2",sn);const ln=[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]],cn=Ke("pin",ln);const un=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],dn=Ke("power",un);const hn=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],mn=Ke("square",hn);async function So(t,e={},o){return window.__TAURI_INTERNALS__.invoke(t,e,o)}async function pn(t,e){await So("plugin:sharekit|share_file",{url:t,...e})}const eo="tetorica-retro-player.settings",bt=1,At=()=>{if(typeof window>"u")return null;try{const t=window.localStorage.getItem(eo);if(!t)return null;const e=JSON.parse(t);return e.version!==bt?null:e}catch{return null}},to=t=>{if(!(typeof window>"u"))try{window.localStorage.setItem(eo,JSON.stringify(t))}catch{}},xt=()=>At(),gn=t=>{const e=At();to({version:bt,audio:e?.audio,filter:t,ui:e?.ui})},fn=t=>{const e=At();to({version:bt,audio:t,filter:e?.filter,ui:e?.ui})},vn=t=>{const e=At();to({version:bt,audio:e?.audio,filter:e?.filter,ui:t})},bn=()=>{if(!(typeof window>"u"))try{window.localStorage.removeItem(eo)}catch{}},ue={isMuted:!1,volume:.3,playbackRate:1,isLooping:!0,isAudioFxEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,isNoiseEnabled:!0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66},An={none:{label:"None",settings:{isAudioFxEnabled:!1,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:0,midAmount:0,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofi:{label:"Lo-Fi",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.58,radioToneAmount:0,bitCrushAmount:.1,sampleRateReductionAmount:.1,bassAmount:0,midAmount:-.25,trebleAmount:0,stereoWidthAmount:0,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:.005,vinylDustAmount:0,delayAmount:0,reverbAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.66}},radio:{label:"Radio",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.2,radioToneAmount:.7,bitCrushAmount:.12,sampleRateReductionAmount:.28,bassAmount:-.4,midAmount:.13,trebleAmount:-.32,stereoWidthAmount:-.55,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.007,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:.74}},tape:{label:"Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.22,radioToneAmount:.1,bitCrushAmount:.04,sampleRateReductionAmount:.08,bassAmount:.12,midAmount:0,trebleAmount:-.14,stereoWidthAmount:.1,smallSpeakerRoomAmount:.18,wowFlutterAmount:.48,noiseLevel:.0075,vinylDustAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:.18,compressorAmount:.25,fxOutputTrimAmount:.58}},vinyl:{label:"Vinyl",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.14,radioToneAmount:.06,bitCrushAmount:.01,sampleRateReductionAmount:.03,bassAmount:.06,midAmount:-.02,trebleAmount:-.16,stereoWidthAmount:-.18,smallSpeakerRoomAmount:0,wowFlutterAmount:.09,noiseLevel:.0035,vinylDustAmount:.29,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.05,compressorAmount:.15,fxOutputTrimAmount:.75}},"vintage-mic":{label:"Vintage Mic",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.34,radioToneAmount:.28,bitCrushAmount:0,sampleRateReductionAmount:.02,bassAmount:-.24,midAmount:.24,trebleAmount:-.68,stereoWidthAmount:-.32,smallSpeakerRoomAmount:.12,wowFlutterAmount:0,noiseLevel:.0025,vinylDustAmount:.04,reverbAmount:.08,tapeSaturationAmount:.08,compressorAmount:.12,fxOutputTrimAmount:.46}},earphone:{label:"Earphone",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.1,midAmount:0,trebleAmount:.08,stereoWidthAmount:.22,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:0,fxOutputTrimAmount:1}},lofiTape:{label:"Lo-Fi Tape",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.48,radioToneAmount:.1,bitCrushAmount:.1,sampleRateReductionAmount:.12,bassAmount:.1,midAmount:-.02,trebleAmount:-.14,stereoWidthAmount:-.02,smallSpeakerRoomAmount:.1,wowFlutterAmount:.08,noiseLevel:.005,vinylDustAmount:0,delayAmount:.05,reverbAmount:.05,chorusAmount:.05,tapeSaturationAmount:.13,compressorAmount:.25,fxOutputTrimAmount:.5}},boombox:{label:"Boom Box",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!0,lofiAmount:.3,radioToneAmount:.06,bitCrushAmount:.06,sampleRateReductionAmount:.06,bassAmount:.2,midAmount:-.55,trebleAmount:.05,stereoWidthAmount:-.1,smallSpeakerRoomAmount:.14,wowFlutterAmount:.04,noiseLevel:.004,vinylDustAmount:0,delayAmount:0,reverbAmount:0,chorusAmount:0,tapeSaturationAmount:.1,compressorAmount:.4,fxOutputTrimAmount:.58}},club:{label:"Club",settings:{isAudioFxEnabled:!0,isNoiseEnabled:!1,lofiAmount:0,radioToneAmount:0,bitCrushAmount:0,sampleRateReductionAmount:0,bassAmount:.3,midAmount:-.65,trebleAmount:.15,stereoWidthAmount:.15,smallSpeakerRoomAmount:0,wowFlutterAmount:0,noiseLevel:0,vinylDustAmount:0,delayAmount:0,reverbAmount:.05,chorusAmount:0,tapeSaturationAmount:0,compressorAmount:.45,fxOutputTrimAmount:.62}}},xn=Object.fromEntries(Object.entries(An).map(([t,e])=>[t,{label:e.label,settings:{...ue,...e.settings}}])),wn=Object.fromEntries(Object.entries(xn).map(([t,e])=>[t,e.settings])),Cn=()=>!!globalThis.__RETRO_PLAYER_DEBUG__;function Sn(t){const o=new Float32Array(256),r=1+t*5;for(let n=0;n<256;n+=1){const u=n*2/255-1;o[n]=Math.tanh(u*r)}return o}function co(t){const o=new Float32Array(256),r=t*8;for(let n=0;n<256;n++){const u=n*2/255-1;r<.001?o[n]=u:o[n]=Math.tanh(u*(1+r))/Math.tanh(1+r)}return o}function yn(t){const o=Math.max(1,Math.floor(t.sampleRate*2.2)),r=t.createBuffer(2,o,t.sampleRate),n=Math.floor(t.sampleRate*.012);for(let u=0;u<r.numberOfChannels;u+=1){const m=r.getChannelData(u);for(let i=0;i<o;i+=1){if(i<n)continue;const p=(i-n)/(o-n),T=(1-p)**1.8,D=Math.max(0,1-p*2.5),f=Math.sin(p*160+u*.8)*D*.35;m[i]=(Math.random()*2-1+f)*T*.75}}return r}function Rn(t){const o=Math.max(1,Math.floor(t.sampleRate*.22)),r=t.createBuffer(2,o,t.sampleRate);for(let n=0;n<r.numberOfChannels;n+=1){const u=r.getChannelData(n);for(let m=0;m<u.length;m+=1){const i=m/u.length,p=(1-i)**1.85,T=.78+.22*Math.sin(i*42+n*.9),D=Math.sin(i*130+n*.35)*.08;u[m]=(Math.random()*2-1+D)*p*T*.28}}return r}function Tn(t){const e=t.sampleRate*2,o=t.createBuffer(2,e,t.sampleRate);let r=0,n=0;for(let u=0;u<e;u+=1){const m=Math.random()*2-1;r=(r+m*.045)/1.045,n=n*.82+m*.18;const i=r*1.35,p=(m-n)*.55,T=Math.max(-1,Math.min(1,i+p));for(let D=0;D<o.numberOfChannels;D+=1){const f=o.getChannelData(D),G=(Math.random()*2-1)*.012;f[u]=Math.max(-1,Math.min(1,T+G))}}return o}function Dn(t){const e=t.sampleRate*2,o=new Float32Array(e);let r=0,n=0;for(;r<e;){const m=Math.random()*2-1;n=n*.72+m*.28,o[r]+=(m-n)*.018;const i=Math.random();if(i<.0034){const p=8+Math.floor(Math.random()*42),T=.11+Math.random()*.28,D=Math.random()<.5?-1:1;for(let f=0;f<p&&r+f<e;f+=1){const G=Math.exp(-f/(2.4+Math.random()*5));o[r+f]+=D*T*G*(.7+Math.random()*.3)}r+=p+Math.floor(Math.random()*640);continue}if(i<.0038){const p=90+Math.floor(Math.random()*260),T=.055+Math.random()*.11,D=Math.random()*Math.PI*2;for(let f=0;f<p&&r+f<e;f+=1){const G=Math.exp(-f/(18+Math.random()*40)),S=Math.sin(D+f*(.22+Math.random()*.06));o[r+f]+=T*G*S}r+=p+Math.floor(Math.random()*2200);continue}r+=1}const u=t.createBuffer(2,e,t.sampleRate);for(let m=0;m<u.numberOfChannels;m+=1){const i=u.getChannelData(m);for(let p=0;p<e;p+=1){const T=(Math.random()*2-1)*.0035;i[p]=Math.max(-1,Math.min(1,o[p]+T))}}return u}function Ln(t){const e=globalThis.AudioParam;return typeof e=="function"?t instanceof e:typeof t=="object"&&t!==null&&"setValueAtTime"in t&&"value"in t}function yo({preset:t,params:e}){return{...ue,...t?wn[t]:null,...e}}class Mn{context;instanceLabel;connectOutputToDestination;connectOutputToRecordingDestination;enableAudioWorklet;runtimeState;currentSettings;nodes={audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null};constructor({context:e,instanceLabel:o,runtimeState:r,connectOutputToDestination:n=!0,connectOutputToRecordingDestination:u=!0,enableAudioWorklet:m=!0}){this.context=e,this.instanceLabel=o,this.runtimeState=r,this.currentSettings=r.settings,this.connectOutputToDestination=n,this.connectOutputToRecordingDestination=u,this.enableAudioWorklet=m}get input(){return this.nodes.wowFlutterDelay??this.nodes.lofiLowpass}get output(){return this.nodes.outputBus??this.nodes.masterGain}get audioContext(){return this.nodes.audioContext}get masterGain(){return this.nodes.masterGain}get radioToneHighpass(){return this.nodes.radioToneHighpass}get radioToneLowpass(){return this.nodes.radioToneLowpass}get radioTonePresence(){return this.nodes.radioTonePresence}get recordingDestination(){return this.nodes.recordingDestination}get lofiLowpass(){return this.nodes.lofiLowpass}get lofiHighshelf(){return this.nodes.lofiHighshelf}get lofiDrive(){return this.nodes.lofiDrive}get bitcrusher(){return this.nodes.bitcrusher}get bassEq(){return this.nodes.bassEq}get midEq(){return this.nodes.midEq}get trebleEq(){return this.nodes.trebleEq}get stereoWidth(){return this.nodes.stereoWidth}get roomDryGain(){return this.nodes.roomDryGain}get roomConvolver(){return this.nodes.roomConvolver}get roomWetGain(){return this.nodes.roomWetGain}get wowFlutterDelay(){return this.nodes.wowFlutterDelay}get wowLfo(){return this.nodes.wowLfo}get wowLfoGain(){return this.nodes.wowLfoGain}get flutterLfo(){return this.nodes.flutterLfo}get flutterLfoGain(){return this.nodes.flutterLfoGain}get noiseSource(){return this.nodes.noiseSource}get noiseFilter(){return this.nodes.noiseFilter}get noisePanner(){return this.nodes.noisePanner}get noiseGain(){return this.nodes.noiseGain}get noiseLfo(){return this.nodes.noiseLfo}get noiseLfoGain(){return this.nodes.noiseLfoGain}get crackleSource(){return this.nodes.crackleSource}get crackleFilter(){return this.nodes.crackleFilter}get vinylDustBedFilter(){return this.nodes.vinylDustBedFilter}get vinylDustBedGain(){return this.nodes.vinylDustBedGain}get crackleGain(){return this.nodes.crackleGain}debugAudio(e,o){Cn()&&console.log(`[retro-player audio][${this.instanceLabel}] ${e}`,o??{})}getParams(){return{...this.currentSettings}}setParams(e,o=!1){const r=o?{...this.currentSettings,...e}:{...ue,...e};Object.assign(this.currentSettings,r),this.updateAudioNodes()}applyPreset(e,o){const r=yo({preset:e,params:o});Object.assign(this.currentSettings,r),this.updateAudioNodes()}setIsPlaying(e){this.runtimeState.isPlaying=e,this.updateAudioNodes()}setOutputEnabled(e){this.runtimeState.isOutputEnabled=e,this.updateAudioNodes()}resetNodes(){Object.assign(this.nodes,{audioContext:null,masterGain:null,radioToneHighpass:null,radioToneLowpass:null,radioTonePresence:null,recordingDestination:null,lofiLowpass:null,lofiHighshelf:null,lofiDrive:null,bitcrusher:null,bassEq:null,midEq:null,trebleEq:null,stereoWidth:null,roomDryGain:null,roomConvolver:null,roomWetGain:null,wowFlutterDelay:null,wowLfo:null,wowLfoGain:null,flutterLfo:null,flutterLfoGain:null,noiseSource:null,noiseFilter:null,noisePanner:null,noiseGain:null,noiseLfo:null,noiseLfoGain:null,crackleSource:null,crackleFilter:null,vinylDustBedFilter:null,vinylDustBedGain:null,crackleGain:null,sourceNode:null,outputBus:null,echoDelayLine:null,echoFeedbackGain:null,echoWetGain:null,hallReverbConvolver:null,hallReverbWetGain:null,chorusDelay1:null,chorusDelay2:null,chorusLfo1:null,chorusLfo2:null,chorusLfoGain1:null,chorusLfoGain2:null,chorusWetGain:null,tapeSaturator:null,busCompressor:null,fxOutputGain:null})}resolveAudioWorkletNodeCtor(){const e=globalThis.AudioWorkletNode;return typeof e=="function"?e:null}updateAudioNodes(){const e=this.nodes.masterGain,o=this.nodes.radioToneHighpass,r=this.nodes.radioToneLowpass,n=this.nodes.radioTonePresence,u=this.nodes.lofiLowpass,m=this.nodes.lofiHighshelf,i=this.nodes.lofiDrive,p=this.nodes.bitcrusher,T=this.nodes.bassEq,D=this.nodes.midEq,f=this.nodes.trebleEq,G=this.nodes.stereoWidth,S=this.nodes.roomDryGain,N=this.nodes.roomWetGain,X=this.nodes.wowFlutterDelay,q=this.nodes.wowLfo,ee=this.nodes.wowLfoGain,K=this.nodes.flutterLfo,J=this.nodes.flutterLfoGain,H=this.nodes.noiseGain,w=this.nodes.crackleGain,pe=this.nodes.vinylDustBedFilter,R=this.nodes.vinylDustBedGain,{settings:b,isPlaying:se,isOutputEnabled:j}=this.runtimeState,F=b.isMuted||!j?0:b.volume;if(e&&(e.gain.value=F),o&&r&&n){const g=b.isAudioFxEnabled?b.radioToneAmount:0;o.frequency.value=20+g*430,o.Q.value=.4+g*.35,r.frequency.value=2e4-g*17400,r.Q.value=.2+g*.9,n.frequency.value=1700,n.Q.value=.8+g*1.4,n.gain.value=g*6}if(u&&m&&i){const g=b.isAudioFxEnabled?b.lofiAmount:0;u.frequency.value=16e3-g*14200,u.Q.value=.3+g*1.8,m.gain.value=-g*18;try{i.curve=Sn(g*.6)}catch{}}if(p){const g=b.isAudioFxEnabled,Z=16-(g?b.bitCrushAmount:0)*12,ae=1+(g?b.sampleRateReductionAmount:0)*23,l=g?Math.max(b.bitCrushAmount,b.sampleRateReductionAmount):0;p.parameters.get("bitDepth")?.setValueAtTime(Z,p.context.currentTime),p.parameters.get("holdFrames")?.setValueAtTime(ae,p.context.currentTime),p.parameters.get("mix")?.setValueAtTime(l,p.context.currentTime)}if(T&&D&&f){const g=b.isAudioFxEnabled?15:0;T.gain.value=b.bassAmount*g,D.gain.value=b.midAmount*g,f.gain.value=b.trebleAmount*g}if(G){const g=b.isAudioFxEnabled?1+b.stereoWidthAmount:1;G.parameters.get("width")?.setValueAtTime(g,G.context.currentTime)}if(S&&N){const g=b.isAudioFxEnabled?b.smallSpeakerRoomAmount:0;S.gain.value=Math.max(.52,1-g*.42),N.gain.value=g*.95}if(X&&q&&ee&&K&&J){const g=b.isAudioFxEnabled?b.wowFlutterAmount:0;X.delayTime.value=.006+g*.004,q.frequency.value=.18+g*.42,ee.gain.value=g*.0023,K.frequency.value=5.2+g*6.5,J.gain.value=g*6e-4}if(H&&(H.gain.value=b.isNoiseEnabled&&!b.isMuted&&j&&se?Math.min(.24,b.noiseLevel*5.5):0),w){const g=b.isNoiseEnabled&&!b.isMuted&&j&&se;w.gain.value=g?Math.min(.24,b.vinylDustAmount*.22+b.noiseLevel*.25):0}if(pe&&R){const Z=b.isNoiseEnabled&&!b.isMuted&&j&&se?b.vinylDustAmount:0;pe.frequency.value=2100+Z*2600,pe.Q.value=.35+Z*.25,R.gain.value=Z*.11}const Y=this.nodes.echoDelayLine,ie=this.nodes.echoFeedbackGain,V=this.nodes.echoWetGain;if(Y&&ie&&V){const g=b.isAudioFxEnabled?b.delayAmount:0;ie.gain.value=g*.5,V.gain.value=g*.55}const P=this.nodes.hallReverbWetGain;if(P){const g=b.isAudioFxEnabled?b.reverbAmount:0;P.gain.value=g*2}const v=this.nodes.chorusLfoGain1,L=this.nodes.chorusLfoGain2,_=this.nodes.chorusWetGain;if(v&&L&&_){const g=b.isAudioFxEnabled?b.chorusAmount:0;_.gain.value=g*.6,v.gain.value=g*.005,L.gain.value=g*.006}const te=this.nodes.tapeSaturator;if(te)try{te.curve=co(b.isAudioFxEnabled?b.tapeSaturationAmount:0)}catch{}const z=this.nodes.busCompressor;if(z){const g=b.isAudioFxEnabled?b.compressorAmount:0;z.threshold.value=-36*g,z.ratio.value=1+9*g}const I=this.nodes.fxOutputGain;I&&(I.gain.value=b.isAudioFxEnabled?b.fxOutputTrimAmount:1)}async ensureInitialized(){if(this.context.state==="closed")return this.resetNodes(),null;if(!this.nodes.audioContext||!this.nodes.masterGain){const o=this.context,r=o.createGain();let n=null;if("createMediaStreamDestination"in o)try{n=o.createMediaStreamDestination()}catch{n=null}const u=o.createBiquadFilter(),m=o.createBiquadFilter(),i=o.createBiquadFilter(),p=o.createBiquadFilter(),T=o.createBiquadFilter(),D=o.createWaveShaper();let f=null,G=null;const S=this.resolveAudioWorkletNodeCtor();if(this.enableAudioWorklet&&"audioWorklet"in o&&S){const we=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9CaXRjcnVzaGVyUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHsKICBzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCkgewogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIG5hbWU6ICJiaXREZXB0aCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAxNiwKICAgICAgICBtaW5WYWx1ZTogMiwKICAgICAgICBtYXhWYWx1ZTogMTYsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogImhvbGRGcmFtZXMiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMSwKICAgICAgICBtYXhWYWx1ZTogMzIsCiAgICAgICAgYXV0b21hdGlvblJhdGU6ICJrLXJhdGUiLAogICAgICB9LAogICAgICB7CiAgICAgICAgbmFtZTogIm1peCIsCiAgICAgICAgZGVmYXVsdFZhbHVlOiAwLAogICAgICAgIG1pblZhbHVlOiAwLAogICAgICAgIG1heFZhbHVlOiAxLAogICAgICAgIGF1dG9tYXRpb25SYXRlOiAiay1yYXRlIiwKICAgICAgfSwKICAgIF07CiAgfQoKICBjb25zdHJ1Y3RvcigpIHsKICAgIHN1cGVyKCk7CiAgICB0aGlzLmNoYW5uZWxTdGF0ZSA9IFtdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCkgewogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KCiAgICBjb25zdCBjaGFubmVsQ291bnQgPSBvdXRwdXQubGVuZ3RoOwogICAgd2hpbGUgKHRoaXMuY2hhbm5lbFN0YXRlLmxlbmd0aCA8IGNoYW5uZWxDb3VudCkgewogICAgICB0aGlzLmNoYW5uZWxTdGF0ZS5wdXNoKHsKICAgICAgICBob2xkQ291bnRlcjogMCwKICAgICAgICBoZWxkU2FtcGxlOiAwLAogICAgICB9KTsKICAgIH0KCiAgICBmb3IgKGxldCBjaGFubmVsID0gMDsgY2hhbm5lbCA8IGNoYW5uZWxDb3VudDsgY2hhbm5lbCArPSAxKSB7CiAgICAgIGNvbnN0IGlucHV0Q2hhbm5lbCA9IGlucHV0Py5bY2hhbm5lbF0gPz8gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBvdXRwdXRDaGFubmVsID0gb3V0cHV0W2NoYW5uZWxdOwogICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2hhbm5lbFN0YXRlW2NoYW5uZWxdOwoKICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG91dHB1dENoYW5uZWwubGVuZ3RoOyBpbmRleCArPSAxKSB7CiAgICAgICAgY29uc3QgYml0RGVwdGggPSByZWFkUGFyYW0ocGFyYW1ldGVycy5iaXREZXB0aCwgaW5kZXgpOwogICAgICAgIGNvbnN0IGhvbGRGcmFtZXMgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHJlYWRQYXJhbShwYXJhbWV0ZXJzLmhvbGRGcmFtZXMsIGluZGV4KSkpOwogICAgICAgIGNvbnN0IG1peCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLm1peCwgaW5kZXgpOwogICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q2hhbm5lbD8uW2luZGV4XSA/PyAwOwoKICAgICAgICBpZiAoc3RhdGUuaG9sZENvdW50ZXIgPD0gMCkgewogICAgICAgICAgc3RhdGUuaGVsZFNhbXBsZSA9IHF1YW50aXplU2FtcGxlKHNvdXJjZSwgYml0RGVwdGgpOwogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgPSBob2xkRnJhbWVzIC0gMTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgc3RhdGUuaG9sZENvdW50ZXIgLT0gMTsKICAgICAgICB9CgogICAgICAgIG91dHB1dENoYW5uZWxbaW5kZXhdID0gc291cmNlICsgKHN0YXRlLmhlbGRTYW1wbGUgLSBzb3VyY2UpICogbWl4OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIHRydWU7CiAgfQp9CgpmdW5jdGlvbiByZWFkUGFyYW0odmFsdWVzLCBpbmRleCkgewogIHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSAxID8gdmFsdWVzWzBdIDogdmFsdWVzW2luZGV4XTsKfQoKZnVuY3Rpb24gcXVhbnRpemVTYW1wbGUoc2FtcGxlLCBiaXREZXB0aCkgewogIGNvbnN0IHJlc29sdmVkQml0RGVwdGggPSBNYXRoLm1heCgyLCBNYXRoLm1pbigxNiwgTWF0aC5yb3VuZChiaXREZXB0aCkpKTsKICBpZiAocmVzb2x2ZWRCaXREZXB0aCA+PSAxNikgewogICAgcmV0dXJuIHNhbXBsZTsKICB9CgogIGNvbnN0IGxldmVscyA9IDIgKiogcmVzb2x2ZWRCaXREZXB0aDsKICBjb25zdCBub3JtYWxpemVkID0gKHNhbXBsZSArIDEpICogMC41OwogIGNvbnN0IHF1YW50aXplZCA9IE1hdGgucm91bmQobm9ybWFsaXplZCAqIChsZXZlbHMgLSAxKSkgLyAobGV2ZWxzIC0gMSk7CiAgcmV0dXJuIHF1YW50aXplZCAqIDIgLSAxOwp9CgpyZWdpc3RlclByb2Nlc3NvcigicmV0cm8tYml0Y3J1c2hlciIsIFJldHJvQml0Y3J1c2hlclByb2Nlc3Nvcik7Cg==",import.meta.url);await o.audioWorklet.addModule(we.href),f=new S(o,"retro-bitcrusher",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]});const de=new URL("data:text/javascript;base64,Y2xhc3MgUmV0cm9TdGVyZW9XaWR0aFByb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgc3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHsKICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICBuYW1lOiAid2lkdGgiLAogICAgICAgIGRlZmF1bHRWYWx1ZTogMSwKICAgICAgICBtaW5WYWx1ZTogMCwKICAgICAgICBtYXhWYWx1ZTogMiwKICAgICAgICBhdXRvbWF0aW9uUmF0ZTogImstcmF0ZSIsCiAgICAgIH0sCiAgICBdOwogIH0KCiAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzWzBdOwogICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKCiAgICBpZiAoIW91dHB1dCB8fCBvdXRwdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIGlmICghaW5wdXQgfHwgaW5wdXQubGVuZ3RoID09PSAwKSB7CiAgICAgIGZvciAobGV0IGNoYW5uZWwgPSAwOyBjaGFubmVsIDwgb3V0cHV0Lmxlbmd0aDsgY2hhbm5lbCArPSAxKSB7CiAgICAgICAgb3V0cHV0W2NoYW5uZWxdLmZpbGwoMCk7CiAgICAgIH0KICAgICAgcmV0dXJuIHRydWU7CiAgICB9CgogICAgY29uc3QgbGVmdEluID0gaW5wdXRbMF0gPz8gaW5wdXRbMV0gPz8gbmV3IEZsb2F0MzJBcnJheShvdXRwdXRbMF0ubGVuZ3RoKTsKICAgIGNvbnN0IHJpZ2h0SW4gPSBpbnB1dFsxXSA/PyBpbnB1dFswXSA/PyBsZWZ0SW47CiAgICBjb25zdCBsZWZ0T3V0ID0gb3V0cHV0WzBdOwogICAgY29uc3QgcmlnaHRPdXQgPSBvdXRwdXRbMV0gPz8gb3V0cHV0WzBdOwoKICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZWZ0T3V0Lmxlbmd0aDsgaW5kZXggKz0gMSkgewogICAgICBjb25zdCB3aWR0aCA9IHJlYWRQYXJhbShwYXJhbWV0ZXJzLndpZHRoLCBpbmRleCk7CiAgICAgIGNvbnN0IGxlZnQgPSBsZWZ0SW5baW5kZXhdID8/IDA7CiAgICAgIGNvbnN0IHJpZ2h0ID0gcmlnaHRJbltpbmRleF0gPz8gbGVmdDsKICAgICAgY29uc3QgbWlkID0gKGxlZnQgKyByaWdodCkgKiAwLjU7CiAgICAgIGNvbnN0IHNpZGUgPSAobGVmdCAtIHJpZ2h0KSAqIDAuNSAqIHdpZHRoOwoKICAgICAgbGVmdE91dFtpbmRleF0gPSBtaWQgKyBzaWRlOwogICAgICBpZiAob3V0cHV0WzFdKSB7CiAgICAgICAgcmlnaHRPdXRbaW5kZXhdID0gbWlkIC0gc2lkZTsKICAgICAgfQogICAgfQoKICAgIHJldHVybiB0cnVlOwogIH0KfQoKZnVuY3Rpb24gcmVhZFBhcmFtKHZhbHVlcywgaW5kZXgpIHsKICByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gMSA/IHZhbHVlc1swXSA6IHZhbHVlc1tpbmRleF07Cn0KCnJlZ2lzdGVyUHJvY2Vzc29yKCJyZXRyby1zdGVyZW8td2lkdGgiLCBSZXRyb1N0ZXJlb1dpZHRoUHJvY2Vzc29yKTsK",import.meta.url);await o.audioWorklet.addModule(de.href),G=new S(o,"retro-stereo-width",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]})}const N=o.createBiquadFilter(),X=o.createBiquadFilter(),q=o.createBiquadFilter(),ee=o.createGain(),K=o.createConvolver(),J=o.createGain(),H=o.createDelay(.05),w=o.createOscillator(),pe=o.createGain(),R=o.createOscillator(),b=o.createGain();u.type="highpass",m.type="lowpass",i.type="peaking",p.type="lowpass",T.type="highshelf",N.type="lowshelf",N.frequency.value=180,X.type="peaking",X.frequency.value=1200,X.Q.value=.5,q.type="highshelf",q.frequency.value=2800,K.buffer=Rn(o),T.frequency.value=2800,D.oversample="4x",H.delayTime.value=.006,w.type="sine",R.type="sine",w.connect(pe),pe.connect(H.delayTime),R.connect(b),b.connect(H.delayTime),H.connect(u),u.connect(m),m.connect(i),i.connect(p),p.connect(T),T.connect(D),f?(D.connect(f),f.connect(N)):D.connect(N),N.connect(X),X.connect(q);const se=o.createWaveShaper();se.curve=co(0),se.oversample="4x",q.connect(se),G?(se.connect(G),G.connect(ee),G.connect(K)):(se.connect(ee),se.connect(K)),K.connect(J),ee.connect(r),J.connect(r);const j=o.createGain();j.gain.value=1;const F=o.createDynamicsCompressor();F.knee.value=10,F.attack.value=.003,F.release.value=.12,F.threshold.value=0,F.ratio.value=1;const Y=o.createDelay(1);Y.delayTime.value=.32;const ie=o.createGain();ie.gain.value=0;const V=o.createGain();V.gain.value=0;const P=o.createConvolver();P.buffer=yn(o);const v=o.createGain();v.gain.value=0;const L=o.createDelay(.05),_=o.createDelay(.05);L.delayTime.value=.018,_.delayTime.value=.023;const te=o.createOscillator(),z=o.createOscillator();te.type="sine",z.type="sine",te.frequency.value=.8,z.frequency.value=1.3;const I=o.createGain(),g=o.createGain();I.gain.value=0,g.gain.value=0;const Z=o.createGain();Z.gain.value=0,r.connect(j),r.connect(Y),Y.connect(ie),ie.connect(Y),Y.connect(V),V.connect(j),r.connect(P),P.connect(v),v.connect(j),r.connect(L),r.connect(_),te.connect(I),I.connect(L.delayTime),z.connect(g),g.connect(_.delayTime),L.connect(Z),_.connect(Z),Z.connect(j),te.start(),z.start();const ae=o.createGain();ae.gain.value=1,j.connect(F),F.connect(ae),this.connectOutputToDestination&&ae.connect(o.destination),n&&this.connectOutputToRecordingDestination&&ae.connect(n);const l=o.createBufferSource();l.buffer=Tn(o),l.loop=!0;const s=o.createBiquadFilter();s.type="highpass",s.frequency.value=1100,s.Q.value=.25;const W=o.createBiquadFilter();W.type="lowpass",W.frequency.value=5600,W.Q.value=.18;const A=o.createBiquadFilter();A.type="peaking",A.frequency.value=2400,A.Q.value=.7,A.gain.value=-2.5;const U=o.createStereoPanner(),M=o.createGain(),oe=o.createOscillator(),ge=o.createGain(),ve=o.createBufferSource(),le=o.createBiquadFilter(),$=o.createBiquadFilter(),fe=o.createGain(),Te=o.createGain();r.gain.value=0,M.gain.value=0,oe.type="sine",oe.frequency.value=.021,ge.gain.value=.08,ve.buffer=Dn(o),ve.loop=!0,le.type="highpass",le.frequency.value=1250,le.Q.value=.35,$.type="bandpass",$.frequency.value=2400,$.Q.value=.4,fe.gain.value=0,Te.gain.value=0,l.connect(s),s.connect(W),W.connect(A),A.connect(U),U.connect(M),M.connect(r),oe.connect(ge),ge.connect(U.pan),ve.connect(le),le.connect(Te),Te.connect(r),ve.connect($),$.connect(fe),fe.connect(r),l.start(),oe.start(),ve.start(),w.start(),R.start(),Object.assign(this.nodes,{audioContext:o,masterGain:r,radioToneHighpass:u,radioToneLowpass:m,radioTonePresence:i,recordingDestination:n,lofiLowpass:p,lofiHighshelf:T,lofiDrive:D,bitcrusher:f,bassEq:N,midEq:X,trebleEq:q,stereoWidth:G,roomDryGain:ee,roomConvolver:K,roomWetGain:J,wowFlutterDelay:H,wowLfo:w,wowLfoGain:pe,flutterLfo:R,flutterLfoGain:b,noiseSource:l,noiseFilter:A,noisePanner:U,noiseGain:M,noiseLfo:oe,noiseLfoGain:ge,crackleSource:ve,crackleFilter:le,vinylDustBedFilter:$,vinylDustBedGain:fe,crackleGain:Te,outputBus:j,echoDelayLine:Y,echoFeedbackGain:ie,echoWetGain:V,hallReverbConvolver:P,hallReverbWetGain:v,chorusDelay1:L,chorusDelay2:_,chorusLfo1:te,chorusLfo2:z,chorusLfoGain1:I,chorusLfoGain2:g,chorusWetGain:Z,tapeSaturator:se,busCompressor:F,fxOutputGain:ae})}const e=this.nodes.audioContext;if(e?.state==="suspended")try{await e.resume()}catch{}return this.updateAudioNodes(),e}async connectSourceNode(e){const o=await this.ensureInitialized();if(!o){this.debugAudio("connectSourceNode:no-context");return}if(this.nodes.sourceNode){try{this.nodes.sourceNode.disconnect()}catch{}this.nodes.sourceNode=null}e.connect(this.input),this.nodes.sourceNode=e,this.updateAudioNodes(),this.debugAudio("connectSourceNode:connected",{audioContextState:o.state})}async connect(e,o,r){const n=await this.ensureInitialized();if(!n){this.debugAudio("connect:no-context");return}const u=this.output;if(!u){this.debugAudio("connect:no-output-node",{audioContextState:n.state});return}if(Ln(e)){u.connect(e,o);return}u.connect(e,o,r)}disconnect(){const e=this.output;if(e)try{e.disconnect()}catch{}}async dispose(){try{this.nodes.noiseSource?.stop()}catch{}try{this.nodes.noiseLfo?.stop()}catch{}try{this.nodes.crackleSource?.stop()}catch{}try{this.nodes.wowLfo?.stop()}catch{}try{this.nodes.flutterLfo?.stop()}catch{}try{this.nodes.chorusLfo1?.stop()}catch{}try{this.nodes.chorusLfo2?.stop()}catch{}const e=this.nodes.audioContext;if(this.resetNodes(),!(!e||e.state==="closed"))try{await e.close()}catch{}}async disposeAudioEngine(){await this.dispose()}async ensureAudioContext(){return this.ensureInitialized()}}function Bn({context:t,connectOutputToDestination:e=!1,connectOutputToRecordingDestination:o=!1,...r}){const u={settings:yo(r),isPlaying:r.isPlaying??!0,isOutputEnabled:r.previewKind===void 0?!0:r.previewKind==="video"||r.previewKind==="audio"||r.previewKind==="capture"};return new Mn({context:t,instanceLabel:r.instanceLabel??"tetorica-retro-audio-engine",runtimeState:u,connectOutputToDestination:e,connectOutputToRecordingDestination:o,enableAudioWorklet:r.enableAudioWorklet})}function qt(){if(typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc.")return!1;const t=navigator.userAgent;return!/CriOS|FxiOS|OPiOS/i.test(t)}function Q(t){return{get current(){return t()}}}function Pn({instanceLabel:t,previewKind:e,previewKindRef:o,mediaRef:r,isPlaying:n,isPlayingRef:u}){const[m]=c.useState(()=>new AudioContext),[i]=c.useState(()=>{const d=xt()?.audio;return{isMuted:d?.isMuted??ue.isMuted,volume:d?.volume??ue.volume,playbackRate:d?.playbackRate??ue.playbackRate,isLooping:d?.isLooping??ue.isLooping,isAudioFxEnabled:d?.isAudioFxEnabled??ue.isAudioFxEnabled,lofiAmount:d?.lofiAmount??ue.lofiAmount,radioToneAmount:d?.radioToneAmount??ue.radioToneAmount,bitCrushAmount:d?.bitCrushAmount??ue.bitCrushAmount,sampleRateReductionAmount:d?.sampleRateReductionAmount??ue.sampleRateReductionAmount,bassAmount:d?.bassAmount??ue.bassAmount,midAmount:d?.midAmount??ue.midAmount,trebleAmount:d?.trebleAmount??ue.trebleAmount,stereoWidthAmount:d?.stereoWidthAmount??ue.stereoWidthAmount,smallSpeakerRoomAmount:d?.smallSpeakerRoomAmount??ue.smallSpeakerRoomAmount,wowFlutterAmount:d?.wowFlutterAmount??ue.wowFlutterAmount,isNoiseEnabled:d?.isNoiseEnabled??ue.isNoiseEnabled,noiseLevel:d?.noiseLevel??ue.noiseLevel,vinylDustAmount:d?.vinylDustAmount??ue.vinylDustAmount,delayAmount:d?.delayAmount??ue.delayAmount,reverbAmount:d?.reverbAmount??ue.reverbAmount,chorusAmount:d?.chorusAmount??ue.chorusAmount,tapeSaturationAmount:d?.tapeSaturationAmount??ue.tapeSaturationAmount,compressorAmount:d?.compressorAmount??ue.compressorAmount,fxOutputTrimAmount:d?.fxOutputTrimAmount??ue.fxOutputTrimAmount}}),p=c.useRef(i.isMuted),T=c.useRef(i.volume),D=c.useRef(i.playbackRate),f=c.useRef(i.isLooping),G=c.useRef(i.isAudioFxEnabled),S=c.useRef(i.lofiAmount),N=c.useRef(i.radioToneAmount),X=c.useRef(i.bitCrushAmount),q=c.useRef(i.sampleRateReductionAmount),ee=c.useRef(i.bassAmount),K=c.useRef(i.midAmount),J=c.useRef(i.trebleAmount),H=c.useRef(i.stereoWidthAmount),w=c.useRef(i.smallSpeakerRoomAmount),pe=c.useRef(i.wowFlutterAmount),R=c.useRef(i.isNoiseEnabled),b=c.useRef(i.noiseLevel),se=c.useRef(i.vinylDustAmount),j=c.useRef(i.delayAmount),F=c.useRef(i.reverbAmount),Y=c.useRef(i.chorusAmount),ie=c.useRef(i.tapeSaturationAmount),V=c.useRef(i.compressorAmount),P=c.useRef(i.fxOutputTrimAmount),[v,L]=c.useState(i.isMuted),[_,te]=c.useState(i.playbackRate),[z,I]=c.useState(i.volume),[g,Z]=c.useState(i.isLooping),[ae,l]=c.useState(i.isAudioFxEnabled),[s,W]=c.useState(i.lofiAmount),[A,U]=c.useState(i.radioToneAmount),[M,oe]=c.useState(i.bitCrushAmount),[ge,ve]=c.useState(i.sampleRateReductionAmount),[le,$]=c.useState(i.bassAmount),[fe,Te]=c.useState(i.midAmount),[we,de]=c.useState(i.trebleAmount),[be,Ge]=c.useState(i.stereoWidthAmount),[Ae,Ue]=c.useState(i.smallSpeakerRoomAmount),[De,ze]=c.useState(i.wowFlutterAmount),[Se,je]=c.useState(i.isNoiseEnabled),[Ee,qe]=c.useState(i.noiseLevel),[ye,Pe]=c.useState(i.vinylDustAmount),[he,Ce]=c.useState(i.delayAmount),[Oe,Me]=c.useState(i.reverbAmount),[Be,Re]=c.useState(i.chorusAmount),[Le,Ne]=c.useState(i.tapeSaturationAmount),[Ie,Ze]=c.useState(i.compressorAmount),[He,Je]=c.useState(i.fxOutputTrimAmount),a=c.useRef(null),[h]=c.useState(()=>Bn({context:m,instanceLabel:t,params:i,isPlaying:n,connectOutputToDestination:!0,connectOutputToRecordingDestination:!0})),[O]=c.useState(()=>({audioContextRef:Q(()=>h.audioContext),masterGainRef:Q(()=>h.masterGain),radioToneHighpassRef:Q(()=>h.radioToneHighpass),radioToneLowpassRef:Q(()=>h.radioToneLowpass),radioTonePresenceRef:Q(()=>h.radioTonePresence),recordingDestinationRef:Q(()=>h.recordingDestination),lofiLowpassRef:Q(()=>h.lofiLowpass),lofiHighshelfRef:Q(()=>h.lofiHighshelf),lofiDriveRef:Q(()=>h.lofiDrive),bitcrusherRef:Q(()=>h.bitcrusher),bassEqRef:Q(()=>h.bassEq),midEqRef:Q(()=>h.midEq),trebleEqRef:Q(()=>h.trebleEq),stereoWidthRef:Q(()=>h.stereoWidth),roomDryGainRef:Q(()=>h.roomDryGain),roomConvolverRef:Q(()=>h.roomConvolver),roomWetGainRef:Q(()=>h.roomWetGain),wowFlutterDelayRef:Q(()=>h.wowFlutterDelay),wowLfoRef:Q(()=>h.wowLfo),wowLfoGainRef:Q(()=>h.wowLfoGain),flutterLfoRef:Q(()=>h.flutterLfo),flutterLfoGainRef:Q(()=>h.flutterLfoGain),noiseSourceRef:Q(()=>h.noiseSource),noiseFilterRef:Q(()=>h.noiseFilter),noisePannerRef:Q(()=>h.noisePanner),noiseGainRef:Q(()=>h.noiseGain),noiseLfoRef:Q(()=>h.noiseLfo),noiseLfoGainRef:Q(()=>h.noiseLfoGain),crackleSourceRef:Q(()=>h.crackleSource),crackleFilterRef:Q(()=>h.crackleFilter),vinylDustBedFilterRef:Q(()=>h.vinylDustBedFilter),vinylDustBedGainRef:Q(()=>h.vinylDustBedGain),crackleGainRef:Q(()=>h.crackleGain)})),{audioContextRef:ce,masterGainRef:E,radioToneHighpassRef:y,radioToneLowpassRef:xe,radioTonePresenceRef:ne,recordingDestinationRef:nt,lofiLowpassRef:Ct,lofiHighshelfRef:rt,lofiDriveRef:St,bitcrusherRef:yt,bassEqRef:Rt,midEqRef:it,trebleEqRef:Tt,stereoWidthRef:at,roomDryGainRef:Dt,roomConvolverRef:st,roomWetGainRef:Lt,wowFlutterDelayRef:lt,wowLfoRef:Mt,wowLfoGainRef:ct,flutterLfoRef:Bt,flutterLfoGainRef:ut,noiseSourceRef:Pt,noiseFilterRef:dt,noisePannerRef:Et,noiseGainRef:It,noiseLfoRef:kt,noiseLfoGainRef:Ft,crackleSourceRef:Gt,crackleFilterRef:Nt,vinylDustBedFilterRef:Wt,vinylDustBedGainRef:Ut,crackleGainRef:Ot}=O,$e=(d,Ve)=>h.debugAudio(d,Ve),ht=()=>h.ensureInitialized(),Ht=()=>h.ensureInitialized(),Qe=()=>h.updateAudioNodes(),Vt=d=>h.connectSourceNode(d),_t=()=>h.disposeAudioEngine(),mt=(d,Ve)=>h.setParams(d,Ve),zt=d=>h.setIsPlaying(d),jt=d=>h.setOutputEnabled(d),Zt=async d=>{const Ve=await ht();if(!Ve||!h.input){$e("connectMediaAudio:no-context",{mediaTag:d.tagName});return}a.current&&($e("connectMediaAudio:disconnect-previous",{mediaTag:d.tagName}),a.current.disconnect(),a.current=null);try{const _e=Ve.createMediaElementSource(d);_e.connect(h.input),a.current=_e,qt()?(d.muted=!1,d.volume=0):(d.muted=p.current,d.volume=p.current?0:T.current),$e("connectMediaAudio:connected",{audioContextState:Ve.state,mediaTag:d.tagName,previewKind:o.current}),Qe()}catch(_e){throw $e("connectMediaAudio:error",{audioContextState:Ve.state,mediaTag:d.tagName,message:_e instanceof Error?_e.message:String(_e),previewKind:o.current}),_e}},Xt=()=>{const d=a.current;!d||!h.input||(d.disconnect(),d.connect(h.input),Qe())},Yt=async()=>{a.current?.disconnect(),a.current=null,await _t()},pt=d=>{p.current=d.isMuted,T.current=d.volume,D.current=d.playbackRate,f.current=d.isLooping,G.current=d.isAudioFxEnabled,S.current=d.lofiAmount,N.current=d.radioToneAmount,X.current=d.bitCrushAmount,q.current=d.sampleRateReductionAmount,ee.current=d.bassAmount,K.current=d.midAmount,J.current=d.trebleAmount,H.current=d.stereoWidthAmount,w.current=d.smallSpeakerRoomAmount,pe.current=d.wowFlutterAmount,R.current=d.isNoiseEnabled,b.current=d.noiseLevel,se.current=d.vinylDustAmount,j.current=d.delayAmount,F.current=d.reverbAmount,Y.current=d.chorusAmount,ie.current=d.tapeSaturationAmount,V.current=d.compressorAmount,P.current=d.fxOutputTrimAmount,L(d.isMuted),I(d.volume),te(d.playbackRate),Z(d.isLooping),l(d.isAudioFxEnabled),W(d.lofiAmount),U(d.radioToneAmount),oe(d.bitCrushAmount),ve(d.sampleRateReductionAmount),$(d.bassAmount),Te(d.midAmount),de(d.trebleAmount),Ge(d.stereoWidthAmount),Ue(d.smallSpeakerRoomAmount),ze(d.wowFlutterAmount),je(d.isNoiseEnabled),qe(d.noiseLevel),Pe(d.vinylDustAmount),Ce(d.delayAmount),Me(d.reverbAmount),Re(d.chorusAmount),Ne(d.tapeSaturationAmount),Ze(d.compressorAmount),Je(d.fxOutputTrimAmount),r.current&&(qt()&&a.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=d.isMuted,r.current.volume=d.volume),r.current.playbackRate=d.playbackRate,r.current.loop=d.isLooping),mt(d),window.requestAnimationFrame(Qe)},Xe=()=>pt({...ue});return c.useEffect(()=>{p.current=v,T.current=z,D.current=_,f.current=g,G.current=ae,S.current=s,N.current=A,X.current=M,q.current=ge,ee.current=le,K.current=fe,J.current=we,H.current=be,w.current=Ae,pe.current=De,R.current=Se,b.current=Ee,se.current=ye,j.current=he,F.current=Oe,Y.current=Be,ie.current=Le,V.current=Ie,P.current=He,mt({isMuted:v,volume:z,playbackRate:_,isLooping:g,isAudioFxEnabled:ae,lofiAmount:s,radioToneAmount:A,bitCrushAmount:M,sampleRateReductionAmount:ge,bassAmount:le,midAmount:fe,trebleAmount:we,stereoWidthAmount:be,smallSpeakerRoomAmount:Ae,wowFlutterAmount:De,isNoiseEnabled:Se,noiseLevel:Ee,vinylDustAmount:ye,delayAmount:he,reverbAmount:Oe,chorusAmount:Be,tapeSaturationAmount:Le,compressorAmount:Ie,fxOutputTrimAmount:He},!0),zt(n),jt(e==="video"||e==="audio"||e==="capture"),r.current&&(qt()&&a.current?(r.current.muted=!1,r.current.volume=0):(r.current.muted=v,r.current.volume=v?0:z),r.current.playbackRate=_,r.current.loop=g)},[v,z,ae,s,A,M,ge,le,fe,we,be,Ae,De,Se,Ee,ye,he,Oe,Be,Le,Ie,He,n,_,g,e]),c.useEffect(()=>{const d=setTimeout(()=>{fn({isMuted:v,volume:z,playbackRate:_,isLooping:g,isAudioFxEnabled:ae,lofiAmount:s,radioToneAmount:A,bitCrushAmount:M,sampleRateReductionAmount:ge,bassAmount:le,midAmount:fe,trebleAmount:we,stereoWidthAmount:be,smallSpeakerRoomAmount:Ae,wowFlutterAmount:De,isNoiseEnabled:Se,noiseLevel:Ee,vinylDustAmount:ye,delayAmount:he,reverbAmount:Oe,chorusAmount:Be,tapeSaturationAmount:Le,compressorAmount:Ie,fxOutputTrimAmount:He})},300);return()=>clearTimeout(d)},[v,z,_,g,ae,s,A,M,ge,le,fe,we,be,Ae,De,Se,Ee,ye,he,Oe,Be,Le,Ie,He]),{audioContextRef:ce,mediaSourceRef:a,masterGainRef:E,radioToneHighpassRef:y,radioToneLowpassRef:xe,radioTonePresenceRef:ne,recordingDestinationRef:nt,lofiLowpassRef:Ct,lofiHighshelfRef:rt,lofiDriveRef:St,bitcrusherRef:yt,bassEqRef:Rt,midEqRef:it,trebleEqRef:Tt,stereoWidthRef:at,roomDryGainRef:Dt,roomConvolverRef:st,roomWetGainRef:Lt,wowFlutterDelayRef:lt,wowLfoRef:Mt,wowLfoGainRef:ct,flutterLfoRef:Bt,flutterLfoGainRef:ut,noiseSourceRef:Pt,noiseFilterRef:dt,noisePannerRef:Et,noiseGainRef:It,noiseLfoRef:kt,noiseLfoGainRef:Ft,crackleSourceRef:Gt,crackleFilterRef:Nt,vinylDustBedFilterRef:Wt,vinylDustBedGainRef:Ut,crackleGainRef:Ot,isMutedRef:p,volumeRef:T,playbackRateRef:D,isLoopingRef:f,isAudioFxEnabledRef:G,lofiAmountRef:S,radioToneAmountRef:N,bitCrushAmountRef:X,sampleRateReductionAmountRef:q,bassAmountRef:ee,midAmountRef:K,trebleAmountRef:J,stereoWidthAmountRef:H,smallSpeakerRoomAmountRef:w,wowFlutterAmountRef:pe,isNoiseEnabledRef:R,noiseLevelRef:b,vinylDustAmountRef:se,delayAmountRef:j,reverbAmountRef:F,chorusAmountRef:Y,tapeSaturationAmountRef:ie,compressorAmountRef:V,fxOutputTrimAmountRef:P,isMuted:v,setIsMuted:L,playbackRate:_,setPlaybackRate:te,volume:z,setVolume:I,isLooping:g,setIsLooping:Z,isAudioFxEnabled:ae,setIsAudioFxEnabled:l,lofiAmount:s,setLofiAmount:W,radioToneAmount:A,setRadioToneAmount:U,bitCrushAmount:M,setBitCrushAmount:oe,sampleRateReductionAmount:ge,setSampleRateReductionAmount:ve,bassAmount:le,setBassAmount:$,midAmount:fe,setMidAmount:Te,trebleAmount:we,setTrebleAmount:de,stereoWidthAmount:be,setStereoWidthAmount:Ge,smallSpeakerRoomAmount:Ae,setSmallSpeakerRoomAmount:Ue,wowFlutterAmount:De,setWowFlutterAmount:ze,isNoiseEnabled:Se,setIsNoiseEnabled:je,noiseLevel:Ee,setNoiseLevel:qe,vinylDustAmount:ye,setVinylDustAmount:Pe,delayAmount:he,setDelayAmount:Ce,reverbAmount:Oe,setReverbAmount:Me,chorusAmount:Be,setChorusAmount:Re,tapeSaturationAmount:Le,setTapeSaturationAmount:Ne,compressorAmount:Ie,setCompressorAmount:Ze,fxOutputTrimAmount:He,setFxOutputTrimAmount:Je,debugAudio:$e,ensureAudioContext:Ht,ensureInitialized:ht,updateAudioNodes:Qe,connectSourceNode:Vt,connectMediaAudio:Zt,reconnectCurrentMediaAudio:Xt,applyAudioSettings:pt,resetAudioSettings:Xe,disposeAudioEngine:Yt}}const En={gray:{label:"Gray",rgb:[1,1,1]},green:{label:"Green",rgb:[.72,1,.58]},amber:{label:"Amber",rgb:[1,.82,.45]},ice:{label:"Ice",rgb:[.7,.9,1]}},ot={chunky:{label:"Chunky",width:256,height:192,colors:8,dither:.2,palette:"free",curvature:0,scanline:0,scanline2:.015,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.8,neonSaturation:1,neonDetail:1},arcade:{label:"Arcade",width:320,height:224,colors:12,dither:.28,palette:"free",curvature:.04,scanline:.08,scanline2:0,vignette:.08,glow:.06,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:.9,neonSaturation:1,neonDetail:1},gb:{label:"GB",width:200,height:180,colors:4,dither:.08,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},gba:{label:"GBA",width:320,height:200,colors:48,dither:.06,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_512:{label:"PC-98 512-color",width:640,height:400,colors:8,dither:.12,palette:"pc98_512",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_4096:{label:"PC-98 4096-color",width:640,height:400,colors:16,dither:.08,palette:"pc98_4096",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.05,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98:{label:"Color 16",width:640,height:400,colors:16,dither:.35,palette:"pc98",curvature:.02,scanline:.05,scanline2:0,vignette:.06,glow:.05,phosphor:.04,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},pc98_tile:{label:"PC-98 Tile",width:1280,height:800,colors:32,dither:0,palette:"pc98_tile",curvature:.05,scanline:0,scanline2:.01,vignette:.02,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color32:{label:"Color 32",width:320,height:200,colors:32,dither:.24,palette:"color32",curvature:.03,scanline:.06,scanline2:0,vignette:.05,glow:.04,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},color64:{label:"Color 64",width:320,height:200,colors:64,dither:.2,palette:"color64",curvature:.03,scanline:.04,scanline2:0,vignette:.04,glow:.03,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},monochrome:{label:"Mono",width:640,height:400,colors:16,dither:.18,palette:"mono",curvature:.05,scanline:.1,scanline2:0,vignette:.08,glow:.07,phosphor:.02,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},greenTerminal:{label:"Green Terminal",width:640,height:400,colors:16,dither:.14,palette:"mono",curvature:.07,scanline:.16,scanline2:0,vignette:.1,glow:.09,phosphor:.06,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"green",neonBoost:1,neonSaturation:1,neonDetail:1},amberCrt:{label:"Amber CRT",width:960,height:600,colors:32,dither:.16,palette:"mono",curvature:.06,scanline:0,scanline2:.02,vignette:.11,glow:.1,phosphor:.05,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"amber",neonBoost:1,neonSaturation:1,neonDetail:1},neonLine:{label:"Neon Line",width:960,height:540,colors:24,dither:0,palette:"neon",curvature:0,scanline:0,scanline2:0,vignette:.04,glow:.18,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1.15,neonSaturation:1.2,neonDetail:1.05},lcdIce:{label:"LCD Ice",width:480,height:300,colors:16,dither:.06,palette:"mono",curvature:0,scanline:0,scanline2:0,vignette:.015,glow:0,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"ice",neonBoost:1,neonSaturation:1,neonDetail:1},phosphorDot:{label:"Phosphor Dot",width:320,height:180,colors:32,dither:0,palette:"free",curvature:.065,scanline:0,scanline2:.02,vignette:.3,glow:.08,phosphor:0,spotMask:1,bulbRadius:.5,blackFloor:.001,phosphorDotLightBalance:.22,phosphorDotInternalScale:!0,phosphorDotBrightCore:!1,phosphorDotCellFill:.12,phosphorDotFlatDisc:!0,phosphorDotNeighborBlend:!0,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtOnly:{label:"CRT Only",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.02,vignette:.05,glow:.06,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},crtEdge:{label:"CRT Edge",width:1280,height:800,colors:256,dither:.12,palette:"free",curvature:.03,scanline:0,scanline2:.08,vignette:.05,glow:.06,edgeBoost:1.5,phosphor:.03,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1},animeToon:{label:"Anime Toon",width:640,height:360,colors:8,dither:0,palette:"free",curvature:0,scanline:0,scanline2:0,vignette:0,glow:0,smoothStrength:.35,toonSteps:4,edgeBoost:1.5,phosphor:0,spotMask:0,bulbRadius:.3,blackFloor:.008,monoTint:"gray",neonBoost:1,neonSaturation:1,neonDetail:1}},In=t=>t==="pc98"?1:t==="pc98_tile"?2:t==="pc98_512"?3:t==="pc98_512_sat"?4:t==="pc98_4096"?5:t==="color32"?6:t==="color64"?7:t==="mono"?8:t==="neon"?9:0,kn=`#version 300 es
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
`,Fn=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

void main(void)
{
  finalColor = texture(uTexture, vTextureCoord);
}
`,uo=`#version 300 es
in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vMaskCoord;

void main() {
  vec2 uv = (aPosition + 1.0) * 0.5;
  vTextureCoord = uv;
  vMaskCoord = uv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Gn=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),ho=640,Jt=()=>typeof performance<"u"?performance.now():Date.now(),$t=t=>typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement,mo=t=>typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,Nn=t=>typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement,po=t=>!!(t&&typeof t=="object"&&"width"in t&&"height"in t&&"data"in t),vt=t=>({width:$t(t)?t.videoWidth:mo(t)?t.naturalWidth:t.width,height:$t(t)?t.videoHeight:mo(t)?t.naturalHeight:t.height}),Wn=(t,e,o)=>$t(t)&&(e>ho||o>ho),wt=t=>t.spotMaskStrength>.001&&(t.phosphorDotInternalScale||t.phosphorDotBrightCore||t.phosphorDotCellFill>.001||t.phosphorDotFlatDisc||t.phosphorDotNeighborBlend),Un=t=>wt(t)&&t.phosphorDotInternalScale?2:1,On=(t,e,o,r)=>{if(o===void 0||r===void 0||o<=0||r<=0)return{width:t,height:e};const n=o/r;return t/e>n?{width:Math.max(1,Math.round(e*n)),height:e}:{width:t,height:Math.max(1,Math.round(t/n))}},Hn=(t,e,o,r,n,u)=>{if(!wt(o)||n===void 0||u===void 0||n<=0||u<=0)return{width:t,height:e};const m=Math.max(1.1,2.15+o.bulbRadius*1.15),i=Math.max(1,m/Math.max(r,1)),p=Math.max(1,Math.floor(n/i)),T=Math.max(1,Math.floor(u/i)),D=Math.min(1,p/Math.max(t,1),T/Math.max(e,1));return{width:Math.max(1,Math.round(t*D)),height:Math.max(1,Math.round(e*D))}},Qt=(t,e,o,r,n)=>{const u=Un(t),m=Math.max(t.targetWidth,1),i=Math.max(t.targetHeight,1),p=t.matchTargetAspect?On(m,i,e,o):{width:m,height:i},T=p.width*u,D=p.height*u,f=Hn(T,D,t,u,r,n);return{width:f.width,height:f.height,sampleWidth:Math.max(1,Math.round(T)),sampleHeight:Math.max(1,Math.round(D)),internalScale:u,isPhosphorDotMode:wt(t)}};function go(t,e,o){const r=t.createShader(e);if(!r)throw new Error("Failed to create shader.");if(t.shaderSource(r,o),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){const n=t.getShaderInfoLog(r)||"Unknown shader compile error.";throw t.deleteShader(r),new Error(n)}return r}function fo(t,e,o){const r=go(t,t.VERTEX_SHADER,e),n=go(t,t.FRAGMENT_SHADER,o),u=t.createProgram();if(!u)throw t.deleteShader(r),t.deleteShader(n),new Error("Failed to create WebGL program.");if(t.attachShader(u,r),t.attachShader(u,n),t.bindAttribLocation(u,0,"aPosition"),t.linkProgram(u),t.deleteShader(r),t.deleteShader(n),!t.getProgramParameter(u,t.LINK_STATUS)){const m=t.getProgramInfoLog(u)||"Unknown program link error.";throw t.deleteProgram(u),new Error(m)}return u}class Vn{gl;filterProgram;passthroughProgram;texture;uniformLocations;uploadCanvas=null;uploadContext=null;currentSource=null;currentFilterState=null;outputEnabled=!0;startedAt=Jt();constructor(e){this.gl=e,this.filterProgram=fo(e,uo,kn),this.passthroughProgram=fo(e,uo,Fn);const o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o),e.bufferData(e.ARRAY_BUFFER,Gn,e.STATIC_DRAW);const r=e.createVertexArray();e.bindVertexArray(r),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const n=e.createTexture();if(!n)throw new Error("Failed to create WebGL texture.");this.texture=n,e.bindTexture(e.TEXTURE_2D,n),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.useProgram(this.filterProgram),e.uniform1i(e.getUniformLocation(this.filterProgram,"uTexture"),0),e.useProgram(this.passthroughProgram),e.uniform1i(e.getUniformLocation(this.passthroughProgram,"uTexture"),0),this.uniformLocations={uTargetSize:e.getUniformLocation(this.filterProgram,"uTargetSize"),uSampleTargetSize:e.getUniformLocation(this.filterProgram,"uSampleTargetSize"),uColorLevels:e.getUniformLocation(this.filterProgram,"uColorLevels"),uDitherStrength:e.getUniformLocation(this.filterProgram,"uDitherStrength"),uPaletteMode:e.getUniformLocation(this.filterProgram,"uPaletteMode"),uCurvature:e.getUniformLocation(this.filterProgram,"uCurvature"),uScanlineStrength:e.getUniformLocation(this.filterProgram,"uScanlineStrength"),uScanline2Strength:e.getUniformLocation(this.filterProgram,"uScanline2Strength"),uScanlineBrightnessFade:e.getUniformLocation(this.filterProgram,"uScanlineBrightnessFade"),uVignetteStrength:e.getUniformLocation(this.filterProgram,"uVignetteStrength"),uGlowStrength:e.getUniformLocation(this.filterProgram,"uGlowStrength"),uSmoothStrength:e.getUniformLocation(this.filterProgram,"uSmoothStrength"),uToonSteps:e.getUniformLocation(this.filterProgram,"uToonSteps"),uEdgeBoost:e.getUniformLocation(this.filterProgram,"uEdgeBoost"),uPhosphorStrength:e.getUniformLocation(this.filterProgram,"uPhosphorStrength"),uSpotMaskStrength:e.getUniformLocation(this.filterProgram,"uSpotMaskStrength"),uBulbRadius:e.getUniformLocation(this.filterProgram,"uBulbRadius"),uBlackFloor:e.getUniformLocation(this.filterProgram,"uBlackFloor"),uPhosphorDotLightBalance:e.getUniformLocation(this.filterProgram,"uPhosphorDotLightBalance"),uPixelAspect:e.getUniformLocation(this.filterProgram,"uPixelAspect"),uPhosphorDotMode:e.getUniformLocation(this.filterProgram,"uPhosphorDotMode"),uPhosphorDotInternalScale:e.getUniformLocation(this.filterProgram,"uPhosphorDotInternalScale"),uPhosphorDotBrightCore:e.getUniformLocation(this.filterProgram,"uPhosphorDotBrightCore"),uPhosphorDotCellFill:e.getUniformLocation(this.filterProgram,"uPhosphorDotCellFill"),uPhosphorDotFlatDisc:e.getUniformLocation(this.filterProgram,"uPhosphorDotFlatDisc"),uPhosphorDotNeighborBlend:e.getUniformLocation(this.filterProgram,"uPhosphorDotNeighborBlend"),uCloseUpNoiseStrength:e.getUniformLocation(this.filterProgram,"uCloseUpNoiseStrength"),uMonoTint:e.getUniformLocation(this.filterProgram,"uMonoTint"),uNeonBoost:e.getUniformLocation(this.filterProgram,"uNeonBoost"),uNeonSaturation:e.getUniformLocation(this.filterProgram,"uNeonSaturation"),uNeonDetail:e.getUniformLocation(this.filterProgram,"uNeonDetail"),uTime:e.getUniformLocation(this.filterProgram,"uTime")}}setSource(e){this.currentSource=e}setFilterState(e){this.currentFilterState=e}setOutputEnabled(e){this.outputEnabled=e}resetAnimationClock(e=Jt()){this.startedAt=e}readPixels(){const e=new Uint8Array(Math.max(this.gl.drawingBufferWidth,1)*Math.max(this.gl.drawingBufferHeight,1)*4);return this.gl.readPixels(0,0,this.gl.drawingBufferWidth,this.gl.drawingBufferHeight,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),e}render(){const{gl:e}=this;e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.clearColor(.01,.02,.01,1),e.clear(e.COLOR_BUFFER_BIT);const o=this.currentSource,r=this.currentFilterState;if(!this.outputEnabled||!o||!r)return;const n=this.getUploadSource(o,r);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.texture);const u=r.isFilterEnabled?e.LINEAR:e.NEAREST;if(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),po(n)?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data):e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),r.isFilterEnabled){const m=vt(o);this.applyFilterUniforms(r,m.width,m.height),e.useProgram(this.filterProgram)}else e.useProgram(this.passthroughProgram);e.drawArrays(e.TRIANGLES,0,6)}dispose(){this.gl.deleteTexture(this.texture),this.gl.deleteProgram(this.filterProgram),this.gl.deleteProgram(this.passthroughProgram),this.currentSource=null,this.currentFilterState=null,this.uploadCanvas=null,this.uploadContext=null}getUploadSource(e,o){if(po(e)||!o.isFilterEnabled)return e;const r=vt(e);if(r.width<=0||r.height<=0||Wn(e,r.width,r.height))return e;const{width:n,height:u,sampleWidth:m,sampleHeight:i,isPhosphorDotMode:p}=Qt(o,r.width,r.height),T=Math.max(1,Math.round(p?m:n)),D=Math.max(1,Math.round(p?i:u)),f=this.ensureUploadContext();return!f||!this.uploadCanvas?e:(this.uploadCanvas.width!==T&&(this.uploadCanvas.width=T),this.uploadCanvas.height!==D&&(this.uploadCanvas.height=D),f.imageSmoothingEnabled=!0,f.imageSmoothingQuality="high",f.fillStyle="#000",f.fillRect(0,0,T,D),f.drawImage(e,0,0,T,D),this.uploadCanvas)}ensureUploadContext(){if(this.uploadCanvas&&this.uploadContext)return this.uploadContext;if(typeof document>"u")return null;const e=document.createElement("canvas"),o=e.getContext("2d",{alpha:!1,desynchronized:!0});return o?(this.uploadCanvas=e,this.uploadContext=o,o):null}applyFilterUniforms(e,o,r){const{gl:n}=this,u=Nn(n.canvas)?n.canvas:null,m=Math.max(u?.clientWidth??n.drawingBufferWidth,1),i=Math.max(u?.clientHeight??n.drawingBufferHeight,1),{width:p,height:T,sampleWidth:D,sampleHeight:f,isPhosphorDotMode:G}=Qt(e,o,r,m,i);n.useProgram(this.filterProgram),n.uniform2f(this.uniformLocations.uTargetSize,p,T),n.uniform2f(this.uniformLocations.uSampleTargetSize,D,f),n.uniform1f(this.uniformLocations.uColorLevels,Math.max(e.colorLevels,2)),n.uniform1f(this.uniformLocations.uDitherStrength,e.ditherStrength),n.uniform1f(this.uniformLocations.uPaletteMode,In(e.paletteMode)),n.uniform1f(this.uniformLocations.uCurvature,e.curvature),n.uniform1f(this.uniformLocations.uScanlineStrength,e.scanlineStrength),n.uniform1f(this.uniformLocations.uScanline2Strength,e.scanline2Strength),n.uniform1f(this.uniformLocations.uScanlineBrightnessFade,e.scanlineBrightnessFade),n.uniform1f(this.uniformLocations.uVignetteStrength,e.vignetteStrength),n.uniform1f(this.uniformLocations.uGlowStrength,e.glowStrength),n.uniform1f(this.uniformLocations.uSmoothStrength,e.smoothStrength),n.uniform1f(this.uniformLocations.uToonSteps,e.toonSteps),n.uniform1f(this.uniformLocations.uEdgeBoost,e.edgeBoost),n.uniform1f(this.uniformLocations.uPhosphorStrength,e.phosphorStrength),n.uniform1f(this.uniformLocations.uSpotMaskStrength,e.spotMaskStrength),n.uniform1f(this.uniformLocations.uBulbRadius,e.bulbRadius),n.uniform1f(this.uniformLocations.uBlackFloor,e.blackFloor),n.uniform1f(this.uniformLocations.uPhosphorDotLightBalance,e.phosphorDotLightBalance),n.uniform1f(this.uniformLocations.uPixelAspect,Math.max(n.drawingBufferWidth,1)*T/(Math.max(n.drawingBufferHeight,1)*p)),n.uniform1f(this.uniformLocations.uPhosphorDotMode,G?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotInternalScale,e.phosphorDotInternalScale?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotBrightCore,e.phosphorDotBrightCore?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotCellFill,e.phosphorDotCellFill),n.uniform1f(this.uniformLocations.uPhosphorDotFlatDisc,e.phosphorDotFlatDisc?1:0),n.uniform1f(this.uniformLocations.uPhosphorDotNeighborBlend,e.phosphorDotNeighborBlend?1:0),n.uniform1f(this.uniformLocations.uCloseUpNoiseStrength,e.closeUpNoiseStrength),n.uniform3f(this.uniformLocations.uMonoTint,...En[e.monoTint].rgb),n.uniform1f(this.uniformLocations.uNeonBoost,e.neonBoost),n.uniform1f(this.uniformLocations.uNeonSaturation,e.neonSaturation),n.uniform1f(this.uniformLocations.uNeonDetail,e.neonDetail),n.uniform1f(this.uniformLocations.uTime,(Jt()-this.startedAt)/1e3)}}function _n({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:r,isPlayingRef:n,previewKindRef:u,debugVideo:m}){const i=c.useRef(null),p=c.useRef(null),T=c.useRef(null),D=c.useRef(null),f=c.useRef(null),G=c.useRef(null),S=c.useRef(null),N=c.useRef(null),X=c.useRef(()=>{}),q=c.useRef(t),ee=c.useRef(r),K=c.useRef(!1),J=c.useRef(null),H=c.useRef(null),w=c.useRef(null),[pe,R]=c.useState(!1),[b,se]=c.useState(null);q.current=t,ee.current=r;const j=c.useCallback(l=>{se(s=>{const W=typeof l=="function"?l(s):l;return w.current=W,W})},[]),F=c.useCallback(()=>{const l=p.current,s=f.current;l&&(l.pipeline.setOutputEnabled(ee.current),l.pipeline.setSource(s),l.pipeline.setFilterState(q.current),l.pipeline.render())},[]);c.useLayoutEffect(()=>{X.current=F},[F]);const Y=c.useCallback(()=>{K.current=!1,N.current!==null&&(window.cancelAnimationFrame(N.current),N.current=null)},[]),ie=c.useCallback(()=>{if(K.current)return;K.current=!0;const l=()=>{if(!K.current)return;if(X.current(),!(u.current==="video"||u.current==="capture"||u.current==="image"||n.current)){N.current=null,K.current=!1;return}N.current=window.requestAnimationFrame(l)};N.current=window.requestAnimationFrame(l)},[n,u]),V=c.useCallback(()=>{F()},[F]),P=c.useCallback(()=>{F()},[F]),v=c.useCallback(()=>{F()},[F]),L=c.useCallback(()=>(p.current&&p.current.pipeline.resetAnimationClock(),G.current={},F(),G.current),[F]),_=c.useCallback((l,s,W)=>{if(!l)return;const{width:A,height:U}=vt(W);if(A<=0||U<=0)return;const M=i.current,oe=M?.clientWidth??l.canvas.width,ge=M?.clientHeight??l.canvas.height,le=e==="width"?oe/A:Math.min(oe/A,ge/U),$=A*le,fe=U*le,Te=(oe-$)/2,we=(ge-fe)/2,de={width:$,height:fe,x:Te,y:we},be=w.current;return be&&be.width===de.width&&be.height===de.height&&be.x===de.x&&be.y===de.y?be:(w.current=de,j(de),de)},[e,j]),te=c.useCallback(()=>{f.current&&_(p.current,null,f.current)},[_]),z=c.useCallback(()=>{F()},[F]),I=c.useCallback(()=>{const l=p.current,s=i.current;if(!l||!s)return;te();const W=w.current??{x:0,y:0,width:s.clientWidth,height:s.clientHeight},A=Math.max(1,Math.round(W.width)),U=Math.max(1,Math.round(W.height)),M=q.current,oe=f.current?vt(f.current):null,{width:ge,height:ve}=Qt(M,oe?.width,oe?.height,A,U),le=Math.max(1,Math.round(A*Math.max(1,o))),$=Math.max(1,Math.round(U*Math.max(1,o))),fe=Math.max(1,Math.round(Math.max(1,ge)*Math.max(1,o))),Te=Math.max(1,Math.round(Math.max(1,ve)*Math.max(1,o))),we=wt(M),de=M.isFilterEnabled&&we?Math.max(le,fe):le,be=M.isFilterEnabled&&we?Math.max($,Te):$;l.canvas.width!==de&&(l.canvas.width=de),l.canvas.height!==be&&(l.canvas.height=be),l.canvas.style.position="absolute",l.canvas.style.left=`${Math.round(W.x)}px`,l.canvas.style.top=`${Math.round(W.y)}px`,l.canvas.style.width=`${A}px`,l.canvas.style.height=`${U}px`,l.canvas.style.imageRendering="pixelated",F()},[te,F,o]),g=c.useCallback(()=>{J.current!==null&&(window.cancelAnimationFrame(J.current),J.current=null),H.current!==null&&(window.clearTimeout(H.current),H.current=null),J.current=window.requestAnimationFrame(()=>{J.current=null,I()}),H.current=window.setTimeout(()=>{H.current=null,I()},120)},[I]),Z=c.useCallback(async()=>{if(!p.current){if(S.current){await S.current;return}S.current=(async()=>{const l=i.current;if(!l||p.current)return;const s=typeof performance<"u"?performance.now():Date.now();m("startup:initPixi:start",{hostConnected:l.isConnected,hostWidth:l.clientWidth??null,hostHeight:l.clientHeight??null,resolution:o});const W=document.createElement("canvas");W.style.display="block",W.style.width="100%",W.style.height="100%",W.style.imageRendering="pixelated",W.style.background="#020617";const A=W.getContext("webgl2");if(!A)throw new Error("WebGL2 is not available in this app view.");m("startup:initPixi:webgl2-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-s)*10)/10});const U={canvas:W,pipeline:new Vn(A),ticker:{start:ie,stop:Y}},M=i.current;if(!M||M!==l||!M.isConnected)return;M.style.position="relative",M.appendChild(W),p.current=U,G.current={},R(!0),m("initWebGL:ready",{hostWidth:M.clientWidth??null,hostHeight:M.clientHeight??null,resolution:o}),m("startup:initPixi:renderer-ready",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-s)*10)/10}),I();const oe=u.current==="video"||u.current==="capture"||u.current==="image"||n.current;r&&oe&&ie(),m("startup:initPixi:done",{elapsedMs:Math.round(((typeof performance<"u"?performance.now():Date.now())-s)*10)/10,shouldAnimateOnInit:oe})})();try{await S.current}finally{S.current=null}}},[m,r,I,o,ie,Y]),ae=c.useCallback(()=>{S.current=null,Y(),J.current!==null&&(window.cancelAnimationFrame(J.current),J.current=null),H.current!==null&&(window.clearTimeout(H.current),H.current=null);const l=p.current;l&&(l.pipeline.dispose(),l.canvas.remove()),p.current=null,G.current=null,j(null),R(!1)},[Y,j]);return c.useEffect(()=>{const l=i.current;if(!l)return;if(typeof ResizeObserver<"u"){const W=new ResizeObserver(()=>{g()});return W.observe(l),()=>{W.disconnect()}}const s=()=>{g()};return window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}},[g]),{canvasHostRef:i,appRef:p,spriteRef:T,textureRef:D,previewElementRef:f,filterRef:G,isRendererReady:pe,viewportRect:b,setViewportRect:j,applyFilterState:V,createVideoTexture:l=>null,destroyPixi:ae,fitCurrentSprite:te,fitSprite:_,initPixi:Z,refreshLayout:I,resetFilterInstance:L,safeRender:z,scheduleRefreshLayout:g,syncSpriteFilter:P,syncTexturePresentation:v}}const zn=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),jn=()=>typeof navigator>"u"||navigator.vendor!=="Apple Computer, Inc."?!1:!/CriOS|FxiOS|OPiOS/i.test(navigator.userAgent);function Zn({appRef:t,spriteRef:e,textureRef:o,previewElementRef:r,mediaRef:n,objectUrlRef:u,streamRef:m,streamOwnedRef:i,previewRequestIdRef:p,isPlayingRef:T,previewKindRef:D,audioContextRef:f,mediaSourceRef:G,masterGainRef:S,noiseGainRef:N,isMutedRef:X,volumeRef:q,playbackRateRef:ee,isLoopingRef:K,isAudioFxEnabled:J,lofiAmount:H,bitCrushAmount:w,sampleRateReductionAmount:pe,bassAmount:R,midAmount:b,trebleAmount:se,stereoWidthAmount:j,smallSpeakerRoomAmount:F,isMuted:Y,volume:ie,previewKind:V,setPreviewName:P,setPreviewError:v,setNeedsUserPlay:L,setIsPlaying:_,setCurrentTime:te,setDuration:z,setPlaybackRate:I,setIsLooping:g,setSourceDimensions:Z,setViewportRect:ae,setPreviewKindState:l,setIsPoweredOn:s,beginLoading:W,finishLoading:A,ensureAudioContext:U,updateAudioNodes:M,connectMediaAudio:oe,fitSprite:ge,refreshLayout:ve,scheduleRefreshLayout:le,safeRender:$,resetFilterInstance:fe,initPixi:Te,resetPerfAccumulators:we,debugVideo:de,debugAudio:be}){const Ge=async()=>{zn()&&await new Promise(a=>{window.setTimeout(a,220)})},Ae=()=>{const a=f.current?.currentTime;if(N.current)if(typeof a=="number"){const h=N.current.gain;h.cancelScheduledValues(a),h.setValueAtTime(h.value,a),h.linearRampToValueAtTime(0,a+.03)}else N.current.gain.value=0;if(S.current)if(typeof a=="number"){const h=S.current.gain;h.cancelScheduledValues(a),h.setValueAtTime(h.value,a),h.linearRampToValueAtTime(0,a+.03)}else S.current.gain.value=0},Ue=()=>{N.current&&(N.current.gain.value=0)},De=a=>a instanceof DOMException&&(a.name==="NotAllowedError"||a.name==="AbortError")?!0:a instanceof Error?/autoplay|user gesture|user activation|interaction|not allowed/i.test(a.message):!1,ze=a=>De(a)?(A(),v(""),L(!0),he(),$(),!0):!1,Se=(a,h,O=!0)=>{Ae(),a.muted=!0,a.volume=0,a.pause(),a.srcObject instanceof MediaStream&&(O&&a.srcObject.getTracks().forEach(ce=>ce.stop()),a.srcObject=null),a.src="",a.load(),h?.startsWith("blob:")&&URL.revokeObjectURL(h)},je=a=>new Promise((h,O)=>{const ce=ne=>ne?ne.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ne.code===MediaError.MEDIA_ERR_NETWORK?"network":ne.code===MediaError.MEDIA_ERR_DECODE?"decode":ne.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ne.code}`:"unknown",E=()=>{a.removeEventListener("loadeddata",y),a.removeEventListener("canplay",y),a.removeEventListener("error",xe)},y=()=>{E(),h()},xe=()=>{E(),O(new Error(`動画の読み込みに失敗しました。 src=${a.currentSrc||a.src||"(empty)"} reason=${ce(a.error)}`))};if(a.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA){h();return}a.addEventListener("loadeddata",y,{once:!0}),a.addEventListener("canplay",y,{once:!0}),a.addEventListener("error",xe,{once:!0}),a.load()}),Ee=a=>new Promise((h,O)=>{const ce=ne=>ne?ne.code===MediaError.MEDIA_ERR_ABORTED?"aborted":ne.code===MediaError.MEDIA_ERR_NETWORK?"network":ne.code===MediaError.MEDIA_ERR_DECODE?"decode":ne.code===MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED?"src-not-supported":`code-${ne.code}`:"unknown",E=()=>{a.removeEventListener("loadedmetadata",y),a.removeEventListener("canplay",y),a.removeEventListener("error",xe)},y=()=>{E(),h()},xe=()=>{E(),O(new Error(`音声の読み込みに失敗しました。 src=${a.currentSrc||a.src||"(empty)"} reason=${ce(a.error)}`))};if(a.readyState>=HTMLMediaElement.HAVE_METADATA){h();return}a.addEventListener("loadedmetadata",y,{once:!0}),a.addEventListener("canplay",y,{once:!0}),a.addEventListener("error",xe,{once:!0}),a.load()}),qe=a=>new Promise((h,O)=>{const ce=()=>{a.removeEventListener("load",E),a.removeEventListener("error",y)},E=()=>{ce(),h()},y=()=>{ce(),O(new Error("画像の読み込みに失敗しました。"))};if(a.complete&&a.naturalWidth>0&&a.naturalHeight>0){h();return}a.addEventListener("load",E,{once:!0}),a.addEventListener("error",y,{once:!0})}),ye=a=>{a.addEventListener("play",he),a.addEventListener("pause",he),a.addEventListener("pause",Ae),a.addEventListener("abort",Ae),a.addEventListener("emptied",Ae),a.addEventListener("loadstart",Ae),a.addEventListener("seeking",Ae),a.addEventListener("stalled",Ae),a.addEventListener("suspend",Ae),a.addEventListener("waiting",Ae),a.addEventListener("volumechange",he),a.addEventListener("timeupdate",he),a.addEventListener("durationchange",he),a.addEventListener("seeked",he),a.addEventListener("ended",he),a.addEventListener("ratechange",he),a instanceof HTMLVideoElement&&a.addEventListener("resize",()=>{const h=a.videoWidth,O=a.videoHeight;h>0&&O>0&&(Z({width:h,height:O}),le())})},Pe=a=>{a.loop=K.current,a.muted=X.current,a.volume=X.current?0:q.current,a.playbackRate=ee.current,a.autoplay=!1,a.preload="auto",a.crossOrigin="anonymous",a instanceof HTMLVideoElement&&(a.playsInline=!0)},he=()=>{if(!n.current){de("syncVideoState:no-media",{previewKind:D.current,hasPreviewElement:!!r.current}),T.current=!1,_(!1),te(0),z(0),M(),$();return}T.current=!n.current.paused,_(!n.current.paused),n.current.paused||A(),te(n.current.currentTime),z(n.current.duration||0),I(n.current.playbackRate||1),g(n.current.loop),M(),$()},Ce=()=>{de("cleanupPreview:start",{previewKind:D.current,hasMedia:!!n.current,hasPreviewElement:!!r.current}),Ae(),p.current+=1,A();const a=n.current,h=m.current,O=i.current;e.current=null,o.current=null,n.current=null,r.current=null,m.current=null,i.current=!1,G.current?.disconnect(),G.current=null,L(!1),T.current=!1,_(!1),te(0),z(0),l(null),Z(null),ae(null),u.current?.startsWith("blob:")&&URL.revokeObjectURL(u.current),u.current=null,a?Se(a,void 0,O):O&&h?.getTracks().forEach(ce=>ce.stop()),$()},Oe=()=>{n.current&&(n.current.muted=!0,n.current.volume=0,n.current.pause()),Ae(),Ce(),f.current?.state==="running"&&f.current.suspend()},Me=()=>{s(!0),t.current?.ticker.start();try{we?.()}catch{}},Be=async()=>{if(n.current)try{await U(),jn()&&G.current?(n.current.muted=!1,n.current.volume=0):(n.current.muted=X.current,n.current.volume=X.current?0:q.current),await n.current.play(),T.current=!0,_(!0),v(""),L(!1),be("playVideoWithAudio",{audioContextState:f.current?.state,currentTime:n.current.currentTime,isAudioFxEnabled:J,lofiAmount:H,bitCrushAmount:w,sampleRateReductionAmount:pe,bassAmount:R,midAmount:b,trebleAmount:se,stereoWidthAmount:j,smallSpeakerRoomAmount:F,isMuted:Y,volume:ie}),M(),he(),$(),le(),window.requestAnimationFrame(M)}catch(a){if(A(),De(a)){L(!0),v("");return}L(!1),v(a instanceof Error?a.message:"音声付き再生を開始できませんでした。")}},Re=async()=>{if(await Te(),!t.current)throw new Error("Canvas renderer is not ready yet.");return t.current},Le=async(a,h)=>{const O=await Re();r.current=a,ge(O,null,a),l(h),Z(a instanceof HTMLVideoElement?{width:a.videoWidth,height:a.videoHeight}:{width:a.naturalWidth,height:a.naturalHeight}),$(),ve(),le(),t.current?.ticker.start()},Ne=async a=>{const h=a.type.startsWith("video/"),O=a.type.startsWith("audio/"),ce=a.type.startsWith("image/");if(!h&&!O&&!ce){v("動画、音声、または画像ファイルを選んでください。");return}Me(),Ce(),fe();const E=p.current;v(""),P(a.name),W(h?"Loading video preview...":O?"Loading audio preview...":"Loading image preview...");let y=null;try{if(await Re(),y=URL.createObjectURL(a),u.current=y,h||O){const ne=h?document.createElement("video"):document.createElement("audio");if(ne.src=y,Pe(ne),ye(ne),ne instanceof HTMLVideoElement?await je(ne):await Ee(ne),E!==p.current){Se(ne,y);return}n.current=ne,ne instanceof HTMLVideoElement?await Le(ne,"video"):(r.current=null,l("audio"),Z(null),ae(null),$()),await oe(ne),he(),await Ge(),await Be(),E===p.current&&A();return}const xe=new Image;if(xe.src=y,xe.crossOrigin="anonymous",await qe(xe),E!==p.current){y.startsWith("blob:")&&URL.revokeObjectURL(y);return}n.current=null,Ue(),M(),await Le(xe,"image"),he(),E===p.current&&A()}catch(xe){if(E!==p.current){y?.startsWith("blob:")&&URL.revokeObjectURL(y);return}if(De(xe)){ze(xe);return}Ce(),v(xe instanceof Error?xe.message:"動画プレビューに失敗しました。"),L(!1)}},Ie=async()=>{if(Me(),!navigator.mediaDevices?.getDisplayMedia){v("このブラウザでは画面キャプチャーに対応していません。");return}Ce();const a=p.current;v(""),P("Display Capture"),W("Preparing display capture...");try{await Re();const h=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(a!==p.current){h.getTracks().forEach(ce=>ce.stop());return}const O=document.createElement("video");O.srcObject=h,Pe(O),ye(O),h.getVideoTracks()[0]?.addEventListener("ended",()=>{Ze()}),await je(O),m.current=h,i.current=!0,n.current=O,await Le(O,"capture"),await oe(O),L(!1),await Ge(),await Be(),a===p.current&&A()}catch(h){if(a!==p.current||ze(h))return;Ce(),v(h instanceof Error?h.message:"画面キャプチャーを開始できませんでした。")}},Ze=()=>{V==="capture"&&(Ce(),P(""),v(""))};return{cleanupPreview:Ce,cleanupForPageLeave:Oe,playVideoWithAudio:Be,previewFile:Ne,previewStream:async(a,h="video",O="Media Stream")=>{let ce=0;try{if(Me(),Ce(),fe(),ce=p.current,v(""),P(O),W(h==="video"?"Loading stream preview...":"Loading stream audio..."),await Re(),h==="video"){const E=document.createElement("video");if(E.srcObject=a,Pe(E),ye(E),await je(E),ce!==p.current){Se(E,void 0,!1);return}m.current=a,i.current=!1,n.current=E,await Le(E,"capture"),await oe(E)}else{const E=document.createElement("audio");if(E.srcObject=a,Pe(E),ye(E),await Ee(E),ce!==p.current){Se(E,void 0,!1);return}m.current=a,i.current=!1,n.current=E,r.current=null,l("audio"),Z(null),ae(null),$(),await oe(E),he()}if(ce!==p.current)return;await Ge(),await Be(),ce===p.current&&A()}catch(E){if(ce!==p.current||ze(E))return;Ce(),v(E instanceof Error?E.message:String(E))}},previewUrl:async(a,h="video")=>{let O=0;const ce=typeof performance<"u"?performance.now():Date.now(),E=()=>Math.round(((typeof performance<"u"?performance.now():Date.now())-ce)*10)/10;try{if(de("startup:previewUrl:start",{url:a,kind:h}),Me(),Ce(),fe(),O=p.current,v(""),P(a),W(h==="video"?"Loading video preview...":h==="image"?"Loading image preview...":"Loading audio preview..."),await Re(),de("startup:previewUrl:renderer-ready",{kind:h,elapsedMs:E()}),h==="video"){const y=document.createElement("video");if(y.src=a,Pe(y),ye(y),await je(y),de("startup:previewUrl:video-ready",{elapsedMs:E(),readyState:y.readyState,videoWidth:y.videoWidth,videoHeight:y.videoHeight}),O!==p.current){Se(y,a);return}n.current=y,await Le(y,"video"),await oe(y),he()}else if(h==="image"){const y=new Image;if(y.src=a,y.crossOrigin="anonymous",await qe(y),de("startup:previewUrl:image-ready",{elapsedMs:E(),naturalWidth:y.naturalWidth,naturalHeight:y.naturalHeight}),O!==p.current)return;n.current=null,Ue(),M(),await Le(y,"image"),he()}else{const y=document.createElement("audio");if(y.src=a,Pe(y),ye(y),await Ee(y),de("startup:previewUrl:audio-ready",{elapsedMs:E(),readyState:y.readyState,duration:y.duration}),O!==p.current){Se(y,a);return}r.current=null,l("audio"),Z(null),ae(null),n.current=y,$(),await oe(y),he()}if(O!==p.current)return;(h==="video"||h==="audio")&&(await Ge(),await Be()),O===p.current&&(A(),de("startup:previewUrl:done",{kind:h,elapsedMs:E()}))}catch(y){if(de("startup:previewUrl:error",{kind:h,elapsedMs:E(),error:y instanceof Error?y.message:String(y)}),O!==p.current||ze(y))return;Ce(),v(y instanceof Error?y.message:String(y))}},startDisplayCapture:Ie,stopDisplayCapture:Ze,syncVideoState:he,releaseDetachedMedia:Se,ensurePixiReady:Re}}let Xn=0;const vo=()=>typeof window<"u"&&("__TAURI_INTERNALS__"in window||"__TAURI__"in window),bo=()=>typeof navigator<"u"&&/Android/i.test(navigator.userAgent),Yn=()=>typeof window<"u"&&!!window.__RETRO_PLAYER_DEBUG__;function Kn(t,e,o=1){const r=c.useRef(`player-${Xn+=1}`),n=c.useRef(null),u=c.useRef(null),m=c.useRef(!1),i=c.useRef(null),p=c.useRef(null),T=c.useRef([]),D=c.useRef(null),f=c.useRef(null),G=c.useRef(null),S=c.useRef(null),N=c.useRef(null),X=c.useRef(0),q=c.useRef(!1),ee=c.useRef(null),K=c.useRef(!1),[J,H]=c.useState(""),[w,pe]=c.useState(""),[R,b]=c.useState(!0),[se,j]=c.useState(""),[F,Y]=c.useState(!1),[ie,V]=c.useState(!1),[P,v]=c.useState(!1),[L,_]=c.useState(0),[te,z]=c.useState(0),[I,g]=c.useState(null),[Z,ae]=c.useState(null),[l,s]=c.useState(!1),[W,A]=c.useState(null),U=(C,B)=>{if(!Yn())return;const re=B?` ${JSON.stringify(B)}`:"";console.log(`[retro-player video][${r.current}] ${C}${re}`)},M=_n({filterState:t,fitMode:e,renderResolutionScale:o,isPoweredOn:R,isPlayingRef:q,previewKindRef:ee,debugVideo:U}),{canvasHostRef:oe,appRef:ge,spriteRef:ve,textureRef:le,previewElementRef:$,filterRef:fe,isRendererReady:Te,viewportRect:we,setViewportRect:de,applyFilterState:be,destroyPixi:Ge,fitSprite:Ae,initPixi:Ue,refreshLayout:De,resetFilterInstance:ze,safeRender:Se,scheduleRefreshLayout:je,syncSpriteFilter:Ee,syncTexturePresentation:qe}=M,ye=c.useRef(Ue),Pe=c.useRef(Ge),he=c.useRef(()=>{}),Ce=c.useRef(()=>{}),Oe=Pn({instanceLabel:r.current,previewKind:I,previewKindRef:ee,mediaRef:i,isPlaying:P,isPlayingRef:q}),{audioContextRef:Me,mediaSourceRef:Be,masterGainRef:Re,recordingDestinationRef:Le,noiseGainRef:Ne,isMutedRef:Ie,volumeRef:Ze,playbackRateRef:He,isLoopingRef:Je,isMuted:a,setIsMuted:h,playbackRate:O,setPlaybackRate:ce,volume:E,setVolume:y,isLooping:xe,setIsLooping:ne,isAudioFxEnabled:nt,setIsAudioFxEnabled:Ct,lofiAmount:rt,setLofiAmount:St,radioToneAmount:yt,setRadioToneAmount:Rt,bitCrushAmount:it,setBitCrushAmount:Tt,sampleRateReductionAmount:at,setSampleRateReductionAmount:Dt,bassAmount:st,setBassAmount:Lt,midAmount:lt,setMidAmount:Mt,trebleAmount:ct,setTrebleAmount:Bt,stereoWidthAmount:ut,setStereoWidthAmount:Pt,smallSpeakerRoomAmount:dt,setSmallSpeakerRoomAmount:Et,wowFlutterAmount:It,setWowFlutterAmount:kt,isNoiseEnabled:Ft,setIsNoiseEnabled:Gt,noiseLevel:Nt,setNoiseLevel:Wt,vinylDustAmount:Ut,setVinylDustAmount:Ot,delayAmount:$e,setDelayAmount:ht,reverbAmount:Ht,setReverbAmount:Qe,chorusAmount:Vt,setChorusAmount:_t,tapeSaturationAmount:mt,setTapeSaturationAmount:zt,compressorAmount:jt,setCompressorAmount:Zt,fxOutputTrimAmount:Xt,setFxOutputTrimAmount:Yt,debugAudio:pt,ensureAudioContext:Xe,updateAudioNodes:d,connectMediaAudio:Ve,reconnectCurrentMediaAudio:_e,applyAudioSettings:Ro,resetAudioSettings:To,disposeAudioEngine:oo}=Oe;c.useEffect(()=>{ye.current=Ue,Pe.current=Ge},[Ue,Ge]);const Do=C=>{ee.current=C,g(C)},Lo=C=>{j(C),Y(!0)},et=()=>{Y(!1),j("")},no=()=>{b(!0),ge.current?.ticker.start()},Mo=()=>{i.current&&i.current.pause(),Ne.current&&(Ne.current.gain.value=0),Re.current&&(Re.current.gain.value=0),et(),V(!1),b(!1),ge.current?.ticker.stop(),Ye()},Bo=Zn({filterState:t,appRef:ge,spriteRef:ve,textureRef:le,previewElementRef:$,filterRef:fe,mediaRef:i,objectUrlRef:n,streamRef:u,streamOwnedRef:m,previewRequestIdRef:X,isPlayingRef:q,previewKindRef:ee,audioContextRef:Me,mediaSourceRef:Be,masterGainRef:Re,noiseGainRef:Ne,isMutedRef:Ie,volumeRef:Ze,playbackRateRef:He,isLoopingRef:Je,isAudioFxEnabled:nt,lofiAmount:rt,bitCrushAmount:it,sampleRateReductionAmount:at,bassAmount:st,midAmount:lt,trebleAmount:ct,stereoWidthAmount:ut,smallSpeakerRoomAmount:dt,isMuted:a,volume:E,previewKind:I,setPreviewName:H,setPreviewError:pe,setNeedsUserPlay:V,setIsPlaying:v,setCurrentTime:_,setDuration:z,setPlaybackRate:ce,setIsLooping:ne,setSourceDimensions:ae,setViewportRect:de,setPreviewKindState:Do,setIsPoweredOn:b,beginLoading:Lo,finishLoading:et,ensureAudioContext:Xe,updateAudioNodes:d,connectMediaAudio:Ve,fitSprite:Ae,refreshLayout:De,scheduleRefreshLayout:je,safeRender:Se,resetFilterInstance:ze,initPixi:Ue,debugVideo:U,debugAudio:pt}),{cleanupPreview:ro,cleanupForPageLeave:Po,playVideoWithAudio:io,previewFile:Eo,previewStream:Io,previewUrl:ko,startDisplayCapture:Fo,stopDisplayCapture:Go,syncVideoState:Ye}=Bo;c.useEffect(()=>{he.current=ro},[ro]),c.useEffect(()=>{Ce.current=oo},[oo]);const ao=async()=>{if(i.current){if(i.current.paused){R||no(),await io(),Ye();return}i.current.pause(),Ye()}},No=()=>{i.current&&h(C=>{const B=!C;return Ie.current=B,window.requestAnimationFrame(d),B})},tt=C=>{i.current&&(i.current.currentTime=C,_(C))},Wo=C=>{if(!i.current)return;const B=1/30,re=Math.max(0,Math.min(i.current.currentTime+B*C,i.current.duration||i.current.currentTime+B));i.current.pause(),i.current.currentTime=re,Ye()},Uo=C=>{i.current&&(i.current.playbackRate=C,He.current=C,ce(C))},Oo=C=>{i.current&&(Ze.current=C,Ie.current=C===0,y(C),h(C===0),window.requestAnimationFrame(d))},Ho=()=>{i.current&&(i.current.loop=!i.current.loop,Je.current=i.current.loop,ne(i.current.loop))},Vo=C=>{Je.current=C,ne(C),i.current&&(i.current.loop=C)},gt=()=>{if(!f.current||typeof window>"u"){G.current=null,S.current=null;return}window.URL.revokeObjectURL(f.current),f.current=null,G.current=null,S.current=null},_o=(C,B)=>{if(typeof document>"u")return;const re=document.createElement("a");re.href=C,re.download=B,re.rel="noopener",re.style.display="none",document.body.appendChild(re),re.click(),window.setTimeout(()=>{re.remove()},0)},zo=(C,B)=>{if(typeof window>"u"||C.length===0)return null;gt();const re=new Blob(C,{type:B||"video/webm"}),We=`tetorica-retro-player-${new Date().toISOString().replace(/[:.]/g,"-")}.webm`,Fe=window.URL.createObjectURL(re);return f.current=Fe,G.current=re,S.current=We,A(We),We},jo=()=>{const C=f.current,B=S.current;!C||!B||typeof window>"u"||(_o(C,B),window.setTimeout(()=>{gt()},1e3),A(null))},Zo=async()=>{const C=G.current,B=S.current;if(!C||!B||typeof window>"u")return!1;if(vo()){const We=new Uint8Array(await C.arrayBuffer()),Fe=await So("persist_recording_for_share",{data:Array.from(We),filename:B});return await pn(Fe,{mimeType:C.type||"video/webm",title:B}),!0}if(typeof navigator>"u"||typeof navigator.share!="function"||typeof File>"u")return!1;const ke={files:[new File([C],B,{type:C.type||"video/webm"})],title:B};return typeof navigator.canShare=="function"&&!navigator.canShare(ke)?!1:(await navigator.share(ke),!0)},Xo=()=>["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(B=>MediaRecorder.isTypeSupported(B))??"",Yo=async()=>{const C=ge.current?.canvas;if(!(C instanceof HTMLCanvasElement))throw new Error("Preview canvas is not ready yet.");await Xe();const B=new MediaStream;C.captureStream(30).getVideoTracks().forEach(Fe=>B.addTrack(Fe)),Le.current?.stream.getAudioTracks().forEach(Fe=>B.addTrack(Fe.clone()));const ke=Xo(),We=ke?new MediaRecorder(B,{mimeType:ke}):new MediaRecorder(B);T.current=[],gt(),A(null),D.current=B,p.current=We,We.addEventListener("dataavailable",Fe=>{Fe.data.size>0&&T.current.push(Fe.data)}),We.addEventListener("stop",()=>{const Fe=zo(T.current,We.mimeType);T.current=[],D.current?.getTracks().forEach(Ko=>Ko.stop()),D.current=null,p.current=null,s(!1),Xe(),N.current?.(Fe),N.current=null},{once:!0}),We.start(),s(!0)},so=(C=!0)=>{const B=p.current;return B?new Promise(re=>{if(N.current=re,C||(T.current=[]),B.state!=="inactive"){B.stop();return}D.current?.getTracks().forEach(ke=>ke.stop()),D.current=null,p.current=null,s(!1),N.current?.(S.current),N.current=null}):Promise.resolve(S.current)};return c.useEffect(()=>{let C=!1;return(async()=>(U("startup:setupPixi-effect:start",{renderResolutionScale:o}),await ye.current(),C&&Pe.current()))(),()=>{gt(),so(!1),C=!0,Pe.current()}},[o]),c.useEffect(()=>()=>{he.current(),Ce.current()},[]),c.useEffect(()=>{const C=()=>{Po()};return window.addEventListener("beforeunload",C),()=>{window.removeEventListener("beforeunload",C)}},[]),c.useEffect(()=>{const C=()=>{i.current&&(i.current.muted=!0,i.current.volume=0,i.current.pause(),Ye())};return window.addEventListener(lo,C),()=>{window.removeEventListener(lo,C)}},[Ye]),c.useEffect(()=>{if(!bo())return;const C=re=>re==="video"||re==="audio"||re==="capture",B=()=>{const re=i.current;if(!(!re||!C(ee.current))){if(document.visibilityState==="hidden"){K.current=!re.paused,re.pause(),q.current=!1,v(!1),Ne.current&&(Ne.current.gain.value=0),Re.current&&(Re.current.gain.value=0),Me.current?.state==="running"&&Me.current.suspend().catch(()=>{});return}window.setTimeout(()=>{(async()=>{try{if(await Xe(),_e(),d(),K.current&&i.current)try{await i.current.play(),V(!1)}catch(ke){ke instanceof DOMException&&ke.name==="NotAllowedError"&&V(!0)}}finally{Ye(),K.current=!1}})()},80)}};return document.addEventListener("visibilitychange",B),()=>{document.removeEventListener("visibilitychange",B)}},[Me,Xe,Re,Ne,_e,Ye,d]),c.useLayoutEffect(()=>{be(),Ee(),qe(),De()},[t.colorLevels,t.curvature,t.ditherStrength,t.isFilterEnabled,t.monoTint,t.neonBoost,t.neonDetail,t.neonSaturation,t.paletteMode,t.phosphorStrength,t.spotMaskStrength,t.bulbRadius,t.blackFloor,t.selectedPreset,t.closeUpNoiseStrength,t.scanlineBrightnessFade,t.scanlineStrength,t.scanline2Strength,t.targetHeight,t.targetWidth,t.vignetteStrength,t.glowStrength,De]),c.useEffect(()=>{if(w||ie){et();return}if(I==="image"||I==="audio"){et();return}P&&et()},[w,ie,I,P]),c.useEffect(()=>{q.current=P;const C=(I==="video"||I==="capture")&&i.current?.tagName==="VIDEO",B=!i.current||Math.abs(i.current.currentTime)<.05,re=i.current?.ended??!1;C&&et(),C&&!P&&!w&&!re&&(Me.current?.state==="suspended"||B)&&V(!0)},[Me,P,w,I]),c.useEffect(()=>{const C=B=>{if(!i.current)return;const re=B.target;if(!(re instanceof HTMLInputElement||re instanceof HTMLTextAreaElement||re?.isContentEditable)){if(B.code==="Space"||B.code==="KeyK"){B.preventDefault(),ao();return}if(B.code==="KeyJ"){B.preventDefault(),tt(Math.max(i.current.currentTime-10,0));return}if(B.code==="KeyL"){B.preventDefault(),tt(Math.min(i.current.currentTime+10,i.current.duration||i.current.currentTime+10));return}if(B.code==="ArrowLeft"){B.preventDefault(),tt(Math.max(i.current.currentTime-5,0));return}B.code==="ArrowRight"&&(B.preventDefault(),tt(Math.min(i.current.currentTime+5,i.current.duration||i.current.currentTime+5)))}};return window.addEventListener("keydown",C),()=>{window.removeEventListener("keydown",C)}},[]),{canvasHostRef:oe,previewName:J,previewError:w,isRendererReady:Te,loadingLabel:se,isLoading:F,needsUserPlay:ie,isPlaying:P,isMuted:a,currentTime:L,duration:te,playbackRate:O,volume:E,isLooping:xe,sourceDimensions:Z,viewportRect:we,isAudioFxEnabled:nt,lofiAmount:rt,radioToneAmount:yt,bitCrushAmount:it,sampleRateReductionAmount:at,bassAmount:st,midAmount:lt,trebleAmount:ct,stereoWidthAmount:ut,smallSpeakerRoomAmount:dt,wowFlutterAmount:It,isNoiseEnabled:Ft,noiseLevel:Nt,vinylDustAmount:Ut,delayAmount:$e,reverbAmount:Ht,chorusAmount:Vt,tapeSaturationAmount:mt,setTapeSaturationAmount:zt,compressorAmount:jt,setCompressorAmount:Zt,fxOutputTrimAmount:Xt,setFxOutputTrimAmount:Yt,hasPlayableMedia:I==="video"||I==="audio"||I==="capture",hasVideo:I==="video"||I==="capture",hasAudioOnly:I==="audio",hasImage:I==="image",isRecording:l,pendingRecordingFilename:W,prefersShareExport:vo()&&bo(),isCaptureActive:I==="capture",canRecord:I==="video"||I==="capture"||I==="image"||I==="audio",previewFile:Eo,previewStream:Io,previewUrl:ko,startDisplayCapture:Fo,stopDisplayCapture:Go,togglePlayback:ao,toggleMute:No,seekTo:tt,stepFrame:Wo,changePlaybackRate:Uo,changeVolume:Oo,toggleLoop:Ho,setLoopingEnabled:Vo,applyAudioSettings:Ro,resetAudioSettings:To,playVideoWithAudio:io,isPoweredOn:R,powerOn:no,powerOff:Mo,downloadPendingRecording:jo,sharePendingRecording:Zo,startRecording:Yo,stopRecording:so,ensureAudioContext:Xe,refreshLayout:De,toggleAudioFx:()=>{Ct(C=>!C)},setLofiAmount:St,setRadioToneAmount:Rt,setBitCrushAmount:Tt,setSampleRateReductionAmount:Dt,setBassAmount:Lt,setMidAmount:Mt,setTrebleAmount:Bt,setStereoWidthAmount:Pt,setSmallSpeakerRoomAmount:Et,setWowFlutterAmount:kt,toggleNoise:()=>{Gt(C=>!C)},setNoiseLevel:Wt,setVinylDustAmount:Ot,setDelayAmount:ht,setReverbAmount:Qe,setChorusAmount:_t}}const me=ot.pc98_512,Ao=(t,e,o)=>((o?.ignoreDimensions??!1)||e.width===t.targetWidth&&e.height===t.targetHeight)&&e.colors===t.colorLevels&&e.dither===t.ditherStrength&&e.palette===t.paletteMode&&e.curvature===t.curvature&&e.scanline===t.scanlineStrength&&e.scanline2===t.scanline2Strength&&e.vignette===t.vignetteStrength&&e.glow===t.glowStrength&&(e.smoothStrength??0)===t.smoothStrength&&(e.toonSteps??0)===t.toonSteps&&(e.edgeBoost??0)===t.edgeBoost&&e.phosphor===t.phosphorStrength&&e.spotMask===t.spotMaskStrength&&e.bulbRadius===t.bulbRadius&&e.blackFloor===t.blackFloor&&(e.phosphorDotLightBalance??1)===t.phosphorDotLightBalance&&(e.phosphorDotInternalScale??!1)===t.phosphorDotInternalScale&&(e.phosphorDotBrightCore??!1)===t.phosphorDotBrightCore&&(e.phosphorDotCellFill??0)===t.phosphorDotCellFill&&(e.phosphorDotFlatDisc??!1)===t.phosphorDotFlatDisc&&(e.phosphorDotNeighborBlend??!1)===t.phosphorDotNeighborBlend&&e.monoTint===t.monoTint&&e.neonBoost===t.neonBoost&&e.neonSaturation===t.neonSaturation&&e.neonDetail===t.neonDetail,ft=t=>{for(const[e,o]of Object.entries(ot))if(Ao(t,o))return e;if(!t.matchTargetAspect)return null;for(const[e,o]of Object.entries(ot))if(Ao(t,o,{ignoreDimensions:!0}))return e;return null},qn=(t,e)=>t==="pc98"||t==="pc98_tile"||t==="pc98_4096"?16:t==="pc98_512"||t==="pc98_512_sat"?8:t==="color32"?32:t==="color64"?64:e;function Jn(t={}){const[e]=c.useState(()=>({targetWidth:t.targetWidth??me.width,targetHeight:t.targetHeight??me.height,matchTargetAspect:t.matchTargetAspect??!0,colorLevels:t.colorLevels??me.colors,ditherStrength:t.ditherStrength??me.dither,paletteMode:t.paletteMode??me.palette,curvature:t.curvature??me.curvature,scanlineStrength:t.scanlineStrength??me.scanline,scanline2Strength:t.scanline2Strength??me.scanline2,scanlineBrightnessFade:t.scanlineBrightnessFade??.6,vignetteStrength:t.vignetteStrength??me.vignette,glowStrength:t.glowStrength??me.glow,smoothStrength:t.smoothStrength??me.smoothStrength??0,toonSteps:t.toonSteps??me.toonSteps??0,edgeBoost:t.edgeBoost??me.edgeBoost??0,phosphorStrength:t.phosphorStrength??me.phosphor,spotMaskStrength:t.spotMaskStrength??me.spotMask,bulbRadius:t.bulbRadius??me.bulbRadius,blackFloor:t.blackFloor??me.blackFloor,phosphorDotLightBalance:t.phosphorDotLightBalance??me.phosphorDotLightBalance??1,phosphorDotInternalScale:t.phosphorDotInternalScale??me.phosphorDotInternalScale??!1,phosphorDotBrightCore:t.phosphorDotBrightCore??me.phosphorDotBrightCore??!1,phosphorDotCellFill:t.phosphorDotCellFill??me.phosphorDotCellFill??0,phosphorDotFlatDisc:t.phosphorDotFlatDisc??me.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:t.phosphorDotNeighborBlend??me.phosphorDotNeighborBlend??!1,closeUpNoiseStrength:t.closeUpNoiseStrength??0,monoTint:t.monoTint??me.monoTint,neonBoost:t.neonBoost??me.neonBoost,neonSaturation:t.neonSaturation??me.neonSaturation,neonDetail:t.neonDetail??me.neonDetail,isFilterEnabled:t.isFilterEnabled??!0})),[o]=c.useState(()=>({...e,...xt()?.filter,...t})),[r,n]=c.useState(o),[u,m]=c.useState(ft(o)),i=l=>{m(null),n(s=>s.targetWidth===l?s:{...s,targetWidth:l})},p=l=>{m(null),n(s=>s.targetHeight===l?s:{...s,targetHeight:l})},T=l=>{m(null),n(s=>s.matchTargetAspect===l?s:{...s,matchTargetAspect:l})},D=l=>{m(null),n(s=>({...s,colorLevels:l}))},f=l=>{m(null),n(s=>({...s,ditherStrength:l}))},G=l=>{m(null),n(s=>({...s,paletteMode:l,colorLevels:qn(l,s.colorLevels)}))},S=l=>{m(null),n(s=>({...s,curvature:l}))},N=l=>{m(null),n(s=>({...s,scanlineStrength:l}))},X=l=>{m(null),n(s=>({...s,scanline2Strength:l}))},q=l=>{m(null),n(s=>({...s,scanlineBrightnessFade:l}))},ee=l=>{m(null),n(s=>({...s,vignetteStrength:l}))},K=l=>{m(null),n(s=>({...s,glowStrength:l}))},J=l=>{m(null),n(s=>({...s,smoothStrength:l}))},H=l=>{m(null),n(s=>({...s,toonSteps:l}))},w=l=>{m(null),n(s=>({...s,edgeBoost:l}))},pe=l=>{m(null),n(s=>({...s,phosphorStrength:l}))},R=l=>{m(null),n(s=>({...s,spotMaskStrength:l}))},b=l=>{m(null),n(s=>({...s,bulbRadius:l}))},se=l=>{m(null),n(s=>({...s,blackFloor:l}))},j=l=>{m(null),n(s=>({...s,phosphorDotLightBalance:l}))},F=l=>{m(null),n(s=>({...s,phosphorDotInternalScale:l}))},Y=l=>{m(null),n(s=>({...s,phosphorDotBrightCore:l}))},ie=l=>{m(null),n(s=>({...s,phosphorDotCellFill:l}))},V=l=>{m(null),n(s=>({...s,phosphorDotFlatDisc:l}))},P=l=>{m(null),n(s=>({...s,phosphorDotNeighborBlend:l}))},v=l=>{m(null),n(s=>({...s,closeUpNoiseStrength:l}))},L=l=>{m(null),n(s=>({...s,monoTint:l}))},_=l=>{m(null),n(s=>({...s,neonBoost:l}))},te=l=>{m(null),n(s=>({...s,neonSaturation:l}))},z=l=>{m(null),n(s=>({...s,neonDetail:l}))},I=l=>{n(s=>({...s,isFilterEnabled:l}))},g=l=>{const s=ot[l];m(l),n(W=>({...W,targetWidth:s.width,targetHeight:s.height,colorLevels:s.colors,ditherStrength:s.dither,paletteMode:s.palette,curvature:s.curvature,scanlineStrength:s.scanline,scanline2Strength:s.scanline2,vignetteStrength:s.vignette,glowStrength:s.glow,smoothStrength:s.smoothStrength??0,toonSteps:s.toonSteps??0,edgeBoost:s.edgeBoost??0,phosphorStrength:s.phosphor,spotMaskStrength:s.spotMask,bulbRadius:s.bulbRadius,blackFloor:s.blackFloor,phosphorDotLightBalance:s.phosphorDotLightBalance??1,phosphorDotInternalScale:s.phosphorDotInternalScale??!1,phosphorDotBrightCore:s.phosphorDotBrightCore??!1,phosphorDotCellFill:s.phosphorDotCellFill??0,phosphorDotFlatDisc:s.phosphorDotFlatDisc??!1,phosphorDotNeighborBlend:s.phosphorDotNeighborBlend??!1,monoTint:s.monoTint,neonBoost:s.neonBoost,neonSaturation:s.neonSaturation,neonDetail:s.neonDetail,isFilterEnabled:!0}))},Z=l=>{m(ft(l)),n(l)},ae=()=>{m(ft(e)),n(e)};return c.useEffect(()=>{const l=setTimeout(()=>{gn(r)},300);return()=>clearTimeout(l)},[r]),c.useEffect(()=>{const l=ft(r);m(s=>s===l?s:l)},[r]),{...r,selectedPreset:u,setTargetWidth:i,setTargetHeight:p,setMatchTargetAspect:T,setColorLevels:D,setDitherStrength:f,setPaletteMode:G,setCurvature:S,setScanlineStrength:N,setScanline2Strength:X,setScanlineBrightnessFade:q,setVignetteStrength:ee,setGlowStrength:K,setSmoothStrength:J,setToonSteps:H,setEdgeBoost:w,setPhosphorStrength:pe,setSpotMaskStrength:R,setBulbRadius:b,setBlackFloor:se,setPhosphorDotLightBalance:j,setPhosphorDotInternalScale:F,setPhosphorDotBrightCore:Y,setPhosphorDotCellFill:ie,setPhosphorDotFlatDisc:V,setPhosphorDotNeighborBlend:P,setCloseUpNoiseStrength:v,setMonoTint:L,setNeonBoost:_,setNeonSaturation:te,setNeonDetail:z,setIsFilterEnabled:I,applyAllFilterSettings:Z,applyPreset:g,resetSettings:ae}}function $n({locale:t,src:e,kind:o,player:r,isHighResolution:n,isFitWidthEnabled:u,controlPanelMode:m,confirmDialog:i,onHighResolutionChange:p,onFitWidthChange:T,onError:D}){const f=t==="ja"?{recordIdle:"録画: 現在のレトロ出力を記録します。",recordStop:"録画: 停止して書き出します。",powerOn:"Power: フィルターをオンにします。",powerOff:"Power: フィルターをオフにします。",hiRes:"Hi-res: よりシャープになりますが GPU 負荷は上がります。",fitWidthOn:"Fit width: 有効です。",fitWidthOff:"Fit width: プレビューを横幅いっぱいに広げます。",pinUnavailable:"Pin: 最大化中は使えません。",pinUnavailableFitWidth:"Pin: Fit Width 中は使えません。",pinOn:"Pin: プレビューを画面内に固定します。",pinOff:"Pin: スクロール中も見えるようにします。",maximizeOn:"Maximize: 通常表示に戻します。",maximizeOff:"Maximize: プレビューを全画面表示します。"}:{recordIdle:"Record: capture the current retro output.",recordStop:"Record: stop and export clip.",powerOn:"Power: turn filter on.",powerOff:"Power: turn filter off.",hiRes:"Hi-res: sharper preview, higher GPU cost.",fitWidthOn:"Fit width: enabled.",fitWidthOff:"Fit width: stretch preview to the frame width.",pinUnavailable:"Pin: unavailable while maximize is active.",pinUnavailableFitWidth:"Pin: unavailable in fit-width mode.",pinOn:"Pin: keep preview fixed on screen.",pinOff:"Pin: keep preview visible while you scroll.",maximizeOn:"Maximize: return to normal view.",maximizeOff:"Maximize: open the preview full screen."},G=k.useMemo(()=>xt()?.ui,[]),[S,N]=k.useState(G?.isPreviewMaximized??!1),[X,q]=k.useState(!1),[ee,K]=k.useState(!1),[J,H]=k.useState(0),[w,pe]=k.useState(null),[R,b]=k.useState(null),se=k.useRef(null),j=k.useRef(null),F=k.useRef(null),Y=k.useRef(null),ie=k.useCallback(()=>{const A=se.current,U=F.current;if(!A||!U)return null;const M=A.getBoundingClientRect(),oe=U.getBoundingClientRect();return{left:M.left,width:M.width,height:oe.height}},[]),V=k.useCallback(A=>{Y.current!==null&&window.clearTimeout(Y.current),Y.current=window.setTimeout(()=>{pe(A),Y.current=null},120)},[]),P=k.useCallback(()=>{Y.current!==null&&(window.clearTimeout(Y.current),Y.current=null),pe(null)},[]);k.useEffect(()=>{vn({isPreviewMaximized:S,isHighResolution:n})},[n,S]),k.useEffect(()=>()=>{Y.current!==null&&window.clearTimeout(Y.current)},[]),k.useEffect(()=>{if(!S)return;const A=document.body.style.overflow,U=M=>{M.code==="Escape"&&N(!1)};return document.body.style.overflow="hidden",window.addEventListener("keydown",U),()=>{document.body.style.overflow=A,window.removeEventListener("keydown",U)}},[S]),k.useEffect(()=>{S&&(q(!1),K(!1),H(0),b(null))},[S]),k.useEffect(()=>{u&&(q(!1),K(!1),H(0),b(null))},[u]),k.useEffect(()=>{if(m==="playback"||S||X||u){K(!1),H(0);return}const A=()=>{const U=j.current,M=F.current;if(!U||!M)return;const oe=U.getBoundingClientRect().top,ge=M.getBoundingClientRect().height,ve=Math.round(Math.min(ge,window.innerHeight)*.4),le=-Math.max(120,ve);K($=>{if(!$&&oe<=le){H(Math.max(120,ve));const fe=ie();return fe&&b(fe),!0}return $&&H(Math.max(120,ve)),$&&oe>=-24?(H(0),!1):$})};return A(),window.addEventListener("scroll",A,{passive:!0}),window.addEventListener("resize",A),()=>{window.removeEventListener("scroll",A),window.removeEventListener("resize",A)}},[m,u,S,X,ie]),k.useEffect(()=>{if(!((X||ee)&&!S)){b(null);return}const U=()=>{const M=ie();M&&b(M)};return U(),window.addEventListener("resize",U),window.addEventListener("scroll",U,{passive:!0}),()=>{window.removeEventListener("resize",U),window.removeEventListener("scroll",U)}},[ee,S,X,u,ie,r.sourceDimensions]),k.useEffect(()=>{r.refreshLayout()},[X,S,r.refreshLayout,r.sourceDimensions?.height,r.sourceDimensions?.width]);const v=o==="image"&&!!e&&!r.previewError&&(!r.isRendererReady||r.isLoading),L=!S&&!u&&r.viewportRect&&r.sourceDimensions&&r.sourceDimensions.width>r.sourceDimensions.height?Math.max(280,Math.ceil(r.viewportRect.height+24)):null,_=L?`${L}px`:"60vh",te=k.useMemo(()=>{if(r.sourceDimensions)return`${r.sourceDimensions.width} / ${r.sourceDimensions.height}`},[r.sourceDimensions]),z=(X||ee)&&!S,I=ee?`calc(max(0.0rem, env(safe-area-inset-top)) - ${J}px)`:void 0,g="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition backdrop-blur-sm",Z="border-emerald-300/80 bg-emerald-400/20 text-emerald-100 shadow-[0_0_16px_rgba(74,222,128,0.68)] hover:bg-emerald-400/28",ae="border-slate-500/70 bg-slate-900/78 text-slate-200 hover:bg-slate-800/90",l="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium transition backdrop-blur-sm",s=(A,U,M="w-44")=>x.jsx("div",{role:"tooltip","aria-hidden":w!==A,className:["pointer-events-none absolute bottom-full right-0 mb-2 rounded-lg border border-slate-600/80 bg-slate-950/95 px-3 py-2 text-[11px] leading-4 text-slate-100 shadow-lg transition",M,w===A?"translate-y-0 opacity-100":"translate-y-1 opacity-0"].join(" "),children:U}),W=()=>x.jsxs(x.Fragment,{children:[r.canRecord&&x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":r.isRecording?"Stop recording":"Start recording",onClick:()=>{P(),(async()=>{if(r.isRecording){try{if(!await r.stopRecording())return;const U=await i({title:"Recording ready",body:r.prefersShareExport?"Share the recorded clip now?":"Save the recorded clip now?",okText:r.prefersShareExport?"Share":"Save",cancelText:"Cancel"});if(r.ensureAudioContext(),!U)return;if(r.prefersShareExport){await r.sharePendingRecording()||r.downloadPendingRecording();return}r.downloadPendingRecording()}catch(A){D?.(A instanceof Error?A:new Error(String(A)))}return}try{await r.startRecording()}catch(A){D?.(A instanceof Error?A:new Error(String(A)))}})()},onMouseEnter:()=>V("record"),onMouseLeave:P,onFocus:()=>V("record"),onBlur:P,className:[l,r.isRecording?"border-rose-300/80 bg-rose-500/20 text-rose-50 shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:bg-rose-500/28":"border-rose-400/55 bg-slate-900/78 text-rose-200 hover:bg-rose-500/12"].join(" "),children:r.isRecording?x.jsx(mn,{size:14,className:"fill-current animate-pulse"}):x.jsx(nn,{size:16,className:"text-rose-300"})}),s("record",r.isRecording?f.recordStop:f.recordIdle)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":r.isPoweredOn?"Power off":"Power on",onClick:()=>{if(P(),r.isPoweredOn){r.powerOff();return}r.powerOn()},onMouseEnter:()=>V("power"),onMouseLeave:P,onFocus:()=>V("power"),onBlur:P,className:[g,r.isPoweredOn?Z:ae].join(" "),children:x.jsx(dn,{size:16})}),s("power",r.isPoweredOn?f.powerOff:f.powerOn)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":n?"Disable high resolution":"Enable high resolution",onClick:()=>{P(),p(!n)},onMouseEnter:()=>V("hi-res"),onMouseLeave:P,onFocus:()=>V("hi-res"),onBlur:P,className:[g,n?Z:ae].join(" "),children:x.jsx(Qo,{size:16})}),s("hi-res",f.hiRes)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":u?"Disable fit width":"Enable fit width",onClick:()=>{P(),T(!u)},onMouseEnter:()=>V("fit-width"),onMouseLeave:P,onFocus:()=>V("fit-width"),onBlur:P,className:[g,u?Z:ae].join(" "),children:x.jsx(tn,{size:16})}),s("fit-width",u?f.fitWidthOn:f.fitWidthOff)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":z?"Unpin preview":"Pin preview",onClick:()=>{P(),!(S||u)&&q(A=>{if(!A){const M=ie();return M&&b(M),!0}return K(!1),H(0),b(null),!1})},onMouseEnter:()=>V("pin"),onMouseLeave:P,onFocus:()=>V("pin"),onBlur:P,className:[g,S||u?"cursor-not-allowed border-slate-700/80 bg-slate-900/55 text-slate-500":z?Z:ae].join(" "),disabled:S||u,children:x.jsx(cn,{size:16})}),s("pin",S?f.pinUnavailable:u?f.pinUnavailableFitWidth:z?f.pinOn:f.pinOff)]}),x.jsxs("div",{className:"relative",children:[x.jsx("button",{type:"button","aria-label":S?"Exit maximize":"Maximize preview",onClick:()=>{P(),N(A=>!A)},onMouseEnter:()=>V("maximize"),onMouseLeave:P,onFocus:()=>V("maximize"),onBlur:P,className:[g,S?Z:ae].join(" "),children:S?x.jsx(Kt,{size:16}):x.jsx(an,{size:16})}),s("maximize",S?f.maximizeOn:f.maximizeOff)]})]});return x.jsxs("div",{ref:se,className:"space-y-4",children:[x.jsx("div",{ref:j,"aria-hidden":"true"}),x.jsxs("div",{ref:F,className:`rounded-2xl border border-slate-700 bg-slate-950 p-2 ${S?u?"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-y-auto":"fixed inset-0 z-50 border-0 bg-slate-950/95 p-3 overflow-visible flex items-stretch justify-stretch":z?"fixed z-30 bg-slate-950/92 shadow-2xl backdrop-blur-sm":"overflow-visible"}`,style:z&&R?{left:`${R.left}px`,top:I??"calc(max(0.0rem, env(safe-area-inset-top)) + 0.5rem)",width:`${R.width}px`}:S?void 0:{overflow:"visible"},children:[S&&(u?x.jsx("div",{className:"sticky top-0 z-10 flex justify-end pb-2",children:x.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{N(!1)},className:"inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:x.jsx(Kt,{size:18})})}):x.jsx("button",{type:"button","aria-label":"Exit maximize",title:"Exit maximize",onClick:()=>{N(!1)},className:"safe-top-right-offset absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/82 text-slate-100 shadow-md backdrop-blur-sm transition hover:bg-slate-800",children:x.jsx(Kt,{size:18})})),x.jsxs("div",{className:`relative ${S?"w-full":"max-w-full min-w-0 overflow-visible"}`,style:S?u&&te?{aspectRatio:te,width:"100%"}:void 0:u&&te?{aspectRatio:te,width:"100%"}:te?{aspectRatio:te,width:"100%",maxHeight:L?`${L}px`:"min(60vh, calc(100vh - 12rem))",minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"}:{height:_,minHeight:"min(220px, max(120px, calc(100vh - 12rem)))"},children:[x.jsxs("div",{className:"relative h-full w-full overflow-visible rounded-xl bg-slate-950",children:[v&&x.jsx("img",{src:e,alt:"","aria-hidden":"true",className:"pointer-events-none absolute inset-0 h-full w-full object-contain opacity-95"}),x.jsx("div",{ref:r.canvasHostRef,className:"pointer-events-none relative h-full w-full touch-manipulation"}),!r.isPoweredOn&&x.jsx("div",{className:"absolute z-100 inset-0 flex items-center justify-center bg-black/72",children:x.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-center text-sm text-slate-300 shadow-lg",children:[x.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-slate-500",children:"Power Off"}),x.jsx("p",{className:"mt-2",children:"Press power to wake the screen."})]})}),r.isLoading&&!r.needsUserPlay&&!r.previewError&&x.jsx("div",{className:["pointer-events-none absolute inset-0 flex items-center justify-center",v?"bg-slate-950/26":"bg-slate-950/72"].join(" "),children:x.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 text-center text-sm text-slate-200 shadow-lg",children:[x.jsx("div",{className:"mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400"}),x.jsx("p",{className:"font-medium",children:r.loadingLabel||"Loading preview..."}),x.jsx("p",{className:"mt-1 text-xs text-slate-400",children:"Please wait while the preview is prepared."})]})}),r.needsUserPlay&&!r.isLoading&&x.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/46",children:x.jsxs("div",{className:"w-[min(92%,28rem)] rounded-2xl border border-emerald-500/25 bg-slate-900/92 px-6 py-5 text-center text-slate-200 shadow-lg backdrop-blur-sm",children:[x.jsx("p",{className:"text-[11px] uppercase tracking-[0.35em] text-emerald-300/80",children:"Preview Ready"}),x.jsx("p",{className:"mt-3 text-lg font-semibold text-slate-100",children:"Press Play to start"}),x.jsx("p",{className:"mt-2 text-sm text-slate-400",children:"Safari may require a direct user action before video and audio can begin."}),x.jsx("button",{type:"button",onClick:()=>{r.playVideoWithAudio()},className:"mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/12 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-emerald-500/20",children:"Play"})]})}),r.hasAudioOnly&&x.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-400",children:"Audio preview is playing through the retro audio chain."})]}),!u&&x.jsx("div",{className:"absolute -bottom-8 right-3 z-50 flex items-center gap-2",children:W()})]}),u&&S&&x.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:W()})]}),u&&!S&&x.jsx("div",{className:"flex items-center justify-end gap-2 pt-2 pr-1",children:W()}),z&&R&&x.jsx("div",{style:{height:`${R.height}px`}})]})}const Qn=k.lazy(()=>Co(()=>import("./VideoControls-DzTUO89r.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.VideoControls}))),er=k.lazy(()=>Co(()=>import("./RetroFilterPanel-LFW92FZk.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.RetroFilterPanel}))),xo=x.jsx("div",{className:"flex min-h-24 items-center justify-center text-sm text-slate-400",children:"Preparing controls..."});function tr({locale:t,player:e,filterState:o,controlPanelMode:r,onControlPanelModeChange:n,onApplyPreset:u,onSetTargetWidth:m,onSetTargetHeight:i,onSetMatchTargetAspect:p,onResetSettings:T,onImportSettings:D}){return x.jsxs("div",{className:"rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-xs text-slate-300",children:[(e.hasPlayableMedia||e.hasImage)&&r!=="video-settings"&&x.jsx(k.Suspense,{fallback:xo,children:x.jsx(Qn,{hasPlayback:e.hasPlayableMedia,currentTime:e.currentTime,duration:e.duration,mode:r==="audio-settings"?"audio-settings":"playback",isAudioFxEnabled:e.isAudioFxEnabled,isLooping:e.isLooping,isMuted:e.isMuted,isNoiseEnabled:e.isNoiseEnabled,isPlaying:e.isPlaying,hasVideo:e.hasVideo,isVideoSettingsOpen:!1,lofiAmount:e.lofiAmount,radioToneAmount:e.radioToneAmount,bitCrushAmount:e.bitCrushAmount,sampleRateReductionAmount:e.sampleRateReductionAmount,bassAmount:e.bassAmount,midAmount:e.midAmount,trebleAmount:e.trebleAmount,stereoWidthAmount:e.stereoWidthAmount,smallSpeakerRoomAmount:e.smallSpeakerRoomAmount,wowFlutterAmount:e.wowFlutterAmount,noiseLevel:e.noiseLevel,vinylDustAmount:e.vinylDustAmount,delayAmount:e.delayAmount,reverbAmount:e.reverbAmount,chorusAmount:e.chorusAmount,tapeSaturationAmount:e.tapeSaturationAmount,compressorAmount:e.compressorAmount,fxOutputTrimAmount:e.fxOutputTrimAmount,playbackRate:e.playbackRate,volume:e.volume,onChangeLofiAmount:e.setLofiAmount,onChangeRadioToneAmount:e.setRadioToneAmount,onChangeBitCrushAmount:e.setBitCrushAmount,onChangeSampleRateReductionAmount:e.setSampleRateReductionAmount,onChangeBassAmount:e.setBassAmount,onChangeMidAmount:e.setMidAmount,onChangeTrebleAmount:e.setTrebleAmount,onChangeStereoWidthAmount:e.setStereoWidthAmount,onChangeSmallSpeakerRoomAmount:e.setSmallSpeakerRoomAmount,onChangeWowFlutterAmount:e.setWowFlutterAmount,onChangeNoiseLevel:e.setNoiseLevel,onChangeVinylDustAmount:e.setVinylDustAmount,onChangeDelayAmount:e.setDelayAmount,onChangeReverbAmount:e.setReverbAmount,onChangeChorusAmount:e.setChorusAmount,onChangeTapeSaturationAmount:e.setTapeSaturationAmount,onChangeCompressorAmount:e.setCompressorAmount,onChangeFxOutputTrimAmount:e.setFxOutputTrimAmount,onChangePlaybackRate:e.changePlaybackRate,onChangeVolume:e.changeVolume,onRestart:()=>{e.seekTo(0),e.playVideoWithAudio()},onSeek:e.seekTo,onStepFrame:e.stepFrame,onToggleAudioFx:e.toggleAudioFx,onToggleLoop:e.toggleLoop,onToggleMute:e.toggleMute,onToggleNoise:e.toggleNoise,onTogglePlayback:()=>{e.togglePlayback()},onBackToPlayback:()=>{n("playback")},onResetSettings:T,onImportSettings:D,onToggleVideoSettings:()=>{n("video-settings")},onToggleAudioSettings:()=>{n(r==="audio-settings"?"playback":"audio-settings")}})}),e.previewError&&x.jsx("p",{className:"mt-3 text-rose-400",children:e.previewError}),r==="video-settings"&&x.jsxs("div",{className:"mt-4 border-t border-slate-700 pt-4",children:[x.jsx("div",{className:"mb-3 flex flex-wrap gap-2",children:x.jsx("button",{type:"button",onClick:()=>{n("playback")},className:"inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800",children:"Back to Playback"})}),x.jsx(k.Suspense,{fallback:xo,children:x.jsx(er,{locale:t,colorLevels:o.colorLevels,curvature:o.curvature,ditherStrength:o.ditherStrength,glowStrength:o.glowStrength,smoothStrength:o.smoothStrength,toonSteps:o.toonSteps,edgeBoost:o.edgeBoost,isFilterEnabled:o.isFilterEnabled,monoTint:o.monoTint,neonBoost:o.neonBoost,neonDetail:o.neonDetail,neonSaturation:o.neonSaturation,paletteMode:o.paletteMode,phosphorStrength:o.phosphorStrength,spotMaskStrength:o.spotMaskStrength,bulbRadius:o.bulbRadius,blackFloor:o.blackFloor,phosphorDotLightBalance:o.phosphorDotLightBalance,phosphorDotInternalScale:o.phosphorDotInternalScale,phosphorDotBrightCore:o.phosphorDotBrightCore,phosphorDotCellFill:o.phosphorDotCellFill,phosphorDotFlatDisc:o.phosphorDotFlatDisc,phosphorDotNeighborBlend:o.phosphorDotNeighborBlend,closeUpNoiseStrength:o.closeUpNoiseStrength,scanlineBrightnessFade:o.scanlineBrightnessFade,scanlineStrength:o.scanlineStrength,scanline2Strength:o.scanline2Strength,selectedPreset:o.selectedPreset,sourceDimensions:e.sourceDimensions,targetHeight:o.targetHeight,targetWidth:o.targetWidth,matchTargetAspect:o.matchTargetAspect,vignetteStrength:o.vignetteStrength,onApplyPreset:u,onSetColorLevels:o.setColorLevels,onSetCurvature:o.setCurvature,onSetDitherStrength:o.setDitherStrength,onSetGlowStrength:o.setGlowStrength,onSetSmoothStrength:o.setSmoothStrength,onSetToonSteps:o.setToonSteps,onSetEdgeBoost:o.setEdgeBoost,onSetIsFilterEnabled:o.setIsFilterEnabled,onSetMonoTint:o.setMonoTint,onSetNeonBoost:o.setNeonBoost,onSetNeonDetail:o.setNeonDetail,onSetNeonSaturation:o.setNeonSaturation,onSetPaletteMode:o.setPaletteMode,onSetPhosphorStrength:o.setPhosphorStrength,onSetSpotMaskStrength:o.setSpotMaskStrength,onSetBulbRadius:o.setBulbRadius,onSetBlackFloor:o.setBlackFloor,onSetPhosphorDotLightBalance:o.setPhosphorDotLightBalance,onSetPhosphorDotInternalScale:o.setPhosphorDotInternalScale,onSetPhosphorDotBrightCore:o.setPhosphorDotBrightCore,onSetPhosphorDotCellFill:o.setPhosphorDotCellFill,onSetPhosphorDotFlatDisc:o.setPhosphorDotFlatDisc,onSetPhosphorDotNeighborBlend:o.setPhosphorDotNeighborBlend,onSetCloseUpNoiseStrength:o.setCloseUpNoiseStrength,onSetScanlineBrightnessFade:o.setScanlineBrightnessFade,onSetScanlineStrength:o.setScanlineStrength,onSetScanline2Strength:o.setScanline2Strength,onSetTargetHeight:i,onSetTargetWidth:m,onSetMatchTargetAspect:p,onSetVignetteStrength:o.setVignetteStrength})})]})]})}function wo({locale:t="en",src:e,stream:o,streamName:r,kind:n="video",looping:u,className:m,onError:i,initialFilterState:p,confirmDialog:T}){const{showConfirmDialog:D}=qo(),f=T??(v=>D({...v,title:v.title??"",body:v.body??""}).then(L=>L??!1)),G=k.useMemo(()=>xt()?.ui,[]),[S,N]=k.useState(G?.isHighResolution??!1),[X,q]=k.useState(!1),[ee,K]=k.useState("playback"),J=k.useRef(""),H=k.useRef(""),w=Jn(p),pe=S&&typeof window<"u"?Math.max(1,Math.min(window.devicePixelRatio||1,2)):1,R=Kn(w,X?"width":"contain",pe),b=k.useCallback(()=>{bn(),w.resetSettings(),R.resetAudioSettings(),N(!1)},[w,R]),se=k.useCallback(v=>{w.applyAllFilterSettings(v.filter),R.applyAudioSettings(v.audio),N(v.ui.isHighResolution),Jo(v.locale)},[w,R]),j=k.useCallback(()=>{if(!R.sourceDimensions)return;const v=Math.max(8,Math.round(w.targetWidth/R.sourceDimensions.width*R.sourceDimensions.height/8)*8);v!==w.targetHeight&&w.setTargetHeight(v)},[w.targetHeight,w.targetWidth,w.setTargetHeight,R.sourceDimensions]),F=k.useCallback(()=>R.sourceDimensions?.width&&R.sourceDimensions?.height?R.sourceDimensions.width/R.sourceDimensions.height:Math.max(w.targetWidth,1)/Math.max(w.targetHeight,1),[w.targetHeight,w.targetWidth,R.sourceDimensions]),Y=k.useCallback(v=>{if(w.setTargetWidth(v),!w.matchTargetAspect)return;const L=Math.max(F(),1e-4);w.setTargetHeight(Math.max(1,Math.round(v/L)))},[w,F]),ie=k.useCallback(v=>{if(w.setTargetHeight(v),!w.matchTargetAspect)return;const L=Math.max(F(),1e-4);w.setTargetWidth(Math.max(1,Math.round(v*L)))},[w,F]),V=k.useCallback(v=>{w.setMatchTargetAspect(v),v&&R.sourceDimensions&&j()},[w,R.sourceDimensions,j]),P=k.useCallback(v=>{if(w.applyPreset(v),v!=="phosphorDot"||!R.sourceDimensions)return;const L=ot.phosphorDot,_=Math.max(R.sourceDimensions.width,1),te=Math.max(R.sourceDimensions.height,1),z=_/te,I=L.width/L.height;let g=L.width,Z=L.height;z>I?Z=Math.max(8,Math.round(L.width/z/8)*8):g=Math.max(8,Math.round(L.height*z/8)*8),!(L.width===g&&L.height===Z)&&(w.setTargetWidth(g),w.setTargetHeight(Z))},[w.applyPreset,w.setTargetHeight,w.setTargetWidth,R.sourceDimensions]);return k.useEffect(()=>{w.matchTargetAspect&&R.sourceDimensions&&j()},[w.matchTargetAspect,R.sourceDimensions,j]),k.useEffect(()=>{if(o){const L=`stream:${o.id}:${n}:${r??""}`;if(J.current===L)return;J.current=L,(async()=>{try{await R.previewStream(o,n==="audio"?"audio":"video",r)}catch(_){i?.(_ instanceof Error?_:new Error(String(_)))}})();return}if(!e){J.current="";return}const v=`src:${e}:${n}`;J.current!==v&&(J.current=v,(async()=>{try{await R.previewUrl(e,n)}catch(L){i?.(L instanceof Error?L:new Error(String(L)))}})())},[e,o,r,n,i,R]),k.useEffect(()=>{R.refreshLayout()},[X,R.refreshLayout]),k.useEffect(()=>{R.refreshLayout()},[w.targetWidth,w.targetHeight,w.isFilterEnabled,pe,R.refreshLayout]),k.useEffect(()=>{if(typeof u!="boolean")return;const v=o?`stream:${o.id}:${n}`:e?`src:${e}:${n}`:"";if(!v){H.current="";return}const L=`${v}:${u}`;H.current!==L&&(H.current=L,R.setLoopingEnabled(u))},[n,u,R,e,o]),x.jsx("section",{className:m??"rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-lg",children:x.jsxs("div",{className:"space-y-4",children:[x.jsx($n,{locale:t,src:e,kind:n,player:R,isHighResolution:S,isFitWidthEnabled:X,controlPanelMode:ee,confirmDialog:f,onHighResolutionChange:N,onFitWidthChange:q,onError:i}),x.jsx(tr,{locale:t,player:R,filterState:w,controlPanelMode:ee,onControlPanelModeChange:K,onApplyPreset:P,onSetTargetWidth:Y,onSetTargetHeight:ie,onSetMatchTargetAspect:V,onResetSettings:b,onImportSettings:se})]})})}const nr=Object.freeze(Object.defineProperty({__proto__:null,RetroPlayer:wo,default:wo},Symbol.toStringTag,{value:"Module"}));export{ue as D,En as M,xn as R,ot as a,nr as b,xt as l};
