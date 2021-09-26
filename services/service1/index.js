const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api/service1") {
    res.writeHead(200);
    res.write("Hello from service1");
  } else {
    res.writeHead(404);
  }
  res.end();
});

server.listen(8080);
