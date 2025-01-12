import { LocalAddress } from "../../enum.front.js";
import { logError } from "../../helpers/log.helper.js";
import { IDBWords } from "../../interface.front.js";
import { WORDS } from "../wordsData.model.js";

export function getDataFromLocalStorage() {
  const storageData = window.localStorage.getItem(LocalAddress.Src1);

  if (!storageData) return WORDS;

  const data = JSON.parse(storageData);
  if (Object.keys(data).length === 0) return WORDS;

  return data;
}

//localStorage DATA

export const updateLocalData = async (data: IDBWords) => {
  try {
    window.localStorage.setItem(LocalAddress.Src1, JSON.stringify(data));
  } catch (err) {
    logError(err);
  }
};
