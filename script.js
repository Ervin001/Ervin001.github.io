'use strict';

const gameEl = document.querySelector('.game');
const playersEl = document.querySelectorAll('player');
const playerOneEl = document.querySelector('.player-one');
const playerTwoEl = document.querySelector('.player-two');
const gameMessageEl = document.querySelector('.game-message');
const playerWonEl = document.querySelector('.player-won');
const btnReset = document.querySelector('.reset');
const btnStartOver = document.querySelector('.start-over');
const cellsEL = document.querySelectorAll('[data-cell]');

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
  let score = [0, 0];
  let activeP = 0;

  const checkWinner = () => {};

  const active = () => {
    return activeP;
  };

  const changeNameColor = () => {
    game.active() === 0
      ? (playerOneEl.style.color = 'red')
      : (playerTwoEl.style.color = 'red');
  };

  const switchPlayer = () => {
    activeP = activeP === 0 ? 1 : 0;
  };
  return {
    playerOne,
    playerTwo,
    gameBoard,
    playing,
    players,
    active,
    changeNameColor,
    switchPlayer,
  };
})(tom, comp);

// game.changeNameColor();
if (game.playing) {
  cellsEL.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      game.gameBoard[+e.target.dataset.cell] =
        game.players[game.active()].markerUpper;

      game.changeNameColor();
      // game.gameBoard[+e.target.dataset.cell] = game.bothPlayers[game.active()].markerUpper;
      console.log(game.gameBoard);
    });
  });
}

// console.log(game.players[game.active()]);
