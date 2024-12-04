import http from "http";
import { respondFrontFiles, respondJSON } from "./helpers.js";
import { parse } from "url";
import { extname } from "path";

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
      respondJSON(res, 200, db);
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
});

server.listen(PORT, () => console.log(`Server listen on ${PORT}`));
