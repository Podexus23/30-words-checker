import { SourceType } from "../enum.front.js";
import { GlobalState } from "../interface.front.js";
import { initInMemory } from "./wordsData.model.js";

export function changeSource(state: GlobalState, newSource: SourceType) {
  //change globalState.source
  state.source = newSource;

  //rewrite memory with new data
  initInMemory(state);
}
