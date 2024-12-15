import http from "http";
import { extname } from "path";
import { parse } from "url";
import { addWord, addWords } from "../db/api.db.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // GET METHOD
  if (req.method === "GET" && req.url) {
    const parsedUrl = parse(req.url, true);
    // if (!parsedUrl.pathname) return;
    const ext = extname(parsedUrl.pathname);

    if (ext) {
      respondFrontFiles(res, parsedUrl.pathname.slice(1));
      return;
    }

    if (parsedUrl.pathname === "/" && parsedUrl.query?.en_word) {
      await respondFrontFiles(res, "index.html");
      return;
    }

    if (req.url === "/") {
      await respondFrontFiles(res, "index.html");
      return;
    }

    if (req.url === "/game") {
      await respondFrontFiles(res, "pages/game.html");
      return;
    }

    if (req.url === "/api/words") {
      respondJSON(res, 200, getWords());
      return;
    }
    if (req.url === "/host") {
      respondJSON(res, 200, "You are on host page");
      return;
    }
    if (req.url === "/admin") {
      respondJSON(res, 200, "You are on admin page");
      return;
    }
    respondJSON(res, 404, "Hello, there is no such page, so ... 404");
  }

  //API
  if (req.method === "POST" && req.url) {
    if (req.url === "/api/word") {
      let body = "";

      req.on("data", (chunk) => (body += chunk.toString()));

      req.on("end", () => {
        const { en_word: en, ru_word: ru } = JSON.parse(body);
        const dataToDB = { en, ru };
        addWord(dataToDB);
      });
    }
    if (req.url === "/api/words") {
      let body = "";

      req.on("data", (chunk) => (body += chunk.toString()));

      req.on("end", () => {
        const parsedBody = JSON.parse(body);
        addWords(parsedBody);
      });
    }
  }
});

server.listen(PORT, () => console.log(`Server listen on ${PORT}`));
