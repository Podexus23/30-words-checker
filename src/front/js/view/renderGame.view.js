import { createInput, createLink, createTag } from "./createElement.view.js";

const gamePage = document.querySelector(".game-page");

export function createWordBlock(wordData) {
  const wordCheckBlock = createTag({ tagName: "div", className: "game_block" });

  const enWordDiv = createTag({
    tagName: "div",
    className: "game_block-word",
    textContent: wordData.en,
  });

  const ruWordInput = createInput({
    type: "text",
    className: "game_block-answer",
  });

  const answerButton = createTag({
    tagName: "button",
    className: "game_block-btn",
    textContent: "Ok",
  });

  wordCheckBlock.append(enWordDiv);
  wordCheckBlock.append(ruWordInput);
  wordCheckBlock.append(answerButton);

  return wordCheckBlock;
}

export function createStateBlock(countTo) {
  return createTag({
    tagName: "div",
    className: "game_state",
    textContent: `0 / ${countTo}`,
  });
}

export function updateStateBlock(number, countTo) {
  const counterBlock = document.querySelector(".game_state");
  counterBlock.textContent = `${number} / ${countTo}`;
}

function renderAsideBlock(state) {
  const aside = createTag({ tagName: "aside", className: "aside" });
  const optionsBlock = createTag({ tagName: "div", className: "game-options" });
  const srcOptionsBlock = createTag({ tagName: "div", className: "game-src" });
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

  gamePage.append(aside);
  aside.append(optionsBlock);
  optionsBlock.append(srcOptionsBlock);
  srcOptionsBlock.append(serverButton);
  srcOptionsBlock.append(localButton);
}

function renderHeaderBlock(state) {
  const header = createTag({ tagName: "header", className: "header" });
  const heading = createTag({
    tagName: "h1",
    className: "heading-1",
    textContent: "It's just a game, boy!",
  });

  const mainLink = createLink({
    href: `${state?.toMainPageLink || "/"}`,
    textContent: "Welcome back",
    className: "main-link link",
  });

  gamePage.append(header);
  header.append(heading);
  header.append(mainLink);
}

function renderMainBlock(state) {
  const main = createTag({ tagName: "main", className: "game-main" });
  const startButton = createTag({
    tagName: "button",
    className: "game-start-btn btn",
    textContent: "Start Game",
  });

  gamePage.append(main);
  main.append(startButton);
}

export function renderGamePage(state) {
  // ASIDE
  renderAsideBlock(state);
  // HEADER
  renderHeaderBlock(state);
  // MAIN
  renderMainBlock(state);
}

export function renderWrapperBlock(parentNode) {
  const gameWrapper = createTag({ tagName: "div", className: "game-wrapper" });
  parentNode.append(gameWrapper);
}

export function updateGameWrapperBlock(wordsArr) {
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

  const finalBlock = createTag({
    tagName: "div",
    className: "game-final_state",
    textContent: `Your result is ${rightAnswers} out of ${wordsQuantity} words.`,
  });
  const endButton = createTag({
    tagName: "button",
    className: "game-btn_end",
    textContent: "restart",
  });

  gameWrapper.append(finalBlock);
  gameWrapper.append(endButton);
}
