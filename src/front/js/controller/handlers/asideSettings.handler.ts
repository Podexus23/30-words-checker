import { globalState } from "../../../main.js";
import { SourceType } from "../../enum.front.js";
import { changeSource } from "../../model/changeSorce.model.js";
import {
  resetButtonsColor,
  selectButtonActive,
} from "../../view/settingsAside.view.js";

export function handleAsideSettings(e: MouseEvent) {
  const button = e.target as HTMLElement;
  if (button.classList.contains("btn")) {
    const newSource = button.dataset.sourceName as SourceType;
    changeSource(globalState, newSource);
    const parent = button.closest(".aside-settings_source") as HTMLElement;

    resetButtonsColor(parent);
    selectButtonActive(button);
  } else console.warn(e.target);
}
