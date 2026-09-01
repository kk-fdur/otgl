const zodiacButtons = document.querySelectorAll(".zodiac-btn");
const resultContainer = document.getElementById("result-container");
const resetButton = document.getElementById("reset-btn");

const zodiacNameElement = document.getElementById("zodiac-name");
const loveFortune = document.getElementById("love-fortune");
const workFortune = document.getElementById("work-fortune");
const moneyFortune = document.getElementById("money-fortune");
const luckyItem = document.getElementById("lucky-item");

if (!zodiacButtons.length || !resultContainer || !resetButton) {
    throw new Error("必要な要素が見つかりませんでした。HTML の id を確認してください。");
}

const displayFortune = (zodiacIndex) => {
    if (zodiacIndex < 0 || zodiacIndex >= horoscopeData.length) {
        return;
    }

    const zodiac = horoscopeData[zodiacIndex];
    
    resultContainer.classList.add("hidden");
    
    window.setTimeout(() => {
        zodiacNameElement.textContent = zodiac.name;
        loveFortune.textContent = zodiac.fortune.love;
        workFortune.textContent = zodiac.fortune.work;
        moneyFortune.textContent = zodiac.fortune.money;
        luckyItem.textContent = zodiac.fortune.lucky;
        
        resultContainer.classList.remove("hidden");
    }, 180);
};

const resetToSelector = () => {
    resultContainer.classList.add("hidden");
    
    window.setTimeout(() => {
        zodiacNameElement.textContent = "";
        loveFortune.textContent = "";
        workFortune.textContent = "";
        moneyFortune.textContent = "";
        luckyItem.textContent = "";
    }, 180);
};

zodiacButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const zodiacIndex = parseInt(button.getAttribute("data-zodiac"), 10);
        displayFortune(zodiacIndex);
    });
});

resetButton.addEventListener("click", resetToSelector);
resetButton.addEventListener("touchend", (event) => {
    event.preventDefault();
    resetToSelector();
});
resetButton.addEventListener("pointerup", (event) => {
    if (event.pointerType === "touch") {
        event.preventDefault();
        resetToSelector();
    }
});
