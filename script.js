'use strict';

const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');
const cells = document.querySelectorAll('[data-cell]');
const gameBlurEl = document.querySelector('.game-blur');
const gameMSGContainer = document.querySelector('.game-message');
const playerWonMSG = document.querySelector('.player-won');
const gameOverMSG = document.querySelector('.game-over');
const btnEl = document.querySelector('.reset');

function Player(name, marker) {
  let nameU = name.toUpperCase();
  let markerU = marker.toUpperCase();

  const info = () => `${nameU} has the ${markerU}`;

  return { nameU, markerU, info };
}

const tom = Player('tom', 'x');
const comp = Player('Computer', 'o');
let scores, currentScore, activePlayer, playing;

// Game Factory
const game = ((one, two) => {
  let bothPlayers = [one, two];
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;
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

  const reset = () => {
    gameBlurEl.classList.add('hide');
    gameMSGContainer.classList.add('hide');

    // reset gameArr
    game.gameBoard = [, , , , , , , ,];

    // allow game to play
    game.playing = true;

    // clear cells
    cells.forEach((cell) => (cell.innerHTML = ''));

    // set cur player to player 1
    game.bothPlayers[game.checkActive()].markerU = game.bothPlayers[0].markerU;
  };

  const checkWinner = (array, activeMarker) => {
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = array[winCondition[0]];
      let b = array[winCondition[1]];
      let c = array[winCondition[2]];

      if (a === '' || b === '' || c === '') {
        continue;
      }

      if (a === b && b === c && a !== '' && b !== '' && c !== '') {
        gameBlurEl.classList.toggle('hide');
        gameMSGContainer.classList.toggle('hide');
        playerWonMSG.textContent = `${
          game.bothPlayers[game.checkActive()].nameU
        } Wins!!`;
        return true;
      }
    }
  };

  const changePlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };

  const checkActive = () => activePlayer;

  const changeName = () => {
    playerOne.textContent = one.nameU;
    playerTwo.textContent = two.nameU;
  };

  return {
    one,
    two,
    bothPlayers,
    gameBoard,
    scores,
    currentScore,
    playing,
    changePlayer,
    checkActive,
    changeName,
    checkWinner,
  };
})(tom, comp);

game.changeName();

cells.forEach((cell) => {
  cell.addEventListener('click', function (e) {
    if (game.playing) {
      // checks if selected cell is empty
      if (!e.target.innerText) {
        e.target.innerText = `${game.bothPlayers[game.checkActive()].markerU}`;
        game.gameBoard[+e.target.dataset.cell] =
          game.bothPlayers[game.checkActive()];

        // checks winner
        if (
          game.checkWinner(
            game.gameBoard,
            game.bothPlayers[game.checkActive()].markerU
          ) === true
        ) {
          game.playing = false;
        }

        let draw = !game.gameBoard.includes('');
        if (draw && game.playing) {
          playerWonMSG.textContent = `It's a tie`;
          gameBlurEl.classList.toggle('hide');
          gameMSGContainer.classList.toggle('hide');
          game.playing = false;
        }
        game.changePlayer();
      }
    }
  });
});

// Reset Buttons
btnEl.addEventListener('click', (e) => {
  // Remove game won info
  gameBlurEl.classList.add('hide');
  gameMSGContainer.classList.add('hide');

  // reset gameArr
  game.gameBoard = [, , , , , , , ,];

  // allow game to play
  game.playing = true;

  // clear cells
  cells.forEach((cell) => (cell.innerHTML = ''));

  // set cur player to player 1
  game.bothPlayers[game.checkActive()].markerU = game.bothPlayers[0].markerU;
});
