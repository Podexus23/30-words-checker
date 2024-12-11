import { addWordLocal, getWordsLocal } from "../model/storage.model.js";

export const renderDataState = {
  server: {
    toMainPageLink: "/",
    toGamePageLink: "/game",
    sendWord: async (data) =>
      await fetch("/api/word", { method: "POST", body: data }),
    getAllWords: async () => {
      const getData = await fetch("/data");
      const data = await getData.json();
      return data;
    },
    // получение всех слов
    // добаление слов
  },
  storage: {
    toMainPageLink: "../index.html",
    toGamePageLink: "./pages/game.html",
    sendWord: (data) => addWordLocal(data),
    getAllWords: async () => {
      return getWordsLocal();
    },
  },
};
