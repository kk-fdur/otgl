const NUM_KEYWORDS = {
  1: "【1：開拓・自立】始まり、リーダーシップ、直感と行動力",
  2: "【2：協調・受容】サポート、繊細さ、バランス、共感",
  3: "【3：創造・表現】楽しさ、無邪気さ、クリエイティブ",
  4: "【4：安定・構築】誠実、ルール、基盤づくり、コツコツ形にする",
  5: "【5：自由・変化】冒険、好奇心、スピード、枠を超えた挑戦",
  6: "【6：愛・調和】美意識、思いやり、育てる力、奉仕",
  7: "【7：探究・哲学】分析、一人の時間、専門性、真理の追求",
  8: "【8：達成・豊かさ】情熱、エネルギー、現実的な成功、循環",
  9: "【9：完成・包容】理想、癒やし、全体を見渡す視点、統合",
  11: "【11：直感・メッセンジャー】高い霊感、インスピレーション",
  22: "【22：カリスマ・具現化】大きなビジョンを現実に落とし込む",
  33: "【33：無償の愛・奉仕】常識を超えたスケールで周囲を癒やす"
};

const HOUSE_THEMES = {
  1: "第1ハウス（自己・アイデンティティ・始まりの場）",
  2: "第2ハウス（才能・所有・金銭感覚・自己価値の場）",
  3: "第3ハウス（言葉・学び・発信・身近な交流の場）",
  4: "第4ハウス（心の拠り所・家庭・ルーツ・安心できる居場所）",
  5: "第5ハウス（創造・表現・恋愛・遊び心と自己実現の場）",
  6: "第6ハウス（仕事・役割・健康・日々の習慣と奉仕の場）",
  7: "第7ハウス（パートナーシップ・対人関係・他者との鏡）",
  8: "第8ハウス（深い絆・継承・変容・心理的探究の場）",
  9: "第9ハウス（精神性・哲学・未知への冒険・専門知識の場）",
  10: "第10ハウス（天職・社会的肩書き・目標達成の舞台）",
  11: "第11ハウス（未来のビジョン・仲間・ネットワークの場）",
  12: "第12ハウス（潜在意識・スピリチュアル・癒やしと浄化の場）"
};

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
    `<p style="margin:0 0 6px"><strong>過去数 ${past}：</strong>${NUM_KEYWORDS[past]}</p>` +
    `<p style="margin:0 0 6px"><strong>現在数 ${life}：</strong>${NUM_KEYWORDS[life]}</p>` +
    `<p style="margin:0"><strong>未来数 ${future}：</strong>${NUM_KEYWORDS[future]}</p>`;

  const hasTime = (hVal !== "");
  const h = hasTime ? parseInt(hVal, 10) : 12;
  const min = (hasTime && minVal !== "") ? parseInt(minVal, 10) : 0;
  const jd = getJulianDay(y, m, d, h, min);
  const planets = calcPlanets(jd);

  let baseSign = 0;
  if (hasTime) {
    const asc = calcAscendant(jd);
    baseSign = Math.floor(asc / 30);
    document.getElementById("houseModeBadge").textContent = `出生時間あり（${h}時${min}分）｜ASC：${SIGNS.at(baseSign)} ${(asc % 30).toFixed(1)}°`;
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
    if (hNum === lifeH) {
      cls = "row-highlight-life";
      badge += `<span class="sync-badge life">★現在数</span>`;
      hitPlanets.push(`${p.name}（${SIGNS.at(sIdx)}）`);
    }
    if (hNum === pastH) { if (!cls) cls = "row-highlight-sub"; badge += `<span class="sync-badge sub">過去数</span>`; }
    if (hNum === futureH) { if (!cls) cls = "row-highlight-sub"; badge += `<span class="sync-badge sub">未来数</span>`; }

    const tr = document.createElement("tr");
    if (cls) tr.className = cls;
    tr.innerHTML = `<td class="planet-name">${p.name}</td><td>${SIGNS.at(sIdx)}</td><td>${(p.lon % 30).toFixed(1)}°</td><td><span class="house-tag">第${hNum}ハウス</span>${badge}</td>`;
    tbody.appendChild(tr);
  });

  const lifeSign = SIGNS.at((baseSign + lifeH - 1) % 12);
  const hitText = hitPlanets.length > 0 ? `このハウスには <strong>${hitPlanets.join("・")}</strong> が滞在し、テーマが強く強調されます。` : `現在天体はありませんが、<strong>${lifeSign}</strong>の性質を通して発揮されます。`;

  document.getElementById("syncMeaningArea").innerHTML =
    `<div class="sync-item"><strong>🌟 現在数「${life}」 × ${HOUSE_THEMES[lifeH]}</strong><br>本質の「${life}」は<strong>第${lifeH}ハウス（${lifeSign}）</strong>で最も輝きます。${hitText}</div>` +
    `<div class="sync-item"><strong>🌱 過去数「${past}」 × 第${pastH}ハウス（${SIGNS.at((baseSign + pastH - 1) % 12)}）</strong><br>得意分野は${HOUSE_THEMES[pastH]}とリンクしています。</div>` +
    `<div class="sync-item"><strong>🚀 未来数「${future}」 × 第${futureH}ハウス（${SIGNS.at((baseSign + futureH - 1) % 12)}）</strong><br>今後の課題は${HOUSE_THEMES[futureH]}を広げることで達成されます。</div>`;

  const res = document.getElementById("resultsArea");
  res.style.display = "grid";
  res.classList.add("is-visible");
}

document.getElementById("calcBtn").addEventListener("click", calculateAll);
