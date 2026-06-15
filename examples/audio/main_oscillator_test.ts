//
// node --experimental-strip-types ./audio/main_oscillator_test.ts
//
import { OscillatorNode, AudioContext } from "node-web-audio-api";

//
// oscillator --> gain --> output
const main = () => {
    console.log("Hello, World!");
    const context = new AudioContext();
    // oscillator
    const oscillator = new OscillatorNode(context);
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(220, context.currentTime);

    // gaiin
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.03, context.currentTime);

    // connect nodes (oscillator --> gain --> output)
    oscillator.connect(gain);
    gain.connect(context.destination);

    // start oscillator and stop after 3 seconds
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
        console.log("Oscillator stopped.");
    }, 3000);
    
}

main();
