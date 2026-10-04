# ウィンドウ録画とBrowserキャプチャー

通常のキャプチャー・プレビュー・加工録画は従来のBrowser APIを使用します。
デスクトップ版の「ウィンドウを録画」は、選んだウィンドウの加工前の映像・音声を
MP4へ直接保存する独立した機能です。常時の映像プレビューは行わず、既存の動画View内で録画対象の確認用静止画を約3秒ごとに表示します。連続したIPC/JPEG/PCMとHLSのネイティブプレビューは使いません。

Browser API経由では共有音声の録音がOS・ブラウザーの制限を受けます。
確認済みのmac版のウィンドウ共有では音声を録音できません。
音付きのウィンドウ保存には「ウィンドウを録画」を使用してください。

Viewに録画マーク・対象名・保存先・録画時間・出力済みサイズと停止ボタンを表示します。
停止すると確認表示を消し、元のView表示へ戻ります。データ更新が5秒以上止まると表示で知らせます。
データ増加は録画内容・音声の正しさを保証しません。短い試し録画の再生で確認してください。

## 操作

1. キャプチャーメニューで「ウィンドウを録画」を選ぶ。
2. 対象ウィンドウとMP4保存先を選ぶと録画開始。
3. 「ウィンドウ録画を停止」で保存完了。画面に保存先を表示する。

録画中もBrowserキャプチャーなどのプレイヤー表示は維持します。
プレイヤーの通常の録画ボタンはBrowser側の加工録画用で、このMP4とは独立しています。
対象ウィンドウの映像、原音を保存し、フィルター、Audio FX、プレイヤーの音量は適用しません。
アプリ終了前に録画を停止してください。失敗時は画面に復旧用一時ディレクトリを表示します。

## 対応と音声の範囲

- macOS 13以降: 選んだウィンドウのアプリ音声。自アプリの音声は除外。
  初回は「画面収録とシステムオーディオ録音」の権限を与え、再起動する。
- Windows: 映像は選んだウィンドウ。音声は既定の出力デバイス全体。
  他アプリやプレイヤーの再生音も含まれるため、録画中の再生に注意する。
- Web/Linux/mobile: このネイティブ録画は提供せず、Browserキャプチャーを使用する。

## 共通の録画経路

両OSとも `src-native-capture` と固定した `scap 0.1.0-beta.1` を使用します。
BGRA映像とPCMを取得時刻付きMatroskaとしてffmpegの標準入力へ送り、H.264/AACのMP4へ保存します。
常時のJPEG転送とHTTP/HLSプレビューは行いません。確認用に縮小JPEGを約3秒ごとに送ります。
1280×720枠・最大30fps。macはVideoToolbox、WindowsはQSVを先に試し、起動できなければlibx264へ切り替えます。
静止画面・無音時は前フレームと無音を補います。出力デバイスの形式が変わったら録画を再開します。

通常のdevにはシステムffmpegが必要です。macではHomebrewの標準パスも検索します。
配布版とGitHub Actionsのsidecarビルドは同梱ffmpegを使用します。

## 検証

```sh
npm test
npm run build
cargo test -p tetorica-native-capture --locked
cargo check -p tetorica-native-capture --target x86_64-pc-windows-gnu --locked
python3 scripts/check-native-ffmpeg-sync.py
```

同期検証は実ffmpegで合成映像・音声を保存し、同時の点滅と音が1フレーム以内に一致すること、
コマ欠落で時間が縮まないこと、MP4のみを生成することを確認します。
Windowsアプリ全体はGitHub Actionsの「Build Desktop」でビルドし、実機にインストーラーを入れて確認します。
macからの型チェックだけではWindows実機の動作は保証できません。
長時間同期、対象ウィンドウ終了、リサイズ、停止・再選択も実機で確認してください。

## scapの保守

MITの公開パッケージを `third_party/scap` に固定し、workspaceの `[patch.crates-io]` で使用します。
元repositoryは https://github.com/helmerapp/scap 、元revisionは
`f9a62144bf1011e29ffa6ac1f49e5e0d020ca40a`。stable 0.0.8には音声対応がありません。
補正は `third_party/scap/LOCAL.patch` に記録しています。
停止・受信タイムアウト、上限付きキュー、macのPCM配列・自音声除外・候補と寸法取得、
Windows依存API・row padding・取得時刻などを補正しています。

更新時は元パッケージを別ディレクトリに展開し、各補正の取り込み状況を確認して必要分のみ適用します。
ソース・manifest・ライセンス・元revision・LOCAL.patchを更新し、共通crateのversionとCargo.lockを更新します。
上記検証に加えてmac実機、Actionsビルド、Windows実機で確認してください。
