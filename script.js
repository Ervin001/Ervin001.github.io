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

  return { gameBoard, clearBoard };
})();

const GameUI = (() => {
  // Logic for manipulating DOM
  const cellsEl = document.querySelectorAll('.cell');

  cellsEl.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (Game.isPlaying && e.target.textContent === '') {
        Game.play(+e.target.dataset.cell);
      }
    });
  });

  const updateUI = () => {};

  return {};
})();

const Game = (() => {
  let playing = false;
  let currentPlayer = undefined;
  let playerOne = undefined;
  let playerTwo = undefined;

  // Game will be here
  const start = (p1, p2) => {
    playing = true;
    playerOne = p1;
    playerTwo = p2;
    currentPlayer = playerOne;
  };

  const play = (index) => {
    GameBoard.setMarker(index);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const isPlaying = () => playing;

  return { start, isPlaying };
})();

const Player = function (name, marker, type) {
  return { name, marker, type };
};

function vsPlayer() {
  const playerOne = Player('Rick', 'X', 'player');
  const playerTwo = Player('John', 'O', 'player');
  Game.start(playerOne, playerTwo);
}

vsPlayer();
