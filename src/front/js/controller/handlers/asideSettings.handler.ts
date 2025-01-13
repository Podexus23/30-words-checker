import { globalState } from "../../../main.js";
import { SourceType } from "../../enum.front.js";
import { changeSource } from "../../model/changeSorce.model.js";

export function handleAsideSettings(e: MouseEvent) {
  const button = e.target as HTMLElement;
  if (button.classList.contains("btn")) {
    const newSource = button.dataset.sourceName as SourceType;
    changeSource(globalState, newSource);
    const parent = button.parentNode as HTMLElement;
    const buttons = parent.querySelectorAll(".btn") as NodeListOf<HTMLElement>;
    buttons.forEach((button: HTMLElement) => {
      button.style.color = "#FFFF11";
    });
    button.style.color = "#11aaaa";
  } else console.dir(e.target);
}
