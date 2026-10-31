document.addEventListener('DOMContentLoaded', () => {
    const zodiacSelect = document.getElementById('zodiac-select');
    const drawBtn = document.getElementById('draw-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultPanel = document.getElementById('result-panel');
    const tarotCardImage = document.getElementById('tarot-card-image');
    const zodiacImage = document.getElementById('zodiac-image');
    const cardAnnounceText = document.getElementById('card-announce-text');

    const zodiacData = [
        { id: 0, name: '牡羊座', symbol: '♈', color: '#ff8a7a', accent: '#ffd7d1' },
        { id: 1, name: '牡牛座', symbol: '♉', color: '#c49d6d', accent: '#f3dfc4' },
        { id: 2, name: '双子座', symbol: '♊', color: '#7fc7d8', accent: '#d7f5ff' },
        { id: 3, name: '蟹座', symbol: '♋', color: '#ff9cb2', accent: '#ffdfe8' },
        { id: 4, name: '獅子座', symbol: '♌', color: '#f3ba4a', accent: '#fef0bf' },
        { id: 5, name: '乙女座', symbol: '♍', color: '#8ad0a8', accent: '#ddf9e8' },
        { id: 6, name: '天秤座', symbol: '♎', color: '#c8a8ff', accent: '#efe0ff' },
        { id: 7, name: '蠍座', symbol: '♏', color: '#b979d1', accent: '#eed8ff' },
        { id: 8, name: '射手座', symbol: '♐', color: '#8ccf87', accent: '#dfffe0' },
        { id: 9, name: '山羊座', symbol: '♑', color: '#97a5d4', accent: '#e2e7ff' },
        { id: 10, name: '水瓶座', symbol: '♒', color: '#66b5d8', accent: '#d8f3ff' },
        { id: 11, name: '魚座', symbol: '♓', color: '#7b9be7', accent: '#dfe9ff' }
    ];

    const tarotCards = [
        { id: 0, name: '愚者', image: '../images/00_fool.png' },
        { id: 1, name: '陰陽師', image: '../images/01_magician.png' },
        { id: 2, name: '御巫', image: '../images/02_priestess.png' },
        { id: 3, name: '女帝', image: '../images/03_empress.png' },
        { id: 4, name: '皇帝', image: '../images/04_emperor.png' },
        { id: 5, name: '神主', image: '../images/05_hirophant.png' },
        { id: 6, name: '恋人', image: '../images/06_lovers.png' },
        { id: 7, name: '戦車', image: '../images/07_chariot.png' },
        { id: 8, name: '力', image: '../images/08_strength.png' },
        { id: 9, name: '隠者', image: '../images/09_hermit.png' },
        { id: 10, name: '運命の輪', image: '../images/10_wheel of fortune.png' },
        { id: 11, name: '正義', image: '../images/11_justice.png' },
        { id: 12, name: '吊るし人', image: '../images/12_hanged man.png' },
        { id: 13, name: 'し', image: '../images/13_death.png' },
        { id: 14, name: '節制', image: '../images/14_temperance.png' },
        { id: 15, name: '悪魔', image: '../images/15_devil.png' },
        { id: 16, name: '塔', image: '../images/16_tower.png' },
        { id: 17, name: '星', image: '../images/17_star.png' },
        { id: 18, name: '月', image: '../images/18_moon.png' },
        { id: 19, name: '太陽', image: '../images/19_sun.png' },
        { id: 20, name: '審判', image: '../images/20_judgement.png' },
        { id: 21, name: '世界', image: '../images/21_world.png' }
    ];

    // SVG生成関数
    function buildZodiacImage(zodiac) {
        const svg = `
            <svg xmlns="http://w3.org" viewBox="0 0 220 220">
                <defs>
                    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stop-color="${zodiac.color}"/>
                        <stop offset="100%" stop-color="#1b2a46"/>
                    </linearGradient>
                </defs>
                <rect width="220" height="220" rx="28" fill="url(#g)"/>
                <circle cx="110" cy="76" r="48" fill="rgba(255,255,255,0.12)"/>
                <text x="110" y="132" text-anchor="middle" font-size="76" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" fill="white">${zodiac.symbol}</text>
                <text x="110" y="180" text-anchor="middle" font-size="18" font-family="Noto Sans JP, sans-serif" fill="${zodiac.accent}">${zodiac.name}</text>
            </svg>
        `;
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function getDateSeed(date) {
        return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    }

    // ⭕ 修正版：絶対に偏らない、均等にバラけるシード乱数関数
    function seededIndex(seed, length) {
        // Mulberry32アルゴリズムでシード値を完全にシャッフル
        let t = seed + 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        const randomFraction = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    
        // 0〜3（length-1）の間で完璧に均等に日替わり選択します
        return Math.floor(randomFraction * length);
    }

    function updateZodiacPreview(zodiac) {
        const svgRaw = `
            <svg id="zodiac-image" xmlns="http://w3.org" viewBox="0 0 220 220" style="width: 100%; height: 100%; display: block;">
                <defs>
                    <radialGradient id="g_${zodiac.id}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="${zodiac.color}" stop-opacity="0.7"/>
                        <stop offset="100%" stop-color="#1b2a46" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                
                <circle cx="110" cy="110" r="110" fill="url(#g_${zodiac.id})"/>
                
                <svg viewBox="0 0 220 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                    <text x="110" y="134" text-anchor="middle" font-size="85" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" fill="white">${zodiac.symbol}</text>
                    <text x="110" y="195" text-anchor="middle" font-size="18" font-family="Noto Sans JP, sans-serif" fill="${zodiac.accent}" letter-spacing="4" font-weight="bold">${zodiac.name}</text>
                </svg>
            </svg>
        `;
        
        const zodiacBox = document.querySelector('.zodiac-box');
        if (zodiacBox) {
            zodiacBox.style.background = 'transparent';
            zodiacBox.style.border = 'none';
            zodiacBox.style.boxShadow = 'none';
            zodiacBox.innerHTML = svgRaw;
        }
    } 
    
    function drawReading() {
        const zodiacId = Number(zodiacSelect.value);
        const zodiac = zodiacData[zodiacId] || zodiacData[0];

        // 1. 日替わりタロットカードを確定
        const today = new Date();
        const dateSeed = getDateSeed(today);
        const seed = dateSeed * 100 + zodiacId;
        const cardId = (seed * 17 + zodiacId * 11) % tarotCards.length;
        const card = tarotCards[cardId];

        // 🔮 正位置・逆位置の判定（今日のシード値から50%の確率を計算）
        const isReversed = (seed + cardId) % 2 === 0; 
        const positionText = isReversed ? '・逆位置' : '';

        // 2. ビジュアルエリアを更新
        tarotCardImage.src = card.image;
        tarotCardImage.alt = `${card.name}のカード${positionText}`;
        
        // 🔮 逆位置なら画像を上下回転、正位置なら戻す処理
        if (isReversed) {
            tarotCardImage.style.transform = 'rotate(180deg)';
        } else {
            tarotCardImage.style.transform = 'none';
        }

        updateZodiacPreview(zodiac);
        
        if (cardAnnounceText) {
            cardAnnounceText.textContent = `🔮 ${zodiac.name}のあなたは【 ${card.name}${positionText} 】を引きました`;
        }

        // 3. 各星座データをwindow経由で取得
        const fortuneDataNames = [
            'ariesFortuneData', 'taurusFortuneData', 'geminiFortuneData', 'cancerFortuneData', 
            'leoFortuneData', 'virgoFortuneData', 'libraFortuneData', 'scorpioFortuneData', 
            'sagittariusFortuneData', 'capricornFortuneData', 'aquariusFortuneData', 'piscesFortuneData'
        ];
        
        const targetDataName = fortuneDataNames[zodiacId];
        const fortuneData = window[targetDataName];

        if (fortuneData) {
            const fortuneArray = fortuneData[card.id];
            
            if (fortuneArray && fortuneArray.length > 0) {
                const baseSeed = dateSeed + zodiacId + card.id;
                const dailyIndex = seededIndex(baseSeed, fortuneArray.length);
                
                const fullText = fortuneArray[dailyIndex];
                
                const overallText = document.getElementById('overall-text');
                const loveText = document.getElementById('love-text');
                const healthText = document.getElementById('health-text');

                let overallContent = '';
                let loveContent = '';
                let healthContent = '';

                const idxOverall = fullText.indexOf('【全体運】');
                const idxLove = fullText.search(/【恋愛・対人】|【恋愛対人】/);
                const idxHealth = fullText.indexOf('【健康運】');

                if (idxOverall !== -1 && idxLove !== -1) {
                    overallContent = fullText.substring(idxOverall + 5, idxLove).trim();
                }
                if (idxLove !== -1 && idxHealth !== -1) {
                    const loveMarkerLength = fullText.includes('【恋愛・対人】') ? 7 : 5;
                    loveContent = fullText.substring(idxLove + loveMarkerLength, idxHealth).trim();
                }
                if (idxHealth !== -1) {
                    healthContent = fullText.substring(idxHealth + 5).trim();
                }

                if (overallText) overallText.innerHTML = overallContent.replace(/\n/g, "<br>");
                if (loveText) loveText.innerHTML = loveContent.replace(/\n/g, "<br>");
                if (healthText) healthText.innerHTML = healthContent.replace(/\n/g, "<br>");

            } else {
                console.error(`カードID [${card.id}] の配列が見つかりません。`);
            }
        } else {
            console.error(`データ '${targetDataName}' が見つかりません。`);
        }

        resultPanel.classList.remove('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
        function resetReading() {
        resultPanel.classList.add('hidden');
        tarotCardImage.style.transform = 'none'; // 回転をリセット
        zodiacSelect.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 各ボタンのイベント紐付け
    drawBtn.addEventListener('click', drawReading);
    resetBtn.addEventListener('click', resetReading);

    // 星座変更時のリアルタイムプレビュー
    zodiacSelect.addEventListener('change', () => {
        const selectedZodiac = zodiacData[Number(zodiacSelect.value) || 0];
        updateZodiacPreview(selectedZodiac);
    });

    // 初期起動時のプレビュー設定
    const initialZodiac = zodiacData[Number(zodiacSelect.value) || 0];
    updateZodiacPreview(initialZodiac);
    
    if (tarotCards && tarotCards[0]) {
        tarotCardImage.src = tarotCards[0].image;
    }
    tarotCardImage.alt = 'デフォルトのタロットカード';
});
// 🔮 オリジナルタロット画像の右クリック（2本指タップ）禁止処理
document.addEventListener('DOMContentLoaded', () => {
    const tarotImg = document.getElementById('tarot-card-image');
    if (tarotImg) {
        tarotImg.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
});
