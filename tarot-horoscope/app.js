document.addEventListener('DOMContentLoaded', () => {
    const zodiacSelect = document.getElementById('zodiac-select');
    const drawBtn = document.getElementById('draw-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultPanel = document.getElementById('result-panel');
    const resultText = document.getElementById('result-text');
    const tarotCardImage = document.getElementById('tarot-card-image');
    const zodiacImage = document.getElementById('zodiac-image');

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

    const resultMessages = [
        '今日のあなたは、{zodiac}の情熱が、{card}の導きとよく合っています。心の中ですでに答えは出ていて、ひとつ勇気を持って一歩踏み出すと、思わぬ好転が始まります。',
        '今日の{zodiac}は、{card}の象徴どおり「待つこと」も大切です。焦らず、静かな判断をしたときに、最も大事な出会いが自然にやってきます。',
        'この日は、{zodiac}の懐深さが{card}のメッセージと重なり、信頼できる人と協力して進むと運が開けます。人に頼るのは弱さではなく、次の成長の入口です。',
        '今日の{zodiac}には、{card}が「今のあなたが本当に欲しいもの」を教えてくれます。見えない不安より、目の前の小さな一歩を大切にすると、道が見えてきます。',
        '奇妙な巡り合わせが、今日の{zodiac}に訪れます。{card}は、思い込みを手放し、自由な選択をするよう促しています。自分の心に素直になれば、運の流れが整います。',
        '今日の{zodiac}は、{card}の輝きにより、過去の重荷を置き去りにできる日です。表に出ていた悩みより、内側の声を信じると、明るい展望が見えてきます。'
    ];

    function buildZodiacImage(zodiac) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
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

    function resolveCardAndResult(zodiacId) {
        const today = new Date();
        const dateSeed = getDateSeed(today);
        const zodiac = zodiacData[zodiacId] || zodiacData[0];

        const seed = dateSeed * 100 + zodiacId;
        const cardId = (seed * 17 + zodiacId * 11) % tarotCards.length;

        const card = tarotCards[cardId];
        const resultIndex = (dateSeed + zodiacId * 23 + cardId * 31) % resultMessages.length;
        const resultTextBody = resultMessages[resultIndex]
            .replace('{zodiac}', zodiac.name)
            .replace('{card}', card.name);

        return { zodiac, card, resultTextBody };
    }

    function updateZodiacPreview(zodiac) {
        zodiacImage.src = buildZodiacImage(zodiac);
        zodiacImage.alt = `${zodiac.name}のイメージ`;
    }

    function drawReading() {
        const zodiacId = Number(zodiacSelect.value);
        const { zodiac, card, resultTextBody } = resolveCardAndResult(zodiacId);

        tarotCardImage.src = card.image;
        tarotCardImage.alt = `${card.name}のカード`;
        updateZodiacPreview(zodiac);

        // 1. 総合メッセージを表示
        resultText.textContent = `${zodiac.name}のあなたは、${card.name}を引きました。${resultTextBody}`;

        // 2. 12星座のデータ名（windowオブジェクトに登録されている名前）のリスト
        const fortuneDataNames = [
            'ariesFortuneData', 'taurusFortuneData', 'geminiFortuneData', 'cancerFortuneData', 
            'leoFortuneData', 'virgoFortuneData', 'libraFortuneData', 'scorpioFortuneData', 
            'sagittariusFortuneData', 'capricornFortuneData', 'aquariusFortuneData', 'piscesFortuneData'
        ];
        
        // 選択された星座のデータを取得
        const targetDataName = fortuneDataNames[zodiacId];
        const fortuneData = window[targetDataName];

        if (fortuneData) {
            // 今回引いたタロットカードのIDに対応する配列（3パターン収録）を取得
            const fortuneArray = fortuneData[card.id];
            
            if (fortuneArray && fortuneArray.length > 0) {
                // 3パターンの文章からランダムで1つを選択
                const randomIndex = Math.floor(Math.random() * fortuneArray.length);
                const fullText = fortuneArray[randomIndex];

                // 改行（\n）で区切られた3つの文章をバラバラに分解する
                const lines = fullText.split('\n');

                // 各項目のHTML要素を取得
                const overallText = document.getElementById('overall-text');
                const loveText = document.getElementById('love-text');
                const healthText = document.getElementById('health-text');

                // 分解した文章から「【〇〇運】」という見出しの文字を消して、中身だけをすっきり表示
                if (overallText && lines[0]) overallText.textContent = lines[0].replace('【全体運】', '');
                if (loveText && lines[1]) loveText.textContent = lines[1].replace('【恋愛・対人】', '');
                if (healthText && lines[2]) healthText.textContent = lines[2].replace('【健康運】', '');
            }
        } else {
            console.error(`データ '${targetDataName}' が見つかりません。HTMLでの読み込み順を確認してください。`);
        }

        // 結果パネルを表示してスクロール
        resultPanel.classList.remove('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
} else {
                console.error(`データ '${fileName}FortuneData' が見つかりません。`);
            }

        } catch (error) {
            console.error('データの読み込みに失敗しました。', error);
        }

        // 結果パネルを表示してスクロール
        resultPanel.classList.remove('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
        } catch (error) {
            console.error('データの読み込みに失敗しました。', error);
        }

        // 結果パネルを表示してスクロール
        resultPanel.classList.remove('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

        } catch (error) {
            console.error('データの読み込みに失敗しました。', error);
        }

        } catch (error) {
            console.error('データの読み込みに失敗しました。', error);
        }
        
        // 結果パネルを表示してスクロール
        resultPanel.classList.remove('hidden');
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function resetReading() {
        resultPanel.classList.add('hidden');
        zodiacSelect.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    drawBtn.addEventListener('click', drawReading);
    resetBtn.addEventListener('click', resetReading);

    const initialZodiac = zodiacData[Number(zodiacSelect.value) || 0];
    updateZodiacPreview(initialZodiac);
    tarotCardImage.src = tarotCards[0].image;
    tarotCardImage.alt = 'デフォルトのタロットカード';
});
