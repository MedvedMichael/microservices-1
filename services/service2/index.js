const http = require("http");

let flag = false
const server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.url === "/api/service2") {
    setTimeout(() => {
      res.writeHead(200)
      res.end("Hello from service2");
    }, flag ? 10000 : 0)
  }
  else if (req.url === '/api/service2/untested-request') {
    flag = true
    res.writeHead(200)
    res.end();
  }
  else {
    res.writeHead(404);
    res.end();
  }

});

server.listen(8080);
