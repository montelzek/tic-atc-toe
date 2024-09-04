let gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function printBoard() {
    console.log(' 0 1 2')
    gameBoard.forEach((row, index) => {
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