import { renderState } from "../enum.front.js";
import { GlobalState, Word } from "../interface.front.js";
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

async function startGame() {
  const gamePage = document.querySelector(".game-page") as HTMLElement;

  const state = initGameState();
  //create block wor game words
  renderWrapperBlock(gamePage);

  const words = (await getQuantityOfWords(state.wordsQuantity)) as Word[];

  //add all words inputs
  updateGameWrapperBlock(words);
}

function restartGame(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  button.removeEventListener("click", restartGame);
  removeGameWrapperBlock();
  startGame();
}

function handleAnswerButtonClick(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  const wordCheckBlock = button.closest(".game_block") as HTMLElement;
  const enWord = wordCheckBlock.querySelector(
    ".game_block-word",
  ) as HTMLElement;
  const enWordText = enWord.textContent as string;
  const wordData = searchWord(enWordText) as Word;

  const inputToCheck = wordCheckBlock.querySelector(
    ".game_block-answer",
  ) as HTMLInputElement;
  const value = inputToCheck.value;

  if (value === wordData.ru) {
    wordCheckBlock.dataset.answer = "true";
    wordCheckBlock.style.background = `rgb(10,150,50)`;
  } else {
    wordCheckBlock.dataset.answer = "false";
    wordCheckBlock.style.background = `rgb(100,1,1)`;
  }
  inputToCheck.disabled = true;
  button.disabled = true;
  button.removeEventListener("click", handleAnswerButtonClick);
}

async function handleGamePageClick(e: MouseEvent) {
  const page = e.target as HTMLElement;
  if (page.classList.contains("game-start-btn")) {
    await startGame();
  }
  if (page.classList.contains("game_block-btn")) {
    handleAnswerButtonClick(e);
    const wordBlock = page.closest(".game_block") as HTMLElement;
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

    const endButton = document.querySelector(
      ".game-btn_end",
    ) as HTMLButtonElement;
    endButton.addEventListener("click", restartGame);
  }
}

export async function runGamePage(state: GlobalState) {
  renderGamePage(renderState[state.source]);

  const gamePage = document.querySelector(".game-page") as HTMLButtonElement;
  gamePage.addEventListener("click", handleGamePageClick);
}
