import { handleSubmitAddWordForm } from "./js/add-word-form.handler.js";

//ADD WORD FORM
const isMainPage = document.querySelector(".main-page");

if (isMainPage) {
  const addWordForm = document.forms["addWord"];
  addWordForm.addEventListener("submit", handleSubmitAddWordForm);

  const headerBlock = document.querySelector(".header");
  const newDiv = document.createElement("div");
  newDiv.textContent = "hello neighbor";
  headerBlock.append(newDiv);

  const buttonWords = document.querySelector(".words_get-btn");
  const allWordsBlock = document.querySelector(".words_all");
  buttonWords.addEventListener("click", async (e) => {
    const getData = await fetch("/data");
    const data = await getData.json();

    Object.keys(data).forEach((word) => {
      const wordBlock = document.createElement("div");
      wordBlock.textContent = `${data[word].en} - ${data[word].ru}`;
      allWordsBlock.append(wordBlock);
    });
  });
}

// GAME

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const isGamePage = document.querySelector(".game-page");
if (isGamePage) {
  const startGameBtn = document.querySelector(".game-start-btn");
  const gameBlock = document.querySelector(".game");
  let answerCounter = 0;

  function createWordBlock(wordData) {
    console.log(wordData);
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
        answerCounter += 1;
      } else {
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

  async function startGame(data) {
    const wordData = data;
    answerCounter = 0;
    // startGameBtn.disabled = true;
    gameBlock.append(createWordBlock(wordData));
  }

  startGameBtn.addEventListener("click", async (e) => {
    //getting data from server
    let data = Object.values(
      await (await fetch("/data", { method: "get" })).json()
    );
    startGame(data[getRandom(0, data.length - 1)]);
  });
}
