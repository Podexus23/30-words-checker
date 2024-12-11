const localDB = await JSON.parse(window.localStorage.getItem("WC_words"));

const searchWordLocal = (word) => {
  if (localDB[word]) return localDB[word];
  else return null;
};

export const getWordsLocal = () => localDB;

export const updateJsonLocal = async () => {
  try {
    window.localStorage.setItem("WC_words", JSON.stringify(localDB));
  } catch (err) {
    console.error(err.message);
  }
};

export const addWordLocal = (wordData) => {
  const { en_word, ru_word } = JSON.parse(wordData);
  const dataToDB = { name: en_word, en_word, ru_word };
  if (searchWordLocal(dataToDB.name)) return;
  localDB[dataToDB.name] = { en: dataToDB.en_word, ru: dataToDB.ru_word };
  updateJsonLocal();
};
