// import { CLIENT_ID } from "../keys.js";

export function saveTokenToCookie(token: string) {
  console.log(`used`);

  document.cookie = `accessWordsToken=${token}; path=/; max-age=3600;`;
}

export function getTokenFromCookies() {
  return (
    document.cookie
      .split(";")
      .filter((e) => e.includes("accessWordsToken"))[0]
      .split("=")[1] || ""
  );
}
//проверять на работу, валидировать, закидывать в использование
//иначе реактивить новый
//разобраться с получением refresh cookie
