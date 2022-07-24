'use strict';

const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');
const cells = document.querySelectorAll('[data-cell]');

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
  let gameBoard = [, , , , , , , ,];
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  function changePlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
  }

  const checkActive = () => activePlayer;

  const changeName = () => {
    playerOne.textContent = one.nameU;
    playerTwo.textContent = two.nameU;
  };

  return {
    one,
    two,
    bothPlayers,
    scores,
    currentScore,
    playing,
    changePlayer,
    checkActive,
    changeName,
  };
})(tom, comp);
game.changePlayer();

cells.forEach((cell) => {
  cell.addEventListener('click', function (e) {
    if (game.playing) {
      e.target.innerText = `${game.bothPlayers[game.checkActive()].markerU}`;
      console.log(+e.target.dataset.cell);
    }
  });
});
