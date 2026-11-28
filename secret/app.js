function calcNum(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

function toHouse(n) {
  if (n >= 1 && n <= 12) return n;
  if (n === 22) return 4;
  if (n === 33) return 6;
  return ((n - 1) % 12) + 1;
}

function calculateAll() {
  const y = parseInt(document.getElementById("year").value, 10);
  const m = parseInt(document.getElementById("month").value, 10);
  const d = parseInt(document.getElementById("day").value, 10);
  const hVal = document.getElementById("hour").value.trim();
  const minVal = document.getElementById("minute").value.trim();

  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    alert("生年月日（年・月・日）を入力してください。");
    return;
  }

  const past = calcNum(d);
  const life = calcNum(String(y).concat(String(m), String(d)).split("").reduce((a, b) => a + Number(b), 0));
  const future = calcNum(m + d);
  const pastH = toHouse(past), lifeH = toHouse(life), futureH = toHouse(future);

  document.getElementById("numPast").textContent = past;
  document.getElementById("numLife").textContent = life;
  document.getElementById("numFuture").textContent = future;
  document.getElementById("numPastHouse").textContent = `第${pastH}H連動`;
  document.getElementById("numLifeHouse").textContent = `第${lifeH}H連動`;
  document.getElementById("numFutureHouse").textContent = `第${futureH}H連動`;

  document.getElementById("numMeaningArea").innerHTML =
    `<p style="margin:0 0 10px"><strong>🌱 過去数（得意・才能）：</strong>${NUM_READINGS[past]}</p>` +
    `<p style="margin:0 0 10px"><strong>🌟 現在数（本質・運命）：</strong>${NUM_READINGS[life]}</p>` +
    `<p style="margin:0"><strong>🚀 未来数（目標・課題）：</strong>${NUM_READINGS[future]}</p>`;

  const hasTime = (hVal !== "");
  const h = hasTime ? parseInt(hVal, 10) : 12;
  const min = (hasTime && minVal !== "") ? parseInt(minVal, 10) : 0;
  const jd = getJulianDay(y, m, d, h, min);
  const planets = calcPlanets(jd);

  let baseSign = 0;
  if (hasTime) {
    const placeEl = document.getElementById("birthPlace");
    const coords = placeEl.value.split(",");
    const placeName = placeEl.options.item(placeEl.selectedIndex).text;
    const asc = calcAscendant(jd, parseFloat(coords.at(0)), parseFloat(coords.at(1)));
    baseSign = Math.floor(asc / 30);
    document.getElementById("houseModeBadge").textContent = `${placeName}（${h}時${min}分）｜ASC：${SIGNS.at(baseSign)} ${(asc % 30).toFixed(1)}°`;
  } else {
    const sun = planets.find(p => p.id === "sun");
    baseSign = Math.floor(sun.lon / 30);
    document.getElementById("houseModeBadge").textContent = `出生時間不明（12:00計算）｜太陽（${SIGNS.at(baseSign)}）を1ハウスとするソーラーハウス`;
  }

  renderHoroscopeChart(planets, baseSign, lifeH, pastH, futureH);

  const tbody = document.getElementById("planetTableBody");
  tbody.innerHTML = "";
  const hitPlanets = [];

  planets.forEach(p => {
    const sIdx = Math.floor(p.lon / 30);
    const hNum = ((sIdx - baseSign + 12) % 12) + 1;
    let cls = "", badge = "";
    if (hNum === lifeH) { cls = "row-highlight-life"; badge += `<span class="sync-badge life">★現在数</span>`; hitPlanets.push(p); }
    if (hNum === pastH) { if (!cls) cls = "row-highlight-sub"; badge += `<span class="sync-badge sub">過去数</span>`; }
    if (hNum === futureH) { if (!cls) cls = "row-highlight-sub"; badge += `<span class="sync-badge sub">未来数</span>`; }

    const tr = document.createElement("tr");
    if (cls) tr.className = cls;
    tr.innerHTML = `<td class="planet-name">${p.name}<span class="planet-role">${p.role}</span></td><td>${SIGNS.at(sIdx)}</td><td>${(p.lon % 30).toFixed(1)}°</td><td><span class="house-tag">第${hNum}H</span>${badge}</td>`;
    tbody.appendChild(tr);
  });

  const lifeSign = SIGNS.at((baseSign + lifeH - 1) % 12);
  let planetBoostText = `現在このハウスに天体はありませんが、<strong>${lifeSign}</strong>のフィルターを通してテーマが自然と発揮されます。`;
  if (hitPlanets.length > 0) {
    const boostList = hitPlanets.map(hp => `・<strong>${hp.name}</strong>：${PLANET_BOOST[hp.id]}`).join("<br>");
    planetBoostText = `さらにこのハウスには以下の天体が滞在しており、あなたの現在数の力を強く後押ししています。<br>${boostList}`;
  }

  document.getElementById("syncMeaningArea").innerHTML =
    `<div class="sync-item"><strong>🌟 本質の共鳴：現在数「${life}」 × ${HOUSE_READINGS[lifeH].title}</strong><br>` +
    `あなたの魂の軸である「${life}」の力は、ホロスコープ上の<strong>第${lifeH}ハウス（${lifeSign}）</strong>の舞台で最も輝きます。${HOUSE_READINGS[lifeH].desc}<br><div style="margin-top:6px;color:#e6dfb8;">${planetBoostText}</div></div>` +
    `<div class="sync-item"><strong>🌱 才能の土台：過去数「${past}」 × ${HOUSE_READINGS[pastH].title}（${SIGNS.at((baseSign + pastH - 1) % 12)}）</strong><br>` +
    `生まれ持った得意分野である「${past}」の資質は、${HOUSE_READINGS[pastH].desc}</div>` +
    `<div class="sync-item"><strong>🚀 目指す方向：未来数「${future}」 × ${HOUSE_READINGS[futureH].title}（${SIGNS.at((baseSign + futureH - 1) % 12)}）</strong><br>` +
    `これから開拓していくテーマ「${future}」は、${HOUSE_READINGS[futureH].desc}</div>`;

  const res = document.getElementById("resultsArea");
  res.style.display = "grid";
  res.classList.add("is-visible");
}

document.getElementById("calcBtn").addEventListener("click", calculateAll);
