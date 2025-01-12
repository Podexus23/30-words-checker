export enum LocalAddress {
  Src1 = "WC_words",
  Src2 = "WC_2024",
}

export enum SourceType {
  Local = "local",
  IndexedDB = "indexedDB",
  Server = "server",
  Test = "test",
  GoogleDrive = "googleDrive",
}

export enum GameStateType {
  Game_On = 1,
  Game_Off = 0,
}

export interface PageRenderState {
  toMainPageLink: string;
  toGamePageLink: string;
}

export const renderState = {
  server: {
    toMainPageLink: "/",
    toGamePageLink: "/game",
  },
  local: {
    toMainPageLink: "/",
    toGamePageLink: "/game",
  },
  indexedDB: {
    toMainPageLink: "/",
    toGamePageLink: "/game",
  },
  googleDrive: {
    toMainPageLink: "/",
    toGamePageLink: "/game",
  },
  testHTML: {
    toMainPageLink: "../index.html",
    toGamePageLink: "./pages/game.html",
  },
  test: {
    toMainPageLink: "/",
    toGamePageLink: "/game",
  },
} as const;
