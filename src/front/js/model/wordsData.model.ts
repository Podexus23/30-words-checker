import { LocalAddress, SourceType } from "../enum.front";
import { logError } from "../helpers/log.helper";
import { GlobalState, IDBWords, JSONString, Word } from "../interface.front";

const WORDS: IDBWords = {
  cat: { en: "cat", ru: "кот" },
  dog: { en: "dog", ru: "собака" },
  ship: { en: "ship", ru: "корабль" },
  sheep: { en: "sheep", ru: "овца" },
  cup: { en: "cup", ru: "чашка" },
};

let inMemoryWords: IDBWords = {};

//HELPERS
const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export function generateRandomWords(
  wordsArr: Word[],
  quantity = 5,
): Word[] | null {
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

//localStorage DATA
export function getDataFromLocalStorage() {
  const storageData = window.localStorage.getItem(LocalAddress.Src1);

  if (!storageData) return WORDS;

  const data = JSON.parse(storageData);
  if (Object.keys(data).length === 0) return WORDS;

  return data;
}

export const updateLocalData = async (data: IDBWords) => {
  try {
    window.localStorage.setItem(LocalAddress.Src1, JSON.stringify(data));
  } catch (err) {
    logError(err);
  }
};

//indexedDB Data
async function getAllDataFromIndexedDB(): Promise<IDBWords> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LocalAddress.Src1, 1);

    request.onsuccess = (e) => {
      const request = e.target as IDBRequest<IDBDatabase>;
      const db = request.result;
      const transaction = db.transaction("words", "readonly");
      const store = transaction.objectStore("words");

      const allWords = store.getAll();

      allWords.onsuccess = () => {
        const res: IDBWords = allWords.result.reduce((acc, cur) => {
          const { name, en, ru } = cur;
          acc[name] = { en, ru };
          return acc;
        }, {});
        resolve(res);
      };
      allWords.onerror = (event) => {
        const getRequest = event.target as IDBRequest;
        reject(getRequest.error);
      };
    };

    request.onerror = (event) => {
      const getRequest = event.target as IDBRequest;
      reject(getRequest.error);
    };
  });
}

async function updateIndexedDBData(data: IDBWords) {
  const request = indexedDB.open(LocalAddress.Src1, 1);

  request.onsuccess = (e) => {
    const request = e.target as IDBRequest<IDBDatabase>;
    const db = request.result;

    Object.keys(data).forEach((word) => {
      const transaction = db.transaction("words", "readwrite");
      const store = transaction.objectStore("words");
      const dbData = { name: word, en: data[word].en, ru: data[word].ru };
      const addWord = store.add(dbData);

      addWord.onsuccess = () => {
        console.log(`Word: ${word} added`);
      };
      addWord.onerror = (event) => {
        const getRequest = event.target as IDBRequest;
        console.error(getRequest.error);
      };
    });
  };

  request.onerror = (event) => {
    const getRequest = event.target as IDBRequest;
    console.error(getRequest.error);
  };
}

export async function updateRemoteData(state: GlobalState) {
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
  }
}
