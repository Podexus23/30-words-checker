import http from "http";
import { respondFrontFiles, respondJSON } from "./helpers.js";
import { parse } from "url";
import { extname } from "path";
import { addWord, getWords } from "../db/api.db.js";

const { default: db } = await import("../db/words.json", {
  with: { type: "json" },
});

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // GET METHOD
  if (req.method === "GET" && req.url) {
    const parsedUrl = parse(req.url, true);
    const ext = extname(parsedUrl.pathname);

    if (ext) {
      respondFrontFiles(res, parsedUrl.pathname.slice(1));
      return;
    }

    if (parsedUrl.pathname === "/" && parsedUrl.query?.en_word) {
      // await respondFrontFiles(res, "index.html");
      await respondFrontFiles(res, "index.html");
      // respondJSON(res, 200, `${parsedUrl.query?.word}`);
      return;
    }

    if (req.url === "/") {
      await respondFrontFiles(res, "index.html");
      return;
    }
    if (req.url === "/data") {
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
        const { en_word, ru_word } = JSON.parse(body);
        const dataToDB = { name: en_word, en_word, ru_word };
        addWord(dataToDB);
      });
    }
  }
});

server.listen(PORT, () => console.log(`Server listen on ${PORT}`));
