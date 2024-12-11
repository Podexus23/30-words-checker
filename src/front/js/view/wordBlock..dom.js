import { handleCheckButton } from "../controller/game.controller.js";

export function createWordBlock(wordData) {
  const wordCheckBlock = document.createElement("div");
  wordCheckBlock.className = `game_block`;

  const enWordDiv = document.createElement("div");
  enWordDiv.className = `game_block-word`;
  enWordDiv.textContent = wordData.en;

  const ruWordInput = document.createElement("input");
  ruWordInput.type = "text";
  ruWordInput.className = "game_block-answer";

  const answerButton = document.createElement("button");
  answerButton.className = "game_block-btn";
  answerButton.textContent = "Ok";

  answerButton.addEventListener("click", handleCheckButton);

  wordCheckBlock.append(enWordDiv);
  wordCheckBlock.append(ruWordInput);
  wordCheckBlock.append(answerButton);

  return wordCheckBlock;
}

export function createStateBlock(countTo) {
  const wrapper = document.createElement("div");
  wrapper.className = "game_state";

  wrapper.textContent = `0 / ${countTo}`;
  return wrapper;
}

export function updateStateBlock(number, countTo) {
  const counterBlock = document.querySelector(".game_state");
  counterBlock.textContent = `${number} / ${countTo}`;
}

export function addWordToWordsBlock(word, data) {
  const wordBlock = document.createElement("div");
  wordBlock.textContent = `${data[word].en} - ${data[word].ru}`;

  const allWordsBlock = document.querySelector(".words_all");
  allWordsBlock.append(wordBlock);
}
