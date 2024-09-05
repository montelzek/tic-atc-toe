const gameBoard = (function() {
    let board = [
        ['X', 'X', 'X'],
        ['X', 'X', 'X'],
        ['X', 'X', 'X']
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

board.printBoard();

function printBoard() {
    console.log(' 0 1 2')
    board.forEach((row, index) => {
        console.log(index, row.join('|'));
    });
}

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

