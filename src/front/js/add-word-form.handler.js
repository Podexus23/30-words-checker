import { globalState } from "../main.js";
import { addWordLocal } from "./model/storage.model.js";
import { renderDataState } from "./view/renderDataState.view.js";

export async function handleSubmitAddWordForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const dataToSend = JSON.stringify(
    Object.fromEntries(Array.from(data.entries()))
  );
  e.target.reset();
  if (globalState.source === "server")
    renderDataState.server.sendWord(dataToSend);
  // await fetch("/api/word", { method: "POST", body: dataToSend });
  if (globalState.source === "storage") {
    renderDataState.storage.sendWord(dataToSend);
    // addWordLocal(dataToSend);
  }
}
