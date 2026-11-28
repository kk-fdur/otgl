function getNumCompatibility(n1, n2) {
  const a = (n1 > 9) ? (n1 % 9 || 9) : n1;
  const b = (n2 > 9) ? (n2 % 9 || 9) : n2;
  const diff = Math.abs(a - b);
  if (n1 === n2) return "【同じ魂の波長（ソウルメイト相性）】価値観や感覚が驚くほど似ていて、言葉にしなくても通じ合える安心感があります。";
  if ((a + b) === 10 || diff === 5) return "【補い合う鏡の相性】自分にない魅力を相手が持っているため、一緒にいることで世界が大きく広がる刺激的なパートナーです。";
  if (diff === 1 || diff === 8) return "【隣り合う成長の相性】お互いの違いが良いスパイスになり、自然体で支え合いながらステップアップできる関係です。";
  if ((a % 2) === (b % 2)) return "【心地よいリズムの相性】行動のテンポや物事の捉え方が近く、無理なく自然体で長い時間を過ごせる穏やかな関係です。";
  return "【化学反応の相性】異なる視点を持つからこそ新鮮な発見があり、二人で力を合わせると予想以上のクリエイティブな力を発揮します。";
}

function renderSynastryChart(p1List, p2List, baseSign1) {
  const svg = document.getElementById("synastryChart");
  const cx = 210, cy = 210, rOut = 195, rSign = 165, rP2 = 142, rP1 = 108, rAsp = 82;
  let html = `<circle cx="${cx}" cy="${cy}" r="${rOut}" fill="#14151e" stroke="#3b3f54" stroke-width="2"/>`;

  for (let i = 0; i < 12; i++) {
    const hNum = i + 1, sIdx = (baseSign1 + i) % 12;
    const a1 = (180 - i * 30) * Math.PI / 180, am = (165 - i * 30) * Math.PI / 180;
    const isAx = (i % 3 === 0);
    html += `<line x1="${cx + rAsp * Math.cos(a1)}" y1="${cy + rAsp * Math.sin(a1)}" x2="${cx + rOut * Math.cos(a1)}" y2="${cy + rOut * Math.sin(a1)}" stroke="${isAx ? '#d4af37' : '#2f3244'}" stroke-width="${isAx ? 1.5 : 1}"/>`;
    html += `<text x="${cx + 180 * Math.cos(am)}" y="${cy + 180 * Math.sin(am)}" fill="#d4af37" font-size="14" text-anchor="middle" dominant-baseline="central">${SIGN_SYM.at(sIdx)}</text>`;
    html += `<text x="${cx + 90 * Math.cos(am)}" y="${cy + 90 * Math.sin(am)}" fill="#8b8fa3" font-size="9" text-anchor="middle" dominant-baseline="central">${hNum}</text>`;
  }

  html += `<circle cx="${cx}" cy="${cy}" r="${rSign}" fill="none" stroke="#3b3f54" stroke-width="1.2"/>`;
  html += `<circle cx="${cx}" cy="${cy}" r="${125}" fill="none" stroke="#2a2d3d" stroke-dasharray="3,3"/>`;
  html += `<circle cx="${cx}" cy="${cy}" r="${rAsp}" fill="#11121a" stroke="#3b3f54" stroke-width="1"/>`;

  const baseLon = baseSign1 * 30;
  // 2人のアスペクト線
  p1List.forEach(p1 => {
    p2List.forEach(p2 => {
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;
      let color = "";
      if (diff <= 5 || Math.abs(diff - 180) <= 5) color = "rgba(255, 138, 128, 0.65)";
      else if (Math.abs(diff - 60) <= 4 || Math.abs(diff - 120) <= 5) color = "rgba(100, 181, 246, 0.65)";
      if (color) {
        const ang1 = (180 - norm360(p1.lon - baseLon)) * Math.PI / 180;
        const ang2 = (180 - norm360(p2.lon - baseLon)) * Math.PI / 180;
        html += `<line x1="${cx + rAsp * Math.cos(ang1)}" y1="${cy + rAsp * Math.sin(ang1)}" x2="${cx + rAsp * Math.cos(ang2)}" y2="${cy + rAsp * Math.sin(ang2)}" stroke="${color}" stroke-width="1.2"/>`;
      }
    });
  });

  function drawRing(list, radius, bg, stroke, txtColor) {
    const placed = list.map(p => ({ ...p, rel: norm360(p.lon - baseLon), draw: norm360(p.lon - baseLon) })).sort((a, b) => a.rel - b.rel);
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < placed.length; i++) {
        const c = placed.at(i), n = placed.at((i + 1) % placed.length);
        let diff = n.draw - c.draw; if (diff < 0) diff += 360;
        if (diff < 11) { c.draw = norm360(c.draw - (11 - diff) / 2); n.draw = norm360(n.draw + (11 - diff) / 2); }
      }
    }
    placed.forEach(p => {
      const ang = (180 - p.draw) * Math.PI / 180;
      html += `<circle cx="${cx + radius * Math.cos(ang)}" cy="${cy + radius * Math.sin(ang)}" r="10" fill="${bg}" stroke="${stroke}"/>`;
      html += `<text x="${cx + radius * Math.cos(ang)}" y="${cy + radius * Math.sin(ang)}" fill="${txtColor}" font-size="11" text-anchor="middle" dominant-baseline="central">${p.sym}</text>`;
    });
  }

  drawRing(p1List, rP1, "#1c1e29", "#d4af37", "#ffe082"); // 内円：あなた（ゴールド枠）
  drawRing(p2List, rP2, "#251f38", "#8a75d6", "#e1bee7"); // 外円：お相手（パープル枠）
  svg.innerHTML = html;
}

