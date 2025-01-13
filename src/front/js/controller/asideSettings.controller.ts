import { GlobalState } from "../interface.front.js";
import { renderSettingsAside } from "../view/settingsAside.view.js";
import { handleAsideSettings } from "./handlers/asideSettings.handler.js";

export function addAsideSettingsBlock(
  state: GlobalState,
  mainBlock?: HTMLElement,
) {
  if (!mainBlock) mainBlock = document.querySelector("#root") as HTMLElement;
  renderSettingsAside(mainBlock, state);
  const asideBlock = document.querySelector(".aside-settings") as HTMLElement;
  asideBlock?.addEventListener("click", handleAsideSettings);
}
