# Native mode の入力FFT

Load長押しのFFTは従来、エフェクト・音量処理後のanalyserを表示していた。これでは入力が届いているかをVolume 0の状態で判断できない。

- 入力ソースから専用inputAnalyserへ直接分岐する。入力トリム、音量、ミュート、FX、生成ノイズを通さず、スピーカーにも接続しない。
- Native modeのFFT表示は入力側を選択し、非Nativeは従来の出力側を表示する。
- NativeでWebAudio再生を迂回する場合も、元のMediaStreamがあればFFT専用に接続する。通常メディアはcaptureStreamが利用可能な場合のみ試す。取得できない場合はFFTを表示せず、ネイティブ再生を続ける。
- FFmpeg/HLSのネイティブ再生はAudioNodeから音声を取得できない前提を維持し、FFTのための接続を試みない。
- MediaStreamの入力FFTはVolume 0・ミュートと独立する。通常メディアのcaptureStreamが提供するサンプルについてはブラウザー側の制約が残る。

検証: `npm test` 47件、`npx tsc --noEmit` 通過。`npx vite build` 成功（チャンクサイズ警告あり）。追加3件で、ミュート・Volume 0の共有ストリームをFFTだけに接続すること、HLSを除外すること、取得失敗で再生を妨げないことを確認。

実ブラウザーでの波形確認はこれから。共有を開始し直し、Native mode・Volume 0でLoad長押しのFFTが共有元の再生／停止に追従するか確認する。
