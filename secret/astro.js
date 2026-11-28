const SIGNS = ["牡羊座 ♈","牡牛座 ♉","双子座 ♊","蟹座 ♋","獅子座 ♌","乙女座 ♍","天秤座 ♎","蠍座 ♏","射手座 ♐","山羊座 ♑","水瓶座 ♒","魚座 ♓"];
const SIGN_SYM = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

function norm360(d) {
  let r = d % 360;
  return r < 0 ? r + 360 : r;
}

function getJulianDay(y, m, d, h, min) {
  const utc = h - 9 + (min / 60);
  const dt = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
  dt.setTime(dt.getTime() + utc * 3600000);
  return (dt.getTime() / 86400000) + 2440587.5;
}

function solveKepler(M, e) {
  const rad = Math.PI / 180, deg = 180 / Math.PI;
  let E = M + e * deg * Math.sin(M * rad) * (1 + e * Math.cos(M * rad));
  for (let i = 0; i < 5; i++) {
    E = E - (E - e * deg * Math.sin(E * rad) - M) / (1 - e * Math.cos(E * rad));
  }
  return E;
}

function calcPlanets(jd) {
  const d = jd - 2451543.5, rad = Math.PI / 180, deg = 180 / Math.PI;
  const wS = norm360(282.9404 + 4.70935e-5 * d), eS = 0.016709 - 1.151e-9 * d, mS = norm360(356.0470 + 0.9856002585 * d);
  const ES = solveKepler(mS, eS), xvS = Math.cos(ES * rad) - eS, yvS = Math.sqrt(1 - eS * eS) * Math.sin(ES * rad);
  const lonSun = norm360(Math.atan2(yvS, xvS) * deg + wS), rS = Math.sqrt(xvS * xvS + yvS * yvS);
  const xs = rS * Math.cos(lonSun * rad), ys = rS * Math.sin(lonSun * rad);

  const Nm = norm360(125.1228 - 0.0529538083 * d), wm = norm360(318.0634 + 0.1643573223 * d), Mm = norm360(115.3654 + 13.0649929509 * d);
  const Em = solveKepler(Mm, 0.0549), xvm = 60.2666 * (Math.cos(Em * rad) - 0.0549), yvm = 60.2666 * Math.sqrt(1 - 0.0549 * 0.0549) * Math.sin(Em * rad);
  const vm = Math.atan2(yvm, xvm) * deg, rm = Math.sqrt(xvm * xvm + yvm * yvm);
  const xhm = rm * (Math.cos(Nm * rad) * Math.cos((vm + wm) * rad) - Math.sin(Nm * rad) * Math.sin((vm + wm) * rad) * Math.cos(5.1454 * rad));
  const yhm = rm * (Math.sin(Nm * rad) * Math.cos((vm + wm) * rad) + Math.cos(Nm * rad) * Math.sin((vm + wm) * rad) * Math.cos(5.1454 * rad));
  const D = norm360(Nm + wm + Mm - lonSun);
  const lonMoon = norm360(Math.atan2(yhm, xhm) * deg - 1.274 * Math.sin((Mm - 2 * D) * rad) + 0.658 * Math.sin(2 * D * rad) - 0.186 * Math.sin(mS * rad));

  function body(id, name, role, sym, N, i, w, a, e, M) {
    const E = solveKepler(norm360(M), e), xv = a * (Math.cos(E * rad) - e), yv = a * Math.sqrt(1 - e * e) * Math.sin(E * rad);
    const v = Math.atan2(yv, xv) * deg, r = Math.sqrt(xv * xv + yv * yv), Nr = norm360(N) * rad, wr = (v + norm360(w)) * rad, ir = i * rad;
    const xh = r * (Math.cos(Nr) * Math.cos(wr) - Math.sin(Nr) * Math.sin(wr) * Math.cos(ir));
    const yh = r * (Math.sin(Nr) * Math.cos(wr) + Math.cos(Nr) * Math.sin(wr) * Math.cos(ir));
    return { id, name, role, sym, lon: norm360(Math.atan2(yh + ys, xh + xs) * deg) };
  }

  const P = 238.95 + 0.003968789 * d;
  const lonPh = 238.9508 + 0.00400703 * d - 19.799 * Math.sin(P * rad) + 19.848 * Math.cos(P * rad);
  const rP = 40.72 + 6.68 * Math.sin(P * rad) + 6.90 * Math.cos(P * rad);
  const lonPluto = norm360(Math.atan2(rP * Math.sin(lonPh * rad) + ys, rP * Math.cos(lonPh * rad) + xs) * deg);

  return [
    { id: "sun", name: "太陽 ☉", role: "人生の目的・本質", sym: "☉", lon: lonSun },
    { id: "moon", name: "月 ☽", role: "感情・安心感・素顔", sym: "☽", lon: lonMoon },
    body("mercury", "水星 ☿", "知性・言葉・学び", "☿", 48.3313 + 3.24587e-5 * d, 7.0047, 29.1241 + 1.01444e-5 * d, 0.387098, 0.205635, 168.6562 + 4.0923344368 * d),
    body("venus", "金星 ♀", "愛・美意識・喜び", "♀", 76.6799 + 2.46590e-5 * d, 3.3946, 54.8910 + 1.38374e-5 * d, 0.723330, 0.006773, 48.0052 + 1.6021302244 * d),
    body("mars", "火星 ♂", "情熱・行動・突破力", "♂", 49.5574 + 2.11081e-5 * d, 1.8497, 286.5016 + 2.92961e-5 * d, 1.523688, 0.093405, 18.6021 + 0.5240207766 * d),
    body("jupiter", "木星 ♃", "拡大・幸運・発展", "♃", 100.4542 + 2.76854e-5 * d, 1.3030, 273.8777 + 1.64505e-5 * d, 5.20256, 0.048498, 19.8950 + 0.0830853001 * d),
    body("saturn", "土星 ♄", "試練・責任・成熟", "♄", 113.6634 + 2.38980e-5 * d, 2.4886, 339.3939 + 2.97661e-5 * d, 9.55475, 0.055546, 316.9670 + 0.0334442282 * d),
    body("uranus", "天王星 ♅", "改革・個性・ひらめき", "♅", 74.0005 + 1.3978e-5 * d, 0.7733, 96.6612 + 3.0565e-5 * d, 19.18171, 0.047318, 142.5905 + 0.011725806 * d),
    body("neptune", "海王星 ♆", "夢・直感・イマジネーション", "♆", 131.7806 + 3.0173e-5 * d, 1.7700, 272.8461 - 6.027e-6 * d, 30.05826, 0.008606, 260.2471 + 0.005995147 * d),
    { id: "pluto", name: "冥王星 ♇", role: "変容・再生・極限の力", sym: "♇", lon: lonPluto }
  ];
}

