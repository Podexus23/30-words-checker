import { globalState } from "../../main.js";
import { GlobalState } from "../interface.front.js";
import { runGamePage } from "./gamePage.controller.js";
import { runMainPage } from "./mainPage.controller.js";

type RouteHandler = (state: GlobalState) => void | Promise<void>;

const routes: Record<string, RouteHandler> = {
  "/": (state: GlobalState) => runMainPage(state),
  "/game": (state: GlobalState) => runGamePage(state),
  // "/404": () => `<h1>404 Page not found</h1>`,
};

export function renderPage(path: string) {
  routes[path](globalState);
}
