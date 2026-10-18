// TOPIC: Creating a web server with the built-in http module

// What is it?
// The built-in `http` module lets Node.js act as a web server: it can
// listen for requests from a browser (or any client) and send responses
// back. It is a core module, so no npm install is needed.

// Key idea: request (req) and response (res)
// For every incoming request Node calls our function with two objects:
//   - req (request):  info coming FROM the client (url, method, headers)
//   - res (response): what we send BACK to the client (data, status, headers)

import http from "http";

// A port is like a "door number" on your computer where the server
// listens. http://localhost:3000 means "this computer, door 3000".
const PORT = 3000;

// http.createServer(handler)
// `handler` runs on EVERY request. It receives (req, res).
const server = http.createServer((req, res) => {
  // Common request info you can read:
  // console.log(req.url);    // the path the user asked for, e.g. "/about"
  // console.log(req.method); // GET, POST, PUT, DELETE, etc.

  // Common response setup you can do:
  // res.setHeader("Content-Type", "text/html"); // tells the client the data type
  // res.setHeader("author", "vikasthakur");      // a custom header
  // res.statusCode = 200;                         // 200 = OK (success)
  // res.end("hello from server");                 // send data and finish

  // Simple ROUTING: decide what to send based on the requested URL.
  // Each branch ends the response with res.end(...) which sends the text.
  if (req.url === "/") {
    res.end("welcome to home page");
  } else if (req.url === "/contact") {
    res.end("welcome to contact page");
  } else if (req.url === "/about") {
    res.end("welcome to about page");
  } else {
    // any other URL falls through to a "not found" message
    res.end("404 page not found");
  }
});

// server.listen(port, callback)
// Starts the server so it begins accepting requests on the given port.
// The callback runs once, when the server is ready.
server.listen(PORT, () => {
  console.log("server started at port 3000");
});

// Quick recap:
// - http = core module to build a web server.
// - createServer((req, res) => {}) handles every request.
// - req = data from client (url, method, headers).
// - res = reply to client (setHeader, statusCode, end).
// - manual routing = if/else on req.url.
// - server.listen(PORT) starts it; visit http://localhost:3000.
