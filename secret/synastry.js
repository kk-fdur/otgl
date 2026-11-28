function renderSynastryChart(p1List, p2List, baseSign1) {
  const svg = document.getElementById("synastryChart");
  if (!svg) return;
  const cx = 210, cy = 210, rOut = 195, rSign = 165, rP2 = 142, rP1 = 108, rAsp = 82;
  let html = '<circle cx="210" cy="210" r="195" fill="#14151e" stroke="#3b3f54" stroke-width="2"/>';
  for (let i = 0; i < 12; i++) {
    const a1 = (180 - i * 30) * Math.PI / 180, am = (165 - i * 30) * Math.PI / 180;
    const isAx = (i % 3 === 0);
    html += `<line x1="${cx + rAsp * Math.cos(a1)}" y1="${cy + rAsp * Math.sin(a1)}" x2="${cx + rOut * Math.cos(a1)}" y2="${cy + rOut * Math.sin(a1)}" stroke="${isAx ? '#d4af37' : '#2f3244'}" stroke-width="${isAx ? 1.5 : 1}"/>`;
    html += `<text x="${cx + 180 * Math.cos(am)}" y="${cy + 180 * Math.sin(am)}" fill="#d4af37" font-size="14" text-anchor="middle" dominant-baseline="central">${SIGN_SYM.at((baseSign1 + i) % 12)}</text>`;
    html += `<text x="${cx + 90 * Math.cos(am)}" y="${cy + 90 * Math.sin(am)}" fill="#8b8fa3" font-size="9" text-anchor="middle" dominant-baseline="central">${i + 1}</text>`;
  }
  html += '<circle cx="210" cy="210" r="165" fill="none" stroke="#3b3f54" stroke-width="1.2"/><circle cx="210" cy="210" r="125" fill="none" stroke="#2a2d3d" stroke-dasharray="3,3"/><circle cx="210" cy="210" r="82" fill="#11121a" stroke="#3b3f54" stroke-width="1"/>';

  const baseLon = baseSign1 * 30;
  p1List.forEach(p1 => {
    p2List.forEach(p2 => {
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;
      let color = (diff <= 6 || Math.abs(diff - 90) <= 4 || Math.abs(diff - 180) <= 6) ? "rgba(255,138,128,0.55)" : ((Math.abs(diff - 60) <= 4 || Math.abs(diff - 120) <= 6) ? "rgba(100,181,246,0.55)" : "");
      if (color) {
        const ang1 = (180 - norm360(p1.lon - baseLon)) * Math.PI / 180, ang2 = (180 - norm360(p2.lon - baseLon)) * Math.PI / 180;
        html += `<line x1="${cx + rAsp * Math.cos(ang1)}" y1="${cy + rAsp * Math.sin(ang1)}" x2="${cx + rAsp * Math.cos(ang2)}" y2="${cy + rAsp * Math.sin(ang2)}" stroke="${color}" stroke-width="1.1"/>`;
      }
    });
  });

  function drawRing(list, radius, bg, stroke, txtColor) {
    const placed = list.map(p => ({ sym: p.sym, rel: norm360(p.lon - baseLon), draw: norm360(p.lon - baseLon) })).sort((a, b) => a.rel - b.rel);
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < placed.length; i++) {
        const c = placed.at(i), n = placed.at((i + 1) % placed.length);
        let diff = n.draw - c.draw; if (diff < 0) diff += 360;
        if (diff < 11) { c.draw = norm360(c.draw - (11 - diff) / 2); n.draw = norm360(n.draw + (11 - diff) / 2); }
      }
    }
    placed.forEach(p => {
      const ang = (180 - p.draw) * Math.PI / 180;
      html += `<circle cx="${cx + radius * Math.cos(ang)}" cy="${cy + radius * Math.sin(ang)}" r="10" fill="${bg}" stroke="${stroke}"/><text x="${cx + radius * Math.cos(ang)}" y="${cy + radius * Math.sin(ang)}" fill="${txtColor}" font-size="11" text-anchor="middle" dominant-baseline="central">${p.sym}</text>`;
    });
  }
  drawRing(p1List, rP1, "#1c1e29", "#d4af37", "#ffe082");
  drawRing(p2List, rP2, "#251f38", "#8a75d6", "#e1bee7");
  svg.innerHTML = html;
}

