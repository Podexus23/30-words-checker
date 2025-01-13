import { renderState, SourceType } from "../enum.front.js";
import { GlobalState } from "../interface.front.js";
import {
  addWord,
  getAllWords,
  updateRemoteData,
} from "../model/wordsData.model.js";
import {
  addWordToWordsBlock,
  cleanAllWordsBlock,
  createValidationMessage,
  removeValidationMessage,
  renderMainPage,
} from "../view/renderMain.view.js";
import {
  checkEmptyInputs,
  checkEnWordValidation,
  checkRuWordValidation,
} from "./helper.controller.js";
import { renderPage } from "./router.js";

export async function handleSubmitAddWordForm(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  //! move to view
  const formMsg = form.querySelector(".validation-message") as HTMLElement;
  if (formMsg) removeValidationMessage(formMsg);

  if (!form.checkValidity()) {
    console.log(`sorry bro smth went wrong`);
    createValidationMessage(form, "Wrong inputs");
  } else if (checkEmptyInputs(form)) {
    createValidationMessage(form, "Both inputs must be filled");
  } else {
    const data = new FormData(form);
    const wordToSend = JSON.stringify(
      Object.fromEntries(Array.from(data.entries())),
    );
    createValidationMessage(form, "Word is added to DB", "green");
    form.reset();

    addWord(wordToSend);
    //! workaround but ok
    if (SourceType.GoogleDrive) {
      updateRemoteData();
    }
  }
}

export async function handleGetWordsButton() {
  const data = getAllWords();
  cleanAllWordsBlock();
  Object.keys(data).forEach((word) => addWordToWordsBlock(word, data));
}

function handleLinkToPage(e: MouseEvent) {
  e.preventDefault();
  const arch = e.target as HTMLAnchorElement;
  const path = arch.getAttribute("href") as string;
  history.pushState({}, "", path);
  renderPage(path);
}

function handleEnInputValidation(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!checkEnWordValidation(input.value) && input.value !== "") {
    input.setCustomValidity("Only English letters are allowed.");
    input.classList.add("invalid");
  } else {
    input.setCustomValidity(""); // Clear the error
    input.classList.remove("invalid");
  }
}
function handleRuInputValidation(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!checkRuWordValidation(input.value) && input.value !== "") {
    input.setCustomValidity("Only Russian letters are allowed.");
    input.classList.add("invalid");
  } else {
    input.setCustomValidity(""); // Clear the error
    input.classList.remove("invalid");
  }
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
  const enWordInput = document.querySelector("#en_word") as HTMLInputElement;
  const ruWordInput = document.querySelector("#ru_word") as HTMLInputElement;

  enWordInput.addEventListener("input", handleEnInputValidation);
  ruWordInput.addEventListener("paste", handleRuInputValidation);

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
