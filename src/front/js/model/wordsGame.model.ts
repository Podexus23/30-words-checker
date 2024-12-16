import { GameBasicSettings, GameState } from "../interface.front.js";

const gameState: GameState = {
  wordsQuantity: 5,
  playerMoves: 0,
  rightAnswers: 0,
};

export function initGameState(
  setting: GameBasicSettings = "default",
): GameState {
  switch (setting) {
    default: {
      gameState.wordsQuantity = 5;
      gameState.playerMoves = 0;
      gameState.rightAnswers = 0;
    }
  }
  return gameState;
}

export function getGameState(): GameState {
  return gameState;
}

export function updateGameState(key: keyof GameState, add: number) {
  gameState[key] += add;
}

export function checkEndGame() {
  return gameState.wordsQuantity <= gameState.playerMoves ? true : false;
}
