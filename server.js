// require http module

const http = require('http');

// create dummy json array
const todo = [
  {
    id: 1,
    text: 'Text One',
  },
  { id: 2, text: 'Text Two' },
  { id: 3, text: 'Text Three' },
];

// create a server sing creatServer()
const server = http.createServer((req, res) => {
  // define a body
  let body = [];
  // call on on req - listent for 'data' event, once recievd chunk of data, fires function where v push the chunk of data to body array
  // concat the body array to Buffer - finally convert to String. finally log the body
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      // convert Buffer to string
      body = Buffer.concat(body).toString();
      console.log(body);
    });
  // sent the response
  res.end(
    JSON.stringify({
      status: true,
      todos: todo,
    })
  );
});

// set a port
const PORT = 5000;

// listen to that port
server.listen(PORT, 'localhost', (err) => {
  if (err) {
    throw err;
  }
  console.log('server running on PORT ' + PORT);
});
