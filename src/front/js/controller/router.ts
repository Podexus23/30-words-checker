import { globalState } from "../../main.js";
import { GlobalState } from "../interface.front.js";
import { removeGamePage, runGamePage } from "./gamePage.controller.js";
import { removeMainPage, runMainPage } from "./mainPage.controller.js";

type RouteHandler = (state: GlobalState) => void | Promise<void>;

const routes: Record<string, RouteHandler> = {
  "/": (state: GlobalState) => {
    const gamePage = document.querySelector(".game-page");
    if (gamePage) removeGamePage();
    runMainPage(state);
  },
  "/game": (state: GlobalState) => {
    const mainPage = document.querySelector(".main-page");
    if (mainPage) removeMainPage();
    runGamePage(state);
  },
  // "/404": () => `<h1>404 Page not found</h1>`,
};

export function renderPage(path: string) {
  if (path === "/game") {
    routes[path](globalState);
  } else if (path === "/") {
    routes[path](globalState);
  }
}
