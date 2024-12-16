import { runGamePage } from "./js/controller/gamePage.controller.js";
import { runMainPage } from "./js/controller/mainPage.controller.js";
import { SourceType } from "./js/enum.front.js";
import { GlobalState } from "./js/interface.front.js";
import { initInMemory } from "./js/model/wordsData.model.js";

export const globalState: GlobalState = {
  source: SourceType.IndexedDB,
};

await initInMemory(globalState);

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
