// TOPIC: Building a server with Express.js

// What is it?
// Express is a popular npm framework built ON TOP of Node's http module.
// It makes building servers much easier: cleaner routing, simple request
// and response helpers, and middleware support. Compare this file with
// 5-http.js to see how much shorter the Express version is.
// Install it first with:  npm install express

// Key terms:
//  - Route   : a URL + HTTP method paired with a handler function.
//  - Handler : (req, res) => {} that runs when its route is matched.
//  - Middleware: a function that runs BEFORE your route handlers, often
//                to process the request (e.g. parse JSON bodies).

import express from "express";

// Create the Express application object.
const app = express();
const PORT = 3000;

// Middleware: express.json() reads the incoming request body when it is
// JSON and puts the parsed result on req.body. Without this, req.body
// would be undefined for JSON requests.
app.use(express.json());

// app.get(path, handler)
// Handles HTTP GET requests (what a browser does when you visit a URL).
// res.send(...) sends a response and sets sensible headers automatically.
app.get("/", (req, res) => {
  res.send("Hello from home page!");
});

app.get("/contact", (req, res) => {
  res.send("Hello from contact page!");
});

// app.post(path, handler)
// Handles HTTP POST requests (used to SEND data to the server, e.g. a
// login form). Thanks to express.json() above, the sent data is in req.body.
app.post("/login", (req, res) => {
  console.log(req.body); // the JSON data the client sent
  res.send("welcome to login page");
});

// app.listen(port, callback)
// Starts the server listening on the given port.
app.listen(PORT, () => {
  console.log("server is started at 3000");
});

// Quick recap:
// - Express is an npm framework over http that simplifies servers.
// - app.get / app.post define routes per HTTP method.
// - res.send() returns a response (auto-sets headers).
// - app.use(express.json()) is middleware to parse JSON into req.body.
// - app.listen(PORT) starts the server.
