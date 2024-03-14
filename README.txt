sass、jsの仕様及び、gulpでのコンパイルを前提に作成しています。

Sassは"Flocss"を参考に作成しており、globalフォルダ内に
font,color,サイトサイズ等の変数と関数を設定しております。

仕様前にはgulpの動作を確認し、動作しない場合にはターミナルでpackage.json内のプラグをインストールしてください cmd'npm install'

style.scssは基本的に編集する必要はなく、各ファイルの"_index.sass"にパスをつないでください

jsの仕様についてもアトミックデザインで管理しており、gulpでのconcatで結合処理しております。