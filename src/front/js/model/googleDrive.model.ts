import { IDBWords } from "../interface.front.js";
import { CLIENT_ID } from "../keys.js";

declare let google: any;
let client: any;
let fileId: string;
let tokenResolver: ((value: string) => void) | null = null;

//cookies
function saveTokenToCookie(token: string) {
  document.cookie = `accessWordsToken=${token}; path=/; max-age=3600;`;
}

function getTokenFromCookies() {
  const cookie = document.cookie
    .split(";")
    .filter((e) => e.includes("accessWordsToken"));
  if (cookie[0]) return cookie[0].split("=")[1];
  else return "";
}

let access_token: string = getTokenFromCookies();

async function validateToken(token: string) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
  );
  if (response.ok) {
    console.log("Token is valid");
    return true;
  } else {
    console.log("Token is invalid or expired");
    return false;
  }
}

//google api drive
const params = new URLSearchParams({
  q: "name='words.json'",
  fields: "files(id, name)",
  pageSize: "10",
});

async function loadFileID() {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    },
  );
  const data = await response.json();
  return data.files[0].id as string;
}

async function loadDataJson(id: string) {
  const xhr = await fetch(
    `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    },
  );
  const data = await xhr.json();
  console.log(data);
  return data;
}

async function loadData(): Promise<IDBWords> {
  const id = await loadFileID();
  fileId = id;
  const data = (await loadDataJson(id)) as IDBWords;
  return data;
}

//google api init
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

function initClient() {
  client = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: "https://www.googleapis.com/auth/drive",
    callback: (tokenResponse: any) => {
      access_token = tokenResponse.access_token;
      saveTokenToCookie(access_token);
      if (tokenResolver) {
        tokenResolver(access_token);
        tokenResolver = null;
      }
    },
  });
}

function getFreshToken() {
  return new Promise((resolve, reject) => {
    if (!client) {
      reject("no client");
      return;
    }

    tokenResolver = resolve;
    client.requestAccessToken();
  });
}
//get data
export async function getDataFromGoogleDrive(): Promise<IDBWords> {
  await loadGoogleApi();
  initClient();

  //проверяем токен в куки
  if (!(access_token && (await validateToken(access_token)))) {
    console.warn("refresh token needed");
    await getFreshToken();
  }

  return loadData();
}

//update data
async function updateDataJson(fileId: string, data: IDBWords) {
  const response = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify(data),
    },
  );
  if (response.ok) {
    const data = await response.json();
    console.log("File updated with ID:", data.id);
  } else {
    console.error("Error updating file:", await response.json());
  }
}

export async function updateGoogleDriveData(data: IDBWords): Promise<void> {
  //проверяем токен в куки
  if (!(access_token && (await validateToken(access_token)))) {
    console.warn("refresh token needed");
    await getFreshToken();
  }

  return updateDataJson(fileId, data);
}
