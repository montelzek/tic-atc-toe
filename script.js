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

        // List of winning combinations with cell indices
        const winningLines = [
            [[0, 0], [0, 1], [0, 2]], // First row
            [[1, 0], [1, 1], [1, 2]], // Second row
            [[2, 0], [2, 1], [2, 2]], // Third row
            [[0, 0], [1, 0], [2, 0]], // First column
            [[0, 1], [1, 1], [2, 1]], // Second column
            [[0, 2], [1, 2], [2, 2]], // Third column
            [[0, 0], [1, 1], [2, 2]], // Diagonal from top-left
            [[0, 2], [1, 1], [2, 0]]  // Diagonal from top-right
        ];

        for (let line of winningLines) {
            const [a, b, c] = line;

            
            if (
                board[a[0]][a[1]] === currentPlayer &&
                board[b[0]][b[1]] === currentPlayer &&
                board[c[0]][c[1]] === currentPlayer
            ) {
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
                setTimeout(() => {
                    alert(`Player ${currentPlayer} wins!`);
                    gameBoard.resetBoard();
                    displayController.render(); 
                }, 100);
                return;
            } else if (checkTie()) {
                setTimeout(() => {
                    alert("It's a tie!");
                    gameBoard.resetBoard();
                    displayController.render();
                }, 100);
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
                const row = parseInt(target.dataset.row, 10);
                const col = parseInt(target.dataset.col, 10);
                handleMove(row, col); 
            }
        });
    }

    return {
        init
    };
})();

gameController.init();





