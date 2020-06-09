## http

- communication b/w web servers and clients

- http request and response.
  client send request to the severs, servers sents back the response with a status code to the client in json format.

- header and body attched to request ans reponse.
  header is key value pairs. eg, content type of the resource.
  body is the data returned to client/data sent to thr sevrer.

## creating a server

```javascript
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
```

### creating package.json

```bash
npm init

```

### ignore node_modules

- add node_modules to .gitignore

## installing nodeomon

```bash

npm i nodemon -D

```

### package.json

```json
  "start": "nodemon server.js"
```

#### set headers for the reposndeddata

```javascript
// set the header - content type of response data
res.setHeader('Content-Type', 'text/html');
// write the response
res.write('<h1>Hello Node</h1>');
```

### working with json

```javascript
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
  // set the header - content type of response data
  res.setHeader('Content-Type', 'application/json');
  // sent the response
  res.end({
    message: 'Data Saved',
    todos: todo,
  });
});
```

- here throw err, The "chunk" argument must be of type string or an instance of Buffer

- so convert the js object v send to json string

```javascript
// convert object to json string since response must be a string type. use JSON.stringify()
res.end(
  JSON.stringify({
    message: 'Data Saved',
    todos: todo,
  })
);
```

## http status codes

- 200 - success
- 201 - The request has succeeded and a new resource has been created as a result.
- 204 - There is no content to send for this request.

- 304 - not modified - It tells the client that the response has not been modified

- 400 - Bad request - invalid data - for instance invalid form data.
- 401 - unauthorized access - fetching data before authorization..
- 403 - client doesnt have access to requsted resource.
- 404 - NotFound - The server can not find the requested resource. In the browser, this means the URL is not recognized.

#### 5xx - Server error responses

- 500 - internal server error.

## statuc code example

```javascript
// create a server sing creatServer()
const server = http.createServer((req, res) => {
  // set the header - content type of response data - use writeHead() - pass status code & headers
  res.writeHead(400, { Content_Type: 'application/json' });
  // sent the response
  res.end(
    JSON.stringify({
      status: false,
      error: 'Please add email',
      todos: null,
    })
  );
});
```

## sending data to the server

```javascript
// create a server sing creatServer()
const server = http.createServer((req, res) => {
  // define a body
  let body = [];
  // call on on req - listent for 'data' event, funciton where v push the chunk to body array
  // concat the body array to Buffer - finally convert to String. finally log the body
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
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
```
