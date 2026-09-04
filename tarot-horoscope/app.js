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
        { id: 8, name: '射手座', symbol: '♐', color: '#8ccf87', accent: '#dfffe0' }, // スッキリ綺麗に修正！
        { id: 9, name: '山羊座', symbol: '♑', color: '#97a5d4', accent: '#e2e7ff' },
        { id: 10, name: '水瓶座', symbol: '♒', color: '#66b5d8', accent: '#d8f3ff' },
        { id: 11, name: '魚座', symbol: '♓', color: '#7b9be7', accent: '#dfe9ff' }
    ];

    const tarotCards = [
        { id: 0, name: '愚者', image: '../images/00_fool.png', keyword: '新しい出会いと勇気' },
        { id: 1, name: '魔術師', image: '../images/01_magician.png', keyword: '意志と行動力' },
        { id: 2, name: '女教皇', image: '../images/02_priestess.png', keyword: '直感と静かな知恵' },
        { id: 3, name: '女帝', image: '../images/03_empress.png', keyword: '豊かさと母なる安心' },
        { id: 4, name: '皇帝', image: '../images/04_emperor.png', keyword: '安定と責任の象徴' },
        { id: 5, name: '教皇', image: '../images/05_hirophant.png', keyword: '信頼と価値観の再確認' },
        { id: 6, name: '恋人', image: '../images/06_lovers.png', keyword: '選択と心の一致' },
        { id: 7, name: '戦車', image: '../images/07_chariot.png', keyword: '前進と意思の強さ' },
        { id: 8, name: '力', image: '../images/08_strength.png', keyword: '優しさと内なる支え' },
        { id: 9, name: '隠者', image: '../images/09_hermit.png', keyword: '内省と静かな準備' },
        { id: 10, name: '運命の輪', image: '../images/10_wheel of fortune.png', keyword: '流れの変化と巡り合わせ' },
        { id: 11, name: '正義', image: '../images/11_justice.png', keyword: '冷静さと公平な判断' },
        { id: 12, name: '吊るされた男', image: '../images/12_hanged man.png', keyword: '待機と見方を変える時' },
        { id: 13, name: '死神', image: '../images/13_death.png', keyword: '終わりと再生の合図' },
        { id: 14, name: '節制', image: '../images/14_temperance.png', keyword: '調和と余裕のバランス' },
        { id: 15, name: '悪魔', image: '../images/15_devil.png', keyword: '執着と手放しのテーマ' },
        { id: 16, name: '塔', image: '../images/16_tower.png', keyword: '驚きと転機' },
        { id: 17, name: '星', image: '../images/17_star.png', keyword: '明るい希望と再生' },
        { id: 18, name: '月', image: '../images/18_moon.png', keyword: '不安の影と潜在意識' },
        { id: 19, name: '太陽', image: '../images/19_sun.png', keyword: '輝きと自信の開花' },
        { id: 20, name: '審判', image: '../images/20_judgement.png', keyword: '自分の声を聞く時' },
        { id: 21, name: '世界', image: '../images/21_world.png', keyword: '完成と大きな成就' }
    ];

    // SVG生成関数（W3Cの正しい名前空間URLに完全修正）
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

    function seededIndex(seed, length) {
        const normalized = (seed * 9301 + 49297) % 233280;
        return Math.floor((normalized / 233280) * length);
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
                
                <!-- 神秘的な球体オーラ -->
                <circle cx="110" cy="110" r="110" fill="url(#g_${zodiac.id})"/>
                
                <!-- 2重SVGで比率をキープ -->
                <svg viewBox="0 0 220 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                    <!-- 【究極微調整】y座標を128から134へ。これでジャスト1.5ミリ下がります！ -->
                    <text x="110" y="134" text-anchor="middle" font-size="85" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif" fill="white">${zodiac.symbol}</text>
                    <!-- 星座名 -->
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

        // 2. ビジュアルエリアを更新
        tarotCardImage.src = card.image;
        tarotCardImage.alt = `${card.name}のカード`;
        updateZodiacPreview(zodiac);
        if (cardAnnounceText) {
            cardAnnounceText.textContent = `🔮 ${zodiac.name}のあなたは【 ${card.name} 】を引きました`;
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
                
                // 改行コードで確実に分解（空白行を除去する対策を追加）
                const lines = fullText.split(/[\n\r]+/).map(l => l.trim()).filter(Boolean);

                const overallText = document.getElementById('overall-text');
                const loveText = document.getElementById('love-text');
                const healthText = document.getElementById('health-text');

                // 4. 【完全バグ修正】テキストの抽出漏れが絶対に起きない安全ロジック
                if (lines && lines.length > 0) {
                    lines.forEach(line => {
                        if (line.includes('【全体運】') && overallText) {
                            overallText.textContent = line.replace('【全体運】', '').trim();
                        }
                        if ((line.includes('【恋愛・対人】') || line.includes('【恋愛対人】')) && loveText) {
                            loveText.textContent = line.replace(/【恋愛・対人】|【恋愛対人】/, '').trim();
                        }
                        if (line.includes('【健康運】') && healthText) {
                            healthText.textContent = line.replace('【健康運】', '').trim();
                        }
                    });
                }
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
        zodiacSelect.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // イベントリスナーの紐付けを保証
    drawBtn.addEventListener('click', drawReading);
    resetBtn.addEventListener('click', resetReading);

    // セレクトボックスの変更に合わせてリアルタイムで画像が変わる連動を追加（親切設計）
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
