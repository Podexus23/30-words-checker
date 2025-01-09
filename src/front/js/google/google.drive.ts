//google drive

import { CLIENT_ID, USER_API } from "../keys.js";
import { createTag } from "../view/createElement.view.js";

declare let google: any;

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

let client: any;
let access_token: any;

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    callback: (tokenResponse: any) => {
      access_token = tokenResponse.access_token;
      console.log(tokenResponse);
      return access_token;
    },
  });
}
function getToken() {
  client.requestAccessToken();
}

export const params = new URLSearchParams({
  q: "name='words.json'",
  fields: "files(id, name)",
  pageSize: "10",
  key: USER_API,
});

async function loadData() {
  const xhr = await fetch(
    `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
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

export function renderGoogleBlock() {
  loadGoogleApi().then(() => {
    initClient();
  });
  const googleBlock = createTag({
    tagName: "div",
    className: "google-settings",
  });
  const requestButton = createTag({
    tagName: "button",
    className: "google-request",
    textContent: "Request",
  });
  const getDataButton = createTag({
    tagName: "button",
    className: "google-data",
    textContent: "Get data",
  });
  requestButton.addEventListener("click", () => {
    getToken();
  });
  getDataButton.addEventListener("click", () => {
    loadData();
  });
  googleBlock.append(requestButton);
  googleBlock.append(getDataButton);
  return googleBlock;
}
