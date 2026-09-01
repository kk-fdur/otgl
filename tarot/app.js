const cardElement = document.getElementById("tarot-card");
const resultElement = document.getElementById("result-text");
const buttonElement = document.getElementById("draw-btn");
const resetButtonElement = document.getElementById("reset-btn");

if (!buttonElement || !cardElement || !resultElement || !resetButtonElement) {
    throw new Error("必要な要素が見つかりませんでした。HTML の id を確認してください。");
}

const cardImage = cardElement.querySelector("img");
const initialImagePath = "../images/000_taroura.png";
const initialMessage = "カードに尋ねたいことを思い浮かべて引くとよいでしょう";
let imageTransitionToken = 0;

const showDrawButton = () => {
    buttonElement.classList.remove("hidden");
    resetButtonElement.classList.add("hidden");
};

const showResetButton = () => {
    buttonElement.classList.add("hidden");
    resetButtonElement.classList.remove("hidden");
};

const isResetButtonVisible = () => !resetButtonElement.classList.contains("hidden");

const resetToInitialState = () => {
    const fadeOutDuration = 180;
    cardImage.style.opacity = "0";
    cardImage.style.transform = "scale(1.12)";
    cardElement.classList.remove("reversed");

    window.setTimeout(() => {
        cardImage.src = initialImagePath;
        cardImage.alt = "タロットカード";
        cardImage.style.opacity = "1";
        cardImage.style.transform = "scale(1.02)";
        resultElement.textContent = initialMessage;
        showDrawButton();
    }, fadeOutDuration);
};

const updateCardImage = (selectedCard, isReversed = false) => {
    if (!cardImage) {
        return;
    }

    const thisToken = ++imageTransitionToken;
    const applyVisibleState = () => {
        if (thisToken !== imageTransitionToken) {
            return;
        }
        cardImage.style.opacity = "1";
        // JSでのtransform上書きを削除し、CSS側（.reversed）の傾き演出を活かします
    };

    cardImage.style.opacity = "0";
    cardImage.src = selectedCard.image;
    cardImage.alt = selectedCard.name;

    const revealCard = () => {
        if (thisToken !== imageTransitionToken) {
            return;
        }
        window.setTimeout(applyVisibleState, 180);
    };

    if (cardImage.complete) {
        revealCard();
        return;
    }

    cardImage.addEventListener("load", revealCard, { once: true });
    requestAnimationFrame(() => {
        if (thisToken === imageTransitionToken && cardImage.complete) {
            revealCard();
        }
    });
};

buttonElement.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    const selectedCard = tarotDeck[randomIndex];
    const isReversed = Math.random() < 0.3;

    updateCardImage(selectedCard, isReversed);

    // 一度リセットしてから、逆位置なら「reversed」クラスを付与
    cardElement.classList.remove("reversed");
    void cardElement.offsetWidth; // アニメーションを再トリガーするためのハック
    cardElement.classList.toggle("reversed", isReversed);

    const positionText = isReversed ? "逆位置" : "正位置";
    const message = isReversed ? selectedCard.reversed : selectedCard.upright;
    resultElement.innerHTML = `結果：${selectedCard.name}（${positionText}）<br>${message.replace(/\n/g, "<br>")}`;
    showResetButton();
});


const handleResetClick = (event) => {
    if (event) {
        event.preventDefault();
    }
    resetToInitialState();
};

resetButtonElement.addEventListener("click", handleResetClick);
resetButtonElement.addEventListener("touchend", handleResetClick, { passive: false });
resetButtonElement.addEventListener("pointerup", handleResetClick, { passive: false });
