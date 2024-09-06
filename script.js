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

    function handleMove(row, col) {
        if (gameBoard.setCell(row, col, currentPlayer)) {
            displayController.render();
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





