export const getRandom = (min, max) =>
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
  return Object.values(await (await fetch("/data", { method: "get" })).json());
}

export async function getRandomWordsFromServer(quantity) {
  const dataArr = await getDataFromServer();
  return generateRandomWords(dataArr, quantity);
}
