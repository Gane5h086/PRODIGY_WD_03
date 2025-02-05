document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const humanButton = document.getElementById('humanButton');
    const computerButton = document.getElementById('computerButton');
    const gameContainer = document.getElementById('game');
    const modeSelection = document.getElementById('mode-selection');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let playWithComputer = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`Player ${currentPlayer} has won!`);
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            alert('Game ended in a draw!');
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (playWithComputer && currentPlayer === 'O') {
            computerPlay();
        }
    }

    function computerPlay() {
        let availableCells = [];
        gameState.forEach((cell, index) => {
            if (cell === '') {
                availableCells.push(index);
            }
        });

        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        const computerCell = document.querySelector(`.cell[data-index='${randomIndex}']`);
        handleCellPlayed(computerCell, randomIndex);
        handleResultValidation();
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.innerHTML = '');
    }

    function startGame(mode) {
        playWithComputer = mode === 'computer';
        modeSelection.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        resetGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    darkModeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    humanButton.addEventListener('click', () => startGame('human'));
    computerButton.addEventListener('click', () => startGame('computer'));
});