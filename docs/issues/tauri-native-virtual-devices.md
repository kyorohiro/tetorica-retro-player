# Tauri Native で Virtual Microphone / Virtual Camera をやる場合

調査メモ日: 2026-07-01

## 背景

- Retro Player の Web Audio / WebGL 加工結果を Zoom / Meet / OBS などへ渡したくなる
- 目的は「Retro 加工した音声や映像を仮想デバイスとして他アプリに見せる」こと
- つまり Virtual Microphone / Virtual Camera 相当の出力が欲しい

## 結論

**別アプリとして native 主体で作るなら現実的。**

ただし、**WebView を処理の中核に置く構成は現実的ではない**。

Tauri を使うとしても役割分担は次の形がよい。

- WebView: UI、設定画面、プレビュー
- Native 側: 音声処理、映像処理、仮想デバイス出力

## なぜ WebView 中心だと厳しいか

ブラウザ / WebView の中では、次はできる。

- `getUserMedia()` でマイク / カメラを取得
- Web Audio / Canvas / WebGL で加工
- `MediaStream` として録音や WebRTC 送信に使う

しかし、次はできないか、実用上かなり厳しい。

- 加工後の音を OS の Virtual Microphone として公開する
- 加工後の映像を OS の Virtual Camera として公開する

理由:

- Web の権限では OS 仮想デバイスの作成まで届かない
- WebView -> native へ音声フレーム / 映像フレームを低遅延で戻し続ける必要がある
- A/V sync、buffering、sample rate、format 変換の管理が必要
- Chrome / Safari / WKWebView / WebView2 差分を全部背負う
- 途切れた時の recovery がかなり複雑

このため、**Web 側で加工してから native 側へ戻す橋渡しコストの方が大きくなりやすい**。

## 現実的な構成

### 案A: WebView は UI のみ

最も現実的。

- Tauri UI で設定を変更
- native 側で audio pipeline / video pipeline を持つ
- native 側で Virtual Mic / Virtual Camera に出力

この場合、Web Audio API 相当の DSP を native 側で用意する必要がある。

## 期待できる用途

- Retro 加工した音声を Zoom にマイクとして渡す
- Retro 加工した映像を仮想カメラとして Meet / OBS に渡す
- アプリ内録音ではなく、他アプリ入力として使う

## 逆に今の Retro Player 本体で無理にやらない方がよいこと

- Web Audio の最終出力をそのまま OS 仮想マイクへ戻そうとする
- WebGL 加工後映像を WebView から native へ毎フレーム戻して仮想カメラ化する
- 既存のクロスブラウザ差分を抱えたまま、さらに仮想デバイス層を足す

## 実装するなら先に確認したい論点

- 対応 OS をどこまで絞るか
  - macOS のみ
  - Windows のみ
  - 両対応
- 先にやるのはどちらか
  - Virtual Microphone
  - Virtual Camera
- エフェクトはどこまで必要か
  - EQ / bit crush / wow flutter 程度
  - 録音 / 配信用の安定優先
- 低遅延をどこまで要求するか
  - 通話用途
  - 録画 / 配信用途

## 現時点の判断

- Retro Player 本体の WebView ベース構成で Virtual Mic / Virtual Camera まで伸ばすのは重い
- もし本気でやるなら、**別アプリとして native 中心で設計した方がよい**
- Tauri を使うこと自体は問題ないが、**処理本体は native、WebView は UI** と割り切るのが前提
