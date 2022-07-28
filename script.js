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

  const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
      let winCondition = winningConditions[i];
      let a = winCondition[0];
      let b = winCondition[1];
      let c = winCondition[2];

      console.log(a === '');

      if (a === '' || b === '' || c === '') {
        continue;
      }

      // if (a === b && b === c) {
      //   gameBlurEl.classList.toggle('hide');
      //   gameMSGContainer.classList.toggle('hide');
      //   playerWonMSG.textContent = `${
      //     game.bothPlayers[game.checkActive()].nameU
      //   } Wins!!`;
      //   return true;
      // }

      if (a === b && b === c) {
        return true;
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

game.gameBoard = ['X', 'X', 'X', , , , ,];
console.log(game.checkWinner());

// game.changeNameColor();
// if (game.playing) {
//   cellsEL.forEach((cell) => {
//     cell.addEventListener('click', (e) => {
//       // adds marker to gameboard
//       game.gameBoard[+e.target.dataset.cell] =
//         game.players[game.active()].markerUpper;
//       // adds marker to UI
//       e.target.innerText = `${game.players[game.active()].markerUpper}`;
//       game.changeNameColor();
//       game.checkWinner();
//       game.switchPlayer();
//       game.removeNameColor();

//       // game.gameBoard[+e.target.dataset.cell] = game.bothPlayers[game.active()].markerUpper;
//       console.log(game.gameBoard);
//     });
//   });
// }

// console.log(game.players[game.active()]);
