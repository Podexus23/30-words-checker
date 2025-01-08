// import { gapi } from "gapi-script";
import { renderPage } from "./js/controller/router.js";
import { SourceType } from "./js/enum.front.js";
import { GlobalState } from "./js/interface.front.js";
import { initInMemory } from "./js/model/wordsData.model.js";

declare let google: any;

export const globalState: GlobalState = {
  source: SourceType.Server,
};

const urlPath = window.location.pathname;

// all words state
await initInMemory(globalState);

// router/render state
renderPage(urlPath);

//google drive

async function loadGoogleApi() {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google client script loaded");

      resolve();
    };

    script.onerror = () => {
      console.error("Failed to load Google client script");
      reject(new Error("Script load error"));
    };

    document.head.appendChild(script);
  });
}
loadGoogleApi().then(() => {
  initClient();
  setTimeout(getToken, 5000);
});

let client: any;
let access_token: any;

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id:
      "158912384692-cr1716dm0bgbqgl1csbibu66hgf32mo7.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive.readonly",
    callback: (tokenResponse: any) => {
      access_token = tokenResponse.access_token;
      console.log(tokenResponse);
    },
  });
}
function getToken() {
  client.requestAccessToken();
  setTimeout(loadCalendar, 10000);
}

async function loadCalendar() {
  const xhr = await fetch(
    "https://www.googleapis.com/drive/v3/files/1GfDXnFQeXj37MIqJcengZnURQA75uZQN-YKr0kGH_Mk",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    },
  );
  const data = await xhr.json();
  console.log(data);
}
