'use strict';

const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');

function Player(name, marker) {
  let nameU = name.toUpperCase();
  let markerU = marker.toUpperCase();

  const info = () => `${nameU} has the ${markerU}`;

  return { nameU, markerU, info };
}

const tom = Player('tom', 'x');
const comp = Player('Computer', 'o');
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let bothPlayers = [one, two];

const game = ((one, two) => {
  let gameBoard = [, , , , , , , ,];

  const changeName = () => {
    playerOne.textContent = one.nameU;
    playerTwo.textContent = two.nameU;
  };

  return { one, two, changeName };
})(tom, comp);

game.changeName();
console.log(game.one);
