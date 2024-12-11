const WORDS = {
  cat: { en: "cat", ru: "кот" },
  dog: { en: "dog", ru: "собака" },
  ship: { en: "ship", ru: "корабль" },
  sheep: { en: "sheep", ru: "овца" },
  cup: { en: "cup", ru: "чашка" },
};

let tempWords = {};

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

export async function getDataFromServer() {
  return await (await fetch("/data", { method: "get" })).json();
}

export async function getRandomWordsFromServer(quantity) {
  const dataArr = Object.values(await getDataFromServer());
  return generateRandomWords(dataArr, quantity);
}

export function getDataFromLocalStorage() {
  const storageData = window.localStorage.getItem("WC_words");
  if (!storageData) {
    tempWords = WORDS;
    window.localStorage.setItem("WC_words", JSON.stringify(WORDS));
  } else {
    tempWords = JSON.parse(storageData);
    if (Object.keys(tempWords).length === 0) {
      tempWords = WORDS;
      window.localStorage.setItem("WC_words", JSON.stringify(WORDS));
    }
  }

  console.log(tempWords);
  return tempWords;
}

export async function getRandomWordsFromLocalStorage(quantity) {
  const dataArr = Object.values(getDataFromLocalStorage());
  return generateRandomWords(dataArr, quantity);
}
