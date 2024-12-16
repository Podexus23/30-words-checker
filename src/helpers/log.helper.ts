import { ServerResponse } from "http";

export const logError = (err: unknown) => {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("Unknown error:", err);
  }
};

export const logServerError = (err: unknown, res: ServerResponse) => {
  if (err instanceof Error) {
    console.error(err.message);
    res.writeHead(404, { "Content-type": "text/plain" });
    res.end(`404. ${err.message}`);
  } else {
    console.error("Unknown error:", err);
    res.writeHead(500, { "Content-type": "text/plain" });
    res.end(`${500}: Internal failure.`);
  }
};
