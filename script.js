'use strict';

const GameBoard = (function (playerOne, playerTwo) {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const clearBoard = () => {
    return (gameBoard = ['', '', '', '', '', '', '', '', '']);
  };

  const getBoard = () => {
    return gameBoard;
  };

  const setMarker = (index, marker) => {
    gameBoard[index] = marker;
  };

  const getMarker = (index) => {
    return gameBoard[index];
  };

  const getRandomSpace = () => {
    const spaces = [];
    const emptySpaces = gameBoard.filter((el, i) =>
      el === '' ? spaces.push(i) : false
    );

    const randomNum = Math.trunc(Math.random() * spaces.length);
    return spaces[randomNum];
  };

  const emptyIndexies = (board) => {
    return board.filter((s, i) => (s === '' ? i : false));
  };

  return {
    gameBoard,
    clearBoard,
    setMarker,
    getMarker,
    getRandomSpace,
    emptyIndexies,
    getBoard,
  };
})();

const GameUI = (() => {
  // Logic for manipulating DOM
  const cellsEl = document.querySelectorAll('.cell');
  const name1 = document.querySelector('.player-one-name');
  const name2 = document.querySelector('.player-two-name');

  cellsEl.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      // Against player
      if (Game.isPlaying && e.target.textContent === '') {
        if (Game.getCurrentPlayer().type === 'player') {
          Game.play(+e.target.dataset.cell);
          updateUI();
        } else {
          Game.play(+e.target.dataset.cell);
          updateUI();
        }
      }
    });
  });

  const updateUI = () => {
    for (let i = 0; i < cellsEl.length; i++) {
      cellsEl[i].textContent = GameBoard.getMarker(i);
    }
  };

  const updateNames = (n1, n2) => {
    name1.textContent = n1;
    name2.textContent = n2;
  };

  const clearBoardUI = () => {
    cellsEl.forEach((cell) => {
      cell.textContent = '';
    });
  };

  const backToOptionsUI = () => {
    const containerEl = document.querySelector('.container');
    const optionsCntEl = document.querySelector('.contnr');

    containerEl.classList.add('hide');
    optionsCntEl.classList.remove('hide');
  };

  const currentPlayerColor = (currPlayer) => {
    currPlayer === 'X'
      ? ((name1.style.color = 'red'), (name1.style.fontSize = '3.5rem'))
      : ((name1.style.color = ''), (name1.style.fontSize = ''));
    currPlayer === 'O'
      ? ((name2.style.color = 'red'), (name2.style.fontSize = '3.5rem'))
      : ((name2.style.color = ''), (name2.style.fontSize = ''));
  };

  const gameOverContainerEl = document.querySelector('.game-message');
  const winnerNameEl = document.querySelector('.player-won');
  const gameBlurEl = document.querySelector('.game-blur');

  const gameOverMsg = (winner) => {
    if (winner !== undefined) {
      gameBlurEl.classList.remove('hide');
      gameOverContainerEl.classList.remove('hide');
      winnerNameEl.textContent = `${winner} has Won`;
    }

    if (winner === undefined) {
      gameBlurEl.classList.remove('hide');
      gameOverContainerEl.classList.remove('hide');
      winnerNameEl.textContent = 'It is a tie';
    }
  };

  const clearWinnerMsg = () => {
    winnerNameEl.textContent = '';

    gameOverContainerEl.classList.add('hide');
    gameBlurEl.classList.add('hide');
  };

  return {
    updateNames,
    currentPlayerColor,
    gameOverMsg,
    clearBoardUI,
    clearWinnerMsg,
    backToOptionsUI,
  };
})();

const Game = (() => {
  let playing = false;
  let currentPlayer = undefined;
  let playerOne = undefined;
  let playerTwo = undefined;
  let isComputer = undefined;

  const computerPlaying = (playerType) => {
    isComputer = playerType;
  };

  const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];

  // Starting conditions
  const start = (p1, p2) => {
    playing = true;
    playerOne = p1;
    playerTwo = p2;
    currentPlayer = playerOne;

    GameUI.updateNames(playerOne.name, playerTwo.name);
    GameUI.currentPlayerColor(currentPlayer.marker);
  };

  //  Game will take place here
  const play = (index) => {
    if (playing) {
      GameBoard.setMarker(index, currentPlayer.marker);
      checkWinner();

      if (playing && !isComputer) {
        switchPlayer();
        GameUI.currentPlayerColor(currentPlayer.marker);
        checkTie();
        GameBoard.getRandomSpace();
      }

      if (playing && isComputer) {
        switchPlayer();
        GameUI.currentPlayerColor(currentPlayer.marker);
        easyCpu();
        checkWinner();
        checkTie();
        switchPlayer();
        GameUI.currentPlayerColor(currentPlayer.marker);
      }
    }
  };

  const resetBoard = () => {
    playing = true;
    currentPlayer = playerOne;
    GameUI.currentPlayerColor(currentPlayer.marker);
    GameBoard.clearBoard();
    GameUI.clearBoardUI();
    GameUI.clearWinnerMsg();
  };

  // const miniMax = (newBoard, player) => {};

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const returnPlayerOne = () => playerOne;
  const returnPlayerTwo = () => playerTwo;

  const isPlaying = () => playing;

  const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = GameBoard.getBoard()[winCondition[0]];
      let b = GameBoard.getBoard()[winCondition[1]];
      let c = GameBoard.getBoard()[winCondition[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }

      if (a === b && b === c) {
        playing = false;
        GameUI.gameOverMsg(currentPlayer.name);
      }
    }
  };

  const checkTie = () => {
    const result = GameBoard.getBoard().filter((indx) => indx === '');
    if (result.length <= 0) {
      GameUI.gameOverMsg();
    }
  };

  const easyCpu = () => {
    GameBoard.getBoard()[GameBoard.getRandomSpace()] = currentPlayer.marker;
  };

  const getCurrentPlayer = () => currentPlayer;

  return {
    start,
    isPlaying,
    play,
    computerPlaying,
    getCurrentPlayer,
    returnPlayerOne,
    returnPlayerTwo,
    resetBoard,
  };
})();

// Factory for players
const Player = function (name, marker, type) {
  return { name, marker, type };
};

const playerButtonEl = document.querySelector('.player-v-player');
const computerButtonEl = document.querySelector('.player-v-cpu');
const firstContainerEl = document.querySelector('.contnr');
const secondContainerEl = document.querySelector('.container');

playerButtonEl.addEventListener('click', () => {
  firstContainerEl.classList.add('hide');
  secondContainerEl.classList.remove('hide');
  const playerOne = Player('PLayer 1', 'X', 'player');
  const playerTwo = Player('Player 2', 'O', 'player');
  Game.computerPlaying(false);
  Game.start(playerOne, playerTwo);
});

computerButtonEl.addEventListener('click', () => {
  firstContainerEl.classList.add('hide');
  secondContainerEl.classList.remove('hide');
  const playerOne = Player('Player 1', 'X', 'player');
  const playerTwo = Player('Computer', 'O', 'cpu');
  Game.computerPlaying(true);
  Game.start(playerOne, playerTwo);
});

const resetEl = document.querySelector('.reset');
const backEl = document.querySelector('.start-over');

resetEl.addEventListener('click', () => {
  Game.resetBoard();
});

backEl.addEventListener('click', () => {
  Game.resetBoard();
  GameUI.backToOptionsUI();
});
