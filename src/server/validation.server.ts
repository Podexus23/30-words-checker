import { IDBWords, Word } from "./interface.server.js";

const englishWord = /^[a-zA-Z]+$/;
const russianWord = /^[а-яА-ЯёЁ]+$/;

export function checkEnWordValidation(word: string) {
  if (englishWord.test(word)) return true;
  return false;
}

export function checkRuWordValidation(word: string) {
  if (russianWord.test(word)) return true;
  return false;
}

export function validateWordObj(word: Word) {
  if (word.en === "" || !checkEnWordValidation(word.en)) return false;
  if (word.ru === "" || !checkRuWordValidation(word.ru)) return false;
  return true;
}

export function validateWordsData(wordsData: IDBWords) {
  const keys = Object.keys(wordsData);
  for (const key of keys) {
    if (!validateWordObj(wordsData[key])) return false;
  }
  return true;
}

export function checkEmptyInputs(form: HTMLFormElement) {
  const inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") return true;
  }

  return false;
}
