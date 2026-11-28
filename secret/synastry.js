const SYN_HOUSE_EFFECTS = {
  1: "第1ハウス（あなた自身）：お相手はあなたの個性や魅力をストレートに引き出し、一緒にいると自分らしく輝けます。",
  2: "第2ハウス（才能・豊かさ）：お相手はあなたの隠れた才能やセンスに気づかせ、現実的な豊かさを育むきっかけをくれます。",
  3: "第3ハウス（言葉・学び）：会話や情報交換が尽きない楽しい関係。言葉を通じて新しい視点や好奇心がどんどん広がります。",
  4: "第4ハウス（心の拠り所）：家族のようにホッと安心できる居場所を感じられる関係。素の自分を安心して見せられます。",
  5: "第5ハウス（創造・喜び）：一緒にいるとワクワクして創造力や遊び心が刺激される、ドラマチックで楽しいご縁です。",
  6: "第6ハウス（日常・役割）：日々の生活や仕事面で自然とサポートし合える関係。実用的な面でとても頼りになる存在です。",
  7: "第7ハウス（パートナー）：一対一の対等なパートナーシップを象徴する配置。お互いを映す鏡として深く向き合える重要な相手です。",
  8: "第8ハウス（深い絆・変容）：表面的な付き合いを超え、心の奥底で強く結びつく宿命的なご縁。価値観が大きく深まります。",
  9: "第9ハウス（精神性・冒険）：精神的な視野を広げ、未知の世界や高い理想へと一緒に成長していける師や同志のような関係です。",
  10: "第10ハウス（社会的使命）：仕事や目標達成において強い刺激と応援を与え合い、公の場での飛躍を後押ししてくれる相手です。",
  11: "第11ハウス（未来・仲間）：年齢や立場を超えた親友のようにフラットで自由な関係。未来の夢や理想を語り合えます。",
  12: "第12ハウス（癒やし・潜在意識）：言葉を超えた直感や優しさで繋がる不思議なご縁。一緒にいると心が浄化され癒やされます。"
};

function getNumCompatibility(n1, n2, label) {
  const a = (n1 > 9) ? (n1 % 9 || 9) : n1;
  const b = (n2 > 9) ? (n2 % 9 || 9) : n2;
  const diff = Math.abs(a - b);
  if (n1 === n2) return "【" + label + "：同じ魂の波長】価値観や感覚が驚くほど似ていて、言葉にしなくても自然に理解し合える安心感があります。";
  if ((a + b) === 10 || diff === 5) return "【" + label + "：補い合う鏡の関係】自分にない魅力を相手が持っているため、一緒にいることで世界が大きく広がる刺激的な組み合わせです。";
  if (diff === 1 || diff === 8) return "【" + label + "：隣り合う成長の関係】お互いの違いが良いスパイスになり、自然体で支え合いながらステップアップできます。";
  if ((a % 2) === (b % 2)) return "【" + label + "：心地よいリズム】行動のテンポや物事の捉え方が近く、無理なく自然体で長い時間を過ごせる穏やかな相性です。";
  return "【" + label + "：新鮮な化学反応】異なる視点を持つからこそ新しい発見があり、二人で力を合わせると予想以上のアイデアや力が生まれます。";
}

