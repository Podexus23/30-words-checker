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

function handleLinkToPage(e: MouseEvent) {
  e.preventDefault();
  const arch = e.target as HTMLAnchorElement;
  const path = arch.getAttribute("href") as string;
  history.pushState({}, "", path);
  renderPage(path);
}

export function runMainPage(state: GlobalState) {
  //render main page and add all listeners
  renderMainPage(renderState[state.source]);
  const addWordForm = document.querySelector(
    ".add-word-form",
  ) as HTMLFormElement;
  const getWordsBtn = document.querySelector(
    ".words_get-btn",
  ) as HTMLButtonElement;

  const gamePageLink = document.querySelector(
    ".header_game-link",
  ) as HTMLAnchorElement;

  window.addEventListener("beforeunload", updateRemoteData);
  gamePageLink.addEventListener("click", handleLinkToPage);
  addWordForm.addEventListener("submit", handleSubmitAddWordForm);
  getWordsBtn.addEventListener("click", handleGetWordsButton);
}

export function removeMainPage() {
  const mainPage = document.querySelector(".main-page") as HTMLElement;
  const addWordForm = document.querySelector(
    ".add-word-form",
  ) as HTMLFormElement;
  const getWordsBtn = document.querySelector(
    ".words_get-btn",
  ) as HTMLButtonElement;
  const gamePageLink = document.querySelector(
    ".header_game-link",
  ) as HTMLAnchorElement;

  gamePageLink.removeEventListener("click", handleLinkToPage);
  addWordForm.removeEventListener("submit", handleSubmitAddWordForm);
  getWordsBtn.removeEventListener("click", handleGetWordsButton);
  window.removeEventListener("beforeunload", updateRemoteData);
  mainPage.remove();
}
