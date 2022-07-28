'use strict';

const gameEl = document.querySelector('.game');
const playersEl = document.querySelectorAll('player');
const playerOneEl = document.querySelector('.player-one');
const playerTwoEl = document.querySelector('.player-two');
const gameBlurEl = document.querySelector('.game-blur');
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
  let score = [0, 0];
  let activeP = 0;

  const checkWinner = (array) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = array[winCondition[0]];
      let b = array[winCondition[1]];
      let c = array[winCondition[2]];
      if (a === undefined || b === undefined || c === undefined) {
        continue;
      }

      if (a === b && b === c) {
        gameBlurEl.classList.toggle('hide');
        gameMessageEl.classList.toggle('hide');
        playerWonEl.textContent = `${
          game.players[game.active()].nameUpper
        } Wins!!`;
        game.playing = false;
        break;
      }
    }
  };

  const active = () => {
    return activeP;
  };

  const changeNameColor = () => {
    game.active() === 0
      ? (playerOneEl.style.color = 'red')
      : (playerTwoEl.style.color = 'red');
  };

  const removeNameColor = () => {
    game.active() === 0
      ? (playerOneEl.style.color = '')
      : (playerTwoEl.style.color = '');
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
    checkWinner,
    active,
    changeNameColor,
    removeNameColor,
    switchPlayer,
  };
})(tom, comp);

game.changeNameColor();

cellsEL.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    if (game.playing && !e.target.innerText) {
      // adds marker to gameBoard
      game.gameBoard[+e.target.dataset.cell] =
        game.players[game.active()].markerUpper;
      // adds marker to UI
      e.target.innerText = `${game.players[game.active()].markerUpper}`;

      game.checkWinner(game.gameBoard);
      game.removeNameColor();
      game.switchPlayer();
      game.changeNameColor();

      let draw = game.gameBoard.includes('');
      console.log(draw);

      if (draw && game.playing) {
        playerWonEl.textContent = `It's a tie`;
        gameBlurEl.classList.toggle('hide');
        gameMessageEl.classList.toggle('hide');
        game.playing = false;
      }
    }
  });
});

// console.log(game.players[game.active()]);
