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
    const resultElement = document.getElementById('result');
    const playerXNameElement = document.getElementById('playerXName');
    const playerONameElement = document.getElementById('playerOName');
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');

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

    function displayResult(message) {
        resultElement.textContent = message;
    }

    function clearResult() {
        resultElement.textContent = '';
    }

    function updatePlayerNames(playerX, playerO) {
        playerXNameElement.textContent = playerX;
        playerONameElement.textContent = playerO;
    }

    function updateScores(scores) {
        playerXScoreElement.textContent = scores.X;
        playerOScoreElement.textContent = scores.O;
    }

    return {
        render: function() {
            renderBoard(gameBoard.getBoard());
        },
        highlightWinningLine,
        displayResult,
        clearResult,
        updatePlayerNames,
        updateScores
    };
})();

const gameController = (function() {
    let currentPlayer = 'X';
    let playerXName = 'Player X';
    let playerOName = 'Player O';
    let scores = { X: 0, O: 0 };

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
        displayController.clearResult();
        if (gameBoard.setCell(row, col, currentPlayer)) {
            displayController.render(); 
            const winningLine = checkWin(); 
            if (winningLine) {
                displayController.highlightWinningLine(winningLine);
                const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
                displayController.displayResult(`Player ${winnerName} wins!`);
                disableBoardInteraction();
                scores[currentPlayer]++;
                displayController.updateScores(scores); 
                setTimeout(() => {
                    gameBoard.resetBoard();
                    displayController.render(); 
                    enableBoardInteractions();
                }, 2000);
                return;
            } else if (checkTie()) {
                displayController.displayResult("It's a tie!");
                disableBoardInteraction();
                setTimeout(() => {
                    gameBoard.resetBoard();
                    displayController.render();
                    enableBoardInteractions();
                }, 2000);
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        } else {
            alert('Invalid move, try again!'); 
        }
    }

    function init() {
        displayController.render(); 
        displayController.clearResult();
        document.getElementById('gameBoard').addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('cell')) {
                const row = parseInt(target.dataset.row, 10);
                const col = parseInt(target.dataset.col, 10);
                handleMove(row, col); 
            }
        });
    }

    function startGame() {
        playerXName = document.getElementById('playerX').value || 'Player X';
        playerOName = document.getElementById('playerO').value || 'Player O';
        currentPlayer = 'X';
        gameBoard.resetBoard();
        displayController.updatePlayerNames(playerXName, playerOName);
        displayController.updateScores(scores);
        displayController.render();
        displayController.clearResult();

        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
    }

    function restartRound() {
        gameBoard.resetBoard();
        currentPlayer = 'X';
        displayController.clearResult();
        displayController.render();
    }

    function restartGame() {
        scores = { X: 0, O: 0 };
        restartRound();
        displayController.updateScores(scores);
    }

    function disableBoardInteraction() {
        document.getElementById('gameBoard').style.pointerEvents = 'none';
    }

    function enableBoardInteractions() {
        document.getElementById('gameBoard').style.pointerEvents = 'auto';
    }

    return {
        init,
        startGame,
        restartRound,
        restartGame,
        disableBoardInteraction, 
        enableBoardInteractions
    };
})();

document.getElementById('startGame').addEventListener('click', gameController.startGame);
document.getElementById('restartRound').addEventListener('click', gameController.restartRound);
document.getElementById('restartGame').addEventListener('click', gameController.restartGame);
gameController.init();





