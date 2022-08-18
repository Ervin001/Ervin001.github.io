'use strict';

const GameBoard = (function (playerOne, playerTwo) {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const clearBoard = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
  };

  return { gameBoard, clearBoard };
})();

const Game = (() => {
  let playing = false;
  let currentPlayer = undefined;
  let playerOne = undefined;
  let playerTwo = undefined;

  const start = (p1, p2) => {
    playerOne = p1;
    playerTwo = p2;
    currentPlayer = playerOne;

    console.log(GameBoard.gameBoard);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  return { start };
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
