import { handleSubmitAddWordForm } from "./js/add-word-form.handler.js";
import {
  createCounterBlock,
  createWordBlock,
  updateCounterBlock,
} from "./js/view/wordBlock..dom.js";

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

function generateRandomWords(wordsArr, quantity = 5) {
  if (quantity > wordsArr.length) {
    console.error(
      `generateRandomWords: to much to words add, try less than ${wordsArr.length}`
    );
    return;
  }

  const chosenWords = [];
  for (let i = 0; i < quantity; i++) {
    let newWord = wordsArr[getRandom(0, wordsArr.length - 1)];

    let chosenMap = chosenWords.map((e) => e.en);
    if (!chosenMap.includes(newWord.en)) chosenWords.push(newWord);
    else i--;
  }
  return chosenWords;
}

const isGamePage = document.querySelector(".game-page");

export const gameState = {
  wordsQuantity: 5,
  playerMoves: 0,
  rightAnswers: 0,
};

if (isGamePage) {
  const startGameBtn = document.querySelector(".game-start-btn");
  const gameBlock = document.querySelector(".game");

  async function startGame() {
    let data = Object.values(
      await (await fetch("/data", { method: "get" })).json()
    );

    const words = generateRandomWords(data, gameState.wordsQuantity);

    words.forEach((word) => {
      gameBlock.append(createWordBlock(word, updateCounterBlock));
    });
    gameBlock.append(createCounterBlock(gameState.wordsQuantity));
  }

  async function handleStartGameBtn(event) {
    startGame();
  }

  startGameBtn.addEventListener("click", handleStartGameBtn);
}
