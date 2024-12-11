import { globalState } from "../../main.js";
import {
  handleGetWordsButton,
  handleSubmitAddWordForm,
} from "../controller/mainPage.controller.js";
import {
  createForm,
  createImage,
  createInput,
  createLink,
  createTag,
} from "./elements.dom.js";
import { renderDataState } from "./renderDataState.view.js";

export function renderMainPage(state) {
  const isMainPage = document.querySelector(".main-page");

  //HEADER
  const header = createTag({ tagName: "header", className: "header" });
  const heading = createTag({
    tagName: "h1",
    className: "header_heading",
    textContent: "Privet Bratishka",
  });
  const gamePageLink = createLink({
    className: "header_game-link",
    href: `${renderDataState[state.source].toGamePageLink}`,
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

  //MAIN

  const main = createTag({ tagName: "main", className: "main" });
  const addWordForm = createForm({
    action: "/api/word",
    method: "post",
    name: "addWord",
    className: "add-word-form",
  });
  addWordForm.addEventListener("submit", handleSubmitAddWordForm);

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
  });
  submitBtn.type = "submit";

  isMainPage.append(main);
  main.append(addWordForm);
  addWordForm.append(fieldAddWord);
  fieldAddWord.append(fieldLegend);
  fieldAddWord.append(enWordInput);
  fieldAddWord.append(ruWordInput);
  fieldAddWord.append(submitBtn);
  //FOOTER

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
  showWordsBtn.addEventListener("click", handleGetWordsButton);

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
