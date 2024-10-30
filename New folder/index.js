const gridContainer = document.querySelector(".grid-container");
let cards = [
    { name: "Blastoise", img: "images4cards/Blastoise.png" },
    { name: "Charizard", img: "images4cards/Charizard.png" },
    { name: "Venusaur", img: "images4cards/Venusaur.png" },
    { name: "Pikachu", img: "images4cards/Charmander.png" },
    { name: "Blastoise", img: "images4cards/Charmeleon.png" },
    { name: "Charizard", img: "images4cards/Wartortle.png" },
    { name: "Venusaur", img: "images4cards/Ivysaur.png" },
    { name: "Pikachu", img: "images4cards/pikachu.png" },
    { name: "Blastoise", img: "images4cards/Bulbasaur.png" },
    { name: "Charizard", img: "images4cards/Squirtle.png" },
];

let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

cards = [...cards, ...cards];
   shuffleCards();
    generateCards();

function shuffleCards() {
    let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    gridContainer.innerHTML = ""
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
        <div class="front">
            <img class="front-image" src="images4cards/pokeball.png" >
        </div>
        <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped")

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    checkForMatch();
}
function checkForMatch() {
    let isMatch = firstCard.datasat.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();

    }, 1000);
}

function resetBoard() {
firstCard = null;
secondCard = null;
lockboard = false;
}

function restart() {
resetBoard();
shuffleCards();
score = 0;
document.querySelector(".score>").textContent = score;
gridContainer.innerHTML = "";
generateCards();
}