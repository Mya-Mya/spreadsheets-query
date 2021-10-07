# 概要と計画
```
sq.open("Spreadsheet-ID", "FoodsSheet")
  .select(["name", "genre", "calorie"])
  .where(sq.numberLessThan("calorie", 500))
  .orderby("name")
  .limit(20)
  .json()
```
* Spreadsheetにある情報をSQLと似た様式で抽出、削除、追加できるライブラリ。
* いわゆる「SQLインジェクション」を防ぐため、「WHERE句」はオブジェクト指向プログラミングにより構築をする。悪意のあるコードが混入しないような仕組みを設ける。
* 情報の抽出には[The Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage)を用いる。
同言語のコードを記述した[QUERY関数](https://support.google.com/docs/answer/3093343?hl=ja)を一時的にSpreadsheet上に貼り付け、その結果を読み取るという仕組み。
* 情報の削除には一般的な線形探索を用いる。
* 情報の追加にはSpreadsheet Serviceの関数をそのまま使う。
* これらのコードはWebpackを用いてGAS上で実行可能なコードに変換と集約をした後、一般公開する。一般公開すると、他のGASプロジェクトから本ライブラリを使用できる。
