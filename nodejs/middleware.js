// TOPIC: Middleware in Express.js
//
// What is middleware?
//   A middleware is just a function that sits IN BETWEEN the incoming
//   request and the final route handler. It has access to:
//     - req  : the request object
//     - res  : the response object
//     - next : a function you call to pass control to the NEXT middleware
//              (or to the route handler if there is no more middleware)
//
//   Signature:  (req, res, next) => { ... }
//
// The request → response pipeline (middleware chain):
//   client request
//        │
//        ▼
//   middleware 1  ──next()──▶  middleware 2  ──next()──▶  route handler  ──▶  response
//
//   Each middleware can do ONE of two things:
//     1. Call next()            → hand off to the next function in the chain.
//     2. End the response       → res.send()/res.json()/res.end(), which
//                                  STOPS the chain (next() is not called).
//   If a middleware neither calls next() nor ends the response, the request
//   HANGS forever. This is the most common middleware bug.
//
// Why middleware matters:
//   It lets you run shared logic (logging, authentication, body parsing,
//   validation, error handling) in ONE place instead of repeating it inside
//   every route handler.
//
// Types of middleware in Express:
//   1. Application-level  : app.use(fn)  — runs for every request.
//                           app.use("/admin", fn) — only for paths starting /admin.
//   2. Router-level       : the same idea but attached to an express.Router().
//   3. Built-in           : ship with Express, e.g. express.json(),
//                           express.urlencoded(), express.static().
//   4. Third-party        : installed from npm, e.g. morgan (logging),
//                           cors, helmet, cookie-parser.
//   5. Error-handling     : special 4-argument form (err, req, res, next).
//                           Express knows it is an error handler BECAUSE it
//                           takes 4 arguments.
//
// Order is EVERYTHING:
//   Middleware runs top-to-bottom in the order it is registered with app.use()
//   / app.METHOD(). A middleware registered after a route handler that already
//   sent a response will not run for that request. So put body parsers and
//   loggers BEFORE your routes, and error handlers LAST.

import express from "express";
import fs from "fs";
import ejs from "ejs";
import morgan from "morgan";
const PORT = 3000;

const app = express();

// --- BUILT-IN MIDDLEWARE ---
// express.json(): parses JSON request bodies and puts the result on req.body.
// Without it, req.body would be undefined for JSON requests (see /login below).
app.use(express.json());

// --- THIRD-PARTY MIDDLEWARE ---
// morgan("combined"): an HTTP request logger. For every request it prints a
// log line (method, url, status, response time, etc.) to the console. Great
// example of middleware doing cross-cutting work without touching your routes.
app.use(morgan("combined"));

app.set("view engine", "ejs");

// express.static("public"): serves static files (html, css, images) from the
// "public" folder automatically. It is also middleware — it tries to match the
// request to a file; if none matches it calls next() and the chain continues.
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   // res.status(200).json({
//   //   message: "welcome to the home page",
//   // });
//   // fs.readFile("home.html", "utf-8", (err, data) => {
//   //   if (err) return err;
//   //   res.send(data);
//   res.render("home");
//   // });
// });
// app.get("/products", (req, res) => {
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });
let username = "vikas123";
let password = "vikas12345";

// --- CUSTOM (APPLICATION-LEVEL) MIDDLEWARE EXAMPLES ---
// These are commented out, but each one shows a classic middleware pattern.

// Example 1 — LOGGING middleware.
// It just inspects the request (time + HTTP method), logs it, then calls
// next() to continue. It does NOT end the response, so the chain goes on.
// app.use((req, res, next) => {
//   console.log(
//     `user came at this time:${Date.now()} and user used the method:${req.method}`,
//   );
//   next(); // pass control to the next middleware / route handler
// });

// Example 2 — AUTHENTICATION / GUARD middleware.
// This is the key pattern: a middleware can ALLOW or BLOCK a request.
//   - credentials valid   → next()      → request continues to the route.
//   - credentials invalid → res.send()  → chain STOPS, route never runs.
// Note: req.body is only populated here because express.json() ran earlier —
// proof that middleware order matters.
// app.use((req, res, next) => {
//   if (req.body.username === username && req.body.password === password) {
//     next();
//   } else {
//     res.send("invalid credentials");
//   }
// });

// Example 3 — FILE-LOGGING middleware (a side effect + next()).
// It appends a line to log.txt for every request, then calls next(). Because
// fs.appendFile is async, next() is called right away; we do not wait for the
// write to finish before continuing the chain.
// app.use((req, res, next) => {
//   fs.appendFile(
//     "log.txt",
//     `\nthe user visited at ${Date.now()} and the method used is ${req.method} and on this route:${req.url}`,
//     (err) => (err ? console.log(err) : console.log("success")),
//   );
//   next()
// });
app.get("/", (req, res) => {
  res.end("hello from vikas");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.end("welcome to dahsboard");
});

// --- ERROR-HANDLING MIDDLEWARE (special 4-argument form) ---
// Register it LAST. Express recognises it as an error handler because it has
// FOUR parameters: (err, req, res, next). It runs whenever a route or
// middleware throws an error or calls next(err).
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// Quick recap — MIDDLEWARE:
// - Middleware = a function (req, res, next) that runs before route handlers.
// - It must either call next() OR end the response — otherwise the request hangs.
// - Registered with app.use(); runs top-to-bottom in registration order.
// - Common uses: logging, body parsing, authentication, validation, errors.
// - Types: application-level, router-level, built-in (express.json/static),
//   third-party (morgan), and error-handling (4-arg (err, req, res, next)).
// - Order matters: parsers/loggers BEFORE routes, error handlers LAST.
