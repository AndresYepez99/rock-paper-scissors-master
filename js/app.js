/* 'use strict';
/* DOM elements */
import {
  $containerButtons,
  $containerModalRules,
  $elBtnCloseModalRules,
  $elBtnRules,
  $elBtnPlayAgain,
  $elPointCounter,
  $elTxtResult,
  $elModalRules,
  $itemsArrayElementsHidden,
  $itemsArrayButtons
} from './elements.js';

const itemsArrayElementsHidden = [...$itemsArrayElementsHidden];
const itemsArrayButtons = [...$itemsArrayButtons];

/* Global variables */
let points = 0;
let optionPlayer;
let optionMachine;
let buttonPlayTemp;

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
    return `It's a tie`;
  } else if (isPlayerWinner(optionPlayer, optionMachine)) {
    points++;
    return `You win!`;
  } else {
    return `You lose!`;
  }
};

const switchLayoutStyles = function (element) {
  element.classList.toggle('buttons');
  element.classList.toggle('buttons-container-temp-styles');
};

const showOrHideElements = function (elements) {
  elements.forEach(element => {
    element.classList.toggle('hidden');
  });
};

const addClassBasedOnCondition = function (
  buttons,
  optionPlayer,
  optionMachine
) {
  buttons.forEach(button => {
    button.classList.toggle(
      button.classList.contains(optionPlayer) ||
        button.classList.contains(optionMachine)
        ? 'button-play-temp-style'
        : 'button-play-hidden'
    );
    if (button.classList.contains(optionPlayer)) {
      button.classList.toggle('option-player');
    }
  });
};

const addTieButton = function (resultPlayRun, $container, optionPlayer) {
  if (resultPlayRun === `It's a tie`) {
    buttonPlayTemp = document.createElement('button');
    buttonPlayTemp.classList.add(
      'btn-play',
      optionPlayer,
      'button-play-temp-style'
    );
    $container.appendChild(buttonPlayTemp);
  }
};

/* Event Listeners */
/* Game buttons events */
$containerButtons.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-play')) {
    
    /* capture player option */
    optionPlayer = event.target.classList[1];
    optionMachine = machinePlays();
    const resultPlayRun = playRun(optionPlayer, optionMachine);
    console.log(optionPlayer, optionMachine);

    switchLayoutStyles($containerButtons);
    addClassBasedOnCondition(itemsArrayButtons, optionPlayer, optionMachine);
    showOrHideElements(itemsArrayElementsHidden);
    addTieButton(resultPlayRun, $containerButtons, optionPlayer);

    /* update player points */
    $elTxtResult.textContent = resultPlayRun;
    $elPointCounter.textContent = points;
  }
});

/* Button play again */
$elBtnPlayAgain.addEventListener('click', function () {
  switchLayoutStyles($containerButtons);
  addClassBasedOnCondition(itemsArrayButtons, optionPlayer, optionMachine);
  showOrHideElements($itemsArrayElementsHidden);
  if (buttonPlayTemp) {
    buttonPlayTemp.remove();
  }
});

/* Modal rules events */
function toggleModal(isMobile) {
  if (isMobile) {
    $containerModalRules.classList.toggle('open-modal-mobile');
  } else {
    $containerModalRules.classList.toggle('open-modal-desktop');
    $elModalRules.classList.toggle('modal-rules-animation-desktop');
  }
}
/* Open modal */
$elBtnRules.addEventListener('click', function () {
  const isMobile = window.matchMedia('(max-width: 390px)').matches;
  toggleModal(isMobile);
});

/* Close modal*/
$elBtnCloseModalRules.addEventListener('click', function () {
  const isMobile = window.matchMedia('(max-width: 390px)').matches;
  toggleModal(isMobile);
});