function calcAscendant(jd, lat, lng) {
  const rad = Math.PI / 180, deg = 180 / Math.PI, T = (jd - 2451545.0) / 36525.0;
  const LST = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T + lng);
  const eps = 23.439291 - 0.0130042 * T;
  return norm360(Math.atan2(-Math.cos(LST * rad), Math.sin(LST * rad) * Math.cos(eps * rad) + Math.tan(lat * rad) * Math.sin(eps * rad)) * deg);
}

function renderHoroscopeChart(planets, baseSignIdx, lifeH, pastH, futureH) {
  const svg = document.getElementById("horoscopeChart");
  const cx = 210, cy = 210, rOut = 195, rSign = 160, rPl = 124, rAsp = 86, rIn = 64;
  let html = `<circle cx="${cx}" cy="${cy}" r="${rOut}" fill="#14151e" stroke="#3b3f54" stroke-width="2"/>`;

  for (let i = 0; i < 12; i++) {
    const hNum = i + 1, sIdx = (baseSignIdx + i) % 12;
    const a1 = (180 - i * 30) * Math.PI / 180, a2 = (180 - (i + 1) * 30) * Math.PI / 180, am = (165 - i * 30) * Math.PI / 180;
    const fill = (hNum === lifeH) ? "rgba(212,175,55,0.26)" : ((hNum === pastH || hNum === futureH) ? "rgba(138,117,214,0.20)" : "none");
    if (fill !== "none") {
      html += `<path d="M ${cx + rSign * Math.cos(a1)} ${cy + rSign * Math.sin(a1)} A ${rSign} ${rSign} 0 0 0 ${cx + rSign * Math.cos(a2)} ${cy + rSign * Math.sin(a2)} L ${cx + rAsp * Math.cos(a2)} ${cy + rAsp * Math.sin(a2)} A ${rAsp} ${rAsp} 0 0 1 ${cx + rAsp * Math.cos(a1)} ${cy + rAsp * Math.sin(a1)} Z" fill="${fill}"/>`;
    }
    const isAx = (i % 3 === 0);
    html += `<line x1="${cx + rAsp * Math.cos(a1)}" y1="${cy + rAsp * Math.sin(a1)}" x2="${cx + rOut * Math.cos(a1)}" y2="${cy + rOut * Math.sin(a1)}" stroke="${isAx ? '#d4af37' : '#2f3244'}" stroke-width="${isAx ? 1.5 : 1}"/>`;
    html += `<text x="${cx + 177 * Math.cos(am)}" y="${cy + 177 * Math.sin(am)}" fill="#d4af37" font-size="15" text-anchor="middle" dominant-baseline="central">${SIGN_SYM.at(sIdx)}</text>`;
    html += `<text x="${cx + 75 * Math.cos(am)}" y="${cy + 75 * Math.sin(am)}" fill="${hNum === lifeH ? '#d4af37' : '#9da0b0'}" font-size="10" font-weight="bold" text-anchor="middle" dominant-baseline="central">${hNum}</text>`;
  }

  html += `<circle cx="${cx}" cy="${cy}" r="${rSign}" fill="none" stroke="#3b3f54" stroke-width="1.2"/>`;
  html += `<circle cx="${cx}" cy="${cy}" r="${rAsp}" fill="#11121a" stroke="#3b3f54" stroke-width="1"/>`;
  html += `<circle cx="${cx}" cy="${cy}" r="${rIn}" fill="none" stroke="#262938" stroke-dasharray="2,2"/>`;

  // アスペクト線（中心のrIn円内に描画）
  const baseLon = baseSignIdx * 30;
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets.at(i), p2 = planets.at(j);
      let diff = Math.abs(p1.lon - p2.lon);
      if (diff > 180) diff = 360 - diff;
      let color = "";
      if (diff <= 6 || Math.abs(diff - 90) <= 5 || Math.abs(diff - 180) <= 6) color = "rgba(255, 110, 110, 0.55)";
      else if (Math.abs(diff - 60) <= 4 || Math.abs(diff - 120) <= 6) color = "rgba(100, 181, 246, 0.55)";
      if (color) {
        const ang1 = (180 - norm360(p1.lon - baseLon)) * Math.PI / 180;
        const ang2 = (180 - norm360(p2.lon - baseLon)) * Math.PI / 180;
        html += `<line x1="${cx + rIn * Math.cos(ang1)}" y1="${cy + rIn * Math.sin(ang1)}" x2="${cx + rIn * Math.cos(ang2)}" y2="${cy + rIn * Math.sin(ang2)}" stroke="${color}" stroke-width="1.1"/>`;
      }
    }
  }

  const placed = planets.map(p => ({ ...p, rel: norm360(p.lon - baseLon), draw: norm360(p.lon - baseLon) })).sort((a, b) => a.rel - b.rel);
  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < placed.length; i++) {
      const c = placed.at(i), n = placed.at((i + 1) % placed.length);
      let diff = n.draw - c.draw; if (diff < 0) diff += 360;
      if (diff < 11) { c.draw = norm360(c.draw - (11 - diff) / 2); n.draw = norm360(n.draw + (11 - diff) / 2); }
    }
  }
  placed.forEach(p => {
    const ang = (180 - p.draw) * Math.PI / 180;
    html += `<circle cx="${cx + rPl * Math.cos(ang)}" cy="${cy + rPl * Math.sin(ang)}" r="11" fill="#1c1e29" stroke="#454963"/>`;
    html += `<text x="${cx + rPl * Math.cos(ang)}" y="${cy + rPl * Math.sin(ang)}" fill="#fff" font-size="13" text-anchor="middle" dominant-baseline="central">${p.sym}</text>`;
  });
  svg.innerHTML = html;
}
