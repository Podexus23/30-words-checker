import { readFile } from "fs/promises";
import { extname, join, dirname } from "path";

export const respondJSON = (res, code, data) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const respondFrontFiles = async (res, filename) => {
  const pathToFile = join(dirname(import.meta.dirname), "front", filename);
  const ext = extname(pathToFile);

  const ContentTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };

  const data = await readFile(pathToFile);
  res.writeHead(200, { "Content-type": ContentTypes[ext] });
  res.end(data);
};
