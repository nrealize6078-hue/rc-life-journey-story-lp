# LIFE JOURNEY（ストーリー版）LP

元サイト: https://realize-life-journey-story.uminchu-t0422.chatgpt.site/ （2026年9月25日に取得）
ビルド不要の静的サイト。`index.html` / `style.css`（元のまま）/ `enhance.css`（追加分）/ `script.js` / `assets/` / `life-journey.pdf`

プレビュー: `.claude/launch.json` の `rc-life-journey-story-lp`（ポート8976）

## 元サイトから変えたこと（2026年9月25日）

- 末尾の Cloudflare challenge スクリプトを削除
- 矢印（↓ ↗ ↑）を撤去。ヒーローの暗い重ね（.hero-shade）を撤去
- ファーストビュー: 写真を文字の後ろに敷く（`.hero-stage`）。PCは写真を右寄せにして左端を空の色へ溶かす。
  タブレット・スマホは写真を下端にそろえて全面に敷き、上の空に文字・下に人物。文字の後ろだけ空の色でなじませる
  （範囲は script.js の fitShade が文字の高さに合わせる）
- 文節改行: 見出し・本文を `<w-b>` で文節ごとに包む（`_apply_bunsetsu.py`。BudouX 使用）
- スマホで見出しの改行位置を固定: `data-fit`（`_apply_fit.py`）
- アニメーション: 読み込み時のファーストビュー、スクロールで現れる文字・写真、横長写真のゆっくりした動き、
  スマホで下にスクロールするとヘッダーが隠れる。`prefers-reduced-motion` では全部止める
- JSが読めなかったときは2.5秒で演出を解除して全文を表示する（head の inline script）

- 冊子PDF: 最終ページ下の帯にLINE友だち追加のQR（https://lin.ee/u9d0tbA）。`python _add_line_qr.py` で
  元PDF（`_original/life-journey.pdf`）から作り直す
- 固定ボトムバー: LINE友だち追加ボタン

## 文章を変えたら

```bash
pip install budoux beautifulsoup4
python _apply_bunsetsu.py   # 文節タグを貼り直す（何度実行してもよい）
```

見出しの文章を変えたときは `_apply_fit.py` の値も測り直す。
320px 幅で `<br>` どおりの行数に収まる最大の文字サイズを二分探索で出し、×0.97 ÷ 3.2 を vw にする。
測定用に `_sp_frame.html?w=320,375` がある（同一オリジンの iframe で幅を固定して表示する）。

CSS を変えたら `index.html` の `enhance.css?v=` の数字を上げる（キャッシュ対策）。

## 公開時に含めないもの

`_` で始まるファイル・フォルダ（`_original/` は取得した元サイトの控え）、`README.md`
