const gridContainer = document.querySelector(".grid-container");
let cards = [
    { name: "Blastoise", img: "images4cards/Blastoise.png" },
    { name: "Charizard", img: "images4cards/Charizard.png" },
    { name: "Venusaur", img: "images4cards/Venusaur.png" },
    { name: "Pikachu", img: "images4cards/pikachu.png" },
    { name: "Squirtle", img: "images4cards/Squirtle.png" },
    { name: "Wartortle", img: "images4cards/Wartortle.png" },
    { name: "Ivysaur", img: "images4cards/Ivysaur.png" },
    { name: "Bulbasaur", img: "images4cards/Bulbasaur.png" },
    { name: "Charmander", img: "images4cards/Charmander.png" },
    { name: "Charmeleon", img: "images4cards/Charmeleon.png" },
];

let firstCard, secondCard;
let lockBoard = false;
let currentPlayer = 1;
let playerScores = [0, 0, 0, 0];

// Duplicate cards for pairs and shuffle
cards = [...cards, ...cards];
shuffleCards();
generateCards();
updateScore();
updatePlayerDisplay();

function shuffleCards() {
    let currentIndex = cards.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }
}

function generateCards() {
    gridContainer.innerHTML = ""; // Clear container
    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="front">
                    <img src="images4cards/pokeball.png" alt="Pokeball" />
                </div>
                <div class="back">
                    <img src="${card.img}" alt="${card.name}" />
                </div>
            </div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

function handleMatch() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    playerScores[currentPlayer - 1]++;
    updateScore();
    resetBoard();
    // Player keeps their turn after a match
}

function handleMismatch() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        updateTurn(); // Turn switches on a mismatch
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateTurn() {
    currentPlayer = currentPlayer % 4 + 1; // Rotate to the next player
    updatePlayerDisplay();
}

function updateScore() {
    document.getElementById("score1").textContent = playerScores[0];
    document.getElementById("score2").textContent = playerScores[1];
    document.getElementById("score3").textContent = playerScores[2];
    document.getElementById("score4").textContent = playerScores[3];
}

function updatePlayerDisplay() {
    document.getElementById("current-player").textContent = `Player ${currentPlayer}`;
}

function restart() {
    playerScores = [0, 0, 0, 0];
    currentPlayer = 1;
    updateScore();
    shuffleCards();
    generateCards();
    updatePlayerDisplay();
}