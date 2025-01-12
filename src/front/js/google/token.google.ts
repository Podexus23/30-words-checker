// import { CLIENT_ID } from "../keys.js";

export function saveTokenToCookie(token: string) {
  console.log(`used`);

  document.cookie = `accessWordsToken=${token}; path=/; max-age=3600;`;
}

export function getTokenFromCookies() {
  const cookie = document.cookie
    .split(";")
    .filter((e) => e.includes("accessWordsToken"));
  if (cookie[0]) return cookie[0].split("=")[1];
  else return "";
}
//проверять на работу, валидировать, закидывать в использование
//иначе реактивить новый
//разобраться с получением refresh cookie
