'use strict';

// Select Elements
const playerOne = document.querySelector('.player--1');
const playerTwo = document.querySelector('.player--2');
const playerOneScoreEl = document.querySelector('#score--1');
const playerTwoScoreEl = document.querySelector('#score--2');
const playerOneCurrentScoreEl = document.querySelector('#current--1');
const playerTwoCurrentScoreEl = document.querySelector('#current--2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');

// Define Variables
let playerOneTotalScore,
  playerTwoTotalScore,
  playerOneCurrentScore,
  playerTwoCurrentScore,
  currentPlayer;

// Initial Function
const init = function () {
  playerOneScoreEl.textContent = 0;
  playerTwoScoreEl.textContent = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;
  playerOneCurrentScore = 0;
  playerTwoCurrentScore = 0;
  currentPlayer = 1;
};
init();

// Change Current Player Function
const switchPlayer = function () {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

// Reset Current Player Score Function
const resetPlayerScore = function () {
  if (currentPlayer === 1) {
    playerOneCurrentScore = 0;
    playerOneCurrentScoreEl.textContent = 0;
  } else {
    playerTwoCurrentScore = 0;
    playerTwoCurrentScoreEl.textContent = 0;
  }
  switchPlayer();
};

// Find Winner Player
const IsWinner = function () {
  if (playerOneTotalScore >= 100 || playerTwoTotalScore >= 100) {
    if (playerOneTotalScore >= 100) {
      playerOne.classList.add('player--winner');
    } else if (playerTwoTotalScore >= 100) {
      playerTwo.classList.add('player--winner');
    }
    playerOne.classList.remove('player--active');
    playerTwo.classList.remove('player--active');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    diceImage.classList.add('hidden');
  }
};

btnRoll.addEventListener('click', function () {
  // Genrate Random Number
  const randomNumber = Math.trunc(Math.random() * 6) + 1;

  // Display Dice Image
  diceImage.src = `/img/dice-${randomNumber}.png`;
  diceImage.classList.remove('hidden');
  if (randomNumber > 1) {
    if (currentPlayer === 1) {
      playerOneCurrentScore += randomNumber;
      playerOneCurrentScoreEl.textContent = playerOneCurrentScore;
    } else {
      playerTwoCurrentScore += randomNumber;
      playerTwoCurrentScoreEl.textContent = playerTwoCurrentScore;
    }
  } else {
    // Reset Current Player Score if Dice Was One
    resetPlayerScore();
  }
});

// Add Player Current Score To Total Score
btnHold.addEventListener('click', function () {
  if (currentPlayer === 1) {
    playerOneTotalScore += playerOneCurrentScore;
    playerOneScoreEl.textContent = playerOneTotalScore;
    playerOneCurrentScore = 0;
    playerOneCurrentScoreEl.textContent = 0;
  } else {
    playerTwoTotalScore += playerTwoCurrentScore;
    playerTwoScoreEl.textContent = playerTwoTotalScore;
    playerTwoCurrentScore = 0;
    playerTwoCurrentScoreEl.textContent = 0;
  }
  switchPlayer();
  IsWinner();
});

// Start New Game
btnNew.addEventListener('click', function () {
  diceImage.classList.add('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  init();
});
