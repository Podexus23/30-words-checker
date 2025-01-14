import { LocalStorageAddress } from "../enum.front.js";
import { IDBWords } from "../interface.front.js";

export function getAllDataFromIndexedDB(): Promise<IDBWords | false> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(LocalStorageAddress.Words, 1);

    request.onupgradeneeded = (event) => {
      const req = event.target as IDBRequest<IDBDatabase>;
      const db = req.result;
      db.createObjectStore("words", { keyPath: "name" });
    };

    request.onsuccess = (e) => {
      try {
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
          if (Object.keys(res).length < 5) resolve(false);
          resolve(res);
        };
      } catch (error) {
        reject(error);
      }
    };

    request.onerror = (event) => {
      const getRequest = event.target as IDBRequest;
      reject(getRequest.error);
    };
  });
}

export function updateIndexedDBData(data: IDBWords) {
  const request = indexedDB.open(LocalStorageAddress.Words, 1);

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
