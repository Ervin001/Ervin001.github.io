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
  let score = [0, 0];
  let activeP = 0;

  const pointsIncrease = (activePlayer) => {
    return activePlayer;
  };
  const pointsDecrease = (activePlayer) => {
    game.switchPlayer();
    return activePlayer;
  };

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
        console.log(game.pointsIncrease(game.players[game.active()].addTen()));
        game.switchPlayer();
        console.log(
          game.pointsDecrease(game.players[game.active()].removeTen())
        );

        // add score to UI
        scoresPlayersEl[game.active()].textContent =
          +scoresPlayersEl[game.active()].textContent + 1;

        // add score to game obj
        // game.pointsIncrease(game.scores[game.active()]);

        // game.players[game.active].score
        true;
      }
    }
  };

  const reset = () => {
    // clear gameBoard
    game.gameBoard = [, , , , , , , ,];

    // clear cells
    cellsEL.forEach((cell) => (cell.innerHTML = ''));

    // set active player to 1

    // change the active player color back to player 1
    game.removeNameColor();
    game.active('s');
    game.changeNameColor();
    // remove the color of the previous player

    // remove win message and who won
    gameBlurEl.classList.add('hide');
    gameMessageEl.classList.add('hide');
  };

  const active = (reset) => {
    if (!reset) return activeP;

    if (reset) return (activeP = 0);
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
    reset,
    changeNameColor,
    removeNameColor,
    switchPlayer,
    pointsIncrease,
    pointsDecrease,
  };
})(tom, comp);

game.changeNameColor();
playerOneEl.textContent = game.playerOne.nameUpper;
playerTwoEl.textContent = game.playerTwo.nameUpper;

cellsEL.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    if (game.playing) {
      if (game.playing && !e.target.innerText) {
        // adds marker to gameBoard
        game.gameBoard[+e.target.dataset.cell] =
          game.players[game.active()].markerUpper;
        // adds marker to UI
        e.target.innerText = `${game.players[game.active()].markerUpper}`;

        if (game.checkWinner(game.gameBoard)) {
          game.playing = false;
        }

        let draw = !game.gameBoard.includes(undefined);

        if (draw && game.playing) {
          playerWonEl.textContent = `It's a tie`;
          gameBlurEl.classList.toggle('hide');
          gameMessageEl.classList.toggle('hide');
          game.playing = false;
        }

        // game.checkWinner(game.gameBoard);
        game.removeNameColor();
        game.switchPlayer();
        game.changeNameColor();
      }
    }
  });
});

btnResetEl.addEventListener('click', (e) => {
  game.reset();
});
