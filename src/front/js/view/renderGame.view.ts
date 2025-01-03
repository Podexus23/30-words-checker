import { PageRenderState } from "../enum.front.js";
import { Word } from "../interface.front.js";
import {
  createForm,
  createInput,
  createLink,
  createTag,
} from "./createElement.view.js";

const rootBlock = document.getElementById("root") as HTMLElement;

export function createWordBlock(wordData: Word) {
  const wordCheckBlock = createForm({
    autocomplete: "off",
    name: `word-${wordData.en}`,
    className: `form_word form_word-${wordData.en}`,
    action: "",
  });

  const enWordLabel = createTag({
    tagName: "label",
    className: "game_block-word",
    textContent: wordData.en,
  }) as HTMLLabelElement;

  enWordLabel.setAttribute("for", `word-${wordData.en}`);

  const ruWordInput = createInput({
    type: "text",
    className: "game_block-answer",
  });

  ruWordInput.id = `word-${wordData.en}`;

  const answerButton = createTag({
    tagName: "button",
    className: "game_block-btn",
    textContent: "Ok",
  });

  wordCheckBlock.append(enWordLabel);
  wordCheckBlock.append(ruWordInput);
  wordCheckBlock.append(answerButton);

  return wordCheckBlock;
}

export function createStateBlock(countTo: number) {
  return createTag({
    tagName: "div",
    className: "game_state",
    textContent: `0 / ${countTo}`,
  });
}

export function updateStateBlock(number: number, countTo: number) {
  const counterBlock = document.querySelector(".game_state") as HTMLElement;
  counterBlock.textContent = `${number} / ${countTo}`;
}

function renderAsideBlock(mainBlock: HTMLElement) {
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

  mainBlock.append(aside);
  aside.append(optionsBlock);
  optionsBlock.append(srcOptionsBlock);
  srcOptionsBlock.append(serverButton);
  srcOptionsBlock.append(localButton);
}

function renderHeaderBlock(state: PageRenderState, mainBlock: HTMLElement) {
  const header = createTag({ tagName: "header", className: "header" });
  const heading = createTag({
    tagName: "h1",
    className: "heading-1",
    textContent: "It's just a game, boy!",
  });

  const mainLink = createLink({
    href: `${state.toMainPageLink || "/"}`,
    textContent: "Welcome back",
    className: "main-link link",
  });

  mainBlock.append(header);
  header.append(heading);
  header.append(mainLink);
}

function renderMainBlock(mainBlock: HTMLElement) {
  const main = createTag({ tagName: "main", className: "game-main" });
  const startButton = createTag({
    tagName: "button",
    className: "game-start-btn btn",
    textContent: "Start Game",
  });

  mainBlock.append(main);
  main.append(startButton);
}

export function renderGamePage(state: PageRenderState) {
  const gamePage = createTag({ tagName: "div", className: "game-page" });
  rootBlock.append(gamePage);
  // ASIDE
  renderAsideBlock(gamePage);
  // HEADER
  renderHeaderBlock(state, gamePage);
  // MAIN
  renderMainBlock(gamePage);
}

export function renderWrapperBlock(parentNode: HTMLElement) {
  const gameWrapper = createTag({ tagName: "div", className: "game-wrapper" });
  parentNode.append(gameWrapper);
}

export function updateGameWrapperBlock(wordsArr: Word[]) {
  const gameWrapper = document.querySelector(".game-wrapper") as HTMLElement;
  wordsArr.forEach((word) => {
    gameWrapper.append(createWordBlock(word));
  });
  gameWrapper.append(createStateBlock(wordsArr.length));
}

export function removeGameWrapperBlock() {
  const gameWrapper = document.querySelector(".game-wrapper") as HTMLElement;
  gameWrapper.remove();
}

export function updateFinalWrapperBlock({
  rightAnswers,
  wordsQuantity,
}: {
  rightAnswers: number;
  wordsQuantity: number;
}) {
  const gameWrapper = document.querySelector(".game-wrapper") as HTMLElement;

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
