import { renderPage } from "./js/controller/router.js";
import { SourceType } from "./js/enum.front.js";
import { GlobalState } from "./js/interface.front.js";
import {
  getGlobalStateFromLocalStorage,
  updateGlobalStateLocalData,
} from "./js/model/localStorage.model.js";
import { initInMemory } from "./js/model/wordsData.model.js";

export const globalState: GlobalState = {
  source: SourceType.Default,
  allSources: [
    SourceType.Default,
    SourceType.Local,
    SourceType.IndexedDB,
    SourceType.Server,
    SourceType.GoogleDrive,
    SourceType.Test,
  ],
};
const localSource = await getGlobalStateFromLocalStorage();
if (localSource) globalState.source = localSource.source;
const urlPath = window.location.pathname;

// all words state
await initInMemory(globalState);

// router/render state
renderPage(urlPath);

//third party scripts

window.addEventListener("beforeunload", () => {
  updateGlobalStateLocalData(globalState);
});
