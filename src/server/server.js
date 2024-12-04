import http from "http";
import { respondJSON } from "./helpers.js";
import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { log } from "console";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const pathToFront = join(dirname(import.meta.dirname), "front");

  switch (req.url) {
    case "/":
      {
        const pagePath = join(pathToFront, "index.html");
        const page = await readFile(pagePath, "utf-8");
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(page);
      }
      break;
    case "/main.js":
      {
        const pagePath = join(pathToFront, "main.js");
        const page = await readFile(pagePath, "utf-8");
        //send page with index.html
        res.writeHead(200, { "Content-type": "text/javascript" });
        res.end(page);
        // respondJSON(res, 200, "Thats i suppose should be a main page");
      }
      break;
    case "/style.css":
      {
        const pagePath = join(pathToFront, "style.css");
        const page = await readFile(pagePath, "utf-8");
        res.writeHead(200, { "Content-type": "text/css" });
        res.end(page);
      }
      break;

    case "/host":
      respondJSON(res, 200, "You are on host page");
      break;

    case "/admin":
      respondJSON(res, 200, "You are on admin page");
      break;

    default:
      respondJSON(res, 404, "Hello, there is no such page, so ... 404");
      break;
  }
});

server.listen(PORT, () => console.log(`Server listen on ${PORT}`));
