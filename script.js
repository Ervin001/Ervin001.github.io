'use strict';

const gameEl = document.querySelector('.game');
const playersEl = document.querySelectorAll('player');
const playerOneEl = document.querySelector('.player-one-name');
const playerTwoEl = document.querySelector('.player-two-name');
const gameBlurEl = document.querySelector('.game-blur');
const gameMessageEl = document.querySelector('.game-message');
const playerWonEl = document.querySelector('.player-won');
const btnResetEl = document.querySelector('.reset');
const btnStartOverEl = document.querySelector('.start-over');
const cellsEL = document.querySelectorAll('[data-cell]');
const playerOneScoreEl = document.querySelector('.player-one-score');
const playerTwoScoreEl = document.querySelector('.player-two-score');
const scoresPlayersEl = document.querySelectorAll('.score');

function Player(name, marker) {
  const nameUpper = name.toUpperCase();
  const markerUpper = marker.toUpperCase();
  let scores = 0;

  const playerScoreFunc = () => scores;

  const addTen = () => (scores += 10);

  const removeTen = () => (scores -= 10);

  return { nameUpper, markerUpper, playerScoreFunc, addTen, removeTen };
}

const tom = Player('tom', 'x');
const comp = Player('computer', 'o');

const game = ((playerOne, playerTwo) => {
  let winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];
  let gameBoard = [, , , , , , , ,];
  let playing = true;
  let players = [playerOne, playerTwo];
  
