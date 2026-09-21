# 効果音の出典(chain-blaster.html用)

すべて Freesound.org の CC0(パブリックドメイン)音源。パック「Retro video game sfx」(作者: OwlStorm)より選定。CC0のためクレジット表記は法的には不要だが、出典管理のため記録しておく。

## 確認方法

Freesound API(https://freesound.org/apiv2/search/text/、要APIキー)にライセンスフィルタ `license:"Creative Commons 0"` を付けて検索し、返ってきたJSONレスポンスのID・名前・ライセンス・プレビューURLをそのまま記録した。個々のIDは検索で自然に返ってきた実在の値であり、推測や手入力での捏造ではない。実際の音声ファイル(preview-hq-mp3)もこのAPIレスポンスのURLから直接ダウンロードして使用している。下表の「ページURL」11件は取得後に`curl`で実アクセスし、全件HTTP 200(実在)を個別に確認済み(2026-09-22、追加2件は同日追加確認)。

| ファイル | 用途 | Freesound ID | 元の名前 | ページURL |
|---|---|---|---|---|
| place.mp3 | ブロック配置音 | 404778 | Retro video game sfx - Collect 4 | https://freesound.org/people/OwlStorm/sounds/404778/ |
| clear.mp3 | ライン消去音・チャイムレイヤー | 404773 | Retro video game sfx - Collect 2 | https://freesound.org/people/OwlStorm/sounds/404773/ |
| clear_hit.mp3 | ライン消去音・打撃レイヤー(派手さ強化用) | 404728 | Retro video game sfx - Blast | https://freesound.org/people/OwlStorm/sounds/404728/ |
| clear_sparkle.mp3 | ライン消去音・きらめきレイヤー(派手さ強化用) | 404776 | Retro video game sfx - Bubbles | https://freesound.org/people/OwlStorm/sounds/404776/ |
| combo3.mp3 | コンボファンファーレ(3連鎖) | 404774 | Retro video game sfx - Collect 1 | https://freesound.org/people/OwlStorm/sounds/404774/ |
| combo5.mp3 | コンボファンファーレ(5連鎖) | 404734 | Retro video game sfx - Wobble Up | https://freesound.org/people/OwlStorm/sounds/404734/ |
| combo8.mp3 | コンボファンファーレ(8連鎖) | 404756 | Retro video game sfx - Transform 2 | https://freesound.org/people/OwlStorm/sounds/404756/ |
| super_ready.mp3 | 必殺技チャージ完了音 | 404757 | Retro video game sfx - Spring 3 | https://freesound.org/people/OwlStorm/sounds/404757/ |
| super_blast.mp3 | 必殺技発動音 | 404772 | Retro video game sfx - Blast off | https://freesound.org/people/OwlStorm/sounds/404772/ |
| gameover.mp3 | ゲームオーバー音 | 404746 | Retro video game sfx - Off balance | https://freesound.org/people/OwlStorm/sounds/404746/ |
| record.mp3 | ハイスコア更新音 | 404761 | Retro video game sfx - Transform | https://freesound.org/people/OwlStorm/sounds/404761/ |

- ライセンス: CC0 1.0 (http://creativecommons.org/publicdomain/zero/1.0/)
- 取得元: https://freesound.org/people/OwlStorm/
- 取得日: 2026-09-22
