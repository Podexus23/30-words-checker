import { runGamePage } from "./js/controller/gamePage.controller.js";
import { runMainPage } from "./js/controller/mainPage.controller.js";

export const globalState = {
  source: "storage",
  // source: "indexedDB",
  // source: "server",
};

//ADD WORD FORM
const isMainPage = document.querySelector(".main-page");
if (isMainPage) {
  runMainPage(globalState);
}

// GAME

const isGamePage = document.querySelector(".game-page");
if (isGamePage) {
  runGamePage(globalState);
}
