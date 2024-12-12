import { globalState } from "../../main.js";
import { renderDataState } from "../view/renderDataState.view.js";
import { renderMainPage } from "../view/renderMain.view.js";
import { addWordToWordsBlock } from "../view/wordBlock..dom.js";

export async function handleSubmitAddWordForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const dataToSend = JSON.stringify(
    Object.fromEntries(Array.from(data.entries()))
  );
  e.target.reset();
  if (globalState.source === "server")
    renderDataState.server.sendWord(dataToSend);
  if (globalState.source === "storage") {
    renderDataState.storage.sendWord(dataToSend);
  }
}

export async function handleGetWordsButton(e) {
  let data;
  if (globalState.source === "server")
    data = await renderDataState.server.getAllWords();
  if (globalState.source === "storage")
    data = await renderDataState.storage.getAllWords();
  Object.keys(data).forEach((word) => addWordToWordsBlock(word, data));
}

export function runMainPage(state) {
  //render main page and add all listeners
  renderMainPage(state);
  const addWordForm = document.querySelector(".add-word-form");
  const getWordsBtn = document.querySelector(".words_get-btn");

  addWordForm.addEventListener("submit", handleSubmitAddWordForm);
  getWordsBtn.addEventListener("click", handleGetWordsButton);
}