function calculateSynastry() {
  const y1 = parseInt(document.getElementById("year").value, 10), m1 = parseInt(document.getElementById("month").value, 10), d1 = parseInt(document.getElementById("day").value, 10);
  const y2 = parseInt(document.getElementById("year2").value, 10), m2 = parseInt(document.getElementById("month2").value, 10), d2 = parseInt(document.getElementById("day2").value, 10);
  if (isNaN(y1) || isNaN(m1) || isNaN(d1) || isNaN(y2) || isNaN(m2) || isNaN(d2)) { alert("あなたとお相手、両方の生年月日を入力してください。"); return; }

  const synArea = document.getElementById("synResultsArea");
  synArea.innerHTML = `<div class="panel"><h2>💞 数秘 ＆ 星の相性リーディング</h2><div class="sync-detail" id="synNumArea" style="margin-bottom:16px;"></div><h3 class="sub-heading">🏠 お相手の星が照らすあなたのハウス</h3><div class="sync-detail" id="synHouseArea" style="margin-bottom:16px;"></div><h3 class="sub-heading">✨ 2人の天体アスペクト（星のご縁）</h3><div class="sync-detail" id="synAstroArea"></div></div><div class="panel"><h2>🌌 シナストリー二重円（内：あなた／外：お相手）</h2><div class="chart-wrapper"><svg id="synastryChart" xmlns="http://w3.org" viewBox="0 0 420 420"></svg><div class="chart-legend"><span style="color:#ffe082;">● 内円：あなた</span><span style="color:#e1bee7;">● 外円：お相手</span><span style="color:#64b5f6;">― 調和</span><span style="color:#ff8a80;">― 強調/刺激</span></div></div><table><thead><tr><th>天体・役割</th><th>あなた</th><th>お相手</th></tr></thead><tbody id="synTableBody"></tbody></table><h3 class="sub-heading">👑 2人の天体の品位（高揚・本来の座）</h3><div class="sync-detail" id="synDignityArea"></div></div>`;

  const past1 = calcNum(d1), past2 = calcNum(d2);
  const life1 = calcNum(String(y1).concat(String(m1), String(d1)).split("").reduce((a, b) => a + Number(b), 0));
  const life2 = calcNum(String(y2).concat(String(m2), String(d2)).split("").reduce((a, b) => a + Number(b), 0));
  const fut1 = calcNum(m1 + d1), fut2 = calcNum(m2 + d2);
  document.getElementById("synNumArea").innerHTML = `<div class="sync-item"><strong>🌟 本質の相性：現在数「${life1}」 × 「${life2}」</strong><br>${getNumComp(life1, life2, "魂の軸")}</div><div class="sync-item"><strong>🌱 自然体の相性：過去数「${past1}」 × 「${past2}」</strong><br>${getNumComp(past1, past2, "素の空気感")}</div><div class="sync-item"><strong>🚀 未来の相性：未来数「${fut1}」 × 「${fut2}」</strong><br>${getNumComp(fut1, fut2, "目指す方向")}</div>`;

  const h1Val = document.getElementById("hour").value.trim(), min1Val = document.getElementById("minute").value.trim();
  const jd1 = getJulianDay(y1, m1, d1, h1Val !== "" ? parseInt(h1Val, 10) : 12, (h1Val !== "" && min1Val !== "") ? parseInt(min1Val, 10) : 0);
  const p1List = calcPlanets(jd1);

  const h2Val = document.getElementById("hour2").value.trim(), min2Val = document.getElementById("minute2").value.trim();
  const jd2 = getJulianDay(y2, m2, d2, h2Val !== "" ? parseInt(h2Val, 10) : 12, (h2Val !== "" && min2Val !== "") ? parseInt(min2Val, 10) : 0);
  const p2List = calcPlanets(jd2);

  let baseSign1 = (h1Val !== "") ? Math.floor(calcAscendant(jd1, parseFloat(document.getElementById("birthPlace").value.split(",").at(0)), parseFloat(document.getElementById("birthPlace").value.split(",").at(1))) / 30) : Math.floor(p1List.find(p => p.id === "sun").lon / 30);
  renderSynastryChart(p1List, p2List, baseSign1);

  document.getElementById("synHouseArea").innerHTML = ["sun", "moon", "mercury", "venus", "mars"].map(tid => {
    const p2 = p2List.find(x => x.id === tid), sIdx2 = Math.floor(p2.lon / 30), hNum = ((sIdx2 - baseSign1 + 12) % 12) + 1;
    return `<div class="sync-item"><strong>お相手の${p2.name}（${SIGNS.at(sIdx2)}）→ あなたの第${hNum}ハウス</strong><br>${getSynHouseText(hNum)}</div>`;
  }).join("");

  const hits = [], aspIds = "sun,moon,mercury,venus,mars,jupiter,saturn";
  p1List.forEach(p1 => {
    if (aspIds.indexOf(p1.id) === -1) return;
    p2List.forEach(p2 => {
      if (aspIds.indexOf(p2.id) === -1) return;
      let diff = Math.abs(p1.lon - p2.lon); if (diff > 180) diff = 360 - diff;
      if (diff <= 5) hits.push(`<strong>🌟 合（0°）：</strong>あなたの${p1.name} × お相手の${p2.name}<br>二つのエネルギーがひとつに溶け合い、強い縁と一体感を生み出します。`);
      else if (Math.abs(diff - 120) <= 5) hits.push(`<strong>💙 調和（120°）：</strong>あなたの${p1.name} × お相手の${p2.name}<br>自然に波長が合い、お互いの長所を伸びやかに引き出し合える幸運の配置です。`);
      else if (Math.abs(diff - 60) <= 4) hits.push(`<strong>💚 協力（60°）：</strong>あなたの${p1.name} × お相手の${p2.name}<br>会話や共同作業を通じて楽しいアイデアが生まれ、軽やかに協力し合える関係です。`);
      else if (Math.abs(diff - 180) <= 5) hits.push(`<strong>🔥 対向（180°）：</strong>あなたの${p1.name} × お相手の${p2.name}<br>正反対の性質ゆえに強く惹かれ合い、自分にない視点や情熱を与えてくれる配置です。`);
      else if (Math.abs(diff - 90) <= 4) hits.push(`<strong>⚡ 刺激（90°）：</strong>あなたの${p1.name} × お相手の${p2.name}<br>価値観の違いが心地よい刺激となり、お互いの枠を打ち破って成長させてくれる学びの配置です。`);
    });
  });
  document.getElementById("synAstroArea").innerHTML = hits.length > 0 ? hits.slice(0, 10).map(t => `<div class="sync-item">${t}</div>`).join("") : `<p style="margin:0;">強い衝突が少なく、お互いのペースを尊重しながら穏やかに付き合える静かなご縁です。</p>`;

  const tbody = document.getElementById("synTableBody"), d1List = [], d2List = [];
  tbody.innerHTML = "";
  for (let i = 0; i < p1List.length; i++) {
    const p1 = p1List.at(i), p2 = p2List.at(i), s1 = Math.floor(p1.lon / 30), s2 = Math.floor(p2.lon / 30);
    const d1Hit = DIGNITY_RULES.find(r => r.id === p1.id && r.sign === s1);
    const d2Hit = DIGNITY_RULES.find(r => r.id === p2.id && r.sign === s2);
    if (d1Hit) d1List.push(`・<strong>${p1.name} in ${SIGNS.at(s1)}（${d1Hit.type}）</strong>：${d1Hit.desc}`);
    if (d2Hit) d2List.push(`・<strong>${p2.name} in ${SIGNS.at(s2)}（${d2Hit.type}）</strong>：${d2Hit.desc}`);
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="planet-name">${p1.name}<span class="planet-role">${p1.role}</span></td><td>${SIGNS.at(s1)} ${(p1.lon % 30).toFixed(1)}°</td><td>${SIGNS.at(s2)} ${(p2.lon % 30).toFixed(1)}°</td>`;
    tbody.appendChild(tr);
  }

  const d1Text = d1List.length > 0 ? d1List.join("<br>") : "突出した品位の偏りはなく、各天体がそれぞれの星座の個性をバランスよく穏やかに発揮する柔軟な配置です。";
  const d2Text = d2List.length > 0 ? d2List.join("<br>") : "突出した品位の偏りはなく、各天体がそれぞれの星座の個性をバランスよく穏やかに発揮する柔軟な配置です。";
  document.getElementById("synDignityArea").innerHTML =
    `<div class="sync-item"><strong style="color:#ffe082;">👑【あなた】の星の品位</strong><br>${d1Text}</div>` +
    `<div class="sync-item"><strong style="color:#e1bee7;">👑【お相手】の星の品位</strong><br>${d2Text}</div>`;

  document.getElementById("resultsArea").style.display = "none";
  synArea.style.display = "grid";
  synArea.classList.add("is-visible");
}
