//
// node --experimental-strip-types ./audio/main_mp3mp4_test.ts
//
import { OscillatorNode, AudioContext, GainNode, AudioBufferSourceNode } from "node-web-audio-api";
import { readFile } from "node:fs/promises";

//
// oscillator --> gain --> output
const main = async () => {
    console.log("Hello, World!");
    const filePath = process.argv[2];
    if (!filePath) {
        console.error("Please provide a file path as an argument.");
        process.exit(1);
    }

    let fileData = await readFile(filePath);
    //fileData.buffer.slice(
    //    fileData.byteOffset,
    //    fileData.byteOffset + fileData.byteLength,
    //)
    const arrayBuffer = new Uint8Array(fileData).buffer;

    const context = new AudioContext();
    //const audioBuffer = await context.decodeAudioData(arrayBuffer, (decodedData) => {
    //    console.log("Audio decoded successfully:", decodedData);
    //});
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const source = new AudioBufferSourceNode(context, { buffer: audioBuffer });

    // source -> gain
    const gain = new GainNode(context, { gain: 0.5 });
    source.connect(gain);
    // gain -> output
    gain.connect(context.destination)
    source.start();

    await new Promise((resolve) =>
        setTimeout(resolve, audioBuffer.duration * 1000 + 300),
    );

    await context.close();
}

main();
