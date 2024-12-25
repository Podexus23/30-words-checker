import { renderState } from "../enum.front.js";
import { GlobalState } from "../interface.front.js";
import {
  addWord,
  getAllWords,
  updateRemoteData,
} from "../model/wordsData.model.js";
import {
  addWordToWordsBlock,
  renderMainPage,
} from "../view/renderMain.view.js";
import { renderPage } from "./router.js";

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

  const gamePageLink = document.querySelector(
    ".header_game-link",
  ) as HTMLAnchorElement;

  gamePageLink.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    const arch = e.target as HTMLAnchorElement;
    const path = arch.getAttribute("href") as string;
    history.pushState({}, "", path);
    console.log(`hi`);
    renderPage(path);
  });
  addWordForm.addEventListener("submit", handleSubmitAddWordForm);
  getWordsBtn.addEventListener("click", handleGetWordsButton);
}

export function removeMainPage() {}
