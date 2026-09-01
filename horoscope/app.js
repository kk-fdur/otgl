document.addEventListener("DOMContentLoaded", () => {
    const zodiacButtons = document.querySelectorAll(".zodiac-btn");
    const resultContainer = document.getElementById("result-container");
    const zodiacNameDisplay = document.getElementById("zodiac-name");
    const loveFortune = document.getElementById("love-fortune");
    const workFortune = document.getElementById("work-fortune");
    const moneyFortune = document.getElementById("money-fortune");
    const luckyItem = document.getElementById("lucky-item");
    const resetBtn = document.getElementById("reset-btn");

    // 日替わりでシャッフルするための「今日のアドバイス・ラッキーアイテム」
    const dailyModifiers = {
        love: ["。素直な笑顔がさらに運気を上げます。", "。聞き役に回ると吉。", "。自分から声をかけてみて。"],
        work: ["。集中力が冴え渡る日です。", "。周囲への感謝を言葉にすると吉。", "。焦りは禁物です。"],
        money: ["。お買い物に良い日です。", "。無駄遣いに注意して。", "。コンビニでのついで買いを控えて。"],
        items: ["お気に入りのマイボトル", "ハンカチ", "青色のペン", "ミントタブレット", "新しいノート"]
    };

    // ボタンがクリックされたときの処理
    zodiacButtons.forEach(button => {
        button.addEventListener("click", () => {
            const zodiacId = parseInt(button.getAttribute("data-zodiac"));
            
            // horoscope-data.js から選択された星座のデータを取得
            const data = horoscopeData[zodiacId];
            if (!data) return;

            // 1. 今日の日付からシード値（計算用の数字）を作る
            const today = new Date();
            const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
            const seed = dateSeed + zodiacId;

            // 2. 日付と星座IDを元に、日替わりの追加メッセージの番号を決める
            const loveIdx = (seed * 3) % dailyModifiers.love.length;
            const workIdx = (seed * 7) % dailyModifiers.work.length;
            const moneyIdx = (seed * 11) % dailyModifiers.money.length;
            const itemIdx = (seed * 13) % dailyModifiers.items.length;

            // 3. 元の固定文章に、日替わりの一言をプラスして画面にセット
            zodiacNameDisplay.innerText = `${data.name}（${data.dates}）`;
            loveFortune.innerText = data.fortune.love + dailyModifiers.love[loveIdx];
            workFortune.innerText = data.fortune.work + dailyModifiers.work[workIdx];
            moneyFortune.innerText = data.fortune.money + dailyModifiers.money[moneyIdx];
            
            // ラッキーアイテムは元のデータ（赤色など）と、日替わりアイテムを組み合わせる
            luckyItem.innerText = `${data.fortune.lucky} ／ 今日のアイテム: ${dailyModifiers.items[itemIdx]}`;

            // 4. 結果画面を表示
            resultContainer.classList.remove("hidden");
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 「別の星座を占う」ボタンの処理
    resetBtn.addEventListener("click", () => {
        resultContainer.classList.add("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});