const cardElement = document.getElementById("tarot-card");
const resultElement = document.getElementById("result-text");
const buttonElement = document.getElementById("draw-btn");
const resetButtonElement = document.getElementById("reset-btn");
const privacyNoteElement = document.getElementById("result-privacy-note");

if (!buttonElement || !cardElement || !resultElement || !resetButtonElement) {
    throw new Error("必要な要素が見つかりませんでした。HTML の id を確認してください。");
}

const cardImage = cardElement.querySelector("img");
const initialImagePath = "../images/000_taroura.png";
const initialMessage = "カードに尋ねたいことを思い浮かべて引くとよいでしょう";
let imageTransitionToken = 0;

// 💡 爆速連打対策：すべてのカード画像をあらかじめブラウザに読み込ませる（プリロード）
if (typeof tarotDeck !== 'undefined' && Array.isArray(tarotDeck)) {
    tarotDeck.forEach((card) => {
        const img = new Image();
        img.src = card.image;
    });
}

const showDrawButton = () => {
    buttonElement.classList.remove("hidden");
    resetButtonElement.classList.add("hidden");
};

const showResetButton = () => {
    buttonElement.classList.add("hidden");
    resetButtonElement.classList.remove("hidden");
    if (privacyNoteElement) {
        privacyNoteElement.classList.remove("hidden");
    }
};

const resetToInitialState = () => {
    const fadeOutDuration = 180;
    cardImage.style.opacity = "0";
    cardImage.style.transform = "scale(1.12)";
    cardElement.classList.remove("reversed");
    if (privacyNoteElement) {
        privacyNoteElement.classList.add("hidden");
    }

    window.setTimeout(() => {
        cardImage.src = initialImagePath;
        cardImage.alt = "タロットカード";
        cardImage.style.opacity = "1";
        cardImage.style.transform = "scale(1.02)";
        resultElement.innerHTML = initialMessage;
        showDrawButton();
    }, fadeOutDuration);
};

// 💡 画像の切り替えと回転を完全に同期させる関数（連打最適化版）
const updateCardImageAndRotation = (selectedCard, isReversed) => {
    if (!cardImage) return;

    const thisToken = ++imageTransitionToken;

    // 1. まず一旦カードを透明にして、回転クラスを外す
    cardImage.style.opacity = "0";
    cardElement.classList.remove("reversed");

    // 2. 画像のURLをセット（事前読み込みされているので一瞬で切り替わります）
    cardImage.src = selectedCard.image;
    cardImage.alt = selectedCard.name;

    const revealCard = () => {
        if (thisToken !== imageTransitionToken) return;

        // ブラウザの描画タイミングに完全同期させ、回転と表示を一気に行う
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (isReversed) {
                    cardElement.classList.add("reversed");
                }
                cardImage.style.opacity = "1";
            });
        });
    };

    // 事前読み込みのおかげでほぼcompleteになります
    if (cardImage.complete) {
        revealCard();
        return;
    }

    cardImage.addEventListener("load", revealCard, { once: true });
};

buttonElement.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * tarotDeck.length);
    const selectedCard = tarotDeck[randomIndex];
    const isReversed = Math.random() < 0.3;

    updateCardImageAndRotation(selectedCard, isReversed);

    const positionText = isReversed ? "逆位置" : "正位置";
    const message = isReversed ? selectedCard.reversed : selectedCard.upright;
    
    resultElement.innerHTML = `<div class="result-card-title">結果：${selectedCard.name}（${positionText}）</div><div class="result-card-detail">${message.replace(/\n/g, "<br>")}</div>`;
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

document.addEventListener('DOMContentLoaded', () => {
    const cardImg = document.getElementById('card-image');
    if (cardImg) {
        cardImg.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
});
