const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameOver = false;

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    currentPlayer = 'X';
    gameOver = false;
    if (currentPlayer === 'O') {
        makeAIMove();
    }
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '' && !gameOver && currentPlayer === 'X') {
            cell.textContent = currentPlayer;
            cell.classList.add('disabled');

            if (checkWin()) {
                alert(currentPlayer + ' wins!');
                gameOver = true;
            } else if (isBoardFull()) {
                alert("It's a draw!");
                gameOver = true;
            } else {
                currentPlayer = 'O';
                makeAIMove();
            }
        }
    });
});

function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) 
    {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent)
        {
            return true;
        }
    }
}

function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function makeAIMove() {
    if (!gameOver) {
        const availableCells = Array.from(cells).filter(cell => cell.textContent === '');
        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const randomCell = availableCells[randomIndex];
            randomCell.textContent = 'O';
            randomCell.classList.add('disabled');

            if (checkWin()) {
                alert('AI wins!');
                gameOver = true;
            } else if (isBoardFull()) {
                alert("It's a draw!");
                gameOver = true;
            } else {
                currentPlayer = 'X';
            }
        }
    }
}
