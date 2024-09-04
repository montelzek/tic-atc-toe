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

printBoard();