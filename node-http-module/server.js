// require http module

const http = require('http');

// create a server sing creatServer()
const server = http.createServer((req, res) => {
  console.log(req.headers, req.url, req.method);

  // pull out headers url and request method using destructuring
  const { headers, url, method } = req;
  console.log(headers, url, method);

  // sent the response to the client
  res.end('hello node');
});

// set a port
const PORT = 5000;

// listen to that port
server.listen(PORT, 'localhost', (err) => {
  if (err) {
    throw err;
  }
  console.log('server running');
});
