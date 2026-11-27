const numerologyData = [
  { num: "1", isMaster: false, message: "今日は自分の「好き」を一番に選んでみて。小さな一歩が新しい風を運んできそうです。", colorName: "クリアレッド", colorCode: "#E56B6F", bgStyle: "#E56B6F", motif: "まっすぐな線" },
  { num: "2", isMaster: false, message: "少しだけペースを落として、周りの音や優しさに耳を澄ませてみると心地よく過ごせそう。", colorName: "ペールブルー", colorCode: "#8ECAE6", bgStyle: "#8ECAE6", motif: "三日月" },
  { num: "3", isMaster: false, message: "真面目になりすぎず、遊び心をひとつまみ。ふとした思いつきが楽しい時間につながります。", colorName: "レモンイエロー", colorCode: "#F4D35E", bgStyle: "#F4D35E", motif: "星" },
  { num: "4", isMaster: false, message: "いつものお茶を丁寧に淹れたり、机の上を少し整えたり。足元を固めると心が落ち着きます。", colorName: "フォレストグリーン", colorCode: "#6A994E", bgStyle: "#6A994E", motif: "四角いもの" },
  { num: "5", isMaster: false, message: "窓を開けて深呼吸を。いつもと違う道や新しい選択が、気分を軽やかに変えてくれます。", colorName: "ターコイズブルー", colorCode: "#48CAE4", bgStyle: "#48CAE4", motif: "羽" },
  { num: "6", isMaster: false, message: "今日は頑張るよりも「自分を甘やかす」日。温かい飲み物や好きな香りでほっと一息ついて。", colorName: "シェルピンク", colorCode: "#F2A6B3", bgStyle: "#F2A6B3", motif: "花" },
  { num: "7", isMaster: false, message: "静かなひとり時間が心を整えてくれます。気になったことをじっくり味わうのもおすすめです。", colorName: "ディープパープル", colorCode: "#7B6D8D", bgStyle: "#7B6D8D", motif: "鍵" },
  { num: "8", isMaster: false, message: "これまで積み重ねてきた自分を褒めてあげて。お気に入りのものを身につけると自信が湧いてきそう。", colorName: "サンセットオレンジ", colorCode: "#F48C06", bgStyle: "#F48C06", motif: "丸いもの" },
  { num: "9", isMaster: false, message: "不要なものを手放して、心に余白を作る日。ゆっくりお風呂に浸かって疲れを流すのも素敵です。", colorName: "ラベンダー", colorCode: "#B8A9C9", bgStyle: "#B8A9C9", motif: "水滴" },
  { num: "11", isMaster: true, message: "直感のアンテナが冴える特別な日。ふと目に入った言葉やひらめきを大切にしてみて。", colorName: "ムーンシルバー", colorCode: "#C4CAD0", bgStyle: "#C4CAD0", motif: "光" },
  { num: "22", isMaster: true, message: "思い描いていたことが形になりやすい日。小さなアイデアでも、まずはメモに書き出してみて。", colorName: "ロイヤルブルー", colorCode: "#3A6EA5", bgStyle: "#3A6EA5", motif: "地図" },
  { num: "33", isMaster: true, message: "「まあいっか！」と肩の力を抜いて笑える日。理屈抜きでワクワクする方へ進んで大丈夫です。", colorName: "オーロラパステル", colorCode: "#F6C2D9", bgStyle: "linear-gradient(135deg, #F6C2D9, #FCE1A8, #B5E2FA)", motif: "虹" }
];

function drawNumber() {
  const isSpecial = Math.random() < 0.15;
  const pool = numerologyData.filter(item => item.isMaster === isSpecial);
  const selected = pool[Math.floor(Math.random() * pool.length)];

  const placeholder = document.getElementById("placeholder");
  const resultArea = document.getElementById("resultArea");

  placeholder.style.display = "none";
  resultArea.style.display = "none";
  void resultArea.offsetWidth;
  resultArea.style.display = "block";

  document.getElementById("specialBadge").style.display = selected.isMaster ? "inline-block" : "none";
  
  const numberCircle = document.getElementById("numberCircle");
  numberCircle.textContent = selected.num;
  numberCircle.style.background = selected.bgStyle;

  document.getElementById("resultCard").style.borderColor = selected.colorCode;
  document.getElementById("messageText").textContent = selected.message;
  document.getElementById("colorChip").style.background = selected.bgStyle;
  document.getElementById("colorName").textContent = selected.colorName;
  document.getElementById("motifText").textContent = selected.motif;
  document.getElementById("drawBtn").textContent = "もう一度引く";
  
    // resultCard の枠線と数字サークルの光彩（box-shadow）をカラーに連動させる
  const resultCard = document.getElementById("resultCard");
  resultCard.style.borderColor = selected.colorCode;
  resultCard.style.boxShadow = `0 8px 28px rgba(7, 17, 29, 0.5), 0 0 20px ${selected.colorCode}40`;

  const numberCircle = document.getElementById("numberCircle");
  numberCircle.textContent = selected.num;
  numberCircle.style.background = selected.bgStyle;
  numberCircle.style.boxShadow = `0 0 22px ${selected.colorCode}80`;

}
