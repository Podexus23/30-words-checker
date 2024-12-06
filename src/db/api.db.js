import { writeFile } from "fs/promises";
import path from "path";

const { default: db } = await import("./words.json", {
  with: { type: "json" },
});

const inMemoryDB = db;

const updateJson = async () => {
  try {
    const jsonPath = path.join(import.meta.dirname, "words.json");
    await writeFile(jsonPath, JSON.stringify(db));
  } catch (err) {
    console.error(err.message);
  }
};

const searchWord = (word) => {
  if (inMemoryDB[word]) return inMemoryDB[word];
  else return null;
};

export const getWords = () => inMemoryDB;

export const addWord = (wordData) => {
  if (searchWord(wordData.name)) return;
  inMemoryDB[wordData.name] = { en: wordData.en_word, ru: wordData.ru_word };
  updateJson();
};

//"cat": { "en": "cat", "ru": "кот" },