function calculateSynastry() {
  const y1 = parseInt(document.getElementById("year").value, 10);
  const m1 = parseInt(document.getElementById("month").value, 10);
  const d1 = parseInt(document.getElementById("day").value, 10);
  const y2 = parseInt(document.getElementById("year2").value, 10);
  const m2 = parseInt(document.getElementById("month2").value, 10);
  const d2 = parseInt(document.getElementById("day2").value, 10);

  if (isNaN(y1) || isNaN(m1) || isNaN(d1) || isNaN(y2) || isNaN(m2) || isNaN(d2)) {
    alert("あなたとお相手、両方の生年月日を入力してください。");
    return;
  }

  const life1 = calcNum(String(y1).concat(String(m1), String(d1)).split("").reduce((a, b) => a + Number(b), 0));
  const life2 = calcNum(String(y2).concat(String(m2), String(d2)).split("").reduce((a, b) => a + Number(b), 0));

  document.getElementById("synNumArea").innerHTML =
    `<div class="sync-item"><strong>🔢 数秘相性：あなた「${life1}」 × お相手「${life2}」</strong><br>${getNumCompatibility(life1, life2)}</div>`;

  const h1Val = document.getElementById("hour").value.trim();
  const min1Val = document.getElementById("minute").value.trim();
  const jd1 = getJulianDay(y1, m1, d1, h1Val !== "" ? parseInt(h1Val, 10) : 12, (h1Val !== "" && min1Val !== "") ? parseInt(min1Val, 10) : 0);
  const p1List = calcPlanets(jd1);

  const h2Val = document.getElementById("hour2").value.trim();
  const min2Val = document.getElementById("minute2").value.trim();
  const jd2 = getJulianDay(y2, m2, d2, h2Val !== "" ? parseInt(h2Val, 10) : 12, (h2Val !== "" && min2Val !== "") ? parseInt(min2Val, 10) : 0);
  const p2List = calcPlanets(jd2);

  let baseSign1 = 0;
  if (h1Val !== "") {
    const coords = document.getElementById("birthPlace").value.split(",");
    baseSign1 = Math.floor(calcAscendant(jd1, parseFloat(coords.at(0)), parseFloat(coords.at(1))) / 30);
  } else {
    baseSign1 = Math.floor(p1List.find(p => p.id === "sun").lon / 30);
  }

  renderSynastryChart(p1List, p2List, baseSign1);

  // 特別アスペクト＆ハウス重ねの抽出
  const hits = [];
  const personalIds = ["sun", "moon", "mercury", "venus", "mars"];
  p1List.filter(p => personalIds.includes(p.id)).forEach(p1 => {
    p2List.filter(p => personalIds.includes(p.id)).forEach(p2 => {
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;
      if (diff <= 5) hits.push(`<strong>🌟 コンジャンクション（0°合）：</strong>あなたの${p1.name} と お相手の${p2.name} が重なり、強い縁と一体感を生み出します。`);
      else if (Math.abs(diff - 120) <= 4) hits.push(`<strong>💙 トライン（120°調和）：</strong>あなたの${p1.name} と お相手の${p2.name} が自然に響き合い、心地よいサポート関係になります。`);
      else if (Math.abs(diff - 180) <= 5) hits.push(`<strong>🔥 オポジション（180°対向）：</strong>あなたの${p1.name} と お相手の${p2.name} が正面から引き合い、強い魅力と刺激を与え合います。`);
    });
  });

  const sun2House = ((Math.floor(p2List.find(p => p.id === "sun").lon / 30) - baseSign1 + 12) % 12) + 1;
  const venus2House = ((Math.floor(p2List.find(p => p.id === "venus").lon / 30) - baseSign1 + 12) % 12) + 1;
  hits.unshift(`<strong>🏠 ハウス重ね：</strong>お相手の太陽はあなたの<strong>第${sun2House}ハウス</strong>、金星は<strong>第${venus2House}ハウス</strong>に入り、その領域に光と喜びをもたらします。`);

  document.getElementById("synAstroArea").innerHTML = hits.slice(0, 6).map(t => `<div class="sync-item">${t}</div>`).join("");
  document.getElementById("synResultsArea").style.display = "grid";
}