function ensureSynastryDOM() {
  let synArea = document.getElementById("synResultsArea");
  if (!synArea) {
    synArea = document.createElement("div");
    synArea.id = "synResultsArea";
    synArea.className = "results-grid";
    document.querySelector(".container").appendChild(synArea);
  }
  synArea.innerHTML =
    '<div class="panel"><h2>💞 数秘 ＆ 星の相性リーディング</h2>' +
    '<div class="sync-detail" id="synNumArea" style="margin-bottom:16px;"></div>' +
    '<h3 class="sub-heading">🏠 お相手の星が照らすあなたのハウス</h3>' +
    '<div class="sync-detail" id="synHouseArea" style="margin-bottom:16px;"></div>' +
    '<h3 class="sub-heading">✨ 2人の天体アスペクト（星のご縁）</h3>' +
    '<div class="sync-detail" id="synAstroArea"></div></div>' +
    '<div class="panel"><h2>🌌 シナストリー二重円（内：あなた／外：お相手）</h2>' +
    '<div class="chart-wrapper"><svg id="synastryChart" xmlns="http://w3.org" viewBox="0 0 420 420"></svg>' +
    '<div class="chart-legend"><span style="color:#ffe082;">● 内円：あなた</span><span style="color:#e1bee7;">● 外円：お相手</span><span style="color:#64b5f6;">― 調和</span><span style="color:#ff8a80;">― 強調/刺激</span></div></div>' +
    '<table><thead><tr><th>天体</th><th>あなた</th><th>お相手</th></tr></thead><tbody id="synTableBody"></tbody></table></div>';
  return synArea;
}

function renderSynastryChart(p1List, p2List, baseSign1) {
  const svg = document.getElementById("synastryChart");
  if (!svg) return;
  const cx = 210, cy = 210, rOut = 195, rSign = 165, rP2 = 142, rP1 = 108, rAsp = 82;
  let html = '<circle cx="' + cx + '" cy="' + cy + '" r="' + rOut + '" fill="#14151e" stroke="#3b3f54" stroke-width="2"/>';

  for (let i = 0; i < 12; i++) {
    const hNum = i + 1;
    const sIdx = (baseSign1 + i) % 12;
    const a1 = (180 - i * 30) * Math.PI / 180;
    const am = (165 - i * 30) * Math.PI / 180;
    const isAx = (i % 3 === 0);
    html += '<line x1="' + (cx + rAsp * Math.cos(a1)) + '" y1="' + (cy + rAsp * Math.sin(a1)) + '" x2="' + (cx + rOut * Math.cos(a1)) + '" y2="' + (cy + rOut * Math.sin(a1)) + '" stroke="' + (isAx ? "#d4af37" : "#2f3244") + '" stroke-width="' + (isAx ? 1.5 : 1) + '"/>';
    html += '<text x="' + (cx + 180 * Math.cos(am)) + '" y="' + (cy + 180 * Math.sin(am)) + '" fill="#d4af37" font-size="14" text-anchor="middle" dominant-baseline="central">' + SIGN_SYM.at(sIdx) + '</text>';
    html += '<text x="' + (cx + 90 * Math.cos(am)) + '" y="' + (cy + 90 * Math.sin(am)) + '" fill="#8b8fa3" font-size="9" text-anchor="middle" dominant-baseline="central">' + hNum + '</text>';
  }

  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rSign + '" fill="none" stroke="#3b3f54" stroke-width="1.2"/>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="125" fill="none" stroke="#2a2d3d" stroke-dasharray="3,3"/>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rAsp + '" fill="#11121a" stroke="#3b3f54" stroke-width="1"/>';

  const baseLon = baseSign1 * 30;
  p1List.forEach(function(p1) {
    p2List.forEach(function(p2) {
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;
      let color = "";
      if (diff <= 6 || Math.abs(diff - 90) <= 4 || Math.abs(diff - 180) <= 6) color = "rgba(255, 138, 128, 0.55)";
      else if (Math.abs(diff - 60) <= 4 || Math.abs(diff - 120) <= 6) color = "rgba(100, 181, 246, 0.55)";
      if (color) {
        const ang1 = (180 - norm360(p1.lon - baseLon)) * Math.PI / 180;
        const ang2 = (180 - norm360(p2.lon - baseLon)) * Math.PI / 180;
        html += '<line x1="' + (cx + rAsp * Math.cos(ang1)) + '" y1="' + (cy + rAsp * Math.sin(ang1)) + '" x2="' + (cx + rAsp * Math.cos(ang2)) + '" y2="' + (cy + rAsp * Math.sin(ang2)) + '" stroke="' + color + '" stroke-width="1.1"/>';
      }
    });
  });

  function drawRing(list, radius, bg, stroke, txtColor) {
    const placed = list.map(function(p) {
      const rel = norm360(p.lon - baseLon);
      return { sym: p.sym, rel: rel, draw: rel };
    }).sort(function(a, b) { return a.rel - b.rel; });

    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < placed.length; i++) {
        const c = placed.at(i);
        const n = placed.at((i + 1) % placed.length);
        let diff = n.draw - c.draw;
        if (diff < 0) diff += 360;
        if (diff < 11) {
          c.draw = norm360(c.draw - (11 - diff) / 2);
          n.draw = norm360(n.draw + (11 - diff) / 2);
        }
      }
    }
    placed.forEach(function(p) {
      const ang = (180 - p.draw) * Math.PI / 180;
      const px = cx + radius * Math.cos(ang);
      const py = cy + radius * Math.sin(ang);
      html += '<circle cx="' + px + '" cy="' + py + '" r="10" fill="' + bg + '" stroke="' + stroke + '"/>';
      html += '<text x="' + px + '" y="' + py + '" fill="' + txtColor + '" font-size="11" text-anchor="middle" dominant-baseline="central">' + p.sym + '</text>';
    });
  }

  drawRing(p1List, rP1, "#1c1e29", "#d4af37", "#ffe082");
  drawRing(p2List, rP2, "#251f38", "#8a75d6", "#e1bee7");
  svg.innerHTML = html;
}

