import { PageRenderState } from "../enum.front.js";
import { IDBWords } from "../interface.front.js";
import {
  createForm,
  createImage,
  createInput,
  createLink,
  createTag,
} from "./createElement.view.js";

const isMainPage = document.querySelector(".main-page") as HTMLElement;

function renderHeadBlock(state: PageRenderState) {
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

  isMainPage.append(header);
  header.append(heading);
  header.append(subHeading);
  header.append(gamePageLink);
}

function renderMainBlock() {
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

  isMainPage.append(main);
  main.append(addWordForm);
  addWordForm.append(fieldAddWord);
  fieldAddWord.append(fieldLegend);
  fieldAddWord.append(enWordInput);
  fieldAddWord.append(ruWordInput);
  fieldAddWord.append(submitBtn);
}

function renderFooterBlock() {
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

  isMainPage.append(footer);
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
  //HEADER
  renderHeadBlock(state);
  //MAIN
  renderMainBlock();
  //FOOTER
  renderFooterBlock();
}
