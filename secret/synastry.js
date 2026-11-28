const bp1 = document.getElementById("birthPlace");
const bp2 = document.getElementById("birthPlace2");
if (bp1 && bp2) {
bp2.innerHTML = bp1.innerHTML;
bp2.selectedIndex = bp1.selectedIndex;
}
function addBox(parent, htmlStr, isLast) {
const div = document.createElement("div");
if (!isLast) div.className = "sync-item";
div.innerHTML = htmlStr;
parent.appendChild(div);
}
function makePanel(titleText) {
const panel = document.createElement("div");
panel.className = "panel";
const h2 = document.createElement("h2");
h2.textContent = titleText;
panel.appendChild(h2);
return panel;
}
function makeSubDetail(panel, titleText) {
if (titleText) {
const h3 = document.createElement("h3");
h3.className = "sub-heading";
h3.textContent = titleText;
panel.appendChild(h3);
}
const box = document.createElement("div");
box.className = "sync-detail";
panel.appendChild(box);
return box;
}
function renderSynastryChart(svg, p1List, p2List, baseSign1) {
const ns = "w3.org";
svg.innerHTML = "";
const cx = 210, cy = 210, rOut = 195, rSign = 165, rP2 = 142, rP1 = 108, rAsp = 82;
function el(tag, attrs) {
const node = document.createElementNS(ns, tag);
for (const k in attrs) node.setAttribute(k, attrs[k]);
return node;
}
svg.appendChild(el("circle", { cx: 210, cy: 210, r: 195, fill: "#14151e", stroke: "#3b3f54", "stroke-width": 2 }));
for (let i = 0; i < 12; i++) {
const a1 = (180 - i * 30) * Math.PI / 180, am = (165 - i * 30) * Math.PI / 180, isAx = (i % 3 === 0);
svg.appendChild(el("line", { x1: cx + rAsp * Math.cos(a1), y1: cy + rAsp * Math.sin(a1), x2: cx + rOut * Math.cos(a1), y2: cy + rOut * Math.sin(a1), stroke: isAx ? "#d4af37" : "#2f3244", "stroke-width": isAx ? 1.5 : 1 }));
const t1 = el("text", { x: cx + 180 * Math.cos(am), y: cy + 180 * Math.sin(am), fill: "#d4af37", "font-size": 14, "text-anchor": "middle", "dominant-baseline": "central" });
t1.textContent = SIGN_SYM.at((baseSign1 + i) % 12);
svg.appendChild(t1);
const t2 = el("text", { x: cx + 90 * Math.cos(am), y: cy + 90 * Math.sin(am), fill: "#8b8fa3", "font-size": 9, "text-anchor": "middle", "dominant-baseline": "central" });
t2.textContent = i + 1;
svg.appendChild(t2);
}
svg.appendChild(el("circle", { cx: 210, cy: 210, r: 165, fill: "none", stroke: "#3b3f54", "stroke-width": 1.2 }));
svg.appendChild(el("circle", { cx: 210, cy: 210, r: 125, fill: "none", stroke: "#2a2d3d", "stroke-dasharray": "3,3" }));
svg.appendChild(el("circle", { cx: 210, cy: 210, r: 82, fill: "#11121a", stroke: "#3b3f54", "stroke-width": 1 }));
const baseLon = baseSign1 * 30;
p1List.forEach(function(p1) {
p2List.forEach(function(p2) {
let diff = Math.abs(p1.lon - p2.lon);
if (diff > 180) diff = 360 - diff;
let color = "";
if (diff <= 6 || Math.abs(diff - 90) <= 4 || Math.abs(diff - 180) <= 6) color = "rgba(255,138,128,0.55)";
else if (Math.abs(diff - 60) <= 4 || Math.abs(diff - 120) <= 6) color = "rgba(100,181,246,0.55)";
if (color) {
const ang1 = (180 - norm360(p1.lon - baseLon)) * Math.PI / 180, ang2 = (180 - norm360(p2.lon - baseLon)) * Math.PI / 180;
svg.appendChild(el("line", { x1: cx + rAsp * Math.cos(ang1), y1: cy + rAsp * Math.sin(ang1), x2: cx + rAsp * Math.cos(ang2), y2: cy + rAsp * Math.sin(ang2), stroke: color, "stroke-width": 1.1 }));
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
const c = placed.at(i), n = placed.at((i + 1) % placed.length);
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
const px = cx + radius * Math.cos(ang), py = cy + radius * Math.sin(ang);
svg.appendChild(el("circle", { cx: px, cy: py, r: 10, fill: bg, stroke: stroke }));
const txt = el("text", { x: px, y: py, fill: txtColor, "font-size": 11, "text-anchor": "middle", "dominant-baseline": "central" });
txt.textContent = p.sym;
svg.appendChild(txt);
});
}
drawRing(p1List, rP1, "#1c1e29", "#d4af37", "#ffe082");
drawRing(p2List, rP2, "#251f38", "#8a75d6", "#e1bee7");
}
function getBaseSignFromInput(jd, hVal, placeId, pList) {
if (hVal !== "") {
const coords = document.getElementById(placeId).value.split(",");
return Math.floor(calcAscendant(jd, parseFloat(coords.at(0)), parseFloat(coords.at(1))) / 30);
}
return Math.floor(pList.find(function(p) { return p.id === "sun"; }).lon / 30);
}
function calculateSynastry() {
const y1 = parseInt(document.getElementById("year").value, 10), m1 = parseInt(document.getElementById("month").value, 10), d1 = parseInt(document.getElementById("day").value, 10);
const y2 = parseInt(document.getElementById("year2").value, 10), m2 = parseInt(document.getElementById("month2").value, 10), d2 = parseInt(document.getElementById("day2").value, 10);
if (isNaN(y1) || isNaN(m1) || isNaN(d1) || isNaN(y2) || isNaN(m2) || isNaN(d2)) {
alert("あなたとお相手、両方の生年月日を入力してください。");
return;
}
const synArea = document.getElementById("synResultsArea");
synArea.innerHTML = "";
const leftPanel = makePanel("💞 数秘 × 星の相性リーディング");
const numBox = makeSubDetail(leftPanel, "");
const houseBox = makeSubDetail(leftPanel, "🏠 お互いの星が照らし合うハウス");
const astroBox = makeSubDetail(leftPanel, "✨ 2人の天体アスペクト（星のご縁）");
const rightPanel = makePanel("🌌 シナストリー二重円（内：あなた／外：お相手）");
const wrap = document.createElement("div");
wrap.className = "chart-wrapper";
const svg = document.createElementNS("w3.org", "svg");
svg.id = "synastryChart";
svg.setAttribute("viewBox", "0 0 420 420");
wrap.appendChild(svg);
const legend = document.createElement("div");
legend.className = "chart-legend";
legend.textContent = "● 内円：あなた（金）　● 外円：お相手（紫）　― 青：調和　― 赤：強調";
wrap.appendChild(legend);
rightPanel.appendChild(wrap);
const tbl = document.createElement("table");
const thead = document.createElement("thead");
const headTr = document.createElement("tr");
new Array("天体・役割", "あなた", "お相手").forEach(function(h) {
const th = document.createElement("th");
th.textContent = h;
headTr.appendChild(th);
});
thead.appendChild(headTr);
tbl.appendChild(thead);
const tbody = document.createElement("tbody");
tbl.appendChild(tbody);
rightPanel.appendChild(tbl);
const digBox = makeSubDetail(rightPanel, "👑 2人の天体の品位（高揚・本来の座）");
synArea.appendChild(leftPanel);
synArea.appendChild(rightPanel);
const past1 = calcNum(d1), past2 = calcNum(d2);
const life1 = calcNum(String(y1).concat(String(m1), String(d1)).split("").reduce(function(a, b) { return a + Number(b); }, 0));
const life2 = calcNum(String(y2).concat(String(m2), String(d2)).split("").reduce(function(a, b) { return a + Number(b); }, 0));
const fut1 = calcNum(m1 + d1), fut2 = calcNum(m2 + d2);
const relNum = calcNum(life1 + life2), relHouse = toHouse(relNum);
const h1Val = document.getElementById("hour").value.trim(), min1Val = document.getElementById("minute").value.trim();
const jd1 = getJulianDay(y1, m1, d1, h1Val !== "" ? parseInt(h1Val, 10) : 12, (h1Val !== "" && min1Val !== "") ? parseInt(min1Val, 10) : 0);
const p1List = calcPlanets(jd1);
const h2Val = document.getElementById("hour2").value.trim(), min2Val = document.getElementById("minute2").value.trim();
const jd2 = getJulianDay(y2, m2, d2, h2Val !== "" ? parseInt(h2Val, 10) : 12, (h2Val !== "" && min2Val !== "") ? parseInt(min2Val, 10) : 0);
const p2List = calcPlanets(jd2);
const baseSign1 = getBaseSignFromInput(jd1, h1Val, "birthPlace", p1List);
const baseSign2 = getBaseSignFromInput(jd2, h2Val, "birthPlace2", p2List);
renderSynastryChart(svg, p1List, p2List, baseSign1);
addBox(numBox, "💫 2人の関係数「" + relNum + "」 × 第" + relHouse + "ハウス連動： " + getRelationNumberText(relNum) + "（あなたの第" + relHouse + "ハウス・" + SIGNS.at((baseSign1 + relHouse - 1) % 12) + "が活性化します）", false);
addBox(numBox, "🌟 本質の相性（現在数 " + life1 + " × " + life2 + "）： " + getNumComp(life1, life2, "魂の軸"), false);
addBox(numBox, "🌱 自然体の相性（過去数 " + past1 + " × " + past2 + "）： " + getNumComp(past1, past2, "素の空気感"), false);
addBox(numBox, "🚀 未来の相性（未来数 " + fut1 + " × " + fut2 + "）： " + getNumComp(fut1, fut2, "目指す方向"), true);
const sun2H = ((Math.floor(p2List.find(function(x) { return x.id === "sun"; }).lon / 30) - baseSign1 + 12) % 12) + 1;
const venus2H = ((Math.floor(p2List.find(function(x) { return x.id === "venus"; }).lon / 30) - baseSign1 + 12) % 12) + 1;
const sun1H = ((Math.floor(p1List.find(function(x) { return x.id === "sun"; }).lon / 30) - baseSign2 + 12) % 12) + 1;
const moon1H = ((Math.floor(p1List.find(function(x) { return x.id === "moon"; }).lon / 30) - baseSign2 + 12) % 12) + 1;
addBox(houseBox, "【相手→あなた】お相手の太陽 ☉ → あなたの第" + sun2H + "ハウス： " + getSynHouseText(sun2H), false);
addBox(houseBox, "【相手→あなた】お相手の金星 ♀ → あなたの第" + venus2H + "ハウス： " + getSynHouseText(venus2H), false);
addBox(houseBox, "【あなた→相手】あなたの太陽 ☉ → お相手の第" + sun1H + "ハウス： " + getSynHouseText(sun1H), false);
addBox(houseBox, "【あなた→相手】あなたの月 ☽ → お相手の第" + moon1H + "ハウス： " + getSynHouseText(moon1H), true);
const hits = new Array();
const aspIds = "sun,moon,mercury,venus,mars,jupiter,saturn";
p1List.forEach(function(p1) {
if (aspIds.indexOf(p1.id) === -1) return;
p2List.forEach(function(p2) {
if (aspIds.indexOf(p2.id) === -1) return;
let diff = Math.abs(p1.lon - p2.lon);
if (diff > 180) diff = 360 - diff;
if (diff <= 5) hits.push("🌟 合（0°）：あなたの" + p1.name + " × お相手の" + p2.name + " ／ 二つのエネルギーがひとつに溶け合い、強い縁と一体感を生み出します。");
else if (Math.abs(diff - 120) <= 5) hits.push("💙 調和（120°）：あなたの" + p1.name + " × お相手の" + p2.name + " ／ 自然に波長が合い、お互いの長所を伸びやかに引き出し合える幸運の配置です。");
else if (Math.abs(diff - 60) <= 4) hits.push("💚 協力（60°）：あなたの" + p1.name + " × お相手の" + p2.name + " ／ 会話や共同作業を通じて楽しいアイデアが生まれ、軽やかに協力し合える関係です。");
else if (Math.abs(diff - 180) <= 5) hits.push("🔥 対向（180°）：あなたの" + p1.name + " × お相手の" + p2.name + " ／ 正反対の性質ゆえに強く惹かれ合い、自分にない視点や情熱を与えてくれる配置です。");
else if (Math.abs(diff - 90) <= 4) hits.push("⚡ 刺激（90°）：あなたの" + p1.name + " × お相手の" + p2.name + " ／ 価値観の違いが心地よい刺激となり、お互いの枠を打ち破って成長させてくれる学びの配置です。");
});
});
if (hits.length > 0) {
const showHits = hits.slice(0, 10);
showHits.forEach(function(t, idx) { addBox(astroBox, t, idx === showHits.length - 1); });
} else {
addBox(astroBox, "強い衝突が少なく、お互いのペースを尊重しながら穏やかに付き合える静かなご縁です。", true);
}
const d1List = new Array(), d2List = new Array();
for (let i = 0; i < p1List.length; i++) {
const p1 = p1List.at(i), p2 = p2List.at(i), s1 = Math.floor(p1.lon / 30), s2 = Math.floor(p2.lon / 30);
const d1Hit = DIGNITY_RULES.find(function(r) { return r.id === p1.id && r.sign === s1; });
const d2Hit = DIGNITY_RULES.find(function(r) { return r.id === p2.id && r.sign === s2; });
if (d1Hit) d1List.push("・" + p1.name + " in " + SIGNS.at(s1) + "【" + d1Hit.type + "】：" + d1Hit.desc);
if (d2Hit) d2List.push("・" + p2.name + " in " + SIGNS.at(s2) + "【" + d2Hit.type + "】：" + d2Hit.desc);
const tr = document.createElement("tr");
const td1 = document.createElement("td");
td1.className = "planet-name";
td1.textContent = p1.name + "（" + p1.role + "）";
const td2 = document.createElement("td");
td2.textContent = SIGNS.at(s1) + " " + (p1.lon % 30).toFixed(1) + "°";
const td3 = document.createElement("td");
td3.textContent = SIGNS.at(s2) + " " + (p2.lon % 30).toFixed(1) + "°";
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tbody.appendChild(tr);
}
addBox(digBox, "👑【あなた】の星の品位： " + (d1List.length > 0 ? d1List.join(" ／ ") : "突出した品位の偏りはなく、各星座の個性を穏やかに発揮する柔軟な配置です。"), false);
addBox(digBox, "👑【お相手】の星の品位： " + (d2List.length > 0 ? d2List.join(" ／ ") : "突出した品位の偏りはなく、各星座の個性を穏やかに発揮する柔軟な配置です。"), true);
document.getElementById("resultsArea").style.display = "none";
synArea.style.display = "grid";
synArea.classList.add("is-visible");
}
