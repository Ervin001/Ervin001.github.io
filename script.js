'use strict';

const gameEl = document.querySelector('.game');
const playersEl = document.querySelectorAll('.player');
const playerOneNameEl = document.querySelector('.player-one-name');
const playerTwoNameEl = document.querySelector('.player-two-name');
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
  let score = 0;

  const playerScoreFunc = () => score;

  const addTen = () => (score += 10);

  const removeTen = () => (score -= 10);

  return { nameUpper, markerUpper, playerScoreFunc, addTen, removeTen };
}

const tom = Player('rick', 'x');
const comp = Player('computer', 'o');

const game = ((playerOne, playerTwo, gameType) => {
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

  let gameBoard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
  let playing = true;
  let players = [playerOne, playerTwo];
  let activePlayer = 0;

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () =>
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  const checkWinner = () => {
    let roundWon = true;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameBoard[winCondition[0]];
      let b = gameBoard[winCondition[1]];
      let c = gameBoard[winCondition[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;

        gameBlurEl.style.display = '';

        return;
      }
    }
  };

  const getEmptySpaces = () => {
    let newIndexes = [];
    const markedBoard = gameBoard.forEach((cell, i) => {
      if (cell === '-') newIndexes.push(i);
    });

    const indexedNum = Math.trunc(Math.random() * newIndexes.length);

    const newNum = newIndexes[indexedNum];
    console.log(newNum);
    if (newNum !== undefined) {
      cellsEL[newNum].textContent = players[getActivePlayer()].markerUpper;
      gameBoard[newNum] += 'O';
    }
  };

  const addRandomMarker = () => {
    // console.log(getEmptySpaces().length);
  };

  return {
    playerOne,
    playerTwo,
    gameType,
    players,
    playing,
    getActivePlayer,
    switchActivePlayer,
    checkWinner,
    getEmptySpaces,
    addRandomMarker,
    gameBoard,
  };
})(tom, comp, 'easy');

playerOneNameEl.textContent = game.playerOne.nameUpper;
playerTwoNameEl.textContent = game.playerTwo.nameUpper;

// Check draw
// let roundDraw = !gameBoard.includes(undefined)

playersEl[game.getActivePlayer()].style.color = 'red';
cellsEL.forEach((cell) =>
  cell.addEventListener('click', (e) => {
    if (game.playing) {
      if (game.gameType === 'easy') {
        if (e.target.textContent === '') {
          // Show marker on UI
          e.target.textContent =
            game.players[game.getActivePlayer()].markerUpper;
          // Remove previous player color
          playersEl[game.getActivePlayer()].style.color = '';
          // Add markers to GameBoard State
          game.gameBoard[e.target.dataset.cell] =
            game.players[game.getActivePlayer()].markerUpper;
          game.checkWinner();
          // Switch player
          game.switchActivePlayer();
          game.getEmptySpaces();
          game.switchActivePlayer();
          console.log(game.gameBoard);

          // Change active player color
          playersEl[game.getActivePlayer()].style.color = 'red';
        }
      }
    }
  })
);
