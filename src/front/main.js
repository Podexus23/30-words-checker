import { getRandomWordsFromServer } from "./js/model/game.model.js";
import {
  removeGameWrapperBlock,
  renderGamePage,
  renderWrapperBlock,
  updateFinalWrapperBlock,
  updateForGameWrapperBlock,
} from "./js/view/renderGame.view.js";
import { renderMainPage } from "./js/view/renderMain.view.js";
import { updateStateBlock } from "./js/view/wordBlock..dom.js";

//ADD WORD FORM
const isMainPage = document.querySelector(".main-page");
if (isMainPage) {
  renderMainPage();
}

// GAME
async function startGame(state, parent) {
  renderWrapperBlock(parent);
  const words = await getRandomWordsFromServer(state.wordsQuantity);
  updateForGameWrapperBlock(words);
}

const isGamePage = document.querySelector(".game-page");

if (isGamePage) {
  const gameState = {
    wordsQuantity: 5,
    playerMoves: 0,
    rightAnswers: 0,
  };
  renderGamePage();
  let gameWrapper;

  isGamePage.addEventListener("click", async (e) => {
    if (e.target.classList.contains("game-start-btn")) {
      const startGameBtn = document.querySelector(".game-start-btn");
      await startGame(gameState, isGamePage);
      startGameBtn.disabled = true;
    }
    if (e.target.classList.contains("game_block-btn")) {
      const wordBlock = e.target.parentNode;
      if (wordBlock.dataset.answer === "true") gameState.rightAnswers += 1;
      gameState.playerMoves += 1;
      updateStateBlock(gameState.rightAnswers, gameState.wordsQuantity);
    }
    if (gameState.wordsQuantity <= gameState.playerMoves) {
      //!remove end button
      const endButton = updateFinalWrapperBlock(gameState);

      function restartGame() {
        gameState.playerMoves = 0;
        gameState.rightAnswers = 0;
        removeGameWrapperBlock();
        startGame(gameState, isGamePage);
        endButton.removeEventListener("click", restartGame);
      }

      endButton.addEventListener("click", restartGame);
    }
  });
}
