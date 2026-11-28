const NUM_KEYWORDS = {
  1: "【1：開拓・自立】始まり、リーダーシップ、直感と行動力、独自性",
  2: "【2：協調・受容】サポート、繊細さ、バランス、共感とつながり",
  3: "【3：創造・表現】楽しさ、無邪気さ、クリエイティブ、社交性",
  4: "【4：安定・構築】誠実、ルール、基盤づくり、コツコツと形にする",
  5: "【5：自由・変化】冒険、好奇心、スピード、枠にとらわれない挑戦",
  6: "【6：愛・調和】美意識、思いやり、育てる力、責任感と奉仕",
  7: "【7：探究・哲学】分析、一人の時間、専門性、真理の追求",
  8: "【8：達成・豊かさ】情熱、エネルギー、現実的な成功、循環させる力",
  9: "【9：完成・包容】理想、癒やし、全体を見渡す視点、手放しと統合",
  11: "【11：直感・メッセンジャー】高い霊感、インスピレーション、繊細なアンテナ",
  22: "【22：カリスマ・具現化】大きなビジョンを現実に落とし込むマスタービルダー",
  33: "【33：無償の愛・奉仕】常識を超えたスケールで周囲を癒やし導く"
};

const HOUSE_THEMES = {
  1: "第1ハウス（自己・アイデンティティ・第一印象・始まりの場）",
  2: "第2ハウス（才能・所有・金銭感覚・五感と自己価値の場）",
  3: "第3ハウス（言葉・学び・発信・好奇心と身近な交流の場）",
  4: "第4ハウス（心の拠り所・家庭・ルーツ・安心できる居場所）",
  5: "第5ハウス（創造・表現・恋愛・遊び心と自己実現の場）",
  6: "第6ハウス（仕事・役割・健康・日々の習慣と奉仕の場）",
  7: "第7ハウス（パートナーシップ・対人関係・契約と他者との鏡）",
  8: "第8ハウス（深い絆・継承・変容・心理的探究と共有の場）",
  9: "第9ハウス（精神性・哲学・未知への冒険・専門知識と旅の場）",
  10: "第10ハウス（天職・社会的肩書き・目標達成と公の舞台）",
  11: "第11ハウス（未来のビジョン・仲間・ネットワークと理想の場）",
  12: "第12ハウス（潜在意識・スピリチュアル・癒やしと浄化の場）"
};

function getSignName(idx) {
  const n = idx % 12;
  if (n === 0) return "牡羊座 ♈";
  if (n === 1) return "牡牛座 ♉";
  if (n === 2) return "双子座 ♊";
  if (n === 3) return "蟹座 ♋";
  if (n === 4) return "獅子座 ♌";
  if (n === 5) return "乙女座 ♍";
  if (n === 6) return "天秤座 ♎";
  if (n === 7) return "蠍座 ♏";
  if (n === 8) return "射手座 ♐";
  if (n === 9) return "山羊座 ♑";
  if (n === 10) return "水瓶座 ♒";
  return "魚座 ♓";
}

function getSignSymbol(idx) {
  const symbols = "♈♉♊♋♌♍♎♏♐♑♒♓";
  return symbols.charAt(idx % 12);
}

function calcNumerologyNumber(num) {
  let n = num;
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    const s = String(n);
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += Number(s.charAt(i));
    }
    n = sum;
  }
  return n;
}

function sumDigitsOfString(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += Number(str.charAt(i));
  }
  return sum;
}

function mapNumToHouse(num) {
  if (num >= 1 && num <= 12) return num;
  if (num === 22) return 4;
  if (num === 33) return 6;
  return ((num - 1) % 12) + 1;
}

function norm360(deg) {
  let d = deg % 360;
  return d < 0 ? d + 360 : d;
}

function getJulianDay(y, m, d, h, min) {
  const utcHour = h - 9 + (min / 60);
  const date = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
  date.setTime(date.getTime() + utcHour * 3600 * 1000);
  return (date.getTime() / 86400000) + 2440587.5;
}

