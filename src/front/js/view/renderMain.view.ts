import { PageRenderState } from "../enum.front.js";
import { IDBWords } from "../interface.front.js";
import {
  createForm,
  createImage,
  createInput,
  createLink,
  createTag,
} from "./createElement.view.js";

const rootBlock = document.getElementById("root") as HTMLElement;

function renderHeadBlock(state: PageRenderState, mainBlock: HTMLElement) {
  const header = createTag({ tagName: "header", className: "header" });
  const heading = createTag({
    tagName: "h1",
    className: "header_heading",
    textContent: "Privet Bratishka",
  });
  const gamePageLink = createLink({
    className: "header_game-link",
    href: `${state.toGamePageLink || "/game"}`,
    textContent: "Let's start a game",
  });
  const subHeading = createTag({
    tagName: "div",
    className: "header_sub-heading",
    textContent: "hello neighbor",
  });

  mainBlock.append(header);
  header.append(heading);
  header.append(subHeading);
  header.append(gamePageLink);
}

function renderMainBlock(mainBlock: HTMLElement) {
  const main = createTag({ tagName: "main", className: "main" });
  const addWordForm = createForm({
    action: "/api/word",
    method: "POST",
    name: "addWord",
    className: "add-word-form",
  });

  const fieldAddWord = createTag({
    tagName: "fieldset",
    className: "add-word-form_field",
  });

  const fieldLegend = createTag({
    tagName: "legend",
    className: "add-word-form_legend",
    textContent: "Add english word and it's translation",
  });

  const enWordInput = createInput({
    type: "text",
    id: "en_word",
    name: "en_word",
    placeholder: "English word",
  });

  const ruWordInput = createInput({
    type: "text",
    id: "ru_word",
    name: "ru_word",
    placeholder: "Translation",
  });

  const submitBtn = createTag({
    tagName: "button",
    className: "submit-btn btn",
    textContent: "Submit",
  }) as HTMLButtonElement;
  submitBtn.type = "submit";

  mainBlock.append(main);
  main.append(addWordForm);
  addWordForm.append(fieldAddWord);
  fieldAddWord.append(fieldLegend);
  fieldAddWord.append(enWordInput);
  fieldAddWord.append(ruWordInput);
  fieldAddWord.append(submitBtn);
}

function renderFooterBlock(mainBlock: HTMLElement) {
  const footer = createTag({ tagName: "footer", className: "footer" });

  const wordsBlock = createTag({
    tagName: "div",
    className: "footer_words-block",
  });

  const showWordsBtn = createTag({
    tagName: "button",
    className: "words_get-btn",
    textContent: "Get Words",
  });

  const allWordsBlock = createTag({ tagName: "div", className: "words_all" });

  const footerPic = createImage({
    className: "footer-img img",
    src: "assets/jpg/cheecky-ass.jpg",
    alt: "ass",
  });

  mainBlock.append(footer);
  footer.append(wordsBlock);
  wordsBlock.append(showWordsBtn);
  wordsBlock.append(allWordsBlock);
  footer.append(footerPic);
}

export function addWordToWordsBlock(word: string, data: IDBWords) {
  const wordBlock = createTag({
    tagName: "div",
    className: "words_all-word",
    textContent: `${data[word].en} - ${data[word].ru}`,
  });

  const allWordsBlock = document.querySelector(".words_all") as HTMLElement;
  allWordsBlock.append(wordBlock);
}

export function renderMainPage(state: PageRenderState) {
  const mainPage = createTag({ tagName: "div", className: "main-page" });
  rootBlock.append(mainPage);
  //HEADER
  renderHeadBlock(state, mainPage);
  //MAIN
  renderMainBlock(mainPage);
  //FOOTER
  renderFooterBlock(mainPage);
}

export function createValidationMessage(
  elem: HTMLElement,
  msg: string,
  color = "red",
) {
  const msgBlock = createTag({
    tagName: "div",
    className: "validation-message",
    textContent: msg,
  });
  msgBlock.style.color = color;
  elem.append(msgBlock);
}

export function removeValidationMessage(elem: HTMLElement) {
  const validationBLock = elem.querySelector(".validation-message");
  if (validationBLock) validationBLock.remove();
}
