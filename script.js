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

    return {
        render: function() {
            renderBoard(gameBoard.getBoard());
        }
    };
})();

const gameController = (function() {
    let currentPlayer = 'X';

    function checkWin() {
        const board = gameBoard();

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
            if (line.every(cell => cell === currentPlayer)) {
                return true;
            }
        }
        return false;
    }

    function checkTie() {
        const board = gameBoard.getBoard();
        return board.flat().every(cell => cell !== ' ');
    }

    function handleMove(row, col) {
        if (gameBoard.setCell(row, col, currentPlayer)) {
            displayController.render();
            if (checkWin()) {
                alert(`Player ${currentPlayer} wins!`);
                gameBoard.resetBoard();
                displayController.render();
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





