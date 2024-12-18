import { runGamePage } from "./js/controller/gamePage.controller";
import { runMainPage } from "./js/controller/mainPage.controller";
import { SourceType } from "./js/enum.front";
import { GlobalState } from "./js/interface.front";
import { initInMemory } from "./js/model/wordsData.model";

export const globalState: GlobalState = {
  source: SourceType.Server,
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
