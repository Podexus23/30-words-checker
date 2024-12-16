import {
  addWord,
  getAllWords,
  updateRemoteData,
} from "../model/wordsData.model.js";
import {
  addWordToWordsBlock,
  renderMainPage,
} from "../view/renderMain.view.js";
import { renderState } from "./state.controller.js";

export async function handleSubmitAddWordForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const wordToSend = JSON.stringify(
    Object.fromEntries(Array.from(data.entries())),
  );
  e.target.reset();
  addWord(wordToSend);
}

export async function handleGetWordsButton(e) {
  let data = getAllWords();
  Object.keys(data).forEach((word) => addWordToWordsBlock(word, data));
}

export function runMainPage(state) {
  //render main page and add all listeners
  renderMainPage(renderState[state.source]);
  window.addEventListener("beforeunload", (e) => {
    updateRemoteData(state);
  });
  const addWordForm = document.querySelector(".add-word-form");
  const getWordsBtn = document.querySelector(".words_get-btn");

  addWordForm.addEventListener("submit", handleSubmitAddWordForm);
  getWordsBtn.addEventListener("click", handleGetWordsButton);
}
