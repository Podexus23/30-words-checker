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
import {
  createValidationMessage,
  removeValidationMessage,
} from "../view/renderMain.view.js";
import { checkRuWordValidation } from "./helper.controller.js";
import { renderPage } from "./router.js";

async function startGame() {
  const gamePage = document.querySelector(".game-page") as HTMLElement;

  const state = initGameState();
  //create block for game words
  renderWrapperBlock(gamePage);

  const words = (await getQuantityOfWords(state.wordsQuantity)) as Word[];

  //add all words inputs
  updateGameWrapperBlock(words);
}

function preventFunc(e: Event) {
  e.preventDefault();
}

function restartGame(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  if (button.classList.contains("game-btn_end")) {
    button.removeEventListener("click", restartGame);
  }
  const gameForms = document.querySelectorAll(".form_word");
  gameForms.forEach((form) => {
    form.removeEventListener("submit", preventFunc);
  });
  removeGameWrapperBlock();
  startGame();
}

function handleAnswerButtonClick(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  //get form and remove action move from submit event from it
  const wordCheckForm = button.closest(".form_word") as HTMLElement;
  wordCheckForm.addEventListener("submit", preventFunc);

  const enWord = wordCheckForm.querySelector(".game_block-word")
    ?.textContent as string;
  const wordData = searchWord(enWord) as Word;

  const inputToCheck = wordCheckForm.querySelector(
    ".game_block-answer",
  ) as HTMLInputElement;
  const value = inputToCheck.value;
  if (!checkRuWordValidation(value) || value == "") {
    removeValidationMessage(wordCheckForm);
    createValidationMessage(
      wordCheckForm,
      "Input must be filled or use russian letters",
    );
    return false;
  }

  if (value === wordData.ru) {
    wordCheckForm.dataset.answer = "true";
    wordCheckForm.style.background = `rgb(10,150,50)`;
  } else {
    wordCheckForm.dataset.answer = "false";
    wordCheckForm.style.background = `rgb(100,1,1)`;
  }

  removeValidationMessage(wordCheckForm);
  inputToCheck.disabled = true;
  button.disabled = true;
  button.removeEventListener("click", handleAnswerButtonClick);
  return true;
}

async function handleGamePageClick(e: MouseEvent) {
  const page = e.target as HTMLElement;

  if (page.classList.contains("game-start-btn")) {
    const { onGame } = getGameState();
    if (!onGame) {
      await startGame();
      updateGameState("onGame", 1);
    } else restartGame(e);
  } else if (page.classList.contains("game_block-btn")) {
    //if there is wrong validation, prevent click to count to the game state
    if (!handleAnswerButtonClick(e)) return;

    const wordBlock = page.closest(".form_word") as HTMLElement;

    if (wordBlock.dataset.answer === "true") updateGameState("rightAnswers", 1);
    updateGameState("playerMoves", 1);

    const gameState = getGameState();
    updateStateBlock(gameState.rightAnswers, gameState.wordsQuantity);
  }
  if (checkEndGame()) {
    const gameState = getGameState();
    let endButton = document.querySelector(
      ".game-btn_end",
    ) as HTMLButtonElement;
    if (!endButton) {
      updateFinalWrapperBlock(gameState);
      endButton = document.querySelector(".game-btn_end") as HTMLButtonElement;
      endButton.addEventListener("click", restartGame);
    }
  }
}

function handleLinkToPage(e: MouseEvent) {
  e.preventDefault();
  const arch = e.target as HTMLAnchorElement;
  const path = arch.getAttribute("href") as string;
  history.pushState({}, "", path);
  renderPage(path);
}

export async function runGamePage(state: GlobalState) {
  renderGamePage(renderState[state.source]);
  const gamePage = document.querySelector(".game-page") as HTMLElement;
  const mainPageLink = document.querySelector(
    ".main-link",
  ) as HTMLAnchorElement;

  mainPageLink.addEventListener("click", handleLinkToPage);
  gamePage.addEventListener("click", handleGamePageClick);
}

//!somehow should remove all listeners on answers if there is open ones(like on change page or smth)
export function removeGamePage() {
  const gamePage = document.querySelector(".game-page") as HTMLButtonElement;

  const mainPageLink = document.querySelector(
    ".main-link",
  ) as HTMLAnchorElement;
  const gameForms = document.querySelectorAll(".form_word");
  gameForms.forEach((form) => {
    form.removeEventListener("submit", preventFunc);
  });
  mainPageLink.removeEventListener("click", handleLinkToPage);
  gamePage.removeEventListener("click", handleGamePageClick);
  gamePage.remove();
}
