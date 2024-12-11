import {
  getRandomWordsFromLocalStorage,
  getRandomWordsFromServer,
} from "../model/game.model.js";
import {
  renderWrapperBlock,
  updateForGameWrapperBlock,
} from "../view/renderGame.view.js";

export async function startGame(state, parent) {
  renderWrapperBlock(parent);
  let words;
  if (state.source === "server") {
    words = await getRandomWordsFromServer(state.wordsQuantity);
  }
  if (state.source === "storage") {
    words = await getRandomWordsFromLocalStorage(state.wordsQuantity);
  }
  updateForGameWrapperBlock(words);
}
