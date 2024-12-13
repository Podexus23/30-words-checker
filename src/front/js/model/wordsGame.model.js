const gameState = {
  wordsQuantity: 5,
  playerMoves: 0,
  rightAnswers: 0,
};

export function initGameState(setting = "default") {
  switch (setting) {
    default: {
      gameState.wordsQuantity = 5;
      gameState.playerMoves = 0;
      gameState.rightAnswers = 0;
    }
  }
  return gameState;
}

export function getGameState() {
  return gameState;
}

export function updateGameState(key, add) {
  gameState[key] += add;
}

export function checkEndGame() {
  return gameState.wordsQuantity <= gameState.playerMoves ? true : false;
}