function calcPlanets(jd) {
  const d = jd - 2451543.5;
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  function solveKepler(M, e) {
    let E = M + e * deg * Math.sin(M * rad) * (1 + e * Math.cos(M * rad));
    for (let i = 0; i < 5; i++) {
      E = E - (E - e * deg * Math.sin(E * rad) - M) / (1 - e * Math.cos(E * rad));
    }
    return E;
  }

  const w_sun = norm360(282.9404 + 4.70935E-5 * d);
  const e_sun = 0.016709 - 1.151E-9 * d;
  const M_sun = norm360(356.0470 + 0.9856002585 * d);
  const E_sun = solveKepler(M_sun, e_sun);
  const xv_sun = Math.cos(E_sun * rad) - e_sun;
  const yv_sun = Math.sqrt(1 - e_sun * e_sun) * Math.sin(E_sun * rad);
  const v_sun = Math.atan2(yv_sun, xv_sun) * deg;
  const r_sun = Math.sqrt(xv_sun * xv_sun + yv_sun * yv_sun);
  const lon_sun = norm360(v_sun + w_sun);
  const xs = r_sun * Math.cos(lon_sun * rad);
  const ys = r_sun * Math.sin(lon_sun * rad);

  const N_m = norm360(125.1228 - 0.0529538083 * d);
  const i_m = 5.1454;
  const w_m = norm360(318.0634 + 0.1643573223 * d);
  const a_m = 60.2666;
  const e_m = 0.054900;
  const M_m = norm360(115.3654 + 13.0649929509 * d);
  const E_m = solveKepler(M_m, e_m);
  const xv_m = a_m * (Math.cos(E_m * rad) - e_m);
  const yv_m = a_m * Math.sqrt(1 - e_m * e_m) * Math.sin(E_m * rad);
  const v_m = Math.atan2(yv_m, xv_m) * deg;
  const r_m = Math.sqrt(xv_m * xv_m + yv_m * yv_m);
  const xh_m = r_m * (Math.cos(N_m * rad) * Math.cos((v_m + w_m) * rad) - Math.sin(N_m * rad) * Math.sin((v_m + w_m) * rad) * Math.cos(i_m * rad));
  const yh_m = r_m * (Math.sin(N_m * rad) * Math.cos((v_m + w_m) * rad) + Math.cos(N_m * rad) * Math.sin((v_m + w_m) * rad) * Math.cos(i_m * rad));
  let lon_moon = norm360(Math.atan2(yh_m, xh_m) * deg);
  const Ls = lon_sun;
  const Lm = norm360(N_m + w_m + M_m);
  const D = norm360(Lm - Ls);
  const F = norm360(Lm - N_m);
  lon_moon = norm360(lon_moon
    - 1.274 * Math.sin((M_m - 2 * D) * rad)
    + 0.658 * Math.sin(2 * D * rad)
    - 0.186 * Math.sin(M_sun * rad)
    - 0.059 * Math.sin((2 * M_m - 2 * D) * rad)
    - 0.057 * Math.sin((M_m - 2 * D + M_sun) * rad)
    + 0.053 * Math.sin((M_m + 2 * D) * rad)
    + 0.046 * Math.sin((2 * D - M_sun) * rad)
    + 0.041 * Math.sin((M_m - M_sun) * rad)
    - 0.035 * Math.sin(D * rad)
    - 0.031 * Math.sin((M_m + M_sun) * rad)
    - 0.015 * Math.sin((2 * F - 2 * D) * rad)
  );

  const elements = new Array(
    { id: "mercury", name: "水星 ☿", sym: "☿", N: 48.3313 + 3.24587E-5 * d, i: 7.0047 + 5.00E-8 * d, w: 29.1241 + 1.01444E-5 * d, a: 0.387098, e: 0.205635 + 5.59E-10 * d, M: 168.6562 + 4.0923344368 * d },
    { id: "venus", name: "金星 ♀", sym: "♀", N: 76.6799 + 2.46590E-5 * d, i: 3.3946 + 2.75E-8 * d, w: 54.8910 + 1.38374E-5 * d, a: 0.723330, e: 0.006773 - 1.302E-9 * d, M: 48.0052 + 1.6021302244 * d },
    { id: "mars", name: "火星 ♂", sym: "♂", N: 49.5574 + 2.11081E-5 * d, i: 1.8497 - 1.78E-8 * d, w: 286.5016 + 2.92961E-5 * d, a: 1.523688, e: 0.093405 + 2.516E-9 * d, M: 18.6021 + 0.5240207766 * d },
    { id: "jupiter", name: "木星 ♃", sym: "♃", N: 100.4542 + 2.76854E-5 * d, i: 1.3030 - 1.557E-7 * d, w: 273.8777 + 1.64505E-5 * d, a: 5.20256, e: 0.048498 + 4.469E-9 * d, M: 19.8950 + 0.0830853001 * d },
    { id: "saturn", name: "土星 ♄", sym: "♄", N: 113.6634 + 2.38980E-5 * d, i: 2.4886 - 1.081E-7 * d, w: 339.3939 + 2.97661E-5 * d, a: 9.55475, e: 0.055546 - 9.499E-9 * d, M: 316.9670 + 0.0334442282 * d },
    { id: "uranus", name: "天王星 ♅", sym: "♅", N: 74.0005 + 1.3978E-5 * d, i: 0.7733 + 1.9E-8 * d, w: 96.6612 + 3.0565E-5 * d, a: 19.18171 - 1.55E-8 * d, e: 0.047318 + 7.45E-9 * d, M: 142.5905 + 0.011725806 * d },
    { id: "neptune", name: "海王星 ♆", sym: "♆", N: 131.7806 + 3.0173E-5 * d, i: 1.7700 - 2.55E-7 * d, w: 272.8461 - 6.027E-6 * d, a: 30.05826 + 3.313E-8 * d, e: 0.008606 + 2.15E-9 * d, M: 260.2471 + 0.005995147 * d }
  );

  const results = new Array(
    { id: "sun", name: "太陽 ☉", sym: "☉", lon: lon_sun },
    { id: "moon", name: "月 ☽", sym: "☽", lon: lon_moon }
  );

  elements.forEach(function(el) {
    const M = norm360(el.M);
    const E = solveKepler(M, el.e);
    const xv = el.a * (Math.cos(E * rad) - el.e);
    const yv = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E * rad);
    const v = Math.atan2(yv, xv) * deg;
    const r = Math.sqrt(xv * xv + yv * yv);
    const N = norm360(el.N);
    const w = norm360(el.w);
    const xh = r * (Math.cos(N * rad) * Math.cos((v + w) * rad) - Math.sin(N * rad) * Math.sin((v + w) * rad) * Math.cos(el.i * rad));
    const yh = r * (Math.sin(N * rad) * Math.cos((v + w) * rad) + Math.cos(N * rad) * Math.sin((v + w) * rad) * Math.cos(el.i * rad));
    const xg = xh + xs;
    const yg = yh + ys;
    results.push({ id: el.id, name: el.name, sym: el.sym, lon: norm360(Math.atan2(yg, xg) * deg) });
  });

  const P = 238.95 + 0.003968789 * d;
  const lon_pluto_h = 238.9508 + 0.00400703 * d
    - 19.799 * Math.sin(P * rad) + 19.848 * Math.cos(P * rad)
    + 0.897 * Math.sin(2 * P * rad) - 4.956 * Math.cos(2 * P * rad)
    + 0.610 * Math.sin(3 * P * rad) + 1.211 * Math.cos(3 * P * rad);
  const lat_pluto_h = -3.9082
    - 5.453 * Math.sin(P * rad) - 14.975 * Math.cos(P * rad)
    + 3.527 * Math.sin(2 * P * rad) + 1.673 * Math.cos(2 * P * rad);
  const r_pluto = 40.72 + 6.68 * Math.sin(P * rad) + 6.90 * Math.cos(P * rad)
    - 1.18 * Math.sin(2 * P * rad) - 0.03 * Math.cos(2 * P * rad);
  const xh_p = r_pluto * Math.cos(lon_pluto_h * rad) * Math.cos(lat_pluto_h * rad);
  const yh_p = r_pluto * Math.sin(lon_pluto_h * rad) * Math.cos(lat_pluto_h * rad);
  const lon_pluto = norm360(Math.atan2(yh_p + ys, xh_p + xs) * deg);
  results.push({ id: "pluto", name: "冥王星 ♇", sym: "♇", lon: lon_pluto });

  return results;
}

