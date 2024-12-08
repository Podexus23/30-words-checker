import { gameState } from "../../main.js";

export function createWordBlock(wordData, updater) {
  const wordCheckBlock = document.createElement("div");
  wordCheckBlock.className = `game_block`;

  const enWordDiv = document.createElement("div");
  enWordDiv.className = `game_block-word`;
  enWordDiv.textContent = wordData.en;

  const ruWordInput = document.createElement("input");
  ruWordInput.type = "text";
  ruWordInput.className = "game_block-answer";

  const answerButton = document.createElement("button");
  answerButton.textContent = "Ok";

  function handleCheckButton(e) {
    const inputToCheck = wordCheckBlock.querySelector(".game_block-answer");
    const value = inputToCheck.value;
    if (value === wordData.ru) {
      wordCheckBlock.style.background = `rgb(10,150,50)`;
      gameState.rightAnswers += 1;
    } else {
      wordCheckBlock.style.background = `rgb(100,1,1)`;
    }
    inputToCheck.disabled = true;
    e.target.disabled = true;
    gameState.playerMoves++;
    updater(gameState.rightAnswers, gameState.wordsQuantity);

    answerButton.removeEventListener("click", handleCheckButton);
  }

  answerButton.addEventListener("click", handleCheckButton);

  wordCheckBlock.append(enWordDiv);
  wordCheckBlock.append(ruWordInput);
  wordCheckBlock.append(answerButton);

  return wordCheckBlock;
}

export function createCounterBlock(countTo) {
  const wrapper = document.createElement("div");
  wrapper.className = "game_state";

  wrapper.textContent = `0 / ${countTo}`;
  return wrapper;
}

export function updateCounterBlock(number, countTo) {
  const counterBlock = document.querySelector(".game_state");
  counterBlock.textContent = `${number} / ${countTo}`;
}
