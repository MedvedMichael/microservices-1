import http from "http"
import fetch from 'node-fetch'

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/root-service") {
    const resultService1 = await (await fetch('http://service1-service/api/service1')).text()
    const resultService2 = await (await fetch('http://service2-service/api/service2')).text()
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({res1: resultService1, res2: resultService2}));
  } else {
    console.log('404')
    res.writeHead(404);
  }
  res.end();
});

server.listen(8080);