'use strict';
/* DOM elements */
import {
  $blockButtons,
  $blockModalRulesContainer,
  $btnCloseModalRules,
  $btnRules,
  $pointCounter,
} from './elements.js';

/* Global variables */
let points = 0;

/* Functions */
/* Generate machine option */
const machinePlays = function () {
  let option = Math.trunc(Math.random() * 3 + 1);
  switch (option) {
    case 1:
      option = 'rock';
      break;
    case 2:
      option = 'paper';
    case 3:
      option = 'scissors';
      break;
  }
  return option;
};

/* play a round */
const playRun = function (optionPlayer, optionMachine) {
  /* console.log(optionPlayer, optionMachine); */

  if (optionPlayer === optionMachine) {
    console.log(`it's a mess`);
  } else if (
    (optionPlayer === 'rock' && optionMachine === 'scissors') ||
    (optionPlayer === 'paper' && optionMachine === 'rock') ||
    (optionPlayer === 'scissors' && optionMachine === 'paper')
  ) {
    console.log(`you win!`);
    points++;
  } else {
    console.log(`you lose!`);
  }
};

/* Event Listeners */

/* Game buttons events */
$blockButtons.addEventListener('click', function (event) {
  /* capture player option */
  const optionPlayer = event.target.classList[1];
  playRun(optionPlayer, machinePlays());
  
  /* update player points */
  $pointCounter.textContent = points;
});

/* Modal rules events */
/* Open */
$btnRules.addEventListener('click', function () {
  $blockModalRulesContainer.style.display = 'grid';
});

/* Close */
$btnCloseModalRules.addEventListener('click', function () {
  $blockModalRulesContainer.style.display = 'none';
});
