import { handleSubmitAddWordForm } from "../add-word-form.handler.js";
import {
  createForm,
  createImage,
  createInput,
  createLink,
  createTag,
} from "./elements.dom.js";
import { renderData } from "./renderData.view.js";

export function renderMainPage(state) {
  const isMainPage = document.querySelector(".main-page");

  // const addWordForm = document.forms["addWord"];

  //HEADER
  const header = createTag({ tagName: "header", className: "header" });
  const heading = createTag({
    tagName: "h1",
    className: "header_heading",
    textContent: "Privet Bratishka",
  });
  const gamePageLink = createLink({
    className: "header_game-link",
    href: `${renderData[state.source].toGamePageLink}`,
    textContent: "Let's start a game",
  });
  const subHeading = createTag({
    tagName: "div",
    className: "header_sub-heading",
    textContent: "hello neighbor",
  });
  header.append(heading);
  header.append(subHeading);
  header.append(gamePageLink);

  isMainPage.append(header);

  //MAIN

  const main = createTag({ tagName: "main", className: "main" });
  isMainPage.append(main);

  const addWordForm = createForm({
    action: "/api/word",
    method: "post",
    name: "addWord",
    className: "add-word-form",
  });
  addWordForm.addEventListener("submit", handleSubmitAddWordForm);
  main.append(addWordForm);

  const fieldAddWord = createTag({
    tagName: "fieldset",
    className: "add-word-form_field",
  });
  addWordForm.append(fieldAddWord);

  const fieldLegend = createTag({
    tagName: "legend",
    className: "add-word-form_legend",
    textContent: "Add english word and it's translation",
  });
  fieldAddWord.append(fieldLegend);

  const enWordInput = createInput({
    type: "text",
    id: "en_word",
    name: "en_word",
    placeholder: "English word",
  });
  fieldAddWord.append(enWordInput);

  const ruWordInput = createInput({
    type: "text",
    id: "ru_word",
    name: "ru_word",
    placeholder: "Translation",
  });
  fieldAddWord.append(ruWordInput);

  const submitBtn = createTag({
    tagName: "button",
    className: "submit-btn btn",
    textContent: "Submit",
  });
  submitBtn.type = "submit";
  fieldAddWord.append(submitBtn);
  //FOOTER

  const footer = createTag({ tagName: "footer", className: "footer" });
  isMainPage.append(footer);

  const wordsBlock = createTag({
    tagName: "div",
    className: "footer_words-block",
  });
  footer.append(wordsBlock);

  const showWordsBtn = createTag({
    tagName: "button",
    className: "words_get-btn",
    textContent: "Get Words",
  });
  wordsBlock.append(showWordsBtn);
  showWordsBtn.addEventListener("click", async (e) => {
    const getData = await fetch("/data");
    const data = await getData.json();

    Object.keys(data).forEach((word) => {
      const wordBlock = document.createElement("div");
      wordBlock.textContent = `${data[word].en} - ${data[word].ru}`;
      allWordsBlock.append(wordBlock);
    });
  });

  const allWordsBlock = createTag({ tagName: "div", className: "words_all" });
  wordsBlock.append(allWordsBlock);

  const footerPic = createImage({
    className: "footer-img img",
    src: "assets/jpg/cheecky-ass.jpg",
    alt: "ass",
  });
  footer.append(footerPic);
}
