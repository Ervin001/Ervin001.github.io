'use strict';

const GameBoard = (function (playerOne, playerTwo) {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const clearBoard = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
  };

  const setMarker = (index, marker) => {
    gameBoard[index] = marker;
  };

  const getMarker = (index) => {
    return gameBoard[index];
  };

  return { gameBoard, clearBoard, setMarker, getMarker };
})();

const GameUI = (() => {
  // Logic for manipulating DOM
  const cellsEl = document.querySelectorAll('.cell');
  const name1 = document.querySelector('.player-one-name');
  const name2 = document.querySelector('.player-two-name');

  cellsEl.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (Game.isPlaying && e.target.textContent === '') {
        Game.play(+e.target.dataset.cell);
        updateUI();
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

  const currentPlayerColor = (currPlayer) => {
    currPlayer === 'X'
      ? ((name1.style.color = 'red'), (name1.style.fontSize = '3.5rem'))
      : ((name1.style.color = ''), (name1.style.fontSize = ''));
    currPlayer === 'O'
      ? ((name2.style.color = 'red'), (name2.style.fontSize = '3.5rem'))
      : ((name2.style.color = ''), (name2.style.fontSize = ''));
  };

  return { updateNames, currentPlayerColor };
})();

const Game = (() => {
  let playing = false;
  let currentPlayer = undefined;
  let playerOne = undefined;
  let playerTwo = undefined;
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
    GameBoard.setMarker(index, currentPlayer.marker);
    switchPlayer();
    GameUI.currentPlayerColor(currentPlayer.marker);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const isPlaying = () => playing;

  const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = GameBoard.gameBoard[winCondition[0]];
      let b = GameBoard.gameBoard[winCondition[1]];
      let c = GameBoard.gameBoard[winCondition[2]];

      if (a === '-' || b === '-' || c === '-') {
        continue;
      }

      if (a === b && b === c) {
        return true;
      }
    }
  };

  return { start, isPlaying, play };
})();

const Player = function (name, marker, type) {
  return { name, marker, type };
};

(function vsPlayer() {
  const playerOne = Player('Rick', 'X', 'player');
  const playerTwo = Player('John', 'O', 'player');
  Game.start(playerOne, playerTwo);
})();

// (function vsCPU() {
//   const playerOne = Player('Rick', 'X', 'player');
//   const playerTwo = Player('Computer', 'O', 'cpu');
//   Game.start(playerOne, playerTwo);
// })();
