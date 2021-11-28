const http = require('http');
require('dotenv').config();

const { get } = require('./methodHandlers/get');
const { post } = require('./methodHandlers/post');
const { put } = require('./methodHandlers/put');
const { del } = require('./methodHandlers/delete');
const { URL_PARTS_WITH_ID } = require('./constants/urlParams');

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

const server = http.createServer();

server.on('request', (req, res) => {
  const urlParts = req.url.split('/');
  if (urlParts[1] !== 'person' || urlParts.length > URL_PARTS_WITH_ID) {
    res.statusCode = 404;
    res.write('Incorrect route.');
    res.end();
    return;
  }

  switch (req.method) {
    case "GET":
      get(req, res);
      break

    case "POST":
      post(req, res);
      break

    case "PUT":
      put(req, res);
      break

    case "DELETE":
      del(req, res);
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
