import { SourceType } from "../enum.front.js";
import { GlobalState } from "../interface.front.js";
import { createTag } from "./createElement.view.js";

function renderSources(sources: SourceType[]) {
  return sources.map((source) => {
    const button = createTag({
      tagName: "button",
      className: `source-btn btn`,
      textContent: source,
    });
    button.dataset.sourceName = source;
    return button;
  });
}

export function renderSettingsAside(
  mainBlock: HTMLElement,
  state: GlobalState,
) {
  const asideBlock = createTag({
    tagName: "aside",
    className: "aside-settings",
  });
  const sourceButtons = createTag({
    tagName: "div",
    className: "aside-settings_source",
  });
  const buttons = renderSources(state.allSources);
  mainBlock.append(asideBlock);
  asideBlock.append(sourceButtons);
  sourceButtons.append(...buttons);
}
