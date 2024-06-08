let currentPlayer, gameBoard, gameActive, roundWon, roundDraw;

// Player X always starts
currentPlayer = "X"; // Use uppercase 'X' for consistency
// 3x3 game board
gameBoard = ['', '', '', '', '', '', '', '', ''];
gameActive = true;

function handlePlayerTurn(clickedCellIndex) {
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    checkForWinOrDraw();// Check for win or draw after each turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const cells = document.querySelectorAll('.cell'); // Select all elements with class 'cell'

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false); // Corrected 'addEventListener' typo
});

function cellClicked(event) {
    const clickedCell = event.target; // Corrected variable name from 'clickedCellevent'
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) -1; // Fixed parsing and indexing

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handlePlayerTurn(clickedCellIndex);
    updateUI();
}


function updateUI() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i]; // Corrected 'innertext' to 'innerText'
    }
}

const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
];

function checkForWinOrDraw() {
    roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            announceWinner(gameBoard[a]); // Announce the actual winner
            gameActive = false;
            return;
        }
    }
    roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
    }
}

function announceWinner(player) {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
}

function announceDraw() {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game Draw!';
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Clear the game board
    gameActive = true; // Set the game as active
    currentPlayer = 'X';  // Reset to player X
    // Clear all cells on the UI
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);
