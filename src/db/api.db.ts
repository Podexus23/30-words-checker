import fs, { writeFile } from "fs/promises";
import path from "path";
import { logError } from "../helpers/log.helper.js";
import { IDBWords, Word } from "./interface.db.js";

const pathToDB = path.join(import.meta.dirname, "words.json");

async function loadJSON(filePath: string): Promise<IDBWords | undefined> {
  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (err: unknown) {
    logError(err);
  }
}

const db: IDBWords = (await loadJSON(pathToDB)) || {};
const inMemoryDB: IDBWords = db;

const updateJson = async () => {
  try {
    await writeFile(pathToDB, JSON.stringify(inMemoryDB));
  } catch (err: unknown) {
    logError(err);
  }
};

const searchWord = (word: string): Word | null => {
  if (inMemoryDB[word]) return inMemoryDB[word];
  else return null;
};

export const getWords = (): IDBWords => inMemoryDB;

export const addWord = (wordData: Word): number | undefined => {
  if (searchWord(wordData.en)) return 409;
  try {
    inMemoryDB[wordData.en] = { en: wordData.en, ru: wordData.ru };
    updateJson();
    return 201;
  } catch (err: unknown) {
    logError(err);
  }
};

export const addWords = (wordsData: IDBWords): number | undefined => {
  try {
    Object.keys(wordsData).forEach((word: string) => {
      addWord(wordsData[word]);
    });
    return 201;
  } catch (err: unknown) {
    logError(err);
  }
};

// const removeWord = (word: string) => {
//   if (!searchWord(word)) return;
//   delete inMemoryDB[word];
//   updateJson();
//   try {
//     delete inMemoryDB[word];
//     updateJson();
//   } catch (err: unknown) {
//     logError(err);
//   }
// };
