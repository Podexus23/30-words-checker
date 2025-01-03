const englishWord = /^[a-zA-Z]+$/;
const russianWord = /^[а-яА-ЯёЁ]+$/;

export function checkEnWordValidation(word: string) {
  if (englishWord.test(word)) return true;
  return false;
}

export function checkRuWordValidation(word: string) {
  if (russianWord.test(word)) return true;
  return false;
}

export function checkEmptyInputs(form: HTMLFormElement) {
  const inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") return true;
  }

  return false;
}
