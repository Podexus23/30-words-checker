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
let fileId: string;

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: "https://www.googleapis.com/auth/drive",
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
  q: "name='words1.json'",
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

  fileId = data.files[0].id as string;
  console.log(fileId);
}

async function loadDataJson(fileId: string) {
  const xhr = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    },
  );
  console.log(`xhr`);

  const data = await xhr.json();
  console.log(data);
}

async function createDataJson() {
  const metadata = {
    name: "words1.json",
    mimeType: "application/json",
  };

  const fileContent = new Blob([JSON.stringify({ cat: "kotek" })], {
    type: "application/json",
  });
  console.log(fileContent);

  const formData = new FormData();

  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" }),
  );
  formData.append("file", fileContent);

  const xhr = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      body: formData,
    },
  );
  if (xhr.ok) {
    const data = await xhr.json();
    console.log("File created with ID:", data.id);
    console.log(`${data}`);
  } else {
    console.error("Error creating file:", await xhr.text());
  }
}

async function updateDataJson(fileId: string) {
  const xhr = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({ cat: "motek" }),
    },
  );
  if (xhr.ok) {
    const data = await xhr.json();
    console.log("File updated with ID:", data.id);
  } else {
    console.error("Error updating file:", await xhr.json());
  }
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
  const requestDataButton = createTag({
    tagName: "button",
    className: "google-request-json",
    textContent: "Get json",
  });
  const createDataButton = createTag({
    tagName: "button",
    className: "google-create-json",
    textContent: "Create json",
  });
  const updateDataButton = createTag({
    tagName: "button",
    className: "google-update-json",
    textContent: "Update json",
  });
  requestButton.addEventListener("click", () => {
    getToken();
  });
  getDataButton.addEventListener("click", () => {
    loadData();
  });
  requestDataButton.addEventListener("click", () => {
    loadDataJson(fileId);
  });
  createDataButton.addEventListener("click", () => {
    createDataJson();
  });
  updateDataButton.addEventListener("click", () => {
    updateDataJson(fileId);
  });
  googleBlock.append(requestButton);
  googleBlock.append(getDataButton);
  googleBlock.append(requestDataButton);
  googleBlock.append(createDataButton);
  googleBlock.append(updateDataButton);
  return googleBlock;
}
