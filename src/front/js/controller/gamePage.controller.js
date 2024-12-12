import { globalState } from "../../main.js";
import {
  getRandomWordsFromLocalStorage,
  getRandomWordsFromServer,
  searchServerWord,
} from "../model/game.model.js";
import { searchWordLocal } from "../model/storage.model.js";
import {
  removeGameWrapperBlock,
  renderGamePage,
  renderWrapperBlock,
  updateFinalWrapperBlock,
  updateGameWrapperBlock,
} from "../view/renderGame.view.js";
import { updateStateBlock } from "../view/wordBlock..dom.js";

//maybe remove to model of game
const gameState = {
  wordsQuantity: 5,
  playerMoves: 0,
  rightAnswers: 0,
};

function initGameState(state) {
  gameState.wordsQuantity = 5;
  gameState.playerMoves = 0;
  gameState.rightAnswers = 0;
  gameState.source = state.source;
}

export async function startGame(state) {
  const gamePage = document.querySelector(".game-page");
  initGameState(globalState);
  renderWrapperBlock(gamePage);

  let words;
  if (state.source === "server") {
    words = await getRandomWordsFromServer(state.wordsQuantity);
  }
  if (state.source === "storage") {
    words = await getRandomWordsFromLocalStorage(state.wordsQuantity);
  }

  updateGameWrapperBlock(words);
}

export function handleCheckButton(e) {
  const wordCheckBlock = e.target.closest(".game_block");
  const enWord = wordCheckBlock.querySelector(".game_block-word").textContent;
  let wordData;
  if (globalState.source === "server") {
    wordData = searchServerWord(state.wordsQuantity);
  }
  if (globalState.source === "storage") {
    wordData = searchWordLocal(enWord);
  }
  console.log(wordData);
  const inputToCheck = wordCheckBlock.querySelector(".game_block-answer");
  const value = inputToCheck.value;
  if (value === wordData.ru) {
    wordCheckBlock.style.background = `rgb(10,150,50)`;
    wordCheckBlock.dataset.answer = "true";
  } else {
    wordCheckBlock.dataset.answer = "false";
    wordCheckBlock.style.background = `rgb(100,1,1)`;
  }
  inputToCheck.disabled = true;
  e.target.disabled = true;
  this.removeEventListener("click", handleCheckButton);
}

async function handleGamePageClick(e) {
  if (e.target.classList.contains("game-start-btn")) {
    const startGameBtn = document.querySelector(".game-start-btn");
    startGameBtn.disabled = true;
    await startGame(gameState);
  }
  if (e.target.classList.contains("game_block-btn")) {
    const wordBlock = e.target.closest(".game_block");
    if (wordBlock.dataset.answer === "true") gameState.rightAnswers += 1;
    //maybe should be on module
    gameState.playerMoves += 1;
    updateStateBlock(gameState.rightAnswers, gameState.wordsQuantity);
  }
  if (gameState.wordsQuantity <= gameState.playerMoves) {
    //!remove end button
    const endButton = updateFinalWrapperBlock(gameState);

    function restartGame() {
      gameState.playerMoves = 0;
      gameState.rightAnswers = 0;
      removeGameWrapperBlock();
      startGame(gameState);
      endButton.removeEventListener("click", restartGame);
    }

    endButton.addEventListener("click", restartGame);
  }
}

export async function runGamePage(state) {
  renderGamePage(state);
  const gamePage = document.querySelector(".game-page");

  gamePage.addEventListener("click", handleGamePageClick);
}
