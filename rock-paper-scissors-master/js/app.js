'use strict';
/* DOM elements */
import {
  $containerButtons,
  $containerModalRules,
  $elBtnCloseModalRules,
  $elBtnRules,
  $elPointCounter
} from './elements.js';

/* Global variables */
let points = 0;

/* Functions */
/* Generate machine option */
const machinePlays = function () {
  const options = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  const option = options[randomIndex];
  return option;
};

/* Checks if optionPlayer is equal to the option that beats optionMachine */
const isPlayerWinner = function (optionPlayer, optionMachine) {
  const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return winConditions[optionPlayer] === optionMachine;
};

/* play a round */
const playRun = function (optionPlayer, optionMachine) {
  /* console.log(optionPlayer, optionMachine); */

  if (optionPlayer === optionMachine) {
    console.log(`It's a tie.`);
  } else if (isPlayerWinner(optionPlayer, optionMachine)) {
    console.log(`You win!`);
    points++;
  } else {
    console.log(`You lose!`);
  }
};

/* Event Listeners */

/* Game buttons events */
$containerButtons.addEventListener('click', function (event) {
  /* capture player option */
  const optionPlayer = event.target.classList[1]; // rock || paper || scissors
  const machineOption = machinePlays();

  playRun(optionPlayer, machineOption);
  /* update player points */
  $elPointCounter.textContent = points;
});

/* Modal rules events */
/* Open */
$elBtnRules.addEventListener('click', function () {
  $containerModalRules.style.display = 'grid';
});

/* Close */
$elBtnCloseModalRules.addEventListener('click', function () {
  $containerModalRules.style.display = 'none';
});
