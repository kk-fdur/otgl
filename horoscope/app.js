document.addEventListener("DOMContentLoaded", () => {
    const zodiacButtons = document.querySelectorAll(".zodiac-btn");
    const resultContainer = document.getElementById("result-container");
    const zodiacNameDisplay = document.getElementById("zodiac-name");
    const loveFortune = document.getElementById("love-fortune");
    const workFortune = document.getElementById("work-fortune");
    const moneyFortune = document.getElementById("money-fortune");
    const luckyItem = document.getElementById("lucky-item");
    const resetBtn = document.getElementById("reset-btn");

    zodiacButtons.forEach(button => {
        button.addEventListener("click", () => {
            const zodiacId = parseInt(button.getAttribute("data-zodiac"));
            
            // horoscope-data.js から星座のデータを取得
            const data = horoscopeData[zodiacId];
            if (!data) return;

            // 1. 今日の方針を決める「シード値」を計算
            const today = new Date();
            // 例: 2026年9月2日なら 20260902 という1つの数字にする
            const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
            
            // 日付の数字に星座IDを足す（これで星座ごとに毎日違う結果になる）
            const seed = dateSeed + zodiacId;

            // 2. 独自の計算（余り算）で、その日の文章の「番号（インデックス）」を決める
            // % を使うことで、用意した文章の数（length）を超えない安全な番号になります
            // 各運勢で違う数字（* 3 や * 7）を掛けることで、結果の組み合わせがバラバラになります
            const loveIdx = (seed * 3) % data.fortune.love.length;
            const workIdx = (seed * 7) % data.fortune.work.length;
            const moneyIdx = (seed * 11) % data.fortune.money.length;
            const luckyIdx = (seed * 13) % data.fortune.lucky.length;

            // 3. 決まった番号の文章を画面にセット
            zodiacNameDisplay.innerText = `${data.name}（${data.dates}）`;
            loveFortune.innerText = data.fortune.love[loveIdx];
            workFortune.innerText = data.fortune.work[workIdx];
            moneyFortune.innerText = data.fortune.money[moneyIdx]; // ← ここを「moneyIdx」に修正しました！
            luckyItem.innerText = data.fortune.lucky[luckyIdx];
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