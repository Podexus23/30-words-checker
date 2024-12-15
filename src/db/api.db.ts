import fs, { writeFile } from "fs/promises";
import path from "path";

const pathToDB = path.join(import.meta.dirname, "words.json");

interface IDBWords {
  [name: string]: {
    en: string;
    ru: string;
  };
}

async function loadJSON(filePath: string) {
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

export async function allDBCode() {
  const db: IDBWords = await loadJSON(pathToDB);

  const inMemoryDB: IDBWords = db;

  const updateJson = async () => {
    try {
      await writeFile(pathToDB, JSON.stringify(inMemoryDB));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };
}
