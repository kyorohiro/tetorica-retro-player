# FCEUmm Libretro WASM Notes

## Current Asset

手元には次の core がある。

- `public/fceumm_libretro.wasm`

## What We Confirmed

文字列レベルの確認では、core に次の export 名が含まれていた。

- `retro_api_version`
- `retro_set_video_refresh`
- `retro_set_audio_sample`
- `retro_set_audio_sample_batch`
- `retro_set_input_poll`
- `retro_set_input_state`
- `retro_set_environment`
- `retro_get_system_info`
- `retro_get_system_av_info`
- `retro_init`
- `retro_deinit`
- `retro_reset`
- `retro_run`
- `retro_load_game`
- `retro_unload_game`
- `retro_get_region`
- `retro_get_memory_data`
- `retro_get_memory_size`
- `retro_serialize_size`
- `retro_serialize`
- `retro_unserialize`
- `retro_cheat_reset`
- `retro_cheat_set`

また、次も見えている。

- `malloc`
- `free`
- `memory`
- `__indirect_function_table`

## Meaning

これは `fceumm_libretro.wasm` が、
少なくとも表面上は `libretro frontend` から直接呼べる形に近いことを示している。

つまり、

- `.wasm` だけでは動かない
- ただし `retro_*` API を呼ぶ frontend をこちらで実装すれば、
  `EmulatorJS iframe` を使わずに Retro Player へ接続できる可能性がある

## Missing Pieces

まだ未確認なのは次。

1. import 一覧
2. `retro_environment` callback で最低限どの command を要求されるか
3. `retro_load_game()` に渡す `retro_game_info` の ABI
4. video callback の pixel format
5. audio callback の運用方法
6. save / state / SRAM の扱い

## Likely Frontend Structure

最初の最小構成はこれで良い。

1. WASM を fetch / instantiate する
2. `retro_set_environment()` をつなぐ
3. `retro_set_video_refresh()` をつなぐ
4. `retro_set_audio_sample_batch()` は最初は捨てるか簡易実装
5. `retro_set_input_poll()` / `retro_set_input_state()` をつなぐ
6. `retro_init()`
7. `retro_load_game()`
8. `retro_get_system_av_info()`
9. `retro_run()` を 60fps で回す
10. frame buffer を `HTMLCanvasElement` へ描く
11. その canvas を `previewCanvasSource()` へ渡す

## Practical Strategy

最初は次を目標にすると良い。

- 音なし
- state なし
- core option なし
- `.nes` を 1 本読み込める
- 256x240 の映像が canvas に出る

この段階まで行ければ、
Retro Player の filter / effect テスト用途としては十分価値がある。

## Risk

`retro_*` export が見えていても、
内部 ABI や import 条件次第では追加 glue が必要になる可能性はある。

特に不確定なのは次。

- function pointer の受け渡し方法
- memory への struct 書き込みレイアウト
- pixel format が `XRGB8888` 以外だった場合の変換

## Next Step

次は browser 上で `WebAssembly.Module.imports()` / `exports()` を確認する probe を使って、

- import 名
- export 名
- memory / table の見え方

を実測する。
