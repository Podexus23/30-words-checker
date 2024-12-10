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

  function handleCheckButton(e) {
    const inputToCheck = wordCheckBlock.querySelector(".game_block-answer");
    const value = inputToCheck.value;
    if (value === wordData.ru) {
      wordCheckBlock.style.background = `rgb(10,150,50)`;
      wordCheckBlock.dataset.answer = "true";
    } else {
      wordCheckBlock.dataset.answer = "false";
      wordCheckBlock.style.background = `rgb(100,1,1)`;
    }
    inputToCheck.disabled = true;
    e.target.disabled = true;

    answerButton.removeEventListener("click", handleCheckButton);
  }

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
