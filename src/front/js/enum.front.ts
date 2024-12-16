export enum LocalAddress {
  Src1 = "WC_words",
  Src2 = "WC_2024",
}

export enum SourceType {
  Local = "local",
  IndexedDB = "indexedDB",
  Server = "server",
  Test = "test",
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
    toMainPageLink: "../index.html",
    toGamePageLink: "./pages/game.html",
  },
  indexedDB: {
    toMainPageLink: "../index.html",
    toGamePageLink: "./pages/game.html",
  },
  test: {
    toMainPageLink: "../index.html",
    toGamePageLink: "./pages/game.html",
  },
} as const;
