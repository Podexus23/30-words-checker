import { runGamePage } from "./js/controller/gamePage.controller.js";
import { runMainPage } from "./js/controller/mainPage.controller.js";
import { SourceType } from "./js/enum.front.js";
import { GlobalState } from "./js/interface.front.js";
import { initInMemory } from "./js/model/wordsData.model.js";
import { createTag } from "./js/view/createElement.view.js";

export const globalState: GlobalState = {
  source: SourceType.IndexedDB,
};

const routes = {
  "/": () => runMainPage(globalState),
  "/game": () => runGamePage(globalState),
};

await initInMemory(globalState);
const rootBlock = createTag({ tagName: "div", className: "root" });
rootBlock.id = "root";
document.body.append(rootBlock);

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
