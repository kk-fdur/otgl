const cardElement = document.getElementById("tarot-card");
const resultElement = document.getElementById("result-text");
const buttonElement = document.getElementById("draw-btn");

if (!buttonElement || !cardElement || !resultElement) {
    throw new Error("必要な要素が見つかりませんでした。HTML の id を確認してください。");
}

const cardImage = cardElement.querySelector("img");
let imageTransitionToken = 0;

const updateCardImage = (selectedCard) => {
    if (!cardImage) {
        return;
    }

    const thisToken = ++imageTransitionToken;
    const applyVisibleState = () => {
        if (thisToken !== imageTransitionToken) {
            return;
        }
        cardImage.style.opacity = "1";
        cardImage.style.transform = "scale(1.02)";
    };

    cardImage.style.opacity = "0";
    cardImage.style.transform = "scale(1.12)";
    cardImage.src = selectedCard.image;
    cardImage.alt = selectedCard.name;

    if (cardImage.complete) {
        requestAnimationFrame(applyVisibleState);
        return;
    }

    cardImage.addEventListener("load", applyVisibleState, { once: true });
    requestAnimationFrame(() => {
        if (thisToken === imageTransitionToken && cardImage.complete) {
            applyVisibleState();
        }
    });
};

buttonElement.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    const selectedCard = tarotDeck[randomIndex];
    const isReversed = Math.random() < 0.3;

    updateCardImage(selectedCard);

    cardElement.classList.remove("reversed");
    void cardElement.offsetWidth;
    cardElement.classList.toggle("reversed", isReversed);

    const positionText = isReversed ? "逆位置" : "正位置";
    const message = isReversed ? selectedCard.reversed : selectedCard.upright;
    resultElement.innerHTML = `結果：${selectedCard.name}（${positionText}）<br>${message.replace(/\n/g, "<br>")}`;
});
