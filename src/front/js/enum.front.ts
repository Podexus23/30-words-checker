export enum LocalStorageAddress {
  Words = "WC_words",
  Words_copy = "WC_2024",
  State = "WC_GS",
}

export enum SourceType {
  Local = "local",
  IndexedDB = "indexedDB",
  Server = "server",
  Test = "test",
  GoogleDrive = "googleDrive",
  Default = "default",
}

export enum GameStateType {
  Game_On = 1,
  Game_Off = 0,
}

export interface PageRenderState {
  toMainPageLink: string;
  toGamePageLink: string;
}

export const renderState: PageRenderState = {
  toMainPageLink: "/",
  toGamePageLink: "/game",
};
