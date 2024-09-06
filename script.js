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

function makeMove(player, row, column) {
    if (board[row][column] === ' ') {
        board[row][column] = player;
        return true;
    } else {
        console.log('Invalid move, try gain!');
        return false;
    }
}

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === player)) return true;
        if (board.map(row => row[i]).every(cell => cell === player)) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
}

function checkDraw() {
    return board.flat().every(cell => cell !== ' ');
}

function playGame() {
    let currentPlayer = 'X';
    let turns = 0;
    while (true) {
        printBoard();
        let row = prompt(`Player ${currentPlayer}, enter your move row (0 - 2): `);
        let col = prompt(`Player ${currentPlayer}, enter your move column (0 - 2): `);

        if (makeMove(currentPlayer, row, col)) {
            turns++;
            if (checkWin(currentPlayer)) {
                printBoard();
                console.log(`Player ${currentPlayer} wins!`);
                break;
            } else if (checkDraw()) {
                printBoard();
                console.log("It's a draw!");
                break;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

