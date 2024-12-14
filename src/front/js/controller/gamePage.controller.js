import { getQuantityOfWords, searchWord } from "../model/wordsData.model.js";
import {
  checkEndGame,
  getGameState,
  initGameState,
  updateGameState,
} from "../model/wordsGame.model.js";
import {
  removeGameWrapperBlock,
  renderGamePage,
  renderWrapperBlock,
  updateFinalWrapperBlock,
  updateGameWrapperBlock,
  updateStateBlock,
} from "../view/renderGame.view.js";
import { renderState } from "./state.controller.js";

async function startGame() {
  const gamePage = document.querySelector(".game-page");

  const state = initGameState();
  //create block wor game words
  renderWrapperBlock(gamePage);

  let words = await getQuantityOfWords(state.wordsQuantity);

  //add all words inputs
  updateGameWrapperBlock(words);
}

function restartGame() {
  this.removeEventListener("click", restartGame);
  removeGameWrapperBlock();
  startGame();
}

function handleAnswerButtonClick(e) {
  const wordCheckBlock = e.target.closest(".game_block");
  const enWord = wordCheckBlock.querySelector(".game_block-word").textContent;
  let wordData = searchWord(enWord);

  const inputToCheck = wordCheckBlock.querySelector(".game_block-answer");
  const value = inputToCheck.value;

  if (value === wordData.ru) {
    wordCheckBlock.dataset.answer = "true";
    wordCheckBlock.style.background = `rgb(10,150,50)`;
  } else {
    wordCheckBlock.dataset.answer = "false";
    wordCheckBlock.style.background = `rgb(100,1,1)`;
  }
  inputToCheck.disabled = true;
  e.target.disabled = true;
  e.target.removeEventListener("click", handleAnswerButtonClick);
}

async function handleGamePageClick(e) {
  if (e.target.classList.contains("game-start-btn")) {
    await startGame();
  }
  if (e.target.classList.contains("game_block-btn")) {
    handleAnswerButtonClick(e);
    const wordBlock = e.target.closest(".game_block");
    if (wordBlock.dataset.answer === "true") {
      updateGameState("rightAnswers", 1);
    }
    updateGameState("playerMoves", 1);

    const gameState = getGameState();
    updateStateBlock(gameState.rightAnswers, gameState.wordsQuantity);
  }
  if (checkEndGame()) {
    const gameState = getGameState();
    updateFinalWrapperBlock(gameState);

    const endButton = document.querySelector(".game-btn_end");
    endButton.addEventListener("click", restartGame);
  }
}

export async function runGamePage(state) {
  renderGamePage(renderState[state.source]);

  const gamePage = document.querySelector(".game-page");
  gamePage.addEventListener("click", handleGamePageClick);
}
