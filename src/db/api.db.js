import { writeFile } from "fs/promises";
import path from "path";

const { default: db } = await import("./words.json", {
  with: { type: "json" },
});

export const inMemoryDB = db;

export const updateJson = async () => {
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
  console.log("addWord: added");
  inMemoryDB[wordData.name] = { en: wordData.en, ru: wordData.ru };
  updateJson();
};

export const addWords = (wordData) => {
  Object.keys(wordData).forEach((word) => {
    wordData[word].name = word;
    addWord(wordData[word]);
  });
  updateJson();
};

export const removeWord = (word) => {
  if (!searchWord(word)) return;
  delete inMemoryDB[word];
  updateJson();
};
