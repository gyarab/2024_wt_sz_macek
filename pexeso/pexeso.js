const cards = [
    { src: 'https://place.dog/100/100?id=1' },
    { src: 'https://place.dog/100/100?id=2' },
    { src: 'https://place.dog/100/100?id=3' },
    { src: 'https://place.dog/100/100?id=4' },
    { src: 'https://place.dog/100/100?id=1' },
    { src: 'https://place.dog/100/100?id=2' },
    { src: 'https://place.dog/100/100?id=3' },
    { src: 'https://place.dog/100/100?id=4' }
];

let gameState = {
    flippedCards: [],
    score: 0,
    matchedPairs: 0
};

const shuffleCards = (array) => array.sort(() => 0.5 - Math.random());

const renderBoard = () => {
    const container = document.getElementById('pexeso');
    container.innerHTML = '';
    gameState.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;

        if (gameState.flippedCards.includes(index) || card.matched) {
            const img = document.createElement('img');
            img.src = card.src;
            img.alt = 'Dog';
            cardElement.appendChild(img);
            cardElement.classList.add('flipped');
        }

        cardElement.addEventListener('click', () => handleCardClick(index));
        container.appendChild(cardElement);
    });
};

const updateScore = () => {
    document.getElementById('score').textContent = `Skóre: ${gameState.score}`;
};

const handleCardClick = (index) => {
    if (
        gameState.flippedCards.includes(index) || 
        gameState.cards[index].matched ||
        gameState.flippedCards.length >= 2
    ) return;

    gameState.flippedCards.push(index);
    renderBoard();

    if (gameState.flippedCards.length === 2) {
        checkForMatch();
    }
};

const checkForMatch = () => {
    const [firstIndex, secondIndex] = gameState.flippedCards;
    const firstCard = gameState.cards[firstIndex];
    const secondCard = gameState.cards[secondIndex];

    if (firstCard.src === secondCard.src) {
        firstCard.matched = true;
        secondCard.matched = true;
        gameState.score++;
        gameState.matchedPairs++;
    } else {
        setTimeout(() => {
            gameState.flippedCards = [];
            renderBoard();
        }, 1000);
    }

    gameState.flippedCards = [];
    updateScore();

    if (gameState.matchedPairs === cards.length / 2) {
        alert('Vyhrál jsi!');
    }
};

const resetGame = () => {
    gameState = {
        flippedCards: [],
        score: 0,
        matchedPairs: 0,
        cards: shuffleCards(cards.map(card => ({ ...card, matched: false })))
    };
    updateScore();
    renderBoard();
};

document.getElementById('reset-button').addEventListener('click', resetGame);

resetGame();
