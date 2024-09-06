const gameBoard = (function() {
    let board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    const getBoard = () => {
        return board;
    };

    const setCell = (row, col, player) => {
        if (board[row][col] === ' ') {
            board[row][col] = player;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    };
    return { getBoard, setCell, resetBoard };
})();

const displayController = (function() {
    
    const gameBoardElement = document.getElementById('gameBoard');

    function renderBoard(board) {
        gameBoardElement.innerHTML = '';

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.textContent = cell;
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                gameBoardElement.appendChild(cellElement);
            });
        });
    }

    function highlightWinningLine(winningCells) {
        winningCells.forEach(([row, col]) => {
            const cell = gameBoardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('highlight');
            }
        });
    }

    return {
        render: function() {
            renderBoard(gameBoard.getBoard());
        },
        highlightWinningLine
    };
})();

const gameController = (function() {
    let currentPlayer = 'X';

    function checkWin() {
        const board = gameBoard.getBoard();

        const winningLines = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

        for (let line of winningLines) {
            const [a, b, c] = line;
            if (board[a[0]][a[1]] === currentPlayer && 
                board[b[0]][b[1]] === currentPlayer && 
                board[c[0]][c[1]] === currentPlayer) {
                return line; 
            }
        }
        return null;
    }

    function checkTie() {
        const board = gameBoard.getBoard();
        return board.flat().every(cell => cell !== ' ');
    }

    function handleMove(row, col) {
        if (gameBoard.setCell(row, col, currentPlayer)) {
            displayController.render();
            const winningLine = checkWin();
            if (winningLine) {
                displayController.highlightWinningLine(winningLine);
                alert(`Player ${currentPlayer} wins!`);
                gameBoard.resetBoard();
                setTimeout(() => displayController.render(), 2000);
                return;
            } else if (checkTie()) {
                alert("It's a tie!");
                gameBoard.resetBoard();
                displayController.render();
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        } else {
            alert('Invalid move, try again!');
        }
    }

    function init() {
        displayController.render();
        document.getElementById('gameBoard').addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('cell')) {
                const row = target.dataset.row;
                const col = target.dataset.col;
                handleMove(row, col);
            }
        });
    }

    return {
        init
    };
})();

gameController.init();





