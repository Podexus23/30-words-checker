import { renderState } from "../enum.front";
import { GlobalState } from "../interface.front";
import {
  addWord,
  getAllWords,
  updateRemoteData,
} from "../model/wordsData.model";
import { addWordToWordsBlock, renderMainPage } from "../view/renderMain.view";

export async function handleSubmitAddWordForm(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const wordToSend = JSON.stringify(
    Object.fromEntries(Array.from(data.entries())),
  );
  form.reset();
  addWord(wordToSend);
}

export async function handleGetWordsButton() {
  const data = getAllWords();
  Object.keys(data).forEach((word) => addWordToWordsBlock(word, data));
}

export function runMainPage(state: GlobalState) {
  //render main page and add all listeners
  renderMainPage(renderState[state.source]);
  window.addEventListener("beforeunload", () => {
    updateRemoteData(state);
  });
  const addWordForm = document.querySelector(
    ".add-word-form",
  ) as HTMLFormElement;
  const getWordsBtn = document.querySelector(
    ".words_get-btn",
  ) as HTMLButtonElement;

  addWordForm.addEventListener("submit", handleSubmitAddWordForm);
  getWordsBtn.addEventListener("click", handleGetWordsButton);
}
