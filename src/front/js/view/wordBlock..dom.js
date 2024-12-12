// import { handleCheckButton } from "../controller/gamePage.controller.js";
import { createInput, createTag } from "./createElement.view.js";

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

export function addWordToWordsBlock(word, data) {
  const wordBlock = createTag({
    tagName: "div",
    className: "words_all-word",
    textContent: `${data[word].en} - ${data[word].ru}`,
  });

  const allWordsBlock = document.querySelector(".words_all");
  allWordsBlock.append(wordBlock);
}
