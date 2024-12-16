import { ServerResponse } from "http";
import { dirname, extname, join } from "path";
import { readFile } from "fs/promises";
import { logServerError } from "../helpers/log.helper.js";
import { FileExtensions, IDBWords } from "./interface.server.js";

const ContentTypes: Record<FileExtensions, string> = {
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

export const respondJSON = (
  res: ServerResponse,
  code: number,
  data: string | IDBWords,
) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const respondFrontFiles = async (
  res: ServerResponse,
  filename: string,
) => {
  try {
    const pathToFile = join(dirname(import.meta.dirname), "front", filename);
    const ext = extname(pathToFile) as FileExtensions;

    const data = await readFile(pathToFile);
    res.writeHead(200, { "Content-type": ContentTypes[ext] });
    res.end(data);
  } catch (error) {
    logServerError(error, res);
  }
};
