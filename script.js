'use strict';

const gameEl = document.querySelector('.game');
const playerOneEl = document.querySelector('.player-one');
const playerTwoEl = document.querySelector('.player-two');
const gameMessageEl = document.querySelector('.game-message');
const playerWonEl = document.querySelector('.player-won');
const btnReset = document.querySelector('.reset');
const btnStartOver = document.querySelector('.start-over');

function Player(name, marker) {
  const nameUpper = name.toUpperCase();
  const markerUpper = marker.toUpperCase();

  return { nameUpper, markerUpper };
}

const tom = Player('tom', 'x');
const comp = Player('computer', 'o');

const game = ((playerOne, playerTwo) => {
  let winningConditions = [[0, 1, 2]];
  let gameBoard = [, , , , , , , ,];
  let playing = true;
  let players = [playerOne, playerTwo];
  let activePlayer = 0;
  let score = [0, 0];

  const checkWinner = () => {};

  const active = () => {
    return activePlayer;
  };

  const switchPlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };
  return {
    playerOne,
    playerTwo,
    gameBoard,
    playing,
    players,
    active,
    switchPlayer,
  };
})(tom, comp);