function calcAscendant(jd) {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const T = (jd - 2451545.0) / 36525.0;
  const GMST = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T);
  const LST = norm360(GMST + 139.7);
  const eps = 23.439291 - 0.0130042 * T;
  const y = -Math.cos(LST * rad);
  const x = Math.sin(LST * rad) * Math.cos(eps * rad) + Math.tan(35.7 * rad) * Math.sin(eps * rad);
  return norm360(Math.atan2(y, x) * deg);
}

function renderHoroscopeChart(planets, baseSignIndex, lifeHouse, pastHouse, futureHouse) {
  const svg = document.getElementById('horoscopeChart');
  const cx = 210, cy = 210;
  const rOuter = 195, rSign = 160, rPlanet = 122, rHouse = 82, rCenter = 48;

  let html = '<defs><radialGradient id="bgGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#1c1e29"/><stop offset="100%" stop-color="#101117"/></radialGradient></defs>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rOuter + '" fill="url(#bgGrad)" stroke="#3b3f54" stroke-width="2"/>';

  for (let i = 0; i < 12; i++) {
    const houseNum = i + 1;
    const signIdx = (baseSignIndex + i) % 12;

    const startDeg = 180 - (i * 30);
    const endDeg = 180 - ((i + 1) * 30);
    const midDeg = startDeg - 15;

    const rad1 = startDeg * Math.PI / 180;
    const rad2 = endDeg * Math.PI / 180;
    const radMid = midDeg * Math.PI / 180;

    let sectorFill = "none";
    if (houseNum === lifeHouse) {
      sectorFill = "rgba(212, 175, 55, 0.25)";
    } else if (houseNum === pastHouse || houseNum === futureHouse) {
      sectorFill = "rgba(138, 117, 214, 0.20)";
    }

    if (sectorFill !== "none") {
      const x1 = cx + rSign * Math.cos(rad1);
      const y1 = cy + rSign * Math.sin(rad1);
      const x2 = cx + rSign * Math.cos(rad2);
      const y2 = cy + rSign * Math.sin(rad2);
const x3 = cx + rCenter * Math.cos(rad2);
const y3 = cy + rCenter * Math.sin(rad2);
const x4 = cx + rCenter * Math.cos(rad1);
const y4 = cy + rCenter * Math.sin(rad1);
html += '';
}
const lx1 = cx + rCenter * Math.cos(rad1);
const ly1 = cy + rCenter * Math.sin(rad1);
const lx2 = cx + rOuter * Math.cos(rad1);
const ly2 = cy + rOuter * Math.sin(rad1);
const isAxis = (i === 0 || i === 3 || i === 6 || i === 9);
html += '';
const sx = cx + ((rOuter + rSign) / 2) * Math.cos(radMid);
const sy = cy + ((rOuter + rSign) / 2) * Math.sin(radMid);
html += '' + getSignSymbol(signIdx) + '';
const hx = cx + ((rHouse + rCenter) / 2) * Math.cos(radMid);
const hy = cy + ((rHouse + rCenter) / 2) * Math.sin(radMid);
const hColor = (houseNum === lifeHouse) ? "#d4af37" : ((houseNum === pastHouse || houseNum === futureHouse) ? "#c2b5f5" : "#8b8fa3");
const hWeight = (houseNum === lifeHouse || houseNum === pastHouse || houseNum === futureHouse) ? "bold" : "normal";
html += '' + houseNum + '';
}
html += '';
html += '';
html += '';
html += '現在数';
html += '' + lifeHouse + 'H連動';
const baseLon = baseSignIndex * 30;
const placedPlanets = planets.map(function(p) {
const relDeg = norm360(p.lon - baseLon);
return { id: p.id, name: p.name, sym: p.sym, lon: p.lon, relDeg: relDeg, drawDeg: relDeg };
}).sort(function(a, b) {
return a.relDeg - b.relDeg;
});
for (let pass = 0; pass < 3; pass++) {
for (let i = 0; i < placedPlanets.length; i++) {
const nextIdx = (i + 1) % placedPlanets.length;
const currP = placedPlanets.at(i);
const nextP = placedPlanets.at(nextIdx);
let diff = nextP.drawDeg - currP.drawDeg;
if (diff < 0) diff += 360;
if (diff < 11) {
const push = (11 - diff) / 2;
currP.drawDeg = norm360(currP.drawDeg - push);
nextP.drawDeg = norm360(nextP.drawDeg + push);
}
}
}
placedPlanets.forEach(function(p) {
const svgAngle = (180 - p.drawDeg) * Math.PI / 180;
const trueAngle = (180 - p.relDeg) * Math.PI / 180;
const dotX = cx + (rSign - 4) * Math.cos(trueAngle);
const dotY = cy + (rSign - 4) * Math.sin(trueAngle);
html += '';
const px = cx + rPlanet * Math.cos(svgAngle);
const py = cy + rPlanet * Math.sin(svgAngle);
html += '';
html += '' + p.sym + '';
});
svg.innerHTML = html;
}
function calculateAll() {
const y = parseInt(document.getElementById('year').value, 10);
const m = parseInt(document.getElementById('month').value, 10);
const d = parseInt(document.getElementById('day').value, 10);
const hVal = document.getElementById('hour').value.trim();
const minVal = document.getElementById('minute').value.trim();
if (isNaN(y) || isNaN(m) || isNaN(d)) {
alert("生年月日（年・月・日）を入力してください。");
return;
}
const pastNum = calcNumerologyNumber(d);
const allDigitsSum = sumDigitsOfString(String(y) + String(m) + String(d));
const lifeNum = calcNumerologyNumber(allDigitsSum);
const futureNum = calcNumerologyNumber(m + d);
const pastHouse = mapNumToHouse(pastNum);
const lifeHouse = mapNumToHouse(lifeNum);
const futureHouse = mapNumToHouse(futureNum);
document.getElementById('numPast').textContent = pastNum;
document.getElementById('numLife').textContent = lifeNum;
document.getElementById('numFuture').textContent = futureNum;
document.getElementById('numPastHouse').textContent = "第" + pastHouse + "ハウス連動";
document.getElementById('numLifeHouse').textContent = "第" + lifeHouse + "ハウス連動";
document.getElementById('numFutureHouse').textContent = "第" + futureHouse + "ハウス連動";
document.getElementById('numMeaningArea').innerHTML =
'過去数 ' + pastNum + '：' + NUM_KEYWORDS[pastNum] + '' +
'現在数 ' + lifeNum + '：' + NUM_KEYWORDS[lifeNum] + '' +
'未来数 ' + futureNum + '：' + NUM_KEYWORDS[futureNum] + '';
const hasTime = (hVal !== "");
const h = hasTime ? parseInt(hVal, 10) : 12;
const min = (hasTime && minVal !== "") ? parseInt(minVal, 10) : 0;
const jd = getJulianDay(y, m, d, h, min);
const planets = calcPlanets(jd);
let baseSignIndex = 0;
let badgeText = "";
if (hasTime) {
const ascLon = calcAscendant(jd);
baseSignIndex = Math.floor(ascLon / 30);
const ascDeg = (ascLon % 30).toFixed(1);
badgeText = "出生時間あり（" + h + "時" + min + "分）｜ASC：" + getSignName(baseSignIndex) + " " + ascDeg + "°（ホールサインハウス）";
} else {
const sunObj = planets.find(function(p) { return p.id === "sun"; });
const sunLon = sunObj ? sunObj.lon : 0;
baseSignIndex = Math.floor(sunLon / 30);
badgeText = "出生時間不明（12:00計算）｜太陽星座（" + getSignName(baseSignIndex) + "）を1ハウスとするソーラーサインハウス";
}
document.getElementById('houseModeBadge').textContent = badgeText;
renderHoroscopeChart(planets, baseSignIndex, lifeHouse, pastHouse, futureHouse);
const tbody = document.getElementById('planetTableBody');
tbody.innerHTML = "";
const planetsInLifeHouse = new Array();
planets.forEach(function(p) {
const signIndex = Math.floor(p.lon / 30);
const degInSign = (p.lon % 30).toFixed(1);
const houseNum = ((signIndex - baseSignIndex + 12) % 12) + 1;
let rowClass = "";
let syncBadges = "";
if (houseNum === lifeHouse) {
rowClass = "row-highlight-life";
syncBadges += '★現在数';
planetsInLifeHouse.push(p.name + "（" + getSignName(signIndex) + "）");
}
if (houseNum === pastHouse) {
if (!rowClass) rowClass = "row-highlight-sub";
syncBadges += '過去数';
}
if (houseNum === futureHouse) {
if (!rowClass) rowClass = "row-highlight-sub";
syncBadges += '未来数';
}
const tr = document.createElement('tr');
if (rowClass) tr.className = rowClass;
tr.innerHTML =
'' + p.name + '' +
'' + getSignName(signIndex) + '' +
'' + degInSign + '°' +
'第' + houseNum + 'ハウス' + syncBadges + '';
tbody.appendChild(tr);
});
const lifeSignIdx = (baseSignIndex + lifeHouse - 1) % 12;
const lifePlanetsText = planetsInLifeHouse.length > 0
? "このハウスには " + planetsInLifeHouse.join("・") + " が滞在しており、数秘のテーマが強く強調されます。"
: "現在このハウスに天体はありませんが、" + getSignName(lifeSignIdx) + "の性質を通してテーマが発揮されます。";
const pastSignIdx = (baseSignIndex + pastHouse - 1) % 12;
const futureSignIdx = (baseSignIndex + futureHouse - 1) % 12;
document.getElementById('syncMeaningArea').innerHTML =
'' +
'🌟 本質の共鳴：現在数「' + lifeNum + '」 × ' + HOUSE_THEMES[lifeHouse] + '
' +
'あなたの軸となる「' + lifeNum + '」のエネルギーは、ホロスコープ上の第' + lifeHouse + 'ハウス（' + getSignName(lifeSignIdx) + '）の領域で最も輝きます。' + lifePlanetsText +
'' +
'' +
'🌱 才能の土台：過去数「' + pastNum + '」 × 第' + pastHouse + 'ハウス（' + getSignName(pastSignIdx) + '）
' +
'無意識に発揮できる得意分野は、' + HOUSE_THEMES[pastHouse] + 'のテーマとリンクしています。' +
'' +
'' +
'🚀 目指す方向：未来数「' + futureNum + '」 × 第' + futureHouse + 'ハウス（' + getSignName(futureSignIdx) + '）
' +
'これから意識して伸ばしていく課題や目標は、' + HOUSE_THEMES[futureHouse] + 'の領域を広げることで達成されます。' +
'';
document.getElementById('resultsArea').classList.add('is-visible');
}
document.addEventListener('DOMContentLoaded', function() {
const btn = document.getElementById('calcBtn');
if (btn) {
btn.addEventListener('click', calculateAll);
}
});
