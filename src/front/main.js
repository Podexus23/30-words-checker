import { startGame } from "./js/controller/game.controller.js";
import {
  removeGameWrapperBlock,
  renderGamePage,
  updateFinalWrapperBlock,
} from "./js/view/renderGame.view.js";
import { renderMainPage } from "./js/view/renderMain.view.js";
import { updateStateBlock } from "./js/view/wordBlock..dom.js";

export const globalState = {
  source: "storage",
  // source: "indexedDB",
  // source: "server",
};

//ADD WORD FORM
const isMainPage = document.querySelector(".main-page");
if (isMainPage) {
  renderMainPage(globalState);
}

// GAME

const isGamePage = document.querySelector(".game-page");

if (isGamePage) {
  const gameState = {
    wordsQuantity: 5,
    playerMoves: 0,
    rightAnswers: 0,
    source: globalState.source,
  };
  renderGamePage(globalState);

  isGamePage.addEventListener("click", async (e) => {
    if (e.target.classList.contains("game-start-btn")) {
      const startGameBtn = document.querySelector(".game-start-btn");
      await startGame(gameState, isGamePage);
      startGameBtn.disabled = true;
    }
    if (e.target.classList.contains("game_block-btn")) {
      const wordBlock = e.target.closest(".game_block");
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

  const gameOptBlock = document.querySelector(".game-src");

  gameOptBlock.addEventListener("click", (e) => {
    if (e.target.classList.contains("game-src_btn")) {
      const btn = e.target;

      if (btn.dataset.src === "server") {
        gameState.source = "server";
        //if server, send request to server if it answers, ok
        //else tell to chose localStorage or add words by your self
        console.log("hi server");
      }

      if (btn.dataset.src === "storage") {
        gameState.source = "storage";
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    window.localStorage.setItem("WC_words", JSON.stringify(tempWords));
  });
}
