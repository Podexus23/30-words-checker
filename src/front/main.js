import { handleAddWordForm } from "./js/add-word-form.handler.js";

//ADD WORD FORM
const addWordForm = document.forms["addWord"];
addWordForm.addEventListener("submit", handleAddWordForm);

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
