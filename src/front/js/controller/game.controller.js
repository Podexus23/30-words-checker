import { globalState } from "../../main.js";
import {
  getRandomWordsFromLocalStorage,
  getRandomWordsFromServer,
  searchServerWord,
} from "../model/game.model.js";
import { searchWordLocal } from "../model/storage.model.js";
import {
  renderWrapperBlock,
  updateForGameWrapperBlock,
} from "../view/renderGame.view.js";

export async function startGame(state, parent) {
  renderWrapperBlock(parent);
  let words;
  if (state.source === "server") {
    words = await getRandomWordsFromServer(state.wordsQuantity);
  }
  if (state.source === "storage") {
    words = await getRandomWordsFromLocalStorage(state.wordsQuantity);
  }
  updateForGameWrapperBlock(words);
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
