import { globalState } from "../../main.js";
import { searchWord } from "../model/wordsData.model.js";
import {
  removeGameWrapperBlock,
  renderGamePage,
  renderWrapperBlock,
  updateFinalWrapperBlock,
  updateGameWrapperBlock,
  updateStateBlock,
} from "../view/renderGame.view.js";
import { renderState } from "./state.controller.js";

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

async function startGame(state) {
  const gamePage = document.querySelector(".game-page");

  initGameState(globalState);
  //create block wor game words
  renderWrapperBlock(gamePage);

  let words;
  if (state.source === "server") {
    words = await getRandomWordsFromServer(state.wordsQuantity);
  }
  if (state.source === "storage") {
    words = await getRandomWordsFromLocalStorage(state.wordsQuantity);
  }

  //add all words inputs
  updateGameWrapperBlock(words);
}

function restartGame() {
  this.removeEventListener("click", restartGame);
  removeGameWrapperBlock();
  startGame(gameState);
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
    //render?
    const startGameBtn = document.querySelector(".game-start-btn");
    startGameBtn.disabled = true;

    await startGame(gameState);
  }
  if (e.target.classList.contains("game_block-btn")) {
    handleAnswerButtonClick(e);
    const wordBlock = e.target.closest(".game_block");
    //maybe should be on module
    if (wordBlock.dataset.answer === "true") gameState.rightAnswers += 1;
    gameState.playerMoves += 1;

    updateStateBlock(gameState.rightAnswers, gameState.wordsQuantity);
  }
  if (gameState.wordsQuantity <= gameState.playerMoves) {
    updateFinalWrapperBlock(gameState);

    const endButton = document.querySelector(".game-btn_end");
    endButton.addEventListener("click", restartGame);
  }
}

function handleGameOptions(e) {
  if (e.target.classList.contains("game-src_btn")) {
    const btn = e.target;

    if (btn.dataset.src === "server") {
      gameState.source = "server";
      //if server, send request to server if it answers, ok
      //else tell to chose localStorage or add words by your self
      console.log("hi server");
    }

    if (btn.dataset.src === "storage") {
      gameState.source = "storage";
    }
  }
}

export async function runGamePage(state) {
  renderGamePage(renderState[state.source]);

  const gamePage = document.querySelector(".game-page");
  gamePage.addEventListener("click", handleGamePageClick);

  const gameOptBlock = document.querySelector(".game-src");
  gameOptBlock.addEventListener("click", handleGameOptions);
}
