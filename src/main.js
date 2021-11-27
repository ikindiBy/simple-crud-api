const http = require('http');

const { get } = require('./methodHandlers/get');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
  switch (req.method) {
    case "GET":
      get(req, res);
      break

    case "POST":
      break

    case "PUT":
      break

    case "DELETE":
      break

    default:
      res.statusCode = 400
      res.write("No Response")
      res.end()
  }
})

server.listen(port, hostname, (err) => {
  err ? console.error(err) : console.log(`Server running at http://${hostname}:${port}/`);
});