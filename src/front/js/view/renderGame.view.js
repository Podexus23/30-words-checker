import { createLink, createTag } from "./elements.dom.js";
import { renderDataState } from "./renderDataState.view.js";
import { createStateBlock, createWordBlock } from "./wordBlock..dom.js";

export function renderGamePage(state) {
  //ASIDE
  const gamePage = document.querySelector(".game-page");
  const aside = createTag({ tagName: "aside", className: "aside" });
  gamePage.append(aside);
  const optionsBlock = createTag({ tagName: "div", className: "game-options" });
  aside.append(optionsBlock);
  const srcOptionsBlock = createTag({ tagName: "div", className: "game-src" });
  optionsBlock.append(srcOptionsBlock);
  const serverButton = createTag({
    tagName: "button",
    className: "game-src_btn btn",
    textContent: "Server",
  });
  serverButton.dataset.src = "server";
  const localButton = createTag({
    tagName: "button",
    className: "game-src_btn btn",
    textContent: "LocalStorage",
  });
  localButton.dataset.src = "storage";
  srcOptionsBlock.append(serverButton);
  srcOptionsBlock.append(localButton);

  //header
  const header = createTag({ tagName: "header", className: "header" });
  gamePage.append(header);
  const heading = createTag({
    tagName: "h1",
    className: "heading-1",
    textContent: "It's just a game, boy!",
  });
  header.append(heading);
  const mainLink = createLink({
    href: `${renderDataState[state.source].toMainPageLink}`,
    textContent: "Welcome back",
    className: "main-link link",
  });
  header.append(mainLink);

  //main
  const main = createTag({ tagName: "main", className: "game-main" });
  gamePage.append(main);
  const startButton = createTag({
    tagName: "button",
    className: "game-start-btn btn",
    textContent: "Start Game",
  });
  main.append(startButton);
}

export function renderWrapperBlock(parentNode) {
  const gameWrapper = createTag({ tagName: "div", className: "game-wrapper" });
  parentNode.append(gameWrapper);
}

export function updateForGameWrapperBlock(wordsArr) {
  console.log(wordsArr);
  const gameWrapper = document.querySelector(".game-wrapper");
  wordsArr.forEach((word) => {
    gameWrapper.append(createWordBlock(word));
  });
  gameWrapper.append(createStateBlock(wordsArr.length));
}

export function removeGameWrapperBlock() {
  const gameWrapper = document.querySelector(".game-wrapper");
  gameWrapper.remove();
}

export function updateFinalWrapperBlock({ rightAnswers, wordsQuantity }) {
  const gameWrapper = document.querySelector(".game-wrapper");
  const finalBlock = document.createElement("div");
  finalBlock.textContent = `Your result is ${rightAnswers} out of ${wordsQuantity} words.`;
  const endButton = document.createElement("button");
  endButton.className = "game-btn_end";
  endButton.textContent = "restart";

  gameWrapper.append(finalBlock);
  gameWrapper.append(endButton);

  //!убрать!
  return endButton;
}
