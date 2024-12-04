import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Thats i suppose should be a main page"));
      }
      break;
    case "/host":
      {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify("You are on host page"));
      }
      break;
    case "/admin":
      {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify("You are on admin page"));
      }
      break;

    default:
      {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Hello, there is no such page, so ... 404"));
      }
      break;
  }
});

server.listen(PORT, () => console.log(`Server listen on ${PORT}`));
