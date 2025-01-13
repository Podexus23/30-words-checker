import { globalState } from "../../main.js";
import { SourceType } from "../enum.front.js";
import { GlobalState, IDBWords, JSONString, Word } from "../interface.front.js";
import {
  getDataFromGoogleDrive,
  updateGoogleDriveData,
} from "./googleDrive.model.js";
import {
  getAllDataFromIndexedDB,
  updateIndexedDBData,
} from "./indexedDB.model.js";
import {
  getDataFromLocalStorage,
  updateLocalData,
} from "./localStorage.model.js";

//! remove export from WORDS
export const WORDS: IDBWords = {
  cat: { en: "cat", ru: "кот" },
  dog: { en: "dog", ru: "собака" },
  ship: { en: "ship", ru: "корабль" },
  sheep: { en: "sheep", ru: "овца" },
  cup: { en: "cup", ru: "чашка" },
  words: { en: "words", ru: "слова" },
};

let inMemoryWords: IDBWords = {};

//HELPERS
const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

function generateRandomWords(wordsArr: Word[], quantity = 5): Word[] | null {
  if (quantity > wordsArr.length) {
    console.error(
      `generateRandomWords: to much to words add, try less than ${wordsArr.length}`,
    );
    return null;
  }
  const chosenWords: Word[] = [];
  for (let i = 0; i < quantity; i++) {
    const newWord = wordsArr[getRandom(0, wordsArr.length - 1)];
    const chosenMap = chosenWords.map((e) => e.en);
    if (!chosenMap.includes(newWord.en)) chosenWords.push(newWord);
    else i--;
  }
  return chosenWords;
}

//inMemory DATA
export async function initInMemory(state: GlobalState) {
  switch (state.source) {
    case SourceType.Server: {
      inMemoryWords = await getDataFromServer();
      break;
    }
    case SourceType.Local: {
      inMemoryWords = getDataFromLocalStorage();
      break;
    }
    case SourceType.IndexedDB: {
      inMemoryWords = await getAllDataFromIndexedDB();
      break;
    }
    case SourceType.GoogleDrive: {
      inMemoryWords = await getDataFromGoogleDrive();
      break;
    }
    default: {
      inMemoryWords = WORDS;
      break;
    }
  }
}

export function searchWord(word: string) {
  if (inMemoryWords[word]) return inMemoryWords[word];
  else return null;
}

export async function getQuantityOfWords(quantity: number) {
  const dataArr = Object.values(inMemoryWords);
  return generateRandomWords(dataArr, quantity);
}

export function getAllWords() {
  return inMemoryWords;
}

export async function addWord(word: string) {
  const { en_word: en, ru_word: ru } = JSON.parse(word);
  if (searchWord(en)) {
    console.log(`addWord: this word: ${en} is already in DB`);
    return null;
  } else
    inMemoryWords[en] = {
      en,
      ru,
    };
}

//SERVER DATA
async function getDataFromServer(): Promise<IDBWords> {
  return await (await fetch("/api/words", { method: "get" })).json();
}

async function updateServerData(data: JSONString<IDBWords>) {
  await fetch("/api/words", { method: "POST", body: data });
}

export async function updateRemoteData() {
  const state = globalState;
  switch (state.source) {
    case SourceType.Server: {
      const data = JSON.stringify(inMemoryWords);
      updateServerData(data);
      break;
    }
    case SourceType.Local: {
      const data = inMemoryWords;
      updateLocalData(data);
      break;
    }
    case SourceType.IndexedDB: {
      const data = inMemoryWords;
      updateIndexedDBData(data);
      break;
    }
    case SourceType.GoogleDrive: {
      const data = inMemoryWords;
      await updateGoogleDriveData(data);
      break;
    }
  }
}
