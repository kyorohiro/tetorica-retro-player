// 1. Execute the node-web-audio-api polyfill first to set up global variables
import 'web-audio-api/polyfill';

// 2. Dynamically import Tone.js after globals are exposed
const Tone = await import('tone');

// 3. Create your node-web-audio-api context and feed it to Tone.js
const audioCtx = new AudioContext();
Tone.setContext(audioCtx);

async function playToneTest() {
    await Tone.start();
    const synth = new Tone.FMSynth({
        harmonicity: 2,
        modulationIndex: 8,
        envelope: {
            attack: 0.01,
            decay: 0.15,
            sustain: 0.05,
            release: 0.25,
        },

    }).toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C5", "8n", now);
    synth.triggerAttackRelease("E5", "8n", now + 0.18);
    synth.triggerAttackRelease("G5", "8n", now + 0.36);
    synth.triggerAttackRelease("E5", "8n", now + 0.54);
}

playToneTest()