import { localAddress } from "../../main.js";
import { ENUM_SRC } from "../helper/enum.js";

const WORDS = {
  cat: { en: "cat", ru: "кот" },
  dog: { en: "dog", ru: "собака" },
  ship: { en: "ship", ru: "корабль" },
  sheep: { en: "sheep", ru: "овца" },
  cup: { en: "cup", ru: "чашка" },
};

let inMemoryWords = {};

//HELPERS
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export function generateRandomWords(wordsArr, quantity = 5) {
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

//inMemory DATA
export async function initInMemory(state) {
  switch (state.source) {
    case ENUM_SRC.server: {
      inMemoryWords = await getDataFromServer();
      break;
    }
    case ENUM_SRC.local: {
      inMemoryWords = getDataFromLocalStorage();
      break;
    }
    default: {
      inMemoryWords = WORDS;
      break;
    }
  }
}

export function searchWord(word) {
  if (inMemoryWords[word]) return inMemoryWords[word];
  else return null;
}

export async function getQuantityOfWords(quantity) {
  const dataArr = Object.values(inMemoryWords);
  return generateRandomWords(dataArr, quantity);
}

export function getAllWords() {
  return inMemoryWords;
}

export async function addWord(word) {
  const { en_word, ru_word } = JSON.parse(word);
  if (searchWord(en_word)) {
    console.log(`addWord: this word: ${en_word} is already in DB`);
    return;
  } else
    inMemoryWords[en_word] = {
      en: en_word,
      ru: ru_word,
    };
}

//SERVER DATA
async function getDataFromServer() {
  return await (await fetch("/api/words", { method: "get" })).json();
}

async function updateServerData(data) {
  await fetch("/api/words", { method: "POST", body: data });
}

//localStorage DATA
export function getDataFromLocalStorage() {
  const storageData = window.localStorage.getItem(localAddress.src1);

  if (!storageData) return WORDS;

  const data = JSON.parse(storageData);
  if (Object.keys(data).length === 0) return WORDS;

  return data;
}

export const updateLocalData = async (data) => {
  try {
    window.localStorage.setItem(localAddress.src1, JSON.stringify(data));
  } catch (err) {
    console.error(err.message);
  }
};

export async function updateRemoteData(state) {
  switch (state.source) {
    case ENUM_SRC.server: {
      const data = JSON.stringify(inMemoryWords);
      updateServerData(data);
      break;
    }
  }
  switch (state.source) {
    case ENUM_SRC.local: {
      const data = inMemoryWords;
      updateLocalData(data);
      break;
    }
  }
}
