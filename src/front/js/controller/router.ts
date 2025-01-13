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
  "/game": () => {
    const mainPage = document.querySelector(".main-page");
    if (mainPage) removeMainPage();
    runGamePage();
  },
  "/404": () => {
    const root = document.getElementById("root") as HTMLElement;
    root.innerHTML = `<h1>404 Page not found</h1>`;
  },
};

export function renderPage(path: string) {
  if (path === "/game") {
    routes[path](globalState);
  } else if (path === "/") {
    routes[path](globalState);
  } else {
    routes["/404"](globalState);
  }
}

window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});
