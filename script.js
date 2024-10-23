let playerScore = 0;
let dealerScore = 0;
let playerTotalScore = 0;
let dealerTotalScore = 0;
let deck = createDeck();
let gameOver = false;
let showPlayerScore = document.getElementById("showPlayerScore");
let showDealerScore = document.getElementById("showDealerScore");
let showDealerTotalScore = document.getElementById("dealerScore");
let showPlayerTotalScore = document.getElementById("playerScore");

// Skapa kortleken
function createDeck() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  const deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

// Funktion för att få kortets värde
function getCardValue(card) {
  if (["Jack", "Queen", "King"].includes(card.value)) {
    return 10;
  } else if (card.value === "Ace") {
    return 11; // Hanteras speciellt senare
  } else {
    return parseInt(card.value);
  }
}

// Dra ett kort från leken
function drawCard() {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const drawnCard = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return drawnCard;
}

// Visa dealerns kort och uppdatera poäng
function dealerCard() {
  const cardDisplayDealer = document.getElementById("cardDisplayDealer");
  const card = drawCard();
  if (card) {
    dealerScore += getCardValue(card);
    showDealerScore.innerHTML = `<p> Dealer : ${dealerScore} </p>`;

    const img = document.createElement("img");
    img.src = `./assets/cards/${card.suit}_${card.value}.png`;
    img.alt = `${card.value} of ${card.suit}`;
    img.style.width = "100px";
    img.style.height = "150px";
    img.style.margin = "1rem";

    cardDisplayDealer.appendChild(img);
  }
}

// Visa spelarens kort och uppdatera poäng
function playerCard() {
  const cardDisplayPlayer = document.getElementById("cardDisplayPlayer");
  const card = drawCard();
  if (card) {
    playerScore += getCardValue(card);
    showPlayerScore.innerHTML = `<p> Player : ${playerScore} </p>`;

    const img = document.createElement("img");
    img.src = `./assets/cards/${card.suit}_${card.value}.png`;
    img.alt = `${card.value} of ${card.suit}`;
    img.style.width = "100px";
    img.style.height = "150px";
    img.style.margin = "1rem";

    cardDisplayPlayer.appendChild(img);
  }
}

// Hantera stay-funktionen
function stay() {
  while (dealerScore < 17) {
    dealerCard();
  }
  checkWinner();
}

// Kontrollera vinnaren
function checkWinner() {
  const resultDisplay = document.getElementById("resultDisplay");
  if (playerScore > 21) {
    resultDisplay.innerHTML = `<p> Player busts! Dealer wins! </p>`;
    dealerTotalScore += 1;
    showDealerTotalScore.innerHTML = `<h2>Score :</h2> ${dealerTotalScore}`;
  } else if (dealerScore > 21) {
    resultDisplay.innerHTML = `<p> Dealer busts! Player wins! </p>`;
    playerTotalScore += 1;
    showPlayerTotalScore.innerHTML = `<h2>Score :</h2> ${playerTotalScore}`;
  } else if (playerScore === 21) {
    resultDisplay.innerHTML = `<p> Player wins with Blackjack! </p>`;
    playerTotalScore += 1;
    showPlayerTotalScore.innerHTML = `<h2>Score :</h2> ${playerTotalScore}`;
  } else if (dealerScore === 21) {
    resultDisplay.innerHTML = `<p> Dealer wins with Blackjack! </p>`;
    dealerTotalScore += 1;
    showDealerTotalScore.innerHTML = `<h2>Score :</h2> ${dealerTotalScore}`;
  } else if (playerScore > dealerScore) {
    resultDisplay.innerHTML = `<p> Player wins! </p>`;
    playerTotalScore += 1;
    showPlayerTotalScore.innerHTML = `<h2>Score :</h2> ${playerTotalScore}`;
  } else if (dealerScore > playerScore) {
    resultDisplay.innerHTML = `<p> Dealer wins! </p>`;
    dealerTotalScore += 1;
    showDealerTotalScore.innerHTML = `<h2>Score :</h2> ${dealerTotalScore}`;
  } else {
    resultDisplay.innerHTML = ` <p> It's a tie! </p>`;
  }
  gameOver = true;
}

// Återställ spelet
function resetGame() {
  const cardDisplayDealer = document.getElementById("cardDisplayDealer");
  const cardDisplayPlayer = document.getElementById("cardDisplayPlayer");
  const resultDisplay = document.getElementById("resultDisplay");

  cardDisplayDealer.innerHTML = "";
  cardDisplayPlayer.innerHTML = "";
  showPlayerScore.innerText = "";
  showDealerScore.innerText = "";
  resultDisplay.innerText = "";
  startButton.style.display = "block";

  // Återställ poängen
  playerScore = 0;
  dealerScore = 0;

  // Återställ deck
  deck = createDeck();
  gameOver = false;
}

// Event listeners för knapparna
const hitCardButton = document.getElementById("hitCard");
hitCardButton.addEventListener("click", () => {
  if (!gameOver) {
    playerCard();
    if (playerScore > 21) {
      checkWinner();
    }
  }
});

const stayButton = document.getElementById("stayButton");
stayButton.addEventListener("click", () => {
  if (!gameOver) {
    stay();
  }
});

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

const startButton = document.getElementById("drawnCard");
startButton.addEventListener("click", () => {
  startGame();
  startButton.style.display = "none";
});
// Starta spelet med två kort
function startGame() {
  for (let i = 0; i < 2; i++) {
    playerCard();
  }
  dealerCard();
}
