import { LocalStorageAddress, SourceType } from "../enum.front.js";
import { logError, logWarn } from "../helpers/log.helper.js";
import { GlobalState, IDBWords } from "../interface.front.js";

export function getDataFromLocalStorage(): IDBWords | number {
  const storageData = window.localStorage.getItem(LocalStorageAddress.Words);

  if (!storageData) {
    logWarn("No saved words in local storage");
    return 404;
  }

  const data = JSON.parse(storageData);

  if (Object.keys(data).length === 0) {
    logError("Broken data from localStorage");
    return 422;
  }

  return data;
}

//localStorage DATA

export const updateLocalData = async (data: IDBWords) => {
  try {
    window.localStorage.setItem(
      LocalStorageAddress.Words,
      JSON.stringify(data),
    );
  } catch (err) {
    logError(err);
  }
};

//globalState manage
export function getGlobalStateFromLocalStorage() {
  const storageData = window.localStorage.getItem(LocalStorageAddress.State);

  if (!storageData) {
    logWarn("No saved globalState in local storage");
    return;
  }
  const sourceKeys = Object.values(SourceType).filter((v) => isNaN(Number(v)));

  const data = JSON.parse(storageData);

  if (!sourceKeys.includes(data.source)) {
    logError("Non existent source or broken data from localStorage");
    return;
  }

  return data;
}

export function updateGlobalStateLocalData(state: GlobalState) {
  try {
    window.localStorage.setItem(
      LocalStorageAddress.State,
      JSON.stringify(state),
    );
  } catch (err) {
    logError(err);
  }
}