function calculateSynastry() {
  const y1 = parseInt(document.getElementById("year").value, 10);
  const m1 = parseInt(document.getElementById("month").value, 10);
  const d1 = parseInt(document.getElementById("day").value, 10);
  const y2El = document.getElementById("year2");
  const m2El = document.getElementById("month2");
  const d2El = document.getElementById("day2");

  if (!y2El || !m2El || !d2El) return;
  const y2 = parseInt(y2El.value, 10);
  const m2 = parseInt(m2El.value, 10);
  const d2 = parseInt(d2El.value, 10);

  if (isNaN(y1) || isNaN(m1) || isNaN(d1) || isNaN(y2) || isNaN(m2) || isNaN(d2)) {
    alert("あなたとお相手、両方の生年月日を入力してください。");
    return;
  }

  const synArea = ensureSynastryDOM();

  const past1 = calcNum(d1), past2 = calcNum(d2);
  const life1 = calcNum(String(y1).concat(String(m1), String(d1)).split("").reduce(function(a, b) { return a + Number(b); }, 0));
  const life2 = calcNum(String(y2).concat(String(m2), String(d2)).split("").reduce(function(a, b) { return a + Number(b); }, 0));
  const fut1 = calcNum(m1 + d1), fut2 = calcNum(m2 + d2);

  document.getElementById("synNumArea").innerHTML =
    '<div class="sync-item"><strong>🌟 本質の相性：現在数「' + life1 + '」 × 「' + life2 + '」</strong><br>' + getNumCompatibility(life1, life2, "魂の軸") + '</div>' +
    '<div class="sync-item"><strong>🌱 自然体の相性：過去数「' + past1 + '」 × 「' + past2 + '」</strong><br>' + getNumCompatibility(past1, past2, "素の空気感") + '</div>' +
    '<div class="sync-item"><strong>🚀 未来の相性：未来数「' + fut1 + '」 × 「' + fut2 + '」</strong><br>' + getNumCompatibility(fut1, fut2, "目指す方向") + '</div>';

  const h1Val = document.getElementById("hour").value.trim();
  const min1Val = document.getElementById("minute").value.trim();
  const jd1 = getJulianDay(y1, m1, d1, h1Val !== "" ? parseInt(h1Val, 10) : 12, (h1Val !== "" && min1Val !== "") ? parseInt(min1Val, 10) : 0);
  const p1List = calcPlanets(jd1);

  const h2Val = document.getElementById("hour2") ? document.getElementById("hour2").value.trim() : "";
  const min2Val = document.getElementById("minute2") ? document.getElementById("minute2").value.trim() : "";
  const jd2 = getJulianDay(y2, m2, d2, h2Val !== "" ? parseInt(h2Val, 10) : 12, (h2Val !== "" && min2Val !== "") ? parseInt(min2Val, 10) : 0);
  const p2List = calcPlanets(jd2);

  let baseSign1 = 0;
  if (h1Val !== "") {
    const coords = document.getElementById("birthPlace").value.split(",");
    baseSign1 = Math.floor(calcAscendant(jd1, parseFloat(coords.at(0)), parseFloat(coords.at(1))) / 30);
  } else {
    baseSign1 = Math.floor(p1List.find(function(p) { return p.id === "sun"; }).lon / 30);
  }

  renderSynastryChart(p1List, p2List, baseSign1);

  // 1. お相手の主要5天体があなたの何ハウスに入るか
  const houseHtml = new Array();
  const targetIds = new Array("sun", "moon", "mercury", "venus", "mars");
  targetIds.forEach(function(tid) {
    const p2 = p2List.find(function(x) { return x.id === tid; });
    const sIdx2 = Math.floor(p2.lon / 30);
    const hNum = ((sIdx2 - baseSign1 + 12) % 12) + 1;
    houseHtml.push('<div class="sync-item"><strong>お相手の' + p2.name + '（' + SIGNS.at(sIdx2) + '）→ あなたの第' + hNum + 'ハウス</strong><br>' + SYN_HOUSE_EFFECTS[hNum] + '</div>');
  });
  document.getElementById("synHouseArea").innerHTML = houseHtml.join("");

  // 2. 2人の天体アスペクト（0, 60, 90, 120, 180度）
  const hits = new Array();
  const aspectIds = "sun,moon,mercury,venus,mars,jupiter,saturn";
  p1List.forEach(function(p1) {
    if (aspectIds.indexOf(p1.id) === -1) return;
相性鑑定も無事に動いてよかったです！そしておっしゃる通り、今のままでは1人鑑定の濃厚さに比べると、2人相性の方は少しあっさりしていますね！
1人鑑定と同じくらいの読み応えにするため、synastry.js だけを差し替える（他の6ファイルは一切触らない）形で、以下の4つの深いリーディングを一気に追加しましょう！

相性鑑定のボリュームアップ内容（synastry.js のみ更新）

1. 数秘の相性（現在数だけでなく「過去数×過去数」「未来数×未来数」まで3軸で診断）:
	• 本質（現在数）の相性: 2人の基本的な波長・魂の結びつき
	• 自然体（過去数）の相性: 気を使わずにいられるリラックス度
	• 未来（未来数）の相性: 2人が一緒に目指す方向性・成長のテーマ
2. お相手の主要天体（太陽・月・水星・金星・火星）が「あなたの何ハウスに入るか」の全解説:
	• 相手があなたの人生のどの領域（心・仕事・表現・パートナーシップなど）にどんな影響をもたらすかを詳しく言語化します。
3. 2人のアスペクト（0°・60°・90°・120°・180°）の詳細リーディング（最大10件表示）:
	• 調和（60°・120°）だけでなく、刺激や学びを与えるスクエア（90°）も含めて、どの天体同士がどんな化学反応を起こすかを丁寧に解説し、スクエアの線も二重円チャートに描画します！
4. 2人の10天体・対照テーブル（二重円の下に追加）:
	• 「あなた」と「お相手」の10天体の星座・度数を並べて比較できる一覧表を二重円の下に自動表示します。

パワーアップ版 synastry.js（全選択して上書きしてください）

javascript
const SYN_HOUSE_EFFECTS = {
  1: "第1ハウス（あなた自身）：お相手はあなたの個性や魅力をストレートに引き出し、一緒にいると自分らしく輝けます。",
  2: "第2ハウス（才能・豊かさ）：お相手はあなたの隠れた才能やセンスに気づかせ、現実的な豊かさを育むきっかけをくれます。",
  3: "第3ハウス（言葉・学び）：会話や情報交換が尽きない楽しい関係。言葉を通じて新しい視点や好奇心がどんどん広がります。",
  4: "第4ハウス（心の拠り所）：家族のようにホッと安心できる居場所を感じられる関係。素の自分を安心して見せられます。",
  5: "第5ハウス（創造・喜び）：一緒にいるとワクワクして創造力や遊び心が刺激される、ドラマチックで楽しいご縁です。",
  6: "第6ハウス（日常・役割）：日々の生活や仕事面で自然とサポートし合える関係。実用的な面でとても頼りになる存在です。",
  7: "第7ハウス（パートナー）：一対一の対等なパートナーシップを象徴する配置。お互いを映す鏡として深く向き合える重要な相手です。",
  8: "第8ハウス（深い絆・変容）：表面的な付き合いを超え、心の奥底で強く結びつく宿命的なご縁。価値観が大きく深まります。",
  9: "第9ハウス（精神性・冒険）：精神的な視野を広げ、未知の世界や高い理想へと一緒に成長していける師や同志のような関係です。",
  10: "第10ハウス（社会的使命）：仕事や目標達成において強い刺激と応援を与え合い、公の場での飛躍を後押ししてくれる相手です。",
  11: "第11ハウス（未来・仲間）：年齢や立場を超えた親友のようにフラットで自由な関係。未来の夢や理想を語り合えます。",
  12: "第12ハウス（癒やし・潜在意識）：言葉を超えた直感や優しさで繋がる不思議なご縁。一緒にいると心が浄化され癒やされます。"
};

function getNumCompatibility(n1, n2, label) {
  const a = (n1 > 9) ? (n1 % 9 || 9) : n1;
  const b = (n2 > 9) ? (n2 % 9 || 9) : n2;
  const diff = Math.abs(a - b);
  if (n1 === n2) return "【" + label + "：同じ魂の波長】価値観や感覚が驚くほど似ていて、言葉にしなくても自然に理解し合える安心感があります。";
  if ((a + b) === 10 || diff === 5) return "【" + label + "：補い合う鏡の関係】自分にない魅力を相手が持っているため、一緒にいることで世界が大きく広がる刺激的な組み合わせです。";
  if (diff === 1 || diff === 8) return "【" + label + "：隣り合う成長の関係】お互いの違いが良いスパイスになり、自然体で支え合いながらステップアップできます。";
  if ((a % 2) === (b % 2)) return "【" + label + "：心地よいリズム】行動のテンポや物事の捉え方が近く、無理なく自然体で長い時間を過ごせる穏やかな相性です。";
  return "【" + label + "：新鮮な化学反応】異なる視点を持つからこそ新しい発見があり、二人で力を合わせると予想以上のアイデアや力が生まれます。";
}

function ensureSynastryDOM() {
  let synArea = document.getElementById("synResultsArea");
  if (!synArea) {
    synArea = document.createElement("div");
    synArea.id = "synResultsArea";
    synArea.className = "results-grid";
    document.querySelector(".container").appendChild(synArea);
  }
  synArea.innerHTML =
    '<div class="panel"><h2>💞 数秘 ＆ 星の相性リーディング</h2>' +
    '<div class="sync-detail" id="synNumArea" style="margin-bottom:16px;"></div>' +
    '<h3 class="sub-heading">🏠 お相手の星が照らすあなたのハウス</h3>' +
    '<div class="sync-detail" id="synHouseArea" style="margin-bottom:16px;"></div>' +
    '<h3 class="sub-heading">✨ 2人の天体アスペクト（星のご縁）</h3>' +
    '<div class="sync-detail" id="synAstroArea"></div></div>' +
    '<div class="panel"><h2>🌌 シナストリー二重円（内：あなた／外：お相手）</h2>' +
    '<div class="chart-wrapper"><svg id="synastryChart" xmlns="http://w3.org" viewBox="0 0 420 420"></svg>' +
    '<div class="chart-legend"><span style="color:#ffe082;">● 内円：あなた</span><span style="color:#e1bee7;">● 外円：お相手</span><span style="color:#64b5f6;">― 調和</span><span style="color:#ff8a80;">― 強調/刺激</span></div></div>' +
    '<table><thead><tr><th>天体</th><th>あなた</th><th>お相手</th></tr></thead><tbody id="synTableBody"></tbody></table></div>';
  return synArea;
}

function renderSynastryChart(p1List, p2List, baseSign1) {
  const svg = document.getElementById("synastryChart");
  if (!svg) return;
  const cx = 210, cy = 210, rOut = 195, rSign = 165, rP2 = 142, rP1 = 108, rAsp = 82;
  let html = '<circle cx="' + cx + '" cy="' + cy + '" r="' + rOut + '" fill="#14151e" stroke="#3b3f54" stroke-width="2"/>';

  for (let i = 0; i < 12; i++) {
    const hNum = i + 1;
    const sIdx = (baseSign1 + i) % 12;
    const a1 = (180 - i * 30) * Math.PI / 180;
    const am = (165 - i * 30) * Math.PI / 180;
    const isAx = (i % 3 === 0);
    html += '<line x1="' + (cx + rAsp * Math.cos(a1)) + '" y1="' + (cy + rAsp * Math.sin(a1)) + '" x2="' + (cx + rOut * Math.cos(a1)) + '" y2="' + (cy + rOut * Math.sin(a1)) + '" stroke="' + (isAx ? "#d4af37" : "#2f3244") + '" stroke-width="' + (isAx ? 1.5 : 1) + '"/>';
    html += '<text x="' + (cx + 180 * Math.cos(am)) + '" y="' + (cy + 180 * Math.sin(am)) + '" fill="#d4af37" font-size="14" text-anchor="middle" dominant-baseline="central">' + SIGN_SYM.at(sIdx) + '</text>';
    html += '<text x="' + (cx + 90 * Math.cos(am)) + '" y="' + (cy + 90 * Math.sin(am)) + '" fill="#8b8fa3" font-size="9" text-anchor="middle" dominant-baseline="central">' + hNum + '</text>';
  }

  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rSign + '" fill="none" stroke="#3b3f54" stroke-width="1.2"/>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="125" fill="none" stroke="#2a2d3d" stroke-dasharray="3,3"/>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rAsp + '" fill="#11121a" stroke="#3b3f54" stroke-width="1"/>';

  const baseLon = baseSign1 * 30;
  p1List.forEach(function(p1) {
    p2List.forEach(function(p2) {
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;
      let color = "";
      if (diff <= 6 || Math.abs(diff - 90) <= 4 || Math.abs(diff - 180) <= 6) color = "rgba(255, 138, 128, 0.55)";
      else if (Math.abs(diff - 60) <= 4 || Math.abs(diff - 120) <= 6) color = "rgba(100, 181, 246, 0.55)";
      if (color) {
        const ang1 = (180 - norm360(p1.lon - baseLon)) * Math.PI / 180;
        const ang2 = (180 - norm360(p2.lon - baseLon)) * Math.PI / 180;
        html += '<line x1="' + (cx + rAsp * Math.cos(ang1)) + '" y1="' + (cy + rAsp * Math.sin(ang1)) + '" x2="' + (cx + rAsp * Math.cos(ang2)) + '" y2="' + (cy + rAsp * Math.sin(ang2)) + '" stroke="' + color + '" stroke-width="1.1"/>';
      }
    });
  });

  function drawRing(list, radius, bg, stroke, txtColor) {
    const placed = list.map(function(p) {
      const rel = norm360(p.lon - baseLon);
      return { sym: p.sym, rel: rel, draw: rel };
    }).sort(function(a, b) { return a.rel - b.rel; });

    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < placed.length; i++) {
        const c = placed.at(i);
        const n = placed.at((i + 1) % placed.length);
        let diff = n.draw - c.draw;
        if (diff < 0) diff += 360;
        if (diff < 11) {
          c.draw = norm360(c.draw - (11 - diff) / 2);
          n.draw = norm360(n.draw + (11 - diff) / 2);
        }
      }
    }
    placed.forEach(function(p) {
      const ang = (180 - p.draw) * Math.PI / 180;
      const px = cx + radius * Math.cos(ang);
      const py = cy + radius * Math.sin(ang);
      html += '<circle cx="' + px + '" cy="' + py + '" r="10" fill="' + bg + '" stroke="' + stroke + '"/>';
      html += '<text x="' + px + '" y="' + py + '" fill="' + txtColor + '" font-size="11" text-anchor="middle" dominant-baseline="central">' + p.sym + '</text>';
    });
  }

  drawRing(p1List, rP1, "#1c1e29", "#d4af37", "#ffe082");
  drawRing(p2List, rP2, "#251f38", "#8a75d6", "#e1bee7");
  svg.innerHTML = html;
}

function calculateSynastry() {
  const y1 = parseInt(document.getElementById("year").value, 10);
  const m1 = parseInt(document.getElementById("month").value, 10);
  const d1 = parseInt(document.getElementById("day").value, 10);
  const y2El = document.getElementById("year2");
  const m2El = document.getElementById("month2");
  const d2El = document.getElementById("day2");

  if (!y2El || !m2El || !d2El) return;
  const y2 = parseInt(y2El.value, 10);
  const m2 = parseInt(m2El.value, 10);
  const d2 = parseInt(d2El.value, 10);

  if (isNaN(y1) || isNaN(m1) || isNaN(d1) || isNaN(y2) || isNaN(m2) || isNaN(d2)) {
    alert("あなたとお相手、両方の生年月日を入力してください。");
    return;
  }

  const synArea = ensureSynastryDOM();

  const past1 = calcNum(d1), past2 = calcNum(d2);
  const life1 = calcNum(String(y1).concat(String(m1), String(d1)).split("").reduce(function(a, b) { return a + Number(b); }, 0));
  const life2 = calcNum(String(y2).concat(String(m2), String(d2)).split("").reduce(function(a, b) { return a + Number(b); }, 0));
  const fut1 = calcNum(m1 + d1), fut2 = calcNum(m2 + d2);

  document.getElementById("synNumArea").innerHTML =
    '<div class="sync-item"><strong>🌟 本質の相性：現在数「' + life1 + '」 × 「' + life2 + '」</strong><br>' + getNumCompatibility(life1, life2, "魂の軸") + '</div>' +
    '<div class="sync-item"><strong>🌱 自然体の相性：過去数「' + past1 + '」 × 「' + past2 + '」</strong><br>' + getNumCompatibility(past1, past2, "素の空気感") + '</div>' +
    '<div class="sync-item"><strong>🚀 未来の相性：未来数「' + fut1 + '」 × 「' + fut2 + '」</strong><br>' + getNumCompatibility(fut1, fut2, "目指す方向") + '</div>';

  const h1Val = document.getElementById("hour").value.trim();
  const min1Val = document.getElementById("minute").value.trim();
  const jd1 = getJulianDay(y1, m1, d1, h1Val !== "" ? parseInt(h1Val, 10) : 12, (h1Val !== "" && min1Val !== "") ? parseInt(min1Val, 10) : 0);
  const p1List = calcPlanets(jd1);

  const h2Val = document.getElementById("hour2") ? document.getElementById("hour2").value.trim() : "";
  const min2Val = document.getElementById("minute2") ? document.getElementById("minute2").value.trim() : "";
  const jd2 = getJulianDay(y2, m2, d2, h2Val !== "" ? parseInt(h2Val, 10) : 12, (h2Val !== "" && min2Val !== "") ? parseInt(min2Val, 10) : 0);
  const p2List = calcPlanets(jd2);

  let baseSign1 = 0;
  if (h1Val !== "") {
    const coords = document.getElementById("birthPlace").value.split(",");
    baseSign1 = Math.floor(calcAscendant(jd1, parseFloat(coords.at(0)), parseFloat(coords.at(1))) / 30);
  } else {
    baseSign1 = Math.floor(p1List.find(function(p) { return p.id === "sun"; }).lon / 30);
  }

  renderSynastryChart(p1List, p2List, baseSign1);

  // 1. お相手の主要5天体があなたの何ハウスに入るか
  const houseHtml = new Array();
  const targetIds = new Array("sun", "moon", "mercury", "venus", "mars");
  targetIds.forEach(function(tid) {
    const p2 = p2List.find(function(x) { return x.id === tid; });
    const sIdx2 = Math.floor(p2.lon / 30);
    const hNum = ((sIdx2 - baseSign1 + 12) % 12) + 1;
    houseHtml.push('<div class="sync-item"><strong>お相手の' + p2.name + '（' + SIGNS.at(sIdx2) + '）→ あなたの第' + hNum + 'ハウス</strong><br>' + SYN_HOUSE_EFFECTS[hNum] + '</div>');
  });
  document.getElementById("synHouseArea").innerHTML = houseHtml.join("");

  // 2. 2人の天体アスペクト（0, 60, 90, 120, 180度）
  const hits = new Array();
  const aspectIds = "sun,moon,mercury,venus,mars,jupiter,saturn";
  p1List.forEach(function(p1) {
    if (aspectIds.indexOf(p1.id) === -1) return;
  p2List.forEach(function(p2) {
    if (aspectIds.indexOf(p2.id) === -1) return;
    let diff = Math.abs(p1.lon - p2.lon);
    if (diff > 180) diff = 360 - diff;
    if (diff <= 5) hits.push('🌟 コンジャンクション（0°合）：あなたの' + p1.name + ' × お相手の' + p2.name + '
    二つのエネルギーがひとつに溶け合い、理屈を超えた強い縁と一体感を生み出します。');
    else if (Math.abs(diff - 120) <= 5) hits.push('💙 トライン（120°調和）：あなたの' + p1.name + ' × お相手の' + p2.name + '
    努力しなくても自然に波長が合い、お互いの長所を伸びやかに引き出し合える幸運の配置です。');
    else if (Math.abs(diff - 60) <= 4) hits.push('💚 セクスタイル（60°協力）：あなたの' + p1.name + ' × お相手の' + p2.name + '
    会話や共同作業を通じて楽しいアイデアが生まれ、軽やかに協力し合える関係です。');
    else if (Math.abs(diff - 180) <= 5) hits.push('🔥 オポジション（180°対向）：あなたの' + p1.name + ' × お相手の' + p2.name + '
    正反対の性質ゆえに強く惹かれ合い、自分にない視点や情熱を与えてくれるドラマチックな配置です。');
    else if (Math.abs(diff - 90) <= 4) hits.push('⚡ スクエア（90°刺激）：あなたの' + p1.name + ' × お相手の' + p2.name + '
    価値観の違いが心地よい刺激となり、お互いの枠を打ち破って成長させてくれる学びの配置です。');
    });
    });
    document.getElementById("synAstroArea").innerHTML = hits.length > 0
    ? hits.slice(0, 10).map(function(t) { return '' + t + ''; }).join("")
    : '強い角度の衝突が少なく、お互いのペースを尊重しながら穏やかに付き合える静かなご縁です。';
  // 3. 2人の10天体対照テーブル
    const tbody = document.getElementById("synTableBody");
    tbody.innerHTML = "";
    for (let i = 0; i < p1List.length; i++) {
    const p1 = p1List.at(i);
    const p2 = p2List.at(i);
    const s1 = Math.floor(p1.lon / 30);
    const s2 = Math.floor(p2.lon / 30);
    const tr = document.createElement("tr");
    tr.innerHTML =
    '' + p1.name + '' +
    '' + SIGNS.at(s1) + ' ' + (p1.lon % 30).toFixed(1) + '°' +
    '' + SIGNS.at(s2) + ' ' + (p2.lon % 30).toFixed(1) + '°';
    tbody.appendChild(tr);
    }
    document.getElementById("resultsArea").style.display = "none";
    synArea.style.display = "grid";
    synArea.classList.add("is-visible");
    }
