import http from "http";
import { extname } from "path";
import { parse } from "url";
import { addWord, addWords, getWords } from "../db/api.db.js";
import { respondFrontFiles, respondJSON } from "./helpers.server.js";
import { IDBWords, Word } from "./interface.server.js";
import { logServerError } from "../helpers/log.helper.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  try {
    // GET METHOD
    if (req.method === "GET" && req.url) {
      const parsedUrl = parse(req.url, true);
      const ext = extname(req.url);

      if (ext) {
        respondFrontFiles(res, req.url.slice(1));
        return;
      }

      if (req.url === "/" && parsedUrl.query?.en_word) {
        await respondFrontFiles(res, "index.html");
        return;
      }

      if (req.url === "/") {
        await respondFrontFiles(res, "index.html");
        return;
      }

      if (req.url === "/game") {
        await respondFrontFiles(res, "game.html");
        return;
      }

      if (req.url === "/api/words") {
        const data = getWords();
        respondJSON(res, 200, data);
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
          const dataToDB: Word = { en, ru };
          addWord(dataToDB);
        });
      }
      if (req.url === "/api/words") {
        let body = "";

        req.on("data", (chunk) => (body += chunk.toString()));

        req.on("end", () => {
          const parsedBody: IDBWords = JSON.parse(body);
          addWords(parsedBody);
        });
        respondJSON(res, 404, "Hello, there is no such page, so ... 404");
      }
    }
  } catch (error: unknown) {
    logServerError(error, res);
  }
});

server.listen(PORT, () => console.log(`Server listen on ${PORT}`));
